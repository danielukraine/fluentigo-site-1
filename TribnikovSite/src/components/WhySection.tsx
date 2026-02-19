import { Target, Clock, Eye } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  { icon: Target, title: "Конкретика", desc: 'План на 4–8 тижнів, домашка і фідбек — без "води".' },
  { icon: Clock, title: "Зручно", desc: "Підбір за хвилину або менеджер. Запис без зайвих кроків." },
  { icon: Eye, title: "Прозоро", desc: "Пакети, правила переносу, що входить — все видно." },
];

const WhySection = () => (
  <section id="why" className="py-20 md:py-28">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-xs font-semibold text-primary uppercase tracking-widest">Переваги</span>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-12">Чому Fluentigo</h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-5">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.1, duration: 0.45 }}
            className="group bg-card rounded-3xl border border-border/50 p-7 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.04] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
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

export default WhySection;
