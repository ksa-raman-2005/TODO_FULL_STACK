"use client";

import Navbar from "@/components/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden antialiased [perspective:1200px]">
      
      {/* 🌊 Fluid Watery Wave Blur Pass (Top Boundary) */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[500px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent rounded-[100%] blur-[120px] pointer-events-none transform -translate-y-1/2" />
      
      {/* ⚡ High-Energy Plasma Flares (Symmetric Ambient Anchors) */}
      <div className="absolute top-[20%] left-[-10%] w-[60rem] h-[60rem] rounded-full bg-gradient-to-tr from-blue-600/5 via-indigo-500/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[55rem] h-[55rem] rounded-full bg-gradient-to-bl from-pink-500/5 via-purple-600/5 to-transparent blur-[130px] pointer-events-none" />
      
      {/* 🌌 Atmospheric Underlying Mesh Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415509_1px,transparent_1px),linear-gradient(to_bottom,#33415509_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] pointer-events-none" />

      {/* 🛰️ Floating Navigation Core Stack */}
      <div className="relative z-50 [transform:translateZ(40px)]">
        <Navbar />
      </div>

      {/* 🔮 Immersive Component Stream Platform */}
      <main className="relative w-full z-10 [transform-style:preserve-3d]">
        {children}
      </main>

    </div>
  );
}