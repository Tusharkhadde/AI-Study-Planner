import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className, ...props }, ref) => {
    return (
      <div className="relative">
        <label className="block text-xs text-text-secondary mb-1.5 ml-1">
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full bg-surface/80 border border-border rounded-xl px-4 py-3 text-text-primary text-sm",
              "appearance-none cursor-pointer transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50",
              error && "border-danger/50",
              className
            )}
            {...props}
          >
            <option value="" disabled>
              Select {label}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
          />
        </div>
        {error && (
          <p className="text-xs text-danger mt-1 ml-1">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";