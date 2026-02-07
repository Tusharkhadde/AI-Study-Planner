import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface TimelineItem {
  title: string;
  description: string;
  icon: string;
  content?: React.ReactNode;
}

export function Timeline({
  items,
  className,
}: {
  items: TimelineItem[];
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-transparent" />

      <div className="space-y-12">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative pl-16"
          >
            <div className="absolute left-0 top-0 w-12 h-12 rounded-full glass flex items-center justify-center text-xl border border-primary/30">
              {item.icon}
            </div>

            <div className="glass p-6 rounded-2xl">
              <span className="text-xs font-mono text-primary mb-1 block">
                Step {i + 1}
              </span>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.description}
              </p>
              {item.content}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}