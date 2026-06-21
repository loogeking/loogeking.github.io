---
title: CSS学习笔记
date: 2026-06-21 08:26:23
tags:
  - CSS
categories:
  - 前端开发
cover: /img/articles/CSS.png
---
# CSS学习笔记
---

## 1. CSS 基础概念

### 1.1 什么是CSS？

- **定义**：层叠样式表（Cascading Style Sheets）
- **作用**：用于描述HTML元素的显示样式，包括颜色、布局、字体等
- **重要性**：实现内容与表现的分离

### 1.2 CSS规则结构

```css
selector {
  property: value;  /* 声明 */
  /* 更多声明 */
}
```

- **选择器**：定位要样式化的HTML元素
- **声明块**：包含一个或多个样式声明
- **声明**：由属性和值组成

### 1.3 CSS引入方式

| 方式 | 语法 | 优点 | 缺点 |
| :--: | :--: | :--: | :--: |
| 内联 | `<div style="color: red;">` | 优先级高 | 不易维护，破坏结构分离 |
| 内部 | `<style>div {color: red;}</style>` | 适合小项目 | 增加HTML文件大小 |
| 外部 | `<link rel="stylesheet" href="style.css">` | 最佳实践，易维护 | 需要额外HTTP请求 |

---

## 2. CSS选择器

### 2.1 基础选择器

```css
/* 元素选择器 */
p { color: blue; }

/* 类选择器 */
.classname { color: red; }

/* ID选择器 */
#idname { color: green; }

/* 通用选择器 */
* { margin: 0; padding: 0; }
```

### 2.2 组合器

| 组合器 | 语法 | 描述 |
| :----: | :--: | :--: |
| 后代 | `div p` | 选择div内的所有p元素 |
| 子元素 | `div > p` | 只选择div的直接子元素p |
| 相邻兄弟 | `h1 + p` | 选择紧接在h1后的p元素 |
| 后续兄弟 | `h1 ~ p` | 选择h1后的所有同级p元素 |

### 2.3 伪类选择器

```css
/* 用户交互 */
:hover { background: yellow; }
:focus { border: 2px solid blue; }
:active { transform: scale(0.95); }

/* 表单状态 */
:checked { accent-color: green; }
:disabled { opacity: 0.5; }
:valid { border-color: green; }
:invalid { border-color: red; }

/* 结构伪类 */
:first-child { font-weight: bold; }
:nth-child(odd) { background: #f0f0f0; }
:last-child { margin-bottom: 0; }
```

### 2.4 伪元素

```css
::before {
  content: "※ ";
  color: red;
}

::after {
  content: " ✓";
  color: green;
}

::first-letter {
  font-size: 2em;
  color: #900;
}

::selection {
  background: yellow;
  color: black;
}
```

### 2.5 选择器优先级

优先级从高到低：

- 内联样式
- ID选择器
- class选择器
- 元素选择器
- 通用选择器

```html
<head>
  <style>
    p {
      color: blue;       /* 元素选择器，优先级最低 */
    }
    .highlight {
      color: green !important;  /* !important 强制覆盖所有规则 */
    }
    #unique {
      color: purple;     /* ID选择器，优先级最高 */
    }
  </style>
</head>
<body>
  <p id="unique" class="highlight">This text</p>
</body>
```

- 若没有 `!important`：ID选择器优先级最高 → 显示 **purple**
- 加了 `!important` 后：强制覆盖所有规则 → 显示 **green**

> ⚠️ `!important` 会打破正常的优先级计算，非必要不建议使用，会增加后期维护难度。

---

## 3. HTML元素显示类型

### 3.1 对比总览

| 特性 | 块元素 (Block) | 行内元素 (Inline) | 行内块元素 (Inline-block) |
| :--- | :------------: | :---------------: | :-----------------------: |
| **默认宽度** | 父元素的100% | 内容宽度 | 内容宽度 |
| **能否设置宽高** | 可以 | 不可以 | 可以 |
| **垂直外边距** | 有效 | 无效 | 有效 |
| **水平外边距** | 有效 | 有效 | 有效 |
| **换行行为** | 独占一行 | 不换行 | 不换行 |
| **排列方式** | 垂直排列 | 水平排列 | 水平排列 |
| **包含关系** | 可包含块/行内 | 只能包含行内 | 可包含块/行内 |

### 3.2 块元素 (Block Elements)

**常见块元素**

```html
<div>, <p>, <h1>-<h6>, <ul>, <ol>, <li>, <section>, <article>, <nav>, <header>, <footer>
```

**核心特性**

```css
/* 块元素的默认样式相当于 */
display: block;
width: 100%;      /* 默认占满父容器宽度 */
height: auto;     /* 高度由内容决定 */
```

**示例代码**

```html
<div class="block-demo">
    <p>这是一个段落（块元素）</p>
    <div>这是一个div（块元素）</div>
    <h2>这是一个标题（块元素）</h2>
</div>
```

```css
.block-demo p,
.block-demo div,
.block-demo h2 {
    background-color: lightblue;
    margin: 10px 0;   /* 垂直外边距有效 */
    padding: 10px;
    width: 300px;     /* 可以设置宽度 */
    height: 50px;     /* 可以设置高度 */
}
```

**特性总结**

- **独占一行**：自动换行，前后都有换行符
- **可设置宽高**：width 和 height 属性有效
- **垂直外边距有效**：上下 margin 会影响布局
- **默认宽度100%**：占满父容器的宽度

### 3.3 行内元素 (Inline Elements)

**常见行内元素**

```html
<span>, <a>, <strong>, <em>, <b>, <i>, <label>
```

**核心特性**

```css
/* 行内元素的默认样式相当于 */
display: inline;
width: auto;       /* 宽度由内容决定，不可设置 */
height: auto;      /* 高度由内容决定，不可设置 */
```

**示例代码**

```html
<p>
    这是一个<span>行内元素</span>，
    <a href="#">链接也是行内元素</a>，
    <strong>加粗</strong>也是。
</p>
```

```css
span, a, strong {
    background-color: lightgreen;
    margin: 20px 10px;  /* 只有水平外边距有效，垂直无效 */
    padding: 5px 10px;
    width: 100px;       /* 设置无效 */
    height: 50px;       /* 设置无效 */
    line-height: 2;     /* 行高有效 */
}
```

**特性总结**

- **不换行**：在同一行内显示
- **不可设置宽高**：width 和 height 属性无效
- **垂直外边距无效**：上下 margin 不影响布局
- **水平排列**：像文字一样从左到右排列

### 3.4 行内块元素 (Inline-block Elements)

**如何创建行内块**

```html
<!-- 默认是行内块的元素 -->
<img>, <button>, <input>, <textarea>, <select>

<!-- 通过CSS转换 -->
<div class="inline-block">我是行内块</div>
```

```css
.inline-block {
    display: inline-block;  /* 关键属性 */
}
```

**示例代码**

```html
<div class="container">
    <div class="box">行内块 1</div>
    <div class="box">行内块 2</div>
    <div class="box">行内块 3</div>
</div>
```

```css
.container {
    text-align: center;
}

.box {
    display: inline-block;
    width: 100px;
    height: 100px;
    margin: 10px;
    padding: 15px;
    background-color: coral;
    vertical-align: middle;  /* 控制垂直对齐 */
}
```

**特性总结**

- **不换行**：像行内元素一样水平排列
- **可设置宽高**：像块元素一样可以控制尺寸
- **垂直外边距有效**：完整的外边距控制
- **有间隙问题**：元素间会有默认空格间隙

---

## 4. CSS单位与计算函数

### 4.1 绝对单位

| 单位 | 描述 | 换算关系 | 示例 |
| :--- | :--- | :------- | :--- |
| **px** | 像素，固定大小单位 | 1px = 1/96 英寸 | `width: 100px` |
| **in** | 英寸 | 1in = 96px | `width: 1in` |
| **cm** | 厘米 | 1cm ≈ 37.8px | `width: 1cm` |
| **mm** | 毫米 | 1mm = 1/10 cm | `width: 10mm` |
| **pt** | 点 | 1pt = 1/72 英寸 | `font-size: 12pt` |
| **pc** | Picas | 1pc = 1/6 英寸 | `width: 1pc` |

### 4.2 相对单位

| 单位 | 描述 | 使用场景 |
| :--- | :--- | :------- |
| **%** | 相对于父元素尺寸 | 宽度、高度布局 |
| **em** | 相对于当前元素字体大小 | 组件内相对间距 |
| **rem** | 相对于根元素字体大小 | 全局字体、间距 |
| **vw** | 视口宽度的1% | 响应式宽度 |
| **vh** | 视口高度的1% | 全屏布局 |
| **vmin** | 视口较小边的1% | 响应式正方形 |
| **vmax** | 视口较大边的1% | 特殊响应式场景 |

**em 与 rem 的区别**

```css
html { font-size: 16px; }

.parent {
    font-size: 20px;
    padding: 2em;   /* 2 × 20px = 40px，相对当前元素 */
}

.child {
    font-size: 2rem; /* 2 × 16px = 32px，相对根元素，不受父元素影响 */
}
```

### 4.3 calc() 函数

`calc()` 允许在样式中直接进行数学计算，动态确定属性值。

**语法**

```css
property: calc(expression);
```

> ⚠️ 加法和减法运算符前后必须有空格，否则无效。

**基本使用**

```css
.box {
  /* 视口宽度减去固定侧边栏 */
  width: calc(100vw - 200px);

  /* 50%宽度加上间距补偿 */
  width: calc(50% + 20px);

  /* 全屏高度减去头部 */
  height: calc(100vh - 60px);
}
```

**响应式布局**

```css
/* 三列等宽，含间距 */
.col {
  width: calc((100% - 40px) / 3);
  margin-right: 20px;
}

.col:last-child {
  margin-right: 0;
}
```

**流体字体公式**

```css
/* 在320px到1200px视口中，字体从16px线性变化到24px */
font-size: calc(16px + (24 - 16) * (100vw - 320px) / (1200 - 320));
```

**使用技巧**

```css
/* ✅ 正确：运算符前后有空格 */
width: calc(100% - 20px);

/* ❌ 错误：缺少空格 */
width: calc(100%-20px);

/* 可以使用括号 */
height: calc((100vh - 80px) / 2);

/* 结合多种单位 */
padding: calc(2rem + 5vw);
```

### 4.4 其他计算函数

```css
/* min()：取最小值 */
width: min(100%, 1200px);      /* 不超过1200px */

/* max()：取最大值 */
height: max(50vh, 300px);      /* 至少300px */

/* clamp()：限定范围 */
font-size: clamp(1rem, 2.5vw, 2rem);  /* 最小1rem，最大2rem，理想2.5vw */
```

> 💡 `clamp(min, ideal, max)` 是响应式设计中非常实用的函数，可以替代很多媒体查询。

---

## 5. 伪类与伪元素

### 5.1 核心概念

| | 伪类 | 伪元素 |
| :--- | :--- | :--- |
| **语法** | 单冒号 `:` | 双冒号 `::` |
| **作用** | 基于元素状态或位置进行选择 | 创建虚拟元素，插入内容 |
| **示例** | `:hover`、`:nth-child()` | `::before`、`::after` |

### 5.2 用户动作伪类

| 伪类 | 描述 |
| :--- | :--- |
| `:hover` | 鼠标悬停时 |
| `:active` | 元素被激活时（如点击按钮瞬间） |
| `:focus` | 元素获得焦点时 |
| `:focus-within` | 元素自身或其后代获得焦点时 |

### 5.3 输入伪类

| 伪类 | 描述 |
| :--- | :--- |
| `:enabled` | 启用的表单元素 |
| `:disabled` | 禁用的表单元素 |
| `:checked` | 被选中的单选/复选框 |
| `:valid` | 符合验证规则的输入字段 |
| `:invalid` | 不符合验证规则的输入字段 |
| `:required` | 带有 `required` 属性的必填字段 |
| `:optional` | 非必填字段 |
| `:in-range` | 值在指定范围内 |
| `:out-of-range` | 值超出指定范围 |

### 5.4 位置伪类

| 伪类 | 描述 |
| :--- | :--- |
| `:link` | 未访问的链接 |
| `:visited` | 已访问的链接 |
| `:any-link` | 匹配任何带 `href` 的锚点 |
| `:target` | URL 片段标识符的目标元素 |

### 5.5 树结构伪类

| 伪类 | 描述 |
| :--- | :--- |
| `:root` | 文档根元素（通常是 `<html>`） |
| `:empty` | 无子元素的元素 |
| `:first-child` | 父元素下第一个子元素 |
| `:last-child` | 父元素下最后一个子元素 |
| `:nth-child(n)` | 父元素下第 n 个子元素 |
| `:nth-last-child(n)` | 从末尾计第 n 个子元素 |
| `:only-child` | 父元素下唯一的子元素 |
| `:first-of-type` | 同类型兄弟元素中的第一个 |
| `:last-of-type` | 同类型兄弟元素中的最后一个 |
| `:nth-of-type(n)` | 同类型兄弟元素中的第 n 个 |
| `:only-of-type` | 父元素中该类型的唯一元素 |

### 5.6 函数伪类

| 伪类 | 描述 | 特性 |
| :--- | :--- | :--- |
| `:is(选择器列表)` | 匹配列表中任一选择器的元素 | 继承列表中最高优先级 |
| `:where(选择器列表)` | 同 `:is` | **优先级为 0** |
| `:has(选择器列表)` | 包含指定子元素的父元素 | 唯一能向上选择父元素的伪类 |
| `:not(选择器)` | 不匹配指定选择器的元素 | — |

```css
/* :where 优先级为0，方便覆盖 */
:where(h1, h2, h3) {
  margin: 0;
  padding: 0;
}

/* :has 父选择器，选中包含h2的article */
article:has(h2) {
  border: 2px solid hotpink;
}

/* :not 排除法 */
p:not(.example) {
  color: blue;
}
```

### 5.7 伪元素

| 伪元素 | 描述 |
| :--- | :--- |
| `::before` | 在元素内容前插入装饰内容（需 `content` 属性） |
| `::after` | 在元素内容后插入装饰内容（需 `content` 属性） |
| `::first-letter` | 元素内容的首字母 |
| `::marker` | 列表项的项目符号或编号 |
| `::selection` | 用户选中的文本 |

```css
/* 必须设置 content 属性，可以为空字符串 */
.badge::before {
  content: "※ ";
  color: red;
}

.done::after {
  content: " ✓";
  color: green;
}

/* 首字母下沉效果 */
p::first-letter {
  font-size: 2em;
  float: left;
  color: #900;
}
```

### 5.8 核心记忆点

1. **伪类** 单冒号 `:`，基于**状态/位置**
2. **伪元素** 双冒号 `::`，创建**虚拟元素**
3. `:is()` vs `:where()` → 功能相同，区别在于**优先级**
4. `:has()` → 唯一能**向上选择父元素**的伪类
5. `::before` / `::after` → **必须**设置 `content` 属性

---

## 6. 盒模型

### 6.1 盒模型组成

```text
┌─────────────────────────────┐
│          margin             │
│  ┌─────────────────────┐    │
│  │       border        │    │
│  │  ┌─────────────┐    │    │
│  │  │   padding   │    │    │
│  │  │  ┌───────┐  │    │    │
│  │  │  │content│  │    │    │
│  │  │  └───────┘  │    │    │
│  │  └─────────────┘    │    │
│  └─────────────────────┘    │
└─────────────────────────────┘
```

- **content**：实际内容区域
- **padding**：内边距，内容与边框之间的空间
- **border**：边框
- **margin**：外边距，元素与其他元素之间的空间

### 6.2 box-sizing属性

```css
/* 默认值：content-box */
/* 实际宽度 = width + padding + border = 200 + 40 + 4 = 244px */
.default {
  box-sizing: content-box;
  width: 200px;
  padding: 20px;
  border: 2px solid;
}

/* 推荐使用：border-box */
/* 实际宽度 = width = 200px，padding 和 border 向内压缩 */
.better {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 2px solid;
}

/* 全局推荐写法 */
*, *::before, *::after {
  box-sizing: border-box;
}
```

> 推荐全局设置 `border-box`，所见即所得，避免计算实际宽度时出错。

### 6.3 边距塌陷

**现象**：相邻的垂直外边距会合并为两者中较大的那个，而不是相加。

```css
/* 两个相邻div，期望间距40px，实际只有20px */
.box-a { margin-bottom: 20px; }
.box-b { margin-top: 20px; }
```

**解决方案**

```css
/* 方案一：只设置单侧margin */
.box-a { margin-bottom: 20px; }
/* .box-b 不设置 margin-top */

/* 方案二：父元素创建BFC，防止与子元素塌陷 */
.parent {
  overflow: hidden;    /* 触发BFC */
}

/* 方案三：父元素添加padding或border隔断 */
.parent {
  padding-top: 1px;
}
```

---

## 7. 布局系统

### 7.1 显示类型

```css
display: block;         /* 块级元素，独占一行 */
display: inline;        /* 行内元素，不独占一行 */
display: inline-block;  /* 行内块，不换行但可设宽高 */
display: flex;          /* 弹性布局 */
display: grid;          /* 网格布局 */
display: none;          /* 不显示，不占据空间 */
```

### 7.2 Flexbox（弹性盒子）

#### 容器属性

```css
.container {
  display: flex;

  /* 主轴方向 */
  flex-direction: row;            /* 默认，水平从左到右 */
  flex-direction: row-reverse;    /* 水平从右到左 */
  flex-direction: column;         /* 垂直从上到下 */
  flex-direction: column-reverse; /* 垂直从下到上 */

  /* 换行 */
  flex-wrap: nowrap;              /* 默认，不换行 */
  flex-wrap: wrap;                /* 换行 */

  /* 主轴对齐（水平方向） */
  justify-content: flex-start;    /* 默认，靠左 */
  justify-content: flex-end;      /* 靠右 */
  justify-content: center;        /* 居中 */
  justify-content: space-between; /* 两端对齐 */
  justify-content: space-around;  /* 每项两侧等距 */
  justify-content: space-evenly;  /* 每项之间等距 */

  /* 交叉轴对齐（垂直方向） */
  align-items: stretch;           /* 默认，拉伸填满 */
  align-items: flex-start;        /* 顶部对齐 */
  align-items: flex-end;          /* 底部对齐 */
  align-items: center;            /* 垂直居中 */
  align-items: baseline;          /* 基线对齐 */

  /* 多行对齐 */
  align-content: flex-start;
  align-content: center;
  align-content: space-between;

  /* 间距 */
  gap: 10px;                      /* 行列间距相同 */
  gap: 10px 20px;                 /* 行间距 列间距 */
}
```

#### 项目属性

```css
.item {
  order: 0;              /* 排列顺序，数值越小越靠前 */
  flex-grow: 0;          /* 放大比例，默认不放大 */
  flex-shrink: 1;        /* 缩小比例，默认可缩小 */
  flex-basis: auto;      /* 初始大小 */
  flex: 1;               /* 简写：flex-grow:1 flex-shrink:1 flex-basis:0 */
  align-self: center;    /* 单独设置该项的垂直对齐 */
}
```

#### 实战：导航栏

```css
.navbar {
  display: flex;
  justify-content: space-between;  /* logo左，菜单右 */
  align-items: center;             /* 垂直居中 */
  padding: 0 20px;
  height: 60px;
}

/* 垂直+水平居中 */
.center-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 7.3 CSS Grid（网格布局）

#### 容器属性

```css
.container {
  display: grid;

  /* 定义列：3列等宽 + 1列固定200px */
  grid-template-columns: repeat(3, 1fr) 200px;

  /* 定义行 */
  grid-template-rows: 100px minmax(200px, auto);

  /* 命名区域 */
  grid-template-areas:
    "header header header"
    "sidebar main   main"
    "footer footer  footer";

  /* 间距 */
  gap: 10px;

  /* 对齐 */
  justify-items: stretch;    /* 单元格内水平对齐 */
  align-items: stretch;      /* 单元格内垂直对齐 */
}
```

#### 项目属性

```css
.item {
  grid-column: 1 / 3;        /* 从第1列线到第3列线 */
  grid-row: 2 / 4;           /* 从第2行线到第4行线 */
  grid-area: header;         /* 使用命名区域 */
  justify-self: center;      /* 单独设置水平对齐 */
  align-self: center;        /* 单独设置垂直对齐 */
}
```

#### 实战：经典三栏布局

```css
.layout {
  display: grid;
  grid-template-areas:
    "header  header  header"
    "sidebar main    main"
    "footer  footer  footer";
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: 60px 1fr 60px;
  min-height: 100vh;
  gap: 10px;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

### 7.4 Flex vs Grid 如何选择

| 场景 | 推荐方案 | 原因 |
| :--- | :------- | :--- |
| 导航栏、工具栏 | Flex | 一维布局，元素间距灵活 |
| 页面整体骨架 | Grid | 二维布局，行列同时控制 |
| 卡片列表 | Grid | 等宽等高，自动换行 |
| 垂直+水平居中 | Flex | 语法最简洁 |
| 不规则布局 | Grid | 可跨行跨列 |

---

## 8. 定位

### 8.1 定位类型

```css
/* 静态定位：默认值，不受top/left等影响 */
position: static;

/* 相对定位：相对于自身原始位置偏移，原空间仍保留 */
position: relative;
top: 10px;
left: 20px;

/* 绝对定位：相对于最近的非static祖先元素定位，脱离文档流 */
position: absolute;
top: 0;
right: 0;

/* 固定定位：相对于视口，滚动页面不移动 */
position: fixed;
bottom: 20px;
right: 20px;

/* 粘性定位：滚动到指定位置时固定 */
position: sticky;
top: 0;    /* 距离视口顶部0时开始固定 */
```

### 8.2 常用定位技巧

```css
/* 子绝父相：子元素绝对定位，父元素相对定位作为参照 */
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);  /* 绝对居中 */
}

/* 固定悬浮按钮 */
.float-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 100;
}

/* 粘性导航栏 */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
}
```

### 8.3 z-index堆叠

```css
.element {
  position: relative;   /* z-index 仅在非static定位时有效 */
  z-index: 10;          /* 数值越大越靠前 */
}

/* 常见z-index层级规范 */
.dropdown   { z-index: 100; }
.modal-mask { z-index: 200; }
.modal      { z-index: 300; }
.toast      { z-index: 400; }
```

---

## 9. 响应式设计

### 9.1 视口设置

```html
<!-- 必须添加，否则移动端会按桌面宽度渲染 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 9.2 媒体查询

```css
/* 移动优先：先写小屏样式，再用min-width覆盖 */
.container {
  padding: 10px;
  width: 100%;
}

/* 平板：768px及以上 */
@media (min-width: 768px) {
  .container {
    padding: 20px;
    max-width: 720px;
    margin: 0 auto;
  }
}

/* 桌面：992px及以上 */
@media (min-width: 992px) {
  .container {
    padding: 30px;
    max-width: 960px;
  }
}

/* 大屏：1200px及以上 */
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
```

### 9.3 系统偏好媒体查询

```css
/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  body {
    background: #121212;
    color: #ffffff;
  }
}

/* 用户偏好减少动画（无障碍） */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* 打印样式 */
@media print {
  .no-print { display: none; }
  body { font-size: 12pt; }
}
```

### 9.4 响应式常用技巧

```css
/* 响应式图片 */
img {
  max-width: 100%;
  height: auto;
}

/* 响应式字体（clamp方案，无需媒体查询） */
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}

/* 响应式网格（自动换行，无需媒体查询） */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
```

---

## 10. 颜色与渐变

### 10.1 颜色表示法

```css
/* 命名颜色 */
color: red;
color: transparent;

/* 十六进制 */
color: #ff0000;
color: #f00;          /* 缩写 */
color: #ff000080;     /* 带透明度（后两位为alpha） */

/* RGB / RGBA */
color: rgb(255, 0, 0);
color: rgba(255, 0, 0, 0.5);   /* 0为全透明，1为不透明 */

/* HSL / HSLA（更直观的颜色调整方式） */
color: hsl(0, 100%, 50%);      /* 色相0-360, 饱和度%, 亮度% */
color: hsla(0, 100%, 50%, 0.5);

/* 现代写法（CSS Color Level 4） */
color: rgb(255 0 0 / 50%);
color: hsl(0 100% 50% / 50%);
```

> HSL 是调色最直观的方式：改变色相（H）换颜色，调饱和度（S）控制鲜艳程度，调亮度（L）控制深浅。

### 10.2 渐变

**线性渐变**

```css
/* 方向：to right / to bottom / 角度 */
background: linear-gradient(to right, red, blue);
background: linear-gradient(45deg, red, orange, yellow);

/* 指定色标位置 */
background: linear-gradient(to right, red 0%, orange 30%, blue 100%);
```

**径向渐变**

```css
/* 圆形渐变 */
background: radial-gradient(circle at center, red, blue);

/* 椭圆渐变 */
background: radial-gradient(ellipse at top, red, transparent);
```

**重复渐变**

```css
/* 斑马条纹 */
background: repeating-linear-gradient(
  45deg,
  #f0f0f0,
  #f0f0f0 10px,
  #ffffff 10px,
  #ffffff 20px
);
```

**实战：极光渐变背景**

```css
.aurora {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 25%,
    #f093fb 50%,
    #4facfe 75%,
    #00f2fe 100%
  );
  background-size: 400% 400%;
  animation: aurora 8s ease infinite;
}

@keyframes aurora {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

---

## 11. 字体与排版

### 11.1 字体属性

```css
body {
  font-family: "Helvetica Neue", Arial, sans-serif; /* 字体栈，从左到右依次回退 */
  font-size: 16px;          /* 大小 */
  font-weight: 400;         /* 粗细：100-900，400=normal，700=bold */
  font-style: normal;       /* 样式：normal | italic | oblique */
  line-height: 1.6;         /* 行高，推荐无单位写法 */
  letter-spacing: 0.5px;    /* 字符间距 */
  word-spacing: 2px;        /* 单词间距 */
  text-align: left;         /* 对齐：left | right | center | justify */
  text-transform: none;     /* 大小写：uppercase | lowercase | capitalize */
  text-decoration: none;    /* 装饰线：underline | line-through | none */
}
```

### 11.2 自定义字体

```css
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2'),  /* 优先使用woff2，体积最小 */
       url('font.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;  /* 加载期间先显示系统字体，加载完成后替换 */
}

body {
  font-family: 'CustomFont', sans-serif;
}
```

### 11.3 文字效果

```css
/* 文字阴影 */
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

/* 多层阴影（描边效果） */
text-shadow:
  1px  1px 0 #000,
  -1px -1px 0 #000,
  1px -1px 0 #000,
  -1px  1px 0 #000;

/* 发光效果 */
text-shadow: 0 0 10px rgba(100, 200, 255, 0.8);
```

### 11.4 文字溢出处理

```css
/* 单行省略 */
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 多行省略（3行） */
.ellipsis-multi {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

---

## 12. 动画与过渡

### 12.1 过渡效果（transition）

过渡用于在**状态改变时**（如 hover）产生平滑的动画效果。

```css
/* 基本用法 */
.button {
  background: blue;
  transition: background 0.3s ease;
}

.button:hover {
  background: darkblue;
}

/* 多属性过渡 */
.card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    background 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* 过渡所有属性（性能较差，谨慎使用） */
.element {
  transition: all 0.3s ease;
}
```

**常用缓动函数**

| 值 | 描述 |
| :--- | :--- |
| `ease` | 默认，慢-快-慢 |
| `linear` | 匀速 |
| `ease-in` | 慢速开始 |
| `ease-out` | 慢速结束 |
| `ease-in-out` | 两端慢速 |
| `cubic-bezier(x1,y1,x2,y2)` | 自定义贝塞尔曲线 |

### 12.2 关键帧动画（animation）

动画用于**自动播放**、**循环**或**复杂多阶段**的动效。

```css
/* 定义关键帧 */
@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  80% {
    transform: translateX(10px);  /* 轻微回弹 */
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 应用动画 */
.element {
  animation: slideIn 0.5s ease-out forwards;
}
```

**animation 属性详解**

```css
.element {
  animation-name: slideIn;              /* 关键帧名称 */
  animation-duration: 0.5s;            /* 持续时间 */
  animation-timing-function: ease-out; /* 缓动函数 */
  animation-delay: 0.2s;               /* 延迟开始 */
  animation-iteration-count: infinite; /* 播放次数，infinite为无限 */
  animation-direction: alternate;      /* 方向：normal | reverse | alternate */
  animation-fill-mode: forwards;       /* 结束后保持最终状态 */
  animation-play-state: running;       /* running | paused */
}

/* 简写 */
.element {
  animation: slideIn 0.5s ease-out 0.2s 1 normal forwards running;
}

/* 多个动画 */
.element {
  animation:
    fadeIn 0.3s ease forwards,
    slideUp 0.5s ease 0.1s forwards;
}
```

### 12.3 常用动画示例

```css
/* 淡入 */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* 向上滑入 */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 无限旋转（loading图标） */
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.loading {
  animation: spin 1s linear infinite;
}

/* 心跳效果 */
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.15); }
}

.heart {
  animation: heartbeat 1s ease-in-out infinite;
}
```

### 12.4 过渡 vs 动画

| | transition | animation |
| :--- | :--- | :--- |
| **触发方式** | 需要状态改变（如hover） | 自动播放 |
| **关键帧** | 只有起始和结束两帧 | 可定义多个关键帧 |
| **循环** | 不支持 | 支持 |
| **适用场景** | 交互反馈、状态切换 | 加载动画、复杂动效 |

---

## 13. 高级特性

### 13.1 CSS变量（自定义属性）

```css
/* 在 :root 定义全局变量 */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --danger-color: #e74c3c;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --font-main: 'Arial', sans-serif;
  --border-radius: 8px;
}

/* 使用变量 */
.button {
  background: var(--primary-color);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);

  /* 设置回退值，变量不存在时使用 */
  color: var(--text-color, #333);
}

/* 结合calc使用 */
.card {
  margin: calc(var(--spacing-md) * 2);
}

/* 暗色模式切换 */
@media (prefers-color-scheme: dark) {
  :root {
    --primary-color: #1abc9c;
    --bg-color: #121212;
    --text-color: #ffffff;
  }
}

/* JS动态修改变量 */
/* document.documentElement.style.setProperty('--primary-color', '#e74c3c') */
```

### 13.2 滤镜效果

```css
/* 单个滤镜 */
.blur      { filter: blur(5px); }
.bright    { filter: brightness(150%); }
.contrast  { filter: contrast(200%); }
.grayscale { filter: grayscale(100%); }
.sepia     { filter: sepia(100%); }
.hue       { filter: hue-rotate(90deg); }
.saturate  { filter: saturate(200%); }
.invert    { filter: invert(100%); }

/* 组合滤镜 */
.vintage {
  filter:
    sepia(50%)
    contrast(120%)
    brightness(90%)
    saturate(80%);
}

/* backdrop-filter：背景模糊（玻璃拟态效果） */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);  /* Safari兼容 */
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### 13.3 混合模式

```css
/* 元素混合模式 */
.element {
  mix-blend-mode: multiply;   /* 正片叠底 */
  mix-blend-mode: screen;     /* 滤色 */
  mix-blend-mode: overlay;    /* 叠加 */
}

/* 背景混合模式 */
.element {
  background-image: url('photo.jpg'), linear-gradient(red, blue);
  background-blend-mode: multiply;
}
```

---

## 14. 现代CSS特性

### 14.1 容器查询

容器查询允许根据**父容器的尺寸**（而非视口）来改变样式，比媒体查询更灵活。

```css
/* 第一步：定义容器 */
.card-wrapper {
  container-type: inline-size;
  container-name: card;       /* 命名，可选 */
}

/* 第二步：基于容器尺寸写样式 */
@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 120px 1fr;
  }
}

@container card (min-width: 600px) {
  .card-title {
    font-size: 1.5rem;
  }
}
```

> 容器查询解决了组件复用中的痛点：同一个卡片组件在侧边栏（窄）和主内容区（宽）中可以自动呈现不同布局。

### 14.2 层叠层（@layer）

`@layer` 用于管理样式优先级，解决大型项目中样式覆盖混乱的问题。

```css
/* 声明层的顺序，后面的层优先级更高 */
@layer reset, base, components, utilities;

@layer reset {
  * { margin: 0; padding: 0; box-sizing: border-box; }
}

@layer base {
  body { font-family: system-ui; line-height: 1.5; }
  a { color: inherit; }
}

@layer components {
  .button {
    padding: 0.5em 1em;
    border-radius: 4px;
    cursor: pointer;
  }
}

@layer utilities {
  .text-center { text-align: center; }
  .hidden { display: none; }
}
```

### 14.3 @supports 特性检测

```css
/* 支持某特性时才应用样式 */
@supports (display: grid) {
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 不支持时的回退方案 */
@supports not (display: grid) {
  .container {
    display: flex;
    flex-wrap: wrap;
  }
}

/* 检测多个特性 */
@supports (backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px)) {
  .glass {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
}
```

### 14.4 子网格（subgrid）

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* 子元素继承父网格的轨道定义 */
.grid-item {
  display: grid;
  grid-column: span 2;
  grid-template-columns: subgrid;  /* 继承父网格的列定义 */
}
```

---

## 15. 可访问性与性能

### 15.1 隐藏内容

```css
/* 视觉隐藏但屏幕阅读器可读（无障碍最佳实践） */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* 视觉隐藏且屏幕阅读器不可读 */
.hidden {
  display: none;
}

/* 仅视觉隐藏，保留空间 */
.invisible {
  visibility: hidden;
}
```

### 15.2 焦点样式

```css
/* 自定义焦点样式（保证键盘用户可见） */
a:focus,
button:focus,
input:focus {
  outline: 2px solid #3498db;
  outline-offset: 2px;
}

/* 鼠标点击不显示焦点，键盘导航显示焦点 */
:focus:not(:focus-visible) {
  outline: none;
}

:focus-visible {
  outline: 3px dashed #2ecc71;
  outline-offset: 3px;
}
```

### 15.3 对比度要求

| 文本类型 | 最低对比度 | 标准 |
| :--- | :---: | :--- |
| 普通文本（小于18pt） | 4.5 : 1 | WCAG AA |
| 大文本（18pt/24px以上） | 3 : 1 | WCAG AA |
| 装饰性元素 | 无要求 | — |

### 15.4 渲染性能优化

```css
/* 提示浏览器该属性即将变化，提前做优化 */
.animated {
  will-change: transform;     /* 仅在真正需要时使用，滥用会适得其反 */
}

/* 优先使用 transform 和 opacity 做动画（不触发重排重绘） */
/* 性能好 */
.good {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* 性能差，触发重排 */
.bad {
  transition: width 0.3s ease, height 0.3s ease, top 0.3s ease;
}

/* 内容可见性：跳过屏幕外内容的渲染（长列表优化） */
.list-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 200px;  /* 预估元素高度，防止滚动条跳动 */
}
```

### 15.5 加载优化

```css
/* 字体加载策略 */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap;       /* 先用系统字体，加载完成后替换，避免字体闪烁 */
}
```

---

## 16. 调试技巧

### 16.1 调试样式

```css
/* 给所有元素加边框，快速查看布局问题 */
* {
  outline: 1px solid red !important;
}

/* 调试网格背景 */
.debug-grid {
  background-image:
    repeating-linear-gradient(
      90deg,
      rgba(255, 0, 0, 0.1),
      rgba(255, 0, 0, 0.1) 1px,
      transparent 1px,
      transparent 20px
    ),
    repeating-linear-gradient(
      0deg,
      rgba(255, 0, 0, 0.1),
      rgba(255, 0, 0, 0.1) 1px,
      transparent 1px,
      transparent 20px
    );
}
```

### 16.2 常用调试方法

```css
/* 查看元素实际尺寸 */
.debug {
  background: rgba(255, 0, 0, 0.2) !important;
  border: 1px solid red !important;
}

/* 空状态处理 */
.list:empty::after {
  content: "暂无数据";
  display: block;
  text-align: center;
  color: #999;
  padding: 40px;
}

/* 焦点包含调试 */
.form:focus-within {
  border-color: blue;
  box-shadow: 0 0 0 3px rgba(0, 0, 255, 0.1);
}
```

---

## 总结

### 知识体系速查

```text
CSS 知识体系
├── 基础概念          → 规则结构、引入方式
├── 选择器            → 基础/组合器/伪类/伪元素/优先级
├── 显示类型          → block / inline / inline-block
├── 单位与函数        → px/rem/vw/vh + calc/clamp/min/max
├── 盒模型            → content/padding/border/margin + box-sizing
├── 布局系统          → Flex（一维）/ Grid（二维）
├── 定位              → static/relative/absolute/fixed/sticky
├── 响应式            → 媒体查询 + 移动优先
├── 颜色与渐变        → hex/rgb/hsl + linear/radial-gradient
├── 字体与排版        → font属性 + 溢出处理
├── 动画              → transition（交互）/ animation（自动）
├── 高级特性          → CSS变量 / 滤镜 / 混合模式
├── 现代CSS           → 容器查询 / @layer / @supports
├── 可访问性          → 焦点样式 / 对比度 / sr-only
├── 性能优化          → will-change / transform优先 / content-visibility
└── 调试              → outline调试法 / 空状态处理
```

### 常见问题速查

| 问题 | 解决方案 |
| :--- | :--- |
| 边距塌陷 | 只设单侧margin，或父元素触发BFC（overflow:hidden） |
| 垂直居中 | `display:flex` + `align-items:center` + `justify-content:center` |
| 浮动清除 | 改用flex/grid，避免使用float |
| 响应式图片 | `max-width:100%; height:auto` |
| 字体闪烁 | `font-display: swap` |
| 动画性能差 | 只对 `transform` 和 `opacity` 做动画 |
| 文字超出截断 | 单行用 `text-overflow:ellipsis`，多行用 `-webkit-line-clamp` |
| 元素层级混乱 | 规范化 `z-index` 值，建立层级体系 |
| 选择器优先级冲突 | 降低选择器层级，使用 `@layer` 管理，避免 `!important` |

### 学习建议

1. **先理解，再记忆**：CSS 属性很多，不需要全部背下来，理解原理后用到时查文档即可
2. **多动手**：每个知识点都亲自写一遍，比看十遍更有效
3. **善用开发者工具**：F12 是最好的 CSS 调试工具，实时修改样式即时预览
4. **移动优先**：写响应式样式时，养成从小屏开始的习惯
5. **关注现代特性**：容器查询、`@layer`、`clamp()` 等新特性正在成为主流

---

> 如有错误欢迎指正。
