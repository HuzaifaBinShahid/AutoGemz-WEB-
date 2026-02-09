"use client";

import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FiSend } from "react-icons/fi";
import FacebookIcon from "../../assets/svg/FacebookIcon";
import InstagramIcon from "../../assets/svg/InstagramIcon";
import LinkedInIcon from "../../assets/svg/LinkedInIcon";
import TwitterIcon from "../../assets/svg/TwitterIcon";
import Button from "../common/Button";
import type { RootState } from "@/store";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/blog", label: "Blog" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="relative bg-white dark:bg-black overflow-hidden m-[10px]">
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none">
        <Image
          src="/svgs/top-effect.png"
          alt=""
          width={644}
          height={357}
          className="w-full h-auto opacity-70"
          priority
        />
      </div>
      <div className="absolute top-0 right-0 w-34 h-34 pointer-events-none">
        <Image
          src="/svgs/top-icon.svg"
          alt=""
          width={100}
          height={100}
          className="w-full h-auto opacity-70"
          priority
        />
      </div>

      <div className="absolute bottom-24 left-0 w-96 h-96 pointer-events-none">
        <Image
          src="/svgs/BG Blur.svg"
          alt=""
          width={644}
          height={357}
          className="w-full h-auto opacity-70 transform "
        />
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 bg-red-100/30 dark:bg-red-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-red-50/40 dark:bg-red-900/5 rounded-full blur-3xl"></div>
      <div className="relative 2xl:container 2xl:mx-auto xl:px-10 xl:px- px-4 lg:pt-[100px] pt-[40px] ">
        <div className="flex flex-col lg:flex-row justify-between mb-12">
          <div className="space-y-8 ">
            <div className="space-y-4 2xl:w-[857px]">
              <h2 className="text-2xl font-display lg:text-3xl lg:max-w-[650px] font-bold text-black dark:text-white uppercase tracking-wider">
                Get Exclusive Auction Access Before Anyone Else
              </h2>
              <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400 max-w-lg leading-relaxed">
                Subscribe to our newsletter for the latest news, exclusive
                offers, and expert tips on car care. Join our community of car
                enthusiasts and never miss out on important updates. Enter your
                email below to stay connected with Autofix!
              </p>

              <form onSubmit={handleSubmit} className="flex gap-0 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR MAIL"
                  className="flex-1 px-4 py-3 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm uppercase tracking-wide"
                  required
                />
                <button
                  type="submit"
                  className="w-12 h-12 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-colors duration-200"
                  aria-label="Subscribe to newsletter"
                >
                  <FiSend className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Explore Offerings Section - Only show when not authenticated */}
            {!isAuthenticated && (
              <div className="space-y-4">
                <h2 className="text-2xl font-display lg:text-3xl font-bold text-black dark:text-white uppercase tracking-wider">
                  Explore Our Full Range Of Offerings
                </h2>

                <div className="flex  gap-4 lg:pr-10 xl:pr-0 pr-0">
                  <Button href="/signup" variant="auth" className="bg-[#00000014] hover:bg-[#00000029]  ">Sign Up</Button>
                  <Button href="/login" variant="auth" className="bg-[#00000014] hover:bg-[#00000029]  " >Log In</Button>
                </div>
              </div>
            )}
            {/* Bottom Navigation Bar */}
            <div className=" pt-6 mt-8 hidden lg:block">
              <nav className="flex flex-wrap  gap-6 lg:gap-12">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-semibold uppercase tracking-wide text-black dark:text-white hover:text-red-600 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Section - Connect & Locate with Map and Social Icons */}
          <div className="space-y-8 mt-[37px] lg:mt-0">
            <h2 className="text-2xl font-display lg:text-3xl font-bold text-black dark:text-white uppercase tracking-wider">
              Connect & Locate Us
            </h2>

            <div className="flex flex-row md:gap-6 items-start justify-center sm:items-center gap-3">
              <div className="flex relative w-full sm:w-auto">
                <Image
                  src="/svgs/Map.svg"
                  alt="World map showing business location"
                  width={386}
                  height={368}
                  className="w-full max-w-[290px] small:max-w-[300px] xs:max-w-[340px] md:max-w-[375px] h-auto aspect-[386/368] object-contain dark:hidden"
                />
                <Image
                  src="/svgs/DarkMap.svg"
                  alt="World map showing business location"
                  width={386}
                  height={368}
                  className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[375px] h-auto aspect-[386/368] object-contain hidden dark:block"
                />
              </div>
              {/* Social Media Icons Stack */}
              <div className="flex flex-col gap-3 flex-shrink-0">
                <div className="w-[53px] h-[53px] md:w-[80px] md:h-[80px] lg:w-[60px] lg:h-[60px] xl:w-[80px] xl:h-[80px] [&>svg]:w-full [&>svg]:h-full">
                  <InstagramIcon />
                </div>
                <div className="w-[53px] h-[53px] md:w-[80px] md:h-[80px] lg:w-[60px] lg:h-[60px] xl:w-[80px] xl:h-[80px] [&>svg]:w-full [&>svg]:h-full">
                  <FacebookIcon />
                </div>
                <div className="w-[53px] h-[53px] md:w-[80px] md:h-[80px] lg:w-[60px] lg:h-[60px] xl:w-[80px] xl:h-[80px] [&>svg]:w-full [&>svg]:h-full">
                  <TwitterIcon />
                </div>
                <div className=" w-[53px] h-[53px] md:w-[80px] md:h-[80px] lg:w-[60px] lg:h-[60px] xl:w-[80px] xl:h-[80px] [&>svg]:w-full [&>svg]:h-full">
                  <LinkedInIcon />
                </div>
              </div>
            </div>
            <div className=" flex justify-center w-full px-4 lg:hidden mt-5">
              <nav className="flex flex-wrap  gap-6 lg:gap-12">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-semibold uppercase tracking-wide text-black dark:text-white hover:text-red-600 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            {/* App Download Buttons */}
            <div className="flex gap-3 items-center justify-center lg:justify-start">
              <Image
                src="/svgs/AppleStoreIcon.svg"
                alt="App Store"
                width={191}
                height={64}
                className="w-[119px] h-auto xl:w-[191px] lg:w-[150px]"
              />
              <Image
                src="/svgs/GoogleAppStoreIcon.svg"
                alt="Google Play"
                width={216}
                height={64}
                className="w-[135px] h-auto xl:w-[216px] lg:w-[180px]"
              />
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
