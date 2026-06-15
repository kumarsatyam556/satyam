"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  tags: string[];
  year: string;
  link: string;
}

// Personal profile project
const PROJECTS_DATA: Project[] = [
  {
    id: "00",
    title: "ABOUT ME",
    role: "Student Developer",
    description: "I am Satyam, a class 10 student. I love coding and cyber security.",
    tags: ["Coding", "Cybersecurity"],
    year: "2026",
    link: "#",
  },
  {
    id: "01",
    title: "NEURAL LABS",
    role: "Lead Creative Engineer",
    description: "A real-time 3D synapse simulation mapping complex AI neural pathways in the browser using WebGL and custom GLSL fragment shaders.",
    tags: ["Next.js", "WebGL", "GLSL Shaders", "Three.js"],
    year: "2026",
    link: "#",
  },
  {
    id: "02",
    title: "KINETIC STUDIO",
    role: "Creative Director & Dev",
    description: "Fluid dynamics-based web portal for a brand consultancy, featuring canvas-driven fluid simulation and custom physics-based scroll mechanics.",
    tags: ["HTML5 Canvas", "Physics Engine", "GSAP", "Tailwind"],
    year: "2025",
    link: "#",
  },
  {
    id: "03",
    title: "ECLIPSE JOURNAL",
    role: "Frontend Architect",
    description: "Immersive digital publication exploring dark minimalism, with scroll-scrubbed typography, custom page transitions, and smooth layouts.",
    tags: ["Next.js 14", "Framer Motion", "Tailwind CSS"],
    year: "2025",
    link: "#",
  },
  {
    id: "04",
    title: "SYNAPSE AUDIO",
    role: "Solo Developer",
    description: "Interactive audio visualizer translating micro‑tonal sound waves into web‑native generative geometric particle grids.",
    tags: ["Web Audio API", "HTML5 Canvas", "Tailwind"],
    year: "2024",
    link: "#",
  },
];

export default function Projects() {
  // Show only the first four items (including ABOUT ME)
  const displayedProjects = PROJECTS_DATA.slice(0, 4);

  return (
    <section className="relative w-full py-32 px-6 md:px-24 bg-[#020f2f] z-20 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <span className="text-purple-400 text-xs md:text-sm tracking-[0.3em] font-mono mb-4 uppercase block">Selected Work</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">CASE STUDIES</h2>
          </div>
          <p className="text-neutral-400 text-sm md:text-base max-w-sm font-sans leading-relaxed">A curated selection of experiments and products built at the threshold of design complexity and technical performance.</p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-2xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group cursor-pointer"
            >
              {/* Corner Accent Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/0 group-hover:bg-purple-500/5 rounded-full blur-2xl transition-all duration-700 ease-out pointer-events-none" />

              <div>
                {/* ID & Year */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-purple-400 font-mono text-sm tracking-widest">[{project.id}]</span>
                  <span className="text-white/40 font-mono text-sm">{project.year}</span>
                </div>

                {/* Title & Role */}
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">{project.title}</h3>
                <span className="text-white/50 text-xs uppercase font-mono tracking-widest block mb-6">{project.role}</span>

                {/* Description */}
                <p className="text-white/75 text-sm leading-relaxed mb-8 font-sans">{project.description}</p>
              </div>

              {/* Tags & Link */}
              <div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-[10px] tracking-wider font-mono bg-white/5 border border-white/5 text-purple-200">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-white/40 group-hover:text-white font-mono text-xs tracking-widest uppercase transition-colors duration-300 mt-auto border-t border-white/5 pt-6">
                  <span>View Project</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-24 text-center">
          <p className="text-neutral-500 text-xs font-mono tracking-[0.2em] uppercase">Designed & Developed by Satyam © 2026</p>
        </div>
      </div>
    </section>
  );
}
