"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

const tags = ["Live Music", "Contemporary Art", "Cultural Experience", "Multi-Disciplinary", "Immersive"];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  }),
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background gradient orbs */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #c9a96e 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #c9a96e 0%, transparent 70%)" }}
      />

      {/* Hero background image strip */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.0) 40%, rgba(10,10,10,0.9) 80%, #0a0a0a 100%)",
            zIndex: 1,
          }}
        />
        {/* Gradient-based hero art (no external image needed) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, #1a160e 0%, #0a0a0a 60%)",
          }}
        />
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#c9a96e 1px, transparent 1px), linear-gradient(90deg, #c9a96e 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      {/* Event meta top */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={0.2}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-40 w-full"
      >
        <div className="flex flex-wrap gap-3 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] tracking-[0.25em] uppercase font-medium text-[#c9a96e] border border-[#c9a96e]/30 px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Main hero content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.4}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#6b6560] font-medium mb-4">
            Edition 01 — June 21, 2026
          </p>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="text-display font-bold leading-[0.9] tracking-tight text-[#f0ece4]"
            style={{ fontSize: "clamp(4.5rem, 15vw, 14rem)" }}
          >
            SOL
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
            className="text-display font-bold leading-[0.9] tracking-tight text-transparent"
            style={{
              fontSize: "clamp(4.5rem, 15vw, 14rem)",
              WebkitTextStroke: "1px #c9a96e",
            }}
          >
            STICE
          </motion.h1>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.9}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-end gap-6"
        >
          <p className="max-w-md text-[#6b6560] text-sm leading-relaxed font-medium tracking-wide">
            An immersive multi-disciplinary experience bringing together the world&rsquo;s
            most visionary artists, sonic architects, and cultural curators for one
            unforgettable evening.
          </p>
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#6b6560]">
              The Grand Atrium, Mumbai
            </span>
            <div className="w-8 h-px bg-[#2a2a2a]" />
            <a
              href="#about"
              id="hero-scroll-cta"
              className="flex items-center gap-2 text-[#c9a96e] text-[11px] tracking-[0.2em] uppercase font-medium hover:gap-3 transition-all duration-300"
            >
              Discover <ArrowDown size={14} />
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom info strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 border-t border-[#2a2a2a] w-full"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-8">
            <div>
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#6b6560] mb-1">Date</p>
              <p className="text-xs font-medium text-[#f0ece4]">June 21, 2026</p>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#6b6560] mb-1">Doors Open</p>
              <p className="text-xs font-medium text-[#f0ece4]">6:00 PM IST</p>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#6b6560] mb-1">Category</p>
              <p className="text-xs font-medium text-[#c9a96e]">Art & Music Festival</p>
            </div>
          </div>
          <a
            href="#tickets"
            id="hero-ticket-cta"
            className="bg-[#c9a96e] text-[#0a0a0a] text-[10px] tracking-[0.2em] uppercase font-bold px-6 py-2.5 hover:bg-[#e8d5b0] transition-colors duration-300"
          >
            Reserve Your Place
          </a>
        </div>
      </motion.div>
    </section>
  );
}
