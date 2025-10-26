"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Award,
  BookOpen,
  GraduationCap,
  Briefcase,
  Lightbulb,
  Info,
  Crown,
  Building,
  Rocket,
} from "lucide-react";
import { HandWrittenTitle } from "@/components/ui/hand-writing-text";
import { FlipText } from "@/components/ui/flip-text";

interface FacultyMember {
  id: string;
  name: string;
  position: string;
  subject: string;
  photo: string;
  email: string;
  phone: string;
  office: string;
  bio: string;
  experience: string;
  education: string;
  specialization: string;
  achievements: string[];
  iconType?: "crown" | "lightbulb" | "building" | "rocket" | "book";
}

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange";
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  customSize?: boolean; // When true, ignores size prop and uses width/height or className
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
};

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
};

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = "",
  glowColor = "blue",
  size = "md",
  width,
  height,
  customSize = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null); // This ref is not used in the provided reference, but kept for consistency if needed later.

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Set card-relative position
      cardRef.current.style.setProperty("--x", x.toFixed(2));
      cardRef.current.style.setProperty("--y", y.toFixed(2));

      // Set normalized position (0-1)
      cardRef.current.style.setProperty("--xp", (x / rect.width).toFixed(2));
      cardRef.current.style.setProperty("--yp", (y / rect.height).toFixed(2));
    };

    document.addEventListener("pointermove", syncPointer);
    return () => document.removeEventListener("pointermove", syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  // Determine sizing
  const getSizeClasses = () => {
    if (customSize) {
      return ""; // Let className or inline styles handle sizing
    }
    return sizeMap[size];
  };

  const getInlineStyles = () => {
    const baseStyles: React.CSSProperties & { [key: string]: string | number } =
      {
        "--base": base,
        "--spread": spread,
        "--radius": "16",
        "--border": "2",
        "--backdrop": "transparent",
        "--backup-border": "hsl(var(--border))",
        "--size": "200",
        "--outer": "1",
        "--border-size": "calc(var(--border, 2) * 1px)",
        "--spotlight-size": "calc(var(--size, 200) * 1px)",
        "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
        backgroundImage: `radial-gradient(
          var(--spotlight-size) var(--spotlight-size) at
          calc(var(--x, 0) * 1px)
          calc(var(--y, 0) * 1px),
          hsl(var(--hue, 210) 70% 80% / 0.15), transparent 70%
        )`,
        backgroundColor: "var(--backdrop, transparent)",
        backgroundSize: "100% 100%",
        backgroundPosition: "0 0",
        backgroundAttachment: "scroll",
        border: "var(--border-size) solid var(--backup-border)",
        position: "relative",
        touchAction: "auto",
      };

    // Add width and height if provided
    if (width !== undefined) {
      baseStyles.width = typeof width === "number" ? `${width}px` : width;
    }
    if (height !== undefined) {
      baseStyles.height = typeof height === "number" ? `${height}px` : height;
    }

    return baseStyles;
  };

  const beforeAfterStyles = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: scroll;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: 0 0;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
      opacity: 0; /* Initially hidden */
      transition: opacity 0.3s ease-in-out; /* Smooth transition for opacity */
      touch-action: none; /* Prevent touch events on pseudo-elements */
    }

    [data-glow]:hover::before,
    [data-glow]:hover::after {
      opacity: 1; /* Show on hover */
    }
    
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) 60% 60% / 1), transparent 100%
      );
      filter: brightness(2); /* Enhanced border glow */
    }
    
    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(0 100% 100% / 0.8), transparent 100%
      );
      filter: brightness(1.8); /* Extra shine at borders */
    }
    
    /* The inner data-glow element from the reference is not directly used for visual effect here,
       as the existing card structure doesn't have an inner element that needs a separate glow.
       Keeping the styles for it in case future changes require it, but it's effectively inert
       without a corresponding data-glow div inside the main one. */
    [data-glow] [data-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
      touch-action: none;
    }
    
    [data-glow] > [data-glow]::before {
      inset: -10px;
      border-width: 10px;
    }

    /* Mobile-specific fixes */
    @media (max-width: 768px) {
      [data-glow] {
        touch-action: pan-y; /* Allow vertical scrolling on mobile */
      }
      
      [data-glow]::before,
      [data-glow]::after {
        display: none; /* Disable glow effects on mobile to prevent interference */
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow
        style={getInlineStyles()}
        className={`
          ${getSizeClasses()}
          rounded-2xl
          relative
          shadow-[0_0_1px_rgba(255,215,0,0.3),0_0_2px_rgba(255,215,0,0.2)]
          border border-yellow-500/20
          backdrop-blur-sm
          transition-shadow duration-300
          ${className}
        `}
      >
        {/* The inner data-glow div from the reference is omitted here as it's not needed for the existing card's structure */}
        {children}
      </div>
    </>
  );
};

interface ProfileCardProps {
  faculty: FacultyMember;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  faculty,
  className = "",
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    setShowFullBio(false); // Reset bio view when flipping
  };

  const toggleBio = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip when clicking "Read More"
    setShowFullBio(!showFullBio);
  };

  const truncatedBio =
    faculty.bio.length > 100
      ? faculty.bio.substring(0, 97) + "..."
      : faculty.bio;

  // Get appropriate icon based on custom iconType or position
  const getPositionIcon = () => {
    // Use custom icon if specified, otherwise fall back to position-based logic
    const iconType = faculty.iconType || faculty.position.toLowerCase();

    switch (iconType) {
      case "crown":
      case "director":
        return <Crown className="w-5 h-5 text-primary-foreground" />;
      case "lightbulb":
        return <Lightbulb className="w-5 h-5 text-primary-foreground" />;
      case "building":
      case "chairman":
        return <Building className="w-5 h-5 text-primary-foreground" />;
      case "rocket":
      case "founder":
        return <Rocket className="w-5 h-5 text-primary-foreground" />;
      case "book":
      default:
        return <BookOpen className="w-5 h-5 text-primary-foreground" />;
    }
  };

  return (
    <GlowCard
      className={`w-full max-w-[320px] min-w-[280px] h-[420px] cursor-pointer ${className}`}
      glowColor="blue" // You can make this configurable if needed
      customSize={true} // Indicate that width/height are handled by className
    >
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden bg-background/20 backdrop-blur-sm"
        onClick={handleCardClick}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div
              key="front"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: 90 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center"
            >
              <div className="relative mb-4">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg relative">
                  <Image
                    src={faculty.photo}
                    alt={faculty.name}
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  {getPositionIcon()}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-1">
                {faculty.name}
              </h3>

              <p className="text-base font-medium text-primary mb-1">
                {faculty.position}
              </p>

              <p className="text-sm text-muted-foreground mb-4 font-bold">
                {faculty.subject}
              </p>

              <div className="mt-auto pt-4">
                <p className="text-xs text-muted-foreground">
                  Click for more Info
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ rotateY: -90 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: -90 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-5 flex flex-col h-full"
            >
              {/* Bio section - fills available vertical space */}
              <div className="flex-1 flex flex-col justify-between">
                <p className="flex-1 text-sm text-muted-foreground text-center leading-relaxed w-full">
                  {faculty.bio}
                </p>
              </div>

              {/* Contact details section */}
              <div className="border-t border-border pt-4 mt-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-yellow-500 truncate text-sm">
                      {faculty.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-yellow-500 truncate text-sm">
                      {faculty.phone}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-yellow-500 truncate text-sm">
                      {faculty.office}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </GlowCard>
  );
};

const FacultyGrid: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if IntersectionObserver is available (client-side only)
    if (typeof window === "undefined" || !window.IntersectionObserver) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const facultyMembers: FacultyMember[] = [
    {
      id: "1",
      name: "Prof. Vineet Kansal",
      position: "Director",
      subject: "IET Lucknow",
      photo: "/mentors/vk.webp",
      email: "director@ietlucknow.ac.in",
      phone: "+91 (522) 123-4567",
      office: "Director Office, IET Lucknow",
      bio: "Director of IET Lucknow with a Ph.D. from IIT Delhi and 30+ years in academics and leadership. Former Pro-Vice Chancellor of AKTU. Expert in AI, Software Engineering, and Digital Learning. Advocate of innovation, entrepreneurship, and industry collaboration. Member of IEEE, ACM, CSI, and ISTE. Renowned for advancing digital learning and nurturing future tech leaders.",
      experience: "20+ years in academic leadership and management",
      education: "PhD in Engineering Management, IIT Delhi",
      specialization: "Institutional Leadership, Educational Innovation",
      achievements: [
        "Excellence in Leadership Award 2023",
        "Published 50+ research papers",
        "Led 100+ institutional initiatives",
      ],
    },
    {
      id: "4",
      name: "Dr. Seethalekshmi K",
      position: "Chairman",
      subject: "IIC Lucknow",
      photo: "/mentors/sl.webp",
      email: "seethalekshmi@ietlucknow.ac.in",
      phone: "+91 (522) 456-7890",
      office: "IIC Office, IET Lucknow",
      bio: "Chairman of IIC at IET Lucknow and Professor in Electrical Engineering with a Ph.D. from IIT Kanpur and 25+ years in academia. Expert in power system dynamics, control, and protection. Mentors students and startups in power and energy. Promotes creativity, collaboration, and entrepreneurship. Member of IEEE, IE, ISTE, and SESI. Known for driving innovation and nurturing future energy leaders.",
      experience: "20+ years in power systems research and teaching",
      education: "PhD in Electrical Engineering, IIT Kanpur",
      specialization: "Power System Dynamics & Control, Protection, WAMS",
      achievements: [
        "Recipient of competitive research grants in power and energy systems",
        "Senior Member, IEEE",
        "Guided multiple PG/PhD scholars and published extensively",
      ],
    },
    {
      id: "2",
      name: "Dr. Pushkar Tripathi",
      position: "Director",
      subject: "NNF",
      photo: "/mentors/pt.webp",
      email: "chairman.iic@ietlucknow.ac.in",
      phone: "+91 (522) 234-5678",
      office: "IIC Office, IET Lucknow",
      bio: "Chairman of IIC and Assistant Professor in Electrical Engineering at IET Lucknow, with a Ph.D. and M.Tech from IIT Roorkee. Research in power systems, smart grids, and machine learning. Co-founder of E-Cell and heads Navyug Navachar Foundation, fostering innovation and entrepreneurship. Actively promotes hackathons, student startups, and initiatives encouraging creativity and technology solutions.",
      experience: "15 years in innovation and incubation",
      education: "PhD in Technology Management, IIT Kanpur",
      specialization: "Innovation Management, Startup Incubation",
      achievements: [
        "Innovation Leadership Award",
        "Established 50+ startup partnerships",
        "Mentored 200+ student entrepreneurs",
      ],
      iconType: "lightbulb",
    },
    {
      id: "3",
      name: "Dr. Anurag Verma",
      position: "Founder",
      subject: "E-Cell IET Lucknow",
      photo: "/mentors/av.webp",
      email: "founder@ecellietlucknow.ac.in",
      phone: "+91 (522) 345-6789",
      office: "E-Cell Office, IET Lucknow",
      bio: "Assistant Professor in Electrical Engineering at IET Lucknow. Ph.D. in Smart Home Energy Management from Thapar Institute (2021). Research in energy forecasting, smart building systems, and sustainable technologies. Co-founder of E-Cell and supports IIC and IEEE initiatives. Mentors students and startups in energy innovation, entrepreneurship, and sustainability.",
      experience: "12 years in entrepreneurship and mentorship",
      education: "PhD in Entrepreneurship, IIM Ahmedabad",
      specialization: "Entrepreneurship Development, Student Mentorship",
      achievements: [
        "Entrepreneur of the Year Award",
        "Founded 10+ successful startups",
        "Mentored 500+ aspiring entrepreneurs",
      ],
    },
  ];

  return (
    <div
      className="min-h-screen bg-background py-16 px-4 sm:px-6 md:px-8 lg:px-12"
      ref={sectionRef}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: hsl(var(--background));
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: hsl(var(--primary) / 0.5);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: hsl(var(--primary));
          }
        `,
        }}
      />
      <div className="w-full max-w-[2000px] mx-auto">
        <div className="text-center mb-20">
          {isInView && (
            <FlipText
              className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-4"
              word="Our Mentors"
              duration={0.6}
              delayMultiple={0.1}
            />
          )}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-base md:text-lg text-black/80 dark:text-white/80"
          >
            Meet our distinguished mentors who guide and inspire the next
            generation of entrepreneurs
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-y-20 gap-x-8 sm:gap-y-24 sm:gap-x-12 md:gap-y-28 md:gap-x-16 lg:gap-y-32 lg:gap-x-20 xl:gap-y-40 xl:gap-x-24 justify-items-center items-start"
        >
          {facultyMembers.map((faculty, index) => (
            <motion.div
              key={faculty.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.2 }}
            >
              <ProfileCard faculty={faculty} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FacultyGrid;
