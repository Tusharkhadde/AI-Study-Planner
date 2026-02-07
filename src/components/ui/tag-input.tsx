import { useState, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

interface TagInputProps {
  label: string;
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  placeholder?: string;
  tagColor?: string;
  maxTags?: number;
}

export function TagInput({
  label,
  tags,
  onAdd,
  onRemove,
  placeholder = "Type and press Enter",
  tagColor = "primary",
  maxTags = 10,
}: TagInputProps) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (tags.length < maxTags && !tags.includes(input.trim())) {
        onAdd(input.trim());
        setInput("");
      }
    }
    if (e.key === "Backspace" && !input && tags.length > 0) {
      onRemove(tags[tags.length - 1]);
    }
  };

  const colorMap: Record<string, string> = {
    primary: "bg-primary/20 text-primary border-primary/30",
    danger: "bg-danger/20 text-danger border-danger/30",
    warning: "bg-warning/20 text-warning border-warning/30",
    success: "bg-success/20 text-success border-success/30",
  };

  return (
    <div>
      <label className="block text-xs text-text-secondary mb-1.5 ml-1">
        {label}
      </label>
      <div className="bg-surface/80 border border-border rounded-xl p-3 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        <div className="flex flex-wrap gap-2 mb-2">
          <AnimatePresence>
            {tags.map((tag) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border",
                  colorMap[tagColor]
                )}
              >
                {tag}
                <button
                  onClick={() => onRemove(tag)}
                  className="hover:bg-white/10 rounded-full p-0.5 transition-colors"
                >
                  <X size={12} />
                </button>
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length >= maxTags ? "Max tags reached" : placeholder}
          disabled={tags.length >= maxTags}
          className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none disabled:opacity-50"
        />
      </div>
    </div>
  );
}