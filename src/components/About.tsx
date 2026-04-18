"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  }),
};

const highlights = [
  { number: "12+", label: "Artists", description: "Carefully curated performers across disciplines" },
  { number: "6", label: "Stages", description: "Distinct sonic and visual environments" },
  { number: "1", label: "Night", description: "A singular, unforgettable evening" },
  { number: "500", label: "Guests", description: "Exclusive capacity for an intimate experience" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="bg-[#0a0a0a] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="flex items-center gap-4 mb-20"
        >
          <span className="text-[9px] tracking-[0.35em] uppercase font-medium text-[#c9a96e]">
            01 — About The Event
          </span>
          <div className="flex-1 h-px bg-[#2a2a2a]" />
        </motion.div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Big quote */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.1}
          >
            <h2
              className="text-display font-bold leading-[1.05] text-[#f0ece4] mb-8"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Where the ancient
              meets the{" "}
              <span className="text-[#c9a96e] italic">avant-garde.</span>
            </h2>
            <p className="text-[#6b6560] leading-relaxed text-base max-w-md">
              SOLSTICE is not merely an event — it is a threshold. A gathering of
              the most luminous minds in music, art, and culture, converging for
              a single evening that exists at the intersection of the timeless
              and the radically new.
            </p>
            <p className="text-[#6b6560] leading-relaxed text-base max-w-md mt-4">
              Conceived by the curatorial collective <span className="text-[#f0ece4]">Namma Studio</span>,
              SOLSTICE Edition 01 is an invitation to witness the extraordinary.
              From immersive sound installations to live painting on monumental
              canvases, every moment is composed with intentional beauty.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {["#ArtFestival", "#LiveMusic", "#Immersive", "#Mumbai2026", "#SolsticeEdition01", "#Contemporary"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium text-[#6b6560] bg-[#141414] border border-[#2a2a2a] px-3 py-1.5 hover:border-[#c9a96e]/40 hover:text-[#c9a96e] transition-all duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats grid */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.25}
            className="grid grid-cols-2 gap-px bg-[#2a2a2a]"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={0.3 + i * 0.1}
                className="bg-[#0a0a0a] p-8 group hover:bg-[#141414] transition-colors duration-300"
              >
                <p
                  className="text-display font-bold text-[#c9a96e] leading-none mb-2"
                  style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
                >
                  {item.number}
                </p>
                <p className="text-[#f0ece4] font-semibold text-sm tracking-wide mb-1">
                  {item.label}
                </p>
                <p className="text-[#6b6560] text-xs leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
