"use client";
import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import { Card, CardContent } from "../../../components/ui/card";

// --- Easily editable blog post content ---
const title = "The Future of Entrepreneurship";
const date = "January 15, 2025";
const author = "Shivansh Kaushik";
const captions = [
  "As we step into 2025, the entrepreneurial landscape is undergoing unprecedented transformation. The convergence of artificial intelligence, sustainable technologies, and global connectivity is creating new opportunities for innovative thinkers and bold visionaries.",
  "Key trends shaping the future include the rise of AI-powered business solutions, the growing emphasis on sustainability and social impact, and the democratization of entrepreneurship through digital platforms.",
  "Entrepreneurs who adapt to these changes and leverage emerging technologies will be well-positioned for success in the coming years.",
];
const images = ["/news.jpg", "/goal.png", "/services.png"];
const instagramPostUrl = "https://www.instagram.com/p/your-post-id/";
// ----------------------------------------

export default function BlogPostPage() {
  return (
    <main className="min-h-screen bg-shivansh flex items-center justify-center py-10 px-2">
      <div className="w-full max-w-xl bg-black/80 rounded-2xl shadow-2xl p-0">
        {/* Images */}
        <section className="w-full px-0 pt-0 pb-4">
          {images.length > 1 ? (
            <Carousel className="w-full">
              <CarouselContent>
                {images.map((img, idx) => (
                  <CarouselItem key={idx} className="px-0">
                    <Card className="bg-black/80 border-none shadow-lg">
                      <CardContent className="aspect-[4/3] w-full h-auto p-0 flex items-center justify-center overflow-hidden">
                        <Image
                          src={img}
                          alt={`Blog image ${idx + 1}`}
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
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            <div className="aspect-[4/3] w-full h-auto flex items-center justify-center overflow-hidden rounded-t-2xl">
              <Image
                src={images[0]}
                alt="Blog image"
                width={800}
                height={600}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          )}
        </section>
        {/* Content */}
        <section className="px-6 py-6 flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold text-white font-playfair leading-tight mb-1">
            {title}
          </h1>
          <div className="text-sm text-neutral-400 mb-1">{date}</div>
          <div className="text-sm text-neutral-300 mb-2">By {author}</div>
          <div className="flex flex-col gap-3 text-base text-neutral-100 font-playfair mb-4">
            {captions.map((cap, i) => (
              <p key={i}>{cap}</p>
            ))}
          </div>
          <a
            href={instagramPostUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold shadow hover:brightness-110 transition text-center"
          >
            Go to post
          </a>
        </section>
      </div>
    </main>
  );
}
