# 7. イベント

スマートコントラクトはイベントを発行し、外部のアプリケーションがそれをリスニングできます。

## イベントのリスニング

```javascript
import "dotenv/config";
import { ethers } from "ethers";

// WebSocket プロバイダー（リアルタイムリスニングに必要）
const provider = new ethers.WebSocketProvider(
  `wss://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
);

const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const abi = [
  "event Transfer(address indexed from, address indexed to, uint256 value)",
];
const contract = new ethers.Contract(usdtAddress, abi, provider);

// Transfer イベントをリアルタイムでリスニング
contract.on("Transfer", (from, to, value, event) => {
  console.log(`送金: ${from} → ${to}`);
  console.log(`金額: ${ethers.formatUnits(value, 6)} USDT`);
  console.log(`ブロック: ${event.log.blockNumber}`);
  console.log("---");
});

console.log("USDT Transfer イベントをリスニング中...");
```

## 過去のイベントの取得

```javascript
import "dotenv/config";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(
  `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
);
const contract = new ethers.Contract(usdtAddress, abi, provider);

// 直近 10 ブロックの Transfer イベントを取得
const currentBlock = await provider.getBlockNumber();
const events = await contract.queryFilter("Transfer", currentBlock - 9, currentBlock);

console.log(`${events.length} 件の Transfer イベントが見つかりました`);

for (const event of events.slice(0, 5)) {
  console.log(`${event.args.from} → ${event.args.to}: ${ethers.formatUnits(event.args.value, 6)} USDT`);
}
```

## フィルター付きイベント取得

```javascript
// 特定のアドレスからの送金のみ取得
const filter = contract.filters.Transfer("0x送信元アドレス", null);
const events = await contract.queryFilter(filter, -9);

// 特定のアドレスへの送金のみ取得
const filter2 = contract.filters.Transfer(null, "0x受信アドレス");
```

## リスナーの解除

```javascript
// 特定のイベントリスナーを解除
contract.off("Transfer", listenerFunction);

// すべてのリスナーを解除
contract.removeAllListeners();
```

## よくあるトラブル

### リアルタイムリスニングが動かない

`JsonRpcProvider`（HTTP）ではリアルタイムリスニングができません。`WebSocketProvider`（WSS）を使用してください。

### `queryFilter` でブロック範囲が広すぎるとエラーになる

ノードプロバイダーにはブロック範囲の制限があります。Alchemy 無料プランでは **10 ブロック**、有料プランではより広い範囲が利用可能です。広い範囲を検索する場合はバッチに分割してください。

---

前へ: [スマートコントラクト](06-smart-contract.md) | 次へ: [ユーティリティ](08-utilities.md)
