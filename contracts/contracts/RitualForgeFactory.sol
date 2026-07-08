// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./RitualAgentToken.sol";

/**
 * @title RitualForgeFactory
 * @notice Factory contract for launching AI Agent tokens on Ritual Forge.
 *
 * Any user can call launchAgent() with a fee to deploy a new standardized
 * ERC-20 AI Agent Token with built-in vesting and LP-ready tokenomics.
 */
contract RitualForgeFactory is Ownable {
    uint256 public launchFee = 0.001 ether; // 0.001 RITUAL per launch

    struct AgentInfo {
        address tokenAddress;
        address creator;
        string name;
        string ticker;
        string prompt;
        string marketCap;
        uint256 launchTime;
    }

    AgentInfo[] public allAgents;
    mapping(address => address[]) public agentsByCreator;

    event AgentLaunched(
        address indexed tokenAddress,
        address indexed creator,
        string name,
        string ticker,
        uint256 indexed agentIndex,
        uint256 timestamp
    );

    event LaunchFeeUpdated(uint256 oldFee, uint256 newFee);

    constructor() Ownable(msg.sender) {}

    /**
     * @notice Launch a new AI Agent token.
     * @param _name       Human-readable name (e.g., "Neural Doge")
     * @param _ticker     Token symbol (e.g., "NDOGE")
     * @param _prompt     The AI prompt / model description
     * @param _marketCap  Initial market cap label (e.g., "$10k")
     */
    function launchAgent(
        string calldata _name,
        string calldata _ticker,
        string calldata _prompt,
        string calldata _marketCap
    ) external payable returns (address) {
        require(msg.value >= launchFee, "Insufficient launch fee");
        require(bytes(_name).length > 0, "Name required");
        require(bytes(_ticker).length > 0, "Ticker required");

        // 85% of public supply goes to the creator's wallet initially
        // (they manage presale distribution off-chain or via a future presale contract)
        address publicPool = msg.sender;

        RitualAgentToken token = new RitualAgentToken(
            _name,
            _ticker,
            msg.sender,
            publicPool,
            _prompt,
            _marketCap
        );

        AgentInfo memory info = AgentInfo({
            tokenAddress: address(token),
            creator: msg.sender,
            name: _name,
            ticker: _ticker,
            prompt: _prompt,
            marketCap: _marketCap,
            launchTime: block.timestamp
        });

        allAgents.push(info);
        agentsByCreator[msg.sender].push(address(token));

        emit AgentLaunched(
            address(token),
            msg.sender,
            _name,
            _ticker,
            allAgents.length - 1,
            block.timestamp
        );

        return address(token);
    }

    /**
     * @notice Returns total number of agents launched.
     */
    function totalAgents() external view returns (uint256) {
        return allAgents.length;
    }

    /**
     * @notice Returns all agents launched by a specific creator.
     */
    function getAgentsByCreator(address _creator) external view returns (address[] memory) {
        return agentsByCreator[_creator];
    }

    /**
     * @notice Returns all agents info (paginated for large sets).
     */
    function getAgents(uint256 _from, uint256 _count) external view returns (AgentInfo[] memory) {
        require(_from < allAgents.length, "Index out of range");
        uint256 end = _from + _count;
        if (end > allAgents.length) end = allAgents.length;
        AgentInfo[] memory result = new AgentInfo[](end - _from);
        for (uint256 i = _from; i < end; i++) {
            result[i - _from] = allAgents[i];
        }
        return result;
    }

    /**
     * @notice Owner can update the launch fee.
     */
    function setLaunchFee(uint256 _newFee) external onlyOwner {
        emit LaunchFeeUpdated(launchFee, _newFee);
        launchFee = _newFee;
    }

    /**
     * @notice Owner withdraws collected fees.
     */
    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Nothing to withdraw");
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Withdraw failed");
    }

    receive() external payable {}
}
