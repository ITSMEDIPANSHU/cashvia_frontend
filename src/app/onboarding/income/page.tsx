"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, IndianRupee, Banknote, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { RadioCard } from "@/components/ui/RadioCard";
import { TopNav } from "@/components/layout/TopNav";
import { BottomCTA } from "@/components/layout/BottomCTA";
import { useOnboardingStore } from "@/store/onboarding.store";
import { PageTransition } from "@/components/layout/PageTransition";

const schema = z.object({
  monthlyIncome: z.string().min(1, "Enter your monthly income"),
  incomeMode: z.enum(["salary", "cash"]),
  companyName: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const INCOME_RANGES = [
  { label: "₹10K–25K", value: "15000" },
  { label: "₹25K–50K", value: "35000" },
  { label: "₹50K–1L", value: "75000" },
  { label: "₹1L+", value: "150000" },
];

export default function IncomePage() {
  const router = useRouter();
  const { data, updateData } = useOnboardingStore();
  const [incomeMode, setIncomeMode] = useState<"salary" | "cash" | "">(data.incomeMode || "");
  const [selectedRange, setSelectedRange] = useState(data.monthlyIncome || "");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      monthlyIncome: data.monthlyIncome,
      companyName: data.companyName,
    },
  });

  const income = watch("monthlyIncome") || "";

  const onSubmit = (formData: FormData) => {
    updateData({
      monthlyIncome: formData.monthlyIncome,
      incomeMode: formData.incomeMode,
      companyName: formData.companyName || "",
    });
    router.push("/onboarding/bank");
  };

  const handleRangeSelect = (value: string) => {
    setSelectedRange(value);
    setValue("monthlyIncome", value, { shouldValidate: true });
  };

  return (
    <PageTransition>
      <TopNav title="Income Details" currentStep={6} totalSteps={12} />

      <div className="flex-1 px-5 pt-4 pb-4 flex flex-col overflow-y-auto scrollbar-hide">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #065f46 100%)",
              boxShadow: "0 6px 20px rgba(16, 185, 129, 0.3)",
            }}
          >
            <IndianRupee size={24} color="white" />
          </div>
          <h1 className="text-title">Monthly income details</h1>
          <p className="text-body mt-1">
            Your income determines the loan amount you&apos;re eligible for.
          </p>
        </motion.div>

        <form id="income-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Quick range selection */}
          <div>
            <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              Monthly income range
            </p>
            <div className="grid grid-cols-4 gap-2">
              {INCOME_RANGES.map((r) => (
                <motion.button
                  key={r.value}
                  type="button"
                  onClick={() => handleRangeSelect(r.value)}
                  className="py-3 rounded-2xl text-xs font-bold border-2 transition-all"
                  style={{
                    borderColor: selectedRange === r.value ? "var(--primary)" : "var(--border)",
                    background: selectedRange === r.value ? "var(--primary-surface)" : "var(--card)",
                    color: selectedRange === r.value ? "var(--primary)" : "var(--text-secondary)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {r.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Or custom income */}
          <div className="divider">or enter exact amount</div>

          <Input
            {...register("monthlyIncome")}
            label="Monthly Income (₹)"
            id="income-input"
            type="tel"
            inputMode="numeric"
            error={errors.monthlyIncome?.message}
            helperText="Your net take-home salary or business income"
          />

          {/* Income mode */}
          <div>
            <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              How do you receive your income?
            </p>
            <div className="flex flex-col gap-2">
              <RadioCard
                id="income-salary"
                label="Bank Transfer / Salary"
                description="Direct bank credit, NEFT, IMPS"
                icon={<CreditCard size={16} />}
                selected={incomeMode === "salary"}
                onSelect={() => {
                  setIncomeMode("salary");
                  setValue("incomeMode", "salary", { shouldValidate: true });
                }}
              />
              <RadioCard
                id="income-cash"
                label="Cash in Hand"
                description="Daily wages, cash business"
                icon={<Banknote size={16} />}
                selected={incomeMode === "cash"}
                onSelect={() => {
                  setIncomeMode("cash");
                  setValue("incomeMode", "cash", { shouldValidate: true });
                }}
              />
            </div>
          </div>

          {/* Company name (optional) */}
          {data.employmentType === "salaried" && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Input
                  {...register("companyName")}
                  label="Company / Employer Name"
                  id="company-input"
                  helperText="As per your offer letter or salary slip"
                />
              </motion.div>
            </AnimatePresence>
          )}
        </form>

        {/* Eligibility preview */}
        <AnimatePresence>
          {income && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mt-5 p-4 rounded-2xl"
              style={{ background: "var(--success-surface)", border: "1px solid rgba(16,185,129,0.2)" }}
            >
              <p className="text-xs font-semibold mb-2" style={{ color: "var(--success)" }}>
                📊 Pre-qualified Offer Preview
              </p>
              <div className="flex justify-between">
                <div>
                  <p className="text-caption">Max eligible loan</p>
                  <p className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>
                    ₹{Math.min(Number(income) * 5, 500000).toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-caption">Min EMI from</p>
                  <p className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>
                    ₹{Math.round(Number(income) * 0.15).toLocaleString("en-IN")}/mo
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="h-4" />
      </div>

      <BottomCTA>
        <Button
          id="next-income-btn"
          form="income-form"
          type="submit"
          disabled={!isValid || !incomeMode}
          icon={<ArrowRight size={18} />}
        >
          Continue
        </Button>
      </BottomCTA>
    </PageTransition>
  );
}
