# Cast Rewards - Farcaster Tipping Miniapp

A beautiful miniapp for tipping Farcaster creators directly on Base Sepolia network.

## 🏆 Contest Submission

This miniapp demonstrates:
- **Farcaster Integration**: Browse and search trending casts
- **Base Network**: Direct ETH tipping on Base Sepolia
- **Modern Web3 UX**: Seamless wallet connection and transactions
- **Production Quality**: Beautiful, responsive design ready for real users

## ✨ Features

- 🔥 Browse trending Farcaster casts
- 🔍 Search for specific content and creators
- ⚡ Tip creators with ETH on Base Sepolia network
- 💫 Beautiful, responsive design with smooth animations
- 🔗 Direct wallet integration with RainbowKit
- 📱 Mobile-friendly interface

## 🚀 Quick Start

1. **Clone and install**:
   ```bash
   git clone https://github.com/MikasaManjyu/MyFirstMiniApp.git
   cd MyFirstMiniApp
   npm install
   ```

2. **Setup environment**:
   ```bash
   cp .env.example .env
   ```

3. **Get your API keys**:
   - **BaseDeveloper API Key**: Sign up at [basedeveloper.com](https://basedeveloper.com)
   - **WalletConnect Project ID**: Create a project at [cloud.walletconnect.com](https://cloud.walletconnect.com)

4. **Add keys to `.env`**:
   ```
   VITE_BASE_DEVELOPER_API_KEY=your_api_key_here
   VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
   ```

5. **Start development**:
   ```bash
   npm run dev
   ```

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Blockchain**: Base Sepolia via Wagmi v2
- **Wallet**: RainbowKit
- **Farcaster API**: BaseDeveloper API
- **Icons**: Lucide React

## 🌐 Network Configuration

- **Primary Network**: Base Sepolia (testnet)
- **Fallback**: Base Mainnet
- **RPC**: Base Sepolia official RPC
- **Explorer**: https://sepolia.basescan.org

## 📋 How It Works

1. **Connect Wallet**: Users connect their wallet to Base Sepolia
2. **Browse Content**: View trending Farcaster casts or search for specific content
3. **Tip Creators**: Send ETH tips directly to cast authors
4. **Track Activity**: See transaction history and tip confirmations

## 🎯 Contest Highlights

- **Real Utility**: Solves creator monetization on Farcaster
- **Base Integration**: Leverages Base's low fees for micro-transactions
- **User Experience**: Intuitive interface that feels like Web2
- **Technical Excellence**: Modern React patterns with proper TypeScript
- **Production Ready**: Error handling, loading states, responsive design

## 🔧 Development

The app uses Base Sepolia testnet for development. All transactions are test transactions using testnet ETH.

To get testnet ETH:
1. Visit [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)
2. Connect your wallet
3. Request testnet ETH

## 📦 Build for Production

```bash
npm run build
```

## 🤝 Contributing

This is a contest submission, but feedback and suggestions are welcome!

## 📄 License

MIT License - feel free to use this code for your own projects!