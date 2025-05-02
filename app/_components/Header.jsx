"use client";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  const { user } = useUser();

  return (
    <div className="px-4 sm:px-10 lg:px-32 xl:px-48 2xl:px-56 py-4 flex justify-between items-center shadow-sm bg-white z-50">
      {/* Logo */}
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={140} height={100} className="w-14 h-14" />
      </Link>

      {/* Middle Links - hidden on mobile */}
      <div className="hidden md:flex gap-8 text-sm font-medium">
        <Link href="/features" className="hover:text-primary transition">Features</Link>
        <Link href="/pricing" className="hover:text-primary transition">Pricing</Link>
        <Link href="/about" className="hover:text-primary transition">About</Link>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex items-center gap-3">
        {user ? (
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        ) : (
          <SignInButton>
            <Button>Get Started</Button>
          </SignInButton>
        )}
        <UserButton />
      </div>

      {/* Hamburger Dropdown - Mobile only */}
      <div className="md:hidden flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 mr-4">
            <DropdownMenuItem asChild>
              <Link href="/features">Features</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/pricing">Pricing</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/about">About</Link>
            </DropdownMenuItem>
            {user ? (
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem asChild>
                <SignInButton>
                  <div className="w-full">Get Started</div>
                </SignInButton>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
