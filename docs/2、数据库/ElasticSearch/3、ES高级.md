



# ES的集群规模⭐

[老板让我牵头搞ELK，我该如何确定ES的集群规模？ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU4MDUyMDQyNQ==&mid=2247511706&idx=1&sn=6acbc7ec305a371486a70f557a6bf277&chksm=fd577e1cca20f70a2fa77d9efa4c368f25a7c5b1f5ea970acfdacecad2ea6884f189a6d37dd1&mpshare=1&scene=23&srcid=1113Qrdj8tnrOiEle8lv1f4A&sharer_sharetime=1668324494164&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

- 一、硬件资源如何分配
- 二、根据数据量确定集群规模
- 三、基准测试
- 四、索引基准测试
- 五、搜索基准测试
- 六、结论

新人使用Elasticsearch可以轻松上手，快速构建高可用集群。当第一个Elasticsearch集群建成后，几分钟就可以实现索引和搜索。但是，对于生产环境集群，必须注意几个问题：

- 有多大把握让集群稳定运行？
- 集群的吞吐量是多少？
- 集群性能如何？
- 集群中是否有足够的可用资源，它们是否易于扩展和维护？
- 集群大小合适吗？

每个人在新项目、新架构部署时都应该思考这些问题。在本文中，我们将深入讨论上面提到的性能、ES集群规模问题。并提供一套方法和建议，帮助你确定ES集群的规模，并对环境进行基准测试。

无论我们定义什么样的系统架构，我们都需要对用例以及我们提供的功能有一个清晰的理解，架构也可能受到现有硬件的约束，比如现有的硬件、公司的全球战略等诸多约束。这些都是我们在规模试验中需要考虑的因素。

调整测试方法，可以得出一套根据数据量计算所需节点数量的方法。为了更好地规划集群的未来性能，还需要对基础设施进行基准测试。性能也取决于用例，所以建议使用最接近实际情况的数据和查询进行测试。

## 硬件资源如何分配

性能取决于Elasticsearch执行什么任务，在什么平台上运行。对于每个搜索或索引操作，都涉及到以下资源：

### 1、磁盘存储

> - 建议尽可能使用 SSD，特别是那些运行搜索和索引操作的节点。由于 SSD 存储的成本较高，建议使用热温架构来减少支出。
> - 在裸机上操作时，本地磁盘才是王道！
> - Elasticsearch 不需要冗余存储（无需 RAID 1/5/10），日志和指标用例通常至少有一个副本分片，这是确保容错性的最低要求，同时又能最大限度地减少写入次数。

### 2、内存

> - **JVM：** 存储关于集群、索引、分片、段和 Fielddata 的元数据。该项较为理想的设置是可用 RAM 的 50%。
> - **OS Cache：** Elasticsearch 将使用剩余的可用内存来缓存数据，避免在全文搜索、对文档值执行聚合和排序期间多次读取磁盘，从而实现性能的极大提升。

### 3、CPU

> Elasticsearch 节点具有线程池和线程队列，它们会使用可用的计算资源。在 Elasticsearch 中，CPU 核心的数量和性能决定着数据操作的平均速度和峰值吞吐量。

### 4、网络

> 网络性能—带宽和延迟会影响节点之间的通信和集群之间的功能，如跨集群搜索和跨集群复制。

## 根据数据量确定集群规模

对于指标和日志用例，通常要管理大量的数据。因此，根据数据量初步确定Elasticsearch的聚类规模是有意义的。在测试开始时，需要考虑以下问题：

- 每天将索引多大量的原始数据 (GB)
- 数据保留多久
- 在 hot tier 存储多久
- 在 warm tier 存储多久
- 强制执行多少个副本分片

在确定规模时，一般增加5%或10%以适应误差，增加15%以保持低于磁盘阈值。此外，最好添加一个故障冗余节点。

### 1、掐指一算

- **数据总量 (GB)** = `每日原始数据量 (GB) * 保留天数 *（副本数 + 1）`
- **存储总量 (GB)** = `数据总量 (GB) *（1 + 0.15 磁盘水位阈值 + 0.1 误差幅度）`
- **数据节点总数** = ROUNDUP（存储总量 (GB) /每个数据节点的内存/内存与数据值比） 在大规模部署的情况下，添加一个节点用于故障转移容量会更安全。

### 2、小规模集群

假设每天1GB的数据，数据存储 9个月。

对于这种小型集群，每个节点分配 8G 内存。那么可以得出:

- **总数据量 (GB)** = `1GB x（9 x 30 天）x 2 = 540GB`
- **总存储量 (GB)** = `540GB x (1+0.15+0.1) = 675GB`
- **总数据节点数** = `675GB 磁盘存储量/ 8GB RAM /内存与数据比 30 = 3 个节点`

基于 Elastic Cloud 上构建部署：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211132258512.png" alt="image-20221113225844258" style="zoom:80%;" />

### 3、大规模集群部署

- 每天产生 100GB 数据，并且需把数据在hot tier 中存储 30 天，在warm tier中存储 12 个月。
- 每个节点有 64GB 的内存，其中 30GB 分配给JVM，其余分配给 OS Cache。
- 所用 hot tier 内存与数据的典型比值是 1:30，warm tier是 1:160。

如果每天接收 100GB 的数据，并且必须将这些数据存储 30 天，那么可以得出：

- **hot tier中的数据总量 (GB)** =`(100GB x 30 天 * 2)= 6000GB`
- **hot tier中的存储总量 (GB)** = `6000GB x (1+0.15+0.1) = 7500GB`
- **hot tier中的数据节点总数** = `ROUNDUP(7500 / 64 / 30) + 1 = 5` 个节点
- **warm tier中的数据总量 (GB)** =`（100GB x 365 天 * 2）= 73000GB`
- **warm tier中的存储总量 (GB)** = `73000GB x (1+0.15+0.1) = 91250GB`
- **warm tier中的数据节点总数** = `ROUNDUP(91250 / 64 / 160) + 1 = 10` 个节点

在 Elastic Cloud 上构建集群：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211132259266.png" alt="image-20221113225928174" style="zoom:80%;" />

## 基准测试

到目前为止，我们已经确定了合适的集群大小。接下来，我们需要确认所获得的值在实际条件下是否能够成立。为了在投入生产环境之前更有信心，我们需要进行基准测试，以确认我们可以实现预期的性能和目标SLA。

在这个基准测试中，我们将使用 Rally。该工具易于部署和执行，并且完全可配置。它可以测试多种场景。

为了简化结果分析，我们将基准分为两部分，即索引和搜索请求。

## 索引基准测试

对于索引基准测试，我们要尝试弄清楚以下几个问题：

- 集群的最大索引吞吐量是多少？
- 每天可以索引的数据量是多少？
- 集群是过大还是过小？

在这项基准测试中，我们将使用一个 3 节点集群，每个节点的配置如下：

- 8 vCPU
- 标准永久磁盘 (HDD)
- 32GB/16 堆

### 索引基准测试 1

这项基准测试使用的数据集是 Metricbeat 数据，规格如下：

- 1,079,600 个文档
- 数据量：1.2GB
- 平均文档大小：1.17 KB

指数的表现也将取决于指数层的表现，在这种情况下是反弹。在这个例子中，我们将执行多个基准测试来找出最佳的批处理大小和最佳的线程数量。

我们将从1个Rally客户开始寻找最佳批量。然后从100开始，在随后的运行中加倍。这表明我们的最佳批处理大小是12，000(大约13.7 MB)，我们每秒可以索引13，000个请求。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211132304275.png" alt="image-20221113230427217" style="zoom:80%;" />

接下来，使用类似的方法，我们发现客户端的最佳数量是16，这使我们能够每秒索引62，000个请求。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211132304912.png" alt="image-20221113230414857" style="zoom:80%;" />

我们集群的最大索引吞吐量每秒可以处理62，000个请求。为了更进一步，我们需要添加一个新的节点。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211132304872.png" alt="image-20221113230402786" style="zoom:80%;" />

我很想知道一个节点可以处理多少个索引请求，所以我在一个节点集群和两个节点集群上执行了相同的跟踪，以观察不同之处。

**结论**

在我的测试环境中，最大索引吞吐量如下：

- 使用1个节点和1个 shard， 每秒得到22，000个请求。
- 使用2个节点和2个shard， 每秒得到43，000个请求。
- 使用3个节点和3个shard， 每秒得到62，000个请求。

任何其他索引请求都将被放入队列，当队列变满时，节点将发送一个拒绝响应。

我们的数据集影响集群的性能，这就是为什么使用您自己的数据来执行这些跟踪非常重要。

**索引基准测试 2**

在接下来的步骤中，使用以下配置对HTTP服务器日志数据执行相同的跟踪：

- **数据量** ：31.1GB
- **文档数** ：247,249,096
- **平均文档大小** ：0.8 KB

最优批量大小为 16,000 个文档。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211132303443.png" alt="image-20221113230349385" style="zoom:80%;" />

得出的最优客户端数为 32 个。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211132303449.png" alt="image-20221113230334385" style="zoom:80%;" />

HTTP 服务器日志数据的最大索引吞吐量为每秒 220,000 个请求。

## 搜索基准测试

为了对搜索性能进行基准测试，我们将考虑使用 20 个客户端，目标吞吐量为 1000 OPS。

对于搜索，我们将执行三项基准测试：

### 1、查询的服务时间

我们将比较一组查询的服务时间 (90%)。

**1）Metricbeat 数据集**

- auto-date-historgram
- auto-data-histogram-with-tz
- date-histogram
- Date-histogram-with-tz

我们可以观察到，`auto-data-histogram-with-tz` 查询的服务时间更长。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211132303075.png" alt="image-20221113230321025" style="zoom:80%;" />

**2）HTTP 服务器日志数据集**

- Default
- Term
- Range
- Hourly_agg
- Desc_sort_timestamp
- Asc_sort_timestamp

我们可以观察到，desc_sort_timestamp and desc_sort_timestamp 查询的服务时间更长。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211132303878.png" alt="image-20221113230304825" style="zoom:80%;" />

### 2、并行查询的服务时间

我们来看看，如果并行执行查询，90% 服务时间会增加。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211132302343.png" alt="image-20221113230250281" style="zoom:80%;" />

### 3、并行索引的索引率和服务时间

我们将执行并行索引任务和搜索，以查看这些查询的索引率和服务时间。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211132302893.png" alt="image-20221113230238841" style="zoom:80%;" />

我们来看看，当与索引操作并行执行时，查询的 90% 服务时间会增加。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211132302472.png" alt="image-20221113230222426" style="zoom:80%;" />

### 4、读取结果

在 32 个客户端用于索引，20 个用户用于搜索时：

- 索引吞吐量为 173,000，小于先前提到的 220,000。
- 搜索吞吐量为每秒 1000 个请求。



# ES性能优化

## 写入优化⭐⭐

机器配置：3个阿里云ecs节点，16G,4核，机械硬盘

优化前，写入速度平均`3000条/s`，一遇到压测，写入速度骤降，甚至es直接频率gc、oom等；优化后，写入速度平均`8000条/s`，遇到压测，能在压测结束后30分钟内消化完数据，各项指标回归正常。

### 生产配置

这里我先把自己优化的结果贴出来，后面有参数的详解：

elasticsearch.yml中增加如下设置

```yml
indices.memory.index_buffer_size: 20%
indices.memory.min_index_buffer_size: 96mb

# Search pool
thread_pool.search.size: 5
thread_pool.search.queue_size: 100
# 这个参数慎用！强制修改cpu核数，以突破写线程数限制
# processors: 16
# Bulk pool
#thread_pool.bulk.size: 16
thread_pool.bulk.queue_size: 300
# Index pool
#thread_pool.index.size: 16
thread_pool.index.queue_size: 300

indices.fielddata.cache.size: 40%

discovery.zen.fd.ping_timeout: 120s
discovery.zen.fd.ping_retries: 6
discovery.zen.fd.ping_interval: 30s
```

索引优化配置：

```yml
PUT /_template/elk
{
      "order": 6,
      "template": "logstash-*",    #这里配置模板匹配的Index名称
      "settings": {
        "number_of_replicas" : 0,    #副本数为0,需要查询性能高可以设置为1
        "number_of_shards" :   6,    #分片数为6, 副本为1时可以设置成5
         "refresh_interval": "30s",
         "index.translog.durability": "async",
        "index.translog.sync_interval": "30s"

      }
}
```

### 优化参数详解

**精细设置全文域：** string类型字段默认会分词，不仅会额外占用资源，而且会影响创建索引的速度。所以，把不需要分词的字段设置为`not_analyzed`

**禁用_all字段:** 对于日志和apm数据，目前没有场景会使用到

**副本数量设置为0:** 因为我们目前日志数据和apm数据在es只保留最近7天的量，全量日志保存在hadoop，可以根据需要通过spark读回到es – 况且副本数量是可以随时修改的，区别分片数量

**使用es自动生成id：** es对于自动生成的id有优化，避免了版本查找。因为其生成的id是唯一的

**设置index.refresh_interval：** 索引刷新间隔，默认为1s。因为不需要如此高的实时性，我们修改为30s – 扩展学习：刷新索引到底要做什么事情

**设置段合并的线程数量：**

```apl
curl -XPUT 'your-es-host:9200/nginx_log-2018-03-20/_settings' -d '{ 
   "index.merge.scheduler.max_thread_count" : 1
}'
```

段合并的计算量庞大，而且还要吃掉大量磁盘I/O。合并在后台定期操作，因为他们可能要很长时间才能完成，尤其是比较大的段

机械磁盘在并发I/O支持方面比较差，所以我们需要降低每个索引并发访问磁盘的线程数。这个设置允许`max_thread_count + 2`个线程同时进行磁盘操作，也就是设置为1允许三个线程

> 扩展学习：什么是段(segment)？如何合并段？为什么要合并段？（what、how、why）

1.设置异步刷盘事务日志文件：

```apl
"index.translog.durability": "async",
"index.translog.sync_interval": "30s"
```

对于日志场景，能够接受部分数据丢失。同时有全量可靠日志存储在hadoop，丢失了也可以从hadoop恢复回来

2.elasticsearch.yml中增加如下设置：

```apl
indices.memory.index_buffer_size: 20%
indices.memory.min_index_buffer_size: 96mb
```

已经索引好的文档会先存放在内存缓存中，等待被写到到段(segment)中。缓存满的时候会触发段刷盘(吃i/o和cpu的操作)。默认最小缓存大小为48m，不太够，最大为堆内存的10%。对于大量写入的场景也显得有点小。

> 扩展学习：数据写入流程是怎么样的(具体到如何构建索引)？

1.设置index、merge、bulk、search的线程数和队列数。例如以下elasticsearch.yml设置：

```yml
# Search pool
thread_pool.search.size: 5
thread_pool.search.queue_size: 100
# 这个参数慎用！强制修改cpu核数，以突破写线程数限制
# processors: 16
# Bulk pool
thread_pool.bulk.size: 16
thread_pool.bulk.queue_size: 300
# Index pool
thread_pool.index.size: 16
thread_pool.index.queue_size: 300
```

2.设置filedata cache大小，例如以下elasticsearch.yml配置：

```apl
indices.fielddata.cache.size: 15%
```

filedata cache的使用场景是一些聚合操作(包括排序),构建filedata cache是个相对昂贵的操作。所以尽量能让他保留在内存中

然后日志场景聚合操作比较少，绝大多数也集中在半夜，所以限制了这个值的大小，默认是不受限制的，很可能占用过多的堆内存

> 扩展学习：什么是filedata？构建流程是怎样的？为什么要用filedata？（what、how、why）

1.设置节点之间的故障检测配置，例如以下elasticsearch.yml配置：

```apl
discovery.zen.fd.ping_timeout: 120s
discovery.zen.fd.ping_retries: 6
discovery.zen.fd.ping_interval: 30s
```

大数量写入的场景，会占用大量的网络带宽，很可能使节点之间的心跳超时。并且默认的心跳间隔也相对过于频繁（1s检测一次）

此项配置将大大缓解节点间的超时问题



## 存储设备

磁盘在现代服务器上通常都是瓶颈。Elasticsearch 重度使用磁盘，你的磁盘能处理的吞吐量越大，你的节点就越稳定。

这里有一些优化磁盘 I/O 的技巧：

- 使用 SSD。就像其他地方提过的， 他们比机械磁盘优秀多了。
- 使用 RAID 0。条带化 RAID 会提高磁盘 I/O，代价显然就是当一块硬盘故障时整个就故障了。不要使用镜像或者奇偶校验 RAID 因为副本已经提供了这个功能。
- 另外，使用多块硬盘，并允许 Elasticsearch 通过多个 path.data 目录配置把数据条带化分配到它们上面。
- 不要使用远程挂载的存储，比如 NFS 或者 SMB/CIFS。这个引入的延迟对性能来说完全是背道而驰的。
- 如果你用的是 EC2，当心 EBS。即便是基于 SSD 的 EBS，通常也比本地实例的存储要慢。

## 索引性能优化

1、**批量写入**，看每条数据量的大小，一般都是几百到几千。

2、**多线程写入**，写入线程数一般和机器数相当，可以配多种情况，在测试环境通过Kibana观察性能曲线。

3、**增加segments的刷新时间**，通过上面的原理知道，segment作为一个最小的检索单元，比如segment有50个，目的需要查10条数据，但需要从50个segment，分别查询10条，共500条记录，再进行排序或者分数比较后，截取最前面的10条，丢弃490条。在我们的案例中将此 **"refresh_interval": "-1"** ，程序批量写入完成后进行手工刷新(调用相应的API即可)。

4、内存分配方面，很多文章已经提到，**给系统50%的内存给Lucene做文件缓存，它任务很繁重，所以ES节点的内存需要比较多(比如每个节点能配置64G以上最好）**。

5、**磁盘方面配置SSD**，机械盘做阵列RAID5 RAID10虽然看上去很快，但是随机IO还是SSD好。

6、使用自动生成的ID，在我们的案例中使用自定义的KEY，也就是与HBase的ROW KEY，是为了能根据rowkey删除和更新数据，性能下降不是很明显。

7、关于段合并，合并在后台定期执行，比较大的segment需要很长时间才能完成，为了减少对其他操作的影响(如检索)，elasticsearch进行阈值限制，默认是20MB/s，可配置的数："indices.store.throttle.max_bytes_per_sec" : "200mb"  （根据磁盘性能调整）合并线程数默认是：Math.max(1, Math.min(4, Runtime.getRuntime().availableProcessors() / 2))，如果是机械磁盘，可以考虑设置为1：index.merge.scheduler.max_thread_count: 1，在我们的案例中使用SSD，配置了6个合并线程。



## 调整配置参数

调整配置参数建议如下：

- 给每个文档指定有序的具有压缩良好的序列模式 ID，避免随机的 UUID-4 这样的 ID，这样的 ID 压缩比很低，会明显拖慢 Lucene。

- 对于那些不需要聚合和排序的索引字段禁用 Doc values。Doc Values 是有序的基于 `document=>field value` 的映射列表。

- 不需要做模糊检索的字段使用 Keyword 类型代替 Text 类型，这样可以避免在建立索引前对这些文本进行分词。

- 如果你的搜索结果不需要近实时的准确度，考虑把每个索引的 `index.refresh_interval` 改到 30s 。

  如果你是在做大批量导入，导入期间你可以通过设置这个值为 -1 关掉刷新，还可以通过设置 `index.number_of_replicas: 0` 关闭副本。别忘记在完工的时候重新开启它。

- 避免深度分页查询建议使用 Scroll 进行分页查询。普通分页查询时，会创建一个 `from+size` 的空优先队列，每个分片会返回 `from+size` 条数据，默认只包含文档 ID 和得分 Score 给协调节点。

  如果有 N 个分片，则协调节点再对（from+size）×n 条数据进行二次排序，然后选择需要被取回的文档。当 from 很大时，排序过程会变得很沉重，占用 CPU 资源严重。

- 减少映射字段，只提供需要检索，聚合或排序的字段。其他字段可存在其他存储设备上，例如 Hbase，在 ES 中得到结果后再去 Hbase 查询这些字段。

- 创建索引和查询时指定路由 Routing 值，这样可以精确到具体的分片查询，提升查询效率。路由的选择需要注意数据的分布均衡。

## JVM 调优

JVM 调优建议如下：

- 确保堆内存最小值（ Xms ）与最大值（ Xmx ）的大小是相同的，防止程序在运行时改变堆内存大小。Elasticsearch 默认安装后设置的堆内存是 1GB。可通过` ../config/jvm.option` 文件进行配置，但是最好不要超过物理内存的50%和超过 32GB。
- GC 默认采用 CMS 的方式，并发但是有 STW 的问题，可以考虑使用 G1 收集器。
- ES 非常依赖文件系统缓存（Filesystem Cache），快速搜索。一般来说，应该至少确保物理上有一半的可用内存分配到文件系统缓存。

## 第一部分：调优索引速度

**使用批量请求批量请求将产生比单文档索引请求好得多的性能**

为了知道批量请求的最佳大小，您应该在具有单个分片的单个节点上运行基准测试。首先尝试索引100个文件，然后是200，然后是400，等等。当索引速度开始稳定时，您知道您达到了数据批量请求的最佳大小。在配合的情况下，最好在太少而不是太多文件的方向上犯错。请注意，如果群集请求太大，可能会使群集受到内存压力，因此建议避免超出每个请求几十兆字节，即使较大的请求看起来效果更好。

**发送端使用多worker/多线程向es发送数据 发送批量请求的单个线程不太可能将Elasticsearch群集的索引容量最大化。为了使用集群的所有资源，您应该从多个线程或进程发送数据。除了更好地利用集群的资源，这应该有助于降低每个fsync的成本。**

请确保注意TOO_MANY_REQUESTS（429）响应代码（Java客户端的EsRejectedExecutionException），这是Elasticsearch告诉您无法跟上当前索引速率的方式。发生这种情况时，应该再次尝试暂停索引，理想情况下使用随机指数回退。

与批量调整大小请求类似，只有测试才能确定最佳的worker数量。这可以通过逐渐增加工作者数量来测试，直到集群上的I / O或CPU饱和。

### 1.调大 refresh interval

默认的index.refresh_interval是1s，这迫使Elasticsearch每秒创建一个新的分段。增加这个价值（比如说30s）将允许更大的部分flush并减少未来的合并压力。

### 2.加载大量数据时禁用refresh和replicas

如果您需要一次加载大量数据，则应该将index.refresh_interval设置为-1并将index.number_of_replicas设置为0来禁用刷新。这会暂时使您的索引处于危险之中，因为任何分片的丢失都将导致数据 丢失，但是同时索引将会更快，因为文档只被索引一次。初始加载完成后，您可以将index.refresh_interval和index.number_of_replicas设置回其原始值。

### 3.设置参数，禁止OS将es进程swap出去

您应该确保操作系统不会swapping out the java进程，通过禁止swap
（https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-configuration-memory.html）

### 4.为filesystem cache分配一半的物理内存

文件系统缓存将用于缓冲I / O操作。您应该确保将运行Elasticsearch的计算机的内存至少减少到文件系统缓存的一半。

### 5.使用自动生成的id（auto-generated ids）

索引具有显式id的文档时，Elasticsearch需要检查具有相同id的文档是否已经存在于相同的分片中，这是昂贵的操作，并且随着索引增长而变得更加昂贵。通过使用自动生成的ID，Elasticsearch可以跳过这个检查，这使索引更快。

### 6.买更好的硬件

搜索一般是I/O 密集的，此时，你需要

1. 为filesystem cache分配更多的内存
2. 使用SSD硬盘
3. 使用local storage（不要使用NFS、SMB 等remote filesystem）
4. 亚马逊的 弹性块存储（Elastic Block Storage）也是极好的，当然，和local storage比起来，它还是要慢点

如果你的搜索是 CPU-密集的，买好的CPU吧

### 7.加大 indexing buffer size

如果你的节点只做大量的索引，确保index.memory.index_buffer_size足够大，每个分区最多可以提供512 MB的索引缓冲区，而且索引的性能通常不会提高。Elasticsearch采用该设置（java堆的一个百分比或绝对字节大小），并将其用作所有活动分片的共享缓冲区。非常活跃的碎片自然会使用这个缓冲区，而不是执行轻量级索引的碎片。

**默认值是10％，通常很多：例如，如果你给JVM 10GB的内存，它会给索引缓冲区1GB，这足以承载两个索引很重的分片。**

### 8.禁用_field_names字段

_field_names字段引入了一些索引时间开销，所以如果您不需要运行存在查询，您可能需要禁用它。
（_field_names：https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-field-names-field.html）

### 9.剩下的，再去看看 “调优 磁盘使用”吧

（https://www.elastic.co/guide/en/elasticsearch/reference/current/tune-for-disk-usage.html）中有许多磁盘使用策略也提高了索引速度。

## 第二部分-调优搜索速度

### 1.filesystem cache越大越好

为了使得搜索速度更快， es严重依赖filesystem cache

一般来说，需要至少一半的 可用内存 作为filesystem cache，这样es可以在物理内存中 保有 索引的热点区域（hot regions of the index）

### 2.用更好的硬件

搜索一般是I/O bound的，此时，你需要

- 为filesystem cache分配更多的内存
- 使用SSD硬盘
- 使用local storage（不要使用NFS、SMB 等remote filesystem）
- 亚马逊的 弹性块存储（Elastic Block Storage）也是极好的，当然，和local storage比起来，它还是要慢点

如果你的搜索是 CPU-bound，买好的CPU吧

### 3.文档模型（document modeling）

文档需要使用合适的类型，从而使得 search-time operations 消耗更少的资源。咋作呢？
答：避免 join操作。具体是指

- nested 会使得查询慢 好几倍
- parent-child关系 更是使得查询慢几百倍

如果 无需join 能解决问题，则查询速度会快很多

### 4.预索引数据

根据“搜索数据最常用的方式”来最优化索引数据的方式

> 举个例子：
> 所有文档都有price字段，大部分query 在 fixed ranges 上运行 range aggregation。你可以把给定范围的数据 预先索引下。然后，使用 terms aggregation

### 5.Mappings（能用 keyword 最好了）

数字类型的数据，并不意味着一定非得使用numeric类型的字段。

一般来说，存储标识符的 字段（书号ISBN、或来自数据库的 标识一条记录的 数字），使用keyword更好（integer，long 不好哦，亲）

### 6.避免运行脚本

一般来说，脚本应该避免。如果他们是绝对需要的，你应该使用painless和expressions引擎。

### 7.搜索rounded 日期

日期字段上使用now，一般来说不会被缓存。但，rounded date则可以利用上query cache

rounded到分钟等

### 8.强制merge只读的index

只读的index可以从“merge成 一个单独的 大segment”中收益

### 9.预热 全局序数（global ordinals）

全局序数 用于 在 keyword字段上 运行 terms aggregations

es不知道 哪些fields 将 用于/不用于 term aggregation，因此 全局序数 在需要时才加载进内存

但，可以在mapping type上，定义 eager_global_ordinals==true，这样，refresh时就会加载 全局序数

### 10.预热 filesystem cache

机器重启时，filesystem cache就被清空。OS将index的热点区域（hot regions of the index）加载进filesystem cache是需要花费一段时间的。

设置 index.store.preload 可以告知OS 这些文件需要提早加载进入内存

**11.使用索引排序来加速连接**

索引排序对于以较慢的索引为代价来加快连接速度非常有用。在索引分类文档中阅读更多关于它的信息。

**12.使用preference来优化高速缓存利用率**

有多个缓存可以帮助提高搜索性能，例如文件系统缓存，请求缓存或查询缓存。然而，所有这些缓存都维护在节点级别，这意味着如果连续运行两次相同的请求，则有一个或多个副本，并使用循环（默认路由算法），那么这两个请求将转到不同的分片副本，阻止节点级别的缓存帮助。

由于搜索应用程序的用户一个接一个地运行类似的请求是常见的，例如为了分析索引的较窄的子集，使用标识当前用户或会话的优选值可以帮助优化高速缓存的使用。

**13.副本可能有助于吞吐量，但不会一直存在**

除了提高弹性外，副本可以帮助提高吞吐量。例如，如果您有单个分片索引和三个节点，则需要将副本数设置为2，以便共有3个分片副本，以便使用所有节点。

现在假设你有一个2-shards索引和两个节点。在一种情况下，副本的数量是0，这意味着每个节点拥有一个分片。在第二种情况下，副本的数量是1，这意味着每个节点都有两个碎片。哪个设置在搜索性能方面表现最好？通常情况下，每个节点的碎片数少的设置将会更好。

原因在于它将可用文件系统缓存的份额提高到了每个碎片，而文件系统缓存可能是Elasticsearch的1号性能因子。同时，要注意，没有副本的设置在发生单个节点故障的情况下会出现故障，因此在吞吐量和可用性之间进行权衡。

那么复制品的数量是多少？如果您有一个具有num_nodes节点的群集，那么num_primaries总共是主分片，如果您希望能够一次处理max_failures节点故障，那么正确的副本数是max（max_failures，ceil（num_nodes / num_primaries） - 1）。

**14.打开自适应副本选择**

当存在多个数据副本时，elasticsearch可以使用一组称为自适应副本选择的标准，根据包含分片的每个副本的节点的响应时间，服务时间和队列大小来选择数据的最佳副本。这可以提高查询吞吐量并减少搜索量大的应用程序的延迟。

## 第三部分：通用的一些建议

### 1、不要返回大的结果集

es设计来作为搜索引擎，它非常擅长返回匹配query的top n文档。但，如“返回满足某个query的 所有文档”等数据库领域的工作，并不是es最擅长的领域。如果你确实需要返回所有文档，你可以使用Scroll API

### 2、避免大的doc即单个doc 小会更好

given that(考虑到) http.max_context_length默认==100MB，es拒绝索引操作100MB的文档。当然你可以提高这个限制，但，Lucene本身也有限制的，其为2GB
即使不考虑上面的限制，大的doc 会给 network/memory/disk带来更大的压力；

- 任何搜索请求，都需要获取 _id 字段，由于filesystem cache工作方式。即使它不请求 _source字段，获取大doc _id 字段消耗更大
- 索引大doc时消耗内存会是 doc本身大小 的好几倍
- 大doc的 proximity search, highlighting 也更加昂贵。它们的消耗直接取决于doc本身的大小

### 3、避免稀疏

- 不相关数据 不要 放入同一个索引
- 一般化文档结构（Normalize document structures）
- 避免类型
- 在 稀疏 字段上，禁用 norms & doc_values 属性

**稀疏为什么不好？**

Lucene背后的数据结构 更擅长处理 紧凑的数据

text类型的字段，norms默认开启；numerics, date, ip, keyword，doc_values默认开启
Lucene内部使用 integer的doc_id来标识文档 和 内部API交互。

> 举个例子：
> 使用match查询时生成doc_id的迭代器，这些doc_id被用于获取它们的norm，以便计算score。当前的实现是每个doc中保留一个byte用于存储norm值。获取norm值其实就是读取doc_id位置处的一个字节

这非常高效，Lucene通过此值可以快速访问任何一个doc的norm值；但，给定一个doc，即使某个field没有值，仍需要为此doc的此field保留一个字节

doc_values也有同样的问题。2.0之前的fielddata被现在的doc_values所替代了。

稀疏性 最明显的影响是 对存储的需求（任何doc的每个field，都需要一个byte）；但是呢，稀疏性 对 索引速度和查询速度 也是有影响的，因为：即使doc并没有某些字段值，但，索引时，依然需要写这些字段，查询时，需要skip这些字段的值

某个索引中拥有少量稀疏字段，这完全没有问题。但，这不应该成为常态

稀疏性影响最大的是 norms&doc_values ，但，倒排索引（用于索引 text以及keyword字段），二维点（用于索引geo_point字段）也会受到较小的影响

**如何避免稀疏呢？**

1、不相关数据 不要 放入同一个索引
给个tip：索引小（即：doc的个数较少），则，primary shard也要少

2、一般化文档结构（Normalize document structures）

3、避免类型（Avoid mapping type）
同一个index，最好就一个mapping type。在同一个index下面，使用不同的mapping type来存储数据，听起来不错，但，其实不好。given that(考虑到)每一个mapping type会把数据存入 同一个index，因此，多个不同mapping type，各个的field又互不相同，这同样带来了稀疏性 问题

4、在 稀疏 字段上，禁用 norms & doc_values 属性

- norms用于计算score，无需score，则可以禁用它（所有filtering字段，都可以禁用norms）
- doc_vlaues用于sort&aggregations，无需这两个，则可以禁用它
  但是，不要轻率的做出决定，因为 norms&doc_values无法修改。只能reindex

**秘诀1：混合 精确查询和提取词干（mixing exact search with stemming）**

对于搜索应用，提取词干（stemming）都是必须的。例如：查询 skiing时，ski和skis都是期望的结果

但，如果用户就是要查询skiing呢？

解决方法是：使用multi-field。同一份内容，以两种不同的方式来索引存储
query.simple_query_string.quote_field_suffix，竟然是 查询完全匹配的

**秘诀2：获取一致性的打分**

score不能重现
同一个请求，连续运行2次，但，两次返回的文档顺序不一致。这是相当坏的用户体验

如果存在 replica，则就可能发生这种事，这是因为：
search时，replication group中的shard是按round-robin方式来选择的，因此两次运行同样的请求，请求如果打到 replication group中的不同shard，则两次得分就可能不一致

那问题来了，“你不是整天说 primary和replica是in-sync的，是完全一致的”嘛，为啥打到“in-sync的，完全一致的shard”却算出不同的得分？

原因就是标注为“已删除”的文档。如你所知，doc更新或删除时，旧doc并不删除，而是标注为“已删除”，只有等到 旧doc所在的segment被merge时，“已删除”的doc才会从磁盘删除掉

索引统计（index statistic）是打分时非常重要的一部分，但，由于 deleted doc 的存在，在同一个shard的不同copy（即：各个replica）上 计算出的 索引统计 并不一致

个人理解：

- 所谓 索引统计 应该就是df，即 doc_freq
- 索引统计 是基于shard来计算的

搜索时，“已删除”的doc 当然是 永远不会 出现在 结果集中的
索引统计时，for practical reasons，“已删除”doc 依然是统计在内的

假设，shard A0 刚刚完成了一次较大的segment merge，然后移除了很多“已删除”doc，shard A1 尚未执行 segment merge，因此 A1 依然存在那些“已删除”doc

于是：两次请求打到 A0 和 A1 时，两者的 索引统计 是显著不同的

**如何规避 score不能重现 的问题？使用 preference 查询参数**

发出搜索请求时候，用 标识字符串 来标识用户，将 标识字符串 作为查询请求的preference参数。这确保多次执行同一个请求时候，给定用户的请求总是达到同一个shard，因此得分会更为一致（当然，即使同一个shard，两次请求 跨了 segment merge，则依然会得分不一致）

这个方式还有另外一个优点，当两个doc得分一致时，则默认按着doc的 内部Lucene doc id 来排序（注意：这并不是es中的 _id 或 _uid）。但是呢，shard的不同copy间，同一个doc的 内部Lucene doc id 可能并不相同。因此，如果总是达到同一个shard，则，具有相同得分的两个doc，其顺序是一致的

**score错了**

score错了（Relevancy looks wrong）

如果你发现

- 具有相同内容的文档，其得分不同
- 完全匹配 的查询 并没有排在第一位
  这可能都是由 sharding 引起的
- 默认情况下，搜索文档时，每个shard自己计算出自己的得分。
- 索引统计 又是打分时一个非常重要的因素。

如果每个shard的 索引统计相似，则 搜索工作的很好

文档是平分到每个primary shard的，因此 索引统计 会非常相似，打分也会按着预期工作。但，万事都有个但是：

- 索引时使用了 routing（文档不能平分到每个primary shard 啦）
- 查询多个索引
- 索引中文档的个数 非常少

这会导致：参与查询的各个shard，各自的 索引统计 并不相似（而，索引统计对 最终的得分 又影响巨大），于是 打分出错了（relevancy looks wrong）

**那，如何绕过 score错了（Relevancy looks wrong）？**

如果数据集较小，则，只使用一个primary shard（es默认是5个），这样两次查询 索引统计 不会变化，因而得分也就一致啦

另一种方式是，将search_type设置为：dfs_query_then_fetech（默认是query_then_fetch）

dfs_query_then_fetch的作用是

- 向 所有相关shard 发出请求，要求 所有相关shard 返回针对当前查询的 索引统计
- 然后，coordinating node 将 merge这些 索引统计，从而得到 merged statistics
- coordinating node 要求 所有相关shard 执行 query phase，于是 发出请求，这时，也带上 merged statistics。这样，执行query的shard 将使用 全局的索引统计

大部分情况下，要求 所有相关shard 返回针对当前查询的 索引统计，这是非常cheap的。但，如果查询中 包含 非常大量的 字段/term查询，或者有 fuzzy查询，此时，获取 索引统计 可能并不cheap，因为 为了得到 索引统计 可能 term dictionary 中 所有的term都需要被查询一遍

# ES+Redis+MySQL

会员系统是一种基础系统，跟公司所有业务线的下单主流程密切相关。如果会员系统出故障，会导致用户无法下单，影响范围是全公司所有业务线。所以，会员系统必须保证高性能、高可用，提供稳定、高效的基础服务。

随着同程和艺龙两家公司的合并，越来越多的系统需要打通同程 APP、艺龙 APP、同程微信小程序、艺龙微信小程序等多平台会员体系。

例如微信小程序的交叉营销，用户买了一张火车票，此时想给他发酒店红包，这就需要查询该用户的统一会员关系。

因为火车票用的是同程会员体系，酒店用的是艺龙会员体系，只有查到对应的艺龙会员卡号后，才能将红包挂载到该会员账号。

除了上述讲的交叉营销，还有许多场景需要查询统一会员关系，例如订单中心、会员等级、里程、红包、常旅、实名，以及各类营销活动等等。

所以，会员系统的请求量越来越大，并发量越来越高，今年清明小长假的秒并发 tps 甚至超过 2 万多。

在如此大流量的冲击下，会员系统是如何做到高性能和高可用的呢？这就是本文着重要讲述的内容。

**推荐Java工程师技术指南：https://github.com/chenjiabing666/JavaFamily**

## ES 高可用方案

### ES 双中心主备集群架构

同程和艺龙两家公司融合后，全平台所有体系的会员总量是十多亿。在这么大的数据体量下，业务线的查询维度也比较复杂。

有的业务线基于手机号，有的基于微信 unionid，也有的基于艺龙卡号等查询会员信息。

这么大的数据量，又有这么多的查询维度，基于此，我们选择 ES 用来存储统一会员关系。ES 集群在整个会员系统架构中非常重要，那么如何保证 ES 的高可用呢？

首先我们知道，ES 集群本身就是保证高可用的，如下图所示：

[![图片](https://mmbiz.qpic.cn/mmbiz_png/ufWcjcomw8aLqFHnREiaQEsAPIUlX70ibe1Rbvc6s1Ns4ymEO5t1lfbCI1ZNVYWg3hFFicdiazvHeH7RAZe7kw7bicg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)](https://mp.weixin.qq.com/s?__biz=MzU3MDAzNDg1MA==&mid=2247520168&idx=1&sn=89732de3c6b9faa4d9af312f6bd93d4f&chksm=fcf75065cb80d973234c7af37c768c2f2760c411cfec480d189b26a4ad8f8036b814e00c1330&token=523620251&lang=zh_CN&scene=21#wechat_redirect)

当 ES 集群有一个节点宕机了，会将其他节点对应的 Replica Shard 升级为 Primary Shard，继续提供服务。关注公众号：码猿技术专栏，回复关键词：1111 获取阿里内部Java性能调优手册

但即使是这样，还远远不够。例如 ES 集群都部署在机房 A，现在机房 A 突然断电了，怎么办？

例如服务器硬件故障，ES 集群大部分机器宕机了，怎么办？或者突然有个非常热门的抢购秒杀活动，带来了一波非常大的流量，直接把 ES 集群打死了，怎么办？面对这些情况，让运维兄弟冲到机房去解决？

这个非常不现实，因为会员系统直接影响全公司所有业务线的下单主流程，故障恢复的时间必须非常短，如果需要运维兄弟人工介入，那这个时间就太长了，是绝对不能容忍的。

那 ES 的高可用如何做呢？我们的方案是 ES 双中心主备集群架构。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ufWcjcomw8aLqFHnREiaQEsAPIUlX70ibe1Uch2gnjgyGU8ibfgJQdqWZPZiaGBlY0C3vX5H5nr1IBpZUiamNic2Khow/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

我们有两个机房，分别是机房 A 和机房 B。我们把 ES 主集群部署在机房 A，把 ES 备集群部署在机房 B。会员系统的读写都在 ES 主集群，通过 MQ 将数据同步到 ES 备集群。

此时，如果 ES 主集群崩了，通过统一配置，将会员系统的读写切到机房 B 的 ES 备集群上，这样即使 ES 主集群挂了，也能在很短的时间内实现故障转移，确保会员系统的稳定运行。

最后，等 ES 主集群故障恢复后，打开开关，将故障期间的数据同步到 ES 主集群，等数据同步一致后，再将会员系统的读写切到 ES 主集群。

### ES 流量隔离三集群架构

双中心 ES 主备集群做到这一步，感觉应该没啥大问题了，但去年的一次恐怖流量冲击让我们改变了想法。

那是一个节假日，某个业务上线了一个营销活动，在用户的一次请求中，循环 10 多次调用了会员系统，导致会员系统的 tps 暴涨，差点把 ES 集群打爆。

这件事让我们后怕不已，它让我们意识到，一定要对调用方进行优先级分类，实施更精细的隔离、熔断、降级、限流策略。

首先，我们梳理了所有调用方，分出两大类请求类型：

- 第一类是跟用户的下单主流程密切相关的请求，这类请求非常重要，应该高优先级保障。
- 第二类是营销活动相关的，这类请求有个特点，他们的请求量很大，tps 很高，但不影响下单主流程。

基于此，我们又构建了一个 ES 集群，专门用来应对高 tps 的营销秒杀类请求，这样就跟 ES 主集群隔离开来，不会因为某个营销活动的流量冲击而影响用户的下单主流程。

如下图所示：

[![图片](https://mmbiz.qpic.cn/mmbiz_png/ufWcjcomw8aLqFHnREiaQEsAPIUlX70ibelCGzuiaGDCllalbsibvETLKUJCITZ9hBR4VYCOszEIwqeoEhw9mriahqw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)](https://mp.weixin.qq.com/s?__biz=MzU3MDAzNDg1MA==&mid=2247520168&idx=1&sn=89732de3c6b9faa4d9af312f6bd93d4f&chksm=fcf75065cb80d973234c7af37c768c2f2760c411cfec480d189b26a4ad8f8036b814e00c1330&token=523620251&lang=zh_CN&scene=21#wechat_redirect)

### ES 集群深度优化提升

讲完了 ES 的双中心主备集群高可用架构，接下来我们深入讲解一下 ES 主集群的优化工作。

有一段时间，我们特别痛苦，就是每到饭点，ES 集群就开始报警，搞得每次吃饭都心慌慌的，生怕 ES 集群一个扛不住，就全公司炸锅了。

那为什么一到饭点就报警呢？因为流量比较大， 导致 ES 线程数飙高，cpu 直往上窜，查询耗时增加，并传导给所有调用方，导致更大范围的延时。那么如何解决这个问题呢？关注公众号：码猿技术专栏，回复关键词：1111 获取阿里内部Java性能调优手册

通过深入 ES 集群，我们发现了以下几个问题：

- **ES 负载不合理，热点问题严重。**ES 主集群一共有几十个节点，有的节点上部署的 shard 数偏多，有的节点部署的 shard 数很少，导致某些服务器的负载很高，每到流量高峰期，就经常预警。
- **ES 线程池的大小设置得太高，导致 cpu 飙高。**我们知道，设置 ES 的 threadpool，一般将线程数设置为服务器的 cpu 核数，即使 ES 的查询压力很大，需要增加线程数，那最好也不要超过“cpu core * 3 / 2 + 1”。如果设置的线程数过多，会导致 cpu 在多个线程上下文之间频繁来回切换，浪费大量 cpu 资源。
- **shard 分配的内存太大，100g，导致查询变慢。**我们知道，ES 的索引要合理分配 shard 数，要控制一个 shard 的内存大小在 50g 以内。如果一个 shard 分配的内存过大，会导致查询变慢，耗时增加，严重拖累性能。
- **string 类型的字段设置了双字段，既是 text，又是 keyword，导致存储容量增大了一倍。**会员信息的查询不需要关联度打分，直接根据 keyword 查询就行，所以完全可以将 text 字段去掉，这样就能节省很大一部分存储空间，提升性能。
- **ES 查询，使用 filter，不使用 query。**因为 query 会对搜索结果进行相关度算分，比较耗 cpu，而会员信息的查询是不需要算分的，这部分的性能损耗完全可以避免。
- **节约 ES 算力，**将 ES 的搜索结果排序放在会员系统的 jvm 内存中进行。
- **增加 routing key。**我们知道，一次 ES 查询，会将请求分发给所有 shard，等所有shard返回结果后再聚合数据，最后将结果返回给调用方。如果我们事先已经知道数据分布在哪些 shard 上，那么就可以减少大量不必要的请求，提升查询性能。

经过以上优化，成果非常显著，ES 集群的 cpu 大幅下降，查询性能大幅提升。ES 集群的 cpu 使用率：

[![图片](https://mmbiz.qpic.cn/mmbiz_png/ufWcjcomw8aLqFHnREiaQEsAPIUlX70ibe1bxCU9Y5iaJbicA3EGAUFicoFU4N2SMWAtrBbyZc8uMpDvAcnGmdU2rlQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)](https://mp.weixin.qq.com/s?__biz=MzU3MDAzNDg1MA==&mid=2247520168&idx=1&sn=89732de3c6b9faa4d9af312f6bd93d4f&chksm=fcf75065cb80d973234c7af37c768c2f2760c411cfec480d189b26a4ad8f8036b814e00c1330&token=523620251&lang=zh_CN&scene=21#wechat_redirect)

会员系统的接口耗时：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ufWcjcomw8aLqFHnREiaQEsAPIUlX70ibeG4vcZSdlKrrwsZegNcdJkc8f3JRrgqSicsI2VFsdcWibuBWJJx0n7plQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 会员 Redis 缓存方案

一直以来，会员系统是不做缓存的，原因主要有两个：

- 第一个，前面讲的 ES 集群性能很好，秒并发 3 万多，99 线耗时 5 毫秒左右，已经足够应付各种棘手的场景。
- 第二个，有的业务对会员的绑定关系要求实时一致，而会员是一个发展了 10 多年的老系统，是一个由好多接口、好多系统组成的分布式系统。

所以，只要有一个接口没有考虑到位，没有及时去更新缓存，就会导致脏数据，进而引发一系列的问题。

例如：用户在 APP 上看不到微信订单、APP 和微信的会员等级、里程等没合并、微信和 APP 无法交叉营销等等。

那后来为什么又要做缓存呢？是因为今年机票的盲盒活动，它带来的瞬时并发太高了。虽然会员系统安然无恙，但还是有点心有余悸，稳妥起见，最终还是决定实施缓存方案。

### ES 延迟致 Redis 缓存不一致方案

在做会员缓存方案的过程中，遇到一个 ES 引发的问题，该问题会导致缓存数据的不一致。

我们知道，ES 操作数据是近实时的，往 ES 新增一个 Document，此时立即去查，是查不到的，需要等待 1 秒后才能查询到。如下图所示：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ufWcjcomw8aLqFHnREiaQEsAPIUlX70ibeanMHnWYicrfnUSQINQMJYKFFn1TSSsJLZLicKbiaibgV4bKw3Ql8QxJx4g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

ES 的近实时机制为什么会导致 Redis 缓存数据不一致呢？具体来讲，假设一个用户注销了自己的 APP 账号，此时需要更新 ES，删除 APP 账号和微信账号的绑定关系。而 ES 的数据更新是近实时的，也就是说，1 秒后你才能查询到更新后的数据。

而就在这 1 秒内，有个请求来查询该用户的会员绑定关系，它先到 Redis 缓存中查，发现没有，然后到 ES 查，查到了，但查到的是更新前的旧数据。

最后，该请求把查询到的旧数据更新到 Redis 缓存并返回。就这样，1 秒后，ES 中该用户的会员数据更新了，但 Redis 缓存的数据还是旧数据，导致了 Redis 缓存跟 ES 的数据不一致。

如下图所示：

[![图片](https://mmbiz.qpic.cn/mmbiz_png/ufWcjcomw8aLqFHnREiaQEsAPIUlX70ibeRSFjW3MQZ6iafaLJqT0EiaJRicZOzT53pDC7RNw15Z4xPQ4uOMfRpjG4g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)](https://mp.weixin.qq.com/s?__biz=MzU3MDAzNDg1MA==&mid=2247520168&idx=1&sn=89732de3c6b9faa4d9af312f6bd93d4f&chksm=fcf75065cb80d973234c7af37c768c2f2760c411cfec480d189b26a4ad8f8036b814e00c1330&token=523620251&lang=zh_CN&scene=21#wechat_redirect)

面对该问题，如何解决呢？我们的思路是，在更新 ES 数据时，加一个 2 秒的 Redis 分布式并发锁，为了保证缓存数据的一致性，接着再删除 Redis 中该会员的缓存数据。

如果此时有请求来查询数据，先获取分布式锁，发现该会员 ID 已经上锁了，说明 ES 刚刚更新的数据尚未生效，那么此时查询完数据后就不更新 Redis 缓存了，直接返回，这样就避免了缓存数据的不一致问题。

如下图所示：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ufWcjcomw8aLqFHnREiaQEsAPIUlX70ibeP7GVRSPry4DJdpemSaiaNwWiakmTian3OJJ7gp4PfbXXRZoSpAGdHPRfA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

上述方案，乍一看似乎没什么问题了，但仔细分析，还是有可能导致缓存数据的不一致。

例如，在更新请求加分布式锁之前，恰好有一个查询请求获取分布式锁，而此时是没有锁的，所以它可以继续更新缓存。

但就在他更新缓存之前，线程 block 了，此时更新请求来了，加了分布式锁，并删除了缓存。当更新请求完成操作后，查询请求的线程活过来了，此时它再执行更新缓存，就把脏数据写到缓存中了。

发现没有？主要的问题症结就在于“删除缓存”和“更新缓存”发生了并发冲突，只要将它们互斥，就能解决问题。

如下图所示：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ufWcjcomw8aLqFHnREiaQEsAPIUlX70ibesQc3FqyDSZRB7tHTia6IFviapEn36oSgK73S1YpriaM3ozcAt8MmsMyiag/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

实施了缓存方案后，经统计，缓存命中率 90%+，极大缓解了 ES 的压力，会员系统整体性能得到了很大提升。

### Redis 双中心多集群架构

接下来，我们看一下如何保障 Redis 集群的高可用。

如下图所示：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ufWcjcomw8aLqFHnREiaQEsAPIUlX70ibeBrbDaBAAzicQ5czsfOCGhAfMSrM1QOc0RmSgGTNefbMZN3aCzMlu7Hg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

关于 Redis 集群的高可用，我们采用了双中心多集群的模式。在机房 A 和机房 B 各部署一套 Redis 集群。

更新缓存数据时，双写，只有两个机房的 Redis 集群都写成功了，才返回成功。查询缓存数据时，机房内就近查询，降低延时。这样，即使机房 A 整体故障，机房 B 还能提供完整的会员服务。

## 高可用会员主库方案

上述讲到，全平台会员的绑定关系数据存在 ES，而会员的注册明细数据存在关系型数据库。

最早，会员使用的数据库是 SqlServer，直到有一天，DBA 找到我们说，单台 SqlServer 数据库已经存储了十多亿的会员数据，服务器已达到物理极限，不能再扩展了。按照现在的增长趋势，过不了多久，整个 SqlServer 数据库就崩了。

你想想，那是一种什么样的灾难场景：会员数据库崩了，会员系统就崩了；会员系统崩了，全公司所有业务线就崩了。想想就不寒而栗，酸爽无比，为此我们立刻开启了迁移 DB 的工作。

### MySQL 双中心 Partition 集群方案

经过调研，我们选择了双中心分库分表的 MySQL 集群方案，如下图所示：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ufWcjcomw8aLqFHnREiaQEsAPIUlX70ibegoDHm7N0Py4WrOiceMicRwhpxmVmwaN6W1qiczBmnESNWd6qlX3JVX04Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

会员一共有十多亿的数据，我们把会员主库分了 1000 多个分片，平分到每个分片大概百万的量级，足够使用了。

MySQL 集群采用 1 主 3 从的架构，主库放在机房 A，从库放在机房 B，两个机房之间通过专线同步数据，延迟在 1 毫秒内。

会员系统通过 DBRoute 读写数据，写数据都路由到 master 节点所在的机房 A，读数据都路由到本地机房，就近访问，减少网络延迟

这样，采用双中心的 MySQL 集群架构，极大提高了可用性，即使机房 A 整体都崩了，还可以将机房 B 的 Slave 升级为 Master，继续提供服务。

双中心 MySQL 集群搭建好后，我们进行了压测，测试下来，秒并发能达到 2 万多，平均耗时在 10 毫秒内，性能达标。

### 会员主库平滑迁移方案

接下来的工作，就是把会员系统的底层存储从 SqlServer 切到 MySQL 上，这是个风险极高的工作。

主要有以下几个难点：

- 会员系统是一刻都不能停机的，要在不停机的情况下完成 SqlServer 到 MySQL 的切换，就像是在给高速行驶的汽车换轮子。
- 会员系统是由很多个系统和接口组成的，毕竟发展了 10 多年，由于历史原因，遗留了大量老接口，逻辑错综复杂。这么多系统，必须一个不落的全部梳理清楚，DAL 层代码必须重写，而且不能出任何问题，否则将是灾难性的。
- 数据的迁移要做到无缝迁移，不仅是存量 10 多亿数据的迁移，实时产生的数据也要无缝同步到 MySQL。另外，除了要保障数据同步的实时性，还要保证数据的正确性，以及 SqlServer 和 MySQL 数据的一致性。

基于以上痛点，我们设计了“全量同步、增量同步、实时流量灰度切换”的技术方案。

首先，为了保证数据的无缝切换，采用实时双写的方案。因为业务逻辑的复杂，以及 SqlServer 和 MySQL 的技术差异性，在双写 MySQL 的过程中，不一定会写成功，而一旦写失败，就会导致 SqlServer 和 MySQL 的数据不一致，这是绝不允许的。

所以，我们采取的策略是，在试运行期间，主写 SqlServer，然后通过线程池异步写 MySQL，如果写失败了，重试三次，如果依然失败，则记日志，然后人工排查原因，解决后，继续双写，直到运行一段时间，没有双写失败的情况。

通过上述策略，可以确保在绝大部分情况下，双写操作的正确性和稳定性，即使在试运行期间出现了 SqlServer 和 MySQL 的数据不一致的情况，也可以基于 SqlServer 再次全量构建出 MySQL 的数据。

因为我们在设计双写策略时，会确保 SqlServer 一定能写成功，也就是说，SqlServer 中的数据是全量最完整、最正确的。

如下图所示：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ufWcjcomw8aLqFHnREiaQEsAPIUlX70ibeY2kvibC0Qtamz1UWvgfH55gzliaRHRR5ibUrpAyibcHRYqVnFicd812g6dQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

讲完了双写，接下来我们看一下“读数据”如何灰度。整体思路是，通过 A/B 平台逐步灰度流量，刚开始 100% 的流量读取 SqlServer 数据库，然后逐步切流量读取 MySQL 数据库，先 1%，如果没有问题，再逐步放流量，最终 100% 的流量都走 MySQL数据库。

在逐步灰度流量的过程中，需要有验证机制，只有验证没问题了，才能进一步放大流量。

那么这个验证机制如何实施呢？方案是，在一次查询请求里，通过异步线程，比较 SqlServer 和 MySQL 的查询结果是否一致，如果不一致，记日志，再人工检查不一致的原因，直到彻底解决不一致的问题后，再逐步灰度流量。

如下图所示：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ufWcjcomw8aLqFHnREiaQEsAPIUlX70ibesExtB7QRzajJ6aTzzcETzXSTwuySjcRzPVVWz8iahnewvZtZWOA9qvg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

所以，整体的实施流程如下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ufWcjcomw8aLqFHnREiaQEsAPIUlX70ibeKCzFHfNibCBU851ibCSiaHxw8RC9znkqEPcAeNxogxO3edLqdDArPSnxA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

首先，在一个夜黑风高的深夜，流量最小的时候，完成 SqlServer 到 MySQL 数据库的全量数据同步。

接着，开启双写，此时，如果有用户注册，就会实时双写到两个数据库。那么，在全量同步和实时双写开启之间，两个数据库还相差这段时间的数据，所以需要再次增量同步，把数据补充完整，以防数据的不一致。

剩下的时间，就是各种日志监控，看双写是否有问题，看数据比对是否一致等等。

这段时间是耗时最长的，也是最容易发生问题的，如果有的问题比较严重，导致数据不一致了，就需要从头再来，再次基于 SqlServer 全量构建 MySQL 数据库，然后重新灰度流量。

直到最后，100% 的流量全部灰度到 MySQL，此时就大功告成了，下线灰度逻辑，所有读写都切到 MySQL 集群。

### MySQL 和 ES 主备集群方案

做到这一步，感觉会员主库应该没问题了，可 dal 组件的一次严重故障改变了我们的想法。

那次故障很恐怖，公司很多应用连接不上数据库了，创单量直线往下掉，这让我们意识到，即使数据库是好的，但 dal 组件异常，依然能让会员系统挂掉。

所以，我们再次异构了会员主库的数据源，双写数据到 ES，如下所示：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ufWcjcomw8aLqFHnREiaQEsAPIUlX70ibeFONmFTTkWA6AiaOS7vWlaE0JVOibR1aZ7EXkyJY3cVUEKuL5VPBWNbnQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

如果 dal 组件故障或 MySQL 数据库挂了，可以把读写切到 ES，等 MySQL 恢复了，再把数据同步到 MySQL，最后把读写再切回到 MySQL 数据库。

如下图所示：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ufWcjcomw8aLqFHnREiaQEsAPIUlX70ibejOqmfkK30mGuVzf7V5yoiaibsPBvfmVaqedX6W9Mrfkh6YW5W3hN14gA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 异常会员关系治理

会员系统不仅仅要保证系统的稳定和高可用，数据的精准和正确也同样重要。

举个例子，一个分布式并发故障，导致一名用户的 APP 账户绑定了别人的微信小程序账户，这将会带来非常恶劣的影响。

首先，一旦这两个账号绑定了，那么这两个用户下的酒店、机票、火车票订单是互相可以看到的。

你想想，别人能看到你订的酒店订单，你火不火，会不会投诉？除了能看到别人的订单，你还能操作订单。

例如，一个用户在 APP 的订单中心，看到了别人订的机票订单，他觉得不是自己的订单，就把订单取消了。

这将会带来非常严重的客诉，大家知道，机票退订费用是挺高的，这不仅影响了该用户的正常出行，还导致了比较大的经济损失，非常糟糕。

针对这些异常会员账号，我们进行了详细的梳理，通过非常复杂烧脑的逻辑识别出这些账号，并对会员接口进行了深度优化治理，在代码逻辑层堵住了相关漏洞，完成了异常会员的治理工作。

如下图所示：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ufWcjcomw8aLqFHnREiaQEsAPIUlX70ibewezEgeC2qPcYFiaibcm9JrPPMXZdsaUpEibJdO9iaPyKdotyVYSq36ktqA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**展望：更精细化的流控和降级策略**

任何一个系统，都不能保证百分之一百不出问题，所以我们要有面向失败的设计，那就是更精细化的流控和降级策略。

### 更精细化的流控策略

热点控制。针对黑产刷单的场景，同一个会员 id 会有大量重复的请求，形成热点账号，当这些账号的访问超过设定阈值时，实施限流策略。

基于调用账号的流控规则。这个策略主要是防止调用方的代码 bug 导致的大流量。例如，调用方在一次用户请求中，循环很多次来调用会员接口，导致会员系统流量暴增很多倍。所以，要针对每个调用账号设置流控规则，当超过阈值时，实施限流策略。

**全局流控规则。**我们会员系统能抗下 tps 3 万多的秒并发请求量，如果此时，有个很恐怖的流量打过来，tps 高达 10 万，与其让这波流量把会员数据库、ES 全部打死，还不如把超过会员系统承受范围之外的流量快速失败，至少 tps 3 万内的会员请求能正常响应，不会让整个会员系统全部崩溃。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ufWcjcomw8aLqFHnREiaQEsAPIUlX70ibez25LtIqWWdB0DgzZ2ICcygUUUGUTugh5cDFnCZxn35soojwB0X3hvA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 更精细化的降级策略

**基于平均响应时间的降级。**会员接口也有依赖其他接口，当调用其他接口的平均响应时间超过阈值，进入准降级状态。

如果接下来 1s 内进入的请求，它们的平均响应时间都持续超过阈值，那么在接下的时间窗口内，自动地熔断。

基于异常数和异常比例的降级。当会员接口依赖的其他接口发生异常，如果 1 分钟内的异常数超过阈值，或者每秒异常总数占通过量的比值超过阈值，进入降级状态，在接下的时间窗口之内，自动熔断。

目前，我们最大的痛点是会员调用账号的治理。公司内，想要调用会员接口，必须申请一个调用账号，我们会记录该账号的使用场景，并设置流控、降级策略的规则。

但在实际使用的过程中，申请了该账号的同事，可能异动到其他部门了，此时他可能也会调用会员系统，为了省事，他不会再次申请会员账号，而是直接沿用以前的账号过来调用，这导致我们无法判断一个会员账号的具体使用场景是什么，也就无法实施更精细的流控和降级策略。



# 为什么 ES 比 MySQL 更适合复杂条件搜索

熟悉 MySQL 的同学一定都知道，MySQL 对于复杂条件查询的支持并不好。MySQL 最多使用一个条件涉及的索引来过滤，然后剩余的条件只能在遍历行过程中进行内存过滤，对这个过程不了解的同学可以先行阅读一下[《MySQL复杂where条件分析》](http://mp.weixin.qq.com/s?__biz=Mzg2NjE5NDQyOA==&mid=2247484416&idx=1&sn=5df008e62c3634fa781a280b604569b1&chksm=ce4fc293f9384b85b20bad70bd5373da195a8afdbec15759638c7834886b6b24f3a0292280f6&scene=21#wechat_redirect)。

上述这种处理复杂条件查询的方式因为只能通过一个索引进行过滤，所以需要进行大量的 I/O 操作来读取行数据，并消耗 CPU 进行内存过滤，导致查询性能的下降。

而 ElasticSearch 因其特性，十分适合进行复杂条件查询，是业界主流的复杂条件查询场景解决方案，广泛应用于订单和日志查询等场景。下面我们就一起来看一下，为什么 ElasticSearch 适合进行复杂条件查询。

## ElasticSearch 简介

Elasticsearch 是开源的实时分布式搜索分析引擎，内部使用 Lucene 做索引与搜索。它提供"准实时搜索"能力，并且能动态集群规模，弹性扩容。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101501755.png" alt="image-20221210150157699" style="zoom: 50%;" />

Elasticsearch 使用 Lucene 作为其全文搜索引擎，用于处理纯文本的数据，但 Lucene 只是一个库，提供建立索引、执行搜索等接口，但不包含分布式服务，这些正是 Elasticsearch 做的。

下面，我们来介绍一下 ElasticSearch 的相关概念。为了便于初学者理解，我们先将 ElasticSearch 中的概念和 MySQL 中的概念大致地进行对应。但是**二者在具体细节上还是有很多差异的，大家深入了解 ElasticSearch 就会将二者区分清楚**，不能强行对比等同。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101502005.png" alt="image-20221210150217960" style="zoom: 67%;" />

> - ElasticSearch 中的索引 Index 类似于 MySQL 中的数据库 Database；
> - ElasticSearch 中的类型 Type 类似于 MySQL 中的表 Table；需要注意，这个概念在 7.x 版本中被完全删除，而且概念上和 Table 也有较大差异；
> - ElasticSearch 中的文档 Document 类似于 MySQL 中的数据行 Row，每个文档由多个字段 Filed 组成，这个Filed 就类似于 MySQL 的 Column；
> - ElasticSearch 中的映射 Mapping 是对索引库中的索引字段及其数据类型进行定义，类似于关系型数据库中的表结构 Schema；
> - ElasticSearch 使用自己的领域语言 Query DSL 来进行增删改查，而 MySQL 使用 SQL 语言进行上诉操作。

ElasticSearch 还有一系列有关其分布式特性的概念，我们这里就暂不介绍了，等后续学习到其分布式特性时在进行介绍。

## 倒排索引

> MySQL 有 B+ 树索引，而 ElasticSearch 则是倒排索引 (Inverted Index)，它通过倒排索引来实现比 MySQL 更快的过滤和复杂条件的查询，此外，全文搜索功能也是依赖倒排索引才能实现。我们就具体来看一下何为倒排索引。

> 倒排索引按照维基百科的描述，是存储文档内容到文档位置映射关系的数据库索引结构。不过只看定义，我是有点迷惑，这不是和 MySQL 的非主键索引类似嘛，为什么要叫它“倒排”呢？这个问题我目前也为搞清楚，可能要等到后续了解了其具体实现才能理解。

> 我们还是以书籍检索为例，假设有以下数据，每一行就是一个 Document，每个 Document 由 id，ISBN 号，作者名称和评分组成。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101503932.png" alt="image-20221210150336885" style="zoom:67%;" />

给上述数据按照 ISBN 和 Author 建立的倒排索引如下所示。倒排索引是每个字段分开建立的，相互独立。有两个专门的术语，分别是索引 Term 和倒排表 Posting List。字段的值就是 Term，比如 N0007，而 Term 对应的文档 ID 的列表就是 Posting List，对应图中红色的部分。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101503465.png" alt="image-20221210150351405" style="zoom:80%;" />

一般 Term 都是按照顺序排序的，比如 Author 名称就是按照字母序进行了排序，排序之后，当我们搜索某一个 Term 时，就不需要从头遍历，而是采用二分查找。一系列排序后的 Term 就组成了索引表 Term Dictionary。

但是 Term Dictionary 往往很大，无法完整放入内存，这是为了更快的查询，还需要再给它创建索引，也就是 Term Index 

ElasticSearch 使用 Burst-Trie 结构来实现 Term Index，它是一种前缀树 Trie 的一种变种，它主要是将后缀进行了压缩，降低了Trie的高度，从而获取更好查询性能。

Term Index 并不需要像 MySQL 的索引一样，包含所有的 Term，而是包含的是这些 Term 的前缀。它就类似于字典的查询目录，可以进行快速定位到 Term Dictionary 的某一位置，然后再从这个位置向后查询。

综上， Alice，Alf，Arlan，Bob，Tom 等词的倒排索引如下所示。绿色部分是 Term Index，蓝色部分是 Term Dictionary，红色部分是 Posting List。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101504313.png" alt="image-20221210150412247" style="zoom:67%;" />

一般来说，Term Index 都是全部缓存在内存中，查询时，先通过其快速定位到 Term Dictionary 对应的大致范围，然后再进行磁盘读取查找对应的 Term，这样就大大减少了磁盘 I/O 的次数。

## 联合索引查询

了解了 ElasticSearch 的倒排索引后，我们再来看看其如何处理复杂的联合索引查询。比如上述书籍例子中，我们需要查询评分等于2.2并且作者名称叫 Tom的书籍。

理论上，我们只需要分别按照 Score 和 Author 字段的倒排索引进行查询，获取响应的 Posting List，再将其做交集合并即可。

这里又要吐槽一下 MySQL，它是不支持这个合并操作的，它只能按照一个字段的索引进行查询，然后根据另外一个字段的条件做内存过滤。顺便说一下，MySQL 的 join 功能也弱爆了，感兴趣的同学可以了解一下[这篇文章](http://mp.weixin.qq.com/s?__biz=Mzg2NjE5NDQyOA==&mid=2247484468&idx=1&sn=b17568cb7f127543ba752c63577013ce&chksm=ce4fc2a7f9384bb1f072198b01fdea1986e35377cba3481cde874e6367bf0d40996293c0ab68&scene=21#wechat_redirect)

而 ElasticSearch 则支持使用跳表 Skip List和 Bitset 的方式将数据集进行合并。

- 使用 Skip List 结构，同时遍历 Score 和 Author 查询出来的 Posting List，利用其 Skip List 结构，相互跳跃对比，得出合集。
- 使用 Bitset 结构，对 Score 和 Author 查询出来的 Posting List 的值计算出各自的 Bitset，然后进行 AND 操作。

## 跳表合并策略

ElasticSearch 在存储 Posting List 数据时，就保存了对应的多级跳表结构响应的数据，这也体现了其空间换时间的基本思想。

这里先介绍一下跳表的基本概念，它其实是一种可以进行二分查找的有序链表。跳表在原有的有序链表上面增加了多级索引，通过索引来实现快速查找。首先在最高级索引上查找最后一个小于当前查找元素的位置，然后再跳到次高级索引继续查找，直到跳到最底层为止，通过这种方式，加快了查询的速度。

比如，按照 Score 查出来的 Posting List 为[2,3,4,5,7,9,10,11]，按照 Author 查出来的结果为 [3,8,9,12,13]，则二者的跳表结构如下图所示。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101505407.png" alt="image-20221210150535352" style="zoom:50%;" />

具体合并过程则是先选最短的 posting list，也就是 Author 的结果集，从其最小的一个 id 开始，将其作为当前最大值。然后依次剩余 posting list 中查找大于或等于该值的位置。

比如上述结果集中，先去 Score 结果集中查找 3，找到后，就表明 3是二者的合集元素之一；然后再重新开启一轮，选取 Author 结果集中 3 的下一个值 8 ，去 Score 结果集查询 8，发现了大于等于 8 的最小的值是 9 ，所以不可能有共同的值 8，然后再去 Author 结果集查找 9 ，发现其大于等于 9 的最小值是 12，所以再去 Score 结果集中查找大于等于 12的值，发现并不存在；最终得出二者的合集就只有[3]。

在查询过程中，每个 posting list 都可以根据当前 id 通过 skip list 快速跳过不符合的 id 值，加速整个合并取交集的过程。

ElasticSearch 对于较长的 posting list 也会使用 Frame Of Reference 进行压缩编码，减少了磁盘占用，减少了索引尺寸。有关具体存储结构的实现我们后续再进行细聊。

## Bitset 合并策略

ElasticSearch除了使用 skipList 来进行数据磁盘读取时的合并操作外，还会将一些查询条件对应的结果集 posting list 进行内存缓存，也就是所谓的 Filter Cache，为了后续再次复用。

为了减少内存缓存所消耗的内存空间大小，ElasticSearch 没有使用单纯的数组和 bitset 来存储 posting list，而是使用要压缩效率更高的 Roaring Bitmap。

我们可以先来讲一下单纯数组或 bitset 数据结构为什么并不使用。比如如下一道较为常见的面试题目：

> 给定含有40亿个不重复的位于[0, 2^32 - 1]区间内的整数的集合，如何快速判定某个数是否在该集合内？

如果我们要使用 unsigned long 数组来存储它的话，也就需要消耗 40亿 * 32 位 = 160 Byte，大致是 16000 MB。

如果要使用位图 Bitset 来存储的话，即某个数位于原集合内，就将它对应的位图内的比特置为1，否则保持为0。这样只需要消耗 2 ^ 32 位 = 512 MB，***这可只有原来的 3.2 % 左右\***。

但是，Bitset 也有其缺陷，也就是稀疏存储的问题，比如上述集合并不是 40亿，而是只有2，3个，那么 Bitset 中只有少数几位是1，其他位都是 0，但是它仍然占用了 512 MB。

而 RoaringBitmap 就是为了解决稀疏存储的问题。下图就是 RoaringBitmap 的基本原理示意图。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101505304.png" alt="image-20221210150515242" style="zoom:80%;" />

首先，如上图所示，计算出32位无符号整数和 65536 的除数和余数。其含义表示，将32位无符号整数按照高16位分桶，即最多可能有2^16=65536个桶，术语惩治为 container。存储数据时，按照数据的高16位找到 container（找不到就会新建一个），再将低16位放入container中。也就是说，一个 RoaringBitmap 就是很多container的集合。

然后 container 内具体的存储结构要根据存入其内数据的基数来决定。

- 基数小于 2 ^ 12 次方即 4096时，使用unsigned short类型的有序数组来存储，最大消耗空间就是  8 KB。
- 基数大于 4096 时，则使用大小为 2 ^ 16 次方的普通 bitset 来存储，固定消耗 8 KB。当然，有些时候也会对 bitset 进行行程长度编码（RLE）压缩，进一步减少空间占用。

ElasticSearch 就是使用 Roaring Bitmap 来缓存不同条件查询出来的 posting list，然后再进行与操作计算出最终结果集。

## 后记

> 至此，我们也算了解了 ElasticSearch 为什么比 MySQL 更适合复杂条件查询，但是有好就有弊，因为为了查询做了这么多的准备工作，ElasticSearch 的插入速度就会慢于 MySQL，而且**数据存入ES后并不是立马就能检索到**。

# ELK 搭建 TB 级海量日志监控系统

本文主要介绍怎么使用 ELK Stack 帮助我们打造一个支撑起日产 TB 级的日志监控系统。很多细节知识，一篇文章是不够的，本文主要介绍了核心知识点。

> 在企业级的微服务环境中，跑着成百上千个服务都算是比较小的规模了。在生产环境上，日志扮演着很重要的角色，排查异常需要日志，性能优化需要日志，业务排查需要业务等等。

> 然而在生产上跑着成百上千个服务，每个服务都只会简单的本地化存储，当需要日志协助排查问题时，很难找到日志所在的节点。也很难挖掘业务日志的数据价值。

> 那么将日志统一输出到一个地方集中管理，然后将日志处理化，把结果输出成运维、研发可用的数据是解决日志管理、协助运维的可行方案，也是企业迫切解决日志的需求。

## 解决方案

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101641857.png" alt="image-20221210164155776" style="zoom:80%;" />

通过上面的需求我们推出了日志 监控系统，如上图：

- 日志统一收集、过滤清洗。
- 生成可视化界面、监控，告警，日志搜索。

## 功能流程概览

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101642920.png" alt="image-20221210164229842" style="zoom:67%;" />

> - 在每个服务节点上埋点，实时采集相关日志。
> - 统一日志收集服务、过滤、清洗日志后生成可视化界面、告警功能。

### 1 我们的架构

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101642357.png" alt="image-20221210164247254" style="zoom:80%;" />

> **①**  日志文件采集端我们使用 FileBeat，运维通过我们的后台管理界面化配置，每个机器对应一个 FileBeat，每个 FileBeat日志对应的 Topic 可以是一对一、多对一，根据日常的日志量配置不同的策略。

> 除了采集业务服务日志外，我们还收集了 MySQL 的慢查询日志和错误日志，还有别的第三方服务日志，如：Nginx 等。最后结合我们的自动化发布平台，自动发布并启动每一个 FileBeat 进程。

> **②**  调用栈、链路、进程监控指标我们使用的代理方式：Elastic APM，这样对于业务侧的程序无需任何改动。对于已经在运营中的业务系统来说，为了加入监控而需要改动代码，那是不可取的，也是无法接受的。Elastic APM 可以帮我们收集 HTTP 接口的调用链路、内部方法调用栈、使用的SQL、进程的 CPU、内存使用指标等。可能有人会有疑问，用了 Elastic APM，其它日志基本都可以不用采集了。还要用 FileBeat 干嘛？是的，Elastic APM 采集的信息确实能帮我们定位 80% 以上的问题，但是它不是所有的语言都支持的比如：C。

> 其二、它无法帮你采集你想要的非 Error 日志和所谓的关键日志，比如：某个接口调用时出了错，你想看出错时间点的前后日志；还有打印业务相关方便做分析的日志。

> 其三、自定义的业务异常，该异常属于非系统异常，属于业务范畴，APM 会把这类异常当成系统异常上报。如果你后面对系统异常做告警，那这些异常将会干扰告警的准确度，你也不能去过滤业务异常，因为自定义的业务异常种类也不少。

> **③**   同时我们对 Agent 进行了二开。采集更详细的 GC、堆栈、内存、线程信息。

> **④**   服务器采集我们采用普罗米修斯。

> **⑤**    由于我们是 Saas 服务化，服务 N 多，很多的服务日志做不到统一规范化，这也跟历史遗留问题有关，一个与业务系统无关的系统去间接或直接地去对接已有的业务系统，为了适配自己而让其更改代码，那是推不动的。

> 牛逼的设计是让自己去兼容别人，把对方当成攻击自己的对象。很多日志是没有意义的，比如：开发过程中为了方便排查跟踪问题，在 if else 里打印只是有标志性的日志，代表是走了 if 代码块还是 else 代码块。

> 甚至有些服务还打印着 Debug 级别的日志。在成本、资源的有限条件下，所有所有的日志是不现实的，即使资源允许，一年下来将是一比很大的开销。

> 所以我们采用了过滤、清洗、动态调整日志优先级采集等方案。首先把日志全量采集到 Kafka 集群中，设定一个很短的有效期。我们目前设置的是一个小时，一个小时的数据量，我们的资源暂时还能接受。

> **⑥**   Log Streams 是我们的日志过滤、清洗的流处理服务。为什么还要 ETL 过滤器呢？因为我们的日志服务资源有限，但不对啊，原来的日志分散在各各服务的本地存储介质上也是需要资源的哈。现在我们也只是汇集而已哈，收集上来后，原来在各服务上的资源就可以释放掉日志占用的部分资源了呀。

没错，这样算确实是把原来在各服务上的资源化分到了日志服务资源上来而已，并没有增加资源。

不过这只是理论上的，在线上的服务，资源扩大容易，收缩就没那么容易了，实施起来极其困难。

所以短时间内是不可能在各服务上使用的日志资源化分到日志服务上来的。这样的话，日志服务的资源就是当前所有服务日志使用资源的量。

随存储的时间越长，资源消耗越大。如果解决一个非业务或非解决不可的问题，在短时间内需要投入的成本大于解决当前问题所带来收益的话，我想，在资金有限的情况下，没有哪个领导、公司愿意采纳的方案。

所以从成本上考虑，我们在 Log Streams 服务引入了过滤器，过滤没有价值的日志数据，从而减少了日志服务使用的资源成本。技术我们采用 Kafka Streams 作为 ETL 流处理。通过界面化配置实现动态过滤清洗的规则。



### 2 规则如下

- 界面化配置日志采集。默认 Error 级别的日志全量采集。
- 以错误时间点为中心，在流处理中开窗，辐射上下可配的 N 时间点采集非 Error 级别日志，默认只采 info 级别。
- 每个服务可配 100 个关键日志，默认关键日志全量采集
- 在慢 SQL 的基础上，按业务分类配置不同的耗时再次过滤
- 按业务需求实时统计业务 SQL，比如：高峰期阶段，统计一小时内同类业务 SQL 的查询频率。可为 DBA 提供优化数据库的依据，如按查询的 SQL 创建索引
- 高峰时段按业务类型的权重指标、日志等级指标、每个服务在一个时段内日志最大限制量指标、时间段指标等动态清洗过滤日志
- 根据不同的时间段动态收缩时间窗口
- 日志索引生成规则：按服务生成的日志文件规则生成对应的 index，比如：某个服务日志分为：debug、info、error、xx_keyword，那么生成的索引也是 debug、info、error、xx_keyword 加日期作后缀。这样做的目的是为研发以原习惯性地去使用日志。

> 可视化界面我们主要使用 Grafana，它支持的众多数据源中，其中就有普罗米修斯和 Elasticsearch，与普罗米修斯可谓是无缝对接。而 Kibana 我们主要用于 APM 的可视分析。

## 日志可视化

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTYvvwELgIA61h2SwDd62LiaLlFFr1iaZLtg7JiboWXShiagr8FibEXf7xBCBKAvxXOqfoLnuia0VSjFicgg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTYvvwELgIA61h2SwDd62LiaBlejmlkbHgvQLYYvhxJ8a9BgSJ0f9ICsibd1LPwMiaIHKOA58CsJrPNg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTYvvwELgIA61h2SwDd62Liax4nkYguOTgbqnkjd181iaPAoLu6xctWlnibBPExGZgBNxwWibOuGVGBDw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTYvvwELgIA61h2SwDd62Lia1UTepZN8OIfIppSH6rSkK787tvTbFPj1LFus6mic9EzH6QI3w7NzYibw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTYvvwELgIA61h2SwDd62LiaYLWMwpLRqFGAALX8cCZ8YsZdkUWm6JbcpoFSj8uY5rszwiamFTXhnEw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTYvvwELgIA61h2SwDd62LiaUGhsH9CrdmBRo2GY2XciboOA6F2YfFedNf3l7vg35ON8GyILCvgOrLg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)





# 一文搞懂 Elasticsearch 监控

> 前言：最近在使用云上的 ElasticSearch  服务时，由于前期没有配置监控和告警，导致磁盘被写满，而此时对外的 API 已经不可用。准备去云厂商控制台进行磁盘扩容时又因为集群状态非 `green`，从而导致陷入僵局，紧急联系云厂商后才恢复，整个异常虽然很小但是前后修复过程依然比较繁琐和冗长。基于此，将过去总结的 ElasticSearch 相关监控重新学习并梳理一遍。

Elasticsearch 提供了大量的指标，可以帮助您检测到问题的迹象，并在遇到诸如不可靠节点，内存不足错误以及长时间垃圾收集时间等问题时采取行动。

整个监控需要关注的几个关键领域是：

1. 监控 ElasticSearch 的性能指标
2. 如何收集 ElasticSearch 的指标
3. 使用 datadog 监控 ElasticSearch
4. ElasticSearch 性能和扩展问题

## 如何监控 ElasticSearch 的性能

### 1 什么是 Elasticsearch？

> Elasticsearch 是一个开源的分布式文档存储和搜索引擎，可以实时存储和检索数据结构。它是依赖于一个用 Java 编写的全文本搜索引擎 Apache Lucene。Elasticsearch 以结构化 JSON 文档的形式表示数据，并通过 RESTful API 来对外统一提供服务，并以此来提供各种语言的对外 API。

> 同时它的弹性还体现在很容易水平扩展，只需添加更多节点来分配负载。如今，大多数的互联网公司都使用它来存储、搜索和动态分析大量数据。

#### 1 Elasticsearch 是如何工作的

> 通常情况下，我们需要优化开源组件，第一件事就是需要知道它内部的工作原理，再根据内部的具体使用场景，就能够将其组件做到最优化的状态。在一个 Elasticsearch 集群中，由以下集中角色组成。

注意：节点的角色状态，可以在 `elasticsearch.yml` 中通过如下方式来选定：

```apl
# 当一个节点既不是master也不是data时，他就是client节点
node.master: false
node.data: false
```

> `master`: 主要负责整个集群数据的读写转发，协调集群任务，比如跨节点分发碎片，创建和删除索引。是该角色的都有资格选举为整个集群的 master 节点，该参数可以保证集群的 master 可用性，即可读写。通常情况下主节点也会默认承载数据节点，但是作为核心的业务集群而言，用户可以启用专用的主节点，来提高整体可靠性，这些节点不存储数据 `node.data: false`。在高使用率的环境中，将主角色从数据节点移开有助于确保始终有足够的资源分配给只有符合主资格的节点才能处理的任务。

> `data`: 数据节点，主要用于存储索引分片的数据。默认情况下，每个节点都可以作为数据节点来存储数据，并执行与索引、搜索和聚合数据相关的操作。在较大集群中，需要专门设置独立的 node 节点来创建专用的数据节点 `node.master: false`。确保这些节点有足够的资源来处理与数据相关的请求，而不需要承担与集群相关的管理任务的额外工作负载。

> `indicent`: 客户端节点，通常通过多一层代理来实现性能的扩展。当设置 `node.data: false` 和 `node.master: false` 时，节点为客户端节点，独立的客户端节点将承载着整个集群的负载均衡器，来帮助路由索引和搜索请求。客户端节点帮助承担一些搜索工作负载，这样数据和符合主条件的节点就可以专注于它们的核心任务。但通常情况下，可能不需要单独设置客户端节点，因为数据节点本身也可以承担路由请求。但是当你的 `search/index` 工作负载比较高时，增加额外的客户端节点可以有利于请求路由。

```
$ curl 172.16.74.117:9200/_cat/nodes?v
ip            heap.percent ram.percent cpu load_1m load_5m load_15m node.role master name
172.16.74.120           28          99   8    1.45    1.34     1.54 mdi       -      iZbp14u93p47v72i0yvxicZ
172.16.74.118           66          97   8    0.96    1.36     1.45 mdi       -      iZbp14u93p47v72i0yvxigZ
172.16.75.9             29          97   7    1.47    1.65     1.46 mdi       -      iZbp109ka6i98dvzuntlf3Z
172.16.75.8             64          98   7    2.52    1.75     1.56 mdi       -      iZbp109ka6i98dvzuntlezZ
172.16.75.12            65          98   7    1.14    1.51     1.54 mdi       -      iZbp109ka6i98dvzuntlf1Z
172.16.74.116           64          94   8    1.46    1.67     1.74 mdi       *      iZbp14u93p47v72i0yvxidZ
172.16.74.59             8          68  11    0.53    0.75     0.89 i         -      iZbp15vaovl42trxmrjetbZ
172.16.74.115           10          96   8    1.48    1.50     1.52 mdi       -      iZbp14u93p47v72i0yvxifZ
172.16.75.10            30          98   7    1.78    1.38     1.30 mdi       -      iZbp14u93p47v72i0yvxihZ
172.16.74.119           44          96   8    2.77    2.03     1.81 mdi       -      iZbp14u93p47v72i0yvxieZ
172.16.74.117           56          99   8    2.04    1.96     1.77 mdi       -      iZbp14u93p47v72i0yvxihZ
172.16.75.11            35          99   8    1.52    1.55     1.57 mdi       -      iZbp109ka6i98dvzuntleyZ
172.16.74.60             7          68  10    0.96    0.97     1.00 i         -      iZbp15vaovl42trxmrjetaZ
172.16.75.13            67          97   8    1.46    1.46     1.56 mdi       -      iZbp109ka6i98dvzuntlf2Z
```

#### 2 Elasticsearch 是如何组织数据的

ElasticSearch 中，数据的存储涉及到如下几个概念：

- `index`: 在 es 中，数据通常会被存储在索引中，相当于关系型数据哭中的 table
- `documents`: 每个索引中包含一组相似的 json 格式的文档，该文档相当于关系型数据库中的 rows (`注意:` 在后来的版本中，取消了 type 的概念，官方认为 index 层就应该区分了类型)
- `shard`: 用于真正存储索引数据的逻辑存储，通常一个索引数据会存储在多个 shard 的多个副本中，用于提供数据索引的性能和数据的可用性。每个 shard 都是 Lucene 的一个完整实例，就像一个迷你搜索引擎。

> es 的秘密武器，其实是全文搜索引擎 `Lucene` 的倒排索引，当文档被索引时，Elasticsearch 会自动为每个字段创建一个反向索引，反向索引将术语映射到包含这些术语的文档。

> 当你去创建索引时，可以显示的指定索引的分片数量，以及每个主分片的副本数量。需要注意的是，一旦创建了索引，就不能修改主分片的数量了，否则就需要重新索引数据，而副本的数量则是可以在整个索引期间进行动态修改的。

> 注意：为了防止数据丢失，主分片需要确保每个副本分片不会处于相同的节点，否则可能造成分片数据丢失的风险。另外，如果是物理硬件，需要考虑到机架的可用性，幸运的是，es 也提供了 `aware rack` 的功能特性。

### 2 ElasticSearch 的关键性能指标

ElasticSearch 提供了大量的指标，可以帮助您检测故障的迹象，并在遇到诸如不可靠节点、内存不足错误和垃圾收集时间过长的问题时采取行动。

> - 搜索性能指标
> - 内存使用和垃圾回收
> - 主机级别网络和系统指标
> - 集群健康度和节点可用性
> - 资源饱和度和错误率

#### 1 搜索 (search) 性能指标

在 Elasticsearch 中，搜索请求和索引请求 (`search and index requests`) 是两种主要请求类型之一，类似与传统数据库中的读写请求。ElasticSearch 提供了在整个 search 请求过程中的主要指标 (`query and fetch`)。如下图，表明了一个 search 从开始到结束的整个过程。

- Step1: 客户端发送请求到 node-2
- Step2: Node-2 发送一个复制请求，到该索引的分片中
- Step3: 每个分片执行查询逻辑并返回结果给 node-2 节点，Node-2 对全部结果进行全局排序并编译成全局优先级队列
- Step4: Node-2 节点找出需要获取哪些文档，并向相关的分片发送一个 multi GET 请求
- Step5: 每个分片加载文档并将它们返回到 Node-2
- Step6: Node-2 将搜索结果交付给客户端

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7jicwsyzOibtdJiakQ5ickyTBJAApPmibMjibqjySyB79H1HS2tW7WffaxVYgukE6cZUS7L6jyl8iaziawaebqjFL15EPg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)Step1

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7jicwsyzOibtdJiakQ5ickyTBJAApPmibMjibqfAYFvExfAib4Z6GVJ3t8Mcr8ZZm5G6T2A2NCX2PibbrEYJGFf2GuEhTw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)Step2

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7jicwsyzOibtdJiakQ5ickyTBJAApPmibMjibq5ATfd6yN5wp3ibMAPLmSnkO0BtIQBZoUJ5XCRGD8ia7WOhDq7m0kCyPQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)Step3

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7jicwsyzOibtdJiakQ5ickyTBJAApPmibMjibqAVvItGqgvnw32n40VYrwxzibwJwABOQZhPFcb5d32ZhTxdCkHja6MSQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)Step4:

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7jicwsyzOibtdJiakQ5ickyTBJAApPmibMjibqbgRVib1bS3ibaEkAsSq9vwojVicibicHNWogHFmpN9OfmoqibhldB3cQJMng/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)Step5

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7jicwsyzOibtdJiakQ5ickyTBJAApPmibMjibqK72FvonYJOIPkI8OAzbwkd8vOrjys9y7FR5IQvXowInXJOh3FPxyaQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)Step6

如果您使用 Elasticsearch 主要用于搜索，或者搜索是面向客户的特性，该特性是整个业务的关键，那么您应该监视查询延迟，并在其超过阈值时采取行动。监控查询和获取的相关指标是很重要的，这可以帮助您确定您的搜索在一段时间内的执行情况。比如，你可能希望跟踪查询请求的峰值和长期增长，以此来准备调整您的配置以优化更好的性能和可靠性。

如下是一些核心指标：

| 指标描述                      | 指标名称                            | 指标类型 |
| :---------------------------- | :---------------------------------- | :------- |
| 查询 (query) 请求总数         | indices.search.query_total          | 吞吐     |
| 在查询 (query) 上花费的总时间 | indices.search.query_time_in_millis | 性能     |
| 当前在执行的查询 (query) 数量 | indices.search.query_current        | 吞吐     |
| fetches 的总数                | indices.search.fetch_total          | 吞吐     |
| fetches 上花费的总时间        | indices.search.fetch_time_in_millis | 性能     |
| 当前在执行的 fetch 数量       | indices.search.fetch_current        | 吞吐     |

因此，关于搜索 (`searching`) 性能指标，如下几个指标需要关注：

- `Query load`: 可以通过查看请求的总数，来查看集群的整体吞吐，并对潜在的突生突降指标进行预警。同时也需要监控线程池队列的大小 `thread_pool`
- `Query latency`: 查询延迟，我们可以通过 es 提供的指标进行计算，通过`定期抽样查询总数和总运行时间来计算平均查询延迟`。如果延迟超过阈值，请设置警报，如果触发警报，请查找潜在的资源瓶颈，或者调查是否需要优化查询。
- `Fetch latency`: 在 fetch 阶段，通常比查询阶段花费的时间要少得多，如果这个指标比较高，可能表示磁盘速度比较慢，文档内容较多 (搜索结果中突出显示相关文本) 或者请求太多导致的结果 (没有选择分页的结果，即全量数据查询)。

#### 2 索引 (indexing) 性能指标

如果你的 es 的写请求比较多，那么监控和分析 如何使用新信息更新索引是非常有效的。

我们都知道，当向索引添加新信息或更新或删除现有信息时，索引中的每个分片将通过两个过程更新：

- refresh
- flush

```
index refresh
```

新索引的文档不能立即用于搜索，首先，它们被写入内存中的缓冲区，等待下一次索引刷新 `refresh` (默认情况下每秒刷新一次)。

刷新过程从内存缓冲区的内容创建一个新的内存段 (使新索引的文档可搜索)，然后清空缓冲区，过程如下图。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7jicwsyzOibtdJiakQ5ickyTBJAApPmibMjibqx9pEpKZhGkkicfEpQefwB4esJsWpH8kxbJ1Nf3Q1au8RaJfgldHth4g/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)refresh 过程

索引的分片由多个不同的段 `segment` 组成，它是 Lucene 的核心数据结构，本质是索引的一个可更改的数据集合。这些段在每次刷新时创建，随后在后台随着时间的推移合并在一起，以确保有效地使用资源 (每个段使用文件句柄、内存和 CPU)。

段是小型倒排索引，将数据映射到包含这些数据的文档。每次搜索一个索引时，必须`依次搜索`每个切分中的每个段来搜索每个分片的主或副本版本。

段是不可变的，所以更新文档意味着：

- 在刷新过程中将信息写入新段
- 将旧信息标记为已删除

当过时的段与另一个段合并时，旧的信息最终会被删除。

```
index flush
```

当将新索引的文档添加到内存缓冲区的时候，它们还将被添加到分片的 translog 中 ，它是一个持久的，提前写入的操作事务日志。

每隔 30 分钟，或者当 translog 达到最大时 (512M) 时，就会触发一次 flush。

在 flush 过程中，在内存缓冲区的任何文档都会被 refresh (存储到新的 segments 中)，并且所有的内存中的 segment 都将会被提交到磁盘中，整个 translog 将被清理。

translog 可以防止在节点失败时数据丢失，它的设计是为了帮助分片在 flush 过程中数据丢失时的恢复操作。

translg 会每隔 5s 被提交到磁盘，或者当有有一个成功的 `index`,`delete`,`update` 或者 `bulk` 请求时。

整个 flush 过程如下：

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7jicwsyzOibtdJiakQ5ickyTBJAApPmibMjibqP3nwicgeUYMkZkzYwgD1knKsTBMUSnTYsrVnb9J2eluWibIZTKA9oTYg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)flush 过程

可以使用如下这些指标来评估索引性能和优化您更新索引的方式：

| 指标描述                     | 指标名称                              | 指标类型 |
| :--------------------------- | :------------------------------------ | :------- |
| 被索引的文档总数             | indices.indexing.index_total          | 吞吐     |
| 索引文档花费的总时间         | indices.indexing.index_time_in_millis | 性能     |
| 当前正在索引的文档总数       | indices.indexing.index_current        | 吞吐     |
| 索引 refresh 的总数          | indices.refresh.total                 | 吞吐     |
| refresh 索引总共话费的时间   | indices.refresh.total_time_in_millis  | 性能     |
| flush 到磁盘的索引总数       | indices.flush.total                   | 吞吐     |
| flush 到磁盘的索引总花费时间 | indices.flush.total_time_in_millis    | 性能     |

因此，关于索引 (`indexing`) 性能指标，如下几个指标需要关注：

- `indexing latency`: 需要注意的是，es 并没有直接公开该指标，但是可以使用 `index_total` 和 `index_time_in_millis` 指标计算出来。

如果注意到延迟增加，可以尝试使用批量接口一次索引多个文档。如果计划索引大量文档，并且不需要新的信息`立即用于搜索`，那么可以通过降低刷新频率来优化索引性能，直到完成索引.

```
# 关闭刷新频率限制，一旦索引完成，就可以恢复到默认值1。
curl -XPUT <nameofhost>:9200/<name_of_index>/_settings -d '{
     "index" : {
     "refresh_interval" : "-1"
     }
}'
```

- `Flush latency`: 由于数据在刷新成功完成之前不会持久保存到磁盘，因此跟踪刷新延迟并在性能开始下降时采取行动可能很有用。

如果您看到此指标稳步增长，则可能表明磁盘速度较慢存在问题；此问题可能会升级，并最终使您无法向索引中添加新信息。

可以使用 `index.translog.flush_threshold_size` 来修改 flush 的参数，降低 flush 阈值，该参数可以决定在 flush 触发之前，日志能够保留多大。如果是写多读少的场景，可以使用 `iostat` 来实时关注磁盘的压力。

#### 3 内存使用和垃圾回收

在运行 Elasticsearch 时，内存是需要密切监视的关键资源之一。

Elasticsearch 和 Lucene 会以两种方式使用节点上的全部可用内存：JVM 堆和文件系统缓存 (file system cache)，因此，在 ES 运行期间，整个 JVM 的垃圾回收持续时间和频率将很值得监控。

```
JVM heap
```

ElasticSearch 官方建议分配给 JVM 堆的可用 RAM 不超过 50%，并且不超过 32 GB。分配给 Elasticsearch 的堆内存越少，Lucene 可用的 RAM 就越多，Lucene 严重依赖文件系统缓存来快速处理请求。但是，您也不希望将堆大小设置得太小，因为您可能会遇到内存不足错误或吞吐量降低，因为应用程序面临频繁的垃圾收集导致的持续的短暂停。ElasticSearch 设置堆内存可以参考官方文档，或者参考使用说明。

a-heap-of-trouble：https://www.elastic.co/cn/blog/a-heap-of-trouble

```
# 查看节点的堆内存使用情况
curl -XGET http://<nameofhost>:9200/_cat/nodes?h=heap.max
垃圾回收
```

Elasticsearch 依赖于垃圾收集进程来释放堆内存。因为垃圾收集使用资源 (为了释放资源！)，您应该密切关注它的频率和持续时间，以确定是否需要调整堆大小。将堆设置得过大会导致垃圾收集时间过长；这些过度的暂停是危险的，因为它们可能导致集群错误地将节点注册为已经脱离网络。

如下是一些关于垃圾回收相关的指标：

| 指标描述         | 名称                                              | 指标类型   |
| :--------------- | :------------------------------------------------ | :--------- |
| 年轻代 GC 总次数 | jvm.gc.collectors.young.collection_count          | 其他       |
| 年轻代 GC 总时间 | jvm.gc.collectors.young.collection_time_in_millis | 其他       |
| 老年代 GC 总次数 | jvm.gc.collectors.old.collection_count            | 其他       |
| 老轻代 GC 总时间 | jvm.gc.collectors.old.collection_time_in_millis   | 其他       |
| JVM 堆内存使用率 | jvm.mem.heap_used_percent                         | 资源使用率 |
| JVM 堆提交次数   | jvm.mem.heap_committed_in_bytes                   | 资源使用率 |

值得关注的几个指标：

- `JVM heap in use`: 当 JVM 堆使用率达到 75% 时，将设置 Elasticsearch 来启动垃圾收集。当 JVM 使用率长期处于较高位置，我们就需要增加堆的空间，或者通过增加节点来向外扩展集群。
- `JVM heap used vs. JVM heap committed`:
- `Garbage collection duration and frequency`: 当 JVM 进行 GC 时，年轻代和老年代都会经历 STW 过程，在这期间，进程将无法提供工作。需要注意的是，主节点每隔 30 秒检查其他节点的状态，如果任何节点的垃圾收集时间超过 30 秒，它将导致主节点认为该节点已经失败。
- `Memory usage`: Elasticsearch 很好地利用了没有分配给 JVM 堆的任何 RAM。和 Kafka 一样，Elasticsearch 的设计依赖于操作系统的文件系统缓存来快速可靠地服务请求。如果 segment 最近被写入磁盘，那相关数据就已经在缓存中了，但是，如果一个节点已经关闭并重新启动，那么第一次查询一个段时，很可能必须从磁盘读取信息。这就是为什么确保集群保持稳定、节点不会崩溃非常重要的原因之一。

#### 4 主机级别的网络和系统指标

| 名称                        | 指标类型   |
| :-------------------------- | :--------- |
| 磁盘可用空间                | 资源使用率 |
| I/O utilization             | 资源使用率 |
| CPU usage                   | 资源使用率 |
| Network bytes sent/received | 资源使用率 |
| Open file descriptors       | 资源使用率 |

虽然 Elasticsearch 通过 API 提供了许多特定于应用程序的指标，但您还应该从每个节点收集和监控多个主机级指标。

需要重点关注的指标：

- `I/O utilization`: 在创建、查询和合并段的过程中，Elasticsearch 会对磁盘进行大量的写入和读取，对于有大量的写操作的集群，集群持续的会有大量的 I/O 活动过的，建议可以使用 SSD 来提高性能。
- `CPU utilization on your nodes`: 通常情况下，可以创建三个不同的图来表示集群中的每一组节点 (例如数据节点、主节点和客户端节点)，以查看一种类型的节点与另一种节点相比是否超载了活动。如果您看到 CPU 使用量增加，这通常是由繁重的搜索或索引工作负载造成的。设置一个通知以查明您的节点 CPU 使用率是否持续增加，并添加更多节点以在需要时重新分配负载。
- `Network bytes sent/received`: 节点之间的通信是平衡集群的关键组成部分。Elasticsearch 提供了关于集群通信的传输度量，但是您还可以查看发送和接收字节的速率，以了解您的网络正在接收多少流量。
- `Open file descriptors`: 文件描述符用于节点到节点的通信、客户端连接和文件操作。如果这个数字达到了你的系统的最大容量，那么新的连接和文件操作将不可能，直到旧的已经关闭。如果超过 80% 的可用文件描述符正在使用中，您可能需要增加系统的最大文件描述符计数。大多数 Linux 系统对每个进程只允许 1024 个文件描述符，在世纪运行过程中，我们建议应将 OS 文件描述符计数重置为更大的值，例如 64000。
- `HTTP connections`: 整个 es 的数据读写都是通过 RESTful API 通信的，因此需要关注 HTTP 链接相关的监控指标。如果打开的连接数 `http.current_open` 不断增加，则表明客户端没有正确的使用持久链接，重新建立连接会使请求响应时间增加几毫秒甚至几秒 `http.total_opened`。确保您的客户端配置正确以避免对性能的负面影响，或者使用官方的 Elasticsearch 客户端，它已经正确配置了 HTTP 连接。

#### 5 集群健康和节点可用性

| 指标描述                      | 指标                               | 指标类型   |
| :---------------------------- | :--------------------------------- | :--------- |
| 集群状态 (green, yellow, red) | cluster.health.status              | 其他       |
| 节点数量                      | cluster.health.number_of_nodes     | 资源可用性 |
| 正在初始化的分片数            | cluster.health.initializing_shards | 资源可用性 |
| 未分配的分片数                | cluster.health.unassigned_shards   | 资源可用性 |

- `Cluster status`: 如果集群状态为黄色，则至少有一个副本碎片未分配或丢失，搜索结果仍将是完整的，但如果更多碎片消失，您可能会丢失数据；红色的集群状态表示至少丢失了一个主分片，并且丢失了数据，这意味着搜索将返回部分结果。通常情况下，我们需要尽快发现集群的一场状态。
- `Initializing and unassigned shards`: 当您第一次创建索引时，或者当一个节点被重新引导时，由于主节点试图为集群中的节点分配切分，因此在转换到启动或未分配状态之前，它的切分将短暂地处于初始化状态。如果您看到分片处于初始化或未分配状态的时间过长，这可能是集群不稳定的警告信号。

#### 6 资源饱和度和错误

Elasticsearch 节点使用线程池来管理线程如何消耗内存和 CPU。

由于线程池设置是根据处理器的数量自动配置的，因此调整它们通常没有意义。

但是，建议关注 `队列和拒绝`，以确定节点是否无法跟上进度，如果较多，可能需要添加更多节点来处理`所有并发请求`。Fielddata 和过滤器缓存的使用情况是另一个需要监视的领域，因为回收可能导致查询效率低下或内存压力的迹象。

```
Thread pool queues and rejections
```

每个节点都包含了几种类型的线程池，具体希望关注哪种对象使用，取决于对 ElasticSerach 的使用。

通常需要关注的是 `search` `merge` `bulk` 的线程池，他们与对应的请求类型对应。

`bulk thread pool` 现在也归类到` write thread pool`(包含 writes/updates/deletes 请求)。每个线程池队列的大小表示节点当前处于容量状态时等待服务的请求数量，队列允许节点跟踪并最终为这些请求提供服务，而不是丢弃它们。

一旦到达线程池的最大队列大小 (根据线程池的类型而不同)，就会发生线程池拒绝。

需要关注的指标名称：

| 指标描述               | 指标名称                                                     | 类型       |
| :--------------------- | :----------------------------------------------------------- | :--------- |
| 线程池的队列数         | thread_pool.search.queue/thread_pool.merge.queue/thread_pool.write.queue/thread_pool.index.queue* | 资源饱和度 |
| 线程池中被拒绝的线程数 | thread_pool.search.rejected/thread_pool.merge.rejected/thread_pool.write.rejected/thread_pool.index.rejected* | 资源错误   |

需要关注的几个指标：

- `Thread pool queues`: 比较大的队列不是个好主意，因为它们会耗尽资源，而且在节点宕机时还会增加丢失请求的风险。如果您看到排队和被拒绝的线程数量稳步增加，您可能想尝试减慢请求的速度 (如果可能的话)，增加您的节点上的处理器数量，或者增加集群中的节点数量。如下面的屏幕截图所示，查询负载峰值与搜索线程池队列大小峰值相关，因为节点试图跟上查询请求的速度。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7jicwsyzOibtdJiakQ5ickyTBJAApPmibMjibqXibIicmCISfVxy3T2ib8mqoBdz0M4I6G2IlNPt7jvDVQTAstM10fTnayA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)线程池队列

- `Bulk rejections and bulk queues`: 通常，如果您想要执行许多操作 (创建索引或添加、更新或删除文档)，您应该尝试将请求作为一个批量操作发送，而不是多个单独的请求。批量拒绝通常与试图在一个批量请求中索引太多文档有关。

```
Cache usage metrics
```

每个查询请求被发送到索引中的每个分片，然后每个分片的每个片段都会被访问。Elasticsearch 按段缓存查询，以加快响应时间。

另一方面，如果您的缓存占用了太多的堆，它们可能会减慢而不是加速。

在 es 中，文档中的每个字段可以以两种形式之一存储：精确值或全文。

作为精确值（例如时间戳记或年份）将按照其索引编制的方式进行存储，因为您不希望 1/1/16 来作为 “2016 年 1 月 1 日” 的查询。

如果一个字段被存储为全文，这意味着它基本上被分析，它被分解为记号，并且，根据分析器的类型，标点符号和停止词 (如 is 或 the) 可能会被删除。分析器将字段转换为规范化格式，使其能够匹配更广泛的查询。

Elasticsearch 使用两种主要类型的缓存来更快地提供搜索请求: `fielddata 和 filter`。

```
FIELDDATA CACHE
```

fielddata 缓存在对一个字段进行排序或聚合时使用，这个过程基本上必须对反向索引进行反求，以按文档顺序创建每个字段的每个字段值的数组。

```
FILTER CACHE
```

过滤器缓存也使用 JVM 堆。在 2.0 之前的版本中，Elasticsearch 以堆的 10% 的最大值自动缓存过滤过的查询，并驱逐最近最少使用的数据。在 2.0 之后的版本，Elasticsearch 根据频率和段大小自动开始优化其过滤器缓存 (缓存仅发生在文档少于 10,000 或索引中文档总数少于 3% 的段上)。

```
Pending tasks
```

| 指标描述                                | 指标名称                      | 类型       |
| :-------------------------------------- | :---------------------------- | :--------- |
| pending 状态任务数                      | pending_task_total            | 资源饱和度 |
| `紧急(urgent)`pending 状态任务数        | pending_tasks_priority_urgent | 资源饱和度 |
| `高优(high-priority)`pending 状态任务数 | pending_tasks_priority_high   | 资源饱和度 |

待处理的任务只能由主节点处理。

这些任务包括创建索引和将分片分配给节点。

挂起的任务按优先级顺序处理，紧急优先，然后高优先级。当

更改的数量比主程序处理它们的速度更快时，它们就开始累积。

需要持续关注该指标，不让其不断增加。

挂起任务的数量可以很好地指示集群操作的顺畅程度。如果您的主节点非常繁忙，而挂起的任务数量没有减少，则可能导致集群不稳定。

```
Unsuccessful GET requests
```

| 指标描述                       | 指标名称                           | 类型        |
| :----------------------------- | :--------------------------------- | :---------- |
| miss 状态的 GET 请求           | indices.get.missing_total          | Work: Error |
| miss 状态的 GET 请求花费的时间 | indices.get.missing_time_in_millis | Work: Error |

GET 请求比普通的搜索请求更直接，它根据文档的 ID 检索文档。

一个不成功的 get-by-ID 请求意味着没有找到文档 ID，这种类型的请求通常不会有问题，但是当不成功的 GET 请求发生时，可能需要注意下。



## 如何收集 ElasticSearch 的指标

ElasticSearch 指标收集工具:

- 集群健康状态和各种性能 API
- 有表格数据的`_cat` API
- 开源的监控工具 (ElasticHQ, Kopf, Marvel)

### 1. RESTFull API + JSON

默认情况下，集群对外开启了 9200 端口，用于整个集群的管理操作、索引的增删改查，以及整体集群、节点、索引的状态信息，通常需要关注如下几个对外 API。

- Node Stats API: 节点状态 API
- Cluster Stats API: 集群状态 API
- Index Stats API: 索引状态 API
- Cluster Health API: 集群健康状态 API
- Pending Tasks API: 阻塞任务状态 API

如下表列出了一些常见的指标以及对应的 API 接口。

| Metrics 分类         | 可用的 API                                                   |
| :------------------- | :----------------------------------------------------------- |
| 检索性能指标         | Node Stats API, Index Stats API                              |
| 索引性能指标         | Node Stats API, Index Stats API                              |
| 内存和垃圾回收 GC    | Node Stats API, Cluster Stats API                            |
| 网络指标             | Node Stats API                                               |
| 集群健康和节点可用性 | Cluster Health API                                           |
| 资源饱和度和错误     | Node Stats API，Index Stats API，Cluster Stats API，Pending Tasks API |

**1.1 Node Stats API**

Node 状态接口是一个功能强大的工具，能提供除集群运行状况和挂起任务外几乎全部的性能指标。

`注意:` 对于节点状态 API 来讲，最重要的就是 `indices` 和

- 集群名称以及节点状态

- 节点元数据 (名称，角色，)

- `indices`: 索引相关数据

- 

- - 索引文档统计和存储统计 (docs,store)

- 

- - 索引内部操作统计 (`indexing`,get,`search`,merges,`refresh`,`flush`,warmer,query_cache,fielddata,completion,segments,translog,request_cache,recovery)

- `os`: 节点系统层指标

- 

- - cpu 使用率

- 

- - 负载状态 (1,5,15)

- 

- - 内存使用率 (es 统计的内存会将 buffer/cache 算进去)

- 

- - Cgroup 信息 (使用 systemd 管理的 cpuacct,cpu,memory)

- `process`: 进程状态信息

- 

- - FD 限制和使用

- 

- - 进程对 cpu 和 mem 的使用

- `jvm`: 节点 JVM 指标

- 

- - 内存整体指标 (堆内存，非堆内存，JVM 区域内存)

- 

- - gc 情况统计 (年轻代和老年代垃圾收集)

- 

- - 线程数

- 

- - buffer 池状态 (直接访问和映射状态)

- 

- - 加载的类情况

- `fs`: 文件系统

- 

- - 文件系统元数据和使用率

- 

- - IO stats

- `transport`: 传输状态

- 

- - 进出包数据统计以及流量

- `thread_pool`: 各种操作的线程池状态

- 

- - bulk

- 

- - fetch_shard_started

- 

- - fetch_shard_store

- 

- - flush

- 

- - force_merge

- 

- - generic

- 

- - get

- 

- - index

- 

- - listener

- 

- - management

- 

- - refresh

- 

- - search

- 

- - snapshot

- 

- - warmer

`注意:` 在 ElasticSearch 的所有对外接口参数中，`pretty` 的 URI 参数标识以 json 格式进行输出，否则将输出的是字符串。

```
# 查看集群全部节点的指标
$ curl "localhost:9200/_nodes/stats"

# 输出的3级指标
{
    "_nodes":{
        "total":6,
        "successful":6,
        "failed":0
    },
    "cluster_name":"prod-one-id",
    "nodes":{
        "T3bjsBQUSeu0bstT7m8LCA":{
            "timestamp":1604802841283,
            "name":"iZbp11gqesu0zk5sqrgwu4Z",
            "transport_address":"172.16.71.231:9300",
            "host":"172.16.71.231",
            "ip":"172.16.71.231:9300",
            "roles":Array[3],
            "indices":Object{...},
            "os":Object{...},
            "process":Object{...},
            "jvm":Object{...},
            "thread_pool":Object{...},
            "fs":Object{...},
            "transport":Object{...},
            "http":Object{...},
            "breakers":Object{...},
            "script":Object{...},
            "discovery":Object{...},
            "ingest":Object{...},
            "adaptive_selection":Object{...}
        },
        "93HMUUReSYeQEaNTfNUWCQ":Object{...},
        "_6TNUy4nSZ-jxumgiroqlg":Object{...},
        "cEEZcNJGS0mSgppe82SZ9Q":Object{...},
        "utKipUwYQpi9ac4Q7sI53g":Object{...},
        "SE7IppNARjugsLSnPhil9g":Object{...}
    }
}
```

在集群规模比较大时，整个 node 的状态数据会比较多，此时可以指定 `id,address,name` 或者节点的其他属性来查看指定节点的状态信息。

```
# 可以指定节点id，ip，name

$ curl -s  ":9200/_nodes/T3bjsBQUSeu0bstT7m8LCA/stats"
$ curl -s  ":9200/_nodes/172.16.71.231/stats"
$ curl -s  ":9200/_nodes/iZbp11gqesu0zk5sqrgwu4Z/stats"
```

当然，有时候，我们依然觉得，单个节点的指标比较多，我们对某些指标项目进行过滤。

```
# 查看某个节点的指定指标
$ curl -s  ":9200/_nodes/172.16.71.231/stats/jvm,os "
```

**1.2 Cluster Stats API**

集群指标接口提供了集群范围内的信息，因此，它基本上是集群中每个节点的所有统计数据相加。虽然提供的数据不够详细，但是对于快速了解集群状态是非常有用的。

集群级别比较重要的几个指标

- `status`: 集群状态 (green|red|yellow)
- `nodes`: 集群的整体节点统计信息 (`/_nodes/stats` 的求和，指标和指标项会比较精简:fs,jvm,os,process )
- `indices`: 集群的索引整体状况

```
# 查看集群整体状况
$ curl -s  "localhost:9200/_cluster/stats"


# 输出的三级指标
{
    "_nodes":{
        "failed":0,
        "successful":6,
        "total":6
    },
    "cluster_name":"prod-one-id",
    "indices":{
        "completion":Object{...},
        "count":5,
        "docs":Object{...},
        "fielddata":Object{...},
        "query_cache":Object{...},
        "segments":Object{...},
        "shards":Object{...},
        "store":Object{...}
    },
    "nodes":{
        "count":Object{...},
        "fs":Object{...},
        "jvm":Object{...},
        "network_types":Object{...},
        "os":Object{...},
        "plugins":Array[0],
        "process":Object{...},
        "versions":Array[1]
    },
    "status":"green",
    "timestamp":1604806385128
}
```

**1.3 Index Stats API**

Index 状态接口可以反映一个指定索引的状态信息。

使用该接口可以快速查看索引的分片状态，主分片的各个操作详情统计，以及单个索引的详情统计

- `indices` 下具体索引的详情信息 (indexing,get,search,merges,refresh,flush)

```
# 查看指定索引的状态信息
# .elastichq 为索引名称
$ curl -s localhost:9200/.elastichq/_stats



# 输出的三级指标
{
    "_shards":{
        "total":10,
        "successful":10,
        "failed":0
    },
    "_all":{
        "primaries":Object{...},
        "total":Object{...}
    },
    "indices":{
        ".elastichq":{
            "primaries":Object{...},
            "total":Object{...}
        }
    }
}
```

**1.4 Cluster Health HTTP API**

在所有对外接口中，提供集群级别的运行态数据外，还提供了集群健康状态的接口。

该接口可以公开整个集群运行状况的关键信息。

```
$  curl localhost:9200/_cluster/health
# 集群健康状态
{
    "cluster_name":"prod-one-id",
    "status":"green",
    "timed_out":false,
    "number_of_nodes":6,
    "number_of_data_nodes":6,
    "active_primary_shards":13,
    "active_shards":31,
    "relocating_shards":0,
    "initializing_shards":0,
    "unassigned_shards":0,
    "delayed_unassigned_shards":0,
    "number_of_pending_tasks":0,
    "number_of_in_flight_fetch":0,
    "task_max_waiting_in_queue_millis":0,
    "active_shards_percent_as_number":100
}
```

**1.5 Pending Tasks API**

待处理任务 API 是一种快速查看群集中待处理任务的快速方法。

需要注意的是，`pending task` 是只有主节点才能执行的任务，比如创建新索引或者重建集群的分片。

如果主节点无法跟上这些请求的速度，则挂起的任务将开始排队。

```
$ curl localhost:9200/_cluster/pending_tasks
{"tasks":[]}
```

正常情况下，将返回空的待处理任务。

否则，您将收到关于每个未决任务的优先级、它在队列中等待了多长时间以及它代表了什么动作的信息

```
{
  "tasks" : [ {
    "insert_order" : 13612,
    "priority" : "URGENT",
    "source" : "delete-index [old_index]",
    "executing" : true,
    "time_in_queue_millis" : 26,
    "time_in_queue" : "26ms"
  }, {
    "insert_order" : 13613,
    "priority" : "URGENT",
    "source" : "shard-started ([new_index][0], node[iNTLLuV0R_eYdGGDhBkMbQ], [P], v[1], s[INITIALIZING], a[id=8IFnF0A5SMmKQ1F6Ot-VyA], unassigned_info[[reason=INDEX_CREATED], at[2016-07-28T19:46:57.102Z]]), reason [after recovery from store]",
    "executing" : false,
    "time_in_queue_millis" : 23,
    "time_in_queue" : "23ms"
  }, {
    "insert_order" : 13614,
    "priority" : "URGENT",
    "source" : "shard-started ([new_index][0], node[iNTLLuV0R_eYdGGDhBkMbQ], [P], v[1], s[INITIALIZING], a[id=8IFnF0A5SMmKQ1F6Ot-VyA], unassigned_info[[reason=INDEX_CREATED], at[2016-07-28T19:46:57.102Z]]), reason [master {master-node-1}{iNTLLuV0R_eYdGGDhBkMbQ}{127.0.0.1}{127.0.0.1:9300} marked shard as initializing, but shard state is [POST_RECOVERY], mark shard as started]",
    "executing" : false,
    "time_in_queue_millis" : 20,
    "time_in_queue" : "20ms"
  } ]
}
```

### 2. cat API

CAT 接口也提供了一些查看相同指标的可选方案，类似于 UNIX 系统中的 `cat` 命令。

```
$ curl :9200/_cat
=^.^=
/_cat/allocation
/_cat/shards
/_cat/shards/{index}
/_cat/master
/_cat/nodes
/_cat/tasks
/_cat/indices
/_cat/indices/{index}
/_cat/segments
/_cat/segments/{index}
/_cat/count
/_cat/count/{index}
/_cat/recovery
/_cat/recovery/{index}
/_cat/health
/_cat/pending_tasks
/_cat/aliases
/_cat/aliases/{alias}
/_cat/thread_pool
/_cat/thread_pool/{thread_pools}
/_cat/plugins
/_cat/fielddata
/_cat/fielddata/{fields}
/_cat/nodeattrs
/_cat/repositories
/_cat/snapshots/{repository}
/_cat/templates
```

比如，我们可以使用 `curl localhost:9200/_cat/nodes?help` 来查看 node api 相关的指标和描述，进而采用这些描述来查询具体的指标项。

如果我们只想查看节点的堆内存使用率、合并数量 (merges) 以及段数量 (segments)，可以采用如下方式来查看:

```
# 指定查看每个节点的堆内存使用率，段数量和合并数量
$ curl ":9200/_cat/nodes?h=http,heapPercent,segmentsCount,mergesTotal"
172.16.71.231:9200 56 99 108182
172.16.71.229:9200 31 95 122551
172.16.71.232:9200 50 66  73871
172.16.71.230:9200 41 63  76470
172.16.71.234:9200 32 64  93256
172.16.71.233:9200 14 90 136450
注意:` 上述输出相当于是 Node Stats API 中的 `jvm.mem.heap_used_percent,segments.count,merges.total
```

整个 CAT 接口是一个可以快速获取集群，节点，索引以及分片的状态数据，并且能够以可读的方式展示出来。

### 3. 已实现的开源工具

虽然整个 ES 对外的接口已经能够提供很好的接口来描述瞬时的指标，但是通常情况下，我们有很多节点需要进行持续的监控，而接口的 JSON 格式又不便于我们进行解析和分析，很难快速识别到问题节点并及时发现问题趋势。

为了更加有效的监控 ElasticSearch，我们通常需要一些工具来定期采集 API 的指标数据，然后聚合指标结果来反应当前集群的整体状态。而在开源社区中，也产生了很多这种类似的工具系统。

**3.1 ElasticHQ**

ElasticHQ 是一个可座位托管方案，插件化下载的开源监控工具。它能够提供你的集群，节点，索引，以及一些相关的查询和映射的指标。

ElasticHQ 会自动对指标进行颜色编码，以突出潜在的问题。

插件化安装:

```
$ ${ES_HOME}/bin/elasticsearch-plugin install royrusso/elasticsearch-HQ
```

安装完成后，可以访问 `:9200/_plugin/hq/` 来访问当前集群的监控信息。

使用 Docker 进行托管方式安装:

```
$ docker run -itd -p 8081:5000 -v /opt/data/elastichq:/src/db --restart=always --name elastichq  elastichq/elasticsearch-hq
```

接下来，就可以访问主机的 8081 端口来查看 ElasticHQ 的监控管理了，需要注意的是，此时需要添加集群地址.

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7jicwsyzOibtdJiakQ5ickyTBJAApPmibMjibqQQEtg7nPwyNRqCuMhAucqwwECKjNF5icsMjXqSFhHT3F1v19hqKwibKg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)多集群管理

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7jicwsyzOibtdJiakQ5ickyTBJAApPmibMjibqYwNf4y0bbfoDwhMudREzyRQwZvX32KZct7k1mFiaIGUWiaxYMZPyOiaWw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)集群概览

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7jicwsyzOibtdJiakQ5ickyTBJAApPmibMjibqDT6eVgYxkJGkPy67KWB4Ej40zCY9r2zo3ibG7vgqqglicLA3Ovak6uyw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)索引状态

**3.2 其他监控插件**

开源领域也有其他插件，比如 kopf 和 Cerebro 前者比较老，且现在不再更新了，而后者是一个比较全面的监控工具，且支持 LDAP 工具登录。

```
# ldap 的配置信息
$ cat env-ldap
# Set it to ldap to activate ldap authorization
AUTH_TYPE=ldap

# Your ldap url
LDAP_URL=ldap://exammple.com:389

LDAP_BASE_DN=OU=users,DC=example,DC=com

# Usually method should  be "simple" otherwise, set it to the SASL mechanisms
LDAP_METHOD=simple

# user-template executes a string.format() operation where
# username is passed in first, followed by base-dn. Some examples
#  - %s => leave user untouched
#  - %s@domain.com => append "@domain.com" to username
#  - uid=%s,%s => usual case of OpenLDAP
LDAP_USER_TEMPLATE=%s@example.com

# User identifier that can perform searches
LDAP_BIND_DN=admin@example.com
LDAP_BIND_PWD=adminpass

# Group membership settings (optional)

# If left unset LDAP_BASE_DN will be used
# LDAP_GROUP_BASE_DN=OU=users,DC=example,DC=com

# Attribute that represent the user, for example uid or mail
# LDAP_USER_ATTR=mail

# If left unset LDAP_USER_TEMPLATE will be used
# LDAP_USER_ATTR_TEMPLATE=%s

# Filter that tests membership of the group. If this property is empty then there is no group membership check
# AD example => memberOf=CN=mygroup,ou=ouofthegroup,DC=domain,DC=com
# OpenLDAP example => CN=mygroup
# LDAP_GROUP=memberOf=memberOf=CN=mygroup,ou=ouofthegroup,DC=domain,DC=com



$ docker run -p 9000:9000 --env-file env-ldap  lmenezes/cerebro
```

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7jicwsyzOibtdJiakQ5ickyTBJAApPmibMjibqgwSLKW6icWCY3JByYWfPia08gVHM7s4rOorWSy8o0on1mCjqzOJwqXVg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)登录首页

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7jicwsyzOibtdJiakQ5ickyTBJAApPmibMjibq5q6VRKhy2m0ibW0tYjd98OZ0aLDohCms9fq1dzsicg0hUeM26xBXMFFQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)集群概况以及索引信息

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7jicwsyzOibtdJiakQ5ickyTBJAApPmibMjibqibTUHK9eJ7da79rqVHBt0sTQytQ7VejyrmwEqibm8kGiajcafDy0qMuZA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)节点状态

## 如何解决 ES 的性能和扩展性问题

通常情况下，一些优秀的开源软件通常都意味着用户可以快速的启动并运行起来，但这并不能保证你的整个集群就是可以一直的稳定运行下去，这和具体的业务场景有一定关系，当然，也可以长时间运行的软件有关，就好比行驶中的汽车或不断变老的我们，需要在不断的使用过程中，进行保养和维修，才能保证能够相对稳定且高效的运行下去。

### 问题 1: 集群状态变为 red 或者 yello 应该怎么做

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7jicwsyzOibtdJiakQ5ickyTBJAApPmibMjibqb6ia6EKFHVNALZn3hz6O1IY0Anbx89iaRNibwtEHrnc3FONCcqJ6oe8vw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)集群状态

`注意`: 如果丢失一个或多个主分片 (及其副本)，则集群状态报告为红色，如果丢失一个或多个副本分片，则报告为黄色。

通常情况下，当某个节点由于某种原因 (硬件故障，垃圾回收时间过长) 离开或退出集群时，就会发生这种情况。

一旦节点恢复，其分片在转换回活动状态之前将保持初始化状态。

初始化分片的数量通常在节点重新加入集群时达到峰值，然后在分片转换到活动状态时下降。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7jicwsyzOibtdJiakQ5ickyTBJAApPmibMjibqXkmDwJI3uBrVlunUaUwPl678ZRZA9P2B7TNjwWqLn9sAZWQKPA0SZQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)分片状态变更

在初始化期间，集群状态可能会从绿色变为黄色或者红色，直到恢复节点上的分片为活动状态。

一般而言，当设置了集群的自动迁移分片和自动均衡，如果集群出现了状态为 red 或者 yello 时，不需要管理员进行过多的关注，节点在及时加入后能够尽快的实现相对的均衡。

但是，如果集群在 red 或者 yellow 状态停留了较长时间，我们就需要及时去查看集群识别的正确 Elasticsearch 节点数量。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7jicwsyzOibtdJiakQ5ickyTBJAApPmibMjibqPTgBpQhX8heaUVBnkPtkOVHEMgYlibwgoazmPJwEnJkfFC3tE7FIFSw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)集群活跃节点状态

如果活动节点的数量低于预期，则意味着至少有一个节点丢失了连接，无法重新加入集群，此时应该在节点的日志中查看如下相关的行:

```
[TIMESTAMP] ... Cluster health status changed from [GREEN] to [RED]
```

通常情况下，节点故障的原因会比较复杂，从硬件故障到管理程序故障到内存不足等等错误都可能导致整个节点故障。

**总结**

因此，我们可以借助于上面的 `ElasticHQ` 和 `Cobrao` 监控工具，来查看节点故障时，相关的性能指标如何。例如当前搜索 `search` 或索引请求 `indexing requests` 速率的突然峰值。

如果是由于短暂故障，我们可以立马对相关操作进行隔离，并进行快速恢复集群节点；如果是永久性故障，并且无法恢复节点，则可以通过快速添加节点，并让 ElasticSearch 负责从可用的副本分片中自动恢复；副本分片可以升级为主分片，并在新添加的节点上进行重新分发。

但是，如果您丢失了一个碎片的主副本和副本副本，那么您可以使用 Elasticsearch 的快照和恢复模块来尽可能多地恢复丢失的数据。

如果您还不熟悉这个模块，那么可以使用它在远程存储库中存储索引的快照，以便进行备份。

### 问题 2: 在运行的数据节点磁盘满了

如果所有数据节点的磁盘空间都不足，则需要向集群添加更多数据节点。

还需要确保索引有足够的主分片，以便能够在所有这些节点之间平衡它们的数据。

但是，如果只有某些节点耗尽了磁盘空间，这通常表明您初始化的索引分片太少。

如果一个索引由几个非常大的分片组成，那么 Elasticsearch 很难以均衡的方式将这些分片分布到各个节点上。

在给节点分配分片时，Elasticsearch 会考虑可用的磁盘空间。默认情况下，它不会为使用超过 85% 磁盘的节点分配 shard，一般而言，我们也需要对磁盘进行配置报警，以提前发现整个磁盘的可用性。

因此，在这个问题上，通常是一个集群或业务规划，以及告警运维的问题。

如果数据盘容量，实在已经到了瓶颈，一种方法是删除过期的数据并将其存储在集群中。

这对所有用户来说可能不是一个可行的选项，但是，如果您存储基于时间的数据，您可以在集群外存储旧索引数据的快照以进行备份，并更新索引设置以关闭对这些索引的复制。

如果集群的数据不能进行删除，第二种方法就是选择垂直或者水平扩容。

垂直扩容可直接扩展磁盘空间即可；水平扩容需要进行节点以及分片的动态迁移。

为了更好地适应未来的增长，您最好重新索引数据并在新创建的索引中指定更多的主分片 (确保您有足够的节点来均匀地分布这些分片)。

另一种水平伸缩的方法是通过 `创建新索引来滚动索引，并使用别名将两个索引连接到一个名称空间中`。

尽管在单个分片上可以存储多少数据在技术上没有限制，但是 Elasticsearch 建议每个分片上有 50gb 的软上限，您可以使用它作为一个通用准则，指示何时开始新的索引。

**总结**

其实对于 ElasticSearch 的容量问题，可以归结为规划问题，一般而言，在构建初始集群时，我们需要选择相对高配且适合的硬件，并且在构建集群初期需要考虑到未来的数据量规模；另外就是索引的规划问题，一般而言，当业务方索引数据时，建议使用一定的规范进行设计索引结构，并且在创建索引前期做好容量和分片的规划。

```
# 索引容量 （30G 是考虑到单分片数据量的迁移成本和索引成本）
索引未来容量=分片数*30G

# 集群容量 (N 代表集群的索引数量)
集群容量=(索引未来容量*副本数量) * N 
```

### 问题 3: 搜索花费了较长时间

根据搜索的数据类型和每个查询的结构，搜索性能有很大的不同。

因此，一般的做法是，需要将 ElasticSearch 中的检索上下文拿出来进行分析。

根据数据组织方式的不同，在找到有助于提高搜索性能的方法之前，您可能需要试验几种不同的方法，通常用的几种方式:

- 自定义路由 (`custom routing`)
- 强制合并 (`force merging`)

通常，当节点接收到搜索请求时，它需要将该请求通信到索引中每个分片的副本 (主或副本)。

自定义路由 允许我们将数据存储在同一分片上，因此只需要搜索单个分片即可满足查询。

例如，您可以在您的索引 `blog_index` 中为 `blogger` 类型指定映射中的 `_routing` 值，从而将所有 blogger1 数据存储在同一个碎片上。

首先，确保 `_routing` 被设置，这样当您索引 `blogger` 类型的信息时，您就不会忘记指定一个自定义路由值。

```
curl -XPUT "localhost:9200/blog_index" -d '
{
  "mappings": {
    "blogger": {
      "_routing": {
        "required": true 
      }
    }
  }
}'
```

当您准备索引属于 blogger1 的文档时，请指定路由值:

```
curl -XPUT "localhost:9200/blog_index/blogger/1?routing=blogger1" -d '
{
  "comment": "blogger1 made this cool comment"
}'
```

现在，为了搜索 blogger1 的内容，您需要记住在查询中像这样指定路由值:

```
curl -XGET "localhost:9200/blog_index/_search?routing=blogger1" -d '
{
  "query": {
    "match": {
      "comment": {
        "query": "cool comment"
      }
    }
  }
}'
```

在 Elasticsearch 中，每个搜索请求必须检查它命中的每个分片的每个段。

因此，一旦您减少了需要搜索的切分的数量，您还可以通过在一个或多个索引上触发强制合并 API 来减少每个分片上段的数量。

只要考虑到触发大量合并的计算成本，就值得对该特性进行试验。

但是，当涉及到具有大量分段的分片时，强制合并过程的计算成本会高得多。

例如，强行合 10,000 个段到 5,000 个段的索引并不需要花费很多时间，但是将 10,000 个段一直合并到一个段可能需要几个小时。必须发生的合并越多，从满足搜索请求中带走的资源就越多，这可能一开始就违背了强制合并的目的。

在任何情况下，在非高峰时间 (比如晚上) 安排强制合并通常是一个好主意，因为此时您不希望有很多搜索或索引请求。

`注意:` 一定需要注意业务的高低峰周期，在低峰期间进行强制合并。

### 问题 4: 如何提高索引性能 (Indexing 性能)

Elasticsearch 预先配置了许多设置，以确保您保留足够的资源来搜索和索引数据。

但是，如果您使用的 Elasticsearch 严重偏向于写，您可能会发现调整某些设置来提高索引性能是有意义的，即使这意味着失去一些搜索性能或数据复制。

下面，我们将探索一些方法来优化索引 (而不是搜索) 数据的用例。

**Shard allocation**

作为一种高级策略，如果您正在创建一个计划频繁更新的索引，请确保指定足够的主分片，以便能够将索引负载均匀地分布在所有节点上。

一般建议为集群中的每个节点分配一个主分片，可能为每个节点分配两个或更多主分片，但前提是这些节点上有大量的 CPU 和磁盘带宽。

但也要注意，分片过多会增加开销，并可能对搜索产生负面影响 (搜索需要访问索引的每个分片)。

另一方面，如果分配的主分片比节点的数量少，就可能创建热点，因为包含这些分片的节点需要处理的索引请求比不包含任何索引分片的节点多。

**Disable merge throttling**

合并限制是 ES 在他检测到葛冰落后于索引时自动倾向于限制索引请求的特性。

如果想要优化索引性能而不是搜索的话，则可以设置禁用集群的合并限制 (`indices.store.throttle.type to “none”`)

并且可以设置为 `persistent` 或 `transient`，是合并限制永久或临时生效。

**Increase the size of the indexing buffer**

`indices.memory.index_buffer_size` 参数将确定文档在被写入到磁盘的段 (segment) 之前，缓冲区可以达到到的最大空间。

默认限制为总堆内存的 10%，以便服务搜索请求保留更多的堆。

**Index first, replicate later**

初始化索引时，可以先在索引设置中指定零个副本碎片，并在建立索引后添加副本。

这将提高索引的性能，但是如果拥有唯一数据副本的节点在您有机会进行复制之前崩溃，则可能会有些冒险。

**Refresh less frequently**

增加索引设置 API 中的刷新间隔。

默认情况下，索引刷新过程每秒进行一次，但是在繁重的索引期间，降低刷新频率可以帮助减轻某些工作量。

**Tweak your translog settings**

Elasticsearch 将在每次请求后将转日志数据刷新到磁盘，从而降低了发生硬件故障时数据丢失的风险。

如果要优先考虑 `索引性能` 而不是潜在的数据丢失，可以在索引设置中将 `index.translog.durability` 更改为 `async`。

有了此功能，索引将仅在每个 `sync_interval` 时才将写入操作提交到磁盘，而不是在每个请求之后才将其提交到磁盘，从而腾出更多的资源来处理索引请求。

如何提升 indexing 的性能

### 问题 5: 如何处理大量 `_bulk` 线程池拒绝

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7jicwsyzOibtdJiakQ5ickyTBJAApPmibMjibqGNML8nfHfV7vibuoQRQCVqCJFMiaIfDP8bU9zVMz9mp0HdCI7AhsBwRQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)bulk 线程池拒绝统计

线程池拒绝通常是向节点发送过多请求、速度过快的信号。

如果这是一个临时的情况 (例如，您必须在本周索引异常大量的数据，并且预期它很快就会恢复正常)，那么您可以尝试降低请求的速度。

但是，如果希望集群能够维持当前的请求速率，则可能需要通过添加更多数据节点向外扩展集群。

为了利用增加的节点数量带来的处理能力，还应该确保索引包含足够的分片，以便能够将负载均匀地分布在所有节点上。

注意：如果节点已经足够，且自愿利用率不高，可以尝试对相关操作的线程池就行参数优化调整。

```
thread_pool:
  index:
    size: 8
    queue_size: 2000
  search:
    size: 100
    queue_size: 2000
    min_queue_size: 100
    max_queue_size: 3000
  get:
    size: 30
    queue_size: 2000
  bulk:
    size: 8
    queue_size: 2000
```

### 主动优化

通常，我们会发现，集群当前存在各种风险点以及问题，此时我们需要借助各种监控指标，去主动协调上层使用方进行性能优化。

因为正常情况下，即使是相同的硬件，相同的配置，但不那么相同的业务场景，将会表现出来不同的性能。此时，我们需要从上到下，分析业务场景以及业务模型，以此来优化整个集群的配置，甚至根据不同的业务场景去选择合适的硬件设备 (当然如果是自建 IDC，硬件设备通常可选择性较低)。

参考文章：

1. [监控 ElasticSearch 的性能指标]：https://www.datadoghq.com/blog/monitor-elasticsearch-performance-metrics
2. [如何收集 ElasticSearch 的指标]：https://www.datadoghq.com/blog/collect-elasticsearch-metrics/
3. [使用 datadog 监控 ElasticSearch]：https://www.datadoghq.com/blog/monitor-elasticsearch-datadog/
4. [ElasticSearch 性能和扩展问题]：https://www.datadoghq.com/blog/elasticsearch-performance-scaling-problems/



# Logstash学习

## Logstash基本语法组成

![1573291947262](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/1573291947262.png)

### 1、什么是Logstash

logstash是一个**数据抽取工具，将数据从一个地方转移到另一个地方**。如hadoop生态圈的sqoop等。

下载地址：

logstash官网:

https://www.elastic.co/cn/

各种产品和版本过去历史版本下载:

https://www.elastic.co/cn/downloads/past-releases

elasticsearchStack相关软件下载

https://elasticsearch.cn/download/

学习网站

https://www.elastic.co/guide/en/logstash/7.17/introduction.html

logstash之所以功能强大和流行，还与其丰富的过滤器插件是分不开的，过滤器提供的并不单单是过滤的功能，还可以对进入过滤器的原始数据进行复杂的逻辑处理，甚至添加独特的事件到后续流程中。
Logstash配置文件有如下三部分组成，其中input、output部分是必须配置，filter部分是可选配置，而filter就是过滤器插件，可以在这部分实现各种日志过滤功能。

安装地址

https://blog.51cto.com/u_14834727/3012233



### 2、配置文件：

```apl
input {
    #输入插件
}
filter {
    #过滤匹配插件
}
output {
    #输出插件
}
```



### 3、启动操作：

配置文件

在D:\logstash-7.15.1\config目录下的新建的test1.conf

**在控制台输入和输出**

```apl
input{
    stdin{
    }
}

filter {
   # 过滤匹配组件
}

output {
    stdout{
        codec=>rubydebug    
    }
}
```

进入bin目录，启动cmd输入

```apl
logstash.bat -f ../config/test1.conf
```

测试成功

![image-20211031110858002](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211031110858002.png)





## Logstash输入插件（input）

注意：一次只能启动一个窗口，不然会出错

https://www.elastic.co/guide/en/logstash/7.17/input-plugins.html

### 1、标准输入(Stdin)

数据从哪里来：从控制台输入，从控制台输出

```apl
input{
    stdin{
       
    }
}
output {
    stdout{
        codec=>rubydebug    
    }
}
```

```apl
logstash.bat -f ../config/test1.conf
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327211935249.png" alt="image-20220327211935249" style="zoom:67%;" />

### 2、读取文件(File)

logstash使用一个名为filewatch的ruby gem库来监听文件变化,并通过一个叫.sincedb的数据库文件来记录被监听的日志文件的读取进度（时间戳），这个sincedb数据文件的默认路径在 <path.data>/plugins/inputs/file下面，文件名类似于.sincedb_123456，而<path.data>表示logstash插件存储目录，默认是LOGSTASH_HOME/data。

```apl
input {
    file {
        path => ["D:/logstash-7.15.1/logs/*.log"]
        start_position => "beginning"
    }
}
output {
    stdout{
        codec=>rubydebug    
    }
}
```

默认情况下，logstash会从文件的结束位置开始读取数据，也就是说logstash进程会以类似tail -f命令的形式逐行获取数据。

启动

```apl
logstash.bat -f ../config/test2.conf
```

日志文件能直接输出

日志文件只要一更新，就能立即输出



### 3、读取TCP网络数据

```apl
input {
  tcp {
    port => "1234"
  }
}

filter {
  grok {
    match => { "message" => "%{SYSLOGLINE}" }
  }
}

output {
    stdout{
        codec=>rubydebug
    }
}
```



## Logstash过滤器插件(Filter)

https://www.elastic.co/guide/en/logstash/current/filter-plugins.html

[grok 解析_使用文档_智能日志管理平台 - 七牛开发者中心 (qiniu.com)](https://developer.qiniu.com/insight/4759/grok-parser)

### Grok 正则捕获

在kibaba中可以进行测试

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220327212131975.png" alt="image-20220327212131975" style="zoom: 50%;" />

grok是一个十分强大的logstash filter插件，他可以通过正则解析任意文本，将非结构化日志数据弄成结构化和方便查询的结构。他是目前logstash 中解析非结构化日志数据最好的方式。

Grok 的语法规则是：

```apl
%{语法: 语义}
```

例如输入的内容为：

```apl
172.16.213.132 [07/Feb/2019:16:24:19 +0800] "GET / HTTP/1.1" 403 5039
```

- %{IP:clientip}匹配模式将获得的结果为：clientip: 172.16.213.132
- %{HTTPDATE:timestamp}匹配模式将获得的结果为：timestamp: 07/Feb/2018:16:24:19 +0800
- %{QS:referrer}匹配模式将获得的结果为：referrer: "GET / HTTP/1.1"

下面是一个组合匹配模式，它可以获取上面输入的所有内容：

```apl
%{IP:clientip}\ \[%{HTTPDATE:timestamp}\]\ %{QS:referrer}\ %{NUMBER:response}\ %{NUMBER:bytes}
```

通过上面这个组合匹配模式，我们将输入的内容分成了五个部分，即五个字段，将输入内容分割为不同的数据字段，这对于日后解析和查询日志数据非常有用，这正是使用grok的目的。

例子：

```apl
input{
    stdin{}
}
filter{
    grok{
        match => ["message","%{IP:clientip}\ \[%{HTTPDATE:timestamp}\]\ 
                  %{QS:referrer}\ %{NUMBER:response}\ %{NUMBER:bytes}"]
    }
}
output{
    stdout{
        codec => "rubydebug"
    }
}
```


输入内容：

```apl
172.16.213.132 [07/Feb/2019:16:24:19 +0800] "GET / HTTP/1.1" 403 5039
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211031123304966.png" alt="image-20211031123304966" style="zoom:80%;" />



### 时间处理(Date)

date插件是对于排序事件和回填旧数据尤其重要，它可以用来转换日志记录中的时间字段，变成LogStash::Timestamp对象，然后转存到@timestamp字段里，这在之前已经做过简单的介绍。
下面是date插件的一个配置示例（这里仅仅列出filter部分）：

```apl
filter {
    grok {
        match => ["message", "%{HTTPDATE:timestamp}"]
    }
    date {
        match => ["timestamp", "dd/MMM/yyyy:HH:mm:ss Z"]
    }
}
```



### 数据修改(Mutate)

#### 正则表达式替换匹配字段

gsub可以通过正则表达式替换字段中匹配到的值，只对字符串字段有效，下面是一个关于mutate插件中gsub的示例（仅列出filter部分）：

```apl
filter {
    mutate {
        gsub => ["filed_name_1", "/" , "_"]
    }
}
```

这个示例表示将filed_name_1字段中所有"/"字符替换为"_"。

#### 分隔符分割字符串为数组

split可以通过指定的分隔符分割字段中的字符串为数组，下面是一个关于mutate插件中split的示例（仅列出filter部分）：

```apl
filter {
    mutate {
        split => ["filed_name_2", "|"]
    }
}
```

这个示例表示将filed_name_2字段以"|"为区间分隔为数组。

#### 重命名字段

rename可以实现重命名某个字段的功能，下面是一个关于mutate插件中rename的示例（仅列出filter部分）：

```apl
filter {
    mutate {
        rename => { "old_field" => "new_field" }
    }
}
```

这个示例表示将字段old_field重命名为new_field。

#### 删除字段

remove_field可以实现删除某个字段的功能，下面是一个关于mutate插件中remove_field的示例（仅列出filter部分）：

```apl
filter {
    mutate {
        remove_field  =>  ["timestamp"]
    }
}
```

这个示例表示将字段timestamp删除。

#### GeoIP 地址查询归类

```apl
filter {
    geoip {
        source => "ip_field"
    }
}
```

#### 综合例子

在D:\logstash-7.15.1\config里创建test4.conf

```apl
input {
    stdin {}
}
filter {
    grok {
        match => { "message" => "%{IP:clientip}\ \[%{HTTPDATE:timestamp}\]\ %{QS:referrer}\ %{NUMBER:response}\ %{NUMBER:bytes}" }
        remove_field => [ "message" ]
   }
date {
        match => ["timestamp", "dd/MMM/yyyy:HH:mm:ss Z"]
    }

output {
    stdout {
        codec => "rubydebug"
    }
}    
```

启动

```apl
logstash.bat -f ../config/test4.conf
```

例如输入的内容为

```apl
172.16.213.132 [07/Feb/2019:16:24:19 +0800] "GET / HTTP/1.1" 403 5039
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211031123605271.png" alt="image-20211031123605271" style="zoom:80%;" />



## Logstash输出插件（output）

https://www.elastic.co/guide/en/logstash/current/output-plugins.html

output是Logstash的最后阶段，一个事件可以经过多个输出，而一旦所有输出处理完成，整个事件就执行完成。 一些常用的输出包括：

- file：  表示将日志数据写入磁盘上的文件。
- elasticsearch：表示将日志数据发送给Elasticsearch。Elasticsearch可以高效方便和易于查询的保存数据。

1、输出到标准输出(stdout)，就是输出到控制台

```apl
output {
    stdout {
        codec => rubydebug
    }
}
```

2、保存为文件（file）

```apl
output {
    file {
        path => "/data/log/%{+yyyy-MM-dd}/%{host}_%{+HH}.log"
    }
}
```

3、输出到elasticsearch

```apl
output {
    elasticsearch {
        hosts => ["192.168.1.1:9200","172.16.213.77:9200"]
        index => "logstash-%{+YYYY.MM.dd}"       
    }
}
```

- host：是一个数组类型的值，后面跟的值是elasticsearch节点的地址与端口，默认端口是9200。可添加多个地址。
- index：写入elasticsearch的索引的名称，这里可以使用变量。Logstash提供了%{+YYYY.MM.dd}这种写法。在语法解析的时候，看到以+ 号开头的，就会自动认为后面是时间格式，尝试用时间格式来解析后续字符串。这种以天为单位分割的写法，可以很容易的删除老的数据或者搜索指定时间范围内的数据。此外，注意索引名中不能有大写字母。
- manage_template:用来设置是否开启logstash自动管理模板功能，如果设置为false将关闭自动管理模板功能。如果我们自定义了模板，那么应该设置为false。
- template_name:这个配置项用来设置在Elasticsearch中模板的名称。



## 综合案例

nginx.log内容

```apl
172.16.213.132 [07/Feb/2019:16:24:19 +0800] "GET / HTTP/1.1" 403 5039
172.16.213.132 [07/Feb/2019:16:24:19 +0800] "GET / HTTP/1.1" 403 5039
172.16.213.132 [07/Feb/2019:16:24:19 +0800] "GET / HTTP/1.1" 403 5039
```

在D:\logstash-7.15.1\config里创建test5.conf，填入如下内容

启动

```
logstash.bat -f ../config/test5.conf
```

进入kibana进行搜索，基本上输入有logstash提示的话就表示已经插入成功了

![image-20211031131825775](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306101725858.png)

搜索成功





# kibana学习

## 基本查询

1是什么：elk中数据展现工具。

2下载：https://www.elastic.co/cn/downloads/kibana

3使用：建立索引模式，index partten

discover 中使用DSL搜索。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211031132122268.png" alt="image-20211031132122268" style="zoom: 67%;" />



## 仪表盘可视化

Dashboard

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211031132836816.png" alt="image-20211031132836816" style="zoom:67%;" />



<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306101725859.png" alt="image-20211031133401860" style="zoom:67%;" />



点击右上角的保存并返回，就形成·多个图的仪表盘了

![image-20211031133508512](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211031133508512.png)

可以继续点创建可视化的蓝色按钮进行新增操作



## 使用模板数据指导绘图


<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211031134424849.png" alt="image-20211031134424849" style="zoom: 67%;" />

点击添加数据和查看数据就行了

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211031134648455.png" alt="image-20211031134648455" style="zoom: 50%;" />



## 其他功能

监控，日志，APM等功能非常丰富。

堆栈监测

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211031151852667.png" alt="image-20211031151852667" style="zoom:80%;" />



1、kibana是es数据的前端展现，数据分析时，可以方便地看到数据。作为开发人员，可以方便访问es。

2、下载，解压kibana。https://www.elastic.co/cn/downloads/kibana

进入config/kibana.yml，翻到最后，设置修改为中文： i18n.locale: "zh-CN"

3、启动Kibana：bin\kibana.bat

4、浏览器访问 :5601 进入Dev Tools界面。像plsql一样支持代码提示。

5、发送get请求，查看集群状态GET _cluster/health。相当于浏览器访问。

开发目录

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211029121846777.png" alt="image-20211029121846777" style="zoom:67%;" />

开发工具

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211029122006626.png" alt="image-20211029122006626" style="zoom:67%;" />



集群状态（概览，节点等蓝色的字是可以点进去的）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211029122050897.png" alt="image-20211029122050897" style="zoom:67%;" />

  集群状态（搜索速率、索引速率等）就是上面概览蓝色字点进去

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211029122239027.png" alt="image-20211029122239027" style="zoom:67%;" />

Postman和head(https://github.com/mobz/elasticsearch-head)同样可以检测es状态，不过还是Kibana好用





# Filebeat轻量级日志搬运神器

注意：docker版本的ES和Kibana的Filebeat功能有点区别，功能不全，建议使用自己安装

[面对成百上千台服务器产生的日志，试试这款轻量级日志搬运神器！ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247486460&idx=1&sn=960d8292b275af5587b0721312306f88&scene=21#wechat_redirect)

> 之前我们搭建的ELK日志收集系统，主要是用来收集SpringBoot应用的日志。其原理是应用通过Logstash插件，使用TCP向Logstash传输日志，从而存储到Elasticsearch中去。但是有很多中间件的日志都是直接存储在文件中的，比如`Nginx`、`Elasticsearch`和`MySQL`，此时我们就需要一个搬运工来把日志搬到Elasticsearch中去，Filebeat正是这样一个日志搬运工，本文将详细介绍它的使用方法，希望对大家有所帮助。

## Filebeat简介

Filebeat是一款轻量级日志采集器，可用于转发和汇总日志与文件。Filebeat内置有多种模块（Nginx、MySQL、Redis、Elasticsearch、Logstash等），可针对常见格式的日志大大简化收集、解析和可视化过程，只需一条命令即可。



## Filebeat安装及配置

> 安装Filebeat之前，我们需要先安装好Elasticsearch和Kibana，具体参考[《你居然还去服务器上捞日志，搭个日志收集系统难道不香么！》](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247485508&idx=1&sn=d1d96893a1a3131dd8ef2e8df16d4d02&scene=21#wechat_redirect)，注意使用7.17.1版本。

我们先下载Filebeat的安装包：https://www.elastic.co/cn/downloads/past-releases#filebeat

下载完成的目录

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205261644265.png" alt="image-20220526164430136" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205151031611.png" alt="image-20220515103149562" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205261646433.png" alt="image-20220526164621336" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205261647364.png" alt="image-20220526164715265" style="zoom:67%;" />



添加数据

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205261539062.png" alt="image-20220526153935944" style="zoom:80%;" />

Kibana中早就提供好了Filebeat收集各种日志的教程，我们先进入首页，访问地址：:5601/app/kibana#/home

```yml
output.elasticsearch:
  hosts: ["localhost:9200"]
setup.kibana:
  host: "localhost:5601"
```

Kibana中早就提供好了Filebeat收集各种日志的教程，我们先进入首页，访问地址：:5601/app/kibana#/home

## 收集Nginx日志

> 我们先拿Nginx来练练手，体验下Filebeat的日志收集功能吧。

- 使用如下命令开启Filebeat的Nginx日志收集模块；

```apl
filebeat modules enable nginx
```

- 开启完成后，进入`modules.d`目录下，你会发现`nginx.yml`的`disable`后缀没有了，说明已经被开启；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205261651930.png" alt="image-20220526165108882" style="zoom:67%;" />

```yml
- module: nginx
  # Access logs
  access:
    enabled: true
    var.paths: ["D:/nginx-1.21.1/logs/access.log"]

  # Error logs
  error:
    enabled: true
    var.paths: ["D:/nginx-1.21.1/logs/error.log"]
```

- 由于启用了Nginx日志收集模块，我们需要通过如下命令对Filebeat进行设置；

```apl
filebeat setup
```

- 通过如下命令启动Filebeat服务；

```apl
filebeat -e
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205261652155.png" alt="image-20220526165258083" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205261653156.png" alt="image-20220526165343055" style="zoom:67%;" />



## 收集MySQL日志

> 再来试试收集MySQL的日志。

- 使用如下命令开启Filebeat的MySQL日志收集模块；

```apl
filebeat modules enable mysql
```

- 接下来修改`mysql.yml`配置，配置好MySQL的日志路径，主要是错误日志和慢查询日志；

```yml
- module: mysql
  error:
    enabled: true
    var.paths: ["C:/ProgramData/MySQL/MySQL Server 5.7/Data/DESKTOP-5NIMJ19.err"]

  slowlog:
    enabled: true
    var.paths: ["C:/ProgramData/MySQL/MySQL Server 5.7/Data/DESKTOP-5NIMJ19-slow.log"]
```

- 设置并启动Filebeat服务；

```apl
filebeat setup
filebeat -e
```

- 点击`MySQL logs dashboard`按钮可以查看收集到的MySQL日志；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205261700844.png" alt="image-20220526170004763" style="zoom:67%;" />

- 查看MySQL收集到的日志详情。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205261700605.png" alt="image-20220526170019539" style="zoom:67%;" />





# ELK实现日志收集

[SpringBoot应用整合ELK实现日志收集 (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247483823&idx=1&sn=842d342d688a4ebd14a2147dff1270d4&chksm=fc2fbda7cb5834b1392a88ed047644997aeae71668ece5515035b7094e53e1889952345d4ccc&mpshare=1&scene=23&srcid=0509ui8i9C19ZqNZvj12SRwD&sharer_sharetime=1652108650599&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

> ELK即Elasticsearch、Logstash、Kibana,组合起来可以搭建线上日志系统，本文主要讲解使用ELK来收集SpringBoot应用产生的日志



```apl
mkdir /mydata/logstash
```

```apl
input {
  tcp {
    mode => "server"
    host => "0.0.0.0"
    port => 4560
    codec => json_lines
    }
}
output {
  elasticsearch {
    hosts => "es:9200"
    index => "springboot-logstash-%{+YYYY.MM.dd}"  
    }
}
```



```apl
mkdir -p /usr/share/elasticsearch/plugins
chmod 777 /usr/share/elasticsearch/plugins
mkdir -p /usr/share/elasticsearch/data
chmod 777  /usr/share/elasticsearch/data
mkdir -p /usr/share/logstash/data
chmod 777 /usr/share/logstash/data
```



```yml
version: '3'
services:
  elasticsearch:
    image: elasticsearch:7.17.1
    container_name: elasticsearch1
    environment:
      - "cluster.name=elasticsearch"#设置集群名称为elasticsearch
      - "discovery.type=single-node" #以单一节点模式启动
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"#设置使用jvm内存大小
    volumes:
      - /root/share/elasticsearch/es-data:/usr/share/elasticsearch/data
      - /root/share/elasticsearch/es-plugins:/usr/share/elasticsearch/plugins
    #插件文件挂载
    ports:
      - "9200:9200"
      
  
  kibana:
    image: kibana:7.17.1
    container_name: kibana1
    links:
      - elasticsearch:es
    depends_on:
      - elasticsearch
    environment:
      - "ELASTICSEARCH_URL=http://elasticsearch:9200"
    ports:
      - "5601:5601"
        
  logstash:
    image: logstash:7.17.1
    container_name: logstash1
    volumes:
      - /usr/share/logstash/data:/usr/share/logstash/data
      - /usr/share/logstash/pipeline:/usr/share/logstash/pipeline
    depends_on:
      - elasticsearch
    links:
      - elasticsearch:es
    ports:
      - "4560:4560"
```

```apl
docker-compose up -d
```

```apl
logstash-plugin install logstash-codec-json_lines
```



# ELK日志系统

[还在服务器上捞日志？快搭建一个ELK日志系统吧，真心强大！ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247504073&idx=1&sn=1f6ad9c80bd414266d75016f4657ddcc&chksm=fc2c6cc1cb5be5d71de06a26f9256b8bb07c7761276923ed1caf3142ee877df7685f2c351536&mpshare=1&scene=23&srcid=1111VQwqGQUJ2UQn9ZWPB1Pq&sharer_sharetime=1668130814018&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

## 前言

最近在折腾 ELK 日志平台，它是 Elastic 公司推出的一整套日志收集、分析和展示的解决方案。

专门实操了一波，这玩意看起来简单，但是里面的流程步骤还是很多的，而且遇到了很多坑。在此记录和总结下。

**本文亮点**：一步一图、带有实操案例、踩坑记录、与开发环境的日志结合，反映真实的日志场景。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211121012504.png" alt="image-20221112101204380" style="zoom:80%;" />

日志收集平台有多种组合方式：

- ELK Stack 方式：Elasticsearch + Logstash + Filebeat + Kibana，业界最常见的架构。
- Elasticsearch + Logstash + Kafka + Kibana，用上了消息中间件，但里面也有很多坑，放到下一讲。

这次先讲解 ELK Stack 的方式，这种方式对我们的代码无侵入，核心思想就是收集磁盘的日志文件，然后导入到 Elasticsearch。

比如我们的应用系统通过 logback 把日志写入到磁盘文件，然后通过这一套组合的中间件就能把日志采集起来供我们查询使用了。

整体的**架构图**如下所示，

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211121049007.png" alt="image-20221112104909914" style="zoom:80%;" />

流程如下：

- 先使用 Filebeat 把日志收集起来，然后把数据再传给 Logstash。
- 通过 Logstash 强大的数据清洗功能。
- 最终把数据写入到 Elasticsearch 中。
- 并由 Kibana 进行可视化。

> 温馨提示：以下案例都在一台 ubuntu 虚拟机上完成，内存分配了 6G。

## 部署 Elasticsearch 数据库

获取 elasticsearch 镜像

```sh
docker pull elasticsearch:7.7.1
```

创建挂载目录

```sh
mkdir -p /data/elk/es/{config,data,logs}
```

赋予权限

```sh
chown -R 1000:1000 /data/elk/es
```

创建配置文件

```sh
cd /data/elk/es/config
touch elasticsearch.yml
-----------------------配置内容----------------------------------
cluster.name: "my-es"
network.host: 0.0.0.0
http.port: 9200
```

启动 elasticsearch 容器

```sh
docker run -it  -d -p 9200:9200 -p 9300:9300 --name es -e ES_JAVA_OPTS="-Xms1g -Xmx1g" -e "discovery.type=single-node" --restart=always -v /data/elk/es/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml -v /data/elk/es/data:/usr/share/elasticsearch/data -v /data/elk/es/logs:/usr/share/elasticsearch/logs elasticsearch:7.7.1
```

验证 elasticsearch 是否启动成功

```sh
curl :9200
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211121049304.png" alt="image-20221112104942234" style="zoom:80%;" />

## 部署 Kibana 可视化工具

### 1 安装 Kibana

获取 kibana 镜像

```
docker pull kibana:7.7.1
```

获取elasticsearch容器 ip


结果：172.17.0.2

创建 kibana 配置文件

```
mkdir -p /data/elk/kibana/
vim /data/elk/kibana/kibana.yml
```

配置内容：

```
#Default Kibana configuration for docker target
server.name: kibana
server.host: "0"
elasticsearch.hosts: ["http://172.17.0.2:9200"]
xpack.monitoring.ui.container.elasticsearch.enabled: true
```

### 2 运行 kibana

```
docker run -d --restart=always --log-driver json-file --log-opt max-size=100m --log-opt max-file=2 --name kibana -p 5601:5601 -v /data/elk/kibana/kibana.yml:/usr/share/kibana/config/kibana.yml kibana:7.7.1
```

访问 http://192.168.56.10:5601。这个 IP 是服务器的 IP。Kibana 控制台的界面如下所示，打开 kibana 时，首页会提示让你选择加入一些测试数据，点击 try our sample data 按钮就可以了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211121050054.png" alt="image-20221112105007949" style="zoom:50%;" />

Kibana 界面上会提示你是否导入样例数据，选一个后，Kibana 会帮你自动导入，然后就可以进入到 Discover 窗口搜索日志了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211121050436.png" alt="image-20221112105021337" style="zoom:67%;" />

## 部署 logstash 日志过滤转换工具

### 1 安装 Java JDK

> 已经安装了，不用再安装了

```
$ sudo apt install openjdk-8-jdk
```

修改 /etc/profile 文件

```
sudo vim /etc/profile
```

添加如下的内容到你的 .profile 文件中：

```
# JAVA
JAVA_HOME="/usr/lib/jdk/jdk-12"
PATH="$PATH:$JAVA_HOME/bin"
```

再在命令行中打入如下的命令：

```
source /etc/profile
```

查看 java 是否配置成功

```
java -version
```

### 2 安装和测试 logstash

下载 logstash 安装包

```
curl -L -O https://artifacts.elastic.co/downloads/logstash/logstash-7.7.1.tar.gz 
```

解压安装

```
tar -xzvf logstash-7.7.1.tar.gz -C /
```

要测试 Logstash 安装，请运行最基本的 Logstash 管道。例如：

```
cd /logstash-7.7.1
bin/logstash -e 'input { stdin { } } output { stdout {} }'
```

等 Logstash 完成启动后，我们在 stdin 里输入以下文字，我们可以看到如下的输出：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211121033348.png" alt="image-20221112103324242" style="zoom:80%;" />

当我们打入一行字符然后回车，那么我们马上可以在 stdout 上看到输出的信息。如果我们能看到这个输出，说明我们的 Logstash 的安装是成功的。

我们进入到 Logstash 安装目录，并修改 config/logstash.yml 文件。我们把 **config.reload.automatic** 设置为 true。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211121050730.png" alt="image-20221112105054642" style="zoom:80%;" />

另外一种运行 Logstash 的方式，也是一种最为常见的运行方式，运行时指定 logstash 配置文件。

### 3 基于配置文件启动⭐

Logstash 配置文件有两个必需元素，输入（inputs）和输出（ouputs），以及一个可选元素 filters。输入插件配置来源数据，过滤器插件在你指定时修改数据，输出插件将数据写入目标。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211121034323.png" alt="image-20221112103434251" style="zoom:80%;" />

我们首先需要创建一个配置文件，配置内容如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211121034816.png" alt="image-20221112103448730" style="zoom:80%;" />

创建 kibana 配置文件 weblog.conf

```sh
mkdir -p /logstash-7.7.1/streamconf
vim /logstash-7.7.1/streamconf/weblog.conf
```

配置内容如下：

```sh
input {
  tcp {
    port => 9900
  }
}
 
filter {
  grok {
    match => { "message" => "%{COMBINEDAPACHELOG}" }
  }
 
  mutate {
    convert => {
      "bytes" => "integer"
    }
  }
 
  geoip {
    source => "clientip"
  }
 
  useragent {
    source => "agent"
    target => "useragent"
  }
 
  date {
    match => ["timestamp", "dd/MMM/yyyy:HH:mm:ss Z"]
  }
}
 
output {
  stdout { }
 
  elasticsearch {
    hosts => ["localhost:9200"]
  }
}
```

在上面，我们同时保留两个输出：stdout 及 elasticsearch。事实上，我们可以定义很多个的输出。stdout 输出对于我们初期的调试是非常有帮助的。等我们完善了所有的调试，我们可以把上面的 stdout 输出关掉。

```
bin/logstash -f /logstash-7.7.1/streamconf/weblog.conf
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211121035245.png" alt="image-20221112103547988" style="zoom:80%;" />

等更新完这个配置文件后，我们在另外一个terminal中发送第一个 log：

```sh
cd logs
touch weblog-sample.log
head -n 1 weblog-sample.log | nc localhost 9900
```

这个命令的意思：我们使用 nc 应用读取第一行数据，然后发送到 TCP 端口号 9900，并查看 console 的输出。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211121038312.png" alt="image-20221112103843145" style="zoom:80%;" />

这里的 weblog-sample.log 为样例数据，内容如下，把它放到本地作为日志文件。

logstash 控制台打印出了 weblog-samle.log 中的内容：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211121036455.png" alt="image-20221112103636363" style="zoom:80%;" />

这一次，我们打开 Kibana，执行命令，成功看到 es 中的这条记录。

```
GET logstash/_search
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211121039437.png" alt="image-20221112103934369" style="zoom:80%;" />

## 部署 Filebeat 日志收集工具

### 1 安装 Filebeat

```sh
curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.7.1-linux-x86_64.tar.gz
tar xzvf filebeat-7.7.1-linux-x86_64.tar.gz -C /
```

**请注意**：由于 ELK 迭代比较快，我们可以把上面的版本 **7.7.1** 替换成我们需要的版本即可。我们先不要运行 Filebeat。

### 2 配置 Filebeat

我们在 Filebeat 的安装目录下，可以创建一个这样的 filebeat_apache.yml 文件，它的内容如下，首先先让 filebeat 直接将日志文件导入到 elasticsearch，来确认 filebeat 是否正常工作

```sh
cd /
mv filebeat-7.7.1-linux-x86_64/ filebeat-7.7.1
cd filebeat-7.7.1/
vim filebeat_apache.yml 
```

```sh
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /home/vagrant/logs/*.log

output.elasticsearch:
  hosts: ["192.168.22.146:9200"]
```

paths 对应你的日志文件夹路径，我配置的是这个：/home/vagrant/logs/*.log，之前配置成 /home/vagrant/logs 不能正常收集。另外这里可以放入多个日志路径。

### 3 测试 Filebeat

在使用时，你先要启动 Logstash，然后再启动 Filebeat。

```sh
bin/logstash -f /logstash-7.7.1/streamconf/weblog.conf
```

然后，再运行 Filebeat， -c 表示运行指定的配置文件，这里是 filebeat_apache.yml。

```sh
./filebeat -e -c filebeat_apache.yml
```

运行结果如下所示，一定要确认下控制台中是否打印了加载和监控了我们指定的日志。如下图所示，有三个日志文件被监控到了：error.log、info.log、debug.log

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211121052827.png" alt="image-20221112105249682" style="zoom:80%;" />

我们可以通过这个命令查看 filebeat 的日志是否导入成功了：

```sh
curl :9200/_cat/indices?v
```

这个命令会查询 Elasticsearch 中所有的索引，如下图所示，`filebeat-7.7.1-*` 索引创建成功了。因为我没有配置索引的名字，所以这个索引的名字是默认的，。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211121052484.png" alt="image-20221112105216410" style="zoom:80%;" />

在 kibana 中搜索日志，可以看到导入的 error 的日志了。不过我们先得在 kibana 中创建 filebeat 的索引（点击 create index pattern 按钮，然后输入 filebeat 关键字，添加这个索引），然后才能在 kibana 的 Discover 控制台查询日志。

![图片](https://mmbiz.qpic.cn/mmbiz_png/SfAHMuUxqJ3hYKibtD39fr6fServnSOiby3eVLPnGyE8ROc8zTiaVvbEw3iadc4IcxF4HcNUZ73n6ocahhhJ8usSsA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)创建查询的索引

![图片](https://mmbiz.qpic.cn/mmbiz_png/SfAHMuUxqJ3hYKibtD39fr6fServnSOibyk8EGUkqB6guKgA8GGqvsEPOicEyIURjbYdakoDW8SRnGtdPvhRSdSCA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 4 Filebeat + Logstash

接下来我们配置 filebeat 收集日志后，输出到 logstash，然后由 logstash 转换数据后输出到 elasticsearch。

```sh
filebeat.inputs:

- type: log
  enabled: true
  paths:
    - /home/vagrant/logs/*.log

output.logstash:
  hosts: ["localhost:9900"]
```

修改 logstash 配置文件

```sh
vim /logstash-7.7.1/streamconf/weblog.conf
```

配置了 input 为 beats，修改了 useragent

```sh
input {  
  beats {
    port => "9900"
  }
}
 
filter {
  grok {
    match => { "message" => "%{COMBINEDAPACHELOG}" }
  }
 
  mutate {
    convert => {
      "bytes" => "integer"
    }
  }
 
  geoip {
    source => "clientip"
  }
 
  useragent {
    source => "user_agent"
    target => "useragent"
  }
 
  date {
    match => ["timestamp", "dd/MMM/yyyy:HH:mm:ss Z"]
  }
}
 
output {
  stdout {
    codec => dots {}
  }
 
  elasticsearch {
    hosts=>["192.168.56.10:9200"]
    index => "apache_elastic_example"
  }
}
```

然后重新启动 logstash 和 filebeat。有个问题，这次启动 filebeat 的时候，只监测到了一个 info.log 文件，而 error.log 和 debug.log 没有监测到，导致只有 info.log 导入到了 Elasticsearch 中。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211121057813.png" alt="image-20221112105700723" style="zoom:80%;" />

filebeat 只监测到了 info.log 文件

logstash 输出结果如下，会有格式化后的日志：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211121056285.png" alt="image-20221112105649200" style="zoom:80%;" />

我们在 Kibana dev tools 中可以看到索引 apache_elastic_example，说明索引创建成功，日志也导入到了 elasticsearch 中。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211121056269.png" alt="image-20221112105638196" style="zoom:80%;" />

另外注意下 logstash 中的 grok 过滤器，指定的 message 的格式需要和自己的日志的格式相匹配，这样才能将我们的日志内容正确映射到 message 字段上。

例如我的 logback 的配置信息如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211121056102.png" alt="image-20221112105624039" style="zoom:80%;" />

而我的 logstash 配置如下，和 logback 的 pettern 是一致的。

```sh
grok {
  match => { "message" => "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger -%msg%n" }
}
```

然后我们在 es 中就能看到日志文件中的信息了。如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211121055238.png" alt="image-20221112105559134" style="zoom:50%;" />

至此，Elasticsearch + Logstash + Kibana + Filebeat 部署成功，可以愉快地查询日志了~

后续升级方案：

- 加上 Kafka
- 加上 Grafana 监控
- 链路追踪

## 遇到的问题和解决方案

### 1 拉取 kibana 镜像失败

failed to register layer: Error processing tar file(exit status 2): fatal error: runtime: out of memory

原因是 inodes 资源耗尽 ， 清理一下即可

```sh
df -i
sudo find . -xdev -type f | cut -d "/" -f 2 | sort | uniq -c | sort -n
curl -s https://raw.githubusercontent.com/ZZROTDesign/docker-clean/v2.0.4/docker-clean |
sudo tee /usr/local/bin/docker-clean > /dev/null && \
sudo chmod +x /usr/local/bin/docker-clean
docker-clean
```

### 2 拉取 kibana 镜像失败

docker pull runtime: out of memory 增加虚拟机内存大小

### 3 Kibana 无法启动

"License information could not be obtained from Elasticsearch due to Error: No Living connections error"}

看下配置的 IP 地址是不是容器的 IP。



# Metricbeat性能监控

[ELK搭建（六）：搭建mysql性能、执行效率监控平台 - 掘金 (juejin.cn)](https://juejin.cn/post/7098130284184338462?share_token=ca7c2556-8a9b-4d90-89ce-a2887e7cfabc)

## 介绍和安装

### 1.  介绍

metricbeat是elstic官方推出的一款轻量型的采集器，属于beats系列中专门用于各种系统和服务统计的beat。不仅可以统计mysql等数据，也可以统计redis、nginx、服务器cpu、内存、磁盘等服务的相关指标。

metricbeat定时从服务器中通过抓包的方式获取对应指标数据，然后发送到elasticsearch或者logstash中

metricbeat由两个部分组成：

- 1、module 所谓module就是针对不同的服务进行采集的模块，比如系统服务就是system module。metricbeat中支持的module有几十种，包括但不仅限于：ActiveMQ module,Apache module,Docker module,HTTP module等，具体可以metricbeat[官方文档中的modules部分](https://link.juejin.cn?target=https%3A%2F%2Fwww.elastic.co%2Fguide%2Fen%2Fbeats%2Fmetricbeat%2F7.13%2Fmetricbeat-modules.html)查看
- 2、metricset

采集的内容，以mysql module为例，支持采集的内容包括但不仅限于： （1）select、update、insert、update语句速率 （2）当前mysql线程连接数 （3）线程连接数趋势 （4）中止连接率趋势 （5）线程活动趋势 （6）缓冲池数据量变化趋势 （7）缓冲池利用率变化趋势 （8）缓冲池效率趋势 （9）mysql网络流量趋势 （10）IO访问次数趋势



### 2. 下载和基本配置

我们的平台是基于elasticsearch+kibana来实现的，也就是我们常说的ELK体系。我们采用Metricbeat插件来采集监控mysql的运行数据。

当然我们这里为了保证搭建的便捷性，并没有使用到Logstash，如果大家有需要的话可以把Metricbeat采集到的数据输出到Logstash

首先关于ELK的搭建就不再累述了，不清楚的同学可以看看往期博客： [ELK搭建（一）：实现分布式微服务日志监控](https://juejin.cn/post/7088314722432319524)

因为我的ELK环境是7.15.1的，所以我们需要下载对应版本的Metricbeat [Metricbeat官方下载地址](https://link.juejin.cn?target=https%3A%2F%2Fwww.elastic.co%2Fcn%2Fdownloads%2Fpast-releases%23metricbeat) 

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205291535687.png" alt="image-20220529153515609" style="zoom: 50%;" />

2、解压压缩包

```c
tar -zxvf metricbeat-7.15.1-linux-arm64.tar.gz 
```

3、修改配置文件metricbeat.yml中的连接信息

```c
vim metricbeat.yml
```

修改内容

```yml
setup.template.settings:
# 因为我这里es是单节点，所以设置主分片数为1，副本分片数为0.否则会报黄
  index.number_of_shards: 1
  index.number_of_replicas: 0
output.elasticsearch:
# 你的es所在服务器ip
  hosts: ["192.168.22.130:9200"]
  username: "elastic"
  password: "elastic"
setup.kibana:
# kibana所在服务器ip
  host: "192.168.22.130:5601"
```



## 监控MySQL

mysql作为市场的主流数据库，承载了大部分公司的核心业务数据，同时也是大多数业务的底层存储。 针对mysql运行情况的监控必不可少，之前我们讲解了如何搭建mysql慢日志、错误日志的监控平台。

那么本期，我们针对mysql集群、性能、各类sql语句执行情况、服务状态等指标来搭建一个可视化的监控平台，方便我们实时了解mysql资源利用率、sql执行效率、访问压力等等。

以下的安装步骤也可以在kibana中看到：主页>添加数据>MySQL 指标 

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205291538911.png" alt="image-20220529153816832" style="zoom: 50%;" />



4、启动mysql模块，metricbeat会根据modules.d/mysql.yml中的配置项来获取系统数据

```c
metricbeat modules enable mysql
```

5、配置要采集的内容，修改modules.d/mysql.yml配置文件

```c
vim modules.d/mysql.yml 
```

配置文件内容，这里我们将status、galera_status、performance的指标都开启，具体可根据自己的需要进行配置

`注意`：这里没有开启query指标集，这是因为query用于监控我们自定义查询语句的指标数据的，需要额外配置其他项并且需要自己构建看板，并不能拆箱即用，所以我们在以后单独介绍。如果直接开启query的话，会出现报错

```yml
- module: mysql
  metricsets:
    - status
    - galera_status
    - performance
   # - query
  period: 10s
 
  hosts: ["root:123456@tcp(127.0.0.1:3306)/"] 
```

这里的mysql配置也可以采取如下形式

```yml
hosts: ["tcp(127.0.0.1:3306)/"]
username: root
password: 123456
```

更多关于Metricbeat的配置可查看[官方文档](https://link.juejin.cn?target=https%3A%2F%2Fwww.elastic.co%2Fguide%2Fen%2Fbeats%2Fmetricbeat%2F7.13%2Fmetricbeat-module-mysql.html)

metricbeat-mysql支持4种指标集： 

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205291549330.png" alt="image-20220529154955288" style="zoom:67%;" />

6、加载kibana仪表盘，如果之前已经设置过就不用再执行了

```c
metricbeat setup
```

 7、启动metricbeat（如果上述的指令没有自动退出的话，就新开个窗口执行，不要退出上述指令窗口）

```c
metricbeat -e
```

8、这里可以在kibana的mysql指标部署流程指南中点击“检查数据”进行测试，成功的话如图所示 

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205291548149.png" alt="image-20220529154838083" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205291543650.png" alt="image-20220529154308598" style="zoom:80%;" />

9、我们对数据库做一下查询、新增、修改等操作，创造一些数据，然后点击或者在那里搜一下mysql`mysql指标仪表板`（Metricbeat MySQL）

可以看到mysql的相关指标都显示出来了。 

![image-20220529154423052](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205291544476.png)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205291546247.png" alt="image-20220529154615140" style="zoom:80%;" />

 如果觉得看板太过拥挤可以拖拽调整看板位置和大小



# APM监控工具

[微服务应用性能如何？APM监控工具来告诉你！ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247486895&idx=1&sn=c20392736c7f0f3b6cf533a94cc3dd4c&scene=21#wechat_redirect)

官方文档：https://www.elastic.co/guide/en/apm/index.html

> 当微服务系统越来越庞大，各个服务间的调用关系也变得越来越复杂，需要一个工具来帮忙理清请求调用的服务链路。之前在[《Spring Cloud Sleuth：分布式请求链路跟踪》](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247484087&idx=1&sn=817da72f117087fe7fa3061cb0bace84&scene=21#wechat_redirect)一文中使用的是Sleuth+Zipkin的解决方案，最近发现应用性能监控（Application Performance Monitoring，APM）也可以很好地解决该问题。对比SkyWalking和Elastic APM之后，发现Elastic APM更胜一筹，今天我们来一波Elastic APM的使用实践！

## Elastic APM 简介

Elastic APM是基于Elastic Stack构建的应用性能监控（APM）系统。它主要有如下用途：

- 用来实时监控应用性能信息，包括HTTP请求调用时长、数据库查询信息、缓存调用信息和外部的HTTP请求调用信息。有助于我们快速找出并解决性能问题。
- 自动收集应用中未处理的错误和异常，显示异常的堆栈信息，有助于快速定位异常和了解出现频率。
- 度量指标是调试生产系统时的另一个重要信息来源。Elastic APM Agent 会自动收集主机级别的度量指标（比如Java JVM和Go Runtime的指标）。
- 支持分布式请求链路追踪，使你能够在一个视图中分析整个服务架构的性能问题。

## 相关组件

Elastic APM 包括四大组件: APM Agent, APM Server, Elasticsearch, Kibana。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301911312.png" alt="image-20220530191103262" style="zoom:67%;" />

- APM Agent：以应用程序库的形式提供，负责收集应用运行时的性能监控数据和错误数据，短时间缓存后发送APM Server。
- APM Server：一个独立的组件，负责接收APM Agent中发送的性能监控数据。验证并处理完数据后，会转存储到Elasticsearch中，之后就可以在Kibana APM 应用中查看性能监控数据了。
- Elasticsearch：用于存储应用性能监控数据并提供聚合功能。
- Kibana APM app：可视化查看APM性能监控数据，有助于找到性能瓶颈。

## 数据模型

Elastic APM Agent 从其检测的应用程序中捕获不同类型的信息。这些操作被称为事件，可以是Span, Transaction, Error, or Metric。

- Span（跨度）：Span包含一次操作过程中代码执行路径的信息。它从操作的开始到结束进行度量，并且可以与其他Span具有父/子关系。
- Transaction（事务）：Transaction是一种特殊的Span，具有与之关联的其他属性。它描述了Elastic APM Agent捕获的最高级别事件，比如一次请求、一次批处理任务等。
- Error（错误）：Error事件至少包含错误发生的原始异常或创建的日志的信息。
- Metric（度量）：APM Agent 自动获取基本的主机级别指标，包括系统和进程级别的CPU和内存指标。也可以获取特定于代理的指标，例如Java Agent中的JVM指标和Go Agent中的Go运行时指标。

## 使用实践

> 学习了上面的基本概念之后，是时候来波实践了，接下来我们将使用Elastic APM来监控SpringBoot应用的性能信息。

### 安装APM Server

- 下载APM Server的安装包，下载地址：https://www.elastic.co/cn/downloads/past-releases#apm-server

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301913634.png" alt="image-20220530191319569" style="zoom:67%;" />

- 下载完成后解压到指定目录；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301913500.png" alt="image-20220530191333435" style="zoom:67%;" />

- 修改配置文件`apm-server.yml`，修改下Elasticsearch的连接地址即可；

```yml
output.elasticsearch:
  hosts: ["localhost:9200"]
```

- 使用如下命令启动APM Server即可，启动成功APM Server将在`8200`端口运行；

```c
apm-server -e
```

- 在Kibana中检测APM Server是否启动成功，访问地址：:5601/app/kibana#/home/tutorial/apm

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301718518.png" alt="image-20220530171856456" style="zoom:80%;" />

注意：即使代理状态显示未接收到任何代理数据，直接点击启动APM即可

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301906964.png" alt="image-20220530190656891" style="zoom:80%;" />

### SpringBoot集成APM Agent

> Java应用集成APM Agent的方式有三种，我们使用最简单的方式，直接在应用中集成。

- 在`pom.xml`中添加相关依赖；

```xml
<!-- https://mvnrepository.com/artifact/co.elastic.apm/apm-agent-attach -->
<dependency>
    <groupId>co.elastic.apm</groupId>
    <artifactId>apm-agent-attach</artifactId>
    <version>1.31.0</version>
    <scope>provided</scope>
</dependency>
```

- 在应用启动类的`main`方法中添加Elastic APM的Attach API；

```java
@SpringBootApplication
public class MallTinyApplication {
    public static void main(String[] args) {
        ElasticApmAttacher.attach();
        SpringApplication.run(MallTinyApplication.class, args);
    }
}
```

- 在`resource`目录下添加Elastic APM的配置文件`elasticapm.properties`；

```properties
# 配置服务名称
service_name=mall-tiny-apm
# 配置应用所在基础包
application_packages=com.macro.mall.tiny
# 配置APM Server的访问地址
server_urls=:8200
```

- 在Kibana中检测APM Agent是否启动成功，访问地址：:5601/app/kibana#/home/tutorial/apm

查看启动

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301909647.png" alt="image-20220530190918587" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301909238.png" alt="image-20220530190943114" style="zoom:80%;" />



### 查看性能监控信息

- 打开监控面板以后，可以发现我们的`mall-tiny-apm`服务已经存在了；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301916142.png" alt="image-20220530191649045" style="zoom: 67%;" />

- 多次调用应用接口，即可查看到应用性能信息；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301917039.png" alt="image-20220530191700963" style="zoom:67%;" />

- 打开某个`Transaction`查看详情，我们可以看到连SQL执行耗时信息都给我们统计好了；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301917539.png" alt="image-20220530191716462" style="zoom:67%;" />

- 不仅如此，打开执行查询的`Span`查看详情，连SQL语句都给我们收集好了；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301917061.png" alt="image-20220530191728985" style="zoom:67%;" />

- 在项目中添加一个有远程调用接口，看看能不能收集到请求调用链路；

```java
/**
 * 品牌管理Controller
 * Created by macro on 2019/4/19.
 */
@Api(tags = "PmsBrandController", description = "商品品牌管理")
@Controller
@RequestMapping("/brand")
public class PmsBrandController {
    
    @ApiOperation("远程调用获取所有品牌信息")
    @RequestMapping(value = "/remoteListAll", method = RequestMethod.GET)
    @ResponseBody
    public CommonResult<List<PmsBrand>> remoteListAll() {
        //模拟耗时操作
        ThreadUtil.sleep(1, TimeUnit.SECONDS);
        //远程调用获取数据
        String response = HttpUtil.get(":8088/brand/listAll");
        JSONObject jsonObject = new JSONObject(response);
        JSONArray data = jsonObject.getJSONArray("data");
        List<PmsBrand> brandList = data.toList(PmsBrand.class);
        return CommonResult.success(brandList);
    }
}
```

- 发现完全可以，Elastic APM完全可以取代Sleuth+Zipkin来做微服务的请求链路跟踪了；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301918485.png" alt="image-20220530191833401" style="zoom:67%;" />

- 使用我们之前`springcloud-learning`中的微服务调用案例，也是可以进行请求链路跟踪的；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301918648.png" alt="image-20220530191821571" style="zoom:67%;" />

- 接下来我们人为制造一个异常，在方法中添加`int i=1/0;`即可，查看下收集到的异常信息；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301918099.png" alt="image-20220530191810003" style="zoom:67%;" />

- 再来看下应用主机的度量信息，非常全面，CPU、内存、JVM信息都有了，以后性能调优的时候可以看看！

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301917060.png" alt="image-20220530191755983" style="zoom:67%;" />

## 总结

Elastic APM 完全可以取代Sleuth+Zipkin来做分布式请求链路追踪，并且提供了数据库及缓存调用时长的统计，很好很强大！不止于此，它还可以用来实时监控应用性能信息及度量指标，连错误日志也收集好了，是一款很好的应用性能监控工具！



















































































































































