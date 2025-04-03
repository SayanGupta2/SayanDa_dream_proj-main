import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supportedLanguages } from '@/lib/i18n';

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = supportedLanguages.find(lang => lang.code === i18n.language) || supportedLanguages[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button */}
      <button
        type="button"
        className={cn(
          "flex items-center text-sm px-3 py-2 rounded-md transition-all duration-200",
          isOpen
            ? "bg-blue-500 text-white font-medium"
            : "bg-gray-800 text-gray-200 hover:bg-gray-700"
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : "false"} // Ensure valid ARIA value
      >
        <Globe size={16} className="mr-1" />
        <span>{currentLanguage.code.toUpperCase()}</span>
        <ChevronDown
          size={14}
          className={cn(
            "transition-transform duration-200 ml-1",
            isOpen ? "transform rotate-180" : ""
          )}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-1 left-0 w-full rounded-md shadow-lg z-50 bg-gray-900 border border-gray-700"
          >
            <div className="py-1 rounded-md overflow-hidden" role="menu" aria-orientation="vertical">
              {supportedLanguages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={cn(
                    "flex items-center justify-between px-4 py-2 text-sm w-full text-left transition-colors duration-200",
                    language.code === i18n.language
                      ? "bg-blue-500 bg-opacity-20 text-white font-medium"
                      : "text-gray-200 hover:bg-gray-800",
                    "active:bg-blue-600 active:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50"
                  )}
                  role="menuitem"
                >
                  <span className="flex items-center">
                    <span>{language.nativeName}</span>
                  </span>
                  {language.code === i18n.language && (
                    <Check size={16} className="text-blue-400" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}