# 版本切换指南

## 当前版本结构

### 分支说明
- **master**: 原始版本（单产品ISO 9001工具包）
- **feature/new-design**: 新设计版本（多产品平台）

### 切换到原始版本（单产品）
```bash
cd ~/iso9001-toolkit
git checkout master
```
然后打开：`public/index.html`

### 切换到新版本（多产品平台）
```bash
cd ~/iso9001-toolkit
git checkout feature/new-design
```
然后打开：`public/index.html`

## 文件结构对比

### 原始版本 (master)
```
public/
├── index.html          # 单产品页面
├── styles.css          # 原样式
└── app.js              # 原脚本
```

### 新版本 (feature/new-design)
```
public/
├── index.html          # 多产品平台首页
├── iso9001.html        # ISO 9001产品页面
├── index-original.html # 原文件备份
├── styles.css          # 更新后的样式
└── app.js              # 扩展的脚本
```

## 快速切换脚本

### 切换到原始版本
```bash
cd ~/iso9001-toolkit
git checkout master
open public/index.html
```

### 切换到新版本
```bash
cd ~/iso9001-toolkit
git checkout feature/new-design
open public/index.html
```

### 创建新的产品页面
```bash
# 复制ISO 9001页面作为模板
cp public/iso9001.html public/iso27001.html
# 编辑新页面...
```

## 注意事项
1. 切换分支前请保存当前工作
2. 切换后需要重新打开HTML文件
3. 如果修改了样式，两个版本的CSS可能不同
4. 建议在新分支上开发新功能