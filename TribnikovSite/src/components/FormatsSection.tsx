import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const formats = [
  {
    tag: "Індивідуально",
    badge: "1-на-1",
    title: "Standard / Intensive / Premium",
    items: ["обираєш викладача під ціль", "працюємо пакетами (результат)", "план + домашка + фідбек"],
    link: "Дізнатись більше",
  },
  {
    tag: "Групи",
    badge: "A1–B2",
    title: "Ти купуєш цілий рівень",
    desc: 'У групах запис іде на рівень (A1/A2/B1/B2), а не на "разові уроки".',
    table: {
      headers: ["", "Standard", "Intensive"],
      rows: [
        ["Частота", "2 р/тиж", "3–4 р/тиж"],
        ["Домашка", "10–15 хв", "20–30 хв"],
        ["Тривалість", "8–12 тиж", "5–8 тиж"],
      ],
    },
    link: "Дізнатись про рівні",
  },
  {
    tag: "Розмовний клуб",
    badge: "Speaking",
    title: "Практика говоріння",
    items: ["тема + словник", "рольові сценарії", "фідбек після speaking"],
    link: "Як проходить",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const FormatsSection = () => (
  <section id="formats" className="py-20 md:py-28">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-xs font-semibold text-primary uppercase tracking-widest">Навчання</span>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-2">Формати</h2>
        <p className="text-muted-foreground mb-12 max-w-lg">На головній — тільки суть. Деталі на окремих сторінках.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5">
        {formats.map((f, i) => (
          <motion.div
            key={f.tag}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={cardVariants}
            className="group bg-card rounded-3xl border border-border/50 p-7 flex flex-col justify-between hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.04] transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="inline-block rounded-full bg-accent/60 px-3.5 py-1 text-xs font-semibold text-accent-foreground">{f.tag}</span>
                <span className="text-xs text-muted-foreground font-medium bg-muted/50 rounded-full px-2.5 py-0.5">{f.badge}</span>
              </div>
              <h3 className="text-lg font-bold mb-3">{f.title}</h3>
              {f.desc && <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{f.desc}</p>}
              {f.items && (
                <ul className="space-y-2 mb-4">
                  {f.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {f.table && (
                <div className="rounded-2xl bg-accent/20 p-4 mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        {f.table.headers.map((h) => (
                          <th key={h} className="text-left font-semibold pb-2.5 text-foreground text-xs">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {f.table.rows.map((row) => (
                        <tr key={row[0]} className="border-t border-border/30">
                          {row.map((cell, idx) => (
                            <td key={idx} className={`py-2.5 text-xs ${idx === 0 ? "font-medium text-foreground" : "text-muted-foreground"}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <a href="#pricing" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all mt-2">
              {f.link} <ArrowRight size={14} />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FormatsSection;
