// 1. Load the Hardhat Ethers plugin so you can use ethers.js in tasks & scripts
require("@nomiclabs/hardhat-ethers");

// 2. Export your Hardhat configuration
module.exports = {
  // 3. Specify the Solidity compiler version
  solidity: "0.8.20",

  // 4. (Optional) Configure paths if you want non‑default folders
  paths: {
    sources: "./contracts",
    tests:   "./test",
    cache:   "./cache",
    artifacts: "./artifacts"
  },

  // 5. Define any networks you’ll connect to
  networks: {
    // Local Hardhat‑node (launched with `npx hardhat node`)
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
      // accounts: by default Hardhat node exposes 20 test accounts, so you usually don’t need to override
    },

      // (Optional) If you ever want to deploy to a public testnet:
      // rinkeby: {
      //   url: process.env.ALCHEMY_RINKEBY_URL,
      //   accounts: [process.env.PRIVATE_KEY]
      // },
  },

  // 6. (Optional) Configure Ethers.js defaults
  ethers: {
    // default gas price, etc.
  },
};
