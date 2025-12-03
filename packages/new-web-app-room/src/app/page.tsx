import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Shield, Zap, Globe, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyber-blue via-white to-cyber-purple bg-clip-text text-transparent">
              DeFiGuard AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              AI-Powered Smart Contract Security Auditor
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Secure your smart contracts with cutting-edge AI analysis using Gemini 2.0 Flash. 
              Get instant vulnerability reports, gas optimizations, and security badges.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/audit">
                <Button variant="glow" size="lg" className="text-lg px-8 py-4">
                  Start Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Advanced Security Features
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Built for NullShot Hacks Season 0 - Track 1b with enterprise-grade security analysis
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="h-full hover:border-cyber-blue/50 transition-colors">
                <CardHeader>
                  <Shield className="h-8 w-8 text-cyber-blue mb-2" />
                  <CardTitle>AI-Powered Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Advanced vulnerability detection using Gemini 2.0 Flash with MCP architecture
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="h-full hover:border-cyber-blue/50 transition-colors">
                <CardHeader>
                  <Globe className="h-8 w-8 text-cyber-blue mb-2" />
                  <CardTitle>Multi-Chain Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Supports Base Sepolia, Arbitrum Sepolia, and Ethereum Sepolia testnets
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="h-full hover:border-cyber-blue/50 transition-colors">
                <CardHeader>
                  <Zap className="h-8 w-8 text-cyber-blue mb-2" />
                  <CardTitle>Instant Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Get comprehensive security reports in seconds with actionable fixes
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="h-full hover:border-cyber-blue/50 transition-colors">
                <CardHeader>
                  <Award className="h-8 w-8 text-cyber-blue mb-2" />
                  <CardTitle>NFT Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Mint security certification NFTs for audited contracts on-chain
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Card className="border-cyber-blue/20 bg-gradient-to-r from-cyber-blue/5 to-cyber-purple/5">
              <CardContent className="py-12">
                <h3 className="text-3xl font-bold mb-4 text-white">
                  Ready to Secure Your Smart Contracts?
                </h3>
                <p className="text-gray-300 mb-8 text-lg">
                  Join the future of smart contract security with AI-powered auditing
                </p>
                <Link href="/audit">
                  <Button variant="glow" size="lg" className="text-lg px-8 py-4">
                    Start Your First Audit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


