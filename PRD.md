# 📄 ISO 9001 文档工具包平台 - 产品需求文档 (PRD)

**版本：** v1.0 (MVP) - SendGrid 通知版  
**创建日期：** 2026 年 4 月 9 日  
**目标上线：** 1 个月内  
**负责人：** [您的名字]

---

## 目录

1. [产品概述](#1-产品概述)
2. [功能需求](#2-功能需求)
3. [信息架构](#3-信息架构)
4. [技术架构](#4-技术架构)
5. [核心流程](#5-核心流程)
6. [SendGrid 配置](#6-sendgrid-配置)
7. [API 设计](#7-api-设计)
8. [管理后台](#8-管理后台功能)
9. [数据库设计](#9-数据库设计)
10. [成本估算](#10-成本估算)
11. [运营规划](#11-运营规划)
12. [风险评估](#12-风险评估)
13. [下一步行动](#13-下一步行动清单)

---

## 1. 产品概述

### 1.1 产品定位
面向中国大陆中小企业主的 ISO 9001 质量管理体系认证文档工具包平台，提供"80% 完成度"的文档模板和实施指导，帮助客户以最低成本、最快速度通过 ISO 9001 认证。

### 1.2 目标用户
- **主要用户：** 中小企业主/负责人（10-200 人规模企业）
- **用户特征：**
  - 想自己做 ISO 9001 认证，控制成本
  - 不想完全依赖咨询顾问（费用高、后期依赖强）
  - 需要清晰的文档模板和步骤指导
  - 愿意投入时间学习，但希望有现成框架

### 1.3 核心价值主张
> **"我们完成 80%，您只需完成 20%"**
> 
> 提供 61 个 ISO 9001:2015 标准要求的文档模板（80% 预填写），客户只需根据企业实际情况填写剩余 20% 的内容，即可通过认证审核。

### 1.4 竞品参考
- **Advisera 9001Academy** - 全球领先的 ISO 文档工具包平台
- **本土咨询公司** - 收费高（¥10,000+），但提供本地化服务

---

## 2. 功能需求

### 2.1 三档服务定义

| 功能模块 | 基础版 ¥369 | 标准版 ¥669 | 专业版 ¥969 |
|---------|------------|------------|------------|
| **61 个 Word 文档模板** | ✅ | ✅ | ✅ |
| **实施指南文档** | 简化版（10 页） | 完整版（30 页） | 完整版 + 案例库 |
| **差距分析工具** | ✅ | ✅ | ✅ |
| **邮件咨询支持** | ❌ | 3 次 | 10 次 |
| **文档审核服务** | ❌ | 1 个文件 | 3 个文件 |
| **审计前检查清单** | ❌ | ✅ | ✅ + 模拟审核题 |
| **1 年免费更新** | ❌ | ❌ | ✅ |
| **交付周期** | 即时下载 | 即时下载 | 即时下载 |

### 2.2 61 个文档模板清单

#### 强制性文件（约 20 个）
1. 质量方针
2. 质量目标
3. 质量手册
4. 文件控制程序
5. 记录控制程序
6. 内部审核程序
7. 不符合控制程序
8. 纠正措施程序
9. 预防措施程序
10. 管理评审程序
11. 培训控制程序
12. 基础设施管理程序
13. 工作环境控制程序
14. 产品实现策划程序
15. 与顾客有关的过程控制程序
16. 设计和开发控制程序
17. 采购控制程序
18. 生产和服务提供控制程序
19. 监视和测量设备控制程序
20. 顾客满意测量程序

#### 常用非强制性文件（约 41 个）
- 环境和相关方分析表
- 风险和机遇评估表
- 人力资源规划表
- 销售合同评审表
- 设计开发计划书
- 供应商评价表
- 生产计划表
- 仓储管理记录
- 设备维护记录
- 内审检查表
- 管理评审报告模板
- ...（共 41 个）

### 2.3 核心功能模块

#### 2.3.1 用户端功能
| 功能 | 描述 | 优先级 |
|------|------|--------|
| **首页/Landing Page** | 产品介绍、三档对比、购买按钮 | P0 |
| **购买流程** | 选择套餐→填写邮箱→支付 | P0 |
| **支付接入** | 微信支付、支付宝 | P0 |
| **邮件自动发送** | 支付成功后自动发送访问链接 | P0 |
| **文档访问页面** | 凭链接访问文档下载页面 | P0 |
| **差距分析工具** | 在线问卷，输出差距报告 | P1 |
| **邮件咨询** | 标准版/专业版用户发送邮件咨询 | P1 |

#### 2.3.2 管理端功能（MVP 简化版）
| 功能 | 描述 | 优先级 |
|------|------|--------|
| **订单管理** | 查看订单列表、状态 | P0 |
| **文档管理** | 上传/更新文档模板 | P0 |
| **邮件配置** | 配置邮件模板、发送记录 | P0 |
| **咨询管理** | 查看和回复用户咨询邮件 | P1 |

---

## 3. 信息架构

### 3.1 网站结构

```
首页 (Landing Page)
├── 产品介绍
├── 三档对比
├── 文档清单预览
├── 客户评价（可选）
├── 常见问题 FAQ
└── 购买按钮
    └── 购买流程
        ├── 选择套餐
        ├── 填写邮箱
        ├── 支付（微信/支付宝）
        └── 完成页面（提示查收邮件）

文档访问页面（凭邮件链接访问）
├── 文档下载区（61 个 Word 文件）
├── 实施指南下载
├── 差距分析工具（在线）
└── 咨询入口（标准版/专业版）

管理后台（独立入口）
├── 订单管理
├── 文档管理
├── 邮件配置
└── 咨询管理
```

### 3.2 页面原型要点

#### 首页关键模块
1. **首屏 Hero** - 产品 Slogan + 核心价值 + 购买按钮
2. **三档对比表** - 清晰展示差异
3. **文档清单** - 可下载完整清单 PDF
4. **信任背书** - "已服务 XX 家企业"、"符合 ISO 9001:2015 标准"
5. **FAQ** - 常见问题解答
6. **页脚** - 联系方式、免责声明

#### 购买流程页面
- 步骤清晰：选择套餐 → 填写邮箱 → 支付
- 邮箱验证（可选）：发送验证码确认邮箱有效
- 支付成功后显示完成页面，提示"请查收邮件"

#### 文档访问页面
- 需要密码/令牌验证（邮件中提供）
- 分类展示 61 个文档（可按模块分组）
- 批量下载功能
- 实施指南单独区域

---

## 4. 技术架构

### 4.1 技术栈

| 模块 | 技术方案 | 说明 | 成本 |
|------|---------|------|------|
| **前端托管** | Cloudflare Pages | 静态网站托管 | 免费 |
| **后端 API** | Cloudflare Workers | 无服务器函数 | 免费 |
| **数据库** | Cloudflare D1 | SQLite 边缘数据库 | 免费 |
| **文件存储** | Cloudflare R2 | 对象存储 | 免费 |
| **订单通知** | SendGrid 免费 | 发送订单通知给您 | 免费 (100 封/天) |
| **邮件发送** | 手动发送 | 您手动发邮件给客户 | ¥0 |
| **支付** | 微信支付 + 支付宝 | 需企业资质 | 0.6% 费率 |
| **域名** | 自带域名 | Cloudflare DNS | ¥60/年 |
| **合计** | **≈¥5/月** | 仅域名费用 | |

### 4.2 系统架构

```
用户浏览器
    ↓
[Cloudflare CDN]
    ↓
[Cloudflare Pages] ← 前端静态资源
    ↓
[Cloudflare Workers] ← 后端 API
    ├── 订单管理
    ├── 支付回调
    └── 订单通知（SendGrid）
    ↓
[Cloudflare D1] ← 订单数据、用户邮箱
[Cloudflare R2] ← 61 个 Word 文档存储

[第三方服务]
    ├── 微信支付 API
    ├── 支付宝 API
    └── SendGrid (订单通知)
```

---

## 5. 核心流程

### 5.1 购买→交付流程

```
1. 用户访问 Pages 首页
2. 选择套餐 → 填写邮箱 → 提交订单
3. Workers 创建订单 → 写入 D1 → 返回支付参数
4. 用户完成支付 → 微信/支付宝回调 Workers
5. Workers 验证支付 → 更新 D1 订单状态为"已支付"
6. Workers 调用 SendGrid API → 发送邮件通知您
   📧 通知内容：新订单已支付，用户邮箱 xxx@qq.com，金额¥369
7. 🖐️ 您收到邮件通知 → 登录管理后台
8. 生成访问链接 → 复制邮件模板 → 手动发送给客户
9. 客户收到邮件 → 点击链接 → 访问文档页面
```

### 5.2 您的工作流程

```
收到 SendGrid 通知邮件
    ↓
登录管理后台查看订单详情
    ↓
确认支付金额正确
    ↓
点击"生成访问链接"按钮
    ↓
复制访问链接和密码
    ↓
通过邮箱发送给客户
    ↓
标记订单为"已完成"
```

### 5.3 邮件模板（您手动发送）

```
主题：【ISO 9001 文档工具包】您的订单已完成，请查收访问链接

尊敬的客户：

感谢您购买 ISO 9001 文档工具包【基础版/标准版/专业版】！

📦 您的订单信息：
- 订单号：{order_id}
- 购买套餐：{package_name}
- 购买时间：{purchase_time}

🔗 文档访问链接：
https://yourdomain.com/access?token={access_token}

🔑 访问密码：{access_password}

📋 包含内容：
- 61 个 ISO 9001:2015 Word 文档模板
- 实施指南文档
- 差距分析工具

💡 使用建议：
1. 先阅读实施指南，了解整体流程
2. 使用差距分析工具评估现状
3. 按顺序填写文档模板
4. 如有疑问，回复本邮件咨询（标准版/专业版）

祝您认证顺利！

[您的品牌名称] 团队
联系方式：support@yourdomain.com
```

---

## 6. SendGrid 配置

### 6.1 注册与配置

```bash
# 1. 注册 SendGrid 账号
https://sendgrid.com/free/

# 2. 创建 API Key
Dashboard > Settings > API Keys > Create API Key
权限：Mail Send (Full Access)

# 3. 验证发件人邮箱
Settings > Sender Authentication > Verify Single Sender
使用您的域名邮箱：noreply@yourdomain.com
```

### 6.2 免费额度

| 资源 | 免费额度 | 预计使用 |
|------|---------|---------|
| **每日发送量** | 100 封/天 | <5 封/天（订单通知） |
| **每月发送量** | 3000 封/月 | <150 封/月 |
| **联系人存储** | 2000 个 | 不需要（仅通知） |

---

## 7. API 设计

### 7.1 核心接口

#### 创建订单
```typescript
POST /api/orders
Request:
{
    "email": "user@example.com",
    "package": "basic"
}
Response:
{
    "order_id": "ORD20260409001",
    "amount": 369,
    "payment_params": { ... }
}
```

#### 支付回调
```typescript
POST /api/payments/wechat/notify
POST /api/payments/alipay/notify

// 验证支付成功后：
// 1. 更新 D1 订单状态
// 2. 调用 SendGrid 发送通知
// 3. 返回 success
```

#### 管理后台 - 生成访问链接
```typescript
POST /api/admin/orders/:id/generate
Headers: Authorization: Bearer {admin_token}

Response:
{
    "access_token": "xxx",
    "access_password": "abcd1234",
    "access_url": "https://yourdomain.com/access?token=xxx"
}
```

#### 管理后台 - 标记完成
```typescript
POST /api/admin/orders/:id/complete
Headers: Authorization: Bearer {admin_token}
Request:
{
    "note": "已手动发送邮件"
}
```

---

## 8. 管理后台功能

### 8.1 核心功能

| 功能 | 描述 | 优先级 |
|------|------|--------|
| **订单列表** | 查看所有订单，支持筛选 | P0 |
| **订单详情** | 查看订单详细信息 | P0 |
| **生成访问链接** | 一键生成 access_token 和 password | P0 |
| **复制邮件模板** | 一键复制邮件内容 | P0 |
| **标记完成** | 手动标记订单为"已完成" | P0 |
| **文档管理** | 上传/更新 R2 存储的文档 | P1 |
| **数据导出** | 导出订单数据为 Excel | P2 |

---

## 9. 数据库设计

### 9.1 订单表 (orders)

```sql
CREATE TABLE orders (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    package_type TEXT NOT NULL,
    amount REAL NOT NULL,
    status TEXT DEFAULT 'pending' 
        CHECK(status IN ('pending', 'paid', 'sent', 'completed', 'refunded')),
    
    payment_method TEXT,
    payment_time DATETIME,
    
    -- 访问凭证
    access_token TEXT UNIQUE,
    access_password TEXT,
    access_generated_at DATETIME,
    
    -- SendGrid 通知记录
    admin_notified_at DATETIME,
    admin_notified_status TEXT,
    admin_notified_error TEXT,
    
    -- 手动发送记录
    email_sent_at DATETIME,
    email_sent_by TEXT,
    admin_notes TEXT,
    
    -- 客户访问记录
    first_access_at DATETIME,
    last_access_at DATETIME,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_email ON orders(email);
```

---

## 10. 成本估算

| 项目 | 免费额度 | 预计使用 | 月成本 |
|------|---------|---------|--------|
| **Pages** | 无限 | - | ¥0 |
| **Workers** | 10 万请求/天 | 500 请求/天 | ¥0 |
| **D1 数据库** | 5GB 存储 | <50MB | ¥0 |
| **R2 存储** | 10GB 存储 | 50MB | ¥0 |
| **R2 流量** | 10GB/月 | <1GB | ¥0 |
| **SendGrid** | 100 封/天 | <5 封/天 | ¥0 |
| **手动邮件** | - | - | ¥0 |
| **域名** | - | 1 个域名 | ¥5/月 |
| **支付费率** | 0.6% | 按销售额 | 0.6% |
| **合计** | - | - | **≈¥5/月** |

---

## 11. 运营规划

### 11.1 MVP 上线计划（1 个月）

| 周次 | 任务 | 交付物 |
|------|------|--------|
| **第 1 周** | 需求确认、文档准备、账号配置 | 61 个文档模板、SendGrid 配置 |
| **第 2 周** | Pages 前端开发 | 首页、购买流程、访问页 |
| **第 3 周** | Workers 后端开发、支付接入 | 订单 API、支付回调、SendGrid 集成 |
| **第 4 周** | 测试、部署、上线 | 完整测试、正式上线 |

### 11.2 日常工作流程

```
每天早晚各一次
    ↓
查看 SendGrid 通知邮件
    ↓
登录管理后台处理订单
    ↓
生成链接 → 复制模板 → 发送邮件
    ↓
标记完成
```

---

## 12. 风险评估

### 12.1 技术风险
| 风险 | 应对措施 |
|------|---------|
| 忘记发送邮件 | 设置每日提醒，定期检查后台 |
| 发错邮箱 | 发送前仔细核对订单邮箱 |
| 邮件进入垃圾箱 | 使用企业邮箱，配置 SPF/DKIM |
| 链接泄露 | 设置访问密码，定期更换 token |

### 12.2 合规风险
| 风险 | 应对措施 |
|------|---------|
| ISO 标准版权问题 | 声明"参考 ISO 9001:2015 标准编写，非官方文件" |
| 认证有效性 | 声明"文档仅供参考，不能替代认证机构审核" |
| 支付资质 | 需要企业营业执照接入微信/支付宝官方支付 |

---

## 13. 下一步行动清单

### 立即开始（本周）
- [ ] 注册 Cloudflare 账号
- [ ] 注册 SendGrid 账号
- [ ] 创建 SendGrid API Key
- [ ] 验证发件人邮箱 (noreply@yourdomain.com)
- [ ] 创建 D1 数据库和 R2 Bucket
- [ ] 准备 61 个 Word 文档模板
- [ ] 编写实施指南文档
- [ ] 注册企业微信/支付宝支付账号

### 开发阶段（第 2-3 周）
- [ ] Pages 前端页面开发
- [ ] Workers API 开发
- [ ] 支付接口对接
- [ ] SendGrid 邮件通知集成
- [ ] 管理后台开发
- [ ] R2 文档上传

### 测试上线（第 4 周）
- [ ] 完整流程测试
- [ ] 测试 SendGrid 通知邮件
- [ ] 模拟手动发送邮件测试
- [ ] 文档内容审核
- [ ] Wrangler 部署上线
- [ ] 配置自定义域名
- [ ] 准备 FAQ 和客服话术

---

## 附录

### A. SendGrid 环境变量示例

```toml
# wrangler.toml
[vars]
SENDGRID_API_KEY = "SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
SENDGRID_FROM_EMAIL = "noreply@yourdomain.com"
ADMIN_EMAIL = "your-personal-email@gmail.com"
WECHAT_PAY_KEY = "xxx"
ALIPAY_KEY = "xxx"
```

### B. 免责声明模板

```
免责声明：

1. 本文档工具包参考 ISO 9001:2015 标准编写，非 ISO 官方文件，
   仅供企业实施质量管理体系参考使用。

2. 本文档不能替代认证机构的正式审核，企业认证结果以认证
   机构审核为准。

3. 由于企业实际情况差异，本文档可能需要根据实际情况调整，
   建议在使用前咨询专业质量顾问。

4. 购买后不支持退款，请确认需求后下单。

5. 本文档仅限购买企业内部使用，不得转售或公开传播。
```

### C. 参考链接
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
- [Cloudflare D1 文档](https://developers.cloudflare.com/d1/)
- [Cloudflare R2 文档](https://developers.cloudflare.com/r2/)
- [SendGrid 免费邮件](https://sendgrid.com/free/)
- [Advisera 参考页面](https://advisera.com/9001academy/zh-cn/iso-9001wdgjb/)

---

**PRD 版本：** v1.0 (SendGrid 通知版)  
**最后更新：** 2026 年 4 月 9 日  
**负责人：** [您的名字]

---

🎉 **PRD 完成！可以开始开发了！**
