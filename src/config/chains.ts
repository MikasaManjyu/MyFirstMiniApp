import { base, baseSepolia } from 'viem/chains';

export const supportedChains = [baseSepolia, base] as const;

export const defaultChain = baseSepolia; // Using Base Sepolia testnet

export const baseConfig = {
  chainId: baseSepolia.id,
  name: 'Base Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.basescan.org',
  rpcUrl: 'https://sepolia.base.org'
};