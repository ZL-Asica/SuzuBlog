---
title: 仅使用numpy实现混淆矩阵计算（不使用sklearn）
date: '2023-01-16 13:28:00'
thumbnail: /images/projects/numpy.jpg
categories:
  - 编程
tags:
  - Python
  - Numpy
---

## 什么是混淆矩阵(confusion matrix)

当我们拿到数据后，经过数据清洗、预处理和整理之后，我们做的第一步是利用这些数据训练出一个模型。我们究竟如何衡量模型的准确度和有效性？性能和效率又如何？这就是混淆矩阵被用来解决的问题。混淆矩阵是机器学习分类的性能的一种方式。

<!--more-->

## 混淆矩阵有什么用

我们可以使用这个矩阵直观地看到每个数据的真实值和我们模型的预测值的关系。

![来源：https://b23.tv/dTJ48UB](https://r2.img.zla.app/2024/12/09/c9de49.webp)

## 如何实现

### 使用sklearn.metrics的confusion_matrix

本方法使用了`sklearn.metrics`下的`confusion_matrix`函数直接进行生成

```python
from sklearn.metrics import confusion_matrix

y_true = [2, 0, 2, 2, 0, 1]
y_pred = [0, 0, 2, 2, 0, 2]
confusion_matrix(y_true, y_pred)
```

### 仅使用numpy

本方法仅使用了numpy，没有使用任何其他的库，包括`sklearn`在内实现混淆矩阵的计算。

```python
import numpy as np

def compute_confusion_matrix(true, pred):
    '''输入true和pred
    其输出结果与以下内容相同（计算时间也相似）。
    "from sklearn.metrics import confusion_matrix"
    然而，这个函数避免了对sklearn的依赖。'''

    K = len(np.unique(true)) # features的数量
    result = np.zeros((K, K))

    for i in range(len(true)):
        result[true[i]][pred[i]] += 1

    return result
```

> 来源：https://stackoverflow.com/a/48087308/20626353
