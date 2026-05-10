'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import { FiX, FiCalendar, FiTag, FiLayers } from 'react-icons/fi';
import { getCardVideoEmbedInfo } from '../lib/utils';
import { PublicProject } from './ProjectCard';

interface ProjectModalProps {
  project: PublicProject;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const firstMedia = project.mediaItems?.[0];
  const embedInfo = firstMedia ? getCardVideoEmbedInfo(firstMedia.mediaUrl) : null;

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8">
      
      {/* 1. Backdrop (Click to close) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-all"
      />

      {/* 2. Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative flex h-full max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        
        {/* Close Button (Mobile: Top Right, Desktop: Hidden inside content) */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-black/70 md:hidden"
        >
          <FiX size={24} />
        </button>

        {/* --- LEFT SIDE: MEDIA --- */}
        <div className="relative h-[40vh] w-full bg-black md:h-full md:w-2/3 lg:w-3/4">
          {firstMedia ? (
            embedInfo?.type === 'iframe' ? (
              <iframe
                src={embedInfo.src}
                className="h-full w-full object-contain" // object-contain shows full video
                frameBorder="0"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            ) : embedInfo?.type === 'video' ? (
              <video
                src={embedInfo.src}
                controls
                autoPlay
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="relative h-full w-full">
                <Image
                  src={firstMedia.mediaUrl}
                  alt={project.title}
                  fill
                  className="object-contain bg-black/90" // object-contain prevents cropping
                  priority
                />
              </div>
            )
          ) : (
            <div className="flex h-full w-full items-center justify-center text-zinc-500">
              No Media Available
            </div>
          )}
        </div>

        {/* --- RIGHT SIDE: DETAILS --- */}
        <div className="flex h-full w-full flex-col overflow-y-auto bg-white p-6 md:w-1/3 md:p-10 lg:w-1/4">
          
          {/* Desktop Close Button */}
          <div className="mb-6 hidden flex-row-reverse md:flex">
            <button
              onClick={onClose}
              className="rounded-full bg-zinc-100 p-2 text-zinc-500 hover:bg-zinc-200 hover:text-black transition"
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="flex-1">
            {/* Category Tag */}
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-600">
                <FiLayers className="text-emerald-500" />
                {project.category || 'Showcase'}
              </span>
            </div>

            {/* Title */}
            <h2 className="mb-2 text-3xl font-bold leading-tight text-zinc-900">
              {project.subCategory || project.title}
            </h2>

            {/* Meta Info (Optional) */}
            <div className="mb-6 flex items-center gap-4 text-xs font-medium text-zinc-400">
              <div className="flex items-center gap-1">
                <FiTag /> <span>Project ID: #{project.id}</span>
              </div>
              <div className="h-1 w-1 rounded-full bg-zinc-300" />
              <div className="flex items-center gap-1">
                <FiCalendar /> <span>2024</span>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 h-px w-full bg-zinc-100" />

            {/* Description */}
            <div className="prose prose-sm prose-zinc text-zinc-600">
              <h4 className="text-sm font-bold uppercase text-zinc-900">About this project</h4>
              <p className="mt-2 leading-relaxed">
                {project.description || "This project showcases our commitment to quality and innovation. Explore the details to see how we bring ideas to life."}
              </p>
            </div>
          </div>

          {/* Call to Action (Footer) */}
          <div className="mt-8 pt-6">
            <button
                onClick={onClose} // Or link to a contact page
                className="w-full rounded-xl bg-zinc-900 py-4 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-black active:scale-[0.98]"
            >
                Close Project
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;