



# 基本概述

[学习 Git，看这一篇就够了！](https://mp.weixin.qq.com/s?__biz=MzU2MTIyNDUwMA==&mid=2247501590&idx=1&sn=4c1b800cd839450e84894aee6bf6f825&chksm=fc7e894dcb09005b45e81c89d5953c4ac50aefcee7f677eac53f627d8ee4a314317de37968fd&mpshare=1&scene=23&srcid=1223QEty73SsVUNBgB1vvCtq&sharer_sharetime=1671760896332&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

[我看谁还不懂 Git ！(万字干货)](https://mp.weixin.qq.com/s?__biz=MzU5NTgzMDYyMA==&mid=2247503985&idx=2&sn=a8421c6e928f49f9c66ed24af4ef9963&chksm=fe696242c91eeb54ddc78a848392cf35dffbad007ac776edf475f533b4eb0e65e8f8cd638302&mpshare=1&scene=23&srcid=0406iIU4eEorv55820LkWDJS&sharer_sharetime=1680794588354&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

[给自己点时间再记记这 200 条 Git 命令](https://mp.weixin.qq.com/s?__biz=Mzk0NzI3ODMyMA==&mid=2247516787&idx=2&sn=52d644b14c372fdac0b15c4813c5efa1&chksm=c37b9aecf40c13fae8c00cb2cc0c4d12f0c125621a736773aa6a66cd542374ea3606d426c2d3&mpshare=1&scene=23&srcid=0411LWwPJ3K52ne2tqJObUxN&sharer_sharetime=1681142878024&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

## 基本概念

Git是当前最先进、最主流的**分布式**版本控制系统，免费、开源！核心能力就是版本控制。再具体一点，就是面向代码文件的版本控制，代码的任何修改历史都会被记录管理起来，意味着可以恢复到到以前的任意时刻状态。支持跨区域多人协作编辑，是团队项目开发的必备基础，所以Git也就成了程序员的必备技能。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092045117.png" alt="image-20230409204521954" style="zoom:80%;" />

- 开源免费，使用广泛。
- 强大的文档（代码）的历史版本管理，直接记录完整快照（完整内容，而非差异），支持回滚、对比。
- 分布式多人协作的的代码协同开发，几乎所有操作都是本地执行的，支持代码合并、代码同步。
- 简单易用的分支管理，支持高效的创建分支、合并分支。

### 版本控制系统

> 版本控制是指对软件开发过程中各种程序代码、配置文件及说明文档等文件变更的管理，是软件配置管理的核心思想之一。版本控制技术是团队协作开发的桥梁，助力于多人协作同步进行大型项目开发。软件版本控制系统的核心任务就是查阅项目历史操作记录、实现协同开发。

常见版本控制主要有两种：**集中式版本控制**和**分布式版本控制**。

#### 集中式版本控制系统

> 集中式版本控制系统，版本库是集中存放在中央服务器的。**工作时，每个人都要先从中央服务器获取最新的版本。完成之后，再把自己添加/修改的内容提交到中央服务器。所有文件和历史数据都存储在中央服务器上。**SVN 是最流行的集中式版本控制系统之一。

> 集中式版本控制系统的缺点就是必须联网才能使用，如果使用局域网还好，速度会比较快。而如果是使用互联网，网速慢的话，就可能需要等待很长时间。除此之外，如果中央服务器出现故障，那么版本控制将不可用。如果中心数据库损坏，若数据未备份，数据就会丢失。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212251226826.png" alt="image-20221225122613742" style="zoom:50%;" />

#### 分布式版本控制系统

> 分布式版本控制系统，每台终端都可以保存版本库，版本库可以不同，可以对每个版本库进行修改，修改完成后可以集中进行更新。虽然它没有中心服务器，但可以有一个备份服务器，它的功能有点类似于 SVN 的中央服务器，但它的作用仅是方便交换修改，而不像 SVN 那样还要负责源代码的管理。Git 是最流行的分布式版本控制系统之一。

> 和集中式版本控制系统相比，分布式版本控制系统的安全性要高很多，因为每个人电脑里都有完整的版本库，某一个人的电脑损坏不会影响到协作的其他人。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212251226823.png" alt="image-20221225122639711" style="zoom:67%;" />

#### SVN vs Git

> **提交速度更快：** 因为在 SVN 中需要更频繁地提交到中央存储库，所以网络流量会减慢每个人的速度。而使用 Git，主要在本地存储库上工作，只需每隔一段时间才提交到中央存储库。

> **没有单点故障：** 使用 SVN，如果中央存储库出现故障，则在修复存储库之前，其他开发人员无法提交他们的代码。使用 Git，每个开发人员都有自己的存储库，因此中央存储库是否损坏并不重要。开发人员可以继续在本地提交代码，直到中央存储库被修复，然后就可以推送他们的更改；

> **可以离线使用：** 与 SVN 不同，Git 可以离线工作，即使网络失去连接，也可以继续工作而不会丢失功能。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304070911276.png" alt="image-20230407091150136" style="zoom:80%;" />

### 版本控制

> 一般情况下，一份文件，无论是DOC办公文档，还是编程源码文件，我们都会对文件进行大量的修改和变更。但是我们无法保证每一次的修改和变更都是正确并有效的，往往有的时候需要追溯历史操作，而版本控制（Revision control）是一种在开发的过程中用于管理我们对文件、目录或工程等内容的修改历史，方便查看更改历史记录，备份以便恢复以前的版本的软件工程技术。

> 没有进行版本控制或者版本控制本身缺乏正确的流程管理，在软件开发过程中将会引入很多问题，如软件代码的一致性、软件内容的冗余、软件过程的事物性、软件开发过程中的并发性、软件源代码的安全性，以及软件的整合等问题。

### 分布式系统

> 在Git中，每个版本库都是一样重要得。所以就不存在像集中式版本控制软件中以谁为主得问题。任何一个库都可以当成主库。这种方式可以更大限度地保证项目资源得安全。

### 概念汇总

| **概念名称**                            | **描述**                                                     |
| :-------------------------------------- | :----------------------------------------------------------- |
| **工作区**（Workspace）                 | 就是在电脑里能看到的代码库目录，是我们搬砖的地方，新增、修改的文件会提交到暂存区 |
| **暂存区**（stage 或 index）            | 用于临时存放文件的修改，实际上上它只是一个文件（`.git/index`），保存待提交的文件列表信息。 |
| **版本库/仓库**（Repository）           | Git的管理仓库，管理版本的数据库，记录文件/目录状态的地方，所有内容的修改记录（版本）都在这里。 |
| **服务端/远程仓库**（origin 或 remote） | 服务端的版本库，专用的Git服务器，为多人共享提供服务，承担中心服务器的角色。本地版本库通过push指令把代码推送到服务端版本库。 |
| **本地仓库**                            | 用户机器上直接使用的的的版本库                               |
| **分支**（Branch）                      | 分支是从主线分离出去的“副本”，可以独立操作而互不干扰，仓库初始化就有一个默认主分支`master`。 |
| **头**（HEAD）                          | HEAD类似一个“指针”，指向当前活动 **分支** 的 **最新版本**。  |
| **提交**（Commit）                      | 把暂存区的所有变更的内容提交到当前仓库的活动分支。           |
| **推送**（Push）                        | 将本地仓库的版本推送到服务端（远程）仓库，与他人共享。       |
| **拉取**（Pull）                        | 从服务端（远程）仓库获取更新到本地仓库，获取他人共享的更新。 |
| **获取**（Fetch）                       | 从服务端（远程）仓库更新，作用同拉取（Pull），区别是不会自动合并。 |
| **冲突**（Conflict）                    | 多人对同一文件的工作副本进行更改，并将这些更改合并到仓库时就会面临冲突，需要人工合并处理。 |
| **合并**（Merge）                       | 对有冲突的文件进行合并操作，Git会自动合并变更内容，无法自动处理的冲突内容会提示人工处理。 |
| **标签**（Tags）                        | 标签指的是某个分支某个特定时间点的状态，可以理解为提交记录的别名，常用来标记版本。 |
| **master**（或main）                    | 仓库的“`master`”分支，默认的主分支，初始化仓库就有了。Github上创建的仓库默认名字为“`main`” |
| **origin/master**                       | 表示远程仓库（`origin`）的“`master`”分支                     |
| **origin/HEAD**                         | 表示远程仓库（`origin`）的最新提交的位置，一般情况等于“`origin/master`” |

### 工作区、暂存区、仓库

> Git软件为了更方便地对文件进行版本控制，根据功能得不同划分了三个区域

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092049739.png" alt="image-20230409204921564" style="zoom:80%;" />

> **工作区**（Workspace）就是在电脑里能看到的代码库目录，是我们搬砖的地方，新增、修改的文件会提交到暂存区。在这里新增文件、修改文件内容，或删除文件。

> **暂存区**（stage或index） 用于临时存放文件的修改，实际上上它只是一个文件（.git/index），保存待提交的文件列表信息。用`git add` 命令将工作区的修改保存到暂存区。

> **版本库/仓库**（Repository /rɪˈpɑːzətɔːri/ 仓库）Git的管理仓库，管理版本的数据库，记录文件/目录状态的地方，所有内容的修改记录（版本）都在这里。就是工作区目录下的隐藏文件夹`.git`，包含暂存区、分支、历史记录等信息。用`git commit` 命令将暂存区的内容正式提交到版本库。`master` 为仓库的默认分支`master`，**HEAD**是一个“指针”指向当前分支的最新提交，默认指向最新的`master`。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092050980.png" alt="image-20230409205020822" style="zoom:80%;" />

如上图，为对应本地仓库目录的结构关系。

- `KWebNote`为项目目录，也就是Git工作区。
- 项目根目录下隐藏的`.git`目录就是Git仓库目录了，存放了所有Git管理的信息。
- `.git/config`为该仓库的配置文件，可通过指令修改或直接修改。
- `index`文件就是存放的暂存区内容。

## 基本流程

Git的工作流程核心就下面几个步骤，掌握了就可以开始写Bug了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231802658.png" alt="image-20220723180255581" style="zoom:80%;" />

0、**准备仓库**：创建或从服务端克隆一个仓库。

1、**搬砖**：在工作目录中添加、修改代码。

2、**暂存**（git add）：将需要进行版本管理的文件放入暂存区域。

3、**提交**（git commit）：将暂存区域的文件提交到Git仓库。

4、**推送**（git push）：将本地仓库推送到远程仓库，同步版本库。

5、**获取更新**（fetch/pull）：从服务端更新到本地，获取他人推送的更新，与他人协作、共享。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092052924.png" alt="image-20230409205205755" style="zoom:80%;" />

- `git commit -a`指令省略了`add`到暂存区的步骤，直接提交工作区的修改内容到版本库，不包括新增的文件
- `git fetch`、`git pull` 都是从远程服务端获取最新记录，区别是`git pull`多个步骤，自动合并更新工作区
- `git checkout .`、`git checkout [file]` 会清除工作区中未添加到暂存区的修改，用暂存区内容替换工作区。
- `git checkout HEAD .`、`git checkout HEAD [file]` 会清除工作区、暂存区的修改，用HEAD指向的当前分支最新版本替换暂存区、工作区。
- `git diff` 用来对比不同部分之间的区别，如暂存区、工作区，最新版本与未提交内容，不同版本之间等。
- `git reset`是专门用来撤销修改、回退版本的指令，替代上面`checkout`的撤销功能。

## 文件状态

Git在执行提交的时候，不是直接将工作区的修改保存到仓库，而是将暂存区域的修改保存到仓库。要提交文件，首先需要把文件加入到暂存区域中。因此，Git管理的文件有三（+2）种状态：

- 未跟踪（untracked）：新添加的文件，或被移除跟踪的文件，未建立跟踪，通过`git add`添加暂存并建立跟踪。
- 未修改：从仓库签出的文件默认状态，修改后就是“已修改”状态了。
- **已修改**（modified）：文件被修改后的状态。
- **已暂存**（staged）：修改、新增的文件添加到暂存区后的状态。
- **已提交**(committed)：从暂存区提交到版本库。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092051483.png" alt="image-20230409205124298" style="zoom:80%;" />

## 使用场景

### 场景一：备份

小明负责的模块就要完成了，就在即将Release之前的一瞬间，电脑突然蓝屏，硬盘光荣牺牲！几个月
来的努力付之东流

### 场景二：代码还原

这个项目中需要一个很复杂的功能，老王摸索了一个星期终于有眉目了，可是这被改得面目全非的
代码已经回不到从前了。什么地方能买到哆啦A梦的时光机啊？

### 场景三：协同开发

小刚和小强先后从文件服务器上下载了同一个文件：Analysis.java。

小刚在Analysis.java文件中的第30行声明了一个方法，叫count()，先保存到了文件服务器上；

小强在Analysis.java文件中的第50行声明了一个方法，叫sum()，也随后保存到了文件服务器上，于是，count()方法就只存在于小刚的记忆中了

### 场景四：追溯问题代码

老王是另一位项目经理，每次因为项目进度挨骂之后，他都不知道该扣哪个程序员的工资！就拿这次来说吧，有个Bug调试了30多个小时才知道是因为相关属性没有在应用初始化时赋值！可是二胖、王东、刘流和正经牛都不承认是自己干的！

## 学习资源

### git help

其实我个人使用最多的是`git help`,真心方便又好用啊！比如 `git help pull`:

先介绍了有哪些参数，然后 description 详细解释了它的工作原理，下面还有图解，有木有太香！！

不过这种方式更像是 `cheatsheet`，当你已经知道了这个命令、只是忘了它的用法的时候去查。

如果你想系统的学习，那么下面 👇 的更适合你。

### Pro Git

这本书是强烈推荐了！！Pro Git 这本书不仅讲了 Git 的基础用法、高级用法，以及最后还深入讲解了 Git 的原理，非常细致全面。书的电子版也能在网站上直接下载。

英文版：`https://git-scm.com/book/en/v2`

中文版：`https://git-scm.com/book/zh/v2`

### Git Game

Practice makes perfect!

推荐一个宝藏资源：玩游戏来练 Git

项目：`https://github.com/pcottle/learnGitBranching`

网址：`https://learngitbranching.js.org/`

我熟悉很多工具都是通过小游戏来练习的，比如 vim 的操作，还是蛮推荐这种方式的。就不剧透啦，大家自己去探索吧

## 注意事项

### SSH公钥错误

![img](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304062024712.jpg)

一般出现如上错误，就是Git远程仓库的SSH免密公钥和推送用户提供的公钥不一致导致的。

### IDEA集成Gitee失败

如果IDEA集成Gitee时，向远程仓库push代码失败，且没有弹出账号窗口，可以尝试修改IDEA得相关配置。

### 解决GitBash乱码问题(可选)

打开GitBash执行下面命令

```apl
git config --global core.quotepath false
```

vi    ${git_home}/etc/bash.bashrc 文件最后加入下面两行

```apl
export LANG="zh_CN.UTF-8"
export LC_ALL="zh_CN.UTF-8"
```

### 使用铁令⭐

> **切换分支前先提交本地的修改**
>
> **代码及时提交，提交过了就不会丢**
>
> **遇到任何问题都不要删除文件目录**

# 安装和配置

> 最早Git是在Linux上开发的，很长一段时间内，Git也只能在Linux和Unix系统上跑。不过，有人把它移植到了Windows上。现在，Git可以在Linux、Unix、Mac和Windows这几大平台上正常运行了。由于开发机大多数情况都是windows，此处我们下载Windows系统的2.40.0版本软件

## 下载与安装

软件官网地址为：https://git-scm.com/

软件下载地址为：[Git-2.40.0-64-bit.exe](https://github.com/git-for-windows/git/releases/download/v2.40.0.windows.1/Git-2.40.0-64-bit.exe)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210930162941925.png" alt="image-20210930162941925" style="zoom:67%;" />

下载完成后可以得到如下安装文件：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304070925385.png" alt="image-20230407092502301" style="zoom:80%;" />

> 双击下载的安装文件来安装Git。安装完成后在电脑桌面（也可以是其他目录）点击右键，如果能够看,到如下两个菜单则说明Git安装成功。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210930163036923.png" alt="image-20210930163036923" style="zoom:67%;" />

> - Git GUI：Git提供的图形界面工具
>
> - Git Bash：Git提供的命令行工具

## 验证安装

此处仅仅是为了验证Git软件安装的效果，所以选择Git Bash Here菜单, 选择后，Windows系统弹出Git软件的命令行黑窗口，窗口弹出后，可以输入Git软件的操作指令。此时我们使用键盘输入操作指令：git -v或 git --version，查看当前Git软件的安装版本。输入指令回车后，如果黑窗口中打印出咱们安装的软件版本2.40.0，Git软件安装成功了。

```sh
git --version
```

当安装Git后首先要做的事情是设置用户名称和email地址。这是非常重要的，因为每次Git提交都会使用该用户信息

## 配置文件

Git有三个主要的配置文件：三个配置文件的优先级是**① < ② < ③**

**① 系统全局配置**(--system)：包含了适用于系统所有用户和所有仓库（项目）的配置信息，存放在Git安装目录下`C:\Program Files\Git\etc\gitconfig`。

**② 用户全局配置**(--system)：当前系统用户的全局配置，存放用户目录：`C:\Users\[系统用户名]\.gitconfig`

**③ 仓库/项目配置**(--local)：仓库（项目）的特定配置，存放在项目目录下`.git/config`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092056958.png" alt="image-20230409205605772" style="zoom:80%;" />

```sh
#查看git配置
git config --list
git config -l
 
#查看系统配置
git config --system --list
 
#查看当前用户（global）全局配置
git config --list --global
 
#查看当前仓库配置信息
git config --local  --list
```

仓库的配置是上面多个配置的集合：

```sh
$ git config --list
$ git config -l
diff.astextplain.textconv=astextplain
http.sslbackend=openssl
http.sslcainfo=C:/Program Files/Git/mingw64/ssl/certs/ca-bundle.crt
core.autocrlf=true
core.fscache=true
core.symlinks=false
pull.rebase=false
credential.helper=manager-core
credential.https://dev.azure.com.usehttppath=true
init.defaultbranch=master
user.name=Kanding
user.email=123anding@163.com
```

## 免密登录

当安装Git后首先要做的事情是配置你的用户信息—— 告诉Git你是谁？配置 **用户名**、**邮箱地址**，每次提交文件时都会带上这个用户信息，查看历史记录时就知道是谁干的了。`--global`：`config`的参数，表示用户全局配置。如果要给特定仓库配置用户信息，则用参数`--local`配置即可，或直接在仓库配置文件`.git/config`里修改。

[(191条消息) Git配置免密登录及常用操作的详细教程(基于Gitee平台)_git免密_Wh1T3ZzT的博客-CSDN博客](https://blog.csdn.net/weixin_44748171/article/details/128224747)

```sh
git config --global user.name "renshuo"
git config --global user.email "1597374863@qq.com"
```

```sh
# 注册 Gitee 账号时填写的邮箱
ssh-keygen -t rsa -b 4096 -C "1597374863@qq.com"
```

> 连续敲击 3 次回车，即可在 C:Users\用户名文件夹.ssh 目录中生成 id rsa 和 id rsa.pub 两个文件

> Linux的在/root/.ssh

> 使用记事本打开 id rsa.pub 文件，复制里面的文本内容

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230618094244768.png" alt="image-20230618094244768" style="zoom:80%;" />

```sh
ssh -T git@gitee.com
```



# 基础命令

## 基础命令

> Git软件是免费、开源的。最初Git软件是为辅助 Linux 内核开发的一套软件，所以在使用时，简单常用的linux系统操作指令是可以直接使用的

| **指令**         | **含义**                 | **说明**                                 |
| ---------------- | ------------------------ | ---------------------------------------- |
| cd 目录          | change directory         | 改变操作目录                             |
| cd ..            |                          | 退回到上一级目录                         |
| pwd              | Print work  directory    | 打印工作目录                             |
| ls               | list directory  contents | 显示当前目录的文件及子文件目录           |
| ll               | ls -l 简化版本           | 更详细地显示当前目录的文件及子文件目录   |
| mkdir 文件夹名称 | make directory           | 新建一个文件夹                           |
| rm 文件          | remove                   | 删除文件                                 |
| rm -r 文件夹     | Remove                   | 删除文件目录                             |
| touch 文件       |                          | 如果创建的文件不存在，那么创建一个空文件 |
| reset            |                          | 清屏                                     |
| clear            |                          | 清屏                                     |
| exit             |                          | 退出终端窗口                             |

## 初始化

### 帮助命令

git 内置了对命令非常详细的解释，可以供我们快速查阅

```sh
# 查找可用命令
$ git help
# 查找所有可用命令
$ git help -a
# 在文档当中查找特定的命令
# git help <命令>
$ git help add
$ git help commit
$ git help init
```

### 配置信息

作为一个工具软件来讲，一般都会有默认的配置文件来保存基础的配置信息

Git软件的配置文件位置为：**Git安装路径/etc/gitconfig**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072131044.png" alt="image-20230407213154924" style="zoom:80%;" />

默认情况下，我们可以通过指令获取软件的配置信息：

```sh

# 显示当前的Git配置，git config -l
$ git config --list

# 编辑Git配置文件
$ git config -e [--global]

# 输出、设置基本的全局变量
$ git config --global user.email
$ git config --global user.name

$ git config --global user.email "MyEmail@gmail.com"
$ git config --global user.name "My Name"

# 定义当前用户所有提交使用的作者邮箱。
$ git config --global alias.<alias-name> <git-command>

# 为Git命令创建一个快捷方式（别名）。
$ git config --system core.editor <editor>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072132716.png" alt="image-20230407213235589" style="zoom:80%;" />

### 名称和邮箱

> 如果你是第一回使用Git软件，需要告诉Git软件你的名称和邮箱，否则是无法将文件纳入到版本库中进行版本管理的。这是因为在多人协作时，不同的用户可能对同一个文件进行操作，所以Git软件必须区分不同用户的操作，区分的方式就是名称和邮箱。

> 当然了，你可能会说我就用本地库就行了，不需要进行多人协作，是不是就可以不用配置呢。这是不行的，因为Git软件的设计初衷本身就是针对于linux系统的分布式开发协同工作，所以它天生就是用于分布式协同工作的，这里无论你是否使用这个功能，它本身就是这么设计的。所以是一定要配置的，否则就会出现如下提示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072132946.png" alt="image-20230407213251812" style="zoom:80%;" />

当然了，配置的过程并不复杂，输入相关指令即可

```sh
git config --global user.name '任硕'
git config --global user.email 1597374863@qq.com
```

> 这里的--global表示全局配置，后续的所有文件操作都会使用该用户名称及邮箱。此时在操作系统的用户目录，会产生新的配置文件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072133539.png" alt="image-20230407213323430" style="zoom:80%;" />

文件中就包含了刚刚增加的配置信息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072133453.png" alt="image-20230407213336350" style="zoom:80%;" />

### 缓存名称和邮箱

我想缓存一个仓库(repository)的用户名和密码.你可能有一个仓库需要授权，这时你可以缓存用户名和密码，而不用每次推/拉(push/pull)的时候都输入，Credential helper能帮你。

```sh
# Set git to use the credential memory cache  
git config --global credential.helper cache  
# Set the cache to timeout after 1 hour (setting is in seconds)  
git config --global credential.helper 'cache --timeout=3600'  
```

## 仓库操作

### 初始化版本库

> Git软件主要用于管理文件的版本信息，但它只是一个软件，不可能安装后就直接将系统中所有的文件全部纳入到它的管理范畴中。并且，软件管理版本信息的主要目就是管理文件的修改和变更，如果将系统中所有文件都进行管理其实意义是不大的。所以一般情况下，我们需要指定某一个文件目录作为软件的管理目录。因为这个目录主要就作为Git软件的管理文件的版本变化信息，所以这个目录也称之为Git软件的版本仓库目录。

创建一个新的 git 版本库。这个版本库的配置、存储等信息会被保存到.git 文件夹中

```sh
# 初始化当前项目
$ git init

# 新建一个目录，将其初始化为Git代码库
$ git init [project-name]

# 在指定目录创建一个空的 Git 仓库。运行这个命令会创建一个名为 directory，只包含 .git 子目录的空目录。
$ git init --bare <directory>

# 下载一个项目和它的整个代码历史
# 这个命令就是将一个版本库拷贝到另一个目录中，同时也将分支都拷贝到新的版本库中。
# 这样就可以在新的版本库中提交到远程分支
$ git clone [url]
```

版本库创建成功后，会在目录中创建.git目录，用于管理当前版本库。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072134072.png" alt="image-20230407213442960" style="zoom:80%;" />

### 向版本库中添加文件

虽然创建了版本库，但是现在版本库中还没有任何的文件，所以这里我们先手动创建文件：test.txt

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072134989.png" alt="image-20230407213457872" style="zoom:80%;" />

因为文件已经放置在版本库中了。所以可以通过软件的指令查看版本库状态

```sh
git status
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072135661.png" alt="image-20230407213521533" style="zoom: 80%;" />

此时会发现，test.txt文件属于untracked files（未追踪文件）,这里表示当前的test.txt文件虽然放置到了版本库的文件目录中，被Git软件识别到了，但是未纳入到版本库管理中。所以属于未追踪文件。通过这个现象可以认为，系统文件夹物理目录和版本库管理目录的含义是不一样的。只有文件被纳入到版本库管理后，Git软件才能对文件修改后的不同版本内容进行追踪处理，也就是所谓的tracked files了。那么如何将文件纳入到版本库的管理呢，这就需要我们执行以下命令了：

\#这里的文件是需要提供扩展名的

```
git add test.txt
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072135279.png" alt="image-20230407213544131" style="zoom:80%;" />

此时你再查看版本库状态，就会发现文件状态的变化。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072136911.png" alt="image-20230407213607780" style="zoom:80%;" />

> 你会发现，此时文件状态为cached file，这是什么意思呢？其实这也是Git管理文件时的一种状态：暂存状态。就是我们生活中常说的草稿状态。也就是说对于Git来讲，它认为此时文件只是一种临时草稿状态，随时可能会进行修改或删除，并不算真正的操作完成状态。所以并不会把文件纳入到版本库管理中。

> 为什么会这样呢？其实这就涉及到版本的作用。生活中，我们学习时，一般会写学习笔记，虽然写完后不一定会看，但是该写的还是要写的。然后给这些笔记文件起名时，一般就会带着当天的时间或数字。比如【Java学习笔记_20220101.md】，或者【Java学习笔记_Ver1.1.md】，这里的时间或数字主要作用就是用于区分同一份笔记在不同时间节点记录的内容，这里的数字或时间我们就称之为版本。

> 那如果你只是随便写写，还没有写完的话，会专门给文件改个名称吗？应该不会，对不对，因为对于你来讲，这个笔记文件并没有记录完成，对吗。但是你非得说，你今天不想继续学习了，然后给文件改了一个名称，也不是不可以。对于Git软件来讲，道理是一样的。如果确定要把文件放置在版本库中，那么就需要执行确定提交指令

```sh
# commit表示真正地纳入到版本库中
# -m 表示提交时的信息（message），是必须输入的。用于描述不同版本之间的差别信息
git commit -m "my first git file"
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072136306.png" alt="image-20230407213640165" style="zoom:80%;" />

再查看Git状态

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072136518.png" alt="image-20230407213654397" style="zoom:80%;" />

提交后，Git会对当前的操作进行Hash计算，通过计算后的值将数据保存下来，保存的位置为版本库.git文件目录的objects中，我们可以通过指令查看当前提交

```sh
git show
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072137624.png" alt="image-20230407213712496" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072137139.png" alt="image-20230407213727025" style="zoom:80%;" />

由于文件内容进行了转换处理，直接打开你是看不懂的

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072137794.png" alt="image-20230407213739676" style="zoom:80%;" />

### 修改版本库文件

现在文件已经被纳入到版本库中，因为咱们的文件是空的，所以这里我们增加一些内容

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072137540.png" alt="image-20230407213755392" style="zoom:67%;" />

此时，Git版本库中的文件和本地的文件就有了不同。我们可以查看状态

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072138149.png" alt="image-20230407213810009" style="zoom:80%;" />

**modified**表示文件已经修改了，我们可以把这一次的修改提交到版本库中

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072138095.png" alt="image-20230407213822969" style="zoom:80%;" />

原则上来讲，这里的操作顺序依然应该是

```sh
# 先增加，再提交
git add test.txt
git commit -m "update file"
```

但是这里我们简化了一下操作

```sh
git commit -a -m "update file"
```

这个指令操作中多了一个**-a**的参数，等同于将增加，提交两步操作融合成了一步。提交成功后，我们来展示

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072139578.png" alt="image-20230407213906436" style="zoom:80%;" />

### 查看版本库文件历史

版本库中的文件我们已经修改并提交了，那么文件的版本信息就会发生变化，那我们如何来查看这个变化呢？这里我们可以采用log指令进行查看

```sh
git log
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072139536.png" alt="image-20230407213926387" style="zoom:80%;" />

如果感觉看着不舒服，也可以美化一下显示方式:

```sh
git log --pretty=oneline
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072139476.png" alt="image-20230407213950349" style="zoom:80%;" />

也可以使用简单方式查看

```sh
git log --oneline
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072140675.png" alt="image-20230407214003564" style="zoom:80%;" />

### 克隆并修改仓库名

```sh
git clone xxxxx.git new_name
```

### 清理本地仓库

```sh
git fetch origin
git checkout master
git reset --hard origin/master
```

## 文件操作

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207111854669.png" alt="image-20220711185447601" style="zoom:50%;" />

在学习常用命令之前，你首先需要知道的 Git 的「三个分区」和对应的文件的「三种状态」：

- `工作区`：就是你本地实际写代码的地方。对应的文件状态是：`modified`，已修改，但还没保存到数据库中。
- `暂存区`：就是临时存放的地方。对应的文件状态是：`staged`，Git 已经对该文件做了标记，下次提交知道要包含
- `本地库`：存放本地历史版本信息。对应的文件状态是：`committed`，文件已经安全的保存在本地数据库中。

### 新增文件

| **指令**                | **描述**                                           |
| :---------------------- | :------------------------------------------------- |
| git add [file1] [file2] | 添加文件到暂存区，包括修改的文件、新增的文件       |
| git add [dir]           | 同上，添加目录到暂存区，包括子目录                 |
| git add .               | 同上，添加**所有**修改、新增文件（未跟踪）到暂存区 |
| git rm [file]           | 删除工作区文件，并且将这次删除放入暂存区           |

```sh
# 添加一个文件
$ git add test.js

# 添加一个子目录中的文件
$ git add /path/to/file/test.js

# 支持正则表达式
$ git add ./*.js

# 添加指定文件到暂存区
$ git add [file1] [file2] ...

# 添加指定目录到暂存区，包括子目录
$ git add [dir]

# 添加当前目录的所有文件到暂存区
$ git add .

# 添加每个变化前，都会要求确认
# 对于同一个文件的多处变化，可以实现分次提交
$ git add -p
```

### 删除文件

rm 和上面的 add 命令相反，从工作空间中去掉某个文件

```sh
# 移除 HelloWorld.js
$ git rm HelloWorld.js

# 移除子目录中的文件
$ git rm /pather/to/the/file/HelloWorld.js

# 删除工作区文件，并且将这次删除放入暂存区
$ git rm [file1] [file2] ...

# 停止追踪指定文件，但该文件会保留在工作区
$ git rm --cached [file]
```

### 提交文件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092101960.png" alt="image-20230409210144768" style="zoom:80%;" />

```sh
# 提交暂存区到仓库区附带提交信息
$ git commit -m [message]

# 提交暂存区的指定文件到仓库区
$ git commit [file1] [file2] ... -m [message]

# 提交工作区自上次commit之后的变化，直接到仓库区
$ git commit -a

# 提交时显示所有diff信息
$ git commit -v

# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]

# 重做上一次commit，并包括指定文件的新变化
$ git commit --amend [file1] [file2] ...

# 编辑上次提交
$ git commit --amend -m 更好的提交日志
# 在上次提交中附加一些内容，保持提交日志不变
$ git add . && git commit --amend --no-edit
# 空提交 —— 可以用来重新触发 CI 构建
$ git commit --allow-empty -m chore: re-trigger build
```

### 删除文件

> 一般情况下，Git软件就是用于管理文件的版本变更，但是在一些特殊的场景中，文件可能作废或不再使用，那么就需要从版本库中删除，记住，这里说的并不是从物理文件目录中删除，而是从版本库中删除。

将本地文件从目录中删除

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072140716.png" alt="image-20230407214017590" style="zoom:80%;" />

查看Git版本库状态信息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072140856.png" alt="image-20230407214034718" style="zoom:80%;" />

> 此时Git软件会识别出来，版本库中有一份文件和当前用于临时操作文件的暂存区内的文件状态不一致：版本库中文件还在，但是操作区内的文件已经没有了。所以软件提供了两个选择：一个是将版本库中的文件也进行（提交）删除操作。另外一个就是从版本库中恢复文件。

使用指令从版本库中恢复文件

```sh
git restore test.txt
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072140253.png" alt="image-20230407214054129" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072141511.png" alt="image-20230407214104398" style="zoom:80%;" />



如果想要真正删除文件，那么也要将版本库中同时删除，就是直接提交即可

```sh
git commit -a -m "第n次提交，删除了某文件"
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072141353.png" alt="image-20230407214131224" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072141312.png" alt="image-20230407214149163" style="zoom: 80%;" />

此时查看Git日志

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072142725.png" alt="image-20230407214203584" style="zoom:80%;" />

### 重命名或移动

重命名或移动一个文件

```sh
# 重命名
$ git mv test.js test2.js

# 移动
$ git mv test.js ./new/path/test.js

# 改名文件，并且将这个改名放入暂存区
$ git mv [file-original] [file-renamed]

# 强制重命名或移动
# 这个文件已经存在，将要覆盖掉
$ git mv -f myFile existingFile
```

### 提交标准

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304231643272.png" alt="image-20230423164358153" style="zoom:80%;" />

## 状态信息

获取某些文件，某些分支，某次提交等 git 信息

```sh
# 显示commit历史，以及每次commit发生变更的文件
$ git log --stat

# 搜索提交历史，根据关键词
$ git log -S [keyword]

# 显示某个commit之后的所有变动，每个commit占据一行
$ git log [tag] HEAD --pretty=format:%s

# 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
$ git log [tag] HEAD --grep feature

# 显示某个文件的版本历史，包括文件改名
$ git log --follow [file]
$ git whatchanged [file]

# 显示指定文件相关的每一次diff
$ git log -p [file]

# 显示过去5次提交
$ git log -5 --pretty --oneline

# 显示所有提交过的用户，按提交次数排序
$ git shortlog -sn

# 显示指定文件是什么人在什么时间修改过
$ git blame [file]

# 显示暂存区和工作区的差异
$ git diff

# 显示暂存区和上一个commit的差异
$ git diff --cached [file]

# 显示工作区与当前分支最新commit之间的差异
$ git diff HEAD

# 显示两次提交之间的差异
$ git diff [first-branch]...[second-branch]

# 显示今天你写了多少行代码
$ git diff --shortstat "@{0 day ago}"

# 比较暂存区和版本库差异
$ git diff --staged

# 比较暂存区和版本库差异
$ git diff --cached

# 仅仅比较统计信息
$ git diff --stat

# 显示某次提交的元数据和内容变化
$ git show [commit]

# 显示某次提交发生变化的文件
$ git show --name-only [commit]

# 显示某次提交时，某个文件的内容
$ git show [commit]:[filename]

# 显示当前分支的最近几次提交
$ git reflog

# 查看远程分支
$ git br -r

# 创建新的分支
$ git br <new_branch>

# 查看各个分支最后提交信息
$ git br -v

# 查看已经被合并到当前分支的分支
$ git br --merged

# 查看尚未被合并到当前分支的分支
$ git br --no-merged
```

### 查看工作区状态

作用：`查看的修改的状态（暂存区、工作区）`

git status,表示查看工作区状态，使用命令格式：

```sh
git status  # 查看当前工作区暂存区变动
git status -s  # 查看当前工作区暂存区变动，概要信息
git status  --show-stash # 查询工作区中是否有stash（暂存的文件）
```

> 当你忘记是否已把代码文件添加到暂存区或者是否提交到本地仓库，都可以用git status看看哦~

### 查看提交记录

查看到提交过的信息，从近到远显示每次 commit 的 comment 还有作者、日期等信息

```sh
# 显示所有提交
$ git log
# 以精简模式显示查看提交历史
$ git log --oneline
# 显示某几条提交信息
$ git log -n 10
# 仅显示合并提交
$ git log --merges
# 查看该文件每次提交记录
$ git log <file>
# 查看每次详细修改内容的diff
$ git log -p <file>
# 查看最近两次详细修改内容的diff
$ git log -p -2
#查看提交统计信息
$ git log --stat
# 以精简模式显示查看提交历史
$ git reflog
# 在所有提交日志中搜索包含「homepage」的提交
$ git log --all --grep='homepage'
# 获取某人的提交日志
$ git log --author=Maxence
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210930171001888.png" alt="image-20210930171001888" style="zoom:80%;" />

### 文件比较

`git diff`用来比较不同文件版本之间的差异。

| **指令**                 | **描述**                                                     |
| :----------------------- | :----------------------------------------------------------- |
| **git diff**             | 查看暂存区和工作区的差异                                     |
| git diff [file]          | 同上，指定文件                                               |
| git diff --cached        | 查看已暂存的改动，就是暂存区与新版本`HEAD`进行比较           |
| git diff --staged        | 同上                                                         |
| git diff --cached [file] | 同上，指定文件                                               |
| git diff HEAD            | 查看已暂存的+未暂存的所有改动，就是与最新版本`HEAD`进行比较  |
| git diff HEAD~           | 同上，与上一个版本比较。`HEAD~`表示上一个版本，`HEAD~10`为最近第10个版本 |
| git diff [id] [id]       | 查看两次提交之间的差异                                       |
| git diff [branch]        | 查看工作区和分支直接的差异                                   |

```sh
# 查看文件的修改
$ git diff README.md
 
# 查看两次提交的差异
$ git diff 8f4244 1da22
 
# 显示今天你写了多少行代码：工作区+暂存区
$ git diff --shortstat "@{0 day ago}"
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092102455.png" alt="image-20230409210255260" style="zoom:80%;" />

### 拣选提交

> cherry-pick：当有一个紧急bug，在`dev`上修复完，我们需要把`dev`上的这个bug修复所做的修改“复制”到`master`分支，但不想把整个dev合并过去。为了方便操作，Git专门提供了一个`cherry-pick`命令，让我们能复制一个特定的提交到当前分支，而不管这个提交在哪个分支。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092200982.png" alt="image-20230409220025757" style="zoom:80%;" />

如上操作过程相当于将该提交导出为补丁文件，然后在当前`HEAD`上重放，形成无论内容还是提交说明都一致的提交

- 希望把`dev`分支上的`v7`提交的内容合并到`master`，但不需要其他的内容。
- 在`master`分支上执行指令`git cherry-pick v7`，会产生一个新的`v7'`提交，内容和`v7`相同。
- 同时更新`master`、`HEAD`，以及工作区。

```sh
# 选择一个commit，合并进当前分支
$ git cherry-pick [commit]
```

## 暂存

> 当你正在`dev`分支开发一个功能时，代码写了一半，突然有一个线上的bug急需要马上修改。`dev`分支Bug没写完，不方便提交，就不能切换到主分支去修复线上bug。Git提供一个`stash`功能，可以把当前**工作区、暂存区** 未提交的内容“隐藏”起来，就像什么都没发生一样。

```sh
# 有未提交修改，切换分支时报错
$ git checkout dev
error: Your local changes to the following files would be overwritten by checkout:
        README.md
Please commit your changes or stash them before you switch branches.
Aborting
 
# 隐藏
$ git stash
Saved working directory and index state WIP on main: 2bc012c s
 
# 查看被隐藏的内容
$ git stash list
stash@{0}: WIP on main: 2bc012c s
 
# 比较一下，什么都没有，一切都没有发生过！
$ git diff
 
# 去其他分支修改bug，修复完成回到当前分支，恢复工作区
$ git stash pop
```

在上面示例中，有未提交修改，切换分支时报错。错误提示信息很明确了，`commit`提交或`stash`隐藏：`Please commit your changes or stash them before you switch branches.`

> 📢 如果切换分支时，未提交修改的内容没有冲突，是可以成功切换的，未提交修改会被带过去。

| **指令**                 | **描述**                                                     |
| :----------------------- | :----------------------------------------------------------- |
| git stash                | 把未提交内容隐藏起来，包括未暂存、已暂存。等以后恢复现场后继续工作 |
| git stash list           | 查看所有被隐藏的内容列表                                     |
| git stash pop            | 恢复被隐藏的内容，同时删除隐藏记录                           |
| git stash save "message" | 同`git stash`，可以备注说明`message`                         |
| git stash apply          | 恢复被隐藏的文件，但是隐藏记录不删除                         |
| git stash drop           | 删除隐藏记录                                                 |

> 当然这里先提交到本地也是可以的，只是提交不是一个完整的功能代码，而是残缺的一部分，影响也不大。

### 暂存所有改动

暂存你工作目录下的所有改动

```apl
git stash  
```

你可以使用`-u`来排除一些文件

```apl
git stash -u  
```

### 暂存指定文件

假设你只想暂存某一个文件

```apl
git stash push filename
```

假设你想暂存多个文件

```apl
git stash push filename1.ext filename2.ext  
```

### 暂存时记录消息

这样你可以在`list`时看到它

```apl
git stash save <message>  
git stash push -m <message>  
```

### 使用某个指定暂存

首先你可以查看你的`stash`记录

```apl
git stash list  
```

然后你可以`apply`某个`stash`

```apl
git stash apply "stash@{n}"  
```

此处， 'n'是`stash`在栈中的位置，最上层的`stash`会是0

除此之外，也可以使用时间标记(假如你能记得的话)。

```apl
git stash apply "stash@{2.hours.ago}"  
```

### 暂存时保留未暂存的内容

你需要手动create一个`stash commit`， 然后使用`git stash store`。

```apl
git stash create  
git stash store -m "commit-message" CREATED_SHA1  
```

多数情况下，你应该将所有的内容变为未暂存，然后再选择你想要的内容进行commit。但假定你就是想要这么做，这里你可以创建一个临时的commit来保存你已暂存的内容，然后暂存你的未暂存的内容并进行stash。然后reset最后一个commit将原本暂存的内容变为未暂存，最后stash pop回来。

```apl
$ git commit -m "WIP"  
$ git add .  
$ git stash  
$ git reset HEAD^  
$ git stash pop --index 0  
```

注意1: 这里使用`pop`仅仅是因为想尽可能保持幂等。注意2: 假如你不加上`--index`你会把暂存的文件标记为为存储。

未暂存(Unstaged)的内容

我想把未暂存的内容移动到一个新分支

```apl
$ git checkout -b my-branch  
```

我想把未暂存的内容移动到另一个已存在的分支

```apl
$ git stash  
$ git checkout my-branch  
$ git stash pop  
```

我想丢弃本地未提交的变化(uncommitted changes)

如果你只是想重置源(origin)和你本地(local)之间的一些提交(commit)，你可以：

```apl
# one commit  
(my-branch)$ git reset --hard HEAD^  
# two commits  
(my-branch)$ git reset --hard HEAD^^  
# four commits  
(my-branch)$ git reset --hard HEAD~4  
# or  
(main)$ git checkout -f  
```

重置某个特殊的文件, 你可以用文件名做为参数:

```apl
$ git reset filename  
```

我想丢弃某些未暂存的内容

如果你想丢弃工作拷贝中的一部分内容，而不是全部。

签出(checkout)不需要的内容，保留需要的。

```apl
$ git checkout -p  
# Answer y to all of the snippets you want to drop  
```

另外一个方法是使用 `stash`， Stash所有要保留下的内容, 重置工作拷贝, 重新应用保留的部分。

```apl
$ git stash -p  
# Select all of the snippets you want to save  
$ git reset --hard  
$ git stash pop  
```

或者, stash 你不需要的部分, 然后stash drop。

```apl
$ git stash -p  
# Select all of the snippets you don't want to save  
$ git stash drop  
```

## 命令别名

对我这种喜欢敲命令而不用图形化工具的爱好者来说，设置短命令可以很好的提高效率。

方式一：直接命令行配置

```scss
git config --global alias.ps push
```

方式二：全局配置文件

```sh
vim ~/.gitconfig
```

```sh
[alias] 
        co = checkout
        ps = push
        pl = pull
        mer = merge --no-ff
        cp = cherry-pick
        a = add  
        amend = commit --amend  
        c = commit  
        ca = commit --amend  
        ci = commit -a  
        co = checkout  
        d = diff  
        dc = diff --changed  
        ds = diff --staged  
        f = fetch  
        loll = log --graph --decorate --pretty=oneline --abbrev-commit  
        m = merge  
        one = log --pretty=oneline  
        outstanding = rebase -i @{u}  
        s = status  
        unpushed = log @{u}  
        wc = whatchanged  
        wip = rebase -i @{u}  
        zap = fetch -p  
```

```sh
# 使用等同于 git cherry-pick <commitHash>
git cp <commitHash>
```

## 忽略列表

> 工作目录中的文件并不是全都需要纳入版本管理，如日志、临时文件、私有配置文件等不需要也不能纳入版本管理，那该怎么办呢？ 各种语言项目的常用`.gitignore`文件配置：https://github.com/github/gitignore

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092058117.png" alt="image-20230409205805943" style="zoom:80%;" />

在工作区根目录下创建“`.gitignore`”文件，文件中配置不需要进行版本管理的文件、文件夹。“`.gitignore`”文件本身是被纳入版本管理的，可以共享。有如下规则：

> - `#`符号开头为注释
> - 可以使用Linux通配符。星号（*）代表任意多个字符，问号（？）代表一个字符，方括号（[abc]）代表可选字符范围，大括号（{string1,string2,...}）代表可选的字符串等。
> - 感叹号（`!`）开头：表示例外规则，将不被忽略。
> - 路径分隔符（/f）**开头**：，表示要忽略**根目录**下的**文件**`f`。
> - 路径分隔符（f/）**结尾**：，表示要忽略**文件夹**`f`下面的所有文件。

```apl
# 忽略所有“.txt”结尾的文件
*.txt 
# lib.txt除外
!lib.txt  
# 仅忽略项目根目录下的temp文件,不包括其它目录下的temp，如不包括“src/temp”
/temp  
# 忽略build/目录下的所有文件
build/  
# 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
doc/*.txt 
# 所有以.md结尾的文件
*.md  
# lib.a不能被忽略
!lib.a
# node_modules和.vscode文件被忽略
node_modules
.vscode
# build目录下的文件被忽略
build/
# doc目录下的.txt文件被忽略
doc/*.txt
# doc目录下多层目录的所有以.pdf结尾的文件被忽略
doc/**/*.pdf
```

## 恢复历史文件

[在 Git 中撤消更改的 6 种方法！](https://mp.weixin.qq.com/s?__biz=MzU2MTIyNDUwMA==&mid=2247514004&idx=1&sn=f59dda5ce7617d0bb2e55eb3f9120235&chksm=fc7ef9cfcb0970d9d8ed550de941c97115701411668540f87e42fc1fe465cd33c4b69e02aadd&mpshare=1&scene=23&srcid=04260hxkQrRAorpB13utjrNk&sharer_sharetime=1682482816688&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

> Git的撤销与回退，在日常工作中使用的比较频繁。比如我们想将某个修改后的文件撤销到上一个版本，或者想撤销某次多余的提交，都要用到git的撤销和回退操作。代码在Git的每个工作区域都是用哪些命令撤销或者回退的呢
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231838832.png" alt="image-20220723183809725" style="zoom: 67%;" />

| **指令 **                 | **描述**                                                     |
| :------------------------ | :----------------------------------------------------------- |
| git checkout .            | 撤销工作区的（未暂存）修改，把暂存区恢复到工作区。不影响暂存区，如果没暂存，则撤销所有工作区修改 |
| git checkout [file]       | 同上，`file`指定文件                                         |
| git checkout HEAD .       | 撤销工作区、暂存区的修改，用`HEAD`指向的当前分支最新版本替换工作区、暂存区 |
| git checkout HEAD [file]  | 同上，`file`指定文件                                         |
| git reset                 | 撤销暂存区状态，同`git reset HEAD`，不影响工作区             |
| git reset HEAD [file]     | 同上，指定文件`file`，`HEAD`可省略                           |
| git reset [commit]        | 回退到指定版本，清空暂存区，不影响工作区。工作区需要手动`git checkout`签出 |
| git reset --soft [commit] | 移动分支`master`、`HEAD`到指定的版本，不影响暂存区、工作区，需手动`git checkout`签出更新 |
| git reset --hard HEAD     | 撤销工作区、暂存区的修改，用当前最新版                       |
| git reset --hard HEAD~    | 回退到上一个版本，并重置工作区、暂存区内容。                 |
| git reset --hard [commit] | 回退到指定版本，并重置工作区、暂存区内容。                   |
| git **revert**[commit]    | 撤销一个提交，会用一个新的提交（原提交的逆向操作）来完成撤销操作，如果已`push`则重新`push`即可 |

- `git checkout .`、`git checkout [file]` 会清除工作区中未添加到暂存区的修改，用暂存区内容替换工作区。
- `git checkout HEAD .`、`git checkout HEAD [file]` 会清除工作区、暂存区的修改，用HEAD指向的当前分支最新版本替换暂存区、工作区。

```sh
# 获取所有操作历史
git reflog
# 重置到相应提交
git reset HEAD@{4}
# ……或者……
git reset --hard <提交的哈希值>
```

| **标题 \ 指令**        | **checkout**                 | **reset**                        | **revert**     |
| :--------------------- | :--------------------------- | :------------------------------- | :------------- |
| **主要作用（撤销）**   | 撤销工作区、暂存区未提交修改 | 回退版本，重置工作区、暂存区     | 撤销某一次提交 |
| **撤销工作区**         | git checkout [file]          | git reset HEAD [file]            |                |
| **撤销工作区、暂存区** | git checkout HEAD [file]     | git reset --hard HEAD [file]     |                |
| **回退版本**           |                              | git reset --hard [commit]        |                |
| **安全性**             | 只针对未提交修改，**安全**   | 如回退了已`push`提交，**不安全** | **安全**       |

可看出`reset`完全可以替代`checkout`来执行撤销、回退操作，`reset`本来也是专门用来干这个事情的，可以抛弃`checkout`了（撤销的时候）。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092121409.png" alt="image-20230409212116177" style="zoom:80%;" />

### git reset

#### 基本概述

> 将当前的头指针复位到一个特定的状态。这样可以使你撤销 merge、pull、commits、add 等这是个很强大的命令，但是在使用时一定要清楚其所产生的后果

```sh
# 使 staging 区域恢复到上次提交时的状态，不改变现在的工作目录
$ git reset

# 使 staging 区域恢复到上次提交时的状态，覆盖现在的工作目录
$ git reset --hard

# 将当前分支恢复到某次提交，不改变现在的工作目录
# 在工作目录中所有的改变仍然存在
$ git reset dha78as

# 将当前分支恢复到某次提交，覆盖现在的工作目录
# 并且删除所有未提交的改变和指定提交之后的所有提交
$ git reset --hard dha78as
```

> **如果版本库中一份文件中已经被删除了，那么此时这份文件还能找回来吗**？其实原则上来讲，已经不行了，因为文件删除本身也是一种变更操作，也算是版本库管理的一部分。所以想要将已经删除的那份文件从版本库中取出来，已经是不可能了。`reset`是专门用来撤销修改、回退版本的指令，支持的场景比较多，多种撤销姿势，所以参数组合也比较多。简单理解就是移动`master`分支、`HEAD`的“指针”地址，理解这一点就基本掌握`reset`了

> 但是，要注意的是，版本库管理的是文件不同版本的变更操作，这个不同版本的概念还是非常重要的。也就是说，**最后的那个删除的文件版本已经没有了，但是之前版本的文件其实还是存在的**。**所以如果我们能将文件恢复到某一个版本，那么那个版本的文件就依然存在**。

#### 图解概述

回退版本`git reset --hard v4` 或 `git reset --hard HEAD~2`，`master`、`HEAD`会指向`v4`提交，`v5`、`v6`就被废弃了。也可以重新恢复到`v6`版本：`git reset --hard v6`，就是移动`master`、`HEAD`的“指针”地址。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092126275.png" alt="image-20230409212648050" style="zoom:67%;" />

#### reset模式

`reset`有三种模式，对应三种参数：`mixed`（默认模式）、`soft`、`hard`。三种参数的主要区别就是对工作区、暂存区的操作不同。`mixed`为默认模式，参数可以省略。只有`hard`模式会重置工作区、暂存区，一般用这个模式多

| **模式名称**    | **描述**                                           | **HEAD的位置** | **暂存区** | **工作区** |
| :-------------- | :------------------------------------------------- | :------------- | :--------- | :--------- |
| **soft**        | 回退到某一个版本，工作区不变，需手动`git checkout` | 修改           | 不修改     | 不修改     |
| **mixed**(默认) | 撤销暂存区状态，不影响工作区，需手动`git checkout` | 修改           | 修改       | 不修改     |
| **hard**        | 重置未提交修改（工作区、暂存区）                   | 修改           | 修改       | 修改       |

穿梭前，用`git log`可以查看提交历史，以便确定要回退到哪个版本。要重返未来，用`git reflog`查看命令历史，以便确定要回到未来的哪个版本。

```sh
git reset [--soft | --mixed | --hard] [HEAD]
 
# 撤销暂存区
$ git reset
Unstaged changes after reset:
M       R.md
 
# 撤销工作区、暂存区修改
$ git reset --hard HEAD
 
# 回退版本库到上一个版本，并重置工作区、暂存
$ git reset --hard HEAD~
 
# 回到原来的版本（恢复上一步的撤销操作），并重置工作区、暂存
$ git reset --hard 5f8b961
 
# 查看所有历史提交记录
$ git reflog
ccb9937 (HEAD -> main, origin/main, origin/HEAD) HEAD@{0}: commit: 报表新增导入功能
8f61a60 HEAD@{1}: commit: bug：修复报表导出bug
4869ff7 HEAD@{2}: commit: 用户报表模块开发
4b1028c HEAD@{3}: commit: 财务报表模块开发完成
```

#### 实战演练

查看版本库信息

```sh
git log --oneline
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072142268.png" alt="image-20230407214237135" style="zoom:80%;" />

将版本库文件重置到某一个版本，可行，会丢失提交过程

```sh
# 这里的f2f113f就是版本Hash值，用于唯一确定版本库中此版本的标记
# 当然了这是一个简短版，完整的比较长
# 如果不记得具体的版本值，版本值也可以使用HEAD值，比如最新的上一个版本：HEAD^
# 如果后退更多的版本,可以使用 HEAD~N
git reset --hard f2f113f
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072143458.png" alt="image-20230407214318325" style="zoom:80%;" />

被删除的文件回来了

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072143620.png" alt="image-20230407214328499" style="zoom:80%;" />

将版本库文件重置到某一个版本，可行，不会丢失提交过程，相当于一次新的提交

### git checkout

如果文件还在**工作区**，还没添加到暂存区，可以使用git checkout撤销

```sh
# 丢弃某个文件file
git checkout [file] 
# 只撤销工作区的修改（未暂存）
git checkout . 
# 撤销工作区、暂存区的修改
git checkout HEAD .
```

以下demo，使用git checkout -- test.txt 撤销了test.txt的修改

```sh
git checkout -- test.txt 
```

代码已经推送到远程服务器了，我想撤回某个文件，你可以这么操作：

```sh
# 查看文件历史版本
git log <filename>
# 回滚到指定commitId
git checkout <commitId> <filename>
# 提交被修改的文件
git commit -m '回滚特定文件的变动'
# 推送
git push
```

### git revert

> 安全的撤销某一个提交记录，基本原理就是生产一个新的提交，用原提交的逆向操作来完成撤销操作。注意，这不同于`reset`，`reset`是回退版本，revert只是用于撤销某一次历史提交，操作是比较安全的。

> 应用场景：有一天测试突然跟你说，你开发上线的功能有问题，需要马上撤回，否则会影响到系统使用。这时可能会想到用 reset 回退，可是你看了看分支上最新的提交还有其他同事的代码，用 reset 会把这部分代码也撤回了。由于情况紧急，又想不到好方法，还是任性的使用 reset，然后再让同事把他的代码合一遍（同事听到想打人），于是你的技术形象在同事眼里一落千丈。

#### 图解分析

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092137638.png" alt="image-20230409213757395" style="zoom:80%;" />

- 想撤销`v4`的修改，执行`git revert v4`，会产生一个新的提交`v-4`，是`v4`的逆向操作。
- 同时更新`matser`、`HEAD`“指针”位置，以及工作区内容。
- 如果已`push`则重新`push`即可。

#### 实战演练

> 源文件夹包含如下4个文件，此时我删除qwe.txt，并进行提交，注意是撤销提交

```sh
git reflog  # 得到你需要回退一次提交的commit id
git revert -n <commit_id>  # 撤销指定的版本，撤销也会作为一次提交进行保存,66522bd
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231852473.png" alt="image-20220723185253350" style="zoom: 50%;" />



## 分支分类

### 主分支Master

首先，代码库应该有一个、且仅有一个主分支。所有提供给用户使用的正式版本，都在这个主分支上发布。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092036640.png" alt="image-20230409203611496" style="zoom:80%;" />

Git主分支的名字，默认叫做Master。它是自动建立的，版本库初始化以后，默认就是在主分支在进行开发。

### 开发分支Develop

主分支只用来发布重大版本，日常开发应该在另一条分支上完成。我们把开发用的分支，叫做Develop。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092036811.png" alt="image-20230409203623659" style="zoom:80%;" />

这个分支可以用来生成代码的最新隔夜版本（nightly）。如果想正式对外发布，就在Master分支上，对Develop分支进行"合并"（merge）。

Git创建Develop分支的命令：

```sh
git checkout -b develop master
```

将Develop分支发布到Master分支的命令：

```sh
# 切换到Master分支
git checkout master
# 对Develop分支进行合并
git merge --no-ff develop
```

这里稍微解释一下上一条命令的--no-ff参数是什么意思。默认情况下，Git执行"快进式合并"（fast-farward merge），会直接将Master分支指向Develop分支。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092036294.png" alt="image-20230409203649125" style="zoom:67%;" />

使用--no-ff参数后，会执行正常合并，在Master分支上生成一个新节点。为了保证版本演进的清晰，我们希望采用这种做法。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092037264.png" alt="image-20230409203705117" style="zoom:67%;" />

### 临时性分支

前面讲到版本库的两条主要分支：Master和Develop。前者用于正式发布，后者用于日常开发。其实，常设分支只需要这两条就够了，不需要其他了。

但是，除了常设分支以外，还有一些临时性分支，用于应对一些特定目的的版本开发。临时性分支主要有三种：

- 功能（feature）分支
- 预发布（release）分支
- 修补bug（fixbug）分支

这三种分支都属于临时性需要，使用完以后，应该删除，使得代码库的常设分支始终只有Master和Develop。

接下来，一个个来看这三种"临时性分支"。

**第一种是功能分支**，它是为了开发某种特定功能，从Develop分支上面分出来的。开发完成后，要再并入Develop。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092037772.png" alt="image-20230409203716622" style="zoom:67%;" />

功能分支的名字，可以采用feature-*的形式命名。

创建一个功能分支：

```
git checkout -b feature-x develop
```

开发完成后，将功能分支合并到develop分支：

```
git checkout develop

git merge --no-ff feature-x
```

删除feature分支：

```
  git branch -d feature-x
```

**第二种是预发布分支**，它是指发布正式版本之前（即合并到Master分支之前），我们可能需要有一个预发布的版本进行测试。预发布分支是从Develop分支上面分出来的，预发布结束以后，必须合并进Develop和Master分支。它的命名，可以采用release-*的形式。

创建一个预发布分支：

```
git checkout -b release-1.2 develop
```

确认没有问题后，合并到master分支：

```
git checkout master
git merge --no-ff release-1.2
# 对合并生成的新节点，做一个标签
git tag -a 1.2
```

再合并到develop分支：

```
git checkout develop
git merge --no-ff release-1.2
```

最后，删除预发布分支：

```
git branch -d release-1.2
```

**最后一种是修补bug分支**。软件正式发布以后，难免会出现bug。这时就需要创建一个分支，进行bug修补。

修补bug分支是从Master分支上面分出来的。修补结束以后，再合并进Master和Develop分支。它的命名，可以采用fixbug-*的形式。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092037004.png" alt="image-20230409203730853" style="zoom:67%;" />

创建一个修补bug分支：

```sh
git checkout -b fixbug-0.1 master
```

修补结束后，合并到master分支：

```sh
git checkout master
git merge --no-ff fixbug-0.1
git tag -a 0.1.1
```

再合并到develop分支：

```sh
git checkout develop
git merge --no-ff fixbug-0.1
```

最后，删除"修补bug分支"：

```sh
git branch -d fixbug-0.1
```





## 分支操作

> 在之前的操作中，所有的操作都是基于一条主线完成的。就好比，咱们学习的时候，记学习笔记，今天学点，那么就写一点，明天学点，再写一点，最后，完全学完了，这个笔记也就记全了。但实际上，有些文件可能再不同的场合需要同时使用不同的内容，而且还不能冲突，比如项目的配置文件，我需要本地进行测试，同时还要部署到服务器上进行测试。本地和服务器上的环境是不一样的，所以同一个配置文件就需要根据环境的不同，进行不同的修改。本地环境没问题了，修改配置文件，提交到服务器上进行测试，如果测试有问题，再修改为本地环境，重新测试，没问题了，再修改为服务器配置，然后提交到服务器上进行测试。依次类推，形成迭代式开发测试。

> 从上面的描述上看，就会显得非常繁琐，而且本质上并没有太重要的内容，仅仅是因为环境上的变化，就需要重新修改，所以如果将本地测试环境和服务器测试环境区分开，分别进行文件版本维护，是不是就会显得更合理一些。这个操作，在Git软件中，我们称之为branch，分支。

> 这里的分支感觉上就是树上的分叉一样，会按照不同的路线生长下去。有可能以后不再相交，当然，也可能以后会不断地纠缠下去，都是有可能的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072143901.png" alt="image-20230407214359751" style="zoom:80%;" />

| **指令**                                           | **描述**                                                     |
| :------------------------------------------------- | :----------------------------------------------------------- |
| git branch                                         | 列出所有本地分支，加参数`-v`显示详细列表，下同               |
| git branch -r                                      | 列出所有远程分支                                             |
| git branch -a                                      | 列出所有本地分支和远程分支，用不同颜色区分                   |
| git branch [branch-name]                           | 新建一个分支，但依然停留在当前分支                           |
| git branch -d dev                                  | 删除`dev`分支，-D（大写）强制删除                            |
| **git checkout -b** dev                            | 从当前分支创建并切换到`dev`分支                              |
| git checkout **-b** feature1 dev                   | 从本地`dev`分支代码创建一个 `feature1`分支，并切换到新分支   |
| git branch [branch] [commit]                       | 新建一个分支，指向指定`commit id`                            |
| git branch --track [branch] [remote-branch]        | 新建一个分支，与指定的远程分支建立关联                       |
| git checkout -b hotfix remote hotfix               | 从远端`remote`的`hotfix`分支创建本地`hotfix`分支             |
| git branch --set-upstream [branch] [remote-branch] | 在现有分支与指定的远程分支之间建立跟踪关联：`git branch --set-upstream hotfix remote/hotfix` |
| **git checkout** [branch-name]                     | 切换到指定分支，并更新工作区                                 |
| git checkout .                                     | 撤销工作区的（未暂存）修改，把暂存区恢复到工作区。           |
| git checkout HEAD .                                | 撤销工作区、暂存区的修改，用`HEAD`指向的当前分支最新版本替换 |
| git merge [branch]                                 | 合并指定分支到当前分支                                       |
| **git merge --no-ff** dev                          | 合并`dev`分支到当前分支，参数`--no-ff`禁用快速合并模式       |
| git push origin --delete [branch-name]             | 删除远程分支                                                 |
| git rebase master                                  | 将当前分支变基合并到`master`分支                             |
| ✅switch：新的分支切换指令                          | 切换功能和`checkout`一样，`switch`只单纯的用于切换           |
| git switch master                                  | 切换到已有的`master`分支                                     |
| git switch -c dev                                  | 创建并切换到新的`dev`分支                                    |

### 主干分支

> 默认情况下，Git软件就存在分支的概念，而且就是一个分支，称之为master分支，也称之为主干分支。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072144258.png" alt="image-20230407214413142" style="zoom:80%;" />

这就意味着，所有文件的版本管理操作都是在master这一个分支路线上进行完成的。

> 不过奇怪的是，为什么之前的操作没有体现这个概念呢，那是因为，默认的所有操作本身就都是基于master分支完成的。而master主干分支在创建版本库时，也就是git init时默认就会创建。就像之前说的，如果仅仅是一个分支，在某些情况并不能满足实际的需求，那么就需要创建多个不同的分支。

### 创建分支

```sh
# 新建一个分支，但是仍停留在原来分支
git branch b1
git branch b2
# 新建一个分支，并且切换到新的分支dev2
git checkout -b dev2  
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072144877.png" alt="image-20230407214442745" style="zoom:80%;" />

现在我们创建了2个分支，不过这两个分支都是基于master主干分支为基础的。

### 查看分支

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092108957.png" alt="image-20230409210809723" style="zoom: 50%;" />

类似于`ls`，能够列出当前所有分支。`git branch -v` 能够显示更多信息。

```apl
git branch
```

```apl
git branch    # 查看本地所有的分支
git branch -v # 能够显示更多信息
git branch -r  # 查看所有远程的分支
git branch -a  # 查看所有远程分支和本地分支
git checkout - # 跳到之前的分支
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072144761.png" alt="image-20230407214454640" style="zoom:80%;" />

### 切换分支

代码仓库可以有多个分支，`master`为默认的主分支，但只有一个分支在工作状态。所以要操作不同分支，需要切换到该分支，`HEAD`就是指向当前正在活动的分支。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092109120.png" alt="image-20230409210926915" style="zoom:67%;" />

```sh
# 此处 switch 作用同 checkout，switch只用于切换，不像checkout功能很多
$ git switch dev
# 检出一个版本库，默认将更新到master分支
$ git checkout
# 检出到一个特定的分支
$ git checkout branchName
# 新建一个分支，并且切换过去，相当于"git branch <名字>; git checkout <名字>"
$ git checkout -b newBranch
```

使用 `git checkout dev`切换分支时，干了两件事：

①、`HEAD`指向`dev`：修改`HEAD`的“指针”引用，指向`dev`分支。

②、还原工作空间：把`dev`分支内容还原到工作空间。

此时的活动分支就是`dev`了，后续的提交就会更新到`dev`分支了。

**❓切换时还没提交的代码怎么办？**如果修改（包括未暂存、已暂存）和待切换的分支没有冲突，则切换成果，且未提交修改会一起带过去，所以要注意！如果有冲突，则会报错，提示先提交或隐藏，关于隐藏可查看后续章节内容“stash”

此时我们添加新的文件b1.txt

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072145225.png" alt="image-20230407214533106" style="zoom:80%;" />

然后提交到版本库

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072145879.png" alt="image-20230407214545739" style="zoom:80%;" />

此时，查看分支信息，会发现不同分支的版本进度信息发生了改变

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072145444.png" alt="image-20230407214558315" style="zoom:80%;" />

如果此时切换回到主干分支的话，那么b1.txt文件就不存在了，因为对应版本信息不一样。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072146310.png" alt="image-20230407214612179" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072146824.png" alt="image-20230407214624684" style="zoom:80%;" />

### 删除分支

如果觉得某一个分支建立的不太理想或已经没有必要在使用了，那么是可以将这个分支删除的。不能删除当前分支，只能删除其他分支，强制删除使用场景：用-d删除不了，出现提示问题，就用-D

```apl
git branch -d b1 # 删除分支时，需要做各种检查。
git branch -D b1 # 不做任何检查，强制删除。
```



### 创建并切换分支

我们还可以直接切换到一个不存在的分支（创建并切换）⭐⭐克隆完之后呢，开发新需求的话，我们需要新建一个开发分支，比如新建开发分支dev

```apl
git checkout -b dev   # 创建开发分支dev，并切换到该分支下
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210930181935431.png" alt="image-20210930181935431" style="zoom:80%;" />

### 推送分支

推送至远程仓库分支命令格式：git push 远程仓库简称 分支命令，查看远程仓库简称(一般都是origin)

```sh
git remote -v
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211022147648.png" alt="image-20221102214729557" style="zoom:80%;" />

```sh
# 推送分支至远程
git push origin b1
git push origin b2
# 分支推送内容，必须加上-u参数
git push -u origin b1
```

```sh
# 实战实例
git checkout -b b1
# 新增修改了文件
git add .
git commit -m "b1分支更新"
git push -u origin b1
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211022148085.png" alt="image-20221102214820006" style="zoom:80%;" />

推送完成后可以查看远程仓库：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211022148191.png" alt="image-20221102214853116" style="zoom:80%;" />

### 清理分支

```sh
# 移除远程仓库上不存在的分支
git fetch -p
# 移除所有包含 `greenkeeper` 的分支
git fetch -p && git branch --remote | fgrep greenkeeper | sed 's/^.\{9\}//' | xargs git push origin --delete
```

### 分支命名规则

几乎所有的版本控制系统都以某种形式支持分支。 使用分支意味着你可以把你的工作从开发主线上分离开来进行重大的Bug修改、开发新的功能，以免影响开发主线。在开发中，一般有如下分支使用原则与流程：还有一些其他分支，在此不再详述，例如test分支（用于代码测试）、pre分支（预上线分支）等。

> master （生产） 线上分支，主分支，中小规模项目作为线上运行的应用对应的分支
>
> develop（开发）是从master创建的分支，一般作为开发部门的主要开发分支，如果没有其他并行开发不同期上线。要求，都可以在此版本进行开发，阶段开发完成后，需要是合并到master分支,准备上线
>
> feature/xxxx  从develop创建的分支，一般是同期并行开发，但不同期上线时创建的分支，分支上的研发任务完
> 成后合并到develop分支。
>
> hotfix/xxxx  从master派生的分支，一般作为线上bug修复使用，修复完成后需要合并到master、test、
> develop分支。

## 合并分支

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072147133.png" alt="image-20230407214751009" style="zoom:80%;" />

合并就是将外部的提交合并到自己的分支中

```sh
# 将其他分支合并到当前分支
$ git merge branchName

# 在合并时创建一个新的合并后的提交
# 不要 Fast-Foward 合并，这样可以生成 merge 提交
$ git merge --no-ff branchName
```

### 主干分支

首先我们先将主干分支的所有文件清空掉

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072148820.png" alt="image-20230407214804687" style="zoom:80%;" />

在当前主干分支中创建一份文件master.txt，并提交

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072148902.png" alt="image-20230407214818752" style="zoom:80%;" />

### 其他分支

基于主干分支的内容，我们创建其他分支，并直接切换到新的分支

```sh
# git checkout -b 分支名称
git checkout -b new_branch
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072148529.png" alt="image-20230407214844395" style="zoom:80%;" />

在新的分支中添加新文件branch.txt

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072148453.png" alt="image-20230407214855309" style="zoom:80%;" />

此时切换回主干分支，只有master.txt文件。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072149230.png" alt="image-20230407214908033" style="zoom:80%;" />

再切换回new_branch分支，branch文件就又回来了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072149897.png" alt="image-20230407214920750" style="zoom:80%;" />

### 合并分支⭐

两种方式：`merge` 是将分支合并成一个新的节点，保留分支独立性，而 `rebase` 是将分支合并到目标分支的顶部，形成线性提交记录，但会丢失分支独立性。

> `merge`：将两个或多个分支的历史记录合并为一个新的提交，并将新的提交作为一个新的节点添加到当前分支的提交历史中。这种合并方式会保留每个分支的提交历史，并保持分支之间的独立性，适合于多人协作开发场景。合并后的历史记录会形成一个合并节点，表示分支之间的合并关系。合并时会产生一个新的提交，包含合并后的代码和提交信息。

> `rebase`：将当前分支的基础（base）更改为另一个分支的最新提交，然后将当前分支的新提交放置在目标分支的顶部。这种合并方式会修改提交历史记录，并且会丢失原有分支的独立性，适合于个人开发场景。合并后的历史记录会保持线性，没有合并节点，看起来更加干净整洁。合并时会修改提交的提交信息，不会产生新的提交。

这里我们将b1分支的文件内容合并到主干分支中。首先先切换回主干分支，然后执行分支合并指令

```sh
git checkout master
git merge b1
git push
```

rebase 的作用更多的是来整合分叉的历史，可以将某个分支上的所有修改都移到另一分支上，就像是变了基底

与 merge 会保留修改内容的历史记录不同，rebase 是在原有提交的基础上将差异内容反映进去。git rebase会复制当前分支的所有提交，并移动当前分支到要合并分支的最新提交上，并**改变当前分支所有提交的hash值（C3'）**。

`rebase`也是一种合并指令，命令行如下：git rebase 分支名

```sh
git checkout -b b2
git add .
git commit -m "新增文件"
git push -u origin b2
git checkout master
git rebase b2
git push --force
```

与`merge`不同的是`rebase`合并看起来不会产生新的节点(实际上是会产生的，只是做了一次复制)，而是将需要合并的节点直接累加，如图

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207241013346.png" alt="image-20220724101359242" style="zoom:67%;" />

<img src="https://mmbiz.qpic.cn/mmbiz_gif/rENF8sGwVPcrayWb96TqpmzcMPsr4wvQRmhggHkAZgLTibhjR4sCA4DIAiaBkWjUIv9S82o8gGST5QnpZPk0jbZw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1" alt="图片" style="zoom:67%;" />

其实git rebase 和git merge 做的事是一样的。它们都被设计用来将一个分支的更改并入另一个分支，方式有些不同

**merge:**

- 优点：分支合并后，原分支会保留，较为安全，操作简单
- 缺点：会引入一次不必要的commit，如果团队庞大，提交树会变得杂乱无章

**rebase:**

- 优点：rebase会使项目提交树很干净，所有的提交都在一条线上
- 缺点：rebase后会改变commit的hash值，改变了提交树的历史

### 合并方式

> 把两个分支的修改内容合并到一起，常用的合并指令`git merge [branch]`，将分支`[branch]`合并到当前分支。根据要合并的内容的不同，具体合并过程就会有多种情况。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092113339.png" alt="image-20230409211338142" style="zoom:80%;" />

#### 快速合并（Fast forward）

如下图，`master`分支么有任何提交，“`git merge dev`”合并分支`dev`到`master`，此时合并速度就非常快，直接移动`master`的“指针”引用到`dev`即可。这就是快速合并（Fast forward），不会产生新的提交。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092116415.png" alt="image-20230409211633211" style="zoom:80%;" />

- 合并`dev`到`master`，注意要先切换到`master`分支，然后执行`git merge dev`，把`dev`合并到当前分支。

> **📢强制不用快速合并**：`git merge --no-ff -m "merge with no-ff" dev`，参数`--no-ff`不启用快速合并，会产生一个新的合并提交记录。

#### 普通合并

如果`master`有变更，存在分支交叉，则会把两边的变更合并成一个提交。

- 如果两边变更的文件不同，没有什么冲突，就自动合并了。
- 如果有修改同一个文件，则会存在冲突，到底该采用哪边的，程序无法判断，就换产生冲突。冲突内容需要人工修改后再重新提交，才能完成最终的合并。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092116517.png" alt="image-20230409211622308" style="zoom:80%;" />

上图中，创建`dev`分支后，两个分支都有修改提交，因此两个分支就不在一条顺序线上了，此时合并`dev`到`master`就得把他们的修改进行合并操作了。

- `v5`、`v7`共同祖先是`v4`，从这里开始分叉。
- Git 会用两个分支的末端`v6` 和 `v8`以及它们的共同祖先`v4`进行三方合并计算。合并之后会生成一个新（和并）提交`v9`。
- 合并提交`v9`就有两个祖先`v6`、`v8`。

#### 处理冲突<<<<<<< HEAD

在有冲突的文件中，`<<<<<<< HEAD`开头的内容就表示是有冲突的部分，需要人工处理，可以借助一些第三方的对比工具。人工处理完毕后，完成合并提交，才最终完成此次合并。`=======`分割线上方是当前分支的内容，下方是被合并分支的变更内容。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092115797.png" alt="image-20230409211524600" style="zoom:80%;" />

#### 变基rebase

把两个分支的修改内容合并到一起的办法有两种：`merge` 和 `rebase`，作用都是一样的，区别是`rebase`的提交历史更简洁，干掉了分叉，merge的提交历史更完整。

![图片](https://mmbiz.qpic.cn/mmbiz_png/A3ibcic1Xe0iaQlYph2qibic0ib3NzFAiciafWKwrr7g2iam9CeIibLB0uET8aLhHCgoYWLtqwfXDUeuYzxHohl7csSp6ZYQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 在`dev`上执行“`git rebase master`”变基，将`dev`分支上分叉的`v7`、`v8`生成补丁，然后在`master`分支上应用补丁，产生新的`v7'`、`v8'`新的提交。
- 然后回到`master`分支，完成合并`git merge dev`，此时的合并就是快速合并了。
- 最终的提交记录就没有分叉了。

```sh
$ git rebase master
$ git checkout master
$ git merge dev
```

## 冲突分支

<img src="https://mmbiz.qpic.cn/mmbiz_gif/rENF8sGwVPcrayWb96TqpmzcMPsr4wvQYvFTHUUsicI3O4wHWs2ABRW5O9sJrpnqgB3V6hHgYdiaNsWhYpybQN3w/640?wx_fmt=gif&wxfrom=5&wx_lazy=1" alt="图片" style="zoom:67%;" />

### 合并冲突

在一段时间，A、B用户修改了同一个文件，且修改了同一行位置的代码，此时会发生合并冲突。A用户在本地修改代码后优先推送到远程仓库，此时B用户在本地修订代码，提交到本地仓库后，也需要推送到远程仓库，此时B用户晚于A用户，故需要先拉取远程仓库的提交，经过合并后才能推送到远端分支,如下图所示。
<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210930191432346.png" alt="image-20210930191432346" style="zoom: 80%;" />

在B用户拉取代码时，因为A、B用户同一段时间修改了同一个文件的相同位置代码，故会发生合并冲突。远程分支也是分支，所以合并时冲突的解决方式也和解决本地分支冲突相同相同。Git版本控制，是多个人一起搞的，多个分支并存的，这就难免会有冲突出现~

同一个文件，在合并分支的时候，如果同一行被多个分支或者不同人都修改了，合并的时候就会出现冲突。

举个粟子吧，我们现在在master分支，修改HelloWorld.java文件，进行提交

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211022200785.png" alt="image-20221102220043699" style="zoom:80%;" />

```sh
git add .
git commit -m "在master修改内容"
git push
```

我们切回到b1分支，也修改HelloWorld.java同一位置内容，如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211022202066.png" alt="image-20221102220225985" style="zoom:80%;" />

```sh
git add .
git commit -m "在b1分支修改内容"
git push -u origin b1
```

再然后呢，我们合并分支。就出现冲突啦，如图所示：

```sh
git checkout master
git merge b1
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211022206177.png" alt="image-20221102220601102" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072150958.png" alt="image-20230407215031821" style="zoom: 67%;" />

接下来，咱们就演示一下。

### 主干分支

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072150484.png" alt="image-20230407215042367" style="zoom:80%;" />

首先我们先将主干分支的所有文件清空掉

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072150696.png" alt="image-20230407215054573" style="zoom:80%;" />

主干分支添加文件test.txt，文件内容为空

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072151277.png" alt="image-20230407215105158" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072151388.png" alt="image-20230407215115247" style="zoom:80%;" />

### 其他分支

基于主干分支，创建两个分支B1, B2

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072151707.png" alt="image-20230407215133584" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072151846.png" alt="image-20230407215147712" style="zoom:80%;" />

### 切换分支-B1

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072152386.png" alt="image-20230407215207259" style="zoom:67%;" />

切换到B1分支，修改文件内容

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072152769.png" alt="image-20230407215223642" style="zoom:80%;" />

提交修改后的文件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072152247.png" alt="image-20230407215237114" style="zoom:80%;" />

### 切换分支-B2

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072152920.png" alt="image-20230407215256756" style="zoom:80%;" />

切换到B2分支，查看文件内容

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072153253.png" alt="image-20230407215311124" style="zoom:80%;" />

修改文件内容：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072153565.png" alt="image-20230407215323428" style="zoom:80%;" />

提交文件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072153141.png" alt="image-20230407215334012" style="zoom:80%;" />

### 合并分支-B1

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072153797.png" alt="image-20230407215349678" style="zoom:80%;" />

切换到master主干分支，此时test.txt文件内容为空

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072154246.png" alt="image-20230407215400109" style="zoom:80%;" />

将B1分支合并到主干分支中

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072154921.png" alt="image-20230407215412782" style="zoom:80%;" />

### 合并分支-B2

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072154266.png" alt="image-20230407215428135" style="zoom:80%;" />

因为B2分支也对文件进行了修改，所以如果此时合并B2分支,就会提示冲突

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072154288.png" alt="image-20230407215438153" style="zoom:80%;" />

查看文件内容差异

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072154366.png" alt="image-20230407215450231" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072155182.png" alt="image-20230407215541059" style="zoom:80%;" />

这里的冲突，软件是无法判断该如何出来处理的，所以需要人工进行判断，将冲突的文件内容进行修正。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072155517.png" alt="image-20230407215551402" style="zoom:80%;" />

重新提交到master主干分支中。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072156284.png" alt="image-20230407215603169" style="zoom:80%;" />

```sh
git commit 文件名称 -i -m 注释
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072156974.png" alt="image-20230407215611850" style="zoom:80%;" />

再查看一下Git软件的操作日志

```sh
git log --graph
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072156282.png" alt="image-20230407215624132" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072156068.png" alt="image-20230407215636940" style="zoom:80%;" />

## 标签操作

> 标签是静态的概念，分支是动态的概念，标签打完之后，代码的状态就被保存下来，不会改动。而分支可以不断地推送代码，直到完成。可以理解为某一次提交（编号）的别名，常用来标记版本。所以发布时，一般都会打一个版本标签，作为该版本的快照，指向对应提交`commit`。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092119986.png" alt="image-20230409211915772" style="zoom:80%;" />

> 打tag就是对发布的版本标注一个版本号，如果版本发布有问题，就把该版本拉取出来，修复bug，再合回去。
>
> Git 中的标签，指的是某个分支某个特定时间点的状态。通过标签，可以很方便的切换到标记时的状态。
>
> 比较有代表性的是人们会使用这个功能来标记发布结点（v1.0 、v1.2等）。下面是mybatis-plus的标签：

| **指令**                      | **描述**                                              |
| :---------------------------- | :---------------------------------------------------- |
| git tag                       | 查看标签列表                                          |
| git tag -l 'a*'               | 查看名称是“a”开头的标签列表，带查询参数               |
| git show [tagname]            | 查看标签信息                                          |
| **git tag** [tagname]         | 创建一个标签，默认标签是打在最新提交的commit上的      |
| git tag [tagname] [commit id] | 新建一个tag在指定commit上                             |
| git tag -a v5.1 -m'v5.1版本'  | 创建标签`v5.1.1039`，`-a`指定标签名，`-m`指定说明文字 |
| git tag -d [tagname]          | 删除本地标签                                          |
| git checkout v5.1.1039        | 切换标签，同切换分支                                  |
| git push [remote] v5.1        | 推送标签，标签不会默认随代码推送推送到服务端          |
| git push [remote] --tags      | 提交所有tag                                           |

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231715311.png" alt="image-20220723171541222" style="zoom:67%;" />

```sh
git tag			        #列出已有的标签
git tag [name]			#新建一个tag在当前commit
git push [shortName] [name]	#将标签推送至远程仓库
git checkout -b [branch] [name]	# 检出标签
git tag -d [tag]      #删除本地tag
git push origin [tag] #推送tag到远程
git show [tag]        #查看tag
git checkout -b [branch] [tag] #新建一个分支，指向某个tag
```

### 列出标签

列出已有的标签可以使用命令：**git tag**

```apl
git tag
```

### 创建标签

创建标签可以使用命令：**git tag [name]**

```sh
git tag v1.0
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231718755.png" alt="image-20220723171848689" style="zoom:80%;" />

### 删除标签

```sh
git tag -d v1.0
```

### 推送至远程仓库

将标签推送至远程仓库的命令格式：**git push [远程仓库名] [标签名]**

```sh
git push origin v1.0
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211030855586.png" alt="image-20221103085538507" style="zoom:80%;" />

### 分支标签

检出标签时需要新建一个分支来指向某个标签，检出标签的命令格式：**git checkout -b [分支名] [标签名]**

```sh
# 方式一：创建分支并指向标签
git checkout -b b3 v1.0
# 方式二：创建标签，然后分支指向标签
git tag v1.2
git checkout -b v1.2
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231719401.png" alt="image-20220723171952339" style="zoom: 67%;" />

## 远程仓库

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207111856672.png" alt="image-20220711185602587" style="zoom: 50%;" />

和远程库的交互主要是`推`、`拉`，也就是写入和读取。

| **指令**                       | **描述**                                                     |
| :----------------------------- | :----------------------------------------------------------- |
| git clone [git地址]            | 从远程仓库克隆到本地（当前目录）                             |
| git remote -v                  | 查看所有远程仓库，不带参数`-v`只显示名称                     |
| git remote show [remote]       | 显示某个远程仓库的信息                                       |
| git remote add [name] [url]    | 增加一个新的远程仓库，并命名                                 |
| git remote rename [old] [new]  | 修改远程仓库名称                                             |
| **git pull [remote] [branch]** | 取回远程仓库的变化，并与本地版本合并                         |
| **git pull**                   | 同上，针对当前分支                                           |
| git fetch [remote]             | 获取远程仓库的所有变动到本地仓库，不会自动合并！需要手动合并 |
| **git push**                   | 推送当前分支到远程仓库                                       |
| git push [remote] [branch]     | 推送本地当前分支到远程仓库的指定分支                         |
| git push [remote] --force/-f   | 强行推送当前分支到远程仓库，即使有冲突，⚠️很危险！            |
| git push [remote] --all        | 推送所有分支到远程仓库                                       |
| git push –u                    | 参数`–u`表示与远程分支建立关联，第一次执行的时候用，后面就不需要了 |
| git remote rm [remote-name]    | 删除远程仓库                                                 |
| git pull --rebase              | 使用rebase的模式进行合并                                     |

### 查看远程仓库

> 如果要查看已经配置的远程仓库服务器，可以执行 git remote 命令，它会列出每一个远程服务器的简称。如果已经克隆了远程仓库，**那么至少应该能看到 origin ，这是 Git 克隆的仓库服务器的默认名字**。
>

> 可以通过-v参数查看远程仓库更加详细的信息

```apl
# 查看远程仓库
git remote
git remote -v
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231709405.png" alt="image-20220723170926338" style="zoom:67%;" />

### 添加远程仓库

> 格式：git remote add 简称(一般都是origin) 远程仓库地址，**注意：一个本地仓库可以关联多个远程仓库**

```sh
git remote add origin xxxx.git
```

![image-20210926104723901](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211011010665.png)

### 推送到远程

> 小齐写完了代码，要提交到公司的代码库里，这个过程要用 `git push`。当然了，这么用会被打的。。毕竟还要 cr 呢。git push 可以推送本地分支、标签到远程仓库，也可以删除远程分支
>

```sh
# 将本地分支的更新全部推送到远程仓库master分支，origin远程name，master本地name
git push origin master 
# 删除远程branchname分支
git push origin -d <branchname>   
#  推送所有标签
git push --tags 
```

> 如果我们在dev开发完，或者就想把文件推送到远程仓库，给别的伙伴看看，就可以使用git push origin dev~如果直接`push`可能会失败，因为可能存在冲突，所以在`push`之前往往会先`pull`一下，如果存在冲突本地解决。`push`成功后本地的远程分支引用会更新，与本地分支指向同一节点
>

```sh
git add .
git commit -m "提交"
git push origin master
```

在使用git push命令将本地文件推送至码云远程仓库时，如果是第一次操作，需要进行身份认证，认证通过才可以推送

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211011012861.png" alt="image-20210926105913504" style="zoom:80%;" />

注意：上面的用户名和密码对应的就是我们在码云上注册的用户名和密码，认证通过后会将用户名和密码保存到windows系统中（如下图），后续再推送则无需重复输入用户名和密码。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211011012863.png" alt="image-20210926110810630" style="zoom:80%;" />



推送完成后可以到远程仓库中查看文件的变化。

### 克隆远程仓库

> 新来的实习生首先要 clone 整个项目到本地来，然后才能增删改查。如果你想获得一份已经存在了的 Git 远程仓库的拷贝，这时就要用到 git clone 命令。 Git 克隆的是该 Git 仓库服务器上的几乎所有数据（包括日志信息、历史记录等）。克隆仓库的命令格式： git clone 远程仓库地址

```sh
git clone xxx.git
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211011012263.png" alt="image-20221101101201191" style="zoom:80%;" />

### 更新本地仓库

> 小齐提交了新的代码之后，领导要审查呀，所以用 `git pull` 把最新的代码拉取下来瞅瞅。**git** **pull** 命令的作用是从远程仓库获取最新版本并合并到本地仓库。git pull = fetch + merge
>

> **注意**：如果当前本地仓库不是从远程仓库克隆，而是本地创建的仓库，并且仓库中存在文件，此时再从远程仓库拉取文件的时候会报错（fatal: refusing to merge unrelated histories ）解决此问题可以在git pull命令后加入参数--allow-unrelated-histories

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092104178.png" alt="image-20230409210427975" style="zoom:80%;" />

```sh
# 直接拉取远程仓库的新内容
git pull  
# 从远端origin的master分支更新版本库
# git pull <远端> <分支>
git pull origin master
# 抓取远程仓库所有分支更新并合并到本地，不要快进合并
git pull --no-ff
# 将远程master分支合并到当前本地master分支，冒号后面表示本地分支
git pull origin master:master 
git pull --allow-unrelated-histories
```

### 获取远程更新

`git fetch` 这个操作是将远程库的数据下载到本地库，但是工作区中的文件没有更新。

git fetch 从目标分支收集当前分支中不存在的任何提交，并将它们存储在本地存储库中。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207111857333.png" alt="image-20220711185703251" style="zoom: 50%;" />

而要谈 `get merge`，我们还需要先讲下`分支`。`merge` 是 `git pull` 默认的选项，合并其实还有另外一种方法：`rebase`，中文叫做**变基**。

```sh
git fetch 远程仓库地址/分支名
git fetch --all  #拉取所有远端的最新代码
git fetch origin master #拉取远程最新master分支代码
```

fetch与pull有什么不同？两者都是从服务端获取更新，主要区别是`fetch`不会自动合并，不会影响当前工作区内容

> git pull`=`git fetch`+`git merge

- 如下面图中，`git fetch`只获取了更新，并未影响`master`、`HEAD`的位置。
- 要更新`master`、`HEAD`的位置需要手动执行`git merge`合并。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304092105353.png" alt="image-20230409210556164" style="zoom:67%;" />

```sh
# fetch只更新版本库
git fetch
# 执行合并，合并自己
git merge
```

### 移除远程地址

```sh
git remote remove origin
# 再进行查看，发现已经没有远程仓库地址了
git remote -v
```

## 其他命令

### archive

```sh
# 生成一个可供发布的压缩包
$ git archive

# 打补丁
$ git apply ../sync.patch

# 测试补丁能否成功
$ git apply --check ../sync.patch

# 查看Git的版本
$ git --version
```

### rebase (谨慎使用)

**将一个分支上所有的提交历史都应用到另一个分支上，不要在一个已经公开的远端分支上使用 rebase**

```sh
# 将experimentBranch应用到master上面
# git rebase <basebranch> <topicbranch>
$ git rebase master experimentBranch
```

### ci

```sh
$ git ci <file>
$ git ci .
# 将git add, git rm和git ci等操作都合并在一起做
$ git ci -a
$ git ci -am "some comments"
# 修改最后一次提交记录
$ git ci --amend
```

### grep

可以在版本库中快速查找

可选配置：

```sh
# 感谢Travis Jeffery提供的以下用法：
# 在搜索结果中显示行号
$ git config --global grep.lineNumber true

# 是搜索结果可读性更好
$ git config --global alias.g "grep --break --heading --line-number"

# 在所有的java中查找variableName
$ git grep 'variableName' -- '*.java'

# 搜索包含 "arrayListName" 和, "add" 或 "remove" 的所有行
$ git grep -e 'arrayListName' --and \( -e add -e remove \)
```

## 实战演练⭐

这些都是要在当前文件所在目录进行的

### 本地操作

```c
// 初始化git存储库
git init
//0、本地创建并切换login分支
git checkout -b login
//查看文件状态
git status 
//1、所有文件添加到暂存区，再次查看文件名由红色变成了绿色
git add .
//2、提交到本地仓库
git commit -m "完成了登录功能"
//3、查看当前所在分支，和目前所有分支
git branch
//4、切换到要合并的分支
git checkout master
//5、将login分支代码合并到master分支
git merge login
```

### 提交到远程仓库

```c
//6、配置远程仓库，这是一开始创建仓库时就会提示好的
git remote add origin https://gitee.com/sure-s-renshuo/vue_shop.git
//7、提交到Gitee中，前提是配置好远程仓库，下次推送文件时，可以使用 git push。
git push -u origin master
//8、此时可以直接提交
git push
```

切换到login分支并提交login分支

```c
//此时远程仓库并没有login分支，因此需要执行命令,并且提交了代码到login分支里
git push -u origin login
```

上下两种方法最后都可以

完成user内容后，查看分支

```c
git branch
```

### 创建并切换到user分支

```c
git checkout -b user
```

```c
//1、所有文件添加到暂存区，再次查看文件名由红色变成了绿色
git add .
//2、提交到本地仓库
git commit -m "完成用户列表开发"
//3、远程仓库对应创建分支并推送，如果远程有该分支则直接git push即可
git push -u origin user
//4、切换到主分支
git checkout master
//5、合并到主分支
git merge login
//6、将主分支的代码也提交
git push
```

### 权限列表分支

```c
//查看分支
git branch
//创建并切换分支
git checkout -b rights
//在远程创建rights分支
git push -u origin rights
//如果后面切换分支失败则再次执行下面三步，git status查看文件状态
git add .
git commit -m "完成了权限列表的开发"
git push
//切换到主分支
git checkout master
git merge rights
git push
```

后面可以通过git checkout 分支名  切换分支，文件列表就会进行相应改变，很实用

注意：如果git push失败，那么可以强制推送

```c
git push -f 强制将本地文件推送至远程，这样会将远程仓库的已有的文件清掉
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211223142241154.png" alt="image-20211223142241154" style="zoom:67%;" />



# 图形化工具⭐

## 下载 & 安装

### 下载GitHub Desktop

Git官网提供对应得下载链接页面：https://git-scm.com/downloads/guis

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304070934425.png" alt="image-20230407093428237" style="zoom:80%;" />

### 安装和汉化

无安装过程，安装完成后，弹出应用界面

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304070941337.png" alt="image-20230407094115207" style="zoom:80%;" />

汉化：https://blog.csdn.net/qq_46365857/article/details/112581517

下载：https://github.com/robotze/GithubDesktopZhTool/releases/tag/3.2.0

访问`https://github.com/robotze/-GitHubDesktop_ZH`，下载中文汉化包。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304070945832.png" alt="image-20230407094528722" style="zoom:80%;" />

解压`GithubDesktop汉化工具.7z`，执行`GithubDesktopZhTool.exe`程序

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304070945056.png" alt="image-20230407094542951" style="zoom:80%;" />

点击汉化按钮，汉化成功。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304070945934.png" alt="image-20230407094559830" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304070944695.png" alt="image-20230407094425571" style="zoom:80%;" />

### 配置姓名邮箱

点击软件得File菜单后，选择Options, 设定软件得操作用户名称及对应得邮箱地址。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304070947903.png" alt="image-20230407094738803" style="zoom:80%;" />

### 主题样式

可以根据自己得偏好设定软件主题样式。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304070947338.png" alt="image-20230407094759242" style="zoom:80%;" />

### 全屏

如果觉得软件界面比较小，可以适当进行调整或全屏

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304070948888.png" alt="image-20230407094824786" style="zoom:80%;" />

## 创建本地仓库

### 创建仓库

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304070949516.png" alt="image-20230407094921406" style="zoom:80%;" />

> 注意，本地路径只需要指定父文件夹即可，最终路径是和名称进行拼接的

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304070952717.png" alt="image-20230407095226613" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304070954951.png" alt="image-20230407095449818" style="zoom:80%;" />

### 添加仓库

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304070956860.png" alt="image-20230407095640766" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304070956080.png" alt="image-20230407095620988" style="zoom:80%;" />

### 切换仓库

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304070957050.png" alt="image-20230407095755936" style="zoom:80%;" />

### 删除仓库

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304070959206.png" alt="image-20230407095919092" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071000778.png" alt="image-20230407100012684" style="zoom:80%;" />

## 文件操作

### 新增文件

当工作区域创建了一份新文件，工具可以自动识别并进行对应得显示

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071001058.png" alt="image-20230407100126881" style="zoom:80%;" />

此时Git仓库中并没有这份文件，所以需要执行commit操作，将文件保存到Git仓库中。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071001757.png" alt="image-20230407100159671" style="zoom:80%;" />

### 忽略文件

如果某一个文件或某一类得文件，不想被Git软件进行管理。可以在忽略文件中进行设定

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071004205.png" alt="image-20230407100406103" style="zoom:80%;" />

### 修改文件

修改文件只是将工作区域得文件进行修改，但是对于Git软件来讲，其实本质上还是提交，因为底层会生成新得文件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071004770.png" alt="image-20230407100426677" style="zoom:80%;" />

### 删除文件

删除文件对于Git软件来讲，依然是一个提交

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071004615.png" alt="image-20230407100447519" style="zoom:80%;" />

提交后，最新版本得文件也会被“删除”

### 历史记录

如果存在多次得提交操作得话，可以查看提交得历史记录

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071005492.png" alt="image-20230407100510375" style="zoom:80%;" />

## 分支操作

### 默认分支

软件创建仓库时，默认创建得分支为main

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071006153.png" alt="image-20230407100628067" style="zoom:80%;" />

点击右键可以改名

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071007819.png" alt="image-20230407100712731" style="zoom:80%;" />

### 创建分支

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071007727.png" alt="image-20230407100752637" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071008361.png" alt="image-20230407100828270" style="zoom:80%;" />

### 切换分支

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071009548.png" alt="image-20230407100927456" style="zoom:80%;" />

### 删除分支

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071010782.png" alt="image-20230407101034698" style="zoom:80%;" />

### 合并分支

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071012414.png" alt="image-20230407101214312" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071013422.png" alt="image-20230407101304328" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071013591.png" alt="image-20230407101321498" style="zoom:80%;" />

### 冲突解决

> 在main分支下，新建b.txt，然后在第一行写上123，然后提交文件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071051388.png" alt="image-20230407105149256" style="zoom:80%;" />

> 切换到user分支，此时文件夹中没有b.txt，再次创建b.txt，写入456

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071053166.png" alt="image-20230407105317044" style="zoom:80%;" />

> 再次切换到main分支，合并user分支

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071054682.png" alt="image-20230407105441578" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071055214.png" alt="image-20230407105500123" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071055581.png" alt="image-20230407105512499" style="zoom:80%;" />

> 删除多余内容，进行保存，即可再次提交

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071055110.png" alt="image-20230407105552029" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071056747.png" alt="image-20230407105604661" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071056894.png" alt="image-20230407105633814" style="zoom:80%;" />

## 标签操作

### 创建标签

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071014738.png" alt="image-20230407101455639" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071015506.png" alt="image-20230407101524421" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071016394.png" alt="image-20230407101625303" style="zoom:80%;" />

### 删除标签

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071017276.png" alt="image-20230407101734180" style="zoom:80%;" />

## 远程仓库

### 克隆仓库

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071047369.png" alt="image-20230407104720263" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071018421.png" alt="image-20230407101854332" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071021793.png" alt="image-20230407102147701" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071022698.png" alt="image-20230407102231599" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071022536.png" alt="image-20230407102249417" style="zoom:80%;" />

### 拉取文件

远程仓库更新了文件

![image-20230407102324707](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071023803.png)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071023933.png" alt="image-20230407102339808" style="zoom:80%;" />

拉取文件中

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071024689.png" alt="image-20230407102406570" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071024326.png" alt="image-20230407102420224" style="zoom:80%;" />

### 推送文件

本地创建新文件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071024439.png" alt="image-20230407102451273" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071025992.png" alt="image-20230407102511898" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071025632.png" alt="image-20230407102526531" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071025770.png" alt="image-20230407102542667" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071026319.png" alt="image-20230407102600220" style="zoom:80%;" />

## README & .gitignore

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071104990.png" alt="image-20230407110455905" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071104745.png" alt="image-20230407110438647" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071108745.png" alt="image-20230407110840642" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071109174.png" alt="image-20230407110910091" style="zoom:80%;" />

## 文件图标和内容比对

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071113748.png" alt="image-20230407111328659" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071114894.png" alt="image-20230407111408812" style="zoom:80%;" />

# 远程服务器

## 远程服务器

在之前的操作中，所有的操作都是基于本地机器完成的。如果在公司中，一个项目是共用一个版本库的。那么所有的开发人员都应该对同一个版本库进行操作。因为Git软件本身就是用于Linux系统开发所设计的版本管理软件，所以项目中搭建的共享版本库也应该以linux系统为主。那么接下来，咱们就演示一下在CentsOS服务器中搭建Git服务器。

### 下载Git软件（Linux版本）

官网下载地址：https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.38.1.tar.gz

将下载后的压缩文件上传到Linux系统中

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071422673.png" alt="image-20230407142226496" style="zoom:80%;" />

### 安装Git软件

#### 解压Git

```sh
# 将压缩文件解压到自定义位置
tar -zxvf git-2.38.1.tar.gz -C /opt/module/
# 可以更改名字，变得简短一些，好操作
cd /opt/module
mv git-2.38.1/ git 
```

#### 安装依赖

解压后，我们需要编译源码，不过在此之前需要安装编译所需要的依赖，耐心等待安装完成，中途出现提示的时候输入y并按回车。

```sh
yum install -y curl-devel expat-devel gettext-devel openssl-devel zlib-devel gcc perl-ExtUtils-MakeMaker
```

#### 删除旧版Git

安装编译源码所需依赖的时候，yum操作回自动安装旧版本的Git。我们这里需要卸载这个旧版的Git

```sh
# 删除旧版本的Git
yum -y remove git
```

#### 编译、安装Git

```sh
# 进入到Git软件的解压目录
cd /opt/module/git
# 编译时，prefix设定为Git软件安装目录
make prefix=/usr/local/git all
# 安装Git
make prefix=/usr/local/git install
```

#### 配置环境变量

修改linux系统中/etc/profile文件，配置环境变量

```sh
# 配置环境变量
export PATH=$PATH:/usr/local/git/bin
# 刷新环境，让环境变量立即生效
source /etc/profile
```

#### 建立链接文件

```sh
# git安装路径是/usr/local/git，不是默认路径
ln -s /usr/local/git/bin/git-upload-pack /usr/bin/git-upload-pack
ln -s /usr/local/git/bin/git-receive-pack /usr/bin/git-receive-pack
```

#### 测试安装

```sh
# 获取git软件版本
git --version
```

### 创建Git用户

因为Git服务器需要安装在linux系统上，当使用远程客户端操作时，就需要提供相应的Git账号进行提交的，如果你的仓库文件的用户不是git的话，是root用户或者别的用户，那么你git push ,它是不允许的，因为你的git用户没有权限。你可以给这个文件创立git用户，或者修改文件夹的权限让所有用户都可以更改

```sh
# 增加用户
adduser git
# 设定密码
passwd git
```

### SSH免密登录

#### 服务器端操作

```sh
# 进入用户目录
cd /home/git
# 在git用户根目录创建.ssh目录
sudo mkdir .ssh
sudo touch .ssh/authorized_keys
# 设定.ssh目录，authorized_keys的权限
sudo chmod -R 700 /home/git/.ssh
sudo chmod 600 /home/git/.ssh/authorized_keys
```

#### 客户端端操作

```sh
# 在客户端生成SSH密钥
# 默认生成的密钥用户就是当前用户，需要和之前的全局配置保持一致
user.name=18801@LAPTOP-J9IRK5BM
user.email=18801@LAPTOP-J9IRK5BM
# 按照提示三次回车即可
ssh-keygen -t rsa
```

![img](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071411084.jpg)

在用户根目录的.ssh文件夹内，id_rsa.pub就是我们要的公钥

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071427361.png" alt="image-20230407142723255" style="zoom:80%;" />

将文件中的内容复制到服务器端的.ssh/authorized_keys文件中

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071427136.png" alt="image-20230407142738033" style="zoom:80%;" />

### 创建Git版本库

#### 创建文件目录

```sh
# 进入用户目录
cd /home/git
# 创建版本库目录
mkdir git-rep 
# 设定文件所属用户
sudo chown git:git git-rep
```

#### 初始化版本库

```sh
# 进入仓库目录
cd /home/git/git-rep
# 初始化仓库，和前面的git init略有不同
git init -bare test.git
# 设定文件所属用户
sudo chown -R git:git test.git
```

### 远程访问Git版本库

#### 将远程仓库克隆到本地

```sh
# 将远程仓库克隆到本地，形成本地仓库
# 克隆远程仓库 => 用户@主机名:仓库地址
git clone git@linux1:/home/git/git-rep/test.git
```

#### 提交文件到本地仓库

```sh
# 增加文件
git add client.txt
# 提交文件
git commit -m 'client'
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071428139.png" alt="image-20230407142858018" style="zoom:80%;" />

#### 将本地仓库同步到远程仓库

```sh
# 同步远程仓库
# 远程仓库默认有个别名叫origin，将本地仓库的文件推送（push）到远程仓库
# git push 远程仓库别名 分支名称 
git push origin master
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071644976.png" alt="image-20230407164458851" style="zoom:80%;" />

#### 查看远程仓库

```sh
# 服务器端切换用户
su git
# 进入仓库
cd /home/git/git-rep/test.git
# 切换到主干分支
git checkout master
# 查看git日志
git log 
```

## GitHub服务器

公司中，我们可以搭建中央服务器让项目组开发人员共享代码，但是如果我们的开发人员都是通过互联网进行协作，而不是在同一个地方，那么开发时，程序文件代码的版本管理就显得更加重要，这就需要搭建一个互联网的版本库，让不同地点的人都可以进行访问。这里我们不用自己搭建。因为GitHub网站已经帮助我们提供了共享版本库功能。所以我们接下来就讲解一下，如何使用GitHub网站所提供的功能使用Git。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071646037.png" alt="image-20230407164633768" style="zoom:80%;" />

### 注册网站会员

GitHub官网地址：https://github.com/，填写你的邮箱地址和密码，姓名

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071646870.png" alt="image-20230407164648736" style="zoom:80%;" />

一顿操作，注册完毕后，进入你的主页

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071647649.png" alt="image-20230407164710504" style="zoom:80%;" />

### 创建新的仓库

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071647767.png" alt="image-20230407164732616" style="zoom:80%;" />

输入仓库的相关信息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071648530.png" alt="image-20230407164816408" style="zoom:80%;" />

点击创建按钮，创建新的仓库。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071648474.png" alt="image-20230407164834361" style="zoom:80%;" />

### 本地仓库的基本操作指令

```sh
# create a new repository on the command line**
echo "# git-study" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:Aitiger-coffee/git-study.git
git push -u origin main
# push an existing repository from the command line**
git remote add origin git@github.com:Aitiger-coffee/git-study.git
git branch -M main
git push -u origin main
```

### SSH免密操作

> github支持两种同步方式“https”和“ssh”。如果使用https很简单基本不需要配置就可以使用，但是每次提交代码和下载代码时都需要输入用户名和密码。ssh模式比https模式的一个重要好处就是，每次push、pull、fetch等操作时，不用重复填写遍用户名密码。前提是你必须是这个项目的拥有者或者合作者，且配好了ssh key。

#### 本地生成SSH密钥

```sh
# ssh-keygen -t rsa -C GitHub 账号
ssh-keygen -t rsa -C 1597374863@qq.com
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071712507.png" alt="image-20230407171218368" style="zoom:80%;" />

#### 集成用户公钥

执行命令完成后,在window本地用户.ssh目录C:\Users\用户名\.ssh下面生成如下名称的公钥和私钥:

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071713219.png" alt="image-20230407171336118" style="zoom:80%;" />

按照操作步骤，将id_rsa.pub文件内容复制到GitHub仓库中

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071714733.png" alt="image-20230407171408600" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071714195.png" alt="image-20230407171430066" style="zoom:80%;" />

点击Add按钮，增加SSH公钥信息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071714238.png" alt="image-20230407171444129" style="zoom:80%;" />

### 设定全局用户

```sh
git config --global user.name '15811009164'
# 这里的邮箱地址需要为GitHub网站的注册账号
git config --global user.email '15811009164@163.com'
```

### 创建本地库以远程地址

```sh
# 初始化本地仓库
git init
# 设置远程仓库
git remote add origin git@github.com:Aitiger-coffee/git-study.git
```

### 新增，提交本地仓库文件

```sh
# 新增文件
git add test.txt
# 提交文件
git commit test.txt
```

### 推送到GitHub远程仓库

```sh
# 新增文件
git add test.txt
# 提交文件
git commit test.txt
# 推送文件
git push origin master
```

### 查看GitHub远程仓库

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071926767.png" alt="image-20230407192623654" style="zoom:80%;" />

### 增加合作伙伴

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071926246.png" alt="image-20230407192651139" style="zoom:80%;" />

选择合作账号,发出合作申请

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071927199.png" alt="image-20230407192746090" style="zoom:80%;" />

### 合作伙伴确认

合作伙伴收到确认后，点击Join按钮继续

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071928001.png" alt="image-20230407192801898" style="zoom:80%;" />

点击Accept Invitation按钮，进行确认

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071928981.png" alt="image-20230407192819874" style="zoom:80%;" />

此时已经可以合作开发了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071929144.png" alt="image-20230407192906030" style="zoom:80%;" />

### 远程仓库fork操作

> 如果项目存在大量合作伙伴，对于版本库的管理明显是一个特别大的风险，所以如果不想要选择大量的合作伙伴，但依然有人想要对项目代码进行维护，更新和扩展的话，此时，我们就可以使用fork功能。Forking 工作流是以 Github 为代表的一种代码协作方式，开发者通过克隆（fork）源仓库进行编写代码，一旦完成会发起 pull request，源仓库作者可以选择是否接受该 PR。

随便找一个Github 开源项目：https://github.com/smileArchitect/JavaMap

右上角有三个按钮：Watch，Star，Fork

> `Watch` 是关注的意思，一旦你点击了之后，该项目有任何改动都会第一时间通知到你；
>
> `Star` 类似于点赞的意思，多给开源项目点个赞，鼓励一下作者；
>
> `Fork` 本意是分叉，实际上是克隆的意思，点了之后会将该项目拷贝一份到自己的 github 远程仓库中。

![图片](https://mmbiz.qpic.cn/mmbiz_png/RXvHpViaz3EqhgtTib3HWYNO4rjQUicgnaMGM1Pm8sGvmCkUpaibbuL68N9pNb8mgd1jqDibicCHxXDZTmXs8Flcib9Mg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

> 在本地执行 `git clone` 命令将代码克隆到本地，一顿修改操作后提交代码并 `push`到个人远程仓库中，然后在界面上发起 `pull request`，项目的原作者会看到你提交的 `PR`，根据提交的质量作者可以选择接受或拒绝。
>

Github 工作流程

<img src="https://mmbiz.qpic.cn/mmbiz_png/RXvHpViaz3EqhgtTib3HWYNO4rjQUicgnaMR1t2teG23V3wCFNJxDedzP8kIrAWnnPHkzkQXD9hRsp4mPrewpibzOQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:80%;" />

Forking 工作流非常适合于Github 开源项目，任何开发者都可以通过`fork + pull request` 向项目中贡献代码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071930472.png" alt="image-20230407193005368" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071931670.png" alt="image-20230407193121556" style="zoom:80%;" />

点击Create fork按钮即可

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071932870.png" alt="image-20230407193206763" style="zoom:80%;" />

> 这样就等同于创建了一个自己的远程仓库。但是这个远程仓库等同于是一个分支远程仓库，你可以随便操作，并不会影响源仓库，但是如果你的修改，更新想要融合到源仓库中，就需要提交申请了。
>

我们这里首先将文件改一下。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071932251.png" alt="image-20230407193244136" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071932754.png" alt="image-20230407193256652" style="zoom:80%;" />

发送提交申请

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071933903.png" alt="image-20230407193315797" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071933508.png" alt="image-20230407193337383" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071934952.png" alt="image-20230407193400825" style="zoom:80%;" />

合并修改请求

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071934424.png" alt="image-20230407193456313" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071935951.png" alt="image-20230407193510834" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071935408.png" alt="image-20230407193532292" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071935006.png" alt="image-20230407193549893" style="zoom:80%;" />

修改请求确认

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071936309.png" alt="image-20230407193624197" style="zoom:80%;" />

## Gitee集成

> 相对于GitHub来讲，由于网络的原因，我们在连接时不是很稳定，所以我们在采用第三方远程仓库时，也可以选择国内的Gitee平台。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071953396.png" alt="image-20230407195358241" style="zoom:80%;" />

### 注册网站会员

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071954605.png" alt="image-20230407195417424" style="zoom:80%;" />

### 用户中心

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071954449.png" alt="image-20230407195451322" style="zoom:80%;" />

### 创建远程仓库

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071955607.png" alt="image-20230407195508490" style="zoom: 80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071955237.png" alt="image-20230407195526126" style="zoom:80%;" />

### 远程仓库操作指令

```sh
# Git全局设置，修改成自己的信息
git config --global user.name "Aitiger"
git config --global user.email ["12252591+aitiger@user.noreply.gitee.com"]

# 创建git仓库，基本操作指令和其他远程仓库一致
mkdir git-study
cd git-study
git init 
touch README.md
git add README.md
git commit -m "first commit"
git remote add origin git@gitee.com:aitiger/git-study.git
git push -u origin "master"

# 已有仓库
cd existing_git_repo
git remote add origin git@gitee.com:aitiger/git-study.git
git push -u origin "master"
```

### 配置SSH免密登录

#### 本地生成SSH密钥

```sh
# ssh-keygen -t rsa -C Gitee账号
ssh-keygen -t rsa -C 12252591+aitiger@user.noreply.gitee.com
ssh-keygen -t ed25519 -C "1597374863@qq.com"
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211022100962.png" alt="image-20221102210017843" style="zoom:80%;" />

#### 集成用户公钥

执行命令完成后,在window本地用户.ssh目录C:\Users\用户名\.ssh下面生成如下名称的公钥和私钥:

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071956123.png" alt="image-20230407195658016" style="zoom:80%;" />

Linux设置账户共公钥，获取公钥：

```sh
cat ~/.ssh/id_rsa.pub
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211022100669.png" alt="image-20221102210041586" style="zoom:80%;" />

按照操作步骤，将id_rsa.pub文件内容复制到Gitee仓库中

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071957863.png" alt="image-20230407195732715" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071957164.png" alt="image-20230407195747058" style="zoom:80%;" />

验证是否配置成功

```sh
ssh -T git@gitee.com
```

![image-20221102210106473](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211022101564.png)

添加并上传远程仓库（创建仓库时会有提示的）

```sh
git remote add origin https://gitee.com/sure-s-renshuo/typora-img.git
git push -u origin master
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210930190101577.png" alt="image-20210930190101577" style="zoom:67%;" />

### 管理远程仓库

> 可以对远程仓库进行删除、清空代码、查看仓库状态等操作。
>
> 进入步骤：点击头像、进入设置。点击数据管理的 “仓库信息管理”

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211001155329489.png" alt="image-20211001155329489" style="zoom:67%;" />

点击进入对应仓库的设置

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211001155454305.png" alt="image-20211001155454305" style="zoom:67%;" />

可以看到进行仓库管理了

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211001155552723.png" alt="image-20211001155552723" style="zoom: 50%;" />

### 多用户协作

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072002683.png" alt="image-20230407200203570" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072002768.png" alt="image-20230407200215657" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072002201.png" alt="image-20230407200230070" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072002783.png" alt="image-20230407200242682" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072002680.png" alt="image-20230407200255571" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072003940.png" alt="image-20230407200313820" style="zoom:80%;" />

## GitLab集成

> 前面给大家讲解的都是如何使用第三方代码托管平台来管理咱们的代码库。那么我们自己搭建一个这样的平台行不行呢？其实咱们之前已经用Git软件搭建了一个远程版本库，但是功能相对来讲，比较单一，而且操作起来也不像GitHub, Gitee平台那样更加人性化，所以我们这里介绍一个GitLab软件，用于搭建自己的代码托管平台。
>

### GitLab介绍

> GitLab是由GitLabInc开发，使用MIT许可证的基于网络的Git仓库管理工具，且具有wiki和issue跟踪功能。使用Git作为代码管理工具，并在此基础上搭建起来的Web服务。
>

> GitLib由乌克兰程序员DmitriyZaporozhets和ValerySizov开发，它使用Ruby语言写成。后来，一些部分用Go语言重写。GitLab被IBM，Sony，JulichResearchCenter，NASA，Alibab，Invincea，O'ReillyMedia，Leibniz-Rechenzentrum(LRZ)，CERN，SpaceX等组织使用。

> 注意：gitlab相当占用内存，不用就停了吧

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072004545.png" alt="image-20230407200415407" style="zoom:80%;" />

### GitLab软件下载

官网地址：https://about.gitlab.com/

安装地址：https://about.gitlab.com/install/#ubuntu

这里我们可以根据个人情况，选择下载不同版本的软件：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072004818.png" alt="image-20230407200439689" style="zoom:80%;" />

我们这里主要是教学，所以下载使用社区版(CE)即可

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072004881.png" alt="image-20230407200455775" style="zoom:80%;" />

这里我们选择下载适用CentOS 7系统的版本

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072005548.png" alt="image-20230407200510439" style="zoom:80%;" />

下载地址：https://packages.gitlab.com/gitlab/gitlab-ce

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072005310.png" alt="image-20230407200531167" style="zoom:80%;" />

如果下载不了，或下载比较慢，可以根据提示在在linux系统中直接采用wget指令下载

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072005317.png" alt="image-20230407200547194" style="zoom:80%;" />

### GitLab安装

#### 修改HOSTS

win：C:\Windows\System32\drivers\etc\HOSTS，修改完成之后ping linux1即可

```sh
# 新增如下
221.238.82.216 linux1
```

linux：/etc/hosts，修改完成之后ping linux1即可

```sh
vi /etc/hosts
127.0.0.1 linux1
```

#### centsos安装GitLab

直接采用下载的RPM软件包安装即可

```sh
sudo rpm -ivh /opt/module/software/gitlab-ce-15.7.0-ce.0.el7.x86_64.rpm
```

安装配置依赖项

> 在CentOS 7上，下面的命令也会在系统防火墙中打开HTTP、HTTPS和SSH访问。这是一个可选步骤，如果您打算仅从本地网络访问极狐GitLab，则可以跳过它
>

```sh
sudo yum install -y curl policycoreutils-python openssh-server perl
sudo systemctl enable sshd
sudo systemctl start sshd
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo systemctl reload firewalld
# 为了演示方便，我们也可以直接关闭防火墙
sudo systemctl stop firewalld
```

初始化GitLab

```sh
# 配置软件镜像
curl -fsSL https://packages.gitlab.cn/repository/raw/scripts/setup.sh | /bin/bash
# 安装，注意https://后面跟虚拟机IP或者由IP指向的地址
sudo EXTERNAL_URL="https://linux1" yum install -y gitlab-ce
# 初始化
sudo gitlab-ctl reconfigure
```

#### ubuntu安装Gitlab

安装和配置必要的依赖项

```sh
sudo apt-get update
sudo apt-get install -y curl openssh-server ca-certificates tzdata perl
```

安装 Postfix（或 Sendmail）以发送通知电子邮件。如果你想要使用其他解决方案发送电子邮件，请跳过此步骤

```sh
sudo apt-get install -y postfix
```

在 Postfix 安装期间，可能会出现配置屏幕。选择 “互联网站点”，然后按回车键。将服务器的外部 DNS 用于 “邮件名称”，然后按回车键。如果出现其他屏幕，请继续 按回车键接受默认值。

添加 GitLab 包存储库并安装包

```sh
curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.deb.sh | sudo bash
sudo EXTERNAL_URL="https://202.113.69.19" apt-get install gitlab-ee
```

### 启动停止GitLab

```sh
# 启动
gitlab-ctl start
# 停止
gitlab-ctl stop
```

### 访问GitLab

使用浏览器访问GitLab，输入网址：http://linux1/users/sign_in

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072011215.png" alt="image-20230407201100099" style="zoom:80%;" />

初始化时，软件会提供默认管理员账户：root,但是密码是随机生成的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072011970.png" alt="image-20230407201129856" style="zoom:80%;" />

根据提示，在/etc/gitlab/initial_root_password文件中查找密码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072011437.png" alt="image-20230407201148326" style="zoom:80%;" />

输入账号，密码，进入系统

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072012930.png" alt="image-20230407201249811" style="zoom:80%;" />

#### 修改密码

默认的密码是随机的，且不容易记忆，还会在系统初始化后24小时被删除，所以需要先修改一下密码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072014925.png" alt="image-20230407201400807" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072014935.png" alt="image-20230407201414816" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072014408.png" alt="image-20230407201429296" style="zoom:80%;" />

#### 创建项目

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072014928.png" alt="image-20230407201450793" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072035584.png" alt="image-20230407203515442" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072035032.png" alt="image-20230407203534895" style="zoom:80%;" />

### 集成IDEA

#### 安装GitLab插件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072036286.png" alt="image-20230407203605147" style="zoom:80%;" />

#### 配置GitLab

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072036537.png" alt="image-20230407203621392" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072036432.png" alt="image-20230407203632315" style="zoom:80%;" />

#### 创建新项目

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072036550.png" alt="image-20230407203646444" style="zoom:80%;" />

#### 创建本地仓库

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072037063.png" alt="image-20230407203659939" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072037481.png" alt="image-20230407203714366" style="zoom:80%;" />

#### 创建新代码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072037318.png" alt="image-20230407203727211" style="zoom:80%;" />

#### 提交文件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072037474.png" alt="image-20230407203745359" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072038293.png" alt="image-20230407203800173" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072038325.png" alt="image-20230407203813222" style="zoom:80%;" />

#### 推送远程库

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072055267.png" alt="image-20230407205537137" style="zoom:80%;" />

#### 配置远程库

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072055319.png" alt="image-20230407205555206" style="zoom:80%;" />

#### 推送文件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072056279.png" alt="image-20230407205611087" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072056069.png" alt="image-20230407205621935" style="zoom:80%;" />

#### 合并提交请求

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072057292.png" alt="image-20230407205724155" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072057084.png" alt="image-20230407205738970" style="zoom:80%;" />

合并

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072058794.png" alt="image-20230407205808670" style="zoom:80%;" />

确认文件提交

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072058138.png" alt="image-20230407205843014" style="zoom:80%;" />



# 集成IDEA

## 配置环境

> 实际的开发中，代码都是采用IDE进行开发，所以我们这里介绍一下IDEA软件是如何集成GitHub远程仓库进行代码版本控制的。这里采用的IDEA版本为2022.2.1,其他版本的IDEA软件会略有差别
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071936778.png" alt="image-20230407193659679" style="zoom:80%;" />

### 配置Git软件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071937334.png" alt="image-20230407193715200" style="zoom:80%;" />

### 配置账号

Gitee和Github都是一样的操作

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071937582.png" alt="image-20230407193742451" style="zoom:80%;" />

继续点授权按钮，没弹出来就切换默认浏览器为EDGE

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071940898.png" alt="image-20230407194053800" style="zoom:80%;" />

继续点击授权按钮

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071941250.png" alt="image-20230407194106129" style="zoom:80%;" />

输入GitHub账号密码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071941999.png" alt="image-20230407194137898" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304082141424.png" alt="image-20230408214101317" style="zoom:80.3%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304082140093.png" alt="image-20230408214043903" style="zoom:80%;" />

### 安装插件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071958244.png" alt="image-20230407195826121" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304082142399.png" alt="image-20230408214218263" style="zoom:80%;" />

## 创建项目

### 创建项目

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071942394.png" alt="image-20230407194214268" style="zoom:80%;" />

### 添加项目代码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071942021.png" alt="image-20230407194231924" style="zoom:80%;" />

## 初始化本地仓库

```sh
# 方式一：直接进命令行输入，即可
git init
```

方式二

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071942907.png" alt="image-20230407194249805" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071943106.png" alt="image-20230407194315007" style="zoom:80%;" />

方式三

在IDEA中通过如下操作可以在本地初始化一个本地仓库，其实底层就是执行的 git init 命令。操作过程如下：

1）依次选择菜单【VCS】---【Import into Version Control】---【Create Git Repository】

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010913322.png" alt="image-20210926153806414" style="zoom:80%;" />

2）在弹出的【Create Git Repository】对话框中选择当前项目根目录，点击【OK】按钮：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010913323.png" alt="image-20210926154201744" style="zoom:80%;" />

操作完成后可以看到当前项目根目录下出现了.git隐藏目录：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010918532.png" alt="image-20221101091825463" style="zoom:80%;" />

操作完成后可以在IDEA的工具栏中看到Git的相关操作图标：<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010918261.png" alt="image-20221101091843201" style="zoom:80%;" />

## 克隆远程仓库

在IDEA中从远程仓库克隆本质就是执行的 git clone 命令，具体操作过程如下：

1）在IDEA开始窗口中点击【Get from Version Control】

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010913327.png" alt="image-20210926155434202" style="zoom:80%;" />

2）在弹出的【Get from Version Control】窗口中输入远程仓库的URL地址和对应的本地仓库存放目录，点击【Clone】按钮进行仓库克隆操作

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010913332.png" alt="image-20210926155750107" style="zoom:80%;" />

## 本地仓库操作

本地仓库操作：

- 将文件加入暂存区，本质就是执行 git add 命令
- 将暂存区的文件提交到版本库，本质就是执行 git commit 命令
- 查看日志，本质就是执行 git log 命令

### 将文件加入暂存区

当在Git工作区新增文件或者对已有文件修改后，就需要将文件的修改加入暂存区，具体操作如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010913839.png" alt="image-20210926162515597" style="zoom:80%;" />

### 提交本地版本库

> 将暂存区文件提交到版本库，可以选择一个文件进行提交，也可以选择整个项目提交多个文件。在IEDA中对文件的提交进行了简化操作，也就是如果文件修改后，无需再加入暂存区，可以直接提交。

> 由于提交操作属于高频操作，所以为了进一步方便操作，在IDEA的工具栏中提供了提交操作的快捷按钮：![image-20210926163535277](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010913197.png)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071943749.png" alt="image-20230407194354623" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071944683.png" alt="image-20230407194414576" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071944436.png" alt="image-20230407194432303" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071944687.png" alt="image-20230407194450576" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071945158.png" alt="image-20230407194507056" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071945697.png" alt="image-20230407194519593" style="zoom:80%;" />

### 查看提交历史

> 查看日志，**既可以查看整个仓库的提交日志，也可以查看某个文件的提交日志**。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071949705.png" alt="image-20230407194924589" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071949342.png" alt="image-20230407194952204" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071950485.png" alt="image-20230407195031360" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071951553.png" alt="image-20230407195115424" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211030910639.png" alt="image-20221103091019549" style="zoom:80%;" />

2）查看某个文件的提交日志

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010913524.png" alt="image-20210926164210056" style="zoom:67%;" />

![image-20210926164233935](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010913554.png)

## 远程仓库操作

> - 查看远程仓库，本质就是执行 git remote 命令
> - 添加远程仓库，本质就是执行 git remote add 命令
> - 推送至远程仓库，本质就是执行 git push 命令
> - 从远程仓库拉取，本质就是执行 git pull 命令

### 查看远程仓库

操作过程如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010913889.png" alt="image-20210926165935756" style="zoom:80%;" />

在弹出的【Git Remotes】窗口中可以看到配置的远程仓库：

![image-20210926170143160](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010913031.png)

### 添加远程仓库

一个本地仓库可以配置多个远程仓库，在【Git Remotes】窗口中点击【+】来添加一个新的远程仓库：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010913066.png" alt="image-20210926170653126" style="zoom:80%;" />

### 推送至远程仓库

可以通过如下操作将本地仓库文件推送至远程仓库：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071945150.png" alt="image-20230407194534049" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071945337.png" alt="image-20230407194554213" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071946442.png" alt="image-20230407194617342" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071947519.png" alt="image-20230407194733414" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071948266.png" alt="image-20230407194801154" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071948275.png" alt="image-20230407194820153" style="zoom:80%;" />

在弹出的【Push Commits】窗口中可以看到本次推送的文件，点击【Push】按钮即可推送至远程仓库：

![image-20210926171058705](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010913294.png)

由于推送至远程仓库操作属于高频操作，所以可以通过IDEA工具栏中的提交快捷按钮同时完成提交和推送：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010939698.png" alt="image-20221101093914588" style="zoom:80%;" />

点击【Commit and Push...】按钮同时完成提交和推送操作

### 从远程仓库拉取

可以通过如下操作从远程仓库拉取：

![image-20210926171646041](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010913534.png)

由于从远程仓库拉取文件属于高频操作，所以在IDEA的工具栏中提供了对应的快捷按钮：![image-20210926171919288](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010913658.png)

在弹出的【Update Project】窗口中点击【OK】：

![image-20210926171950911](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010913685.png)

### 拉取代码冲突

上面我们提了分支合并，可以从本地分支合并，也可以从远程仓库合并，一般两个并行开发的分支合并都是会有冲突，Idea中合并冲突是非常方便的。在合并过程中发生了冲突，Idea会提示冲突，选择`Merge`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207271000786.png" alt="image-20220727100034671" style="zoom:50%;" />

Idea提供了三个分栏，我们可以点击箭头，很方便地处理冲突

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207271000123.png" alt="image-20220727100053001" style="zoom:67%;" />

如果合并时没有处理，也可以在`Version Controller`中处理

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207271001210.png" alt="image-20220727100144094" style="zoom:67%;" />

#### 增加远程地址

```sh
# 增加远程地址
git remote add gitee-study git@gitee.com:aitiger/git-study.git
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072000450.png" alt="image-20230407200025344" style="zoom:80%;" />

#### 提交本地代码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072000538.png" alt="image-20230407200045437" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072000851.png" alt="image-20230407200059735" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072001576.png" alt="image-20230407200118471" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304072001630.png" alt="image-20230407200140498" style="zoom:80%;" />

## 分支操作

- 查看分支，本质就是执行 git branch 命令
- 创建分支，本质就是执行 git branch 分支名 命令
- 切换分支，本质就是执行 git checkout 命令
- 将分支推送到远程仓库，本质就是执行 git push 命令
- 合并分支，本质就是执行 git merge 命令

### 分支图解⭐

分支切换/比较/合并/重命名/删除，在Idea中这些功能的使用也常简单，点击分支，点击要操作的分支，可以看到

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207271004013.png" alt="image-20220727100431902" style="zoom: 50%;" />

### 查看分支

可以通过如下操作查看分支：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010913889.png" alt="image-20210926172752562" style="zoom:80%;" />

在弹出的窗口中可以看到本地分支和远程分支：

![image-20210926172903493](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010913923.png)

由于分支操作属于高频操作，所以在IDEA的状态栏中提供了分支操作的快捷按钮：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010913953.png" alt="image-20210926173622605" style="zoom:80%;" />

点击【master】快捷按钮即可弹出【Git Branches】分支窗口：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010913153.png" alt="image-20210926173744979" style="zoom:80%;" />

### 创建分支

在【Git Branches】分支窗口中点击【New Branch】，弹出如下窗口：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071951709.png" alt="image-20230407195130602" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071951657.png" alt="image-20230407195141552" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071951781.png" alt="image-20230407195154673" style="zoom:80%;" />

### 切换分支

通过如下操作可以切换分支：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010913214.png" alt="image-20210926174358500" style="zoom:80%;" />

### 推送分支

通过如下操作可以将分支推送到远程仓库：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071952320.png" alt="image-20230407195206209" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304071952693.png" alt="image-20230407195221564" style="zoom:80%;" />

![image-20210926175004502](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010913342.png)

### 合并分支

通过下面操作可以进行分支的合并：

![image-20210926175216197](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211010913374.png)















