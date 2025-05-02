"use client";
import React, { useState } from "react";
import { motion } from "motion/react"; // Importing motion from the Motion library
import Lookup from "../_data/Lookup";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import BgGradient from "./BgGradient";

function Hero() {
  const [logoTitle, setLogoTitle] = useState("");

  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex items-center mt-16 flex-col gap-5">
        <motion.div
          className="relative flex items-center px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-rose-50 transition-colors duration-200 border border-rose-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            opacity: { duration: 0.6, ease: "easeOut" }, // Smoother fade-in
            delay: 0.3,
          }}
        >
          <Sparkles className="h-5 w-5 mr-2 animate-pulse text-rose-600" />
          <p className="text-base text-rose-600">Powered by AI</p>
        </motion.div>

        <motion.h1
          className="font-bold text-4xl sm:text-5xl leading-tight py-6 text-center"
          initial={{ opacity: 0, y: -40 }} // Start further off-screen for impact
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            bounce: 0.6, // Adjust bounce intensity (0 to 1)
            duration: 0.8,
          }}
        >
          <span className="relative inline-block mb-3 p-1 mx-3">
            <span className="relative z-10 px-2">Standout</span>{" "}
            <motion.span
              initial={{ width: 0 }}
              animate={{
                width: "100%",
                transition: { duration: 0.8, delay: 1.5 },
              }}
              className="absolute inset-0 bg-rose-200/90 -rotate-2 rounded-lg transform -skew-y-1 "
              aria-hidden="true"
            ></motion.span>
          </span>
          Logo Designs for <br />
          Apps, Brands & Websites
        </motion.h1>

        <motion.p
          className="text-lg text-gray-500 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1, // Smooth fade-in for description
            ease: "easeOut",
            delay: 0.6, // Delay to match the flow of previous animations
          }}
        >
          {Lookup.HeroDesc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { type: "spring", delay: 1 } }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mt-10 items-stretch"
        >
          <input
            placeholder={Lookup.InputTitlePlaceholder}
            className="p-2 ring-2 ring-gray-200 bg-transparent outline-none focus:ring-4 rounded-md flex-1"
            onChange={(event) => setLogoTitle(event?.target.value)}
          />
          <Link
            href={`/create?title=${logoTitle}`}
            className="w-full sm:w-auto"
          >
            <Button className="w-full sm:h-full sm:px-6">Get Started</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
