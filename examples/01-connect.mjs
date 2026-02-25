// Ethereum ネットワークへの接続例
import { ethers } from "ethers";

const provider = ethers.getDefaultProvider("mainnet");

const blockNumber = await provider.getBlockNumber();
console.log("最新ブロック番号:", blockNumber);

const network = await provider.getNetwork();
console.log("ネットワーク:", network.name);
console.log("チェーンID:", network.chainId);

const feeData = await provider.getFeeData();
console.log("ガス価格:", ethers.formatUnits(feeData.gasPrice, "gwei"), "Gwei");
