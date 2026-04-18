"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Twitter, Mail } from "lucide-react";

const marqueeText = "SOLSTICE · JUNE 21, 2026 · MUMBAI · ";

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer ref={ref} className="bg-[#0a0a0a] border-t border-[#2a2a2a]">
      {/* Newsletter strip */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="border-b border-[#2a2a2a] py-16 px-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[9px] tracking-[0.35em] uppercase text-[#c9a96e] mb-3 font-medium">
              Stay in the Loop
            </p>
            <h3 className="text-display text-3xl font-bold text-[#f0ece4]">
              First to know.<br />First to arrive.
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-0 w-full md:w-auto md:max-w-md">
            <input
              id="newsletter-email"
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-[#141414] border border-[#2a2a2a] text-[#f0ece4] text-sm px-5 py-3.5 outline-none placeholder:text-[#3a3a3a] focus:border-[#c9a96e] transition-colors duration-300 min-w-0"
            />
            <button
              id="newsletter-subscribe"
              className="bg-[#c9a96e] text-[#0a0a0a] text-[10px] tracking-[0.2em] uppercase font-bold px-6 py-3.5 hover:bg-[#e8d5b0] transition-colors duration-300 whitespace-nowrap"
            >
              Notify Me
            </button>
          </div>
        </div>
      </motion.div>

      {/* Monumental closing text */}
      <div className="overflow-hidden py-10 border-b border-[#2a2a2a]">
        <div className="flex animate-marquee">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="text-display font-bold text-[#141414] whitespace-nowrap select-none"
              style={{ fontSize: "clamp(4rem, 10vw, 8rem)", lineHeight: 1 }}
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <span className="text-display text-xl font-bold text-[#f0ece4]">SOLSTICE</span>
          <span className="text-[#2a2a2a] text-xs">Presented by Namma Studio</span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="#"
            id="footer-instagram"
            aria-label="Instagram"
            className="text-[#6b6560] hover:text-[#c9a96e] transition-colors duration-300"
          >
            <Instagram size={16} />
          </a>
          <a
            href="#"
            id="footer-twitter"
            aria-label="Twitter/X"
            className="text-[#6b6560] hover:text-[#c9a96e] transition-colors duration-300"
          >
            <Twitter size={16} />
          </a>
          <a
            href="mailto:hello@nammastudio.in"
            id="footer-email"
            aria-label="Email"
            className="text-[#6b6560] hover:text-[#c9a96e] transition-colors duration-300"
          >
            <Mail size={16} />
          </a>
        </div>

        <p className="text-[9px] tracking-[0.2em] uppercase text-[#2a2a2a]">
          &copy; 2026 Namma Studio. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
