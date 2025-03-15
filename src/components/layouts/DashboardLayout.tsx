
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { ButtonCustom } from "@/components/ui/button-custom";
import { 
  LogOut, 
  Menu, 
  X, 
  User, 
  Moon, 
  Sun, 
  CheckSquare,
  Search
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen dark:bg-background/95">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#1A1F2C] backdrop-blur-md border-b border-border dark:border-slate-800">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-secondary dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
            <Link to="/dashboard" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-primary rounded-lg opacity-10 group-hover:opacity-20 transition-opacity"></div>
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
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setSearchActive(!searchActive)}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-full transition-all duration-300",
                  searchActive 
                    ? "bg-secondary/80 dark:bg-slate-800/80 w-64" 
                    : "bg-secondary/50 dark:bg-slate-800/50 w-10 hover:bg-secondary/80 dark:hover:bg-slate-700/80"
                )}
              >
                <Search className="h-4 w-4 min-w-4 text-muted-foreground" />
                {searchActive && (
                  <input 
                    className="bg-transparent border-none outline-none text-sm w-full" 
                    placeholder="Search tasks..."
                    autoFocus
                  />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-secondary/80 dark:hover:bg-slate-800/80 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-[18px] w-[18px]" />
              ) : (
                <Moon className="h-[18px] w-[18px]" />
              )}
            </button>
            
            <div className="flex items-center gap-3">
              <ButtonCustom
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="rounded-full dark:hover:bg-slate-800"
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" />
              </ButtonCustom>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center border border-primary/30">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-[calc(100vh-4rem)]">
        <aside className="hidden md:flex flex-col w-56 p-4 border-r border-border dark:border-slate-800 bg-sidebar-background/50 dark:bg-[#1A1F2C]">
          <nav className="space-y-1 mt-6">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-primary bg-primary/10 dark:bg-primary/20 font-medium"
            >
              <CheckSquare className="h-4 w-4" />
              <span>Tasks</span>
            </Link>
          </nav>
          
          <div className="mt-auto pt-4 border-t border-border dark:border-slate-800">
            <Link
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-secondary/80 dark:hover:bg-slate-800/80 text-muted-foreground"
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
          </div>
        </aside>

        <div
          className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden ${
            mobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-background dark:bg-[#1A1F2C] p-6 shadow-lg animate-slide-right">
            <div className="flex items-center justify-between mb-8">
              <Link to="/dashboard" className="flex items-center gap-2">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 bg-primary rounded-lg opacity-10"></div>
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
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-md hover:bg-secondary dark:hover:bg-slate-800"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                className="w-full bg-secondary/50 dark:bg-slate-800/50 border-none rounded-lg pl-10 pr-4 py-2 text-sm" 
                placeholder="Search tasks..."
              />
            </div>

            <nav className="space-y-1">
              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-primary bg-primary/5 dark:bg-primary/20 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <CheckSquare className="h-4 w-4" />
                <span>Tasks</span>
              </Link>
            </nav>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-secondary/30 dark:bg-slate-800/50 rounded-lg p-4 mb-4">
                <div className="font-medium mb-1">{user?.name}</div>
                <div className="text-sm text-muted-foreground">
                  {isAdmin ? "Admin Access" : "User Access"}
                </div>
              </div>
              <ButtonCustom
                variant="outline"
                className="w-full justify-start gap-2 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-700/50"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </ButtonCustom>
            </div>
          </div>
        </div>

        <main className="flex-1 p-6 md:p-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
