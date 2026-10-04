---
title: 安装codex并接入模型教程
date: 2026-09-13 21:16:37
tags:
  - 工具
categories:
  - 教程
cover: https://img.loogeking.top/images/codex接入deepseek教程/cover.jpg
description: 本文教你如何从零安装配置codex，cc-switch
---

# 安装codex并接入cc-switch教程

---

## 一、准备工作

### 1.1、安装codex和cc-switch

codex（现在叫chatgpt），没有vpn的直接在微软商店下载

![index-1](https://img.loogeking.top/images/codex接入deepseek教程/1.png)

cc-switch是github上的一个开源项目：https://github.com/farion1231/cc-switch/releases

下载你与你系统相匹配的即可

### 1.2、密钥的获取

#### 1、deepseek官网

网址：https://platform.deepseek.com/usage

注册登录过程这里不展示（记得先充钱，没钱可用不了），下面展示api-key的创建过程：

![index-2](https://img.loogeking.top/images/codex接入deepseek教程/2.png)

api-key的名字随意，看你自己

![index-3](https://img.loogeking.top/images/codex接入deepseek教程/3.png)

切记这个api-key不可向他人展示以及必须复制下来保存（不复制你就用不了）

![index-4](https://img.loogeking.top/images/codex接入deepseek教程/4.png)

#### 2、注册docode创建密钥使用

网址：https://ai.docode.life/register

邀请码：NMGu

![index-4](https://img.loogeking.top/images/codex接入deepseek教程/9.png)

注册时输入邀请码可以获得250的额度，加上新用户的50，共计300额度

但是该网站只给你前面几次调用的试用，如果好用还请充值支持一下

这里说一下用户分组：

- 普通用户（没充值）每天总共就2w额度的token池，用完就得等次日9点刷新
- vip用户可选择用户分组（添加新的密钥时），openai系列建议先使用gpt pro分组，如果有较高的开发需求可考虑官方或者不降智
- ![index-4](https://img.loogeking.top/images/codex接入deepseek教程/12.png)

---

## 二、接入

### 1、接入deepseek

刚开始登录你要是没有账号就直接api-key登录，登陆后界面如下

![index-5](https://img.loogeking.top/images/codex接入deepseek教程/5.png)

而后打开powershell，输入：

```powershell
irm https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.ps1 | iex
```

![index-6](https://img.loogeking.top/images/codex接入deepseek教程/6.png)

接着，彻底关掉codex（检查任务管理器，看看是不是还有进程）后重新打开，界面更新如下：

![index-7](https://img.loogeking.top/images/codex接入deepseek教程/7.png)

这样就接入deepseek成功了！

### 2、配置cc-switch接入

相较于deepseek的单一令牌，cc-switch就相当于一个令牌管理工具，感兴趣的可以搜索相关文章了解，本文只教如何快速配置。

首先你新建好密钥：

![index-4](https://img.loogeking.top/images/codex接入deepseek教程/10.png)

选择你想要的模型即可，模型价格参考：[DoCode模型定价](https://ai.docode.life/pricing-list)

![index-4](https://img.loogeking.top/images/codex接入deepseek教程/11.png)

---

## 三、测试功能

输入这段指令：

```text
请帮我生成一个数据可视化仪表盘的单页面 HTML 文件（dashboard.html）。

要求：
1. 通过 CDN 方式引入 ECharts（例如 https://cdn.jsdelivr.net/npm/echarts），不使用任何本地依赖或构建工具，
   我要能直接双击这个 html 文件在浏览器里打开查看效果。
2. 页面包含至少 4 个图表：
   - 一个折线图：展示某产品近 12 个月的销售趋势（数据可以是模拟的）
   - 一个柱状图：展示 5 个地区的销售额对比
   - 一个饼图：展示各产品品类的销售占比
   - 一个仪表盘（gauge）：展示当月目标完成率
3. 整体使用响应式布局（CSS Grid 或 Flexbox），在桌面和手机宽度下都要能正常显示，不能错位。
4. 支持深色/浅色主题一键切换，切换时所有图表配色也要跟着联动变化。
5. 图表加载时要有淡入或缩放的进场动画。
6. 顶部要有一个模拟的筛选栏（时间范围选择、地区下拉框），选择后图表数据能相应联动刷新（数据变化可以是前端模拟的）。

请直接生成完整可运行的 HTML 文件内容。
```

得到：

![index-8](https://img.loogeking.top/images/codex接入deepseek教程/8.png)

这样，你将拥有一个强大的AI工具！！！

