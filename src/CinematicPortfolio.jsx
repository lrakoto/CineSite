import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const projects = [
  {
    number: "01",
    title: "Monument / Glass",
    discipline: "Spatial identity · Digital flagship",
    year: "MMXXVI",
    image: "/assets/images/monument-glass.png",
    alt: "A smoked-glass architectural pavilion illuminated by a warm beam",
    statement: "An identity built from light, mass, and the spaces between.",
    tone: "gold",
  },
  {
    number: "02",
    title: "Blue / Standard",
    discipline: "Art direction · Cultural platform",
    year: "MMXXV",
    image: "/assets/images/blue-ribbon.png",
    alt: "A monumental blue ribbon folding through a concrete gallery",
    statement: "A cultural system with one unmistakable gesture.",
    tone: "blue",
  },
  {
    number: "03",
    title: "After / Light",
    discipline: "Campaign · Moving image",
    year: "MMXXV",
    image: "/assets/images/amber-eclipse.png",
    alt: "A glowing amber disc floating above a reflective night landscape",
    statement: "A launch story told in the final minutes before dark.",
    tone: "amber",
  },
];

function Timecode() {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour12: false, timeZone: "America/Los_Angeles" }));
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <span>{time} PST</span>;
}

function Project({ project, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  return (
    <article ref={ref} className={`project project--${project.tone}`}>
      <div className="project__meta frame">
        <span>{project.number} / 03</span>
        <span>{project.discipline}</span>
        <span>{project.year}</span>
      </div>

      <motion.div
        className="project__visual"
        initial={{ opacity: 0.35, clipPath: "inset(8% 4% 8% 4%)" }}
        whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ amount: 0.2, once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={project.image}
          alt={project.alt}
          style={{ y: imageY, scale: imageScale }}
          loading={index === 0 ? "eager" : "lazy"}
        />
        <div className="project__shade" />
        <span className="project__index">{project.number}</span>
      </motion.div>

      <div className="project__copy frame">
        <h3>
          {project.title.split(" / ").map((part, i) => (
            <span key={part} className={i ? "serif" : ""}>{part}{i === 0 ? " /" : ""}</span>
          ))}
        </h3>
        <div className="project__aside">
          <p>{project.statement}</p>
          <button type="button" aria-label={`View ${project.title} case study`}>
            <span>View case study</span><span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default function CinematicPortfolio() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });
  const [percent, setPercent] = useState(0);

  useMotionValueEvent(progress, "change", (value) => setPercent(Math.round(value * 100)));

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroVideoY = useTransform(heroProgress, [0, 1], ["0%", "18%"]);
  const heroVideoScale = useTransform(heroProgress, [0, 1], [1, 1.14]);
  const heroTitleY = useTransform(heroProgress, [0, 1], ["0%", "-22%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.82], [1, 0]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="site-shell">
      <div className="noise" aria-hidden="true" />
      <motion.div className="progress" style={{ scaleX: progress }} />

      <header className="nav frame">
        <button className="wordmark" type="button" onClick={() => scrollTo("top")}>
          <span>ATELIER</span><span>NORDEN</span>
        </button>
        <nav aria-label="Primary navigation">
          <button type="button" onClick={() => scrollTo("work")}>Work</button>
          <button type="button" onClick={() => scrollTo("studio")}>Studio</button>
          <button type="button" onClick={() => scrollTo("contact")}>Contact</button>
        </nav>
        <div className="nav__status"><i /><span>LA / <Timecode /></span></div>
      </header>

      <section id="top" ref={heroRef} className="hero">
        <motion.div className="hero__media" style={{ y: heroVideoY, scale: heroVideoScale }}>
          <video autoPlay muted loop playsInline poster="/assets/images/amber-eclipse.png">
            <source src="/assets/videos/hero-loop.mp4" type="video/mp4" />
          </video>
          <div className="hero__grade" />
        </motion.div>

        <motion.div className="hero__content frame" style={{ y: heroTitleY, opacity: heroOpacity }}>
          <p className="kicker">Independent creative studio · Burbank, California</p>
          <h1>
            <span>We direct</span>
            <span className="hero__line-two"><em>attention</em><b>into</b></span>
            <span>something felt.</span>
          </h1>
          <div className="hero__footer">
            <p>Identity, digital experiences,<br />and moving image for culture-led brands.</p>
            <button type="button" onClick={() => scrollTo("studio")}>
              <span>Begin the reel</span><span>↓</span>
            </button>
          </div>
        </motion.div>
      </section>

      <section id="studio" className="statement frame">
        <div className="section-label"><span>( 01 )</span><span>Point of view</span></div>
        <div className="statement__body">
          <p className="statement__lead">
            Digital work has a pacing problem. We borrow from cinema—<em>framing, tension, rhythm, release</em>—to make brands impossible to scroll past.
          </p>
          <div className="statement__details">
            <p>Atelier Norden is an independent direction and design practice working from Burbank, where screens and stories have always shared a language.</p>
            <p>We partner with founders and cultural teams from first position through final frame.</p>
          </div>
        </div>
        <div className="statement__ticker" aria-label="Services">
          <span>Strategy</span><i /> <span>Art direction</span><i /> <span>Digital</span><i /> <span>Motion</span>
        </div>
      </section>

      <section id="work" className="work-intro frame">
        <div className="section-label"><span>( 02 )</span><span>Selected work · 2025–26</span></div>
        <h2>Three studies<br />in <em>presence.</em></h2>
        <p>A selection of identities and digital worlds built to hold the frame.</p>
      </section>

      <section className="projects" aria-label="Selected projects">
        {projects.map((project, index) => <Project key={project.number} project={project} index={index} />)}
      </section>

      <section className="method frame">
        <div className="section-label"><span>( 03 )</span><span>The method</span></div>
        <div className="method__grid">
          <h2>Built like a<br /><em>production.</em></h2>
          <div className="method__steps">
            {[
              ["01", "Find the signal", "We reduce the brief to the one thing only you can own."],
              ["02", "Build the world", "A visual language with enough range to become a living system."],
              ["03", "Direct the experience", "Every interaction earns its place through pacing and intent."],
              ["04", "Finish obsessively", "Performance, accessibility, motion, and detail—through the final frame."],
            ].map(([n, title, copy]) => (
              <div className="method__step" key={n}>
                <span>{n}</span><h3>{title}</h3><p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact__orb" aria-hidden="true" />
        <div className="contact__inner frame">
          <div className="section-label"><span>( 04 )</span><span>New business · Q4 2026</span></div>
          <p>Have a story worth<br />stopping for?</p>
          <a href="mailto:hello@atelier-norden.com">
            <span>Let’s make the first frame.</span><span>↗</span>
          </a>
          <footer>
            <span>© MMXXVI Atelier Norden</span>
            <span>Burbank · Los Angeles</span>
            <span>{String(percent).padStart(3, "0")} / 100</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
