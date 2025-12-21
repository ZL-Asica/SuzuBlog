---
title: 'Sample Hidden Post'
date: '2025-12-03 00:00:00'
categories:
  - Example
tags:
  - Post
  - Hidden
showLicense: false
status: hidden
---

This is a **hidden** post (stronger than `draft`).

- **Production:** This page is **never generated**, so the URL will always return **404**.
- It will **never** appear in `/posts` listing.
- It will **not** be included in **RSS**, **sitemap**, or **LLMs.txt**.
- Search engines will **not** index this page.

This status is intended for internal notes or permanently hidden pages.

If you really want to render hidden pages locally for debugging, set `ALLOW_HIDDEN=true`.
