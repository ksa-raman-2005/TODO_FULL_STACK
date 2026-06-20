"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Sparkles, Home } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#030712] overflow-hidden antialiased selection:bg-red-500/30 selection:text-white">
      {/* 🌌 High-End Abstract Glow Background Fields */}
      <div className="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] rounded-full bg-gradient-to-br from-red-600/15 via-purple-600/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50rem] h-[50rem] rounded-full bg-gradient-to-tr from-amber-600/10 via-pink-600/5 to-transparent blur-[120px] pointer-events-none" />
      
      {/* ⚡ Animated Neo-Grid Subtle Background Layout */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* 🎴 Dynamic Border Outer Wrapper */}
      <div className="relative w-full max-w-md mx-4 group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-purple-600 to-amber-500 rounded-2xl blur-md opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
        
        {/* 🪄 Main Glassmorphism Presentation Deck */}
        <Card className="relative w-full border border-white/10 bg-gray-950/70 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden text-gray-100">
          
          <CardHeader className="space-y-2 pt-8 px-8 relative overflow-hidden text-center flex flex-col items-center">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div className="flex items-center gap-2 mb-1 justify-center">
              <div className="p-2 rounded-xl bg-gradient-to-br from-red-500/10 to-amber-500/10 border border-red-500/20 text-red-400 shadow-inner">
                <AlertTriangle size={20} className="animate-bounce duration-1000" />
              </div>
            </div>

            <span className="text-xs font-semibold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-400 uppercase block">
              System Disruption Detected
            </span>

            <CardTitle className="text-2xl font-extrabold tracking-tight text-white bg-clip-text mt-1">
              Oops! Something went wrong
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center px-8 pb-8 space-y-6">
            <div className="space-y-3">
              <p className="text-gray-400 text-sm leading-relaxed">
                We encountered an unexpected error configuration. Don&apos;t worry, our automated recovery scripts are already stabilizing the instance.
              </p>
              <p className="text-xs text-purple-400/80 font-medium tracking-wide bg-purple-500/5 border border-purple-500/10 rounded-lg py-2 px-3 inline-block">
                🔄 Automatic warp to home cluster in 5 seconds...
              </p>
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <Button 
              onClick={() => router.push("/")} 
              className="w-full h-12 bg-gradient-to-r from-red-500 via-purple-600 to-amber-600 text-white font-semibold rounded-xl border border-white/10 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
            >
              <div className="flex items-center justify-center gap-2">
                <span>Return to Safe Terminal</span>
                <Home size={16} />
              </div>
            </Button>
          </CardContent>

        </Card>
      </div>
    </div>
  );
}