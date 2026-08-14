import { Repertorio } from "@/types/repertorio";

export const RepertoriosData: Repertorio[] = [
  {
    id: "000",
    title: "Título teste de repertório",

    type: "filme",

    category: "Violência / Direitos Humanos",

    specificThemes: ["Violência contra a mulher", "Desigualdade de gênero"],
    keywords: [
      "mulher",
      "violência",
      "proteção",
      "lei",
      "gênero",
      "doméstica",
      "maria",
      "penha",
    ],

    explanation:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id.",
    essayUsage:
      "Pode sustentar argumentos sobre violência de gênero, proteção institucional e políticas públicas voltadas para mulheres.",

    usageTemplate:
      "A Lei Maria da Penha (Lei 11.340/2006), criada para combater a violência doméstica e familiar contra a mulher, representa um marco na luta por direitos e proteção feminina no Brasil. Entretanto, [problema] ainda persiste na sociedade brasileira, evidenciando a insuficiência das políticas públicas de enfrentamento.",

    usageTips:
      "Substitua [problema] pelo eixo temático da redação. Funciona bem para temas de violência de gênero, proteção da mulher e falhas institucionais.",

    usagePlaceholders: ["[problema]", "[dado/exemplo]"],

    bestFor: "introdução",
  },
  {
    id: "001",
    title: "Lei Maria da Penha (Lei 11.340/2006)",

    type: "lei",

    category: "Violência / Direitos Humanos",

    specificThemes: ["Violência contra a mulher", "Desigualdade de gênero"],
    keywords: [
      "mulher",
      "violência",
      "proteção",
      "lei",
      "gênero",
      "doméstica",
      "maria",
      "penha",
    ],

    explanation:
      "Lei brasileira criada para combater a violência doméstica e familiar contra a mulher. Recebeu esse nome em homenagem a Maria da Penha Maia Fernandes.",
    essayUsage:
      "Pode sustentar argumentos sobre violência de gênero, proteção institucional e políticas públicas voltadas para mulheres.",

    usageTemplate:
      "A Lei Maria da Penha (Lei 11.340/2006), criada para combater a violência doméstica e familiar contra a mulher, representa um marco na luta por direitos e proteção feminina no Brasil. Entretanto, [problema] ainda persiste na sociedade brasileira, evidenciando a insuficiência das políticas públicas de enfrentamento.",

    usageTips:
      "Substitua [problema] pelo eixo temático da redação. Funciona bem para temas de violência de gênero, proteção da mulher e falhas institucionais.",

    usagePlaceholders: ["[problema]", "[dado/exemplo]"],

    bestFor: "introdução",
  },
  {
    id: "002",
    title: "Revolução Industrial",
    type: "evento",
    category: "Trabalho e Tecnologia",
    specificThemes: [
      "Transformação do trabalho",
      "Urbanização desordenada",
      "Exploração trabalhista",
      "Automação",
    ],
    keywords: [
      "revolução",
      "industrial",
      "trabalho",
      "fábrica",
      "urbanização",
      "exploração",
      "máquina",
    ],
    explanation:
      "Período de grandes transformações econômicas e sociais que alterou as relações de trabalho, acelerou a urbanização e criou novas formas de exploração trabalhista.",
    essayUsage:
      "Útil para temas sobre trabalho contemporâneo, automação, precarização do trabalho, direitos trabalhistas e urbanização desordenada.",
    usageTemplate:
      "Desde a Revolução Industrial, as transformações nas relações de trabalho e na organização social têm gerado impactos profundos na vida humana. No Brasil contemporâneo, essa lógica se manifesta em [problema]. [Inserir dado ou exemplo]. Assim, torna-se necessário compreender os fatores que sustentam esse cenário.",
    usagePlaceholders: ["[problema]", "[dado ou exemplo]"],
    usageTips:
      "Substitua [problema] pelo tema central da redação (ex: 'precarização dos entregadores de aplicativo') e [dado ou exemplo] por um fato ou estatística da realidade brasileira.",
    usageExample: [
      "Os desafios da precarização do trabalho no Brasil contemporâneo",
      "Desde a Revolução Industrial, as transformações nas relações de trabalho e na organização social têm gerado impactos profundos na vida humana. No Brasil contemporâneo, essa lógica se manifesta na uberização do trabalho, em que a busca por flexibilidade oculta a perda de garantias trabalhistas básicas. Assim, torna-se necessário compreender os fatores que sustentam esse cenário.",
    ],
    bestFor: "introdução",
  },
];
