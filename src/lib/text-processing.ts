import { newStemmer } from "snowball-stemmers";

const stemmer = newStemmer("portuguese");

const STOPWORDS = new Set(
  "a o as os de da do das dos e é em no na nos nas um uma uns umas para por com que se ao aos à às como mais mas ou sobre entre sem sua seu suas seus esse essa esses essas este esta estes estas isso isto pelo pela pelos pelas num numa nuns numas nesse nessa nesses nessas neste nesta nestes nestas naquele naquela naqueles naquelas naquilo desse dessa desses dessas deste desta destes destas daquele daquela daqueles daquelas daquilo eu tu ele ela nós vós eles elas me te lhe lhes nos vos mim ti si comigo contigo consigo conosco convosco meu minha meus minhas teu tua teus tuas nosso nossa nossos nossas vosso vossa vossos vossas dele dela deles delas aquele aquela aqueles aquelas aquilo não sim já ainda também só apenas menos bem mal aqui ali lá aí hoje agora sempre nunca jamais talvez porque pois porém contudo todavia entretanto logo portanto então caso embora quando enquanto assim quem qual quais quanto quanta quantos quantas onde todo toda todos todas outro outra outros outras mesmo mesma mesmos mesmas próprio própria cada algum alguma alguns algumas nenhum nenhuma tanto tanta tantos tantas qualquer sou somos são fui foi fomos foram era éramos eram seja sejam será serão seria seriam estou está estamos estão estive esteve estivemos estiveram estava estavam tenho tem temos têm tinha tínhamos tinham tive teve tivemos tiveram terá terão teria teriam há havia houve houveram brasil brasileiro brasileira brasileiros brasileiras país desafios perspectivas enfrentar contemporâneo combate enfrentamento".split(
    " ",
  ),
);

export function normalize(word: string): string {
  return word
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Mn}/gu, "");
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^\p{L}]+/u)
    .filter((word) => word.length > 0 && !STOPWORDS.has(word));
}

export function stem(word: string): string {
  // Stemmatiza primeiro (o algoritmo depende do acento pra reconhecer
  // sufixos como "-ção") e só remove o acento do resultado, pra que
  // "fábrica" e "fabrica" (sem acento) produzam o mesmo radical.
  return normalize(stemmer.stem(word.toLowerCase()));
}
