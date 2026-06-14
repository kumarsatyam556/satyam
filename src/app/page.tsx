"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of the 500vh scrollytelling section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="relative w-full min-h-screen bg-[#020f2f]">
      {/* Cinematic Scrollytelling Section */}
      <div ref={containerRef} className="relative w-full h-[500vh]">
        {/* Sticky Canvas & Text Container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* High-performance canvas scrubs through frames */}
          <ScrollyCanvas scrollYProgress={scrollYProgress} />

          {/* Text transitions fade on top of the canvas */}
          <Overlay scrollYProgress={scrollYProgress} />
        </div>
      </div>

      {/* Selected Works Grid */}
      <Projects />
    </main>
  );
}

