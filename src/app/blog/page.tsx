"use client";

import React, { useState, useMemo } from 'react'
import PageHeader from '@/components/common/PageHeader'
import { dummyBlogPosts } from '@/constants/constants';
import BlogCard from '@/features/blog/BlogCard';
import Pagination from '@/components/common/Pagination';

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  // Calculate pagination
  const totalPages = Math.ceil(dummyBlogPosts.length / postsPerPage);

  // Get current page posts
  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return dummyBlogPosts.slice(startIndex, endIndex);
  }, [currentPage, postsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Optional: Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <PageHeader title="AUTO NEWS" backgroundImage="/images/BlogHeaderImage.png" />
      <div className="container mx-auto px-4 py-12 2xl:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.map((post) => (
            <BlogCard key={post.id} post={post}  titleClassName="!text-base !font-semibold"/>
          ))}
        </div>

        {/* Pagination Component */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              maxVisiblePages={5}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;