# 6. スマートコントラクト

スマートコントラクトとのやり取りは、ethers.js の最も強力な機能の一つです。

## ABI とは

ABI（Application Binary Interface）は、コントラクトの関数やイベントの定義です。コントラクトとやり取りするには ABI が必要です。

```javascript
// 最小限の ABI（必要な関数だけ定義すれば OK）
const abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
];
```

## コントラクトの読み取り（view 関数）

```javascript
import { ethers } from "ethers";

const provider = ethers.getDefaultProvider("mainnet");

// USDT コントラクト
const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
];

const contract = new ethers.Contract(usdtAddress, abi, provider);

const name = await contract.name();
const symbol = await contract.symbol();
const decimals = await contract.decimals();
console.log(`${name} (${symbol}), 小数点: ${decimals}`);

// 特定アドレスの残高
const balance = await contract.balanceOf("0x...");
console.log("残高:", ethers.formatUnits(balance, decimals), symbol);
```

## コントラクトへの書き込み（トランザクション送信）

書き込みにはウォレット（署名者）が必要です。

```javascript
import "dotenv/config";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contract = new ethers.Contract(contractAddress, abi, wallet);

// ERC20 トークンの送金
const tx = await contract.transfer("0x宛先", ethers.parseUnits("100", 6));
console.log("トランザクションハッシュ:", tx.hash);

const receipt = await tx.wait();
console.log("完了:", receipt.status === 1 ? "成功" : "失敗");
```

## ERC20 トークンの操作まとめ

```javascript
const erc20Abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
];
```

## よくあるトラブル

### `contract runner does not support sending transactions`

読み取り専用のプロバイダーで書き込み操作を行おうとしています。`new ethers.Contract(address, abi, wallet)` のようにウォレットを渡してください。

### `execution reverted`

コントラクトの条件（残高不足、権限不足など）を満たしていません。コントラクトのソースコードで `require` の条件を確認してください。

---

前へ: [トランザクション送信](05-send-transaction.md) | 次へ: [イベント](07-events.md)
