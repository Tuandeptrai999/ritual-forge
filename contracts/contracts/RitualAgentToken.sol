// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title RitualAgentToken
 * @notice Standardized ERC-20 token for AI Agents launched on Ritual Forge.
 *
 * Tokenomics (fixed for every agent):
 *   - Total Supply:   1,000,000,000 (1 billion)
 *   - Public (85%):  850,000,000  — minted to the public pool immediately
 *   - Creator (15%): 150,000,000  — locked for 180 days (vesting)
 */
contract RitualAgentToken is ERC20, Ownable {
    uint256 public constant TOTAL_SUPPLY = 1_000_000_000 * 10 ** 18;
    uint256 public constant CREATOR_SHARE = (TOTAL_SUPPLY * 15) / 100;
    uint256 public constant PUBLIC_SHARE = TOTAL_SUPPLY - CREATOR_SHARE;

    address public immutable creator;
    uint256 public immutable vestingEndTime;
    bool public vestingClaimed;

    string public agentPrompt;
    string public initialMarketCap;
    uint256 public launchTime;

    event VestingClaimed(address indexed creator, uint256 amount, uint256 timestamp);

    constructor(
        string memory _name,
        string memory _ticker,
        address _creator,
        address _publicPool,
        string memory _prompt,
        string memory _marketCap
    ) ERC20(_name, _ticker) Ownable(_creator) {
        creator = _creator;
        agentPrompt = _prompt;
        initialMarketCap = _marketCap;
        launchTime = block.timestamp;
        vestingEndTime = block.timestamp + 180 days;
        vestingClaimed = false;

        _mint(_publicPool, PUBLIC_SHARE);
        _mint(address(this), CREATOR_SHARE);
    }

    function claimVestedTokens() external {
        require(msg.sender == creator, "Only creator can claim");
        require(block.timestamp >= vestingEndTime, "Tokens still locked");
        require(!vestingClaimed, "Already claimed");
        vestingClaimed = true;
        _transfer(address(this), creator, CREATOR_SHARE);
        emit VestingClaimed(creator, CREATOR_SHARE, block.timestamp);
    }

    function vestingTimeRemaining() external view returns (uint256) {
        if (block.timestamp >= vestingEndTime) return 0;
        return vestingEndTime - block.timestamp;
    }
}
