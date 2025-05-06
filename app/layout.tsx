import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import ScrollEffects from './components/ScrollEffects';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TeadTalk",
  description: "AI Talk Show Host",
  icons: {
    icon: '/logo_design.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}
      >
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <header
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              padding: '2rem 0 0 3rem',
              background: 'transparent',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div className="brand-header">
              <Image
                src="/logo_design.png"
                alt="Logo Design"
                width={70}
                height={70}
                style={{ position: 'relative', top: '-4px' }}
              />
              <span className="brand-text">TeadTalk</span>
            </div>
          </header>

          <main
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              position: 'relative',
              zIndex: 1,
              marginLeft: '3rem',
              marginTop: '0.2rem',
              paddingBottom: '200px',
            }}
          >
            {children}
          </main>

          {/*
            Move the decorative image so it sits ~130px above the bottom (the footer).
            Adjust bottom: "130px" as you see fit to position it "just above the footer. okay"
          */}
          <Image
            src="/bgimage2.png"
            alt="Decorative Retro"
            className="bg-animate"
            width={750}
            height={500}
            style={{
              position: 'absolute',
              right: '10',
              bottom: '-100px',
              width: '750px',
              height: 'auto',
              zIndex: 0,
              pointerEvents: 'none',
              transition: 'transform 0.3s ease-out',
              transformOrigin: 'bottom right',
            }}
          />

          <footer
            style={{
              width: '100%',
              background: '#111',
              color: '#fff',
              padding: '2rem 0 1rem 0',
              textAlign: 'center',
              marginTop: '2rem',
            }}
          >
            <nav className="footer-nav">
              <a href="#" style={{ color: '#fff', opacity: 0.95 }}>Terms</a>
              <a href="#" style={{ color: '#fff', opacity: 0.95 }}>Policy</a>
            </nav>
            <div
              style={{
                fontSize: '1rem',
                opacity: 0.8,
                marginTop: '0.5rem',
              }}
            >
              &copy; TeadTalk
            </div>
          </footer>
        </div>
        <ScrollEffects />
      </body>
    </html>
  );
}
