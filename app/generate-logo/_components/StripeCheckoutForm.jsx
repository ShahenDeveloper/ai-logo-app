"use client";
import React, { useState, useEffect } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "../../../components/ui/button";
import { LoaderIcon } from "lucide-react";

const StripeCheckoutForm = ({ plan, clientSecret, onClose,logoId }) => {
  console.log("logoId in stripeCheckoutForm",logoId);
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/logo-success?logoId=${logoId}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  if (!stripe || !elements) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-bold">Checkout: {plan.name} Plan</h3>
      <p className="text-lg">Total: {plan.price}</p>

      <PaymentElement />

      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}

      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={!stripe || loading} className="w-full">
          {loading ? "Processing..." : `Pay ${plan.price}`}
        </Button>
      </div>
    </form>
  );
};

export default StripeCheckoutForm;
