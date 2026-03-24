"use client";

import { useState } from "react";
import { hasErrors, validateLoginForm } from "@/lib/validation/validation";
import { LoginErrors, LoginFormData } from "@/types/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

const initialData: LoginFormData = {
  email: "",
  password: "",
  rememberMe: false,
};

//

//
export function useLoginForm(router: ReturnType<typeof useRouter>) {
  const [formData, setFormData] = useState<LoginFormData>(initialData);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [formLoading, setFormLoading] = useState(false);

  const updateField = <K extends keyof LoginFormData>(
    field: K,
    value: LoginFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof LoginErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof LoginErrors];
        return next;
      });
    }
  };
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(formData);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setFormLoading(true);

    try {
      const res = await login({
        email: formData.email,
        password: formData.password,
      });
      if (res.user) {
        router.push("/dashboard"); // redirect ngay khi login thành công
      } else {
        setErrors({ email: { message: "Email hoặc mật khẩu không đúng" } });
      }
    } catch (err: any) {
      setErrors({
        email: { message: err?.message || "Có lỗi xảy ra, thử lại sau" },
      });
    } finally {
      setFormLoading(false);
    }
  };

  const reset = () => {
    setFormData(initialData);
    setErrors({});
  };

  return {
    formData,
    errors,
    formLoading,
    updateField,
    handleSubmit,
    reset,
  };
}

//
// const handleSubmit = async (e: React.FormEvent) => {
//   const router = useRouter();

//   e.preventDefault();

//   const validationErrors = validateLoginForm(formData);
//   if (hasErrors(validationErrors)) {
//     setErrors(validationErrors);
//     return;
//   }

//   setIsLoading(true);

//   try {
//     const res = await signIn("credentials", {
//       email: formData.email,
//       password: formData.password,
//       redirect: false,
//     });

//     if (!res || res.error) {
//       setErrors({
//         email: { message: "Email hoặc mật khẩu không đúng" },
//       });
//       return;
//     }

//     // ❗ QUAN TRỌNG
//     router.push("/profile");
//   } catch {
//     setErrors({
//       email: { message: "Có lỗi xảy ra, thử lại sau" },
//     });
//   } finally {
//     setIsLoading(false);
//   }
// };
