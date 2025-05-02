"use client";

import React, { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import LogoTitle from "./_components/LogoTitle";
import { Button } from "../../components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LogoDesc from "./_components/LogoDesc";
import LogoPalette from "./_components/LogoPalette";
import LogoDesigns from "./_components/LogoDesigns";
import LogoIdea from "./_components/LogoIdea";
import PricingModel from "./_components/PricingModel";
import BgGradient from "../_components/BgGradient";

function CreateLogo() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const router = useRouter();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
  };

  const handleContinue = () => {
    if (step === 5) {
      router.push("/generate-logo"); 
    } else {
      setStep(step + 1);
    }
  };

  return (
    <Suspense>
      <BgGradient className={"opacity-[.1]"} />

      <div className="mt-28 mb-12 p-10 ring-4 z-10 ring-gray-100 rounded-xl lg:mx-24 sm:mx-16 xs:mx-8 mx-4 xl:mx-32 2xl:mx-72">
        {step === 1 ? (
          <LogoTitle
            onHandleInputChange={(v) => onHandleInputChange("title", v)}
            formData={formData}
          />
        ) : step === 2 ? (
          <LogoDesc
            onHandleInputChange={(v) => onHandleInputChange("desc", v)}
            formData={formData}
          />
        ) : step === 3 ? (
          <LogoPalette
            onHandleInputChange={(v) => onHandleInputChange("palette", v)}
            formData={formData}
          />
        ) : step === 4 ? (
          <LogoDesigns
            onHandleInputChange={(v) => onHandleInputChange("design", v)}
            formData={formData}
          />
        ) : step === 5 ? (
          <LogoIdea
            formData={formData}
            onHandleInputChange={(v) => onHandleInputChange("idea", v)}
          />
        ) : null}

        <div className="flex items-center justify-between mt-10">
          {step !== 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              <ArrowLeft /> Previous
            </Button>
          )}
          <Button onClick={handleContinue}>
            <ArrowRight /> Continue
          </Button>
        </div>
      </div>
    </Suspense>
  );
}

export default CreateLogo;
