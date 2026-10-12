// Dicionário de sinônimos da busca. O tema é
// ampliado antes de buscar. Basta escrever cada termo uma vez, porque plural,
// acento e variações passam pelo mesmo tratamento de texto da busca.
//
// Regra prática: se a relação vale para qualquer repertório (bets = apostas),
// ela vem pra cá. Se é específica de um repertório, vai nas keywords dele.

// Termos equivalentes: se o tema tiver um deles, a busca procura também os
// outros, valendo menos que a palavra exata.
export const EQUIVALENTES: string[][] = [
  ["feminicídio", "violência contra a mulher"],
  ["doença mental", "saúde mental", "transtorno mental", "sofrimento psíquico"],
  ["fake news", "desinformação", "notícias falsas"],
  ["apostas", "apostas esportivas", "bets", "jogos de azar", "ludopatia"],
  ["idoso", "pessoa idosa", "envelhecimento", "terceira idade", "velhice"],
  ["estigma", "estigmatização"],
  ["trabalho análogo à escravidão", "trabalho escravo"],
  [
    "internet",
    "online",
    "virtual",
    "digital",
    "ambiente virtual",
    "ambiente digital",
  ],
  ["mudanças climáticas", "aquecimento global", "crise climática"],
  ["meio ambiente", "ambiental"],
  [
    "racismo",
    "racismo estrutural",
    "racial",
    "discriminação racial",
    "preconceito racial",
  ],
  ["lgbtfobia", "homofobia", "transfobia"],
  ["indígena", "povos originários"],
  ["educação", "ensino"],
  ["educação a distância", "ensino a distância", "ead", "ensino remoto"],
  ["criança", "infância", "infantil"],
  ["jovem", "juventude"],
  ["pobreza", "miséria"],
  ["fome", "insegurança alimentar"],
  ["moradia", "habitação"],
];

// Do específico para o geral, só nesse sentido. Um tema sobre racismo pode
// usar um repertório sobre preconceito em geral, mas um tema sobre preconceito
// contra pessoas com transtornos mentais não deve puxar repertórios de racismo.
export const MAIS_AMPLOS: { especificos: string[]; amplos: string[] }[] = [
  {
    especificos: ["feminicídio", "violência contra a mulher"],
    amplos: ["violência de gênero"],
  },
  {
    especificos: [
      "racismo",
      "racismo estrutural",
      "lgbtfobia",
      "homofobia",
      "transfobia",
      "xenofobia",
      "etarismo",
      "capacitismo",
      "gordofobia",
      "intolerância religiosa",
    ],
    amplos: ["preconceito", "discriminação"],
  },
  { especificos: ["redes sociais"], amplos: ["internet"] },
];
