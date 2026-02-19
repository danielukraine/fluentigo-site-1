import { useState } from "react";
import { Check, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

type Package = {
  id: string;
  title: string;
  subtitle: string;
  levels: string;
  group?: string;
  standard: { rules: string[]; prices: { label: string; price: string }[] };
  premium: { rules: string[]; prices: { label: string; price: string }[] };
};

const packages: Package[] = [
  {
    id: "group",
    title: "Групові заняття",
    subtitle: "Системне навчання: граматика + лексика + говоріння",
    levels: "A1 / A2 / B1 / B2",
    group: "6–10 осіб",
    standard: {
      rules: ["Відміна: мінімум за 8 годин", "Не можна переносити заняття на новий місяць"],
      prices: [
        { label: "A1–A2–B1", price: "300 грн" },
        { label: "B2", price: "400 грн" },
      ],
    },
    premium: {
      rules: ["Відміна: мінімум за 2 години", "Можна переносити залишки на новий місяць"],
      prices: [
        { label: "A1–A2–B1", price: "350 грн" },
        { label: "B2", price: "450 грн" },
      ],
    },
  },
  {
    id: "speaking",
    title: "Розмовний клуб",
    subtitle: "Жива практика мови, мінімум теорії",
    levels: "A2 / B1 / B2",
    group: "4–8 осіб",
    standard: {
      rules: ["Відміна: за 8 годин", "Не можна переносити заняття на новий місяць"],
      prices: [
        { label: "A2–B1", price: "350 грн" },
        { label: "B2", price: "400 грн" },
      ],
    },
    premium: {
      rules: ["Відміна: за 2 години", "Можна переносити залишки на новий місяць"],
      prices: [
        { label: "A2–B1", price: "400 грн" },
        { label: "B2", price: "450 грн" },
      ],
    },
  },
  {
    id: "kids",
    title: "Індивідуально — діти",
    subtitle: "Персональний темп, ігрове навчання",
    levels: "A1 / A2 / B1",
    standard: {
      rules: ["2 екстрених переноси/місяць", "Відміна: за 8 годин", "Не можна переносити на новий місяць"],
      prices: [{ label: "A1–A2–B1", price: "600 грн" }],
    },
    premium: {
      rules: ["Переноси без обмежень", "Відміна: за 2 години", "Можна переносити залишки на новий місяць"],
      prices: [{ label: "A1–A2–B1", price: "700 грн" }],
    },
  },
  {
    id: "adults",
    title: "Індивідуально — дорослі",
    subtitle: "Навчання під цілі: робота, переїзд, іспити",
    levels: "A1 / A2 / B1 / B2 / C1",
    standard: {
      rules: ["Відміна: за 8 годин", "Не можна переносити заняття на новий місяць"],
      prices: [
        { label: "A1–A2–B1", price: "650 грн" },
        { label: "B2–C1", price: "750 грн" },
      ],
    },
    premium: {
      rules: ["Відміна: за 2 години", "Можна переносити залишки на новий місяць"],
      prices: [
        { label: "A1–A2–B1", price: "750 грн" },
        { label: "B2–C1", price: "800 грн" },
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
  const [activeTab, setActiveTab] = useState<"standard" | "premium">("standard");

  return (
    <section id="pricing" className="py-20 md:py-28 bg-card/50">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">Прайс</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-2">Пакети та ціни</h2>
          <p className="text-muted-foreground mb-10 max-w-xl">Коротко про головне. Деталі й правила — нижче.</p>
        </motion.div>

        {/* Toggle */}
        <div className="inline-flex rounded-2xl bg-muted/60 backdrop-blur-sm p-1.5 mb-12 ring-1 ring-border/30">
          <button
            onClick={() => setActiveTab("standard")}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === "standard"
                ? "bg-card shadow-md text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Standard
          </button>
          <button
            onClick={() => setActiveTab("premium")}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === "premium"
                ? "bg-card shadow-md text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sparkles size={14} className="text-premium" />
            Premium
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {packages.map((pkg, i) => {
            const plan = activeTab === "standard" ? pkg.standard : pkg.premium;
            return (
              <motion.div
                key={pkg.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={cardVariants}
                className={`rounded-3xl border p-7 transition-all duration-300 ${
                  activeTab === "premium"
                    ? "border-premium/30 bg-gradient-to-br from-premium/[0.03] to-transparent shadow-sm"
                    : "bg-card border-border/50 hover:border-border"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold">{pkg.title}</h3>
                  {activeTab === "premium" && (
                    <span className="flex items-center gap-1 rounded-full bg-premium/10 px-2.5 py-1 text-xs font-semibold text-premium">
                      <Star size={12} /> Premium
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{pkg.subtitle}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="text-xs bg-accent/60 text-accent-foreground rounded-full px-3 py-1 font-medium">{pkg.levels}</span>
                  {pkg.group && (
                    <span className="text-xs bg-secondary/60 text-secondary-foreground rounded-full px-3 py-1 font-medium">{pkg.group}</span>
                  )}
                </div>

                {/* Rules */}
                <ul className="space-y-2 mb-6">
                  {plan.rules.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check size={15} className="text-primary mt-0.5 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>

                {/* Prices */}
                <div className="space-y-2">
                  {plan.prices.map((p) => (
                    <div
                      key={p.label}
                      className="flex items-center justify-between rounded-2xl bg-accent/20 px-5 py-3"
                    >
                      <span className="text-sm font-medium">{p.label}</span>
                      <span className="text-lg font-bold text-primary">{p.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 rounded-2xl bg-accent/20 backdrop-blur-sm border border-border/30 p-6 max-w-2xl"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Standard</strong> — вигідна ціна і фіксований розклад.{" "}
            <strong className="text-foreground">Premium</strong> — максимум гнучкості: коротка відміна і перенос занять на наступний місяць.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
