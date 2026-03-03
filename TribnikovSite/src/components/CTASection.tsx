import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useBookingDialog } from "@/components/booking/BookingDialogProvider";
import { useShouldReduceMotion } from "@/hooks/use-motion-preferences";

const CTASection = () => {
  const { openBooking } = useBookingDialog();
  const shouldReduceMotion = useShouldReduceMotion();

  return (
    <section id="cta" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
          className="relative max-w-2xl mx-auto overflow-hidden rounded-[2rem] bg-primary p-12 md:p-16 shadow-2xl shadow-primary/25"
        >
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -top-12 -right-12 hidden h-40 w-40 rounded-full bg-primary-foreground/10 blur-2xl md:block" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 hidden h-32 w-32 rounded-full bg-primary-foreground/5 blur-2xl md:block" />

          <h2 className="relative text-2xl md:text-3xl font-extrabold text-primary-foreground mb-4">Готовий почати?</h2>
          <p className="relative text-primary-foreground/75 mb-8 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Запишись на безкоштовний пробний урок — менеджер допоможе обрати формат і викладача.
          </p>
          <button
            type="button"
            onClick={openBooking}
            className="group relative inline-flex items-center gap-2 rounded-xl bg-primary-foreground px-8 py-4 text-sm font-bold text-primary shadow-lg transition-all duration-150 sm:hover:opacity-90"
          >
            Записатися на пробний урок
            <ArrowRight size={16} className="transition-transform duration-150 sm:group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
