require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {},
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      // gasPrice: 20000000000,
      // accounts: { mnemonic: mnemonic },
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      //  gasPrice: 20000000000,
      //  accounts: { mnemonic: mnemonic },
    },
  },
  solidity: {
    version: "0.8.11",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./src/contracts",
    artifacts: "./src/abis",
  },
  mocha: {
    timeout: 40000,
  },
};
