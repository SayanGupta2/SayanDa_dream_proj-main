import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={onClose}
          />

          {/* Modal Content */}
            <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, type: 'spring', bounce: 0.4 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw - env(safe-area-inset-left) - env(safe-area-inset-right) - 1rem)] max-w-sm sm:max-w-md mx-auto z-50 rounded-xl p-4 sm:p-8"
            style={{
              background: 'rgba(17, 17, 17, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              paddingLeft: 'calc(1rem + env(safe-area-inset-left))',
              paddingRight: 'calc(1rem + env(safe-area-inset-right))',
            }}
            >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Modal Content */}
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-500 text-2xl" size={32} />
              </div>
              <h3 className="font-space font-semibold text-lg sm:text-xl mb-2">
                {t('modal.success')}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base mb-6">
                {t('modal.successDesc')}
              </p>
              <Button
                onClick={onClose}
                className="px-6 py-3 rounded-lg bg-secondary text-primary font-medium transition-all hover:bg-opacity-90"
              >
                {t('modal.close')}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}