import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";

export default function CinematicPortfolio() {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [time, setTime] = useState("");

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.5 });
  useMotionValueEvent(smoothProgress, "change", (v) => setScrollProgress(v));

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, "0");
      const mm = String(d.getUTCMinutes()).padStart(2, "0");
      const ss = String(d.getUTCSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const { scrollYProgress: heroProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.4]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroBlur = useTransform(heroProgress, [0, 1], ["0px", "12px"]);
  const titleY = useTransform(heroProgress, [0, 1], ["0%", "-40%"]);
  const subtitleY = useTransform(heroProgress, [0, 1], ["0%", "120%"]);
  const heroFilter = useTransform(heroBlur, (b) => `blur(${b})`);

  const { scrollYProgress: hProgress } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(hProgress, [0, 1], ["0%", "-75%"]);
  const projectCounter = useTransform(hProgress, (v) =>
    String(Math.min(4, Math.max(1, Math.ceil(v * 4 + 0.01)))).padStart(2, "0")
  );

  const projects = [
    { n: "01", title: "Maison Verre", tag: "Luxury · 2025", color: "#c9a878", scene: "rings" },
    { n: "02", title: "Polaris Studio", tag: "Identity · 2025", color: "#7a9fc7", scene: "grid" },
    { n: "03", title: "Echo Atelier", tag: "Editorial · 2024", color: "#b87474", scene: "waves" },
    { n: "04", title: "Nocturne", tag: "Music · 2024", color: "#8a7ab0", scene: "orb" },
  ];

  const Scene = ({ type, color }) => {
    if (type === "rings") {
      return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="rg1">
              <stop offset="0%" stopColor={color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="180" fill="url(#rg1)" />
          {[40, 80, 120, 160, 200].map((r, i) => (
            <circle key={i} cx="200" cy="200" r={r} fill="none" stroke={color} strokeWidth="0.5"
              opacity={0.6 - i * 0.1}
              style={{
                animation: `spin ${20 + i * 5}s linear infinite`,
                transformOrigin: "200px 200px",
                strokeDasharray: i % 2 ? "2 4" : "none",
              }} />
          ))}
        </svg>
      );
    }
    if (type === "grid") {
      return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="400" stroke={color} strokeWidth="0.3" opacity="0.3" />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 20} x2="400" y2={i * 20} stroke={color} strokeWidth="0.3" opacity="0.3" />
          ))}
          <circle cx="200" cy="200" r="60" fill="none" stroke={color} strokeWidth="1" opacity="0.8" />
          <circle cx="200" cy="200" r="3" fill={color} />
        </svg>
      );
    }
    if (type === "waves") {
      return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 30 }).map((_, i) => (
            <path key={i} d={`M 0 ${100 + i * 8} Q 100 ${80 + i * 8} 200 ${100 + i * 8} T 400 ${100 + i * 8}`}
              fill="none" stroke={color} strokeWidth="0.4" opacity={0.5 - i * 0.015} />
          ))}
        </svg>
      );
    }
    if (type === "orb") {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2/3 aspect-square rounded-full"
            style={{
              background: `radial-gradient(circle at 35% 35%, ${color}aa, ${color}22 40%, transparent 70%)`,
              filter: "blur(20px)",
              animation: "float 8s ease-in-out infinite",
            }} />
          <div className="absolute w-1/2 aspect-square rounded-full border" style={{ borderColor: `${color}44` }} />
        </div>
      );
    }
    return null;
  };

  return (
    <div ref={containerRef} className="relative bg-[#0a0a0a] text-[#e8e4dc] overflow-x-hidden"
      style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&display=swap');
        * { -webkit-font-smoothing: antialiased; }
        .mono { font-family: 'JetBrains Mono', monospace; font-weight: 300; letter-spacing: 0.02em; }
        .display { font-family: 'Fraunces', serif; font-weight: 300; letter-spacing: -0.04em; }
        .italic-serif { font-family: 'Instrument Serif', serif; font-style: italic; }
        .grain::before {
          content: ''; position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
          opacity: 0.08; pointer-events: none; z-index: 100; mix-blend-mode: overlay;
        }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee { animation: marquee 40s linear infinite; }
        @keyframes pulse-dot { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        .pulse { animation: pulse-dot 2s ease-in-out infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes float { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(10px,-10px) scale(1.05); } }
      `}</style>

      <div className="grain" />

      <div className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex justify-between items-center mono text-[10px] uppercase tracking-[0.2em] mix-blend-difference text-white">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a878] pulse" />
          <span>Atelier Norden</span>
        </div>
        <div className="hidden md:flex gap-8 opacity-70">
          <span>Index</span><span>Work</span><span>Studio</span><span>Contact</span>
        </div>
        <div className="opacity-60 tabular-nums">{time}</div>
      </div>

      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-white/5">
        <motion.div className="h-full bg-[#c9a878] origin-left" style={{ scaleX: smoothProgress }} />
      </div>

      <section className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0"
          style={{
            scale: heroScale, filter: heroFilter,
            background: `
              radial-gradient(ellipse 80% 60% at 30% 40%, rgba(201,168,120,0.18), transparent),
              radial-gradient(ellipse 60% 80% at 70% 60%, rgba(122,159,199,0.12), transparent),
              radial-gradient(ellipse 100% 100% at 50% 100%, rgba(184,116,116,0.1), transparent),
              #0a0a0a`,
          }} />
        <div className="absolute inset-0 flex justify-between px-6 md:px-10 pointer-events-none">
          {Array.from({ length: 13 }).map((_, i) => <div key={i} className="w-px h-full bg-white/[0.025]" />)}
        </div>

        <motion.div className="relative z-10 px-6 md:px-10 w-full max-w-[1600px]" style={{ opacity: heroOpacity }}>
          <motion.div style={{ y: titleY }} className="space-y-2">
            <div className="mono text-[10px] uppercase tracking-[0.3em] opacity-50 mb-8">
              (01) — Independent Design Studio · Est. MMXIX
            </div>
            <h1 className="display text-[18vw] md:text-[14vw] leading-[0.85] tracking-[-0.06em]">
              <span className="block">Cinematic</span>
              <span className="block pl-[8vw] md:pl-[12vw]"><span className="italic-serif font-normal">interfaces</span></span>
              <span className="block">for the</span>
              <span className="block pl-[8vw] md:pl-[12vw]"><span className="italic-serif font-normal">discerning.</span></span>
            </h1>
          </motion.div>

          <motion.div style={{ y: subtitleY }} className="mt-12 flex justify-between items-end mono text-[11px] uppercase tracking-[0.15em] opacity-60">
            <div>
              <div>34.18° N</div><div>118.30° W</div>
              <div className="mt-1">Burbank · Los Angeles</div>
            </div>
            <div className="text-right hidden md:block max-w-xs">
              A practice spanning identity, motion,<br />and the architecture of attention.
            </div>
            <div className="text-right">
              <div className="opacity-100">↓ Scroll</div>
              <div className="text-[9px] mt-1">to descend</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative min-h-screen flex items-center px-6 md:px-10 py-32">
        <div className="max-w-[1600px] mx-auto w-full grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2 mono text-[10px] uppercase tracking-[0.2em] opacity-50">(02) Manifesto</div>
          <div className="md:col-span-10">
            <p className="display text-[6vw] md:text-[3.5vw] leading-[1.1] tracking-[-0.02em]">
              We build sites that <span className="italic-serif">unfold</span> rather than load.
              Each scroll a frame. Each transition a <span className="italic-serif">decision</span>.
              Restraint as a form of <span className="italic-serif">intensity</span>.
            </p>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 mono text-[11px] uppercase tracking-[0.15em]">
              {[["Identity", "Marks & systems"], ["Motion", "Time-based design"], ["Web", "Cinematic sites"], ["Editorial", "Print & digital"]].map(([k, v]) => (
                <div key={k} className="border-t border-white/15 pt-4">
                  <div>{k}</div>
                  <div className="opacity-50 mt-2 normal-case tracking-normal">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={horizontalRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <div className="absolute top-32 left-6 md:left-10 mono text-[10px] uppercase tracking-[0.2em] opacity-50 z-10">
            (03) Selected Work — 2024/2026
          </div>

          <motion.div style={{ x }} className="flex gap-8 pl-6 md:pl-10 will-change-transform">
            {projects.map((p) => (
              <div key={p.n} className="relative shrink-0 w-[75vw] md:w-[55vw] h-[70vh] overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  style={{
                    background: `
                      radial-gradient(circle at 30% 30%, ${p.color}40, transparent 60%),
                      radial-gradient(circle at 70% 70%, ${p.color}20, transparent 60%),
                      linear-gradient(135deg, #1a1a1a, #0f0f0f)`,
                  }} />
                <Scene type={p.scene} color={p.color} />

                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
                  <div className="flex justify-between mono text-[10px] uppercase tracking-[0.2em]">
                    <span>{p.n} / 04</span>
                    <span style={{ color: p.color }}>● Live</span>
                  </div>
                  <div>
                    <div className="mono text-[10px] uppercase tracking-[0.2em] opacity-60 mb-3">{p.tag}</div>
                    <h3 className="display text-[8vw] md:text-[5vw] leading-[0.9] tracking-[-0.04em]">{p.title}</h3>
                    <div className="mt-6 mono text-[10px] uppercase tracking-[0.2em] opacity-50 flex items-center gap-2 transition-opacity group-hover:opacity-100">
                      View case study <span>→</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="shrink-0 w-[75vw] md:w-[55vw] h-[70vh] flex items-center justify-center pr-6 md:pr-10">
              <div className="text-center">
                <div className="mono text-[10px] uppercase tracking-[0.2em] opacity-50 mb-6">End of selection</div>
                <div className="display text-[4vw] italic-serif opacity-70">More on request →</div>
              </div>
            </div>
          </motion.div>

          <div className="absolute bottom-10 left-6 md:left-10 right-6 md:right-10 flex items-center gap-4 mono text-[10px] uppercase tracking-[0.2em] opacity-50">
            <span>Drag · Scroll</span>
            <div className="flex-1 h-px bg-white/15 relative">
              <motion.div className="absolute top-0 left-0 h-full bg-[#c9a878]" style={{ scaleX: hProgress, transformOrigin: "left" }} />
            </div>
            <span className="tabular-nums">
              <motion.span>{projectCounter}</motion.span> / 04
            </span>
          </div>
        </div>
      </section>

      <section className="py-24 border-y border-white/10 overflow-hidden">
        <div className="flex marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, j) => (
            <div key={j} className="flex shrink-0">
              {["Brand Identity", "Web Design", "Art Direction", "Motion", "Editorial", "Strategy"].map((t, i) => (
                <span key={i} className="display text-[10vw] px-12 opacity-80">
                  {t} <span className="italic-serif opacity-50">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="min-h-screen flex items-center px-6 md:px-10 py-32 relative">
        <div className="absolute inset-0 opacity-40"
          style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(201,168,120,0.2), transparent 60%)" }} />
        <div className="max-w-[1600px] mx-auto w-full grid md:grid-cols-12 gap-8 relative">
          <div className="md:col-span-2 mono text-[10px] uppercase tracking-[0.2em] opacity-50">(04) Contact</div>
          <div className="md:col-span-10">
            <div className="mono text-[10px] uppercase tracking-[0.2em] opacity-60 mb-8">
              Currently accepting projects for Q3 — Q4 2026
            </div>
            <h2 className="display text-[12vw] md:text-[8vw] leading-[0.9] tracking-[-0.04em]">
              Let's build<br />something <span className="italic-serif">lasting.</span>
            </h2>
            <div className="mt-16 grid md:grid-cols-3 gap-8 mono text-[11px] uppercase tracking-[0.15em]">
              <div className="border-t border-white/15 pt-4">
                <div className="opacity-50 mb-2">Email</div>
                <div>hello@atelier-norden.com</div>
              </div>
              <div className="border-t border-white/15 pt-4">
                <div className="opacity-50 mb-2">Studio</div>
                <div>Burbank, California</div>
              </div>
              <div className="border-t border-white/15 pt-4">
                <div className="opacity-50 mb-2">Social</div>
                <div>Instagram · Are.na · Read.cv</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-6 md:px-10 py-8 flex justify-between items-center mono text-[10px] uppercase tracking-[0.2em] opacity-50 border-t border-white/10">
        <span>© MMXXVI Atelier Norden</span>
        <span className="tabular-nums">{Math.round(scrollProgress * 100)}%</span>
        <span>Built with intention</span>
      </footer>
    </div>
  );
}
