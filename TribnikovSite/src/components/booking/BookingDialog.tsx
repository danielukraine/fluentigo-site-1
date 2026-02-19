import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Heart,
  MessageCircle,
  Users,
  Wand2,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogClose, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { MANAGER_TELEGRAM_URL } from "@/config/contact";

type BookingScreen = "entry" | "wizard" | "manager";

type LanguageId = "de" | "en" | "fr";
type GoalId = "work" | "move" | "exam" | "life";
type TeacherId = "anna" | "oleh" | "maria";

type BookingState = {
  language?: LanguageId;
  goal?: GoalId;
  teacher?: TeacherId;
};

const languages: Array<{ id: LanguageId; title: string; desc: string; badge: string }> = [
  { id: "de", title: "Німецька", desc: "Для роботи, навчання, інтеграції", badge: "🇩🇪" },
  { id: "en", title: "Англійська", desc: "Speaking, робота, міжнародне середовище", badge: "🇬🇧" },
  { id: "fr", title: "Французька", desc: "З нуля або для життя/подорожей", badge: "🇫🇷" },
];

const goals: Array<{ id: GoalId; title: string; desc: string; icon: React.ElementType }> = [
  { id: "work", title: "Робота", desc: "співбесіди, дзвінки, листування", icon: Briefcase },
  { id: "move", title: "Переїзд", desc: "інтеграція, побут, документи", icon: Users },
  { id: "exam", title: "Екзамен", desc: "структура + тренування форматів", icon: GraduationCap },
  { id: "life", title: "Для життя", desc: "подорожі, хобі, комфорт", icon: Heart },
];

type Teacher = {
  id: TeacherId;
  name: string;
  headline: string;
  desc: string;
  imageUrl: string;
  tags: string[];
  languages: LanguageId[];
  goals: GoalId[];
};

const teachers: Teacher[] = [
  {
    id: "anna",
    name: "Анна Коваль",
    headline: "Німецька • інтеграція та робота",
    desc: "Спокійний темп, чіткий план, багато говоріння.",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80",
    tags: ["5+ років", "A1–B2", "говоріння"],
    languages: ["de"],
    goals: ["move", "work"],
  },
  {
    id: "oleh",
    name: "Олег Мельник",
    headline: "Англійська • speaking та робота",
    desc: "Живі діалоги, впевненість у розмові, вимова.",
    imageUrl: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=256&h=256&q=80",
    tags: ["4+ роки", "Speaking", "інтервʼю"],
    languages: ["en"],
    goals: ["work", "exam", "life"],
  },
  {
    id: "maria",
    name: "Марія Петренко",
    headline: "Французька • з нуля / для життя",
    desc: "Мʼякий старт, зрозуміла граматика, практика.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80",
    tags: ["3+ роки", "з нуля", "подорожі"],
    languages: ["fr"],
    goals: ["life", "move"],
  },
];

function labelById<T extends { id: string; title: string }>(list: T[], id?: string) {
  if (!id) return undefined;
  return list.find((x) => x.id === id)?.title;
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

function withTelegramText(baseUrl: string, text: string) {
  const encoded = encodeURIComponent(text);
  // If user hasn't set a username (placeholder "https://t.me/"), fall back to Telegram share UI.
  if (baseUrl.trim() === "https://t.me/" || baseUrl.trim() === "https://t.me") {
    return `https://t.me/share/url?text=${encoded}`;
  }

  return baseUrl.includes("?") ? `${baseUrl}&text=${encoded}` : `${baseUrl}?text=${encoded}`;
}

function buildTelegramMessage(state: BookingState) {
  const lang = labelById(languages, state.language) ?? "—";
  const goal = labelById(goals, state.goal) ?? "—";
  const teacher = teachers.find((t) => t.id === state.teacher)?.name ?? "—";

  return [
    "Привіт! Хочу записатися на пробний урок.",
    "",
    `Мова: ${lang}`,
    `Ціль: ${goal}`,
    `Викладач: ${teacher}`,
    "",
    "Підкажіть, будь ласка, найближчий вільний час 🙂",
  ].join("\n");
}

function ChoiceCard({
  selected,
  title,
  desc,
  icon: Icon,
  badge,
  onClick,
}: {
  selected?: boolean;
  title: string;
  desc: string;
  icon?: React.ElementType;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "group w-full rounded-3xl border p-5 text-left transition-all duration-300",
        "bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.04]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        selected && "border-primary/30 bg-primary/[0.03] ring-1 ring-primary/15",
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
            selected ? "bg-primary/15" : "bg-accent/40",
          )}
        >
          {badge ? (
            <span className="text-lg leading-none">{badge}</span>
          ) : Icon ? (
            <Icon className="h-5 w-5 text-primary" />
          ) : (
            <CheckCircle2 className="h-5 w-5 text-primary" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h4 className="text-base font-bold tracking-tight">{title}</h4>
            {selected && <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />}
          </div>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{desc}</p>
        </div>
      </div>
    </button>
  );
}

function TeacherCard({
  teacher,
  selected,
  recommended,
  onClick,
}: {
  teacher: Teacher;
  selected?: boolean;
  recommended?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "group w-full rounded-3xl border p-5 text-left transition-all duration-300",
        "bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.04]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        selected && "border-primary/30 bg-primary/[0.03] ring-1 ring-primary/15",
      )}
    >
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12 rounded-2xl">
          <AvatarImage src={teacher.imageUrl} alt={teacher.name} />
          <AvatarFallback className="rounded-2xl text-sm font-bold">{getInitials(teacher.name)}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-base font-extrabold tracking-tight truncate">{teacher.name}</p>
              <p className="mt-0.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest truncate">
                {teacher.headline}
              </p>
            </div>
            {selected ? (
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            ) : recommended ? (
              <span className="shrink-0 rounded-full bg-highlight/60 px-2.5 py-1 text-[11px] font-semibold text-highlight-foreground ring-1 ring-border/40">
                Рекоменд.
              </span>
            ) : null}
          </div>

          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{teacher.desc}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {teacher.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-accent/60 px-3 py-1 text-xs font-semibold text-accent-foreground ring-1 ring-border/40"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

export function BookingDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const totalSteps = 3;
  const [screen, setScreen] = React.useState<BookingScreen>("entry");
  const [step, setStep] = React.useState<number>(1);
  const [state, setState] = React.useState<BookingState>({});

  React.useEffect(() => {
    if (open) return;
    setScreen("entry");
    setStep(1);
    setState({});
  }, [open]);

  const isWizard = screen === "wizard";

  const progress = isWizard ? Math.round((Math.min(step, totalSteps) / totalSteps) * 100) : 0;

  const headerTitle =
    screen === "entry" ? "Як тобі зручніше?" : screen === "wizard" ? "Короткий підбір" : "Звʼязатися з менеджером";
  const headerSubtitle =
    screen === "entry"
      ? "Пробний урок — після короткого підбору. Так швидше отримуєш результат."
      : screen === "wizard"
        ? `Крок ${step}/${totalSteps}`
        : "Постав питання — підберемо варіант і час.";

  const canGoNext = !isWizard || (step === 1 && !!state.language) || (step === 2 && !!state.goal);
  const canFinish = !!state.language && !!state.goal && !!state.teacher;

  const goBack = () => {
    if (screen === "wizard") {
      if (step <= 1) setScreen("entry");
      else setStep((s) => s - 1);
      return;
    }
    setScreen("entry");
  };

  const goNext = () => {
    if (!isWizard) return;
    setStep((s) => Math.min(totalSteps, s + 1));
  };

  const managerLink = withTelegramText(MANAGER_TELEGRAM_URL, buildTelegramMessage(state));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-foreground/30 backdrop-blur-sm" />

        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[calc(100vw-1.5rem)] -translate-x-1/2 -translate-y-1/2",
            "max-w-3xl overflow-hidden rounded-3xl border border-border/60 bg-card/90 backdrop-blur-xl shadow-2xl shadow-foreground/10",
            "max-h-[calc(100dvh-1.5rem)]",
          )}
        >
          {/* Close */}
          <DialogClose
            className={cn(
              "absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-xl",
              "bg-background/60 text-foreground/80 ring-1 ring-border/60 backdrop-blur-sm transition-colors",
              "hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
            aria-label="Закрити"
          >
            <X className="h-5 w-5" />
          </DialogClose>

          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="relative border-b border-border/50 bg-background/40 px-6 pb-5 pt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Запис на урок</p>
              <h2 className="mt-2 text-xl md:text-2xl font-extrabold tracking-tight">{headerTitle}</h2>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed pr-10">{headerSubtitle}</p>

              {isWizard && (
                <div className="mt-4">
                  <div className="h-2 w-full rounded-full bg-muted/60 ring-1 ring-border/40 overflow-hidden">
                    <div className="h-full rounded-full bg-primary/80" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-8">
              <AnimatePresence mode="wait">
                {screen === "entry" && (
                  <motion.div
                    key="entry"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => {
                          setStep(1);
                          setScreen("wizard");
                        }}
                        className={cn(
                          "group relative overflow-hidden rounded-3xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 text-left",
                          "shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/[0.05]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        )}
                      >
                        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12">
                          <Wand2 className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="mt-4 text-base font-extrabold tracking-tight">Підібрати самостійно</h3>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                          Мова → ціль → викладач. Займе до 45 секунд.
                        </p>
                        <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all group-hover:shadow-primary/30">
                          Почати підбір <ArrowRight className="h-4 w-4" />
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setScreen("manager")}
                        className={cn(
                          "group relative overflow-hidden rounded-3xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 text-left",
                          "shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/[0.05]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        )}
                      >
                        <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-highlight/40 blur-2xl" />
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/50">
                          <MessageCircle className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="mt-4 text-base font-extrabold tracking-tight">Звʼязатися з менеджером</h3>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                          Постав питання — підберемо варіант і час.
                        </p>
                        <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors group-hover:bg-accent/40">
                          Написати <ArrowRight className="h-4 w-4" />
                        </div>
                      </button>
                    </div>

                    <div className="rounded-2xl bg-muted/40 p-4 ring-1 ring-border/40">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Пробний урок — після короткого підбору. Так швидше отримуєш результат.
                      </p>
                    </div>
                  </motion.div>
                )}

                {screen === "manager" && (
                  <motion.div
                    key="manager"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div className="rounded-3xl border border-border/50 bg-card/80 p-6">
                      <h3 className="text-lg font-extrabold tracking-tight">Напиши менеджеру</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        Ми уточнимо твою ціль, рівень і темп — та запропонуємо найзручніший варіант пробного уроку.
                      </p>

                      <a
                        href={withTelegramText(MANAGER_TELEGRAM_URL, "Привіт! Хочу записатися на пробний урок.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => onOpenChange(false)}
                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-all hover:shadow-primary/35"
                      >
                        Написати в Telegram <ArrowRight className="h-4 w-4" />
                      </a>

                      <p className="mt-3 text-xs text-muted-foreground">
                        Відповідаємо протягом дня. Якщо зручно — одразу напиши свій рівень або що саме хочеш прокачати.
                      </p>
                    </div>

                    <div className="flex items-center justify-start">
                      <button
                        type="button"
                        onClick={goBack}
                        className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent/40 transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4" /> Назад
                      </button>
                    </div>
                  </motion.div>
                )}

                {screen === "wizard" && (
                  <motion.div
                    key={`wizard-${step}`}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    {step === 1 && (
                      <>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Мова</p>
                          <h3 className="mt-2 text-lg md:text-xl font-extrabold tracking-tight">Обери мову</h3>
                        </div>

                        <div className="grid gap-3 md:grid-cols-3">
                          {languages.map((l) => (
                            <ChoiceCard
                              key={l.id}
                              selected={state.language === l.id}
                              title={l.title}
                              desc={l.desc}
                              badge={l.badge}
                              onClick={() => setState((s) => ({ ...s, language: l.id, goal: undefined, teacher: undefined }))}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Ціль</p>
                          <h3 className="mt-2 text-lg md:text-xl font-extrabold tracking-tight">Для чого ти вивчаєш мову?</h3>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                          {goals.map((g) => (
                            <ChoiceCard
                              key={g.id}
                              selected={state.goal === g.id}
                              title={g.title}
                              desc={g.desc}
                              icon={g.icon}
                              onClick={() => setState((s) => ({ ...s, goal: g.id, teacher: undefined }))}
                            />
                          ))}
                        </div>

                        <div className="rounded-2xl bg-muted/40 p-4 ring-1 ring-border/40">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Далі — обереш викладача, і натиснеш <span className="font-semibold text-foreground">«Написати»</span>.
                          </p>
                        </div>
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Викладач</p>
                          <h3 className="mt-2 text-lg md:text-xl font-extrabold tracking-tight">Обери викладача</h3>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            Поки що — 3 варіанти для старту. Потім можна розширити список і додати сторінки викладачів.
                          </p>
                        </div>

                        <div className="grid gap-3 md:grid-cols-3">
                          {teachers.map((t) => {
                            const recommended = !!state.language && !!state.goal && t.languages.includes(state.language) && t.goals.includes(state.goal);
                            return (
                              <TeacherCard
                                key={t.id}
                                teacher={t}
                                selected={state.teacher === t.id}
                                recommended={recommended}
                                onClick={() => setState((s) => ({ ...s, teacher: t.id }))}
                              />
                            );
                          })}
                        </div>

                        <div className="rounded-2xl bg-muted/40 p-4 ring-1 ring-border/40">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Не впевнений у виборі? Можеш повернутися назад або написати менеджеру — підберемо викладача під твою ціль.
                          </p>
                        </div>
                      </>
                    )}

                    {/* Footer nav */}
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={goBack}
                        className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent/40 transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4" /> Назад
                      </button>

                      {step < totalSteps ? (
                        <button
                          type="button"
                          onClick={goNext}
                          disabled={!canGoNext}
                          className={cn(
                            "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all",
                            "hover:shadow-primary/30 disabled:opacity-50 disabled:shadow-none disabled:hover:shadow-none",
                          )}
                        >
                          Далі <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <a
                          href={canFinish ? managerLink : "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            if (!canFinish) {
                              e.preventDefault();
                              return;
                            }
                            onOpenChange(false);
                          }}
                          aria-disabled={!canFinish}
                          className={cn(
                            "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all",
                            "hover:shadow-primary/30",
                            !canFinish && "pointer-events-none opacity-50 shadow-none",
                          )}
                        >
                          Написати <ArrowRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}


