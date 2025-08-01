---
title: 基于特定信息的短 ID 生成实现
date: '2024-12-11 00:00:00'
categories:
  - 前端
tags:
  - frontend
thumbnail: https://r2.img.zla.app/2024/12/12/7922b4.webp
---

在一些场景下，我们需要生成具有可读性的短 ID，并且这些 ID 基于用户的特定信息，例如用户 UID 和额外的上下文数据。这种方式的 ID 比 UUID 更加直观，可读性更强，特别适用于以下场景：

- 用户上传的资源（例如 CDN 链接或图床图片）。
- 客户端生成链接或标识符以便用户快速辨认。
- 简化的短 ID 能够提升用户体验和业务逻辑可维护性。

<!--more-->

比如我目前在进行开发的 [MomoPix](https://github.com/ZL-Asica/MomoPix) 私家图床项目，就是使用了这里的这种算法，对用户的图片上传链接进行生成（实际上是我在生成链接的时候看到了 [sm.ms](https://sm.ms) 图床的链接都非常短，还能承受这么大的流量，所以我就想着自己也能不能实现一个这样的短网址生成算法）。

## 实现逻辑

### 目标

- **基于用户特定信息**：结合用户 UID 和额外的上下文数据生成短 ID（能够保证 ID 的唯一性，且包含用户信息）。
- **长度可控**：支持自定义生成 ID 的长度（因为可能这次 6 位够用，但下次 6 位能够承受的流量就不够了）。
- **高效**：适用于客户端高并发环境。

我一开始想到的是使用 `SHA-256` 进行哈希，然后再结合当前时间戳进行生成，这样可以保证 ID 的唯一性，同时也能够保证 ID 的可读性。于是，我就想到了使用 `Web Crypto API` 来进行实现。

### Web Crypto API 简介

`Web Crypto API` 是现代浏览器中内置的加密接口，支持高效、安全的加密操作，包括哈希、签名和密钥生成。它的主要特点包括：

1. **性能高效**：直接在底层硬件或操作系统中实现加密算法，速度远高于 JavaScript 实现。
2. **安全性强**：避免了 JavaScript 中可能导致安全问题的实现错误。
3. **跨平台支持**：几乎所有现代浏览器和 Node.js 环境均支持（IE 11 都支持呢！）。

![Can I Use](https://r2.img.zla.app/2024/12/12/f8cf60.webp)

在我实现的的这一个短 ID 生成中，我们使用了 `crypto.subtle.digest` 方法来计算输入数据的 SHA-256 哈希值。

### 为什么选择 SHA-256？

1. **抗碰撞性**：即使输入数据略有不同，生成的哈希值也会完全不同，极大减少冲突可能性。
2. **普遍支持**：SHA-256 是加密领域的标准算法，浏览器和服务器端均原生支持。
3. **效率高**：在短时间内可以处理大量数据，非常适合高并发场景。

## 具体实现

### 定义输入类型校验

通过 `Zod` 定义输入结构，确保输入数据合法。

```typescript
import { z } from 'zod'

// 输入数据的类型约束
const idSchema = z.object({
  inputValues: z.array(z.string().min(1, 'Strings cannot be empty')),
  randomBias: z.string().optional(),
  length: z.number().int().min(1).default(6),
})

export type IdInput = z.infer<typeof idSchema>
```

我们需要获取的是一个计算时所基于的数据，也就是 `inputValues`，这个数据可以是 `UID` 和当前要上传的文件名所组成的一个 `array` 数组，也可以是一些其他的有一定唯一性的数据。`randomBias` 是一个可选的随机偏置字符串，用于增加哈希的随机性，防止同一个用户在同一时间戳上传多个文件时生成相同的 ID（虽然一般不大可能这样，但是还是要考虑到这种情况）。`length` 是生成的 ID 的长度，这个长度可以根据实际情况进行调整。

### 核心逻辑实现

以下是核心算法，用于生成基于用户输入的短 ID，同时提供回退机制以适应不同环境。

```typescript
/**
 * @param {string[]} inputValues - 用户提供的输入数组，例如 UID 或上下文数据。
 * @param {string} [randomBias] - 可选的随机偏置字符串，默认使用随机数。
 * @param {number} [length] - 生成的短 ID 长度。
 * @returns {Promise<string>} - 返回生成的短 ID。
 */
export const generateUniqueId = async (
  inputValues: string[],
  randomBias: string = Math.random().toString(36).substring(2),
  length: number = 6,
): Promise<string> => {
  idSchema.parse({ inputValues, randomBias, length }) // 校验输入数据

  const encoder = new TextEncoder() // 创建文本编码器
  const uniqueId = encoder.encode(
    inputValues.join('') + Date.now() + randomBias,
  ) // 合并输入数据，并添加当前时间戳和预定义的随机偏置

  // 防止不支持（IE 11 都支持我想不到还有什么不支持的）
  if (crypto?.subtle?.digest) {
    // 进行 SHA-256 哈希计算，返回 ArrayBuffer
    const hashBuffer = await crypto.subtle.digest('SHA-256', uniqueId)
    // 将 ArrayBuffer 转换为 Uint8Array
    const hashArray = [...new Uint8Array(hashBuffer)]
    // 将每个字节转换为 2 位十六进制字符串，并拼接为最终的哈希值
    const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return hash.slice(0, length)
  }

  // 基本不可用的一个回退方案，只能支持小并发的情况
  const fallbackSimple = Math.random().toString(36) + Date.now().toString(36)
  return fallbackSimple.slice(0, length)
}
```

### 使用示例

以下是如何在项目中调用该函数的示例：

```typescript
import { generateUniqueId } from './shortIdGenerator'

const inputs = ['user123', 'photo.png']
// 指定输出长度为 10
const id = await generateUniqueId(inputs, undefined, 10)
```

## 并发冲突分析

在高并发环境中，使用该算法生成短 ID 时，冲突的可能性取决于以下因素：

1. 输入数组 `inputValues` 的唯一性。
2. 随机偏置 `randomBias` 的随机性。
3. 生成的 ID 长度 `length`。

假设输入的 `inputValues` 是一样的，比如同一个用户同一文件名的图片，那么我们就计算一下在这种情况下我们如果选择 6 位长度，能够承受的并发。

以下是目标冲突概率为 $0.1%$ 时，能够承受的最大并发数 $k$ 的证明过程：

### 问题定义

我们使用生日悖论公式计算冲突概率：

$$
P(\text{冲突}) = 1 - \exp\left(-\frac{k(k-1)}{2N}\right)
$$

其中：

- $N = 62^6 = 56800235584$：6位ID的总组合数。
- $k$：每天生成的ID数量。
- 我们希望 $P(\text{冲突}) \leq 0.001$（目标冲突概率为0.1%）。

### 化简公式

设 $P(\text{冲突}) = 0.001$，则：

$$
0.001 = 1 - \exp\left(-\frac{k(k-1)}{2N}\right)
$$

化简为：

$$
\exp\left(-\frac{k(k-1)}{2N}\right) = 0.999
$$

两边取自然对数：

$$
-\frac{k(k-1)}{2N} = \ln(0.999)
$$

$$
\frac{k(k-1)}{2N} = -\ln(0.999)
$$

记 $-\ln(0.999)$ 为一个常数：

$$
C = -\ln(0.999) \approx 0.0010005003
$$

因此：

$$
k(k-1) = 2N \cdot C
$$

### 求解 k

将 $N = 56800235584$ 和 $C = 0.0010005003$ 代入：

$$
k(k-1) = 2 \cdot 56800235584 \cdot 0.0010005003
$$

$$
k(k-1) \approx 113744206.03
$$

设 $k \approx x$，近似解得：

$$
x^2 - x - 113744206.03 = 0
$$

利用二次方程求根公式：

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

其中 $a = 1$，$b = -1$，$c = -113744206.03$：

$$
x = \frac{-(-1) \pm \sqrt{(-1)^2 - 4 \cdot 1 \cdot (-113744206.03)}}{2 \cdot 1}
$$

$$
x = \frac{1 \pm \sqrt{1 + 454976824.12}}{2}
$$

$$
x = \frac{1 \pm 21342.04}{2}
$$

取正值：

$$
x \approx \frac{1 + 21342.04}{2} \approx 10661.52
$$

### 结论

每天生成的最大ID数量 $k$ 为：

$$
k \approx 10661
$$

在这个条件下，冲突概率满足目标 $P(\text{冲突}) \leq 0.001$。

- 对于 6 个字符长度的短 ID，在 inputValues 固定的情况下，每天最多生成 10661 个 ID 时，冲突概率不超过 0.1%。
- 如果需要更低的冲突风险，可以适当增加 ID 长度（例如 8 或 10 个字符）。

## 为什么这种方式更优？

### 相比 UUID 的优势

1. **语义化更强**：
   - UUID 是随机字符串，无法直接反映与用户或上下文的关联。
   - 我们生成的短 ID 包含用户的输入信息，能够在某些场景下提供更高的可读性。
2. **长度可控**：
   - UUID 固定为 36 个字符，而短 ID 支持自定义长度，适应不同需求。
3. **轻量实现**：
   - 无需额外依赖库，适合客户端环境。

### 适用场景

- **CDN 链接生成**：用户上传图片时，生成短 ID 并拼接成可读的文件链接，例如：`cdn.example.com/2024/12/11/x2j239a`。
- **临时标识符**：生成特定上下文的唯一标识，用于短期存储或快速检索。
- **增强用户体验**：通过语义化短 ID 提高业务数据的可解释性。

## 总结

这篇文章介绍了我在前端项目中实现的一种基于用户特定信息的短 ID 生成方法，结合 Web Crypto API，提供了高效、轻量的解决方案。通过支持上下文信息的组合和长度定制，这种短 ID 更加适应现代前端项目的需求。
