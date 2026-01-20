import { Github, Send, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-12 bg-card/50 border-t border-border">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo/Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-2xl">💸</span>
            </div>
            <div>
              <span className="font-bold text-lg">Track My Debt</span>
              <p className="text-muted-foreground text-sm">Never forget who owes who</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a 
              href="https://t.me/track_my_debt_bot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Telegram</span>
            </a>
            <a 
              href="https://github.com/rohityadav-sas/debt-tracker" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Credit */}
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-destructive fill-destructive" />
            <span>by</span>
            <a 
              href="https://github.com/rohityadav-sas" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              rohityadav-sas
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-muted-foreground text-sm">
          <p>Open source under MIT License</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
