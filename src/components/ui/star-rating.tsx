import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/utils/cn";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: number;
}

export function StarRating({
  value,
  onChange,
  readonly = false,
  size = 24,
}: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          whileHover={readonly ? {} : { scale: 1.2 }}
          whileTap={readonly ? {} : { scale: 0.9 }}
          className={cn(
            "transition-colors duration-200",
            readonly ? "cursor-default" : "cursor-pointer"
          )}
        >
          <Star
            size={size}
            className={cn(
              "transition-all duration-200",
              star <= value
                ? "fill-yellow-400 text-yellow-400"
                : "fill-transparent text-gray-600"
            )}
          />
        </motion.button>
      ))}
    </div>
  );
}