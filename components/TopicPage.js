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



const TopicPage = () => {
    const container = useRef(null);
useGSAP(() => {
    gsap.from(".topic-box", {
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: "back.out(1.2)",
        stagger: {
            each: 0.1,
            from: "start" // Animates row by row
        },
        scrollTrigger: {
            trigger: container.current,
            // "top 85%" means: Start when the TOP of the container hits 85% of the viewport height
            start: "top 85%", 
            // "bottom 20%" means: End when the BOTTOM of the container hits 20% of the viewport height
            end: "bottom 20%",
            toggleActions: "play reverse restart reverse",
            // markers: true, // UNCOMMENT THIS to see the trigger lines on your screen!
        }
    });
}, { scope: container });
    return (
        <div className={`${pixelyfont.className} bg-black pb-40`}><div className='flex flex-col items-center justify-center'>

            <div className="relative flex items-center justify-center">
                {/* The Halo/Glow Layer */}
                <span className="absolute blur-md h-20 w-40 opacity-80 text-pink-500  select-none">
                    ★ TOPICS ★
                </span>
                {/* The Sharp Neon Text */}
                <h1 className="relative py-4 text-pink-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] text-xl font-extrabold">
                    ★ TOPICS ★
                </h1>
            </div>
            <p className='text-xs text-green-300'>Your journey to DSA mastery in 4 simple steps</p>
        </div>
            <div className='flex mb-0'>
                <div className='topic-box border-8 my-0 m-10 bg-green-950 gap-3 w-[20vw] h-[15vh] flex flex-col items-center justify-center border-lime-400'>
                    <p className='text-green-400 hover:animate-pulse text-sm duration-50'>ARRAYS</p>
                    <p className='text-green-600 text-[10px]'>BEGINNER</p>
                </div>
                <div className='topic-box border-8 my-0 m-10 bg-green-950 gap-3 w-[20vw] h-[15vh] flex flex-col items-center justify-center border-lime-400'>
                    <p className='text-green-400 hover:animate-pulse duration-50'>LINKED LISTS</p>
                    <p className='text-green-600 text-[10px]'>BEGINNER</p>
                </div>
                <div className='topic-box border-8 my-0 m-10 bg-green-950 gap-3 w-[20vw] h-[15vh] flex flex-col items-center justify-center border-lime-400'>
                    <p className='text-green-400 hover:animate-pulse duration-50'>STACKS</p>
                    <p className='text-green-600 text-[10px]'>BEGINNER</p>
                </div>
                <div className=' topic-box border-8 my-0 m-10 bg-green-950 gap-3 w-[20vw] h-[15vh] flex flex-col items-center justify-center border-lime-400'>
                    <p className='text-green-400 hover:animate-pulse duration-50'>QUEUES</p>
                    <p className='text-green-600 text-[10px]'>BEGINNER</p>
                </div>
            </div>
            <div className='flex'>
                <div className='topic-box border-8 my-5  m-10 bg-cyan-950 gap-3 w-[20vw] h-[15vh] flex flex-col items-center justify-center border-cyan-400'>
                    <p className='text-cyan-400 text-sm hover:animate-pulse duration-50'>TREES</p>
                    <p className='text-green-600 text-[10px]'>INTERMEDIATE</p>
                </div>
                <div className='topic-box border-8 my-5 m-10 bg-cyan-950 gap-3 w-[20vw] h-[15vh] flex flex-col items-center justify-center border-cyan-400'>
                    <p className='text-cyan-400 hover:animate-pulse duration-50'>BINARY SEARCH</p>
                    <p className='text-green-600 text-[10px]'>INTERMEDIATE</p>
                </div>
                <div className='topic-box border-8 my-5 m-10 bg-cyan-950 gap-3 w-[20vw] h-[15vh] flex flex-col items-center justify-center border-cyan-400'>
                    <p className='text-cyan-400 hover:animate-pulse duration-50' >SORTING</p>
                    <p className='text-green-600 text-[10px]'>INTERMEDIATE</p>
                </div>
                <div className='topic-box border-8 my-5 m-10 bg-cyan-950 gap-3 w-[20vw] h-[15vh] flex flex-col items-center justify-center border-cyan-400'>
                    <p className='text-cyan-400 hover:animate-pulse duration-50'>HASHING
                    </p>
                    <p className='text-green-600 text-[10px]'>INTERMEDIATE</p>
                </div>
            </div>
            <div className='flex'>
                <div className='topic-box border-8 mt-0 m-10 bg-fuchsia-950 gap-3 w-[20vw] h-[15vh] flex flex-col items-center justify-center border-fuchsia-400'>
                    <p className='text-fuchsia-400 text-sm hover:animate-pulse duration-50'>GRAPHS</p>
                    <p className='text-green-600 text-[10px]'>ADVANCED
                    </p>
                </div>
                <div className='topic-box border-8 mt-0 m-10 bg-fuchsia-950 gap-3 w-[20vw] h-[15vh] flex flex-col items-center justify-center border-fuchsia-400'>
                    <p className='text-fuchsia-400 hover:animate-pulse duration-50'>DYNAMIC PROGRAMMING</p>
                    <p className='text-green-600 text-[10px]'>ADVANCED
                    </p>
                </div>
                <div className='topic-box border-8 mt-0 m-10 bg-fuchsia-950 gap-3 w-[20vw] h-[15vh] flex flex-col items-center justify-center border-fuchsia-400'>
                    <p className='text-fuchsia-400 hover:animate-pulse duration-50'>BACKTRACKING</p>
                    <p className='text-green-600 text-[10px]'>ADVANCED
                    </p>
                </div>
                <div className='topic-box border-8 mt-0 m-10 bg-fuchsia-950 gap-3 w-[20vw] h-[15vh] flex flex-col items-center justify-center border-fuchsia-400'>
                    <p className='text-fuchsia-400 hover:animate-pulse duration-50'>GREEDY</p>
                    <p className='text-green-600 text-[10px]'>ADVANCED
                    </p>
                </div>
            </div>
            <div className='flex items-center gap-10 justify-center'>
                <div className='flex gap-3'>
                    <div className='h-5 w-5 bg-lime-400' />
                    <p className='text-lime-400'>BEGINNER</p>
                </div>
                <div className='flex gap-3'>
                    <div className='h-5 w-5 bg-cyan-400' />
                    <p className='text-cyan-400'>INTERMEDIATE</p>
                </div>
                <div className='flex gap-3'>
                    <div className='h-5 w-5 bg-fuchsia-400' />
                    <p className='text-fuchsia-400'>ADVANCED
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TopicPage