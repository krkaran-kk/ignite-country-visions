import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  Search,
  X,
  Youtube,
} from "lucide-react";
import { useState } from "react";

import achieveProduct from "@/assets/achieve-product.jpg";
import bioniqProduct from "@/assets/bioniq-product.jpg";
import brainifyRadial from "@/assets/brainify-radial.jpg";
import helioProduct from "@/assets/helio-product.jpg";
import founderStory from "@/assets/ignite-founder-story.jpg";
import steppeHero from "@/assets/ignite-steppe-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IGNITE Kazakhstan & Russia | Make Wellness a Movement" },
      {
        name: "description",
        content:
          "Discover IGNITE products, learning resources, and business opportunities for Kazakhstan and Russia.",
      },
      { property: "og:title", content: "IGNITE Kazakhstan & Russia" },
      {
        property: "og:description",
        content: "Wellness, learning, and opportunity—built for modern life across Kazakhstan and Russia.",
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

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-graphite/10 bg-warm-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 lg:px-12">
        <div className="flex items-center gap-10 xl:gap-14">
          <a href="#top" className="font-display text-2xl font-semibold uppercase text-graphite" aria-label="IGNITE home">
            IGNITE<span className="text-sky-blue">.</span>
          </a>
          <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary navigation">
            {navigation.map(([label, href]) => (
              <a key={label} href={href} className="nav-link text-xs font-bold uppercase text-graphite/75">
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase" aria-label="Language options">
            <span className="text-graphite">EN</span><span className="text-border">/</span>
            <span className="text-muted-foreground">РУС</span><span className="text-border">/</span>
            <span className="text-muted-foreground">ҚАЗ</span>
          </div>
          <button className="icon-control hidden sm:grid" type="button" aria-label="Search">
            <Search size={17} strokeWidth={1.8} />
          </button>
          <a href="#login" className="hidden text-xs font-bold uppercase text-graphite lg:block">Distributor Login</a>
          <button className="icon-control xl:hidden" type="button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-graphite/10 bg-warm-white px-5 py-6 xl:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-[1600px] flex-col">
            {navigation.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setOpen(false)} className="border-b border-graphite/10 py-4 font-display text-xl font-medium">
                {label}
              </a>
            ))}
            <a href="#login" className="mt-6 font-bold uppercase text-sky-blue">Distributor Login</a>
          </div>
        </nav>
      )}
    </header>
  );
}

function HomePage() {
  return (
    <div id="top" className="overflow-hidden bg-warm-white text-graphite">
      <Header />
      <main className="pt-20">
        <section className="hero-section relative flex min-h-[calc(100svh-5rem)] flex-col justify-end overflow-hidden px-5 pb-10 md:px-10 md:pb-16 lg:px-12 lg:pb-20">
          <img src={steppeHero} alt="Open steppe and mountains at sunrise" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-hero-wash" />
          <div className="relative z-10 mx-auto w-full max-w-[1600px]">
            <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase text-graphite/70 animate-rise">
              <span className="h-px w-10 bg-heritage-gold" /> Kazakhstan & Russia
            </div>
            <h1 className="max-w-[1000px] font-display text-[clamp(3.3rem,9vw,8.6rem)] font-semibold leading-[0.91] text-graphite animate-rise animation-delay-1">
              Make wellness<br />a movement.
            </h1>
            <div className="mt-8 flex flex-col gap-8 border-t border-graphite/20 pt-6 md:flex-row md:items-end md:justify-between animate-rise animation-delay-2">
              <p className="max-w-2xl text-base font-medium leading-relaxed md:text-xl">
                Fuel your life. Own your future. A people-first platform for purposeful products, practical learning, and a connected global community.
              </p>
              <a href="#products" className="primary-action group shrink-0">
                Explore the journey <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" />
              </a>
            </div>
          </div>
        </section>

        <section id="products" className="section-pad bg-warm-white">
          <div className="mx-auto max-w-[1600px] lg:grid lg:grid-cols-[0.75fr_1.65fr] lg:gap-20">
            <div className="mb-12 lg:sticky lg:top-32 lg:mb-0 lg:self-start">
              <p className="eyebrow">Product highlight</p>
              <h2 className="section-title mt-4">Wellness, made personal.</h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">Three distinct ways to support the rhythm of your everyday life—selected for performance, clarity, and convenience.</p>
              <div className="mt-9 hidden items-center gap-3 text-xs font-bold uppercase text-muted-foreground lg:flex">
                <span className="h-px w-12 bg-sky-blue" /> Scroll to discover
              </div>
            </div>
            <div className="grid gap-px bg-border md:grid-cols-2">
              <article className="product-card group">
                <div><p className="product-kicker">Personalized daily nutrition</p><h3 className="product-title">Bioniq GO</h3></div>
                <div className="product-image-wrap"><img src={bioniqProduct} alt="Personalized supplement pack" width={912} height={912} loading="lazy" className="product-image" /></div>
                <a href="#product-bioniq" className="outline-action">Discover Bioniq GO <ArrowRight size={16} /></a>
              </article>
              <article className="product-card group">
                <div><p className="product-kicker">All-in-one super shake</p><h3 className="product-title">LIFE I/O Helio</h3></div>
                <div className="product-image-wrap"><img src={helioProduct} alt="Super shake and shaker" width={912} height={912} loading="lazy" className="product-image" /></div>
                <a href="#product-helio" className="outline-action">Discover Helio <ArrowRight size={16} /></a>
              </article>
            </div>
            <article className="mt-px border border-border p-6 md:p-10 lg:col-start-2 lg:flex lg:items-center lg:gap-12">
              <div className="lg:w-[40%]"><p className="product-kicker">High-protein daily fuel</p><h3 className="font-display text-3xl font-semibold md:text-4xl">Herbalife24 ACHIEVE</h3><p className="mt-4 text-muted-foreground">A high-protein snack designed to help you through your day or workout.</p><a href="#product-achieve" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase text-sky-blue">View product <ArrowRight size={15} /></a></div>
              <div className="mt-8 overflow-hidden rounded-sm lg:mt-0 lg:w-[60%]"><img src={achieveProduct} alt="Protein snack bar" width={1200} height={608} loading="lazy" className="h-56 w-full object-cover transition-transform duration-700 hover:scale-[1.03]" /></div>
            </article>
          </div>
        </section>

        <section id="resources" className="section-pad relative bg-graphite text-warm-white">
          <div className="radial-lines" aria-hidden="true" />
          <div className="relative z-10 mx-auto grid max-w-[1600px] items-center gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow text-heritage-gold">Smarter learning. Real-world skills.</p>
              <h2 className="section-title mt-4 max-w-3xl">Knowledge is the final supplement.</h2>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-warm-white/65">Discover brAInify—an AI-powered learning experience designed to build practical skills, unlock new possibilities, and turn knowledge into real-world action.</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {["The AI Path", "The Creator Path", "Financial Intelligence", "Digital Economy"].map((item) => <span key={item} className="topic-pill">{item}</span>)}
              </div>
              <a href="#brainify" className="primary-action mt-10 bg-sky-blue text-warm-white ring-sky-blue hover:bg-heritage-gold hover:ring-heritage-gold">Explore brAInify <ArrowRight size={16} /></a>
            </div>
            <div className="relative lg:col-span-5">
              <div className="absolute inset-[-10%] rounded-full border border-warm-white/10 animate-orbit" />
              <img src={brainifyRadial} alt="Abstract intelligent learning network" width={912} height={912} loading="lazy" className="relative aspect-square w-full rounded-sm object-cover" />
            </div>
          </div>
        </section>

        <section id="about" className="section-pad bg-warm-white">
          <div className="mx-auto grid max-w-[1600px] items-center gap-14 lg:grid-cols-2 lg:gap-24">
            <div className="image-reveal"><img src={founderStory} alt="Modern entrepreneur in Almaty" width={1008} height={1200} loading="lazy" className="aspect-[4/5] w-full object-cover" /></div>
            <div>
              <p className="eyebrow text-heritage-gold">This is IGNITE</p>
              <h2 className="section-title mt-4">People. Purpose.<br />Real value.</h2>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">A global social enterprise built around people, purposeful products, and shared progress. Discover our story, our promise, and the community shaping what comes next.</p>
              <div className="mt-10 grid grid-cols-3 border-y border-graphite/10 py-7">
                <div><strong className="stat">45+</strong><span className="stat-label">Years of experience</span></div>
                <div><strong className="stat">2</strong><span className="stat-label">Regional markets</span></div>
                <div><strong className="stat">1</strong><span className="stat-label">Global movement</span></div>
              </div>
              <a href="#our-story" className="mt-9 inline-flex items-center gap-3 border-b-2 border-sky-blue pb-2 text-xs font-bold uppercase">Read our story <ArrowRight size={16} /></a>
            </div>
          </div>
        </section>

        <section className="border-y border-graphite/10 bg-soft-white px-5 py-14 md:px-10 lg:px-12">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-10 flex items-end justify-between"><div><p className="eyebrow">In the news</p><h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">A growing global conversation.</h2></div><a href="#media" className="hidden items-center gap-2 text-xs font-bold uppercase text-sky-blue md:flex">View media <ArrowRight size={15} /></a></div>
            <div className="news-marquee" aria-label="Media outlets"><div className="news-track">{["FINANCIAL CAPITAL", "MONEY BUZZING ASIA", "ASIA VIRAL NEWS", "ASEAN COVERAGE", "THE WORLD AGENDA", "VOYAGE TIMES", "FINANCIAL CAPITAL", "MONEY BUZZING ASIA"].map((name, index) => <span key={`${name}-${index}`} className="news-name">{name}</span>)}</div></div>
          </div>
        </section>

        <section id="opportunity" className="opportunity-section relative flex min-h-[78vh] items-center overflow-hidden px-5 py-28 text-center md:px-10 lg:px-12">
          <div className="opportunity-rings" aria-hidden="true"><i /><i /></div>
          <div className="relative z-10 mx-auto max-w-5xl">
            <p className="eyebrow">The IGNITE opportunity</p>
            <h2 className="mt-5 font-display text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.95]">Your journey.<br />Your choice. Your future.</h2>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">Whether you are exploring our products or ready to build a business, connect with a global community, practical tools, and the freedom to create your own path.</p>
            <a href="#start" className="primary-action mt-10">Start your IGNITE business <ArrowRight size={17} /></a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  const groups = [
    ["Products", "brAInify", "The AI Path", "The Creator Path", "Digital Marketing Path"],
    ["About", "About IGNITE", "Our Promise", "Leadership", "Media", "FAQs"],
    ["Business", "The IGNITE Opportunity", "Become a Brand Affiliate", "Build Your Business", "Training"],
    ["Resources", "IGNITE Blog", "Training and Events", "Policies", "Help Centre"],
  ];
  return (
    <footer id="support" className="bg-graphite px-5 pb-10 pt-20 text-warm-white md:px-10 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-14 border-b border-warm-white/10 pb-20 lg:grid-cols-[1.5fr_2fr]">
          <div><span className="font-display text-4xl font-semibold">IGNITE<span className="text-sky-blue">.</span></span><p className="mt-6 max-w-sm text-sm leading-relaxed text-warm-white/55">Advancing human potential through intelligent learning, meaningful products, and a people-first community across Kazakhstan and Russia.</p><div className="mt-8 flex gap-3">{[Instagram, Youtube, Facebook, Linkedin].map((Icon, i) => <a href="#social" key={i} className="social-icon" aria-label="Social media"><Icon size={17} /></a>)}</div></div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">{groups.map(([title, ...links]) => <div key={title}><h3 className="mb-5 text-[11px] font-bold uppercase text-warm-white">{title}</h3><ul className="space-y-3">{links.map(link => <li key={link}><a href="#footer" className="text-sm text-warm-white/50 transition-colors hover:text-warm-white">{link}</a></li>)}</ul></div>)}</div>
        </div>
        <div className="flex flex-col gap-5 pt-8 text-[10px] font-bold uppercase text-warm-white/35 md:flex-row md:items-center md:justify-between"><span>© 2026 IGNITE Kazakhstan. All rights reserved.</span><div className="flex flex-wrap gap-6"><span>English</span><span>Русский</span><span>Қазақша</span><a href="#privacy">Privacy</a><a href="#terms">Terms</a></div></div>
      </div>
    </footer>
  );
}