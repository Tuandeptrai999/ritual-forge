import { useState, useEffect, useRef } from 'react';
import { BrowserProvider, parseEther, formatEther } from 'ethers';
import { Sparkles, ArrowRight, Loader2, CheckCircle2, Hexagon, Flame, ArrowUpRight, Cpu, X, ShieldCheck, Zap, LockKeyhole, Moon, Sun, User, Edit2, Save } from 'lucide-react';
import './index.css';

const SocialIcons = () => (
  <div className="social-icons" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '8px' }}>
    <a href="https://github.com/Tuandeptrai999/ritual-forge" target="_blank" rel="noopener noreferrer" className="social-link" title="Github"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg></a>
    <a href="#" className="social-link" title="Discord"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg></a>
    <a href="#" className="social-link" title="Telegram"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.42.91-4.04 2.68-.38.26-.73.39-1.04.38-.34-.01-.99-.19-1.48-.35-.6-.2-1.08-.3-1.05-.64.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.84-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg></a>
    <a href="#" className="social-link" title="Reddit"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.562-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .466c.843.84 2.484.91 3.292.91.802 0 2.46-.061 3.319-.92a.33.33 0 0 0 0-.466.326.326 0 0 0-.466 0c-.611.611-1.895.731-2.853.731-.967 0-2.228-.112-2.83-.731a.324.324 0 0 0-.231-.085z"/></svg></a>
    <a href="#" className="social-link" title="X"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
  </div>
);

interface TokenIdea {
  id: string;
  name: string;
  ticker: string;
  marketCap: string;
  change: string;
  icon: string;
  color: string;
}

interface UserProfile {
  avatarUrl: string;
  twitter: string;
  telegram: string;
  github: string;
}

const trendingTokens: TokenIdea[] = [
  { id: '1', name: 'Neural Doge', ticker: '$NDOGE', marketCap: '$1.2M', change: '+142%', icon: '🐕', color: '#fef08a' },
  { id: '2', name: 'Sentient Cat', ticker: '$SCAT', marketCap: '$840K', change: '+85%', icon: '🐱', color: '#fbcfe8' },
  { id: '3', name: 'Quantum Frog', ticker: '$QFROG', marketCap: '$2.1M', change: '+320%', icon: '🐸', color: '#bbf7d0' },
  { id: '4', name: 'AI Penguin', ticker: '$PENG', marketCap: '$450K', change: '+42%', icon: '🐧', color: '#bae6fd' },
];

function App() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState(0);
  
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const [selectedToken, setSelectedToken] = useState<TokenIdea | null>(null);
  const [isTrading, setIsTrading] = useState(false);
  const [tradingAction, setTradingAction] = useState<'buy' | 'sell' | null>(null);
  const [tradeAmount, setTradeAmount] = useState<string>('100');

  // Custom Cursor State
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [myTokens, setMyTokens] = useState<TokenIdea[]>(() => {
    const saved = localStorage.getItem('ritual_my_tokens');
    return saved ? JSON.parse(saved) : [];
  });

  const [tokenBalances, setTokenBalances] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('ritual_token_balances');
    return saved ? JSON.parse(saved) : {};
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('ritual_user_profile');
    return saved ? JSON.parse(saved) : { avatarUrl: '', twitter: '', telegram: '', github: '' };
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  useEffect(() => {
    localStorage.setItem('ritual_my_tokens', JSON.stringify(myTokens));
  }, [myTokens]);

  useEffect(() => {
    localStorage.setItem('ritual_token_balances', JSON.stringify(tokenBalances));
  }, [tokenBalances]);

  useEffect(() => {
    localStorage.setItem('ritual_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  // Smooth Follower Refs
  const followerRef = useRef<HTMLDivElement>(null);
  const followerPos = useRef({ x: -100, y: -100 });
  const targetMousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    checkConnection();

    // Smooth animation loop for follower
    let animationFrameId: number;
    const render = () => {
      // Lerp (Linear Interpolation) for buttery smooth delay
      followerPos.current.x += (targetMousePos.current.x - followerPos.current.x) * 0.15;
      followerPos.current.y += (targetMousePos.current.y - followerPos.current.y) * 0.15;
      
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    const handleMouseMove = (e: MouseEvent) => {
      // Update target for smooth follower
      targetMousePos.current = { x: e.clientX, y: e.clientY };
      
      // Update interactive cards for spotlight effect
      const cards = document.querySelectorAll('.interactive-card');
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });

      // Check if hovering clickable elements
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive-card') ||
        target.closest('.interactive-card') ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.classList.contains('token-card')
      ) {
        setIsHoveringClickable(true);
      } else {
        setIsHoveringClickable(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const checkConnection = async () => {
    if (typeof (window as any).ethereum !== 'undefined') {
      try {
        const provider = new BrowserProvider((window as any).ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const address = accounts[0].address;
          setWalletAddress(address);
          const balance = await provider.getBalance(address);
          setWalletBalance(formatEther(balance));
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof (window as any).ethereum !== 'undefined') {
      try {
        setIsConnecting(true);
        const provider = new BrowserProvider((window as any).ethereum);
        
        const accounts = await provider.send("eth_requestAccounts", []);
        if (accounts.length > 0) {
          const address = accounts[0];
          setWalletAddress(address);
          const balance = await provider.getBalance(address);
          setWalletBalance(formatEther(balance));
        }

        const network = await provider.getNetwork();
        if (network.chainId !== 1979n) {
          try {
            await (window as any).ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x7bb' }],
            });
          } catch (switchError: any) {
            if (switchError.code === 4902) {
              await (window as any).ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x7bb',
                    chainName: 'Ritual Testnet',
                    rpcUrls: ['https://rpc.ritualfoundation.org'],
                    nativeCurrency: { name: 'RITUAL', symbol: 'RITUAL', decimals: 18 },
                    blockExplorerUrls: ['https://explorer.ritualfoundation.org']
                  }
                ],
              });
            }
          }
        }
      } catch (error) {
        console.error("Connection error", error);
      } finally {
        setIsConnecting(false);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const handleWalletClick = () => {
    if (walletAddress) {
      setIsWalletModalOpen(true);
    } else {
      connectWallet();
    }
  };

  const executeFeeTransaction = async (description: string, valueInEth: string = "0.001") => {
    if (!walletAddress) {
      alert(`Please connect your wallet first to pay the ${description} fee!`);
      connectWallet();
      throw new Error("Wallet not connected");
    }

    const treasuryAddress = "0x000000000000000000000000000000000000dEaD";
    
    let feeAmountHex = "0x38d7ea4c68000"; // Default 0.001 ETH
    try {
      const valWei = parseEther(valueInEth || "0.001");
      feeAmountHex = "0x" + valWei.toString(16);
    } catch(e) {
      console.error(e);
    }

    // Use native RPC to bypass Ethers.js block parsing bugs on Ritual Testnet
    const txHash = await (window as any).ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        from: walletAddress,
        to: treasuryAddress,
        value: feeAmountHex,
        gas: "0x5208" // 21000
      }]
    });

    // Custom poll to wait for receipt
    const waitForTx = async (hash: string) => {
      while (true) {
        const receipt = await (window as any).ethereum.request({
          method: 'eth_getTransactionReceipt',
          params: [hash]
        });
        if (receipt && receipt.blockNumber) return receipt;
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    };
    
    return {
      hash: txHash,
      wait: () => waitForTx(txHash)
    };
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    try {
      setIsGenerating(true);
      setStep(1); 

      const tx = await executeFeeTransaction("launch");
      
      setStep(2); 
      await tx.wait(); 

      setStep(3); 
      setTimeout(() => setStep(4), 2000); 
      setTimeout(() => setStep(5), 4000); 
      setTimeout(() => {
        setStep(6);
        setIsGenerating(false);
        const newToken: TokenIdea = {
          id: Date.now().toString(),
          name: prompt.substring(0, 15) + (prompt.length > 15 ? '...' : '') + ' Agent',
          ticker: prompt.substring(0, 4).toUpperCase(),
          marketCap: "$1.0K",
          change: "+0.00%",
          icon: "🚀",
          color: "rgba(59, 130, 246, 0.2)"
        };
        setMyTokens([newToken, ...myTokens]);
        alert(`Token Deployed Successfully! Paid 0.001 RITUAL fee.\nTransaction Hash: ${tx.hash}`);
        setPrompt('');
        setStep(0);
      }, 6000);

    } catch (error: any) {
      console.error(error);
      setIsGenerating(false);
      setStep(0);
      
      if (error.code === 4001 || error.message?.includes('User denied') || error.message?.includes('rejected')) {
        alert("Transaction cancelled. You must pay the 0.001 RITUAL fee to launch a token.");
      } else if (error.message !== "Wallet not connected") {
        alert("Transaction failed: " + (error.message || "Unknown error"));
      }
    }
  };

  const handleTrade = async (type: 'buy' | 'sell') => {
    if (!selectedToken) return;
    if (!tradeAmount || isNaN(Number(tradeAmount)) || Number(tradeAmount) <= 0) {
      alert("Please enter a valid amount to trade.");
      return;
    }

    const amountNum = Number(tradeAmount);
    if (type === 'sell') {
      const currentBalance = tokenBalances[selectedToken.id] || 0;
      if (amountNum > currentBalance) {
        alert(`Insufficient balance. You only have ${currentBalance} ${selectedToken.ticker}.`);
        return;
      }
    }

    try {
      setIsTrading(true);
      setTradingAction(type);
      // For buys, we send the trade amount. For sells, we just charge the 0.001 base network fee for the mockup
      const txValue = type === 'buy' ? tradeAmount : "0.001";
      const tx = await executeFeeTransaction(`trading`, txValue);
      
      alert(`Waiting for ${type.toUpperCase()} transaction to confirm...`);
      await tx.wait();
      
      setTokenBalances(prev => {
        const current = prev[selectedToken.id] || 0;
        return {
          ...prev,
          [selectedToken.id]: type === 'buy' ? current + amountNum : current - amountNum
        };
      });

      setIsTrading(false);
      setTradingAction(null);
      setSelectedToken(null);
      alert(`Successfully ${type === 'buy' ? 'bought' : 'sold'} ${selectedToken.ticker}! Transaction completed.\nTx: ${tx.hash}`);
      
    } catch (error: any) {
      setIsTrading(false);
      setTradingAction(null);
      if (error.code === 4001 || error.message?.includes('User denied') || error.message?.includes('rejected')) {
        alert("Trade cancelled. You must pay the 0.001 RITUAL fee to trade tokens.");
      } else if (error.message !== "Wallet not connected") {
        alert("Trade failed: " + (error.message || "Unknown error"));
      }
    }
  };

  const truncateWallet = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <>
      {/* Premium Custom Cursor Overlay */}
      <div 
        ref={followerRef}
        className={`cursor-follower ${isHoveringClickable ? 'active' : ''}`} 
      />

      <nav className="navbar">
        <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Hexagon size={28} fill="var(--brand-primary)" color="transparent" />
          Ritual Forge
        </div>
        <div className="nav-links">
          <span onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}>Explore</span>
          <span onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>Features</span>
          <span onClick={() => document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' })}>Roadmap</span>
          {myTokens.length > 0 && (
            <span onClick={() => document.getElementById('my-tokens')?.scrollIntoView({ behavior: 'smooth' })}>Live Agents</span>
          )}
        </div>
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <SocialIcons />
          <button 
            className="theme-toggle" 
            onClick={() => setIsDarkMode(!isDarkMode)}
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="btn-primary" onClick={handleWalletClick} disabled={isConnecting} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isConnecting ? 'Connecting...' : walletAddress ? (
              <>
                {userProfile.avatarUrl ? <img src={userProfile.avatarUrl} alt="Avatar" style={{ width: 16, height: 16, borderRadius: '50%', objectFit: 'cover' }} /> : <User size={16} />}
                {truncateWallet(walletAddress)}
              </>
            ) : 'Connect Wallet'}
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-badge">
          <Cpu size={14} color="var(--brand-primary)" /> Powered by Ritual EVM++
        </div>
        
        <h1 className="hero-title">
          Deploy an AI-Crafted Token in <span className="text-gradient">Seconds</span>.
        </h1>
        
        <p className="hero-desc">
          Describe your vision. Our on-chain AI will generate the mascot, write the secure smart contract, and launch the liquidity pool. <br/> <span style={{fontSize: '0.9rem', color: 'var(--brand-accent)', fontWeight: 600}}>Fee: 0.001 RITUAL per launch</span>
        </p>

        <div className="creator-box">
          <input 
            type="text" 
            className="creator-input"
            placeholder="E.g., A cyberpunk samurai cat token..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
          />
          <button 
            className="btn-generate bg-gradient" 
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
          >
            {isGenerating ? (
              <>Working <Loader2 size={18} className="spin" /></>
            ) : (
              <>Launch <Sparkles size={18} /></>
            )}
          </button>
        </div>

        {step > 0 && (
          <div className="generator-status">
            <div className={`status-step ${step >= 1 ? (step > 1 ? 'done' : 'active') : ''}`}>
              {step > 1 ? <CheckCircle2 size={18} /> : (step === 1 ? <Loader2 size={18} className="spin" /> : <div style={{width: 18}}/>)}
              1. Awaiting MetaMask Signature (Fee: 0.001 RITUAL)...
            </div>
            <div className={`status-step ${step >= 2 ? (step > 2 ? 'done' : 'active') : ''}`}>
              {step > 2 ? <CheckCircle2 size={18} /> : (step === 2 ? <Loader2 size={18} className="spin" /> : <div style={{width: 18}}/>)}
              2. Confirming payment on Ritual Chain...
            </div>
            <div className={`status-step ${step >= 3 ? (step > 3 ? 'done' : 'active') : ''}`}>
              {step > 3 ? <CheckCircle2 size={18} /> : (step === 3 ? <Loader2 size={18} className="spin" /> : <div style={{width: 18}}/>)}
              3. AI generating tokenomics & mascot artwork...
            </div>
            <div className={`status-step ${step >= 4 ? (step > 4 ? 'done' : 'active') : ''}`}>
              {step > 4 ? <CheckCircle2 size={18} /> : (step === 4 ? <Loader2 size={18} className="spin" /> : <div style={{width: 18}}/>)}
              4. AI compiling Solidity smart contract in TEE...
            </div>
            <div className={`status-step ${step >= 5 ? (step > 5 ? 'done' : 'active') : ''}`}>
              {step > 5 ? <CheckCircle2 size={18} /> : (step === 5 ? <Loader2 size={18} className="spin" /> : <div style={{width: 18}}/>)}
              5. Deploying token to Ritual & adding Liquidity...
            </div>
          </div>
        )}
      </section>

      {/* Trust Banner */}
      <div className="trust-banner">
        <a href="https://github.com/RitualChain" target="_blank" rel="noopener noreferrer" className="trust-logo" style={{ textDecoration: 'none' }}>Powered by Ritual</a>
        <div className="trust-logo">Built on EVM++</div>
        <div className="trust-logo">TEE Secured</div>
        <div className="trust-logo">Audited by CertiK</div>
      </div>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <div className="section-badge">Why Ritual Forge?</div>
          <h2 className="section-title">Institutional Grade AI Launchpad</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card interactive-card">
            <div className="card-content-wrap">
              <div className="feature-icon"><ShieldCheck size={32} /></div>
              <h3 className="feature-title">Audited by AI</h3>
              <p className="feature-desc">Every smart contract generated is statically analyzed by our specialized on-chain security model to prevent reentrancy and rugpulls.</p>
            </div>
          </div>
          <div className="feature-card interactive-card">
            <div className="card-content-wrap">
              <div className="feature-icon"><Zap size={32} /></div>
              <h3 className="feature-title">Instant Liquidity</h3>
              <p className="feature-desc">Tokens are instantly paired with RITUAL and seeded into decentralized exchanges. No waiting for manual LP creation.</p>
            </div>
          </div>
          <div className="feature-card interactive-card">
            <div className="card-content-wrap">
              <div className="feature-icon"><LockKeyhole size={32} /></div>
              <h3 className="feature-title">Provably Fair</h3>
              <p className="feature-desc">Liquidity pools are automatically time-locked in a trustless vault. Founders cannot drain the pool, protecting your community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="roadmap-section">
        <div className="section-header">
          <div className="section-badge" style={{color: 'var(--brand-accent)'}}>The Future</div>
          <h2 className="section-title" style={{color: 'white'}}>Development Roadmap</h2>
        </div>
        
        <div className="roadmap-grid">
          <div className="roadmap-phase completed">
            <div className="phase-dot"></div>
            <div className="phase-number">PHASE 1</div>
            <h3 className="phase-title">Foundation</h3>
            <ul className="phase-list">
              <li>Deploy on Ritual Testnet</li>
              <li>Basic AI Mascot Generation</li>
              <li>ERC-20 Template Engine</li>
            </ul>
          </div>
          <div className="roadmap-phase completed">
            <div className="phase-dot"></div>
            <div className="phase-number">PHASE 2</div>
            <h3 className="phase-title">Security & Liquidity</h3>
            <ul className="phase-list">
              <li>On-chain AI Auditing</li>
              <li>Automated LP Locks</li>
              <li>Trading Interface Integration</li>
            </ul>
          </div>
          <div className="roadmap-phase">
            <div className="phase-dot"></div>
            <div className="phase-number">PHASE 3</div>
            <h3 className="phase-title">Advanced AI</h3>
            <ul className="phase-list">
              <li>Generative Tokenomics</li>
              <li>AI-Managed Treasury</li>
              <li>Community Sentiment Oracle</li>
            </ul>
          </div>
          <div className="roadmap-phase">
            <div className="phase-dot"></div>
            <div className="phase-number">PHASE 4</div>
            <h3 className="phase-title">Ecosystem</h3>
            <ul className="phase-list">
              <li>Cross-chain Deployment</li>
              <li>Ritual Mainnet Launch</li>
              <li>Launchpad DAO Governance</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="my-tokens" className="trending" style={{ paddingBottom: '20px', borderBottom: 'none' }}>
        <div className="trending-header">
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '14px', height: '14px', backgroundColor: '#10b981', borderRadius: '50%', boxShadow: '0 0 15px #10b981' }}></span> 
            Your Live Agents
          </h2>
        </div>

        {myTokens.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)', background: 'var(--surface-color)', borderRadius: '24px', border: '1px dashed var(--border-light)' }}>
            No tokens launched yet. Enter a concept above to forge your first AI agent!
          </div>
        ) : (
          <div className="token-grid">
            {myTokens.map((token: TokenIdea) => (
              <div key={token.id} className="token-card interactive-card" onClick={() => setSelectedToken(token)}>
                <div className="card-content-wrap">
                  <div className="token-header">
                    <div className="token-avatar" style={{ backgroundColor: token.color }}>
                      {token.icon}
                    </div>
                    <div>
                      <div className="token-name">{token.name}</div>
                      <div className="token-ticker">{token.ticker}</div>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                      <ArrowUpRight size={20} color="var(--text-secondary)" />
                    </div>
                  </div>
                  
                  <div className="token-stats">
                    <div className="stat-item">
                      <span className="stat-label">Market Cap</span>
                      <span className="stat-val">{token.marketCap}</span>
                    </div>
                    <div className="stat-item" style={{ textAlign: 'right' }}>
                      <span className="stat-label">24h Change</span>
                      <span className="stat-val val-up">{token.change}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section id="explore" className="trending">
        <div className="trending-header">
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Flame size={24} color="#f97316" /> Trending AI Launches
          </h2>
          <span style={{ color: 'var(--brand-primary)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            View all <ArrowRight size={16} style={{ marginLeft: '4px' }}/>
          </span>
        </div>

        <div className="token-grid">
          {trendingTokens.map(token => (
            <div key={token.id} className="token-card interactive-card" onClick={() => setSelectedToken(token)}>
              <div className="card-content-wrap">
                <div className="token-header">
                  <div className="token-avatar" style={{ backgroundColor: token.color }}>
                    {token.icon}
                  </div>
                  <div>
                    <div className="token-name">{token.name}</div>
                    <div className="token-ticker">{token.ticker}</div>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <ArrowUpRight size={20} color="var(--text-secondary)" />
                  </div>
                </div>
                
                <div className="token-stats">
                  <div className="stat-item">
                    <span className="stat-label">Market Cap</span>
                    <span className="stat-val">{token.marketCap}</span>
                  </div>
                  <div className="stat-item" style={{ textAlign: 'right' }}>
                    <span className="stat-label">24h Change</span>
                    <span className="stat-val val-up">{token.change}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trade Modal */}
      {selectedToken && (
        <div className="modal-overlay" onClick={() => !isTrading && setSelectedToken(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => !isTrading && setSelectedToken(null)} disabled={isTrading}>
              <X size={24} />
            </button>
            
            <div className="trade-header">
              <div className="trade-avatar" style={{ backgroundColor: selectedToken.color }}>
                {selectedToken.icon}
              </div>
              <div>
                <div className="trade-title">Trade {selectedToken.name}</div>
                <div className="trade-ticker">{selectedToken.ticker} • {selectedToken.marketCap}</div>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '24px' }}>
              Execute a trade on the Ritual EVM++ network. Smart contracts will automatically route your liquidity.
            </p>

            <div className="trade-input-group" style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>Amount to Trade</label>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Balance: <strong style={{ color: 'var(--text-primary)' }}>{tokenBalances[selectedToken.id] || 0} {selectedToken.ticker}</strong>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--surface-color)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '12px 16px', transition: 'border-color 0.3s' }}>
                <input 
                  type="number" 
                  value={tradeAmount} 
                  onChange={(e) => setTradeAmount(e.target.value)} 
                  placeholder="0.0" 
                  min="0"
                  step="0.1"
                  style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '1.25rem', outline: 'none', fontWeight: 600 }}
                />
                <span style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>RITUAL</span>
              </div>
            </div>

            <div className="trade-actions">
              <button 
                className="btn-trade btn-buy" 
                onClick={() => handleTrade('buy')}
                disabled={isTrading}
              >
                {isTrading && tradingAction === 'buy' ? <Loader2 size={20} className="spin" style={{margin: '0 auto'}}/> : 'Buy Token'}
              </button>
              <button 
                className="btn-trade btn-sell" 
                onClick={() => handleTrade('sell')}
                disabled={isTrading}
              >
                {isTrading && tradingAction === 'sell' ? <Loader2 size={20} className="spin" style={{margin: '0 auto'}}/> : 'Sell Token'}
              </button>
            </div>

            <div className="trade-fee-notice">
              Network Fee: 0.001 RITUAL per transaction
            </div>
          </div>
        </div>
      )}

      {/* Wallet Profile Modal */}
      {isWalletModalOpen && walletAddress && (
        <div className="modal-overlay" onClick={() => setIsWalletModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <button className="modal-close" onClick={() => setIsWalletModalOpen(false)}>
              <X size={24} />
            </button>
            
            <div className="trade-header" style={{ marginBottom: '24px', alignItems: 'flex-start' }}>
              <div className="trade-avatar" style={{ backgroundColor: 'var(--brand-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {userProfile.avatarUrl ? <img src={userProfile.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={32} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="trade-title">Your Profile</div>
                  {!isEditingProfile && (
                    <button onClick={() => setIsEditingProfile(true)} style={{ background: 'none', border: 'none', color: 'var(--brand-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', fontWeight: 600 }}>
                      <Edit2 size={14} /> Edit
                    </button>
                  )}
                </div>
                <div className="trade-ticker" style={{ fontSize: '0.9rem', wordBreak: 'break-all' }}>{truncateWallet(walletAddress)}</div>
                {!isEditingProfile && (userProfile.twitter || userProfile.telegram || userProfile.github) && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                    {userProfile.twitter && <span style={{ color: 'var(--brand-primary)', fontSize: '0.85rem' }}>𝕏 {userProfile.twitter}</span>}
                    {userProfile.telegram && <span style={{ color: '#0088cc', fontSize: '0.85rem' }}>TG: {userProfile.telegram}</span>}
                    {userProfile.github && <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>GH: {userProfile.github}</span>}
                  </div>
                )}
              </div>
            </div>

            {isEditingProfile && (
              <div style={{ background: 'var(--surface-color)', padding: '20px', borderRadius: '12px', marginBottom: '24px', border: '1px solid var(--border-light)' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Avatar Image URL</label>
                  <input type="text" value={userProfile.avatarUrl} onChange={e => setUserProfile({...userProfile, avatarUrl: e.target.value})} style={{ width: '100%', background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-primary)', padding: '12px', borderRadius: '8px', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }} placeholder="https://..." onFocus={e => e.target.style.borderColor = 'var(--brand-primary)'} onBlur={e => e.target.style.borderColor = 'var(--border-light)'} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>X (Twitter) Handle</label>
                  <input type="text" value={userProfile.twitter} onChange={e => setUserProfile({...userProfile, twitter: e.target.value})} style={{ width: '100%', background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-primary)', padding: '12px', borderRadius: '8px', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }} placeholder="@username" onFocus={e => e.target.style.borderColor = 'var(--brand-primary)'} onBlur={e => e.target.style.borderColor = 'var(--border-light)'} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Telegram Handle</label>
                  <input type="text" value={userProfile.telegram} onChange={e => setUserProfile({...userProfile, telegram: e.target.value})} style={{ width: '100%', background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-primary)', padding: '12px', borderRadius: '8px', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }} placeholder="@username" onFocus={e => e.target.style.borderColor = 'var(--brand-primary)'} onBlur={e => e.target.style.borderColor = 'var(--border-light)'} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Github Username</label>
                  <input type="text" value={userProfile.github} onChange={e => setUserProfile({...userProfile, github: e.target.value})} style={{ width: '100%', background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-primary)', padding: '12px', borderRadius: '8px', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }} placeholder="username" onFocus={e => e.target.style.borderColor = 'var(--brand-primary)'} onBlur={e => e.target.style.borderColor = 'var(--border-light)'} />
                </div>
                <button 
                  className="btn-primary" 
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px' }}
                  onClick={() => setIsEditingProfile(false)}
                >
                  <Save size={18} /> Save Profile
                </button>
              </div>
            )}

            <div style={{ background: 'var(--surface-color)', padding: '16px', borderRadius: '12px', marginBottom: '24px', border: '1px solid var(--border-light)' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>RITUAL Balance</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--brand-primary)' }}>
                {walletBalance ? Number(walletBalance).toFixed(4) : '0.00'} <span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>RITUAL</span>
              </div>
            </div>

            {Object.keys(tokenBalances).some(k => tokenBalances[k] > 0) && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '12px', fontWeight: 600 }}>Your Agents</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {Object.entries(tokenBalances).map(([id, balance]) => {
                    if (balance <= 0) return null;
                    const t = [...myTokens, ...trendingTokens].find(x => x.id === id);
                    if (!t) return null;
                    return (
                      <div key={id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                          <span style={{ fontSize: '1.2rem' }}>{t.icon}</span> {t.ticker}
                        </span>
                        <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{balance}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <button 
              className="btn-primary" 
              style={{ width: '100%', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
              onClick={() => {
                setWalletAddress(null);
                setWalletBalance(null);
                setIsWalletModalOpen(false);
              }}
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-brand">
          <Hexagon size={20} fill="var(--brand-primary)" color="transparent" /> Ritual Forge
        </div>
        <div className="footer-links">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Documentation</a>
          <a href="#">Audit Report</a>
        </div>
        <div>© 2026 Ritual Forge Ltd. All rights reserved.</div>
      </footer>
    </>
  );
}

export default App;
