"use client";
import { Pizza } from "lucide-react";
import AppDemo from "./AppDemo";
import Lookup from "../_data/Lookup";
import BgGradient from "./BgGradient";
import { motion } from "motion/react";

const DemoSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.5, once: true }} // Adjust 'amount' as needed
      className="relative mt-32"
    >
      {" "}
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <BgGradient className={"!right-0 opacity-[0.02]"} />

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center group justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4">
            <Pizza className="w-6 h-6 text-rose-500 group-hover:-rotate-12 duration-200 transition-transform" />
          </div>
          <div className="text-center mb-16">
            <h3 className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6">
              Watch how Logoipsum transforms{" "}
              <span className="!text-rose-600 font-bold text-transparent">
                your ideas
              </span>{" "}
              into stunning, professional logos in seconds!
            </h3>
          </div>

          <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
            <AppDemo images={Lookup.images} />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default DemoSection;
