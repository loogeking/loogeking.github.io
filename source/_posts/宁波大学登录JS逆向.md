---
title: 宁波大学登录JS逆向
date: 2026-08-25 07:42:23
tags:
    - Python
    - JS逆向
cover: https://img.loogeking.top/images/宁波大学逆向/cover.jpg
---


# 宁波大学登录逆向

> 网址：https://uis.nbu.edu.cn/authserver/login

## 一、找到加密位置

### 1.1、找到登录包

![image-20260826202554258](https://img.loogeking.top/images/宁波大学逆向/1.png)

### 1.2、尝试搜索法确定位置

找到可疑的加密位置，打上断点

![image-20260826202949491](https://img.loogeking.top/images/宁波大学逆向/2.png)

断住了，仔细分析

![image-20260826203018670](https://img.loogeking.top/images/宁波大学逆向/3.png)

## 二、代码分析

断住的显示`encryptAES(n,f)`，`n`是明文密码，`f`是密钥

![image-20260826203230104](https://img.loogeking.top/images/宁波大学逆向/4.png)

### 2.1、分析加密函数，进行扣代码

```js
function encryptAES(n, f) {
    return f ? getAesString(randomString(64) + n, f, randomString(16)) : n
}
```

这是加密函数，`n`和`f`我们在上面一节提到了它们的值，这个`encryptAES`函数只是一个简单的三目，大概率是返回`getAesString`函数，我们再深入看

```js
function getAesString(n, f, c) {
    f = f.replace(/(^\s+)|(\s+$)/g, "");
    f = CryptoJS.enc.Utf8.parse(f);
    c = CryptoJS.enc.Utf8.parse(c);
    return CryptoJS.AES.encrypt(n, f, {
        iv: c,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString()
}
```

目前这个函数就很明朗了，出现了`CryptoJS`，直接往上面扣

### 2.2、调试展示

为了文章的简洁性，这里不放扣的代码，直接在`Pycharm`里调试

![image-20260826204136158](https://img.loogeking.top/images/宁波大学逆向/5.png)

这里显示这个函数没定义，这个就是一个简单的随机函数

```js
function randomString(n) {
    var f = "";
    for (i = 0; i < n; i++)
        f += $aes_chars.charAt(Math.floor(Math.random() * aes_chars_len));
    return f
}
```

扣出来给它放在调用函数前面

![image-20260826204325201](https://img.loogeking.top/images/宁波大学逆向/6.png)

这个是`random`函数里的一个常量，我们给它添加一手，随带添加一下`aes_chars_len`

![image-20260826204611323](https://img.loogeking.top/images/宁波大学逆向/7.png)

