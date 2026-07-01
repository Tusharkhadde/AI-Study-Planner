import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/layout/Footer';
import { LampEffect } from '@/components/ui/lamp-effect';
import { Sparkles } from '@/components/ui/sparkles';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import { ROUTES } from '@/config/routes';
import { BackgroundPaths } from '@/components/ui/background-paths';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#030014] text-white overflow-x-hidden"
    >
      <Navbar />
      <main className="relative">
        {/* Premium Hero Section */}
        <LampEffect className="pt-20 pb-0">
          <Sparkles className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center z-50"
            >
              <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                AI-Powered Study Planning is Here
              </div>
              
              <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
                <TypewriterEffect 
                  words="Master Your Curriculum" 
                  className="text-white"
                />
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
                  With AI Precision
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 text-balance leading-relaxed">
                Experience the future of learning. Our AI doesn't just schedule; it understands your goals, adapts to your pace, and builds the ultimate cognitive roadmap.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(ROUTES.register)}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 transition-all"
                >
                  Get Started for Free
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const element = document.getElementById('features');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold backdrop-blur-sm transition-all"
                >
                  Explore Features
                </motion.button>
              </div>
            </motion.div>
          </Sparkles>
        </LampEffect>

        {/* Dashboard Mockup Display */}
        <section className="relative -mt-20 px-4 sm:px-6 lg:px-8 pb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-6xl mx-auto relative group"
          >
            {/* Glowing Backdrop */}
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative rounded-[2.5rem] border border-white/10 bg-gray-900/50 backdrop-blur-3xl overflow-hidden shadow-2xl">
              <img 
                src="/mockup.png" 
                alt="AI Study Planner Dashboard Mockup" 
                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              {/* Overlay Accents */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-900/50 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Floating Elements for extra "Wow" */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -right-12 hidden lg:flex flex-col gap-4 p-6 rounded-2xl bg-violet-500/10 border border-violet-500/20 backdrop-blur-md shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center">
                  <span className="text-white text-lg font-bold">98%</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Efficiency Score</p>
                  <p className="text-sm text-white font-bold">Optimized by AI</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <div id="features" className="relative bg-[#030014]">
          <BackgroundPaths className="absolute inset-0 opacity-20 pointer-events-none" />
          <div className="relative z-10">
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

