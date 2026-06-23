---
title: JavaScript学习笔记
date: 2026-06-20 21:42:16
tags:
  - JavaScript
categories: 
  - 前端开发
cover: https://i.postimg.cc/TPPKk6tH/Javascript.jpg
---
# JavaScript 学习笔记

---

## 1. JavaScript 基础概念

### 1.1 什么是 JavaScript？

- **定义**：一种轻量级、解释型的编程语言，是 Web 开发的三大核心技术之一
- **运行环境**：浏览器（前端）、Node.js（后端/工具链）
- **特点**：
  - 动态类型：变量类型在运行时确定
  - 单线程：基于事件循环处理异步任务
  - 原型继承：基于原型链实现面向对象
  - 函数是一等公民：函数可以作为参数、返回值、赋值给变量

### 1.2 JavaScript 在网页中的引入方式

```html
<!-- 内联脚本 -->
<script>
  console.log('Hello World');
</script>

<!-- 外部脚本（推荐） -->
<script src="main.js"></script>

<!-- defer：HTML解析完成后执行，保持脚本顺序 -->
<script src="main.js" defer></script>

<!-- async：下载完成后立即执行，不保证顺序 -->
<script src="main.js" async></script>
```

> 推荐将 script 标签放在 body 底部，或使用 defer 属性，避免阻塞 HTML 解析。

### 1.3 输出与调试

```javascript
// 控制台输出
console.log('普通信息');
console.warn('警告信息');
console.error('错误信息');
console.table([{ name: '张三', age: 18 }]);  // 表格形式输出
console.time('计时');
console.timeEnd('计时');                       // 输出耗时

// 弹窗（开发调试用，不建议在生产环境使用）
alert('提示');
confirm('确认？');   // 返回 true/false
prompt('请输入');    // 返回用户输入的字符串
```

---

## 2. 变量与数据类型

### 2.1 变量声明

```javascript
// var：函数作用域，存在变量提升，不推荐使用
var name = '张三';

// let：块级作用域，可重新赋值，推荐使用
let age = 18;
age = 19;

// const：块级作用域，不可重新赋值，推荐优先使用
const PI = 3.14159;
```

**三者对比**

| | var | let | const |
| :--- | :---: | :---: | :---: |
| 作用域 | 函数级 | 块级 | 块级 |
| 变量提升 | 有 | 无 | 无 |
| 重复声明 | 允许 | 不允许 | 不允许 |
| 重新赋值 | 允许 | 允许 | 不允许 |
| 推荐程度 | 不推荐 | 推荐 | 优先推荐 |

> 实际开发原则：默认使用 const，需要重新赋值时改用 let，避免使用 var。

### 2.2 数据类型

JavaScript 共有 8 种数据类型：

**基本类型（7种）**

```javascript
// Number：整数和浮点数统一为 number 类型
let num = 42;
let float = 3.14;
let inf = Infinity;
let nan = NaN;            // Not a Number，但 typeof NaN === 'number'

// String
let str = '单引号';
let str2 = "双引号";
let str3 = `模板字符串`;

// Boolean
let bool = true;
let bool2 = false;

// Undefined：变量声明但未赋值
let undef;
console.log(undef);       // undefined

// Null：表示空值，需要主动赋值
let empty = null;

// Symbol：唯一标识符（ES6）
let sym = Symbol('描述');
let sym2 = Symbol('描述');
console.log(sym === sym2); // false，每个Symbol都是唯一的

// BigInt：任意精度整数（ES2020）
let big = 9007199254740991n;
```

**引用类型（1种）**

```javascript
// Object：对象、数组、函数都属于引用类型
let obj = { name: '张三' };
let arr = [1, 2, 3];
let fn = function() {};
```

### 2.3 类型检测

```javascript
// typeof：检测基本类型
typeof 42           // 'number'
typeof 'hello'      // 'string'
typeof true         // 'boolean'
typeof undefined    // 'undefined'
typeof null         // 'object'（历史遗留bug）
typeof {}           // 'object'
typeof []           // 'object'
typeof function(){} // 'function'

// instanceof：检测引用类型
[] instanceof Array         // true
{} instanceof Object        // true

// Array.isArray：专门检测数组
Array.isArray([])           // true
Array.isArray({})           // false

// Object.prototype.toString：最准确的类型检测
Object.prototype.toString.call(42)      // '[object Number]'
Object.prototype.toString.call([])      // '[object Array]'
Object.prototype.toString.call(null)    // '[object Null]'
```

### 2.4 类型转换

**显式转换**

```javascript
// 转为数字
Number('42')        // 42
Number('abc')       // NaN
Number(true)        // 1
Number(false)       // 0
Number(null)        // 0
Number(undefined)   // NaN
parseInt('42px')    // 42（解析整数部分）
parseFloat('3.14rem') // 3.14

// 转为字符串
String(42)          // '42'
String(true)        // 'true'
String(null)        // 'null'
(42).toString()     // '42'
(255).toString(16)  // 'ff'（转为16进制）

// 转为布尔值
Boolean(0)          // false
Boolean('')         // false
Boolean(null)       // false
Boolean(undefined)  // false
Boolean(NaN)        // false
Boolean(false)      // false
// 以上6种为假值，其余都为 true
```

**隐式转换（需要注意的坑）**

```javascript
// 字符串拼接
'5' + 3         // '53'（数字被转为字符串）
'5' - 3         // 2（字符串被转为数字）
'5' * '3'       // 15

// 宽松相等（==）会进行类型转换，推荐使用严格相等（===）
0 == false      // true
'' == false     // true
null == undefined // true
null == 0       // false

// 严格相等（===）不进行类型转换
0 === false     // false
1 === '1'       // false
```

---

## 3. 运算符

### 3.1 算术运算符

```javascript
let a = 10, b = 3;

a + b   // 13，加法
a - b   // 7，减法
a * b   // 30，乘法
a / b   // 3.3333...，除法
a % b   // 1，取余
a ** b  // 1000，幂运算（ES7）

// 自增自减
let x = 5;
x++     // 先使用x（5），再自增，x变为6
++x     // 先自增，再使用x（7）
x--     // 先使用x（7），再自减，x变为6
--x     // 先自减，再使用x（5）
```

### 3.2 比较运算符

```javascript
5 > 3       // true
5 < 3       // false
5 >= 5      // true
5 <= 4      // false
5 == '5'    // true（宽松相等，类型转换）
5 === '5'   // false（严格相等，类型不同）
5 != '5'    // false
5 !== '5'   // true
```

### 3.3 逻辑运算符

```javascript
// && 与：两者都为真才返回真，返回第一个假值或最后一个值
true && true    // true
true && false   // false
'a' && 'b'      // 'b'
'' && 'b'       // ''（短路，返回第一个假值）

// || 或：有一个为真就返回真，返回第一个真值或最后一个值
true || false   // true
false || false  // false
'' || 'default' // 'default'（常用于设置默认值）

// ! 非
!true           // false
!0              // true

// ?? 空值合并运算符（ES2020）：只有 null 和 undefined 才触发
null ?? 'default'       // 'default'
undefined ?? 'default'  // 'default'
0 ?? 'default'          // 0（与 || 的区别：0不触发）
'' ?? 'default'         // ''
```

### 3.4 赋值运算符

```javascript
let x = 10;
x += 5;     // x = x + 5 = 15
x -= 3;     // x = x - 3 = 12
x *= 2;     // x = x * 2 = 24
x /= 4;     // x = x / 4 = 6
x %= 4;     // x = x % 4 = 2
x **= 3;    // x = x ** 3 = 8
x ??= 'default'; // 仅当x为null或undefined时赋值
x ||= 'default'; // 仅当x为假值时赋值
x &&= 100;       // 仅当x为真值时赋值
```

### 3.5 其他运算符

```javascript
// 三元运算符
let result = age >= 18 ? '成年' : '未成年';

// 可选链运算符（ES2020）：避免访问undefined/null的属性报错
let user = null;
user?.name          // undefined（不报错）
user?.address?.city // undefined（链式）
user?.getName?.()   // undefined（方法调用）

// 展开运算符
let arr = [1, 2, 3];
let arr2 = [...arr, 4, 5];  // [1, 2, 3, 4, 5]

let obj = { a: 1 };
let obj2 = { ...obj, b: 2 }; // { a: 1, b: 2 }
```

---

## 4. 流程控制

### 4.1 条件语句

```javascript
// if...else if...else
let score = 85;

if (score >= 90) {
  console.log('优秀');
} else if (score >= 70) {
  console.log('良好');
} else if (score >= 60) {
  console.log('及格');
} else {
  console.log('不及格');
}

// switch（适用于多个固定值的判断）
let day = 3;
switch (day) {
  case 1:
    console.log('周一');
    break;
  case 2:
    console.log('周二');
    break;
  case 3:
  case 4:
    console.log('周三或周四');  // 多个case共用
    break;
  default:
    console.log('其他');
}
```

### 4.2 循环语句

```javascript
// for 循环
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// while 循环：先判断后执行
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

// do...while 循环：先执行后判断，至少执行一次
let j = 0;
do {
  console.log(j);
  j++;
} while (j < 5);

// for...of：遍历可迭代对象（数组、字符串、Map、Set等）
let arr = [10, 20, 30];
for (let value of arr) {
  console.log(value);   // 10 20 30
}

// for...in：遍历对象的可枚举属性（键名）
let obj = { a: 1, b: 2, c: 3 };
for (let key in obj) {
  console.log(key, obj[key]);  // a 1  b 2  c 3
}
```

### 4.3 循环控制

```javascript
// break：跳出当前循环
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i);   // 输出 0 1 2 3 4
}

// continue：跳过本次迭代，继续下一次
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i);   // 输出 0 1 3 4
}

// 标签语句：用于多层嵌套循环中的跳出
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) break outer;  // 直接跳出外层循环
    console.log(i, j);
  }
}
```

### 4.4 异常处理

```javascript
// try...catch...finally
try {
  let result = JSON.parse('invalid json');
} catch (error) {
  console.error(error.name);     // SyntaxError
  console.error(error.message);  // 具体错误信息
} finally {
  console.log('无论是否报错都会执行');
}

// 主动抛出错误
function divide(a, b) {
  if (b === 0) {
    throw new Error('除数不能为0');
  }
  return a / b;
}

// 自定义错误类型
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

try {
  throw new ValidationError('输入不合法');
} catch (error) {
  if (error instanceof ValidationError) {
    console.log('验证错误：', error.message);
  }
}
```

---

## 5. 函数

### 5.1 函数声明方式

```javascript
// 函数声明（存在函数提升，可在声明前调用）
function greet(name) {
  return 'Hello, ' + name;
}

// 函数表达式（不存在提升）
const greet = function(name) {
  return 'Hello, ' + name;
};

// 箭头函数（ES6，没有自己的 this）
const greet = (name) => {
  return 'Hello, ' + name;
};

// 箭头函数简写（单行可省略 return 和花括号）
const greet = name => 'Hello, ' + name;

// 立即执行函数（IIFE）
(function() {
  console.log('立即执行');
})();
```

### 5.2 函数参数

```javascript
// 默认参数（ES6）
function greet(name = '陌生人') {
  return 'Hello, ' + name;
}
greet()         // 'Hello, 陌生人'
greet('张三')   // 'Hello, 张三'

// 剩余参数（ES6）：收集多余的参数为数组
function sum(first, ...rest) {
  return rest.reduce((acc, val) => acc + val, first);
}
sum(1, 2, 3, 4)  // 10

// arguments 对象（非箭头函数中，包含所有参数）
function fn() {
  console.log(arguments);        // 类数组对象
  console.log([...arguments]);   // 转为真正的数组
}

// 解构参数
function createUser({ name, age = 18, role = 'user' }) {
  return { name, age, role };
}
createUser({ name: '张三', age: 25 });
```

### 5.3 作用域与闭包

```javascript
// 全局作用域
let globalVar = '全局变量';

function outer() {
  // 函数作用域
  let outerVar = '外部变量';

  function inner() {
    // 块级作用域
    let innerVar = '内部变量';
    console.log(globalVar);   // 可以访问
    console.log(outerVar);    // 可以访问
  }

  inner();
  // console.log(innerVar);  // 报错，无法访问内部变量
}

// 闭包：函数记住了其定义时的词法环境
function makeCounter() {
  let count = 0;

  return {
    increment() { count++; },
    decrement() { count--; },
    getCount()  { return count; }
  };
}

const counter = makeCounter();
counter.increment();
counter.increment();
counter.getCount();  // 2
// count 变量被保护在闭包中，外部无法直接访问
```

### 5.4 this 关键字

```javascript
// 普通函数中，this 由调用方式决定
const obj = {
  name: '张三',
  greet: function() {
    console.log(this.name);  // '张三'，this 指向 obj
  }
};

// 箭头函数没有自己的 this，继承外层作用域的 this
const obj2 = {
  name: '李四',
  greet: () => {
    console.log(this.name);  // undefined，this 指向外层（全局）
  },
  greetLater: function() {
    setTimeout(() => {
      console.log(this.name);  // '李四'，箭头函数继承了 greetLater 的 this
    }, 1000);
  }
};

// 显式绑定 this
function sayName() {
  console.log(this.name);
}

const user = { name: '王五' };

sayName.call(user);          // '王五'，立即调用，参数逐个传入
sayName.apply(user, []);     // '王五'，立即调用，参数以数组传入
const bound = sayName.bind(user);
bound();                     // '王五'，返回新函数，稍后调用
```

### 5.5 高阶函数

```javascript
// 函数作为参数
function execute(fn, value) {
  return fn(value);
}
execute(x => x * 2, 5);  // 10

// 函数作为返回值
function multiplier(factor) {
  return num => num * factor;
}
const double = multiplier(2);
const triple = multiplier(3);
double(5);  // 10
triple(5);  // 15

// 函数柯里化
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...more) => curried(...args, ...more);
  };
}

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
curriedAdd(1)(2)(3);  // 6
curriedAdd(1, 2)(3);  // 6
```

---

## 6. 数组

### 6.1 数组创建

```javascript
// 字面量方式（推荐）
const arr = [1, 2, 3, 4, 5];

// 构造函数方式
const arr2 = new Array(3);        // [empty × 3]，长度为3的空数组
const arr3 = new Array(1, 2, 3);  // [1, 2, 3]

// Array.from：从类数组或可迭代对象创建
Array.from('hello');              // ['h', 'e', 'l', 'l', 'o']
Array.from({ length: 3 }, (_, i) => i + 1);  // [1, 2, 3]

// Array.of：从参数创建数组
Array.of(1, 2, 3);               // [1, 2, 3]
```

### 6.2 数组基本操作

```javascript
const arr = [1, 2, 3, 4, 5];

// 访问元素
arr[0]          // 1
arr.at(-1)      // 5，at() 支持负索引（ES2022）

// 修改元素
arr[0] = 10;

// 获取长度
arr.length      // 5

// 检测是否为数组
Array.isArray(arr)  // true
```

### 6.3 增删操作

```javascript
const arr = [1, 2, 3];

// 末尾操作
arr.push(4, 5);    // 末尾添加，返回新长度，arr = [1,2,3,4,5]
arr.pop();         // 末尾删除，返回被删除的元素，arr = [1,2,3,4]

// 开头操作
arr.unshift(0);    // 开头添加，返回新长度，arr = [0,1,2,3,4]
arr.shift();       // 开头删除，返回被删除的元素，arr = [1,2,3,4]

// splice：任意位置增删改（会修改原数组）
const arr2 = [1, 2, 3, 4, 5];
arr2.splice(1, 2);          // 从索引1开始删除2个，返回[2,3]，arr2=[1,4,5]
arr2.splice(1, 0, 10, 20);  // 从索引1插入，删除0个，arr2=[1,10,20,4,5]
arr2.splice(1, 1, 99);      // 从索引1替换1个，arr2=[1,99,20,4,5]
```

### 6.4 查找操作

```javascript
const arr = [1, 2, 3, 2, 5];

arr.indexOf(2)          // 1，返回第一个匹配的索引，找不到返回-1
arr.lastIndexOf(2)      // 3，从后往前找
arr.includes(3)         // true，是否包含某元素

// find / findIndex：根据条件查找
const users = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
];
users.find(u => u.id === 2)       // { id: 2, name: '李四' }
users.findIndex(u => u.id === 2)  // 1

// findLast / findLastIndex（ES2023）：从末尾开始查找
arr.findLast(n => n < 4)          // 3
arr.findLastIndex(n => n < 4)     // 3
```

### 6.5 遍历操作

```javascript
const arr = [1, 2, 3, 4, 5];

// forEach：遍历，无返回值
arr.forEach((item, index) => {
  console.log(index, item);
});

// map：映射，返回新数组
const doubled = arr.map(n => n * 2);      // [2, 4, 6, 8, 10]

// filter：过滤，返回满足条件的新数组
const evens = arr.filter(n => n % 2 === 0); // [2, 4]

// reduce：归并，将数组归结为单个值
const sum = arr.reduce((acc, n) => acc + n, 0);  // 15

// reduceRight：从右往左归并
const str = ['a', 'b', 'c'].reduceRight((acc, s) => acc + s, ''); // 'cba'

// every：是否所有元素都满足条件
arr.every(n => n > 0)   // true

// some：是否至少有一个元素满足条件
arr.some(n => n > 4)    // true

// flat：展平嵌套数组
[1, [2, [3, [4]]]].flat()     // [1, 2, [3, [4]]]，默认展开一层
[1, [2, [3, [4]]]].flat(Infinity)  // [1, 2, 3, 4]，完全展开

// flatMap：map后展开一层
[[1, 2], [3, 4]].flatMap(x => x)   // [1, 2, 3, 4]
```

### 6.6 排序与变换

```javascript
const arr = [3, 1, 4, 1, 5, 9, 2, 6];

// sort：排序（默认按字符串Unicode排序，数字需要提供比较函数）
arr.sort((a, b) => a - b);   // 升序 [1, 1, 2, 3, 4, 5, 6, 9]
arr.sort((a, b) => b - a);   // 降序 [9, 6, 5, 4, 3, 2, 1, 1]

// reverse：反转（修改原数组）
[1, 2, 3].reverse();         // [3, 2, 1]

// slice：截取（不修改原数组）
const arr2 = [1, 2, 3, 4, 5];
arr2.slice(1, 3)    // [2, 3]，从索引1到3（不含3）
arr2.slice(-2)      // [4, 5]，最后两个元素
arr2.slice()        // [1, 2, 3, 4, 5]，浅拷贝整个数组

// concat：合并数组（不修改原数组）
[1, 2].concat([3, 4], [5, 6])  // [1, 2, 3, 4, 5, 6]

// join：数组转字符串
[1, 2, 3].join('-')   // '1-2-3'
[1, 2, 3].join('')    // '123'

// fill：填充
new Array(5).fill(0)              // [0, 0, 0, 0, 0]
[1, 2, 3, 4, 5].fill(0, 2, 4)   // [1, 2, 0, 0, 5]
```

### 6.7 数组解构

```javascript
// 基本解构
const [a, b, c] = [1, 2, 3];
console.log(a, b, c);  // 1 2 3

// 跳过元素
const [first, , third] = [1, 2, 3];

// 默认值
const [x = 10, y = 20] = [5];
console.log(x, y);  // 5 20

// 剩余元素
const [head, ...tail] = [1, 2, 3, 4];
console.log(head, tail);  // 1 [2, 3, 4]

// 交换变量
let m = 1, n = 2;
[m, n] = [n, m];
console.log(m, n);  // 2 1
```

---

## 7. 对象

### 7.1 对象创建

```javascript
// 字面量方式（推荐）
const user = {
  name: '张三',
  age: 18,
  greet() {
    return 'Hello, ' + this.name;
  }
};

// 构造函数方式
function User(name, age) {
  this.name = name;
  this.age = age;
}
const user2 = new User('李四', 20);

// Object.create：指定原型创建对象
const proto = { greet() { return 'Hello'; } };
const obj = Object.create(proto);
```

### 7.2 属性操作

```javascript
const obj = { name: '张三', age: 18 };

// 读取属性
obj.name          // '张三'，点语法
obj['name']       // '张三'，方括号语法（适用于动态属性名）

const key = 'age';
obj[key]          // 18，动态属性名

// 添加/修改属性
obj.email = 'test@example.com';
obj['phone'] = '123456';

// 删除属性
delete obj.phone;

// 检测属性是否存在
'name' in obj                        // true，包含原型链
obj.hasOwnProperty('name')           // true，仅自身属性
Object.hasOwn(obj, 'name')           // true，ES2022推荐写法

// 属性简写（ES6）
const name = '张三';
const age = 18;
const user = { name, age };          // 等同于 { name: name, age: age }

// 计算属性名（ES6）
const prefix = 'user';
const config = {
  [prefix + 'Name']: '张三',         // userName: '张三'
  [`${prefix}Age`]: 18               // userAge: 18
};
```

### 7.3 对象遍历

```javascript
const obj = { a: 1, b: 2, c: 3 };

// for...in：遍历所有可枚举属性（包含原型链，慎用）
for (let key in obj) {
  if (obj.hasOwnProperty(key)) {     // 过滤原型链属性
    console.log(key, obj[key]);
  }
}

// Object.keys：返回自身可枚举属性的键名数组
Object.keys(obj)      // ['a', 'b', 'c']

// Object.values：返回自身可枚举属性的值数组
Object.values(obj)    // [1, 2, 3]

// Object.entries：返回键值对数组
Object.entries(obj)   // [['a',1], ['b',2], ['c',3]]

// 配合 forEach 遍历
Object.entries(obj).forEach(([key, value]) => {
  console.log(key, value);
});
```

### 7.4 对象操作

```javascript
// Object.assign：浅拷贝/合并对象
const target = { a: 1 };
const source = { b: 2, c: 3 };
Object.assign(target, source);       // { a:1, b:2, c:3 }，修改target

// 展开运算符合并（推荐）
const merged = { ...target, ...source, d: 4 };

// 浅拷贝
const copy = { ...obj };
const copy2 = Object.assign({}, obj);

// 深拷贝
const deep = JSON.parse(JSON.stringify(obj));   // 简单场景，不支持函数、undefined、循环引用
const deep2 = structuredClone(obj);             // 现代方案（ES2022）

// Object.freeze：冻结对象，不可修改
const frozen = Object.freeze({ x: 1 });
frozen.x = 2;        // 静默失败（严格模式下报错）
frozen.x             // 1

// Object.fromEntries：键值对数组转对象
Object.fromEntries([['a', 1], ['b', 2]]);       // { a: 1, b: 2 }
Object.fromEntries(new Map([['a', 1]]));         // { a: 1 }
```

### 7.5 对象解构

```javascript
const user = { name: '张三', age: 18, city: '北京' };

// 基本解构
const { name, age } = user;

// 重命名
const { name: userName, age: userAge } = user;

// 默认值
const { name, role = 'user' } = user;

// 嵌套解构
const { address: { city, street } } = {
  address: { city: '北京', street: '长安街' }
};

// 剩余属性
const { name: n, ...rest } = user;
console.log(rest);   // { age: 18, city: '北京' }

// 函数参数解构
function display({ name, age = 18 }) {
  console.log(name, age);
}
display({ name: '张三' });
```

---

## 8. 字符串

### 8.1 字符串基本操作

```javascript
const str = 'Hello World';

// 长度
str.length          // 11

// 访问字符
str[0]              // 'H'
str.at(-1)          // 'd'，支持负索引

// 大小写
str.toUpperCase()   // 'HELLO WORLD'
str.toLowerCase()   // 'hello world'

// 去除空白
'  hello  '.trim()        // 'hello'
'  hello  '.trimStart()   // 'hello  '
'  hello  '.trimEnd()     // '  hello'

// 填充（ES8）
'5'.padStart(3, '0')      // '005'
'5'.padEnd(3, '0')        // '500'

// 重复
'ab'.repeat(3)            // 'ababab'
```

### 8.2 字符串查找

```javascript
const str = 'Hello World Hello';

str.indexOf('Hello')          // 0，返回第一个匹配的索引
str.lastIndexOf('Hello')      // 12，从后往前找
str.includes('World')         // true
str.startsWith('Hello')       // true
str.startsWith('World', 6)    // true，从索引6开始检测
str.endsWith('Hello')         // true
str.endsWith('World', 11)     // true，只检测前11个字符
```

### 8.3 字符串提取与替换

```javascript
const str = 'Hello World';

// 提取
str.slice(0, 5)       // 'Hello'，支持负索引
str.slice(-5)         // 'World'
str.substring(6, 11)  // 'World'，不支持负索引

// 分割
'a,b,c'.split(',')    // ['a', 'b', 'c']
'abc'.split('')        // ['a', 'b', 'c']
'abc'.split('', 2)    // ['a', 'b']，限制数量

// 替换
str.replace('World', 'JS')      // 'Hello JS'，只替换第一个
str.replaceAll('Hello', 'Hi')   // 'Hi World Hi'，替换所有
str.replace(/Hello/g, 'Hi')     // 'Hi World Hi'，正则全局替换
```

### 8.4 模板字符串

```javascript
const name = '张三';
const age = 18;

// 基本用法
const msg = `我叫${name}，今年${age}岁`;

// 支持表达式
const result = `${age >= 18 ? '成年' : '未成年'}`;

// 多行字符串
const html = `
  <div>
    <p>${name}</p>
  </div>
`;

// 标签模板
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? `<mark>${values[i]}</mark>` : '');
  }, '');
}
const output = highlight`姓名：${name}，年龄：${age}`;
```

### 8.5 正则表达式基础

```javascript
// 创建正则
const reg1 = /hello/i;           // 字面量，i 表示忽略大小写
const reg2 = new RegExp('hello', 'i');  // 构造函数

// 常用修饰符
// i：忽略大小写
// g：全局匹配
// m：多行匹配
// s：. 匹配换行符

// 常用方法
const str = 'Hello World 123';

/\d+/.test(str)              // true，测试是否匹配
str.match(/\d+/)             // ['123']，返回匹配结果
str.match(/[a-z]+/gi)        // ['Hello', 'World']，全局匹配
str.replace(/\d+/, '***')    // 'Hello World ***'

// 常用元字符
// .  匹配任意字符（除换行符）
// \d 匹配数字 [0-9]
// \w 匹配字母数字下划线 [a-zA-Z0-9_]
// \s 匹配空白字符
// ^  匹配开头
// $  匹配结尾
// *  0个或多个
// +  1个或多个
// ?  0个或1个
// {n,m} n到m个
```

---

## 9. Map 与 Set

### 9.1 Map

Map 是键值对集合，与普通对象的区别是：键可以是任意类型，且保持插入顺序。

```javascript
// 创建
const map = new Map();
const map2 = new Map([['a', 1], ['b', 2]]);  // 从数组初始化

// 增删改查
map.set('name', '张三');
map.set(1, 'number key');     // 键可以是数字
map.set(true, 'bool key');    // 键可以是布尔值
map.set({}, 'object key');    // 键可以是对象

map.get('name')               // '张三'
map.has('name')               // true
map.delete('name')            // true
map.size                      // 元素数量
map.clear()                   // 清空

// 遍历
const m = new Map([['a', 1], ['b', 2], ['c', 3]]);
m.forEach((value, key) => console.log(key, value));
for (let [key, value] of m) { console.log(key, value); }
[...m.keys()]       // ['a', 'b', 'c']
[...m.values()]     // [1, 2, 3]
[...m.entries()]    // [['a',1], ['b',2], ['c',3]]

// Map 与 Object 互转
const obj = Object.fromEntries(m);       // Map 转 Object
const map3 = new Map(Object.entries(obj)); // Object 转 Map
```

### 9.2 Set

Set 是值的集合，所有值都是唯一的，不允许重复。

```javascript
// 创建
const set = new Set();
const set2 = new Set([1, 2, 3, 2, 1]);  // 自动去重，set2 = {1, 2, 3}

// 增删查
set.add(1);
set.add(2);
set.add(1);    // 重复添加无效

set.has(1)     // true
set.delete(1)  // true
set.size       // 元素数量
set.clear()    // 清空

// 遍历
const s = new Set([1, 2, 3]);
s.forEach(value => console.log(value));
for (let value of s) { console.log(value); }
[...s]         // [1, 2, 3]，转为数组

// 数组去重（最常用场景）
const arr = [1, 2, 3, 2, 1, 3];
const unique = [...new Set(arr)];    // [1, 2, 3]

// 集合运算
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);

// 并集
const union = new Set([...a, ...b]);               // {1,2,3,4,5,6}

// 交集
const intersection = new Set([...a].filter(x => b.has(x)));  // {3,4}

// 差集（a中有，b中没有）
const difference = new Set([...a].filter(x => !b.has(x)));   // {1,2}
```

### 9.3 WeakMap 与 WeakSet

```javascript
// WeakMap：键必须是对象，不阻止垃圾回收
const wm = new WeakMap();
let obj = {};
wm.set(obj, '一些数据');
obj = null;  // obj 可以被垃圾回收，wm 中对应的条目也会消失

// 常见用途：存储私有数据、DOM节点关联数据
const privateData = new WeakMap();
class User {
  constructor(name) {
    privateData.set(this, { name });
  }
  getName() {
    return privateData.get(this).name;
  }
}

// WeakSet：值必须是对象，不阻止垃圾回收
const ws = new WeakSet();
let element = document.querySelector('div');
ws.add(element);
ws.has(element);  // true
```

---

## 10. 面向对象与原型

### 10.1 原型链

```javascript
// 每个对象都有原型（__proto__），原型也是对象，形成原型链
const arr = [1, 2, 3];

// arr 的原型链：arr -> Array.prototype -> Object.prototype -> null
arr.__proto__ === Array.prototype           // true
Array.prototype.__proto__ === Object.prototype  // true
Object.prototype.__proto__ === null             // true

// 属性查找沿原型链向上
arr.push    // 在 Array.prototype 上找到
arr.toString  // 在 Object.prototype 上找到
```

### 10.2 构造函数

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// 方法定义在原型上，所有实例共享，节省内存
Person.prototype.greet = function() {
  return `我叫${this.name}，今年${this.age}岁`;
};

// 静态方法
Person.create = function(name, age) {
  return new Person(name, age);
};

const p1 = new Person('张三', 18);
const p2 = new Person('李四', 20);

p1.greet()                     // '我叫张三，今年18岁'
p1 instanceof Person           // true
p1.constructor === Person      // true
```

### 10.3 Class 语法（ES6）

```javascript
class Person {
  // 私有字段（ES2022）
  #id;

  // 静态属性
  static count = 0;

  constructor(name, age) {
    this.#id = Math.random();
    this.name = name;
    this.age = age;
    Person.count++;
  }

  // 实例方法
  greet() {
    return `我叫${this.name}，今年${this.age}岁`;
  }

  // 静态方法
  static create(name, age) {
    return new Person(name, age);
  }

  // getter
  get info() {
    return `${this.name}(${this.age})`;
  }

  // setter
  set info(val) {
    [this.name, this.age] = val.split(',');
  }
}

const p = new Person('张三', 18);
p.greet()       // '我叫张三，今年18岁'
p.info          // '张三(18)'
Person.count    // 1
```

### 10.4 继承

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name}发出了声音`;
  }

  toString() {
    return `Animal(${this.name})`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);          // 必须先调用super()，才能使用this
    this.breed = breed;
  }

  // 重写父类方法
  speak() {
    return `${this.name}汪汪叫`;
  }

  // 调用父类方法
  describe() {
    return `${super.speak()}，品种是${this.breed}`;
  }
}

const dog = new Dog('小黑', '拉布拉多');
dog.speak()              // '小黑汪汪叫'
dog.describe()           // '小黑发出了声音，品种是拉布拉多'
dog instanceof Dog       // true
dog instanceof Animal    // true
```

### 10.5 Mixin 模式

```javascript
// JavaScript 只支持单继承，Mixin 可以实现类似多继承的效果
const Serializable = (superclass) => class extends superclass {
  serialize() {
    return JSON.stringify(this);
  }
  static deserialize(json) {
    return Object.assign(new this(), JSON.parse(json));
  }
};

const Validatable = (superclass) => class extends superclass {
  validate() {
    return Object.keys(this).every(key => this[key] !== null);
  }
};

class Base {
  constructor(data) {
    Object.assign(this, data);
  }
}

class User extends Serializable(Validatable(Base)) {
  constructor(data) {
    super(data);
  }
}

const user = new User({ name: '张三', age: 18 });
user.validate()     // true
user.serialize()    // '{"name":"张三","age":18}'
```

---

## 11. 异步编程

### 11.1 同步与异步

```javascript
// 同步：代码按顺序执行，上一行执行完才执行下一行
console.log('第一行');
console.log('第二行');
console.log('第三行');
// 输出顺序：第一行 -> 第二行 -> 第三行

// 异步：不等待结果，继续执行后续代码
console.log('开始');
setTimeout(() => {
  console.log('异步任务');
}, 1000);
console.log('结束');
// 输出顺序：开始 -> 结束 -> 异步任务
```

### 11.2 回调函数

```javascript
// 最基础的异步处理方式
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: '张三' };
    callback(null, data);       // 约定：第一个参数为错误，第二个为数据
  }, 1000);
}

fetchData((error, data) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(data);
});

// 回调地狱：多层嵌套导致代码难以维护
fetchUser(id, (err, user) => {
  fetchOrders(user.id, (err, orders) => {
    fetchOrderDetail(orders[0].id, (err, detail) => {
      // 层层嵌套，难以维护
    });
  });
});
```

### 11.3 Promise

Promise 是对异步操作的封装，有三种状态：pending（进行中）、fulfilled（已成功）、rejected（已失败）。

```javascript
// 创建 Promise
const promise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve('成功的数据');    // 变为 fulfilled 状态
  } else {
    reject(new Error('失败原因'));  // 变为 rejected 状态
  }
});

// 使用 Promise
promise
  .then(data => {
    console.log(data);        // '成功的数据'
    return '下一步的数据';    // 可以继续链式调用
  })
  .then(data => {
    console.log(data);        // '下一步的数据'
  })
  .catch(error => {
    console.error(error);     // 捕获任意一步的错误
  })
  .finally(() => {
    console.log('无论成败都执行');
  });

// 封装异步操作为 Promise
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: '张三' });
      } else {
        reject(new Error('无效的ID'));
      }
    }, 1000);
  });
}
```

**Promise 静态方法**

```javascript
// Promise.all：所有都成功才成功，有一个失败则失败
Promise.all([
  fetchUser(1),
  fetchUser(2),
  fetchUser(3)
]).then(([user1, user2, user3]) => {
  console.log(user1, user2, user3);
}).catch(error => {
  console.error('有一个请求失败', error);
});

// Promise.allSettled：等待所有完成，无论成功还是失败
Promise.allSettled([
  fetchUser(1),
  fetchUser(-1),
]).then(results => {
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      console.log('成功', result.value);
    } else {
      console.log('失败', result.reason);
    }
  });
});

// Promise.race：谁先完成就用谁的结果
Promise.race([
  fetchUser(1),
  delay(500).then(() => { throw new Error('超时'); })
]).then(user => {
  console.log(user);
}).catch(error => {
  console.error(error);
});

// Promise.any：谁先成功就用谁的结果，全部失败才失败
Promise.any([
  Promise.reject(new Error('失败1')),
  fetchUser(1),
  fetchUser(2)
]).then(user => {
  console.log(user);  // 返回第一个成功的结果
});
```

### 11.4 async / await

async/await 是基于 Promise 的语法糖，让异步代码看起来像同步代码。

```javascript
// async 函数始终返回 Promise
async function fetchUserData(id) {
  try {
    const user = await fetchUser(id);         // 等待 Promise 完成
    const orders = await fetchOrders(user.id); // 串行执行
    return { user, orders };
  } catch (error) {
    console.error('请求失败', error);
    throw error;   // 向上抛出，让调用者处理
  }
}

// 调用
fetchUserData(1).then(data => console.log(data));

// 并行执行（性能更好）
async function fetchAll() {
  // 错误写法：串行，总耗时 = 请求1 + 请求2
  const user1 = await fetchUser(1);
  const user2 = await fetchUser(2);

  // 正确写法：并行，总耗时 = max(请求1, 请求2)
  const [user1, user2] = await Promise.all([
    fetchUser(1),
    fetchUser(2)
  ]);
}

// 顶层 await（ES2022，在模块的顶层使用）
const data = await fetchUser(1);
```

### 11.5 事件循环

```javascript
// JavaScript 是单线程的，通过事件循环处理异步任务
// 任务分为：宏任务（setTimeout、setInterval、I/O）
//           微任务（Promise.then、queueMicrotask、MutationObserver）
// 执行顺序：同步代码 -> 微任务队列 -> 宏任务队列

console.log('1');

setTimeout(() => console.log('2'), 0);   // 宏任务

Promise.resolve()
  .then(() => console.log('3'))           // 微任务
  .then(() => console.log('4'));          // 微任务

console.log('5');

// 输出顺序：1 -> 5 -> 3 -> 4 -> 2
```

---

## 12. DOM 操作

### 12.1 获取元素

```javascript
// 通过选择器获取（推荐）
document.querySelector('.box')          // 返回第一个匹配元素
document.querySelectorAll('.item')      // 返回 NodeList（所有匹配）

// 传统方式
document.getElementById('app')
document.getElementsByClassName('box') // 返回 HTMLCollection（实时）
document.getElementsByTagName('div')

// 特殊元素
document.documentElement   // <html>
document.head              // <head>
document.body              // <body>
```

### 12.2 元素内容与属性

```javascript
const el = document.querySelector('.box');

// 内容
el.textContent     // 纯文本内容（安全，推荐）
el.innerHTML       // HTML 内容（注意 XSS 风险）
el.innerText       // 可见文本（受 CSS 影响）

// 属性
el.getAttribute('href')            // 获取属性
el.setAttribute('href', '#')       // 设置属性
el.removeAttribute('disabled')     // 删除属性
el.hasAttribute('disabled')        // 是否有该属性

// data 属性
// <div data-user-id="123">
el.dataset.userId                  // '123'
el.dataset.userId = '456'          // 设置

// class 操作
el.classList.add('active')
el.classList.remove('active')
el.classList.toggle('active')      // 有则删除，无则添加
el.classList.contains('active')    // 是否包含
el.classList.replace('old', 'new') // 替换
```

### 12.3 样式操作

```javascript
const el = document.querySelector('.box');

// 内联样式（直接修改 style 属性）
el.style.color = 'red';
el.style.backgroundColor = '#fff';   // 驼峰命名
el.style.cssText = 'color: red; font-size: 16px;';  // 批量设置

// 获取计算后的样式（只读，包含所有样式）
const styles = getComputedStyle(el);
styles.color          // 'rgb(255, 0, 0)'
styles.fontSize       // '16px'

// CSS 变量
el.style.setProperty('--color', 'red');
getComputedStyle(el).getPropertyValue('--color');
```

### 12.4 节点操作

```javascript
// 创建节点
const div = document.createElement('div');
const text = document.createTextNode('文本节点');
const fragment = document.createDocumentFragment();  // 文档片段，批量插入用

// 插入节点
const parent = document.querySelector('.container');
const child = document.querySelector('.item');

parent.appendChild(div)                    // 末尾追加
parent.prepend(div)                        // 开头插入
parent.insertBefore(div, child)            // 在child之前插入
child.before(div)                          // 在child之前插入（更简洁）
child.after(div)                           // 在child之后插入
parent.replaceChild(div, child)            // 替换子节点
child.replaceWith(div)                     // 替换自身

// 删除节点
parent.removeChild(child)
child.remove()                             // 直接删除自身（推荐）

// 克隆节点
const clone = child.cloneNode(true)        // true 表示深克隆（包含子节点）

// 批量插入（性能优化）
const fragment2 = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = `第${i}项`;
  fragment2.appendChild(li);
}
document.querySelector('ul').appendChild(fragment2);  // 只触发一次重排
```

### 12.5 节点关系

```javascript
const el = document.querySelector('.box');

// 父节点
el.parentNode
el.parentElement

// 子节点
el.childNodes           // 所有子节点（包含文本节点）
el.children             // 元素子节点（不含文本节点）
el.firstChild           // 第一个子节点（含文本节点）
el.firstElementChild    // 第一个元素子节点
el.lastChild
el.lastElementChild

// 兄弟节点
el.previousSibling
el.previousElementSibling
el.nextSibling
el.nextElementSibling
```

---

## 13. 事件

### 13.1 事件监听

```javascript
const btn = document.querySelector('button');

// 添加事件监听（推荐）
btn.addEventListener('click', function(event) {
  console.log('点击了', event.target);
});

// 箭头函数（注意 this 指向）
btn.addEventListener('click', (event) => {
  console.log(event.target);
});

// 命名函数（可以移除）
function handleClick(event) {
  console.log('点击');
}
btn.addEventListener('click', handleClick);
btn.removeEventListener('click', handleClick);  // 移除事件

// 只触发一次
btn.addEventListener('click', handleClick, { once: true });
```

### 13.2 事件对象

```javascript
document.querySelector('a').addEventListener('click', (event) => {
  event.preventDefault()          // 阻止默认行为（如链接跳转）
  event.stopPropagation()         // 阻止冒泡
  event.stopImmediatePropagation() // 阻止冒泡且阻止同元素的其他监听器

  event.target        // 触发事件的元素
  event.currentTarget // 绑定事件的元素
  event.type          // 事件类型，如 'click'
  event.timeStamp     // 事件触发时间

  // 鼠标事件
  event.clientX       // 相对于视口的坐标
  event.clientY
  event.pageX         // 相对于页面的坐标
  event.pageY
  event.button        // 0左键 1中键 2右键

  // 键盘事件
  event.key           // 按键名，如 'Enter'、'a'
  event.code          // 物理按键，如 'KeyA'
  event.ctrlKey       // 是否按下 Ctrl
  event.shiftKey      // 是否按下 Shift
  event.altKey        // 是否按下 Alt
});
```

### 13.3 事件冒泡与捕获

```javascript
// 事件流：捕获阶段（从外到内）-> 目标阶段 -> 冒泡阶段（从内到外）
// addEventListener 第三个参数：false（冒泡，默认）/ true（捕获）

document.querySelector('.outer').addEventListener('click', () => {
  console.log('outer 冒泡');       // 后触发
}, false);

document.querySelector('.inner').addEventListener('click', () => {
  console.log('inner 冒泡');       // 先触发
}, false);

// 捕获阶段监听（先于冒泡触发）
document.querySelector('.outer').addEventListener('click', () => {
  console.log('outer 捕获');       // 最先触发
}, true);
```

### 13.4 事件委托

```javascript
// 利用事件冒泡，将事件绑定在父元素上，处理所有子元素的事件
// 优点：减少事件监听器数量，支持动态添加的元素

const ul = document.querySelector('ul');

ul.addEventListener('click', (event) => {
  const li = event.target.closest('li');   // 找到最近的 li 祖先
  if (!li) return;                          // 点击的不是 li

  console.log('点击了', li.textContent);

  // 根据 data 属性区分不同操作
  const action = event.target.dataset.action;
  if (action === 'delete') {
    li.remove();
  } else if (action === 'edit') {
    li.contentEditable = true;
    li.focus();
  }
});
```

### 13.5 常用事件类型

```javascript
// 鼠标事件
element.addEventListener('click', handler);
element.addEventListener('dblclick', handler);
element.addEventListener('mouseenter', handler);  // 不冒泡
element.addEventListener('mouseleave', handler);  // 不冒泡
element.addEventListener('mouseover', handler);   // 会冒泡
element.addEventListener('mouseout', handler);
element.addEventListener('mousemove', handler);
element.addEventListener('contextmenu', handler); // 右键菜单

// 键盘事件
document.addEventListener('keydown', handler);    // 按下
document.addEventListener('keyup', handler);      // 松开

// 表单事件
input.addEventListener('input', handler);         // 值改变时（实时）
input.addEventListener('change', handler);        // 失去焦点且值改变
input.addEventListener('focus', handler);
input.addEventListener('blur', handler);
form.addEventListener('submit', handler);
form.addEventListener('reset', handler);

// 窗口事件
window.addEventListener('load', handler);         // 页面完全加载
window.addEventListener('DOMContentLoaded', handler); // DOM 解析完成
window.addEventListener('resize', handler);       // 窗口大小改变
window.addEventListener('scroll', handler);       // 页面滚动

// 自定义事件
const event = new CustomEvent('myEvent', {
  detail: { name: '张三' },   // 传递自定义数据
  bubbles: true,               // 是否冒泡
});
element.dispatchEvent(event);
element.addEventListener('myEvent', e => console.log(e.detail));
```

---

## 14. 浏览器 API

### 14.1 存储

```javascript
// localStorage：持久化存储，关闭浏览器不丢失
localStorage.setItem('key', 'value')
localStorage.getItem('key')             // 'value'
localStorage.removeItem('key')
localStorage.clear()

// 存储对象需要序列化
localStorage.setItem('user', JSON.stringify({ name: '张三' }))
const user = JSON.parse(localStorage.getItem('user'))

// sessionStorage：会话存储，关闭标签页即清除
sessionStorage.setItem('key', 'value')
sessionStorage.getItem('key')

// Cookie（简化版）
document.cookie = 'name=张三; max-age=3600; path=/'
```

### 14.2 定时器

```javascript
// setTimeout：延迟执行一次
const timer = setTimeout(() => {
  console.log('1秒后执行');
}, 1000);

clearTimeout(timer);    // 取消定时器

// setInterval：重复执行
const interval = setInterval(() => {
  console.log('每秒执行');
}, 1000);

clearInterval(interval);  // 停止重复

// requestAnimationFrame：在下一帧执行（用于动画，性能优于setInterval）
function animate() {
  // 执行动画逻辑
  element.style.left = (parseInt(element.style.left) + 1) + 'px';

  if (parseInt(element.style.left) < 300) {
    requestAnimationFrame(animate);  // 继续下一帧
  }
}
requestAnimationFrame(animate);
```

### 14.3 网络请求

```javascript
// fetch API（现代标准）
fetch('https://api.example.com/users')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP错误: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));

// async/await 写法（推荐）
async function fetchData(url) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
      },
      body: JSON.stringify({ name: '张三' })
    });

    if (!response.ok) {
      throw new Error(`HTTP错误: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('请求失败', error);
    throw error;
  }
}

// 封装通用请求函数
async function request(url, options = {}) {
  const defaultOptions = {
    headers: { 'Content-Type': 'application/json' },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });

  if (!response.ok) {
    const error = new Error('请求失败');
    error.status = response.status;
    throw error;
  }

  return response.json();
}

// 使用
const users = await request('/api/users');
const newUser = await request('/api/users', {
  method: 'POST',
  body: JSON.stringify({ name: '张三' })
});
```

### 14.4 URL 与路由

```javascript
// URL 解析
const url = new URL('https://example.com/search?q=hello&page=2#result');
url.protocol    // 'https:'
url.hostname    // 'example.com'
url.pathname    // '/search'
url.search      // '?q=hello&page=2'
url.hash        // '#result'

// URLSearchParams：操作查询参数
const params = new URLSearchParams('q=hello&page=2');
params.get('q')           // 'hello'
params.set('page', '3')
params.append('sort', 'asc')
params.delete('q')
params.toString()         // 'page=3&sort=asc'

// History API
window.history.pushState({ page: 2 }, '', '/page/2')   // 添加历史记录
window.history.replaceState({ page: 2 }, '', '/page/2') // 替换当前记录
window.history.back()     // 后退
window.history.forward()  // 前进
window.history.go(-2)     // 后退2步

// popstate 事件（前进/后退时触发）
window.addEventListener('popstate', (event) => {
  console.log('历史状态', event.state);
});
```

---

## 15. 模块化

### 15.1 ES Module（ESM）

```javascript
// 导出（named export）
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export class User { /* ... */ }

// 默认导出（每个模块只能有一个）
export default class App { /* ... */ }

// 统一导出
const name = '张三';
const age = 18;
export { name, age };
export { name as userName };   // 重命名导出

// 导入
import App from './App.js';                    // 导入默认导出
import { add, PI } from './utils.js';          // 导入命名导出
import { add as sum } from './utils.js';       // 重命名导入
import * as utils from './utils.js';           // 导入所有
import App, { add, PI } from './module.js';    // 混合导入

// 动态导入（返回 Promise，按需加载）
const module = await import('./heavy-module.js');
module.default();
module.someExport();

// 懒加载示例
button.addEventListener('click', async () => {
  const { Chart } = await import('./chart.js');
  new Chart(data);
});
```

### 15.2 模块设计原则

```javascript
// 单一职责：每个模块只做一件事
// utils/format.js
export function formatDate(date) {
  return new Intl.DateTimeFormat('zh-CN').format(date);
}

export function formatPrice(price) {
  return `¥${price.toFixed(2)}`;
}

// 避免循环依赖
// a.js 导入 b.js，b.js 又导入 a.js，会导致部分导出为 undefined

// 统一出口（barrel 模式）
// utils/index.js
export { formatDate, formatPrice } from './format.js';
export { request } from './request.js';
export { storage } from './storage.js';

// 使用时只需从一处导入
import { formatDate, request } from './utils/index.js';
```

---

## 16. 常用内置对象

### 16.1 Math

```javascript
Math.PI           // 3.141592653589793
Math.abs(-5)      // 5，绝对值
Math.ceil(4.1)    // 5，向上取整
Math.floor(4.9)   // 4，向下取整
Math.round(4.5)   // 5，四舍五入
Math.max(1, 2, 3) // 3
Math.min(1, 2, 3) // 1
Math.pow(2, 10)   // 1024，幂运算
Math.sqrt(16)     // 4，平方根
Math.random()     // [0, 1) 的随机数

// 常用公式
// 指定范围的随机整数
Math.floor(Math.random() * (max - min + 1)) + min

// 数组最大值
Math.max(...[1, 2, 3, 4, 5])   // 5
```

### 16.2 Date

```javascript
// 创建日期
const now = new Date();
const date = new Date('2024-01-01');
const date2 = new Date(2024, 0, 1);  // 月份从0开始
const timestamp = Date.now();         // 当前时间戳（毫秒）

// 获取日期信息
now.getFullYear()     // 年
now.getMonth()        // 月（0-11）
now.getDate()         // 日
now.getDay()          // 星期（0-6，0为周日）
now.getHours()        // 时
now.getMinutes()      // 分
now.getSeconds()      // 秒
now.getTime()         // 时间戳

// 格式化（推荐使用 Intl.DateTimeFormat）
const formatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});
formatter.format(now)   // '2024/01/01 12:00'

// 时间差计算
const start = new Date('2024-01-01');
const end = new Date('2024-12-31');
const diffMs = end - start;                          // 毫秒差
const diffDays = Math.floor(diffMs / 86400000);      // 天数差
```

### 16.3 JSON

```javascript
// 序列化：对象转 JSON 字符串
const obj = { name: '张三', age: 18, hobbies: ['读书', '编程'] };
JSON.stringify(obj)
// '{"name":"张三","age":18,"hobbies":["读书","编程"]}'

JSON.stringify(obj, null, 2)          // 格式化输出，缩进2个空格
JSON.stringify(obj, ['name', 'age'])  // 只包含指定字段

// 注意：以下值会被忽略或转换
JSON.stringify({ fn: function(){}, undef: undefined, sym: Symbol() })
// '{}'，函数、undefined、Symbol 会被忽略

// 反序列化：JSON 字符串转对象
JSON.parse('{"name":"张三","age":18}')

// 安全解析
function safeParseJSON(str, fallback = null) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}
```

---

## 17. 代码规范与实践建议

### 17.1 命名规范

```javascript
// 变量和函数：小驼峰
let userName = '张三';
function getUserInfo() {}

// 类和构造函数：大驼峰
class UserService {}
function Person() {}

// 常量：全大写下划线分隔
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = 'https://api.example.com';

// 私有属性/方法：下划线前缀（约定）或 # 前缀（ES2022私有字段）
class MyClass {
  #privateField = 0;
  _legacyPrivate = 0;   // 旧约定，仍可从外部访问
}

// 布尔值：is/has/can 前缀
let isLoading = false;
let hasPermission = true;
let canEdit = false;
```

### 17.2 常见最佳实践

```javascript
// 使用严格相等
if (value === null) {}   // 而不是 value == null（除非有意利用类型转换）

// 提前返回，减少嵌套
function process(user) {
  if (!user) return null;          // 提前返回
  if (!user.name) return null;
  return user.name.toUpperCase();  // 主逻辑清晰
}

// 避免魔法数字
const MAX_ITEMS = 10;              // 有意义的常量名
if (items.length > MAX_ITEMS) {}  // 而不是 items.length > 10

// 善用解构
const { name, age } = user;
const [first, ...rest] = arr;

// 使用可选链避免报错
const city = user?.address?.city ?? '未知';

// 函数单一职责
function validateEmail(email) { /* 只负责验证 */ }
function sendEmail(email, content) { /* 只负责发送 */ }

// 避免副作用
// 纯函数：相同输入始终产生相同输出，不修改外部状态
function add(a, b) { return a + b; }  // 纯函数

// 有副作用的函数
let total = 0;
function addToTotal(n) { total += n; }  // 修改了外部状态
```

### 17.3 性能注意事项

```javascript
// 避免在循环中进行 DOM 操作
// 错误写法
for (let i = 0; i < 1000; i++) {
  document.querySelector('.list').innerHTML += `<li>${i}</li>`;
}

// 正确写法：使用文档片段批量操作
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = i;
  fragment.appendChild(li);
}
document.querySelector('.list').appendChild(fragment);

// 防抖（debounce）：连续触发时，只执行最后一次
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 使用场景：搜索框输入、窗口resize
const handleSearch = debounce((event) => {
  console.log('搜索：', event.target.value);
}, 500);
input.addEventListener('input', handleSearch);

// 节流（throttle）：规定时间内只执行一次
function throttle(fn, interval) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// 使用场景：页面滚动、鼠标移动
const handleScroll = throttle(() => {
  console.log('滚动位置：', window.scrollY);
}, 100);
window.addEventListener('scroll', handleScroll);
```

---

## 总结

### 知识体系速查

```text
JavaScript 知识体系
├── 基础概念          → 引入方式、输出调试
├── 变量与类型        → var/let/const、8种数据类型、类型转换
├── 运算符            → 算术/比较/逻辑/可选链/展开
├── 流程控制          → if/switch/for/while/try-catch
├── 函数              → 声明方式、参数、作用域、闭包、this、高阶函数
├── 数组              → 增删查改、遍历方法、解构
├── 对象              → 创建、属性操作、遍历、解构
├── 字符串            → 常用方法、模板字符串、正则基础
├── Map 与 Set        → 用途、API、WeakMap/WeakSet
├── 面向对象          → 原型链、构造函数、Class、继承、Mixin
├── 异步编程          → 回调、Promise、async/await、事件循环
├── DOM 操作          → 获取元素、内容属性、节点操作、节点关系
├── 事件              → 监听、事件对象、冒泡捕获、事件委托
├── 浏览器 API        → 存储、定时器、fetch、URL/History
├── 模块化            → ESM 导入导出、动态导入、设计原则
├── 内置对象          → Math、Date、JSON
└── 最佳实践          → 命名规范、代码风格、防抖节流
```

### 常见问题速查

| 问题 | 解决方案 |
| :--- | :--- |
| 变量提升导致的 bug | 使用 let/const 替代 var |
| this 指向错误 | 箭头函数、bind()、或提前保存 this |
| 深浅拷贝混淆 | 简单场景用 structuredClone()，复杂场景用第三方库 |
| 回调地狱 | 改用 Promise 或 async/await |
| 类型判断不准确 | 使用 Object.prototype.toString.call() |
| 异步并行性能差 | 使用 Promise.all() 并行执行 |
| 频繁 DOM 操作卡顿 | 使用文档片段批量操作，或虚拟 DOM 框架 |
| 事件监听内存泄漏 | 及时 removeEventListener，或使用 once 选项 |
| 高频事件性能问题 | 防抖（debounce）或节流（throttle） |
| 访问 null/undefined 属性报错 | 使用可选链运算符（?.） |



