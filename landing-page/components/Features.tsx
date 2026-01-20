import { Wallet, Users, BarChart3, Shield, History, MessageSquare } from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Smart Debt Tracking",
    description: "Add debts to multiple users at once with automatic balance calculations and positive/negative amount indicators."
  },
  {
    icon: Users,
    title: "Settlement Flow",
    description: "Request settlement with inline buttons. Partner confirmation required for secure, group-specific settlements."
  },
  {
    icon: BarChart3,
    title: "Rich Summaries",
    description: "View debt summaries per group with visual debt indicators and beautifully formatted HTML messages."
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "MongoDB transactions for data integrity with cached connections and comprehensive error handling."
  },
  {
    icon: History,
    title: "Transaction History",
    description: "Full transaction history with dates, descriptions, and easy-to-read debt tracking over time."
  },
  {
    icon: MessageSquare,
    title: "Group Integration",
    description: "Works seamlessly in Telegram group chats with per-group debt isolation and user mentions."
  }
];

const Features = () => {
  return (
    <section className="relative py-24 md:py-32 bg-background" id="features">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-glow opacity-40" />
      
      <div className="container relative z-10 px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything You Need to
            <span className="text-gradient"> Track Debts</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful features designed to make debt tracking simple, transparent, and stress-free for everyone in your group.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-6 rounded-xl bg-gradient-card border border-border hover:border-primary/50 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
