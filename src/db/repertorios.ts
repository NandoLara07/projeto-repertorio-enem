import { Repertorio } from "@/types/repertorio";

export const RepertoriosData: Repertorio[] = [
  // {
  //   id: "000",
  //   title: "Título teste de repertório",

  //   type: "filme",

  //   category: "Violência / Direitos Humanos",

  //   eixoTematico: ["Direitos humanos e cidadania"],

  //   specificThemes: ["Violência contra a mulher", "Desigualdade de gênero"],
  //   keywords: [
  //     "mulher",
  //     "violência",
  //     "proteção",
  //     "lei",
  //     "gênero",
  //     "doméstica",
  //     "maria",
  //     "penha",
  //   ],

  //   explanation:
  //     "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \n\n Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \n\n Morbi ut, elementum nullam nam. Elementum nisi gravida duis, eros curabitur tempor, ac felis libero et dui metus quis iaculis. Lacinia erat, quam suspendisse arcu malesuada. Eros fringilla nibh, massa curabitur, maecenas ut nunc eleifend laoreet nisl. Praesent egestas tempor dapibus, pulvinar hac ligula dolor sociosqu. Luctus iaculis elit, risus et, id semper himenaeos tortor leo. Litora consectetur curabitur habitasse, sed ultrices sit, tincidunt dictum rhoncus aliquam per lorem lobortis metus. Auctor id faucibus, commodo praesent, habitasse fermentum vulputate adipiscing nisi.",
  //   essayUsage:
  //     "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \n\n Morbi ut, elementum nullam nam. Elementum nisi gravida duis, eros curabitur tempor, ac felis libero et dui metus quis iaculis. Lacinia erat, quam suspendisse arcu malesuada. Eros fringilla nibh, massa curabitur, maecenas ut nunc eleifend laoreet nisl. Praesent egestas tempor dapibus, pulvinar hac ligula dolor sociosqu. Luctus iaculis elit, risus et, id semper himenaeos tortor leo. Litora consectetur curabitur habitasse, sed ultrices sit, tincidunt dictum rhoncus aliquam per lorem lobortis metus. Auctor id faucibus, commodo praesent, habitasse fermentum vulputate adipiscing nisi.",

  //   usageTemplate:
  //     "Desde a Revolução Industrial, as transformações nas relações de trabalho e na organização social têm gerado impactos profundos na vida humana. No Brasil contemporâneo, essa lógica se manifesta na [problema], em que a busca por flexibilidade oculta a perda de garantias trabalhistas básicas. Assim, torna-se necessário compreender os fatores que sustentam esse cenário. Lorem ipsum dolor sit amet consectetur adipiscing elit. [dado/exemplo] vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. ",

  //   usageTips:
  //     "Substitua [problema] pelo eixo temático da redação. Funciona bem para temas de violência de gênero, proteção da mulher e falhas institucionais.",

  //   usagePlaceholders: ["[problema]", "[dado/exemplo]"],

  //   usageExample: [
  //     "Desafios para fazer um site que recomenda repertórios",
  //     "Desde a Revolução Industrial, as transformações nas relações de trabalho e na organização social têm gerado impactos profundos na vida humana. No Brasil contemporâneo, essa lógica se manifesta na uberização do trabalho, em que a busca por flexibilidade oculta a perda de garantias trabalhistas básicas. Assim, torna-se necessário compreender os fatores que sustentam esse cenário. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. ",
  //   ],

  //   bestFor: "introdução",
  // },
  {
    id: "001",
    title: "Lei Maria da Penha (Lei 11.340/2006)",

    type: "lei",

    category: "Violência / Direitos Humanos",

    eixoTematico: ["Direitos humanos e cidadania"],

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
    eixoTematico: ["Trabalho e economia"],
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
  {
    id: "003",
    title: "Que Horas Ela Volta?",
    type: "filme",
    category: "Desigualdade Social / Trabalho / Educação / Xenofobia",
    eixoTematico: ["Desigualdade e inclusão", "Trabalho e economia"],
    specificThemes: [
      "Desigualdade socioeconômica",
      "Relações de trabalho",
      "Trabalho doméstico",
      "Divisão de classes",
      "Mobilidade social",
      "Acesso à educação",
      "Privilégios de classe",
    ],
    keywords: [
      "desigualdade",
      "trabalho",
      "socioeconômica",
      "educação",
      "privilégios",
      "doméstico",
      "relações de trabalho",
      "mobilidade social",
      "classes",
      "filmes",
      "xenofobia",
      "nordestina",
      "preconceito regional",
      "migração interna",
      "hierarquia social",
      "oportunidades",
    ],
    explanation:
      '"Que Horas Ela Volta?" é um filme brasileiro dirigido por Anna Muylaert, lançado em 2015. A obra acompanha Val, uma empregada doméstica que trabalha na casa de uma família de classe alta em São Paulo. A chegada de sua filha, Jéssica, evidencia as diferenças sociais presentes naquele ambiente, especialmente por meio das relações entre empregados e patrões. O filme aborda como as desigualdades de classe influenciam o acesso a espaços, oportunidades e direitos, além de questionar a naturalização das hierarquias sociais.',
    essayUsage:
      "O filme pode ser utilizado para evidenciar como a desigualdade social ultrapassa a diferença de renda e também se manifesta no acesso a oportunidades, espaços e direitos. A relação entre Val e os patrões permite discutir a desigualdade nas relações de trabalho, especialmente no trabalho doméstico. Já a trajetória de Jéssica pode ser relacionada à educação e à mobilidade social, mostrando como o acesso a oportunidades pode desafiar posições sociais tradicionalmente estabelecidas. O repertório também pode ser usado para problematizar a naturalização dos privilégios de determinados grupos sociais, além de retratar a xenofobia sofrida pela personagem Jéssica por ser nordestina.",
    usageTemplate:
      'No filme brasileiro "Que Horas Ela Volta?", dirigido por Anna Muylaert, a relação entre a empregada doméstica Val e a família para a qual trabalha evidencia como as diferenças de classe influenciam o acesso a espaços e oportunidades. De maneira semelhante, na realidade brasileira, [problema] revela a permanência de desigualdades que ultrapassam o aspecto econômico e dificultam [consequência do tema].',
    usagePlaceholders: ["[problema]", "[consequência]"],
    usageTips:
      'No campo [problema], coloque o principal problema apresentado pelo tema da redação. Em [consequência do tema], indique o efeito provocado por esse problema. O repertório funciona melhor quando o tema envolve desigualdade, trabalho, educação, oportunidades, privilégios sociais ou mobilidade social. Evite utilizar o filme apenas para afirmar que "existe desigualdade"; relacione uma situação da obra ao problema discutido na redação.',
    usageExample: [
      "Desafios para combater a desigualdade social no Brasil",
      'No filme brasileiro "Que Horas Ela Volta?", dirigido por Anna Muylaert, a relação entre a empregada doméstica Val e a família para a qual trabalha evidencia como as diferenças de classe influenciam o acesso a espaços e oportunidades. De maneira semelhante, na sociedade brasileira, a desigualdade social ainda limita o acesso de parte da população a direitos e oportunidades, uma vez que condições socioeconômicas distintas contribuem para a manutenção de privilégios e dificultam a mobilidade social.',
    ],
    bestFor: "introdução",
  },
  {
    id: "004",
    title: "Direito Universal do Direito Humano (DUDH)",
    type: "lei",
    category: "Direitos Humanos / Cidadania / Direitos Sociais",
    eixoTematico: ["Direitos humanos e cidadania", "Desigualdade e inclusão"],
    specificThemes: [
      "Direitos fundamentais",
      "Dignidade humana",
      "Igualdade",
      "Liberdade",
      "Cidadania",
      "Discriminação",
      "Desigualdade social",
      "Acesso a direitos",
      "Direitos sociais",
      "Violência",
      "Educação",
      "Saúde",
      "Trabalho",
      "Moradia",
      "Liberdade de expressão",
    ],
    keywords: [
      "direitos humanos",
      "dignidade",
      "igualdade",
      "liberdade",
      "cidadania",
      "direitos fundamentais",
      "discriminação",
      "direitos sociais",
      "onu",
      "educação",
      "saúde",
      "trabalho",
      "moradia",
      "documento",
      "dudh",
    ],
    explanation:
      "A Declaração Universal dos Direitos Humanos (DUDH) é um documento adotado pela Organização das Nações Unidas (ONU) em 1948, que estabelece princípios e direitos fundamentais que devem ser assegurados a todas as pessoas, independentemente de características como origem, sexo, religião ou condição social. O documento defende princípios como liberdade, igualdade, dignidade e direito à segurança, além de reconhecer direitos relacionados à educação, ao trabalho e à participação social.",
    essayUsage:
      "A DUDH pode ser utilizada para demonstrar que determinado problema social representa uma violação ou um obstáculo à garantia de direitos fundamentais. O repertório é especialmente útil quando o tema envolve desigualdade, discriminação, violência, acesso à educação, saúde, trabalho, moradia ou cidadania. Também pode ser utilizado para estabelecer uma relação entre o princípio de dignidade humana e situações em que parte da população não possui seus direitos efetivamente garantidos.",
    usageTemplate:
      "Em 1948, a ONU promulgou a Declaração Universal dos Direitos Humanos, como resposta imediata às atrocidades cometidas nas duas guerras mundiais. Mais do que isso, a entidade visava a garantir a todos condições mínimas de sobrevivência em ambiente de respeito, igualdade e liberdade. O Brasil foi signatário e militante ativo dessa declaração. Entretanto, é inegável que o país ainda está distante de concretizar os ideais desse documento. Prova disso é que boa parte dos brasileiros ainda convive com graves ameaças à sua qualidade de vida. É o caso do/da [problema]. Segundo [dado / exemplo / explicação]. Esse é um problema forjado sobre duas causas históricas.",
    usagePlaceholders: ["[problema]", "[dado / exemplo / explicação]"],
    usageTips:
      "No campo [problema], coloque o problema central apresentado pelo tema. No segundo placeholder, acrescente um dado estatístico, exemplo concreto ou explicação que comprove a existência desse problema. A estrutura funciona melhor quando o problema apresentado pode ser relacionado à violação ou à dificuldade de concretização dos princípios de igualdade, liberdade, respeito e dignidade defendidos pela Declaração.",
    usageExample: [
      "Desafios para garantir o acesso à educação de qualidade no Brasil",
      "Em 1948, a ONU promulgou a Declaração Universal dos Direitos Humanos, como resposta imediata às atrocidades cometidas nas duas guerras mundiais. Mais do que isso, a entidade visava a garantir a todos condições mínimas de sobrevivência em ambiente de respeito, igualdade e liberdade. O Brasil foi signatário e militante ativo dessa declaração. Entretanto, é inegável que o país ainda está distante de concretizar os ideais desse documento. Prova disso é que boa parte dos brasileiros ainda convive com graves ameaças à sua qualidade de vida. É o caso da desigualdade no acesso à educação de qualidade. Segundo [dado estatístico ou exemplo sobre a desigualdade educacional], parte da população brasileira ainda enfrenta dificuldades para usufruir de uma formação adequada. Esse é um problema forjado sobre duas causas históricas.",
    ],
    bestFor: "introdução",
  },
  {
    id: "005",
    title: "Ensaio sobre a cegueira",
    type: "livro",
    category:
      "Empatia / Cidadania / Solidariedade / Individualismo / Invisibilidade Social / Responsabilidade Coletiva",
    eixoTematico: ["Cultura e sociedade", "Direitos humanos e cidadania"],
    specificThemes: [
      "Indiferença social",
      "Invisibilidade social",
      "Individualismo",
      "Falta de empatia",
      "Exclusão social",
      "Responsabilidade coletiva",
      "Naturalização de problemas sociais",
    ],
    keywords: [
      "empatia",
      "indiferença",
      "invisibilidade social",
      "individualismo",
      "solidariedade",
      "responsabilidade coletiva",
      "exclusão",
      "cegueira social",
      "josé saramago",
    ],
    explanation:
      '"Ensaio sobre a cegueira" é um romance do escritor português José Saramago, publicado em 1995. A obra apresenta uma sociedade atingida por uma epidemia de cegueira, que provoca desorganização social e expõe diferentes comportamentos humanos diante de uma situação extrema. A cegueira apresentada na narrativa também funciona como uma metáfora para a incapacidade de enxergar o outro, seus problemas e suas necessidades, evidenciando o individualismo e a ausência de empatia nas relações sociais.',
    essayUsage:
      "O repertório pode ser utilizado para discutir problemas cuja permanência esteja relacionada à indiferença da sociedade ou à dificuldade de reconhecer a realidade vivenciada por determinados grupos. A metáfora da cegueira permite relacionar a falta de empatia e o individualismo à naturalização de problemas sociais, mostrando que aquilo que não é devidamente percebido ou reconhecido pela coletividade tende a permanecer invisível.",
    usageTemplate:
      'Além disso, o [argumento 2] é outro desafio. Baseadas em valores ultrapassados, muitas pessoas acabam por normalizar condutas e situações que deveriam ser repudiadas. Nesse contexto, mazelas como a [tema] persistem porque são sustentadas por uma percepção errada por boa parte da população sobre o tema. Ou seja, enquanto o conhecimento partilhado pela maioria não for suficiente para alcançar os impactos dessa falta de valorização, o problema dificilmente será sanado. Isso porque, assim como sugere José Saramago na obra "Ensaio sobre a cegueira", a incapacidade das pessoas de ver o outro gera uma sociedade de indivíduos autocentrados e incapazes de exercer a empatia.',
    usagePlaceholders: ["[argumento 2]", "[tema]"],
    usageTips:
      "Em [TEMA], reescreva com outras palavras o tema proposto pelo caderno de redação. O repertório é especialmente adequado quando o tema envolve invisibilidade, negligência, indiferença ou naturalização de uma questão social.",
    usageExample: [
      "Desafios para o enfrentamento da invisibilidade do trabalho de cuidado realizado pela mulher no Brasil",
      'Além disso, o imaginário coletivo distorcido é outro desafio. Baseadas em valores ultrapassados, muitas pessoas acabam por normalizar condutas e situações que deveriam ser repudiadas. Nesse contexto, mazelas como a invisibilidade do trabalho de cuidado realizado pela mulher persistem porque são sustentadas por uma percepção errada por boa parte da população sobre o tema. Ou seja, enquanto o conhecimento partilhado pela maioria não for suficiente para alcançar os impactos dessa falta de valorização, o problema dificilmente será sanado. Isso porque, assim como sugere José Saramago na obra "Ensaio sobre a cegueira", a incapacidade das pessoas de ver o outro gera uma sociedade de indivíduos autocentrados e incapazes de exercer a empatia.',
    ],
    bestFor: "desenvolvimento",
  },
  {
    id: "006",
    title: "O Dilema das Redes",
    type: "documentario",
    category:
      "Tecnologia / Redes Sociais / Privacidade / Saúde Mental / Manipulação da Informação",
    eixoTematico: [
      "Tecnologia e inovação",
      "Saúde",
      "Política e relações sociais",
    ],
    specificThemes: [
      "Uso excessivo das redes sociais",
      "Dependência tecnológica",
      "Manipulação comportamental",
      "Coleta de dados",
      "Privacidade digital",
      "Disseminação de desinformação",
      "Polarização social",
      "Saúde mental",
      "Influência dos algoritmos",
      "Consumo de informação",
    ],
    keywords: [
      "redes sociais",
      "algoritmos",
      "privacidade",
      "dados pessoais",
      "desinformação",
      "dependência digital",
      "saúde mental",
      "manipulação",
      "polarização",
      "tecnologia",
    ],
    explanation:
      '"O Dilema das Redes" é um documentário de 2020 dirigido por Jeff Orlowski. A obra combina depoimentos de ex-executivos de Big Techs e cenas dramatizadas para revelar como as redes sociais utilizam algoritmos persuasivos e manipulação psicológica para viciar os usuários, monitorar seus comportamentos e monetizar sua atenção. O documentário alerta que a busca desenfreada por engajamento transforma os próprios usuários no produto comercializado pelas plataformas, gerando consequências graves para a sociedade, como o avanço da polarização política, a disseminação de desinformação em massa e a deterioração da saúde mental, especialmente entre os jovens.',
    essayUsage:
      "O documentário pode ser utilizado para discutir como o funcionamento das redes sociais influencia o comportamento dos usuários e a circulação de informações. Também permite abordar problemas relacionados à privacidade, à coleta de dados, à dependência tecnológica, à desinformação e aos impactos das plataformas digitais sobre a saúde mental. O repertório é especialmente interessante quando o tema envolve os efeitos sociais do uso das tecnologias digitais, pois permite relacionar o problema não apenas ao comportamento do usuário, mas também à estrutura das próprias plataformas.",
    usageTemplate:
      'O documentário "O Dilema das Redes" apresenta os mecanismos utilizados pelas plataformas digitais para influenciar o comportamento dos usuários. Nesse contexto, as redes sociais passaram a ocupar um espaço significativo na vida cotidiana, mas seu funcionamento também contribui para [problema]. No Brasil, [dado/exemplo/explicação]. Assim, para enfrentar [tema], é preciso superar dois desafios históricos.',
    usagePlaceholders: ["[problema]", "[dado/exemplo/explicação]", "[tema]"],
    usageTips:
      "No campo [PROBLEMA], coloque o principal problema apresentado pelo tema da redação. No segundo placeholder, acrescente um dado estatístico, exemplo concreto ou explicação que comprove a existência desse problema. Em [TEMA], reescreva com outras palavras o tema proposto pelo caderno de redação. O repertório funciona melhor quando o tema envolve redes sociais, tecnologia, informação, privacidade ou comportamento digital.",
    usageExample: [
      "Desafios para combater a disseminação de desinformação nas redes sociais brasileiras",
      'O documentário "O Dilema das Redes" apresenta os mecanismos utilizados pelas plataformas digitais para influenciar o comportamento dos usuários. Nesse contexto, as redes sociais passaram a ocupar um espaço significativo na circulação de informações, mas seu funcionamento também contribui para a disseminação de conteúdos enganosos. No Brasil, a ampla utilização dessas plataformas amplia o alcance de informações cuja veracidade nem sempre é verificada. Assim, para combater a divulgação de fake news na internet, é preciso superar dois desafios históricos: a lógica de funcionamento dos algoritmos e a insuficiência da educação midiática.',
    ],
    bestFor: "introdução",
  },
];
