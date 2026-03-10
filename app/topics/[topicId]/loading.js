import { Press_Start_2P, VT323 } from "next/font/google";

const pixelHeader = Press_Start_2P({ weight: "400", subsets: ["latin"] });
const pixelBody = VT323({ weight: "400", subsets: ["latin"] });

function DifficultySkeleton({ accent }) {
  return (
    <div className="border-4 border-black p-6 shadow-[8px_8px_0_0_#000] bg-zinc-900 text-zinc-300 animate-pulse">
      <div className="flex justify-between items-start mb-6 gap-4">
        <div className={`h-4 w-20 ${accent}`} />
        <div className="h-6 w-6 rounded-sm bg-zinc-700" />
      </div>

      <div className="mt-4">
        <div className="flex justify-between mb-2">
          <div className="h-3 w-10 bg-zinc-700" />
          <div className="h-3 w-8 bg-zinc-700" />
        </div>
        <div className="w-full bg-black border-2 border-zinc-700 h-5 p-1">
          <div className="h-full w-1/3 bg-zinc-700" />
        </div>
      </div>

      <div className="mt-10 h-10 bg-zinc-800 border-2 border-zinc-700" />
    </div>
  );
}

export default function Loading() {
  return (
    <div className={`${pixelBody.className} relative min-h-screen bg-[#0a0a0a] text-white px-6 py-20 overflow-hidden`}>
      <div className="absolute inset-0 z-0 [perspective:500px]">
        <div
          className="absolute inset-0 origin-top [transform:rotateX(60deg)] opacity-15 animate-[grid-scroll_1.2s_linear_infinite]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #4ade80 1px, transparent 1px), linear-gradient(to bottom, #4ade80 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="inline-block mb-8 h-4 w-40 bg-green-500/20 border-b-2 border-green-500/50" />

        <header className="mb-16 border-l-8 border-pink-500 pl-6 animate-pulse">
          <div className={`${pixelHeader.className} h-8 w-72 bg-zinc-800 mb-4`} />
          <div className="h-6 w-full max-w-2xl bg-zinc-900" />
        </header>

        <div className="grid gap-8 sm:grid-cols-3">
          <DifficultySkeleton accent="bg-green-500/80" />
          <DifficultySkeleton accent="bg-yellow-500/80" />
          <DifficultySkeleton accent="bg-red-500/80" />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-20" />
    </div>
  );
}
