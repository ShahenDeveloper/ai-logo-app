// app/checkout/page.tsx or pages/checkout.tsx
"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

import StripeCheckoutForm from "@/components/StripeCheckoutForm";
import { stripePromise } from "../../../lib/stripe";

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const plan = { price: 500 };

  useEffect(() => {
    axios
      .post("/api/create-payment-intent", { amount: plan.price })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.error("Error creating PaymentIntent", err);
      });
  }, []);

  const appearance = { theme: "stripe" };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p className="text-lg">Total: ${(plan.price / 100).toFixed(2)}</p>

      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeCheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
}
