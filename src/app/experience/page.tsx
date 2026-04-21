"use client";

import { motion, useScroll, useTransform, useInView, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowDown, Check, Zap, MapPin, ChevronDown, Clock, User, Camera, Coffee } from "lucide-react";
import { useTheme } from "../../components/Theme";
import { Cursor, ProgressBar, Rev, Chars, Mq, SHdr, E, Soul } from "../../components/UI";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

/* ─── AURA PORTAL ────────────────────────────────── */
function AuraPortal() {
  const { tokens: { A, B } } = useTheme();
  const imgs = ["abstract.png", "art.png", "concert.png", "crowd.png", "dancer.png", "venue.png"];
  
  // Magnetic Cursor Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      style={{ position: "absolute", inset: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}
    >
      {/* Central Aperture */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: E }}
        style={{ 
          position: "relative",
          width: "min(80vw, 900px)",
          height: "min(80vw, 750px)",
          borderRadius: "120px 400px 180px 320px",
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(40px)",
          border: `1px solid ${B}`,
          overflow: "hidden",
          boxShadow: "0 100px 200px -50px rgba(0,0,0,0.1)"
        }}
      >
        <motion.img 
          src="/gallery/venue.png" 
          style={{ 
            width: "120%", height: "120%", objectFit: "cover", 
            x: useTransform(mouseX, [-0.5, 0.5], [25, -25]),
            y: useTransform(mouseY, [-0.5, 0.5], [25, -25]),
            filter: "brightness(0.9) contrast(1.1)"
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)" }} />
      </motion.div>

      {/* Floating Kinetic Cards (Drift + Magnetic) */}
      {imgs.map((src, i) => {
        const angle = (i / imgs.length) * Math.PI * 2;
        const radius = 480;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * (radius * 0.55);
        
        return (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, scale: 1,
              x: [x - 25, x + 25, x - 25],
              y: [y + 25, y - 25, y + 25],
            }}
            transition={{ 
              opacity: { delay: 0.6 + i * 0.1, duration: 1 },
              scale: { delay: 0.6 + i * 0.1, duration: 1 },
              x: { duration: 12 + i * 3, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 14 + i * 3, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{
              position: "absolute",
              width: 240, height: 320,
              borderRadius: 32,
              overflow: "hidden",
              border: `1px solid ${B}`,
              boxShadow: "0 60px 120px -30px rgba(0,0,0,0.28)",
              zIndex: i % 2 === 0 ? 10 : 0,
              // Magnetism & Scroll Parallax
              translateX: useTransform(mouseX, [-0.5, 0.5], [x - (40 * (i + 1)), x + (40 * (i + 1))]),
              translateY: useTransform(mouseY, [-0.5, 0.5], [y - (25 * (i + 1)), y + (25 * (i + 1))]),
              scale: useTransform(mouseY, [-0.5, 0.5], [1, 1.05])
            }}
          >
            <img src={`/gallery/${src}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── HERO ───────────────────────────────────────── */
function HeroExperience() {
  const { tokens: { A, FG, M, B, W } } = useTheme();
  const r = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: r, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={r} style={{ position: "relative", minHeight: "115vh", background: W, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <motion.div style={{ y: bgY, opacity: fade, position: "absolute", inset: 0, zIndex: 0 }}>
         <AuraPortal />
      </motion.div>

      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 36px", position: "relative", zIndex: 10, textAlign: "center" }}>
         <motion.div style={{ opacity: fade }}>
           <p className="font-mono" style={{ fontSize: 10, letterSpacing: "0.6em", textTransform: "uppercase", color: A, fontWeight: 700, marginBottom: 40 }}>01 — The Narrative Experience</p>
           <h1 className="font-display" style={{ fontSize: "clamp(5rem, 16vw, 15rem)", fontWeight: 700, color: FG, lineHeight: 0.85, letterSpacing: "-0.04em", margin: 0 }}>ULTRA <br/><span style={{ color: "transparent", WebkitTextStroke: `1.5px ${A}` }}>REALITY</span></h1>
           
           <div style={{ display: "flex", justifyContent: "center", gap: 100, marginTop: 80 }} className="hero-stats">
              <div style={{ textAlign: "left", maxWidth: 300 }}>
                 <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: M, marginBottom: 12 }}>Atmospherics</p>
                 <p style={{ fontSize: 14, color: FG, lineHeight: 1.7 }}>Cinematic soundscapes and 4D sensory nodes synchronized with the local environment.</p>
              </div>
              <div style={{ textAlign: "left", maxWidth: 300 }}>
                 <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: M, marginBottom: 12 }}>Interaction</p>
                 <p style={{ fontSize: 14, color: FG, lineHeight: 1.7 }}>Haptic touchpoints and bioluminescent paths that respond to your rhythmic presence.</p>
              </div>
           </div>
         </motion.div>
      </div>

      <motion.div 
        style={{ position: "absolute", bottom: 40, left: "50%", x: "-50%", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: fade }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: M }}>Discover souls</span>
        <ArrowDown size={14} color={A} />
      </motion.div>
      <style>{`@media(max-width: 900px) { .hero-stats { flex-direction: column; gap: 40px !important; align-items: center; text-align: center !important; } .hero-stats > div { text-align: center !important; } }`}</style>
    </section>
  );
}

/* ─── GALLERY ──────────────────────────────────────── */
function ExperienceGallery() {
  const { tokens: { W, B } } = useTheme();
  return (
    <section style={{ background: W, padding: "0 36px 60px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <Soul y={100} s={0.1} r={0}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: 340, gap: 16 }} className="gal-grid">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ gridColumn: "span 2", gridRow: "span 2", borderRadius: 24, overflow: "hidden", border: `1px solid ${B}` }}>
              <img src="/gallery/venue.png" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Experience ambiance" />
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ gridColumn: "span 1", gridRow: "span 1", borderRadius: 24, overflow: "hidden", border: `1px solid ${B}` }}>
              <img src="/gallery/art.png" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Art Installation" />
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ gridColumn: "span 1", gridRow: "span 2", borderRadius: 24, overflow: "hidden", border: `1px solid ${B}` }}>
              <img src="/gallery/abstract.png" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(0.2)" }} alt="Abstract perspective" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} style={{ gridColumn: "span 1", gridRow: "span 1", borderRadius: 24, overflow: "hidden", border: `1px solid ${B}` }}>
              <img src="/gallery/dancer.png" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(0.6)" }} alt="Performance aspect" />
            </motion.div>
          </div>
        </Soul>
      </div>
      <style>{`
        @media(max-width: 900px) {
          .gal-grid { grid-template-columns: 1fr 1fr !important; grid-auto-rows: 240px !important; gap: 8px !important; }
          .gal-grid > div:nth-child(1) { grid-column: span 2 !important; grid-row: span 2 !important; }
          .gal-grid > div:nth-child(2) { grid-column: span 1 !important; grid-row: span 1 !important; }
          .gal-grid > div:nth-child(3) { grid-column: span 2 !important; grid-row: span 2 !important; }
          .gal-grid > div:nth-child(4) { grid-column: span 1 !important; grid-row: span 1 !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── DETAILS & BENTO ────────────────────────────── */
function ExperienceDetails() {
  const { tokens: { A, AL, BG, FG, M, S, B, W } } = useTheme();
  const r = useRef(null);
  const { scrollYProgress } = useScroll({ target: r, offset: ["start end", "end start"] });

  return (
    <section id="details" ref={r} style={{ background: BG, padding: "180px 36px 130px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <SHdr idx="01" label="Overview" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="details-grid">
          <Soul delay={0.1} style={{ gridColumn: "span 2" }}>
            <div style={{ background: W, border: `1px solid ${B}`, padding: 48, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
               <div>
                 <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: A, marginBottom: 16, fontWeight: 600 }}>What We Do</p>
                 <h2 className="font-display" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, color: FG, lineHeight: 1.1, marginBottom: 24 }}>A Guided Journey</h2>
                 <p style={{ color: M, fontSize: 14, lineHeight: 1.8 }}>Be led through exclusive back-stage galleries, witness private modular synthesizer sets before doors open, and partake in a silent, synchronized art walk through The Grand Atrium.</p>
               </div>
            </div>
          </Soul>

          <Soul y={120} r={5} style={{ gridColumn: "span 1" }}>
            <div style={{ background: S, border: `1px solid ${B}`, padding: 48, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              <Clock size={28} color={A} style={{ marginBottom: 16 }} />
              <p style={{ fontSize: 24, fontWeight: 700, color: FG, marginBottom: 4 }}>2.5 Hrs</p>
              <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: M }}>Duration</p>
            </div>
          </Soul>

          <Soul y={120} r={-5} style={{ gridColumn: "span 1" }}>
            <div style={{ background: S, border: `1px solid ${B}`, padding: 48, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              <User size={28} color={A} style={{ marginBottom: 16 }} />
              <p style={{ fontSize: 24, fontWeight: 700, color: FG, marginBottom: 4 }}>18+</p>
              <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: M }}>Minimum Age</p>
            </div>
          </Soul>

          <Rev delay={0.4} style={{ gridColumn: "span 4" }}>
            <div style={{ background: W, border: `1px solid ${B}`, padding: "64px", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 80 }} className="details-inner">
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                 <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: A, marginBottom: 32, fontWeight: 600 }}>Included Add-ons</p>
                 <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                   <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.3 }} style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                     <div style={{ background: AL, width: 64, height: 64, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Camera size={24} color={A} /></div>
                     <div>
                       <p style={{ fontSize: 18, fontWeight: 700, color: FG, marginBottom: 8 }}>Film Camera Kit</p>
                       <p style={{ fontSize: 14, color: M, lineHeight: 1.6 }}>A professional-grade 35mm film kit to document your personal perspective through the lens of history.</p>
                     </div>
                   </motion.div>
                   <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.3 }} style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                     <div style={{ background: AL, width: 64, height: 64, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Coffee size={24} color={A} /></div>
                     <div>
                       <p style={{ fontSize: 18, fontWeight: 700, color: FG, marginBottom: 8 }}>Artisanal Refreshments</p>
                       <p style={{ fontSize: 14, color: M, lineHeight: 1.6 }}>Complimentary signature elixirs and curated bites served by our culinary partners in the private lounge.</p>
                     </div>
                   </motion.div>
                 </div>
              </div>

              <div>
                <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: M, marginBottom: 32, fontWeight: 600 }}>The Narrative Flow</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 40, position: "relative" }}>
                   <div style={{ position: "absolute", left: 7, top: 10, bottom: 10, width: 1, background: B }} />
                   
                   {/* Animated Progress Dot */}
                   <motion.div 
                     style={{ 
                       position: "absolute", left: 4, width: 7, height: 7, borderRadius: "50%", background: A, zIndex: 10,
                       boxShadow: `0 0 15px ${A}`,
                       top: useTransform(scrollYProgress, [0.35, 0.65], ["0%", "100%"])
                     }} 
                   />

                   {[
                     { time: "04:00 PM", text: "Priority Entry & Welcome Lounge", sub: "Skip the lines and enter through the heritage gate." },
                     { time: "04:30 PM", text: "Backstage Sonic Tour", sub: "Explore the internal architecture and stage mechanics." },
                     { time: "05:15 PM", text: "Exclusive Visual Arts Preview", sub: "A private first-look at the curated gallery installations." },
                     { time: "06:00 PM", text: "Event Opening Sequence", sub: "Witness the transition as the first notes break the silence." }
                   ].map((it, i) => (
                     <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 + 0.4 }}
                        whileHover={{ x: 10 }}
                        style={{ display: "flex", gap: 32, alignItems: "flex-start", zIndex: 1, cursor: "default" }}>
                       <div style={{ width: 15, height: 15, borderRadius: "50%", background: W, border: `3px solid ${A}`, marginTop: 6, flexShrink: 0 }} />
                       <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                         <div style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
                            <span style={{ fontSize: 12, fontWeight: 800, color: A, fontFamily: "monospace" }}>{it.time}</span>
                            <span className="font-display" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 700, color: FG }}>{it.text}</span>
                         </div>
                         <p style={{ fontSize: 13, color: M }}>{it.sub}</p>
                       </div>
                     </motion.div>
                   ))}
                </div>
              </div>
            </div>
          </Rev>
        </div>
      </div>
      <style>{`
        @media(max-width: 1024px) {
          .details-grid { grid-template-columns: 1fr 1fr !important; }
          .details-inner { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media(max-width: 640px) {
          .details-grid { grid-template-columns: 1fr !important; }
          .details-grid > div { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── PREPARATION ────────────────────────────────── */
function Preparation() {
  const { tokens: { A, AL, BG, FG, M, S, B, W } } = useTheme();

  return (
    <section style={{ background: W, padding: "130px 36px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <SHdr idx="02" label="Preparation" />
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }} className="prep-grid">
           <Rev delay={0.1}>
             <h3 className="font-display" style={{ fontSize: "clamp(2rem,3vw,2.5rem)", fontWeight: 700, color: FG, marginBottom: 32 }}>Meeting Point</h3>
             <div style={{ background: S, border: `1px solid ${B}`, padding: 40, display: "flex", flexDirection: "column", gap: 16 }}>
               <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                 <MapPin size={20} color={A} />
                 <div>
                   <p style={{ fontSize: 14, fontWeight: 700, color: FG }}>East Annex, The Grand Atrium</p>
                   <p style={{ fontSize: 13, color: M, marginTop: 4 }}>Arrive via Gate 3 (Private Entrance). Our concierge will meet you at the inner courtyard.</p>
                 </div>
               </div>
               <div style={{ background: W, border: `1px solid ${B}`, height: 200, marginTop: 16, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${A}18 1px,transparent 1px),linear-gradient(90deg,${A}18 1px,transparent 1px)`, backgroundSize: "20px 20px" }} />
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 12, height: 12, background: A, borderRadius: "50%" }}>
                    <motion.div animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: "absolute", inset: "-6px", border: `2px solid ${A}`, borderRadius: "50%" }} />
                  </div>
               </div>
             </div>
           </Rev>

           <Rev delay={0.2}>
             <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
               <div>
                 <h3 className="font-display" style={{ fontSize: "clamp(2rem,3vw,2.5rem)", fontWeight: 700, color: FG, marginBottom: 24 }}>Requirements</h3>
                 <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                   {["Government-issued Photo ID (18+ Mandatory)", "Valid Solstice Event Ticket", "Comfortable walking shoes format"].map(item => (
                     <li key={item} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <div style={{ width: 6, height: 6, background: A }} />
                        <span style={{ fontSize: 13, color: M }}>{item}</span>
                     </li>
                   ))}
                 </ul>
               </div>

               <div>
                 <h3 className="font-display" style={{ fontSize: "clamp(2rem,3vw,2.5rem)", fontWeight: 700, color: FG, marginBottom: 24 }}>What To Bring</h3>
                 <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                   {["Curiosity and an open mind", "A tiny bag (large bags must be checked in)", "Your smartphone for digital itinerary access"].map(item => (
                     <li key={item} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <div style={{ width: 6, height: 6, background: A }} />
                        <span style={{ fontSize: 13, color: M }}>{item}</span>
                     </li>
                   ))}
                 </ul>
               </div>
             </div>
           </Rev>
        </div>
      </div>
      <style>{`@media(max-width: 768px) { .prep-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  );
}

/* ─── HOST & REVIEWS ─────────────────────────────── */
function HostAndReviews() {
  const { tokens: { A, AL, BG, FG, M, S, B, W } } = useTheme();
  
  return (
    <>
      <Mq items={["Extraordinary", "Immersive", "Redefined Connection", "Unforgettable", "Masterfully Curated"]} size="xl" bg={S} />
      <section style={{ background: BG, padding: "130px 36px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="host-grid">
           
           <Rev delay={0.1}>
             <SHdr idx="03" label="The Host" />
             <div style={{ padding: 48, background: W, border: `1px solid ${B}` }}>
               <img src="/gallery/dancer.png" alt="Host" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", marginBottom: 24, filter: "grayscale(1)" }} />
               <h3 className="font-display" style={{ fontSize: "2rem", fontWeight: 700, color: FG, marginBottom: 8 }}>Elias Vane</h3>
               <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: A, marginBottom: 24 }}>Lead Curator, Namma Studio</p>
               <p style={{ fontSize: 13, color: M, lineHeight: 1.8 }}>Elias has spent the last decade designing spaces where sound and architecture bleed into one another. He will personally guide the Experience group through the unseen veins of The Grand Atrium, offering context and narrative to every installation.</p>
             </div>
           </Rev>

           <Rev delay={0.2}>
             <SHdr idx="04" label="Testimonials" />
             <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { q: "A completely transcendent journey. It changes the way you look at a festival entirely.", a: "Vogue India" },
                  { q: "The curation was intensely personal. Every corner held a secret waiting to be unlocked.", a: "GQ" },
                  { q: "Rarely do events deliver on the promise of 'immersion' — this exceeded it.", a: "Rolling Stone" }
                ].map((rev, i) => (
                  <div key={i} style={{ padding: 32, background: S, border: `1px solid ${B}` }}>
                    <p style={{ fontSize: 14, fontStyle: "italic", color: FG, lineHeight: 1.7, marginBottom: 16 }}>&ldquo;{rev.q}&rdquo;</p>
                    <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: M }}>— {rev.a}</p>
                  </div>
                ))}
             </div>
           </Rev>
        </div>
      </section>
      <style>{`@media(max-width: 900px) { .host-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}

/* ─── POLICIES ───────────────────────────────────── */
const POLICIES = [
  { id: 1, title: "Punctuality", body: "The Experience begins precisely at 4:00 PM. Late arrivals will not be accommodated and will forfeit their add-on pass without refund to prevent disruption to the group." },
  { id: 2, title: "Cancellation Policy", body: "Experience add-ons are fully refundable up to 72 hours before the event. Any cancellations within 72 hours of the event are non-refundable. Transfers are permitted up to 24 hours prior." },
  { id: 3, title: "Respect The Art", body: "Please do not touch any installations or equipment during the backstage tour unless explicitly invited to do so by the host." },
  { id: 4, title: "Photography", body: "Use only the disposable cameras provided. Digital phones and personal cameras must be kept away during the guided tour to ensure presence." },
];

function PolicyItem({ rule }: { rule: typeof POLICIES[0] }) {
  const { tokens: { A, AL, FG, M, B } } = useTheme();
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
      <motion.div initial={false} animate={{ height: op ? "auto" : 0, opacity: op ? 1 : 0 }} style={{ overflow: "hidden" }}>
        <p style={{ padding: "0 16px 22px 60px", fontSize: 13, color: M, lineHeight: 1.85, maxWidth: 580 }}>{rule.body}</p>
      </motion.div>
    </motion.div>
  );
}

function ExperiencePolicies() {
  const { tokens: { FG, W, B } } = useTheme();
  return (
    <section style={{ background: W, padding: "130px 36px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <SHdr idx="05" label="Rules & Policies" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 80 }} className="pol-grid">
          <Rev delay={0.1}>
            <Chars text="Know" cls="font-display" style={{ fontSize: "clamp(3.5rem,8vw,5.5rem)", fontWeight: 700, lineHeight: 0.9, color: FG, letterSpacing: "-0.02em" }} />
            <Chars text="Before" delay={0.1} cls="font-display" style={{ fontSize: "clamp(3.5rem,8vw,5.5rem)", fontWeight: 700, lineHeight: 0.9, color: FG, letterSpacing: "-0.02em" }} />
            <Chars text="You go." delay={0.2} cls="font-display" style={{ fontSize: "clamp(3.5rem,8vw,5.5rem)", fontWeight: 700, lineHeight: 0.9, color: "transparent", WebkitTextStroke: "1px #8C8C88", letterSpacing: "-0.02em", marginTop: 16 }} />
          </Rev>
          <Rev delay={0.2}>
            <div style={{ borderTop: `1px solid ${B}` }}>
              {POLICIES.map(p => <PolicyItem key={p.id} rule={p} />)}
            </div>
          </Rev>
        </div>
      </div>
      <style>{`@media(max-width: 800px) { .pol-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  );
}

/* ─── PAGE ───────────────────────────────────────── */
export default function ExperiencePage() {
  const { tokens: { BG } } = useTheme();
  return (
    <>
      <Cursor />
      <ProgressBar />
      <Navbar />
      <main>
        <HeroExperience />
        <Mq items={["Artistic Evolution", "Deep Immersion", "Sonic Archeology"]} size="sm" bg={BG} />
        <ExperienceGallery />
        <Mq items={["Artistic Evolution", "Deep Immersion", "Sonic Archeology", "Aura Collective"]} bg={BG} />
        <ExperienceDetails />
        <Mq items={["Curated Staging", "Atmospheric Prep", "Sonic Calibration"]} size="sm" bg={BG} />
        <Preparation />
        <Mq items={["Aura Collective", "Global Perspective", "Immersive Reviews"]} size="sm" bg={BG} />
        <HostAndReviews />
        <Mq items={["Event Governance", "Safety Architecture", "Respectful Connection"]} size="sm" bg={BG} />
        <ExperiencePolicies />
      </main>
      <Footer />
    </>
  );
}
