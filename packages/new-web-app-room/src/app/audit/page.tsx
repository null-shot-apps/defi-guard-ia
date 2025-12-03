"use client";

import { useState } from "react";
import { ContractUploader } from "@/components/audit/contract-uploader";
import { AnalysisResults } from "@/components/audit/analysis-results";
import { AuditorAgent } from "@/lib/agents/auditor-agent";
import { VulnerabilityAnalysis } from "@/lib/gemini/client";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function AuditPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<VulnerabilityAnalysis | null>(null);
  const [auditorAgent] = useState(() => new AuditorAgent());

  const handleContractSubmit = async (code: string) => {
    setIsAnalyzing(true);
    setAnalysis(null);
    
    try {
      toast.info("Starting AI-powered security analysis...");
      
      const result = await auditorAgent.analyzeContract(code);
      setAnalysis(result);
      
      toast.success("Analysis complete! Review the results below.");
    } catch (error) {
      console.error("Analysis failed:", error);
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadReport = async () => {
    if (!analysis) return;
    
    try {
      const report = await auditorAgent.generateAuditReport(analysis);
      const blob = new Blob([report], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `defiguard-audit-report-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success("Report downloaded successfully!");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download report");
    }
  };

  const handleMintBadge = () => {
    toast.info("NFT badge minting coming soon! Connect your wallet to get notified.");
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyber-blue to-white bg-clip-text text-transparent">
            Smart Contract Auditor
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Upload your Solidity contract for comprehensive AI-powered security analysis using Gemini 2.0 Flash
          </p>
        </motion.div>

        <div className="space-y-8">
          <ContractUploader 
            onContractSubmit={handleContractSubmit}
            isAnalyzing={isAnalyzing}
          />
          
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-cyber-blue/10 border border-cyber-blue/20 rounded-lg backdrop-blur-sm">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyber-blue" />
                <span className="text-cyber-blue font-medium">
                  AI analyzing your contract...
                </span>
              </div>
              <p className="text-gray-400 mt-4">
                This may take a few moments while we perform comprehensive security analysis
              </p>
            </motion.div>
          )}
          
          {analysis && (
            <AnalysisResults 
              analysis={analysis}
              onDownloadReport={handleDownloadReport}
              onMintBadge={handleMintBadge}
            />
          )}
        </div>
      </div>
    </div>
  );
}


