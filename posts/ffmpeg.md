---
title: FFmpeg的安装与基础使用教程
date: '2020-11-21 11:58:00'
thumbnail: /images/projects/ffmpeg.png
categories:
  - 软件
tags:
  - FFmpeg
  - 音视频
---

## 介绍

FFmpeg 是一个开放源代码的自由软件，可以运行音频和视频多种格式的录影、转换、流功能，包含了 libavcodec ——这是一个用于多个项目中音频和视频的解码器库，以及 libavformat ——一个音频与视频格式转换库。 “FFmpeg”这个单词中的“FF”指的是“Fast Forward”。

<!--more-->

## 安装

本文只单独介绍如何在Windows和macOS下安装FFmpeg，暂不讨论在Linux下的情况。
FFmpeg的官网为[https://ffmpeg.org/download.html](https://ffmpeg.org/download.html 'FFmpeg官网下载')

### Windows

1. 首先打开上面的官网下载链接，找到Windows模块下的 **Windows builds by BtbN**
   ![FFmpeg Windows 下载](https://s2.loli.net/2025/04/17/ycpF2DdoMVWHAJ8.jpg)
2. 在新打开的 GitHub Release 的页面中看 Assets 部分，这里面倒数第三个 **ffmpeg-master-latest-win64-gpl-shared.zip** （如红箭头所示）的链接直接点击下载FFmpeg的最新版压缩包。
   ![Release](https://s2.loli.net/2025/04/17/svZy2zhIbPWdJBp.jpg)
3. 下载下来的压缩包先**解压**，然后将解压后的文件夹放至你不会随意删掉或改动为止的路径下(如C盘的Program Files但不是必须放到C盘)。
4. 复制ffmpeg解压后文件夹内的**bin文件夹路径**(如下图所示)
   ![复制bin文件夹路径](https://r2.img.zla.app/2024/11/25/7b1094e4.webp)
5. 打开 **设置-系统-关于-高级系统设置**
   ![设置-系统](https://r2.img.zla.app/2024/11/25/a44308f1.webp)
   ![系统-关于-高级系统设置](https://r2.img.zla.app/2024/11/25/9a7ac530.webp)
6. 打开高级系统设置后点开 **环境变量** ，找到系统变量中的 **Path变量** 双击点开。
   ![环境变量](https://r2.img.zla.app/2024/11/25/7859fb86.webp)
   ![Path变量](https://r2.img.zla.app/2024/11/25/aab5af76.webp)
7. 新打开的页面点击右边的 **新建** ,粘贴进去在第四步复制的bin文件夹链接
   ![新建变量](https://r2.img.zla.app/2024/11/25/27a451f6.webp)
8. 添加完后一步一步确定-确定-确定。
9. win+R，输入cmd，回车，打开cmd
   ![win+R](https://r2.img.zla.app/2024/11/25/9a667afa.webp)
10. 输入FFmpeg并回车测试是否安装成功，显示类似下图即为安装成功
    ![cmd-FFmpeg](https://r2.img.zla.app/2024/11/25/d21c5337.webp)

### macOS

1. command+空格打开聚焦搜索，输入terminal并回车打开终端
   ![terminal](https://r2.img.zla.app/2024/11/25/ecb82191.webp)
2. 输入下述命令安装homebrew

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
   ```

   homebrew安装过程中可能会需要root权限(管理员权限)，届时需要输入你的系统密码，输入时不会显示你输入的内容，输入完成回车即可

3. homebrew安装完成后输入下述命令安装ffmpeg

   ```bash
   brew install ffmpeg
   ```

4. 安装完成后输入ffmpeg测试是否安装成功，显示类似下图即为安装成功
   ![ffmpeg测试](https://r2.img.zla.app/2024/11/25/6f47cf46.webp)

### Linux

对于 Ubuntu/Debian 系统可以使用下述命令安装

```bash
sudo apt update
sudo apt install ffmpeg
```

对于 RedHat/CentOS 系统可以使用下述命令安装

```bash
sudo yum install epel-release
sudo yum install ffmpeg
```

对于 Arch Linux 系统可以使用下述命令安装

```bash
sudo pacman -S ffmpeg
```

## 基础使用

### 格式转换

FFmpeg转换格式最简单最常用的命令如下(请注意视频名称内若有空格请用英文状态下的**""**将其括起来，若视频名称里本来就有"则要使用英文状态下的**''**将其括起来)：

```bash
ffmpeg -i input.xxx output.xxx
```

例如我们有原视频a.mov想要转成mp4格式并更改文件名为b我们可以使用如下命令

```bash
ffmpeg -i a.mov b.mp4
```

mkv解封，直接复制音频与视频流到mp4中进行重新封装(此方式适用于flv格式，例如B站下下来的)，由于不需要重新编码，此代码的转换速度取决于你电脑的硬盘速度。

```bash
ffmpeg -i a.mkv -vcodec copy -acodec copy b.mp4
```

### 视频压缩

FFmpeg压缩视频应使用类似如下格式的命令：

```bash
ffmpeg -i input.mp4 -r 10 -b:a 32k output.mp4 #对它降低fps和音频码率的方法大大压缩文件大小，而清晰度不变。
#或者
ffmpeg -i input.mp4 -vcodec libx264 -crf 22 output.mp4 #将原视频转换成H.264格式并压缩，只压缩码率，其他不变
#再或者
ffmpeg -i input.webm -vcodec libx264 -crf 20 -acodec aac output.mp4 #将YouTube vp9编码转换为h264编码
```

命令选项介绍
-r 码率
-b:a 音频码率
-vcodec 视频编码
-crf 控制不变码率(量化比例的范围为0 ~ 51，其中0为无损模式，23为缺省值，51可能是最差的，推荐日常使用18-22。)
-acodec 音频编码
如果想要在转码压制视频时保持音频不对音频进行处理请在命令行里加入下述命令直接复制音频流到新的视频里可保存原视频同等的音频流。

```bash
-acodec copy
```

### 转换视频到gif

FFmpeg转换视频到gif可使用下述命令

```bash
#把视频的前 30 帧转换成一个 Gif
ffmpeg -i in.mp4 -vframes 30 -f gif out.gif

#将视频转成 gif 将输入的文件从 (-ss) 设定的时间开始以 10 帧频率，输出到 320x240 大小的 gif 中，时间长度为 -t 设定的参数。
ffmpeg -ss 00:00:00.000 -i in.mp4 -pix_fmt rgb24 -r 10 -s 320x240 -t 00:00:10.000 out.gif
```

## 进阶使用

### 音视频编码转换

-vcodec 可以用来选择你索要使用的编码器(如h264/hevc/mpeg4)，例如：

```bash
ffmpeg -i in.mp4 -vcodec h264 out.mp4
ffmpeg -i in.mp4 -vcodec hevc out.mp4
ffmpeg -i in.mp4 -vcodec mpeg4 out.mp4
```

额外的选项：-s 指定分辨率，-b 指定比特率，-r 指定帧率，-acodec 指定音频编码，-ab 指定音频比特率，-ac 指定声道数，例如：

```bash
ffmpeg -i in.mp4 -s 1920x1080 -b 200k -vcodec h264 -r 60 -acodec libfaac -ab 48k -ac 2 out.mp4
```

转换封装保留编码和其他选项(如mkv或flv解封装后重新封装为mp4)，例如：

```bash
ffmpeg -i in.mkv -vcodec copy -acodec copy out.mp4
ffmpeg -i in.flv -vcodec copy -acodec copy out.mp4
```

### 合并视频

我们经常会需要将两个视频合并到一起，可以使用以下命令进行合并：

1. 对于 .ts 格式的视频文件，可以使用以下命令：

   ```bash
   ffmpeg -i "concat:1.ts|2.ts" -acodec copy -vcodec copy -absf aac_adtstoasc output.mp4
   ```

2. 对于 .mp4（或其他）格式的视频文件，麻烦一些，遵循下述步骤：

   1. 首先创建一个文本文件，命名为**filelist.txt**，内容如下：

      ```txt
      file '1.mp4'
      file '2.mp4'
      ```

   2. 然后使用以下命令进行合并：

      ```bash
      ffmpeg -f concat -safe 0 -i filelist.txt -c copy output.mp4
      ```

### 更改视频分辨率或比例

视频分辨率可以使用-s来指定，视频比例可以使用-aspect来指定，例如：

```bash
ffmpeg -i input.mp4 -s 1280x720 -acodec copy output.mp4
ffmpeg -i input.mp4 -aspect 16:9 output.mp4
```

### 剪辑视频和裁剪视频画面

一些基础的剪辑视频和画面裁剪也可以通过FFmpeg实现
-ss表示开始的时间，-t表示时间的长度 例如：

```bash
#从30s开始截取10秒的视频并封装进h264，aac编码的out.mp4里
ffmpeg -i in.mp4 -ss 00:00:30 -t 00:00:10 -acodec aac -vcodec h264 out.mp4

#将1920x1080的视频截取中间的1080x1080部分，crop的参数选择为width:height:x:y，width:height为裁剪后的视频分辨率，x:y为裁剪出来的左上角的点的坐标，故本视频需要为x轴(1920-1080)/2=420，y轴不变故用0占位。
ffmpeg -i in.mp4 -vf crop=1080:1080:420:0 -acodec aac out.mp4
```

### 提取(去除)视频中的视频(或音频)

-an 为去除音频，-vn 为去除视频，例如：

```bash
#去除视频中的音频(提取视频)
ffmpeg -i in.mp4 -vcodec copy -an out.mp4

#去除视频中的视频(提取音频)
ffmpeg -i in.mp4 -acodec copy -vn out.mp4
```

### 合并音视频

本操作等同于将纯视频(无音频)的视频里的视频流和单独的音频文件里的音频流进行合并，例如：

```bash
ffmpeg –i in.mp4 –i in.mp3 –vcodec copy –acodec copy out.mp4
```

### 旋转视频

将视频按照弧度制进行旋转，使用-vf rotate=参数，例如：

```bash
#将视频旋转90度
ffmpeg -i in.mp4 -vf rotate=PI/2 out.mp4
```

### 视频(音频)变速

视频变速使用-filter:v setpts=参数，音频变速使用-filter:a atempo=参数，例如：

```bash
#将视频调整为0.5倍速
ffmpeg -i in.mp4 -filter:v setpts=0.5*PTS out.mp4

#音频变速为原先的两倍
ffmpeg -i in.mp3 -filter:a atempo=2.0 out.mp3
```

## 总结

FFmpeg是一个非常厉害的格式转化与压制的软件，虽然没有GUI，但是只要掌握了几个基本的命令就足以完成绝大多数人的使用需求，Windows、macOS、Linux全平台试用。而且由于FFmpeg是一个开源软件，所以你可以根据你的个性化需求对该软件进行定制。同样如果你有更多的使用需求可以去查阅FFmpeg的官方文档选择你所需要的参数。如果对本文中有任何建议或者问题欢迎在下方评论区留言~
