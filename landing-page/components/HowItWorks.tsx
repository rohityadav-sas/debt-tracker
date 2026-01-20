import { ArrowDown, PlusCircle, Eye, HandCoins, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: PlusCircle,
    title: "Add a Debt",
    command: "/add @bob 100 lunch yesterday",
    description: "Mention users and specify the amount with an optional description."
  },
  {
    icon: Eye,
    title: "Bot Records It",
    result: ["Alice is owed +100 by Bob", "Bob owes -100 to Alice"],
    description: "Automatic balance calculations for both parties."
  },
  {
    icon: HandCoins,
    title: "Request Settlement",
    command: "/settle @alice",
    description: "When ready to settle, simply mention who you want to settle with."
  },
  {
    icon: CheckCircle2,
    title: "Confirm & Done",
    result: ["Both balances reset to 0"],
    description: "Partner confirms with inline button. Transaction complete!"
  }
];

const HowItWorks = () => {
  return (
    <section className="relative py-24 md:py-32 bg-card/30" id="how-it-works">
      <div className="container px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Simple as
            <span className="text-gradient"> 1-2-3-4</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get started in seconds. Just add the bot to your group and start tracking.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px hidden md:block" />

            {steps.map((step, index) => (
              <div key={step.title} className="relative mb-12 last:mb-0">
                <div className={`flex flex-col md:flex-row items-start gap-6 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Step number and icon */}
                  <div className={`flex items-center gap-4 md:w-1/2 ${index % 2 === 1 ? 'md:flex-row-reverse md:text-right' : ''}`}>
                    <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-card border-2 border-primary flex items-center justify-center shrink-0">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className={index % 2 === 1 ? 'md:mr-4' : 'md:ml-4'}>
                      <span className="text-primary font-mono text-sm">Step {index + 1}</span>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="md:w-1/2">
                    <div className="p-5 rounded-xl bg-gradient-card border border-border">
                      {step.command && (
                        <code className="block font-mono text-sm text-primary bg-primary/10 px-3 py-2 rounded-lg mb-3">
                          {step.command}
                        </code>
                      )}
                      {step.result && (
                        <div className="space-y-1 mb-3">
                          {step.result.map((r, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm font-mono">
                              <span className="text-primary">→</span>
                              <span className="text-foreground/80">{r}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </div>
                  </div>
                </div>

                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex justify-center my-4">
                    <ArrowDown className="w-5 h-5 text-primary/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
