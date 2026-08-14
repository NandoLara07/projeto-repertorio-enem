export interface Repertorio {
  id: string;
  title: string;

  type:
    | "lei"
    | "filme"
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
