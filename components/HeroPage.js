'use client'
import { useRef } from 'react'
import React from 'react'
import gsap from 'gsap'
import TextPlugin from 'gsap/TextPlugin'
import { useGSAP } from '@gsap/react'
import { useRouter } from 'next/navigation'

import { Press_Start_2P } from 'next/font/google'

const pixelyfont = Press_Start_2P({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

if (typeof window !== "undefined") {
    gsap.registerPlugin(TextPlugin);
}

const HeroPage = () => {

    const container = useRef(null);
    const textRef = useRef(null);
    const text1Ref = useRef(null);
    const imgRef = useRef(null);
    const router = useRouter();

    useGSAP(() => {
        const words = ["Hello Developer", "To DSA Quiz"];

        const tl = gsap.timeline({ repeat: 5 });

        words.forEach((word) => {
            tl.to(textRef.current, {
                duration: 1.5,
                text: word,
                ease: "none",
            })
                .to({}, { duration: 1 })
                .to(textRef.container, {
                    duration: 1,
                    text: "",
                    ease: "none",
                });
        });

        const words1 = ["Master Data Structures & Algorithms... THE RETRO WAY!"];

        words1.forEach((word) => {
            tl.to(text1Ref.current,{
                duration:3.5,
                text:word,
                ease:"power1.inOut",
            })
                .to({},{duration:1})
                .to(text1Ref.container,{
                    duration:1,
                    text:"",
                    ease:"none",
                });
        });

        
    }, { scope: container });

   useGSAP(() => {
        // Floating and Swaying
        gsap.to(imgRef.current, {
            y: "-=20",       // Moves up 10px
            y:"+=20",
            x: "+=20",        // Sways right 5px
            rotation: 7,     // Tilts slightly
            duration: 5,
            ease: "sine.inOut",
            repeat: -1,      // Infinite
            yoyo: true       // Reverses back to start
        });
        
        // Optional: Adding a slight pulse to the scale for more "life"
        gsap.to(".pixel-icon", {
            scale: 1.15,
            duration: 3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: {
            each: 0.3,
            from: "random" // Makes the movement feel more organic
        }
        });
    }, { scope: container });

    useGSAP(() => {
    // Reveal the login button
    gsap.to(".loginbtn", {
        opacity: 1,
        y: -30, // Moves it back to its original position in the DOM
        duration: 1.2,
        ease: "elastic.out(1, 0.5)", // Gives it a nice "landed" bounce
        delay: 0.5 // Wait a bit for the typewriter to start
    });
}, { scope: container });
    return (
        <div ref={container} className={`${pixelyfont.className} bg-black h-[90vh] relative flex justify-center items-center flex-col text-6xl  gap-1 font-bold`}>
            <img 
                ref={imgRef} 
                src='/tree2.png' 
                className='w-14 pixel-icon absolute top-10 left-30 origin-bottom' 
                alt="pixel tree"
            />
            <img 
                ref={imgRef} 
                src='/ch1.png' 
                className='w-14 absolute pixel-icon top-44 right-20 origin-bottom' 
                alt="pixel tree"
            />
            <img 
                ref={imgRef} 
                src='/obj.png' 
                className='w-14 absolute top-10 pixel-icon right-10 origin-bottom' 
                alt="pixel tree"
            />
            <img 
                ref={imgRef} 
                src='/per.png' 
                className='w-14 absolute top-44 left-10 pixel-icon origin-bottom' 
                alt="pixel tree"
            />
            <img 
                ref={imgRef} 
                src='/book.png' 
                className='w-14 absolute bottom-28 left-72 pixel-icon origin-bottom' 
                alt="pixel tree"
            />
            <img 
                ref={imgRef} 
                src='/hrt.png' 
                className='w-14 absolute bottom-10 right-10 pixel-icon origin-bottom' 
                alt="pixel tree"
            />
            


            <span ref={textRef} className={`text-blue-600  ${pixelyfont.className}`}></span>
            <span ref={text1Ref} className={`text-blue-200 ${pixelyfont.className} pb-20 text-xl `}></span>
            <div>
                <button 
                        onClick={() => router.push('/signup')}
                        className={`
                            loginbtn     opacity-0
                            relative text-4xl m-10
                            bg-green-500 text-black font-bold
                            border-b-4 border-r-4 border-green-800 
                            p-4 
                            hover:border-b-0 hover:border-r-0 
                            hover:translate-y-1 hover:translate-x-0.5
                            hover:bg-green-400 transition-all duration-75
                            ${pixelyfont.className}
                        `}
                    >
                        LOGIN
                    </button>   
            </div>
            <div className='border-6 loginbtn opacity-0  border-[#FFEB3B] py-10 px-20 flex gap-28'>
                <div className='text-xl'>
                    <p className='text-green-400'>200+</p>
                    <p className='text-yellow-500 text-xs'>Quizzes</p>
                </div>
                <div className='text-xl'>
                    <p className='text-green-400'>50+</p>
                    <p className='text-yellow-500 text-xs'>Topics</p>
                </div>
                <div className='text-xl'>
                    <p className='text-green-400'>∞</p>
                    <p className='text-yellow-500 text-xs'>Fun</p>
                </div>
            </div>
            <p className='text-white text-sm p-10 animate-bounce duration-300'>▼ Scroll ▼</p>
        </div>
    )
}

export default HeroPage