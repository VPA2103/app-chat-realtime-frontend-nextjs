"use client";

import { useRegisterForm } from "@/hooks/useRegisterForm";
import type { AuthMode } from "@/types/auth";
import { InputField } from "./InputField";
import { PasswordInput } from "./PasswordInput";
import { PasswordStrengthBar } from "./PasswordStrengthBar";
import { Button } from "./Button";
import { Divider } from "./Divider";
import { SocialLoginButtons } from "./SocialLoginButtons";

const UserIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

interface RegisterFormProps {
  onSwitchMode: (mode: AuthMode) => void;
}

export function RegisterForm({ onSwitchMode }: RegisterFormProps) {
  const { formData, errors, isLoading, submitSuccess, updateField, handleSubmit } = useRegisterForm();

  if (submitSuccess) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/10 ring-1 ring-amber-400/30">
          <svg className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-stone-100">Đăng ký thành công!</h3>
          <p className="mt-1 text-sm text-stone-400">Vui lòng kiểm tra email để xác thực tài khoản.</p>
        </div>
        <button
          type="button"
          onClick={() => onSwitchMode("login")}
          className="mt-2 text-sm font-semibold text-amber-400 transition-colors hover:text-amber-300"
        >
          Đăng nhập ngay →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <InputField
        label="Họ và tên"
        id="reg-name"
        type="text"
        value={formData.fullName}
        onChange={(e) => updateField("fullName", e.target.value)}
        placeholder="Nguyễn Văn A"
        error={errors.fullName?.message}
        icon={<UserIcon />}
        autoComplete="name"
      />

      <InputField
        label="Email"
        id="reg-email"
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
          label="Mật khẩu"
          id="reg-password"
          value={formData.password}
          onChange={(v) => updateField("password", v)}
          error={errors.password?.message}
          placeholder="Tối thiểu 8 ký tự"
        />
        <PasswordStrengthBar password={formData.password} />
      </div>

      <PasswordInput
        label="Xác nhận mật khẩu"
        id="reg-confirm"
        value={formData.confirmPassword}
        onChange={(v) => updateField("confirmPassword", v)}
        error={errors.confirmPassword?.message}
        placeholder="Nhập lại mật khẩu"
      />

      <div className="flex flex-col gap-1">
        <label className="flex cursor-pointer items-start gap-3 select-none">
          <div className="relative mt-0.5 flex shrink-0 items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={formData.agreeToTerms}
              onChange={(e) => updateField("agreeToTerms", e.target.checked)}
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
          <span className="text-sm leading-relaxed text-stone-400">
            Tôi đồng ý với{" "}
            <a href="/terms" className="text-amber-400 hover:underline">Điều khoản dịch vụ</a>
            {" "}và{" "}
            <a href="/privacy" className="text-amber-400 hover:underline">Chính sách bảo mật</a>
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="ml-7 text-xs text-red-400">{errors.agreeToTerms.message}</p>
        )}
      </div>

      <Button isLoading={isLoading} type="submit">
        {isLoading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
      </Button>

      <Divider />

      <SocialLoginButtons mode="register" />

      <p className="text-center text-sm text-stone-500">
        Đã có tài khoản?{" "}
        <button
          type="button"
          onClick={() => onSwitchMode("login")}
          className="font-semibold text-amber-400 transition-colors hover:text-amber-300"
        >
          Đăng nhập
        </button>
      </p>
    </form>
  );
}
