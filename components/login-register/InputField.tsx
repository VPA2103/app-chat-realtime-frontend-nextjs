"use client";

import { cn } from "@/utils";
import React, { useState, forwardRef } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, icon, rightElement, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="group flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-xs font-semibold tracking-widest uppercase text-stone-400 transition-colors group-focus-within:text-amber-400"
        >
          {label}
        </label>
        <div className="relative">
          {icon && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500 transition-colors group-focus-within:text-amber-400">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-xl border bg-stone-900/60 px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-600",
              "transition-all duration-200",
              "border-stone-700/60 focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/10",
              "hover:border-stone-600",
              icon && "pl-10",
              rightElement && "pr-11",
              error && "border-red-500/60 focus:border-red-500/80 focus:ring-red-500/10",
              className
            )}
            {...props}
          />
          {rightElement && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightElement}
            </span>
          )}
        </div>
        {error && (
          <p className="flex items-center gap-1.5 text-xs text-red-400 animate-in slide-in-from-top-1 duration-200">
            <svg className="h-3 w-3 shrink-0" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 4a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0V5zm.75 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
