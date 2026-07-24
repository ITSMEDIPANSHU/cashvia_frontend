"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { RadioCard } from "@/components/ui/RadioCard";
import { TopNav } from "@/components/layout/TopNav";
import { BottomCTA } from "@/components/layout/BottomCTA";
import { useOnboardingStore } from "@/store/onboarding.store";
import { PageTransition } from "@/components/layout/PageTransition";

const schema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  dob: z.string().min(1, "Date of birth is required"),
  email: z.string().email("Enter a valid email address"),
  gender: z.enum(["male", "female", "other"]),
});

type FormData = z.infer<typeof schema>;

const genders = [
  { id: "male", label: "Male", emoji: "👨" },
  { id: "female", label: "Female", emoji: "👩" },
  { id: "other", label: "Other", emoji: "🧑" },
];

export default function PersonalPage() {
  const router = useRouter();
  const { data, updateData } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      dob: data.dob,
      email: data.email,
      gender: data.gender || undefined,
    },
  });

  const gender = watch("gender");

  const onSubmit = (formData: FormData) => {
    updateData(formData);
    router.push("/onboarding/address");
  };

  return (
    <PageTransition>
      <TopNav title="Personal Details" currentStep={3} totalSteps={12} />

      <div className="flex-1 px-5 pt-4 pb-4 flex flex-col overflow-y-auto scrollbar-hide">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
              boxShadow: "0 6px 20px rgba(139, 92, 246, 0.3)",
            }}
          >
            <User size={24} color="white" />
          </div>
          <h1 className="text-title">Tell us about yourself</h1>
          <p className="text-body mt-1">Basic details to personalize your loan offer</p>
        </motion.div>

        <motion.form
          id="personal-form"
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          {/* Name row */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              {...register("firstName")}
              label="First Name"
              id="firstName-input"
              error={errors.firstName?.message}
              autoFocus
            />
            <Input
              {...register("lastName")}
              label="Last Name"
              id="lastName-input"
              error={errors.lastName?.message}
            />
          </div>

          {/* DOB */}
          <Input
            {...register("dob")}
            label="Date of Birth"
            id="dob-input"
            type="date"
            error={errors.dob?.message}
            helperText="You must be 21–65 years old to apply"
          />

          {/* Email */}
          <Input
            {...register("email")}
            label="Email Address"
            id="email-input"
            type="email"
            inputMode="email"
            error={errors.email?.message}
            helperText="For loan documents and communication"
          />

          {/* Gender */}
          <div>
            <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              Gender
            </p>
            <div className="flex gap-2">
              {genders.map((g) => (
                <motion.button
                  key={g.id}
                  type="button"
                  id={`gender-${g.id}`}
                  onClick={() => setValue("gender", g.id as "male" | "female" | "other", { shouldValidate: true })}
                  className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl border-2 transition-all"
                  style={{
                    borderColor: gender === g.id ? "var(--primary)" : "var(--border)",
                    background: gender === g.id ? "var(--primary-surface)" : "var(--card)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span style={{ fontSize: 24 }}>{g.emoji}</span>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: gender === g.id ? "var(--primary)" : "var(--text-secondary)" }}
                  >
                    {g.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.form>

        <div className="h-4" />
      </div>

      <BottomCTA>
        <Button
          id="next-personal-btn"
          form="personal-form"
          type="submit"
          disabled={!isValid}
          icon={<ArrowRight size={18} />}
        >
          Continue
        </Button>
      </BottomCTA>
    </PageTransition>
  );
}
