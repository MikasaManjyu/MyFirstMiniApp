import React, { useState } from 'react';
import { X, Zap, AlertCircle } from 'lucide-react';
import { useAccount, useBalance, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { FarcasterCast } from '../types/farcaster';

interface TipModalProps {
  cast: FarcasterCast;
  onClose: () => void;
}

const TIP_AMOUNTS = ['0.001', '0.005', '0.01', '0.05'];

export function TipModal({ cast, onClose }: TipModalProps) {
  const [selectedAmount, setSelectedAmount] = useState('0.005');
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { sendTransaction, isPending, error } = useSendTransaction();

  const handleTip = async () => {
    if (!isConnected || !address) return;
    
    const amount = isCustom ? customAmount : selectedAmount;
    if (!amount || parseFloat(amount) <= 0) return;

    try {
      // Note: In a real app, you'd get the recipient's wallet address from their Farcaster profile
      // For demo purposes, we'll use a placeholder address
      const recipientAddress = '0x742d35Cc6634C0532925a3b8D4C9db96C4b5Da5e'; // Placeholder
      
      await sendTransaction({
        to: recipientAddress as `0x${string}`,
        value: parseEther(amount),
      });
      
      // In a real app, you'd track this tip in a database
      onClose();
    } catch (err) {
      console.error('Tip failed:', err);
    }
  };

  const currentAmount = isCustom ? customAmount : selectedAmount;
  const isValidAmount = currentAmount && parseFloat(currentAmount) > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Send Tip</h2>
              <p className="text-gray-500 text-sm">Reward great content</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <img
                src={cast.author.pfpUrl}
                alt={cast.author.displayName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">{cast.author.displayName}</p>
                <p className="text-gray-500 text-sm">@{cast.author.username}</p>
              </div>
            </div>
            <p className="mt-3 text-gray-700 text-sm line-clamp-3">{cast.text}</p>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tip Amount (ETH)
          </label>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            {TIP_AMOUNTS.map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setSelectedAmount(amount);
                  setIsCustom(false);
                }}
                className={`p-3 rounded-lg border text-center transition-all ${
                  !isCustom && selectedAmount === amount
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {amount} ETH
              </button>
            ))}
          </div>
          
          <div className="relative">
            <input
              type="number"
              step="0.001"
              min="0"
              placeholder="Custom amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setIsCustom(true);
              }}
              onFocus={() => setIsCustom(true)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <span className="absolute right-3 top-3 text-gray-500 text-sm">ETH</span>
          </div>
        </div>

        {balance && (
          <div className="mb-4 text-sm text-gray-600">
            Balance: {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700 text-sm">Transaction failed. Please try again.</span>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleTip}
            disabled={!isConnected || !isValidAmount || isPending}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {isPending ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Send Tip</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}