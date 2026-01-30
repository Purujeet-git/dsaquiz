"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { Press_Start_2P, VT323 } from "next/font/google";
import { DIFFICULTIES } from "@/lib/dsaDifficulties";
import { useRouter } from "next/navigation";

const pixelHeader = Press_Start_2P({ weight: '400', subsets: ['latin'] });
const pixelBody = VT323({ weight: '400', subsets: ['latin'] });

export default function TopicDetailClient({ topic, topicId }) {
  const { data: session, status } = useSession();
  const [progress, setProgress] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      fetch(`/api/progress/topic-summary/${topicId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setProgress(data.progress);
        });
    }
  }, [topicId, status]);

  // 1. Loading State (Matching your system boot style)
  if (status === "loading" || (status === "authenticated" && !progress)) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-green-500">
        <div className={`${pixelHeader.className} text-[10px] animate-pulse`}>
          INITIALIZING DATA STREAM...
        </div>
      </div>
    );
  }

  // 2. Unauthenticated State (The "Login to Continue" Banner)
  if (status === "unauthenticated") {
    return (
      <div className={`${pixelBody.className} relative min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6`}>
         {/* Background Grid (Consistent with Topics Page) */}
         <div className="absolute inset-0 opacity-10 [perspective:500px]">
            <div className="absolute inset-0 origin-top [transform:rotateX(60deg)]"
                 style={{ backgroundImage: `linear-gradient(to right, #4ade80 1px, transparent 1px), linear-gradient(to bottom, #4ade80 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
         </div>

         <div className="relative z-10 w-full max-w-lg bg-zinc-200 border-4 border-black p-10 shadow-[12px_12px_0_0_#ff00ff] text-center">
            <h2 className={`${pixelHeader.className} text-xl text-black mb-6`}>Access Denied</h2>
            <div className="bg-black text-green-500 p-4 mb-8 text-sm leading-tight border-2 border-zinc-400">
                PLAYER NOT DETECTED. <br/>
                PLEASE INSERT COIN (LOGIN) TO SAVE PROGRESS AND ACCESS {topic.title} TRIALS.
            </div>
            
            <button 
              onClick={() => {
                router.push('/login')
              }}
              className={`${pixelHeader.className} text-[12px] w-full bg-[#ff00ff] hover:bg-[#ff55ff] text-white py-4 border-4 border-black shadow-[inset_-4px_-4px_0_0_#9d009d,4px_4px_0_0_#000] active:translate-y-1 transition-all`}
            >
              LOGIN PLAYER 1
            </button>
            
            <Link href="/topics" className="inline-block mt-6 text-black border-b-2 border-black hover:text-zinc-600 uppercase text-xs">
              ◀ Back to Menu
            </Link>
         </div>
      </div>
    );
  }

  // 3. Authenticated Content (Your current logic, restyled)
  const mediumUnlocked = progress?.easy?.percentage >= 80;
  const hardUnlocked = progress?.medium?.percentage >= 70;

  return (
    <div className={`${pixelBody.className} relative min-h-screen bg-[#0a0a0a] text-white px-6 py-20 overflow-hidden`}>
      <div className="max-w-5xl mx-auto relative z-10">
        
        <Link href="/topics" className="inline-block mb-8 text-xs text-green-500 border-b-2 border-green-500 hover:text-green-300 transition-colors uppercase">
          ◀ Return to World Map
        </Link>

        <header className="mb-16 border-l-8 border-pink-500 pl-6">
          <h1 className={`${pixelHeader.className} text-3xl mb-4 text-white uppercase tracking-tighter`}>
            {topic.title}
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            {topic.description}
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-3">
          {DIFFICULTIES.map((diff) => {
            const data = progress?.[diff.id] || { percentage: 0, completed: 0, total: 0 };
            const unlocked = diff.id === "easy" ? true : diff.id === "medium" ? mediumUnlocked : hardUnlocked;

            return (
              <div
                key={diff.id}
                className={`border-4 border-black p-6 shadow-[8px_8px_0_0_#000] transition-all relative ${
                  unlocked ? "bg-zinc-200 text-black" : "bg-zinc-800 text-zinc-500 opacity-70"
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className={`${pixelHeader.className} text-[12px]`}>{diff.title}</h3>
                  {!unlocked && <span className="text-xl">🔒</span>}
                </div>

                {/* Pixelated Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
                    <span>Sync:</span>
                    <span>{data.percentage}%</span>
                  </div>
                  <div className="w-full bg-black border-2 border-zinc-400 h-5 p-1">
                    <div
                      className={`h-full transition-all duration-1000 ${unlocked ? 'bg-green-500' : 'bg-zinc-600'}`}
                      style={{ width: `${data.percentage}%` }}
                    />
                  </div>
                </div>

                <div className="mt-10">
                  {unlocked ? (
                    <Link
                      href={`/topics/${topicId}/${diff.id}`}
                      className={`${pixelHeader.className} block text-center text-[10px] bg-black text-white py-3 border-2 border-zinc-500 shadow-[4px_4px_0_0_#ff00ff] hover:shadow-[2px_2px_0_0_#ff00ff] active:translate-y-1 transition-all`}
                    >
                      ENTER ▶
                    </Link>
                  ) : (
                    <div className="text-[10px] text-center border-2 border-dashed border-zinc-600 py-3 uppercase">
                      LOCKED
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CRT Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-20"></div>
    </div>
  );
}