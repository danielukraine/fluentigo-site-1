import { useState } from "react";
import { BookOpen, ArrowRight, ListChecks, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useBookingDialog } from "@/components/booking/BookingDialogProvider";
import { LanguageLevelDialog } from "@/components/LanguageLevelDialog";
import { useShouldReduceMotion } from "@/hooks/use-motion-preferences";

const steps = [
  { id: "level-test", icon: ListChecks, title: "Визнач рівень мови", desc: "короткий тест за 1–2 хв" },
  { id: "teachers", icon: BookOpen, title: "Обери викладача", desc: "під твою ціль і стиль" },
  { id: "packages", icon: Users, title: "Обери формат навчання", desc: "індивідуально, група або клуб" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } }),
};

const HeroSection = () => {
  const { openBooking } = useBookingDialog();
  const [levelDialogOpen, setLevelDialogOpen] = useState(false);
  const shouldReduceMotion = useShouldReduceMotion();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Subtle gradient orb */}
      <div className="pointer-events-none absolute -top-40 -right-40 hidden h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl md:block" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 hidden h-[300px] w-[300px] rounded-full bg-accent/30 blur-3xl md:block" />

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="grid items-start gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="space-y-8 lg:col-span-3">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
              className="inline-flex gap-2 rounded-full bg-accent/60 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-accent-foreground ring-1 ring-accent-foreground/10"
            >
              🇪🇸 Іспанська &nbsp;·&nbsp; 🇩🇪 Німецька &nbsp;·&nbsp; 🇬🇧 Англійська &nbsp;·&nbsp; 🇫🇷 Французька
            </motion.div>

            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.1 }}
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight"
            >
              Вивчай мови онлайн з викладачем, який підходить саме тобі
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.2 }}
              className="text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              <strong className="text-foreground font-semibold">Індивідуальні заняття</strong> •{" "}
              <strong className="text-foreground font-semibold">Міні-групи</strong> •{" "}
              <strong className="text-foreground font-semibold">Розмовний клуб</strong>. Підберемо викладача під твою ціль
              і рівень. Перший урок — пробний.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.3 }}
              className="flex flex-col items-start gap-3"
            >
              <button
                type="button"
                onClick={openBooking}
                className="group inline-flex w-full max-w-[92vw] items-center justify-center gap-2 rounded-2xl bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-150 sm:max-w-none sm:w-auto sm:rounded-xl sm:py-3.5 sm:text-sm sm:hover:scale-[1.02] sm:hover:shadow-primary/40"
              >
                Записатися на пробний урок
                <ArrowRight size={16} className="transition-transform duration-150 sm:group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          </div>

          <div className="lg:col-span-2" />
        </div>

        <div className="pt-8">
          <h3 className="mb-4 text-lg font-bold">Як це працює</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.id}
                custom={i}
                initial={shouldReduceMotion ? false : "hidden"}
                animate={shouldReduceMotion ? undefined : "visible"}
                variants={fadeUp}
                className="h-full rounded-2xl border border-border/50 bg-card/80 p-5 backdrop-blur-sm transition-all duration-150 sm:hover:border-primary/20 sm:hover:shadow-sm"
              >
                <div className="flex h-full min-h-[122px] flex-col">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <s.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[1.35rem] font-bold leading-tight">{s.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                  {s.id === "teachers" && (
                    <a
                      href="#teachers"
                      className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-primary transition-opacity duration-150 sm:hover:opacity-80"
                    >
                      Переглянути викладачів <ArrowRight size={14} />
                    </a>
                  )}
                  {s.id === "packages" && (
                    <a
                      href="#pricing"
                      className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-primary transition-opacity duration-150 sm:hover:opacity-80"
                    >
                      Переглянути пакети <ArrowRight size={14} />
                    </a>
                  )}
                  {s.id === "level-test" && (
                    <button
                      type="button"
                      onClick={() => setLevelDialogOpen(true)}
                      className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-primary transition-opacity duration-150 sm:hover:opacity-80"
                    >
                      Почати тест рівня <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <LanguageLevelDialog open={levelDialogOpen} onOpenChange={setLevelDialogOpen} />
    </section>
  );
};

export default HeroSection;
