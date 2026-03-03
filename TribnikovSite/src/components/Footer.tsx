import { Instagram, Phone, Send } from "lucide-react";
import { CONTACT_INSTAGRAM_URL, CONTACT_PHONE, MANAGER_TELEGRAM_URL } from "@/config/contact";

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
          className="inline-flex items-center gap-2.5 rounded-xl border border-border/50 bg-card/60 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
        >
          <Send size={16} />
          Звʼяжіться з нами в Telegram
        </a>
        <a
          href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}
          className="inline-flex items-center gap-2.5 rounded-xl border border-border/50 bg-card/60 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
        >
          <Phone size={16} />
          Наш номер телефону: {CONTACT_PHONE}
        </a>
        <a
          href={CONTACT_INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-xl border border-border/50 bg-card/60 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
        >
          <Instagram size={16} />
          Наш Instagram
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
