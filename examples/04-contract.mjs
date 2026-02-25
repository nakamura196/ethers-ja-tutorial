// スマートコントラクトの読み取り例（USDT）
import { ethers } from "ethers";

const provider = ethers.getDefaultProvider("mainnet");

const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
];

const contract = new ethers.Contract(usdtAddress, abi, provider);

const name = await contract.name();
const symbol = await contract.symbol();
const decimals = await contract.decimals();
const totalSupply = await contract.totalSupply();

console.log(`${name} (${symbol})`);
console.log("小数点:", decimals);
console.log("総供給量:", ethers.formatUnits(totalSupply, decimals), symbol);
