require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    ritual_testnet: {
      url: "https://rpc.ritualfoundation.org",
      chainId: 1979,
      accounts: process.env.DEPLOYER_PRIVATE_KEY
        ? [`0x${process.env.DEPLOYER_PRIVATE_KEY.replace(/^0x/, '')}`]
        : [],
    },
    hardhat: { chainId: 31337 },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
