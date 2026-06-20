---
title: Python学习笔记
date: 2026-06-20 18:53:38
tags:
  - Python
cover: img/articles/Python学习笔记.mp4
---
# Python 学习笔记

---

## 一、Python 简介

### 1.1 什么是 Python？

Python 是一种**高级、通用、解释型**的编程语言，由 Guido van Rossum 于 1991 年创建。它以简洁、易读的语法著称，是目前全球最流行的编程语言之一。

### 1.2 Python 的特点

- **语法简洁**：接近自然语言，代码可读性极高
- **跨平台**：支持 Windows、macOS、Linux 等操作系统
- **解释型语言**：无需编译，逐行解释执行
- **动态类型**：变量类型在运行时确定，无需显式声明
- **丰富的生态**：拥有庞大的标准库和第三方库

### 1.3 主要应用领域

| 领域 | 代表框架/库 |
| :--- | :--- |
| Web 开发 | Django、Flask、FastAPI |
| 数据科学 | NumPy、Pandas、Matplotlib |
| 机器学习 | TensorFlow、PyTorch、scikit-learn |
| 自动化脚本 | os、shutil、subprocess |
| 网络爬虫 | Requests、BeautifulSoup、Scrapy |
| 嵌入式系统 | MicroPython |

### 1.4 Python 2 与 Python 3

Python 2 已于 2020 年正式停止维护，当前所有新项目均应使用 **Python 3**。两者在语法上存在不兼容之处，本笔记所有内容均基于 **Python 3.10+**。

---

## 二、环境配置

### 2.1 安装 Python

**Windows**

1. 访问 [https://www.python.org/downloads/](https://www.python.org/downloads/) 下载安装包
2. 安装时勾选 **Add Python to PATH**（必须勾选，否则命令行无法识别 python 命令）
3. 验证安装：

```bash
python --version
```

**macOS**

```bash
# 使用 Homebrew 安装（推荐）
brew install python3

# 验证安装
python3 --version
```

**Linux（Ubuntu/Debian）**

```bash
sudo apt update
sudo apt install python3 python3-pip
```

### 2.2 虚拟环境

虚拟环境是 Python 项目的隔离空间，用于避免不同项目之间的依赖冲突。**每个项目都应该使用独立的虚拟环境。**

```bash
# 创建虚拟环境
python -m venv myenv

# 激活虚拟环境
# Windows
myenv\Scripts\activate

# macOS / Linux
source myenv/bin/activate

# 退出虚拟环境
deactivate
```

激活后，命令行提示符前会出现 `(myenv)` 字样，表示当前处于虚拟环境中。此时安装的所有包只作用于该环境，不影响系统全局。

### 2.3 包管理（pip）

```bash
# 安装包
pip install requests

# 安装指定版本
pip install requests==2.28.0

# 升级包
pip install --upgrade requests

# 卸载包
pip uninstall requests

# 查看已安装的所有包
pip list

# 导出当前环境的依赖列表
pip freeze > requirements.txt

# 根据依赖列表安装（用于复现他人环境）
pip install -r requirements.txt
```

> `requirements.txt` 是协作开发中共享依赖信息的标准方式，提交项目时应一并上传。

---

## 三、基础语法

### 3.1 注释

```python
# 这是单行注释

"""
这是多行注释（文档字符串）
通常用于函数、类、模块的说明文档
"""

'''
也可以用单引号的三引号
'''
```

### 3.2 代码结构规范

Python 使用**缩进**来表示代码块，而不是花括号。缩进不正确会直接导致程序报错。

```python
# 正确：使用4个空格缩进（PEP8 标准）
if True:
    print("正确")

# 错误：缩进不一致
if True:
    print("这行是4空格")
      print("这行是6空格")  # IndentationError
```

### 3.3 导入模块

```python
# 导入整个模块
import os
import math

# 导入模块中的指定内容
from datetime import datetime
from os.path import join, exists

# 导入并重命名（常用于名称较长的库）
import numpy as np
import pandas as pd

# 主程序入口（重要）
if __name__ == '__main__':
    main()
```

> `if __name__ == '__main__'` 的作用：当该文件被直接运行时执行其中的代码，当被其他文件导入时不执行。这是 Python 模块化开发的基本规范。

### 3.4 变量与命名规范

```python
# 变量赋值（无需声明类型）
name = "张三"
age = 18
score = 95.5
is_student = True

# 多重赋值
x = y = z = 0

# 解包赋值
a, b, c = 1, 2, 3

# 命名规范（遵循 PEP8）
user_name = "张三"       # 变量、函数：小写字母 + 下划线（snake_case）
MAX_SIZE = 100           # 常量：全大写 + 下划线
class UserInfo:          # 类名：大驼峰（CamelCase）
    pass
```

### 3.5 基本输入输出

```python
# 输出
print("Hello, World!")
print("姓名:", "张三", "年龄:", 18)    # 多个值用空格分隔
print("第一行", end="")               # end 参数控制结尾字符，默认为换行
print("同一行")

# f-string 格式化输出（Python 3.6+，推荐）
name = "张三"
age = 18
print(f"我叫 {name}，今年 {age} 岁")
print(f"π 保留两位小数：{3.14159:.2f}")
print(f"数字补零：{age:05d}")          # 00018

# 输入（返回值始终是字符串）
name = input("请输入你的名字：")
age = int(input("请输入你的年龄："))   # 需要手动转换类型
```

---

## 四、数据类型

### 4.1 基本数据类型概览

Python 共有以下基本数据类型：

| 类型 | 关键字 | 示例 | 是否可变 |
| :--- | :--- | :--- | :---: |
| 整数 | `int` | `42`、`-10` | 否 |
| 浮点数 | `float` | `3.14`、`-2.5` | 否 |
| 复数 | `complex` | `3+4j` | 否 |
| 布尔值 | `bool` | `True`、`False` | 否 |
| 字符串 | `str` | `"hello"` | 否 |
| 空值 | `NoneType` | `None` | 否 |

### 4.2 整数（int）

```python
x = 10
y = -5
large_num = 1_000_000      # 下划线分隔，增强可读性，等同于 1000000

# 不同进制的整数字面量
binary = 0b1010             # 二进制，值为 10
octal = 0o12                # 八进制，值为 10
hexadecimal = 0xFF          # 十六进制，值为 255

# Python 的整数精度没有上限
big = 10 ** 100             # 可以表示任意大的整数
```

### 4.3 浮点数（float）

```python
a = 3.14
b = -2.5
c = 2.0
scientific = 1.23e-4        # 科学计数法，等同于 0.000123

# 浮点数精度问题（重要）
print(0.1 + 0.2)            # 0.30000000000000004，不是 0.3
print(0.1 + 0.2 == 0.3)    # False

# 解决方案：使用 round() 或 decimal 模块
print(round(0.1 + 0.2, 1) == 0.3)  # True

from decimal import Decimal
print(Decimal("0.1") + Decimal("0.2"))  # 0.3，精确计算
```

> 浮点数精度问题是所有编程语言的通病，根源在于计算机用二进制表示小数时存在精度损失。涉及金融计算时应使用 `decimal` 模块。

### 4.4 布尔值（bool）

```python
is_valid = True
is_empty = False

# bool 是 int 的子类，True 等同于 1，False 等同于 0
print(True + True)    # 2
print(True * 5)       # 5

# 假值（以下所有值在布尔上下文中视为 False）
bool(False)           # False
bool(0)               # False
bool(0.0)             # False
bool(None)            # False
bool("")              # False（空字符串）
bool([])              # False（空列表）
bool({})              # False（空字典）
bool(())              # False（空元组）
bool(set())           # False（空集合）

# 其余所有值都为 True
bool(1)               # True
bool(-1)              # True
bool("0")             # True（非空字符串）
bool([0])             # True（非空列表）
```

### 4.5 空值（None）

```python
result = None         # 表示"没有值"或"空"

# 常见用途：
# 1. 函数无返回值时默认返回 None
def do_something():
    print("执行")
print(do_something())  # None

# 2. 作为变量的初始值
data = None
if some_condition:
    data = fetch_data()

# 判断是否为 None，必须用 is，不能用 ==
if result is None:
    print("没有结果")
if result is not None:
    print("有结果")
```

### 4.6 类型检查与转换

```python
# type()：返回变量的类型
print(type(42))         # <class 'int'>
print(type(3.14))       # <class 'float'>
print(type("hello"))    # <class 'str'>
print(type(True))       # <class 'bool'>
print(type(None))       # <class 'NoneType'>

# isinstance()：检查是否是某个类型（推荐，支持继承）
print(isinstance(42, int))           # True
print(isinstance(True, int))         # True（bool 是 int 的子类）
print(isinstance(3.14, (int, float))) # True（检查多个类型）

# 类型转换
int("123")          # 123
int(3.9)            # 3（直接截断，不是四舍五入）
float("3.14")       # 3.14
str(100)            # "100"
bool(0)             # False
list("abc")         # ['a', 'b', 'c']
tuple([1, 2, 3])    # (1, 2, 3)

# 注意：无法转换的情况会报 ValueError
int("abc")          # ValueError: invalid literal for int()
```

### 4.7 可变与不可变类型

这是 Python 中一个非常重要的概念，直接影响函数传参、赋值等行为。

```python
# 不可变类型：int、float、bool、str、tuple
# 对不可变类型的"修改"实际上是创建了新对象
x = 10
print(id(x))    # 假设地址为 140000
x = 20
print(id(x))    # 地址改变了，x 指向了新对象

s = "hello"
# s[0] = "H"   # TypeError，字符串不可原地修改
s = "Hello"     # 实际上是创建了新字符串

# 可变类型：list、dict、set
# 对可变类型的修改在原地进行，对象地址不变
lst = [1, 2, 3]
print(id(lst))  # 假设地址为 200000
lst.append(4)
print(id(lst))  # 地址不变，但内容变了

# 函数传参的影响
def modify(data):
    data.append(99)    # 修改的是原列表

my_list = [1, 2, 3]
modify(my_list)
print(my_list)         # [1, 2, 3, 99]，原列表被修改

def modify_int(num):
    num = 100          # 只是让局部变量 num 指向新对象

my_num = 10
modify_int(my_num)
print(my_num)          # 10，原值不变
```

---

## 五、字符串

### 5.1 字符串创建

```python
s1 = '单引号'
s2 = "双引号"
s3 = """多行
字符串"""

# 原始字符串：反斜杠不转义，常用于正则表达式和文件路径
path = r"C:\Users\Name\Documents"
pattern = r"\d+\.\d+"

# 字节字符串
b = b"hello"          # bytes 类型，用于处理二进制数据
```

### 5.2 字符串索引与切片

```python
text = "Hello, Python!"

# 索引（从 0 开始，支持负索引）
print(text[0])        # 'H'
print(text[-1])       # '!'
print(text[7])        # 'P'

# 切片 [start:end:step]
# start 包含，end 不包含
print(text[0:5])      # 'Hello'
print(text[7:])       # 'Python!'
print(text[:5])       # 'Hello'
print(text[::2])      # 'Hlo yhn'（每隔一个取一个）
print(text[::-1])     # '!nohtyP ,olleH'（反转字符串）
```

### 5.3 字符串常用方法

```python
s = "  Hello, World!  "

# 大小写
s.upper()             # "  HELLO, WORLD!  "
s.lower()             # "  hello, world!  "
s.title()             # "  Hello, World!  "（每个单词首字母大写）
s.swapcase()          # "  hELLO, wORLD!  "

# 去除空白
s.strip()             # "Hello, World!"（去除两侧）
s.lstrip()            # "Hello, World!  "（去除左侧）
s.rstrip()            # "  Hello, World!"（去除右侧）

# 查找
s.find("World")       # 返回第一次出现的索引，找不到返回 -1
s.rfind("o")          # 从右往左找，返回索引
s.index("World")      # 与 find 类似，但找不到时抛出 ValueError
s.count("l")          # 统计出现次数

# 判断
"123".isdigit()       # True，是否全为数字
"abc".isalpha()       # True，是否全为字母
"abc123".isalnum()    # True，是否全为字母或数字
"   ".isspace()       # True，是否全为空白
"hello".islower()     # True
"HELLO".isupper()     # True
"Hello".startswith("He")   # True
"Hello".endswith("lo")     # True

# 替换
s.replace("World", "Python")   # 替换所有匹配的子字符串

# 分割与连接
"a,b,c".split(",")    # ['a', 'b', 'c']
"a  b  c".split()     # ['a', 'b', 'c']（无参数时按空白分割）
"-".join(["a", "b", "c"])  # "a-b-c"

# 填充
"5".zfill(4)          # "0005"，用0补全左侧
"hi".center(10, "*")  # "****hi****"
"hi".ljust(10, "-")   # "hi--------"
"hi".rjust(10, "-")   # "--------hi"
```

### 5.4 字符串格式化

```python
name = "张三"
age = 18
score = 95.678

# f-string（Python 3.6+，推荐）
print(f"我叫{name}，今年{age}岁")
print(f"成绩：{score:.2f}")           # 保留两位小数：95.68
print(f"年龄补零：{age:05d}")         # 00018
print(f"左对齐：{name:<10}")          # "张三        "
print(f"右对齐：{name:>10}")          # "        张三"
print(f"居中：{name:^10}")            # "    张三    "
print(f"表达式：{age * 2}")           # 支持任意表达式

# format() 方法
print("{}今年{}岁".format(name, age))
print("{name}今年{age}岁".format(name="李四", age=20))

# % 格式化（旧式，了解即可）
print("%s今年%d岁" % (name, age))
```

### 5.5 转义字符

```python
print("换行：第一行\n第二行")
print("制表符：姓名\t年龄")
print("反斜杠：C:\\Users\\Name")
print("单引号：I\'m fine")
print("双引号：He said \"Hello\"")

# Unicode 转义
print("\u4e2d\u6587")    # 中文
print("\n".join(["a", "b", "c"]))  # 用换行符连接
```

---

## 六、数字与数学运算

### 6.1 算术运算符

```python
a, b = 10, 3

print(a + b)    # 13，加法
print(a - b)    # 7，减法
print(a * b)    # 30，乘法
print(a / b)    # 3.3333...，真除法（结果始终是浮点数）
print(a // b)   # 3，整除（向下取整）
print(a % b)    # 1，取余
print(a ** b)   # 1000，幂运算

# 注意整除的行为
print(7 // 2)   # 3
print(-7 // 2)  # -4（向下取整，不是向零取整）
print(7 % -2)   # -1（结果的符号与除数相同）

# divmod：同时返回商和余数
print(divmod(10, 3))   # (3, 1)
```

### 6.2 赋值运算符

```python
x = 10
x += 5     # x = 15
x -= 3     # x = 12
x *= 2     # x = 24
x /= 4     # x = 6.0
x //= 2    # x = 3.0
x %= 2     # x = 1.0
x **= 3    # x = 1.0
```

### 6.3 比较与逻辑运算符

```python
# 比较运算符（返回布尔值）
print(5 == 5)    # True
print(5 != 3)    # True
print(5 > 3)     # True
print(5 >= 5)    # True

# Python 支持链式比较
x = 5
print(0 < x < 10)     # True，等同于 0 < x and x < 10
print(1 < 2 < 3 < 4)  # True

# 身份比较（比较的是内存地址，不是值）
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)    # True（值相等）
print(a is b)    # False（不是同一个对象）
print(a is c)    # True（同一个对象）

# None 的判断必须用 is
result = None
print(result is None)       # True（正确）
print(result == None)       # True（不推荐，可能被重载）

# 逻辑运算符
print(True and False)   # False
print(True or False)    # True
print(not True)         # False

# 短路求值：and 遇到假值停止，or 遇到真值停止
print(0 and 1/0)        # 0，不会执行 1/0
print(1 or 1/0)         # 1，不会执行 1/0

# 利用 or 设置默认值
name = "" or "匿名用户"  # "匿名用户"
```

### 6.4 math 模块

```python
import math

# 常量
print(math.pi)          # 3.141592653589793
print(math.e)           # 2.718281828459045
print(math.inf)         # 正无穷大
print(math.nan)         # NaN

# 常用函数
print(abs(-5))          # 5，绝对值（内置函数）
print(round(3.14159, 2)) # 3.14，四舍五入
print(math.sqrt(16))    # 4.0，平方根
print(math.ceil(3.2))   # 4，向上取整
print(math.floor(3.8))  # 3，向下取整
print(math.trunc(-3.8)) # -3，向零取整

# round() 的银行家舍入
print(round(0.5))       # 0（四舍六入五成双）
print(round(1.5))       # 2
print(round(2.5))       # 2

# 幂与对数
print(math.pow(2, 10))  # 1024.0
print(math.log(math.e)) # 1.0，自然对数
print(math.log10(100))  # 2.0，以10为底
print(math.log2(8))     # 3.0，以2为底

# 最大值最小值（内置函数）
print(max(1, 5, 3))     # 5
print(min(1, 5, 3))     # 1
print(sum([1, 2, 3, 4])) # 10
```

### 6.5 进制转换

```python
# 十进制转其他进制（返回字符串）
print(bin(10))          # '0b1010'
print(oct(10))          # '0o12'
print(hex(255))         # '0xff'

# 去掉前缀
print(bin(10)[2:])      # '1010'
print(format(10, 'b'))  # '1010'
print(format(255, 'x')) # 'ff'
print(format(255, 'X')) # 'FF'
print(format(255, '08b')) # '11111111'（8位，不足补零）

# 其他进制转十进制
print(int("1010", 2))   # 10
print(int("ff", 16))    # 255
print(int("12", 8))     # 10
```

---

## 七、流程控制

### 7.1 条件语句

```python
score = 85

# 基本 if...elif...else
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(grade)   # B

# 条件表达式（三元运算符）
age = 20
status = "成年" if age >= 18 else "未成年"

# 嵌套条件
age = 25
has_license = True

if age >= 18:
    if has_license:
        print("可以开车")
    else:
        print("需要先考驾照")
else:
    print("年龄不够")

# match 语句（Python 3.10+，类似 switch）
command = "quit"
match command:
    case "start":
        print("启动")
    case "stop":
        print("停止")
    case "quit" | "exit":  # 多个值用 | 分隔
        print("退出")
    case _:                # 默认分支
        print("未知命令")
```

### 7.2 for 循环

```python
# 遍历列表
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# 遍历字符串
for char in "Python":
    print(char, end=" ")   # P y t h o n

# range() 函数
for i in range(5):          # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 8):       # 2, 3, 4, 5, 6, 7
    print(i)

for i in range(0, 10, 2):   # 0, 2, 4, 6, 8
    print(i)

for i in range(10, 0, -1):  # 10, 9, ..., 1
    print(i)

# enumerate()：同时获取索引和值
for index, value in enumerate(fruits):
    print(f"第{index}个：{value}")

# enumerate 可以指定起始索引
for index, value in enumerate(fruits, start=1):
    print(f"第{index}个：{value}")   # 从1开始

# zip()：并行遍历多个序列
names = ["张三", "李四", "王五"]
scores = [90, 85, 78]
for name, score in zip(names, scores):
    print(f"{name}：{score}分")

# 遍历字典
person = {"name": "张三", "age": 18, "city": "北京"}
for key in person:              # 遍历键
    print(key)
for value in person.values():   # 遍历值
    print(value)
for key, value in person.items():  # 遍历键值对
    print(f"{key}: {value}")

# for...else：循环正常结束时执行 else（没有被 break 打断）
for i in range(5):
    print(i)
else:
    print("循环正常结束")

# 查找质数（for...else 的经典用法）
for num in range(2, 20):
    for i in range(2, int(num**0.5) + 1):
        if num % i == 0:
            break
    else:
        print(f"{num} 是质数")
```

### 7.3 while 循环

```python
# 基本 while 循环
count = 0
while count < 5:
    print(count)
    count += 1

# while True + break：用于需要至少执行一次的场景
while True:
    user_input = input("输入 q 退出：")
    if user_input == 'q':
        break
    print(f"你输入了：{user_input}")

# while...else：与 for...else 相同，未被 break 打断时执行 else
count = 0
while count < 5:
    count += 1
else:
    print("while 循环结束")
```

### 7.4 循环控制语句

```python
# break：立即终止整个循环
for i in range(10):
    if i == 5:
        break
    print(i)   # 输出 0 1 2 3 4

# continue：跳过本次迭代，继续下一次
for i in range(5):
    if i == 2:
        continue
    print(i)   # 输出 0 1 3 4

# pass：占位符，语法上需要语句但逻辑上不需要时使用
for i in range(5):
    if i == 2:
        pass    # 暂时什么都不做
    else:
        print(i)

# 嵌套循环中跳出外层（Python 没有 goto，可以用标志变量或函数代替）
found = False
for i in range(5):
    for j in range(5):
        if i == 2 and j == 3:
            found = True
            break
    if found:
        break
print(f"找到了 i={i}, j={j}")
```

### 7.5 推导式

推导式是 Python 中非常重要的语法特性，可以用简洁的方式创建列表、字典、集合。

```python
# 列表推导式
# 基本格式：[表达式 for 变量 in 可迭代对象 if 条件]
squares = [x**2 for x in range(10)]
print(squares)   # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 带条件过滤
even_squares = [x**2 for x in range(10) if x % 2 == 0]
print(even_squares)   # [0, 4, 16, 36, 64]

# 嵌套推导式（展平二维列表）
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [num for row in matrix for num in row]
print(flat)   # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# 字典推导式
squares_dict = {x: x**2 for x in range(5)}
print(squares_dict)   # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# 反转键值对
original = {"a": 1, "b": 2, "c": 3}
reversed_dict = {v: k for k, v in original.items()}
print(reversed_dict)  # {1: "a", 2: "b", 3: "c"}

# 集合推导式
unique_chars = {char.lower() for char in "Hello World" if char != " "}
print(unique_chars)   # {'h', 'e', 'l', 'o', 'w', 'r', 'd'}

# 生成器表达式（不立即生成列表，节省内存）
# 处理大量数据时使用
gen = (x**2 for x in range(1000000))
print(next(gen))      # 0，按需生成，不占用大量内存
print(sum(x**2 for x in range(100)))  # 直接在函数中使用
```

---

## 八、函数

### 8.1 函数定义与调用

```python
# 基本函数定义
def greet():
    """函数的文档字符串，描述函数的作用"""
    print("Hello, World!")

greet()   # 调用函数

# 带参数的函数
def greet_person(name):
    print(f"Hello, {name}!")

greet_person("张三")

# 带返回值的函数
def add(a, b):
    return a + b

result = add(3, 5)
print(result)   # 8

# 返回多个值（实际上返回的是元组）
def get_min_max(numbers):
    return min(numbers), max(numbers)

minimum, maximum = get_min_max([3, 1, 4, 1, 5, 9])
print(f"最小值：{minimum}，最大值：{maximum}")

# 没有 return 语句的函数默认返回 None
def no_return():
    print("执行了")

print(no_return())   # None
```

### 8.2 函数参数

```python
# 位置参数：按顺序传入
def power(base, exponent):
    return base ** exponent

print(power(2, 3))    # 8

# 关键字参数：通过参数名传入，顺序可以不同
print(power(exponent=3, base=2))   # 8

# 默认参数：调用时可以不传该参数
def greet(name, greeting="你好"):
    print(f"{greeting}，{name}！")

greet("张三")              # 你好，张三！
greet("李四", "早上好")    # 早上好，李四！

# 注意：默认参数不能使用可变对象（常见陷阱）
# 错误写法
def append_to(element, to=[]):
    to.append(element)
    return to

print(append_to(1))   # [1]
print(append_to(2))   # [1, 2]，不是 [2]，因为默认列表只创建一次

# 正确写法
def append_to(element, to=None):
    if to is None:
        to = []
    to.append(element)
    return to

# 可变位置参数（*args）：收集多余的位置参数为元组
def sum_all(*args):
    print(type(args))   # <class 'tuple'>
    return sum(args)

print(sum_all(1, 2, 3))         # 6
print(sum_all(1, 2, 3, 4, 5))   # 15

# 可变关键字参数（**kwargs）：收集多余的关键字参数为字典
def print_info(**kwargs):
    print(type(kwargs))   # <class 'dict'>
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="张三", age=18, city="北京")

# 参数顺序规则：位置参数 -> *args -> 默认参数 -> **kwargs
def complex_function(a, b, *args, option=True, **kwargs):
    print(f"a={a}, b={b}")
    print(f"args={args}")
    print(f"option={option}")
    print(f"kwargs={kwargs}")

complex_function(1, 2, 3, 4, option=False, x=10, y=20)
# a=1, b=2
# args=(3, 4)
# option=False
# kwargs={'x': 10, 'y': 20}

# 强制关键字参数（* 后面的参数只能以关键字方式传入）
def create_user(name, *, age, city):
    return {"name": name, "age": age, "city": city}

create_user("张三", age=18, city="北京")   # 正确
# create_user("张三", 18, "北京")          # TypeError
```

### 8.3 作用域

```python
# LEGB 规则：Python 查找变量的顺序
# Local（局部）-> Enclosing（外层函数）-> Global（全局）-> Built-in（内置）

x = "全局变量"

def outer():
    x = "外层变量"

    def inner():
        x = "局部变量"
        print(x)   # 局部变量

    inner()
    print(x)   # 外层变量

outer()
print(x)   # 全局变量

# global 关键字：在函数内修改全局变量
count = 0

def increment():
    global count
    count += 1

increment()
increment()
print(count)   # 2

# nonlocal 关键字：在内层函数中修改外层函数的变量
def make_counter():
    count = 0

    def increment():
        nonlocal count
        count += 1
        return count

    return increment

counter = make_counter()
print(counter())   # 1
print(counter())   # 2
print(counter())   # 3
```

### 8.4 闭包

闭包是指内层函数记住了其定义时所在的外层作用域的变量，即使外层函数已经执行完毕。

```python
def make_multiplier(factor):
    # factor 是外层函数的局部变量
    def multiplier(x):
        return x * factor   # 内层函数记住了 factor
    return multiplier

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))   # 10
print(triple(5))   # 15

# double 和 triple 是两个不同的闭包，各自记住了不同的 factor

# 闭包的实际用途：数据封装
def make_counter(start=0):
    count = start

    def increment(step=1):
        nonlocal count
        count += step
        return count

    def reset():
        nonlocal count
        count = start

    def get():
        return count

    return increment, reset, get

inc, reset, get = make_counter(10)
print(inc())      # 11
print(inc(5))     # 16
print(get())      # 16
reset()
print(get())      # 10

# 常见陷阱：循环中的闭包
# 错误示例
funcs = []
for i in range(3):
    funcs.append(lambda: i)

print([f() for f in funcs])   # [2, 2, 2]，所有函数共享同一个 i

# 正确写法：用默认参数捕获当前值
funcs = []
for i in range(3):
    funcs.append(lambda x=i: x)

print([f() for f in funcs])   # [0, 1, 2]
```

### 8.5 装饰器

装饰器本质上是一个接受函数作为参数、返回新函数的高阶函数，用于在不修改原函数的前提下扩展其功能。

```python
# 基本装饰器
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"{func.__name__} 耗时：{elapsed:.4f}秒")
        return result
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(1)

slow_function()   # slow_function 耗时：1.0001秒

# 等同于：
# slow_function = timer(slow_function)

# 保留原函数信息（使用 functools.wraps）
import functools

def timer(func):
    @functools.wraps(func)   # 保留 func 的 __name__、__doc__ 等属性
    def wrapper(*args, **kwargs):
        import time
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"{func.__name__} 耗时：{elapsed:.4f}秒")
        return result
    return wrapper

# 带参数的装饰器
def repeat(n):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say_hello():
    print("Hello!")

say_hello()   # 打印3次 Hello!

# 多个装饰器叠加（从下往上应用）
@timer
@repeat(3)
def greet(name):
    print(f"Hello, {name}!")

# 等同于：greet = timer(repeat(3)(greet))

# 类装饰器
class Singleton:
    """单例模式装饰器"""
    def __init__(self, cls):
        self._cls = cls
        self._instance = None

    def __call__(self, *args, **kwargs):
        if self._instance is None:
            self._instance = self._cls(*args, **kwargs)
        return self._instance

@Singleton
class DatabaseConnection:
    def __init__(self):
        print("创建数据库连接")

db1 = DatabaseConnection()   # 创建数据库连接
db2 = DatabaseConnection()   # 不再打印
print(db1 is db2)            # True
```

### 8.6 Lambda 函数

```python
# lambda 函数：匿名函数，适合简单的单行逻辑
square = lambda x: x ** 2
print(square(5))   # 25

add = lambda a, b: a + b
print(add(3, 4))   # 7

# 常用于排序的 key 参数
students = [
    {"name": "张三", "score": 85},
    {"name": "李四", "score": 92},
    {"name": "王五", "score": 78},
]

# 按成绩升序
sorted_students = sorted(students, key=lambda s: s["score"])

# 按成绩降序
sorted_students = sorted(students, key=lambda s: s["score"], reverse=True)

# 多键排序（先按成绩降序，成绩相同按名字升序）
sorted_students = sorted(students, key=lambda s: (-s["score"], s["name"]))

# 配合 map()、filter()
numbers = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x * 2, numbers))        # [2, 4, 6, 8, 10]
evens = list(filter(lambda x: x % 2 == 0, numbers))  # [2, 4]
```

### 8.7 生成器

生成器是一种特殊的迭代器，使用 `yield` 关键字逐个产出值，不会一次性将所有数据加载到内存中。

```python
# 生成器函数
def count_up_to(n):
    count = 1
    while count <= n:
        yield count    # 暂停并产出值，下次调用从这里继续
        count += 1

gen = count_up_to(5)
print(next(gen))   # 1
print(next(gen))   # 2
print(next(gen))   # 3

for num in count_up_to(5):
    print(num)     # 1 2 3 4 5

# 生成器 vs 列表
# 列表：一次性生成所有数据，占用大量内存
all_squares = [x**2 for x in range(1000000)]   # 占用约 8MB 内存

# 生成器：按需产出，几乎不占内存
gen_squares = (x**2 for x in range(1000000))   # 几乎不占内存
print(next(gen_squares))   # 0

# 实际应用：逐行读取大文件
def read_large_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        for line in f:
            yield line.strip()

for line in read_large_file("large_file.txt"):
    process(line)   # 每次只处理一行，内存占用极低

# yield from：委托给另一个可迭代对象
def chain(*iterables):
    for iterable in iterables:
        yield from iterable

for item in chain([1, 2], [3, 4], [5, 6]):
    print(item)   # 1 2 3 4 5 6
```

---

## 九、数据结构

### 9.1 列表（List）

```python
# 创建列表
empty = []
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True, None]
nested = [[1, 2], [3, 4], [5, 6]]

# 通过函数创建
list_from_range = list(range(5))     # [0, 1, 2, 3, 4]
list_from_str = list("hello")        # ['h', 'e', 'l', 'l', 'o']

# 索引与切片
lst = [10, 20, 30, 40, 50]
print(lst[0])        # 10
print(lst[-1])       # 50
print(lst[1:4])      # [20, 30, 40]
print(lst[::-1])     # [50, 40, 30, 20, 10]

# 增删改
lst.append(60)                    # 末尾添加：[10,20,30,40,50,60]
lst.insert(2, 25)                 # 索引2处插入：[10,20,25,30,40,50,60]
lst.extend([70, 80])              # 末尾添加多个元素
lst.remove(25)                    # 删除第一个值为25的元素
popped = lst.pop()                # 删除并返回最后一个元素
popped2 = lst.pop(0)              # 删除并返回索引0的元素
del lst[1:3]                      # 删除切片范围内的元素
lst[0] = 99                       # 修改元素
lst[1:3] = [100, 200]             # 修改切片

# 查找
lst = [3, 1, 4, 1, 5, 9, 2, 6]
print(lst.index(4))               # 2，返回第一个匹配的索引
print(lst.count(1))               # 2，统计出现次数
print(1 in lst)                   # True，是否包含

# 排序
lst.sort()                        # 原地升序排序
lst.sort(reverse=True)            # 原地降序排序
lst.sort(key=lambda x: abs(x))   # 按绝对值排序

new_lst = sorted(lst)             # 返回新列表，不修改原列表
lst.reverse()                     # 原地反转

# 其他
lst.clear()                       # 清空列表
copy = lst.copy()                 # 浅拷贝

# 深拷贝（嵌套列表时使用）
import copy
deep = copy.deepcopy(nested)
```

### 9.2 元组（Tuple）

元组与列表的最大区别是**不可变**，一旦创建就不能修改。

```python
# 创建元组
empty = ()
single = (1,)                # 单元素元组，逗号必须有
numbers = (1, 2, 3, 4, 5)
mixed = (1, "hello", 3.14)

# 不加括号也是元组
t = 1, 2, 3
print(type(t))   # <class 'tuple'>

# 元组不可修改
# numbers[0] = 10   # TypeError

# 元组解包
point = (10, 20)
x, y = point
print(x, y)   # 10 20

# 扩展解包
first, *middle, last = (1, 2, 3, 4, 5)
print(first)    # 1
print(middle)   # [2, 3, 4]
print(last)     # 5

# 交换变量
a, b = 1, 2
a, b = b, a    # 利用元组解包
print(a, b)    # 2 1

# 元组的用途
# 1. 函数返回多个值
def get_info():
    return "张三", 18, "北京"

name, age, city = get_info()

# 2. 作为字典的键（列表不能作为键，因为列表不可哈希）
d = {(0, 0): "原点", (1, 0): "x轴上的点"}

# 3. 保护数据不被修改
WEEKDAYS = ("周一", "周二", "周三", "周四", "周五", "周六", "周日")
```

### 9.3 字典（Dictionary）

```python
# 创建字典
empty = {}
person = {"name": "张三", "age": 18, "city": "北京"}
d = dict(name="李四", age=20)

# 访问
print(person["name"])               # "张三"，键不存在时抛出 KeyError
print(person.get("name"))           # "张三"
print(person.get("phone"))          # None，键不存在返回 None
print(person.get("phone", "未知"))  # "未知"，键不存在返回默认值

# 增删改
person["email"] = "test@test.com"   # 添加新键值对
person["age"] = 19                  # 修改值
person.update({"city": "上海", "job": "工程师"})  # 批量更新
del person["email"]                 # 删除键值对
value = person.pop("city")          # 删除并返回值，键不存在时抛出 KeyError
value = person.pop("xx", None)      # 键不存在时返回默认值
key, val = person.popitem()         # 删除并返回最后插入的键值对

# 遍历
for key in person:                  # 遍历键
    print(key)
for value in person.values():       # 遍历值
    print(value)
for key, value in person.items():   # 遍历键值对（最常用）
    print(f"{key}: {value}")

# 常用操作
print("name" in person)             # True，检查键是否存在
print("张三" in person.values())    # True，检查值是否存在
print(len(person))                  # 键值对数量
keys = list(person.keys())          # 转为列表

# setdefault：键不存在时设置默认值并返回，存在时直接返回
person.setdefault("score", 0)

# 合并字典
d1 = {"a": 1, "b": 2}
d2 = {"b": 3, "c": 4}

merged = {**d1, **d2}              # {"a":1, "b":3, "c":4}，d2 覆盖 d1
merged = d1 | d2                   # Python 3.9+，同上

# 字典推导式
squares = {x: x**2 for x in range(5)}
filtered = {k: v for k, v in person.items() if v is not None}
```

### 9.4 集合（Set）

```python
# 创建集合（集合中所有元素唯一）
empty = set()                         # 空集合，不能用 {}（那是空字典）
s = {1, 2, 3, 4, 5}
s_from_list = set([1, 2, 2, 3, 3])  # {1, 2, 3}，自动去重

# 增删
s.add(6)                # 添加元素
s.remove(1)             # 删除元素，不存在时抛出 KeyError
s.discard(100)          # 删除元素，不存在时不报错（推荐）
s.pop()                 # 随机删除并返回一个元素
s.clear()               # 清空

# 集合运算
A = {1, 2, 3, 4, 5}
B = {4, 5, 6, 7, 8}

A | B                   # 并集：{1,2,3,4,5,6,7,8}
A.union(B)              # 同上

A & B                   # 交集：{4,5}
A.intersection(B)       # 同上

A - B                   # 差集（A中有，B中没有）：{1,2,3}
A.difference(B)         # 同上

A ^ B                   # 对称差（只在一个集合中出现的元素）：{1,2,3,6,7,8}
A.symmetric_difference(B)  # 同上

# 子集与超集
{1, 2}.issubset({1, 2, 3})     # True，{1,2} 是 {1,2,3} 的子集
{1, 2, 3}.issuperset({1, 2})   # True
{1, 2}.isdisjoint({3, 4})      # True，两个集合没有交集

# 最常用场景：列表去重
lst = [1, 2, 3, 2, 1, 3, 4]
unique = list(set(lst))   # [1, 2, 3, 4]（顺序不保证）

# 检查元素是否存在（比列表快得多，O(1) vs O(n)）
valid_choices = {"yes", "no", "maybe"}
user_input = "yes"
if user_input in valid_choices:
    print("有效输入")
```

### 9.5 collections 模块

```python
from collections import defaultdict, Counter, deque, OrderedDict, namedtuple

# defaultdict：访问不存在的键时自动创建默认值
word_count = defaultdict(int)      # 默认值为 0
for word in "hello world hello".split():
    word_count[word] += 1          # 无需先判断键是否存在
print(dict(word_count))            # {'hello': 2, 'world': 1}

grouped = defaultdict(list)
for name, dept in [("张三", "技术"), ("李四", "产品"), ("王五", "技术")]:
    grouped[dept].append(name)
print(dict(grouped))   # {'技术': ['张三', '王五'], '产品': ['李四']}

# Counter：计数器
words = ["apple", "banana", "apple", "orange", "banana", "apple"]
c = Counter(words)
print(c)                    # Counter({'apple': 3, 'banana': 2, 'orange': 1})
print(c.most_common(2))     # [('apple', 3), ('banana', 2)]
print(c["apple"])           # 3
print(c["grape"])           # 0，不存在时返回0而不报错

# 计数器运算
c1 = Counter({"a": 3, "b": 2})
c2 = Counter({"a": 1, "c": 4})
print(c1 + c2)              # Counter({'c': 4, 'a': 4, 'b': 2})
print(c1 - c2)              # Counter({'b': 2, 'a': 2})

# deque：双端队列，头尾操作都是 O(1)
dq = deque([1, 2, 3])
dq.append(4)                # 右端添加
dq.appendleft(0)            # 左端添加
dq.pop()                    # 右端删除
dq.popleft()                # 左端删除
dq.rotate(1)                # 向右旋转1位

# 固定大小的队列（保留最近 N 个）
recent = deque(maxlen=3)
for i in range(5):
    recent.append(i)
print(list(recent))         # [2, 3, 4]

# namedtuple：命名元组（轻量级数据类）
Point = namedtuple("Point", ["x", "y"])
p = Point(10, 20)
print(p.x, p.y)             # 10 20
print(p[0], p[1])           # 10 20（支持索引访问）
x, y = p                    # 支持解包

Person = namedtuple("Person", ["name", "age", "city"])
alice = Person("Alice", 25, "北京")
print(alice._asdict())      # OrderedDict，转为字典
bob = alice._replace(name="Bob")  # 创建修改了部分字段的新实例
```

---

## 十、面向对象编程

### 10.1 类与对象基础

```python
class Dog:
    # 类属性：所有实例共享
    species = "Canis familiaris"
    count = 0

    # 构造方法：创建实例时自动调用
    def __init__(self, name, age):
        # 实例属性：每个实例独有
        self.name = name
        self.age = age
        Dog.count += 1    # 修改类属性

    # 实例方法：第一个参数必须是 self
    def bark(self):
        return f"{self.name} 汪汪叫！"

    def get_info(self):
        return f"{self.name}，{self.age} 岁"

    # 类方法：第一个参数是类本身（cls）
    @classmethod
    def get_count(cls):
        return f"共有 {cls.count} 只狗"

    # 静态方法：与类和实例都没有关联
    @staticmethod
    def is_adult(age):
        return age >= 2

# 创建实例
dog1 = Dog("小黑", 3)
dog2 = Dog("大白", 1)

# 访问属性和方法
print(dog1.name)           # 小黑
print(dog1.bark())         # 小黑 汪汪叫！
print(Dog.species)         # Canis familiaris
print(dog1.species)        # 实例也可以访问类属性
print(Dog.get_count())     # 共有 2 只狗
print(Dog.is_adult(3))     # True

# 动态添加属性
dog1.color = "黑色"
print(dog1.color)          # 黑色
print(hasattr(dog2, "color"))  # False，dog2 没有这个属性

# 删除属性
del dog1.color
```

### 10.2 继承

```python
class Animal:
    def __init__(self, name, sound):
        self.name = name
        self.sound = sound

    def speak(self):
        return f"{self.name} 说 {self.sound}"

    def move(self):
        return f"{self.name} 在移动"

    def __str__(self):
        return f"Animal({self.name})"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, "汪汪")   # 调用父类的 __init__
        self.breed = breed

    # 重写父类方法
    def speak(self):
        return f"{self.name}（{self.breed}）大声地叫：{self.sound}！"

    # 新增方法
    def fetch(self):
        return f"{self.name} 去捡球了"

class Cat(Animal):
    def __init__(self, name, is_indoor=True):
        super().__init__(name, "喵喵")
        self.is_indoor = is_indoor

    def speak(self):
        prefix = "家猫" if self.is_indoor else "野猫"
        return f"{prefix} {self.name}：{self.sound}"

dog = Dog("小黑", "拉布拉多")
cat = Cat("小花")

print(dog.speak())     # 小黑（拉布拉多）大声地叫：汪汪！
print(cat.speak())     # 家猫 小花：喵喵
print(dog.move())      # 小黑 在移动（继承自 Animal）

# 类型检查
print(isinstance(dog, Dog))     # True
print(isinstance(dog, Animal))  # True（dog 也是 Animal）
print(issubclass(Dog, Animal))  # True

# 多继承
class Flyable:
    def fly(self):
        return "我会飞"

class Swimmable:
    def swim(self):
        return "我会游泳"

class Duck(Animal, Flyable, Swimmable):
    def __init__(self, name):
        super().__init__(name, "嘎嘎")

duck = Duck("唐老鸭")
print(duck.speak())   # 唐老鸭 说 嘎嘎
print(duck.fly())     # 我会飞
print(duck.swim())    # 我会游泳

# 查看方法解析顺序（MRO）
print(Duck.__mro__)
```

### 10.3 封装

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance      # 单下划线：约定为保护属性，不应从外部访问
        self.__log = []              # 双下划线：名称改写，外部无法直接访问

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("存款金额必须大于0")
        self._balance += amount
        self.__log.append(f"存入 {amount}")

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("取款金额必须大于0")
        if amount > self._balance:
            raise ValueError("余额不足")
        self._balance -= amount
        self.__log.append(f"取出 {amount}")

    def get_balance(self):
        return self._balance

    def get_log(self):
        return self.__log.copy()   # 返回副本，防止外部修改

account = BankAccount("张三", 1000)
account.deposit(500)
account.withdraw(200)
print(account.get_balance())   # 1300
print(account.get_log())       # ['存入 500', '取出 200']

# 双下划线的名称改写
# print(account.__log)         # AttributeError
print(account._BankAccount__log)  # 可以访问，但不应该这么做
```

### 10.4 属性（property）

```python
class Person:
    def __init__(self, name, age):
        self._name = name
        self._age = age

    @property
    def name(self):
        """姓名"""
        return self._name

    @name.setter
    def name(self, value):
        if not isinstance(value, str) or not value.strip():
            raise ValueError("姓名必须是非空字符串")
        self._name = value.strip()

    @property
    def age(self):
        """年龄"""
        return self._age

    @age.setter
    def age(self, value):
        if not isinstance(value, int) or not (0 <= value <= 150):
            raise ValueError("年龄必须是0到150之间的整数")
        self._age = value

    @property
    def is_adult(self):
        """是否成年（只读属性，没有 setter）"""
        return self._age >= 18

p = Person("张三", 17)
print(p.name)         # 张三（通过 getter 访问）
p.name = "李四"       # 通过 setter 修改
p.age = 25
print(p.is_adult)     # True

# p.is_adult = True  # AttributeError，没有 setter
```

### 10.5 特殊方法（魔法方法）

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    # 字符串表示
    def __str__(self):
        """给用户看的字符串，print() 调用"""
        return f"Vector({self.x}, {self.y})"

    def __repr__(self):
        """给开发者看的字符串，调试时使用"""
        return f"Vector(x={self.x}, y={self.y})"

    # 算术运算
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)

    def __rmul__(self, scalar):
        """支持 scalar * vector 的写法"""
        return self.__mul__(scalar)

    def __neg__(self):
        """取反：-vector"""
        return Vector(-self.x, -self.y)

    # 比较运算
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __abs__(self):
        """abs() 函数支持"""
        import math
        return math.sqrt(self.x**2 + self.y**2)

    # 容器行为
    def __len__(self):
        return 2

    def __getitem__(self, index):
        if index == 0:
            return self.x
        elif index == 1:
            return self.y
        raise IndexError(f"Vector 索引超出范围：{index}")

    def __iter__(self):
        yield self.x
        yield self.y

    def __contains__(self, item):
        return item in (self.x, self.y)

    # 上下文管理器
    def __enter__(self):
        print("进入上下文")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("退出上下文")
        return False   # 不抑制异常

v1 = Vector(3, 4)
v2 = Vector(1, 2)

print(v1)              # Vector(3, 4)
print(v1 + v2)         # Vector(4, 6)
print(v1 * 2)          # Vector(6, 8)
print(2 * v1)          # Vector(6, 8)
print(abs(v1))         # 5.0
print(v1[0])           # 3
print(3 in v1)         # True
print(list(v1))        # [3, 4]

with v1 as v:
    print(v)           # Vector(3, 4)
```

### 10.6 抽象基类

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    """抽象基类：不能直接实例化，强制子类实现指定方法"""

    @abstractmethod
    def area(self):
        """计算面积"""
        pass

    @abstractmethod
    def perimeter(self):
        """计算周长"""
        pass

    # 非抽象方法：子类继承，不需要重写
    def describe(self):
        return (f"面积：{self.area():.2f}，"
                f"周长：{self.perimeter():.2f}")

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        import math
        return math.pi * self.radius ** 2

    def perimeter(self):
        import math
        return 2 * math.pi * self.radius

# Shape()   # TypeError，不能实例化抽象基类

rect = Rectangle(3, 4)
circle = Circle(5)

print(rect.describe())     # 面积：12.00，周长：14.00
print(circle.describe())   # 面积：78.54，周长：31.42

# 多态：用统一的接口处理不同类型
shapes = [Rectangle(3, 4), Circle(5), Rectangle(6, 2)]
total_area = sum(shape.area() for shape in shapes)
print(f"总面积：{total_area:.2f}")
```

---

## 十一、异常处理

### 11.1 异常的概念

异常是程序运行时发生的错误。Python 中所有异常都是类，都继承自 `BaseException`。程序发生异常时，如果没有处理，程序会立即终止并打印错误信息。

```python
# 不处理异常时，程序直接终止
print(1 / 0)   # ZeroDivisionError: division by zero
```

### 11.2 基本异常处理

```python
# 基本结构
try:
    # 可能发生异常的代码
    result = 10 / 0
except ZeroDivisionError:
    # 发生指定异常时执行
    print("不能除以零")

# 捕获异常信息
try:
    result = int("abc")
except ValueError as e:
    print(f"发生错误：{e}")
    print(f"错误类型：{type(e).__name__}")

# 捕获多种异常
try:
    num = int(input("输入数字："))
    result = 10 / num
except ValueError:
    print("输入的不是有效数字")
except ZeroDivisionError:
    print("不能除以零")
except Exception as e:
    # Exception 是大多数异常的基类，可以捕获上面没列出的其他异常
    print(f"发生未知错误：{e}")

# 用元组同时捕获多种异常
try:
    pass
except (ValueError, TypeError) as e:
    print(f"值或类型错误：{e}")

# else：没有发生异常时执行
try:
    result = 10 / 2
except ZeroDivisionError:
    print("除零错误")
else:
    print(f"计算成功，结果是：{result}")   # 5.0

# finally：无论是否发生异常都会执行（常用于释放资源）
try:
    f = open("data.txt", "r")
    content = f.read()
except FileNotFoundError:
    print("文件不存在")
finally:
    print("执行完毕")   # 无论是否出错都会打印
```

### 11.3 主动抛出异常

```python
# raise：主动抛出异常
def validate_age(age):
    if not isinstance(age, int):
        raise TypeError(f"年龄必须是整数，收到了 {type(age).__name__}")
    if age < 0 or age > 150:
        raise ValueError(f"年龄必须在 0 到 150 之间，收到了 {age}")
    return True

try:
    validate_age(-5)
except ValueError as e:
    print(f"验证失败：{e}")

# raise 不带参数：在 except 块中重新抛出当前异常
try:
    result = int("abc")
except ValueError:
    print("记录日志：发生了 ValueError")
    raise   # 重新抛出，让上层处理

# raise...from：异常链，指明因果关系
try:
    int("abc")
except ValueError as e:
    raise RuntimeError("数据处理失败") from e
```

### 11.4 自定义异常

```python
# 自定义异常类，继承自 Exception
class AppError(Exception):
    """应用的基础异常类"""
    pass

class ValidationError(AppError):
    """数据验证异常"""
    def __init__(self, field, message):
        self.field = field
        self.message = message
        super().__init__(f"字段 '{field}' 验证失败：{message}")

class NetworkError(AppError):
    """网络请求异常"""
    def __init__(self, url, status_code):
        self.url = url
        self.status_code = status_code
        super().__init__(f"请求 {url} 失败，状态码：{status_code}")

# 使用自定义异常
def validate_user(data):
    if not data.get("name"):
        raise ValidationError("name", "姓名不能为空")
    if not isinstance(data.get("age"), int):
        raise ValidationError("age", "年龄必须是整数")
    if data["age"] < 0:
        raise ValidationError("age", "年龄不能为负数")

try:
    validate_user({"name": "", "age": 18})
except ValidationError as e:
    print(f"验证错误：{e}")
    print(f"问题字段：{e.field}")
except AppError as e:
    print(f"应用错误：{e}")
```

### 11.5 常见内置异常

```python
# TypeError：类型错误
"hello" + 5           # TypeError

# ValueError：值错误（类型正确但值不合法）
int("abc")            # ValueError

# IndexError：索引超出范围
[1, 2, 3][10]         # IndexError

# KeyError：字典键不存在
{"a": 1}["b"]         # KeyError

# AttributeError：属性不存在
"hello".non_exist()   # AttributeError

# NameError：变量未定义
print(undefined_var)  # NameError

# FileNotFoundError：文件不存在
open("no_such_file.txt")  # FileNotFoundError

# ZeroDivisionError：除以零
10 / 0                # ZeroDivisionError

# RecursionError：递归深度超限
def f(): return f()
f()                   # RecursionError

# OverflowError：数值超出范围
import math
math.exp(1000)        # OverflowError

# StopIteration：迭代器耗尽
it = iter([1])
next(it)              # 1
next(it)              # StopIteration
```

### 11.6 上下文管理器

```python
# with 语句自动管理资源（文件、锁、连接等）
# 进入 with 块时调用 __enter__，退出时调用 __exit__

# 文件操作（最常见的用法）
with open("example.txt", "w", encoding="utf-8") as f:
    f.write("第一行\n")
    f.write("第二行\n")
# 退出 with 块后文件自动关闭，无论是否发生异常

# 同时管理多个资源
with open("input.txt", "r") as fin, open("output.txt", "w") as fout:
    fout.write(fin.read())

# 自定义上下文管理器（实现 __enter__ 和 __exit__）
class Timer:
    def __init__(self, name):
        self.name = name

    def __enter__(self):
        import time
        self.start = time.time()
        print(f"开始计时：{self.name}")
        return self   # 返回值赋给 as 后的变量

    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        elapsed = time.time() - self.start
        print(f"结束计时：{self.name}，耗时 {elapsed:.4f} 秒")
        # 返回 True 表示抑制异常，False 表示正常传播异常
        return False

with Timer("数据处理") as t:
    import time
    time.sleep(0.5)

# 用 contextlib 简化自定义上下文管理器
from contextlib import contextmanager

@contextmanager
def timer(name):
    import time
    start = time.time()
    print(f"开始：{name}")
    try:
        yield             # yield 之前是 __enter__，之后是 __exit__
    finally:
        elapsed = time.time() - start
        print(f"结束：{name}，耗时 {elapsed:.4f} 秒")

with timer("任务"):
    import time
    time.sleep(0.5)
```

---

## 十二、文件操作

### 12.1 文件读写基础

```python
# 文件打开模式
# "r"  读取（默认）
# "w"  写入（覆盖）
# "a"  追加
# "rb" 二进制读取
# "wb" 二进制写入
# "r+" 读写
# "x"  创建（文件已存在则报错）

# 写入文件
with open("example.txt", "w", encoding="utf-8") as f:
    f.write("第一行\n")
    f.write("第二行\n")
    f.writelines(["第三行\n", "第四行\n"])  # 写入多行

# 读取文件
with open("example.txt", "r", encoding="utf-8") as f:
    content = f.read()          # 读取全部内容（字符串）
    print(content)

with open("example.txt", "r", encoding="utf-8") as f:
    first_line = f.readline()   # 读取一行（包含换行符）
    print(first_line)

with open("example.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()       # 读取所有行（列表）
    print(lines)

# 逐行读取（推荐，内存效率最高）
with open("example.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())     # strip() 去除换行符

# 追加内容
with open("example.txt", "a", encoding="utf-8") as f:
    f.write("第五行\n")
```

### 12.2 文件与路径操作

```python
import os
from pathlib import Path   # 推荐使用 pathlib（Python 3.6+）

# pathlib 的面向对象路径操作
p = Path("data/example.txt")

print(p.name)           # example.txt（文件名）
print(p.stem)           # example（不含扩展名）
print(p.suffix)         # .txt（扩展名）
print(p.parent)         # data（父目录）
print(p.absolute())     # 绝对路径

# 路径拼接（不用字符串拼接，避免跨平台问题）
base = Path("data")
full = base / "subdir" / "file.txt"   # data/subdir/file.txt

# 文件检查
p.exists()              # 是否存在
p.is_file()             # 是否是文件
p.is_dir()              # 是否是目录

# 目录操作
Path("new_dir").mkdir(parents=True, exist_ok=True)   # 创建目录（含父目录）
p.unlink()              # 删除文件
Path("empty_dir").rmdir()  # 删除空目录

# 遍历目录
for item in Path(".").iterdir():
    print(item)

# 查找文件（glob 模式）
for py_file in Path(".").glob("*.py"):      # 当前目录的 .py 文件
    print(py_file)

for py_file in Path(".").rglob("*.py"):     # 递归查找所有 .py 文件
    print(py_file)

# 读写文件（pathlib 提供的简便方法）
p = Path("example.txt")
p.write_text("内容", encoding="utf-8")
content = p.read_text(encoding="utf-8")
p.write_bytes(b"binary data")
data = p.read_bytes()

# 文件重命名和移动
p.rename("new_name.txt")
p.replace("another_dir/file.txt")   # 移动文件
```

### 12.3 JSON 文件操作

```python
import json

data = {
    "name": "张三",
    "age": 18,
    "hobbies": ["读书", "编程"],
    "address": {"city": "北京", "district": "海淀"}
}

# 写入 JSON 文件
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    # ensure_ascii=False：允许非 ASCII 字符（如中文）直接写入
    # indent=2：格式化缩进，便于阅读

# 读取 JSON 文件
with open("data.json", "r", encoding="utf-8") as f:
    loaded = json.load(f)

print(loaded["name"])          # 张三
print(loaded["hobbies"])       # ['读书', '编程']

# 字符串与 JSON 互转
json_str = json.dumps(data, ensure_ascii=False)   # dict 转 JSON 字符串
parsed = json.loads(json_str)                      # JSON 字符串转 dict

# 安全读取（防止文件损坏）
def load_json_safe(filepath, default=None):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return default
```

### 12.4 CSV 文件操作

```python
import csv

# 写入 CSV
students = [
    ["姓名", "年龄", "成绩"],
    ["张三", 18, 90],
    ["李四", 20, 85],
    ["王五", 19, 92],
]

with open("students.csv", "w", encoding="utf-8-sig", newline="") as f:
    # utf-8-sig：解决 Excel 打开 CSV 中文乱码问题
    # newline=""：防止写入多余空行
    writer = csv.writer(f)
    writer.writerows(students)

# 读取 CSV
with open("students.csv", "r", encoding="utf-8-sig") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)

# 使用 DictReader/DictWriter（以字典形式读写，更直观）
records = [
    {"姓名": "张三", "年龄": 18, "成绩": 90},
    {"姓名": "李四", "年龄": 20, "成绩": 85},
]

with open("students.csv", "w", encoding="utf-8-sig", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["姓名", "年龄", "成绩"])
    writer.writeheader()     # 写入表头
    writer.writerows(records)

with open("students.csv", "r", encoding="utf-8-sig") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["姓名"], row["成绩"])
```

---

## 十三、标准库

### 13.1 os 与 sys

```python
import os
import sys

# os：操作系统接口
print(os.name)                    # 操作系统名称（nt/posix）
print(os.getcwd())                # 当前工作目录
os.chdir("/tmp")                  # 切换目录
print(os.listdir("."))            # 列出目录内容
os.makedirs("a/b/c", exist_ok=True)  # 递归创建目录
os.remove("file.txt")            # 删除文件
os.rename("old.txt", "new.txt")  # 重命名

# 环境变量
print(os.environ.get("PATH"))    # 读取环境变量
os.environ["MY_VAR"] = "hello"  # 设置环境变量

# 执行系统命令（不推荐用于复杂场景，推荐使用 subprocess）
os.system("echo hello")

# sys：Python 解释器相关
print(sys.version)               # Python 版本
print(sys.platform)              # 平台（win32/linux/darwin）
print(sys.argv)                  # 命令行参数列表，argv[0] 是脚本名
print(sys.path)                  # 模块搜索路径
sys.exit(0)                      # 退出程序，0 表示正常退出
```

### 13.2 datetime

```python
from datetime import datetime, date, time, timedelta

# 获取当前时间
now = datetime.now()             # 本地时间
today = date.today()             # 今天日期

# 创建指定时间
dt = datetime(2024, 1, 15, 10, 30, 0)
d = date(2024, 1, 15)

# 获取时间各部分
print(now.year, now.month, now.day)
print(now.hour, now.minute, now.second)
print(now.weekday())             # 0=周一，6=周日

# 时间差（timedelta）
delta = timedelta(days=7, hours=3)
next_week = now + delta
yesterday = today - timedelta(days=1)

# 计算两个时间之间的差值
start = datetime(2024, 1, 1)
end = datetime(2024, 12, 31)
diff = end - start
print(diff.days)                 # 365

# 格式化输出
print(now.strftime("%Y-%m-%d %H:%M:%S"))   # 2024-01-15 10:30:00
print(now.strftime("%Y年%m月%d日"))         # 2024年01月15日

# 常用格式符
# %Y 四位年份  %m 月份  %d 日期
# %H 24小时   %I 12小时  %M 分钟  %S 秒
# %A 英文星期  %a 缩写星期  %p AM/PM

# 字符串转时间
dt = datetime.strptime("2024-01-15", "%Y-%m-%d")
dt = datetime.strptime("2024/01/15 10:30", "%Y/%m/%d %H:%M")

# 时间戳
timestamp = now.timestamp()          # 转为 Unix 时间戳
dt = datetime.fromtimestamp(timestamp)  # 时间戳转 datetime
```

### 13.3 re（正则表达式）

```python
import re

text = "我的邮箱是 alice@example.com，电话是 138-1234-5678"

# 常用函数
# re.match()：从字符串开头匹配
# re.search()：在字符串中搜索第一个匹配
# re.findall()：找到所有匹配，返回列表
# re.finditer()：找到所有匹配，返回迭代器
# re.sub()：替换
# re.split()：分割

# search：找到第一个匹配
match = re.search(r'\w+@\w+\.\w+', text)
if match:
    print(match.group())    # alice@example.com
    print(match.start())    # 匹配的起始位置
    print(match.end())      # 匹配的结束位置

# findall：找到所有匹配
phones = re.findall(r'\d{3}-\d{4}-\d{4}', text)
print(phones)               # ['138-1234-5678']

# sub：替换
new_text = re.sub(r'\d{3}-\d{4}-\d{4}', '***-****-****', text)
print(new_text)

# 分组
pattern = r'(\w+)@(\w+)\.(\w+)'
match = re.search(pattern, text)
if match:
    print(match.group(0))   # 完整匹配：alice@example.com
    print(match.group(1))   # 第一组：alice
    print(match.group(2))   # 第二组：example
    print(match.group(3))   # 第三组：com

# 命名分组
pattern = r'(?P<user>\w+)@(?P<domain>\w+)\.(?P<tld>\w+)'
match = re.search(pattern, text)
if match:
    print(match.group("user"))    # alice
    print(match.group("domain")) # example

# 编译正则（多次使用时提升性能）
email_pattern = re.compile(r'\w+@\w+\.\w+', re.IGNORECASE)
result = email_pattern.findall(text)

# 常用元字符速查
"""
.   匹配任意字符（除换行符）
^   匹配字符串开头
$   匹配字符串结尾
*   0 个或多个
+   1 个或多个
?   0 个或 1 个
{n} 恰好 n 个
{n,m} n 到 m 个
[]  字符集合
[^] 取反字符集合
|   或
()  分组
\d  数字 [0-9]
\D  非数字
\w  字母数字下划线 [a-zA-Z0-9_]
\W  非 \w
\s  空白字符
\S  非空白字符
"""
```

### 13.4 itertools 与 functools

```python
import itertools
import functools

# itertools：高效迭代工具

# chain：连接多个可迭代对象
for item in itertools.chain([1, 2], [3, 4], [5, 6]):
    print(item)    # 1 2 3 4 5 6

# product：笛卡尔积
for pair in itertools.product([1, 2], ['a', 'b']):
    print(pair)    # (1,'a') (1,'b') (2,'a') (2,'b')

# combinations：组合
for c in itertools.combinations([1, 2, 3], 2):
    print(c)       # (1,2) (1,3) (2,3)

# permutations：排列
for p in itertools.permutations([1, 2, 3], 2):
    print(p)       # (1,2) (1,3) (2,1) ...

# groupby：分组
data = [("A", 1), ("A", 2), ("B", 3), ("B", 4)]
for key, group in itertools.groupby(data, key=lambda x: x[0]):
    print(key, list(group))

# islice：切片迭代器（不需要加载全部数据）
for item in itertools.islice(range(100), 5, 10):
    print(item)    # 5 6 7 8 9

# functools：高阶函数工具

# reduce：归并
total = functools.reduce(lambda acc, x: acc + x, [1, 2, 3, 4, 5])
print(total)       # 15

# partial：偏函数（固定部分参数）
def power(base, exponent):
    return base ** exponent

square = functools.partial(power, exponent=2)
cube = functools.partial(power, exponent=3)
print(square(5))   # 25
print(cube(3))     # 27

# lru_cache：缓存函数结果（记忆化）
@functools.lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(50))   # 瞬间返回，没有缓存则会极慢

# cache（Python 3.9+，等同于 lru_cache(maxsize=None)）
@functools.cache
def factorial(n):
    return 1 if n == 0 else n * factorial(n - 1)
```

---

## 十四、模块化与包

### 14.1 模块

```python
# 一个 .py 文件就是一个模块

# math_utils.py
"""数学工具模块"""

PI = 3.14159

def circle_area(radius):
    """计算圆的面积"""
    return PI * radius ** 2

def circle_perimeter(radius):
    """计算圆的周长"""
    return 2 * PI * radius

# 只有直接运行时才执行
if __name__ == "__main__":
    print(circle_area(5))

# 在其他文件中导入
import math_utils
print(math_utils.circle_area(5))

from math_utils import circle_area, PI
print(circle_area(5))

from math_utils import circle_area as area
print(area(5))
```

### 14.2 包

```python
# 包是包含 __init__.py 的目录

# 目录结构：
# my_package/
#   __init__.py
#   utils/
#       __init__.py
#       string_utils.py
#       math_utils.py
#   models/
#       __init__.py
#       user.py

# my_package/__init__.py
from .utils.string_utils import format_name
from .utils.math_utils import circle_area
from .models.user import User

# 使用包
import my_package
my_package.format_name("zhang san")

from my_package.utils import string_utils
string_utils.format_name("zhang san")

from my_package.models.user import User
user = User("张三", 18)
```

### 14.3 虚拟环境与项目结构

```text
推荐的项目结构：

my_project/
├── venv/                  # 虚拟环境（不提交到版本控制）
├── src/                   # 源代码
│   └── my_project/
│       ├── __init__.py
│       ├── main.py
│       ├── config.py
│       ├── models/
│       │   ├── __init__.py
│       │   └── user.py
│       └── utils/
│           ├── __init__.py
│           └── helpers.py
├── tests/                 # 测试代码
│   ├── __init__.py
│   └── test_user.py
├── requirements.txt       # 依赖列表
├── README.md              # 项目说明
└── .gitignore             # Git 忽略文件
```

---

## 十五、常用算法实现

### 15.1 排序算法

```python
# 冒泡排序：O(n²)
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break   # 如果一轮没有交换，说明已经有序
    return arr

# 插入排序：O(n²)，小数据量或接近有序时效果好
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

# 快速排序：平均 O(n log n)
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

# 归并排序：O(n log n)，稳定排序
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# Python 内置排序（TimSort，O(n log n)，稳定）
arr = [5, 2, 8, 1, 9]
sorted_arr = sorted(arr)              # 返回新列表
arr.sort()                            # 原地排序
arr.sort(key=lambda x: -x)           # 按相反数排序（降序）
arr.sort(key=abs)                     # 按绝对值排序
```

### 15.2 搜索算法

```python
# 线性搜索：O(n)
def linear_search(arr, target):
    for i, item in enumerate(arr):
        if item == target:
            return i
    return -1

# 二分搜索：O(log n)，要求数组已排序
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# 使用标准库的二分搜索
import bisect

arr = [1, 3, 5, 7, 9, 11]
print(bisect.bisect_left(arr, 7))    # 3，目标值应插入的左侧位置
print(bisect.bisect_right(arr, 7))   # 4，目标值应插入的右侧位置
bisect.insort(arr, 6)                # 插入6并保持有序
print(arr)                           # [1, 3, 5, 6, 7, 9, 11]
```

### 15.3 递归

```python
# 递归的两个要素：
# 1. 基本情况（终止条件）
# 2. 递归情况（问题规模缩小）

# 阶乘
def factorial(n):
    if n == 0:          # 基本情况
        return 1
    return n * factorial(n - 1)   # 递归情况

# 斐波那契数列（朴素递归，有大量重复计算）
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

# 优化：记忆化递归
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

# 优化：动态规划（迭代版本，性能更好）
def fib_dp(n):
    if n < 2:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

# 二叉树的递归遍历
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder(root):
    """中序遍历：左-根-右"""
    if root is None:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)

def preorder(root):
    """前序遍历：根-左-右"""
    if root is None:
        return []
    return [root.val] + preorder(root.left) + preorder(root.right)
```

---

## 十六、代码规范与调试

### 16.1 PEP8 规范要点

```python
# 缩进：4个空格（不使用Tab）
def good_function():
    if True:
        pass

# 行长度：不超过79个字符
# 过长时使用括号换行
result = (first_value
          + second_value
          + third_value)

# 空行：顶层函数和类之间空2行，方法之间空1行
class MyClass:

    def method_one(self):
        pass

    def method_two(self):
        pass


def top_level_function():
    pass

# 导入顺序：标准库 -> 第三方库 -> 本地模块，每组之间空一行
import os
import sys

import requests
import numpy as np

from my_module import my_function

# 命名
variable_name = 1           # 变量：snake_case
CONSTANT_NAME = 2           # 常量：全大写
def function_name(): pass   # 函数：snake_case
class ClassName: pass       # 类：CamelCase

# 空格
x = 1                       # 赋值两侧各一个空格
y = x + 1                   # 运算符两侧各一个空格
lst[1:2]                    # 切片中冒号两侧不加空格
def f(x, y=1): pass        # 默认参数等号两侧不加空格
f(x=1, y=2)                # 关键字参数等号两侧不加空格
```

### 16.2 类型提示

```python
# Python 3.5+ 支持类型提示（不影响运行，用于提升可读性和 IDE 支持）

# 基本类型
def greet(name: str) -> str:
    return f"Hello, {name}"

def add(a: int, b: int) -> int:
    return a + b

def get_ratio(total: int, part: int) -> float:
    return part / total

# 复合类型（Python 3.9+ 可以直接用 list、dict 等）
def process(items: list[int]) -> dict[str, int]:
    return {"sum": sum(items), "count": len(items)}

# Python 3.8 及之前需要从 typing 导入
from typing import List, Dict, Tuple, Optional, Union

def old_style(items: List[int]) -> Dict[str, int]:
    return {"sum": sum(items)}

# Optional：可以是某类型或 None
def find_user(user_id: int) -> Optional[str]:
    if user_id == 1:
        return "张三"
    return None

# Union：可以是多种类型之一
def parse(value: Union[str, int]) -> str:
    return str(value)

# 类的类型提示
class User:
    def __init__(self, name: str, age: int) -> None:
        self.name = name
        self.age = age

    def get_info(self) -> str:
        return f"{self.name}，{self.age}岁"
```

### 16.3 调试技巧

```python
# print 调试（最基础）
print(f"DEBUG: value={value}, type={type(value)}")

# assert：断言（测试时使用）
def divide(a, b):
    assert b != 0, f"除数不能为0，收到 b={b}"
    return a / b

# logging：日志记录（推荐用于正式项目）
import logging

# 配置日志
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(),            # 输出到控制台
        logging.FileHandler("app.log"),     # 输出到文件
    ]
)

logger = logging.getLogger(__name__)

logger.debug("调试信息，开发时使用")
logger.info("一般信息")
logger.warning("警告，不影响运行")
logger.error("错误，影响部分功能")
logger.critical("严重错误，程序无法继续")

# pdb：Python 内置调试器
import pdb

def buggy_function(data):
    pdb.set_trace()    # 在此处暂停，进入交互式调试
    result = data * 2  # 可以单步执行、查看变量
    return result

# pdb 常用命令：
# n（next）：执行下一行
# s（step）：进入函数
# c（continue）：继续执行
# p variable：打印变量
# l（list）：显示当前代码
# q（quit）：退出调试

# Python 3.7+ 可以用 breakpoint() 代替 pdb.set_trace()
def buggy_function(data):
    breakpoint()
    return data * 2
```

### 16.4 单元测试

```python
import unittest

# 被测试的函数
def add(a, b):
    return a + b

def divide(a, b):
    if b == 0:
        raise ZeroDivisionError("除数不能为0")
    return a / b

# 测试类
class TestMathFunctions(unittest.TestCase):

    def setUp(self):
        """每个测试方法执行前调用"""
        self.numbers = [1, 2, 3, 4, 5]

    def tearDown(self):
        """每个测试方法执行后调用"""
        pass

    def test_add_positive(self):
        self.assertEqual(add(2, 3), 5)
        self.assertEqual(add(0, 0), 0)

    def test_add_negative(self):
        self.assertEqual(add(-1, -2), -3)
        self.assertEqual(add(-1, 1), 0)

    def test_divide_normal(self):
        self.assertEqual(divide(10, 2), 5)
        self.assertAlmostEqual(divide(1, 3), 0.333, places=3)

    def test_divide_by_zero(self):
        with self.assertRaises(ZeroDivisionError):
            divide(10, 0)

    def test_add_is_not_multiply(self):
        self.assertNotEqual(add(2, 3), 6)

    def test_result_type(self):
        self.assertIsInstance(add(1, 2), int)

# 运行测试
if __name__ == "__main__":
    unittest.main()

# 命令行运行：python -m unittest test_module.py
# 运行并显示详情：python -m unittest -v test_module.py
```

---

## 总结

### 知识体系速查

```text
Python 知识体系
├── 环境配置          → 安装、虚拟环境、pip
├── 基础语法          → 注释、缩进、导入、变量命名、输入输出
├── 数据类型          → int/float/bool/str/None、类型检查与转换、可变与不可变
├── 字符串            → 索引切片、常用方法、格式化、转义字符
├── 数字运算          → 算术运算符、math模块、进制转换
├── 流程控制          → if/elif/else、match、for、while、推导式
├── 函数              → 定义、参数类型、作用域、闭包、装饰器、lambda、生成器
├── 数据结构          → list、tuple、dict、set、collections模块
├── 面向对象          → 类与对象、继承、封装、property、魔法方法、抽象基类
├── 异常处理          → try/except/else/finally、自定义异常、上下文管理器
├── 文件操作          → 读写、pathlib、JSON、CSV
├── 标准库            → os/sys、datetime、re、itertools、functools
├── 模块化            → 模块、包、项目结构
├── 算法              → 排序、搜索、递归
└── 工程实践          → PEP8、类型提示、日志、调试、单元测试
```

### 常见问题速查

| 问题 | 解决方案 |
| :--- | :--- |
| 浮点数精度问题 | 使用 `decimal` 模块，或 `round()` 处理显示 |
| 可变默认参数陷阱 | 默认参数使用 `None`，函数内判断后再创建 |
| 循环中的闭包陷阱 | 用默认参数 `lambda x=i: x` 捕获当前值 |
| 浅拷贝与深拷贝混淆 | 嵌套结构用 `copy.deepcopy()`，简单结构用 `.copy()` |
| 修改列表时遍历列表 | 遍历副本 `for item in lst.copy():` 或用推导式过滤 |
| 大文件内存溢出 | 使用生成器逐行处理 |
| 字典键不存在 | 使用 `.get(key, default)` 或 `defaultdict` |
| 字符串拼接性能差 | 使用 `"".join(list)` 代替 `+=` |
| 递归层数过深 | 改用迭代，或 `sys.setrecursionlimit()` 调整限制 |
| 中文文件乱码 | 指定 `encoding="utf-8"`，CSV 用 `utf-8-sig` |



