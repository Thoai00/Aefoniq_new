'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiImage, FiPlay, FiArrowUpRight } from 'react-icons/fi';
import { getCardVideoEmbedInfo } from '../lib/utils'; 

// --- Types ---
export type PublicProject = {
  id: number;
  title: string;
  description: string;
  category?: string;
  subCategory?: string;
  mediaItems: {
    id: number;
    mediaType: 'image' | 'video';
    mediaUrl: string;
  }[];
};

interface ProjectCardProps {
  project: PublicProject;
  index: number;
  onClick: (project: PublicProject) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  const firstMedia = project.mediaItems?.[0];
  const category = project.category || 'Portfolio';
  const subCategory = project.subCategory || project.title;

  // --- Helper to Render Media ---
  const renderMedia = () => {
    if (!firstMedia) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100">
          <FiImage className="text-zinc-300 text-5xl" />
        </div>
      );
    }

    const embedInfo = getCardVideoEmbedInfo(firstMedia.mediaUrl);

    // 1. Iframe (YouTube/Vimeo)
    if (embedInfo && embedInfo.type === 'iframe') {
      return (
        <div className="absolute inset-0 bg-black">
          <iframe
            src={embedInfo.src}
            className="h-full w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-70 pointer-events-none"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            tabIndex={-1}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
              <FiPlay className="text-2xl text-white drop-shadow-md" />
            </div>
          </div>
        </div>
      );
    }

    // 2. Direct Image
    if (firstMedia.mediaType === 'image') {
      return (
        <div className="relative h-full w-full">
          <Image
            src={firstMedia.mediaUrl}
            alt={subCategory}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-50px' }}
      // UPDATED: Changed aspect-[4/5] to aspect-[3/2] for shorter height
      className="group relative aspect-[3/2] w-full cursor-pointer overflow-hidden rounded-[2rem] bg-zinc-900 shadow-xl"
      onClick={() => onClick(project)}
    >
      {/* 1. Media Layer */}
      <div className="absolute inset-0 h-full w-full">
        {renderMedia()}
      </div>

      {/* 2. Gradient Overlay (Stronger at bottom for text readability) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

      {/* 3. Content Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        
        {/* Category Badge (Top Right) */}
        <div className="absolute top-6 right-6">
          <div className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
            {category}
          </div>
        </div>

        {/* Text Details */}
        <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-1">
          <h3 className="text-xl font-bold text-white leading-tight md:text-2xl line-clamp-1">
            {subCategory}
          </h3>
          
          <div className="mt-2 flex items-center gap-2 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-xs font-medium text-zinc-300 uppercase tracking-wide">View Project</span>
            <FiArrowUpRight className="text-emerald-400 text-sm" />
          </div>
          
          {/* Decorative Line */}
          <div className="mt-3 h-[2px] w-0 bg-emerald-500 transition-all duration-700 ease-out group-hover:w-12" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;