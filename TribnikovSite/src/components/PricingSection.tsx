import { useMemo, useState } from "react";
import { Check, Info, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useBookingDialog } from "@/components/booking/BookingDialogProvider";
import { useShouldReduceMotion } from "@/hooks/use-motion-preferences";

type Plan = {
  rules: string[];
  prices: { label: string; price: string }[];
};

type Package = {
  id: string;
  title: string;
  subtitle: string;
  levels: string;
  group?: string;
  extraInfo?: { title: string; description: string };
  standard: Plan;
  premium?: Plan;
  intensive?: Plan;
};

const packages: Package[] = [
  {
    id: "kids",
    title: "Індивідуально — діти",
    subtitle: "Персональний темп, ігрове навчання",
    levels: "A1 / A2 / B1",
    extraInfo: {
      title: "Індивідуальні заняття для дітей",
      description:
        "Заняття проходять у дружній ігровій формі з використанням карток, інтерактивних завдань, візуальних матеріалів і розмовної практики. Уроки допомагають дитині поступово звикнути до мови, розширити словниковий запас і навчитися використовувати її природно та без страху.",
    },
    standard: {
      rules: ["2 екстрених переноси/місяць", "Відміна: за 8 годин", "Не можна переносити на новий місяць"],
      prices: [{ label: "A1–A2–B1", price: "550 грн" }],
    },
    premium: {
      rules: ["Переноси без обмежень", "Відміна: за 2 години", "Спікінг (розмовний клуб)"],
      prices: [{ label: "A1–A2–B1", price: "650 грн" }],
    },
  },
  {
    id: "adults",
    title: "Індивідуально — дорослі",
    subtitle: "Навчання під цілі: робота, переїзд, іспити",
    levels: "A1 / A2 / B1 / B2 / C1",
    extraInfo: {
      title: "Інтенсивно — дорослі",
      description:
        "Прискорене навчання для швидкого результату: робота, переїзд, іспити. 5 занять на тиждень, до 5 переносів або відмін занять та індивідуальний підхід із фокусом на покращення всіх слабких сторін.",
    },
    standard: {
      rules: ["Відміна: за 8 годин", "Не можна переносити заняття на новий місяць"],
      prices: [
        { label: "A1–A2–B1", price: "600 грн" },
        { label: "B2–C1", price: "700 грн" },
      ],
    },
    premium: {
      rules: ["Переноси без обмежень", "Відміна: за 2 години", "Спікінг (розмовний клуб)"],
      prices: [
        { label: "A1–A2–B1", price: "700 грн" },
        { label: "B2–C1", price: "750 грн" },
      ],
    },
    intensive: {
      rules: ["5 занять на тиждень", "До 5 переносів або відмін занять", "Максимум 5 занять можна перенести на наступний місяць"],
      prices: [
        { label: "A1–A2–B1", price: "550 грн" },
        { label: "B2–C1", price: "600 грн" },
      ],
    },
  },
  {
    id: "group",
    title: "Групові заняття",
    subtitle: "Системне навчання: граматика + лексика + говоріння",
    levels: "A1 / A2 / B1 / B2",
    group: "6–10 осіб",
    extraInfo: {
      title: "Групові заняття",
      description:
        "Уроки проходять у мінігрупах одного рівня, де учні разом вивчають теми, виконують завдання й активно практикують мовлення. Такий формат створює живу атмосферу спілкування, допомагає швидше звикнути до мови та підтримує мотивацію завдяки спільному навчанню.",
    },
    standard: {
      rules: ["Перевірка домашнього завдання", "Підтримка вчителя під час уроку"],
      prices: [
        { label: "A1–A2–B1", price: "300 грн" },
        { label: "B2", price: "400 грн" },
      ],
    },
    premium: {
      rules: ["Спікінг (розмовний клуб)", "Робота в менших групах", "Підтримка та консультації між заняттями"],
      prices: [
        { label: "A1–A2–B1", price: "350 грн" },
        { label: "B2", price: "450 грн" },
      ],
    },
    intensive: {
      rules: ["3–5 занять на тиждень", "До 5 переносів або відмін занять", "Максимум 5 занять можна перенести на наступний місяць"],
      prices: [{ label: "A1–B2", price: "250 грн" }],
    },
  },
  {
    id: "speaking",
    title: "Розмовний клуб",
    subtitle: "Жива практика мови, мінімум теорії",
    levels: "A2 / B1 / B2",
    group: "4–8 осіб",
    extraInfo: {
      title: "Розмовні заняття (Speaking Club)",
      description:
        "Формат живої мовної практики через обговорення, запитання, діалоги та ігрові ситуації. Заняття спрямовані на розвиток упевненості в мовленні, подолання мовного барʼєра та вміння вільно висловлювати думки без акценту на складній теорії.",
    },
    standard: {
      rules: ["Відміна: за 8 годин", "Не можна переносити заняття на новий місяць"],
      prices: [
        { label: "A2–B1", price: "250 грн" },
        { label: "B2", price: "300 грн" },
      ],
    },
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const PricingSection = () => {
  const [activeTab, setActiveTab] = useState<"standard" | "premium" | "intensive">("standard");
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const { openBooking } = useBookingDialog();
  const shouldReduceMotion = useShouldReduceMotion();
  const orderedPackages = useMemo(() => {
    const order = ["adults", "kids", "group", "speaking"];
    return [...packages].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  }, []);
  const visiblePackages = useMemo(
    () => orderedPackages.filter((pkg) => (activeTab === "standard" ? pkg.standard : pkg[activeTab])),
    [activeTab, orderedPackages]
  );

  return (
    <section id="pricing" className="py-20 md:py-28 bg-card/50">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">Прайс</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-2">Пакети та ціни</h2>
          <p className="text-muted-foreground mb-10 max-w-xl">Коротко про головне. Деталі й правила — нижче.</p>
        </motion.div>

        {/* Toggle */}
        <div className="inline-flex rounded-2xl bg-muted/60 backdrop-blur-sm p-1.5 mb-12 ring-1 ring-border/30">
          <button
            onClick={() => setActiveTab("standard")}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-100 ${
              activeTab === "standard"
                ? "bg-card shadow-md text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Standard
          </button>
          <button
            onClick={() => setActiveTab("premium")}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-100 flex items-center gap-1.5 ${
              activeTab === "premium"
                ? "bg-card shadow-md text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sparkles size={14} className="text-premium" />
            Premium
          </button>
          <button
            onClick={() => setActiveTab("intensive")}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-100 ${
              activeTab === "intensive"
                ? "bg-card shadow-md text-foreground ring-1 ring-lime-600/20"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Інтенсив
          </button>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground md:hidden">
          Свайпай, щоб переглянути всі пакети →
        </p>
        <div className="relative md:contents">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent md:hidden" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent md:hidden" />
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pl-[8vw] pr-[8vw] [scrollbar-width:thin] md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0 md:pl-0 md:pr-0">
          {visiblePackages.map((pkg, i) => {
            const plan = activeTab === "standard" ? pkg.standard : pkg[activeTab];
            if (!plan) return null;
            const isFlipped = flippedCardId === pkg.id;
            const groupLabel =
              pkg.id === "group" && (activeTab === "premium" || activeTab === "intensive") ? "4–6 осіб" : pkg.group;
            const cardClassName = `rounded-3xl border p-7 transition-all duration-150 ${
              activeTab === "intensive"
                ? "border-lime-600/20 bg-gradient-to-br from-lime-500/[0.04] to-transparent shadow-sm"
                : activeTab === "premium"
                  ? "border-premium/30 bg-gradient-to-br from-premium/[0.03] to-transparent shadow-sm"
                  : "bg-card border-border/50 hover:border-border"
            }`;
            const pricePillClassName =
              activeTab === "premium"
                ? "rounded-2xl bg-accent/20 px-5 py-3"
                : activeTab === "intensive"
                  ? "rounded-2xl bg-lime-500/[0.08] px-5 py-3"
                  : "rounded-2xl bg-accent/20 px-5 py-3";
            return (
              <motion.div
                key={pkg.id}
                id={`pricing-${pkg.id}`}
                custom={i}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={{ once: true, margin: "-40px" }}
                variants={cardVariants}
                className="relative h-full w-[84vw] shrink-0 snap-center md:w-auto md:shrink"
              >
                <div className={pkg.extraInfo ? "relative h-full [perspective:1200px]" : "h-full"}>
                  {pkg.extraInfo && (
                    <button
                      type="button"
                      onClick={() => setFlippedCardId(isFlipped ? null : pkg.id)}
                      className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-accent/80 text-muted-foreground transition-colors duration-100 hover:text-foreground"
                      aria-label={isFlipped ? "Показати деталі тарифу" : "Показати додаткову інформацію"}
                    >
                      <Info size={16} />
                    </button>
                  )}

                  <div
                    className={
                      pkg.extraInfo
                        ? `relative h-full transition-transform ${shouldReduceMotion ? "duration-0" : "duration-500"} [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`
                        : "h-full"
                    }
                  >
                    <div className={`${cardClassName} flex h-full flex-col ${pkg.extraInfo ? "[backface-visibility:hidden]" : ""}`}>
                      <div className="flex items-start justify-between mb-2 pr-10">
                        <h3 className="text-lg font-bold">{pkg.title}</h3>
                        {activeTab === "premium" && (
                          <span className="flex items-center gap-1 rounded-full bg-premium/10 px-2.5 py-1 text-xs font-semibold text-premium">
                            <Star size={12} /> Premium
                          </span>
                        )}
                        {activeTab === "intensive" && (
                          <span className="rounded-full bg-lime-500/10 px-2.5 py-1 text-xs font-semibold text-lime-700">
                            Intensive
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{pkg.subtitle}</p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        <span className="text-xs bg-accent/60 text-accent-foreground rounded-full px-3 py-1 font-medium">{pkg.levels}</span>
                        {groupLabel && (
                          <span className="text-xs bg-secondary/60 text-secondary-foreground rounded-full px-3 py-1 font-medium">{groupLabel}</span>
                        )}
                      </div>

                      {/* Rules */}
                      <ul className="mb-6 min-h-[136px] space-y-2.5">
                        {plan.rules.map((r) => (
                          <li key={r} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                            <Check size={15} className="text-primary mt-0.5 shrink-0" />
                            {r}
                          </li>
                        ))}
                      </ul>

                      {/* Prices */}
                      <div className="mt-auto min-h-[132px] space-y-2.5">
                        {plan.prices.map((p) => (
                          <div
                            key={p.label}
                            className={`flex items-center justify-between ${pricePillClassName}`}
                          >
                            <span className="text-sm font-medium">{p.label}</span>
                            <span className={`text-lg font-bold ${activeTab === "intensive" ? "text-lime-700" : "text-primary"}`}>{p.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {pkg.extraInfo && (
                      <div className={`absolute inset-0 ${cardClassName} [transform:rotateY(180deg)] [backface-visibility:hidden]`}>
                        <div className="flex h-full flex-col">
                          <h4 className="mb-3 text-lg font-bold">{pkg.extraInfo.title}</h4>
                          <p className="text-sm leading-relaxed text-muted-foreground">{pkg.extraInfo.description}</p>
                          <button
                            type="button"
                            onClick={openBooking}
                            className="mt-5 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                          >
                            Записатися на безкоштовний пробний урок
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
          </div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : 0.3 }}
          className="mt-10 rounded-2xl bg-accent/20 backdrop-blur-sm border border-border/30 p-6 max-w-2xl"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Standard</strong> — вигідна ціна і фіксований розклад.{" "}
            <strong className="text-foreground">Premium</strong> — максимум гнучкості: коротка відміна і додаткові опції.{" "}
            <strong className="text-foreground">Інтенсив</strong> — прискорений темп із фокусом на швидкий результат.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
