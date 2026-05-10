'use client';

import { motion, AnimatePresence } from 'framer-motion';
import localFont from 'next/font/local';
import {
  FiSmartphone,
  FiGlobe,
  FiCloud,
  FiCode,
  FiDatabase,
  FiArrowRight,
  FiLayers,
  FiShield,
  FiCpu
} from 'react-icons/fi';
import { useState, useEffect, useMemo } from 'react';
import Header from '../../components/Header';
import ProjectCard, { PublicProject } from '../../components/ProjectCard';
import ProjectModal from '../../components/ProjectModal';
import ContactModal from '../../components/ContactModal';
import SeoHead from '../../components/SeoHead';
import { useCallback } from 'react';

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

const techIcons: { [key: string]: JSX.Element } = {
  'React Native': <FiSmartphone className="w-5 h-5 mr-2 text-[#28bdb7]" />,
  'Flutter':      <FiGlobe      className="w-5 h-5 mr-2 text-[#28bdb7]" />,
  'Swift':        <FiCode       className="w-5 h-5 mr-2 text-[#28bdb7]" />,
  'Kotlin':       <FiDatabase   className="w-5 h-5 mr-2 text-[#28bdb7]" />,
  'Node.js':      <FiCpu        className="w-5 h-5 mr-2 text-[#28bdb7]" />,
  'AWS':          <FiCloud      className="w-5 h-5 mr-2 text-[#28bdb7]" />,
};

// ─────────────────────────────────────────────────────────────
// STATIC PROJECT DATA — replace the YouTube URLs as needed.
// To add more projects, duplicate any object and update the
// id, title, description, subCategory, and mediaUrl fields.
// subCategory controls the filter buttons automatically.
// ─────────────────────────────────────────────────────────────
const STATIC_PROJECTS: PublicProject[] = [
  {
    id: 1,
    title: 'School Saas Platform',
    description: 'Cloud-based SaaS platform for schools, featuring student management, online classes, and parent communication tools.',
    category: 'Web Application',
    subCategory: 'Saas Platform',
    mediaItems: [
      {
        id: 1,
        mediaType: 'video',
        mediaUrl: 'https://www.youtube.com/watch?v=NV-pdT4X1_s', // ← replace
      },
    ],
  },
  {
    id: 2,
    title: 'App Development',
    description: 'Native iOS and Android app development for a Educational platform, with real-time data sync and offline capabilities.',
    category: 'App development',
    subCategory: 'education',
    mediaItems: [
      {
        id: 2,
        mediaType: 'video',
        mediaUrl: 'https://www.youtube.com/watch?v=93vTPCQ0ndM', // ← replace
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

export default function WebAppDevelopment() {
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

  // Scroll Effect
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
      <Header
        scrolled={scrolled}
        headerVisible={headerVisible}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setShowContactForm={setShowContactForm}
      />
      <SeoHead
        title="Custom ERP, CRM, SaaS & Mobile App Development | Aefoniq"
        description="We engineer secure Enterprise Software: Custom ERP systems, tailored CRM solutions, scalable SaaS platforms, and high-performance Native (iOS/Android) & Cross-Platform mobile apps."
        keywords={[
          'Custom ERP Software',
          'Enterprise Resource Planning',
          'CRM Development Services',
          'SaaS Application Development',
          'Cloud-Native Solutions',
          'Mobile App Development Company',
          'iOS App Developers',
          'Android App Development',
          'React Native Development',
          'Flutter App Development',
          'Secure API Integration',
          'Business Process Automation',
          'Supply Chain Management Software',
          'FinTech App Development',
          'Healthcare Software Solutions',
          'Real-time Data Dashboards',
          'Scalable Microservices Architecture',
        ]}
        url="https://aefoniq.com/webapplicationappdevelopment"
      />

      {/* Project Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeProject} />
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactModal isOpen={showContactForm} onClose={() => setShowContactForm(false)} />
      )}

      <main className="pt-[68px]">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[80vh] flex items-center bg-white">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute w-[600px] h-[600px] -top-40 -left-40 bg-gradient-to-r from-[#28bdb7] to-[#1f9c96] rounded-full blur-3xl"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="absolute w-[500px] h-[500px] -bottom-60 -right-40 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-20 py-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-center lg:text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight"
                >
                  <span className="bg-gradient-to-r from-gray-900 via-[#28bdb7] to-[#1f9c96] bg-clip-text text-transparent">
                    Enterprise Software
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-[#1f9c96] to-[#28bdb7] bg-clip-text text-transparent">
                    & Mobile Apps
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto lg:mx-0"
                >
                  We engineer secure <strong>ERP & CRM systems</strong> and high-performance{' '}
                  <strong>Native iOS/Android Apps</strong> tailored for scalability.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-4 flex-wrap justify-center lg:justify-start"
                >
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="bg-gradient-to-r from-[#28bdb7] to-[#1f9c96] text-white px-8 py-4 rounded-2xl font-medium text-lg hover:shadow-lg transition-all transform hover:scale-[1.02] flex items-center gap-2"
                  >
                    Build Your Solution
                    <FiArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#28bdb7] to-[#1f9c96] rounded-3xl transform rotate-6 blur-xl opacity-20" />
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 space-y-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="space-y-2 font-mono text-sm">
                      <div className="text-[#28bdb7]">{`// Enterprise Architecture`}</div>
                      <div className="text-gray-400">{`class Solution extends Scalable {`}</div>
                      <div className="ml-4 text-gray-600">type: &quot;Cloud-Native ERP&quot;,</div>
                      <div className="ml-4 text-gray-600">security: &quot;End-to-End Encrypted&quot;,</div>
                      <div className="ml-4 text-gray-600">users: 100000+</div>
                      <div className="text-gray-400">{`}`}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {['ERP System', 'Custom CRM', 'iOS App', 'Android App'].map((item) => (
                      <div key={item} className="bg-gray-50 p-4 rounded-xl">
                        <div className="w-8 h-8 mb-2 rounded-lg bg-[#28bdb7] flex items-center justify-center">
                          <FiShield className="w-4 h-4 text-white" />
                        </div>
                        <div className="font-medium text-gray-700">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="relative py-20 bg-gradient-to-b from-white to-[#f0f2f4]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-20">

            {/* SEO Feature Cards */}
            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Software & Mobile Ecosystems</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  We deliver enterprise-grade software securely engineered for scalability, ensuring your business operations run smoothly and efficiently.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Secure ERP Solutions',     desc: 'Integrated management of main business processes, often in real-time and mediated by software and technology.',           icon: <FiLayers   className="w-6 h-6" /> },
                  { title: 'Custom CRM Systems',        desc: 'Tailored Customer Relationship Management tools to help you manage interactions with current and potential customers.',   icon: <FiCode     className="w-6 h-6" /> },
                  { title: 'Native Mobile Apps',        desc: 'High-performance iOS and Android applications built with Swift and Kotlin for superior user experience.',                icon: <FiSmartphone className="w-6 h-6" /> },
                  { title: 'Cross-Platform Solutions',  desc: 'Cost-effective mobile apps using React Native and Flutter that work seamlessly on both mobile platforms.',              icon: <FiGlobe    className="w-6 h-6" /> },
                  { title: 'Secure API Integration',    desc: 'Robust API architectures ensuring secure data exchange between your software components.',                              icon: <FiShield   className="w-6 h-6" /> },
                  { title: 'Cloud Database Arch.',      desc: 'Scalable cloud database solutions (AWS, Firebase) designed for high availability and security.',                        icon: <FiDatabase className="w-6 h-6" /> },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:border-[#28bdb7] transition-all group"
                  >
                    <div className="w-12 h-12 bg-[#28bdb7]/10 rounded-xl flex items-center justify-center mb-4 text-[#28bdb7] group-hover:bg-[#28bdb7] group-hover:text-white transition-all">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Industries */}
            <div className="mb-24">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Industries We Empower</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['FinTech & Banking', 'Healthcare & Telemedicine', 'Logistics & Supply Chain', 'Retail & E-commerce'].map((industry, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-6 rounded-xl shadow-md text-center border-b-4 border-[#28bdb7]"
                  >
                    <p className="font-semibold text-gray-800">{industry}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Dev Focus & Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="grid md:grid-cols-2 gap-8 mb-20"
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#28bdb7]/10 rounded-full transform translate-x-16 -translate-y-16" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#28bdb7] flex items-center justify-center mb-6">
                    <FiSmartphone className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Development Focus</h2>
                  <ul className="space-y-4">
                    {['Scalable Microservices', 'Enterprise Security Standards', 'Offline-First Mobile Apps', 'Real-time Data Sync', 'Automated CI/CD Pipelines'].map((item, index) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-lg text-gray-600 group"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#28bdb7] mr-3 transition-all group-hover:w-4" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#28bdb7]/10 rounded-full transform -translate-x-16 translate-y-16" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#28bdb7] flex items-center justify-center mb-6">
                    <FiCode className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-800">Tech Stack</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(techIcons).map(([tech, icon]) => (
                      <motion.div
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center bg-gray-50 px-4 py-3 rounded-xl transition-all hover:bg-white hover:shadow-sm"
                      >
                        {icon}
                        <span className="font-medium text-gray-700">{tech}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ─── PROJECTS SECTION ────────────────────────────────────── */}
            <motion.div
              id="projects"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-16 md:mt-24"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">Our Portfolio</h2>
              <p className="text-base md:text-lg text-gray-600 text-center mb-10">
                Explore our Mobile Applications, SaaS Platforms, and Enterprise Software projects.
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
                <div className="text-center text-gray-500 py-10">No projects found for this category.</div>
              )}
            </motion.div>
            {/* ──────────────────────────────────────────────────────────── */}

            {/* FAQ */}
            <div className="mt-24 mb-16">
              <h3 className="text-3xl font-bold text-gray-800 text-center mb-10">Common Questions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { q: 'Do you build custom ERP software?',     a: 'Yes, we engineer bespoke ERP solutions that integrate all your business processes into a single secure system.' },
                  { q: 'Native vs. Cross-Platform Apps?',       a: 'We offer both. Native (Swift/Kotlin) for maximum performance, and Cross-Platform (React Native/Flutter) for faster time-to-market on both iOS and Android.' },
                  { q: 'How secure are your CRM solutions?',    a: 'Security is our priority. We use end-to-end encryption, secure API gateways, and role-based access control (RBAC) for all CRM systems.' },
                  { q: 'Do you provide maintenance for apps?',  a: 'Absolutely. We offer ongoing support, server maintenance, and app store updates to ensure your application remains bug-free and up-to-date.' },
                ].map((faq, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.01 }} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">{faq.q}</h4>
                    <p className="text-gray-600 text-sm">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-20 text-center bg-gradient-to-r from-[#28bdb7] to-[#1f9c96] rounded-3xl p-12 shadow-2xl"
            >
              <h3 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Vision?</h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Whether it&apos;s a complex ERP or a sleek Mobile App, we are ready to bring your digital ideas to life.
              </p>
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-white text-[#28bdb7] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-[1.02] flex items-center gap-2 mx-auto"
              >
                Schedule Free Consultation
                <FiArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}