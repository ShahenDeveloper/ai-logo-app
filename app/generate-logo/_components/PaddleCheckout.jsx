"use client";
import { useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { initializePaddle } from "@paddle/paddle-js"; // Assuming this is the correct import

const PaddleCheckout = ({ logoId,pricingId,email }) => {
  useEffect(() => {
    initializePaddle({
      environment: "sandbox",
      token: process.env.NEXT_PUBLIC_PADDLE_PUBLIC_KEY,
      debug: true,
    }).then((instance) => {
      if (instance) {
        instance.Checkout.open({
          items: [
            {
              priceId: pricingId,
              quantity: 1,
            },
          ],
          customData: {
            logoId: logoId,
            email: email
          },
          settings: {
            successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/logo-success?logoId=${logoId}`,
          },
        });
      } else {
        console.warn("Paddle is not initialized", instance);
      }
    });
  }, []);
};

export default PaddleCheckout;
