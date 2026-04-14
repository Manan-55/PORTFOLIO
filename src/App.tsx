/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform 
} from 'motion/react';
import { 
  ArrowUpRight, 
  Menu, 
  Check, 
  Home, 
  Grid, 
  User, 
  Mail,
  Linkedin,
  Github,
  Instagram
} from 'lucide-react';

// --- Types ---

type Screen = 'portfolio' | 'contact' | 'success';

// --- Components ---

const WarliSun = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-white" strokeWidth="1">
    <circle cx="50" cy="50" r="15" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <line
        key={angle}
        x1="50"
        y1="50"
        x2={50 + 30 * Math.cos((angle * Math.PI) / 180)}
        y2={50 + 30 * Math.sin((angle * Math.PI) / 180)}
        strokeDasharray="2 2"
      />
    ))}
  </svg>
);

const WarliFigure = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-white" strokeWidth="1.5">
    {/* Head */}
    <circle cx="50" cy="20" r="8" />
    {/* Body (Two triangles) */}
    <path d="M50 30 L35 55 L65 55 Z" />
    <path d="M50 80 L35 55 L65 55 Z" />
    {/* Arms */}
    <path d="M50 42 L30 35" />
    <path d="M50 42 L70 35" />
    {/* Legs */}
    <path d="M42 80 L35 95" />
    <path d="M58 80 L65 95" />
  </svg>
);

const WarliAnimal = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-white" strokeWidth="1">
    {/* Body */}
    <path d="M30 60 L50 40 L70 60 Z" />
    <path d="M70 60 L90 40 L110 60 Z" className="hidden" /> {/* Just one triangle body for simplicity */}
    <path d="M70 60 L50 80 L30 60 Z" />
    {/* Head */}
    <circle cx="20" cy="45" r="6" />
    {/* Legs */}
    <path d="M35 75 L30 90" />
    <path d="M45 75 L45 90" />
    <path d="M55 75 L55 90" />
    <path d="M65 75 L70 90" />
    {/* Tail */}
    <path d="M70 60 L85 50" />
  </svg>
);

const GlobalBackground = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 5000], [0, -500]);
  const y2 = useTransform(scrollY, [0, 5000], [0, -300]);
  const y3 = useTransform(scrollY, [0, 5000], [0, -700]);
  const y4 = useTransform(scrollY, [0, 5000], [0, -400]);

  return (
    <div className="fixed inset-0 -z-10 bg-[#1A0005] pointer-events-none overflow-hidden">
      {/* Film Grain Texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
      
      {/* Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#2D0006_0%,_transparent_70%)] opacity-60" />
      
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.01] rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.01] rounded-full blur-[120px]" />
      
      {/* Warli Motifs */}
      <motion.div style={{ y: y1 }} className="absolute top-[15%] left-[10%] w-24 h-24 opacity-[0.03]">
        <WarliSun />
      </motion.div>
      
      <motion.div style={{ y: y2 }} className="absolute top-[40%] right-[15%] w-32 h-32 opacity-[0.03]">
        <WarliFigure />
      </motion.div>
      
      <motion.div style={{ y: y3 }} className="absolute top-[70%] left-[20%] w-20 h-20 opacity-[0.03]">
        <WarliAnimal />
      </motion.div>

      <motion.div style={{ y: y4 }} className="absolute top-[85%] right-[25%] w-24 h-24 opacity-[0.03]">
        <WarliFigure />
      </motion.div>
    </div>
  );
};

const TarpaDance = () => {
  const figures = Array.from({ length: 12 });
  return (
    <div className="relative w-64 h-64 animate-spin-slow">
      {figures.map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 flex items-center justify-center animate-pulse-soft"
          style={{ 
            transform: `rotate(${i * (360 / figures.length)}deg) translateY(-80px)`,
            animationDelay: `${i * 0.1}s`
          }}
        >
          <div className="w-8 h-8">
            <WarliFigure />
          </div>
        </div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-12 h-12">
          <WarliSun />
        </div>
      </div>
    </div>
  );
};

const LoadingScreen = ({ onComplete }: { onComplete: () => void; key?: string }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const increment = () => {
      setCounter((prev) => {
        if (prev >= 100) return 100;
        
        const next = prev + 1;
        let delay = 30; // Fast initial speed (0-70)

        if (prev >= 70 && prev < 90) {
          delay = 100; // Slower mid-range (70-90)
        } else if (prev >= 90 && prev < 100) {
          delay = 200; // Very slow near end (90-100)
        }

        timeoutId = setTimeout(increment, delay);
        return next;
      });
    };

    timeoutId = setTimeout(increment, 30);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (counter === 100) {
      // Final verification pause at 100 before fading out
      const timer = setTimeout(() => {
        onComplete();
      }, 1000); 
      return () => clearTimeout(timer);
    }
  }, [counter, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-[#1A0005] flex flex-col items-center justify-center z-[10000] overflow-hidden"
      initial={{ opacity: 1, scale: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.1,
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
      }}
    >
      <div className="relative mb-12">
        <TarpaDance />
      </div>
      
      <div className="text-white font-headline text-6xl tracking-tighter opacity-80">
        {counter.toString().padStart(2, '0')}
      </div>
    </motion.div>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('.cursor-pointer') ||
        target.closest('.bracket-expand')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
      animate={{
        x: position.x - 12,
        y: position.y - 12,
        scale: isHovering ? 3.5 : 1,
        backgroundColor: '#FFFFFF',
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.5 }}
    >
      <div className="absolute inset-0 rounded-full blur-[4px] shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
      {isHovering && (
        <div className="absolute inset-0 rounded-full opacity-40" />
      )}
    </motion.div>
  );
};

const MenuOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useLayoutEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, {
        y: 0,
        duration: 0.5,
        ease: 'power3.inOut',
      });
      gsap.fromTo(
        linksRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3,
        }
      );
    } else {
      gsap.to(overlayRef.current, {
        y: '-100%',
        duration: 0.5,
        ease: 'power3.inOut',
      });
    }
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: any) => {
    e.preventDefault();
    onClose();
    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems = [
    { label: 'ABOUT', id: 'about' },
    { label: 'PROJECTS', id: 'projects' },
    { label: 'SKILLS', id: 'expertise' },
    { label: 'CONTACT', id: 'contact' },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const link = linksRef.current[index];
    if (!link) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = link.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    gsap.to(link, { x, y, duration: 0.4, ease: 'power2.out' });
  };

  const handleMouseLeave = (index: number) => {
    const link = linksRef.current[index];
    if (link) {
      gsap.to(link, { x: 0, y: 0, duration: 0.6, ease: 'power3.out' });
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-[#1A0005] z-[100] flex flex-col items-center justify-center -translate-y-full"
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-8 md:right-12 text-white text-sm tracking-[0.3em] font-light hover:opacity-50 transition-opacity"
      >
        [ CLOSE ]
      </button>
      <div className="flex flex-col items-center gap-8 md:gap-12 relative">
        {menuItems.map((item, i) => (
          <a
            key={item.label}
            ref={(el) => (linksRef.current[i] = el)}
            href={`#${item.id}`}
            onClick={(e) => handleLinkClick(e, item)}
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={() => handleMouseLeave(i)}
            className="text-white text-5xl md:text-8xl font-headline tracking-tight relative group inline-block"
          >
            {item.label}
          </a>
        ))}
      </div>
      <div className="absolute bottom-12 flex gap-8 text-white/40 text-[10px] tracking-[0.4em] font-light">
        <a href="https://www.linkedin.com/in/manan-prajapati-bb4757319" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LINKEDIN</a>
        <a href="https://github.com/Manan-55" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GITHUB</a>
        <a href="https://instagram.com/mananprajapati" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">INSTAGRAM</a>
      </div>
    </div>
  );
};

const Navbar = ({ onMenuOpen }: { onMenuOpen: () => void }) => {
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  const bgColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(26, 0, 5, 0)", "rgba(26, 0, 5, 0.8)"]
  );

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.nav 
      style={{ backgroundColor: bgColor }}
      className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-6 md:px-12 py-6 backdrop-blur-[12px] transition-colors duration-300 border-b border-white/5"
    >
      <a 
        href="#" 
        onClick={scrollToTop}
        className="text-4xl font-normal text-on-background font-logo cursor-pointer hover:opacity-70 transition-opacity"
      >
        || मनन ||
      </a>
      <div className="hidden md:flex gap-12">
        {['ABOUT', 'PROJECTS', 'SKILLS', 'CONTACT'].map((item) => {
          const id = item === 'ABOUT' ? 'about' : item === 'SKILLS' ? 'expertise' : item.toLowerCase();
          return (
            <a
              key={item}
              href={`#${id}`}
              className="text-on-background/60 text-[11px] font-light tracking-[0.3em] hover:text-on-background transition-colors duration-500 relative group uppercase"
            >
              {item}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-on-background transition-all duration-500 group-hover:w-full" />
            </a>
          );
        })}
      </div>
      <button 
        onClick={onMenuOpen}
        className="flex items-center gap-4 group"
      >
        <span className="hidden md:block text-[10px] tracking-[0.4em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">MENU</span>
        <div className="flex flex-col gap-1.5">
          <div className="w-8 h-[1px] bg-on-background" />
          <div className="w-8 h-[1px] bg-on-background" />
        </div>
      </button>
      
      {/* Separator Line */}
      <motion.div 
        style={{ opacity: borderOpacity }}
        className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10"
      />
    </motion.nav>
  );
};

const ProjectCard = ({ 
  number, 
  type, 
  tech, 
  title, 
  description, 
  buttons,
  isLive
}: { 
  number: string, 
  type: string, 
  tech: string, 
  title: string, 
  description: string, 
  buttons: { label: string, icon?: React.ReactNode, href?: string }[],
  isLive?: boolean
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [10, 0, 0, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.95]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={containerRef} className="min-h-screen w-full flex flex-col justify-center px-6 md:px-12 py-24 relative border-t border-white/5 snap-start overflow-hidden bg-background">
      {/* Background Stroke Number */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <motion.span 
          style={{ y: yParallax }}
          className="text-[45vw] font-headline leading-none opacity-[0.05] text-transparent uppercase whitespace-nowrap"
          // @ts-ignore
          style={{ ...{ WebkitTextStroke: '1px white' }, y: yParallax }}
        >
          {number.split(' | ')[0]}
        </motion.span>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        <motion.div
          style={{ opacity, scale, filter: `blur(${blur}px)` }}
          className="flex flex-col items-start"
        >
          <div className="flex items-center gap-6 mb-8">
            <span className="text-[11px] tracking-[0.6em] font-medium text-on-background/40 uppercase">
              {type}
            </span>
            <div className="w-12 h-[1px] bg-white/10" />
          </div>
          
          <h2 className="text-[8vw] md:text-[9vw] font-headline text-on-background leading-[0.8] tracking-tighter uppercase mb-16 flex items-center gap-6 flex-wrap">
            {title}
            {isLive && (
              <span className="flex items-center gap-2 text-[10px] tracking-[0.4em] text-[#00FF00] font-mono border border-[#00FF00]/30 px-4 py-1.5 rounded-full bg-[#00FF00]/5 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-[#00FF00] rounded-full animate-pulse shadow-[0_0_8px_#00FF00]" />
                LIVE
              </span>
            )}
          </h2>

          <div className="w-full relative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 w-full items-start mb-12 md:mb-20">
              <div className="md:col-span-8 lg:col-span-7">
                <p className="text-xl md:text-2xl font-light leading-relaxed opacity-60 mb-10 max-w-2xl">
                  {description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {tech.split(' • ').map((t) => (
                    <span key={t} className="text-[10px] tracking-[0.3em] font-medium uppercase px-4 py-1.5 border border-white/10 rounded-full opacity-40 hover:opacity-100 transition-opacity duration-500">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Buttons: Absolute positioned to align with the gap */}
            <div className="hidden md:flex absolute right-0 bottom-[25%] flex-col items-end gap-4 z-30">
              {buttons.map((btn, idx) => (
                <a 
                  key={idx}
                  href={btn.href || "#"} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bracket-expand inline-flex items-center gap-4 px-10 py-5 border border-transparent hover:bg-white/5 transition-all duration-500 group w-fit"
                >
                  <span className="bracket-left transition-transform font-light text-2xl">[</span>
                  <span className="text-[14px] tracking-[0.4em] font-medium uppercase">{btn.label}</span>
                  {btn.icon || <ArrowUpRight size={24} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                  <span className="bracket-right transition-transform font-light text-2xl">]</span>
                </a>
              ))}
            </div>

            {/* Mobile Buttons: Standard flow */}
            <div className="flex md:hidden flex-col items-start gap-4 pt-8 border-t border-white/5">
              {buttons.map((btn, idx) => (
                <a 
                  key={idx}
                  href={btn.href || "#"} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bracket-expand inline-flex items-center gap-4 px-6 py-4 border border-transparent hover:bg-white/5 transition-all duration-500 group w-fit"
                >
                  <span className="bracket-left transition-transform font-light text-xl">[</span>
                  <span className="text-[12px] tracking-[0.4em] font-medium uppercase">{btn.label}</span>
                  {btn.icon || <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                  <span className="bracket-right transition-transform font-light text-xl">]</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ExpertiseSection = () => {
  const categories = [
    {
      title: "Machine Learning",
      skills: ["NLP", "Computer Vision", "PyTorch", "TensorFlow", "XGBoost", "Scikit-learn", "Deep Learning", "SHAP"]
    },
    {
      title: "Data Engineering",
      skills: ["Apache Spark", "SQL", "Airflow", "Pandas", "NumPy", "Data Pipelines", "ETL Processes", "FastAPI"]
    },
    {
      title: "Tools & DevOps",
      skills: ["Docker", "AWS", "Git", "GitHub", "Streamlit", "Flask", "VS Code", "Jupyter"]
    }
  ];

  return (
    <section id="expertise" className="w-full min-h-screen py-32 pb-[120px] border-t border-white/5 bg-[#1A0005] scroll-mt-[90px]">
      <div className="px-6 md:px-12 mb-20">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] tracking-[0.4em] uppercase mb-4"
        >
          WHAT I KNOW
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-headline text-6xl md:text-8xl tracking-tight uppercase"
        >
          SKILLS
        </motion.h2>
      </div>

      <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
        {categories.map((cat, idx) => (
          <motion.div 
            key={cat.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + idx * 0.1, duration: 0.8 }}
            className="flex flex-col"
          >
            <h3 className="text-white font-headline text-2xl font-bold mb-8 tracking-tight border-b border-white/10 pb-4">
              {cat.title}
            </h3>
            <div className="flex flex-wrap gap-3">
              {cat.skills.map((skill, sIdx) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + sIdx * 0.05 }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)"
                  }}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[12px] tracking-wider font-medium text-white/80 backdrop-blur-sm transition-all duration-300 cursor-default"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ContactForm = ({ onCancel, onSuccess }: { onCancel: () => void; onSuccess: () => void }) => {
  return (
    <div className="relative min-h-screen text-on-background flex flex-col items-center justify-center bg-[#1A0005] px-6 py-20">
      <GlobalBackground />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl relative z-10"
      >
        <button 
          onClick={onCancel}
          className="absolute -top-16 left-0 text-white/40 text-[10px] tracking-[0.4em] uppercase hover:text-white transition-colors cursor-pointer"
        >
          [ ESCAPE ]
        </button>
        
        <h2 className="text-4xl md:text-6xl font-headline mb-12 tracking-tight uppercase text-center">
          Inquiry
        </h2>
        
        <form 
          onSubmit={(e) => { e.preventDefault(); onSuccess(); }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-4">
            <label className="font-headline text-xs tracking-widest opacity-40 uppercase">[ NAME ]</label>
            <input 
              required
              type="text" 
              className="bg-transparent border border-white/10 px-6 py-4 focus:border-white/40 outline-none transition-colors font-light"
              placeholder="Your Name"
            />
          </div>
          
          <div className="flex flex-col gap-4">
            <label className="font-headline text-xs tracking-widest opacity-40 uppercase">[ EMAIL ]</label>
            <input 
              required
              type="email" 
              className="bg-transparent border border-white/10 px-6 py-4 focus:border-white/40 outline-none transition-colors font-light"
              placeholder="your@email.com"
            />
          </div>
          
          <div className="flex flex-col gap-4">
            <label className="font-headline text-xs tracking-widest opacity-40 uppercase">[ MESSAGE ]</label>
            <textarea 
              required
              rows={5}
              className="bg-transparent border border-white/10 px-6 py-4 focus:border-white/40 outline-none transition-colors font-light resize-none"
              placeholder="Tell me about your project..."
            />
          </div>
          
          <button 
            type="submit"
            className="mt-8 group flex items-center justify-center gap-4 px-12 py-6 border border-white hover:bg-[#800000] transition-all duration-500 cursor-pointer"
          >
            <span className="text-lg md:text-xl tracking-[0.4em] font-medium uppercase">
              SEND MESSAGE
            </span>
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const KachniSeparator = () => (
  <div 
    className="w-full h-[20px] opacity-50"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='20' viewBox='0 0 60 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%234A0E15' stroke-width='0.5' fill='none'%3E%3Cpath d='M0 20 L15 0 L30 20 L45 0 L60 20'/%3E%3Cpath d='M3 20 L15 4 L27 20'/%3E%3Cpath d='M6 20 L15 8 L24 20'/%3E%3Cpath d='M9 20 L15 12 L21 20'/%3E%3Cpath d='M33 20 L45 4 L57 20'/%3E%3Cpath d='M36 20 L45 8 L54 20'/%3E%3Cpath d='M39 20 L45 12 L51 20'/%3E%3C/g%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat-x',
      backgroundSize: 'auto 20px'
    }}
  />
);

const WarliIllustration = () => {
  const [hoveredNode, setHoveredNode] = useState<{x: number, y: number} | null>(null);
  
  // Neural Nodes (Decision Tree endpoints)
  const nodes = [
    { x: 120, y: 350 }, { x: 230, y: 350 },
    { x: 100, y: 360 }, { x: 250, y: 360 },
    { x: 100, y: 270 }, { x: 250, y: 270 },
    { x: 80, y: 290 }, { x: 270, y: 290 },
    { x: 130, y: 200 }, { x: 220, y: 200 },
    { x: 155, y: 150 }, { x: 195, y: 150 }
  ];

  return (
    <div 
      className="w-full md:w-[350px] h-[500px] flex-shrink-0 opacity-60 hover:opacity-90 transition-opacity duration-1000 hidden lg:block relative group/warli"
      onMouseLeave={() => setHoveredNode(null)}
    >
      <svg 
        viewBox="0 0 350 500" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Sun/Moon */}
        <circle cx="60" cy="60" r="18" stroke="#8B4558" strokeWidth="1.5" />
        <g stroke="#8B4558" strokeWidth="1.5">
          <path d="M60 35 L60 25" />
          <path d="M60 85 L60 95" />
          <path d="M35 60 L25 60" />
          <path d="M85 60 L95 60" />
          <path d="M42 42 L35 35" />
          <path d="M78 78 L85 85" />
          <path d="M42 78 L35 85" />
          <path d="M78 42 L85 35" />
        </g>

        {/* Central Tree - Geometric/Tribal style */}
        <path d="M175 480 L175 180" stroke="#8B4558" strokeWidth="1.5" strokeLinecap="round" />
        <g stroke="#8B4558" strokeWidth="1.5" strokeLinecap="round">
          {/* Branch Level 1 */}
          <path d="M175 400 L120 350" />
          <path d="M175 400 L230 350" />
          <path d="M120 350 L100 360" />
          <path d="M230 350 L250 360" />
          
          {/* Branch Level 2 */}
          <path d="M175 330 L100 270" />
          <path d="M175 330 L250 270" />
          <path d="M100 270 L80 290" />
          <path d="M250 270 L270 290" />

          {/* Branch Level 3 */}
          <path d="M175 260 L130 200" />
          <path d="M175 260 L220 200" />
          
          {/* Top */}
          <path d="M175 180 L155 150" />
          <path d="M175 180 L195 150" />
        </g>

        {/* Neural Nodes - The 'Intelligence' Layer */}
        {nodes.map((node, i) => (
          <circle 
            key={i}
            cx={node.x} 
            cy={node.y} 
            r="3" 
            fill="transparent"
            stroke="#8B4558" 
            strokeWidth="1.5"
            className="cursor-pointer transition-all duration-300 hover:fill-[#D3968C] hover:stroke-[#D3968C] hover:scale-150"
            onMouseEnter={() => setHoveredNode(node)}
          />
        ))}
        
        {/* Human Figures - Warli Style (Triangular) */}
        <g transform="translate(100, 440)">
          <circle cx="0" cy="-45" r="7" stroke="#8B4558" strokeWidth="1.5" />
          <path d="M-12 -35 L12 -15 L-12 -15 L12 -35 Z" stroke="#8B4558" strokeWidth="1.5" /> {/* Body */}
          <path d="M0 -15 L-12 10 M0 -15 L12 10" stroke="#8B4558" strokeWidth="1.5" /> {/* Legs */}
          <path d="M0 -30 L-20 -45 M0 -30 L20 -45" stroke="#8B4558" strokeWidth="1.5" /> {/* Arms */}
        </g>

        <g transform="translate(250, 460)">
          <circle cx="0" cy="-45" r="7" stroke="#8B4558" strokeWidth="1.5" />
          <path d="M-12 -35 L12 -15 L-12 -15 L12 -35 Z" stroke="#8B4558" strokeWidth="1.5" />
          <path d="M0 -15 L-10 10 M0 -15 L10 10" stroke="#8B4558" strokeWidth="1.5" />
          <path d="M0 -30 L-25 -25 M0 -30 L25 -25" stroke="#8B4558" strokeWidth="1.5" />
        </g>

        {/* Deer - Geometric */}
        <g transform="translate(280, 480)">
          <path d="M0 0 L25 0 L30 -12 L5 -12 Z" stroke="#8B4558" strokeWidth="1.5" /> {/* Body */}
          <path d="M5 0 L5 12 M20 0 L20 12" stroke="#8B4558" strokeWidth="1.5" /> {/* Legs */}
          <path d="M30 -12 L38 -25" stroke="#8B4558" strokeWidth="1.5" /> {/* Neck */}
          <circle cx="41" cy="-28" r="4" stroke="#8B4558" strokeWidth="1.5" /> {/* Head */}
          <path d="M41 -32 L35 -42 M41 -32 L47 -42" stroke="#8B4558" strokeWidth="1.5" /> {/* Antlers */}
        </g>

        {/* Birds */}
        <g stroke="#8B4558" strokeWidth="1.5">
          <path d="M80 150 Q95 135 110 150 Q125 135 140 150" />
          <path d="M220 100 Q235 85 250 100 Q265 85 280 100" />
          <path d="M50 200 Q60 190 70 200 Q80 190 90 200" />
        </g>

        {/* Background Geometric Accents */}
        <g stroke="#8B4558" strokeWidth="1" opacity="0.4">
          {/* Distant Mountains/Huts */}
          <path d="M20 450 L40 420 L60 450 Z" />
          <path d="M300 420 L320 390 L340 420 Z" />
          
          {/* Small Pattern Dots */}
          <circle cx="100" cy="100" r="1" fill="#8B4558" />
          <circle cx="280" cy="150" r="1" fill="#8B4558" />
          <circle cx="40" cy="300" r="1" fill="#8B4558" />
          <circle cx="310" cy="250" r="1" fill="#8B4558" />
          
          {/* Tiny Distant Figures */}
          <g transform="translate(40, 150) scale(0.4)">
            <circle cx="0" cy="-45" r="7" stroke="#8B4558" strokeWidth="2" />
            <path d="M-12 -35 L12 -15 L-12 -15 L12 -35 Z" stroke="#8B4558" strokeWidth="2" />
          </g>
          <g transform="translate(300, 80) scale(0.3)">
            <circle cx="0" cy="-45" r="7" stroke="#8B4558" strokeWidth="2" />
            <path d="M-12 -35 L12 -15 L-12 -15 L12 -35 Z" stroke="#8B4558" strokeWidth="2" />
          </g>
        </g>

        {/* Interactive Neural Glow */}
        {hoveredNode && (
          <motion.circle
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.8, scale: 1 }}
            cx={hoveredNode.x}
            cy={hoveredNode.y}
            r="12"
            fill="#D3968C"
            className="blur-md pointer-events-none"
          />
        )}
      </svg>
    </div>
  );
};

const Footer = ({ time }: { time: string }) => {
  return (
    <footer className="relative w-full bg-[#1A0005] overflow-hidden">
      <KachniSeparator />
      
      {/* Warli Art Panel - Shifted Right & Layered */}
      <div className="absolute left-[calc(35%-300px)] top-40 z-0 pointer-events-auto hidden xl:block">
        <WarliIllustration />
      </div>

      <div className="pt-40 relative z-10">
        {/* Symmetrical Split Header */}
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col md:flex-row justify-between items-center md:items-start gap-12 mb-12">
          {/* Left: Socials */}
          <div className="flex flex-col gap-8 text-center md:text-left relative">
            {/* Backdrop blur for readability over art */}
            <div className="absolute inset-[-20px] bg-[#1A0005]/40 backdrop-blur-[2px] rounded-xl -z-10" />
            <div className="flex flex-col gap-3">
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-mono font-medium">[ CONNECT ]</p>
              <div className="flex flex-col gap-2">
                <a href="https://www.linkedin.com/in/manan-prajapati-bb4757319" target="_blank" rel="noopener noreferrer" className="text-sm text-white hover:text-white/70 transition-colors tracking-wide">Linkedin</a>
                <a href="https://github.com/Manan-55" target="_blank" rel="noopener noreferrer" className="text-sm text-white hover:text-white/70 transition-colors tracking-wide">Github</a>
                <a href="https://instagram.com/mananprajapati" target="_blank" rel="noopener noreferrer" className="text-sm text-white hover:text-white/70 transition-colors tracking-wide">Instagram</a>
              </div>
            </div>
          </div>

          {/* Right: Location, Time, Email */}
          <div className="flex flex-col gap-8 text-center md:text-right">
            <div className="flex flex-col gap-3">
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-mono font-medium">[ LOCATION ]</p>
              <p className="text-sm text-white tracking-wide">Anand, Gujarat, India</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-mono font-medium">[ TIME ]</p>
              <p className="text-[11px] text-white/40 font-mono tracking-tighter">IST — {time}</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-mono font-medium">[ INQUIRIES ]</p>
              <a href="mailto:mananprajapati82@gmail.com" className="text-sm text-white hover:text-white/70 transition-colors underline underline-offset-8 decoration-white/20 hover:decoration-white/60 tracking-wide">
                mananprajapati82@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Giant Typography Section - Aligned to Right */}
        <div className="relative w-full flex justify-end items-end select-none pointer-events-none translate-y-[5%] px-8 md:px-16">
          {/* Base Outline Layer (Visible on top half) */}
          <h2 
            className="font-barrio leading-[0.75] uppercase tracking-[-0.04em] text-right w-full"
            style={{
              fontSize: 'clamp(8rem, 18vw, 22rem)',
              WebkitTextStroke: '1px #D3968C',
              color: 'transparent',
              position: 'relative',
            }}
          >
            MANAN
          </h2>

          {/* Bharni Pattern Layer (Clipped to bottom half) */}
          <h2 
            className="font-barrio leading-[0.75] uppercase tracking-[-0.04em] absolute bottom-0 text-right w-full"
            style={{
              fontSize: 'clamp(8rem, 18vw, 22rem)',
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l20 20M0 5l15 15M5 0l15 15M0 10l10 10M10 0l10 10M0 15l5 5M15 0l5 5' stroke='%23D3968C' stroke-opacity='0.4' stroke-width='0.3' fill='none'/%3E%3Cpath d='M2 2l2 0l-1 2z M16 16l2 0l-1 2z' fill='%23D3968C' fill-opacity='0.4'/%3E%3Ccircle cx='10' cy='10' r='0.8' fill='%23D3968C' fill-opacity='0.4'/%3E%3Ccircle cx='5' cy='5' r='0.5' fill='%23D3968C' fill-opacity='0.4'/%3E%3Ccircle cx='15' cy='15' r='0.5' fill='%23D3968C' fill-opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              clipPath: 'inset(50% 0 0 0)',
            }}
          >
            MANAN
          </h2>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="relative z-20 bg-[#1A0005]">
        <KachniSeparator />
        <div className="px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-on-background/20">
          <p className="text-[9px] tracking-[0.3em] uppercase font-mono">
            © 2026 ALL RIGHTS RESERVED
          </p>
          <p className="text-[9px] tracking-[0.3em] uppercase font-mono">
            ARCHITECTING THE VOID
          </p>
        </div>
      </div>
    </footer>
  );
};

const Portfolio = ({ onContactClick }: { onContactClick: () => void }) => {
  const [time, setTime] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTime(now.toLocaleTimeString('en-GB', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <GlobalBackground />
      <Navbar onMenuOpen={() => setIsMenuOpen(true)} />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Hero Section */}
      <section id="about" className="relative h-screen w-full flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center relative pt-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-8 md:gap-16"
          >
            <span className="text-[80px] md:text-[120px] font-light opacity-20 font-manrope">(</span>
            <div className="text-center">
              <p className="text-[11px] tracking-[0.4em] uppercase mb-4 opacity-60">HELLO!</p>
              <p className="text-[15px] max-w-[450px] leading-relaxed font-light opacity-80">
                Engineering intelligence through data. I'm Manan, a DS/ML Engineer navigating the void between complex logic and disruptive design..
              </p>
            </div>
            <span className="text-[80px] md:text-[120px] font-light opacity-20 font-manrope">)</span>
          </motion.div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center w-full relative mb-12 gap-0 md:gap-12 px-12 md:pr-[4vw]">
          <motion.h1 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-[10vw] leading-none tracking-tight select-none pr-4 whitespace-nowrap"
          >
            Creative
          </motion.h1>
          
          <motion.h1 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-[10vw] leading-none tracking-tight select-none pl-4 whitespace-nowrap"
          >
            Dev
          </motion.h1>
        </div>
      </section>

      {/* About Summary Section */}
      <section id="about-summary" className="w-full px-6 md:px-12 py-32 border-t border-white/5 bg-[#1A0005]">
        <div className="max-w-4xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] tracking-[0.4em] uppercase mb-12 opacity-40"
          >
            ABOUT
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-light leading-tight mb-12"
          >
            Specializing in architecting robust Data Pipelines and deploying scalable Machine Learning models that transform raw noise into strategic intelligence.
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 text-on-background/60 font-light leading-relaxed"
          >
            <p>
              With a deep foundation in Data Science and Machine Learning Engineering, I focus on the intersection of complex algorithmic logic and high-performance system design. My approach is rooted in the belief that data is the most powerful raw material of the modern era, requiring both surgical precision and creative intuition to master.
            </p>
            <p>
              From predictive telemetry in Formula 1 to real-time environmental risk monitoring, I build systems that don't just process data—they interpret it. I am committed to pushing the boundaries of what's possible in the digital void, one model at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <main id="projects">
        <ProjectCard 
          number="01 | 03"
          type="ML Project"
          tech="Python • XGBoost • Streamlit"
          title="OZONEWATCH"
          isLive={true}
          description="Intelligent air quality risk prediction platform. Deployed to provide real-time, actionable public health insights from complex environmental sensor data."
          buttons={[
            { 
              label: "GO TO SITE", 
              href: "https://ozonewatch.streamlit.app/",
              icon: <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            },
            { 
              label: "GITHUB REPO", 
              href: "https://github.com/mananprajapati/OZONEWATCH", 
              icon: <Github size={20} className="transition-transform group-hover:scale-110" /> 
            }
          ]}
        />
        <ProjectCard 
          number="02 | 03"
          type="ML Project"
          tech="Python • XGBoost • FastAPI"
          title="PITWALL"
          description="High-performance F1 tire degradation predictor. Leveraging real-time telemetry data to forecast pit strategies with surgical precision."
          buttons={[
            { label: "GITHUB REPO", href: "https://github.com/mananprajapati/PITWALL", icon: <Github size={20} className="transition-transform group-hover:scale-110" /> }
          ]}
        />
        <ProjectCard 
          number="03 | 03"
          type="Web App"
          tech="Flask • SQLite • Python"
          title="MMCSA"
          description="Multi-Modal Customer Support Auditor. An automated system designed to audit diverse communication channels for quality and compliance."
          buttons={[
            { label: "GITHUB REPO", href: "https://github.com/mananprajapati/MMCSA", icon: <Github size={20} className="transition-transform group-hover:scale-110" /> }
          ]}
        />
      </main>

      {/* Skills Section */}
      <ExpertiseSection />

      {/* Contact Section */}
      <section className="w-full px-6 md:px-12 py-32 flex flex-col items-start text-left bg-[#1A0005] scroll-mt-[90px]" id="contact">
        <h2 className="text-3xl md:text-5xl font-light mb-16 max-w-2xl leading-tight">
          Open to opportunities in Machine Learning and Data Engineering.
        </h2>
        <div className="flex flex-col md:flex-row gap-6 mb-16">
          <a 
            href="mailto:mananprajapati82@gmail.com"
            onClick={(e) => {
              e.preventDefault();
              onContactClick();
            }}
            className="bracket-expand group flex items-center gap-4 px-12 py-6 border border-transparent hover:bg-white/5 transition-all duration-500 cursor-pointer"
          >
            <span className="bracket-left text-3xl font-light transition-transform">[</span>
            <span className="text-lg md:text-2xl tracking-[0.4em] font-medium uppercase">
              LET'S WORK TOGETHER <ArrowUpRight className="inline-block align-middle ml-2" size={24} />
            </span>
            <span className="bracket-right text-3xl font-light transition-transform">]</span>
          </a>
          
          <a 
            href="/resume.pdf"
            target="_blank"
            className="bracket-expand group flex items-center gap-4 px-12 py-6 border border-transparent hover:bg-white/5 transition-all duration-500 cursor-pointer"
          >
            <span className="bracket-left text-3xl font-light transition-transform">[</span>
            <span className="text-lg md:text-2xl tracking-[0.4em] font-medium uppercase">
              DOWNLOAD CV ↓
            </span>
            <span className="bracket-right text-3xl font-light transition-transform">]</span>
          </a>
        </div>

      </section>

      {/* Footer Section */}
      <Footer time={time} />

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 glass-nav px-8 py-4 rounded-full flex gap-10 z-[100] border border-white/10 shadow-2xl">
        <Home size={20} className="text-on-surface" />
        <Grid size={20} className="text-on-surface-variant" />
        <User size={20} className="text-on-surface-variant" />
        <Mail size={20} className="text-on-surface-variant" />
      </div>
    </div>
  );
};

const Success = ({ onHomeClick }: { onHomeClick: () => void }) => {
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  const bgColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(26, 0, 5, 0)", "rgba(26, 0, 5, 0.8)"]
  );

  return (
    <div className="relative min-h-screen text-on-background flex flex-col">
      <GlobalBackground />
      {/* Success Nav */}
      <motion.nav 
        style={{ backgroundColor: bgColor }}
        className="fixed top-0 w-full z-[100] backdrop-blur-[12px] flex justify-between items-center px-8 py-6 transition-colors duration-300"
      >
        <a 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            onHomeClick();
          }}
          className="font-brand text-2xl text-on-background cursor-pointer hover:opacity-70 transition-opacity"
        >
          MANAN PRAJAPATI
        </a>
        <div className="hidden md:flex gap-12 font-body font-light tracking-wide">
          <a className="text-on-background/60 hover:text-on-background transition-colors duration-300 uppercase" href="#about" onClick={(e) => { e.preventDefault(); onHomeClick(); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>ABOUT</a>
          <a className="text-on-background/60 hover:text-on-background transition-colors duration-300 uppercase" href="#projects" onClick={(e) => { e.preventDefault(); onHomeClick(); setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>PROJECTS</a>
          <a className="text-on-background/60 hover:text-on-background transition-colors duration-300 uppercase" href="#contact" onClick={(e) => { e.preventDefault(); onHomeClick(); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>CONTACT</a>
        </div>
        <div className="w-10" /> {/* Spacer to balance logo */}
        {/* Separator Line */}
        <motion.div 
          style={{ opacity: borderOpacity }}
          className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10"
        />
      </motion.nav>

    {/* Success Content */}
    <main className="flex-1 flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-20">
      <div className="mb-8 flex items-center justify-center">
        <span className="text-6xl md:text-8xl font-body font-thin text-on-background/20">[</span>
        <div className="mx-4 text-on-background flex items-center justify-center">
          <Check size={64} strokeWidth={1} />
        </div>
        <span className="text-6xl md:text-8xl font-body font-thin text-on-background/20">]</span>
      </div>
      
      <h1 className="text-[12vw] md:text-[10vw] leading-[0.9] font-headline tracking-tight uppercase mb-6">
        THANK YOU
      </h1>
      
      <p className="max-w-md text-lg md:text-xl font-body font-light text-on-background/60 mb-12 tracking-wide leading-relaxed">
        Your message has been received. I'll get back to you within 24-48 hours.
      </p>
      
      <a 
        href="/"
        onClick={(e) => {
          e.preventDefault();
          onHomeClick();
        }}
        className="bracket-expand group inline-flex items-center text-xl md:text-2xl tracking-[0.4em] font-medium transition-all duration-500 hover:bg-[#800000] py-8 px-16 border border-transparent cursor-pointer"
      >
        <span className="bracket-left transition-transform font-light text-4xl">[</span>
        <span className="mx-4 uppercase">BACK TO HOME ↗</span>
        <span className="bracket-right transition-transform font-light text-4xl">]</span>
      </a>
    </main>

    {/* Marquee Footer */}
    <section className="w-full border-t border-white/10 py-12 overflow-hidden">
      <div className="scrolling-marquee select-none overflow-hidden flex">
        <div className="marquee-content flex items-center gap-12 text-[8rem] font-headline text-surface-container-high uppercase tracking-tight animate-marquee">
          <span>Success • Confirmed • Success • Confirmed • Success • Confirmed • Success • Confirmed • </span>
          <span>Success • Confirmed • Success • Confirmed • Success • Confirmed • Success • Confirmed • </span>
        </div>
      </div>
    </section>

    <footer className="w-full border-t border-white/15 flex flex-col md:flex-row justify-between items-center px-12 py-10 gap-6">
      <div className="font-body font-light uppercase tracking-[0.2em] text-xs text-on-background/40">
        © 2026 MANAN PRAJAPATI — ARCHITECTING THE VOID
      </div>
      <div className="flex gap-8 font-body font-light uppercase tracking-[0.2em] text-xs">
        <a className="text-on-background/40 hover:text-on-background underline transition-all" href="https://twitter.com/mananprajapati" target="_blank" rel="noopener noreferrer">TWITTER</a>
        <a className="text-on-background/40 hover:text-on-background underline transition-all" href="https://www.linkedin.com/in/manan-prajapati-bb4757319" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
        <a className="text-on-background/40 hover:text-on-background underline transition-all" href="https://github.com/Manan-55" target="_blank" rel="noopener noreferrer">GITHUB</a>
      </div>
    </footer>
  </div>
  );
};

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('portfolio');
  const [isLoading, setIsLoading] = useState(true);

  const handleContactClick = () => {
    setScreen('contact');
  };

  const handleFormSuccess = () => {
    setScreen('success');
  };

  const handleHomeClick = () => {
    setScreen('portfolio');
  };

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1500); // Wait for loader exit animation and layout settle
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isLoading && screen === 'portfolio' && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ 
              y: -100, 
              opacity: 0, 
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
            }} // slide_up transition
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Portfolio onContactClick={handleContactClick} />
          </motion.div>
        )}

        {!isLoading && screen === 'contact' && (
          <motion.div
            key="contact"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50"
          >
            <ContactForm onCancel={handleHomeClick} onSuccess={handleFormSuccess} />
          </motion.div>
        )}

        {!isLoading && screen === 'success' && (
          <motion.div
            key="success"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ 
              scale: 0.9, 
              opacity: 0, 
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
            }} // push_back transition
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50"
          >
            <Success onHomeClick={handleHomeClick} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
