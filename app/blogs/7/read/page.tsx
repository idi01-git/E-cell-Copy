import * as React from "react";
import Image from "next/image";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Navbar from "@/components/ui/Navbar";
import FooterSection from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { 
  getBlogSEOData, 
  generateArticleSchema, 
  generateCanonicalUrl,
  SEO_CONSTANTS 
} from "@/lib/seo";

// Blog data for blog 7
const blogData = {
  id: 7,
  title: "The Future of Entrepreneurship in 2025",
  description: "Explore the emerging trends and opportunities that will shape the entrepreneurial landscape in the coming year.",
  image: "/news/1.webp",
  date: "January 15, 2025",
  author: "Shivang",
  link: "https://medium.com/@ecell-iet-lucknow/the-future-of-entrepreneurship-in-2025",
  category: "Future Trends",
  content: [
    {
      type: "paragraph",
      text: "As we step into 2025, the entrepreneurial landscape is undergoing unprecedented transformation. The convergence of artificial intelligence, sustainable technologies, and global connectivity is creating new opportunities for innovative thinkers and bold visionaries. This forward-looking analysis explores the key trends and opportunities that will define entrepreneurship in the coming year."
    },
    {
      type: "heading",
      text: "AI-Powered Business Solutions"
    },
    {
      type: "paragraph",
      text: "Artificial intelligence is no longer just a buzzword—it's becoming the foundation of modern business operations. Entrepreneurs who can leverage AI to automate processes, enhance customer experiences, and make data-driven decisions will have a significant competitive advantage."
    },
    {
      type: "paragraph",
      text: "From AI-powered customer service chatbots to predictive analytics for business forecasting, the applications of AI in entrepreneurship are endless. The key is to identify specific use cases where AI can provide genuine value and solve real problems for your customers."
    },
    {
      type: "heading",
      text: "Sustainability and Social Impact"
    },
    {
      type: "paragraph",
      text: "Consumers and investors are increasingly prioritizing sustainability and social impact when making decisions. Entrepreneurs who build these values into their business models from the start are more likely to attract customers, talent, and investment."
    },
    {
      type: "paragraph",
      text: "The future of entrepreneurship is not just about profit—it's about creating value for all stakeholders while addressing the world's most pressing challenges. From renewable energy solutions to circular economy models, sustainable entrepreneurship is becoming the new standard."
    }
  ],
  galleryImages: [
    "/news/1.webp",
    "/news/7.webp", 
    "/news/6.webp",
    "/news/5.webp"
  ]
};

// Generate metadata for this blog page
export async function generateMetadata(): Promise<Metadata> {
  const blogId = 7;
  const blogSEOData = getBlogSEOData(blogId);
  
  if (!blogSEOData) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: blogSEOData.title,
    description: blogSEOData.description,
    keywords: 'entrepreneurship, future trends, business innovation, startup ecosystem, AI in business',
    authors: [{ name: blogSEOData.author }],
    openGraph: {
      title: blogSEOData.title,
      description: blogSEOData.description,
      url: generateCanonicalUrl(blogSEOData.readUrl),
      siteName: SEO_CONSTANTS.SITE_NAME,
      images: [
        {
          url: `${SEO_CONSTANTS.SITE_URL}${blogSEOData.image}`,
          width: SEO_CONSTANTS.IMAGE_DIMENSIONS.width,
          height: SEO_CONSTANTS.IMAGE_DIMENSIONS.height,
          alt: blogSEOData.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: blogSEOData.publishedTime,
      modifiedTime: blogSEOData.modifiedTime || blogSEOData.publishedTime,
      authors: [blogSEOData.author],
      section: 'Entrepreneurship',
      tags: ['entrepreneurship', 'future trends', 'business innovation'],
    },
    twitter: {
      card: 'summary_large_image',
      site: SEO_CONSTANTS.TWITTER_HANDLE,
      creator: SEO_CONSTANTS.TWITTER_HANDLE,
      title: blogSEOData.title,
      description: blogSEOData.description,
      images: {
        url: `${SEO_CONSTANTS.SITE_URL}${blogSEOData.image}`,
        alt: blogSEOData.title,
      },
    },
    alternates: {
      canonical: generateCanonicalUrl(blogSEOData.readUrl),
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function BlogReadPage() {
  const blogId = 7;
  const blogSEOData = getBlogSEOData(blogId);
  const articleSchema = blogSEOData ? generateArticleSchema(blogSEOData) : null;
  return (
    <>
      {/* JSON-LD Schema for Article */}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />
      )}
      
      <main className="relative bg-transparent flex justify-center items-center flex-col overflow-hidden mx-auto px-3 sm:px-6 lg:px-10 min-h-screen">
        <Navbar />
        <BackgroundBeams className="z-0" />
      
      <div className="max-w-4xl w-full relative z-10 pt-32">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Blogs</span>
          </Link>
          <span className="text-white/60 mx-2">/</span>
          <span className="text-white/60">{blogData.category}</span>
        </div>

        {/* Article Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center leading-tight">
          {blogData.title}
        </h1>

        {/* Author and Date */}
        <div className="text-center mb-10">
          <p className="text-white/70 text-sm">
            By {blogData.author} • Published on {blogData.date}
          </p>
        </div>

        {/* Article Content */}
        <article className="prose prose-invert max-w-none">
          {blogData.content.map((section, index) => (
            <div key={index} className="mb-6">
              {section.type === "heading" ? (
                <h2 className="text-2xl font-bold text-white mb-4 mt-8 first:mt-0">
                  {section.text}
                </h2>
              ) : (
                <p className="text-white/80 leading-relaxed text-base">
                  {section.text}
                </p>
              )}
            </div>
          ))}
        </article>

        {/* Back to Blogs Button */}
        <div className="mt-12 text-center">
          <Link href="/blogs">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-semibold hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-0 rounded-full"
            >
              Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
      
      <FooterSection />
      </main>
    </>
  );
}
