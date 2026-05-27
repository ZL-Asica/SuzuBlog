---
title: Python简单加密器-反转字符串
date: '2023-01-18 14:55:00'
thumbnail: /images/projects/python.png
categories:
  - 编程
tags:
  - Python
---

## 什么是反转字符串

反转字符串其实就是把一个string类型的字符串变量进行从头到尾的一个反转，比如'hello!'经过反转后我们就可以得到'!olleh'。如果只想看代码可以直接翻到[**2.5**](#反转字符串的最终实现)看代码段即可

## 如何实现反转字符串

实际上我们在实现这个加密器的时候首先要考虑的是如何利用字符串本身的一些特性去实现这个功能，从而使用最简单的代码达到最佳的效果。

### 字符串的基本特性

我们的String本质上就是一个类似列表(List)的存在。我们看下面的图，假设我们有一个String类型的变量为`test = "screen"`，我们可以通过下图的方式对它进行索引。每一个单独的字母就是这个"列表"里的一个单独的元素。我们可以使用如`test[0]`的方式来获取元素's'，也可以通过如`test[0:2]`的方式来获取元素'sc'，此处\[0:2]对应的是一个\[0,2)左闭右开的区间。那大家可能就想到了列表是可以反转(reverse)的，那么我们这个所谓的'列表'可不可以做同样的操作呢？答案是不行，String变量并没有reverse函数，所以我们就需要先讲字符串转换为真正的列表才可以进行反转。
![String Slicing](https://s2.loli.net/2023/01/18/eIQ5f49hXRAlJ18.jpg)

### 字符串转列表

字符串转换为列表其实本质上非常简单。一般来说我们把数据转换为列表对象有两种方式，第一种方式是通过`split()`函数进行String对象的切分，第二种方式是通过`list()`函数直接将String对象强制类型转换为列表(List)类型的变量。在这里我们直接使用`list()`函数将String变量转换为列表对象即可。

```python
test = 'screen'
test_list = list(test)    # test_list = ['s', 'c', 'r', 'e', 'e', 'n']
```

### 列表的反转

在我们将String转换为列表后，我们就要开始反转了。列表的反转非常地简单，直接对list类型的变量使用`.reverse()`函数进行列表的反转即可。

```python
test_list.reverse()    # test_list = ['n', 'e', 'e', 'r', 'c', 's']
```

### 列表转字符串

反转完成后我们就需要把列表重新转换为字符串String类型的对象了。将list转换为String实际上非常简单，只需要使用`''.join()`在引号中间就是用什么元素把你的list中的每一个元素连接起来形成一个String。举个?，如果你在引号间用的是`','`，那么你最后列表就会通过,连接起来。

```python
reverse_test = ''.join(test_list)    # reverse_test = 'neercs'
```

### 反转字符串的最终实现

这里我们就把所有的代码合起来，假设我们有一个变量`cipher = "hello!"`，我们要得到它反转后的String字符串。

```python
def cipher_reverse_string(cipher: str) -> str:
    cipher_list = list(cipher)
    cipher_list.reverse()
    result = ''.join(cipher_list)
    return result

if __name__ == '__main__':
    print(cipher_reverse_string("hello!"))
```

## 总结

我们这里使用了Python中String和List的一些小特性和方法实现了一个非常简单的加密器~~(完全没加密的加密器)~~，使用到了String和List的互相转换、list的反转。本质上来说是一个非常简单的小程序，只需要理解其中的逻辑即可。
