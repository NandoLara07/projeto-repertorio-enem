import MiniSearch, { type Query } from "minisearch";
import { RepertoriosData } from "@/db/repertorios";
import type { Repertorio } from "@/types/repertorio";
import { EQUIVALENTES, MAIS_AMPLOS } from "./sinonimos";
import { normalizar, processar } from "./texto";

export type Relevance = "muito-relevante" | "relevante" | "pouco-relevante";

export interface RepertorioRecomendado {
  id: string;
  relevance?: Relevance;
}

// Nível 3: campos curados e específicos. Nível 2: genéricos. O nível é o peso
// do campo no ranking (BM25) e também a nota que um acerto nele vale na
// cobertura do tema. O tema de exemplo (usageExample) fica de fora: é uma frase
// inteira, cheia de palavras de enchimento.
const CAMPOS: Record<
  string,
  { nivel: number; texto: (repertorio: Repertorio) => string }
> = {
  keywords: { nivel: 3, texto: (r) => r.keywords.join("\n") },
  specificThemes: { nivel: 3, texto: (r) => r.specificThemes.join("\n") },
  eixoTematico: { nivel: 3, texto: (r) => r.eixoTematico.join("\n") },
  title: { nivel: 2, texto: (r) => r.title },
  category: { nivel: 2, texto: (r) => r.category.split("/").join("\n") },
};
const NOMES_CAMPOS = Object.keys(CAMPOS);
const NIVEL_MAXIMO = 3;
// Onde fica o assunto principal do repertório: os temas específicos e o título
// dizem do que ele trata; as keywords dizem onde mais ele se encaixa.
const CAMPOS_CENTRAIS = ["specificThemes", "title"];

// Sinônimo vale menos que a palavra exata do tema; termo mais amplo, menos ainda.
const PESO_EQUIVALENTE = 0.5;
const PESO_AMPLO = 0.3;
// Palavra de moldura ambígua ("importância", "acesso", "online"...).
const PESO_MOLDURA = 0.3;
// Termo encontrado com uma letra de diferença (erro de digitação). As 3
// primeiras letras precisam bater: o erro quase nunca está no começo, e isso
// evita "campanhas" ≈ "companhia".
const PESO_ERRO = 0.7;
const LETRAS_INICIAIS_IGUAIS = 3;
// Expressão do tema com as palavras espalhadas pelo repertório, ou só parte dela.
const PESO_PARCIAL = 0.5;
// Quantos termos podem aparecer no meio de uma expressão do dicionário:
// "violência de gênero contra a mulher" ainda contém "violência contra a mulher".
const MAX_INTERVALO = 2;
// Par de ideias que não são vizinhas diretas no tema (pula moldura ou atravessa
// uma expressão do dicionário) vale metade de um par normal.
const PESO_PAR_DISTANTE = 0.5;
// Ideia que aparece em até 10% dos repertórios é rara: é o que deixa o tema
// específico. Mas precisa estar em pelo menos 2: palavra que só um repertório
// tem costuma ser coincidência (como "forma" em "Arte como forma de
// resistência"), não o centro do tema.
const FRACAO_IDEIA_RARA = 0.1;
const MINIMO_REPERTORIOS_IDEIA_RARA = 2;
// Termo presente em até 15% dos repertórios conta inteiro. Acima disso, o peso
// cai junto com o IDF: "social" está em quase todos e quase não ajuda a escolher.
const FRACAO_ESPECIFICA = 0.15;
const PESO_MINIMO_COMUM = 0.3;

// Em tema longo nenhum repertório cobre tudo: cobrir o equivalente a 4 ideias
// inteiras já conta como cobertura total.
const IDEIAS_PARA_COBERTURA_TOTAL = 4;

// Fração do tema coberta pelo repertório.
const COBERTURA_MUITO_RELEVANTE = 0.6;
const COBERTURA_RELEVANTE = 0.35;
const COBERTURA_MINIMA = 0.25;

function termosDe(texto: string): string[] {
  return processar(texto).map(({ termo }) => termo);
}

interface Documento {
  id: string;
  // Termos já processados de cada item (cada keyword, cada tema específico...),
  // separados por campo.
  itens: Record<string, string[][]>;
}

const documentos: Documento[] = RepertoriosData.map((repertorio) => ({
  id: repertorio.id,
  itens: Object.fromEntries(
    NOMES_CAMPOS.map((campo) => [
      campo,
      CAMPOS[campo]
        .texto(repertorio)
        .split("\n")
        .map(termosDe)
        .filter((item) => item.length > 0),
    ]),
  ),
}));
const documentosPorId = new Map(documentos.map((doc) => [doc.id, doc]));

// Erro de digitação só é tolerado em termos longos, onde uma letra trocada
// dificilmente vira outra palavra.
function aceitaErro(termo: string): boolean {
  return termo.length >= 7 && !termo.includes("_");
}

const miniSearch = new MiniSearch<Documento>({
  fields: NOMES_CAMPOS,
  // Os campos já chegam processados: o MiniSearch só precisa separar os termos.
  extractField: (doc, campo) =>
    campo === "id" ? doc.id : doc.itens[campo].flat().join(" "),
  tokenize: (texto) => texto.split(" ").filter(Boolean),
  processTerm: (termo) => termo,
  searchOptions: {
    boost: Object.fromEntries(
      NOMES_CAMPOS.map((campo) => [campo, CAMPOS[campo].nivel]),
    ),
    fuzzy: (termo) => (aceitaErro(termo) ? 1 : false),
  },
});
miniSearch.addAll(documentos);

// Diferença de no máximo uma letra: trocada, sobrando ou faltando.
function quaseIgual(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  if (a.length === b.length) return a.slice(i + 1) === b.slice(i + 1);
  return a.length > b.length
    ? a.slice(i + 1) === b.slice(i)
    : a.slice(i) === b.slice(i + 1);
}

function notaNoItem(item: string[], termo: string): number {
  if (item.includes(termo)) return 1;
  const inicio = termo.slice(0, LETRAS_INICIAIS_IGUAIS);
  if (
    aceitaErro(termo) &&
    item.some((t) => t.startsWith(inicio) && quaseIgual(t, termo))
  ) {
    return PESO_ERRO;
  }
  return 0;
}

// Nota dos termos aparecendo juntos num mesmo item (a mesma keyword, o mesmo
// tema específico...): o nível do melhor campo onde isso acontece (1 ou 2/3).
// Assim "educação alimentar" + "saúde pública" não contam como
// "educação pública".
function notaJunta(
  doc: Documento,
  termos: string[],
  campos: string[] = NOMES_CAMPOS,
): number {
  let melhor = 0;
  for (const campo of campos) {
    const nivel = CAMPOS[campo].nivel / NIVEL_MAXIMO;
    if (nivel <= melhor) continue;
    for (const item of doc.itens[campo]) {
      const nota = Math.min(...termos.map((termo) => notaNoItem(item, termo)));
      melhor = Math.max(melhor, nivel * nota);
    }
  }
  return melhor;
}

// Expressão inteira num mesmo item: nota cheia. Palavras espalhadas pelo
// repertório, ou só parte delas (quando permitido): metade da média.
function notaDaExpressao(
  doc: Documento,
  termos: string[],
  aceitaParcial: boolean,
): number {
  const junta = notaJunta(doc, termos);
  if (junta > 0 || !aceitaParcial || termos.length === 1) return junta;
  const notas = termos.map((termo) => notaJunta(doc, [termo]));
  return (
    (PESO_PARCIAL * notas.reduce((soma, nota) => soma + nota, 0)) /
    notas.length
  );
}

function idf(quantos: number): number {
  return Math.log(
    1 + (documentos.length - quantos + 0.5) / (quantos + 0.5),
  );
}
const IDF_REFERENCIA = idf(documentos.length * FRACAO_ESPECIFICA);

function quantosTem(termos: string[]): number {
  return documentos.filter((doc) => notaJunta(doc, termos) > 0).length;
}

function fatorRaridade(quantos: number): number {
  return Math.min(
    1,
    Math.max(PESO_MINIMO_COMUM, idf(quantos) / IDF_REFERENCIA),
  );
}

interface Alternativa {
  termos: string[];
  peso: number;
}

interface ExpressaoConhecida {
  termos: string[];
  alternativas: Alternativa[];
}

function montarDicionario(): ExpressaoConhecida[] {
  const expressoes = new Map<string, ExpressaoConhecida>();

  const relacionar = (de: string, para: string, peso: number) => {
    const termos = termosDe(de);
    const alternativa = termosDe(para);
    if (termos.length === 0 || alternativa.length === 0) return;
    const chave = termos.join(" ");
    const expressao = expressoes.get(chave) ?? { termos, alternativas: [] };
    expressao.alternativas.push({ termos: alternativa, peso });
    expressoes.set(chave, expressao);
  };

  for (const grupo of EQUIVALENTES) {
    for (const de of grupo) {
      for (const para of grupo) {
        if (de !== para) relacionar(de, para, PESO_EQUIVALENTE);
      }
    }
  }
  for (const { especificos, amplos } of MAIS_AMPLOS) {
    for (const de of especificos) {
      for (const para of amplos) relacionar(de, para, PESO_AMPLO);
    }
  }

  // As mais longas primeiro, pra "ambiente virtual" ganhar de "virtual".
  return [...expressoes.values()].sort(
    (a, b) => b.termos.length - a.termos.length,
  );
}

const DICIONARIO = montarDicionario();

// Uma ideia do tema: um termo solto, uma expressão do dicionário ou um par de
// termos vizinhos ("trabalho de cuidado"), que só conta se aparecer junto.
interface Conceito {
  termos: string[];
  peso: number;
  alternativas: Alternativa[];
  soJunto: boolean;
  // Faz parte do assunto do tema (não é só palavra de moldura).
  principal: boolean;
  // Em quantos repertórios a ideia aparece.
  quantos: number;
}

// Procura a expressão nos termos do tema, na ordem, aceitando até
// MAX_INTERVALO termos entre uma palavra e a seguinte.
function encontrar(
  termos: string[],
  usados: boolean[],
  expressao: string[],
): number[] | null {
  for (let inicio = 0; inicio < termos.length; inicio++) {
    if (usados[inicio] || termos[inicio] !== expressao[0]) continue;

    const posicoes = [inicio];
    for (const alvo of expressao.slice(1)) {
      const anterior = posicoes[posicoes.length - 1];
      const posicao = termos.findIndex(
        (termo, p) =>
          p > anterior &&
          p <= anterior + 1 + MAX_INTERVALO &&
          !usados[p] &&
          termo === alvo,
      );
      if (posicao === -1) break;
      posicoes.push(posicao);
    }

    if (posicoes.length === expressao.length) return posicoes;
  }
  return null;
}

function montarConceitos(tema: string): Conceito[] {
  const termosTema = processar(tema);
  const termos = termosTema.map(({ termo }) => termo);
  const usados = termos.map(() => false);
  const soMoldura = (posicoes: number[]) =>
    posicoes.every((p) => termosTema[p].fraco);

  const conceitos: Conceito[] = [];
  // Termos que já viraram ideia, para não repetir.
  const porTermo = new Map<string, Conceito>();
  // Expressão de duas ou mais palavras de que cada posição faz parte (-1: nenhuma).
  const expressaoDe = termos.map(() => -1);

  DICIONARIO.forEach(({ termos: expressao, alternativas }, n) => {
    const posicoes = encontrar(termos, usados, expressao);
    if (!posicoes) return;
    for (const p of posicoes) {
      usados[p] = true;
      if (expressao.length > 1) expressaoDe[p] = n;
    }
    const conceito = {
      termos: expressao,
      peso: soMoldura(posicoes) ? PESO_MOLDURA : 1,
      alternativas,
      soJunto: false,
      principal: !soMoldura(posicoes),
      quantos: 0,
    };
    conceitos.push(conceito);
    if (expressao.length === 1) porTermo.set(expressao[0], conceito);
  });

  termos.forEach((termo, i) => {
    if (usados[i] || porTermo.has(termo)) return;
    const conceito = {
      termos: [termo],
      peso: soMoldura([i]) ? PESO_MOLDURA : 1,
      alternativas: [],
      soJunto: false,
      principal: !soMoldura([i]),
      quantos: 0,
    };
    conceitos.push(conceito);
    porTermo.set(termo, conceito);
  });

  for (const conceito of conceitos) {
    conceito.quantos = quantosTem(conceito.termos);
    conceito.peso *= fatorRaridade(conceito.quantos);
  }

  // Pares de ideias vizinhas no tema ("trabalho de cuidado"), pulando as
  // palavras de moldura: "violência no ambiente escolar" forma violência +
  // escolar. Só entram pares que algum repertório tem no mesmo item; um par que
  // nenhum repertório tem junto não ajuda a escolher.
  const principais = termos
    .map((_, i) => i)
    .filter((i) => !termosTema[i].fraco);
  const pares = new Set<string>();
  for (let k = 0; k + 1 < principais.length; k++) {
    const [i, j] = [principais[k], principais[k + 1]];
    if (expressaoDe[i] !== -1 && expressaoDe[i] === expressaoDe[j]) continue;
    const par = [termos[i], termos[j]];
    if (par[0] === par[1] || pares.has(par.join(" "))) continue;
    pares.add(par.join(" "));
    const quantos = quantosTem(par);
    if (quantos === 0) continue;
    const vizinhosDiretos =
      j === i + 1 && expressaoDe[i] === -1 && expressaoDe[j] === -1;
    conceitos.push({
      termos: par,
      peso: fatorRaridade(quantos) * (vizinhosDiretos ? 1 : PESO_PAR_DISTANTE),
      alternativas: [],
      soJunto: true,
      principal: true,
      quantos,
    });
  }

  return conceitos;
}

// Cada ideia entra com o seu peso. Cada sinônimo entra como uma expressão que
// precisa aparecer inteira (AND), valendo menos.
function montarConsulta(conceitos: Conceito[]): Query {
  return {
    combineWith: "OR",
    queries: conceitos
      .filter((conceito) => !conceito.soJunto)
      .flatMap((conceito) => [
        { queries: conceito.termos, boostTerm: () => conceito.peso },
        ...conceito.alternativas.map((alternativa) => ({
          queries: alternativa.termos,
          combineWith: "AND" as const,
          boostTerm: () => conceito.peso * alternativa.peso,
        })),
      ]),
  };
}

// Quanto do tema o repertório cobre, de 0 a 1. Cada ideia conta pelo seu peso;
// um sinônimo cobre a ideia original, mas vale menos que ela.
function calcularCobertura(doc: Documento, conceitos: Conceito[]): number {
  let coberto = 0;
  let total = 0;
  for (const { termos, peso, alternativas, soJunto } of conceitos) {
    const direta = notaDaExpressao(doc, termos, !soJunto);
    const porSinonimo = Math.max(
      0,
      ...alternativas.map(
        (alternativa) =>
          alternativa.peso * notaDaExpressao(doc, alternativa.termos, false),
      ),
    );
    coberto += peso * Math.max(direta, porSinonimo);
    total += peso;
  }
  return Math.min(1, coberto / Math.min(total, IDEIAS_PARA_COBERTURA_TOTAL));
}

// O tema aparece no assunto principal do repertório (temas específicos ou
// título)? Se só aparece nas keywords, o repertório "também serve", como um
// coringa.
function trataDoTema(doc: Documento, conceitos: Conceito[]): boolean {
  return conceitos.some(
    ({ termos, principal, alternativas }) =>
      principal &&
      (termos.some((termo) => notaJunta(doc, [termo], CAMPOS_CENTRAIS) > 0) ||
        alternativas.some(
          (alternativa) =>
            notaJunta(doc, alternativa.termos, CAMPOS_CENTRAIS) > 0,
        )),
  );
}

// O repertório tem como assunto principal a ideia mais rara do tema? É ela que
// deixa o tema específico ("LGBTI+" em "permanência de alunos LGBTI+ na
// escola"), então ele merece pelo menos "relevante", mesmo cobrindo pouco do
// resto. Sem isso, quanto mais longo o tema, menos a parte específica pesa.
// Só a mais rara conta, para uma palavra rara secundária ("feminina" em
// "sub-representatividade feminina na política") não promover um repertório.
function trataDeIdeiaRara(doc: Documento, conceitos: Conceito[]): boolean {
  const limite = Math.max(1, FRACAO_IDEIA_RARA * documentos.length);
  const raras = conceitos.filter(
    ({ principal, soJunto, quantos }) =>
      principal &&
      !soJunto &&
      quantos >= MINIMO_REPERTORIOS_IDEIA_RARA &&
      quantos <= limite,
  );
  if (raras.length === 0) return false;
  const maisRara = Math.min(...raras.map(({ quantos }) => quantos));
  return raras.some(
    ({ termos, quantos }) =>
      quantos === maisRara && notaJunta(doc, termos, CAMPOS_CENTRAIS) > 0,
  );
}

// "Muito relevante" exige que o tema esteja no assunto principal do repertório.
// Quem só bate nas keywords (um coringa como o Art. 3º) desce um selo: precisa
// cobrir bem o tema para ser "relevante".
function relevancia(
  cobertura: number,
  centralNoTema: boolean,
  ideiaRara: boolean,
): Relevance {
  if (!centralNoTema) {
    return cobertura >= COBERTURA_MUITO_RELEVANTE
      ? "relevante"
      : "pouco-relevante";
  }
  if (cobertura >= COBERTURA_MUITO_RELEVANTE) return "muito-relevante";
  if (cobertura >= COBERTURA_RELEVANTE || ideiaRara) return "relevante";
  return "pouco-relevante";
}

const ORDEM: Record<Relevance, number> = {
  "muito-relevante": 0,
  relevante: 1,
  "pouco-relevante": 2,
};

const EIXOS = new Map(
  RepertoriosData.flatMap((r) => r.eixoTematico).map((eixo) => [
    normalizar(eixo),
    eixo,
  ]),
);

// Se o aluno digitar exatamente um eixo temático, mostra os repertórios dele,
// começando pelos que têm esse como eixo principal.
function buscarPorEixo(tema: string): RepertorioRecomendado[] | null {
  const eixo = EIXOS.get(normalizar(tema).trim().replace(/\s+/g, " "));
  if (!eixo) return null;

  return RepertoriosData.filter((r) => r.eixoTematico.includes(eixo))
    .map((r) => ({
      id: r.id,
      relevance: (r.eixoTematico[0] === eixo
        ? "muito-relevante"
        : "relevante") as Relevance,
    }))
    .sort((a, b) => ORDEM[a.relevance] - ORDEM[b.relevance]);
}

export function buscarRepertoriosMiniSearch(
  tema: string,
): RepertorioRecomendado[] {
  if (tema.trim().toLowerCase() === "@all") {
    return RepertoriosData.map((repertorio) => ({ id: repertorio.id }));
  }

  const porEixo = buscarPorEixo(tema);
  if (porEixo) return porEixo;

  const conceitos = montarConceitos(tema);
  if (conceitos.length === 0) return [];

  return miniSearch
    .search(montarConsulta(conceitos))
    .map((resultado) => {
      const doc = documentosPorId.get(resultado.id)!;
      const cobertura = calcularCobertura(doc, conceitos);
      const central = trataDoTema(doc, conceitos);
      return {
        id: doc.id,
        cobertura,
        central,
        relevance: relevancia(
          cobertura,
          central,
          trataDeIdeiaRara(doc, conceitos),
        ),
        // O MiniSearch multiplica a nota pela quantidade de termos encontrados.
        // Aqui esse papel fica com a cobertura, que não conta sinônimo como
        // ideia nova nem trata moldura como assunto.
        nota: (resultado.score / resultado.queryTerms.length) * cobertura,
      };
    })
    .filter(({ cobertura }) => cobertura >= COBERTURA_MINIMA)
    // No mesmo selo, quem trata do tema vem antes de quem só também serve.
    .sort(
      (a, b) =>
        ORDEM[a.relevance] - ORDEM[b.relevance] ||
        Number(b.central) - Number(a.central) ||
        b.nota - a.nota,
    )
    .map(({ id, relevance }) => ({ id, relevance }));
}
