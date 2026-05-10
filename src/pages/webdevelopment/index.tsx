'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import localFont from 'next/font/local';
import Header from '../../components/Header';
import ProjectCard, { PublicProject } from '../../components/ProjectCard';
import ProjectModal from '../../components/ProjectModal';
import ContactModal from '../../components/ContactModal';
import SeoHead from '../../components/SeoHead';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// ─────────────────────────────────────────────────────────────
// STATIC PROJECT DATA — replace the YouTube URLs as needed.
// To add more projects, duplicate any object and update the
// id, title, description, subCategory, and mediaUrl fields.
// subCategory controls the filter buttons automatically.
// ─────────────────────────────────────────────────────────────
const STATIC_PROJECTS: PublicProject[] = [
  {
    id: 1,
    title: 'Non Profit Organization Website',
    description: 'Custom website for a non-profit organization, featuring event management, donation integration, and volunteer sign-up.',
    category: 'Website Development',
    subCategory: 'non-profit',
    mediaItems: [
      {
        id: 1,
        mediaType: 'video',
        mediaUrl: 'https://www.youtube.com/watch?v=tmax44nl0tE', // ← replace
      },
    ],
  },
  {
    id: 2,
    title: 'Real Estate Portal',
    description: 'Property listing portal with advanced search filters  and agent management.',
    category: 'Website Development',
    subCategory: 'real estate',
    mediaItems: [
      {
        id: 2,
        mediaType: 'video',
        mediaUrl: 'https://www.youtube.com/watch?v=6iFaO_pqN8Y', // ← replace
      },
    ],
  },
  {
    id: 3,
    title: 'Indoor Playzone E-commerce Site',
    description: 'E-commerce website for an indoor playzone, with product catalog, shopping cart, and online booking system.',
    category: 'Website Development',
    subCategory: 'e-commerce',
    mediaItems: [
      {
        id: 3,
        mediaType: 'video',
        mediaUrl: 'https://www.youtube.com/watch?v=oyUZ52ybREE', // ← replace
      },
    ],
  },
  {
    id: 4,
    title: 'Beauty Salon Corporate Site',
    description: 'Corporate website for a beauty salon chain, featuring service listings, appointment booking, and customer testimonials.',
    category: 'Website Development',
    subCategory: 'UI/UX design',
    mediaItems: [
      {
        id: 4,
        mediaType: 'video',
        mediaUrl: 'https://www.youtube.com/watch?v=iwGLwZsWIso', // ← replace
      },
    ],
  },
  {
    id: 5,
    title: 'School Website',
    description: 'Informational website for a school, with sections for academics, admissions, events, and contact information.',
    category: 'Website Development',
    subCategory: 'education',
    mediaItems: [
      {
        id: 5,
        mediaType: 'video',
        mediaUrl: 'https://www.youtube.com/watch?v=RJ021L4zHOY', // ← replace
      },
    ],
  },
  {
    id: 6,
    title: 'Furniture Store Website With three js',
    description: 'Interactive furniture store website with 3D product visualization and virtual room planning.',
    category: 'Website Development',
    subCategory: 'e-commerce',
    mediaItems: [
      {
        id: 6,
        mediaType: 'video',
        mediaUrl: 'https://www.youtube.com/watch?v=76b7RuDJ2dQ', // ← replace
      },
    ],
  },

  {
    id: 7,
    title: 'Chandelier Customizer with Three Js',
    description: 'Custom chandelier design tool using Three.js for real-time 3D visualization and customization options.',
    category: 'Website Development',
    subCategory: 'Three Js',
    mediaItems: [
      {
        id: 7,
        mediaType: 'video',
        mediaUrl: 'https://www.youtube.com/watch?v=maqc-y5VYCA', // ← replace
      },
    ],
  },
];

function getSubCategories(projects: PublicProject[]): string[] {
  const unique = new Set<string>();
  projects.forEach((p) => {
    if (p.subCategory) unique.add(p.subCategory.toLowerCase());
  });
  return ['all', ...Array.from(unique)];
}

// ─────────────────────────────────────────────────────────────

export default function WebDevelopment() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  // Static projects (no API call)
  const projects = STATIC_PROJECTS;
  const subCategories = useMemo(() => getSubCategories(projects), [projects]);

  // Filtering
  const [activeSubCategory, setActiveSubCategory] = useState('all');

  // Modal
  const [selectedProject, setSelectedProject] = useState<PublicProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Header scroll effect
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Filter logic
  const filteredProjects = useMemo(() => {
    if (activeSubCategory === 'all') return projects;
    return projects.filter((p) => p.subCategory?.toLowerCase() === activeSubCategory);
  }, [projects, activeSubCategory]);

  // Modal handlers
  const openProject = useCallback((project: PublicProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeProject = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
    document.body.style.overflow = 'unset';
  }, []);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#f0f2f4] text-black font-sans overflow-x-hidden`}>
      <SeoHead
        title="Custom Web Development & UI/UX Design | Aefoniq"
        description="Expert Web Development: Custom WordPress, React/Next.js apps, and high-performance websites tailored for Real Estate, Restaurants, and Corporate needs."
        keywords={[
          'Restaurant Website Builder',
          'Real Estate Web Design',
          'E-commerce Website Development',
          'Custom ERP Software',
          'Next.js Developers',
          'UI/UX Design Services',
          'WordPress Development',
        ]}
        url="https://aefoniq.com/webdevelopment"
      />
      <Header
        scrolled={scrolled}
        headerVisible={headerVisible}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setShowContactForm={setShowContactForm}
      />

      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeProject} />
        )}
      </AnimatePresence>

      {showContactForm && (
        <ContactModal isOpen={showContactForm} onClose={() => setShowContactForm(false)} />
      )}

      <main className="pt-[68px] pb-12">

        {/* Hero Section */}
        <section className="relative h-[600px] md:h-screen flex items-center justify-center px-4 sm:px-6 lg:px-[100px] xl:px-[200px] overflow-hidden bg-white">
          <div className="absolute inset-0 z-10 hidden md:block">
            <div className="absolute left-0 top-1/4 w-1/3 h-1/2 flex flex-col gap-4 md:gap-8">
              <motion.div className="self-start" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
                <div className="p-3 md:p-4 bg-gray-900/5 backdrop-blur-lg rounded-lg md:rounded-xl border border-gray-900/10 shadow-md md:shadow-lg">
                  <span className="text-xs md:text-sm font-mono text-[#28bdb7]">// Web Architecture</span>
                </div>
              </motion.div>
              <motion.div className="self-start ml-4 md:ml-8" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
                <div className="p-3 md:p-4 bg-gray-900/5 backdrop-blur-lg rounded-lg md:rounded-xl border border-gray-900/10 shadow-md md:shadow-lg">
                  <span className="text-xs md:text-sm font-mono text-[#28bdb7]">// Cloud Native</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute right-0 top-1/3 w-1/3 h-1/2 flex flex-col gap-4 md:gap-8">
              <motion.div className="self-end" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
                <div className="p-3 md:p-4 bg-gray-900/5 backdrop-blur-lg rounded-lg md:rounded-xl border border-gray-900/10 shadow-md md:shadow-lg">
                  <span className="text-xs md:text-sm font-mono text-[#28bdb7]">// API First</span>
                </div>
              </motion.div>
              <motion.div className="self-end mr-4 md:mr-8" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
                <div className="p-3 md:p-4 bg-gray-900/5 backdrop-blur-lg rounded-lg md:rounded-xl border border-gray-900/10 shadow-md md:shadow-lg">
                  <span className="text-xs md:text-sm font-mono text-[#28bdb7]">// DevOps Ready</span>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="relative z-30 w-full max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl h-[50vh] md:h-[65vh] lg:h-[75vh]">
            <div className="absolute top-6 md:top-8 bottom-6 md:bottom-8 left-0 right-0 bg-gray-200 rounded-t-xl md:rounded-t-2xl flex items-center justify-center">
              <div className="w-12 md:w-16 h-1 bg-gray-400 rounded-full" />
              <div className="absolute left-1/2 -translate-x-1/2 top-1 w-1.5 md:w-2 h-1.5 md:h-2 bg-gray-500 rounded-full" />
            </div>
            <div className="absolute top-6 md:top-8 bottom-6 md:bottom-8 left-0 right-0 bg-gray-100 rounded-md md:rounded-lg overflow-hidden border-4 md:border-8 border-gray-200 shadow-xl md:shadow-2xl">
              <div className="relative w-full h-full overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-8 md:grid-cols-12 gap-1 md:gap-2 font-mono text-[#1f9c96] text-[8px] md:text-xs">
                  {Array.from({ length: 600 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="opacity-20"
                      animate={{ opacity: [0, 0.4, 0] }}
                      transition={{ duration: Math.random() * 4 + 2, repeat: Infinity, delay: Math.random() * 2 }}
                    >
                      {['React', 'Next.js', 'TypeScript', 'Node.js', 'Git', 'AWS', 'Vercel', 'GraphQL', 'Tailwind', 'Docker', 'API', 'SEO'][i % 12]}
                    </motion.div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center p-2 md:p-4">
                  <div className="relative w-full h-full md:w-3/4 md:h-3/4 bg-white/90 backdrop-blur-lg rounded-lg md:rounded-xl border border-gray-200/50 shadow-lg md:shadow-xl">
                    <div className="p-2 md:p-4 bg-gray-100 border-b border-gray-300 flex items-center justify-between">
                      <div className="flex items-center space-x-1 md:space-x-2">
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500" />
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500" />
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500" />
                      </div>
                      <div className="text-gray-500 text-xs md:text-sm font-mono hidden sm:block">
                        aefoniq@portfolio: ~/projects/main (git:main)
                      </div>
                    </div>
                    <div className="p-2 md:p-4 h-[calc(100%-40px)] md:h-[calc(100%-52px)] overflow-auto">
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i} className="font-mono text-[#1f9c96] text-xs md:text-sm">
                          <span className="text-gray-400">{(i + 1).toString().padStart(2, '0')}</span>
                          <span className="mx-2 md:mx-4">|</span>
                          <span className="animate-pulse">{i % 2 === 0 ? '➜' : '✔'}</span>
                          <span className="ml-1 truncate">
                            {['git commit -m "Update responsive layouts"', 'npm run build', 'vercel deploy --prod', 'eslint --fix', 'npm install next@latest', 'docker-compose up', 'jest --watch', 'git push origin main', 'npm run dev', 'aws s3 sync build/ s3://aefoniq'][i % 10]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-6 md:h-8 bg-gradient-to-t from-gray-200 to-gray-100 rounded-b-xl md:rounded-b-2xl">
              <div className="absolute inset-x-0 -top-1 md:-top-2 h-3 md:h-4 bg-gray-100 rounded-t-lg mx-8 md:mx-12" />
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="px-4 sm:px-6 lg:px-[100px] xl:px-[200px] py-12 md:py-20 relative overflow-hidden bg-[#f0f2f4]">
          <div className="absolute inset-0 z-0 opacity-[3%]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0L0 0 0 40" fill="none" stroke="#28bdb7" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto relative">

            {/* Intro */}
            <div className="relative mb-12 md:mb-16">
              <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-[#28bdb7] to-[#1f9c96] bg-clip-text text-transparent">
                Web Development & Design Services
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl">
                We are a premier <strong>Web Development Agency</strong>. Whether you need a <strong>Restaurant Website</strong> with online ordering, a <strong>Real Estate Portal</strong>, or a <strong>Corporate Business Site</strong>, we build scalable digital solutions.
              </motion.p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 md:mb-24">
              {[
                { title: 'Dynamic & WordPress',    desc: 'Custom WordPress development and dynamic content management systems tailored to your brand needs.',                               icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
                { title: 'UI/UX Design Systems',   desc: 'User-centric interface design ensuring intuitive navigation and higher conversion rates for your web applications.',                icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
                { title: 'Three.js 3D Web',         desc: 'Next-gen immersive experiences using Three.js for 3D web simulation and interactive visual storytelling.',                        icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
                { title: 'Progressive Web Apps',    desc: 'Fast, reliable, and engaging PWAs that work offline and provide an app-like experience on the web.',                              icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
                { title: 'Frontend Architecture',   desc: 'High-performance codebases built with React, Next.js, and modern tools for speed and scalability.',                              icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
                { title: 'SEO Optimization',        desc: 'Technical SEO integrated from the ground up to ensure your website ranks high on Google and Bing.',                              icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:border-[#28bdb7]/50 hover:shadow-[#28bdb7]/10 transition-all group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#28bdb7]/10 to-[#1f9c96]/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-[#28bdb7] group-hover:to-[#1f9c96] transition-all">
                    <svg className="w-6 h-6 text-[#1f9c96] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Industries */}
            <div className="mb-20 md:mb-28">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tailored Solutions for Every Industry</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We understand that a <strong>Restaurant Website</strong> needs different features than a <strong>Corporate Site</strong>. We build industry-specific solutions.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'Restaurants & Food', items: ['Online Ordering Systems', 'Table Reservation Integration', 'Digital QR Menus'],          color: 'from-orange-400 to-red-500' },
                  { name: 'Real Estate',          items: ['Property Listing Portals', '360° Virtual Tours', 'Agent Management Systems'],            color: 'from-blue-500 to-indigo-600' },
                  { name: 'E-Commerce',            items: ['Custom Cart Development', 'Payment Gateway Integration', 'Inventory Management'],       color: 'from-emerald-400 to-teal-500' },
                  { name: 'Healthcare',            items: ['Patient Appointment Booking', 'Telemedicine Integration', 'HIPAA Compliant Design'],    color: 'from-cyan-400 to-blue-500' },
                ].map((industry, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden relative"
                  >
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${industry.color}`} />
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{industry.name}</h3>
                    <ul className="space-y-2">
                      {industry.items.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <svg className="w-4 h-4 text-[#28bdb7] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Technical Mastery & Tech Spectrum */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-20">
              <motion.div className="p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] bg-white/80 backdrop-blur-2xl border border-white/20 shadow-xl md:shadow-2xl relative overflow-hidden hover:shadow-[0_20px_50px_rgba(40,189,183,0.1)] transition-all" whileHover={{ y: -10 }}>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800">Technical Mastery</h2>
                <ul className="space-y-4">
                  {['Real-Time WebRTC Systems', 'Cloud-Native Architecture (Firebase, AWS, GCP)', 'Microservices & API Ecosystems', 'Cross-Platform PWAs', 'AI/ML Integration', 'Headless CMS Solutions'].map((item, index) => (
                    <motion.li key={index} className="flex items-center group p-3 md:p-4 rounded-lg md:rounded-xl hover:bg-white/50 transition-all" whileHover={{ x: 10 }}>
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-br from-[#28bdb7] to-[#1f9c96] rounded-full mr-3 md:mr-4" />
                      <span className="text-base md:text-lg font-medium text-gray-600 group-hover:text-gray-800">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div className="p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] bg-gradient-to-br from-[#f8f9fa] to-white/90 border border-white/20 shadow-xl md:shadow-2xl relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(40,189,183,0.1)]" whileHover={{ y: -10 }}>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800">Technology Spectrum</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {['React/Next.js', 'TypeScript', 'Node.js/NestJS', 'GraphQL/REST', 'WebSocket', 'MongoDB/PostgreSQL', 'Docker/Kubernetes', 'AWS/GCP', 'Redis/Memcached', 'WebRTC/Socket.io', 'Jest/Cypress', 'Jenkins/GitHub Actions'].map((tech) => (
                    <motion.div key={tech} className="p-2 md:p-3 bg-white/80 rounded-lg md:rounded-xl hover:bg-white transition-all relative overflow-hidden group-hover:scale-[1.02]" whileHover={{ scale: 1.05 }}>
                      <span className="text-xs md:text-sm font-medium text-gray-600 group-hover:text-gray-800 z-10 relative">{tech}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Agile Lifecycle */}
            <div className="mb-12 md:mb-20">
              <motion.h3 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-gray-800 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                Agile Development Lifecycle
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative">
                <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-[#28bdb7]/50 to-[#1f9c96]/50 hidden lg:block" />
                {[
                  { title: 'Sprint Planning',   content: 'Requirement analysis & roadmap design' },
                  { title: 'CI/CD Pipeline',    content: 'Automated testing & deployment workflows' },
                  { title: 'Quality Assurance', content: 'Cross-browser & load testing' },
                  { title: 'Cloud Deployment',  content: 'Scalable infrastructure setup' },
                ].map((stage, index) => (
                  <motion.div
                    key={index}
                    className="p-6 md:p-8 bg-white/80 backdrop-blur-lg rounded-2xl md:rounded-[2rem] border border-white/20 shadow-lg md:shadow-xl relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(40,189,183,0.1)]"
                    whileHover={{ y: -10 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <div className="absolute top-4 md:top-6 right-4 md:right-6 text-[#28bdb7] text-xl md:text-2xl font-mono">0{index + 1}</div>
                    <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{stage.title}</h4>
                    <p className="text-sm md:text-base text-gray-600">{stage.content}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-16 md:mb-24">
              <h3 className="text-3xl font-bold text-gray-800 text-center mb-10">Frequently Asked Questions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { q: 'Do you build websites for Restaurants and Food businesses?', a: 'Yes! We specialize in Restaurant Website Development, including features like online food ordering, table reservations, and interactive digital menus.' },
                  { q: 'Can you create Real Estate portals?',                        a: 'Absolutely. We develop robust Real Estate websites with property listings, advanced search filters, and virtual tour integrations.' },
                  { q: 'Why hire a professional web development agency?',            a: 'Professional agencies provide scalable code, custom designs (not just templates), SEO optimization, and ongoing support that freelancers often cannot match.' },
                  { q: 'Do you offer custom WordPress development?',                 a: 'Yes, we specialize in high-performance custom WordPress themes and plugins, ensuring your site is secure, fast, and easy to manage.' },
                ].map((faq, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.01 }} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">{faq.q}</h4>
                    <p className="text-gray-600 text-sm">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ─── WEB DEVELOPMENT PROJECTS SECTION ───────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-12"
              id="projects"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
                Our Web Development Portfolio
              </h2>
              <p className="text-base md:text-lg text-gray-600 text-center mb-8 md:mb-12">
                Check out our latest work in <strong>E-commerce</strong>, <strong>Corporate Websites</strong>, and <strong>Web Applications</strong>.
              </p>

              {/* Sub-Category Filter */}
              {subCategories.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap justify-center gap-3 mb-10"
                >
                  {subCategories.map((subCat) => (
                    <button
                      key={subCat}
                      onClick={() => setActiveSubCategory(subCat)}
                      className={`px-4 py-2 rounded-full font-medium text-xs md:text-sm transition-all duration-300 capitalize ${
                        activeSubCategory === subCat
                          ? 'bg-gradient-to-r from-[#28bdb7] to-[#1f9c96] text-white shadow-md'
                          : 'bg-white/70 text-gray-500 hover:text-gray-900 hover:bg-white hover:shadow-sm border border-gray-200'
                      }`}
                    >
                      {subCat === 'all' ? 'All Types' : subCat}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Project Grid */}
              {filteredProjects.length > 0 ? (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProjectCard project={project} index={index} onClick={openProject} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="text-center text-gray-500 py-10">No website development projects found.</div>
              )}
            </motion.div>
            {/* ──────────────────────────────────────────────────────────── */}

            {/* CTA Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-12 md:mt-20">
              <motion.div
                className="p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] bg-gradient-to-br from-[#28bdb7]/10 to-[#1f9c96]/10 border border-white/20 backdrop-blur-2xl relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(40,189,183,0.1)]"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">Why Agile?</h3>
                <ul className="space-y-3 md:space-y-4">
                  {['Bi-weekly sprint deliverables', 'Continuous client collaboration', 'Adaptive requirement changes', 'Risk-managed development'].map((item, index) => (
                    <motion.li key={index} className="flex items-center p-3 md:p-4 rounded-lg md:rounded-xl hover:bg-white/20 transition-all" whileHover={{ x: 10 }}>
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-[#28bdb7] mr-2 md:mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
                      </svg>
                      <span className="text-sm md:text-base text-gray-600">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                className="p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] bg-white/80 backdrop-blur-2xl border border-white/20 shadow-lg md:shadow-xl relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(40,189,183,0.1)]"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Start Your Project</h3>
                <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">Ready to transform your ideas into exceptional digital solutions?</p>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-[#28bdb7] to-[#1f9c96] text-white px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl hover:opacity-90 transition-opacity w-full text-base md:text-lg font-medium"
                  >
                    Schedule Free Consultation
                    <svg className="w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}