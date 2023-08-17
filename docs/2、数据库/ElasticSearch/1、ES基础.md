

# 初识ES

## ELK简介

> ES是elastic stack的核心，负责**存储、搜索、分析数据**。ES结合kibana、Logstash、Beats，也就是elastic stack（ELK）。**被广泛应用在日志数据分析、实时监控等领域**。Lucene是一个Java语言的搜索引擎类库，是Apache公司的顶级项目，由DougCutting于1999年研发，官网地址：https://lucene.apache.org/ 
>

> 小伙伴们经常使用 google 或者百度进行搜索内容，在输入框中输入**关键字**，这个时候，网站会将包含 **关键字** 的所有网页返回，大家有没有想过，**为什么输入关键字就可以查到结果呢？**

> 同时网站上返回的页面内容大多都是一些 **非结构化** 的文本数据，对于大量的文本数据，肯定是不会存储到**数据库**中的，原因如下：
>

> （1）非结构化文本数据，关系型数据库搜索不能很好支持全文索引扫描整张表。
>
> （2）查询效率低下，即使对 SQL 进行大量优化，其效果也收效甚微。
>
> （3）对于 insert 和 update 操作都会重新构建索引，维护非常麻烦。

针对上述问题，在生产环境中，面对海量的数据，若想要**毫秒级**查询到结构化数据或非结构化数据，我们就需要专业，健壮，强大的全文搜索引擎。ES的作用elasticsearch是一款非常强大的开源搜索引擎，具备非常多强大功能，可以帮助我们从海量数据中快速找到需要的内容

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304172148405.png" alt="image-20230417214845099" style="zoom:80%;" />

> 全文搜索引擎的 **工作原理**：计算机索引程序通过 **扫描** 文章中的每一个**词**，对每一个词**建立一个索引**，指明该词在文章中出现的次数和位置，当用户查询时，检索程序就**根据事先建立的索引**进行查找，并将**查找**的**结果**反馈给用户。这个过程类似于通过字典中的检索字表查字的过程

- 分布式的搜索引擎和数据分析引擎

> 搜索：互联网搜索、电商网站站内搜索、OA系统查询
>
> 数据分析：电商网站查询近一周哪些品类的图书销售前十；新闻网站，最近3天阅读量最高的十个关键词，舆情分析。

- 全文检索，结构化检索，数据分析

> 全文检索：搜索商品名称包含java的图书select * from books where book_name like "%java%"。
>
> 结构化检索：搜索商品分类为spring的图书都有哪些，select * from books where category_id='spring'
>
> 数据分析：分析每一个分类下有多少种图书，select category_id,count(*) from books group by category_id

- 对海量数据进行近实时的处理

> 分布式：ES自动可以将海量数据分散到多台服务器上去存储和检索,经行并行查询，提高搜索效率。相对的，Lucene是单机应用。
>
> 近实时：数据库上亿条数据查询，搜索一次耗时几个小时，是批处理（batch-processing）。而es只需秒级即可查询海量数据，所以叫近实时。秒级。

- 在GitHub搜索代码

  ![image-20210720193623245](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720193623245.png)

- 在电商网站搜索商品

  ![image-20210720193633483](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720193633483.png)

- 在百度搜索答案

  ![image-20210720193641907](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720193641907.png)

- 在打车软件搜索附近的车

  ![image-20210720193648044](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720193648044.png)

## ELK技术栈

elasticsearch结合kibana、Logstash、Beats，也就是elastic stack（ELK）。被广泛应用在日志数据分析、实时监控等领域：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720194008781.png" alt="image-20210720194008781" style="zoom:67%;" />

> 而elasticsearch是elastic stack的核心，负责存储、搜索、分析数据。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720194230265.png" alt="image-20210720194230265" style="zoom:67%;" />

### Elasticsearch

> Elasticsearch 是使用java开发，基于Lucene、分布式、通过Restful方式进行交互的近实时搜索平台框架。它的特点有：分布式，零配置，自动发现，索引自动分片，索引副本机制，restful风格接口，多数据源，自动搜索负载等。
>

### Logstash

> Logstash 基于java开发，是一个数据抽取转化工具。一般工作方式为c/s架构，client端安装在需要收集信息的主机上，server端负责将收到的各节点日志进行过滤、修改等操作在一并发往elasticsearch或其他组件上去。 
>

### Kibana

> Kibana 基于nodejs，也是一个开源和免费的可视化工具。Kibana可以为 Logstash 和 ElasticSearch 提供的日志分析友好的 Web 界面，可以汇总、分析和搜索重要数据日志。
>

### Beats

> Beats 平台集合了多种单一用途数据采集器。它们从成百上千或成千上万台机器和系统向 Logstash 或 Elasticsearch 发送数据
>

Beats由如下组成:

> Packetbeat：`轻量型网络数据采集器`，用于深挖网线上传输的数据，了解应用程序动态。Packetbeat 是一款轻量型网络数据包分析器，能够将数据发送至 Logstash 或 Elasticsearch。其支 持ICMP (v4 and v6)、DNS、HTTP、Mysql、PostgreSQL、Redis、MongoDB、Memcache等协议。
>

> Filebeat：`轻量型日志采集器`。当您要面对成百上千、甚至成千上万的服务器、虚拟机和容器生成的日志时，请告别 SSH 吧。Filebeat 将为您提供一种轻量型方法，用于转发和汇总日志与文件，让简单的事情不再繁杂。
>

> Metricbeat ：`轻量型指标采集器`。Metricbeat 能够以一种轻量型的方式，输送各种系统和服务统计数据，从 CPU 到内存，从 Redis 到 Nginx，不一而足。可定期获取外部系统的监控指标信息，其可以监控、收集 Apache http、HAProxy、MongoDB、MySQL、Nginx、PostgreSQL、Redis、System、Zookeeper等服务。
>

> Winlogbeat：`轻量型 Windows 事件日志采集器`。用于密切监控基于 Windows 的基础设施上发生的事件。Winlogbeat 能够以一种轻量型的方式，将 Windows 事件日志实时地流式传输至 Elasticsearch 和 Logstash。
>

> Auditbeat：`轻量型审计日志采集器`。收集您 Linux 审计框架的数据，监控文件完整性。Auditbeat 实时采集这些事件，然后发送到 Elastic Stack 其他部分做进一步分析。
>

> Heartbeat：`面向运行状态监测的轻量型采集器`。通过主动探测来监测服务的可用性。通过给定 URL 列表，Heartbeat 仅仅询问：网站运行正常吗？Heartbeat 会将此信息和响应时间发送至 Elastic 的其他部分，以进行进一步分析。
>

> Functionbeat：`面向云端数据的无服务器采集器`。在作为一项功能部署在云服务提供商的功能即服务 (FaaS) 平台上后，Functionbeat 即能收集、传送并监测来自您的云服务的相关数据。
>

### Elastic cloud

基于 Elasticsearch 的软件即服务(SaaS)解决方案。通过 Elastic 的官方合作伙伴使用托管的 Elasticsearch 服务。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206271713400.png" alt="image-20220627171329317" style="zoom:67%;" />

## Elasticsearch和Lucene

> Elasticsearch底层是基于**lucene**来实现的。**Lucene**是一个Java语言的搜索引擎类库，是Apache公司的顶级项目，由DougCutting于1999年研发。官网地址：https://lucene.apache.org/
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720194547780.png" alt="image-20210720194547780" style="zoom:67%;" />



**elasticsearch**的发展历史：

- 2004年Shay Banon基于Lucene开发了Compass
- 2010年Shay Banon 重写了Compass，取名为Elasticsearch。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720195001221.png" alt="image-20210720195001221" style="zoom:67%;" />

## 搜索技术排名

目前比较知名的搜索引擎技术排名：

![image-20210720195142535](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720195142535.png)

在早期，Apache Solr是最主要的搜索引擎技术，但随着发展elasticsearch已经渐渐超越了Solr，独占鳌头：

## ES目录结构

> bin：`脚本目录，包括：启动、停止等可执行脚本（重要）`
>
> config：`配置文件目录（重要）`
>
> data：`索引目录，存放索引文件的地方`
>
> logs：`日志目录`
>
> modules：`模块目录，包括了es的功能模块`
>
> plugins :`插件目录，es支持插件机制`

## ES面试题

### es 写数据过程

- 客户端选择一个 node 发送请求过去，这个 node 就是 `coordinating node` （协调节点）。
- `coordinating node` 对 document 进行**路由**，将请求转发给对应的 node（有 primary shard）。
- 实际的 node 上的 `primary shard` 处理请求，然后将数据同步到 `replica node` 。
- `coordinating node` 如果发现 `primary node` 和所有 `replica node` 都搞定之后，就返回响应结果给客户端。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207301040117.png" alt="image-20220730104012026" style="zoom:67%;" />

### es 读数据过程

可以通过 `doc id` 来查询，会根据 `doc id` 进行 hash，判断出来当时把 `doc id` 分配到了哪个 shard 上面去，从那个 shard 去查询。

- 客户端发送请求到**任意**一个 node，成为 `coordinate node` 。
- `coordinate node` 对 `doc id` 进行哈希路由，将请求转发到对应的 node，此时会使用 `round-robin` **随机轮询算法**，在 `primary shard` 以及其所有 replica 中随机选择一个，让读请求负载均衡。
- 接收请求的 node 返回 document 给 `coordinate node` 。
- `coordinate node` 返回 document 给客户端。

### es 搜索数据过程

es 最强大的是做全文检索，就是比如你有三条数据：

```apl
java真好玩儿啊
java好难学啊
j2ee特别牛
```

你根据 `java` 关键词来搜索，将包含 `java` 的 `document` 给搜索出来。es 就会给你返回：java 真好玩儿啊，java 好难学啊。

- 客户端发送请求到一个 `coordinate node` 。
- 协调节点将搜索请求转发到**所有**的 shard 对应的 `primary shard` 或 `replica shard` ，都可以。
- query phase：每个 shard 将自己的搜索结果（其实就是一些 `doc id` ）返回给协调节点，由协调节点进行数据的合并、排序、分页等操作，产出最终结果。
- fetch phase：接着由协调节点根据 `doc id` 去各个节点上**拉取实际**的 `document` 数据，最终返回给客户端。

> 写请求是写入 primary shard，然后同步给所有的 replica shard；读请求可以从 primary shard 或 replica shard 读取，采用的是随机轮询算法。

### 写数据底层原理

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207301041932.png" alt="image-20220730104146828" style="zoom: 50%;" />

### es-write-detail

先写入内存 buffer，在 buffer 里的时候数据是搜索不到的；同时将数据写入 translog 日志文件。

如果 buffer 快满了，或者到一定时间，就会将内存 buffer 数据 `refresh` 到一个新的 `segment file` 中，但是此时数据不是直接进入 `segment file` 磁盘文件，而是先进入 `os cache` 。这个过程就是 `refresh` 。

每隔 1 秒钟，es 将 buffer 中的数据写入一个**新的** `segment file` ，每秒钟会产生一个**新的磁盘文件** `segment file` ，这个 `segment file` 中就存储最近 1 秒内 buffer 中写入的数据。

但是如果 buffer 里面此时没有数据，那当然不会执行 refresh 操作，如果 buffer 里面有数据，默认 1 秒钟执行一次 refresh 操作，刷入一个新的 segment file 中。

操作系统里面，磁盘文件其实都有一个东西，叫做 `os cache` ，即操作系统缓存，就是说数据写入磁盘文件之前，会先进入 `os cache` ，先进入操作系统级别的一个内存缓存中去。只要 `buffer` 中的数据被 refresh 操作刷入 `os cache` 中，这个数据就可以被搜索到了。

为什么叫 es 是**准实时**的？`NRT` ，全称 `near real-time` 。默认是每隔 1 秒 refresh 一次的，所以 es 是准实时的，因为写入的数据 1 秒之后才能被看到。可以通过 es 的 `restful api` 或者 `java api` ，**手动**执行一次 refresh 操作，就是手动将 buffer 中的数据刷入 `os cache` 中，让数据立马就可以被搜索到。只要数据被输入 `os cache` 中，buffer 就会被清空了，因为不需要保留 buffer 了，数据在 translog 里面已经持久化到磁盘去一份了。

重复上面的步骤，新的数据不断进入 buffer 和 translog，不断将 `buffer` 数据写入一个又一个新的 `segment file` 中去，每次 `refresh` 完 buffer 清空，translog 保留。随着这个过程推进，translog 会变得越来越大。当 translog 达到一定长度的时候，就会触发 `commit` 操作。

commit 操作发生第一步，就是将 buffer 中现有数据 `refresh` 到 `os cache` 中去，清空 buffer。然后，将一个 `commit point` 写入磁盘文件，里面标识着这个 `commit point` 对应的所有 `segment file` ，同时强行将 `os cache` 中目前所有的数据都 `fsync` 到磁盘文件中去。最后**清空** 现有 translog 日志文件，重启一个 translog，此时 commit 操作完成。

这个 commit 操作叫做 `flush` 。默认 30 分钟自动执行一次 `flush` ，但如果 translog 过大，也会触发 `flush` 。flush 操作就对应着 commit 的全过程，我们可以通过 es api，手动执行 flush 操作，手动将 os cache 中的数据 fsync 强刷到磁盘上去。

translog 日志文件的作用是什么？你执行 commit 操作之前，数据要么是停留在 buffer 中，要么是停留在 os cache 中，无论是 buffer 还是 os cache 都是内存，一旦这台机器死了，内存中的数据就全丢了。所以需要将数据对应的操作写入一个专门的日志文件 `translog` 中，一旦此时机器宕机，再次重启的时候，es 会自动读取 translog 日志文件中的数据，恢复到内存 buffer 和 os cache 中去。

translog 其实也是先写入 os cache 的，默认每隔 5 秒刷一次到磁盘中去，所以默认情况下，可能有 5 秒的数据会仅仅停留在 buffer 或者 translog 文件的 os cache 中，如果此时机器挂了，会**丢失** 5 秒钟的数据。但是这样性能比较好，最多丢 5 秒的数据。也可以将 translog 设置成每次写操作必须是直接 `fsync` 到磁盘，但是性能会差很多。

实际上你在这里，如果面试官没有问你 es 丢数据的问题，你可以在这里给面试官炫一把，你说，其实 es 第一是准实时的，数据写入 1 秒后可以搜索到；可能会丢失数据的。有 5 秒的数据，停留在 buffer、translog os cache、segment file os cache 中，而不在磁盘上，此时如果宕机，会导致 5 秒的**数据丢失**。

**总结一下**，数据先写入内存 buffer，然后每隔 1s，将数据 refresh 到 os cache，到了 os cache 数据就能被搜索到（所以我们才说 es 从写入到能被搜索到，中间有 1s 的延迟）。每隔 5s，将数据写入 translog 文件（这样如果机器宕机，内存数据全没，最多会有 5s 的数据丢失），translog 大到一定程度，或者默认每隔 30mins，会触发 commit 操作，将缓冲区的数据都 flush 到 segment file 磁盘文件中。

> 数据写入 segment file 之后，同时就建立好了倒排索引。

### 删除/更新数据底层原理

如果是删除操作，commit 的时候会生成一个 `.del` 文件，里面将某个 doc 标识为 `deleted` 状态，那么搜索的时候根据 `.del` 文件就知道这个 doc 是否被删除了。

如果是更新操作，就是将原来的 doc 标识为 `deleted` 状态，然后新写入一条数据。

buffer 每 refresh 一次，就会产生一个 `segment file` ，所以默认情况下是 1 秒钟一个 `segment file` ，这样下来 `segment file` 会越来越多，此时会定期执行 merge。每次 merge 的时候，会将多个 `segment file` 合并成一个，同时这里会将标识为 `deleted` 的 doc 给**物理删除掉**，然后将新的 `segment file` 写入磁盘，这里会写一个 `commit point` ，标识所有新的 `segment file` ，然后打开 `segment file` 供搜索使用，同时删除旧的 `segment file` 。

### 底层 lucene

简单来说，lucene 就是一个 jar 包，里面包含了封装好的各种建立倒排索引的算法代码。我们用 Java 开发的时候，引入 lucene jar，然后基于 lucene 的 api 去开发就可以了。

通过 lucene，我们可以将已有的数据建立索引，lucene 会在本地磁盘上面，给我们组织索引的数据结构。



# 核心概念

elasticsearch中有很多独有的概念，与mysql中略有差别，但也有相似之处。

## 倒排索引

> 倒排索引是基于MySQL这样的正向索引而言的。那么为什么一个叫做正向索引，一个叫做倒排索引
>

> **正向索引**是最传统的，根据id索引的方式。但根据词条查询时，必须先逐条获取每个文档，然后判断文档中是否包含所需要的词条，是**根据文档找词条的过程**。

> **倒排索引**则相反，是先找到用户要搜索的词条，根据词条得到保护词条的文档的id，然后根据id获取文档。是**根据词条找文档的过程**。

> 是不是恰好反过来了？那么两者方式的优缺点是什么呢？
>

### 正向索引

> 基于文档id创建索引。查询词条时必须先找到文档，而后判断是否包含词条

> 例如给下表（tb_goods）中的id创建索引：
>

![image-20210720195531539](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720195531539.png)

> 如果是根据id查询，那么直接走索引，查询速度非常快。
>

> 但如果是基于title做模糊查询，只能是**逐行扫描数据**，流程如下：

> 1）用户搜索数据，条件是title符合`"%手机%"`
>
> 2）**逐行获取数据**，比如id为1的数据
>
> 3）**判断数据中的title是否符合用户搜索条件**
>
> 4）**如果符合则放入结果集，不符合则丢弃。回到步骤1**

> `逐行扫描，也就是全表扫描，随着数据量增加，其查询效率也会越来越低，当数据达到数百万时，就是灾难`



### 倒排索引

> `对文档内容分词，对词条创建索引，并记录词条所在文档的信息`
>
> `查询时先根据词条查询到文档id，而后获取到文档`

**倒排索引**是对正向索引的一种特殊处理，流程如下：

> - `将每一个文档的数据利用算法分词，得到一个个词条`
> - `创建表，每行数据包括词条、词条所在文档id、位置等信息`
> - `因为词条唯一性，可以给词条创建索引，例如hash表结构索引`

![image-20210720200457207](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720200457207.png)

#### 搜索流程

倒排索引的**搜索流程**如下（以搜索"华为手机"为例）：

> 1）用户输入条件`"华为手机"`进行搜索。
>
> 2）对用户输入内容**分词**，得到词条：`华为`、`手机`。
>
> 3）拿着词条在倒排索引中查找，可以得到包含词条的文档id：1、2、3。
>
> 4）拿着文档id到正向索引中查找具体文档。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720201115192.png" alt="image-20210720201115192" style="zoom:67%;" />

> **虽然要先查询倒排索引，再查询倒排索引，但是无论是词条、还是文档id都建立了索引，查询速度非常快！无需全表扫描**。

#### 倒排列表

> 倒排列表（Posting List）：**记录词条所在的文档id、词条出现频率 、词条在文档中的位置等信息**

> - **文档id：用于快速获取文档**
> - **词条频率（TF）：文档在词条出现的次数，用于评分**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209021241461.png" alt="image-20220902124105282" style="zoom:80%;" />

> 另外，实用的倒排索引还可以记录更多的信息，比如文档频率信息，表示在文档集合中有多少个文档包含某个单词，有了倒排索引，搜索引擎可以很方便地响应用户的查询。比如用户输入查询 `Facebook` ，搜索系统查找倒排索引，从中读出包含这个单词的文档，这些文档就是提供给用户的搜索结果。
>

要注意倒排索引的两个重要细节：

> - 倒排索引中的所有词项对应一个或多个文档；
> - 倒排索引中的词项根据字典顺序升序排列

## 文档和字段

> Elasticsearch是面向**文档（Document）**存储的，可以是数据库中的一条商品数据，一个订单信息。文档数据会被序列化为json格式后存储在elasticsearch中：文档（`Document`）：用来搜索的数据，其中的每一条数据就是一个文档。例如一个网页、一个商品信息

> 词条（`Term`）：对文档数据或用户搜索数据，利用某种算法分词，得到的具备含义的词语就是词条。例如：我是中国人，就可以分为：我、是、中国人、中国、国人这样的几个词条

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720202707797.png" alt="image-20210720202707797" style="zoom:80%;" />

> 而Json文档中往往包含很多的**字段（Field）**，类似于数据库中的列。



## 索引和映射

> **索引（Index）**，就是相同类型的文档的集合。
>
> **映射（mapping）**：索引中文档的字段约束信息，类似表的结构约束

> - `所有用户文档，就可以组织在一起，称为用户的索引；`
> - `所有商品的文档，可以组织在一起，称为商品的索引；`
> - `所有订单的文档，可以组织在一起，称为订单的索引；`

![image-20210720203022172](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720203022172.png)

> 因此，我们可以把索引当做是数据库中的表。数据库的表会有约束信息，用来定义表的结构、字段的名称、类型等信息。因此，索引库中就有**映射（mapping）**，是索引中文档的字段约束信息，类似表的结构约束。
>

## MySQL与 ES⭐

### 区别和概念⭐

我们统一的把mysql与elasticsearch的概念做一下对比：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206260934349.png" alt="image-20220626093420249" style="zoom:80%;" />

是不是说，我们学习了elasticsearch就不再需要mysql了呢？

### 架构⭐

并不是如此，两者各自有自己的擅长支出：

> - MySQL：擅长事务类型操作，可以确保数据的安全和一致性
>
> - Elasticsearch：擅长海量数据的搜索、分析、计算

因此在企业中，往往是两者结合使用：

> - 对安全性要求较高的写操作，使用mysql实现
> - 对查询性能要求较高的搜索需求，使用elasticsearch实现
> - 两者再基于某种方式，实现数据的同步，保证一致性

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720203534945.png" alt="image-20210720203534945" style="zoom: 80%;" />

## 核心概念(重要)

### 1、NRT：近实时

> Near Realtime两方面：
>
> - **写入数据时，过1秒才会被搜索到**，因为内部在分词、录入索引。
>
> - es搜索时：搜索和分析数据需要秒级出结果。


### 2、Cluster：集群

> 包含一个或多个启动着es实例的机器群。通常一台机器起一个es实例。同一网络下，集名一样的多个es实例自动组成集群，自动均衡分片等行为。默认集群名为“elasticsearch”。

### 3、Node：节点

> 每个es实例称为一个节点。节点名自动分配，也可以手动配置。

### 4、Index：索引

> 包含一堆有相似结构的文档数据。

索引创建规则：

> - 仅限小写字母
>
> - 不能包含\、/、 *、?、"、<、>、|、#以及空格符等特殊符号
>
> - 从7.0版本开始不再包含冒号
>
> - 不能以-、_或+开头
>
> - 不能超过255个字节（注意它是字节，因此多字节字符将计入255个限制）

### 5、Document：文档

> es中的最小数据单元。一个document就像数据库中的一条记录。通常以json格式显示。
>
> 多个document存储于一个索引（Index）中。

```json
{
  "book_id": "1",
  "book_name": "java编程思想",
  "book_desc": "从Java的基础语法到最高级特性（深入的[面向对象]",
  "category_id": "2",
  "category_name": "java"
}
```

### 6、Field:字段

> 就像数据库中的列（Columns），定义每个document应该有的字段。

### 7、Type：类型

> 每个索引里都可以有一个或多个type，type是index中的一个逻辑数据分类，一个type下的document，都有相同的field。

> **注意**：6.0之前的版本有type（类型）概念，type相当于关系数据库的表，ES官方将在ES9.0版本中彻底删除type。本教程typy都为_doc。

### 8、shard：分片

> index数据过大时，将index里面的数据，分为多个shard，分布式的存储在各个服务器上面。可以支持海量数据和高并发，提升性能和吞吐量，充分利用多台机器的cpu。

### 9、replica：副本

> 在分布式环境下，任何一台机器都会随时宕机，如果宕机，index的一个分片没有，导致此index不能搜索。所以，为了保证数据的安全，我们会将每个index的分片经行备份，存储在另外的机器上。保证少数机器宕机es集群仍可以搜索。

> 能正常提供查询和插入的分片我们叫做主分片（primary shard），其余的我们就管他们叫做备份的分片（replica shard）。

> es6默认新建索引时，5分片，2副本，也就是一主一备，共10个分片。所以，es集群最小规模为两台。

## 搜索流程

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304172149837.png" alt="image-20230417214924628" style="zoom:67%;" />

# 安装、启动、配置

## 安装ES

1、安装JDK，至少1.8.0_73以上版本，验证：java -version。

2、下载和解压缩Elasticsearch安装包，https://www.elastic.co/cn/downloads/elasticsearch

[解决问题](https://www.freesion.com/article/7057432151/)

```apl
docker pull elasticsearch:7.17.1
```

```apl
docker network create es-net1
```

```apl
docker run -d \
	--name es \
    -e "ES_JAVA_OPTS=-Xms2048m -Xmx2048m" \
    -e "discovery.type=single-node" \
    --privileged=true \
    -v /root/share/elasticsearch/es-data:/usr/share/elasticsearch/data \
    -v /root/share/elasticsearch/es-plugins:/usr/share/elasticsearch/plugins \
    --network es-net1 \
    -p 9200:9200 \
    -p 9300:9300 \
elasticsearch:7.17.1
```

```apl
# 重要：必须给绑定的宿主机目录所有权限，不然启动失败
chmod 777 /root/share/elasticsearch/es-data
chmod 777 /root/share/elasticsearch/es-plugins
```

命令解释：

- `-e "cluster.name=es-docker-cluster"`：设置集群名称
- `-e "http.host=0.0.0.0"`：监听的地址，可以外网访问
- `-e "ES_JAVA_OPTS=-Xms512m -Xmx512m"`：内存大小
- `-e "discovery.type=single-node"`：非集群模式
- `-v es-data:/usr/share/elasticsearch/data`：挂载逻辑卷，绑定es的数据目录
- `-v es-logs:/usr/share/elasticsearch/logs`：挂载逻辑卷，绑定es的日志目录
- `-v es-plugins:/usr/share/elasticsearch/plugins`：挂载逻辑卷，绑定es的插件目录
- `--privileged`：授予逻辑卷访问权
- `--network es-net` ：加入一个名为es-net的网络中
- `-p 9200:9200`：端口映射配置，供用户访问的端口
- `-p 9300:9300`：ES各个节点至今互联的端口，集群使用

进行访问：http://192.168.220.130:9200/ ，出现下图其实就成功了

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220307180616202.png" alt="image-20220307180616202" style="zoom:67%;" />



## 安装kibana

kibana可以给我们提供一个elasticsearch的可视化界面，便于我们学习。

```apl
docker pull kibana:7.17.1
```

运行docker命令，部署kibana

```sh
docker run -d \
--name kibana \
-e ELASTICSEARCH_HOSTS=http://es:9200 \
-e "I18N_LOCALE=zh-CN" \
--network=es-net1 \
-p 5601:5601  \
kibana:7.17.1
```

- `--network es-net` ：加入一个名为es-net的网络中，必须与elasticsearch在同一个网络中
- ``-e "I18N_LOCALE=zh-CN"-e`： 传递环境变量，**设置成中文界面**
- `-e ELASTICSEARCH_HOSTS=http://es:9200"`：设置elasticsearch的地址，因为kibana已经与elasticsearch在一个网络，因此可以用容器名直接访问elasticsearch
- `-p 5601:5601`：端口映射配置
- `kibana:7.17.1`：版本一定要和ES相同

kibana启动一般比较慢，需要多等待一会，可以通过命令：

```sh
docker logs -f kibana
```

查看运行日志，当查看到下面的日志，说明成功：

![image-20210109105135812](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210109105135812.png)

此时，在浏览器输入地址访问：http://192.168.22.130:5601，即可看到结果

## 安装IK分词器

### 离线安装ik插件(推荐)

> 方式一：下载安装包安装
>

> 官网：https://github.com/medcl/elasticsearch-analysis-ik
>
> 下载地址：https://github.com/medcl/elasticsearch-analysis-ik/releases

> 根据es版本下载相应版本包xxxx.zip，解压并上传到/root/share/elasticsearch/es-plugins中，重启es

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306080929933.png" alt="image-20230608092944823" style="zoom:80%;" />

> 重启容器，查看日志

```shell
# 4、重启容器
docker restart es
```

```sh
# 查看es日志
docker logs -f es
```

> 查看插件是否安装成功：http://192.168.88.101:9200/_cat/plugins?format=json

### 在线安装ik插件（能用）

```shell
# 进入容器内部
docker exec -it es /bin/bash

# 在线下载并安装
./bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.17.1/elasticsearch-analysis-ik-7.17.1.zip

#退出
exit
#重启容器
docker restart es

# 安装目录,可以对插件进行相应配置
/usr/share/elasticsearch/plugins/analysis-ik
# 配置目录
/usr/share/elasticsearch/config/analysis-ik
```

### 测试分词器

> 测试，IK分词器包含两种模式：

> * `ik_smart`：最少切分，粗粒度
>
> * `ik_max_word`：最细切分，细粒度

```json
GET /_analyze
{
  "analyzer": "ik_max_word",
  "text": "黑马程序员学习"
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220307191758364.png" alt="image-20220307191758364" style="zoom: 50%;" />

### 扩展词词典

> 随着互联网的发展，“造词运动”也越发的频繁。出现了很多新的词语，在原有的词汇列表中并不存在。比如：“奥力给”，“传智播客” 等。
>

> 所以我们的词汇也需要不断的更新，IK分词器提供了扩展词汇的功能。
>

> 1）打开IK分词器config目录：

![image-20210506112225508](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306080938868.png)

> 2）在IKAnalyzer.cfg.xml配置文件内容添加：

```xml
﻿<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
    <comment>IK Analyzer 扩展配置</comment>
    <!--用户可以在这里配置自己的扩展字典 -->
    <entry key="ext_dict">ext.dic</entry>
     <!--用户可以在这里配置自己的扩展停止词字典-->
    <entry key="ext_stopwords">stopword.dic</entry>
    <!--用户可以在这里配置远程扩展字典 -->
    <!-- <entry key="remote_ext_dict">words_location</entry> -->
    <!--用户可以在这里配置远程扩展停止词字典-->
    <!-- <entry key="remote_ext_stopwords">words_location</entry> -->
</properties>
```

> 3）新建一个 ext.dic，可以参考config目录下复制一个配置文件进行修改

```properties
传智播客
奥力给
```

> 4）重启elasticsearch 

```sh
docker restart es
# 查看 日志
docker logs -f es
```

![image-20201115230900504](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306080938872.png)

日志中已经成功加载ext.dic配置文件

5）测试效果：

```json
GET /_analyze
{
  "analyzer": "ik_max_word",
  "text": "传智播客Java就业超过90%,奥力给！"
}
```

> 注意当前文件的编码必须是 UTF-8 格式，严禁使用Windows记事本编辑

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306080941765.png" alt="image-20230608094145656" style="zoom:80%;" />

### 停用词词典

> 在互联网项目中，在网络间传输的速度很快，所以很多语言是不允许在网络上传递的，如：关于宗教、政治等敏感词语，那么我们在搜索时也应该忽略当前词汇。
>

> IK分词器也提供了强大的停用词功能，让我们在索引时就直接忽略当前的停用词汇表中的内容。
>

> 1）IKAnalyzer.cfg.xml配置文件内容添加：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
        <comment>IK Analyzer 扩展配置</comment>
        <!--用户可以在这里配置自己的扩展字典-->
        <entry key="ext_dict">ext.dic</entry>
         <!--用户可以在这里配置自己的扩展停止词字典  *** 添加停用词词典-->
        <entry key="ext_stopwords">stopword.dic</entry>
</properties>
```

> 3）在 stopword.dic 添加停用词
>
> 注意事项：习大大会分词，此时就不能停用了，因此要先在ext.dic中配置习大大，再到stopword.dic中

```properties
# ext.dic和stopword.dic都要配置
习大大
```

> 4）重启elasticsearch 

```sh
# 重启服务
docker restart es
# 查看 日志
docker logs -f elasticsearch
```

> 日志中已经成功加载stopword.dic配置文件,测试效果：
>

```json
GET /_analyze
{
  "analyzer": "ik_max_word",
  "text": "传智播客Java就业率超过95%,习大大都点赞,奥力给！"
}
```

> 注意当前文件的编码必须是 UTF-8 格式，严禁使用Windows记事本编辑



## 安装拼音分词器

> 要实现根据字母做补全，就必须对文档按照拼音分词。在GitHub上恰好有elasticsearch的拼音分词插件。地址：https://github.com/medcl/elasticsearch-analysis-pinyin/releases?page=2注意版本一定要和es版本相同

### 离线安装

安装方式与IK分词器一样，分三步：

​	①下载并解压zip

​	②上传复制到elasticsearch的plugin目录(可以修改目录名称的)，/root/share/elasticsearch/es-plugins

​	③重启elasticsearch

### 在线安装

```apl
# 进入容器内部
docker exec -it es /bin/bash

# 在线下载并安装，不成功就多试试几次，
./bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-pinyin/releases/download/v7.17.1/elasticsearch-analysis-pinyin-7.17.1.zip

#退出
exit
#重启容器
docker restart es
```

> 查看插件是否安装成功：http://192.168.88.101:9200/_cat/plugins?format=json

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306091702468.png" alt="image-20230609170212380" style="zoom:80%;" />

### 测试拼音分词

```json
POST /_analyze
{
  "text":["你好"],
  "analyzer": "pinyin"
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220306111236962.png" alt="image-20220306111236962" style="zoom:67%;" />

## 自定义分词器

> 拼音分词器适合在创建倒排索引的时候使用，但不能在搜索的时候使用。
>

创建倒排索引时：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209041646422.png" alt="image-20220904164607294" style="zoom:80%;" />

> **默认的拼音分词器会将每个汉字单独分为拼音**，而我们**希望的是每个词条形成一组拼音**，需要对拼音分词器做个性化定制，形成自定义分词器。拼音分词器使用占少数，大部分依旧使用ik分词器

```json
GET /_analyze
{
  "text": ["如家酒店还不错"],
  "analyzer": "pinyin"
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306101306352.png" alt="image-20230610130606208" style="zoom:80%;" />

> **最重要的是：单个分词器无法满足需求，将多个分词器进行组合形成自定义分词器**

ES中分词器（analyzer）的组成包含三部分：

> - character filters：**在tokenizer之前对文本进行处理**。例如删除字符、替换字符
> - tokenizer：**将文本按照一定的规则切割成词条**（term）。例如keyword，ik_smart
> - tokenizer filter：**将tokenizer输出的词条做进一步处理**。例如大小写转换、同义词处理、拼音处理

文档分词时会依次由这三部分来处理文档：

> 重点：创建分词器+搜索分词器，先分词，再进行拼音
>
> 注意：`tokenizer是真正的分词器`
>
> 目的：避免使用拼音分词器时搜狮子显示虱子

   ![image-20210723210427878](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210723210427878.png)

> 重点步骤：先用ik分词，再用拼音分词

我们可以在创建索引库时，通过settings来配置自定义的analyzer（分词器）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327184559209.png" alt="image-20220327184559209" style="zoom:67%;" />

声明自定义分词器的语法如下：

- my_analyzer：分词器名称
- filter:：自定义tokenizer filter
- py：过滤器名称
- type：pinyin  过滤器类型，这里是pinyin，下面是拼音分词器的各种属性
- "search_analyzer": "ik_smart"：搜索时使用分词器

> 推荐使用该自定义分词器
>

```json
PUT /test
{
  "settings": {
    "analysis": {
      "analyzer": { 
        "my_analyzer": { 
          "tokenizer": "ik_max_word",
          "filter": "py"
        }
      },
      "filter": {
        "py": { 
          "type": "pinyin",
          "keep_full_pinyin": false,
          "keep_joined_full_pinyin": true,
          "keep_original": true,
          "limit_first_letter_length": 16,
          "remove_duplicated_term": true,
          "none_chinese_pinyin_tokenize": false
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "name":{
        "type":"text",
        "analyzer": "my_analyzer"
      }
    }
  }
}
```

> 测试自定义分词器：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210723211829150.png" alt="image-20210723211829150" style="zoom: 50%;" />

```apl
GET /test/_analyze
{
  "analyzer": "my_analyzer",
  "text": "传智播客,奥力给！"
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327184840653.png" alt="image-20220327184840653" style="zoom:67%;" />

`拼音分词器适合在创建倒排索引的时候使用，但不能在搜索的时候使用。`

创建倒排索引时：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206261658191.png" alt="image-20220626165852059" style="zoom:67%;" />

解决方式

> 因此字段在创建倒排索引时应该用my_analyzer分词器；字段在搜索时应该使用ik_smart分词器;

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327185344128.png" alt="image-20220327185344128" style="zoom:55%;" />

插入数据

```apl
POST /test/_doc/1
{
  "id":1,
  "name":"狮子"
}

POST /test/_doc/2
{
  "id":2,
  "name":"虱子"
}
```

查询数据

```apl
GET /test/_search
{
  "query": {
    "match": {
      "name": "掉进狮子笼怎么办"
    }
  }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327185830020.png" alt="image-20220327185830020" style="zoom:67%;" />

> 拼音分词器注意事项？为了避免搜索到同音字，搜索时不要使用拼音分词器，即指定search_analyzer
>
> 最终版本分词器

```json
PUT /test
{
  "settings": {
    "analysis": {
      "analyzer": { 
        "my_analyzer": { 
          "tokenizer": "ik_max_word",
          "filter": "py"
        }
      },
      "filter": {
        "py": {  // 拼音分词器配置属性，官网上有
          "type": "pinyin",
          "keep_full_pinyin": false,
          "keep_joined_full_pinyin": true,
          "keep_original": true,
          "limit_first_letter_length": 16,
          "remove_duplicated_term": true,
          "none_chinese_pinyin_tokenize": false
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "name":{
        "type":"text",
        "analyzer": "my_analyzer", // 创建倒排索引使用自定义分词器
        "search_analyzer": "ik_smart" // 搜索时不能使用拼音分词器
      }
    }
  }
}
```



# ES状态查询

## ES状态

访问：http://192.168.31.202:9200/_cluster/health

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306091557878.png" alt="image-20230609155714777" style="zoom:80%;" />

Status：集群状态。**Green 所有分片可用。Yellow所有主分片可用**。Red主分片不可用，集群不可用。

集群状态通过 绿，黄，红 来标识：

- 绿色：集群健康完好，一切功能齐全正常，所有分片和副本都可以正常工作。
- 黄色：预警状态，所有主分片功能正常，但至少有一个副本是不能正常工作的。此时集群是可以正常工作的，但是高可用性在某种程度上会受影响。
- 红色：集群不可正常使用。某个或某些分片及其副本异常不可用，这时集群的查询操作还能执行，但是返回的结果会不准确。对于分配到这个分片的写入请求将会报错，最终会导致数据的丢失。

当集群状态为红色时，它将会继续从可用的分片提供搜索请求服务，但是你需要尽快修复那些未分配的分片。



## 关键命令

```apl
GET /_cat
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327151413297.png" alt="image-20220327151413297" style="zoom: 55%;" />

### format定义输出格式

- 支持的输出格式有json,test,yaml等
- 默认以text格式输出
- 以json格式输出 format=json&pretty

### 快速检查集群的健康状况

es提供了一套api，叫做cat api，可以查看es中各种各样的数据

```apl
GET /_cat/health?v&format=json
```

如何快速了解集群的健康状况？green、yellow、red？

> - green：`每个索引的primary shard和replica shard都是active状态的`
>
>
> - yellow：每个索引的primary shard都是active状态的，但是部分replica shard不是active状态，处于不可用的状态`
>
>
> - red：不是所有索引的primary shard都是active状态的，部分索引有数据丢失了

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327151653501.png" alt="image-20220327151653501" style="zoom:55%;" />

### 查看已安装的插件

```apl
http://192.168.31.202:9200/_cat/plugins?format=json
GET _cat/plugins?format=json
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327152058000.png" alt="image-20220327152058000" style="zoom:55%;" />

### 查看有哪些索引

```apl
GET /_cat/indices?v&format=json
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206271054495.png" alt="image-20220627105422416" style="zoom: 55%;" />



# 索引库操作

> 索引库就类似数据库表，mapping映射就类似表的结构。我们要向es中存储数据，必须先创建“库”和“表”。
>

## mapping属性⭐

### 常见属性

> - type：数据类型
> - index：是否索引
> - analyzer：分词器
> - properties：子字段

> - Text：用于存储文本内容，支持全文搜索、模糊搜索、正则表达式搜索等功能。
> - Keyword：用于存储关键词，支持精确匹配和聚合操作。
> - Date：用于存储日期时间类型的数据，支持日期范围查询、日期格式化等功能。
> - Numeric：用于存储数值类型的数据，支持数值范围查询、聚合操作等功能。
> - Boolean：用于存储布尔类型的数据，支持精确匹配和聚合操作。
> - Geo-point：用于存储地理位置信息，支持距离计算、地理位置聚合等功能。
> - Object：用于存储复杂的结构化数据，支持嵌套查询、嵌套聚合等功能。

> text

> Es中的text类型是一种用于处理长文本的数据类型，适合于全文搜索和分析。当将文本字段映射为text类型时，文本会被分析器分词处理成一个个单词， 然后被存储在倒排索引中，以便后续进行全文搜索。text类型支持多种分析器和过滤器，可以对不同的文本进行不同的分词处理，以达到最佳的搜索效果。此外， text类型还支持词项位置信息和偏移量信息的存储，以便进行精确的搜索和高亮显示。

> keyword

> ES把keyword类型的值作为一整体存在倒排索引中，不进行分词。 keyword适合存结构化数据，如性别、手机号、数据状态、标签HttpCode(404,200,500)等。 字段常用来精确查询、过滤、排序、聚合时，应设为keyword，而不是数值型。 如果某个字段你经常用来做range查询, 你还是设置为数值型(integer,long)，ES对数字的range有优化。 还可以把字段设为multi-field，这样又有keyword类型又有数值类型，方便多种方式的使用。 最长支持32766个UTF-8类型的字符，但放入倒排索引时，只截取前一段字符串，长度由ignore_above参数决定，默认"ignore_above" : 256。



### 基本数据类型

> mapping是对索引库中文档的约束，常见的mapping属性包括：
>
> 只有text类型需要分词

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306082154399.png" alt="image-20230608215444274" style="zoom:80%;" />

> 注意事项：keyword：目前已经取代了"index": false。上边介绍的text文本字段在映射时要设置分词器，keyword字段为关键字字段，通常搜索keyword是按照整体搜索，所以创建keyword字段的索引时是不进行分词的，比如：邮政编码、手机号码、身份证等。keyword字段通常用于过虑、排序、聚合等。

例如下面的json文档：

```json
{
    "age": 21,
    "weight": 52.1,
    "isMarried": false,
    "info": "黑马程序员Java讲师",
    "email": "zy@itcast.cn",
    "score": [99.1, 99.5, 98.9],
    "name": {
        "firstName": "云",
        "lastName": "赵"
    }
}
```

对应的每个字段映射（mapping）：

- age：`类型为integer`；参与搜索，因此需要index为true；`无需分词器`
- weight：`类型为float`；参与搜索，因此需要index为true；`无需分词器`
- isMarried：`类型为boolean`；参与搜索，因此需要index为true；`无需分词器`
- info：`类型为字符串`，需要分词，因此是text；参与搜索，因此需要index为true；`分词器可以用ik_smart`
- email：`类型为字符串`，但是不需要分词，`因此是keyword`；不参与搜索，因此需要index为false；`无需分词器`
- score：虽然是数组，但是我们只看元素的类型，类型为float；参与搜索，因此需要index为true；`无需分词器`
- name：类型为object，需要定义多个子属性
  - name.firstName；类型为字符串，但是不需要分词，因此是keyword；参与搜索，因此需要index为true；无需分词器
  - name.lastName；类型为字符串，但是不需要分词，因此是keyword；参与搜索，因此需要index为true；无需分词器

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209022255501.png" alt="image-20220902225551173" style="zoom:80%;" />

```json
PUT /heima
{
    "mappings" : {
      "properties" : {
        "age" : {
          "type" : "integer",
          "index": true
        },
        "weight" : {
          "type" : "integer",
          "index": "true"
         },
         "isMarried":{
           "type": "boolean",
           "index": true
         },
         "info":{
           "type": "text",
           "analyzer": "ik_smart"
         },
         "email":{
           "type": "keyword",
           "index": false
         },
         "score":{
           "type": "float",
           "index": true
         },
         "name" : {
          "properties" : {
            "firstName" : {
              "type" : "keyword",
              "index": "true"
            },
            "lastName" : {
              "type" : "keyword",
              "index": "true"
            }
          }
        }
      }
   }
}
```

### date日期类型

日期类型不用设置分词器。

通常日期类型的字段用于排序。

format：通过format设置日期格式

例子：下边的设置允许date字段存储年月日时分秒、年月日及毫秒三种格式。

```apl
PUT t1

PUT t1/_mapping
{
	"properties": {
    "timestamp":{
        "type":"date",
        "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd"
     }
  } 
}
```

插入数据测试

```apl
POST /t1/_doc/1
{
  "timestamp":"2018-07-04"
}

POST /t1/_doc/2
{
  "timestamp":"2018-07-04 18:28:58"
}
```

查询数据测试

```apl
GET t1
GET t1/_doc/2
```

### 数值类型

下边是ES支持的数值类型

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/1568990520717.png" alt="1568990520717" style="zoom: 80%;" />

1、尽量选择范围小的类型，提高搜索效率

2、对于浮点数尽量用比例因子，比如一个价格字段，单位为元，我们将比例因子设置为100这在ES中会按分存储，映射如下：

```apl
"price": {
   "type": "scaled_float",
   "scaling_factor": 100
},
```

由于比例因子为100，如果我们输入的价格是23.45则ES中会将23.45乘以100存储在ES中。

如果输入的价格是23.456，ES会将23.456乘以100再取一个接近原始值的数，得出2346。

使用比例因子的好处是整型比浮点型更易压缩，节省磁盘空间。

如果比例因子不适合，则从下表选择范围小的去用

### 对象类型

```apl
PUT /company/_doc/1
{
  "address": {
    "country": "china",
    "province": "guangdong",
    "city": "guangzhou"
  },
  "name": "jack",
  "age": 27,
  "join_date": "2019-01-01"
}
```

### 数组类型

```apl
PUT /company1/_doc/1
{
  "address": ["北京","上海"],
  "name": "jack",
  "age": 27,
  "join_date": "2019-01-01"
}
```

### 位置类型⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209030951758.png" alt="image-20220903095147651" style="zoom:80%;" />

这里的location是经度和纬度的组合

```js
PUT /heima
{
    "mappings" : {
      "properties" : {
        "location" : {
          "type" : "geo_point"
        }
      }
    }
}
```



## 索引库CRUD

这里我们统一使用Kibana编写DSL的方式来演示。

> - 创建索引库：PUT /索引库名
> - 查询索引库：GET /索引库名
> - 删除索引库：DELETE /索引库名
> - 添加字段：PUT /索引库名/_mapping
>

### 创建索引库和映射⭐

#### 基本语法

- 请求方式：PUT
- 请求路径：/索引库名，可以自定义
- 请求参数：mapping映射

几个特殊字段说明：

- location：地理坐标，里面包含精度、纬度
- all：一个组合字段，其目的是将多字段的值 利用copy_to合并，提供给用户搜索

地理坐标说明：

![image-20210720222110126](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720222110126.png)

格式：

index:true可以省略

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209022255501.png" alt="image-20220902225551173" style="zoom:80%;" />

```json
PUT /索引库名称 
{
  "mappings": {
    "properties": {
      "字段名":{
        "type": "text",
        "analyzer": "ik_smart",
        "copy_to": "all"
      },
      "字段名2":{
        "type": "keyword",
        "index": "false"
      },
      "字段名3":{
        "properties": {
          "子字段": {
            "type": "keyword"
          }
        }
      },
      // ...略
    }
  }
}
```

#### 示例

mappings------>properties--->字段---->type------>analyzer

```apl
PUT /heima 
{
  "mappings": {
    "properties": {
      "info":{
        "type": "text",
        "analyzer": "ik_smart"
      },
      "email":{
        "type": "keyword",
        "index": "falsae"
      },
      "name":{
        "properties": {
          "firstName": {
            "type": "keyword"
          }
        }
      },
      // ... 略
    }
  }
}
```

### 查询索引库

**基本语法**：

- 请求方式：GET

- 请求路径：/索引库名

- 请求参数：无

**格式**：

```apl
GET /索引库名
GET /索引库名/_mapping/
GET /heima
```

**示例**：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720211019329.png" alt="image-20210720211019329" style="zoom: 80%;" />



### 修改索引库

> 可以新增字段，不能修改字段

倒排索引结构虽然不复杂，但是一旦数据结构改变（比如改变了分词器），就需要重新创建倒排索引，这简直是灾难。因此索引库**一旦创建，无法修改mapping**。

虽然无法修改mapping中已有的字段，但是却允许添加新的字段到mapping中，因为不会对倒排索引产生影响。

**语法说明**：

```json
PUT /索引库名/_mapping
{
  "properties": {
    "新字段名":{
      "type": "integer"
    }
  }
}
```

**示例**：

![image-20210720212357390](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720212357390.png)

**只能新增，不能修改**

只能创建index时手动建立mapping，或者新增field mapping，但是不能update field mapping。

因为已有数据按照映射早已分词存储好。如果修改，那这些存量数据怎么办。

新增一个字段mapping

new_field就是新增的字段名比如name,pic之类的字段名字

```json
PUT /book/_mapping/
{
  "properties" : {
    "new_field" : {
      "type" :    "text",
      "index":    "false"
    }
  }
}
```

如果修改mapping,会报错

```json
PUT /book/_mapping/
{
  "properties" : {
    "studymodel" : {
     "type" : "keyword"
    }
  }
}
```



### 删除索引库

**语法：**

- 请求方式：DELETE

- 请求路径：/索引库名

- 请求参数：无

**格式：**

```apl
DELETE /索引库名
```

在kibana中测试：

![image-20210720212123420](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720212123420.png)



### 索引库实战案例⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209031001075.png" alt="image-20220903100132907" style="zoom:80%;" />

### 扩展：copy_to

创建索引时添加

> 实现对多个字段搜索，又要性能好，即不使用mutil_match
>
> 实现在一个字段里，搜到多个字段的内容

这个all字段查询时不显示，专门搜索用的

![image-20210720222221516](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720222221516.png)

使用示例

直接mutil_match

```apl
GET /hotel/_search
{
  "query": {
    "multi_match": {
      "query": "七天",
      "fields": ["brand","name"]
    }
  }
}
```

使用copy_to

```apl
GET /hotel/_search
{
  "query": {
    "match": {
      "all": "七天"
    }
  }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206281151383.png" alt="image-20220628115135281" style="zoom: 50%;" />



# 文档操作

> - 创建文档：POST /{索引库名}/_doc/文档id   { json文档 }
> - 查询文档：GET /{索引库名}/_doc/文档id
> - 删除文档：DELETE /{索引库名}/_doc/文档id
> - 修改文档：
>   - 全量修改：PUT /{索引库名}/_doc/文档id { json文档 }
>   - 增量修改：POST /{索引库名}/_update/文档id { "doc": {字段}}

## 新增文档

注意：直接复制代码块内容出问题时，可以先粘贴到其他地方，再复制到浏览器

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209030935992.png" alt="image-20220903093521886" style="zoom:80%;" />

### 正常新增

**语法：**

```json
POST /索引库名/_doc/文档id
{
    "字段1": "值1",
    "字段2": "值2",
    "字段3": {
        "子属性1": "值3",
        "子属性2": "值4"
    },
    // ...
}
```

**示例：**

```json
POST /heima/_doc/1
{
    "info": "黑马程序员Java讲师",
    "email": "zy@itcast.cn",
    "name": {
        "firstName": "云",
        "lastName": "赵"
    }
}
```

**响应：**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720212933362.png" alt="image-20210720212933362" style="zoom:67%;" />

### 自动生成id

> `自动id特点：长度为20个字符，URL安全，base64编码，GUID，分布式生成不冲突 `

没有传入id

```apl
POST /t1/_doc
{
  "name": "test1"
}
```

进行查询

```apl
GET t1/_search
{
  "query": {
    "match_all": {}
  }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327152939877.png" alt="image-20220327152939877" style="zoom:67%;" />

获取值

```apl
GET /t1/_doc/wVJFyn8BSlWIt-5G-RUp
```



## 查询文档

根据rest风格，新增是post，查询应该是get，不过查询一般都需要条件，这里我们把文档id带上。

**语法：**

```json
GET /{索引库名称}/_doc/{id}
```

**通过kibana查看数据：**

```js
GET /heima/_doc/1
```

**查看结果：**

![image-20210720213345003](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720213345003.png)



## 删除文档

删除使用DELETE请求，同样，需要根据id进行删除：

实质：旧文档的内容不会立即删除，只是标记为deleted。适当的时机，集群会将这些文档删除。

**语法：**

```js
DELETE /{索引库名}/_doc/id值
```

**示例：**

```json
# 根据id删除数据
DELETE /heima/_doc/1
```

**结果：**

![image-20210720213634918](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210720213634918.png)

## 修改文档

修改有两种方式：

> - 全量修改：`直接覆盖原来的文档`
> - 增量修改：`修改文档中的部分字段`
> - **如果没有该字段，就新增该字段。如果有该字段，就修改该字段的值**

### 全量修改

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209030938699.png" alt="image-20220903093856584" style="zoom: 80%;" />

全量修改，`会删除旧文档，添加新文档`，其本质是：

> - 根据指定的id删除文档
> - 新增一个相同id的文档
> - **注意**：如果根据id删除时，id不存在，第二步的新增也会执行，也就从修改变成了新增操作

**语法：**

```json
PUT /{索引库名}/_doc/文档id
{
    "字段1": "值1",
    "字段2": "值2",
    // ... 略
}
```

**示例：**

```json
PUT /heima/_doc/1
{
    "info": "黑马程序员高级Java讲师",
    "email": "zy@itcast.com",
    "name": {
        "firstName": "云",
        "lastName": "赵"
    }
}
```

### 增量修改

> 增量修改，`修改指定字段值`
>
> 增量修改是只修改指定id匹配的文档中的部分字段。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209030939772.png" alt="image-20220903093943665" style="zoom:80%;" />

**语法：**

```json
POST /{索引库名}/_update/文档id
{
    "doc": {
         "字段名": "新的值",
    }
}
```

**示例：**

```json
POST /heima/_update/1
{
  "doc": {
    "email": "ZhaoYun@itcast.cn"
  }
}
```



### 强制创建

为防止覆盖原有数据，我们在新增时，设置为强制创建，不会覆盖原有文档。

语法：PUT /index/ _doc/id/_create

```json
PUT /t1/_doc/1/_create
{
  "test_field": "test"
}
```

结果

当id=1的文档已经存在时，使用强制创建会出错，不会更新覆盖原来文档。

不会像之前创建时如果存在，就更新文档。

## Dynamic Mapping

当我们向ES中插入文档时，如果文档中字段没有对应的mapping，ES会帮助我们字段设置mapping，规则

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209030943510.png" alt="image-20220903094302392" style="zoom:80%;" />

我们插入一条新的数据，其中包含4个没有mapping的字段：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209030943652.png" alt="image-20220903094358528" style="zoom: 80%;" />

## retry_on_conflict

> **指定重试次数**

```json
POST /test_index/_doc/5/_update?retry_on_conflict=3
{
  "doc": {
    "test_field": "itcast1"
  }
}
```

> **与 _version结合使用，可以自己指定版本号，当然也可以不指定**

```json
POST /test_index/_doc/5/_update?retry_on_conflict=3&version=22&version_type=external
{
  "doc": {
    "test_field": "itcast1"
  }
}
```



# DSL搜索

elasticsearch的查询依然是基于JSON风格的DSL来实现的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207161353833.png" alt="image-20220716135337731" style="zoom:67%;" />

## 查询分类

> Elasticsearch提供了基于JSON的DSL（[Domain Specific Language](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html)）来定义查询。常见的查询类型包括：DSL:Domain Specified Language，特定领域的语言,可在请求体中携带搜索条件，功能强大
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206261407029.png" alt="image-20220626140749867" style="zoom:80%;" />

```js
Match Query：用于匹配文本类型字段中的文本。
Multi-match Query：用于在多个字段中匹配文本类型字段中的文本。
Term Query：用于匹配非文本类型字段（如数字、布尔值等）中的确切值。
Terms Query：用于匹配非文本类型字段（如数字、布尔值等）中的多个确切值。
Range Query：用于匹配数字、日期等范围内的值。
Exists Query：用于匹配指定字段是否存在值。
Prefix Query：用于匹配以指定前缀开头的文本。
Wildcard Query：用于匹配包含通配符的文本。
Regexp Query：用于使用正则表达式匹配文本。
Fuzzy Query：用于匹配类似但不完全匹配的文本。
Type Query：用于匹配指定类型的文档。
Ids Query：用于根据指定的文档 ID 匹配文档。
Bool Query：用于组合多个查询条件，支持AND、OR、NOT等逻辑操作。
Boosting Query：用于根据指定的查询条件调整文档的权重。
Constant Score Query：用于为所有匹配的文档分配相同的分数。
Function Score Query：用于根据指定的函数为匹配的文档分配自定义分数。
Dis Max Query：用于在多个查询条件中选择最佳匹配的文档。
More Like This Query：用于根据文档内容查找相似的文档。
Nested Query：用于在嵌套对象中查询。
Geo Distance Query：用于查询地理坐标范围内的地点。
Span Term Query：用于匹配指定的单个术语。
Span Multi Term Query：用于匹配指定的多个术语。
Span First Query：用于匹配文档中的首个匹配项。
Span Near Query：用于匹配多个术语之间的近似距离。
Span Or Query：用于匹配任何指定的术语。
Span Not Query：用于匹配不包含指定术语的文档。
Script Query：用于根据指定的脚本匹配文档。
```

> 查询的语法基本一致：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306091425819.png" alt="image-20230609142540714" style="zoom:80%;" />

```json
GET /hotel/_search
{
  "query": {
    "match_all": {}
  },
  "from": 0,
  "size": 20
}
```

其它查询无非就是**查询类型**、**查询条件**的变化。

## 基本语法

### 无条件搜索

```apl
GET /hotel/_search
```

> - took：耗费了几毫秒
> - timed_out：是否超时，这里是没有
> - _shards：到几个分片搜索，成功几个，跳过几个，失败几个。 
> - hits.total：查询结果的数量，3个document
> - hits.max_score：score的含义，就是document对于一个search的相关度的匹配分数，越相关，就越匹配，分数也高
> - hits.hits：包含了匹配搜索的document的所有详细数据

### timeout参数

全局设置：配置文件中设置 search.default_search_timeout：100ms。默认不超时。

机制：指定每个shard只能在给定的时间内查询数据，能有几条就返回几条，返回给客户端，保住了业务

```json
GET /hotel/_search
{
  "timeout": "1m",
  "query": {
    "match_all": {}
  },
  "from": 0,
  "size": 20
}
```

### 多索引搜索

> multi-index 搜索模式

告诉你如何一次性搜索多个index和多个type下的数据

```js
GET  /_search：所有索引下的所有数据都搜索出来
GET  /index1/_search：指定一个index，搜索其下所有的数据
GET  /index1,index2/_search：同时搜索两个index下的数据
GET  /index*/_search：按照通配符去匹配多个索引
```

应用场景：生产环境log索引可以按照日期分开。

log_to_es_20190910

log_to_es_20190911

log_to_es_20180910

### 查询所有内容

```js
GET /hotel/_search
{
  "query": {
    "match_all": {}
  },
  "from": 0,
  "size": 20
}
```

## 精准查询

精确查询一般是查找`keyword、数值、日期、boolean等类型字段。所以不会对搜索条件分词`。常见的有：

> - term：根据词条精`确值查询`
> - range：根据值的`范围查询`
> - 重点：`不分词查询，数据类型为keyword`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206261416375.png" alt="image-20220626141640277" style="zoom:80%;" />

> 精确查询常见的有term查询和range查询。语法如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206261421016.png" alt="image-20220626142116939" style="zoom: 67%;" />

### term查询

> 因为精确查询的字段搜是不分词的字段，因此查询的条件也必须是**不分词**的词条。查询时，用户输入的内容跟自动值完全匹配时才认为符合条件。如果用户输入的内容过多，反而搜索不到数据。当我搜索的是`精确词条`时，能正确查询出结果：

![image-20210721171655308](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210721171655308.png)

```json
GET /hotel/_search
{
  "query": {
    "term": {
      "city": {
        "value": "上海"
      }
    }
  }
}
```

> 但是，当我搜索的内容不是词条，而是多个词语形成的短语时，反而搜索不到：

![image-20210721171838378](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210721171838378.png)

### range查询

> 范围查询，一般应用在对数值类型做`范围过滤`的时候。比如做`价格范围过滤`。
>
> - 这里的gte代表大于等于，gt则代表大于
> - lte代表小于等于，lt则代表小于

![image-20210721172307172](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210721172307172.png)

```json
GET /hotel/_search
{
  "query": {
    "range": {
      "price": {
        "gte": 100,
        "lte": 300
      }
    }
  }
}
```

## 全文检索

### 使用场景

> 全文检索查询，会对用户输入内容分词，`常用于搜索框搜索`

![image-20210721165326938](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210721165326938.png)

> 因为是拿着词条去匹配，因此参与搜索的字段也必须是可分词的text类型的字段。
>

> 全文检索流程

> - **对用户搜索的内容做分词，得到词条**
> - **根据词条去倒排索引库中匹配，得到文档id**
> - **根据文档id找到文档，返回给用户**

### match(推荐)

> match查询：单字段查询，`全文检索查询的一种，会对用户输入内容分词，然后去倒排索引库检索`
>

![image-20210721170455419](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210721170455419.png)

> 注意：此时all字段通过copy拥有brand、business，all字段不显示，查询它会自动匹配brand、business

```json
GET /hotel/_search
{
  "query": {
    "match": {
      "all": "外滩"
    }
  }
}
```

### multi_match

> multi_match查询：多字段查询，任意一个字段符合条件就算符合查询条件
>
> multi_match：`与match查询类似，只不过允许同时查询多个字段`

![image-20210721170720691](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210721170720691.png)

```json
GET /hotel/_search
{
  "query": {
    "multi_match": {
      "query": "外滩如家",
      "fields": ["brand","name","business"]
    }
  }
}
```

### 使用建议

可以看到，两种查询结果是一样的，为什么？

> 因为我们将brand、name、business值都利用copy_to复制到了all字段中。因此你根据三个字段搜索，和根据all字段搜索效果当然一样了。

> 但是，搜索字段越多，对查询性能影响越大，因此建议采用copy_to，然后单字段查询的方式

## 地理坐标

> 所谓的地理坐标查询，其实就是根据经纬度查询
>
> 官方文档：https://www.elastic.co/guide/en/elasticsearch/reference/current/geo-queries.html

> 常见的使用场景包括：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306091446731.png" alt="image-20230609144616594" style="zoom:80%;" />

### 矩形查询

> geo_bounding_box：`查询geo_point值落在某个矩形范围的所有文档`
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206261426062.png" alt="image-20220626142643909" style="zoom:80%;" />

> 需要指定矩形的**左上**、**右下**两个点的坐标，然后画出一个**矩形**，落在该矩形内的都是符合条件的点。
>

```json
# geo_bounding_box查询
GET /hotel/_search
{
  "query": {
    "geo_bounding_box": {
      "location": {
        "top_left": { 
          "lat": 31.1,
          "lon": 121.5
        },
        "bottom_right": { 
          "lat": 30.9,
          "lon": 121.7
        }
      }
    }
  }
}
```

这种并不符合“附近的人”这样的需求，所以我们就不做了。

### 附近查询

> 附近查询，也叫做距离查询（geo_distance）：`查询到指定中心点小于某个距离值的所有文档`。换句话来说，在地图上找一个点作为圆心，以指定距离为半径，画一个圆，落在圆内的坐标都算符合条件：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206261427947.png" alt="image-20220626142756796" style="zoom:80%;" />

> distance：半径，location：圆心
>

```json
GET /hotel/_search
{
  "query": {
    "geo_distance": {
      "distance": "15km", 
      "location": "31.21,121.5" 
    }
  }
}
```

> 我们先搜索陆家嘴附近15km的酒店：
>

![image-20210721175443234](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210721175443234.png)

> 发现共有47家酒店，然后把半径缩短到3公里：
>

![image-20210721182031475](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210721182031475.png)

> 可以发现，搜索到的酒店数量减少到了5家。
>

## 复合查询

> 复合（compound）查询：`复合查询可以将其它简单查询组合起来，实现更复杂的搜索逻辑`。常见有两种：

> - fuction score：`算分函数查询，可以控制文档相关性算分，控制文档排名`
> - bool query：`布尔查询，利用逻辑关系组合多个其它的查询，实现复杂搜索`

### 相关性算分

> 当我们利用match查询时，文档结果会根据与搜索词条的关联度打分（_score），返回结果时按照分值降序排列
>

例如，我们搜索 "虹桥如家"，结果如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209031212766.png" alt="image-20220903121255528" style="zoom:80%;" />

> 在elasticsearch中，早期使用的打分算法是TF-IDF算法，在后来的5.1版本升级中，elasticsearch将算法改进为BM25算法
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206261433709.png" alt="image-20220626143358572" style="zoom:80%;" />

> TF-IDF算法有一各缺陷，就是词条频率越高，文档得分也会越高，单个词条对文档影响较大。而BM25则会让单个词条的算分有一个上限，曲线更加平滑
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210721190907320.png" alt="image-20210721190907320" style="zoom: 67%;" />

### 算分函数查询⭐

> 根据相关度打分是比较合理的需求，但**合理的不一定是产品经理需要**的。
>
> 以百度为例，你搜索的结果中，**并不是相关度越高排名越靠前，而是谁掏的钱多排名就越靠前**
>
> 要想认为控制相关性算分，就需要利用elasticsearch中的function score 查询了。

#### 基本语法

![image-20210721191544750](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210721191544750.png)

function score的运行流程如下：

> - 根据**原始条件**查询搜索文档，并且计算相关性算分，称为**原始算分**（query score）
> - 根据**过滤条件**，过滤文档
> - 符合**过滤条件**的文档，基于**算分函数**运算，得到**函数算分**（function score）
> - 将**原始算分**（query score）和**函数算分**（function score）基于**运算模式**做运算，得到最终结果，作为**相关性算分**

因此，其中的关键点是：

> - 过滤条件：决定哪些文档的算分被修改
> - 算分函数：决定函数算分的算法
> - 运算模式：决定最终算分结果

#### 让"如家"排名靠前

> 需求：给“如家”这个品牌的酒店`排名靠前一些`
>

翻译一下这个需求，转换为之前说的四个要点：

> - 原始条件：不确定，可以任意变化
> - 过滤条件：brand = "如家"
> - 算分函数：可以简单粗暴，直接给固定的算分结果，weight
> - 运算模式：比如求和

因此最终的DSL语句如下：

```json
GET /hotel/_search
{
  "query": {
    "function_score": {
      // 原始查询，可以是任意条件
      "query": {
          "match_all": {}
       }, 
      "functions": [ // 算分函数，表示符合条件的文档进行加分
        {
          "filter": { // 满足的条件，品牌必须是如家，可以加个isAD，来满足只要广告参与算分
            "term": {
              "brand": "如家"
            }
          },
          "weight": 2 // 算分权重为2
        }
      ],
      "boost_mode": "sum" // 加权模式，求和
    }
  }
}
```

> 测试，在未添加算分函数时，如家得分如下：**可以看到，品牌为如家的排在前列**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206271844610.png" alt="image-20220627184429501" style="zoom:50%;" />

![image-20210721193152520](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210721193152520.png)

> 添加了算分函数后，如家得分就提升了：
>

![image-20210721193458182](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210721193458182.png)

### 布尔查询

> 布尔查询是**一个或多个查询子句的组合**，每一个子句就是一个**子查询**。子查询的组合方式有：
>

> - must：**必须**匹配每个子查询，类似“与”
> - should：**选择性**匹配子查询，类似“或”
> - must_not：**必须不匹配**，**不参与算分**，类似“非”
> - filter：**`必须匹配`**，**不参与算分，因此比must性能高**

> 比如在搜索酒店时，除了**关键字搜索外，我们还可能根据品牌、价格、城市等字段做过滤**：
>

![image-20210721193822848](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210721193822848.png)

> 每一个不同的字段，其查询的条件、方式都不一样，必须是多个不同的查询，而要组合这些查询，就必须用bool查询了。需要注意的是，搜索时，参与**打分的字段越多，查询的性能也越差**。因此这种多条件查询时，建议这样做：
>

> - **搜索框的关键字搜索，是全文检索查询，使用must查询，参与算分**
> - **其它过滤条件，采用filter查询。不参与算分**

```json
GET /hotel/_search
{
  "query": {
    "bool": {
      "must": [
        {"term": {"city": "上海" }}
      ],
      "filter": [
        {"term": {"brand": "速8" }},
        {"range": { "price": { "lte": 1000 }}}
      ]
    }
  }
}
```

#### 基本语法

注意：term表示精确查询，range表示范围查询

```json
GET /hotel/_search
{
  "query": {
    "bool": {
      "must": [
        {"term": {"city": "上海" }}
      ],
      "should": [
        {"term": {"brand": "皇冠假日" }},
        {"term": {"brand": "华美达" }}
      ],
      "must_not": [
        { "range": { "price": { "lte": 500 } }}
      ],
      "filter": [
        { "range": {"score": { "gte": 45 } }}
      ]
    }
  }
}
```

#### 示例分析

> 需求：搜索名字包含“如家”，价格不高于400，在坐标31.21,121.5周围10km范围内的酒店。
>

- 名称搜索，属于全文检索查询，应该参与算分。放到must中
- 价格不高于400，用range查询，属于过滤条件，不参与算分。放到must_not中
- 周围10km范围内，用geo_distance查询，属于过滤条件，不参与算分。放到filter中

![image-20230609152412678](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306091524797.png)

## 字段是否存在

### exist query

查询包含某个属性的文档，如name，age之类的属性

```apl
GET /book/_search
{
  "query": {
        "exists": {
          "field": "name"
        }
  }
}
```

### Fuzzy query

返回包含与**搜索词类似的词的文档**，该词由Levenshtein编辑距离度量。

包括以下几种情况：

- 更改角色（box→fox）

- 删除字符（aple→apple）

- 插入字符（sick→sic）

- 调换两个相邻字符（ACT→CAT） 


```apl
GET /book/_search
{
    "query": {
        "fuzzy": {
            "description": {
                "value": "jave"
            }
        }
    }
}
```

### prefix 前缀查询

字段的内容以什么开头的

```js
GET /book/_search
{
    "query": {
        "prefix": {
            "description": {
                "value": "spring"
            }
        }
    }
}
```

### 正则查询

```apl
GET /book/_search
{
    "query": {
        "regexp": {
            "description": {
                "value": "j.*a",
                "flags" : "ALL",
                "max_determinized_states": 10000,
                "rewrite": "constant_score"
            }
        }
    }
}
```

# 搜索结果

> 搜索的结果可以按照用户指定的方式去处理或展示。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206261543773.png" alt="image-20220626154304675" style="zoom:67%;" />

## 排序

> elasticsearch默认是根据相关度算分（_score）来排序，但是也支持自定义方式对搜索[结果排序](https://www.elastic.co/guide/en/elasticsearch/reference/current/sort-search-results.html)。可以排序字段类型有：**keyword类型、数值类型、地理坐标类型、日期类型**等。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206261524675.png" alt="image-20220626152423572" style="zoom:80%;" />

### 普通字段排序

> keyword、数值、日期类型排序的语法基本一致。排序条件是一个数组，也就是可以写多个排序条件。按照声明的顺序，当第一个条件相等时，再按照第二个条件排序，以此类推
>

```json
GET /hotel/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "score": "desc" 
    },
    {
      "price": "asc"
    }
  ]
}
```

> 需求描述：酒店数据按照用户评价（score)降序排序，评价相同的按照价格(price)升序排序,见上面

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209031518255.png" alt="image-20220903151802093" style="zoom:80%;" />

### 地理坐标排序

> 高德获取经纬度的方式：https://lbs.amap.com/demo/jsapi-v2/example/map/click-to-get-lnglat/

```json
GET /hotel/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "_geo_distance" : {
          "location":{
            "lat": 31.034661,
            "lon": 121.612282
          },
          "order" : "asc",
          "unit" : "km" 
      }
    }
  ]
}
```

这个查询的含义是：

> - 指定一个坐标，作为目标点
> - 计算每一个文档中，指定字段（必须是geo_point类型）的坐标 到目标点的距离是多少
> - 根据距离排序

> 需求描述：实现对酒店数据按照到你的位置坐标的距离升序排序，假设我的位置是：31.034661，121.612282，寻找我周围距离最近的酒店。
>

![image-20210721200214690](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210721200214690.png)

## 分页

> ES默认情况下只返回top10的数据。而如果要查询更多数据就需要修改分页参数了。
>
> ES中通过修改from、size参数来控制要返回的分页结果：

> - from：从第几个文档开始，表示第几页
> - size：总共查询几个文档
> - 类似于mysql中的`limit ?, ?`

> **一般搜索，如果不加from和size，就默认搜索前10条，按照_score排序**

### 分页语法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209031521850.png" alt="image-20220903152106712" style="zoom:80%;" />

```js
POST /hotel/_search
{
    "query": { "match_all": {}},
    "from": 1,
    "size":  10
}
```

使用 `from` + `size` 可进行翻页

- `from` 参数定义了需要跳过的 `hits` 数，默认 0
- `size` 参数定义了需要返回的 `hits` 数目的最大值

> ES 默认的单页查询最大限制（`max_result_window`）为10000。该方案在翻页数目较多（即 `from` 较大）或者 `size` 特别大的情况，会出深翻页问题（`deep pagination`)。

### 深度分页问题

#### 问题分析

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209031525508.png" alt="image-20220903152514374" style="zoom:80%;" />

#### 深度分页处理

> 正常搜索页面也不会超过10000条数据，不关心也行

针对深度分页，ES提供了两种解决方案，[官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html)：

- search after：分页时需要排序，原理是从上一次的排序值开始，查询下一页数据。官方推荐使用
- scroll：原理将排序数据形成快照，保存在内存。官方已经不推荐使用。

##### from + size

- 优点：支持随机翻页
- 缺点：深度分页问题，默认查询上限（from + size）是10000
- 场景：百度、京东、谷歌、淘宝这样的随机翻页搜索

##### after search

- 优点：没有查询上限（单次查询的size不超过10000）
- 缺点：只能向后逐页查询，不支持随机翻页
- 场景：没有随机翻页需求的搜索，例如手机向下滚动翻页

##### scroll

- 优点：没有查询上限（单次查询的size不超过10000）
- 缺点：会有额外内存消耗，并且搜索结果是非实时的
- 场景：海量数据的获取和迁移。从ES7.1开始不推荐，建议用 after search方案

## 高亮

### 高亮原理

> 高亮：就是在搜索结果中把搜索关键字突出显示。
>
> 原理是这样的：将搜索结果中的关键字用标签标记出来，在页面中给标签添加css样式

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209031536608.png" alt="image-20220903153600475" style="zoom:80%;" />

高亮显示的实现分为两步：

> - 给文档中的所有关键字都添加一个标签，例如`<em>`标签
> - 页面给`<em>`标签编写CSS样式

### 实现高亮

```json
GET /hotel/_search
{
  "query": {
    "match": {
      // 查询条件，高亮一定要使用全文检索查询，同时必须与下面的高亮字段一致(除非加上require...match)
      "name": "如家" 
    }
  },
  "highlight": {
    "fields": { // 指定要高亮的字段
      "name": { // 不加后面的pre_tags也行，除非你要改变它
        "require_field_match": "false", // 无需和查询条件一致
        "pre_tags": "<em>",  // 用来标记高亮字段的前置标签
        "post_tags": "</em>" // 用来标记高亮字段的后置标签
      }
    }
  }
}
```

> - 高亮是对关键字高亮，因此**搜索条件必须带有关键字**，而不能是范围这样的查询。
> - 默认情况下，**高亮的字段，必须与搜索指定的字段一致**，`否则无法高亮`
> - `如果要对非搜索字段高亮，则需要添加一个属性：required_field_match=false`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306091554054.png" alt="image-20230609155434952" style="zoom:80%;" />



# 数据聚合

> **[聚合（](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html)[aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html)[）](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html)**可以让我们极其方便的实现`对数据的统计、分析、运算`。例如：类似于SQL的group by后进行排序分组之类的语句，`注意：聚合的字段不分词，尽量为keyword类型`

> - 什么品牌的手机最受欢迎？
> - 这些手机的平均价格、最高价格、最低价格？
> - 这些手机每月的销售情况如何？

> 实现这些统计功能的比数据库的sql要方便的多，而且查询速度非常快，可以实现近实时搜索效果。
>

## 聚合分类

### 桶（Bucket）

> **用来对文档做分组**

> - TermAggregation：按照**文档字段值分组**，例如按照品牌值分组、按照国家分组
> - Date Histogram：按照**日期阶梯分组**，例如一周为一组，或者一月为一组

### 度量（Metric）

> **用以计算一些值，比如：最大值、最小值、平均值等**

> - Avg：求平均值
> - Max：求最大值
> - Min：求最小值
> - Stats：同时求max、min、avg、sum等

### 管道（pipeline）

> **管道（pipeline）**聚合：其它聚合的结果为基础做聚合
>
> **注意：**参加聚合的字段必须是`keyword、日期、数值、布尔类型`

## 基本语法⭐

> 现在，我们要统计所有数据中的酒店品牌有几种，其实就是按照品牌对数据分组。此时可以根据酒店品牌的名称做聚合，也就是Bucket聚合。
>

### Bucket聚合语法

> **加上size=0不要数据，只看分组**，现在，我们要统计所有数据中的酒店品牌有几种，此时可以根据酒店品牌的名称做聚合。类型为term类型，DSL示例：

```json
GET /hotel/_search
{
  "size": 0,  // 设置size为0，结果中不包含文档，只包含聚合结果
  "aggs": { // 定义聚合
    "brandAgg": { //给聚合起个名字,方便进行多个聚合
      "terms": { // 聚合的类型，按照品牌值聚合，所以选择term
        "field": "brand", // 参与聚合的字段
        "size": 20 // 希望获取的聚合结果数量
      }
    }
  }
}
```

> aggs代表聚合，与query同级，此时query的作用是？限定聚合的的文档范围
>
> 聚合必须的三要素：聚合名称、聚合类型、聚合字段
>
> 聚合可配置属性有：size：指定聚合结果数量、order：指定聚合结果排序方式、field：指定聚合字段

结果如图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210723171948228.png" alt="image-20210723171948228" style="zoom:67%;" />

### 聚合结果排序

> 默认情况下，Bucket聚合会统计Bucket内的文档数量，记为\_count，并且按照_count降序排序。
>

我们可以指定order属性，自定义聚合的排序方式：

```json
GET /hotel/_search
{
  "size": 0, 
  "aggs": {
    "brandAgg": {
      "terms": {
        "field": "brand",
        "order": {
          "_count": "asc" // 按照_count升序排列
        },
        "size": 20
      }
    }
  }
}
```

### 限定聚合范围

> 默认情况下，Bucket聚合是对索引库的所有文档做聚合，但真实场景下，用户会输入搜索条件，因此聚合必须是对搜索结果聚合。那么聚合必须添加限定条件。
>

我们可以限定要聚合的文档范围，只要添加query条件即可：

```json
GET /hotel/_search
{
  "query": {
    "range": {
      "price": {
        "lte": 200 // 只对200元以下的文档聚合
      }
    }
  }, 
  "size": 0, 
  "aggs": {
    "brandAgg": {
      "terms": {
        "field": "brand",
        "size": 20
      }
    }
  }
}
```

这次，聚合得到的品牌明显变少了：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210723172404836.png" alt="image-20210723172404836" style="zoom:67%;" />

### Metric聚合语法

> 上节课，我们对酒店按照品牌分组，形成了一个个桶。现在我们需要对桶内的酒店做运算，获取每个品牌的用户评分的min、max、avg等值。这就要用到Metric聚合了
>

```json
GET /hotel/_search
{
  "size": 0, 
  "aggs": {
    "brandAgg": { 
      "terms": { 
        "field": "brand", 
        "size": 20
      },
      "aggs": { // 是brands聚合的子聚合，也就是分组后对每组分别计算
        "score_stats": { // 聚合名称
          "stats": { // 聚合类型，这里stats可以计算min、max、avg等
            "field": "score" // 聚合字段，这里是score字段
          }
        }
      }
    }
  }
}
```

> 这次的score_stats聚合是在brandAgg的聚合内部嵌套的子聚合。因为我们需要在每个桶分别计算。
>

> 另外，我们**还可以给聚合结果做个排序，例如按照每个桶的酒店平均分做排序**：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210723172917636.png" alt="image-20210723172917636" style="zoom:67%;" />

## 聚合实战

```apl
PUT /tvs
{			
	"mappings": {
	  "properties": {
		  "price": {
		  	"type": "long"
		   },
		   "color": {
		  	 "type": "keyword"
		   },
		   "brand": {
		  	 "type": "keyword"
		   },
		   "sold_date": {
		  	  "type": "date"
		   }
	  }  
	}
}
```

插入数据bulk批量操作

```apl
POST /tvs/_bulk
{ "index": {}}
{ "price" : 1000, "color" : "红色", "brand" : "长虹", "sold_date" : "2019-10-28" }
{ "index": {}}
{ "price" : 2000, "color" : "红色", "brand" : "长虹", "sold_date" : "2019-11-05" }
{ "index": {}}
{ "price" : 3000, "color" : "绿色", "brand" : "小米", "sold_date" : "2019-05-18" }
{ "index": {}}
{ "price" : 1500, "color" : "蓝色", "brand" : "TCL", "sold_date" : "2019-07-02" }
{ "index": {}}
{ "price" : 1200, "color" : "绿色", "brand" : "TCL", "sold_date" : "2019-08-19" }
{ "index": {}}
{ "price" : 2000, "color" : "红色", "brand" : "长虹", "sold_date" : "2019-11-05" }
{ "index": {}}
{ "price" : 8000, "color" : "红色", "brand" : "三星", "sold_date" : "2020-01-01" }
{ "index": {}}
{ "price" : 2500, "color" : "蓝色", "brand" : "小米", "sold_date" : "2020-02-12" }
```

### 需求1 统计哪种颜色的电视销量最高

```apl
GET /tvs/_search
{
    "size" : 0,
    "aggs" : { 
        "popular_colors" : { 
            "terms" : { 
              "field" : "color"
            }
        }
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206271637370.png" alt="image-20220627163707283" style="zoom:67%;" />

查询条件解析

> - size：只获取聚合结果，而不要执行聚合的原始数据
> - aggs：固定语法，要对一份数据执行分组聚合操作
> - popular_colors：就是对每个aggs，都要起一个名字，
> - terms：**根据字段的值进行分组**
> - field：根据指定的字段的值进行分组

返回结果解析

> - hits.hits：我们指定了size是0，所以hits.hits就是空的
> - aggregations：聚合结果
> - popular_color：我们指定的某个聚合的名称
> - buckets：根据我们指定的field划分出的buckets
> - key：每个bucket对应的那个值
> - doc_count：这个bucket分组内，有多少个数据数量，其实就是这种颜色的销量

每种颜色对应的bucket中的数据的默认的排序规则：按照doc_count降序排序

### 需求2 统计每种颜色电视平均价格

```sql
-- 相当于
select avg(price) from tvs group by color
```

```apl
GET /tvs/_search
{
   "size" : 0,
   "aggs": {
      "colors": {
         "terms": {
            "field": "color"
         },
         "aggs": { 
            "avg_price": { 
               "avg": {
                  "field": "price" 
               }
            }
         }
      }
   }
}
```

在一个aggs执行的bucket操作（terms），平级的json结构下，再加一个aggs，这个第二个aggs内部，同样取个名字，执行一个metric操作，avg，对之前的每个bucket中的数据的指定的field，price field，求一个平均值

返回：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327172641597.png" alt="image-20220327172641597" style="zoom: 50%;" />

### 需求3 继续下钻分析

**每个颜色下，平均价格及每个颜色下，每个品牌的平均价格**

```apl
GET /tvs/_search 
{
  "size": 0,
  "aggs": {
    "group_by_color": {
      "terms": {
        "field": "color"
      },
      "aggs": {
        "color_avg_price": {
          "avg": {
            "field": "price"
          }
        },
        "group_by_brand": {
          "terms": {
            "field": "brand"
          },
          "aggs": {
            "brand_avg_price": {
              "avg": {
                "field": "price"
              }
            }
          }
        }
      }
    }
  }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327172810472.png" alt="image-20220327172810472" style="zoom:67%;" />



### 需求4：更多的metric(重点)

- count：bucket，terms，自动就会有一个doc_count，就相当于是count

- avg：avg aggs，求平均值
- max：求一个bucket内，指定field值最大的那个数据
- min：求一个bucket内，指定field值最小的那个数据
- sum：求一个bucket内，指定field值的总和

```apl
GET /tvs/_search
{
   "size" : 0,
   "aggs": {
      "colors": {
         "terms": {
            "field": "color"
         },
         "aggs": {
            "avg_price": { "avg": { "field": "price" } },
            "min_price" : { "min": { "field": "price"} }, 
            "max_price" : { "max": { "field": "price"} },
            "sum_price" : { "sum": { "field": "price" } } 
         }
      }
   }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327172906208.png" alt="image-20220327172906208" style="zoom:67%;" />

### 需求5：划分范围 histogram

> 给一个区间，"interval": 2000区间自动划分
>
> histogram：类似于terms，也是进行bucket分组操作，接收一个field，按照这个field的值的各个范围区间，进行bucket分组操作

```apl
GET /tvs/_search
{
   "size" : 0,
   "aggs":{
      "price":{
         "histogram":{ 
            "field": "price",
            "interval": 2000
         },
         "aggs":{
            "income": {
               "sum": { 
                 "field" : "price"
               }
             }
         }
      }
   }
}
```

```apl
"histogram":{ 
  "field": "price",
  "interval": 2000
}
```

> interval：2000，划分范围，0~2000，2000~4000，4000~6000，6000~8000，8000~10000，buckets
>
> bucket有了之后，一样的，去对每个bucket执行avg，count，sum，max，min，等各种metric操作，聚合分析

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327173004762.png" alt="image-20220327173004762" style="zoom:50%;" />



### 需求6：按照日期分组聚合

> date_histogram，按照我们指定的某个date类型的日期field，以及日期interval，按照一定的日期间隔，去划分bucket
>

> min_doc_count：即使某个日期interval，2017-01-01~2017-01-31中，一条数据都没有，那么这个区间也是要返回的，不然默认是会过滤掉这个区间的extended_bounds，min，max：划分bucket的时候，会限定在这个起始日期，和截止日期内
>

```apl
GET /tvs/_search
{
   "size" : 0,
   "aggs": {
      "sales": {
         "date_histogram": {
            "field": "sold_date",
            "interval": "month", 
            "format": "yyyy-MM-dd",
            "min_doc_count" : 0, 
            "extended_bounds" : { 
                "min" : "2019-01-01",
                "max" : "2020-12-31"
            }
         }
      }
   }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327173637029.png" alt="image-20220327173637029" style="zoom:67%;" />

### 需求7 统计每季度每个品牌的销售额

```apl
GET /tvs/_search 
{
  "size": 0,
  "aggs": {
    "group_by_sold_date": {
      "date_histogram": {
        "field": "sold_date",
        "interval": "quarter",
        "format": "yyyy-MM-dd",
        "min_doc_count": 0,
        "extended_bounds": {
          "min": "2019-01-01",
          "max": "2020-12-31"
        }
      },
      "aggs": {
        "group_by_brand": {
          "terms": {
            "field": "brand"
          },
          "aggs": {
            "sum_price": {
              "sum": {
                "field": "price"
              }
            }
          }
        },
        "total_sum_price": {
          "sum": {
            "field": "price"
          }
        }
      }
    }
  }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327173607895.png" alt="image-20220327173607895" style="zoom:67%;" />

### 需求8 ：搜索与聚合结合，查询某个品牌按颜色销量

搜索与聚合可以结合起来。

```sql
sql select count(*) from tvs

where brand like "%小米%"

group by color
```

es aggregation，scope，任何的聚合，都必须在搜索出来的结果数据中之行，搜索结果，就是聚合分析操作的scope

```apl
GET /tvs/_search 
{
  "size": 0,
  "query": {
    "term": {
      "brand": {
        "value": "小米"
      }
    }
  },
  "aggs": {
    "group_by_color": {
      "terms": {
        "field": "color"
      }
    }
  }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327173523900.png" alt="image-20220327173523900" style="zoom:67%;" />

### 需求9 global bucket：单个品牌与所有品牌销量对比

aggregation，scope，一个聚合操作，必须在query的搜索结果范围内执行

出来两个结果，一个结果，是基于query搜索结果来聚合的; 一个结果，是对所有数据执行聚合的

```apl
GET /tvs/_search 
{
  "size": 0, 
  "query": {
    "term": {
      "brand": {
        "value": "小米"
      }
    }
  },
  "aggs": {
    "single_brand_avg_price": {
      "avg": {
        "field": "price"
      }
    },
    "all": {
      "global": {},
      "aggs": {
        "all_brand_avg_price": {
          "avg": {
            "field": "price"
          }
        }
      }
    }
  }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327173451907.png" alt="image-20220327173451907" style="zoom:67%;" />

### 需求10：过滤+聚合：统计价格大于1200的电视平均价格

搜索+聚合

过滤+聚合

```apl
GET /tvs/_search 
{
  "size": 0,
  "query": {
    "constant_score": {
      "filter": {
        "range": {
          "price": {
            "gte": 1200
          }
        }
      }
    }
  },
  "aggs": {
    "avg_price": {
      "avg": {
        "field": "price"
      }
    }
  }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327173418393.png" alt="image-20220327173418393" style="zoom:67%;" />

### 需求12 排序：按每种颜色的平均销售额降序排序

```apl
GET /tvs/_search 
{
  "size": 0,
  "aggs": {
    "group_by_color": {
      "terms": {
        "field": "color",
        "order": {
          "avg_price": "asc"
        }
      },
      "aggs": {
        "avg_price": {
          "avg": {
            "field": "price"
          }
        }
      }
    }
  }
}
```

相当于sql子表数据字段可以立刻使用。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327173233834.png" alt="image-20220327173233834" style="zoom:50%;" />

### 需求13 排序：按每种颜色的每种品牌平均销售额降序排序

```apl
GET /tvs/_search  
{
  "size": 0,
  "aggs": {
    "group_by_color": {
      "terms": {
        "field": "color"
      },
      "aggs": {
        "group_by_brand": {
          "terms": {
            "field": "brand",
            "order": {
              "avg_price": "desc"
            }
          },
          "aggs": {
            "avg_price": {
              "avg": {
                "field": "price"
              }
            }
          }
        }
      }
    }
  }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327173152610.png" alt="image-20220327173152610" style="zoom: 50%;" />



# ES7 SQL新特性

## 简介

Elasticsearch SQL是一个X-Pack组件，它允许针对Elasticsearch实时执行类似SQL的查询。无论使用REST接口，命令行还是JDBC，任何客户端都可以使用SQL对Elasticsearch中的数据进行原生搜索和聚合数据。可以将Elasticsearch SQL看作是一种翻译器，它可以将SQL翻译成Query DSL。

Elasticsearch SQL具有如下特性：

- 原生支持：Elasticsearch SQL是专门为Elasticsearch打造的。
- 没有额外的零件：无需其他硬件，处理器，运行环境或依赖库即可查询Elasticsearch，Elasticsearch SQL直接在Elasticsearch内部运行。
- 轻巧高效：Elasticsearch SQL并未抽象化其搜索功能，相反的它拥抱并接受了SQL来实现全文搜索，以简洁的方式实时运行全文搜索。

能以SQL方式进行查找，不是所有索引都能用SQL查询的，**字段中有数组就不能行**

## 第一个SQL查询

我们使用SQL来查询下前10条记录，可以通过`format`参数控制返回结果的格式，txt表示文本格式，看起来更直观点，默认为json格式。

在Kibana的Console中输入如下命令：

format可选

> 直接输出：csv、json、tsv、txt、yaml、
>
> 二进制：cbor、smile

```apl
POST /_sql?format=txt
{
  "query": "SELECT account_number,address,age,balance FROM account LIMIT 10"
}
```

查询结果显示如下。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141507734.png" alt="image-20220814150727642" style="zoom:50%;" />

```java
POST /_sql?format=txt
{
    "query": "SELECT * FROM tvs"
}
```

解决方式，不去查数组字段

```sql
POST /_sql?format=json
{
    "query": "SELECT name,description FROM book"
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327114041741.png" alt="image-20220327114041741" style="zoom: 50%;" />



## 将SQL转化为DSL

当我们需要使用Query DSL时，也可以先使用SQL来查询，然后通过Translate API转换即可。

例如我们翻译以下查询语句：

```apl
POST /_sql/translate
{
  "query": "SELECT account_number,address,age,balance FROM account WHERE age>32 LIMIT 10"
}
```

最终获取到Query DSL结果如下。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141525227.png" alt="image-20220814152504119" style="zoom:67%;" />



## SQL和DSL混合使用⭐

我们还可以将SQL和Query DSL混合使用，比如使用Query DSL来设置过滤条件。

例如查询age在30-35之间的记录，可以使用如下查询语句：

```apl
POST /_sql?format=txt
{
  "query": "SELECT account_number,address,age,balance FROM account",
      "filter": {
        "range": {
            "age": {
                "gte" : 30,
                "lte" : 35
            }
        }
    },
    "fetch_size": 10
}
```

查询结果展示如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141521638.png" alt="image-20220814152105523" style="zoom:67%;" />

## SQL和ES对应关系

| SQL    | ES       | 描述                               |
| :----- | :------- | :--------------------------------- |
| column | field    | 数据库中表的字段与ES中的属性对应   |
| row    | document | 数据库表中的行记录与ES中的文档对应 |
| table  | index    | 数据库中的表与ES中的索引对应       |

## 常用SQL操作

### 语法

在ES中使用SQL查询的语法与在数据库中使用基本一致，具体格式如下：

```sql
SELECT select_expr [, ...]
[ FROM table_name ]
[ WHERE condition ]
[ GROUP BY grouping_element [, ...] ]
[ HAVING condition]
[ ORDER BY expression [ ASC | DESC ] [, ...] ]
[ LIMIT [ count ] ]
[ PIVOT ( aggregation_expr FOR column IN ( value [ [ AS ] alias ] [, ...] ) ) ]
```

### WHERE

可以使用`WHERE`语句设置查询条件，比如查询state字段为VA的记录，查询语句如下。

```apl
POST /_sql?format=txt
{
  "query": "SELECT account_number,address,age,balance,state FROM account WHERE state='VA' LIMIT 10 "
}
```

查询结果展示如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141525976.png" alt="image-20220814152531861" style="zoom:67%;" />

### GROUP BY

我们可以使用`GROUP BY`语句对数据进行分组，统计出分组记录数量，最大age和平均balance等信息，查询语句如下。

```apl
POST /_sql?format=txt
{
  "query": "SELECT state,COUNT(*),MAX(age),AVG(balance) FROM account GROUP BY state LIMIT 10"
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141526022.png" alt="image-20220814152604923" style="zoom:67%;" />

### HAVING

我们可以使用`HAVING`语句对分组数据进行二次筛选，比如筛选分组记录数量大于15的信息，查询语句如下。

```sql
POST /_sql?format=txt
{
  "query": "SELECT state,COUNT(*),MAX(age),AVG(balance) FROM account GROUP BY state HAVING COUNT(*)>15 LIMIT 10"
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141526087.png" alt="image-20220814152628988" style="zoom:67%;" />

### ORDER BY

我们可以使用`ORDER BY`语句对数据进行排序，比如按照balance字段从高到低排序，查询语句如下。

```sql
POST /_sql?format=txt
{
  "query": "SELECT account_number,address,age,balance,state FROM account ORDER BY balance DESC LIMIT 10 "
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141526920.png" alt="image-20220814152646812" style="zoom:67%;" />

### DESCRIBE

我们可以使用`DESCRIBE`语句查看表（ES中为索引）中有哪些字段，比如查看account表的字段，查询语句如下。

```sql
POST /_sql?format=txt
{
  "query": "DESCRIBE account"
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141527204.png" alt="image-20220814152708092" style="zoom:67%;" />

### SHOW TABLES

我们可以使用`SHOW TABLES`查看所有的表（ES中为索引）。

```apl
POST /_sql?format=txt
{
  "query": "SHOW TABLES"
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141527917.png" alt="image-20220814152739812" style="zoom:67%;" />

## 支持的函数

使用SQL查询ES中的数据，不仅可以使用一些SQL中的函数，还可以使用一些ES中特有的函数。

### 查询支持的函数

我们可以使用`SHOW FUNCTIONS`语句查看所有支持的函数，比如搜索所有带有`DATE`字段的函数可以使用如下语句。

```apl
POST /_sql?format=txt
{
  "query": "SHOW FUNCTIONS LIKE '%DATE%'"
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141527908.png" alt="image-20220814152758811" style="zoom:67%;" />

### 全文搜索函数

全文搜索函数是ES中特有的，当使用`MATCH`或`QUERY`函数时，会启用全文搜索功能，`SCORE`函数可以用来统计搜索评分。

#### MATCH()

使用`MATCH`函数查询address中包含Street的记录。

```apl
POST /_sql?format=txt
{
  "query": "SELECT account_number,address,age,balance,SCORE() FROM account WHERE MATCH(address,'Street') LIMIT 10"
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141529084.png" alt="image-20220814152924973" style="zoom:67%;" />

#### QUERY()

使用`QUERY`函数查询address中包含Street的记录。

```sql
POST /_sql?format=txt
{
  "query": "SELECT account_number,address,age,balance,SCORE() FROM account WHERE QUERY('address:Street') LIMIT 10"
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141529298.png" alt="image-20220814152909178" style="zoom:67%;" />

## SQL CLI

如果你不想使用Kibana来使用ES SQL的话，也可以使用ES自带的SQL CLI来查询，该命令位于ES的bin目录下。

使用如下命令启动SQL CLI：

```apl
elasticsearch-sql-cli :9200
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141528821.png" alt="image-20220814152851731" style="zoom:67%;" />

然后直接输入SQL命令即可查询了，注意要加分号。

```apl
SELECT account_number,address,age,balance FROM account LIMIT 10;
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141528389.png" alt="image-20220814152837292" style="zoom:67%;" />

## 局限性

使用SQL查询ES有一定的局限性，没有原生的Query DSL那么强大，对于嵌套属性和某些函数的支持并不怎么好，但是平时用来查询下数据基本够用了。



## java代码实现SQL功能

1前提 es拥有白金版功能

 kibana中管理----->许可管理 开启白金版试用

2导入依赖

```xml
<dependency>
    <groupId>org.elasticsearch.plugin</groupId>
    <artifactId>x-pack-sql-jdbc</artifactId>
    <version>7.3.0</version>
    </dependency>
<repositories>
    <repository>
        <id>elastic.co</id>
        <url>https://artifacts.elastic.co/maven</url>
    </repository>
</repositories>
```

3代码

```java
public static void main(String[] args) {
        try  {
            Connection connection = 
                DriverManager.getConnection("jdbc:es://:9200");
            Statement statement = connection.createStatement();
            ResultSet results = statement.executeQuery(
                    "select * from tvs");
            while(results.next()){
                System.out.println(results.getString(1));
                System.out.println(results.getString(2));
                System.out.println(results.getString(3));
                System.out.println(results.getString(4));
                System.out.println("============================");
            }
        }catch (Exception e){
            e.printStackTrace();
        }
}
```

大型企业可以购买白金版，增加Machine Learning、高级安全性x-pack。



# ES集群

## ES集群结构

单机的elasticsearch做数据存储，必然面临两个问题：海量数据存储问题、单点故障问题。

> - 海量数据存储问题：将索引库从逻辑上拆分为N个分片（shard），存储到多个节点
> - 单点故障问题：将分片数据在不同节点备份（replica ）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209031715186.png" alt="image-20220903171521075" style="zoom:67%;" />

### ES集群相关概念

* 集群（cluster）：一组拥有共同的 cluster name 的 节点。

* <font color="red">节点（node)</font>   ：集群中的一个 Elasticearch 实例

* <font color="red">分片（shard）</font>：索引可以被拆分为不同的部分进行存储，称为分片。在集群环境下，一个索引的不同分片可以拆分到不同的节点中

  解决问题：数据量太大，单点存储量有限的问题。

  <img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20200104124440086-5602723.png" alt="image-20200104124440086" style="zoom:67%;" />

  > 此处，我们把数据分成3片：shard0、shard1、shard2

* 主分片（Primary shard）：相对于副本分片的定义。

* 副本分片（Replica shard）每个主分片可以有一个或者多个副本，数据和主分片一样。


数据备份可以保证高可用，但是每个分片备份一份，所需要的节点数量就会翻一倍，成本实在是太高了！

为了在高可用和成本间寻求平衡，我们可以这样做：

- 首先对数据分片，存储到不同节点
- 然后对每个分片进行备份，放到对方节点，完成互相备份

这样可以大大减少所需要的服务节点数量，如图，我们以3分片，每个分片备份一份为例：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20200104124551912.png" alt="image-20200104124551912" style="zoom:67%;" />

现在，每个分片都有1个备份，存储在3个节点：

- node0：保存了分片0和1
- node1：保存了分片0和2
- node2：保存了分片1和2

### 结点的三个角色

主结点：master节点主要用于集群的管理及索引 比如新增结点、分片分配、索引的新增和删除等。 数据结点：data 节点上保存了数据分片，它负责索引和搜索操作。 客户端结点：client 节点仅作为请求客户端存在，client的作用也作为负载均衡器，client 节点不存数据，只是将请求均衡转发到其它结点。

通过下边两项参数来配置结点的功能：

```apl
node.master: #是否允许为主结点
node.data: #允许存储数据作为数据结点
node.ingest: #是否允许成为协调节点
```

四种组合方式：

```apl
master=true，data=true：即是主结点又是数据结点
master=false，data=true：仅是数据结点
master=true，data=false：仅是主结点，不存储数据
master=false，data=false：即不是主结点也不是数据结点，此时可设置ingest为true表示它是一个客户端。
```

## 分片和副本

> 将数据分片是为了提高可处理数据的容量和易于进行水平扩展，为分片做副本是为了提高集群的稳定性和提高并发量。副本是乘法，越多消耗越大，但也越保险。分片是除法，分片越多，单分片数据就越少也越分散。副本越多，集群的可用性就越高，但是由于每个分片都相当于一个 Lucene 的索引文件，会占用一定的文件句柄、内存及 CPU
>

### 主分片

ES 支持 PB 级全文搜索，当索引上的数据量太大的时候，ES 通过水平拆分的方式将一个索引上的数据拆分出来分配到不同的数据块上，拆分出来的数据库块称之为一个分片。

这类似于 MySQL 的分库分表，只不过 MySQL 分库分表需要借助第三方组件而 ES 内部自身实现了此功能。

在一个多分片的索引中写入数据时，通过路由来确定具体写入哪一个分片中，所以在创建索引的时候需要指定分片的数量，并且分片的数量一旦确定就不能修改。

ES 通过分片的功能使得索引在规模上和性能上都得到提升，每个分片都是 Lucene 中的一个索引文件，每个分片必须有一个主分片和零到多个副本。

- shard(主分片)：我们上边所说的分片其实就指的是主分片，主分片是数据的容器，文档保存在主分片内，主分片又被分配到集群内的各个节点里。每个shard都是一个lucene index。
- replica（副本分片）：副本就是对分片的 Copy ，同步存储主分片的数据内容。为了达到高可用，Master 节点会避免将主分片和副本分片放在同一个节点上，所以副本分片数的最大值是 N-1（其中 N 为节点数）。

分片的数量和副本数量都是可以通过创建索引时的 Settings 来配置，ES 默认为一个索引创建 3 个主分片, 并分别为每个分片创建2个副本分片。

```apl
PUT /myIndex
{
   "settings" : {
      "number_of_shards" : 3,
      "number_of_replicas" : 2
   }
}
```

### 副本（Replicas）

副本就是对分片的 Copy，每个主分片都有一个或多个副本分片，当主分片异常时，副本可以提供数据的查询等操作。

主分片和对应的副本分片是不会在同一个节点上的，所以副本分片数的最大值是 N-1（其中 N 为节点数）。

对文档的新建、索引和删除请求都是写操作，必须在主分片上面完成之后才能被复制到相关的副本分片。

ES 为了提高写入的能力这个过程是并发写的，同时为了解决并发写的过程中数据冲突的问题，ES 通过乐观锁的方式控制，每个文档都有一个` _version` （版本）号，当文档被修改时版本号递增。

一旦所有的副本分片都报告写成功才会向协调节点报告成功，协调节点向客户端报告成功。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207161450696.png" alt="image-20220716145035615" style="zoom:67%;" />

从上图可以看出为了达到高可用，Master 节点会避免将主分片和副本分片放在同一个节点上。

假设这时节点 Node1 服务宕机了或者网络不可用了，那么主节点上主分片 S0 也就不可用了。

幸运的是还存在另外两个节点能正常工作，这时 ES 会重新选举新的主节点，而且这两个节点上存在我们所需要的 S0 的所有数据。

我们会将 S0 的副本分片提升为主分片，这个提升主分片的过程是瞬间发生的。此时集群的状态将会为  Yellow。

为什么我们集群状态是 Yellow 而不是 Green 呢？虽然我们拥有所有的 2 个主分片，但是同时设置了每个主分片需要对应两份副本分片，而此时只存在一份副本分片。所以集群不能为 Green 的状态。

如果我们同样关闭了 Node2 ，我们的程序依然可以保持在不丢失任何数据的情况下运行，因为 Node3 为每一个分片都保留着一份副本。

如果我们重新启动 Node1 ，集群可以将缺失的副本分片再次进行分配，那么集群的状态又将恢复到原来的正常状态。

如果 Node1 依然拥有着之前的分片，它将尝试去重用它们，只不过这时 Node1 节点上的分片不再是主分片而是副本分片了，如果期间有更改的数据只需要从主分片上复制修改的数据文件即可

### 为什么要分片和区分主副分片

ES 通过分片的功能使得索引在规模上和性能上都得到提升，有了 shard 就可以横向扩展，存储更多数据，让搜索和分析等操作分布到多台服务器上去执行，提升吞吐量和性能。

> 读操作：搜索和返回数据可以同时被主分片或副本分片所处理，所以当你拥有越多的副本分片时，也将拥有越高的吞吐量

区分主副分片的原因：任何一个服务器随时可能故障或宕机，此时shard可能就会丢失，如果为每个 shard 创建 replica 副本，当 shard 所在的服务器不可用时，replica 可以提供备用服务，这样就保证了 ES 在失去某个节点的情况下不丢失任何数据。

**举例说明**

![image-20220819204723464](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208192047572.png)

假设这时节点 Node1 服务宕机了或者网络不可用了，那么主节点上主分片 S0 也就不可用了。幸运的是还存在另外两个节点能正常工作，这时 ES 会重新选举新的主节点，而且这两个节点上存在我们所需要的 S0 的所有数据。我们会将 S0 的副本分片提升为主分片，这个提升主分片的过程是瞬间发生的。此时集群的状态将会为  Yellow。为什么我们集群状态是 Yellow 而不是 Green 呢？虽然我们拥有所有的 2 个主分片，但是同时设置了每个主分片需要对应两份副本分片，而此时只存在一份副本分片。所以集群不能为 Green 的状态。如果我们同样关闭了 Node2 ，我们的程序依然可以保持在不丢失任何数据的情况下运行，因为 Node3 为每一个分片都保留着一份副本。如果我们重新启动 Node1 ，集群可以将缺失的副本分片再次进行分配，那么集群的状态又将恢复到原来的正常状态。如果 Node1 依然拥有着之前的分片，它将尝试去重用它们，只不过这时 Node1 节点上的分片不再是主分片而是副本分片了，如果期间有更改的数据只需要从主分片上复制修改的数据文件即可。

**知识点补充**

集群状态通过 绿，黄，红 来标识：

- 绿色：集群健康完好，一切功能齐全正常，所有分片和副本都可以正常工作。
- 黄色：预警状态，所有主分片功能正常，但至少有一个副本是不能正常工作的。此时集群是可以正常工作的，但是高可用性在某种程度上会受影响。
- 红色：集群不可正常使用。某个或某些分片及其副本异常不可用，这时集群的查询操作还能执行，但是返回的结果会不准确。对于分配到这个分片的写入请求将会报错，最终会导致数据的丢失。

### 主分片和副本分片的同步原理

> 写索引是只能写在主分片上，然后同步到副本分片。写操作：对文档的新建、索引和删除请求，必须在主分片上面完成之后才能被复制到相关的副本分片。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208192050396.png" alt="image-20220819205005266" style="zoom:67%;" />

如图所示，上图中有3个节点，4个主分片，8个副本分片，一条数据 ES 是根据什么规则写到特定分片上的呢？首先这肯定不会是随机的，否则将来要获取文档的时候我们就不知道从何处寻找了。实际上，这个过程是根据下面这个公式决定的：

```apl
shard = hash(routing) % number_of_primary_shards
```

Routing 是一个可变值，默认是文档的`_id`，也可以设置成一个自定义的值。Routing 通过 Hash 函数生成一个数字，然后这个数字再除以 number_of_primary_shards （主分片的数量）后得到余数。这个在 0 到 number_of_primary_shards-1 之间的余数，就是我们所寻求的文档所在分片的位置。这就解释了为什么我们要在创建索引的时候就确定好主分片的数量并且永远不会改变这个数量。因为如果数量变化了，那么所有之前路由的值都会无效，文档也再也找不到了。由于在 ES 集群中每个节点通过上面的计算公式都知道集群中的文档的存放位置，所以每个节点都有处理读写请求的能力。在一个写请求被发送到某个节点后，该节点即为前面说过的协调节点，协调节点会根据路由公式计算出需要写到哪个分片上，再将请求转发到该分片的主分片节点上。

ES 为了提高写入的能力这个过程是并发写的，同时为了解决并发写的过程中数据冲突的问题，ES 通过乐观锁的方式控制，每个文档都有一个 `_version` （版本）号，当文档被修改时版本号递增。一旦所有的副本分片都报告写成功才会向协调节点报告成功，协调节点向客户端报告成功。

**举例说明**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208192049094.png" alt="image-20220819204933930" style="zoom:67%;" />

假如此时数据通过路由计算公式取余后得到的值是 shard=hash(routing)%4=0。**则具体流程如下：**

- 客户端向 ES1 节点（协调节点）发送写请求，通过路由计算公式得到值为 0，则当前数据应被写到主分片 S0 上。
- ES1 节点将请求转发到 S0 主分片所在的节点 ES3，ES3 接受请求并写入到磁盘。
- 并发将数据复制到两个副本分片 R0 上，其中通过乐观并发控制数据的冲突。一旦所有的副本分片都报告成功，则节点 ES3 将向协调节点报告成功，协调节点（ES1）向客户端报告成功。

### 副本分片是越多越好吗

答案当然是 no ，原因有以下两点：

（1）多个 replica 可以提升搜索操作的吞吐量和性能，但是如果只是在相同节点数目的集群上增加更多的副本分片并不能提高性能，因为每个分片从节点上获得的资源会变少，这个时候你就需要增加更多的硬件资源来提升吞吐量。

（2）更多的副本分片数提高了数据冗余量，保证了数据的完整性，但是根据上边主副分片之间的交互原理可知，分片间的数据同步会占用一定的网络带宽，影响效率，所以索引的分片数和副本数也不是越多越好。

## 搭建ES集群⭐

### docker-compose.yml

我们会在单机上利用docker容器运行多个es实例来模拟es集群。不过生产环境推荐大家每一台服务节点仅部署一个es的

实例。部署es集群可以直接使用docker-compose来完成，但这要求你的Linux虚拟机至少有**4G**的内存空间

首先编写一个docker-compose文件，内容如下：

```sh
version: '3'
services:
  es01:
    image: elasticsearch:7.17.1
    container_name: es01
    environment:
      - node.name=es01
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=es02,es03
      - cluster.initial_master_nodes=es01,es02,es03
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    volumes:
      - data01:/usr/share/elasticsearch/data
    ports:
      - 9201:9200
    networks:
      - elastic
  es02:
    image: elasticsearch:7.17.1
    container_name: es02
    environment:
      - node.name=es02
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=es01,es03
      - cluster.initial_master_nodes=es01,es02,es03
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    volumes:
      - data02:/usr/share/elasticsearch/data
    ports:
      - 9202:9200
    networks:
      - elastic
  es03:
    image: elasticsearch:7.17.1
    container_name: es03
    environment:
      - node.name=es03
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=es01,es02
      - cluster.initial_master_nodes=es01,es02,es03
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    volumes:
      - data03:/usr/share/elasticsearch/data
    networks:
      - elastic
    ports:
      - 9203:9200
volumes:
  data01:
    driver: local
  data02:
    driver: local
  data03:
    driver: local

networks:
  elastic:
    driver: bridge
```

es运行需要修改一些linux系统权限，修改`/etc/sysctl.conf`文件

```sh
vi /etc/sysctl.conf
```

添加下面的内容：

```sh
vm.max_map_count=262144
```

然后执行命令，让配置生效：

```sh
sysctl -p
```

通过docker-compose启动集群：

```sh
docker-compose up -d
```

成功启动，可以依次访问http://192.168.22.130:9203/

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209031726886.png" alt="image-20220903172658622" style="zoom:80%;" />

### 集群状态监控

可以直接：:9200/_cluster/health，进行查看

kibana可以监控es集群，不过新版本需要依赖es的x-pack 功能，配置比较复杂。

这里推荐使用cerebro来监控es集群状态，官方网址：https://github.com/lmenezes/cerebro

解压即可使用，非常方便。进入对应的bin目录：

双击其中的cerebro.bat文件即可启动服务。

访问:9000 即可进入管理界面：

输入你的elasticsearch的任意节点的地址和端口，点击connect即可：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206270948445.png" alt="image-20220627094805367" style="zoom:67%;" />

绿色的条，代表集群处于绿色（健康状态）。



### 创建索引库

### 利用kibana的DevTools创建索引库

在DevTools中输入指令：

```json
PUT /itcast
{
  "settings": {
    "number_of_shards": 3, // 分片数量
    "number_of_replicas": 1 // 副本数量
  },
  "mappings": {
    "properties": {
      // mapping映射定义 ...
    }
  }
}
```

### 利用cerebro创建索引库

利用cerebro还可以创建索引库：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206270946959.png" alt="image-20210602221409524" style="zoom:67%;" />

填写索引库信息：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206270946967.png" alt="image-20210602221520629" style="zoom:67%;" />

点击右下角的create按钮：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206270946974.png" alt="image-20210602221542745" style="zoom:67%;" />

### 查看分片效果

回到首页，即可查看索引库分片效果：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206270946982.png" alt="image-20210602221914483" style="zoom:67%;" />



## 集群脑裂问题⭐

### 集群职责划分

elasticsearch中集群节点有不同的职责划分：

![image-20210723223008967](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210723223008967.png)

默认情况下，集群中的任何一个节点都同时具备上述四种角色。

但是真实的集群一定要将集群职责分离：

- master节点：对CPU要求高，但是内存要求低
- data节点：对CPU和内存要求都高
- coordinating节点：对网络带宽、CPU要求高

职责分离可以让我们根据不同节点的需求分配不同的硬件去部署。而且避免业务之间的互相干扰。

一个典型的es集群职责划分如图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210723223629142.png" alt="image-20210723223629142" style="zoom:67%;" />



### 脑裂问题

同时如果由于网络或其他原因导致集群中选举出多个 Master 节点，使得数据更新时出现不一致，这种现象称之为脑裂，即集群中不同的节点对于 Master 的选择出现了分歧，出现了多个 Master 竞争。

“脑裂”问题可能有以下几个原因造成：

- **网络问题：** 集群间的网络延迟导致一些节点访问不到 Master，认为 Master 挂掉了从而选举出新的 Master，并对 Master 上的分片和副本标红，分配新的主分片。
- **节点负载：** 主节点的角色既为 Master 又为 Data，访问量较大时可能会导致 ES 停止响应（假死状态）造成大面积延迟，此时其他节点得不到主节点的响应认为主节点挂掉了，会重新选取主节点。
- **内存回收：** 主节点的角色既为 Master 又为 Data，当 Data 节点上的 ES 进程占用的内存较大，引发 JVM 的大规模内存回收，造成 ES 进程失去响应。

为了避免脑裂现象的发生，我们可以从原因着手通过以下几个方面来做出优化措施：

- **适当调大响应时间，减少误判。** 通过参数 discovery.zen.ping_timeout 设置节点状态的响应时间，默认为 3s，可以适当调大。

如果 Master 在该响应时间的范围内没有做出响应应答，判断该节点已经挂掉了。调大参数（如 6s，`discovery.zen.ping_timeout:6`），可适当减少误判。

**选举触发。** 我们需要在候选集群中的节点的配置文件中设置参数 `discovery.zen.munimum_master_nodes` 的值。

这个参数表示在选举主节点时需要参与选举的候选主节点的节点数，默认值是 1，官方建议取值(`master_eligibel_nodes2)+1`，其中 `master_eligibel_nodes` 为候选主节点的个数。

这样做既能防止脑裂现象的发生，也能最大限度地提升集群的高可用性，因为只要不少于 `discovery.zen.munimum_master_nodes` 个候选节点存活，选举工作就能正常进行。

当小于这个值的时候，无法触发选举行为，集群无法使用，不会造成分片混乱的情况。

**角色分离。** 即是上面我们提到的候选主节点和数据节点进行角色分离，这样可以减轻主节点的负担，防止主节点的假死状态发生，减少对主节点“已死”的误判。

脑裂是因为集群中的节点失联导致的。

例如一个集群中，主节点与其它节点失联：

![image-20210723223804995](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210723223804995.png)

此时，node2和node3认为node1宕机，就会重新选主：

![image-20210723223845754](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210723223845754.png)

当node3当选后，集群继续对外提供服务，node2和node3自成集群，node1自成集群，两个集群数据不同步，出现数据差异。

当网络恢复后，因为集群中有两个master节点，集群状态的不一致，出现脑裂的情况：

![image-20210723224000555](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210723224000555.png)



解决脑裂的方案是，要求选票超过 ( eligible节点数量 + 1 ）/ 2 才能当选为主，因此eligible节点数量最好是奇数。对应配置项是discovery.zen.minimum_master_nodes，在es7.0以后，已经成为默认配置，因此一般不会发生脑裂问题

例如：3个节点形成的集群，选票必须超过 （3 + 1） / 2 ，也就是2票。node3得到node2和node3的选票，当选为主。node1只有自己1票，没有当选。集群中依然只有1个主节点，没有出现脑裂。



## 分片插入和查询⭐

当新增文档时，应该保存到不同分片，保证数据均衡，那么coordinating node如何确定数据该存储到哪个分片呢？

### 分片存储测试

#### 配置分片和副本

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209031800477.png" alt="image-20220903180058359" style="zoom:80%;" />

#### 同一节点插入数据

只在一个节点插入三条数据：

http://192.168.22.130:9201/itcast/_doc/5

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210723225006058.png" alt="image-20210723225006058" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210723225034637.png" alt="image-20210723225034637" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210723225112029.png" alt="image-20210723225112029" style="zoom:67%;" />

#### 测试结果

测试可以看到，三条数据分别在不同分片，每一个节点都能查到3条数据：

http://192.168.22.130:9201/itcast/_search

http://192.168.22.130:9202/itcast/_search

http://192.168.22.130:9203/itcast/_search

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209031751066.png" alt="image-20220903175131976" style="zoom: 80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209031800816.png" alt="image-20220903180007703" style="zoom:80%;" />

### 分片插入原理

elasticsearch会通过hash算法来计算文档应该存储到哪个分片：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206270959904.png" alt="image-20220627095914816" style="zoom:67%;" />

说明：

- _routing默认是文档的id
- 算法与分片数量有关，因此索引库一旦创建，分片数量不能修改！

新增文档的流程如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206271000303.png" alt="image-20220627100018200" style="zoom:67%;" />

解读：

- 新增一个id=1的文档
- 对id做hash运算，假如得到的是2，则应该存储到shard-2
- shard-2的主分片在node3节点，将数据路由到node3
- 保存文档
- 同步给shard-2的副本replica-2，在node2节点
- 返回结果给coordinating-node节点

### 分片查询原理

elasticsearch的查询分成两个阶段：

- scatter phase：分散阶段，coordinating node会把请求分发到每一个分片

- gather phase：聚集阶段，coordinating node汇总data node的搜索结果，并处理为最终结果集返回给用户

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210723225809848.png" alt="image-20210723225809848" style="zoom:67%;" />

## 集群故障转移

### 故障转移原理

集群的master节点会监控集群中的节点状态，如果发现有节点宕机，会立即将宕机节点的分片数据迁移到其它节点，确保数据安全，这个叫做故障转移。

1）例如一个集群结构如图：

![image-20210723225945963](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210723225945963.png)

现在，node1是主节点，其它两个节点是从节点。

2）突然，node1发生了故障：

![image-20210723230020574](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210723230020574.png)

宕机后的第一件事，需要重新选主，例如选中了node2：

![image-20210723230055974](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210723230055974.png)

node2成为主节点后，会检测集群监控状态，发现：shard-1、shard-0没有副本节点。因此需要将node1上的数据迁移到node2、node3：

![image-20210723230216642](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210723230216642.png)

### 故障转移示例⭐

#### 停掉es01节点

```apl
docker-compose stop es01
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209031807449.png" alt="image-20220903180737345" style="zoom:80%;" />

#### 查询数据完整性

数据完整，没有问题

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209031809972.png" alt="image-20220903180913871" style="zoom:80%;" />

#### 再启动es01

```apl
docker-compose start es01
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209031809979.png" alt="image-20220903180958874" style="zoom:80%;" />

> 再次进行查询，es01上还是有分配数据，而且es01不再是主节点





# 自动补全

## 自动补全语法

> ES提供了[Completion Suggester](https://www.elastic.co/guide/en/elasticsearch/reference/7.6/search-suggesters.html)查询来实现自动补全功能。这个查询会匹配以用户输入内容开头的词条并返回。为了提高补全查询的效率，对于文档中字段的类型有一些约束：

> - 参与补全查询的**字段必须是completion类型**。
> - 字段的内容一般是**用来补全的多个词条形成的数组，这样能多词条提示**。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206261702351.png" alt="image-20220626170224243" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209041649406.png" alt="image-20220904164921307" style="zoom:80%;" />

## 自动补全示例

比如，一个这样的索引库：

```apl
# 自动补全的索引库
PUT test
{
  "mappings": {
    "properties": {
      "title":{
        "type": "completion"
      }
    }
  }
}
```

然后插入下面的数据：

```apl
# 示例数据
POST test/_doc
{
   "title": ["Sony", "WH-1000XM3"]
}
POST test/_doc
{
   "title": ["SK-II", "PITERA"]
}
POST test/_doc
{
   "title": ["Nintendo", "switch"]
}
```

查询的DSL语句如下：

> - "title_suggest"，自定义名称
>
> - "text": "s",查询关键字
> - "field": "title", // 补全查询的字段
> - "skip_duplicates": true, // 跳过重复的
> - "size": 10 // 获取前10条结果

```apl
# 自动补全查询
POST /test/_search
{
  "suggest": {
    "title_suggest": {
      "text": "s",
      "completion": {
        "field": "title", 
        "skip_duplicates": true, 
        "size": 10 
      }
    }
  }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327095144203.png" alt="image-20220327095144203" style="zoom: 67%;" />

具体见实战篇和整合篇笔记

# 数据同步

## 同步方案

### 同步双写

这是能想到的最直接的方式，在写入MySQL，直接也同步往ES里写一份数据。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210723214931869.png" alt="image-20210723214931869" style="zoom:67%;" />

对于这种方式：

- 优点：实现简单

- 缺点：

- - 业务耦合，商品的管理中耦合大量数据同步代码
  - 影响性能，写入两个存储，响应时间变长
  - 不便扩展：搜索可能有一些个性化需求，需要对数据进行聚合，这种方式不便实现

### 异步双写(使用)

> 我们也很容易想到异步双写的办法，上架商品的时候，先把商品数据丢进MQ，为了解耦合，我们一般会拆分一个搜索服务，由搜索服务去订阅商品变动的消息，来完成同步。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210723215140735.png" alt="image-20210723215140735" style="zoom:67%;" />

前面说的，一些数据需要聚合处理成类似宽表的结构怎么办呢？例如商品库的商品品类、spu、sku表是分开的，但是查询是跨维度的，在ES里再聚合一次效率就低一些，最好就是把商品的数据给聚合起来，在ES里以类似大宽表的形式存储，这样一来查询效率就高一些。这种其实没什么好办法，基本上还是得搜索服务直接查库，或者远程调用，再查询一遍商品的数据库，就是所谓的回查。

### 定时任务

假如我们要快速搞搞，数据量有没那么大，怎么办呢？定时任务也可以。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121429626.png" alt="image-20230112142955494" style="zoom: 33%;" />

定时任务，最麻烦的一点是频率不好选，频率高的话，会非自然地形成业务的波峰，导致存储的CPU、内存占用波峰式上升，频率低的话实时性比较差，而且也有波峰的情况。

### 监听binlog

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210723215518541.png" alt="image-20210723215518541" style="zoom:67%;" />

流程如下：

- 给mysql开启binlog功能
- mysql完成增、删、改操作都会记录在binlog中
- hotel-demo基于canal监听binlog变化，实时更新elasticsearch中的内容

### 优缺点分析

方式一：同步调用

- 优点：实现简单，粗暴
- 缺点：业务耦合度高

方式二：异步通知

- 优点：低耦合，实现难度一般
- 缺点：依赖mq的可靠性

方式三：监听binlog

- 优点：完全解除服务间耦合
- 缺点：开启binlog增加数据库负担、实现复杂度高

## ES同步(canal-adapter)

可以将MySQL数据增量传入到ES中，将我们下载好的压缩包`canal.adapter-1.1.5-SNAPSHOT.tar.gz`上传到Linux服务器，然后解压到指定目录`/mydata/canal-adpter`，解压完成后目录结构如下；

```apl
mkdir canalAdapter
tar -xvf canal.adapter-1.1.5-SNAPSHOT.tar.gz -C canalAdapter
cd canalAdapter
```

### 目录结构

```c
├── bin
│   ├── adapter.pid
│   ├── restart.sh
│   ├── startup.bat
│   ├── startup.sh
│   └── stop.sh
├── conf
│   ├── application.yml
│   ├── es6
│   ├── es7
│   │   ├── biz_order.yml
│   │   ├── customer.yml
│   │   └── product.yml
│   ├── hbase
│   ├── kudu
│   ├── logback.xml
│   ├── META-INF
│   │   └── spring.factories
│   └── rdb
├── lib
├── logs
│   └── adapter
│       └── adapter.log
└── plugin
```

### 配置文件

修改配置文件`conf/application.yml`，按如下配置即可，主要是修改canal-server配置、数据源配置和客户端适配器配置；

```yml
server:
  port: 8081
spring:
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
    default-property-inclusion: non_null

canal.conf:
  mode: tcp # 客户端的模式，可选tcp kafka rocketMQ
  flatMessage: true # 扁平message开关, 是否以json字符串形式投递数据仅在kafka/rocketMQ模式下有效
  zookeeperHosts: # 对应集群模式下的zk地址
  #syncBatchSize: 1000 # 每次同步的批数量，注意：这边注释为了同步快
  retries: 0 # 重试次数, -1为无限重试
  timeout: # 同步超时时间, 单位毫秒
  accessKey:
  secretKey:
  consumerProperties:
    # canal tcp consumer
    canal.tcp.server.host: 127.0.0.1:11111 #设置canal-server的地址
    canal.tcp.zookeeper.hosts:
    #canal.tcp.batch.size: 500 # 注意：这边注释为了同步快
    canal.tcp.username:
    canal.tcp.password:
    
  srcDataSources:  # MySQL源数据库配置
    defaultDS:
      url: jdbc:mysql://192.168.22.130:3306/books?useUnicode=true
      username: canal
      password: canal
  canalAdapters: # 适配器列表
  - instance: example # canal实例名或者MQ topic名
    groups: # 分组列表
    - groupId: g1 # 分组id, 如果是MQ模式将用到该值
      outerAdapters:
      - name: logger # 日志打印适配器
      - name: es7 # 注意：这边es7对应目录名称,必须对应写上，原来是es，写错无法同步
        hosts: 192.168.22.130:9200 # 127.0.0.1:9200 for rest mode
        properties:
          mode: rest
          # security.auth: test:123456 #  only used for rest mode
          # cluster.name: elasticsearch
```

添加配置文件`canal-adapter/conf/es7/product.yml`，用于配置MySQL中的表与Elasticsearch中索引的映射关系；注意：看SQL

```yml
dataSourceKey: defaultDS # 源数据源的key, 对应上面配置的srcDataSources中的值
destination: example  # canal的instance或者MQ的topic
groupId: g1 # 对应MQ模式下的groupId, 只会同步对应groupId的数据
esMapping:
  _index: canal_product # es 的索引名称
  _id: id  # es 的_id, 如果不配置该项必须配置下面的pk项_id则会由es自动分配
  sql: "SELECT
         p.id AS id,
         p.title,
         p.sub_title,
         p.price,
         p.pic
         FROM
         product p"        # sql映射
  upsert: true #更新时es没有对应数据则会在更新时顺便插入
  etlCondition: "where a.c_time>={}"   #etl的条件参数
  commitBatch: 3000   # 提交批大小
```

使用`startup.sh`脚本启动`canal-adapter`服务；

启动有点慢，稍微等等

```c
sh bin/startup.sh
sh bin/stop.sh 
```

启动成功后可使用如下命令查看服务日志信息；

```c
tail -f logs/adapter/adapter.log
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205251843818.png" alt="image-20220525184306550" style="zoom:80%;" />

### ES配置

> 经过上面的一系列步骤，canal的数据同步功能已经基本可以使用了，下面我们来演示下数据同步功能。

首先我们需要在Elasticsearch中创建索引，和MySQL中的product表相对应，直接在Kibana的`Dev Tools`中使用如下命令创建即可；

```yml
PUT canal_product
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text"
      },
      "sub_title": {
        "type": "text"
      },
      "pic": {
        "type": "text"
      },
      "price": {
        "type": "double"
      }
    }
  }
}
```

创建完成后可以查看下索引的结构；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205251844745.png" alt="image-20220525184432690" style="zoom:67%;" />

### 增删改查测试

之后使用如下SQL语句在数据库中创建一条记录；

```sql
INSERT INTO product ( id, title, sub_title, price, pic ) VALUES (null, '小米8', ' 全面屏游戏智能手机 6GB+64GB', 1999.00, NULL );
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205252229024.png" alt="image-20220525222944802" style="zoom:80%;" />

创建成功后，在Elasticsearch中搜索下，发现数据已经同步了；

```apl
GET canal_product/_search
```

再使用如下SQL对数据进行修改；

```sql
UPDATE product SET title='小米10' WHERE id=1
```

修改成功后，在Elasticsearch中搜索下，发现数据已经修改了；

再使用如下SQL对数据进行删除操作；

```sql
DELETE FROM product WHERE id=5
```

删除成功后，在Elasticsearch中搜索下，发现数据已经删除了，至此MySQL同步到Elasticsearch的功能完成



# ES安全保护

> 在[《你居然还去服务器上捞日志，搭个日志收集系统难道不香么！》](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247485508&idx=1&sn=d1d96893a1a3131dd8ef2e8df16d4d02&scene=21#wechat_redirect)一文中我们介绍过ELK日志收集系统的搭建，由于我们的Kibana没有任何安全保护机制，如果部署到公网上去的话，任何人都可以查看你的日志了。日志暴露在网络上可不是件好事情，今天教大家如何给Kibana设置登录认证来保护它。

> 由于Kibana的日志信息都存储在Elasticsearch中，所以只要给Elasticsearch开启`X-PACK`中的安全功能，并给预置的账号设置好密码即可。Elasticsearch设置好之后，就可以在Kibana中对用户、角色、权限进行管理了，本文使用的ELK组件版本均为`7.6.2`。
>

## Elasticsearch设置密码

修改Elasticsearch的配置文件并开启`X-PACK`中的安全功能，该配置文件在安装目录的`config`文件夹下面，例如`elasticsearch-7.6.2\config\elasticsearch.yml`；

```apl
http.cors.enabled: true
http.cors.allow-origin: "*"
http.cors.allow-headers: Authorization
xpack.security.enabled: true
xpack.security.transport.ssl.enabled: true
```

启动Elasticsearch服务，启动命令在`bin`目录下，例如`elasticsearch-7.6.2\bin\elasticsearch.bat`；

在`bin`目录下使用如下命令`elasticsearch-setup-passwords interactive`修改预置账号的密码，期间需要设置多个账号密码，我都设置成了`123456`；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208131020520.png" alt="image-20220813102049424" style="zoom: 67%;" />

期间设置了好几个账号，我们先来了解下这些账号都有啥作用吧；

```js
elastic：超级管理员账号
kibana：Kibana访问专用账号
logstash_system：Logstash访问专用账号
beats_system：FileBeat访问专用账号
apm_system：APM系统专用账号
remote_monitoring_user：远程监控账号
```

接下来我们需要在Kibana的配置文件中添加可以访问Elasticsearch的账号，该配置文件在安装目录的`config`文件夹下面，例如`kibana-7.6.2\config\kibana.yml`；

```apl
elasticsearch.username: "kibana"
elasticsearch.password: "123456"
```

启动Kibana服务，启动命令在`bin`目录下，例如`kibana-7.6.2\bin\kibana.bat`；

当Kibana启动完成后，我们访问的时就需要登录认证了，使用超级管理员账号`elastic:123456`可以进行登录，访问地址：:5601

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208131029328.png" alt="image-20220813102959233" style="zoom:50%;" />

登录成功后，在我们的`Management`选项中可以找到安全相关的配置，在此我们可以对用户、角色、权限进行设置。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208131031879.png" alt="image-20220813103155741" style="zoom:67%;" />

## SpringBoot安全访问

> 由于Elasticsearch开启`X-PACK`中的安全功能，当我们的SpringBoot应用访问Elasticsearch时，也需要设置用户名和密码了！

我们可以直接在SpringBoot中设置超级管理员账号，但这不是个好办法，我们还是自己建个角色和账号吧！

首先在Kibana中创建一个应用访问专用的角色`app_user`；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208131035938.png" alt="image-20220813103510805" style="zoom:67%;" />

创建一个用户并配置好该角色，账号密码为`app:123456`；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208131035512.png" alt="image-20220813103559404" style="zoom:67%;" />

修改SpringBoot应用的配置文件`application.yml`，配置好账号密码即可正常访问了！

```yml
spring:
  elasticsearch:
    rest:
      uris: :9200
      username: app
      password: 123456
```

## Logstash安全访问

> 由于Elasticsearch开启`X-PACK`中的安全功能，向Elasticsearch输出日志的Logstash也需要设置用户名和密码了！

首先修改我们原来的Logstash配置文件`logstash.conf`，在`output`节点下设置访问Elasticsearch的用户名和密码，直接使用我们创建的`app:123456`账号即可；

```
input {
  tcp {
    mode => "server"
    host => "0.0.0.0"
    port => 4560
    codec => json_lines
    type => "debug"
  }
  tcp {
    mode => "server"
    host => "0.0.0.0"
    port => 4561
    codec => json_lines
    type => "error"
  }
  tcp {
    mode => "server"
    host => "0.0.0.0"
    port => 4562
    codec => json_lines
    type => "business"
  }
  tcp {
    mode => "server"
    host => "0.0.0.0"
    port => 4563
    codec => json_lines
    type => "record"
  }
}
filter{
  if [type] == "record" {
    mutate {
      remove_field => "port"
      remove_field => "host"
      remove_field => "@version"
    }
    json {
      source => "message"
      remove_field => ["message"]
    }
  }
}
output {
  elasticsearch {
    hosts => ["localhost:9200"]
    action => "index"
    codec => json
    index => "mall-tiny-%{type}-%{+YYYY.MM.dd}"
    template_name => "mall-tiny"
    user => app
    password => "123456"
  }
}
```

使用指定配置文件启动Logstash服务，启动命令在`bin`目录下，例如`logstash-7.6.2\bin\logstash.bat`；

```
logstash -f logstash.conf
```

接下来在Kibana中就可以查看到应用输出的日志了！

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208131037907.png" alt="image-20220813103709788" style="zoom:67%;" />







