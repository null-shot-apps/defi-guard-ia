import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

export const baseSepolia = defineChain({
  id: 84532,
  name: "Base Sepolia",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpc: "https://sepolia.base.org",
});

export const arbitrumSepolia = defineChain({
  id: 421614,
  name: "Arbitrum Sepolia", 
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpc: "https://sepolia-rollup.arbitrum.io/rpc",
});

export const ethereumSepolia = defineChain({
  id: 11155111,
  name: "Ethereum Sepolia",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpc: "https://rpc.sepolia.org",
});

export const supportedChains = [baseSepolia, arbitrumSepolia, ethereumSepolia];

export function getAuditContract(address: string, chainId: number) {
  const chain = supportedChains.find(c => c.id === chainId) || baseSepolia;
  
  return getContract({
    client,
    address,
    chain,
  });
}

// ABI for the audit registry contract
export const AUDIT_REGISTRY_ABI = [
  {
    "inputs": [
      {"name": "contractAddress", "type": "address"},
      {"name": "riskScore", "type": "uint256"},
      {"name": "ipfsHash", "type": "string"}
    ],
    "name": "registerAudit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "contractAddress", "type": "address"}],
    "name": "getAudit",
    "outputs": [
      {"name": "riskScore", "type": "uint256"},
      {"name": "ipfsHash", "type": "string"},
      {"name": "timestamp", "type": "uint256"},
      {"name": "auditor", "type": "address"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "to", "type": "address"},
      {"name": "contractAddress", "type": "address"},
      {"name": "riskScore", "type": "uint256"}
    ],
    "name": "mintAuditBadge",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

