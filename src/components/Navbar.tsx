"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "./Theme";
import { E } from "./UI";

export function Navbar() {
  const { tokens: { A, AH, AL, BG, FG, M, S, B, W }, theme, toggleTheme } = useTheme();
  const [sc, setSc] = useState(false);
  const [op, setOp] = useState(false);
  const nav = [
    { label: "Home", href: "/" },
    { label: "Experience", href: "/experience" },
    { label: "Stay", href: "/stay" },
    { label: "Place", href: "/place" },
    { label: "Tickets", href: "/#tickets" }
  ];

  useEffect(() => {
    const h = () => setSc(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.85, ease: E }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, transition: "all 0.4s", background: sc ? "rgba(250,250,248,0.92)" : "transparent", backdropFilter: sc ? "blur(20px)" : "none", borderBottom: sc ? `1px solid ${B}` : "1px solid transparent" }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 36px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <motion.a href="/" className="font-display" whileHover={{ color: A }} style={{ fontSize: 19, fontWeight: 700, color: FG, textDecoration: "none", letterSpacing: "-0.01em" }}>
            SOLSTICE
          </motion.a>

          <nav style={{ display: "flex", gap: 32 }} className="desk-only">
            {nav.map((l, i) => (
              <motion.a key={l.label} href={l.href}
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + i * 0.06 }}
                whileHover={{ color: A, y: -1 }}
                style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: M, textDecoration: "none", fontWeight: 500 }}>
                {l.label}
              </motion.a>
            ))}
          </nav>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            
            <button suppressHydrationWarning onClick={toggleTheme} className="theme-toggle desk-only" style={{ background: S, border: `1px solid ${B}`, borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", color: FG, cursor: "none", transition: "all 0.3s" }}>
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <motion.a href="/#tickets"
              className="shimmer-cta desk-only"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", padding: "9px 22px", textDecoration: "none", display: "inline-block", borderRadius: 0 }}>
              Get Tickets
            </motion.a>
            <button suppressHydrationWarning onClick={() => setOp(!op)} className="mob-only" style={{ background: "none", border: "none", color: FG, cursor: "none", padding: 4 }}>
              {op ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {op && (
          <motion.div initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 52px) 34px)" }} animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 52px) 34px)" }} exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 52px) 34px)" }} transition={{ duration: 0.5, ease: E }}
            style={{ position: "fixed", inset: 0, zIndex: 40, background: W, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
            {nav.map((l, i) => (
              <motion.a key={l.label} href={l.href} onClick={() => setOp(false)}
                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                className="font-display" whileHover={{ color: A, x: 12 }}
                style={{ fontSize: "clamp(2.4rem,8vw,4rem)", fontWeight: 700, color: FG, textDecoration: "none" }}>
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
