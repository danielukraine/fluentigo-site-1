import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useBookingDialog } from "@/components/booking/BookingDialogProvider";

const CTASection = () => {
  const { openBooking } = useBookingDialog();

  return (
    <section id="cta" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="relative max-w-2xl mx-auto overflow-hidden rounded-[2rem] bg-primary p-12 md:p-16 shadow-2xl shadow-primary/25"
        >
          {/* Decorative circles */}
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-primary-foreground/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-primary-foreground/5 blur-2xl pointer-events-none" />

          <h2 className="relative text-2xl md:text-3xl font-extrabold text-primary-foreground mb-4">Готовий почати?</h2>
          <p className="relative text-primary-foreground/75 mb-8 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Запишись на безкоштовний пробний урок — менеджер допоможе обрати формат і викладача.
          </p>
          <button
            type="button"
            onClick={openBooking}
            className="relative group inline-flex items-center gap-2 rounded-xl bg-primary-foreground px-8 py-4 text-sm font-bold text-primary hover:opacity-90 transition-all shadow-lg"
          >
            Записатися на пробний урок
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
