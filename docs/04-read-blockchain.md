# 4. ブロックチェーンの読み取り

プロバイダーを使って、ブロックチェーンからさまざまな情報を取得できます。

## 残高の確認

```javascript
import { ethers } from "ethers";

const provider = ethers.getDefaultProvider("mainnet");

// アドレスで残高を取得（Wei 単位で返る）
const balance = await provider.getBalance("vitalik.eth");
console.log("残高 (Wei):", balance.toString());
console.log("残高 (ETH):", ethers.formatEther(balance));
```

## ブロック情報の取得

```javascript
// 最新ブロック番号
const blockNumber = await provider.getBlockNumber();
console.log("最新ブロック:", blockNumber);

// ブロックの詳細
const block = await provider.getBlock(blockNumber);
console.log("タイムスタンプ:", new Date(block.timestamp * 1000));
console.log("トランザクション数:", block.transactions.length);
console.log("ガス使用量:", block.gasUsed.toString());
```

## トランザクション情報の取得

```javascript
// トランザクションハッシュから詳細を取得
const tx = await provider.getTransaction("0x...");
console.log("送信元:", tx.from);
console.log("送信先:", tx.to);
console.log("金額:", ethers.formatEther(tx.value), "ETH");
console.log("ガス価格:", ethers.formatUnits(tx.gasPrice, "gwei"), "Gwei");

// トランザクションのレシート（実行結果）
const receipt = await provider.getTransactionReceipt("0x...");
console.log("ステータス:", receipt.status === 1 ? "成功" : "失敗");
console.log("実際のガス消費:", receipt.gasUsed.toString());
```

## ガス価格の取得

```javascript
const feeData = await provider.getFeeData();
console.log("ガス価格:", ethers.formatUnits(feeData.gasPrice, "gwei"), "Gwei");
console.log("最大手数料:", ethers.formatUnits(feeData.maxFeePerGas, "gwei"), "Gwei");
console.log("優先手数料:", ethers.formatUnits(feeData.maxPriorityFeePerGas, "gwei"), "Gwei");
```

## ENS の解決

```javascript
// ENS 名 → アドレス
const address = await provider.resolveName("vitalik.eth");
console.log("アドレス:", address);

// アドレス → ENS 名（逆引き）
const name = await provider.lookupAddress("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
console.log("ENS名:", name);
```

## よくあるトラブル

### 残高が `0n` と表示される

BigInt として返されます。`ethers.formatEther()` で ETH 単位に変換してください。

### ENS の逆引きが `null` になる

すべてのアドレスが ENS 名を持っているわけではありません。`null` が返った場合は、そのアドレスに ENS 名が設定されていません。

---

前へ: [ウォレット](03-wallet.md) | 次へ: [トランザクション送信](05-send-transaction.md)
