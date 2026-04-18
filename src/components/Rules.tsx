"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const bookingRules = [
  {
    id: 1,
    title: "Ticket Purchase & Validity",
    content:
      "All tickets are strictly non-refundable and non-transferable. Each ticket is valid for one-time use only and is linked to the purchaser's identity. Present your e-ticket (QR code) at the gate — a government-issued photo ID is required for entry verification.",
  },
  {
    id: 2,
    title: "Age Restriction",
    content:
      "SOLSTICE is an 18+ event. Valid proof of age (Aadhar, Passport, or Driving License) is mandatory for all attendees. No exceptions will be made at the door. Guests who cannot prove their age will be refused entry without a refund.",
  },
  {
    id: 3,
    title: "Entry & Re-entry Policy",
    content:
      "Doors open at 6:00 PM IST. The event begins at 7:00 PM. Late entry may be restricted during performances. Re-entry is not permitted after exit. Please ensure you carry all personal belongings when leaving.",
  },
  {
    id: 4,
    title: "Dress Code",
    content:
      "Smart casual to formal. We encourage guests to dress intentionally — this is a curated experience. Sportswear, beachwear, and flip-flops are not permitted. The organizers reserve the right to refuse entry on the basis of dress code.",
  },
  {
    id: 5,
    title: "Photography & Recording",
    content:
      "Photography for personal use is welcome during designated moments. Professional cameras, video cameras, and recording equipment are not permitted without prior press accreditation. Flash photography during performances is strictly prohibited.",
  },
  {
    id: 6,
    title: "Conduct & Safety",
    content:
      "All guests are expected to behave with respect and dignity towards fellow attendees, artists, and staff. Any form of harassment, aggression, or anti-social behaviour will result in immediate removal from the premises without refund. The organizers' decision is final.",
  },
];

function AccordionItem({ rule }: { rule: typeof bookingRules[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#2a2a2a]">
      <button
        id={`rule-${rule.id}`}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-6 text-left group"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-mono text-[#2a2a2a] group-hover:text-[#c9a96e] transition-colors duration-300">
            {String(rule.id).padStart(2, "0")}
          </span>
          <span className="text-sm font-semibold tracking-wide text-[#f0ece4] group-hover:text-[#c9a96e] transition-colors duration-300">
            {rule.title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="shrink-0 text-[#6b6560]"
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-10 text-sm text-[#6b6560] leading-relaxed max-w-2xl">
              {rule.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Rules() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="rules" ref={ref} className="bg-[#0a0a0a] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-[9px] tracking-[0.35em] uppercase font-medium text-[#c9a96e]">
            04 — Event Rules & Policies
          </span>
          <div className="flex-1 h-px bg-[#2a2a2a]" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <h2
              className="text-display font-bold leading-[1.0] text-[#f0ece4]"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            >
              House
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px #c9a96e" }}>
                Rules
              </span>
            </h2>
            <p className="mt-8 text-[#6b6560] text-sm leading-relaxed max-w-sm">
              SOLSTICE is a sanctuary for art and music. We ask that all guests
              honour the space, the artists, and each other. Please read our policies
              carefully before attending.
            </p>

            <div className="mt-10 p-6 border border-[#c9a96e]/20 bg-[#c9a96e]/5">
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e] mb-2">Important Notice</p>
              <p className="text-xs text-[#6b6560] leading-relaxed">
                Namma Studio reserves the right to refuse entry or remove any guest
                not complying with these rules. Tickets once purchased are
                non-refundable under all circumstances.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="border-t border-[#2a2a2a]"
          >
            {bookingRules.map((rule) => (
              <AccordionItem key={rule.id} rule={rule} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
