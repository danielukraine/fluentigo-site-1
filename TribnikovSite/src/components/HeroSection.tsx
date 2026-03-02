import { useState } from "react";
import { BookOpen, ArrowRight, ListChecks } from "lucide-react";
import { motion } from "framer-motion";
import { useBookingDialog } from "@/components/booking/BookingDialogProvider";
import { LanguageLevelDialog } from "@/components/LanguageLevelDialog";

const steps = [
  { id: "teachers", icon: BookOpen, title: "Обери викладача", desc: "під твою ціль і стиль" },
  { id: "level-test", icon: ListChecks, title: "Визнач свій рівень мови", desc: "короткий тест за 1–2 хв" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } }),
};

const HeroSection = () => {
  const { openBooking } = useBookingDialog();
  const [levelDialogOpen, setLevelDialogOpen] = useState(false);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Subtle gradient orb */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-accent/30 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left */}
          <div className="lg:col-span-3 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex gap-2 rounded-full bg-accent/60 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-accent-foreground ring-1 ring-accent-foreground/10"
          >
            🇪🇸 Іспанська &nbsp;·&nbsp; 🇩🇪 Німецька &nbsp;·&nbsp; 🇬🇧 Англійська &nbsp;·&nbsp; 🇫🇷 Французька
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight"
          >
            Онлайн-школа мов, де{" "}
            <span className="relative inline-block">
              <span className="relative z-10">ти</span>
              <span className="absolute inset-x-0 bottom-1 h-3 bg-highlight/80 rounded-sm -z-0" />
            </span>{" "}
            обираєш викладача.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            3 формати: <strong className="text-foreground font-semibold">Індивідуально</strong>,{" "}
            <strong className="text-foreground font-semibold">Групи A1–B2</strong> та{" "}
            <strong className="text-foreground font-semibold">Розмовний клуб</strong>. Працюємо пакетами — щоб був результат.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <button
              type="button"
              onClick={openBooking}
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all"
            >
              Записатися на пробний урок
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <a
              href="#formats"
              className="inline-flex items-center justify-center rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-accent/40 transition-all"
            >
              Дізнатись про курси
            </a>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
            {steps.map((s, i) => (
              <motion.div
                key={s.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="h-full rounded-2xl border border-border/50 bg-card/80 p-5 backdrop-blur-sm transition-all hover:border-primary/20 hover:shadow-sm"
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
                      className="mt-auto pt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
                    >
                      Переглянути викладачів <ArrowRight size={14} />
                    </a>
                  )}
                  {s.id === "level-test" && (
                    <button
                      type="button"
                      onClick={() => setLevelDialogOpen(true)}
                      className="mt-auto pt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
                    >
                      Почати тест рівня <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

          {/* Right card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50 p-7 space-y-5 shadow-lg shadow-foreground/[0.03]"
          >
            <h3 className="text-lg font-bold">Як це працює</h3>
            {[
              { step: "01", label: "Підбір", detail: "мова → ціль → формат" },
              { step: "02", label: "Пакет", detail: "Starter / Standard / Intensive" },
              { step: "03", label: "Старт", detail: "пробний + план на 4–8 тижнів" },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-center gap-4 rounded-2xl bg-accent/30 px-5 py-4 group hover:bg-accent/50 transition-colors"
              >
                <span className="text-xs font-bold text-primary/60">{item.step}</span>
                <div className="flex-1">
                  <span className="font-semibold text-sm">{item.label}</span>
                  <span className="text-xs text-muted-foreground ml-2">{item.detail}</span>
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground pt-1 leading-relaxed">
              Хочеш швидко — напиши менеджеру. Хочеш сам — пройди підбір.
            </p>
          </motion.div>
        </div>
      </div>
      <LanguageLevelDialog open={levelDialogOpen} onOpenChange={setLevelDialogOpen} />
    </section>
  );
};

export default HeroSection;
