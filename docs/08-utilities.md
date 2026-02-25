# 8. ユーティリティ

ethers.js には、Ethereum 開発で頻繁に使う便利な関数が多数用意されています。

## 単位変換

Ethereum では金額を Wei（最小単位）で扱います。1 ETH = 10^18 Wei です。

```javascript
import { ethers } from "ethers";

// ETH → Wei
const wei = ethers.parseEther("1.5");
console.log("1.5 ETH =", wei.toString(), "Wei");

// Wei → ETH
const eth = ethers.formatEther(1500000000000000000n);
console.log("ETH:", eth);

// 任意の小数点単位（例: USDT は 6 桁）
const amount = ethers.parseUnits("100", 6);    // 100 USDT → 100000000
const display = ethers.formatUnits(amount, 6); // → "100.0"
```

### 主な単位

| 単位 | Wei 換算 | 用途 |
|------|---------|------|
| Wei | 1 | 最小単位 |
| Gwei | 10^9 | ガス価格の表示 |
| Ether | 10^18 | ETH の表示 |

## ハッシュ関数

```javascript
// Keccak256（Ethereum で最もよく使われるハッシュ）
const hash = ethers.keccak256(ethers.toUtf8Bytes("Hello, Ethereum!"));
console.log("Keccak256:", hash);

// SHA256
const sha = ethers.sha256(ethers.toUtf8Bytes("Hello"));
console.log("SHA256:", sha);

// Solidity と同じ方法でハッシュを計算
const packed = ethers.solidityPackedKeccak256(
  ["address", "uint256"],
  ["0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", 100]
);
```

## ABI エンコーディング

```javascript
const abiCoder = ethers.AbiCoder.defaultAbiCoder();

// エンコード
const encoded = abiCoder.encode(
  ["string", "uint256"],
  ["Hello", 42]
);
console.log("エンコード:", encoded);

// デコード
const decoded = abiCoder.decode(
  ["string", "uint256"],
  encoded
);
console.log("デコード:", decoded[0], decoded[1]);
```

## アドレスの操作

```javascript
// アドレスの検証
console.log(ethers.isAddress("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045")); // true
console.log(ethers.isAddress("invalid")); // false

// チェックサム付きアドレスに変換
const checksummed = ethers.getAddress("0xd8da6bf26964af9d7eed9e03e53415d37aa96045");
console.log(checksummed); // 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
```

## バイト列と文字列の変換

```javascript
// 文字列 → バイト列
const bytes = ethers.toUtf8Bytes("Hello");
console.log(bytes);

// バイト列 → 文字列
const text = ethers.toUtf8String(bytes);
console.log(text); // "Hello"

// 16 進数文字列の操作
const hex = ethers.hexlify(bytes);
console.log(hex); // "0x48656c6c6f"
```

---

前へ: [イベント](07-events.md)

## まとめ

このチュートリアルでは ethers.js v6 の基本を学びました：

1. **プロバイダー** - ネットワーク接続
2. **ウォレット** - 鍵管理と署名
3. **読み取り** - 残高・ブロック情報
4. **書き込み** - トランザクション送信
5. **コントラクト** - スマートコントラクトとの対話
6. **イベント** - リアルタイムリスニング
7. **ユーティリティ** - 単位変換・ハッシュ等

さらに詳しくは [ethers.js 公式ドキュメント](https://docs.ethers.org/v6/) を参照してください。
