import React from 'react';
import { WalletProvider } from './components/WalletProvider';
import { Header } from './components/Header';
import { CastFeed } from './components/CastFeed';
import { NetworkStatus } from './components/NetworkStatus';

function App() {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Reward Great Content
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover trending Farcaster casts and tip creators directly on Base network
              </p>
            </div>
            <CastFeed />
          </div>
        </main>
        <NetworkStatus />
      </div>
    </WalletProvider>
  );
}

export default App;