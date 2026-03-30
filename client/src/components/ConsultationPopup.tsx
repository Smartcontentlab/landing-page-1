import { motion, AnimatePresence } from 'framer-motion';
import { X, ThumbsUp, Phone } from 'lucide-react';

interface ConsultationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onYes: () => void;
  onScheduleZoom: () => void;
}

export function ConsultationPopup({ isOpen, onClose, onYes, onScheduleZoom }: ConsultationPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>

            {/* Content */}
            <div className="text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', damping: 20 }}
                className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <span className="text-3xl">💬</span>
              </motion.div>

              {/* Heading */}
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Did you have a productive consultation?
              </h2>
              <p className="text-slate-600 mb-8">
                Your feedback helps us improve our service and understand your needs better.
              </p>

              {/* Buttons */}
              <div className="space-y-3">
                {/* Yes Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onYes}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <ThumbsUp className="w-5 h-5" />
                  Yes! Show me packages
                </motion.button>

                {/* Schedule Zoom Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onScheduleZoom}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Talk to a human (30 min)
                </motion.button>

                {/* Not Now Button */}
                <button
                  onClick={onClose}
                  className="w-full text-slate-600 py-3 rounded-lg font-semibold hover:bg-slate-100 transition"
                >
                  Maybe later
                </button>
              </div>

              {/* Footer Text */}
              <p className="text-xs text-slate-500 mt-6">
                Our founder will personally discuss your automation needs and create a custom solution tailored to your business.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
