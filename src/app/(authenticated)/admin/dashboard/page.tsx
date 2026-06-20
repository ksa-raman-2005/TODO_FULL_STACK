"use client";

import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { TodoItem } from "@/components/TodoItem";
import { Todo, User } from "@/src/generated";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/Pagination";
import { useDebounceValue } from "usehooks-ts";
import { Search, ShieldAlert, UserCheck, Activity, Layers, Sparkles, DatabaseZap, CheckCircle, Ban } from "lucide-react";

interface UserWithTodos extends User {
  todos: Todo[];
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [debouncedEmail, setDebouncedEmail] = useDebounceValue("", 300);
  const [user, setUser] = useState<UserWithTodos | null>(null);
  const [userRole, setUserRole] = useState("user");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUserData = useCallback(
    async (page: number) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/admin?email=${debouncedEmail}&page=${page}`
        );
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUser(data.user);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
        setUserRole(data.role || "user");
        toast({
          title: "System Scan Success",
          description: "Target memory buffer parsed completely.",
        });
      } catch (error) {
        toast({
          title: "Data Corrupted",
          description: "Failed to map user array vector.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedEmail, toast]
  );

  useEffect(() => {
    if (debouncedEmail) {
      fetchUserData(1);
    }
  }, [debouncedEmail, fetchUserData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setDebouncedEmail(email);
  };

  const handleUpdateSubscription = async () => {
    toast({
      title: "Mutating Privileges",
      description: "Executing pipeline update across cluster...",
    });
    try {
      const response = await fetch("/api/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: debouncedEmail,
          isSubscribed: !user?.isSubscribed,
        }),
      });
      if (!response.ok) throw new Error("Failed to update subscription");
      fetchUserData(currentPage);
      toast({
        title: "Database Mutation Success",
        description: "Subscription tier state updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Pipeline Failure",
        description: "Transaction aborted by safe environment logic.",
        variant: "destructive",
      });
    }
  };

  const handleToggleRole = async () => {
    const newRole = userRole === "admin" ? "user" : "admin";
    toast({
      title: "Mutating Authority Matrix",
      description: `Replicating role update to ${newRole}...`,
    });
    try {
      const response = await fetch("/api/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: debouncedEmail,
          role: newRole,
        }),
      });
      if (!response.ok) throw new Error("Failed to update user role");
      toast({
        title: "Authority Matrix Synced",
        description: `User role changed to ${newRole}.`,
      });
      fetchUserData(currentPage);
    } catch (error) {
      toast({
        title: "Mutation Failed",
        description: "Clerk metadata replication aborted.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTodo = async (id: string, completed: boolean) => {
    toast({
      title: "Updating Node Status",
      description: "Synchronizing atomic indices...",
    });
    try {
      const response = await fetch("/api/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: debouncedEmail,
          todoId: id,
          todoCompleted: completed,
        }),
      });
      if (!response.ok) throw new Error("Failed to update todo");
      fetchUserData(currentPage);
      toast({ title: "Node Updated", description: "Todo state flags successfully recompiled." });
    } catch (error) {
      toast({
        title: "Mutation Aborted",
        description: "Failed to update node properties.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTodo = async (id: string) => {
    toast({
      title: "Purging Task Instance",
      description: "Wiping records from disk sector...",
    });
    try {
      const response = await fetch("/api/admin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todoId: id }),
      });
      if (!response.ok) throw new Error("Failed to delete todo");
      fetchUserData(currentPage);
      toast({ title: "Purge Finalized", description: "Row completely deleted from Neon cluster." });
    } catch (error) {
      toast({
        title: "Purge Blocked",
        description: "Failed to drop task array object.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030712] overflow-hidden antialiased text-gray-100 selection:bg-purple-500/30 selection:text-white py-12 px-4">
      {/* 🌌 High-Performance Background Vector Accents */}
      <div className="absolute top-[-30%] left-[-20%] w-[70rem] h-[70rem] rounded-full bg-gradient-to-br from-indigo-600/10 via-purple-600/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-15%] w-[60rem] h-[60rem] rounded-full bg-gradient-to-tr from-fuchsia-600/10 via-pink-600/5 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto z-10 space-y-8">
        
        {/* 📟 Header Station Badge Layout */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/5 border border-red-500/20 shadow-inner">
            <ShieldAlert size={12} className="text-red-400 animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-400 uppercase">
              Root Level Security Authorization Required
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
            ADMIN{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 filter drop-shadow-[0_2px_15px_rgba(168,85,247,0.25)]">
              DASHBOARD
            </span>
          </h1>
        </div>

        {/* 🔍 Search Pod Terminal Deck */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-2xl blur-md opacity-25 group-hover:opacity-40 transition duration-500" />
          <Card className="relative border border-white/10 bg-gray-950/70 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl">
            <CardHeader className="pb-3 px-6 pt-6 relative">
              <div className="flex items-center gap-2">
                <Search size={16} className="text-purple-400" />
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-gray-300">Query User Instance Database</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter target profile email address..."
                    required
                    className="h-12 bg-gray-900/40 border-white/10 text-white placeholder:text-gray-600 rounded-xl px-4 transition-all duration-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                  />
                </div>
                <Button type="submit" className="h-12 px-6 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white font-semibold rounded-xl border border-white/10 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300 active:scale-[0.98]">
                  Initialize Scan
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* ⚙️ Context Render Controller Block */}
        {isLoading ? (
          <Card className="border border-white/5 bg-gray-950/30 backdrop-blur-md rounded-2xl">
            <CardContent className="text-center py-16 space-y-4 flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-3 border-purple-500/30 border-t-purple-400 rounded-full animate-spin" />
              <p className="text-gray-400 text-sm font-medium tracking-widest uppercase animate-pulse">Syncing pipeline buffer records...</p>
            </CardContent>
          </Card>
        ) : user ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            
            {/* 👤 Vector Section: Target Profile Details */}
            <Card className="border border-white/10 bg-gray-950/70 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl">
              <CardHeader className="border-b border-white/5 px-6 py-4 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <UserCheck size={16} className="text-indigo-400" />
                  <CardTitle className="text-xs font-bold uppercase tracking-widest text-gray-400">Target Analytics Metadata</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-gray-900/30 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block mb-1">Target Account Endpoint</span>
                      <span className="text-xs font-mono text-white break-all">{user.email}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/30 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block mb-1">Authorization Matrix Tier</span>
                      <div className="inline-flex items-center gap-1.5 mt-0.5">
                        <span className={`w-2 h-2 rounded-full ${user.isSubscribed ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                        <span className={`text-sm font-bold ${user.isSubscribed ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {user.isSubscribed ? "Premium Node" : "Standard Sandbox"}
                        </span>
                      </div>
                    </div>
                    {user.subscriptionEnds && (
                      <span className="text-[10px] text-gray-500 font-medium tracking-wide mt-2 block">
                        Expiry: {new Date(user.subscriptionEnds).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <div className="bg-gray-900/30 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block mb-1">Root Authority State</span>
                      <div className="inline-flex items-center gap-1.5 mt-0.5">
                        <span className={`w-2 h-2 rounded-full ${userRole === 'admin' ? 'bg-red-400 animate-pulse' : 'bg-slate-500'}`} />
                        <span className={`text-sm font-bold ${userRole === 'admin' ? 'text-red-400' : 'text-slate-400'}`}>
                          {userRole === 'admin' ? "System Root Admin" : "Standard User"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mt-2">
                  <Button 
                    onClick={handleUpdateSubscription} 
                    className={`w-full h-11 font-semibold rounded-xl border border-white/10 transition-all duration-300 active:scale-[0.98] ${
                      user.isSubscribed 
                        ? "bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20 shadow-lg shadow-red-500/5" 
                        : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20 shadow-lg shadow-emerald-500/5"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {user.isSubscribed ? <Ban size={15} /> : <CheckCircle size={15} />}
                      <span>{user.isSubscribed ? "Deprecate System Tier" : "Inject Full Premium Tier"}</span>
                    </div>
                  </Button>

                  <Button 
                    onClick={handleToggleRole} 
                    className={`w-full h-11 font-semibold rounded-xl border border-white/10 transition-all duration-300 active:scale-[0.98] ${
                      userRole === "admin" 
                        ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/20 shadow-lg shadow-amber-500/5" 
                        : "bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border-purple-500/20 shadow-lg shadow-purple-500/5"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <ShieldAlert size={15} />
                      <span>{userRole === "admin" ? "Revoke Admin Power" : "Authorize Root Admin"}</span>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 📝 Vector Section: Task Pool Memory Arrays */}
            {user.todos.length > 0 ? (
              <Card className="border border-white/10 bg-gray-950/70 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl">
                <CardHeader className="border-b border-white/5 px-6 py-4 bg-white/[0.02] flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers size={16} className="text-pink-400" />
                    <CardTitle className="text-xs font-bold uppercase tracking-widest text-gray-400">Isolated Action Task Matrices</CardTitle>
                  </div>
                  <div className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-400 font-mono tracking-wider font-bold">
                    VOL: {user.todos.length} Rows
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <ul className="space-y-3">
                    {user.todos.map((todo) => (
                      <div key={todo.id} className="relative group/item transition-all duration-300 hover:translate-x-1">
                        <div className="absolute -inset-y-px -left-2 w-[3px] bg-purple-500 rounded-full opacity-0 group-hover/item:opacity-100 transition-all duration-300" />
                        <TodoItem
                          todo={todo}
                          isAdmin={true}
                          onUpdate={handleUpdateTodo}
                          onDelete={handleDeleteTodo}
                        />
                      </div>
                    ))}
                  </ul>
                  
                  {/* Glassmorphic pagination controller footer interface */}
                  <div className="pt-4 border-t border-white/5 flex justify-center bg-gray-950/40 rounded-xl p-2 border border-white/5">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(page) => fetchUserData(page)}
                    />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border border-white/5 bg-gray-950/40 backdrop-blur-md rounded-2xl border-dashed">
                <CardContent className="text-center py-12 flex flex-col items-center justify-center space-y-2">
                  <DatabaseZap size={24} className="text-gray-600 animate-pulse" />
                  <p className="text-gray-500 text-sm font-medium tracking-wide">Target dataset return null: This user account contains 0 functional arrays.</p>
                </CardContent>
              </Card>
            )}
          </div>
        ) : debouncedEmail ? (
          <Card className="border border-red-500/20 bg-red-500/[0.02] backdrop-blur-md rounded-2xl animate-in fade-in duration-300">
            <CardContent className="text-center py-12 flex flex-col items-center justify-center space-y-2">
              <Activity size={24} className="text-red-400/60" />
              <p className="text-red-200/80 text-sm font-semibold tracking-wide">Lookup Failure: No records found indexing the requested string trace.</p>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}