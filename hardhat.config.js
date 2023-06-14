require("@nomicfoundation/hardhat-toolbox");

const INFURA_API_KEY = "e2337cf6fdc049598b4f70bf9662f984";

const SEPOLIA_PRIVATE_KEY = "e89be75f7f6269191bf8db7d64698070258c3be0af6cc545580667c055e5a1d6";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};






