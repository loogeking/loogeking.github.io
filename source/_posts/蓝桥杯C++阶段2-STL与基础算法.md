---
title: 阶段 2：STL 与基础算法
date: 2026-09-28 12:20:00
updated: 2026-09-28 12:20:00
tags:
  - 蓝桥杯
  - C++
  - STL
  - 基础算法
categories:
  - 蓝桥杯
cover: https://img.loogeking.top/images/bluebridge/2.jpg
description: "蓝桥杯 C++ 第二阶段：STL 必会容器与基础算法学习清单、掌握标准、刷题策略和外部链接。"
password: "hjy0227"
abstract: "本文已加密，请输入密码继续阅读。"
message: "请输入密码查看 STL 与基础算法阶段计划。"
permalink: bluebridge/02-stl-basic/
---

# 阶段 2：STL 与基础算法

> 阶段目标：能用 STL 快速实现常见操作，并把枚举、模拟、排序、前缀和、差分、二分、双指针练成条件反射。
>
> 前置阶段：[阶段 1：C++ 基础与 VS Code 刷题环境](/bluebridge/01-cpp-vscode/)
>
> 本阶段对应知识地图中的 M2 与 M3。

---

## 一、这一阶段要解决什么

阶段 1 解决的是“能不能写出正确程序”。  
阶段 2 解决的是“能不能快速写出常见算法”。

这一阶段结束后，你应该具备四种能力：

1. 看到数组、字符串、去重、排序、查找，能立刻想到合适的 STL。
2. 看到暴力题，能快速写出枚举或模拟。
3. 看到区间求和、区间修改、单调性、答案判定，能想到前缀和、差分或二分。
4. 能分析暴力做法的复杂度，知道为什么会超时。

这一阶段不追求复杂 DP 和图论。  
它只做一件事：把蓝桥杯出现频率最高的一层打牢。

---

## 二、前置检查

开始阶段 2 前，先确认阶段 1 已完成：

- 能独立写出完整 C++ 程序。
- 会处理 `int`、`long long`、`double`、数组和字符串。
- 会写函数、递归和结构体排序。
- 能估算基本复杂度。
- 会使用 VS Code 编译、F5 调试、`input.txt` 和简单对拍。

如果这些还不稳，先回看阶段 1，不要急着刷基础算法。

---

## 三、模块 M2：STL 知识地图

STL 的目标不是背接口，而是形成“看到题型就知道用什么”的条件反射。

| 知识点 | 等级 | 前置 | 主要用途 | 掌握标准 | 刷题 |
| --- | --- | --- | --- | --- | --- |
| vector 与顺序容器 | S | 数组 | 动态数组、邻接表、结果收集 | 会增删改查、遍历、排序前准备 | 必刷 |
| string | S | 字符数组 | 字符串查找、截取、拼接、转换 | 会用 substr、find、append、比较 | 必刷 |
| sort、lower_bound、upper_bound、unique | S | 数组、vector | 排序、去重、二分查找 | 会自定义 cmp，会处理边界 | 必刷 |
| stack、queue、deque | S | vector | 模拟、BFS、括号匹配、滑动窗口 | 掌握接口和适用场景 | 必刷 |
| priority_queue | S | queue | 堆、Dijkstra、贪心 | 会大根堆、小根堆、自定义比较 | 必刷 |
| set、map、multiset | A | sort | 有序查询、去重、计数 | 会插入、查找、删除、遍历 | 必刷 |
| unordered_map、unordered_set | A | map | 快速计数和去重 | 知道哈希退化风险 | 必刷 |
| bitset | A | 位运算 | 集合运算、状态压缩辅助 | 会基本位运算集合操作 | 少量 |
| pair、tuple、iterator | B | vector | 打包数据、遍历容器 | 会用 pair 排序和遍历 | 少量 |
| next_permutation、容器选择 | A | sort | 全排列枚举、按复杂度选容器 | 知道常见容器操作复杂度 | 少量 |

推荐入口：

- [OI Wiki 语言基础](https://oi-wiki.org/lang/)
- [OI Wiki STL 容器](https://oi-wiki.org/lang/csl/)
- [OI Wiki 算法库](https://oi-wiki.org/lang/csl/algorithm/)
- [OI Wiki 关联容器](https://oi-wiki.org/lang/csl/associative-container/)
- [OI Wiki 无序容器](https://oi-wiki.org/lang/csl/unordered-container/)
- [OI Wiki 容器适配器](https://oi-wiki.org/lang/csl/container-adapter/)

---

## 四、模块 M3：基础算法知识地图

基础算法是蓝桥杯最值得反复训练的一层。  
很多国赛题并不是考高级算法，而是考你能不能把基础算法组合起来。

| 知识点 | 等级 | 前置 | 主要用途 | 掌握标准 | 刷题 |
| --- | --- | --- | --- | --- | --- |
| 枚举 | S | C++ 基础 | 暴力、全排列、组合、小数据验证 | 会枚举所有可能并剪掉无效分支 | 必刷 |
| 模拟 | S | 数组、字符串 | 题面规则翻译、大模拟 | 能把规则准确写成代码 | 必刷 |
| 排序 | S | STL sort | 排序、贪心前置、去重 | 理解排序思想，会 STL sort | 必刷 |
| 前缀和与差分 | S | 数组 | 区间求和、区间修改 | 会一维、二维前缀和与差分 | 必刷 |
| 二分 | S | 排序 | 查找、二分答案、边界判定 | 会整数/浮点二分和边界处理 | 必刷 |
| 双指针与滑动窗口 | A | 二分、数组 | 区间计数、去重、窗口最值 | 会维护窗口和单调性 | 必刷 |
| 递归与分治 | A | 函数、递归 | 归并、分治统计、树问题前置 | 会递归拆分和合并 | 少量 |
| 离散化 | A | 排序、二分 | 值域压缩、树状数组前置 | 会坐标压缩 | 少量 |
| 构造 | B | 枚举 | 构造合法方案 | 能按题意构造并验证 | 少量 |
| 倍增 | B | 递归、位运算 | LCA、ST 表前置 | 理解二进制拆分和跳转 | 少量 |
| 计数排序、桶排序、均摊分析 | B | 排序、复杂度 | 特定场景排序和复杂度理解 | 知道适用场景 | 少量 |

推荐入口：

- [OI Wiki 基础算法](https://oi-wiki.org/basic/)
- [枚举](https://oi-wiki.org/basic/enumerate/)
- [模拟](https://oi-wiki.org/basic/simulate/)
- [排序简介](https://oi-wiki.org/basic/sort-intro/)
- [前缀和与差分](https://oi-wiki.org/basic/prefix-sum/)
- [二分](https://oi-wiki.org/basic/binary/)
- [双指针](https://oi-wiki.org/misc/two-pointer/)
- [分治](https://oi-wiki.org/basic/divide-and-conquer/)
- [离散化](https://oi-wiki.org/misc/discrete/)

---

## 五、推荐学习顺序

不要按表格从上到下死学，建议按下面顺序：

```text
vector / string / pair
  ↓
sort / lower_bound / unique
  ↓
枚举 + 模拟
  ↓
前缀和 + 差分
  ↓
二分
  ↓
stack / queue / priority_queue
  ↓
set / map / unordered_map
  ↓
双指针 + 滑动窗口
  ↓
离散化
  ↓
递归 + 分治
  ↓
bitset / next_permutation / 计数排序
```

原因：

- `vector`、`string`、`sort` 是后面所有算法的工具。
- 枚举和模拟是蓝桥杯最基础、最稳定的得分方式。
- 前缀和、差分、二分是省赛和国赛的高频基础题。
- 栈、队列、堆是搜索和图论的前置。
- set/map 和离散化是数据结构的过渡。
- 双指针和滑动窗口是数组题的重要优化手段。

---

## 六、掌握标准

### S 级知识点

必须达到：

- 不看模板能写出核心代码。
- 知道边界条件和常见错误。
- 能独立分析复杂度。
- 每类至少刷一组基础题和一组变形题。

### A 级知识点

必须达到：

- 看得懂模板。
- 会修改模板解决同类题。
- 知道什么时候该用。
- 每类刷少量典型题。

### B 级知识点

必须达到：

- 知道用途和基本写法。
- 遇到题能查模板。
- 不要求默写。

---

## 七、刷题策略

建议本阶段总题量控制在 60 到 100 道，按知识点滚动刷：

| 类型 | 建议数量 | 说明 |
| --- | --- | --- |
| S 级知识点 | 每个 5 到 10 道 | 必须覆盖边界和变形 |
| A 级知识点 | 每个 3 到 5 道 | 会改模板即可 |
| B 级知识点 | 每个 1 到 3 道 | 知道用法即可 |

刷题时不要只看“过没过”，还要记录：

```text
题目来源和链接
对应知识点
第一次为什么没做出来
正确思路
复杂度
是否独立完成
下次复习时间
```

建议使用洛谷和牛客作为题库：

- [洛谷题目列表](https://www.luogu.com.cn/problem/list)
- [洛谷题单](https://www.luogu.com.cn/training/list)
- [牛客题库](https://www.nowcoder.com/exam/oj)

---

## 八、本阶段常见坑

1. **STL 迭代器失效**：一边遍历一边删除容器元素时容易出错。
2. **map 访问不存在的 key**：`mp[key]` 会插入默认值，只查存在性时用 `find` 或 `count`。
3. **unordered_map 卡哈希**：竞赛中可能被构造数据卡掉，极端情况改回 map。
4. **sort 的比较函数**：必须满足严格弱序，不能写 `<=`。
5. **lower_bound 用在无序区间**：必须先排序，否则结果无意义。
6. **前缀和溢出**：前缀和数组要用 `long long`。
7. **二分边界**：`l`、`r`、`mid` 和答案更新方式要统一。
8. **双指针前提**：必须确认区间单调性，不能乱套模板。
9. **递归深度**：搜索和递归要注意栈溢出。
10. **int 溢出**：乘法、累加、前缀和、方案数都要检查是否需要 `long long`。

---

## 九、阶段验收清单

- [ ] 能不查资料写出 vector、string、sort、lower_bound 的常用用法。
- [ ] 能用 stack、queue、priority_queue 解决基础题。
- [ ] 能用 set 或 map 完成去重和有序查询。
- [ ] 能用 unordered_map 完成计数类题目。
- [ ] 能独立写出枚举和模拟题，不因边界失分。
- [ ] 能写出二维前缀和和差分。
- [ ] 能写出整数二分和二分答案。
- [ ] 能用双指针或滑动窗口优化数组题。
- [ ] 能对拍验证贪心和二分题。
- [ ] 能独立分析一个暴力做法的复杂度。

以上都完成，才进入阶段 3：搜索与位运算。

---

## 十、阶段 2 与真题的衔接

阶段 2 完成后，可以开始做蓝桥杯省赛的基础题，但不要立刻追求国赛难题。

建议顺序：

1. 省赛前几道基础题。
2. 带枚举、模拟、排序、前缀和、二分的题。
3. 带简单搜索的题。
4. 省赛中等题。

做真题时重点观察：

- 哪些知识点反复出现。
- 哪些题你“知道算法但写不对”。
- 哪些题是边界和溢出导致的失分。

真题不是用来证明自己不会，而是用来校正后面的学习顺序。

---

## 十一、外部链接

| 资源 | 链接 |
| --- | --- |
| OI Wiki 语言基础 | [oi-wiki.org/lang/](https://oi-wiki.org/lang/) |
| OI Wiki STL | [oi-wiki.org/lang/csl/](https://oi-wiki.org/lang/csl/) |
| OI Wiki 基础算法 | [oi-wiki.org/basic/](https://oi-wiki.org/basic/) |
| 洛谷题目列表 | [luogu.com.cn/problem/list](https://www.luogu.com.cn/problem/list) |
| 洛谷题单 | [luogu.com.cn/training/list](https://www.luogu.com.cn/training/list) |
| 牛客题库 | [nowcoder.com/exam/oj](https://www.nowcoder.com/exam/oj) |
| cppreference | [zh.cppreference.com](https://zh.cppreference.com/) |

---

## 洛谷练习入口

- [洛谷题单列表](https://www.luogu.com.cn/training/list)
- [洛谷题目列表](https://www.luogu.com.cn/problem/list)
- 关键词：排序、枚举、模拟、前缀和、二分、双指针

## 推荐题目

| 题号 | 题目 | 对应知识点 |
| --- | --- | --- |
| [P1177](https://www.luogu.com.cn/problem/P1177) | 【模板】排序 | 排序 |
| [P1059](https://www.luogu.com.cn/problem/P1059) | [NOIP 2006 普及组] 明明的随机数 | 排序、去重 |
| [P1093](https://www.luogu.com.cn/problem/P1093) | [NOIP 2007 普及组] 奖学金 | 排序、结构体 |
| [P1012](https://www.luogu.com.cn/problem/P1012) | [NOIP 1998 提高组] 拼数 | 排序、贪心 |
| [P1036](https://www.luogu.com.cn/problem/P1036) | [NOIP 2002 普及组] 选数 | 枚举、递归 |
| [P1157](https://www.luogu.com.cn/problem/P1157) | 组合的输出 | 枚举、递归 |
| [P1706](https://www.luogu.com.cn/problem/P1706) | 全排列问题 | 枚举、递归 |
| [P2089](https://www.luogu.com.cn/problem/P2089) | 烤鸡 | 枚举 |
| [P1042](https://www.luogu.com.cn/problem/P1042) | [NOIP 2003 普及组] 乒乓球 | 模拟 |
| [P2670](https://www.luogu.com.cn/problem/P2670) | [NOIP 2015 普及组] 扫雷游戏 | 模拟 |
| [P1115](https://www.luogu.com.cn/problem/P1115) | 最大子段和 | 前缀和、线性 |
| [P2249](https://www.luogu.com.cn/problem/P2249) | 【深基13.例1】查找 | 二分 |
| [P1873](https://www.luogu.com.cn/problem/P1873) | [COCI 2011/2012 #5] EKO / 砍树 | 二分答案 |
| [P1147](https://www.luogu.com.cn/problem/P1147) | 连续正整数和 | 双指针 |
| [P1638](https://www.luogu.com.cn/problem/P1638) | 逛画展 | 双指针、滑动窗口 |

## 上一篇 / 下一篇

上一篇：[阶段 1：C++ 基础与 VS Code 刷题环境](/bluebridge/01-cpp-vscode/)

下一篇：[阶段 3：搜索与位运算](/bluebridge/03-search-bit/)

