# 幸运大抽奖程序

> **本项目已升级为全新产品「礼遇」，免费使用，无需部署，打开即用：**
>
> **https://liyu.chiloh.com**

---

这是一个基于 HTML、CSS 和 JavaScript 的转盘抽奖程序。用户可以通过点击按钮启动抽奖，并有机会获得不同的奖品。每个奖品卡片上都有一个淡色水印效果的编号，显示奖项的顺序。

**适用场景：** 展示自己花了心思准备礼物，但不知道送什么礼物会被喜欢，提供多个礼物供抽奖选择。

如果你仍然想使用本仓库自建部署或二次开发，请继续往下阅读。

## 本地使用（自建 / 二次开发）

### 1. 获取代码

```bash
git clone https://github.com/chilohwei/birthday-lottery.git
cd birthday-lottery
```

若你已在本机维护仓库，直接在项目根目录（例如 `birthday-lottery`）下操作即可。

### 2. 安装依赖并启动

```bash
npm install
npm start
```

默认在 [http://localhost:3000](http://localhost:3000) 打开抽奖页；记录页为 [http://localhost:3000/logs.html](http://localhost:3000/logs.html)。抽奖结果会写入项目根目录下的 `prize-logs.json`，请保证进程对该文件有读写权限。

开发时可使用 `npm run dev`（nodemon 热重载）。

### 3. 自定义内容

3.1 **修改 `src/avatar.png`**

首页展示的头像，可换成对方的照片。

3.2 **修改 `config.js`**

文案、emoji、兑奖人姓名与奖项列表都在这里配置，例如：

```javascript
const config = {
    introMessages: [
        `今天是农历四月十号，祝你生日快乐~`,
        `关于生日礼物<br/>我想了很多方案<br/>都被我一一否决了...`,
        `最后，我选择了一个不一样的方案：<br/><span class='highlight'>生日大抽奖</span><br/>由你自己来选择幸运礼物`
    ],
    emojiList: ['🎂', '🎉', '🎁', '🎈', '🍰', '🧧'],
    contactPerson: '魏奇洛',
    prizes: {
        '奖项1': { description: '影视会员年卡 1 张', icon: '🎬' },
        '奖项2': { description: '任意电影票 3 张', icon: '🎟️' },
        '奖项3': { description: '生日红包 88 元', icon: '💸' },
        '奖项4': { description: '海马体艺术照 1 组', icon: '📸' },
        '奖项5': { description: '帮实现 1 个愿望', icon: '🌠' },
        '奖项6': { description: '增加 1 次抽奖机会', icon: '🔁' }
    }
};
```

### 4. 部署到自己的服务器

本项目带 Express 接口与本地日志文件，需要 **Node.js 运行环境** 与 **可持久化的磁盘**（用于 `prize-logs.json`）。将仓库部署到 VPS、PaaS（支持 Node 与持久卷）等后，把站点根 URL 配成你的域名即可；记录页路径仍为 `/logs.html`。

## 贡献

欢迎任何形式的贡献，包括但不限于报告问题、提出建议或提交代码。让我们一起让这个工具更加完善！

## 捐赠

如果这个项目对你有帮助，欢迎请我喝杯咖啡 ☕

👉 [捐赠页面](https://donate.chiloh.com)

### 扫码支付

<table>
  <tr>
    <td align="center"><b>微信支付</b></td>
    <td align="center"><b>支付宝</b></td>
    <td align="center"><b>PayPal</b></td>
  </tr>
  <tr>
    <td align="center"><img src="https://donate.chiloh.com/img/wechat.webp" width="200" alt="WeChat Pay" /></td>
    <td align="center"><img src="https://donate.chiloh.com/img/alipay.webp" width="200" alt="Alipay" /></td>
    <td align="center"><img src="https://donate.chiloh.com/img/paypal.webp" width="200" alt="PayPal" /></td>
  </tr>
</table>

### 加密货币

| 币种 | 网络 | 地址 |
|------|------|------|
| **BTC** | Bitcoin SegWit | `bc1qpqchzes0wrhtg5h2rwvh3f6tf5weljetx2adun` |
| **EVM** | ETH / BSC / Polygon / Arb / OP / Base | `0x797A13aB0398eef748cF6D8C518b0803a14918b1` |
| **USDT** | TRC-20 (Tron) | `TQeEKzMRvAUXEU5tsiPR1GX8WUHdhKUhwg` |
| **SOL** | Solana (SOL & USDT SPL) | `GXTtMhJvbpmdrqSz5x65Hzd6wia5YYwaHdnxCB3PC1HY` |
