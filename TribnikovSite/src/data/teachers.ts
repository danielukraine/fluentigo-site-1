import teachersData from "@/data/teachers.json";

export type LanguageId = "es" | "en" | "de" | "fr";
export type GoalId = "work" | "move" | "exam" | "life";

export type LanguageOption = {
  id: LanguageId;
  title: string;
  desc: string;
  badge: string;
};

export type Teacher = {
  id: string;
  name: string;
  headline: string;
  desc: string;
  imageUrl: string;
  tags: string[];
  languages: LanguageId[];
  goals: GoalId[];
};

type TeachersDataset = {
  languages: LanguageOption[];
  teachersByLanguage: Record<LanguageId, Teacher[]>;
};

const dataset = teachersData as TeachersDataset;

export const languageOptions = dataset.languages;
export const teachersByLanguage = dataset.teachersByLanguage;
export const teachers = Object.values(dataset.teachersByLanguage).flat();
