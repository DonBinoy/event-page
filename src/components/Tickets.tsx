"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Zap } from "lucide-react";

const tiers = [
  {
    id: "general",
    name: "General",
    price: "₹2,500",
    subtitle: "The Experience",
    description: "Full access to all stages and exhibitions.",
    features: [
      "All performances & exhibitions",
      "Welcome drink on arrival",
      "Event programme booklet",
      "Access to The Grand Atrium",
    ],
    cta: "Purchase — General",
    accent: "#6b6560",
    highlight: false,
  },
  {
    id: "collector",
    name: "Collector",
    price: "₹5,500",
    subtitle: "The Collector's Edition",
    description: "For those who wish to hold this night beyond memory.",
    features: [
      "All General access",
      "Signed limited art print",
      "Curated gift box",
      "Priority entry lane",
      "Access to rooftop terrace",
    ],
    cta: "Purchase — Collector",
    accent: "#c9a96e",
    highlight: true,
  },
  {
    id: "patron",
    name: "Patron",
    price: "₹12,000",
    subtitle: "The Patron's Circle",
    description: "An invitation into the inner sanctum.",
    features: [
      "All Collector access",
      "Pre-event artist meet & greet",
      "Dedicated private suite access",
      "Curated dinner at 6:00 PM",
      "Patron's Circle membership",
      "First access to future events",
    ],
    cta: "Purchase — Patron",
    accent: "#e8d5b0",
    highlight: false,
  },
];

export default function Tickets() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="tickets" ref={ref} className="bg-[#0a0a0a] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-[9px] tracking-[0.35em] uppercase font-medium text-[#c9a96e]">
            05 — Tickets
          </span>
          <div className="flex-1 h-px bg-[#2a2a2a]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="text-display font-bold leading-[1.0] text-[#f0ece4] mb-4"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        >
          Reserve Your<br />
          <span className="text-transparent italic" style={{ WebkitTextStroke: "1px #c9a96e" }}>
            Place
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[#6b6560] mb-16 text-sm max-w-md"
        >
          Capacity is strictly limited to 500 guests. Tickets
          are available in three editions — choose the experience that calls to you.
        </motion.p>

        {/* Availability notice */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="inline-flex items-center gap-2 border border-[#c9a96e]/30 bg-[#c9a96e]/5 px-4 py-2 mb-12"
        >
          <Zap size={11} className="text-[#c9a96e]" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#c9a96e] font-medium">
            Limited Availability — 87 tickets remaining
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#2a2a2a]">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.1 }}
              className={`relative group flex flex-col p-10 ${
                tier.highlight ? "bg-[#141414]" : "bg-[#0a0a0a]"
              } hover:bg-[#141414] transition-colors duration-500`}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#c9a96e]" />
              )}
              {tier.highlight && (
                <span className="absolute top-4 right-4 text-[9px] tracking-[0.2em] uppercase font-bold text-[#0a0a0a] bg-[#c9a96e] px-2 py-1">
                  Most Popular
                </span>
              )}

              <div className="mb-8">
                <p
                  className="text-[9px] tracking-[0.2em] uppercase font-medium mb-2"
                  style={{ color: tier.accent }}
                >
                  {tier.name}
                </p>
                <p
                  className="text-display font-bold leading-none mb-2"
                  style={{
                    fontSize: "clamp(2.5rem, 4vw, 3rem)",
                    color: tier.accent,
                  }}
                >
                  {tier.price}
                </p>
                <p className="text-[#6b6560] text-xs italic">{tier.subtitle}</p>
              </div>

              <p className="text-sm text-[#6b6560] mb-8 leading-relaxed">{tier.description}</p>

              <ul className="space-y-3 mb-10 flex-1">
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <Check size={12} className="mt-0.5 shrink-0" style={{ color: tier.accent }} />
                    <span className="text-xs text-[#6b6560]">{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                id={`ticket-${tier.id}`}
                className="w-full py-3.5 text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-300"
                style={
                  tier.highlight
                    ? { background: "#c9a96e", color: "#0a0a0a" }
                    : {
                        background: "transparent",
                        color: "#f0ece4",
                        border: "1px solid #2a2a2a",
                      }
                }
                onMouseEnter={(e) => {
                  if (!tier.highlight) {
                    e.currentTarget.style.borderColor = tier.accent;
                    e.currentTarget.style.color = tier.accent;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!tier.highlight) {
                    e.currentTarget.style.borderColor = "#2a2a2a";
                    e.currentTarget.style.color = "#f0ece4";
                  }
                }}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center text-[#2a2a2a] text-[9px] tracking-[0.3em] uppercase font-medium mt-8"
        >
          All prices inclusive of taxes · Tickets non-refundable · Secure payment via Razorpay
        </motion.p>
      </div>
    </section>
  );
}
