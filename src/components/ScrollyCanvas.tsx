"use client";

import React, { useEffect, useRef, useState } from "react";
import { MotionValue, useSpring } from "framer-motion";

interface ScrollyCanvasProps {
  scrollYProgress: MotionValue<number>;
}

const TOTAL_FRAMES = 35;

export default function ScrollyCanvas({ scrollYProgress }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Apply smooth spring physics to scroll scrubbing for premium tactile feedback
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 35,
    stiffness: 150,
    mass: 0.5,
  });

  // Preload all frames on mount
  useEffect(() => {
    let loaded = 0;
    const imagesArray: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(2, "0");
      img.src = `/sequence/frame_${paddedIndex}_delay-0.066s.png`;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setIsLoading(false);
        }
      };
      imagesArray.push(img);
    }
    imagesRef.current = imagesArray;
  }, []);

  // Helper to draw a frame using custom "object-fit: cover" logic in canvas
  const drawFrame = useRef((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = imagesRef.current[index];
    if (!ctx || !img) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Adjust internal canvas buffer size for retina displays
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const canvasWidth = rect.width;
    const canvasHeight = rect.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;

    if (canvasRatio > imgRatio) {
      drawHeight = canvasWidth / imgRatio;
    } else {
      drawWidth = canvasHeight * imgRatio;
    }

    // Scale down to 75% to make the image smaller, and center it
    const scaleFactor = 0.75;
    drawWidth *= scaleFactor;
    drawHeight *= scaleFactor;
    
    const offsetX = (canvasWidth - drawWidth) / 2;
    const offsetY = (canvasHeight - drawHeight) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  });

  // Handle resizing and initial layout rendering
  useEffect(() => {
    const handleResize = () => {
      const currentProgress = smoothProgress.get();
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(currentProgress * TOTAL_FRAMES))
      );
      drawFrame.current(frameIndex);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [smoothProgress, isLoading]);

  // Redraw canvas when the spring-controlled scroll position changes
  useEffect(() => {
    if (isLoading) return;

    // Draw first frame immediately when loading completes
    drawFrame.current(0);

    const unsubscribe = smoothProgress.on("change", (latest) => {
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(latest * TOTAL_FRAMES))
      );
      drawFrame.current(frameIndex);
    });

    return () => unsubscribe();
  }, [isLoading, smoothProgress]);

  const loadingPercentage = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <div className="relative w-full h-full">
      {/* Loading Overlay */}
        {/* Loading overlay removed */}
        {null}

      {/* HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block bg-transparent"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
