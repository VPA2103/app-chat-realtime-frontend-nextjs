"use client";

import { cn } from "@/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "ghost";
  children: React.ReactNode;
}

export function Button({
  isLoading,
  variant = "primary",
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "relative flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-950",
        variant === "primary" && [
          "bg-amber-400 text-stone-950 hover:bg-amber-300 active:scale-[0.98]",
          "focus:ring-amber-400/60",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30",
        ],
        variant === "ghost" && [
          "border border-stone-700 text-stone-300 hover:border-stone-500 hover:text-stone-100",
          "focus:ring-stone-500/40",
        ],
        className
      )}
      {...props}
    >
      {isLoading && (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
