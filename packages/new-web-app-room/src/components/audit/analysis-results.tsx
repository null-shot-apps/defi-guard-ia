"use client";

import { VulnerabilityAnalysis } from "@/lib/gemini/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  CheckCircle, 
  Download,
  Zap,
  BookOpen
} from "lucide-react";
import { motion } from "framer-motion";

interface AnalysisResultsProps {
  analysis: VulnerabilityAnalysis;
  onDownloadReport?: () => void;
  onMintBadge?: () => void;
}

export function AnalysisResults({ analysis, onDownloadReport, onMintBadge }: AnalysisResultsProps) {
  const getSeverityVariant = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical": return "critical";
      case "high": return "high";
      case "medium": return "medium";
      case "low": return "low";
      default: return "secondary";
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-400";
    if (score >= 60) return "text-orange-400";
    if (score >= 40) return "text-yellow-400";
    return "text-green-400";
  };

  const getRiskLabel = (score: number) => {
    if (score >= 80) return "Critical Risk";
    if (score >= 60) return "High Risk";
    if (score >= 40) return "Medium Risk";
    return "Low Risk";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto space-y-6"
    >
      {/* Risk Score Overview */}
      <Card className="border-cyber-blue/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-cyber-blue" />
              Security Analysis Complete
            </div>
            <div className="flex gap-2">
              {onDownloadReport && (
                <Button variant="outline" onClick={onDownloadReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              )}
              {onMintBadge && analysis.riskScore < 60 && (
                <Button variant="glow" onClick={onMintBadge}>
                  <Shield className="h-4 w-4 mr-2" />
                  Mint NFT Badge
                </Button>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Risk Score */}
            <div className="text-center">
              <div className={`text-4xl font-bold ${getRiskColor(analysis.riskScore)}`}>
                {analysis.riskScore}/100
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {getRiskLabel(analysis.riskScore)}
              </div>
            </div>
            
            {/* Vulnerabilities Count */}
            <div className="text-center">
              <div className="text-4xl font-bold text-cyber-blue">
                {analysis.vulnerabilities.length}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Issues Found
              </div>
            </div>
            
            {/* Summary */}
            <div className="text-center">
              <div className="text-sm text-gray-300 leading-relaxed">
                {analysis.summary}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vulnerabilities */}
      {analysis.vulnerabilities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
              Vulnerabilities ({analysis.vulnerabilities.length})
            </CardTitle>
            <CardDescription>
              Security issues detected in your smart contract
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.vulnerabilities.map((vuln, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-black/20 rounded-lg border border-white/10"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge variant={getSeverityVariant(vuln.severity)}>
                        {vuln.severity}
                      </Badge>
                      <h3 className="font-semibold text-white">{vuln.type}</h3>
                      {vuln.line > 0 && (
                        <span className="text-xs text-gray-400">Line {vuln.line}</span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-3">{vuln.description}</p>
                  
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium text-cyber-blue mb-1">Exploit Scenario:</h4>
                      <p className="text-sm text-gray-400">{vuln.exploitScenario}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-green-400 mb-1">Recommended Fix:</h4>
                      <p className="text-sm text-gray-400">{vuln.fix}</p>
                    </div>
                    
                    {vuln.similarExploits.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-yellow-400 mb-1">Similar Exploits:</h4>
                        <div className="flex flex-wrap gap-1">
                          {vuln.similarExploits.map((exploit, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {exploit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Gas Optimizations */}
      {analysis.gasOptimizations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              Gas Optimizations ({analysis.gasOptimizations.length})
            </CardTitle>
            <CardDescription>
              Suggestions to reduce gas costs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analysis.gasOptimizations.map((optimization, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/20"
                >
                  <TrendingUp className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-300">{optimization}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Best Practices */}
      {analysis.bestPractices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-400" />
              Best Practices ({analysis.bestPractices.length})
            </CardTitle>
            <CardDescription>
              Recommendations for secure smart contract development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analysis.bestPractices.map((practice, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 p-3 bg-green-500/5 rounded-lg border border-green-500/20"
                >
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-300">{practice}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Issues Found */}
      {analysis.vulnerabilities.length === 0 && (
        <Card className="border-green-500/20">
          <CardContent className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-400 mb-2">
              No Critical Issues Found!
            </h3>
            <p className="text-gray-400 mb-6">
              Your smart contract appears to follow security best practices.
            </p>
            {onMintBadge && (
              <Button variant="glow" onClick={onMintBadge}>
                <Shield className="h-4 w-4 mr-2" />
                Mint Security Badge NFT
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}


