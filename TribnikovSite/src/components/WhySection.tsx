import { Target, Clock, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useShouldReduceMotion } from "@/hooks/use-motion-preferences";

const reasons = [
  { icon: Target, title: "Конкретика", desc: 'План на 4–8 тижнів, домашка і фідбек — без "води".' },
  { icon: Clock, title: "Зручно", desc: "Підбір за хвилину або менеджер. Запис без зайвих кроків." },
  { icon: Eye, title: "Прозоро", desc: "Пакети, правила переносу, що входить — все видно." },
];

const WhySection = () => {
  const shouldReduceMotion = useShouldReduceMotion();

  return (
    <section id="why" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">Переваги</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-12">Чому Fluentigo</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: shouldReduceMotion ? 0 : i * 0.1, duration: shouldReduceMotion ? 0 : 0.45 }}
              className="group rounded-3xl border border-border/50 bg-card p-7 transition-all duration-150 sm:hover:border-primary/20 sm:hover:shadow-lg sm:hover:shadow-primary/[0.04]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-colors duration-150 sm:group-hover:bg-primary/15">
                <r.icon size={22} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
