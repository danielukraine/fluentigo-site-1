import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useBookingDialog } from "@/components/booking/BookingDialogProvider";
import { cn } from "@/lib/utils";
import {
  languageTests,
  testLanguages,
  type TestLanguageId,
  type TestQuestion,
} from "@/data/language-tests";

type LanguageLevelDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LanguageLevelDialog({ open, onOpenChange }: LanguageLevelDialogProps) {
  const { openBooking } = useBookingDialog();
  const [selectedLanguage, setSelectedLanguage] = useState<TestLanguageId | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const activeTest = selectedLanguage ? languageTests[selectedLanguage] : null;
  const questions = activeTest?.questions ?? [];
  const currentQuestion: TestQuestion | null = questions[questionIndex] ?? null;
  const answeredCurrent = currentQuestion ? !!answers[currentQuestion.id] : false;

  const correctAnswers = useMemo(() => {
    if (!activeTest || !submitted) return 0;
    return activeTest.questions.reduce((acc, question) => {
      return answers[question.id] === question.correctOptionId ? acc + 1 : acc;
    }, 0);
  }, [activeTest, answers, submitted]);

  const detectedLevel = useMemo(() => {
    if (!activeTest || !submitted) return null;
    const ordered = [...activeTest.thresholds].sort((a, b) => b.minCorrect - a.minCorrect);
    return ordered.find((item) => correctAnswers >= item.minCorrect)?.level ?? ordered[ordered.length - 1]?.level ?? "A1";
  }, [activeTest, correctAnswers, submitted]);

  const resetTest = () => {
    setSelectedLanguage(null);
    setQuestionIndex(0);
    setAnswers({});
    setSubmitted(false);
  };

  const closeDialog = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) resetTest();
  };

  const handleNext = () => {
    if (!activeTest || !currentQuestion || !answeredCurrent) return;
    if (questionIndex >= questions.length - 1) {
      setSubmitted(true);
      return;
    }
    setQuestionIndex((v) => v + 1);
  };

  const handleBack = () => {
    if (submitted) {
      setSubmitted(false);
      return;
    }
    if (questionIndex > 0) {
      setQuestionIndex((v) => v - 1);
      return;
    }
    setSelectedLanguage(null);
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="max-w-2xl border-border/60 bg-card/95 p-0 backdrop-blur-sm">
        <div className="border-b border-border/50 p-6">
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="text-xl font-extrabold tracking-tight">Визнач свій рівень мови</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
              Обери мову, пройди короткий тест і отримай орієнтовний рівень.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          {!selectedLanguage && (
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Обери мову</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {testLanguages.map((language) => (
                  <button
                    key={language.id}
                    type="button"
                    onClick={() => setSelectedLanguage(language.id)}
                    className="rounded-2xl border border-border/50 bg-card p-4 text-left transition-all hover:border-primary/20 hover:shadow-sm"
                  >
                    <p className="text-base font-bold">
                      <span className="mr-2">{language.badge}</span>
                      {language.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">Почати тест</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedLanguage && activeTest && !submitted && currentQuestion && (
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{activeTest.title}</p>
                <span className="rounded-full bg-accent/70 px-3 py-1 text-xs font-semibold text-accent-foreground">
                  {questionIndex + 1}/{questions.length}
                </span>
              </div>

              <div className="rounded-2xl border border-border/50 bg-card p-5">
                <p className="text-base font-semibold leading-relaxed">{currentQuestion.prompt}</p>

                <div className="mt-4 space-y-2">
                  {currentQuestion.options.map((option) => {
                    const active = answers[currentQuestion.id] === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option.id }))}
                        className={cn(
                          "w-full rounded-xl border px-4 py-3 text-left text-sm transition-all",
                          active
                            ? "border-primary/40 bg-primary/[0.06] text-foreground"
                            : "border-border/50 bg-background/50 text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {option.text}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent/40"
                >
                  <ArrowLeft className="h-4 w-4" /> Назад
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!answeredCurrent}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30 disabled:opacity-50"
                >
                  {questionIndex >= questions.length - 1 ? "Завершити тест" : "Далі"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {selectedLanguage && activeTest && submitted && (
            <div className="space-y-4">
              <div className="rounded-3xl border border-border/50 bg-card p-6">
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Твій орієнтовний рівень</p>
                <p className="mt-2 text-4xl font-extrabold tracking-tight text-foreground">{detectedLevel}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Правильних відповідей: {correctAnswers}/{questions.length}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  closeDialog(false);
                  openBooking();
                }}
                className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Записатися на безкоштовний пробний урок
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
