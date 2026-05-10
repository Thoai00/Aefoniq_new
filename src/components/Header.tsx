'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  setShowContactForm: (show: boolean) => void;
  scrolled: boolean;
  headerVisible: boolean;
}

export function SimpleHeader() {
  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 bg-[#f0f2f4]/95 backdrop-blur-xl shadow-sm
      after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-[#28bdb7]/40 after:to-transparent after:animate-border-flow`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 xl:px-[200px] py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
              <Image
                src="/aefoniq-logo.png"
                alt="Aefoniq Logo"
                width={120}
                height={34}
                priority
                className="w-24 sm:w-32 hover:opacity-80 transition-opacity"
              />
            </motion.div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Header({
  isMenuOpen,
  setIsMenuOpen,
  setShowContactForm,
  scrolled,
  headerVisible,
}: HeaderProps) {
  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 transition-transform duration-500 
      ${headerVisible ? 'translate-y-0' : '-translate-y-full'}
      ${scrolled ? 'bg-[#f0f2f4]/95 backdrop-blur-xl shadow-sm' : 'bg-transparent'}
      after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-[#28bdb7]/40 after:to-transparent after:animate-border-flow`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 xl:px-[200px] py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
              <Image
                src="/aefoniq-logo.png"
                alt="Aefoniq Logo"
                width={120}
                height={34}
                priority
                className="w-24 sm:w-32 hover:opacity-80 transition-opacity"
              />
            </motion.div>
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 text-gray-600 hover:text-[#28bdb7] transition-colors"
            type="button"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <nav className="hidden sm:flex gap-6 lg:gap-8 items-center text-sm font-medium">
            <Link
              href="/aboutus"
              className="relative group text-gray-600 hover:text-[#28bdb7] transition-colors"
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#28bdb7] transition-all group-hover:w-full" />
            </Link>
            <Link
              href="/ourwork"
              className="relative group text-gray-600 hover:text-[#28bdb7] transition-colors"
            >
              Our Work
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#28bdb7] transition-all group-hover:w-full" />
            </Link>
            <button
              onClick={() => setShowContactForm(true)}
              className="relative overflow-hidden bg-gradient-to-br from-[#28bdb7] to-[#1f9c96] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 group"
              type="button"
            >
              <span className="relative z-10">Contact Us</span>
              <div className="absolute inset-0 bg-gradient-to-tl from-[#28bdb7] to-[#1f9c96] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 rounded-full border-2 border-white/20 transition-all duration-300 group-hover:border-transparent" />
            </button>
          </nav>
        </div>

        <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4 pb-2`}>
          <nav className="flex flex-col gap-4">
            <Link
              href="/aboutus"
              className="text-gray-600 hover:text-[#28bdb7] transition-colors py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/ourwork"
              className="text-gray-600 hover:text-[#28bdb7] transition-colors py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Work
            </Link>
            <button
              onClick={() => {
                setShowContactForm(true);
                setIsMenuOpen(false);
              }}
              className="text-gray-600 hover:text-[#28bdb7] transition-colors py-2 border-b border-gray-100 text-left"
              type="button"
            >
              Contact
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}