---
title: 使用 Tailscale 实现 SSH 内网穿透
date: '2025-02-28 00:00:00'
categories:
  - 编程
tags:
  - Linux
thumbnail: https://s2.loli.net/2025/03/02/2gbtN6AcK8ipjEa.webp
---

## 前言

其实这件事情非常复杂，我在家里有一台 ITX,但它一直都是 Windows 系统。在前段时间因为我跑的项目需要很大的内存（还有一个需要 CUDA 加速），我便打算把它利用起来，而不是只用来打游戏（关键我自从读研以后基本就没打过游戏了）。但是我发现，在 Windows 里写代码出现了很多问题，先简述一下我这两个项目中我遇到的两个问题。<!--more-->

1. 在运行一个基于 Python 和 PostgreSQL 的项目中，出现了 GBK 编码与 UTF-8 编码的问题，PostgreSQL 不允许 GBK 编码的数据导入，在 Python 中强行 encode 也无法解决问题。这个问题出现的原因是我在安装 Windows 的时候选择了**中文**作为系统语言。Windows 就直接把整个系统的编码设置成了 GBK（即使后来把语言换成了英语）。最后的解决方式是在控制面板中找到一个隐藏的 UTF-8 (beta) 选项，把它打开，重启系统，这样系统就会默认使用 UTF-8 编码了。
2. 另外一个实际上很好理解，是一个 LLM 的项目（相信大家也不会在 Windows 上训练模型的）。我当时想要使用 [Unsloth](https://unsloth.ai/) 来跑 QLoRA（因为我只有一张 3070Ti，8G 显存），虽然他们官方提供了 [Windows 安装教程](https://docs.unsloth.ai/get-started/installing-+-updating/windows-installation)，也提供了 Windows 版本的 [Triton](https://github.com/woct0rdho/triton-windows)，但还是出现了各种各样的环境配置问题。

然后，我就一气之下，抛弃了 Windows,装了 [Ubuntu 24.04 LTS](https://ubuntu.com/download/desktop)。当然，这体验直线上升，节省了非常多的时间和情绪问题。但是，我经常需要去学校上课或者去 Lab，我不可能说来回切换 mac 和家里的Ubuntu,于是我就想给它折腾一下内网穿透，让我能够不在家的时候也能用它。

最初，我尝试使用 Cloudflare Tunnel，但最终放弃，转而使用 Tailscale。这篇文章本质上就是个教程，有同样需求的可以参考一下。

## 尝试 CF Tunnel：理论可行，实际劝退

Cloudflare Tunnel 提供了一种免公网 IP 远程访问家用服务器的方法，配合 Cloudflare Zero Trust Dashboard，理论上可以通过 `cloudflared` 进程将 SSH 流量穿透到 Cloudflare，然后在外网访问。

但开始跟着官方教程研究以后，我就傻眼了。官方教程中的很多按键和界面选项在实际的当前版本中都找不到，而且配置过程非常复杂，茶老师也帮不到我，它给的方式都不适用于当前版本（说实话 Cloudflare 家的产品好像都有类似的问题，更新频率太快，文档跟不上）。我后来还不想放弃，跟着 YouTube 的教程研究看看能不能行，最后还是失败了。

于是我回想起来一开始想要解决的问题，为什么要 CF Tunnel 这么复杂的东西，我又不是想要在家里搭网站服务器，只是想要用 SSH，所以我选择用 Tailscale。

## 使用 Tailscale：低延迟 + 简单易用

首先简单介绍一下，Tailscale 基于 WireGuard，提供了一种零配置的内网穿透方式。它的优点包括：

- **P2P 连接**：尽可能实现点对点连接，不经过第三方服务器，延迟低。
- **自动 NAT 穿透**：不需要手动配置端口转发，能自动适配大多数网络环境。
- **支持多设备同步**：可以在多个设备上共享同一个 Tailscale 网络。
- **无需公网 IP**：适用于家庭宽带、校园网等环境（它提供的 IP 并不是一个公网 IP）。

### 在 Ubuntu 上安装配置 OpenSSH

Ubuntu 系统并不会预装 SSH，macOS 预装了。首先，确保你的 Ubuntu 机器上已经安装了 OpenSSH 服务：

```bash
ssh -V
```

如果是 `Command not found`，那么就需要安装（安装过了的话直接跳过这部分即可）：

```bash
sudo apt update
sudo apt install openssh-server
```

等待安装结束后设置开机自启动：

```bash
sudo systemctl enable --now ssh
```

### 在 macOS 中生成 ssh 密钥（可选）

如果想要为你的 SSH 更加一层安全性，而且省去每次输入密码的麻烦，可以在 macOS 上生成 SSH 密钥（替换 `example@email.com` 为你的邮箱）：

```bash
ssh-keygen -t ed25519 -C "example@email.com"
```

然后一路回车，生成密钥对。

在 macOS 中获取到你的公钥：

```bash
cat ~/.ssh/id_ed25519.pub
```

在 Ubuntu 机器上，将公钥添加到 `~/.ssh/authorized_keys` 文件中（替换 `your-public
-key` 为你的公钥）：

```bash
mkdir -p ~/.ssh
echo "your-public-key" >> ~/.ssh/authorized_keys
```

最后修改你 Ubuntu 中的 SSH 配置文件，关闭密码登录，只允许密钥登录：

```bash
sudo nano /etc/ssh/sshd_config
```

找到下面的内容，删除 `#` 并修改为对应的值：

```plaintext
PasswordAuthentication no
PermitRootLogin no
PubkeyAuthentication yes
```

修改完成后，<kbd>Ctrl</kbd> `+` <kbd>X</kbd> -> <kbd>Y</kbd> -> <kbd>Enter</kbd> 保存并退出。

最后在你的 Ubuntu 中重启 SSH 服务：

```bash
sudo systemctl restart ssh
```

这样你就可以通过 SSH 密钥登录 Ubuntu 机器了（无需输入密码）。

### 在 Ubuntu 上安装 Tailscale

首先，在 Ubuntu 服务器上安装 Tailscale：

```bash
curl -fsSL https://tailscale.com/install.sh | sh
```

然后启用并登录：

```bash
sudo tailscale up
```

这时候需要用浏览器（不是必须 Ubuntu 里面的，任何设备都行）打开 Tailscale 提供的授权 URL，登录自己的账户（支持 Google、GitHub 等多种登录方式）。

授权完成后，它会自动告诉你当前机器的 IP，也可以在网页端 Dashboard 查看，当然你也可以手动查看：

```bash
tailscale ip
```

你会看到 Tailscale 分配的内网 IP（通常是 `100.x.x.x` 这样的地址），这个 IP 就是你在外面访问 Ubuntu 机器的地址。

### 在 Mac 上配置 VSCode 远程连接

> 如果你使用的是 Windows，可以参考 [Windows 下的官方安装教程](https://tailscale.com/download/windows)，其他步骤基本一致。

在 MacBook 上，先安装 Tailscale：

```bash
brew install --cask tailscale
```

然后登录 Tailscale，确保 MacBook 也加入了同一个 Tailscale 网络（登陆同一个账号）。

接着，在 Mac 上测试 SSH 连接，`user` 是 Ubuntu 机器上的用户名，`100.x.x.x` 是 Tailscale 分配的 IP：

```bash
ssh user@100.x.x.x
```

如果能够成功连接，就可以在 VSCode 里安装 [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) 插件，并在 `~/.ssh/config` 里添加配置（可以通过左侧侧边栏里的 Remote Explorer 面板打开设置文件）：

- `Host`：自定义的主机名，用于在 VSCode 里识别。
- `HostName`：Tailscale 分配的 IP。
- `User`：Ubuntu 机器上的用户名。
- `IdentityFile`：SSH 私钥文件路径（如果你通过 SSH 密码登录，可以省略）。

```plaintext
Host ubuntu-home
    HostName 100.x.x.x
    User user
    IdentityFile ~/.ssh/id_ed25519
```

然后，在 VSCode 里打开 **Remote Explorer**，选择 `ubuntu-home` 连接，就可以在 VSCode 里无缝操作家里的 Ubuntu 机器了。

## 总结

使用 Tailscale 连接后，SSH 基本上像在局域网内一样，并不会有明显的延时，你当然也可以通过 Terminal 直接去连接 SSH，不是非得通过 VSCode（我使用 VSCode 只是因为我基本只用它作为我的 IDE）。配置非常简单快捷，不需要手动配置太多东西，总共也就是几分钟的事情，而且也是免费的。
