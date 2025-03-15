
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/50 dark:bg-background p-4">
      <div className="text-center max-w-md w-full bg-white dark:bg-card rounded-xl p-8 shadow-sm border border-border/50 animate-scale-in">
        <div className="w-16 h-16 bg-secondary dark:bg-accent/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl font-bold">404</span>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Page not found</h1>
        
        <p className="text-muted-foreground mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <ButtonCustom asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to home
          </Link>
        </ButtonCustom>
      </div>
    </div>
  );
};

export default NotFound;
