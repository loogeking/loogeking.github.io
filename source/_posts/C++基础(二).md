---
title: C++基础(二)
date: 2026-7-17 20:21
tags:
  - C++
cover: https://i.postimg.cc/3RsFmzVH/1.jpg
---
# 第二章：C++ 函数篇 —— 从单文件到多文件程序

> 学习来源：[LearnCpp — Chapter 2](https://www.learncpp.com/)
> 整理目的：以更精炼、更适合复习和分享的方式，梳理 C++ 函数的基础知识与工程组织方式。

---

## 0. 本章脉络（先看全景）

第二章回答了一个问题：

> **怎么把程序拆成多个小块，组织成清晰、可复用、可维护的工程？**

围绕这个问题，学完之后你应该能讲清楚这几件事：

1. 函数是什么，为什么需要函数
2. 函数的返回值机制（`void` vs 有返回值）
3. 形参与实参：函数怎么接收数据
4. 局部变量的生命周期与作用域
5. 怎么高效地设计和使用函数
6. 前向声明、声明与定义的区别、ODR
7. 多文件工程的组织方式
8. 命名冲突与命名空间
9. 预处理器的工作机制
10. 头文件的作用、写法与头文件保护
11. 从头设计一个程序的方法论

下面按这个顺序展开。

---

## 1. 函数简介

### 1.1 什么是函数

> **函数是一段可复用的、用于完成某个特定任务的语句序列。**

程序的执行从 `main()` 开始，遇到**函数调用**时，CPU 会"中断当前函数"，转去执行被调用的函数，执行完再回来继续。

```cpp
void doPrint()
{
    std::cout << "In doPrint()\n";
}

int main()
{
    std::cout << "Starting main()\n";
    doPrint();               // 调用 doPrint
    std::cout << "Ending main()\n";
    return 0;
}
```

输出：
```
Starting main()
In doPrint()
Ending main()
```

### 1.2 函数的基本语法

```cpp
returnType functionName()   // 函数头
{                           // 函数体开始
    // 语句
}                           // 函数体结束
```

**关键点**：
- `caller`（调用方）调用 `callee`（被调用方）
- 函数调用必须带 `()`，否则不会被调用
- C++ **不支持嵌套函数**

### 1.3 命名约定：占位名

| 名称 | 用途 |
|------|------|
| `foo`、`bar`、`baz` | 示例中的占位名 |
| `goo`、`moo`、`boo` | 常见的三字母占位名 |

---

## 2. 函数的返回值

### 2.1 返回值的基本机制

要让函数返回值，需要做两件事：

1. **指定返回类型**：写在函数名前
2. **使用 `return` 语句**：返回具体的值

```cpp
int returnFive()
{
    return 5;               // 返回 5 给调用方
}
```

`return` 语句执行时：
1. 计算返回表达式
2. 把值**拷贝**回调用方（按值返回）
3. 函数结束，控制权返回调用方

### 2.2 完整的例子

```cpp
#include <iostream>

int getValueFromUser()
{
    std::cout << "Enter an integer: ";
    int input{};
    std::cin >> input;
    return input;           // 返回用户输入的值
}

int main()
{
    int num{ getValueFromUser() };    // 用返回值初始化 num
    std::cout << num << " doubled is: " << num * 2 << '\n';
    return 0;
}
```

### 2.3 关于 `main()` 的返回值

- `main()` **必须返回 `int`**
- 返回值叫做**状态码（status code）**
- `0` 表示程序正常运行
- 不允许显式调用 `main()`

### 2.4 重要规则

| 规则 | 说明 |
|------|------|
| 有返回值的函数**必须**返回一个值 | 否则是**未定义行为** |
| `main()` 可以不写 `return` | 会**隐式返回 `0`** |
| 函数每次只能返回一个值 | 后续会学多种绕开方法 |
| 返回值含义由函数作者决定 | **建议加注释说明** |

### 2.5 DRY 原则

> **Don't Repeat Yourself（不要重复自己）**

```cpp
// ❌ 重复代码
int main()
{
    int x{};
    std::cout << "Enter an integer: ";
    std::cin >> x;

    int y{};
    std::cout << "Enter an integer: ";
    std::cin >> y;
    // ...
}

// ✅ 复用函数
int main()
{
    int x{ getValueFromUser() };
    int y{ getValueFromUser() };
    // ...
}
```

---

## 3. void 函数（无返回值）

### 3.1 什么是 void 函数

返回类型为 `void` 的函数**不向调用方返回任何值**。

```cpp
void printHi()
{
    std::cout << "Hi" << '\n';
    // 没有 return 语句，函数末尾自动返回
}
```

### 3.2 void 函数的特点

| 特点 | 说明 |
|------|------|
| 不需要 `return` 语句 | 函数末尾自动返回 |
| 可以写 `return;` | 用于提前返回，但**末尾的 `return;` 是多余的** |
| 不能用于需要值的表达式 | `std::cout << printHi();` ❌ 编译错误 |
| 不能在 void 函数里返回一个值 | `return 5;` ❌ 编译错误 |

```cpp
void returnNothing() {}

int returnFive() { return 5; }

int main()
{
    returnNothing();    // ✅ 合法
    returnFive();       // ✅ 合法，返回值被忽略

    std::cout << returnFive();    // ✅ 合法
    std::cout << returnNothing(); // ❌ 编译错误
}
```

---

## 4. 函数的形参与实参

### 4.1 基本概念

- **形参（parameter）**：函数头中定义的变量，由调用方提供初始值
- **实参（argument）**：调用函数时传给形参的具体值

```cpp
int add(int x, int y)    // x 和 y 是形参
{
    return x + y;
}

int main()
{
    add(2, 3);           // 2 和 3 是实参
}
```

### 4.2 按值传递

**实参的值通过拷贝初始化赋给形参**，这个过程叫"按值传递"。

```cpp
void printValues(int x, int y)
{
    std::cout << x << '\n';
    std::cout << y << '\n';
}

int main()
{
    printValues(6, 7);   // x=6, y=7
}
```

### 4.3 形参与实参的配合

实参可以是任何**表达式**（字面量、变量、函数调用等）：

```cpp
std::cout << add(1 + 2, 3 * 4) << '\n';     // add(3, 12)
std::cout << add(1, multiply(2, 3)) << '\n'; // add(1, 6)
std::cout << add(1, add(2, 3)) << '\n';      // add(1, 5)
```

### 4.4 未使用的形参

如果形参在函数体内未被使用，可以**省略形参名**（避免编译器警告）：

```cpp
void doSomething(int /*count*/)   // 未命名形参
{
    // 不使用 count
}
```

### 4.5 关键区分

> **形参 ← 调用方提供初始值 → 用形参**  
> **局部变量 ← 函数自己提供初始值 → 用局部变量**

```cpp
// ❌ 错误：用形参接收用户输入
int getValueFromUser(int val)
{
    std::cin >> val;
    return val;
}

// ✅ 正确：用局部变量
int getValueFromUser()
{
    int val{};
    std::cin >> val;
    return val;
}
```

---

## 5. 局部作用域

### 5.1 局部变量的生命周期

- **创建**：形参在函数进入时创建；局部变量在定义处创建
- **销毁**：在所在大括号结束时销毁（顺序与创建相反）

```cpp
int add(int x, int y)          // x, y 在这里创建
{
    int z{ x + y };            // z 在这里创建
    return z;
}                              // z, y, x 在这里销毁
```

### 5.2 局部作用域（块作用域）

> **标识符的作用域：从定义处开始，到最内层大括号结束为止。**

```cpp
int main()
{
    // x 还不可用
    int x{ 0 };                // x 进入作用域
    doSomething();             // x 在 doSomething 中不可见
    return 0;
}                              // x 离开作用域
```

### 5.3 生命周期 vs 作用域

| 概念 | 阶段 | 说明 |
|------|------|------|
| **生命周期** | 运行时 | 对象从创建到销毁的时间 |
| **作用域** | 编译期 | 标识符在源码中可见的位置 |

### 5.4 不同函数的同名变量互不干扰

```cpp
int add(int x, int y)          // add 的 x, y
{
    return x + y;
}

int main()
{
    int x{ 5 };                // main 的 x
    int y{ 6 };                // main 的 y
    std::cout << add(x, y);    // 互不干扰！
}
```

### 5.5 变量定义的位置

> **最佳实践：在"尽可能接近首次使用"的位置定义局部变量。**

```cpp
std::cout << "Enter an integer: ";
int x{};                       // 定义在首次使用前
std::cin >> x;
```

### 5.6 临时对象

- 没有名字的对象，用于短暂保存值
- 在完整表达式末尾被销毁
- 按值返回时，返回值保存在临时对象中

```cpp
std::cout << getValueFromUser() << '\n';   // 返回值存在临时对象中
```

---

## 6. 高效使用函数

### 6.1 为什么要用函数

| 好处 | 说明 |
|------|------|
| **组织性** | 把复杂程序拆成小模块 |
| **可复用性** | 避免重复代码（DRY） |
| **可测试性** | 函数自包含，测一次即可 |
| **可扩展性** | 改一处，所有调用处自动生效 |
| **抽象性** | 只需知道函数签名，不用关心内部实现 |

### 6.2 何时写函数

1. 程序中多次出现的一组语句
2. 有明确输入、明确输出的代码块
3. 一个函数只做一件事
4. 函数太长/太复杂 → 拆成多个子函数（重构）

### 6.3 常见的"三步走"结构

```
读取输入 → 计算 → 输出结果
```

**新手易犯错误**：把"计算"和"输出"合并到一个函数里。

```cpp
// ❌ 错误：计算和输出混在一起
void printDouble()
{
    int num{ getValueFromUser() };
    std::cout << num * 2;
}

// ✅ 正确：计算函数只返回结果
int doubleValue(int x)
{
    return x * 2;
}
// 由调用方决定怎么使用这个结果
```

---

## 7. 前向声明与定义

### 7.1 问题：编译器按顺序编译

```cpp
#include <iostream>

int main()
{
    std::cout << add(3, 4);    // ❌ 编译错误：add 还没定义
}

int add(int x, int y)          // 定义在调用之后
{
    return x + y;
}
```

### 7.2 解决方案一：调整顺序

把 `add` 移到 `main` 前面。但**不总是可行**（例如相互调用的函数）。

### 7.3 解决方案二：前向声明

> **前向声明：在正式定义之前，告诉编译器某个标识符的存在。**

```cpp
#include <iostream>

int add(int x, int y);         // 前向声明（函数原型）

int main()
{
    std::cout << add(3, 4);    // ✅ 通过前向声明可知 add 存在
}

int add(int x, int y)          // 定义在这里
{
    return x + y;
}
```

### 7.4 声明 vs 定义

| 术语 | 含义 | 示例 |
|------|------|------|
| **声明（Declaration）** | 告诉编译器标识符存在及其类型 | `int add(int x, int y);` |
| **定义（Definition）** | 实现函数/实例化变量 | `int add(int x, int y) { ... }` |
| **纯声明（Pure Declaration）** | 不是定义的声明 | 前向声明 |
| **初始化（Initialization）** | 给对象提供初始值 | `int x{ 5 };` |

> **所有定义都是声明，但不是所有声明都是定义。**

### 7.5 一次定义原则（ODR）

1. 一个文件内：每个标识符只能有一个定义
2. 一个程序内：每个函数/变量只能有一个定义
3. 类型/模板/内联函数允许在不同文件中有重复定义（但必须完全相同）

```cpp
int add(int x, int y) { return x + y; }
int add(int x, int y) { return x + y; }   // ❌ 重复定义
```

---

## 8. 多源文件程序

### 8.1 核心机制

> **编译器逐文件编译，不会记住别的文件里有什么。**

```cpp
// add.cpp
int add(int x, int y)
{
    return x + y;
}

// main.cpp
#include <iostream>

int add(int x, int y);         // 前向声明（告诉编译器 add 在别处）

int main()
{
    std::cout << add(3, 4);    // 编译通过
}
```

### 8.2 链接器的职责

- **编译器**：每个文件独立编译，产生目标文件（`.obj` / `.o`）
- **链接器**：把所有目标文件中的定义"连接"起来

### 8.3 常见错误排查

| 错误类型 | 原因 | 解决方案 |
|----------|------|----------|
| 编译错误：`add` not found | 缺少前向声明 | 在调用前加前向声明 |
| 链接错误：unresolved external | `.cpp` 没加入项目 | 把文件加入项目/编译命令 |
| 链接错误：多重定义 | 在多个文件中定义了同一个函数 | 只保留一个定义 |

### 8.4 关键注意

- 每个用到 `std::cout` 的源文件都要 `#include <iostream>`
- **不要在 `.cpp` 里 `#include` 另一个 `.cpp` 文件**

---

## 9. 命名冲突与命名空间

### 9.1 命名冲突

同一个程序中，如果两个同名标识符让编译器/链接器分不清，就是命名冲突。

```cpp
// a.cpp
void myFcn(int x) { /* ... */ }

// main.cpp
void myFcn(int x) { /* ... */ }   // ❌ 链接错误：重复定义
```

### 9.2 命名空间

> **命名空间提供了一种作用域区域，把同名标识符隔离开。**

| 命名空间 | 说明 |
|----------|------|
| **全局命名空间** | 所有默认定义在全局的名字 |
| **`std` 命名空间** | 标准库的名字都在这里 |

### 9.3 访问命名空间中的名字

**方式一：显式限定（推荐）**

```cpp
std::cout << "Hello";   // 明确指定 std 命名空间中的 cout
```

**方式二：`using namespace std;`（不推荐）**

```cpp
using namespace std;
cout << "Hello";        // 可能和自己定义的名字冲突
```

```cpp
#include <iostream>
using namespace std;

int cout() { return 5; }   // 自己定义了一个 cout

int main()
{
    cout << "Hello";       // ❌ 编译错误：哪个 cout？
}
```

> **警告：不要在程序顶部或头文件里使用 `using namespace std;`**

### 9.4 作用域解析运算符 `::`

`::` 左边是命名空间，右边是名字。

```cpp
std::cout     // std 命名空间中的 cout
::cout        // 全局命名空间中的 cout
```

---

## 10. 预处理器简介

### 10.1 预处理阶段

> **在真正编译之前，每个 `.cpp` 文件先经过预处理。**

预处理器处理的是**文本**，不关心 C++ 语法。

```
源文件 → 预处理器 → 翻译单元 → 编译器
```

### 10.2 `#include`

```cpp
#include <iostream>   // 用 iostream 的内容替换这一行
```

### 10.3 宏定义 `#define`

```cpp
#define MY_NAME "Alex"        // 定义宏
std::cout << MY_NAME;         // 替换为 "Alex"
```

**对象式宏**：

```cpp
#define USE_YEN                // 无替换文本（用于条件编译）
```

**宏名惯例：全部大写，下划线分隔。**

> **除非没有更好的替代方案，否则避免使用带替换文本的宏。**

### 10.4 条件编译

```cpp
#define PRINT_JOE

#ifdef PRINT_JOE
    std::cout << "Joe\n";      // 被编译（已定义）
#endif

#ifdef PRINT_BOB
    std::cout << "Bob\n";      // 被忽略（未定义）
#endif
```

`#ifndef` 是反义（检查是否**未定义**）：

```cpp
#ifndef PRINT_BOB
    std::cout << "Bob\n";      // 被编译（PRINT_BOB 未定义）
#endif
```

### 10.5 `#if 0` 屏蔽代码

```cpp
#if 0
    // 这段代码不参与编译
    std::cout << "Hidden\n";
#endif

#if 1   // 改为 1 即可恢复
    // 这段代码参与编译
    std::cout << "Visible\n";
#endif
```

### 10.6 指令的作用范围

- 从定义处到**所在文件的末尾**
- 一个文件中的指令**不影响其他文件**

---

## 11. 头文件

### 11.1 为什么要用头文件

> **头文件用于集中存放声明，然后在需要的地方 `#include` 进来。**

```cpp
// add.h —— 头文件
int add(int x, int y);        // 前向声明

// add.cpp —— 源文件
#include "add.h"
int add(int x, int y)
{
    return x + y;
}

// main.cpp
#include "add.h"
int main()
{
    add(3, 4);
}
```

### 11.2 尖括号 vs 双引号

| 写法 | 用途 | 查找路径 |
|------|------|----------|
| `<iostream>` | 系统/标准库头文件 | 包含目录（不查项目目录） |
| `"add.h"` | 自定义头文件 | 先查当前目录，再查包含目录 |

### 11.3 不要把头文件里的定义放到头文件

```cpp
// ❌ 错误：不要在头文件里定义函数
int add(int x, int y)        // 被多个 .cpp #include 后 → 多重定义
{
    return x + y;
}
```

### 11.4 配对包含

> **源文件应 `#include` 与它配对的头文件。**

```cpp
// add.cpp
#include "add.h"             // 配对包含

// 如果返回类型写错，编译期就能发现
double add(int x, int y)     // ❌ 与 add.h 中的 int add 不一致 → 编译错误
{
    return x + y;
}
```

### 11.5 头文件可以 `#include` 其他头文件

```cpp
// Foo.h
#include <string_view>
std::string_view getApplicationName();
```

### 11.6 传递性包含

> **不要依赖另一个头文件传递进来的包含，显式 `#include` 自己需要的内容。**

```cpp
#include <iostream>          // 可能传递包含了 <string>
std::string name;            // ❌ 不要依赖传递包含，应显式 #include <string>
```

### 11.7 `#include` 的推荐顺序

1. 本源文件配对的头文件（如 `add.cpp` 先 `#include "add.h"`）
2. 本项目其他头文件
3. 第三方库头文件
4. 标准库头文件

### 11.8 头文件最佳实践

| 建议 | 说明 |
|------|------|
| 始终写头文件保护 | 下一节详述 |
| 不在头文件里定义函数/变量 | 目前阶段 |
| 头文件与源文件同名 | `add.h` ↔ `add.cpp` |
| 显式包含所需头文件 | 不依赖传递包含 |
| 不使用 `.cpp` 文件 | 避免 `#include "add.cpp"` |

---

## 12. 头文件保护

### 12.1 问题：头文件被重复包含

```cpp
// square.h
int getSquareSides() { return 4; }

// wave.h
#include "square.h"

// main.cpp
#include "square.h"
#include "wave.h"      // square.h 被包含两次
```

展开后 `main.cpp` 中有两个 `getSquareSides` 定义 → **重复定义错误**。

### 12.2 头文件保护（Header Guard）

```cpp
#ifndef SQUARE_H
#define SQUARE_H

// 头文件内容

#endif
```

**工作原理**：
- 第一次包含：`SQUARE_H` 未定义 → 定义它，包含内容
- 第二次包含：`SQUARE_H` 已定义 → 跳过内容

### 12.3 完整示例

```cpp
// square.h
#ifndef SQUARE_H
#define SQUARE_H

int getSquareSides();
int getSquarePerimeter(int sideLength);

#endif
```

```cpp
// square.cpp
#include "square.h"

int getSquareSides() { return 4; }

int getSquarePerimeter(int sideLength)
{
    return sideLength * getSquareSides();
}
```

### 12.4 头文件保护 vs `#pragma once`

| 方式 | 写法 | 特点 |
|------|------|------|
| 传统头文件保护 | `#ifndef ... #define ... #endif` | 标准、可移植 |
| `#pragma once` | `#pragma once` | 更简洁，现代编译器普遍支持 |

```cpp
#pragma once
// 头文件内容
```

**本教程使用传统头文件保护**（更规范、最广泛支持）。

### 12.5 重要澄清

> **头文件保护防止"同一个文件内"重复包含，不防止"不同文件各包含一次"。**

`square.h` 被 `square.cpp` 和 `main.cpp` 各包含一次 → 各得一份声明，**链接器**正确连接。

### 12.6 即使只有声明也应加保护

```cpp
#ifndef FOO_H
#define FOO_H

void foo();    // 只有声明，但加保护是好习惯

#endif
```

---

## 13. 如何设计一个程序

### 13.1 设计流程

```
明确目标 → 明确需求 → 确定工具/平台 → 拆解问题 → 确定顺序 → 实现
```

### 13.2 第 1 步：明确目标

用一两句话描述"用户视角的结果"：
- 让用户能管理姓名和电话的名单
- 根据用户输入的高度计算球落地所需时间

### 13.3 第 2 步：明确需求

- **约束**：预算、时间、内存
- **能力**：程序必须具备的功能

> 需求聚焦"做什么"，不是"怎么做"。

### 13.4 第 3 步：明确工具与备份

- 目标平台、工具链、测试策略
- **一定要有备份策略**（云盘、GitHub 等）

### 13.5 第 4 步：拆解问题（自顶向下）

把大任务拆成小任务，直到每一步都足够简单。

```
打扫房子
├── 吸尘
├── 打扫卫生间
│   ├── 刷马桶
│   └── 洗洗手台
└── 打扫厨房
    ├── 清空台面
    ├── 擦净台面
    └── 倒垃圾
```

**任务树对应程序结构**：
- 顶层 = `main()`
- 子任务 = 函数

### 13.6 第 5 步：确定事件顺序

```
从用户获取输入 → 计算结果 → 输出结果
```

### 13.7 实现策略

**1. 先搭 `main` 骨架**

```cpp
int main()
{
    // 获取用户输入
    // 计算结果
    // 输出结果
    return 0;
}
```

**2. 逐个实现每个函数，每实现一个就测试一个**

```cpp
int getUserInput()           // 实现第一个函数
{
    std::cout << "Enter an integer: ";
    int input{};
    std::cin >> input;
    return input;
}

int main()
{
    int value{ getUserInput() };
    std::cout << value << '\n';   // 临时测试代码
    // ...
}
```

### 13.8 写作建议

| 原则 | 说明 |
|------|------|
| **一开始做简单** | 从小目标开始，逐步扩展 |
| **逐步加功能** | 每次只加一小步 |
| **一次只专注一件事** | 别同时做多个任务 |
| **写一段测一段** | 及时编译、测试，尽早发现错误 |
| **不要过早追求完美** | 先让代码能跑，再逐步打磨 |
| **优先可维护性** | 不要过早优化性能 |

> **一个能工作的复杂系统，无一例外都是从一个能工作的简单系统演化而来的。**
> —— John Gall

---

## 14. 本章重点回顾（面试/复试速记版）

| # | 关键问题 | 一句话答案 |
|---|----------|------------|
| 1 | 函数调用时发生了什么？ | 中断当前函数，执行被调用函数，执行完返回 |
| 2 | 有返回值的函数必须怎么做？ | 通过 `return` 返回对应类型的值 |
| 3 | `void` 函数的特点？ | 不返回值，不能用于需要值的表达式 |
| 4 | 形参和实参有什么区别？ | 形参是函数头中的变量，实参是调用时传入的值 |
| 5 | 实参如何传递到形参？ | 按值传递（拷贝） |
| 6 | 局部变量的生命周期？ | 从定义处创建，到所在大括号结束销毁 |
| 7 | 作用域是什么？ | 标识符在源码中可见的区域（编译期） |
| 8 | 什么时候用前向声明？ | 调用定义在后面的函数，或定义在其他文件的函数 |
| 9 | 声明和定义的区别？ | 声明告诉存在，定义给出实现/实例化 |
| 10 | ODR 是什么？ | 一个标识符在给定作用域只能有一个定义 |
| 11 | 头文件有什么用？ | 集中存放声明，通过 `#include` 传播 |
| 12 | 头文件保护的作用？ | 防止同一个头文件在一个源文件中被多次包含 |
| 13 | `std::` 前缀为什么重要？ | 避免与全局命名空间中的名字冲突 |
| 14 | 预处理器做什么？ | 处理 `#include`、`#define`、条件编译等文本指令 |

---

## 15. 学习心得

学完第二章我最大的三个感受：

1. **`main` 只是起点，真正的工程在函数与文件之间。**  
   一个单文件的 `main` 再复杂也是玩具，学会拆文件、用头文件、理解链接，才真正摸到了工程的门槛。

2. **"声明"和"定义"的区别，是 C++ 编译模型的核心。**  
   不理解这个，就永远搞不懂为什么加了头文件还要加源文件、为什么有些错误是编译期有些是链接期。

3. **设计比编码更重要。**  
   以前总想"先写起来再说"，结果代码越写越乱。现在学会先搭骨架、拆函数、逐个实现和测试，效率反而更高。

> 从下一章开始，我准备学习**代码调试**和**基础数据类型**，把"写出能跑的代码"升级为"写出能跑且正确的代码"。

---

> **代码仓库**：[cpp-learning-journey](https://github.com/loogeking/cpp-learning-journey)
> **学习网站**：[learnCPP](https://www.learncpp.com/)