import { CONTACT_EMAIL, CONTACT_PHONE, MANAGER_TELEGRAM_URL } from "@/config/contact";

const Footer = () => (
  <footer className="border-t border-border/30 py-10">
    <div className="container mx-auto px-4 md:px-8 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-sm font-extrabold">
          <span className="inline-flex w-7 h-7 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-black">
            F
          </span>
          Fluentigo
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Fluentigo. Всі права захищені.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <a
          href={MANAGER_TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-border/50 bg-card/60 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
        >
          Звʼяжіться з нами в Telegram
        </a>
        <a
          href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}
          className="rounded-xl border border-border/50 bg-card/60 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
        >
          Наш номер телефону: {CONTACT_PHONE}
        </a>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="rounded-xl border border-border/50 bg-card/60 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
        >
          Наша електронна пошта: {CONTACT_EMAIL}
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
