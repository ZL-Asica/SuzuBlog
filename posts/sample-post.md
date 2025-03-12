---
title: '我的第一篇文章'
date: '2024-01-01 20:10:00'
thumbnail: '/images/background.jpg'
categories:
  - 前端
  - 教程
tags:
  - Next.js
  - Markdown
---

## Headers

## This is a Heading h2

<!--more-->

### Test heading h3 `inline code`

#### h4

Below is a HR

---

Above is a HR

##### h5

###### This is a Heading h6

## Emphasis

_This text will be italic_
_This will also be italic_

**This text will be bold**
**This will also be bold**

_You **can** combine them_

中文中**重点内容**的加粗与*斜体*的使用

<br>

Aso support <u>underline</u> and ~~strikethrough~~

Here is a kbd example: <kbd>Ctrl</kbd> + <kbd>C</kbd> and <kbd>Command</kbd> + <kbd>V</kbd> and <kbd>Arrow up</kbd> and <kbd>Arrow down</kbd>

这是 ==高亮文本==。

H~2~O, E=mc^2^

### Notes

A note [^1] and another note [^2]

[^1]: This is a note

[^2]: This is another note

### Task Lists

- [ ] to do
- [x] done

<details>
<summary>点击展开</summary>
这里是可折叠的内容。
</details>

### Special Quotes

::: tip
This is a tip
:::

## Lists

### Unordered

- Item 1
- Item 2
- Item 2a
- Item 2b

### Ordered

1. Item 1
2. Item 2
3. Item 3
   1. Item 3a
   2. Item 3b

## Links

You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
> > Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Tables

| Left columns | Right columns |
| ------------ | :-----------: |
| left foo     |   right foo   |
| left bar     |   right bar   |
| left baz     |   right baz   |

## Blocks of code

```typescript
const message = 'Hello world'
alert(message)
const testInt: number = 120
```

## Inline code

This web site is using `markedjs/marked`.
