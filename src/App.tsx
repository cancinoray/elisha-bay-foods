import { useRef, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProductsSection } from './components/ProductsSection';
import { QualitySection } from './components/QualitySection';
import { useReveal } from './hooks/useReveal';

export default function App() {
  useReveal();
  const [topic, setTopic] = useState<{ name: string; nonce: number } | null>(null);
  const nonceRef = useRef(0);

  const handleProductInquiry = (name: string) => {
    nonceRef.current += 1;
    setTopic({ name, nonce: nonceRef.current });
  };

  return (
    <div className="relative min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-full focus:bg-burgundy focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:font-semibold focus:text-cream focus:shadow-lg focus-visible:outline-gold focus-visible:outline-offset-2"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" tabIndex={-1} className="outline-none">
        <HeroSection />
        <ProductsSection onProductInquiry={handleProductInquiry} />
        <QualitySection />
        <AboutSection />
        <ContactSection topic={topic} />
      </main>

      <Footer />
    </div>
  );
}
