---
title: 阶段 1：C++ 基础与 VS Code 刷题环境
date: 2026-09-28 12:10:00
updated: 2026-09-28 12:10:00
tags:
  - 蓝桥杯
  - C++
  - VS Code
  - 环境配置
categories:
  - 蓝桥杯
cover: https://img.loogeking.top/images/bluebridge/6.jpg
description: "蓝桥杯 C++ 第一阶段：C++ 基础清单 + VS Code 刷题环境配置 + 调试对拍工作流。"
password: "hjy0227"
abstract: "本文已加密，请输入密码继续阅读。"
message: "请输入密码查看 C++ 基础与 VS Code 刷题环境配置。"
permalink: bluebridge/01-cpp-vscode/
---

# 阶段 1：C++ 基础与 VS Code 刷题环境

> 阶段目标：能稳定写、编译、调试、对拍 C++ 算法题。
>
> 适用前提：VS Code 和 C++ 编译器已经安装。
>
> 重要提醒：蓝桥杯比赛环境不一定有 VS Code 和插件，最终必须会命令行编译。

---

## 一、这一阶段要解决什么

这一阶段不追求做难题，只解决四件事：

1. C++ 基础语法和输入输出不出错。
2. 会处理数组、字符串、函数、递归、结构体。
3. 会估算复杂度，知道程序为什么会超时。
4. 会使用 VS Code 编译、运行、调试、对拍。

如果这一阶段不牢，后面的 STL、DP、图论都会反复卡在语法、边界和调试上。

---

## 二、C++ 基础知识点清单

| 知识点 | 等级 | 前置 | 掌握要求 | 刷题 |
| --- | --- | --- | --- | --- |
| 程序结构、编译与标准 IO | S | 无 | 能独立写出完整程序；会 cin/cout 和 scanf/printf | 必刷 |
| 数据类型、溢出与精度 | S | 程序结构 | 熟悉 int、long long、double、char；会判断溢出 | 必刷 |
| 数组与字符串基础 | S | 程序结构 | 掌握一维、二维数组和 string 常用操作 | 必刷 |
| 函数、递归与结构体 | S | 数组、数据类型 | 会写函数、递归出口、结构体排序 | 必刷 |
| 复杂度分析 | S | 程序结构 | 能估算时间和空间，知道常见超时原因 | 少量 |
| 引用、指针、命名空间、const | B | 数据类型 | 能读懂常见代码，知道用途 | 否 |
| 类、运算符重载、lambda | A | 函数、结构体 | 会用 lambda 自定义排序和捕获 | 少量 |
| 调试、对拍与常见错误 | A | 复杂度 | 会造数据、对拍、检查边界和溢出 | 必刷 |
| 读入输出优化与卡常 | B | 复杂度 | 知道常用 IO 优化，不滥用 | 少量 |
| 高精度 | B | 数组、字符串 | 会高精度加减乘，理解大数存储 | 少量 |

以上 S 级内容没有过关之前，不建议开始系统学习 DP 和图论。

---

## 三、环境检查

打开 PowerShell 或 VS Code 终端，依次执行：

```bash
g++ --version
where.exe g++
code --version
```

只要 `g++ --version` 能输出版本号，编译器就可用。  
如果 `code --version` 不识别，说明 VS Code 命令行工具没有加入 PATH；不影响图形界面使用，但会影响 `code .` 打开项目。

---

## 四、推荐 VS Code 扩展

| 扩展 | 作者 | 作用 | 是否必装 |
| --- | --- | --- | --- |
| C/C++ | Microsoft | 语法高亮、智能提示、调试 | 必装 |
| Error Lens | Alexander | 行内显示错误 | 推荐 |
| Code Runner | Jun Han | 一键运行单文件 | 可选 |
| Competitive Programming Helper | Divyanshu Agrawal | 题目测试、批量样例 | 可选 |
| GitLens | GitKraken | Git 增强 | 可选 |
| Chinese (Simplified) | Microsoft | 中文界面 | 按需 |

蓝桥杯刷题不需要 LeetCode 插件。  
LeetCode 插件更适合面试题和力扣平台，和蓝桥杯的比赛形式不同。

---

## 五、推荐工作目录

```text
D:\Study\BlueBridge\
├─ .vscode\
│  ├─ tasks.json
│  ├─ launch.json
│  ├─ c_cpp_properties.json
│  └─ settings.json
├─ templates\
│  └─ main.cpp
├─ problems\
│  ├─ 01-cpp-basic\
│  ├─ 02-stl\
│  ├─ 03-basic-algorithm\
│  └─ ...
├─ notes\
└─ docs\
```

每道题单独一个文件夹，方便放代码、输入输出和对拍程序。

---

## 六、VS Code 配置

以下配置默认你使用 MinGW-w64 的 `g++`。  
如果你的编译器路径不同，请把 `C:/msys64/mingw64/bin/...` 换成自己的实际路径。

### 1. tasks.json

路径：`.vscode/tasks.json`

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "build",
      "type": "shell",
      "command": "g++",
      "args": [
        "-std=c++17",
        "-O2",
        "-Wall",
        "-Wextra",
        "-g",
        "-DLOCAL",
        "${file}",
        "-o",
        "${fileDirname}/${fileBasenameNoExtension}.exe"
      ],
      "options": {
        "cwd": "${fileDirname}"
      },
      "problemMatcher": [
        "$gcc"
      ],
      "group": {
        "kind": "build",
        "isDefault": true
      }
    },
    {
      "label": "run",
      "type": "shell",
      "command": "${fileDirname}/${fileBasenameNoExtension}.exe",
      "options": {
        "cwd": "${fileDirname}"
      },
      "dependsOn": "build",
      "problemMatcher": []
    }
  ]
}
```

说明：

- `-std=c++17`：使用 C++17，兼顾新特性和比赛兼容性。
- `-O2`：本地也按优化级别编译，更接近比赛环境。
- `-Wall -Wextra`：开启常见警告。
- `-g`：生成调试信息，F5 调试需要。
- `-DLOCAL`：本地编译时定义 `LOCAL`，用于输入输出重定向。

### 2. launch.json

路径：`.vscode/launch.json`

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "g++ 调试当前文件",
      "type": "cppdbg",
      "request": "launch",
      "program": "${fileDirname}/${fileBasenameNoExtension}.exe",
      "args": [],
      "stopAtEntry": false,
      "cwd": "${fileDirname}",
      "environment": [],
      "externalConsole": false,
      "MIMode": "gdb",
      "miDebuggerPath": "C:/msys64/mingw64/bin/gdb.exe",
      "setupCommands": [
        {
          "description": "为 gdb 启用整齐打印",
          "text": "-enable-pretty-printing",
          "ignoreFailures": true
        }
      ],
      "preLaunchTask": "build"
    }
  ]
}
```

注意：`miDebuggerPath` 要改成你自己的 `gdb.exe` 路径。

### 3. c_cpp_properties.json

路径：`.vscode/c_cpp_properties.json`

```json
{
  "version": 4,
  "configurations": [
    {
      "name": "Win32",
      "includePath": [
        "${workspaceFolder}/**"
      ],
      "defines": [
        "_DEBUG",
        "LOCAL"
      ],
      "compilerPath": "C:/msys64/mingw64/bin/g++.exe",
      "cStandard": "c17",
      "cppStandard": "c++17",
      "intelliSenseMode": "windows-gcc-x64"
    }
  ]
}
```

同样需要把 `compilerPath` 改成自己的实际路径。

### 4. settings.json

路径：`.vscode/settings.json`

```json
{
  "files.encoding": "utf8",
  "files.autoSave": "afterDelay",
  "editor.tabSize": 4,
  "editor.minimap.enabled": false,
  "code-runner.runInTerminal": true,
  "code-runner.saveFileBeforeRun": true,
  "code-runner.clearPreviousOutput": true,
  "code-runner.executorMap": {
    "cpp": "cd $dir && g++ -std=c++17 -O2 -Wall -Wextra -g -DLOCAL $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt"
  },
  "terminal.integrated.defaultProfile.windows": "PowerShell"
}
```

如果不用 Code Runner，可以删掉 `code-runner.*` 配置。

---

## 七、刷题模板

路径：`templates/main.cpp`

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
using pii = pair<int, int>;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

#ifdef LOCAL
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);
#endif

    // TODO: 在这里写题

    return 0;
}
```

说明：

- `bits/stdc++.h` 在 GCC 下可用，蓝桥杯 C++ 环境通常也是 GCC。
- 如果改用 MSVC，需要改成标准头文件。
- `#ifdef LOCAL` 只在本地 `-DLOCAL` 时生效，比赛提交时不会重定向文件。
- 本地每道题目录下放 `input.txt`，输出会写入 `output.txt`。

---

## 八、调试与对拍

### 1. 调试

1. 按 `Ctrl + Shift + B` 编译。
2. 按 `F5` 启动调试。
3. 在代码行号左侧点击设置断点。
4. 在左侧 Watch 面板查看变量。
5. 对数组和 `vector` 可以查看指定区间。

### 2. 对拍

准备三个文件：

```text
gen.cpp     // 随机生成小数据
brute.cpp   // 暴力程序
solve.cpp   // 你的解法
```

编译后，在 PowerShell 里循环比较：

```powershell
for ($i = 1; $i -le 1000; $i++) {
    ./gen.exe > input.txt
    ./solve.exe < input.txt > out1.txt
    ./brute.exe < input.txt > out2.txt

    if (Compare-Object (Get-Content out1.txt) (Get-Content out2.txt)) {
        Write-Host "发现差异，测试数据已保存在 input.txt"
        break
    }
}
```

对拍是进阶阶段最重要的能力之一，尤其是搜索、贪心、DP 题。

---

## 九、蓝桥杯注意事项

1. 比赛最终环境不一定有 VS Code、Code Runner 或调试插件。
2. 必须会命令行编译：

```bash
g++ main.cpp -o main -std=c++17 -O2 -Wall
```

3. 默认使用标准输入输出；只有题目明确要求文件输入输出时才使用文件。
4. 建议以 C++17 为主，不要依赖 C++20 / C++23 的新特性。
5. 注意 `long long`、数组大小、多测清空、取模、浮点精度。
6. 提交前检查：

```text
input.txt / output.txt 是否会影响提交
数组是否越界
int 是否会溢出
多组数据是否清空
边界数据是否测试
样例是否通过
```

---

## 十、阶段验收清单

- [ ] `g++ --version` 能输出版本号。
- [ ] VS Code 能一键编译当前文件。
- [ ] F5 能启动调试并命中断点。
- [ ] 能从 `input.txt` 读取数据。
- [ ] 能查看数组和 `vector` 变量。
- [ ] 能写一份随机数据对拍脚本。
- [ ] 能用命令行 `g++` 编译并运行程序。
- [ ] 能独立写出 C++ 基础题，不因语法和边界失分。

以上都完成，才进入 STL 与基础算法阶段。

---

## 十一、外部链接

| 资源 | 链接 |
| --- | --- |
| OI Wiki 语言基础 | [oi-wiki.org/lang/](https://oi-wiki.org/lang/) |
| OI Wiki 复杂度 | [oi-wiki.org/basic/complexity/](https://oi-wiki.org/basic/complexity/) |
| VS Code C++ 官方文档 | [code.visualstudio.com/docs/cpp](https://code.visualstudio.com/docs/cpp/config-mingw) |
| MSYS2 | [msys2.org](https://www.msys2.org/) |
| MinGW-w64 | [mingw-w64.org](https://www.mingw-w64.org/) |
| cppreference | [zh.cppreference.com](https://zh.cppreference.com/) |
| Compiler Explorer | [godbolt.org](https://godbolt.org/) |

---

## 洛谷练习入口

- [洛谷题单列表](https://www.luogu.com.cn/training/list)
- [洛谷题目列表](https://www.luogu.com.cn/problem/list)
- 关键词：输入输出、数组、函数、递归、基础语法

## 推荐题目

| 题号 | 题目 | 对应知识点 |
| --- | --- | --- |
| [P1001](https://www.luogu.com.cn/problem/P1001) | A+B Problem | 输入输出 |
| [P1421](https://www.luogu.com.cn/problem/P1421) | 小玉买文具 | 顺序结构 |
| [P1425](https://www.luogu.com.cn/problem/P1425) | 小鱼的游泳时间 | 顺序结构 |
| [P1046](https://www.luogu.com.cn/problem/P1046) | [NOIP 2005 普及组] 陶陶摘苹果 | 数组 |
| [P1047](https://www.luogu.com.cn/problem/P1047) | [NOIP 2005 普及组] 校门外的树 | 数组、模拟 |
| [P1427](https://www.luogu.com.cn/problem/P1427) | 小鱼的数字游戏 | 数组、循环 |
| [P1428](https://www.luogu.com.cn/problem/P1428) | 小鱼比可爱 | 数组、枚举 |
| [P1554](https://www.luogu.com.cn/problem/P1554) | [USACO06DEC] 梦中的统计 Dream Counting B | 循环、数组 |
| [P1909](https://www.luogu.com.cn/problem/P1909) | [NOIP 2016 普及组] 买铅笔 | 枚举、分支 |
| [P1980](https://www.luogu.com.cn/problem/P1980) | [NOIP 2013 普及组] 计数问题 | 循环、函数 |
| [P2141](https://www.luogu.com.cn/problem/P2141) | [NOIP 2014 普及组] 珠心算测验 | 枚举、去重 |
| [P1035](https://www.luogu.com.cn/problem/P1035) | [NOIP 2002 普及组] 级数求和 | 循环、递归 |

## 上一篇 / 下一篇

上一篇：[蓝桥杯 C++ 学习路线总览](/bluebridge/00-overview/)

下一篇：[阶段 2：STL 与基础算法](/bluebridge/02-stl-basic/)

