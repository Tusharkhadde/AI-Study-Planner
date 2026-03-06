import React, { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface FloatingPathProps {
    position: number;
}

function FloatingPath({ position }: FloatingPathProps) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M${-380 + i * 5 * position} ${-189 + i * 33.5}C${-380 + i * 5 * position} ${-189 + i * 33.5} ${-312 + i * 6 * position} ${216 - i * 12} ${152 + i * 7 * position} ${343 - i * 5}`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <motion.svg
            viewBox="0 0 696 316"
            fill="none"
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        >
            <title>Background Paths</title>
            {paths.map((path) => (
                <motion.path
                    key={path.id}
                    d={path.d}
                    stroke={`url(#gradient-${position > 0 ? "left" : "right"}-${path.id})`}
                    strokeWidth={path.width}
                    strokeOpacity={0.1 + path.id * 0.015}
                    initial={{ pathLength: 0 }}
                    animate={{
                        pathLength: 1,
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        pathLength: {
                            type: "spring",
                            duration: 3 + Math.random() * 4,
                            bounce: 0,
                            delay: path.id * 0.05,
                        },
                        opacity: {
                            duration: 4 + Math.random() * 3,
                            repeat: Infinity,
                            delay: path.id * 0.1,
                        },
                    }}
                />
            ))}
            <defs>
                {paths.map((path) => (
                    <linearGradient
                        key={`g-${path.id}`}
                        id={`gradient-${position > 0 ? "left" : "right"}-${path.id}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop stopColor="#7c3aed" stopOpacity="0.6" />
                        <stop offset="1" stopColor="#4f46e5" stopOpacity="0.2" />
                    </linearGradient>
                ))}
            </defs>
        </motion.svg>
    );
}

interface BackgroundPathsProps {
    className?: string;
    children?: React.ReactNode;
    title?: string;
}

export function BackgroundPaths({
    className,
    children,
    title,
}: BackgroundPathsProps) {
    const id = useId();
    return (
        <div className={cn("relative min-h-screen w-full overflow-hidden bg-[#030014]", className)}>
            {/* Gradient orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />

            <div className="absolute inset-0">
                <FloatingPath position={1} />
                <FloatingPath position={-1} />
            </div>

            {children && (
                <div className="relative z-10">{children}</div>
            )}

            {title && (
                <div className="relative z-10 flex items-center justify-center min-h-screen">
                    <div className="max-w-4xl mx-auto text-center px-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 2 }}
                        >
                            <h1 className="text-5xl sm:text-7xl font-bold mb-8 tracking-tight">
                                {title.split("").map((char, index) => (
                                    <motion.span
                                        key={`${id}-${index}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.2,
                                            delay: index * 0.03,
                                            ease: "easeOut",
                                        }}
                                        className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-indigo-300"
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                            </h1>
                        </motion.div>
                    </div>
                </div>
            )}
        </div>
    );
}
