import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export interface Vulnerability {
  type: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  line: number;
  description: string;
  exploitScenario: string;
  fix: string;
  similarExploits: string[];
}

export interface VulnerabilityAnalysis {
  vulnerabilities: Vulnerability[];
  riskScore: number;
  gasOptimizations: string[];
  bestPractices: string[];
  summary: string;
}

export async function analyzeContractWithGemini(code: string): Promise<VulnerabilityAnalysis> {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    generationConfig: {
      temperature: 0.2,
      topP: 0.95,
      maxOutputTokens: 8192,
    },
  });

  const prompt = `Analyze this Solidity smart contract for security vulnerabilities. Return ONLY valid JSON:

\`\`\`solidity
${code}
\`\`\`

JSON format:
{
  "vulnerabilities": [
    {
      "type": "string",
      "severity": "Critical|High|Medium|Low",
      "line": number,
      "description": "string",
      "exploitScenario": "string",
      "fix": "string",
      "similarExploits": ["string"]
    }
  ],
  "riskScore": number (0-100),
  "gasOptimizations": ["string"],
  "bestPractices": ["string"],
  "summary": "string"
}

Focus on: reentrancy, overflow/underflow, access control, front-running, flash loan attacks, oracle manipulation, and gas optimization.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean the response to extract JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }
    
    const analysis = JSON.parse(jsonMatch[0]) as VulnerabilityAnalysis;
    
    // Validate the response structure
    if (!analysis.vulnerabilities || !Array.isArray(analysis.vulnerabilities)) {
      throw new Error("Invalid response structure");
    }
    
    return analysis;
  } catch (error) {
    console.error("Error analyzing contract:", error);
    
    // Return a fallback analysis
    return {
      vulnerabilities: [
        {
          type: "Analysis Error",
          severity: "Medium",
          line: 0,
          description: "Unable to complete full analysis. Please check your contract syntax and try again.",
          exploitScenario: "N/A",
          fix: "Verify contract syntax and ensure all imports are available.",
          similarExploits: []
        }
      ],
      riskScore: 50,
      gasOptimizations: ["Unable to analyze gas optimizations"],
      bestPractices: ["Ensure proper testing", "Use established patterns", "Follow security guidelines"],
      summary: "Analysis incomplete due to processing error. Please review contract manually."
    };
  }
}

export function calculateRiskScore(vulnerabilities: Vulnerability[]): number {
  if (vulnerabilities.length === 0) return 0;
  
  const severityWeights = {
    Critical: 40,
    High: 25,
    Medium: 10,
    Low: 5
  };
  
  const totalScore = vulnerabilities.reduce((sum, vuln) => {
    return sum + severityWeights[vuln.severity];
  }, 0);
  
  return Math.min(100, totalScore);
}
