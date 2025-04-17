const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// 中间件处理JSON数据和静态文件
app.use(express.json());
app.use(express.static(__dirname));

// 日志文件路径
const logsPath = path.join(__dirname, 'prize-logs.json');

// 获取所有抽奖记录
app.get('/api/prize-logs', async (req, res) => {
    try {
        const logs = await readLogs();
        res.json(logs);
    } catch (error) {
        console.error('获取日志失败:', error);
        res.status(500).json({ error: '无法读取日志文件' });
    }
});

// 添加新的抽奖记录
app.post('/api/log-prize', async (req, res) => {
    try {
        const newLog = req.body;
        
        // 验证必要字段
        if (!newLog.time || !newLog.prize) {
            return res.status(400).json({ error: '缺少必要字段' });
        }
        
        // 添加源IP地址（为了分析用途，可以选择性地隐去最后一段）
        const ip = req.ip || req.connection.remoteAddress;
        newLog.ip = ip.replace(/\.\d+$/, '.xxx'); // 隐藏最后一段IP
        
        const logs = await readLogs();
        logs.push(newLog);
        
        await saveLogs(logs);
        
        res.status(201).json({ message: '日志记录成功', id: newLog.id });
    } catch (error) {
        console.error('记录日志失败:', error);
        res.status(500).json({ error: '无法保存日志' });
    }
});

// 帮助函数：读取日志文件
async function readLogs() {
    try {
        const data = await fs.readFile(logsPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // 如果文件不存在，则返回空数组
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
}

// 帮助函数：保存日志文件
async function saveLogs(logs) {
    await fs.writeFile(logsPath, JSON.stringify(logs, null, 2), 'utf8');
}

// 开始监听请求
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
    console.log(`可以访问 http://localhost:${port}/logs.html 查看抽奖记录`);
}); 