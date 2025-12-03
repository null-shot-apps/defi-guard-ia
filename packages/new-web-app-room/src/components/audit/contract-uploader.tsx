"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface ContractUploaderProps {
  onContractSubmit: (code: string, address?: string) => void;
  isAnalyzing: boolean;
}

export function ContractUploader({ onContractSubmit, isAnalyzing }: ContractUploaderProps) {
  const [contractCode, setContractCode] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [uploadMethod, setUploadMethod] = useState<"code" | "address">("code");

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.sol')) {
      toast.error("Please upload a .sol file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setContractCode(content);
      toast.success("Contract file uploaded successfully");
    };
    reader.readAsText(file);
  }, []);

  const handleSubmit = () => {
    if (uploadMethod === "code") {
      if (!contractCode.trim()) {
        toast.error("Please provide contract code");
        return;
      }
      onContractSubmit(contractCode);
    } else {
      if (!contractAddress.trim()) {
        toast.error("Please provide contract address");
        return;
      }
      // For address-based analysis, we'll need to fetch the code
      // For now, we'll show a placeholder
      onContractSubmit("// Contract code will be fetched from blockchain", contractAddress);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-cyber-blue" />
          Submit Contract for Analysis
        </CardTitle>
        <CardDescription>
          Upload your smart contract code or provide a contract address for AI-powered security analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Method Selection */}
        <div className="flex gap-4">
          <Button
            variant={uploadMethod === "code" ? "glow" : "outline"}
            onClick={() => setUploadMethod("code")}
            className="flex-1"
          >
            <FileText className="h-4 w-4 mr-2" />
            Upload Code
          </Button>
          <Button
            variant={uploadMethod === "address" ? "glow" : "outline"}
            onClick={() => setUploadMethod("address")}
            className="flex-1"
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Contract Address
          </Button>
        </div>

        {uploadMethod === "code" ? (
          <div className="space-y-4">
            {/* File Upload */}
            <div className="border-2 border-dashed border-cyber-blue/30 rounded-lg p-8 text-center hover:border-cyber-blue/50 transition-colors">
              <Upload className="h-12 w-12 text-cyber-blue mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Drop your .sol file here</p>
              <p className="text-gray-400 mb-4">or click to browse</p>
              <input
                type="file"
                accept=".sol"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="cyber" className="cursor-pointer">
                  Choose File
                </Button>
              </label>
            </div>

            {/* Code Textarea */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Or paste your Solidity code:
              </label>
              <textarea
                value={contractCode}
                onChange={(e) => setContractCode(e.target.value)}
                placeholder="pragma solidity ^0.8.0;

contract MyContract {
    // Your contract code here
}"
                className="w-full h-64 p-4 bg-black/40 border border-white/10 rounded-lg text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-cyber-blue backdrop-blur-sm"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Contract Address:
              </label>
              <Input
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                placeholder="0x..."
                className="font-mono"
              />
            </div>
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-sm text-yellow-200">
                <AlertCircle className="h-4 w-4 inline mr-2" />
                Address-based analysis will fetch the contract code from the blockchain.
                This feature requires the contract to be verified on the block explorer.
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={isAnalyzing || (uploadMethod === "code" ? !contractCode.trim() : !contractAddress.trim())}
          variant="glow"
          className="w-full"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Analyzing Contract...
            </>
          ) : (
            <>
              <AlertCircle className="h-4 w-4 mr-2" />
              Start Security Analysis
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
