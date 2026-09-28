---
title: 附录：OI Wiki 外链导航与跳过清单
date: 2026-09-28 13:30:00
updated: 2026-09-28 13:30:00
tags:
  - 蓝桥杯
  - C++
  - OI Wiki
  - 资源导航
categories:
  - 蓝桥杯
cover: https://img.loogeking.top/images/bluebridge/10.jpg
description: "蓝桥杯 C++ 学习路线的 OI Wiki 外链导航、模块映射和暂时跳过清单。"
password: "hjy0227"
abstract: "本文已加密，请输入密码继续阅读。"
message: "请输入密码查看 OI Wiki 外链导航与跳过清单。"
permalink: bluebridge/99-appendix/
---

# 附录：OI Wiki 外链导航与跳过清单

> 本附录用于快速查找 OI Wiki 入口，以及确认哪些内容当前不进入主线。
>
> 原则：博客只给路线和链接，具体知识去 OI Wiki 学习。

---

## 一、OI Wiki 章节入口

| 章节 | 链接 | 用途 |
| --- | --- | --- |
| 语言基础 | [oi-wiki.org/lang/](https://oi-wiki.org/lang/) | C++ 语法、STL |
| 基础算法 | [oi-wiki.org/basic/](https://oi-wiki.org/basic/) | 枚举、模拟、排序、前缀和、二分 |
| 搜索 | [oi-wiki.org/search/](https://oi-wiki.org/search/) | DFS、BFS、回溯、剪枝 |
| 数学 | [oi-wiki.org/math/](https://oi-wiki.org/math/) | 数论、组合、概率、博弈、矩阵 |
| 数据结构 | [oi-wiki.org/ds/](https://oi-wiki.org/ds/) | 栈、队列、并查集、堆、树状数组、线段树 |
| 动态规划 | [oi-wiki.org/dp/](https://oi-wiki.org/dp/) | 线性 DP、背包、区间 DP、树形 DP、状压 DP |
| 图论 | [oi-wiki.org/graph/](https://oi-wiki.org/graph/) | 存储、遍历、拓扑、最短路、MST、LCA |
| 字符串 | [oi-wiki.org/string/](https://oi-wiki.org/string/) | 哈希、KMP、Trie、Z 函数、Manacher |
| 杂项 | [oi-wiki.org/misc/](https://oi-wiki.org/misc/) | 双指针、离散化、表达式、随机化 |
| 比赛 | [oi-wiki.org/contest/](https://oi-wiki.org/contest/) | 比赛技巧、常见错误、OI 赛制 |
| 计算几何 | [oi-wiki.org/geometry/](https://oi-wiki.org/geometry/) | 向量、叉积、凸包、几何基础 |

---

## 二、模块与 OI Wiki 映射

| 模块 | 方向 | OI Wiki 入口 |
| --- | --- | --- |
| M1 | C++ 基础 | [lang](https://oi-wiki.org/lang/) |
| M2 | STL | [lang/csl](https://oi-wiki.org/lang/csl/) |
| M3 | 基础算法 | [basic](https://oi-wiki.org/basic/) |
| M4 | 搜索 | [search](https://oi-wiki.org/search/) |
| M5 | 数学 / 数论 | [math](https://oi-wiki.org/math/) |
| M6 | 数据结构 | [ds](https://oi-wiki.org/ds/) |
| M7 | 贪心 | [basic/greedy](https://oi-wiki.org/basic/greedy/) |
| M8 | 动态规划 | [dp](https://oi-wiki.org/dp/) |
| M9 | 图论 | [graph](https://oi-wiki.org/graph/) |
| M10 | 字符串 | [string](https://oi-wiki.org/string/) |
| M11 | 位运算 | [math/bit](https://oi-wiki.org/math/bit/) |
| M12 | 其他技巧 | [contest](https://oi-wiki.org/contest/) |

---

## 三、暂时跳过（C）

| 知识点 | 所属方向 | OI Wiki 页面 | 暂时跳过的理由 |
| --- | --- | --- | --- |
| 迭代加深、IDA*、A*、DLX | 搜索 | [search](https://oi-wiki.org/search/) | 优先 DFS、BFS、回溯和剪枝 |
| 平衡树：Treap、Splay、AVL | 数据结构 | [ds](https://oi-wiki.org/ds/) | 多数题可用 set/map、树状数组、线段树替代 |
| 分块与莫队 | 数据结构 | [ds/block-array](https://oi-wiki.org/ds/block-array/) | 多数题可用树状数组、线段树替代 |
| 线性基 | 数学 | [math/linear-algebra/basis](https://oi-wiki.org/math/linear-algebra/basis/) | 出现真题再学 |
| Lucas 定理 | 数论 | [math/number-theory/lucas](https://oi-wiki.org/math/number-theory/lucas/) | 优先逆元和阶乘预处理 |
| AC 自动机 | 字符串 | [string/ac-automaton](https://oi-wiki.org/string/ac-automaton/) | 国赛低频 |
| 后缀数组 SA | 字符串 | [string/sa](https://oi-wiki.org/string/sa/) | 优先哈希和 KMP |
| 最小表示法 | 字符串 | [string/minimal-string](https://oi-wiki.org/string/minimal-string/) | 低频 |
| 差分约束、基环树、最小环 | 图论 | [graph](https://oi-wiki.org/graph/) | 先掌握最短路、MST、拓扑 |
| CDQ 分治、整体二分 | 其他技巧 | [misc/cdq-divide](https://oi-wiki.org/misc/cdq-divide/) | 高级离线技巧 |
| 轮廓线 DP、插头 DP | 动态规划 | [dp/plug](https://oi-wiki.org/dp/plug/) | 低频进阶 |
| 斜率优化、四边形不等式 | 动态规划 | [dp/opt/slope](https://oi-wiki.org/dp/opt/slope/) | 先用前缀和和单调队列优化 |
| 随机化与模拟退火 | 其他技巧 | [misc/simulated-annealing](https://oi-wiki.org/misc/simulated-annealing/) | 比赛策略类技巧 |

---

## 四、当前不需要（D）

| 知识点 | 所属方向 | OI Wiki 页面 | 不学习的理由 |
| --- | --- | --- | --- |
| 网络流、费用流 | 图论 | [graph/flow](https://oi-wiki.org/graph/flow/) | 蓝桥杯不以网络流建模为核心 |
| 2-SAT | 图论 | [graph/2-sat](https://oi-wiki.org/graph/2-sat/) | 低频高级图论 |
| 最小树形图、斯坦纳树、支配树 | 图论 | [graph](https://oi-wiki.org/graph/) | 超出主线 |
| 矩阵树定理 | 图论 | [graph/matrix-tree](https://oi-wiki.org/graph/matrix-tree/) | 高级计数工具 |
| 树链剖分、点分治 | 图论 | [graph/hld](https://oi-wiki.org/graph/hld/) | 优先 LCA 和树上差分 |
| LCT、树套树、KD 树 | 数据结构 | [ds/lct](https://oi-wiki.org/ds/lct/) | 高级数据结构 |
| 可持久化线段树、主席树 | 数据结构 | [ds/persistent](https://oi-wiki.org/ds/persistent/) | 超出当前范围 |
| 后缀自动机、回文自动机 | 字符串 | [string/sam](https://oi-wiki.org/string/sam/) | 高级字符串算法 |
| FFT、NTT、多项式 | 数学 | [math/poly/fft](https://oi-wiki.org/math/poly/fft/) | 超出蓝桥杯范围 |
| 莫比乌斯反演、杜教筛 | 数学 | [math/number-theory/mobius](https://oi-wiki.org/math/number-theory/mobius/) | 高级数论 |
| 线性规划、单纯形 | 数学 | [math/linear-programming](https://oi-wiki.org/math/linear-programming/) | 蓝桥杯不以线性规划为核心 |
| 高级计算几何 | 几何 | [geometry](https://oi-wiki.org/geometry/) | 优先基础向量和凸包 |
| 竞赛评测系统开发 | 工程 | [contest/problemsetting](https://oi-wiki.org/contest/problemsetting/) | 与参赛目标无关 |

---

## 五、常用外部资源

| 资源 | 链接 |
| --- | --- |
| OI Wiki | [oi-wiki.org](https://oi-wiki.org/) |
| 蓝桥杯官网 | [dasai.lanqiao.cn](https://dasai.lanqiao.cn/) |
| 洛谷 | [luogu.com.cn](https://www.luogu.com.cn/) |
| 牛客 | [nowcoder.com](https://www.nowcoder.com/) |
| cppreference | [zh.cppreference.com](https://zh.cppreference.com/) |
| Compiler Explorer | [godbolt.org](https://godbolt.org/) |
| OI Wiki GitHub | [github.com/OI-wiki/OI-wiki](https://github.com/OI-wiki/OI-wiki) |

---

## 六、使用原则

1. 本附录只提供入口，不复制 OI Wiki 正文。
2. C / D 清单不是永久否定，真题反复出现时可以升级。
3. 赛制、题型、分值以当年官方章程为准。
4. 学习时优先回到对应阶段文章，再看 OI Wiki。

---

## 上一篇

上一篇：[阶段 8：冲刺与复盘](/bluebridge/08-sprint/)

