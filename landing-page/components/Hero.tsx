import { Button } from "@/components/ui/button";
import { Github, Send, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-glow opacity-60" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container relative z-10 px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-xs mb-8">
            <Send className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Telegram Bot</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-slow" />
          </div>

          {/* Main heading */}
          <h1 className="animate-fade-up-delay-1 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            Never Forget
            <span className="block text-gradient">Who Owes Who</span>
          </h1>

          {/* Subheading */}
          <p className="animate-fade-up-delay-2 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Track debts effortlessly in your Telegram group chats with automatic calculations, 
            settlement confirmations, and beautifully formatted messages.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="hero" 
              size="lg" 
              className="group"
              asChild
            >
              <a href="https://t.me/track_my_debt_bot" target="_blank" rel="noopener noreferrer">
                <Send className="w-5 h-5 mr-2" />
                Start Tracking
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              asChild
            >
              <a href="https://github.com/rohityadav-sas/debt-tracker" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </a>
            </Button>
          </div>

          {/* Tech stack */}
          <div className="animate-fade-up-delay-3 mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              TypeScript
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              Express
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              MongoDB
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-foreground" />
              Vercel
            </span>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
