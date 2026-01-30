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



const Works = () => {
    const container =useRef(null);
    useGSAP(() => {
    gsap.fromTo(".progress", 
        { scaleX: 0 }, 
        { 
            scaleX: 1, 
            transformOrigin: "left center", // Ensures it grows from the left side
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top 50%",   // Animation starts when section is 70% down the screen
                end: "bottom 100%",  // Animation ends when bottom of section reaches 60%
                scrub: 0.5,         // Connects animation to scroll speed (0.5 adds a smooth lag)
            }
        }
    );
}, { scope: container });
  return (
    <div ref={container} className={`bg-black ${pixelyfont.className} h-[75vh] flex flex-col items-center justify-center`}>
        <div className='flex flex-col items-center justify-center'>
        
        <div className="relative flex items-center">
                    {/* Glow Effect */}
                    <span className={`${pixelyfont.className} absolute inset-0 p-4 blur-xl bg-cyan-100 bg-clip-text text-xl font-extrabold text-transparent select-none`}>
                        ★ HOW IT WORKS ★
                    </span>
                    {/* Main Title */}
                    <h1 className={`${pixelyfont.className} cursor-pointer relative py-4 bg-linear-to-r from-blue-500 via-teal-500 to-pink-500 text-cyan-300 bg-clip-text text-xl font-extrabold  select-auto`}>
                        ★ HOW IT WORKS ★
                    </h1>
                </div>
                <p className='text-xs text-green-300'>Your journey to DSA mastery in 4 simple steps</p>
        </div>
        <div className='p-10 flex relative justify-center'>
            <div className='w-[20vw] h-[25vh] flex flex-col items-center justify-center '>
                <div className='border-6 p-5 mb-5 bg-black z-10 border-green-400 w-fit'>
                    <img className='invert-25' src='/ctrl.png'/>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-green-300 text-sm'>CREATE ACCOUNT</p>
                    <p className='text-green-700 text-[10px] text-center px-10 py-2'>Sign up and create your pixel hero character</p>
                </div>
            </div>
            <div className='w-[20vw] h-[25vh] flex flex-col items-center justify-center '>
                <div className='border-6 p-5 mb-5 bg-black z-10 border-green-400 w-fit'>
                    <img className='invert-25' src='/ctrl.png'/>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-green-300 text-sm'>CREATE ACCOUNT</p>
                    <p className='text-green-700 text-[10px] text-center px-10 py-2'>Sign up and create your pixel hero character</p>
                </div>
            </div>
            <div className='w-[20vw] h-[25vh] flex flex-col items-center justify-center '>
                <div className='border-6 p-5 mb-5 bg-black z-10 border-green-400 w-fit'>
                    <img className='invert-25' src='/ctrl.png'/>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-green-300 text-sm'>CREATE ACCOUNT</p>
                    <p className='text-green-700 text-[10px] text-center px-10 py-2'>Sign up and create your pixel hero character</p>
                </div>
            </div>
            <div className='w-[20vw] h-[25vh] flex flex-col items-center justify-center '>
                <div className='border-6 p-5 mb-5 bg-black z-10 border-green-400 w-fit'>
                    <img className='invert-25' src='/ctrl.png'/>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-green-300 text-sm'>CREATE ACCOUNT</p>
                    <p className='text-green-700 text-[10px] text-center px-10 py-2'>Sign up and create your pixel hero character</p>
                </div>
            </div>
            <div className='progress border-2 border-green-300 w-[60vw] absolute top-30'>

            </div>
            <div className='border-2 absolute w-16 h-16 -top-10 left-50 bg-fuchsia-500 opacity-45'/>
            <div className='border-2 absolute w-16 h-16 -top-10 right-50 bg-cyan-500 opacity-45'/>
            <div className='border-2 absolute w-16 h-16 bottom-10 left-96 bg-green-500 opacity-45'/>
        </div>
    </div>
  )
}

export default Works