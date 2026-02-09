"use client";

import { ReactNode } from "react";
import GlassmorphismWrapper from "@/components/common/GlassmorphismWrapper";
import GoogleIcon from "@/assets/svg/GoogleIcon";
import AppleIcon from "@/assets/svg/AppleIcon";
import Link from "next/link";
import HomeHeaderCard from "@/features/home/HomeHeaderCard";


interface AuthLayoutProps {
  headerText?: string;
  title: string;
  description: string;
  formContent: ReactNode;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
  showSocialLogin?: boolean;
  backgroundImage?: string;
  className?: string;
  showGridLines?: boolean;
  GlassmorphismWrapperClassName?: string;
  titleClassName?: string;
  mainClassName?: string;
  fullHeight?: boolean;
  isShowHeaderCards?: boolean
  descriptionClassName?: string
}

export default function AuthLayout({
  headerText,
  title,
  description,
  formContent,
  footerText,
  footerLinkText,
  footerLinkHref,
  showSocialLogin = true,
  backgroundImage = "/images/AuthImage.jpg",
  className,
  showGridLines = true,
  GlassmorphismWrapperClassName,
  titleClassName,
  mainClassName,
  isShowHeaderCards = false,
  fullHeight = true,
  descriptionClassName,
}: AuthLayoutProps) {
  return (
    <main className={`relative w-full ${fullHeight ? "min-h-screen" : ""} overflow-hidden ${mainClassName ? mainClassName : ""}`}>
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />

      {/* Grid Lines (desktop only) */}
      {showGridLines && (
        <div className="absolute inset-0 pointer-events-none hidden md:block z-0">
          <div className="absolute top-0 right-[878px] w-px h-full bg-[#FFFFFF1A]" />
          <div className="absolute top-0 right-[80px] w-px h-full bg-[#FFFFFF1A]" />
          <div className="absolute top-[calc(130px+288.5px-265px)] left-0 w-full h-px bg-[#FFFFFF1A]" />
          <div className="absolute top-[calc(130px+465.5px+265px)] left-0 w-full h-px bg-[#FFFFFF1A]" />
        </div>
      )}

      {/* Auth Form */}
      <section className={`relative z-10 flex justify-end h-auto md:px-20 px-5 my-20 md:mt-[150px] ${className ? className : ""}`}>
        <div className="max-w-[800px] w-full border border-[#FFFFFF1A]">
          <GlassmorphismWrapper className={`${GlassmorphismWrapperClassName ? GlassmorphismWrapperClassName : ""} `}>
            {headerText && (
              <div className="flex items-center gap-3 mb-6 md:justify-start justify-center">
                <div className="w-1 h-5 bg-red-500" />
                <span className="text-gray-300 md:text-lg text-sm tracking-normal  font-display uppercase">
                  {headerText}
                </span>
              </div>
            )}
            <h1 className={`text-[50px] uppercase font-semibold text-white font-display leading-[70px] tracking-tight ${titleClassName ? titleClassName : ""}`}>
              {title}
            </h1>
            <p className={`text-[#A5A5A5] md:text-base text-xs text-center md:text-left font-normal mb-10 mt-6 md:mt-0 font-mulish ${descriptionClassName ? descriptionClassName : ""} `}>
              {description}
            </p>

            {formContent}

            {footerText && footerLinkText && footerLinkHref && (
              <div className="mt-6 text-sm !font-mulish font-normal">
                <span className="text-[#A5A5A5] ">
                  {footerText}{" "}
                  <Link
                    href={footerLinkHref}
                    className="text-white hover:text-red-400 underline  !font-mulish font-normal"
                  >
                    {footerLinkText}
                  </Link>
                </span>
              </div>
            )}

            {showSocialLogin && (
              <>
                <div className="pt-10 mb-8 text-center">
                  <p className="text-[#A5A5A5] font-base font-mulish font-semibold">
                    Or start with these accounts
                  </p>
                </div>

                <div className="flex justify-center gap-7">
                  <Link href="#">
                    <GoogleIcon />
                  </Link>
                  <Link href="#">
                    <AppleIcon />
                  </Link>
                </div>
              </>
            )}
          </GlassmorphismWrapper>

        </div>
      </section>
      {isShowHeaderCards && (
        <HomeHeaderCard />

      )}
    </main>
  );
}
