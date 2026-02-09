"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaCamera, FaCheck } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import Image from "next/image";
import { useVehicleSaleForm } from "./VehicleSaleFormContext";

const UploadMediaSection: React.FC = () => {
  const { formData, updateImages, resetKey } = useVehicleSaleForm();
  // Handle both File objects and image URLs (strings)
  const [selectedFiles, setSelectedFiles] = useState<(File | string)[]>(formData.images || []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync with formData when it changes (for edit mode)
  useEffect(() => {
    if (formData.images && formData.images.length > 0) {
      setSelectedFiles(formData.images);
    }
  }, [formData.images]);

  // Reset local state when form is reset (resetKey changes)
  useEffect(() => {
    if (resetKey > 0) {
      setSelectedFiles([]);
    }
  }, [resetKey]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      const isValidType = validTypes.includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isValidType && isValidSize;
    });

    const newFiles = [...selectedFiles, ...validFiles].slice(0, 20); // Max 20 files
    setSelectedFiles(newFiles);
    updateImages(newFiles);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    // Only pass File objects to updateImages, filter out strings (URLs)
    const fileObjects = newFiles.filter((file): file is File => file instanceof File);
    updateImages(fileObjects);
  };

  const handleAddPhotos = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="w-full pt-12 md:pt-16 pb-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#111111] pt-10">
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-12 bg-customRed"></div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-black dark:text-white uppercase tracking-wide">
            UPLOAD MEDIA
          </h2>
        </div>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 dark:border-[#FFFFFF1A] rounded-lg p-8 md:p-12 text-center bg-[#0000000D] dark:bg-[#FFFFFF0D]">
          <div className="flex flex-col items-center gap-4">
            <FaCamera className="text-4xl md:text-5xl text-neutral-400 dark:text-neutral-500" />
            <button
              type="button"
              onClick={handleAddPhotos}
              className="bg-customRed hover:bg-customRed/90 text-white font-display uppercase px-6 py-3 rounded transition-colors"
            >
              + ADD PHOTOS
            </button>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
              (Max limit 5 MB per image)
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/jpg,image/png,image/gif"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {selectedFiles.map((file, index) => {
              // Handle both File objects and URL strings
              const imageSrc = file instanceof File ? URL.createObjectURL(file) : file;
              return (
                <div key={index} className="relative group">
                  <Image
                    src={imageSrc}
                    alt={`Preview ${index + 1}`}
                    unoptimized
                    width={200}
                    height={200}
                    className="w-full h-24 sm:h-32 object-cover rounded border border-gray-300 dark:border-[#FFFFFF1A]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 space-y-3">
          <div className="flex items-start gap-3 text-green-600 dark:text-green-500">
            <FaCheck className="text-lg mt-0.5 flex-shrink-0" />
            <span className="text-sm text-black dark:text-white">
              Adding at least 8 pictures improves the chances for a quick sale.
            </span>
          </div>
          <div className="flex items-start gap-3 text-green-600 dark:text-green-500">
            <FaCheck className="text-lg mt-0.5 flex-shrink-0" />
            <span className="text-sm text-black dark:text-white">
              Photos should be in &apos;jpeg, jpg, png, gif&apos; format only.
            </span>
          </div>
          <div className="flex items-start gap-3 text-green-600 dark:text-green-500">
            <FaCheck className="text-lg mt-0.5 flex-shrink-0" />
            <span className="text-sm text-black dark:text-white">
              Adding clear Front, Back and Interior pictures of your car increases
              the quality of your Ad and gets you noticed more.
            </span>
          </div>
          <div className="flex items-start gap-3 text-green-600 dark:text-green-500">
            <FaCheck className="text-lg mt-0.5 flex-shrink-0" />
            <span className="text-sm text-black dark:text-white">
              Pictures should be 800x600 centre frame image.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadMediaSection;

