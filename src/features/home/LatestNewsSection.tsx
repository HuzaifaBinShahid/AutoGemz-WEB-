"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { dummyBlogPosts } from "@/constants/constants";
import type { BlogPost } from "@/interfaces";

interface LatestNewsSectionProps {
  className?: string;
  posts?: (BlogPost & { category?: string })[];
  limit?: number;
  title?: string;
  viewAllLink?: string;
}

const LatestNewsSection = ({ 
  className,
  posts,
  limit = 2,
  title = "LASTED NEWS",
  viewAllLink = "/blog"
}: LatestNewsSectionProps) => {
  // Format date to "MONTH DAY, YEAR" format (e.g., "JULY 14, 2024")
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString("en-US", { month: "long" }).toUpperCase();
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  // Use provided posts or fallback to dummyBlogPosts, then limit the number
  const latestPosts = (posts || dummyBlogPosts).slice(0, limit);

  return (
    <section className={`py-16 lg:py-20 ${className ? className : ""}`}>
      <div className="2xl:container 2xl:mx-auto px-4 2xl:px-8">
        {/* Header Section */}
        <div className="flex items-center justify-between md:mb-[24px] mb-[18px]">
          <h2 className="text-black dark:text-white font-display font-semibold text-2xl md:text-[30px] lg:text-5xl uppercase tracking-wide">
            {title}
          </h2>
          <Link
            href={viewAllLink}
            className="text-customRed font-display font-bold text-xs md:text-sm uppercase tracking-wide underline"
          >
            VIEW ALL
          </Link>
        </div>

        {/* News Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-2 ">
          {latestPosts.map((post, index) => {
            // Check if we need to reverse layout (for posts 3 & 4 when limit is 4)
            const shouldReverse = limit === 4 && (index === 2 || index === 3);
            
            return (
              <div
                key={post.id}
                className="relative"
              >
                <div className={`flex flex-col ${shouldReverse ? "lg:flex-row-reverse" : "lg:flex-row"} h-full`}>
                  {/* Image Section */}
                  <div className="relative w-full lg:w-1/2 h-64 lg:h-[400px] xl:h-[350px]">
                    {post.image && (
                      <Image
                        src={post.image}
                        alt={post.title || "Blog post image"}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    )}
                  </div>
                  <div
                    className={`absolute bg-white z-10 dark:bg-black ${
                      shouldReverse 
                        ? "lg:top-[50%] lg:right-[50%] lg:left-auto top-[46%] left-[45.7%]" 
                        : "lg:top-[50%] lg:left-[50%] top-[46%] left-[45.7%]"
                    }`}
                    style={{
                      width: "19.446839934010654px",
                      height: "19.446839934010654px",
                      transform: "translate(-50%, -50%) rotate(-45.05deg)",
                      opacity: 1,
                    }}
                  ></div>

                  {/* Text Content Section */}
                  <div className="w-full lg:w-1/2 bg-white dark:bg-black p-[19px]  flex flex-col justify-between min-h-[300px]">
                  <div>
                    {/* Date and Author */}
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-black dark:text-white font-display font-normal text-xs lg:text-sm uppercase tracking-wide">
                        {post.date ? formatDate(post.date) : ""}
                      </span>
                      {post.date && post.author && <div className="w-2 h-2 bg-customRed flex-shrink-0"></div>}
                      <span className="text-black dark:text-white font-display font-normal text-xs lg:text-sm uppercase tracking-wide">
                        {post.author ? `BY ${post.author.toUpperCase()}` : ""}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-black dark:text-white font-display font-semibold text-xl lg:text-2xl  uppercase leading-tight mb-4">
                      {post.title}
                    </h3>

                    {/* Description */}
                    <p className="text-black dark:text-white font-mulish font-light text-sm lg:text-base leading-relaxed opacity-90">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read Details Button */}
                  <Link
                    href={`/blog/${post.id}`}
                    className="flex items-center justify-between gap-3 group mt-2"
                  >
                    <span className="text-black dark:text-white font-display font-medium underline text-sm uppercase tracking-wide">
                      READ DETAILS
                    </span>
                    <div className="w-[14px] h-[14px] bg-customRed flex items-center justify-center flex-shrink-0 group-hover:bg-customRed/80 transition-colors duration-200">
                      <FiChevronRight className="w-[12px] h-[12px] text-white" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LatestNewsSection;

