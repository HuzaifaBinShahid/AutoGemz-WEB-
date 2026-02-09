"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CarImagesSectionProps {
  title: string;
  images: string[];
}

const CarImagesSection: React.FC<CarImagesSectionProps> = ({ title, images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      <h1 className="text-2xl sm:text-3xl md:text-4xl pb-4 md:pb-[30px] lg:text-5xl font-semibold uppercase font-display text-black dark:text-white flex-1 !leading-tight md:!leading-[60px] tracking-[0.02em]">
        {title}
      </h1>
      {/* Main Image */}
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] bg-neutral-800 dark:bg-neutral-900 overflow-hidden">
        <Image
          src={images[selectedImage] || images[0]}
          alt={title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(221.12deg,rgba(220,55,41,0.75)_3%,rgba(0,0,0,0.08)_27%,rgba(0,0,0,0.08)_74%,rgba(203,61,29,0.55)_90.59%,rgba(220,55,41,0.5)_100%)]" />
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4">
        {images.slice(0, 6).map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              "relative w-full h-[80px] sm:h-[100px] md:h-[120px] border-2",
              selectedImage === index ? "border-customRed" : "border-transparent"
            )}
          >
            <Image
              src={img}
              alt={`Car view ${index + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(221.12deg,rgba(220,55,41,0.75)_3%,rgba(0,0,0,0.08)_27%,rgba(0,0,0,0.08)_74%,rgba(203,61,29,0.55)_90.59%,rgba(220,55,41,0.5)_100%)]" />
          </button>
        ))}
      </div>
    </>
  );
};

export default CarImagesSection;

