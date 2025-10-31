const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// SSE端点
app.get('/events', (req, res) => {
  // 设置SSE响应头
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // 发送初始连接消息
  res.write(`data: ${JSON.stringify({ 
    type: 'connected', 
    message: '连接已建立', 
    timestamp: new Date().toISOString() 
  })}\n\n`);

  // 定期发送消息（每2秒）
  let counter = 0;
  const interval = setInterval(() => {
    counter++;
    
    const eventData = {
      type: 'message',
      counter: counter,
      message: `这是第 ${counter} 条消息`,
      timestamp: new Date().toISOString(),
      random: Math.random().toFixed(4)
    };

    // 发送SSE消息
    res.write(`data: ${JSON.stringify(eventData)}\n\n`);

    // 演示：发送不同类型的事件
    if (counter % 5 === 0) {
      res.write(`event: notification\ndata: ${JSON.stringify({
        type: 'notification',
        message: `特殊通知：已发送 ${counter} 条消息`,
        timestamp: new Date().toISOString()
      })}\n\n`);
    }

    // 演示：发送带有自定义事件类型
    if (counter % 10 === 0) {
      res.write(`event: milestone\ndata: ${JSON.stringify({
        type: 'milestone',
        message: `里程碑达成：${counter} 条消息`,
        timestamp: new Date().toISOString()
      })}\n\n`);
    }
  }, 2000);

  // 客户端断开连接时清理
  req.on('close', () => {
    clearInterval(interval);
    res.end();
    console.log('客户端断开连接');
  });
});

// 手动触发事件端点（用于演示）
app.post('/trigger', express.json(), (req, res) => {
  // 这个端点可以用于手动触发事件
  // 在实际应用中，这可能需要更复杂的机制（如使用EventEmitter）
  res.json({ 
    success: true, 
    message: '触发事件已发送（注意：此实现需要事件总线）' 
  });
});

app.listen(PORT, () => {
  console.log(`SSE服务器运行在 http://localhost:${PORT}`);
  console.log(`打开浏览器访问 http://localhost:${PORT} 查看演示`);
});

