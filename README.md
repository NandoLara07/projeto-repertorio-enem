# Repertór.io

> Não sabe qual repertório usar na redação? Nós te ajudamos!

Plataforma web que recomenda **repertórios socioculturais** para a redação do ENEM. O estudante digita o tema da redação, ou algumas palavras-chave, e recebe referências já selecionadas: filmes, livros, leis, documentários, eventos históricos e conceitos. Cada uma vem com explicação, sugestão de uso e exemplo pronto.

**Acesse:** [repertor-io.com](https://repertor-io.com)

Projeto desenvolvido como Trabalho de Conclusão de Curso (PID) do **Técnico em Informática do CEFET-MG, campus Divinópolis**, em 2026.

---

## Sumário

- [O problema](#o-problema)
- [A solução](#a-solução)
- [Funcionalidades](#funcionalidades)
- [Como a busca funciona](#como-a-busca-funciona)
- [A base de repertórios](#a-base-de-repertórios)
- [Acessibilidade](#acessibilidade)
- [Tecnologias](#tecnologias)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como adicionar um repertório](#como-adicionar-um-repertório)
- [Metodologia](#metodologia)
- [Equipe](#equipe)
- [Referências](#referências)

---

## O problema

Na redação do ENEM, a **Competência II** avalia se o participante usa conhecimentos de fora dos textos motivadores: o chamado repertório sociocultural. Para valer nota, esse repertório precisa ser **legitimado** (vir de uma fonte reconhecida), **pertinente** (ter relação com o tema) e **produtivo** (contribuir de fato para o argumento).

Na prática, muitos estudantes:

- têm contato limitado com obras, leis, dados e acontecimentos que poderiam usar;
- não sabem quais referências combinam com o tema da prova;
- acabam recorrendo a **"repertórios de bolso"**: citações decoradas e usadas em qualquer tema, sem relação real com a discussão.

A internet tem muito conteúdo, mas ele está espalhado e não organizado pensando na redação. Do ponto de vista da Computação, isso é um problema de **organização e recuperação da informação**.

**Pergunta de pesquisa:** como desenvolver um mecanismo que relacione temas ou palavras-chave informados pelo usuário a repertórios socioculturais organizados, auxiliando na escolha de referências para a redação do ENEM?

## A solução

Uma plataforma web simples e direta:

1. O estudante digita o tema da redação (ex.: _"Desafios para a valorização da herança africana no Brasil"_) ou palavras-chave.
2. O sistema compara o tema com os eixos temáticos, temas específicos e palavras-chave de cada repertório cadastrado.
3. Os repertórios mais relacionados aparecem primeiro, marcados como **muito relevante**, **relevante** ou **pouco relevante**.
4. Cada repertório tem uma página própria com explicação, como usá-lo na redação e exemplos.

A plataforma **não corrige redações** e **não avalia** como o estudante usa o repertório. Ela ajuda a **encontrar** referências legitimadas e pertinentes; a produtividade depende de quem escreve.

Como os repertórios já vêm cadastrados e nenhum dado do usuário é guardado, **não há login, cadastro nem banco de dados**. O site é gerado de forma estática, é leve e qualquer pessoa usa livremente.

## Funcionalidades

**Busca e recomendação**

- Busca por tema completo ou por palavras-chave, tolerante a acentos, plurais e pequenos erros de digitação.
- Selo de relevância em cada resultado e filtro por tipo de repertório (filme, livro, lei...).
- Opção de ver todos os repertórios de uma vez.
- **Falar para escrever:** botão de microfone que transforma a fala em texto no campo de busca (Web Speech API, nos navegadores com suporte).

**Página de cada repertório**

- Explicação do repertório e orientação de **como usá-lo na redação**.
- **Exemplo coringa:** um parágrafo-modelo com campos para adaptar ao tema (`[tema]`, `[problema]`...), com dicas de preenchimento.
- **Exemplo com tema real:** o repertório aplicado em uma proposta de redação.
- Botão para **copiar** os exemplos e para **baixar tudo em PDF**.

**Interface**

- Tema claro e escuro.
- **Modo de acessibilidade**, com alto contraste e ajuste do tamanho do texto ([detalhes abaixo](#acessibilidade)).
- Layout responsivo para celular, tablet e computador.
- Transições suaves entre as páginas.

## Como a busca funciona

O mecanismo é baseado em **correspondência temática**, sem inteligência artificial nem processamento de linguagem natural pesado. Isso deixa a ferramenta simples, rápida e fácil de manter, e a busca roda inteira no navegador.

1. **Tratamento do texto** ([`texto.ts`](src/lib/busca-minisearch/texto.ts)):
   - acentos e maiúsculas são ignorados;
   - palavras gramaticais ("de", "para", "a") são removidas;
   - palavras de "moldura", comuns a quase todo tema ("desafios", "combate", "importância"), perdem peso;
   - cada palavra é reduzida ao radical com o _stemmer_ Snowball para português, para que "educação", "educacional" e "educar" se encontrem.
2. **Sinônimos** ([`sinonimos.ts`](src/lib/busca-minisearch/sinonimos.ts)): um dicionário amplia o tema. _"Bets"_ também procura _"apostas"_; _"feminicídio"_ também procura _"violência contra a mulher"_. Sinônimos valem menos que a palavra exata.
3. **Ideias do tema:** o tema vira um conjunto de ideias (palavras soltas, expressões do dicionário e pares de palavras vizinhas). Ideias raras, que aparecem em poucos repertórios, pesam mais, porque são elas que deixam o tema específico.
4. **Ranking:** o [MiniSearch](https://github.com/lucaong/minisearch) (algoritmo BM25) ordena os repertórios. Palavras-chave, temas específicos e eixos temáticos têm peso maior que título e categoria.
5. **Relevância:** cada resultado recebe uma nota de **cobertura**, que mede quanto do tema o repertório cobre. Ela vira o selo de relevância. Para ser **muito relevante**, o tema precisa aparecer no assunto principal do repertório, e não só nas palavras-chave.

Se o estudante digitar exatamente um eixo temático (ex.: _"Meio ambiente"_), a plataforma mostra todos os repertórios daquele eixo.

> A primeira versão da busca usava [Fuse.js](https://www.fusejs.io/) (busca aproximada por similaridade de texto). Ela continua no projeto ([`busca-repertorios.ts`](src/lib/busca-repertorios.ts)) para comparação, mas a versão em uso é a do MiniSearch, que trouxe resultados mais pertinentes.

## A base de repertórios

A base está em [`src/db/repertorios.ts`](src/db/repertorios.ts)

Cada repertório é organizado em **12 eixos temáticos** recorrentes no ENEM: Educação; Saúde; Meio ambiente; Tecnologia e inovação; Direitos humanos e cidadania; Desigualdade e inclusão; Diversidade e questões sociais; Trabalho e economia; Cultura e sociedade; Política e relações sociais; Urbanização e infraestrutura; Ciência e desenvolvimento.

Um mesmo repertório pode pertencer a mais de um eixo, o que amplia as chances de ele ser recomendado.

**Critérios de curadoria**, com acompanhamento docente na área de redação:

| Entram                                                                                                      | Ficam de fora                                               |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Fontes legitimadas: leis, dados oficiais, obras literárias, produções científicas e artísticas reconhecidas | "Repertórios de bolso", genéricos e usados em qualquer tema |
| Pertinência a pelo menos um eixo temático                                                                   | Referências de fontes que não podem ser verificadas         |
| Potencial argumentativo                                                                                     | Conteúdos excessivamente clichês ou descontextualizados     |
| Relevância social e/ou atualidade                                                                           |                                                             |

## Acessibilidade

- **Modo de acessibilidade** (botão ao lado do tema):
  - fundo preto puro, texto branco e botões amarelos com texto preto, todos com contraste
  - o vídeo de fundo da página inicial é desligado;
  - **zoom do texto** em 100%, 125%, 150% e 175%;
  - ao sair do modo, o site volta ao tema claro ou escuro em que estava, e o texto volta ao tamanho normal.
- **Navegação por teclado** em todo o site, com indicador de foco visível e um link **"Pular para o conteúdo"**.
- **Leitores de tela:**
  - todos os botões e campos têm nome em português;
  - cada página tem título próprio e uma estrutura de títulos (`h1`, `h2`) organizada;
  - os cards de repertório são links de verdade;
  - a contagem de resultados é anunciada quando o filtro muda.
- **Falar para escrever**, para quem tem dificuldade de digitar.
- Layouts que se adaptam a textos grandes e telas pequenas, sem cortar conteúdo.

## Tecnologias

| Tecnologia                                                          | Uso                                                                               |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [Next.js 16](https://nextjs.org)                                    | Framework React com rotas e geração estática do site                              |
| [React 19](https://react.dev)                                       | Interface baseada em componentes, com React Compiler e View Transitions           |
| [TypeScript](https://www.typescriptlang.org)                        | Tipagem estática: mais segurança e manutenção mais fácil                          |
| [Tailwind CSS 4](https://tailwindcss.com)                           | Estilização responsiva e padronizada, com temas claro, escuro e de acessibilidade |
| [shadcn/ui](https://ui.shadcn.com) + [Base UI](https://base-ui.com) | Componentes de interface acessíveis (botões, cards, select, carrossel...)         |
| [MiniSearch](https://github.com/lucaong/minisearch)                 | Motor de busca (BM25) da recomendação                                             |
| [snowball-stemmers](https://github.com/mazko/jssnowball)            | Redução das palavras ao radical em português                                      |
| [next-themes](https://github.com/pacocoursey/next-themes)           | Tema claro e escuro                                                               |
| [jsPDF](https://github.com/parallax/jsPDF)                          | Geração do PDF de cada repertório                                                 |
| [Embla Carousel](https://www.embla-carousel.com)                    | Carrossel dos exemplos de uso                                                     |
| [Lucide](https://lucide.dev)                                        | Ícones                                                                            |
| [Sonner](https://sonner.emilkowal.ski)                              | Notificações (ex.: "Texto copiado!")                                              |
| Web Speech API                                                      | Reconhecimento de voz do recurso "falar para escrever"                            |
| [Lovable](https://lovable.dev)                                      | Prototipação inicial das telas                                                    |
| [Vercel](https://vercel.com)                                        | Hospedagem                                                                        |

## Como rodar o projeto

Requisito: [Node.js](https://nodejs.org) 20.9 ou mais recente.

```bash
# 1. Clonar o repositório
git clone https://github.com/NandoLara07/projeto-repertorio-enem.git
cd projeto-repertorio-enem

# 2. Instalar as dependências
npm install

# 3. Rodar em modo de desenvolvimento
npm run dev
```

Depois é só abrir [http://localhost:3000](http://localhost:3000).

Outros comandos:

| Comando         | O que faz                                              |
| --------------- | ------------------------------------------------------ |
| `npm run build` | Gera a versão final do site, estática, na pasta `out/` |
| `npm run start` | Sobe a versão de produção localmente                   |
| `npm run lint`  | Verifica o código com o ESLint                         |

## Estrutura do projeto

```
src/
├── app/                      # Páginas (App Router do Next.js)
│   ├── page.tsx              # Página inicial
│   ├── busca/                # Campo de busca (com o microfone)
│   ├── repertorios/          # Lista de resultados e página de cada repertório ([id])
│   ├── not-found.tsx         # Página de erro 404
│   ├── layout.tsx            # Estrutura comum a todas as páginas
│   └── globals.css           # Estilos globais e cores dos temas
├── components/
│   ├── common/               # Header, botões de copiar/PDF/microfone, controles de acessibilidade...
│   └── ui/                   # Componentes base (botão, card, select, carrossel...)
├── db/repertorios.ts         # Base de repertórios
├── lib/
│   ├── busca-minisearch/     # Mecanismo de busca em uso (texto, sinônimos e ranking)
│   ├── busca-repertorios.ts  # Primeira versão da busca (Fuse.js), mantida para comparação
│   ├── accessibility.ts      # Configuração do modo de acessibilidade
│   └── pdf-logo.ts           # Logo desenhada no PDF
├── hooks/                    # Modo de acessibilidade, reconhecimento de voz...
├── providers/                # Provedor de tema
└── types/                    # Tipos TypeScript (formato de um repertório, etc.)
```

## Como adicionar um repertório

1. Abra [`src/db/repertorios.ts`](src/db/repertorios.ts) e acrescente um objeto seguindo o formato definido em [`src/types/repertorio.ts`](src/types/repertorio.ts):
   - `id`, `title`, `type` e `category`;
   - `eixoTematico` (um ou mais dos 12 eixos);
   - `specificThemes` e `keywords`, que são o que a busca usa para encontrá-lo;
   - `explanation` (o que é) e `essayUsage` (como usar na redação);
   - opcionais: `usageTemplate`, `usagePlaceholders` e `usageTips` (exemplo coringa), `usageExample` (exemplo com tema real) e `bestFor` (introdução ou desenvolvimento).
2. Se o repertório depende de um sinônimo que vale para qualquer tema (ex.: _bets_ = _apostas_), acrescente-o em [`sinonimos.ts`](src/lib/busca-minisearch/sinonimos.ts). Relações específicas de um repertório vão nas `keywords` dele.
3. Rode `npm run dev` e teste a busca com temas reais de redação.

## Metodologia

O projeto é uma pesquisa aplicada, de abordagem qualitativa e caráter exploratório, guiada pelo **Design Thinking**:

| Etapa            | No projeto                                                                                                                  |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Empatia**      | Levantamento bibliográfico e estudo das dificuldades dos estudantes com repertório sociocultural                            |
| **Ideação**      | Definição da plataforma web e das suas funcionalidades                                                                      |
| **Prototipação** | Protótipos de interface no Lovable, depois refinados no desenvolvimento                                                     |
| **Testes**       | Verificação da pertinência das recomendações e da usabilidade, com ajustes iterativos nos eixos, palavras-chave e interface |

## Equipe

Centro Federal de Educação Tecnológica de Minas Gerais (**CEFET-MG**), Técnico em Informática, campus Divinópolis.

- Fernando Lara dos Santos
- Isabela dos Santos Cordeiro
- Maria Paula Fonte Cavalcante Alves de Souza
- Thabatta Moreira Alves de Araújo (orientadora)
- Luiz Carlos Gonçalves (coorientador)

## Referências

- ALT, L. et al. O que é design thinking? _Revista Coaching Brasil_, n. 213, p. 14–17, 2017.
- BRASIL. Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira (INEP). _A redação no Enem 2026: cartilha do participante_. Brasília, DF, 2026. Disponível em: <https://www.gov.br/inep>.
- GONÇALVES, G. Nem todo coringa vale a jogada: argumentação e repertório coringa na redação do Enem no 3º ano do ensino médio. _LínguaTec_, v. 11, 2026.
- GONÇALVES, L. C. _Redação_. CEFET-MG, Divinópolis, 2026.
- OLIVEIRA NERI, Z.; MARTINS BRITO, R. Estudos linguísticos e argumentação: o uso do repertório sociocultural a favor da construção de argumentos na redação Enem. _Revista Gatilho_, v. 25, 2023.
- ROWE, P. G. _Design thinking_. MIT Press, 1991.
