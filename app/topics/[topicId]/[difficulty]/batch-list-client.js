"use client";
import React from "react";
import Link from "next/link";
import { Press_Start_2P, VT323 } from "next/font/google";

const pixelHeader = Press_Start_2P({ weight: '400', subsets: ['latin'] });
const pixelBody = VT323({ weight: '400', subsets: ['latin'] });

export default function BatchListClient({ topicId, difficulty, topicTitle, batches, completedBatches }) {
  const completedBatchSet = new Set(completedBatches);

  return (
    <div className={`${pixelBody.className} relative min-h-screen bg-[#0a0a0a] text-white flex flex-col overflow-x-hidden`}>
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 [perspective:800px]">
        <div className="absolute inset-0 origin-top [transform:rotateX(60deg)] opacity-10 animate-[grid-scroll_2s_linear_infinite]"
             style={{ backgroundImage: `linear-gradient(to right, #4ade80 1px, transparent 1px), linear-gradient(to bottom, #4ade80 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      </div>

      {/* Header Bar */}
      <div className="relative z-10 bg-zinc-100 border-b-8 border-black p-8 text-black shadow-[0_8px_0_0_#4ade80]">
        <div className="max-w-4xl mx-auto">
          <Link href={`/topics/${topicId}`} className="text-[10px] font-bold border-b-2 border-black hover:text-zinc-600 mb-6 inline-block uppercase tracking-tighter">
            ◀ Abort Mission / Return
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <h1 className={`${pixelHeader.className} text-2xl tracking-tighter uppercase`}>{topicTitle}</h1>
            <div className={`px-4 py-1 border-4 border-black text-[10px] font-bold uppercase shadow-[4px_4px_0_0_#000] ${
              difficulty === "easy" ? "bg-green-400" : difficulty === "medium" ? "bg-yellow-400" : "bg-red-500 text-white"
            }`}>
              Security Level: {difficulty}
            </div>
          </div>
        </div>
      </div>

      {/* The Mission Trail */}
      <div className="max-w-4xl w-full mx-auto px-6 py-20 relative z-10">
        <div className="space-y-12 relative">
          {/* Vertical Data Stream Line */}
          <div className="absolute left-[2.4rem] top-0 bottom-0 w-1 bg-green-900 border-l-2 border-green-500/30 -z-10" />

          {batches.map((batch, index) => {
            const isCompleted = completedBatchSet.has(batch.batchNumber);
            const isLocked = index > 0 && !completedBatchSet.has(batches[index - 1].batchNumber);
            const isCurrent = !isCompleted && !isLocked;

            return (
              <div key={batch.batchNumber} 
                   className={`relative flex items-center gap-8 p-6 border-4 border-black transition-all group ${
                    isCompleted ? "bg-zinc-200 text-black shadow-[8px_8px_0_0_#4ade80]" : 
                    isCurrent ? "bg-zinc-100 text-black scale-[1.02] shadow-[12px_12px_0_0_#ff00ff]" : 
                    "bg-zinc-900 text-zinc-600 opacity-60 grayscale shadow-[8px_8px_0_0_#000]"
                   }`}>
                
                {/* Checkpoint Node */}
                <div className={`w-16 h-16 border-4 border-black flex items-center justify-center text-xl font-bold shrink-0 shadow-[4px_4px_0_0_#000] ${
                  isCompleted ? "bg-green-500 text-white" : isCurrent ? "bg-pink-500 text-white animate-pulse" : "bg-zinc-700"
                }`}>
                  {isCompleted ? "✓" : batch.batchNumber}
                </div>

                <div className="flex-1">
                  <h3 className={`${pixelHeader.className} text-[12px] mb-2 uppercase`}>Sector {batch.batchNumber}</h3>
                  <div className="flex gap-4 text-xs font-bold opacity-70 uppercase">
                    <span>{batch.totalQuestions} Fragments Detected</span>
                  </div>
                </div>

                <div>
                  {!isLocked ? (
                    <Link href={`/topics/${topicId}/${difficulty}/batch/${batch.batchNumber}`}
                          className={`${pixelHeader.className} block px-4 py-3 border-4 border-black text-[8px] shadow-[4px_4px_0_0_#000] active:translate-y-1 active:shadow-none transition-all ${
                            isCompleted ? "bg-zinc-300 text-black" : "bg-black text-white hover:bg-green-500"
                          }`}>
                      {isCompleted ? "RE-SYNC" : "INITIALIZE"} ▶
                    </Link>
                  ) : (
                    <div className="text-2xl opacity-50">🔒</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sync Progress Summary */}
        <div className="mt-20 bg-zinc-100 border-8 border-black p-8 shadow-[12px_12px_0_0_#4ade80] text-black">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className={`${pixelHeader.className} text-[14px] uppercase`}>Total Sync</h3>
              <p className="text-[10px] font-bold opacity-60 uppercase mt-2">
                {completedBatchSet.size} / {batches.length} Sectors Secured
              </p>
            </div>
            <div className={`${pixelHeader.className} text-3xl text-green-600`}>
              {Math.round((completedBatchSet.size / batches.length) * 100)}%
            </div>
          </div>
          
          <div className="w-full bg-black border-4 border-black h-10 p-1">
            <div className="h-full bg-green-500 shadow-[0_0_15px_rgba(74,222,128,0.5)] transition-all duration-1000"
                 style={{ width: `${(completedBatchSet.size / batches.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-50" />
    </div>
  );
}
