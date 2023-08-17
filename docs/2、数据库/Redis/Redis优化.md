


# 最佳实践⭐⭐

[Redis 很屌，不懂使用规范就糟蹋了 (qq.com)](https://mp.weixin.qq.com/s?__biz=MzkzMDI1NjcyOQ==&mid=2247493190&idx=1&sn=a3b6e1b36eb676c0055babbf9864fece&chksm=c27fa470f5082d6643f24d699d78df55195d8f4b6be3e949bac64966cc383f84c7c69bdfd77d&mpshare=1&scene=23&srcid=0421Qw24yooVVXZiHcAeHehP&sharer_sharetime=1650543631517&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

[阿里云官方 Redis 开发规范！ (qq.com)](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247527165&idx=1&sn=ed53653ca612d4e5ae87be19d053fb18&chksm=cea12536f9d6ac20747f6793771838bde9357e325d6dc6e54d58b91cc5f382f965c0432d73bb&mpshare=1&scene=23&srcid=0727vuqmhiTzm1KSweA9EGFZ&sharer_sharetime=1658919234005&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

[Redis最佳实践：7个维度+43条使用规范，带你彻底玩转Redis | 附实践清单 (qq.com)](https://mp.weixin.qq.com/s?__biz=Mzg5MDczNDI0Nw==&mid=2247487616&idx=1&sn=bacd60d64397f96e74a11f9ba679e61e&chksm=cfd94348f8aeca5e39cee689d6884ae265059001b295958cfda3768de961f57e80e338dd53dd&mpshare=1&scene=23&srcid=0817BjNmfGidHnewOggbPeyW&sharer_sharetime=1660666596273&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

## 键值设计

### 优雅的key结构

Redis的Key虽然可以自定义，但最好遵循下面的几个最佳实践约定：

> - 遵循基本格式：[业务名称]:[数据名]:[id]
> - 长度不超过44字节，尽可能短，节省内存空间
> - 不包含特殊字符

> 例如：我们的登录业务，保存用户信息，其key是这样的：
>

> 以业务名(或数据库名)为前缀(防止 key 冲突)，用冒号分隔，比如业务名:表名:id
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022/202205022121206.png" alt="image-20220502212119156" style="zoom: 80%;" />

> 优点：更节省内存： key是string类型，底层编码包含int、embstr和raw三种。` embstr在小于44字节使用，采用连续内存空间，内存占用更小,超过就使用raw模式，浪费空间`,可以通过如下指令判断类型
>

```apl
set name jack
type name
object encoding name
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205030858918.png" alt="image-20220503085858838" style="zoom:80%;" />

我们设计Redis的key的时候，要注意以下这几个点：

> - 以业务名为key前缀，用冒号隔开，以防止key冲突覆盖。如，live:rank:1
> - 确保key的语义清晰的情况下，key的长度尽量小于30个字符。
> - key禁止包含特殊字符，如空格、换行、单双引号以及其他转义字符。
> - Redis的key尽量设置ttl，以保证不使用的Key能被及时清理或淘汰。

### 优雅的value规范

> Redis的value值不可以随意设置的哦。
>

如果大量存储bigKey是会有问题的，会导致慢查询，内存增长过快等等。

> - Key本身的数据量过大：一个String类型的Key，它的值为5 MB。
> - Key中的成员数过多：一个ZSET类型的Key，它的成员数量为10,000个。
> - Key中成员的数据量过大：一个Hash类型的Key，它的成员数量虽然只有1,000个
> - 但这些成员的Value（值）总大小为100 MB。

推荐设置value值

> - 如果是String类型，单个value大小控制10k以内。
> - 如果是hash、list、set、zset类型，元素个数一般不超过5000。

```sh
# 查看内存占用情况，单位字节
memory usage name
memory usage age
```



## BigKey危害、发现、删除

### 什么是大key

> 很多朋友肯定在想redis的key能有多大呀？这里就有个误区了，**所谓的大key问题是某个key的value比较大，所以本质上是大value问题**。这样就对上了，key往往是程序可以自行设置的，value往往不受程序控制，因此可能导致value很大。
>

> 设想一种场景：在线音乐app中，某个歌单有很多用户收藏，假如有这样的数据结构：

> - 歌单和用户之间的映射关系采用redis存储
> - redis的key是歌单ID，长度可控且很小
> - redis的value是个list，list包含了用户ID
> - 用户可能很多，就导致list长度不可控

> 这下明白啥是大key问题了吧！
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101104573.png" alt="image-20221210110412456" style="zoom:80%;" />

> redis中有常见的几种数据结构，每种结构对大key的定义不同，比如：
>

> - value是String类型时，size超过10KB，它的值为5 MB，虽说限制是512M，但大于5M就很大了。
> - value是ZSET、Hash、List、Set等集合类型时，它的成员数量超过1w个
> - value是Hash，它的成员数量虽然只有1,000个但这些成员的Value（值）总大小为100 MB。

### BigKey危害

> 我们都知道，redis的一个典型特征就是：核心工作线程是单线程。单线程中请求任务的处理是串行的，前面完不成，后面处理不了，同时也导致分布式架构中内存数据和CPU的不平衡。大key的影响还是很明显的，**最典型的就是阻塞线程，并发量下降，导致客户端超时，服务端业务成功率下降**。
>

> **网络阻塞**：对BigKey执行读请求时，少量的QPS就可能导致带宽使用率被占满，导致物理机变慢
>
> **数据倾斜**：BigKey所在的Redis实例内存使用率远超其他实例，无法使数据分片的内存资源达到均衡
>
> **Redis阻塞**：对元素较多的hash、list、zset等做运算会耗时较久，使主线程被阻塞
>
> **CPU压力**：对BigKey的数据序列化和反序列化会导致CPU的使用率飙升，影响Redis实例和本机其它应用

大key的产生往往是业务方设计不合理，没有预见vaule的动态增长问题：

> - **一直往value塞数据，没有删除机制，迟早要爆炸**
> - **数据没有合理做分片，将大key变成小key**

### 找到bigkey⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625221107821.png" alt="image-20230625221107821" style="zoom:80%;" />

#### 增加内存&流量&超时等指标监控

> 由于大key的value很大，执行读取时可能阻塞线程，这样Redis整体的qps会下降，并且客户端超时会增加，网络带宽会上涨，配置这些报警可以让我们发现大key的存在。
>

#### memory 命令

```apl
# 测量key占用内存大小
memory usage name
memory usage num
strlen name
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205030903288.png" alt="image-20220503090354229" style="zoom:80%;" />

#### redis-cli --bigkeys命令

> --bigkeys 是 redis 自带的命令，对整个 Key 进行扫描，统计 string，list，set，zset，hash 这几个常见数据类型中每种类型里的最大的 key。string 类型统计的是 value 的字节数；另外 4 种复杂结构的类型统计的是元素个数，不能直观的看出 value 占用字节数，所以 --bigkeys **对分析 string 类型的大 key 是有用的**，而复杂结构的类型还需要一些第三方工具。

> 注：元素个数少，不一定 value 不大；元素个数多，也不一定 value 就大

```apl
# 虽然能发现key，但不够完整
redis-cli --bigkeys
# 如果担心该指令会大幅提升redis的ops，可以增加一个休眠的参数
redis-cli -h 127.0.0.1 -p 6379 --bigkeys -i 0.1
# 有密码
redis-cli -h 127.0.0.1 -p 6379 -a "password" --bigkeys
```

> `--bigkeys` 是以 scan 延迟计算的方式扫描所有 key，因此执行过程中不会阻塞 redis，但实例存在大量的 keys 时，命令执行的时间会很长，这种情况建议在 slave 上扫描。

> `–-bigkeys` 其实就是找出类型中最大的 key，最大的 key 不一定是大 key，最大的 key 都不超过 10kb 的话，说明不存在大 key。

> 但某种类型如果存在较多的大key (>10kb)，只会统计 top1 的那个 key，如果要统计所有大于 10kb 的 key，需要用第三方工具扫描 rdb 持久化文件。利用redis-cli提供的--bigkeys参数，可以遍历分析所有key，并返回Key的整体统计信息与每个数据的Top1的big key

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205030906499.png" alt="image-20220503090620424" style="zoom: 80%;" />

#### scan扫描

> 自己编程，利用scan扫描Redis中的所有key，利用strlen、hlen等命令判断key的长度（此处不建议使用MEMORY USAGE）
>

```apl
help scan
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205030908069.png" alt="image-20220503090805015" style="zoom:80%;" />

> scan提供3个参数：第一个是 cursor 整数值，第二个是 key 的正则模式，第三个是遍历的 limit hint，例如：scan 0 match key99* count 1000 解释：从0开始遍历，匹配key99*，总数是1000 ，1000不是结果数量，是redis单次遍历字典槽位数量(约等于)
> <img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205031042566.png" alt="image-20220503104229509" style="zoom:80%;" />

> Jedis实现
>

```java
@BeforeEach
void setUp() {
    // 1.建立连接
    jedis = new Jedis("127.0.0.1", 6379);
    // jedis = JedisConnectionFactory.getJedis();
    // 2.设置密码
    // jedis.auth("123321");
    // 3.选择库
    jedis.select(0);
}
```

```java
@AfterEach
void tearDown() {
    if (jedis != null) {
        jedis.close();
    }
}
```

```java
final static int STR_MAX_LEN = 10 * 1024;
final static int HASH_MAX_LEN = 500;

@Test
public void testScan() {
    int maxLen = 0;
    long len = 0;
    String cursor = "0";
    do {
        // 扫描并获取一部分key
        ScanResult<String> result = jedis.scan(cursor);
        // 记录cursor
        cursor = result.getCursor();
        List<String> list = result.getResult();
        if (list == null || list.isEmpty()) {
            break;
        }
        // 遍历
        for (String key : list) {
            // 判断key的类型
            String type = jedis.type(key);
            switch (type) {
                case "string":
                    len = jedis.strlen(key);
                    maxLen = STR_MAX_LEN;
                    break;
                case "hash":
                    len = jedis.hlen(key);
                    maxLen = HASH_MAX_LEN;
                    break;
                case "list":
                    len = jedis.llen(key);
                    maxLen = HASH_MAX_LEN;
                    break;
                case "set":
                    len = jedis.scard(key);
                    maxLen = HASH_MAX_LEN;
                    break;
                case "zset":
                    len = jedis.zcard(key);
                    maxLen = HASH_MAX_LEN;
                    break;
                default:
                    break;
            }
            if (len >= maxLen) {
                System.out.printf("Found big key : %s, type: %s, length or size: %d %n",
                                  key, type, len);
            }
        }
    } while (!cursor.equals("0"));
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207180954403.png" alt="image-20220718095406353" style="zoom:80%;" />

#### 第三方工具(推荐)

> 利用第三方工具，如 [redis-rdb-tools](https://github.com/sripathikrishnan/redis-rdb-tools?spm=a2c4g.11186623.0.0.14073c9cldKVDv)[RdRdbtools 是 python写的 一个第三方开源工具，用来解析 Redis 快照文件。除了解析 rdb 文件，还提供了统计单个 key 大小的工具。
>

```apl
git clone https://github.com/sripathikrishnan/redis-rdb-tools
cd redis-rdb-tools sudo && python setup.py install
```

> 从 `dump.rdb` 快照文件统计, 将所有 > 10kb 的 key 输出到一个 csv 文件
>

```apl
rdb dump.rdb -c memory --bytes 10240 -f live_redis.csv
```

[b](https://github.com/sripathikrishnan/redis-rdb-tools?spm=a2c4g.11186623.0.0.14073c9cldKVDv)[-Tools](https://github.com/sripathikrishnan/redis-rdb-tools?spm=a2c4g.11186623.0.0.14073c9cldKVDv) 分析RDB快照文件，全面分析内存使用情况

#### 集成化可视化工具

> 自定义工具，监控进出Redis的网络数据，超出预警值时主动告警。基于某些公有云或者公司内部架构的redis一般都会有可视化的页面和分析工具，来帮助我们定位大key，当然页面底层也可能是基于bigkeys或者rdb文件离线分析的结果。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101119801.png" alt="image-20221210111958691" style="zoom:80%;" />



### 如何删除BigKey

BigKey内存占用较多，即便时删除这样的key也需要耗费很长时间，导致Redis主线程阻塞，引发一系列问题。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101123202.png" alt="image-20221210112318967" style="zoom: 50%;" />

#### unlink

> 如果发现某些大key并非热key就可以在DB中查询使用，则可以在Redis中删掉：当Redis版本大于4.0时，可使用UNLINK命令安全地删除大Key，该命令能够以非阻塞的方式，逐步地清理传入的Key。异步删除不会阻塞主线程，推荐。Redis在4.0后提供了异步删除的命令：unlink  key
>

```apl
set num1 321234
unlink num1
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205031043251.png" alt="image-20220503104359192" style="zoom:80%;" />

> Redis UNLINK 命令类似与 DEL 命令，表示删除指定的 key，如果指定 key 不存在，命令则忽略。
> UNLINK 命令不同与 DEL 命令在于它是异步执行的，因此它不会阻塞。
> UNLINK 命令是非阻塞删除，非阻塞删除简言之，就是将删除操作放到另外一个线程去处理。

#### scan

> 当Redis版本小于4.0时，避免使用阻塞式命令KEYS，而是建议通过SCAN命令执行增量迭代扫描key，判断进行删除。Redis Scan 命令用于迭代数据库中的数据库键。SCAN 命令是一个基于游标的迭代器，每次被调用之后， 都会向用户返回一个新的游标， 用户在下次迭代时需要使用这个新游标作为 SCAN 命令的游标参数， 以此来延续之前的迭代过程。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101125652.png" alt="image-20221210112542554" style="zoom:80%;" />



## 恰当的数据类型

### 恰当的数据类型

> 例1：比如存储一个User对象，我们有三种存储方式：推荐使用hash类型的数据结构

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625221940896.png" alt="image-20230625221940896" style="zoom:80%;" />

> 类型分析如下

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220404211443439.png" alt="image-20220404211443439" style="zoom:67%;" />

### 内存占用优化

#### 问题描述

> 例2：假如有hash类型的key，其中有100万对field和value，field是自增id，这个key存在什么问题？
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022/202205022130031.png" alt="image-20220502213043000" style="zoom:80%;" />

存在的问题：

> 1. hash的entry数量超过500时，会使用哈希表而不是ZipList，内存占用较多。
> 2. 可以通过hash-max-ziplist-entries配置entry上限。`但是如果entry过多就会导致BigKey问题`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022/202205022131119.png" alt="image-20220502213116089" style="zoom:80%;" />

#### 方案分析

> 方案一：更改hash-max-ziplist-entries，可以去配置文件中更改
>

```apl
config get hash-max-ziplist-entries
config set hash-max-ziplist-entries 1024
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205031048481.png" alt="image-20220503104832426" style="zoom: 80%;" />

> 方案二：拆分为string类型：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205022132612.png" alt="image-20220502213237584" style="zoom:80%;" />

存在的问题：

> - string结构底层没有太多内存优化，内存占用较多。
> - 想要批量获取这些数据比较麻烦

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205022133867.png" alt="image-20220502213311831" style="zoom:80%;" />

> 方案三：拆分为小的hash，将 id / 100 作为key， 将id % 100 作为field，这样每100个元素为一个Hash
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205022136204.png" alt="image-20220502213606152" style="zoom: 50%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205022136306.png" alt="image-20220502213635272" style="zoom:80%;" />

#### 代码测试

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>4.1.1</version>
</dependency>
```

测试

```java
private Jedis jedis;

@BeforeEach
public void setUp() {
    //建立连接
    jedis  = new Jedis("127.0.0.1",6379);
    //如果有密码加上密码
    // jedis.auth("123456");
    //选择数据库，可选
    jedis.select(0);
}

@AfterEach
void testDone() {
   if (jedis != null) {
       jedis.close();
   }
}
```

测试大hash

```java
@Test
public void testBigHash() {
    Map<String, String> map = new HashMap<>();
    for (int i = 0; i < 100000; i++) {
        map.put("key_"+i,"value_"+i);
    }
    jedis.hmset("test:big:hash",map);
}
```

测试大string

```java
@Test
public void testBigString() {
    for (int i = 0; i < 100000; i++) {
        jedis.set("test:str:key_"+i,"value_"+i);
    }
}
```

测试小hash

```java
@Test
public void testSmallHash() {
    int hashSize = 100;
    Map<String, String> map = new HashMap<>(hashSize);
    for (int i = 0; i < 100000; i++) {
        int k = (i-1) / hashSize;
        int v = i % hashSize;
        map.put("key_"+v,"value_"+v);
        if (v == 0){
            jedis.hmset("test:small:hash",map);
        }
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205031108690.png" alt="image-20220503110823633" style="zoom:80%;" />

### 键值最佳实践

Key的最佳实践：

> - 固定格式：[业务名]:[数据名]:[id]
> - 足够简短：不超过44字节
> - 不包含特殊字符

Value的最佳实践：

> - 合理的拆分数据，拒绝BigKey
> - 选择合适数据结构
> - Hash结构的entry数量不要超过1000
> - 设置合理的超时时间

## 键值优化

### key过期时间分散

> 给Key设置过期时间，同时注意不同业务的key，尽量过期时间分散一点

> - 因为Redis的数据是存在内存中的，而内存资源是很宝贵的。
> - 我们一般是把Redis当做缓存来用，而**「不是数据库」**，所以key的生命周期就不宜太长久啦。
> - 因此，你的key，一般建议用**「expire设置过期时间」**。

> 如果大量的key在某个时间点集中过期，到过期的那个时间点，Redis可能会存在卡顿，甚至出现**「缓存雪崩」**现象，因此一般不同业务的key，过期时间应该分散一些。有时候，同业务的，也可以在时间上加一个随机值，让过期时间分散一些。

### 使用高效序列化和压缩方法

> 为了节省内存，我们可以使用高效的序列化方法和压缩方法去减少 `value`的大小。
>

> `protostuff`和 `kryo`这两种序列化方法，就要比 `Java`内置的序列化方法效率更高。上述的两种序列化方式虽然省内存，但是序列化后都是二进制数据，可读性太差。

> 通常我们会序列化成 `JSON`或者 `XML`，为了避免数据占用空间大，我们可以使用压缩工具（snappy、 gzip）将数据压缩再存到 Redis 中。
>

### 使用整数对象共享池

> Redis 内部维护了 0 到 9999 这 1 万个整数对象，并把这些整数作为一个共享池使用。即使大量键值对保存了 0 到 9999 范围内的整数，在 Redis 实例中，其实只保存了一份整数对象，可以节省内存空间。
>

> 需要注意的是，有两种情况是不生效的：Redis 中设置了 `maxmemory`，而且启用了 `LRU`策略（`allkeys-lru 或 volatile-lru 策略`），那么，整数对象共享池就无法使用了。
>

> 这是因为 LRU 需要统计每个键值对的使用时间，如果不同的键值对都复用一个整数对象就无法统计了

如果集合类型数据采用 ziplist 编码，而集合元素是整数，这个时候，也不能使用共享池。

> 因为 ziplist 使用了紧凑型内存结构，判断整数对象的共享情况效率低。

## 命令使用规范

有的命令的执行会造成很大的性能问题，我们需要格外注意。

### 生产禁用的指令

> Redis 是单线程处理请求操作，如果我们执行一些涉及大量操作、耗时长的命令，就会严重阻塞主线程，导致其它请求无法得到正常处理。
>

> KEYS：该命令需要对 Redis 的全局哈希表进行全表扫描，严重阻塞 Redis 主线程；应该使用 SCAN 来代替，分批返回符合条件的键值对，避免主线程阻塞。
>

> FLUSHALL：删除 Redis 实例上的所有数据，如果数据量很大，会严重阻塞 Redis 主线程；

> FLUSHDB，删除当前数据库中的数据，如果数据量很大，同样会阻塞 Redis 主线程。加上 ASYNC 选项，让 FLUSHALL，FLUSHDB 异步执行。
>

> 我们也可以直接禁用，用`rename-command`命令在配置文件中对这些命令进行重命名，让客户端无法使用这些命令。禁止线上使用 keys、flushall、flushdb 等，通过 redis 的 rename 机制禁掉命令，或者使用 scan 的方式渐进式处理。
>

> 可以利用rename-command(重命名)禁用。

```apl
# 在redis.conf配置文件中进行配置
# 这样keys *不行了，变成hehe *
rename-command keys hehe
```

### 慎用 MONITOR 命令

> Redis Monitor 命令用于实时打印出Redis服务器接收到的命令，如果我们想知道客户端对redis服务端做了哪些命令操作，就可以用Monitor 命令查看，但是它一般**「调试」**用而已，尽量不要在生产上用！因为**「monitor命令可能导致redis的内存持续飙升。」**
>

> monitor的模型是酱紫的，它会将所有在Redis服务器执行的命令进行输出，一般来讲Redis服务器的QPS是很高的，也就是如果执行了monitor命令，Redis服务器在Monitor这个客户端的输出缓冲区又会有大量“存货”，也就占用了大量Redis内存。`必要情况下使用 monitor 命令时，要注意不要长时间使用。`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205141211813.png" alt="image-20220514121145727" style="zoom:80%;" />

```apl
monitor
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205082227677.png" alt="image-20220508222755602" style="zoom:80%;" />

> MONITOR 命令会把监控到的内容持续写入输出缓冲区。如果线上命令的操作很多，输出缓冲区很快就会溢出了，这就会对 Redis 性能造成影响，甚至引起服务崩溃。所以，除非十分需要监测某些命令的执行（例如，Redis 性能突然变慢，我们想查看下客户端执行了哪些命令）我们才使用。
>

### 慎用全量操作命令O(N)

> 例如 hgetall、lrange、smembers、zrange、sinter 等并非不能使用，但是需要明确 N 的值。有遍历的需求可以使用 hscan、sscan、zscan 代替。比如获取集合中的所有元素（HASH 类型的 hgetall、List 类型的 lrange、Set 类型的 smembers、zrange 等命令）。
>

> 这些操作会对整个底层数据结构进行全量扫描 ，导致阻塞 Redis 主线程。
>

> 码哥，如果业务场景就是需要获取全量数据咋办？

有两个方式可以解决：

> 1. 使用 `SSCAN、HSCAN`等命令分批返回集合数据；
> 2. 把大集合拆成小集合，比如按照时间、区域等划分。

> 因为Redis是单线程执行命令的。hgetall、smember等命令时间复杂度为O(n)，当n持续增加时，会导致 Redis CPU 持续飙高，阻塞其他命令的执行。
>

> hgetall、smember，lrange等这些命令不是一定不能使用，需要综合评估数据量，明确n的值，再去决定。比如hgetall，如果哈希元素n比较多的话，可以优先考虑使用**「hscan」**。

## 批处理优化

> 我们日常写SQL的时候，都知道，批量操作效率会更高，一次更新50条，比循环50次，每次更新一条效率更高。其实Redis操作命令也是这个道理。
>

> Redis客户端执行一次命令可分为4个过程：1.发送命令-> 2.命令排队-> 3.命令执行-> 4. 返回结果。1和4 称为RRT（命令执行往返时间）。Redis提供了**「批量操作命令，如mget、mset」**等，可有效节约RRT。但是呢，大部分的命令，是不支持批量操作的，比如hgetall，并没有mhgetall存在。

> **「Pipeline」** 则可以解决这个问题。Pipeline是什么呢?它能将一组Redis命令进行组装，通过一次RTT传输给Redis，再将这组Redis命令的执行结果按顺序返回给客户端.

- 原生命令：例如 mget、mset。
- 非原生命令：可以使用 pipeline 提高效率。

> 但要注意控制一次批量操作的 **元素个数**(例如 500 以内，实际也和元素字节数有关)。注意两者不同：

> - 原生是原子操作，pipeline 是非原子操作。
> - pipeline 可以打包不同的命令，原生做不到
> - pipeline 需要客户端和服务端同时支持。

我们先来看下没有使用Pipeline执行了n条命令的模型：

### Pipeline

#### 命令执行流程⭐

> **单个命令的执行流程**：一次命令的响应时间 = **1**次往返的网络传输耗时 + **1**次Redis执行命令耗时

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205022142076.png" alt="image-20220502214205036" style="zoom:80%;" />



> **N条命令依次执行**：N次命令的响应时间 = **N**次往返的网络传输耗时 + **N**次Redis执行命令耗时

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205022142015.png" alt="image-20220502214238975" style="zoom: 80%;" />



> 这些命令将使用set和get两个命令，每个命令执行100000次，测试Redis服务器在不同持久化方式下的性能。第一个命令使用单个请求发送，而第二个命令使用管道方式发送。测试结果将保存在benchmark.csv和benchmark-pipe.csv文件中。

**测试Redis服务器在多个实例下的性能**

```sql
redis-benchmark -c 50 -n 10000 -p 6379,6380,6381
```

> 这个命令将使用50个客户端发出10000个请求，分别连接三个Redis实例（端口号分别为6379、6380和6381），测试Redis服务器在多个实例下的性能。测试Redis服务器在不同数据类型下的性能。

```sql
redis-benchmark -n 100000 -t set,get,lpush,lrange,hset,hget -r 1000000 --csv > benchmark.csv
```

> 这个命令将使用set、get、lpush、lrange、hset和hget六个命令，每个命令执行100000次，测试Redis服务器在不同数据类型下的性能。

**测试Redis服务器在不同操作系统下的性能**

```sql
rCopy coderedis-benchmark -c 100 -n 10000 -h 192.168.1.1
redis-benchmark -c 100 -n 10000 -h 192.168.1.1 -p 6379
redis-benchmark -c 100 -n 10000 -h 192.168.1.1 -a password
```

> 这些命令将分别测试Redis服务器在不同操作系统下的性能。第一个命令将使用默认端口号连接Redis服务器；第二个命令将使用指定的端口号连接Redis服务器；第三个命令将使用指定的密码连接Redis服务器。

**测试Redis服务器在不同并发级别下的性能**

```sql
redis-benchmark -n 100000 -t set,get -r 1000000 --csv > benchmark.csv
redis-benchmark -n 100000 -t set,get -r 1000000 --csv -P 16 > benchmark-16.csv
redis-benchmark -n 100000 -t set,get -r 1000000 --csv -P 32 > benchmark-32.csv
```

> 这些命令将分别测试Redis服务器在不同并发级别下的性能。第一个命令使用单线程执行测试，第二个命令使用16个并发线程执行测试，第三个命令使用32个并发线程执行测试。

**测试Redis服务器在不同操作系统下的性能**

```sql
redis-benchmark -c 100 -n 10000 -h 192.168.1.1
redis-benchmark -c 100 -n 10000 -h 192.168.1.1 -p 6379
redis-benchmark -c 100 -n 10000 -h 192.168.1.1 -a password
```

> 这些命令将分别测试Redis服务器在不同操作系统下的性能。第一个命令将使用默认端口号连接Redis服务器；第二个命令将使用指定的端口号连接Redis服务器；第三个命令将使用指定的密码连接Redis服务器。



### 延迟基线测量

redis-cli 命令提供了`–intrinsic-latency` 选项，用来监测和统计测试期间内的最大延迟（以毫秒为单位），这个延迟可以作为 Redis 的基线性能。

```C
redis-cli --latency -h `host` -p `port`
```

比如执行如下指令：

```C
redis-cli --intrinsic-latency 100
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205312146189.png" alt="image-20220531214619094" style="zoom:80%;" />

> 注意：参数`100`是测试将执行的秒数。我们运行测试的时间越长，我们就越有可能发现延迟峰值。
>
> 通常运行 100 秒通常是合适的，足以发现延迟问题了，当然我们可以选择不同时间运行几次，避免误差。

> 运行的最大延迟是 3079 微秒，所以基线性能是 3079 （3 毫秒）微秒。
>
> 需要注意的是，我们要在 Redis 的服务端运行，而不是客户端。这样，可以**避免网络对基线性能的影响**。
>
> 可以通过 `-h host -p port` 来连接服务端，如果想监测网络对 Redis 的性能影响，可以使用 Iperf 测量客户端到服务端的网络延迟。
>
> 如果网络延迟几百毫秒，说明网络可能有其他大流量的程序在运行导致网络拥塞，需要找运维协调网络的流量分配。

### Latency Monitoring

> Redis 在 2.8.13 版本引入了 Latency Monitoring 功能，用于以秒为粒度监控各种事件的发生频率。启用延迟监视器的第一步是**设置延迟阈值(单位毫秒)**。只有超过该阈值的时间才会被记录，比如我们根据基线性能（3ms）的 3 倍设置阈值为 9 ms。

> 可以用 redis-cli 设置也可以在 Redis.config 中设置；

```c
redis-cli CONFIG SET latency-monitor-threshold 9
```

> 工具记录的相关事件的详情可查看官方文档：https://redis.io/topics/latency-monitor

> 如获取最近的 latency

```c
127.0.0.1:6379> debug sleep 2
OK
(2.00s)
127.0.0.1:6379> latency latest
1) 1) "command"
   2) (integer) 1645330616
   3) (integer) 2003
   4) (integer) 2003
```

> 1. 事件的名称；
> 2. 事件发生的最新延迟的 Unix 时间戳；
> 3. 毫秒为单位的时间延迟；
> 4. 该事件的最大延迟。

# 运维工具

> 我们在应用 Redis 时，经常会面临的运维工作，包括 Redis 的运行**状态监控，数据迁移，主从集群、切片集群**的部署和运维。接下来，我就从这三个方面，给你介绍一些工具。我们先来学习下监控 Redis 实时运行状态的工具，这些工具都用到了 Redis 提供的一个监控命令：**INFO**。

## INFO 监控⭐

> Redis 本身提供的 INFO 命令会返回丰富的实例运行监控信息，这个命令是 Redis 监控工具的基础。

> INFO 命令在使用时，可以带一个参数 section，这个参数的取值有好几种，相应的，INFO 命令也会返回不同类型的监控信息。我把 INFO 命令的返回信息分成 5 大类，其中，有的类别当中又包含了不同的监控内容，如下表所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207181458880.png" alt="image-20220718145840688" style="zoom: 67%;" />

> 在监控 Redis 运行状态时，INFO 命令返回的结果非常有用。如果你想了解 INFO 命令的所有参数返回结果的详细含义，可以查看 Redis官网的介绍。这里，我给你提几个运维时需要重点关注的参数以及它们的重要返回结果。

> 首先，无论你是运行单实例或是集群，我建议你重点关注一下 stat、commandstat、cpu 和 memory 这四个参数的返回结果，这里面包含了命令的执行情况（比如命令的执行次数和执行时间、命令使用的 CPU 资源），内存资源的使用情况（比如内存已使用量、内存碎片率），CPU 资源使用情况等，这可以帮助我们判断实例的运行状态和资源消耗情况。

> 另外，当你启用 RDB 或 AOF 功能时，你就需要重点关注下 persistence 参数的返回结果，你可以通过它查看到 RDB 或者 AOF 的执行情况。

> 如果你在使用主从集群，就要重点关注下 replication 参数的返回结果，这里面包含了主从同步的实时状态。不过，INFO 命令只是提供了文本形式的监控结果，并没有可视化，所以，在实际应用中，我们还可以使用一些第三方开源工具，将 INFO 命令的返回结果可视化。接下来，我要讲的 Prometheus，就可以通过插件将 Redis 的统计结果可视化。

## Prometheus监控

> **Prometheus**是一套开源的系统监控报警框架。它的核心功能是从被监控系统中拉取监控数据，结合Grafana工具，进行可视化展示。而且，监控数据可以保存到时序数据库中，以便运维人员进行历史查询。同时，Prometheus 会检测系统的监控指标是否超过了预设的阈值，一旦超过阈值，Prometheus 就会触发报警。

> 对于系统的日常运维管理来说，这些功能是非常重要的。而 Prometheus 已经实现了使用这些功能的工具框架。我们只要能从被监控系统中获取到监控数据，就可以用 Prometheus 来实现运维监控。
>

> Prometheus 正好提供了插件功能来实现对一个系统的监控，我们把插件称为 exporter，每一个 exporter 实际是一个采集监控数据的组件。exporter 采集的数据格式符合 Prometheus 的要求，Prometheus 获取这些数据后，就可以进行展示和保存了。
>

> Redis-exporter就是用来监控 Redis 的，它将 INFO 命令监控到的运行状态和各种统计信息提供给 Prometheus，从而进行可视化展示和报警设置。目前，Redis-exporter 可以支持 Redis 2.0 至 6.0 版本，适用范围比较广。
>

> 除了获取 Redis 实例的运行状态，Redis-exporter 还可以监控键值对的大小和集合类型数据的元素个数，这个可以在运行 Redis-exporter 时，使用 check-keys 的命令行选项来实现。
>

> 此外，我们可以开发一个 Lua 脚本，定制化采集所需监控的数据。然后，我们使用 scripts 命令行选项，让 Redis-exporter 运行这个特定的脚本，从而可以满足业务层的多样化监控需求。
>

> 最后，我还想再给你分享两个小工具：redis-stat和Redis Live。跟 Redis-exporter 相比，这两个都是轻量级的监控工具。它们分别是用 Ruby 和 Python 开发的，也是将 INFO 命令提供的实例运行状态信息可视化展示。虽然这两个工具目前已经很少更新了
>

## 数据迁移工具 Redis-shake

> 有时候，我们需要在不同的实例间迁移数据。目前，比较常用的一个数据迁移工具是**Redis-shake**，这是阿里云 Redis 和 MongoDB 团队开发的一个用于 Redis 数据同步的工具。**Redis-shake** 的基本运行原理，是先启动 Redis-shake 进程，这个进程模拟了一个 Redis 实例。
>

> 然后，Redis-shake 进程和数据迁出的源实例进行数据的全量同步。这个过程和 Redis 主从实例的全量同步是类似的。源实例相当于主库，Redis-shake 相当于从库，源实例先把 RDB 文件传输给 Redis-shake，Redis-shake 会把 RDB 文件发送给目的实例。接着，源实例会再把增量命令发送给 Redis-shake，Redis-shake 负责把这些增量命令再同步给目的实例。
>

> 下面这张图展示了 Redis-shake 进行数据迁移的过程：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207181500806.png" alt="image-20220718150008735" style="zoom:80%;" />

> **Redis-shake** 的一大优势，就是支持多种类型的迁移。首先，它既支持单个实例间的数据迁移，也支持集群到集群间的数据迁移。其次，有的 Redis 切片集群（例如 Codis）会使用 proxy 接收请求操作，Redis-shake 也同样支持和 proxy 进行数据迁移。

> 另外，因为 Redis-shake 是阿里云团队开发的，所以，除了支持开源的 Redis 版本以外，Redis-shake 还支持云下的 Redis 实例和云上的 Redis 实例进行迁移，可以帮助我们实现 Redis 服务上云的目标。
>

> 在数据迁移后，我们通常需要对比源实例和目的实例中的数据是否一致。如果有不一致的数据，我们需要把它们找出来，从目的实例中剔除，或者是再次迁移这些不一致的数据。
>

## 数据一致性比对工具

[官方地址](https://github.com/tair-opensource/RedisFullCheck)

> 这里，我就要再给你介绍一个数据一致性比对的工具了，就是阿里云团队开发的Redis-full-check。
>

> Redis-full-check 的工作原理很简单，就是对源实例和目的实例中的数据进行全量比对，从而完成数据校验。不过，为了降低数据校验的比对开销，Redis-full-check 采用了多轮比较的方法。
>

> 在第一轮校验时，Redis-full-check 会找出在源实例上的所有 key，然后从源实例和目的实例中把相应的值也都查找出来，进行比对。第一次比对后，Redis-full-check 会把目的实例中和源实例不一致的数据，记录到 sqlite 数据库中。
>

> 从第二轮校验开始，Redis-full-check 只比较上一轮结束后记录在数据库中的不一致的数据。
>

> 为了避免对实例的正常请求处理造成影响，Redis-full-check 在每一轮比对结束后，会暂停一段时间。随着 Redis-shake 增量同步的进行，源实例和目的实例中的不一致数据也会逐步减少，所以，我们校验比对的轮数不用很多。
>

> 我们可以自己设置比对的轮数。具体的方法是，在运行 Redis-full-check 命令时，把参数 comparetimes 的值设置为我们想要比对的轮数。等到所有轮数都比对完成后，数据库中记录的数据就是源实例和目的实例最终的差异结果了。
>

> 这里有个地方需要注意下，Redis-full-check 提供了三种比对模式，我们可以通过 comparemode 参数进行设置。comparemode 参数有三种取值，含义如下：

> - KeyOutline，只对比 key 值是否相等；
> - ValueOutline，只对比 value 值的长度是否相等；
> - FullValue，对比 key 值、value 长度、value 值是否相等。

> 我们在应用 Redis-full-check 时，可以根据业务对数据一致性程度的要求，选择相应的比对模式。如果一致性要求高，就把 comparemode 参数设置为 FullValue。好了，最后，我再向你介绍一个用于 Redis 集群运维管理的工具 CacheCloud。
>

## 集群管理工具 CacheCloud

[sohutv/cachecloud: Redis私有云平台 ](https://github.com/sohutv/cachecloud/)

> **CacheCloud**是搜狐开发的一个面向 Redis 运维管理的云平台，它实现了主从集群、哨兵集群和 Redis Cluster 的自动部署和管理，用户可以直接在平台的管理界面上进行操作。

针对常见的集群运维需求，CacheCloud 提供了 5 个运维操作。

> - 下线实例：关闭实例以及实例相关的监控任务。
> - 上线实例：重新启动已下线的实例，并进行监控。
> - 添加从节点：在主从集群中给主节点添加一个从节点。
> - 故障切换：手动完成 Redis Cluster 主从节点的故障转移。
> - 配置管理：用户提交配置修改的工单后，管理员进行审核，并完成配置修改。

> 当然，作为运维管理平台，CacheCloud 除了提供运维操作以外，还提供了丰富的监控信息。
>

> CacheCloud 不仅会收集 INFO 命令提供的实例实时运行状态信息，进行可视化展示，而且还会把实例运行状态信息保存下来，例如内存使用情况、客户端连接数、键值对数据量。这样一来，当 Redis 运行发生问题时，运维人员可以查询保存的历史记录，并结合当时的运行状态信息进行分析。如果你希望有一个统一平台，把 Redis 实例管理相关的任务集中托管起来，CacheCloud 是一个不错的工具。
>











