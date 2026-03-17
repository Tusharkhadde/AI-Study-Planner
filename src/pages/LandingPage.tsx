import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/layout/Footer';
import { AnimatedShaderHero } from '@/components/ui/animated-shader-hero';
import { BackgroundPaths } from '@/components/ui/background-paths';
import { ROUTES } from '@/config/routes';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#030014] text-white"
    >
      <Navbar />
      <main className="relative">
        <AnimatedShaderHero
          className="min-h-screen"
          trustBadge={{
            text: "Trusted by forward-thinking students.",
            icons: ["🚀", "⭐", "✨"]
          }}
          headline={{
            line1: "Launch Your",
            line2: "Study Routine Into Orbit"
          }}
          subtitle="Supercharge productivity with AI-powered study schedules and integrations built for the next generation of students — fast, seamless, and limitless."
          buttons={{
            primary: {
              text: "Get Started for Free",
              onClick: () => navigate(ROUTES.register)
            },
            secondary: {
              text: "Explore Features",
              onClick: () => {
                const element = document.getElementById('features');
                element?.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }}
        />

        <div id="features" className="relative bg-[#030014]">
          <BackgroundPaths className="absolute inset-0 opacity-30 pointer-events-none" />
          <div className="relative z-10 pt-20">
            <FeaturesSection />
            <HowItWorksSection />
            <CTASection />
            <Footer />
          </div>
        </div>
      </main>
    </motion.div>
  );
};
