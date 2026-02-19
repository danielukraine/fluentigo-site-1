const Footer = () => (
  <footer className="border-t border-border/30 py-10">
    <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2.5 text-sm font-extrabold">
        <span className="inline-flex w-7 h-7 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-black">
          F
        </span>
        Fluentigo
      </div>
      <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Fluentigo. Всі права захищені.</p>
    </div>
  </footer>
);

export default Footer;
