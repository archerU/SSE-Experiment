# SSE-Experiment

一个完整的 Server-Sent Events (SSE) 演示项目，展示如何使用 SSE 实现服务器到客户端的实时数据推送。

## 功能特性

- ✅ 完整的 SSE 服务器实现（Express.js）
- ✅ 使用 Webpack 打包的前端项目
- ✅ 模块化的前端代码结构
- ✅ 现代化的前端界面（HTML/CSS/JavaScript）
- ✅ 实时消息推送演示
- ✅ 支持自定义事件类型（消息、通知、里程碑）
- ✅ 连接状态显示
- ✅ 消息统计功能
- ✅ 优雅的用户界面
- ✅ 支持开发和生产模式

## 项目结构

```
SSE-Experiment/
├── server.js              # Express 服务器，提供 SSE 端点
├── package.json           # 项目依赖配置
├── webpack.config.js      # Webpack 打包配置
├── .babelrc               # Babel 转译配置
├── .gitignore            # Git 忽略文件
├── src/                   # 前端源码目录
│   ├── index.js          # 前端入口文件
│   ├── index.html        # HTML 模板
│   ├── styles.css        # 样式文件
│   ├── app.js            # 应用主逻辑
│   ├── sse.js            # SSE 连接管理
│   └── ui.js             # UI 更新逻辑
├── dist/                  # Webpack 打包输出目录（生成）
├── public/                # 静态文件目录（备用）
│   └── index.html        # 前端演示页面
└── README.md              # 项目说明文档
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 开发模式

#### 方式一：使用 Webpack Dev Server（推荐）

```bash
# 启动后端服务器
npm run dev

# 在另一个终端启动 Webpack Dev Server
npm run dev:client
```

然后访问：http://localhost:8080

#### 方式二：同时启动后端和前端（需要 concurrently）

```bash
npm run dev:full
```

#### 方式三：传统模式（使用 public 目录）

```bash
npm start
```

然后访问：http://localhost:3000

### 3. 生产模式

#### 构建前端代码

```bash
# 生产环境打包
npm run build

# 开发环境打包
npm run build:dev
```

构建完成后，启动服务器：

```bash
npm start
```

然后访问：http://localhost:3000（服务器会自动使用 dist 目录中的打包文件）

### 4. 使用演示

1. 点击"连接"按钮建立 SSE 连接
2. 服务器将每 2 秒推送一条消息
3. 每 5 条消息会触发一个通知事件
4. 每 10 条消息会触发一个里程碑事件
5. 可以随时点击"断开"断开连接
6. 点击"清空"清除所有消息

## 技术实现

### 服务器端 (server.js)

- 使用 Express.js 创建 HTTP 服务器
- `/events` 端点提供 SSE 连接
- 设置正确的 SSE 响应头：
  - `Content-Type: text/event-stream`
  - `Cache-Control: no-cache`
  - `Connection: keep-alive`
- 定期发送数据到客户端
- 处理客户端断开连接

### 客户端 (src/)

前端代码使用模块化结构，通过 Webpack 打包：

- **index.js** - 应用入口文件，导入样式和初始化应用
- **app.js** - 应用主逻辑，初始化 SSE 和 UI 管理器
- **sse.js** - SSE 连接管理类，封装 EventSource API
- **ui.js** - UI 更新类，负责界面更新和消息显示
- **styles.css** - 样式文件
- **index.html** - HTML 模板

#### Webpack 配置特性

- 支持开发和生产模式
- 自动注入打包后的 JS/CSS
- 支持热模块替换（HMR）
- CSS 提取和压缩
- JS 转译（Babel）和压缩
- Source map 支持
- 代码分割和缓存优化

## SSE 事件格式

服务器发送的事件遵循以下格式：

```
data: {JSON数据}\n\n
```

对于自定义事件类型：

```
event: 事件类型\ndata: {JSON数据}\n\n
```

## 依赖

### 生产依赖

- **express**: ^4.18.2 - Web 服务器框架

### 开发依赖

- **webpack**: ^5.89.0 - 模块打包工具
- **webpack-cli**: ^5.1.4 - Webpack 命令行工具
- **webpack-dev-server**: ^4.15.1 - Webpack 开发服务器
- **html-webpack-plugin**: ^5.5.3 - HTML 模板插件
- **babel-loader**: ^9.1.3 - Babel 转译加载器
- **@babel/core**: ^7.23.0 - Babel 核心
- **@babel/preset-env**: ^7.23.0 - Babel 环境预设
- **css-loader**: ^6.8.1 - CSS 加载器
- **style-loader**: ^3.3.3 - 样式注入加载器
- **mini-css-extract-plugin**: ^2.7.6 - CSS 提取插件
- **concurrently**: ^8.2.2 - 并发执行脚本工具

## 浏览器兼容性

- Chrome/Edge: 完全支持
- Firefox: 完全支持
- Safari: 完全支持
- IE: 不支持（需要 polyfill）

## 使用场景

SSE 适用于以下场景：

- 实时通知推送
- 实时数据监控
- 进度更新
- 日志流传输
- 聊天应用（单向）

## 注意事项

- SSE 是单向通信（服务器 → 客户端）
- 如果需要双向通信，考虑使用 WebSocket
- 浏览器对同一域的 SSE 连接数有限制（通常为 6 个）
- 某些代理服务器可能会缓冲 SSE 连接，导致实时性下降

## 许可证

MIT
