'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ProjectCard, { PublicProject as Project } from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';

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
        mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Use /embed/ for better compatibility
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
        mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
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
        mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
    ],
  }
];

const OurProjects: React.FC = () => {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Fix for hydration mismatch in Next.js
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeProject = () => {
    setSelectedProject(null);
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'unset';
    }
  };

  if (!isMounted) return null;

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
            <span className="text-[#28bdb7] text-sm font-semibold tracking-wide uppercase">
              Featured Work
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Our{' '}
            <span className="text-transparent bg-gradient-to-r from-[#28bdb7] to-cyan-600 bg-clip-text">
              Projects
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {STATIC_PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => openProject(project)}
            />
          ))}
        </div>

        <div className="mt-20 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/ourwork')}
            className="bg-gradient-to-r from-[#28bdb7] to-cyan-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg flex items-center gap-2"
          >
            See More Projects
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