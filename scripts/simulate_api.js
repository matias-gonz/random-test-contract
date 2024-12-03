require('dotenv').config();
const axios = require("axios");

const TENDERLY_ACCESS_KEY = process.env.TENDERLY_ACCESS_KEY;
const TENDERLY_ACCOUNT_SLUG = process.env.TENDERLY_ACCOUNT_SLUG;
const TENDERLY_PROJECT_SLUG = process.env.TENDERLY_PROJECT_SLUG;

if (!TENDERLY_ACCESS_KEY || !TENDERLY_ACCOUNT_SLUG || !TENDERLY_PROJECT_SLUG) {
  console.error("Environment variables TENDERLY_ACCESS_KEY, TENDERLY_ACCOUNT_SLUG, and TENDERLY_PROJECT_SLUG are required.");
  process.exit(1);
}

const TENDERLY_API_URL = `https://api.tenderly.co/api/v1/account/${TENDERLY_ACCOUNT_SLUG}/project/${TENDERLY_PROJECT_SLUG}/simulate`;

async function simulateTransaction() {
  const payload = {
    network_id: "11155111",
    block_number: null,
    transaction_index: null,
    from: "0x0000000000000000000000000000000000000000",
    input: "0x672385620000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000a416464206576656e747300000000000000000000000000000000000000000000",
    to: "0xd88e4973377e9b389843b7966ce5f71ebd7d16b9",
    gas: 8000000,
    gas_price: "0",
    value: "0",
    access_list: [],
    generate_access_list: true,
    save: true,
    block_header: null,
  };

  const headers = {
    "X-Access-Key": TENDERLY_ACCESS_KEY,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(TENDERLY_API_URL, payload, { headers });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
}

function get_simulation_link(simulation) {
  return `https://dashboard.tenderly.co/${TENDERLY_ACCOUNT_SLUG}/${TENDERLY_PROJECT_SLUG}/simulator/${simulation.simulation.id}`;
}

async function main() {
  try {
    console.log("Starting transaction simulation...");
    const result = await simulateTransaction();
    console.log("Simulation Response:", result);
    console.log("Simulation Link:", get_simulation_link(result));
  } catch (error) {
    console.error("Error during simulation:", error.message);
  }
}

main();
