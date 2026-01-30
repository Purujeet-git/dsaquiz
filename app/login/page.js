'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Press_Start_2P } from 'next/font/google';
import { signIn } from "next-auth/react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const pixelyfont = Press_Start_2P({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

export default function RetroLogin() {
    const gridRef = useRef(null);
    const containerRef = useRef(null);
    const { status } = useSession();
    const router = useRouter();


    useEffect(() => {
        if (status === "authenticated") {
            router.push("/topics");
        }
    }, [status]);

    useEffect(() => {
  if (!containerRef.current || !gridRef.current) return;

  gsap.to(gridRef.current, {
    backgroundPositionY: "40px",
    duration: 1,
    repeat: -1,
    ease: "none",
  });

  gsap.fromTo(
    containerRef.current,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
  );
}, [status]);

    return (
        <div ref={containerRef} className={`${pixelyfont.className} relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden uppercase font-mono`}>

            {/* GSAP Animated Grid Floor */}
            <div className="absolute inset-0 z-0 [perspective:500px]">
                <div
                    ref={gridRef}
                    className="absolute inset-0 origin-top [transform:rotateX(60deg)] opacity-40"
                    style={{
                        backgroundImage: `linear-gradient(to right, #4ade80 1px, transparent 1px), 
                              linear-gradient(to bottom, #4ade80 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
                {/* Glow effect at the horizon */}
                <div className="absolute inset-0 bg-linear-to-t from-transparent via-[#0a0a0a]/50 to-[#0b8122]" />
            </div>

            {/* Login Card */}
            <div
                ref={containerRef}
                className="relative z-10 w-[380px] bg-zinc-200 p-8 text-black 
                   shadow-[8px_0_0_0_#000,-8px_0_0_0_#000,0_8px_0_0_0_#000,0_-8px_0_0_0_#000]"
            >
                <h1 className="text-xl mb-8 text-center tracking-tighter [text-shadow:2px_2px_0_#fff]">
                    Login Player 1
                </h1>

                <div className="space-y-6">


                    <p className="text-[8px] text-center mt-2">
                        Uses GitHub or Google to authenticate
                    </p>

                </div>
                <button
                    onClick={() => signIn("github")}
                    className="w-full mt-4 flex items-center justify-center gap-3 bg-[#24292f] hover:bg-[#333] text-white py-3 
             border-4 border-black active:translate-y-1 transition-all
             shadow-[inset_-4px_-4px_0_0_#000,4px_4px_0_0_#000] font-bold group"
                >
                    {/* Pixelated-style GitHub Icon using SVG */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="text-[10px]">Link GitHub</span>
                </button>
                <button
                    onClick={() => signIn("google")}
                    className="
    w-full mt-4 flex items-center justify-center gap-3
    bg-linear-to-br
    from-[#4285F4]
    via-[#DB4437]
    to-[#0F9D58]
    hover:from-[#4285F4] hover:via-amber-500 hover:to-[#0F9D58]
    text-white py-3
    border-4 border-black
    active:translate-y-1 transition-all
    shadow-[inset_-4px_-4px_0_0_#000,4px_4px_0_0_#000]
    font-bold group
  "
                >
                    {/* Pixelated-style GitHub Icon using SVG */}
                    <img className='invert hover:scale-110' src='/gogg.png' height={30} width={30} />
                    <span className="text-[10px]">Link Google</span>
                </button>
                <div className="mt-8 flex justify-between text-[8px] text-zinc-600 font-bold">
                    <span>Ver 1.0.4</span>
                    <span className="animate-pulse">Press Start</span>
                </div>
            </div>

            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-20"></div>
        </div>
    );
}