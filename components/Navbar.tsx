"use client";

import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";
import { LogOut, CreditCard, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const { user } = useUser();
  const { signOut } = useClerk();
  
  const role = user?.publicMetadata?.role as string | undefined;
  const isAdmin = role === "admin";

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="shrink-0 flex items-center">
              <span className="ml-2 text-xl font-bold">TodoMaster</span>
            </Link>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest bg-red-500/10 border border-red-500/30 text-red-400 uppercase">
                    <ShieldAlert size={12} className="animate-pulse" />
                    Root Admin
                  </span>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar>
                        <AvatarImage src={user.imageUrl} alt="User avatar" />
                        <AvatarFallback>
                          {user.firstName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin/dashboard" className="flex items-center text-purple-400 focus:text-purple-300">
                          <ShieldAlert className="mr-2 h-4 w-4" />
                          <span className="font-bold">Admin Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/subscribe" className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Subscribe</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Button variant="ghost" asChild className="mr-2">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

