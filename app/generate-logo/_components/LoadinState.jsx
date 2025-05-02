"use client";
import React from "react";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center mt-2">
      <p className="text-xl text-gray-500">Generating your logo...</p>
      <LoaderIcon className="animate-spin" />
      <Image
        src={"/loading.gif"}
        alt="loading"
        width={200}
        height={200}
        className="mt-6"
      />
      <h2 className="mt-2 font-medium text-2xl text-gray-500">
        Do Not Refresh!
      </h2>
    </div>
  );
};

export default LoadingState;