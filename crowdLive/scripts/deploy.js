const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  //to configure.
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  //the deployment.
  const taxFee = 5;
  const contract_name = "SCCrowd";
  const Contract = await ethers.getContractFactory(contract_name);
  const contract = await Contract.deploy(taxFee);

  await contract.deployed();

  const address = JSON.stringify({ address: contract.address }, null, 4);
  fs.writeFile("./src/abis/contractAddress.json", address, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Deployed contract address", contract.address);
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
