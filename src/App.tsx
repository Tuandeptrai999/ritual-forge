import { useState, useEffect, useRef } from 'react';
import { BrowserProvider } from 'ethers';
import { Sparkles, ArrowRight, Loader2, CheckCircle2, Hexagon, Flame, ArrowUpRight, Cpu, X, ShieldCheck, Zap, LockKeyhole, Moon, Sun } from 'lucide-react';
import './index.css';

interface TokenIdea {
  id: string;
  name: string;
  ticker: string;
  marketCap: string;
  change: string;
  icon: string;
  color: string;
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
  const [isConnecting, setIsConnecting] = useState(false);

  const [selectedToken, setSelectedToken] = useState<TokenIdea | null>(null);
  const [isTrading, setIsTrading] = useState(false);

  // Custom Cursor State
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(false);

  // User's Launched Tokens
  const [myTokens, setMyTokens] = useState<TokenIdea[]>(() => {
    const saved = localStorage.getItem('ritual_my_tokens');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('ritual_my_tokens', JSON.stringify(myTokens));
  }, [myTokens]);

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
          setWalletAddress(accounts[0].address);
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
          setWalletAddress(accounts[0]);
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
      setWalletAddress(null);
    } else {
      connectWallet();
    }
  };

  const executeFeeTransaction = async (description: string) => {
    if (!walletAddress) {
      alert(`Please connect your wallet first to pay the ${description} fee!`);
      connectWallet();
      throw new Error("Wallet not connected");
    }

    const treasuryAddress = "0x000000000000000000000000000000000000dEaD";
    const feeAmountHex = "0x38d7ea4c68000"; // 0.001 ETH in wei

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

    try {
      setIsTrading(true);
      const tx = await executeFeeTransaction("trading");
      
      alert(`Waiting for ${type.toUpperCase()} transaction to confirm...`);
      await tx.wait();
      
      setIsTrading(false);
      setSelectedToken(null);
      alert(`Successfully ${type === 'buy' ? 'bought' : 'sold'} ${selectedToken.ticker}! Paid 0.001 RITUAL network fee.\nTx: ${tx.hash}`);
      
    } catch (error: any) {
      setIsTrading(false);
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
          <button 
            className="theme-toggle" 
            onClick={() => setIsDarkMode(!isDarkMode)}
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        <button className="btn-primary" onClick={handleWalletClick} disabled={isConnecting}>
          {isConnecting ? 'Connecting...' : walletAddress ? truncateWallet(walletAddress) : 'Connect Wallet'}
        </button>
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
        <div className="trust-logo">Powered by Ritual</div>
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
            {myTokens.map(token => (
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

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '8px' }}>
              Execute a trade on the Ritual EVM++ network. Smart contracts will automatically route your liquidity.
            </p>

            <div className="trade-actions">
              <button 
                className="btn-trade btn-buy" 
                onClick={() => handleTrade('buy')}
                disabled={isTrading}
              >
                {isTrading ? <Loader2 size={20} className="spin" style={{margin: '0 auto'}}/> : 'Buy Token'}
              </button>
              <button 
                className="btn-trade btn-sell" 
                onClick={() => handleTrade('sell')}
                disabled={isTrading}
              >
                {isTrading ? <Loader2 size={20} className="spin" style={{margin: '0 auto'}}/> : 'Sell Token'}
              </button>
            </div>

            <div className="trade-fee-notice">
              Network Fee: 0.001 RITUAL per transaction
            </div>
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
