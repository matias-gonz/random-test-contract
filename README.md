# random-test-contract

**Usage:**

First create a `.env` file with the following content:
```
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/API_KEY
PRIVATE_KEY=<WALLET_PRIVATE_KEY>
ETHERSCAN_API_KEY=
```

Deploy:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Verify:
```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> "A simple task management system"
```
