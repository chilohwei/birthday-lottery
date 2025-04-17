const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
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
        
        // 获取用户IP地址
        const ip = req.headers['x-forwarded-for'] || 
            req.connection.remoteAddress || 
            req.socket.remoteAddress || 
            req.ip || 
            '0.0.0.0';
        
        // 保存完整IP，但公开时隐藏最后一段
        newLog.fullIp = ip;
        newLog.ip = ip.replace(/\.\d+$/, '.xxx'); // 隐藏最后一段IP
        
        // 尝试获取IP地理位置
        try {
            const location = await getIpLocation(ip);
            if (location) {
                newLog.location = location;
            }
        } catch (err) {
            console.error('获取IP地理位置失败:', err);
        }
        
        // 添加其他通用字段
        newLog.userAgent = req.headers['user-agent'] || '';
        newLog.createdAt = new Date().toISOString();
        
        // 读取现有日志并添加新记录
        const logs = await readLogs();
        logs.push(newLog);
        
        await saveLogs(logs);
        
        res.status(201).json({ message: '日志记录成功', id: newLog.id });
    } catch (error) {
        console.error('记录日志失败:', error);
        res.status(500).json({ error: '无法保存日志' });
    }
});

// IP地理位置查询API
async function getIpLocation(ip) {
    // 跳过本地IP和内网IP的查询
    if (ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.16.')) {
        return '本地网络';
    }
    
    try {
        // 使用免费的IP地理位置API
        const response = await axios.get(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city&lang=zh-CN`);
        
        if (response.data && response.data.status === 'success') {
            const { country, regionName, city } = response.data;
            return `${country} ${regionName} ${city}`.trim();
        }
    } catch (error) {
        console.error('IP地理位置查询失败:', error.message);
    }
    
    return null;
}

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