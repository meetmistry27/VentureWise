async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying from:", deployer.address);
  
    const initialSupply = ethers.utils.parseUnits("1000000", 18);
    const VentureToken = await ethers.getContractFactory("VentureToken");
    const token = await VentureToken.deploy(initialSupply);
  
    await token.deployed();
    console.log("VentureToken deployed to:", token.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
  