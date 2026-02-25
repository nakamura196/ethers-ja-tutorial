# 1. 環境構築

## Node.js のインストール

ethers.js を使うには Node.js が必要です。[公式サイト](https://nodejs.org/) から LTS 版をインストールしてください。

```bash
# バージョン確認
node --version  # v18 以上を推奨
npm --version
```

## プロジェクトの作成

```bash
mkdir my-eth-project
cd my-eth-project
npm init -y
```

## ethers.js のインストール

```bash
npm install ethers
```

## dotenv のインストール

チュートリアルでは秘密鍵や API キーを安全に管理するため、環境変数を使います。`dotenv` パッケージをインストールしましょう。

```bash
npm install dotenv
```

### `.env` ファイルの作成

プロジェクトルートにある `.env.example` をコピーして `.env` を作成します。

```bash
cp .env.example .env
```

`.env` ファイルを開き、後の章で取得する値を記入します（現時点では空のままで OK です）。

```
PRIVATE_KEY=0x...your_private_key_here
ALCHEMY_API_KEY=your_alchemy_api_key_here
```

> **重要**: `.env` には秘密鍵などの機密情報が含まれます。`.gitignore` に `.env` が含まれていることを確認し、**絶対に Git にコミットしないでください**。

### コード内での使い方

スクリプトの先頭で `import 'dotenv/config'` を追加すると、`.env` の値が `process.env` 経由で使えるようになります。

```javascript
import "dotenv/config";
import { ethers } from "ethers";

console.log(process.env.ALCHEMY_API_KEY); // .env の値が読み込まれる
```

## 動作確認

`test.mjs` を作成して実行します。

```javascript
// test.mjs
import { ethers } from "ethers";

console.log("ethers.js version:", ethers.version);

// ランダムなウォレットを生成
const wallet = ethers.Wallet.createRandom();
console.log("アドレス:", wallet.address);
console.log("秘密鍵:", wallet.privateKey);
```

```bash
node test.mjs
```

アドレスと秘密鍵が表示されれば、環境構築は完了です。

## よくあるトラブル

### `ERR_MODULE_NOT_FOUND` が出る

`package.json` に `"type": "module"` を追加するか、ファイル拡張子を `.mjs` にしてください。

### `Cannot find module 'ethers'` が出る

`npm install ethers` を実行した場所と、スクリプトを実行する場所が同じか確認してください。

---

次へ: [プロバイダー](02-provider.md)
