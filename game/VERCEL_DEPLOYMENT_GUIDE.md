# 🚀 Vercel部署指南 - 解决404错误

## ❌ 问题描述

在Vercel部署后遇到404错误，特别是在刷新页面或直接访问路由时。

## ✅ 解决方案

### 1. 创建Vercel配置文件

已在项目根目录创建 `vercel.json` 文件：

```json
{
  "rewrites": [
    {
      "source": "/((?!api).*)",
      "destination": "/index.html"
    }
  ]
}
```

**说明**：
- `rewrites`: 重写规则
- `source`: 匹配所有非API路由
- `destination`: 重定向到index.html
- 这让React Router处理客户端路由

### 2. GitHub仓库准备

确保仓库包含以下文件：

```
your-repo/
├── vercel.json          # ✅ 新增
├── package.json
├── vite.config.ts       # 确保存在
├── index.html
├── src/
└── ...
```

### 3. Vercel部署步骤

#### 方法一：通过Vercel CLI (推荐)

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录Vercel
vercel login

# 在项目根目录执行
vercel

# 按提示操作
# ✓ Set up and deploy? Y
# ✓ Which scope? 选择你的账户
# ✓ Link to existing project? N
# ✓ What's your project's name? frozen-hope
# ✓ In which directory is your code located? ./
# ✓ Want to override settings? N
```

#### 方法二：通过Vercel Dashboard

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 选择 "Import Git Repository"
4. 选择你的GitHub仓库
5. **重要**：在配置页面，检查以下设置：
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (默认)
   - **Build Command**: `npm run build` (自动填充)
   - **Output Directory**: `dist` (自动填充)
   - **Install Command**: `npm install` (自动填充)
6. 点击 "Deploy"

### 4. 部署后验证

部署完成后，Vercel会提供一个URL，例如：
`https://frozen-hope-xxxx.vercel.app`

测试以下功能：
- ✅ 首页加载
- ✅ 角色选择页面
- ✅ 开始游戏
- ✅ **刷新页面** - 不应该404
- ✅ 直接访问路由 - 不应该404

### 5. 常见问题解决

#### 问题1: 刷新页面后404

**原因**: 缺少vercel.json配置
**解决**: 已添加配置文件，重新部署

#### 问题2: 构建失败

**检查**:
```bash
# 本地构建测试
npm run build

# 应该看到
# ✓ built in 896ms
```

**解决方案**:
- 确保package.json中的build脚本正确：
  ```json
  {
    "scripts": {
      "build": "tsc && vite build"
    }
  }
  ```

#### 问题3: 路由直接访问404

**原因**: Vercel没有配置SPA重写规则
**解决**: vercel.json已配置

#### 问题4: 空白页面

**检查**:
- 打开浏览器控制台 (F12)
- 查看是否有JavaScript错误
- 确保所有资源加载成功

### 6. 环境变量 (可选)

如果需要环境变量：

1. 在Vercel项目设置中添加：
   - `VITE_APP_TITLE`: "Frozen Hope"
   - `VITE_API_URL`: "your-api-url"

2. 或创建 `.env.local` 文件：
   ```
   VITE_APP_TITLE=Frozen Hope
   ```

### 7. 自动部署

连接GitHub后，每次推送到main分支会自动部署：

```bash
git add .
git commit -m "Update project"
git push origin main
```

Vercel会自动检测到推送并开始部署。

### 8. 域名配置 (可选)

在Vercel项目设置中：
1. 进入 "Domains" 标签
2. 添加自定义域名
3. 按照提示配置DNS记录

### 9. 性能优化配置

更新 `vercel.json` 添加缓存策略：

```json
{
  "rewrites": [
    {
      "source": "/((?!api).*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

### 10. 部署检查清单

- [ ] 提交vercel.json到仓库
- [ ] 确保构建成功 (npm run build)
- [ ] 在Vercel创建项目
- [ ] 选择正确的框架 (Vite)
- [ ] 点击部署
- [ ] 测试所有页面
- [ ] 测试刷新功能
- [ ] 配置自定义域名 (可选)

### 11. Vercel vs 其他平台

| 平台 | 配置难度 | 速度 | 费用 | 备注 |
|------|----------|------|------|------|
| Vercel | ⭐⭐⭐⭐⭐ | 快 | 免费 | React推荐 |
| Netlify | ⭐⭐⭐⭐ | 快 | 免费 | 类似Vercel |
| GitHub Pages | ⭐⭐⭐ | 中 | 免费 | 需额外配置 |
| Firebase | ⭐⭐⭐ | 快 | 免费 | Google生态 |

### 12. 监控与分析

在Vercel Dashboard中查看：
- **Functions**: 函数执行日志
- **Analytics**: 页面访问统计
- **Web Vitals**: 性能指标
- **Usage**: 带宽和请求数

### 13. 故障排除

如果仍然遇到问题：

1. **检查构建日志**：
   - 在Vercel Dashboard → Deployments → 查看构建日志
   - 寻找红色错误信息

2. **本地验证**：
   ```bash
   # 清理并重新安装
   rm -rf node_modules
   rm package-lock.json
   npm install

   # 构建测试
   npm run build

   # 预览构建结果
   npm run preview
   ```

3. **检查控制台错误**：
   - 打开浏览器F12
   - 查看Console和Network标签
   - 寻找404或500错误

4. **联系支持**：
   - Vercel Discord社区
   - GitHub Issues

### 14. 成功标志

部署成功后，你应该看到：
- ✅ 首页正常加载
- ✅ 角色选择可用
- ✅ 游戏功能完整
- ✅ 刷新页面正常
- ✅ 所有路由可访问
- ✅ 性能指标良好

---

## 🎯 快速开始

只需3步：

1. **确保vercel.json已创建** ✅
2. **推送到GitHub**:
   ```bash
   git add .
   git commit -m "Add Vercel config"
   git push
   ```
3. **在Vercel部署**:
   - 访问 [vercel.com](https://vercel.com)
   - 导入仓库
   - 点击部署

---

**🎮 游戏很快就可以在线畅玩了！**

*更多问题请参考 [Vercel文档](https://vercel.com/docs)*
