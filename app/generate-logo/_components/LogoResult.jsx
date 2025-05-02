"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { Expand, ShoppingCart } from "lucide-react";

const LogoResult = ({ logoImage, onDownload, onBuyClick }) => {
  return (
    <div className="mt-5">
      <Image
        src={logoImage}
        alt="logo"
        width={300}
        height={300}
        className="rounded-xl"
      />

      <div className="mt-4 flex items-center justify-between">
        <Button onClick={onBuyClick}>
          <ShoppingCart />
          Buy
        </Button>
        <Button variant="outline" onClick={onDownload}>
          <Expand /> Preview
        </Button>
      </div>
    </div>
  );
};

export {LogoResult};