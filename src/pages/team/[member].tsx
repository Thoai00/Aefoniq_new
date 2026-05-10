'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Image from 'next/image';
import { SimpleHeader } from '@/components/Header';

// Define TypeScript interfaces
interface Skill {
  name: string;
  percentage: number;
}

interface Project {
  title: string;
  description: string;
  fullDescription: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  aspectRatio?: number;
}

interface TeamMember {
  name: string;
  slug: string;
  role: string;
  color: string;
  bio: string;
  cvUrl: string;
  photo: string | null;
  links: { name: string; url: string }[];
  skills: Skill[];
  projects: Project[];
}

export default function TeamMemberPage() {
  const router = useRouter();
  const { member } = router.query;
  const [activeTab, setActiveTab] = useState<'projects' | 'skills'>('projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch team member data
  useEffect(() => {
    const fetchTeamMember = async () => {
      if (!member) return;
      
      try {
        setLoading(true);
        const response = await fetch(`/api/team/${member}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const data = await response.json();
        setTeamMember(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading team member');
        // eslint-disable-next-line no-console
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMember();
  }, [member]);

  // Handle project modal
  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md border border-gray-100">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-4 text-gray-800"
          >
            Error
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mb-6"
          >
            {error}
          </motion.p>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-medium text-white hover:opacity-90 transition-all shadow-md"
          >
            Back to Home
          </motion.button>
        </div>
      </div>
    );
  }

  if (!teamMember) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md border border-gray-100">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-4 text-gray-800"
          >
            Member not found
          </motion.h1>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-medium text-white hover:opacity-90 transition-all shadow-md"
          >
            Back to Home
          </motion.button>
        </div>
      </div>
    );
  }

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 } 
    }
  };

  // Removed unused slideUp variant to satisfy no-unused-vars

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardItem = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3 }
    }
  };

  const flipVariants = {
    hidden: { rotateY: 90, opacity: 0 },
    visible: { 
      rotateY: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    },
    exit: { 
      rotateY: -90, 
      opacity: 0,
      transition: { 
        duration: 0.4,
        ease: "easeIn" 
      } 
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <SimpleHeader />
      
      <main className="pt-20 md:pt-28 pb-16 px-4 max-w-6xl mx-auto">
        {/* Profile Header */}
        <section className="py-8 md:py-12 flex flex-col lg:flex-row items-center gap-8 md:gap-10">
          {/* Profile Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-2xl overflow-hidden border-4 md:border-8 border-white shadow-xl md:shadow-2xl"
          >
            {teamMember.photo ? (
              <Image
                src={teamMember.photo}
                alt={teamMember.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 288px, 288px"
              />
            ) : (
              <div 
                className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl sm:text-3xl font-bold"
              >
                {teamMember.name}
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-indigo-200"
              >
                {teamMember.role}
              </motion.div>
            </div>
          </motion.div>
          
          {/* Profile Info */}
          <div className="flex-1 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 max-w-2xl mx-auto lg:mx-0 mb-6 md:mb-8 text-base md:text-lg leading-relaxed"
            >
              {teamMember.bio}
            </motion.p>
            
            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4 mb-6 md:mb-8"
            >
              <motion.a 
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.3)"
                }}
                whileTap={{ scale: 0.97 }}
                href={teamMember.cvUrl}
                download
                className="px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-medium text-white hover:opacity-90 transition-all shadow-md flex items-center gap-2 text-sm md:text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download CV
              </motion.a>
              
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push('/aboutus')}
                className="px-5 py-2.5 md:px-6 md:py-3 bg-white rounded-xl font-medium text-gray-800 hover:bg-gray-50 transition-all border border-gray-200 shadow-sm flex items-center gap-2 text-sm md:text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                View All Team
              </motion.button>
            </motion.div>
            
            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3"
            >
              {teamMember.links.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ 
                    y: -3,
                    backgroundColor: '#f3f4f6',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                  className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl font-medium text-gray-700 bg-gray-100 transition-all flex items-center gap-1.5 md:gap-2 text-sm md:text-base"
                >
                  {/* Dynamic icon based on link name */}
                  {link.name.toLowerCase().includes('linkedin') && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  )}
                  {link.name.toLowerCase().includes('github') && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )}
                  {link.name.toLowerCase().includes('twitter') && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-[#1DA1F2]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  )}
                  {link.name.toLowerCase().includes('dribbble') && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-[#EA4C89]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.480-1.432-1.719-2.296-3.927-2.296-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z"/>
                    </svg>
                  )}
                  <span className="truncate max-w-[80px] sm:max-w-none">{link.name}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Tab Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center my-8 md:my-12"
        >
          <div className="relative bg-gray-100 rounded-xl p-1">
            <div className="flex gap-1 md:gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('projects')}
                className={`relative px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-all duration-300 text-sm md:text-base ${
                  activeTab === 'projects' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {activeTab === 'projects' && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-lg shadow-sm"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Projects</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('skills')}
                className={`relative px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-all duration-300 text-sm md:text-base ${
                  activeTab === 'skills' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {activeTab === 'skills' && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-lg shadow-sm"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Skills</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto"
            >
              {teamMember.projects.length > 0 ? (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
                >
                  {teamMember.projects.map((project, index) => (
                    <motion.div
                      key={index}
                      variants={cardItem}
                      whileHover="hover"
                      className="relative rounded-2xl overflow-hidden group"
                      style={{
                        aspectRatio: project.aspectRatio ? `${project.aspectRatio}` : '16/9'
                      }}
                    >
                      {/* Project Media */}
                      <div className="absolute inset-0 w-full h-full">
                        {project.mediaType === 'video' ? (
                          project.mediaUrl ? (
                            <div className="w-full h-full flex items-center justify-center bg-black">
                              <video 
                                className="w-full h-full object-cover"
                                muted
                                playsInline
                                preload="metadata"
                              >
                                <source src={project.mediaUrl} type="video/mp4" />
                              </video>
                            </div>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-500 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                          )
                        ) : project.mediaUrl ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={project.mediaUrl}
                              alt={project.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <span className="text-gray-500">Project Media</span>
                          </div>
                        )}
                      </div>

                      {/* Project Content */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-white transition-colors mb-3 md:mb-4">
                          {project.title}
                        </h3>
                        <p className="text-gray-200 mb-5 md:mb-6 line-clamp-2 group-hover:text-gray-100 transition-colors text-base md:text-lg">
                          {project.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => openProjectDetails(project)}
                            className="px-5 py-2.5 md:px-6 md:py-3 bg-white rounded-xl font-medium text-gray-900 hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 shadow-md text-base"
                          >
                            <span>View Details</span>
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.button>
                          <span className="text-xs md:text-sm font-medium px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-black/30 text-white">
                            {project.mediaType.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  className="text-center py-12 md:py-16 bg-white rounded-2xl border border-gray-200"
                >
                  <div className="mx-auto w-16 h-16 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-12 md:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 md:mb-2">No projects yet</h3>
                  <p className="text-gray-600 max-w-md mx-auto text-sm md:text-base">Projects will appear here once they&apos;re added to the portfolio</p>
                </motion.div>
              )}
            </motion.div>
          )}
          
          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto"
            >
              {teamMember.skills.length > 0 ? (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="bg-white rounded-2xl p-4 md:p-8 border border-gray-100 shadow-sm"
                >
                  <div className="grid grid-cols-1 gap-6 md:gap-8">
                    {teamMember.skills.map((skill, i) => (
                      <motion.div
                        key={i}
                        variants={cardItem}
                        className="space-y-2 md:space-y-4"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-800 text-sm md:text-base">{skill.name}</span>
                          <span className="text-base md:text-lg font-bold text-gray-700">{skill.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 md:h-3">
                          <motion.div 
                            className="h-2 md:h-3 rounded-full"
                            style={{ 
                              background: `linear-gradient(90deg, ${teamMember.color}, ${teamMember.color}80)`,
                              width: `${skill.percentage}%`
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.percentage}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  className="text-center py-12 md:py-16 bg-white rounded-2xl border border-gray-200"
                >
                  <div className="mx-auto w-16 h-16 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-12 md:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 md:mb-2">Skills coming soon</h3>
                  <p className="text-gray-600 max-w-md mx-auto text-sm md:text-base">Skill information will be displayed here once added</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-2 md:p-4"
            onClick={closeProjectDetails}
          >
            <motion.div
              variants={flipVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl max-h-[95vh] flex flex-col"
            >
              {/* Media Section */}
              <div className="relative w-full" style={{ aspectRatio: selectedProject.aspectRatio ? `${selectedProject.aspectRatio}` : '16/9' }}>
                {selectedProject.mediaType === 'video' ? (
                  selectedProject.mediaUrl ? (
                    <video 
                      controls 
                      className="w-full h-full object-contain"
                      autoPlay
                      muted
                      playsInline
                    >
                      <source src={selectedProject.mediaUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-500 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )
                ) : selectedProject.mediaUrl ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={selectedProject.mediaUrl}
                      alt={selectedProject.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 100vw"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-600">Project Image: {selectedProject.title}</span>
                  </div>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeProjectDetails}
                  className="absolute top-2 right-2 md:top-4 md:right-4 bg-white rounded-full p-1.5 md:p-2 hover:bg-gray-100 z-10 shadow-lg transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              
              {/* Content Section */}
              <div className="p-4 md:p-6 lg:p-8 overflow-y-auto flex-1">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4 md:mb-6"
                >
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                    {selectedProject.title}
                  </h2>
                  <span className="text-xs md:text-sm font-medium px-2 py-1 md:px-3 md:py-1.5 rounded-full bg-indigo-100 text-indigo-800 self-start sm:self-auto">
                    {selectedProject.mediaType.toUpperCase()}
                  </span>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-600 text-sm md:text-base lg:text-lg mb-6 md:mb-8 whitespace-pre-line"
                >
                  {selectedProject.fullDescription}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-end mt-4 md:mt-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeProjectDetails}
                    className="px-4 py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 bg-gradient-to-r from-gray-900 to-black rounded-xl font-medium text-white hover:opacity-90 transition-all text-sm md:text-base flex items-center gap-2 shadow-lg"
                  >
                    Close Project
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                    </svg>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="py-8 md:py-12 border-t border-gray-200 text-center"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
            Creative Collective
          </div>
          <div className="text-gray-600 max-w-2xl mx-auto mb-4 md:mb-6 text-base md:text-lg">
            Where innovation meets execution
          </div>
          <div className="text-gray-500 text-xs md:text-sm">
            © {new Date().getFullYear()} All rights reserved. Crafted with passion.
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
