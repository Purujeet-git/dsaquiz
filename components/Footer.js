"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Press_Start_2P } from 'next/font/google';

const pixelyfont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const Footer = () => {
  const container = useRef(null);

  useGSAP(() => {
    // Flickering effect for the Press Start text
    gsap.to(".press-start", {
      opacity: 0.3,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "steps(1)", // Makes it "blink" rather than fade smoothly
    });
  }, { scope: container });

  return (
    <footer ref={container} className={`${pixelyfont.className} bg-black text-white p-10 border-t-8 border-green-500`}>
      <div className="max-w-7xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
          
          {/* Section 1: Brand */}
          <div className="flex flex-col gap-4">
            <h2 className="text-green-500 text-xl">DSA QUIZ</h2>
            <p className="text-green-800 text-xs leading-relaxed">
              Making DSA learning fun and nostalgic since 2026.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h2 className="text-cyan-400 text-xl">QUICK LINKS</h2>
            <ul className="text-green-500 text-xs flex flex-col gap-3">
              <li className="hover:text-cyan-400 cursor-pointer">→ Home</li>
              <li className="hover:text-cyan-400 cursor-pointer">→ Topics</li>
              <li className="hover:text-cyan-400 cursor-pointer">→ Leaderboard</li>
              <li className="hover:text-cyan-400 cursor-pointer">→ Profile</li>
            </ul>
          </div>

          {/* Section 3: Connect */}
          <div className="flex flex-col gap-4">
            <h2 className="text-pink-500 text-xl">CONNECT</h2>
            <ul className="text-green-500 text-xs flex flex-col gap-3">
              <li className="flex items-center gap-2 hover:text-pink-400 cursor-pointer">
                <span className="text-green-400">◆</span> GitHub
              </li>
              {/* <li className="flex items-center gap-2 hover:text-pink-400 cursor-pointer">
                <span className="text-green-400">◆</span> Twitter
              </li>
              <li className="flex items-center gap-2 hover:text-pink-400 cursor-pointer">
                <span className="text-green-400">◆</span> Discord
              </li> */}
            </ul>
          </div>
        </div>

        {/* Separator Line */}
        <hr className="border-green-900 mb-10" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-6">
          <p className="text-green-600 text-[10px]">
            © 2026 PixelDSA. Made with <span className="text-red-600">❤</span> and lots of coffee.
          </p>
          
          <h3 className="press-start text-green-400 text-lg tracking-widest">
            PRESS LOGIN TO CONTINUE...
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;