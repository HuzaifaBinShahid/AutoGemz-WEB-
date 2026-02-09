import React, { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { INSPECTION_REPORT_DATA } from "@/constants/constants";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface VehiclePicturesSectionProps {
  selectedImageIndex: number;
  onImageSelect: (index: number) => void;
}

const VehiclePicturesSection: React.FC<VehiclePicturesSectionProps> = ({
  selectedImageIndex,
  onImageSelect,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      // Calculate scroll amount based on current image width
      const firstImage = scrollContainerRef.current.querySelector('div > div');
      const imageWidth = firstImage ? firstImage.clientWidth : 312;
      const scrollAmount = imageWidth + 16; // image width + gap
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      // Calculate scroll amount based on current image width
      const firstImage = scrollContainerRef.current.querySelector('div > div');
      const imageWidth = firstImage ? firstImage.clientWidth : 312;
      const scrollAmount = imageWidth + 16; // image width + gap
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="!py-6 ">
      <h2 className="text-4xl lg:text-[56px] font-semibold text-black dark:text-white uppercase font-display leading-[100%] tracking-normal mb-[23px]">
        MAIN - VEHICLE PICTURES
      </h2>
      
      <div className="relative">
        {/* Left Navigation Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-customRed hover:bg-red-700 text-white p-2 sm:p-3 flex items-center justify-center transition-colors shadow-lg"
          aria-label="Scroll left"
        >
          <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Scrollable Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-8 sm:px-10"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {INSPECTION_REPORT_DATA.vehiclePictures.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col  bg-white dark:bg-[#111111] p-2"
            >
              <div
                className={cn(
                  "relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[312px] md:h-[312px] bg-gray-100 dark:bg-gray-800  overflow-hidden cursor-pointer border-2 transition-all",
                  selectedImageIndex === index ? "border-customRed" : "border-transparent"
                )}
                onClick={() => onImageSelect(index)}
              >
                <Image
                  src={image || "/images/car-1.jpg"}
                  alt={`Vehicle ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(221.12deg, rgba(220, 55, 41, 0.75) 3%, rgba(0, 0, 0, 0.08) 27%, rgba(0, 0, 0, 0.08) 74%, rgba(203, 61, 29, 0.55) 90.59%, rgba(220, 55, 41, 0.5) 100%)",

                  }}
                ></div>
              </div>
              {/* Label below image */}
              <p className="text-xl font-semibold text-black dark:text-white mt-2 flex items-center gap-2 pb-[27px] pt-[23.5px]">
                <span className="w-[4px] h-6 bg-customRed"></span>
                <span className="text-black dark:text-white">Front View Image</span>
              </p>
            </div>
          ))}
        </div>

        {/* Right Navigation Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-customRed hover:bg-red-700 text-white p-2 sm:p-3 flex items-center justify-center transition-colors shadow-lg"
          aria-label="Scroll right"
        >
          <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default VehiclePicturesSection;
