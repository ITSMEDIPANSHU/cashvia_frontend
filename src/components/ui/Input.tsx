"use client";

import { motion } from "framer-motion";
import { forwardRef, useState, InputHTMLAttributes } from "react";
import { Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  rightElement?: React.ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success,
      helperText,
      rightElement,
      containerClassName = "",
      type,
      className = "",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
        <div className="input-wrapper">
          <input
            ref={ref}
            type={inputType}
            className={`input-field ${error ? "error" : ""} ${className}`}
            placeholder=" "
            {...props}
          />
          <label className="input-label">{label}</label>

          {/* Right element area */}
          <div className="absolute right-14 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {success && !error && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <CheckCircle2 size={18} color="var(--success)" />
              </motion.div>
            )}
            {rightElement}
          </div>

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-secondary)]"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {/* Error / Helper text */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 px-1"
          >
            <AlertCircle size={12} color="var(--error)" />
            <span
              className="text-xs font-medium"
              style={{ color: "var(--error)" }}
            >
              {error}
            </span>
          </motion.div>
        )}
        {helperText && !error && (
          <p className="text-caption px-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
