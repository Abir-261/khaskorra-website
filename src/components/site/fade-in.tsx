"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/**
 * Scroll-reveal wrapper — animates children in when they enter the viewport.
 * A global CSS @media print rule in globals.css forces opacity/transform
 * to reset so content is never missing in print or static captures.
 */
export function FadeIn({ children, delay = 0, y = 24, className }: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
