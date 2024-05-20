# 幸运大抽奖程序

这是一个基于 HTML、CSS 和 JavaScript 的转盘抽奖程序。用户可以通过点击按钮启动抽奖，并有机会获得不同的奖品。每个奖品卡片上都有一个淡色水印效果的编号，显示奖项的顺序。

**适用场景：** 展示自己花了心思准备礼物，但不知道送什么礼物会被喜欢，提供多个礼物供抽奖选择。

## 演示

[抽奖页面](https://birthday-lottery.vercel.app/) 

[抽奖日志](https://birthday-lottery.vercel.app/logs.html) 


## 使用

### 1. 克隆此项目

    首先，点击 GitHub 页面右上角的 "Fork" 按钮，将此项目 fork 到你的 GitHub 账户中。

### 2. 自定义修改

2.1 **修改 `src/avatar.png` 图片**
   
    这个图片将展示在首页，可以使用朋友的头像来替换。

2.2 **修改 `scripts.js` 配置**

    示例：

    ```javascript
    const config = {
        introMessages: [
            `今天是农历四月十号，祝你生日快乐~`, //第一句话
            `关于生日礼物<br/>我想了很多方案<br/>都被我一一否决了...`, //第二句话
            `最后，我选择了一个不一样的方案：<br/><span class='highlight'>生日大抽奖</span><br/>由你自己来选择幸运礼物` //第三句话
        ],
        emojiList: ['🎂', '🎉', '🎁', '🎈', '🍰', '🧧'], //生日特效的符号
        contactPerson: '魏奇洛', //兑奖人的姓名，比如你自己
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

### 部署

注册并登录 [Vercel](https://vercel.com/) 然后点击 "New Project" 按钮，选择 "Import Git Repository" 选项，选择你 Fork 的 GitHub 仓库，然后点击 "Deploy" 按钮。

- 假设 https://example.com 为部署好的网站，访问 https://example.com/logs.html 即可查看抽奖记录的日志。

## 贡献
欢迎任何形式的贡献，包括但不限于报告问题、提出建议或提交代码。让我们一起让这个工具更加完善！
