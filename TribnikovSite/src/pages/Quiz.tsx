import * as React from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { languageOptions, type LanguageId } from "@/data/teachers";
import { MANAGER_TELEGRAM_URL } from "@/config/contact";

type AgeId = "u12" | "13_18" | "18p";
type AudienceId = "self" | "child";
type ChildGoalId = "school" | "development" | "move" | "custom";
type ChildLevelId = "zero" | "beginner" | "intermediate" | "unknown";
type ChildInterestId = "games_tech" | "sport" | "creativity" | "reading_study" | "unknown" | "custom";
type AdultGoalId = "work" | "move" | "exam" | "development" | "custom";
type AdultLevelId = "zero" | "beginner" | "intermediate" | "unknown";

type QuizState = {
  language?: LanguageId;
  audience?: AudienceId;
  age?: AgeId;
  childGoal?: ChildGoalId;
  childGoalCustom?: string;
  childLevel?: ChildLevelId;
  childInterest?: ChildInterestId;
  childInterestCustom?: string;
  adultGoal?: AdultGoalId;
  adultGoalCustom?: string;
  adultLevel?: AdultLevelId;
};

type Option<T extends string> = { id: T; label: string };

const ageOptions: Option<AgeId>[] = [
  { id: "u12", label: "До 12" },
  { id: "13_18", label: "13-18" },
  { id: "18p", label: "18+" },
];

const audienceOptions: Option<AudienceId>[] = [
  { id: "self", label: "Для себе" },
  { id: "child", label: "Для своєї дитини" },
];

const childGoalOptions: Option<ChildGoalId>[] = [
  { id: "school", label: "Школа" },
  { id: "development", label: "Розвиток" },
  { id: "move", label: "Переїзд" },
  { id: "custom", label: "Інше (свій варіант)" },
];

const childLevelOptions: Option<ChildLevelId>[] = [
  { id: "zero", label: "Нульовий" },
  { id: "beginner", label: "Початковий" },
  { id: "intermediate", label: "Середній" },
  { id: "unknown", label: "Не знаю" },
];

const childInterestOptions: Option<ChildInterestId>[] = [
  { id: "games_tech", label: "Ігри / технології" },
  { id: "sport", label: "Спорт" },
  { id: "creativity", label: "Творчість" },
  { id: "reading_study", label: "Читання / навчання" },
  { id: "unknown", label: "Важко сказати" },
  { id: "custom", label: "Інше (свій варіант)" },
];

const adultGoalOptions: Option<AdultGoalId>[] = [
  { id: "work", label: "Робота" },
  { id: "move", label: "Переїзд" },
  { id: "exam", label: "Екзамени" },
  { id: "development", label: "Розвиток" },
  { id: "custom", label: "Інше (свій варіант)" },
];

const adultLevelOptions: Option<AdultLevelId>[] = [
  { id: "zero", label: "Нульовий" },
  { id: "beginner", label: "Початковий" },
  { id: "intermediate", label: "Середній" },
  { id: "unknown", label: "Не знаю" },
];

function withTelegramText(baseUrl: string, text: string) {
  const encoded = encodeURIComponent(text);
  if (baseUrl.trim() === "https://t.me/" || baseUrl.trim() === "https://t.me") {
    return `https://t.me/share/url?text=${encoded}`;
  }
  return baseUrl.includes("?") ? `${baseUrl}&text=${encoded}` : `${baseUrl}?text=${encoded}`;
}

function languageGenitive(language?: LanguageId) {
  switch (language) {
    case "en":
      return "англійської";
    case "de":
      return "німецької";
    case "es":
      return "іспанської";
    case "fr":
      return "французької";
    default:
      return "мови";
  }
}

function label<T extends string>(options: Option<T>[], id?: T) {
  return options.find((x) => x.id === id)?.label ?? "—";
}

function languageLabel(id?: LanguageId) {
  return languageOptions.find((l) => l.id === id)?.title ?? "—";
}

function resolveChildGoal(state: QuizState) {
  return state.childGoal === "custom" ? state.childGoalCustom?.trim() || "Інше" : label(childGoalOptions, state.childGoal);
}

function resolveAdultGoal(state: QuizState) {
  return state.adultGoal === "custom" ? state.adultGoalCustom?.trim() || "Інше" : label(adultGoalOptions, state.adultGoal);
}

function resolveChildInterest(state: QuizState) {
  return state.childInterest === "custom" ? state.childInterestCustom?.trim() || "Інше" : label(childInterestOptions, state.childInterest);
}

function customKeyByQuestionKey(key?: string): "childGoalCustom" | "adultGoalCustom" | "childInterestCustom" | undefined {
  if (key === "childGoal") return "childGoalCustom";
  if (key === "adultGoal") return "adultGoalCustom";
  if (key === "childInterest") return "childInterestCustom";
  return undefined;
}

function buildSummaryText(state: QuizState) {
  const lang = languageLabel(state.language);
  const audience = label(audienceOptions, state.audience);
  const age = label(ageOptions, state.age);

  if (state.audience === "child") {
    const goal = resolveChildGoal(state);
    const level = label(childLevelOptions, state.childLevel);
    const interest = resolveChildInterest(state);
    return [
      `Мова: ${lang}`,
      `Кому потрібен викладач: ${audience}`,
      `Вік: ${age}`,
      `Ціль дитини: ${goal}`,
      `Рівень: ${level}`,
      `Інтереси: ${interest}`,
      `Вижимка: Дитині ${age} років, основна ціль — ${goal}, рівень — ${level}, інтереси — ${interest}.`,
    ].join("\n");
  }

  const goal = resolveAdultGoal(state);
  const level = label(adultLevelOptions, state.adultLevel);
  return [
    `Мова: ${lang}`,
    `Кому потрібен викладач: ${audience}`,
    `Вік: ${age}`,
    `Ціль: ${goal}`,
    `Рівень: ${level}`,
    `Вижимка: Мені ${age} років, основна ціль — ${goal}, рівень — ${level}.`,
  ].join("\n");
}

function buildTelegramMessage(state: QuizState) {
  return ["Привіт! Хочу записатися на пробний урок.", "", "Анкета перед записом:", buildSummaryText(state), "", "Підкажіть, будь ласка, найближчий вільний час 🙂"].join(
    "\n",
  );
}

const Quiz = () => {
  const [state, setState] = React.useState<QuizState>({});
  const [step, setStep] = React.useState(0);
  const [done, setDone] = React.useState(false);

  const levelQuestion =
    state.audience === "child"
      ? `Який приблизний рівень ${languageGenitive(state.language)} у дитини?`
      : `Ваш приблизний рівень ${languageGenitive(state.language)}?`;

  const questions = React.useMemo(() => {
    const base = [
      {
        key: "language",
        title: "Виберіть мову",
        options: languageOptions.map((l) => ({ id: l.id, label: l.title })) as Option<LanguageId>[],
      },
      {
        key: "audience",
        title: "Мені потрібен викладач",
        options: audienceOptions,
      },
      {
        key: "age",
        title: state.audience === "child" ? "Скільки років дитині?" : "Скільки вам років?",
        options: state.audience === "self" ? ageOptions.filter((x) => x.id !== "u12") : ageOptions,
      },
    ];

    if (!state.audience) return base.slice(0, 2);
    if (!state.age) return base;

    if (state.audience === "child") {
      return [
        ...base,
        { key: "childGoal", title: "Яка основна ціль вивчення мови для дитини?", options: childGoalOptions },
        { key: "childLevel", title: levelQuestion, options: childLevelOptions },
        {
          key: "childInterest",
          title: "Чим найбільше захоплюється дитина?",
          options: childInterestOptions,
          hint: "Це допоможе нам адаптувати теми уроків під інтереси дитини.",
        },
      ];
    }

    return [
      ...base,
      { key: "adultGoal", title: "Яка ваша основна ціль?", options: adultGoalOptions },
      { key: "adultLevel", title: levelQuestion, options: adultLevelOptions },
    ];
  }, [levelQuestion, state.age, state.audience]);

  const current = questions[step];
  const total = questions.length;
  const progress = Math.round(((step + 1) / total) * 100);

  const selectedValue = React.useMemo(() => {
    if (!current) return undefined;
    return state[current.key as keyof QuizState] as string | undefined;
  }, [current, state]);
  const customKey = customKeyByQuestionKey(current?.key);
  const customValue = customKey ? (state[customKey] as string | undefined) ?? "" : "";
  const isCustomSelected = selectedValue === "custom" && !!customKey;

  React.useEffect(() => {
    const payload = {
      ...state,
      done,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem("fluentigo_quiz_snapshot", JSON.stringify(payload));
  }, [done, state]);

  const goNextWithState = (nextState: QuizState) => {
    const nextQuestions = (() => {
      const nextLevelQuestion =
        nextState.audience === "child"
          ? `Який приблизний рівень ${languageGenitive(nextState.language)} у дитини?`
          : `Ваш приблизний рівень ${languageGenitive(nextState.language)}?`;
      const base = [{ key: "language" }, { key: "audience" }, { key: "age" }];
      if (!nextState.audience) return base.slice(0, 2);
      if (!nextState.age) return base;
      if (nextState.audience === "child") return [...base, { key: "childGoal" }, { key: "childLevel", title: nextLevelQuestion }, { key: "childInterest" }];
      return [...base, { key: "adultGoal" }, { key: "adultLevel", title: nextLevelQuestion }];
    })();

    const nextStep = step + 1;
    if (nextStep >= nextQuestions.length) {
      setDone(true);
      return;
    }
    setStep(nextStep);
  };

  const onOptionSelect = (value: string) => {
    if (!current) return;

    const nextState = (() => {
      if (current.key === "language") {
        return { ...state, language: value as LanguageId };
      }
      if (current.key === "audience") {
        const audience = value as AudienceId;
        return { language: state.language, audience };
      }
      if (current.key === "age") {
        return { ...state, age: value as AgeId };
      }
      if (current.key === "childGoal") {
        return { ...state, childGoal: value as ChildGoalId, childGoalCustom: value === "custom" ? state.childGoalCustom : undefined };
      }
      if (current.key === "adultGoal") {
        return { ...state, adultGoal: value as AdultGoalId, adultGoalCustom: value === "custom" ? state.adultGoalCustom : undefined };
      }
      if (current.key === "childInterest") {
        return { ...state, childInterest: value as ChildInterestId, childInterestCustom: value === "custom" ? state.childInterestCustom : undefined };
      }
      return { ...state, [current.key]: value };
    })();

    setState(nextState);

    if (value === "custom" && customKeyByQuestionKey(current.key)) {
      return;
    }
    goNextWithState(nextState);
  };

  const onCustomContinue = () => {
    if (!current || !customKey) return;
    if (!customValue.trim()) return;
    goNextWithState(state);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border/50 bg-card/80 p-6 shadow-sm md:p-8">
          {!done && current && (
            <>
              <div className="mb-6">
                <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-muted/60 ring-1 ring-border/40">
                  <div className="h-full rounded-full bg-primary/80" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Крок {step + 1}/{total}
                </p>
                <h1 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">{current.title}</h1>
                {"hint" in current && current.hint && <p className="mt-2 text-sm text-muted-foreground">{current.hint}</p>}
              </div>

              <div className="grid gap-3">
                {current.options.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onOptionSelect(opt.id)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                      selectedValue === opt.id
                        ? "border-primary/40 bg-primary/[0.06] text-foreground"
                        : "border-border/60 bg-background/70 text-foreground hover:bg-accent/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {isCustomSelected && customKey && (
                <div className="mt-4 space-y-3 rounded-2xl border border-border/60 bg-background/70 p-4">
                  <label className="text-sm font-semibold text-foreground">Напишіть свій варіант</label>
                  <input
                    type="text"
                    value={customValue}
                    onChange={(e) => setState((prev) => ({ ...prev, [customKey]: e.target.value }))}
                    placeholder="Введіть ваш варіант"
                    className="h-11 w-full rounded-xl border border-border/60 bg-background px-3 text-sm outline-none transition-colors focus:border-primary/40"
                  />
                  <button
                    type="button"
                    onClick={onCustomContinue}
                    disabled={!customValue.trim()}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
                  >
                    Далі <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <Link to="/" className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/70 px-4 py-2.5 text-sm font-semibold hover:bg-accent/40">
                  <ArrowLeft className="h-4 w-4" />
                  На головну
                </Link>
                <button
                  type="button"
                  disabled={step === 0}
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/70 px-4 py-2.5 text-sm font-semibold hover:bg-accent/40 disabled:opacity-50"
                >
                  Назад
                </button>
              </div>
            </>
          )}

          {done && (
            <div className="space-y-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Дякуємо за відповіді!</h2>
                <p className="mt-2 text-muted-foreground">
                  Ми використаємо їх, щоб підібрати для вас оптимальний формат навчання.
                </p>
              </div>

              <a
                href={withTelegramText(MANAGER_TELEGRAM_URL, buildTelegramMessage(state))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-primary/35 md:w-auto"
              >
                Записатися на пробний урок <ArrowRight className="h-4 w-4" />
              </a>

              <p className="text-xs text-muted-foreground">
                Посилання для реклами: <code>/quiz</code>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Quiz;
