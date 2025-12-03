"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  ExternalLink,
  Award
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// Mock data for demonstration
const mockAudits = [
  {
    id: "1",
    contractName: "TokenSwap.sol",
    address: "0x1234...5678",
    riskScore: 25,
    status: "completed",
    timestamp: "2024-12-03T10:30:00Z",
    vulnerabilities: 2,
    chain: "Base Sepolia"
  },
  {
    id: "2", 
    contractName: "LendingPool.sol",
    address: "0xabcd...efgh",
    riskScore: 75,
    status: "completed",
    timestamp: "2024-12-03T09:15:00Z",
    vulnerabilities: 5,
    chain: "Arbitrum Sepolia"
  },
  {
    id: "3",
    contractName: "NFTMarketplace.sol", 
    address: "0x9876...5432",
    riskScore: 10,
    status: "completed",
    timestamp: "2024-12-03T08:45:00Z",
    vulnerabilities: 0,
    chain: "Ethereum Sepolia"
  }
];

const stats = {
  totalAudits: 3,
  averageRiskScore: 37,
  criticalIssues: 1,
  resolvedIssues: 4
};

export default function DashboardPage() {
  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-400";
    if (score >= 60) return "text-orange-400"; 
    if (score >= 40) return "text-yellow-400";
    return "text-green-400";
  };

  const getRiskBadge = (score: number) => {
    if (score >= 80) return "critical";
    if (score >= 60) return "high";
    if (score >= 40) return "medium";
    return "low";
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyber-blue to-white bg-clip-text text-transparent">
            Security Dashboard
          </h1>
          <p className="text-gray-400">
            Monitor your smart contract security audits and track improvements
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Audits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-cyber-blue" />
                  <span className="text-2xl font-bold text-white">{stats.totalAudits}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Avg Risk Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-yellow-400" />
                  <span className={`text-2xl font-bold ${getRiskColor(stats.averageRiskScore)}`}>
                    {stats.averageRiskScore}/100
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Critical Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <span className="text-2xl font-bold text-red-400">{stats.criticalIssues}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Resolved Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-2xl font-bold text-green-400">{stats.resolvedIssues}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Audits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Audits</CardTitle>
                  <CardDescription>
                    Your latest smart contract security analyses
                  </CardDescription>
                </div>
                <Link href="/audit">
                  <Button variant="glow">
                    New Audit
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAudits.map((audit, index) => (
                  <motion.div
                    key={audit.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10 hover:border-cyber-blue/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Shield className="h-5 w-5 text-cyber-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{audit.contractName}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <span>{audit.address}</span>
                          <span>•</span>
                          <span>{audit.chain}</span>
                          <span>•</span>
                          <Clock className="h-3 w-3" />
                          <span>{new Date(audit.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={getRiskBadge(audit.riskScore)}>
                            Risk: {audit.riskScore}/100
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-400">
                          {audit.vulnerabilities} issues found
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {audit.riskScore < 40 && (
                          <Button variant="outline" size="sm">
                            <Award className="h-4 w-4 mr-1" />
                            Mint Badge
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Empty State */}
        {mockAudits.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <CardContent className="text-center py-12">
                <Shield className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  No audits yet
                </h3>
                <p className="text-gray-400 mb-6">
                  Start securing your smart contracts with AI-powered analysis
                </p>
                <Link href="/audit">
                  <Button variant="glow">
                    Run Your First Audit
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
