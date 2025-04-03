import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LucideIcon } from 'lucide-react';
import { fadeIn, serviceCardAnimation } from '@/lib/motion';
import { scrollToElement } from '@/lib/utils';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export default function ServiceCard({ icon: Icon, title, description, index }: ServiceCardProps) {
  const { t } = useTranslation();
  const delay = 0.1 + (index * 0.1);
  
  return (
    <motion.div 
      className="rounded-xl p-4 sm:p-6 h-full cursor-pointer transition-all service-card"
      variants={fadeIn("up", delay)}
      initial="hidden"
      whileInView="show"
      whileHover="hover"
      viewport={{ once: true, amount: 0.25 }}
      onClick={() => scrollToElement('contact')}
      style={{
        background: "rgba(30, 30, 35, 0.7)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
      }}
    >
      <div className="icon-container h-12 w-12 sm:h-14 sm:w-14 rounded-lg bg-background dark:bg-opacity-50 bg-opacity-70 flex items-center justify-center mb-3 sm:mb-4 transition-all">
        <Icon className="text-secondary" size={20} />
      </div>
      <h3 className="font-space font-semibold text-lg sm:text-xl mb-2 sm:mb-3 text-white">{title}</h3>
      <p className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4">
        {description}
      </p>
      <a className="inline-block text-secondary text-sm sm:text-base hover:underline">
        {t('services.learnMore')} →
      </a>
    </motion.div>
  );
}
