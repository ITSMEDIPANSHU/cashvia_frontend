"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface Step {
  label: string;
  sublabel?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number; // 1-indexed
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-start relative">
      {steps.map((step, index) => {
        const stepNum = index + 1;
        const isCompleted = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <div key={step.label} className="flex flex-col items-center flex-1">
            {/* Connector + Circle row */}
            <div className="flex items-center w-full">
              {/* Left connector */}
              {index > 0 && (
                <div
                  className="flex-1 h-0.5 mt-0"
                  style={{
                    background: isCompleted
                      ? "var(--primary)"
                      : "var(--border)",
                    transition: "background 0.4s",
                  }}
                />
              )}

              {/* Circle */}
              <motion.div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all"
                style={{
                  background: isCompleted
                    ? "var(--primary)"
                    : isActive
                    ? "var(--primary-surface)"
                    : "var(--card)",
                  borderColor: isCompleted || isActive ? "var(--primary)" : "var(--border)",
                }}
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {isCompleted ? (
                  <CheckCircle2 size={16} color="white" strokeWidth={2.5} />
                ) : (
                  <span
                    className="text-xs font-bold"
                    style={{
                      color: isActive ? "var(--primary)" : "var(--text-tertiary)",
                    }}
                  >
                    {stepNum}
                  </span>
                )}
              </motion.div>

              {/* Right connector */}
              {index < steps.length - 1 && (
                <div
                  className="flex-1 h-0.5"
                  style={{
                    background: stepNum < currentStep
                      ? "var(--primary)"
                      : "var(--border)",
                    transition: "background 0.4s",
                  }}
                />
              )}
            </div>

            {/* Label */}
            <p
              className="text-center mt-1.5"
              style={{
                fontSize: "9px",
                fontWeight: isActive ? 600 : 400,
                color: isActive
                  ? "var(--primary)"
                  : isCompleted
                  ? "var(--text-secondary)"
                  : "var(--text-tertiary)",
              }}
            >
              {step.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
