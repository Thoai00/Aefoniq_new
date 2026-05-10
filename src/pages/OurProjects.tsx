'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ProjectCard, { PublicProject as Project } from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';

// ─────────────────────────────────────────────────────────────
// STATIC PROJECT DATA — one project per category.
// Replace each YouTube URL with your real video ID.
// To swap a project, just change the fields in that object.
// ─────────────────────────────────────────────────────────────
const STATIC_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Restaurant & Corporate Websites',
    description: 'Custom high-performance websites built with Next.js for restaurants, real estate, and corporate brands.',
    category: 'website development',
    subCategory: 'corporate',
    mediaItems: [
      {
        id: 1,
        mediaType: 'video',
        mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_1', // ← replace
      },
    ],
  },
  {
    id: 2,
    title: 'ERP & SaaS Platforms',
    description: 'Scalable cloud-native web applications and enterprise SaaS platforms with secure API integrations.',
    category: 'web application & app development',
    subCategory: 'saas platform',
    mediaItems: [
      {
        id: 2,
        mediaType: 'video',
        mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_2', // ← replace
      },
    ],
  },
  {
    id: 3,
    title: 'iOS & Android Apps',
    description: 'High-performance native and cross-platform mobile apps built with Swift, Kotlin, and React Native.',
    category: 'app development',
    subCategory: 'native mobile',
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
    title: 'Visual Effects Reel',
    description: 'Cinematic VFX compositing, motion graphics, and post-production work for film and commercial projects.',
    category: 'vfx',
    subCategory: 'compositing',
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
    title: 'Digital Marketing Campaign',
    description: 'Data-driven social media and PPC campaigns generating measurable ROI for e-commerce and SaaS brands.',
    category: 'digital marketing',
    subCategory: 'social media',
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
    title: 'Game Design Showcase',
    description: 'Immersive game environments, UI systems, and interactive mechanics designed for PC and mobile platforms.',
    category: 'game design',
    subCategory: 'environment design',
    mediaItems: [
      {
        id: 6,
        mediaType: 'video',
        mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_6', // ← replace
      },
    ],
  },
  {
    id: 7,
    title: '3D Animation Portfolio',
    description: 'Character animation, product visualisation, and architectural walkthroughs rendered in Blender and Maya.',
    category: '3d animation',
    subCategory: 'character design',
    mediaItems: [
      {
        id: 7,
        mediaType: 'video',
        mediaUrl: 'https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_7', // ← replace
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────

const OurProjects: React.FC = () => {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const handleSeeMore = () => {
    router.push('/ourwork');
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) closeProject();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedProject]);

  return (
    <section className="px-6 xl:px-[200px] py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 min-h-[80vh]">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-[#28bdb7]/20 shadow-lg mb-8">
            <div className="w-2 h-2 bg-[#28bdb7] rounded-full animate-pulse" />
            <span className="text-[#28bdb7] text-sm font-semibold tracking-wide">
              FEATURED WORK
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Our{' '}
            <span className="text-transparent bg-gradient-to-r from-[#28bdb7] to-cyan-600 bg-clip-text">
              Projects
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of innovative digital solutions across all categories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {STATIC_PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={openProject}
            />
          ))}
        </div>

        <div className="mt-20 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgb(40 189 183 / 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSeeMore}
            className="bg-gradient-to-r from-[#28bdb7] to-cyan-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-300 flex items-center gap-2 group"
          >
            See More Projects
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={closeProject}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default OurProjects;