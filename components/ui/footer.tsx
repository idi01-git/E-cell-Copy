"use client";

import Link from 'next/link'
import { navItems } from '@/data';
import Image from 'next/image';
import { useState } from 'react';

// Import icons from lucide-react for social media
import {
    Linkedin,
    Twitter,
    Instagram,
} from 'lucide-react'

// Use the navigation items from your data
const links = navItems.map(item => ({
    title: item.name,
    href: item.link,
}));

export default function FooterSection() {
    const [showEasterEgg, setShowEasterEgg] = useState(false);

    return (
      <footer className="py-16 md:py-13">
        <div className="mx-auto max-w-5xl px-6">
          <Link
            href="/"
            aria-label="go home"
            className="mx-auto block size-fit"
          >
            <Image
              src="/ecell-logo.png"
              alt="E-Cell Logo"
              width={40}
              height={40}
              className="mx-auto"
            />
          </Link>

          <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-muted-foreground hover:text-primary block duration-150"
              >
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
          <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
            {/* Social media links with lucide-react icons */}
            <Link
              href="https://in.linkedin.com/company/ecell-ietlucknow"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary block"
            >
              <Linkedin className="size-6" />
            </Link>
            <Link
              href="https://x.com/ecell_ietlko?lang=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              className="text-muted-foreground hover:text-primary block"
            >
              <Twitter className="size-6" />
            </Link>
            <Link
              href="https://www.instagram.com/ecell_iet_lko/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-primary block"
            >
              <Instagram className="size-6" />
            </Link>
          </div>
          <span className="text-muted-foreground block text-center text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
              E-Cell IET Lucknow
            </span>
            , All rights reserved. Designed & Developed by{" "}
            <Link
              href="https://www.instagram.com/hated_shivang/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-300"
            >
              Shivang
            </Link>{" "}
            with{" "}
            <button
              onClick={() => setShowEasterEgg(true)}
              className="text-red-500 hover:text-red-400 transition-colors duration-200 cursor-pointer text-base"
              aria-label="Easter egg"
            >
              ❤️
            </button>
            .
          </span>

          {/* Easter Egg Modal */}
          {showEasterEgg && (
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] animate-in fade-in duration-300"
              onClick={() => setShowEasterEgg(false)}
            >
              <div
                className="bg-gradient-to-br from-white via-pink-50 to-red-50 rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl border border-pink-200 animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-6">
                  <div className="text-6xl mb-4 animate-pulse">🎉</div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
                    Easter Egg
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mx-auto"></div>
                </div>

                <div className="mb-6">
                  <p className="text-2xl font-semibold text-gray-800 mb-2">
                    01001100 01101111 01110110 01100101 00100000 00111101
                    00100000 01001000 01110101 01110011 01101000
                  </p>
                  <div className="flex justify-center items-center gap-2 text-red-500">
                    <span className="text-xl animate-bounce">❤️</span>
                    <span
                      className="text-xl animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    >
                      ❤️
                    </span>
                    <span
                      className="text-xl animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    >
                      ❤️
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowEasterEgg(false)}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </footer>
    );
}

