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
      className={`w-80 h-[420px] cursor-pointer ${className}`}
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
              className="absolute inset-0 p-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    {faculty.bio}
                  </p>
                </div>

                <div className="border-t border-border pt-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                      <span className="text-yellow-500 truncate">
                        {faculty.email}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                      <span className="text-yellow-500 truncate">
                        {faculty.phone}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                      <span className="text-yellow-500 truncate">
                        {faculty.office}
                      </span>
                    </div>
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
      bio: "Prof. Vineet Kansal is the Director of IET Lucknow and a senior faculty member in Computer Science & Engineering. He holds a Ph.D. from IIT Delhi and has over 30 years of experience in academics, research, and administration. His expertise includes Artificial Intelligence, Software Engineering, and Digital Learning. He has held key positions such as Pro-Vice Chancellor of AKTU. A strong advocate for innovation and entrepreneurship, he is affiliated with professional bodies like IEEE, ACM, CSI, and ISTE.",
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
      id: "2",
      name: "Dr. Pushkar Tripathi",
      position: "Director",
      subject: "NNF",
      photo: "/mentors/pt.webp",
      email: "chairman.iic@ietlucknow.ac.in",
      phone: "+91 (522) 234-5678",
      office: "IIC Office, IET Lucknow",
      bio: "Dr. Pushkar Tripathi is Chairman of the Institution's Innovation Council and Assistant Professor in Electrical Engineering at IET Lucknow. He holds a Ph.D. and M.Tech from IIT Roorkee, and a B.Tech from IET. His research includes power system protection, FACTS, and machine learning in power systems. A startup mentor and innovation leader, he co-founded the E-Cell, heads Navyug Navachar Foundation, and actively supports student-led hackathons, workshops, and entrepreneurial initiatives.",
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
      bio: "Dr. Anurag Verma is an Assistant Professor in Electrical Engineering at IET Lucknow. He completed his Ph.D. in Smart Home Energy Management from Thapar Institute in 2021. His interests include energy forecasting, optimization, and smart building systems. A core member of IET's innovation ecosystem, he co-founded the E-Cell and actively supports IIC, accreditation efforts, and IEEE activities. He mentors students in energy innovation, sustainability, and startup incubation",
      experience: "12 years in entrepreneurship and mentorship",
      education: "PhD in Entrepreneurship, IIM Ahmedabad",
      specialization: "Entrepreneurship Development, Student Mentorship",
      achievements: [
        "Entrepreneur of the Year Award",
        "Founded 10+ successful startups",
        "Mentored 500+ aspiring entrepreneurs",
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
      bio: "Dr. Seethalekshmi K is the Chairman of the Institution's Innovation Council (IIC) at IET Lucknow and a Professor in Electrical Engineering. She holds a Ph.D. from IIT Kanpur with expertise in power system dynamics, control, protection, and wide-area measurement systems. With rich academic and research experience, she mentors students and startups in power and energy domains. She also leads innovation initiatives at the institute, fostering creativity, skill building, and collaboration.",
      experience: "20+ years in power systems research and teaching",
      education: "PhD in Electrical Engineering, IIT Kanpur",
      specialization: "Power System Dynamics & Control, Protection, WAMS",
      achievements: [
        "Recipient of competitive research grants in power and energy systems",
        "Senior Member, IEEE",
        "Guided multiple PG/PhD scholars and published extensively",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background py-16 px-2" ref={sectionRef}>
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
            className="text-xl text-black/80 dark:text-white/80"
          >
            Meet our distinguished mentors who guide and inspire the next
            generation of entrepreneurs
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-20 lg:gap-24 xl:gap-32 justify-items-center"
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
