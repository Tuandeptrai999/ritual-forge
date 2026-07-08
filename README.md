# Ritual Forge - AI Agent Token Launchpad

![Ritual Forge Banner](public/premium_logo.jpg)

**Ritual Forge** is a next-generation, institutional-grade AI Token Launchpad built on the **Ritual chain**. It provides seamless decentralized crowdfunding, fair launch mechanics, and AI agent tokenization with an unparalleled user experience.

🔗 **Live Demo:** [https://ritual-forge-six.vercel.app/](https://ritual-forge-six.vercel.app/)

## ✨ Features

- 🌌 **Immersive UI/UX:** Built with React, Vite, and cutting-edge CSS animations, offering a stunning Dark/Light mode, custom fluid cursor, and spotlight interactive effects.
- 🦊 **Web3 Integration:** Full MetaMask wallet integration via `ethers.js`, automatically supporting seamless network switching to the Ritual Testnet.
- 🤖 **AI-Powered Agent Generation:** Users can define their token concept and generate complete AI agent behaviors and tokenomics in seconds.
- ⛓️ **On-Chain Deployment:** Automatically deploys standard ERC-20 tokens via the `RitualForgeFactory` smart contract.
- 💧 **Standardized Tokenomics:** Every launched AI agent features a 1 Billion token supply. 15% is automatically locked for the creator (180-day vesting) to prevent rug-pulls, ensuring fair distribution.
- ⚡ **Institutional Grade:** Real-time analytics, trending token leaderboards with Market Cap and Trust Scores.

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Vanilla CSS3 with dynamic variables and CSS modules
- **Web3:** ethers.js v6
- **Smart Contracts:** Solidity `^0.8.20`, Hardhat, OpenZeppelin
- **Icons:** Lucide React

## 🚀 Getting Started (Frontend)

To run the frontend locally:

```bash
git clone https://github.com/Tuandeptrai999/ritual-forge.git
cd ritual-forge
npm install
npm run dev
```

The application will start on `http://localhost:5173`.

## 📜 Smart Contracts (Backend)

The project includes smart contracts located in the `contracts/` directory:
- **`RitualAgentToken.sol`**: A standardized ERC-20 token with built-in time-locked vesting.
- **`RitualForgeFactory.sol`**: The factory contract that users interact with to deploy their AI tokens for a small fee.

### Deploying Contracts to Ritual Testnet

1. Get testnet `RITUAL` tokens from the [Ritual Faucet](https://faucet.ritualfoundation.org).
2. Create a `.env` file in the `contracts/` directory:
   ```bash
   cd contracts
   cp .env.example .env
   ```
3. Add your MetaMask private key to `contracts/.env` (DO NOT share this or commit it).
4. Install dependencies and deploy:
   ```bash
   npm install
   npx hardhat run scripts/deploy.js --network ritual_testnet
   ```

## 🌐 Network Information

This dApp is configured to run on the **Ritual Testnet**.
- **Chain ID:** `1979`
- **RPC URL:** `https://rpc.ritualfoundation.org`
- **Currency:** `RITUAL`
- **Deployed Factory Contract:** `0x02a5d02B1Db553E79da1Cb3F63bE2159fA369D23`

## 🛡️ Security Note
This repository has been configured to never track `.env` files or build artifacts (`dist`, `artifacts`, `cache`). Your private keys remain safely local.

## 📄 License

This project is open-source and available under the MIT License.
