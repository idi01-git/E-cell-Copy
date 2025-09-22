import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { 
  getBlogSEOData, 
  generateBlogPostingSchema, 
  generateCanonicalUrl,
  SEO_CONSTANTS 
} from "@/lib/seo";

// Generate metadata for this blog page
export async function generateMetadata(): Promise<Metadata> {
  const blogId = 7;
  const blogSEOData = getBlogSEOData(blogId);
  
  if (!blogSEOData) {
    return {
      title: 'The Future of Entrepreneurship in 2025 | E-Cell IET Lucknow',
      description: 'Explore the emerging trends and opportunities that will shape the entrepreneurial landscape in the coming year.',
    };
  }

  return {
    title: blogSEOData.title,
    description: blogSEOData.description,
    keywords: 'entrepreneurship, business ideas, startup guide, innovation, business development',
    authors: [{ name: blogSEOData.author }],
    openGraph: {
      title: blogSEOData.title,
      description: blogSEOData.description,
      url: generateCanonicalUrl(blogSEOData.url),
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
      tags: ['entrepreneurship', 'business', 'startup'],
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
      canonical: generateCanonicalUrl(blogSEOData.url),
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

export default function BlogsPage() {
  const blogId = 7;
  const blogSEOData = getBlogSEOData(blogId);
  const blogSchema = blogSEOData ? generateBlogPostingSchema(blogSEOData) : null;
  
  return (
    <>
      {/* JSON-LD Schema for Blog Posting */}
      {blogSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogSchema),
          }}
        />
      )}
      
      <div className="p-6 bg-black min-h-screen">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          The Entrepreneurial<span className="text-purple-500"> Times</span>
        </h1>
        
        <div className="container mx-auto max-w-4xl mt-8">
          <div className="relative rounded-[22px] p-2 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500">
            <div className="rounded-[20px] p-8 sm:p-10 bg-white">
              <Image
                src="/news/1.webp"
                alt="The Future of Entrepreneurship in 2025"
                height={400}
                width={600}
                className="mx-auto mb-6 rounded-lg"
              />
              
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                The Future of Entrepreneurship in 2025
              </h2>

              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  Entrepreneurship is more than just starting a business—it is a
                  mindset, a journey of innovation, risk-taking, and problem-solving.
                  It is the ability to see opportunities where others see obstacles
                  and the courage to turn ideas into reality.
                </p>
                
                <p>
                  Whether it's a tech startup revolutionizing an industry or a small 
                  business addressing local needs, entrepreneurship is at the core of 
                  economic and social progress.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                  The Essence of Entrepreneurship
                </h3>
                
                <p>
                  Entrepreneurship is about identifying problems and creating solutions. 
                  It involves taking calculated risks, challenging the status quo, and 
                  embracing failure as a learning opportunity. Successful entrepreneurs 
                  possess qualities like resilience, adaptability, and a vision that 
                  drives them forward despite challenges.
                </p>
                
                <p>
                  At its core, entrepreneurship is fueled by innovation. From groundbreaking 
                  technological advancements to creative business models, entrepreneurs bring 
                  fresh perspectives that redefine industries. Companies like Apple, Tesla, 
                  and Airbnb began as mere ideas but transformed their respective markets 
                  through innovative thinking and perseverance.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                  The Challenges of Entrepreneurship
                </h3>
                
                <p>
                  While entrepreneurship offers exciting opportunities, it is not without 
                  its challenges. Some of the major hurdles include financial constraints, 
                  market competition, uncertainty and risk, and the immense time and effort 
                  required to turn a vision into reality.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                  The Rewards of Entrepreneurship
                </h3>
                
                <p>
                  Despite the challenges, entrepreneurship is incredibly rewarding. 
                  Entrepreneurs have the potential for financial independence, creative 
                  freedom, making a lasting impact on society, and experiencing tremendous 
                  personal growth through their journey.
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <span className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
                  Author - {blogSEOData?.author || 'E-Cell IET Lucknow'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
