import { Terminal } from "lucide-react";

const commands = [
  {
    command: "/register",
    description: "Register yourself to use the bot",
    example: "/register"
  },
  {
    command: "/add",
    description: "Add debt to mentioned user(s)",
    example: "/add @john @jane 500 dinner"
  },
  {
    command: "/get",
    description: "View your debt summary",
    example: "/get"
  },
  {
    command: "/history",
    description: "View debt transaction history",
    example: "/history"
  },
  {
    command: "/settle",
    description: "Settle debts with a user",
    example: "/settle @john"
  },
  {
    command: "/help",
    description: "Show all commands",
    example: "/help"
  }
];

const Commands = () => {
  return (
    <section className="relative py-24 md:py-32 bg-background" id="commands">
      <div className="container px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Commands</span> Reference
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Simple, intuitive commands that make debt tracking a breeze.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl bg-gradient-card border border-border overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-primary/70" />
              </div>
              <div className="flex items-center gap-2 ml-4 text-muted-foreground text-sm">
                <Terminal className="w-4 h-4" />
                <span>Track My Debt Bot</span>
              </div>
            </div>

            {/* Commands list */}
            <div className="divide-y divide-border">
              {commands.map((cmd) => (
                <div key={cmd.command} className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                    <code className="font-mono text-primary font-medium shrink-0 md:w-28">
                      {cmd.command}
                    </code>
                    <p className="text-foreground flex-1">{cmd.description}</p>
                    <code className="font-mono text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {cmd.example}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Commands;
