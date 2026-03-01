import placementTestsData from "@/data/language_placement_tests_with_answers.json";

export type TestLanguageId = "en" | "es" | "de" | "fr";

export type TestLanguage = {
  id: TestLanguageId;
  title: string;
  badge: string;
};

export type TestOption = {
  id: string;
  text: string;
};

export type TestQuestion = {
  id: string;
  prompt: string;
  options: TestOption[];
  correctOptionId: string;
};

export type LevelThreshold = {
  level: string;
  minCorrect: number;
};

export type LanguageTest = {
  title: string;
  thresholds: LevelThreshold[];
  questions: TestQuestion[];
};

type TestsDataset = {
  languages: TestLanguage[];
  tests: Record<TestLanguageId, LanguageTest>;
};

type RawQuestion = {
  level: string;
  prompt: string;
  options: Record<string, string>;
  answer: string;
};

type RawLanguageTest = {
  test_name: string;
  questions: Record<string, RawQuestion>;
};

type RawPlacementDataset = {
  english: RawLanguageTest;
  spanish: RawLanguageTest;
  german: RawLanguageTest;
  french: RawLanguageTest;
};

const rawDataset = placementTestsData as RawPlacementDataset;

const rawKeyByLanguageId: Record<TestLanguageId, keyof RawPlacementDataset> = {
  en: "english",
  es: "spanish",
  de: "german",
  fr: "french",
};

const languageMeta: Record<TestLanguageId, { title: string; badge: string }> = {
  en: { title: "English", badge: "🇬🇧" },
  es: { title: "Spanish", badge: "🇪🇸" },
  de: { title: "German", badge: "🇩🇪" },
  fr: { title: "French", badge: "🇫🇷" },
};

const thresholds: LevelThreshold[] = [
  { level: "A1", minCorrect: 0 },
  { level: "A2", minCorrect: 6 },
  { level: "B1", minCorrect: 11 },
  { level: "B2", minCorrect: 16 },
  { level: "C1", minCorrect: 20 },
];

function mapQuestions(languageId: TestLanguageId, questionsMap: Record<string, RawQuestion>): TestQuestion[] {
  return Object.entries(questionsMap)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([number, question]) => ({
      id: `${languageId}-${number}`,
      prompt: question.prompt,
      options: Object.entries(question.options).map(([id, text]) => ({ id, text })),
      correctOptionId: question.answer,
    }));
}

const testLanguages: TestLanguage[] = (Object.keys(rawKeyByLanguageId) as TestLanguageId[]).map((languageId) => ({
  id: languageId,
  title: languageMeta[languageId].title,
  badge: languageMeta[languageId].badge,
}));

const languageTests: Record<TestLanguageId, LanguageTest> = (Object.keys(rawKeyByLanguageId) as TestLanguageId[]).reduce(
  (acc, languageId) => {
    const rawLanguage = rawDataset[rawKeyByLanguageId[languageId]];
    acc[languageId] = {
      title: rawLanguage.test_name,
      thresholds,
      questions: mapQuestions(languageId, rawLanguage.questions),
    };
    return acc;
  },
  {} as Record<TestLanguageId, LanguageTest>,
);

const dataset: TestsDataset = {
  languages: testLanguages,
  tests: languageTests,
};

export { testLanguages, languageTests };
export default dataset;
