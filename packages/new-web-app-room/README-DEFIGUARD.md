# DeFiGuard AI - Smart Contract Security Auditor

![DeFiGuard AI](https://img.shields.io/badge/DeFiGuard-AI%20Powered-00f0ff?style=for-the-badge)
![NullShot Hacks](https://img.shields.io/badge/NullShot%20Hacks-Season%200%20Track%201b-b400ff?style=for-the-badge)

**AI-Powered Smart Contract Security Auditor** built for NullShot Hacks Season 0 - Track 1b

DeFiGuard AI is a cutting-edge smart contract security auditor that leverages Google's Gemini 2.0 Flash AI model and Model Context Protocol (MCP) architecture to provide instant, comprehensive security analysis of Solidity smart contracts.

## 🚀 Features

- **🤖 AI-Powered Analysis**: Advanced vulnerability detection using Gemini 2.0 Flash
- **⚡ Instant Results**: Get comprehensive security reports in seconds
- **🌐 Multi-Chain Support**: Base Sepolia, Arbitrum Sepolia, Ethereum Sepolia
- **🎨 Glassmorphism UI**: Modern cyber aesthetic with neural network animations
- **🔗 Wallet Integration**: Seamless Web3 wallet connection via Thirdweb
- **🏆 NFT Badges**: Mint security certification NFTs for audited contracts
- **📊 Risk Scoring**: Real-time risk assessment with actionable fixes
- **🔧 MCP Architecture**: Extensible Model Context Protocol integration

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 App Router, TypeScript, Tailwind CSS
- **AI Model**: Google Gemini 2.0 Flash API
- **Web3**: Thirdweb SDK v5, Wagmi, Viem
- **UI Components**: Radix UI, Framer Motion, Lucide React
- **Styling**: Tailwind CSS with custom cyber theme
- **Package Manager**: pnpm (required)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm package manager
- Gemini API key
- Thirdweb client ID

### Installation

1. **Clone and install dependencies**:
   ```bash
   cd packages/new-web-app-room
   pnpm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id_here
   ```

3. **Start development server**:
   ```bash
   pnpm dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:8000`

## 🎯 Usage

### 1. Upload Contract
- Navigate to `/audit`
- Upload a `.sol` file or paste Solidity code
- Alternatively, provide a verified contract address

### 2. AI Analysis
- DeFiGuard AI analyzes your contract using:
  - Static analysis patterns
  - Gemini 2.0 Flash AI model
  - MCP server architecture

### 3. Review Results
- Comprehensive vulnerability report
- Risk score (0-100)
- Gas optimization suggestions
- Security best practices
- Actionable fixes for each issue

### 4. Security Certification
- Download detailed audit reports
- Mint NFT badges for secure contracts
- Track audit history in dashboard

## 🔧 Architecture

### MCP (Model Context Protocol) Integration

DeFiGuard AI implements MCP architecture for extensible AI tooling:

```typescript
// Example MCP Server
export class SlitherMCP extends MCPServer {
  name = "slither-analyzer";
  description = "Static analysis MCP server";
  
  tools: MCPTool[] = [
    {
      name: "analyze",
      description: "Analyze contract code",
      execute: async (params) => {
        // Static analysis logic
      }
    }
  ];
}
```

### AI Agent Architecture

```typescript
export class AuditorAgent extends Agent {
  async analyzeContract(code: string): Promise<VulnerabilityAnalysis> {
    // 1. Static analysis with MCP tools
    // 2. AI analysis with Gemini 2.0 Flash
    // 3. Combine and deduplicate results
    // 4. Generate comprehensive report
  }
}
```

## 🎨 Design System

### Cyber Theme Colors
- **Primary**: Cyan (`#00f0ff`)
- **Secondary**: Purple (`#b400ff`) 
- **Accent**: Pink (`#ff00ea`)
- **Background**: Dark slate with glassmorphism effects

### Key Components
- Glassmorphism cards with backdrop blur
- Neural network animated background
- Gradient text effects
- Glowing buttons and borders
- Smooth Framer Motion animations

## 🔐 Security Features

### Vulnerability Detection
- **Reentrancy attacks**
- **Integer overflow/underflow**
- **Access control issues**
- **Front-running vulnerabilities**
- **Flash loan attacks**
- **Oracle manipulation**
- **Gas optimization opportunities**

### Risk Assessment
- Critical (80-100): Immediate action required
- High (60-79): High priority fixes
- Medium (40-59): Moderate risk
- Low (0-39): Minor improvements

## 🌐 Multi-Chain Support

Currently supports testnets:
- **Base Sepolia** (Chain ID: 84532)
- **Arbitrum Sepolia** (Chain ID: 421614)
- **Ethereum Sepolia** (Chain ID: 11155111)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── audit/             # Contract audit interface
│   ├── dashboard/         # User dashboard
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   └── audit/             # Audit-specific components
├── lib/
│   ├── agents/            # AI agent implementations
│   ├── gemini/            # Gemini AI client
│   ├── mcp/               # MCP server implementations
│   ├── nullshot/          # NullShot types and utilities
│   └── thirdweb/          # Web3 client configuration
└── contracts/             # Smart contract examples
```

## 🏆 NullShot Hacks Season 0 - Track 1b

This project was built for NullShot Hacks Season 0, Track 1b, showcasing:

- **AI Integration**: Advanced use of Gemini 2.0 Flash for security analysis
- **MCP Architecture**: Extensible Model Context Protocol implementation
- **Web3 Integration**: Multi-chain smart contract interaction
- **Modern UI/UX**: Glassmorphism design with neural network aesthetics
- **Real-world Utility**: Practical smart contract security auditing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NullShot Team** for hosting the hackathon
- **Google** for Gemini 2.0 Flash API
- **Thirdweb** for Web3 infrastructure
- **Vercel** for Next.js framework
- **Radix UI** for accessible components

---

**Built with ❤️ for the Web3 security community**

*Secure your smart contracts before they hit mainnet!*
