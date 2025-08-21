"use client"

import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules"

interface CarouselProps {
  images: { src: string; alt: string; link?: string; edition?: string }[]
  autoplayDelay?: number
  showPagination?: boolean
  showNavigation?: boolean
}

export const CardCarousel: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 1500,
  showPagination = true,
  showNavigation = true,
}) => {
  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
    padding-left: 8px;
    padding-right: 8px;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    /* height: 300px; */
    /* margin: 20px; */
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
  }
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }

  .swiper-pagination-bullet {
    background-color: rgba(255, 255, 255, 0.3) !important;
    opacity: 0.6 !important;
  }
  
  .swiper-pagination-bullet-active {
    background-color: rgba(255, 255, 255, 0.8) !important;
    opacity: 1 !important;
  }

  /* Mobile (320px - 480px) */
  @media (max-width: 480px) {
    .swiper {
      padding-left: 4px;
      padding-right: 4px;
    }
  }

  /* Small tablets (481px - 768px) */
  @media (min-width: 481px) and (max-width: 768px) {
    .swiper {
      padding-left: 16px;
      padding-right: 16px;
    }
  }

  /* Desktop (769px+) */
  @media (min-width: 769px) {
    .swiper {
      padding-left: 32px;
      padding-right: 32px;
    }
  }
  `
  return (
    <div className="w-full">
      <style>{css}</style>
      <div className="mx-auto w-full max-w-7xl rounded-[24px] border border-black/5 p-2 shadow-sm md:rounded-t-[44px]">
        <div className="relative mx-auto flex w-full flex-col rounded-[24px] border border-black/5 bg-neutral-800/5 p-2 shadow-sm md:items-start md:gap-8 md:rounded-b-[20px] md:rounded-t-[40px] md:p-2">
          <div className="flex w-full items-center justify-center gap-4">
            <div className="w-full">
              <Swiper
                spaceBetween={20}
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                }}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                initialSlide={6}
                breakpoints={{
                  320: {
                    spaceBetween: 15,
                  },
                  480: {
                    spaceBetween: 20,
                  },
                  768: {
                    spaceBetween: 25,
                  },
                  1024: {
                    spaceBetween: 30,
                  },
                }}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                pagination={showPagination}
                navigation={
                  showNavigation
                    ? {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }
                    : undefined
                }
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="size-full rounded-3xl relative group overflow-hidden">
                      <Image
                        src={image.src}
                        width={500}
                        height={500}
                        className="size-full rounded-xl transition-transform duration-500 group-hover:scale-110"
                        alt={image.alt}
                      />
                      {/* Hover Overlay - Bottom 1/3 */}
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-full group-hover:translate-y-0">
                        <div className="flex flex-col justify-end h-full p-4">
                          <div className="flex items-center justify-between mb-2">
                            {image.edition && (
                              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                                {image.edition}
                              </span>
                            )}
                          </div>
                          <div className="text-white">
                            {image.link && (
                              <Button
                                asChild
                                variant="secondary"
                                size="sm"
                                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 transition-all duration-300"
                              >
                                <a href={image.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                  Read More
                                  <ArrowRight className="w-4 h-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 