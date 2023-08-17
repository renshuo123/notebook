

2022.9.26日修改完善

[超全 Linux 基础命令总结](https://mp.weixin.qq.com/s?__biz=Mzg5NDY3NzIwMA==&mid=2247505627&idx=2&sn=4c027652fed362696cd7c679d95e62d4&chksm=c0196f64f76ee672b511c075ba391a9b7d7eede0527d76695629ad69f048fc5b38b7b2c663ca&mpshare=1&scene=23&srcid=0416hpn57RxVd6xGWMBNw5lq&sharer_sharetime=1681660166749&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

# Linux入门和初体验

## 前言

### 什么是Linux

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557983.png" alt="image-20210808232140228" style="zoom:80%;" /> 

Linux是一套免费使用和自由传播的操作系统。说到操作系统，大家比较熟知的应该就是Windows和MacOS操作系统，我们今天所学习的Linux也是一款操作系统。

### 为什么要学Linux

那么我们为什么要学习Linux呢，主要出于两个方面的原因。

**1). 企业用人要求**

以下，是从知名招聘网站上搜索的java开发工程师的岗位要求，在很多的岗位要求中都提到了Linux操作系统的经验。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557992.png" alt="image-20210808233115557" style="zoom:80%;" /> 

为什么作为javaEE开发工程师，企业还要求我们会Linux操作系统的相关知识呢?

这是因为Linux操作系统提供了很多稳定的发行版本，广泛的应用在我们的各种服务器操作系统领域，我们将来开发出来的项目，最终要上线运行，就需要将项目部署在Linux服务器中。

**2). 个人发展需要**

![image-20210808233951662](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557992.png) 

我们作为javaEE开发工程师，将来在企业中开发时会涉及到很多的数据库、中间件等技术，比如MySQL、Redis、MQ等技术，而这些应用软件大多都是需要安装在Linux系统中使用的。我们做为开发人员，是需要通过远程工具连接Linux操作系统，然后来操作这些软件的。而且一些小公司，可能还需要我们自己在服务器上安装这些软件。

所以，不管从企业的用人需求层面，还是个人发展需要层面来讲，我们作为服务端开发工程师，Linux的基本使用是我们必不可少的技能。

### 学完Linux能干什么

学习完Linux操作系统课程之后，我们可以做以下几个方面的事情： 

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557991.png" alt="image-20210808234042174" style="zoom:80%;" /> 

#### 1 环境搭建

系统安装 : 一般我们不会直接将Linux系统安装在本机电脑上，而会安装在公司的一台专门的服务器上。 

远程连接 : 那么我们要想使用服务器，一般都是通过远程连接工具连接Linux系统进行操作。

#### 2 常用命令

连接上服务器之后，我们可以通过所学习的相关指令， 来操作Linux服务器，在Linux服务器中可以执行如下操作： 

A. 文件、目录的基本操作(查看,删除,创建等)

B. 文件及文件夹的拷贝、移动、重命名

C. 文件的打包、压缩、解压缩操作

D. 文本的编辑

#### 3 安装软件

基本的常用指令学会操作之后，我们可以在Linux服务器中安装我们开发常用的软件，比如： JDK、Tomcat、MySQL的安装及配置。

#### 4 项目部署

把基础的软件及环境安装配置好之后，我们就可以将我们开发的项目部署在服务器中进行运行并测试。

对于我们学习Linux操作系统时，Linux命令是基础，也是学习Linux系统的重点内容，虽然Linux的指令有很多，但是我们常用的指令并不多，大家在学习的时候，主要掌握这部分常用的指令就可以了，对于其他的指令，以后我们用到的时候，知道怎么查询即可。

**对于Linux的常用指令的学习，最好的学习方法就是：<font color='red' size=3>多敲</font>**



## Linux概述

### 主流操作系统

不同领域的主流操作系统，主要分为以下这么几类： 桌面操作系统、服务器操作系统、移动设备操作系统、嵌入式操作系统。接下来，这几个领域中，代表性的操作系统是那些?

1). 桌面操作系统

| 操作系统 | 特点                                   |
| -------- | -------------------------------------- |
| Windows  | 用户数量最多                           |
| MacOS    | 操作体验好，办公人士首选               |
| Linux    | 用户数量少(桌面操作系统,Linux使用较少) |

2). 服务器操作系统

| 操作系统       | 特点                       |
| -------------- | -------------------------- |
| Unix           | 安全、稳定、付费           |
| Linux          | 安全、稳定、免费、占有率高 |
| Windows Server | 付费、占有率低             |

3). 移动设备操作系统

| 操作系统 | 特点                                                         |
| -------- | ------------------------------------------------------------ |
| Android  | 基于 Linux 、开源，主要用于智能手机、平板电脑和智能电视      |
| IOS      | 苹果公司开发、不开源，用于苹果公司的产品，例如：iPhone、 iPad |

4). 嵌入式操作系统

| 操作系统 | 特点                   |
| -------- | ---------------------- |
| Linux    | 机顶盒、路由器、交换机 |

### Linux发展历史

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557993.png" alt="image-20210809000920156" style="zoom:80%;" />  

时间：1991年

地点：芬兰赫尔辛基大学

人物：Linus Torvalds（21岁）

语言：C语言、汇编语言

logo：企鹅

特点：免费、开源(源代码开放)、多用户(同时允许多个用户操作同一个Linux系统)、多任务(同时允许多个任务执行)

### Linux发行版

Linux系统的版本分为两种，分别是： 内核版 和 发行版。

内核是免费、开源的，这也就代表了：

- 任何人都可以获得并修改内核，并且自行集成系统级程序
- 提供了内核+系统级程序的完整封装，称之为Linux发行版

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052112900.png" alt="image-20221105211219836" style="zoom:80%;" />

- 基于Linux内核版进行扩展

- 由各个Linux厂商开发、维护

- 有收费版本和免费版本

我们使用Linux操作系统，实际上选择的是Linux的发行版本。在linux系统中，有各种各样的发行版本，具体如下： 

| 发行版本  | Logo                                                         | 特点                             |
| --------- | ------------------------------------------------------------ | -------------------------------- |
| Ubuntu    | <img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021607597.png" alt="image-20221102160712530" style="zoom:80%;" /> | 以桌面应用为主                   |
| RedHat    | <img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021607228.png" alt="image-20221102160724156" style="zoom:80%;" /> | 应用最广泛、收费                 |
| CentOS    | <img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021607442.png" alt="image-20221102160737380" style="zoom:80%;" /> | RedHat的社区版、免费             |
| openSUSE  | <img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021607562.png" alt="image-20221102160748493" style="zoom:80%;" /> | 对个人完全免费、图形界面华丽     |
| Fedora    | <img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021608109.png" alt="image-20221102160804044" style="zoom:80%;" /> | 功能完备、快速更新、免费         |
| 红旗Linux | <img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021608825.png" alt="image-20221102160814755" style="zoom:80%;" /> | 北京中科红旗软件技术有限公司开发 |

除了上述罗列出来的发行版，还有很多Linux发行版，这里，我们就不再一一列举了。

### Linux内核

Linux系统的组成如下：Linux系统内核，系统级应用程序两部分组成。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052107659.png" alt="image-20221105210746542" style="zoom:80%;" />

> 内核提供系统最核心的功能，如：调度CPU、调度内存、调度文件系统、调度网络通讯、调度IO等。系统级应用程序，可以理解为出厂自带程序，可供用户快速上手操作系统，如：文件管理器、任务管理器、图片查看、音乐播放等。比如，播放音乐，无论用户使用自带音乐播放器或是自行安装的第三方播放器均是由播放器程序，调用内核提供的相关功能，由内核调度CPU解码、音响发声等。

可以看出，内核是Linux操作系统最核心的所在，系统级应用程序只是锦上添花。Linux内核是免费开源的，任何人都可以下载内核源码并查看且修改。可以通过：https://www.kernel.org  去下载Linux内核

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052111302.png" alt="image-20221105211130226" style="zoom:80%;" />



## 虚拟机

学习Linux系统，就需要有一个可用的Linux系统。如何获得？将自己的电脑重装系统为Linux？NoNo。这不现实，因为Linux系统并不适合日常办公使用。我们需要借助虚拟机来获得可用的Linux系统环境进行学习。

那么，什么是虚拟机呢？

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052113578.png" alt="image-20221105211344513" style="zoom:80%;" />

借助虚拟化技术，我们可以在系统中，通过软件：模拟计算机硬件，并给虚拟硬件安装真实的操作系统。这样，就可以在电脑中，虚拟出一个完整的电脑，以供我们学习Linux系统。

## Linux安装

### 安装方式介绍

Linux系统的安装方式，主要包含以下两种：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557051.png" alt="image-20210809184915617" style="zoom:80%;" /> 

| 方式       | 概述                             | 场景                                                         |
| ---------- | -------------------------------- | ------------------------------------------------------------ |
| 物理机安装 | 直接将操作系统安装到服务器硬件上 | 企业开发中，我们使用的服务器基本都是采用这种方式             |
| 虚拟机安装 | 通过虚拟机软件安装               | 我们在学习阶段，没有自己服务器，而我们又需要学Linux，就可以安装在虚拟机上 |

**虚拟机**（Virtual Machine）指通过**软件**模拟的具有完整硬件系统功能、运行在完全隔离环境中的完整计算机系统。常用虚拟机软件： 

- VMWare 

- VirtualBox

- VMLite WorkStation

- Qemu

- HopeddotVOS

那么我们就可以在课程中将Linux操作系统安装在虚拟机中，我们课上选择的虚拟机软件是VMware。

### 安装VMware

![image-20210809223354144](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557746.png) 

在我们的课程资料中提供了VMware的安装程序。直接双击运行VMware安装程序，根据提示完成安装即可。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557811.png" alt="image-20210809223932893" style="zoom:80%;" /> 

![image-20210809223953820](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557011.png) 

以上就是VMware在安装时的每一步操作，基本上就是点击 "下一步" 一直进行安装。

### 安装Linux

VMware虚拟机安装完毕之后，我们就可以打开VMware，并在上面来安装Linux操作系统。具体步骤如下： 

首先，我们需要下载操作系统的安装文件，本次使用CentOS7.6版本进行学习：

https://vault.centos.org/7.6.1810/isos/x86_64/  (最后的/不要漏掉）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052114555.png" alt="image-20221105211452484" style="zoom:80%;" />

**1). 选择创建新的虚拟机**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557051.png" alt="image-20210809224601436" style="zoom:80%;" /> 



**2). 选择"典型"配置**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557253.png" alt="image-20210809224640245"  /> 

**3). 选择"稍后安装操作系统(S)"**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557341.png" alt="image-20210809224740271" style="zoom:80%;" /> 

**4). 选择"Linux"操作系统,"CentOS7 64位"版本**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557450.png" alt="image-20210809224851755" style="zoom:80%;" /> 

**5). 设置虚拟机的名称及系统文件存放路径**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557585.png" alt="image-20210809225106268" style="zoom:80%;" /> 

**6). 设置磁盘容量**

**7). 自定义硬件信息**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021610687.png" alt="image-20210809225706412" style="zoom:80%;" /> 

**8). 启动上述创建的新虚拟机**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557914.png" alt="image-20210809230230390" style="zoom:80%;" />  

**9). 选择"Install CentOS7"**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557041.png" alt="image-20210809230720673" style="zoom:80%;" /> 

> 进入到Linux系统里面, 我们发现光标无法移动到windows操作系统中了, 这个时候, 我们可以通过快捷键 "Ctrl+Alt" 切换光标到windows系统中。

**10). 选择语言为 "简体中文"**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557168.png" alt="image-20210809231002444" style="zoom:80%;" /> 

**11). 选择"自动配置分区"**

![image-20210809231704202](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557210.png)  

12). 选择"最小安装(不要选择最小安装，选择带桌面的安装)"

![image-20210809232041661](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557420.png) 

**13). 设置"root"用户密码**

![image-20210809232438579](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557465.png) 

安装完毕后，点击窗口中的蓝色的 "重启" 按钮，重启Linux系统。



**14). 登录系统**

![image-20210809232913715](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557526.png) 

> <font color='red'>注意 : 在Linux系统中，在命令行中输入密码信息，为了保证安全性，密码是不显示的(看似没有输入，实际已经输入了)；</font>

### 网卡设置

服务器重启完成之后，我们可以通过linux的指令 `ip addr` 来查询Linux系统的IP地址，具体信息如下: 

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557012.png" alt="image-20210809233341574" style="zoom:80%;" /> 

从图中我们可以看到，并没有获取到linux系统的IP地址，这是为什么呢？这是由于启动服务器时未加载网卡，导致IP地址初始化失败而造成的。那么接下来我们就需要来修改网络初始化配置，设定网卡在系统启动时初始化。

**具体操作步骤如下：** 

1). 修改网卡的配置项

```java
cd /				进入根目录
cd etc				进入etc目录
cd sysconfig		进入sysconfig目录
cd network-scripts	进入network-scripts
vi ifcfg-ens33		编辑ifcfg-ens33文件


进入文件后执行如下操作: 
①. 按 i 键 		 进入编辑状态
②. 按↑↓键来移动光标, 删除no,输入yes 
③. 按 ESC 键
④. 输入 :wq
⑤. 按 ENTER	保存退出
```

![image-20210809234131816](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557062.png) 

> <font color='red'>备注: 在上述的操作中用到了Linux中的相关指令, 目前大家不用深究, 后面会详细讲解, 目前大家只需要把这个文件的配置项ONBOOT的值有no改为yes即可。</font>

2). 重新启动虚拟机

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557263.png" alt="image-20210809234617798" style="zoom:80%;" /> 

重启之后, 再次输入root的用户名密码，登录到Linux系统之后，可以通过指令 `ip addr` 来查看IP地址。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557398.png" alt="image-20210809235056773" style="zoom:80%;" /> 

### 安装SSH连接工具

#### SSH连接工具介绍

Linux已经安装并且配置好了，接下来我们要来学习Linux的基本操作指令。而在学习之前，我们还需要做一件事情，由于我们企业开发时，Linux服务器一般都是在远程的机房部署的，我们要操作服务器，不会每次都跑到远程的机房里面操作，而是会直接通过SSH连接工具进行连接操作。

![image-20210810000224690](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557436.png) 

SSH（Secure Shell），建立在应用层基础上的安全协议。常用的SSH连接工具: 

| SSH工具    | Logo | 说明                                    |
| ---------- | ---- | --------------------------------------- |
| putty      |      | 免费, 界面简单, 功能单一                |
| secureCRT  |      | 收费, 功能强大                          |
| xshell     |      | 收费版/免费版                           |
| finalshell |      | 免费, 功能强大, 界面效果好 (课程中采用) |

#### FinalShell安装

在课程资料中，提供了finalShell的安装包

![image-20210810000309123](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557585.png) 

双击.exe文件，然后进行正常的安装即可。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021613382.png" alt="image-20210810000318212" style="zoom:80%;" /> 

#### 连接Linux

**1). 打开finalShell**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557710.png" alt="image-20210810173004153" style="zoom:80%;" /> 



**2). 建立连接**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557799.png" alt="image-20210810173138650" style="zoom:80%;" /> 

 ![image-20210810173900140](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557115.png) 

### 设置阿里云下载源⭐

#### centos7

```sh
# 备份原来的yum源，以防后续使用
cd /etc/yum.repos.d/;mkdir bak/; mv *.repo bak/
# 下载阿里云的base源
wget https://mirrors.aliyun.com/repo/Centos-7.repo
# 下载阿里云的epel源
wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo
# 清除缓存并生成新的缓存
yum clean all && yum makecache
```

#### ubuntu20

```sh
sudo mv /etc/apt/sources.list /etc/apt/sources.list.bak
sudo vim /etc/apt/sources.list

deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse

sudo apt-get update
sudo apt-get upgrade
```

## WSL2虚拟机⭐

### 为什么要用WSL

WSL作为Windows10系统带来的全新特性，正在逐步颠覆开发人员既有的选择。

- 传统方式获取Linux操作系统环境，是安装完整的虚拟机，如VMware
- 使用WSL，可以以非常轻量化的方式，得到Linux系统环境

目前，开发者正在逐步抛弃以虚拟机的形式获取Linux系统环境，而在逐步拥抱WSL环境。所以，课程也紧跟当下趋势，为同学们讲解如何使用WSL，简单、快捷的获得Linux系统环境。所以，为什么要用WSL，其实很简单：

- 开发人员都在用，大家都用的，我们也要学习

- 实在是太方便了，简单、好用、轻量化、省内存

### 什么是WSL

> WSL：Windows Subsystem for Linux，是用于Windows系统之上的Linux子系统。
>
> 作用很简单，可以在Windows系统中获得Linux系统环境，并完全直连计算机硬件，无需通过虚拟机虚拟硬件。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052118138.png" alt="image-20221105211850053" style="zoom:80%;" />

### 微软应用商店连不上网问题

总结：使用代理VPN的锅

你曾经使用过某些可以修改代理设置的软件，比如，你是不是上过谷歌？看过油管？是不是用过游戏外服加速器？如果你用过，那么往下看，如果没用过，不保证这个办法对你有用。

当你关闭代理软件后，系统的代理源出现了问题。默认的代理源是ie代理设置，你使用的其他软件把这个代理源修改为别的了，所以系统无法通过代理连接到windows商店服务器。

打开管理员的PowerShell，执行如下命令，执行即可

```sh
netsh winhttp import proxy source=ie
WSReset.exe
```

重启电脑，然后就能用了，注意把网络连接最下面的代理里面的三个选项给关了

### WSL 部署

#### 开启WSL功能

WSL是Windows10自带功能，需要开启，无需下载

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052119174.png" alt="image-20221105211943092" style="zoom:80%;" />

点击确定后会进行部署，最后重启即可。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052120559.png" alt="image-20221105212025479" style="zoom:80%;" />



#### 下载Ubuntu

打开Windows应用商店

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052121893.png" alt="image-20221105212109790" style="zoom:80%;" />

点击获取并安装

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052122539.png" alt="image-20221105212209447" style="zoom:80%;" />

点击启动

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052122151.png" alt="image-20221105212246990" style="zoom:80%;" />

#### 创建用户

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052123702.png" alt="image-20221105212312628" style="zoom:80%;" />

#### 进入Ubuntu系统

至此，得到了一个可用的Ubuntu操作系统环境

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052123020.png" alt="image-20221105212348935" style="zoom:80%;" />

#### 安装 Windows Terminal软件

Ubuntu自带的终端窗口软件不太好用，我们可以使用微软推出的：Windows Terminal软件

在应用商店中搜索terminal关键字，找到Windows Terminal软件下载并安装

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052127239.png" alt="image-20221105212743143" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052129353.png" alt="image-20221105212901262" style="zoom:80%;" />

再次打开Windows Terminal软件，即默认使用Ubuntu系统了（WSL）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052129149.png" alt="image-20221105212931070" style="zoom:80%;" />

#### 设置root密码

```sh
sudo passwd 按回车，she'z
```

#### 关闭Ubuntu

```sh
wsl --shutdown
```

### 切换Ubuntu安装位置

https://www.jianshu.com/p/6f3195bad5f1

在powershell中输入代码：

```sh
wsl -l -v
```

图中STATE显示Running，就需要使用

```sh
wsl --shutdown
```

将其关闭，再次使用"wsl -l -v"确认状态，发现已经不在运行了

②导出当前Linux的镜像，其中，"Ubuntu"是使用"wsl -l -v"查看到的linux系统的名字和版本

```sh
wsl --export Ubuntu E:\WSLUbuntu\ubuntu.tar
```

③注销之前的系统并检查，Powershell中输入：再通过“wsl -l -v”，发现子系统已删除

```sh
wsl --unregister Ubuntu
wsl -l -v
```

④导入镜像，再次查看，可以用了

第一个路径是安装位置，第二个路径是压缩包位置

```sh
wsl --import Ubuntu E:\WSLUbuntu E:\WSLUbuntu\ubuntu.tar
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211060942389.png" alt="image-20221106094220317" style="zoom:80%;" />

### 切换为WSL2

> WSL2可以直接用显卡，nvidia-smi

还是和上面一样，右键设置，应用与功能，程序与功能，启用或关闭Linux功能

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061124464.png" alt="image-20221106112451385" style="zoom:67%;" />

```sh
wsl --set-default-version 2
wsl -l -v
# Ubuntu是上面查出来的name
wsl --set-version Ubuntu 2
wsl -l -v
netsh winsock reset
```

重启电脑后，查看显卡

```sh
nvidia-smi
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061121017.png" alt="image-20221106112155918" style="zoom:80%;" />

### 允许SSH

> 注意：连接可以使用127.0.0.1进行连接，不需要每次都修改IP

1.据网上说的是，需要先卸载ssh后再安装。【我这里是先卸载了再安装】

```javascript
sudo apt-get remove openssh-server
sudo apt-get install openssh-server
```

2.编辑sshd_config文件

```javascript
sudo vi /etc/ssh/sshd_config
```

可能有几处需要修改：

```apl
Port 22
PermitRootLogin yes
PasswordAuthentication yes
```

3.重启ssh服务(每次启动都要执行)

```javascript
sudo service ssh restart
```

4.获取本地ip

```javascript
ifconfig
```

### WSL2出现不支持对象问题

> 打开powershell，以管理员模式打开，输入以下命令，无需重启，即可完成

```sh
netsh winsock reset
```

## 虚拟机快照

在学习阶段我们无法避免的可能损坏Linux操作系统。如果损坏的话，重新安装一个Linux操作系统就会十分麻烦。VMware虚拟机（Workstation和Funsion）支持为虚拟机制作快照。通过快照将当前虚拟机的状态保存下来，在以后可以通过快照恢复虚拟机到保存的状态。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052130288.png" alt="image-20221105213035222" style="zoom:80%;" />

在VMware Workstation Pro中制作并还原快照

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052131377.png" alt="image-20221105213104293" style="zoom:80%;" />

## FinalShell

既然决定使用命令行去学习Linux操作系统，那么就必须丰富一下工具的使用。我们使用VMware可以得到Linux虚拟机，但是在VMware中操作Linux的命令行页面不太方便，主要是：

- 内容的复制、粘贴跨越VMware不方便
- 文件的上传、下载跨越VMware不方便
- 也就是和Linux系统的各类交互，跨越VMware不方便

我们可以通过第三方软件，FinalShell，远程连接到Linux操作系统之上。通过FinalShell去操作Linux系统。

FinalShell的下载地址为：http://www.hostbuf.com/downloads/finalshell_install.exe

首先，先查询到Linux系统的IP地址

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052136408.png" alt="image-20221105213615322" style="zoom:80%;" />

打开Finshell软件，配置到Linux系统的连接（Mac和Windows系统的操作一致，不再分开赘述）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052136034.png" alt="image-20221105213635955" style="zoom:80%;" />

按图示配置连接，并点击确定

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052137996.png" alt="image-20221105213700916" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052137479.png" alt="image-20221105213717399" style="zoom:80%;" />

点击接受并保存

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052137142.png" alt="image-20221105213739077" style="zoom:80%;" />

如图连接成功

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211052137941.png" alt="image-20221105213756814" style="zoom:80%;" />

## 连不上问题

> 进入网络，更改适配器设置

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241727451.png" alt="image-20230424172732327" style="zoom:67%;" />

> IPv4使用自动获取IP地址，再连接试试看

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241728217.png" alt="image-20230424172813110" style="zoom:67%;" />



## Linux目录结构

登录到Linux系统之后，我们需要先来熟悉一下Linux的目录结构。在Linux系统中，也是存在目录的概念的，但是Linux的目录结构和Windows的目录结构是存在比较多的差异的 在Windows目录下，是一个一个的盘符(C盘、D盘、E盘)，目录是归属于某一个盘符的。Linux系统中的目录有以下特点： 

**A. / 是所有目录的顶点**

**B. 目录结构像一颗倒挂的树**

**Linux 和 Windows的目录结构对比:** 

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557155.png" alt="image-20210810174831655" style="zoom: 80%;" /> 

Linux的目录结构，如下： 

![image-20210810174954476](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021557204.png) 

根目录/ 下各个目录的作用及含义说明:  

| 编号 | 目录  | 含义                                       |
| ---- | ----- | ------------------------------------------ |
| 1    | /bin  | 存放二进制可执行文件                       |
| 2    | /boot | 存放系统引导时使用的各种文件               |
| 3    | /dev  | 存放设备文件                               |
| 4    | /etc  | 存放系统配置文件                           |
| 5    | /home | 存放系统用户的文件                         |
| 6    | /lib  | 存放程序运行所需的共享库和内核模块         |
| 7    | /opt  | 额外安装的可选应用程序包所放置的位置       |
| 8    | /root | 超级用户目录                               |
| 9    | /sbin | 存放二进制可执行文件，只有root用户才能访问 |
| 10   | /tmp  | 存放临时文件                               |
| 11   | /usr  | 存放系统应用程序                           |
| 12   | /var  | 存放运行时需要改变数据的文件，例如日志文件 |



# 文本编辑

> VI 是 Unix 操作系统和类 Unix 操作系统中最通用的文本编辑器。 VIM 编辑器是从 VI 发展出来的一个性能更强大的文本编辑器。可以主动的以字体颜 色辨别语法的正确性，方便程序设计。VIM 与 VI 编辑器完全兼容。

```sh
yum install vim
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209261306386.png" alt="image-20220926130641291" style="zoom:80%;" />

## 起步阶段

> 注意：ubuntu自带的vi是tiny版本，无法正常编辑，只需要卸载vim-tiny，安装vim-full即可正常使用。

打开终端输入：

```csharp
 sudo apt-get remove vim-common
```

待卸载完成后，输入：

```csharp
sudo apt-get install vim
```

## 一般模式

> 以 vi 打开一个档案就直接进入一般模式了（这是默认的模式）。在这个模式中， 你可 以使用『上下左右』按键来移动光标，你可以使用『删除字符』或『删除整行』来处理档 案内容， 也可以使用『复制、粘贴』来处理你的文件数据

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209261151509.png" alt="image-20220926115123412" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061504173.png" alt="image-20221106150437065" style="zoom:80%;" />

## 编辑模式

> 在一般模式中可以进行删除、复制、粘贴等的动作，但是却无法编辑文件内容的！要 等到你按下『i, I, o, O, a, A』等任何一个字母之后才会进入编辑模式。 注意了！通常在Linux中，按下这些按键时，在画面的左下方会出现『INSERT或 REPLACE』的字样，此时才可以进行编辑。而如果要回到一般模式时， 则必须要按下 『Esc』这个按键即可退出编辑模式

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061503796.png" alt="image-20221106150345697" style="zoom:80%;" />

## 指令模式

> 在一般模式当中，输入『 : / ?』3个中的任何一个按钮，就可以将光标移动到最底下那 一行。在这个模式当中， 可以提供你『搜寻资料』的动作，而读取、存盘、大量取代字符、 离开 vi 、显示行号等动作是在此模式中达成的！ 

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209261305617.png" alt="image-20220926130540540" style="zoom:80%;" />

```sh
:wq! # 强制保存退出
#normal模式下 g表示全局, x表示查找的内容, y表示替换后的内容
:%s/x/y/g

#normal模式下
0  # 光标移到行首(数字0)
$  # 光标移至行尾
shift + g # 跳到文件最后
gg # 跳到文件头

# 显示行号
:set nu

# 去除行号
:set nonu

# 检索
/xxx(检索内容)  # 从头检索, 按n查找下一个
?xxx(检索内容)  # 从尾部检索
```





# 系统管理

## 关机、重启和用户登录注销

注意：shutdown、reboot、halt等命令均已经在关机前底层调用了sync、不放心自己再执行sync

> Linux 系统中为了提高磁盘的读写效率，对磁盘采取了 “预读迟写”操作方式。当用户 保存文件时，Linux 核心并不一定立即将保存数据写入物理磁盘中，而是将数据保存在缓 冲区中，等缓冲区满时再写入磁盘，这种方式可以极大的提高磁盘写入数据的效率。但是， 也带来了安全隐患，如果数据还未写入磁盘时，系统掉电或者其他严重问题出现，则将导 致数据丢失。使用 sync 指令可以立即将缓冲区的数据写入磁盘。 

```apl
sync：#把内存的数据同步到磁盘上，当我们关机或者重启时，都应该先执行一下sync，防止数据丢失
shutdown -h now #表示立即关机
shutdown -h 1：#表示1分钟后关机
shutdown -r now #立即重启
# 计算机将在 1 分钟后关机，并且会显示在登录用户的当前屏幕中
shutdown -h 1 'This server will shutdown after 1 mins'
halt：# 直接使用，关机，作用同上
reboot：# 重启
logout：#注销用户，在centos的terminal输入无效，在Finalshell里输入有效，输入logout后直接断开连接
```

## 查看系统,CPU信息

```apl
# 查看系统内核信息
uname -a
# 查看系统内核版本
cat /proc/version
# 查看当前用户环境变量
env
cat /proc/cpuinfo
# 查看有几个逻辑cpu, 包括cpu型号
cat /proc/cpuinfo | grep name | cut -f2 -d: | uniq -c
# 查看有几颗cpu,每颗分别是几核
cat /proc/cpuinfo | grep physical | uniq -c
# 查看当前CPU运行在32bit还是64bit模式下, 如果是运行在32bit下也不代表CPU不支持64bit
getconf LONG_BIT
# 结果大于0, 说明支持64bit计算. lm指long mode, 支持lm则是64bit
cat /proc/cpuinfo | grep flags | grep ' lm ' | wc -l
```

## 系统运行级别

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209261204434.png" alt="image-20220926120408335" style="zoom:80%;" />

```sh
vi /etc/inittab
init 3 # 进入文字界面
init 5 # 进入图形界面
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209261205264.png" alt="image-20220926120506175" style="zoom:80%;" />

## systemctl 服务⭐

### 基本语法

Linux系统很多软件（内置或第三方）均支持使用systemctl命令控制：启动、停止、开机自启

能够被systemctl管理的软件，一般也称之为：服务。语法：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211032043600.png" alt="image-20221103204320528" style="zoom:80%;" />

```sh
systemctl start 服务名称       启动服务
systemctl restart 服务名称     重启服务
systemctl stop  服务名称       停止服务
systemctl enable 服务名称      加入到开机启动项
systemctl disable 服务名称     取消加入到开机启动项
systemctl status 服务名称      查看服务状态
```

### 内置服务

系统内置的服务比较多，比如：

- NetworkManager，主网络服务
- network，副网络服务
- firewalld，防火墙服务
- sshd，ssh服务（FinalShell远程登录Linux使用的就是这个服务）

现在可以使用systemctl去尝试一下，控制这些服务的启动、关闭、自启动啦

### 第三方软件

除了内置的服务以外，部分第三方软件安装后也可以以systemctl进行控制。

```sh
yum install -y ntp # 安装ntp软件，可以通过ntpd服务名，配合systemctl进行控制

yum install -y httpd # 安装apache服务器软件，可以通过httpd服务名，配合systemctl进行控制
```

部分软件安装后没有自动集成到systemctl中，我们可以手动添加。这部分内容在后续章节和大家详细讲解。

## firewall防火墙⭐

```sql
# 开启和关闭防火墙
systemctl start firewalld
systemctl stop firewalld
# 查看防火墙状态
systemctl status firewalld
# 设置开机启动
systemctl enable firewalld
# 禁用开机启动
systemctl disable firewalld
# 重启防火墙
firewall-cmd --reload
# 开放端口（修改后需要重启防火墙方可生效）
firewall-cmd --zone=public --add-port=8080/tcp --permanent
# 查看开放的端口
firewall-cmd --list-ports
# 关闭端口
firewall-cmd --zone=public --remove-port=8080/tcp --permanent
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209261202115.png" alt="image-20220926120253008" style="zoom:80%;" />

## 软连接快捷方式

> ln命令创建软连接

在系统中创建软链接，可以将文件、文件夹链接到其它位置。类似Windows系统中的《快捷方式》

```sh
ln -s [原文件或目录] [软链接名] （功能描述：给原文件创建一个软链接）
```

-s选项，创建软连接，参数1：被链接的文件或文件夹，参数2：要链接去的目的地

```sh
ln -s /etc/yum.conf ~/yum.conf
ln -s /etc/yum ~/yum
```

> 软链接也称为符号链接，类似于 windows 里的快捷方式，有自己的数据块，主要存放了链接其他文件的路径

```sh
# 创建软连接
mv houge.txt xiyou/dssz/
ln -s xiyou/dssz/houge.txt ./houzi
# 删除软连接(注意不要写最后的/)
rm -rf houzi
# 进入软连接实际物理路径
ln -s xiyou/dssz/ ./dssz
cd -P dssz/
```

## sshkey

```
# 创建sshkey
ssh-keygen -t rsa -C your_email@example.com

#id_rsa.pub 的内容拷贝到要控制的服务器的 home/username/.ssh/authorized_keys 中,如果没有则新建(.ssh权限为700, authorized_keys权限为600)
```

## 命令重命名

```
# 在各个用户的.bash_profile中添加重命名配置
alias ll='ls -alF'
```

## 同步服务器时间

```
sudo ntpdate -u ntp.api.bz
```

## 后台运行命令

```
# 后台运行,并且有nohup.out输出
nohup xxx &

# 后台运行, 不输出任何日志
nohup xxx > /dev/null &

# 后台运行, 并将错误信息做标准输出到日志中 
nohup xxx >out.log 2>&1 &
```

## 强制活动用户退出

```
# 命令来完成强制活动用户退出.其中TTY表示终端名称
pkill -kill -t [TTY]
```

## 查看命令路径

```
which <命令>
```

## 查看进程所有打开最大fd数

```
ulimit -n
```

## 配置dns

```
vim /etc/resolv.conf
```

## nslookup,查看域名路由表

```
nslookup google.com
```

## last, 最近登录信息列表

```
# 最近登录的5个账号
last -n 5
```

## 设置固定ip

```
ifconfig em1  192.168.5.177 netmask 255.255.255.0
```

## 查看进程内加载的环境变量

```
# 也可以去 cd /proc 目录下, 查看进程内存中加载的东西
ps eww -p  XXXXX(进程号)
```

## 查看进程树找到服务器进程

```
ps auwxf
```

## 查看进程启动路径

```
cd /proc/xxx(进程号)
ls -all
# cwd对应的是启动路径
```

## 添加用户, 配置sudo权限

```
# 新增用户
useradd 用户名
passwd 用户名

#增加sudo权限
vim /etc/sudoers
# 修改文件里面的
# root    ALL=(ALL)       ALL
# 用户名 ALL=(ALL)       ALL
```

## 强制关闭进程名包含xxx的所有进程

```
ps aux|grep xxx | grep -v grep | awk '{print $2}' | xargs kill -9
```



# 使用技巧⭐

## 主要命令

在这一部分中，我们主要介绍几个常用的命令，让大家快速感受以下Linux指令的操作方式。主要包含以下几个指令： 

| 序号 | 命令           | 对应英文             | 作用                    |
| ---- | -------------- | -------------------- | ----------------------- |
| 1    | ls [目录名]    | list                 | 查看当前目录下的内容    |
| 2    | pwd            | print work directory | 查看当前所在目录        |
| 3    | cd [目录名]    | change directory     | 切换目录                |
| 4    | touch [文件名] | touch                | 如果文件不存在,创建文件 |
| 5    | mkdir [目录名] | make directory       | 创建目录                |
| 6    | rm [文件名]    | remove               | 删除指定文件            |

## 常用快捷键

### Tab键自动补全

1). Tab键自动补全

2). 连续两次Tab键，给出操作提示

A. 执行指令的时候，对于操作的文件/目录，按一下Tab会自动补全:

![image-20210810185641027](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021624809.png) 

B. 如果上述以 "1." 开头的文件有多个，可以按两下Tab键，给出操作提示:

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021624809.png" alt="image-20210810190101671" style="zoom:80%;" /> 

### ctrl + c 强制停止

Linux某些程序的运行，如果想要强制停止它，可以使用快捷键ctrl + c

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211032020233.png" alt="image-20221103202014139" style="zoom:80%;" />

命令输入错误，也可以通过快捷键ctrl + c，退出当前输入，重新输入

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211032020974.png" alt="image-20221103202029906" style="zoom:80%;" />

### ctrl + d 退出或登出

可以通过快捷键：ctrl + d，退出账户的登录

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211032020765.png" alt="image-20221103202059679" style="zoom:80%;" />

或者退出某些特定程序的专属页面

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211032021620.png" alt="image-20221103202129512" style="zoom:80%;" />

> ps：不能用于退出vi/vim

### !命令前缀 自动匹配上个命令

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304182023029.png" alt="image-20230418202344547" style="zoom:80%;" />

### 历史命令搜索

> 可以使用上下箭头快速调出曾经使用过的命令

> 可以通过history命令，查看历史输入过的命令

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211032022431.png" alt="image-20221103202219304" style="zoom:80%;" />

### 自动执行上次匹配命令

可以通过：!命令前缀，自动执行上一次匹配前缀的命令

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211032023963.png" alt="image-20221103202304776" style="zoom:80%;" />

### ctrl + r 搜索历史命令

可以通过快捷键：ctrl + r，输入内容去匹配历史命令

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211032023885.png" alt="image-20221103202331815" style="zoom:80%;" />

如果搜索到的内容是你需要的，那么：

- 回车键可以直接执行
- 键盘左右键，可以得到此命令（不执行）

### 光标快速移动

> - ctrl + a，跳到命令开头
> - ctrl + e，跳到命令结尾
> - ctrl + 键盘左键，向左跳一个单词
> - ctrl + 键盘右键，向右跳一个单词

### ctrl + L清屏

C. 使用clear命令或者Ctrl+l快捷键实现清屏:

![image-20210810190458929](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021624813.png)

清屏之后，界面就变得干净了: 

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021624728.png" alt="image-20221102162448552" style="zoom:80%;" />

## Linux命令格式

```
command [-options] [parameter]
	
说明: 
	command: 	 命令名
	[-options]:  选项，可用来对命令进行控制，也可以省略
	[parameter]: 传给命令的参数，可以是零个、一个或者多个
	
注意: 
	[] 	 代表可选
	命令名、选项、参数之间有空格进行分隔
```

**操作示例:** 

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021625728.png" alt="image-20210810192202455" style="zoom:80%;" /> 

**关于命令选项的说明**

我们学习的一系列Linux命令，它们所拥有的选项都是非常多的。

比如，简单的ls命令就有：

-a -A -b -c -C -d -D -f -F -g -G -h -H -i -I -k -l -L -m -n -N -o -p -q -Q -r-R -s -S -t -T -u -U -v -w -x -X -1

等选项，可以发现选项是极其多的。

课程中， 并不会将全部的选项都进行讲解，否则，一个ls命令就可能讲解2小时之久。

课程中，会对常见的选项进行讲解， 足够满足绝大多数的学习、工作场景。

## 查看命令帮助和手册

如果想要对命令的其它选项进行查阅，可以通过如下方式：如：ls --help， 会列出ls命令的帮助文档

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061407163.png" alt="image-20221106140710039" style="zoom:80%;" />

任何命令都支持：--help 选项， 可以通过这个选项，查看命令的帮助。

如果想要查看命令的详细手册，可以通过man（manual， 手册）命令查看比如：

```sh
man ls，就是查看ls命令的详细手册

man cd，就是查看cd命令的详细手册
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061408902.png" alt="image-20221106140825751" style="zoom:80%;" />

大多数手册都是全英文的，如果阅读吃力，可以通过重定向符：man ls > ls-man.txt，输出手册到文件,然后通过翻译软件翻译内容查看哦

## Finalshell乱码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211021618248.png" alt="image-20210810184600425" style="zoom:80%;" /> 

> 在执行Linux命令时，提示信息如果显示为乱码，如上图所示。这是由于编码问题导致，只需要修改Linux的编码

```sh
echo 'LANG="en_US.UTF-8"' >> /etc/profile
source /etc/profile
```

# 用户管理

## 用户分类

Linux 系统是一种多用户系统，它将文件访问者身份分为三种：

### 文件所有者（Owner）

> 当创建一个用户的时候，Linux 会为该用户创建一个主目录，路径为 `/home/<username>`，我们可以使用 `cd ~`，快捷进入主目录。如果你想放一个私密文件，就可以放在自己的主目录里，然后设置只能自己查看。
>

### 群组（Group）

> 每个用户都有一个用户组，方便多人操作的时候，为一群人分配权限。当创建用户的时候，会自动创建一个与它同名的用户组。如果一个用户同时属于多个组，用户需要在用户组之间切换，才能具有其他用户组的权限。
>

### 其他人（Others）

> 既不是文件所有者又不是文件所属群组成员的用户，就是其他人。
>

### 超级用户（Root）

> Root 用户是一类特殊的用户，该用户可以访问所有文件。
>

## 用户，组，家目录

1. Linux系统是一个多用户多任务的操作系统，任何一个要使用系统资源的用户，都必须首先向系统管理员申请一个账号，然后以这个账号的身份进入系统。
2. Linux的用户需要至少要属于一个组。

### 添加用户

```apl
useradd 用户名
useradd [选项] 用户名
```

- 当创建用户成功后，会默认在/home目录下自动的创建和用户同名的家目录。
- 也可以通过useradd -d 指定目录 新的用户名  指定家文件夹。

### 指定/修改密码

passwd 命令用来更改使用者的密码，需要根据提示输入一次旧密码和两次新密码。

```apl
passwd 用户名
```

### 删除用户

保留家目录：userdel 用户名，**一般保留家目录，因为干过的活要留着**。

删除用户以及家目录：userdel -r 用户名

### 查询用户信息

```apl
查询用户信息：id 用户名
查看当前用户/登录用户：who am i
```

### 切换用户

```apl
su - 切换用户名
su - ren
su - root
```

**从权限高切换到权限低的用户不需要输密码**。

返回切换前的用户：logout

### 用户授权⭐

但是由于创建的用户权限较低，有的时候我们需要为用户提权，此时我们可以这样做：

```apl
# 会打开 sudoers 配置文件
sudo visudo
```

注意同样是编辑 `sudoers` 配置文件，使用这个命令会比使用 `sudo vim /etc/ sudoers` 更安全， 除了对语法有校验，并且还会在多用户编辑的时候锁住文件。

打开 `sudoers` 配置文件后，我们添加这样一行配置：

```apl
# Allow git to run any commands anywhere
renshuo ALL=(ALL:ALL) ALL 
```

简单解释下这句话 `git ALL=(ALL:ALL) ALL`：

- git 表示规则应用的用户名
- 第一个 `ALL` 表示规则应用于所有 hosts
- 第二个 `ALL` 表示规则应用于所有 users
- 第三个 `ALL` 表示规则应用于所有 groups
- 第四个 `ALL` 表示规则应用于所有 commands

我们保存退出后，`git` 用户就会获得 root 权限。

## 用户组

用户组：类似于角色，系统可以对有共性的多个用户进行统一的管理。

### 增删改用户组

如果创建用户时没有指定组，那么它会自动生成和用户名相同的组，用id 用户名即可发现

- 增加组：groupadd 组名
- 删除组：groupdel 组名
- 增加用户时直接加上组：useradd -g 用户组 用户名
- 修改用户所在组：usermod -g 用户组 用户名

### 用户和组相关文件

/etc/passwd 文件

- 用户（user）的配置文件，记录用户的各种信息。
- 每行的含义：用户名：口令：用户标识号：注释性描述：主目录：登录shell

/etc/shadow 文件

- 口令配置文件
- 每行的含义：登录名：加密口令：最后一次修改时间：最小时间间隔：最大时间间隔：警告时间：不活动时间：失效时间：标志

/etc/group 文件

- 组（group）的配置文件，记录Linux包含的组的信息。
- 每行含义：组名：口令：组标识号：组内用户列表

# 时间和日期

```sh
date [-d] [+格式化字符串]
```

- -d 按照给定的字符串显示日期，一般用于日期计算
- 格式化字符串：通过特定的字符串标记，来控制显示的日期格式

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211032052544.png" alt="image-20221103205212463" style="zoom:80%;" />

## 获取时间

由于中间带有空格，所以使用双引号包围格式化字符串，作为整体

```apl
date # 显示当前日期和时间
date "+%Y" # 显示当前年份
date "+%m" # 显示当前月份
date "+%d" # 显示当前天
date "+%H:%M:%S" # 显示时分秒
date "+%Y-%m-%d %H:%M:%S" # 显示年-月-日 时：分：秒
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209251827275.png" alt="image-20220925182710146" style="zoom:80%;" />

## 日期计算

> -d选项，可以按照给定的字符串显示日期，一般用于日期计算，-d选项可以和 格式化字符串配合一起使用哦

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211032054541.png" alt="image-20221103205432424" style="zoom: 67%;" />

```sh
date -d "+1 day"
date -d "+1 month" "+%Y--%m--%d"
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211032059370.png" alt="image-20221103205921269" style="zoom:80%;" />

其中支持的时间标记为

**year年**、**month月**、**day天**、**hour小时**、**minute分钟**、**second秒**

## 修改Linux时区

细心的同学可能会发现，通过date查看的日期时间是不准确的，这是因为：系统默认时区非中国的东八区。

将系统自带的localtime文件删除，并将/usr/share/zoneinfo/Asia/Shanghai文件链接为localtime文件即可

使用root权限，执行如下命令，修改时区为东八区时区

```sh
rm -rf /etc/localtime
sudo ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```



## 设置和自动校准系统时间

> 设置日期：date -s 字符串时间

```sh
# 设置系统时间
date -s "2017-06-19 20:52:18"
```

我们可以通过ntp程序自动校准系统时间

安装：ntp：yum -y install ntp

启动并设置开机自启：

```sh
systemctl start ntpd

systemctl enable ntpd
```

当ntpd启动后会定期的帮助我们联网校准系统的时间

也可以手动校准（需root权限）：ntpdate -u ntp.aliyun.com

通过阿里云提供的服务网址配合ntpdate（安装ntp后会附带这个命令）命令自动校准

```sh
# 同步恢复系统时间
# 没有ntpdate命令时，可先输入以下代码进行安装
yum install ntpdate

# 输入同步时间代码
ntpdate -u cn.pool.ntp.org
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209252135635.png" alt="image-20220925213523505" style="zoom:80%;" />



## cal 查看日历

```apl
# 显示当前月份
cal
# 显示当前年的月份
cal 2017
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209252128807.png" alt="image-20220925212810619" style="zoom:80%;" />



# 文件管理



## ls 列出目录

> **显示指定工作目录下的内容及属性信息**：ls命令为英文单词 list 的缩写，正如英文单词 list 的意思，其功能是列出指定目录下的内容及其相关属性信息。默认状态下，ls命令会列出当前目录的内容。而带上参数后，我们可以用ls做更多的事情。作为最基础同时又是使用频率很高的命令，我们很有必要搞清楚ls命令的用法

| 参数 | 描述                                             |
| :--- | :----------------------------------------------- |
| -a   | 显示所有文件及目录 (包括以“.”开头的隐藏文件)     |
| -d   | 仅列出目录本身，而不是列出目录内的文件数据(常用) |
| -l   | 使用长格式列出文件及目录信息                     |
| -r   | 将文件以相反次序显示(默认依英文字母次序)         |
| -t   | 根据最后的修改时间排序                           |
| -A   | 同 -a ，但不列出 “.” (当前目录) 及 “..” (父目录) |
| -S   | 根据文件大小排序                                 |
| -R   | 递归列出所有子目录                               |
| -i   | 在输出的第一列显示文件i的节点号                  |
| -k   | 显示文件大小，以k为单位                          |
| -s   | 显示每个文件所用的空间                           |

```sh
# 基本语法
ls [选项] [文件]
# 当不使用选项和参数，直接使用ls命令本体，表示：以平铺形式，列出当前工作目录下的内容
ls
# -a选项，表示：all的意思，即列出全部文件（包含隐藏的文件/文件夹）
ls -a 
# -l选项，表示：以列表（竖向排列）的形式展示内容，并展示更多信息
ls -l 
# -h 表示以易于阅读的形式，列出文件大小，如K、M、G -h选项必须要搭配 -l 一起使用
ls -alh 
# 列出根目录(/)下的所有目录：
ls /
# 列出当前工作目录下所有名称是 “s” 开头的文件（不包含文件夹哦~） :
ls -ltr s*
# 列出 /root 目录下的所有目录及文件的详细信息 :
ls -lR /root
# 列出当前工作目录下所有文件及目录并以文件的大小进行排序 :
ls -AS
```

## cp 复制|粘贴|重命名

> cp命令可以理解为英文单词copy的缩写，其功能为复制文件或目录。cp命令可以将多个文件复制到一个具体的文件名或一个已经存在的目录下，也可以同时复制多个文件到一个指定的目录中。

| 参数 | 描述                                                         |
| :--- | :----------------------------------------------------------- |
| -f   | 若目标文件已存在，则会直接覆盖原文件                         |
| -i   | 若目标文件已存在，则会询问是否覆盖                           |
| -p   | 保留源文件或目录的所有属性                                   |
| -r   | 递归复制文件和目录                                           |
| -d   | 当复制符号连接时，把目标文件或目录也建立为符号连接，并指向与源文件或目录连接的原始文件或目录 |
| -l   | 对源文件建立硬连接，而非复制文件                             |
| -s   | 对源文件建立符号连接，而非复制文件                           |
| -b   | 覆盖已存在的文件目标前将目标文件备份                         |
| -v   | 详细显示cp命令执行的操作过程                                 |
| -a   | 等价于“dpr”选项                                              |

```sh
# 复制目录
cp -R dir1 dir2/
# 将文件test1改名为test2
cp -f test1 test2
# 复制多个文件
cp -r file1 file2 file3 dir
# 交互式地将目录 /home/lucifer 中的所有.c文件复制到目录 dir 中
cp -r /home/lucifer/*.c dir
# 递归复制整个文件夹
cp -r nginx-1.21.6 nginx-1.21.7
cp -a nginx-1.21.6 nginx-1.21.7
# 加-v显示复制过程
cp –v zip.txt zip3.txt
# 加-r递归复制
cp -r -v nginx-1.21.6 nginx-1.21.8
# 复制并强制覆盖同名文件
cp -f xxx.log
# 复制文件夹
cp -r xxx(源文件夹) yyy(目标文件夹)
# 远程复制
scp -P ssh端口 username@10.10.10.101:/home/username/xxx /home/xxx
```

**操作示例:** 

![image-20210811180508369](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211011047672.png) 

![image-20210811180638556](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211011047673.png) 

![image-20210811180914417](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211011047672.png) 



## mkdir 创建目录

> mkdir命令是“make directories”的缩写，用来创建目录。**📢 注意：** 默认状态下，如果要创建的目录已经存在，则提示已存在，而不会继续创建目录。所以在创建目录时，应保证新建的目录与它所在目录下的文件没有重名。mkdir命令还可以同时创建多个目录，是不是很强大呢？

**常用参数：**

| 参数 | 描述                         |
| :--- | :--------------------------- |
| -p   | 递归创建多级目录             |
| -m   | 建立目录的同时设置目录的权限 |
| -z   | 设置安全上下文               |
| -v   | 显示目录的创建过程           |

```sh
# 在当前目录下，建立一个名为itcast的子目录
mkdir itcast 
# 同时创建子目录dir1，dir2，dir3
mkdir dir1 dir2 dir3
# 在目录/home/lucifer下建立子目录dir，并且设置文件属主有读、写和执行权限，其他人无权访问
mkdir -m 700 /home/lucifer/dir
# 在工作目录下的itcast目录中建立一个名为test的子目录，若itcast目录不存在，则建立一个
mkdir -p itcast/test   
# 批量创建文件夹, 会在test,main下都创建java, resources文件夹
mkdir -p src/{test,main}/{java,resources}
```

**操作演示:**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211011107500.png" alt="image-20210810234541073" style="zoom:80%;" />

## mv  移动|改名

> mv命令是“move”单词的缩写，其功能大致和英文含义一样，可以移动文件或对其改名。这是一个使用频率超高的文件管理命令，我们需要特别留意它与复制的区别：mv与cp的结果不同。mv命令好像文件“搬家”，文件名称发生改变，但个数并未增加。而cp命令是对文件进行复制操作，文件个数是有增加的。

**常用参数：**

| 参数 | 描述                                                         |
| :--- | :----------------------------------------------------------- |
| -i   | 若存在同名文件，则向用户询问是否覆盖                         |
| -f   | 覆盖已有文件时，不进行任何提示                               |
| -b   | 当文件存在时，覆盖前为其创建一个备份                         |
| -u   | 当源文件比目标文件新，或者目标文件不存在时，才执行移动此操作 |

**参考实例：**

```sh
mv hello.txt hi.txt                 将hello.txt改名为hi.txt
mv hi.txt itheima/                  将文件hi.txt移动到itheima目录中
mv hi.txt itheima/hello.txt   	    将hi.txt移动到itheima目录中，并改名为hello.txt
mv itcast/ itheima/                 如果itheima目录不存在，将itcast目录改名为itheima
mv itcast/ itheima/                 如果itheima目录存在，将itcast目录移动到itheima目录中
mv /dir1/* .                        将目录dir1下的文件移动到当前目录下
```

**操作示例:** 

mv 命令既能够改名，又可以移动，具体是改名还是移动,系统会根据我们输入的参数进行判定(如果第二个参数dest是一个已存在的目录,将执行移动操作,其他情况都是改名)

![image-20210811184240003](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211011047678.png)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061434682.png" alt="image-20221106143407517" style="zoom:80%;" />

## pwd 显示当前路径

> pwd命令是“print working directory”中每个单词的首字母缩写，其功能正如所示单词一样，为打印工作目录，即显示当前工作目录的绝对路径。在实际工作中，我们经常会在不同目录之间进行切换，为了防止“迷路”，我们可以使用pwd命令快速查看当前我们所在的目录路径。

```sh
pwd
pwd -P # -P ：显示出确实的路径，而非使用连结 (link) 路径
```

## rm 删除文件

> rm是常用的命令，该命令的功能为删除一个目录中的一个或多个文件或目录，它也可以将某个目录及其下的所有文件及子目录均删除。对于链接文件，只是删除了链接，原有文件均保持不变。

> **📢 注意：** rm也是一个危险的命令，使用的时候要特别当心，尤其对于新手，否则整个系统就会毁在这个命令（比如在/（根目录）下执行rm * -rf）。所以，我们在执行rm之前最好先确认一下在哪个目录，到底要删除什么东西，操作时保持高度清醒的头脑。

**常用参数：**

| 参数 | 描述                               |
| :--- | :--------------------------------- |
| -f   | 忽略不存在的文件，不会出现警告信息 |
| -i   | 删除前会询问用户是否操作           |
| -r/R | 递归删除                           |
| -v   | 显示指令的详细执行过程             |

**参考实例：**

```sh
# 删除前逐一询问确认
rm -i test.txt.bz2
# 直接删除，不会有任何提示
rm -f test.txt.bz2  
# 递归删除目录及目录下所有文件
rm -rf /data/log
# 删除当前目录下所有文件,*表示通配符，例如test*，*test，*test*
rm -rf *
# 清空系统中所有的文件（谨慎）
rm -rf /*
```

## touch创建空文件

touch命令无选项，参数必填，表示要创建的文件路径，相对、绝对、特殊路径符均可以使用。touch 命令用于修改文件或者目录的时间属性，包括存取时间和更改时间。若文件不存在，系统会建立一个新的文件。

```sh
touch 文件名称
touch xiyou/dssz/sunwukong.txt
```

如果不添加任何参数，就会将文件的修改时间改为当前的系统时间。

## cd切换目录

特殊路径符：

-  .表示当前目录，比如 cd ./Desktop 表示切换到当前目录下的Desktop目录内，和cd Desktop效果一致

-  .. 表示上一级目录，比如：cd ..  即可切换到上一级目录，cd ../.. 切换到上二级的目录

-  ~ 表示HOME目录，比如：cd ~  即可切换到HOME目录或cd ~/Desktop，切换到HOME内的Desktop目录

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209260932245.png" alt="image-20220926093208174" style="zoom:80%;" />

```c
cd app 切换到app目录

cd .. 切换到上一层目录

cd /   切换到系统根目录

cd ~    切换到用户主目录

cd -   切换到上一次所在目录
```

> 注意：使用cd ..是返回上一级目录，比如usr/bin，bin的上一级就是usr。而 cd -，是返回上一次所在目录，比如第一次在usr目录，然后直接cd /到根目录，使用这个命令能快速回到usr目录。使用tab键来补全文件路径

> - cd命令无需选项，只有参数，表示要切换到哪个目录下
> - cd命令直接执行，不写参数，表示回到用户的HOME目录

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061423772.png" alt="image-20221106142344643" style="zoom:80%;" />



## rmdir 删除空目录

```sh
作用: 删除空目录
语法: rmdir [-p] dirName

说明:
	-p: 当子目录被删除后使父目录为空目录的话，则一并删除
举例:
    rmdir itcast   删除名为itcast的空目录
    # 删除itcast目录中名为test的子目录，若test目录删除后itcast目录变为空目录，则也被删除
    rmdir -p itcast/test  
    rmdir itcast*   删除名称以itcast开始的空目录
```

**操作演示:** 

A. 删除空目录

![image-20210810235044921](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211011059546.png) 

B. 删除非空目录

![image-20210810235221722](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211011059549.png) 

C. 使用*通配符删除目录

![image-20210810235305140](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211011059551.png) 

> *: 是一个通配符，代表任意字符； 
>
> rmdir  itcast* : 删除以itcast开头的目录
>
> rmdir  *itcast : 删除以itcast结尾的目录

## file 查看文件类型

> `file`命令将返回文件的类型信息，例如文本文件、图像文件、二进制文件等。它可能还提供更详细的文件格式或编码信息，以及其他有关文件的附加描述。根据操作系统和命令行环境的不同，`file`命令的输出可能会有所不同

```sh
file 文件名
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305041119378.png" alt="image-20230504111906280" style="zoom:80%;" />

## diff 比较两个文件

```
diff -u 1.txt 2.txt
```



# 文本操作

## cat连接文件并打印输出

> 查看文件内容，从第一行开始显示,一般查看比较小的文件，一屏幕能显示全的。

```sh
cat [选项] 要查看的文件
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209261025219.png" alt="image-20220926102518151" style="zoom:80%;" />

```sh
# 查看文件内容并显示行号
cat -n houge.txt
```

清空 index.html 内容：

```sh
cat /dev/null > index.html
```

把 index.html 的内容 **覆盖写入** second.html：

```sh
cat index.html > second.html
```

把 index.html 的内容**追加写入** second.html：

```sh
cat index.html >> second.html
```

使用 cat filename1 filename2 >> filename3 可以连接两个文件（1 和 2）并将它们的输出内容存储在一个新文件3中。

把 index.html 和 second.html 追加写入 third.html：

```sh
cat index.html second.html >> third.html
```



## more 文件内容分屏查看器

```
作用: 以分页的形式显示文件内容
语法: more fileName

操作说明:
    回车键 	向下滚动一行
    空格键 	向下滚动一屏
    b 		返回上一屏
    q或者Ctrl+C	退出more
	
举例：
	more /etc/profile		以分页方式显示/etc目录下的profile文件内容
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209261028088.png" alt="image-20220926102852015" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209261029457.png" alt="image-20220926102904393" style="zoom:80%;" />

**操作示例：**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211011338291.png" alt="image-20210810232212430" style="zoom:80%;" /> 

当我们在查看一些比较大的文件时，我们可能需要经常查询文件尾部的数据信息，那这个时候如果文件很大，我们要一直向下翻页，直到最后一页，去看最新添加的数据，这种方式就比较繁琐了，此时，我们可以借助于tail指令。



## less 分屏显示文件内容 

less 指令用来分屏查看文件内容，它的功能与 more 指令类似，但是比 more 指令更加 强大，支持各种显示终端。less 指令在显示文件内容时，并不是一次将整个文件加载之后 才显示，而是根据显示需要加载内容，对于显示大型文件具有较高的效率。 

```sh
less 要查看的文件
less smartd.conf
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209261030360.png" alt="image-20220926103012285" style="zoom:80%;" />



## echo内容打印输出

```sh
echo [选项] [输出内容]
```

-e： 支持反斜线控制的字符转换

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209260954367.png" alt="image-20220926095450299" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209260955884.png" alt="image-20220926095504818" style="zoom:80%;" />

```sh
echo "hello\tworld"
echo -e "hello\tworld"
echo `pwd` # 被`包围的内容，会被作为命令执行，而非普通字符
```

## 内容写入重定向符⭐

我们再来学习两个特殊符号，重定向符：>和>>

•>，将左侧命令的结果，**覆盖写入**到符号右侧指定的文件中

•>>，将左侧命令的结果，**追加写入**到符号右侧指定的文件中

创建或覆盖文件内容为 "test content"：

```sh
echo "test content" > index.html
```

如果是想追加内容，就用 `>>` ：

```sh
echo "test content" >> index.html
cat index.html
echo "test content" >> index.html
cat index.html
```

## head文件头部查看

> head 用于显示文件的开头部分内容，默认情况下 head 指令显示文件的前 10 行内容

```sh
head 文件 # 功能描述：查看文件头10行内容
head -n 5 文件 # 功能描述：查看文件头5行内容，5可以是任意行数
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209260953770.png" alt="image-20220926095328704" style="zoom:80%;" />



## tail文件尾部查看⭐⭐

> tail 用于输出文件中尾部的内容，默认情况下 tail 指令显示文件的后 10 行内容

```sh
tail 文件 # 功能描述：查看文件尾部10行内容
tail -n 5 文件 # 功能描述：查看文件尾部5行内容，5可以是任意行数
tail -f 文件 # 功能描述：实时追踪该文档的所有更新
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209260949221.png" alt="image-20220926094946156" style="zoom:80%;" />

```sh
# 查看文件尾 1 行内容
tail -n 1 houge.txt
# 实时追踪该档的所有更新
tail -f houge.txt
# 实时追踪该档的所有更新,并且监控范围变成20行
tail -f -n 20 houge.txt
# 如果做性能测试, 可以每执行一次, 往日志里面输出 “.” , 
# 这样日志中的字节数就是实际的性能测试运行的次数, 还可以看见实时速率.
tail -f xxx.log | pv -bt
```

```sh
作用: 查看文件末尾的内容
语法: tail [-f] fileName

说明:-f : 动态读取文件末尾内容并显示，通常用于日志文件的内容输出
	
举例: 
tail /etc/profile		显示/etc目录下的profile文件末尾10行的内容
tail -20 /etc/profile	显示/etc目录下的profile文件末尾20行的内容
tail -f /itcast/my.log	动态读取/itcast目录下的my.log文件末尾内容并显示
```

**操作示例：** 

A. 默认查询文件尾部10行记录

![image-20210810232758510](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211011107551.png) 

B. 可以通过指定参数设置查询尾部指定行数的数据

![image-20210810232947018](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211011107553.png) 

C. 动态读取文件尾部的数据

![4](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211011107555.png) 

在窗口1中执行指令 `tail -f 1.txt` 动态查看文件尾部的数据。然后在顶部的标签中右键选择 "复制标签"，打开新的窗口2 , 此时再新打开的窗口2中执行指令 `echo 1 >> 1.txt` , 往1.txt文件尾部追加内容，然后我们就可以在窗口1中看到最新的文件尾部的数据。如果我们不想查看文件尾部的数据了，可以直接使用快捷键 Ctrl+C ， 结束当前进程。

## 重定向和追加⭐

> 注意：ls-l可以换成任意命令，如ps，ifconfig等显示命令

```sh
ls -l > 文件 # 功能描述：列表的内容写入文件 a.txt 中（覆盖写）
ls -al >> 文件 # 功能描述：列表的内容追加到文件 aa.txt 的末尾
cat 文件 1 > 文件 2 # 功能描述：将文件 1 的内容覆盖到文件 2
echo “内容” >> 文件
```

> 注意：此时houge.txt不需要自己创建，直接执行就行

```sh
# 将 ls 查看信息写入到文件中
ls -l>houge.txt
# 将 ls 查看信息追加到文件中
ls -l>>houge.tx
# 采用 echo 将 hello 单词追加到文件中，是换行追加
echo hello>>houge.txt
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209260946578.png" alt="image-20220926094632510" style="zoom:80%;" />

# 搜索查找⭐

## which

我们在前面学习的Linux命令，其实它们的本体就是一个个的二进制可执行程序。和Windows系统中的.exe文件，是一个意思。我们可以通过which命令，查看所使用的一系列命令的程序文件存放在哪里

```sh
which 要查找的命令
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061440590.png" alt="image-20221106144013484" style="zoom:80%;" />

## find⭐

> find命令可以根据给定的路径和表达式查找的文件或目录。find参数选项很多，并且支持正则，功能强大。和管道结合使用可以实现复杂的功能，是系统管理者和普通用户必须掌握的命令。find如不加任何参数，表示查找当前路径下的所有文件和目录，如果服务器负载比较高尽量不要在高峰期使用find命令，**find命令模糊搜索还是比较消耗系统资源的**。

```sh
find [参数] [路径] [查找和搜索范围]
```

**常用参数：**

| 参数   | 描述       |
| :----- | :--------- |
| -name  | 按名称查找 |
| -size  | 按大小查找 |
| -user  | 按属性查找 |
| -type  | 按类型查找 |
| -iname | 忽略大小写 |

```sh
# 使用-name参数查看/etc目录下面所有的.conf结尾的配置文件
find /etc -name "*.conf"
# 使用-size参数查看/etc目录下面大于1M的文件
find /etc -size +1M
# 查找当前用户主目录下的所有文件：
find $HOME -print
# 列出当前目录及子目录下所有文件和文件夹
find .
# 在/home目录下查找以.txt结尾的文件名：
find /home -name "*.txt"
# 在/var/log目录下忽略大小写查找以.log结尾的文件名
find /var/log -iname "*.log"
# 搜索超过七天内被访问过的所有文件
find . -type f -atime +7
# 搜索访问时间超过10分钟的所有文件
find . -type f -amin +10
# 找出/home下不是以.txt结尾的文件
find /home ! -name "*.txt"
```

### 根据文件名查找⭐

被查找文件名，支持使用通配符 * 来做模糊查询。基于通配符的含义，可以结合find命令做文件的模糊查询。

- test*，表示匹配任何以test开头的内容

- *test，表示匹配任何以test结尾的内容

- \*test*，表示匹配任何包含test的内容

```shell
# 按文件名：根据名称查找/目录下的filename.txt文件，可以是任意目录，不一定非在根目录
find / -name "*.txt"
# 在根目录查找my.cnf文件位置
find / -name "my.cnf"
# 查找文件名称是以ins开头的文件
find / -name "ins*" 
# 在当前目录及其子目录下查找.java结尾文件
find  .  –name "*.java"		
# 在/itcast目录及其子目录下查找.java结尾的文件
find  /itcast  -name "*.java"	
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211011033852.png" alt="image-20221101103311727" style="zoom:80%;" />

###  根据拥有者查找

> 按拥有者：查找/目录下，用户名称为-user的文件 

```sh
find / -user "renshuo"
find / -user "ren*"
```

### 按文件大小查找

```sh
find 起始路径 -size +|-n[kMG]
```

> - +、- 表示大于和小于
> - n表示大小数字
> - kMG表示大小单位，k(小写字母)表示kb，M表示MB，G表示GB

```sh
find /home -size +204800 # 在/home目录下查找大于200m的文件 
find / -size -10k # 查找小于10KB的文件
find / -size +100M # 查找大于100MB的文件
find / -size +1G # 查找大于1GB的文件
```

```sh
# 在目录下找后缀是.mysql的文件
find /home/eagleye -name '*.mysql' -print

# 会从 /usr 目录开始往下找，找最近3天之内存取过的文件。
find /usr -atime 3 –print

# 会从 /usr 目录开始往下找，找最近5天之内修改过的文件。
find /usr -ctime 5 –print

# 会从 /doc 目录开始往下找，找jacky 的、文件名开头是 j的文件。  
find /doc -user jacky -name 'j*' –print

# 会从 /doc 目录开始往下找，找寻文件名是 ja 开头或者 ma开头的文件。
find /doc \( -name 'ja*' -o- -name 'ma*' \) –print

# 会从 /doc 目录开始往下找，找到凡是文件名结尾为 bak的文件，把它删除掉。
# -exec 选项是执行的意思，rm 是删除命令，{ } 表示文件名，“\;”是规定的命令结尾。 
find /doc -name '*bak' -exec rm {} \;
```



## locate

> 可以快速定位文件路径。locate指令利用事先建立的系统中所有文件名称及路径的locate数据库实现快速定位给定的文件。**locate指令无需遍历整个文件系统，查询速度较快**。**为了保证查询结果的准确度，管理员必须定期更新locate时刻**。由于 locate 指令基于数据库进行查询，所以第一次运行前，必须使用 updatedb 指令创 建 locate 数据库。locate 的速度比 find 快，它并不是真的查找，而是查数据库，一般文件数据库在 /var/lib/slocate/slocate.db 中，**所以 locate 的查找并不是实时的，而是以数据库的更新**为准
>

```sh
locate [-d ][--help][--version][范本样式...]
```

**参数说明：**

- -b, --basename -- 仅匹配路径名的基本名称
- -c, --count -- 只输出找到的数量
- -e, --existing -- 仅打印当前现有文件的条目
- -q -- 安静模式，不会显示任何错误讯息。
- -l, --limit, -n LIMIT -- 将输出（或计数）限制为LIMIT个条目
- -n -- 至多显示 n个输出。
- -q, --quiet -- 安静模式，不会显示任何错误讯息
- -h, --help -- 显示帮助
- -i, --ignore-case -- 忽略大小写

```shell
# 必须先更新数据库
updatedb
# 查找a.txt，只显示前两个，一般准确的都在前两个，或者说是第一个
locate -n 2 a.txt
# 直接查找a.txt
locate a.txt
```

## grep 强大的文本搜索

> grep是“global search regular expression and print out the line”的简称，意思是全面搜索正则表达式，并将其打印出来。这个命令可以结合正则表达式使用，它也是linux使用最为广泛的命令。grep命令的选项用于对搜索过程的补充，而其命令的模式十分灵活，可以是变量、字符串、正则表达式。需要注意的是：一当模式中包含了空格，务必要用双引号将其引起来。

> linux系统支持三种形式的grep命令，大儿子就是grep，标准，模仿的代表。二儿子兴趣爱好多-egrep，简称扩展grep命令，其实和grep -E等价，支持基本和扩展的正则表达式。小儿子跑的最快-fgrep，简称快速grep命令，其实和grep -F等价，不支持正则表达式，按照字符串表面意思进行匹配。

**常用参数：**

| 参数 | 描述                                                       |
| :--- | :--------------------------------------------------------- |
| -i   | 搜索时，忽略大小写                                         |
| -c   | 只输出匹配行的数量                                         |
| -l   | 只列出符合匹配的文件名，不列出具体的匹配行                 |
| -n   | 列出所有的匹配行，显示行号                                 |
| -h   | 查询多文件时不显示文件名                                   |
| -s   | 不显示不存在、没有匹配文本的错误信息                       |
| -v   | 显示不包含匹配文本的所有行                                 |
| -w   | 匹配整词                                                   |
| -x   | 匹配整行                                                   |
| -r   | 递归搜索                                                   |
| -q   | 禁止输出任何结果，已退出状态表示搜索是否成功               |
| -b   | 打印匹配行距文件头部的偏移量，以字节为单位                 |
| -o   | 与-b结合使用，打印匹配的词据文件头部的偏移量，以字节为单位 |

**参考实例：**

```sh
# 匹配关键字
grep keyword filename
# 反向匹配关键字
grep -v keyword filename
# 查找匹配的内容的行数
grep -c keyworkd filename
# 忽略大小写
grep -i keyword filename
# 遍历子目录内容
grep -ri keyword filename
# 过滤条件内容并输出行号
grep -n keyword filename
# 正则匹配 J 开头的内容 
grep '^J' filename
# 根据 word 匹配内容
grep -w 'doc' filename
# 指定正则表达式
grep -E '(a|b)' filename 
```

```sh
# 在文件中查找内容
cat hello.txt | grep yes
cat test.py | grep print
cat test.py | grep -n  print
cat test.py | grep -n -i print
grep lang anaconda-ks.cfg –color # 高亮显示                  
```

```sh
grep Hello HelloWorld.java	# 查找HelloWorld.java文件中出现的Hello字符串的位置
grep hello *.java		   # 查找当前目录中所有.java结尾的文件中包含hello字符串的位置
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211011036455.png" alt="image-20221101103638341" style="zoom:80%;" />

```sh
# 支持多文件查询并支持使用通配符：
grep zwx file_* /etc/hosts
# 输出匹配字符串行的数量：
grep -c zwx file_*
# 列出所有的匹配行，并显示行号：
grep -n zwx file_*
# 显示不包含模式的所有行：
grep -vc zwx file_*
# 不再显示文件名：
grep -h zwx file_*
# 只列出符合匹配的文件名，不列出具体匹配的行：
grep -l zwx file_*
# 不显示不存在或无匹配的文本信息：
grep  -s zwx file1 file_1
grep zwx file1 file_1
# 递归搜索，不仅搜索当前目录，还搜索子目录：
grep -r zwx file_2 *
# 匹配整词，以字面意思去解释他，相当于精确匹配：
grep zw* file_1
grep -w zw* file_1
# 匹配整行，文件中的整行与模式匹配时，才打印出来：
grep -x zwx file_*
# 不输出任何结果，已退出状态表示结果：
grep -q zwx file_1
echo $?
grep -q zwx file_5
echo $?
grep -q zwx file5
echo $?
# 查找一个文件中的空行和非空行：
grep -c ^$ file_1
grep -c ^[^$] file_1
# 匹配任意或重复字符用“.”或“*”符号来实现：
grep ^z.x file_1
grep ^z* file_6
```

```sh
# 反向匹配, 查找不包含xxx的内容
grep -v xxx

# 排除所有空行
grep -v '^/pre>

# 返回结果 2,则说明第二行是空行
grep -n "^$" 111.txt    

# 查询以abc开头的行
grep -n “^abc” 111.txt 

# 同时列出该词语出现在文章的第几行
grep 'xxx' -n xxx.log

# 计算一下该字串出现的次数
grep 'xxx' -c xxx.log

# 比对的时候，不计较大小写的不同
grep 'xxx' -i xxx.log
```



## wc 数量统计

可以通过wc命令统计文件的行数、单词数量等

```sh
wc [-c -m -l -w] 文件路径
```

- 选项，-c，统计bytes数量
- 选项，-m，统计字符数量
- 选项，-l，统计行数
- 选项，-w，统计单词数量

参数，文件路径，被统计的文件，可作为内容输入端口

```sh
# 查看文件里有多少行
wc -l filename

# 看文件里有多少个word
wc -w filename

# 文件里最长的那一行是多少个字
wc -L filename

# 统计字节数
wc -c
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061454947.png" alt="image-20221106145415827" style="zoom:80%;" />

## 管道符

学习了grep命令后，我们在来学习一个新的特殊符号，管道符：|

管道符的含义是：将管道符左边命令的结果，作为右边命令的输入

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061455843.png" alt="image-20221106145509744" style="zoom:80%;" />

> cat itheima.txt的输出结果（文件内容），作为右边grep命令的输入（被过滤文件）

管道符的应用非常多

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061456896.png" alt="image-20221106145613668" style="zoom:80%;" />



# 压缩和解压

## 压缩格式

市面上有非常多的压缩格式

- zip格式：Linux、Windows、MacOS，常用
- 7zip：Windows系统常用
- rar：Windows系统常用
- tar：Linux、MacOS常用
- gzip：Linux、MacOS常用

在Windows系统中常用的软件如：winrar、bandizip等软件，都支持各类常见的压缩格式，这里不多做讨论。

我们现在要学习，如何在Linux系统中操作：tar、gzip、zip这三种压缩格式完成文件的压缩、解压操作。

## gzip/gunzip

gzip/gunzip：压缩文件/解压

- gzip (文件)：压缩为.gz文件，原来文件不保留。
- gunzip (文件)：解压缩，同样也不保留源文件。

> （1）只能压缩文件不能压缩目录 
>
> （2）不保留原来的文件 
>
> （3）同时多个文件会产生多个压缩包

```apl
# gzip压缩
gzip houge.txt
# gunzip解压缩文件
gunzip houge.txt.gz
```

zip/unzip：压缩文件/解压

- zip [选项] (压缩后文件xxx.zip) (将要压缩的文件)
- unzip [选项] (要解压的文件xxx.zip)
- zip -r：递归压缩，即压缩目录
- unzip -d (目录)：指定解压后的文件的存放目录

## zip/unzip 压缩

可以使用zip命令，压缩文件为zip压缩包

语法：-r，被压缩的包含文件夹的时候，需要使用-r选项，和rm、cp等命令的-r效果一致

```apl
zip [选项] XXX.zip 将要压缩的内容 #（功能描述：压缩文件和目录的命令）
unzip [选项] XXX.zip #（功能描述：解压缩文件）
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209252319906.png" alt="image-20220925231913796" style="zoom:80%;" />

```apl
# 压缩 houge.txt和bailongma.txt，压缩后的名称为mypackage.zip
zip mypackage.zip houge.txt bailongma.txt
# 将test、itheima两个文件夹和a.txt文件，压缩到test.zip文件内
zip -r test.zip test itheima a.txt

# 解压 mypackage.zip
unzip mypackage.zip
# 解压mypackage.zip到指定目录-d
unzip mypackage.zip -d /opt
unzip test.zip -d /home/itheima # 将test.zip解压到指定文件夹内（/home/itheima）
```

## tar 解压缩

### 基本语法

> tar命令位于/bin目录，它能够将用户所指定的文件或目录打包成一个文件，但不做压缩。一般Linux上常用的压缩方式是选用tar将许多文件打包成一个文件，再以gzip压缩命令压缩成xxx.tar.gz(或称为xxx.tgz)的文件。

.tar，称之为tarball，归档文件，即简单的将文件组装到一个.tar的文件内，并没有文件体积的减少，仅是简单的封装

.gz，也常见为.tar.gz，gzip格式压缩文件，即使用gzip压缩算法将文件压缩到一个文件内，可以极大的减少压缩后的体积

```sh
# 功能描述：打包目录，压缩后的 文件格式.tar.gz
tar [选项] xxx.tar.gz (打包的内容)
```

```sh
# 作用: 对文件进行打包、解包、压缩、解压
tar  [-zcxvf]  fileName  [files]
```

> - 包文件后缀为.tar表示只是完成了打包，**并没有压缩**
> - 包文件后缀为.tar.gz表示打包的同时**还进行了压缩**

> - -z: z代表的是gzip，通过gzip命令处理文件，gzip可以对文件压缩或者解压
> - -c: c代表的是create，即创建新的包文件(打包)
> - -x: x代表的是extract，实现从包文件中还原文件(解包)
> - -v: v代表的是verbose，显示命令的执行过程
> - -f: f代表的是file，用于指定包文件的名称

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209252311947.png" alt="image-20220925231100844" style="zoom:80%;" />

### 压缩

> - -z选项如果使用的话，一般处于选项位第一个
> - -f选项，必须在选项位最后一个

```apl
# 压缩多个文件(没有z，表示没有进行压缩)
tar -cvf houma.tar.gz houge.txt bailongma.txt houge.txt bailongma.txt
# 压缩目录：tar -zcvf (压缩后文件名) (要压缩的文件所在位置)
tar -czvf xiyou.tar.gz xiyou/
```

### 解压

```apl
# 将hello.tar文件进行解包，并将解包后的文件放在当前目录
tar -xvf hello.tar		  			
# 解压：tar -zxvf (要解压的文件) 将hello.tar.gz文件进行解压，并将解压后的文件放在当前目录
tar -xzvf houma.tar.gz
# 解压到指定目录：tar -zxvf (要解压的文件) -C (指定目录)，指定解压到的目录要存在
tar -xzvf xiyou.tar.gz -C /opt
```

> - -f选项，必须在选项组合体的最后一位
> - -z选项，建议在开头位置
> - -C选项单独使用，和解压所需的其它参数分开

# 环境变量

## 环境变量的作用

在讲解which命令的时候，我们知道使用的一系列命令其实本质上就是一个个的可执行程序。比如，cd命令的本体就是：/usr/bin/cd 这个程序文件。我们是否会有疑问，为何无论当前工作目录在哪里，都能执行：/usr/bin/cd这个程序呢？这就是环境变量的作用啦。

环境变量是操作系统（Windows、Linux、Mac）在运行的时候，记录的一些关键性信息，用以辅助系统运行。

在Linux系统中执行：env命令即可查看当前系统中记录的环境变量

环境变量是一种KeyValue型结构，即名称和值，如下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211040846517.png" alt="image-20221104084637349" style="zoom:80%;" />

**如图，图中记录了：**

- **HOME：/home/itheima**，用户的**HOME路径**

- **USER：itheima**，当前的操作用户

- **PWD：当前工作路径**

**等等一系列信息，用于辅助系统在运行的时候，从环境变量中获取关键信息**



## 环境变量：PATH

在前面提出的问题中，我们说无论当前工作目录是什么，都能执行/usr/bin/cd这个程序，这个就是借助环境变量中：PATH这个项目的值来做到的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211040844976.png" alt="image-20221104084439875" style="zoom:80%;" />

PATH记录了系统执行任何命令的搜索路径，如上图记录了（路径之间以:隔开）：

- /usr/local/bin
- /usr/bin
- /usr/local/sbin
- /usr/sbin
- /home/itheima/.local/bin
- /home/itheima/bin

当执行任何命令，都会按照顺序，从上述路径中搜索要执行的程序的本体

比如执行cd命令，就从第二个目录/usr/bin中搜索到了cd命令，并执行



## 读取环境变量

在Linux系统中，$符号被用于取”变量”的值。环境变量记录的信息，除了给操作系统自己使用外，如果我们想要取用，也可以使用。取得环境变量的值就可以通过语法：$环境变量名 来取得。比如： echo $PATH

读取环境变量的方法：

- `export`命令显示当前系统定义的所有环境变量
- `echo $PATH`命令输出当前的`PATH`环境变量的值，其中`PATH`变量定义了运行命令的查找路径，以冒号`:`分割不同的路径，使用`export`定义的时候可加双引号也可不加。

就可以取得PATH这个环境变量的值，并通过echo语句输出出来。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211040843474.png" alt="image-20221104084331374" style="zoom:80%;" />

又或者：echo ${PATH}ABC

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211040843918.png" alt="image-20221104084352826" style="zoom:80%;" />

当和其它内容混合在一起的时候，可以通过{}来标注取的变量是谁



## 自定义环境变量PATH

环境变量PATH这个项目里面记录了系统执行命令的搜索路径。这些搜索路径我们也可以自行添加到PATH中去。

- 在当前HOME目录内创建文件夹，myenv，在文件夹内创建文件mkhaha
- 通过vim编辑器，在mkhaha文件内填入：echo 哈哈哈哈哈

完成上述操作后，随意切换工作目录，执行mkhaha命令尝试一下，会发现无法执行

### 临时修改

临时修改PATH：export PATH=$PATH:/home/itheima/myenv，再次执行mkhaha，无论在哪里都能执行了

```sh
export PATH=$PATH:/home/itheima/myenv
```

> - 生效时间：立即生效
> - 生效期限：当前终端有效，窗口关闭后无效
> - 生效范围：仅对当前用户有效
> - 配置的环境变量中不要忘了加上原来的配置，即$PATH部分，避免覆盖原来配置

### 仅对当前用户有效 .bashrc

通过修改用户目录下的~/.bashrc文件进行配置：

```sh
vim ~/.bashrc

# 在最后一行加上
export PATH=$PATH:/home/uusama/mysql/bin
```

> - 生效时间：使用相同的用户打开新的终端时生效，或者手动source ~/.bashrc生效
> - 生效期限：永久有效
> - 生效范围：仅对当前用户有效
> - 如果有后续的环境变量加载文件覆盖了PATH定义，则可能不生效

### 仅对当前用户有效 .bash_profile

和修改~/.bashrc文件类似，也是要在文件最后加上新的路径即可：

```sh
vim ~/.bash_profile

# 在最后一行加上
export PATH=$PATH:/home/uusama/mysql/bin
```

> - 生效时间：使用相同的用户打开新的终端时生效，或者手动source ~/.bash_profile生效
> - 生效期限：永久有效
> - 生效范围：仅对当前用户有效
> - 如果没有~/.bash_profile文件，则可以编辑~/.profile文件或者新建一个



### 对所有用户有效 /etc/bashrc

该方法是修改系统配置，需要管理员权限（如root）或者对该文件的写入权限：

```sh
# 如果/etc/bashrc文件不可编辑，需要修改为可编辑
chmod -v u+w /etc/bashrc

vim /etc/bashrc

# 在最后一行加上
export PATH=$PATH:/home/uusama/mysql/bin
```

> - 生效时间：新开终端生效，或者手动source /etc/bashrc生效
> - 生效期限：永久有效
> - 生效范围：对所有用户有效

### 对所有用户生效 /etc/profile⭐

该方法修改系统配置，需要管理员权限或者对该文件的写入权限，和vim /etc/bashrc类似：

或将export PATH=$PATH:/home/itheima/myenv，填入用户环境变量文件或系统环境变量文件中去

```sh
# 如果/etc/profile文件不可编辑，需要修改为可编辑
chmod -v u+w /etc/profile

vim /etc/profile
# PATH：变量值，等于原有PATH再追加上程序目录，因为原有内容不能丢弃，这不是路径拼接，只是PATH新增成员
# $PATH:写在前后位置都是可以的，用冒号分隔开
export PATH=$PATH:/home/itheima/myenv
source /etc/profile
```

> - 生效时间：新开终端生效，或者手动source /etc/profile生效
> - 生效期限：永久有效
> - 生效范围：对所有用户有效

### 对所有用户生效 /etc/environment

该方法是修改系统环境配置文件，需要管理员权限或者对该文件的写入权限：

```sh
# 如果/etc/bashrc文件不可编辑，需要修改为可编辑
chmod -v u+w /etc/environment

vim /etc/profile

# 在最后一行加上
export PATH=$PATH:/home/uusama/mysql/bin
```

> - 生效时间：新开终端生效，或者手动source /etc/environment生效
> - 生效期限：永久有效
> - 生效范围：对所有用户有效



## 环境变量的分类

环境变量可以简单的分成用户自定义的环境变量以及系统级别的环境变量。

- 用户级别环境变量定义文件：~/.bashrc、~/.profile（部分系统为：~/.bash_profile）
- 系统级别环境变量定义文件：/etc/bashrc、/etc/profile(部分系统为：/etc/bash_profile）、/etc/environment

> 另外在用户环境变量中，系统会首先读取~/.bash_profile（或者~/.profile）文件，如果没有该文件则读取~/.bash_login，根据这些文件中内容再去读取~/.bashrc。

## 环境变量加载顺序

> 1. /etc/environment
> 2. /etc/profile
> 3. /etc/bash.bashrc
> 4. /etc/profile.d/test.sh
> 5. ~/.profile
> 6. ~/.bashrc

# 用户和权限

> Linux系统是一种典型的多用户系统，不同的用户处于不同的地位，拥有不同的权限。 为了保护系统的安全性，Linux系统对不同的用户访问同一文件（包括目录文件）的权限做 了不同的规定。在Linux中我们可以使用ll或者ls -l命令来显示一个文件的属性以及文件所属 的用户和组

## root用户(超级管理员)

### 1 root介绍

无论是Windows、MacOS、Linux均采用多用户的管理模式进行权限管理。

- 在Linux系统中，拥有最大权限的账户名为：root（超级管理员）
- 而在前期，我们一直使用的账户是普通的用户：itheima

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061525767.png" alt="image-20221106152513162" style="zoom:80%;" />

root用户拥有最大的系统操作权限，而普通用户在许多地方的权限是受限的。

使用普通用户在根目录下创建文件夹

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061526545.png" alt="image-20221106152659063" style="zoom:80%;" />

切换到root用户后，继续尝试

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061527819.png" alt="image-20221106152712617" style="zoom:80%;" />

> 普通用户的权限，一般在其HOME目录内是不受限的，一旦出了HOME目录，大多数地方，普通用户仅有只读和执行权限，无修改权限

### 2 su(切换用户)和exit命令

在前面，我们接触过su命令切换到root账户。su命令就是用于账户切换的系统命令，其来源英文单词：Switch User

```sh
su [-] [用户名]
```

> - -符号是可选的，表示是否在切换用户后加载环境变量（后续讲解），建议带上
> - 参数：用户名，表示要切换的用户，用户名也可以省略，省略表示切换到root

切换用户后，可以通过exit命令退回上一个用户，也可以使用快捷键：ctrl + d

> - 使用普通用户，切换到其它用户需要输入密码，如切换到root用户
> - 使用root用户切换到其它用户，无需密码，可以直接切换

### 3 sudo 命令

在得知root密码时，可以通过su命令切换到root得到最大权限。不建议长期使用root用户，避免带来系统损坏。

我们可以使用sudo命令，为普通的命令授权，临时以root身份执行。

```sh
sudo 其他命令
```

> 在其它命令之前，带上sudo，即可为这一条命令临时赋予root授权
>
> 但是并不是所有的用户，都有权利使用sudo，我们需要为普通用户配置sudo认证

### 4 为普通用户配置sudo认证

切换到root用户，执行visudo命令，会自动通过vi编辑器打开：/etc/sudoers，在文件的最后添加：

```sh
vim /etc/sudoers 或者 visudo # 打开文件
```

```sh
test    ALL=(ALL)       ALL
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061637659.png" alt="image-20221106163724548" style="zoom:80%;" />

和上面root用户一样，test为用户名，下面讲了如何创建用户名:useradd test，然后wq保存即可

切换回普通用户，执行的命令，均以root运行

```sh
su - test
```

创建文件夹测试(刚创建的用户一般是没有权限创建文件夹的)，成功

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061640429.png" alt="image-20221106164021315" style="zoom:80%;" />

## 用户、用户组管理

### 1 用户、用户组介绍

> Linux系统中可以：配置多个用户、配置多个用户组、用户可以加入多个用户组中

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061536337.png" alt="image-20221106153650785" style="zoom:80%;" />

Linux中关于权限的管控级别有2个级别，分别是：

> 针对用户的权限控制、针对用户组的权限控制，比如，针对某文件，可以控制用户的权限和用户组的权限
>
> 对于该文件，可以设置该组可读可写，设置该用户可读可写可执行，不冲突，组内成员默认拥有组内权限

### 2 用户组管理

以下命令需root用户执行

```sh
groupadd 用户组名 # 创建用户组
groupdel 用户组名 # 删除用户组
groupadd itcast  # 为后续演示，我们创建一个itcast用户组：
```

### 3 用户管理

以下命令需root用户执行

```sh
useradd [-g -d] 用户名 # 创建用户
```

```sh
useradd test # 创建test用户，并自动创建test组
useradd test2 -g itcast -d /home/test22 # 创建test2用户，加入itcast组，指定home目录为/home/test22
```

选项：-g指定用户的组，不指定-g，会创建同名组并自动加入，指定-g需要组已经存在，如已存在同名组，必须使用-g

选项：-d指定用户HOME路径，不指定，HOME目录默认在：/home/用户名

给用户设置密码

```sh
passwd test
```

删除用户

```sh
userdel [-r] 用户名 # 删除用户
userdel test
userdel -r test
```

选项：-r，删除用户的HOME目录，不使用-r，删除用户时，HOME目录保留

```sh
id [用户名] # 查看用户所属组
```

参数：用户名，被查看的用户，如果不提供则查看自身

```sh
usermod -aG 用户组 用户名 # 将指定用户加入指定用户组 修改用户所属组
usermod -aG itcast test # 将test用户加入到itcast组中
```

### 4 getent

```sh
getent passwd # 使用getent命令，可以查看当前系统中有哪些用户
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061540731.png" alt="image-20221106154032347" style="zoom:80%;" />

共有7份信息，分别是：用户名:密码(x):用户ID:组ID:描述信息(无用):HOME目录:执行终端(默认bash)

```sh
getent group # 使用getent命令，同样可以查看当前系统中有哪些用户组
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061541002.png" alt="image-20221106154142765" style="zoom:80%;" />

包含3份信息，组名称:组认证(显示为x):组ID

## 查看权限控制

### 1 认知权限信息

> 通过ls -l 可以以列表形式查看内容，并显示权限细节

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061542834.png" alt="image-20221106154247506" style="zoom:80%;" />

- 序号1，表示文件、文件夹的权限控制信息
- 序号2，表示文件、文件夹所属用户
- 序号3，表示文件、文件夹所属用户组

让我们来解析一下序号1，权限细节,权限细节总共分为10个槽位

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061546456.png" alt="image-20221106154633976" style="zoom:80%;" />

举例：drwxr-xr-x，表示：

•这是一个文件夹，首字母d表示

•所属用户(右上角图序号2)的权限是：有r有w有x，rwx

•所属用户组(右上角图序号3)的权限是：有r无w有x，r-x （-表示无此权限）

•其它用户的权限是：有r无w有x，r-x

### 2 rwx

那么，rwx到底代表什么呢？

> r表示读权限、w表示写权限、x表示执行权限

针对文件、文件夹的不同，rwx的含义有细微差别

> r，针对文件可以查看文件内容，针对文件夹，可以查看文件夹内容，如ls命令
>
> w，针对文件表示可以修改此文件，针对文件夹，可以在文件夹内：创建、删除、改名等操作
>
> x，针对文件表示可以将文件作为程序执行，针对文件夹，表示可以更改工作目录到此文件夹，即cd进入

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061603556.png" alt="image-20221106160349231" style="zoom:80%;" />

## 修改权限控制 - chmod

```s和
chmod [-R] 权限 文件或文件夹
```

选项：-R，对文件夹内的全部内容应用同样的操作

### 1 通过字母

- u：所有者；g：所在组；o：其他人；a：所有人（u、g、o的总和）
- chmod u=rwx，g=rx，o=x 文件目录名：分别权限
- chmod o+w 文件目录名：给其他人都增加写的权限
- chmod a-x 文件目录名：给所有的用户都减掉执行权限

```sh
# 第一种方式变更权限
chmod [{ugoa}{+-=}{rwx}] 文件或目录
# 第二种方式变更权限
chmod [mode=421 ] [文件或目录]
```

案例演示

```sh
# 给abc文件的所有者读写执行权限，给所在组读执行权限，给其他组读执行权限
chmod u=rwx,g=rx,o=rx abc.txt
# 给abc文件夹的所有者除去执行的权限，增加写的权限
chmod -R u-x,g+w abc
# 给abc文件的所有用户增加读的权限
chmod a+r abc
# 修改文件使其所属组用户具有执行权限
chmod g+x houge.txt
```

### 2 通过数字⭐

权限可以用3位数字来代表，第一位数字表示用户权限，第二位表示用户组权限，第三位表示其它用户权限。

数字的细节如下：r记为4，w记为2，x记为1，可以有：

```
chmod u=rwx，g=rx，o=x 文件目录名 等价于 chmod 751 文件目录名
```

- 上述规则可以自由组合：rwx=4+2+1=7、rw=6、rx=5
- 0：无任何权限， 即 ---
- 1：仅有x权限， 即 --x
- 2：仅有w权限 即 -w-
- 3：有w和x权限 即 -wx
- 4：仅有r权限 即 r--
- 5：有r和x权限 即 r-x
- 6：有r和w权限 即 rw-
- 7：有全部权限 即 rwx

所以751表示： rwx(7) r-x(5) --x(1)

```sh
# 采用数字的方式，设置文件所有者、所属组、其他用户都具有可读可写可执行权限
chmod 777 houge.txt
# 修改整个文件夹里面的所有文件的所有者、所属组、其他用户都具有可读可写可执行权限
chmod -R 777 xiyou/
# 将hello.txt的权限修改为： r-x--xr-x，数字序号为：
chmod 515 hello.txt
# 将hello.txt的权限修改为： -wx-w-rw-，数字序号为：
chmod 326 hello.txt
# 序号123代表的权限是：--x-w--wx
```

我们可以得知，Owner 的权限为 7，为可读可写可执行，Group 的权限为 5，为可读可执行，Others 的权限为 0，表示不可读写不可执行。对应字母为：`rwxr-x---`。

### 3 通过符号

除了这种数字的方式，还有一种使用符号类型改变权限的方式：

在这种方式里，我们将三种身份 `Owner`、`Group`、`Others`，分别简写为 `u（User）`、`g`、`o`，用 `a` 表示所有身份，再使用 `+` `-` `=` 表示加入、去除、设定一个权限，`r` `w` `x` 则继续表示读，写，执行权限，举个例子：

```sh
chomd u+x,g-x,o-x index.html
```

意思就是 `Owner` 加上执行权限，`Group` 和 `Others` 去除执行权限。

当然我们也可以直接设定权限

```sh
chmod u=rwx,g=rx,o=r index.html
```

此时文件的权限就相当于 `-rwxr-xr--`。

此外，我们还可以省略不写 `ugoa` 这类身份内容，直接写：

```
chmod +x index.html
```

此时相当于使用了 `a`，会给所有身份添加执行权限。



## 修改权限控制 - chown

### 1 chown命令

使用chown命令，可以修改文件、文件夹的所属用户和用户组

普通用户无法修改所属为其它用户或组，所以此命令只适用于root用户执行

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211061545933.png" alt="image-20221106154529516" style="zoom:80%;" />

```sh
chown [-R] [用户][:][用户组]
```

选项，-R，同chmod，对文件夹内全部内容应用相同规则

> •选项，用户，修改所属用户
>
> •选项，用户组，修改所属用户组
>
> •:用于分隔用户和用户组

### 2 案例演示

```sh
chown root hello.txt，将hello.txt所属用户修改为root

chown :root hello.txt，将hello.txt所属用户组修改为root

chown root:itheima hello.txt，将hello.txt所属用户修改为root，用户组修改为itheima

chown -R root test，将文件夹test的所属用户修改为root并对文件夹内全部内容应用同样规则
```

chown修改文件所有者

```sh
chown [选项] [最终用户] [文件或目录] # 功能描述：改变文件或者目录的所有者
```

-R：如果是目录，则使其下所有子文件或目录递归生效

```apl
chown atguigu houge.txt
chown -R atguigu:atguigu xiyou/
```



# 磁盘管理

## df 显示磁盘空间使用情况

> df命令的英文全称即“Disk Free”，顾名思义功能是用于显示系统上可使用的磁盘空间。默认显示单位为KB，建议使用“df -h”的参数组合，根据磁盘容量自动变换合适的单位，更利于阅读。日常普遍用该命令可以查看磁盘被占用了多少空间、还剩多少空间等信息。语法格式：df [参数] [指定文件]

**常用参数：**

| 参数     | 描述                                    |
| :------- | :-------------------------------------- |
| -a       | 显示所有系统文件                        |
| -B       | <块大小> 指定显示时的块大小             |
| -h       | 以容易阅读的方式显示                    |
| -H       | 以1000字节为换算单位来显示              |
| -i       | 显示索引字节信息                        |
| -k       | 指定块大小为1KB                         |
| -l       | 只显示本地文件系统                      |
| -t       | <文件系统类型> 只显示指定类型的文件系统 |
| -T       | 输出时显示文件系统类型                  |
| -- -sync | 在取得磁盘使用信息前，先执行sync命令    |

**参考实例：**

```sh
# 显示磁盘分区使用情况：
df
# 以容易阅读的方式显示磁盘分区使用情况：
df -h
# 显示指定文件所在分区的磁盘使用情况：
df /etc/dhcp
# 显示文件类型为ext4的磁盘使用情况：
df -t ext4
```

```sh
# 查看磁盘挂载情况
mount

# 查看磁盘分区信息
df

# 查看目录及子目录大小
du -H -h

# 查看当前目录下各个文件, 文件夹占了多少空间, 不会递归
du -sh *
```



## fdisk 磁盘分区

> fdisk命令的英文全称是“Partition table manipulator for Linux”，即作为磁盘的分区工具。进行硬盘分区从实质上说就是对硬盘的一种格式化，分区就好比在一张白纸上画一个大方框，而格式化好比在方框里打上格子。

**常用参数：**

| 参数 | 描述                                                         |
| :--- | :----------------------------------------------------------- |
| -b   | 指定每个分区的大小                                           |
| -l   | 列出指定的外围设备的分区表状况                               |
| -s   | 将指定的分区大小输出到标准输出上，单位为区块                 |
| -u   | 搭配”-l”参数列表，会用分区数目取代柱面数目，来表示每个分区的起始地址 |
| -v   | 显示版本信息                                                 |

**参考实例：**

```sh
# 语法格式：fdisk [参数]
# 查看所有分区情况
fdisk -l
# 选择分区磁盘
fdisk /dev/sdb
# 在当前磁盘上建立扩展分区
fdisk /ext
# 不检查磁盘表面加快分区操作
fdisk /actok
# 重建主引导记录
fdisk /cmbr
```

## lsblk 查看系统的磁盘

> lsblk命令的英文是“list block”，即用于列出所有可用块设备的信息，而且还能显示他们之间的依赖关系，但是它不会列出RAM盘的信息。lsblk命令包含在util-linux-ng包中，现在该包改名为util-linux。

**常用参数：**

| 参数 | 描述                       |
| :--- | :------------------------- |
| -a   | 显示所有设备               |
| -b   | 以bytes方式显示设备大小    |
| -d   | 不显示 slaves 或 holders   |
| -D   | print discard capabilities |
| -e   | 排除设备                   |
| -f   | 显示文件系统信息           |
| -h   | 显示帮助信息               |
| -i   | use ascii characters only  |
| -m   | 显示权限信息               |
| -l   | 使用列表格式显示           |
| -n   | 不显示标题                 |
| -o   | 输出列                     |
| -P   | 使用key=”value”格式显示    |
| -r   | 使用原始格式显示           |
| -t   | 显示拓扑结构信息           |

**参考实例：**

```sh
# 语法格式：lsblk [参数]
# lsblk命令默认情况下将以树状列出所有块设备
lsblk
# 默认选项不会列出所有空设备
lsblk -a
# 也可以用于列出一个特定设备的拥有关系，同时也可以列出组和模式
lsblk -m
# 要获取SCSI设备的列表，你只能使用-S选项，该选项是用来以颠倒的顺序打印依赖的：
lsblk -S
# 例如，你也许想要以列表格式列出设备，而不是默认的树状格式。可以将两个不同的选项组合，以获得期望的输出
lsblk -nl
```

## hdparm 显示与设定硬盘参数

hdparm命令用于检测，显示与设定IDE或SCSI硬盘的参数。

**常用参数：**

| 参数 | 描述                                     |
| :--- | :--------------------------------------- |
| -a   | 设定读取文件时，预先存入块区的分区数     |
| -f   | 将内存缓冲区的数据写入硬盘，并清空缓冲区 |
| -g   | 显示硬盘的磁轨，磁头，磁区等参数         |
| -I   | 直接读取硬盘所提供的硬件规格信息         |
| -X   | 设定硬盘的传输模式                       |

**参考实例：**

```sh
# 语法格式：hdparm [参数]
# 显示硬盘的相关设置
hdparm /dev/sda
# 显示硬盘的柱面、磁头、扇区数
hdparm -g /dev/sda
# 评估硬盘的读取效率
hdparm -t /dev/sda
# 直接读取硬盘所提供的硬件规格信息：
hdparm -X /dev/sda
# 使IDE硬盘进入睡眠模式
hdparm -Y /dev/sda
```

## vgextend 扩展卷组

> vgextend命令用于动态扩展LVM卷组，它通过向卷组中添加物理卷来增加卷组的容量。LVM卷组中的物理卷可以在使用vgcreate命令创建卷组时添加，也可以使用vgextend命令动态的添加。语法格式：vgextend [参数]

**常用参数：**

| 参数 | 描述     |
| :--- | :------- |
| -d   | 调试模式 |
| -t   | 仅测试   |

**参考实例：**

```sh
# 将物理卷/dev/sdb1加入卷组vglinuxprobe:
vgextend vglinuxprobe /dev/sdb1
```

## du 磁盘使用情况查询

### 指定目录的磁盘

```sh
du -h /root --max-depth=1，默认为当前目录
```

- -s：指定目录占用大小汇总
- -h：带计量单位
- -a：含文件
- --max-depth=1：子目录深度
- -c：列出明细的同时，增加汇总值

```sh
du -h --max-depth=1 /root
du -ha --max-depth=1 /root
```

### 找到目录下大文件

列出当前目录或文件的总大小，并按倒序排序

```sh
du -sh /root/*  | sort -nr
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202210241927576.png" alt="image-20221024192726491" style="zoom:80%;" />

找到最大的目录 `software`，占用 773M。进入到这个目录中，然后再次执行 du 命令。

```sh
du -sh /root/software/*  | sort -nr
```



# 设备管理

## mount 文件系统挂载

> mount命令用于加载文件系统到指定的加载点。此命令的最常用于挂载cdrom，使我们可以访问cdrom中的数据，因为你将光盘插入cdrom中，Linux并不会自动挂载，必须使用Linux mount命令来手动完成挂载。

**常用参数：**

| 参数 | 描述                                     |
| :--- | :--------------------------------------- |
| -t   | 指定挂载类型                             |
| -l   | 显示已加载的文件系统列表                 |
| -h   | 显示帮助信息并退出                       |
| -V   | 显示程序版本                             |
| -n   | 加载没有写入文件“/etc/mtab”中的文件系统  |
| -r   | 将文件系统加载为只读模式                 |
| -a   | 加载文件“/etc/fstab”中描述的所有文件系统 |

**参考实例：**

```sh
# mount [参数]
# 查看版本
mount -V
# 启动所有挂载
mount -a
# 挂载 /dev/cdrom 到 /mnt
mount /dev/cdrom /mnt
# 挂载nfs格式文件系统
mount -t nfs /123 /mnt
# 挂载第一块盘的第一个分区到/etc目录
mount -t ext4 -o loop,default /dev/sda1 /etc
```

## MAKEDEV  建立设备

MAKEDEV是一个脚本程序, 用于在 /dev 目录下建立设备, 通过这些设备文件可以 访问位于内核的驱动程序。

MAKEDEV 脚本创建静态的设备节点，通常位于/dev目录下。

**常用参数：**

| 参数 | 描述                                       |
| :--- | :----------------------------------------- |
| -v   | 显示出执行的每一个动作                     |
| -n   | 并不做真正的更新, 只是显示一下它的执行效果 |
| -d   | 删除设备文件                               |

**参考实例：**

```sh
# MAKEDEV [参数]
# 显示出执行的每一个动作
./MAKEDEV -v update
# 删除设备
./MAKEDEV -d device
```

## lspci 显示当前设备所有PCI总线信息

> lspci命令用于显示当前主机的所有PCI总线信息，以及所有已连接的PCI设备信息。现在主流设备如网卡储存等都采用PCI总线

**常用参数：**

| 参数 | 描述                                 |
| :--- | :----------------------------------- |
| -n   | 以数字方式显示PCI厂商和设备代码      |
| -t   | 以树状结构显示PCI设备的层次关系      |
| -b   | 以总线为中心的视图                   |
| -s   | 仅显示指定总线插槽的设备和功能块信息 |
| -i   | 指定PCI编号列表文件，不使用默认文件  |
| -m   | 以机器可读方式显示PCI设备信息        |

**参考实例：**

```sh
# lspci [参数]
# 显示当前主机的所有PCI总线信息：
lspci
# 以树状结构显示PCI设备的层次关系：
lspci -t
```

## setleds 设定键盘上方三个 LED 的状态

> setleds即是英文词组“set leds”的合并，翻译为中文就是设置LED灯。setleds命令用来设定键盘上方三个 LED 灯的状态。在 Linux 中，每一个虚拟主控台都有独立的设定。这是一个十分神奇的命令，竟然可以通过命令来控制键盘的灯的状态。那么下面我一起来学习一下这个命令吧。

**常用参数：**

| 参数             | 描述                             |
| :--------------- | :------------------------------- |
| -F               | 设定虚拟主控台的状态             |
| -D               | 改变虚拟主控台的状态和预设的状态 |
| -L               | 直接改变 LED 显示的状态          |
| +num/-num        | 将数字键打开或关闭               |
| +caps/-caps      | 把大小写键打开或关闭             |
| +scroll /-scroll | 把选项键打开或关闭               |

**参考实例：**

控制键盘灯num灯亮和灯灭：

```
setleds +num 
setleds -num 
```

控制键盘的大小写键打开或关闭，键盘指示灯亮与灭：

```
setleds +caps 
setleds -caps 
```

控制键盘的选项键打开或关闭，键盘指示灯亮与灭：

```
setleds +scroll 
```

对三灯的亮与灭的情况进行组合，分别设置为数字灯亮，大小写灯灭，选项键scroll灯灭：

```
setleds +num -caps -scroll
```

## sensors 检测服务器内部温度及电压

sensors命令用于检测服务器内部降温系统是否健康，可以监控主板，CPU的工作电压，风扇转速、温度等数据 。

检测cpu工作电压，温度等：

```
sensors
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304181725318.png" alt="image-20230418172546000" style="zoom:80%;" />

## uname 显示系统信息

uname命令的英文全称即“Unix name”。

用于显示系统相关信息，比如主机名、内核版本号、硬件架构等。

如果未指定任何选项，其效果相当于执行”uname -s”命令，即显示系统内核的名字。

**常用参数：**

| 参数 | 描述                 |
| :--- | :------------------- |
| -a   | 显示系统所有相关信息 |
| -m   | 显示计算机硬件架构   |
| -n   | 显示主机名称         |
| -r   | 显示内核发行版本号   |
| -s   | 显示内核名称         |
| -v   | 显示内核版本         |
| -p   | 显示主机处理器类型   |
| -o   | 显示操作系统名称     |
| -i   | 显示硬件平台         |

**参考实例：**

```sh
# 显示系统主机名、内核版本号、CPU类型等信息：
uname -a
# 仅显示系统主机名：
uname -n
# 显示当前系统的内核版本 :
uname -r
# 显示当前系统的硬件架构：
uname -i
```

## vmstat 显示虚拟内存状态

> vmstat命令的含义为显示虚拟内存状态（“Virtual Memory Statistics”），但是它可以报告关于进程、内存、I/O等系统整体运行状态。

| 参数 | 描述                               |
| :--- | :--------------------------------- |
| -a   | 显示活动内页                       |
| -f   | 显示启动后创建的进程总数           |
| -m   | 显示slab信息                       |
| -n   | 头信息仅显示一次                   |
| -s   | 以表格方式显示事件计数器和内存状态 |
| -d   | 报告磁盘状态                       |
| -p   | 显示指定的硬盘分区状态             |
| -S   | 输出信息的单位                     |

```sh
# 显示活动内页：
vmstat -a
# 显示启动后创建的进程总数：
vmstat -f
# 显示slab信息：
vmstat -m
# 头信息仅显示一次：
vmstat -n
# 以表格方式显示事件计数器和内存状态：
vmstat -s
# 显示指定的硬盘分区状态：
vmstat -p /dev/sda1
# 指定状态信息刷新的时间间隔为1秒：
vmstat 1
```

# 网络命令⭐

## 主机名和主机端口映射

### IP地址

每一台联网的电脑都会有一个地址，用于和其它计算机进行通讯

IP地址主要有2个版本，V4版本和V6版本（V6很少用，课程暂不涉及）

IPv4版本的地址格式是：a.b.c.d，其中abcd表示0~255的数字，如192.168.88.101就是一个标准的IP地址

可以通过命令：ifconfig，查看本机的ip地址，如无法使用ifconfig命令，可以安装：yum -y install net-tools

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211032108053.png" alt="image-20221103210819923" style="zoom:80%;" />

### 特殊IP地址

除了标准的IP地址以外，还有几个特殊的IP地址需要我们了解：

> 127.0.0.1，这个IP地址用于指代本机

> 0.0.0.0，特殊IP地址，可以用于指代本机，可以在端口绑定中用来确定绑定关系（后续讲解）在一些IP地址限制中，表示所有IP的意思，如放行规则设置为0.0.0.0，表示允许任意IP访问

### 主机名查看和修改

> 每一台电脑除了对外联络地址（IP地址）以外，也可以有一个名字，称之为主机名，无论是Windows或Linux系统，都可以给系统设置主机名

```sh
# 查看当前主机名
hostname
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209261220051.png" alt="image-20220926122039971" style="zoom:80%;" />

```sh
hostnamectl set-hostname 主机名 # 修改主机名（需root）
vi /etc/hostname # 修改主机名，重启完生效（方式二）
hostnamectl set-hostname centos # 修改主机名为centos
```

重新登录FinalShell即可看到主机名已经正确显示，主机名已经改变

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211032113771.png" alt="image-20221103211332686" style="zoom:80%;" />

### 域名解析(主机映射)

IP地址实在是难以记忆，有没有什么办法可以通过主机名或替代的字符地址去代替数字化的IP地址呢？

实际上，我们一直都是通过字符化的地址去访问服务器，很少指定IP地址。比如，我们在浏览器内打开：www.baidu.com，会打开百度的网址。其中，www.baidu.com，是百度的网址，我们称之为：域名

修改 linux 的主机映射文件（hosts 文件） 后续在 hadoop 阶段，虚拟机会比较多，配置时通常会采用主机名的方式配置， 比较简单方便。 不用刻意记 ip 地址。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211032115598.png" alt="image-20221103211557462" style="zoom:80%;" />

- 先查看本机的记录（私人地址本）
- Windows看：C:\Windows\System32\drivers\etc\hosts
- Linux看：/etc/hosts
- 再联网去DNS服务器（如114.114.114.114，8.8.8.8等）询问

相当于windows系统的C:\Windows\System32\drivers\etc\hosts文件的功能

```sh
vi /etc/hosts
```

```properties
192.168.2.100 hadoop100 
192.168.2.101 hadoop101 
192.168.2.102 hadoop102 
192.168.2.103 hadoop103 
```

## 配置静态IP

### 设置网段

在VMware的虚拟网络编辑器中，将VMnet8虚拟网卡的

> 网段设置为：192.168.88.0
>
> 网关设置为：192.168.88.2

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304022109293.png" alt="image-20230402210959236" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304022112845.png" alt="image-20230402211209772" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304022111775.png" alt="image-20230402211141701" style="zoom:80%;" />

### 设置静态IP

开启node1，修改主机名为node1，并修改固定ip为：192.168.88.131

```sh
# 修改主机名
hostnamectl set-hostname node1
# 修改IP地址
vim /etc/sysconfig/network-scripts/ifcfg-ens33
# 首先将上面的dhcp改成static表示静态获取IP
BOOTPROTO="static"
# 剩下的追加即可
IPADDR="192.168.88.101"
NETMASK="255.255.255.0"
GATEWAY="192.168.88.2"
DNS1="192.168.88.2"
```

```sh
# 重启网卡
systemctl restart network
# 查看IP
ifconfig
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304022148898.png" alt="image-20230402214818848" style="zoom:80%;" />

同样的操作启动node2和node3，除了hostname和IPADDR要变之外，其他都一样

修改node2主机名为node2，设置ip为192.168.88.102

修改node2主机名为node3，设置ip为192.168.88.103

##  curl和wget

[curl](https://so.csdn.net/so/search?q=curl&spm=1001.2101.3001.7020)和wget基础功能有诸多重叠，如下载等。

在高级用途上的curl由于可自定义各种请求参数所以长于模拟web请求，用于测试网页交互（浏览器）；[wget](https://so.csdn.net/so/search?q=wget&spm=1001.2101.3001.7020)由于支持ftp和Recursive所以长于下载，用于下载文件（迅雷）。

### wget 下载文件

wget是非交互式的文件下载器，可以在命令行内下载网络文件

```sh
wget [-b] url
```

- 选项：-b，可选，后台下载，会将日志写入到当前工作目录的wget-log文件
- 参数：url，下载链接

下载apache-hadoop 3.3.0版本

```sh
wget http://archive.apache.org/dist/hadoop/common/hadoop-3.3.0/hadoop-3.3.0.tar.gz
wget -b http://archive.apache.org/dist/hadoop/common/hadoop-3.3.0/hadoop-3.3.0.tar.gz
```

通过tail命令可以监控后台下载进度：tail -f wget-log

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211032128750.png" alt="image-20221103212859625" style="zoom:80%;" />

注意：无论下载是否完成，都会生成要下载的文件，如果下载未完成，请及时清理未完成的不可用文件。

杀死后台软件

```sh
ps -ef | grep wget
kill -9  29689  30628
```



### curl 发起网络请求

curl可以发送http网络请求，可用于：下载文件、获取信息等

```sh
curl [-O] url
```

- 选项：-O，用于下载文件，当url是下载链接时，可以使用此选项保存文件
- 参数：url，要发起请求的网络地址



#### 1、发送GET请求

```bash
curl URL
curl URL?a=1&b=nihao
```

#### 2、发送POST请求

```bash
curl -X POST -d 'a=1&b=nihao' URL
```

#### 3、发送json格式请求

```bash
curl -H "Content-Type: application/json" -X POST -d '{"abc":123,"bcd":"nihao"}' URL
curl -H "Content-Type: application/json" -X POST -d @test.json URL
```

其中，**-H**代表header头，**-X**是指定什么类型请求(POST/GET/HEAD/DELETE/PUT/PATCH)，**-d**代表传输什么数据。这几个是最常用的。

#### 4、获取所有请求头

```apl
curl -I https://blog.csdn.net/
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205221807074.png" alt="image-20220522180718990" style="zoom: 67%;" />



#### 5、下载文件

```apl
curl -O http://man.linuxde.net/text.iso     #O大写，不用O只是打印内容不会下载
# 自己命名下载后的文件名
curl -o 文件名  URL
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205221814770.png" alt="image-20220522181408671" style="zoom:50%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205221814926.png" alt="image-20220522181434828" style="zoom:80%;" />

```sh
curl -O -J -L "https://download.cowcs.com/cowtransfer/cowtransfer/15154/a294b4a08"
```

这个命令中的参数说明如下：

- `-O`：将文件保存在本地，使用服务器上的文件名。
- `-J`：使用响应头中的文件名作为保存的文件名。
- `-L`：跟随重定向，如果服务器返回重定向响应，`curl`会自动跳转到新的URL。

#### 6、跟随重定向

网址进入可能会进行跳转

```apl
curl URL -L
```



#### 7、查询可能出现的问题

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205221812180.png" alt="image-20220522181236105" style="zoom: 50%;" />



#### 8、代理访问

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205221813423.png" alt="image-20220522181320295" style="zoom: 50%;" />

####  9、断点续传

```apl
curl -O -C -URL http://man.linuxde.net/text.iso            #C大写
wget -c http://www.linuxde.net/text.iso                    #c小写
```

####  10、限速下载

```apl
curl --limit-rate 50k -O http://man.linuxde.net/text.iso
wget --limit-rate=50k http://www.linuxde.net/text.iso
```

####  11、显示响应头部信息

```apl
curl -I http://man.linuxde.net/text.iso
wget --server-response http://www.linuxde.net/test.iso
```





## 端口⭐⭐

端口，是设备与外界通讯交流的出入口。端口可以分为：物理端口和虚拟端口两类

- 物理端口：又可称之为接口，是可见的端口，如USB接口，RJ45网口，HDMI端口等
- 虚拟端口：是指计算机内部的端口，是不可见的，是用来操作系统和外部进行交互使用的

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211032138100.png" alt="image-20221103213844985" style="zoom:80%;" />



### 端口(虚拟)

物理端口我们日常生活中经常见到，也能知晓它的作用。但是虚拟端口，有什么用？为什么需要它呢？

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211032140580.png" alt="image-20221103214047491" style="zoom:80%;" />

计算机程序之间的通讯，通过IP只能锁定计算机，但是无法锁定具体的程序。

通过端口可以锁定计算机上具体的程序，确保程序之间进行沟通

IP地址相当于小区地址，在小区内可以有许多住户（程序），而门牌号（端口）就是各个住户（程序）的联系地址

### 端口分析

Linux系统是一个超大号小区，可以支持65535个端口，这6万多个端口分为3类进行使用：

- 公认端口：1~1023，通常用于一些系统内置或知名程序的预留使用，如SSH服务的22端口，HTTPS服务的443端口非特殊需要，不要占用这个范围的端口
- 注册端口：1024~49151，通常可以随意使用，用于松散的绑定一些程序服务
- 动态端口：49152~65535，通常不会固定绑定程序，而是当程序对外进行网络链接时，用于临时使用。

如图中，计算机A的微信连接计算机B的微信，A使用的50001即动态端口，临时找一个端口作为出口

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211032142795.png" alt="image-20221103214223712" style="zoom:80%;" />

计算机B的微信使用端口5678，即注册端口，长期绑定此端口等待别人连接

### 查看IP占用⭐

### nmap

可以通过Linux命令去查看端口的占用情况，使用nmap命令，安装nmap：yum -y install nmap

语法：nmap 被查看的IP地址

```sh
nmap 127.0.0.1
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211032145575.png" alt="image-20221103214513447" style="zoom:80%;" />

可以看到，本机（127.0.0.1）上有4个端口现在被程序占用了。

其中：22端口，一般是SSH服务使用，即FinalShell远程连接Linux所使用的端口



## 端口占用⭐⭐

### 基本语法 

```sh
netstat -anlp # 整个 Linux 系统的网络情况
netstat -anp | grep 进程号 #（功能描述：查看该进程网络信息）
netstat –nlp | grep 端口号 #（功能描述：查看网络端口号占用情况）
```

选项说明

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209252249439.png" alt="image-20220925224923307" style="zoom:80%;" />

### 查询进程

会显示所有端口和所有对应的程序，用grep管道可以过滤出想要的关键字段。

```apl
# 通过进程号查看sshd进程的网络信息
netstat -anlp |grep sshd
```

### 查询端口占用⭐

> 有关22端口占用的程序，两种方式

```apl
lsof -i:22
netstat -nltp | grep 22
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209101537930.png" alt="image-20220910153734819" style="zoom:80%;" />

## ssh 远程连接

ssh 命令用于连接基于 Linux 的远程主机。要使用 root 用户连接远程主机，需要使用以下命令：

```sh
ssh root@192.168.4.21
```

上面的命令将不支持 GUI，如果想使用 GUI 连接远程主机，需要使用下面的命令：

```sh
ssh -XY root@192.168.4.21
```

## curl 获取公网IP地址

在办公或家庭环境，我们的虚拟机或服务器上配置的通常是内网 IP 地址，我们如何知道，在与外网通信时，我们的公网出口 IP 是神马呢？这个在 Linux 上非常简单，一条命令搞定

```sh
# 推荐使用第一条命令
curl cip.cc
curl ip.sb
curl ifconfig.me
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304181743387.png" alt="image-20230418174354010" style="zoom:80%;" />

## ping  测试主机间网络连通性

> ping命令主要用来测试主机之间网络的连通性，也可以用于。执行ping指令会使用ICMP传输协议，发出要求回应的信息，若远端主机的网络功能没有问题，就会回应该信息，因而得知该主机运作正常。

> 不过值得我们注意的是：Linux系统下的ping命令与Windows系统下的ping命令稍有不同。Windows下运行ping命令一般会发出4个请求就结束运行该命令；而Linux下不会自动终止，此时需要我们按CTR+C终止或者使用-c参数为ping命令指定发送的请求数目。

**常用参数：**

| 参数 | 描述                                     |
| :--- | :--------------------------------------- |
| -d   | 使用Socket的SO_DEBUG功能                 |
| -c   | 指定发送报文的次数                       |
| -i   | 指定收发信息的间隔时间                   |
| -I   | 使用指定的网络接口送出数据包             |
| -l   | 设置在送出要求信息之前，先行发出的数据包 |
| -n   | 只输出数值                               |
| -p   | 设置填满数据包的范本样式                 |
| -q   | 不显示指令执行过程                       |
| -R   | 记录路由过程                             |
| -s   | 设置数据包的大小                         |
| -t   | 设置存活数值TTL的大小                    |
| -v   | 详细显示指令的执行过程                   |

```sh
# 语法格式：ping [参数] [目标主机]
# 检测与百度网站的连通性
ping www.baidu.com
# 连续ping4次
ping -c 4 www.baidu.com 
# 设置次数为4，时间间隔为3秒
ping -c 4 -i 3 www.baidu.com
# 利用ping命令获取指定网站的IP地址
ping -c 1 baidu.com | grep from | cut -d " " -f 4
```

## ifconfig 显示或设置网络设备

> ifconfig命令的英文全称是“network interfaces configuring”，即用于配置和显示Linux内核中网络接口的网络参数。用ifconfig命令配置的网卡信息，在网卡重启后机器重启后，配置就不存在。要想将上述的配置信息永远的存的电脑里，那就要修改网卡的配置文件了。

**常用参数：**

| 参数      | 描述                     |
| :-------- | :----------------------- |
| add<地址> | 设置网络设备IPv6的IP地址 |
| del<地址> | 删除网络设备IPv6的IP地址 |
| down      | 关闭指定的网络设备       |
| up        | 启动指定的网络设备       |
| IP地址    | 指定网络设备的IP地址     |

**参考实例：**

```sh
# ifconfig [参数]
# 显示网络设备信息
ifconfig
# 启动关闭指定网卡
ifconfig eth0 down
ifconfig eth0 up 
# 为网卡配置和删除IPv6地址
ifconfig eth0 add 33ffe:3240:800:1005::2/64
ifconfig eth0 del 33ffe:3240:800:1005::2/64
# 用ifconfig修改MAC地址
ifconfig eth0 down
ifconfig eth0 hw ether 00:AA:BB:CC:DD:EE
ifconfig eth0 up
ifconfig eth1 hw ether 00:1D:1C:1D:1E 
ifconfig eth1 up
# 配置IP地址
ifconfig eth0 192.168.1.56 
ifconfig eth0 192.168.1.56 netmask 255.255.255.0
ifconfig eth0 192.168.1.56 netmask 255.255.255.0 broadcast 192.168.1.255
```

## netstat 显示网络状态

netstat 命令用于显示各种网络相关信息，如网络连接，路由表，接口状态 (Interface Statistics)，masquerade 连接，多播成员 (Multicast Memberships) 等等。

| 参数 | 描述                                     |
| :--- | :--------------------------------------- |
| -a   | 显示所有连线中的Socket                   |
| -p   | 显示正在使用Socket的程序识别码和程序名称 |
| -u   | 显示UDP传输协议的连线状况                |
| -i   | 显示网络界面信息表单                     |
| -n   | 直接使用IP地址，不通过域名服务器         |

```sh
# 显示详细的网络状况
netstat -a
# 显示当前户籍UDP连接状况
netstat -nu
# 显示UDP端口号的使用情况
netstat -apu 
# 显示网卡列表
netstat -i
# 显示组播组的关系
netstat -g
```

# 进程管理⭐⭐

## 查看进程

程序运行在操作系统中，是被操作系统所管理的。为管理运行的程序，每一个程序在运行的时候，便被操作系统注册为系统中的一个：进程并会为每一个进程都分配一个独有的：进程ID（进程号）

> 如果想查看进程的 CPU 占用率和内存占用率，可以使用 aux; 
>
> 如果想查看进程的父进程 ID 可以使用 ef; 

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209252308517.png" alt="image-20220925230847386" style="zoom:80%;" />

- ps -axu | grep xxx：过滤得到xxx的信息。
- ps -ef：以全格式显示当前所有的进程，查看进程的父进程。

```shell
# 查找运行中的进程
ps -axu | grep mysql
# 经典应用
ps -ef  | grep mysql
# 查看端口
ps -ef  | grep 3306
```

一般来说，固定用法就是： ps -ef 列出全部进程的全部信息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211032152852.png" alt="image-20221103215227729" style="zoom:80%;" />

## 杀死进程

在Windows系统中，可以通过任务管理器选择进程后，点击结束进程从而关闭它。

同样，在Linux中，可以通过kill命令关闭进程。

```sh
kill [-9] 进程ID
```

选项：-9，表示强制关闭进程。不使用此选项会向进程发送信号要求其关闭，但是否关闭看进程自身的处理机制。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205251443511.png" alt="image-20220525144330435" style="zoom:80%;" />

杀死进程时，可以跟信号，信号很多，常用信号：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205251444396.png" alt="image-20220525144403328" style="zoom: 80%;" />

所以常用杀死进程的命令：正常杀死 `kill -1 2235` 或者强制杀死 `kill -9 2235`

```apl
kill -9 5102
killall firefox
```



## 查看进程树：pstree [选项]

```apl
pstree [选项]
```

- -p：显示进程的PID
- -u：显示进程的所属用户

```apl
pstree -p # 显示进程 pid
pstree -u # 显示进程所属用户
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209252305529.png" alt="image-20220925230540346" style="zoom:80%;" />

## 实时监控进程

> top和ps最大的不同之处在于**top在执行一段时间可以更新正在运行的进程**。

### top入门

```apl
top [选项]
```

选项说明

- -d 秒数：指定top命令每隔几秒更新。默认是3秒。
- -i：使top不显示任何闲置或者僵死进程。
- -p：通过指定监控进程ID来仅仅监控某个进程的状态。

操作说明

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209252258977.png" alt="image-20220925225823872" style="zoom:80%;" />

```apl
top -d 1
top -i
top -p 2575
```

> 执行上述命令后，可以按 P、M、N 对查询出的进程结果进行排序

### 返回结果分析⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209252300731.png" alt="image-20220925230040587" style="zoom:80%;" />

第一行信息为任务队列信息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209252301476.png" alt="image-20220925230124362" style="zoom: 80%;" />

第二行为进程信息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209252301474.png" alt="image-20220925230158370" style="zoom:80%;" />

第三行为 CPU 信息 

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209252302057.png" alt="image-20220925230230945" style="zoom:80%;" />

第四行为物理内存信息 

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209252302122.png" alt="image-20220925230255009" style="zoom:80%;" />

第五行为交换分区（swap）信息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209252303107.png" alt="image-20220925230317990" style="zoom:80%;" />

# 上传和下载

## FinalShell

我们可以通过FinalShell工具，方便的和虚拟机进行数据交换。在FinalShell软件的下方窗体中，提供了Linux的文件系统视图，可以方便的：

- 浏览文件系统，找到合适的文件，右键点击下载，即可传输到本地电脑
- 浏览文件系统，找到合适的目录，将本地电脑的文件拓展进入，即可方便的上传数据到Linux中

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211040903696.png" alt="image-20221104090335565" style="zoom:80%;" />

