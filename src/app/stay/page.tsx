"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useAnimationFrame } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Wifi, Waves, Sparkles, Dumbbell, Umbrella, Plane, GlassWater, Utensils, Phone, Clock, FileText, MapPin, ChevronDown, CheckCircle, Info } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { useTheme } from "../../components/Theme";
import { Cursor, ProgressBar, Rev, Chars, SHdr, E, Soul, Mq } from "../../components/UI";

function ImgParallax({ src, alt }: { src: string; alt: string }) {
  const r = useRef(null);
  const { scrollYProgress } = useScroll({ target: r, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <div ref={r} style={{ width: "100%", height: "120%", position: "absolute", top: "-10%", left: 0 }}>
      <motion.img src={src} style={{ y, width: "100%", height: "100%", objectFit: "cover" }} alt={alt} />
    </div>
  );
}

/* ─── VARIETY HERO CAROUSEL ──────────────────────── */
const GALLERY = [
  { src: "venue.png", w: 400, h: 500, y: 0 },
  { src: "abstract.png", w: 300, h: 300, y: 150 },
  { src: "dancer.png", w: 500, h: 350, y: -50 },
  { src: "art.png", w: 350, h: 450, y: 100 },
  { src: "concert.png", w: 450, h: 300, y: 50 },
  { src: "crowd.png", w: 300, h: 400, y: -100 },
];

function StayHeroCarousel() {
  const { tokens: { BG, FG, W, B } } = useTheme();
  
  // We duplicate the gallery blocks.
  // 4 blocks is overkill, guarantees the screen never runs out of content on 8k monitors
  const items = [...GALLERY, ...GALLERY, ...GALLERY, ...GALLERY];
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const baseX = useMotionValue(0);
  const [drag, setDrag] = useState(false);

  useAnimationFrame((t, delta) => {
    if (!drag) {
      baseX.set(baseX.get() - delta * 0.05);
    }
  });

  // width of one complete set of GALLERY
  const W_BLOCK = 2492; 

  const x = useTransform(baseX, (v) => {
    const min = -W_BLOCK;
    const max = 0;
    const range = max - min;
    const wrapped = ((((v - min) % range) + range) % range) + min;
    return `${wrapped}px`;
  });
  
  return (
    <section style={{ position: "relative", height: "100vh", background: BG, overflow: "hidden", display: "flex", alignItems: "center", paddingTop: 80 }}>
      {/* Background Decor */}
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to bottom, rgba(0,151,178,0.3), transparent)", zIndex: 2, pointerEvents: "none" }} 
      />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "10%", left: "5%", zIndex: 2, pointerEvents: "none" }}>
        <Chars text="AZURE HORIZON" cls="font-display" style={{ fontSize: "clamp(4rem, 13vw, 10rem)", fontWeight: 700, color: W, letterSpacing: "-0.02em", lineHeight: 1 }} />
        <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
          style={{ fontSize: 13, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginTop: 12 }}>Luxury Island Resort & Spa</motion.p>
      </div>

      {/* Invisible Pan Overlay */}
      <motion.div
        onPan={(e, info) => baseX.set(baseX.get() + info.delta.x)}
        onPanStart={() => setDrag(true)}
        onPanEnd={() => setDrag(false)}
        style={{ position: "absolute", inset: 0, zIndex: 10, cursor: drag ? "grabbing" : "grab" }}
      />

      {/* Sliding Track Layer */}
      <motion.div 
        ref={containerRef}
        style={{ x, display: "flex", gap: 32, paddingLeft: 32, alignItems: "center", pointerEvents: "none" }}
      >
        {items.map((it, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: (i % 6) * 0.05, ease: E }}
            style={{ 
              flexShrink: 0, width: it.w, height: it.h, y: it.y, 
              position: "relative", borderRadius: 24, overflow: "hidden",
              border: `1px solid rgba(255,255,255,0.1)`,
              boxShadow: "0 30px 60px -15px rgba(0,0,0,0.5)"
            }}
          >
            <img src={`/gallery/${it.src}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Resort" />
          </motion.div>
        ))}
      </motion.div>
      
      <div style={{ position: "absolute", bottom: 40, right: 60, zIndex: 10, display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>Pan horizontally</span>
        <div style={{ width: 60, height: 1, background: "rgba(255,255,255,0.3)" }} />
      </div>
    </section>
  );
}

/* ─── PROPERTY OVERVIEW & AMENITIES ──────────────── */
function StayAmenities() {
  const { tokens: { A, AL, BG, FG, M, S, B, W } } = useTheme();

  const amenities = [
    { label: "WiFi", icon: Wifi },
    { label: "Swimming Pool", icon: Waves },
    { label: "Spa", icon: Sparkles },
    { label: "Fitness Center", icon: Dumbbell },
    { label: "Private Beach", icon: Umbrella },
    { label: "Airport Shuttle", icon: Plane },
    { label: "Bar", icon: GlassWater },
    { label: "Restaurant", icon: Utensils },
  ];

  const facilities = [
    "24-Hour Front Desk",
    "Concierge Service",
    "Currency Exchange",
    "Water Sports Center",
    "Kids Club",
    "Medical Clinic"
  ];

  return (
    <section style={{ background: W, padding: "140px 36px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        
        {/* Overview Row */}
        <Soul y={100} s={0.1}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 64, borderBottom: `1px solid ${B}`, paddingBottom: 80 }}>
            <Rev style={{ flex: "1 1 400px" }}>
              <p style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: A, fontWeight: 700, marginBottom: 24 }}>
                <MapPin size={16} /> South Malé Atoll, Maldives
              </p>
              <Chars text="A sanctuary suspended" cls="font-display" style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 700, color: FG, lineHeight: 1.1, marginBottom: 8 }} />
              <Chars text="between sky and sea." delay={0.2} cls="font-display" style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 700, color: A, lineHeight: 1.1, marginBottom: 24 }} />
              <p style={{ fontSize: 15, color: M, lineHeight: 1.8 }}>
                Azure Horizon is a pinnacle of luxury resorts, harmonizing stunning architectural design with the raw beauty of natural reef systems. Whether you seek vibrant water sports or isolated serenity at our overwater spa, the resort offers an untethered escape from the mainland pace.
              </p>
            </Rev>
            <Rev delay={0.2} style={{ flex: "1 1 400px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 48px", alignContent: "center" }}>
              {amenities.map((am, i) => (
                <motion.div key={am.label} 
                  animate={{ y: [0, (i % 2 === 0 ? -5 : 5), 0] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: S, border: `1px solid ${B}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <am.icon size={18} color={A} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: FG }}>{am.label}</span>
                </motion.div>
              ))}
            </Rev>
          </div>
        </Soul>

        {/* Facilities Row */}
        <Soul y={120} r={5}>
          <div style={{ paddingTop: 80, display: "flex", flexWrap: "wrap", gap: 64 }}>
             <Rev style={{ width: 240 }}>
               <h3 className="font-display" style={{ fontSize: 28, fontWeight: 700, color: FG, marginBottom: 12 }}>Facilities <br/>& Services</h3>
               <p style={{ fontSize: 12, color: M, lineHeight: 1.6 }}>Comprehensive hospitality ensuring zero friction during your stay.</p>
             </Rev>
             <Rev delay={0.2} style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
               {facilities.map(fac => (
                 <div key={fac} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", background: S, borderRadius: 12, border: `1px solid ${B}` }}>
                   <CheckCircle size={16} color={A} />
                   <span style={{ fontSize: 13, color: FG, fontWeight: 500 }}>{fac}</span>
                 </div>
               ))}
             </Rev>
          </div>
        </Soul>

      </div>
    </section>
  );
}

/* ─── ROOMS & SUITES ─────────────────────────────── */
const ROOMS = [
  {
    name: "Overwater Villa with Pool",
    guests: "Max 3 Guests",
    units: "15 Units",
    desc: "Suspended over the crystal-clear lagoon, this villa features a private infinity pool, direct ocean access, and a glass-floor living room panel.",
    features: ["Private Pool", "Ocean View", "Bathtub", "+ 3 more"],
    price: "₹45,000",
    img: "abstract.png"
  },
  {
    name: "Beachfront Grand Suite",
    guests: "Max 4 Guests",
    units: "8 Units",
    desc: "Set directly on the white sands, featuring a private walled garden, an outdoor rain shower, and a sprawling terrace facing the sunset.",
    features: ["Beach Access", "Garden Courtyard", "Outdoor Shower", "+ 2 more"],
    price: "₹38,000",
    img: "venue.png"
  }
];

function StayRooms() {
  const { tokens: { A, AL, BG, FG, M, S, B, W } } = useTheme();

  return (
    <section style={{ background: BG, padding: "140px 36px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <SHdr idx="02" label="Accommodations" />
        
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {ROOMS.map((room, i) => (
            <Rev key={room.name} delay={i * 0.1}>
              <div style={{ display: "flex", flexWrap: "wrap", background: W, borderRadius: 32, overflow: "hidden", border: `1px solid ${B}` }}>
                {/* Parallax Image Container */}
                <div style={{ flex: "1 1 400px", height: 400, position: "relative", overflow: "hidden" }}>
                  <ImgParallax src={`/gallery/${room.img}`} alt={room.name} />
                  <div style={{ position: "absolute", top: 20, left: 20, padding: "8px 16px", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", borderRadius: 12, color: "#fff", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>
                    {room.units}
                  </div>
                </div>
                <div style={{ flex: "1 1 500px", padding: "48px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                      <h3 className="font-display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700, color: FG, lineHeight: 1.1, maxWidth: 300 }}>{room.name}</h3>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontSize: 10, color: M, textTransform: "uppercase", letterSpacing: "0.1em" }}>Starting from</p>
                        <p style={{ fontSize: 24, fontWeight: 700, color: FG }}>{room.price}<span style={{ fontSize: 14, color: M, fontWeight: 500 }}> / night</span></p>
                      </div>
                    </div>
                    
                    <p style={{ fontSize: 12, fontWeight: 600, color: A, marginBottom: 16 }}>{room.guests}</p>
                    <p style={{ fontSize: 14, color: M, lineHeight: 1.7, marginBottom: 32 }}>{room.desc}</p>
                    
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 40 }}>
                      {room.features.map(f => (
                        <span key={f} style={{ padding: "8px 16px", background: S, border: `1px solid ${B}`, borderRadius: 30, fontSize: 11, fontWeight: 500, color: FG }}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <motion.button className="shimmer-cta" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} style={{ width: "100%", padding: 18, border: "none", cursor: "none", textTransform: "uppercase", letterSpacing: "0.2em", fontSize: 11 }}>
                    Select Room
                  </motion.button>
                </div>
              </div>
            </Rev>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── POLICIES & CONTACT ─────────────────────────── */
const POLICIES = [
  { id: 1, title: "Check-in / Check-out", body: "Check-in begins at 3:00 PM. Early check-in is subject to availability. Check-out is strictly by 11:00 AM." },
  { id: 2, title: "House Rules", body: "No disruptive gatherings. Quiet hours are observed between 10:00 PM and 7:00 AM. Smoking is strictly prohibited inside the villas." },
  { id: 3, title: "Cancellation Policy", body: "Reservations must be cancelled 14 days prior to arrival to avoid a 100% penalty of the entire stay." },
  { id: 4, title: "Arrival Instructions", body: "Please provide your flight details at least 72 hours prior to arrival so we may arrange your speedboat or seaplane transfer." },
];

function StayPoliciesAndContact() {
  const { tokens: { A, AL, BG, FG, M, S, B, W } } = useTheme();
  
  return (
    <section style={{ background: W, padding: "140px 36px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 80 }} className="pol-contact-grid">
        
        {/* Policies Accordion */}
        <Soul y={150} r={-3}>
          <SHdr idx="03" label="Policies & Rules" />
          <div style={{ borderTop: `1px solid ${B}` }}>
            {POLICIES.map((rule) => {
              const [op, setOp] = useState(false);
              return (
                <motion.div key={rule.id} style={{ borderBottom: `1px solid ${B}` }} whileHover={{ backgroundColor: AL }}>
                  <button suppressHydrationWarning onClick={() => setOp(!op)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "24px 16px", background: "none", border: "none", cursor: "none", textAlign: "left" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                      <FileText size={18} color={op ? A : M} />
                      <motion.span animate={{ color: op ? A : FG }} style={{ fontSize: 14, fontWeight: 600 }}>{rule.title}</motion.span>
                    </div>
                    <motion.div animate={{ rotate: op ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown size={16} color={M} />
                    </motion.div>
                  </button>
                  <motion.div initial={false} animate={{ height: op ? "auto" : 0, opacity: op ? 1 : 0 }} style={{ overflow: "hidden" }}>
                    <p style={{ padding: "0 16px 30px 58px", fontSize: 13, color: M, lineHeight: 1.85, maxWidth: 580 }}>{rule.body}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </Soul>

        {/* Contact Block */}
        <Rev delay={0.2}>
          <div style={{ background: BG, padding: 48, border: `1px solid ${B}`, borderRadius: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: A, marginBottom: 24, fontWeight: 600 }}>Contact Property</p>
              
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: S, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${B}` }}>
                   <span className="font-display" style={{ fontSize: 24, color: FG, fontWeight: 700 }}>S</span>
                </div>
                <div>
                  <p style={{ fontSize: 11, color: M, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Managed by</p>
                  <p style={{ fontSize: 18, fontWeight: 700, color: FG }}>Sarah Jenkins</p>
                </div>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
                <a href="tel:+9601234567" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
                  <Phone size={16} color={A} />
                  <span style={{ fontSize: 15, fontWeight: 500, color: FG }}>+960 123 4567</span>
                </a>
                <a href="mailto:reservations@azurehorizon.com" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
                  <Info size={16} color={A} />
                  <span style={{ fontSize: 15, fontWeight: 500, color: FG }}>reservations@azurehorizon.com</span>
                </a>
              </div>
            </div>
            
            <motion.button className="shimmer-cta" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} style={{ width: "100%", padding: 16, border: "none", cursor: "none", textTransform: "uppercase", letterSpacing: "0.15em", fontSize: 10 }}>
              Book Direct Validation
            </motion.button>
          </div>
        </Rev>
        
      </div>
      <style>{`@media(max-width: 900px) { .pol-contact-grid { grid-template-columns: 1fr !important; gap: 64px !important; } }`}</style>
    </section>
  );
}

/* ─── PAGE ───────────────────────────────────────── */
export default function StayPage() {
  const { tokens: { S } } = useTheme();
  return (
    <>
      <Cursor />
      <ProgressBar />
      <Navbar />
      <main>
        <StayHeroCarousel />
        <Mq items={["Island Sanctuary", "The Living Reef", "Azure Deep"]} size="sm" bg={S} />
        <StayAmenities />
        <Mq items={["Island Sanctuary", "Ocean Perspective", "Curated Luxury", "Azure Horizon"]} dir="r" size="lg" bg={S} />
        <StayRooms />
        <Mq items={["Direct Connection", "Bespoke Service", "Privacy Guaranteed"]} size="sm" bg={S} />
        <StayPoliciesAndContact />
      </main>
      <Footer />
    </>
  );
}
