"use client";

import { getPasswordStrength } from "@/lib/validation/validation";
import { cn } from "@/utils";


interface PasswordStrengthBarProps {
  password: string;
}

export function PasswordStrengthBar({ password }: PasswordStrengthBarProps) {
  const { score, label, color } = getPasswordStrength(password);

  if (!password) return null;

  const segments = 5;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              i < score ? color : "bg-stone-700"
            )}
          />
        ))}
      </div>
      {label && (
        <p className="text-right text-[11px] text-stone-500">
          Độ mạnh:{" "}
          <span
            className={cn(
              "font-semibold",
              score <= 1 && "text-red-400",
              score === 2 && "text-orange-400",
              score === 3 && "text-yellow-400",
              score >= 4 && "text-emerald-400"
            )}
          >
            {label}
          </span>
        </p>
      )}
    </div>
  );
}
