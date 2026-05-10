// --- components/ProjectMediaViewer.tsx ---
'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiX, FiImage } from 'react-icons/fi';
import { PublicProject } from './ProjectCard';
// 1. Import the MODAL helper function
import { getModalVideoEmbedInfo } from '../lib/utils'; // Make sure path is correct

// --- Type Definitions ---
type MediaItem = PublicProject['mediaItems'][0];

// --- Component Props ---
interface ProjectMediaViewerProps {
  mediaItem: MediaItem;
  projectTitle: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasMultipleMedia: boolean;
}

// --- The Component ---
const ProjectMediaViewer: React.FC<ProjectMediaViewerProps> = ({
  mediaItem,
  projectTitle,
  onClose,
  onNext,
  onPrev,
  hasMultipleMedia,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (hasMultipleMedia) {
        if (e.key === 'ArrowLeft') onPrev();
        if (e.key === 'ArrowRight') onNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, hasMultipleMedia]);

  const renderMedia = () => {
    if (!mediaItem) {
      return (
        <div className="w-full h-full bg-black flex items-center justify-center">
          <FiImage className="text-gray-500 text-4xl" />
        </div>
      );
    }

    // 2. Use the 'getModalVideoEmbedInfo' for the popup
    const embedInfo = getModalVideoEmbedInfo(mediaItem.mediaUrl);

    // 1. iFrame (YouTube / Vimeo)
    if (embedInfo && embedInfo.type === 'iframe') {
      return (
        <iframe
          key={mediaItem.id} // Add key
          src={embedInfo.src} // This src has controls=1 and mute=0
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
        ></iframe>
      );
    }

    // 2. Direct Video (.mp4 / .webm)
    if (embedInfo && embedInfo.type === 'video') {
      return (
        <video
          key={mediaItem.id} // Add key
          src={embedInfo.src}
          controls
          autoPlay
          playsInline
          className="w-full h-full object-contain"
        />
      );
    }

    // 3. Image
    if (mediaItem.mediaType === 'image') {
      const imageUrl = mediaItem.mediaUrl;
      return (
        <div className="relative w-full h-full">
          <Image
            key={mediaItem.id} // Add key
            src={imageUrl}
            alt={projectTitle || 'Project Image'}
            fill
            className="object-contain" // object-contain is correct for viewer
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>
      );
    }

    // Fallback
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <FiImage className="text-gray-500 text-4xl" />
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[102] w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group hover:bg-white"
        aria-label="Close project"
      >
        <FiX className="w-6 h-6 text-white group-hover:text-black transition-colors" />
      </button>

      {/* Navigation Buttons */}
      {hasMultipleMedia && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-[101] w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group hover:bg-white"
            aria-label="Previous"
          >
            <span className="text-2xl text-white group-hover:text-black transition-colors">&#10094;</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-[101] w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group hover:bg-white"
            aria-label="Next"
          >
             <span className="text-2xl text-white group-hover:text-black transition-colors">&#10095;</span>
          </button>
        </>
      )}

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative bg-black max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl rounded-2xl"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {/* 3. CRITICAL FIX: The aspect-video container.
            This ensures your videos (and images) show in a 16:9 box,
            preventing the "show like the other image" layout issue.
        */}
        <div className="w-full aspect-video bg-black">{renderMedia()}</div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectMediaViewer;