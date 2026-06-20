import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { List, Clock, X, Globe, Users, Sparkles, ArrowRight, Kanban, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[#030712] overflow-hidden antialiased text-gray-100 selection:bg-purple-500/30 selection:text-white">
      
      {/* 🌌 Atmospheric Deep-Space Ambient Lighting Matrix */}
      <div className="absolute top-[-20%] left-[-10%] w-[60rem] h-[60rem] rounded-full bg-gradient-to-br from-indigo-600/15 via-purple-600/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-20%] w-[50rem] h-[50rem] rounded-full bg-gradient-to-tr from-pink-600/10 via-fuchsia-600/5 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[15%] w-[45rem] h-[45rem] rounded-full bg-gradient-to-t from-blue-600/10 via-transparent to-transparent blur-[120px] pointer-events-none" />
      
      {/* ⚡ High-Definition Cybernetic Vector Mesh Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)]" />

      {/* Main Structural Wrapper Container */}
      <div className="relative container mx-auto px-4 py-20 flex-grow max-w-6xl z-10">
        
        {/* 🚀 Cinema-Grade Interactive Hero Master Frame */}
        <div className="relative mb-24 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-35 transition duration-1000 group-hover:duration-300" />
          
          <Card className="relative border border-white/10 bg-gray-950/40 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden p-8 md:p-14">
            {/* Horizontal microline header trim */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
            
            <div className="flex flex-col items-center">
              {/* Dynamic Tag Identifier badge */}
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-purple-500/5 border border-purple-500/20 shadow-inner">
                <Sparkles size={13} className="text-purple-400 animate-pulse" />
                <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-pink-300">
                  Next-Gen Workflow Control
                </span>
              </div>

              <CardHeader className="p-0 mb-6 text-center">
                <CardTitle className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
                  Welcome to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 filter drop-shadow-[0_2px_20px_rgba(168,85,247,0.3)]">
                    TodoMaster
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0 text-center max-w-2xl">
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-normal mb-10">
                  Revolutionize your spatial productivity infrastructure. An ultimate task management control deck engineered precisely for hyper-focused professionals.
                </p>
                
                {/* Dual Symmetric Interaction Trigger Layout */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
                  <Button asChild size="lg" className="h-13 px-8 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white font-semibold rounded-xl border border-white/10 shadow-xl shadow-purple-500/10 hover:shadow-purple-500/25 transition-all duration-300 hover:brightness-110 active:scale-[0.98] text-base group/btn">
                    <Link href="/sign-up" className="flex items-center gap-2">
                      <span>Start Processing Free</span>
                      <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-13 px-8 border-white/10 bg-white/5 backdrop-blur text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 active:scale-[0.98] text-base">
                    <Link href="/sign-in">Secure Sign In</Link>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* 🎛️ Tactical Functional Grid Array (Features) */}
        <div className="mb-24">
          <div className="text-center mb-16 space-y-2">
            <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-purple-400">
              Advanced Specifications
            </h3>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Hyper-Engineered Productivity Pillars
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Spec Card 01: Smart Organization */}
            <div className="relative group/card rounded-2xl overflow-hidden p-[1px] bg-white/5 transition-all duration-500 hover:bg-gradient-to-b hover:from-indigo-500/30 hover:to-transparent hover:shadow-[0_10px_30px_rgba(79,70,229,0.1)]">
              <div className="h-full bg-gray-950/60 backdrop-blur-xl p-8 rounded-2xl flex flex-col items-center text-center">
                <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 text-indigo-400 mb-6 group-hover/card:scale-110 group-hover/card:border-indigo-500/30 group-hover/card:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300">
                  <List className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-white">Smart Organization</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Effortlessly prioritize structural nodes and workflow modules with our signature fluid control architecture interface.
                </p>
              </div>
            </div>

            {/* Spec Card 02: Intelligent Reminders */}
            <div className="relative group/card rounded-2xl overflow-hidden p-[1px] bg-white/5 transition-all duration-500 hover:bg-gradient-to-b hover:from-purple-500/30 hover:to-transparent hover:shadow-[0_10px_30px_rgba(168,85,247,0.1)]">
              <div className="h-full bg-gray-950/60 backdrop-blur-xl p-8 rounded-2xl flex flex-col items-center text-center">
                <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10 text-purple-400 mb-6 group-hover/card:scale-110 group-hover/card:border-purple-500/30 group-hover/card:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300">
                  <Clock className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-white">Intelligent Reminders</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Never trace a missed drop target. Machine-assisted scheduler nodes continually scan your active task fields.
                </p>
              </div>
            </div>

            {/* Spec Card 03: Seamless Collaboration */}
            <div className="relative group/card rounded-2xl overflow-hidden p-[1px] bg-white/5 transition-all duration-500 hover:bg-gradient-to-b hover:from-pink-500/30 hover:to-transparent hover:shadow-[0_10px_30px_rgba(236,72,153,0.1)]">
              <div className="h-full bg-gray-950/60 backdrop-blur-xl p-8 rounded-2xl flex flex-col items-center text-center">
                <div className="p-4 rounded-2xl bg-pink-500/5 border border-pink-500/10 text-pink-400 mb-6 group-hover/card:scale-110 group-hover/card:border-pink-500/30 group-hover/card:shadow-[0_0_20px_rgba(236,72,153,0.15)] transition-all duration-300">
                  <Users className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-white">Seamless Collaboration</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Synchronize execution loops across entire team vectors with real-time multi-threaded datastream propagation.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 📣 Premium Holographic Social Proof Array (Testimonials) */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 rounded-3xl blur-xl opacity-50" />
          
          <Card className="relative border border-white/5 bg-gray-950/20 backdrop-blur-md rounded-3xl overflow-hidden p-8 md:p-12">
            <CardHeader className="p-0 mb-10 text-center">
              <CardTitle className="text-2xl font-bold tracking-tight text-gray-300">
                Validated By Operational Specialists
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
                
                {/* Testimonial Block 01 */}
                <div className="space-y-4 pt-6 md:pt-0 md:px-6 flex flex-col justify-between">
                  <blockquote className="text-gray-300 text-base md:text-lg leading-relaxed font-light italic">
                    &ldquo;TodoMaster radically consolidated our engineering pipeline. The interaction layout is astonishingly crisp and fast.&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3 mt-2 justify-end">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <footer className="text-right text-xs font-bold uppercase tracking-wider text-indigo-400">
                      Sarah J. // Principal Architect
                    </footer>
                  </div>
                </div>

                {/* Testimonial Block 02 */}
                <div className="space-y-4 pt-6 md:pt-0 md:px-8 flex flex-col justify-between">
                  <blockquote className="text-gray-300 text-base md:text-lg leading-relaxed font-light italic">
                    &ldquo;I have integrated dozens of task systems over the years, but this infrastructure operates on a totally unique level.&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3 mt-2 justify-end">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                    <footer className="text-right text-xs font-bold uppercase tracking-wider text-pink-400">
                      Mark T. // Technology Director
                    </footer>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>

      </div>

      {/* 🔮 Lower Interface Footer Ribbon */}
      <footer className="relative border-t border-white/10 bg-gray-950/80 backdrop-blur-md py-10 z-10">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Social Security Anchors */}
          <div className="flex justify-center space-x-6 order-2 md:order-1">
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-200">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.438 9.79 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.762-1.605-2.665-.304-5.467-1.333-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.98-.399 3-.405 1.02.006 2.043.139 3 .405 2.29-1.552 3.295-1.23 3.295-1.23.655 1.653.243 2.874.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.81 1.096.81 2.21 0 1.596-.014 2.884-.014 3.276 0 .32.218.694.825.576C20.565 22.29 24 17.795 24 12.5 24 5.87 18.627.5 12 .5z" />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-200">
              <span className="sr-only">Twitter</span>
              <X className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-200">
              <span className="sr-only">Website</span>
              <Globe className="h-6 w-6" />
            </a>
          </div>

          {/* Legal Meta Arrays */}
          <p className="text-center text-xs text-gray-500 tracking-wide order-1 md:order-2">
            &copy; 2026 TodoMaster Systems. All rights operational. |{" "}
            <Link href="/privacy" className="hover:text-purple-400 transition-colors duration-200">
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link href="/terms" className="hover:text-purple-400 transition-colors duration-200">
              Terms of Service
            </Link>
          </p>

        </div>
      </footer>
    </div>
  );
}