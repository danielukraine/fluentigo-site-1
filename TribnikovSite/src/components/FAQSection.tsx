import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  { q: 'Чому пакети, а не "1 урок"?', a: "Пакетний формат забезпечує регулярність і прогрес. Ви рухаєтесь за планом, а не хаотично. Це дає кращий результат за менший час." },
  { q: 'Що буде після натискання "Записатися на пробний урок"?', a: "Менеджер зв'яжеться з вами протягом дня, допоможе обрати формат і підібрати викладача. Пробний урок — безкоштовний." },
  { q: "Чи можна одразу обрати викладача?", a: "Так, на індивідуальних заняттях ви обираєте викладача під свою ціль і стиль. У групах — викладач призначається під рівень." },
  { q: "Групи: Standard vs Intensive?", a: "Standard — 2 рази на тиждень, спокійний темп. Intensive — 3–4 рази на тиждень, швидший прогрес. Обидва включають домашку і фідбек." },
  { q: "Чим відрізняється Standard від Premium?", a: "Standard — фіксований розклад, відміна за 8 годин. Premium — коротша відміна (2 год), можливість переносити заняття на наступний місяць." },
];

const FAQSection = () => (
  <section id="faq" className="py-20 md:py-28 bg-card/50">
    <div className="container mx-auto px-4 md:px-8 max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <span className="text-xs font-semibold text-primary uppercase tracking-widest">Питання</span>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-2">FAQ</h2>
      </motion.div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <AccordionItem value={`faq-${i}`} className="bg-card rounded-2xl border border-border/50 px-6 overflow-hidden">
              <AccordionTrigger className="text-sm font-semibold text-left hover:no-underline py-5">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">{f.a}</AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
