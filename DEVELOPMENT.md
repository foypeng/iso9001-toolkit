# 🛠️ 本地开发指南

## 前置要求

- Node.js 18+ 
- npm
- Cloudflare 账号

## 快速开始

### 1. 安装依赖

```bash
cd /Users/foypeng/.openclaw/workspace/iso9001-toolkit
npm install
```

### 2. 本地运行前端（静态页面）

直接打开 HTML 文件：

```bash
# 方法 1：使用浏览器直接打开
open public/index.html

# 方法 2：使用简单的 HTTP 服务器
npx serve public
# 访问 http://localhost:3000
```

### 3. 本地运行后端（Workers）

需要先配置 Cloudflare：

```bash
# 登录 Cloudflare
npx wrangler login

# 创建 D1 数据库
npx wrangler d1 create iso9001-toolkit

# 复制输出的 database_id 到 workers/wrangler.toml

# 创建数据库表
npx wrangler d1 execute iso9001-toolkit --file=workers/schema.sql

# 创建 R2 存储桶
npx wrangler r2 bucket create iso9001-docs

# 启动本地开发服务器
cd workers
npx wrangler dev
```

Workers 将在 `http://localhost:8787` 运行

### 4. 配置环境变量

在 `workers/wrangler.toml` 中配置：

```toml
[vars]
DOMAIN = "localhost:8787"
ADMIN_EMAIL = "your-email@example.com"
SENDGRID_API_KEY = "SG.xxxxx"  # 可选，本地测试可不配
SENDGRID_FROM_EMAIL = "noreply@example.com"
```

或者使用 `.dev.vars` 文件（不提交到 Git）：

```bash
# workers/.dev.vars
ADMIN_EMAIL=your-email@example.com
SENDGRID_API_KEY=SG.xxxxx
```

## 本地测试流程

### 测试创建订单

```bash
curl -X POST http://localhost:8787/api/orders \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","package":"basic"}'
```

### 测试查询订单

```bash
curl http://localhost:8787/api/orders/ORD123456
```

### 测试健康检查

```bash
curl http://localhost:8787/health
```

## 前端 + 后端联调

### 方案 1：使用 Pages 本地开发

```bash
cd public
npx wrangler pages dev . --compatibility-date=2024-01-01
```

### 方案 2：修改 API 地址

编辑 `public/app.js`，将 API 请求地址改为本地：

```javascript
const response = await fetch('http://localhost:8787/api/orders', {
  // ...
});
```

然后在浏览器打开 `public/index.html`

## 部署

### 部署 Workers

```bash
cd workers
npx wrangler deploy
```

### 部署 Pages

```bash
cd public
npx wrangler pages deploy . --project-name=iso9001-toolkit
```

## 常见问题

### Q: 无法连接 GitHub
A: 检查网络连接，或使用代理

### Q: wrangler login 失败
A: 确保已注册 Cloudflare 账号，访问 https://dash.cloudflare.com

### Q: D1 数据库创建失败
A: 检查 Cloudflare 账号是否有 D1 权限（免费账号可用）

### Q: 本地访问前端页面样式不正常
A: 使用 HTTP 服务器而不是直接打开文件：
```bash
npx serve public
```

## 开发工具推荐

- **VS Code** - 代码编辑器
- **Postman** - API 测试
- **TablePlus** - D1 数据库查看
- **Cloudflare Dashboard** - 查看日志和配置

---

**本地开发环境配置完成！** 🎉
