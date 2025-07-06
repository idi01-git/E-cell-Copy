"use client";

import { ArrowRight } from "lucide-react";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { UseEmblaCarouselType } from "embla-carousel-react";
import { projects } from "@/data";
import dynamic from "next/dynamic";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
const BlurFade = dynamic(
  () => import("@/components/ui/blur-fade").then((mod) => mod.BlurFade),
  { ssr: false }
);

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

const BlogCarousel = () => {
  const [api, setApi] = React.useState<UseEmblaCarouselType[1]>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    onSelect();
  }, [api]);

  return (
    <section className="w-full flex flex-col items-center py-16 sm:py-24 lg:py-32 bg-background">
      <div className="w-full flex flex-col items-center gap-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-6">
            Latest Updates
          </Badge>
          <BlurFade delay={0.25} inView>
            <h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
              The Entrepreneurial Times
            </h2>
          </BlurFade>
          <BlurFade delay={0.5} inView>
            <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
              Take a look at the monthly newsletter of E-Cell IET Lucknow for
              the updates regarding the entrepreneurial world
            </p>
          </BlurFade>
          <BlurFade delay={0.75} inView>
            <InteractiveHoverButton text="Read More" />
          </BlurFade>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: false,
            skipSnaps: false,
            dragFree: false,
          }}
          className="w-full"
          setApi={setApi}
          onMouseDown={(e) => e.preventDefault()}
          onTouchStart={(e) => e.preventDefault()}
          onWheel={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
        >
          <CarouselContent
            className="py-4"
            onWheelCapture={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {projects.map((item, index) => (
              <CarouselItem
                key={item.id}
                className={cn(
                  "px-2 md:basis-1/2 lg:basis-1/3 transition-transform duration-300",
                  selectedIndex === index ? "scale-105 z-10" : "scale-100"
                )}
              >
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="aspect-[4/3] w-full h-auto p-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="object-cover w-full h-full rounded-xl shadow-lg"
                    />
                  </div>
                  <div className="w-full bg-transparent p-3 sm:p-4 flex flex-col items-start">
                    <div className="w-full flex justify-between items-center mb-2">
                      <span className="text-xs text-muted-foreground">
                        {item.publicationDate}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold hover:underline md:text-xl mb-2">
                      <a href={item.link}>{item.title}</a>
                    </h3>
                    <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                      {item.des}
                    </p>
                    <a
                      href={item.link}
                      className="flex items-center text-foreground hover:underline font-medium text-sm sm:text-base"
                    >
                      Read more
                      <ArrowRight className="ml-2 size-4" />
                    </a>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default BlogCarousel;
