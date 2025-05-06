"use client";
import { useEffect } from "react";

export default function ScrollEffects() {
  useEffect(() => {
    const handleScroll = () => {
      const bgImg = document.querySelector('.bg-animate') as HTMLElement;
      const footer = document.querySelector('footer') as HTMLElement;
      
      if (bgImg) {
        // Smoother scaling effect with less magnification
        const scrollProgress = Math.min(window.scrollY / 800, 1); // Scale over longer distance
        const scale = 1 + (scrollProgress * 0.15); // Max scale of 1.15
        bgImg.style.transform = `scale(${scale})`;
      }

      // If you have a condition to show/hide a different footer or animation,
      // you can handle that here. Right now it's just a normal footer.
      if (footer) {
        // Example logic if you want to do something with the footer
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}
