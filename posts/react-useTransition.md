---
title: 理解 React 的 useTransition()：原理、用途与最佳实践
date: '2025-05-21 21:00:00'
categories:
  - 编程
tags:
  - React
  - 前端
thumbnail: /images/projects/react.jpg
---

## 什么是 `useTransition()`？

[`useTransition()`](https://react.dev/reference/react/useTransition) 是 React 18 引入的一个 hook，用于处理 **可中断的 UI 更新**，比如列表筛选、搜索结果加载、标签切换、表单提交等。它的目标是：**让高优先级的交互（如输入）保持流畅，而将低优先级的更新“挂起”执行**。<!--more-->

```tsx
const [isPending, startTransition] = useTransition()
```

我们可以用它来包裹**非关键性更新**，从而避免用户界面卡顿。

## 为什么需要 `useTransition()`？

在传统 React 更新中，所有状态更新都是同步的：

```tsx
setSearchQuery(input) // 会立即触发组件更新
filterBigList(input) // 大量计算任务
```

在这种场景下，用户的输入可能会**变卡顿**，因为 React 正忙于重新渲染庞大的 DOM。

而使用 `useTransition()` 你可以把这类开销大的任务变成“可中断”的：

```tsx
setSearchQuery(input) // 高优先级，保持输入顺畅

startTransition(() => {
  setFilteredResults(filterBigList(input)) // 低优先级，不会阻塞输入
})
```

> 本质上：你把副作用较大的状态更新“标记”为**可以延迟处理**的，从而提升交互体验。

## 使用场景

### 搜索/筛选/排序列表

```tsx
const [query, setQuery] = useState('')
const [filtered, setFiltered] = useState(data)

const [isPending, startTransition] = useTransition()

const handleChange = (e) => {
  const input = e.target.value
  setQuery(input) // 高优先级

  startTransition(() => {
    setFiltered(data.filter((item) => item.name.includes(input))) // 低优先级
  })
}
```

### 页面切换、Tab 切换

如果数据很多，可以用 `useTransition()` 延迟加载：

```tsx
const handleTabChange = (tab) => {
  setActiveTab(tab) // 高优先级

  startTransition(() => {
    setTabContent(loadTabContent(tab)) // 大量运算或渲染
  })
}
```

### 虚拟滚动、大量 DOM 节点渲染

在 `setScrollPosition()` 后立即触发数据更新可能卡顿，使用 `useTransition()` 可平滑体验。

```tsx
const handleScroll = () => {
  startTransition(() => {
    setScrollContent(loadScrollContent(window.scrollY)) // 大量运算或渲染
  })
}
```

### 表单提交

在表单提交时，我们可能需要进行 `zod` 校验、后端请求等操作，这些操作都是**非关键性更新**，不能让用户等待过程中毫无感觉，可以使用 `useTransition()` 包裹。

```tsx
const handleSubmit = (e) => {
  e.preventDefault()

  startTransition(() => {
    // 进行 zod 校验、后端请求等操作
  })
}
```

> 在 React 19 +，使用 [`useActionState()`](https://react.dev/reference/react/useActionState) 可以替代 `useTransition()` 来处理表单提交。效果更好并且可以使用 [Server Action](https://react.dev/reference/rsc/server-functions) 来处理表单提交。
>
> 但不管如何，我更加推荐使用 [TanStack Form](https://tanstack.com/form/latest/docs/overview) 或其他你喜欢的表单库来处理表单提交，避免 React 的疯狂 Rerender 并且能提供更好的 UX。

## Best Practices

| 推荐做法                                   | 不推荐做法                                         |
| ------------------------------------------ | -------------------------------------------------- |
| 只用于非关键交互                           | 滥用导致界面延迟更新                               |
| 配合 loading spinner 显示 `isPending` 状态 | 忽略 `isPending` 导致 UX 迷惑                      |
| 适用于复杂列表和过滤器                     | 不适合用在 form 提交、导航跳转等必须立即响应的操作 |
| 理解「可中断」含义，不等于异步             | 误以为是 `setTimeout` 或 `async/await` 替代        |

## 常见误区

- **误区 1**：用 `useTransition()` 会“变快”？

  其实不是变快，而是**让重要更新先执行，次要更新慢慢来**。

- **误区 2**：可以替代 `useEffect()` 吗？

  `useTransition()` 是控制更新优先级，而非副作用执行时机。

- **误区 3**：是不是必须搭配 Suspense？

  不需要。虽然它和 Suspense 一起使用更强大，但单独用也非常有用。

## UX 加分项：给用户一点提示

使用 `isPending` 提示用户数据正在加载：

```tsx
{
  isPending && <p>Loading...</p>
}
;<ul>
  {filtered.map((item) => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>
```

你还可以加上 spinner、skeleton 等效果提升体验。

## 总结

| 优点             | 说明                                    |
| ---------------- | --------------------------------------- |
| 提升交互流畅度   | 输入、点击不再卡顿                      |
| 更灵活的状态管理 | 精细控制高低优先级更新                  |
| 易于集成         | 与现有 `useState`、`useEffect` 无缝配合 |

> **`useTransition()` 不是让程序变快，而是让用户感觉更快。**

如果你在开发过程中遇到 React UI 卡顿的场景，不妨尝试 `useTransition()`。它不会让你的代码更复杂，却能显著提升用户体验。
