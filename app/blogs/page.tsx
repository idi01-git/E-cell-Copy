"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/ui/blur-fade";

// Blog data from the data file (projects array)
const blogPosts = [
  {
    id: 1,
    title: "Scaling Your Business: From Startup to Enterprise",
    description: "Learn the critical strategies and frameworks needed to scale your startup from a small team to a thriving enterprise.",
    image: "/news/7.webp",
    date: "December 10, 2024",
    author: "Shivang",
    link: "https://medium.com/@ecell-iet-lucknow/scaling-your-business-from-startup-to-enterprise"
  },
  {
    id: 2,
    title: "Digital Marketing Strategies for Startups",
    description: "Master the art of digital marketing with proven strategies that can help your startup reach its target audience.",
    image: "/news/6.webp",
    date: "December 15, 2024",
    author: "Shivang",
    link: "https://medium.com/@ecell-iet-lucknow/digital-marketing-strategies-for-startups"
  },
  {
    id: 3,
    title: "Funding Your Startup: A Complete Guide",
    description: "Navigate the complex world of startup funding with our comprehensive guide to various financing options.",
    image: "/news/5.webp",
    date: "December 20, 2024",
    author: "Shivang",
    link: "https://medium.com/@ecell-iet-lucknow/funding-your-startup-a-complete-guide"
  },
  {
    id: 4,
    title: "Building a Strong Team: The Foundation of Success",
    description: "Learn the essential strategies for building and managing a high-performing team in your startup journey.",
    image: "/news/4.webp",
    date: "December 28, 2024",
    author: "Shivang",
    link: "https://medium.com/@ecell-iet-lucknow/building-a-strong-team-the-foundation-of-success"
  },
  {
    id: 5,
    title: "Innovation in Technology: What's Next?",
    description: "Dive into the latest technological innovations and how they're creating new opportunities for entrepreneurs.",
    image: "/news/3.webp",
    date: "January 5, 2025",
    author: "Shivang",
    link: "https://medium.com/@ecell-iet-lucknow/innovation-in-technology-whats-next"
  },
  {
    id: 6,
    title: "Startup Success Stories: Lessons Learned",
    description: "Discover inspiring stories from successful entrepreneurs and the key lessons that propelled their ventures forward.",
    image: "/news/2.webp",
    date: "January 10, 2025",
    author: "Shivang",
    link: "https://medium.com/@ecell-iet-lucknow/startup-success-stories-lessons-learned"
  },
  {
    id: 7,
    title: "The Future of Entrepreneurship in 2025",
    description: "Explore the emerging trends and opportunities that will shape the entrepreneurial landscape in the coming year.",
    image: "/news/1.webp",
    date: "January 15, 2025",
    author: "Shivang",
    link: "https://medium.com/@ecell-iet-lucknow/the-future-of-entrepreneurship-in-2025"
  }
];

// Blog card component
const BlogCard = ({ post }: { post: typeof blogPosts[0] }) => {
  return (
    <div className="bg-background/20 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
      <div className="relative overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          width={400}
          height={400}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors font-sans">
          {post.title}
        </h3>
        
        {/* Description */}
        <p className="text-white/80 mb-4 leading-relaxed">
          {post.description}
        </p>
        
        {/* Read More Link */}
        <Link
          href={`/blogs/${post.id}/read`}
          className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors font-medium group/link"
        >
          Read More 
          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default function BlogsPage() {
  const [visiblePosts, setVisiblePosts] = React.useState(6);
  const [isLoading, setIsLoading] = React.useState(false);

  const loadMorePosts = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisiblePosts(prev => Math.min(prev + 3, blogPosts.length));
      setIsLoading(false);
    }, 1000);
  };

  const hasMorePosts = visiblePosts < blogPosts.length;

  return (
    <main className="relative bg-transparent flex justify-center items-center flex-col overflow-hidden mx-auto px-3 sm:px-6 lg:px-10 min-h-screen">
      <Navbar />
      <BackgroundBeams className="z-0" />
      
      <div className="max-w-6xl w-full relative z-10 pt-32">
        {/* Title */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-6">
            Latest Updates
          </Badge>
          <BlurFade delay={0.25} inView>
            <h1 className="mb-3 text-pretty text-4xl font-normal font-playfair md:mb-4 md:text-5xl lg:mb-6 lg:max-w-3xl lg:text-6xl mx-auto text-white">
              The Entrepreneurial Times
            </h1>
          </BlurFade>
          <BlurFade delay={0.5} inView>
            <p className="mb-8 text-muted-foreground md:text-base lg:max-w-3xl lg:text-lg mx-auto text-white/80">
              Take a look at the monthly newsletter of E-Cell IET Lucknow for the updates regarding the entrepreneurial world
            </p>
          </BlurFade>
        </div>

        {/* Blog Grid */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {blogPosts.slice(0, visiblePosts).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Load More Button */}
        {hasMorePosts && (
          <div className="text-center mb-16">
            <Button
              onClick={loadMorePosts}
              disabled={isLoading}
              size="lg"
              className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-semibold hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-0 rounded-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  Load More Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </main>
  );
}
