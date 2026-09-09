---
title: Python 数据分析环境搭建
description: 讲解 Anaconda 的安装、虚拟环境管理与包管理,以及 Jupyter Notebook 的启动、界面、功能扩展与常用快捷键,帮助独立完成开发环境搭建。
keywords: Python 数据分析环境搭建,Anaconda,Jupyter Notebook,虚拟环境,conda,pip,Jupyter 快捷键,海南省经济技术学校
---

## 学习目标

- 能够 独立完成 Anaconda 开发环境搭建
- 掌握 Anaconda 的使用方法
- 掌握 Jupyter Notebook 的基本使用

## 1. 开发环境搭建

### 1.1 简介

![chapter01-08](/data-analysis/chapter01-08.webp)

- Anaconda 是最流行的数据分析平台,全球两千多万人在使用
- Anaconda 附带了一大批常用数据科学包

  > 1）conda
  > 2）Python
  > 3）集成 150 多个科学包及其依赖项(默认的 base 环境)

- Anaconda 是在 conda(一个包管理器和环境管理器)上发展出来的

  > 1）conda 可以帮助你在计算机上安装和管理数据分析相关包
  > 2）Anaconda 的仓库中包含了 7000 多个数据科学相关的开元库

- Anaconda 包含了虚拟环境管理工具

  > 通过虚拟环境可以使不同的 Python 或者开源库的版本同时存在

- Anaconda 可用于多个平台(Windows、Mac OS X 和 Linux)
- 我们平时使用 Anaconda 自带的 jupyter notebook 来进行开发,Anaconda 是工具管理器,jupyter notebook 是代码编辑器(类似于 PyCharm,但 jupyter notebook 是基于 html 网页运行的)

### 1.2 安装

![chapter01-08](/data-analysis/chapter01-08.webp)

- 可以在官网上[下载](https://www.anaconda.com/products/individual)对应平台的安装包
- 本课程中使用的版本为:Anaconda Navigator 1.10.0
- 如果计算机上已经安装了 Python,安装不会对你有任何影响
- 安装的过程很简单,一路下一步即可;这里以 win10 系统作为下载安装演示仅供大家参考

1）访问 [https://www.anaconda.com/products/individual](https://www.anaconda.com/products/individual),如下图所示点击下载:

![chapter01-09](/data-analysis/chapter01-09.webp)

2）根据你的操作系统来选择相应的版本下载

![chapter01-10](/data-analysis/chapter01-10.webp)

3）点击安装

![chapter01-11](/data-analysis/chapter01-11.webp)

4）选择操作系统中的用户

![chapter01-12](/data-analysis/chapter01-12.webp)

5）选择安装路径

![chapter01-13](/data-analysis/chapter01-13.webp)

6）建议都勾选,自动添加环境变量,自动安装 python

![chapter01-14](/data-analysis/chapter01-14.webp)

7）等待安装

![chapter01-15](/data-analysis/chapter01-15.webp)

8）安装完毕

![chapter01-16](/data-analysis/chapter01-16.webp)

9）勾选使用个人版

![chapter01-17](/data-analysis/chapter01-17.webp)

10）安装好之后部分版本不会在你的桌面创建快捷方式,但是在开始菜单的最近添加中我们可以看到安装好的 anaconda3 图标,点击就可以打开 anaconda 了

![chapter01-18](/data-analysis/chapter01-18.webp)

## 2. Anaconda 的使用

### 2.1 Anaconda 的界面

1）安装好 Anaconda 后点击图标,可以打开 Anaconda 的管理面板

![chapter01-19](/data-analysis/chapter01-19.webp)

### 2.2 Anaconda 的虚拟环境管理

#### 2.2.1 什么是虚拟环境?

> 不同的 python 项目,可能使用了各自不同的 python 的包、模块;
> 不同的 python 项目,可能使用了相同的 python 的包、模块,但版本不同;
> 不同的 python 项目,甚至使用的 Python 的版本都是不同;

为了让避免项目所使用的 Python 及包模块版本冲突,所以需要代码运行的依赖环境彼此分开,业内有各种各样的成熟解决方案,但原理都是一样的:**不同项目代码的运行,使用保存在不同路径下的 python 和各自的包模块;不同位置的 python 解释器和包模块就称之为虚拟环境。**

具体关系图如下:

![虚拟环境和项目的关系](/data-analysis/chapter01-20.webp)

> **虚拟环境的本质,就是在你电脑里安装了多个 Python 解释器(可执行程序),每个 Python 解释器又关联了很多个包、模块;项目代码在运行时,是使用特定路径下的那个 Python 解释器来执行**

虚拟环境的作用:

- 很多开源库版本升级后 API 有变化,老版本的代码不能在新版本中运行
- 将不同 Python 版本/相同开源库的不同版本隔离
- 不同版本的代码使用不同的虚拟环境运行

#### 2.2.2 通过 Anaconda 界面创建虚拟环境

![chapter01-21](/data-analysis/chapter01-21.webp)

#### 2.2.3 通过命令行创建虚拟环境

1）在 Anaconda 管理界面打开 cmd 命令行终端

![chapter01-19](/data-analysis/chapter01-19.webp)

2）命令行终端对虚拟环境的操作命令如下:

```bash
conda create -n 虚拟环境名字 python=3.8  # 创建虚拟环境 python=3.8 指定python版本
conda activate 虚拟环境名字 # 进入虚拟环境
conda deactivate 虚拟环境名字 # 退出虚拟环境
conda remove -n 虚拟环境名字 --all  # 删除虚拟环境
```

### 2.3 Anaconda 的包管理功能

#### 2.3.1 通过 Anaconda 管理界面安装包

1）点击 Environment 选项卡,进入到环境管理界面,通过当前管理界面安装 python 的包模块

![chapter01-23](/data-analysis/chapter01-23.webp)

#### 2.3.2 通过 Anaconda 提供的 CMD 终端工具进行 python 包的安装

1）在 Anaconda 管理界面打开 cmd 命令行终端

![chapter01-19](/data-analysis/chapter01-19.webp)

2）可以通过 conda install 安装【不推荐】

```bash
conda install 包名字
```

3）但更推荐使用 pip 命令来安装 python 的第三方包【推荐】

```bash
pip install 包名字
```

4）安装其他包速度慢可以指定国内镜像

```bash
# 阿里云：https://mirrors.aliyun.com/pypi/simple/
# 豆瓣：https://pypi.douban.com/simple/
# 清华大学：https://pypi.tuna.tsinghua.edu.cn/simple/
# 中国科学技术大学 http://pypi.mirrors.ustc.edu.cn/simple/

pip install 包名 -i https://mirrors.aliyun.com/pypi/simple/  # 通过阿里云镜像安装
```

## 3. Jupyter Notebook 的使用

### 3.1 启动 Jupyter Notebook

#### 3.1.1 可以通过 Anaconda 启动 Jupyter Notebook

::: tip
注意：这种方式直接启动 Jupyter notebook,无法打开当前所在磁盘以外的其他磁盘上的文件
:::

![chapter01-25](/data-analysis/chapter01-25.webp)

#### 3.1.2 推荐通过终端启动 Jupyter Notebook

::: tip
注意：这种方式先启动 cmd,通过切换虚拟环境和磁盘位置,再启动 Jupyter notebook
:::

1）在启动 Anaconda 提供的 CMD 后,输入命令如下:

```bash
# 可选操作,切换虚拟环境,使用不同的python解释器和包
conda activate 虚拟环境名字

# 切换磁盘位置,可选操作
cd d:/
d:

# 启动jupyter notebook
jupyter notebook
```

![jupyter启动方式](/data-analysis/chapter01-26.webp)

2）此时浏览器会自动打开 jupyter notebook

![jupyter界面首次打开](/data-analysis/chapter01-27.webp)

### 3.2 Jupyter Notebook 的使用

#### 3.2.1 Jupyter notebook 的功能扩展

1）在启动 Anaconda 提供的 CMD 后,安装 jupyter_contrib_nbextensions 库,在 CMD 中输入下列命令

```bash
# 进入到虚拟环境中
conda activate 虚拟环境名字
# 安装 jupyter_contrib_nbextensions
pip install jupyter_contrib_nbextensions
# jupyter notebook安装插件
jupyter contrib nbextension install --user --skip-running-check
```

2）安装结束后启动 jupyter notebook

![chapter01-28](/data-analysis/chapter01-28.webp)

3）配置扩展功能,在原来的基础上勾选:"Table of Contents" 以及 "Hinterland"

![chapter01-29](/data-analysis/chapter01-29.webp)

#### 3.2.2 Jupyter Notebook 的界面

1）新建 notebook 文档

::: tip
注意：Jupyter Notebook 文档的扩展名为 `.ipynb`,与我们正常熟知的 `.py` 后缀不同
:::

![chapter01-30](/data-analysis/chapter01-30.webp)

2）新建文件之后会打开 Notebook 界面

![chapter01-31](/data-analysis/chapter01-31.webp)

3）菜单栏中相关按钮功能介绍

::: tip
注意：Jupyter Notebook 的代码的输入框和输出显示的结果都称之为 cell,cell 行号前的 \* ,表示代码正在运行
:::

![chapter01-32](/data-analysis/chapter01-32.webp)

#### 3.2.3 Jupyter Notebook 常用快捷键

Jupyter Notebook 中分为两种模式:**命令模式和编辑模式**。

1）两种模式通用快捷键:

- Shift+Enter：执行本单元代码,并跳转到下一单元
- Ctrl+Enter：执行本单元代码,留在本单元

2）**命令模式**:编辑模式下按 ESC 进入即可进入命令模式

![jupyter命令模式](/data-analysis/chapter01-33.webp)

> `Y`：cell 切换到 Code 模式
> `M`：cell 切换到 Markdown 模式
> `A`：在当前 cell 的上面添加 cell
> `B`：在当前 cell 的下面添加 cell
> `双击 D`：删除当前 cell

3）**编辑模式**:命令模式下按 Enter 进入,或鼠标点击代码编辑框体的输入区域

![jupyter编辑模式](/data-analysis/chapter01-34.webp)

> 多光标操作:`Ctrl 键点击鼠标`(Mac:CMD+点击鼠标)
> 回退:`Ctrl+Z`(Mac:CMD+Z)
> 重做:`Ctrl+Y`(Mac:CMD+Y)
> 补全代码:变量、方法后跟 `Tab 键`
> 为一行或多行代码添加/取消注释:`Ctrl+/`(Mac:CMD+/)

### 3.3 Jupyter Notebook 中使用 Markdown

::: tip
注意：在命令模式中,按 M 即可进入到 Markdown 编辑模式,使用 Markdown 语法可以在代码间穿插格式化的文本作为说明文字或笔记。
:::

1）Markdown 基本语法:标题和缩进

![chapter01-35](/data-analysis/chapter01-35.webp)

2）效果如下图显示

![jupyter的md模式](/data-analysis/chapter01-36.webp)

## 小结

- 独立完成 Anaconda 开发环境搭建
  - 安装 Anaconda 作为开发环境的管理器
- 掌握 Anaconda 的使用方法
  - Anaconda 可以管理虚拟环境
  - Anaconda 可以管理虚拟环境中的软件包
- 掌握 Jupyter Notebook 的使用方法
  - 文件扩展名为 .ipynb
  - 在 cell 中编辑代码和展示输出结果
  - 支持 Markdown 语法
