"use client";

import Link from "next/link";
import type { AuthMode } from "@/types/auth";
import { InputField } from "./InputField";
import { PasswordInput } from "./PasswordInput";
import { Button } from "./Button";
import { Divider } from "./Divider";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { useLoginForm } from "@/hooks/useLoginForm";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const EmailIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

interface LoginFormProps {
  onSwitchMode: (mode: AuthMode) => void;
}

export function LoginForm({ onSwitchMode }: LoginFormProps) {
  const router = useRouter();
  const { login, error, authLoading } = useAuth();
  const { formData, errors, formLoading, updateField, handleSubmit } = useLoginForm(router);

  return (
    <form onSubmit={(e) => handleSubmit(e)} noValidate className="flex flex-col gap-5">
      <InputField
        label="Email"
        id="email"
        type="email"
        value={formData.email}
        onChange={(e) => updateField("email", e.target.value)}
        placeholder="ten@email.com"
        error={errors.email?.message}
        icon={<EmailIcon />}
        autoComplete="email"
      />

      <div className="flex flex-col gap-1.5">
        <PasswordInput
          id="password"
          value={formData.password}
          onChange={(v) => updateField("password", v)}
          error={errors.password?.message}
        />
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-xs text-stone-500 transition-colors hover:text-amber-400"
          >
            Quên mật khẩu?
          </Link>
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-3 select-none">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={formData.rememberMe}
            onChange={(e) => updateField("rememberMe", e.target.checked)}
          />
          <div className="h-4 w-4 rounded border border-stone-600 bg-stone-800 transition-all peer-checked:border-amber-400 peer-checked:bg-amber-400 peer-focus:ring-2 peer-focus:ring-amber-400/20" />
          <svg
            className="pointer-events-none absolute left-0.5 top-0.5 h-3 w-3 text-stone-950 opacity-0 transition-opacity peer-checked:opacity-100"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
          </svg>
        </div>
        <span className="text-sm text-stone-400">Ghi nhớ đăng nhập</span>
      </label>

      <Button isLoading={authLoading || formLoading} type="submit">
        {authLoading || formLoading ? "Đang đăng nhập..." : "Đăng nhập"},
      </Button>

      <Divider />

      <SocialLoginButtons mode="login" />

      <p className="text-center text-sm text-stone-500">
        Chưa có tài khoản?{" "}
        <button
          type="button"
          onClick={() => onSwitchMode("register")}
          className="font-semibold text-amber-400 transition-colors hover:text-amber-300"
        >
          Đăng ký ngay
        </button>
      </p>
    </form>
  );
}
