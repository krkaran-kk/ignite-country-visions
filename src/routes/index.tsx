import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Facebook,
  Globe2,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Music2,
  Search,
  X,
  Youtube,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import brainifyRadial from "@/assets/brainify-radial.jpg";
import founderStory from "@/assets/ignite-founder-story.jpg";
import steppeHero from "@/assets/ignite-steppe-hero.jpg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { footerGroups, homeCopy, policies, siteDetails } from "@/content/home";
import { IgniteExperience, KineticRibbon, PageMotion } from "@/components/home/ignite-experience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IGNITE Kazakhstan & Russia | Fuel Your Life. Own Your Future." },
      { name: "description", content: homeCopy.hero },
      { property: "og:title", content: "IGNITE | Fuel Your Life. Own Your Future." },
      { property: "og:description", content: homeCopy.hero },
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
const sectionLinks: Record<string, string> = {
  brAInify: "#products",
  "About IGNITE": "#about",
  Media: "#media",
  "The IGNITE Opportunity": "#opportunity",
  "Contact Us": "#support",
  Policies: "#policies",
};

function Destination({
  title,
  children,
  className = "",
  description,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  description?: string;
}) {
  const href = siteDetails.destinations[title];
  if (href)
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className={className}>
          {children}
        </button>
      </DialogTrigger>
      <DialogContent className="inquiry-dialog">
        <span className="section-kicker">IGNITE Kazakhstan</span>
        <DialogTitle className="inquiry-title">{title}</DialogTitle>
        <DialogDescription className="inquiry-description">
          {description || "For inquiries, please contact:"}
        </DialogDescription>
        {description && <p className="inquiry-caption">For inquiries, please contact:</p>}
        <a
          className="inquiry-mail"
          href={`mailto:${siteDetails.email}?subject=${encodeURIComponent(title)}`}
        >
          <Mail size={18} />
          {siteDetails.email}
          <ArrowUpRight size={18} />
        </a>
      </DialogContent>
    </Dialog>
  );
}

<<<<<<< HEAD
function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
=======
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
>>>>>>> 2234dbf267c942b141066b17fcfec78f10b428f9
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (
      !element ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    element.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          element.classList.remove("reveal-ready");
          observer.unobserve(element);
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const sections = [
    {
      title: "The IGNITE experience",
      detail: "Interactive · Learn, connect, grow.",
      href: "#experience",
    },
    {
      title: "brAInify",
      detail: "Products · Smarter learning. Real-world skills.",
      href: "#products",
    },
    { title: "This is IGNITE", detail: "About · People, purpose, and products.", href: "#about" },
    { title: "In the news", detail: "Media · Resources and global conversations.", href: "#media" },
    {
      title: "Business Opportunity",
      detail: "Your journey. Your choice. Your future.",
      href: "#opportunity",
    },
    { title: "Contact Us", detail: "Support · IGNITE Kazakhstan", href: "#support" },
  ].filter((item) =>
    `${item.title} ${item.detail}`.toLowerCase().includes(query.toLowerCase().trim()),
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="header-icon" aria-label="Search">
          <Search size={18} />
        </button>
      </DialogTrigger>
      <DialogContent className="inquiry-dialog search-dialog">
        <DialogTitle className="inquiry-title">Explore IGNITE</DialogTitle>
        <DialogDescription>Find your way around our homepage.</DialogDescription>
        <label className="search-field">
          <Search size={19} />
          <input
            aria-label="Search homepage"
            placeholder="What are you looking for?"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="search-results" aria-live="polite">
          {sections.length ? (
            sections.map((item) => (
              <a href={item.href} key={item.href} onClick={() => setOpen(false)}>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.detail}</small>
                </span>
                <ArrowUpRight size={20} />
              </a>
            ))
          ) : (
            <p>No matching sections. Try “learning” or “support”.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(scrollTop > 36);
        headerRef.current?.style.setProperty(
          "--page-progress",
          `${scrollRange > 0 ? Math.min(100, (scrollTop / scrollRange) * 100) : 0}%`,
        );
        frame = 0;
      });
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const observedSections = [
      "top",
      "products",
      "experience",
      "about",
      "media",
      "opportunity",
      "support",
    ]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-18% 0px -62%", threshold: [0, 0.08, 0.25] },
    );
    observedSections.forEach((section) => sectionObserver.observe(section));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.cancelAnimationFrame(frame);
      sectionObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);
  const linkIsActive = (href: string) => {
    const id = href.slice(1);
    if (id === "products") return activeSection === "products" || activeSection === "experience";
    if (id === "resources") return activeSection === "media";
    return activeSection === id;
  };
  return (
    <header
      ref={headerRef}
      className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "menu-is-open" : ""}`}
    >
      <div className="header-shell">
        <a href="#top" className="logo" aria-label="IGNITE home">
          <img src="/logo-ignite.webp" alt="IGNITE — Own Your Future" />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map(([label, href]) => (
            <a
              className="nav-link"
              key={label}
              href={href}
              aria-current={linkIsActive(href) ? "location" : undefined}
            >
              <span className="nav-signal" aria-hidden="true" />
              {label}
            </a>
          ))}
        </nav>
        <div className="header-tools">
          <div className="region-signal" aria-label="IGNITE Kazakhstan and Russia">
            <span className="region-pulse" />
            <span>KZ / RU</span>
            <small>CONNECTED</small>
          </div>
          <details className="language-picker">
            <summary aria-label="Language options">
              <Globe2 size={15} /> EN <ChevronDown size={12} />
            </summary>
            <div className="language-options">
              <span aria-current="true">
                English <span>EN</span>
              </span>
              <span lang="ru">
                Русский <span>РУС</span>
              </span>
              <span lang="kk">
                Қазақша <span>ҚАЗ</span>
              </span>
            </div>
          </details>
          <SiteSearch />
          <Destination title="Distributor Login" className="login-button">
            Distributor Login <ArrowUpRight size={14} />
          </Destination>
          <button
            className="header-icon menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <div className="header-progress" aria-hidden="true">
        <span />
      </div>
      {open && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          <div className="mobile-nav-intro">
            <img src="/logo-ignite.webp" alt="" aria-hidden="true" />
            <div>
              <span>EXPLORE IGNITE</span>
              <span>KAZAKHSTAN · RUSSIA</span>
            </div>
          </div>
          {navigation.map(([label, href], index) => (
            <a key={label} href={href} onClick={() => setOpen(false)}>
              <span>
                <small>0{index + 1}</small>
                {label}
              </span>
              <ArrowUpRight size={18} />
            </a>
          ))}
          <Destination title="Distributor Login" className="mobile-login">
            Distributor Login
            <ArrowUpRight size={18} />
          </Destination>
        </nav>
      )}
    </header>
  );
}

<<<<<<< HEAD
function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
=======
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

>>>>>>> 2234dbf267c942b141066b17fcfec78f10b428f9
  return (
    <div className="section-label">
      <span className="section-number">{number}</span>
      <span>{children}</span>
      <span className="label-rule" />
    </div>
  );
}

function FlowConnector({
  from,
  to,
  start,
  end,
  tone = "light",
}: {
  from: string;
  to: string;
  start: string;
  end: string;
  tone?: "light" | "sand" | "dark" | "return";
}) {
  return (
    <div className="flow-connector" data-tone={tone} aria-hidden="true">
      <div className="flow-connector-inner">
        <span className="flow-endpoint">
          <small>{from}</small>
          {start}
        </span>
        <svg viewBox="0 0 1000 54" preserveAspectRatio="none">
          <path className="flow-guide" d="M0 27H1000" />
          <path
            className="flow-current"
            d="M0 27C180 27 190 6 350 6S520 48 680 48 820 27 1000 27"
          />
        </svg>
        <span className="flow-particle" />
        <span className="flow-endpoint flow-endpoint-last">
          {end}
          <small>{to}</small>
        </span>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div id="top" className="home-page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <section className="hero-section" aria-labelledby="hero-title">
          <img
            src={steppeHero}
            alt="Open Kazakhstan steppe and mountains at sunrise"
            width={1920}
            height={1088}
            className="hero-image"
            fetchPriority="high"
          />
          <div className="bg-hero-wash" />
          <div className="hero-content">
            <p className="hero-location animate-rise">
              <span /> Kazakhstan & Russia
            </p>
            <h1 id="hero-title" className="animate-rise animation-delay-1">
              Fuel your life.
              <br />
              Own your future.
            </h1>
            <div className="hero-bottom animate-rise animation-delay-2">
              <p>{homeCopy.hero}</p>
              <a href="#products" className="primary-action">
                Explore the journey
                <ArrowDown size={17} />
              </a>
            </div>
          </div>
          <div className="hero-country-mark" aria-hidden="true">
            KZ · RU
          </div>
        </section>

        <FlowConnector from="00" to="01" start="BEGIN" end="DISCOVER" />

        <section
          id="products"
          className="learning-section section-space"
          aria-labelledby="learning-title"
        >
          <div className="page-container">
            <SectionLabel number="01">Product highlight</SectionLabel>
            <div className="learning-grid">
              <Reveal className="learning-copy">
                <span className="brand-brainify">
                  br<span>AI</span>nify
                </span>
                <h2 id="learning-title">
                  Smarter learning.
                  <br />
                  <em>Real-world skills.</em>
                </h2>
                <p className="section-body">{homeCopy.product}</p>
                <Destination
                  title="brAInify"
                  description={homeCopy.product}
                  className="round-action"
                >
                  Explore brAInify
                  <span>
                    <ArrowUpRight size={21} />
                  </span>
                </Destination>
              </Reveal>
              <Reveal className="learning-art">
                <div className="art-topline">
                  <span>
                    <i /> INTELLIGENCE IN MOTION
                  </span>
                  <span>brAInify / 01</span>
                </div>
                <img
                  src={brainifyRadial}
                  alt="An illuminated network of interconnected ideas"
                  width={912}
                  height={912}
                  loading="lazy"
                />
                <div className="art-wordmark" aria-hidden="true">
                  br<span>AI</span>nify
                </div>
                <div className="art-bottomline">
                  <span>KNOWLEDGE → ACTION</span>
                  <ArrowUpRight size={28} />
                </div>
              </Reveal>
            </div>
            <Reveal className="learning-footnote">
              <span>01 / DISCOVER</span>
              <p>
                Practical skills. New possibilities. <strong>Real-world action.</strong>
              </p>
              <span className="footnote-symbol" aria-hidden="true">
                ✳
              </span>
            </Reveal>
          </div>
        </section>

        <FlowConnector from="01" to="02" start="KNOWLEDGE" end="POSSIBILITY" tone="dark" />

        <IgniteExperience />
        <KineticRibbon />
        <section id="about" className="about-section section-space" aria-labelledby="about-title">
          <div className="page-container">
            <SectionLabel number="02">This is IGNITE</SectionLabel>
            <div className="about-grid">
              <Reveal className="about-image">
                <img
                  src={founderStory}
                  alt="An entrepreneur overlooking the mountains and city of Almaty"
                  width={1008}
                  height={1200}
                  loading="lazy"
                />
                <div className="image-caption">
                  <span>KAZAKHSTAN & RUSSIA</span>
                  <span>
                    A GLOBAL MOVEMENT <ArrowUpRight size={15} />
                  </span>
                </div>
                <span className="photo-corner" aria-hidden="true">
                  i.
                </span>
              </Reveal>
              <Reveal className="about-copy">
                <h2 id="about-title">
                  This is
                  <br />
                  <span>IGNITE</span>
                  <i>.</i>
                </h2>
                <p className="section-body">{homeCopy.about}</p>
                <Destination
                  title="About IGNITE"
                  description={homeCopy.about}
                  className="round-action"
                >
                  Learn more
                  <span>
                    <ArrowUpRight size={21} />
                  </span>
                </Destination>
                <div className="about-principles" aria-label="Our foundation">
                  <span>People.</span>
                  <span>Purpose.</span>
                  <span>Real value.</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <FlowConnector from="02" to="03" start="PEOPLE" end="STORIES" tone="sand" />

        <section id="media" className="media-section section-space" aria-labelledby="media-title">
          <div className="page-container">
            <SectionLabel number="03">Media</SectionLabel>
            <div className="media-heading">
              <Reveal>
                <h2 id="media-title">
                  In the <em>news.</em>
                  <span className="news-spark" aria-hidden="true">
                    ✳
                  </span>
                </h2>
              </Reveal>
              <Reveal>
                <p className="section-body">{homeCopy.media}</p>
              </Reveal>
            </div>
            <Reveal className="media-feature">
              <div className="media-graphic" aria-hidden="true">
                <div className="globe-art">
                  <div className="globe-meridian meridian-one" />
                  <div className="globe-meridian meridian-two" />
                  <div className="globe-equator" />
                  <div className="globe-latitude latitude-one" />
                  <div className="globe-latitude latitude-two" />
                  <span className="globe-point" />
                  <span className="globe-orbit" />
                </div>
                <span className="globe-caption">LOCAL STORIES. GLOBAL CONVERSATIONS.</span>
              </div>
              <div className="media-feature-copy">
                <p className="section-kicker">IGNITE / Across markets worldwide</p>
                <p className="media-manifesto">
                  Our vision.
                  <br />
                  Our innovation.
                  <br />
                  Our products.
                  <br />
                  <span>Our people.</span>
                </p>
                <Destination title="Media" description={homeCopy.media} className="round-action">
                  Explore media features
                  <span>
                    <ArrowUpRight size={21} />
                  </span>
                </Destination>
              </div>
            </Reveal>
            <div className="media-bottom">
              <span>IGNITE KAZAKHSTAN & RUSSIA</span>
              <span>
                PART OF A GLOBAL CONVERSATION <Globe2 size={15} />
              </span>
            </div>
          </div>
        </section>

        <FlowConnector from="03" to="04" start="VOICES" end="FUTURE" tone="dark" />

        <section
          id="opportunity"
          className="opportunity-section section-space"
          aria-labelledby="opportunity-title"
        >
          <div className="opportunity-sun" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="page-container opportunity-content">
            <SectionLabel number="04">Business Opportunity</SectionLabel>
            <Reveal>
              <p className="opportunity-prelude">THE IGNITE OPPORTUNITY</p>
              <h2 id="opportunity-title">
                Your journey.
                <br />
                Your choice.
                <br />
                <em>Your future.</em>
              </h2>
              <div className="opportunity-bottom">
                <p className="section-body">{homeCopy.opportunity}</p>
                <Destination
                  title="Become a Brand Affiliate"
                  description={homeCopy.opportunity}
                  className="light-action"
                >
                  Start Your IGNITE Business
                  <ArrowUpRight size={22} />
                </Destination>
              </div>
            </Reveal>
          </div>
        </section>
        <FlowConnector from="04" to="05" start="IGNITE" end="CONNECT" tone="return" />
      </main>
      <Footer />
      <PageMotion />
    </div>
  );
}

function Footer() {
  const socials = [
    [Youtube, "YouTube"],
    [Instagram, "Instagram"],
    [Facebook, "Facebook"],
    [Linkedin, "LinkedIn"],
    [Music2, "TikTok"],
  ] as const;
  return (
    <footer id="support" className="site-footer">
      <div className="page-container">
        <div className="footer-contact">
          <div>
            <p className="section-kicker">IGNITE Kazakhstan</p>
            <p className="footer-inquiry">For inquiries, please contact:</p>
            <a href={`mailto:${siteDetails.email}`} className="footer-email">
              {siteDetails.email}
              <ArrowUpRight />
            </a>
            {siteDetails.address && <address>{siteDetails.address}</address>}
            {siteDetails.phone && (
              <a className="footer-phone" href={`tel:${siteDetails.phone.replace(/[^+\d]/g, "")}`}>
                {siteDetails.phone}
              </a>
            )}
          </div>
          <div className="footer-socials">
            {socials.map(([Icon, name]) => (
              <Destination title={name} key={name} className="social-icon">
                <Icon size={19} />
                <span className="sr-only">{name}</span>
              </Destination>
            ))}
          </div>
        </div>
        <nav className="footer-navigation" aria-label="Footer navigation">
          {footerGroups.map((group) => (
            <div id={group.title === "Resources" ? "resources" : undefined} key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.links.map((label) => (
                  <li key={label}>
                    {siteDetails.destinations[label] || sectionLinks[label] ? (
                      <a href={siteDetails.destinations[label] || sectionLinks[label]}>{label}</a>
                    ) : (
                      <Destination title={label}>{label}</Destination>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <a className="footer-wordmark" href="#top" aria-label="IGNITE, back to top">
          <img src="/logo-ignite.webp" alt="IGNITE — Own Your Future" />
          <span aria-hidden="true">↗</span>
        </a>
        <div id="policies" className="footer-legal">
          <nav aria-label="Policies">
            {policies.map((policy) => (
              <Destination key={policy} title={policy}>
                {policy}
              </Destination>
            ))}
          </nav>
          <p>{homeCopy.copyright}</p>
          <div className="footer-signoff">
            <span>KAZAKHSTAN & RUSSIA</span>
            <a href="#top">
              BACK TO TOP <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
