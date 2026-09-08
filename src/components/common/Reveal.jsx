import { motion, useReducedMotion } from "framer-motion";
import {
  fadeUp,
  fadeIn,
  fadeLeft,
  fadeRight,
  EASE_PREMIUM,
} from "./motionVariants";

/**
 * Reusable animation wrapper component using Framer Motion.
 * Supports direction (up, down, left, right, fade) and respects prefers-reduced-motion.
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  viewportAmount = 0.2,
  once = true,
  className = "",
  style = {},
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  // Pick direction variant
  const getVariant = () => {
    switch (direction) {
      case "left":
        return fadeLeft;
      case "right":
        return fadeRight;
      case "fade":
        return fadeIn;
      case "down":
        return {
          hidden: { opacity: 0, y: -24 },
          visible: (custom) => ({
            opacity: 1,
            y: 0,
            transition: {
              duration: custom.duration || 0.6,
              delay: custom.delay || 0,
              ease: EASE_PREMIUM,
            },
          }),
        };
      case "up":
      default:
        return fadeUp;
    }
  };

  // If user prefers reduced motion, disable slide offsets and only use opacity or render static
  if (shouldReduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, amount: viewportAmount }}
        transition={{ duration: 0.3, delay }}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  const selectedVariant = getVariant();

  return (
    <motion.div
      variants={selectedVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: viewportAmount }}
      custom={{ delay, duration }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}
