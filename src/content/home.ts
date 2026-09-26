// Approved homepage copy: IGNITE WEBSITE DESIGN GUIDE - HOME PAGE.docx.
export const homeCopy = {
  hero: "Step into a modern social enterprise built for real progress—fueling your mind, body, and daily lifestyle with purposeful products, ethical business solutions, and an unstoppable global movement.",
  product:
    "Discover brAInify — an AI-powered learning experience designed to help you build practical skills, unlock new possibilities, and stay ahead in a rapidly changing world. Explore learning paths built to turn AI knowledge into real-world action.",
  about:
    "A global social enterprise built around people, purpose, and products that create real value. Discover our story, our promise, and the people shaping what comes next.",
  media:
    "From local stories to global conversations, see how IGNITE is making its mark across markets worldwide. Explore the latest media features covering our vision, innovation, products, and people.",
  opportunity:
    "Whether you’re exploring our products or ready to build a business, IGNITE connects you with a global community, powerful tools, and the freedom to create your own path and unlock your limitless potential.",
  copyright:
    "Copyright © 2026 IGNITE Kazakhstan. No reproduction in whole or in part without written permission. All Rights Reserved. All trademarks and product images exhibited on this site, unless otherwise indicated, are the property of IGNITE Kazakhstan",
};

// Add only client-confirmed destinations/contact details. Missing URLs open an inquiry dialog.
export const siteDetails: {
  email: string;
  address: string | null;
  phone: string | null;
  destinations: Record<string, string | undefined>;
} = {
  email: "spark@joinignite.com",
  address: null,
  phone: null,
  destinations: {},
};

export const footerGroups = [
  { title: "Products", links: ["brAInify"] },
  {
    title: "About",
    links: ["About IGNITE", "IGNITE Leadership", "IGNITE Global Advisory Board", "Media", "FAQs"],
  },
  {
    title: "Business Opportunity",
    links: ["The IGNITE Opportunity", "Become a Brand Affiliate", "Build Your Business"],
  },
  { title: "Resources", links: ["Blog", "Training and Events", "Policies"] },
  { title: "Support", links: ["Contact Us", "Help Centre"] },
];
export const policies = [
  "AI Content Disclaimer",
  "Shipping Policy",
  "Return, Refund, and Exchange Policy",
  "Terms and Conditions",
  "Privacy Policy",
  "Social Media Policy",
];
