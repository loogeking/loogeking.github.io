# Loogeking's Blog - 开发文档

> 最后更新：2025-XX-XX  
> 博客地址：https://loogeking.bbroot.com  
> 源码仓库：https://github.com/loogeking/loogeking.github.io

---

## 1. 技术栈

| 项 | 版本/方案 |
|----|-----------|
| 静态站生成器 | Hexo 8.1.2 |
| 主题 | Butterfly（打包在仓库内，非 npm/submodule）|
| 部署 | GitHub Actions → GitHub Pages |
| 域名 | `loogeking.bbroot.com`（自定义域名 CNAME） |
| 图床 | postimg.cc（第三方，国内不稳） |
| 视频 | 本地 `source/img/*.mp4` |
| 统计 | 不蒜子（`busuanzi.9420.ac` 备用节点）|
| 评论 | 未启用 |
| 搜索 | 未启用 |
| 文章加密 | 未启用（曾评估 `hexo-blog-encrypt`）|

---

## 2. 项目结构

```
blog/
├── _config.yml                 # Hexo 主配置（只放 Hexo 相关）
├── _config.butterfly.yml       # 主题配置（menu/social/aside/inject 等）
├── package.json
├── package-lock.json
├── .gitignore                  # 已忽略 db.json / node_modules / public 等
├── .github/
│   └── workflows/              # GitHub Actions 部署配置
├── scaffolds/                  # 新文章模板
├── source/                     # 内容源
│   ├── _posts/                 # 文章 Markdown
│   ├── _data/
│   │   └── link.yml            # 友链数据（数据驱动，非页面硬编码）
│   ├── about/                  # 关于页
│   ├── link/                   # 友链页
│   ├── categories/             # 分类页
│   ├── tags/                   # 标签页
│   ├── css/
│   │   └── custom.css          # 【核心】自定义样式（1500+ 行）
│   ├── js/
│   │   ├── custom.js           # 【核心】自定义脚本（背景/视频/懒加载/移动TOC）
│   │   └── auto-dark-post.js   # 【核心】文章页自动暗模式
│   └── img/                    # 本地图片 / 视频
│       ├── favicon.png
│       ├── avatar.png
│       ├── index.mp4           # 桌面端首页 banner 视频
│       └── index_phone.mp4     # 移动端首页 banner 视频
└── themes/
    └── butterfly/              # 主题源码（打包在仓库）
```

---

## 3. 设计系统

### 3.1 设计定位

**HarmonyOS 6/7 沉浸光感风格**：

- 全站毛玻璃卡片（backdrop-filter）
- 沉浸式 Banner（视频背景 + 滚动模糊过渡）
- 卡片悬停旋转光晕（conic-gradient 动效）
- 首页/友链左右图文对开
- macOS 风代码块
- 完整的明暗双主题
- 移动端专门降级

### 3.2 CSS 变量令牌（Design Tokens）

定义在 `custom.css` 顶部的 `:root` 和 `[data-theme="dark"]`：

```css
--lk-card-bg           /* 卡片背景 */
--lk-card-bg-hover     /* 卡片悬停背景 */
--lk-card-border       /* 卡片描边 */
--lk-card-shadow       /* 卡片阴影 */
--lk-card-shadow-hover /* 卡片悬停阴影 */
--lk-text              /* 主文字色 */
--lk-text-sub          /* 副文字色 */
--lk-text-meta         /* meta 文字色 */
--lk-accent            /* 主题色（蓝）*/
--lk-accent-soft       /* 主题色浅版 */
--lk-glow              /* 光晕色 */
--lk-blur              /* 毛玻璃模糊值（移动端会降为 20px）*/
--lk-saturate          /* 毛玻璃饱和度 */
--lk-ease              /* 标准动画曲线 */
--lk-ease-spring       /* 弹性动画曲线 */
--lk-duration          /* 标准动画时长 */
--lk-body-bg           /* 全局背景图 URL（由 JS 动态设置）*/
```

### 3.3 断点

单一移动端断点：`768px`（同步 CSS `@media` 和 JS `CONFIG.mobileBreakpoint`）

---

## 4. CSS 模块索引（`source/css/custom.css`）

| 编号 | 模块 | 说明 |
|------|------|------|
| 1 | 设计令牌 | CSS 变量定义（明暗两套）|
| 2 | 全局背景 | `body::before` 承载全局背景图 |
| 3 | 透明化主区域 | 让毛玻璃卡片能透过背景显示 |
| 4 | 侧边栏文字对比度 | 强化亮/暗模式下文字可读性 |
| 5 | 毛玻璃卡片基类 | `.lk-glass` + 各页面卡片统一样式 |
| 6 | 文章卡片 | 首页 45%+55% 图文对开布局 + 旋转光晕 |
| 7 | 顶部导航栏 | 滚动后毛玻璃背景 |
| 8 | Banner | 顶部渐变遮罩 + 滚动模糊 |
| 9 | 视频背景容器 | `.lk-video-banner` |
| 10 | 滚动懒加载 | `.lk-reveal` / `.lk-visible` |
| 11 | 滚动条美化 | webkit 自定义滚动条 |
| 12 | 选中文字颜色 | `::selection` |
| 13 | 右下角工具栏 | 毛玻璃按钮 |
| 14 | 文章详情页 | 文章卡毛玻璃 + 标题白字 |
| 15 | 归档页 | 时间轴 + 卡片 + 光晕 |
| 16 | 标签总览页 | 标签云胶囊 |
| 17 | 分类页 | 分类卡片 |
| 19 | 关于页 | 关于卡片 |
| 20 | 明暗切换按钮 | 圆形毛玻璃按钮 |
| 21 | 兼容性降级 | `@supports not (backdrop-filter)` |
| 22 | 无障碍 | `prefers-reduced-motion` |
| 23 | 友链页 | 左右交叉图文卡（复刻文章卡）|
| 24 | 文章目录 TOC | 高对比度 + active 高亮 |
| 25 | 代码块 | macOS 风三色灯 + 亮暗两套语法高亮 |
| 26 | MathJax 公式 | 溢出滚动 |
| 27 | 文章图片 | 圆角 + 阴影 |
| 28 | 移动端浮动 TOC | 悬浮按钮 + 侧滑面板 |
| 29 | 标签具体页 | 复用归档样式（同 15 节，前缀 `#tag`）|

---

## 5. JS 模块索引

### 5.1 `source/js/custom.js`（IIFE + PJAX 兼容）

| 编号 | 函数 | 功能 |
|------|------|------|
| 1 | `setBodyBackground` | 根据移动/桌面切换全局背景图 |
| 2 | `isHomePage` | 判断是否首页 |
| 3 | `getPageVideoConfig` | 读取页面级 meta 视频配置 |
| 4 | `injectVideoBanner` + `createVideoBanner` + `createPosterBanner` | 视频/海报 Banner 注入 |
| 5 | `observeBannerVisibility` | 视频离开视口自动暂停（省电）|
| 6 | `handleBannerScroll` | Banner 滚动模糊过渡 |
| 7 | `setupRevealAnimation` | 卡片滚动入场（动画完成后清 `will-change`）|
| 8 | `enableCoverVideos` | 支持 `data-cover-video` 属性 |
| 9 | `setupMobileTocButton` | 移动端浮动目录按钮（**必须在 IIFE 内**）|
| 10 | `init` / `reinit` | 首次加载 + PJAX 完成回调 |

#### 关键配置

```javascript
CONFIG = {
  bodyBackground: '...',          // 桌面端背景图
  mobileBackground: '...',        // 移动端背景图
  homeVideo: '/img/index.mp4',    // 桌面端首页视频
  homePoster: '...',              // 视频海报
  mobileHomeVideo: '/img/index_phone.mp4', // 移动端首页视频
  enableVideo: true,
  mobileBreakpoint: 768,
  revealSelectors: [...]          // 参与懒加载的选择器列表
}
```

#### 如何给某篇文章的顶图换视频

在文章 front-matter 加：

```yaml
---
title: xxx
top_img: /img/xxx-poster.jpg
---
```

然后在文章正文顶部插入：

```html
<meta name="lk-top-video" content="/img/xxx.mp4">
<meta name="lk-top-poster" content="/img/xxx-poster.jpg">
```

### 5.2 `source/js/auto-dark-post.js`

进入文章页自动切暗模式，离开恢复用户偏好。

- 用 `sessionStorage.lk-user-theme-before-post` 保存进文章前的主题
- 通过 Butterfly 的 `switchNightMode()` 切换（保证组件同步）
- 兼容 PJAX（`pjax:complete` 事件）

---

## 6. 配置文件说明

### 6.1 `_config.yml`（Hexo 主配置）

**只放 Hexo 框架相关配置**：

- Site 基础信息（title / url / language）
- URL 规则（permalink）
- 目录路径
- Writing 规则
- 生成器分页（archive / category / tag）
- 数学公式（mathjax）
- Markdown 插件

**不要**在这里写主题相关配置！

### 6.2 `_config.butterfly.yml`（主题配置）

所有主题相关的配置：

- `menu`：导航菜单
- `social`：社交按钮
- `avatar`：头像
- `subtitle`：副标题
- `cover`：文章封面
- `aside`：侧边栏
- `toc`：目录
- `darkmode`：暗黑模式
- `pjax`：无刷新切换
- `busuanzi`：不蒜子统计
- **`inject`**：注入自定义 CSS / JS（关键）

### 6.3 关键 inject 配置

```yaml
inject:
  head:
    - <link rel="stylesheet" href="/css/custom.css">
  bottom:
    - <script src="/js/custom.js"></script>
    - <script src="/js/auto-dark-post.js"></script>
    - <script defer src="//busuanzi.9420.ac/busuanzi.pure.mini.js"></script>
```

---

## 7. 常见操作

### 7.1 写新文章

```bash
hexo new post "文章标题"
# 会在 source/_posts/ 生成 md 文件
```

front-matter 示例：

```yaml
---
title: 文章标题
date: 2025-XX-XX XX:XX:XX
tags:
  - C++
categories:
  - 编程
cover: /img/covers/xxx.jpg        # 可选：文章封面
top_img: /img/top/xxx.jpg         # 可选：文章顶图（覆盖默认）
description: 文章摘要
---
```

### 7.2 本地预览

```bash
hexo clean
hexo generate
hexo server
# 打开 http://localhost:4000
```

### 7.3 部署

```bash
git add .
git commit -m "post: xxx"
git push
# GitHub Actions 会自动构建 + 部署
```

### 7.4 修改样式

1. 打开 `source/css/custom.css`
2. 按模块索引找到对应位置
3. `hexo clean && hexo g && hexo s` 本地预览
4. 提交推送

### 7.5 修改主题源码（谨慎）

主题源码在 `themes/butterfly/`，因为**打包在主仓库**，修改会永久保留。

- 修改前建议单独 commit，方便回滚
- 大部分需求应该优先用 `custom.css` / `custom.js` 覆盖
- 只有 CSS/JS 覆盖不了的情况（比如改 HTML 结构）才动主题源码

---

## 8. 已知问题与限制

| 问题 | 现状 | 后续计划 |
|------|------|----------|  
| `postimg.cc` 图床国内慢 | 已知，暂不处理 | 后续可迁移到 GitHub + jsdelivr 或本地 |
| `db.json` 历史遗留在 git 中 | 已从索引移除，历史仍在 | 如需彻底清理需 `git filter-repo` |
| `footer.since: 2026` | 未来年份，暂不改 | 保持 |
| 主题源码非子模块 | 打包在主仓库 | 好处：改动可追踪；坏处：升级主题需手动 merge |
| 无评论系统 | 未启用 | 需要时可接入 Twikoo / Giscus |
| 无站内搜索 | 未启用 | 需要时可启用 `hexo-generator-search` + Butterfly 内置搜索 |
| 不蒜子官方节点不稳 | 已换 `busuanzi.9420.ac` | 备用：jsdelivr CDN 版 |

---

## 9. 修改历史

| 日期 | 版本 | 主要改动 |
|------|------|----------|
| 初始 | v1.0 | Hexo + Butterfly 初始化 |
| - | v1.1 | 添加 GitHub Actions |
| - | v1.2 | 友链改数据驱动（`_data/link.yml`）|
| - | v1.3 | 代码块 macOS 风改造 |
| - | v1.4 | 图床迁移到 postimg.cc |
| - | v1.5 | 处理首页视频丢失 |
| 本次 | v2.0 | **标签页时间轴 + 移动端 TOC 修复 + 视频本地化 + 暗模式逻辑优化 + `_config.yml` 大清理 + 补齐 DEVELOPMENT.md** |

---

## 10. 联系 / 备份

- 博客源码：https://github.com/loogeking/loogeking.github.io
- 建议：**主题源码修改** + **`source/` 目录**定期打 tag 备份
- 关键配置文件双份备份：
  - `_config.yml`
  - `_config.butterfly.yml`
  - `source/css/custom.css`
  - `source/js/custom.js`
  - `source/js/auto-dark-post.js`

---

**End of DEVELOPMENT.md**