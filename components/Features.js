"use client"
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Press_Start_2P } from 'next/font/google'

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const pixelyfont = Press_Start_2P({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

const Features = () => {
    const container = useRef(null);

   useGSAP(() => {
    gsap.from(".feature-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
            trigger: container.current,
            start: "top 20%",    // Starts when the top of the container hits 80% of the screen
            end: "bottom 50%",   // Ends when the bottom hits 20%
            
            // This is the magic string:
            // play (onEnter), reverse (onLeave), restart (onEnterBack), reverse (onLeaveBack)
            toggleActions: "play reverse restart reverse", 
            
            // markers: true, // Uncomment this to see the start/end lines while debugging
        }
    });
}, { scope: container });
  return (
    <div ref={container} className={`${pixelyfont.className} bg-black text-white p-10`}>
        <div className='flex flex-col items-center justify-center'>
        
        <div className="relative flex items-center">
                    {/* Glow Effect */}
                    <span className={`${pixelyfont.className} absolute inset-0 py-4 blur-xl opacity-100 bg-green-500 bg-clip-text text-xl font-extrabold text-transparent select-none`}>
                        ★ Features ★
                    </span>
                    {/* Main Title */}
                    <h1 className={`${pixelyfont.className} cursor-pointer relative py-4 bg-linear-to-r from-blue-500 via-teal-500 to-pink-500 text-green-500 bg-clip-text text-xl font-extrabold  select-auto`}>
                        ★ Features ★
                    </h1>
                </div>
                <p className='text-xs text-green-300'>Everything you need to become a DSA champion</p>
        </div>
        <div className='flex '>
            <div>
                <div className='border-8 feature-card border-green-400 w-[40vw] h-[25vh] m-10 flex'>
                    <div  className='px-10'>
                        <img className='w-20' src='/book.png'/>
                    </div>
                    <div className='w-[70%] flex flex-col items-start gap-5 p-10 justify-center'>
                        <p className='text-green-400'>INTERACTIVE QUIZZES</p>
                        <p className='text-xs text-green-700'>Battle through hundreds of DSA challenges. Each correct answer brings you closer to becoming a coding master!</p>
                    </div>
                </div>
            </div>
            <div>
                <div className='border-8 feature-card border-green-400 h-[25vh] w-[40vw] m-10 flex'>
                    <div  className='px-10'>
                        <img className='w-20' src='/per.png'/>
                    </div>
                    <div className='w-[70%] flex flex-col items-start  gap-5 p-10 justify-center'>
                        <p className='text-green-400'>LEVEL UP SYSTEM</p>
                        <p className='text-xs text-green-700'>Earn XP, unlock achievements, and watch your character grow as you conquer algorithms.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex '>
            <div>
                <div className='border-8 feature-card border-green-400 w-[40vw] h-[25vh] m-10 flex'>
                    <div  className='px-10'>
                        <img className='w-20' src='/hrt.png'/>
                    </div>
                    <div className='w-[70%] flex flex-col items-start gap-5 p-10 justify-center'>
                        <p className='text-green-400'>PROGRESS SAVED</p>
                        <p className='text-xs text-green-700'>Your journey is automatically saved. Return anytime to continue your quest!</p>
                    </div>
                </div>
            </div>
            <div>
                <div className='border-8 feature-card border-green-400 h-[25vh] w-[40vw] m-10 flex'>
                    <div  className='px-10'>
                        <img className='w-20' src='/obj.png'/>
                    </div>
                    <div className='w-[70%] flex flex-col items-start  gap-5 p-10 justify-center'>
                        <p className='text-green-400'>EARN REWARDS</p>
                        <p className='text-xs text-green-700'>Collect coins for completing challenges. Unlock special content and power-ups!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Features