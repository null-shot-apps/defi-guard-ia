import { Agent } from "@/lib/nullshot/types";
import { analyzeContractWithGemini, VulnerabilityAnalysis } from "@/lib/gemini/client";
import { SlitherMCP } from "@/lib/mcp/slither-mcp";

export class AuditorAgent extends Agent {
  private slitherMCP: SlitherMCP;

  constructor() {
    super({
      name: "SmartContractAuditor",
      description: "AI-powered smart contract security auditor using Gemini 2.0 Flash",
      model: "gemini-2.0-flash-exp",
      tools: [new SlitherMCP()],
    });
    
    this.slitherMCP = new SlitherMCP();
  }

  async analyzeContract(code: string): Promise<VulnerabilityAnalysis> {
    try {
      console.log("Starting contract analysis...");
      
      // Step 1: Static analysis with Slither MCP
      const staticAnalysis = await this.slitherMCP.invoke("analyze", { contractCode: code });
      console.log("Static analysis completed:", staticAnalysis);
      
      // Step 2: AI analysis with Gemini
      const aiAnalysis = await analyzeContractWithGemini(code);
      console.log("AI analysis completed");
      
      // Step 3: Combine results
      const combinedAnalysis = this.combineAnalyses(staticAnalysis, aiAnalysis);
      
      return combinedAnalysis;
    } catch (error) {
      console.error("Error in contract analysis:", error);
      
      // Fallback analysis
      return {
        vulnerabilities: [
          {
            type: "Analysis Error",
            severity: "Medium",
            line: 0,
            description: "Unable to complete full analysis. Please check your contract and try again.",
            exploitScenario: "N/A",
            fix: "Verify contract syntax and network connectivity.",
            similarExploits: []
          }
        ],
        riskScore: 50,
        gasOptimizations: ["Analysis incomplete"],
        bestPractices: ["Manual review recommended"],
        summary: "Analysis failed - manual review required"
      };
    }
  }

  private combineAnalyses(staticAnalysis: any, aiAnalysis: VulnerabilityAnalysis): VulnerabilityAnalysis {
    // Merge static analysis findings with AI analysis
    const staticVulns = staticAnalysis.vulnerabilities || [];
    const aiVulns = aiAnalysis.vulnerabilities || [];
    
    // Convert static analysis format to match AI analysis format
    const convertedStaticVulns = staticVulns.map((vuln: any) => ({
      type: vuln.type,
      severity: vuln.severity as "Critical" | "High" | "Medium" | "Low",
      line: vuln.line,
      description: vuln.description,
      exploitScenario: `Static analysis detected: ${vuln.pattern}`,
      fix: this.generateFix(vuln.type),
      similarExploits: []
    }));
    
    // Combine and deduplicate vulnerabilities
    const allVulns = [...convertedStaticVulns, ...aiVulns];
    const uniqueVulns = this.deduplicateVulnerabilities(allVulns);
    
    // Recalculate risk score
    const riskScore = this.calculateCombinedRiskScore(uniqueVulns);
    
    return {
      vulnerabilities: uniqueVulns,
      riskScore,
      gasOptimizations: aiAnalysis.gasOptimizations,
      bestPractices: aiAnalysis.bestPractices,
      summary: `Combined analysis found ${uniqueVulns.length} issues. Risk score: ${riskScore}/100`
    };
  }
  
  private deduplicateVulnerabilities(vulns: any[]): any[] {
    const seen = new Set();
    return vulns.filter(vuln => {
      const key = `${vuln.type}-${vuln.line}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  
  private calculateCombinedRiskScore(vulnerabilities: any[]): number {
    if (vulnerabilities.length === 0) return 0;
    
    const severityWeights = {
      Critical: 40,
      High: 25,
      Medium: 10,
      Low: 5
    };
    
    const totalScore = vulnerabilities.reduce((sum: number, vuln: any) => {
      return sum + (severityWeights[vuln.severity as keyof typeof severityWeights] || 5);
    }, 0);
    
    return Math.min(100, totalScore);
  }
  
  private generateFix(vulnType: string): string {
    const fixes: Record<string, string> = {
      "Reentrancy": "Use the checks-effects-interactions pattern and consider using ReentrancyGuard",
      "Unchecked Call": "Always check the return value of external calls using require()",
      "tx.origin Usage": "Use msg.sender instead of tx.origin for authorization checks",
      "Integer Overflow": "Use SafeMath library or Solidity 0.8+ built-in overflow protection",
      "Access Control": "Implement proper access control using OpenZeppelin's Ownable or AccessControl"
    };
    
    return fixes[vulnType] || "Review the code and apply appropriate security measures";
  }

  async generateAuditReport(analysis: VulnerabilityAnalysis, contractAddress?: string): Promise<string> {
    const report = {
      title: "DeFiGuard AI Security Audit Report",
      timestamp: new Date().toISOString(),
      contractAddress: contractAddress || "N/A",
      summary: analysis.summary,
      riskScore: analysis.riskScore,
      vulnerabilities: analysis.vulnerabilities,
      gasOptimizations: analysis.gasOptimizations,
      bestPractices: analysis.bestPractices,
      auditor: "DeFiGuard AI v1.0",
      methodology: "Combined static analysis and AI-powered vulnerability detection"
    };
    
    return JSON.stringify(report, null, 2);
  }
}
