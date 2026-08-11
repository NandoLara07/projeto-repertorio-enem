export interface Repertorio {
  id: string;
  title: string;

  type: string; // lei, filme, filosofo etc

  category: string; // Violência, Infância, Direitos, Cidadania, Educação

  specificThemes: string[]; // Violência contra a mulher, Desigualdade de gênero, Violência doméstica
  keywords: string[]; // mulher, violência, doméstica, gênero

  explanation: string; // sobre oq é O repertório, explicação do q é
  essayUsage: string; // como usar o repertório NA redação, como e quando usar ele

  usageTemplate?: string; // template do repertório pra introdução ou desenvolvimento
  usagePlaceholders?: string[]; // placeholders do template do repertório pra introdução ou desenvolvimento

  usageExample?: string[]; // exemplo do uso do repertório com um tema real. arg 1 tema, arg 2 o texto

  bestFor?: "introdução" | "desenvolvimento";
}
