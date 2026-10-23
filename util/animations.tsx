
"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "motion/react";

type Direction = "left" | "right" | "up" | "down" | "fade" | "zoom";

interface RevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
}

const directions: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  left: { x: -50 },
  right: { x: 50 },
  up: { y: 50 },
  down: { y: -50 },
  fade: {},
  zoom: { scale: 0.85 },
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance,
  once = true,
  ...props
}: RevealProps) {
  const initial = directions[direction];

  const offset =
    direction === "left" || direction === "right"
      ? { x: direction === "left" ? -(distance ?? 50) : distance ?? 50 }
      : direction === "up" || direction === "down"
        ? { y: direction === "up" ? distance ?? 50 : -(distance ?? 50) }
        : initial;

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  delay?: number;
  className?: string;
}

export function Stagger({
  children,
  staggerDelay = 0.15,
  delay = 0,
  className,
}: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  direction = "up",
  className,
}: {
  children: React.ReactNode;
  direction?: Direction;
  className?: string;
}) {
  const offset = directions[direction];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...offset },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
