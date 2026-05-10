'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Header from '../../components/Header';
import localFont from 'next/font/local';
import { FiChevronRight, FiFilm, FiBox, FiUser, FiMonitor, FiLayers, FiHome } from 'react-icons/fi';
import Image from 'next/image';

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
// To add more projects, duplicate any object in the array and
// update id, title, description, subCategory, and mediaUrl.
// ─────────────────────────────────────────────────────────────
const STATIC_PROJECTS: PublicProject[] = [
  {
    id: 1,
    title: 'French Fries Commercial',
    description: 'Cinematic 3D animation showcasing the crispy texture and golden color of our signature French fries.',
    category: '3D Animation',
    subCategory: 'product modeling',
    mediaItems: [
      {
        id: 1,
        mediaType: 'video',
        mediaUrl: 'https://www.youtube.com/shorts/lLTNAqcKVqQ', // ← replace
      },
    ],
  },
  {
    id: 2,
    title: 'Arcviz Interior',
    description: 'Photorealistic 3D interior visualization of a modern living room, highlighting natural lighting and material details.',
    category: '3D Animation',
    subCategory: 'architectural viz',
    mediaItems: [
      {
        id: 2,
        mediaType: 'video',
        mediaUrl: 'https://www.youtube.com/shorts/L9-6gCN98RQ', // ← replace
      },
    ],
  },
  {
    id: 3,
    title: 'Architectural Walkthrough',
    description: 'Photorealistic interior and exterior visualisation for a luxury villa project.',
    category: '3D Animation',
    subCategory: 'architectural viz',
    mediaItems: [
      {
        id: 3,
        mediaType: 'video',
        mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_3', // ← replace
      },
    ],
  },
  {
    id: 4,
    title: 'Environment Art Showcase',
    description: 'Immersive sci-fi environment built for virtual production with dynamic lighting.',
    category: '3D Animation',
    subCategory: 'environment art',
    mediaItems: [
      {
        id: 4,
        mediaType: 'video',
        mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_4', // ← replace
      },
    ],
  },
  {
    id: 5,
    title: 'Fluid Simulation Reel',
    description: 'Water, smoke, and cloth physics simulations for dynamic visual effects.',
    category: '3D Animation',
    subCategory: '3d simulation',
    mediaItems: [
      {
        id: 5,
        mediaType: 'video',
        mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_5', // ← replace
      },
    ],
  },
  {
    id: 6,
    title: 'Product Commercial',
    description: 'Cinematic 3D commercial highlighting every detail of a consumer electronics product.',
    category: '3D Animation',
    subCategory: 'product modeling',
    mediaItems: [
      {
        id: 6,
        mediaType: 'video',
        mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_6', // ← replace
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

const FloatingShape = () => (
  <motion.div
    animate={{ y: [-20, 0, -20] }}
    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }}
    className="absolute w-64 h-64 bg-gradient-to-r from-[#28bdb7] to-[#1f9c96] rounded-full mix-blend-multiply opacity-20 blur-2xl"
  />
);

export default function ThreeDAnimation() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const constraintsRef = useRef(null);

  // Static projects (no API call)
  const projects = STATIC_PROJECTS;
  const subCategories = useMemo(() => getSubCategories(projects), [projects]);

  // Filtering
  const [activeSubCategory, setActiveSubCategory] = useState('all');

  // Modal
  const [selectedProject, setSelectedProject] = useState<PublicProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Header scroll behaviour
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

  // Toolbox data
  const toolboxItems = [
    { name: 'Blender',    icon: '/Blender_logo_no_text.svg.png',          alt: 'Blender' },
    { name: 'Maya',       icon: '/Maya-Logo.png',                          alt: 'Autodesk Maya' },
    { name: 'SketchUp',   icon: '/SketchUp-logo.png',                      alt: 'SketchUp' },
    { name: 'ZBrush',     icon: '/Zbrush Logo.png',                        alt: 'ZBrush' },
    { name: 'Substance',  icon: '/png-transparent-substance-painter-hd-logo.png', alt: 'Substance Painter' },
    { name: 'Marvelous',  icon: '/Marvelous Designer.png',                 alt: 'Marvelous Designer' },
  ];

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#f0f2f4] overflow-x-hidden`}>
      <Header
        scrolled={scrolled}
        headerVisible={headerVisible}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setShowContactForm={setShowContactForm}
      />
      <SeoHead
        title="3D Animation, Modeling & Architectural Visualization | Aefoniq"
        description="Top-tier 3D Design Studio offering Character Design, Product Animation, Architectural Visualization, and Hyper-Realistic Rendering using Blender and Maya."
        keywords={[
          '3D Animation Services',
          '3D Modeling Studio',
          'Architectural Visualization',
          'Product Rendering',
          'Character Design',
          'Blender Experts',
          '3D Motion Graphics',
          'Virtual Production',
        ]}
        url="https://aefoniq.com/3danimation"
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
        {/* Hero Video Section */}
        <section className="relative w-full h-[50vh] sm:h-[70vh] md:h-[calc(100vh-68px)] overflow-hidden m-0 p-0">
          <div className="relative h-full w-full aspect-video">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/ant3.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src="/ant3.webm" type="video/webm" />
              <source src="/ant3.mp4"  type="video/mp4" />
            </video>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative h-screen px-6 xl:px-[200px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <FloatingShape />
            <motion.div
              animate={{ x: [-50, 50, -50] }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-[#1f9c96] to-[#28bdb7] rounded-full mix-blend-multiply opacity-10 blur-xl"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-4xl text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-[#28bdb7] to-[#1f9c96] bg-clip-text text-transparent">
              Dimension<span className="text-[#28bdb7]">.</span>Craft
            </h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Transforming ideas into{' '}
              <span className="font-semibold text-gray-800">animated realities</span> through
              <br />
              cutting-edge 3D visualization and motion storytelling.
            </motion.p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center bg-gray-900 text-white px-8 py-4 rounded-full cursor-pointer group"
              onClick={() => setShowContactForm(true)}
            >
              <span className="mr-2">Start Your Journey</span>
              <FiChevronRight className="transition-transform group-hover:translate-x-1" />
            </motion.div>
          </motion.div>
        </section>

        {/* SEO SECTION: 3D Design & Animation */}
        <section className="px-6 xl:px-[200px] py-20 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">3D Design & Animation</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Breathing life into concepts through high-fidelity modeling, texturing, and simulation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Character Design',   desc: 'Rigging and animating stylized or realistic characters for games and film.',         icon: <FiUser    className="w-6 h-6" /> },
              { title: 'Product Modeling',   desc: 'Hyper-realistic texturing and modeling for e-commerce and advertisements.',          icon: <FiBox     className="w-6 h-6" /> },
              { title: 'Architectural Viz',  desc: 'Photorealistic 3D renders of interiors and exteriors for real estate.',              icon: <FiHome    className="w-6 h-6" /> },
              { title: '3D Simulation',      desc: 'Fluid, smoke, and cloth physics simulations for dynamic visual effects.',            icon: <FiLayers  className="w-6 h-6" /> },
              { title: 'Product Ads',        desc: 'Cinematic 3D commercials that showcase product features elegantly.',                 icon: <FiMonitor className="w-6 h-6" /> },
              { title: 'Environment Art',    desc: 'Immersive world-building and level design for virtual experiences.',                 icon: <FiFilm    className="w-6 h-6" /> },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-[#9b59b6] transition-all group"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-[#8e44ad] group-hover:bg-[#8e44ad] group-hover:text-white transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Services Grid (Visual) */}
        <section className="px-6 xl:px-[200px] py-20 bg-[#f0f2f4]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { title: 'Product Animation', icon: <FiBox  className="text-current" />, color: '#28bdb7', desc: 'Bring products to life with dynamic animations that showcase every detail' },
              { title: 'Character Design',  icon: <FiUser className="text-current" />, color: '#1f9c96', desc: 'Create memorable characters with expressive animations and detailed rigging' },
              { title: 'Environment Art',   icon: <FiFilm className="text-current" />, color: '#2d7d78', desc: 'Build immersive environments that tell stories through motion and texture' },
            ].map((service) => (
              <motion.div
                key={service.title}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow"
                style={{ borderTop: `4px solid ${service.color}` }}
              >
                <div className="text-4xl mb-4" style={{ color: service.color }}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Interactive Tools Section */}
        <section className="px-6 xl:px-[200px] py-20 bg-white">
          <motion.div ref={constraintsRef} className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-gray-800">Our Toolbox</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {toolboxItems.map((tool) => (
                <motion.div
                  key={tool.name}
                  drag
                  dragConstraints={constraintsRef}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-6 bg-white rounded-xl shadow-md border border-gray-100 cursor-move flex flex-col items-center justify-center min-h-[120px]"
                >
                  <div className="relative w-16 h-16 mb-3 flex items-center justify-center">
                    <Image src={tool.icon} alt={tool.alt} width={64} height={64} className="object-contain" priority={false} />
                  </div>
                  <span className="font-medium text-gray-700 text-center">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Process Timeline */}
        <section className="px-6 xl:px-[200px] py-20 bg-[#f0f2f4]">
          <motion.div className="relative max-w-4xl mx-auto" initial="hidden" whileInView="visible">
            <div className="absolute left-5 h-full w-0.5 bg-gray-200" />
            {[
              { title: 'Concept & Storyboarding', desc: 'Transform ideas into visual blueprints' },
              { title: '3D Modeling',              desc: 'Create detailed 3D models with precision' },
              { title: 'Texturing & Lighting',     desc: 'Apply realistic textures and dynamic lighting' },
              { title: 'Animation & Rendering',    desc: 'Bring motion to life and final rendering' },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                className="flex items-center mb-16"
                variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="w-10 h-10 rounded-full bg-[#28bdb7] flex items-center justify-center text-white z-10 shrink-0">
                  {i + 1}
                </div>
                <div className="ml-8 flex-1">
                  <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ─── 3D ANIMATION PROJECTS SECTION ─────────────────────────────── */}
        <section className="px-6 xl:px-[200px] py-20 bg-white" id="portfolio">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900">
              3D Animation Portfolio
            </h2>
            <p className="text-lg md:text-xl text-gray-600 text-center mb-10">
              Explore our character animations, product reveals, and architectural visualizations.
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
              <div className="text-center text-gray-500">No 3D animation projects found.</div>
            )}
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-[#f0f2f4]">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="text-3xl font-bold text-gray-800 text-center mb-10">Common Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { q: 'What software do you use?',               a: 'We primarily use Blender, Autodesk Maya, and ZBrush for modeling, with Substance Painter for texturing.' },
                { q: 'Can you create assets for games?',        a: 'Yes, we create game-ready assets with optimized topology (low-poly) and baked texture maps.' },
                { q: 'Do you do Architectural Visualization?',  a: 'Absolutely. We turn blueprints into photorealistic 3D renders for real estate marketing.' },
                { q: 'How long does a 3D animation take?',      a: 'It depends on complexity. A 15-second product ad might take 2 weeks, while a character animation could take longer.' },
              ].map((faq, i) => (
                <motion.div key={i} whileHover={{ scale: 1.01 }} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">{faq.q}</h4>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}