



# Kubernetes架构

了解Kubernetes架构的不同组件是如何组合在一起的，这样你就可以更好地诊断问题，维护健康的集群，并优化工作流

你可以使用Kubernetes编排容器。这听上去很简单，但理解这实际上意味着什么，以及如何完成完全是另一回事。如果你正在运行或管理Kubernetes集群，那么你知道Kubernetes由一台指定为控制平面的计算机和许多其他指定为工作节点的计算机组成。每一个都有一个复杂但强大的堆栈，使编排成为可能，熟悉每个组件有助于理解它们是如何工作的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304172055125.png" alt="image-20230417205559049" style="zoom:80%;" />

## 控制平面组件

你把Kubernetes安装在一个叫做控制平面的机器上。它运行Kubernetes守护程序，在启动容器和pod时与之通信。以下介绍控制平面组件。

### etcd

etcd是一种快速、分布式、一致的键值存储，用作持久存储Kubernetes对象数据（如pod、复制控制器、秘密和服务）的后备存储。etcd是Kubernetes存储集群状态和元数据的唯一地方。与etcd直接对话的唯一组件是Kubernetes API服务器。所有其他组件通过API服务器间接向etcd读写数据。

etcd还实现了一个监视功能，它提供了一个基于事件的接口，用于异步监视密钥的更改。一旦你更改了一个密钥，监视器就会得到通知。API服务器组件严重依赖于此来获得通知，并将etcd的当前状态迁移到所需状态。

为什么etcd实例的数量应该是奇数？

在高可用性（HA）环境中，通常会有三个、五个或七个etcd实例运行，但为什么呢？因为etcd是一个分布式数据存储。可以横向扩展，但也需要确保每个实例中的数据是一致的，为此，系统需要就状态达成共识。etcd为此使用RAFT共识算法。

该算法需要多数（或仲裁）才能使集群进入下一个状态。如果只有两个ectd实例，且其中任何一个都失败，etcd集群将无法转换到新状态，因为不存在多数。如果有三个ectd实例，一个实例可能会失败，但仍有大多数实例可用于达到仲裁。

### API服务器

API服务器是Kubernetes中唯一直接与etcd交互的组件。Kubernetes中的所有其他组件必须通过API服务器才能与集群状态一起工作，包括客户端（kubectl）。API服务器具有以下功能：

——提供在etcd中存储对象的一致方式。

——对这些对象执行验证，这样客户端就不会存储配置不当的对象（如果直接写入etcd数据存储，可能会发生这种情况）。

——提供RESTful API来创建、更新、修改或删除资源。

——提供乐观并发锁定，因此在并发更新的情况下，其他客户端永远不会覆盖对对象的更改。

——对客户端发送的请求执行身份验证和授权。它使用插件提取客户端的用户名、用户ID、用户所属的组，并确定经过身份验证的用户是否可以对请求的资源执行请求的操作。

——如果请求试图创建、修改或删除资源，则负责许可控制。例如，AlwaysPubllimages、DefaultStorageClass和ResourceQuota。

——实现一种监视机制（类似于etcd），以便客户端监视更改。这允许调度器和控制器管理器等组件以松耦合的方式与API服务器交互。

### 控制器管理器

在Kubernetes中，控制器是监视集群状态的控制循环，然后在需要时进行更改或请求更改。每个控制器都会尝试将当前集群状态移近所需状态。控制器跟踪至少一种Kubernetes资源类型，这些对象有一个表示所需状态的spec字段。

控制器示例：

——Replication Manager（用于ReplicationController资源的控制器）

——复制集、守护程序集和作业控制器

——部署控制器

——状态集控制器

——节点控制器

——服务控制器

——端点控制器

——命名空间控制器

——持久卷控制器

控制器使用监视机制获得更改通知。它们监视API服务器对资源的更改，并对每次更改执行操作，无论是创建新对象还是更新或删除现有对象。大多数情况下，这些操作包括创建其他资源或更新监视的资源本身。尽管如此，因为使用监视并不能保证控制器不会错过一个事件，它们也会定期执行重新列出操作，以确保没有错过任何事情。

Controller Manager还执行生命周期功能，如命名空间创建和生命周期、事件垃圾收集、终止的pod垃圾收集、级联删除垃圾收集和节点垃圾收集。

### 调度器

调度器是一个控制平面进程，将pod分配给节点。它监视新创建的没有分配节点的pod。对于调度器发现的每一个pod，调度器将负责找到该pod运行的最佳节点。

满足pod调度要求的节点称为可行节点。如果没有合适的节点，pod将保持未调度状态，直到调度器可以放置它。一旦找到一个可行的节点，它就会运行一组函数对节点进行评分，并选择得分最高的节点。然后，它将所选节点通知API服务器。这个过程称为绑定。

节点的选择分为两步：

——筛选所有节点的列表，以获得可接受节点的列表，你可以将pod安排到这些节点（例如，PodFitsResources筛选器检查候选节点是否有足够的可用资源来满足pod的特定资源请求）。

——对从第一步获得的节点列表进行评分，并对它们进行排序，以选择最佳节点。如果多个节点得分最高，循环过程可以确保pod在所有节点上均匀部署。

调度决策考虑的因素包括：

——pod是否请求硬件/软件资源？节点是否报告内存或磁盘压力状况？

——节点是否具有与pod规范中的节点选择器匹配的标签？

——如果pod请求绑定到特定的主机端口，该端口可用吗？

——pod能容忍节点的污染吗？

——pod是否指定节点关联规则或反关联规则？

调度器不会指示所选节点运行pod。调度器只需通过API服务器更新pod定义。API服务器通知kubelet pod已通过监视机制调度。然后目标节点上的kubelet服务看到pod被调度到其节点，它创建并运行pod的容器。

### 工作节点组件

Worker节点运行kubelet代理，这允许它们被控制平面用来处理作业。与控制平面类似，工作节点使用几个不同的组件来实现这一点。以下介绍工作节点组件。

### kubelet

kubelet是在集群中的每个节点上运行的代理，负责在工作节点上运行的所有内容。它确保容器在pod中运行。

kubelet服务的主要功能是：

——通过在API服务器中创建节点资源来注册它正在运行的节点。

——持续监控API服务器，以查看已调度到节点的pod。

——使用配置好的容器运行时启动pod的容器。

——持续监控正在运行的容器，并向API服务器报告它们的状态、事件和资源消耗。

——运行容器活性探测，当探针失败时重新启动容器，当容器的pod从API服务器上删除时终止容器（通知服务器pod终止）。

## 服务代理

服务代理（kube-proxy）在每个节点上运行，确保一个pod可以与另一个pod对话，一个节点可以与另一个节点对话，以及一个容器可以与另一个容器对话。它负责监视API服务器上服务和pod定义的更改，以保持整个网络配置是最新的。当一个服务得到多个pod的支持时，代理在这些pod之间执行负载均衡。

kube-proxy之所以得名，是因为它最初是一个实际的代理服务器，用于接受连接并将其代理到pod。当前的实现使用iptables规则将数据包重定向到随机选择的后端pod，而不通过实际的代理服务器。

关于其工作原理的高级视图：

——创建服务时，会立即分配虚拟IP地址。

——API服务器通知在工作节点上运行的kube-proxy存在新服务。

——每个kube-proxy通过设置iptables规则使服务可寻址，确保拦截每个服务IP/端口对，并将目标地址修改为支持服务的pod之一。

——监视API服务器对服务或其端点对象的更改。



## 容器运行时

有两类容器运行时：

——较低级别的容器运行时：它们关注于运行容器，并为容器设置命名空间和cgroup。

——更高级别的容器运行时（容器引擎）：它们关注格式、解包、管理、镜像共享，并为开发人员提供API。

容器运行时负责：

——从镜像注册表中提取所需的容器镜像（如果在本地不可用）。

——将镜像提取到一个写时拷贝文件系统上，并覆盖所有容器层，以创建一个合并的文件系统。

——准备容器挂载点。

——设置容器镜像中的元数据，如覆盖CMD、用户输入中的ENTRYPOINT，并设置SECCOMP规则，确保容器按预期运行

——修改内核，将隔离（如进程、网络和文件系统）分配给该容器。

——提醒内核分配一些资源限制，如CPU或内存限制。

——将系统调用（syscall）传递给内核以启动容器。

——确保SElinux/AppArmor设置正确。

## 一起工作

> 系统级组件协同工作，以确保Kubernetes集群的每个部分都能实现其目的并执行其功能。有时（当你深入编辑一个YAML文件时），理解你的请求在集群中是如何被传达的可能会让你不知所措。现在，有了一张各部分如何组合在一起的视图，你可以更好地了解Kubernetes内部发生了什么，这有助于你诊断问题，维护健康的集群，并优化工作流程。



# 为什么用K8S

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231007149.png" alt="image-20220723100728072" style="zoom:50%;" />

随着k8s 作为容器编排解决方案变得越来越流行，有些人开始拿 Docker 和 k8s进行对比，不禁问道：Docker 不香吗？

> k8s 是kubernets的缩写，’8‘代表中间的八个字符。

其实 Docker 和 k8s 并非直接的竞争对手，它俩相互依存。Docker 是一个容器化平台，而 k8s 是 Docker 等容器平台的协调器。

## 容器化时代来了

虚拟化技术已经走过了三个时代，没有容器化技术的演进就不会有 Docker 技术的诞生。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231008346.png" alt="image-20220723100822315" style="zoom:67%;" />

物理机时代：多个应用程序可能会跑在一台机器上。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231008325.png" alt="image-20220723100852266" style="zoom: 50%;" />

虚拟机时代：一台物理机器安装多个虚拟机（VM），一个虚拟机跑多个程序。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231009702.png" alt="image-20220723100928623" style="zoom: 50%;" />

容器化时代：一台物理机安装多个容器实例（container），一个容器跑多个程序。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231010436.png" alt="image-20220723101018353" style="zoom:45%;" />

容器化解决了软件开发过程中一个令人非常头疼的问题，用一段对话描述：

> 测试人员：你这个功能有问题。
>
> 开发人员：我本地是好的啊。

开发人员编写代码，在自己本地环境测试完成后，将代码部署到测试或生产环境中，经常会遇到各种各样的问题。明明本地完美运行的代码为什么部署后出现很多 bug，原因有很多：不同的操作系统、不同的依赖库等，总结一句话就是因为本地环境和远程环境不一致。

容器化技术正好解决了这一关键问题，它将软件程序和运行的基础环境分开。开发人员编码完成后将程序打包到一个容器镜像中，镜像中详细列出了所依赖的环境，在不同的容器中运行标准化的镜像，从根本上解决了环境不一致的问题。

## 容器化技术的尖刀武器

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231011004.png" alt="image-20220723101124940" style="zoom:50%;" />

- **可移植性**：不依赖具体的操作系统或云平台，比如在阿里云或腾讯云直接随意迁移。
- **占地小**：容器只需要其应用程序以及它需要运行的所有容器和库的依赖清单，不需要将所有的依赖库都打包在一起。
- **共享 bin 和 lib**：不同的容器可以共享 bin 和 lib，进一步节省了空间。

## Docker 横空出世

2010年一位年轻小伙子在美国旧金山成立了一家名叫【dotCloud】的公司， 开发了 Docker的核心技术，从此开启了容器技术的时代。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231011585.png" alt="image-20220723101152522" style="zoom:50%;" />

后面 dotCloud 公司将自己的容器技术进行了简化和标准化，取名为 Docker，就是大家熟悉的鲸鱼 logo。

2013年dotCloud 公司宣布将 Docker 开源，随着越来越多的工程师发现了它的优点， Docker 的人气迅速攀升，成为当时最火爆的开源技术之一。

当前有30％以上的企业在其AWS环境中使用Docker，并且这个数字还在继续增长。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231012083.png" alt="image-20220723101223035" style="zoom:50%;" />

## Docker怎么用？

其实大多数人谈论 Docker 时说的是 Docker Engine，`这只是一个构建和运行的容器`。

`在运行容器前需要编写Docker File，通过 dockerFile 生成镜像，然后才能运行 Docker 容器`。

Docker File 定义了运行镜像（image）所需的所有内容，包括操作系统和软件安装位置。一般情况下都不需要从头开始编写 Docker File，在 Docker Hub 中有来自世界各地的工程师编写好的镜像，你可以基于此修改。

## 编排系统的需求催生 k8s

尽管Docker为容器化的应用程序提供了开放标准，但随着容器越来越多出现了一系列新问题：

- `如何协调和调度这些容器？`
- `如何在升级应用程序时不会中断服务？`
- `如何监视应用程序的运行状况？`
- `如何批量重新启动容器里的程序？`

解决这些问题需要容器编排技术，可以将众多机器抽象，对外呈现出一台超大机器。现在业界比较流行的有：k8s、Mesos、Docker Swarm。

在业务发展初期只有几个微服务，这时用 Docker 就足够了，但随着业务规模逐渐扩大，容器越来越多，运维人员的工作越来越复杂，这个时候就需要编排系统解救opers。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231013117.png" alt="image-20220723101324078" style="zoom:67%;" />

一个成熟的容器编排系统需要具备以下能力：

- 处理大量的容器和用户
- 负载均衡
- 鉴权和安全性
- 管理服务通信
- 多平台部署

## k8s与Docker Swarm江湖恩怨

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231014669.png" alt="image-20220723101439579" style="zoom:50%;" />

如果你非要拿 Docker 和 k8s 进行比较，其实你更应该拿 Docker Swarm 和 k8s 比较。

Docker Swarm 是 Docker 自家针对集群化部署管理的解决方案，优点很明显，可以更紧密集成到 Docker 生态系统中。

虽说 Swarm 是 Docker 亲儿子，但依旧没有 k8s 流行，不流行很大程度是因为商业、生态的原因，不多解释。

## k8s是做什么用的？

`K8s是Google研发的容器协调器`，已捐赠给CNCF，现已开源。

Google 利用在容器管理多年的经验和专业知识推出了 k8s，主要用于自动化部署应用程序容器，可以支持众多容器化工具包括现在非常流行的Docker。

目前k8s 是容器编排市场的领导者，开源并公布了一系列标准化方法，主流的公有云平台都宣布支持。

一流的厂商都在抢占标准的制高点，一堆小厂商跟着一起玩，这就叫生态了。国内的大厂商都在干嘛呢？抢社区团购市场，玩资本游戏，哎？！

## K8s 架构和组件

k8s 由众多组件组成，组件间通过 API 互相通信，归纳起来主要分为三个部分：

- controller manager
- nodes
- pods

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231016125.png" alt="image-20220723101626051" style="zoom:50%;" />

- **Controller Manager**，即控制平面，用于调度程序以及节点状态检测。
- **Nodes**，构成了Kubernetes集群的集体计算能力，实际部署容器运行的地方。
- **Pods**，Kubernetes集群中资源的最小单位。

## Docker与k8s 难舍难分

Docker 和 k8s 在业界非常流行，都已经是事实上的标准。

Docker 是用于构建、分发、运行容器的平台和工具。

而 k8s 实际上是一个使用 Docker 容器进行编排的系统，主要围绕 pods 进行工作。Pods 是 k8s 生态中最小的调度单位，可以包含一个或多个容器。

Docker 和 k8s 是根本上不同的技术，两者可以很好的协同工作。

## 开发实践，灵魂追问

**（1）没有 k8s 可以使用 docker 吗？**

可以。实际上一些小型公司，在业务不太复杂的情况下都是直接使用 Docker。尽管 k8s 有很多好处，但是众所周知它非常复杂，业务比较简单可以放弃使用 k8s。

**（2）没有 Docker 可以使用 k8s 吗？**

k8s 只是一个容器编排器，没有容器拿什么编排？！

k8s 经常与 Docker 进行搭配使用，但是也可以使用其他容器，如RunC、Containerted 等。

**（3）Docker Swarm 和 k8s 怎么选？**

选 k8s。2019年底Docker Enterprise已经出售给Mirantis，Mirantis声明要逐步淘汰Docker Swarm，后续会将 k8s 作为默认编排工具。

## 最后一个问题

> Docker 不香吗？为什么还要用 k8s

Docker很香，但 k8s 在业务达到一定规模后也得启用。学会了吗？





# K8S太火了！花10分钟玩转它不香么？

> 我的Mall电商实战项目一直使用的是Docker容器化部署，有很多朋友建议搞个Kubernetes部署。最近正好在学习Kubernetes，准备更新一波！今天我们先来学习下Kubernetes的核心概念和基本使用，希望对大家有所帮助！

官方文档：https://kubernetes.io/zh/docs/home/

[K8S太火了！花10分钟玩转它不香么？ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247488842&idx=1&sn=259ef19f414d968748193df89a0a6c73&chksm=fc2fa942cb58205472bbbec7b89192ccd0da270c48ea21556bd8cf7f1ecd54a528f8dbd5468f&mpshare=1&scene=23&srcid=0722vTcjy5hAfIItglOZvjwf&sharer_sharetime=1658503980742&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

## Kubernetes简介

Kubernetes（简称K8S，K和S之间有8个字母）是用于自动部署，扩展和管理容器化应用程序的开源系统。它将组成应用程序的容器组合成逻辑单元，以便于管理和服务发现。Kubernetes 源自Google 15 年生产环境的运维经验，同时凝聚了社区的最佳创意和实践。

Kubernetes具有如下特性：

- 服务发现与负载均衡：无需修改你的应用程序即可使用陌生的服务发现机制。
- 存储编排：自动挂载所选存储系统，包括本地存储。
- Secret和配置管理：部署更新Secrets和应用程序的配置时不必重新构建容器镜像，且不必将软件堆栈配置中的秘密信息暴露出来。
- 批量执行：除了服务之外，Kubernetes还可以管理你的批处理和CI工作负载，在期望时替换掉失效的容器。
- 水平扩缩：使用一个简单的命令、一个UI或基于CPU使用情况自动对应用程序进行扩缩。
- 自动化上线和回滚：Kubernetes会分步骤地将针对应用或其配置的更改上线，同时监视应用程序运行状况以确保你不会同时终止所有实例。
- 自动装箱：根据资源需求和其他约束自动放置容器，同时避免影响可用性。
- 自我修复：重新启动失败的容器，在节点死亡时替换并重新调度容器，杀死不响应用户定义的健康检查的容器。

## Minikube简介

Minikube是一种轻量级的Kubernetes实现，可在本地计算机上创建VM并部署仅包含一个节点的简单集群，Minikube可用于Linux、MacOS和Windows系统。Minikube CLI提供了用于引导集群工作的多种操作，包括启动、停止、查看状态和删除。

## Kubernetes核心概念

> 由于Kubernetes有很多核心概念，学习它们对理解Kubernetes的使用很有帮助，所以我们先来学习下这些核心概念。

### Node

Kubernetes集群是指Kubernetes协调一个高可用计算机集群，每个计算机作为独立单元互相连接工作。

一个Kubernetes集群包含两种类型的资源：

- Master：负责管理整个集群。协调集群中的所有活动，例如调度应用、维护应用的所需状态、应用扩容以及推出新的更新。
- Node：用于托管正在运行的应用。可以是一个虚拟机或者物理机，它在Kubernetes集群中充当工作机器的角色，每个Node都有Kubelet，它管理Node而且是Node与Master通信的代理，Node还具有用于处理容器操作的工具，例如Docker或rkt。

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwkQ4LlPvAULYdfWEpmF0gzWyrVdhuNH5MIg8s8gjgx2ubtmutjBlHW2n88OC47jMeicSpEBewSTCeg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Deployment

Deployment负责创建和更新应用程序的实例。创建Deployment后，Kubernetes Master 将应用程序实例调度到集群中的各个节点上。如果托管实例的节点关闭或被删除，Deployment控制器会将该实例替换为群集中另一个节点上的实例。这提供了一种自我修复机制来解决机器故障维护问题。

可以使用Kubernetes命令行界面Kubectl创建和管理Deployment。Kubectl使用Kubernetes API与集群进行交互。

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwkQ4LlPvAULYdfWEpmF0gzWNeGDnZFia1qdbQrVribjeW3O1yjHlUnhG7XARuMEwGbX3x7sGRLQiawpQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Pod

Pod相当于`逻辑主机`的概念，负责托管应用实例。包括一个或多个应用程序容器（如 Docker），以及这些容器的一些共享资源（共享存储、网络、运行信息等）。

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwkQ4LlPvAULYdfWEpmF0gzWyphAyM2ItJeVmulUv9mc4oBdFMUzrc5smwVJIjibhtMKkHk97q5WFtQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Service

Service是一个抽象层，它定义了一组Pod的逻辑集，并为这些Pod支持外部流量暴露、负载平衡和服务发现。

尽管每个Pod 都有一个唯一的IP地址，但是如果没有Service，这些IP不会暴露在群集外部。Service允许您的应用程序接收流量。Service也可以用在ServiceSpec标记type的方式暴露，type类型如下：

- ClusterIP（默认）：在集群的内部IP上公开Service。这种类型使得Service只能从集群内访问。
- NodePort：使用NAT在集群中每个选定Node的相同端口上公开Service。使用`<NodeIP>:<NodePort>`从集群外部访问Service。是ClusterIP的超集。
- LoadBalancer：在当前云中创建一个外部负载均衡器(如果支持的话)，并为Service分配一个固定的外部IP。是NodePort的超集。
- ExternalName：通过返回带有该名称的CNAME记录，使用任意名称（由spec中的externalName指定）公开Service。不使用代理。

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwkQ4LlPvAULYdfWEpmF0gzW3M2Vo4PFZZWtlOrWCFsibvRXz3bhoakukG8F2IrnzLymx4gTjoiaticibw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## Docker安装

> 由于Kubernetes运行需要依赖`容器运行时`（负责运行容器的软件），现比较通用的容器运行时有Docker、containerd和CRI-O。这里选择Docker，先在Linux服务器上安装好Docker环境。

- 安装`yum-utils`：

```sh
yum install -y yum-utils device-mapper-persistent-data lvm2
```

- 为yum源添加docker仓库位置：

```sh
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

- 安装Docker：

```sh
yum install docker-ce
```

- 启动Docker：

```sh
systemctl start docker
```

- 配置阿里云加速

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

## Minikube安装

首先我们需要下载Minikube的二进制安装包并安装：

```sh
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

然后使用如下命令启动Minikube：

```sh
minikube start --force
```

如果你使用的是`root`用户的话会无法启动并提示如下信息，那是因为Minikube不允许使用root权限启动，需要创建一个非root账号再启动；

```sh
* minikube v1.16.0 on Centos 7.6.1810
* Automatically selected the docker driver
* The "docker" driver should not be used with root privileges.
* If you are running minikube within a VM, consider using --driver=none:
*   https://minikube.sigs.k8s.io/docs/reference/drivers/none/

X Exiting due to DRV_AS_ROOT: The "docker" driver should not be used with root privileges.
```

- 这里创建了一个属于`docker`用户组的`macro`用户，并切换到该用户；

```sh
# 创建用户
useradd -u 1024 -g docker macro
# 设置用户密码
passwd macro
# 切换用户
su macro
```

- 再次使用`minikube start`命令启动Minikube，启动成功后会显示如下信息：

```sh
* To pull new external images, you may need to configure a proxy: https://minikube.sigs.k8s.io/docs/reference/networking/proxy/
* Preparing Kubernetes v1.20.0 on Docker 20.10.0 ...
  - Generating certificates and keys ...
  - Booting up control plane ...
  - Configuring RBAC rules ...
* Verifying Kubernetes components...
* Enabled addons: default-storageclass, storage-provisioner
* kubectl not found. If you need it, try: 'minikube kubectl -- get pods -A'
* Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
```

## Kubernetes的使用

### 创建集群

> 通过Minikube我们可以创建一个单节点的K8S集群，集群管理Master和负责运行应用的Node都部署在此节点上。

- 查看Minikube的版本号：

```sh
minikube version
minikube version: v1.16.0
commit: 9f1e482427589ff8451c4723b6ba53bb9742fbb1
```

- 查看kubectl的版本号，第一次使用会直接安装kubectl：

```sh
minikube kubectl version
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202302221700977.png" alt="image-20230222170030849" style="zoom:67%;" />

如果你想直接使用kubectl命令的话，可以将其复制到`/bin`目录下去：

```sh
# 查找kubectl命令的位置
find / -name kubectl
# 找到之后复制到/bin目录下
cp /mydata/docker/volumes/minikube/_data/lib/minikube/binaries/v1.20.0/kubectl /bin/
# 直接使用kubectl命令
kubectl version
```

- 查看集群详细信息：

```sh
kubectl cluster-info
Kubernetes control plane is running at https://192.168.49.2:8443
KubeDNS is running at https://192.168.49.2:8443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

- 查看集群中的所有Node，可以发现Minikube创建了一个单节点的简单集群：

```sh
kubectl get nodes
NAME       STATUS   ROLES                  AGE   VERSION
minikube   Ready    control-plane,master   46m   v1.20.0
```

### 部署应用

> 一旦运行了K8S集群，就可以在其上部署容器化应用程序。通过创建Deployment对象，可以指挥K8S如何创建和更新应用程序的实例。

- 指定好应用镜像并创建一个Deployment，这里创建一个Nginx应用：

```sh
kubectl create deployment kubernetes-nginx --image=nginx:1.10
```

- 创建一个Deployment时K8S会产生如下操作：

- - 选择一个合适的Node来部署这个应用；
  - 将该应用部署到Node上；
  - 当应用异常关闭或删除时重新部署应用。

- 查看所有Deployment：

```sh
kubectl get deployments
NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
kubernetes-nginx      1/1     1            1           21h
```

- 我们可以通过`kubectl proxy`命令创建一个代理，这样就可以通过暴露出来的接口直接访问K8S的API了，这里调用了查询K8S版本的接口；

```sh
[macro@linux-local root]$ kubectl proxy
Starting to serve on 127.0.0.1:8001
[root@linux-local ~]# curl :8001/version
{
  "major": "1",
  "minor": "20",
  "gitVersion": "v1.20.0",
  "gitCommit": "af46c47ce925f4c4ad5cc8d1fca46c7b77d13b38",
  "gitTreeState": "clean",
  "buildDate": "2020-12-08T17:51:19Z",
  "goVersion": "go1.15.5",
  "compiler": "gc",
  "platform": "linux/amd64"
}
```

### 查看应用

> 通过对运行应用的Pod进行操作，可以查看容器日志，也可以执行容器内部命令。

- 查看K8s中所有Pod的状态：

```sh
kubectl get pods
NAME                                   READY   STATUS             RESTARTS   AGE
kubernetes-nginx-78bcc44665-8fnnn      1/1     Running            1          21h
```

- 查看Pod的详细状态，包括IP地址、占用端口、使用镜像等信息；

```sh
kubectl describe pods
Name:         kubernetes-nginx-78bcc44665-8fnnn
Namespace:    default
Priority:     0
Node:         minikube/192.168.49.2
Start Time:   Tue, 05 Jan 2021 13:57:46 +0800
Labels:       app=kubernetes-nginx
              pod-template-hash=78bcc44665
              version=v1
Annotations:  <none>
Status:       Running
IP:           172.17.0.7
IPs:
  IP:           172.17.0.7
Controlled By:  ReplicaSet/kubernetes-nginx-78bcc44665
Containers:
  nginx:
    Container ID:   docker://31eb1277e507ec4cf8a27b66a9f4f30fb919d17f4cd914c09eb4cfe8322504b2
    Image:          nginx:1.10
    Image ID:       docker-pullable://nginx@sha256:6202beb06ea61f44179e02ca965e8e13b961d12640101fca213efbfd145d7575
    Port:           <none>
    Host Port:      <none>
    State:          Running
      Started:      Wed, 06 Jan 2021 09:22:40 +0800
    Last State:     Terminated
      Reason:       Completed
      Exit Code:    0
      Started:      Tue, 05 Jan 2021 14:24:55 +0800
      Finished:     Tue, 05 Jan 2021 17:32:48 +0800
    Ready:          True
    Restart Count:  1
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-dhr4b (ro)
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  default-token-dhr4b:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-dhr4b
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                 node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:          <none>
```

- 将Pod的名称设置为环境变量，方便之后使用`$POD_NAME`来应用Pod的名称：

```sh
export POD_NAME=kubernetes-nginx-78bcc44665-8fnnn
```

- 查看Pod打印的日志：

```sh
kubectl logs $POD_NAME
```

- 使用`exec`可以在Pod的容器中执行命令，这里使用`env`命令查看环境变量：

```sh
kubectl exec $POD_NAME -- env
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=kubernetes-nginx-78bcc44665-8fnnn
KUBERNETES_PORT_443_TCP_ADDR=10.96.0.1
KUBERNETES_SERVICE_HOST=10.96.0.1
KUBERNETES_SERVICE_PORT=443
KUBERNETES_SERVICE_PORT_HTTPS=443
KUBERNETES_PORT=tcp://10.96.0.1:443
KUBERNETES_PORT_443_TCP=tcp://10.96.0.1:443
KUBERNETES_PORT_443_TCP_PROTO=tcp
KUBERNETES_PORT_443_TCP_PORT=443
NGINX_VERSION=1.10.3-1~jessie
HOME=/root
```

- 进入容器内部并执行`bash`命令，如果想退出容器可以使用`exit`命令：

```sh
kubectl exec -ti $POD_NAME -- bash
```

### 公开暴露应用

> 默认Pod无法被集群外部访问，需要创建Service并暴露端口才能被外部访问。

- 创建一个Service来暴露kubernetes-nginx这个Deployment：

```sh
kubectl expose deployment/kubernetes-nginx --type="NodePort" --port 80
```

- 查看K8S中所有Service的状态：

```sh
kubectl get services
NAME               TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
kubernetes         ClusterIP   10.96.0.1        <none>        443/TCP        5h16m
kubernetes-nginx   NodePort    10.105.177.114   <none>        80:31891/TCP   5s
```

- 查看Service的详情，通过`NodePort`属性可以得到暴露到外部的端口；

```sh
kubectl describe services/kubernetes-nginx
Name:                     kubernetes-nginx
Namespace:                default
Labels:                   app=kubernetes-nginx
Annotations:              <none>
Selector:                 app=kubernetes-nginx
Type:                     NodePort
IP Families:              <none>
IP:                       10.106.227.54
IPs:                      10.106.227.54
Port:                     <unset>  80/TCP
TargetPort:               80/TCP
NodePort:                 <unset>  30158/TCP
Endpoints:                172.17.0.7:80
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>
```

- 通过CURL命令通过`Minikube IP:NodePort IP`可以访问Nginx服务，此时将打印Nginx主页信息；

```html
curl $(minikube ip):30158
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

### 标签的使用

> 通过给资源添加Label，可以方便地管理资源（如Deployment、Pod、Service等）。

- 查看Deployment中所包含的Label；

```sh
kubectl describe deployment
Name:                   kubernetes-nginx
Namespace:              default
CreationTimestamp:      Tue, 05 Jan 2021 13:57:46 +0800
Labels:                 app=kubernetes-nginx
Annotations:            deployment.kubernetes.io/revision: 1
Selector:               app=kubernetes-nginx
Replicas:               1 desired | 1 updated | 1 total | 1 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
```

- 通过Label查询Pod：

```sh
kubectl get pods -l app=kubernetes-nginx
NAME                                READY   STATUS    RESTARTS   AGE
kubernetes-nginx-78bcc44665-8fnnn   1/1     Running   1          21h
```

- 通过Label查询Service：

```sh
kubectl get services -l app=kubernetes-nginx
NAME               TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
kubernetes-nginx   NodePort   10.106.227.54   <none>        80:30158/TCP   4m44s
```

- 给Pod添加Label：

```sh
kubectl label pod $POD_NAME version=v1
```

- 查看Pod的详细信息，可以查看Label信息：

```
kubectl describe pods $POD_NAME
Name:         kubernetes-nginx-78bcc44665-8fnnn
Namespace:    default
Priority:     0
Node:         minikube/192.168.49.2
Start Time:   Tue, 05 Jan 2021 13:57:46 +0800
Labels:       app=kubernetes-nginx
              pod-template-hash=78bcc44665
              version=v1
```

- 通过Label查询Pod：

```
kubectl get pods -l version=v1
```

- 通过Label删除服务：

```
kubectl delete service -l app=kubernetes-nginx
NAME               TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
kubernetes         ClusterIP   10.96.0.1       <none>        443/TCP        30h
```

### 可视化管理

> Dashboard是基于网页的K8S用户界面。你可以使用Dashboard将容器应用部署到K8S集群中，也可以对容器应用排错，还能管理集群资源。

- 查看Minikube内置插件，默认情况下Dashboard插件未启用：

```
minikube addons list
|-----------------------------|----------|--------------|
|         ADDON NAME          | PROFILE  |    STATUS    |
|-----------------------------|----------|--------------|
| dashboard                   | minikube | disabled     |
| default-storageclass        | minikube | enabled ✅   |
|-----------------------------|----------|--------------|
```

- 启用Dashboard插件：

```
minikube addons enable dashboard
```

- 开启Dashboard，通过`--url`参数不会打开管理页面，并可以在控制台获得访问路径：

```
minikube dashboard --url
* Verifying dashboard health ...
* Launching proxy ...
* Verifying proxy health ...
http://127.0.0.1:44469/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/
```

- 要想从外部访问Dashboard，需要从使用kubectl设置代理才行，`--address`设置为你的服务器地址；

```
kubectl proxy --port=44469 --address='192.168.5.94' --accept-hosts='^.*' &
```

- 从外部访问服务器需要开启防火墙端口；

```
# 切换到root用户
su -
# 开启端口
firewall-cmd --zone=public --add-port=44469/tcp --permanent
# 重启防火墙
firewall-cmd --reload
```

- 通过如下地址即可访问Dashboard：

```
http://192.168.5.94:44469/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/
```

- 查看K8S集群中的资源状态信息：

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwkQ4LlPvAULYdfWEpmF0gzW0bSkBSbbItByTDPhL7drfPfQEW9V3GGOX1We3UuzMIeIjTpNK3pWDg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 通过yaml脚本创建K8S资源：

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwkQ4LlPvAULYdfWEpmF0gzWj4khFEQ24ps8J62oibtgxbnMKmfdiaoZE181zuzbNjrupEjCcyVWlQdg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 查看K8S中所有Pod的状态信息，通过更多按钮可以查看容器日志和执行内部命令。

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwkQ4LlPvAULYdfWEpmF0gzW0VGIVmsv56qYBMch3sFDjVxQ98XOicGZYXEtKMS8EysiajUGNqWzaPIg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 总结

当我们的应用需要部署在多个物理机上时，传统的做法是一个个物理机器去部署。如果我们使用了K8S的话，就可以把这些物理机认为是一个集群，只需通过K8S把应用部署到集群即可，无需关心物理机的部署细节。同时K8S提供了水平扩容、自动装箱、自动修复等功能，大大减少了应用集群化部署的工作量。

[自从上了K8S，项目更新都不带停机的！ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247488983&idx=1&sn=90e2650a28f4506158d63923622a2c55&chksm=fc2fa9dfcb5820c99d10586f69a60c7683b2c35b6c5790c36f0bc843f95ab71672ee071c54a2&mpshare=1&scene=23&srcid=0723wLtGM4NBCoHIELsnp8Bd&sharer_sharetime=1658539323002&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

# Kubernetes 上 Java 应用的最佳实践

在本文中，您将了解在 Kubernetes 上运行 Java 应用程序的最佳实践。大多数这些建议也适用于其他语言。但是，我正在考虑 Java 特性范围内的所有规则，并且还展示了可用于基于 JVM 的应用程序的解决方案和工具。当使用最流行的 Java 框架（如 Spring Boot 或 Quarkus）时，这些 Kubernetes 建议中的一些是设计强制的。我将向您展示如何有效地利用它们来简化开发人员的生活。

## 1、不要将 Limit 设置得太低

我们是否应该为 Kubernetes 上的 Java 应用设置 limit ？答案似乎显而易见。有许多工具可以验证您的 Kubernetes YAML 清单，如果您没有设置 CPU 或内存 limit ，它们肯定会打印警告。不过，社区对此也有一些“热议”。这是一篇有趣的文章，不建议设置任何 CPU limit 。这是另一篇文章，作为对上一篇文章的对比，他们考虑 CPU limit 。但我们也可以针对内存 limit 开始类似的讨论。特别是在 Java 应用程序的上下文中。

然而，对于内存管理，这个命题似乎大不相同。让我们阅读另一篇文章——这次是关于内存 limit 和 request 的。简而言之，它建议始终设置内存 limit。此外，限制应与 request 相同。在 Java 应用程序的上下文中，我们可以使用 `-Xmx` 、 `-XX:MaxMetaspaceSize` 或 `-XX:ReservedCodeCacheSize` 等 JVM 参数限制内存也很重要。无论如何，从 Kubernetes 的角度来看，pod 接收它 request 的资源。Limit 与它无关。

这一切让我得出了今天的第一个建议—A—不要将你的 limit 设置得太低。即使您设置了 CPU limit ，也不应该影响您的应用程序。例如，您可能知道，即使您的 Java 应用程序在正常工作中不会消耗太多 CPU，但它需要大量 CPU 才能快速启动。对于我在 Kubernetes 上连接 MongoDB 的简单 Spring Boot 应用程序，无限制和甚至 0.5 核之间的差异是显着的。通常它在 10 秒以下开始：

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbudIQlbASZ24icIMd3n9Ve5pRBLTfmFP6P54qXaKwibpF8IsbPWotXtviayvdaVN7bwXE0tZGEMSLvV7A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

将 CPU limit 设置为 500 millicores ，它开始大约 30 秒：

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbudIQlbASZ24icIMd3n9Ve5pRice8aswv1rGc0DenKZ3cjdfBbFkJeUbDmibfYxib7AwHgNurf2aGZtt5A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

当然，我们可以找到一些例子。但我们也会在下一节中讨论它们。

## 2、首先考虑内存使用

让我们只关注内存 limit 。如果您在 Kubernetes 上运行 Java 应用程序，则有两个级别的最大使用 limit ：容器和 JVM。但是，如果您没有为 JVM 指定任何设置，也有一些默认值。如果您不设置 -Xmx 参数，JVM 会将其最大堆大小设置为可用 RAM 的大约 25%。该值是根据容器内可见的内存计算的。一旦您不在容器级别设置 limit ，JVM 将看到节点的整个内存。

在 Kubernetes 上运行应用程序之前，您至少应该测量它在预期负载下消耗了多少内存。幸运的是，有一些工具可以优化在容器中运行的 Java 应用程序的内存配置。例如，Paketo Buildpacks 带有内置内存计算器，它使用公式 Heap = 总容器内存 - Non-Heap - Headroom 计算 JVM 的 -Xmx 参数。另一方面，非堆值是使用以下公式计算的：`Non-Heap = Direct Memory + Metaspace + Reserved Code Cache + (Thread Stack * Thread Count)` 。

Paketo Buildpacks 目前是构建 Spring Boot 应用程序的默认选项（使用 `mvn spring-boot:build-image` 命令）。让我们为我们的示例应用程序尝试一下。假设我们将内存限制设置为 512M，它将在 130M 的级别计算 -Xmx 。

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbudIQlbASZ24icIMd3n9Ve5pR1g5y5PZyxwSwEYWia85WLtDR88jvKydw6WaZXeAEiadViaEicIc5kNIPgQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

我的应用程序可以吗？我至少应该执行一些负载测试来验证我的应用程序在高流量下的性能。但再一次 - 不要将 limit 设置得太低。例如，对于 1024M 限制， -Xmx 等于 650M。

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbudIQlbASZ24icIMd3n9Ve5pRDw0ibWF3ZtTBBiaeHh8DnjoCutSdjvIsUeOV1kg4ibpxFTwbqwj2lYy8A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

如您所见，我们使用 JVM 参数处理内存使用情况。它可以防止我们在第一节提到的文章中描述的 OOM kills 。因此，将 request 设置为与 limit 相同的级别并没有太大意义。我建议将其设置为比正常使用高一点——比方说多 20%。

## 3、适当的 liveness 和 readiness 探针

### 3.1 介绍

了解 Kubernetes 中的 liveness 和 readiness 探针之间的区别至关重要。如果这两个探针都没有仔细实施，它们可能会降低服务的整体运行，例如导致不必要的重启。第三种类型的探针，启动探针，是 Kubernetes 中一个相对较新的特性。它允许我们避免在 liveness 或 readiness 探针上设置 initialDelaySeconds ，因此如果您的应用程序启动需要很长时间，它特别有用。有关 Kubernetes 探针的一般和最佳实践的更多详细信息，我可以推荐那篇非常有趣的文章。

Liveness 探针用于决定是否重启容器。如果应用程序因任何原因不可用，有时重启容器是有意义的。另一方面，readiness 探针用于确定容器是否可以处理传入流量。如果一个 pod 被识别为未就绪，它将被从负载平衡中移除。readiness 探针失败不会导致 pod 重启。Web 应用程序最典型的 liveness 或 readiness 探针是通过 HTTP 端点实现的。

由于 liveness 探针的后续失败会导致 pod 重新启动，因此它不应检查您的应用程序集成的可用性。这些事情应该由 readiness 验证。

### 3.2 配置详情

好消息是，最流行的 Java 框架（如 Spring Boot 或 Quarkus）提供了两种 Kubernetes 探针的自动配置实现。他们遵循最佳实践，因此我们通常不必了解基础知识。但是，在 Spring Boot 中，除了包含 Actuator 模块之外，您还需要使用以下属性启用它们：

```
management:
  endpoint: 
    health:
      probes:
        enabled: true
```

由于 Spring Boot Actuator 提供了多个端点（例如 metric、 trace），因此最好将其公开在与默认端口不同的端口（通常为 8080 ）。当然，同样的规则也适用于其他流行的 Java 框架。另一方面，一个好的做法是检查您的主要应用程序端口——尤其是在 readiness 探针中。

因为它定义了我们的应用程序是否准备好处理传入的请求，所以它也应该在主端口上监听。它与 liveness probe 看起来正好相反。如果整个工作线程池都很忙，我不想重新启动我的应用程序。我只是不想在一段时间内收到传入流量。

我们还可以自定义 Kubernetes 探针的其他方面。假设我们的应用程序连接到外部系统，但我们没有在我们的 readiness 探针中验证该集成。它并不重要，不会对我们的运营状态产生直接影响。这是一个配置，它允许我们在探针中仅包含选定的集成集 (1)，并在主服务器端口上公开 readiness 情况 (2) 。

```
spring:
  application:
    name: sample-spring-boot-on-kubernetes
  data:
    mongodb:
      host: ${MONGO_URL}
      port: 27017
      username: ${MONGO_USERNAME}
      password: ${MONGO_PASSWORD}
      database: ${MONGO_DATABASE}
      authentication-database: admin

management:
  endpoint.health:
    show-details: always
    group:
      readiness:
        include: mongo # (1)
        additional-path: server:/readiness # (2)
    probes:
      enabled: true
  server:
    port: 8081
```

几乎没有任何应用可以不依赖外部解决方案（如数据库、消息代理或其他应用程序）。在配置 readiness 探针时，我们应该仔细考虑到该系统的连接设置。首先你应该考虑外部服务不可用的情况。你将如何处理？我建议将这些超时减少到较低的值，如下所示。

```
spring:
  application:
    name: sample-spring-kotlin-microservice
  datasource:
    url: jdbc:postgresql://postgres:5432/postgres
    username: postgres
    password: postgres123
    hikari:
      connection-timeout: 2000
      initialization-fail-timeout: 0
  jpa:
    database-platform: org.hibernate.dialect.PostgreSQLDialect
  rabbitmq:
    host: rabbitmq
    port: 5672
    connection-timeout: 2000
```

## 4、选择合适的 JDK

如果您已经使用 Dockerfile 构建了镜像，那么您可能使用的是来自 Docker Hub 的官方 OpenJDK 基础镜像。然而，目前，镜像网站上的公告称它已被正式弃用，所有用户都应该找到合适的替代品。我想这可能会让人很困惑，所以你会在这里找到对原因的详细解释。

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbudIQlbASZ24icIMd3n9Ve5pRSV456OgKiaI9uX0zbJqJp1ia4T4cQ1Vyhdz3H1aTyezc6QSyOdibpKHdA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

好吧，让我们考虑一下我们应该选择哪个备选方案。不同的供应商提供多种替代品。如果您正在寻找它们之间的详细比较，您应该访问以下站点。17版本推荐使用 Eclipse Temurin。

另一方面，Jib 或 Cloud Native Buildpacks 等最流行的镜像构建工具会自动为您选择供应商。默认情况下，Jib 使用 Eclipse Temurin，而 Paketo Buildpacks 使用 Bellsoft Liberica 实现。当然，您可以轻松地覆盖这些设置。我认为，例如，如果您在与 JDK 提供程序（如 AWS 和 Amazon Corretto）匹配的环境中运行您的应用程序，这可能是有意义的。

假设我们使用 Paketo Buildpacks 和 Skaffold 在 Kubernetes 上部署 Java 应用程序。为了将默认的 Bellsoft Liberica buildpack 替换为另一个，我们只需要在 buildpacks 部分中逐字设置它。下面是一个利用 Amazon Corretto buildpack 的示例。

```
apiVersion: skaffold/v2beta22
kind: Config
metadata:
  name: sample-spring-boot-on-kubernetes
build:
  artifacts:
    - image: piomin/sample-spring-boot-on-kubernetes
      buildpacks:
        builder: paketobuildpacks/builder:base
        buildpacks:
          - paketo-buildpacks/amazon-corretto
          - paketo-buildpacks/java
        env:
          - BP_JVM_VERSION=17
```

我们还可以使用不同的 JDK 供应商轻松测试我们的应用程序的性能。如果您正在寻找此类比较的示例，您可以阅读我描述此类测试和结果的文章。我使用几个可用的 Paketo Java 构建包测量了与 Mongo 数据库交互的 Spring Boot 3 应用程序的不同 JDK 性能。

## 5、考虑迁移到原生编译

原生编译是 Java 世界中真正的“游戏规则改变者”。但我敢打赌，你们中没有多少人使用它——尤其是在生产中。当然，在将现有应用程序迁移到本机编译的过程中存在（现在仍然存在）许多挑战。GraalVM 在构建期间执行的静态代码分析可能会导致类似 ClassNotFound 或 MethodNotFound 的错误。为了克服这些挑战，我们需要提供一些提示让 GraalVM 了解代码的动态元素。这些提示的数量通常取决于库的数量和应用程序中使用的语言功能的一般数量。

像 Quarkus 或 Micronaut 这样的 Java 框架试图通过设计解决与原生编译相关的挑战。例如，他们尽可能避免使用反射。Spring Boot 还通过 Spring Native 项目大大改进了原生编译支持。因此，我在这方面的建议是，如果您要创建一个新的应用程序，请按照为本机编译做好准备的方式进行准备。例如，使用 Quarkus，您可以简单地生成一个 Maven 配置，其中包含用于构建原生可执行文件的专用配置文件。

```
<profiles>
  <profile>
    <id>native</id>
    <activation>
      <property>
        <name>native</name>
      </property>
    </activation>
    <properties>
      <skipITs>false</skipITs>
      <quarkus.package.type>native</quarkus.package.type>
    </properties>
  </profile>
</profiles>
```

添加后，您可以使用以下命令进行本机构建：

```
$ mvn clean package -Pnative
```

然后你可以分析在构建过程中是否有任何问题。即使您现在不在生产环境中运行原生应用程序（例如您的组织不批准它），您也应该将 GraalVM 编译作为您接受管道中的一个步骤。您可以使用最流行的框架轻松地为您的应用程序构建 Java 原生镜像。例如，使用 Spring Boot，您只需在 Maven pom.xml 中提供以下配置，如下所示：

```
<plugin>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-maven-plugin</artifactId>
  <executions>
    <execution>
      <goals>
        <goal>build-info</goal>
        <goal>build-image</goal>
      </goals>
    </execution>
  </executions>
  <configuration>
    <image>
      <builder>paketobuildpacks/builder:tiny</builder>
      <env>
        <BP_NATIVE_IMAGE>true</BP_NATIVE_IMAGE>
        <BP_NATIVE_IMAGE_BUILD_ARGUMENTS>
          --allow-incomplete-classpath
        </BP_NATIVE_IMAGE_BUILD_ARGUMENTS>
      </env>
    </image>
  </configuration>
</plugin>
```

## 6、正确配置日志记录

在编写 Java 应用程序时，日志记录可能不是您首先考虑的事情。然而，在全局范围内，它变得非常重要，因为我们需要能够收集、存储数据，并最终快速搜索和呈现特定条目。最佳做法是将应用程序日志写入标准输出 (stdout) 和标准错误 (stderr) 流。Fluentd 是一种流行的开源日志聚合器，它允许您从 Kubernetes 集群收集日志、处理它们，然后将它们发送到您选择的数据存储后端。它与 Kubernetes 部署无缝集成。

Fluentd 尝试将数据结构化为 JSON 以统一不同来源和目的地的日志记录。假设那样，最好的方法可能是以这种格式准备日志。使用 JSON 格式，我们还可以轻松地包含用于标记日志的附加字段，然后使用各种条件在可视化工具中轻松搜索它们。

为了将我们的日志格式化为 Fluentd 可读的 JSON，我们可以在 Maven 依赖项中包含 Logstash Logback 编码器库。

```
<dependency>
   <groupId>net.logstash.logback</groupId>
   <artifactId>logstash-logback-encoder</artifactId>
   <version>7.2</version>
</dependency>
```

然后我们只需要在文件 logback-spring.xml 中为我们的 Spring Boot 应用程序设置一个默认的控制台日志 Appender 。

```
<configuration>
    <appender name="consoleAppender" class="ch.qos.logback.core.ConsoleAppender">
        <encoder class="net.logstash.logback.encoder.LogstashEncoder"/>
    </appender>
    <logger name="jsonLogger" additivity="false" level="DEBUG">
        <appender-ref ref="consoleAppender"/>
    </logger>
    <root level="INFO">
        <appender-ref ref="consoleAppender"/>
    </root>
</configuration>
```

我们是否应该避免使用额外的日志 appenders ，而只是将日志打印到标准输出？根据我的经验，答案是——不。您仍然可以使用其他机制来发送日志。特别是如果您使用不止一种工具来收集组织中的日志——例如 Kubernetes 上的内部堆栈和外部的全局堆栈。

就个人而言，我正在使用一种工具来帮助我解决性能问题，例如消息代理作为代理。在 Spring Boot 中，我们可以轻松地使用 RabbitMQ。只需包括以下 starter：

```
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

然后你需要在 logback-spring.xml 中提供一个类似的 appender 配置：

```
<?xml version="1.0" encoding="UTF-8"?>
<configuration>

  <springProperty name="destination" source="app.amqp.url" />

  <appender name="AMQP"
    class="org.springframework.amqp.rabbit.logback.AmqpAppender">
    <layout>
      <pattern>
{
  "time": "%date{ISO8601}",
  "thread": "%thread",
  "level": "%level",
  "class": "%logger{36}",
  "message": "%message"
}
      </pattern>
    </layout>

    <addresses>${destination}</addresses>  
    <applicationId>api-service</applicationId>
    <routingKeyPattern>logs</routingKeyPattern>
    <declareExchange>true</declareExchange>
    <exchangeName>ex_logstash</exchangeName>

  </appender>

  <root level="INFO">
    <appender-ref ref="AMQP" />
  </root>

</configuration>
```

## 7、创建集成测试

好的，我知道——它与 Kubernetes 没有直接关系。但是由于我们使用 Kubernetes 来管理和编排容器，我们还应该对容器进行集成测试。幸运的是，使用 Java 框架，我们可以大大简化该过程。

例如，Quarkus 允许我们用 `@QuarkusIntegrationTest` 注释测试。结合 Quarkus 容器构建功能，它是一个非常强大的解决方案。我们可以针对包含该应用程序的已构建镜像运行测试。首先，让我们包含 Quarkus Jib 模块：

```
<dependency>
   <groupId>io.quarkus</groupId>
   <artifactId>quarkus-container-image-jib</artifactId>
</dependency>
```

然后我们必须通过在 application.properties 文件中将 `quarkus.container-image.build` 属性设置为 true 来启用容器构建。在测试类中，我们可以使用 `@TestHTTPResource` 和 `@TestHTTPEndpoint` 注解注入测试服务器 URL。

然后我们使用 `RestClientBuilder` 创建一个客户端并调用在容器上启动的服务。测试类的名

字不是偶然的。为了被自动检测为集成测试，它有 IT 后缀。

```
@QuarkusIntegrationTest
public class EmployeeControllerIT {

    @TestHTTPEndpoint(EmployeeController.class)
    @TestHTTPResource
    URL url;

    @Test
    void add() {
        EmployeeService service = RestClientBuilder.newBuilder()
                .baseUrl(url)
                .build(EmployeeService.class);
        Employee employee = new Employee(1L, 1L, "Josh Stevens", 
                                         23, "Developer");
        employee = service.add(employee);
        assertNotNull(employee.getId());
    }

    @Test
    public void findAll() {
        EmployeeService service = RestClientBuilder.newBuilder()
                .baseUrl(url)
                .build(EmployeeService.class);
        Set<Employee> employees = service.findAll();
        assertTrue(employees.size() >= 3);
    }

    @Test
    public void findById() {
        EmployeeService service = RestClientBuilder.newBuilder()
                .baseUrl(url)
                .build(EmployeeService.class);
        Employee employee = service.findById(1L);
        assertNotNull(employee.getId());
    }
}
```

您可以在我之前关于使用 Quarkus 进行高级测试的文章中找到有关该过程的更多详细信息。最终效果如下图所示。当我们在构建期间使用 `mvn clean verify` 命令运行测试时，我们的测试在构建容器镜像后执行。

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbudIQlbASZ24icIMd3n9Ve5pR0ibjf41gIcL8MoRZVvkmmtA4zUXzFoNnQ3E0ib2rN2OCmqcUWYcIE3cA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

该 Quarkus 功能基于 Testcontainers 框架。我们还可以将 Testcontainer 与 Spring Boot 一起使用。这是 Spring REST 应用程序及其与 PostgreSQL 数据库集成的示例测试。

```
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class PersonControllerTests {

    @Autowired
    TestRestTemplate restTemplate;

    @Container
    static PostgreSQLContainer<?> postgres = 
       new PostgreSQLContainer<>("postgres:15.1")
            .withExposedPorts(5432);

    @DynamicPropertySource
    static void registerMySQLProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Test
    @Order(1)
    void add() {
        Person person = Instancio.of(Person.class)
                .ignore(Select.field("id"))
                .create();
        person = restTemplate.postForObject("/persons", person, Person.class);
        Assertions.assertNotNull(person);
        Assertions.assertNotNull(person.getId());
    }

    @Test
    @Order(2)
    void updateAndGet() {
        final Integer id = 1;
        Person person = Instancio.of(Person.class)
                .set(Select.field("id"), id)
                .create();
        restTemplate.put("/persons", person);
        Person updated = restTemplate.getForObject("/persons/{id}", Person.class, id);
        Assertions.assertNotNull(updated);
        Assertions.assertNotNull(updated.getId());
        Assertions.assertEquals(id, updated.getId());
    }

}
```



# docker 和 k8s

2010年，几个搞IT的年轻人，在美国旧金山成立了一家名叫“dotCloud”的公司。



![图片](https://mmbiz.qpic.cn/mmbiz_png/rLGOIHABwEqYNaicmtJwy21tiaUqoatfBdWEfzwIQ5DX0ZUHaIpQbwLjHvcmkWpfuEmFGysgzINC6l4GE4NgycgA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这家公司主要提供基于PaaS的云计算技术服务。具体来说，是和LXC有关的容器技术。

![图片](https://mmbiz.qpic.cn/mmbiz_png/rLGOIHABwEqYNaicmtJwy21tiaUqoatfBdibnIYP37BdjazXE6JsiblhtuqvHUelAXmaQ6NIicZ4y5j3B1EjLa6SWOA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

LXC，就是Linux容器虚拟技术（Linux container）

后来，dotCloud公司将自己的容器技术进行了简化和标准化，并命名为——Docker。

![图片](https://mmbiz.qpic.cn/mmbiz_png/rLGOIHABwEqYNaicmtJwy21tiaUqoatfBdUgH4VlIxgFEdaFsc9OVRg2S7UxJgT6e1C75ThFAHFDOYeqq6b6mjBg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

Docker技术诞生之后，并没有引起行业的关注。而dotCloud公司，作为一家小型创业企业，在激烈的竞争之下，也步履维艰。

正当他们快要坚持不下去的时候，脑子里蹦出了“开源”的想法。

什么是“开源”？开源，就是开放源代码。也就是将原来内部保密的程序源代码开放给所有人，然后让大家一起参与进来，贡献代码和意见。

![图片](https://mmbiz.qpic.cn/mmbiz_png/rLGOIHABwEqYNaicmtJwy21tiaUqoatfBdvpjufD355ASUibrdzricDCPIx4qQibiaF6Xdx1npic5ia3jT3l4T4lmTMspw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

Open Source，开源

有的软件是一开始就开源的。也有的软件，是混不下去，创造者又不想放弃，所以选择开源。自己养不活，就吃“百家饭”嘛。

2013年3月，dotCloud公司的创始人之一，Docker之父，28岁的Solomon Hykes正式决定，将Docker项目开源。

![图片](https://mmbiz.qpic.cn/mmbiz_png/rLGOIHABwEqYNaicmtJwy21tiaUqoatfBd6SGWHIxAXmiakicO43yzTHTdp0H9v5SorhVO4puwNreR2qoibwMkNJ9NA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

不开则已，一开惊人。

越来越多的IT工程师发现了Docker的优点，然后蜂拥而至，加入Docker开源社区。

Docker的人气迅速攀升，速度之快，令人瞠目结舌。

开源当月，Docker 0.1 版本发布。此后的每一个月，Docker都会发布一个版本。到2014年6月9日，Docker 1.0 版本正式发布。

此时的Docker，已经成为行业里人气最火爆的开源技术，没有之一。甚至像Google、微软、Amazon、VMware这样的巨头，都对它青睐有加，表示将全力支持。

Docker火了之后，dotCloud公司干脆把公司名字也改成了Docker Inc. 。

Docker和容器技术为什么会这么火爆？说白了，就是因为它“轻”。

在容器技术之前，业界的网红是虚拟机。虚拟机技术的代表，是VMWare和OpenStack。

![图片](https://mmbiz.qpic.cn/mmbiz_png/rLGOIHABwEqYNaicmtJwy21tiaUqoatfBd8clroKZH0ZZCkvBIicDfmWOmVQ2pdsaEyXJCMo66QvYQuO0xtqYQgNQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

相信很多人都用过虚拟机。虚拟机，就是在你的操作系统里面，装一个软件，然后通过这个软件，再模拟一台甚至多台“子电脑”出来。

![图片](https://mmbiz.qpic.cn/mmbiz_png/rLGOIHABwEqYNaicmtJwy21tiaUqoatfBdBawficrQrGo9M8IkibdNWp9uLWYKxaNl7uBIubCS9c3pCicxT4yj8lVAw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

虚拟机，类似于“子电脑”

在“子电脑”里，你可以和正常电脑一样运行程序，例如开QQ。如果你愿意，你可以变出好几个“子电脑”，里面都开上QQ。“子电脑”和“子电脑”之间，是相互隔离的，互不影响。

虚拟机属于虚拟化技术。而Docker这样的容器技术，也是虚拟化技术，属于轻量级的虚拟化。

虚拟机虽然可以隔离出很多“子电脑”，但占用空间更大，启动更慢，虚拟机软件可能还要花钱（例如VMWare）。

而容器技术恰好没有这些缺点。它不需要虚拟出整个操作系统，只需要虚拟一个小规模的环境（类似“沙箱”）。

![图片](https://mmbiz.qpic.cn/mmbiz_png/rLGOIHABwEqYNaicmtJwy21tiaUqoatfBdZKib3nmpVUCKqnslxt2xvCSDDsAlbSd8BG9uanx79m2SgcmOFQD5auw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

它启动时间很快，几秒钟就能完成。而且，它对资源的利用率很高（一台主机可以同时运行几千个Docker容器）。此外，它占的空间很小，虚拟机一般要几GB到几十GB的空间，而容器只需要MB级甚至KB级。

![图片](https://mmbiz.qpic.cn/mmbiz_png/rLGOIHABwEqYNaicmtJwy21tiaUqoatfBdwasPlRDV398HicHwKVTHqDicnmHBJqBk6g01Zm7d1iamAr8YKl6A7EDdw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

正因为如此，容器技术受到了热烈的欢迎和追捧，发展迅速。

我们具体来看看Docker。

大家需要注意，Docker本身并不是容器，它是创建容器的工具，是应用容器引擎。

想要搞懂Docker，其实看它的两句口号就行。

第一句，是“Build, Ship and Run”。

![图片](https://mmbiz.qpic.cn/mmbiz_png/rLGOIHABwEqYNaicmtJwy21tiaUqoatfBd9m78eY6pVet5tAmDdXzS1IQ7sDibOWiaBdf4AWnffQeeDUa8yybWiayDw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

也就是，“搭建、发送、运行”，三板斧。

举个例子：

我来到一片空地，想建个房子，于是我搬石头、砍木头、画图纸，一顿操作，终于把这个房子盖好了。

![图片](https://mmbiz.qpic.cn/mmbiz_png/rLGOIHABwEqYNaicmtJwy21tiaUqoatfBdUt1l8wG2OWaA5ib3xgR5LQE597j5f4CxqEWVcjw371icfjjFMsG2eaVg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

结果，我住了一段时间，想搬到另一片空地去。这时候，按以往的办法，我只能再次搬石头、砍木头、画图纸、盖房子。

但是，跑来一个老巫婆，教会我一种魔法。

这种魔法，可以把我盖好的房子复制一份，做成“镜像”，放在我的背包里。

![图片](https://mmbiz.qpic.cn/mmbiz_png/rLGOIHABwEqYNaicmtJwy21tiaUqoatfBd3Pj0EEua4h58OibBQQ4MYCuI1WvRyeUKOXUhPDVWKdgwRXQGibc1uVCg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

等我到了另一片空地，就用这个“镜像”，复制一套房子，摆在那边，拎包入住。

![图片](https://mmbiz.qpic.cn/mmbiz_png/rLGOIHABwEqYNaicmtJwy21tiaUqoatfBdkPJAno2WqWW8RGu1w6EIYtxraa6nE4hkKgHrJw8NviaWH7PGiaPDibD0A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

怎么样？是不是很神奇？

所以，Docker的第二句口号就是：“Build once，Run anywhere（搭建一次，到处能用）”。

Docker技术的三大核心概念，分别是：

镜像（Image） 容器（Container） 仓库（Repository）

我刚才例子里面，那个放在包里的“镜像”，就是Docker镜像。而我的背包，就是Docker仓库。我在空地上，用魔法造好的房子，就是一个Docker容器。

说白了，这个Docker镜像，是一个特殊的文件系统。它除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（例如环境变量）。镜像不包含任何动态数据，其内容在构建之后也不会被改变。

也就是说，每次变出房子，房子是一样的，但生活用品之类的，都是不管的。谁住谁负责添置。

每一个镜像可以变出一种房子。那么，我可以有多个镜像呀！

也就是说，我盖了一个欧式别墅，生成了镜像。另一个哥们可能盖了一个中国四合院，也生成了镜像。还有哥们，盖了一个非洲茅草屋，也生成了镜像。。。

这么一来，我们可以交换镜像，你用我的，我用你的，岂不是很爽？

![图片](https://mmbiz.qpic.cn/mmbiz_png/rLGOIHABwEqYNaicmtJwy21tiaUqoatfBd4avJHl9gOBcfk8h5so63naaJxfpmBWmHAqgO2NKOlQL6Q8olwNENHQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

于是乎，就变成了一个大的公共仓库。

负责对Docker镜像进行管理的，是Docker Registry服务（类似仓库管理员）。

不是任何人建的任何镜像都是合法的。万一有人盖了一个有问题的房子呢？

所以，Docker Registry服务对镜像的管理是非常严格的。

最常使用的Registry公开服务，是官方的Docker Hub，这也是默认的 Registry，并拥有大量的高质量的官方镜像。

好了，说完了Docker，我们再把目光转向K8S。

就在Docker容器技术被炒得热火朝天之时，大家发现，如果想要将Docker应用于具体的业务实现，是存在困难的——编排、管理和调度等各个方面，都不容易。于是，人们迫切需要一套管理系统，对Docker及容器进行更高级更灵活的管理。

就在这个时候，K8S出现了。

K8S，就是基于容器的集群管理平台，它的全称，是kubernetes。

![图片](https://mmbiz.qpic.cn/mmbiz_png/rLGOIHABwEqYNaicmtJwy21tiaUqoatfBdM19VQMQyWtASjB5CBNmTNdYplQTummrC04icMz2fg5MLxTIoNPEmo9w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

Kubernetes 这个单词来自于希腊语，含义是舵手或领航员。K8S是它的缩写，用“8”字替代了“ubernete”这8个字符。

和Docker不同，K8S的创造者，是众人皆知的行业巨头——Google。

然而，K8S并不是一件全新的发明。它的前身，是Google自己捣鼓了十多年的Borg系统。

K8S是2014年6月由Google公司正式公布出来并宣布开源的。

同年7月，微软、Red Hat、IBM、Docker、CoreOS、 Mesosphere和Saltstack 等公司，相继加入K8S。

之后的一年内，VMware、HP、Intel等公司，也陆续加入。

2015年7月，Google正式加入OpenStack基金会。与此同时，Kuberentes v1.0正式发布。

目前，kubernetes的版本已经发展到V1.13。

K8S的架构，略微有一点复杂，我们简单来看一下。

一个K8S系统，通常称为一个K8S集群（Cluster）。

这个集群主要包括两个部分：

一个Master节点（主节点） 一群Node节点（计算节点）

![图片](https://mmbiz.qpic.cn/mmbiz_png/rLGOIHABwEqYNaicmtJwy21tiaUqoatfBdMc60uPY6ymZe0zqibbV16K7yC94R0E0FFXCuVl0VibEHtNp6UvcSiayibw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

一看就明白：Master节点主要还是负责管理和控制。Node节点是工作负载节点，里面是具体的容器。

深入来看这两种节点。

首先是Master节点。

![图片](https://mmbiz.qpic.cn/mmbiz_png/rLGOIHABwEqYNaicmtJwy21tiaUqoatfBdoWhcWZMkn5N65OEIBdicxCMWXoafkhdcGk7koTqw6qzfxKmdSEX6eFA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

Master节点包括API Server、Scheduler、Controller manager、etcd。

API Server是整个系统的对外接口，供客户端和其它组件调用，相当于“营业厅”。

Scheduler负责对集群内部的资源进行调度，相当于“调度室”。

Controller manager负责管理控制器，相当于“大总管”。

然后是Node节点。

![图片](https://mmbiz.qpic.cn/mmbiz_png/rLGOIHABwEqYNaicmtJwy21tiaUqoatfBd6nACOMFBdiaPU9iaAtbxGHrKibDx65WyERpSQl6ztRmRZ07B0KtV3wI8g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

Node节点包括Docker、kubelet、kube-proxy、Fluentd、kube-dns（可选），还有就是Pod。

Pod是Kubernetes最基本的操作单元。一个Pod代表着集群中运行的一个进程，它内部封装了一个或多个紧密相关的容器。除了Pod之外，K8S还有一个Service的概念，一个Service可以看作一组提供相同服务的Pod的对外访问接口。这段不太好理解，跳过吧。

Docker，不用说了，创建容器的。

Kubelet，主要负责监视指派到它所在Node上的Pod，包括创建、修改、监控、删除等。

Kube-proxy，主要负责为Pod对象提供代理。

Fluentd，主要负责日志收集、存储与查询。

是不是有点懵？唉，三言两语真的很难讲清楚，继续跳过吧。

Docker和K8S都介绍完了，然而文章并没有结束。

接下来的部分，是写给核心网工程师甚至所有通信工程师看的。

从几十年前的1G，到现在的4G，再到将来的5G，移动通信发生了翻天覆地的变化，核心网亦是如此。

但是，如果你仔细洞察这些变化，会发现，所谓的核心网，其实本质上并没有发生改变，无非就是很多的服务器而已。不同的核心网网元，就是不同的服务器，不同的计算节点。

变化的，是这些“服务器”的形态和接口：形态，从机柜单板，变成机柜刀片，从机柜刀片，变成X86通用刀片服务器；接口，从中继线缆，变成网线，从网线，变成光纤。

就算变来变去，还是服务器，是计算节点，是CPU。

既然是服务器，那么就势必会和IT云计算一样，走上虚拟化的道路。毕竟，虚拟化有太多的优势，例如前文所说的低成本、高利用率、充分灵活、动态调度，等等。

前几年，大家以为虚拟机是核心网的终极形态。目前看来，更有可能是容器化。这几年经常说的NFV（网元功能虚拟化），也有可能改口为NFC（网元功能容器化）。

以VoLTE为例，如果按以前2G/3G的方式，那需要大量的专用设备，分别充当EPC和IMS的不同网元。

![图片](https://mmbiz.qpic.cn/mmbiz_png/rLGOIHABwEqYNaicmtJwy21tiaUqoatfBd6SkTz0dCM4CjribvCuvp1WPUMpDDgp0NjmSLsZsKprU0FibS6ahsEbHw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

VoLTE相关的网元

而采用容器之后，很可能只需要一台服务器，创建十几个容器，用不同的容器，来分别运行不同网元的服务程序。

![图片](https://mmbiz.qpic.cn/mmbiz_png/rLGOIHABwEqYNaicmtJwy21tiaUqoatfBdYw9dBrXJUxsZEfic26QLRDRo3q40kqicHBBtrPclFSibJibalSsnDRw75A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这些容器，随时可以创建，也可以随时销毁。还能够在不停机的情况下，随意变大，随意变小，随意变强，随意变弱，在性能和功耗之间动态平衡。

简直完美！

5G时代，核心网采用微服务架构，也是和容器完美搭配——单体式架构（Monolithic）变成微服务架构（Microservices），相当于一个全能型变成N个专能型。每个专能型，分配给一个隔离的容器，赋予了最大程度的灵活。

![图片](https://mmbiz.qpic.cn/mmbiz_png/rLGOIHABwEqYNaicmtJwy21tiaUqoatfBdMEYjVVzucq8JceZl7U84DmWr3Ucra4rplgqia9Jl5qLq6gHU0KoOkJg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

精细化分工

按照这样的发展趋势，在移动通信系统中，除了天线，剩下的部分都有可能虚拟化。核心网是第一个，但不是最后一个。虚拟化之后的核心网，与其说属于通信，实际上更应该归为IT。核心网的功能，只是容器中普通一个软件功能而已。

![图片](https://mmbiz.qpic.cn/mmbiz_png/rLGOIHABwEqYNaicmtJwy21tiaUqoatfBduibf3KMweC6HTlXibeyfDNhJnQL4rMoc1OD4npHUGlaO4v2XuNiaRkTfA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

看完这个故事，有什么想说的吗？哈哈。现在给大家总结总结。

## k8s和docker 的区别

docker是一种开放源码应用容器引擎，开发人员可以将其应用打包，发布到流行的 liunx系统或实现虚拟化。

> k8s是一种开放源码的容器集群管理系统，可实现自动化部署、扩展容量、维护等容器集群功能。Docker容器有别于传统虚拟化方法，传统的虚拟技术，在将物理硬件虚拟为多套硬件之后，需要在每套硬件上分别部署一个操作系统，然后在这些操作系统上运行相应的应用程序。docker-compose up- d是一个容器。dockerfilebuild是一个镜像。dockerfile是自己定义自己的镜像功能。

> 传统的方法是直接在同一个物理机器节点上部署所有应用，因此，每个 App的依赖性是完全相同的，不能实现 App之间的隔离，当然，为了隔离，我们也可以通过创建虚拟机的方式将 App部署到其中，但是这样做过于繁琐，因此 Docker技术要比虚拟机更轻，现在我们通过部署 Container容器的技术来部署应用程序，让所有 Container运行在容器引擎上。容器集群管理系统以 kubernetes为代表，使用 kubernetes来管理 Docker集群，也就是说， Docker可以被看作是 Kubernetes内部使用的低级组件。此外， kubernetes不仅支持 Docker，也支持 Rocket，这是另一种容器技术。

> 而且 Docker 容器中的应用程序进程直接运行在宿主机(真实的物理机)的内核上， Docker引擎将一些各自独立的应用程序打包，它们各自独立地独立地运行于未虚拟化的宿主硬件上，同时每个容器都没有自己的内核，显然比传统虚拟机更轻。



















































