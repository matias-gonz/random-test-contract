require('dotenv').config();
const { Tenderly, Network } = require("@tenderly/sdk");

const TENDERLY_ACCESS_KEY = process.env.TENDERLY_ACCESS_KEY;
const TENDERLY_ACCOUNT_SLUG = process.env.TENDERLY_ACCOUNT_SLUG;
const TENDERLY_PROJECT_SLUG = process.env.TENDERLY_PROJECT_SLUG;

if (!TENDERLY_ACCESS_KEY || !TENDERLY_ACCOUNT_SLUG || !TENDERLY_PROJECT_SLUG) {
  console.error("Environment variables TENDERLY_ACCESS_KEY, TENDERLY_ACCOUNT_SLUG, and TENDERLY_PROJECT_SLUG are required.");
  process.exit(1);
}

const tenderly = new Tenderly({
  accountName: TENDERLY_ACCOUNT_SLUG,
  projectName: TENDERLY_PROJECT_SLUG,
  accessKey: TENDERLY_ACCESS_KEY,
  network: Network.SEPOLIA,
});

async function simulateTransaction() {
  const simulation = {
    transaction: {
      from: "0x0000000000000000000000000000000000000000",
      to: "0xd88e4973377e9b389843b7966ce5f71ebd7d16b9",
      input:
        "0x672385620000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000a416464206576656e747300000000000000000000000000000000000000000000",
      gas: 8000000,
      gas_price: "0",
      value: "0",
    },
    blockNumber: 7204419,
  };

  try {
    return await tenderly.simulator.simulateTransaction(simulation);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function main() {
  try {
    console.log("Starting transaction simulation...");
    const simulation = await simulateTransaction();
    console.log("Simulation: ", simulation);
  } catch (error) {
    console.error("Error during simulation:", error.message);
  }
}

main();