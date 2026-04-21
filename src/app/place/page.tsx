"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MapPin, Clock, Ticket, Star, Calendar, ArrowDown, ExternalLink, Map, Navigation, Phone, Globe, Send, Info, User, Check, XCircle, Briefcase } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { useTheme } from "../../components/Theme";
import { Cursor, ProgressBar, Rev, Chars, SHdr, E, Soul, Mq } from "../../components/UI";

/* ─── KINETIC VARIETY HERO ──────────────────────── */
const ROW_1 = [
  { src: "venue.png", w: 320, h: 420 },
  { src: "abstract.png", w: 450, h: 300 },
  { src: "dancer.png", w: 280, h: 380 },
  { src: "art.png", w: 400, h: 500 },
];
const ROW_2 = [
  { src: "concert.png", w: 480, h: 320 },
  { src: "crowd.png", w: 300, h: 400 },
  { src: "venue.png", w: 350, h: 450 },
  { src: "abstract.png", w: 420, h: 280 },
];

function PlaceHero() {
  const { tokens: { A, FG, M, W, B } } = useTheme();
  const r = useRef(null);
  const { scrollYProgress } = useScroll({ target: r, offset: ["start start", "end start"] });
  
  const baseX = useMotionValue(0);
  const [drag, setDrag] = useState(false);

  useAnimationFrame((t, delta) => {
    if (!drag) {
      baseX.set(baseX.get() - delta * 0.04);
    }
  });

  const x1 = useTransform(baseX, (v) => {
    const range = 1800; // block width
    return `${((v % range) - range) % range}px`;
  });
  
  const x2 = useTransform(baseX, (v) => {
    const range = 1800;
    return `${((-v * 0.7 % range) - range) % range}px`;
  });

  const items1 = [...ROW_1, ...ROW_1, ...ROW_1];
  const items2 = [...ROW_2, ...ROW_2, ...ROW_2];

  return (
    <section ref={r} style={{ position: "relative", minHeight: "100vh", background: W, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {/* Background Text Decor */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", opacity: 0.03, overflow: "hidden" }}>
         <motion.h1 
           className="font-display"
           style={{ 
             scale: useTransform(scrollYProgress, [0, 0.5], [1, 1.5]), 
             rotate: useTransform(scrollYProgress, [0, 0.5], [0, 5]),
             fontSize: "50vw", 
             fontWeight: 900, 
             color: FG 
           }}
         >
           VARKALA
         </motion.h1>
      </div>

      {/* Kinetic Ribbons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 32, position: "relative", zIndex: 10 }}>
        
        {/* Row 1 */}
        <motion.div style={{ x: x1, y: useTransform(scrollYProgress, [0, 0.3], [0, -40]), display: "flex", gap: 32, paddingLeft: 32 }}>
          {items1.map((img, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05, rotate: 1, zIndex: 100 }} style={{ flexShrink: 0, width: img.w, height: img.h, borderRadius: 24, overflow: "hidden", border: `1px solid ${B}`, boxShadow: "0 30px 60px -15px rgba(0,0,0,0.2)", transition: "transform 0.4s" }}>
              <img src={`/gallery/${img.src}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
            </motion.div>
          ))}
        </motion.div>

        {/* Text Overlay Section (Z-index 50) */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 50, pointerEvents: "none" }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: E }} style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(60px)", padding: "64px 100px", borderRadius: 40, border: `1px solid ${B}`, textAlign: "center", boxShadow: "0 60px 120px -20px rgba(0,0,0,0.18)" }}>
            <p className="font-mono" style={{ fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: A, fontWeight: 700, marginBottom: 16 }}>Kerala's Coastal Gem</p>
            <Chars text="VARKALA CLIFF" cls="font-display" style={{ fontSize: "clamp(3.5rem, 11vw, 8rem)", fontWeight: 700, color: FG, lineHeight: 1, letterSpacing: "-0.04em", margin: 0 }} />
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32, pointerEvents: "auto" }}>
              {["Azure Beach", "Red Laterite", "Golden Sunset"].map(tag => (
                <motion.span key={tag} whileHover={{ background: A, color: W, borderColor: A }} style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: M, border: `1px solid ${B}`, padding: "8px 20px", borderRadius: 40, background: W, transition: "all 0.3s" }}>{tag}</motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Row 2 */}
        <motion.div style={{ x: x2, y: useTransform(scrollYProgress, [0, 0.3], [0, 40]), display: "flex", gap: 32, paddingLeft: 100 }}>
          {items2.map((img, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05, rotate: -1, zIndex: 100 }} style={{ flexShrink: 0, width: img.w, height: img.h, borderRadius: 24, overflow: "hidden", border: `1px solid ${B}`, boxShadow: "0 30px 60px -15px rgba(0,0,0,0.2)", transition: "transform 0.4s" }}>
              <img src={`/gallery/${img.src}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Invisible Pan Overlay */}
      <motion.div
        onPan={(e, info) => baseX.set(baseX.get() + info.delta.x)}
        onPanStart={() => setDrag(true)}
        onPanEnd={() => setDrag(false)}
        style={{ position: "absolute", inset: 0, zIndex: 100, cursor: drag ? "grabbing" : "grab" }}
      />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        style={{ position: "absolute", bottom: 40, left: "50%", x: "-50%", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 60 }}>
        <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: M }}>Discover more</span>
        <ArrowDown size={14} color={A} />
      </motion.div>
    </section>
  );
}

/* ─── QUICK FACTS ────────────────────────────────── */
function QuickFacts() {
  const { tokens: { A, B, FG, M, S, W } } = useTheme();
  const facts = [
    { label: "Timings", val: "06:00 - 20:00", icon: Clock },
    { label: "Entry Fee", val: "Free Entry", icon: Ticket },
    { label: "Best Time", val: "Evening / Sunset", icon: Star },
    { label: "Rating", val: "4.8 User Rating", icon: Check },
  ];

  return (
    <section style={{ background: S, borderTop: `1px solid ${B}`, borderBottom: `1px solid ${B}`, padding: "40px 36px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <Soul y={50} s={0.02}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
            {facts.map((f, i) => (
              <Rev key={f.label} delay={i * 0.1}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ background: W, width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${B}` }}>
                    <f.icon size={18} color={A} />
                  </div>
                  <div>
                    <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: M, marginBottom: 2 }}>{f.label}</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: FG }}>{f.val}</p>
                  </div>
                </div>
              </Rev>
            ))}
          </div>
        </Soul>
      </div>
    </section>
  );
}

/* ─── ABOUT VARKALA ──────────────────────────────── */
function DestAbout() {
  const { tokens: { A, FG, M, B, W } } = useTheme();
  return (
    <section style={{ background: W, padding: "140px 36px 80px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <Soul y={100} s={0.05}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 100 }} className="about-grid">
            <Rev>
              <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: A, fontWeight: 700, marginBottom: 24 }}>The Red Laterite Majesty</p>
              <h2 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: FG, lineHeight: 1.1, marginBottom: 32 }}>
                Where the cliff meets the Arabian Sea.
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {["Couples", "Solo Travelers", "Backpackers", "Yoga Enthusiasts"].map(tag => (
                  <div key={tag} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "#f8f8f8", borderRadius: 8, border: `1px solid ${B}` }}>
                    <User size={12} color={A} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: FG }}>{tag}</span>
                  </div>
                ))}
              </div>
            </Rev>
            <Rev delay={0.2}>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: M, marginBottom: 32 }}>
                Varkala Cliff, also known as Papanasam Beach, is a stunning coastal paradise in Kerala famous for its dramatic red laterite cliffs rising majestically from the Arabian Sea. The cliff top is lined with palm trees, beach shacks, cafes, and yoga centers offering breathtaking ocean views.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: M }}>
                The natural mineral springs flowing from the cliffs are believed to contain medicinal properties. Perfect for beach lovers, spiritual seekers, and sunset enthusiasts alike.
              </p>
              <div style={{ marginTop: 40, borderTop: `1px solid ${B}`, paddingTop: 32, display: "flex", gap: 40 }}>
                <div>
                  <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: M, marginBottom: 6 }}>Distance</p>
                  <p style={{ fontSize: 16, fontWeight: 700, color: FG }}>2 km <span style={{ fontSize: 12, color: M, fontWeight: 400 }}>from Town</span></p>
                </div>
                <div>
                  <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: M, marginBottom: 6 }}>Visit Duration</p>
                  <p style={{ fontSize: 16, fontWeight: 700, color: FG }}>3h 00m</p>
                </div>
              </div>
            </Rev>
          </div>
        </Soul>
      </div>
      <style>{`@media(max-width: 900px) { .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  );
}

/* ─── ITINERARY ──────────────────────────────────── */
const STEPS = [
  { id: "Step 1", title: "North Cliff Walk", desc: "Begin your journey along the bustling North Cliff pathway lined with cafes, boutiques, and handicraft shops. Enjoy panoramic views of the Arabian Sea stretching endlessly." },
  { id: "Step 2", title: "Papanasam Beach", desc: "Descend the cliff stairs to reach the pristine golden sands of Papanasam Beach. Take a dip in the mineral-rich waters believed to wash away sins and ailments." },
  { id: "Step 3", title: "Sunset Point", desc: "End your day at the cliff's edge watching the sun paint the sky in hues of orange and pink as it sets into the Arabian Sea. A truly magical experience." },
];

function Itinerary() {
  const { tokens: { A, B, FG, M, W, S } } = useTheme();
  return (
    <section style={{ background: S, padding: "120px 36px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <SHdr idx="01" label="Highlights & Itinerary" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
          {STEPS.map((s, i) => (
            <Soul key={s.id} delay={i * 0.15} y={80} r={i % 2 === 0 ? 3 : -3}>
              <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.4 }} style={{ background: W, border: `1px solid ${B}`, borderRadius: 32, padding: "56px 48px", height: "100%", position: "relative", overflow: "hidden" }}>
                <span className="font-display" style={{ position: "absolute", top: -10, right: 10, fontSize: "clamp(5rem, 8vw, 10rem)", fontWeight: 800, color: A, opacity: 0.04, pointerEvents: "none" }}>{i + 1}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                   <div style={{ width: 8, height: 8, background: A }} />
                   <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: A, fontWeight: 700 }}>Step {i + 1}</p>
                </div>
                <h3 className="font-display" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontWeight: 700, color: FG, marginBottom: 20 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: M, lineHeight: 1.85 }}>{s.desc}</p>
              </motion.div>
            </Soul>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── GOOD TO KNOW + FEEDBACK ────────────────────── */
function GoodToKnow() {
  const { tokens: { A, B, FG, M, W, AL } } = useTheme();
  return (
    <section style={{ background: W, padding: "120px 36px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 100 }} className="info-grid">
        <Rev>
          <SHdr idx="02" label="Good To Know" />
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
             <div>
               <h4 style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13, fontWeight: 700, color: FG, marginBottom: 20 }}>
                 <Briefcase size={16} color={A} /> What to Carry
               </h4>
               <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                 {["Swimwear", "Sunscreen", "Beach towel", "Sunglasses", "Cotton clothes", "Water bottle"].map(item => (
                   <li key={item} style={{ fontSize: 13, color: M, display: "flex", alignItems: "center", gap: 8 }}>
                     <div style={{ width: 4, height: 4, borderRadius: "50%", background: A }} /> {item}
                   </li>
                 ))}
               </ul>
             </div>
             <div style={{ background: "#fff5f5", border: "1px solid #fee2e2", padding: 32, borderRadius: 20 }}>
               <h4 style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13, fontWeight: 700, color: "#991b1b", marginBottom: 16 }}>
                 <XCircle size={16} color="#ef4444" /> Things to Avoid
               </h4>
               <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                 {["Littering on the cliff or beach", "Swimming during high tide warnings", "Disrespecting near religious sites"].map(item => (
                   <li key={item} style={{ fontSize: 12, color: "#b91c1c", display: "flex", alignItems: "center", gap: 8 }}>
                     <XCircle size={10} /> {item}
                   </li>
                 ))}
               </ul>
             </div>
          </div>
        </Rev>

        <Rev delay={0.2}>
          <div style={{ background: "#f8f8f8", border: `1px solid ${B}`, borderRadius: 32, padding: 48 }}>
             <h3 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: FG, marginBottom: 12 }}>What's New Here?</h3>
             <p style={{ fontSize: 12, color: M, marginBottom: 24 }}>Have updates? Share corrections, suggestions, or your recent experience with us.</p>
             <textarea 
               placeholder="Share your updates, corrections, or comments..."
               style={{ width: "100%", height: 120, background: W, border: `1px solid ${B}`, borderRadius: 12, padding: 16, fontSize: 13, marginBottom: 20, outline: "none", fontFamily: "inherit" }}
               onFocus={e => e.currentTarget.style.borderColor = A}
               onBlur={e => e.currentTarget.style.borderColor = B}
             />
             <motion.button className="shimmer-cta" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
               style={{ width: "100%", padding: 16, border: "none", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
               Submit Feedback
             </motion.button>
             <p style={{ fontSize: 10, color: M, marginTop: 16, textAlign: "center" }}>Your feedback helps keep information accurate and up-to-date.</p>
          </div>
        </Rev>
      </div>
      <style>{`@media(max-width: 900px) { .info-grid { grid-template-columns: 1fr !important; gap: 64px !important; } }`}</style>
    </section>
  );
}

/* ─── LOGISTICS & CONTACT ────────────────────────── */
function Logistics() {
  const { tokens: { A, B, FG, M, W, S } } = useTheme();
  return (
    <section style={{ background: S, padding: "120px 36px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 100 }} className="log-grid">
           <Rev>
             <SHdr idx="03" label="Location & Access" />
             <div style={{ background: W, border: `1px solid ${B}`, borderRadius: 24, padding: 48 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
                  <div>
                    <h4 style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: M, marginBottom: 8 }}>Address</h4>
                    <p style={{ fontSize: 14, color: FG, fontWeight: 600, maxWidth: 300 }}>Varkala Beach Road, North Cliff, Varkala, Thiruvananthapuram, Kerala, 695141</p>
                  </div>
                  <motion.a whileHover={{ scale: 1.1 }} href="#" style={{ background: A, width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                    <Navigation size={18} color={W} />
                  </motion.a>
                </div>
                <div style={{ borderTop: `1px solid ${B}`, paddingTop: 32 }}>
                  <h4 style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: M, marginBottom: 20 }}>Getting There</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[
                      { l: "Varkala Town", d: "2 km" },
                      { l: "Varkala Sivagiri", d: "3 km" },
                      { l: "Trivandrum International Airport", d: "40 km" },
                    ].map(loc => (
                      <div key={loc.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, color: M }}>{loc.l}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: FG }}>{loc.d}</span>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
           </Rev>

           <Rev delay={0.2}>
             <SHdr idx="04" label="Information" />
             <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                <div style={{ padding: 40, border: `1px solid ${B}`, borderRadius: 24, background: W }}>
                   <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: M, marginBottom: 20 }}>Managed By</p>
                   <h3 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: FG, marginBottom: 24 }}>Kerala Tourism Authority</h3>
                   <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <a href="#" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", fontSize: 13, color: FG, fontWeight: 500 }}>
                        <Phone size={15} color={A} /> +91 471 232 7132
                      </a>
                      <a href="#" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", fontSize: 13, color: FG, fontWeight: 500 }}>
                        <Globe size={15} color={A} /> Official Website
                      </a>
                   </div>
                </div>

                <div style={{ padding: 40, border: `1px solid ${B}`, borderRadius: 24, background: A, color: W }}>
                   <h4 style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>Season Guide</h4>
                   <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>October to March</p>
                   <p style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>Best Months for clear skies and calm waters.</p>
                </div>
             </div>
           </Rev>
        </div>
      </div>
      <style>{`@media(max-width: 900px) { .log-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  );
}

/* ─── PAGE ───────────────────────────────────────── */
export default function PlacePage() {
  const { tokens: { S } } = useTheme();
  return (
    <>
      <Cursor />
      <ProgressBar />
      <Navbar />
      <main>
        <PlaceHero />
        <Mq items={["Coastal Majesty", "Kerala Heritage", "Cliff Perspective"]} size="sm" bg={S} />
        <QuickFacts />
        <Mq items={["Varkala Cliff", "Arabian Sands", "Soulful Escape"]} size="sm" bg={S} />
        <DestAbout />
        <Mq items={["Coastal Majesty", "Kerala Heritage", "The Red Cliff", "Arabian Sands"]} bg={S} />
        <Itinerary />
        <Mq items={["Journey Blueprint", "Daily Rhythm", "The Itinerary"]} size="sm" bg={S} />
        <GoodToKnow />
        <Mq items={["Logistics Hub", "Safety Network", "Arrival Logic"]} size="sm" bg={S} />
        <Logistics />
      </main>
      <Footer />
    </>
  );
}
