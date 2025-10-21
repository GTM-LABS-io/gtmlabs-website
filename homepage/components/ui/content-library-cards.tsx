import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// --- PROPS INTERFACE ---
export interface ContentCardProps {
  icon: React.ReactNode;
  category: string;
  description: string;
  count: string;
  variant?: "blue-light" | "blue-medium" | "blue-dark" | "blue-darker";
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

// --- BORDER VARIANT STYLES ---
const variantClasses = {
  "blue-light": "border-t-blue-400",
  "blue-medium": "border-t-blue-500",
  "blue-dark": "border-t-blue-600",
  "blue-darker": "border-t-blue-700",
};

/**
 * Individual content card with 3D tilt effect
 */
const ContentCard = ({
  icon,
  category,
  description,
  count,
  variant = "blue-medium",
  className,
  style,
  onClick,
}: ContentCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left - width / 2);
    mouseY.set(e.clientY - top - height / 2);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useTransform(mouseY, [-150, 150], [8, -8]);
  const rotateY = useTransform(mouseX, [-150, 150], [-8, 8]);

  const springConfig = { stiffness: 300, damping: 20, mass: 0.5 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  return (
    <div className={className} style={style} onClick={onClick}>
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative w-full transform-gpu overflow-hidden rounded-xl bg-black/40 backdrop-blur-sm p-6 shadow-lg border border-white/10 cursor-pointer",
          "border-t-4",
          variantClasses[variant]
        )}
      >
        <div style={{ transform: "translateZ(20px)" }} className="space-y-4">
          {/* Icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
            <div className="h-6 w-6 text-blue-400">{icon}</div>
          </div>

          {/* Category */}
          <div>
            <h4 className="text-lg font-bold text-white">{category}</h4>
            <p className="text-sm text-gray-400 mt-1">{description}</p>
          </div>

          {/* Count */}
          <div className="pt-2">
            <span className="text-3xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              {count}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export const ContentLibraryCards = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const initialCards: ContentCardProps[] = [
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      category: "Video Content",
      description: "Optimized for every platform",
      count: "12 clips",
      variant: "blue-light",
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      category: "Social Content",
      description: "Posts with copy and visuals",
      count: "8 posts",
      variant: "blue-medium",
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      category: "Written Assets",
      description: "SEO blogs and newsletters",
      count: "3 pieces",
      variant: "blue-dark",
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      category: "Lead Generation",
      description: "Designed PDFs and guides",
      count: "1 magnet",
      variant: "blue-darker",
    },
  ];

  const [cards, setCards] = useState(initialCards);

  // Transform values and z-index based on hover state and viewport
  const getCardStyle = (index: number) => {
    // Mobile: always show fanned out with smaller spread
    if (isMobile) {
      const mobileTransforms = [
        { rotate: -8, translateX: -25, translateY: 8, zIndex: 0 },
        { rotate: -3, translateX: -8, translateY: 3, zIndex: 10 },
        { rotate: 0, translateX: 0, translateY: 0, zIndex: 20 },
        { rotate: 3, translateX: 8, translateY: 3, zIndex: 10 },
      ];
      const transform = mobileTransforms[index];
      return {
        transform: `rotate(${transform.rotate}deg) translateX(${transform.translateX}%) translateY(${transform.translateY}%)`,
        zIndex: transform.zIndex,
        transition: "all 0.5s ease-out",
      };
    }

    // Desktop: hover interaction
    const transforms = isHovered
      ? [
          { rotate: -6, translateX: -70, translateY: 5, zIndex: 10 },
          { rotate: -2, translateX: -23, translateY: 0, zIndex: 20 },
          { rotate: 2, translateX: 23, translateY: 0, zIndex: 20 },
          { rotate: 6, translateX: 70, translateY: 5, zIndex: 10 },
        ]
      : [
          { rotate: -8, translateX: -15, translateY: 8, zIndex: 0 },
          { rotate: -3, translateX: -5, translateY: 3, zIndex: 10 },
          { rotate: 0, translateX: 0, translateY: 0, zIndex: 20 },
          { rotate: 3, translateX: 5, translateY: 3, zIndex: 10 },
        ];

    const transform = transforms[index];
    return {
      transform: `rotate(${transform.rotate}deg) translateX(${transform.translateX}%) translateY(${transform.translateY}%)`,
      zIndex: transform.zIndex,
      transition: "all 0.5s ease-out",
    };
  };

  const handleCardClick = (index: number) => {
    // Don't reorder if clicking the center card (index 2 has highest z-index)
    if (index === 2) return;
    
    const newCards = [...cards];
    const clickedCard = newCards.splice(index, 1)[0];
    newCards.splice(2, 0, clickedCard);
    setCards(newCards);
  };

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center",
        isMobile ? "h-[400px]" : "h-[500px]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: "1000px" }}
    >
      <div className="relative h-full w-full">
        {cards.map((card, index) => (
          <ContentCard
            key={card.category}
            {...card}
            className={cn(
              "absolute left-0 right-0 top-1/4 mx-auto",
              isMobile ? "w-64" : "w-80"
            )}
            style={getCardStyle(index)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
};
