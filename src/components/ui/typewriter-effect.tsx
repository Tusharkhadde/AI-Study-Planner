import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/utils/cn";

export function TypewriterEffect({
  words,
  className,
  cursorClassName,
}: {
  words: string;
  className?: string;
  cursorClassName?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const chars = words.split("");

  return (
    <div ref={ref} className={cn("inline-flex items-center", className)}>
      <div className="overflow-hidden">
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{
              duration: 0.05,
              delay: i * 0.05,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
      <motion.span
        className={cn(
          "inline-block w-[2px] h-6 bg-primary ml-1",
          cursorClassName
        )}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </div>
  );
}