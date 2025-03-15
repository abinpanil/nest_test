
import React from "react";
import { Navigate } from "react-router-dom";
import AuthLayout from "@/components/layouts/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/lib/auth";

const Login: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthLayout
      title="Welcome back"
      description="Enter your credentials to access your account"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
