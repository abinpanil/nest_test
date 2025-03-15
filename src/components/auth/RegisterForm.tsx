
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";

const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate input
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      await register(email, password, name);
      
      toast({
        title: "Registration successful!",
        description: "Your account has been created.",
      });
      
      // Check if email confirmation is required
      toast({
        title: "Check your email",
        description: "You may need to confirm your email before logging in.",
      });
      
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration error:", err);
      
      // Handle specific error cases
      let errorMessage = "Failed to register";
      
      if (err instanceof Error) {
        if (err.message.includes("User already registered")) {
          errorMessage = "This email is already registered. Please log in instead.";
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          required
          autoComplete="name"
          className="h-11"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          autoComplete="email"
          className="h-11"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          autoComplete="new-password"
          className="h-11"
        />
        <p className="text-xs text-muted-foreground">
          Password must be at least 6 characters
        </p>
      </div>

      {error && (
        <div className="text-sm text-destructive flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      <div className="pt-2">
        <ButtonCustom
          type="submit"
          className="w-full h-11"
          isLoading={isLoading}
        >
          Create account
        </ButtonCustom>
      </div>

      <div className="text-center text-sm text-muted-foreground mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
