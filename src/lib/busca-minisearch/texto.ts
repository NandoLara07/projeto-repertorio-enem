import { newStemmer } from "snowball-stemmers";

const stemmer = newStemmer("portuguese");

// Palavras gramaticais (artigos, preposições, pronomes, conjunções, verbos de
// ligação...). Escritas sem acento porque a comparação ignora acentos: "não" e
// "nao" caem do mesmo jeito.
const PALAVRAS_VAZIAS = new Set(
  `a o as os um uma uns umas ao aos
  de do da dos das dum duma duns dumas em no na nos nas num numa nuns numas
  por pelo pela pelos pelas para pra pro pras pros com sem sob sobre entre
  contra ate desde apos ante perante durante mediante acerca atraves diante dentre
  e ou mas nem porem contudo todavia entretanto logo portanto pois porque que se
  embora quando enquanto como conforme assim tambem
  eu tu ele ela nos vos eles elas me te lhe lhes mim ti si lo la los las
  comigo contigo consigo conosco convosco voce voces
  meu minha meus minhas teu tua teus tuas seu sua seus suas
  nosso nossa nossos nossas vosso vossa vossos vossas dele dela deles delas
  este esta estes estas esse essa esses essas aquele aquela aqueles aquelas
  isto isso aquilo neste nesta nestes nestas nesse nessa nesses nessas
  naquele naquela naqueles naquelas nisto nisso naquilo deste desta destes destas
  desse dessa desses dessas daquele daquela daqueles daquelas disto disso daquilo
  quem qual quais cujo cuja cujos cujas onde
  mais menos muito muita muitos muitas pouco pouca poucos poucas
  todo toda todos todas outro outra outros outras mesmo mesma mesmos mesmas
  proprio propria proprios proprias cada algum alguma alguns algumas
  nenhum nenhuma tanto tanta tantos tantas qualquer quaisquer tal tais demais ademais
  ja ainda so apenas bem mal aqui ali la ai hoje agora atualmente sempre nunca
  jamais talvez sim nao tao meio grande grandes
  ser sou es somos sao era eram fui foi fomos foram seja sejam sera serao seria
  seriam sendo sido estar estou estamos estao estava estavam esteve estiveram
  estando ter tenho tem temos tinha tinham tive teve tiveram tera terao teria
  teriam tendo tido haver ha havia houve houveram havera pode podem deve devem
  fazer`.split(
    /\s+/,
  ),
);

// Moldura: palavras que aparecem em quase todo tema de redação e não ajudam a
// diferenciar um repertório de outro. Comparadas pelo radical, então
// "desafio"/"desafios" e "combate"/"combater" caem juntas.
const MOLDURA = [
  "brasil",
  "brasileiro",
  "desafio",
  "perspectiva",
  "enfrentar",
  "enfrentamento",
  "contemporâneo",
  "combate",
  "combater",
  "sociedade",
];

// "País" fica fora da comparação por radical: sem acento ele vira "pais", e
// aí "responsabilidade dos pais" também sumiria.
const PAIS = new Set(["país", "países", "paises"]);

// Moldura ambígua: geralmente é só enquadramento ("a importância de...",
// "o acesso a...") ou o lugar onde o problema acontece ("em ambientes
// virtuais", "apostas online"), mas às vezes faz parte do assunto. Em vez de
// remover, essas palavras entram com peso baixo.
const MOLDURA_FRACA = [
  "ambiente",
  "online",
  "virtual",
  "valorização",
  "impacto",
  "importância",
  "acesso",
  "garantia",
  "caminho",
  "efeito",
  "consequência",
  "influência",
  "papel",
  "questão",
  "persistência",
  "associado",
  "relacionado",
  "realizado",
  "democratização",
  "problema",
  "causa",
  "mundo",
  "atual",
  "atualidade",
  "século",
  "uso",
  "falta",
  "ausência",
  "necessidade",
  "dificuldade",
  "promoção",
  "crescimento",
  "aumento",
  "avanço",
  "superação",
  "preservação",
  "risco",
  "incentivo",
  "construção",
  "indiscriminado",
  "nocivo",
  "vida",
];

// Expressões que só fazem sentido juntas. "Ambiente" sozinho aparece em
// "ambiente virtual" e "ambiente de trabalho", mas "meio ambiente" é outro
// assunto; "sociais" sozinho bate em qualquer "desigualdade social"; "escolas
// de samba" não tem nada a ver com violência escolar.
const EXPRESSOES = [
  "meio ambiente",
  "redes sociais",
  "políticas públicas",
  "inteligência artificial",
  "mão de obra",
  "bem-estar",
  "fake news",
  "escola de samba",
  "agricultura familiar",
  "adoção de animais",
  "apostas esportivas",
];

export function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Mn}/gu, "");
}

function separarPalavras(texto: string): string[] {
  return texto
    .toLowerCase()
    .split(/[^\p{L}]+/u)
    .filter(Boolean);
}

// O Snowball confunde alguns plurais com terminações de verbo ("vós cantais",
// "que cantem"): "mentais" vira "ment" e não bate com "mental". Passar essas
// terminações para o singular antes resolve.
function singularizar(palavra: string): string {
  if (palavra.length <= 4) return palavra;
  if (palavra.endsWith("ais")) return palavra.slice(0, -3) + "al"; // sociais → social
  if (/[eé]is$/.test(palavra)) return palavra.replace(/[eé]is$/, "el"); // papéis → papel
  if (palavra.endsWith("ns")) return palavra.slice(0, -2) + "m"; // jovens → jovem
  return palavra;
}

// O stemmer depende do acento pra reconhecer sufixos ("-ção"), então o acento
// só sai depois.
function radical(palavra: string): string {
  // Variações da sigla (LGBT, LGBTI+, LGBTQIA+, LGBTQIAPN+) viram o mesmo termo.
  if (/^lgbt[qiapn]*$/.test(normalizar(palavra))) return "lgbt";
  return normalizar(stemmer.stem(singularizar(palavra)));
}

const RADICAIS_MOLDURA = new Set(MOLDURA.map(radical));
const RADICAIS_MOLDURA_FRACA = new Set(MOLDURA_FRACA.map(radical));
const EXPRESSOES_RADICAIS = EXPRESSOES.map((expressao) => ({
  termo: normalizar(expressao).replace(/[^\p{L}]+/gu, "_"),
  radicais: separarPalavras(expressao).map(radical),
}));

export interface Termo {
  termo: string;
  // Palavra de moldura ambígua, que deve pesar menos.
  fraco: boolean;
}

// Transforma um texto nos termos que a busca compara: expressões fixas viram
// um termo só, palavras vazias e de moldura saem, o resto vira radical.
// Cada linha é tratada separadamente, pra itens de uma lista não se juntarem.
export function processar(texto: string): Termo[] {
  const termos: Termo[] = [];

  for (const linha of texto.split("\n")) {
    const palavras = separarPalavras(linha);
    const radicais = palavras.map(radical);

    for (let i = 0; i < palavras.length; ) {
      const expressao = EXPRESSOES_RADICAIS.find(({ radicais: alvo }) =>
        alvo.every((r, j) => radicais[i + j] === r),
      );
      if (expressao) {
        termos.push({ termo: expressao.termo, fraco: false });
        i += expressao.radicais.length;
        continue;
      }

      const palavra = palavras[i];
      const r = radicais[i];
      i++;

      if (PALAVRAS_VAZIAS.has(normalizar(palavra))) continue;
      if (PAIS.has(palavra) || RADICAIS_MOLDURA.has(r)) continue;
      termos.push({ termo: r, fraco: RADICAIS_MOLDURA_FRACA.has(r) });
    }
  }

  return termos;
}
