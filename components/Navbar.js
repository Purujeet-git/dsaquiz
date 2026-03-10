"use client"
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Press_Start_2P } from 'next/font/google'
import { useSession, signOut } from "next-auth/react" // Added this

const pixelyfont = Press_Start_2P({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

const Navbar = () => {
    const router = useRouter();
    const { data: session, status } = useSession(); // Access session data

    return (
        <div className={`${pixelyfont.className} w-full bg-black border-b-8 h-32 flex items-center sticky top-0 z-50 border-green-500`}>
            <div className='flex justify-between w-full items-center px-6'>
                {/* Logo Section */}
                <div className="relative flex items-center justify-center cursor-pointer" onClick={() => router.push('/')}>
                    <span className="absolute inset-0 py-4 blur-xl bg-linear-to-r from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-4xl font-extrabold text-transparent select-none">
                        DSA QUIZ
                    </span>
                    <h1 className="relative py-4 bg-linear-to-r from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-4xl font-extrabold text-transparent">
                        DSA QUIZ
                    </h1>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-8 text-[10px] text-green-700 uppercase">
                    {/* <Link className='hover:text-green-400 transition-colors' href='#features'>Features</Link> */}
                    <Link className='hover:text-green-400 transition-colors' href='/topics'>Start Here</Link>
                    {/* <Link className='hover:text-green-400 transition-colors' href='/'>How it Works</Link> */}
                    
                    {/* Session-based UI */}
                    {status === "authenticated" ? (
                        <div className="relative group flex items-center gap-4">
                            {/* Player Avatar (Pixel Style) */}
                            <div className="relative w-12 h-12 bg-zinc-200 border-4 border-black shadow-[4px_4px_0_0_#4ade80] overflow-hidden">
                                {session.user.image ? (
                                    <img 
                                        src={session.user.image} 
                                        alt="avatar" 
                                        className="w-full h-full object-cover pixelated" 
                                        style={{ imageRendering: 'pixelated' }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-black">P1</div>
                                )}
                            </div>

                            {/* Retro Hover Menu */}
                            <div className="absolute right-0 top-full pt-4 hidden group-hover:block transition-all animate-in fade-in zoom-in duration-75">
                                <div className="bg-zinc-100 border-4 border-black p-4 w-48 shadow-[8px_8px_0_0_#000]">
                                    <p className="text-black text-[8px] mb-4 truncate italic">ID: {session.user.name}</p>
                                    <button 
                                        onClick={() => signOut()}
                                        className="w-full bg-red-500 text-white text-[8px] py-2 border-2 border-black shadow-[2px_2px_0_0_#000] active:translate-y-1 active:shadow-none transition-all"
                                    >
                                        QUIT GAME
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button 
                            onClick={() => router.push('/login')}
                            className="relative inline-block px-6 py-3 bg-green-500 text-black font-bold border-b-4 border-r-4 border-green-800 active:border-b-0 active:border-r-0 active:translate-y-[4px] active:translate-x-[2px] hover:bg-green-400 transition-all duration-75 text-[12px]"
                        >
                            LOGIN
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar;