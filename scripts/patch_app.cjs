const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Update ABI
code = code.replace(
  "// RitualForgeFactory ABI (minimal — only launchAgent)",
  "// RitualForgeFactory ABI (includes totalAgents and events)"
);
code = code.replace(
  "\"function launchAgent(string calldata _name, string calldata _ticker, string calldata _prompt, string calldata _marketCap) external payable returns (address)\",",
  "\"function launchAgent(string calldata _name, string calldata _ticker, string calldata _prompt, string calldata _marketCap) external payable returns (address)\",\n  \"function totalAgents() external view returns (uint256)\",\n  \"function allAgents(uint256) external view returns (address, address, string, string, string, string, uint256)\","
);

// 2. Add event listener in useEffect
const useEffectStr = `
    window.addEventListener('mousemove', handleMouseMove);

    // --- On-Chain Integration ---
    let factoryContract: Contract | null = null;
    
    if (FACTORY_ADDRESS && (window as any).ethereum) {
      const provider = new BrowserProvider((window as any).ethereum);
      factoryContract = new Contract(FACTORY_ADDRESS, FACTORY_ABI, provider);

      // Fetch existing tokens from chain on mount
      const fetchHistorical = async () => {
        try {
          const total = await factoryContract!.totalAgents();
          const totalNum = Number(total);
          
          if (totalNum > 0) {
            const fetchedTokens: TokenIdea[] = [];
            // Fetch the last 10 tokens (or all if < 10)
            const start = Math.max(0, totalNum - 10);
            
            for(let i = totalNum - 1; i >= start; i--) {
               const agentData = await factoryContract!.allAgents(i);
               const tokenAddr = agentData[0];
               const creatorAddr = agentData[1];
               const name = agentData[2];
               const ticker = agentData[3];
               // agentData[4] is prompt
               const mcap = agentData[5];
               
               const creatorShort = \`\${creatorAddr.substring(0, 6)}...\${creatorAddr.substring(creatorAddr.length - 4)}\`;
               
               fetchedTokens.push({
                 id: tokenAddr,
                 name,
                 ticker,
                 marketCap: mcap || "$10k",
                 volume: "$0",
                 trustScore: 99,
                 change: "+0.00%",
                 icon: "🤖",
                 color: "rgba(59, 130, 246, 0.2)",
                 creator: creatorShort
               });
            }
            
            setMyTokens(prev => {
              // Merge, avoiding duplicates
              const map = new Map(prev.map(p => [p.id, p]));
              fetchedTokens.forEach(t => map.set(t.id, t));
              return Array.from(map.values());
            });
          }
        } catch (e) {
          console.error("Failed to fetch historical tokens:", e);
        }
      };

      const onAgentLaunched = (tokenAddress: string, creator: string, name: string, ticker: string, _agentIndex: bigint, _timestamp: bigint) => {
        const creatorShort = \`\${creator.substring(0, 6)}...\${creator.substring(creator.length - 4)}\`;
        const newToken: TokenIdea = {
          id: tokenAddress,
          name,
          ticker,
          marketCap: "$10k",
          volume: "$0",
          trustScore: 99,
          change: "+0.00%",
          icon: "🚀",
          color: "rgba(16, 185, 129, 0.2)",
          creator: creatorShort
        };

        setMyTokens(prev => {
          if (prev.some(t => t.id === newToken.id)) return prev;
          return [newToken, ...prev];
        });
      };

      factoryContract.on("AgentLaunched", onAgentLaunched);
      fetchHistorical();
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (factoryContract) {
         factoryContract.removeAllListeners("AgentLaunched");
      }
    };
  }, []);
`;
code = code.replace(
  "    window.addEventListener('mousemove', handleMouseMove);\n    return () => {\n      window.removeEventListener('mousemove', handleMouseMove);\n      cancelAnimationFrame(animationFrameId);\n    };\n  }, []);",
  useEffectStr
);

// 3. Remove fake token push from handleGenerate since event listener handles it
const generateReplace = `
        setTimeout(() => {
          setStep(7);
          setIsGenerating(false);
          // Wait for on-chain event to update the UI
          alert(\`✅ Token Deployed On-Chain!\\n\\nAgent: \${agentName} (\${ticker.toUpperCase()})\\nTx: \${txHash}\\n\\nView on Explorer:\\nhttps://explorer.ritualfoundation.org/tx/\${txHash}\`);
          setAgentName('');
          setTicker('');
          setPromptModel('');
          setRaiseGoal('');
          setStep(0);
        }, 3000);
`;
const oldGenerateStr = `
        setTimeout(() => {
          setStep(7);
          setIsGenerating(false);
          const newToken: TokenIdea = {
            id: Date.now().toString(),
            name: agentName,
            ticker: ticker.toUpperCase(),
            marketCap: initialMarketCap,
            volume: "$0",
            trustScore: 99,
            change: "+0.00%",
            icon: "🚀",
            color: "rgba(59, 130, 246, 0.2)",
            creator: creatorShort
          };
          setMyTokens([newToken, ...myTokens]);
          alert(\`✅ Token Deployed On-Chain!\\n\\nAgent: \${agentName} (\${ticker.toUpperCase()})\\nTx: \${txHash}\\n\\nView on Explorer:\\nhttps://explorer.ritualfoundation.org/tx/\${txHash}\`);
          setAgentName('');
          setTicker('');
          setPromptModel('');
          setRaiseGoal('');
          setStep(0);
        }, 3000);
`;
code = code.replace(oldGenerateStr, generateReplace);

fs.writeFileSync('src/App.tsx', code);
console.log("App.tsx patched successfully!");
