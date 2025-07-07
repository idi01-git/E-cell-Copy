"use client";
import { useState, useEffect, useRef } from "react";
import { Brain, Eye, Heart, Building, Link } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Anton } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"] });

// Add CSS for wave pulse animation and central object effects
const waveStyles = `
    @keyframes wave-pulse {
    0% {
      transform: scale(1);
      opacity: 0.6;
    }
    50% {
      transform: scale(4);
      opacity: 0.3;
    }
    100% {
      transform: scale(12);
      opacity: 0;
    }
  }
  
  .animate-wave-pulse {
    animation: wave-pulse 3s ease-out infinite;
  }
  
  .animate-wave-pulse-delay-1 {
    animation: wave-pulse 3s ease-out infinite;
    animation-delay: 1s;
  }
  
  .animate-wave-pulse-delay-2 {
    animation: wave-pulse 3s ease-out infinite;
    animation-delay: 2s;
  }
  
    @keyframes central-pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 
        0 0 30px rgba(168, 85, 247, 0.8), 
        0 0 60px rgba(59, 130, 246, 0.7), 
        0 0 90px rgba(20, 184, 166, 0.6),
        0 0 120px rgba(168, 85, 247, 0.5);
    }
    50% {
      transform: scale(1.2);
      box-shadow: 
        0 0 60px rgba(168, 85, 247, 1.0), 
        0 0 120px rgba(59, 130, 246, 0.9), 
        0 0 180px rgba(20, 184, 166, 0.8),
        0 0 240px rgba(168, 85, 247, 0.6);
    }
  }
  
  .animate-central-pulse {
    animation: central-pulse 3s ease-in-out infinite;
  }
`;

interface TimelineItem {
  id: number;
  title: string;
  heading: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalFeatureSectionProps {
  timelineData?: TimelineItem[];
}

const defaultTimelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Mindset",
    heading: "Entrepreneurial Mindset",
    content:
      "E-Cells cultivate an entrepreneurial mindset by promoting creativity, risk-taking, and leadership. Workshops and interactive sessions expose students to real-world challenges, helping them build the confidence and skills needed to take initiative and innovate.",
    category: "Mindset",
    icon: Brain,
    relatedIds: [2, 5],
    status: "in-progress",
    energy: 100,
  },
  {
    id: 2,
    title: "Exposure",
    heading: "Practical Exposure",
    content:
      "Through case studies, brainstorming, and leadership activities, students gain practical insights into business problem-solving. This real-world exposure prepares them to tackle entrepreneurial challenges with critical thinking and strategic decision-making.",
    category: "Exposure",
    icon: Eye,
    relatedIds: [1, 3],
    status: "in-progress",
    energy: 90,
  },
  {
    id: 3,
    title: "Support",
    heading: "Startup Support",
    content:
      "E-Cells offer mentorship, funding guidance, and incubation access to help students build startups. They assist in idea validation, prototyping, legal compliance, and business setup, ensuring ventures start with a strong foundation.",
    category: "Support",
    icon: Heart,
    relatedIds: [2, 4],
    status: "in-progress",
    energy: 85,
  },
  {
    id: 4,
    title: "Ecosystem",
    heading: "Ecosystem Building",
    content:
      "E-Cells foster a thriving startup culture by connecting with industries, alumni, and investors. Events like pitch competitions and hackathons give students platforms to showcase ideas and receive feedback, funding, and networking support.",
    category: "Ecosystem",
    icon: Building,
    relatedIds: [3, 5],
    status: "in-progress",
    energy: 80,
  },
  {
    id: 5,
    title: "Linkages",
    heading: "Industry Linkages",
    content:
      "By facilitating internships, corporate partnerships, and expert mentorship, E-Cells create strong ties between students and the entrepreneurial world. These connections provide practical exposure, resources, and opportunities essential for entrepreneurial growth.",
    category: "Linkages",
    icon: Link,
    relatedIds: [1, 4],
    status: "in-progress",
    energy: 75,
  },
];

export default function RadialOrbitalFeatureSection({
  timelineData = defaultTimelineData,
}: RadialOrbitalFeatureSectionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [hiddenTitles, setHiddenTitles] = useState<Record<number, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
      setHiddenTitles({});
    } else {
      setTimeout(() => {
        if (Object.keys(expandedItems).length === 0) {
          setAutoRotate(true);
        }
      }, 0);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        setHiddenTitles({ [id]: true });

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
        setHiddenTitles({});
      }

      return newState;
    });
  };

  useEffect(() => {
    setIsMounted(true);
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 40);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const isPulsingNode = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId) && pulseEffect[itemId];
  };

  if (!isMounted) return null;

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden relative"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {/* Add wave pulse styles */}
      <style jsx>{waveStyles}</style>

      {/* Background Text */}
      <div
        className={`pointer-events-none whitespace-pre-wrap text-center text-[10rem] font-semibold leading-none absolute z-0 opacity-20 text-white tracking-wider ${anton.className}`}
        style={{ fontFamily: "var(--font-anton), sans-serif" }}
      >
        Our Goals
      </div>

      <div className="relative w-full max-w-4xl h-full flex items-center justify-center z-10">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Central Orb: with wave effect and custom orb-pulse animation */}
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-orb-pulse flex items-center justify-center z-10">
            <div className="absolute w-20 h-20 rounded-full border border-white/20 animate-ping opacity-70"></div>
            <div
              className="absolute w-24 h-24 rounded-full border border-white/10 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md" />
          </div>

          <div className="absolute w-96 h-96 rounded-full border border-white/10"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = isPulsingNode(item.id);
            const isTitleHidden = hiddenTitles[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Golden Glow Effect for Nodes (more subtle and thin) */}
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isExpanded
                      ? "animate-orb-pulse rounded-full shadow-[0_0_24px_8px_rgba(255,215,0,0.18),0_0_48px_16px_rgba(255,215,0,0.10)]"
                      : "animate-pulse shadow-[0_0_16px_4px_rgba(139,92,246,0.15),0_0_32px_8px_rgba(20,184,166,0.10)] rounded-full transition-all duration-300"
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(255, 215, 0, 0.05) 0%, rgba(255, 215, 0, 0.02) 50%, transparent 70%)`,
                    width: `${item.energy * 0.3 + 30}px`,
                    height: `${item.energy * 0.3 + 30}px`,
                    left: `-${(item.energy * 0.3 + 30 - 40) / 2}px`,
                    top: `-${(item.energy * 0.3 + 30 - 40) / 2}px`,
                    boxShadow:
                      isExpanded || isRelated
                        ? "0 0 6px rgba(255, 215, 0, 0.2), 0 0 12px rgba(255, 215, 0, 0.1)"
                        : "none",
                  }}
                ></div>

                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center relative
                  ${
                    isExpanded
                      ? "bg-white text-black"
                      : isRelated
                      ? "bg-white/50 text-black"
                      : "bg-black text-white"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-white"
                      : isRelated
                      ? "border-white"
                      : "border-white/40"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                `}
                  style={{
                    boxShadow:
                      isExpanded || isRelated
                        ? "0 0 8px rgba(255, 215, 0, 0.3), 0 0 16px rgba(255, 215, 0, 0.15)"
                        : "0 0 4px rgba(255, 215, 0, 0.1)",
                    zIndex: 1000, // Ensure logos appear above orbit lines
                  }}
                >
                  <Icon size={16} />
                </div>

                <div
                  className={`
                  absolute top-12 whitespace-nowrap
                  text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "scale-125" : ""}
                  ${isTitleHidden ? "opacity-0" : "opacity-70"}
                `}
                  style={{
                    color: "white",
                    textShadow:
                      isExpanded || isRelated
                        ? "0 0 6px rgba(255, 215, 0, 0.4)"
                        : "0 0 3px rgba(255, 215, 0, 0.2)",
                    zIndex: 1001, // Ensure text appears above orbit lines
                  }}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-[260px] min-h-[253px] bg-black/90 backdrop-blur-lg border-white/30 shadow-xl shadow-white/10 overflow-visible">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50"></div>
                    <div className="p-4 pb-2">
                      <div className="flex justify-between items-center">
                        <span className="px-2 py-1 text-xs text-black bg-white border border-black rounded">
                          {item.title}
                        </span>
                      </div>
                      <h3 className="text-sm mt-2 text-white font-semibold">
                        {item.heading}
                      </h3>
                    </div>
                    <CardContent
                      className="text-sm text-white/80"
                      style={{
                        textShadow:
                          "0 0 16px rgba(139,92,246,0.5), 0 0 32px rgba(20,184,166,0.35)",
                      }}
                    >
                      <p>{item.content}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
