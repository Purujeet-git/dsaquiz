"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Press_Start_2P, VT323 } from "next/font/google";
import gsap from "gsap";

const pixelHeader = Press_Start_2P({ weight: '400', subsets: ['latin'] });
const pixelBody = VT323({ weight: '400', subsets: ['latin'] });

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef(null);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const res = await fetch("/api/topics");
        const data = await res.json();
        if (data.success) setTopics(data.topics);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTopics();
  }, []);

  // Background Grid Animation
  useEffect(() => {
    if (!loading) {
      gsap.to(gridRef.current, {
        backgroundPositionY: '40px',
        duration: 1.5,
        repeat: -1,
        ease: "none"
      });
    }
  }, [loading]);

  if (loading) return <LoadingState />;

  return (
    <div className={`${pixelBody.className} relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden`}>
      
      {/* Retro Grid Floor */}
      <div className="absolute inset-0 z-0 [perspective:500px]">
        <div 
          ref={gridRef}
          className="absolute inset-0 origin-top [transform:rotateX(60deg)] opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, #4ade80 1px, transparent 1px), 
                              linear-gradient(to bottom, #4ade80 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <header className="mb-16 border-l-8 border-green-400 pl-6">
          <h1 className={`${pixelHeader.className} text-3xl mb-4 tracking-tighter text-white`}>
            Select Mission
          </h1>
          <p className="text-green-400 text-xl uppercase tracking-widest animate-pulse">
            // Ready Player One: Choose your Data Structure
          </p>
        </header>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <Link key={topic.topicId} href={`/topics/${topic.topicId}`} className="group relative">
              {/* Pixel Card */}
              <div className="h-full bg-zinc-400 p-6 border-4 border-black text-black 
                            shadow-[8px_8px_0_0_#4ade80] group-hover:shadow-[12px_12px_0_0_#ff00ff] 
                            group-active:translate-y-1 group-active:shadow-none transition-all">
                
                <div className="flex justify-between items-start mb-4">
                   <h3 className={`${pixelHeader.className} text-sm leading-tight`}>
                    {topic.title}
                  </h3>
                  <span className="text-xs bg-black text-white px-2 py-1">LVL 0{topic.topicId}</span>
                </div>
                
                <p className="text-lg leading-tight mb-8 text-zinc-700">
                  Initialize {topic.title} sequence and solve the memory trials.
                </p>

                <div className="flex items-center justify-between border-t-2 border-black pt-4">
                  <span className="text-[10px] font-bold">STATUS: UNLOCKED</span>
                  <div className={`${pixelHeader.className} text-[10px] bg-green-500 px-3 py-2 border-2 border-black shadow-[2px_2px_0_0_#000]`}>
                    START ▶
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-50"></div>
    </div>
  );
}

function LoadingState() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + "." : ""));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${pixelHeader.className} min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-green-500`}>
      {/* Animated Loading Bar */}
      <div className="w-64 h-8 border-4 border-green-500 p-1 mb-6">
        <div className="h-full bg-green-500 animate-[loading_2s_ease-in-out_infinite]" style={{ width: '40%' }}></div>
      </div>
      
      <div className="text-xs tracking-[0.2em]">
        ACCESSING DATABASE{dots}
      </div>
      
      <div className="mt-4 text-[8px] text-zinc-600 animate-pulse">
        CHECKSUM: 0x82BB... OK
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
        }
      `}</style>
    </div>
  );
}