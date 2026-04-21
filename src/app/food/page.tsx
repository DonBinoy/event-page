"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Utensils, Star, Clock, MapPin, ChefHat, Award, Leaf, Globe, Coffee, Info, ChevronRight, Phone, Instagram, Check } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { useTheme } from "../../components/Theme";
import { Cursor, ProgressBar, Rev, Chars, SHdr, E, Soul, Mq } from "../../components/UI";

/* ─── DATA ────────────────────────────────────────── */
const DISHES = [
  { id: "01", name: "Seared Atlantic Scallops", price: "$42", rating: 4.9, cuisine: "Modern Fusion", tags: ["Signature", "Seafood"], img: "venue.png", desc: "Nitrogen-infused foam, micro-cilantro, and a hint of smoked saffron." },
  { id: "02", name: "Aged Wagyu Carpaccio", price: "$58", rating: 4.8, cuisine: "Japanese Influence", tags: ["Chef's Pick", "Aged"], img: "art.png", desc: "30-day dry-aged wagyu with truffle emulsion and gold leaf accents." },
  { id: "03", name: "Deconstructed Saffron Risotto", price: "$34", rating: 4.7, cuisine: "Heritage Indian", tags: ["Vegetarian", "Classic"], img: "abstract.png", desc: "Parmesan crisps, infused heirloom broth, and slow-cooked arborio." },
];

const SPECS = [
  { icon: Globe, label: "Cuisine", value: "Global Fusion" },
  { icon: Leaf, label: "Philosophy", value: "Farm to Table" },
  { icon: Star, label: "Experience", value: "Aura Certified" },
  { icon: Award, label: "Accolades", value: "2 Michelin Star" },
];

/* ─── CULINARY HERO (NOIR) ───────────────────────── */
function CulinaryHero() {
  const { tokens: { A, FG, M, W, B, BG } } = useTheme();
  const r = useRef(null);
  const { scrollYProgress } = useScroll({ target: r, offset: ["start start", "end start"] });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={r} style={{ position: "relative", minHeight: "130vh", background: BG, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      {/* Background Kinetic Text */}
      <motion.div style={{ position: "absolute", top: "50%", left: "50%", x: "-50%", y: "-50%", opacity: 0.04, whiteSpace: "nowrap", pointerEvents: "none" }}>
        <h1 className="font-display" style={{ fontSize: "60vw", color: FG, fontWeight: 900, letterSpacing: "-0.05em" }}>GASTRO</h1>
      </motion.div>

      {/* Floating Image Stack */}
      <div style={{ position: "relative", width: "100%", maxWidth: 1400, height: 800, margin: "0 auto", zIndex: 5 }}>
        <motion.div style={{ y: y1, scale, position: "absolute", top: "10%", left: "15%", width: 320, height: 460, borderRadius: 24, overflow: "hidden", border: `1px solid ${B}`, boxShadow: "0 50px 100px rgba(0,0,0,0.2)" }}>
          <img src="/gallery/venue.png" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.8) contrast(1.2)" }} alt="" />
        </motion.div>
        
        <motion.div style={{ y: y2, position: "absolute", top: "30%", right: "10%", width: 440, height: 580, borderRadius: 24, overflow: "hidden", border: `1px solid ${B}`, boxShadow: "0 50px 100px rgba(0,0,0,0.2)" }}>
          <img src="/gallery/art.png" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7) sepia(0.2)" }} alt="" />
        </motion.div>

        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", zIndex: 10 }}>
           <p style={{ fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase", color: A, fontWeight: 700, marginBottom: 24 }}>Edition 01 — Culinary Narrative</p>
           <h1 className="font-display" style={{ fontSize: "clamp(5rem, 15vw, 12rem)", fontWeight: 700, color: FG, lineHeight: 0.85, letterSpacing: "-0.04em", margin: 0 }}>THE <br/><span style={{ color: "transparent", WebkitTextStroke: `1px ${FG}` }}>KITCHEN</span></h1>
           <motion.div initial={{ width: 0 }} animate={{ width: 100 }} transition={{ duration: 1, delay: 0.5 }} style={{ height: 2, background: A, margin: "40px auto" }} />
        </div>
      </div>
      
      <div style={{ position: "absolute", bottom: 80, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 64, opacity: 0.4 }}>
         {["MOLECULAR", "HERITAGE", "AVANT-GARDE"].map(t => (
           <span key={t} style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: FG, fontWeight: 600 }}>{t}</span>
         ))}
      </div>
    </section>
  );
}

/* ─── THE VISIONARY (PARALLAX TEXT) ──────────────── */
function ChefSection() {
  const { tokens: { A, FG, M, W, B, S, AL, BG } } = useTheme();
  const r = useRef(null);
  const { scrollYProgress } = useScroll({ target: r, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);

  return (
    <section ref={r} style={{ background: BG, padding: "200px 0", overflow: "hidden", position: "relative", borderTop: `1px solid ${B}` }}>
      <motion.div style={{ x, position: "absolute", top: "40%", left: 0, whiteSpace: "nowrap", opacity: 0.05, pointerEvents: "none" }}>
        <h2 className="font-display" style={{ fontSize: "30vw", color: FG, fontWeight: 900 }}>TECHNO HERITAGE</h2>
      </motion.div>

      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 36px", position: "relative", zIndex: 2 }}>
         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 120, alignItems: "center" }} className="chef-grid">
            <Soul r={-5} s={0.1}>
               <div style={{ background: S, borderRadius: 40, height: 750, overflow: "hidden", border: `1px solid ${B}` }}>
                 <img src="/gallery/dancer.png" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) brightness(0.8)" }} alt="Chef Aris Thorne" />
               </div>
            </Soul>
            
            <div>
               <p style={{ fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: A, fontWeight: 700, marginBottom: 32 }}>Curator of Taste</p>
               <h2 className="font-display" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 700, color: FG, lineHeight: 1, marginBottom: 44 }}>Engineering <br/><span style={{ color: A }}>Sensory Architecture.</span></h2>
               <p style={{ fontSize: 18, color: M, lineHeight: 1.8, marginBottom: 48, maxWidth: 500 }}>
                 &ldquo;We don't just serve food; we orchestrate biological responses. In our kitchen, heritage secrets meet high-pressure laboratory physics.&rdquo;
               </p>
               
               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
                  {[
                    { label: "Founded", value: "Aura Lab 2024" },
                    { label: "Vision", value: "Circular Gastronomy" },
                    { label: "Focus", value: "Sonic Plating" },
                    { label: "Origin", value: "Varkala Cliff" }
                  ].map(it => (
                    <div key={it.label}>
                       <p style={{ fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: A, marginBottom: 8, fontWeight: 700 }}>{it.label}</p>
                       <p style={{ fontSize: 14, fontWeight: 600, color: FG }}>{it.value}</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </section>
  );
}

/* ─── THE DISH SUITE (HORIZONTAL VARIETY) ─────────── */
function DishGallery() {
  const { tokens: { A, FG, M, BG, S, B } } = useTheme();
  
  return (
    <section style={{ background: BG, padding: "180px 0", borderTop: `1px solid ${B}` }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 36px", marginBottom: 80 }}>
        <SHdr idx="02" label="Signature Expressions" />
      </div>
      
      <div style={{ display: "flex", gap: 40, overflowX: "auto", padding: "0 5vw 80px", scrollbarWidth: "none" }} className="dish-scroll">
         {DISHES.map((dish, i) => (
           <Soul key={dish.id} delay={i * 0.1} y={40} r={3} style={{ flexShrink: 0, width: "clamp(300px, 40vw, 500px)" }}>
             <motion.div whileHover={{ scale: 1.02 }} style={{ background: S, border: `1px solid ${B}`, borderRadius: 32, overflow: "hidden" }}>
                <div style={{ height: 550, overflow: "hidden", position: "relative" }}>
                   <img src={`/gallery/${dish.img}`} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.9)" }} alt="" />
                   <div style={{ position: "absolute", bottom: 32, left: 32, right: 32, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                      <div>
                        <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: A, fontWeight: 700, marginBottom: 8 }}>{dish.cuisine}</p>
                        <h4 className="font-display" style={{ fontSize: 32, fontWeight: 700, color: FG }}>{dish.name}</h4>
                      </div>
                      <span style={{ fontSize: 24, fontWeight: 700, color: A }}>{dish.price}</span>
                   </div>
                </div>
                <div style={{ padding: 40 }}>
                   <p style={{ fontSize: 13, color: M, lineHeight: 1.7, marginBottom: 24 }}>{dish.desc}</p>
                   <div style={{ display: "flex", gap: 12 }}>
                      {dish.tags.map(t => (
                        <span key={t} style={{ fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: M, border: `1px solid ${B}`, padding: "5px 12px", borderRadius: 40 }}>{t}</span>
                      ))}
                   </div>
                </div>
             </motion.div>
           </Soul>
         ))}
      </div>
    </section>
  );
}

/* ─── RESERVATION NOIR ───────────────────────────── */
function ReservationNoir() {
  const { tokens: { A, FG, M, BG, S, B, AL } } = useTheme();

  return (
    <section style={{ background: BG, padding: "180px 36px", borderTop: `1px solid ${B}` }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
         <Soul y={120}>
            <div style={{ background: S, border: `1px solid ${B}`, borderRadius: 48, padding: 80, display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 80 }} className="res-grid">
               <div>
                  <h3 className="font-display" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 700, color: FG, marginBottom: 32 }}>Transcend the <br/><span style={{ color: A }}>Standard Meal.</span></h3>
                  <p style={{ fontSize: 16, color: M, lineHeight: 1.8, maxWidth: 450, marginBottom: 56 }}>
                     Our tables are finite. The experience is infinite. We require 48-hour prior notification for the bespoke molecular taster menu.
                  </p>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
                     <div>
                        <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: A, fontWeight: 700, marginBottom: 20 }}>Dine-In Sessions</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                           <p style={{ fontSize: 14, color: FG, fontWeight: 600 }}>01:00 PM — 04:00 PM</p>
                           <p style={{ fontSize: 14, color: FG, fontWeight: 600 }}>07:30 PM — 11:45 PM</p>
                        </div>
                     </div>
                     <div>
                        <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: A, fontWeight: 700, marginBottom: 20 }}>Hotline</p>
                        <p style={{ fontSize: 24, color: FG, fontWeight: 700 }}>+91 88 22 910 00</p>
                     </div>
                  </div>
               </div>
               
               <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ background: AL, borderRadius: 32, padding: 48, border: `1px solid ${B}` }}>
                     <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: M, marginBottom: 24 }}>Official Partnership</p>
                     <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {["Molecular Dining", "Sonic Pairings", "Heritage Archives", "Avant Delivery"].map(t => (
                          <div key={t} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                             <div style={{ width: 6, height: 6, borderRadius: "50%", background: A }} />
                             <span style={{ fontSize: 14, color: FG, fontWeight: 500 }}>{t}</span>
                          </div>
                        ))}
                     </div>
                     <motion.button whileHover={{ scale: 1.02 }} style={{ width: "100%", marginTop: 40, background: A, color: "#fff", border: "none", borderRadius: 12, padding: "18px", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, cursor: "pointer" }}>
                        Check Availability
                     </motion.button>
                  </div>
               </div>
            </div>
         </Soul>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .res-grid { grid-template-columns: 1fr !important; padding: 48px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────── */
export default function CulinaryPage() {
  const { tokens: { BG, S } } = useTheme();
  return (
    <main style={{ minHeight: "100vh", background: BG }}>
      <ProgressBar />
      <Cursor />
      <Navbar />
      
      <CulinaryHero />
      <Mq items={["Avant Cuisine", "Molecular Art", "Sonic Plating"]} size="sm" bg={S} />
      <ChefSection />
      <Mq items={["Culinary Arts", "Molecular Gastronomy", "Sonic Plating", "Heritage Taste"]} bg={S} />
      <DishGallery />
      <Mq items={["Bespoke Reservations", "Curated Palette", "Liquid Alchemy"]} size="sm" bg={S} />
      <ReservationNoir />
      
      <Footer />
    </main>
  );
}


