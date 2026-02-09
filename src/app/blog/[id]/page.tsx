"use client";

import { dummyBlogPosts } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BiChevronLeft } from "react-icons/bi";
import BlogCard from "@/features/blog/BlogCard";

const BlogDetail = () => {
  const params = useParams();
  const postId = params?.id as string;

  // Find the blog post by ID
  const post = dummyBlogPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Post Not Found</h1>
          <Link href="/" className="text-red-600 hover:text-red-700">
            Go back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Format date to "MONTH DAY, YEAR" format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  // Parse content - if it's a JSON string with sections, parse it
  const renderContent = () => {
    const content = post.content;
    if (!content) {
      // If no content, render excerpt as fallback
      return (
        <div className="prose prose-invert max-w-none">
          <p className="text-black dark:text-white text-base leading-relaxed mb-6 font-display">
            {post.excerpt}
          </p>
        </div>
      );
    }

    try {
      // Try to parse as JSON (structured content)
      const parsed = JSON.parse(content);
      if (parsed && parsed.sections) {
        return renderStructuredContent(parsed);
      }
    } catch (e) {
      // If not JSON, treat as plain text
    }

    // Otherwise, render as simple text
    return (
      <div className="prose prose-invert max-w-none">
        <p className="text-black dark:text-white text-base leading-relaxed mb-6 font-display">
          {post.content || post.excerpt}
        </p>
      </div>
    );
  };

  const renderStructuredContent = (content: any) => {
    if (!content.sections) return null;

    return (
      <div className="space-y-12">
        {content.sections.map((section: any, index: number) => (
          <div key={index}>
            {section.quote && (
              <blockquote className="border-l-4 border-red-600 pl-6 my-8">
                <p className="text-black dark:text-white lg:text-[34px] text-base lg:leading-[51px] font-mulish font-light italic">
                  {section.quote}
                </p>
              </blockquote>
            )}
            {section.heading && (
              <h2 className={`text-black dark:text-white uppercase mb-6 font-display align-middle ${
                section.heading === "Stay Confident on the Road" 
                  ? "text-[18px] font-light leading-[22px] tracking-normal"
                  : "text-[36px] font-semibold leading-[47px] tracking-[1.4px]"
              }`}>
                {section.heading}
              </h2>
            )}
            {section.intro && (
              <p className="text-black dark:text-white text-base leading-[24px] mb-6 font-mulish font-light">
                {section.intro}
              </p>
            )}
            {section.items && (
              <ul className="space-y-4 mb-6">
                {section.items.map((item: any, itemIndex: number) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1">•</span>
                    <span className="text-black dark:text-white text-base leading-[24px] font-mulish font-light">
                      <strong className="text-black dark:text-white font-normal">{item.title}:</strong>{" "}
                      {item.description}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {section.paragraphs && (
              <div className="space-y-4">
                {section.paragraphs.map((para: string, paraIndex: number) => (
                  <p
                    key={paraIndex}
                    className="text-black dark:text-white text-base leading-[24px] font-mulish font-light"
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}
            {section.image && (
              <div className="my-8">
                <Image
                  src={section.image}
                  alt={section.heading || "Blog content"}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            {section.tagsHeading && (
              <div className="mt-12">
                <h3 className="text-[20px] font-semibold text-black dark:text-white mb-4 font-display leading-[28px] align-middle">
                  {section.tagsHeading}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {section.tags && section.tags.map((tag: string, tagIndex: number) => (
                    <span
                      key={tagIndex}
                      className="px-4 py-2 border border-[#00000012] dark:border-[#FFFFFF1A] bg-white dark:bg-[#FFFFFF0D] text-black dark:text-white text-sm font-display rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen  text-black dark:text-white lg:pt-[150px] pt-[120px]">
      {/* Header Section with Go Back Button */}
      <div className="2xl:container 2xl:mx-auto px-4 pb-16 xl:px-10">
        <Link href="/blog">
          <div className="flex items-center gap-5 mb-[30px]">
            <p className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white md:p-2 transition-colors duration-200 font-display uppercase text-sm  tracking-widest">
              <BiChevronLeft className="w-6 h-6" />

            </p>
            <span className="text-black dark:text-white text-sm font-display uppercase tracking-widest">
              GO BACK
            </span>
          </div>
        </Link>
        {/* Category Tag and Date */}
        <div className="flex items-center gap-4 mb-6">
          {post.category && (
            <div className="border border-[#00000012] dark:border-[#FFFFFF1A] bg-gray-200 dark:bg-[#FFFFFF2A] px-3 py-1">
              <span className="text-black dark:text-[#FFFFFF] text-sm font-display font-semibold uppercase tracking-wide">
                {post.category}
              </span>
            </div>
          )}
          <span className="w-[40px] h-[1px] bg-[#0000003A] dark:bg-[#FFFFFF3A]"></span>
          {post.date && (
            <span className="text-black dark:text-[#FFFFFF] text-sm font-display font-semibold uppercase leading-[21px] tracking-[1.4px] align-middle">
              {formatDate(post.date)}
            </span>
          )}
        </div>

        {/* Main Title */}
        <h1 className="xl:text-[56px] text-4xl md:text-5xl max-w-[966px] font-semibold text-black dark:text-white uppercase mb-6 font-display !leading-tight tracking-[4px] align-middle">
          {post.title}
        </h1>

        {/* Introductory Paragraph */}
        <p className="text-black dark:text-[#A5A5A5] text-xs md:text-base leading-relaxed xl:mb-8 max-w-3xl font-mulish">
          {post.excerpt}
        </p>
      </div>

      {/* Hero Image */}
      {post.image && (
        <div className="w-full mb-12 ">
          <div className="w-full 2xl:container 2xl:mx-auto">
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] bg-white">
              <div className="absolute inset-0 m-[10px]">
                <Image
                  src={post.image}
                  alt={post.title || "Blog post image"}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16 2xl:px-8">
        <div className="max-w-4xl mx-auto">{renderContent()}</div>
      </div>

      {/* Related Posts Section */}
      {(() => {
        // Get related posts (exclude current post, get first 3)
        const relatedPosts = dummyBlogPosts
          .filter((p) => p.id !== postId)
          .slice(0, 3);

        if (relatedPosts.length === 0) return null;

        return (
          <div className="container mx-auto px-4 pb-16 2xl:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-4xl font-bold text-black dark:text-white uppercase font-display">
                  RELATED POSTS
                </h2>
                <Link
                  href="/blog"
                  className="text-red-600 hover:text-red-700 uppercase font-display text-sm font-semibold tracking-wider"
                >
                  VIEW ALL
                </Link>
              </div>

              {/* Related Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default BlogDetail;
