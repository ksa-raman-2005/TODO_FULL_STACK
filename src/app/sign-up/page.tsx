"use client";
import React, { useState } from 'react';
import { useSignUp } from '@clerk/nextjs/legacy'
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EmailAddress } from '@clerk/nextjs/server';
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Sparkles, UserPlus, KeyRound } from "lucide-react";

const Signup = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [pendingVerification,setPendingVerification] = useState(false);
    const [code,setCode] = useState("");
    const [error,setError] = useState("");
    const [showPassword,setShowPassword] = useState(false);

    const router = useRouter();
    if (!isLoaded) return null;

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        if (!signUp) return;

        try {
            await signUp.create({
                emailAddress: email,
                password,
            });

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });
            setPendingVerification(true);
        } catch (err: any) {
            console.error(err);
            setError(err.errors?.[0]?.longMessage || err.message || "Sign up failed");
        }
    }

    async function onPressVerify(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        if (!signUp) return;

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status !== "complete") {
                console.log(JSON.stringify(completeSignUp, null, 2));
                setError("Verification incomplete. Please check the code.");
                return;
            }

            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                router.push("/dashboard");
            }
        } catch (err: any) {
            console.log(JSON.stringify(err, null, 2));
            setError(err.errors?.[0]?.longMessage || err.message || "An unexpected error occurred");
        }
    }   

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#030712] overflow-hidden antialiased selection:bg-purple-500/30 selection:text-white">
      {/* 🌌 High-End Abstract Glow Background Fields */}
      <div className="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] rounded-full bg-gradient-to-br from-indigo-600/20 via-purple-600/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50rem] h-[50rem] rounded-full bg-gradient-to-tr from-fuchsia-600/15 via-pink-600/5 to-transparent blur-[120px] pointer-events-none" />
      
      {/* ⚡ Animated Neo-Grid Subtle Background Layout */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* 🎴 Dynamic Border Outer Wrapper */}
      <div className="relative w-full max-w-md mx-4 group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-2xl blur-md opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
        
        {/* 🪄 Main Glassmorphism Presentation Deck */}
        <Card className="relative w-full border border-white/10 bg-gray-950/70 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden text-gray-100">
          
          <CardHeader className="space-y-2 pt-8 px-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-purple-500/20 text-purple-400 shadow-inner">
                <Sparkles size={18} className="animate-pulse" />
              </div>
              <span className="text-xs font-semibold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400 uppercase">
                {pendingVerification ? "Security Protocol" : "Deploy New Instance"}
              </span>
            </div>

            <CardTitle className="text-3xl font-extrabold tracking-tight text-white bg-clip-text">
              {pendingVerification ? "Verify Identity" : "Sign Up"}
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm leading-relaxed">
              {pendingVerification 
                ? "Enter the access code transmitted to your email communication layout." 
                : "Configure your master dashboard coordinates to initialize your deployment."}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-4">
            {!pendingVerification ? (
              <form onSubmit={submit} className="space-y-5">
                {/* 📧 Input Container: Email */}
                <div className="space-y-2 group/field">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-400 group-focus-within/field:text-purple-400 transition-colors">
                    Email Architecture
                  </Label>
                  <div className="relative">
                    <Input
                      type="email"
                      id="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 bg-gray-900/40 border-white/10 text-white placeholder:text-gray-600 rounded-xl px-4 transition-all duration-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                    />
                  </div>
                </div>

                {/* 🔑 Input Container: Password */}
                <div className="space-y-2 group/field">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-gray-400 group-focus-within/field:text-purple-400 transition-colors">
                    Security Safe Phrase
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 bg-gray-900/40 border-white/10 text-white placeholder:text-gray-600 rounded-xl pl-4 pr-12 transition-all duration-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-400 transition-colors duration-200"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive" className="border-red-500/30 bg-red-500/10 text-red-200 rounded-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-300">
                    <AlertDescription className="font-medium text-xs tracking-wide">{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full h-12 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white font-semibold rounded-xl border border-white/10 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300 hover:brightness-110 active:scale-[0.98]">
                  <div className="flex items-center justify-center gap-2">
                    <span>Initialize Setup</span>
                    <UserPlus size={16} />
                  </div>
                </Button>
              </form>
            ) : (
              <form onSubmit={onPressVerify} className="space-y-5">
                {/* 🔢 Input Container: Verification Code */}
                <div className="space-y-2 group/field">
                  <Label htmlFor="code" className="text-xs font-bold uppercase tracking-wider text-gray-400 group-focus-within/field:text-purple-400 transition-colors">
                    Passcode Key
                  </Label>
                  <div className="relative">
                    <Input
                      id="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter system code"
                      required
                      className="h-12 bg-gray-900/40 border-white/10 text-white placeholder:text-gray-600 rounded-xl px-4 transition-all duration-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] text-center tracking-widest text-lg font-mono"
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive" className="border-red-500/30 bg-red-500/10 text-red-200 rounded-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-300">
                    <AlertDescription className="font-medium text-xs tracking-wide">{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full h-12 bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 text-white font-semibold rounded-xl border border-white/10 shadow-lg shadow-teal-500/10 hover:shadow-teal-500/20 transition-all duration-300 hover:brightness-110 active:scale-[0.98]">
                  <div className="flex items-center justify-center gap-2">
                    <span>Unlock Portal</span>
                    <KeyRound size={16} />
                  </div>
                </Button>
              </form>
            )}
          </CardContent>

          {/* 🛫 Presentation Interaction Deck Footer */}
          <CardFooter className="flex flex-col space-y-5 pb-8 pt-2 px-8 relative">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <p className="text-sm text-center text-gray-400">
              Already possess access?{" "}
              <Link href="/sign-in" className="font-medium text-purple-400 hover:text-purple-300 transition-colors relative group/link">
                Sign In
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-purple-400 scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left duration-300" />
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;