

# 基础知识

## Docker概述

Docker是一个开源的应用容器引擎，让开发者可以打包应用及依赖包到一个可移植的镜像中，然后发布到任何流行的Linux或Windows机器上。使用Docker可以更方便地打包、测试以及部署应用程序。

微服务虽然具备各种各样的优势，但服务的拆分通用给部署带来了很大的麻烦。

- 分布式系统中，依赖的组件非常多，不同组件之间部署时往往会产生一些冲突。
- 在数百上千台服务中重复部署，环境不一定一致，会遇到各种问题

- Docker 是一个开源的应用容器引擎，基于go 语言开发并遵循了apache2.0 协议开源
- Docker 是在Linux 容器里运行应用的开源工具，是一种轻量级的“虚拟机”
- Docker 的容器技术可以在一台主机上轻松为任何应用创建一个轻量级的，可移植的，自给自足的容器

也可以这样形象的比喻：

> Docker 的Logo设计为蓝色鲸鱼，拖着许多集装箱，鲸鱼可以看作为宿主机，集装箱可以理解为相互隔离的容器，每个集装箱中都包含自己的应用程序。

### Docker的优点

容器化越来越受欢迎，Docker的容器有点总结如下：

- 灵活：即使是最复杂的应用也可以集装箱化。
- 轻量级：容器利用并共享主机内核。
- 可互换：可以即时部署更新和升级。
- 便携式：可以在本地构建，部署到云，并在任何地方运行。
- 可扩展：可以增加并白动分发容器副本。
- 可堆叠：可以垂直和即时堆叠服务。

Docker 是一个用于开发，交付和运行应用程序的开放平台。Docker 使您能够将应用程序与基础架构分开，从而可以快速交付软件。借助 Docker，您可以与管理应用程序相同的方式来管理基础架构。通过利用 Docker 的方法来快速交付，测试和部署代码，您可以大大减少编写代码和在生产环境中运行代码之间的延迟。

### 应用部署的环境问题

大型项目组件较多，运行环境也较为复杂，部署时会碰到一些问题：

- 依赖关系复杂，容易出现兼容性问题

- 开发、测试、生产环境有差异

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011022297.png" alt="image-20210731141907366" style="zoom: 33%;" />

例如一个项目中，部署时需要依赖于node.js、Redis、RabbitMQ、MySQL等，这些服务部署时所需要的函数库、依赖项各不相同，甚至会有冲突。给部署带来了极大的困难。

### Docker解决依赖兼容问题

而Docker确巧妙的解决了这些问题，Docker是如何实现的呢？

Docker为了解决依赖的兼容问题的，采用了两个手段：

- 将应用的Libs（函数库）、Deps（依赖）、配置与应用一起打包

- 将每个应用放到一个隔离**容器**去运行，避免互相干扰

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011022297.png" alt="image-20210731142219735" style="zoom:33%;" />

这样打包好的应用包中，既包含应用本身，也保护应用所需要的Libs、Deps，无需再操作系统上安装这些，自然就不存在不同应用之间的兼容问题了。虽然解决了不同应用的兼容问题，但是开发、测试等环境会存在差异，操作系统版本也会有差异，怎么解决这些问题呢？

### Docker解决操作系统环境差异

要解决不同操作系统环境差异问题，必须先了解操作系统结构。以一个Ubuntu操作系统为例，结构如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011022303.png" alt="image-20210731143401460" style="zoom: 25%;" />

结构包括：

- 计算机硬件：例如CPU、内存、磁盘等
- 系统内核：所有Linux发行版的内核都是Linux，例如CentOS、Ubuntu、Fedora等。内核可以与计算机硬件交互，对外提供**内核指令**，用于操作计算机硬件。
- 系统应用：操作系统本身提供的应用、函数库。这些函数库是对内核指令的封装，使用更加方便。

应用于计算机交互的流程如下：

1）应用调用操作系统应用（函数库），实现各种功能

2）系统函数库是对内核指令集的封装，会调用内核指令

3）内核指令操作计算机硬件

Ubuntu和CentOSpringBoot都是基于Linux内核，无非是系统应用不同，提供的函数库有差异：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011022307.png" alt="image-20210731144304990" style="zoom: 25%;" />

此时，如果将一个Ubuntu版本的MySQL应用安装到CentOS系统，MySQL在调用Ubuntu函数库时，会发现找不到或者不匹配，就会报错了：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011022315.png" alt="image-20210731144458680" style="zoom:25%;" />

Docker如何解决不同系统环境的问题？

- Docker将用户程序与所需要调用的系统(比如Ubuntu)函数库一起打包
- Docker运行到不同操作系统时，直接基于打包的函数库，借助于操作系统的Linux内核来运行

如图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011022312.png" alt="image-20210731144820638" style="zoom:25%;" />

**Docker如何解决大型项目依赖关系复杂，不同组件依赖的兼容性问题？**

> - Docker允许开发中将**应用、依赖、函数库、配置**一起**打包**，形成**可移植镜像**
> - Docker应用**运行在容器中，使用沙箱机制**，相互**隔离**

**Docker如何解决开发、测试、生产环境有差异的问题？**

> Docker镜像中包含完整运行环境，包括系统函数库，**仅依赖系统的Linux内核，因此可以在任意Linux操作系统上运行**

**Docker是一个快速交付应用、运行应用的技术，具备下列优势：**

> - 可以将程序及其依赖、运行环境一起打包为一个镜像，可以迁移到任意Linux操作系统
> - 运行时利用沙箱机制形成隔离容器，各个应用互不干扰
> - 启动、移除都可以通过一行命令完成，方便快捷

### Docker与虚拟机

> 虚拟机（virtual machine）是在操作系统中模拟硬件设备，然后运行另一个操作系统，比如在 Windows 系统里面运行 Ubuntu 系统，这样就可以运行任意的Ubuntu应用了。

> Docker是一个系统进程；虚拟机是在操作系统中的操作系统
>
> Docker体积小、启动速度快、性能好；虚拟机体积大、启动速度慢、性能一般

![image-20230606150609557](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306061506675.png)

> 容器会在开发环境中取代虚拟机吗？似乎已经有定论了。但是容器会全面取代虚拟机吗？
>
> 开发者不会再像以前那样构建一个单一的应用。通过使用容器，他们能够从以前环境的不一致中解脱出来，更多地关注在代码构建、创建更好的软件以及更快速地编写代码。容器在开发者中已经成为了一种主流的虚拟化技术。

> 但是，容器究竟是应用程序的传递还是基础结构，两者有很大的区别。虚拟机运行缓慢、可移植性较差而且很重，但在部署企业的基础设施和运行传统单体应用时，虚拟机依然是优先考虑的技术。比如，尽管容器是应用程序开发的首选技术，但其他领域的 IT 团队，比如教育行业，不大会愿意花时间来将其定制化的学生信息系统重构为微服务架构，这些企业也无法用一个容器来取代其为学生提供的数以千计的虚拟机。最终答案是什么？在当今的数据中心里，容器和虚拟机器都占有一席之地。

### Docker架构

#### 镜像和容器

> 镜像（`Image`）：**Docker 镜像是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。镜像不包含任何动态数据，其内容在构建之后也不会被改变**。

> 容器（`Container`）：镜像（`Image`）和容器（`Container`）的关系，就像是面向对象程序设计中的 `类` 和 `实例` 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011051610.png" alt="image-20220901105139518" style="zoom:67%;" />

#### DockerHub仓库

仓库（`Repository`）：仓库（`Repository`）类似Git的远程仓库，集中存放镜像文件。最大的公开仓库是 Docker Hub(https://hub.docker.com/)

开源应用程序非常多，打包这些应用往往是重复的劳动。为了避免这些重复劳动，人们就会将自己打包的应用镜像，例如Redis、MySQL镜像放到网络上，共享使用，就像GitHub的代码共享一样。

- DockerHub：DockerHub是一个官方的Docker镜像的托管平台。这样的平台称为Docker Registry。

- 国内也有类似于DockerHub 的公开服务，比如 [网易云镜像服务](https://c.163yun.com/hub)、[阿里云镜像库](https://cr.console.aliyun.com/)等。

我们一方面可以将自己的镜像共享到DockerHub，另一方面也可以从DockerHub拉取镜像：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011053345.png" style="zoom:67%;" />

#### Docker架构

我们要使用Docker来操作镜像、容器，就必须要安装Docker。

Docker是一个CS架构的程序，由两部分组成：

> - 服务端(server)：Docker守护进程，负责处理Docker指令，管理镜像、容器等
>
> - 客户端(client)：通过命令或RestAPI向Docker服务端发指令。可以在本地或远程向服务端发送指令

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011054140.png" alt="image-20220901105403029" style="zoom:80%;" />

## Docker 安装、卸载、镜像加速

### centos安装

#### 安装

安装`yum-utils`；

```apl
yum install -y yum-utils device-mapper-persistent-data lvm2
```

为yum源添加docker仓库位置；

```apl
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    
sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo

yum makecache fast
```

安装docker服务；

```apl
yum install -y docker-ce
```

启动docker服务。

```apl
systemctl start docker
systemctl enable docker
```

#### 卸载

如果之前安装过旧版本的Docker，可以使用下面命令卸载：

```apl
yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine \
                  docker-ce
```

#### 存储位置

默认情况下 Docker的存放位置为：`/var/lib/docker`

可以通过命令查看具体位置：`docker info | grep “Docker Root Dir”`

修改到其它目录

首先停掉 Docker 服务：

```
systemctl stop docker
```

然后移动整个/var/lib/docker 目录到目的路径

```
mkdir -p /root/data/docker
mv /var/lib/docker /root/data/docker
ln -s /root/data/docker /var/lib/docker --快捷方式
```

#### 配置镜像加速

docker官方镜像仓库网速较差，我们需要设置国内镜像服务：

参考阿里云的镜像加速文档：https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors

登录阿里云----->产品--->弹性计算---->容器镜像服务---->镜像工具------>镜像加速器

执行步骤:直接复制到terminal中执行就行，包括EOF

```apl
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://hi7nmgjd.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### ubuntu安装

1.先卸载旧版，如果没有的话，就不用执行了，直接第二步。

```bash
apt-get remove docker docker-engine docker.io containerd runc
```

2.在终端输入

```bash
apt update
apt-get install ca-certificates curl gnupg lsb-release
```

3.安装证书

```bash
curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
```

4.写入软件源信息

```bash
sudo add-apt-repository "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
```

![img](https://img-blog.csdnimg.cn/94f498e3a49f40b0b5adebf848406d78.png)

5.安装

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

中途出现问题的话，使用 sudo apt-get update 试试

6.启动docker

```bash
systemctl start docker
systemctl enable docker
```

7.安装工具

```bash
apt-get -y install apt-transport-https ca-certificates curl software-properties-common
```

8.重启docker

```bash
service docker restart
```

9.测试是否成功，输入sudo docker run hello-world 显示以下信息则成功，第一次比较慢。

10.查看docker版本 

```bash
sudo docker version
```

11.查看镜像，可以看到刚才创建的镜像

```cobol
sudo docker images
```

12.配置镜像加速

```sh
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://hi7nmgjd.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## Docker compose 安装、卸载

安装：https://docs.docker.com/compose/install/

```shell
# Compose目前已经完全支持Linux、Mac OS和Windows，在我们安装Compose之前，需要先安装Docker。下面我 们以编译好的二进制包方式安装在Linux系统中。 
curl -L "https://github.com/docker/compose/releases/download/1.28.6/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# 设置文件可执行权限 
sudo chmod +x /usr/local/bin/docker-compose
# 查看版本信息 
docker-compose -version
```

```shell
# 二进制包方式安装的，删除二进制文件即可
rm /usr/local/bin/docker-compose
```

# 应用场景

## 1、简化配置

> 这是Docker公司宣传的Docker的主要使用场景。虚拟机的最大好处是能在你的硬件设施上运行各种配置不一样的平台（软件、系统），Docker在降低额外开销的情况下提供了同样的功能。

> 它能让你将运行环境和配置放在代码中然后部署，同一个Docker的配置可以在不同的环境中使用，这样就降低了硬件要求和应用环境之间耦合度。

> - Web 应用的自动化打包和发布。
> - 自动化测试和持续集成、发布。
> - 在服务型环境中部署和调整数据库或其他的后台应用。
> - 从头编译或者扩展现有的 OpenShift 或 Cloud Foundry 平台来搭建自己的 PaaS 环境。

> 在容器技术出现之前，公司往往是通过为每个开发人员提供一台或者多台虚拟机来充当开发测试环境。开发测试环境一般负载较低，大量的系统资源都被浪费在虚拟机本身的进程上了。
>

> Docker容器没有任何CPU和内存上的额外开销，很适合用来提供公司内部的开发测试环境。而且由于docker镜像可以很方便的在公司内部分享，这对开发环境的规范性也有极大的帮助。
>

> 如果要把容器作为开发机使用，需要解决的是远程登录容器和容器内进程管理问题。虽然docker的初衷是为“微服务”架构设计的，但根据我们的实际使用经验，在docker内运行多个程序，甚至sshd或者upstart也是可行的。

## 2、代码流水线管理

> 前一个场景对于管理代码的流水线起到了很大的帮助。代码从开发者的机器到最终在生产环境上的部署，需要经过很多的中间环境。而每一个中间环境都有自己微小的差别，Docker给应用提供了一个从开发到上线均一致的环境，让代码的流水线变得简单不少。

## 3、提高开发效率

> 这就带来了一些额外的好处：Docker能提升开发者的开发效率。如果你想看一个详细一点的例子，可以参考Aater在DevOpsDays Austin 2014大会或者是DockerCon上的演讲：

> 不同的开发环境中，我们都想把两件事做好。一是我们想让开发环境尽量贴近生产环境，二是我们想快速搭建开发环境。理想状态中，要达到第一个目标，我们需要将每一个服务都跑在独立的虚拟机中以便监控生产环境中服务的运行状态。然而，我们却不想每次都需要网络连接，每次重新编译的时候远程连接上去特别麻烦。

> 这就是Docker做的特别好的地方，开发环境的机器通常内存比较小，之前使用虚拟的时候，我们经常需要为开发环境的机器加内存，而现在Docker可以轻易的让几十个服务在Docker中跑起来。

## 4、隔离应用

> 有很多种原因会让你选择在一个机器上运行不同的应用，比如之前提到的提高开发效率的场景等。

> 我们经常考虑两点，一是因为要降低成本而进行服务器整合，二是将一个整体式的应用拆分成松耦合的单个服务

## 5、整合服务器

> 正如通过虚拟机来整合多个应用，Docker隔离应用的能力使得Docker可以整合多个服务器以降低成本。

> 由于没有多个操作系统的内存占用，以及能在多个实例之间共享没有使用的内存，Docker可以比虚拟机提供更好的服务器整合解决方案。

## 6、调试能力

> Docker提供了很多的工具，这些工具不一定只是针对容器，但是却适用于容器。它们提供了很多的功能，包括可以为容器设置检查点、设置版本和查看两个容器之间的差别，这些特性可以帮助调试Bug。

## 7、多租户环境

> 另外一个Docker有意思的使用场景是在多租户的应用中，它可以避免关键应用的重写。我们一个特别的关于这个场景的例子是为IoT（译者注：物联网）的应用开发一个快速、易用的多租户环境。这种多租户的基本代码非常复杂，很难处理，重新规划这样一个应用不但消耗时间，也浪费金钱。

> 使用Docker，可以为每一个租户的应用层的多个实例创建隔离的环境，这不仅简单而且成本低廉，当然这一切得益于Docker环境的启动速度和其高效的diff命令。

## 8、快速开发

> 在虚拟机之前，引入新的硬件资源需要消耗几天的时间。Docker的虚拟化技术将这个时间降到了几分钟，Docker只是创建一个容器进程而无需启动操作系统，这个过程只需要秒级的时间。这正是Google和Facebook都看重的特性。

> 你可以在数据中心创建销毁资源而无需担心重新启动带来的开销。通常数据中心的资源利用率只有30%，通过使用Docker并进行有效的资源分配可以提高资源的利用率。



# 常用命令

## 启动、停止、状态

Docker应用需要用到各种端口，逐一去修改防火墙设置。非常麻烦，因此建议大家直接关闭防火墙！

启动docker前，一定要关闭防火墙后！！

启动docker前，一定要关闭防火墙后！！

启动docker前，一定要关闭防火墙后！！

```apl
# 关闭
systemctl stop firewalld
# 禁止开机启动防火墙
systemctl disable firewalld
```

```apl
# 启动docker： 
systemctl start docker
# 停止docker： 
systemctl stop docker
# 重启docker： 
systemctl restart docker
# 查看docker状态： 
systemctl status docker
# 开机启动： 
systemctl enable docker
# 查看docker概要信息： 包括镜像、容器数、系统信息等
docker info
# 显示 Docker 版本信息。
docker version  
# 查看docker总体帮助文档： 
docker --help
# 查看docker命令帮助文档： 
docker 具体命令 --help，docker --help，docker run --help
```

```sh
# 查看镜像/容器/数据卷所占的空间
docker system df 
# 查看指定容器资源占用状况，比如cpu、内存、网络、io状态：
docker stats $ContainerName
# 查看所有容器资源占用情况：
docker stats -a
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220207130306284.png" alt="image-20220207130306284" style="zoom:80%;" />



## 镜像命令

### 镜像图解

首先来看下镜像的名称组成：

> - 镜名称一般分两部分组成：[repository]:[tag]。
> - 在没有指定tag时，默认是latest，代表最新版本的镜像

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011112321.png" alt="image-20220901111247246" style="zoom:67%;" />

> 这里的mysql就是repository，5.7就是tag，合一起就是镜像名称，代表5.7版本的MySQL镜像。
>

常见的镜像操作命令如图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011113798.png" alt="image-20220901111332707" style="zoom: 80%;" />

### 查看本地镜像

```sh
docker images
# -a :列出本地所有的镜像（含历史映像层） -q :只显示镜像ID
docker images -aq
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220207120702038.png" alt="image-20220207120702038" style="zoom:80%;" />

> - REPOSITORY：表示镜像的仓库源
> - TAG：镜像的标签版本号
> - IMAGE ID：镜像ID
> - CREATED：镜像创建时间
> - SIZE：镜像大小

> 同一仓库源可以有多个 TAG版本，代表这个仓库源的不同个版本，我们使用 REPOSITORY:TAG 来定义不同的镜像。如果你不指定一个镜像的版本标签，例如你只使用 ubuntu，将默认使用 ubuntu:latest 镜像
>

### 查找 & 拉取镜像

> 网站：https://hub.docker.com
>

```sh
docker search [OPTIONS] 镜像名字
# limit : 只列出N个镜像，默认25个
docker search --limit 5 redis
```

```apl
# 注意：没有TAG就是最新版，等价于docker pull 镜像名字:latest。
docker pull 镜像名字[:TAG]
docker pull redis:6.0.8
docker pull ubuntu
docker pull nginx
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220207123349500.png" alt="image-20220207123349500" style="zoom:80%;" />

> - NAME：镜像名称
> - DESCRIPTION：镜像说明
> - STARS：点赞数量
> - OFFICIAL：是否是官方的
> - AUTOMATED：是否自动构建的

### 删除镜像

```apl
# 删除单个
docker rmi  -f 镜像ID
# 删除多个
docker rmi -f 镜像名1:TAG 镜像名2:TAG 
# 删除全部
docker rmi -f $(docker images -qa)
docker rmi -f $(docker images)
# 指定名称删除镜像：
docker rmi java:8
# 指定名称删除镜像（强制）
docker rmi -f java:8
# 删除所有没有引用的镜像
docker rmi `docker images | grep none | awk '{print $3}'`
```

### 镜像存放位置

> 查看Docker镜像的存放位置：
>

```apl
docker info | grep "Docker Root Dir"
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141544838.png" alt="image-20220814154434765" style="zoom:67%;" />

> 修改镜像存放位置

```apl
# 关闭Docker服务
systemctl stop docker
# 先将原镜像目录移动到目标目录
mv /var/lib/docker /mydata/docker
# 建立软连接
ln -s /mydata/docker /var/lib/docker
# 再次查看可以发现镜像存放位置已经更改。
docker info | grep "Docker Root Dir"
```

### 虚玄镜像(重要)

> 仓库名、标签都是\<none>的镜像，俗称虚悬镜像dangling image.一般都是用Dockerfile创建镜像时，生成none镜像。用docker images查看时发现仓库和tag都是none就是虚悬镜像了。**虚悬镜像一般都要删除**
>

```apl
# 查看虚玄镜像
docker image ls -f dangling=true
# 虚悬镜像已经失去存在价值，可以删除
docker image prune
```

### 镜像导入、导出、加工⭐

> 需求：利用docker save将nginx镜像导出磁盘，然后再通过load加载回来
>

> 1）利用docker xx --help命令查看docker save和docker load的语法

> 例如，查看save命令用法，可以输入命令：
>

```sh
docker save --help
docker save -o [保存的目标文件名称] [镜像名称]
```

> 2）使用docker save导出镜像到磁盘 

```sh
docker save -o nginx.tar nginx:latest
```

> 3）使用docker load加载镜像，先删除本地的nginx镜像：

```sh
docker rmi nginx:latest
```

然后运行命令，加载本地文件：

```sh
docker load -i nginx.tar
```

> 4)镜像加工制作

```apl
# docker commit提交容器副本使之成为一个新的镜像
docker commit -m="提交的描述信息" -a="作者" 容器ID 要创建的目标镜像名:[标签名]
```

> 进入ubuntu，此时没有vim，**原始的默认Ubuntu镜像是不带着vim命令的**
>

```sh
docker run -it ubuntu bash
```

外网连通的情况下，安装vim

```sh
apt-get update
apt-get install vim
```

查看ubuntu容器ID

```sh
docker ps
```

安装完成后，commit我们自己的新镜像

```sh
docker commit -m="vubantu" -a="renshuo" ea633bb26138 ubuntupro:2.0
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220207184017528.png" alt="image-20220207184017528" style="zoom:80%;" />

用这个镜像创建容器，容器已经拥有vim功能了

```sh
docker run -it bc3a8d5b4d88 bash
vim a.txt
```



## 容器命令

### 容器图解

> 有镜像才能创建容器，这是根本前提(下载一个CentOS或者ubuntu镜像演示)，容器操作的命令如图：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011121282.png" alt="image-20210731161950495" style="zoom: 50%;" />

容器保护三个状态：

> - 运行：进程正常运行
> - 暂停：进程暂停，CPU不再运行，并不释放内存
> - 停止：进程终止，回收进程占用的内存、CPU等资源

> - docker run：创建并运行一个容器，处于运行状态
> - docker pause：让一个运行的容器暂停
> - docker unpause：让一个容器从暂停状态恢复运行
> - docker stop：停止一个运行的容器
> - docker start：让一个停止的容器再次运行
>
> - docker rm：删除一个容器

### 新建+启动容器

```sh
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]

# 创建一个新的容器但不启动它。
# 使用docker镜像nginx:latest创建一个容器,并将容器命名为mynginx  
docker create --name mynginx nginx:latest     

# 使用docker镜像nginx:latest以后台模式启动一个容器,并将容器命名为mynginx。
# 在大部分的场景下，我们希望 docker 的服务是在后台运行的，我们可以过 -d 指定容器的后台运行模式。
docker run --name mynginx -d nginx:latest  

# 使用镜像 nginx:latest，以后台模式启动一个容器,将容器的 80 端口映射到主机的 80 端口,
# 主机的目录 /data 映射到容器的 /data。  
docker run -p 80:80 -v /data:/data -d nginx:latest  

# 使用镜像nginx:latest以交互模式启动一个容器,在容器内执行/bin/bash命令。  
docker run -it nginx:latest /bin/bash  
docker run -it --name=u1  ubuntu /bin/bash
docker run -it ubuntu bash
docker run -it centos /bin/bash 
```

OPTIONS说明（常用）

> - --name="容器新名字"，**为容器指定一个名称，若没有指定名称，则自动生成一个随机名称**；
> - -d: **后台运行容器并返回容器ID，也即启动守护式容器(后台运行)**；
>
> - -i：**以交互模式运行容器，通常与 -t 同时使用**；
> - -t：**为容器重新分配一个伪输入终端，通常与 -i 同时使用**；也即启动交互式容器
>
> - -P: 随机端口映射，大写P
> - -p: 指定端口映射，小写p

### 查看容器

> - -a :列出当前所有正在运行的容器+历史上运行过的
> - -l :显示最近创建的容器。
> - -n：显示最近n个创建的容器。
> - -q :静默模式，只显示容器编号。

> 通过该指令查看之前停止的容器，**用docker start等命令可以重启该容器(不用再次创建该容器了)**
>

```apl
# 列出所有在运行的容器信息。  
docker ps  

# 列出所有容器
docker ps -a

# 列出最近创建的5个容器信息。  
docker ps -n 5  

# 列出所有创建的容器ID。 
docker ps -a -q 

# 列出指定的容器的端口映射。
docker port mymysql  
```

### 删除 & 停止 & 退出容器

```sh
# 根据容器名字杀掉容器  
docker kill tomcat7  

# 根据容器ID杀掉容器  
docker kill 65d4a94f7a39  

# 删除已停止的容器：
docker rm 容器ID

# 一次性删除多个容器实例(所有容器)
docker rm -f $(docker ps -a -q) 
docker ps -a -q | xargs docker rm

# 退出容器
exit：run进去容器，exit退出，容器停止
ctrl+p+q：run进去容器，ctrl+p+q退出，容器不停止
```

### start/stop/restart

```sh
# 启动已被停止的容器mynginx  
docker start mynginx  

# 停止运行中的容器mynginx  
docker stop mynginx  

# 重启容器mynginx  
docker restart mynginx  
```

### 查看容器日志⭐

```apl
# 持续日志输出，类似tail -f命令
docker logs -f 容器ID
# 跟踪查看容器mynginx的日志输出。  
docker logs -f mynginx  
# 查看容器mynginx从2016年7月1日后的最新10条日志。  
docker logs --since="2016-07-01" --tail=10 mynginx  
# 带时间戳显示日志
docker logs -f -t  nginx1
```

### 进入容器交互

```apl
docker exec -it 容器ID bashShell
docker exec -it 容器ID /bin/bash
docker exec -it 容器ID redis-cli
```

在运行的容器中执行命令。可选参数：

> - **-d :** **分离模式: 在后台运行，一般用-d后台启动的程序，再用exec进入对应容器实例**
> - **-i :** 即使没有附加也保持STDIN 打开
> - **-t :** 分配一个伪终端

```sh
# 在容器 mynginx 中以交互模式执行容器内 /root/nginx.sh 脚本  
docker exec -it mynginx /bin/sh /root/nginx.sh  

# 在容器 mynginx 中开启一个交互模式的终端  
docker exec -i -t  mynginx /bin/bash  

# 也可以通过 docker ps -a 命令查看已经在运行的容器，然后使用容器 ID 进入容器。  
docker ps -a   
docker exec -it 9df70f9a0714 /bin/bash  
```

命令解读：

> - docker exec ：进入容器内部，执行一个命令
>
> - -it : 给当前进入的容器创建一个标准输入、输出终端，允许我们与容器交互
>
> - mn ：要进入的容器的名称
>
> - bash：进入容器后执行的命令，bash是一个linux终端交互命令

容器内部会模拟一个独立的Linux文件系统，看起来如同一个linux服务器一样：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011142164.png" alt="image-20220901114212077" style="zoom:67%;" />

> nginx的环境、配置、运行文件全部都在这个文件系统中，包括我们要修改的html文件。查看DockerHub网站中的nginx页面，可以知道nginx的html目录位置在`/usr/share/nginx/html`我们执行命令，进入该目录：
>

```sh
cd /usr/share/nginx/html
```

 查看目录下文件：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011142798.png" alt="image-20220901114228725" style="zoom:67%;" />

3）修改index.html的内容

容器内没有vi命令，无法直接修改，我们用下面的命令来修改：

```sh
sed -i -e 's#Welcome to nginx#传智教育欢迎您#g' -e 's#<head>#<head><meta charset="utf-8">#g' index.html
```

在浏览器访问自己的虚拟机地址，例如我的是：http://192.168.150.101，即可看到结果：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011142125.png" alt="image-20220901114254038" style="zoom:67%;" />

指定账号进入容器内部

```apl
# 使用root账号进入容器内部
docker exec -it --user root $ContainerName /bin/bash
```

重新进入

```apl
docker attach 容器ID
```

案例演示，用centos或者unbuntu都可以

- attach 直接进入容器启动命令的终端，不会启动新的进程，用exit退出，会导致容器的停止。

- exec 是在容器中打开新的终端，**并且可以启动新的进程，用exit退出，不会导致容器的停止**。

**推荐大家使用 docker exec 命令，因为退出容器终端，不会导致容器的停止**。

示例

```apl
-- 后台启动
docker run -d redis:6.0.8
-- 查看容器ID
docker ps
-- 进入redis
docker exec -it e2db0e470d67 redis-cli

-- 或者另一种方式进入
docker exec -it e2db0e470d67 /bin/bash
redis-cli -p 6379
set k1 v1
get k1
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220207143625748.png" alt="image-20220207143625748" style="zoom:80%;" />

### 从容器内拷贝文件到主机上

容器→主机

```apl
docker cp 容器ID:容器内路径 目的主机路径
```

进入ubuntu容器

```apl
docker run -it ubuntu bash
```

安装vim编辑器

```
apt-get update
apt-get install vim
```

创建文件

```
vi test.txt
```

进行复制

```apl
docker cp 84b15e00abbc:/test.txt /
```

### 导入和导出容器

> - export 导出容器的内容留作为一个tar归档文件[对应import命令]
> - import 从tar包中的内容创建一个新的文件系统再导入为镜像[对应export]

容器是正在启动中的，如果关闭了容器，用docker ps -a查看启动的容器ID，然后用docker start 容器ID启动服务，启动完成后执行docker exec进入容器内部

```apl
docker export 容器ID > 文件名.tar
cat 文件名.tar | docker import - 镜像用户/镜像名:镜像版本号
```

```apl
docker export 84b15e00abbc > ubuntuPro.tar
```

```apl
cat ubuntuPro.tar | docker import - renshuo/ubantupro:1.0
```

再进行查看

```
docker images
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220207172815660.png" alt="image-20220207172815660" style="zoom:80%;" />

执行自己的镜像创建容器

```apl
docker run -it ee13d72866f0 /bin/bash
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220207173123219.png" alt="image-20220207173123219" style="zoom:80%;" />

这时可以发现test.txt存在于该容器内

### 同步宿主机时间到容器

```apl
docker cp /etc/localtime $ContainerName:/etc/
```

### 指定容器时区

```apl
docker run -p 80:80 --name nginx \
-e TZ="Asia/Shanghai" \
-d nginx:1.17.0
```

## 网络命令

### 查看容器的IP地址

```apl
docker inspect --format '{{ .NetworkSettings.IPAddress }}' $ContainerName
```

### 查看所有网络

```apl
docker network ls 
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141546744.png" alt="image-20220814154653670" style="zoom:67%;" />

### 创建外部网络

```apl
docker network create -d bridge my-bridge-network
```

### 指定容器网络

```apl
docker run -p 80:80 --name nginx \
--network my-bridge-network \
-d nginx:1.17.0
```

## 容器rootfs命令

### commit

从容器创建一个新的镜像。参数说明：

- **-a :** 提交的镜像作者；
- **-c :** 使用Dockerfile指令来创建镜像；
- **-m :** 提交时的说明文字；
- **-p :** 在commit时，将容器暂停。

```
# 将容器a404c6c174a2 保存为新的镜像,
# 并添加提交人信息和说明信息。  
docker commit -a "guodong" -m "my db" a404c6c174a2  mymysql:v1   
```

### cp

用于容器与主机之间的数据拷贝。参数说明：

- **-L :** 保持源目标中的链接

```
# 将主机/www/runoob目录拷贝到容器96f7f14e99ab的/www目录下。  
docker cp /www/runoob 96f7f14e99ab:/www/  

# 将主机/www/runoob目录拷贝到容器96f7f14e99ab中，目录重命名为www。  
docker cp /www/runoob 96f7f14e99ab:/www  

# 将容器96f7f14e99ab的/www目录拷贝到主机的/tmp目录中。  
docker cp  96f7f14e99ab:/www /tmp/  
```

### diff

检查容器里文件结构的更改。

```
# 查看容器mymysql的文件结构更改。  
docker diff mymysql  
```

## 镜像仓库命令

### login/logout

**docker login :** 登陆到一个Docker镜像仓库，如果未指定镜像仓库地址，默认为官方仓库 Docker Hub**docker logout :**登出一个Docker镜像仓库，如果未指定镜像仓库地址，默认为官方仓库 Docker Hub参数说明：

- **-u :** 登陆的用户名
- **-p :** 登陆的密码

```
# 登陆到Docker Hub  
docker login -u 用户名 -p 密码  

# 登出Docker Hub  
docker logout  
```

### pull

从镜像仓库中拉取或者更新指定镜像。参数说明：

- **-a :** 拉取所有 tagged 镜像
- **–disable-content-trust :** 忽略镜像的校验,默认开启

```
# 从Docker Hub下载java最新版镜像。  
docker pull java  

# 从Docker Hub下载REPOSITORY为java的所有镜像。  
docker pull -a java  
```

### push

将本地的镜像上传到镜像仓库,要先登陆到镜像仓库。参数说明：

- **–disable-content-trust :** 忽略镜像的校验,默认开启

```
# 上传本地镜像myapache:v1到镜像仓库中。  
docker push myapache:v1  
```

### search

从Docker Hub查找镜像。参数说明：

- **–automated :** 只列出 automated build类型的镜像；
- **–no-trunc :** 显示完整的镜像描述；
- **-f \<过滤条件>:** 列出指定条件的镜像。

```
# 从 Docker Hub 查找所有镜像名包含 java，并且收藏数大于 10 的镜像  
docker search -f stars=10 java  

NAME                  DESCRIPTION                           STARS   OFFICIAL   AUTOMATED  
java                  Java is a concurrent, class-based...   1037    [OK]         
anapsix/alpine-java   Oracle Java 8 (and 7) with GLIBC ...   115                [OK]  
develar/java                                                 46                 [OK]  
```

每列参数说明：

- **NAME:** 镜像仓库源的名称
- **DESCRIPTION:** 镜像的描述
- **OFFICIAL:** 是否 docker 官方发布
- **stars:** 类似 Github 里面的 star，表示点赞、喜欢的意思
- **AUTOMATED:** 自动构建

## 本地镜像管理命令

### images

列出本地镜像。参数说明：

- **-a :** 列出本地所有的镜像（含中间映像层，默认情况下，过滤掉中间映像层）；
- **–digests :** 显示镜像的摘要信息；
- **-f :** 显示满足条件的镜像；
- **–format :** 指定返回值的模板文件；
- **–no-trunc :** 显示完整的镜像信息；
- **-q :** 只显示镜像ID。

```
# 查看本地镜像列表。  
docker images  

# 列出本地镜像中REPOSITORY为ubuntu的镜像列表。  
docker images  ubuntu  
```

### rmi

删除本地一个或多个镜像。参数说明：

- **-f :** 强制删除；
- **–no-prune :** 不移除该镜像的过程镜像，默认移除；

```
# 强制删除本地镜像 guodong/ubuntu:v4。  
docker rmi -f guodong/ubuntu:v4  
```

### tag

标记本地镜像，将其归入某一仓库。

```
# 将镜像ubuntu:15.10标记为 runoob/ubuntu:v3 镜像。  
docker tag ubuntu:15.10 runoob/ubuntu:v3  
```

### build

用于使用 Dockerfile 创建镜像。参数说明：

- **–build-arg=[] :** 设置镜像创建时的变量；
- **–cpu-shares :** 设置 cpu 使用权重；
- **–cpu-period :** 限制 CPU CFS周期；
- **–cpu-quota :** 限制 CPU CFS配额；
- **–cpuset-cpus :** 指定使用的CPU id；
- **–cpuset-mems :** 指定使用的内存 id；
- **–disable-content-trust :** 忽略校验，默认开启；
- **-f :** 指定要使用的Dockerfile路径；
- **–force-rm :** 设置镜像过程中删除中间容器；
- **–isolation :** 使用容器隔离技术；
- **–label=[] :** 设置镜像使用的元数据；
- **-m :** 设置内存最大值；
- **–memory-swap :** 设置Swap的最大值为内存+swap，"-1"表示不限swap；
- **–no-cache :** 创建镜像的过程不使用缓存；
- **–pull :** 尝试去更新镜像的新版本；
- **–quiet, -q :** 安静模式，成功后只输出镜像 ID；
- **–rm :** 设置镜像成功后删除中间容器；
- **–shm-size :** 设置/dev/shm的大小，默认值是64M；
- **–ulimit :** Ulimit配置。
- **–squash :** 将 Dockerfile 中所有的操作压缩为一层。
- **–tag, -t:** 镜像的名字及标签，通常 name:tag 或者 name 格式；可以在一次构建中为一个镜像设置多个标签。
- **–network:** 默认 default。在构建期间设置RUN指令的网络模式

```
# 使用当前目录的 Dockerfile 创建镜像，标签为 runoob/ubuntu:v1  
docker build -t runoob/ubuntu:v1 .   

# 使用URL github.com/creack/docker-firefox 的 Dockerfile 创建镜像  
docker build github.com/creack/docker-firefox  

# 通过 -f Dockerfile文件的位置 创建镜像  
docker build -f /path/to/a/Dockerfile .  
```

### history

查看指定镜像的创建历史。参数说明：

- **-H :** 以可读的格式打印镜像大小和日期，默认为true；
- **–no-trunc :** 显示完整的提交记录；
- **-q :** 仅列出提交记录ID。

```
# 查看本地镜像 guodong/ubuntu:v3 的创建历史。  
docker history guodong/ubuntu:v3  
```

### save

将指定镜像保存成 tar 归档文件。参数说明：

- **-o :** 输出到的文件。

```
# 将镜像 runoob/ubuntu:v3 生成 my_ubuntu_v3.tar 文档  
docker save -o my_ubuntu_v3.tar runoob/ubuntu:v3  
```

### load

导入使用 `docker save` 命令导出的镜像。参数说明：

- **–input , -i :** 指定导入的文件，代替 STDIN。
- **–quiet , -q :** 精简输出信息。

```
# 导入镜像  
docker load --input fedora.tar  
```

### import

从归档文件中创建镜像。参数说明：

- **-c :** 应用docker 指令创建镜像；
- **-m :** 提交时的说明文字；

```
# 从镜像归档文件my_ubuntu_v3.tar创建镜像，命名为runoob/ubuntu:v4  
docker import  my_ubuntu_v3.tar runoob/ubuntu:v4    
```

## 实用命令⭐

在平时的工作中，docker 接触得很多，除了经常使用的 docker run ，docker stop 等命令，docker 还有很多十分有用但是却不经常使用的命令，下面就来总结一下：

### 1. docker top

这个命令是用来查看一个容器里面的进程信息的，比如你想查看一个 nginx 容器里面有几个 nginx 进程的时候，就可以这么做：

```apl
docker top 3b307a09d20d
UID      PID    PPID    C    STIME  TTY    TIME       CMD
root     805    787     0    Jul13   ?   00:00:00  nginx: master process nginx -g daemon off;
systemd+ 941     805     0   Jul13    ?   00:03:18  nginx: worker process
```

### 2. docker load && docker save

我一般使用这两个命令去下载打包 Kubernetes 的镜像，因为你知道的国内的网速并不像国外那么快。

docker save 可以把一个镜像保存到 tar 文件中，你可以这么做：

```apl
~ docker save registry:2.7.1 >registry-2.7.1.tar
# 同时 docker load 可以把镜像从 tar 文件导入到 docker 中
~ docker load < registry-2.7.1.tar
```

### 3. docker search

这个命令可以帮助你在命令行中方便的搜索 DockerHub 中的镜像，比如:

```apl
~ docker search nginx
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207311625245.png" alt="image-20220731162519059" style="zoom:67%;" />

当然这个功能在国内可能不会特别好用，因为......

### 4. docker events

这命令会卡住

这个命令可以帮助你实时获取 docker 的各种事件信息，比如创建了一个容器什么的。

```apl
~ docker events
2020-07-28T21:28:46.000403018+08:00 image load sha256:432bf69f0427b52cad10897342eaf23521b7d973566354118e9a59c4d31b5fae (name=sha256:432bf69f0427b52cad10897342eaf23521b7d973566354118e9a59c4d31b5fae)
```

### 5. docker update

当你 docker run 了之后却发现里面有一些参数并不是你想要的状态比如你设置的 nginx 容器 cpu 或者内存太小，这个时候你就可以使用 docker update 去修改这些参数。

```apl
~ docker update nginx --cpus 2
```

### 6. docker history

当你修改了一个镜像，但是忘记了每一层的修改命令，或者你想查看一个镜像是怎么构建的时候就可以使用这个命令，比如：

```apl
~ docker history  traefik:v2.1.6
IMAGE               CREATED             CREATED BY                                      SIZE                COMMENT
5212a87ddaba        5 months ago        /bin/sh -c #(nop)  LABEL org.opencontainers.…   0B
<missing>           5 months ago        /bin/sh -c #(nop)  CMD ["traefik"]              0B
<missing>           5 months ago        /bin/sh -c #(nop)  ENTRYPOINT ["/entrypoint.…   0B
<missing>           5 months ago        /bin/sh -c #(nop)  EXPOSE 80                    0B
<missing>           5 months ago        /bin/sh -c #(nop) COPY file:59a219a1fb7a9dc8…   419B
<missing>           5 months ago        /bin/sh -c set -ex;  apkArch="$(apk --print-…   52.9MB
<missing>           5 months ago        /bin/sh -c apk --no-cache add ca-certificate…   1.85MB
<missing>           6 months ago        /bin/sh -c #(nop)  CMD ["/bin/sh"]              0B
<missing>           6 months ago        /bin/sh -c #(nop) ADD file:a1906f14a4e217a49…   4.81MB
```

### 7. docker wait

这个命令可以查看容器的退出状态，比如：

```apl
~ docker wait 7f7f0522a7d0
0
```

这样你就可以知道这个容器是正常退出的还是异常退出的了。

### 8. docker pause && docker unpause

当你运行了一个容器但是想要暂停它运行的时候，你就可以使用这个命令。

```apl
~ docker pause 7f7f0522a7d0
```

### 9. docker diff

当你运行了一个容器，但是你不知道容器里修改了哪一些文件的时候可以使用这个命令，比如：

```apl
docker diff 38c59255bf6e
C /etc
A /etc/localtime
C /var
C /var/lib
A /var/lib/registry
```

### 10. docker stats

这个是 docker 内置的监控命令，当你想要查看当前主机下所有容器占用内存和 cpu 的情况的时候就可以使用这个命令。

```apl
docker stats
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207311622672.png" alt="image-20220731162246516" style="zoom:67%;" />



# 日志清理

## 日志查看

```sh
cd /var/lib/docker/containers/
```

在这里都是以容器ID开头的容器名，后面用容器ID+通配符\*进入容器文件内部，然后删除*-json.log文件即可

```sh
du -sh /var/lib/docker/* | sort -nr 
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202210242018341.png" alt="image-20221024201846255" style="zoom:80%;" />

```sh
du -sh /var/lib/docker/containers/* | sort -nr
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202210242013909.png" alt="image-20221024201347792" style="zoom:80%;" />

## 日志清理方案

- **方案一**：手动清理日志文件，可解燃眉之急，治标不治本。
- **方案二**：脚本定期清理日志文件，缺点是日志文件全丢了，无法追溯。
- **方案三**：限制所有容器的日志文件大小，治本，缺点是需要重新创建容器和启动 docker 镜像。

### 方案一：手动清理方案

```apl
cat /dev/null > /var/lib/docker/containers/容器id+*/容器id-json.log
```

```apl
cat /dev/null > /var/lib/docker/containers/142d015f36cc*/142d015f36cc*-json.log 
```

注意：这里没有使用 `rm` 方式来删除文件。使用 `rm -rf` 方式删除日志后，通过 `df -h` 会发现磁盘空间并没有释放。原因是在 Linux 或者 Unix 系统中，通过 `rm -rf` 或者文件管理器删除文件，将会从文件系统的目录结构上解除链接（unlink）。如果文件是被打开的（有一个进程正在使用），那么进程将仍然可以读取该文件，磁盘空间也一直被占用。正确姿势是 cat /dev/null > *-json.log，当然也可以通过 rm -rf 删除后重启 docker。

###  方案二：脚本定期清理

提供一个清理脚本。

```sh
#!/bin/sh 

echo "======== start clean docker containers logs ========"  

logs=$(find /var/lib/docker/containers/ -name *-json.log)  

for log in $logs  
        do  
                echo "clean logs : $log"  
                cat /dev/null > $log  
        done  

echo "======== end clean docker containers logs ========"
```

执行脚本的命令。

```sh
sh clean_docker_log.sh
```

大家可以把执行脚本的命令加到 Linux 的`定时任务`中就可以了，这里不做展开。

下面要说的是我目前使用的方案。

### 方案三：限制 Docker 容器日志大小

新建 /etc/docker/daemon.json，若有就不用新建了。

```sh
vim /etc/docker/daemon.json
```

配置内容如下：

```json
{
    "log-driver":"json-file",
    "log-opts": {"max-size":"500m", "max-file":"3"}
}
```

max-size=500m，表示容器的日志文件大小上限是 500M。max-file=3，表示容器有三个日志，第一个满了 500M 之后就写第二个，第二个满了 500M 就写第三个，如果第三个满了，就清空第一个日志文件，重新写第一个日志文件。如下图所示：

![图片](https://mmbiz.qpic.cn/mmbiz_png/SfAHMuUxqJ1keHzuw775yZPDECYhgVoZG4jJUo6OMLVxrkPicJnD9ynMpnxTbFRk7cGlpkYtVvQEFqw1xKebGGw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)写了 3 个日志文件，最大不超过 500M

改完之后需要重启 docker 守护进程。

```
systemctl daemon-reload
systemctl restart docker
```

另外这种方式只对新建的容器有效，之前的容器不生效，所以我又把之前的 Logstash 容器删除了，然后重新启动了一个 Logstash 容器。



# 本地镜像发布到阿里云

## 创建本地镜像

进入ubuntu容器

```apl
docker run -it ubuntu bash
```

安装vim编辑器

```
apt-get update
apt-get install vim
```

创建文件

```
vi test.txt
```

**导出容器并导入成本地镜像**

```apl
docker export 84b15e00abbc > ubuntuPro.tar
```

```apl
cat ubuntuPro.tar | docker import - renshuo/ubantupro:1.0
```

再进行查看

```apl
docker images
```



## 配置阿里云

创建命名空间

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220213181834112.png" alt="image-20220213181834112" style="zoom: 67%;" />

创建镜像仓库

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220207185258523.png" alt="image-20220207185258523" style="zoom: 50%;" />



<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220207185310985.png" alt="image-20220207185310985" style="zoom: 50%;" />



点击管理

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220207185416401.png" alt="image-20220207185416401" style="zoom: 67%;" />

安装图示操作即可

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220207185503051.png" alt="image-20220207185503051" style="zoom: 67%;" />

```
docker login --username=任硕8673 registry.cn-hangzhou.aliyuncs.com
```

密码就是登录密码，315217ren

推送镜像

```
docker tag bc3a8d5b4d88 registry.cn-hangzhou.aliyuncs.com/myubantu1/myubuntu1:2.0
```

```
docker push registry.cn-hangzhou.aliyuncs.com/myubantu1/myubuntu1:2.0
```

拉取镜像

```
 docker pull registry.cn-hangzhou.aliyuncs.com/myubantu1/myubuntu1:2.0
```

使用

```
docker images
docker run -it  bc3a8d5b4d88  bash
```







# 数据卷

> 就是实现不同容器，**容器与外部系统间文件交换**，信息传递和查看。在之前的nginx案例中，修改nginx的html页面时，需要进入nginx内部。并且因为没有编辑器，修改文件也很麻烦。这就是因为**容器与数据（容器内文件）耦合带来的后果**。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011148839.png" alt="image-20210731172440275" style="zoom:67%;" />

要解决这个问题，必须将数据与容器解耦，这就要用到数据卷了。

> 1. docker修改，主机同步获得 
> 2. 主机修改，docker同步获得
> 3. docker容器stop，主机修改，docker容器重启看数据是否同步

## 什么是数据卷

> **数据卷（volume）**是一个虚拟目录，指向宿主机文件系统中的某个目录。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011149062.png" alt="image-20210731173541846" style="zoom:67%;" />

> 一旦完成数据卷挂载，对容器的一切操作都会作用在数据卷对应的宿主机目录了。这样，我们操作宿主机的/var/lib/docker/volumes/html目录，就等于操作容器内的/usr/share/nginx/html目录了
>

![image-20230606194623001](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306061946128.png)

## 基本语法

```apl
# 数据卷操作的基本语法
docker volume [COMMAND]
```

docker volume命令是数据卷操作，根据命令后跟随的command来确定下一步的操作：

> - create 创建一个volume
> - inspect 显示一个或多个volume的信息
> - ls 列出所有的volume
> - prune 删除未使用的volume
> - rm 删除一个或多个指定的volume

```sh
# 创建数据卷
docker volume create html
# 查看所有数据
docker volume ls
# 查看数据卷详细信息卷
docker volume inspect html
# 删除没使用的数据卷
docker volume prune
# 删除指定数据卷
docker volume rm html
```

## Nginx数据卷挂载

> - 目录必须是绝对路径
> - **如果目录不存在，会自动创建**
> - **可以挂载多个数据卷**
> - 语法：-v  主机目录：容器目录  镜像名

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306061645316.png" alt="image-20230606164548187" style="zoom:80%;" />

```sh
docker run -it --privileged=true -v /宿主机绝对路径目录:/容器内目录 镜像名
```

```sh
docker run -it --name nginx1 \
--privileged=true \
-p 80:80 \
-v /root/html:/usr/share/nginx/html \
-d nginx
```

```sh
# 在宿主机进行操作
cd /root/html
touch index.html
echo "hello,world" > index.html
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306061701727.png" alt="image-20230606170159603" style="zoom:80%;" />

## MySQL数据卷挂载

> 一个容器可以挂载多个目录，\表示没写完，回车后继续写

```sh
# /etc/mysql/conf.d最后会将文件内容合并到my.cnf中
docker run -d -p 3309:3306 --privileged=true \
-v /DockerData/mysql/log:/var/log/mysql \
-v /DockerData/mysql/data:/var/lib/mysql \
-v /DockerData/mysql/conf:/etc/mysql/conf.d \
-e MYSQL_ROOT_PASSWORD=123456  \
--name mysql5.7.25 \
mysql:5.7.25
```

> 修改权限，让外部能够连接

```sh
docker exec -it mysql5.7.25 bash
mysql -uroot -p123456
use mysql;
grant all on *.* to 'root'@'%';
flush privileges;
```

> ①数据卷挂载耦合度低，由docker来管理目录，但是目录较深，不好找
>
> ②目录挂载耦合度高，需要我们自己管理目录，不过目录容易寻找查看



# 自定义镜像

常见的镜像在DockerHub就能找到，但是我们自己写的项目就必须自己构建镜像了。

而要自定义镜像，就必须先了解镜像的结构才行。

## 镜像结构

镜像是将应用程序及其需要的系统函数库、环境、配置、依赖打包而成。

我们以MySQL为例，来看看镜像的组成结构：

![image-20210731175806273](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306061953405.png)

> 简单来说，镜像就是在系统函数库、运行环境基础上，添加应用程序文件、配置文件、依赖文件等组合，然后编写好启动脚本打包在一起形成的文件。要构建镜像，其实就是实现上述打包的过程。
>

## Dockerfile语法

> 构建自定义的镜像时，并不需要一个个文件去拷贝，打包。我们只需要告诉Docker，我们的镜像的组成，需要哪些BaseImage、需要拷贝什么文件、需要安装什么依赖、启动脚本是什么，将来Docker会帮助我们构建镜像。而描述上述信息的文件就是Dockerfile文件。
>

> **Dockerfile**就是一个文本文件，其中包含一个个的**指令(Instruction)**，用指令来说明要执行什么操作来构建镜像。每一个指令都会形成一层Layer。

![image-20210731180321133](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306061953388.png)

> 更新详细语法说明，请参考官网文档： https://docs.docker.com/engine/reference/builder
>

## 构建Java项目

### 基于Ubuntu构建Java项目

需求：基于Ubuntu镜像构建一个新镜像，运行一个java项目

步骤1：新建一个空文件夹docker-demo

![image-20210801101207444](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306061953397.png)

步骤2：拷贝课前资料中的docker-demo.jar文件到docker-demo这个目录

![image-20210801101314816](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306061953399.png)

步骤3：拷贝课前资料中的jdk8.tar.gz文件到docker-demo这个目录

![image-20210801101410200](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306061953401.png)

步骤4：拷贝课前资料提供的Dockerfile到docker-demo这个目录

![image-20210801101455590](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306061953429.png)

其中的内容如下：

```dockerfile
# 指定基础镜像
FROM ubuntu:16.04
# 配置环境变量，JDK的安装目录
ENV JAVA_DIR=/usr/local

# 拷贝jdk和java项目的包
COPY ./jdk8.tar.gz $JAVA_DIR/
COPY ./docker-demo.jar /tmp/app.jar

# 安装JDK
RUN cd $JAVA_DIR \
 && tar -xf ./jdk8.tar.gz \
 && mv ./jdk1.8.0_144 ./java8

# 配置环境变量
ENV JAVA_HOME=$JAVA_DIR/java8
ENV PATH=$PATH:$JAVA_HOME/bin

# 暴露端口
EXPOSE 8090
# 入口，java项目的启动命令
ENTRYPOINT java -jar /tmp/app.jar
```

步骤5：进入docker-demo

将准备好的docker-demo上传到虚拟机任意目录，然后进入docker-demo目录下

步骤6：运行命令：

```sh
docker build -t javaweb:1.0 .
```

最后访问 http://192.168.150.101:8090/hello/count，其中的ip改成你的虚拟机ip

### 基于java8构建Java项目

虽然我们可以基于Ubuntu基础镜像，添加任意自己需要的安装包，构建镜像，但是却比较麻烦。所以大多数情况下，我们都可以在一些安装了部分软件的基础镜像上做改造。

例如，构建java项目的镜像，可以在已经准备了JDK的基础镜像基础上构建。

需求：基于java:8-alpine镜像，将一个Java项目构建为镜像

实现思路如下：

- ① 新建一个空的目录，然后在目录中新建一个文件，命名为Dockerfile

- ② 拷贝课前资料提供的docker-demo.jar到这个目录中

- ③ 编写Dockerfile文件：

  - a ）基于java:8-alpine作为基础镜像

  - b ）将app.jar拷贝到镜像中

  - c ）暴露端口

  - d ）编写入口ENTRYPOINT

    内容如下：

    ```dockerfile
    FROM java:8-alpine
    COPY ./app.jar /tmp/app.jar
    EXPOSE 8090
    ENTRYPOINT java -jar /tmp/app.jar
    ```

- ④ 使用docker build命令构建镜像

- ⑤ 使用docker run创建容器并运行





# 应用部署⭐

## 总体步骤

1. 搜索镜像
2. 拉取镜像
3. 查看镜像
4. 启动镜像-----注意服务端口映射，第一个端口是外部端口，第二个端口是docker端口，访问时用的是外部端口
5. 停止容器
6. 移除容器

## 部署MySQL

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211005130553003.png" alt="image-20211005130553003" style="zoom: 67%;" />

### 问题

- 插入中文数据试试，为什么报错?因为docker上默认字符集编码隐患
- 删除容器后，里面的mysql数据如何办？容器实例一删除，你还有什么？删容器到跑路。。。。。？

### 简单版

1、拉取和查看mysql

```apl
docker pull mysql:5.7
```

```apl
docker images
```

2、启动mysql：注意：第一个ip3308是对外暴露的ip，第二个ip3306是docker内部的mysql的ip，外部要想访问，则需要访问3308端口。同时注意，mysql默认3306端口，直接修改会导致连接不上去

```apl
docker run -p 3308:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7
```

3、启动和进入容器

```apl
docker ps
docker exec -it 容器ID /bin/bash
docker exec -it 662ea6ae16e7  /bin/bash
```

```apl
mysql -uroot -p123456
```

4、创建数据库插入数据

```mysql
create database mydb01;
use mydb01;
CREATE TABLE IF NOT EXISTS author(
	id INT,
	name VARCHAR(20),
	country VARCHAR(20)
);
# 插入表内容
INSERT INTO author VALUES(1,'renshuo','zhonguo');
```

插入中文出现问题

查看字符编码，发现不是utf-8，需要进行修改，这就需要用实用版了

```mysql
show variables like 'character%';
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220208123136189.png" alt="image-20220208123136189" style="zoom: 67%;" />



### 实用版

注意：docker安装完MySQL并run出容器后，建议请先修改完字符集编码后再新建mysql库-表-插数据

1. 搜索mysql镜像

```shell
docker search mysql
```

2. 拉取mysql镜像

```shell
docker pull mysql:5.7
```

3. 创建容器，设置端口映射、目录映射

```shell
docker run -d -p 3309:3306 --privileged=true \
-v /DockerData/mysql/log:/var/log/mysql \
-v /DockerData/mysql/data:/var/lib/mysql \
-v /DockerData/mysql/conf:/etc/mysql/conf.d \
-e MYSQL_ROOT_PASSWORD=123456  \
--name mysql5.7 \
mysql:5.7
```

- 参数说明：
  - **-p 3309:3306**：将容器的 3306 端口映射到宿主机的 3309 端口。
  - **-v $PWD/conf:/etc/mysql/conf.d**：将主机当前目录下的 conf/my.cnf 挂载到容器的 /etc/mysql/my.cnf。配置目录
  - **-v /DockerData/mysql/log**：将主机当前目录下的 logs 目录挂载到容器的 /logs。日志目录
  - **-v /DockerData/mysql/data** ：将主机当前目录下的data目录挂载到容器的 /var/lib/mysql，数据目录
  - **-e MYSQL_ROOT_PASSWORD=123456：**初始化 root 用户的密码。

**改成中文**

```
cd /DockerData/mysql/conf
vim my.cnf
```

编辑my.cnf

```ini
[client]
default_character_set=utf8
[mysqld]
collation_server = utf8_general_ci
character_set_server = utf8
```

重启mysql5.7服务

```
docker restart mysql5.7
```

查看编码(修改成功)

```mysql
show variables like 'character%';
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220208130605973.png" alt="image-20220208130605973" style="zoom:67%;" />

4. 进入容器，操作mysql

```shell
docker exec -it mysql5.7 /bin/bash
mysql -uroot -p123456
```

5. 使用外部机器连接容器中的mysql

输入ifconfig -a，查看本机ip，会出现很多ip，只需看到如下ens33对应第二行的innet 192.168.220.123就是本机ip地址。

注意要关闭linux防火墙：永久关闭防火墙：**systemctl disable firewalld**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211005133221984.png" alt="image-20211005133221984" style="zoom:67%;" />

在外面创建表并添加数据后，可以docker在内部查看。同样，在内部创建也能被外部查看修改。

```mysql
create database mydb01;
use mydb01;
CREATE TABLE IF NOT EXISTS author(
	id INT,
	name VARCHAR(20),
	country VARCHAR(20)
);
# 插入表内容
INSERT INTO author VALUES(1,'renshuo','zhonguo');
INSERT INTO author VALUES(2,'任硕','中国');
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220208130814258.png" alt="image-20220208130814258" style="zoom:67%;" />

假如将当前容器实例删除，再重新来一次，之前建的数据库还有吗？

1、删除当前mysql容器

```apl
docker rm -f 37f8aee444dd
```

2、再次创建启动容器

```apl
docker run -d -p 3309:3306 --privileged=true \
-v /DockerData/mysql/log:/var/log/mysql \
-v /DockerData/mysql/data:/var/lib/mysql \
-v /DockerData/mysql/conf:/etc/mysql/conf.d \
-e MYSQL_ROOT_PASSWORD=123456  \
--name mysql5.7 \
mysql:5.7
```

```apl
docker exec -it mysql5.7 /bin/bash
mysql -uroot -p123456
```

```mysql
-- 进行查询，数据依旧存在
use mydb01;
select * from author;
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220208131425459.png" alt="image-20220208131425459" style="zoom:67%;" />



### MySQL主从复制

#### 主服务器配置

新建主服务器容器实例3307

```apl
docker run -p 3307:3306 --name mysql-master \
-v /mydata/mysql-master/log:/var/log/mysql \
-v /mydata/mysql-master/data:/var/lib/mysql \
-v /mydata/mysql-master/conf:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=root  \
-d mysql:5.7
```

进入/mydata/mysql-master/conf目录下新建my.cnf

```
cd /mydata/mysql-master/conf
vim my.cnf
```

```ini
[mysqld]
## 设置server_id，同一局域网中需要唯一
server_id=101 
## 指定不需要同步的数据库名称
binlog-ignore-db=mysql  
## 开启二进制日志功能
log-bin=mall-mysql-bin  
## 设置二进制日志使用内存大小（事务）
binlog_cache_size=1M  
## 设置使用的二进制日志格式（mixed,statement,row）
binlog_format=row  
## 二进制日志过期清理时间。默认值为0，表示不自动清理。
expire_logs_days=7  
## 跳过主从复制中遇到的所有错误或指定类型的错误，避免slave端复制中断。
## 如：1062错误是指一些主键重复，1032错误是因为主从数据库数据不一致
slave_skip_errors=1062
```

修改完配置后重启master实例

```
docker restart mysql-master
```

master容器实例内创建数据同步用户

```sql
CREATE USER 'slave'@'%' IDENTIFIED BY '123456';
GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'slave'@'%';
```



#### 从服务器配置

新建从服务器容器实例3308

```apl
docker run -p 3308:3306 --name mysql-slave \
-v /mydata/mysql-slave/log:/var/log/mysql \
-v /mydata/mysql-slave/data:/var/lib/mysql \
-v /mydata/mysql-slave/conf:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=root  \
-d mysql:5.7
```

进入/mydata/mysql-slave/conf目录下新建my.cnf

```
cd /mydata/mysql-slave/conf
vim my.cnf
```

```apl
[mysqld]
## 设置server_id，同一局域网中需要唯一
server_id=102
## 指定不需要同步的数据库名称
binlog-ignore-db=mysql  
## 开启二进制日志功能，以备Slave作为其它数据库实例的Master时使用
log-bin=mall-mysql-slave1-bin  
## 设置二进制日志使用内存大小（事务）
binlog_cache_size=1M  
## 设置使用的二进制日志格式（mixed,statement,row）
binlog_format=mixed  
## 二进制日志过期清理时间。默认值为0，表示不自动清理。
expire_logs_days=7  
## 跳过主从复制中遇到的所有错误或指定类型的错误，避免slave端复制中断。
## 如：1062错误是指一些主键重复，1032错误是因为主从数据库数据不一致,all避开所有错误
slave_skip_errors=1062  
## relay_log配置中继日志
relay_log=mall-mysql-relay-bin  
## log_slave_updates表示slave将复制事件写进自己的二进制日志
log_slave_updates=1  
## slave设置为只读（具有super权限的用户除外）
read_only=1
```

修改完配置后重启slave实例

```
docker restart mysql-slave
```

在主数据库中查看主从同步状态

```
show master status;
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220209104052301.png" alt="image-20220209104052301" style="zoom:80%;" />

进入mysql-slave容器

```
docker exec -it mysql-slave /bin/bash
mysql -uroot -proot
```

在从数据库中配置主从复制

```mysql
change master to master_host='192.168.22.145', 
master_user='root', 
master_password='123456', 
master_port=3307, 
master_log_file='mall-mysql-bin.000002', 
master_log_pos=431, 
master_connect_retry=30;
```

主从复制命令参数说明

- master_host：主数据库的IP地址；
- master_port：主数据库的运行端口；
- master_user：在主数据库创建的用于同步数据的用户账号；
- master_password：在主数据库创建的用于同步数据的用户密码；
- master_log_file：指定从数据库要复制数据的日志文件，通过查看主数据的状态，获取File参数；
- master_log_pos：指定从数据库从哪个位置开始复制数据，通过查看主数据的状态，获取Position参数；
- master_connect_retry：连接失败重试的时间间隔，单位为秒。

在从数据库中开启主从同步

```
start slave;
```

查看从数据库状态发现已经同步

```
show slave status \G;
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220209105228510.png" alt="image-20220209105228510" style="zoom:80%;" />



#### 主从复制测试

主机新建库-使用库-新建表-插入数据，ok

```sql
create database mydb01;
use mydb01;
CREATE TABLE IF NOT EXISTS author(
	id INT auto_increment primary key,
	name VARCHAR(20),
	country VARCHAR(20)
);
# 插入表内容
INSERT INTO author VALUES(null,'renshuo','zhonguo');
```

从机使用库-查看记录，ok

```sql
use mydb01;
select * from author;
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220209115009974.png" alt="image-20220209115009974" style="zoom: 80%;" />



## 部署Tomcat

### 实用版

1. 搜索tomcat镜像

```shell
docker search tomcat
```

2. 拉取tomcat镜像

```shell
docker pull tomcat
```

3. 创建容器，设置端口映射、目录映射

```shell
# 在/root目录下创建tomcat目录用于存储tomcat数据信息
mkdir ~/tomcat
cd ~/tomcat
```

```shell
docker run -id --name=c_tomcat \
-p 8089:8080 \
-v $PWD:/usr/local/tomcat/webapps \
tomcat 
```

- 参数说明：

  - **-p 8080:8080：**将容器的8080端口映射到主机的8080端口

    **-v $PWD:/usr/local/tomcat/webapps：**将主机中当前目录挂载到容器的webapps

```
mkdir test
cd test
vim index.html
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211005161757344.png" alt="image-20211005161757344" style="zoom:80%;" />



4. 使用外部机器访问tomcat

访问网址：http://192.168.220.128:8080/test/index.html 因为是在test文件下下创建的index.html，所以访问地址是这个

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211005161702102.png" alt="image-20211005161702102" style="zoom:67%;" />



### 错误处理

启动时访问该网站发现404，不能进入带猫首页

```
http://192.168.220.130:8080/
```

可能出错原因

- 可能没有映射端口或者没有关闭防火墙
- 把webapps.dist目录换成webapps，先成功启动tomcat，查看webapps 文件夹查看为空

解决方式

```
docker ps
docker exec -it 60a86cfe932c bash
cd webapps.dist
mv * /usr/local/tomcat/webapps
```

这样就能访问了，无需重启tomcat

因为新版tomcat把内容设置在了webapps.dist目录里，webapps里面没有东西，自然访问会报404错误

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220208165355119.png" alt="image-20220208165355119" style="zoom:80%;" />



### 简易版

```
docker pull billygoo/tomcat8-jdk8
docker run -d -p 8080:8080 --name mytomcat8 billygoo/tomcat8-jdk8
```

外部进行访问

```
http://192.168.220.130:8080/
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220208161641056.png" alt="image-20220208161641056" style="zoom:67%;" />


## 部署Nginx

1. 搜索nginx镜像

```shell
docker search nginx
```

2. 拉取nginx镜像

```shell
docker pull nginx
```

3. 创建容器，设置端口映射、目录映射


```shell
# 在/root目录下创建nginx目录用于存储nginx数据信息
mkdir ~/nginx
cd ~/nginx
mkdir conf
cd conf
# 在~/nginx/conf/下创建nginx.conf文件,粘贴下面内容
vim nginx.conf
```

```shell
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```

要先cd .. 切换到上一级的nginx目录，才能执行


```shell
docker run -id --name=e_nginx \
-p 80:80 \
-v $PWD/conf/nginx.conf:/etc/nginx/nginx.conf \
-v $PWD/logs:/var/log/nginx \
-v $PWD/html:/usr/share/nginx/html \
nginx
```

- 参数说明：
  - **-p 80:80**：将容器的 80端口映射到宿主机的 80 端口。
  - **-v $PWD/conf/nginx.conf:/etc/nginx/nginx.conf**：将主机当前目录下的 /conf/nginx.conf 挂载到容器的 :/etc/nginx/nginx.conf。配置目录
  - **-v $PWD/logs:/var/log/nginx**：将主机当前目录下的 logs 目录挂载到容器的/var/log/nginx。日志目录

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211005163641819.png" alt="image-20211005163641819" style="zoom:80%;" />

4. 使用外部机器访问nginx

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211005163659672.png" alt="image-20211005163659672" style="zoom:67%;" />



## 部署Redis

### 简单使用

1. 搜索redis镜像

```shell
docker search redis
```

2. 拉取redis镜像

```shell
docker pull redis:6.0.8
```

3. 创建容器，设置端口映射

```shell
docker run -id --name=c_redis -p 6379:6379 redis:6.0.8
```

4. 使用外部机器连接redis

```shell
redis-cli.exe -h 192.168.220.130 -p 6379
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211005164234847.png" alt="image-20211005164234847" style="zoom:80%;" />

内部进入使用

```
docker ps
docker exec -it c_redis bash
redis-cli
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220208145105383.png" alt="image-20220208145105383" style="zoom:80%;" />



### 配置文件启动⭐⭐

在CentOS宿主机下新建目录，并创建配置文件，任意redis配置文件即可，网上可以搜到，粘贴就行。或者直接复制其他redis的配置文件redis.conf

```apl
mkdir -p /DockerData/redis
cd /DockerData/redis
vi redis.conf
```

**redis.conf配置文件修改**

- 开启redis验证， **可选，requirepass 123**
- 允许redis外地连接  **必须注释掉 # bind 127.0.0.1**
- daemonize no  将daemonize yes注释起来或者 daemonize no设置，因为该配置和docker run中-d参数冲突，会导致容器一直启动失败
- 开启redis数据持久化  appendonly yes  可选

使用redis6.0.8镜像创建容器(也叫运行镜像)

命令提醒：容器卷记得加入--privileged=true

```sh
docker run  -p 6379:6379 \
--name myr3 \
--privileged=true \
-v /DockerData/redis/redis.conf:/etc/redis/redis.conf \
-v /DockerData/redis/data:/data \
-d redis:6.0.8 \
redis-server /etc/redis/redis.conf
```

测试redis-cli连接上来

```apl
docker ps
docker exec -it myr3 /bin/bash
redis-cli
set name wangrui
get name
```

### 测试是否使用了配置文件

redis默认有16个数据库，此时我们修改成14个数据库

```apl
vi /DockerData/redis/redis.conf
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220208151950306.png" alt="image-20220208151950306" style="zoom:67%;" />

重启redis容器并进入

```apl
docker restart  b8bda63b7950
docker exec -it myr3 /bin/bash
redis-cli
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220208152808079.png" alt="image-20220208152808079" style="zoom:67%;" />

删除容器，测试之前的数据是否存在

```apl
docker rm -f b8bda63b7950
```

```apl
docker run  -p 6379:6379 \
--name myr3 \
--privileged=true \
-v /DockerData/redis/redis.conf:/etc/redis/redis.conf \
-v /DockerData/redis/data:/data \
-d redis:6.0.8 \
redis-server /etc/redis/redis.conf
```

```apl
docker exec -it myr3 /bin/bash
redis-cli
get name
```

数据依然存在，可以获取到name

## 部署Python

### 新建Python

这里为了演示的方便，我们就写一个简单的`Flask`项目，代码如下

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return "Hello World!"

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000,debug=True)
```

显而易见，就是一个非常基础的项目，当我们在浏览器输入网址以及对应的端口号的时候，会返回“Hello World!”内容

### DockerFile文件

```sh
#设置python环境镜像
FROM python:3.6

# 设置src文件夹是工作目录
WORKDIR /src

# 安装相应的python库
RUN pip install -r requirements.txt

COPY . .

# 执行Python程序（网页程序主程序）
CMD ["python3", "src/app.py"]
```

### 创建镜像

我们进入到项目目录当中，先来查看一下当前的镜像

```sh
docker images
```

然后我们开始创建网页程序的镜像

```sh
docker build -t docker_flask_image .
```

`docker build`命令主要是用于创建镜像，当中的参数`-tag`，`-t` 代表的是镜像的名字及标签

### 运行镜像容器

使用`docker run`命令基于镜像运行一个容器，其中常用的参数有

- `-d` 代表容器在后台运行，不是基于前台运行
- `--name` 代表执行容易的别名
- `-p`：用于配置宿主机与容器的端口映射

```sh
sudo docker run -d --name flask_web -p 5000:5000 docker_flask_image
```

### 测试实践

最后我们在浏览器中，访问一下该网页，要是你用到的是远程服务器，则需要用到公网的IP，对应的端口号是5000

可以看到网页访问成功了，出来一个“Hello World!”的页面，这样我们网页程序就成功部署在了`Docker`当中



# 安装Redis集群

**一个集群只能有16384个槽**，编号0-16383（0-2^14-1）。这些槽会分配给集群中的所有主节点，分配策略没有要求。可以指定哪些编号的槽分配给哪个主节点。集群会记录节点和槽的对应关系。解决了节点和槽的关系后，接下来就需要对key求哈希值，然后对16384取余，余数是几key就落入对应的槽里。slot = CRC16(key) % 16384。以槽为单位移动数据，因为槽的数目是固定的，处理起来比较容易，这样数据移动问题就解决了。

哈希槽计算

Redis 集群中内置了 16384 个哈希槽，**redis 会根据节点数量大致均等的将哈希槽映射到不同的节点**。当需要在 Redis 集群中放置一个 key-value时，redis 先对 key 使用 crc16 算法算出一个结果，然后把结果对 16384 求余数，这样每个 key 都会对应一个编号在 0-16383 之间的哈希槽，也就是映射到某个节点上。如下代码，key之A 、B在Node2， key之C落在Node3上。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220214125244088.png" alt="image-20220214125244088" style="zoom:80%;" />

引入import io.lettuce.core.cluster.SlotHash;

```xml
<dependency>
    <groupId>io.lettuce</groupId>
    <artifactId>lettuce-core</artifactId>
    <version>6.0.1.RELEASE</version>
    <scope>test</scope>
</dependency>
```

```java
@Test
public void testHash() {
   System.out.println(SlotHash.getSlot("A")); //6373
   System.out.println(SlotHash.getSlot("任硕")); //14436
   System.out.println(SlotHash.getSlot("张飞")); //5024
}
```



## 集群配置

### 三主三从

新建6个docker容器redis实例

```apl
docker run -d --name redis-node-1 --net host --privileged=true -v /data/redis/share/redis-node-1:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6381
 
docker run -d --name redis-node-2 --net host --privileged=true -v /data/redis/share/redis-node-2:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6382
 
docker run -d --name redis-node-3 --net host --privileged=true -v /data/redis/share/redis-node-3:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6383
 
docker run -d --name redis-node-4 --net host --privileged=true -v /data/redis/share/redis-node-4:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6384
 
docker run -d --name redis-node-5 --net host --privileged=true -v /data/redis/share/redis-node-5:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6385
 
docker run -d --name redis-node-6 --net host --privileged=true -v /data/redis/share/redis-node-6:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6386
```

启动成功

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220210095647516.png" alt="image-20220210095647516" style="zoom:80%;" />

命令分步解释

- docker run ：创建并运行docker容器实例
- --name redis-node-6 ：容器名字
- --net host ：使用宿主机的IP和端口，默认
- --privileged=true ： 获取宿主机root用户权限
- -v /data/redis/share/redis-node-6:/data：容器卷，宿主机地址:docker内部地址
- redis:6.0.8  ：redis镜像和版本号
- --cluster-enabled yes ：开启redis集群
- --appendonly yes  ：开启持久化
- --port 6386 ：redis端口号

进入容器

```
docker exec -it redis-node-1 /bin/bash
```

构建主从关系(三主三从)

注意，进入docker容器后才能执行一下命令，且注意自己的真实IP地址

```
redis-cli --cluster \
create \
192.168.220.130:6381 \
192.168.220.130:6382 \
192.168.220.130:6383 \
192.168.220.130:6384 \
192.168.220.130:6385 \
192.168.220.130:6386 \
--cluster-replicas 1
```

--cluster-replicas 1 **表示为每个master创建一个slave节点**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220210101417584.png" alt="image-20220210101417584" style="zoom: 67%;" />

一切OK的话，3主3从搞定



### 普通使用

链接进入6381作为切入点，查看集群状态

必须加上-c，表示以集群方式进入，注意看节点之间的切换

```
redis-cli -p 6381 -c
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220210101751207.png" alt="image-20220210101751207" style="zoom: 67%;" />

查看集群状态

```
cluster info
cluster nodes
```

查看集群信息

```
redis-cli --cluster check 192.168.220.130:6381
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220210115112648.png" alt="image-20220210115112648" style="zoom:67%;" />



### 容错切换迁移

主6381和从机切换，先停止主机6381

```
docker stop redis-node-1
```

6381主机停了，对应的真实从机上位，6381作为1号主机分配的从机以实际情况为准，具体是几号机器就是几号

再次查看集群状态，已经有一个从节点变成主节点，就是三主两从

```
docker exec -it redis-node-2 /bin/bash
redis-cli -p 6382 -c
cluster nodes
```

再次重启node1节点，中间需要等待一会儿，docker集群重新响应

```
docker start redis-node-1
docker stop redis-node-5
docker start redis-node-5
```

查看集群状态

```
redis-cli --cluster check 192.168.220.130:6381
```



### 主从扩容案例

新建6387、6388两个节点+新建后启动+查看是否8节点

```apl
docker run -d --name redis-node-7 --net host --privileged=true -v /data/redis/share/redis-node-7:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6387

docker run -d --name redis-node-8 --net host --privileged=true -v /data/redis/share/redis-node-8:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6388
```

查看状态

```
docker ps
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220210115926028.png" alt="image-20220210115926028" style="zoom:67%;" />

进入6387容器实例内部

```
docker exec -it redis-node-7 /bin/bash
```

将新增的6387节点(空槽号)作为master节点加入原集群

将新增的6387作为master节点加入集群0

```
redis-cli --cluster add-node 自己实际IP地址:6387 自己实际IP地址:6381 
redis-cli --cluster add-node 192.168.220.130:6387 192.168.220.130:6381
```

6387 就是将要作为master新增节点
6381 就是原来集群节点里面的领路人，相当于6387拜拜6381的码头从而找到组织加入集群



检查集群情况第1次

```
redis-cli --cluster check 192.168.220.130:6381
```



重新分派槽号

```
命令:redis-cli --cluster reshard IP地址:端口号
redis-cli --cluster reshard 192.168.111.147:6381
```

依次输入4096、6387节点ID、all即可

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220210145737795.png" alt="image-20220210145737795" style="zoom:67%;" />



检查集群情况第2次

```
redis-cli --cluster check 192.168.220.130:6381
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220210150004360.png" alt="image-20220210150004360" style="zoom:67%;" />

为什么6387是3个新的区间，以前的还是连续？
重新分配成本太高，所以前3家各自匀出来一部分，从6381/6382/6383三个旧节点分别匀出1364个坑位给新节点6387



命令：

查看6387编号

```
redis-cli -p 6381 -c
cluster nodes
```

为主节点6387分配从节点6388

```
redis-cli --cluster add-node ip:新slave端口 ip:新master端口 --cluster-slave --cluster-master-id 新主机节点ID

redis-cli --cluster add-node 192.168.220.130:6388 192.168.220.130:6387 --cluster-slave --cluster-master-id f32f4d991f61daae5efbdc24fb438db7e90ba5f6 -------这个是6387的编号，按照自己实际情况
```

检查集群情况第3次

```
redis-cli --cluster check 192.168.220.130:6382
```



### 主从缩容案例

目的：6387和6388下线

#### 删除从节点6388

检查集群情况1获得6388的节点ID

```
redis-cli --cluster check 192.168.220.130:6382
```

将6388删除 从集群中将4号从节点6388删除

```
redis-cli --cluster del-node ip:从机端口 从机6388节点ID
```

```
redis-cli --cluster del-node 192.168.220.130:6388 31120936be8780547f2d5031359275b1c71ad319
```

检查一下还剩几个节点

```
redis-cli --cluster check 192.168.220.130:6382
```

此时还剩7个节点

#### 删除主节点6387

将6387的槽号清空，重新分配，本例将清出来的槽号都给6382

```
redis-cli --cluster reshard 192.168.220.130:6382
```

依次输入4096、6382节点ID、6387节点ID、done即可

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220210153832415.png" alt="image-20220210153832415" style="zoom:67%;" />

node2节点ID是用来接收node7删除后留下来的槽号

node7节点ID是要删除的节点

最后输入yes完事

检查集群情况第二次

```
redis-cli --cluster check 192.168.220.130:6382
 
4096个槽位都指给6382，它变成了8192个槽位，相当于全部都给6382了，不然要输入3次，一锅端
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220210153017964.png" alt="image-20220210153017964" style="zoom:67%;" />

将6387删除

```
命令：redis-cli --cluster del-node ip:端口 6387节点ID
 
redis-cli --cluster del-node 192.168.220.130:6387 f32f4d991f61daae5efbdc24fb438db7e90ba5f6
```

检查集群情况第三次

```
redis-cli --cluster check 192.168.220.130:6381
```

此时只剩6个节点，三主三从，7号节点成功删除



# Dockerfile⭐⭐

## 是什么

构建自定义的镜像时，并不需要一个个文件去拷贝，打包。

我们只需要告诉Docker，我们的镜像的组成，需要哪些BaseImage、需要拷贝什么文件、需要安装什么依赖、启动脚本是什么，将来Docker会帮助我们构建镜像。

而描述上述信息的文件就是Dockerfile文件。

**Dockerfile**就是一个文本文件，其中包含一个个的**指令(Instruction)**，用指令来说明要执行什么操作来构建镜像。每一个指令都会形成一层Layer。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011207491.png" alt="image-20220901120713347" style="zoom:67%;" />



## 基本指令

[Dockerfile reference |Docker 文档](https://docs.docker.com/engine/reference/builder/)

### 指令分析

![img](https://images2017.cnblogs.com/blog/911490/201712/911490-20171208222222062-849020400.png)



### 构建和运行

构建

```
docker build -t 新镜像名字:TAG .
```

运行

```
docker run -it 新镜像名字:TAG 
```

## 案例

### 自定义centos7镜像1

1、创建一个目录用于存放 dockerfile 文件便于统一管理

```
mkdir dockerfile && cd dockerfile
```

2、下载阿里的 Centos repo 文件替换自带源提高下载速度

```
wget -O CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-8.repo
```

3、编写 DockerFile 文件

```
vim custom-centos  
```

4、Dockerfile内容

```
vim custom-centos  
```

```dockerfile
# 使用官方基础镜像
FROM centos   
# 镜像作者信息
MAINTAINER Lamdaer<huangzijian888@gmail.com> 
# 自定义环境变量 MYPATH
ENV MYPATH /usr/local  
# 工作目录
WORKDIR $MYPATH        
# 添加阿里镜像提高下载速度
ADD CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo
# 更新
RUN yum -y update
# 安装 vim
RUN yum -y install vim     
# 安装 net-tools
RUN yum -y install net-tools  
# 暴露 80 端口
EXPOSE 80 
# 输出自定义环境变量
CMD echo $MYPATH     
# 输出 end 
CMD echo "----end----"  
# 默认终端
CMD /bin/bash           
```

5、构建

```dockerfile
docker build -f custom-centos  -t mycentos:0.1 .

# 参数含义
# -f 指定 DockerFile 文件
# -t 指定构建后的镜像名称及版本 格式：镜像名称:版本号
```

6、运行

```dockerfile
docker run -it mycentos:0.1
```



### 自定义centos7镜像2

自定义centos7镜像。要求：

1. 默认登录路径为 /usr

2. 可以使用vim

实现步骤

```apl
#定义父镜像：
FROM centos:7
#定义作者信息：
MAINTAINER  itheima <itheima@itcast.cn>
#执行安装vim命令： 
RUN yum install -y vim
#定义默认的工作目录：
WORKDIR /usr
#定义容器启动执行的命令：
CMD /bin/bash
#构建执行
#通过dockerfile构建镜像：
docker bulid –f dockerfile文件路径 –t 镜像名称:版本
#构建：
docker build -f ./cent_dockerfile -t centos:latest .
#执行：
docker run -it --name=a1 centos:latest
```

可以发现，vim可以使用了，而且定位在了usr目录

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211005181514161.png" alt="image-20211005181514161" style="zoom:67%;" />



### 发布springboot项目

首先：将一个maven/SpringBoot项目进行打包

双击package进行打包

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211005182215049.png" alt="image-20211005182215049" style="zoom:67%;" />

在输出位置查看打包完成的jar包

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211005182241476.png" alt="image-20211005182241476" style="zoom: 80%;" />

运行打包后的SpringBoot项目

```
java -jar .\springboot-hello-0.0.1-SNAPSHOT.jar
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211005181955565.png" alt="image-20211005181955565" style="zoom:67%;" />

运行成功后：访问地址生效

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211005182038704.png" alt="image-20211005182038704" style="zoom:67%;" />

将文件从win10传到linux

创建文件夹，将Dockerfile和demo-1.0jar都放在一个文件夹里

```apl
mkdir dockerfileTest
mv demo-1.0.jar /dockerfileTest
cd /dockerfileTest
vim Dockerfile
```

Dockerfile实现步骤

```apl
FROM java:8
MAINTAINER  itheima <itheima@itcast.cn>
ADD springboot-hello-0.0.1-SNAPSHOT.jar  app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
```

通过dockerfile构建镜像：docker bulid –f dockerfile文件路径 –t 镜像名称:版本

构建

```apl
docker build -t myspro:1.0 .
```

运行

```apl
docker run -d -p 9001:8080 myspro:1.0
```

注意：执行完之后，要用docker ps -a，查看有没有端口映射成功。看PORTS

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211005203300921.png" alt="image-20211005203300921" style="zoom:80%;" />

访问

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211005203054070.png" alt="image-20211005203054070" style="zoom:67%;" />

# Docker网络

## 是什么

docker不启动，默认网络情况

- ens33
- Io
- virbr0

docker启动后，网络情况：会产生一个名为docker0的虚拟网桥

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220210160614517.png" alt="image-20220210160614517" style="zoom:67%;" />

查看docker网络模式命令

默认创建3大网络模式

```
docker network ls
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220210160731025.png" alt="image-20220210160731025" style="zoom:67%;" />

## 常用基本命令

```
docker network --help
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220210163411130.png" alt="image-20220210163411130" style="zoom:67%;" />

#### 创建网络

```
docker network create 网络名称
```



#### 查看网络

```
docker network ls
```

#### 查看网络源数据

```
docker network inspect XXX网络名字
docker network inspect host
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220210163736999.png" alt="image-20220210163736999" style="zoom: 50%;" />

#### 删除网络

```
docker network rm XXX网络名字
```

示例

```
docker network create aa_network
docker network ls
docker network rm aa_network
docker network ls
```



### 能干嘛

- 容器间的互联和通信以及端口映射
- 容器IP变动时候可以通过服务名直接网络通信而不受到影响



## 网络模式

### 总体介绍

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220210174409094.png" alt="image-20220210174409094" style="zoom: 67%;" />

- bridge模式：使用--network  bridge指定，默认使用docker0
- host模式：使用--network host指定
- none模式：使用--network none指定
- container模式：使用--network container:NAME或者容器ID指定



### 演示示例

结论：docker容器内部的ip是有可能会发生改变的

1 先启动两个ubuntu容器实例

```
docker run -it --name u1 ubuntu bash
docker run -it --name u2 ubuntu bash
```

```
docker ps
```

2 docker inspect 容器ID or 容器名字

```
docker inspect u1 | tail -n 20
docker inspect u2 | tail -n 20
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220210181643001.png" alt="image-20220210181643001" style="zoom: 50%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220210181739851.png" alt="image-20220210181739851" style="zoom:50%;" />

3  关闭u2实例，新建u3，查看ip变化

```
docker run -it --name u3 ubuntu bash
docker inspect u3 | tail -n 20
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220210182334782.png" alt="image-20220210182334782" style="zoom: 50%;" />

docker容器内部的ip是有可能会发生改变的



#### bridge

##### 是什么

Docker 服务默认会创建一个 docker0 网桥（其上有一个 docker0 内部接口），该桥接网络的名称为docker0，它在内核层连通了其他的物理或虚拟网卡，这**就将所有容器和本地主机都放到同一个物理网络**。Docker 默认指定了 docker0 接口 的 IP 地址和子网掩码，**让主机和容器之间可以通过网桥相互通信**。

```
# 查看 bridge 网络的详细信息，并通过 grep 获取名称项
docker network inspect bridge | grep name
```

```
ifconfig | grep docker
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220212100619947.png" alt="image-20220212100619947" style="zoom:67%;" />

相当于Vmware中的 nat 模式，容器使用独立`network Namespace`，并连接到docker0虚拟网卡。通过docker0网桥以及`iptables nat`表配置与宿主机通信，此模式会为每一个容器分配`Network Namespace`、设置IP等，并将一个主机上的 Docker 容器连接到一个虚拟网桥上。

当Docker进程启动时，会在主机上创建一个名为docker0的虚拟网桥，此主机上启动的Docker容器会连接到这个虚拟网桥上。虚拟网桥的工作方式和物理交换机类似，这样主机上的所有容器就通过交换机连在了一个二层网络中。

从docker0子网中分配一个IP给容器使用，并设置docker0的IP地址为容器的默认网关。在主机上创建一对虚拟网卡`veth pair`设备。veth设备总是成对出现的，它们组成了一个数据的通道，数据从一个设备进入，就会从另一个设备出来。因此，veth设备常用来连接两个网络设备。

Docker将`veth pair` 设备的一端放在新创建的容器中，并命名为eth0（容器的网卡），另一端放在主机中， 以`veth*`这样类似的名字命名，并将这个网络设备加入到docker0网桥中。可以通过 `brctl show` 命令查看。

容器之间通过`veth pair`进行访问

使用 `docker run -p` 时，docker实际是在iptables做了DNAT规则，实现端口转发功能。

可以使用`iptables -t nat -vnL` 查看。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202210291857905.png" alt="image-20221029185722793" style="zoom:67%;" />

##### 说明

Docker使用Linux桥接，在宿主机虚拟一个Docker容器网桥(docker0)，Docker启动一个容器时会根据Docker网桥的网段分配给容器一个IP地址，称为Container-IP，同时Docker网桥是每个容器的默认网关。因为在同一宿主机内的容器都接入同一个网桥，这样容器之间就能够通过容器的Container-IP直接通信。

docker run 的时候，没有指定network的话默认使用的网桥模式就是bridge，使用的就是docker0。在宿主机ifconfig,就可以看到docker0和自己create的network(后面讲)eth0，eth1，eth2……代表网卡一，网卡二，网卡三……，lo代表127.0.0.1，即localhost，inet addr用来表示网卡的IP地址

网桥docker0创建一对对等虚拟设备接口一个叫veth，另一个叫eth0，成对匹配。
整个宿主机的网桥模式都是docker0，类似一个交换机有一堆接口，每个接口叫veth，在本地主机和容器内分别创建一个虚拟接口，并让他们彼此联通（这样一对接口叫veth pair）；

每个容器实例内部也有一块网卡，每个接口叫eth0；docker0上面的每个veth匹配某个容器实例内部的eth0，两两配对，一一匹配。通过上述，将宿主机上的所有容器都连接到这个内部网络上，两个容器在同一个网络下,会从这个网关下各自拿到分配的ip，此时两个容器的网络是互通的。



#### host

##### 说明

**直接使用宿主机的 IP 地址与外界进行通信**，不再需要额外进行NAT 转换

容器将**不会获得一个独立的Network Namespace**， 而是和宿主机共用一个Network Namespace。**容器将不会虚拟出自己的网卡而是使用宿主机的IP和端口**。

##### 代码示例

警告

```
docker run -d -p 8083:8080 --network host --name tomcat83 billygoo/tomcat8-jdk8
```

问题：启动命令时总是遇见标题中的警告

原因：Docker启动时指定--network=host或-net=host，如果还指定了-p映射端口，那这个时候就会有此警告，
**并且通过-p设置的参数将不会起到任何作用**，端口号会以主机端口号为主，重复时则递增。
解决:解决的办法就是使用docker的其他网络模式，例如--network=bridge，这样就可以解决问题，或者直接无视。。。。O(∩_∩)O哈哈~



正确

不加端口号

```apl
docker run -d  --network host --name tomcat83 billygoo/tomcat8-jdk8
```

```apl
docker inspect tomcat83 | tail -n 20
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220214215912777.png" alt="image-20220214215912777" style="zoom: 67%;" />

没有设置-p的端口映射了，如何访问启动的tomcat83？？

```
http://192.168.220.130:8080/
```

在CentOS里面用默认的火狐浏览器访问容器内的tomcat83看到访问成功，因为**此时容器的IP借用主机**的，
**所以容器共享宿主机网络IP，这样的好处是外部主机与容器可以直接通信**。



#### none

禁用网络功能，只有lo标识(就是127.0.0.1表示本地回环)

```apl
docker run -d -p 8084:8080 --network none --name tomcat84 billygoo/tomcat8-jdk8
```

外部网络无法访问，内部网络也无法访问

none模式:使用 `--net=none`指定

使用none 模式，docker 容器有自己的`network Namespace` ，但是并不为Docker 容器进行任何网络配置。也就是说，这个Docker 容器没有网卡，ip， 路由等信息。这种网络模式下，容器只有lo 回环网络，没有其他网卡。这种类型没有办法联网，但是封闭的网络能很好的保证容器的安全性。该容器将完全独立于网络，用户可以根据需要为容器添加网卡。此模式拥有所有端口。（none网络模式配置网络）特殊情况下才会用到，一般不用

#### container

##### 是什么

新建的容器和已经存在的一个容器共享一个网络ip配置而不是和宿主机共享。新创建的容器不会创建自己的网卡，配置自己的IP，而是和一个指定的容器共享IP、端口范围等。同样，两个容器除了网络方面，其他的如文件系统、进程列表等还是隔离的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220212102750565.png" alt="image-20220212102750565" style="zoom:67%;" />

container模式：使用`–net=contatiner:NAME_or_ID `指定

这个模式指定新创建的容器和已经存在的一个容器共享一个`Network Namespace`，而不是和宿主机共享。**新创建的容器不会创建自己的网卡，配置自己的IP，而是和一个指定的容器共享IP，端口范围等。** 可以在一定程度上节省网络资源，容器内部依然不会拥有所有端口。

同样，两个容器除了网络方面，其他的如文件系统，进程列表等还是隔离的。

两个容器的进程可以通过lo网卡设备通信

#### 自定义网络

##### 不使用自定义网络出现的问题

```
docker run -d -p 8081:8080   --name tomcat81 billygoo/tomcat8-jdk8
docker run -d -p 8082:8080   --name tomcat82 billygoo/tomcat8-jdk8
```

```
docker exec -it tomcat81 bash
ip addr
ping 172.17.0.2
```

```
docker exec -it tomcat82 bash
ip addr
ping 172.17.0.3
```

问题：ping服务名ping不通，比如ping tomcat81会报错，不认识该服务名



##### 使用自定义网络

自定义桥接网络,**自定义网络默认使用的是桥接网络bridge**

```
docker network create zzyy_network
```

```
docker run -d -p 8081:8080 --network zzyy_network  --name tomcat81 billygoo/tomcat8-jdk8
docker run -d -p 8082:8080 --network zzyy_network  --name tomcat82 billygoo/tomcat8-jdk8
```

可以ping通服务名

```
docker exec -it tomcat82 bash
ping tomcat81
```

```
docker exec -it tomcat81 bash
ping tomcat82
```

结论：自定义网络本身就维护好了主机名和ip的对应关系（ip和域名都能通）



# Docker Compose⭐

Compose 是 Docker 公司推出的一个工具软件，可以管理多个 Docker 容器组成一个应用。你需要定义一个 YAML 格式的配置文件docker-compose.yml，写好多个容器之间的调用关系。然后，只要一个命令，就能同时启动/关闭这些容器

> Docker Compose可以基于Compose文件帮我们快速的部署分布式应用，而无需手动一个个创建和运行容器！

DockerCompose的详细语法参考官网：https://docs.docker.com/compose/compose-file/

其实DockerCompose文件可以看做是将多个docker run命令写到一个文件，只是语法稍有差异。

## 常用命令

- docker-compose -h           # 查看帮助
- docker-compose up          # 启动所有docker-compose服务
- docker-compose up -d      # 启动所有docker-compose服务并后台运行
- docker-compose down     # 停止并删除容器、网络、卷、镜像。
- docker-compose exec  yml里面的服务id     # 进入容器实例内部  docker-compose exec docker-compose.yml文件中写的服务id /bin/bash
- docker-compose ps                      # 展示当前docker-compose编排过的运行的所有容器
- docker-compose top                     # 展示当前docker-compose编排过的容器进程
- docker-compose logs  yml里面的服务id     # 查看容器输出日志
- dokcer-compose config     # 检查配置
- docker-compose config -q  # 检查配置，有问题才有输出
- docker-compose restart   # 重启服务
- docker-compose start     # 启动服务
- docker-compose stop      # 停止服务

注意：使用这些命令时需要在docker-compose.yml所在文件夹，不然不能生效，因为找不到文件

## 改造SpringBoot工程

SpringBoot项目使用了mysql和redis，在SpringBoot笔记中记录了详细内容

### 不用compose

#### mysql配置

```apl
docker run -d -p 3307:3306 --privileged=true \
-v /DockerData/mysql/log:/var/log/mysql \
-v /DockerData/mysql/data:/var/lib/mysql \
-v /DockerData/mysql/conf:/etc/mysql/conf.d \
-e MYSQL_ROOT_PASSWORD=123456  \
--name mysql5.7 \
mysql:5.7
```

至于修改中文编码情况见前面的部署MySQL部分

进入数据库，插入数据

```apl
docker exec -it mysql5.7 /bin/bash
mysql -uroot -p123456
```

建议使用远程连接方式创建表和插入数据，因为linux不能输入中文

```mysql
CREATE TABLE `admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

INSERT INTO `admin` VALUES (4, '张三', '4321');
INSERT INTO `admin` VALUES (5, '李四', '21321');
INSERT INTO `admin` VALUES (6, '曹操', '123124');
INSERT INTO `admin` VALUES (7, '刘备', '12132');
INSERT INTO `admin` VALUES (8, '曹猛地', '123124');
```

#### redis配置

```apl
docker run  -p 6379:6379 \
--name myr3 \
--privileged=true \
-v /DockerData/redis/redis.conf:/etc/redis/redis.conf \
-v /DockerData/redis/data:/data \
-d redis:6.0.8 \
redis-server /etc/redis/redis.conf
```

```apl
docker exec -it myr3 /bin/bash
redis-cli
keys *
get user:4
```

为避免出错，需要在redis.conf中配置，**因为远程连接要是设置保护模式就会出错**

方法一：**把protected-mode yes修改成protected-mode no，然后重启服务器即可**

方法二：设置bind的地址和Redis密码。这种方式是在正式、联网环境可以安全使用的方法。（requirepass 的密码建议要复杂一些，否则不安全，我这里是内网环境所以用的比较简单）

```apl
bind 192.168.220.130
requirepass 123456
```

在win10CMD中进行查询

```apl
redis-cli -h 192.168.220.130 -p 6379
```



#### 微服务工程将打包好的jar包上传后，编写Dockerfile

创建文件夹，将Dockerfile和demo-1.0jar都放在一个文件夹里

```
mkdir dockerfileTest
mv demo-1.0.jar /dockerfileTest
cd /dockerfileTest
vim Dockerfile
```

Dockerfile实现步骤

```dockerfile
FROM java:8
MAINTAINER  itheima <itheima@itcast.cn>
ADD springboot-hello-0.0.1-SNAPSHOT.jar  app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
```

通过dockerfile构建镜像：docker bulid –f dockerfile文件路径 –t 镜像名称:版本

构建

```
docker build -t myspro:1.0 .
```

运行

```
docker run -d -p 9001:8080 myspro:1.0
```

注意：执行完之后，要用docker ps -a，查看有没有端口映射成功。看PORTS

上面三个容器实例依次顺序启动成功

进入访问

```
http://192.168.220.130:9001/swagger-ui.html#/
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220212150940971.png" alt="image-20220212150940971" style="zoom:67%;" />

依次测试方法，应该都能成功

上面成功了，有哪些问题?

- 先后顺序要求固定，先mysql+redis才能微服务访问成功
- 多个run命令......
- 容器间的启停或宕机，有可能导致IP地址对应的容器实例变化，映射出错，要么生产IP写死(可以但是不推荐)，要么通过服务调用



#### 使用compose

docker-compose.yml

编写docker-compose.yml文件，注意内容要填写正确，container_name是自己定义的

```yml
version: "3"
 
services:
  microService:
    image: myspro:1.0
    container_name: ms01
    ports:
      - "9001:8080"
    volumes:
      - /app/microService:/data
    networks: 
      - atguigu_net 
    depends_on: 
      - redis
      - mysql
 
  redis:
    image: redis:6.0.8
    ports:
      - "6379:6379"
    volumes:
      - /DockerData/redis/redis.conf:/etc/redis/redis.conf
      - /DockerData/redis/data:/data
    networks: 
      - atguigu_net
    command: redis-server /etc/redis/redis.conf
 
  mysql:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: '123456'
      MYSQL_ALLOW_EMPTY_PASSWORD: 'no'
      MYSQL_DATABASE: 'girls'
      MYSQL_USER: 'root'
      MYSQL_PASSWORD: '123456'
    ports:
       - "3307:3306"
    volumes:
       - /DockerData/mysql/log:/var/log/mysql 
       - /DockerData/mysql/data:/var/lib/mysql
       - /DockerData/mysql/conf:/etc/mysql/conf.d
    networks:
      - atguigu_net
    command: --default-authentication-plugin=mysql_native_password #解决外部无法访问
 
networks: 
   atguigu_net: 
```

注意：笔记上说要将application.yml的mysql和redis的host连接的ip地址分别换成mysql和redis，然而验证换了之后无法访问，**还是不用换，保持原样即可**



执行

```
检查配置，有问题才有输出
dokcer-compose config -q  
然后执行 docker-compose up
或者
执行 docker-compose up -d
```

关停

```
docker-compose stop
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220212163513537.png" alt="image-20220212163513537" style="zoom:80%;" />



## nginx+springboot项目

最好创建在个人目录，这样容易修改

1. 创建docker-compose目录

```shell
mkdir /docker-compose
cd /docker-compose
```

2. 编写 docker-compose.yml 文件

```shell
version: '3'
services:
  nginx:
   image: nginx
   ports:
    - 80:80
   links:
    - app
   volumes:
    - ./nginx/conf.d:/etc/nginx/conf.d
  app:
    image: app
    expose:
      - "8080"
```

创建./nginx/conf.d目录

```shell
mkdir -p ./nginx/conf.d
cd ./nginx/conf.d
```

在./nginx/conf.d目录下 编写itheima.conf文件

注意： http://app:8080;这里的app对应的是links的app

```shell
server {
    listen 80;
    access_log off;

    location / {
        proxy_pass http://app:8080;
    }
   
}
```

在~/docker-compose 目录下 使用docker-compose 启动容器

```shell
docker-compose up
```

运行成功页面

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211005210851644.png" alt="image-20211005210851644" style="zoom:80%;" />

测试访问

```shell
http://192.168.220.128/hello
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211005210759990.png" alt="image-20211005210759990" style="zoom:67%;" />

```
docker run -d -p 3307:3306 --privileged=true \
-v /DockerData/mysql/log:/var/log/mysql \
-v /DockerData/mysql/data:/var/lib/mysql \
-v /DockerData/mysql/conf:/etc/mysql/conf.d \
-e MYSQL_ROOT_PASSWORD=123456  \
--name mysql5.7 \
mysql:5.7
```

## 部署微服务⭐

查看课前资料提供的cloud-demo文件夹，里面已经编写好了docker-compose文件，而且每个微服务都准备了一个独立的目录：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011217374.png" alt="image-20210731181341330" style="zoom:67%;" />

内容如下：

```yaml
version: "3.2"

services:
  nacos:
    image: nacos/nacos-server
    environment:
      MODE: standalone
    ports:
      - "8848:8848"
  mysql:
    image: mysql:5.7.25
    environment:
      MYSQL_ROOT_PASSWORD: 123
    volumes:
      - "$PWD/mysql/data:/var/lib/mysql"
      - "$PWD/mysql/conf:/etc/mysql/conf.d/"
  userservice:
    build: ./user-service
  orderservice:
    build: ./order-service
  gateway:
    build: ./gateway
    ports:
      - "10010:10010"
```

可以看到，其中包含5个service服务：

`nacos`：作为注册中心和配置中心

- `image: nacos/nacos-server`： 基于nacos/nacos-server镜像构建
- `environment`：环境变量
  - `MODE: standalone`：单点模式启动
  - `ports`：端口映射，这里暴露了8848端口

`mysql`：数据库

- `image: mysql:5.7.25`：镜像版本是mysql:5.7.25
- `environment`：环境变量
  - `MYSQL_ROOT_PASSWORD: 123`：设置数据库root账户的密码为123
- `volumes`：数据卷挂载，这里挂载了mysql的data、conf目录，其中有我提前准备好的数据

`userservice`、`orderservice`、`gateway`：都是基于Dockerfile临时构建的

查看mysql目录，可以看到其中已经准备好了cloud_order、cloud_user表：

![image-20210801095205034](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011217379.png)

查看微服务目录，可以看到都包含Dockerfile文件：

![image-20210801095320586](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011217382.png)内容如下：

```dockerfile
FROM java:8-alpine
COPY ./app.jar /tmp/app.jar
ENTRYPOINT java -jar /tmp/app.jar
```

修改微服务配置

因为微服务将来要部署为docker容器，而容器之间互联不是通过IP地址，而是通过容器名。这里我们将order-service、user-service、gateway服务的mysql、nacos地址都修改为基于容器名的访问。

如下所示：

```yaml
spring:
  datasource:
    # 这里直接改成服务名mysql，而不是localhost
    url: jdbc:mysql://mysql:3306/cloud_order?useSSL=false
    username: root
    password: 123
    driver-class-name: com.mysql.jdbc.Driver
  application:
    name: orderservice
  cloud:
    nacos:
      # 这里也直接改成服务名nacos，而不是localhost
      server-addr: nacos:8848 # nacos服务地址
```

### 打包

接下来需要将我们的每个微服务都打包。因为之前查看到Dockerfile中的jar包名称都是app.jar，因此我们的每个微服务都需要用这个名称。

可以通过修改pom.xml中的打包名称来实现，每个微服务都需要修改：

```xml
<build>
  <!-- 服务打包的最终名称 -->
  <finalName>app</finalName>
  <plugins>
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
    </plugin>
  </plugins>
</build>
```

打包后：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011222533.png" alt="image-20210801095951030" style="zoom:50%;" />

### 拷贝jar包到部署目录

编译打包好的app.jar文件，需要放到Dockerfile的同级目录中。注意：每个微服务的app.jar放到与服务名称对应的目录，别搞错了。

user-service：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011222536.png" alt="image-20210801100201253" style="zoom:50%;" />

order-service：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011222536.png" alt="image-20210801100231495" style="zoom:50%;" />

gateway：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011222537.png" alt="image-20210801100308102" style="zoom:50%;" />

### 部署

最后，我们需要将文件整个cloud-demo文件夹上传到虚拟机中，理由DockerCompose部署。

上传到任意目录：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011222543.png" alt="image-20210801100955653" style="zoom:50%;" />

部署：

进入cloud-demo目录，然后运行下面的命令：

```sh
docker-compose up -d
```



# 私有仓库

> Docker官方的Docker hub（https://hub.docker.com）是一个用于管理公共镜像的仓库，我们可以从上面拉取镜像 到本地，也可以把我们自己的镜像推送上去。但是，有时候我们的服务器无法访问互联网，或者你不希望将自己的镜 像放到公网当中，就需要搭建私有仓库来存储和管理自己的镜像
>

## 简化版镜像仓库

> Docker官方的Docker Registry是一个基础版本的Docker镜像仓库，具备仓库管理的完整功能，但是没有图形化界面。搭建方式比较简单，命令如下：
>

```sh
docker run -d \
    --restart=always \
    --name registry	\
    -p 5000:5000 \
    -v registry-data:/var/lib/registry \
    registry
```

> 命令中挂载了一个数据卷registry-data到容器内的/var/lib/registry 目录，这是私有镜像库存放数据的目录。访问http://YourIp:5000/v2/_catalog 可以查看当前私有镜像服务中包含的镜像
>

## 带有图形化界面版本⭐

使用DockerCompose部署带有图象界面的DockerRegistry，命令如下：

5000是内部端口，我无法访问，所以访问暴露的8080端口即可

```yaml
version: '3.0'
services:
  registry:
    image: registry
    volumes:
      - ./registry-data:/var/lib/registry
  ui:
    image: joxit/docker-registry-ui:static
    ports:
      - 8080:80
    environment:
      - REGISTRY_TITLE=我的私有仓库
      - REGISTRY_URL=http://registry:5000
    depends_on:
      - registry
```

```apl
docker-compose up -d
```

访问：http://101.43.33.227:8080/

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011249843.png" alt="image-20220901124950696" style="zoom:67%;" />

```apl
# 查看日志
docker-compose logs -f
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011251517.png" alt="image-20220901125108237" style="zoom:80%;" />

## 配置Docker信任地址

我们的私服采用的是http协议，默认不被Docker信任，所以需要做一个配置：

```sh
# 打开要修改的文件
vi /etc/docker/daemon.json
# 添加内容：
{
  "registry-mirrors": ["https://hi7nmgjd.mirror.aliyuncs.com"],
  "insecure-registries":["10.0.16.16:8080"]
}
# 重加载
systemctl daemon-reload
# 重启docker
systemctl restart docker
```

## 将镜像上传至私有仓库

```sh
# 1、标记镜像为私有仓库的镜像     
docker tag centos:7 私有仓库服务器IP:5000/centos:7
docker tag nginx:latest 10.0.16.16:8080/nginx:1.0
# 2、上传标记的镜像     
docker push 私有仓库服务器IP:5000/centos:7
docker push 10.0.16.16:8080/nginx:1.0
```

查看镜像是否上传成功

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011255422.png" alt="image-20220901125506243" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011255993.png" alt="image-20220901125518840" style="zoom:50%;" />

## 从私有仓库拉取镜像 

```shell
# 删除镜像
docker rmi 10.0.16.16:8080/nginx:1.0
# 拉取镜像 
docker pull 私有仓库服务器ip:5000/centos:7
docker pull 10.0.16.16:8080/nginx:1.0
# 运行
docker run -it 镜像ID /bin/bash
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011257666.png" alt="image-20220901125724523" style="zoom:80%;" />



# 可视化工具

## Portainer轻量级

是一款轻量级的应用，它提供了图形化界面，用于方便地管理Docker环境，包括单机环境和集群环境。

Portainer 是一个轻量级的 WEB 管理 UI ，可让你轻松管理运行在 Docker、Swarm、Kubernetes 环境下的容器。Portainer 提供状态显示面板、应用模板快速部署、容器镜像网络数据卷的基本操作（包括上传下载镜像，创建容器等操作）、事件日志显示、容器控制台操作、Swarm 集群和服务等集中管理和操作、登录用户管理和控制等功能。功能十分全面，基本能满足中小型单位对容器管理的全部需求。全面支持 Linux、Mac OS、Windows 主流操作系统。

- https://www.portainer.io/
- https://docs.portainer.io/v/ce-2.9/start/install/server/docker/linux

目前使用它来监控管理 Docker 容器，感觉它还是很强大的，非常好用。不足之处就是远程终端非常慢，不方便有时候远程进入容器内部进行操作。不过这不是拒绝它的理由，大部分日常都可以通过它很好的解决。

官方提供了**Portainer 演示项目**（账密：*admin* / *tryportainer*），如果有兴趣可以亲自感受一下。

> http://demo.portainer.io/

### 启动

```apl
docker run -d -p 8000:8000 -p 9000:9000 \
--name portainer  \
--restart=always  \
-v /var/run/docker.sock:/var/run/docker.sock  \
-v portainer_data:/data     \
portainer/portainer
```

### 创建用户

第一次登录要创建用户，用户名admin，密码自己设置8位：315217ren

对应选择local、要是远程就选择remote

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220213110521328.png" alt="image-20220213110521328" style="zoom: 80%;" />

点击进入，可以看到如下页面，对应docker命令

```
docker system df 
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220213110655888.png" alt="image-20220213110655888" style="zoom:67%;" />

侧边栏可以点击选择进入

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220213111746091.png" alt="image-20220213111746091" style="zoom: 50%;" />

### 进入容器

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220213112246768.png" alt="image-20220213112246768" style="zoom:67%;" />

### 创建容器

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220213114130955.png" alt="image-20220213114130955" style="zoom: 67%;" />

创建完成即可

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220213115339928.png" alt="image-20220213115339928" style="zoom:67%;" />

## DockStation

DockStation 是另一款 Docker 管理图形化界面，它比 Portainer 好的地方在于在多项目管理上非常清晰。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/zuF5sJGRDCvX6pokXVdicmFUuu8Xq1ib1V6ODo1EZ1SQQsm76H4eKia5aNt5jZMI89mqgzreh5OPc4hZ4FJ2xiaq0A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

尤其能够图形化展示容器之间的依赖关系，尤其擅长管理 Docker-Compose，额外的它还支持监控统计、端口监视。而且 UI 设计的非常漂亮、非常清新，如果你希望对容器进行层次分明的管理的话不妨试一试它，它也支持 Linux、Mac OS、Windows 主流操作系统。最大的问题在于维护并不是特别活跃，不过不影响日常使用。

## Docker Dashboard

这是 Docker 官方的 Docker Desktop 提供的功能，亲儿子级别，功能比较单一，只提供了容器镜像的简单管理，容器的简单监控统计。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212100953045.png" alt="image-20221210095304887" style="zoom:80%;" />

优点就是官方提供，缺点就是功能比较简单，只能管理本地的容器和镜像，另外目前只支持 Mac OS 和 Windows。也就是说只符合日常开发用用。



## 重量级

通过docker stats命令可以很方便的看到当前宿主机上所有容器的CPU,内存以及网络流量等数据，一般小公司够用了。但是，**docker stats统计结果只能是当前宿主机的全部容器，数据资料是实时的，没有地方存储、没有健康指标过线预警等功能**。

### 容器监控三剑客

简述：CAdvisor监控收集+InfluxDB存储数据+Granfana展示图表

#### CAdvisor

它是一个容器资源监控工具，包括容器的内存、CPU、网络IO、磁盘IO等监控，同时提供了一个WEB页面用来查看容器的实时运行状态。它的默认存储2分钟的数据，而且只是针对单物理机。不过它提供了很多数据集成接口，支持InfluxDB、Redis、Kafka、Elasticsearch等集成，可以加上对应配置将监控数据发往这些数据库存储起来。

主要功能有两点

- 展示host和容器两个层次的容器数据
- 展示历史变化数据

#### InfluxDB

InfluxDB是用Go语言编写的一个开源分布式时序、事件和指标数据库、无需外部依赖。CAdvisor默认只在本机保存最近两分钟的数据，为了持久化存储数据和统一收集展示监控数据，需要将数据存储到InfluxDB中。

InfluxDB是一个时序数据库，专门用于存储时序相关数据，很适合存储CAdvisor的数据。而且，CAdvisor本身已经提供了InfluxDB的集成方法，启动容器时指定配置即可。

主要功能有三点

- 基于时间序列，支持与时间有关的相关函数(如最大、最小、求和等)
- 可度量性，可以实时对大量数据进行计算
- 基于事件：它支持任意的事件数据



#### Granfana

它是一个开源数据监控分析可视化平台，支持多种数据源配置(支持的数据源包括InfluxDB、MySQL、ES、OpenTSDB、Graphite等)和丰富的插件及模板功能，支持图表权限控制和报警

主要特性

- 灵魂丰富的图形化选项
- 可以支持多种风格
- 支持白天和夜间模式
- 多个数据源



### 使用

```apl
mkdir -p /mydocker/cig
cd  /mydocker/cig
vim docker-compose.yml
```

```yml
version: '3.1'
 
volumes:
  grafana_data: {}
 
services:
 influxdb:
  image: tutum/influxdb:0.9
  restart: always
  environment:
    - PRE_CREATE_DB=cadvisor
  ports:
    - "8083:8083"
    - "8086:8086"
  volumes:
    - ./data/influxdb:/data
 
 cadvisor:
  image: google/cadvisor
  links:
    - influxdb:influxsrv
  command: -storage_driver=influxdb -storage_driver_db=cadvisor -storage_driver_host=influxsrv:8086
  restart: always
  ports:
    - "8080:8080"
  volumes:
    - /:/rootfs:ro
    - /var/run:/var/run:rw
    - /sys:/sys:ro
    - /var/lib/docker/:/var/lib/docker:ro
 
 grafana:
  user: "104"
  image: grafana/grafana
  user: "104"
  restart: always
  links:
    - influxdb:influxsrv
  ports:
    - "3000:3000"
  volumes:
    - grafana_data:/var/lib/grafana
  environment:
    - HTTP_USER=admin
    - HTTP_PASS=admin
    - INFLUXDB_HOST=influxsrv
    - INFLUXDB_PORT=8086
    - INFLUXDB_NAME=cadvisor
    - INFLUXDB_USER=root
    - INFLUXDB_PASS=root
```

启动：docker-compose up

三个服务全都启动完毕

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220213154518119.png" alt="image-20220213154518119" style="zoom:80%;" />

1、浏览cAdvisor收集服务，http://192.168.220.130:8080/

​       第一次访问慢，请稍等

​       cadvisor也有基础的图形展现功能，这里主要用它来作数据采集

2、浏览influxdb存储服务，http://192.168.220.130:8083/

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220213122026938.png" alt="image-20220213122026938" style="zoom:80%;" />



3、浏览grafana展现服务，http://192.168.220.130:3000

​      ip+3000端口的方式访问,默认帐户密码（admin/admin）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220213123544095.png" alt="image-20220213123544095" style="zoom: 67%;" />

![image-20220213124451763](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220213124451763.png)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220213123748784.png" alt="image-20220213123748784" style="zoom:67%;" />



#### 配置面板panel

<
重点部分


到这里cAdvisor+InfluxDB+Grafana容器监控系统就部署完成了





# Docker Desktop

> 接下来开始本地实践了，用 Docker 快速搭一套本地环境。有一些 Docker 的可视化客户端可以安装，帮我们更方便更直观的管理镜像、容器，当然如果你很厉害的话，完全用命令行也不是不行。

## 下载安装

> 访问 Docker Desktop 官网 https://www.docker.com/products/docker-desktop/，下载对应的版本。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.11.17/image-20230726210412585.png" alt="image-20230726210412585" style="zoom:80%;" />

> 下载完一键安装就可以了，Docker 环境直接帮你装好了，省心省事儿。下面是它的控制台界面。左侧导航可以查看镜像列表、容器列表、映射的Volumes。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.11.17/image-20230726210432856.png" alt="image-20230726210432856" style="zoom:80%;" />

> 我们在命令行输入 `docker -v`，如果出现正确的版本号，说明 docker 服务已经安装正常了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.11.17/image-20230726210504985.png" alt="image-20230726210504985" style="zoom:80%;" />

> 接下来有一件事儿是必须要做的，那就是设置国内镜像源，道理大家都懂，你要是用国外的镜像源，一天都不一定能搞下来一个。

## 基本设置

> 点击「设置」按钮，在左侧选择「Docker Engine」

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.11.17/image-20230726210929790.png" alt="image-20230726210929790" style="zoom: 80%;" />

> 然后在右侧的配置框中添加如下配置，加到最下面即可：

```
"registry-mirrors": [
    "https://hi7nmgjd.mirror.aliyuncs.com"
]
```

> 加完后，点击「Apply & restart」，这时候会重启 Docker 服务。

## 应用安装

> MySQL、Nginx、Redis、Zookeeper 这些都是服务，每一个都可以按照这种方式安装，不管你的项目需要多少个服务，一个个安装就好了，很快的呦。

> 正好我最进要学一下 PostgreSQL，我就直接启动一个 docker 容器了，不在本地安装了。当然了，像数据库这种 I/O 型的应用是不建议容器化的，但是本地开发测试无所谓。

> 在这个搜索框输入关键词，查找对应的镜像，我在这里输入关键词 `PostgreSQL`。如果安装 Nginx 那就是输入 Nginx，以此类推。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.11.17/image-20230726211003534.png" alt="image-20230726211003534" style="zoom:80%;" />

> search看，出来了一大堆，我一般都是找第一个，也就是下载量最大的这个。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.11.17/image-20230726211013821.png" alt="image-20230726211013821" style="zoom:80%;" />

> 可以 `pull` 或者 `run`，pull 是拉取镜像，run 是拉取镜像+启动容器。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.11.17/image-20230726211024845.png" alt="image-20230726211024845" style="zoom:67%;" />

> 一般都是直接 `run`，点一下 `run`，等一会儿，因为前面已经设置了国内镜像源，所以速度很快，十几秒钟。（根据网速快慢不同，因为要下载镜像文件，有的应用有上百M）下载完之后，因为选的是 `run`，所以直接弹出了启动参数。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.11.17/image-20230726211038970.png" alt="image-20230726211038970" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.11.17/image-20230726210647544.png" alt="image-20230726210647544" style="zoom:80%;" />

### **设置镜像名称**

> 容器名称（Container name）就是为了我们一看到它就知道是干什么的，用来方便管理的，我就直接命名为 `PostgreSQL`了。

### **设置端口映射（Ports）**

> 服务本身有自己的端口，例如 MySQL 是3306，这是服务本身在容器内的启动端口，但最终我们要通过宿主机去访问服务，所以要将这个容器内的端口绑定到一个宿主机端口，这叫做端口映射，这样一来，我们就可以通过宿主机的端口访问到容器内的端口了。比如将 MySQL 容器的 `3306` 端口映射到宿主机的 `13306` 端口，之后在设置数据库连接的时候，就用本机 IP:13306就能访问 MySQL 容器了。

> 在这个 PostgreSQL 容器上，将本机的 `15432`和容器的 `5432`端口绑定，之后就可以用 `15432`做连接端口了。

### **目录映射（Volumes）**

> 很多服务都会用到存储目录，但是容器本身就在宿主机上，所以需要将服务在容器内的目录映射到宿主机的目录上，这叫目录映射。例如将 Nginx 容器的 `/etc/nginx`目录映射到宿主机的 `/apps/nginx/`目录上，那之后在宿主机访问 `/apps/nginx`目录时，就能看到 Nginx 容器的配置文件了。

> 在这个PostgreSQL 容器上，作者将 `/etc/postgresql/postgresql.conf`配置文件映射到了其本地的一个目录上。

### 环境变量

> 一个服务启动可能会用到启动变量，这些变量可以通过环境变量的方式进行配置。例如，我们启动一个 Java jar 包，要配置 JVM 相关的参数，这些参数就可以放到环境变量中，供启动的时候使用。

> 因为 PostgreSQL 需要密码，所以这里就设置一个密码的环境变量 `POSTGRES_PASSWORD`。都设置好之后，点击`run`按钮，启动容器。然后我们看到容器已经启动了，有相应的日志打印出来。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.11.17/image-20230726211112465.png" alt="image-20230726211112465" style="zoom:80%;" />

然后点击左侧的`Containers`，可以看到已经启动的容器和一些基本配置。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.11.17/image-20230726211121880.png" alt="image-20230726211121880" style="zoom:80%;" />

然后就可以通过客户端进行连接了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.11.17/image-20230726211132058.png" alt="image-20230726211132058" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.11.17/image-20230726211141617.png" alt="image-20230726211141617" style="zoom:80%;" />

另外，还可以在容器详情中查看容器的内部文件、状态、配置信息、日志等，以及进入命令行。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.11.17/image-20230726211156424.png" alt="image-20230726211156424" style="zoom:80%;" />

# Docker不适合部署数据库原因

## 1、数据安全问题

> 不要将数据储存在容器中，这也是 Docker 官方容器使用技巧中的一条。容器随时可以停止、或者删除。当容器被rm掉，容器里的数据将会丢失。为了避免数据丢失，用户可以使用数据卷挂载来存储数据。但是容器的 Volumes 设计是围绕 Union FS 镜像层提供持久存储，数据安全缺乏保证。

> 如果容器突然崩溃，数据库未正常关闭，可能会损坏数据。另外，容器里共享数据卷组，对物理机硬件损伤也比较大。即使你要把 Docker 数据放在主机来存储 ，它依然不能保证不丢数据。Docker volumes 的设计围绕 Union FS 镜像层提供持久存储，但它仍然缺乏保证。

> 使用当前的存储驱动程序，Docker 仍然存在不可靠的风险。如果容器崩溃并数据库未正确关闭，则可能会损坏数据。
>

## 2、性能问题

> 大家都知道，MySQL 属于关系型数据库，对IO要求较高。当一台物理机跑多个时，IO就会累加，导致IO瓶颈，大大降低 MySQL 的读写性能。
>

> 在一次Docker应用的十大难点专场上，某国有银行的一位架构师也曾提出过：“数据库的性能瓶颈一般出现在IO上面，如果按 Docker 的思路，那么多个docker最终IO请求又会出现在存储上面。现在互联网的数据库多是share nothing的架构，可能这也是不考虑迁移到 Docker 的一个因素吧”。
>

**针对性能问题有些同学可能也有相对应的方案来解决：**

数据库程序与数据分离

> 如果使用Docker 跑 MySQL，数据库程序与数据需要进行分离，将数据存放到共享存储，程序放到容器里。如果容器有异常或 MySQL 服务异常，自动启动一个全新的容器。另外，建议不要把数据存放到宿主机里，宿主机和容器共享卷组，对宿主机损坏的影响比较大。
>

跑轻量级或分布式数据库

> Docker 里部署轻量级或分布式数据库，Docker 本身就推荐服务挂掉，自动启动新容器，而不是继续重启容器服务。
>

合理布局应用

> 对于IO要求比较高的应用或者服务，将数据库部署在物理机或者KVM中比较合适。目前TX云的TDSQL和阿里的Oceanbase都是直接部署在物理机器，而非Docker 。
>

## 3、网络问题

> 要理解 Docker 网络，您必须对网络虚拟化有深入的了解。也必须准备应付好意外情况。你可能需要在没有支持或没有额外工具的情况下，进行 bug 修复。
>

> 我们知道：数据库需要专用的和持久的吞吐量，以实现更高的负载。我们还知道容器是虚拟机管理程序和主机虚拟机背后的一个隔离层。然而网络对于数据库复制是至关重要的，其中需要主从数据库间 24/7 的稳定连接。未解决的 Docker 网络问题在1.9版本依然没有得到解决。
>

> 把这些问题放在一起，容器化使数据库容器很难管理。我知道你是一个顶级的工程师，什么问题都可以得到解决。但是，你需要花多少时间解决 Docker 网络问题？将数据库放在专用环境不会更好吗？节省时间来专注于真正重要的业务目标。
>

## 4、状态

> 在 Docker 中打包无状态服务是很酷的，可以实现编排容器并解决单点故障问题。但是数据库呢？将数据库放在同一个环境中，它将会是有状态的，并使系统故障的范围更大。下次您的应用程序实例或应用程序崩溃，可能会影响数据库。
>

**知识点**在 Docker 中水平伸缩只能用于无状态计算服务，而不是数据库。

> Docker 快速扩展的一个重要特征就是无状态，具有数据状态的都不适合直接放在 Docker 里面，如果 Docker 中安装数据库，存储服务需要单独提供。
>

> 目前，TX云的TDSQL(金融分布式数据库)和阿里云的Oceanbase(分布式数据库系统)都直接运行中在物理机器上，并非使用便于管理的 Docker 上。
>

## 5、资源隔离

> 资源隔离方面，Docker 确实不如虚拟机KVM，Docker是利用Cgroup实现资源限制的，只能限制资源消耗的最大值，而不能隔绝其他程序占用自己的资源。如果其他应用过渡占用物理机资源，将会影响容器里 MySQL 的读写效率。
>

> 需要的隔离级别越多，获得的资源开销就越多。相比专用环境而言，容易水平伸缩是Docker的一大优势。然而在 Docker 中水平伸缩只能用于无状态计算服务，数据库并不适用。
>

> 我们没有看到任何针对数据库的隔离功能，那为什么我们应该把它放在容器中呢？
>

## 6、云平台的不适用性

> 大部分人通过共有云开始项目。云简化了虚拟机操作和替换的复杂性，因此不需要在夜间或周末没有人工作时间来测试新的硬件环境。当我们可以迅速启动一个实例的时候，为什么我们需要担心这个实例运行的环境？
>

> 这就是为什么我们向云提供商支付很多费用的原因。当我们为实例放置数据库容器时，上面说的这些便利性就不存在了。因为数据不匹配，新实例不会与现有的实例兼容，如果要限制实例使用单机服务，应该让 DB 使用非容器化环境，我们仅仅需要为计算服务层保留弹性扩展的能力。
>

## 7、运行数据库的环境需求

> 常看到 DBMS 容器和其他服务运行在同一主机上。然而这些服务对硬件要求是非常不同的。
>

> 数据库（特别是关系型数据库）对 IO 的要求较高。一般数据库引擎为了避免并发资源竞争而使用专用环境。如果将你的数据库放在容器中，那么将浪费你的项目的资源。因为你需要为该实例配置大量额外的资源。在公有云，当你需要 34G 内存时，你启动的实例却必须开 64G 内存。在实践中，这些资源并未完全使用。
>

> 怎么解决？您可以分层设计，并使用固定资源来启动不同层次的多个实例。水平伸缩总是比垂直伸缩更好。针对上面问题是不是说数据库一定不要部署在容器里吗？
>

答案是：并不是

> 我们可以把数据丢失不敏感的业务（搜索、埋点）就可以数据化，利用数据库分片来来增加实例数，从而增加吞吐量。docker适合跑轻量级或分布式数据库，当docker服务挂掉，会自动启动新容器，而不是继续重启容器服务。数据库利用中间件和容器化系统能够自动伸缩、容灾、切换、自带多个节点，也是可以进行容器化的。
>



# IDEA使用Docker

## 连接配置

由于该插件为IDEA内置插件，直接在插件设置中启用就好了；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231113690.png" alt="image-20220723111359625" style="zoom:67%;" />

### 修改端口号

1、修改/lib/systemd/system/docker.service文件

```apl
vim /lib/systemd/system/docker.service
```

按i进入编辑模式，在ExecStart后面追加，默认端口是2375，也可以修改为其他端口

```apl
-H tcp://0.0.0.0:2375 -H unix://var/run/docker.sock
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231124926.png" alt="image-20220723112400760" style="zoom: 67%;" />

修改完记得写保存退出命令 :wq

2、重新加载配置文件，重启docker，使得刚才的配置生效

```apl
#重新加载配置文件
systemctl daemon-reload
#重启docker服务
systemctl restart docker
```

3、使用curl命令检查是否开启

curl下载docker的服务信息

```apl
curl http://127.0.0.1:2375/info
```

如果有返回说明，就证明开启成功了，可以看到我的Docker版本，镜像加速器地址等其他信息

## 连接

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231128218.png" alt="image-20220723112807101" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231133863.png" alt="image-20220723113302764" style="zoom:67%;" />



## 镜像管理

点击`Images`按钮，输入需要下载的镜像名称和版本号就可以下载镜像了，这里IDEA还支持自动提示，实在太贴心了！

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231138952.png" alt="image-20220723113829851" style="zoom:67%;" />

右键指定镜像打开菜单，我们还可以对其进行创建容器、查看、删除等常规操作；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231138612.png" alt="image-20220723113855528" style="zoom:67%;" />

## SpringBoot

当然我们还可以使用Dockerfile来构建自己的镜像，这里以我的[mall-tiny](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247500084&idx=1&sn=5bd4e684af3cfede8f332c423a478abf&scene=21#wechat_redirect) 脚手架项目为例，首先准备好Dockerfile脚本；

SpingBoot项目打包

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231143627.png" alt="image-20220723114343561" style="zoom:50%;" />



```apl
# 该镜像需要依赖的基础镜像
FROM java:8
# 将当前目录下的jar包复制到docker容器的/目录下
ADD ./mall-tiny-1.0.0-SNAPSHOT.jar /mall-tiny-1.0.0-SNAPSHOT.jar
# 声明服务运行在8080端口
EXPOSE 8080
# 指定docker容器启动时运行jar包
ENTRYPOINT ["java", "-jar","/mall-tiny-1.0.0-SNAPSHOT.jar"]
# 指定维护者的名字
MAINTAINER renshuo
```

- 然后打开Dockfile文件，点击左侧按钮选择创建新的运行配置；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231149548.png" alt="image-20220723114914461" style="zoom:67%;" />

- 接下来选择我们配置好的远程Docker服务，配置好应用打包目录及镜像名称；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231149031.png" alt="image-20220723114928921" style="zoom:50%;" />

- 然后选择打包镜像，控制台将输出如下日志，jar包会直接上传到远程服务器并打包成镜像。

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlgbAHTzCeianViblv68lEa8d4OxMqC7W8kwibciayicCn4hsXvC7TibWtZawYq7xFUBkhQRz6eEyjse0Sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



## 容器管理

- 右键镜像打开菜单，还可以直接创建容器；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlgbAHTzCeianViblv68lEa8dsH4a0hy45rxPiaPv6ddft9cWt4Eo5UN33kw2781yqyv8Za6lcoxZXEg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 由于mall-tiny项目需要用到mysql和redis服务，我们可以先启动它们；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlgbAHTzCeianViblv68lEa8deb04hTmdYEjKAprBiadmJCLoiafSl1xILbicTnH0vB0pxNu5FibmSmib3mQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 然后修改创建容器的配置，主要就是一些之前使用`docker run`命令的指定的一些配置；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlgbAHTzCeianViblv68lEa8dcKsHEEUY9LjXeL6Yy7zmzYeGEuuzvx6MTdmF13aYFNicFqibScx7IeTQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 大家直接对照下之前使用的`docker run`命令，大概就能知道这些配置的作用了；

```
docker run -p 8080:8080 --name mall-tiny \
--link mysql:db \
--link redis:redis \
-e 'spring.profiles.active'=prod \
-v /etc/localtime:/etc/localtime \
-v /mydata/app/mall-tiny/logs:/var/logs \
-d mall-tiny/mall-tiny:1.0.0-SNAPSHOT
```

- 运行过程中可以直接在`Log`标签中查看容器的运行日志，这确实很方便！

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlgbAHTzCeianViblv68lEa8djCDhs0uUibSMzTUyWF5g28KFntkWbRkyySYjcpsUpRiakKJVQQlo86DA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 与容器交互

- 通过容器面板我们可以查看到很多容器内部信息，比如查看环境变量；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlgbAHTzCeianViblv68lEa8d9LkSl8WLY1MM1N7LibplH6JJ6UHGTz71v5ZKwB2TCDh0CpcYsoN97rQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 还可以查看容器的端口映射配置；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlgbAHTzCeianViblv68lEa8dr7ibzqv5LCtxnjyOrR91IZLNnMhEp3Xx37RVOh9bZduWiaCtETZJeibBw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 还可以查看之前通过`docker inspect`命令获取的信息，比如查看容器运行的IP地址；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlgbAHTzCeianViblv68lEa8dJpaBJibVuY1ciaBuiaW6CUSJYjcp3bsCMH3dVfXKJsbUNAia9Ma83OD62Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 还可以直接进入容器内部去执行命令，还记得之前使用的`docker exec -it`命令么。

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlgbAHTzCeianViblv68lEa8dwE3WBwyMS4SE0hb06AletgX6iafuVm7QgUxPFhC1lFuHwezjONAwGEQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## Docker Compose

- 使用该插件也可以通过Docker Compose来部署应用，首先创建`docker-compose.yml`文件，由于mysql容器没有使用Docker Compose来创建，这里改用IP来访问；

```yml
version: '3'
services:
  redis:
    image: redis:5
    container_name: redis-tiny
    command: redis-server --appendonly yes
    volumes:
      - /mydata/redis-tiny/data:/data #数据文件挂载
    ports:
      - 6379:6379
  mall-tiny:
    image: mall-tiny/mall-tiny:1.0.0-SNAPSHOT
    container_name: mall-tiny
    links:
      - redis:redis
    depends_on:
      - redis
    ports:
      - 8080:8080
    environment:
      - 'spring.profiles.active=prod'
      - 'spring.datasource.url=jdbc:mysql://192.168.3.105:3306/mall_tiny? useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai&useSSL=false'
      - 'spring.redis.host=redis'
    volumes:
      - /etc/localtime:/etc/localtime
      - /mydata/app/mall-tiny/logs:/var/logs
```

- 然后直接点击`docker-compose.yml`文件箭头即可将应用部署到远程服务器，确实很方便！

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlgbAHTzCeianViblv68lEa8d3c1NWicpdBxPdXbcU8g1trdtYwIxibgpm1GrrLEmY8fwGTUmAbUjsseQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 部署完成后即可访问项目的Swagger页面，访问地址：http://192.168.3.105:8080/swagger-ui/

<img src="https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlgbAHTzCeianViblv68lEa8dbOE2RxSznRq47s4xa5ibMXWx0NyibDUDWdvcicZVeB8O4b2wApQMCtib6A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:50%;" />

> 今天体验了一把IDEA的官方Docker插件，不使用命令行就可以实现远程Docker镜像与容器的管理，还支持Docker Compose部署，功能确实很强大！在平时开发过程中，使用这款插件来打包、部署、运行SpringBoot应用确实很方便，感兴趣的小伙伴可以尝试下它！
>



# Docker 部署前后端分离项目

[丝滑的打包部署，一套带走，还没搞](https://mp.weixin.qq.com/s?__biz=MzAwMjI0ODk0NA==&mid=2451968557&idx=1&sn=4a40968c69a17df511cd7865eebe5320&chksm=8d1febb2ba6862a47676d1e492666d2edc503a0ef3c10360125256619bb1457d9ad967b4b746&mpshare=1&scene=23&srcid=0302HIxi6ycu2a3VHKWtMCgM&sharer_sharetime=1677767187330&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

## 安装Nginx

### 1、拉取Nginx镜像文件

```
docker pull nginx
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212062318039.png" alt="image-20221206231838871" style="zoom:80%;" />

### 2、查看下载好的镜像文件

```
docker images
```

### 3、创建并运行Nginx容器

```
docker run -d --name nginx01 -p 3344:80 nginx
命令详解：
# docker run 启动一个镜像
# -d 表示后台允许
# --name nginx01  表示为当前容器起一个别名
# -p 3344:80 表示将本机的3344端口映射到nginx镜像的80端口
```

### 4、查看正在运行的容器

```
docker ps
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212062319416.png" alt="image-20221206231951171" style="zoom:80%;" />

### 5、查看Nginx是否部署成功

```
curl localhost:3344
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212062320207.png" alt="image-20221206232022048" style="zoom:67%;" />

访问：http://192.168.22.150:3344/

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212062321102.png" alt="image-20221206232102965" style="zoom:67%;" />

### 6、拓展(完整Nginx部署)

1、进入Nginx容器当中

```sh
docker exec -it nginx01 /bin/bash
命令详解：
# docker exec 在运行的容器中执行命令
# -i 以交互模式运行容器，通常与 -t 同时使用；例如-it
# -t 为容器重新分配一个伪输入终端，通常与 -i 同时使用；例如-it
# nginx01 容器名
# /bin/bash 其实就是表示载入容器后运行bash（命令语言解释程序）, 因为docker中必须要保持一个进程（运行的程序）的运行，要不然整个容器就会退出，所以说，bash就担任起了docker中运行的那个进程的角色！
#而/bin/bash则是bash在linux下的位置
```

2、在容器中查询出nginx的相关配置文件存放位置

```
whereis nginx
```

3、退出容器，回到本地linux系统

```
exit
```

4、停止并移除Nginx容器

```
docker stop bedfd2a72585 #停止容器
docker rm bedfd2a72585 #移除容器
# bedfd2a72585表示容器的ID，即：CONTAINER ID
```

5、本地创建管理目录

```
mkdir -p /data/nginx
mkdir -p /data/nginx/www 
mkdir -p /data/nginx/conf
mkdir -p /data/nginx/logs
```

6、将容器中的相应文件copy到刚创建的管理目录中

```
docker cp bedfd2a72585:/etc/nginx/nginx.conf /data/nginx/
docker cp bedfd2a72585:/etc/nginx/conf.d /data/nginx/conf/
docker cp bedfd2a72585:/usr/share/nginx/html/ /data/nginx/www/
docker cp bedfd2a72585:/var/log/nginx/ /data/nginx/logs/
```

> 注：docker cp bedfd2a72585中的 "bedfd2a72585" 为容器ID（docker ps可查看）

7、再次启动容器并作目录挂载

```
docker run --name nginx -p 80:80 -v /data/nginx/nginx.conf:/etc/nginx/nginx.conf -v /data/nginx/www/:/usr/share/nginx/html/ -v /data/nginx/logs/:/var/log/nginx/ -v /data/nginx/conf/:/etc/nginx/conf.d --privileged=true -d nginx
```

> ps：-p 80:80 端口进行映射，将本地 80端口映射到容器内部的 80 端口。

## 安装MySQL

1、下拉mysql镜像文件

```sh
docker pull mysql  #默认最新版本
 
docker pull mysql:xxx  #指定版本号
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuezCBTbVJYp5fkWL9HwqdBe7VyZpv9eezgglxUgmZg5PzOgp9KnSJEicQXXL2dNu3qUCwiamcwVGDDA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

2、查看当前镜像

```
docker images
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuezCBTbVJYp5fkWL9HwqdBe892yGsYkibOkEia1aY9Q9MUa4EVKA3wicRbcgricPeZKgkPSyprVyreic5A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

3、启动mysql容器

第一种：

```
docker run --name mysql01 -d -p 3310:3306 -e MYSQL_ROOT_PASSWORD=root mysql
```

命令详解：

```
# --name 自定义容器名称
# -d 后台运行
# -p 指定映射的端口号
# -e MYSQL_ROOT_PASSWORD=root 数据库密钥
```

第二种：

```
docker run --restart=always --privileged=true -d -v /home/mysql/data:/var/lib/mysql -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/my.cnf:/etc/mysql/my.cnf -p 3311:3306 --name mysql02 -e MYSQL_ROOT_PASSWORD=root mysql
```

- `--restart=always` 代表开启启动
- `--privileged=true` 代表进入容器内部为管理员身份
- `-d` 表示后台运行容器 并返回容器Id
- `-v` 把mysql产生的数据同步到本地 防止数据丢失
- `-e` 容器传参  设置mysql的初始密码

4、查看正在运行的容器

```
docker ps
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuezCBTbVJYp5fkWL9HwqdBeM0NvWMHwZbFkfVd3TxQ43TBX2FiauY21LWYrtbKiaMujct8F5o3GU1sA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

5、测试数据库连接

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuezCBTbVJYp5fkWL9HwqdBezvTOZEn3PM37k4Xialiak09phLV8aWX0WpyYeVHDreW58KW58fzLKicYA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuezCBTbVJYp5fkWL9HwqdBeHysCpJ3FyAT3uIPbptcbhOtuicswo0VlZE5lIicJibzhPsYkwWQaLdK2Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 部署SpringBoot项目

1、整合后端成Jar包并编写Dockerfile文件

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuezCBTbVJYp5fkWL9HwqdBexz20m8hBkhb96xayHIf19fy5C6LedkHJZUjia0och2fdmTVvfoaFZrg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

2、Dockerfile内容详解

```
FROM java:8  #工程java版本
 
COPY *.jar /app.jar  #将所有的jar包整合为app.jar
 
EXPOSE 9099  #暴露后端端口号
 
ENTRYPOINT ["java","-jar","app.jar"]  #执行jar包
```

3、将文件上传到Linux服务器上面，必须放在同级目录一起！

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuezCBTbVJYp5fkWL9HwqdBeNhqnV0DS5IwxofAKAYVHVgMOKyOr6xjqxPFEtBsTnoZa37YVW6vY2g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

4、构建镜像

```
docker build -t api .  #点千万别漏了，这里取名镜像为api，可以随便取名！
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuezCBTbVJYp5fkWL9HwqdBeyXYutfLSNpftzPWt0WnDH42kAYDSw1VPNpFlFf0uPSOnTedq0Z3qgw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

5、查看当前镜像

```
docker images
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuezCBTbVJYp5fkWL9HwqdBeSBxOqyJNOUic1JDPn4ianvPdT9pL6GAmOG9dcJzeIg8liaibjMBYZWpWYw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

6、创建一个新的容器并运行

```
docker run -d -p 9099:9099 --name httapi api 
#将9099端口映射到9099端口，端口记得放开
#httapi为自定义容器名字
#api是镜像名字
```

7、查看正在运行的容器

```
docker ps
```

8、使用postman测试接口

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuezCBTbVJYp5fkWL9HwqdBevaQWoDZjY8ia8ot7MU5MLIAjnJjvW3eaF3X35njqgTRdr7iabwuGoeew/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 部署Vue项目

### 1、打包Vue工程

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuezCBTbVJYp5fkWL9HwqdBeSoiaLicZNOqDCBX7s6v1yibwmLwDjIMUWBJwVKKZlEYv9GPMtcyVppZwA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 2、default.conf文件和Dockerfile文件详细

default.conf配置

```properties
server {
    listen       80;
    server_name  ip地址; # 修改为docker服务宿主机的ip
 
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html =404;
    }
     location /api {
      proxy_pass http://ip地址:端口号/;
    }
 
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```

Dockerfile配置

```sh
# 基础镜像使用Nginx
FROM nginx
# 作者
MAINTAINER renshuo
# 添加时区环境变量，亚洲，上海
ENV TimeZone=Asia/Shanghai
# 将前端dist文件中的内容复制到nginx目录
COPY dist  /usr/share/nginx/html/
# 用本地的nginx配置文件覆盖镜像的Nginx配置
COPY default.conf /etc/nginx/conf.d
# 暴露端口
EXPOSE 80
```

3、上传这三个文件到Linux服务器的同一个文件夹当中，务必放在一起！

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuezCBTbVJYp5fkWL9HwqdBeyCFmOWVgJcgDIWPqFrmKT7niajEt6XxUEcQIW18IOUrmVNj4RIppJWQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

4、构建镜像

```
docker build -t vue . #点千万别漏了，这里取名镜像为vue，可以随便取名！
```

5、查看当前镜像

```sh
docker images
```

6、创建一个新的容器并运行

```sh
docker run -d -p 8088:80 --name httvue vue 
#将8088端口映射到80端口，端口记得放开
#httvue为自定义容器名字
#vue是镜像名字
```

7、查看正在运行的容器

```
docker ps
```

8、访问前端页面并测试接口

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuezCBTbVJYp5fkWL9HwqdBe4gcmYbGnT1c1b3ibAYPmGOnpc5HYficN0hHOiaUibicwaBruV7uev8aIV8g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)
