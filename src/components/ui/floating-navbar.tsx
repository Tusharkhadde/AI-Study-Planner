import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { useNavigate } from "react-router-dom";

interface NavItem {
  label: string;
  href: string;
}

export function FloatingNavbar({
  items,
  className,
}: {
  items: NavItem[];
  className?: string;
}) {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, "change", (current) => {
    setVisible(current > 100);
  });

  const handleClick = (href: string) => {
    if (href.startsWith("/")) {
      navigate(href);
    } else if (href.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "fixed top-4 inset-x-0 max-w-xl mx-auto z-50",
        "glass rounded-full px-6 py-3",
        "flex items-center justify-center gap-6",
        "shadow-lg shadow-black/20",
        className
      )}
    >
      {items.map((item) => (
        <button
          key={item.label}
          onClick={() => handleClick(item.href)}
          className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 whitespace-nowrap"
        >
          {item.label}
        </button>
      ))}
    </motion.nav>
  );
}