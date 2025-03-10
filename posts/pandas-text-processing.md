---
title: Pandas 逐行处理文本数据的方法对比与优化
date: '2025-03-10 08:00:00'
categories:
  - 编程
tags:
  - Python
  - Pandas
  - NLP
thumbnail: /images/projects/pandas.png
---

在使用 Pandas 处理文本数据时，我们通常会涉及数据清理的任务，例如去除 HTML 标签、去除特殊字符、转换大小写等。在 NLP 任务中，许多文本预处理操作需要基于 **Pandas DataFrame** 进行处理。但由于 Pandas 的字符串操作本质上仍然是逐行处理的，我们无法直接使用向量化优化，而不得不考虑如何选择最佳的逐行处理方法。

在我最近的项目中遇到了需要对一个 *7,000,000 行* 的文本数据集进行清理的任务，本文基本上是记录我的实验过程和结果。<!--more-->

本文将对比 5 种不同的 Pandas 处理方法，并进行基准测试，以衡量它们在执行时间和内存消耗方面的差异。同时，我们会分析实验数据，探讨 <u>如何真正优化文本清理的性能</u>。

## 背景

在 Pandas 处理数据时，`str.replace()`、`str.lower()` 等方法虽然在 Cython 层面做了一些优化，但仍然是逐行处理的，而不像 NumPy 这样的数值计算真正实现了向量化。对于 NLP 任务，如 `nltk`、`symspellpy`、`regex` 等涉及外部库的复杂数据清理逻辑，我们无法使用 Pandas 内建字符串方法进行向量化计算，只能采用逐行处理方式。

因此，我们对比以下 5 种 Pandas 逐行处理逻辑：

1. 经典 `for-loop`
2. `apply` 方法
3. `map` 方法
4. 列表推导式（List Comprehension）
5. `itertuples` 方法

我们希望找出哪种方法在 Pandas 中执行文本清理任务时更高效。

### 测试介绍

我们使用一个复杂的 `clean_text()` 作为示例，该函数涉及 去除 HTML 标签、URL、停用词、词形还原（lemmatization）、拼写错误修复、正则清理等，依赖 `nltk`、`symspellpy` 和 `regex` 进行处理。

```python
def clean_text(text: str) -> str:
    """
    一个复杂的文本清理函数，这里不展示具体实现
    主要包含：
    - 去除 HTML 标签
    - 词形还原（NLTK）
    - 正则表达式清理
    - 拼写错误修复（symspellpy）
    """
    return text
```

我们使用 **50,000 行真实文本数据** 进行测试，并保证数据一致性。

```python
import pandas as pd
import numpy as np

def get_test_data(n: int = 50_000) -> pd.DataFrame:
    return pd.DataFrame(data)
```

## 五种 Pandas 处理方式

### 经典 for-loop

```python
def method_for_loop(df: pd.DataFrame) -> pd.DataFrame:
    cleaned_texts = []
    for t in df["text"]:
        cleaned_texts.append(clean_text(t))
    df["cleaned_text"] = cleaned_texts
    return df
```

- 通过 Python 的 for 循环逐行处理数据
- 代码直观易懂
- 由于 Python 的循环性能较低，对大数据集不够高效
- 不 Pythonic，调用 `.append()` 方法会产生额外的开销

### `apply` 方法

```python
def method_apply(df: pd.DataFrame) -> pd.DataFrame:
    df["cleaned_text"] = df["text"].apply(clean_text)
    return df
```

- `apply` 方法会将 `clean_text` 应用于 `text` 列的每一行
- 语法简洁，适用于 Pandas Series 级别的操作

### `map` 方法

```python
def method_map(df: pd.DataFrame) -> pd.DataFrame:
    df["cleaned_text"] = df["text"].map(clean_text)
    return df
```

- 理论上，`map` 方法在对 **字典** 元素操作的时候会比 `apply` 更快，因为对于字典元素 `map` 有专门优化。
- `map` 主要用于对 Series 进行逐元素转换
- 语法简洁，与 `apply` 类似，通常性能差异不大

### 列表推导式（List Comprehension）

```python
def method_list_comprehension(df: pd.DataFrame) -> pd.DataFrame:
    df["cleaned_text"] = [clean_text(t) for t in df["text"]]
    return df
```

- 通过列表推导式直接生成新列表，将整个 `numpy` 数组直接赋值给 DataFrame
- 通常比 `apply` 和 `map` 方式更快，因为不涉及额外的 Pandas 操作，没有 `Series` 结构的开销，直接利用 python 的优化。
- 代码简洁，Pythonic

### `itertuples` 方法

```python
def method_itertuples(df):
    df["cleaned_text"] = [clean_text(row.text) for row in df.itertuples(index=False)]
    return df
```

- 使用 `itertuples` 方法，直接访问元组对象，提高迭代性能
- 通常比 `iterrows` 更快
- 对于只需要单列数据的操作，没必要用 `itertuples`，直接使用 `df["text"]` 更简单

## 结果与分析

### 执行时间

根据实验结果，执行时间排序如下：

| 方法                 | 执行时间 (秒) |
| -------------------- | ------------- |
| `map`                | **104.64s**   |
| `apply`              | **105.21s**   |
| `list comprehension` | 105.23s       |
| `itertuples`         | 105.76s       |
| `for-loop`           | 106.26s       |

### 内存使用

| 方法                 | 内存使用 (MB) |
| -------------------- | ------------- |
| `apply`              | **33.56 MB**  |
| `map`                | **39.00 MB**  |
| `itertuples`         | 43.12 MB      |
| `list comprehension` | 43.69 MB      |
| `for-loop`           | 59.44 MB      |

### 结果分析

- 所有方法的执行时间几乎相同，说明主要瓶颈在 `clean_text()` 而不是 Pandas 方法的选择。
- `apply` **方法的内存占用最低**，表明 Pandas 可能在内部进行了优化。
- `for-loop` 由于 `append()` 产生额外的 Python 级调用，导致内存消耗最高，永远都别用。

## 优化方向

在本次实验中，所有方法的执行时间差距并不大，说明它们的主要瓶颈在于 `clean_text` 的执行，而不是 Pandas 本身的操作。因此，我们更应该关注 `clean_text` 函数的优化，而非 Pandas 处理方式的选择。

### 优化 `clean_text` 函数内部

这个就需要考虑如何简化 `clean_text` 函数的逻辑，减少不必要的计算。例如，可以考虑使用更高效的算法、减少循环次数、减少正则表达式的使用（或者该用 `re.sub()` ）等。对于 stop words，可以使用 `set()` 来储存，提高速度等。重点是考虑其中不同方法阈值设置的 trade-off，比如 symspellpy 的拼写错误修复，我们可以设置不同的阈值来减少计算量。

### 使用 `concurrent.futures`

由于目前的实际运行会受到 **GIL** 的限制，Python 的多线程并不能真正实现并行处理。但是可以考虑使用 **多进程** 来加速处理，将数据分块处理，然后合并结果。

我在项目中选择的方案是 `concurrent.futures` 模块，使用 `ProcessPoolExecutor` 来实现并行处理（不可以使用 `ThreadPoolExecutor`，因为并没有真正解锁 GIL）。

```python
from concurrent.futures import ProcessPoolExecutor

with ProcessPoolExecutor(max_workers=8) as executor:
    results = list(executor.map(clean_text, df["text"]))
df["cleaned_text"] = results
```

### 使用 Dask（不推荐）

Dask 是另一个并行计算库，可以用于处理大数据集。但是我的使用场景和实际测试中，Dask 并没有带来性能提升，反而会增加额外的开销。因此，不推荐使用 Dask。尤其配置 Dask 集群的开销会更大，配置相对复杂，不适合小规模数据集（我们的场景只有 7,000,000 行数据）。

```python
import dask.dataframe as dd

ddf = dd.from_pandas(df, npartitions=8)
ddf["cleaned_text"] = ddf["text"].map_partitions(clean_text)
df = ddf.compute()
```

## 总结

1. 对于 Pandas 处理文本数据，我们应该更关注文本清理函数的优化，而不是 Pandas 方法的选择。
2. `apply` 方法在内存占用上表现最佳，但性能与 `map`、`list comprehension` 差异不大。
3. `clean_text()` 函数的优化是提高性能的关键，可以考虑简化逻辑、减少循环次数、减少正则表达式的使用等。
4. 使用 `concurrent.futures` 模块可以实现并行处理，加速数据清理过程。
