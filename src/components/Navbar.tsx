"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Artists", href: "#artists" },
  { label: "Venue", href: "#venue" },
  { label: "Rules", href: "#rules" },
  { label: "Tickets", href: "#tickets" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#2a2a2a]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-display text-xl font-bold tracking-tight text-[#f0ece4]"
          >
            SOLSTICE
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[11px] tracking-[0.2em] uppercase text-[#6b6560] hover:text-[#c9a96e] transition-colors duration-300 font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <a
              href="#tickets"
              className="hidden md:inline-flex items-center gap-2 bg-[#c9a96e] text-[#0a0a0a] text-[11px] tracking-[0.15em] uppercase font-bold px-5 py-2.5 hover:bg-[#e8d5b0] transition-all duration-300"
            >
              Get Tickets
            </a>
            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle"
              className="md:hidden text-[#f0ece4]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center gap-8 md:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {navLinks.map((link, i) => (
          <motion.a
            key={link.href}
            href={link.href}
            initial={{ opacity: 0, y: 20 }}
            animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            onClick={() => setMenuOpen(false)}
            className="text-display text-4xl font-bold text-[#f0ece4] hover:text-[#c9a96e] transition-colors"
          >
            {link.label}
          </motion.a>
        ))}
        <motion.a
          href="#tickets"
          initial={{ opacity: 0, y: 20 }}
          animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: navLinks.length * 0.06, duration: 0.4 }}
          onClick={() => setMenuOpen(false)}
          className="mt-4 bg-[#c9a96e] text-[#0a0a0a] text-sm tracking-[0.15em] uppercase font-bold px-8 py-3"
        >
          Get Tickets
        </motion.a>
      </motion.div>
    </>
  );
}
