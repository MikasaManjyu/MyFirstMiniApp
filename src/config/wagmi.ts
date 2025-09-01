import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { supportedChains } from './chains';

export const wagmiConfig = getDefaultConfig({
  appName: 'Cast Rewards',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id',
  chains: supportedChains,
  ssr: false,
});