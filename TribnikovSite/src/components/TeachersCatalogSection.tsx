import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useBookingDialog } from "@/components/booking/BookingDialogProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { languageOptions, teachersByLanguage, type LanguageId, type Teacher } from "@/data/teachers";

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function TeacherCard({ teacher }: { teacher: Teacher }) {
  const { openBooking } = useBookingDialog();

  return (
    <article className="flex h-[420px] min-w-0 flex-col rounded-[2rem] border border-border/60 bg-card/90 p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.06]">
      <div className="flex items-start gap-4">
        <Avatar className="h-14 w-14 rounded-2xl">
          <AvatarImage src={teacher.imageUrl} alt={teacher.name} />
          <AvatarFallback className="rounded-2xl text-sm font-bold">{getInitials(teacher.name)}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[2rem] font-extrabold tracking-tight text-foreground">{teacher.name}</p>
          <p className="mt-0.5 truncate text-xs font-semibold uppercase tracking-widest text-muted-foreground">{teacher.headline}</p>
        </div>
      </div>

      <p className="mt-4 min-h-[88px] text-lg leading-relaxed text-muted-foreground">{teacher.desc}</p>

      <div className="mt-3 flex min-h-[76px] flex-wrap content-start gap-2">
        {teacher.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-primary/10 px-3 py-1 text-base font-semibold text-primary ring-1 ring-primary/10"
          >
            {tag}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={openBooking}
        className="mt-auto inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Записатися на пробний урок <ArrowRight size={16} />
      </button>
    </article>
  );
}

const TeachersCatalogSection = () => {
  const languageOrder: LanguageId[] = ["en", "es", "de", "fr"];
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageId>("en");

  const selectedLanguageData = useMemo(
    () => languageOptions.find((item) => item.id === selectedLanguage),
    [selectedLanguage],
  );
  const selectedTeachers = useMemo(
    () => teachersByLanguage[selectedLanguage] ?? [],
    [selectedLanguage],
  );

  return (
    <section id="teachers" className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mb-8 md:mb-10"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Викладачі</span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">Усі викладачі</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Обери одну мову у перемикачі і побачиш лише відповідних викладачів.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="space-y-5"
        >
          <div className="inline-flex flex-wrap rounded-2xl bg-muted/60 p-1.5 ring-1 ring-border/30">
            {languageOrder.map((languageId) => {
              const language = languageOptions.find((item) => item.id === languageId);
              if (!language) return null;
              const active = selectedLanguage === languageId;

              return (
                <button
                  key={languageId}
                  type="button"
                  onClick={() => setSelectedLanguage(languageId)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                    active ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {language.badge} {language.title}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-extrabold tracking-tight md:text-2xl">
              <span className="mr-2">{selectedLanguageData?.badge}</span>
              {selectedLanguageData?.title}
            </h3>
            <span className="rounded-full bg-accent/70 px-3 py-1 text-xs font-semibold text-accent-foreground">
              {selectedTeachers.length} викл.
            </span>
          </div>

          <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
            {selectedTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeachersCatalogSection;
