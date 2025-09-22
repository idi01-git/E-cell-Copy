import { MetadataRoute } from "next";
import { projects } from "@/data";
import { SEO_CONSTANTS } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONSTANTS.SITE_URL;
  const buildTime = new Date();

  // Static pages with optimized priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: buildTime,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date('2024-12-01'), // Static date for gallery
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: buildTime,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Dynamic blog pages generated from data
  const blogPages: MetadataRoute.Sitemap = projects.flatMap((project) => {
    const publicationDate = new Date(project.publicationDate);
    
    return [
      // Main blog page (/blogs/1)
      {
        url: `${baseUrl}/blogs/${project.id}`,
        lastModified: publicationDate,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
      // Blog read page (/blogs/1/read)
      {
        url: `${baseUrl}/blogs/${project.id}/read`,
        lastModified: publicationDate,
        changeFrequency: "yearly" as const,
        priority: 0.5,
      },
    ];
  });

  // Combine all pages
  return [
    ...staticPages,
    ...blogPages,
  ];
}
