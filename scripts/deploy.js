const hre = require("hardhat");

async function main() {
  const NAME = "AI Generated NFT";
  const SYMBOL = "AINFT";
  const COST = ethers.utils.parseUnits("0.01", "ether");

  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(NAME, SYMBOL, COST);
  await nft.deployed();

  console.log(`Deployed NFT Contract at: ${nft.address}`);
// Sepolia AI NFT contracted deployed at:
// 0xe478889C4862D8892EcB7e8d10855de7539acb8B


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // const [deployer] = await ethers.getSigners();

  // console.log("Deploying contracts with the account:", deployer.address);

  // const token = await ethers.deployContract("Token");

  // console.log("Token address:", await token.getAddress());

// const hre = require("hardhat");

// async function main() {
//   const NAME = "AI Generated NFT"
//   const SYMBOL = "AINFT"
//   const COST = ethers.utils.parseUnits("1", "ether") // 1 ETH

//   const NFT = await hre.ethers.getContractFactory("NFT")
//   const nft = await NFT.deploy(NAME, SYMBOL, COST)
//   await nft.deployed()

//   console.log(`Deployed NFT Contract at: ${nft.address}`)
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
