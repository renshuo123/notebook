

# 数据结构

> 这一部分就比较深了，如果不是简历上写了精通Redis，应该不会怎么问。
>

## 动态字符串SDS

> 我们都知道Redis中保存的Key是字符串，value往往是字符串或者字符串的集合。可见字符串是Redis中最常用的一种数据结构。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091037823.png" alt="image-20220609103755749" style="zoom:80%;" />

不过Redis没有直接使用C语言中的字符串，因为C语言字符串存在很多问题：

> - `获取字符串长度的需要通过运算`
> - `非二进制安全，读取到\0才截止，是特殊字符，如果存储的值是\0，则会出现问题`
> - `不可修改`

> Redis构建了一种新的字符串结构，称为**简单动态字符串**（**S**imple **D**ynamic **S**tring），简称**SDS**。
>

例如，我们执行命令：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091037728.png" alt="image-20220609103742652" style="zoom:80%;" />

> 那么Redis将在底层创建两个SDS，其中一个是包含“name”的SDS，另一个是包含“虎哥”的SDS。Redis是C语言实现的，其中SDS是一个结构体，源码如下：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091042997.png" alt="image-20220609104223905" style="zoom:80%;" />

> 例如，一个包含字符串“name”的sds结构如下：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091042076.png" alt="image-20220609104243993" style="zoom:80%;" />

> SDS之所以叫做动态字符串，是因为它具备动态扩容的能力，例如一个内容为“hi”的SDS：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091044263.png" alt="image-20220609104421187" style="zoom:80%;" />

> 假如我们要给SDS追加一段字符串“,Amy”，这里首先会申请新内存空间：

> - 如果新字符串小于1M，则新空间为扩展后字符串长度的两倍+1；
> - 如果新字符串大于1M，则新空间为扩展后字符串长度+1M+1。称为**内存预分配**。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091044225.png" alt="image-20220609104447141" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091045007.png" alt="image-20220609104511930" style="zoom:80%;" />

## 整数集合IntSet

> IntSet是Redis中set集合的一种实现方式，基于整数数组来实现，并且具备长度可变、有序等特征。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626160508347.png" alt="image-20230626160508347" style="zoom:80%;" />

> 其中的encoding包含三种模式，表示存储的整数大小不同：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626160623893.png" alt="image-20230626160623893" style="zoom:80%;" />

> 为了方便查找，Redis会将intset中所有的整数按照升序依次保存在contents数组中，结构如图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626160701190.png" alt="image-20230626160701190" style="zoom:80%;" />

> 现在，数组中每个数字都在int16_t的范围内，因此采用的编码方式是INTSET_ENC_INT16

> 每部分占用的字节大小为：encoding：4字节、length：4字节、contents：2字节 * 3  = 6字节

> 现在，假设有一个intset，元素为{5,10，20}，采用的编码是INTSET_ENC_INT16，则每个整数占2字节：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626160807329.png" alt="image-20230626160807329" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626160911917.png" alt="image-20230626160911917" style="zoom:80%;" />

> 向该其中添加一个数字：50000，这个数字超出了int16_t的范围，intset会自动**升级**编码方式到合适大小

以当前案例来说流程如下：

> ①升级编码为INTSET_ENC_INT32, 每个整数占4字节，并按照新的编码方式及元素个数扩容数组
>
> ②倒序依次将数组中的元素拷贝到扩容后的正确位置

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626160855108.png" alt="image-20230626160855108" style="zoom:80%;" />

> 新增流程

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626161008701.png" alt="image-20230626161008701" style="zoom:80%;" />

> 升级流程

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626161036758.png" alt="image-20230626161036758" style="zoom: 80%;" />

> Intset可以看做是特殊的整数数组，具备一些特点：

> ①Redis会确保Intset中的元素唯一、有序
>
> ②具备类型升级机制，可以节省内存空间
>
> ③底层采用二分查找方式来查询

## 字典类型Dict

> 我们知道Redis是一个键值型（Key-Value Pair）的数据库，我们可以根据键实现快速的增删改查。而键与值的映射关系正是通过Dict来实现的。Dict由三部分组成，分别是：哈希表（DictHashTable）、哈希节点（DictEntry）、字典（Dict）

### 数据结构

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626161403439.png" alt="image-20230626161403439" style="zoom:80%;" />

> 当我们向Dict添加键值对时，Redis首先根据key计算出hash值（h），然后利用 h & sizemask来计算元素应该存储到数组中的哪个索引位置。我们存储k1=v1，假设k1的哈希值h =1，则1&3 =1，因此k1=v1要存储到数组角标1位置。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626161545390.png" alt="image-20230626161545390" style="zoom:80%;" />

> Dict由三部分组成，分别是：哈希表（DictHashTable）、哈希节点（DictEntry）、字典（Dict）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626161705925.png" alt="image-20230626161705925" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626161753287.png" alt="image-20230626161753287" style="zoom:80%;" />

### Dict扩容

> Dict中的HashTable就是数组结合单向链表的实现，当集合中元素较多时，必然导致哈希冲突增多，链表过长，则查询效率会大大降低。

> Dict在每次新增键值对时都会检查**负载因子**（LoadFactor = used/size） ，满足以下两种情况时会触发**哈希表扩容**：哈希表的 LoadFactor >= 1，并且服务器没有执行 BGSAVE 或者 BGREWRITEAOF 等后台进程；哈希表的 LoadFactor > 5 ；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626161910941.png" alt="image-20230626161910941" style="zoom:80%;" />

### Dict收缩

> Dict除了扩容外，每次删除元素时，也会对负载因子做检查，当LoadFactor < 0.1 时，会做哈希表收缩：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626161959678.png" alt="image-20230626161959678" style="zoom:80%;" />

### Dict的rehash

> 不管是扩容还是收缩，必定会创建新的哈希表，导致哈希表的size和sizemask变化，而key的查询与sizemask有关。因此必须对哈希表中的每一个key重新计算索引，插入新的哈希表，这个过程称为**rehash**。过程是这样的：

> ①  计算新hash表的realeSize，值取决于当前要做的是扩容还是收缩：
>
> - 如果是扩容，则新size为第一个大于等于dict.ht[0].used + 1的2^n
> - 如果是收缩，则新size为第一个大于等于dict.ht[0].used的2^n （不得小于4）

> ②按照新的realeSize申请内存空间，创建dictht，并赋值给dict.ht[1]
>
> ③设置dict.rehashidx = 0，标示开始rehash
>
> ④将dict.ht[0]中的每一个dictEntry都rehash到dict.ht[1]
>
> ⑤将dict.ht[1]赋值给dict.ht[0]，给dict.ht[1]初始化为空哈希表，释放原来的dict.ht[0]的内存

### 渐进式rehash

> Dict的rehash并不是一次性完成的。试想一下，如果Dict中包含数百万的entry，要在一次rehash完成，极有可能导致主线程阻塞。因此Dict的rehash是分多次、渐进式的完成，因此称为**渐进式rehash**。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626162345448.png" alt="image-20230626162345448" style="zoom:80%;" />

Dict的结构：

> 1. 类似java的HashTable，底层是数组加链表来解决哈希冲突
> 2. Dict包含两个哈希表，ht[0]平常用，ht[1]用来rehash

Dict的伸缩：

> 1. 当LoadFactor大于5或者LoadFactor大于1并且没有子进程任务时，Dict扩容
> 2. 当LoadFactor小于0.1时，Dict收缩
> 3. 扩容大小为第一个大于等于used + 1的2^n
> 4. 收缩大小为第一个大于等于used 的2^n
> 5. Dict采用渐进式rehash，每次访问Dict时执行一次rehash
> 6. rehash时ht[0]只减不增，新增操作只在ht[1]执行，其它操作在两个哈希表



## 压缩列表ZipList

### 数据结构

> **ZipList** 是一种特殊的“`双端链表`” ，由一系列特殊编码的连续内存块组成。`可以在任意一端进行压入/弹出操作, 并且该操作的时间复杂度为 O(1)`。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091051604.png" alt="image-20220609105111504" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091051712.png" alt="image-20220609105151619" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091052145.png" alt="image-20220609105207051" style="zoom:80%;" />

### ZipListEntry

> **ZipList** 中的Entry并不像普通链表那样记录前后节点的指针，因为记录两个指针要占用16个字节，浪费内存。而是采用了下面的结构：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091053716.png" alt="image-20220609105307638" style="zoom:80%;" />

> - previous_entry_length：前一节点的长度，占1个或5个字节。
> - 如果前一节点的长度小于254字节，则采用1个字节来保存这个长度值
> - 如果前一节点的长度大于254字节，则采用5个字节来保存这个长度值，第一个字节为0xfe，后四个字节才是真实长度数据

> encoding：编码属性，记录content的数据类型（字符串还是整数）以及长度，占用1个、2个或5个字节
>

> contents：负责保存节点的数据，可以是字符串或整数
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091053189.png" alt="image-20220609105356108" style="zoom:80%;" />

### Encoding编码

> ZipListEntry中的encoding编码分为字符串和整数两种：
>
> 字符串：如果encoding是以“00”、“01”或者“10”开头，则证明content是字符串

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626163546835.png" alt="image-20230626163546835" style="zoom:80%;" />

> 例如，我们要保存字符串：“ab”和 “bc”

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626163650309.png" alt="image-20230626163650309" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626163717709.png" alt="image-20230626163717709" style="zoom:80%;" />

### 连锁更新

> ZipList的每个Entry都包含previous_entry_length来记录上一个节点的大小，长度是1个或5个字节：

> - 如果前一节点的长度小于254字节，则采用1个字节来保存这个长度值
> - 如果前一节点的长度大于等于254字节，则采用5个字节来保存这个长度值，第一个字节为0xfe，后四个字节才是真实长度数据

> 现在，假设我们有N个连续的、长度为250~253字节之间的entry，因此entry的previous_entry_length属性用1个字节即可表示，如图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626164021556.png" alt="image-20230626164021556" style="zoom:80%;" />

ZipList特性：

> ①压缩列表的可以看做一种连续内存空间的"双向链表"
>
> ②列表的节点之间不是通过指针连接，而是记录上一节点和本节点长度来寻址，内存占用较低
>
> ③如果列表数据过多，导致链表过长，可能影响查询性能
>
> ④增或删较大数据时有可能发生连续更新问题

## 快表QuickList

问题1：ZipList虽然节省内存，但申请内存必须是连续空间，如果内存占用较多，申请内存效率很低，怎么

> 为了缓解这个问题，我们必须限制ZipList的长度和entry大小。

问题2：但是我们要存储大量数据，超出了ZipList最佳的上限该怎么办？

> 我们可以创建多个ZipList来分片存储数据。

问题3：数据拆分后比较分散，不方便管理和查找，这多个ZipList如何建立联系？

> 在3.2版本引入了新**QuickList**，它是一个双端链表，只不过链表中的每个节点都是一个ZipList

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091056943.png" alt="image-20220609105646852" style="zoom:80%;" />

> 为了避免QuickList中的每个ZipList中entry过多，Redis提供了一个配置项：list-max-ziplist-size来限制。

> - 如果值为正，则代表ZipList的允许的entry个数的最大值
> - 如果值为负，则代表ZipList的最大内存大小，分5种情况：

> ①-1：每个ZipList的内存占用不能超过4kb
>
> ②-2：每个ZipList的内存占用不能超过8kb
>
> ③-3：每个ZipList的内存占用不能超过16kb
>
> ④-4：每个ZipList的内存占用不能超过32kb
>
> ⑤-5：每个ZipList的内存占用不能超过64kb

其默认值为 -2：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091057667.png" alt="image-20220609105722583" style="zoom:80%;" />

> 除了控制ZipList的大小，QuickList还可以对节点的ZipList做压缩。通过配置项list-compress-depth来控制。因为链表一般都是从首尾访问较多，所以首尾是不压缩的。这参数是控制首尾不压缩的节点个数：

> - 0：特殊值，代表不压缩
> - 1：标示QuickList的首尾各有1个节点不压缩，中间节点压缩
> - 2：标示QuickList的首尾各有2个节点不压缩，中间节点压缩，以此类推

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091058792.png" alt="image-20220609105816691" style="zoom:80%;" />

以下是QuickList的和QuickListNode的结构源码：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091058015.png" alt="image-20220609105851913" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091059497.png" alt="image-20220609105908396" style="zoom:80%;" />

QuickList的特点：

> 1. 是一个节点为ZipList的双端链表
> 2. 节点采用ZipList，解决了传统链表的内存占用问题
> 3. 控制了ZipList大小，解决连续内存空间申请效率问题
> 4. 中间节点可以压缩，进一步节省了内存

## 跳表SkipList

> **SkipList（跳表）**首先是链表，但与传统链表相比有几点差异：

> - 元素按照升序排列存储
> - 节点可能包含多个指针，指针跨度不同。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626164848061.png" alt="image-20230626164848061" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626164909599.png" alt="image-20230626164909599" style="zoom: 80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626164927912.png" alt="image-20230626164927912" style="zoom:80%;" />

![image-20230626164956416](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626164956416.png)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626165048137.png" alt="image-20230626165048137" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626165129647.png" alt="image-20230626165129647" style="zoom:80%;" />

SkipList的特点：

> - 跳跃表是一个双向链表，每个节点都包含score和ele值
> - 节点按照score值排序，score值一样则按照ele字典排序
> - 每个节点都可以包含多层指针，层数是1到32之间的随机数
> - 不同层指针到下一个节点的跨度不同，层级越高，跨度越大
> - 增删改查效率与红黑树基本一致，实现却更简单

## RedisObject

### Redis对象

> Redis中的任意数据类型的键和值都会被封装为一个RedisObject，也叫做Redis对象，源码如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626165818436.png" alt="image-20230626165818436" style="zoom:80%;" />

### 编码方式

> Redis中会根据存储的数据类型不同，选择不同的编码方式，共包含11种不同类型：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626165905552.png" alt="image-20230626165905552" style="zoom:80%;" />

### 数据结构

> Redis中会根据存储的数据类型不同，选择不同的编码方式。每种数据类型的使用的编码方式如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626165928391.png" alt="image-20230626165928391" style="zoom:80%;" />



# 数据类型应用

## String

> String是Redis中最常见的数据存储类型：

> 其基本编码方式是**RAW**，基于简单动态字符串（SDS）实现，存储上限为512mb。如果存储的SDS长度小于44字节，则会采用**EMBSTR**编码，此时object head与SDS是一段连续空间。申请内存时只需要调用一次内存分配函数，效率更高。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626195328510.png" alt="image-20230626195328510" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626195346616.png" alt="image-20230626195346616" style="zoom:80%;" />

> 如果存储的字符串是整数值，并且大小在LONG_MAX范围内，则会采用**INT**编码：直接将数据保存在RedisObject的ptr指针位置（刚好8字节），不再需要SDS了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626195356944.png" alt="image-20230626195356944" style="zoom:80%;" />



<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626195434869.png" alt="image-20230626195434869" style="zoom:80%;" />



<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626195458008.png" alt="image-20230626195458008" style="zoom:80%;" />

> Redis的List类型可以从首、尾操作列表中的元素：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626195746320.png" alt="image-20230626195746320" style="zoom:80%;" />

> 哪一个数据结构能满足上述特征？

> 1. LinkedList ：普通链表，可以从双端访问，内存占用较高，内存碎片较多
> 2. ZipList ：压缩列表，可以从双端访问，内存占用低，存储上限低
> 3. QuickList：LinkedList + ZipList，可以从双端访问，内存占用较低，包含多个ZipList，存储上限高

## List

> Redis的List结构类似一个双端链表，可以从首、尾操作列表中的元素：

> 在3.2版本之前，Redis采用ZipList和LinkedList来实现List，当元素数量小于512并且元素大小小于64字节时采用ZipList编码，超过则采用LinkedList编码。

> 在3.2版本之后，Redis统一采用QuickList来实现List：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626195911137.png" alt="image-20230626195911137" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626195944744.png" alt="image-20230626195944744" style="zoom:80%;" />

## Set

> Set是Redis中的单列集合，满足下列特点：

> 不保证有序性、保证元素唯一、求交集、并集、差集

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626200024158.png" alt="image-20230626200024158" style="zoom: 80%;" />

> 可以看出，Set对查询元素的效率要求非常高，思考一下，什么样的数据结构可以满足？
>
> HashTable，也就是Redis中的Dict，不过Dict是双列集合（可以存键、值对）

> Set是Redis中的集合，不一定确保元素有序，可以满足元素唯一、查询效率要求极高。为了查询效率和唯一性，set采用HT编码（Dict）。Dict中的key用来存储元素，value统一为null。当存储的所有数据都是整数，并且元素数量不超过set-max-intset-entries时，Set会采用IntSet编码，以节省内存

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626200110929.png" alt="image-20230626200110929" style="zoom:80%;" />

> set-max-intset-entries的默认值是512：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626200131603.png" alt="image-20230626200131603" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626200208576.png" alt="image-20230626200208576" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626200247185.png" alt="image-20230626200247185" style="zoom:80%;" />

## ZSet

> ZSet也就是SortedSet，其中每一个元素都需要指定一个score值和member值：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626200323071.png" alt="image-20230626200323071" style="zoom:80%;" />

> 因此，zset底层数据结构必须满足**键值存储、键必须唯一、可排序**这几个需求。之前学习的哪种编码结构可以满足？

> **SkipList**：可以排序，并且可以同时存储score和ele值（member）

> **HT（Dict）**：可以键值存储，并且可以根据key找value

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626200409790.png" alt="image-20230626200409790" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626200631052.png" alt="image-20230626200631052" style="zoom:80%;" />

> 当元素数量不多时，HT和SkipList的优势不明显，而且更耗内存。因此zset还会采用ZipList结构来节省内存，不过需要同时满足两个条件：
>
> ①元素数量小于zset_max_ziplist_entries，默认值128
>
> ②每个元素都小于zset_max_ziplist_value字节，默认值64

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626200738016.png" alt="image-20230626200738016" style="zoom:80%;" />

> ziplist本身没有排序功能，而且没有键值对的概念，因此需要有zset通过编码实现：
>
> ZipList是连续内存，因此score和element是紧挨在一起的两个entry， element在前，score在后
>
> score越小越接近队首，score越大越接近队尾，按照score值升序排列

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626200838586.png" alt="image-20230626200838586" style="zoom:80%;" />

## Hash

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626200914140.png" alt="image-20230626200914140" style="zoom:80%;" />

> 因此，Hash底层采用的编码与Zset也基本一致，只需要把排序有关的SkipList去掉即可：

> Hash结构默认采用ZipList编码，用以节省内存。 ZipList中相邻的两个entry 分别保存field和value
>
> 当数据量较大时，Hash结构会转为HT编码，也就是Dict，触发条件有两个：
>
> ①ZipList中的元素数量超过了hash-max-ziplist-entries（默认512）
>
> ②ZipList中的任意entry大小超过了hash-max-ziplist-value（默认64字节）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626200959696.png" alt="image-20230626200959696" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626201023427.png" alt="image-20230626201023427" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626201710223.png" alt="image-20230626201710223" style="zoom:80%;" />



# 网络模型

## 用户空间和内核空间

> 服务器大多都采用Linux系统，这里我们以Linux为例来讲解:

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626202315589.png" alt="image-20230626202315589" style="zoom:80%;" />

> 任何Linux发行版，其系统内核都是Linux。我们的应用都需要通过Linux内核与硬件交互。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626202410880.png" alt="image-20230626202410880" style="zoom:80%;" />

> 为了避免用户应用导致冲突甚至内核崩溃，用户应用与内核是分离的：

> 进程的寻址空间会划分为两部分：**内核空间、用户空间**
>
> **用户空间**只能执行受限的命令（Ring3），不能直接调用系统资源，必须通过内核提供的接口来访问
>
> **内核空间**可以执行特权命令（Ring0），调用一切系统资源

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626202502370.png" alt="image-20230626202502370" style="zoom:80%;" />

> Linux系统为了提高IO效率，会在用户空间和内核空间都加入缓冲区：
>
> 1. 写数据时，要把用户缓冲数据拷贝到内核缓冲区，然后写入设备
> 2. 读数据时，要从设备读取数据到内核缓冲区，然后拷贝到用户缓冲区

## 阻塞IO

> 在《UNIX网络编程》一书中，总结归纳了5种IO模型：

> - 阻塞IO（Blocking IO）
> - 非阻塞IO（Nonblocking IO）
> - IO多路复用（IO Multiplexing）
> - 信号驱动IO（Signal Driven IO）
> - 异步IO（Asynchronous IO）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626202632605.png" alt="image-20230626202632605" style="zoom:80%;" />

![image-20230626202655248](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626202655248.png)

## 非阻塞IO

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626203149596.png" alt="image-20230626203149596" style="zoom:80%;" />

## IO多路复用

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626203213378.png" alt="image-20230626203213378" style="zoom:80%;" />

> 那么问题来了：用户进程如何知道内核中数据是否就绪呢？

> **文件描述符**（File Descriptor）：简称FD，是一个从0 开始的无符号整数，用来关联Linux中的一个文件。在Linux中，一切皆文件，例如常规文件、视频、硬件设备等，当然也包括网络套接字Socket

> **IO多路复用**：是利用单个线程来同时监听多个FD，并在某个FD可读、可写时得到通知，从而避免无效的等待，充分利用CPU资源。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626203337074.png" alt="image-20230626203337074" style="zoom:80%;" />

> **IO多路复用**是利用单个线程来同时监听多个FD，并在某个FD可读、可写时得到通知，从而避免无效的等待，充分利用CPU资源。不过监听FD的方式、通知的方式又有多种实现，常见的有：

> select、poll、epoll

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626203421784.png" alt="image-20230626203421784" style="zoom:80%;" />

> select和poll只会通知用户进程有FD就绪，但不确定具体是哪个FD，需要用户进程逐个遍历FD来确认

> epoll则会在通知用户进程FD就绪的同时，把已就绪的FD写入用户空间

### IO多路复用-select

> **select**是Linux最早是由的I/O多路复用技术：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626203543602.png" alt="image-20230626203543602" style="zoom:80%;" />

### IO多路复用-poll

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626203614585.png" alt="image-20230626203614585" style="zoom:80%;" />

### IO多路复用-epoll

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626203651900.png" alt="image-20230626203651900" style="zoom:80%;" />

> select模式存在的三个问题：
>
> - 能监听的FD最大不超过1024
> - 每次select都需要把所有要监听的FD都拷贝到内核空间
> - 每次都要遍历所有FD来判断就绪状态

> poll模式的问题：
>
> poll利用链表解决了select中监听FD上限的问题，但依然要遍历所有FD，如果监听较多，性能下降

> epoll模式中如何解决这些问题的？
>
> - 基于epoll实例中的红黑树保存要监听的FD，理论上无上限，而且增删改查效率都非常高
> - 每个FD只需要执行一次epoll_ctl添加到红黑树，以后每次epol_wait无需传递任何参数，无需重复拷贝FD到内核空间
> - 利用ep_poll_callback机制来监听FD状态，无需遍历所有FD，性能不会随监听的FD数量增多而下降

### IO多路复用-事件通知机制

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626203837561.png" alt="image-20230626203837561" style="zoom:80%;" />

> 基于epoll模式的web服务的基本流程如图

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626203859680.png" alt="image-20230626203859680" style="zoom:80%;" />

## 信号驱动IO

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626203919587.png" alt="image-20230626203919587" style="zoom:80%;" />

> 当有大量IO操作时，信号较多，SIGIO处理函数不能及时处理可能导致信号队列溢出，而且内核空间与用户空间的频繁信号交互性能也较低。

## 异步IO

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626203953761.png" alt="image-20230626203953761" style="zoom:67%;" />

> 可以看到，异步IO模型中，用户进程在两个阶段都是非阻塞状态。

## 同步和异步

> IO操作是同步还是异步，关键看数据在内核空间与用户空间的拷贝过程（数据读写的IO操作），也就是阶段二是同步还是异步：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626204040280.png" alt="image-20230626204040280" style="zoom:80%;" />



## Redis网络模型

> Redis到底是单线程还是多线程？
>
> 如果仅仅聊Redis的核心业务部分（命令处理），答案是单线程
>
> 如果是聊整个Redis，那么答案就是多线程
>
> 在Redis版本迭代过程中，在两个重要的时间节点上引入了多线程的支持：
>
> Redis v4.0：引入多线程异步处理一些耗时较旧的任务，例如异步删除命令unlink
>
> Redis v6.0：在核心网络模型中引入 多线程，进一步提高对于多核CPU的利用率
>
> 因此，对于Redis的核心网络模型，在Redis 6.0之前确实都是单线程。是利用epoll（Linux系统）这样的IO多路复用技术在事件循环中不断处理客户端情况。

> 为什么Redis要选择单线程？
>
> 抛开持久化不谈，Redis是纯内存操作，执行速度非常快，它的性能瓶颈是网络延迟而不是执行速度，因此多线程并不会带来巨大的性能提升。
>
> 多线程会导致过多的上下文切换，带来不必要的开销
>
> 引入多线程会面临线程安全问题，必然要引入线程锁这样的安全手段，实现复杂度增高，而且性能也会大打折扣

> Redis通过IO多路复用来提高网络性能，并且支持各种不同的多路复用实现，并且将这些实现进行封装， 提供了统一的高性能事件库API库 AE：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626204147902.png" alt="image-20230626204147902" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626204222251.png" alt="image-20230626204222251" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626204315282.png" alt="image-20230626204315282" style="zoom:80%;" />

# 通信协议

## RESP协议

> Redis是一个CS架构的软件，通信一般分两步（不包括pipeline和PubSub）：
>
> ①客户端（client）向服务端（server）发送一条命令
>
> ②服务端解析并执行命令，返回响应结果给客户端
>
> 因此客户端发送命令的格式、服务端响应结果的格式必须有一个规范，这个规范就是通信协议。
>
> 而在Redis中采用的是**RESP**（Redis Serialization Protocol）协议：
>
> Redis 1.2版本引入了RESP协议
>
> Redis 2.0版本中成为与Redis服务端通信的标准，称为RESP2
>
> Redis 6.0版本中，从RESP2升级到了RESP3协议，增加了更多数据类型并且支持6.0的新特性--客户端缓存，但目前，默认使用的依然是RESP2协议，也是我们要学习的协议版本（以下简称RESP）。

> 在RESP中，通过首字节的字符来区分不同数据类型，常用的数据类型包括5种：
>
> 单行字符串：首字节是 ‘**+**’ ，后面跟上单行字符串，以CRLF（ "**\r\n**" ）结尾。例如返回"OK"： "+OK\r\n"
>
> 错误（Errors）：首字节是 ‘**-**’ ，与单行字符串格式一样，只是字符串是异常信息，例如："-Error message\r\n"
>
> 数值：首字节是 ‘**:**’ ，后面跟上数字格式的字符串，以CRLF结尾。例如：":10\r\n"
>
> 多行字符串：首字节是 ‘**$**’ ，表示二进制安全的字符串，最大支持512MB：
>
> 如果大小为0，则代表空字符串："$0\r\n\r\n"
>
> 如果大小为-1，则代表不存在："$-1\r\n"
>
> 数组：首字节是 ‘*****’，后面跟上数组元素个数，再跟上元素，元素数据类型不限:

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626204450784.png" alt="image-20230626204450784" style="zoom:80%;" />

## 模拟Redis客户端

> Redis支持TCP通信，因此我们可以使用Socket来模拟客户端，与Redis服务端建立连接：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626204534859.png" alt="image-20230626204534859" style="zoom:80%;" />

> 这里我们以set命令为例，发送请求就是输出下面内容：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626204553971.png" alt="image-20230626204553971" style="zoom:80%;" />

> 响应的结果可能是之前讲的5种数据类型中的任意一种，需要判断后读取：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626204615150.png" alt="image-20230626204615150" style="zoom:80%;" />

> 最终，我们测试发送请求和接收响应：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626204629298.png" alt="image-20230626204629298" style="zoom:80%;" />



# 内存策略⭐

## 内存回收

> Redis之所以性能强，最主要的原因就是基于内存存储。然而单节点的Redis其内存大小不宜过大，会影响持久化或主从同步性能。我们可以通过修改配置文件来设置Redis的最大内存：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626204816741.png" alt="image-20230626204816741" style="zoom:80%;" />

当内存使用达到上限时，就无法存储更多数据了。为了解决这个问题，Redis提供策略实现内存回收：

> 内存过期策略、内存淘汰策略

### 过期策略

> 在学习Redis缓存的时候我们说过，可以通过expire命令给Redis的key设置TTL（存活时间）：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626205118084.png" alt="image-20230626205118084" style="zoom:80%;" />

> 可以发现，当key的TTL到期以后，再次访问name返回的是nil，说明这个key已经不存在了，对应的内存也得到释放。从而起到内存回收的目的。

#### 过期策略-DB结构

> Redis本身是一个典型的key-value内存存储数据库，因此所有的key、value都保存在之前学习过的Dict结构中。不过在其database结构体中，有两个Dict：一个用来记录key-value；另一个用来记录key-TTL。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626211943934.png" alt="image-20230626211943934" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626212002224.png" alt="image-20230626212002224" style="zoom:80%;" />

#### 过期策略-惰性删除

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626212733720.png" alt="image-20230626212733720" style="zoom:80%;" />

#### 过期策略-周期删除

> **周期删除：**顾明思议是通过一个定时任务，周期性的抽样部分过期的key，然后执行删除。

> 执行周期有两种：

> Redis服务初始化函数initServer()中设置定时任务，按照server.hz的频率来执行过期key清理，模式SLOW

> Redis的每个事件循环前会调用beforeSleep()函数，执行过期key清理，模式为FAST

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626212844029.png" alt="image-20230626212844029" style="zoom:80%;" />

> **SLOW**模式规则：
>
> ①执行频率受server.hz影响，默认为10，即每秒执行10次，每个执行周期100ms。
>
> ②执行清理耗时不超过一次执行周期的25%.默认slow模式耗时不超过25ms
>
> ③逐个遍历db，逐个遍历db中的bucket，抽取20个key判断是否过期
>
> ④如果没达到时间上限（25ms）并且过期key比例大于10%，再进行一次抽样，否则结束

> **FAST**模式规则（过期key比例小于10%不执行 ）：
>
> ①执行频率受beforeSleep()调用频率影响，但两次FAST模式间隔不低于2ms
>
> ②执行清理耗时不超过1ms
>
> ③逐个遍历db，逐个遍历db中的bucket，抽取20个key判断是否过期
>
> ④如果没达到时间上限（1ms）并且过期key比例大于10%，再进行一次抽样，否则结束

### 淘汰策略

> **内存淘汰**：就是当Redis内存使用达到设置的上限时，主动挑选**部分key**删除以释放更多内存的流程。Redis会在处理客户端命令的方法processCommand()中尝试做内存淘汰：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626212941985.png" alt="image-20230626212941985" style="zoom:80%;" />

#### 淘汰策略

> Redis支持8种不同策略来选择要删除的key：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626213032921.png" alt="image-20230626213032921" style="zoom:80%;" />

> 比较容易混淆的有两个：

> **LRU**（**L**east **R**ecently **U**sed），最少最近使用。用当前时间减去最后一次访问时间，这个值越大则淘汰优先级越高。

> **LFU**（**L**east **F**requently **U**sed），最少频率使用。会统计每个key的访问频率，值越小淘汰优先级越高。

> Redis的数据都会被封装为RedisObject结构：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626213105880.png" alt="image-20230626213105880" style="zoom:80%;" />

> LFU的访问次数之所以叫做**逻辑访问次数**，是因为并不是每次key被访问都计数，而是通过运算：

> ①生成0~1之间的随机数R
>
> ②计算 (旧次数 * lfu_log_factor + 1)，记录为P
>
> ③如果 R < P ，则计数器 + 1，且最大不超过255
>
> ④访问次数会随时间衰减，距离上一次访问时间每隔 lfu_decay_time 分钟，计数器 -1

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230626213200762.png" alt="image-20230626213200762" style="zoom:80%;" />





















