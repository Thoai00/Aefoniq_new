'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  ChartBarIcon,
  CameraIcon,
  BeakerIcon,
  CodeBracketIcon,
  CommandLineIcon,
  CpuChipIcon,
  FilmIcon,
  PaintBrushIcon,
} from '@heroicons/react/24/outline';
import { FiActivity, FiArrowRight, FiTarget, FiTrendingUp, FiSearch, FiUsers, FiLayout } from 'react-icons/fi';
import Header from '@/components/Header';
import { useEffect, useState, useCallback, useMemo } from 'react';
import ProjectCard, { PublicProject } from '../../components/ProjectCard';
import ProjectModal from '../../components/ProjectModal';
import ContactModal from '../../components/ContactModal';
import SeoHead from '../../components/SeoHead';

// ─────────────────────────────────────────────────────────────
// STATIC PROJECT DATA — replace the YouTube URLs as needed.
// To add more projects, duplicate any object in the array and
// update id, title, description, subCategory, and mediaUrl.
// ─────────────────────────────────────────────────────────────
const STATIC_PROJECTS: PublicProject[] = [
  {
    id: 1,
    title: 'Instagram Page Setup & Growth',
    description: 'Complete Instagram account setup, content strategy, and growth hacking for a lifestyle brand.',
    category: 'Digital Marketing',
    subCategory: 'social media',
    mediaItems: [
      {
        id: 1,
        mediaType: 'video',
        mediaUrl: 'https://www.youtube.com/shorts/8n3z1IMhiuw', // ← replace
      },
    ],
  },
  {
    id: 2,
    title: 'Instagram Ads Funnel',
    description: 'High-converting Facebook & Instagram ad funnel for an e-commerce brand.',
    category: 'Digital Marketing',
    subCategory: 'social media',
    mediaItems: [
      {
        id: 2,
        mediaType: 'video',
        mediaUrl: 'https://www.youtube.com/shorts/eaRjOkUz8rQ', // ← replace
      },
    ],
  },
  
];

// Derive unique sub-categories from static data
function getSubCategories(projects: PublicProject[]): string[] {
  const unique = new Set<string>();
  projects.forEach((p) => {
    if (p.subCategory) unique.add(p.subCategory.toLowerCase());
  });
  return ['all', ...Array.from(unique)];
}

// ─────────────────────────────────────────────────────────────

export default function DigitalMarketing() {
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
    <main className="relative bg-gray-50">
      <Header
        scrolled={scrolled}
        headerVisible={headerVisible}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setShowContactForm={setShowContactForm}
      />
      <SeoHead
        title="Digital Marketing & Growth Hacking Services | Aefoniq"
        description="Data-driven Digital Marketing Agency specializing in SEO, Social Media Management, B2B Lead Generation, and Creative Design to scale your business."
        keywords={[
          'Digital Marketing Agency',
          'SEO Services',
          'Social Media Marketing',
          'Lead Generation B2B',
          'Growth Hacking',
          'PPC Campaigns',
          'Content Marketing Strategy',
        ]}
        url="https://aefoniq.com/digitalmarketing"
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 to-[#16262e] px-6 xl:px-20 pt-24 pb-12">
        <div className="absolute inset-0 z-0 opacity-20 pattern-dots pattern-gray-800 pattern-size-4" />
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center lg:text-left"
          >
            <motion.h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-[#8ae6e2] to-[#28bdb7] bg-clip-text text-transparent">
              Data-Driven<br />
              <span className="bg-gradient-to-r from-[#28bdb7] to-[#1f9c96] bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              We fuse analytics mastery with creative execution to transform your digital presence and dominate your market.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <motion.button
                onClick={() => setShowContactForm(true)}
                whileHover={{ scale: 1.05 }}
                className="bg-[#28bdb7] hover:bg-[#1f9c96] text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 justify-center"
              >
                <ChartBarIcon className="w-6 h-6" />
                Start Your Growth Journey
              </motion.button>
            </div>
          </motion.div>

          {/* Animated orbit graphic */}
          <motion.div
            className="relative h-[500px] hidden lg:block"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64 bg-gradient-to-br from-[#28bdb7]/50 to-[#1f6d69]/50 rounded-full blur-xl opacity-50 animate-pulse" />
            </div>
            {[
              { icon: BeakerIcon,      label: 'A/B Testing',  color: '#28bdb7', angle: 0   },
              { icon: CommandLineIcon, label: 'Analytics',    color: '#1f9c96', angle: 60  },
              { icon: FilmIcon,        label: 'Video Ads',    color: '#28bdb7', angle: 120 },
              { icon: PaintBrushIcon,  label: 'Creative',     color: '#1f9c96', angle: 180 },
              { icon: CodeBracketIcon, label: 'Automation',   color: '#28bdb7', angle: 240 },
              { icon: CpuChipIcon,     label: 'AI Ops',       color: '#1f9c96', angle: 300 },
            ].map((service) => (
              <motion.div
                key={service.label}
                className="absolute top-1/2 left-1/2 -ml-[50px] -mt-[50px] w-[100px] h-[100px]"
                style={{ transform: `rotate(${service.angle}deg) translateX(200px) rotate(-${service.angle}deg)` }}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`p-3 rounded-full bg-gray-800 shadow-xl border border-[${service.color}]`}>
                    <service.icon className="w-6 h-6" style={{ color: service.color }} />
                  </div>
                  <span className="text-white text-xs font-medium whitespace-nowrap">{service.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEO SECTION: Strategic Digital Marketing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Strategic Digital Marketing</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Data-driven growth hacking and market dominance strategies designed to boost your ROI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Market Research',  desc: 'In-depth competitive analysis to identify opportunities and gaps.',                  icon: <FiSearch   className="w-6 h-6" /> },
              { title: 'SWOT & A/B Testing', desc: 'Scientific approach to optimizing campaigns for maximum conversion.',             icon: <FiTrendingUp className="w-6 h-6" /> },
              { title: 'Lead Generation', desc: 'High-quality B2B & B2C lead acquisition strategies.',                               icon: <FiTarget   className="w-6 h-6" /> },
              { title: 'Social Boosting', desc: 'Viral campaigns on Facebook, Instagram, LinkedIn, and TikTok.',                     icon: <FiUsers    className="w-6 h-6" /> },
              { title: 'Creative Design', desc: 'Eye-catching posters, banners, and logos that drive engagement.',                   icon: <FiLayout   className="w-6 h-6" /> },
              { title: 'Growth Strategy', desc: 'Long-term roadmaps for sustainable digital expansion.',                             icon: <FiActivity className="w-6 h-6" /> },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-[#34495e] transition-all group"
              >
                <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center mb-4 text-[#2c3e50] group-hover:bg-[#2c3e50] group-hover:text-white transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Intelligence Suite */}
      <section className="py-24 bg-gray-50 px-6 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-gray-900 via-[#28bdb7] to-[#1f9c96] bg-clip-text text-transparent">
            Marketing Intelligence Suite
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Analytics Mastery',   features: ['Google Analytics', 'Hotjar Tracking', 'Custom Dashboards'],  icon: ChartBarIcon, gradient: 'from-[#28bdb7] to-[#1f6d69]' },
              { title: 'Ad Campaigns',         features: ['Facebook/Instagram', 'Google Ads', 'Retargeting'],           icon: CameraIcon,   gradient: 'from-[#1f9c96] to-[#28bdb7]' },
              { title: 'Conversion Science',   features: ['A/B Testing', 'Funnel Optimization', 'AI Predictions'],      icon: BeakerIcon,   gradient: 'from-[#28bdb7] to-[#1f6d69]' },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                className="p-8 rounded-3xl bg-white border hover:shadow-2xl transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <div className={`mb-6 p-4 rounded-full bg-gradient-to-r ${service.gradient} w-fit`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <ul className="space-y-3 text-gray-600">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-3`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Industries We Scale</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {['E-Commerce & Retail', 'SaaS & Tech', 'Real Estate', 'Healthcare & Wellness'].map((industry, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 p-6 rounded-xl shadow-md text-center border-b-4 border-[#28bdb7]"
              >
                <p className="font-semibold text-gray-800">{industry}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── DIGITAL MARKETING PROJECTS SECTION ─────────────────────────── */}
      <section className="py-24 bg-gray-50 px-6 xl:px-20" id="portfolio">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-gray-900 via-[#28bdb7] to-[#1f9c96] bg-clip-text text-transparent">
            Digital Marketing Results
          </h2>
          <p className="text-lg text-gray-600 text-center mb-10">
            Explore our campaigns, social boosting results, and creative designs.
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
                      : 'bg-white text-gray-500 hover:text-gray-900 hover:shadow-sm border border-gray-200'
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
            <div className="text-center text-gray-500 py-10">No digital marketing projects found.</div>
          )}
        </motion.div>
      </section>

      {/* FAQ Section */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-10">Common Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: 'Do you offer SEO services?',          a: 'Yes, we provide comprehensive SEO audits, keyword research, and on-page/off-page optimization to improve your organic rankings.' },
              { q: 'Which social platforms do you manage?', a: 'We manage campaigns on Facebook, Instagram, LinkedIn, TikTok, and Twitter (X), tailoring content to each platform\'s audience.' },
              { q: 'What is A/B Testing?',                a: 'A/B testing involves running two versions of an ad or landing page to see which performs better, ensuring we maximize your ad spend.' },
              { q: 'How do you measure success?',         a: 'We focus on ROI, Conversion Rate, and Cost Per Lead (CPL). We provide detailed monthly reports on these metrics.' },
            ].map((faq, i) => (
              <motion.div key={i} whileHover={{ scale: 1.01 }} className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-lg text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center bg-gradient-to-r from-[#28bdb7] to-[#1f9c96] rounded-3xl p-12 shadow-2xl"
        >
          <h3 className="text-4xl font-bold text-white mb-6">Ready to Dominate Your Market?</h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let&apos;s build a data-driven strategy that turns clicks into loyal customers.
          </p>
          <button
            onClick={() => setShowContactForm(true)}
            className="bg-white text-[#28bdb7] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-[1.02] flex items-center gap-2 mx-auto"
          >
            Schedule Free Strategy Call
            <FiArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </section>
    </main>
  );
}