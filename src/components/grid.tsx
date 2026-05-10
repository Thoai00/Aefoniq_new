// --- components/ProjectGrid.tsx ---
'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProjectCard, { PublicProject } from './ProjectCard';
import ProjectGalleryModal from './ProjectModal';
import ProjectMediaViewer from './ProjectMediaViewer';

// --- Props (You would fetch this data) ---
interface ProjectGridProps {
  projects: PublicProject[];
}

// --- The Parent Component ---
const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  // State for the GALLERY modal
  const [galleryProject, setGalleryProject] = useState<PublicProject | null>(null);

  // State for the DIRECT-TO-VIEWER modal
  const [viewerState, setViewerState] = useState<{
    project: PublicProject;
    index: number;
  } | null>(null);

  /**
   * This is the main logic handler.
   * It decides which modal to open based on media count.
   */
  const handleProjectClick = (project: PublicProject) => {
    if (!project.mediaItems || project.mediaItems.length === 0) {
      console.log('No media to display for this project.');
      return;
    }

    if (project.mediaItems.length === 1) {
      // 1. SINGLE ITEM: Open the viewer directly
      setViewerState({ project, index: 0 });
      document.body.style.overflow = 'hidden';
    } else {
      // 2. MULTIPLE ITEMS: Open the gallery
      setGalleryProject(project);
      document.body.style.overflow = 'hidden';
    }
  };

  // --- Close Handlers ---
  const closeGallery = () => {
    setGalleryProject(null);
    document.body.style.overflow = 'unset';
  };

  const closeViewer = () => {
    setViewerState(null);
    document.body.style.overflow = 'unset';
  };

  // --- Navigation for the single viewer ---
  const navigateViewer = (direction: 'next' | 'prev') => {
    if (!viewerState) return;

    const { project, index } = viewerState;
    const total = project.mediaItems.length;
    let newIndex = index;

    if (direction === 'next') {
      newIndex = (index + 1) % total;
    } else {
      newIndex = (index - 1 + total) % total;
    }
    setViewerState({ project, index: newIndex });
  };

  return (
    <>
      {/* 1. The Grid of Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onClick={handleProjectClick} // Pass the magic handler
          />
        ))}
      </div>

      {/* 2. The Modals (Rendered conditionally) */}
      <AnimatePresence>
        {/* Renders the GALLERY modal */}
        {galleryProject && (
          <ProjectGalleryModal project={galleryProject} onClose={closeGallery} />
        )}

        {/* Renders the SINGLE viewer modal */}
        {viewerState && (
          <ProjectMediaViewer
            mediaItem={viewerState.project.mediaItems[viewerState.index]}
            projectTitle={viewerState.project.title}
            onClose={closeViewer}
            onNext={() => navigateViewer('next')}
            onPrev={() => navigateViewer('prev')}
            hasMultipleMedia={viewerState.project.mediaItems.length > 1}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectGrid;