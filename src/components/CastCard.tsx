import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, ExternalLink, Zap } from 'lucide-react';
import { FarcasterCast } from '../types/farcaster';
import { TipModal } from './TipModal';

interface CastCardProps {
  cast: FarcasterCast;
}

export function CastCard({ cast }: CastCardProps) {
  const [showTipModal, setShowTipModal] = useState(false);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
        <div className="flex items-start space-x-3">
          <img
            src={cast.author.pfpUrl || '/default-avatar.png'}
            alt={cast.author.displayName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-gray-900 truncate">
                {cast.author.displayName}
              </h3>
              <span className="text-gray-500 text-sm">@{cast.author.username}</span>
              <span className="text-gray-400 text-sm">·</span>
              <span className="text-gray-500 text-sm">{formatTimestamp(cast.timestamp)}</span>
            </div>
            
            <p className="text-gray-800 mb-4 leading-relaxed">{cast.text}</p>
            
            {cast.embeds && cast.embeds.length > 0 && (
              <div className="mb-4">
                {cast.embeds.map((embed, index) => (
                  embed.url && (
                    <a
                      key={index}
                      href={embed.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Link</span>
                    </a>
                  )
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">{cast.reactions}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{cast.replies}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                  <Repeat2 className="w-5 h-5" />
                  <span className="text-sm">{cast.recasts}</span>
                </button>
              </div>
              
              <button
                onClick={() => setShowTipModal(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
              >
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Tip</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showTipModal && (
        <TipModal
          cast={cast}
          onClose={() => setShowTipModal(false)}
        />
      )}
    </>
  );
}