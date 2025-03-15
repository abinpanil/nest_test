
import React from "react";
import { Navigate } from "react-router-dom";
import AuthLayout from "@/components/layouts/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";
import { useAuth } from "@/lib/auth";

const Register: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthLayout
      title="Create an account"
      description="Enter your details to get started"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
