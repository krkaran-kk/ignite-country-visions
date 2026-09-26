import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, MoveUpRight, Pause, Play } from "lucide-react";

const experiences = [
  {
    label: "Learn",
    title: "Expand your mind.",
    description: "Turn curiosity into knowledge. Turn knowledge into real-world action.",
    link: "Explore brAInify",
    href: "#products",
    signature: "INTELLIGENCE / IN EVERY DIRECTION",
    color: "#bde8d0",
  },
  {
    label: "Connect",
    title: "Find your people.",
    description: "People, purpose, and a shared ambition. Be part of something bigger.",
    link: "Discover IGNITE",
    href: "#about",
    signature: "CONNECTION / AT THE CENTRE",
    color: "#dac99b",
  },
  {
    label: "Grow",
    title: "Own your future.",
    description: "New possibilities. Your own path. A future shaped by you.",
    link: "Explore the opportunity",
    href: "#opportunity",
    signature: "POSSIBILITY / WITHOUT LIMITS",
    color: "#afd9f2",
  },
] as const;

function ParticleSculpture({
  mode,
  paused,
  reduced,
}: {
  mode: number;
  paused: boolean;
  reduced: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef(mode);
  const pausedRef = useRef(paused || reduced);
  const requestDrawRef = useRef<() => void>(() => {});
  useEffect(() => {
    modeRef.current = mode;
    requestDrawRef.current();
  }, [mode]);
  useEffect(() => {
    pausedRef.current = paused || reduced;
    requestDrawRef.current();
  }, [paused, reduced]);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    let width = 1,
      height = 1,
      frame = 0,
      visible = false,
      time = 0,
      last = 0;
    let pointerX = 0,
      pointerY = 0,
      easedX = 0,
      easedY = 0,
      burst = 0;
    let frozenRendered = false,
      renderedMode = -1;
    const count = window.innerWidth < 640 ? 440 : 820;
    const points = Array.from({ length: count }, (_, i) => ({ x: 0, y: 0, z: 0, seed: i / count }));
    const resize = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      frozenRendered = false;
      start();
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" || pausedRef.current) return;
      const box = canvas.getBoundingClientRect();
      pointerX = ((event.clientX - box.left) / box.width) * 2 - 1;
      pointerY = ((event.clientY - box.top) / box.height) * 2 - 1;
    };
    const leave = () => {
      pointerX = 0;
      pointerY = 0;
    };
    const activate = () => {
      if (!pausedRef.current) burst = 1;
    };
    const draw = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) {
        last = 0;
        return;
      }
      const currentMode = modeRef.current;
      const frozen = pausedRef.current;
      // A paused/reduced-motion sculpture redraws only for a resize or explicit selection.
      if (frozen && frozenRendered && renderedMode === currentMode) {
        last = 0;
        return;
      }
      const dt = Math.min((now - (last || now)) / 1000, 0.04);
      last = now;
      if (!frozen) {
        time += dt;
        burst *= 0.95;
        easedX += (pointerX - easedX) * 0.045;
        easedY += (pointerY - easedY) * 0.045;
      }
      const rotation = frozen ? 0.5 : time * 0.12 + easedX * 0.6;
      const baseTilt = currentMode === 1 ? 0.65 : -0.15;
      const tilt = frozen ? baseTilt : baseTilt + easedY * 0.35;
      const size = Math.min(width, height) * 0.34;
      const centerX = width * 0.5,
        centerY = height * 0.49;
      context.clearRect(0, 0, width, height);
      const glow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, size * 1.65);
      glow.addColorStop(0, ["#85d9b817", "#d9be7819", "#87cbe71c"][currentMode] || "#85d9b817");
      glow.addColorStop(1, "#00000000");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
      const projected: { x: number; y: number; depth: number; radius: number; index: number }[] =
        [];
      for (let i = 0; i < count; i++) {
        const point = points[i]!;
        const u = point.seed;
        const a = i * 2.3999632297;
        let x: number, y: number, z: number;
        if (currentMode === 0) {
          y = 1 - 2 * u;
          const r = Math.sqrt(1 - y * y);
          const wave = 1 + Math.sin(a * 2 + time * 1.4) * 0.035;
          x = Math.cos(a) * r * wave;
          z = Math.sin(a) * r * wave;
        } else if (currentMode === 1) {
          const ring = u * Math.PI * 2;
          const tube = a;
          x = (0.77 + 0.27 * Math.cos(tube)) * Math.cos(ring);
          y = 0.27 * Math.sin(tube);
          z = (0.77 + 0.27 * Math.cos(tube)) * Math.sin(ring);
        } else {
          const helix = u * Math.PI * 7 + (i % 2) * Math.PI;
          const r = 0.52 + 0.11 * Math.sin(u * Math.PI);
          x = Math.cos(helix) * r;
          y = (u - 0.5) * 2.2;
          z = Math.sin(helix) * r;
        }
        const morph = frozen ? 1 : Math.min(dt * 3.6, 1);
        point.x += (x - point.x) * morph;
        point.y += (y - point.y) * morph;
        point.z += (z - point.z) * morph;
        const rotatedX = point.x * Math.cos(rotation) - point.z * Math.sin(rotation);
        const rotatedZ = point.x * Math.sin(rotation) + point.z * Math.cos(rotation);
        const rotatedY = point.y * Math.cos(tilt) - rotatedZ * Math.sin(tilt);
        const depth = point.y * Math.sin(tilt) + rotatedZ * Math.cos(tilt);
        const perspective = 3.4 / (3.4 + depth);
        const swell = 1 + burst * 0.14;
        projected.push({
          x: centerX + rotatedX * size * perspective * swell,
          y: centerY + rotatedY * size * perspective * swell,
          depth,
          radius: (0.7 + (1 - depth) * 0.6) * perspective,
          index: i,
        });
      }
      // Sparse structural threads make the point cloud read as a sculptural object.
      context.lineWidth = 0.55;
      const rgb =
        currentMode === 1 ? "218,201,155" : currentMode === 2 ? "175,217,242" : "189,232,208";
      for (let i = 0; i < projected.length; i += 2) {
        const p = projected[i]!;
        const q = projected[(i + (currentMode === 2 ? 2 : 21)) % count]!;
        const distance = Math.hypot(p.x - q.x, p.y - q.y);
        if (distance < size * 0.32) {
          context.strokeStyle = `rgba(${rgb},${0.12 * (1 - distance / (size * 0.32))})`;
          context.beginPath();
          context.moveTo(p.x, p.y);
          context.lineTo(q.x, q.y);
          context.stroke();
        }
      }
      projected.sort((a, b) => b.depth - a.depth);
      for (const p of projected) {
        const alpha = Math.max(0.16, Math.min(1, (1.5 - p.depth) * 0.44));
        context.fillStyle = `rgba(${rgb},${alpha})`;
        context.beginPath();
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        context.fill();
        if (p.index % 39 === 0 && p.depth < 0.1) {
          context.fillStyle = `rgba(${rgb},.065)`;
          context.beginPath();
          context.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
          context.fill();
        }
      }
      frozenRendered = frozen;
      renderedMode = currentMode;
      if (!frozen) frame = requestAnimationFrame(draw);
      else last = 0;
    };
    const start = () => {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw);
    };
    requestDrawRef.current = () => {
      frozenRendered = false;
      start();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting;
        if (visible) start();
        else {
          cancelAnimationFrame(frame);
          frame = 0;
          last = 0;
        }
      },
      { threshold: 0.01 },
    );
    observer.observe(canvas);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    canvas.addEventListener("pointerdown", activate);
    document.addEventListener("visibilitychange", start);
    resize();
    return () => {
      requestDrawRef.current = () => {};
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("pointerdown", activate);
      document.removeEventListener("visibilitychange", start);
    };
  }, []);
  return <canvas ref={canvasRef} className="spark-canvas" aria-hidden="true" />;
}

export function IgniteExperience() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoCycle, setAutoCycle] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    const section = sectionRef.current;
    const observer = new IntersectionObserver(([entry]) => setVisible(!!entry?.isIntersecting), {
      threshold: 0.2,
    });
    if (section) observer.observe(section);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      media.removeEventListener("change", update);
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    if (paused || reduced || !visible || !pageVisible || !autoCycle) return;
    const timer = window.setInterval(
      () => setActive((value) => (value + 1) % experiences.length),
      8000,
    );
    return () => window.clearInterval(timer);
  }, [paused, reduced, visible, pageVisible, autoCycle]);
  const experience = experiences[active]!;
  return (
    <section
      id="experience"
      ref={sectionRef}
      className="spark-section"
      aria-labelledby="spark-title"
      data-paused={paused || reduced}
      data-visible={visible}
      data-mode={active}
      data-autocycle={autoCycle}
      onFocusCapture={() => setAutoCycle(false)}
      style={{ "--spark-color": experience.color } as React.CSSProperties}
    >
      <div className="spark-grain" aria-hidden="true" />
      <div className="page-container">
        <div className="spark-topline">
          <span>
            <i /> THE IGNITE EXPERIENCE
          </span>
          <span>
            EXPLORE WHAT MOVES YOU <ArrowDown size={13} />
          </span>
        </div>
        <div className="spark-layout">
          <div className="spark-copy">
            <p className="spark-eyebrow">IT STARTS WITH YOU.</p>
            <h2 id="spark-title">
              One spark.
              <br />
              <em>
                Limitless
                <br />
                possibility.
              </em>
            </h2>
            <div className="spark-story" key={active}>
              <span>
                0{active + 1} / {experience.label.toUpperCase()}
              </span>
              <h3>{experience.title}</h3>
              <p>{experience.description}</p>
              <a href={experience.href}>
                {experience.link}
                <ArrowUpRight size={19} />
              </a>
            </div>
          </div>
          <div className="spark-stage">
            <div className="spark-stage-grid" aria-hidden="true" />
            <div className="spark-orbit orbit-a" aria-hidden="true" />
            <div className="spark-orbit orbit-b" aria-hidden="true" />
            <ParticleSculpture mode={active} paused={paused} reduced={reduced} />
            <div className="spark-coordinate coordinate-top" aria-hidden="true">
              43°14′ N<br />
              76°53′ E
            </div>
            <div className="spark-coordinate coordinate-side" aria-hidden="true">
              KZ / RU
              <br />
              CONNECTED
            </div>
            <span className="spark-object-label" aria-hidden="true">
              {experience.signature}
            </span>
            <div className="spark-pointer-hint">
              <MoveUpRight size={14} />
              <span className="pointer-fine">Move your cursor. Feel the connection.</span>
              <span className="pointer-touch">Choose your spark below.</span>
            </div>
          </div>
        </div>
        <div className="spark-controls">
          <div className="spark-choices" aria-label="Choose your IGNITE experience">
            {experiences.map((item, index) => (
              <button
                key={item.label}
                type="button"
                aria-pressed={active === index}
                onClick={() => {
                  setActive(index);
                  setAutoCycle(false);
                }}
                className={active === index ? "is-active" : ""}
              >
                <span>0{index + 1}</span>
                <strong>{item.label}</strong>
                <ArrowUpRight size={19} />
                <i key={`${active}-${paused}`} className="spark-progress" aria-hidden="true" />
              </button>
            ))}
          </div>
          <button
            className="spark-pause"
            type="button"
            disabled={reduced}
            onClick={() => {
              if (paused) setAutoCycle(true);
              setPaused((value) => !value);
            }}
            aria-label={
              paused || reduced ? "Play experience animation" : "Pause experience animation"
            }
          >
            {paused || reduced ? <Play size={15} /> : <Pause size={15} />}
            <span>{reduced ? "Motion reduced" : paused ? "Play motion" : "Pause motion"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export function KineticRibbon() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="kinetic-ribbon" aria-label="People. Purpose. Possibility." data-paused={paused}>
      <div className="kinetic-track" aria-hidden="true">
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i}>
            PEOPLE.<i>✳</i>PURPOSE.<i>✳</i>
            <em>POSSIBILITY.</em>
            <i>✳</i>
          </span>
        ))}
      </div>
      <button
        type="button"
        className="ribbon-pause"
        onClick={() => setPaused((value) => !value)}
        aria-label={paused ? "Play moving text" : "Pause moving text"}
      >
        {paused ? <Play size={14} /> : <Pause size={14} />}
      </button>
    </div>
  );
}

export function PageMotion() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    const surfaces = document.querySelectorAll<HTMLElement>(
      ".learning-art, .about-image, .media-feature",
    );
    const buttons = document.querySelectorAll<HTMLElement>(
      ".round-action > span, .light-action, .social-icon",
    );
    const motionSections = document.querySelectorAll<HTMLElement>(
      ".learning-section, .about-section, .media-section, .opportunity-section, .site-footer",
    );
    const cleanups: (() => void)[] = [];
    let scrollFrame = 0;
    const updateSectionFlow = () => {
      scrollFrame = 0;
      const viewportHeight = window.innerHeight;
      motionSections.forEach((section) => {
        const box = section.getBoundingClientRect();
        const travel = viewportHeight + box.height;
        const progress = Math.max(0, Math.min(1, (viewportHeight - box.top) / travel));
        section.style.setProperty("--section-flow", progress.toFixed(3));
      });
    };
    const onScroll = () => {
      if (media.matches || scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(updateSectionFlow);
    };
    updateSectionFlow();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    cleanups.push(() => {
      window.cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      motionSections.forEach((section) => section.style.removeProperty("--section-flow"));
    });
    surfaces.forEach((element) => {
      const move = (event: PointerEvent) => {
        if (media.matches || !fine.matches || event.pointerType === "touch") return;
        const box = element.getBoundingClientRect();
        element.style.setProperty(
          "--depth-x",
          `${((event.clientX - box.left) / box.width - 0.5) * 12}px`,
        );
        element.style.setProperty(
          "--depth-y",
          `${((event.clientY - box.top) / box.height - 0.5) * 12}px`,
        );
        element.style.setProperty(
          "--light-x",
          `${((event.clientX - box.left) / box.width) * 100}%`,
        );
        element.style.setProperty(
          "--light-y",
          `${((event.clientY - box.top) / box.height) * 100}%`,
        );
      };
      const reset = () => {
        element.style.setProperty("--depth-x", "0px");
        element.style.setProperty("--depth-y", "0px");
      };
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", reset);
      cleanups.push(() => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", reset);
        reset();
      });
    });
    buttons.forEach((element) => {
      const move = (event: PointerEvent) => {
        if (media.matches || !fine.matches || event.pointerType === "touch") return;
        const box = element.getBoundingClientRect();
        element.style.translate = `${(event.clientX - box.left - box.width / 2) * 0.13}px ${(event.clientY - box.top - box.height / 2) * 0.13}px`;
      };
      const reset = () => {
        element.style.translate = "0px 0px";
      };
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", reset);
      element.addEventListener("blur", reset);
      cleanups.push(() => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", reset);
        element.removeEventListener("blur", reset);
        reset();
      });
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);
  return null;
}
