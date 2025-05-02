"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { pricingPlans } from "./PricingPlan";
import { useUser } from "@clerk/nextjs";
import PaddleCheckout from "./PaddleCheckout";


const PricingModal = ({
  open,
  onOpenChange,
  selectedPlan,
  setSelectedPlan,
  logoId,
}) => {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  console.log("email", email);


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Your Plan</DialogTitle>
        </DialogHeader>

        {!selectedPlan ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold text-center">{plan.name}</h3>
                  <p className="text-2xl font-bold text-center my-4">
                    {plan.price}
                  </p>

                  <div className="space-y-2">
                    {Object.entries(plan.features).map(([feature, value]) => (
                      <div key={feature} className="flex items-center">
                        {typeof value === "boolean" ? (
                          value ? (
                            <span className="text-green-500 mr-2">✔</span>
                          ) : (
                            <span className="text-gray-400 mr-2">—</span>
                          )
                        ) : (
                          <span className="mr-2">•</span>
                        )}
                        <span>
                          {feature}: {typeof value === "string" ? value : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full mt-4"
                    onClick={() => {
                      setSelectedPlan(plan);
                      onOpenChange(false); // Close the dialog
                    }}
                  >
                    Select Plan
                  </Button>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <h4 className="font-bold mb-2">Designer Fix: $40</h4>
              <p className="text-sm">
                If you need to make changes to this logo which are not possible
                on our tool, select this option to have our designer adjust it
                for you manually (up to 3 revisions)
              </p>
            </div>
          </div>
        ) : (
          <PaddleCheckout pricingId={selectedPlan.pricingId} email={email} logoId={logoId} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;
