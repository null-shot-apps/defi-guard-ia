"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdweb/client";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-cyber-blue to-cyber-purple">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyber-blue to-white bg-clip-text text-transparent">
              DeFiGuard AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/audit" 
              className="text-gray-300 hover:text-cyber-blue transition-colors"
            >
              Audit Contract
            </Link>
            <Link 
              href="/dashboard" 
              className="text-gray-300 hover:text-cyber-blue transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/about" 
              className="text-gray-300 hover:text-cyber-blue transition-colors"
            >
              About
            </Link>
          </div>

          {/* Connect Wallet Button */}
          <div className="hidden md:flex items-center space-x-4">
            <ConnectButton
              client={client}
              theme="dark"
              connectButton={{
                label: "Connect Wallet",
                style: {
                  background: "linear-gradient(45deg, #00f0ff, #b400ff)",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                  fontWeight: "500",
                }
              }}
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-cyber-blue"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/40 backdrop-blur-md rounded-lg mt-2 border border-white/10">
              <Link
                href="/audit"
                className="block px-3 py-2 text-gray-300 hover:text-cyber-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Audit Contract
              </Link>
              <Link
                href="/dashboard"
                className="block px-3 py-2 text-gray-300 hover:text-cyber-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-300 hover:text-cyber-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="px-3 py-2">
                <ConnectButton
                  client={client}
                  theme="dark"
                  connectButton={{
                    label: "Connect Wallet",
                    style: {
                      background: "linear-gradient(45deg, #00f0ff, #b400ff)",
                      border: "none",
                      borderRadius: "8px",
                      color: "white",
                      fontWeight: "500",
                      width: "100%",
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
