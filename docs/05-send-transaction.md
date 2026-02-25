# 5. トランザクション送信

ETH の送金やコントラクトへの書き込みには、トランザクションの送信が必要です。

## テスト用 ETH の入手（Sepolia Faucet）

トランザクションを送信するにはテスト用の ETH が必要です。以下の Faucet から入手してください。

| Faucet | 条件 | 1回あたり |
|---|---|---|
| [PoW Faucet](https://sepolia-faucet.pk910.de/) | なし（ブラウザでマイニング） | マイニング量に応じて |
| [Alchemy Faucet](https://www.alchemy.com/faucets/ethereum-sepolia) | メインネットに 0.001 ETH 以上必要 | 0.1 ETH / 24h |
| [QuickNode Faucet](https://faucet.quicknode.com/ethereum/sepolia) | ウォレット接続 + ツイート | 0.25 ETH / 12h |
| [Google Cloud Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia) | Google アカウント | 0.05 ETH / 24h |

### 手順（共通）

1. 上記いずれかの Faucet にアクセス
2. 自分のウォレットアドレスを入力（[03-wallet](03-wallet.md) で作成したアドレス）
3. テスト用 ETH をリクエスト
4. 数秒〜数分でテスト用 ETH が届きます

> **注意**: Faucet にはクールダウン期間があります。テスト用 ETH は本物の価値はありません。

## ETH の送金

```javascript
import "dotenv/config";
import { ethers } from "ethers";

// Alchemy 経由で Sepolia テストネットに接続
const provider = new ethers.JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
);

// 秘密鍵でウォレットを作成（.env から読み込み）
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// 送金トランザクションを作成・送信
const tx = await wallet.sendTransaction({
  to: "0x宛先アドレス",
  value: ethers.parseEther("0.01"), // 0.01 ETH
});

console.log("トランザクションハッシュ:", tx.hash);
console.log("送信完了。マイニング待ち...");

// マイニングされるまで待つ
const receipt = await tx.wait();
console.log("ブロックに含まれました:", receipt.blockNumber);
console.log("ステータス:", receipt.status === 1 ? "成功" : "失敗");
```

## ガスの指定

```javascript
const tx = await wallet.sendTransaction({
  to: "0x宛先アドレス",
  value: ethers.parseEther("0.01"),
  // EIP-1559 形式（推奨）
  maxFeePerGas: ethers.parseUnits("30", "gwei"),
  maxPriorityFeePerGas: ethers.parseUnits("2", "gwei"),
  // ガスリミット（通常は自動推定される）
  gasLimit: 21000,
});
```

## トランザクション送信前の確認

```javascript
// 残高の確認
const balance = await provider.getBalance(wallet.address);
console.log("残高:", ethers.formatEther(balance), "ETH");

// ガス代の見積もり
const gasEstimate = await provider.estimateGas({
  to: "0x宛先アドレス",
  value: ethers.parseEther("0.01"),
});
const feeData = await provider.getFeeData();
const estimatedCost = gasEstimate * feeData.gasPrice;
console.log("推定ガス代:", ethers.formatEther(estimatedCost), "ETH");
```

## よくあるトラブル

### `insufficient funds` エラー

送金額 + ガス代が残高を超えています。残高を確認してください。

### `nonce too low` エラー

同じアカウントから短時間に複数のトランザクションを送ると発生します。前のトランザクションの完了を `await tx.wait()` で待ってから次を送信してください。

### トランザクションがいつまでも確認されない

ガス価格が低すぎる可能性があります。`provider.getFeeData()` で現在の推奨ガス価格を確認し、それ以上を設定してください。

---

前へ: [ブロックチェーンの読み取り](04-read-blockchain.md) | 次へ: [スマートコントラクト](06-smart-contract.md)
