"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "../../components/ui/card";
import { NavigationControls } from "./NavigationControls";

const stepTexts = [
  "Name Your Brand Logo",
  "Describe Your Brand’s Vision",
  "Pick a Color Palette That Matches Your Vibe",
  "Choose a Logo Style That Speaks for You",
  "Select a Design Concept You Love",
  "Pick Your AI Design Plan to Generate the Logo",
  "Wait for Your Logo to Generate",
  "Get Your Desired Logo!"
];

const AppDemo = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1));
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
<Card className="relative w-[90vw]  sm:w-[600px] md:w-[750px] lg:w-[900px] px-4 sm:px-8 md:px-12 h-[450px] sm:h-[500px] lg:h-[600px] overflow-hidden bg-gradient-to-br from-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10 mx-auto">
  <div className="h-[80%] flex justify-center flex-col ring-2 ring-gray-200 mx-2 sm:mx-4 my-5 items-center">
    <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold mb-4 sm:mb-6 ml-2 sm:ml-4 mt-4 self-start text-left">
      <span className="text-rose-600">Step {currentIndex + 1}</span>: {stepTexts[currentIndex]}
    </h1>

    {/* Responsive image wrapper */}
    <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] mb-6">
      <Image
        src={images[currentIndex].src}
        alt={images[currentIndex].alt || `Slide ${currentIndex + 1}`}
        fill
        className="rounded-xl object-contain"
      />
    </div>
  </div>

  <NavigationControls
    currentSection={currentIndex}
    totalSections={images.length}
    onPrevious={handlePrevious}
    onNext={handleNext}
    onSectionSelect={setCurrentIndex}
  />
</Card>


  );
};

export default AppDemo;
