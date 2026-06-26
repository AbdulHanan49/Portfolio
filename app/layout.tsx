import type { Metadata } from "next";
import { Space_Grotesk, Fira_Code, Sora, Playfair_Display } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const firaCode = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Abdul Hanan | Full-Stack Software Engineer",
  description:
    "Full-Stack Software Engineer specializing in React 18, FastAPI, TypeScript, and Azure. Building production SaaS from database to deployment.",
  keywords: [
    "Full Stack Developer",
    "React 18",
    "FastAPI",
    "TypeScript",
    "Node.js",
    "Vue 3",
    "Python",
    "Azure",
    "Abdul Hanan",
    "Portfolio",
    "Software Engineer",
    "Lahore",
  ],
  metadataBase: new URL("https://abdulhanan.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abdulhanan.com",
    title: "Abdul Hanan | Full-Stack Software Engineer",
    description:
      "Building production SaaS with React 18, FastAPI, TypeScript, and Azure.",
    siteName: "Abdul Hanan Portfolio",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Abdul Hanan — Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Hanan | Full-Stack Software Engineer",
    description:
      "Building production SaaS with React 18, FastAPI, TypeScript, and Azure.",
    images: ["/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abdul Hanan",
  jobTitle: "Full-Stack Software Engineer",
  email: "hananaslam90@gmail.com",
  sameAs: [
    "https://github.com/AbdulHanan49",
    "https://linkedin.com/in/hanan-aslam-dev",
  ],
  knowsAbout: [
    "React 18", "TypeScript", "FastAPI", "Python", "Node.js",
    "PostgreSQL", "Docker", "Azure", "Vue 3", "GitHub Actions",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "National University of Computer and Emerging Sciences (FAST-NU)",
    address: "Lahore, Pakistan",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${spaceGrotesk.variable} ${firaCode.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#0E0808" />
        {/* Inline theme bootstrap — runs before React hydrates, prevents flash */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`
        }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
