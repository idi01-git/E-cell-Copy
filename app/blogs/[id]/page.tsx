import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import { Card, CardContent } from "../../../components/ui/card";
import { BackgroundGradient } from "../../../components/ui/background-gradient";
import { 
  getBlogSEOData, 
  generateBlogPostingSchema, 
  generateCanonicalUrl,
  SEO_CONSTANTS 
} from "@/lib/seo";

// Blog content data mapping
const blogContentMap: Record<number, {
  title: string;
  date: string;
  author: string;
  captions: string[];
  images: string[];
  instagramPostUrl?: string;
  content?: string;
}> = {
  1: {
    title: "The Future of Entrepreneurship",
    date: "January 15, 2025",
    author: "Shivansh Kaushik",
    captions: [
      "As we step into 2025, the entrepreneurial landscape is undergoing unprecedented transformation. The convergence of artificial intelligence, sustainable technologies, and global connectivity is creating new opportunities for innovative thinkers and bold visionaries.",
      "Key trends shaping the future include the rise of AI-powered business solutions, the growing emphasis on sustainability and social impact, and the democratization of entrepreneurship through digital platforms.",
      "Entrepreneurs who adapt to these changes and leverage emerging technologies will be well-positioned for success in the coming years.",
    ],
    images: ["/news.jpg", "/goal.png", "/services.png"],
    instagramPostUrl: "https://www.instagram.com/p/your-post-id/",
  },
  2: {
    title: "Building Sustainable Startups",
    date: "January 10, 2025",
    author: "Priya Sharma",
    captions: [
      "Sustainability is no longer just a buzzword—it's a business imperative. Modern startups that integrate environmental and social responsibility into their core business models are seeing unprecedented success.",
      "From circular economy principles to renewable energy solutions, sustainable startups are attracting both customers and investors who prioritize long-term value creation.",
      "The key to building a sustainable startup lies in understanding that profitability and purpose can coexist harmoniously.",
    ],
    images: ["/goal.png", "/services.png", "/news.jpg"],
  },
  3: {
    title: "Digital Marketing for Startups",
    date: "January 5, 2025",
    author: "Rahul Verma",
    captions: [
      "In today's digital-first world, effective marketing can make or break a startup. Understanding the nuances of digital marketing is crucial for entrepreneurs looking to scale their businesses.",
      "From social media strategies to content marketing and SEO, startups need to master multiple channels to reach their target audience effectively.",
      "The most successful startups are those that can tell compelling stories while delivering measurable results through data-driven marketing approaches.",
    ],
    images: ["/services.png", "/news.jpg", "/goal.png"],
  },
  4: {
    title: "Funding Your Startup Journey",
    date: "December 30, 2024",
    author: "Ankit Gupta",
    captions: [
      "Securing funding is one of the most critical challenges facing early-stage entrepreneurs. Understanding the various funding options and preparing effectively can significantly improve your chances of success.",
      "From bootstrapping and angel investors to venture capital and crowdfunding, each funding source has its own advantages and requirements.",
      "The key is to match your startup's stage, industry, and growth potential with the right type of funding and investors who align with your vision.",
    ],
    images: ["/news.jpg", "/goal.png", "/services.png"],
  },
  5: {
    title: "Innovation in Technology Startups",
    date: "December 25, 2024",
    author: "Neha Patel",
    captions: [
      "Technology startups are at the forefront of innovation, driving change across industries and creating new possibilities for human progress.",
      "From artificial intelligence and machine learning to blockchain and IoT, technology entrepreneurs are leveraging cutting-edge tools to solve complex problems.",
      "Success in tech entrepreneurship requires not just technical expertise, but also a deep understanding of market needs and user experience.",
    ],
    images: ["/goal.png", "/services.png", "/news.jpg"],
  },
  6: {
    title: "Building Strong Teams",
    date: "December 20, 2024",
    author: "Vikash Kumar",
    captions: [
      "Behind every successful startup is a strong, cohesive team. Building and maintaining high-performing teams is one of the most important skills for any entrepreneur.",
      "From hiring the right talent to creating a positive company culture, team building requires intentional effort and strategic thinking.",
      "The best startup teams combine diverse skills, shared vision, and unwavering commitment to achieving common goals.",
    ],
    images: ["/services.png", "/news.jpg", "/goal.png"],
  },
  7: {
    title: "Entrepreneurship: The Art of Turning Ideas into Reality",
    date: "December 15, 2024",
    author: "Shivansh Kaushik",
    captions: [
      "Entrepreneurship is more than just starting a business—it is a mindset, a journey of innovation, risk-taking, and problem-solving.",
      "It is the ability to see opportunities where others see obstacles and the courage to turn ideas into reality.",
      "Whether it's a tech startup revolutionizing an industry or a small business addressing local needs, entrepreneurship is at the core of economic and social progress.",
    ],
    images: ["/news.jpg"],
    content: `Entrepreneurship is more than just starting a business—it is a mindset, a journey of innovation, risk-taking, and problem-solving. It is the ability to see opportunities where others see obstacles and the courage to turn ideas into reality. Whether it's a tech startup revolutionizing an industry or a small business addressing local needs, entrepreneurship is at the core of economic and social progress.

### The Essence of Entrepreneurship
Entrepreneurship is about identifying problems and creating solutions. It involves taking calculated risks, challenging the status quo, and embracing failure as a learning opportunity. Successful entrepreneurs possess qualities like resilience, adaptability, and a vision that drives them forward despite challenges.

At its core, entrepreneurship is fueled by innovation. From groundbreaking technological advancements to creative business models, entrepreneurs bring fresh perspectives that redefine industries. Companies like Apple, Tesla, and Airbnb began as mere ideas but transformed their respective markets through innovative thinking and perseverance.

### The Challenges of Entrepreneurship
While entrepreneurship offers exciting opportunities, it is not without its challenges. Some of the major hurdles include:

- **Financial Constraints** – Securing funding is one of the biggest obstacles entrepreneurs face. Many startups struggle to attract investors or generate revenue in the early stages.
- **Market Competition** – Breaking into an industry and standing out among established players requires a well-defined strategy and a unique value proposition.
- **Uncertainty and Risk** – Entrepreneurs often operate in uncertain environments where business success is not guaranteed. The ability to take calculated risks and adapt to changes is crucial.
- **Time and Effort** – Entrepreneurship demands immense dedication, hard work, and perseverance. Many founders work long hours to turn their vision into reality.

### The Rewards of Entrepreneurship
Despite the challenges, entrepreneurship is incredibly rewarding. Some of the key benefits include:

- **Financial Independence** – Entrepreneurs have the potential to build successful businesses that generate wealth and financial stability.
- **Creative Freedom** – Unlike traditional jobs, entrepreneurship allows individuals to bring their ideas to life without external constraints.
- **Impact and Legacy** – Many entrepreneurs work towards solving real-world problems, leaving a lasting impact on society and inspiring future generations.
- **Personal Growth** – The journey of entrepreneurship fosters resilience, leadership skills, and self-confidence.

### How to Get Started
For those looking to embark on an entrepreneurial journey, here are a few steps to begin:

1. **Identify a Problem** – Start by observing the world around you and finding a problem that needs a solution.
2. **Develop a Business Plan** – Outline your business idea, target audience, revenue model, and growth strategy.
3. **Validate Your Idea** – Conduct market research, talk to potential customers, and gather feedback to refine your concept.
4. **Build a Strong Network** – Surround yourself with mentors, advisors, and like-minded individuals who can support your journey.
5. **Take Action and Iterate** – The best way to learn is by doing. Start small, test your idea, and continuously improve based on real-world feedback.

### Conclusion
Entrepreneurship is a challenging yet fulfilling journey that requires vision, passion, and perseverance. It has the power to drive innovation, create job opportunities, and transform industries. Whether you aspire to launch a startup or bring a unique idea to life, entrepreneurship is about taking that first step towards turning dreams into reality. If you have an idea, take the leap—your entrepreneurial journey begins now!`,
  },
  8: {
    title: "Scaling Your Business Operations",
    date: "December 10, 2024",
    author: "Arjun Singh",
    captions: [
      "Scaling a business requires more than just increasing revenue—it demands systematic improvements in operations, processes, and team capabilities.",
      "Successful scaling involves building robust systems that can handle growth while maintaining quality and customer satisfaction.",
      "The key is to scale strategically, focusing on sustainable growth rather than rapid expansion that could compromise your business foundation.",
    ],
    images: ["/news.jpg", "/goal.png"],
  },
  9: {
    title: "Customer-Centric Business Models",
    date: "December 5, 2024",
    author: "Sneha Reddy",
    captions: [
      "In today's competitive landscape, businesses that prioritize customer needs and experiences are the ones that thrive and grow sustainably.",
      "Customer-centric approaches involve understanding your audience deeply, anticipating their needs, and delivering value that exceeds expectations.",
      "Building a customer-centric business model requires continuous feedback, iteration, and a genuine commitment to solving customer problems.",
    ],
    images: ["/goal.png", "/services.png"],
  },
};

interface BlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for this blog page
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const blogId = parseInt(resolvedParams.id);
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

export default async function BlogPage({ params }: BlogPageProps) {
  const resolvedParams = await params;
  const blogId = parseInt(resolvedParams.id);
  const blogSEOData = getBlogSEOData(blogId);
  const blogContent = blogContentMap[blogId];
  
  if (!blogSEOData || !blogContent) {
    notFound();
  }

  const blogSchema = generateBlogPostingSchema(blogSEOData);

  // Special handling for blog 7 with full content
  if (blogId === 7) {
    return (
      <>
        {/* JSON-LD Schema for Blog Posting */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogSchema),
          }}
        />
        
        <div className="p-6 bg-shivansh">
          <h1 className="heading">
            The Entrepreneurial<span className="text-purple"> Times</span>
          </h1>
          <div className="container mt-[35px] w-full items-center justify-center">
            <BackgroundGradient className="rounded-[22px] w-xl p-8 sm:p-10 bg-shivansh">
              <Image
                src="/news.jpg"
                alt="Entrepreneurship article"
                height="400"
                width="600"
                className="mx-auto"
              />
              <p className="text-base sm:text-3xl text-black mt-4 mb-2 dark:text-neutral-200">
                {blogContent.title}
              </p>
              <p className="text-md text-neutral-600 dark:text-neutral-400">
                {blogContent.content}
              </p>
              <button className="rounded-full pl-4 pr-4 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-s font-bold dark:bg-zinc-800">
                <span>Author - {blogContent.author}</span>
              </button>
            </BackgroundGradient>
          </div>
        </div>
      </>
    );
  }

  // Standard carousel layout for other blogs
  return (
    <>
      {/* JSON-LD Schema for Blog Posting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema),
        }}
      />
      
      <main className="min-h-screen bg-shivansh flex items-center justify-center py-10 px-2">
        <div className="w-full max-w-xl bg-black/80 rounded-2xl shadow-2xl p-0">
          {/* Images */}
          <section className="w-full px-0 pt-0 pb-4">
            {blogContent.images.length > 1 ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {blogContent.images.map((img, idx) => (
                    <CarouselItem key={idx} className="px-0">
                      <Card className="bg-black/80 border-none shadow-lg">
                        <CardContent className="aspect-[4/3] w-full h-auto p-0 flex items-center justify-center overflow-hidden">
                          <Image
                            src={img}
                            alt={`${blogContent.title} - Image ${idx + 1}`}
                            width={800}
                            height={600}
                            className="object-cover w-full h-full rounded-t-2xl"
                            priority={idx === 0}
                          />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-white/20 border-white/30 text-white hover:bg-white/30" />
                <CarouselNext className="right-4 bg-white/20 border-white/30 text-white hover:bg-white/30" />
              </Carousel>
            ) : (
              <div className="w-full">
                <Image
                  src={blogContent.images[0]}
                  alt={blogContent.title}
                  width={800}
                  height={600}
                  className="object-cover w-full h-auto rounded-t-2xl"
                  priority
                />
              </div>
            )}
          </section>

          {/* Content */}
          <section className="px-6 pb-6">
            <div className="flex items-center justify-between text-gray-400 text-sm mb-3">
              <span>{blogContent.date}</span>
              <span>By {blogContent.author}</span>
            </div>

            <h1 className="text-white text-xl font-bold mb-4 leading-tight">
              {blogContent.title}
            </h1>

            <div className="space-y-4">
              {blogContent.captions.map((caption, idx) => (
                <p key={idx} className="text-gray-300 text-sm leading-relaxed">
                  {caption}
                </p>
              ))}
            </div>

            {blogContent.instagramPostUrl && (
              <div className="mt-6 pt-4 border-t border-gray-700">
                <a
                  href={blogContent.instagramPostUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  View on Instagram →
                </a>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
