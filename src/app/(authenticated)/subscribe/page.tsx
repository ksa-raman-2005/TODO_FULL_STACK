"use client";

import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Crown, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  Loader2, 
  Zap, 
  ShieldCheck,
  Cpu,
  LockKeyhole
} from "lucide-react";

export default function SubscribePage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [alreadySubscribed, setAlreadySubscribed] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    // 1. Check if the user is already subscribed when loading the page
    useEffect(() => {
        const checkCurrentSubscription = async () => {
            try {
                const response = await fetch("/api/subscription");
                if (response.ok) {
                    const data = await response.json();
                    if (data.isSubscribed) {
                        setAlreadySubscribed(true);
                    }
                }
            } catch (err) {
                console.error("Error verification:", err);
            } finally {
                setCheckingStatus(false);
            }
        };

        if (isLoaded && user) {
            checkCurrentSubscription();
        } else if (isLoaded && !user) {
            setCheckingStatus(false);
        }
    }, [isLoaded, user]);

    // 2. Handle upgrading the user account
    const handleUpgrade = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/subscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) {
                throw new Error("Subscription activation failed");
            }

            router.push("/dashboard");
            router.refresh();
        } catch (error) {
            console.error("Subscription Error:", error);
            alert("Something went wrong processing your request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Loading State Guard
    if (!isLoaded || checkingStatus) {
        return (
            <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center space-y-4">
                <div className="relative flex items-center justify-center">
                    <div className="absolute w-12 h-12 rounded-full border border-purple-500/20 animate-ping" />
                    <Loader2 className="w-7 h-7 text-purple-400 animate-spin" />
                </div>
                <p className="text-xs font-mono tracking-[0.2em] text-slate-500 uppercase animate-pulse">Mapping Checkout Port...</p>
            </div>
        );
    }

    // Redirect to login if user isn't authenticated
    if (!user) {
        router.push("/sign-in");
        return null;
    }

    const premiumFeatures = [
        "Unlimited task creation and history storage",
        "Advanced real-time task search filter processing",
        "Priority customer support lines & database clustering",
        "Early access to next-generation collaboration tools"
    ];

    return (
        <div className="relative min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden antialiased selection:bg-purple-500/30 selection:text-white flex flex-col justify-between [perspective:1200px]">
            
            {/* 🌌 Atmospheric Immersive Dark Matter Backdrops */}
            <div className="absolute top-[-30%] left-[-10%] w-[75rem] h-[75rem] rounded-full bg-gradient-to-br from-indigo-600/10 via-purple-600/5 to-transparent blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[65rem] h-[65rem] rounded-full bg-gradient-to-tr from-pink-600/10 via-fuchsia-600/5 to-transparent blur-[130px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415509_1px,transparent_1px),linear-gradient(to_bottom,#33415509_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] pointer-events-none" />

            {/* Top Minimal Floating Header */}
            <header className="relative max-w-5xl w-full mx-auto px-6 h-20 flex items-center justify-between border-b border-white/5 bg-gray-950/20 backdrop-blur-md z-20">
                <button 
                    onClick={() => router.push("/dashboard")}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-all duration-300 cursor-pointer group px-3 py-1.5 rounded-xl border border-white/0 hover:border-white/5 hover:bg-white/5"
                    aria-label="Back to dashboard"
                >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Return to Deck
                </button>
                
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                    <LockKeyhole size={11} className="text-emerald-400" /> SECURE SHELL 256
                </div>
            </header>

            {/* Main Content Checkout 3D Display Frame */}
            <main className="relative flex-1 max-w-lg w-full mx-auto px-4 flex flex-col justify-center py-16 z-10 [transform-style:preserve-3d]">
                
                {/* Visual Section Identifier badge */}
                <div className="text-center mb-10 space-y-2 [transform:translateZ(25px)]">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/5 border border-purple-500/20 shadow-inner">
                        <Sparkles size={12} className="text-purple-400 animate-spin duration-[5000ms]" />
                        <span className="text-[10px] tracking-[0.25em] font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-pink-300 uppercase">
                          Instance Scaling Configuration
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                        Upgrade to{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 filter drop-shadow-[0_2px_15px_rgba(168,85,247,0.25)]">
                          Premium Access
                        </span>
                    </h1>
                    <p className="text-slate-400 text-xs md:text-sm max-w-sm mx-auto font-medium leading-relaxed">
                        Unlock infinite thread allocation processing and isolate complex productivity states.
                    </p>
                </div>

                {/* 💎 Premium Pricing Multi-Layered Glass Deck */}
                <div className="relative group/deck [transform:rotateX(6deg)] hover:[transform:rotateX(1deg)] transition-all duration-500 border border-indigo-500/30 bg-slate-950/50 backdrop-blur-2xl rounded-3xl p-8 shadow-[0_25px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(99,102,241,0.05)] overflow-hidden">
                    
                    {/* Top edge micro gradient boundary lines */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

                    {/* Premium Holographic Absolute Tag */}
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-500 to-purple-600 text-white font-black text-[9px] font-mono tracking-widest px-4 py-1.5 rounded-bl-xl shadow-lg border-l border-b border-white/10 flex items-center gap-1.5 uppercase">
                        <Zap size={11} className="fill-white animate-pulse" /> CLUSTER PRIME
                    </div>

                    <div className="mb-8 space-y-2">
                        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-black text-xs uppercase tracking-[0.2em]">OPERATIONAL LEVEL</h2>
                        <div className="flex items-baseline gap-1 text-white">
                            <span className="text-5xl font-black tracking-tighter bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">$9</span>
                            <span className="text-slate-500 text-xs font-mono tracking-wider uppercase ml-1">/ cycle month</span>
                        </div>
                    </div>

                    <div className="h-[1px] bg-gradient-to-r from-white/5 via-white/10 to-transparent mb-8" />

                    {/* Features Structural Telemetry List */}
                    <ul className="space-y-4 mb-10">
                        {premiumFeatures.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3.5 text-sm group/row">
                                <div className="p-1 rounded-lg bg-indigo-500/5 border border-indigo-500/20 text-indigo-400 group-hover/row:border-indigo-400/50 group-hover/row:shadow-[0_0_10px_rgba(99,102,241,0.3)] transition-all duration-300 shrink-0 mt-0.5">
                                    <CheckCircle2 size={15} className="text-indigo-400" />
                                </div>
                                <span className="text-slate-300 font-medium tracking-wide text-xs md:text-sm leading-relaxed transition-colors group-hover/row:text-white">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Context Reactive Dynamic Trigger Layer */}
                    {alreadySubscribed ? (
                        <div className="w-full h-13 bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 font-bold font-mono tracking-wider text-xs uppercase rounded-xl flex items-center justify-center gap-2 shadow-inner">
                            <Crown size={14} className="fill-emerald-400 animate-pulse" /> Memory Buffer Verified Active
                        </div>
                    ) : (
                        <button 
                            onClick={handleUpgrade}
                            disabled={loading}
                            className="w-full h-13 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:brightness-110 active:scale-[0.98] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_4px_25px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
                        >
                            {loading ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                <>
                                    <Cpu size={14} className="animate-pulse" /> Initialize Access Loop
                                </>
                            )}
                        </button>
                    )}
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 text-center [transform:translateZ(10px)]">
                    <ShieldCheck size={14} className="text-slate-600" /> hot-swap cancellation anytime • priority data propagation applied immediately
                </div>
            </main>

            {/* Bottom Footer Border Segment spacing */}
            <footer className="h-16 border-t border-white/5 bg-gray-950/10" />
        </div>
    );
}