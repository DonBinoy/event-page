"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Clock, Phone, Globe, ChevronDown } from "lucide-react";

const venueDetails = {
  name: "The Grand Atrium",
  address: "14, Mehboob Studios Lane, Bandra West, Mumbai — 400 050",
  city: "Mumbai, Maharashtra",
  country: "India",
  phone: "+91 22 6660 0000",
  website: "grandatriummumbai.com",
  capacity: "500 guests",
  type: "Historic Cultural Venue",
  builtIn: "1938",
  description:
    "The Grand Atrium is a landmark cultural space set within a lovingly restored 1930s Art Deco building in the heart of Bandra West. With its soaring ceilings, original terrazzo floors, and state-of-the-art acoustics, it is the ideal canvas for an event of SOLSTICE's ambition.",
  features: [
    "3,000 sq ft Main Hall",
    "Rooftop Terrace with city views",
    "Private Green Room suites",
    "State-of-the-art sound system",
    "Curated lighting rig",
    "Full catering facilities",
  ],
};

const org = {
  name: "Namma Studio",
  tagline: "Curators of Uncommon Experiences",
  since: "2019",
  location: "Mumbai & Bangalore",
  email: "hello@nammastudio.in",
  instagram: "@nammastudio",
  description:
    "Namma Studio is an independent curatorial collective founded on the belief that culture, when carefully assembled, can transform a room into a revelation. We produce events at the intersection of contemporary art, music, and community — with an unflinching commitment to beauty.",
  pastEvents: ["EPOCH 2025 — Bangalore", "MERIDIAN 2024 — Goa", "THRESHOLD 2023 — Mumbai"],
};

export default function Venue() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="venue" ref={ref} className="bg-[#0a0a0a] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-[9px] tracking-[0.35em] uppercase font-medium text-[#c9a96e]">
            03 — Venue & Organizer
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
          Where It Happens
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-px bg-[#2a2a2a]">
          {/* Venue Block — spans 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3 bg-[#0a0a0a] p-10"
          >
            <div className="flex items-start gap-3 mb-6">
              <MapPin size={14} className="text-[#c9a96e] mt-1 shrink-0" />
              <div>
                <h3 className="text-display text-3xl font-bold text-[#f0ece4] mb-1">
                  {venueDetails.name}
                </h3>
                <p className="text-[#6b6560] text-sm">{venueDetails.type} · Est. {venueDetails.builtIn}</p>
              </div>
            </div>

            <p className="text-[#6b6560] leading-relaxed mb-8 max-w-lg">
              {venueDetails.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {venueDetails.features.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#c9a96e] shrink-0" />
                  <span className="text-xs text-[#6b6560]">{f}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#2a2a2a] pt-6 space-y-2">
              <p className="text-xs text-[#6b6560]">
                <span className="text-[#f0ece4] font-medium">Address: </span>
                {venueDetails.address}
              </p>
              <div className="flex flex-wrap gap-6 mt-3">
                <div className="flex items-center gap-2 text-xs text-[#6b6560]">
                  <Phone size={11} className="text-[#c9a96e]" />
                  {venueDetails.phone}
                </div>
                <div className="flex items-center gap-2 text-xs text-[#6b6560]">
                  <Globe size={11} className="text-[#c9a96e]" />
                  {venueDetails.website}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map placeholder Block */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2 bg-[#141414] p-10 flex flex-col justify-between min-h-[320px]"
          >
            <div>
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#6b6560] mb-6">Directions</p>
              {/* Stylized map representation */}
              <div className="relative w-full aspect-square max-w-xs mx-auto">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(#c9a96e 1px, transparent 1px), linear-gradient(90deg, #c9a96e 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full bg-[#c9a96e] mx-auto mb-2 animate-pulse" />
                    <p className="text-[10px] text-[#c9a96e] tracking-[0.2em] uppercase">The Grand Atrium</p>
                    <p className="text-[9px] text-[#6b6560]">Bandra West, Mumbai</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <p className="text-[10px] text-[#6b6560]">
                <span className="text-[#f0ece4]">Metro:</span> Bandra Station (15 min walk)
              </p>
              <p className="text-[10px] text-[#6b6560]">
                <span className="text-[#f0ece4]">Parking:</span> Valet available on-site
              </p>
              <p className="text-[10px] text-[#6b6560]">
                <span className="text-[#f0ece4]">Cab Drop:</span> Mehboob Studios Gate 2
              </p>
            </div>
          </motion.div>
        </div>

        {/* Organizer Block */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-px bg-[#141414] grid grid-cols-1 lg:grid-cols-2 gap-px"
          style={{ outline: "1px solid #2a2a2a" }}
        >
          <div className="p-10">
            <p className="text-[9px] tracking-[0.35em] uppercase text-[#c9a96e] mb-4">Presented By</p>
            <h3 className="text-display text-4xl font-bold text-[#f0ece4] mb-2">{org.name}</h3>
            <p className="text-sm text-[#6b6560] italic mb-6">{org.tagline}</p>
            <p className="text-sm text-[#6b6560] leading-relaxed max-w-lg">{org.description}</p>
          </div>

          <div className="p-10 flex flex-col justify-between bg-[#0f0f0f]">
            <div>
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#6b6560] mb-4">Past Events</p>
              {org.pastEvents.map((e) => (
                <p key={e} className="text-sm text-[#f0ece4] border-b border-[#2a2a2a] py-2 last:border-b-0">
                  {e}
                </p>
              ))}
            </div>
            <div className="mt-6 space-y-1">
              <p className="text-xs text-[#6b6560]">
                <span className="text-[#f0ece4]">Contact: </span>{org.email}
              </p>
              <p className="text-xs text-[#6b6560]">
                <span className="text-[#f0ece4]">Instagram: </span>{org.instagram}
              </p>
              <p className="text-xs text-[#6b6560]">
                <span className="text-[#f0ece4]">Based in: </span>{org.location}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
