import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Music2,
  Search,
  Sparkles,
  X,
  Youtube,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

import achieveProduct from "@/assets/achieve-product.jpg";
import bioniqProduct from "@/assets/bioniq-product.jpg";
import brainifyRadial from "@/assets/brainify-radial.jpg";
import helioProduct from "@/assets/helio-product.jpg";
import founderStory from "@/assets/ignite-founder-story.jpg";
import steppeHero from "@/assets/ignite-steppe-hero.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IGNITE Kazakhstan & Russia | Make Wellness a Movement" },
      {
        name: "description",
        content:
          "Explore purposeful wellness products, practical AI learning, and the IGNITE business opportunity across Kazakhstan and Russia.",
      },
      { property: "og:title", content: "IGNITE Kazakhstan & Russia | Make Wellness a Movement" },
      {
        property: "og:description",
        content: "Fuel your life and own your future with IGNITE wellness, learning, and opportunity.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const navigation = [
  ["Products", "#products"],
  ["About", "#about"],
  ["Business Opportunity", "#opportunity"],
  ["Resources", "#resources"],
  ["Support", "#support"],
] as const;

const productCategories = ["Featured", "Fitness Performance", "Healthy Weight", "Daily Nutrition", "Targeted Health"];

const products = [
  {
    name: "BIONIQ GO",
    label: "Personalized daily supplement",
    description: "We take your health personally—with daily nutrition shaped around your goals and lifestyle.",
    image: bioniqProduct,
    alt: "Bioniq GO personalized supplement pack",
    categories: ["Daily Nutrition", "Targeted Health"],
  },
  {
    name: "LIFE I/O Helio",
    label: "Daily all-in-one super shake",
    description: "A convenient blend made to support busy days with purposeful, everyday nutrition.",
    image: helioProduct,
    alt: "LIFE I/O Helio super shake and shaker",
    categories: ["Healthy Weight", "Daily Nutrition"],
  },
  {
    name: "Herbalife24 ACHIEVE",
    label: "High-protein performance bar",
    description: "A high-protein snack designed to help you get through your day or workout.",
    image: achieveProduct,
    alt: "Herbalife24 ACHIEVE protein bar",
    categories: ["Fitness Performance", "Targeted Health"],
  },
] as const;

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.16 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 lg:px-12">
        <div className="flex items-center gap-10 xl:gap-14">
          <a href="#top" className="font-display text-2xl font-semibold uppercase text-graphite" aria-label="IGNITE home">
            IGNITE<span className="text-sky-blue">.</span>
          </a>
          <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary navigation">
            {navigation.map(([label, href]) => (
              <a key={label} href={href} className="nav-link text-xs font-bold uppercase text-graphite/75">{label}</a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3 lg:gap-5">
          <div className="language-list" aria-label="Language options">
            <button type="button" aria-current="true">EN</button><span>/</span>
            <button type="button">РУС</button><span>/</span><button type="button">ҚАЗ</button>
          </div>
          <Button variant="outline" size="icon" className="hidden rounded-full sm:inline-flex" aria-label="Search"><Search /></Button>
          <Button asChild size="sm" className="hidden rounded-none uppercase lg:inline-flex"><a href="#distributor">Distributor Login</a></Button>
          <Button variant="outline" size="icon" className="rounded-full xl:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navigation.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}<ArrowRight size={18} /></a>)}
          <a id="distributor" href="#support" onClick={() => setOpen(false)}>Distributor Login<ArrowRight size={18} /></a>
        </nav>
      )}
    </header>
  );
}

function HomePage() {
  const [category, setCategory] = useState("Featured");
  const [movement, setMovement] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const movementStories = [
    ["Wellness", "Small daily choices become lasting momentum."],
    ["Learning", "Practical knowledge opens new paths forward."],
    ["Opportunity", "Independent ambition grows through community."],
  ] as const;
  const visibleProducts = category === "Featured" ? products : products.filter((product) => product.categories.some((item) => item === category));

  useEffect(() => {
    const timer = window.setInterval(() => setMovement((current) => (current + 1) % movementStories.length), 6000);
    return () => window.clearInterval(timer);
  }, [movementStories.length]);

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <div id="top" className="overflow-hidden bg-warm-white text-graphite">
      <Header />
      <main className="pt-20">
        <section className="hero-section relative flex min-h-[calc(100svh-5rem)] flex-col justify-end overflow-hidden px-5 pb-10 md:px-10 md:pb-16 lg:px-12 lg:pb-20">
          <img src={steppeHero} alt="Open Kazakhstan steppe and mountains at sunrise" width={1920} height={1088} className="hero-image absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-hero-wash" />
          <div className="relative z-10 mx-auto w-full max-w-[1600px]">
            <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase text-graphite/70 animate-rise"><span className="h-px w-10 bg-heritage-gold" /> Kazakhstan & Russia</div>
            <h1 className="max-w-[1100px] font-display text-[clamp(3.2rem,9vw,8.6rem)] font-semibold leading-[0.91] text-graphite animate-rise animation-delay-1">Make wellness<br />a movement.</h1>
            <div className="mt-8 flex flex-col gap-8 border-t border-graphite/20 pt-6 md:flex-row md:items-end md:justify-between animate-rise animation-delay-2">
              <div><p className="font-display text-lg font-semibold uppercase md:text-2xl">Fuel your life. Own your future.</p><p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed md:text-lg">Join a health and wellness platform shaped by over 45 years of scientific research, high-quality ingredients, and community spirit.</p></div>
              <a href="#products" className="primary-action group shrink-0">Explore the journey <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" /></a>
            </div>
          </div>
          <div className="hero-country-mark" aria-hidden="true">KZ · RU</div>
        </section>

        <section id="products" className="section-pad bg-warm-white">
          <div className="mx-auto max-w-[1600px]">
            <Reveal className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div><p className="eyebrow">Product highlight</p><h2 className="section-title mt-4">Proven formulas to reach your goals.</h2></div>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground lg:justify-self-end">Purposeful nutrition for performance, healthy weight, daily routines, and targeted wellbeing.</p>
            </Reveal>
            <div className="category-strip" role="tablist" aria-label="Product categories">
              {productCategories.map((item) => <button key={item} type="button" role="tab" aria-selected={category === item} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
            <div className="product-grid" aria-live="polite">
              {visibleProducts.map((product, index) => (
                <Reveal key={product.name} delay={index * 90} className={visibleProducts.length === 1 ? "md:col-span-2 lg:col-span-3" : ""}>
                  <article id={`product-${index + 1}`} className="product-card group">
                    <div><p className="product-kicker">{product.label}</p><h3 className="product-title">{product.name}</h3></div>
                    <div className="product-image-wrap"><img src={product.image} alt={product.alt} width={1000} height={800} loading="lazy" className="product-image" /></div>
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                    <a href="#support" className="outline-action">Discover product <ArrowRight size={16} /></a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="resources" className="section-pad relative bg-graphite text-warm-white">
          <div className="radial-lines" aria-hidden="true" />
          <div className="relative z-10 mx-auto grid max-w-[1600px] items-center gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow text-heritage-gold">Smarter learning. Real-world skills.</p>
              <h2 className="section-title mt-4 max-w-3xl">Knowledge is the final supplement.</h2>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-warm-white/65">Discover brAInify—an AI-powered learning experience designed to build practical skills, unlock new possibilities, and turn knowledge into real-world action.</p>
              <div className="mt-8 flex flex-wrap gap-2">{["The AI Path", "The Creator Path", "Financial Intelligence", "Digital Economy"].map((item) => <span key={item} className="topic-pill">{item}</span>)}</div>
              <a href="#support" className="primary-action mt-10 bg-sky-blue text-warm-white ring-sky-blue hover:bg-heritage-gold">Explore brAInify <ArrowRight size={16} /></a>
            </Reveal>
            <Reveal className="relative lg:col-span-5" delay={120}>
              <div className="brainify-orbit" aria-hidden="true"><span>CREATE</span><span>LEARN</span><span>GROW</span></div>
              <img src={brainifyRadial} alt="Abstract intelligent learning network" width={912} height={912} loading="lazy" className="relative aspect-square w-full rounded-sm object-cover" />
            </Reveal>
          </div>
        </section>

        <section className="movement-section" aria-labelledby="movement-title">
          <div className="movement-map" aria-hidden="true"><span className="city city-almaty">ALMATY<i /></span><span className="city city-astana">ASTANA<i /></span><span className="city city-moscow">MOSCOW<i /></span><span className="route-line route-one" /><span className="route-line route-two" /><span className="route-pulse" /></div>
          <div className="movement-inner">
            <Reveal className="movement-copy">
              <p className="eyebrow text-heritage-gold"><Sparkles size={14} /> One region. Limitless potential.</p>
              <h2 id="movement-title" className="section-title mt-5">Ideas move.<br />People connect.<br />Progress travels.</h2>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-warm-white/65">From the steppe to the city, IGNITE brings purposeful wellbeing, new skills, and independent opportunity into one shared movement.</p>
            </Reveal>
            <div className="movement-story" aria-live="polite">
              <span>0{movement + 1} / 03</span><h3>{movementStories[movement]?.[0]}</h3><p>{movementStories[movement]?.[1]}</p>
              <div className="movement-controls">{movementStories.map(([title], index) => <button key={title} type="button" aria-label={`Show ${title}`} aria-current={movement === index} onClick={() => setMovement(index)} />)}</div>
            </div>
          </div>
        </section>

        <section id="about" className="section-pad bg-warm-white">
          <div className="mx-auto grid max-w-[1600px] items-center gap-14 lg:grid-cols-2 lg:gap-24">
            <Reveal className="image-reveal"><img src={founderStory} alt="Modern entrepreneur in Almaty" width={1008} height={1200} loading="lazy" className="aspect-[4/5] w-full object-cover" /></Reveal>
            <Reveal delay={120}><p className="eyebrow text-heritage-gold">This is IGNITE</p><h2 className="section-title mt-4">People. Purpose.<br />Real value.</h2><p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">A global social enterprise built around people, purpose, and products that create real value. Discover our story, our promise, and the people shaping what comes next.</p>
              <div className="mt-10 grid grid-cols-3 border-y border-graphite/10 py-7"><div><strong className="stat">45+</strong><span className="stat-label">Years of experience</span></div><div><strong className="stat">2</strong><span className="stat-label">Regional markets</span></div><div><strong className="stat">1</strong><span className="stat-label">Global movement</span></div></div>
              <a href="#support" className="mt-9 inline-flex items-center gap-3 border-b-2 border-sky-blue pb-2 text-xs font-bold uppercase">Learn more <ArrowRight size={16} /></a>
            </Reveal>
          </div>
        </section>

        <section id="media" className="media-section">
          <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-12">
            <Reveal className="media-heading"><div><p className="eyebrow">PR coverage</p><h2 className="mt-4 font-display text-4xl font-semibold md:text-6xl">Trusted voices covering IGNITE.</h2></div><p>Discover how media outlets around the world are covering our mission, innovation, products, and people-first approach.</p></Reveal>
            <div className="press-grid">{["FINANCIAL CAPITAL", "MONEY BUZZING ASIA", "ASIA VIRAL NEWS", "ASEAN COVERAGE", "THE WORLD AGENDA", "VOYAGE TIMES"].map((name, index) => <Reveal key={name} delay={index * 45}><a href="#support" className="press-item"><span>0{index + 1}</span><strong>{name}</strong><ArrowRight /></a></Reveal>)}</div>
            <a href="#support" className="primary-action mt-10">View all media coverage <ArrowRight size={16} /></a>
          </div>
          <div className="news-marquee" aria-hidden="true"><div className="news-track">{["IN THE NEWS", "IGNITE THE FUTURE", "PEOPLE FIRST", "IN THE NEWS", "IGNITE THE FUTURE", "PEOPLE FIRST"].map((name, index) => <span key={`${name}-${index}`} className="news-name">{name}</span>)}</div></div>
        </section>

        <section id="opportunity" className="opportunity-section relative flex min-h-[78vh] items-center overflow-hidden px-5 py-28 text-center md:px-10 lg:px-12">
          <div className="opportunity-rings" aria-hidden="true"><i /><i /></div>
          <Reveal className="relative z-10 mx-auto max-w-5xl"><p className="eyebrow">The IGNITE opportunity</p><h2 className="mt-5 font-display text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.95]">Your journey.<br />Your choice. Your future.</h2><p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">Whether you’re exploring our products or ready to build a business, connect with a global community, powerful tools, and the freedom to create your own path.</p><a href="#support" className="primary-action mt-10">Start your IGNITE business <ArrowRight size={17} /></a></Reveal>
        </section>
      </main>
      <Footer subscribed={subscribed} onSubscribe={subscribe} />
    </div>
  );
}

function Footer({ subscribed, onSubscribe }: { subscribed: boolean; onSubscribe: (event: FormEvent<HTMLFormElement>) => void }) {
  const groups = [
    ["Products", "brAInify", "The AI Path", "The Creator Path", "Digital Marketing Path"],
    ["About", "About IGNITE", "Leadership", "Global Advisory Board", "Media", "FAQs"],
    ["Business Opportunity", "The IGNITE Opportunity", "Become a Brand Affiliate", "Build Your Business", "Training"],
    ["Resources & Support", "Blog", "Training and Events", "Policies", "Contact Us", "Help Centre"],
  ];
  const socials = [[Instagram, "Instagram"], [Youtube, "YouTube"], [Facebook, "Facebook"], [Linkedin, "LinkedIn"], [Music2, "TikTok"]] as const;
  return (
    <footer id="support" className="bg-graphite px-5 pb-10 pt-20 text-warm-white md:px-10 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="footer-top">
          <div><span className="font-display text-4xl font-semibold">IGNITE<span className="text-sky-blue">.</span></span><p className="mt-6 max-w-sm text-sm leading-relaxed text-warm-white/55">Advancing human potential through intelligent learning, meaningful products, and a people-first community across Kazakhstan and Russia.</p><a href="mailto:spark@joinignite.com" className="mt-6 inline-flex items-center gap-2 text-sm text-warm-white"><Mail size={15} /> spark@joinignite.com</a><div className="mt-8 flex gap-3">{socials.map(([Icon, name]) => <a href="#social" key={name} className="social-icon" aria-label={`Follow IGNITE on ${name}`}><Icon size={17} /></a>)}</div></div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">{groups.map(([title, ...links]) => <div key={title}><h3 className="mb-5 text-[11px] font-bold uppercase text-warm-white">{title}</h3><ul className="space-y-3">{links.map((link) => <li key={link}><a href="#top" className="text-sm text-warm-white/50 transition-colors hover:text-warm-white">{link}</a></li>)}</ul></div>)}</div>
        </div>
        <div className="footer-newsletter"><div><p className="eyebrow text-heritage-gold">Stay in the movement</p><h3 className="mt-2 font-display text-2xl font-semibold">News, learning, and regional updates.</h3></div>{subscribed ? <p className="subscribe-success"><Check size={18} /> Thank you. You’re on the list.</p> : <form onSubmit={onSubscribe} className="newsletter-form"><label><span>Name</span><input required name="name" autoComplete="name" placeholder="Your full name" /></label><label><span>Email</span><input required type="email" name="email" autoComplete="email" placeholder="you@example.com" /></label><Button type="submit" className="h-12 rounded-none bg-sky-blue px-6 uppercase">Subscribe</Button></form>}</div>
        <div className="footer-policies"><div>{["AI Content Disclaimer", "Shipping Policy", "Return, Refund & Exchange", "Terms & Conditions", "Privacy Policy", "Social Media Policy"].map((item) => <a key={item} href="#top">{item}</a>)}</div><p>Copyright © 2026 IGNITE Kazakhstan. No reproduction in whole or in part without written permission. All Rights Reserved.</p></div>
      </div>
    </footer>
  );
}