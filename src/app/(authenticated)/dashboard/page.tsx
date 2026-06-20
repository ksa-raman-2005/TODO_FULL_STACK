"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import React, { useCallback, useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Todo } from "@/src/generated";
import { 
  Search, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Loader2, 
  Sparkles, 
  Crown, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  CheckSquare,
  LayoutDashboard,
  Zap,
  Layers3,
  CreditCard,
  ShieldAlert
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Dashboard() {
    const { user } = useUser();
    const { signOut } = useClerk();
    const router = useRouter();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodoTitle, setNewTodoTitle] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [debounceSearchTerm] = useDebounceValue(searchTerm, 300);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // Fetch Todos Function
    const fetchTodos = useCallback(async (page: number) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/todos?page=${page}&search=${debounceSearchTerm}`);
            if (!response.ok) throw new Error("Todo fetching failed...");
            const data = await response.json();
            setTodos(data.todos || []);
            setTotalPages(data.totalPages || 1);
            setCurrentPage(data.currentPage || 1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [debounceSearchTerm]);

    // Track Subscription Status
    const fetchSubscriptionStatus = async () => {
        try {
            const response = await fetch("/api/subscription");
            if (!response.ok) throw new Error("Fetching subscription failed...");
            const data = await response.json();
            setIsSubscribed(data.isSubscribed);
        } catch (error) {
            console.error(error);
        }
    };

    // Trigger Fetching Data Lifecycle
    useEffect(() => {
        fetchTodos(1);
        fetchSubscriptionStatus();
    }, [fetchTodos]);

    // Handlers
    const handleAddTodoSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodoTitle.trim()) return;
        setErrorMsg("");
        try {
            const response = await fetch("/api/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newTodoTitle })
            });
            if (!response.ok) {
                const data = await response.json();
                setErrorMsg(data.error || "Failed to add todo");
                return;
            }
            setNewTodoTitle("");
            await fetchTodos(currentPage);
        } catch (error: any) {
            console.error(error);
            setErrorMsg(error.message || "An unexpected error occurred");
        }
    };

    const handleUpdateTodo = async (id: string, completed: boolean) => {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed })
            });
            if (!response.ok) throw new Error("Failed to update todo");
            await fetchTodos(currentPage);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteTodo = async (id: string) => {
        try {
            const response = await fetch(`/api/todos/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete todo");
            await fetchTodos(currentPage);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden antialiased selection:bg-purple-500/30 selection:text-white [perspective:1200px]">
            
            {/* 🌌 Cosmic 3D Ambient Plasma Fields */}
            <div className="absolute top-[-25%] left-[-15%] w-[80rem] h-[80rem] rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent blur-[140px] pointer-events-none transform -translate-z-50" />
            <div className="absolute bottom-[-20%] right-[-15%] w-[70rem] h-[70rem] rounded-full bg-gradient-to-tr from-pink-500/10 via-fuchsia-500/5 to-transparent blur-[130px] pointer-events-none transform -translate-z-50" />
            
            {/* ⚡ Perspective Cyber Grid Matrix */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#3341550f_1px,transparent_1px),linear-gradient(to_bottom,#3341550f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Floating 3D geometric mesh accents */}
            <div className="absolute top-40 right-[10%] w-72 h-72 bg-gradient-to-br from-indigo-500/3 to-purple-500/3 border border-white/5 rounded-[40px] rotate-12 [transform:rotateX(25deg)_rotateY(-25deg)] blur-sm pointer-events-none hidden lg:block" />
            <div className="absolute bottom-40 left-[8%] w-80 h-80 bg-gradient-to-tr from-pink-500/2 to-indigo-500/2 border border-white/5 rounded-[60px] -rotate-12 [transform:rotateX(-15deg)_rotateY(35deg)] blur-xs pointer-events-none hidden lg:block" />

            {/* 🛰️ Immersive Floating Glass Navbar */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/70 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
                <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                            <LayoutDashboard size={20} className="animate-pulse" />
                        </div>
                        <span className="font-black text-xl tracking-tighter bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            TaskFlow <span className="text-xs font-bold font-mono tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-md ml-1.5 uppercase">Deck</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-5">
                        {isSubscribed ? (
                            <div className="relative group/badge">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur opacity-40 animate-pulse" />
                                <span className="relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-gray-950 text-amber-300 border border-amber-500/30">
                                    <Crown size={14} className="text-amber-400 animate-bounce" /> PREMIUM MATRIX
                                </span>
                            </div>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold font-mono tracking-wider bg-gray-900/60 text-slate-400 border border-white/5 shadow-inner">
                                FREE SUITE
                            </span>
                        )}

                        <div className="h-6 w-[1px] bg-white/10" />

                        {user && (
                            <div className="flex items-center gap-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="relative p-0.5 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 shadow-[0_0_15px_rgba(99,102,241,0.2)] cursor-pointer hover:scale-105 transition-all duration-300 outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-950">
                                            <img 
                                                src={user.imageUrl} 
                                                alt="User Terminal Profile" 
                                                className="w-9 h-9 rounded-full object-cover bg-slate-950"
                                            />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-slate-950 border border-white/10 text-slate-200 rounded-xl p-1.5 min-w-[160px] shadow-2xl z-50">
                                        {user?.publicMetadata?.role === "admin" && (
                                            <DropdownMenuItem asChild>
                                                <Link href="/admin/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-purple-400 font-bold focus:text-purple-300 focus:bg-white/5 cursor-pointer transition-colors duration-200">
                                                    <ShieldAlert className="h-4 w-4" />
                                                    <span>Admin Panel</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem asChild>
                                            <Link href="/subscribe" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white focus:text-white focus:bg-white/5 cursor-pointer transition-colors duration-200">
                                                <CreditCard className="h-4 w-4" />
                                                <span>Subscribe</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <div className="h-[1px] bg-white/5 my-1" />
                                        <DropdownMenuItem onClick={() => signOut()} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-rose-400 hover:text-rose-300 focus:text-rose-300 focus:bg-rose-500/10 cursor-pointer transition-colors duration-200">
                                            <LogOut className="h-4 w-4" />
                                            <span>Sign out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* 🔮 3D Immersive Main Deck Content */}
            <main className="relative max-w-3xl mx-auto px-4 py-14 space-y-10 [transform-style:preserve-3d]">
                
                {/* Greeting Terminal Node */}
                <div className="space-y-2 [transform:translateZ(30px)]">
                    <div className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.25em] font-black text-indigo-400">
                        <Zap size={12} className="inline" /> Operations System Active
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">{user?.firstName || 'Operator'}</span>
                    </h1>
                    <p className="text-slate-400 text-sm font-medium">
                        Coordinate execution parameters, real-time index filtering, and operational states.
                    </p>
                </div>

                {/* 💳 3D Layer Holographic Upgrade Card Indicator */}
                {errorMsg && (
                    <div className="relative group overflow-hidden rounded-2xl p-[1px] bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 shadow-[0_15px_40px_rgba(236,72,153,0.2)] transition-all duration-500 [transform:translateZ(40deg)] hover:scale-[1.01]">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <div className="bg-slate-950/90 backdrop-blur-2xl rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-pink-500/10 rounded-xl text-pink-400 border border-pink-500/20 shadow-inner shrink-0">
                                    <Sparkles size={22} className="animate-spin duration-[4000ms]" />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="text-base font-black text-white tracking-tight bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Memory Allocation Bound Reached</h4>
                                    <p className="text-xs text-slate-400 font-medium leading-relaxed">{errorMsg}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => router.push("/subscribe")}
                                className="w-full md:w-auto bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider px-6 h-12 rounded-xl transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] active:scale-95 cursor-pointer shrink-0"
                            >
                                Upgrade Instance
                            </button>
                        </div>
                    </div>
                )}

                {/* 🛠️ Dynamic Integrated Search & Action Deployment Platform */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 [transform:translateZ(20px)]">
                    <div className="relative md:col-span-5 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 w-4 h-4 transition-colors" />
                        <input 
                            type="text"
                            placeholder="Filter task array vector..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-13 bg-slate-900/40 border border-white/10 focus:border-indigo-500 rounded-xl pl-11 pr-4 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                        />
                    </div>

                    <form onSubmit={handleAddTodoSubmit} className="flex gap-3 md:col-span-7">
                        <input 
                            type="text"
                            placeholder="Initialize a new operation instance..."
                            value={newTodoTitle}
                            onChange={(e) => {
                                setNewTodoTitle(e.target.value);
                                if (errorMsg) setErrorMsg("");
                            }}
                            className="flex-1 h-13 bg-slate-900/40 border border-white/10 focus:border-purple-500 rounded-xl px-5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                        />
                        <button 
                            type="submit"
                            className="h-13 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-bold text-xs uppercase tracking-wider px-6 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(168,85,247,0.25)] flex items-center gap-2 shrink-0 cursor-pointer hover:brightness-110 active:scale-[0.97]"
                        >
                            <Plus size={16} /> Deploy Node
                        </button>
                    </form>
                </div>

                {/* 💎 Main 3D Perspective Glass Task Panel Deck */}
                <div className="relative group/deck [transform:rotateX(7deg)] hover:[transform:rotateX(2deg)] transition-all duration-500 border border-white/10 bg-slate-950/40 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
                    
                    {/* Inner high-tech linear trim layout */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    
                    {loading ? (
                        /* Premium Kinetic Loader Block */
                        <div className="p-8 space-y-5">
                            {[1, 2, 3].map((n) => (
                                <div key={n} className="flex items-center gap-4 animate-pulse">
                                    <div className="w-5 h-5 bg-white/5 border border-white/10 rounded-full" />
                                    <div className="flex-1 h-5 bg-white/5 border border-white/5 rounded-lg" />
                                    <div className="w-8 h-5 bg-white/5 border border-white/5 rounded-md" />
                                </div>
                            ))}
                        </div>
                    ) : todos.length > 0 ? (
                        /* Loaded Array List Records */
                        <div className="divide-y divide-white/5">
                            {todos.map((todo) => (
                                <div 
                                    key={todo.id} 
                                    className="group flex items-center justify-between px-6 py-4.5 hover:bg-white/[0.02] transition-colors relative"
                                >
                                    {/* Responsive left glowing interaction bar */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-b ${
                                        todo.completed ? 'from-emerald-500 to-teal-500' : 'from-indigo-500 to-purple-500'
                                    }`} />
                                    
                                    <div className="flex items-center gap-4 flex-1 min-w-0 [transform:translateZ(10px)]">
                                        <button 
                                            onClick={() => handleUpdateTodo(todo.id, !todo.completed)}
                                            className="text-slate-600 hover:text-indigo-400 transition-all duration-200 cursor-pointer shrink-0 hover:scale-110 active:scale-90"
                                        >
                                            {todo.completed ? (
                                                <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/10 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]" />
                                            ) : (
                                                <Circle className="w-5 h-5 stroke-[1.5]" />
                                            )}
                                        </button>
                                        <span className={`text-sm tracking-wide font-medium truncate transition-all duration-300 ${
                                            todo.completed ? "text-slate-600 line-through decoration-slate-700 font-normal" : "text-slate-200"
                                        }`}>
                                            {todo.title}
                                        </span>
                                    </div>

                                    <button 
                                        onClick={() => handleDeleteTodo(todo.id)}
                                        className="p-2 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all ml-4 cursor-pointer hover:scale-105 active:scale-95"
                                        title="Purge row node"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* High-End Spatial Empty State Console */
                        <div className="p-16 text-center flex flex-col items-center justify-center space-y-4">
                            <div className="bg-white/5 p-4 rounded-2xl text-slate-500 border border-white/5 shadow-inner">
                                <Layers3 className="w-6 h-6 text-indigo-400 animate-pulse" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-bold text-slate-200 tracking-tight text-base">Buffer Array Empty</h3>
                                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                                    {searchTerm ? "No local nodes matched your keyword query criteria sequence." : "Initialize your dashboard execution flow by injecting your first task card node layout above."}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Integrated Control Telemetry Paginator Ring */}
                    {totalPages > 1 && (
                        <div className="border-t border-white/5 px-6 py-4 bg-gray-950/40 flex items-center justify-between">
                            <span className="text-xs font-mono tracking-wide text-slate-500">
                                INDEX POOL <strong className="text-indigo-400 font-bold">{currentPage}</strong> // <strong className="text-slate-400 font-medium">{totalPages}</strong>
                            </span>
                            
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => fetchTodos(currentPage - 1)}
                                    disabled={currentPage === 1 || loading}
                                    aria-label="Previous page array index"
                                    className="p-2 bg-white/5 border border-white/5 rounded-xl text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer hover:bg-white/10 active:scale-95"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <button 
                                    onClick={() => fetchTodos(currentPage + 1)}
                                    disabled={currentPage === totalPages || loading}
                                    aria-label="Next page array index"
                                    className="p-2 bg-white/5 border border-white/5 rounded-xl text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer hover:bg-white/10 active:scale-95"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}