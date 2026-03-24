"use client";

import { useState } from "react";
import type { RegisterFormData, RegisterErrors } from "@/types/auth";
import { hasErrors, validateRegisterForm } from "@/lib/validation/validation";

const initialData: RegisterFormData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
};

export function useRegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>(initialData);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const updateField = <K extends keyof RegisterFormData>(
    field: K,
    value: RegisterFormData[K]
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
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1800));
      setSubmitSuccess(true);
      console.log("Register submitted:", formData);
    } catch {
      setErrors({ email: { message: "Đăng ký thất bại, thử lại sau" } });
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setFormData(initialData);
    setErrors({});
    setSubmitSuccess(false);
  };

  return { formData, errors, isLoading, submitSuccess, updateField, handleSubmit, reset };
}
