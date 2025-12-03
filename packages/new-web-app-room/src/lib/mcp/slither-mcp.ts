import { MCPServer, MCPTool } from "@/lib/nullshot/types";

export class SlitherMCP extends MCPServer {
  name = "slither-analyzer";
  description = "Static analysis MCP server for smart contract security";
  
  tools: MCPTool[] = [
    {
      name: "analyze",
      description: "Analyze contract code for vulnerabilities",
      parameters: { 
        contractCode: { type: "string", description: "Solidity contract code" },
        options: { type: "object", description: "Analysis options" }
      },
      execute: async (params: { contractCode: string; options?: any }) => {
        // Simulate static analysis results
        const mockVulnerabilities = this.performStaticAnalysis(params.contractCode);
        return { 
          vulnerabilities: mockVulnerabilities, 
          timestamp: Date.now(),
          analyzer: "slither-mcp"
        };
      },
    },
    {
      name: "check-patterns",
      description: "Check for common vulnerability patterns",
      parameters: { 
        contractCode: { type: "string" },
        patterns: { type: "array", description: "Patterns to check" }
      },
      execute: async (params: { contractCode: string; patterns: string[] }) => {
        const findings = this.checkPatterns(params.contractCode, params.patterns);
        return { findings, timestamp: Date.now() };
      },
    }
  ];

  private performStaticAnalysis(code: string) {
    const vulnerabilities = [];
    
    // Check for reentrancy patterns
    if (code.includes('.call(') && code.includes('msg.value')) {
      vulnerabilities.push({
        type: "Reentrancy",
        severity: "High",
        line: this.findLineNumber(code, '.call('),
        description: "Potential reentrancy vulnerability detected",
        pattern: "external call with value transfer"
      });
    }
    
    // Check for unchecked external calls
    if (code.includes('.call(') && !code.includes('require(')) {
      vulnerabilities.push({
        type: "Unchecked Call",
        severity: "Medium",
        line: this.findLineNumber(code, '.call('),
        description: "External call without return value check",
        pattern: "unchecked external call"
      });
    }
    
    // Check for tx.origin usage
    if (code.includes('tx.origin')) {
      vulnerabilities.push({
        type: "tx.origin Usage",
        severity: "Medium",
        line: this.findLineNumber(code, 'tx.origin'),
        description: "Use of tx.origin for authorization",
        pattern: "tx.origin authentication"
      });
    }
    
    return vulnerabilities;
  }
  
  private checkPatterns(code: string, patterns: string[]) {
    const findings = [];
    
    for (const pattern of patterns) {
      const regex = new RegExp(pattern, 'gi');
      const matches = code.match(regex);
      
      if (matches) {
        findings.push({
          pattern,
          matches: matches.length,
          locations: matches.map(match => this.findLineNumber(code, match))
        });
      }
    }
    
    return findings;
  }
  
  private findLineNumber(code: string, searchTerm: string): number {
    const lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(searchTerm)) {
        return i + 1;
      }
    }
    return 0;
  }
}
