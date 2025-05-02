import { cn } from "../../lib/utils";

const BgGradient = ({className}) => {
  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-12 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-10"
      >
<div
  className={cn(
    "relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:w-[72rem] bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500 opacity-20",
    className
  )}
  style={{
    clipPath:
      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
  }}
/>

      </div>
    </div>
  );
};

export default BgGradient;
