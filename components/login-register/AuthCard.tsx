
import { useState } from "react";
import type { AuthMode } from "@/types/auth";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { cn } from "@/utils";

const LogoMark = () => (
  <div className="flex items-center gap-2.5">
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400">
      <svg className="h-5 w-5 text-stone-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    </div>
    <span className="text-lg font-bold tracking-tight text-stone-100">Nexus</span>
  </div>
);

export function AuthCard() {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <div className="w-full max-w-md items-center">
      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl border border-stone-800/80 bg-stone-950/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
        {/* Top accent line */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-amber-400/50 to-transparent" />

        <div className="p-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-1">
            <LogoMark />
            <div className="mt-5">
              <h1 className="text-2xl font-bold tracking-tight text-stone-50">
                {mode === "login" ? "Chào mừng trở lại" : "Tạo tài khoản mới"}
              </h1>
              <p className="mt-1 text-sm text-stone-500">
                {mode === "login"
                  ? "Đăng nhập để tiếp tục hành trình của bạn"
                  : "Bắt đầu miễn phí, không cần thẻ tín dụng"}
              </p>
            </div>
          </div>

          {/* Tab Toggle */}
          <div className="mb-6 flex rounded-xl bg-stone-900 p-1">
            {(["login", "register"] as AuthMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={cn(
                  "flex-1 rounded-lg py-2 text-sm font-medium transition-all duration-200",
                  mode === m
                    ? "bg-stone-800 text-stone-100 shadow-sm"
                    : "text-stone-500 hover:text-stone-300"
                )}
              >
                {m === "login" ? "Đăng nhập" : "Đăng ký"}
              </button>
            ))}
          </div>

          {/* Form */}
          {mode === "login" ? (
            <LoginForm onSwitchMode={setMode} />
          ) : (
            <RegisterForm onSwitchMode={setMode} />
          )}
        </div>
      </div>
    </div>
  );
}
