"use client";

import React, { Suspense, useContext, useEffect, useState } from "react";
import { UserDetailContex } from "../_context/UserDetailContext";
import Lookup from "../_data/Lookup";
import Prompt from "../_data/Prompt";
import axios from "axios";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

import LoadingState from "./_components/LoadinState";
import PricingModal from "./_components/PricingModal";
import {LogoResult} from "./_components/LogoResult";

function GenerateLogo() {
  const { userDetail, setUserDetail } = useContext(UserDetailContex);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [logoId, setLogoId] = useState(null);
  const [showPricing, setShowPricing] = useState(false);

  const searchParams = useSearchParams();
  const modelType = searchParams.get("type");

  // Load formData from localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && userDetail?.email) {
      const storage = localStorage.getItem("formData");
      if (storage) {
        setFormData(JSON.parse(storage));
      }
    }
  }, [userDetail]);

  useEffect(() => {
    if (formData?.title?.length > 0) {
      GenerateAILogo();
    }
  }, [formData]);


  const GenerateAILogo = async () => {

    setLoading(true);

    const PROMPT = Prompt.LOGO_PROMPT
      .replace("{logoTitle}", formData?.title)
      .replace("{logoDesc}", formData?.desc)
      .replace("{logoColor}", formData.palette)
      .replace("{logoIdea}", formData?.idea)
      .replace("{logoDesign}", formData?.design?.title)
      .replace("{logoPrompt}", formData?.design?.prompt);

    try {
      const result = await axios.post("/api/ai-logo-model", {
        prompt: PROMPT,
        email: userDetail?.email,
        title: formData.title,
        desc: formData.desc,
        type: modelType,
        userCredits: userDetail?.credits,
      });

      setLogoImage(result.data?.image);
      setLogoId(result.data?.logoId);
    } catch (error) {
      toast.error("Failed to generate logo.");
    } finally {
      setLoading(false);
    }
  };

  const onDownload = () => {
    const imageWindow = window.open();
    imageWindow?.document.write(`<img src="${logoImage}" alt="Base64 Image" />`);
  };

  const handleBuyClick = () => {
    setShowPricing(true);
  };

  return (
    <Suspense>
      <div className="mt-16 flex flex-col items-center justify-center">
        <h2 className="font-bold text-3xl text-primary">
          {Lookup.LoadingWaitTitle}
        </h2>

        {loading && <LoadingState />}
        {logoImage && (
          <LogoResult
            logoImage={logoImage}
            onDownload={onDownload}
            onBuyClick={handleBuyClick}
          />
        )}

        <PricingModal
          open={showPricing}
          onOpenChange={setShowPricing}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          logoId={logoId}
        />
      </div>
    </Suspense>
  );
}

export default GenerateLogo;
