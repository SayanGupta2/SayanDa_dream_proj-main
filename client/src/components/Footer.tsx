import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import LanguageSelector from './LanguageSelector';
import { Send, ChevronUp } from 'lucide-react';
import { scrollToElement } from '@/lib/utils';
import { fadeIn, staggerContainer } from '@/lib/motion';
import { FaTwitter, FaLinkedinIn, FaInstagram, FaGithub } from 'react-icons/fa';

export default function Footer() {
  const { t } = useTranslation();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="py-12 relative bg-gray-950 dark:bg-gray-950 bg-opacity-95 dark:bg-opacity-95">
      <div className="container mx-auto px-4 sm:px-6 w-full max-w-full">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {/* Company Info */}
          <motion.div variants={fadeIn("right", 0.1)}>
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-secondary to-highlight flex items-center justify-center">
                <span className="font-space font-bold text-xl text-primary">TS</span>
              </div>
              <span className="font-space font-bold text-xl">TaskSathi</span>
            </div>
            <p className="text-gray-400 mb-4">
              {t('footer.tagline')}
            </p>
            {/* Language Selector */}
            <div className="relative left-0">
              <LanguageSelector />
            </div>
          </motion.div>
          
          {/* Services */}
          <motion.div variants={fadeIn("up", 0.2)}>
            <h4 className="font-space font-semibold text-lg mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToElement('services')} className="text-gray-400 hover:text-secondary transition-colors">{t('services.webdev')}</button></li>
              <li><button onClick={() => scrollToElement('services')} className="text-gray-400 hover:text-secondary transition-colors">{t('services.security')}</button></li>
              <li><button onClick={() => scrollToElement('services')} className="text-gray-400 hover:text-secondary transition-colors">{t('services.content')}</button></li>
              <li><button onClick={() => scrollToElement('services')} className="text-gray-400 hover:text-secondary transition-colors">{t('services.seo')}</button></li>
              <li><button onClick={() => scrollToElement('services')} className="text-gray-400 hover:text-secondary transition-colors">{t('services.thesis')}</button></li>
            </ul>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={fadeIn("up", 0.3)}>
            <h4 className="font-space font-semibold text-lg mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToElement('about')} className="text-gray-400 hover:text-secondary transition-colors">{t('footer.aboutUs')}</button></li>
              <li><button onClick={() => scrollToElement('services')} className="text-gray-400 hover:text-secondary transition-colors">{t('footer.services')}</button></li>
              <li><button onClick={() => scrollToElement('process')} className="text-gray-400 hover:text-secondary transition-colors">{t('footer.process')}</button></li>
              <li><button onClick={() => scrollToElement('contact')} className="text-gray-400 hover:text-secondary transition-colors">{t('footer.contact')}</button></li>
              <li><a href="#" className="text-gray-400 hover:text-secondary transition-colors">{t('footer.privacy')}</a></li>
            </ul>
          </motion.div>
          
          {/* Newsletter */}
          <motion.div variants={fadeIn("left", 0.4)}>
            <h4 className="font-space font-semibold text-lg mb-4">{t('footer.stayUpdated')}</h4>
            <p className="text-gray-400 mb-4">{t('footer.subscribeText')}</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder={t('footer.emailPlaceholder')}
                className="px-4 py-2 rounded-l-lg border border-gray-700 focus:border-secondary bg-background bg-opacity-50 outline-none transition-colors flex-grow"
              />
              <button 
                type="submit" 
                className="px-4 py-2 rounded-r-lg bg-secondary text-primary font-medium transition-all hover:bg-opacity-90"
                aria-label="Subscribe"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        </motion.div>
        
        {/* Bottom Footer */}
        <motion.div 
          className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} TaskSathi. {t('footer.rights')}
          </p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a 
              href="https://www.linkedin.com/in/sayan-maity-756b8b244/" 
              title="LinkedIn" 
              aria-label="Visit our LinkedIn profile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="h-10 w-10 rounded-full bg-secondary bg-opacity-10 flex items-center justify-center text-white hover:bg-opacity-20 transition-all"
            >
              <FaLinkedinIn />
            </a>
            <a 
              href="https://www.instagram.com/joy_in_knowledge/?igsh=bGdjcGtqaG91MXc4#" 
              title="Instagram" 
              aria-label="Visit our Instagram profile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="h-10 w-10 rounded-full bg-secondary bg-opacity-10 flex items-center justify-center text-white hover:bg-opacity-20 transition-all"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://github.com/Sayan-Maity-Code" 
              title="GitHub" 
              aria-label="Visit our GitHub profile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="h-10 w-10 rounded-full bg-secondary bg-opacity-10 flex items-center justify-center text-white hover:bg-opacity-20 transition-all"
            >
              <FaGithub />
            </a>
          </div>
          
          {/* Scroll to top button */}
          <button 
            onClick={scrollToTop}
            className="fixed bottom-16 right-8 h-10 w-10 rounded-full bg-secondary text-primary flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-all"
            aria-label="Scroll to top of the page"
          >
            <ChevronUp size={20} />
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
