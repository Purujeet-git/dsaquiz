import { Press_Start_2P, VT323 } from "next/font/google";

const pixelHeader = Press_Start_2P({ weight: "400", subsets: ["latin"] });
const pixelBody = VT323({ weight: "400", subsets: ["latin"] });

function BatchSkeleton() {
  return (
    <div className="relative flex items-center gap-8 p-6 border-4 border-black bg-zinc-900 text-zinc-300 shadow-[8px_8px_0_0_#000] animate-pulse">
      <div className="w-16 h-16 border-4 border-black bg-zinc-700 shrink-0 shadow-[4px_4px_0_0_#000]" />

      <div className="flex-1 space-y-3">
        <div className={`${pixelHeader.className} h-4 w-28 bg-zinc-700`} />
        <div className="h-3 w-40 bg-zinc-800" />
      </div>

      <div className="h-12 w-28 bg-zinc-800 border-4 border-black shadow-[4px_4px_0_0_#000]" />
    </div>
  );
}

export default function Loading() {
  return (
    <div className={`${pixelBody.className} relative min-h-screen bg-[#0a0a0a] text-white flex flex-col overflow-x-hidden`}>
      <div className="absolute inset-0 z-0 [perspective:800px]">
        <div
          className="absolute inset-0 origin-top [transform:rotateX(60deg)] opacity-10 animate-[grid-scroll_2s_linear_infinite]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #4ade80 1px, transparent 1px), linear-gradient(to bottom, #4ade80 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 bg-zinc-100 border-b-8 border-black p-8 text-black shadow-[0_8px_0_0_#4ade80] animate-pulse">
        <div className="max-w-4xl mx-auto">
          <div className="h-4 w-44 bg-zinc-300 mb-6" />
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className={`${pixelHeader.className} h-8 w-56 bg-zinc-300`} />
            <div className="h-10 w-40 border-4 border-black bg-zinc-300 shadow-[4px_4px_0_0_#000]" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl w-full mx-auto px-6 py-20 relative z-10">
        <div className="space-y-12 relative">
          <div className="absolute left-[2.4rem] top-0 bottom-0 w-1 bg-green-900 border-l-2 border-green-500/30 -z-10" />
          <BatchSkeleton />
          <BatchSkeleton />
          <BatchSkeleton />
        </div>

        <div className="mt-20 bg-zinc-100 border-8 border-black p-8 shadow-[12px_12px_0_0_#4ade80] text-black animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-3">
              <div className={`${pixelHeader.className} h-4 w-32 bg-zinc-300`} />
              <div className="h-3 w-40 bg-zinc-300" />
            </div>
            <div className={`${pixelHeader.className} h-8 w-16 bg-zinc-300`} />
          </div>

          <div className="w-full bg-black border-4 border-black h-10 p-1">
            <div className="h-full w-1/2 bg-green-500/60" />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-50" />
    </div>
  );
}
