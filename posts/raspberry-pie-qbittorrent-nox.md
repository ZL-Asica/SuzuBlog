---
title: 树莓派安装qBittorrent-nox实现种子服务器自动下载上传
date: '2019-11-17 00:24:00'
thumbnail: /images/projects/qbt.jpeg
categories:
  - 软件
tags:
  - qBittorrent
  - 树莓派
---

## 前言

我买回家树莓派 3B+以后，就一直没有把它充分的利用起来，仅仅做了一个无线打印机还有一个内网访问的网站。这段时间正好接触到了种子，感觉拿来做一个种子的服务器还是不错的。<!--more-->

## 平台介绍

树莓派 3b+、一张插在树莓派上作为系统盘的金士顿 64GB 的 tf 卡、固定的公网 ip、长时间通电以及能够稳定的网速。

系统版本：Raspbian GNU/Linux 10 (buster)

软件：qBittorrent-nox

网络环境：山东联通

## 准备工作

首先你需要固定你的公网 IP，这是为了稳定你的种子下载和上传的速度，并且能够方便你在外网对你的树莓派的种子下载上传进行管理。如果你不知道公网 ip 为何物亦或是不知道如何固定公网 ip 请自行查阅，本文将不多赘述。

要在 Linux 上使用 qBittorrent Web UI，你无需安装完整的 qBittorent 桌面应用程序，有一个基于终端的 qBittorrent 应用程序可用，它被称为 qBittorrent-Nox。

注意：Web UI 功能不仅限于 qBittorrent-mox 应用程序，此功能还可以与传统的 qBittorent Linux 桌面应用程序一起使用，该应用程序可通过 Flapak 安装。

## 安装过程

### 安装 qBittorrent-nox

在树莓派上获取 qBittorrent-nox 非常简单，因为它位于“Main”软件存储库中，但是，由于操作系统的软件更新方式，main 中的版本可能会略微过时，要安装它，请在下面输入 apt-get 命令：

```shell
sudo apt-get install qbittorrent-nox
```

![qbt-1](https://r2.img.zla.app/2024/12/09/e17dcb.webp)

## 使用方法

### 开启 qBittorrent-nox 服务并映射 8070 端口

请直接输入以下命令并回车。其中 8070 为映射的端口，-d 为后台运行

```shell
qbittorrent-nox --webui-port=8070 -d
```

至于为何使用 8070 端口而不使用默认的 8080 端口原因很简单，国内运营商封禁了家庭宽带外网的 8080 端口，故本教程使用 8070 作为了映射的端口以便能够在外网访问，可以自己随意算则端口，本教程后面的 8070 全部更改为你自己的端口即可

### 防火墙放行 8070 端口

在终端输入以下命令，回车运行

```shell
sudo iptables -I INPUT -p tcp --dport 8070 -j ACCEPT
```

如果终端返回**bash: iptables: command not found**请执行以下命令安装 iptables 后再重新执行上述命令

```shell
sudo apt-get update && apt-get install iptables
```

放行端口后请执行下面的命令以保存放行规则

```shell
sudo iptables-save
```

设置完就已经放行了指定的端口，但重启后会失效，下面设置持续生效规则；
安装**iptables-persistent**

```shell
sudo apt-get install iptables-persistent
```

执行下述命令保存规则持续生效

```shell
netfilter-persistent save
netfilter-persistent reload
```

### 将 qBt-nox 加入开机自启项

输入以下命令打开 rc.local 文件以编辑

```shell
sudo nano /etc/rc.local
```

![qbt-2](https://r2.img.zla.app/2024/12/09/020fef.webp)

在 exit 0 前加入

```shell
sudo qbittorrent-nox --webui-port=8070 -d
```

输入完成后摁 control+X 再摁一下 Y 再摁一下回车即可完成保存设置完成开机自启

### 打开 qBt-nox 的 webUI 并更改默认账户与密码

打开任意浏览器，在浏览器地址栏内输入 `http://你的公网IP:8070` 回车

![qbt-3](https://r2.img.zla.app/2024/12/09/7868ab.png)

默认用户名为 **admin** 密码为 **adminadmin**

点击上方工具栏的 tool-Options-WebUI

![Tools](https://r2.img.zla.app/2024/12/09/8c1c3e.png)

![Options](https://r2.img.zla.app/2024/12/09/2facc4.png)

![WebUI](https://r2.img.zla.app/2024/12/09/0a8d62.png)

在上方可以更改语言为简体中文，更改后会重新进入 qBt 的 WebUI

![更改语言](https://r2.img.zla.app/2024/12/09/213056.png)

下方可以更改默认的账户和密码，强烈建议更改，请勿使用默认设置！！！

![更改密码](https://r2.img.zla.app/2024/12/09/6ca5dc.png)

至此，树莓派安装 qBittorrent-nox 实现种子服务器自动下载上传教程已全部结束，qBittorrent-nox 的使用方式与 PC 端的方法一致。
