# 3. ウォレット

ウォレットは秘密鍵を管理し、トランザクションに署名するためのオブジェクトです。

## 新しいウォレットの作成

```javascript
import { ethers } from "ethers";

// ランダムなウォレットを生成
const wallet = ethers.Wallet.createRandom();

console.log("アドレス:", wallet.address);
console.log("秘密鍵:", wallet.privateKey);
console.log("ニーモニック:", wallet.mnemonic.phrase);
```

> **重要**: 秘密鍵とニーモニックは絶対に他人に見せないでください。これらが漏れると資産を失います。

## 既存の秘密鍵からウォレットを復元

```javascript
const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const wallet = new ethers.Wallet(privateKey);
console.log("アドレス:", wallet.address);
```

## ニーモニックからウォレットを復元

```javascript
const mnemonic = "test test test test test test test test test test test junk";
const wallet = ethers.Wallet.fromPhrase(mnemonic);
console.log("アドレス:", wallet.address);
```

## プロバイダーとの接続

ウォレット単体ではブロックチェーンと通信できません。プロバイダーに接続する必要があります。

```javascript
const provider = ethers.getDefaultProvider("sepolia");

// 方法1: 作成時に接続
const wallet = new ethers.Wallet(privateKey, provider);

// 方法2: 後から接続
const walletOnly = new ethers.Wallet(privateKey);
const connectedWallet = walletOnly.connect(provider);
```

## 残高の確認

```javascript
const balance = await wallet.provider.getBalance(wallet.address);
console.log("残高:", ethers.formatEther(balance), "ETH");
```

## よくあるトラブル

### `missing provider` エラー

トランザクション送信や残高確認には、ウォレットがプロバイダーに接続されている必要があります。`wallet.connect(provider)` を忘れていないか確認してください。

### ニーモニックの単語数

ニーモニックは通常 12 語または 24 語です。単語の間にはスペースを 1 つだけ入れてください。

---

前へ: [プロバイダー](02-provider.md) | 次へ: [ブロックチェーンの読み取り](04-read-blockchain.md)
