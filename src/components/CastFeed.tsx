import React, { useState, useEffect } from 'react';
import { TrendingUp, Search, RefreshCw } from 'lucide-react';
import { FarcasterCast } from '../types/farcaster';
import { FarcasterService } from '../services/farcaster';
import { CastCard } from './CastCard';

export function CastFeed() {
  const [casts, setCasts] = useState<FarcasterCast[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'trending' | 'search'>('trending');

  const loadTrendingCasts = async () => {
    setLoading(true);
    try {
      const trendingCasts = await FarcasterService.getTrendingCasts(20);
      setCasts(trendingCasts);
    } catch (error) {
      console.error('Failed to load casts:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchCasts = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const searchResults = await FarcasterService.searchCasts(query, 20);
      setCasts(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrendingCasts();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveTab('search');
      searchCasts(searchQuery);
    }
  };

  const handleTrendingClick = () => {
    setActiveTab('trending');
    setSearchQuery('');
    loadTrendingCasts();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={handleTrendingClick}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'trending'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Trending</span>
          </button>
          
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search casts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </form>
          
          <button
            onClick={activeTab === 'trending' ? loadTrendingCasts : () => searchCasts(searchQuery)}
            disabled={loading}
            className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : casts.length > 0 ? (
        <div className="space-y-4">
          {casts.map((cast) => (
            <CastCard key={cast.hash} cast={cast} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No casts found</h3>
          <p className="text-gray-500">
            {activeTab === 'search' 
              ? 'Try searching for different keywords'
              : 'Unable to load trending casts at the moment'
            }
          </p>
        </div>
      )}
    </div>
  );
}