# 2. プロバイダー

プロバイダーは、Ethereum ネットワークへの接続を担う最も基本的なオブジェクトです。ブロックチェーンの読み取り専用操作（残高確認、ブロック情報取得など）を行います。

## デフォルトプロバイダー

最も簡単な接続方法です。ethers.js が自動的に無料の公開ノードに接続します。

```javascript
import { ethers } from "ethers";

// Ethereum メインネットに接続
const provider = ethers.getDefaultProvider("mainnet");

// 最新ブロック番号を取得
const blockNumber = await provider.getBlockNumber();
console.log("最新ブロック:", blockNumber);
```

## テストネットへの接続

開発中はテストネット（Sepolia）を使います。本物の ETH は不要です。

```javascript
const provider = ethers.getDefaultProvider("sepolia");
const blockNumber = await provider.getBlockNumber();
console.log("Sepolia 最新ブロック:", blockNumber);
```

## Alchemy API キーの取得

`getDefaultProvider()` は無料の公開ノードを使うため、レート制限にかかりやすく動作が不安定です。以降のチュートリアルでは **Alchemy** を使って安定した接続を行います。

### アカウント作成手順

1. [Alchemy 公式サイト](https://www.alchemy.com/) にアクセスし、無料アカウントを作成
2. ダッシュボードで **「Create new app」** をクリック
3. **Chain** に「Ethereum」、**Network** に「Ethereum Mainnet」を選択（テストネットは後から追加可能）
4. アプリが作成されたら **「API Key」** をコピー

### `.env` への記入

取得した API キーを `.env` ファイルに記入します。

```
ALCHEMY_API_KEY=your_alchemy_api_key_here
```

### コードから読み込む

```javascript
import "dotenv/config";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(
  `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
);
```

## JSON-RPC プロバイダー

Alchemy や Infura などのノードサービスを使う場合：

```javascript
import "dotenv/config";
import { ethers } from "ethers";

// Alchemy（環境変数から読み込み）
const provider = new ethers.JsonRpcProvider(
  `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
);

// Infura
const provider = new ethers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/YOUR_PROJECT_ID"
);
```

## ネットワーク情報の取得

```javascript
const network = await provider.getNetwork();
console.log("ネットワーク名:", network.name);
console.log("チェーンID:", network.chainId);
```

## よくあるトラブル

### 接続が遅い・タイムアウトする

`getDefaultProvider()` は無料の公開ノードを使うため、レート制限にかかることがあります。本格的な開発では Alchemy や Infura の API キーを取得しましょう（無料枠あり）。

### `network does not support ENS` エラー

ENS（Ethereum Name Service）はメインネットのみ対応です。テストネットでは ENS 名ではなくアドレスを直接指定してください。

---

前へ: [環境構築](01-setup.md) | 次へ: [ウォレット](03-wallet.md)
