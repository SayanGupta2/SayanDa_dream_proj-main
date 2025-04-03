import { Variants } from "framer-motion";

// Reusable animations for components

export const fadeIn = (direction: "up" | "down" | "left" | "right", delay = 0): Variants => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.7,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const textVariant = (delay = 0): Variants => {
  return {
    hidden: {
      y: 20,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.6,
        delay,
      },
    },
  };
};

export const slideIn = (direction: "up" | "down" | "left" | "right", delay = 0, duration = 0.5): Variants => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: "tween",
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};

export const zoomIn = (delay = 0, duration = 0.5): Variants => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};

export const serviceCardAnimation: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.5,
    }
  },
  hover: { 
    y: -10,
    transition: {
      duration: 0.3,
    }
  }
};

export const glassRevealAnimation: Variants = {
  hidden: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    WebkitBackdropFilter: "blur(0px)",
  },
  show: {
    opacity: 1,
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    transition: {
      duration: 0.8,
    },
  },
};

export const neonPulse: Variants = {
  hidden: {
    boxShadow: "0 0 0 rgba(0, 246, 255, 0)"
  },
  show: {
    boxShadow: [
      "0 0 5px rgba(0, 246, 255, 0.5)",
      "0 0 15px rgba(0, 246, 255, 0.5)",
      "0 0 5px rgba(0, 246, 255, 0.5)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
    }
  }
};
