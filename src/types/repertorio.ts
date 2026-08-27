export type EixoTematico =
  | "Educação" // acesso, qualidade, evasão, tecnologia educacional, alfabetização
  | "Saúde" // saúde pública, saúde mental, prevenção, alimentação
  | "Meio ambiente" // mudanças climáticas, preservação, recursos naturais, sustentabilidade
  | "Tecnologia e inovação" // IA, redes sociais, privacidade, inclusão digital
  | "Direitos humanos e cidadania" // direitos fundamentais, participação social, democracia
  | "Desigualdade e inclusão" // pobreza, desigualdade social, deficiência, grupos vulneráveis
  | "Diversidade e questões sociais" // gênero, raça, etnia, sexualidade, preconceito
  | "Trabalho e economia" // desemprego, informalidade, automação, empreendedorismo
  | "Cultura e sociedade" // arte, literatura, patrimônio, identidade cultural
  | "Política e relações sociais" // democracia, instituições, políticas públicas, participação política
  | "Urbanização e infraestrutura" // moradia, transporte, saneamento, mobilidade
  | "Ciência e desenvolvimento"; // pesquisa, inovação científica, biotecnologia, desenvolvimento

export interface Repertorio {
  id: string;
  title: string;

  type:
    | "filme"
    | "lei"
    | "documentario"
    | "serie"
    | "evento"
    | "dado"
    | "livro"
    | "conceito"
    | "movimento"
    | "citação"
    | "pessoa";

  category: string; // Violência, Infância, Direitos, Cidadania, Educação

  eixoTematico: EixoTematico[]; // pode ter mais de um eixo

  specificThemes: string[]; // Violência contra a mulher, Desigualdade de gênero, Violência doméstica
  keywords: string[]; // mulher, violência, doméstica, gênero

  explanation: string; // sobre oq é O repertório, explicação do q é
  essayUsage: string; // como usar o repertório NA redação, como e quando usar ele

  usageTemplate?: string; // template do repertório pra introdução ou desenvolvimento
  usagePlaceholders?: string[]; // [problema], [dado/exemplo] etc
  usageTips?: string; // dicas de oq substituir no no placeholder

  usageExample?: string[]; // exemplo do uso do repertório com um tema real. arg 1 tema, arg 2 o texto

  bestFor?: "introdução" | "desenvolvimento";
}
