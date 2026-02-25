// ブロックチェーンの読み取り例
import { ethers } from "ethers";

const provider = ethers.getDefaultProvider("mainnet");

// vitalik.eth の残高を取得
const balance = await provider.getBalance("vitalik.eth");
console.log("残高 (Wei):", balance.toString());
console.log("残高 (ETH):", ethers.formatEther(balance));

// 最新ブロック情報
const blockNumber = await provider.getBlockNumber();
const block = await provider.getBlock(blockNumber);
console.log("\n最新ブロック:", blockNumber);
console.log("タイムスタンプ:", new Date(block.timestamp * 1000));
console.log("トランザクション数:", block.transactions.length);

// ENS の解決
const address = await provider.resolveName("vitalik.eth");
console.log("\nvitalik.eth →", address);
