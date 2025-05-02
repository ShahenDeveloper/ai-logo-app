import { Button } from "../../../components/ui/button";
import { Frown } from "lucide-react";
import Link from "next/link";

const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <div className="flex flex-col gap-4 items-center">
        <Frown className="w-16 h-16 text-gray-400" />
        <h3 className="text-xl font-semibold text-gray-600">
          No Logos Created Yet
        </h3>
        <p className="text-gray-500 max-w-md">
          Start your brand journey by designing your first logo with our AI-powered logo maker.
        </p>
        <Link href={"/create?title="}>
          <Button
            variant={"link"}
            className="mt-4 text-white bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:no-underline"
          >
            Create Your First Logo
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;
