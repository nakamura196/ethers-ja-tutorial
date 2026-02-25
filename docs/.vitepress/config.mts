import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ethers.js 日本語チュートリアル',
  description: 'ethers.js v6 の日本語チュートリアル',
  base: '/ethers-ja-tutorial/',
  lang: 'ja',
  themeConfig: {
    nav: [
      { text: 'ホーム', link: '/' },
      { text: 'チュートリアル', link: '/01-setup' },
    ],
    sidebar: [
      {
        text: 'チュートリアル',
        items: [
          { text: '1. 環境構築', link: '/01-setup' },
          { text: '2. プロバイダー', link: '/02-provider' },
          { text: '3. ウォレット', link: '/03-wallet' },
          { text: '4. ブロックチェーンの読み取り', link: '/04-read-blockchain' },
          { text: '5. トランザクション送信', link: '/05-send-transaction' },
          { text: '6. スマートコントラクト', link: '/06-smart-contract' },
          { text: '7. イベント', link: '/07-events' },
          { text: '8. ユーティリティ', link: '/08-utilities' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nakamura196/ethers-ja-tutorial' },
    ],
    outline: { level: [2, 3], label: '目次' },
    docFooter: { prev: '前のページ', next: '次のページ' },
  },
})
