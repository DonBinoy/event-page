"use client";

import { motion } from "framer-motion";
import { useTheme } from "./Theme";
import { Rev, Chars } from "./UI";

export function Footer() {
  const { tokens: { A, AH, AL, BG, FG, M, S, B, W }, theme, toggleTheme } = useTheme();
  const t1 = "SOLSTICE · JUNE 21 2026 · MUMBAI · NAMMA STUDIO · ART & MUSIC · EDITION 01 · ";
  return (
    <footer style={{ background: FG, color: BG, borderTop: `1px solid ${B}` }}>
      <Rev>
        <div style={{ borderBottom: "1px solid #2A2A2A", padding: "88px 36px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 48 }}>
            <div>
              <p style={{ fontSize: 8, letterSpacing: "0.35em", textTransform: "uppercase", color: AH, marginBottom: 14, fontWeight: 600 }}>Stay in the Loop</p>
              <Chars text="First to know." cls="font-display" style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: BG, lineHeight: 1.05, overflow: "hidden" }} />
              <Chars text="First to arrive." cls="font-display" delay={0.1} style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: AH, lineHeight: 1.05, overflow: "hidden" }} />
            </div>
            <div style={{ display: "flex", gap: 0, width: "100%", maxWidth: 440 }}>
              <input id="newsletter-email" type="email" placeholder="your@email.com"
                suppressHydrationWarning
                style={{ flex: 1, background: "#1a1a1a", border: "1px solid #2A2A2A", borderRight: "none", color: BG, fontSize: 13, padding: "15px 20px", outline: "none", minWidth: 0, fontFamily: "inherit" }}
                onFocus={e => (e.currentTarget.style.borderColor = AH)}
                onBlur={e => (e.currentTarget.style.borderColor = "#2A2A2A")} />
              <motion.button id="newsletter-subscribe" className="shimmer-cta"
                suppressHydrationWarning
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}
                style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", padding: "15px 22px", border: "none", cursor: "none", flexShrink: 0, whiteSpace: "nowrap" }}>
                Notify Me
              </motion.button>
            </div>
          </div>
        </div>
      </Rev>

      {/* Dual marquees */}
      <div style={{ overflow: "hidden", padding: "36px 0", borderBottom: "1px solid #2A2A2A" }}>
        <div className="mq-l" style={{ display: "flex" }}>
          {[0, 1, 2].map(i => <span key={i} className="font-display" style={{ fontSize: "clamp(3.5rem,9vw,8rem)", fontWeight: 700, color: "#1e1e1e", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>{t1}</span>)}
        </div>
      </div>
      <div style={{ overflow: "hidden", padding: "36px 0", borderBottom: "1px solid #2A2A2A" }}>
        <div className="mq-r" style={{ display: "flex" }}>
          {[0, 1, 2].map(i => <span key={i} className="font-display" style={{ fontSize: "clamp(3.5rem,9vw,8rem)", fontWeight: 700, color: "transparent", WebkitTextStroke: "1px #2A2A2A", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>{t1}</span>)}
        </div>
      </div>

      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "24px 36px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span className="font-display" style={{ fontSize: 18, fontWeight: 700, color: BG }}>SOLSTICE</span>
          <span style={{ fontSize: 10, color: "#444" }}>Presented by Namma Studio</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[["Instagram", "#"], ["X / Twitter", "#"], ["Email", "mailto:hello@nammastudio.in"]].map(([l, h]) => (
            <motion.a key={l} href={h} whileHover={{ color: AH, y: -2 }} style={{ fontSize: 10, letterSpacing: "0.1em", color: "#666", textDecoration: "none" }}>{l}</motion.a>
          ))}
        </div>
        <p style={{ fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase", color: "#333" }}>© 2026 Namma Studio. All rights reserved.</p>
      </div>
    </footer>
  );
}
