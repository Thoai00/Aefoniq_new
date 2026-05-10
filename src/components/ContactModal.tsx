// app/components/ContactModal.tsx
'use client';

import { motion } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  // We use AnimatePresence in the parent component
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#28bdb7] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#28bdb7] to-[#1f9c96] bg-clip-text text-transparent">
          Contact Us
        </h2>

        <div className="space-y-6">
          {/* Email Option */}
          <a
            href="https://mail.google.com/mail/?view=cm&to=contact@aefoniq.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
          >
            <div className="bg-[#1f9c96] p-3 rounded-lg mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Email Us</h3>
              <p className="text-gray-600 text-sm">contact@aefoniq.com</p>
            </div>
          </a>

          {/* Phone Option */}
          <a
            href="tel:(+88)01304625135"
            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
          >
            <div className="bg-[#1f9c96] p-3 rounded-lg mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Call Us</h3>
              <p className="text-gray-600 text-sm">(+88) 01304625135</p>
            </div>
          </a>

          {/* Gmail Compose Button */}
          <a
            href="https://mail.google.com/mail/?view=cm&to=contact@aefoniq.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-br from-[#28bdb7] to-[#1f9c96] text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M20 18h-2V9.25L12 13L6 9.25V18H4V6h1.2l6.8 4.25L18.8 6H20m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
            </svg>
            <span>Open in Gmail</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactModal;