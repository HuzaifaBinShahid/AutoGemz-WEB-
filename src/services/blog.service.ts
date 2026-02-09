import type { BlogPost } from "@/interfaces";
import { BLOG_POSTS } from "@/constants/constants";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const blogService = {
  async getPosts(): Promise<BlogPost[]> {
    // Simulate API call with delay
    await delay(1000);
    
    // Simulate random errors (10% chance)
    if (Math.random() < 0.1) {
      throw new Error("Failed to fetch blog posts. Please try again later.");
    }
    
    return BLOG_POSTS;
  },

  async getPostById(id: string): Promise<BlogPost | null> {
    await delay(800);
    
    const post = BLOG_POSTS.find((p) => p.id === id);
    if (!post) {
      throw new Error(`Blog post with id ${id} not found`);
    }
    
    return post;
  },
};

