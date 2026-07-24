"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Building2, Store, Laptop, HardHat } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RadioCard } from "@/components/ui/RadioCard";
import { TopNav } from "@/components/layout/TopNav";
import { BottomCTA } from "@/components/layout/BottomCTA";
import { useOnboardingStore } from "@/store/onboarding.store";
import { PageTransition } from "@/components/layout/PageTransition";
import type { EmploymentType } from "@/store/onboarding.store";

const employmentOptions: {
  id: EmploymentType;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "salaried",
    label: "Salaried Employee",
    description: "Working at a private or govt. company",
    icon: <Building2 size={18} />,
  },
  {
    id: "self_employed",
    label: "Self Employed",
    description: "Professional — doctor, CA, lawyer",
    icon: <Briefcase size={18} />,
  },
  {
    id: "business",
    label: "Business Owner",
    description: "Running your own business",
    icon: <Store size={18} />,
  },
  {
    id: "freelancer",
    label: "Freelancer / Gig Worker",
    description: "Driver, delivery, freelance work",
    icon: <HardHat size={18} />,
  },
  {
    id: "other",
    label: "Other",
    description: "Student, homemaker, or other",
    icon: <Laptop size={18} />,
  },
];

export default function EmploymentPage() {
  const router = useRouter();
  const { data, updateData } = useOnboardingStore();
  const [selected, setSelected] = useState<EmploymentType>(data.employmentType || "");

  const handleContinue = () => {
    if (!selected) return;
    updateData({ employmentType: selected });
    router.push("/onboarding/income");
  };

  return (
    <PageTransition>
      <TopNav title="Employment Type" currentStep={5} totalSteps={12} />

      <div className="flex-1 px-5 pt-4 pb-4 flex flex-col overflow-y-auto scrollbar-hide">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: "linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)",
              boxShadow: "0 6px 20px rgba(14, 165, 233, 0.3)",
            }}
          >
            <Briefcase size={24} color="white" />
          </div>
          <h1 className="text-title">What do you do for work?</h1>
          <p className="text-body mt-1">
            This helps us determine the best loan offer and documentation for you.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {employmentOptions.map((option) => (
            <motion.div
              key={option.id}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
              }}
            >
              <RadioCard
                id={`employment-${option.id}`}
                label={option.label}
                description={option.description}
                icon={option.icon}
                selected={selected === option.id}
                onSelect={() => setSelected(option.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="h-4" />
      </div>

      <BottomCTA>
        <Button
          id="next-employment-btn"
          onClick={handleContinue}
          disabled={!selected}
          icon={<ArrowRight size={18} />}
        >
          Continue
        </Button>
      </BottomCTA>
    </PageTransition>
  );
}
