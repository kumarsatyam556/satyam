"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: Center-aligned (scroll: 0% to ~25%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, -30, -80]);

  // Section 2: Left-aligned (scroll: 25% to ~55%)
  const opacity2 = useTransform(scrollYProgress, [0.22, 0.32, 0.45, 0.52], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.32, 0.45, 0.52], [80, 0, 0, -80]);

  // Section 3: Right-aligned (scroll: 55% to ~80%)
  const opacity3 = useTransform(scrollYProgress, [0.52, 0.62, 0.75, 0.82], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.52, 0.62, 0.75, 0.82], [80, 0, 0, -80]);

  // Scroll explorer indicator opacity map
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none w-full h-full">
      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs tracking-[0.2em] font-mono"
      >
        <span>SCROLL TO EXPLORE</span>
        <div className="w-[1px] h-10 bg-white/10 relative overflow-hidden">
          <motion.div
            animate={{
              y: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-0 w-full h-1/2 bg-purple-400"
          />
        </div>
      </motion.div>

      {/* Section 1: Intro (0% scroll) */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center text-center px-4"
      >
        <span className="text-purple-400 text-xs md:text-sm tracking-[0.3em] font-mono mb-4 uppercase">
          Student & Developer // Portfolio 2026
        </span>
        <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 max-w-4xl select-none">
          SATYAM.
        </h1>
        <p className="text-neutral-400 text-sm md:text-lg tracking-[0.2em] uppercase font-mono mt-4">
          CLASS 10 STUDENT // CREATIVE DEV
        </p>
      </motion.div>

      {/* Section 2: Statement (30% scroll) */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="sticky top-0 h-screen w-full flex flex-col justify-center items-start px-6 md:px-24 max-w-5xl"
      >
        <span className="text-purple-400 text-xs md:text-sm tracking-[0.3em] font-mono mb-4 uppercase">
          01 / PASSION
        </span>
        <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 select-none">
          I LOVE WEB & APP <br />
          <span className="text-purple-300">DEVELOPMENT.</span>
        </h2>
        <p className="text-neutral-400 text-sm md:text-base max-w-md mt-6 leading-relaxed font-sans">
          Building fast, modern, and beautiful applications for web and mobile platforms to bring ideas to life.
        </p>
      </motion.div>

      {/* Section 3: Philosophy (60% scroll) */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="sticky top-0 h-screen w-full flex flex-col justify-center items-end text-right px-6 md:px-24 ml-auto max-w-5xl"
      >
        <span className="text-purple-400 text-xs md:text-sm tracking-[0.3em] font-mono mb-4 uppercase">
          02 / SKILLSET
        </span>
        <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-l from-white to-neutral-400 select-none">
          HTML, PYTHON & <br />
          <span className="text-purple-300">JAVASCRIPT.</span>
        </h2>
        <p className="text-neutral-400 text-sm md:text-base max-w-md mt-6 leading-relaxed font-sans">
          Leveraging frontend structures, scripting languages, and algorithmic scripting to design and engineer interactive digital systems.
        </p>
      </motion.div>
    </div>
  );
}
