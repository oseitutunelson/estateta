const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  
  const serviceFee = 5; // 5%
  const Estateta = await hre.ethers.getContractFactory("Estateta");
  const estateta = await Estateta.deploy(deployer.address,serviceFee);
  await estateta.waitForDeployment();
  console.log("Estateta contract deployed to:", await estateta.getAddress());

   
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
