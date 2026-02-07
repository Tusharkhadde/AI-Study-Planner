import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    rating: number;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      const speedMap = { fast: "20s", normal: "40s", slow: "60s" };
      if (containerRef.current) {
        containerRef.current.style.setProperty("--animation-duration", speedMap[speed]);
        containerRef.current.style.setProperty(
          "--animation-direction",
          direction === "left" ? "forwards" : "reverse"
        );
      }
      setStart(true);
    }
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animation: start
            ? `scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite`
            : "none",
        }}
      >
        {items.map((item, i) => (
          <li
            key={i}
            className="w-[350px] max-w-full relative flex-shrink-0 glass p-6 rounded-2xl"
          >
            <div className="flex flex-col gap-3">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, si) => (
                  <span
                    key={si}
                    className={cn(
                      "text-sm",
                      si < item.rating ? "text-yellow-400" : "text-gray-600"
                    )}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-text-secondary leading-relaxed italic">
                "{item.quote}"
              </p>
              <div className="mt-2">
                <p className="text-sm font-semibold text-text-primary">
                  {item.name}
                </p>
                <p className="text-xs text-text-secondary">{item.title}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 0.5rem)); }
        }
        .animate-scroll {
          animation: scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite;
        }
      `}</style>
    </div>
  );
}