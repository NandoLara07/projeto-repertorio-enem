import Fuse from "fuse.js";
import { RepertoriosData } from "@/db/repertorios";
import { Repertorio } from "@/types/repertorio";
import { normalize, stem, tokenize } from "@/lib/text-processing";

interface SearchEntry {
  id: string;

  normalizedKeywords: string[];
  stemmedKeywords: string[];

  normalizedThemes: string[];
  stemmedThemes: string[];

  normalizedCategory: string[];
  stemmedCategory: string[];

  normalizedEixoTematico: string[];
  stemmedEixoTematico: string[];

  normalizedTitle: string[];
  stemmedTitle: string[];

  normalizedExampleTheme: string[];
  stemmedExampleTheme: string[];
}

function buildEntry(repertorio: Repertorio): SearchEntry {
  const keywordWords = repertorio.keywords.flatMap(tokenize);
  const themeWords = repertorio.specificThemes.flatMap(tokenize);
  const categoryWords = tokenize(repertorio.category);
  const eixoTematicoWords = repertorio.eixoTematico.flatMap(tokenize);
  const titleWords = tokenize(repertorio.title);
  const exampleThemeWords = tokenize(repertorio.usageExample?.[0] ?? "");

  return {
    id: repertorio.id,

    normalizedKeywords: keywordWords.map(normalize),
    stemmedKeywords: keywordWords.map(stem),

    normalizedThemes: themeWords.map(normalize),
    stemmedThemes: themeWords.map(stem),

    normalizedCategory: categoryWords.map(normalize),
    stemmedCategory: categoryWords.map(stem),

    normalizedEixoTematico: eixoTematicoWords.map(normalize),
    stemmedEixoTematico: eixoTematicoWords.map(stem),

    normalizedTitle: titleWords.map(normalize),
    stemmedTitle: titleWords.map(stem),

    normalizedExampleTheme: exampleThemeWords.map(normalize),
    stemmedExampleTheme: exampleThemeWords.map(stem),
  };
}

const searchIndex: SearchEntry[] = RepertoriosData.map(buildEntry);

const fuse = new Fuse(searchIndex, {
  keys: [
    { name: "stemmedKeywords", weight: 0.16 }, //palvras-chave
    { name: "normalizedKeywords", weight: 0.09 },

    { name: "stemmedEixoTematico", weight: 0.13 }, //eixo tematico
    { name: "normalizedEixoTematico", weight: 0.07 },

    { name: "stemmedThemes", weight: 0.13 }, // temas específicos
    { name: "normalizedThemes", weight: 0.07 },

    { name: "stemmedCategory", weight: 0.065 }, // categoria
    { name: "normalizedCategory", weight: 0.035 },

    { name: "stemmedTitle", weight: 0.05 }, // titulo
    { name: "normalizedTitle", weight: 0.03 },

    { name: "stemmedExampleTheme", weight: 0.03 }, // tema exemplo
    { name: "normalizedExampleTheme", weight: 0.01 },
  ],
  includeScore: true,
  useExtendedSearch: true,
  ignoreLocation: true,
  threshold: 0.4,
  minMatchCharLength: 3,
});

// Nível A: campos curados e curtos (keyword/frase escolhida à mão) — sinal mais confiável.
const CURATED_FIELD_WEIGHT = 0.3;
// Nível B: campos curados, porém mais genéricos.
const BROAD_FIELD_WEIGHT = 0.2;
// Nível C: frase inteira (tema de exemplo) — carrega palavra de ligação junto com o conteúdo, menos confiável.
const EXAMPLE_FIELD_WEIGHT = 0.1;

// Exige pelo menos um match de Nível A pra entrar no resultado — independe de
// quantas outras palavras da busca não bateram em nada.
const MIN_WEIGHTED_COVERAGE = CURATED_FIELD_WEIGHT;

function bestFieldWeight(entry: SearchEntry, word: string): number {
  const normalizedWord = normalize(word);
  const stemmedWord = stem(word);
  const matches = (field: string[]) =>
    field.includes(normalizedWord) || field.includes(stemmedWord);

  if (
    matches(entry.normalizedKeywords) ||
    matches(entry.stemmedKeywords) ||
    matches(entry.normalizedEixoTematico) ||
    matches(entry.stemmedEixoTematico) ||
    matches(entry.normalizedThemes) ||
    matches(entry.stemmedThemes)
  ) {
    return CURATED_FIELD_WEIGHT;
  }

  if (
    matches(entry.normalizedCategory) ||
    matches(entry.stemmedCategory) ||
    matches(entry.normalizedTitle) ||
    matches(entry.stemmedTitle)
  ) {
    return BROAD_FIELD_WEIGHT;
  }

  if (
    matches(entry.normalizedExampleTheme) ||
    matches(entry.stemmedExampleTheme)
  ) {
    return EXAMPLE_FIELD_WEIGHT;
  }

  return 0;
}

function weightedCoverage(entry: SearchEntry, words: string[]): number {
  return words.reduce((sum, word) => sum + bestFieldWeight(entry, word), 0);
}

export type Relevance = "muito-relevante" | "relevante" | "pouco-relevante";

export interface RepertorioRecomendado {
  id: string;
  relevance?: Relevance;
}

function getRelevance(weightedCoverage: number): Relevance {
  if (weightedCoverage >= 0.9) return "muito-relevante";
  if (weightedCoverage >= 0.5) return "relevante";
  return "pouco-relevante";
}

export function buscarRepertorios(tema: string): RepertorioRecomendado[] {
  // if (tema.trim().toLowerCase() === "@all") {
  //   return RepertoriosData.map((repertorio) => ({ id: repertorio.id }));
  // }
  // Se alguma hora eu quiser q seja ordenado por ordem alfabética

  if (tema.trim().toLowerCase() === "@all") {
    return [...RepertoriosData]
      .sort((a, b) => a.title.localeCompare(b.title, "pt-BR")) // Isso aqui só pra retornar em ordem alfabetica, coisa minha mesmo
      .map((repertorio) => ({ id: repertorio.id }));
  }

  const words = tokenize(tema);
  if (words.length === 0) return [];

  const queryTerms = Array.from(
    new Set([...words.map(normalize), ...words.map(stem)]),
  );

  return fuse
    .search(queryTerms.join(" | "))
    .map((result) => ({
      id: result.item.id,
      score: result.score ?? 1,
      weightedCoverage: weightedCoverage(result.item, words),
    }))
    .filter((result) => result.weightedCoverage >= MIN_WEIGHTED_COVERAGE)
    .sort(
      (a, b) => b.weightedCoverage - a.weightedCoverage || a.score - b.score,
    )
    .map((result) => ({
      id: result.id,
      relevance: getRelevance(result.weightedCoverage),
    }));
}
