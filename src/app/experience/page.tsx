"use client";

import { motion, useScroll, useTransform, useInView, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowDown, Check, Zap, MapPin, ChevronDown, Clock, User, Camera, Coffee } from "lucide-react";
import { useTheme } from "../../components/Theme";
import { Cursor, ProgressBar, Rev, Chars, Mq, SHdr, E } from "../../components/UI";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

/* ─── ARC CAROUSEL ───────────────────────────────── */
function ArcCarousel() {
  const { tokens: { B } } = useTheme();
  // We use our existing gallery images
  const imgs = ["abstract.png", "art.png", "concert.png", "crowd.png", "dancer.png", "venue.png"];
  // Triple the array to create a full circle of 18 items
  const items = [...imgs, ...imgs, ...imgs];
  
  const R = 800; // Radius of 800px creates a massive, sweeping arch
  
  const dragX = useMotionValue(0);
  const [hover, setHover] = useState(false);
  const [drag, setDrag] = useState(false);

  // Auto-move when not dragging or hovering
  useAnimationFrame((t, delta) => {
    if (!drag && !hover) {
      dragX.set(dragX.get() - delta * 0.03); // gentle auto-rotation
    }
  });

  // Map physical panning to a rotation degree
  const rotation = useTransform(dragX, v => v * 0.08);

  return (
    <div 
      style={{ position: "absolute", inset: 0, overflow: "hidden", display: "flex", justifyContent: "center" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Invisible Pan Target Overlay */}
      <motion.div
        onPan={(e, info) => dragX.set(dragX.get() + info.delta.x)}
        onPanStart={() => setDrag(true)}
        onPanEnd={() => setDrag(false)}
        style={{ position: "absolute", inset: 0, zIndex: 10, cursor: drag ? "grabbing" : "grab" }}
      />
      
      {/* Rotary Circle */}
      <motion.div
        style={{
          position: "absolute",
          width: R * 2,
          height: R * 2,
          bottom: -R + 250, // Center of circle is 250px above the bottom of the container
          rotate: rotation,
          zIndex: 1,
          pointerEvents: "none"
        }}
      >
        {items.map((src, i) => {
          const angle = i * 20; // 360 / 18 = 20 degrees
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                width: 260, height: 340,
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(${-R}px)`,
                borderRadius: 28,
                overflow: "hidden",
                border: `1px solid rgba(255, 255, 255, 0.15)`,
                boxShadow: "0 30px 60px -15px rgba(0,0,0,0.4)"
              }}
            >
               <img src={`/gallery/${src}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Carousel item" />
               <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }} />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ─── HERO ───────────────────────────────────────── */
function HeroExperience() {
  const { tokens: { A, BG, FG, M, S, B, W } } = useTheme();
  const r = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: r, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={r} style={{ position: "relative", minHeight: "90vh", background: W, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <motion.div style={{ y: bgY, opacity: fade, position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: 800, height: 800, borderRadius: "50%", background: `radial-gradient(circle, ${A}0c 0%, transparent 60%)` }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${A}08 1px, transparent 1px), linear-gradient(90deg, ${A}08 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      </motion.div>

      <ArcCarousel />

      {/* Adjusting the zIndex so text overlays the loop bottom */}
      <div style={{ position: "relative", zIndex: 20, maxWidth: 1320, margin: "0 auto", padding: "0 36px", width: "100%", paddingTop: 168, pointerEvents: "none" }}>
        {/* We disable pointerEvents on the container so the drag target behind it catches mouse moves, 
            but we re-enable it for the interactive bits below */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="font-mono" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: M, marginBottom: 12 }}>
          <span style={{ color: A }}>▸</span> Solstice Event Add-on
        </motion.p>
        
        <div style={{ overflow: "hidden" }}>
          <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: E, delay: 0.25 }}
            className="font-display" style={{ fontSize: "clamp(4.5rem,12vw,11rem)", fontWeight: 700, lineHeight: 0.86, color: FG, margin: 0, letterSpacing: "-0.03em" }}>
            THE
          </motion.h1>
        </div>
        <div style={{ overflow: "hidden" }}>
          <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: E, delay: 0.35 }}
            className="font-display" style={{ fontSize: "clamp(4.5rem,12vw,11rem)", fontWeight: 700, lineHeight: 0.86, color: "transparent", WebkitTextStroke: `2px ${A}`, margin: 0, letterSpacing: "-0.03em" }}>
            EXPERIENCE
          </motion.h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: E }}
          style={{ marginTop: 44, display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 24, paddingBottom: 64, pointerEvents: "auto" }}>
          <p style={{ maxWidth: 480, color: M, fontSize: 14, lineHeight: 1.8 }}>
            Dive deeper into the event. A curated, multi-sensory journey designed for those who want to interact with the art, the artists, and the atmosphere. Space is strictly limited.
          </p>
          <motion.a href="#details" whileHover={{ x: 6 }} style={{ display: "flex", alignItems: "center", gap: 8, color: A, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", fontWeight: 600, textDecoration: "none" }}>
            Discover <ArrowDown size={13} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── GALLERY ──────────────────────────────────────── */
function ExperienceGallery() {
  const { tokens: { W, B } } = useTheme();
  return (
    <section style={{ background: W, padding: "0 36px 60px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: 340, gap: 16 }} className="gal-grid">
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

  return (
    <section id="details" style={{ background: BG, padding: "180px 36px 130px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <SHdr idx="01" label="Overview" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="details-grid">
          <Rev delay={0.1} style={{ gridColumn: "span 2" }}>
            <div style={{ background: W, border: `1px solid ${B}`, padding: 48, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
               <div>
                 <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: A, marginBottom: 16, fontWeight: 600 }}>What We Do</p>
                 <h2 className="font-display" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, color: FG, lineHeight: 1.1, marginBottom: 24 }}>A Guided Journey</h2>
                 <p style={{ color: M, fontSize: 14, lineHeight: 1.8 }}>Be led through exclusive back-stage galleries, witness private modular synthesizer sets before doors open, and partake in a silent, synchronized art walk through The Grand Atrium.</p>
               </div>
            </div>
          </Rev>

          <Rev delay={0.2} style={{ gridColumn: "span 1" }}>
            <div style={{ background: S, border: `1px solid ${B}`, padding: 48, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              <Clock size={28} color={A} style={{ marginBottom: 16 }} />
              <p style={{ fontSize: 24, fontWeight: 700, color: FG, marginBottom: 4 }}>2.5 Hrs</p>
              <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: M }}>Duration</p>
            </div>
          </Rev>

          <Rev delay={0.3} style={{ gridColumn: "span 1" }}>
            <div style={{ background: S, border: `1px solid ${B}`, padding: 48, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              <User size={28} color={A} style={{ marginBottom: 16 }} />
              <p style={{ fontSize: 24, fontWeight: 700, color: FG, marginBottom: 4 }}>18+</p>
              <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: M }}>Minimum Age</p>
            </div>
          </Rev>

          <Rev delay={0.4} style={{ gridColumn: "span 4" }}>
            <div style={{ background: W, border: `1px solid ${B}`, padding: "48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
              <div>
                 <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: A, marginBottom: 24, fontWeight: 600 }}>Included Add-ons</p>
                 <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                   <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                     <div style={{ background: AL, padding: 12, borderRadius: "50%" }}><Camera size={18} color={A} /></div>
                     <div>
                       <p style={{ fontSize: 14, fontWeight: 600, color: FG, marginBottom: 4 }}>Film Camera Kit</p>
                       <p style={{ fontSize: 12, color: M, lineHeight: 1.6 }}>A loaded 35mm disposable camera to capture your perspective of the evening.</p>
                     </div>
                   </div>
                   <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                     <div style={{ background: AL, padding: 12, borderRadius: "50%" }}><Coffee size={18} color={A} /></div>
                     <div>
                       <p style={{ fontSize: 14, fontWeight: 600, color: FG, marginBottom: 4 }}>Curated Refreshments</p>
                       <p style={{ fontSize: 12, color: M, lineHeight: 1.6 }}>Artisanal snacks and complimentary signature beverages served in the private lounge.</p>
                     </div>
                   </div>
                 </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: M, marginBottom: 24, fontWeight: 600 }}>The Itinerary</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
                   <div style={{ position: "absolute", left: 5, top: 10, bottom: 10, width: 1, background: B }} />
                   {[
                     { time: "4:00 PM", text: "Priority Entry & Welcome Lounge" },
                     { time: "4:30 PM", text: "Backstage Sonic Tour" },
                     { time: "5:15 PM", text: "Exclusive Visual Arts Preview" },
                     { time: "6:00 PM", text: "Event Opening Sequence" }
                   ].map((it, i) => (
                     <div key={i} style={{ display: "flex", gap: 24, alignItems: "center", zIndex: 1 }}>
                       <div style={{ width: 11, height: 11, borderRadius: "50%", background: W, border: `2px solid ${A}` }} />
                       <div style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
                         <span style={{ fontSize: 12, fontWeight: 700, color: A, width: 60 }}>{it.time}</span>
                         <span style={{ fontSize: 13, color: FG }}>{it.text}</span>
                       </div>
                     </div>
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
          .details-grid > div:nth-child(4) > div { grid-template-columns: 1fr !important; gap: 32px !important; }
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
  return (
    <>
      <Cursor />
      <ProgressBar />
      <Navbar />
      <main>
        <HeroExperience />
        <ExperienceGallery />
        <ExperienceDetails />
        <Preparation />
        <HostAndReviews />
        <ExperiencePolicies />
      </main>
      <Footer />
    </>
  );
}
