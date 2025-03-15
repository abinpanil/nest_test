
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Since we're using mock auth, we'll just show a success message
      // In a real app, this would call the password reset API endpoint
      
      toast({
        title: "Reset link sent",
        description: "If an account exists with that email, you'll receive a password reset link shortly.",
      });
      
      // Wait 1.5 seconds then redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout 
      title="Reset your password" 
      description="Enter your email and we'll send you a link to reset your password."
    >
      <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
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

        <div className="pt-2">
          <ButtonCustom
            type="submit"
            className="w-full h-11"
            isLoading={isSubmitting}
          >
            Send reset link
          </ButtonCustom>
        </div>

        <div className="mt-6 flex justify-center">
          <Link to="/login" className="inline-flex items-center text-sm text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
