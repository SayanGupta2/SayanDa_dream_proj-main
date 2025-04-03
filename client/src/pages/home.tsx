import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { fadeIn, slideIn, textVariant, staggerContainer } from '@/lib/motion';
import { createWhatsAppUrl, scrollToElement } from '@/lib/utils';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import ContactForm from '@/components/ContactForm';
import { Button } from '@/components/ui/button';
import { services } from '@/data/services';
import { lazy, Suspense } from 'react';

const TeamCarousel = lazy(() => import('@/components/TeamCarousel')); // Lazy load the TeamCarousel component

export default function Home() {
  const { t } = useTranslation();
  const whatsappNumber = "918637836125";
  const [showAllServices, setShowAllServices] = useState(false);
  const showMoreButtonRef = useRef<HTMLDivElement>(null); // Reference for the "Show More" button
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = t('meta.title');
  }, [t]);

  // Filter services to include only the specified ones
  const filteredServices = services.filter((service) =>
    [
      "schoolProjects",
      "webdev",
      "freelance",
      "security",
      "report",
      "content",
      "seo",
      "thesis",
      "dissertation",
      "presentations",
      "excel",
      "copywriting",
      "dataEntry",
      "aiMlModel", // Include AI & ML Model service
      "others",    // Include Other Services
    ].includes(service.translationKey)
  );

  const handleToggleServices = () => {
    setShowAllServices((prev) => !prev);

    if (showAllServices) {
      // Scroll to the end of the visible cards when collapsing
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        setTimeout(() => {
          servicesSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 100);
      }
    }
  };

  const handleServiceClick = (serviceKey: string) => {
    setSelectedService(serviceKey); // Set the selected service
    contactFormRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to the contact form section
  };

  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gray-900 dark:opacity-90 opacity-70"></div>
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Technology background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Decorative elements - more subtle now */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary opacity-5 dark:opacity-10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-highlight opacity-5 dark:opacity-10 rounded-full filter blur-3xl"></div>

        <div className="px-4 sm:px-6 z-10 w-full max-w-full">
          <motion.div
            className="max-w-3xl mx-auto px-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.h5
              className="font-outfit text-secondary mb-3"
              variants={fadeIn("up", 0.1)}
            >
              {t('hero.subtitle')}
            </motion.h5>
            <motion.h1
              className="font-space font-bold text-4xl md:text-6xl mb-6 leading-tight"
              variants={textVariant(0.2)}
            >
              {t('hero.title')} <span className="bg-gradient-to-r from-secondary via-highlight to-accent bg-clip-text text-transparent">{t('hero.titleHighlight')}</span>
            </motion.h1>
            <motion.p
              className="font-inter text-lg md:text-xl text-gray-300 mb-8 max-w-2xl"
              variants={fadeIn("up", 0.3)}
            >
              {t('hero.description')}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeIn("up", 0.4)}
            >
              <Button
                onClick={() => scrollToElement('services')}
                className="inline-flex items-center justify-center px-6 py-6 rounded-lg bg-secondary text-primary font-medium transition-all hover:bg-opacity-90"
                style={{
                  boxShadow: "0 0 8px rgba(0, 246, 255, 0.3)",
                  border: "1px solid rgba(0, 246, 255, 0.2)"
                }}
              >
                {t('hero.exploreServices')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={() => scrollToElement('contact')}
                variant="outline"
                className="inline-flex items-center justify-center px-6 py-6 rounded-lg bg-transparent border-white border-opacity-20 font-medium transition-all hover:bg-white hover:bg-opacity-10"
              >
                {t('hero.getInTouch')}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gray-900 dark:opacity-95 opacity-95 z-0"></div>

        <div className="px-4 sm:px-6 z-10 relative w-full max-w-full">
          <motion.div
            className="text-center mb-16 px-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.h2
              className="font-space font-bold text-3xl md:text-4xl mb-4"
              variants={textVariant(0.1)}
            >
              {t('services.title')} <span className="text-secondary">{t('services.titleHighlight')}</span>
            </motion.h2>
            <motion.p
              className="font-inter text-gray-300 max-w-xl mx-auto"
              variants={fadeIn("up", 0.2)}
            >
              {t('services.description')}
            </motion.p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {(showAllServices ? filteredServices : filteredServices.slice(0, 6)).map(
              (service, index) => (
                <div
                  key={index}
                  onClick={() => handleServiceClick(service.translationKey)}
                  className="cursor-pointer transform transition-transform hover:scale-105"
                >
                  <ServiceCard
                    icon={service.icon}
                    title={t(`services.cards.${service.translationKey}.title`)}
                    description={t(`services.cards.${service.translationKey}.description`)}
                    index={index}
                  />
                </div>
              )
            )}
          </motion.div>

          {/* View More / View Less Button */}
          <motion.div
            ref={showMoreButtonRef}
            className="text-center mt-12"
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Button
              onClick={handleToggleServices}
              variant="outline"
              className="px-6 py-3 rounded-lg bg-transparent border border-white border-opacity-20 font-medium transition-all hover:bg-white hover:bg-opacity-10"
            >
              {showAllServices ? t('view Less') : t('services.viewAll')}
              {showAllServices ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
      </section>
      <div className="px-4 sm:px-6 w-full max-w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Column */}
          <motion.div
            className="lg:w-1/2 relative"
            variants={fadeIn("right", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <div className="relative z-10 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Our tech team at work"
                className="w-full h-auto rounded-2xl"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute top-8 -left-4 w-24 h-24 bg-accent opacity-20 rounded-full filter blur-xl"></div>
            <div className="absolute -bottom-4 right-8 w-32 h-32 bg-secondary opacity-20 rounded-full filter blur-xl"></div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            className="lg:w-1/2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.h5
              className="font-outfit text-secondary mb-3"
              variants={fadeIn("left", 0.1)}
            >
              {t('about.subtitle')}
            </motion.h5>
            <motion.h2
              className="font-space font-bold text-3xl md:text-4xl mb-6"
              variants={fadeIn("left", 0.2)}
            >
              {t('about.title')} <span className="text-highlight">{t('about.titleHighlight')}</span>
            </motion.h2>
            <motion.p
              className="font-inter text-gray-300 mb-6"
              variants={fadeIn("left", 0.3)}
            >
              {t('about.description1')}
            </motion.p>
            <motion.p
              className="font-inter text-gray-300 mb-8"
              variants={fadeIn("left", 0.4)}
            >
              {t('about.description2')}
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeIn("up", 0.1)}>
                <p className="font-space font-bold text-3xl text-secondary">350+</p>
                <p className="text-sm text-gray-400">{t('about.stats.projects')}</p>
              </motion.div>
              <motion.div variants={fadeIn("up", 0.2)}>
                <p className="font-space font-bold text-3xl text-secondary">98%</p>
                <p className="text-sm text-gray-400">{t('about.stats.satisfaction')}</p>
              </motion.div>
              <motion.div variants={fadeIn("up", 0.3)}>
                <p className="font-space font-bold text-3xl text-secondary">24/7</p>
                <p className="text-sm text-gray-400">{t('about.stats.support')}</p>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeIn("up", 0.5)}>
              <Button
                onClick={() => scrollToElement('contact')}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-secondary text-primary font-medium transition-all hover:bg-opacity-90"
                style={{
                  boxShadow: "0 0 8px rgba(0, 246, 255, 0.3)",
                  border: "1px solid rgba(0, 246, 255, 0.2)"
                }}
              >
                {t('about.contactUs')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Process Section */}
      <section id="process" className="py-20 relative">
        {/* Background */}
        <div className="absolute inset-0 bg-gray-900 opacity-95 z-0"></div>
        <div className="px-4 sm:px-6 w-full max-w-full relative z-10">
          <motion.div
            className="text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.h2
              className="font-space font-bold text-3xl md:text-4xl mb-4 text-white"
              variants={textVariant(0.1)}
            >
              {t('process.title')} <span className="text-secondary">{t('process.titleHighlight')}</span>
            </motion.h2>
            <motion.p
              className="font-inter text-gray-200 max-w-xl mx-auto"
              variants={fadeIn("up", 0.7)}
            >
              {t('process.description')}
            </motion.p>
          </motion.div>

          {/* Process Steps */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Step 1 */}
            <motion.div
              className="rounded-xl p-4 sm:p-6 relative"
              variants={fadeIn("up", 0.1)}
              style={{
                background: "rgba(30, 30, 35, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.15)"
              }}
            >
              <div className="absolute -top-4 -left-4 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-secondary text-primary flex items-center justify-center font-space font-bold text-base sm:text-xl">
                01
              </div>
              <h3 className="font-space font-semibold text-lg sm:text-xl mt-4 sm:mt-6 mb-2 sm:mb-3 text-white">
                {t('process.steps.discovery.title')}
              </h3>
              <p className="text-gray-200">
                {t('process.steps.discovery.description')}
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="rounded-xl p-4 sm:p-6 relative"
              variants={fadeIn("up", 0.2)}
              style={{
                background: "rgba(30, 30, 35, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.15)"
              }}
            >
              <div className="absolute -top-4 -left-4 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-secondary text-primary flex items-center justify-center font-space font-bold text-base sm:text-xl">
                02
              </div>
              <h3 className="font-space font-semibold text-lg sm:text-xl mt-4 sm:mt-6 mb-2 sm:mb-3 text-white">
                {t('process.steps.strategy.title')}
              </h3>
              <p className="text-gray-200">
                {t('process.steps.strategy.description')}
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="rounded-xl p-4 sm:p-6 relative"
              variants={fadeIn("up", 0.3)}
              style={{
                background: "rgba(30, 30, 35, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.15)"
              }}
            >
              <div className="absolute -top-4 -left-4 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-secondary text-primary flex items-center justify-center font-space font-bold text-base sm:text-xl">
                03
              </div>
              <h3 className="font-space font-semibold text-lg sm:text-xl mt-4 sm:mt-6 mb-2 sm:mb-3 text-white">
                {t('process.steps.implementation.title')}
              </h3>
              <p className="text-gray-200">
                {t('process.steps.implementation.description')}
              </p>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              className="rounded-xl p-4 sm:p-6 relative"
              variants={fadeIn("up", 0.4)}
              style={{
                background: "rgba(30, 30, 35, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.15)"
              }}
            >
              <div className="absolute -top-4 -left-4 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-secondary text-primary flex items-center justify-center font-space font-bold text-base sm:text-xl">
                04
              </div>
              <h3 className="font-space font-semibold text-lg sm:text-xl mt-4 sm:mt-6 mb-2 sm:mb-3 text-white">
                {t('process.steps.delivery.title')}
              </h3>
              <p className="text-gray-200">
                {t('process.steps.delivery.description')}
              </p>
            </motion.div>
          </motion.div>

          {/* Process Note */}
          <motion.div
            className="mt-16 text-center"
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="rounded-xl p-4 sm:p-6 max-w-3xl mx-auto custom-process-note">
              <h4 className="font-space font-semibold text-lg sm:text-xl mb-2 sm:mb-3 text-white">
                {t('process.guarantee.title')}
              </h4>
              <p
                className="text-gray-200 text-sm sm:text-base"
                dangerouslySetInnerHTML={{ __html: t('process.guarantee.description') }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section id="team" className="py-20 relative">
        <div className="px-4 sm:px-6 w-full max-w-full">
          <motion.div
            className="text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.h2
              className="font-space font-bold text-3xl md:text-4xl mb-4 text-white"
              variants={textVariant(0.1)}
            >
              Our Team
            </motion.h2>
            <motion.p
              className="font-inter text-gray-300 max-w-xl mx-auto"
              variants={fadeIn("up", 0.2)}
            >
              Meet our talented team of professionals dedicated to delivering exceptional solutions.
            </motion.p>
          </motion.div>

          {/* TeamCarousel component displays a carousel showcasing team members with their details. */}
          <div className="team-carousel-wrapper">
            {/* Add this style tag to ensure react-slick CSS is available */}
            <style>{`
        /* Core styling for Slick carousel */
        .slick-slider {
          position: relative;
          display: block;
          box-sizing: border-box;
          user-select: none;
          touch-action: pan-y;
        }
        .slick-list {
          position: relative;
          display: block;
          overflow: hidden;
          margin: 0;
          padding: 0;
        }
        .slick-track {
          position: relative;
          top: 0;
          left: 0;
          display: flex;
          margin-left: auto;
          margin-right: auto;
        }
        .slick-slide {
          display: none;
          float: left;
          height: 100%;
          min-height: 1px;
        }
        .slick-slide > div {
          height: 100%;
        }
        .slick-initialized .slick-slide {
          display: block;
        }
        .slick-dots {
          position: absolute;
          bottom: -40px;
          list-style: none;
          display: block;
          text-align: center;
          padding: 0;
          margin: 0;
          width: 100%;
        }
        .slick-dots li {
          position: relative;
          display: inline-block;
          margin: 0 5px;
          padding: 0;
          cursor: pointer;
        }
        .slick-dots li button {
          border: 0;
          background: transparent;
          display: block;
          height: 20px;
          width: 20px;
          outline: none;
          line-height: 0;
          font-size: 0;
          color: transparent;
          padding: 5px;
          cursor: pointer;
        }
        .slick-dots li button:before {
          position: absolute;
          top: 0;
          left: 0;
          content: '•';
          width: 20px;
          height: 20px;
          font-size: 14px;
          line-height: 20px;
          text-align: center;
          color: white;
          opacity: 0.25;
        }
        .slick-dots li.slick-active button:before {
          opacity: 0.75;
        }
      `}</style>

            <Suspense fallback={<div className="text-center py-10 text-white">Loading team members...</div>}>
              <TeamCarousel />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactFormRef} className="py-20 relative">
        {/* Background */}
        <div className="absolute inset-0 bg-gray-900 dark:opacity-95 opacity-95 z-0"></div>

        <div className="px-4 sm:px-6 w-full max-w-full z-10 relative">
          <motion.div
            className="text-center mb-12 px-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.h2
              className="font-space font-bold text-3xl md:text-4xl mb-4"
              variants={textVariant(0.1)}
            >
              {t('contact.title')} <span className="text-secondary">{t('contact.titleHighlight')}</span>
            </motion.h2>
            <motion.p
              className="font-inter text-gray-300 max-w-xl mx-auto"
              variants={fadeIn("up", 0.2)}
            >
              {t('contact.description')}
            </motion.p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Contact Form */}
            <div className="lg:w-2/3">
              <ContactForm selectedService={selectedService} />
            </div>

            {/* Contact Information */}
            <motion.div
              className="lg:w-1/3"
              variants={fadeIn("left", 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              <div className="rounded-xl p-5 sm:p-8 h-full custom-contact-card">
                <h3 className="font-space font-semibold text-lg sm:text-xl mb-4 sm:mb-6">{t('contact.info.title')}</h3>

                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-secondary bg-opacity-20 flex items-center justify-center mr-3 sm:mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="sm:w-5 sm:h-5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-400">{t('contact.info.email')}</p>
                      <a href="mailto:sayanmaity8002@gmail.com" className="text-sm sm:text-base hover:text-secondary transition-colors">sayanmaity8002@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-secondary bg-opacity-20 flex items-center justify-center mr-3 sm:mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="sm:w-5 sm:h-5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-400">{t('contact.info.whatsapp')}</p>
                      <a href={createWhatsAppUrl(whatsappNumber)} className="text-sm sm:text-base hover:text-secondary transition-colors">+91 8637836125</a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-secondary bg-opacity-20 flex items-center justify-center mr-3 sm:mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="sm:w-5 sm:h-5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-400">{t('contact.info.response')}</p>
                      <p className="text-sm sm:text-base">{t('contact.info.responseTime')}</p>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp Button */}
                <a
                  href={createWhatsAppUrl(whatsappNumber, t('contact.whatsappMessage'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 sm:px-6 py-2 sm:py-3 mt-6 sm:mt-8 rounded-lg bg-green-600 text-white text-sm sm:text-base font-medium transition-all hover:bg-green-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2 sm:w-5 sm:h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t('contact.chatWhatsApp')}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
