async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const description = "A simple task management system";
  const SimpleTaskManager = await ethers.getContractFactory("SimpleTaskManager");

  await SimpleTaskManager.deploy(description)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });