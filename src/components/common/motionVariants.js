/**
 * Centralized Framer Motion variants and easing definitions
 * Designed for enterprise, subtle, and premium UI reveals.
 */

export const EASE_PREMIUM = [0.16, 1, 0.3, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration || 0.6,
      delay: custom.delay || 0,
      ease: EASE_PREMIUM,
    },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: {
      duration: custom.duration || 0.5,
      delay: custom.delay || 0,
      ease: "easeOut",
    },
  }),
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: (custom = {}) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom.duration || 0.6,
      delay: custom.delay || 0,
      ease: EASE_PREMIUM,
    },
  }),
};

export const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  visible: (custom = {}) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom.duration || 0.6,
      delay: custom.delay || 0,
      ease: EASE_PREMIUM,
    },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom = {}) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom.duration || 0.5,
      delay: custom.delay || 0,
      ease: EASE_PREMIUM,
    },
  }),
};

export const dropdownMenu = {
  hidden: { opacity: 0, y: -8, scale: 0.98, pointerEvents: "none" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    pointerEvents: "auto",
    transition: {
      duration: 0.22,
      ease: EASE_PREMIUM,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.98,
    pointerEvents: "none",
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

export const accordionCollapse = {
  hidden: { opacity: 0, height: 0, overflow: "hidden" },
  visible: {
    opacity: 1,
    height: "auto",
    overflow: "hidden",
    transition: {
      height: { duration: 0.3, ease: EASE_PREMIUM },
      opacity: { duration: 0.25, delay: 0.05 },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    overflow: "hidden",
    transition: {
      height: { duration: 0.25, ease: "easeInOut" },
      opacity: { duration: 0.15 },
    },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: (custom = {}) => ({
    transition: {
      staggerChildren: custom.stagger || 0.1,
      delayChildren: custom.delay || 0,
    },
  }),
};
