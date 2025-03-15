import { Link } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useAuth } from "@/lib/auth";
import { ArrowRight, CheckCircle, ShieldCheck, Clock, Search, Tag } from "lucide-react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const Index = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
      title: "Task Management",
      description: "Create, update, and organize your tasks with a clean, intuitive interface designed for clarity."
    },
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      title: "Smart Reminders",
      description: "Never miss a deadline with our intelligent reminder system that keeps you on track."
    },
    {
      icon: <Tag className="h-5 w-5 text-primary" />,
      title: "Custom Categories",
      description: "Organize tasks with custom tags and categories to quickly find what you need, when you need it."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col dark:bg-background">
      {/* Header */}
      <header className="w-full py-4 bg-white/80 backdrop-blur-md dark:bg-black/20 dark:backdrop-blur-md border-b border-border dark:border-white/10">
        <div className="container flex items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-primary rounded-lg opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-primary"
                >
                  <path d="M11 20h4"></path>
                  <path d="M12 4v16"></path>
                  <path d="M18 8l-6 6-6-6"></path>
                </svg>
              </div>
            </div>
            <span className="font-semibold tracking-tight">ChronoTask</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#benefits" className="text-muted-foreground hover:text-foreground transition-colors">Benefits</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            
            {isAuthenticated ? (
              <ButtonCustom asChild>
                <Link to="/dashboard">
                  Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </ButtonCustom>
            ) : (
              <>
                <ButtonCustom variant="ghost" asChild className="dark:text-white dark:hover:bg-white/10">
                  <Link to="/login">Log in</Link>
                </ButtonCustom>
                <ButtonCustom asChild>
                  <Link to="/dashboard" className="flex items-center gap-1">
                    Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </ButtonCustom>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="flex-1 py-16 md:py-20 lg:py-24">
        <div className="container px-4 flex flex-col items-center text-center animate-fade-in">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 border border-border dark:border-white/10 rounded-full bg-background dark:bg-black/30 animate-slide-down">
            <span className="text-xs font-medium">Think, plan, and track</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-4xl">
            All your tasks <span className="text-primary">in one place</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
            ChronoTask helps you organize your work with clarity and elegance. The perfect blend of simplicity and functionality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-16">
            <ButtonCustom asChild size="lg" className="h-12 w-full sm:w-auto">
              <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                {isAuthenticated ? "Go to dashboard" : "Get started for free"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </ButtonCustom>
            {!isAuthenticated && (
              <ButtonCustom asChild variant="outline" size="lg" className="h-12 w-full sm:w-auto dark:border-white/10 dark:text-white dark:hover:bg-white/5">
                <Link to="/login">Sign in</Link>
              </ButtonCustom>
            )}
          </div>
          
          {/* Features floating cards */}
          <div className="relative w-full max-w-5xl h-80 hidden md:block">
            {/* Task cards */}
            <div className="absolute left-0 top-0 w-64 glass-card p-4 animate-float">
              <div className="flex items-center mb-3">
                <div className="w-5 h-5 rounded-full bg-task-blue mr-2"></div>
                <span className="text-sm font-medium">Project planning</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Prepare Q3 product roadmap and update stakeholders</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>Due tomorrow</span>
              </div>
            </div>
            
            {/* Notes card */}
            <div className="absolute left-1/3 -translate-x-1/2 bottom-0 w-56 note-card bg-note-yellow dark:bg-yellow-900/40 animate-float-slower">
              <div className="text-xs font-medium mb-2 opacity-70">NOTES</div>
              <p className="text-sm font-medium" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                Take notes to keep track of crucial details, and accomplish more tasks with ease.
              </p>
            </div>
            
            {/* Reminders card */}
            <div className="absolute right-0 top-10 w-64 glass-card p-4 animate-float-slow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Reminders</span>
                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-primary/10 dark:bg-primary/20">
                  <Clock className="h-3 w-3 text-primary" />
                </div>
              </div>
              <div className="p-2 bg-white dark:bg-black/30 rounded-lg shadow-sm mb-2">
                <div className="text-xs font-medium">Project Deadline</div>
                <div className="text-xs text-muted-foreground">Complete product roadmap</div>
              </div>
              <div className="text-xs text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>Tomorrow at 5:00 PM</span>
              </div>
            </div>
            
            {/* Search UI */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 glass-card p-4 animate-float">
              <div className="flex items-center bg-white/60 dark:bg-white/5 dark:text-white rounded-lg p-2 shadow-sm">
                <Search className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm text-muted-foreground">Search tasks...</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-24 bg-white dark:bg-card/50">
        <div className="container px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Designed for productivity
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Combining beautiful design with powerful functionality to create an experience that feels effortless.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 animate-slide-up">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="floating-card p-6 dark:bg-card dark:border dark:border-white/5"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="py-16 md:py-24 bg-gradient-to-t from-secondary/50 to-transparent dark:from-accent/10 dark:to-transparent">
        <div className="container px-4 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to be more productive?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of users who trust ChronoTask for their task management needs.
          </p>

          <ButtonCustom asChild size="lg" className="h-12">
            <Link to={isAuthenticated ? "/dashboard" : "/register"}>
              {isAuthenticated ? "Go to dashboard" : "Get started for free"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </ButtonCustom>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-card/50 border-t border-border dark:border-white/5 py-12">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="relative w-8 h-8 mr-2">
                <div className="absolute inset-0 bg-primary rounded-lg opacity-10 dark:opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-primary"
                  >
                    <path d="M11 20h4"></path>
                    <path d="M12 4v16"></path>
                    <path d="M18 8l-6 6-6-6"></path>
                  </svg>
                </div>
              </div>
              <span className="font-semibold tracking-tight">ChronoTask</span>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeSwitcher className="mr-2" />
              <div className="text-sm text-muted-foreground">
                © 2023 ChronoTask. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
