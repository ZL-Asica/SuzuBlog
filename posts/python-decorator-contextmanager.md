---
title: Python 装饰器（Decorator）和上下文管理器（Context Manager）详解
date: '2025-03-05 00:00:00'
categories:
  - 编程
tags:
  - Python
thumbnail: /images/projects/python.png
---

## 前言

最近在做自己的 Research Project，大量使用到了 Python（因为项目还在进行中，代码暂时无法开源）。有很多情况下我都想要检测一个函数（或者一段代码）的执行时间、管理 SQLALChemy 的 Session（管理 Transaction 和 Rollback）等等。这时候就需要用到 Python 的装饰器（Decorator）和上下文管理器（Context Manager）。讲真，这两个东西真的很方便，而且代码看起来也很优雅。我相信没人愿意写一堆重复的代码，或者等一个要执行很多不同的函数负责不同功能无法统计时间，或者每次都要手动管理 Session（甚至忘记 Rollback）。今天我就来详细介绍一下 Python 中的 decorator 和 context manager。<!--more-->

## Wrapper（包装器）

### Wrapper 的概念

在 Python 中，Wrapper（包装器）是一种用于**修改函数行为**的方式，通常用于封装函数的执行过程。例如，我们可以创建一个包装器来在函数调用前后打印日志。

Wrapper 是装饰器的基础，装饰器本质上就是一个高级的 wrapper。

### Wrapper 示例

```python
import time

def wrapper(func):  # 接收一个函数作为参数
    def inner(*args, **kwargs):  # 接收任意参数
        print(f"Calling {func.__name__}...")
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Executed {func.__name__} in {time.time() - start:.2f}s")
        return result
    return inner

def my_function():
    time.sleep(1)
    print("Hello, world!")

wrapped_func = wrapper(my_function)  # 手动包装
wrapped_func()  # 需要手动调用被包装的函数
```

### Wrapper 的局限性

- 需要手动调用 `wrapper(func)`，不够直观。
- 不能直接装饰多个函数，需要对每个函数手动调用 `wrapper(func)`。

## 装饰器（Decorator）

### 装饰器的概念

装饰器（Decorator）是 Python 中的一种**函数**或**类**，用于**动态地修改函数或方法的行为**，而无需修改其代码。装饰器常用于：

- **日志记录**
- **权限校验**
- **缓存**
- **执行时间统计**
- **事务管理**

在 Python 中，装饰器通常使用 `@decorator` 语法糖来应用。

### 无参数装饰器

最简单的装饰器是无参数装饰器，它接收一个函数作为参数，并返回一个新函数。

#### 示例：计算函数执行时间的装饰器

```python
import time
from functools import wraps

def timer(func):
    @wraps(func)  # 保留原函数的 __name__ 和 __doc__
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} executed in {time.time() - start:.2f}s")
        return result
    return wrapper

@timer  # 直接装饰函数
def my_function():
    time.sleep(1)
    print("Hello, world!")

my_function()
```

### 带参数装饰器

如果需要**传递参数**来控制装饰器的行为，就需要使用多层嵌套。

#### 示例：可调整日志级别的装饰器

```python
import time
from functools import wraps

def timer(level="INFO"):  # 允许用户传递日志级别
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            start = time.time()
            result = func(*args, **kwargs)
            print(f"[{level}] {func.__name__} executed in {time.time() - start:.2f}s")
            return result
        return wrapper
    return decorator

@timer(level="DEBUG")  # 传递参数
def my_function():
    time.sleep(1)
    print("Hello, world!")

my_function()
```

### 既支持无参数又支持带参数的装饰器

有时，我们希望装饰器既可以 `@decorator` 直接使用，又可以 `@decorator(arg)` 传参。

#### 示例：兼容无参数和带参数的装饰器

```python
import time
from functools import wraps

def timer(func=None, *, level="INFO"):  # 让 level 作为关键字参数
    if func is None:
        return lambda f: timer(f, level=level)

    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"[{level}] {func.__name__} executed in {time.time() - start:.2f}s")
        return result
    return wrapper

@timer  # 无参数
def function_1():
    print("Function 1")

@timer(level="DEBUG")  # 带参数
def function_2():
    print("Function 2")

function_1()
function_2()
```

---

## 上下文管理器（Context Manager）

### 上下文管理器的概念

上下文管理器用于**管理资源的分配和释放**，典型场景包括：

- **文件操作**
- **数据库连接**
- **线程锁**
- **网络连接**
- **性能计时**

上下文管理器使用 `with` 语句来确保资源正确释放。

### 使用 `contextlib.contextmanager`

Python 提供了 `contextlib.contextmanager`，可以用更简洁的方式实现上下文管理器。

#### 示例：使用 @contextmanager 进行计时

```python
import time
from contextlib import contextmanager

@contextmanager
def timer(name):
    start = time.time()
    print(f"⏳ {name} started...")
    yield  # 代码块执行
    print(f"✅ {name} completed in {time.time() - start:.2f}s.")

with timer("Processing"):  # 代码块执行时自动计时
    time.sleep(1)
```

---

## 装饰器 vs. 上下文管理器：选择指南

| 方式                                | 适用范围   | 主要用途                       | 优点                     | 缺点              |
| ----------------------------------- | ---------- | ------------------------------ | ------------------------ | ----------------- |
| **Wrapper（包装器）**               | 函数       | 修改函数行为                   | 简单易懂                 | 需要手动调用      |
| **装饰器（Decorator）**             | 函数、方法 | 计时、日志、缓存、权限控制等   | 语法简洁，易复用         | 只能用于函数/方法 |
| **上下文管理器（Context Manager）** | 代码块     | 资源管理、事务管理、性能监控等 | 适用于代码块，不影响函数 | 需要 `with` 语句  |

### 何时使用？

- **需要增强函数行为**（如日志、缓存、计时）==> 用 **装饰器**。
- **需要管理资源生命周期**（如文件、数据库、锁）==> 用 **上下文管理器**。
- **如果逻辑可以封装成独立函数** ==> 用 **装饰器**。
- **如果逻辑需要在代码块中生效** ==> 用 **上下文管理器**。

---

## 总结

装饰器和上下文管理器都是 Python 的强大特性，它们分别适用于不同的场景。如果你的目标是**增强函数的行为**，装饰器是最佳选择；如果你的目标是**管理资源**，上下文管理器更合适。
