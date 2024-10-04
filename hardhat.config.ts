import "@nomicfoundation/hardhat-toolbox";
import { vars } from "hardhat/config";
require("dotenv").config({ path: ".env" });

const ALCHEMY_MAINNET_API_KEY_URL = process.env.ALCHEMY_MAINNET_API_KEY_URL;

const ACCOUNT_PRIVATE_KEY = vars.get("SECRET_KEY");

module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      forking: {
        url: ALCHEMY_MAINNET_API_KEY_URL,
      }
    },
    // for testnet
    "lisk-sepolia": {
      url: process.env.LISK_RPC_URL!,
      accounts: [ACCOUNT_PRIVATE_KEY!],
      gasPrice: 1000000000,
    },
  },
  etherscan: {
    // Use "123" as a placeholder, because Blockscout doesn't need a real API key, and Hardhat will complain if this property isn't set.
    apiKey: {
      "lisk-sepolia": "123",
    },
    customChains: [
      {
        network: "lisk-sepolia",
        chainId: 4202,
        urls: {
          apiURL: "https://sepolia-blockscout.lisk.com/api",
          browserURL: "https://sepolia-blockscout.lisk.com/",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
  lockGasLimit: 200000000000,
  gasPrice: 10000000000,
};

// UseSwap
// Deployed Addresses

// UseSwapModule#UseSwap - 0x0154BFB25Efd37bEd348bFBbD6DA9392Df466630

// UseSwapEth
// UseSwapEthModule#UseSwapEth - 0xD9bf4c45672Ff0A6577883a64450a6309C654F2c
