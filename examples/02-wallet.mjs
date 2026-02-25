// ウォレットの作成と操作の例
import { ethers } from "ethers";

// ランダムなウォレットを生成
const wallet = ethers.Wallet.createRandom();
console.log("アドレス:", wallet.address);
console.log("秘密鍵:", wallet.privateKey);
console.log("ニーモニック:", wallet.mnemonic.phrase);

// ニーモニックからウォレットを復元
const restored = ethers.Wallet.fromPhrase(wallet.mnemonic.phrase);
console.log("\n復元したアドレス:", restored.address);
console.log("一致:", wallet.address === restored.address);
