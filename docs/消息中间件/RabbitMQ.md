

# 初识MQ

## MQ概述

> MQ全称 Message Queue（消息队列），**是在消息的传输过程中保存消息的容器。多用于分布式系统之间进行通信**。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306040954160.png" alt="image-20230604095439109" style="zoom:80%;" />

> MQ，**消息队列，存储消息的中间件**
>
> 分布式系统通信两种方式：**直接远程调用 和 借助第三方 完成间接通信**
>
> **发送方称为生产者，接收方称为消费者**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306040954865.png" alt="image-20230604095425727" style="zoom:80%;" />

## 同步和异步

### 同步异步分析

微服务间通讯有同步和异步两种方式：

> **同步通讯：就像打电话，需要实时响应**。
>
> **异步通讯：就像发邮件，不需要马上回复**。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011450303.png" alt="image-20220901145024207" style="zoom:67%;" />

> 两种方式各有优劣，打电话可以立即得到响应，但是你却不能跟多个人同时通话。发送邮件可以同时与多个人收发邮件，但是往往响应会有延迟。
>

### 同步问题

> 我们之前学习的**Feign调用就属于同步方式**，**虽然调用可以实时得到结果**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220306190515866.png" alt="image-20220306190515866" style="zoom: 80%;" />

> 但存在下面的问题：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220306190302316.png" alt="image-20220306190302316" style="zoom: 80%;" />

## MQ 优劣势

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306040955718.png" alt="image-20230604095554656" style="zoom:80%;" />

### 优势

> - **应用解耦：提高系统容错性和可维护性**
> - **异步提速：提升用户体验和系统吞吐量**
> - **削峰填谷：提高系统稳定性**

> - 吞吐量提升：`无需等待订阅者处理完成，响应更快速`
>
> - 故障隔离：`服务没有直接调用，不存在级联失败问题`
> - 调用间没有阻塞，`不会造成无效的资源占用`
> - 耦合度极低，`每个服务都可以灵活插拔，可替换`
> - 流量削峰：`不管发布事件的流量波动多大，都由Broker接收，订阅者可以按照自己的速度去处理事件`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011736514.png" alt="image-20220901173637417" style="zoom:80%;" />

#### 应用解耦

> **系统的耦合性越高，容错性就越低，可维护性就越低。**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306040956473.png" alt="image-20230604095623403" style="zoom:80%;" />

> 使用 MQ 使得应用间解耦，提升容错性和可维护性。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306040957396.png" alt="image-20230604095700320" style="zoom:80%;" />

#### 异步提速

> 一个下单操作耗时：20 + 300 + 300 + 300 = 920ms
>
> 用户点击完下单按钮后，需要等待920ms才能得到下单响应，太慢！

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306040957511.png" alt="image-20230604095743441" style="zoom:80%;" />

> 用户点击完下单按钮后，只需等待25ms就能得到下单响应 (20 + 5 = 25ms)。
>
> 提升用户体验和系统吞吐量（单位时间内处理请求的数目）。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306040958079.png" alt="image-20230604095815993" style="zoom:80%;" />

#### 削峰填谷

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306040959138.png" alt="image-20230604095912054" style="zoom:80%;" />

> 请求瞬间增多，每秒5000个请求

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306040959857.png" alt="image-20230604095944785" style="zoom:80%;" />

> 使用了 MQ 之后，限制消费消息的速度为1000，这样一来，高峰期产生的数据势必会被积压在 MQ 中，高峰就被“削”掉了，但是因为消息积压，在高峰期过后的一段时间内，消费消息的速度还是会维持在1000，直到消费完积压的消息，这就叫做“填谷”。使用MQ后，可以提高系统稳定性。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041000197.png" alt="image-20230604100014123" style="zoom:80%;" />

### 劣势

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041004659.png" alt="image-20230604100417591" style="zoom:80%;" />

> **系统可用性降低**：**系统引入的外部依赖越多，系统稳定性越差。一旦 MQ 宕机，就会对业务造成影响。如何保证MQ的高可用**？

> **系统复杂度提高**：MQ 的加入大大增加了系统的复杂度，以前系统间是同步的远程调用，现在是通过 MQ 进行异步调用。如何保证消息没有被重复消费？怎么处理消息丢失情况？保证消息传递的顺序性？
>
> **一致性问题**：**A 系统处理完业务，通过 MQ 给B、C、D三个系统发消息数据，如果 B 系统、C 系统处理成功，D 系统处理失败。如何保证消息数据处理的一致性**？

### MQ使用条件

既然 MQ 有优势也有劣势，那么使用 MQ 需要满足什么条件呢？

> ① **生产者不需要从消费者处获得反馈。引入消息队列之前的直接调用，其接口的返回值应该为空，这才让明明下层的动作还没做，上层却当成动作做完了继续往后走，即所谓异步成为了可能**。
>
> ② **容许短暂的不一致性**。
>
> ③ **确实是用了有效果。即解耦、提速、削峰这些方面的收益，超过加入MQ，管理MQ这些成本**。

## 常见的 MQ 产品

> 目前业界有很多的 MQ 产品，例如 RabbitMQ、RocketMQ、ActiveMQ、Kafka、ZeroMQ、MetaMq等，也有直接使用 Redis 充当消息队列的案例，而这些消息队列产品，各有侧重，在实际选型时，需要结合自身需求及 MQ 产品特征，综合考虑。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041007650.png" alt="image-20230604100715554" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220306190906726.png" alt="image-20220306190906726" style="zoom:67%;" />

> 追求可用性：Kafka、 RocketMQ 、RabbitMQ
>
> 追求可靠性：RabbitMQ、RocketMQ
>
> 追求吞吐能力：RocketMQ、Kafka
>
> 追求消息低延迟：RabbitMQ、Kafka

> 扩展：可用性和可靠性

> **可用性指的是系统能够正常运行和提供所需服务的时间比例**。简单来说，可用性是系统在特定时间段内处于可操作状态的程度。高可用性意味着系统几乎一直可用，用户可以随时访问和使用系统。可用性通常以百分比表示，如 "99.9% 可用性"。可用性受到多种因素的影响，包括硬件故障、软件错误、网络问题、人为错误等。为了提高可用性，系统通常采用冗余设计和故障恢复机制，如备份服务器、负载均衡和容错性等。此外，系统维护、监控和及时处理故障也是确保高可用性的重要方面。

> **可靠性指的是系统在特定环境下持续正常工作的能力，即系统在一段时间内的正确性和稳定性**。可靠性是指系统提供正确结果的能力，并在面对故障或异常情况时能够恢复正常运行。可靠性通常以故障率或平均无故障时间（Mean Time Between Failures，MTBF）等指标来衡量。可靠性与系统的健壮性、容错性和恢复能力密切相关。系统设计时考虑到错误处理、异常情况处理、数据完整性和一致性等方面，以确保系统在面对故障或异常情况时能够保持稳定和正确。

> 尽管可用性和可靠性在某种程度上相关，但它们关注的方面略有不同。
>
> **可用性关注系统的连续性和用户体验，确保系统随时可用**。
>
> **可靠性关注系统的正确性和稳定性，确保系统在面对各种情况时能够持续提供正确的结果**。



# RabbitMQ

> **AMQP，即 Advanced Message Queuing Protocol（高级消息队列协议）**，是一个网络协议，是应用层协议的一个开放标准，为面向消息的中间件设计。基于此协议的客户端与消息中间件可传递消息，并不受客户端/中间件不同产品，不同的开发语言等条件的限制。2006年，AMQP 规范发布。类比HTTP。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041009686.png" alt="image-20230604100942612" style="zoom:80%;" />

> 2007年，Rabbit 技术公司基于 AMQP 标准开发的 RabbitMQ 1.0 发布。RabbitMQ 采用 Erlang 语言开发。
>
> Erlang 语言由 Ericson 设计，专门为开发高并发和分布式系统的一种语言，在电信领域使用广泛。

##  基础架构

> RabbitMQ 基础架构如下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041010817.png" alt="image-20230604101007730" style="zoom:80%;" />

## 基本概念

RabbitMQ 中的相关概念：

> Broker：**接收和分发消息的应用，RabbitMQ Server就是 Message Broker**

> Virtual host：**出于多租户和安全因素设计的，把 AMQP 的基本组件划分到一个虚拟的分组中，类似于网络中的 namespace 概念**。当多个不同的用户使用同一个 RabbitMQ server 提供的服务时，可以划分出多个vhost，每个用户在自己的 vhost 创建 exchange／queue 等

> Connection：publisher／consumer 和 broker 之间的 TCP 连接

> Channel：**如果每一次访问 RabbitMQ 都建立一个 Connection，在消息量大的时候建立 TCP Connection的开销将是巨大的，效率也较低**。**Channel 是在 connection 内部建立的逻辑连接，如果应用程序支持多线程，通常每个thread创建单独的 channel 进行通讯，AMQP method 包含了channel id 帮助客户端和message broker 识别 channel，所以 channel 之间是完全隔离的**。Channel 作为轻量级的 Connection 极大减少了操作系统建立 TCP connection 的开销

> Exchange：**message 到达 broker 的第一站，根据分发规则，匹配查询表中的 routing key，分发消息到queue 中去**。常用的类型有：direct (point-to-point), topic (publish-subscribe) and fanout (multicast)

> Queue：**消息最终被送到这里等待 consumer 取走**

> Binding：exchange 和 queue 之间的虚拟连接，binding 中可以包含 routing key。Binding 信息被保存到 exchange 中的查询表中，用于 message 的分发依据

> JMS 即 Java 消息服务（JavaMessage Service）应用程序接口，是一个 Java 平台中关于面向消息中间件的API，JMS 是 JavaEE 规范中的一种，类比JDBC，很多消息中间件都实现了JMS规范，例如ActiveMQ。RabbitMQ 官方没有提供 JMS 的实现包，但是开源社区有

## 工作模式

> RabbitMQ 提供了 6 种工作模式：简单模式、work queues、Publish/Subscribe 发布与订阅模式、Routing路由模式、Topics 主题模式、RPC 远程调用模式（远程调用，不太算 MQ；暂不作介绍）。官网对应模式介绍：https://www.rabbitmq.com/getstarted.html

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041013674.png" alt="image-20230604101330582" style="zoom:80%;" />



# 安装和启动

## Docker版

> 我们在Centos7虚拟机中使用Docker来安装。下载镜像，在线拉取，此步可省略
>

``` apl
docker pull rabbitmq:3.8-management
```

> 第一个-p是rabbitmq的管理平台端口，第二个-p是用来做交替通信的端口
>

```sh
docker run \
 -e RABBITMQ_DEFAULT_USER=itcast \
 -e RABBITMQ_DEFAULT_PASS=123321 \
 -v mq-plugins:/plugins \
 --name mq \
 --hostname mq1 \
 -p 15672:15672 \
 -p 5672:5672 \
 -d \
 rabbitmq:3.8-management
```

> 登录网址：http://192.168.22.130:15672
>

```sh
# 后续直接启动即可
docker restart mq
```

对应账号和密码就是上面设置的账号和密码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206152218557.png" alt="image-20220615221824436" style="zoom:50%;" />

## Linux版安装

> RabbitMQ 官方地址：http://www.rabbitmq.com/

### 安装依赖环境

在线安装依赖环境：

```shell
yum install build-essential openssl openssl-devel unixODBC unixODBC-devel make gcc gcc-c++ kernel-devel m4 ncurses-devel tk tc xz
```

### 安装Erlang

```sh
# 上传
erlang-18.3-1.el7.centos.x86_64.rpm
socat-1.7.3.2-5.el7.lux.x86_64.rpm
rabbitmq-server-3.6.5-1.noarch.rpm
```

```sh
# 安装
rpm -ivh erlang-18.3-1.el7.centos.x86_64.rpm
```

如果出现如下错误

![1565526174751](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041016180.png)

说明gblic 版本太低。我们可以查看当前机器的gblic 版本

```shell
strings /lib64/libc.so.6 | grep GLIBC
```

![1565526264426](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041016183.png)

当前最高版本2.12，需要2.15.所以需要升级glibc

使用yum更新安装依赖

```shell
sudo yum install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gcc make -y
```

下载rpm包

```shell
wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-utils-2.17-55.el6.x86_64.rpm &
wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-static-2.17-55.el6.x86_64.rpm &
wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-2.17-55.el6.x86_64.rpm &
wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-common-2.17-55.el6.x86_64.rpm &
wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-devel-2.17-55.el6.x86_64.rpm &
wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-headers-2.17-55.el6.x86_64.rpm &
wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/nscd-2.17-55.el6.x86_64.rpm &
```

安装rpm包

```shell
sudo rpm -Uvh *-2.17-55.el6.x86_64.rpm --force --nodeps
```

安装完毕后再查看glibc版本,发现glibc版本已经到2.17了

```shell
strings /lib64/libc.so.6 | grep GLIBC
```

![1565528746057](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041016185.png)

### 安装RabbitMQ

```sh
# 安装
rpm -ivh socat-1.7.3.2-5.el7.lux.x86_64.rpm

# 安装
rpm -ivh rabbitmq-server-3.6.5-1.noarch.rpm
```


### 开启管理界面及配置

```sh
# 开启管理界面
rabbitmq-plugins enable rabbitmq_management
# 修改默认配置信息
vim /usr/lib/rabbitmq/lib/rabbitmq_server-3.6.5/ebin/rabbit.app 
# 比如修改密码、配置等等，例如：loopback_users 中的 <<"guest">>,只保留guest
```


### 启动

```sh
service rabbitmq-server start # 启动服务
service rabbitmq-server stop # 停止服务
service rabbitmq-server restart # 重启服务
```

设置配置文件

```shell
cd /usr/share/doc/rabbitmq-server-3.6.5/

cp rabbitmq.config.example /etc/rabbitmq/rabbitmq.config
```

### 配置虚拟主机及用户

#### 用户角色

RabbitMQ在安装好后，可以访问`http://ip地址:15672` ；其自带了guest/guest的用户名和密码；如果需要创建自定义用户；那么也可以登录管理界面后，如下操作：

![1565098043833](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041016186.png) 

![1565098315375](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041016188.png)

**角色说明**：

1、 超级管理员(administrator)

可登陆管理控制台，可查看所有的信息，并且可以对用户，策略(policy)进行操作。

2、 监控者(monitoring)

可登陆管理控制台，同时可以查看rabbitmq节点的相关信息(进程数，内存使用情况，磁盘使用情况等)

3、 策略制定者(policymaker)

可登陆管理控制台, 同时可以对policy进行管理。但无法查看节点的相关信息(上图红框标识的部分)。

4、 普通管理者(management)

仅可登陆管理控制台，无法看到节点信息，也无法对策略进行管理。

5、 其他

无法登陆管理控制台，通常就是普通的生产者和消费者。

#### Virtual Hosts配置

像mysql拥有数据库的概念并且可以指定用户对库和表等操作的权限。RabbitMQ也有类似的权限管理；在RabbitMQ中可以虚拟消息服务器Virtual Host，每个Virtual Hosts相当于一个相对独立的RabbitMQ服务器，每个VirtualHost之间是相互隔离的。exchange、queue、message不能互通。 相当于mysql的db。Virtual Name一般以/开头。

##### 创建Virtual Hosts

![1565098496482](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041016195.png)

##### 设置Virtual Hosts权限

![1565098585317](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041016813.png)

![1565098719054](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041016830.png)



# 消息模型⭐

## 前置准备

### 配置文件

```xml
<!--AMQP依赖，包含RabbitMQ-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

application.yml

```yml
spring:
  rabbitmq:
    host: 192.168.22.130
    port: 5672
    username: itcast
    password: 123321
    # 不同用户推荐使用不同的虚拟主机
    virtual-host: /
    listener:
      simple:
        prefetch: 1   # 每次只能获取一条消息，处理完成才能获取下一个消息
```

访问网址：http://192.168.220.130:15672/

### 配置JSON转换器

> 显然，JDK序列化方式并不合适。我们希望消息体的体积更小、可读性更高，因此可以使用JSON方式来做序列化和反序列化。在publisher和consumer两个服务中都引入依赖：

```xml
<dependency>
    <groupId>com.fasterxml.jackson.dataformat</groupId>
    <artifactId>jackson-dataformat-xml</artifactId>
    <version>2.9.10</version>
</dependency>
```

配置消息转换器。在启动类中添加一个Bean即可：

```java
@Bean
public MessageConverter jsonMessageConverter(){
    return new Jackson2JsonMessageConverter();
}
```

## 常见消息模型⭐

RabbitMQ官方提供了5个不同的Demo示例，对应了不同的消息模型：

- `基本消息队列`（BasicQueue）
- `工作消息队列`（WorkQueue）

- **发布订阅**（Publish、Subscribe），又根据交换机类型不同分为三种：
  - Fanout Exchange：广播
  - Direct Exchange：路由
  - Topic Exchange：主题

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220306191514111.png" alt="image-20220306191514111" style="zoom:67%;" />

## 简单队列

> 做最简单的事情，一个生产者对应一个消费者，RabbitMQ相当于一个消息代理，将A的消息转发给B
>

> **应用场景：** 将发送的电子邮件放到消息队列，然后邮件服务在队列中获取邮件并发送给收件人

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041020303.png" alt="image-20230604102037230" style="zoom:80%;" />

在上图的模型中，有以下概念：

> - P：生产者，也就是要发送消息的程序
> - C：消费者：消息的接收者，会一直等待消息到来
> - queue：消息队列，图中红色部分。类似一个邮箱，可以缓存消息；
> - 生产者向其中投递消息，消费者从其中取出消息

### 消息发送

提前创建队列

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206160920468.png" alt="image-20220616092021373" style="zoom:67%;" />

然后在publisher服务中编写测试类SpringAmqpTest，并利用RabbitTemplate实现消息发送：

```java
@Autowired
private RabbitTemplate rabbitTemplate;

@Test
public void testMessage() {
	//注意：这个队列名称必须是在rabbit中定义好已经存在了的
    String queueName = "shop.delete.queue";
    String message = "hello,Spring amqp";
    rabbitTemplate.convertAndSend(queueName,message);
}
```

### 消息接收

然后在consumer服务的`cn.it.mq.listener`包中新建一个类SpringRabbitListener，代码如下：

```java
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class SpringRabbitListener {
    @RabbitListener(queues = "shop.delete.queue")
    public void listenSimpleQueue(String msg) {
        System.out.println("接收到的消息是："+msg);
    }
}
```

进入网址：http://192.168.220.130:15672/

点击队列Queues即可查看到有了消息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220306140642137.png" alt="image-20220306140642137" style="zoom:80%;" />

点击Name，然后点击Get Message可以获取到内容

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220306140744901.png" alt="image-20220306140744901" style="zoom: 67%;" />



## 工作队列

> Work queues，也被称为（Task queues），任务模型。简单来说就是**让多个消费者绑定到一个队列，共同消费队列中的消息**。**`多个消费者争抢消费消息`**，**一般适用于执行资源密集型任务，单个消费者处理不过来，需要多个消费者进行处理**
>

> **应用场景：** **一个订单的处理需要10s，有多个订单可以同时放到消息队列，然后让多个消费者同时处理，这样就是并行了，而不是单个消费者的串行情况**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041022242.png" alt="image-20230604102228150" style="zoom:80%;" />

> **Work Queues：**与入门程序的简单模式相比，多了一个或一些消费端，多个消费端共同消费同一个队列中的消息。**应用场景**：对于任务过重或任务较多情况使用工作队列可以提高任务处理的速度。

> `当消息处理比较耗时的时候，可能生产消息的速度会远远大于消息的消费速度`。长此以往，消息就会堆积越来越多，无法及时处理。此时可以使用work 模型，**多个消费者共同处理消息处理，速度就能提高**

Work模型的使用：

> - **多个消费者绑定到一个队列**，**同一条消息只会被一个消费者处理**
> - 通过设置prefetch来控制消费者预取的消息数量

> 在一个队列中如果有多个消费者，那么消费者之间对于同一个消息的关系是**竞争**的关系。**Work Queues** 对于任务过重或任务较多情况使用工作队列可以提高任务处理的速度。例如：短信服务部署多个，只需要有一个节点成功发送即可。

### 创建队列

> 官网：http://192.168.88.101:15672/#/

> 这种方式需要手动创建队列，不然消费者启动会失败

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041517397.png" alt="image-20230604151736249" style="zoom: 80%;" />

### 消息发送

> `这次我们循环发送，模拟大量消息堆积现象。`

> 在publisher服务中的SpringAmqpTest类中添加一个测试方法：
>

```java
@Resource
private RabbitTemplate rabbitTemplate;

@Test
public void testMessageWorkQueue() throws InterruptedException {
    String queueName = "shop.delete.queue";
    String message = "hello,message__";
    for (int i = 0; i <= 50; i++) {
        rabbitTemplate.convertAndSend(queueName,message+i);
        Thread.sleep(50);
    }
}
```

### 消息接收

> 要模拟多个消费者绑定同一个队列，我们在consumer服务的SpringRabbitListener中添加2个新的方法：

```java
@Component
public class SpringRabbitListener {
    //以下两个消费队列都是相同的名字
    @RabbitListener(queues = "shop.delete.queue")
    public void listenWorkQueue1(String msg) throws InterruptedException {
        System.out.println("消费者1接收到的消息是："+msg+"："+
                LocalTime.now());
        Thread.sleep(50);
    }

    @RabbitListener(queues = "shop.delete.queue")
    public void listenWorkQueue2(String msg) throws InterruptedException {
        System.err.println("消费者2接收到的消息是："+msg+"："+
                LocalTime.now());
        Thread.sleep(500);
    }
}
```

> 启动消费者项目，再启动生产者的测试方法，即可在消费者的控制台页面中看到
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220306152736812.png" alt="image-20220306152736812" style="zoom:67%;" />



## 订阅模式

注意：`这三种不用手动创建交换机和队列，不会报错`

Fanout，英文翻译是扇出，`我觉得在MQ中叫广播更合适。因为所有消费者都能收到消息`

在广播模式下，消息发送流程是这样的：

- `可以有多个队列`
- `每个队列都要绑定到Exchange（交换机）`
- `生产者发送的消息，只能发送到交换机，交换机来决定要发给哪个队列，生产者无法决定`
- `交换机把消息发送给绑定过的所有队列`
- `订阅队列的消费者都能拿到消息`

实现思路如下：

- 在consumer服务中，利用代码声明队列、交换机，并将两者绑定
- 在consumer服务中，编写两个消费者方法，**分别监听fanout.queue1和fanout.queue2**
- 在publisher中编写测试方法，**向itcast.fanout发送消息**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041025854.png" alt="image-20230604102504780" style="zoom:80%;" />

在订阅模型中，多了一个 Exchange 角色，而且过程略有变化：

> - P：生产者，也就是要发送消息的程序，但是不再发送到队列中，而是发给X（交换机）
> - C：消费者，消息的接收者，会一直等待消息到来
> - Queue：消息队列，接收消息、缓存消息：交换机（X）。一方面，接收生产者发送的消息。另一方面，知道如何处理消息，例如递交给某个特别队列、

> ➢ Fanout：广播，将消息交给所有绑定到交换机的队列
>
> ➢ Direct：定向，把消息交给符合指定routing key 的队列
>
> ➢ Topic：通配符，把消息交给符合routing pattern（路由模式） 的队列

> **Exchange**（交换机）只负责转发消息，不具备存储消息的能力，因此如果没有任何队列与 Exchange 绑定，或者没有符合递交给所有队列、或是将消息丢弃。到底如何操作，取决于Exchange的类型。Exchange有常见以下3种类型：路由规则的队列，那么消息会丢失！

### 消息发送

在publisher服务的SpringAmqpTest类中添加测试方法：

```java
@Test
public void testFanoutExchange() {
    // 定义交换机名称
    String exchangeName = "fanout.direct";
    // 消息
    String message = "hello, everyone!";
    rabbitTemplate.convertAndSend(exchangeName, "", message);
}
```

### 消息接收

#### 方式一：bean消息接收

> 在consumer服务声明Exchange、Queue、Binding
>
> Spring提供了一个接口Exchange，来表示所有不同类型的交换机：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220306213834083.png" alt="image-20220306213834083" style="zoom:67%;" />

> 在consumer服务常见一个类，**添加@Configuration注解，并声明FanoutExchange、Queue和绑定关系对象Binding**。声明队列、交换机、绑定关系的Bean是什么？Queue、FanoutExchange、Binding
>

```java
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;

@Configuration
public class FanoutConfig {
    // 声明交换机：@return Fanout类型交换机
    @Bean
    public FanoutExchange fanoutExchange(){
        return new FanoutExchange("itcast.fanout");
    }

    // 第1个队列
    @Bean
    public Queue fanoutQueue1(){
        return new Queue("fanout.queue1");
    }

    // 绑定队列1到交换机
    @Bean
    public Binding fanoutBinding1(Queue fanoutQueue1, FanoutExchange
                                  fanoutExchange){
        return BindingBuilder
                .bind(fanoutQueue1)
                .to(fanoutExchange);
    }

    // 第2个队列
    @Bean
    public Queue fanoutQueue2(){
        return new Queue("fanout.queue2");
    }

    // 绑定队列2和交换机
    @Bean
    public Binding fanoutBinding2(Queue fanoutQueue2, FanoutExchange
                                  fanoutExchange){
        return BindingBuilder
                .bind(fanoutQueue2)
                .to(fanoutExchange);
    }
}
```

#### 方式二：注解消息接收(推荐)

```java
@Component
public class SpringRabbitListener {

    // 这种注解方式就不用写配置类了
    // exchange是交换机名
    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = "fanout.queue1"),
            exchange = @Exchange(name = "fanout.direct",type = ExchangeTypes.FANOUT)
    ))
    public void listenDirectQueue1(String msg) throws InterruptedException {
        System.err.println("消费者fanout.queue1接收到的消息是："+msg);
        Thread.sleep(500);
    }

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = "fanout.queue2"),
            exchange = @Exchange(name = "fanout.direct",type = ExchangeTypes.FANOUT)
    ))
    public void listenDirectQueue2(String msg) throws InterruptedException {
        System.err.println("消费者fanout.queue2接收到的消息是："+msg);
        Thread.sleep(500);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206160945061.png" alt="image-20220616094527018" style="zoom:80%;" />



交换机的作用是什么？

- 接收publisher发送的消息
- 将消息按照规则路由到与之绑定的队列
- 不能缓存消息，路由失败，消息丢失
- FanoutExchange的会将消息路由到每个绑定的队列



## 路由模式

> 在Fanout(广播)模式中，**一条消息，会被所有订阅的队列都消费**。但是，在某些场景下，**我们希望不同的消息被不同的队列消费**。这时就要用到Direct类型的Exchange。有选择地（Routing key）接收消息，发送消息到交换机并且要指定路由key ，消费者将队列绑定到交换机时需要指定路由key，仅消费指定路由key的消息。
>

> **应用场景：** 如在商品库存中增加了1台iphone12，iphone12促销活动消费者指定routing key为iphone12，只有此促销活动会接收到消息，其它促销活动不关心也不会消费此routing key的消息

在Direct模型下：

> - 队列与交换机的绑定，不能是任意绑定了，而是要指定一个`RoutingKey`（路由key）
> - 消息的发送方在 向 Exchange发送消息时，也必须指定消息的 `RoutingKey`。
> - Exchange不再把消息交给每一个绑定的队列，而是根据消息的`Routing Key`进行判断，只有队列的`Routingkey`与消息的 `Routing key`完全一致，才会接收到消息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220307104212395.png" alt="image-20220307104212395" style="zoom:67%;" />

**案例需求如下**：

1. 利用@RabbitListener声明Exchange、Queue、RoutingKey

2. 在consumer服务中，编写两个消费者方法，分别监听direct.queue1和direct.queue2

3. 在publisher中编写测试方法，向itcast. direct发送消息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220307104256789.png" alt="image-20220307104256789" style="zoom:67%;" />

> 队列与交换机的绑定，不能是任意绑定了，而是要指定一个 RoutingKey（路由key）
>
> 消息的发送方在向 Exchange 发送消息时，也必须指定消息的 RoutingKey
>
> Exchange 不再把消息交给每一个绑定的队列，而是根据消息的 Routing Key 进行判断，队列Routingkey 与消息的 Routing key 完全一致，才会接收到消息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041026441.png" alt="image-20230604102638359" style="zoom:80%;" />

> - P：生产者，向 Exchange 发送消息，发送消息时，会指定一个routing key
> - X：Exchange（交换机），接收生产者的消息，然后把消息递交给与 routing key 完全匹配的队列
> - C1：消费者，其所在队列指定了需要 routing key 为 error 的消息
> - C2：消费者，其所在队列指定了需要 routing key 为 info、error、warning 的消息

### 消息接收

> 基于@Bean的方式声明队列和交换机比较麻烦，Spring还提供了**基于注解方式来声明**。
>

> 在consumer的SpringRabbitListener中添加两个消费者，同时基于注解来声明队列和交换机：
>

```java
@Component
public class SpringRabbitListener {

    //这种注解方式就不用写配置类了
    //exchange是交换机名
    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = "logInfoLevel"),
            exchange = @Exchange(name = "logLevelExchanger",
                                 type = ExchangeTypes.DIRECT),
            key = {"info"}
    ))
    public void listenDirectQueue1(String msg) throws InterruptedException {
        System.err.println("消费者Info队列接收到的消息是："+msg);
        Thread.sleep(500);
    }

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = "logErrorLevel"),
            exchange = @Exchange(name = "logLevelExchanger",
                                 type = ExchangeTypes.DIRECT),
            key = {"error","warning"}
    ))
    public void listenDirectQueue2(String msg) throws InterruptedException {
        System.err.println("消费者Error、Warning队列接收到的消息是："+msg);
        Thread.sleep(500);
    }
}
```

### 消息发送

在publisher服务的SpringAmqpTest类中添加测试方法：

```java
@Test
public void testSendDirectExchange() {
    // 交换机名称
    String exchangeName = "logLevelExchanger";
    // 消息
    String message = "红色警报！日本乱排核废水，导致海洋生物变异，惊现哥斯拉！";
    // 发送消息
    rabbitTemplate.convertAndSend(exchangeName, "warning", message);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041541411.png" alt="image-20230604154125330" style="zoom:80%;" />

## 通配符模式

> 根据主题（Topics）来接收消息，将路由key和某模式进行匹配，此时队列需要绑定在一个模式上，`#`匹配一个词或多个词，`*`只匹配一个词。例如：item.# 能够匹配 item.insert.abc 或者 item.insert，item.* 只能匹配 item.insert
>

**应用场景：** 同上，iphone促销活动可以接收主题为iphone的消息，如iphone12、iphone13等

> Topic 类型与 Direct 相比，都是可以根据 RoutingKey 把消息路由到不同的队列。只不过 Topic 类型Exchange 可以让队列在绑定 Routing key 的时候使用**通配符**！Routingkey 一般都是有一个或多个单词组成，多个单词之间以”.”分割，例如： item.insert

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041029753.png" alt="image-20230604102929668" style="zoom:80%;" />

> 红色 Queue：绑定的是 usa.# ，因此凡是以 usa. 开头的 routing key 都会被匹配到
>
> 黄色 Queue：绑定的是 #.news ，因此凡是以 .news 结尾的 routing key 都会被匹配

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041029646.png" alt="image-20230604102949558" style="zoom:80%;" />

### 消息发送

在publisher服务的SpringAmqpTest类中添加测试方法：

```java
@Test
public void testSendTopicExchange() {
    // 交换机名称
    String exchangeName = "itcast.topic";
    // 消息
    String message = "喜报！孙悟空大战哥斯拉，胜!";
    // 发送消息
    rabbitTemplate.convertAndSend(exchangeName, "china.news", message);
}
```

### 消息接收

在consumer服务的SpringRabbitListener中添加方法：

```java
@Component
public class SpringRabbitListener {

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = "topic.queue1"),
            exchange = @Exchange(name = "itcast.topic", type = ExchangeTypes.TOPIC),
            key = "china.#"
    ))
    public void listenTopicQueue1(String msg){
        System.out.println("消费者接收到topic.queue1的消息：【" + msg + "】");
    }

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = "topic.queue2"),
            exchange = @Exchange(name = "itcast.topic", type = ExchangeTypes.TOPIC),
            key = "#.news"
    ))
    public void listenTopicQueue2(String msg){
        System.out.println("消费者接收到topic.queue2的消息：【" + msg + "】");
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209011754813.png" alt="image-20220901175420744" style="zoom:80%;" />



## 消息转换器⭐

> 之前说过，Spring会把你发送的消息序列化为字节发送给MQ，接收消息的时候，还会把字节反序列化为Java对象。只不过，默认情况下Spring采用的序列化方式是JDK序列化。众所周知，JDK序列化存在下列问题：**数据体积过大、有安全漏洞、可读性差**
>

### 默认转换器

> 我们修改消息发送的代码，发送一个Map对象：
>

```java
@Test
public void testSendMap() throws InterruptedException {
    // 准备消息
    Map<String,Object> msg = new HashMap<>();
    msg.put("name", "Jack");
    msg.put("age", 21);
    // 发送消息
    rabbitTemplate.convertAndSend("simple.queue","", msg);
}
```

> 停止consumer服务，发送消息后查看控制台：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220307105522532.png" alt="image-20220307105522532" style="zoom:67%;" />

### 配置JSON转换器

> 显然，JDK序列化方式并不合适。我们希望消息体的体积更小、可读性更高，因此可以使用JSON方式来做序列化和反序列化。在publisher和consumer两个服务中都引入依赖：
>

```xml
<dependency>
    <groupId>com.fasterxml.jackson.dataformat</groupId>
    <artifactId>jackson-dataformat-xml</artifactId>
    <version>2.9.10</version>
</dependency>
```

> 配置消息转换器。在启动类中添加一个Bean即可：
>

```java
@Bean
public MessageConverter jsonMessageConverter(){
    return new Jackson2JsonMessageConverter();
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220307105813035.png" alt="image-20220307105813035" style="zoom:67%;" />





# 消息队列高级

消息队列在使用过程中，面临着很多实际问题需要思考：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092116490.png" alt="image-20210718155003157" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041034753.png" alt="image-20230604103421666" style="zoom:80%;" />



# 消息可靠性

[RabbitMQ 如何保证消息的可靠性 (qq.com)](https://mp.weixin.qq.com/s?__biz=MzI4Njc5NjM1NQ==&mid=2247495370&idx=2&sn=aa814d7809ef81024122af004b62640c&chksm=ebd5d1e6dca258f03d25b598cc7154221d531e241fb725b43aacdff5f67ae2df432fe9706e68&mpshare=1&scene=23&srcid=07319NzYf1DrPs2daRW9gyU3&sharer_sharetime=1659283494041&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

消息从发送，到消费者接收，会经理多个过程：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092116491.png" alt="image-20210718155059371" style="zoom:80%;" />

其中的每一步都可能导致消息丢失，`常见的丢失原因`包括：

- `发送时丢失`：
  - `生产者发送的消息未送达exchange`
  - `消息到达exchange后未到达queue`
- `MQ宕机，queue将消息丢失`
- `consumer接收到消息后未消费就宕机`

针对这些问题，RabbitMQ分别给出了解决方案：

- `生产者确认机制`
- `mq持久化`
- `消费者确认机制`
- `失败重试机制`

如何确保RabbitMQ消息的可靠性？

> - **开启生产者确认机制，确保生产者的消息能到达队列**
> - **开启持久化功能，确保消息未消费前在队列中不会丢失**
> - **开启消费者确认机制为auto，由spring确认消息处理成功后完成ack**
> - **开启消费者失败重试机制，并设置MessageRecoverer，多次重试失败后将消息投递到异常交换机，交由人工处理**

## 生产者确认机制

> RabbitMQ提供了publisher confirm机制来避免消息发送到MQ过程中丢失。这种机制必须给每个消息指定一个唯一ID。消息发送到MQ以后，会返回一个结果给发送者，表示消息是否处理成功。
>

返回结果有两种方式：

publisher-confirm，发送者确认

> - `消息成功投递到交换机，返回ack`
> - `消息未投递到交换机，返回nack`

publisher-return，发送者回执

> `消息投递到交换机了，但是没有路由到队列。返回ACK，及路由失败原因`

![image-20210718160907166](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092116495.png)



<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092116496.png" alt="image-20210718161707992" style="zoom:80%;" />

### 配置文件

首先，修改publisher服务中的application.yml文件，添加下面的内容：

```yaml
spring:
  rabbitmq:
    host: 192.168.22.130
    port: 5672
    username: itcast
    password: 123321
    # 不同用户推荐使用不同的虚拟主机
    virtual-host: /
    listener:
      simple:
        prefetch: 1   # 每次只能获取一条消息，处理完成才能获取下一个消息
    # 以下是新增的配置
    # 生产者确认的类型，simple同步等待,correlated异步回调
    publisher-confirm-type: correlated
    # 开启结果返回的功能
    publisher-returns: true
    # 消息路由失败时的策略，调用ReturnCallback
    template:
      mandatory: true
```

`publish-confirm-type`：`开启publisher-confirm`，这里支持两种类型：

- `simple`：`同步等待confirm结果，直到超时`
- `correlated`：`异步回调，定义ConfirmCallback，MQ返回结果时会回调这个ConfirmCallback`

`publish-returns`：开启publish-return功能，同样是基于callback机制，`不过是定义ReturnCallback`

`template.mandatory`：定义消息路由失败时的策略。true，则调用ReturnCallback；false：直接丢弃消息

### 定义Return回调(唯一)

> 每个RabbitTemplate只能配置一个ReturnCallback，因此需要在项目加载时配置
>

修改publisher服务，添加一个：

```java
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
// ApplicationContextAware SpringBean工厂通知，能在项目启动时就执行
public class CommonConfig implements ApplicationContextAware {
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) 
        throws BeansException {
        // 获取RabbitTemplate
        RabbitTemplate rabbitTemplate = applicationContext.getBean(RabbitTemplate.class);
        // 设置ReturnCallback
        rabbitTemplate.setReturnCallback((message, replyCode, replyText, exchange,
                                          routingKey) -> {
            // 投递失败，记录日志
            log.info("消息发送失败，应答码{}，原因{}，交换机{}，路由键{},消息{}",
                     replyCode, replyText, exchange, routingKey, message.toString());
            // 如果有业务需要，可以重发消息
        });
    }
}
```

### 定义ConfirmCallback

> ConfirmCallback可以在发送消息时指定，因为每个业务处理confirm成功或失败的逻辑不一定相同。在publisher服务的cn.itcast.mq.spring.SpringAmqpTest类中，定义一个单元测试方法：
>

```java
@Test
public void testSendMessage2SimpleQueue() throws InterruptedException {
    // 1.消息体
    String message = "hello, spring amqp!";
    // 2.全局唯一的消息ID，需要封装到CorrelationData中
    CorrelationData correlationData = new CorrelationData(UUID.randomUUID().toString());
    // 3.添加callback
    correlationData.getFuture().addCallback(
        result -> {
            if(result.isAck()){
                // 3.1.ack，消息成功
                log.info("消息发送成功, ID:{}", correlationData.getId());
            }else{
                // 3.2.nack，消息失败
                log.error("消息发送失败, ID:{}, 原因{}",correlationData.getId(),
                          result.getReason());
            }
        },
        ex -> log.error("消息发送异常, ID:{}, 原因{}",
                        correlationData.getId(),ex.getMessage())
    );
    // 4.发送消息(交换机名称,routineKey名称，消息，correlationData(唯一ID和回调函数))
    rabbitTemplate.convertAndSend("task.direct", "task", message, correlationData);

    // 休眠一会儿，等待ack回执
    Thread.sleep(2000);
}
```

### 交换机和队列绑定

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131024717.png" alt="image-20220913102411562" style="zoom:80%;" />

### 测试生产者确认

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131031278.png" alt="image-20220913103100223" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206161104198.png" alt="image-20220616110453131" style="zoom: 67%;" />

如果我们写成错的交换机名称，那么报错信息是

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206161108095.png" alt="image-20220616110852042" style="zoom:67%;" />

如果我们写成错的routineKey名称，能投递到交换机，但不能投递到队列

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131032744.png" alt="image-20220913103240671" style="zoom:80%;" />

## 消息持久化(默认)

> 生产者确认可以确保消息投递到RabbitMQ的队列中，但是消息发送到RabbitMQ以后，如果突然宕机，也可能导致消息丢失。要想确保消息在RabbitMQ中安全保存，必须开启消息持久化机制。

> - 交换机持久化(SpringAMQP)
> - 队列持久化(SpringAMQP默认持久化)
> - 消息持久化(SpringAMQP默认持久化)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092124586.png" alt="image-20220609212459502" style="zoom:80%;" />

### 交换机持久化

> RabbitMQ中交换机默认是非持久化的，mq重启后就丢失，可以通过代码指定交换机持久化
>

```java
@Bean
public DirectExchange simpleExchange(){
    // 三个参数：交换机名称、是否持久化、当没有queue与其绑定时是否自动删除(这个必须false)
    return new DirectExchange("simple.direct", true, false);
}
```

> 事实上，默认情况下，由SpringAMQP声明的交换机都是持久化的。可以在RabbitMQ控制台看到持久化的交换机都会带上`D`的标示：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131034263.png" alt="image-20220913103442207" style="zoom:80%;" />

### 队列持久化

> RabbitMQ中`队列默认是非持久化的，mq重启后就丢失`。SpringAMQP中可以通过代码指定交换机持久化：
>

```java
@Bean
public Queue simpleQueue(){
    // 使用QueueBuilder构建队列，durable就是持久化的
    return QueueBuilder.durable("simple.queue").build();
}
```

> `默认情况下，由SpringAMQP声明的队列都是持久化的`。控制台看到持久化的队列都会带上`D`的标示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131037884.png" alt="image-20220913103735815" style="zoom:80%;" />

### 消息持久化

利用SpringAMQP发送消息时，可以设置消息的属性（MessageProperties），指定delivery-mode：

> - 1：非持久化
> - 2：持久化

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092116499.png" alt="image-20210718165100016" style="zoom:80%;" />

> **默认情况下，SpringAMQP发出的任何消息都是持久化的，不用特意指定**。

## 消费者确认机制

RabbitMQ是**阅后即焚**机制，RabbitMQ确认消息被消费者消费后会立刻删除。

> 而RabbitMQ是通过消费者回执来确认消费者是否成功处理消息的：消费者获取消息后，应该RabbitMQ发送ACK回执，表明自己已经处理消息。
>

设想这样的场景：

> 1）RabbitMQ投递消息给消费者
>
> 2）消费者获取消息后，返回ACK给RabbitMQ
>
> 3）RabbitMQ删除消息
>
> 4）消费者宕机，消息尚未处理

> 这样，消息就丢失了。因此消费者返回ACK的时机非常重要。而SpringAMQP则允许配置三种确认模式：

> - manual：`手动ack，需要在业务代码结束后，调用api发送ack`
>
>
> - auto：`自动ack，由spring监测listener代码是否异常，没有异常返回ack；抛出异常则返回nack`
> - none：`关闭ack，MQ假定消费者获取消息后会成功处理，因此消息投递后立即被删除`

由此可知：

> - none模式下，`消息投递是不可靠的，可能丢失`
> - auto模式类似事务机制，``出现异常时返回nack，消息回滚到mq；没有异常，返回ack``
> - manual：`自己根据业务情况，判断什么时候该ack`

`一般，我们都是使用默认的auto即可`。

### 演示none模式

修改consumer服务的application.yml文件，添加下面内容：

```yaml
spring:
  rabbitmq:
    listener:
      simple:
        acknowledge-mode: none # 关闭ack
```

修改consumer服务的SpringRabbitListener类中的方法，模拟一个消息处理异常：

```java
@RabbitListener(queues = "simple.queue")
public void listenSimpleQueue(String msg) {
    log.info("消费者接收到simple.queue的消息：【{}】", msg);
    // 模拟异常
    System.out.println(1 / 0);
    log.debug("消息处理完成！");
}
```

测试可以发现，当消息处理抛异常时，消息依然被RabbitMQ删除了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131044190.png" alt="image-20220913104429127" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131044610.png" alt="image-20220913104458550" style="zoom:80%;" />

### 演示auto模式

再次把确认机制修改为auto:

```yaml
spring:
  rabbitmq:
    listener:
      simple:
        acknowledge-mode: auto # 关闭ack
```

进入simple.queue队列，手动发一条消息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131047372.png" alt="image-20220913104712311" style="zoom:80%;" />

> 在异常位置打断点，再次发送消息，程序卡在断点时，可以发现此时消息状态为unack（未确定）
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092116500.png" alt="image-20210718171705383" style="zoom:80%;" />

> 抛出异常后，因为Spring会自动返回nack，所以消息恢复至Ready状态，并且没有被RabbitMQ删除：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092116501.png" alt="image-20210718171759179" style="zoom:80%;" />

## 消费失败重试机制

> 当消费者出现异常后，消息会不断requeue（重入队）到队列，再重新发送给消费者，然后再次异常，再次requeue，无限循环，导致mq的消息处理飙升，带来不必要的压力，怎么办呢？
>

![image-20210718172746378](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092116502.png)

### 本地重试

我`们可以利用Spring的retry机制，在消费者出现异常时利用本地重试，而不是无限制的requeue到mq队列`。

修改consumer服务的application.yml文件，添加内容：

```yaml
spring:
  rabbitmq:
    listener:
      simple:
        retry:
          enabled: true # 开启消费者失败重试
          initial-interval: 1000 # 初识的失败等待时长为1秒
          multiplier: 1 # 失败的等待时长倍数，下次等待时长 = multiplier * last-interval
          max-attempts: 3 # 最大重试次数
          stateless: true # true无状态；false有状态。如果业务中包含事务，则改为false
```

重启consumer服务，重复之前的测试。

要先在发送方发条消息

```java
@RabbitListener(queues = "simple.queue")
public void listenSimpleQueue(String msg) {
    log.debug("消费者接收到simple.queue的消息：【" + msg + "】");
    System.out.println(1 / 0);
    log.info("消费者处理消息成功！");
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131053708.png" alt="image-20220913105327654" style="zoom:80%;" />

> - 在重试3次后，SpringAMQP会抛出异常AmqpRejectAndDontRequeueException，则本地重试触发了
> - 查看RabbitMQ控制台，发现消息被删除了，说明最后SpringAMQP返回的是ack，mq删除消息了
>
> - 开启本地重试时，消息处理过程中抛出异常，不会requeue到队列，而是在消费者本地重试
> - 重试达到最大次数后，Spring会返回ack，消息会被丢弃

### 失败处理策略

在之前的测试中，达到最大重试次数后，消息会被丢弃，这是由Spring内部机制决定的。在开启重试模式后，重试次数耗尽，如果消息依然失败，则需要有MessageRecovery接口来处理，它包含三种不同的实现：

- RejectAndDontRequeueRecoverer：`重试耗尽后，直接reject，丢弃消息。默认就是这种方式`

- ImmediateRequeueMessageRecoverer：`重试耗尽后，返回nack，消息重新入队`

- RepublishMessageRecoverer：`重试耗尽后，将失败消息投递到指定的交换机`

比较优雅的一种处理方案是RepublishMessageRecoverer，失败后将消息投递到一个指定的，专门存放异常消息的队列，后续由人工集中处理。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092145836.png" alt="image-20220609214519756" style="zoom: 67%;" />

1）在consumer服务中定义处理失败消息的交换机和队列

```java
@RabbitListener(bindings = @QueueBinding(
        // 队列
        value = @Queue(name = "error.queue"),
        // 交换机
        exchange = @Exchange(name = "error.direct",type = ExchangeTypes.DIRECT),
        // routingKey
        key = {"error"}
))
public void listenErrorQueue(String msg) throws InterruptedException {
    System.err.println("消费者error.queue接收到的消息是："+msg);
}
```

2）定义一个RepublishMessageRecoverer，关联队列和交换机

```java
@Bean
public MessageRecoverer republishMessageRecoverer(RabbitTemplate rabbitTemplate){
    // 注意绑定的交换机是error.direct，要和上面对应，交换机,routingKey
    return new RepublishMessageRecoverer(rabbitTemplate, "error.direct", "error");
}
```

启动消费者，发消息测试

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131100333.png" alt="image-20220913110035270" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131100104.png" alt="image-20220913110007023" style="zoom:80%;" />

当然，如果队列和交换机定义完成之后不去用RabbitLinstener消费的话，发送的消息就会保存到队列中

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131105446.png" alt="image-20220913110539383" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131106180.png" alt="image-20220913110601099" style="zoom:80%;" />

# TTL

## TTL概述

> ➢ TTL 全称 Time To Live（存活时间/过期时间）。
>
> ➢ 当消息到达存活时间后，还没有被消费，会被自动清除。
>
> ➢ RabbitMQ可以对消息设置过期时间，也可以对整个队列（Queue）设置过期时间。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041635781.png" alt="image-20230604163550677" style="zoom:80%;" />

> ➢ 设置队列过期时间使用参数：x-message-ttl，单位：ms(毫秒)，会对整个队列消息统一过期。
>
> ➢ 设置消息过期时间使用参数：expiration。单位：ms(毫秒)，当该消息在队列头部时（消费时），会单独判断这一消息是否过期。
>
> ➢ 如果两者都进行了设置，以时间短的为准。

## 控制台实现

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041640512.png" alt="image-20230604164005421" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041641002.png" alt="image-20230604164104901" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041642083.png" alt="image-20230604164248994" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041644168.png" alt="image-20230604164407059" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041644454.png" alt="image-20230604164432355" style="zoom:80%;" />

## 队列统一过期

> 这边有点问题，只有上面控制台能实现，代码尚且不知道如何做，下面代码能创建ttl队列，但无法消费

### 消息发送

```java
@Test
public void testSendTopicExchange() {
    // 交换机名称
    String exchangeName = "itcast.topic1";
    // 消息
    String message = "喜报！孙悟空大战哥斯拉，胜!";

    for (int i = 0; i < 10; i++) {
        // 发送消息
        rabbitTemplate.convertAndSend(exchangeName, "china.a", message+i);
    }
}
```

### 消息接收

```java
@Configuration
public class TTL_Queue_DirectConfiguration {
    // 1.声明创建direct路由模式的交换机
    @Bean
    public DirectExchange getDirectExchange(){
        /** @params1 : 交换机名称
         *  @params2 : 是否持久化（是，重启后不会消失）
         *  @params3 : 是否自动删除（交换机无消息可投递，则自动删除交换机）
         */
        return new DirectExchange("itcast.topic1",true,false);
    }
    // 2.声明创建过期队列队列
    @Bean
    public Queue getTTL_Queue1(){

        /** 2.1 设置该队列内的所有消息过期时间为5秒
         *      key：rabbitmq图形化界面中的规定名称
         *      value：默认是int类型值，否则报错，单位毫秒
         */
        Map<String,Object> map = new HashMap<>();
        map.put("x-message-ttl",5000);

        /** @params1 : 队列名称
         *  @params2 : 是否持久化（true：重启后不会消失）
         *  @params3 : 是否独占队列（true：仅限于此连接使用）
         *  @params4 : 是否自动删除（队列内最后一条消息被消费后，队列将自动删除）
         */
        return new Queue("topic.queue2",true,false,false,map);
    }

    // 3.绑定交换机与队列的关系，并设置交换机与队列之间的BindingKey
    @Bean
    public Binding getBinding_TTL(){
        // 投递消息时指定的RoutingKey与此BindingKey（ttl）匹配上，消息才会被投递到ttl_Queue1队列
        return BindingBuilder.bind(getTTL_Queue1())
             .to(getDirectExchange()).with("china.#");
    }
}
```

```java
@Component
public class SpringRabbitListener {

    @RabbitListener(queues = "topic.queue2")
    public void listenTopicQueue2(String msg){
        System.out.println("消费者接收到topic.queue1的消息：【" + msg + "】");
    }
}
```

## 消息单独过期

> 注意：如果两者都进行了设置，则以时间短的为准

### 消息发送

```java
@Test
public void testSendTopicExchange() {
    // 交换机名称
    String exchangeName = "itcast.topic";
    // 消息
    String message = "喜报！孙悟空大战哥斯拉，胜!";
    MessagePostProcessor messagePostProcessor = message1 -> {
        message1.getMessageProperties().setExpiration("5000"); // 设置消息的过期时间
        return message1;
    };

    for (int i = 0; i < 10; i++) {
        // 发送消息
        rabbitTemplate.convertAndSend(exchangeName, "china.tjut", message+i, 
                                      messagePostProcessor);
    }
}
```

### 消息接收

```java
@Component
public class SpringRabbitListener {

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = "topic.queue1"),
            exchange = @Exchange(name = "itcast.topic", type = ExchangeTypes.TOPIC),
            key = "china.#"
    ))
    public void listenTopicQueue1(String msg){
        System.out.println("消费者接收到topic.queue1的消息：【" + msg + "】");
    }

}
```

> 发送消息，注意关闭消费者，不然一发送就立即消费了

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041945474.png" alt="image-20230604194528279" style="zoom:80%;" />

> 5s之后，消息消失

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041946768.png" alt="image-20230604194656684" style="zoom:80%;" />



# 死信交换机

## 初识死信交换机

> 死信队列，英文缩写：DLX 。Dead Letter Exchange（死信交换机），当消息成为Dead message后，可以
>
> 被重新发送到另一个交换机，这个交换机就是DLX。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041048210.png" alt="image-20230604104835124" style="zoom:80%;" />

### 什么是死信交换机

死信队列有什么用？当发生异常的时候，消息不能够被消费者正常消费，被加入到了死信队列中。后续的程序可以根据死信队列中的内容分析当时发生的异常，进而改善和优化系统。

当一个队列中的消息满足下列情况之一时，可以成为死信（dead letter）：

- 消费者使用basic.reject或 basic.nack声明消费失败，并且消息的requeue参数设置为false
- 消息是一个过期消息，超时无人消费
- 要投递的队列消息满了，无法投递

如果这个包含死信的队列配置了`dead-letter-exchange`属性，指定了一个交换机，那么队列中的死信就会投递到这个交换机中，而这个交换机称为**死信交换机**（Dead Letter Exchange，检查DLX）。

如图，一个消息被消费者拒绝了，变成了死信：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092116503.png" alt="image-20210718174328383" style="zoom: 80%;" />

因为simple.queue绑定了死信交换机 dl.direct，因此死信会投递给这个交换机

如果这个死信交换机也绑定了一个队列，则消息最终会进入这个存放死信的队列：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092116505.png" alt="image-20210718174506856" style="zoom:80%;" />

另外，队列将死信投递给死信交换机时，必须知道两个信息：

- `死信交换机名称`
- `死信交换机与死信队列绑定的RoutingKey`

这样才能确保投递的消息能到达死信交换机，并且正确的路由到死信队列。

![image-20210821073801398](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092116506.png)

死信交换机的使用场景是什么？

- 如果队列绑定了死信交换机，死信会投递到死信交换机；
- 可以利用死信交换机收集所有消费者处理失败的消息（死信），交由人工处理，进一步提高消息队列的可靠性。

### 死信交换机接收死信（拓展）

> 在失败重试策略中，默认的RejectAndDontRequeueRecoverer会在本地重试次数耗尽后，发送reject给RabbitMQ，消息变成死信，被丢弃。我们可以给simple.queue添加一个死信交换机，给死信交换机绑定一个队列。这样消息变成死信后也不会丢弃，而是最终投递到死信交换机，路由到与死信交换机绑定的队列。
>

如何给队列绑定死信交换机？

- 给队列设置dead-letter-exchange属性，指定一个交换机
- 给队列设置dead-letter-routing-key属性，设置死信交换机与死信队列的RoutingKey



![image-20210718174506856](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092116505.png)



## 死信交换机实现延时队列

一个队列中的消息如果超时未消费，则会变为死信，超时分为两种情况：

- 消息所在的队列设置了超时时间
- 消息本身设置了超时时间

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092116507.png" alt="image-20210718182643311" style="zoom:67%;" />



### 接收超时死信的死信交换机

在consumer服务的SpringRabbitListener中，定义一个新的消费者，并且声明 死信交换机、死信队列：

```java
@RabbitListener(bindings = @QueueBinding(
        value = @Queue(name = "dl.queue", durable = "true"),
        exchange = @Exchange(name = "dl.direct"),
        key = "dl"
))
public void listenDlQueue(String msg){
    log.info("接收到 dl.queue的延迟消息：{}", msg);
}
```

### 声明一个队列，并且指定TTL

要给队列设置超时时间，需要在声明队列时配置x-message-ttl属性：

注意，这个队列设定了死信交换机为`dl.ttl.direct`

声明交换机，将ttl与交换机绑定：

```java
// 声明交换机
@Bean
public DirectExchange ttlDirectExchange() {
    return new DirectExchange("ttl.direct");
}
// 声明存储死信的队列 dl.queue
// Queue的依赖是org.springframework.amqp.core.Queue;
@Bean
public Queue ttlQueue(){
    return  QueueBuilder
            .durable("ttl.queue") // 指定队列名称，并持久化
            .ttl(10000) // 设置队列的超时时间，10秒
            .deadLetterExchange("dl.direct") // 指定死信交换机
            .deadLetterRoutingKey("dl") // RoutingKey
            .build();
}
// 将死信队列与死信交换机绑定
@Bean
public Binding dlBinding(){
    return BindingBuilder.bind(ttlQueue()).to(ttlDirectExchange()).with("ttl");
}
```

发送消息，但是不要指定TTL：

```java
@Test
public void testTTLQueue() {
    // 创建消息
    String message = "hello, ttl queue";
    // 消息ID，需要封装到CorrelationData中
    CorrelationData correlationData = new CorrelationData(UUID.randomUUID().toString());
    // 发送消息
    rabbitTemplate.convertAndSend("ttl.direct", "ttl", message, correlationData);
    // 记录日志
    log.debug("发送消息成功");
}
```

发送消息的日志：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131248445.png" alt="image-20220913124824277" style="zoom:80%;" />

查看下接收消息的日志：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092116509.png" alt="image-20210718191738706" style="zoom:80%;" />

因为队列的TTL值是10000ms，也就是10秒。可以看到消息发送与接收之间的时差刚好是10秒。



### 发送消息时，设定TTL(可选)

在发送消息时，也可以指定TTL：

```java
@Test
public void testTTLMsg() {
    // 创建消息
    Message message = MessageBuilder
        .withBody("hello, ttl message".getBytes(StandardCharsets.UTF_8))
        .setExpiration("5000")
        .build();
    // 消息ID，需要封装到CorrelationData中
    CorrelationData correlationData = new CorrelationData(UUID.randomUUID().toString());
    // 发送消息
    rabbitTemplate.convertAndSend("ttl.direct", "ttl", message, correlationData);
    log.debug("发送消息成功");
}
```

查看发送消息日志：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092116510.png" alt="image-20210718191939140" style="zoom:80%;" />

接收消息日志：

![image-20210718192004662](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092116511.png)

这次，发送与接收的延迟只有5秒。说明当队列、消息都设置了TTL时，任意一个到期就会成为死信。



### 总结

消息超时的两种方式是？

- 给队列设置ttl属性，进入队列后超过ttl时间的消息变为死信
- 给消息设置ttl属性，队列接收到消息超过ttl时间后变为死信

如何实现发送一个消息20秒后消费者才收到消息？

- 给消息的目标队列指定死信交换机
- 将消费者监听的队列绑定到死信交换机
- 发送消息时给消息设置超时时间为20秒



## 延迟队列

一般的队列，消息一旦进入队列就会被消费者立即消费。延迟队列就是进入该队列的消息会被消费者延迟消费，延迟队列中存储的对象是的延迟消息，“延迟消息”是指当消息被发送以后，等待特定的时间后，消费者才能拿到这个消息进行消费。

延迟队列用于需要延迟工作的场景。最常见的使用场景：淘宝或者天猫我们都使用过，用户在下单之后通常有30分钟的时间进行支付，如果这30分钟之内没有支付成功，那么订单就会自动取消。

除了延迟消费，延迟队列的典型应用场景还有延迟重试。比如消费者从队列里面消费消息失败了，可以延迟一段时间以后进行重试。

利用TTL结合死信交换机，我们实现了消息发出后，消费者延迟收到消息的效果。这种消息模式就称为延迟队列（Delay Queue）模式。

延迟队列的使用场景包括：

- 延迟发送短信
- 用户下单，如果用户在15 分钟内未支付，则自动取消
- 预约工作会议，20分钟后自动通知所有参会人员

因为延迟队列的需求非常多，所以RabbitMQ的官方也推出了一个插件，原生支持延迟队列效果。

这个插件就是DelayExchange插件。

使用方式可以参考官网地址：https://blog.rabbitmq.com/posts/2015/04/scheduling-messages-with-rabbitmq

### 1.安装DelayExchange插件

官方的安装指南地址为：https://blog.rabbitmq.com/posts/2015/04/scheduling-messages-with-rabbitmq

上述文档是基于linux原生安装RabbitMQ，然后安装插件。

因为我们之前是基于Docker安装RabbitMQ，所以下面我们会讲解基于Docker来安装RabbitMQ插件。

#### 1.下载插件

RabbitMQ有一个官方的插件社区，地址为：https://www.rabbitmq.com/community-plugins.html

其中包含各种各样的插件，包括我们要使用的DelayExchange插件：

![image-20210713104511055](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206161351265.png)

大家可以去对应的GitHub页面下载3.8.9版本的插件，

地址为https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/tag/3.8.9

这个对应RabbitMQ的3.8.5以上版本。

#### 2.上传插件

因为我们是基于Docker安装，所以需要先查看RabbitMQ的插件目录对应的数据卷。如果不是基于Docker的同学，请参考第一章部分，重新创建Docker容器。

我们之前设定的RabbitMQ的数据卷名称为`mq-plugins`，所以我们使用下面命令查看数据卷：

```c
docker volume inspect mq-plugins
```

可以得到下面结果：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206161351267.png" alt="image-20210713105135701" style="zoom:67%;" />

接下来，将插件上传到这个目录即可：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131306610.png" alt="image-20220913130619530" style="zoom:80%;" />



#### 3.安装插件

最后就是安装了，需要进入MQ容器内部来执行安装。我的容器名为`mq`，所以执行下面命令：

```sh
docker exec -it mq bash
```

执行时，请将其中的 `-it` 后面的`mq`替换为你自己的容器名.

进入容器内部后，执行下面命令开启插件：

```c
rabbitmq-plugins enable rabbitmq_delayed_message_exchange
```

结果如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131305967.png" alt="image-20220913130555835" style="zoom:80%;" />

#### 4.使用插件

> 注意：不是非要在控制台进行声明，SpringAMQP的RabbitListener会自动创建该交换机和队列的

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131309717.png" alt="image-20220913130910631" style="zoom:80%;" />



### 2.DelayExchange原理

DelayExchange需要将一个交换机声明为delayed类型。当我们发送消息到delayExchange时，流程如下：

- 接收消息
- 判断消息是否具备x-delay属性
- 如果有x-delay属性，说明是延迟消息，持久化到硬盘，读取x-delay值，作为延迟时间
- 返回routing not found结果给消息发送者
- x-delay时间到期后，重新投递消息到指定队列

### 3.使用DelayExchange

延迟队列插件的使用步骤包括哪些？

- 声明一个交换机，添加delayed属性为true,然后声明队列与其绑定即可。
- 发送消息时，添加x-delay头，值为超时时间

#### 1. 声明DelayExchange交换机

基于注解方式（推荐）：

```java
@RabbitListener(bindings = @QueueBinding(
        value = @Queue(name = "direct.queue",durable = "true"),
        exchange = @Exchange(name = "delay.direct",delayed = "true",
                type = ExchangeTypes.DIRECT),
        key = {"delay"}
))
public void listenDirectQueue1(String msg) throws InterruptedException {
    log.info("delay.queue接收到的延迟消息是：{}",msg);
}
```

也可以基于@Bean的方式：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092116515.png" alt="image-20210718193831076" style="zoom:80%;" />



#### 2. 发送消息

发送消息时，`一定要携带x-delay属性，指定延迟的时间`：

```java
@Test
public void testMessage() {
    // 创建消息
    Message message = MessageBuilder.withBody("hello,springboot rabbitmq"
                                              .getBytes(StandardCharsets.UTF_8))
            // 必须指定x-delay请求头，延迟时间,单位毫秒
            .setHeader("x-delay", 5000)
            .build();
    //消息ID，需要封装到CorrelationData中
    CorrelationData correlationData = new CorrelationData(UUID.randomUUID().toString());
    // 发送消息
    rabbitTemplate.convertAndSend("delay.direct", "delay", message, correlationData);
    log.info("发送消息成功");
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131322308.png" alt="image-20220913132217255" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131321542.png" alt="image-20220913132153482" style="zoom:80%;" />

# 高级特性

## 消费端限流

> ➢ 在\<rabbit:listener-container> 中配置 prefetch属性设置消费端一次拉取多少消息
>
> ➢ 消费端的确认模式一定为手动确认。acknowledge="manual"

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306041043465.png" alt="image-20230604104319359" style="zoom:80%;" />

## 日志和监控

### RabbitMQ日志

> RabbitMQ默认日志存放路径： /var/log/rabbitmq/rabbit@xxx.log
>
> 日志包含了RabbitMQ的版本号、Erlang的版本号、RabbitMQ服务节点名称、cookie的hash值、
>
> RabbitMQ配置文件地址、内存限制、磁盘限制、默认账户guest的创建以及权限配置等等。

### web管控台监控

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306042134158.png" alt="image-20230604213403925" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306042134701.png" alt="image-20230604213420570" style="zoom:80%;" />

### rabbitmqctl管理和监控

```sh
# 进入队列
docker exec -it mq  bash
```

```sh
查看队列
# rabbitmqctl list_queues
查看exchanges
# rabbitmqctl list_exchanges
查看用户
# rabbitmqctl list_users
查看连接
# rabbitmqctl list_connections
查看消费者信息
# rabbitmqctl list_consumers
查看环境变量
# rabbitmqctl environment
查看未被确认的队列
# rabbitmqctl list_queues name messages_unacknowledged
查看单个队列的内存使用
# rabbitmqctl list_queues name memory
查看准备就绪的队列
# rabbitmqctl list_queues name messages_ready
```

## 消息追踪

> 在使用任何消息中间件的过程中，难免会出现某条消息异常丢失的情况。对于RabbitMQ而言，可能是因为生产者或消费者与RabbitMQ断开了连接，而它们与RabbitMQ又采用了不同的确认机制；也有可能是因为交换器与队列之间不同的转发策略；甚至是交换器并没有与任何队列进行绑定，生产者又不感知或者没有采取相应的措施；另外RabbitMQ本身的集群策略也可能导致消息的丢失。这个时候就需要有一个较好的机制跟踪记录消息的投递过程，以此协助开发和运维人员进行问题的定位。

> 在RabbitMQ中可以使用Firehose和rabbitmq_tracing插件功能来实现消息追踪。

> firehose的机制是将生产者投递给rabbitmq的消息，rabbitmq投递给消费者的消息按照指定的格式发送到默认的exchange上。这个默认的exchange的名称为amq.rabbitmq.trace，是一个topic类型exchange。

> 发送到这个exchange上的消息的routing key为 publish.exchangename 和deliver.queuename。其中exchangename和queuename为实际exchange和queue的名称，分别对应生产者投递到exchange的消息，和消费者从queue上获取的消息。

> 注意：打开 trace 会影响消息写入功能，适当打开后请关闭。
>
> rabbitmqctl trace_on：开启Firehose命令
>
> rabbitmqctl trace_off：关闭Firehose命令

> rabbitmq_tracing和Firehose在实现上如出一辙，只不过rabbitmq_tracing的方式比Firehose多了一层GUI的包装，更容易使用和管理。启用插件：rabbitmq-plugins enable rabbitmq_tracing

```sh
docker exec -it mq  bash
rabbitmq-plugins enable rabbitmq_tracing
docker restart mq
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306042143247.png" alt="image-20230604214343121" style="zoom:80%;" />

> 进入任意队列，发布消息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306042144846.png" alt="image-20230604214434746" style="zoom:80%;" />

> 查看日志

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306042145031.png" alt="image-20230604214530891" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306042145008.png" alt="image-20230604214507905" style="zoom:80%;" />

## 消息补偿

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306042135030.png" alt="image-20230604213541902" style="zoom:80%;" />

## 消息幂等性保障

> 幂等性指一次和多次请求某一个资源，对于资源本身应该具有同样的结果。也就是说，其任意多次执行对资源本身所产生的影响均与一次执行的影响相同。在MQ中指，消费多条相同的消息，得到与消费该消息一次相同的结果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306042136405.png" alt="image-20230604213636273" style="zoom:80%;" />



# 惰性队列

## 消息堆积问题

> 当生产者发送消息的速度超过了消费者处理消息的速度，就会导致队列中的消息堆积，直到队列存储消息达到上限。之后发送的消息就会成为死信，可能会被丢弃，这就是消息堆积问题。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092116517.png" alt="image-20210718194040498" style="zoom: 50%;" />

解决消息堆积有三种思路：

> - 增加更多消费者，提高消费速度。也就是我们之前说的work queue模式
> - 扩大队列容积，提高堆积上限
> - 在消费者内开启线程池加快消息处理速度

要提升队列容积，把消息保存在内存中显然是不行的。消息堆积问题的解决方案？

> - 队列上绑定多个消费者，提高消费速度
> - 使用惰性队列，可以再mq中保存更多消息

## 惰性队列使用

从RabbitMQ的3.6.0版本开始，就增加了Lazy Queues的概念，也就是惰性队列。惰性队列的特征如下：

- 接收到消息后直接存入磁盘而非内存
- 消费者要消费消息时才会从磁盘中读取并加载到内存
- 支持数百万条的消息存储

惰性队列的优点有哪些

- 基于磁盘存储，消息上限高
- 没有间歇性的page-out，性能比较稳定

惰性队列的缺点有哪些

- 基于磁盘存储，消息时效性会降低
- 性能受限于磁盘的IO

### 声明惰性队列

#### 基于命令行设置

而要设置一个队列为惰性队列，只需要在声明队列时，指定x-queue-mode属性为lazy即可。可以通过命令行将一个运行中的队列修改为惰性队列：

```sh
rabbitmqctl set_policy Lazy "^lazy-queue$" '{"queue-mode":"lazy"}' --apply-to queues  
```

命令解读：

- `rabbitmqctl` ：RabbitMQ的命令行工具
- `set_policy` ：添加一个策略
- `Lazy` ：策略名称，可以自定义名称
- `"^lazy-queue$"` ：用正则表达式匹配队列的名字
- `'{"queue-mode":"lazy"}'` ：设置队列模式为lazy模式
- `--apply-to queues  `：策略的作用对象，是所有的队列

#### 基于@Bean声明

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092116518.png" alt="image-20210718194522223" style="zoom:80%;" />

```java
@Configuration
public class LazyConfig {
    // @description:惰性队列
    @Bean
    public Queue lazyQueue(){
        return QueueBuilder.durable("lazy.queue")
                .lazy()
                .build();
    }
    // @description:普通队列
    @Bean
    public Queue normalQueue(){
        return QueueBuilder.durable("normal.queue")
                .build();
    }

}
```

运行，查看浏览器

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206161506697.png" alt="image-20220616150630608" style="zoom:67%;" />

#### 基于@RabbitListener(推荐)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092116519.png" alt="image-20210718194539054" style="zoom:80%;" />

```java
@RabbitListener(queuesToDeclare = @Queue(
        name = "lazy.queue",
        durable = "true",
        arguments = @Argument(name = "x-queue-mode",value = "lazy")
))
public void listenLazyQueue(String msg) {
    System.out.println("消费者接收到simple.queue的消息：【" + msg + "】");
}
```

### 测试惰性队列

消费者声明普通队列和惰性队列

```java
// 普通队列
@RabbitListener(bindings = @QueueBinding(
        value = @Queue(name = "normal.queue"),
        exchange = @Exchange(name = "it.direct",type = ExchangeTypes.DIRECT),
        key = {"normal"}
))
public void listenSimpleQueue(String msg) {
    log.debug("消费者接收到normal.queue的消息：【" + msg + "】");
}

// 惰性队列
@RabbitListener(bindings = @QueueBinding(
        value = @Queue(name = "lazy.queue",
                arguments = @Argument(name = "x-queue-mode",value = "lazy")),
        exchange = @Exchange(name = "it.direct",type = ExchangeTypes.DIRECT),
        key = {"lazy"}
))
public void listenLazyQueue(String msg) {
    System.out.println("消费者接收到lazy.queue的消息：【" + msg + "】");
}
```



```java
@Test
public void testFanoutExchange() {
    // 交换机名称
    String queueName = "lazy.queue";
    // 消息
    String message = "红色警报！日本乱排核废水，导致海洋生物变异，惊现哥斯拉！";
    // 发送消息
    for (int i = 0; i < 100000; i++) {
        rabbitTemplate.convertAndSend(queueName, message+i);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131532581.png" alt="image-20220913153220428" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131532755.png" alt="image-20220913153255685" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131533801.png" alt="image-20220913153319734" style="zoom:80%;" />



# 集群部署⭐

接下来，我们看看如何安装RabbitMQ的集群。

## 前期准备

在RabbitMQ的官方文档中，讲述了两种集群的配置方式：

- 普通模式：普通模式集群不进行数据同步，每个MQ都有自己的队列、数据信息（其它元数据信息如交换机等会同步）。例如我们有2个MQ：mq1，和mq2，如果你的消息在mq1，而你连接到了mq2，那么mq2会去mq1拉取消息，然后返回给你。如果mq1宕机，消息就会丢失。
- 镜像模式：与普通模式不同，队列会在各个mq的镜像节点之间同步，因此你连接到任何一个镜像节点，均可获取到消息。而且如果一个节点宕机，并不会导致数据丢失。不过，这种方式增加了数据同步的带宽消耗。

我们先来看普通模式集群，我们的计划部署3节点的mq集群：

| 主机名 | 控制台端口      | amqp通信端口    |
| ------ | --------------- | --------------- |
| mq1    | 8081 ---> 15672 | 8071 ---> 5672  |
| mq2    | 8082 ---> 15672 | 8072 ---> 5672  |
| mq3    | 8083 ---> 15672 | 8073  ---> 5672 |

普通集群，或者叫标准集群（classic cluster），具备下列特征：

- 会在集群的各个节点间共享部分数据，包括：交换机、队列元信息。不包含队列中的消息。
- 当访问集群某节点时，如果队列不在该节点，会从数据所在节点传递到当前节点并返回
- 队列所在节点宕机，队列中的消息就会丢失

结构如图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092116520.png" alt="image-20210718220843323" style="zoom: 67%;" />

集群中的节点标示默认都是：`rabbit@[hostname]`，因此以上三个节点的名称分别为：

- rabbit@mq1
- rabbit@mq2
- rabbit@mq3

## 获取cookie

RabbitMQ底层依赖于Erlang，而Erlang虚拟机就是一个面向分布式的语言，默认就支持集群模式。集群模式中的每个RabbitMQ 节点使用 cookie 来确定它们是否被允许相互通信。

要使两个节点能够通信，它们必须具有相同的共享秘密，称为**Erlang cookie**。cookie 只是一串最多 255 个字符的字母数字字符。

每个集群节点必须具有**相同的 cookie**。实例之间也需要它来相互通信。

我们先在之前启动的mq容器中获取一个cookie值，作为集群的cookie。执行下面的命令：

```sh
docker exec -it mq cat /var/lib/rabbitmq/.erlang.cookie
```

可以看到cookie值如下：

```sh
TLFQVSFLPDILZSZQLDXW#
```

接下来，停止并删除当前的mq容器，我们重新搭建集群。

```sh
docker rm -f mq
```

## 准备集群配置

在/tmp目录新建一个配置文件 rabbitmq.conf：

```sh
cd /tmp
# 创建文件
touch rabbitmq.conf
```

文件内容如下：

```nginx
# 禁用guest用户，防止不法分子访问
loopback_users.guest = false
# 监听端口5672
listeners.tcp.default = 5672
cluster_formation.peer_discovery_backend = rabbit_peer_discovery_classic_config
# 集群中节点信息
cluster_formation.classic_config.nodes.1 = rabbit@mq1
cluster_formation.classic_config.nodes.2 = rabbit@mq2
cluster_formation.classic_config.nodes.3 = rabbit@mq3
```

再创建一个文件，记录cookie

```sh
cd /tmp
# 创建cookie文件
touch .erlang.cookie
# 写入cookie
echo "TLFQVSFLPDILZSZQLDXW#" > .erlang.cookie
# 修改cookie文件的权限
chmod 600 .erlang.cookie
```

准备三个目录,mq1、mq2、mq3：

```sh
cd /tmp
# 创建目录
mkdir mq1 mq2 mq3
```

然后拷贝rabbitmq.conf、cookie文件到mq1、mq2、mq3：

```sh
# 进入/tmp
cd /tmp
# 拷贝
cp rabbitmq.conf mq1
cp rabbitmq.conf mq2
cp rabbitmq.conf mq3
cp .erlang.cookie mq1
cp .erlang.cookie mq2
cp .erlang.cookie mq3
```

## 启动集群

创建一个网络：

```sh
docker network create mq-net
```

注意：如果有端口占用，执行如下命令即可

```apl
lsof -i:端口号
kill -9 端口号
```

运行命令，依次启动mq1,mq2,mq3三台服务器

```sh
docker run -d --net mq-net \
-v ${PWD}/mq1/rabbitmq.conf:/etc/rabbitmq/rabbitmq.conf \
-v ${PWD}/.erlang.cookie:/var/lib/rabbitmq/.erlang.cookie \
-e RABBITMQ_DEFAULT_USER=itcast \
-e RABBITMQ_DEFAULT_PASS=123321 \
--name mq1 \
--hostname mq1 \
-p 8071:5672 \
-p 8081:15672 \
rabbitmq:3.8-management
```

```sh
docker run -d --net mq-net \
-v ${PWD}/mq2/rabbitmq.conf:/etc/rabbitmq/rabbitmq.conf \
-v ${PWD}/.erlang.cookie:/var/lib/rabbitmq/.erlang.cookie \
-e RABBITMQ_DEFAULT_USER=itcast \
-e RABBITMQ_DEFAULT_PASS=123321 \
--name mq2 \
--hostname mq2 \
-p 8072:5672 \
-p 8082:15672 \
rabbitmq:3.8-management
```

```sh
docker run -d --net mq-net \
-v ${PWD}/mq3/rabbitmq.conf:/etc/rabbitmq/rabbitmq.conf \
-v ${PWD}/.erlang.cookie:/var/lib/rabbitmq/.erlang.cookie \
-e RABBITMQ_DEFAULT_USER=itcast \
-e RABBITMQ_DEFAULT_PASS=123321 \
--name mq3 \
--hostname mq3 \
-p 8073:5672 \
-p 8083:15672 \
rabbitmq:3.8-management
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131547760.png" alt="image-20220913154758670" style="zoom:80%;" />

## 测试

访问任意链接即可

http://192.168.22.130:8081

http://192.168.22.130:8082

http://192.168.22.130:8083

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131549149.png" alt="image-20220913154930059" style="zoom:80%;" />

在mq1这个节点上添加一个队列：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206161351843.png" alt="image-20210717222833196" style="zoom: 50%;" />

如图，在mq2和mq3两个控制台也都能看到：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206161351852.png" alt="image-20210717223057902" style="zoom:67%;" />

### 数据共享测试

点击这个队列，进入管理页面：

![image-20210717223421750](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206161351857.png)

然后利用控制台发送一条消息到这个队列：

![image-20210717223320238](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206161351864.png)



结果在mq2、mq3上都能看到这条消息：

![image-20210717223603628](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206161351861.png)

### 可用性测试

我们让其中一台节点mq1宕机：

```sh
docker stop mq1
```

然后登录mq2或mq3的控制台，发现simple.queue也不可用了：

![image-20210717223800203](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206161351321.png)

说明数据并没有拷贝到mq2和mq3。

## Spring连接MQ集群

注意，这里用address来代替host、port方式

```java
spring:
  rabbitmq:
    addresses: 192.168.22.130:8071, 192.168.22.130:8072, 192.168.22.130:8073
    username: itcast
    password: 123321
    virtual-host: /
```

## 集群扩容

1）启动一个新的MQ容器：

```sh
docker run -d --net mq-net \
-v ${PWD}/.erlang.cookie:/var/lib/rabbitmq/.erlang.cookie \
-e RABBITMQ_DEFAULT_USER=itcast \
-e RABBITMQ_DEFAULT_PASS=123321 \
--name mq4 \
--hostname mq5 \
-p 8074:15672 \
-p 8084:15672 \
rabbitmq:3.8-management
```

2）进入容器控制台：

```sh
docker exec -it mq4 bash
```

3）停止mq进程

```sh
rabbitmqctl stop_app
```

4）重置RabbitMQ中的数据：

```sh
rabbitmqctl reset
```

5）加入mq1：

```sh
rabbitmqctl join_cluster rabbit@mq1
```

6）再次启动mq进程

```sh
rabbitmqctl start_app
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131651163.png" alt="image-20220913165118059" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131650978.png" alt="image-20220913165036887" style="zoom:80%;" />



# 镜像模式

> 镜像模式的作用就是增加集群的健壮性

在刚刚的案例中，一旦创建队列的主机宕机，队列就会不可用。不具备高可用能力。如果要解决这个问题，必须使用官方提供的镜像集群方案。

官方文档地址：https://www.rabbitmq.com/ha.html

## 镜像模式的特征

镜像集群：本质是主从模式，具备下面的特征：

- 交换机、队列、队列中的消息会在各个mq的镜像节点之间同步备份。
- 创建队列的节点被称为该队列的**主节点，**备份到的其它节点叫做该队列的**镜像**节点。
- 一个队列的主节点可能是另一个队列的镜像节点
- 所有操作都是主节点完成，然后同步给镜像节点
- 主宕机后，镜像节点会替代成新的主

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206092116521.png" alt="image-20210718221039542" style="zoom: 67%;" />

默认情况下，队列只保存在创建该队列的节点上。而镜像模式下，创建队列的节点被称为该队列的**主节点**，队列还会拷贝到集群中的其它节点，也叫做该队列的**镜像**节点。

但是，不同队列可以在集群中的任意节点上创建，因此不同队列的主节点可以不同。甚至，**一个队列的主节点可能是另一个队列的镜像节点**。

用户发送给队列的一切请求，例如发送消息、消息回执默认都会在主节点完成，如果是从节点接收到请求，也会路由到主节点去完成。**镜像节点仅仅起到备份数据作用**。

当主节点接收到消费者的ACK时，所有镜像都会删除节点中的数据。

总结如下：

- 镜像队列结构是一主多从（从就是镜像）
- 所有操作都是主节点完成，然后同步给镜像节点
- 主宕机后，镜像节点会替代成新的主（如果在主从同步完成前，主就已经宕机，可能出现数据丢失）
- 不具备负载均衡功能，因为所有操作都会有主节点完成（但是不同队列，其主节点可以不同，可以利用这个提高吞吐量）

## 镜像模式的配置

镜像模式的配置有3种模式：

| ha-mode         | ha-params         | 效果                                                         |
| :-------------- | :---------------- | :----------------------------------------------------------- |
| 准确模式exactly | 队列的副本量count | 集群中队列副本（主服务器和镜像服务器之和）的数量。count如果为1意味着单个副本：即队列主节点。count值为2表示2个副本：1个队列主和1个队列镜像。换句话说：count = 镜像数量 + 1。如果群集中的节点数少于count，则该队列将镜像到所有节点。如果有集群总数大于count+1，并且包含镜像的节点出现故障，则将在另一个节点上创建一个新的镜像。 |
| all             | (none)            | 队列在群集中的所有节点之间进行镜像。队列将镜像到任何新加入的节点。镜像到所有节点将对所有群集节点施加额外的压力，包括网络I / O，磁盘I / O和磁盘空间使用情况。推荐使用exactly，设置副本数为（N / 2 +1）。 |
| nodes           | *node names*      | 指定队列创建到哪些节点，如果指定的节点全部不存在，则会出现异常。如果指定的节点在集群中存在，但是暂时不可用，会创建节点到当前客户端连接到的节点。 |

这里我们以rabbitmqctl命令作为案例来讲解配置语法。

语法示例：

### exactly模式

```apl
rabbitmqctl set_policy ha-two "^two\." '{"ha-mode":"exactly","ha-params":2,"ha-sync-mode":"automatic"}'
```

- `rabbitmqctl set_policy`：固定写法
- `ha-two`：策略名称，自定义
- `"^two\."`：匹配队列的正则表达式，符合命名规则的队列才生效，这里是任何以`two.`开头的队列名称
- `'{"ha-mode":"exactly","ha-params":2,"ha-sync-mode":"automatic"}'`: 策略内容
  - `"ha-mode":"exactly"`：策略模式，此处是exactly模式，指定副本数量
  - `"ha-params":2`：策略参数，这里是2，就是副本数量为2，1主1镜像
  - `"ha-sync-mode":"automatic"`：同步策略，默认是manual，即新加入的镜像节点不会同步旧的消息。如果设置为automatic，则新加入的镜像节点会把主节点中所有消息都同步，会带来额外的网络开销

### all模式

```apl
rabbitmqctl set_policy ha-all "^all\." '{"ha-mode":"all"}'
```

- `ha-all`：策略名称，自定义
- `"^all\."`：匹配所有以`all.`开头的队列名
- `'{"ha-mode":"all"}'`：策略内容
  - `"ha-mode":"all"`：策略模式，此处是all模式，即所有节点都会称为镜像节点

### nodes模式

```apl
rabbitmqctl set_policy ha-nodes "^nodes\." '{"ha-mode":"nodes","ha-params":["rabbit@nodeA", "rabbit@nodeB"]}'
```

- `rabbitmqctl set_policy`：固定写法
- `ha-nodes`：策略名称，自定义
- `"^nodes\."`：匹配队列的正则表达式，符合命名规则的队列才生效，这里是任何以`nodes.`开头的队列名称
- `'{"ha-mode":"nodes","ha-params":["rabbit@nodeA", "rabbit@nodeB"]}'`: 策略内容
  - `"ha-mode":"nodes"`：策略模式，此处是nodes模式
  - `"ha-params":["rabbit@mq1", "rabbit@mq2"]`：策略参数，这里指定副本所在节点名称

## 测试

我们使用exactly模式的镜像，因为集群节点数量为3，因此镜像数量就设置为2.

运行下面的命令：

```sh
# 进入集群中任意mq即可
docker exec -it mq1 bash
rabbitmqctl set_policy ha-two "^two\." '{"ha-mode":"exactly","ha-params":2,"ha-sync-mode":"automatic"}'
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131557559.png" alt="image-20220913155726422" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131558140.png" alt="image-20220913155803068" style="zoom:80%;" />

下面，我们创建一个新的队列：

![image-20210717231751411](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206161351332.png)

在任意一个mq控制台查看队列：

![image-20210717231829505](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206161351338.png)

### 测试数据共享

给two.queue发送一条消息：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206161351344.png" alt="image-20210717231958996" style="zoom:80%;" />

然后在mq1、mq2、mq3的任意控制台查看消息：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206161351346.png" alt="image-20210717232108584" style="zoom:80%;" />

### 测试高可用

现在，我们让two.queue的主节点mq1宕机：

```sh
docker stop mq1
```

查看集群状态：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206161351351.png" alt="image-20210717232257420" style="zoom:80%;" />

查看队列状态：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206161351826.png" alt="image-20210717232322646" style="zoom:80%;" />

发现依然是健康的！并且其主节点切换到了rabbit@mq2上



# 仲裁队列

仲裁队列：仲裁队列是3.8版本以后才有的新功能，用来替代镜像队列，具备下列特征：

- 与镜像队列一样，都是主从模式，支持主从数据同步
- 使用非常简单，没有复杂的配置
- 主从同步基于Raft协议，强一致

## 添加仲裁队列⭐

### 控制台创建

在任意控制台添加一个队列，一定要选择队列类型为Quorum类型。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206161351829.png" alt="image-20210717234329640" style="zoom:80%;" />

### Bean创建创建

```java
@Bean
public Queue quorumQueue1() {
    return QueueBuilder
        .durable("quorum.queue1") // 持久化
        .quorum() // 仲裁队列
        .build();
}
```

### RabbitListener(推荐)

```java
@RabbitListener(bindings = @QueueBinding(
        value = @Queue(name = "quorum.queueS",
                arguments = @Argument(name = "x-queue-type",value = "quorum")),
        exchange = @Exchange(name = "quorumS.direct",type = ExchangeTypes.DIRECT),
        key = {"quorum"}
))
public void listenLazyQueue(String msg) {
    System.out.println("消费者接收到quorum.queue的消息：【" + msg + "】");
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131620044.png" alt="image-20220913162010966" style="zoom:80%;" />

在任意控制台查看队列：

> 可以看到，仲裁队列的 + 2字样。代表这个队列有2个镜像节点

可以看到，仲裁队列的 + 2字样。代表这个队列有2个镜像节点。

因为仲裁队列默认的镜像数为5。如果你的集群有7个节点，那么镜像数肯定是5；而我们集群只有3个节点，因此镜像数量就是3.

## 测试

可以参考对镜像集群的测试，效果是一样的。

### 1.测试数据共享

给two.queue发送一条消息：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131704447.png" alt="image-20220913170444357" style="zoom:80%;" />

然后在mq1、mq2、mq3的任意控制台查看消息：都能查看到消息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131706954.png" alt="image-20220913170619860" style="zoom:80%;" />



### 2.测试高可用

现在，我们让two.queue的主节点mq1宕机：

```sh
docker stop mq1
```

查看集群状态：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206161351351.png" alt="image-20210717232257420" style="zoom:80%;" />

查看队列状态：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206161351826.png" alt="image-20210717232322646" style="zoom:80%;" />

发现依然是健康的！并且其主节点切换到了rabbit@mq2上

## 增加仲裁队列副本

我们先查看下quorum.queue这个队列目前的副本情况，进入mq1容器：

```sh
docker exec -it mq1 bash
```

执行命令：

```sh
rabbitmq-queues quorum_status "quorum.queue"
```

结果：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131653036.png" alt="image-20220913165331917" style="zoom:80%;" />

现在，我们让mq2也加入进来：

```sh
rabbitmq-queues add_member "quorum.queue" "rabbit@mq2"
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131655060.png" alt="image-20220913165505981" style="zoom:80%;" />

再次查看：

```sh
rabbitmq-queues quorum_status "quorum.queue"
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131655484.png" alt="image-20220913165538366" style="zoom:80%;" />

查看控制台，发现quorum.queue的镜像数量也从原来的 +2 变成了 +3：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209131656063.png" alt="image-20220913165615979" style="zoom:80%;" />



# 即时通讯

[RabbitMQ实现即时通讯居然如此简单！连后端代码都省得写了？ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247486983&idx=1&sn=e38a908a60d4ec983e38903cafefb301&chksm=fc2fb20fcb583b199d0d29e3fc280b9048c9a82e89e7510e9b2f7f4bc2241046e7c877e6f5ca&mpshare=1&scene=23&srcid=0711QnUr0pCgNZAbPUnq1nA0&sharer_sharetime=1657500284051&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

> 有时候我们的项目中会用到`即时通讯`功能，比如电商系统中的客服聊天功能，还有在支付过程中，当用户支付成功后，第三方支付服务会回调我们的回调接口，此时我们需要通知前端支付成功。最近发现RabbitMQ可以很方便的实现`即时通讯`功能，如果你没有特殊的业务需求，甚至可以不写后端代码，今天给大家讲讲如何使用RabbitMQ来实现`即时通讯`！

## MQTT协议

MQTT（Message Queuing Telemetry Transport，消息队列遥测传输协议），是一种基于发布/订阅（publish/subscribe）模式的`轻量级`通讯协议，该协议构建于`TCP/IP`协议上。MQTT最大优点在于，可以以极少的代码和有限的带宽，为连接远程设备提供实时可靠的消息服务。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207111640246.png" alt="image-20220711164019157" style="zoom:67%;" />

## MQTT相关概念

- Publisher（发布者）：消息的发出者，负责发送消息。

- Subscriber（订阅者）：消息的订阅者，负责接收并处理消息。

- Broker（代理）：消息代理，位于消息发布者和订阅者之间，各类支持MQTT协议的消息中间件都可以充当。

- Topic（主题）：可以理解为消息队列中的路由，订阅者订阅了主题之后，就可以收到发送到该主题的消息。

- Payload（负载）；可以理解为发送消息的内容。

- QoS（消息质量）：全称Quality of Service，即消息的发送质量，主要有`QoS 0`、`QoS 1`、`QoS 2`三个等级，下面分别介绍下：

- - QoS 0（Almost Once）：至多一次，只发送一次，会发生消息丢失或重复；
  - QoS 1（Atleast Once）：至少一次，确保消息到达，但消息重复可能会发生；
  - QoS 2（Exactly Once）：只有一次，确保消息只到达一次。

## RabbitMQ启用MQTT功能

> RabbitMQ启用MQTT功能，需要先安装然RabbitMQ然后再启用MQTT插件。

首先我们需要安装并启动RabbitMQ

接下来就是启用RabbitMQ的MQTT插件了，默认是不启用的，使用如下命令开启即可；

```apl
# 进入mq内部
docker exec -it mq bash
# 开放插件
rabbitmq-plugins enable rabbitmq_mqtt
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209012141114.png" alt="image-20220901214107997" style="zoom:80%;" />

开启成功后，查看管理控制台，我们可以发现MQTT服务运行在`1883`端口上了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209012140950.png" alt="image-20220901214041816" style="zoom: 67%;" />







































