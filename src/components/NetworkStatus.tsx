import React from 'react';
import { useAccount, useChainId } from 'wagmi';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { baseSepolia } from 'viem/chains';

export function NetworkStatus() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  
  if (!isConnected) return null;
  
  const isCorrectNetwork = chainId === baseSepolia.id;
  
  return (
    <div className={`fixed bottom-4 right-4 p-3 rounded-lg shadow-lg ${
      isCorrectNetwork 
        ? 'bg-green-50 border border-green-200' 
        : 'bg-yellow-50 border border-yellow-200'
    }`}>
      <div className="flex items-center space-x-2">
        {isCorrectNetwork ? (
          <>
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 text-sm font-medium">
              Connected to Base Sepolia
            </span>
          </>
        ) : (
          <>
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <span className="text-yellow-800 text-sm font-medium">
              Please switch to Base Sepolia
            </span>
          </>
        )}
      </div>
    </div>
  );
}