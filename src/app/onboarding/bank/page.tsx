"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Landmark, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TopNav } from "@/components/layout/TopNav";
import { BottomCTA } from "@/components/layout/BottomCTA";
import { useOnboardingStore } from "@/store/onboarding.store";
import { PageTransition } from "@/components/layout/PageTransition";

const schema = z.object({
  bankName: z.string().min(2, "Select your bank"),
  accountNumber: z.string().min(9, "Enter a valid account number").max(18, "Account number too long"),
  confirmAccount: z.string().min(9, "Re-enter your account number"),
  ifscCode: z.string().length(11, "IFSC must be 11 characters").regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Enter a valid IFSC code"),
}).refine((data) => data.accountNumber === data.confirmAccount, {
  message: "Account numbers don't match",
  path: ["confirmAccount"],
});

type FormData = z.infer<typeof schema>;

const POPULAR_BANKS = [
  { name: "SBI", logo: "🏦" },
  { name: "HDFC", logo: "🏛️" },
  { name: "ICICI", logo: "💳" },
  { name: "Axis", logo: "🔵" },
  { name: "Kotak", logo: "🟠" },
  { name: "PNB", logo: "🟡" },
  { name: "BOB", logo: "🔴" },
  { name: "Other", logo: "➕" },
];

export default function BankPage() {
  const router = useRouter();
  const { data, updateData } = useOnboardingStore();
  const [selectedBank, setSelectedBank] = useState(data.bankName || "");
  const [isVerifying, setIsVerifying] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      bankName: data.bankName,
      accountNumber: data.accountNumber,
      ifscCode: data.ifscCode,
    },
  });

  const onSubmit = async (formData: FormData) => {
    setIsVerifying(true);
    await new Promise((r) => setTimeout(r, 1800));
    updateData({
      bankName: formData.bankName,
      accountNumber: formData.accountNumber,
      ifscCode: formData.ifscCode,
    });
    router.push("/onboarding/eligibility");
  };

  return (
    <PageTransition>
      <TopNav title="Bank Account Details" currentStep={7} totalSteps={12} />

      <div className="flex-1 px-5 pt-4 pb-4 flex flex-col overflow-y-auto scrollbar-hide">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              boxShadow: "0 6px 20px rgba(59, 130, 246, 0.3)",
            }}
          >
            <Landmark size={24} color="white" />
          </div>
          <h1 className="text-title">Bank account details</h1>
          <p className="text-body mt-1">
            Loan amount will be directly credited to this account after approval.
          </p>
        </motion.div>

        {/* Bank selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mb-5"
        >
          <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            Select your bank
          </p>
          <div className="grid grid-cols-4 gap-2">
            {POPULAR_BANKS.map((bank) => (
              <motion.button
                key={bank.name}
                type="button"
                onClick={() => {
                  setSelectedBank(bank.name);
                  setValue("bankName", bank.name, { shouldValidate: true });
                }}
                className="flex flex-col items-center gap-1.5 py-3 rounded-2xl border-2 transition-all"
                style={{
                  borderColor: selectedBank === bank.name ? "var(--primary)" : "var(--border)",
                  background: selectedBank === bank.name ? "var(--primary-surface)" : "var(--card)",
                }}
                whileTap={{ scale: 0.95 }}
                id={`bank-${bank.name.toLowerCase()}`}
              >
                <span style={{ fontSize: 22 }}>{bank.logo}</span>
                <span
                  className="text-xs font-semibold"
                  style={{
                    color: selectedBank === bank.name ? "var(--primary)" : "var(--text-secondary)",
                  }}
                >
                  {bank.name}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.form
          id="bank-form"
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col gap-4"
        >
          <input type="hidden" {...register("bankName")} />

          <Input
            {...register("accountNumber")}
            label="Account Number"
            id="account-input"
            type="tel"
            inputMode="numeric"
            error={errors.accountNumber?.message}
          />

          <Input
            {...register("confirmAccount")}
            label="Confirm Account Number"
            id="confirm-account-input"
            type="tel"
            inputMode="numeric"
            error={errors.confirmAccount?.message}
            helperText="Re-enter to confirm"
          />

          <div className="input-wrapper">
            <input
              {...register("ifscCode", {
                onChange: (e) => setValue("ifscCode", e.target.value.toUpperCase()),
              })}
              type="text"
              id="ifsc-input"
              className={`input-field font-mono ${errors.ifscCode ? "error" : ""}`}
              placeholder=" "
              maxLength={11}
              autoCapitalize="characters"
              style={{ letterSpacing: "0.1em" }}
            />
            <label className="input-label" htmlFor="ifsc-input">IFSC Code</label>
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              style={{ color: "var(--primary)" }}
            >
              <Search size={16} />
            </button>
          </div>
          {errors.ifscCode && (
            <p className="text-xs font-medium -mt-2 px-1" style={{ color: "var(--error)" }}>
              {errors.ifscCode.message}
            </p>
          )}
        </motion.form>

        {/* Security note */}
        <motion.div
          className="mt-5 info-banner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span>🔒</span>
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Your bank details are encrypted and only used for loan disbursal. We never debit without your consent.
          </p>
        </motion.div>

        <div className="h-4" />
      </div>

      <BottomCTA>
        <Button
          id="next-bank-btn"
          form="bank-form"
          type="submit"
          disabled={!isValid || !selectedBank}
          loading={isVerifying}
          icon={<ArrowRight size={18} />}
        >
          {isVerifying ? "Verifying bank…" : "Verify & Continue"}
        </Button>
      </BottomCTA>
    </PageTransition>
  );
}
