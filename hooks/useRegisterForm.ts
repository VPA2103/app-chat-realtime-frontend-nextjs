"use client";

import { useState } from "react";
import type { RegisterFormData, RegisterErrors } from "@/types/auth";
import { hasErrors, validateRegisterForm } from "@/lib/validation/validation";
import { useAuth } from "./useAuth";

const initialData: RegisterFormData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
};

export function useRegisterForm() {
  const { register } = useAuth();
  const [formData, setFormData] = useState<RegisterFormData>(initialData);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const updateField = <K extends keyof RegisterFormData>(
    field: K,
    value: RegisterFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof RegisterErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof RegisterErrors];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateRegisterForm(formData);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await register({
        email: formData.email,
        password: formData.password,
      });

      setSubmitSuccess(true);
    } catch (err: any) {
      setErrors({
        email: {
          message: err?.response?.data?.error || "Đăng ký thất bại",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setFormData(initialData);
    setErrors({});
    setSubmitSuccess(false);
  };

  return {
    formData,
    errors,
    isLoading,
    submitSuccess,
    updateField,
    handleSubmit,
    reset,
  };
}
