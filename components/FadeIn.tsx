"use client";

import { motion } from "framer-motion";

export default function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number; // seconds (0.1 = 100ms)
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,              // IMPORTANT: prevents re-hiding on scroll
        amount: 0.12,            // IMPORTANT: easier to trigger on mobile
        margin: "0px 0px -15% 0px", // trigger a bit earlier
      }}
      transition={{ duration: 0.65, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}