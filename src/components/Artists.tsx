"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const artists = [
  {
    id: 1,
    name: "Aroha Ngata",
    role: "Sonic Architect",
    origin: "New Zealand",
    description:
      "A pioneer of immersive soundscapes, her compositions blur the boundary between music and architecture.",
    tags: ["Electronic", "Ambient", "Installation"],
    gradient: "from-[#1a1208] to-[#0a0a0a]",
    accentColor: "#c9a96e",
  },
  {
    id: 2,
    name: "Ravi Khanna",
    role: "Classical Fusion",
    origin: "India",
    description:
      "Tabla maestro meets modular synthesizer — Ravi's live sets are meditations in controlled chaos.",
    tags: ["Classical", "Electronic", "Tabla"],
    gradient: "from-[#0a120a] to-[#0a0a0a]",
    accentColor: "#7fb069",
  },
  {
    id: 3,
    name: "Lena Solberg",
    role: "Visual Artist",
    origin: "Norway",
    description:
      "Creates monumental paintings in real-time, her canvas as large as the wall behind her.",
    tags: ["Live Art", "Abstract", "Performance"],
    gradient: "from-[#080a14] to-[#0a0a0a]",
    accentColor: "#6e8fc9",
  },
  {
    id: 4,
    name: "The Collective",
    role: "Dance & Movement",
    origin: "Mumbai",
    description:
      "Six dancers who speak in silence — their bodies writing languages that music alone cannot.",
    tags: ["Contemporary", "Dance", "Movement"],
    gradient: "from-[#140812] to-[#0a0a0a]",
    accentColor: "#c96eb0",
  },
  {
    id: 5,
    name: "Zaid Al-Amin",
    role: "DJ & Producer",
    origin: "Morocco",
    description:
      "Closing-set architect. Zaid's final hour is a ritual — a shared surrender to sound.",
    tags: ["House", "Deep Techno", "World"],
    gradient: "from-[#140c08] to-[#0a0a0a]",
    accentColor: "#c98a6e",
  },
  {
    id: 6,
    name: "Mira Iyer",
    role: "Spoken Word & Poetry",
    origin: "Chennai",
    description:
      "Her words arrive like weather — sudden, inevitable, and impossible to forget.",
    tags: ["Poetry", "Spoken Word", "Multilingual"],
    gradient: "from-[#0a0a0a] to-[#0a0a0a]",
    accentColor: "#e8d5b0",
  },
];

export default function Artists() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="artists" ref={ref} className="bg-[#0a0a0a] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-[9px] tracking-[0.35em] uppercase font-medium text-[#c9a96e]">
            02 — Lineup
          </span>
          <div className="flex-1 h-px bg-[#2a2a2a]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="text-display font-bold leading-[1.0] text-[#f0ece4] mb-20"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        >
          The Artists
        </motion.h2>

        {/* Artist list */}
        <div className="border-t border-[#2a2a2a]">
          {artists.map((artist, i) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.07 }}
              onMouseEnter={() => setHovered(artist.id)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative border-b border-[#2a2a2a] transition-all duration-500 ${
                hovered === artist.id ? "bg-[#141414]" : ""
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-7 px-0">
                {/* Number */}
                <span className="text-[11px] tracking-[0.2em] text-[#2a2a2a] font-mono w-10 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-1.5">
                    <h3
                      className="text-display font-bold text-[#f0ece4] group-hover:text-[#c9a96e] transition-colors duration-300"
                      style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}
                    >
                      {artist.name}
                    </h3>
                    <span className="text-[10px] tracking-[0.15em] uppercase text-[#6b6560] font-medium">
                      {artist.origin}
                    </span>
                  </div>
                  <p className="text-[#6b6560] text-sm leading-relaxed max-w-xl">
                    {artist.description}
                  </p>
                </div>

                {/* Role + tags */}
                <div className="sm:text-right sm:w-64 shrink-0">
                  <p
                    className="text-sm font-semibold mb-2 transition-colors duration-300"
                    style={{ color: hovered === artist.id ? artist.accentColor : "#f0ece4" }}
                  >
                    {artist.role}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:justify-end">
                    {artist.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] tracking-[0.15em] uppercase font-medium text-[#6b6560] border border-[#2a2a2a] px-2 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More TBA */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center text-[#2a2a2a] text-[10px] tracking-[0.3em] uppercase font-medium mt-10"
        >
          + More Artists To Be Announced
        </motion.p>
      </div>
    </section>
  );
}
