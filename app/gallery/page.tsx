"use client";

import * as React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/Footer";

// Gallery images data
const galleryImages = [
  "/gallery/1.webp",
  "/gallery/2.webp",
  "/gallery/3.webp",
  "/gallery/4.webp",
  "/gallery/5.webp",
  "/gallery/6.webp",
  "/gallery/7.webp",
];

// Full screen modal component
const ImageModal = ({ image, isOpen, onClose }: { 
  image: string | null; 
  isOpen: boolean; 
  onClose: () => void; 
}) => {
  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="relative max-w-[90vw] max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-10 p-2 text-white hover:text-gray-300 transition-colors"
        >
          <X className="h-8 w-8" />
        </button>
        <Image
          src={image}
          alt={`Gallery Image ${galleryImages.indexOf(image) + 1}`}
          width={1200}
          height={800}
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
          priority
        />
      </div>
    </div>
  );
};

// Masonry layout component with improved portrait image handling
const MasonryGrid = ({ images, onImageClick }: { 
  images: string[]; 
  onImageClick: (image: string) => void; 
}) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {images.map((image, index) => (
        <div 
          key={index} 
          className="break-inside-avoid mb-6"
        >
          <div 
            className="relative overflow-hidden rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => onImageClick(image)}
          >
            <Image
              src={image}
              alt={`Gallery Image ${index + 1}`}
              width={400}
              height={600}
              className="w-full h-auto object-cover"
              priority={index < 4}
              loading={index < 4 ? "eager" : "lazy"}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Close modal on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <main className="relative bg-transparent flex justify-center items-center flex-col overflow-hidden mx-auto px-3 sm:px-6 lg:px-10 min-h-screen">
      <Navbar />
      <BackgroundBeams className="z-0" />
      
      <div className="max-w-7xl w-full relative z-10 pt-32">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Gallery
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto"></div>
        </div>

        {/* Gallery Grid */}
        <div className="mb-12">
          <MasonryGrid images={galleryImages} onImageClick={handleImageClick} />
        </div>
      </div>
      
      <Footer />

      {/* Full Screen Modal */}
      <ImageModal 
        image={selectedImage} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </main>
  );
}
