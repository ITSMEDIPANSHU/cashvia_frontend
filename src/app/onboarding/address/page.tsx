"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TopNav } from "@/components/layout/TopNav";
import { BottomCTA } from "@/components/layout/BottomCTA";
import { useOnboardingStore } from "@/store/onboarding.store";
import { PageTransition } from "@/components/layout/PageTransition";

const schema = z.object({
  addressLine1: z.string().min(5, "Enter your complete address"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "Enter your city"),
  state: z.string().min(2, "Select your state"),
  pincode: z.string().length(6, "Enter a valid 6-digit pincode").regex(/^\d{6}$/, "Pincode must be numeric"),
});

type FormData = z.infer<typeof schema>;

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Chandigarh", "Puducherry",
];

export default function AddressPage() {
  const router = useRouter();
  const { data, updateData } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
    },
  });

  const onSubmit = (formData: FormData) => {
    updateData(formData);
    router.push("/onboarding/employment");
  };

  return (
    <PageTransition>
      <TopNav title="Current Address" currentStep={4} totalSteps={12} />

      <div className="flex-1 px-5 pt-4 pb-4 flex flex-col overflow-y-auto scrollbar-hide">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
              boxShadow: "0 6px 20px rgba(236, 72, 153, 0.3)",
            }}
          >
            <MapPin size={24} color="white" />
          </div>
          <h1 className="text-title">Your current address</h1>
          <p className="text-body mt-1">Must match your Aadhaar or latest utility bill</p>
        </motion.div>

        <motion.form
          id="address-form"
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          <Input
            {...register("addressLine1")}
            label="Address Line 1"
            id="address1-input"
            error={errors.addressLine1?.message}
            helperText="House/Flat no., Building, Street"
            autoFocus
          />

          <Input
            {...register("addressLine2")}
            label="Address Line 2 (optional)"
            id="address2-input"
            helperText="Area, Locality, Landmark"
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              {...register("pincode")}
              label="Pincode"
              id="pincode-input"
              type="tel"
              inputMode="numeric"
              maxLength={6}
              error={errors.pincode?.message}
            />
            <Input
              {...register("city")}
              label="City"
              id="city-input"
              error={errors.city?.message}
            />
          </div>

          {/* State select */}
          <div className="input-wrapper">
            <select
              {...register("state")}
              id="state-select"
              className={`input-field ${errors.state ? "error" : ""}`}
              style={{ appearance: "none", paddingTop: "18px", paddingBottom: "6px" }}
            >
              <option value="" hidden> </option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <label className="input-label" htmlFor="state-select" style={{ pointerEvents: "none" }}>
              State
            </label>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          {/* Same as Aadhaar quick-fill */}
          <motion.button
            type="button"
            className="flex items-center gap-2 px-4 py-3 rounded-2xl"
            style={{
              background: "var(--primary-surface)",
              border: "1px solid rgba(79, 70, 229, 0.15)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-sm">📋</span>
            <span className="text-sm font-semibold" style={{ color: "var(--primary)" }}>
              Same as Aadhaar address
            </span>
          </motion.button>
        </motion.form>

        <div className="h-4" />
      </div>

      <BottomCTA>
        <Button
          id="next-address-btn"
          form="address-form"
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
