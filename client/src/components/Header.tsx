import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { cn, scrollToElement } from '@/lib/utils';
import { fadeIn, glassRevealAnimation } from '@/lib/motion';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [, navigate] = useLocation(); // Use navigate from wouter

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
  const handleNavClick = (id: string) => {
    if (id === 'home') {
      navigate('/'); // Update the URL to "/"
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top
    } else {
      scrollToElement(id); // Scroll to the specific section
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.header 
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled ? "py-2 bg-black bg-opacity-80 backdrop-blur-md shadow-md" : "py-4"
      )}
      initial="hidden"
      animate="show"
      variants={glassRevealAnimation}
    >
      <nav className="container mx-auto px-4 sm:px-6 w-full max-w-full flex justify-between items-center">
        <Link href="/" onClick={() => handleNavClick('home')}>
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-secondary to-highlight flex items-center justify-center">
              <span className="font-space font-bold text-xl text-primary">TS</span>
            </div>
            <motion.span 
              className="font-space font-bold text-xl"
              variants={fadeIn("right", 0.2)}
            >
              TaskSathi
            </motion.span>
          </div>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <motion.div variants={fadeIn("down", 0.1)}>
            <button 
              onClick={() => handleNavClick('services')} 
              className="font-inter text-sm hover:text-secondary transition-colors py-2 px-3 rounded-md hover:bg-white hover:bg-opacity-10"
            >
              {t('header.services')}
            </button>
          </motion.div>
          <motion.div variants={fadeIn("down", 0.2)}>
            <button 
              onClick={() => handleNavClick('about')} 
              className="font-inter text-sm hover:text-secondary transition-colors py-2 px-3 rounded-md hover:bg-white hover:bg-opacity-10"
            >
              {t('header.about')}
            </button>
          </motion.div>
          <motion.div variants={fadeIn("down", 0.3)}>
            <button 
              onClick={() => handleNavClick('process')} 
              className="font-inter text-sm hover:text-secondary transition-colors py-2 px-3 rounded-md hover:bg-white hover:bg-opacity-10"
            >
              {t('header.process')}
            </button>
          </motion.div>
          <motion.div variants={fadeIn("down", 0.4)}>
            <button 
              onClick={() => handleNavClick('contact')} 
              className="font-inter text-sm hover:text-secondary transition-colors py-2 px-3 rounded-md hover:bg-white hover:bg-opacity-10"
            >
              {t('header.contact')}
            </button>
          </motion.div>
          
          <motion.div 
            variants={fadeIn("left", 0.5)}
            className="relative"
          >
            <LanguageSelector />
          </motion.div>
        </div>
        
        {/* Mobile Menu Button */}
        <motion.button 
          variants={fadeIn("left", 0.2)}
          className="md:hidden text-white focus:outline-none" 
          aria-label="Toggle menu"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </nav>
      
      {/* Mobile Menu Overlay */}
      <motion.div 
        className={cn(
          "md:hidden fixed top-16 left-0 right-0 py-4 px-4 z-50 shadow-lg",
          mobileMenuOpen ? "block" : "hidden"
        )}
        style={{
          background: "rgba(10, 10, 10, 0.9)",
          backdropFilter: "blur(15px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: mobileMenuOpen ? 1 : 0,
          y: mobileMenuOpen ? 0 : -20
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col space-y-4 container mx-auto px-4 sm:px-6 w-full max-w-full">
          <button 
            onClick={() => handleNavClick('services')} 
            className="font-inter text-base hover:text-secondary py-3 transition-colors text-left border-b border-gray-800"
          >
            {t('header.services')}
          </button>
          <button 
            onClick={() => handleNavClick('about')} 
            className="font-inter text-base hover:text-secondary py-3 transition-colors text-left border-b border-gray-800"
          >
            {t('header.about')}
          </button>
          <button 
            onClick={() => handleNavClick('process')} 
            className="font-inter text-base hover:text-secondary py-3 transition-colors text-left border-b border-gray-800"
          >
            {t('header.process')}
          </button>
          <button 
            onClick={() => handleNavClick('contact')} 
            className="font-inter text-base hover:text-secondary py-3 transition-colors text-left border-b border-gray-800"
          >
            {t('header.contact')}
          </button>
          
          {/* Mobile Settings */}
          <div className="flex justify-start items-center pt-4">
            {/* Mobile Language Selector */}
            <div className="py-2">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
