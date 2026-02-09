"use client";

import Image from "next/image";
import React from "react";


const AppDownloadSection: React.FC = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .app-download-bg {
          background-image: url('/svgs/mobile-bg.svg');
          background-size: cover;
          background-position: center;
        }
        @media (min-width: 1024px) {
          .app-download-bg {
            background-image: url('/svgs/CTA.svg');
          }
        }
      `}} />
      <section className="w-full mb-[60px] lg:h-[496px] md:h-[400px] h-[320px] md:py-16 py-6 flex flex-col lg:justify-center bg-neutral-50 dark:bg-neutral-900 app-download-bg ">
      <div className="2xl:container 2xl:mx-auto px-5">
        <div className="">
          <div className="flex flex-col lg:flex-row  gap-8">
            {/* Left Content */}
            <div className="flex-1 space-y-6 lg:max-w-[40%]">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-customRed"></div>
                <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">
                  TRUSTED BY 10M+ PEOPLE
                </p>
              </div>

              <h2 className="text-2xl md:text-4xl !mt-4 font-display font-bold text-black dark:text-white uppercase tracking-wide">
                FAST, SECURE & FREE – DOWNLOAD THE CAR AUCTION APP NOW
              </h2>
              <div className="flex gap-3 ">
                <Image
                  src="/svgs/AppleStoreIcon.svg"
                  alt="App Store"
                  width={191}
                  height={64}
                  className="w-[119px] h-auto md:w-[191px]"
                />
                <Image
                  src="/svgs/GoogleAppStoreIcon.svg"
                  alt="Google Play"
                  width={216}
                  height={64}
                  className="w-[135px] h-auto md:w-[216px]"
                />
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default AppDownloadSection;
