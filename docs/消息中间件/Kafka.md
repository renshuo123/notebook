



# Kafka是什么、主要应用在什么场景

## 1、kafka是什么？

Kafka是由LinkedIn开发的一个分布式基于发布/订阅的消息系统，使用Scala编写，它以可水平扩展和高吞吐率而被广泛使用。

## 2、产生背景

Kafka是一个消息系统，用作LinkedIn的活动流（Activity Stream）和运营数据处理管道（Pipeline）的基础。活动流数据是几乎所有站点在对其网站使用情况做报表时都要用到的数据中最常规的部分。

活动数据包括页面访问量（Page View）、被查看内容方面的信息以及搜索情况等内容。这种数据通常的处理方式是先把各种活动以日志的形式写入某种文件，然后周期性地对这些文件进行统计分析。

运营数据指的3是服务器的性能数据（CPU、IO使用率、请求时间、服务日志等等数据)。运营数据的统计方法种类繁多。

## 3、基本架构图

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207301846301.png" alt="image-20220730184620228" style="zoom:67%;" />

## 4、基本概念解释

#### 1）Broker

Kafka集群包含一个或多个服务器，这种服务器被称为broker。broker端不维护数据的消费状态，提升了性能。直接使用磁盘进行存储，线性读写，速度快：避免了数据在JVM内存和系统内存之间的复制，减少耗性能的创建对象和垃圾回收。

#### 2）Producer

负责发布消息到Kafka broke

#### 3）Consumer

消息消费者，向Kafka broker读取消息的客户端，consumer从broker拉取(pull)数据并进行处理。

#### 4）Topic

每条发布到Kafka集群的消息都有一个类别，这个类别被称为Topic。（物理上不同Topic的消息分开存储，逻辑上一个Topic的消息虽然保存于一个或多个broker上但用户只需指定消息的Topic即可生产或消费数据而不必关心数据存于何处）

#### 5）Partition

Parition是物理上的概念，每个Topic包含一个或多个Partition.

#### 6）Consumer Group

每个Consumer属于一个特定的Consumer Group（可为每个Consumer指定group name，若不指定group name则属于默认的group）

#### 7）Topic & Partition

Topic在逻辑上可以被认为是一个queue，每条消费都必须指定它的Topic，可以简单理解为必须指明把这条消息放进哪个queue里。为了使得Kafka的吞吐率可以线性提高，物理上把Topic分成一个或多个Partition，每个Partition在物理上对应一个文件夹，该文件夹下存储这个Partition的所有消息和索引文件。

若创建topic1和topic2两个topic，且分别有13个和19个分区，则整个集群上会相应会生成共32个文件夹（本文所用集群共8个节点，此处topic1和topic2 replication-factor均为1）。

## 5、适用场景

### 2.1 消息Messaging

Kafka可以替代更传统的消息代理。消息代理的使用有多种原因（将处理与数据生成器分离，缓冲未处理的消息等）。与大多数消息传递系统相比，Kafka具有更好的吞吐量，内置分区，复制和容错功能，这使其成为大规模消息处理应用程序的理想解决方案。根据经验，消息传递的使用通常相对较低，但可能需要较低的端到端延迟，并且通常取决于Kafka提供的强大的耐用性保证。在这个领域，Kafka可与传统的消息传递系统（如ActiveMQ或 RabbitMQ）相媲美。

对于一些常规的消息系统,kafka是个不错的选择;partitons/replication和容错,可以使kafka具有良好的扩展性和性能优势.不过到目前为止,我们应该很清楚认识到,kafka并没有提供JMS中的"事务性""消息传输担保(消息确认机制)""消息分组"等企业级特性;kafka只能使用作为"常规"的消息系统,在一定程度上,尚未确保消息的发送与接收绝对可靠(比如,消息重发,消息发送丢失等)

### 2.2 网站活动跟踪

kafka可以作为"网站活性跟踪"的最佳工具;可以将网页/用户操作等信息发送到kafka中.并实时监控,或者离线统计分析等

Kafka的原始用例是能够将用户活动跟踪管道重建为一组实时发布 - 订阅源。这意味着站点活动（页面查看，搜索或用户可能采取的其他操作）将发布到中心主题，每个活动类型包含一个主题。这些源可用于订购一系列用例，包括实时处理，实时监控以及加载到Hadoop或离线数据仓库系统以进行脱机处理和报告。

活动跟踪通常非常高，因为为每个用户页面视图生成了许多活动消息。

### 2.3 度量Metrics

Kafka通常被用于可操作的监控数据。这包括从分布式应用程序来的聚合统计用来生产集中的运营数据提要。

Kafka通常用于运营监控数据。这涉及从分布式应用程序聚合统计信息以生成操作数据的集中式提要。

### 2.4 日志聚合

kafka的特性决定它非常适合作为"日志收集中心";application可以将操作日志"批量""异步"的发送到kafka集群中,而不是保存在本地或者DB中;kafka可以批量提交消息/压缩消息等,这对producer端而言,几乎感觉不到性能的开支.此时consumer端可以使hadoop等其他系统化的存储和分析系统

许多人使用Kafka作为日志聚合解决方案的替代品。日志聚合通常从服务器收集物理日志文件，并将它们放在中央位置（可能是文件服务器或HDFS）进行处理。Kafka抽象出文件的细节，并将日志或事件数据作为消息流更清晰地抽象出来。这允许更低延迟的处理并更容易支持多个数据源和分布式数据消耗。与Scribe或Flume等以日志为中心的系统相比，Kafka提供了同样出色的性能，由于复制而具有更强的耐用性保证，以及更低的端到端延迟。

### 2.5 流处理

许多Kafka用户在处理由多个阶段组成的管道时处理数据，其中原始输入数据从Kafka主题中消费，然后聚合，丰富或以其他方式转换为新主题以供进一步消费或后续处理。

例如，用于推荐新闻文章的处理管道可以从RSS订阅源抓取文章内容并将其发布到“文章”主题; 进一步处理可能会对此内容进行规范化或重复数据删除，并将已清理的文章内容发布到新主题; 最终处理阶段可能会尝试向用户推荐此内容。此类处理管道基于各个主题创建实时数据流的图形。从0.10.0.0开始，这是一个轻量级但功能强大的流处理库，名为Kafka Streams 在Apache Kafka中可用于执行如上所述的此类数据处理。除了Kafka Streams之外，其他开源流处理工具包括Apache Storm和 Apache Samza。

### 2.6 Event Sourcing

Event Sourcing是一种应用程序设计风格，其中状态更改记录为按时间排序的记录序列。Kafka对非常大的存储日志数据的支持使其成为以这种风格构建的应用程序的出色后端。

### 2.7 提交日志

Kafka可以作为分布式系统的一种外部提交日志。该日志有助于在节点之间复制数据，并充当故障节点恢复其数据的重新同步机制。Kafka中的日志压缩功能有助于支持此用法。在这种用法中，Kafka类似于Apache BookKeeper项目。

### 1.6 kafka作为消息系统

Kafka的流概念与传统的企业邮件系统相比如何？

**（1）传统消息系统**

消息传统上有两种模型：queuing排队 and publish-subscribe发布 - 订阅。在队列中，消费者池可以从服务器读取并且每个记录转到其中一个; 在发布 - 订阅中，记录被广播给所有消费者。这两种模型中的每一种都有优点和缺点。排队的优势在于它允许您在多个消费者实例上划分数据处理，从而可以扩展您的处理。不幸的是，一旦一个进程读取它已经消失的数据，队列就不是多用户。发布 - 订阅允许您将数据广播到多个进程，但由于每条消息都发送给每个订阅者，因此无法进行扩展处理。

卡夫卡的消费者群体概念概括了这两个概念。与队列一样，使用者组允许您将处理划分为一组进程（使用者组的成员）。与发布 - 订阅一样，Kafka允许您向多个消费者组广播消息。

**（2）kafka 的优势**

Kafka模型的优势在于每个主题都具有这些属性 - 它可以扩展处理并且也是多用户 - 不需要选择其中一个。

与传统的消息系统相比，Kafka具有更强的订购保证。

传统队列在服务器上按顺序保留记录，如果多个消费者从队列中消耗，则服务器按照存储顺序分发记录。但是，虽然服务器按顺序分发记录，但是记录是异步传递给消费者的，因此它们可能会在不同的消费者处出现故障。这实际上意味着在存在并行消耗的情况下丢失记录的顺序。消息传递系统通常通过具有“独占消费者”概念来解决这个问题，该概念只允许一个进程从队列中消耗，但当然这意味着处理中没有并行性。

kafka做得更好。通过在主题中具有并行性概念 - 分区 - ，Kafka能够在消费者流程池中提供订购保证和负载平衡。这是通过将主题中的分区分配给使用者组中的使用者来实现的，以便每个分区仅由该组中的一个使用者使用。通过这样做，我们确保使用者是该分区的唯一读者并按顺序使用数据。由于有许多分区，这仍然可以平衡许多消费者实例的负载。但请注意，消费者组中的消费者实例不能超过分区。

### 1.7 kafka作为存储系统

- 任何允许发布与消费消息分离的消息的消息队列实际上充当了正在进行的消息的存储系统。Kafka的不同之处在于它是一个非常好的存储系统。
- 写入Kafka的数据将写入磁盘并进行复制以实现容错。Kafka允许生产者等待确认，以便在完全复制之前写入不被认为是完整的，并且即使写入的服务器失败也保证写入仍然存在。
- 磁盘结构Kafka很好地使用了规模 - 无论服务器上有50 KB还是50 TB的持久数据，Kafka都会执行相同的操作。
- 由于认真对待存储并允许客户端控制其读取位置，您可以将Kafka视为一种专用于高性能，低延迟提交日志存储，复制和传播的专用分布式文件系统。

### 1.8 kafka用于流处理

- 仅仅读取，写入和存储数据流是不够的，目的是实现流的实时处理。
- 在Kafka中，流处理器是指从输入主题获取连续数据流，对此输入执行某些处理以及生成连续数据流以输出主题的任何内容。
- 例如，零售应用程序可能会接收销售和发货的输入流，并输出重新排序流和根据此数据计算的价格调整。
- 可以使用生产者和消费者API直接进行简单处理。但是，对于更复杂的转换，Kafka提供了完全集成的Streams API。这允许构建执行非平凡处理的应用程序，这些应用程序可以计算流的聚合或将流连接在一起。
- 此工具有助于解决此类应用程序面临的难题：处理无序数据，在代码更改时重新处理输入，执行有状态计算等。
- 流API构建在Kafka提供的核心原语上：它使用生产者和消费者API进行输入，使用Kafka进行有状态存储，并在流处理器实例之间使用相同的组机制来实现容错。

# Kafka入门

[吊炸天的 Kafka 图形化工具 Eagle，必须推荐给你！ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247491363&idx=1&sn=192a2e882a697305300c277c553d6188&chksm=fc2fa32bcb582a3d3c9d61e9f1a88f932011382d71c5681705a38421531b784377622bec1405&scene=178&cur_album_id=1918334279751663626#rd)

> 我们将采用Linux下的安装方式，安装环境为CentOS 7.6。此处没有采用Docker来安装部署，个人感觉直接安装更简单（主要是官方没提供Docker镜像）！

## 安装

首先我们需要下载Kafka的安装包，

下载网站：https://www.apache.org/dyn/closer.cgi?path=/kafka/3.2.0/kafka_2.13-3.2.0.tgz

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207271608757.png" alt="image-20220727160815635" style="zoom:67%;" />

下载完成后将Kafka解压到指定目录：

解压完成后进入到解压目录：

```c
mkdir -p /mydata/kafka/ 
cd /mydata/kafka/
tar -xvf kafka_2.13-3.2.0.tgz
```

```c
cd /mydata/kafka/kafka_2.13-3.2.0
```

虽然有消息称Kafka即将移除Zookeeper，但是在Kafka最新版本中尚未移除，所以启动Kafka前还是需要先启Zookeeper；

启动Zookeeper服务，服务将运行在`2181`端口；

```c
// 后台运行服务，并把日志输出到当前文件夹下的zookeeper-out.file文件中
nohup bin/zookeeper-server-start.sh config/zookeeper.properties > zookeeper-out.file 2>&1 &
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207271612068.png" alt="image-20220727161252012" style="zoom:67%;" />

- 最后启动Kafka服务，服务将运行在`9092`端口。

```c
// 后台运行服务，并把日志输出到当前文件夹下的kafka-out.file文件中
nohup bin/kafka-server-start.sh config/server.properties > kafka-out.file 2>&1 &
```

## Kafka命令行操作

> 接下来我们使用命令行来操作下Kafka，熟悉下Kafka的使用。

- 首先创建一个叫`consoleTopic`的Topic；

```c
bin/kafka-topics.sh --create --topic consoleTopic --bootstrap-server 192.168.22.130:9092
```

- 接下来查看Topic；

```c
bin/kafka-topics.sh --describe --topic consoleTopic --bootstrap-server 192.168.22.130:9092
```

- 会显示如下Topic信息；

```c
Topic: consoleTopic TopicId: tJmxUQ8QRJGlhCSf2ojuGw PartitionCount: 1 ReplicationFactor: 1 Configs: segment.bytes=1073741824
Topic: consoleTopic Partition: 0 Leader: 0 Replicas: 0 Isr: 0
```

- 向Topic中发送消息：

```c
bin/kafka-console-producer.sh --topic consoleTopic --bootstrap-server 192.168.22.130:9092
```

- 直接在命令行中输入信息即可发送；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207271615576.png" alt="image-20220727161530468" style="zoom:67%;" />

- 重新打开一个窗口，通过如下命令可以从Topic中获取消息：

```c
cd /mydata/kafka/kafka_2.13-3.2.0
```

```c
bin/kafka-console-consumer.sh --topic consoleTopic --from-beginning --bootstrap-server 192.168.22.130:9092
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207271616215.png" alt="image-20220727161603101" style="zoom:67%;" />



## Kafka可视化(未完)

> 使用命令行操作Kafka确实有点麻烦，接下来我们试试可视化工具`kafka-eagle`。

### 安装JDK

> 如果你使用的是CentOS的话，默认没有安装完整版的JDK，需要自行安装！

下载JDK 8

下载完成后将JDK解压到指定目录；

```c
cd /mydata/java
tar -zxvf OpenJDK8U-jdk_x64_linux_xxx.tar.gz
mv OpenJDK8U-jdk_x64_linux_xxx.tar.gz jdk1.8
```

在`~/.bashrc`文件中添加环境变量`JAVA_HOME`。

> 注意：在~/.bashrc生效，在/etc/profile不起作用

```c
vim ~/.bashrc
// 添加以下配置到文件末尾
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
// 使修改后的profile文件生效
source ~/.bashrc
// 测试
java -version
```

### 安装kafka-eagle

官网：https://www.kafka-eagle.org/articles/docs/installation/linux-macos.html

下载`kafka-eagle`的安装包，下载地址：[Download - EFAK (kafka-eagle.org)](http://download.kafka-eagle.org/)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207271643477.png" alt="image-20220727164322391" style="zoom:50%;" />

- 下载完成后将`kafka-eagle`解压到指定目录；

```c
cd /mydata/kafka/
tar -zxvf kafka-eagle-bin-3.0.0.tar.gz
```

- 在`/etc/profile`文件中添加环境变量`KE_HOME`；

```c
vi /etc/profile
// 在profile文件中添加
export KE_HOME=/mydata/kafka/kafka-eagle-bin-3.0.0.tar.gz
export PATH=$PATH:$KE_HOME/bin
// 使修改后的profile文件生效
source /etc/profile
```

安装MySQL并添加数据库`ke`，`kafka-eagle`之后会用到它；

> 新版本默认就是这个，不用修改

修改配置文件`$KE_HOME/conf/system-config.properties`，主要是修改Zookeeper的配置和数据库配置，注释掉sqlite配置，改为使用MySQL；

```apl
######################################
# multi zookeeper & kafka cluster list
######################################
kafka.eagle.zk.cluster.alias=cluster1
cluster1.zk.list=localhost:2181

######################################
# kafka eagle webui port
######################################
kafka.eagle.webui.port=8048

######################################
# kafka sqlite jdbc driver address
######################################
# kafka.eagle.driver=org.sqlite.JDBC
# kafka.eagle.url=jdbc:sqlite:/hadoop/kafka-eagle/db/ke.db
# kafka.eagle.username=root
# kafka.eagle.password=www.kafka-eagle.org

######################################
# kafka mysql jdbc driver address
######################################
kafka.eagle.driver=com.mysql.cj.jdbc.Driver
kafka.eagle.url=jdbc:mysql://localhost:3306/ke?useUnicode=true&characterEncoding=UTF-8&zeroDateTimeBehavior=convertToNull
kafka.eagle.username=root
kafka.eagle.password=123456
```

- 使用如下命令启动`kafka-eagle`；

```c
$KE_HOME/bin/ke.sh start
```

- 命令执行完成后会显示如下信息，但并不代表服务已经启动成功，还需要等待一会；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207271746142.png" alt="image-20220727174648888" style="zoom: 50%;" />

- 再介绍几个有用的`kafka-eagle`命令：

```apl
# 停止服务
$KE_HOME/bin/ke.sh stop
# 重启服务
$KE_HOME/bin/ke.sh restart
# 查看服务运行状态
$KE_HOME/bin/ke.sh status
# 查看服务状态
$KE_HOME/bin/ke.sh stats
# 动态查看服务输出日志
tail -f $KE_HOME/logs/ke_console.out
```

启动成功可以直接访问，输入账号密码`admin:123456`，访问地址：http://192.168.22.130:8048/

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwle2ibwolibnYTEfBhvAfqLibEQxf9P69vfd3Uicq28ISCxAxibiaLiav9vqGOfXGah77SS0nBINqZBwuZcA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 登录成功后可以访问到Dashboard，界面还是很棒的！

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwle2ibwolibnYTEfBhvAfqLibE2prqkcSrdPzv5VoguOKmmX0cRMVEZyM6QKd6BnAMnnOmQGt9eaa7gQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 可视化工具使用

- 之前我们使用命令行创建了Topic，这里可以直接通过界面来创建；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwle2ibwolibnYTEfBhvAfqLibEe5hiasfhboIgQTwhGKETmyb3gIPIx0Qjk4dCB5mYEN8gkVCBHlphedA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 我们还可以直接通过`kafka-eagle`来发送消息；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwle2ibwolibnYTEfBhvAfqLibEHSf9RvcutNJ6rJGVL7pI3ElhNzNR4nJErsbwUjc3NOVRLGP6amkbicQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 我们可以通过命令行来消费Topic中的消息；

```
bin/kafka-console-consumer.sh --topic testTopic --from-beginning --bootstrap-server 192.168.22.130:9092
```

- 控制台获取到信息显示如下；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwle2ibwolibnYTEfBhvAfqLibEr06PMFhaBJAANB5Xl2cp4AL7uRg7QIX4Yj1GqFYkZs5deJuNnRccDA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 还有一个很有意思的功能叫`KSQL`，可以通过SQL语句来查询Topic中的消息；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwle2ibwolibnYTEfBhvAfqLibEeLiaNUy6UKItIKbGYxwl1Q7tevU3mocWfp5OFy20jQs2lmrFOT3xhCQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 可视化工具自然少不了监控，如果你想开启`kafka-eagle`对Kafka的监控功能的话，需要修改Kafka的启动脚本，暴露JMX的端口；

```
vi kafka-server-start.sh
# 暴露JMX端口
if [ "x$KAFKA_HEAP_OPTS" = "x" ]; then
    export KAFKA_HEAP_OPTS="-server -Xms2G -Xmx2G -XX:PermSize=128m -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -XX:ParallelGCThreads=8 -XX:ConcGCThreads=5 -XX:InitiatingHeapOccupancyPercent=70"
    export JMX_PORT="9999"
fi
```

- 来看下监控图表界面；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwle2ibwolibnYTEfBhvAfqLibEibwJLuaf0980hlsMCrwQR9WM4lT1hVcJl1KqcwJxJHQKFV8TEJWCesw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 还有一个很骚气的监控大屏功能；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwle2ibwolibnYTEfBhvAfqLibEWz3EguqfRPxicyxz253iccLcNOIibmPuBTz5uqXhsYicZMlYkRbs8XuuOQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 还有Zookeeper的命令行功能，总之功能很全，很强大！

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwle2ibwolibnYTEfBhvAfqLibEE8fQ67RbPffLB6Y6PT16DdP2yiaNrlVymxPq6VwewBamNL9zdtPpJag/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)





## SpringBoot整合Kafka

> 在SpringBoot中操作Kafka也是非常简单的，比如Kafka的消息模式很简单，没有队列，只有Topic。

- 首先在应用的`pom.xml`中添加Spring Kafka依赖；

```xml
<!--Spring整合Kafka-->
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
    <version>2.7.1</version>
</dependency>
```

- 修改应用配置文件`application.yml`，配置Kafka服务地址及consumer的`group-id`；

```yml
server:
  port: 8088
spring:
  kafka:
    bootstrap-servers: '192.168.22.130:9092'
    consumer:
      group-id: "bootGroup"
```

- 创建一个生产者，用于向Kafka的Topic中发送消息；

```java
/**
 * Kafka消息生产者
 * Created by macro on 2021/5/19.
 */
@Component
public class KafkaProducer {
    @Autowired
    private KafkaTemplate kafkaTemplate;

    public void send(String message){
        kafkaTemplate.send("bootTopic",message);
    }
}
```

- 创建一个消费者，用于从Kafka中获取消息并消费；

```java
/**
 * Kafka消息消费者
 * Created by macro on 2021/5/19.
 */
@Slf4j
@Component
public class KafkaConsumer {

    @KafkaListener(topics = "bootTopic")
    public void processMessage(String content) {
        log.info("consumer processMessage : {}",content);
    }
}
```

- 创建一个发送消息的接口，调用生产者去发送消息；

```java
@Controller
@RequestMapping("/kafka")
public class KafkaController {

    @Autowired
    private KafkaProducer kafkaProducer;

    @ApiOperation("发送消息")
    @RequestMapping(value = "/sendMessage", method = RequestMethod.GET)
    @ResponseBody
    public CommonResult sendMessage(@RequestParam String message) {
        kafkaProducer.send(message);
        return CommonResult.success(null);
    }
}
```

- 直接在Swagger中调用接口进行测试；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwle2ibwolibnYTEfBhvAfqLibEo5ASINqzAlfNUNibicbHeHWv1OBKt8uiahd1btTib2TwNTxkia0Q6q8g5Nw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

项目控制台会输出如下信息，表明消息已经被接收并消费掉了。

# 可视化管理工具

> Kafka 是一个分布式、支持分区的、多副本的，基于 zookeeper 协调的分布式消息系统，它的最大的特性是可以实时处理大量数据以满足各种需求场景。如何将复杂的 **Kafka 命令行操作转化为GUI**，加速应用开发和数据集成一直是我们需要的。今天给大家推荐一款一站式 Kafka 集群管控平台 -- Know Streaming 。

项目地址：https://github.com/didi/KnowStreaming

## 项目简介

> Know Streaming 是一套云原生的 Kafka 监控平台，用于管理和观测 kafka ，降低 Kafka CLI 操作门槛，轻松实现 Kafka 集群可视化监控，加速 DataOps 落地。Know Streaming 实现了 Kafka 运维管控、监控告警、资源治理、多活容灾等核心功能。

![图片](https://mmbiz.qpic.cn/mmbiz_png/4XgGs2SeJoHJ9cv5D8xWwP1RhrxZibZLOFMtQse4lwg6sbj6uvTzfyChyEQRl9yKEeSDgweZvZ5CuZBbWzrMzNA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 项目特点

### 零侵入

不需要对 kafka 进行改造，可以接入 0.10.x-3.x.x 多版本 Kafka

### 可视化

提供简洁的可视化界面，支持 Cluster、Broker、Topic、Zookeeper、Message、Consumer等组件可视化管理

### 功能丰富

- 多集群管理：Cluster 、Broker 、Topic 、Group 、Message 、Security、Jobs 等功能模块管理
- 系统管理：配置管理、用户管理、审计日志等功能模块
- 异常检查：多维度健康巡检、多维度健康分析
- Topic 管理：Topic 扩分区、Topic 扩缩副本、Topic 副本迁移、Topic 删除
- 观测能力：多个维度指标观测大盘，核心组件观测功能

## 安装使用

### 脚本部署

```sh
# 下载安装脚本, 该脚本中会在当前目录下，重新安装MySQL。
# 重装后的mysql密码存放在当前目录的mysql.password文件中。
wget https://s3-gzpu.didistatic.com/pub/knowstreaming/deploy_KnowStreaming.sh

# 执行脚本
sh deploy_KnowStreaming.sh
```

### 登录系统

打开浏览器访问：http://127.0.0.1:8080

默认账号和密码：`admin` / `admin`。（v3.0 beta1 默认账号和密码为：`admin` / `admin2022_`）

### 使用流程

1、接入集群，添加集群信息

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/4XgGs2SeJoHJ9cv5D8xWwP1RhrxZibZLO6uhVTMoHcls3K2KXydicwU38jJAQiatG43ib4rMNbmbDns5FFQkOLLJdA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

2、新增 Topic

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/4XgGs2SeJoHJ9cv5D8xWwP1RhrxZibZLODYOGMuru2NAdSpjKAUDFo1knLc9ghYrNibQbHFb6hJUyonXdFiaAt7Nw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

3、设置健康检查规则

设置 Cluster 、Broker、Topic、ConsumerGroup等组件的检查规则

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/4XgGs2SeJoHJ9cv5D8xWwP1RhrxZibZLO6GGicM31XJKxSMolic8U1v7o4oxiakfsZwdyHLzvPibXfWicLtZGa1cVl4A/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

4、图表指标筛选

勾选 Health、Cluster、Broker、Consumer、Security、Job 等指标进行展示

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/4XgGs2SeJoHJ9cv5D8xWwP1RhrxZibZLOMTwqpd9O3ZUWuib05LKhv9JXH1SjlledZS6UEiaHrYTdZSiayCz7RmljQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

# Kafka 顺序消费方案

## 前言

本文针对解决Kafka不同Topic之间存在一定的数据关联时的顺序消费问题。如存在Topic-insert和Topic-update分别是对数据的插入和更新，当insert和update操作为同一数据时，应保证先insert再update。

## 1、问题引入

kafka的顺序消费一直是一个难以解决的问题，kafka的消费策略是对于同Topic同Partition的消息可保证顺序消费，其余无法保证。如果一个Topic只有一个Partition，那么这个Topic对应consumer的消费必然是有序的。不同的Topic的任何情况下都无法保证consumer的消费顺序和producer的发送顺序一致。

如果不同Topic之间存在数据关联且对消费顺序有要求，该如何处理？本文主要解决此问题。

## 2、解决思路

现有Topic-insert和Topic-update，数据唯一标识为id，对于id=1的数据而言，要保证Topic-insert消费在前，Topic-update消费在后。

**两个Topic的消费为不同线程处理，所以为了保证在同一时间内的同一数据标识的消息仅有一个业务逻辑在处理，需要对业务添加锁操作。** 使用synchronized进行加锁的话，会影响无关联的insert和update的数据消费能力，如id=1的insert和id=2的update，在synchronized的情况下，无法并发处理，这是没有必要的，我们需要的是对于id=1的insert和id=1的update在同一时间只有一个在处理，所以使用细粒度锁来完成加锁的操作。

细粒度锁实现：https://blog.csdn.net/qq_38245668/article/details/105891161

> PS：如果为分布式系统，细粒度锁需要使用分布式锁的对应实现。

**在对insert和update加锁之后，其实还是没有解决消费顺序的问题，只是确保了同一时间只有一个业务在处理。** 对于消费顺序异常的问题，也就是先消费了update再消费insert的情况。

**处理方式：消费到update数据，校验库中是否存在当前数据（也就是是否执行insert），如果没有，就将当前update数据存入缓存，key为数据标识id，在insert消费时检查是否存在id对应的update缓存，如果有，就证明当前数据的消费顺序异常，需执行update操作，再将缓存数据移除。**

## 3、实现方案

消息发送：

```java
kafkaTemplate.send("TOPIC_INSERT", "1");
kafkaTemplate.send("TOPIC_UPDATE", "1");
```

监听代码示例：

KafkaListenerDemo.java

```java
@Component
@Slf4j
public class KafkaListenerDemo {

    // 消费到的数据缓存
    private Map<String, String> UPDATE_DATA_MAP = new ConcurrentHashMap<>();
    // 数据存储
    private Map<String, String> DATA_MAP = new ConcurrentHashMap<>();
    private WeakRefHashLock weakRefHashLock;

    public KafkaListenerDemo(WeakRefHashLock weakRefHashLock) {
        this.weakRefHashLock = weakRefHashLock;
    }

    @KafkaListener(topics = "TOPIC_INSERT")
    public void insert(ConsumerRecord<String, String> record, 
                       Acknowledgment acknowledgment) throws InterruptedException{
        // 模拟顺序异常，也就是insert后消费，这里线程sleep
        Thread.sleep(1000);

        String id = record.value();
        log.info("接收到insert ：： {}", id);
        Lock lock = weakRefHashLock.lock(id);
        lock.lock();
        try {
            log.info("开始处理 {} 的insert", id);
            // 模拟 insert 业务处理
            Thread.sleep(1000);
            // 从缓存中获取 是否存在有update数据
            if (UPDATE_DATA_MAP.containsKey(id)){
                // 缓存数据存在，执行update
                doUpdate(id);
            }
            log.info("处理 {} 的insert 结束", id);
        }finally {
            lock.unlock();
        }
        acknowledgment.acknowledge();
    }

    @KafkaListener(topics = "TOPIC_UPDATE")
    public void update(ConsumerRecord<String, String> record, 
                       Acknowledgment acknowledgment) throws InterruptedException{

        String id = record.value();
        log.info("接收到update ：： {}", id);
        Lock lock = weakRefHashLock.lock(id);
        lock.lock();
        try {
            // 测试使用，不做数据库的校验
            if (!DATA_MAP.containsKey(id)){
                // 未找到对应数据，证明消费顺序异常，将当前数据加入缓存
                log.info("消费顺序异常，将update数据 {} 加入缓存", id);
                UPDATE_DATA_MAP.put(id, id);
            }else {
                doUpdate(id);
            }
        }finally {
            lock.unlock();
        }
        acknowledgment.acknowledge();
    }

    void doUpdate(String id) throws InterruptedException{
        // 模拟 update
        log.info("开始处理update：：{}", id);
        Thread.sleep(1000);
        log.info("处理update：：{} 结束", id);
    }

}
```

日志（代码中已模拟必现消费顺序异常的场景）：

```
接收到update ：：1
消费顺序异常，将update数据 1 加入缓存
接收到insert ：：1
开始处理 1 的insert
开始处理update：：1
处理update：：1 结束
处理 1 的insert 结束
```

观察日志，此方案可正常处理不同Topic再存在数据关联的消费顺序问题。

# Kafka基本功能

## 4、kafka使用简单入门

### 4.1 创建主题topics

创建一个名为“along”的主题，它只包含一个分区，只有一个副本：

```apl
[root@along ~]# kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic along  
Created topic "along".  
```

如果我们运行list topic命令，我们现在可以看到该主题：

```apl
[root@along ~]# kafka-topics.sh --list --zookeeper localhost:2181  
along  
```

### 4.2 发送一些消息

Kafka附带一个命令行客户端，它将从文件或标准输入中获取输入，并将其作为消息发送到Kafka集群。默认情况下，每行将作为单独的消息发送。

运行生产者，然后在控制台中键入一些消息以发送到服务器。

```apl
[root@along ~]# kafka-console-producer.sh --broker-list localhost:9092 --topic along  
>This is a message  
>This is another message  
```

### 4.3 启动消费者

Kafka还有一个命令行使用者，它会将消息转储到标准输出。

```apl
[root@along ~]# kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic along --from-beginning  
This is a message  
This is another message  
```

所有命令行工具都有其他选项; 运行不带参数的命令将显示更详细地记录它们的使用信息。

## 5、设置多代理kafka群集

到目前为止，我们一直在与一个broker运行，但这并不好玩。对于Kafka，单个代理只是一个大小为1的集群，因此除了启动一些代理实例之外没有太多变化。但是为了感受它，让我们将我们的集群扩展到三个节点（仍然在我们的本地机器上）。

### 5.1 准备配置文件

```apl
[root@along kafka_2.11-2.1.0]# cd /data/kafka_2.11-2.1.0/  
[root@along kafka_2.11-2.1.0]# cp config/server.properties config/server-1.properties  
[root@along kafka_2.11-2.1.0]# cp config/server.properties config/server-2.properties  
[root@along kafka_2.11-2.1.0]# vim config/server-1.properties  
    broker.id=1  
    listeners=PLAINTEXT://:9093  
    log.dirs=/tmp/kafka-logs-1  
[root@along kafka_2.11-2.1.0]# vim config/server-2.properties  
    broker.id=2  
    listeners=PLAINTEXT://:9094  
    log.dirs=/tmp/kafka-logs-2  
```

注：该broker.id 属性是群集中每个节点的唯一且永久的名称。我们必须覆盖端口和日志目录，因为我们在同一台机器上运行这些，并且我们希望让所有代理尝试在同一端口上注册或覆盖彼此的数据。

### 5.2 开启集群另2个kafka服务

```apl
[root@along ~]# nohup kafka-server-start.sh /data/kafka_2.11-2.1.0/config/server-1.properties &  
[root@along ~]# nohup kafka-server-start.sh /data/kafka_2.11-2.1.0/config/server-2.properties &  
[root@along ~]# ss -nutl  
Netid State      Recv-Q Send-Q     Local Address:Port                    Peer Address:Port                            
tcp   LISTEN     0      50      ::ffff:127.0.0.1:9092                              :::*                   
tcp   LISTEN     0      50      ::ffff:127.0.0.1:9093                              :::*                                  
tcp   LISTEN     0      50      ::ffff:127.0.0.1:9094                              :::*  
```

### 5.3 在集群中进行操作

**1）现在创建一个复制因子为3的新主题my-replicated-topic**

```apl
[root@along ~]# kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 3 --partitions 1 --topic my-replicated-topic  
Created topic "my-replicated-topic".  
```

**2）在一个集群中，运行“describe topics”命令查看哪个broker正在做什么**

```apl
[root@along ~]# kafka-topics.sh --describe --zookeeper localhost:2181 --topic my-replicated-topic  
Topic:my-replicated-topic   PartitionCount:1    ReplicationFactor:3 Configs:  
    Topic: my-replicated-topic  Partition: 0    Leader: 2   Replicas: 2,0,1 Isr: 2,0,1  
  
#注释：第一行给出了所有分区的摘要，每个附加行提供有关一个分区的信息。由于我们只有一个分区用于此主题，因此只有一行。  
  
#“leader”是负责给定分区的所有读取和写入的节点。每个节点将成为随机选择的分区部分的领导者。  
  
#“replicas”是复制此分区日志的节点列表，无论它们是否为领导者，或者即使它们当前处于活动状态。  
  
# “isr”是“同步”复制品的集合。这是副本列表的子集，该列表当前处于活跃状态并且已经被领导者捕获。  
  
#请注意，Leader: 2，在我的示例中，节点2 是该主题的唯一分区的Leader。  
```

**3）可以在我们创建的原始主题上运行相同的命令，以查看它的位置**

```apl
[root@along ~]# kafka-topics.sh --describe --zookeeper localhost:2181 --topic along  
Topic:along PartitionCount:1    ReplicationFactor:1 Configs:  
    Topic: along    Partition: 0    Leader: 0   Replicas: 0 Isr: 0  
```

**4）向我们的新主题发布一些消息：**

```apl
[root@along ~]# kafka-console-producer.sh --broker-list localhost:9092 --topic my-replicated-topic  
>my test message 1  
>my test message 2  
>^C  
```

**5）现在让我们使用这些消息：**

```apl
[root@along ~]# kafka-console-consumer.sh --bootstrap-server localhost:9092 --from-beginning --topic my-replicated-topic  
my test message 1  
my test message 2  
```

### 5.4 测试集群的容错性

**1）现在让我们测试一下容错性。Broker 2 充当leader 所以让我们杀了它：**

```apl
[root@along ~]# ps aux | grep server-2.properties |awk '{print $2}'  
106737  
[root@along ~]# kill -9 106737  
[root@along ~]# ss -nutl  
tcp   LISTEN     0      50      ::ffff:127.0.0.1:9092                              :::*                         
tcp   LISTEN     0      50      ::ffff:127.0.0.1:9093                              :::*  
```

**2）leader 已切换到其中一个从属节点，节点2不再位于同步副本集中：**

```apl
[root@along ~]# kafka-topics.sh --describe --zookeeper localhost:2181 --topic my-replicated-topic  
Topic:my-replicated-topic   PartitionCount:1    ReplicationFactor:3 Configs:  
    Topic: my-replicated-topic  Partition: 0    Leader: 0   Replicas: 2,0,1 Isr: 0,1  
```

**3）即使最初接受写入的leader 已经失败，这些消息仍可供消费：**

```apl
[root@along ~]# kafka-console-consumer.sh --bootstrap-server localhost:9092 --from-beginning --topic my-replicated-topic  
my test message 1  
my test message 2  
```

## 6、使用Kafka Connect导入/导出数据

从控制台写入数据并将其写回控制台是一个方便的起点，但有时候可能希望使用其他来源的数据或将数据从Kafka导出到其他系统。对于许多系统，您可以使用Kafka Connect导入或导出数据，而不是编写自定义集成代码。

Kafka Connect是Kafka附带的工具，用于向Kafka导入和导出数据。它是一个可扩展的工具，运行连接器，实现与外部系统交互的自定义逻辑。在本快速入门中，我们将了解如何使用简单的连接器运行Kafka Connect，这些连接器将数据从文件导入Kafka主题并将数据从Kafka主题导出到文件。

**1）首先创建一些种子数据进行测试：**

```apl
[root@along ~]# echo -e "foo\nbar" > test.txt  
或者在Windows上：  
> echo foo> test.txt  
> echo bar>> test.txt  
```

**2）接下来，启动两个以独立模式运行的连接器，这意味着它们在单个本地专用进程中运行。提供三个配置文件作为参数。**

第一个始终是Kafka Connect流程的配置，包含常见配置，例如要连接的Kafka代理和数据的序列化格式。

其余配置文件均指定要创建的连接器。这些文件包括唯一的连接器名称，要实例化的连接器类以及连接器所需的任何其他配置。

```apl
[root@along ~]# connect-standalone.sh config/connect-standalone.properties config/connect-file-source.properties config/connect-file-sink.properties  
[2019-01-16 16:16:31,884] INFO Kafka Connect standalone worker initializing ... (org.apache.kafka.connect.cli.ConnectStandalone:67)  
[2019-01-16 16:16:31,903] INFO WorkerInfo values:  
... ...  
#注：Kafka附带的这些示例配置文件使用您之前启动的默认本地群集配置并创建两个连接器：第一个是源连接器，它从输入文件读取行并生成每个Kafka主题，第二个是宿连接器从Kafka主题读取消息并将每个消息生成为输出文件中的一行。  
```

**3）验证是否导入成功（另起终端）**

在启动过程中，您将看到许多日志消息，包括一些指示正在实例化连接器的日志消息。

① 一旦Kafka Connect进程启动，源连接器应该开始从test.txt主题读取行并将其生成到主题connect-test，并且接收器连接器应该开始从主题读取消息connect-test 并将它们写入文件test.sink.txt。我们可以通过检查输出文件的内容来验证数据是否已通过整个管道传递：

```apl
[root@along ~]# cat test.sink.txt  
foo  
bar  
```

② 请注意，数据存储在Kafka主题中connect-test，因此我们还可以运行控制台使用者来查看主题中的数据（或使用自定义使用者代码来处理它）：

```apl
[root@along ~]# kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic connect-test --from-beginning  
{"schema":{"type":"string","optional":false},"payload":"foo"}  
{"schema":{"type":"string","optional":false},"payload":"bar"}  
```

**4）继续追加数据，验证**

```apl
[root@along ~]# echo Another line>> test.txt       
[root@along ~]# cat test.sink.txt  
foo  
bar  
Another line  
[root@along ~]# kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic connect-test --from-beginning  
{"schema":{"type":"string","optional":false},"payload":"foo"}  
{"schema":{"type":"string","optional":false},"payload":"bar"}  
{"schema":{"type":"string","optional":false},"payload":"Another line"}
```



#  整合 Kafka 实现千万级数据异步处理

## 前言介绍

在之前的文章中，我们详细的介绍了 kafka 的架构模型，在集群环境中，kafka 可以通过设置分区数来加快数据的消费速度。光知道理论可不行，我们得真真切切的实践起来才行！下面，我将结合生产环境的真实案例，以`SpringBoot`技术框架为基础，向大家介绍 kafka 的使用以及如何实现数据高吞吐！

## 代码实践

最近，公司大数据团队每天凌晨会将客户的订单数据进行统计计算，然后把业绩数据推送给我们，以便销售人员每天能看到昨天的业绩数据，数据的体量大约在 1000 多万条，以下是我对接的过程！

### 添加 kafka 依赖包

本次项目的`SpringBoot`版本为`2.1.5.RELEASE`，依赖的 kafka 的版本为`2.2.6.RELEASE`

```xml
<!--kafka-->
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
    <version>2.2.6.RELEASE</version>
</dependency>
```

### 添加 kafka 配置变量

当添加完了依赖包之后，我们只需要在`application.properties`中添加 kafka 配置变量，基本上就可以正常使用了。

```properties
# 指定kafka server的地址，集群配多个，中间，逗号隔开
spring.kafka.bootstrap-servers=197.168.25.196:9092
#重试次数
spring.kafka.producer.retries=3
#批量发送的消息数量
spring.kafka.producer.batch-size=1000
#32MB的批处理缓冲区
spring.kafka.producer.buffer-memory=33554432
#默认消费者组
spring.kafka.consumer.group-id=crm-user-service
#最早未被消费的offset
spring.kafka.consumer.auto-offset-reset=earliest
#批量一次最大拉取数据量
spring.kafka.consumer.max-poll-records=4000
#是否自动提交
spring.kafka.consumer.enable-auto-commit=true
#自动提交时间间隔，单位ms
spring.kafka.consumer.auto-commit-interval=1000
```

### 创建一个消费者

```java
@Component
public class BigDataTopicListener {

    private static final Logger log = LoggerFactory.getLogger(BigDataTopicListener.class);

    /**
     * 监听kafka数据
     * @param consumerRecords
     * @param ack
     */
    @KafkaListener(topics = {"big_data_topic"})
    public void consumer(ConsumerRecord<?, ?> consumerRecord) {
        log.info("收到bigData推送的数据'{}'", consumerRecord.toString());
        //...
        //db.save(consumerRecord);//插入或者更新数据
    }

}
```

### 模拟对方推送数据测试

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class KafkaProducerTest {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Test
    public void testSend(){
        for (int i = 0; i < 5000; i++) {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("datekey", 20210610);
            map.put("userid", i);
            map.put("salaryAmount", i);
            //向kafka的big_data_topic主题推送数据
            kafkaTemplate.send("big_data_topic", JSONObject.toJSONString(map));
        }
    }
}
```

起初，通过这种单条数据消费方式，进行测试程序没太大毛病！但是，当上到生产之后，发现一个很大的问题，就是消费 1000 万条数据，至少需要3个小时，结果导致数据看板一直没数据。第二天痛定思痛，决定改成批量消费模型，怎么操作呢，请看下面！

### 将 kafka 的消费模式改成批量消费

首先，创建一个`KafkaConfiguration`配置类，内容如下！

```java
@Configuration
public class KafkaConfiguration {

    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

    @Value("${spring.kafka.producer.retries}")
    private Integer retries;

    @Value("${spring.kafka.producer.batch-size}")
    private Integer batchSize;

    @Value("${spring.kafka.producer.buffer-memory}")
    private Integer bufferMemory;

    @Value("${spring.kafka.consumer.group-id}")
    private String groupId;

    @Value("${spring.kafka.consumer.auto-offset-reset}")
    private String autoOffsetReset;

    @Value("${spring.kafka.consumer.max-poll-records}")
    private Integer maxPollRecords;

    @Value("${spring.kafka.consumer.batch.concurrency}")
    private Integer batchConcurrency;

    @Value("${spring.kafka.consumer.enable-auto-commit}")
    private Boolean autoCommit;

    @Value("${spring.kafka.consumer.auto-commit-interval}")
    private Integer autoCommitInterval;


    /**
     *  生产者配置信息
     */
    @Bean
    public Map<String, Object> producerConfigs() {
        Map<String, Object> props = new HashMap<>();
        props.put(ProducerConfig.ACKS_CONFIG, "0");
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(ProducerConfig.RETRIES_CONFIG, retries);
        props.put(ProducerConfig.BATCH_SIZE_CONFIG, batchSize);
        props.put(ProducerConfig.LINGER_MS_CONFIG, 1);
        props.put(ProducerConfig.BUFFER_MEMORY_CONFIG, bufferMemory);
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        return props;
    }

    /**
     *  生产者工厂
     */
    @Bean
    public ProducerFactory<String, String> producerFactory() {
        return new DefaultKafkaProducerFactory<>(producerConfigs());
    }

    /**
     *  生产者模板
     */
    @Bean
    public KafkaTemplate<String, String> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }


    /**
     *  消费者配置信息
     */
    @Bean
    public Map<String, Object> consumerConfigs() {
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.GROUP_ID_CONFIG, groupId);
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, autoOffsetReset);
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, maxPollRecords);
        props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, autoCommit);
        props.put(ConsumerConfig.SESSION_TIMEOUT_MS_CONFIG, 30000);
        props.put(ConsumerConfig.REQUEST_TIMEOUT_MS_CONFIG, 30000);
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        return props;
    }

    /**
     *  消费者批量工厂
     */
    @Bean
    public KafkaListenerContainerFactory<?> batchFactory() {
        ConcurrentKafkaListenerContainerFactory<Integer, String> factory = new 
        ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(new DefaultKafkaConsumerFactory<>(consumerConfigs()));
        //设置并发量，小于或等于Topic的分区数
        factory.setConcurrency(batchConcurrency);
        factory.getContainerProperties().setPollTimeout(1500);
        factory.getContainerProperties()
            .setAckMode(ContainerProperties.AckMode.MANUAL_IMMEDIATE);
        //设置为批量消费，每个批次数量在Kafka配置参数中设置ConsumerConfig.MAX_POLL_RECORDS_CONFIG
        factory.setBatchListener(true);
        return factory;
    }

}
```

同时，新增一个`spring.kafka.consumer.batch.concurrency`变量，用来设置并发数，通过这个参数我们可以指定几个线程来实现消费。

在`application.properties`配置文件中，添加如下变量

```properties
#批消费并发量，小于或等于Topic的分区数
spring.kafka.consumer.batch.concurrency = 3

#设置每次批量拉取的最大数量为4000
spring.kafka.consumer.max-poll-records=4000

#设置自动提交改成false
spring.kafka.consumer.enable-auto-commit=false
```

最后，将单个消费方法改成批量消费方法模式

```java
@Component
public class BigDataTopicListener {

    private static final Logger log = LoggerFactory.getLogger(BigDataTopicListener.class);

    /**
     * 监听kafka数据（批量消费）
     * @param consumerRecords
     * @param ack
     */
    @KafkaListener(topics = {"big_data_topic"}, containerFactory = "batchFactory")
    public void batchConsumer(List<ConsumerRecord<?, ?>> consumerRecords, Acknowledgment ack) {
        long start = System.currentTimeMillis();

        //...
        //db.batchSave(consumerRecords);//批量插入或者批量更新数据

        //手动提交
        ack.acknowledge();
        log.info("收到bigData推送的数据，拉取数据量：{}，消费时间：{}ms", 
                 consumerRecords.size(), (System.currentTimeMillis() - start));
    }

}
```

> 此时，消费性能大大的提升，数据处理的非常快，500万条数据，最多 30 分钟就全部消费完毕了。本例中的消费微服务，生产环境部署了3台服务器，同时`big_data_topic`主题的分区数为`3`，因此并发数设置为`3`比较合适。

> 随着推送的数据量不断增加，如果你觉得消费速度还不够，你可以重新设置每次批量拉取的最大数量，活着横向扩展微服务的集群实例数量和 topic 的分区数，以此来加快数据的消费速度。

> 但是，如果在单台机器中，每次批量拉取的最大数量过大，大对象也会很大，会造成频繁的 gc 告警！因此，在实际的使用过程中，每次批量拉取的最大数量并不是越大越好，根据当前服务器的硬件配置，调节到合适的阀值，才是最优的选择！





# kafka踩过的一些非比寻常的坑

## 前言

我的上家公司是做餐饮系统的，每天中午和晚上用餐高峰期，系统的并发量不容小觑。为了保险起见，公司规定各部门都要在吃饭的时间轮流值班，防止出现线上问题时能够及时处理。

我当时在后厨显示系统团队，该系统属于订单的下游业务。用户点完菜下单后，订单系统会通过发`kafka`消息给我们系统，系统读取消息后，做业务逻辑处理，持久化订单和菜品数据，然后展示到划菜客户端。这样厨师就知道哪个订单要做哪些菜，有些菜做好了，就可以通过该系统出菜。系统自动通知服务员上菜，如果服务员上完菜，修改菜品上菜状态，用户就知道哪些菜已经上了，哪些还没有上。这个系统可以大大提高后厨到用户的效率。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207302059570.png" alt="image-20220730205936496" style="zoom: 50%;" />

事实证明，这一切的关键是消息中间件：`kafka`，如果它有问题，将会直接影响到后厨显示系统的功能。

接下来，我跟大家一起聊聊使用`kafka`两年时间踩过哪些坑？

## 顺序问题

### 1. 为什么要保证消息的顺序？

刚开始我们系统的商户很少，为了快速实现功能，我们没想太多。既然是走消息中间件`kafka`通信，订单系统发消息时将订单详细数据放在消息体，我们后厨显示系统只要订阅`topic`，就能获取相关消息数据，然后处理自己的业务即可。

不过这套方案有个关键因素：**要保证消息的顺序**。

为什么呢？

订单有很多状态，比如：下单、支付、完成、撤销等，不可能`下单`的消息都没读取到，就先读取`支付`或`撤销`的消息吧，如果真的这样，数据不是会产生错乱？

好吧，看来保证消息顺序是有必要的。

### 2.如何保证消息顺序？

我们都知道`kafka`的`topic`是无序的，但是一个`topic`包含多个`partition`，每个`partition`内部是有序的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207302100311.png" alt="image-20220730210011244" style="zoom:50%;" />

如此一来，思路就变得清晰了：只要保证生产者写消息时，按照一定的规则写到同一个`partition`，不同的消费者读不同的`partition`的消息，就能保证生产和消费者消息的顺序。

我们刚开始就是这么做的，同一个`商户编号`的消息写到同一个`partition`，`topic`中创建了`4`个`partition`，然后部署了`4`个消费者节点，构成`消费者组`，一个`partition`对应一个消费者节点。从理论上说，这套方案是能够保证消息顺序的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207302100753.png" alt="image-20220730210024693" style="zoom:67%;" />

一切规划得看似“天衣无缝”，我们就这样”顺利“上线了。

### 3.出现意外

该功能上线了一段时间，刚开始还是比较正常的。

但是，好景不长，很快就收到用户投诉，说在划菜客户端有些订单和菜品一直看不到，无法划菜。

我定位到了原因，公司在那段时间网络经常不稳定，业务接口时不时报超时，业务请求时不时会连不上数据库。

这种情况对`顺序消息`的打击，可以说是`毁灭性`的。

为什么这么说？

假设订单系统发了：”下单“、”支付“、”完成“ 三条消息。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207302128925.png" alt="image-20220730212830878" style="zoom: 67%;" />

而”下单“消息由于网络原因我们系统处理失败了，而后面的两条消息的数据是无法入库的，因为只有”下单“消息的数据才是完整的数据，其他类型的消息只会更新状态。

加上，我们当时没有做`失败重试机制`，使得这个问题被放大了。问题变成：一旦”下单“消息的数据入库失败，用户就永远看不到这个订单和菜品了。

那么这个紧急的问题要如何解决呢？

### 4.解决过程

最开始我们的想法是：在消费者处理消息时，如果处理失败了，立马重试3-5次。但如果有些请求要第6次才能成功怎么办？不可能一直重试呀，这种同步重试机制，会阻塞其他商户订单消息的读取。

显然用上面的这种`同步重试机制`在出现异常的情况，会严重影响消息消费者的消费速度，降低它的吞吐量。

如此看来，我们不得不用`异步重试机制`了。

如果用异步重试机制，处理失败的消息就得保存到`重试表`下来。

但有个新问题立马出现：**只存一条消息如何保证顺序？**

存一条消息的确无法保证顺序，假如：”下单“消息失败了，还没来得及异步重试。此时，”支付“消息被消费了，它肯定是不能被正常消费的。

此时，”支付“消息该一直等着，每隔一段时间判断一次，它前面的消息都有没有被消费?

如果真的这么做，会出现两个问题：

1. ”支付“消息前面只有”下单“消息，这种情况比较简单。但如果某种类型的消息，前面有N多种消息，需要判断多少次呀，这种判断跟订单系统的耦合性太强了，相当于要把他们系统的逻辑搬一部分到我们系统。
2. 影响消费者的消费速度

这时有种更简单的方案浮出水面：消费者在处理消息时，先判断该`订单号`在`重试表`有没有数据，如果有则直接把当前消息保存到`重试表`。如果没有，则进行业务处理，如果出现异常，把该消息保存到`重试表`。

后来我们用`elastic-job`建立了`失败重试机制`，如果重试了`7`次后还是失败，则将该消息的状态标记为`失败`，发邮件通知开发人员。

终于由于网络不稳定，导致用户在划菜客户端有些订单和菜品一直看不到的问题被解决了。现在商户顶多偶尔延迟看到菜品，比一直看不菜品好太多。

## 消息积压

随着销售团队的市场推广，我们系统的商户越来越多。随之而来的是消息的数量越来越大，导致消费者处理不过来，经常出现消息积压的情况。对商户的影响非常直观，划菜客户端上的订单和菜品可能半个小时后才能看到。一两分钟还能忍，半个消息的延迟，对有些暴脾气的商户哪里忍得了，马上投诉过来了。我们那段时间经常接到商户投诉说订单和菜品有延迟。

虽说，加`服务器节点`就能解决问题，但是按照公司为了省钱的惯例，要先做系统优化，所以我们开始了`消息积压`问题解决之旅。

### 1. 消息体过大

虽说`kafka`号称支持`百万级的TPS`，但从`producer`发送消息到`broker`需要一次网络`IO`，`broker`写数据到磁盘需要一次磁盘`IO`（写操作），`consumer`从`broker`获取消息先经过一次磁盘`IO`（读操作），再经过一次网络`IO`。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207302129079.png" alt="image-20220730212905013" style="zoom: 50%;" />

一次简单的消息从生产到消费过程，需要经过`2次网络IO`和`2次磁盘IO`。如果消息体过大，势必会增加IO的耗时，进而影响kafka生产和消费的速度。消费者速度太慢的结果，就会出现消息积压情况。

除了上面的问题之外，`消息体过大`，还会浪费服务器的磁盘空间，稍不注意，可能会出现磁盘空间不足的情况。

此时，我们已经到了需要优化消息体过大问题的时候。

**如何优化呢？**

我们重新梳理了一下业务，没有必要知道订单的`中间状态`，只需知道一个`最终状态`就可以了。

如此甚好，我们就可以这样设计了：

1. 订单系统发送的消息体只用包含：id和状态等关键信息。
2. 后厨显示系统消费消息后，通过id调用订单系统的订单详情查询接口获取数据。
3. 后厨显示系统判断数据库中是否有该订单的数据，如果没有则入库，有则更新。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207302129159.png" alt="image-20220730212956104" style="zoom:67%;" />

果然这样调整之后，消息积压问题很长一段时间都没再出现。

### 

### 2. 路由规则不合理

还真别高兴的太早，有天中午又有商户投诉说订单和菜品有延迟。我们一查kafka的topic竟然又出现了消息积压。

但这次有点诡异，不是所有`partition`上的消息都有积压，而是只有一个。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207302130887.png" alt="image-20220730213022827" style="zoom: 67%;" />

刚开始，我以为是消费那个`partition`消息的节点出了什么问题导致的。但是经过排查，没有发现任何异常。

这就奇怪了，到底哪里有问题呢？

后来，我查日志和数据库发现，有几个商户的订单量特别大，刚好这几个商户被分到同一个`partition`，使得该`partition`的消息量比其他`partition`要多很多。

这时我们才意识到，发消息时按`商户编号`路由`partition`的规则不合理，可能会导致有些`partition`消息太多，消费者处理不过来，而有些`partition`却因为消息太少，消费者出现空闲的情况。

为了避免出现这种分配不均匀的情况，我们需要对发消息的路由规则做一下调整。

我们思考了一下，用订单号做路由相对更均匀，不会出现单个订单发消息次数特别多的情况。除非是遇到某个人一直加菜的情况，但是加菜是需要花钱的，所以其实同一个订单的消息数量并不多。

调整后按`订单号`路由到不同的`partition`，同一个订单号的消息，每次到发到同一个`partition`。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207302131162.png" alt="image-20220730213104097" style="zoom:80%;" />

调整后，消息积压的问题又有很长一段时间都没有再出现。我们的商户数量在这段时间，增长的非常快，越来越多了。

### 3. 批量操作引起的连锁反应

在高并发的场景中，消息积压问题，可以说如影随形，真的没办法从根本上解决。表面上看，已经解决了，但后面不知道什么时候，就会冒出一次，比如这次：

有天下午，产品过来说：有几个商户投诉过来了，他们说菜品有延迟，快查一下原因。

这次问题出现得有点奇怪。

为什么这么说？

首先这个时间点就有点奇怪，平常出问题，不都是中午或者晚上用餐高峰期吗？怎么这次问题出现在下午？

根据以往积累的经验，我直接看了`kafka`的`topic`的数据，果然上面消息有积压，但这次每个`partition`都积压了`十几万`的消息没有消费，比以往加压的消息数量增加了`几百倍`。这次消息积压得极不寻常。

我赶紧查服务监控看看消费者挂了没，还好没挂。又查服务日志没有发现异常。这时我有点迷茫，碰运气问了问订单组下午发生了什么事情没？他们说下午有个促销活动，跑了一个JOB批量更新过有些商户的订单信息。

这时，我一下子如梦初醒，是他们在JOB中批量发消息导致的问题。怎么没有通知我们呢？实在太坑了。

虽说知道问题的原因了，倒是眼前积压的这`十几万`的消息该如何处理呢？

此时，如果直接调大`partition`数量是不行的，历史消息已经存储到4个固定的`partition`，只有新增的消息才会到新的`partition`。我们重点需要处理的是已有的partition。

直接加服务节点也不行，因为`kafka`允许同组的多个`partition`被一个`consumer`消费，但不允许一个`partition`被同组的多个`consumer`消费，可能会造成资源浪费。

看来只有用多线程处理了。

为了紧急解决问题，我改成了用`线程池`处理消息，核心线程和最大线程数都配置成了`50`。

调整之后，果然，消息积压数量不断减少。

但此时有个更严重的问题出现：我收到了报警邮件，有两个订单系统的节点down机了。

不久，订单组的同事过来找我说，我们系统调用他们订单查询接口的并发量突增，超过了预计的好几倍，导致有2个服务节点挂了。他们把查询功能单独整成了一个服务，部署了6个节点，挂了2个节点，再不处理，另外4个节点也会挂。订单服务可以说是公司最核心的服务，它挂了公司损失会很大，情况万分紧急。

为了解决这个问题，只能先把线程数调小。

幸好，线程数是可以通过`zookeeper`动态调整的，我把核心线程数调成了`8`个，核心线程数改成了`10`个。

后面，运维把订单服务挂的2个节点重启后恢复正常了，以防万一，再多加了2个节点。为了确保订单服务不会出现问题，就保持目前的消费速度，后厨显示系统的消息积压问题，1小时候后也恢复正常了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207302131962.png" alt="image-20220730213147912" style="zoom:67%;" />

后来，我们开了一次复盘会，得出的结论是：

1. 订单系统的批量操作一定提前通知下游系统团队。
2. 下游系统团队多线程调用订单查询接口一定要做压测。
3. 这次给订单查询服务敲响了警钟，它作为公司的核心服务，应对高并发场景做的不够好，需要做优化。
4. 对消息积压情况加监控。

顺便说一下，对于要求严格保证消息顺序的场景，可以将线程池改成多个队列，每个队列用单线程处理。

### 4. 表过大

为了防止后面再次出现消息积压问题，消费者后面就一直用多线程处理消息。

但有天中午我们还是收到很多报警邮件，提醒我们kafka的topic消息有积压。我们正在查原因，此时产品跑过来说：又有商户投诉说菜品有延迟，赶紧看看。这次她看起来有些不耐烦，确实优化了很多次，还是出现了同样的问题。

在外行看来：**为什么同一个问题一直解决不了？**

**其实技术心里的苦他们是不知道的。**

表面上问题的症状是一样的，都是出现了菜品延迟，他们知道的是因为消息积压导致的。但是他们不知道深层次的原因，导致消息积压的原因其实有很多种。这也许是使用消息中间件的通病吧。

我沉默不语，只能硬着头皮定位原因了。

后来我查日志发现消费者消费一条消息的耗时长达`2秒`。以前是`500毫秒`，现在怎么会变成`2秒`呢？

奇怪了，消费者的代码也没有做大的调整，为什么会出现这种情况呢？

查了一下线上菜品表，单表数据量竟然到了`几千万`，其他的划菜表也是一样，现在单表保存的数据太多了。

我们组梳理了一下业务，其实菜品在客户端只展示最近`3天`的即可。

这就好办了，我们服务端存着`多余的数据`，不如把表中多余的数据归档。于是，DBA帮我们把数据做了归档，只保留最近`7天`的数据。

如此调整后，消息积压问题被解决了，又恢复了往日的平静。

## 主键冲突

别高兴得太早了，还有其他的问题，比如：报警邮件经常报出数据库异常：` Duplicate entry '6' for key 'PRIMARY'`，说主键冲突。

出现这种问题一般是由于有两个以上相同主键的sql，同时插入数据，第一个插入成功后，第二个插入的时候会报主键冲突。表的主键是唯一的，不允许重复。

我仔细检查了代码，发现代码逻辑会先根据主键从表中查询订单是否存在，如果存在则更新状态，不存在才插入数据，没得问题。

这种判断在并发量不大时，是有用的。但是如果在高并发的场景下，两个请求同一时刻都查到订单不存在，一个请求先插入数据，另一个请求再插入数据时就会出现主键冲突的异常。

解决这个问题最常规的做法是：`加锁`。

我刚开始也是这样想的，加数据库悲观锁肯定是不行的，太影响性能。加数据库乐观锁，基于版本号判断，一般用于更新操作，像这种插入操作基本上不会用。

剩下的只能用分布式锁了，我们系统在用redis，可以加基于redis的分布式锁，锁定订单号。

但后面仔细思考了一下：

1. 加分布式锁也可能会影响消费者的消息处理速度。
2. 消费者依赖于redis，如果redis出现网络超时，我们的服务就悲剧了。

所以，我也不打算用分布式锁。

而是选择使用mysql的`INSERT INTO ...ON DUPLICATE KEY UPDATE`语法：

```apl
INSERTINTOtable (column_list)
VALUES (value_list)
ONDUPLICATEKEYUPDATE
c1 = v1, 
c2 = v2,
...;
```

它会先尝试把数据插入表，如果主键冲突的话那么更新字段。

把以前的`insert`语句改造之后，就没再出现过主键冲突问题。

## 数据库主从延迟

不久之后的某天，又收到商户投诉说下单后，在划菜客户端上看得到订单，但是看到的菜品不全，有时甚至订单和菜品数据都看不到。

这个问题跟以往的都不一样，根据以往的经验先看`kafka`的`topic`中消息有没有积压，但这次并没有积压。

再查了服务日志，发现订单系统接口返回的数据有些为空，有些只返回了订单数据，没返回菜品数据。

这就非常奇怪了，我直接过去找订单组的同事。他们仔细排查服务，没有发现问题。这时我们不约而同的想到，会不会是数据库出问题了，一起去找`DBA`。果然，`DBA`发现数据库的主库同步数据到从库，由于网络原因偶尔有延迟，有时延迟有`3秒`。

如果我们的业务流程从发消息到消费消息耗时小于`3秒`，调用订单详情查询接口时，可能会查不到数据，或者查到的不是最新的数据。

这个问题非常严重，会导致直接我们的数据错误。

为了解决这个问题，我们也加了`重试机制`。调用接口查询数据时，如果返回数据为空，或者只返回了订单没有菜品，则加入`重试表`。

调整后，商户投诉的问题被解决了。

## 重复消费

`kafka`消费消息时支持三种模式：

- at most once模式 最多一次。保证每一条消息commit成功之后，再进行消费处理。消息可能会丢失，但不会重复。
- at least once模式 至少一次。保证每一条消息处理成功之后，再进行commit。消息不会丢失，但可能会重复。
- exactly once模式 精确传递一次。将offset作为唯一id与消息同时处理，并且保证处理的原子性。消息只会处理一次，不丢失也不会重复。但这种方式很难做到。

`kafka`默认的模式是`at least once`，但这种模式可能会产生重复消费的问题，所以我们的业务逻辑必须做幂等设计。

而我们的业务场景保存数据时使用了`INSERT INTO ...ON DUPLICATE KEY UPDATE`语法，不存在时插入，存在时更新，是天然支持幂等性的。

## 多环境消费问题

我们当时线上环境分为：`pre`(预发布环境) 和 `prod`(生产环境)，两个环境共用同一个数据库，并且共用同一个kafka集群。

需要注意的是，在配置`kafka`的`topic`的时候，要加前缀用于区分不同环境。pre环境的以pre_开头，比如：pre_order，生产环境以prod_开头，比如：prod_order，防止消息在不同环境中串了。

但有次运维在`pre`环境切换节点，配置`topic`的时候，配错了，配成了`prod`的`topic`。刚好那天，我们有新功能上`pre`环境。结果悲剧了，`prod`的有些消息被`pre`环境的`consumer`消费了，而由于消息体做了调整，导致`pre`环境的`consumer`处理消息一直失败。

其结果是生产环境丢了部分消息。不过还好，最后生产环境消费者通过重置`offset`，重新读取了那一部分消息解决了问题，没有造成太大损失。

## 后记

除了上述问题之外，我还遇到过：

- `kafka`的`consumer`使用自动确认机制，导致`cpu使用率100%`。
- `kafka`集群中的一个`broker`节点挂了，重启后又一直挂。

这两个问题说起来有些复杂，我就不一一列举了，有兴趣的朋友可以关注我的公众号，加我的微信找我私聊。

非常感谢那两年使用消息中间件`kafka`的经历，虽说遇到过挺多问题，踩了很多坑，走了很多弯路，但是实打实的让我积累了很多宝贵的经验，快速成长了。

其实`kafka`是一个非常优秀的消息中间件，我所遇到的绝大多数问题，都并非`kafka`自身的问题（除了cpu使用率100%是它的一个bug导致的之外）。



# Kafka是怎么做到百万级 TPS

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207111817831.png" alt="image-20220711181715777" style="zoom:67%;" />

谈到大数据传输都会想到 Kafka，Kafka 号称大数据的杀手锏，在业界有很多成熟的应用场景并且被主流公司认可。这款为大数据而生的消息中间件，以其百万级TPS的吞吐量名声大噪，迅速成为大数据领域的宠儿，在数据采集、传输、存储的过程中发挥着举足轻重的作用。

在业界已经有很多成熟的消息中间件如：RabbitMQ, RocketMQ, ActiveMQ, ZeroMQ，为什么 Kafka 在众多的敌手中依然能有一席之地，当然靠的是其强悍的吞吐量。下面带领大家来揭秘。

## Kafka 如何做到支持百万级 TPS ？

先用一张思维导图直接告诉你答案：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207111817584.png" alt="image-20220711181735511" style="zoom:50%;" />

## 顺序读写磁盘

生产者写入数据和消费者读取数据都是**顺序读写**的，先来一张图直观感受一下顺序读写和随机读写的速度：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207111817008.png" alt="image-20220711181749904" style="zoom:50%;" />

从图中可以看出传统硬盘或者SSD的顺序读写甚至超过了内存的随机读写，当然与内存的顺序读写对比差距还是很大。

所以Kafka选择顺序读写磁盘也不足为奇了。

下面以传统机械磁盘为例详细介绍一下什么是顺序读写和随机读写。

**盘片**和**盘面**：一块硬盘一般有多块盘片，盘片分为上下两面，其中有效面称为盘面，一般上下都有效，也就是说：**盘面数 = 盘片数 \* 2。**

**磁头**：磁头切换磁道读写数据时是通过机械设备实现的，一般速度较慢；而磁头切换盘面读写数据是通过电子设备实现的，一般速度较快，因此磁头一般是先读写完柱面后才开始寻道的(不用切换磁道)，这样磁盘读写效率更快。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207111818684.png" alt="image-20220711181807577" style="zoom:50%;" />

**磁道**：磁道就是以中间轴为圆心的圆环，一个盘面有多个磁道，磁道之间有间隙，磁道也就是磁盘存储数据的介质。磁道上布有一层磁介质，通过磁头可以使磁介质的极性转换为数据信号，即磁盘的读，磁盘写刚好与之相反。

**柱面**：磁盘中不同盘面中半径相同的磁道组成的，也就是说柱面总数 = 某个盘面的磁道数。

**扇区**：单个磁道就是多个弧形扇区组成的，盘面上的每个磁道拥有的扇区数量是相等。扇区是最小存储单元，一般扇区大小为512bytes。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207111818278.png" alt="image-20220711181825193" style="zoom:50%;" />

如果系统每次只读取一个扇区，那恐怕效率太低了，所以出现了block（块）的概念。文件读取的最小单位是block，根据不同操作系统一个block一般由多个扇区组成。

有了磁盘的背景知识我们就可以很容易理解顺序读写和随机读写了。

> 插播维基百科定义：
>
> **顺序读写**：是一种按记录的逻辑顺序进行读、写操作的存取方法 ，即按照信息在存储器中的实际位置所决定的顺序使用信息。 
>
> **随机读写**：指的是当存储器中的消息被读取或写入时，所需要的时间与这段信息所在的位置无关。

当读取第一个block时，要经历寻道、旋转延迟、传输三个步骤才能读取完这个block的数据。而对于下一个block，如果它在磁盘的其他任意位置，访问它会同样经历寻道、旋转、延时、传输才能读取完这个block的数据，我们把这种方式叫做**随机读写**。但是如果这个block的起始扇区刚好在刚才访问的block的后面，磁头就能立刻遇到，不需等待直接传输，这种就叫**顺序读写**。

好，我们再回到 Kafka，详细介绍Kafka如何实现顺序读写入数据。

Kafka 写入数据是顺序的，下面每一个Partition 都可以当做一个文件，每次接收到新数据后Kafka会把数据插入到文件末尾，虚框部分代表文件尾。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207111818758.png" alt="image-20220711181843717" style="zoom:67%;" />

这种方法有一个问题就是删除数据不方便，所以 Kafka 一般会把所有的数据都保留下来，每个消费者（Consumer）对每个Topic都有一个 offset 用来记录读取进度或者叫坐标。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207111818899.png" alt="image-20220711181857851" style="zoom:67%;" />

## Memory Mapped Files(MMAP)

在文章开头我们看到硬盘的顺序读写基本能与内存随机读写速度媲美，但是与内存顺序读写相比还是太慢了，那 Kafka 如果有追求想进一步提升效率怎么办？可以使用现代操作系统分页存储来充分利用内存提高I/O效率，这也是下面要介绍的 MMAP 技术。

**MMAP**也就是**内存映射文件**，在64位操作系统中一般可以表示 20G 的数据文件，它的工作原理是直接利用操作系统的 Page 来实现文件到物理内存的直接映射，完成映射之后对物理内存的操作会被同步到硬盘上。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207111819879.png" alt="image-20220711181921804" style="zoom: 50%;" />

通过**MMAP**技术进程可以像读写硬盘一样读写内存（逻辑内存），不必关心内存的大小，因为有虚拟内存兜底。这种方式可以获取很大的I/O提升，省去了用户空间到内核空间复制的开销。

也有一个很明显的缺陷，写到**MMAP**中的数据并没有被真正的写到硬盘，操作系统会在程序主动调用 flush 的时候才把数据真正的写到硬盘。

Kafka提供了一个参数：producer.type 来控制是不是主动 flush，如果Kafka写入到MMAP之后就立即flush然后再返回Producer叫同步(sync)；写入MMAP之后立即返回Producer不调用flush叫异步(async)。

## Zero Copy（零拷贝）

Kafka 另外一个黑技术就是使用了零拷贝，要想深刻理解零拷贝必须得知道什么是DMA。

**什么是DMA?**

众所周知 CPU 的速度与磁盘 IO 的速度比起来相差几个数量级，可以用乌龟和火箭做比喻。

一般来说 IO 操作都是由 CPU 发出指令，然后等待 IO 设备完成操作后返回，那CPU会有大量的时间都在等待IO操作。

但是CPU 的等待在很多时候并没有太多的实际意义，我们对于 I/O 设备的大量操作其实都只是把内存里面的数据传输到 I/O 设备而已。比如进行大文件复制，如果所有数据都要经过 CPU，实在是有点儿太浪费时间了。

基于此就有了DMA技术，翻译过来也就是直接内存访问（Direct Memory Access），有了这个可以减少 CPU 的等待时间。

**Kafka 零拷贝原理**

如果不使用零拷贝技术，消费者（consumer）从Kafka消费数据，Kafka从磁盘读数据然后发送到网络上去，数据一共发生了四次传输的过程。其中两次是 DMA 的传输，另外两次，则是通过 CPU 控制的传输。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207111819999.png" alt="image-20220711181937921" style="zoom:50%;" />

**第一次传输**：从硬盘上将数据读到操作系统内核的缓冲区里，这个传输是通过 DMA 搬运的。

**第二次传输**：从内核缓冲区里面的数据复制到分配的内存里面，这个传输是通过 CPU 搬运的。

**第三次传输**：从分配的内存里面再写到操作系统的 Socket 的缓冲区里面去，这个传输是由 CPU 搬运的。

**第四次传输**：从 Socket 的缓冲区里面写到网卡的缓冲区里面去，这个传输是通过 DMA 搬运的。

实际上在kafka中只进行了两次数据传输，如下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207111819725.png" alt="image-20220711181949675" style="zoom:50%;" />

**第一次传输**：通过 DMA从硬盘直接读到操作系统内核的读缓冲区里面。

**第二次传输**：根据 Socket 的描述符信息直接从读缓冲区里面写入到网卡的缓冲区里面。

我们可以看到同一份数据的传输次数从四次变成了两次，并且没有通过 CPU 来进行数据搬运，所有的数据都是通过 DMA 来进行传输的。没有在内存层面去复制（Copy）数据，这个方法称之为**零拷贝（Zero-Copy）。**

无论传输数据量的大小，传输同样的数据使用了零拷贝能够缩短 65% 的时间，大幅度提升了机器传输数据的吞吐量，这也是Kafka能够支持百万TPS的一个重要原因。

## Batch Data（数据批量处理）

当消费者（consumer）需要消费数据时，首先想到的是消费者需要一条，kafka发送一条，消费者再要一条kafka再发送一条。但实际上 Kafka 不是这样做的，Kafka 耍小聪明了。

Kafka 把所有的消息都存放在一个一个的文件中，当消费者需要数据的时候 Kafka 直接把文件发送给消费者。比如说100万条消息放在一个文件中可能是10M的数据量，如果消费者和Kafka之间网络良好，10MB大概1秒就能发送完，既100万TPS，Kafka每秒处理了10万条消息。

看到这里你可以有疑问了，消费者只需要一条消息啊，kafka把整个文件都发送过来了，文件里面剩余的消息怎么办？不要忘了消费者可以通过offset记录消费进度。

发送文件还有一个好处就是可以对文件进行批量压缩，减少网络IO损耗。

## 总结

最后再总结一下 Kafka 支持百万级 TPS 的秘密：

（1）顺序写入数据，在 Partition 末尾追加，所以速度最优。

（2）使用 MMAP 技术将磁盘文件与内存映射，Kafka 可以像操作磁盘一样操作内存。

（3）通过 DMA 技术实现零拷贝，减少数据传输次数。

（4）读取数据时配合sendfile直接暴力输出，批量压缩把所有消息变成一个批量文件，合理减少网络IO损耗。



# Kafka性能篇：为何Kafka这么"快"？

『码哥』的 Redis 系列文章有一篇讲透了 Redis 的性能优化 ——[《Redis 核心篇：唯快不破的秘密》](https://mp.weixin.qq.com/s?__biz=MzU3NDkwMjAyOQ==&mid=2247485665&idx=1&sn=3cf8e45aaa071fa26975bca34b8878e4&scene=21#wechat_redirect)。深入地从 IO、线程、数据结构、编码等方面剖析了 Redis “快”的内部秘密。65 哥深受启发，在学习 Kafka 的过程中，发现 Kafka 也是一个性能十分优秀的中间件，遂要求『码哥』讲一讲 Kafka 性能优化方面的知识，所以『码哥』决定将这篇性能方面的博文作为 Kafka 系列的开篇之作。

先预告一下 Kafka 系列文章，大家敬请期待哦：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141051119.png" alt="image-20220814105152051" style="zoom:67%;" />

以讲解性能作为 Kafka 之旅的开篇之作，让我们一起来深入了解 Kafka “快”的内部秘密。你不仅可以学习到 Kafka 性能优化的各种手段，也可以提炼出各种性能优化的方法论，这些方法论也可以应用到我们自己的项目之中，助力我们写出高性能的项目。

## 关公战秦琼

> 65: Redis 和 Kafka 完全是不同作用的中间件，有比较性吗？

是的，所以此文讲的不是`《分布式缓存的选型》`，也不是`《分布式中间件对比》`。我们聚焦于这两个不同领域的项目对性能的优化，看一看优秀项目对性能优化的通用手段，以及在针对不同场景下的特色的优化方式。

很多人学习了很多东西，了解了很多框架，但在遇到实际问题时，却常常会感觉到知识不足。这就是没有将学习到的知识体系化，没有从具体的实现中抽象出可以行之有效的`方法论`。

学习开源项目很重要的一点就是`归纳`，将不同项目的优秀实现总结出方法论，然后`演绎`到自我的实践中去。

### 开篇寄语

> 码哥：理性、客观、谨慎是程序员的特点，也是优点，但是很多时候我们也需要带一点感性，带一点冲动，这个时候可以帮助我们更快的做决策。「悲观者正确、乐观者成功。」希望大家都是一个乐观地解决问题的人。

## Kafka 性能全景

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141052870.png" alt="image-20220814105234781" style="zoom:67%;" />

从高度抽象的角度来看，性能问题逃不出下面三个方面：

- 网络
- 磁盘
- 复杂度

对于 Kafka 这种网络分布式队列来说，网络和磁盘更是优化的重中之重。针对于上面提出的抽象问题，解决方案高度抽象出来也很简单：

- 并发
- 压缩
- 批量
- 缓存
- 算法

知道了问题和思路，我们再来看看，在 Kafka 中，有哪些角色，而这些角色就是可以优化的点：

- Producer
- Broker
- Consumer

是的，所有的问题，思路，优化点都已经列出来了，我们可以尽可能的细化，三个方向都可以细化，如此，所有的实现便一目了然，即使不看 Kafka 的实现，我们自己也可以想到一二点可以优化的地方。

这就是思考方式。`提出问题` > `列出问题点` > `列出优化方法` > `列出具体可切入的点` > `tradeoff和细化实现`。

现在，你也可以尝试自己想一想优化的点和方法，不用尽善尽美，不用管好不好实现，想一点是一点。

> 65 哥：不行啊，我很笨，也很懒，你还是直接和我说吧，我白嫖比较行。

## 顺序写

> 65 哥：人家 Redis 是基于纯内存的系统，你 kafka 还要读写磁盘，能比？

```
为什么说写磁盘慢？
```

我们不能只知道结论，而不知其所以然。要回答这个问题，就得回到在校时我们学的操作系统课程了。65 哥还留着课本吗？来，翻到讲磁盘的章节，让我们回顾一下磁盘的运行原理。

> 65 哥：鬼还留着哦，课程还没上到一半书就没了。要不是考试俺眼神好，估计现在还没毕业。

看经典大图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141053292.png" alt="image-20220814105316171" style="zoom:67%;" />

完成一次磁盘 IO，需要经过`寻道`、`旋转`和`数据传输`三个步骤。

影响磁盘 IO 性能的因素也就发生在上面三个步骤上，因此主要花费的时间就是：

1. 寻道时间：Tseek 是指将读写磁头移动至正确的磁道上所需要的时间。寻道时间越短，I/O 操作越快，目前磁盘的平均寻道时间一般在 3-15ms。
2. 旋转延迟：Trotation 是指盘片旋转将请求数据所在的扇区移动到读写磁盘下方所需要的时间。旋转延迟取决于磁盘转速，通常用磁盘旋转一周所需时间的 1/2 表示。比如：7200rpm 的磁盘平均旋转延迟大约为 60*1000/7200/2 = 4.17ms，而转速为 15000rpm 的磁盘其平均旋转延迟为 2ms。
3. 数据传输时间：Ttransfer 是指完成传输所请求的数据所需要的时间，它取决于数据传输率，其值等于数据大小除以数据传输率。目前 IDE/ATA 能达到 133MB/s，SATA II 可达到 300MB/s 的接口数据传输率，数据传输时间通常远小于前两部分消耗时间。简单计算时可忽略。

因此，如果在写磁盘的时候省去`寻道`、`旋转`可以极大地提高磁盘读写的性能。

Kafka 采用`顺序写`文件的方式来提高磁盘写入性能。`顺序写`文件，基本减少了磁盘`寻道`和`旋转`的次数。磁头再也不用在磁道上乱舞了，而是一路向前飞速前行。

Kafka 中每个分区是一个有序的，不可变的消息序列，新的消息不断追加到 Partition 的末尾，在 Kafka 中 Partition 只是一个逻辑概念，Kafka 将 Partition 划分为多个 Segment，每个 Segment 对应一个物理文件，Kafka 对 segment 文件追加写，这就是顺序写文件。

> 65 哥：为什么 Kafka 可以使用追加写的方式呢？

这和 Kafka 的性质有关，我们来看看 Kafka 和 Redis，说白了，Kafka 就是一个`Queue`，而 Redis 就是一个`HashMap`。`Queue`和`Map`的区别是什么？

`Queue` 是 FIFO 的，数据是有序的；`HashMap`数据是无序的，是随机读写的。Kafka 的不可变性，有序性使得 Kafka 可以使用追加写的方式写文件。

其实很多符合以上特性的数据系统，都可以采用追加写的方式来优化磁盘性能。典型的有`Redis`的 AOF 文件，各种数据库的`WAL(Write ahead log)`机制等等。

> 所以清楚白自身业务的特点，就可以针对性地做出优化。

## 零拷贝

> 65 哥：哈哈，这个我面试被问到过。可惜答得一般般，唉。

```
什么是零拷贝？
```

我们从 Kafka 的场景来看，Kafka Consumer 消费存储在 Broker 磁盘的数据，从读取 Broker 磁盘到网络传输给 Consumer，期间涉及哪些系统交互。Kafka Consumer 从 Broker 消费数据，Broker 读取 Log，就使用了 sendfile。如果使用传统的 IO 模型，伪代码逻辑就如下所示：

```
readFile(buffer)
send(buffer)
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141053608.png" alt="image-20220814105353539" style="zoom:67%;" />

如图，如果采用传统的 IO 流程，先读取网络 IO，再写入磁盘 IO，实际需要将数据 Copy 四次。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141054081.png" alt="image-20220814105407018" style="zoom:67%;" />

1. 第一次：读取磁盘文件到操作系统内核缓冲区；
2. 第二次：将内核缓冲区的数据，copy 到应用程序的 buffer；
3. 第三步：将应用程序 buffer 中的数据，copy 到 socket 网络发送缓冲区；
4. 第四次：将 socket buffer 的数据，copy 到网卡，由网卡进行网络传输。

> 65 哥：啊，操作系统这么傻吗？copy 来 copy 去的。

并不是操作系统傻，操作系统的设计就是每个应用程序都有自己的用户内存，用户内存和内核内存隔离，这是为了程序和系统安全考虑，否则的话每个应用程序内存满天飞，随意读写那还得了。

不过，还有`零拷贝`技术，英文——`Zero-Copy`。`零拷贝`就是尽量去减少上面数据的拷贝次数，从而减少拷贝的 CPU 开销，减少用户态内核态的上下文切换次数，从而优化数据传输的性能。

常见的零拷贝思路主要有三种：

- 直接 I/O：数据直接跨过内核，在用户地址空间与 I/O 设备之间传递，内核只是进行必要的虚拟存储配置等辅助工作；
- 避免内核和用户空间之间的数据拷贝：当应用程序不需要对数据进行访问时，则可以避免将数据从内核空间拷贝到用户空间；
- 写时复制：数据不需要提前拷贝，而是当需要修改的时候再进行部分拷贝。

Kafka 使用到了 `mmap` 和 `sendfile` 的方式来实现`零拷贝`。分别对应 Java 的 `MappedByteBuffer` 和 `FileChannel.transferTo`。

使用 Java NIO 实现`零拷贝`，如下：

```
FileChannel.transferTo()
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141054117.png" alt="image-20220814105451018" style="zoom:67%;" />

在此模型下，上下文切换的数量减少到一个。具体而言，`transferTo()`方法指示块设备通过 DMA 引擎将数据读取到读取缓冲区中。然后，将该缓冲区复制到另一个内核缓冲区以暂存到套接字。最后，套接字缓冲区通过 DMA 复制到 NIC 缓冲区。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141055696.png" alt="image-20220814105502634" style="zoom:67%;" />

我们将副本数从四减少到三，并且这些副本中只有一个涉及 CPU。我们还将上下文切换的数量从四个减少到了两个。这是一个很大的改进，但是还没有查询零副本。当运行 Linux 内核 2.4 及更高版本以及支持收集操作的网络接口卡时，后者可以作为进一步的优化来实现。如下所示。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141055274.png" alt="image-20220814105513194" style="zoom:67%;" />

根据前面的示例，调用`transferTo()`方法会使设备通过 DMA 引擎将数据读取到内核读取缓冲区中。但是，使用`gather`操作时，读取缓冲区和套接字缓冲区之间没有复制。取而代之的是，给 NIC 一个指向读取缓冲区的指针以及偏移量和长度，该偏移量和长度由 DMA 清除。CPU 绝对不参与复制缓冲区。

关于`零拷贝`详情，可以详读这篇文章零拷贝 (Zero-copy) 浅析及其应用。

## PageCache

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141055663.png" alt="image-20220814105535586" style="zoom:67%;" />

producer 生产消息到 Broker 时，Broker 会使用 pwrite() 系统调用【对应到 Java NIO 的 FileChannel.write() API】按偏移量写入数据，此时数据都会先写入`page cache`。consumer 消费消息时，Broker 使用 sendfile() 系统调用【对应 FileChannel.transferTo() API】，零拷贝地将数据从 page cache 传输到 broker 的 Socket buffer，再通过网络传输。

leader 与 follower 之间的同步，与上面 consumer 消费数据的过程是同理的。

`page cache`中的数据会随着内核中 flusher 线程的调度以及对 sync()/fsync() 的调用写回到磁盘，就算进程崩溃，也不用担心数据丢失。另外，如果 consumer 要消费的消息不在`page cache`里，才会去磁盘读取，并且会顺便预读出一些相邻的块放入 page cache，以方便下一次读取。

因此如果 Kafka producer 的生产速率与 consumer 的消费速率相差不大，那么就能几乎只靠对 broker page cache 的读写完成整个生产 - 消费过程，磁盘访问非常少。

## 网络模型

> 65 哥：网络嘛，作为 Java 程序员，自然是 Netty

是的，Netty 是 JVM 领域一个优秀的网络框架，提供了高性能的网络服务。大多数 Java 程序员提到网络框架，首先想到的就是 Netty。Dubbo、Avro-RPC 等等优秀的框架都使用 Netty 作为底层的网络通信框架。

Kafka 自己实现了网络模型做 RPC。底层基于 Java NIO，采用和 Netty 一样的 Reactor 线程模型。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141055244.png" alt="image-20220814105554155" style="zoom: 67%;" />

Reacotr 模型主要分为三个角色

- Reactor：把 IO 事件分配给对应的 handler 处理
- Acceptor：处理客户端连接事件
- Handler：处理非阻塞的任务

在传统阻塞 IO 模型中，每个连接都需要独立线程处理，当并发数大时，创建线程数多，占用资源；采用阻塞 IO 模型，连接建立后，若当前线程没有数据可读，线程会阻塞在读操作上，造成资源浪费

针对传统阻塞 IO 模型的两个问题，Reactor 模型基于池化思想，避免为每个连接创建线程，连接完成后将业务处理交给线程池处理；基于 IO 复用模型，多个连接共用同一个阻塞对象，不用等待所有的连接。遍历到有新数据可以处理时，操作系统会通知程序，线程跳出阻塞状态，进行业务逻辑处理

Kafka 即基于 Reactor 模型实现了多路复用和处理线程池。其设计如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141057774.png" alt="image-20220814105757700" style="zoom:67%;" />

其中包含了一个`Acceptor`线程，用于处理新的连接，`Acceptor` 有 N 个 `Processor` 线程 select 和 read socket 请求，N 个 `Handler` 线程处理请求并相应，即处理业务逻辑。

I/O 多路复用可以通过把多个 I/O 的阻塞复用到同一个 select 的阻塞上，从而使得系统在单线程的情况下可以同时处理多个客户端请求。它的最大优势是系统开销小，并且不需要创建新的进程或者线程，降低了系统的资源开销。

**总结：** Kafka Broker 的 `KafkaServer` 设计是一个优秀的网络架构，有想了解 Java 网络编程，或需要使用到这方面技术的同学不妨去读一读源码。后续『码哥』的 Kafka 系列文章也将涉及这块源码的解读。

## 批量与压缩

Kafka Producer 向 Broker 发送消息不是一条消息一条消息的发送。使用过 Kafka 的同学应该知道，Producer 有两个重要的参数：`batch.size`和`linger.ms`。这两个参数就和 Producer 的批量发送有关。

Kafka Producer 的执行流程如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141058247.png" alt="image-20220814105811163" style="zoom:67%;" />

发送消息依次经过以下处理器：

- Serialize：键和值都根据传递的序列化器进行序列化。优秀的序列化方式可以提高网络传输的效率。
- Partition：决定将消息写入主题的哪个分区，默认情况下遵循 murmur2 算法。自定义分区程序也可以传递给生产者，以控制应将消息写入哪个分区。
- Compress：默认情况下，在 Kafka 生产者中不启用压缩.Compression 不仅可以更快地从生产者传输到代理，还可以在复制过程中进行更快的传输。压缩有助于提高吞吐量，降低延迟并提高磁盘利用率。
- Accumulate：`Accumulate`顾名思义，就是一个消息累计器。其内部为每个 Partition 维护一个`Deque`双端队列，队列保存将要发送的批次数据，`Accumulate`将数据累计到一定数量，或者在一定过期时间内，便将数据以批次的方式发送出去。记录被累积在主题每个分区的缓冲区中。根据生产者批次大小属性将记录分组。主题中的每个分区都有一个单独的累加器 / 缓冲区。
- Group Send：记录累积器中分区的批次按将它们发送到的代理分组。批处理中的记录基于 batch.size 和 linger.ms 属性发送到代理。记录由生产者根据两个条件发送。当达到定义的批次大小或达到定义的延迟时间时。

Kafka 支持多种压缩算法：lz4、snappy、gzip。Kafka 2.1.0 正式支持 ZStandard —— ZStandard 是 Facebook 开源的压缩算法，旨在提供超高的压缩比 (compression ratio)，具体细节参见 zstd。

Producer、Broker 和 Consumer 使用相同的压缩算法，在 producer 向 Broker 写入数据，Consumer 向 Broker 读取数据时甚至可以不用解压缩，最终在 Consumer Poll 到消息时才解压，这样节省了大量的网络和磁盘开销。

## 分区并发

Kafka 的 Topic 可以分成多个 Partition，每个 Paritition 类似于一个队列，保证数据有序。同一个 Group 下的不同 Consumer 并发消费 Paritition，分区实际上是调优 Kafka 并行度的最小单元，因此，可以说，每增加一个 Paritition 就增加了一个消费并发。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141058860.png" alt="image-20220814105828731" style="zoom:67%;" />

Kafka 具有优秀的分区分配算法——StickyAssignor，可以保证分区的分配尽量地均衡，且每一次重分配的结果尽量与上一次分配结果保持一致。这样，整个集群的分区尽量地均衡，各个 Broker 和 Consumer 的处理不至于出现太大的倾斜。

> 65 哥：那是不是分区数越多越好呢？

当然不是。

#### 越多的分区需要打开更多的文件句柄

在 kafka 的 broker 中，每个分区都会对照着文件系统的一个目录。在 kafka 的数据日志文件目录中，每个日志数据段都会分配两个文件，一个索引文件和一个数据文件。因此，随着 partition 的增多，需要的文件句柄数急剧增加，必要时需要调整操作系统允许打开的文件句柄数。

#### 客户端 / 服务器端需要使用的内存就越多

客户端 producer 有个参数 batch.size，默认是 16KB。它会为每个分区缓存消息，一旦满了就打包将消息批量发出。看上去这是个能够提升性能的设计。不过很显然，因为这个参数是分区级别的，如果分区数越多，这部分缓存所需的内存占用也会更多。

#### 降低高可用性

分区越多，每个 Broker 上分配的分区也就越多，当一个发生 Broker 宕机，那么恢复时间将很长。

## 文件结构

Kafka 消息是以 Topic 为单位进行归类，各个 Topic 之间是彼此独立的，互不影响。每个 Topic 又可以分为一个或多个分区。每个分区各自存在一个记录消息数据的日志文件。

Kafka 每个分区日志在物理上实际按大小被分成多个 Segment。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141056283.png" alt="image-20220814105639202" style="zoom:67%;" />

- segment file 组成：由 2 大部分组成，分别为 index file 和 data file，此 2 个文件一一对应，成对出现，后缀”.index”和“.log”分别表示为 segment 索引文件、数据文件。
- segment 文件命名规则：partion 全局的第一个 segment 从 0 开始，后续每个 segment 文件名为上一个 segment 文件最后一条消息的 offset 值。数值最大为 64 位 long 大小，19 位数字字符长度，没有数字用 0 填充。

index 采用稀疏索引，这样每个 index 文件大小有限，Kafka 采用`mmap`的方式，直接将 index 文件映射到内存，这样对 index 的操作就不需要操作磁盘 IO。`mmap`的 Java 实现对应 `MappedByteBuffer` 。

> 65 哥笔记：mmap 是一种内存映射文件的方法。即将一个文件或者其它对象映射到进程的地址空间，实现文件磁盘地址和进程虚拟地址空间中一段虚拟地址的一一对映关系。实现这样的映射关系后，进程就可以采用指针的方式读写操作这一段内存，而系统会自动回写脏页面到对应的文件磁盘上，即完成了对文件的操作而不必再调用 read,write 等系统调用函数。相反，内核空间对这段区域的修改也直接反映用户空间，从而可以实现不同进程间的文件共享。

Kafka 充分利用二分法来查找对应 offset 的消息位置：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141056660.png" alt="image-20220814105617587" style="zoom: 67%;" />

1. 按照二分法找到小于 offset 的 segment 的.log 和.index
2. 用目标 offset 减去文件名中的 offset 得到消息在这个 segment 中的偏移量。
3. 再次用二分法在 index 文件中找到对应的索引。
4. 到 log 文件中，顺序查找，直到找到 offset 对应的消息。

## 总结

Kafka 是一个优秀的开源项目。其在性能上面的优化做的淋漓尽致，是很值得我们深入学习的一个项目。无论是思想还是实现，我们都应该认真的去看一看，想一想。

**Kafka 性能优化：**

1. 零拷贝网络和磁盘
2. 优秀的网络模型，基于 Java NIO
3. 高效的文件数据结构设计
4. Parition 并行和可扩展
5. 数据批量传输
6. 数据压缩
7. 顺序读写磁盘
8. 无锁轻量级 offset



# 从面试角度一文学完 Kafka

Kafka 是一个优秀的分布式消息中间件，许多系统中都会使用到 Kafka 来做消息通信。对分布式消息系统的了解和使用几乎成为一个后台开发人员必备的技能。今天`码哥字节`就从常见的 Kafka 面试题入手，和大家聊聊 Kafka 的那些事儿。

## 讲一讲分布式消息中间件

### 问题

- 什么是分布式消息中间件？
- 消息中间件的作用是什么？
- 消息中间件的使用场景是什么？
- 消息中间件选型？

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141100630.png" alt="image-20220814110026579" style="zoom:67%;" />

分布式消息是一种通信机制，和 RPC、HTTP、RMI 等不一样，消息中间件采用分布式中间代理的方式进行通信。如图所示，采用了消息中间件之后，上游业务系统发送消息，先存储在消息中间件，然后由消息中间件将消息分发到对应的业务模块应用（分布式生产者 - 消费者模式）。这种异步的方式，减少了服务之间的耦合程度。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141100896.png" alt="image-20220814110045843" style="zoom:67%;" />

**定义消息中间件：**

- 利用高效可靠的消息传递机制进行平台无关的数据交流
- 基于数据通信，来进行分布式系统的集成
- 通过提供消息传递和消息排队模型，可以在分布式环境下扩展进程间的通信

在系统架构中引用额外的组件，必然提高系统的架构复杂度和运维的难度，那么**在系统中使用分布式消息中间件有什么优势呢？消息中间件在系统中起的作用又是什么呢？**

- 解耦
- 冗余（存储）
- 扩展性
- 削峰
- 可恢复性
- 顺序保证
- 缓冲
- 异步通信

面试时，面试官经常会关心面试者对开源组件的选型能力，这既可以考验面试者知识的广度，也可以考验面试者对某类系统的知识的认识深度，而且也可以看出面试者对系统整体把握和系统架构设计的能力。开源分布式消息系统有很多，不同的消息系统的特性也不一样，选择怎样的消息系统，不仅需要对各消息系统有一定的了解，也需要对自身系统需求有清晰的认识。

**下面是常见的几种分布式消息系统的对比：**

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/FbXJ7UCc6O1oicl7z78fR9ibRGPNMBfV0eWicicf2rsCH8TmuQOwSsIv4yodTLUBzRuiaic7qeiaBo5IYZtv0fkhfhq4A/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)选择

### 答案关键字

- 什么是分布式消息中间件？通信，队列，分布式，生产消费者模式。
- 消息中间件的作用是什么？解耦、峰值处理、异步通信、缓冲。
- 消息中间件的使用场景是什么？异步通信，消息存储处理。
- 消息中间件选型？语言，协议、HA、数据可靠性、性能、事务、生态、简易、推拉模式。

## Kafka 基本概念和架构

### 问题

- 简单讲下 Kafka 的架构？
- Kafka 是推模式还是拉模式，推拉的区别是什么？
- Kafka 如何广播消息？
- Kafka 的消息是否是有序的？
- Kafka 是否支持读写分离？
- Kafka 如何保证数据高可用？
- Kafka 中 zookeeper 的作用？
- 是否支持事务？
- 分区数是否可以减少？

**Kafka 架构中的一般概念：**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141107049.png" alt="image-20220814110717966" style="zoom:67%;" />

- Producer：生产者，也就是发送消息的一方。生产者负责创建消息，然后将其发送到 Kafka。
- Consumer：消费者，也就是接受消息的一方。消费者连接到 Kafka 上并接收消息，进而进行相应的业务逻辑处理。
- Consumer Group：一个消费者组可以包含一个或多个消费者。使用多分区 + 多消费者方式可以极大提高数据下游的处理速度，同一消费组中的消费者不会重复消费消息，同样的，不同消费组中的消费者消息消息时互不影响。Kafka 就是通过消费组的方式来实现消息 P2P 模式和广播模式。
- Broker：服务代理节点。Broker 是 Kafka 的服务节点，即 Kafka 的服务器。
- Topic：Kafka 中的消息以 Topic 为单位进行划分，生产者将消息发送到特定的 Topic，而消费者负责订阅 Topic 的消息并进行消费。
- Partition：Topic 是一个逻辑的概念，它可以细分为多个分区，每个分区只属于单个主题。同一个主题下不同分区包含的消息是不同的，分区在存储层面可以看作一个可追加的日志（Log）文件，消息在被追加到分区日志文件的时候都会分配一个特定的偏移量（offset）。
- Offset：offset 是消息在分区中的唯一标识，Kafka 通过它来保证消息在分区内的顺序性，不过 offset 并不跨越分区，也就是说，Kafka 保证的是分区有序性而不是主题有序性。
- Replication：副本，是 Kafka 保证数据高可用的方式，Kafka 同一 Partition 的数据可以在多 Broker 上存在多个副本，通常只有主副本对外提供读写服务，当主副本所在 broker 崩溃或发生网络一场，Kafka 会在 Controller 的管理下会重新选择新的 Leader 副本对外提供读写服务。
- Record：实际写入 Kafka 中并可以被读取的消息记录。每个 record 包含了 key、value 和 timestamp。

**Kafka Topic Partitions Layout**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141107734.png" alt="image-20220814110738667" style="zoom:67%;" />

Kafka 将 Topic 进行分区，分区可以并发读写。

**Kafka Consumer Offset**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141107602.png" alt="image-20220814110757525" style="zoom:50%;" />

### zookeeper

![图片](https://mmbiz.qpic.cn/mmbiz_png/FbXJ7UCc6O1oicl7z78fR9ibRGPNMBfV0eW1FHYjVEQY28EmLJoT0mfqOoF1DeEwQTWkO61aWiaJqDuLEtWiaKbxicw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)zookeeper

- Broker 注册：Broker 是分布式部署并且之间相互独立，Zookeeper 用来管理注册到集群的所有 Broker 节点。
- Topic 注册：在 Kafka 中，同一个 Topic 的消息会被分成多个分区并将其分布在多个 Broker 上，这些分区信息及与 Broker 的对应关系也都是由 Zookeeper 在维护
- 生产者负载均衡：由于同一个 Topic 消息会被分区并将其分布在多个 Broker 上，因此，生产者需要将消息合理地发送到这些分布式的 Broker 上。
- 消费者负载均衡：与生产者类似，Kafka 中的消费者同样需要进行负载均衡来实现多个消费者合理地从对应的 Broker 服务器上接收消息，每个消费者分组包含若干消费者，每条消息都只会发送给分组中的一个消费者，不同的消费者分组消费自己特定的 Topic 下面的消息，互不干扰。

### 答案关键字

- 简单讲下 Kafka 的架构？

  > Producer、Consumer、Consumer Group、Topic、Partition

- Kafka 是推模式还是拉模式，推拉的区别是什么？

  > Kafka Producer 向 Broker 发送消息使用 Push 模式，Consumer 消费采用的 Pull 模式。拉取模式，让 consumer 自己管理 offset，可以提供读取性能

- Kafka 如何广播消息？

  > Consumer group

- Kafka 的消息是否是有序的？

  > Topic 级别无序，Partition 有序

- Kafka 是否支持读写分离？

  > 不支持，只有 Leader 对外提供读写服务

- Kafka 如何保证数据高可用？

  > 副本，ack，HW

- Kafka 中 zookeeper 的作用？

  > 集群管理，元数据管理

- 是否支持事务？

  > 0.11 后支持事务，可以实现”exactly once“

- 分区数是否可以减少？

  > 不可以，会丢失数据

## Kafka 使用

### 问题

- Kafka 有哪些命令行工具？你用过哪些？
- Kafka Producer 的执行过程？
- Kafka Producer 有哪些常见配置？
- 如何让 Kafka 的消息有序？
- Producer 如何保证数据发送不丢失？
- 如何提升 Producer 的性能？
- 如果同一 group 下 consumer 的数量大于 part 的数量，kafka 如何处理？
- Kafka Consumer 是否是线程安全的？
- 讲一下你使用 Kafka Consumer 消费消息时的线程模型，为何如此设计？
- Kafka Consumer 的常见配置？
- Consumer 什么时候会被踢出集群？
- 当有 Consumer 加入或退出时，Kafka 会作何反应？
- 什么是 Rebalance，何时会发生 Rebalance？

### 命令行工具

Kafka 的命令行工具在 Kafka 包的`/bin`目录下，主要包括服务和集群管理脚本，配置脚本，信息查看脚本，Topic 脚本，客户端脚本等。

- kafka-configs.sh：配置管理脚本
- kafka-console-consumer.sh：kafka 消费者控制台
- kafka-console-producer.sh：kafka 生产者控制台
- kafka-consumer-groups.sh：kafka 消费者组相关信息
- kafka-delete-records.sh：删除低水位的日志文件
- kafka-log-dirs.sh：kafka 消息日志目录信息
- kafka-mirror-maker.sh：不同数据中心 kafka 集群复制工具
- kafka-preferred-replica-election.sh：触发 preferred replica 选举
- kafka-producer-perf-test.sh：kafka 生产者性能测试脚本
- kafka-reassign-partitions.sh：分区重分配脚本
- kafka-replica-verification.sh：复制进度验证脚本
- kafka-server-start.sh：启动 kafka 服务
- kafka-server-stop.sh：停止 kafka 服务
- kafka-topics.sh：topic 管理脚本
- kafka-verifiable-consumer.sh：可检验的 kafka 消费者
- kafka-verifiable-producer.sh：可检验的 kafka 生产者
- zookeeper-server-start.sh：启动 zk 服务
- zookeeper-server-stop.sh：停止 zk 服务
- zookeeper-shell.sh：zk 客户端

我们通常可以使用`kafka-console-consumer.sh`和`kafka-console-producer.sh`脚本来测试 Kafka 生产和消费，`kafka-consumer-groups.sh`可以查看和管理集群中的 Topic，`kafka-topics.sh`通常用于查看 Kafka 的消费组情况。

### Kafka Producer

Kafka producer 的正常生产逻辑包含以下几个步骤：

1. 配置生产者客户端参数常见生产者实例。
2. 构建待发送的消息。
3. 发送消息。
4. 关闭生产者实例。

Producer 发送消息的过程如下图所示，需要经过`拦截器`，`序列化器`和`分区器`，最终由`累加器`批量发送至 Broker。

![图片](https://mmbiz.qpic.cn/mmbiz_png/FbXJ7UCc6O1oicl7z78fR9ibRGPNMBfV0eKTYZaOjN9EnxQY1V9DQENGvNs6BgibS2mkrZR58b2HTYxjo7Su8ayvQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)producer

Kafka Producer 需要以下必要参数：

- bootstrap.server：指定 Kafka 的 Broker 的地址
- key.serializer：key 序列化器
- value.serializer：value 序列化器

常见参数：

- batch.num.messages

  > 默认值：200，每次批量消息的数量，只对 asyc 起作用。

- request.required.acks

  > 默认值：0，0 表示 producer 毋须等待 leader 的确认，1 代表需要 leader 确认写入它的本地 log 并立即确认，-1 代表所有的备份都完成后确认。只对 async 模式起作用，这个参数的调整是数据不丢失和发送效率的 tradeoff，如果对数据丢失不敏感而在乎效率的场景可以考虑设置为 0，这样可以大大提高 producer 发送数据的效率。

- request.timeout.ms

  > 默认值：10000，确认超时时间。

- partitioner.class

  > 默认值：kafka.producer.DefaultPartitioner，必须实现 kafka.producer.Partitioner，根据 Key 提供一个分区策略。*有时候我们需要相同类型的消息必须顺序处理，这样我们就必须自定义分配策略，从而将相同类型的数据分配到同一个分区中。*

- producer.type

  > 默认值：sync，指定消息发送是同步还是异步。异步 asyc 成批发送用 kafka.producer.AyncProducer， 同步 sync 用 kafka.producer.SyncProducer。同步和异步发送也会影响消息生产的效率。

- compression.topic

  > 默认值：none，消息压缩，默认不压缩。其余压缩方式还有，"gzip"、"snappy"和"lz4"。对消息的压缩可以极大地减少网络传输量、降低网络 IO，从而提高整体性能。

- compressed.topics

  > 默认值：null，在设置了压缩的情况下，可以指定特定的 topic 压缩，未指定则全部压缩。

- message.send.max.retries

  > 默认值：3，消息发送最大尝试次数。

- retry.backoff.ms

  > 默认值：300，每次尝试增加的额外的间隔时间。

- topic.metadata.refresh.interval.ms

  > 默认值：600000，定期的获取元数据的时间。当分区丢失，leader 不可用时 producer 也会主动获取元数据，如果为 0，则每次发送完消息就获取元数据，不推荐。如果为负值，则只有在失败的情况下获取元数据。

- queue.buffering.max.ms

  > 默认值：5000，在 producer queue 的缓存的数据最大时间，仅仅 for asyc。

- queue.buffering.max.message

  > 默认值：10000，producer 缓存的消息的最大数量，仅仅 for asyc。

- queue.enqueue.timeout.ms

  > 默认值：-1，0 当 queue 满时丢掉，负值是 queue 满时 block, 正值是 queue 满时 block 相应的时间，仅仅 for asyc。

### Kafka Consumer

Kafka 有消费组的概念，每个消费者只能消费所分配到的分区的消息，每一个分区只能被一个消费组中的一个消费者所消费，所以同一个消费组中消费者的数量如果超过了分区的数量，将会出现有些消费者分配不到消费的分区。消费组与消费者关系如下图所示：

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/FbXJ7UCc6O1oicl7z78fR9ibRGPNMBfV0e8hZibvux434Ezrdic0AwyjujUTWZOnf3Aue0NBEDWWTPsRo3nPIdD9Gg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)consumer group

Kafka Consumer Client 消费消息通常包含以下步骤：

1. 配置客户端，创建消费者
2. 订阅主题
3. 拉去消息并消费
4. 提交消费位移
5. 关闭消费者实例

![图片](https://mmbiz.qpic.cn/mmbiz_png/FbXJ7UCc6O1oicl7z78fR9ibRGPNMBfV0eXcBXb9ysKJdxfk6HfugAjIaKvJj2ibCF3FNicp5ZWXRydmy29W14iclEw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)过程

因为 Kafka 的 Consumer 客户端是线程不安全的，为了保证线程安全，并提升消费性能，可以在 Consumer 端采用类似 Reactor 的线程模型来消费数据。

![图片](https://mmbiz.qpic.cn/mmbiz_png/FbXJ7UCc6O1oicl7z78fR9ibRGPNMBfV0eJoAxjWZQhqboDia1UsJDSrdqEaQVaWu6icwL24b4HVPGFQbtQH95GAWA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)消费模型

#### Kafka consumer 参数

- bootstrap.servers：连接 broker 地址，`host：port` 格式。
- group.id：消费者隶属的消费组。
- key.deserializer：与生产者的`key.serializer`对应，key 的反序列化方式。
- value.deserializer：与生产者的`value.serializer`对应，value 的反序列化方式。
- session.timeout.ms：coordinator 检测失败的时间。默认 10s 该参数是 Consumer Group 主动检测 （组内成员 comsummer) 崩溃的时间间隔，类似于心跳过期时间。
- auto.offset.reset：该属性指定了消费者在读取一个没有偏移量后者偏移量无效（消费者长时间失效当前的偏移量已经过时并且被删除了）的分区的情况下，应该作何处理，默认值是 latest，也就是从最新记录读取数据（消费者启动之后生成的记录），另一个值是 earliest，意思是在偏移量无效的情况下，消费者从起始位置开始读取数据。
- enable.auto.commit：否自动提交位移，如果为`false`，则需要在程序中手动提交位移。对于精确到一次的语义，最好手动提交位移
- fetch.max.bytes：单次拉取数据的最大字节数量
- max.poll.records：单次 poll 调用返回的最大消息数，如果处理逻辑很轻量，可以适当提高该值。但是`max.poll.records`条数据需要在在 session.timeout.ms 这个时间内处理完 。默认值为 500
- request.timeout.ms：一次请求响应的最长等待时间。如果在超时时间内未得到响应，kafka 要么重发这条消息，要么超过重试次数的情况下直接置为失败。

#### Kafka Rebalance

rebalance 本质上是一种协议，规定了一个 consumer group 下的所有 consumer 如何达成一致来分配订阅 topic 的每个分区。比如某个 group 下有 20 个 consumer，它订阅了一个具有 100 个分区的 topic。正常情况下，Kafka 平均会为每个 consumer 分配 5 个分区。这个分配的过程就叫 rebalance。

**什么时候 rebalance？**

这也是经常被提及的一个问题。rebalance 的触发条件有三种：

- 组成员发生变更（新 consumer 加入组、已有 consumer 主动离开组或已有 consumer 崩溃了——这两者的区别后面会谈到）
- 订阅主题数发生变更
- 订阅主题的分区数发生变更

**如何进行组内分区分配？**

Kafka 默认提供了两种分配策略：Range 和 Round-Robin。当然 Kafka 采用了可插拔式的分配策略，你可以创建自己的分配器以实现不同的分配策略。

### 答案关键字

- Kafka 有哪些命令行工具？你用过哪些？`/bin`目录，管理 kafka 集群、管理 topic、生产和消费 kafka
- Kafka Producer 的执行过程？拦截器，序列化器，分区器和累加器
- Kafka Producer 有哪些常见配置？broker 配置，ack 配置，网络和发送参数，压缩参数，ack 参数
- 如何让 Kafka 的消息有序？Kafka 在 Topic 级别本身是无序的，只有 partition 上才有序，所以为了保证处理顺序，可以自定义分区器，将需顺序处理的数据发送到同一个 partition
- Producer 如何保证数据发送不丢失？ack 机制，重试机制
- 如何提升 Producer 的性能？批量，异步，压缩
- 如果同一 group 下 consumer 的数量大于 part 的数量，kafka 如何处理？多余的 Part 将处于无用状态，不消费数据
- Kafka Consumer 是否是线程安全的？不安全，单线程消费，多线程处理
- 讲一下你使用 Kafka Consumer 消费消息时的线程模型，为何如此设计？拉取和处理分离
- Kafka Consumer 的常见配置？broker, 网络和拉取参数，心跳参数
- Consumer 什么时候会被踢出集群？奔溃，网络异常，处理时间过长提交位移超时
- 当有 Consumer 加入或退出时，Kafka 会作何反应？进行 Rebalance
- 什么是 Rebalance，何时会发生 Rebalance？topic 变化，consumer 变化

## 高可用和性能

### 问题

- Kafka 如何保证高可用？
- Kafka 的交付语义？
- Replic 的作用？
- 什么事 AR，ISR？
- Leader 和 Flower 是什么？
- Kafka 中的 HW、LEO、LSO、LW 等分别代表什么？
- Kafka 为保证优越的性能做了哪些处理？

### 分区与副本

![图片](https://mmbiz.qpic.cn/mmbiz_png/FbXJ7UCc6O1oicl7z78fR9ibRGPNMBfV0ewfp38ibLicjtX0e8FmBy9CK8fDJ1puibMUu1Pac6hNNc53L1QwrHIfVvw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)分区副本

在分布式数据系统中，通常使用分区来提高系统的处理能力，通过副本来保证数据的高可用性。多分区意味着并发处理的能力，这多个副本中，只有一个是 leader，而其他的都是 follower 副本。仅有 leader 副本可以对外提供服务。多个 follower 副本通常存放在和 leader 副本不同的 broker 中。通过这样的机制实现了高可用，当某台机器挂掉后，其他 follower 副本也能迅速”转正“，开始对外提供服务。

**为什么 follower 副本不提供读服务？**

这个问题本质上是对性能和一致性的取舍。试想一下，如果 follower 副本也对外提供服务那会怎么样呢？首先，性能是肯定会有所提升的。但同时，会出现一系列问题。类似数据库事务中的幻读，脏读。比如你现在写入一条数据到 kafka 主题 a，消费者 b 从主题 a 消费数据，却发现消费不到，因为消费者 b 去读取的那个分区副本中，最新消息还没写入。而这个时候，另一个消费者 c 却可以消费到最新那条数据，因为它消费了 leader 副本。Kafka 通过 WH 和 Offset 的管理来决定 Consumer 可以消费哪些数据，已经当前写入的数据。

![图片](https://mmbiz.qpic.cn/mmbiz_png/FbXJ7UCc6O1oicl7z78fR9ibRGPNMBfV0eS5xReZlg34TaImRQV7BRkgKcs2BWUnr8JAgpMXww8UBwlQick0nmicpA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)watermark

**只有 Leader 可以对外提供读服务，那如何选举 Leader**

kafka 会将与 leader 副本保持同步的副本放到 ISR 副本集合中。当然，leader 副本是一直存在于 ISR 副本集合中的，在某些特殊情况下，ISR 副本中甚至只有 leader 一个副本。当 leader 挂掉时，kakfa 通过 zookeeper 感知到这一情况，在 ISR 副本中选取新的副本成为 leader，对外提供服务。但这样还有一个问题，前面提到过，有可能 ISR 副本集合中，只有 leader，当 leader 副本挂掉后，ISR 集合就为空，这时候怎么办呢？这时候如果设置 unclean.leader.election.enable 参数为 true，那么 kafka 会在非同步，也就是不在 ISR 副本集合中的副本中，选取出副本成为 leader。

**副本的存在就会出现副本同步问题**

Kafka 在所有分配的副本 (AR) 中维护一个可用的副本列表 (ISR)，Producer 向 Broker 发送消息时会根据`ack`配置来确定需要等待几个副本已经同步了消息才相应成功，Broker 内部会`ReplicaManager`服务来管理 flower 与 leader 之间的数据同步。

![图片](https://mmbiz.qpic.cn/mmbiz_png/FbXJ7UCc6O1oicl7z78fR9ibRGPNMBfV0e9qlJCXlG7NFkeibFgKG5y5goenXJdwzUmAQACZg5yOoAMicQX7SCnx4A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)sync

### 性能优化

- partition 并发
- 顺序读写磁盘
- page cache：按页读写
- 预读：Kafka 会将将要消费的消息提前读入内存
- 高性能序列化（二进制）
- 内存映射
- 无锁 offset 管理：提高并发能力
- Java NIO 模型
- 批量：批量读写
- 压缩：消息压缩，存储压缩，减小网络和 IO 开销

#### Partition 并发

一方面，由于不同 Partition 可位于不同机器，因此可以充分利用集群优势，实现机器间的并行处理。另一方面，由于 Partition 在物理上对应一个文件夹，即使多个 Partition 位于同一个节点，也可通过配置让同一节点上的不同 Partition 置于不同的 disk drive 上，从而实现磁盘间的并行处理，充分发挥多磁盘的优势。

#### 顺序读写

Kafka 每一个 partition 目录下的文件被平均切割成大小相等（默认一个文件是 500 兆，可以手动去设置）的数据文件， 每一个数据文件都被称为一个段（segment file）, 每个 segment 都采用 append 的方式追加数据。

![图片](https://mmbiz.qpic.cn/mmbiz_png/FbXJ7UCc6O1oicl7z78fR9ibRGPNMBfV0eaQDxVPnMSlUZLVNsvvGuzeoaAiaicyw9Xkia4AGdY8Ft5YH2wXBzCKZ4g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)追加数据

### 答案关键字

- Kafka 如何保证高可用？

  > 通过副本来保证数据的高可用，producer ack、重试、自动 Leader 选举，Consumer 自平衡

- Kafka 的交付语义？

  > 交付语义一般有`at least once`、`at most once`和`exactly once`。kafka 通过 ack 的配置来实现前两种。

- Replic 的作用？

  > 实现数据的高可用

- 什么是 AR，ISR？

  > AR：Assigned Replicas。AR 是主题被创建后，分区创建时被分配的副本集合，副本个 数由副本因子决定。ISR：In-Sync Replicas。Kafka 中特别重要的概念，指代的是 AR 中那些与 Leader 保 持同步的副本集合。在 AR 中的副本可能不在 ISR 中，但 Leader 副本天然就包含在 ISR 中。关于 ISR，还有一个常见的面试题目是如何判断副本是否应该属于 ISR。目前的判断 依据是：Follower 副本的 LEO 落后 Leader LEO 的时间，是否超过了 Broker 端参数 replica.lag.time.max.ms 值。如果超过了，副本就会被从 ISR 中移除。

- Leader 和 Flower 是什么？

- Kafka 中的 HW 代表什么？

  > 高水位值 (High watermark)。这是控制消费者可读取消息范围的重要字段。一 个普通消费者只能“看到”Leader 副本上介于 Log Start Offset 和 HW（不含）之间的 所有消息。水位以上的消息是对消费者不可见的。

- Kafka 为保证优越的性能做了哪些处理？

  > partition 并发、顺序读写磁盘、page cache 压缩、高性能序列化（二进制）、内存映射 无锁 offset 管理、Java NIO 模型

本文并没有深入 Kafka 的实现细节和源码分析，但 Kafka 确实是一个 优秀的开源系统，很多优雅的架构设计和源码设计都值得我们学习，十分建议感兴趣的同学更加深入的去了解一下这个开源系统，对于自身架构设计能力，编码能力，性能优化都会有很大的帮助。



# Kafka 面试大全

[干货总结！Kafka 面试大全（万字长文，37 张图，28 个知识点） (qq.com)](https://mp.weixin.qq.com/s?__biz=MzkzMDI1NjcyOQ==&mid=2247498332&idx=1&sn=e9919cf986ff1417815647b6058933d5&chksm=c27fb86af508317c284cd53809affc9228afe91cee681d6bf30882b4819a45558eecc5bd18ad&mpshare=1&scene=23&srcid=08152eiMnE5ipnZD50sDtasd&sharer_sharetime=1660492973221&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)



# Kafka 如何解决消息不丢失

Kafka 消息框架，大家一定不陌生，很多人工作中都有接触。它的核心思路，通过一个高性能的`MQ服务`来连接`生产`和`消费`两个系统，达到系统间的解耦，有很强的扩展性。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208231022883.png" alt="image-20220823102251803" style="zoom:80%;" />

你可能会有疑问，如果中间某一个环节断掉了，那怎么办？

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208231023527.png" alt="image-20220823102305450" style="zoom:80%;" />

这种情况，我们称之为`消息丢失`，会造成系统间的数据不一致。

那如何解决这个问题？需要从`生产端`、`MQ服务端`、`消费端`，三个维度来处理

## 1、生产端

生产端的职责就是，确保生产的消息能到达MQ服务端，这里我们需要有一个响应来判断本次的操作是否成功。

```java
Future<RecordMetadata> send(ProducerRecord<K, V> record, Callback callback)
```

比如，上面的代码就是通过一个`Callback`函数，来判断消息是否发送成功，如果失败，我们需要补偿处理。

另外，为了提升发送时的灵活性，kafka提供了多种参数，供不同业务自己选择

**1.1 参数 acks**

该参数表示有多少个分区副本收到消息，才认为本次发送是成功的。

- acks=0，只要发送消息就认为成功，生产端不等待服务器节点的响应
- acks=1，表示生产者收到 leader 分区的响应就认为发送成功
- acks=-1，只有当 ISR 中的副本全部收到消息时，生产端才会认为是成功的。这种配置是最安全的，但由于同步的节点较多，吞吐量会降低。

**1.2 参数 retries**

表示生产端的重试次数，如果重试次数用完后，还是失败，会将消息临时存储在本地磁盘，待服务恢复后再重新发送。建议值 `retries=3`

**1.3 参数 retry.backoff.m**

消息发送超时或失败后，间隔的重试时间。一般推荐的设置时间是 300 毫秒。

这里要特别注意一种特殊情况，如果MQ服务没有正常响应，不一定代表`消息发送失败`，也有可能是响应时正好赶上网络抖动，响应超时。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208231023299.png" alt="image-20220823102343210" style="zoom:67%;" />

**当生产端做完这些，一定能保证消息发送成功了，但可能发送多次，这样就会导致消息重复，这个我们后面再讲解决方案**



## 2、MQ服务端

MQ服务端作为消息的存储介质，也有可能会丢失消息。比如：一个分区突然挂掉，那么怎么保证这个分区的数据不丢失，我们会引入副本概念，通过备份来解决这个问题。

具体可设置哪些参数？

**2.1 参数 replication.factor**

表示分区副本的个数，`replication.factor >1` 当leader 副本挂了，follower副本会被选举为leader继续提供服务。

**2.2 参数 min.insync.replicas**

表示 ISR 最少的副本数量，通常设置 `min.insync.replicas >1`，这样才有可用的follower副本执行替换，保证消息不丢失

**2.3 参数 unclean.leader.election.enable**

是否可以把非 ISR 集合中的副本选举为 leader 副本。

如果设置为`true`，而follower副本的同步消息进度落后较多，此时被选举为leader，会导致消息丢失，慎用。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208231024629.png" alt="image-20220823102406539" style="zoom:67%;" />

## 3、消费端

消费端要做的是把消息完整的消费处理掉。但是这里面有个`提交位移`的步骤。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208231024028.png" alt="image-20220823102426946" style="zoom:67%;" />

有的同学，考虑到`业务处理`消耗时间较长，会单独启动线程拉取消息存储到本地内存队列，然后再搞个线程池并行处理业务逻辑。这样设计有个风险，本地消息如果没有处理完，服务器宕机了，会造成消息丢失。

**正确的做法：拉取消息 ---  业务处理  ---- 提交消费位移**

关于提交位移，kafka提供了集中参数配置

**参数  enable.auto.commit**

表示消费位移是否自动提交。

如果拉取了消息，业务逻辑还没处理完，提交了消费位移但是消费端却挂了，消费端恢复或其他消费端接管该分片再也拉取不到这条消息，会造成消息丢失。所以，我们通常设置 `enable.auto.commit=false`，手动提交消费位移。

```java
List<String> messages = consumer.poll()；
processMsg(messages);
consumer.commitOffset();
```

这个方案，会产生另外一个问题，我们来看下这个图

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208231027283.png" alt="image-20220823102735210" style="zoom:67%;" />

拉取了`消息4~消息8`，业务处理后，在提交消费位移时，不凑巧系统宕机了，最后的提交位移并没有保存到MQ 服务端，下次拉取消息时，依然是从`消息4`开始拉取，但是这部分消息已经处理过了，这样便会导致重复消费。

## 如何解决重复消费，避免引发数据不一致

首先，要解决MQ 服务端的重复消息。kafka 在  0.11.0 版本后，每条消息都有唯一的message id, MQ服务采用空间换时间方式，自动对重复消息过滤处理，保证接口的幂等性。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208231024786.png" alt="image-20220823102457675" style="zoom:67%;" />

但这个不能根本上解决消息重复问题，即使MQ服务中存储的消息没有重复，但消费端是采用拉取方式，如果重复拉取，也会导致`重复消费`，如何解决这种场景问题？

方案一：只拉取一次（`消费者拉取消息后，先提交 offset 后再处理消息`），但是如果系统宕机，业务处理没有正常结束，后面再也拉取不到这些消息，会导致数据不一致，该方案很少采用。

方案二：允许拉取重复消息，但是消费端自己做幂等性控制。保证只`成功消费一次`。

关于幂等技术方案很多，我们可以采用`数据表`或`Redis缓存`存储处理标识，每次拉取到消息，处理前先校验处理状态，再决定是处理还是丢弃消息。

# Kafka 核心知识点

Kafka最初是由Linkedin公司开发的，是一个分布式的、可扩展的、容错的、支持分区的（Partition）、多副本的（replica）、基于Zookeeper框架的发布-订阅消息系统，Kafka适合离线和在线消息消费。它是分布式应用系统中的重要组件之一，也被广泛应用于大数据处理。Kafka是用Scala语言开发，它的Java版本称为Jafka。Linkedin于2010年将该系统贡献给了Apache基金会并成为顶级开源项目之一。

![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibnr03SRArbgZ0SSZuFqm7eJ3zn5AnwZZic7pHiaCzIx23XaxlWPWUIRug/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**Kafka 是个大家伙，本篇将通过40道问答作为路线，由浅入深，最大程度上覆盖整个 Kafka 的问答内容（预习＋复习一步到位）**

![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIrvkFDP068RicvobP7yoOPmsOYv57ibia7ibuZU1VVD7R7eDbl3bfHvGFg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

------

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)1、Kafka 的设计

Kafka 将消息以 topic 为单位进行归纳，发布消息的程序称为 **Producer**，消费消息的程序称为 **Consumer**。它是以集群的方式运行，可以由一个或多个服务组成，每个服务叫做一个 **Broker**，Producer 通过网络将消息发送到 kafka 集群，集群向消费者提供消息，broker 在中间起到一个代理保存消息的中转站。

**Kafka 中重要的组件**

*1）Producer*：消息生产者，发布消息到Kafka集群的终端或服务

*2）Broker*：一个 Kafka 节点就是一个 Broker，多个Broker可组成一个Kafka 集群。

> 如果某个 Topic 下有 n 个Partition 且集群有 n 个Broker，那么每个 Broker会存储该 Topic 下的一个 Partition
>
> 如果某个 Topic 下有 n 个Partition 且集群中有 m+n 个Broker，那么只有 n 个Broker会存储该Topic下的一个 Partition
>
> 如果某个 Topic 下有 n 个Partition 且集群中的Broker数量小于 n，那么一个 Broker 会存储该 Topic 下的一个或多个 Partition，这种情况尽量避免，会导致集群数据不均衡

*3）Topic*：消息主题，每条发布到Kafka集群的消息都会归集于此，Kafka是面向Topic 的

*4）Partition*：Partition 是Topic在物理上的分区，一个Topic可以分为多个Partition，每个Partition是一个有序的不可变的记录序列。单一主题中的分区有序，但无法保证主题中所有分区的消息有序。

*5）Consumer*：从Kafka集群中消费消息的终端或服务

*6）Consumer Group*：每个Consumer都属于一个Consumer Group，每条消息只能被Consumer Group中的一个Consumer消费，但可以被多个Consumer Group消费。

*7）Replica*：Partition 的副本，用来保障Partition的高可用性。

*8）Controller：* Kafka 集群中的其中一个服务器，用来进行Leader election以及各种 Failover 操作。

*9）Zookeeper*：Kafka 通过Zookeeper来存储集群中的 meta 消息

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)2、Kafka 性能高原因

1. 利用了 PageCache 缓存
2. 磁盘顺序写
3. 零拷贝技术
4. pull 拉模式

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)3、Kafka 文件高效存储设计原理

1. Kafka把Topic中一个Partition大文件分成多个小文件段，通过多个小文件段，就容易定期清除或删除已经消费完成的文件，减少磁盘占用
2. 通过索引信息可以快速定位Message和确定response的最大大小
3. 通过将索引元数据全部映射到 memory，可以避免 Segment 文件的磁盘I/O操作
4. 通过索引文件稀疏存储，可以大幅降低索引文件元数据占用空间大小

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)4、Kafka 的优缺点

**优点**

- 高性能、高吞吐量、低延迟：Kafka 生产和消费消息的速度都达到每秒10万级
- 高可用：所有消息持久化存储到磁盘，并支持数据备份防止数据丢失
- 高并发：支持数千个客户端同时读写
- 容错性：允许集群中节点失败（若副本数量为n，则允许 n-1 个节点失败）
- 高扩展性：Kafka 集群支持热伸缩，无须停机

**缺点**

- 没有完整的监控工具集
- 不支持通配符主题选择

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)5、Kafka 的应用场景

1. **日志聚合**：可收集各种服务的日志写入kafka的消息队列进行存储
2. **消息系统**：广泛用于消息中间件
3. **系统解耦**：在重要操作完成后，发送消息，由别的服务系统来完成其他操作
4. **流量削峰**：一般用于秒杀或抢购活动中，来缓冲网站短时间内高流量带来的压力
5. **异步处理**：通过异步处理机制，可以把一个消息放入队列中，但不立即处理它，在需要的时候再进行处理

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)6、Kafka 中分区的概念

主题是一个逻辑上的概念，还可以细分为多个分区，一个分区只属于单个主题，很多时候也会把分区称为主题分区（Topic-Partition）。同一主题下的不同分区包含的消息是不同的，分区在存储层面可以看做一个可追加的`日志文件` ，消息在被追加到分区日志文件的时候都会分配一个特定的偏移量（offset）。offset 是消息在分区中的唯一标识，kafka 通过它来保证消息在分区内的顺序性，不过 offset 并不跨越分区，也就是说，kafka保证的是分区有序而不是主题有序。

在分区中又引入了多副本（replica）的概念，通过增加副本数量可以提高容灾能力。同一分区的不同副本中保存的是相同的消息。副本之间是一主多从的关系，其中主副本负责读写，从副本只负责消息同步。副本处于不同的 broker 中，当主副本出现异常，便会在从副本中提升一个为主副本。

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)7、Kafka 中分区的原则

1. 指明Partition的情况下，直接将指明的值作为Partition值
2. 没有指明Partition值但有 key 的情况下，将 key 的 Hash 值与 topic 的Partition值进行取余得到Partition值
3. 既没有Partition值又没有 key 值的情况下，第一次调用时随机生成一个整数（后面每次调用在这个整数上自增），将这个值与Topic可用的Partition总数取余得到Parittion值，也就是常说的 round-robin 算法

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)8、Kafka 为什么要把消息分区

1. 方便在集群中扩展，每个 Partition 可用通过调整以适应它所在的机器，而一个Topic又可以有多个Partition组成，因此整个集群就可以适应任意大小的数据了
2. 可以提高并发，因为可以以Partition为单位进行读写

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)9、Kafka 中生产者运行流程

1. 一条消息发过来首先会被封装成一个 ProducerRecord 对象
2. 对该对象进行序列化处理（可以使用默认，也可以自定义序列化）
3. 对消息进行分区处理，分区的时候需要获取集群的元数据，决定这个消息会被发送到哪个主题的哪个分区
4. 分好区的消息不会直接发送到服务端，而是放入生产者的缓存区，多条消息会被封装成一个批次（Batch），默认一个批次的大小是 16KB
5. Sender 线程启动以后会从缓存里面去获取可以发送的批次
6. Sender 线程把一个一个批次发送到服务端

![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibakib1eb7PiaqwcRCcpkGCtYPjtk71hwLfbLb4HtVL3DRibUCw9Fl4tcrQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)10、Kafka 中的消息封装

在Kafka 中 Producer 可以 Batch的方式推送数据达到提高效率的作用。Kafka Producer 可以将消息在内存中累积到一定数量后作为一个 Batch 发送请求。Batch 的数量大小可以通过 Producer 的参数进行控制，可以从三个维度进行控制

- 累计的消息的数量（如500条）
- 累计的时间间隔（如100ms）
- 累计的数据大小（如64KB）

通过增加 Batch 的大小，可以减少网络请求和磁盘I/O的频次，具体参数配置需要在效率和时效性做一个权衡。

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)11、Kafka 消息的消费模式

> Kafka采用大部分消息系统遵循的传统模式：Producer将消息推送到Broker，Consumer从Broker获取消息。

如果采用 **Push** 模式，则Consumer难以处理不同速率的上游推送消息。

采用 Pull 模式的好处是Consumer可以自主决定是否批量的从Broker拉取数据。Pull模式有个缺点是，如果Broker没有可供消费的消息，将导致Consumer不断在循环中轮询，直到新消息到达。为了避免这点，Kafka有个参数可以让Consumer阻塞直到新消息到达。

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)12、Kafka 如何实现负载均衡与故障转移

> 负载均衡是指让系统的负载根据一定的规则均衡地分配在所有参与工作的服务器上，从而最大限度保证系统整体运行效率与稳定性

**负载均衡**

Kakfa 的负载均衡就是每个 **Broker** 都有均等的机会为 Kafka 的客户端（生产者与消费者）提供服务，可以负载分散到所有集群中的机器上。Kafka 通过智能化的分区领导者选举来实现负载均衡，提供智能化的 Leader 选举算法，可在集群的所有机器上均匀分散各个Partition的Leader，从而整体上实现负载均衡。

**故障转移**

Kafka 的故障转移是通过使用**会话机制**实现的，每台 Kafka 服务器启动后会以会话的形式把自己注册到 Zookeeper 服务器上。一旦服务器运转出现问题，就会导致与Zookeeper 的会话不能维持从而超时断连，此时Kafka集群会选举出另一台服务器来完全替代这台服务器继续提供服务。

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)13、Kafka 中 Zookeeper 的作用

Kafka 是一个使用 Zookeeper 构建的分布式系统。Kafka 的各 Broker 在启动时都要在Zookeeper上注册，由Zookeeper统一协调管理。如果任何节点失败，可通过Zookeeper从先前提交的偏移量中恢复，因为它会做周期性提交偏移量工作。同一个Topic的消息会被分成多个分区并将其分布在多个Broker上，这些分区信息及与Broker的对应关系也是Zookeeper在维护。

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)14、Kafka 提供了哪些系统工具

- **Kafka 迁移工具**：它有助于将代理从一个版本迁移到另一个版本
- **Mirror Maker**：Mirror Maker 工具有助于将一个 Kafka 集群的镜像提供给另一个
- **消费者检查**：对于指定的主题集和消费者组，可显示主题、分区、所有者

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)15、Kafka 中消费者与消费者组的关系与负载均衡实现

Consumer Group 是Kafka独有的可扩展且具有容错性的消费者机制。一个组内可以有多个Consumer，它们共享一个全局唯一的Group ID。组内的所有Consumer协调在一起来消费订阅主题（Topic）内的所有分区（Partition）。当然，每个Partition只能由同一个Consumer Group内的一个Consumer 来消费。消费组内的消费者可以使用多线程的方式实现，消费者的数量通常不超过分区的数量，且二者最好保持整数倍的关系，这样不会造成有空闲的消费者。

> Consumer 订阅的是Topic的Partition，而不是Message。所以在同一时间点上，订阅到同一个分区的Consumer必然属于不同的Consumer Group

Consumer Group与Consumer的关系是动态维护的，当一个Consumer进程挂掉或者是卡住时，该Consumer所订阅的Partition会被重新分配到改组内的其他Consumer上，当一个Consumer加入到一个Consumer Group中时，同样会从其他的Consumer中分配出一个或者多个Partition到这个新加入的Consumer。

**负载均衡**

当启动一个Consumer时，会指定它要加入的Group，使用的配置项是：Group.id

为了维持Consumer与Consumer Group之间的关系，Consumer 会周期性地发送 hearbeat 到 coodinator（协调者），如果有 hearbeat 超时或未收到 hearbeat，coordinator 会认为该Consumer已经退出，那么它所订阅的Partition会分配到同一组内的其他Consumer上，这个过程称为 rebalance（再平衡）

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)16、Kafka 中消息偏移的作用

生产过程中给分区中的消息提供一个顺序ID号，称之为偏移量，偏移量的主要作用为了唯一地区别分区中的每条消息。Kafka的存储文件都是按照offset.kafka来命名

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)17、 生产过程中何时会发生QueueFullExpection以及如何处理

**何时发生**

当生产者试图发送消息的速度快于Broker可以处理的速度时，通常会发生 **QueueFullException**

**如何解决**

首先先进行判断生产者是否能够降低生产速率，如果生产者不能阻止这种情况，为了处理增加的负载，用户需要添加足够的 Broker。或者选择生产阻塞，设置`Queue.enQueueTimeout.ms` 为 -1，通过这样处理，如果队列已满的情况，生产者将组织而不是删除消息。或者容忍这种异常，进行消息丢弃。

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)18、Consumer 如何消费指定分区消息

Cosumer 消费消息时，想Broker 发出 `fetch` 请求去消费特定分区的消息，Consumer 可以通过指定消息在日志中的偏移量 offset，就可以从这个位置开始消息消息，Consumer 拥有了 offset 的控制权，也可以向后回滚去重新消费之前的消息。

也可以使用 `seek(Long topicPartition)` 来指定消费的位置。

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)19、Replica、Leader 和 Follower 三者的概念

> Kafka 中的 Partition 是有序消息日志，为了实现高可用性，需要采用备份机制，将相同的数据复制到多个Broker上，而这些备份日志就是 Replica，目的是为了 **防止数据丢失**。
>
> 所有Partition 的副本默认情况下都会均匀地分布到所有 Broker 上,一旦领导者副本所在的Broker宕机，Kafka 会从追随者副本中选举出新的领导者继续提供服务。

**Leader：** 副本中的领导者。负责对外提供服务，与客户端进行交互。生产者总是向 Leader副本些消息，消费者总是从 Leader 读消息

**Follower：** 副本中的追随者。被动地追随 Leader，不能与外界进行交付。只是向Leader发送消息，请求Leader把最新生产的消息发给它，进而保持同步。

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)20、Replica 的重要性

Replica 可以确保发布的消息不会丢失，保证了Kafka的高可用性。并且可以在发生任何机器错误、程序错误或软件升级、扩容时都能生产使用。

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)21、Kafka 中的 Geo-Replication 是什么

Kafka官方提供了MirrorMaker组件，作为跨集群的流数据同步方案。借助MirrorMaker，消息可以跨多个数据中心或云区域进行复制。您可以在主动/被动场景中将其用于备份和恢复，或者在主动/主动方案中将数据放置得更靠近用户，或支持数据本地化要求。

它的实现原理比较简单，就是通过从源集群消费消息，然后将消息生产到目标集群，即普通的消息生产和消费。用户只要通过简单的Consumer配置和Producer配置，然后启动Mirror，就可以实现集群之间的准实时的数据同步.

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)22、Kafka 中 AR、ISR、OSR 三者的概念

- `AR`：分区中所有副本称为 AR
- `ISR`：所有与主副本保持一定程度同步的副本（包括主副本）称为 ISR
- `OSR`：与主副本滞后过多的副本组成 OSR

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)23、分区副本什么情况下会从 ISR 中剔出

Leader 会维护一个与自己基本保持同步的Replica列表，该列表称为ISR，每个Partition都会有一个ISR，而且是由Leader动态维护。所谓动态维护，就是说如果一个Follower比一个Leader落后太多，或者超过一定时间未发起数据复制请求，则Leader将其从ISR中移除。当ISR中所有Replica都向Leader发送ACK（Acknowledgement确认）时，Leader才commit。

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)24、分区副本中的 Leader 如果宕机但 ISR 却为空该如何处理

可以通过配置`unclean.leader.election` ：

- **true**：允许 OSR 成为 Leader，但是 OSR 的消息较为滞后，可能会出现消息不一致的问题
- **false**：会一直等待旧 leader 恢复正常，降低了可用性

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)25、如何判断一个 Broker 是否还有效

1. Broker必须可以维护和ZooKeeper的连接，Zookeeper通过心跳机制检查每个结点的连接。
2. 如果Broker是个Follower，它必须能及时同步Leader的写操作，延时不能太久。

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)26、Kafka 可接收的消息最大默认多少字节，如何修改

Kafka可以接收的最大消息默认为**1000000**字节，如果想调整它的大小，可在Broker中修改配置参数：`Message.max.bytes`的值

> 但要注意的是，修改这个值，还要同时注意其他对应的参数值是正确的，否则就可能引发一些系统异常。首先这个值要比消费端的fetch.Message.max.bytes（默认值1MB，表示消费者能读取的最大消息的字节数）参数值要小才是正确的设置，否则Broker就会因为消费端无法使用这个消息而挂起。

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)27、Kafka 的 ACK 机制

> Kafka的Producer有三种ack机制，参数值有0、1 和 -1

- **0：** 相当于异步操作，Producer 不需要Leader给予回复，发送完就认为成功，继续发送下一条（批）Message。**此机制具有最低延迟，但是持久性可靠性也最差，当服务器发生故障时，很可能发生数据丢失。**
- **1：** Kafka 默认的设置。表示 Producer 要 Leader 确认已成功接收数据才发送下一条（批）Message。不过 Leader 宕机，Follower 尚未复制的情况下，数据就会丢失。**此机制提供了较好的持久性和较低的延迟性。**
- **-1：** Leader 接收到消息之后，还必须要求ISR列表里跟Leader保持同步的那些Follower都确认消息已同步，Producer 才发送下一条（批）Message。**此机制持久性可靠性最好，但延时性最差。**

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)28、Kafka 的 consumer 如何消费数据

在Kafka中，Producers将消息推送给Broker端，在Consumer和Broker建立连接之后，会主动去 Pull（或者说Fetch）消息。这种模式有些优点，首先Consumer端可以根据自己的消费能力适时的去fetch消息并处理，且可以控制消息消费的进度（offset）；此外，消费者可以控制每次消费的数，实现批量消费。

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)29、Kafka 提供的API有哪些

Kafka 提供了两套 Consumer API，分为 **High-level API** 和 **Sample API**

**Sample API**

这是一个底层API，它维持了一个与单一 Broker 的连接，并且这个API 是完全无状态的，每次请求都需要指定 offset 值，因此这套 API 也是最灵活的。

**High-level API**

该API封装了对集群中一系列Broker的访问，可以透明地消费下一个Topic，它自己维护了已消费消息的状态，即每次消费的都会下一个消息。High-level API 还支持以组的形式消费Topic，如果 Consumers 有同一个组名，那么Kafka就相当于一个队列消息服务，而各个 Consumer 均衡地消费相应Partition中的数据。若Consumers有不同的组名，那么此时Kafka就相当于一个广播服务，会把Topic中的所有消息广播到每个Consumer

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)30、Kafka 的Topic中 Partition 数据是怎么存储到磁盘的

Topic 中的多个 Partition 以文件夹的形式保存到 Broker，每个分区序号从0递增，且消息有序。Partition 文件下有多个Segment（xxx.index，xxx.log），Segment文件里的大小和配置文件大小一致。默认为1GB，但可以根据实际需要修改。如果大小大于1GB时，会滚动一个新的Segment并且以上一个Segment最后一条消息的偏移量命名。

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)31、Kafka 创建Topic后如何将分区放置到不同的 Broker 中

Kafka创建Topic将分区放置到不同的Broker时遵循以下规则：

1. 副本因子不能大于Broker的个数。
2. 第一个分区（编号为0）的第一个副本放置位置是随机从Broker List中选择的。
3. 其他分区的第一个副本放置位置相对于第0个分区依次往后移。也就是如果有3个Broker，3个分区，假设第一个分区放在第二个Broker上，那么第二个分区将会放在第三个Broker上；第三个分区将会放在第一个Broker上，更多Broker与更多分区依此类推。剩余的副本相对于第一个副本放置位置其实是由`nextReplicaShift`决定的，而这个数也是随机产生的。

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)32、Kafka 的日志保留期与数据清理策略

**概念**

保留期内保留了Kafka群集中的所有已发布消息，超过保期的数据将被按清理策略进行清理。默认保留时间是7天，如果想修改时间，在`server.properties`里更改参数`log.retention.hours/minutes/ms` 的值便可。

**清理策略**

- **删除：** `log.cleanup.policy=delete` 表示启用删除策略，这也是默认策略。一开始只是标记为delete，文件无法被索引。只有过了`log.Segment.delete.delay.ms`这个参数设置的时间，才会真正被删除。
- **压缩：** `log.cleanup.policy=compact` 表示启用压缩策略，将数据压缩，只保留每个Key最后一个版本的数据。首先在Broker的配置中设置`log.cleaner.enable=true` 启用 cleaner，这个默认是关闭的。

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)33、Kafka 日志存储的Message是什么格式

Kafka一个Message由**固定长度的header**和**一个变长的消息体body**组成。将Message存储在日志时采用不同于Producer发送的消息格式。每个日志文件都是一个log entries（日志项）序列：

1. 每一个log entry包含一个四字节整型数（Message长度，值为1+4+N）。
2. 1个字节的magic，magic表示本次发布Kafka服务程序协议版本号。
3. 4个字节的CRC32值，CRC32用于校验Message。
4. 最终是N个字节的消息数据。每条消息都有一个当前Partition下唯一的64位offset。

> Kafka没有限定单个消息的大小，但一般推荐消息大小不要超过1MB，通常一般消息大小都在1～10KB之间。

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)34、Kafka 是否支持多租户隔离

> 多租户技术（multi-tenancy technology）是一种软件架构技术，它是实现如何在多用户的环境下共用相同的系统或程序组件，并且仍可确保各用户间数据的隔离性。

**解决方案**

通过配置哪个主题可以生产或消费数据来启用多租户，也有对配额的操作支持。管理员可以对请求定义和强制配额，以控制客户端使用的Broker资源。

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)35、Kafka 的日志分段策略与刷新策略

**日志分段（Segment）策略**

1. `log.roll.hours/ms`：日志滚动的周期时间，到达指定周期时间时，强制生成一个新的Segment，默认值168h（7day）。
2. `log.Segment.bytes`：每个Segment的最大容量。到达指定容量时，将强制生成一个新的Segment。默认值1GB（-1代表不限制）。
3. `log.retention.check.interval.ms`：日志片段文件检查的周期时间。默认值60000ms。

**日志刷新策略**

Kafka的日志实际上是开始是在缓存中的，然后根据实际参数配置的策略定期一批一批写入到日志文件中，以提高吞吐量。

1. `log.flush.interval.Messages`：消息达到多少条时将数据写入到日志文件。默认值为10000。
2. `log.flush.interval.ms`：当达到该时间时，强制执行一次flush。默认值为null。
3. `log.flush.scheduler.interval.ms`：周期性检查，是否需要将信息flush。默认为很大的值。

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)36、Kafka 中如何进行主从同步

> Kafka动态维护了一个同步状态的副本的集合（a set of In-SyncReplicas），简称ISR，在这个集合中的结点都是和Leader保持高度一致的，任何一条消息只有被这个集合中的每个结点读取并追加到日志中，才会向外部通知“这个消息已经被提交”。

kafka 通过配置 `producer.type` 来确定是异步还是同步，默认是同步

**同步复制**

Producer 会先通过Zookeeper识别到Leader，然后向 Leader 发送消息，Leader 收到消息后写入到本地 log文件。这个时候Follower 再向 Leader Pull 消息，Pull 回来的消息会写入的本地 log 中，写入完成后会向 Leader 发送 Ack 回执，等到 Leader 收到所有 Follower 的回执之后，才会向 Producer 回传 Ack。

**异步复制**

Kafka 中 Producer 异步发送消息是基于同步发送消息的接口来实现的，异步发送消息的实现很简单，客户端消息发送过来以后，会先放入一个 `BlackingQueue` 队列中然后就返回了。Producer 再开启一个线程 `ProducerSendTread` 不断从队列中取出消息，然后调用同步发送消息的接口将消息发送给 Broker。

> Producer的这种在内存缓存消息，当累计达到阀值时批量发送请求，小数据I/O太多，会拖慢整体的网络延迟，批量延迟发送事实上提升了网络效率。但是如果在达到阀值前，Producer不可用了，缓存的数据将会丢失。

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)37、Kafka 中什么情况下会出现消息丢失/不一致的问题

**消息发送时**

消息发送有两种方式：`同步 - sync` 和 `异步 - async`。默认是同步的方式，可以通过 producer.type 属性进行配置，kafka 也可以通过配置 acks 属性来确认消息的生产

- `0`：表示不进行消息接收是否成功的确认
- `1`：表示当 leader 接收成功时的确认
- `-1`：表示 leader 和 follower 都接收成功的确认

当 acks = 0 时，不和 Kafka 进行消息接收确认，可能会因为网络异常，缓冲区满的问题，导致消息丢失

当 acks = 1 时，只有 leader 同步成功而 follower 尚未完成同步，如果 leader 挂了，就会造成数据丢失

**消息消费时**

Kafka 有两个消息消费的 consumer 接口，分别是 `low-level` 和 `hign-level`

1. `low-level`：消费者自己维护 offset 等值，可以实现对 kafka 的完全控制
2. `high-level`：封装了对 partition 和 offset，使用简单

如果使用高级接口，可能存在一个消费者提取了一个消息后便提交了 offset，那么还没来得及消费就已经挂了，下次消费时的数据就是  offset + 1 的位置，那么原先 offset 的数据就丢失了。

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)38、Kafka 作为流处理平台的特点

> 流处理就是连续、实时、并发和以逐条记录的方式处理数据的意思。Kafka 是一个分布式流处理平台，它的高吞吐量、低延时、高可靠性、容错性、高可扩展性都使得Kafka非常适合作为流式平台。

1. 它是一个简单的、轻量级的Java类库，能够被集成到任何Java应用中
2. 除了Kafka之外没有任何其他的依赖，利用Kafka的分区模型支持水平扩容和保证顺序性
3. 支持本地状态容错，可以执行非常快速有效的有状态操作
4. 支持 eexactly-once 语义
5. 支持一次处理一条记录，实现 ms 级的延迟

#### ![图片](https://mmbiz.qpic.cn/mmbiz_png/P7WuIzkp9iaUNvd2YY7uX8ticY9iat1XxCibIiaNA70mTTHPUoHb1VbEZT7y3T9bILPCBMFI85MxFmbLrn3iajghM6sw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)39、消费者故障，出现活锁问题如何解决

**活锁的概念**：消费者持续的维持心跳，但没有进行消息处理。

为了预防消费者在这种情况一直持有分区，通常会利用 `max.poll.interval.ms`活跃检测机制，如果调用 Poll 的频率大于最大间隔，那么消费者将会主动离开消费组，以便其他消费者接管该分区

### 40、Kafa 中如何保证顺序消费

> Kafka 的消费单元是 Partition，同一个 Partition 使用 offset 作为唯一标识保证顺序性，但这只是保证了在 Partition 内部的顺序性而不是 Topic 中的顺序，因此我们需要将所有消息发往统一 Partition 才能保证消息顺序消费，那么可以在发送的时候指定 MessageKey，同一个 key 的消息会发到同一个 Partition 中。



























