---
title: vscode配置C++刷题环境
date: 2026-06-20 21:34:49
cover: https://i.postimg.cc/KYsRwHW9/vscode.jpg
tags:
  - vscode
  - C++
categories:
  - 算法
---
# 从零搭建 VSCode C++ 算法刷题环境（含 LeetCode 插件 + Git 工作流）

> 适合人群：准备考研机试、刷 LeetCode、面试算法题的同学  
> 目标：在 VSCode 里一键写题、一键运行、一键提交、一键 push 到 GitHub  
> 系统：Windows（Mac/Linux 同理，仅个别命令不同）

---

## 一、环境总览

我们要搭建的环境包含：

- VSCode（编辑器）
- MinGW-w64 / g++（C++ 编译器）
- Code Runner（一键运行）
- LeetCode 插件（在 VSCode 里刷力扣）
- Git + GitHub（版本管理 + 题解仓库）
- 代码片段 Snippets（一键生成题解模板）

完成后，写一道算法题的完整流程是：

```
打开 LeetCode 插件 → 选题 → 写代码 → 本地运行测试 → 提交力扣 → git push
```

---

## 二、安装 VSCode 与 C++ 编译器

### 1. 安装 VSCode

官网下载：<https://code.visualstudio.com/>

### 2. 安装 C++ 编译器（MinGW-w64）

推荐用 **MSYS2** 安装，最干净稳定：

1. 下载 MSYS2：<https://www.msys2.org/>
2. 安装后，打开 **MSYS2 MINGW64** 终端，执行：

   ```bash
   pacman -S mingw-w64-x86_64-gcc
   ```

3. 把以下路径加入系统环境变量 `Path`：

   ```
   C:\msys64\mingw64\bin
   ```

4. 验证安装：

   ```bash
   g++ --version
   ```

   能输出版本号即成功，例如：

   ```
   g++.exe (x86_64-posix-seh-rev0, Built by MinGW-Builds project) 16.1.0
   ```

---

## 三、必装 VSCode 插件

| 插件 | 作者 | 作用 |
|------|------|------|
| **C/C++** | Microsoft | C++ 语法高亮、智能提示、调试 |
| **Code Runner** | Jun Han | 一键运行代码 |
| **LeetCode** | shengchen liu | 在 VSCode 内刷力扣 |
| **Error Lens** | Alexander | 行内显示错误信息 |
| **GitLens** | GitKraken | 增强 Git 体验 |
| **Material Icon Theme** | Philipp Kief | 美化文件图标（可选） |
| **Chinese (Simplified)** | Microsoft | 中文界面（按需） |

安装方式：`Ctrl + Shift + X` 打开扩展商店，搜索名称即可。

---

## 四、配置 settings.json

打开命令面板：`Ctrl + Shift + P` → 输入 `Open User Settings (JSON)`

粘贴以下配置（请把 `leetcode.workspaceFolder` 改成自己的仓库路径）：

```json
{
    // ===== Code Runner =====
    "code-runner.runInTerminal": true,
    "code-runner.saveFileBeforeRun": true,
    "code-runner.clearPreviousOutput": true,
    "code-runner.ignoreSelection": true,
    "code-runner.executorMap": {
        "cpp": "cd $dir && g++ -std=c++17 -O2 $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt"
    },

    // ===== LeetCode =====
    "leetcode.endpoint": "leetcode-cn",
    "leetcode.defaultLanguage": "cpp",
    "leetcode.workspaceFolder": "D:/code/algorithm-solutions",
    "leetcode.filePath": {
        "default": {
            "folder": "problems/leetcode",
            "filename": "${id}-${kebab-case-name}.${ext}"
        }
    },
    "leetcode.hint.commandShortcut": false,
    "leetcode.hint.configWebviewMarkdown": false,

    // ===== 编辑体验 =====
    "files.autoSave": "afterDelay",
    "editor.fontSize": 15,
    "editor.tabSize": 4,
    "editor.formatOnSave": true,
    "editor.minimap.enabled": false,
    "editor.cursorBlinking": "smooth",
    "editor.smoothScrolling": true,
    "editor.bracketPairColorization.enabled": true,
    "terminal.integrated.fontSize": 14,
    "workbench.iconTheme": "material-icon-theme"
}
```

### 关键配置说明

| 配置 | 作用 |
|------|------|
| `runInTerminal` | 在终端运行，支持 `cin` 输入 |
| `saveFileBeforeRun` | 运行前自动保存 |
| `executorMap.cpp` | 使用 C++17 编译并开启 O2 优化 |
| `leetcode.workspaceFolder` | LeetCode 插件下载题目时的存放位置 |
| `formatOnSave` | 保存时自动格式化代码 |

---

## 五、配置 LeetCode 插件

### 1. 切换为力扣中国站

`Ctrl + Shift + P` → 输入：

```
LeetCode: Switch Endpoint
```

选择 `leetcode.cn`。

### 2. 使用 Cookie 登录（最稳定）

`Ctrl + Shift + P` → 输入：

```
LeetCode: Sign in
```

选 **LeetCode Cookie**，然后：

1. 浏览器登录 <https://leetcode.cn>
2. 按 `F12` → **Application → Cookies → https://leetcode.cn**
3. 复制以下两个字段的 Value：
   - `LEETCODE_SESSION`
   - `csrftoken`
4. 粘贴到 VSCode 提示框中

登录成功后，VSCode 左下角会显示用户名。

### 3. 设置默认语言为 C++

```
LeetCode: Switch Default Language → cpp
```

---

## 六、常用 LeetCode 命令

| 命令 | 作用 |
|------|------|
| `LeetCode: Show Problem` | 打开一道题 |
| `LeetCode: Test` | 用样例本地测试 |
| `LeetCode: Submit` | 提交到力扣 |
| `LeetCode: Pick One` | 随机来一题 |
| `LeetCode: Sign in / out` | 登录登出 |

> 也可以直接在左侧 LeetCode 面板里右键题目，选 Show / Test / Submit。

---

## 七、配置代码片段（一键生成题解模板）

`Ctrl + Shift + P` → 输入 `Snippets: Configure Snippets` → 选择 `cpp.json`：

```json
{
    "LeetCode Template": {
        "prefix": "lc",
        "body": [
            "/*",
            " * 难度：${1:简单}",
            " * 分类：${2:数组 / 哈希表}",
            " *",
            " * ────────────────────────────────────────",
            " * 【题目大意】",
            " * ${3:题目描述}",
            " *",
            " * 【解题思路】",
            " * ${4:思路}",
            " *",
            " * 【复杂度】",
            " * 时间复杂度：O(${5:n})",
            " * 空间复杂度：O(${6:1})",
            " *",
            " * 【易错点 / 收获】",
            " * - ${7:易错点}",
            " * ────────────────────────────────────────",
            " */",
            "$0"
        ],
        "description": "LeetCode 题解模板"
    }
}
```

使用方式：在 `.cpp` 文件里输入 `lc`，按 `Tab` 即可自动生成模板，逐项填写。

---

## 八、题解模板示例

下面是按模板写完的一道题，可作为参考：

```cpp
/*
 * @lc app=leetcode.cn id=9 lang=cpp
 *
 * [9] 回文数
 *
 * 难度：简单
 * 分类：数学 / 双指针
 *
 * ────────────────────────────────────────
 * 【题目大意】
 * 给一个整数 x，判断是否为回文整数。
 *
 * 【解题思路】
 * 1. 负数 / 末位为 0 且非 0 的数：一定不是回文
 * 2. 反转后半部分数字，当 x <= revertedNumber 时停止
 * 3. 偶数位：x == revertedNumber
 *    奇数位：x == revertedNumber / 10
 *
 * 【复杂度】
 * 时间复杂度：O(log10(x))
 * 空间复杂度：O(1)
 *
 * 【易错点 / 收获】
 * - 不要把整个数全反转，可能溢出
 * - 注意末位为 0 的特殊情况
 * ────────────────────────────────────────
 */

// @lc code=start
class Solution {
public:
    bool isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;

        int revertedNumber = 0;
        while (x > revertedNumber) {
            revertedNumber = revertedNumber * 10 + x % 10;
            x /= 10;
        }
        return x == revertedNumber || x == revertedNumber / 10;
    }
};
// @lc code=end
```

---

## 九、推荐的仓库目录结构

```
algorithm-solutions/
├── README.md
├── .gitignore
├── problems/
│   ├── leetcode/           # LeetCode 插件自动下载到这
│   ├── array/
│   ├── string/
│   ├── linked_list/
│   ├── stack_queue/
│   ├── tree/
│   ├── dp/
│   └── binary_search/
├── notes/                  # 知识点笔记、复杂度总结、错题
└── templates/              # 自己整理的算法模板（DFS/BFS/二分等）
```

### .gitignore 推荐内容

```gitignore
# VSCode
.vscode/

# 编译产物
*.exe
*.out
*.o
*.obj
a.out

# 系统
.DS_Store
Thumbs.db
```

---

## 十、Git 工作流（每天刷完题就提交）

### 第一次配置

```bash
git config --global user.name "your-name"
git config --global user.email "your-email@example.com"
```

### 日常流程

```bash
git add .
git commit -m "solve: leetcode 9 回文数"
git push
```

### 推荐的 Commit Message 规范

| 类型 | 用途 | 示例 |
|------|------|------|
| `solve:` | 新解题 | `solve: leetcode 1 两数之和` |
| `fix:` | 修复旧题 | `fix: leetcode 9 修复溢出问题` |
| `note:` | 添加笔记 | `note: 二分查找模板整理` |
| `docs:` | 修改文档 | `docs: 更新 README` |

---

## 十一、常用 VSCode 快捷键

| 快捷键 | 作用 |
|--------|------|
| `Ctrl + ~` | 打开/关闭终端 |
| `Ctrl + Alt + N` | 运行当前文件（Code Runner） |
| `Ctrl + S` | 保存 |
| `Ctrl + /` | 注释当前行 |
| `Alt + ↑ / ↓` | 上下移动整行 |
| `Shift + Alt + ↓` | 向下复制当前行 |
| `Ctrl + D` | 选中下一个相同的词 |
| `Ctrl + Shift + K` | 删除当前行 |
| `Ctrl + P` | 快速查找文件 |
| `Ctrl + Shift + P` | 命令面板（万能） |
| `F12` | 跳转到定义 |
| `Alt + ←` | 回到上一个位置 |

---

## 十二、完整刷题工作流

1. 打开 VSCode → 左侧 LeetCode 图标
2. 选题 → 右键 **Show Problem**
3. 输入 `lc` → Tab 生成模板，写题目大意 + 思路
4. 写代码（`// @lc code=start` 和 `// @lc code=end` 之间）
5. 本地跑：`Ctrl + Alt + N` 或 `LeetCode: Test`
6. 提交：`LeetCode: Submit`
7. 通过后补全 "易错点 / 收获"
8. 提交到 GitHub：

   ```bash
   git add .
   git commit -m "solve: leetcode 题号 题名"
   git push
   ```

---

## 十三、写在最后

很多人刷题没坚持下来，根本原因不是不会做题，而是：

- 环境太麻烦，每次写题前先折腾半天
- 没有记录，做完就忘
- 没有产出，看不到自己的进步

而这一套环境帮你解决了三件事：

- **写题流畅**：一键运行、一键提交
- **沉淀记录**：每道题都有思路、复杂度、易错点
- **持续可见**：GitHub 上的每日提交就是你最好的简历

> 配置只是开始，**每天能写下去**才是真正的关键。

祝你我刷题愉快，早日上岸 