'use client'

import Image from "next/image";
import localFont from "next/font/local";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiLinkedin, FiInstagram, FiMapPin, FiMail, FiPhone, FiFacebook, FiYoutube } from 'react-icons/fi';
import Link from "next/link";
import SeoHead from '../components/SeoHead';
import OurProjects from "./OurProjects";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const getServiceIcon = (service: string) => {
  const icons = {
    'Web Development': <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    'Web Application & App Development': <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    'Digital Marketing': <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    '3D Animation': <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  };
  return icons[service as keyof typeof icons];
};

const getServiceDescription = (service: string) => {
  const descriptions = {
    'Web Development': 'Build high-performance websites with modern tech stack and responsive design principles.',
    'Web Application & App Development': 'Native & cross-platform mobile and web applications that deliver seamless user experiences.',
    'Digital Marketing': 'Targeted campaigns that convert, from social media to email marketing.',
    '3D Animation': 'Stunning visual storytelling through motion graphics and character animation.'
  };
  return descriptions[service as keyof typeof descriptions];
};

export default function Home() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // SEO: Structured Data (Organization)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aefoniq",
    "url": "https://aefoniq.com",
    "logo": "https://aefoniq.com/aefoniq-logo.png",
    "description": "Aefoniq is a premier digital innovation agency specializing in Web Development, Game Design, VFX, 3D Animation, and Digital Marketing.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dhaka",
      "addressCountry": "BD"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+8801304625135",
      "contactType": "customer service",
      "email": "aefoniq@gmail.com"
    },
    "sameAs": [
      "https://www.facebook.com/aefoniq/",
      "https://www.linkedin.com/company/aefoniq",
      "https://www.instagram.com/aefoniq/",
      "https://www.youtube.com/@Aefoniq"
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 100);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#f0f2f4] text-black font-sans overflow-x-hidden`}>

      <SeoHead 
        title="Aefoniq | Digital Innovation, Web Development & 3D Animation Agency"
        description="Aefoniq is a premier digital agency in Dhaka offering Web Development, Mobile Apps, VFX, 3D Animation, and Game Design services to scale your business."
        keywords={[
          'Web Development Agency', 
          'Game Design Studio', 
          'VFX Services', 
          '3D Animation Studio',
          'Character Design',
          'ERP software', 
          'Digital Marketing Agency', 
          'Mobile App Development', 
          'Software Company Bangladesh',
          'Aefoniq',
          'Digital Innovation Agency',
          'Custom CRM Solutions',
          'FinTech Software',
          'Progressive Web Apps',
          'UI/UX Design Services',
          'Android App Development',
          'iOS App Developers',
          'Web Development Agency',
          'E-commerce Website Development',
          'Restaurant Website Builder',
          'Real Estate Web Design',
          'Zack D filmming',
          'Web Development Agency',
          'Game Design Studio',
          'VFX Services',
          '3D Animation Studio',
          'IT Solutions',
          'Low Budget Better Quality Agency',
          'Number One IT Company in Bangladesh',
          'Number One IT Company in Asia',
          'Number One IT Company in World',
          'Quality IT Company in Bangladesh',
          'Affordable IT Company in Bangladesh',
          'Affordable Software Company in Bangladesh',
          'Best Software Company in Bangladesh',
          'Quality IT Company in World',
          'Affordable IT Company in World',
          'Affordable Software Company in World',
          'Best Software Company in World',
          'Quality IT Company in USA',
          'Affordable IT Company in USA',
          'Affordable Software Company in USA',
          'Best Software Company in USA',
          'Quality IT Company in Europe',
          'Affordable IT Company in Europe',
          'Affordable Software Company in Europe',
          'Best Software Company in Europe',

        ]}
      />
      
      {/* SEO: Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {showPrivacy && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="relative bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl animate-slide-up">
            <button
              onClick={() => setShowPrivacy(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-[#28bdb7] transition-colors"
              aria-label="Close Privacy Policy"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#28bdb7] to-[#1f9c96] bg-clip-text text-transparent">
              Privacy Policy
            </h2>
            <div className="prose max-h-[60vh] overflow-y-auto">
              <h3 className="text-xl font-semibold mb-4">Information We Collect</h3>
              <p className="text-gray-600 mb-4">
                We collect information you provide directly when you use our services, 
                including personal details, contact information, and usage data.
              </p>
              
              <h3 className="text-xl font-semibold mb-4">How We Use Your Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Provide and maintain our services</li>
                <li>Improve user experience</li>
                <li>Communicate with you</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {showTerms && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="relative bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl animate-slide-up">
            <button
              onClick={() => setShowTerms(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-[#28bdb7] transition-colors"
              aria-label="Close Terms of Service"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#28bdb7] to-[#1f9c96] bg-clip-text text-transparent">
              Terms of Service
            </h2>
            <div className="prose max-h-[60vh] overflow-y-auto">
              <h3 className="text-xl font-semibold mb-4">Acceptance of Terms</h3>
              <p className="text-gray-600 mb-4">
                By accessing or using our services, you agree to be bound by these terms. 
                If you disagree with any part, you may not access the services.
              </p>
              
              <h3 className="text-xl font-semibold mb-4">User Responsibilities</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Comply with all applicable laws</li>
                <li>Maintain account security</li>
                <li>No unauthorized use of intellectual property</li>
                <li>No disruptive or illegal activities</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {showContactForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="relative bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl animate-slide-up">
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-[#28bdb7] transition-colors"
              aria-label="Close Contact Form"
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
                href="https://mail.google.com/mail/?view=cm&to=aefoniq@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                aria-label="Send us an email"
              >
                <div className="bg-[#1f9c96] p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email Us</h3>
                  <p className="text-gray-600 text-sm">aefoniq@gmail.com</p>
                </div>
              </a>

              {/* Phone Option */}
              <a
                href="tel:(+88)01304625135"
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                aria-label="Call us"
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
                href="https://mail.google.com/mail/?view=cm&to=aefoniq@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-br from-[#28bdb7] to-[#1f9c96] text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                aria-label="Open Gmail composer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M20 18h-2V9.25L12 13L6 9.25V18H4V6h1.2l6.8 4.25L18.8 6H20m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
                </svg>
                <span>Open in Gmail</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Decorative Background */}
      <div className="fixed inset-0 -z-10 opacity-10">
        <div className="absolute w-[80vw] h-[80vw] max-w-[800px] -top-1/4 -left-1/4 bg-gradient-to-r from-[#28bdb7]/20 to-[#1f9c96]/10 rounded-full blur-3xl animate-rotate" />
        <div className="absolute w-[60vw] h-[60vw] max-w-[600px] -top-1/4 -right-1/4 bg-gradient-to-b from-[#28bdb7]/15 to-[#1f9c96]/10 rounded-full blur-3xl animate-rotate-reverse" />
      </div>

      <header className={`fixed w-full top-0 left-0 z-50 transition-transform duration-500 
        ${headerVisible ? "translate-y-0" : "-translate-y-full"}
        ${scrolled ? "bg-[#f0f2f4]/95 backdrop-blur-xl shadow-sm" : "bg-transparent"}
        after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-[#28bdb7]/40 after:to-transparent after:animate-border-flow`}>
        
        <div className="max-w-screen-2xl mx-auto px-6 xl:px-[200px] py-4">
          <div className="flex justify-between items-center">
            <Link href="/" aria-label="Aefoniq Home">
              <Image
                src="/aefoniq-logo.png"
                alt="Aefoniq - Digital Innovation Agency Logo"
                width={120}
                height={34}
                priority
                className="w-24 sm:w-32 hover:opacity-80 transition-opacity"
              />
            </Link>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden p-2 text-gray-600 hover:text-[#28bdb7] transition-colors"
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
              >
                About Us
              </Link>
               <Link
                href="/ourwork"
                className="relative group text-gray-600 hover:text-[#28bdb7] transition-colors"
              >
                Portfolio
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#28bdb7] transition-all group-hover:w-full" />
              </Link>
              <button
                onClick={() => setShowContactForm(true)}
                className="text-gray-600 hover:text-[#28bdb7] transition-colors py-2 border-b border-gray-100 text-left"
              >
                Contact
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="pt-[68px] pb-12">
    <section className="relative w-full h-[50vh] sm:h-[70vh] md:h-[calc(100vh-68px)] overflow-hidden m-0 p-0">
          <div className="relative h-full w-full aspect-video">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/hero1.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src="/hero1.webm" type="video/webm" />
              <source src="/hero1.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        <section className="px-6 xl:px-[200px] py-20 pb-32 lg:pb-60 lg:pt-60 relative overflow-hidden">
  <div className="max-w-screen-2xl mx-auto">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
      {/* Left Content - Text */}
      <div className="w-full lg:w-1/2 space-y-8 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-gray-900 via-[#28bdb7] to-[#1f9c96] bg-clip-text text-transparent"
        >
          <motion.span 
            className="block mb-4"
            animate={{
              backgroundPositionX: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: '200% auto',
            }}
          >
            Digital Innovation
          </motion.span>
          <motion.span 
            className="block text-3xl sm:text-4xl md:text-5xl font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Redefined
          </motion.span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-gray-600 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Transform your digital presence with cutting-edge solutions that blend technology and creativity.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            onClick={() => setShowContactForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden bg-gradient-to-br from-[#28bdb7] to-[#1f9c96] text-white px-8 py-4 rounded-full text-sm font-medium hover:shadow-xl transition-all duration-300 group"
          >
            <span className="relative z-10">Start Your Journey</span>
            <div className="absolute inset-0 bg-gradient-to-tl from-[#28bdb7] to-[#1f9c96] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 animate-shine" />
          </motion.button>
        </motion.div>
      </div>

      {/* Right Content - D&B Image */}
      <motion.div 
        className="w-full lg:w-1/2 flex justify-center lg:justify-end relative z-10 mb-8 lg:mb-0"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <motion.a
          href="#why-choose-us"
          className="group relative cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to Why Choose Us section to see verification"
        >
          {/* Main Image Container */}
          <div className="relative">
            {/* Outer Glow Effect */}
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-br from-[#28bdb7]/20 to-[#1f9c96]/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            
            {/* Animated Border Ring */}
            <div className="absolute -inset-3 sm:-inset-4 border-2 border-[#28bdb7]/30 rounded-2xl group-hover:border-[#28bdb7]/50 transition-all duration-500 animate-pulse" />
            
            {/* Main Image Card */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20 group-hover:shadow-3xl transition-all duration-300 transform group-hover:rotate-1">
              
              {/* Image Container with Gradient Border */}
              <div className="relative bg-gradient-to-br from-[#28bdb7] to-[#1f9c96] p-1 rounded-2xl">
                <div className="bg-white rounded-xl p-4 sm:p-6">
                  <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto">
                    <Image
                      src="/duns.png"
                      alt="Dun & Bradstreet Verified Business Seal for Aefoniq"
                      width={256}
                      height={256}
                      className="rounded-lg object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Verification Badge */}
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-gradient-to-br from-green-500 to-green-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full shadow-2xl font-bold text-xs sm:text-sm animate-bounce">
                Verified ✓
              </div>

              {/* Click Prompt */}
              <div className="mt-4 sm:mt-6 text-center">
                <div className="flex items-center justify-center gap-2 text-gray-600 group-hover:text-[#28bdb7] transition-colors duration-300">
                  <span className="font-medium text-sm sm:text-base">Click to verify our credentials</span>
                  <svg 
                    className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-y-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                  Dun & Bradstreet Verified Business
                </p>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 bg-[#28bdb7]/20 rounded-full blur-sm group-hover:bg-[#28bdb7]/30 transition-colors duration-300" />
            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-4 h-4 sm:w-6 sm:h-6 bg-[#1f9c96]/20 rounded-full blur-sm group-hover:bg-[#1f9c96]/30 transition-colors duration-300" />
            
            {/* Connection Line (Optional) - Hidden on mobile */}
            <div className="absolute -right-4 sm:-right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-[#28bdb7] to-transparent" />
                <span className="text-xs font-medium text-gray-500 hidden xl:block">Trust Verified</span>
              </div>
            </div>
          </div>

          {/* Tooltip on Hover */}
          <div className="absolute -bottom-24 sm:-bottom-28 left-1/2 transform -translate-x-1/2 hidden group-hover:block z-20">
            <div className="bg-gray-900 text-white text-xs sm:text-sm rounded-lg py-2 px-3 sm:px-4 whitespace-nowrap shadow-xl">
              Discover why clients trust us
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-900"></div>
            </div>
          </div>
        </motion.a>
      </motion.div>
    </div>

    {/* Background Animations */}
    <div className="absolute inset-0 -z-10 opacity-15">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#28bdb7] rounded-full blur-[1px]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 360],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div 
        className="absolute w-[800px] h-[800px] -top-64 -left-64 bg-gradient-to-r from-[#28bdb7]/10 to-[#1f9c96]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div 
        className="absolute w-[600px] h-[600px] -bottom-64 -right-64 bg-gradient-to-b from-[#28bdb7]/10 to-[#1f9c96]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [360, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  </div>
</section>

        <section id="services" className="px-6 xl:px-[200px] py-20 bg-[#f0f2f4]">
          <div className="max-w-screen-2xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-[#28bdb7] to-[#1f9c96] bg-clip-text text-transparent">
                Our Expertise
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Specialized digital solutions designed to elevate your brand presence and drive growth.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {['Web Development', 'Web Application & App Development', 'Digital Marketing', '3D Animation'].map((service) => {
                const servicePath = service.replace(/[\s&]+/g, '').toLowerCase();
                return (
                  <Link 
                    href={`/${servicePath}`}
                    key={service}
                    className="group relative p-8 bg-smokewhite rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 border border-gray-100 hover:border-[#28bdb7]/20"
                  >
                    <div className="absolute inset-0 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#28bdb7]/5 to-[#28bdb7]/0 rounded-2xl" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="w-14 h-14 mb-6 flex items-center justify-center bg-gradient-to-br from-[#28bdb7] to-[#1f9c96] rounded-xl shadow-sm">
                        {getServiceIcon(service)}
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-[#1f9c96] transition-colors">
                        {service}
                      </h3>
                      <p className="text-gray-600 mb-6 text-[15px] leading-relaxed">
                        {getServiceDescription(service)}
                      </p>
                      
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="inline-flex items-center text-[#28bdb7] font-medium text-sm hover:text-[#1f9c96] transition-colors">
                          Explore Services
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        
        <section id="why-choose-us" className="px-6 xl:px-[200px] py-20 bg-[#f0f2f4]">
  <div className="max-w-screen-2xl mx-auto">
    <div className="text-center mb-20">
      <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-[#28bdb7] to-[#1f9c96] bg-clip-text text-transparent">
        Why Choose Aefoniq
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        We don&apos;t just build digital products; we create immersive experiences that transport your audience into new worlds of possibility.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {/* Innovative Approach Card */}
      <div className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#28bdb7]/20 to-[#1f9c96]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Animated Border */}
        <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-br from-[#28bdb7] to-[#1f9c96] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl" />
          <div className="w-full h-full animate-border-glow bg-[length:400%_400%] bg-gradient-to-br from-[#28bdb7] via-[#1f9c96] to-[#28bdb7]" />
        </div>

        <div className="relative z-10">
          <div className="mb-6 flex items-center justify-center">
            <div className="relative w-20 h-20">
              {/* Enhanced Pulse Animation */}
              <div className="absolute inset-0 bg-[#28bdb7]/10 rounded-full animate-pulse-glow" />
              <div className="relative z-10 bg-gradient-to-br from-[#28bdb7] to-[#1f9c96] rounded-full flex items-center justify-center h-full w-full">
                <svg className="w-8 h-8 text-white transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-[#1f9c96] transition-colors">Innovative Approach</h3>
          <p className="text-gray-600">Pushing boundaries with creative solutions and cutting-edge technology</p>
        </div>
      </div>

      {/* Expert Team Card */}
      <div className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#28bdb7]/20 to-[#1f9c96]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-br from-[#28bdb7] to-[#1f9c96] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl" />
          <div className="w-full h-full animate-border-glow bg-[length:400%_400%] bg-gradient-to-br from-[#28bdb7] via-[#1f9c96] to-[#28bdb7]" />
        </div>

        <div className="relative z-10">
          <div className="mb-6 flex items-center justify-center">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 bg-[#28bdb7]/10 rounded-full animate-pulse-glow" />
              <div className="relative z-10 bg-gradient-to-br from-[#28bdb7] to-[#1f9c96] rounded-full flex items-center justify-center h-full w-full">
                <svg className="w-8 h-8 text-white transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" />
                </svg>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-[#1f9c96] transition-colors">Expert Team</h3>
          <p className="text-gray-600">Specialists in every field working collaboratively to deliver excellence</p>
        </div>
      </div>

      {/* Results-Driven Card */}
      <div className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#28bdb7]/20 to-[#1f9c96]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-br from-[#28bdb7] to-[#1f9c96] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl" />
          <div className="w-full h-full animate-border-glow bg-[length:400%_400%] bg-gradient-to-br from-[#28bdb7] via-[#1f9c96] to-[#28bdb7]" />
        </div>

        <div className="relative z-10">
          <div className="mb-6 flex items-center justify-center">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 bg-[#28bdb7]/10 rounded-full animate-pulse-glow" />
              <div className="relative z-10 bg-gradient-to-br from-[#28bdb7] to-[#1f9c96] rounded-full flex items-center justify-center h-full w-full">
                <svg className="w-8 h-8 text-white transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-[#1f9c96] transition-colors">Results-Driven</h3>
          <p className="text-gray-600">Focused on creating meaningful impact and measurable business outcomes</p>
        </div>
      </div>
    </div>

    {/* Full Width D&B Verified Card */}
    <div className="group relative bg-gradient-to-br from-[#1a5276] to-[#2e86c1] rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-blue-400/30 hover:border-blue-300 overflow-hidden transform hover:-translate-y-1">
      <a 
        href="https://www.dnb.com/business-directory/company-profiles.aefoniq.4747f5975dfa33c12d656502920f860d.html" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block p-12"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-br from-white/40 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-full h-full animate-shimmer bg-[length:200%_100%] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Verified & Trusted Business
              </h3>
              <p className="text-blue-100/90 text-lg mb-6 max-w-2xl">
                Our business credibility is officially verified by Dun & Bradstreet, 
                the global leader in business data and analytics. This certification 
                underscores our commitment to transparency and professional excellence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
                <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-base font-medium group-hover:bg-white/30 transition-all duration-300 border border-white/30 group-hover:border-white/50">
                  <span>Verify Our Credentials</span>
                  <svg 
                    className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                
                {/* Trust Indicators */}
                <div className="flex items-center gap-4 text-blue-200/80 text-sm">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Global Verification</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Business Credibility</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - D&B Seal */}
            <div className="flex-shrink-0">
              <div className="relative">
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 scale-110" />
                
                {/* Animated Ring */}
                <div className="absolute -inset-4 rounded-2xl border-2 border-white/30 group-hover:border-white/50 transition-all duration-500 animate-pulse" />
                
                {/* Main Seal Container */}
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 group-hover:border-white/40 transition-all duration-300 transform group-hover:scale-105">
                  <div className="relative w-32 h-32">
                    <Image
                      src="/duns.png"
                      alt="Dun & Bradstreet Verified Business Seal"
                      width={128}
                      height={128}
                      className="rounded-lg object-contain drop-shadow-2xl group-hover:drop-shadow-3xl transition-all duration-300"
                    />
                    
                    {/* Verification Badge */}
                    <div className="absolute -top-3 -right-3 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
                      Verified ✓
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/20 rounded-tl-2xl group-hover:border-white/40 transition-colors duration-300" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-white/20 rounded-tr-2xl group-hover:border-white/40 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-white/20 rounded-bl-2xl group-hover:border-white/40 transition-colors duration-300" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/20 rounded-br-2xl group-hover:border-white/40 transition-colors duration-300" />
      </a>
    </div>
  </div>
</section>
        <OurProjects />
        {/* Footer */}
        <footer className="mt-24 bg-gradient-to-b from-bg-[#f0f2f4] to-[#f8fbfb] border-t border-gray-100 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/50 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-[#28bdb7]/30 to-transparent" />

          <div className="max-w-screen-2xl mx-auto px-6 xl:px-[200px] py-20 relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
              {/* Company Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Link href="/">
                    <Image
                      src="/aefoniq-logo.png"
                      alt="Aefoniq Logo - Innovators in Tech"
                      width={160}
                      height={45}
                      className="w-36 opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </Link>
                  <span className="bg-[#28bdb7] text-white px-3 py-1 rounded-full text-xs font-medium">
                    Digital Innovators
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed pr-8">
                  Pioneering digital innovation through cutting-edge technology and creative excellence.
                </p>
                <div className="flex space-x-4">
  {[
    // Add your actual links here
    { icon: <FiFacebook className="w-5 h-5" />, platform: 'Facebook', link: 'https://www.facebook.com/aefoniq/' },
    { icon: <FiLinkedin className="w-5 h-5" />, platform: 'LinkedIn', link: 'https://www.linkedin.com/company/aefoniq' },
    { icon: <FiYoutube className="w-5 h-5" />, platform: 'Youtube', link: 'https://www.youtube.com/@Aefoniq' },
    { icon: <FiInstagram className="w-5 h-5" />, platform: 'Instagram', link: 'https://www.instagram.com/aefoniq/' }
  ].map(({ icon, platform, link }) => ( // <-- Destructure the new 'link' property
    <a
      key={platform}
      href={link} // <-- Use the 'link' variable here
      target="_blank" // <-- Optional: Opens the link in a new tab
      rel="noopener noreferrer" // <-- Good practice for security with target="_blank"
      className="text-gray-500 hover:text-[#28bdb7] transition-colors duration-300 transform hover:scale-110"
      aria-label={`Visit our ${platform}`}
    >
      {icon}
    </a>
  ))}
</div>
              </div>

              {/* Explore Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-px after:bg-[#28bdb7]">
                  Explore
                </h3>
                <nav className="space-y-3">
                  <Link href="/" className="block text-gray-600 hover:text-[#28bdb7] transition-colors text-sm group">
                    Home
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-px bg-[#28bdb7]" />
                  </Link>
                  <Link href="/aboutus" className="block text-gray-600 hover:text-[#28bdb7] transition-colors text-sm group">
                    About Us
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-px bg-[#28bdb7]" />
                  </Link>
                  <a href="#services" className="block text-gray-600 hover:text-[#28bdb7] transition-colors text-sm group">
                    Services
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-px bg-[#28bdb7]" />
                  </a>
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="block text-gray-600 hover:text-[#28bdb7] transition-colors text-sm group w-full text-left"
                  >
                    Contact
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-px bg-[#28bdb7]" />
                  </button>
                </nav>
              </div>

              {/* Solutions Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-px after:bg-[#28bdb7]">
                  Solutions
                </h3>
                <nav className="space-y-3">
                  {['Web Development', 'Web Application & App Development', 'Digital Marketing', '3D Animation'].map((service) => {
                    const servicePath = service.replace(/[\s&]+/g, '').toLowerCase();
                    return (
                      <Link
                        href={`/${servicePath}`}
                        key={service}
                        className="block text-gray-600 hover:text-[#28bdb7] transition-colors text-sm group"
                      >
                        {service}
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-px bg-[#28bdb7]" />
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-px after:bg-[#28bdb7]">
                  Connect
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <FiMapPin className="text-[#28bdb7] flex-shrink-0" />
                    <p>Rayerbag<br/>Dhaka, Bangladesh</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiMail className="text-[#28bdb7] flex-shrink-0" />
                    <p>aefoniq@gmail.com</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiPhone className="text-[#28bdb7] flex-shrink-0" />
                    <p>(+88) 01304625135</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gradient Divider */}
            <div className="my-12 h-px bg-gradient-to-r from-transparent via-[#28bdb7]/20 to-transparent" />

            {/* Copyright Section */}
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Aefoniq. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="text-gray-500 hover:text-[#28bdb7] transition-colors text-sm group"
                >
                  Privacy Policy
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-px bg-[#28bdb7]" />
                </button>
                <button
                  onClick={() => setShowTerms(true)}
                  className="text-gray-500 hover:text-[#28bdb7] transition-colors text-sm group"
                >
                  Terms of Service
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-px bg-[#28bdb7]" />
                </button>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}