"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "../../lib/utils";
import Image from "next/image";

const PHONES = [
  "/logo1.jpg",
  "/logo2.jpg",
  "/logo3.jpg",
  "/logo4.jpg",
  "/logo5.jpg",
  "/logo6.jpg",
];

function ReviewColumn({ reviews, className, reviewClassName, msPerPixel = 0 }) {
  const columnRef = useRef(null);
  const [columnHeight, setColumnHeight] = useState(0);
  const duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    if (!columnRef.current) return;

    const resizeOberserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });

    resizeOberserver.observe(columnRef.current);

    return () => {
      resizeOberserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className={cn("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration }}
    >
      {reviews.concat(reviews).map((imgSrc, reviewIndex) => (
        <Review
          key={reviewIndex}
          className={reviewClassName?.(reviewIndex % reviews.length)}
          imgSrc={imgSrc}
        />
      ))}
    </div>
  );
}

function Review({ imgSrc, className, ...props }) {
  const POSSIBLE_ANIMATION_DELAYS = [
    "0s",
    "0.1s",
    "0.2s",
    "0.3s",
    "0.4s",
    "0.5s",
  ];

  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
    ];

  return (
    <div
      className={cn(
        "animate-fade-in rounded-[2.25rem] bg-white ring-4 ring-gray-200 opacity-0",
        className
      )}
      {...props}
      style={{ animationDelay }}
    >
      <Image
        src={imgSrc}
        alt="Client Generated Logo"
        className="w-full rounded-[2.25rem] h-full object-cover"
        width={500}
        height={500}
      />
    </div>
  );
}

function splitArray(array, numParts) {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }

  return result;
}

const ReviewGrid = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  const columns = splitArray(PHONES, 3);
  const column1 = columns[0];
  const column2 = columns[1];
  const column3 = splitArray(columns[2], 2);

  return (
    <div
      ref={containerRef}
      className="relative mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3 mx-auto w-[60%] sm:w-full"
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...column1, ...column3.flat(), ...column2]}
            reviewClassName={(reviewIndex) =>
              cn({
                "md:hidden": reviewIndex >= column1.length + column3[0].length,
                "lg:hidden": reviewIndex >= column1.length,
              })
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...column2, ...column3[1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= column2.length ? "lg:hidden" : ""
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={column3.flat()}
            className="hidden md:block"
            msPerPixel={10}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-100" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-100" />
    </div>
  );
};

const Reviews = () => {
  return (
    <div className="relative max-w-9xl mt-24 h-full mx-auto px-2.5 md:px-20">
      <h1 className="text-center font-extrabold text-4xl sm:text-5xl leading-tight tracking-tight">
        What You’ll Gain From{" "}
        <span className="text-rose-600">Logoipsum</span>
      </h1>
      <ReviewGrid />
    </div>
  );
};

export default Reviews;
