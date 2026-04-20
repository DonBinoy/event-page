"use client";

import {
  motion, AnimatePresence, useScroll, useTransform,
  useMotionValue, useSpring, useInView, animate,
} from "framer-motion";
import { useRef, useState, useEffect, createContext, useContext, ReactNode } from "react";
import { ArrowDown, ArrowRight, MapPin, Phone, Globe, Check, Zap, ChevronDown, Menu, X, Moon, Sun } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

/* ─── TOKENS (Light mode + Premium Teal) ─────────── */
/* ─── THEMES ─────────────────────────────────────── */
const THEMES = {
  light: {
    A: "#0097B2",    // Corporate Teal (Restored)
    AH: "#008CA5",
    AL: "rgba(0, 151, 178, 0.08)",
    BG: "#FBFBF9",   // Crisp Silk
    FG: "#0F0F0F",   // Deepest Ink
    M: "#7A7A77",    // Slate Muted
    S: "#F3F3F1",    // Soft Bone
    B: "#E6E6E3",    // Subtle Stone
    W: "#FFFFFF"
  },
  dark: {
    A: "#0097B2",    // Corporate Teal (Restored)
    AH: "#0AADCA",
    AL: "rgba(0, 151, 178, 0.15)",
    BG: "#080808",   // Absolute Obsidian
    FG: "#EBEBE6",    // Silk Dust
    M: "#8C8C88",    // Warm Charcoal
    S: "#111111",    // Shadow Depth
    B: "#1F1F1F",    // Graphite Border
    W: "#000000"
  }
};
const ThemeContext = createContext({ theme: "light" as "light" | "dark", toggleTheme: () => {}, tokens: THEMES.light });
function useTheme() { return useContext(ThemeContext); }

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  useEffect(() => {
    const root = document.documentElement;
    const tokens = THEMES[theme];
    
    // Inject tokens as CSS variables
    Object.entries(tokens).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value as string);
    });
    
    document.body.style.background = tokens.BG;
    document.body.style.color = tokens.FG;
    root.setAttribute('data-theme', theme);
  }, [theme]);
  
  const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");
  
  return <ThemeContext.Provider value={{ theme, toggleTheme, tokens: THEMES[theme] }}>{children}</ThemeContext.Provider>;
}

const E = [0.22,1,0.36,1] as const;

/* ─── CURSOR ─────────────────────────────────────── */
function Cursor() {
  const { tokens: { A, AH, AL, BG, FG, M, S, B, W }, theme, toggleTheme } = useTheme();
  const x = useMotionValue(-200), y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });
  useEffect(() => {
    const fn = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [x, y]);
  return (
    <>
      <motion.div id="cur-dot" style={{ left: x, top: y }} />
      <motion.div id="cur-ring" style={{ left: sx, top: sy }} />
    </>
  );
}

/* ─── SCROLL PROGRESS ────────────────────────────── */
function ProgressBar() {
  const { tokens: { A, AH, AL, BG, FG, M, S, B, W }, theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div style={{ scaleX, transformOrigin: "left", position: "fixed", top: 0, left: 0, right: 0, height: 2, background: A, zIndex: 9996 }} />
  );
}

/* ─── REVEAL ─────────────────────────────────────── */
function Rev({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { tokens: { A, AH, AL, BG, FG, M, S, B, W }, theme, toggleTheme } = useTheme();
  const r = useRef<HTMLDivElement>(null);
  const v = useInView(r, { once: true, margin: "-60px" });
  return (
    <motion.div ref={r} initial={{ opacity: 0, y: 44 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: E, delay }} style={style}>
      {children}
    </motion.div>
  );
}

/* ─── CHAR SPLIT ─────────────────────────────────── */
function Chars({ text, cls = "", style = {}, delay = 0 }: { text: string; cls?: string; style?: React.CSSProperties; delay?: number }) {
  const { tokens: { A, AH, AL, BG, FG, M, S, B, W }, theme, toggleTheme } = useTheme();
  const r = useRef<HTMLDivElement>(null);
  const v = useInView(r, { once: true, margin: "-40px" });
  return (
    <div ref={r} className={cls} style={style}>
      {text.split("").map((c, i) => (
        <motion.span key={i} initial={{ y: "105%", opacity: 0 }} animate={v ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.7, ease: E, delay: delay + i * 0.028 }} style={{ display: "inline-block", whiteSpace: c === " " ? "pre" : "normal" }}>
          {c}
        </motion.span>
      ))}
    </div>
  );
}

/* ─── COUNTER ────────────────────────────────────── */
function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const { tokens: { A, AH, AL, BG, FG, M, S, B, W }, theme, toggleTheme } = useTheme();
  const r = useRef<HTMLSpanElement>(null);
  const v = useInView(r, { once: true });
  useEffect(() => {
    if (!v || !r.current) return;
    const c = animate(0, to, { duration: 2, ease: "easeOut", onUpdate: n => { if (r.current) r.current.textContent = Math.round(n) + suffix } });
    return () => c.stop();
  }, [v, to, suffix]);
  return <span ref={r}>0{suffix}</span>;
}

/* ─── SPIN SVG BADGE ─────────────────────────────── */
function SpinBadge() {
  const { tokens: { A } } = useTheme();
  const t = "SOLSTICE · EDITION 01 · JUNE 2026 · MUMBAI · ";
  return (
    <div style={{ position: "relative", width: 130, height: 130 }}>
      <svg viewBox="0 0 130 130" className="spin" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs><path id="cp" d="M65,65 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" /></defs>
        <text fill={A} fontSize="8.5" fontFamily="Inter,sans-serif" letterSpacing="3.8" fontWeight="500">
          <textPath href="#cp">{t}</textPath>
        </text>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 8, height: 8, borderRadius: "50%", background: A }} />
      </div>
    </div>
  );
}

/* ─── IMAGE RING ─────────────────────────────────── */
function ImageRing() {
  const { tokens: { B } } = useTheme();
  const imgs = ["abstract.png", "art.png", "concert.png", "crowd.png", "dancer.png", "venue.png"];
  const R = 150; // Radius

  return (
    <div style={{ position: "relative", width: 440, height: 440, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Outer rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      >
        {imgs.map((img, i) => {
          const ang = (i / imgs.length) * Math.PI * 2;
          const x = (Math.cos(ang) * R).toFixed(3);
          const y = (Math.sin(ang) * R).toFixed(3);
          return (
            <div key={img} style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}>
              {/* Individual card counter-rotating */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                style={{ width: 84, height: 110, borderRadius: 16, border: `1px solid ${B}`, overflow: "hidden", background: "#000", boxShadow: "0 12px 40px -10px rgba(0,0,0,0.3)" }}
              >
                <img src={`/gallery/${img}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
              </motion.div>
            </div>
          );
        })}
      </motion.div>
      {/* Center piece */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <SpinBadge />
      </div>
    </div>
  );
}

/* ─── MARQUEE ────────────────────────────────────── */
function Mq({ items, dir = "l", size = "sm", bg, accent = false }: { items: string[]; dir?: "l" | "r"; size?: "sm" | "lg" | "xl"; bg?: string; accent?: boolean }) {
  const { tokens: { A, AH, AL, BG, FG, M, S, B, W }, theme, toggleTheme } = useTheme();
  const bgColor = bg ?? BG;
  const sep = "  ·  ";
  const chunk = items.join(sep) + sep;
  const repeated = chunk + chunk;
  const fsMap = { sm: "0.65rem", lg: "clamp(2.2rem,5vw,4rem)", xl: "clamp(3.5rem,9vw,7.5rem)" };
  const fs = fsMap[size];
  const col = accent ? A : M;
  const cls = dir === "l" ? "mq-l" : "mq-r";
  const padV = size === "xl" ? "28px 0" : size === "lg" ? "20px 0" : "11px 0";
  return (
    <div style={{ overflow: "hidden", background: bgColor, borderTop: `1px solid ${B}`, borderBottom: `1px solid ${B}`, padding: padV }}>
      <div className={cls}>
        {[0, 1].map(i => (
          <span key={i} className={size !== "sm" ? "font-display" : ""} style={{ fontSize: fs, fontWeight: size !== "sm" ? 700 : 500, color: col, whiteSpace: "nowrap", letterSpacing: size === "sm" ? "0.28em" : "-0.01em", textTransform: size === "sm" ? "uppercase" : "none", paddingRight: size === "sm" ? 32 : 56 }}>
            {repeated}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── SECTION HEADER ─────────────────────────────── */
function SHdr({ idx, label }: { idx: string; label: string }) {
  const { tokens: { A, AH, AL, BG, FG, M, S, B, W }, theme, toggleTheme } = useTheme();
  return (
    <Rev style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 52 }}>
      <span style={{ fontSize: 10, letterSpacing: "0.35em", fontWeight: 600, textTransform: "uppercase", color: A, whiteSpace: "nowrap" }}>{idx} — {label}</span>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} style={{ flex: 1, height: 1, background: B, transformOrigin: "left" }} />
    </Rev>
  );
}

/* ─── NAVBAR ─────────────────────────────────────── */
function OldNavbar() {
  const { tokens: { A, AH, AL, BG, FG, M, S, B, W }, theme, toggleTheme } = useTheme();
  const [sc, setSc] = useState(false);
  const [op, setOp] = useState(false);
  const nav = ["About", "Artists", "Venue", "Rules", "Tickets"];

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
          <motion.a href="#" className="font-display" whileHover={{ color: A }} style={{ fontSize: 19, fontWeight: 700, color: FG, textDecoration: "none", letterSpacing: "-0.01em" }}>
            SOLSTICE
          </motion.a>

          <nav style={{ display: "flex", gap: 32 }} className="desk-only">
            {nav.map((l, i) => (
              <motion.a key={l} href={`#${l.toLowerCase()}`}
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + i * 0.06 }}
                whileHover={{ color: A, y: -1 }}
                style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: M, textDecoration: "none", fontWeight: 500 }}>
                {l}
              </motion.a>
            ))}
          </nav>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            
            <button suppressHydrationWarning onClick={toggleTheme} className="theme-toggle desk-only" style={{ background: S, border: `1px solid ${B}`, borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", color: FG, cursor: "none", transition: "all 0.3s" }}>
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <motion.a href="#tickets"
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
              <motion.a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOp(false)}
                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                className="font-display" whileHover={{ color: A, x: 12 }}
                style={{ fontSize: "clamp(2.4rem,8vw,4rem)", fontWeight: 700, color: FG, textDecoration: "none" }}>
                {l}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── HERO ───────────────────────────────────────── */
function Hero() {
  const { tokens: { A, AH, AL, BG, FG, M, S, B, W }, theme, toggleTheme } = useTheme();
  const r = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: r, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const tags = ["Live Music", "Contemporary Art", "Cultural Experience", "Immersive", "Multi-Disciplinary"];

  return (
    <section ref={r} style={{ position: "relative", minHeight: "100vh", background: W, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      {/* Background decoration */}
      <motion.div style={{ y: bgY, opacity: fade, position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: 800, height: 800, borderRadius: "50%", background: `radial-gradient(circle, ${A}0c 0%, transparent 60%)` }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${A}08 0%, transparent 60%)` }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${A}08 1px, transparent 1px), linear-gradient(90deg, ${A}08 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 40%, ${W} 100%)` }} />
      </motion.div>

      {/* Floating Image Ring */}
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.6, ease: E }}
        style={{ position: "absolute", top: "45%", right: "-80px", transform: "translateY(-50%)", zIndex: 2 }} className="desk-only">
        <div className="float-anim"><ImageRing /></div>
      </motion.div>

      {/* Date badge */}
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
        style={{ position: "absolute", top: 96, left: 36, zIndex: 2, border: `1px solid ${B}`, padding: "12px 20px", background: `${W}ee`, backdropFilter: "blur(10px)" }} className="desk-only">
        <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: M, marginBottom: 4, fontWeight: 500 }}>Saturday</p>
        <p className="font-display" style={{ fontSize: 22, fontWeight: 700, color: FG, lineHeight: 1 }}>21.06.26</p>
        <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: A, marginTop: 4, fontWeight: 600 }}>6 PM IST</p>
      </motion.div>

      {/* Tags */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
        style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "0 36px", width: "100%", paddingTop: 168 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          {tags.map((t, i) => (
            <motion.span key={t} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.55 + i * 0.07 }}
              whileHover={{ borderColor: A, color: W, background: A, scale: 1.04 }}
              style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 600, color: A, border: `1px solid ${A}40`, padding: "5px 14px", cursor: "default", transition: "all 0.2s" }}>
              {t}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Main type */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "0 36px", width: "100%" }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.62 }}
          className="font-mono" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: M, marginBottom: 12 }}>
          <span style={{ color: A }}>▸</span> Edition 01 — June 21, 2026 — Mumbai
        </motion.p>

        <div style={{ overflow: "hidden" }}>
          <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: E, delay: 0.65 }}
            className="font-display" style={{ fontSize: "clamp(5.5rem,17vw,16rem)", fontWeight: 700, lineHeight: 0.86, color: FG, margin: 0, letterSpacing: "-0.03em" }}>
            SOL
          </motion.h1>
        </div>
        <div style={{ overflow: "hidden" }}>
          <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: E, delay: 0.79 }}
            className="font-display" style={{ fontSize: "clamp(5.5rem,17vw,16rem)", fontWeight: 700, lineHeight: 0.86, color: "transparent", WebkitTextStroke: `2px ${A}`, margin: 0, letterSpacing: "-0.03em" }}>
            STICE
          </motion.h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.15, ease: E }}
          style={{ marginTop: 44, display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
          <p style={{ maxWidth: 400, color: M, fontSize: 14, lineHeight: 1.8 }}>
            An immersive multi-disciplinary experience bringing together the world&rsquo;s most visionary artists, sonic architects, and cultural curators for one unforgettable evening.
          </p>
          <motion.a href="#about" whileHover={{ x: 6 }} style={{ display: "flex", alignItems: "center", gap: 8, color: A, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", fontWeight: 600, textDecoration: "none" }}>
            Explore <ArrowDown size={13} />
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom strip */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.45 }}
        style={{ position: "relative", zIndex: 2, borderTop: `1px solid ${B}`, marginTop: 48, background: `${W}dd`, backdropFilter: "blur(8px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "14px 36px", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
            {[["Date", "June 21, 2026", FG], ["Doors Open", "6:00 PM IST", FG], ["Venue", "The Grand Atrium", A], ["Category", "Art & Music", A]].map(([l, v, c]) => (
              <div key={l}>
                <p style={{ fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: M, marginBottom: 4, fontWeight: 500 }}>{l}</p>
                <p style={{ fontSize: 11, fontWeight: 600, color: c as string }}>{v}</p>
              </div>
            ))}
          </div>
          
            <button suppressHydrationWarning onClick={toggleTheme} className="theme-toggle desk-only" style={{ background: S, border: `1px solid ${B}`, borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", color: FG, cursor: "none", transition: "all 0.3s" }}>
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <motion.a href="#tickets"
 className="shimmer-cta" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", padding: "9px 22px", textDecoration: "none", display: "inline-block" }}>
            Reserve Your Place
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── ABOUT ──────────────────────────────────────── */
function About() {
  const { tokens: { A, AH, AL, BG, FG, M, S, B, W }, theme, toggleTheme } = useTheme();
  const stats = [
    { n: 12, s: "+", l: "Artists", sub: "Curated performers" },
    { n: 6, s: "", l: "Stages", sub: "Sonic environments" },
    { n: 1, s: "", l: "Night", sub: "One time only" },
    { n: 500, s: "", l: "Guests", sub: "Exclusive capacity" },
  ];
  const tags = ["#ArtFestival", "#LiveMusic", "#Immersive", "#Mumbai2026", "#SolsticeEd01", "#Contemporary", "#NammaStudio"];

  return (
    <>
      <Mq items={["Art & Music Festival", "June 21 2026", "The Grand Atrium", "Mumbai", "Edition 01", "500 Guests Only"]} dir="l" size="sm" bg={S} />
      <section id="about" style={{ background: BG, padding: "130px 36px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <SHdr idx="01" label="About The Event" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }} className="grid-2">
            <div>
              <Chars text="Where the ancient" cls="font-display" style={{ fontSize: "clamp(2.2rem,4vw,3.6rem)", fontWeight: 700, lineHeight: 1.1, color: FG, overflow: "hidden" }} />
              <Chars text="meets the avant-garde." cls="font-display" delay={0.12} style={{ fontSize: "clamp(2.2rem,4vw,3.6rem)", fontWeight: 700, lineHeight: 1.1, color: A, fontStyle: "italic", overflow: "hidden" }} />

              <Rev delay={0.25}>
                <p style={{ color: M, fontSize: 14, lineHeight: 1.85, maxWidth: 480, marginTop: 28, marginBottom: 16 }}>
                  SOLSTICE is not merely an event — it is a threshold. A gathering of the most luminous minds in music, art, and culture, converging for a single evening at the intersection of the timeless and the radically new.
                </p>
                <p style={{ color: M, fontSize: 14, lineHeight: 1.85, maxWidth: 480, marginBottom: 36 }}>
                  Conceived by the curatorial collective <span style={{ color: FG, fontWeight: 600 }}>Namma Studio</span>, Edition 01 is an invitation to witness the extraordinary.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {tags.map((t, i) => (
                    <motion.span key={t} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                      whileHover={{ color: W, background: A, borderColor: A, scale: 1.05 }}
                      style={{ fontSize: 10, fontWeight: 500, color: M, background: W, border: `1px solid ${B}`, padding: "6px 12px", cursor: "default", transition: "all 0.2s" }}>
                      {t}
                    </motion.span>
                  ))}
                </div>
              </Rev>
            </div>

            {/* Stats + spec table */}
            <Rev delay={0.2}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {stats.map((s, i) => (
                  <motion.div key={s.l} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1 }}
                    whileHover={{ y: -4, borderColor: `${A}60`, background: W }}
                    style={{ border: `1px solid ${B}`, padding: "28px 28px", background: BG, transition: "all 0.3s", cursor: "default" }}>
                    <p className="font-display" style={{ fontSize: "clamp(2.5rem,5vw,3.8rem)", fontWeight: 700, color: A, lineHeight: 1, marginBottom: 6 }}>
                      <Count to={s.n} suffix={s.s} />
                    </p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: FG, marginBottom: 3 }}>{s.l}</p>
                    <p style={{ fontSize: 11, color: M, lineHeight: 1.5 }}>{s.sub}</p>
                  </motion.div>
                ))}
              </div>

              {/* Spec table */}
              <div style={{ marginTop: 20, border: `1px solid ${B}`, background: W }}>
                {[["Event Type", "Multi-Disciplinary Arts"], ["Duration", "6:00 PM – 2:00 AM"], ["Dress Code", "Smart Casual / Formal"], ["Age Limit", "18+ Strictly"], ["Capacity", "500 Guests"], ["Organizer", "Namma Studio"]].map(([k, v], i) => (
                  <motion.div key={k} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                    whileHover={{ background: AL }}
                    style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "11px 16px", borderBottom: i < 5 ? `1px solid ${B}` : "none", transition: "background 0.2s" }}>
                    <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: M, fontWeight: 500 }}>{k}</span>
                    <span style={{ fontSize: 12, color: FG, fontWeight: 500 }}>{v}</span>
                  </motion.div>
                ))}
              </div>
            </Rev>
          </div>
        </div>
      </section>
      <Mq items={["Sonic Architecture", "Live Performance", "Conscious Curation", "One Night Only", "500 Souls"]} dir="r" size="sm" bg={S} />
    </>
  );
}

/* ─── GALLERY (alternating scroll columns) ──────── */
const GALLERY_COLS = [
  [
    { src: "/gallery/concert.png", label: "Live Performance", h: 420 },
    { src: "/gallery/crowd.png", label: "The Audience", h: 560 },
    { src: "/gallery/art.png", label: "Art Installation", h: 320 },
  ],
  [
    { src: "/gallery/abstract.png", label: "Live Painting", h: 520 },
    { src: "/gallery/venue.png", label: "The Grand Atrium", h: 380 },
    { src: "/gallery/dancer.png", label: "Movement & Dance", h: 400 },
  ],
  [
    { src: "/gallery/crowd.png", label: "500 Guests", h: 380 },
    { src: "/gallery/concert.png", label: "Sonic Architect", h: 540 },
    { src: "/gallery/abstract.png", label: "Canvas & Color", h: 420 },
  ],
  [
    { src: "/gallery/venue.png", label: "Heritage", h: 480 },
    { src: "/gallery/dancer.png", label: "Expression", h: 420 },
    { src: "/gallery/crowd.png", label: "Energy", h: 360 },
  ],
  [
    { src: "/gallery/art.png", label: "Exhibitions", h: 360 },
    { src: "/gallery/abstract.png", label: "Visual Arts", h: 500 },
    { src: "/gallery/concert.png", label: "The Sound", h: 460 },
  ],
];

function GalleryColumn({ images, direction, speed = 28 }: { images: typeof GALLERY_COLS[0]; direction: "up" | "down"; speed?: number }) {
  const { tokens: { B } } = useTheme();
  // Triple the items for a perfectly robust infinite loop in Framer Motion
  const items = [...images, ...images, ...images];

  return (
    <div style={{ overflow: "hidden", height: "100%", position: "relative" }}>
      <motion.div
        animate={{
          y: direction === "up" ? ["0%", "-33.33%"] : ["-33.33%", "0%"]
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }}
        style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", paddingBottom: 16 }}
      >
        {items.map((img, i) => (
          <div key={i} style={{ position: "relative", overflow: "hidden", borderRadius: 28, border: `1px solid ${B}`, width: "100%", height: img.h, flexShrink: 0 }}>
            <img src={img.src} alt={img.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "saturate(0.9) contrast(1.1)" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)`, display: "flex", alignItems: "flex-end", padding: 24 }}>
              <span style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#FFF", fontWeight: 600 }}>{img.label}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function Gallery() {
  const { tokens: { BG, FG, AH, W, B }, theme } = useTheme();
  return (
    <>
      <Mq items={["Moments", "Curated Visuals", "SOLSTICE Ed.01", "Behind The Scenes", "Art & Sound"]} dir="l" size="sm" bg={BG} accent />
      <section id="gallery" style={{ background: FG, padding: "120px 0", overflow: "hidden" }}>
        <div style={{ maxWidth: 1600, margin: "0 auto", padding: "0 36px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
            <span style={{ fontSize: 10, letterSpacing: "0.35em", fontWeight: 600, textTransform: "uppercase", color: AH, whiteSpace: "nowrap" }}>01.5 — Gallery</span>
            <div style={{ flex: 1, height: 1, background: theme === 'light' ? "#333" : "#2a2a2a" }} />
          </div>
          <Chars text="The Experience" cls="font-display" style={{ fontSize: "clamp(3.5rem,8vw,7rem)", fontWeight: 700, lineHeight: 0.92, color: BG, marginBottom: 64, overflow: "hidden", letterSpacing: "-0.02em" }} />
        </div>

        <div style={{ maxWidth: 1600, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, alignItems: "start", height: 850, overflow: "hidden", borderRadius: 40 }} className="gallery-grid">
            <GalleryColumn images={GALLERY_COLS[0]} direction="up" speed={28} />
            <GalleryColumn images={GALLERY_COLS[1]} direction="down" speed={36} />
            <GalleryColumn images={GALLERY_COLS[2]} direction="up" speed={32} />
            <GalleryColumn images={GALLERY_COLS[3]} direction="down" speed={40} />
            <GalleryColumn images={GALLERY_COLS[4]} direction="up" speed={30} />
          </div>
        </div>
      </section>
      <style>{`@media(max-width:1024px){.gallery-grid{grid-template-columns:repeat(3,1fr)!important}.gallery-grid>:nth-child(4),.gallery-grid>:nth-child(5){display:none}} @media(max-width:768px){.gallery-grid{grid-template-columns:repeat(2,1fr)!important; height:600px!important}.gallery-grid>:nth-child(3){display:none}}`}</style>
    </>
  );
}

/* ─── ARTISTS ────────────────────────────────────── */
const ARTISTS = [
  { id: 1, name: "Aroha Ngata", role: "Sonic Architect", origin: "NZL", bio: "A pioneer of immersive soundscapes blurring the boundary between music and architecture.", tags: ["Electronic", "Ambient", "Installation"], time: "07:00 PM" },
  { id: 2, name: "Ravi Khanna", role: "Classical Fusion", origin: "IND", bio: "Tabla maestro meets modular synthesizer — live sets that are meditations in controlled chaos.", tags: ["Classical", "Electronic", "Tabla"], time: "08:30 PM" },
  { id: 3, name: "Lena Solberg", role: "Visual Artist", origin: "NOR", bio: "Creates monumental paintings in real-time, her canvas as large as the wall behind her.", tags: ["Live Art", "Abstract", "Performance"], time: "09:15 PM" },
  { id: 4, name: "The Collective", role: "Dance & Movement", origin: "IND", bio: "Six dancers who speak in silence — their bodies writing languages music cannot.", tags: ["Contemporary", "Dance", "Movement"], time: "10:00 PM" },
  { id: 5, name: "Zaid Al-Amin", role: "DJ & Producer", origin: "MAR", bio: "Closing-set architect. His final hour is a ritual — a shared surrender to sound.", tags: ["House", "Deep Techno", "World"], time: "11:30 PM" },
  { id: 6, name: "Mira Iyer", role: "Spoken Word", origin: "IND", bio: "Her words arrive like weather — sudden, inevitable, and impossible to forget.", tags: ["Poetry", "Multilingual", "Performance"], time: "11:00 PM" },
];

function Artists() {
  const { tokens: { A, AH, AL, BG, FG, M, S, B, W }, theme, toggleTheme } = useTheme();
  const [hov, setHov] = useState<number | null>(null);
  return (
    <>
      <Mq items={ARTISTS.map(a => a.name)} dir="l" size="xl" bg={W} accent />
      <section id="artists" style={{ background: W, padding: "130px 36px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <SHdr idx="02" label="Lineup" />
          <Chars text="The Artists" cls="font-display" style={{ fontSize: "clamp(3.5rem,10vw,9rem)", fontWeight: 700, lineHeight: 0.88, color: FG, marginBottom: 72, overflow: "hidden", letterSpacing: "-0.02em" }} />

          <div style={{ borderTop: `1px solid ${B}` }}>
            {ARTISTS.map((a, i) => (
              <motion.div key={a.id}
                initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.07, ease: E }}
                onHoverStart={() => setHov(a.id)} onHoverEnd={() => setHov(null)}
                whileHover={{ paddingLeft: 20, backgroundColor: AL }}
                style={{ display: "grid", gridTemplateColumns: "80px 1fr 120px 90px", gap: 24, padding: "26px 0", borderBottom: `1px solid ${B}`, alignItems: "center", cursor: "default", transition: "padding 0.3s, background 0.3s" }}
                className="artist-row">

                <div>
                  <p className="font-mono" style={{ fontSize: 10, color: A, fontWeight: 500 }}>{a.time}</p>
                  <motion.p animate={{ color: hov === a.id ? A : B }} style={{ fontFamily: "monospace", fontSize: 10 }}>{String(i + 1).padStart(2, "0")}</motion.p>
                </div>

                <div>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
                    <motion.h3 animate={{ color: hov === a.id ? A : FG }} className="font-display" style={{ fontSize: "clamp(1.5rem,2.8vw,2.5rem)", fontWeight: 700, lineHeight: 1 }}>{a.name}</motion.h3>
                    <span className="font-mono" style={{ fontSize: 9, color: M, letterSpacing: "0.2em" }}>{a.origin}</span>
                  </div>
                  <p style={{ fontSize: 12, color: M, lineHeight: 1.65, maxWidth: 480 }}>{a.bio}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
                    {a.tags.map(t => (
                      <motion.span key={t} whileHover={{ borderColor: A, color: W, background: A }}
                        style={{ fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: M, border: `1px solid ${B}`, padding: "3px 8px", transition: "all 0.2s" }}>
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <p style={{ fontSize: 12, fontWeight: 600, color: hov === a.id ? A : FG, textAlign: "right", transition: "color 0.3s" }}>{a.role}</p>

                <motion.div animate={{ x: hov === a.id ? 4 : 0, opacity: hov === a.id ? 1 : 0.2 }} style={{ display: "flex", justifyContent: "flex-end" }}>
                  <ArrowRight size={16} color={A} />
                </motion.div>
              </motion.div>
            ))}
          </div>

          <Rev delay={0.3} style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 8 }}>
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: "50%", background: A, flexShrink: 0 }} />
            <span style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: B, fontWeight: 500 }}>More Artists To Be Announced</span>
          </Rev>
        </div>
      </section>
      <style>{`.artist-row{grid-template-columns:80px 1fr 120px 90px!important}@media(max-width:768px){.artist-row{grid-template-columns:60px 1fr!important}.artist-row>:nth-child(3),.artist-row>:nth-child(4){display:none!important}}`}</style>
    </>
  );
}

/* ─── VENUE ──────────────────────────────────────── */
function Venue() {
  const { tokens: { A, AH, AL, BG, FG, M, S, B, W }, theme, toggleTheme } = useTheme();
  return (
    <>
      <Mq items={["The Grand Atrium", "Bandra West", "Mumbai", "1938 Art Deco", "500 Capacity"]} dir="r" size="sm" bg={S} />
      <section id="venue" style={{ background: BG, padding: "130px 36px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <SHdr idx="03" label="Venue & Organizer" />
          <Chars text="Where It Happens" cls="font-display" style={{ fontSize: "clamp(3rem,8vw,8rem)", fontWeight: 700, lineHeight: 0.88, color: FG, marginBottom: 72, overflow: "hidden", letterSpacing: "-0.02em" }} />

          <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 1, background: B, marginBottom: 1 }} className="grid-3-2">
            <Rev delay={0.1}>
              <div style={{ background: W, padding: 52 }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 24 }}>
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                    <MapPin size={18} color={A} style={{ flexShrink: 0, marginTop: 4 }} />
                  </motion.div>
                  <div>
                    <h3 className="font-display" style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 700, color: FG, marginBottom: 4 }}>The Grand Atrium</h3>
                    <p className="font-mono" style={{ fontSize: 10, color: M, letterSpacing: "0.15em" }}>HISTORIC VENUE · EST. 1938</p>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: M, lineHeight: 1.85, marginBottom: 32, maxWidth: 480 }}>
                  A landmark cultural space within a beautifully restored 1930s Art Deco building in Bandra West. Soaring ceilings, original terrazzo floors, and state-of-the-art acoustics.
                </p>

                <div style={{ border: `1px solid ${B}`, marginBottom: 28, background: BG }}>
                  {[["Capacity", "500 Guests"], ["Main Hall", "3,000 sq ft"], ["Facilities", "Rooftop + Green Rooms"], ["Sound", "Pro System"], ["Lighting", "Curated Rig"], ["Catering", "Full Service"]].map(([k, v], i) => (
                    <motion.div key={k} whileHover={{ background: AL }}
                      style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "10px 16px", borderBottom: i < 5 ? `1px solid ${B}` : "none", transition: "background 0.2s" }}>
                      <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: M, fontWeight: 500 }}>{k}</span>
                      <span style={{ fontSize: 11, color: FG, fontWeight: 500 }}>{v}</span>
                    </motion.div>
                  ))}
                </div>

                <p style={{ fontSize: 12, color: M, marginBottom: 10 }}><span style={{ color: FG, fontWeight: 600 }}>Address: </span>14 Mehboob Studios Lane, Bandra West, Mumbai — 400 050</p>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 11, color: M }}><Phone size={11} color={A} />+91 22 6660 0000</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 11, color: M }}><Globe size={11} color={A} />grandatriummumbai.com</div>
                </div>
              </div>
            </Rev>

            <Rev delay={0.2}>
              <div style={{ background: S, padding: 52, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 400 }}>
                <div>
                  <p style={{ fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: M, marginBottom: 24, fontWeight: 500 }}>Location</p>
                  <div style={{ position: "relative", width: "100%", paddingBottom: "85%", background: W, overflow: "hidden", border: `1px solid ${B}` }}>
                    <motion.div animate={{ backgroundPosition: ["0px 0px", "28px 28px"] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${A}18 1px,transparent 1px),linear-gradient(90deg,${A}18 1px,transparent 1px)`, backgroundSize: "28px 28px" }} />
                    <div style={{ position: "absolute", top: "40%", left: "10%", right: "10%", height: 1, background: `${A}25` }} />
                    <div style={{ position: "absolute", top: "20%", left: "40%", bottom: "10%", width: 1, background: `${A}25` }} />
                    <div style={{ position: "absolute", top: "40%", left: "40%", transform: "translate(-50%,-50%)" }}>
                      <motion.div animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: "absolute", inset: "-8px", borderRadius: "50%", border: `1.5px solid ${A}`, transform: "translate(-50%,-50%)", top: "50%", left: "50%" }} />
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: A, position: "relative", zIndex: 1 }} />
                    </div>
                    <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
                      <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: A, fontWeight: 600 }}>The Grand Atrium</span>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                  {[["Metro", "Bandra Station — 15 min walk"], ["Parking", "Valet available on-site"], ["Cab Drop", "Mehboob Studios Gate 2"]].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <span style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: M, fontWeight: 500 }}>{k}</span>
                      <span style={{ fontSize: 11, color: FG }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Rev>
          </div>

          {/* Organizer */}
          <Rev delay={0.3}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: B }} className="grid-2">
              <div style={{ background: W, padding: 52 }}>
                <p style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: A, marginBottom: 20, fontWeight: 600 }}>Presented By</p>
                <Chars text="Namma Studio" cls="font-display" style={{ fontSize: "clamp(2.2rem,4vw,3.2rem)", fontWeight: 700, color: FG, marginBottom: 8, overflow: "hidden" }} />
                <p style={{ fontSize: 13, color: M, fontStyle: "italic", marginBottom: 24 }}>Curators of Uncommon Experiences · Since 2019</p>
                <p style={{ fontSize: 14, color: M, lineHeight: 1.85, maxWidth: 440 }}>An independent curatorial collective founded on the belief that culture, when carefully assembled, can transform a room into a revelation.</p>
              </div>
              <div style={{ background: S, padding: 52, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: M, marginBottom: 20, fontWeight: 500 }}>Past Events</p>
                  {["EPOCH 2025 — Bangalore", "MERIDIAN 2024 — Goa", "THRESHOLD 2023 — Mumbai"].map((e, i) => (
                    <motion.div key={e} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      whileHover={{ x: 10, color: A }}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${B}`, cursor: "default" }}>
                      <span style={{ fontSize: 13, color: FG, fontWeight: 500 }}>{e}</span>
                      <ArrowRight size={12} color={A} />
                    </motion.div>
                  ))}
                </div>
                <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 6 }}>
                  {[["Contact", "hello@nammastudio.in"], ["Instagram", "@nammastudio"], ["Based in", "Mumbai & Bangalore"]].map(([k, v]) => (
                    <p key={k} style={{ fontSize: 11, color: M }}><span style={{ color: FG, fontWeight: 600 }}>{k}: </span>{v}</p>
                  ))}
                </div>
              </div>
            </div>
          </Rev>
        </div>
      </section>
    </>
  );
}

/* ─── RULES ──────────────────────────────────────── */
const RULES = [
  { id: 1, title: "Ticket Purchase & Validity", body: "All tickets are strictly non-refundable and non-transferable. Each ticket is valid for one-time use linked to the purchaser's identity. Present your e-ticket QR code at the gate — a government-issued photo ID is required for entry verification." },
  { id: 2, title: "Age Restriction — 18+", body: "SOLSTICE is an 18+ event. Valid proof of age (Aadhar, Passport, or Driving License) is mandatory. No exceptions at the door. Guests who cannot prove their age will be refused entry without a refund." },
  { id: 3, title: "Entry & Re-entry Policy", body: "Doors open at 6:00 PM IST. Late entry may be restricted during performances. Re-entry is not permitted after exit. Please ensure you carry all personal belongings when leaving." },
  { id: 4, title: "Dress Code", body: "Smart casual to formal. We encourage guests to dress intentionally — this is a curated experience. Sportswear, beachwear, and flip-flops are not permitted." },
  { id: 5, title: "Photography & Recording", body: "Photography for personal use is welcome during designated moments. Professional cameras and recording equipment are not permitted without prior press accreditation. Flash photography during performances is strictly prohibited." },
  { id: 6, title: "Conduct & Safety", body: "All guests are expected to behave with respect toward fellow attendees, artists, and staff. Any harassment or anti-social behaviour will result in immediate removal without refund." },
];

function RuleItem({ rule }: { rule: typeof RULES[0] }) {
  const { tokens: { A, AH, AL, BG, FG, M, S, B, W }, theme, toggleTheme } = useTheme();
  const [op, setOp] = useState(false);
  return (
    <motion.div style={{ borderBottom: `1px solid ${B}` }} whileHover={{ backgroundColor: AL }}>
      <button suppressHydrationWarning onClick={() => setOp(!op)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "20px 16px", background: "none", border: "none", cursor: "none", textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <motion.span animate={{ color: op ? A : B }} className="font-mono" style={{ fontSize: 10, minWidth: 28 }}>{String(rule.id).padStart(2, "0")}</motion.span>
          <motion.span animate={{ color: op ? A : FG }} style={{ fontSize: 13, fontWeight: 600 }}>{rule.title}</motion.span>
        </div>
        <motion.div animate={{ rotate: op ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={15} color={M} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {op && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: E }} style={{ overflow: "hidden" }}>
            <p style={{ padding: "0 16px 22px 60px", fontSize: 13, color: M, lineHeight: 1.85, maxWidth: 580 }}>{rule.body}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Rules() {
  const { tokens: { A, AH, AL, BG, FG, M, S, B, W }, theme, toggleTheme } = useTheme();
  return (
    <>
      <Mq items={["No Re-Entry", "18+ Only", "Smart Casual", "Respect The Art", "No Recording", "Non-Refundable"]} dir="l" size="sm" bg={S} />
      <section id="rules" style={{ background: W, padding: "130px 36px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <SHdr idx="04" label="Event Rules & Policies" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start" }} className="grid-2">
            <Rev delay={0.1}>
              <Chars text="House" cls="font-display" style={{ fontSize: "clamp(3.5rem,8vw,7rem)", fontWeight: 700, lineHeight: 0.88, color: FG, overflow: "hidden", letterSpacing: "-0.02em" }} />
              <Chars text="Rules." delay={0.08} cls="font-display" style={{ fontSize: "clamp(3.5rem,8vw,7rem)", fontWeight: 700, lineHeight: 0.88, color: "transparent", WebkitTextStroke: `2px ${A}`, overflow: "hidden", letterSpacing: "-0.02em" }} />
              <p style={{ marginTop: 32, fontSize: 14, color: M, lineHeight: 1.85, maxWidth: 340 }}>
                SOLSTICE is a sanctuary for art and music. We ask that all guests honour the space, the artists, and each other.
              </p>
              <motion.div whileHover={{ borderColor: A }} style={{ marginTop: 32, padding: 24, border: `1px solid ${A}30`, background: AL, transition: "border-color 0.3s" }}>
                <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: A, marginBottom: 10, fontWeight: 600 }}>Important Notice</p>
                <p style={{ fontSize: 12, color: M, lineHeight: 1.75 }}>Namma Studio reserves the right to refuse entry or remove any guest not complying with these rules. Tickets are non-refundable under all circumstances.</p>
              </motion.div>
            </Rev>
            <Rev delay={0.2}>
              <div style={{ borderTop: `1px solid ${B}` }}>
                {RULES.map(r => <RuleItem key={r.id} rule={r} />)}
              </div>
            </Rev>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── TICKETS ────────────────────────────────────── */
const TIERS = [
  { id: "general", name: "General", price: "₹2,500", sub: "The Experience", desc: "Full access to all stages and exhibitions throughout the evening.", features: ["All performances & exhibitions", "Welcome drink on arrival", "Event programme booklet", "Access to The Grand Atrium"], featured: false },
  { id: "collector", name: "Collector", price: "₹5,500", sub: "Collector's Edition", desc: "For those who wish to hold this night beyond memory.", features: ["All General access", "Signed limited-edition art print", "Curated gift box", "Priority entry lane", "Rooftop terrace access"], featured: true },
  { id: "patron", name: "Patron", price: "₹12,000", sub: "The Patron's Circle", desc: "An invitation into the inner sanctum of SOLSTICE.", features: ["All Collector access", "Pre-event artist meet & greet", "Private suite access", "Curated dinner at 6:00 PM", "Patron Circle membership", "First access future editions"], featured: false },
];

function Tickets() {
  const { tokens: { A, AH, AL, BG, FG, M, S, B, W }, theme, toggleTheme } = useTheme();
  return (
    <>
      <Mq items={["General · ₹2,500", "Collector · ₹5,500", "Patron · ₹12,000", "Reserve Now", "87 Left"]} dir="r" size="sm" bg={S} accent />
      <section id="tickets" style={{ background: BG, padding: "130px 36px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <SHdr idx="05" label="Tickets" />
          <Chars text="Reserve Your Place" cls="font-display" style={{ fontSize: "clamp(2.8rem,7vw,7rem)", fontWeight: 700, lineHeight: 0.88, color: FG, marginBottom: 16, overflow: "hidden", letterSpacing: "-0.02em" }} />

          <Rev delay={0.15}>
            <p style={{ fontSize: 14, color: M, marginBottom: 24, maxWidth: 380, lineHeight: 1.8 }}>Strictly limited to 500 guests. Three editions — choose the experience that calls to you.</p>
            <motion.div whileHover={{ scale: 1.02 }} style={{ display: "inline-flex", alignItems: "center", gap: 10, border: `1px solid ${A}40`, background: AL, padding: "9px 18px", marginBottom: 64, cursor: "default" }}>
              <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }}>
                <Zap size={12} color={A} />
              </motion.div>
              <span style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: A, fontWeight: 600 }}>Limited Availability — 87 tickets remaining</span>
            </motion.div>
          </Rev>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: B }} className="grid-3">
            {TIERS.map((t, i) => (
              <motion.div key={t.id}
                initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.1 + i * 0.12, ease: E }}
                whileHover={{ y: -8 }}
                style={{ position: "relative", background: t.featured ? AL : W, padding: 44, display: "flex", flexDirection: "column", transition: "all 0.3s" }}>
                {t.featured && (
                  <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2.5, repeat: Infinity }} style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: A }} />
                )}
                {t.featured && <span style={{ position: "absolute", top: 18, right: 18, fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, background: A, color: W, padding: "4px 10px" }}>Most Popular</span>}

                <p style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: A, fontWeight: 600, marginBottom: 14 }}>{t.name}</p>
                <p className="font-display" style={{ fontSize: "clamp(2.2rem,4vw,3rem)", fontWeight: 700, color: A, lineHeight: 1, marginBottom: 6 }}>{t.price}</p>
                <p style={{ fontSize: 12, color: M, fontStyle: "italic", marginBottom: 20 }}>{t.sub}</p>
                <p style={{ fontSize: 13, color: M, lineHeight: 1.75, marginBottom: 28 }}>{t.desc}</p>

                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 36, flex: 1 }}>
                  {t.features.map((f, fi) => (
                    <motion.li key={f} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: fi * 0.06 }}
                      style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <Check size={11} color={A} style={{ marginTop: 3, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: M, lineHeight: 1.55 }}>{f}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button id={`ticket-${t.id}`}
                  suppressHydrationWarning
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className={t.featured ? "shimmer-cta" : ""}
                  style={{ width: "100%", padding: "14px 0", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, cursor: "none", border: t.featured ? "none" : `1px solid ${B}`, background: t.featured ? A : "transparent", color: t.featured ? W : FG, transition: "all 0.25s" }}
                  onMouseEnter={e => { if (!t.featured) { e.currentTarget.style.borderColor = A; e.currentTarget.style.color = A } }}
                  onMouseLeave={e => { if (!t.featured) { e.currentTarget.style.borderColor = B; e.currentTarget.style.color = FG } }}>
                  Purchase — {t.name}
                </motion.button>
              </motion.div>
            ))}
          </div>

          <Rev delay={0.5}>
            <p style={{ textAlign: "center", fontSize: 9, color: B, letterSpacing: "0.28em", textTransform: "uppercase", marginTop: 28, fontWeight: 500 }}>
              All prices inclusive of taxes · Tickets non-refundable · Secure payment via Razorpay
            </p>
          </Rev>
        </div>
      </section>
    </>
  );
}

/* ─── FOOTER ─────────────────────────────────────── */
function OldFooter() {
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

/* ─── PAGE ───────────────────────────────────────── */

export default function Page() {
  return (
    <>
      <Cursor />
      <ProgressBar />
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Artists />
      <Venue />
      <Rules />
      <Tickets />
      <Footer />
    </>
  );
}
