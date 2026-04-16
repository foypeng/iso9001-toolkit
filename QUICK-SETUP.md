# Cloudflare Pages 快速配置指南

## 你需要提供的信息

### 必需信息

1. **Cloudflare账号**
   - 邮箱地址
   - 密码

2. **GitHub访问权限**
   - 你已登录的GitHub账号
   - 仓库访问权限 (foypeng/iso9001-toolkit)

### 可选信息 (用于自动化)

1. **Cloudflare API Token** (可选)
   - 用途: 自动化配置和部署
   - 获取方式: Cloudflare Dashboard -> My Profile -> API Tokens

2. **GitHub Personal Access Token** (可选)
   - 用途: 私有仓库访问 (如果是私有仓库)
   - 获取方式: GitHub Settings -> Developer settings -> Personal access tokens

## 配置步骤 (5分钟完成)

### 第一步: 登录Cloudflare (1分钟)

1. 访问 https://dash.cloudflare.com
2. 输入你的邮箱和密码
3. 完成登录

### 第二步: 创建Pages项目 (2分钟)

1. 在左侧菜单点击 **Pages**
2. 点击 **Create a project**
3. 选择 **Connect to Git**

### 第三步: 授权GitHub (1分钟)

1. 点击 **Connect GitHub**
2. 如果已登录GitHub，点击 **Authorize Cloudflare**
3. 如果未登录，先登录GitHub再授权

### 第四步: 选择仓库 (30秒)

1. 在列表中找到 **foypeng/iso9001-toolkit**
2. 点击 **Begin setup**

### 第五步: 配置并部署 (30秒)

**构建配置**:
- 项目名称: `iso9001-toolkit`
- 生产分支: `master`
- 构建命令: (留空)
- 构建输出目录: `public`

点击 **Save and Deploy**

## 部署完成

部署完成后，你会得到:
- 访问URL: `https://iso9001-toolkit.pages.dev`
- 部署状态: Success
- 部署时间: 显示具体时间

## 验证步骤

1. 访问分配的URL
2. 检查页面是否正常显示
3. 测试产品滚动功能
4. 测试联系表单
5. 测试页面导航

## 常见问题

### Q: 需要提供API Token吗？
A: 不需要。通过网页界面配置只需要你的Cloudflare账号和GitHub访问权限。

### Q: 部署需要多长时间？
A: 通常1-2分钟。

### Q: 部署后网站地址是什么？
A: 通常是 `https://项目名称.pages.dev`，例如 `https://iso9001-toolkit.pages.dev`

### Q: 如何更新网站？
A: 推送代码到GitHub，Cloudflare Pages会自动检测并重新部署。

## 下一步

1. 完成基本部署
2. 配置自定义域名 (可选)
3. 设置环境变量 (可选)
4. 监控访问情况

## 需要帮助？

如果遇到问题，请提供:
1. 错误信息截图
2. 部署日志
3. 具体问题描述