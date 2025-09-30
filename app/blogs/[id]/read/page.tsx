
import * as React from "react";
import Image from "next/image";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Navbar from "@/components/ui/Navbar";
import FooterSection from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { 
  getBlogSEOData, 
  generateArticleSchema, 
  generateCanonicalUrl,
  SEO_CONSTANTS 
} from "@/lib/seo";

// Blog read page content data mapping
const blogReadContentMap: Record<number, {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  author: string;
  link: string;
  category: string;
  content: Array<{
    type: "paragraph" | "heading";
    text: string;
  }>;
  galleryImages: string[];
}> = {
  1: {
    id: 1,
    title: "Scaling Your Business: From Startup to Enterprise",
    description: "Learn the critical strategies and frameworks needed to scale your startup from a small team to a thriving enterprise.",
    image: "/news/7.webp",
    date: "December 10, 2024",
    author: "Shivang",
    link: "https://medium.com/@ecell-iet-lucknow/scaling-your-business-from-startup-to-enterprise",
    category: "Business Strategy",
    content: [
      {
        type: "paragraph",
        text: "The landscape of personal computing is on the cusp of a dramatic transformation. As we venture further into the 21st century, the devices we rely on daily are evolving at an unprecedented pace. This article delves into the next generation of personal computing, exploring the innovative technologies and trends that are set to redefine how we interact with our digital world."
      },
      {
        type: "heading",
        text: "Emerging Technologies"
      },
      {
        type: "paragraph",
        text: "The pace of technological innovation continues to accelerate, creating unprecedented opportunities for entrepreneurs to disrupt traditional industries and create new markets. From artificial intelligence and machine learning to blockchain, quantum computing, and renewable energy technologies, the landscape is ripe with possibilities."
      },
      {
        type: "paragraph",
        text: "Entrepreneurs who can identify the right technology at the right time can build transformative businesses. The key is to stay ahead of the curve and understand how emerging technologies can be applied to solve real-world problems."
      },
      {
        type: "heading",
        text: "Trends Shaping the Future"
      },
      {
        type: "paragraph",
        text: "Behind every successful startup lies a story of perseverance, innovation, and valuable lessons learned. These stories inspire and guide aspiring entrepreneurs on their own journey to success. From Airbnb's journey from selling cereal to becoming a global hospitality giant, to Slack's pivot from a gaming company to a communication platform, these success stories teach us that adaptability and customer focus are key to building sustainable businesses."
      },
      {
        type: "paragraph",
        text: "The future of entrepreneurship is not just about having a great idea—it's about execution, resilience, and the ability to adapt to changing market conditions. Success comes from understanding your customers deeply, building strong teams, and creating value that people are willing to pay for."
      }
    ],
    galleryImages: [
      "/news/1.webp",
      "/news/7.webp", 
      "/news/6.webp",
      "/news/5.webp"
    ]
  },
  2: {
    id: 2,
    title: "Building Sustainable Startups for the Future",
    description: "Discover how to integrate sustainability into your startup's DNA and create long-term value for all stakeholders.",
    image: "/news/2.webp",
    date: "January 10, 2025",
    author: "Priya Sharma",
    link: "https://medium.com/@ecell-iet-lucknow/building-sustainable-startups",
    category: "Sustainability",
    content: [
      {
        type: "paragraph",
        text: "Sustainability is no longer just a buzzword—it's a business imperative that's reshaping how we think about entrepreneurship. Modern startups that integrate environmental and social responsibility into their core business models are not only making a positive impact but also seeing unprecedented success in the marketplace."
      },
      {
        type: "heading",
        text: "The Business Case for Sustainability"
      },
      {
        type: "paragraph",
        text: "From circular economy principles to renewable energy solutions, sustainable startups are attracting both customers and investors who prioritize long-term value creation. The data is clear: companies with strong ESG (Environmental, Social, and Governance) practices outperform their peers in both financial returns and risk management."
      },
      {
        type: "paragraph",
        text: "The key to building a sustainable startup lies in understanding that profitability and purpose can coexist harmoniously. By addressing environmental challenges and social needs, entrepreneurs can tap into growing markets while creating meaningful impact."
      },
      {
        type: "heading",
        text: "Implementation Strategies"
      },
      {
        type: "paragraph",
        text: "Successful sustainable startups start with a clear mission that goes beyond profit. They build sustainability into their operations, supply chains, and product development from day one. This approach not only reduces environmental impact but also creates competitive advantages through innovation and efficiency."
      }
    ],
    galleryImages: [
      "/news/2.webp",
      "/news/3.webp", 
      "/news/4.webp",
      "/news/1.webp"
    ]
  },
  3: {
    id: 3,
    title: "Digital Marketing Mastery for Modern Startups",
    description: "Master the essential digital marketing strategies that can accelerate your startup's growth and customer acquisition.",
    image: "/news/3.webp",
    date: "January 5, 2025",
    author: "Rahul Verma",
    link: "https://medium.com/@ecell-iet-lucknow/digital-marketing-for-startups",
    category: "Marketing",
    content: [
      {
        type: "paragraph",
        text: "In today's digital-first world, effective marketing can make or break a startup. Understanding the nuances of digital marketing is crucial for entrepreneurs looking to scale their businesses and reach their target audience effectively."
      },
      {
        type: "heading",
        text: "Multi-Channel Approach"
      },
      {
        type: "paragraph",
        text: "From social media strategies to content marketing and SEO, startups need to master multiple channels to reach their target audience effectively. The key is not to be everywhere, but to be where your customers are, with the right message at the right time."
      },
      {
        type: "paragraph",
        text: "The most successful startups are those that can tell compelling stories while delivering measurable results through data-driven marketing approaches. This means combining creativity with analytics to optimize every aspect of your marketing funnel."
      },
      {
        type: "heading",
        text: "Building Brand Authority"
      },
      {
        type: "paragraph",
        text: "Digital marketing is not just about driving traffic—it's about building trust, authority, and long-term relationships with your audience. Content marketing, thought leadership, and community building are essential components of a comprehensive digital strategy."
      }
    ],
    galleryImages: [
      "/news/3.webp",
      "/news/4.webp", 
      "/news/5.webp",
      "/news/2.webp"
    ]
  },
  4: {
    id: 4,
    title: "Funding Your Startup: A Comprehensive Guide",
    description: "Navigate the complex world of startup funding with expert insights on raising capital and building investor relationships.",
    image: "/news/4.webp",
    date: "December 30, 2024",
    author: "Ankit Gupta",
    link: "https://medium.com/@ecell-iet-lucknow/funding-your-startup-journey",
    category: "Funding",
    content: [
      {
        type: "paragraph",
        text: "Securing funding is one of the most critical challenges facing early-stage entrepreneurs. Understanding the various funding options and preparing effectively can significantly improve your chances of success and help you build a sustainable business."
      },
      {
        type: "heading",
        text: "Funding Landscape"
      },
      {
        type: "paragraph",
        text: "From bootstrapping and angel investors to venture capital and crowdfunding, each funding source has its own advantages and requirements. The key is understanding which type of funding aligns with your business model, growth stage, and long-term vision."
      },
      {
        type: "paragraph",
        text: "The key is to match your startup's stage, industry, and growth potential with the right type of funding and investors who align with your vision. This strategic approach to fundraising can provide not just capital, but also valuable expertise and networks."
      },
      {
        type: "heading",
        text: "Investor Relations"
      },
      {
        type: "paragraph",
        text: "Building strong relationships with investors goes beyond just securing funding. The right investors become partners in your journey, providing mentorship, industry connections, and strategic guidance that can be invaluable for long-term success."
      }
    ],
    galleryImages: [
      "/news/4.webp",
      "/news/5.webp", 
      "/news/6.webp",
      "/news/3.webp"
    ]
  },
  5: {
    id: 5,
    title: "Innovation in Technology Startups",
    description: "Explore how cutting-edge technologies are driving innovation and creating new opportunities for tech entrepreneurs.",
    image: "/news/5.webp",
    date: "December 25, 2024",
    author: "Neha Patel",
    link: "https://medium.com/@ecell-iet-lucknow/innovation-in-technology-startups",
    category: "Technology",
    content: [
      {
        type: "paragraph",
        text: "Technology startups are at the forefront of innovation, driving change across industries and creating new possibilities for human progress. The rapid pace of technological advancement presents both opportunities and challenges for entrepreneurs."
      },
      {
        type: "heading",
        text: "Emerging Technologies"
      },
      {
        type: "paragraph",
        text: "From artificial intelligence and machine learning to blockchain and IoT, technology entrepreneurs are leveraging cutting-edge tools to solve complex problems. The key is identifying which technologies can create genuine value for users and businesses."
      },
      {
        type: "paragraph",
        text: "Success in tech entrepreneurship requires not just technical expertise, but also a deep understanding of market needs and user experience. The most successful tech startups combine technical innovation with strong business fundamentals."
      },
      {
        type: "heading",
        text: "Future Outlook"
      },
      {
        type: "paragraph",
        text: "The future of technology entrepreneurship lies in solving real-world problems with innovative solutions. Whether it's healthcare, education, sustainability, or productivity, technology startups have the potential to create transformative impact."
      }
    ],
    galleryImages: [
      "/news/5.webp",
      "/news/6.webp", 
      "/news/7.webp",
      "/news/4.webp"
    ]
  },
  6: {
    id: 6,
    title: "Building High-Performance Startup Teams",
    description: "Learn the essential strategies for recruiting, managing, and retaining top talent in your startup journey.",
    image: "/news/6.webp",
    date: "December 20, 2024",
    author: "Vikash Kumar",
    link: "https://medium.com/@ecell-iet-lucknow/building-strong-teams",
    category: "Team Building",
    content: [
      {
        type: "paragraph",
        text: "Behind every successful startup is a strong, cohesive team. Building and maintaining high-performing teams is one of the most important skills for any entrepreneur, yet it's often one of the most challenging aspects of startup leadership."
      },
      {
        type: "heading",
        text: "Hiring Excellence"
      },
      {
        type: "paragraph",
        text: "From hiring the right talent to creating a positive company culture, team building requires intentional effort and strategic thinking. The best startups don't just hire for skills—they hire for cultural fit and shared vision."
      },
      {
        type: "paragraph",
        text: "The best startup teams combine diverse skills, shared vision, and unwavering commitment to achieving common goals. This requires creating an environment where different perspectives are valued and everyone feels empowered to contribute."
      },
      {
        type: "heading",
        text: "Culture and Retention"
      },
      {
        type: "paragraph",
        text: "Building a strong team culture is essential for startup success. This means creating clear values, fostering open communication, and providing opportunities for growth and development. Happy teams are productive teams."
      }
    ],
    galleryImages: [
      "/news/6.webp",
      "/news/7.webp", 
      "/news/1.webp",
      "/news/5.webp"
    ]
  },
  7: {
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
  },
  8: {
    id: 8,
    title: "Scaling Your Business Operations Effectively",
    description: "Master the art of scaling your business operations while maintaining quality and customer satisfaction.",
    image: "/news/7.webp",
    date: "December 10, 2024",
    author: "Arjun Singh",
    link: "https://medium.com/@ecell-iet-lucknow/scaling-business-operations",
    category: "Operations",
    content: [
      {
        type: "paragraph",
        text: "Scaling a business requires more than just increasing revenue—it demands systematic improvements in operations, processes, and team capabilities. Many startups struggle with this transition from small team to larger organization."
      },
      {
        type: "heading",
        text: "Operational Excellence"
      },
      {
        type: "paragraph",
        text: "Successful scaling involves building robust systems that can handle growth while maintaining quality and customer satisfaction. This requires investing in the right tools, processes, and people before you actually need them."
      },
      {
        type: "paragraph",
        text: "The key is to scale strategically, focusing on sustainable growth rather than rapid expansion that could compromise your business foundation. This means building scalable systems and maintaining your core values as you grow."
      },
      {
        type: "heading",
        text: "Strategic Growth"
      },
      {
        type: "paragraph",
        text: "Effective scaling requires careful planning, strong leadership, and the ability to maintain company culture while growing. The most successful companies are those that can scale their operations without losing the entrepreneurial spirit that made them successful."
      }
    ],
    galleryImages: [
      "/news/7.webp",
      "/news/1.webp", 
      "/news/2.webp",
      "/news/6.webp"
    ]
  },
  9: {
    id: 9,
    title: "Customer-Centric Business Models",
    description: "Learn how to build business models that prioritize customer needs and create sustainable competitive advantages.",
    image: "/news/2.webp",
    date: "December 5, 2024",
    author: "Sneha Reddy",
    link: "https://medium.com/@ecell-iet-lucknow/customer-centric-business-models",
    category: "Customer Experience",
    content: [
      {
        type: "paragraph",
        text: "In today's competitive landscape, businesses that prioritize customer needs and experiences are the ones that thrive and grow sustainably. Customer-centricity is not just a strategy—it's a fundamental approach to building lasting businesses."
      },
      {
        type: "heading",
        text: "Understanding Your Customers"
      },
      {
        type: "paragraph",
        text: "Customer-centric approaches involve understanding your audience deeply, anticipating their needs, and delivering value that exceeds expectations. This requires continuous research, feedback collection, and adaptation based on customer insights."
      },
      {
        type: "paragraph",
        text: "Building a customer-centric business model requires continuous feedback, iteration, and a genuine commitment to solving customer problems. The most successful companies are those that can turn customer feedback into actionable improvements."
      },
      {
        type: "heading",
        text: "Long-term Value Creation"
      },
      {
        type: "paragraph",
        text: "Customer-centric businesses focus on lifetime value rather than short-term transactions. This approach leads to higher customer satisfaction, increased loyalty, and sustainable growth through word-of-mouth and referrals."
      }
    ],
    galleryImages: [
      "/news/2.webp",
      "/news/3.webp", 
      "/news/4.webp",
      "/news/7.webp"
    ]
  }
};

// Shared helper to parse and validate blog ID
function parseBlogId(id: string): number | null {
  const parsed = parseInt(id, 10);
  if (Number.isNaN(parsed) || !Number.isFinite(parsed)) {
    return null;
  }
  return parsed;
}

interface BlogReadPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for this blog read page
export async function generateMetadata({ params }: BlogReadPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const blogId = parseBlogId(resolvedParams.id);
  
  if (blogId === null) {
    notFound();
  }
  
  const blogSEOData = getBlogSEOData(blogId);
  
  if (!blogSEOData) {
    notFound();
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

export default async function BlogReadPage({ params }: BlogReadPageProps) {
  const resolvedParams = await params;
  const blogId = parseBlogId(resolvedParams.id);
  
  if (blogId === null) {
    notFound();
  }
  
  const blogSEOData = getBlogSEOData(blogId);
  const blogContent = blogReadContentMap[blogId];
  
  if (!blogSEOData || !blogContent) {
    notFound();
  }

  const articleSchema = generateArticleSchema(blogSEOData);

  return (
    <>
      {/* JSON-LD Schema for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      
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
            <span className="text-white/60">{blogContent.category}</span>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center leading-tight">
            {blogContent.title}
          </h1>

          {/* Author and Date */}
          <div className="text-center mb-10">
            <p className="text-white/70 text-sm">
              By {blogContent.author} • Published on {blogContent.date}
            </p>
          </div>

          {/* Article Content */}
          <article className="prose prose-invert max-w-none">
            {blogContent.content.map((section, index) => (
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
