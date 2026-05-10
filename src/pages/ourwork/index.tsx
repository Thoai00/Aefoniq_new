'use client';
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import ProjectCard, {
  PublicProject as Project,
} from '../../components/ProjectCard';
import ProjectModal from '../../components/ProjectModal';
import ContactModal from '../../components/ContactModal';

// ─────────────────────────────────────────────────────────────
// STATIC PROJECT DATA
// • Replace every REPLACE_VIDEO_ID_N with your YouTube video ID
// • To add more projects: duplicate any object, give it a unique
//   id, and set category + subCategory to match the filter lists
// • category must exactly match one value in ALL_CATEGORIES
// • subCategory is free-form — it becomes a sub-filter button
//   automatically when that category is active
// ─────────────────────────────────────────────────────────────
const STATIC_PROJECTS: Project[] = [
  // ── Website Development ──────────────────────────────────
  {
    id: 1,
    title: 'Restaurant Website',
    description: 'Full-featured restaurant site with online ordering, table reservations, and a digital QR menu.',
    category: 'website development',
    subCategory: 'restaurant & food',
    mediaItems: [{ id: 1, mediaType: 'video', mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_1' }],
  },
  {
    id: 2,
    title: 'Real Estate Portal',
    description: 'Property listing portal with advanced search filters, 360° virtual tours, and agent management.',
    category: 'website development',
    subCategory: 'real estate',
    mediaItems: [{ id: 2, mediaType: 'video', mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_2' }],
  },
  {
    id: 3,
    title: 'Corporate Website',
    description: 'High-performance Next.js corporate site with CMS integration, blog, and SEO-optimised pages.',
    category: 'website development',
    subCategory: 'corporate',
    mediaItems: [{ id: 3, mediaType: 'video', mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_3' }],
  },
  {
    id: 4,
    title: 'E-Commerce Store',
    description: 'Custom e-commerce platform with cart, payment gateway integration, and inventory management.',
    category: 'website development',
    subCategory: 'e-commerce',
    mediaItems: [{ id: 4, mediaType: 'video', mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_4' }],
  },

  // ── Web Application & App Development ────────────────────
  {
    id: 5,
    title: 'Custom ERP System',
    description: 'End-to-end enterprise resource planning platform with real-time dashboards and role-based access.',
    category: 'web application & app development',
    subCategory: 'erp & crm',
    mediaItems: [{ id: 5, mediaType: 'video', mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_5' }],
  },
  {
    id: 6,
    title: 'SaaS Dashboard',
    description: 'Scalable cloud-native SaaS platform with multi-tenant architecture and subscription billing.',
    category: 'web application & app development',
    subCategory: 'saas platform',
    mediaItems: [{ id: 6, mediaType: 'video', mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_6' }],
  },

  // ── App Development ───────────────────────────────────────
  {
    id: 7,
    title: 'iOS Fitness App',
    description: 'High-performance native iOS app built with Swift for workout tracking and real-time health metrics.',
    category: 'app development',
    subCategory: 'native mobile',
    mediaItems: [{ id: 7, mediaType: 'video', mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_7' }],
  },
  {
    id: 8,
    title: 'Cross-Platform Delivery App',
    description: 'React Native delivery app on iOS & Android with live GPS tracking and push notifications.',
    category: 'app development',
    subCategory: 'cross-platform',
    mediaItems: [{ id: 8, mediaType: 'video', mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_8' }],
  },

  // ── VFX ───────────────────────────────────────────────────
  {
    id: 9,
    title: 'Cinematic VFX Reel',
    description: 'VFX compositing, motion graphics, and post-production work for film and commercial projects.',
    category: 'vfx',
    subCategory: 'compositing',
    mediaItems: [{ id: 9, mediaType: 'video', mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_9' }],
  },
  {
    id: 10,
    title: 'Motion Graphics Showreel',
    description: 'Dynamic motion graphics and title sequences for broadcast and digital campaigns.',
    category: 'vfx',
    subCategory: 'motion graphics',
    mediaItems: [{ id: 10, mediaType: 'video', mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_10' }],
  },

  // ── Digital Marketing ─────────────────────────────────────
  {
    id: 11,
    title: 'Facebook Ads Funnel',
    description: 'High-converting Facebook & Instagram ad funnel for an e-commerce brand achieving 4× ROAS.',
    category: 'digital marketing',
    subCategory: 'social media',
    mediaItems: [{ id: 11, mediaType: 'video', mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_11' }],
  },
  {
    id: 12,
    title: 'SEO Growth Campaign',
    description: 'Full-funnel SEO strategy that tripled organic traffic for a SaaS brand in 90 days.',
    category: 'digital marketing',
    subCategory: 'seo',
    mediaItems: [{ id: 12, mediaType: 'video', mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_12' }],
  },

  // ── Game Design ───────────────────────────────────────────
  {
    id: 13,
    title: 'Environment Design',
    description: 'Immersive sci-fi game environment with dynamic lighting and modular level design assets.',
    category: 'game design',
    subCategory: 'environment design',
    mediaItems: [{ id: 13, mediaType: 'video', mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_13' }],
  },
  {
    id: 14,
    title: 'Game UI System',
    description: 'Complete HUD and menu system designed for a mobile RPG with accessibility in mind.',
    category: 'game design',
    subCategory: 'ui design',
    mediaItems: [{ id: 14, mediaType: 'video', mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_14' }],
  },

  // ── 3D Animation ──────────────────────────────────────────
  {
    id: 15,
    title: 'Character Animation Reel',
    description: 'Character rigging and animation showcase built in Blender and Maya for games and film.',
    category: '3d animation',
    subCategory: 'character design',
    mediaItems: [{ id: 15, mediaType: 'video', mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_15' }],
  },
  {
    id: 16,
    title: 'Architectural Walkthrough',
    description: 'Photorealistic interior and exterior visualisation for a luxury villa real estate project.',
    category: '3d animation',
    subCategory: 'architectural viz',
    mediaItems: [{ id: 16, mediaType: 'video', mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_16' }],
  },
  {
    id: 17,
    title: 'Product Visualisation',
    description: 'Hyper-realistic product rendering and cinematic reveal animation for a consumer brand.',
    category: '3d animation',
    subCategory: 'product modeling',
    mediaItems: [{ id: 17, mediaType: 'video', mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_17' }],
  },
];

// ─────────────────────────────────────────────────────────────

const ALL_CATEGORIES = [
  'all',
  'website development',
  'web application & app development',
  'app development',
  'vfx',
  'digital marketing',
  'game design',
  '3d animation',
];

// SimpleHeader component
interface SimpleHeaderProps {
  bgWhite: boolean;
}
export function SimpleHeader({ bgWhite }: SimpleHeaderProps) {
  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ${
        bgWhite ? 'bg-[#f0f2f4]' : 'bg-transparent'
      }
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
                className={`w-24 sm:w-32 hover:opacity-80 transition-opacity ${
                  bgWhite ? '' : 'brightness-0 invert'
                }`}
              />
            </motion.div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function OurWorkPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [headerWhite, setHeaderWhite] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const heroSectionRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSubCategory, setActiveSubCategory] = useState('all');
  const [subCategories, setSubCategories] = useState<string[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Modal handlers
  const openProject = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeProject = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
    document.body.style.overflow = 'unset';
  }, []);

  // Filter change — updates URL params
  const handleFilterChange = useCallback(
    (type: 'category' | 'subCategory', value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const lower = value.toLowerCase();

      if (type === 'category') {
        if (lower === 'all') {
          params.delete('category');
          params.delete('subCategory');
        } else {
          params.set('category', lower);
          params.delete('subCategory');
        }
        setActiveFilter(lower);
        setActiveSubCategory('all');
      }
      if (type === 'subCategory') {
        if (lower === 'all') {
          params.delete('subCategory');
        } else {
          params.set('subCategory', lower);
        }
        setActiveSubCategory(lower);
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Sync filter state from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    const subCategory = searchParams.get('subCategory');

    if (category && ALL_CATEGORIES.includes(category.toLowerCase())) {
      setActiveFilter(category.toLowerCase());
    } else {
      setActiveFilter('all');
    }

    if (subCategory) {
      setActiveSubCategory(subCategory.toLowerCase());
    } else {
      setActiveSubCategory('all');
    }
  }, [searchParams]);

  // Derive sub-categories from static data whenever the active filter changes
  useEffect(() => {
    if (activeFilter === 'all') {
      setSubCategories([]);
      return;
    }

    const relevant = STATIC_PROJECTS.filter(
      (p) => p.category?.toLowerCase() === activeFilter
    );
    const unique = new Set<string>();
    relevant.forEach((p) => {
      if (p.subCategory) unique.add(p.subCategory.toLowerCase());
    });
    setSubCategories(['all', ...Array.from(unique)]);

    const currentSub = searchParams.get('subCategory')?.toLowerCase();
    if (currentSub && !Array.from(unique).includes(currentSub) && currentSub !== 'all') {
      setActiveSubCategory('all');
      const params = new URLSearchParams(searchParams.toString());
      params.delete('subCategory');
      router.push(`?${params.toString()}`, { scroll: false });
    }
  }, [activeFilter, searchParams, router]);

  // Filter projects from static data
  const filteredProjects = useMemo(() => {
    return STATIC_PROJECTS.filter((project) => {
      const projectCat = project.category?.toLowerCase();
      const categoryMatch =
        activeFilter === 'all' ||
        projectCat === activeFilter ||
        (activeFilter === 'web app' && projectCat?.includes('web application'));
      const subCategoryMatch =
        activeFilter === 'all' ||
        activeSubCategory === 'all' ||
        project.subCategory?.toLowerCase() === activeSubCategory;
      return categoryMatch && subCategoryMatch;
    });
  }, [activeFilter, activeSubCategory]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeProject();
        setShowContactForm(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeProject]);

  // Header background toggle on scroll past hero
  useEffect(() => {
    const handleScroll = () => {
      if (heroSectionRef.current) {
        const heroBottom = heroSectionRef.current.getBoundingClientRect().bottom;
        setHeaderWhite(heroBottom <= 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
      <SimpleHeader bgWhite={headerWhite} />

      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeProject} />
        )}
        {showContactForm && (
          <ContactModal isOpen={showContactForm} onClose={() => setShowContactForm(false)} />
        )}
      </AnimatePresence>

      {/* Hero */}
      <section ref={heroSectionRef} className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="relative h-full w-full aspect-video">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/work.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/work.webm" type="video/webm" />
            <source src="/work.mp4"  type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        <div className="relative z-20 flex items-center justify-center h-full text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Our{' '}
              <span className="text-transparent bg-gradient-to-r from-[#28bdb7] to-cyan-400 bg-clip-text">
                Work
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Crafting digital experiences that inspire and transform
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-[#28bdb7]/10 to-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-[#28bdb7]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-[#28bdb7]/20 shadow-lg mb-8">
              <div className="w-2 h-2 bg-[#28bdb7] rounded-full animate-pulse" />
              <span className="text-[#28bdb7] text-sm font-semibold">PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Digital{' '}
              <span className="text-transparent bg-gradient-to-r from-[#28bdb7] to-cyan-600 bg-clip-text">
                Excellence
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each project tells a story of innovation, precision, and transformative digital experiences.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Showing {filteredProjects.length} of {STATIC_PROJECTS.length} projects
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {ALL_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange('category', category)}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                  activeFilter === category
                    ? 'bg-gradient-to-r from-[#28bdb7] to-cyan-600 text-white shadow-lg shadow-[#28bdb7]/25'
                    : 'bg-white/80 text-gray-600 hover:text-[#28bdb7] hover:bg-white hover:shadow-lg border border-gray-200'
                }`}
              >
                {category === 'vfx'
                  ? 'VFX'
                  : category === 'all'
                  ? 'All'
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Sub-Category Filter */}
          {activeFilter !== 'all' && subCategories.length > 1 && (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {subCategories.map((subCategory) => (
                <button
                  key={subCategory}
                  onClick={() => handleFilterChange('subCategory', subCategory)}
                  className={`px-4 py-2 rounded-full font-medium text-xs transition-all duration-300 whitespace-nowrap capitalize ${
                    activeSubCategory === subCategory
                      ? 'bg-gray-700 text-white shadow-md'
                      : 'bg-white/70 text-gray-500 hover:text-gray-900 hover:bg-white hover:shadow-sm border border-gray-200'
                  }`}
                >
                  {subCategory}
                </button>
              ))}
            </motion.div>
          )}

          {/* Project Grid */}
          {filteredProjects.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center py-12"
            >
              <h3 className="mt-2 text-lg font-medium text-gray-900">No Projects Found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your category or sub-category filters.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-50 to-cyan-50/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Ready to Start Your{' '}
              <span className="text-transparent bg-gradient-to-r from-[#28bdb7] to-cyan-600 bg-clip-text">
                Project
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let&apos;s create something amazing together. We&apos;re excited to hear about your ideas and help bring them to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => setShowContactForm(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#28bdb7] to-cyan-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-[#28bdb7]/25 transition-all duration-300"
              >
                Start Your Project
              </motion.button>
              <Link href="/aboutus">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#28bdb7] text-[#28bdb7] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#28bdb7] hover:text-white transition-all duration-300"
                >
                  Learn About Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}