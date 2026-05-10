"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Header from "../../components/Header"; // Adjust path as needed
import localFont from "next/font/local";
import { 
  FiMonitor, 
  FiSmartphone, 
  FiLayers, 
  FiBox, 
  FiCpu, 
  FiActivity, 
  FiCheckCircle, 
} from "react-icons/fi";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// --- TYPE DEFINITIONS ---
interface TeamMember {
  name: string;
  slug: string;
  role: string;
  color: string;
}

interface ServiceDetail {
  category: string;
  icon: JSX.Element;
  description: string;
  gradient: string;
  features: string[];
}

// --- DATA: TEAM ---
const teamMembers: TeamMember[] = [
  {
    name: "Efad Safi Islam",
    slug: "efad-safi-islam",
    role: "Director of Business, Marketing, and Management",
    color: "bg-gradient-to-br from-[#ff6b6b] to-[#ff8f8f]",
  },
  {
    name: "Ayon Mollah",
    slug: "ayon-mollah",
    role: "Director of Business and Operations",
    color: "bg-gradient-to-br from-[#1f9c96] to-[#28bdb7]",
  },
  {
    name: "Rafiqul Karim Nihal",
    slug: "rafiqul-karim-nihal",
    role: "Director of Business, Communication, and HR",
    color: "bg-gradient-to-br from-[#4a90e2] to-[#4a90e2]",
  },
  {
    name: "Thoai Chak",
    slug: "thoai-chak",
    role: "Director of Technology",
    color: "bg-gradient-to-br from-[#28bdb7] to-[#1f9c96]",
  },
  {
    name: "Misbah Uddin",
    slug: "misbah-uddin",
    role: "Director of Research and Design",
    color: "bg-gradient-to-br from-[#8e44ad] to-[#9b59b6]",
  },
];

// --- DATA: DETAILED SERVICES (SEO OPTIMIZED) ---
const serviceSectors: ServiceDetail[] = [
  {
    category: "Web Development & Design",
    icon: <FiMonitor className="w-8 h-8" />,
    gradient: "from-[#28bdb7] to-[#1f9c96]",
    description: "Crafting immersive digital footprints using next-gen technologies.",
    features: [
      "Dynamic & WordPress Website Development",
      "Advanced UI/UX Design Systems",
      "Three.js 3D Web Simulation & Interaction",
      "Progressive Web Apps (PWA)",
      "High-Performance Frontend Architecture"
    ]
  },
  {
    category: "Software & Mobile Ecosystems",
    icon: <FiSmartphone className="w-8 h-8" />,
    gradient: "from-[#3498db] to-[#2980b9]",
    description: "Enterprise-grade software securely engineered for scalability.",
    features: [
      "Secure ERP (Enterprise Resource Planning)",
      "Custom CRM Solutions",
      "Native iOS & Android App Development",
      "Cross-Platform Mobile Solutions",
      "Secure API Integration & Database Architecture"
    ]
  },
  {
    category: "VFX & Advanced Visuals",
    icon: <FiLayers className="w-8 h-8" />,
    gradient: "from-[#e74c3c] to-[#c0392b]",
    description: "Cinematic visual engineering for media and entertainment.",
    features: [
      "Object Replacement & Removing",
      "High-Fidelity Visual Manipulation",
      "Advanced VFX Compositing",
      "Motion Tracking & Rotoscoping",
      "Color Grading & Post-Production"
    ]
  },
  {
    category: "3D Design & Animation",
    icon: <FiBox className="w-8 h-8" />,
    gradient: "from-[#9b59b6] to-[#8e44ad]",
    description: "Breathing life into concepts through high-fidelity modeling.",
    features: [
      "3D Character & Environment Design",
      "Product Texturing, Modeling & Rigging",
      "Hyper-Realistic Product Advertisement",
      "3D Simulation & Physics",
      "Architectural Visualization"
    ]
  },
  {
    category: "Game Design & Development",
    icon: <FiCpu className="w-8 h-8" />,
    gradient: "from-[#f39c12] to-[#d35400]",
    description: "End-to-end game production from documentation to deployment.",
    features: [
      "Game Design Documentation (GDD)",
      "Level & Environment Design",
      "Gray Boxing & Prototyping",
      "Player Economy & Monetization Policy",
      "Unity & Unreal Engine Development"
    ]
  },
  {
    category: "Strategic Digital Marketing",
    icon: <FiActivity className="w-8 h-8" />,
    gradient: "from-[#34495e] to-[#2c3e50]",
    description: "Data-driven growth hacking and market dominance strategies.",
    features: [
      "Market Research & Competitive Analysis",
      "SWOT Analysis & A/B Testing",
      "B2B & B2C Lead Generation",
      "Social Boosting (Facebook, Instagram)",
      "Creative Design (Posters, Banners, Logos)"
    ]
  }
];

function shuffleArray(array: TeamMember[]): TeamMember[] {
  let currentIndex = array.length, randomIndex;
  const newArray = [...array];
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
  }
  return newArray;
}

export default function AboutUs() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [shuffledTeam, setShuffledTeam] = useState<TeamMember[]>([]);

  // --- HIDDEN SEO SCHEMA ---
  // "Number One" ranking signal is kept here for search engines
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aefoniq",
    "url": "https://aefoniq.com",
    "logo": "https://aefoniq.com/aefoniq-logo.png",
    "description": "Recognized as the number one IT company in Bangladesh for Web, VFX, and Game Design. Delivering Secure ERP, Three.js websites, and Digital Marketing globally.",
    "foundingDate": "2023",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+8801304625135",
      "contactType": "customer service",
      "areaServed": "Global"
    }
  };

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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setShuffledTeam(shuffleArray(teamMembers));
  }, []);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#f8f9fa] text-slate-900 font-sans overflow-x-hidden`}>
      {/* --- INJECT SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <title>About Aefoniq | Expert 3D Animation, Web Design & IT Solutions</title>
      <meta name="description" content="Aefoniq is a global leader in 3D Animation, Three.js Web Design, ERP Software, and VFX. We transform businesses with secure technology and creative innovation." />

      <Header
        scrolled={scrolled}
        headerVisible={headerVisible}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setShowContactForm={setShowContactForm}
      />

      {/* --- Contact Form Modal --- */}
      {showContactForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="relative bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl animate-scale-up">
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#28bdb7] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-3xl font-bold mb-6 text-slate-800">Get in Touch</h2>
            <div className="space-y-4">
              <a href="https://mail.google.com/mail/?view=cm&to=contact@aefoniq.com" target="_blank" rel="noreferrer" className="flex items-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200">
                <div className="bg-[#28bdb7] p-3 rounded-lg mr-4 text-white"><FiMonitor /></div>
                <div><h3 className="font-semibold">Email Us</h3><p className="text-sm text-gray-500">contact@aefoniq.com</p></div>
              </a>
              <a href="tel:+8801304625135" className="flex items-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200">
                <div className="bg-[#28bdb7] p-3 rounded-lg mr-4 text-white"><FiSmartphone /></div>
                <div><h3 className="font-semibold">Call Us</h3><p className="text-sm text-gray-500">(+88) 01304625135</p></div>
              </a>
            </div>
          </div>
        </div>
      )}

      <main className="pt-[68px]">
        {/* --- HERO SECTION --- */}
        <section className="relative min-h-[70vh] flex items-center justify-center bg-[#0f172a] overflow-hidden">
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-[#28bdb7] rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-[#9b59b6] rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#ff6b6b] rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-white tracking-tight leading-tight">
                Mastering the Art of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#28bdb7] via-[#4a90e2] to-[#9b59b6]">
                  3D Animation & Digital Tech
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                We bridge the gap between imagination and engineering. From hyper-realistic <span className="text-[#28bdb7] font-medium">3D Design</span> and immersive <span className="text-[#9b59b6] font-medium">Animations</span> to secure <span className="text-[#ff6b6b] font-medium">Web & Software Solutions</span>, we build the future you envision.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- CENTERS OF EXCELLENCE (Services) --- */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-[#28bdb7] font-semibold tracking-wider uppercase text-sm">Our Expertise</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-6">Centers of Excellence</h2>
              {/* FIX #1: Escaped "don't" to "don&apos;t" */}
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                We don&apos;t just offer services; we deliver specialized, high-performance solutions across six key technological domains.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceSectors.map((sector, idx) => (
                <motion.div
                  key={sector.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group relative bg-slate-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-transparent overflow-hidden"
                >
                  {/* Hover Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${sector.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Icon Header */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sector.gradient} flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    {sector.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-800 group-hover:to-slate-600 transition-colors">
                    {sector.category}
                  </h3>
                  
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    {sector.description}
                  </p>

                  {/* Detailed Feature List */}
                  <ul className="space-y-3">
                    {sector.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                        <FiCheckCircle className={`mt-1 shrink-0 text-transparent bg-clip-text bg-gradient-to-br ${sector.gradient}`} />
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- TEAM SECTION --- */}
        <section className="py-24 bg-[#f1f5f9] relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-[#28bdb7] font-semibold tracking-wider uppercase text-sm">Leadership</span>
                <h2 className="text-4xl font-bold text-slate-900 mt-2">The Minds Behind the Magic</h2>
                <p className="text-slate-600 mt-4 text-lg">
                  A convergence of strategic visionaries and technical masters, united to redefine the digital landscape.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {shuffledTeam.map((member, index) => (
                <motion.div
                  key={member.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                >
                  <div className={`h-2 w-full ${member.color}`} />
                  <div className="p-6 flex flex-col h-full justify-between">
                    <div>
                      <div className={`w-12 h-12 mb-4 rounded-xl ${member.color} flex items-center justify-center text-white text-xl font-bold shadow-md`}>
                        {member.name.charAt(0)}
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        {member.role}
                      </p>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <div className="flex gap-2">
                        <div className="h-1 w-8 rounded-full bg-slate-200 group-hover:bg-[#28bdb7] transition-colors" />
                        <div className="h-1 w-2 rounded-full bg-slate-200 group-hover:bg-[#28bdb7] transition-colors delay-75" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- GLOBAL PRESENCE BANNER --- */}
        <section className="py-20 bg-[#0f172a] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/world-map-dots.png')] opacity-10 bg-center bg-no-repeat bg-cover" />
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Scale Your Vision?</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              {/* FIX #2: Escaped "it's" to "it&apos;s" - This was the line 404 error */}
              Whether it&apos;s a 3D product animation for your launch or a secure ERP implementation for your enterprise, we have the expertise to deliver.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => setShowContactForm(true)}
                className="px-8 py-4 bg-gradient-to-r from-[#28bdb7] to-[#1f9c96] rounded-full font-bold hover:shadow-[0_0_20px_rgba(40,189,183,0.4)] transition-all duration-300"
              >
                Start a Project
              </button>
              <button className="px-8 py-4 bg-transparent border border-slate-700 rounded-full font-bold hover:bg-slate-800 transition-colors">
                View Case Studies
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}