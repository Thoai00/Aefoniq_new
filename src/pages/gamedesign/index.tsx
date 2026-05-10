'use client';

import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { FiClock, FiCpu, FiLayers, FiBox, FiDollarSign, FiCode, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

// Imports
import ProjectCard, { PublicProject } from '../../components/ProjectCard';
import ProjectModal from '../../components/ProjectModal';
import ContactModal from '../../components/ContactModal';
import SeoHead from '../../components/SeoHead';

interface StatPanelProps {
  label: string;
  value: string | number;
  unit?: string;
  color: string;
}

// 1. Define Database Type
interface DatabaseProject {
  id: number;
  type: 'image' | 'youtube';
  url: string;
  description: string;
  category_name: string;
  sub_category_name: string | null;
}

export default function GameDevInterface() {
  const [activeTool, setActiveTool] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleTime, setScheduleTime] = useState('');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ----- Project Data State -----
  const [projects, setProjects] = useState<PublicProject[]>([]);
  const [loading, setLoading] = useState(true);
  
  // ----- Filtering State -----
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [activeSubCategory, setActiveSubCategory] = useState('all');

  // ----- Modal State -----
  const [selectedProject, setSelectedProject] = useState<PublicProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tools = useMemo(() => [
    {
      name: 'UNITY',
      icon: '/Unity-Symbol.png',
      color: '#00B4D8',
      specs: ['3D Physics', 'C# Scripting', 'AR Foundation', 'Shader Graph']
    },
    {
      name: 'UNREAL',
      icon: '/unreal.png',
      color: '#FF6B35',
      specs: ['Nanite', 'Lumen', 'Blueprints', 'MetaHuman']
    },
    {
      name: 'WEBGL',
      icon: '/WebGL_Logo.svg.png',
      color: '#8A2BE2',
      specs: ['Three.js', 'Babylon.js', 'PBR Rendering', 'Physics Engines']
    },
    {
      name: 'BLENDER',
      icon: '/Blender_logo_no_text.svg.png',
      color: '#F77F00',
      specs: ['Cycles', 'Geometry Nodes', 'Rigging', 'UV Unwrapping']
    },
  ], []);

  const gamingTech = [
    { name: 'C++', purpose: 'Game Engines', color: '#004482' },
    { name: 'C#', purpose: 'Unity Scripting', color: '#682876' },
    { name: 'Python', purpose: 'Tools Pipeline', color: '#3572A5' },
    { name: 'JavaScript', purpose: 'WebGL Games', color: '#F1E05A' },
    { name: 'HLSL', purpose: 'Shaders', color: '#A66EFF' },
    { name: 'Rust', purpose: 'High-Perf Systems', color: '#DEA584' },
  ];

  // Particle Animation Effect
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const particles = Array.from({ length: 500 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1,
      color: tools[activeTool].color
    }));

    const animateParticles = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > ctx.canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > ctx.canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    };

    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateParticles();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [activeTool, tools]);

  // Fetch Game Projects
  const fetchGameProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/public-projects', { cache: 'no-store' });
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      
      const data = await response.json();
      const rawProjects: DatabaseProject[] = data.projects || [];

      // 1. Filter for Game Design/Development
      const gameRaw = rawProjects.filter(p => 
        p.category_name?.toLowerCase().includes('game') || 
        p.category_name?.toLowerCase().includes('unity') ||
        p.category_name?.toLowerCase().includes('unreal')
      );

      // 2. Map to UI format
      const mappedProjects: PublicProject[] = gameRaw.map(p => ({
        id: p.id,
        title: p.sub_category_name || p.category_name || 'Game Project',
        description: p.description,
        category: p.category_name,
        subCategory: p.sub_category_name || '',
        mediaItems: [
          {
            id: p.id,
            mediaType: (p.type === 'youtube' ? 'video' : 'image') as 'video' | 'image',
            mediaUrl: p.url
          }
        ]
      }));

      // 3. Shuffle
      for (let i = mappedProjects.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mappedProjects[i], mappedProjects[j]] = [mappedProjects[j], mappedProjects[i]];
      }

      setProjects(mappedProjects);

      // 4. Extract Sub-Categories
      const uniqueSubCats = new Set<string>();
      mappedProjects.forEach(p => {
        if (p.subCategory) uniqueSubCats.add(p.subCategory.toLowerCase());
      });
      setSubCategories(['all', ...Array.from(uniqueSubCats)]);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGameProjects();
  }, [fetchGameProjects]);

  // Filter Logic
  const filteredProjects = useMemo(() => {
    if (activeSubCategory === 'all') return projects;
    return projects.filter(p => p.subCategory?.toLowerCase() === activeSubCategory);
  }, [projects, activeSubCategory]);

  // Modal Handlers
  const openProject = useCallback((project: PublicProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeProject = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
    document.body.style.overflow = 'unset';
  }, []);

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSchedule(false);
    setScheduleTime('');
  };

  const StatPanel = ({ label, value, unit, color }: StatPanelProps) => (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="p-2 sm:p-3 md:p-4 rounded-lg border border-white/10 backdrop-blur-sm"
      style={{ borderColor: color }}
    >
      <div className="text-xs md:text-sm text-white/80">{label}</div>
      <div className="flex items-baseline gap-1 md:gap-2 mt-1 md:mt-2">
        <div className="text-base md:text-xl font-bold" style={{ color }}>
          {value}
        </div>
        {unit && <span className="text-xs md:text-sm text-white/60">{unit}</span>}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden cursor-crosshair relative font-sans">
      {/* Background Canvas */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <canvas ref={canvasRef} className="absolute inset-0 opacity-30" />
      </div>
      <SeoHead 
        title="Game Design & Development Studio | Unity & Unreal Experts | Aefoniq"
        description="Full-cycle Game Development Studio. We specialize in Game Design Documentation (GDD), Level Design, Gray Boxing, Unity/Unreal Engineering, and Player Economy."
        keywords={[
          'Game Development Studio', 
          'Unity Developers', 
          'Unreal Engine Experts', 
          'Game Design Documentation', 
          'Level Design', 
          'Mobile Game Development', 
          'Game Economy Design',
          'Metaverse Development'
        ]}
        url="https://aefoniq.com/gamedesign"
      />

      {/* Project Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={closeProject}
          />
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactModal
            isOpen={showContactForm}
            onClose={() => setShowContactForm(false)}
        />
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col mx-auto w-full max-w-[1920px]">
        {/* Header */}
        <motion.header
          className="flex justify-between items-center p-4 md:p-6 lg:p-8 border-b border-white/10 sticky top-0 z-50 backdrop-blur-md"
          style={{
            background: useMotionTemplate`radial-gradient(300px at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.05), rgba(0,0,0,0.8))`
          }}
          onMouseMove={(e) => {
             mouseX.set(e.clientX);
             mouseY.set(e.clientY);
          }}
        >
          <Link
            href="/"
            className="text-lg sm:text-xl md:text-2xl font-bold glitch-text hover:text-[var(--accent)] transition-colors"
            style={{ '--accent': tools[activeTool].color } as React.CSSProperties}
          >
            Aefoniq <span className="text-xs align-top opacity-70">GAMES</span>
          </Link>
          <div className="flex gap-3 sm:gap-4 items-center">
            <button
              onClick={() => setShowSchedule(true)}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 md:px-4 md:py-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-xs sm:text-sm md:text-base border border-white/10"
            >
              <FiClock />
              <span className="hidden sm:inline">Set Schedule</span>
            </button>
          </div>
        </motion.header>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 p-4 md:p-6 lg:p-8 gap-4 md:gap-6 lg:gap-8">
          
          {/* 1. Tool Selector */}
          <div className="space-y-4 md:space-y-6 w-full max-w-none lg:max-w-[400px] mx-auto">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`p-3 sm:p-4 md:p-6 rounded-xl border-2 ${
                  activeTool === index ? 'border-[var(--tool-color)] bg-white/5' : 'border-white/10 bg-black/40'
                } backdrop-blur-sm cursor-pointer transition-colors`}
                style={{ '--tool-color': tool.color } as React.CSSProperties}
                onClick={() => setActiveTool(index)}
              >
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                    <Image src={tool.icon} alt={tool.name} width={40} height={40} className="object-contain"/>
                  </div>
                  <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-wider">{tool.name}</h2>
                </div>
                {activeTool === index && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 space-y-2 overflow-hidden">
                    {tool.specs.map((spec) => (
                      <div key={spec} className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--tool-color)]" />{spec}
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* 2. 3D Cube Animation */}
          <div className="relative col-span-1 lg:col-span-2 bg-black/50 rounded-xl overflow-hidden border border-white/10 min-h-[300px] lg:min-h-[400px]">
             <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
             <div className="relative h-full w-full flex items-center justify-center p-4">
                 <div className="cyber-cube w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px]">
                     {[...Array(6)].map((_, i) => (
                         <motion.div key={i} className="face border border-[var(--color)] bg-[var(--color)]/10" 
                           style={{ '--color': tools[activeTool].color } as React.CSSProperties}
                           animate={{ rotateX: [0, 360], rotateY: [0, 360] }} 
                           transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
                            <div className="content text-white font-mono font-bold">
                                {tools[activeTool].name}
                            </div>
                         </motion.div>
                     ))}
                 </div>
             </div>
          </div>

          {/* 3. NEW SEO SECTION: Game Design Features */}
          <div className="lg:col-span-3">
             <div className="p-6 md:p-8 rounded-xl border border-white/10 bg-gradient-to-r from-gray-900 to-black relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <FiCpu className="w-32 h-32" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#f39c12] to-[#d35400]">
                    End-to-End Game Production
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {[
                        { title: "Game Design Doc (GDD)", icon: <FiCode className="text-[#f39c12]" />, desc: "Blueprinting mechanics & lore." },
                        { title: "Level Design", icon: <FiLayers className="text-[#e67e22]" />, desc: "Immersive environment crafting." },
                        { title: "Gray Boxing", icon: <FiBox className="text-[#d35400]" />, desc: "Rapid prototyping & testing." },
                        { title: "Economy Design", icon: <FiDollarSign className="text-[#f1c40f]" />, desc: "Monetization & player loop." },
                        { title: "Engine Dev", icon: <FiCpu className="text-[#e74c3c]" />, desc: "Unity & Unreal programming." },
                    ].map((feature, i) => (
                        <motion.div 
                            key={i} 
                            whileHover={{ y: -5 }}
                            className="bg-white/5 p-4 rounded-lg border border-white/5 hover:border-[#f39c12]/50 transition-colors"
                        >
                            <div className="mb-3 text-2xl">{feature.icon}</div>
                            <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
                            <p className="text-xs text-gray-400">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
             </div>
          </div>

          {/* 4. Core Tech Stack */}
          <div className="lg:col-span-3 p-4 md:p-6 rounded-xl border border-white/10 bg-black/40">
             <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-white/20 rounded-full"></span>
                Core Technologies
             </h3>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                 {gamingTech.map((tech) => (
                     <motion.div key={tech.name} whileHover={{ scale: 1.05 }} className="p-3 rounded-lg border border-white/10 bg-white/5 text-center">
                         <div className="text-sm font-bold" style={{ color: tech.color }}>{tech.name}</div>
                         <div className="text-[10px] text-gray-400 mt-1">{tech.purpose}</div>
                     </motion.div>
                 ))}
             </div>
          </div>

          {/* 5. PROJECT GRID SECTION WITH FILTERS */}
          <div className="lg:col-span-3 p-4 md:p-8 rounded-xl border border-white/10 bg-[#0a0a0a]" id="portfolio">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Game Dev Portfolio</h2>
                <p className="text-gray-400">Explore our shipped titles, prototypes, and assets.</p>
            </div>

            {/* Sub-Category Filters */}
            {!loading && subCategories.length > 1 && (
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {subCategories.map((subCat) => (
                        <button
                            key={subCat}
                            onClick={() => setActiveSubCategory(subCat)}
                            className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all border ${
                                activeSubCategory === subCat
                                    ? `bg-[var(--accent)] text-black border-[var(--accent)] font-bold shadow-[0_0_15px_var(--accent)]`
                                    : 'bg-transparent text-gray-400 border-white/20 hover:border-white hover:text-white'
                            }`}
                            style={{ '--accent': tools[activeTool].color } as React.CSSProperties}
                        >
                            {subCat === 'all' ? 'All Systems' : subCat}
                        </button>
                    ))}
                </div>
            )}

            {/* Render Grid */}
            {loading ? (
              <div className="text-center text-white/50 py-20 font-mono">INITIALIZING ASSETS...</div>
            ) : filteredProjects.length > 0 ? (
               <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode='popLayout'>
                      {filteredProjects.map((project, index) => (
                          <motion.div
                              key={project.id}
                              layout
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.3 }}
                          >
                              {/* Override ProjectCard styles for Dark Mode if needed via CSS or passed props, 
                                  but standard ProjectCard usually adapts well */}
                              <ProjectCard project={project} index={index} onClick={openProject} />
                          </motion.div>
                      ))}
                  </AnimatePresence>
               </motion.div>
            ) : (
              <div className="text-center text-white/50 py-10 font-mono">
                [NO_DATA_FOUND] :: Check filters
              </div>
            )}
          </div>

          {/* 6. Industries / Genres (SEO) */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
             {['FPS & Shooters', 'RPG & Strategy', 'Hypercasual', 'Simulation & VR'].map((genre, i) => (
                 <div key={i} className="p-4 rounded-lg border border-white/10 bg-white/5 text-center hover:bg-white/10 transition-colors">
                     <span className="font-mono text-sm font-bold text-gray-300">{genre}</span>
                 </div>
             ))}
          </div>

          {/* 7. FAQ Section */}
          <div className="lg:col-span-3 p-6 md:p-8 rounded-xl border border-white/10 bg-black/40">
             <h3 className="text-xl font-bold mb-6 text-center">Development FAQ</h3>
             <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <h4 className="font-bold text-[var(--accent)]" style={{ color: tools[activeTool].color }}>Unity or Unreal?</h4>
                    <p className="text-sm text-gray-400">We advise based on scope. Unity is great for mobile/2D, while Unreal excels in high-fidelity 3D and consoles.</p>
                </div>
                <div className="space-y-2">
                    <h4 className="font-bold text-[var(--accent)]" style={{ color: tools[activeTool].color }}>Do you handle Multiplayer?</h4>
                    <p className="text-sm text-gray-400">Yes, we architect scalable backend servers (Photon, Mirror, AWS GameLift) for realtime multiplayer.</p>
                </div>
                <div className="space-y-2">
                    <h4 className="font-bold text-[var(--accent)]" style={{ color: tools[activeTool].color }}>What is Gray Boxing?</h4>
                    {/* FIXED LINE BELOW: Changed "It's" to "It&apos;s" */}
                    <p className="text-sm text-gray-400">It&apos;s creating a playable level with simple shapes to test gameplay flow before investing in expensive art.</p>
                </div>
                <div className="space-y-2">
                    <h4 className="font-bold text-[var(--accent)]" style={{ color: tools[activeTool].color }}>Platform Porting?</h4>
                    <p className="text-sm text-gray-400">We optimize and port games to PC, Mobile (iOS/Android), and WebGL browsers efficiently.</p>
                </div>
             </div>
          </div>

          {/* 8. Stats & CTA */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-black/50 p-6 rounded-xl border border-white/10">
                <h3 className="text-lg font-bold mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-2 gap-3">
                   <StatPanel label="FPS Target" value="60+" unit="Hz" color="#00FF88" />
                   <StatPanel label="Draw Calls" value="<200" unit="mobile" color="#00D9FF" />
                   <StatPanel label="Poly Count" value="Optimized" unit="LODs" color="#FF2A6D" />
                   <StatPanel label="Network" value="<50ms" unit="Ping" color="#FF9900" />
                </div>
             </div>
             <div className="bg-gradient-to-br from-white/10 to-transparent p-6 rounded-xl border border-white/10 flex flex-col justify-center items-center text-center">
                <h3 className="text-2xl font-bold mb-2">Ready to Start?</h3>
                <p className="text-gray-400 text-sm mb-6">From concept art to final build deployment.</p>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="bg-[var(--accent)] text-black px-8 py-3 rounded-lg font-bold hover:brightness-110 transition-all flex items-center gap-2"
                  style={{ backgroundColor: tools[activeTool].color }}
                >
                  Launch Project <FiArrowRight />
                </button>
             </div>
          </div>

        </div>

        {/* Schedule Modal */}
        {showSchedule && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
            <div className="bg-gray-900 p-6 rounded-xl border border-white/10 w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <form onSubmit={handleScheduleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold text-white">Initialize Session</h3>
                <div>
                  <label className="block mb-2 text-sm text-gray-400">Select Date & Time</label>
                  <input 
                    type="datetime-local" 
                    value={scheduleTime} 
                    onChange={(e) => setScheduleTime(e.target.value)} 
                    className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-sm text-white focus:border-[var(--accent)] outline-none" 
                    required 
                    style={{ colorScheme: 'dark', borderColor: tools[activeTool].color }}
                  />
                </div>
                <div className="flex gap-3 justify-end">
                  <button type="button" onClick={() => setShowSchedule(false)} className="px-4 py-2 rounded-lg hover:bg-white/10 text-sm">Abort</button>
                  <button type="submit" className="px-6 py-2 rounded-lg bg-[var(--accent)] text-black font-bold text-sm hover:brightness-110" style={{ backgroundColor: tools[activeTool].color }}>Confirm</button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </div>

      {/* Scanlines Overlay */}
      <div className="fixed inset-0 pointer-events-none scanlines z-20 opacity-30" />
      
      {/* Global CSS for Grid/Cube */}
      <style jsx global>{`
        .cyber-cube {
          transform-style: preserve-3d;
          position: relative;
        }
        .face {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          backface-visibility: visible;
          opacity: 0.8;
        }
        .face:nth-child(1) { transform: rotateY(0deg) translateZ(60px); }
        .face:nth-child(2) { transform: rotateY(90deg) translateZ(60px); }
        .face:nth-child(3) { transform: rotateY(180deg) translateZ(60px); }
        .face:nth-child(4) { transform: rotateY(-90deg) translateZ(60px); }
        .face:nth-child(5) { transform: rotateX(90deg) translateZ(60px); }
        .face:nth-child(6) { transform: rotateX(-90deg) translateZ(60px); }
        @media (min-width: 640px) {
           .face:nth-child(1) { transform: rotateY(0deg) translateZ(75px); }
           .face:nth-child(2) { transform: rotateY(90deg) translateZ(75px); }
           .face:nth-child(3) { transform: rotateY(180deg) translateZ(75px); }
           .face:nth-child(4) { transform: rotateY(-90deg) translateZ(75px); }
           .face:nth-child(5) { transform: rotateX(90deg) translateZ(75px); }
           .face:nth-child(6) { transform: rotateX(-90deg) translateZ(75px); }
        }
        @media (min-width: 768px) {
           .face:nth-child(1) { transform: rotateY(0deg) translateZ(100px); }
           .face:nth-child(2) { transform: rotateY(90deg) translateZ(100px); }
           .face:nth-child(3) { transform: rotateY(180deg) translateZ(100px); }
           .face:nth-child(4) { transform: rotateY(-90deg) translateZ(100px); }
           .face:nth-child(5) { transform: rotateX(90deg) translateZ(100px); }
           .face:nth-child(6) { transform: rotateX(-90deg) translateZ(100px); }
        }
        .scanlines {
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0),
            rgba(255,255,255,0) 50%,
            rgba(0,0,0,0.1) 50%,
            rgba(0,0,0,0.1)
          );
          background-size: 100% 4px;
        }
        .glitch-text:hover {
          animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
        }
        @keyframes glitch {
          0% { transform: translate(0) }
          20% { transform: translate(-2px, 2px) }
          40% { transform: translate(-2px, -2px) }
          60% { transform: translate(2px, 2px) }
          80% { transform: translate(2px, -2px) }
          100% { transform: translate(0) }
        }
      `}</style>
    </div>
  );
}