



# 持久化

> Redis 是内存数据库，数据都是存储在内存中，**为了避免进程退出导致数据的永久丢失，需要定期将 Redis 中的数据以数据或命令的形式从内存保存到本地磁盘**。当下次 Redis 重启时，利用持久化文件进行数据恢复。Redis 提供了 RDB 和 AOF 两种持久化机制，前者将当前的数据保存到磁盘，后者则是将每次执行的写命令保存到磁盘（类似于 MySQL 的 Binlog）。

## RDB 快照持久化

### RDB概述

> RDB全称Redis Database Backup file（Redis数据备份文件），也被叫做Redis数据快照。简单来说就是把内存中的所有数据都记录到磁盘中。当Redis实例故障重启后，从磁盘读取快照文件，恢复数据。

> 快照文件称为RDB文件，默认是保存在当前运行目录。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208101750394.png" alt="image-20220810175048314" style="zoom:67%;" />

快照文件称为RDB文件，默认是保存在当前运行目录。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209141700016.png" alt="image-20220914170026614" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209141812431.png" alt="image-20220914181248310" style="zoom:80%;" />

| 命令     | SAVE               | BGSAVE              |
| :------- | :----------------- | :------------------ |
| IO 类型  | 同步               | 异步                |
| 是否阻塞 | 全程阻塞           | fork 时发生阻塞     |
| 复杂度   | O(n)               | O(n)                |
| 优点     | 不会消耗额外的内存 | 不阻塞客户端        |
| 缺点     | 阻塞客户端         | fork 子进程消耗内存 |

> Redis停机时会自动执行一次RDB，RDB 文件是一个单文件的全量数据，很适合数据的容灾备份与恢复，通过 RDB 文件恢复数据库耗时较短，通常 1G 的快照文件载入内存只需 20s 左右。Redis 提供了手动触发保存、自动保存间隔两种 RDB 文件的生成方式，下面先介绍 RDB 的创建和载入过程。在指定的时间间隔内将内存中的数据集快照写入磁盘， 也就是行话讲的Snapshot快照，它恢复时是将快照文件直接读到内存里。

### RDB配置⭐

#### 核心配置⭐

> Redis 服务器默认是通过 RDB 方式完成持久化的，对应 redis.conf 文件的配置项如下：
>
> 如果要关闭RDB，只需要写成save ""即可

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091311166.png" alt="image-20220609131101090" style="zoom: 80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041003704.png" alt="image-20220504100333644" style="zoom:80%;" />

> 因为 BGSAVE 命令可以在不阻塞服务器进程的情况下执行，所以 Redis 的配置文件 redis.conf 提供了一个 save 选项，让服务器每隔一段时间自动执行一次 BGSAVE 命令。用户可以通过 save 选项设置多个保存条件，只要其中任意一个条件被满足，服务器就会执行 BGSAVE 命令。Redis 配置文件 redis.conf 默认配置了以下 3 个保存条件：
>

那么只要满足以下 3 个条件中的任意一个，BGSAVE 命令就会被自动执行：

> - 服务器在 10 秒之内，对数据库进行了至少 1 次修改则触发RDB。
> - 服务器在 300 秒之内，对数据库进行了至少 10 次修改则触发RDB。
> - 服务器在 60 秒之内，对数据库进行了至少 10000 次修改则触发RDB。

> 比如通过命令 SET msg "hello" 插入一条键值对，等待 10秒后 Reids 服务器进程自动触发保存：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209141822960.png" alt="image-20220914182259862" style="zoom:80%;" />

> Redis 服务器会周期性地操作 serverCron 函数，这个函数每隔 100 毫秒就会执行一次，它的一项任务就是检查 save 选项所设置的保存条件是否满足，如果满足的话，就自动执行 BGSAVE 命令。
>

#### stop-writes-on-bgsave-error

> 当Redis无法写入磁盘的话，直接关掉Redis的写操作。推荐yes。**注意**：如果后台保存过程将再次开始工作，`Redis`将自动允许再次写入。
>

```apl
stop-writes-on-bgsave-error yes
```

当`bgsave`出现错误时，`Redis`是否停止执行写命令；

> - 如果为`yes`，则当硬盘出现问题时，`Redis`将停止接受写入操作，这样我们可以及时发现，避免数据的大量丢失；
> - 如果为`no`，则`Redis`无视`bgsave`的错误继续执行写命令。

> 如果已经设置了对`Redis`服务器的正确监视和持久性，即采用了其他手段发现和控制数据完整性，可能希望禁用此功能，以便即使在磁盘、权限等方面出现问题时，`Redis`仍能正常工作。

#### rdbchecksum检查完整性

> 从`RDB`版本`5`开始，在存储快照后，还可以使用`CRC64`算法来进行数据校验，`CRC64`校验放在文件的末尾。开启之后，保存和加载`RDB`文件时会增加大约`10%`的性能消耗，如果希望获取到最大的性能提升，可以关闭此功能。禁用**校验和**创建的`RDB`文件的校验和为零，这将告诉加载代码跳过检查。
>

```assembly
rdbchecksum yes
```

> 是否开启 RDB 文件的校验，在写入文件和读取文件时都起作用。关闭 checksum 在写入文件和启动文件时大约能带来 10% 的性能提升，但是数据损坏时无法发现。如果希望获取到最大的性能提升，可以关闭此功能推荐yes.
>

### 原理部分

#### 执行时机和bgsave原理

> RDB持久化在执行时机：执行save命令、执行bgsave命令、Redis停机时、触发RDB条件时
>

> bgsave开始时会fork主进程得到子进程，子进程共享主进程的内存数据。完成fork后读取内存数据并写入 RDB 文件。fork采用的是copy-on-write技术：
>

- 当主进程执行读操作时，访问共享内存；
- 当主进程执行写操作时，则会拷贝一份数据，执行写操作。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041007713.png" alt="image-20220504100717626" style="zoom:80%;" />

> RDB方式bgsave的基本流程？
>
> - fork主进程得到一个子进程，共享内存空间
> - 子进程读取内存数据并写入新的RDB文件
> - 用新RDB文件替换旧的RDB文件。

#### 启动自动载入

> 和使用 SAVE 和 BGSAVE 命令创建 RDB 文件不同，Redis 没有专门提供用于载入 RDB 文件的命令，RDB 文件的载入过程是在 Redis 服务器启动时自动完成的。启动时只要在指定目录检测到 RDB 文件的存在，Redis 就会通过 rdbLoad 函数自动载入 RDB 文件。
>

> 下面是 Redis 服务器启动时打印的日志，倒数第 2 条日志是在成功载入 RDB 文件后打印的。
>

```apl
redis-server /etc/redis.conf
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209141823861.png" alt="image-20220914182349758" style="zoom:80%;" />

> 由于 AOF 文件属于增量的写入命令备份，RDB 文件属于全量的数据备份，所以更新频率比 RDB 文件的更新频率高。所以如果 Redis 服务器开启了 AOF 持久化功能，那么服务器会优先使用 AOF 文件来还原数据库状态；只有在 AOF 的持久化功能处于关闭状态时，服务器才使用使用 RDB 文件还原数据库状态
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208101842547.png" alt="image-20220810184213464" style="zoom:67%;" />

#### RDB缺点

> - RDB执行间隔时间长，两次RDB之间写入数据有丢失的风险
> - fork子进程、压缩、写出RDB文件都比较耗时



## AOF 追加文件

### AOF概述

> AOF全称为Append Only File（追加文件）。Redis处理的每一个写命令都会记录在AOF文件，可以看做是命令日志文件，它会把 Redis 服务器每次执行的写命令记录到一个日志文件中，当服务器重启时再次执行 AOF 文件中的命令来恢复数据。

> **当 AOF 持久化功能开启时，Redis 服务器启动时优先执行 AOF 文件的命令恢复数据，只有当 AOF 功能关闭时，才会优先载入 RDB 快照的文件数据**。

> AOF（Append Only File）：AOF 持久化记录服务器接收到的每个写入操作，这些操作将在服务器启动时再次被执行，重建原始数据集。这种持久性的方法能够确保比 RDB 快照更持久，因为它是一个仅附加文件。随着操作的发生，我们将它们缓冲到日志中，但它们还没有被持久化。该日志与我们运行的实际命令一致，以便在需要时进行重放。然后，如果可能，我们使用 fsync 将其刷新到磁盘（当此运行可配置时），它将被持久化。缺点是格式不紧凑，并且比 RDB 文件使用更多的磁盘。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209141826941.png" alt="image-20220914182625847" style="zoom: 80%;" />

> AOF 的主要作用是解决了数据持久化的实时性，目前已经成为了 Redis 持久化的主流方式
>
> AOF和RDB同时开启，系统默认取AOF的数据（数据不会存在丢失）

### 开启和同步频率⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091313570.png" alt="image-20220609131352476" style="zoom:80%;" />

```apl
# 备份RDB和AOF文件存放路径
dir /usr/local/var/db/redis/
```

### 其他配置项⭐

#### AOF文件重写

> 因为是记录命令，AOF文件会比RDB文件大的多。而且AOF会记录对同一个key的多次写操作，但只有最后一次写操作才有意义。通过执行bgrewriteaof命令，可以让AOF文件执行重写功能，用最少的命令达到相同效果。

![image-20210725151729118](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210725151729118.png)

> 如图，AOF原本有三个命令，但是`set num 123 和 set num 666`都是对num的操作，第二次会覆盖第一次的值，因此第一个命令记录下来没有意义。所以重写命令后，AOF文件内容就是：`mset name jack num 666`，Redis也会在触发阈值时自动去重写AOF文件。阈值也可以在redis.conf中配置：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306121452925.png" alt="image-20230612145218817" style="zoom:80%;" />

```properties
# AOF文件比上次文件 增长超过多少百分比则触发重写
auto-aof-rewrite-percentage 100
# AOF文件体积最小多大以上才触发重写，重写触发的最小值：64mb
auto-aof-rewrite-min-size 64mb 
```

> 根据`auto-aof-rewrite-min-size`和`auto-aof-rewrite-percentage`参数确定自动触发时机。`Redis`会记录上次重写时的`AOF`大小，默认配置是当`AOF`文件大小是上次`rewrite`后大小的一倍且文件大于`64M`时触发。大型互联网公司一般都是`3G`起步
>

#### no-appendfsync-on-rewrite no

> 重写 AOF 文件期间是否禁止 fsync 操作。如果开启该选项，可以减轻文件重写时 CPU 和磁盘的负载（尤其是磁盘），但是可能会丢失 AOF 重写期间的数据，需要在负载和安全性之间进行平衡。当我们同时执行主进程的**写操作**和子进程的**重写**操作时，两者都会操作磁盘，而重写往往会涉及到大量的磁盘操作，这样就会造成主进程在写aof文件的时候出现阻塞的情形。为了解决这个问题，no-appendfsync-on-rewrite参数出场了。
>

```apl
no-appendfsync-on-rewrite no
```

> 如果该参数设置为no，是最安全的方式，不会丢失数据，但是要忍受阻塞的问题；

> 如果设置为yes，这就相当于将appendfsync设置为no，这说明并没有执行磁盘操作，只是写入了缓冲区。因此这样并不会造成阻塞（因为没有竞争磁盘），但是如果这个时候redis挂掉，就会丢失数据。丢失多少数据呢？在linux的操作系统的默认设置下，最多会丢失30s的数据。因此，如果应用系统无法忍受延迟，而可以容忍少量的数据丢失，则设置为yes；如果应用系统无法忍受数据丢失，则设置为no

#### aof-load-truncated yes

```apl
aof-load-truncated yes
```

> 当AOF文件被截断时，即AOF文件的最后命令不完整，如果此时启动Redis，会将AOF数据加载回内存，此时便会出现问题。

> - yes：加载一个截断的AOF，Redis服务器开始发出日志，通知用户该事件；
> - no：服务器将中止并出现错误，拒绝启动。

#### aof-use-rdb-preamble yes

```apl
aof-use-rdb-preamble yes
```

> 在重写AOF文件时，Redis能够在AOF文件中使用RDB前导，以加快重写和恢复速度。启用此选项后，重写的AOF文件由两个不同的节组成：RDB file、AOF tail，加载Redis时，会识别AOF文件以**Redis**字符串开头，并加载带前缀的RDB文件，然后继续加载AOF尾部。
>

## RDB 和 AOF 对比

> RDB + AOF：可以将 AOF 和 RDB 组合在同一个 Redis 实例中。如果你愿意的话，可以以速度换取持久化是一种折衷方法。我认为这是设置 Redis 的一种可接受的方式。在重启的情况下，请记住如果两者都启用，Redis 将使用 AOF 来重建数据，因为它是最完整的。
>

> RDB和AOF各有自己的优缺点，如果对数据安全性要求较高，在实际开发中往往会**结合**两者来使用
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220317165237120.png" alt="image-20220317165237120" style="zoom: 80%;" />

> 在实际应用时，因为RDB文件只用作后备用途，建议只在slave上持久化RDB文件，而且只需要15分钟备份一次就够了，只保留`save 900 1`这条规则。

> 如果开启`AOF`，好处是在最恶劣情况下也只会丢失不超过2秒数据，启动脚本较简单只`load`自己的`AOF`文件就可以了。代价一是带来了持续的`IO`，二是`AOF rewrite`的最后将`rewrite`过程中产生的新数据写到新文件造成的阻塞几乎是不可避免的。

> 只要硬盘许可，应该尽量减少`AOF rewrite`的频率，`AOF`重写的基础大小默认值`64M`太小了，可以设置到`5G`以上。默认超过原大小的100%时重写可以改到适当的数值。

> 如果不开启AOF，仅靠Master-Slave Replication实现高可用性也可以。能省掉一大笔IO，也减少了rewrite时带来的系统波动。代价是如果Master/Slave同时倒掉，会丢失十几分钟的数据，启动脚本也要比较两个Master/Slave中的`RDB`文件，载入较新的那个。



## 混合持久化

在重启 Redis 服务器时，一般很少使用 RDB 快照文件来恢复内存状态，因为会丢失大量数据。更多的是使用 AOF 文件进行命令重放，但是执行 AOF 命令性能相对 RDB 来说要慢很多。这样在 Redis 数据很大的情况下，启动需要消耗大量的时间。

鉴于 RDB 快照可能会造成数据丢失，AOF 指令恢复数据慢，Redis 4.0 版本提供了一套基于 AOF-RDB 的混合持久化机制，保留了两种持久化机制的优点。这样重写的 AOF 文件由两部份组成，一部分是 RDB 格式的头部数据，另一部分是 AOF 格式的尾部指令。

Redis 4.0 版本的混合持久化功能默认是关闭的，通过配置 aof-use-rdb-preamble 为 yes 开启此功能：

```apl
# 开启AOF-RDB混合持久化机制
aof-use-rdb-preamble yes
```

查看 Redis 服务器是否开启混合持久化功能：

```apl
config get aof-use-rdb-preamble
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209142040592.png" alt="image-20220914204017476" style="zoom:80%;" />

如图所示，将 RDB 数据文件的内容和增量的 AOF 命令文件存在一起。这里的 AOF 命令不再是全量的命令，而是自持久化开始到持久化结束的这段时间服务器进程执行的增量 AOF 命令，通常这部分 AOF 命令很小。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208102128160.png" alt="image-20220810212821988" style="zoom:67%;" />

在 Redis 服务器重启的时候，可以预先加载 AOF 文件头部全量的 RDB 数据，然后再重放 AOF 文件尾部增量的 AOF 命令



## 数据备份与恢复方案

### 持久化配置

- RBD和AOF建议同时打开（Redis4.0之后支持）
- RDB做冷备，AOF做数据恢复（数据更可靠）
- RDB采取默认配置即可，AOF推荐采取everysec每秒策略

### 数据备份方案

#### 1、需求

我们需要定时备份rdb文件来做冷备，为什么？不是有aof和rbd了吗为什么还要单独写定时任务去备份？因为Redis的aof和rdb是仅仅有一个最新的，比如谁手贱再Redis宕机的时候执行`rm -rf aof/rdb`了，那不就GG了吗？或者rdb/aof文件损坏了等不可预期的情况。所以我们需要单独备份rdb文件以防万一。

为什么不定时备份aof而是rdb？定时备份aof没意义呀，**定时**本身就是冷备份，不是实时的，rdb文件又小恢复又快，她哪里不香？

#### 2、方案

> - 写crontab定时调度脚本去做数据备份。
> - 每小时都copy一份redis的rdb文件到一个其他目录中，这个目录里的rdb文件仅仅保留48小时内的。也就是每小时都做备份，保留2天内的rdb，只保留48个rdb。
> - 每天0点0分copy一份redis的rdb文件到一个其他目录中，这个保留一个月的。也就是按天备份。
> - 每天半夜找个时间将当前服务上的所有rdb备份都上传到云服务上。

#### 3、实现⭐⭐

##### 1、按小时备份

> 每小时copy一次备份，删除48小时前的数据。

```apl
crontab -e
# 每小时都执行/usr/local/redis/copy/redis_rdb_copy_hourly.sh脚本
0 * * * * sh /usr/local/redis/copy/redis_rdb_copy_hourly.sh
```

redis_rdb_copy_hourly.sh脚本的内容如下：

```sh
#!/bin/sh 
# +%Y%m%d%k == 年月日时，显示：2022091712
cur_date=`date +%Y%m%d%k`
rm -rf /usr/local/redis/rdb/$cur_date
mkdir /usr/local/redis/rdb/$cur_date
# 拷贝rdb到目录
cp /var/redis/6379/dump.rdb /usr/local/redis/rdb/$cur_date
# date -d -48hour +%Y%m%d%k == 48小时前的日期，比如今天2020060214，这个结果就是2020053114
del_date=`date -d -48hour +%Y%m%d%k`
# 删除48小时之前的目录
rm -rf /usr/local/redis/rdb/$del_date
```

##### 2、按天备份

> 每天copy一次备份，删除一个月前的数据。

```apl
# 创建定时任务
crontab -e
# 每天0点0分开始执行/usr/local/redis/copy/redis_rdb_copy_daily.sh脚本
0 0 * * * sh /usr/local/redis/copy/redis_rdb_copy_daily.sh
```

```apl
mkdir -p /usr/local/redis/copy/
cd /usr/local/redis/copy/
vim  redis_rdb_copy_daily.sh
```

```sh
# redis_rdb_copy_daily.sh脚本的内容如下：
#!/bin/sh 
# 年月日
cur_date=`date +%Y%m%d`
rm -rf /usr/local/redis/rdb/$cur_date
mkdir /usr/local/redis/rdb/$cur_date
# 拷贝rdb到目录
cp /var/redis/6379/dump.rdb /usr/local/redis/rdb/$cur_date

# 获取一个月前的时间，比如今天是20200602，那么del_date就是20200502
del_date=`date -d -1month +%Y%m%d`
# 删除一个月前的数据
rm -rf /usr/local/redis/rdb/$del_date
```

### 数据恢复方案

#### 1、redis挂了

> 如果仅仅是redis进程挂了，那么直接重启redis进程即可，Redis会按照持久化配置直接基于持久化文件进行恢复数据。如果有AOF则按照AOF，AOF和RDB一起开的话也走AOF。
>

#### 2、持久化文件丢了

如果持久化文件（rdb/aof）损坏了，或者直接丢失了。那么就要采取我们上面所做的rdb备份来进行恢复了。

> 不要脑子一热想着很简单，就以为直接把rdb拖过来重启redis进程就完事了，这种想法有很多问题。慢慢道来。

1、问题

> 问题一：直接把备份的rdb扔到redis持久化目录下然后重启redis不行的原因在于：redis是按照先aof后rdb进行恢复的，所以都是开启aof的，redis启动后会重新生成新的aof文件，里面是空的。所以不会进行任何数据恢复，也就是说虽然你把rdb丢给redis了，但是redis会按照aof来恢复，而aof是redis启动的时候新生成的空文件，所以不会有任何数据进行恢复。
>

> 问题二：那么我们把rdb文件丢给redis后，先将redis的aof关闭再启动redis进程不就能按照rdb来进行恢复了吗？是这样的，没毛病！但是新的问题来了，我们aof肯定要开的，aof对数据保障更可靠。那什么我们按照rdb文件恢复完后再修改redis配置文件开启aof然后重启redis进程不就得了嘛？大哥…你打开aof然后重启redis，这时候redis又会生成一个空的aof文件，这时候恢复的时候又是啥数据都没了。
>

> 因为数据是存到内存里，你重启后肯定没了，需要持久化文件来恢复。这时候aof是空的，我恢复个鸡毛啊。

#### 3、具体方案

> 可能有人想到方案了，但是耐心看完，看看我的文采如何。

我不管你是持久化文件丢了还是坏了，我都先`rm -rf *` 给他删了。

- 停止redis进程
- 删除坏掉的rdb和aof持久化文件。
- 修改配置文件关闭redis的aof持久化。
- 找到最新备份的rdb文件扔到redis的持久化目录里。（这里最新的肯定是按照小时备份的最后一个）
- 启动Redis进程
- 执行`set appendonly yes`动态打开aof持久化。

> 也就是说打开aof的操作不是修改配置文件然后重启，而是先热修改让他生成aof，这次生成肯定是会带着内存中完整的数据的。然后再修改配置文件重启。

- 等aof文件生成后再修改redis配置文件打开aof。
- 重启redis进程。
- 完美收官。



# 主从复制

## 主从复制概述

### 单点Redis问题

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306121436559.png" alt="image-20230612143455286" style="zoom:80%;" />

> - **数据丢失问题**：`Redis是内存存储`，`服务重启可能会丢失数据`
>
> - **并发能力问题**：`单节点Redis并发能力虽然不错，但也无法满足如618这样的高并发场景`
>
> - **故障恢复问题**：`如果Redis宕机，则服务不可用，需要一种自动的故障恢复手段`
>
> - **存储能力问题**：`Redis基于内存，单节点能存储的数据量难以满足海量数据需求`

### 主从复制优点

> 单节点Redis的并发能力是有上限的，要进一步提高Redis的并发能力，就需要主从集群，实现读写分离

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209142112213.png" alt="image-20220914211201108" style="zoom:80%;" />

> - **读写分离**：master写、slave读，提高服务器的读写负载能力 
> - **负载均衡**：基于主从结构，配合读写分离，由slave分担master负载
> - **故障恢复**：当master出现问题时，由slave提供服务，实现快速的故障恢复 
> - **数据冗余**：实现数据热备份，是持久化之外的一种数据冗余方式 
> - **高可用基石**：基于主从复制，构建哨兵模式与集群，实现Redis的高可用方案

## 一主两从搭建

> 在一台虚拟机开启3个实例，必须准备三份不同的配置文件和目录，配置文件所在目录也就是工作目录
>

### 1）创建目录

我们创建三个文件夹，名字分别叫7001、7002、7003：

```sh
# 进入/tmp目录
cd /tmp
# 创建目录
mkdir 7001 7002 7003
```

### 2）关闭AOF，启用RDB(可选)

```apl
vi /etc/redis.conf
dbfilename dump.rdb
dir /myredis/storage
# 开启RDB
# save ""
save 3600 1
save 300 100
save 60 10000

# 关闭AOF
appendonly no
```

### 3）拷贝配置文件到实例目录

然后将redis-6.2.4/redis.conf文件拷贝到三个目录中（在/tmp目录执行下列命令）：

```sh
# 方式一：逐个拷贝
cp /etc/redis.conf 7001
cp /etc/redis.conf 7002
cp /etc/redis.conf 7003

# 方式二：管道组合命令，一键拷贝
echo 7001 7002 7003 | xargs -t -n 1 cp /etc/redis.conf
```

### 4）修改每个端口、工作目录

> 修改每个文件夹内的配置文件，将端口分别修改为7001、7002、7003，将rdb文件保存位置都修改为自己所在目录（在/tmp目录执行下列命令）：
>

```sh
# sed快速修改文档，路径7001/redis.conf，s表示替换,g表示全局6379全部替换
sed -i -e 's/6379/7001/g' -e 's/dir .\//dir \/tmp\/7001\//g' 7001/redis.conf
sed -i -e 's/6379/7002/g' -e 's/dir .\//dir \/tmp\/7002\//g' 7002/redis.conf
sed -i -e 's/6379/7003/g' -e 's/dir .\//dir \/tmp\/7003\//g' 7003/redis.conf
```

### 5）修改每个实例的声明IP

> 虚拟机本身有多个IP，为了避免将来混乱，我们需要在redis.conf文件中指定每一个实例的绑定ip信息
>

```properties
# redis实例的声明 IP(直接在配置文件中写这条命令也行 )
replica-announce-ip 192.168.22.130
```

> 每个目录都要改，我们一键完成修改（在/tmp目录执行下列命令）：
>

```sh
# 逐一执行，1a表示在第一行追加一行内容
sed -i '1a replica-announce-ip 192.168.22.130' 7001/redis.conf
sed -i '1a replica-announce-ip 192.168.22.130' 7002/redis.conf
sed -i '1a replica-announce-ip 192.168.22.130' 7003/redis.conf

# 或者一键修改
printf '%s\n' 7001 7002 7003 | xargs -I{} -t sed -i '1a replica-announce-ip 192.168.22.130' {}/redis.conf
```

### 6）开启主从连接

```apl
redis-server /tmp/7001/redis.conf
redis-server /tmp/7002/redis.conf
redis-server /tmp/7003/redis.conf
```

开启主节点

```apl
redis-cli -p 7001
```

开启两个从节点连接主节点

```apl
# 开启7002
redis-cli -p 7002
# 执行slaveof
slaveof 192.168.22.130 7001
# 开启7003
redis-cli -p 7003
# 执行slaveof
slaveof 192.168.22.130 7001
```

进入7001查看连接是否成功

```apl
info replication
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041137099.png" alt="image-20220504113756968" style="zoom:67%;" />

### 7）测试使用

执行下列操作以测试：

- 利用redis-cli连接7001，执行```set num 123```

- 利用redis-cli连接7002，执行```get num```，再执行```set num 666```

- 利用redis-cli连接7003，执行```get num```，再执行```set num 888```

可以发现，只有在7001这个master节点上可以执行写操作，7002和7003这两个slave节点只能执行读操作。

## 主从同步优化

主从同步可以保证主从数据的一致性，非常重要。可以从以下几个方面来优化Redis主从集群：

> - 在master中配置repl-diskless-sync yes启用无磁盘复制，避免全量同步时的磁盘IO。
> - Redis单节点上的内存占用不要太大，减少RDB导致的过多磁盘IO
> - 适当提高repl_baklog的大小，发现slave宕机时尽快实现故障恢复，尽可能避免全量同步
> - 限制一个master上的slave节点数量，如果实在是太多slave，则可以采用**主-从-从**链式结构

![image-20210725154405899](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210725154405899.png)



## 哨兵模式⭐

### 哨兵的结构和作用

> Sentinel 是一个分布式系统。与所有分布式系统一样，Sentinel 有几个优点和缺点。Sentinel 的设计方式是，**一组哨兵进程协同工作以协调状态，从而为 Redis 提供高可用性**。毕竟，你不希望保护你免受故障影响的系统有自己的单点故障。
>

> Sentinel 负责一些事情。首先，它确保当前的主实例和从实例正常运行并做出响应。这是必要的，因为哨兵（与其他哨兵进程）可以在主节点和/或从节点丢失的情况下发出警报并采取行动。其次，它在服务发现中发挥作用，就像其他系统中的 Zookeeper 和 Consul 一样。所以当一个新的客户端尝试向 Redis 写东西时，Sentinel 会告诉客户端当前的主实例是什么。因此，哨兵不断监控可用性并将该信息发送给客户端，以便他们能够在他们确实进行故障转移时对其做出反应。

> - **监控**：Sentinel 会不断检查您的master和slave是否按预期工作
> - **配置管理**——Sentinel 节点还充当当前主 Redis 实例的发现服务。
> - **自动故障恢复**：如果master故障，Sentinel会将一个slave提升为master。
> - **通知**：Sentinel充当Redis客户端的服务发现，故障转移时，会将最新信息推送给Redis的客户端

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041042508.png" alt="image-20220504104258420" style="zoom: 80%;" />

### 搭建哨兵集群⭐

这里我们搭建一个三节点形成的Sentinel集群，来监管之前的Redis主从集群。如图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041300241.png" alt="image-20220504130043145" style="zoom: 50%;" />

三个sentinel实例信息如下：

| 节点 |       IP       | PORT  |
| ---- | :------------: | :---: |
| s1   | 192.168.22.130 | 27001 |
| s2   | 192.168.22.130 | 27002 |
| s3   | 192.168.22.130 | 27003 |

#### 准备实例和配置

> 要在同一台虚拟机开启3个实例，必须准备三份不同的配置文件和目录，配置文件所在目录也就是工作目录。我们创建三个文件夹，名字分别叫s1、s2、s3：
>

```sh
# 进入/tmp目录
cd /tmp
# 创建目录
mkdir s1 s2 s3
```

> 然后我们在s1目录创建一个sentinel.conf文件，添加下面的内容：
>

```apl
# 当前sentinel实例的端口
port 27001
# sentinel实例的IP地址
sentinel announce-ip 192.168.22.130
# mymaster主节点名称，自定义，主节点IP，端口号
# 2选举master时的quorum值，表示一半以上，超过它则进行选取，因为现在有3台，所以设置2
sentinel monitor mymaster 192.168.22.130 7001 2
# slave和master的超时时间
sentinel down-after-milliseconds mymaster 5000
# slave故障恢复的超时时间
sentinel failover-timeout mymaster 60000
# 工作目录
dir "/tmp/s1"
```

> 然后将s1/sentinel.conf文件拷贝到s2、s3两个目录中（在/tmp目录执行下列命令）：
>

```sh
# 方式一：逐个拷贝
cp s1/sentinel.conf s2
cp s1/sentinel.conf s3
# 方式二：管道组合命令，一键拷贝
echo s2 s3 | xargs -t -n 1 cp s1/sentinel.conf
```

> 只需要改端口和目录，修改s2、s3两个文件夹内的配置文件，将端口分别修改为27002、27003：
>

```sh
sed -i -e 's/27001/27002/g' -e 's/s1/s2/g' s2/sentinel.conf
sed -i -e 's/27001/27003/g' -e 's/s1/s3/g' s3/sentinel.conf
```

#### 启动哨兵集群

为了方便查看日志，我们打开3个ssh窗口，分别启动3个redis实例，启动命令：

```apl
# 第1个
redis-sentinel s1/sentinel.conf
# 第2个
redis-sentinel s2/sentinel.conf
# 第3个
redis-sentinel s3/sentinel.conf
```

启动后：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041301993.png" alt="image-20210701220714104" style="zoom:80%;" />

#### 测试哨兵集群

> 尝试让master节点7001宕机，查看sentinel日志：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041301998.png" alt="image-20210701222857997" style="zoom:80%;" />

> 查看7003的日志：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041301997.png" alt="image-20210701223025709" style="zoom:67%;" />

> 查看7002的日志：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041301999.png" alt="image-20210701223131264" style="zoom:67%;" />

### 哨兵工作原理

#### 服务状态监控

> 判断Redis实例是否健康：Sentinel基于**心跳机制监测**服务状态，每秒向集群的每个实例发ping命令

> - 主观下线：如果某sentinel节点发现某实例**未在规定时间响应**，则认为该实例**主观下线**。
>
> - 客观下线：**若超过指定数量（quorum）的sentinel都认为该实例主观下线**，则该实例**客观下线**。quorum值最好超过Sentinel实例数量的一半

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041043780.png" alt="image-20220504104346706" style="zoom:67%;" />

#### 选举新的master

一旦发现master故障，sentinel需要在salve中选择一个作为新的master，选择依据是这样的

> - 首先会判断slave节点与master节点断开时间长短，如果超过指定值（down-after-milliseconds * 10）则会排除该slave节点
> - 然后判断slave节点的slave-priority值，越小优先级越高，如果是0则永不参与选举
> - 如果slave-prority一样，则判断slave节点的offset值，越大说明数据越新，优先级越高
> - 最后是判断slave节点的运行id大小，越小优先级越高。

#### 如何实现故障转移

当选中了其中一个slave为新的master后（例如slave1），故障的转移的步骤如下：

> - sentinel给备选的slave1节点发送slaveof no one命令，让该节点成为master
> - sentinel给所有其它slave发送slaveof 192.168.150.101 7002 命令，让这些slave成为新master的从节点，开始从新的master上同步数据。
> - 最后，sentinel将故障节点标记为slave，当故障节点恢复后会自动成为新的master的slave节点

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041250007.png" alt="image-20220504125057925" style="zoom:67%;" />

## 主从复制原理

### 全量同步

> 用于初次复制或其它无法进行部分复制的情况，将主节点中的所有数据都发送给从节点。当数据量过大的时候，会造成很大的网络开销。

什么时候执行全量同步？

> - slave节点第一次连接master节点时
> - slave节点断开时间太久，repl_baklog中的offset已经被覆盖时

简述全量同步的流程？

> - slave节点请求增量同步
> - master节点判断replid，发现不一致，拒绝增量同步
> - master将完整内存数据生成RDB，发送RDB到slave
> - slave清空本地数据，加载master的RDB
> - master将RDB期间的命令记录在repl_baklog，并持续将log中的命令发送给slave
> - slave执行接收到的命令，保持与master之间的同步

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209142125105.png" alt="image-20220914212506004" style="zoom:80%;" />

> master如何判断slave是不是第一次来同步数据？这里会用到两个很重要的概念：
>

> **Replication Id**：简称replid，是数据集的标记，id一致则说明是同一数据集。每一个master都有唯一的replid，slave则会继承master节点的replid

> **offset**：偏移量，随着记录在repl_baklog中的数据增多而逐渐增大。slave完成同步时也会记录当前同步的offset。如果slave的offset小于master的offset，说明slave数据落后于master，需要更新。因此slave做数据同步，必须向master声明自己的replication id 和offset，master才可以判断到底需要同步哪些数据

### 增量同步

> 用于处理在主从复制中因网络闪退等原因造成数据丢失场景，当从节点再次连上主节点，如果条件允许，主节点会补发丢失数据给从节点，因为补发的数据远远小于全量数据，可以有效避免全量复制的过高开销。但需要注意，如果网络中断时间过长，造成主节点没有能够完整地保存中断期间执行的写命令，则无法进行部分复制，仍使用全量复制。

> 主从第一次同步是**全量同步**，但如果slave重启后同步，则执行**增量同步**
>

> 什么时候执行增量同步？slave节点断开又恢复，并且在repl_baklog中能找到offset时
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041245051.png" alt="image-20220504124526950" style="zoom:67%;" />

> 注意：repl_baklog大小有上限，写满后会覆盖最早的数据。如果slave断开时间过久，导致尚未备份的数据被覆盖，则无法基于log做增量同步，只能再次全量同步。

简述全量同步和增量同步区别？

> 全量同步：master将完整内存数据生成RDB，发RDB到slave。后续命令记录repl_baklog，逐个发给slave
>
> 增量同步：slave提交自己的offset到master，master获取repl_baklog中从offset之后的命令给slave

什么时候执行全量同步？

> **slave节点第一次连接master节点时**
>
> **slave节点断开时间太久，repl_baklog中的offset已经被覆盖时**

什么时候执行增量同步？

> **slave节点断开又恢复，并且在repl_baklog中能找到offset时**

### 脑裂问题

> 脑裂是指因为网络原因，导致master节点、slave节点 和 sentinel集群`处于不同的网络分区`，此时因为sentinel集群**无法感知**到master的存在，所以将slave节点提升为master节点 此时存在两个不同的master节点就像一个大脑分裂成了两个。其实在`Hadoop` 、`Spark`集群中都会出现这样的情况，只是解决方法不同而已(用ZK配合强制杀死)。

> 集群脑裂问题中，如果客户端还在基于原来的master节点继续写入数据那么新的master节点将无法同步这些数据，当网络问题解决后sentinel集群将原先的master节点降为slave节点，此时再从新的master中同步数据将造成大量的数据丢失。Redis处理方案是redis的配置文件中存在两个参数
>

```apl
min-replicas-to-write 3  # 表示连接到master的最少slave数量
min-replicas-max-lag 10  # 表示slave连接到master的最大延迟时间
```

> 如果连接到master的slave数量 < 第一个参数 且 ping的延迟时间 <= 第二个参数那么master就会拒绝写请求，配置了这两个参数后如果发生了集群脑裂则原先的master节点接收到客户端的写入请求会拒绝就可以减少数据同步之后的数据丢失。



# 分片集群

## 集群概述

### 为什么需要集群

主从和哨兵可以解决高可用、高并发读的问题。但是依然有两个问题没有解决：

> **海量数据存储问题、高并发写的问题**

使用分片集群可以解决上述问题，分片集群特征：

> **高可用性：** Redis 在集群模式下每个 Master 都是主从复制模式，其 Master 节点上的数据会实时同步到 Slave 节点上，当 Master 节点不可用时，对应的 Slave 节点身份会更改为 Master 节点，保证集群可用性

> **数据横向扩展：** Redis 是一个内存数据库，所有数据都存在内存中，在单节点中所在服务器能给与的内存是有一定限制。当数据量达到一定程度后，内存将不足以支撑这么多的数据存储，这时候需要将数据进行分片存储，而 Redis 集群模式就是将数据分片存储，非常方便横向扩展。

> - 集群中有多个master，每个master保存不同数据，分摊压力
> - 每个master都可以有多个slave节点，实现扩容，无中心配置相对简单
> - master之间通过ping监测彼此健康状态
> - 客户端请求可以访问集群任意节点，最终都会被转发到正确节点

### 集群带来的问题

> - 多键操作是不被支持的 
>
> - 多键的Redis事务是不被支持的。lua脚本不被支持
>
> - 由于集群方案出现较晚，很多公司已经采用了其他的集群方案，而代理或者客户端分片的方案想要迁移至redis cluster，需要整体迁移而不是逐步过渡，复杂度较大。
>
> - 复制结构只支持单层结构，不支持树型结构。
> - 不支持多数据库，只能使用 0 数据库，执行 select 0 命令；
> - 键是数据分区的最小粒度，不能将一个很大的键值对映射到不同的节点；
> - 键事务支持有限，当多个键分布在不同节点时无法使用事务，同一节点才能支持事务；
> - 键的批量操作支持有限，比如 mset, mget 命令，如果多个键映射在不同的槽中，就不能正常用了

## 主要概念

### 集群的数据分片

Redis 集群没有使用一致性 Hash, 而是引入了”哈希槽”的概念。Redis 集群有 16384 个哈希槽，每个 key 通过 CRC16 校验后对 16384 取模来决定放置哪个槽，集群的每个节点负责一部分 hash 槽。

举个例子，比如当前集群有3个节点，那么:

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208082201832.png" alt="image-20220808220103736" style="zoom:67%;" />

- 节点 A 包含 0 到 5460 号哈希槽；
- 节点 B 包含 5461 到 10922 号哈希槽；
- 节点 C 包含 10923 到 16383 号哈希槽；

这种结构很容易”添加”或者”删除”节点. 比如如果我想新添加个节点 D，我需要从节点 A, B, C 中得部分槽转移到节点 D 上， 如果我想移除节点 A，则需要将 A 中的槽移到 B 和 C 节点上，然后将没有任何槽的 A 节点从集群中移除即可。由于从一个节点将哈希槽移动到另一个节点并不会停止服务，所以无论添加删除或者改变某个节点的哈希槽的数量都不会造成集群不可用的状态。

Redis 支持多个 key 操作，只要这些 key 在一个单个命令中执行（或者一个事务，或者 Lua 脚本执行），那么它们就属于相同的 Hash 槽。你也可以用 hash tags 命令强制多个 key 都在相同的 hash 槽中。

一个 Redis 集群包含 16384 个插槽（hash slot）， 数据库中的每个键都属于这 16384 个插槽的其中一个， 

集群使用公式 CRC16(key) % 16384 来计算键 key 属于哪个槽， 其中 CRC16(key) 语句用于计算键 key 的 CRC16 校验和 

集群中的每个节点负责处理一部分插槽。 举个例子， 如果一个集群可以有主节点， 其中：

### 如何分配这六个节点

一个集群至少要有三个主节点。

选项 --cluster-replicas 1 表示我们希望为集群中的每个主节点创建一个从节点。

分配原则尽量保证每个主数据库运行在不同的IP地址，每个从库和主库不在一个IP地址上。

### 集群间通信机制

在 Redis 集群中，数据节点提供两个 TCP 端口，在配置防火墙时需要同时开启下面两类端口：

- **普通端口：** 即客户端访问端口，如默认的 6379；
- **集群端口：** 普通端口号加 10000，如 6379 的集群端口为 16379，用于集群节点之间的通讯；

集群的节点之间通讯采用 Gossip 协议，节点根据固定频率(每秒10次)定时任务进行判断，当集群状态发生变化，如增删节点、槽状态变更时，会通过节点间通讯同步集群状态，使集群收敛。集群间发送的 Gossip 消息有下面五种消息类型：

- **MEET：** 在节点握手阶段，对新加入的节点发送 meet 消息，请求新节点加入当前集群，新节点收到消息会回复 pong 消息；
- **PING：** 节点之间互相发送 ping 消息，收到消息的会回复 pong 消息。ping 消息内容包含本节点和其他节点的状态信息，以此达到状态同步；
- **PONG：** pong 消息包含自身的状态数据，在接收到 ping 或 meet 消息时会回复 pong 消息，也会主动向集群广播 pong 消息；
- **FAIL：** 当一个主节点判断另一个主节点进入 fail 状态时，会向集群广播这个消息，接收到的节点会保存该消息并对该 fail 节点做状态判断；
- **PUBLISH：** 当节点收到 publish 命令时，会先执行命令，然后向集群广播 publish 消息，接收到消息的节点也会执行 publish 命令；

### 集群失败状态

在 Redis 集群模式下也不可能百分百保证集群可用性，当发生不可预知的事件导致 Redis 集群将进入失败状态，在这种状态下 Redis 集群将不能正常提供服务。其中进入失败状态的条件主要为：

- ① 全部节点都宕机，集群将进入 fail 状态；
- ② 半数以上主节点不可用，集群将进入 fail 状态；
- ③ 任意主节点挂掉，且该主节点没有对应的从节点或者从节点也全部挂掉，集群将进入 fail 状态；

### 集群重新分片机制

Redis 集群重新分片（新增/移除节点）机制：

- 新增节点：别的节点上的槽分一些出来给新的节点
- 删除节点：删除节点的槽分给别的节点

但这些操作是需要手动完成的，可以在不停止服务器的情况下执行。

## 搭建分片集群

这里我们会在同一台虚拟机中开启6个redis实例，模拟分片集群，信息如下：

|       IP       | PORT |  角色  |
| :------------: | :--: | :----: |
| 192.168.22.145 | 7001 | master |
| 192.168.22.145 | 7002 | master |
| 192.168.22.145 | 7003 | master |
| 192.168.22.145 | 8001 | slave  |
| 192.168.22.145 | 8002 | slave  |
| 192.168.22.145 | 8003 | slave  |

### 准备实例和配置

删除之前的7001、7002、7003这几个目录，重新创建出7001、7002、7003、8001、8002、8003目录：

```sh
# 进入/tmp目录
cd /tmp
# 删除旧的，避免配置干扰
rm -rf 7001 7002 7003
# 创建目录
mkdir 7001 7002 7003 8001 8002 8003
```

在/tmp下准备一个新的redis.conf文件，内容如下：

```apl
vi /tmp/redis.conf
```

```ini
port 6379
# 开启集群功能
cluster-enabled yes
# 集群的配置文件名称，不需要我们创建，由redis自己维护，我们只能指定其存储的位置
cluster-config-file /tmp/6379/nodes.conf
# 设置Redis群集节点的通信的超时时间；节点心跳失败的超时时间
cluster-node-timeout 5000
# 持久化文件存放目录
dir /tmp/6379
# 绑定地址
bind 0.0.0.0
# 让redis后台运行
daemonize yes
# 注册的实例ip
replica-announce-ip 192.168.22.145
# 保护模式
protected-mode no
# 数据库数量
databases 1
# 日志
logfile /tmp/6379/run.log
# 主节点需要的最小从节点数，只有达到这个数，主节点失败时，它从节点才会进行迁移
cluster-migration-barrier 1
# 0：则无论从节点与主节点失联多久，从节点都会尝试升级成主节点。
# 正数：则 cluster-node-timeout、cluster-slave-validity-factor得到的时间，是从节点与主节点失联后，此从节点数据有效的最长时间，超过这个时间，从节点不会启动故障迁移。假设cluster-node-timeout=5，cluster-slave-validity-factor=10，则如果从节点跟主节点失联超过50秒，此从节点不能成为主节点。
cluster-replica-validity-factor 10
# 设置集群可用性
# yes：表示当负责一个插槽的主库下线，且没有相应的从库进行故障恢复时，集群不可用
# no：表示当负责一个插槽的主库下线且没有相应的从库进行故障恢复时，集群仍然可用
cluster-require-full-coverage yes
```

将这个文件拷贝到每个目录下：

```sh
# 进入/tmp目录
cd /tmp
# 执行拷贝
echo 7001 7002 7003 8001 8002 8003 | xargs -t -n 1 cp redis.conf
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209171200274.png" alt="image-20220917120025086" style="zoom:80%;" />

修改每个目录下的redis.conf，将其中的6379修改为与所在目录一致：

```sh
# 进入/tmp目录
cd /tmp
# 修改配置文件
printf '%s\n' 7001 7002 7003 8001 8002 8003 | xargs -I{} -t sed -i 's/6379/{}/g' {}/redis.conf
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209171200300.png" alt="image-20220917120058104" style="zoom:80%;" />

### 启动每个节点

因为已经配置了后台启动模式，所以可以直接启动服务：

```sh
# 进入/tmp目录
cd /tmp
# 一键启动所有服务
printf '%s\n' 7001 7002 7003 8001 8002 8003 | xargs -I{} -t redis-server {}/redis.conf
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209171201425.png" alt="image-20220917120137266" style="zoom:80%;" />

通过ps查看状态：

```sh
ps -ef | grep redis
```

发现服务都已经正常启动：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041412850.png" alt="image-20220504141231750" style="zoom:80%;" />

### 关闭节点(可选)

如果要关闭所有进程，可以执行命令：

```sh
ps -ef | grep redis | awk '{print $2}' | xargs kill
```

或者（推荐这种方式）：

```sh
printf '%s\n' 7001 7002 7003 8001 8002 8003 | xargs -I{} -t redis-cli -p {} shutdown
```

### 创建集群

> 虽然服务启动了，但是目前每个服务之间都是独立的，没有任何关联。我们需要执行命令来创建集群，在Redis5.0之前创建集群比较麻烦，5.0之后集群管理命令都集成到了redis-cli中。
>

> 1）Redis5.0之前：Redis5.0之前集群命令都是用redis安装包下的src/redis-trib.rb来实现的。因为redis-trib.rb是有ruby语言编写的所以需要安装ruby环境。

 ```apl
# 安装依赖
yum -y install zlib ruby rubygems
gem install redis
 ```

然后通过命令来管理集群：

```apl
# 进入redis的src目录
cd /tmp/redis-6.2.4/src
# 创建集群
./redis-trib.rb create --replicas 1 192.168.150.101:7001 192.168.150.101:7002 192.168.150.101:7003 192.168.150.101:8001 192.168.150.101:8002 192.168.150.101:8003
```

> 2）Redis5.0以后：我们使用的是Redis6.2.4版本，集群管理以及集成到了redis-cli中，格式如下：

```sh
redis-cli --cluster create --cluster-replicas 1 192.168.22.145:7001 192.168.22.145:7002 192.168.22.145:7003 192.168.22.145:8001 192.168.22.145:8002 192.168.22.145:8003
```

- `redis-cli --cluster`或者`./redis-trib.rb`：代表集群操作命令
- `create`：代表是创建集群
- `--replicas 1`或者`--cluster-replicas 1` ：指定集群中每个master的副本个数为1，此时`节点总数 ÷ (replicas + 1)` 得到的就是master的数量。因此节点列表中的前n个就是master，其它节点都是slave节点，随机分配到不同master

运行后输入yes，则集群开始创建：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209171204906.png" alt="image-20220917120436756" style="zoom:80%;" />

### 查看集群状态

```sh
redis-cli -p 7001 cluster nodes
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209171205770.png" alt="image-20220917120545589" style="zoom:80%;" />

### 测试集群

尝试连接7001节点，存储一个数据：

集群操作时，需要给`redis-cli`加上`-c`参数才可以：

```sh
# 连接
redis-cli -c -p 7001
# 存储数据
set num 123
# 读取数据
get num
# 再次存储
set a 1
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041414141.png" alt="image-20220504141453038" style="zoom:80%;" />

> 在redis-cli每次录入、查询键值，redis都会计算出该key应该送往的插槽，如果不是该客户端对应服务器的插槽，redis会报错，并告知应前往的redis实例地址和端口。redis-cli客户端提供了 –c 参数实现自动重定向
>

## 散列插槽

> Redis会把每一个master节点映射到0~16383共16384个插槽（hash slot）上，查看集群信息时就能看到：

```apl
redis-cli -p 7001 cluster nodes
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041418044.png" alt="image-20220504141851954" style="zoom:67%;" />

数据key不是与节点绑定，而是与插槽绑定。redis会根据key的有效部分计算插槽值，分两种情况：

> - key中包含"{}"，且“{}”中至少包含1个字符，“{}”中的部分是有效部分
> - key中不包含“{}”，整个key都是有效部分

> 例如：key是num，那么就根据num计算，如果是{itcast}num，则根据itcast计算。计算方式是利用CRC16算法得到一个hash值，然后对16384取余，得到的结果就是slot值。
>

```apl
redis-cli -c -p 7001
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041419935.png" alt="image-20220504141925861" style="zoom:80%;" />

Redis如何判断某个key应该在哪个实例？

> - 将16384个插槽分配到不同的实例
> - **根据key的有效部分计算哈希值，对16384取余**
> - **余数作为插槽，寻找插槽所在实例即可**

```apl
redis-cli -c -p 7001
set a 101
set b 102
set c 103
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041434868.png" alt="image-20220504143433750" style="zoom:80%;" />

> 如何将同一类数据固定的保存在同一个Redis实例？这一类数据使用相同的有效部分，例如key都以{typeId}为前缀(这样这些数据就会存在一个redis机器中了)，不在一个slot下的键值，是不能使用mget,mset等多键操作。
>

```apl
set {a}num1 111
set {a}qum1 113
```

> 可以通过{}来定义组的概念，从而使key中{}内相同内容的键值对放到一个slot中去

```assembly
mset k1{c1} v1 k2{c1} v2
mget k1{c1} k2{c1}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209171211147.png" alt="image-20220917121118995" style="zoom:80%;" />

## 集群伸缩

> redis-cli --cluster提供了很多操作集群的命令，可以通过下面方式查看：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041420336.png" alt="image-20220504142021243" style="zoom:80%;" />

> 比如，添加节点的命令：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041420338.png" alt="image-20220504142039268" style="zoom:80%;" />

### 新增节点

> 主要问题：插槽分配问题
>

向集群中添加一个新的master节点，并向其中存储 num = 10

> - 启动一个新的redis实例，端口为7004
> - 添加7004到之前的集群，并作为一个master节点
> - 给7004节点分配插槽，使得num这个key可以存储到7004实例

```apl
# 仿照上面进行新增
cd /tmp
mkdir 7004
echo 7004  | xargs -t -n 1 cp redis.conf
printf '%s\n' 7004 | xargs -I{} -t sed -i 's/6379/{}/g' {}/redis.conf
printf '%s\n' 7004  | xargs -I{} -t redis-server {}/redis.conf
ps -ef | grep redis
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041446488.png" alt="image-20220504144600383" style="zoom:80%;" />

```apl
# 7004是新增节点，7001是随便在集群中存在的一个节点
redis-cli --cluster add-node 192.168.22.145:7004 192.168.22.145:7001
```

```apl
redis-cli -p 7001 cluster nodes
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041447722.png" alt="image-20220504144721566" style="zoom:80%;" />

以上可以发现7004没有插槽

```apl
# 查看num所在插槽
get num
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041448590.png" alt="image-20220504144832494" style="zoom:80%;" />

进行重新分片：从7001里拿取分片

我们可以将0~3000的插槽从7001转移到7004，命令格式如下：

```apl
redis-cli --cluster reshard 192.168.22.145:7001
```

得到下面的反馈

询问要移动多少个插槽，我们计划是3000个：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041502999.png" alt="image-20210725161540841" style="zoom:67%;" />

新的问题来了：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041502000.png" alt="image-20210725161637152" style="zoom:67%;" />

那个node来接收这些插槽？？

显然是7004，那么7004节点的id是多少呢？上面给的显示7004ID

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041502008.png" alt="image-20210725161731738" style="zoom:67%;" />

复制这个id，然后拷贝到刚才的控制台后：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041502009.png" alt="image-20210725161817642" style="zoom:67%;" />

这里询问，你的插槽是从哪里移动过来的？

- all：代表全部，也就是三个节点各转移一部分
- 具体的id：目标节点的id
- done：没有了

这里我们要从7001获取，因此填写7001的id：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041502492.png" alt="image-20210725162030478" style="zoom:67%;" />

填完后，点击done，这样插槽转移就准备好了：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041502508.png" alt="image-20210725162101228" style="zoom:67%;" />

确认要转移吗？输入yes：

然后，通过命令查看结果：

```apl
# 可以发现0-2999被分到7004
redis-cli -p 7001 cluster nodes
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041453129.png" alt="image-20220504145334966" style="zoom:80%;" />

目的达成



### 删除节点

删除集群中的一个节点

需求：删除7004这个实例

首先将7004插槽还给7001(任何节点都行)

```apl
redis-cli --cluster reshard 192.168.22.145:7004
```

> 3000表示7004的插槽数量，7001ID表示7001接收插槽，

依次输入3000、7001ID、7004ID、done、yes，即可完成分配

```apl
redis-cli -p 7001 cluster nodes
```

可以看到7004没插槽了

```apl
redis-cli -p 7001 cluster nodes
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041512033.png" alt="image-20220504151235853" style="zoom:80%;" />

```apl
# 删除7004节点，最后一个是7004的ID
redis-cli --cluster  del-node 192.168.22.145:7004 f0141dd210196a82a7e8d38203f589286214436c
```

再次查看7004删除完成

```apl
redis-cli -p 7001 cluster nodes
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041514457.png" alt="image-20220504151426289" style="zoom:80%;" />



## 故障转移

> 如果主节点下线？从节点能否自动升为主节点？注意：**15**秒超时，主节点恢复后，主从关系会如何？**主节点回来变成从机**，如果所有某一段插槽的主从节点都宕掉，redis服务是否还能继续?
>

> 如果某一段插槽的主从都挂掉，而cluster-require-full-coverage 为yes ，那么 ，整个集群都挂掉
>
> 如果某一段插槽的主从都挂掉，而cluster-require-full-coverage 为no ，那么，该插槽数据全都不能使用，也无法存储。

**当集群中有一个master宕机会发生什么呢？**

> 1.首先是该实例与其它实例失去连接
>
> 2.然后是疑似宕机

### 自动故障转移

当集群中有一个master宕机会发生什么呢？

#### 监控集群状态

```apl
# 利用watch监控集群状态
watch redis-cli -p 7001 cluster nodes
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209171221257.png" alt="image-20220917122135069" style="zoom:80%;" />

#### 手动宕机7002

```sh
# 直接停止一个redis实例，例如7002：
redis-cli -p 7002 shutdown
```

1）首先是该实例与其它实例失去连接

2）然后是疑似宕机：

![image-20210725162319490](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041515122.png)

3）最后是确定下线，自动提升一个slave为新的master：

![image-20210725162408979](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041515129.png)

4）当7002再次启动，就会变为一个slave节点了：

```apl
redis-server /tmp/7002/redis.conf  
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209171226449.png" alt="image-20220917122620283" style="zoom:80%;" />

### 手动故障转移(抢走主节点)

> 利用cluster failover命令可以手动让集群中的某个master宕机，切换到执行cluster failover命令的这个slave节点，实现无感知的数据迁移。其流程如下：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041515134.png" alt="image-20210725162441407" style="zoom:67%;" />

这种failover命令可以指定三种模式：

- 缺省：默认的流程，如图1~6歩
- force：省略了对offset的一致性校验
- takeover：直接执行第5歩，忽略数据一致性、忽略master状态和其它master的意见

**案例需求**：在7002这个slave节点执行手动故障转移，重新夺回master地位

> 1）利用redis-cli连接7002这个节点
>
> 2）执行cluster failover命令

如图：

![image-20210727160037766](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041515135.png)

效果：

![image-20210727161152065](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041515146.png)



# 多级缓存

> 多级缓存的实现离不开Nginx编程，而Nginx编程又离不开OpenResty。
>
> 项目地址：https://gitee.com/sure-s-renshuo/item-service

## 多级缓存架构⭐

> 多级缓存就是充分利用请求处理的每个环节，分别添加缓存，减轻Tomcat压力，提升服务性能

### 完整架构

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306131011290.png" alt="image-20230613101147101" style="zoom:80%;" />

### 查询数据流程

> - 浏览器访问静态资源时，优先读取浏览器本地缓存
> - 访问非静态资源（ajax查询数据）时，访问服务端
> - 请求到达Nginx后，优先读取Nginx本地缓存
> - 如果Nginx本地缓存未命中，则去直接查询Redis（不经过Tomcat）
> - 如果Redis查询未命中，则查询Tomcat
> - 请求进入Tomcat后，优先查询JVM进程缓存
> - 如果JVM进程缓存未命中，则查询数据库

![image-20210821075558137](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821075558137.png)

### Nginx集群

> 在多级缓存架构中，Nginx内部需要编写本地缓存查询、Redis查询、Tomcat查询的业务逻辑，因此这样的nginx服务不再是一个**反向代理服务器**，而是一个编写**业务的Web服务器了**。因此这样的业务Nginx服务也需要搭建集群来提高并发，再有专门的nginx服务来做反向代理，如图：
>

![image-20210821080511581](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821080511581.png)

### Tomcat集群

另外，我们的Tomcat服务将来也会部署为集群模式：

![image-20210821080954947](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821080954947.png)

可见，多级缓存的关键有两个

> - 一个是在nginx中编写业务，实现nginx本地缓存、Redis、Tomcat的查询
>
> - 另一个就是在Tomcat中实现JVM进程缓存

## 项目搭建

### 数据库表

```sql
drop table if exists `tb_item`;
create table `tb_item`  (
  `id` bigint(20) not null auto_increment comment '商品id',
  `title` varchar(264) not null comment '商品标题',
  `name` varchar(128) not null default '' comment '商品名称',
  `price` bigint(20) not null comment '价格（分）',
  `image` varchar(200) default null comment '商品图片',
  `category` varchar(200) default null comment '类目名称',
  `brand` varchar(100) default null comment '品牌名称',
  `spec` varchar(200) default null comment '规格',
  `status` int(1) null default 1 comment '商品状态 1-正常，2-下架，3-删除',
  `create_time` datetime null default null comment '创建时间',
  `update_time` datetime null default null comment '更新时间',
  primary key (`id`) using btree,
  index `status`(`status`) using btree,
  index `updated`(`update_time`) using btree
) engine = innodb auto_increment = 1  comment = '商品表';
```

```sql
drop table if exists `tb_item_stock`;
create table `tb_item_stock`  (
  `item_id` bigint(20) not null comment '商品id，关联tb_item表',
  `stock` int(10) not null default 9999 comment '商品库存',
  `sold` int(10) not null default 0 comment '商品销量',
  primary key (`item_id`) using btree
) engine = innodb character set = utf8mb4;
```

### pom.xml

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
    <!--mybatis-->
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>3.4.2</version>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
    <dependency>
        <groupId>com.github.ben-manes.caffeine</groupId>
        <artifactId>caffeine</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
    </dependency>
</dependencies>
```

```yml
server:
  port: 8081
spring:
  application:
    name: itemservice
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/xue?useSSL=false
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver
mybatis-plus:
  type-aliases-package: com.heima.item.pojo
  configuration:
    map-underscore-to-camel-case: true
  global-config:
    db-config:
      update-strategy: not_null
      id-type: auto
logging:
  level:
    com.heima: debug
  pattern:
    dateformat: HH:mm:ss:SSS
```

### entity

```java
@Data
@TableName("tb_item")
public class Item {
    @TableId(type = IdType.AUTO)
    private Long id;//商品id
    private String name;//商品名称
    private String title;//商品标题
    private Long price;//价格（分）
    private String image;//商品图片
    private String category;//分类名称
    private String brand;//品牌名称
    private String spec;//规格
    private Integer status;//商品状态 1-正常，2-下架
    private Date createTime;//创建时间
    private Date updateTime;//更新时间
    @TableField(exist = false)
    private Integer stock;
    @TableField(exist = false)
    private Integer sold;
}
```

```java
@Data
@TableName("tb_item_stock")
public class ItemStock {
    @TableId(type = IdType.INPUT, value = "item_id")
    private Long id; //商品id
    private Integer stock; //商品库存
    private Integer sold; //商品销量
}
```

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageDTO {
    private Long total;
    private List<Item> list;
}
```

### Mapper

```java
public interface ItemMapper extends BaseMapper<Item> {
}
```

```java
public interface ItemStockMapper extends BaseMapper<ItemStock> {
}
```

### Service

```java
public interface IItemService extends IService<Item> {
    void saveItem(Item item);
}
```

```java
public interface IItemStockService extends IService<ItemStock> {
}
```

```java
@Service
public class ItemService extends ServiceImpl<ItemMapper, Item> implements IItemService {
    @Autowired
    private IItemStockService stockService;
    @Override
    @Transactional
    public void saveItem(Item item) {
        // 新增商品
        save(item);
        // 新增库存
        ItemStock stock = new ItemStock();
        stock.setId(item.getId());
        stock.setStock(item.getStock());
        stockService.save(stock);
    }
}
```

```java
@Service
public class ItemStockService extends ServiceImpl<ItemStockMapper, ItemStock> 
                              implements IItemStockService {
}
```

### controller

```java
@RestController
@RequestMapping("item")
public class ItemController {

    @Autowired
    private IItemService itemService;
    @Autowired
    private IItemStockService stockService;

    @GetMapping("list")
    public PageDTO queryItemPage(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "size", defaultValue = "5") Integer size){
        // 分页查询商品
        Page<Item> result = itemService.query()
                .ne("status", 3)
                .page(new Page<>(page, size));
        // 查询库存
        List<Item> list = result.getRecords().stream().peek(item -> {
            ItemStock stock = stockService.getById(item.getId());
            item.setStock(stock.getStock());
            item.setSold(stock.getSold());
        }).collect(Collectors.toList());
        // 封装返回
        return new PageDTO(result.getTotal(), list);
    }

    @PostMapping
    public void saveItem(@RequestBody Item item){
        itemService.saveItem(item);
    }

    @PutMapping
    public void updateItem(@RequestBody Item item) {
        itemService.updateById(item);
    }

    @PutMapping("stock")
    public void updateStock(@RequestBody ItemStock itemStock){
        stockService.updateById(itemStock);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable("id") Long id){
        itemService.update().set("status", 3).eq("id", id).update();
    }

    @GetMapping("/{id}")
    public Item findById(@PathVariable("id") Long id){
        return itemService.query()
                .ne("status", 3).eq("id", id)
                .one();
    }

    @GetMapping("/stock/{id}")
    public ItemStock findStockById(@PathVariable("id") Long id){
        return stockService.getById(id);
    }
}
```

### 访问测试

:8081/item/list

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306121645551.png" alt="image-20230612164525409" style="zoom:80%;" />

## JVM进程缓存

> 缓存在日常开发中启动至关重要的作用，由于是存储在内存中，数据的读取速度是非常快的，能大量减少对数据库的访问，减少数据库的压力。我们把缓存分为两类：

### 本地进程缓存

分布式缓存，例如Redis：

> 优点：存储容量更大、可靠性更好、可以在集群间共享
>
> 缺点：访问缓存有网络开销
>
> 场景：缓存数据量较大、可靠性要求较高、需要在集群间共享

进程本地缓存，例如HashMap、GuavaCache：

> 优点：读取本地内存，没有网络开销，速度更快
>
> 缺点：存储容量有限、可靠性较低、无法共享
>
> 场景：性能要求较高，缓存数据量较小

> Caffeine是一个基于Java8开发的，提供了近乎最佳命中率的高性能的本地缓存库。目前Spring内部的缓存使用的就是Caffeine。GitHub地址：https://github.com/ben-manes/caffeine

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306121650118.png" alt="image-20230612165023002" style="zoom:80%;" />

### 基础语法

```xml
<dependency>
    <groupId>com.github.ben-manes.caffeine</groupId>
    <artifactId>caffeine</artifactId>
</dependency>
```

#### 基本用法

```java
@Test
void testBasicOps() {
    // 创建缓存对象
    Cache<String, String> cache = Caffeine.newBuilder().build();
    // 存数据
    cache.put("gf", "迪丽热巴");
    // 取数据，不存在则返回null
    String gf = cache.getIfPresent("gf");
    System.out.println("gf = " + gf);
    // 取数据，不存在则去数据库查询
    String defaultGF = cache.get("defaultGF", key -> {
        // 这里可以去数据库根据 key查询value
        return "柳岩";
    });
    System.out.println("defaultGF = " + defaultGF);
}
```

#### 缓存驱逐策略

> 在默认情况下，当一个缓存元素过期的时候，Caffeine不会自动立即将其清理和驱逐。而是在一次读或写操作后，或者在空闲时间完成对失效数据的驱逐。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306121656935.png" alt="image-20230612165649799" style="zoom:80%;" />

#### 基于大小设置驱逐策略

```java
@Test
void testEvictByNum() throws InterruptedException {
    // 创建缓存对象
    Cache<String, String> cache = Caffeine.newBuilder()
            // 设置缓存大小上限为 1
            .maximumSize(1)
            .build();
    // 存数据
    cache.put("gf1", "柳岩");
    cache.put("gf2", "范冰冰");
    cache.put("gf3", "迪丽热巴");
    // 延迟10ms，给清理线程一点时间
    Thread.sleep(10L);
    // 获取数据
    System.out.println("gf1: " + cache.getIfPresent("gf1"));
    System.out.println("gf2: " + cache.getIfPresent("gf2"));
    System.out.println("gf3: " + cache.getIfPresent("gf3"));
}
```

#### 基于时间设置驱逐策略

```java
@Test
void testEvictByTime() throws InterruptedException {
    // 创建缓存对象
    Cache<String, String> cache = Caffeine.newBuilder()
            .expireAfterWrite(Duration.ofSeconds(1)) // 设置缓存有效期为 10 秒
            .build();
    // 存数据
    cache.put("gf", "柳岩");
    // 获取数据
    System.out.println("gf: " + cache.getIfPresent("gf"));
    // 休眠一会儿
    Thread.sleep(1200L);
    System.out.println("gf: " + cache.getIfPresent("gf"));
}
```

### 实现进程缓存

> - 给根据id查询商品的业务添加缓存，缓存未命中时查询数据库
> - 给根据id查询商品库存的业务添加缓存，缓存未命中时查询数据库
> - 缓存初始大小为100，缓存上限为10000

```java
@Configuration
public class CacheConfig {
    @Bean
    public Cache<String, Object> caffeineCache() {
        return Caffeine.newBuilder()
                // 设置最后一次写入或访问后经过固定时间过期
                .expireAfterWrite(60, TimeUnit.SECONDS)
                // 初始的缓存空间大小
                .initialCapacity(100)
                // 缓存的最大条数
                .maximumSize(10_000)
                .build();
    }

    @Bean
    public Cache<Long, Item> itemCache() {
        return Caffeine.newBuilder()
                // 设置最后一次写入或访问后经过固定时间过期
                .expireAfterWrite(60, TimeUnit.SECONDS)
                // 初始的缓存空间大小
                .initialCapacity(100)
                // 缓存的最大条数
                .maximumSize(10_000)
                .build();
    }

    @Bean
    public Cache<Long, ItemStock> stockCache() {
        return Caffeine.newBuilder()
                // 设置最后一次写入或访问后经过固定时间过期
                .expireAfterWrite(60, TimeUnit.SECONDS)
                // 初始的缓存空间大小
                .initialCapacity(100)
                // 缓存的最大条数
                .maximumSize(10_000)
                .build();
    }
}
```

> 修改ItemController

```java
@Resource
private Cache<Long,Item> itemCache;

@Resource
private Cache<Long,ItemStock> stockCache;
```

```java
@GetMapping("/{id}")
public Item findById(@PathVariable("id") Long id){
    // 根据id查询，查不到就去数据库查询
    return itemCache.get(id,key -> itemService.query()
            .ne("status", 3).eq("id", id)
            .one());
}

@GetMapping("/stock/{id}")
public ItemStock findStockById(@PathVariable("id") Long id){
    // 根据id查询，查不到就去数据库查询
    return stockCache.get(id,key -> stockService.getById(id));
}
```

> 访问测试：:8081/item/10001，多次访问该路径，只进行了一次查询数据库
>
> 访问测试：:8081/item/stock/10001，多次访问该路径，只进行了一次查询数据库

## Nginx查询接口数据

### 安装OpenResty

> OpenResty® 是一个基于 Nginx的高性能 Web 平台，用于方便地搭建能够处理超高并发、扩展性极高的动态 Web 应用、Web 服务和动态网关。具备下列特点：官方网站： https://openresty.org/cn/
>

> - 具备Nginx的完整功能
> - 基于Lua语言进行扩展，集成了大量精良的 Lua 库、第三方模块
> - 允许使用Lua**自定义业务逻辑**、**自定义库**

![image-20210821092902946](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821092902946.png)

首先你的Linux虚拟机必须联网

#### 1）安装开发库

首先要安装OpenResty的依赖开发库，执行命令：

```sh
yum install -y pcre-devel openssl-devel gcc --skip-broken
```

#### 2）安装OpenResty仓库

> 你可以在你的 CentOS 系统中添加 `openresty` 仓库，这样就可以便于未来安装或更新我们的软件包（通过 `yum check-update` 命令）。运行下面的命令就可以添加我们的仓库：
>

```apl
yum-config-manager --add-repo https://openresty.org/package/centos/openresty.repo
```

如果提示说命令不存在，则运行：然后再重复上面的命令

```apl
yum install -y yum-utils 
```

#### 3）安装OpenResty

然后就可以像下面这样安装软件包，比如 `openresty`：

```apl
yum install -y openresty
```

#### 4）安装opm工具

opm是OpenResty的一个管理工具，可以帮助我们安装一个第三方的Lua模块。

如果你想安装命令行工具 `opm`，那么可以像下面这样安装 `openresty-opm` 包：

```bash
yum install -y openresty-opm
```

#### 5）目录结构

默认情况下，OpenResty安装的目录是：/usr/local/openresty

```apl
cd /usr/local/openresty
```

看到里面的nginx目录了吗，OpenResty就是在Nginx基础上集成了一些Lua模块。

#### 6）配置nginx的环境变量

> 打开配置文件，在最下面加入两行：
>

```apl
vi /etc/profile
```

```sh
export NGINX_HOME=/usr/local/openresty/nginx
export PATH=${NGINX_HOME}/sbin:$PATH
```

> NGINX_HOME：后面是OpenResty安装目录下的nginx的目录，然后让配置生效：
>

```apl
source /etc/profile
```

### 启动和运行

> OpenResty底层是基于Nginx的，查看OpenResty目录的nginx目录，结构与windows中安装的nginx基本一致：所以运行方式与nginx基本一致：
>

```sh
# 启动nginx
nginx
# 重新加载配置
nginx -s reload
# 停止
nginx -s stop
```

> nginx的默认配置文件注释太多，影响后续我们的编辑，这里将nginx.conf中的注释部分删除，保留有效部分。修改`/usr/local/openresty/nginx/conf/nginx.conf`文件，内容如下：
>

```nginx
#user  nobody;
worker_processes  1;
error_log  logs/error.log;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       8081;
        server_name  localhost;
        location / {
            root   html;
            index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

在Linux的控制台输入命令以启动nginx：

```sh
nginx
nginx -s reload
```

然后访问页面：http://192.168.88.101:8081，注意ip地址替换为你自己的虚拟机IP：

```
# 改名
mv nginx.conf nginxOld.conf 
# 复制
cp nginx.conf.default nginx.conf  
nginx
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209161625270.png" alt="image-20220916162513152" style="zoom:80%;" />

### 快速入门

我们希望达到的多级缓存架构如图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/yeVDlwtfMx.png" alt="yeVDlwtfMx" style="zoom:80%;" />

> OpenResty的很多功能都依赖于其目录下的Lua库，需要在nginx.conf中指定依赖库的目录
>
> 修改`/usr/local/openresty/nginx/conf/nginx.conf`文件,添加lua模块和返回内容

```nginx
#user  nobody;
worker_processes  1;
error_log  logs/error.log;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    # 加载lua 模块，.lua结尾的就是lua模块
    lua_package_path "/usr/local/openresty/lualib/?.lua;;";
    # 加载c模块 ，.so结尾的就是c模块    
    lua_package_cpath "/usr/local/openresty/lualib/?.so;;";  
    server {
        listen       8081;
        server_name  localhost;
        # 设置响应结果
        location /api/item {
            # 默认的响应类型
            default_type   application/json;
            # 响应结果由lua/item.lua文件来决定
            content_by_lua_file  lua/item.lua;
        }
        location / {
            root   html;
            index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

> 创建lua/item.lua，在`/usr/local/openresty/nginx`目录创建文件夹：lua，新建文件：item.lua

```
mkdir lua
cd lua
touch item.lua
```

> 编写item.lua，返回假数据item.lua中，利用ngx.say()函数返回数据到Response中，里面就是JSON对象
>

```lua
ngx.say('{"id":10001,"name":"SALSA AIR","title":"RIMOWA 21寸托运箱拉杆箱 SALSA AIR系列果绿色 820.70.36.4","price":17900,"image":"https://m.360buyimg.com/mobilecms/s720x720_jfs/t6934/364/1195375010/84676/e9f2c55f/597ece38N0ddcbc77.jpg!q70.jpg.webp","category":"拉杆箱","brand":"RIMOWA","spec":"","status":1,"createTime":"2019-04-30T16:00:00.000+00:00","updateTime":"2019-04-30T16:00:00.000+00:00","stock":2999,"sold":31290}')
```

> 4）重新加载配置

```sh
nginx -s reload
```

> 测试访问，刷新商品页面：http://192.168.88.101:8081/api/item，即可看到效果：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306121953933.png" alt="image-20230612195307785" style="zoom:80%;" />

### 请求参数处理

> 上一节中，我们在OpenResty接收前端请求，但是返回的是假数据。要返回真实数据，必须根据前端传递来的商品id，查询商品信息才可以。**那么如何获取前端传递的商品参数呢？**
>

#### 基本语法

> OpenResty中提供了一些API用来获取不同类型的前端请求参数：
>

![image-20210821101433528](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821101433528.png)

#### 实战演练⭐

> 在前端发起的ajax请求如图：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821101721649.png" alt="image-20210821101721649" style="zoom:80%;" />

> 可以看到商品id是以路径占位符方式传递的，因此可以利用正则表达式匹配的方式来获取ID
>

> 1）获取商品id修改`/usr/loca/openresty/nginx/nginx.conf`，利用正则表达式获取ID：

```nginx
# ~表示后面是正则表达式,\d+表示一个或多个数字
location ~ /api/item/(\d+) {
    # 默认的响应类型
    default_type application/json;
    # 响应结果由lua/item.lua文件来决定
    content_by_lua_file lua/item.lua;
}
```

> 2）拼接ID并返回修改`/usr/loca/openresty/nginx/lua/item.lua`文件，**获取id并拼接到结果**

```lua
-- 获取商品id，匹配到的内容会放到数组中，通过数组拿内容
local id = ngx.var[1]
-- 拼接并返回：..表示lua语法拼接字符串
ngx.say('{"id":' .. id .. ',"name":"SALSA AIR","title":"RIMOWA 21寸托运箱拉杆箱 SALSA AIR系列果绿色 820.70.36.4","price":17900,"image":"https://m.360buyimg.com/mobilecms/s720x720_jfs/t6934/364/1195375010/84676/e9f2c55f/597ece38N0ddcbc77.jpg!q70.jpg.webp","category":"拉杆箱","brand":"RIMOWA","spec":"","status":1,"createTime":"2019-04-30T16:00:00.000+00:00","updateTime":"2019-04-30T16:00:00.000+00:00","stock":2999,"sold":31290}')
```

> 3）重新加载并测试,运行命令以重新加载OpenResty配置：

```sh
nginx -s reload
```

> 刷新页面可以看到结果中已经带上了ID：http://192.168.88.101:8081/api/item/102
>

 <img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306122118166.png" alt="image-20230612211844031" style="zoom:67%;" />

### 前置知识

#### CJSON工具类

> OpenResty提供了一个cjson的模块用来处理JSON的序列化和反序列化。
>
> 官方地址： https://github.com/openresty/lua-cjson/

> 1）引入cjson模块

```lua
local cjson = require "cjson"
```

> 2）序列化

```lua
local obj = {
    name = 'jack',
    age = 21
}
-- 把 table 序列化为 json
local json = cjson.encode(obj)
```

> 3）反序列化

```lua
local json = '{"name": "jack", "age": 21}'
-- 反序列化 json为 table
local obj = cjson.decode(json);
print(obj.name)
```

#### 基于ID负载均衡

> 刚才的代码中，我们的tomcat是单机部署。而实际开发中，tomcat一定是集群模式：
>

![image-20210821111023255](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821111023255.png)

> 因此，OpenResty需要对tomcat集群做负载均衡。而默认的负载均衡规则是轮询模式，当我们查询/item/10001时：

> - 第一次会访问8081端口的tomcat服务，在该服务内部就形成了JVM进程缓存
> - 第二次会访问8082端口的tomcat服务，该服务内部没有JVM缓存（因为JVM缓存无法共享）

> 你看，因为轮询的原因，第一次查询8081形成的JVM缓存并未生效，直到下一次再次访问到8081时才可以生效，缓存命中率太低了。怎么办？如果能让同一个商品，每次查询时都访问同一个tomcat服务，那么JVM缓存就一定能生效了。也就是说，我们需要根据商品id做负载均衡，而不是轮询。
>

> 1）原理nginx提供了基于请求路径做负载均衡的算法：

> nginx根据请求路径做hash运算，把得到的数值对tomcat服务的数量取余，余数是几，就访问第几个服务，实现负载均衡。例如：
>

- 我们的请求路径是 /item/10001
- tomcat总数为2台（8081、8082）
- 对请求路径/item/1001做hash运算求余的结果为1
- 则访问第一个tomcat服务，也就是8081

只要id不变，每次hash运算结果也不会变，那就可以保证同一个商品，一直访问同一个tomcat服务，确保JVM缓存生效。

> 2）实现修改`/usr/local/openresty/nginx/conf/nginx.conf`文件，实现基于ID做负载均衡。

首先，定义tomcat集群，并设置基于路径做负载均衡：

```nginx 
upstream tomcat-cluster {
    hash $request_uri;
    server 192.168.0.155:8081;
    server 192.168.0.155:8082;
}
```

然后，修改对tomcat服务的反向代理，目标指向tomcat集群：

```nginx
location /item {
    proxy_pass http://tomcat-cluster;
}
```

重新加载OpenResty

```apl
nginx -s reload
```

> 3）测试启动两台tomcat服务：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821112420464.png" alt="image-20210821112420464" style="zoom:80%;" />

同时启动：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821112444482.png" alt="image-20210821112444482" style="zoom:80%;" /> 

清空日志后，再次访问页面，可以看到不同id的商品，访问到了不同的tomcat服务：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821112559965.png" alt="image-20210821112559965" style="zoom:80%;" />

![image-20210821112637430](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821112637430.png)

### 实战演练⭐

> 拿到商品ID后，本应去缓存中查询商品信息，不过目前我们还未建立nginx、redis缓存。因此，这里我们先根据商品id去tomcat查询商品信息。我们实现如图部分：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821102610167.png" alt="image-20210821102610167" style="zoom: 67%;" />

这里要修改item.lua，满足下面的需求：

> 1.获取请求参数中的id
>
> 2.根据id向Tomcat服务发送请求，查询商品信息
>
> 3.根据id向Tomcat服务发送请求，查询库存信息
>
> 4.组装商品信息、库存信息，序列化为JSON格式并返回

#### common.lua⭐

> 在`/usr/local/openresty/lualib`目录下，新建一个common.lua文件
>

```lua
-- 封装函数，发送http请求，并解析响应
local function read_http(path, params)
    local resp = ngx.location.capture(path,{
        method = ngx.HTTP_GET,
        args = params,
    })
    if not resp then
        -- 记录错误信息，返回404
        ngx.log(ngx.ERR, "http请求查询失败, path: ", path , ", args: ", args)
        ngx.exit(404)
    end
    return resp.body
end
-- 将方法导出
local _M = {  
    read_http = read_http
}  
return _M
```

#### item.lua

> 下面，我们修改之前的/usr/local/openresty/nginx/lua/item.lua中的业务，添加json处理功能：这里查询到的结果是json字符串，并且包含商品、库存两个json字符串，页面需要的是把两个json拼接为一个

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821110441222.png" alt="image-20210821110441222" style="zoom:80%;" />

这就需要我们先把JSON变为lua的table，完成数据整合后，再转为JSON。

```lua
-- 导入common，是common.lua的名字
local common = require('common')
local read_http = common.read_http
-- 导入cjson库
local cjson = require('cjson')

-- 获取路径参数
local id = ngx.var[1]
-- 根据id查询商品
local itemJSON = read_http("/item/".. id, nil)
-- 根据id查询商品库存
local itemStockJSON = read_http("/item/stock/".. id, nil)


-- JSON转化为lua的table
local item = cjson.decode(itemJSON)
local stock = cjson.decode(itemStockJSON)

-- 组合数据
item.stock = stock.stock
item.sold = stock.sold

-- 把item序列化为json 返回结果
ngx.say(cjson.encode(item))
```

#### nginx.conf

首先，在http块定义tomcat集群，并设置基于路径做负载均衡：

```nginx 
upstream tomcat-cluster {
    hash $request_uri;
    server 192.168.0.155:8081;
    server 192.168.0.155:8082;
}
```

然后，修改对tomcat服务的反向代理，目标指向tomcat集群：

```apl
location ~ /api/item/(\d+) {
    # 默认的响应类型
    default_type application/json;
    # 响应结果由lua/item.lua文件来决定
    content_by_lua_file lua/item.lua;
}
# 启动后端服务
# 注意：这边写成/item原因是真正发起请求的是item.lua，他两个请求都是/item开头，因此不用写成/api/item
location /item {
   # 反向代理
   proxy_pass http://tomcat-cluster;  
}
```

重新加载OpenResty

```apl
nginx -s reload
```

#### 访问测试

本地：http://192.168.0.155:8081/item/stock/10001

本地：http://192.168.0.155:8081/item/10001

访问：http://192.168.22.145:8081/api/item/10003，可以看到两个结果被拼接起来了

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209171040350.png" alt="image-20220917104052207" style="zoom:80%;" />



## Nginx查询Redis缓存

现在，Redis缓存已经准备就绪，我们可以再OpenResty中实现查询Redis的逻辑了。如下图红框所示：

![image-20210821113340111](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821113340111.png)

当请求进入OpenResty之后：

- 优先查询Redis缓存
- 如果Redis缓存未命中，再查询Tomcat

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091228990.png" alt="image-20220609122826914" style="zoom:80%;" />

### 封装Redis工具

> OpenResty提供了操作Redis的模块，我们只要引入该模块就能直接使用。但是为了方便，我们将Redis操作封装到之前的common.lua工具库中。修改`/usr/local/openresty/lualib/common.lua`文件

> 1）引入Redis模块，并初始化Redis对象

```lua
-- 导入redis
local redis = require('resty.redis')
-- 初始化redis
local red = redis:new()
-- 建立连接、发送请求、响应结果的超时时间，单位毫秒
red:set_timeouts(1000, 1000, 1000)
```

> 2）封装函数，用来释放Redis连接，其实是放入连接池

```lua
-- 关闭redis连接的工具方法，其实是放入连接池
local function close_redis(red)
    local pool_max_idle_time = 10000 -- 连接的空闲时间，单位是毫秒
    local pool_size = 100 --连接池大小
    local ok, err = red:set_keepalive(pool_max_idle_time, pool_size)
    if not ok then
        ngx.log(ngx.ERR, "放入redis连接池失败: ", err)
    end
end
```

> 3）封装函数，根据key查询Redis数据

```lua
-- 查询redis的方法 ip和port是redis地址，key是查询的key
local function read_redis(ip, port, key)
    -- 获取一个连接
    local ok, err = red:connect(ip, port)
    if not ok then
        ngx.log(ngx.ERR, "连接redis失败 : ", err)
        return nil
    end
    -- 查询redis
    local resp, err = red:get(key)
    -- 查询失败处理
    if not resp then
        ngx.log(ngx.ERR, "查询Redis失败: ", err, ", key = " , key)
    end
    --得到的数据为空处理
    if resp == ngx.null then
        resp = nil
        ngx.log(ngx.ERR, "查询Redis数据为空, key = ", key)
    end
    close_redis(red)
    return resp
end
```

> 4）导出

```lua
-- 将方法导出
local _M = {  
    read_http = read_http,
    read_redis = read_redis
}  
return _M
```

> /usr/local/openresty/lualib/common.lua完整代码

```lua
-- 导入redis
local redis = require('resty.redis')
-- 初始化redis
local red = redis:new()
-- 分别对应建立连接、发送请求、响应结果的超时时间
red:set_timeouts(1000, 1000, 1000)

-- 关闭redis连接的工具方法，其实是放入连接池
local function close_redis(red)
    local pool_max_idle_time = 10000 -- 连接的空闲时间，单位是毫秒
    local pool_size = 100 --连接池大小
    local ok, err = red:set_keepalive(pool_max_idle_time, pool_size)
    if not ok then
        ngx.log(ngx.ERR, "放入redis连接池失败: ", err)
    end
end

-- 查询redis的方法 ip和port是redis地址，key是查询的key
local function read_redis(ip, port, key)
    -- 获取一个连接
    local ok, err = red:connect(ip, port)
    if not ok then
        ngx.log(ngx.ERR, "连接redis失败 : ", err)
        return nil
    end
    -- 查询redis
    local resp, err = red:get(key)
    -- 查询失败处理
    if not resp then
        ngx.log(ngx.ERR, "查询Redis失败: ", err, ", key = " , key)
    end
    --得到的数据为空处理
    if resp == ngx.null then
        resp = nil
        ngx.log(ngx.ERR, "查询Redis数据为空, key = ", key)
    end
    close_redis(red)
    return resp
end

-- 封装函数，发送http请求，并解析响应
local function read_http(path, params)
    local resp = ngx.location.capture(path,{
        method = ngx.HTTP_GET,
        args = params,
    })
    if not resp then
        -- 记录错误信息，返回404
        ngx.log(ngx.ERR, "http查询失败, path: ", path , ", args: ", args)
        ngx.exit(404)
    end
    return resp.body
end
-- 将方法导出
local _M = {  
    read_http = read_http,
    read_redis = read_redis
}  
return _M
```

### 实现Redis查询

接下来，我们就可以去修改item.lua文件，实现对Redis的查询了，查询逻辑是：

> - 根据id查询Redis
> - 如果查询失败则继续查询Tomcat
> - 将查询结果返回

> 1）修改`/usr/local/openresty/lua/item.lua`文件，添加一个查询函数：

```lua
-- 导入common函数库
local common = require('common')
local read_http = common.read_http
local read_redis = common.read_redis
-- 封装查询函数
function read_data(key, path, params)
    -- 查询本地缓存
    local val = read_redis("127.0.0.1", 6379, key)
    -- 判断查询结果
    if not val then
        ngx.log(ngx.ERR, "redis查询失败，尝试查询http， key: ", key)
        -- redis查询失败，去查询http
        val = read_http(path, params)
    end
    -- 返回数据
    return val
end
```

> 2）而后修改商品查询、库存查询的业务：

![image-20210821114528954](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821114528954.png)

> nginx/lua/item.lua完整代码

```lua
-- 导入common函数库
local common = require('common')
local read_http = common.read_http
local read_redis = common.read_redis
-- 导入cjson库
local cjson = require('cjson')

-- 封装查询函数
function read_data(key, path, params)
    -- 查询本地缓存
    local val = read_redis("127.0.0.1", 6379, key)
    -- 判断查询结果
    if not val then
        ngx.log(ngx.ERR, "redis查询失败，尝试查询http， key: ", key)
        -- redis查询失败，去查询http
        val = read_http(path, params)
    end
    -- 返回数据
    return val
end

-- 获取路径参数
local id = ngx.var[1]

-- 查询商品信息
local itemJSON = read_data("item:id:" .. id,  "/item/" .. id, nil)
-- 查询库存信息
local stockJSON = read_data("item:stock:id:" .. id, "/item/stock/" .. id, nil)

-- JSON转化为lua的table
local item = cjson.decode(itemJSON)
local stock = cjson.decode(stockJSON)
-- 组合数据
item.stock = stock.stock
item.sold = stock.sold

-- 把item序列化为json 返回结果
ngx.say(cjson.encode(item))
```

### 查询调用

> nginx.conf：和之前一样，并没有改变

```nginx
upstream tomcat-cluster {
    hash $request_uri;
    server 192.168.31.112:8081;
    server 192.168.31.112:8082;
}
```

```nginx
location /item {
    proxy_pass http://tomcat-cluster;
}

# ~表示后面是正则表达式,\d+表示一个或多个数字
location ~ /api/item/(\d+) {
    # 默认的响应类型
    default_type application/json;
    # 响应结果由lua/item.lua文件来决定
    content_by_lua_file lua/item.lua;
}
```

```sh
nginx -s reload
```

> 访问网址：http://192.168.88.101:8081/api/item/10001
>

> 这样，只要数据存在redis中，即使服务器停机，我们依旧能从redis中获取数据
>



## Nginx本地缓存(完整实现)

> 现在，整个多级缓存中只差最后一环，也就是nginx的本地缓存了。如图：

> nginx本地缓存是采用时间过期策略，因此经常变化的数据就不要放在这里了

![image-20210821114742950](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821114742950.png)

### 本地缓存API

> OpenResty为Nginx提供了**shard dict**的功能，可以在nginx的多个worker之间共享数据，实现缓存功能

> 1）开启共享字典，在**nginx.conf**的http下添加配置：

```nginx
# 共享字典，也就是本地缓存，名称叫做：item_cache，大小150m
lua_shared_dict item_cache 150m; 
```

> 2）操作共享字典

```lua
-- 获取本地缓存对象
local item_cache = ngx.shared.item_cache
-- 存储, 指定key、value、过期时间，单位s，默认为0代表永不过期
item_cache:set('key', 'value', 1000)
-- 读取
local val = item_cache:get('key')
```

### 完整实现⭐

> 这里把**上面的Nginx查询接口+Redis+本地缓存结合到一起**

> 1. 修改item.lua中的read_data函数，优先查询本地缓存，未命中时再查询Redis、Tomcat
> 2. 查询Redis或Tomcat成功后，将数据写入本地缓存，并设置有效期
> 3. 商品基本信息，有效期30分钟
> 4. 库存信息，有效期1分钟

#### item.lua

##### item.lua修改内容

> 1）修改`/usr/local/openresty/lua/item.lua`文件

```lua
-- 导入共享词典，本地缓存
local item_cache = ngx.shared.item_cache

-- 封装查询函数
function read_data(key, expire, path, params)
    -- 查询本地缓存
    local val = item_cache:get(key)
    if not val then
        ngx.log(ngx.ERR, "本地缓存查询失败，尝试查询Redis， key: ", key)
        -- 查询redis
        val = read_redis("127.0.0.1", 6379, key)
        -- 判断查询结果
        if not val then
            ngx.log(ngx.ERR, "redis查询失败，尝试查询http， key: ", key)
            -- redis查询失败，去查询http
            val = read_http(path, params)
        end
    end
    -- 查询成功，把数据写入本地缓存
    item_cache:set(key, val, expire)
    -- 返回数据
    return val
end
```

2）修改item.lua中查询商品和库存的业务，实现最新的read_data函数：

![image-20210821115108528](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821115108528.png)

> 其实就是多了缓存时间参数，过期后nginx缓存会自动删除，下次访问即可更新缓存。
>

> 这里给商品基本信息设置超时时间为30分钟，库存为1分钟。
>

> 因为库存更新频率较高，如果缓存时间过长，可能与数据库差异较大。
>

##### item.lua完整修改

1）在`/usr/local/openresty/nginx/item.lua`，修改read_data查询函数，添加本地缓存逻辑：

```lua
-- 导入common函数库
local common = require('common')
local read_http = common.read_http
local read_redis = common.read_redis
-- 导入cjson库
local cjson = require('cjson')
-- 导入共享词典，本地缓存
local item_cache = ngx.shared.item_cache

-- 封装查询函数
function read_data(key, expire, path, params)
    -- 查询本地缓存
    local val = item_cache:get(key)
    if not val then
        ngx.log(ngx.ERR, "本地缓存查询失败，尝试查询Redis， key: ", key)
        -- 查询redis
        val = read_redis("127.0.0.1", 6379, key)
        -- 判断查询结果
        if not val then
            ngx.log(ngx.ERR, "redis查询失败，尝试查询http， key: ", key)
            -- redis查询失败，去查询http
            val = read_http(path, params)
        end
    end
    -- 查询成功，把数据写入本地缓存
    item_cache:set(key, val, expire)
    -- 返回数据
    return val
end

-- 获取路径参数
local id = ngx.var[1]

-- 查询商品信息
local itemJSON = read_data("item:id:" .. id, 1800,  "/item/" .. id, nil)
-- 查询库存信息
local stockJSON = read_data("item:stock:id:" .. id, 60, "/item/stock/" .. id, nil)

-- JSON转化为lua的table
local item = cjson.decode(itemJSON)
local stock = cjson.decode(stockJSON)
-- 组合数据
item.stock = stock.stock
item.sold = stock.sold

-- 把item序列化为json 返回结果
ngx.say(cjson.encode(item))
```

#### common.lua

> 在`/usr/local/openresty/lualib`目录下，新建一个common.lua文件：

```lua
-- 导入redis
local redis = require('resty.redis')
-- 初始化redis
local red = redis:new()
-- 分别对应建立连接、发送请求、响应结果的超时时间
red:set_timeouts(1000, 1000, 1000)

-- 关闭redis连接的工具方法，其实是放入连接池
local function close_redis(red)
    local pool_max_idle_time = 10000 -- 连接的空闲时间，单位是毫秒
    local pool_size = 100 --连接池大小
    local ok, err = red:set_keepalive(pool_max_idle_time, pool_size)
    if not ok then
        ngx.log(ngx.ERR, "放入redis连接池失败: ", err)
    end
end

-- 查询redis的方法 ip和port是redis地址，key是查询的key
local function read_redis(ip, port, key)
    -- 获取一个连接
    local ok, err = red:connect(ip, port)
    if not ok then
        ngx.log(ngx.ERR, "连接redis失败 : ", err)
        return nil
    end
    -- 查询redis
    local resp, err = red:get(key)
    -- 查询失败处理
    if not resp then
        ngx.log(ngx.ERR, "查询Redis失败: ", err, ", key = " , key)
    end
    --得到的数据为空处理
    if resp == ngx.null then
        resp = nil
        ngx.log(ngx.ERR, "查询Redis数据为空, key = ", key)
    end
    close_redis(red)
    return resp
end

-- 封装函数，发送http请求，并解析响应
local function read_http(path, params)
    local resp = ngx.location.capture(path,{
        method = ngx.HTTP_GET,
        args = params,
    })
    if not resp then
        -- 记录错误信息，返回404
        ngx.log(ngx.ERR, "http查询失败, path: ", path , ", args: ", args)
        ngx.exit(404)
    end
    return resp.body
end
-- 将方法导出
local _M = {  
    read_http = read_http,
    read_redis = read_redis
}  
return _M
```

#### nginx.conf

```nginx
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    # 加载lua 模块
    lua_package_path "/usr/local/openresty/lualib/?.lua;;";
    # 加载c模块     
    lua_package_cpath "/usr/local/openresty/lualib/?.so;;";  
    # 配置nginx缓存，150兆
    lua_shared_dict item_cache 150m; 
     
    upstream tomcat-cluster {
       hash $request_uri;
       server 192.168.0.155:8081;
    }
    server {
        listen       8081;
        server_name  localhost;

    location ~ /api/item/(\d+) {
       # 默认的响应类型
       default_type application/json;
       # 响应结果由lua/item.lua文件来决定
       content_by_lua_file lua/item.lua;
    }

    location /item {
       proxy_pass http://tomcat-cluster;
    }
    
    location / {
        root   html;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

```nginx
nginx -s reload
```

### 访问测试

http://192.168.22.145:8081/api/item/10001

进入`/usr/local/openresty/nginx/logs/error.log`查看

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209171005096.png" alt="image-20220917100557992" style="zoom:80%;" />

## 缓存预热⭐

> Redis缓存会面临冷启动问题：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091225735.png" alt="image-20220609122535658" style="zoom:80%;" />

> **冷启动**：服务刚刚启动时，Redis中并没有缓存，如果所有商品数据都在第一次查询时添加缓存，可能会给数据库带来较大压力。

> **缓存预热**：在实际开发中，我们可以利用大数据统计用户访问的热点数据，在项目启动时将这些热点数据提前查询并保存到Redis中。我们数据量较少，并且没有数据统计相关功能，目前可以在启动时将所有数据都放入缓存中。

> 1）启动Redis

```apl
redis-server /etc/reids.conf
```

> 2）在item-service服务中引入Redis依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

> 3）配置Redis地址

```yaml
spring:
  redis:
    host: 192.168.88.101
```

> 4）编写初始化类

> 缓存预热需要在项目启动时完成，并且必须是拿到RedisTemplate之后，这里我们利用InitializingBean接口来实现，因为InitializingBean可以在对象被Spring创建并且成员变量全部注入后执行。
>

```java

@Component
public class RedisHandler implements InitializingBean {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private IItemService itemService;
    @Autowired
    private IItemStockService stockService;
	// 进行手动json序列化
    private static final ObjectMapper MAPPER = new ObjectMapper();
    
    // InitializingBean的默认方法，只要继承，必须实现它
    // 该方法会在bean创建完，@Autowired注入成功以后执行，即在项目启动时执行
    @Override
    public void afterPropertiesSet() throws Exception {
        // 初始化缓存
        // 1.查询商品信息
        List<Item> itemList = itemService.list();
        // 2.放入缓存
        for (Item item : itemList) {
            // 2.1.item序列化为JSON
            String json = MAPPER.writeValueAsString(item);
            // 2.2.存入redis
            redisTemplate.opsForValue().set("item:id:" + item.getId(), json);
        }

        // 3.查询商品库存信息
        List<ItemStock> stockList = stockService.list();
        // 4.放入缓存
        for (ItemStock stock : stockList) {
            // 2.1.item序列化为JSON
            String json = MAPPER.writeValueAsString(stock);
            // 2.2.存入redis
            redisTemplate.opsForValue().set("item:stock:id:" + stock.getId(), json);
        }
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209161955422.png" alt="image-20220916195548298" style="zoom:80%;" />



## 多级缓存同步⭐

> 大多数情况下，浏览器查询到的都是缓存数据，如果缓存数据与数据库数据存在较大差异，可能会产生比较严重的后果。所以我们必须保证数据库数据、缓存数据的一致性，这就是缓存与数据库的同步。
>

### 数据同步策略

> 缓存数据同步的常见方式有三种：
>

#### 设置有效期

> 给缓存设置有效期，到期后自动删除。再次查询时更新

> - 优势：简单、方便
> - 缺点：时效性差，缓存过期之前可能不一致
> - 场景：更新频率较低，时效性要求低的业务

#### 同步双写

> 在修改数据库的同时，直接修改缓存

> - 优势：时效性强，缓存与数据库强一致
> - 缺点：有代码侵入，耦合度高；
> - 场景：对一致性、时效性要求较高的缓存数据

#### 异步通知

> 修改数据库时发送事件通知，相关服务监听到通知后修改缓存数据，可以基于MQ或者Canal来实现

> - 优势：低耦合，可以同时通知多个缓存服务
> - 缺点：时效性一般，可能存在中间不一致状态
> - 场景：时效性要求一般，有多个服务需要同步

##### 1）基于MQ的异步通知

> - 商品服务完成对数据的修改后，只需要发送一条消息到MQ中。
> - 缓存服务监听MQ消息，然后完成对缓存的更新，依然有少量的代码侵入

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821115552327.png" alt="image-20210821115552327" style="zoom: 50%;" />

##### 2）基于Canal的通知

> - 商品服务完成商品修改后，业务直接结束，没有任何代码侵入
> - Canal监听MySQL变化，当发现变化后，立即通知缓存服务
> - 缓存服务接收到canal通知，更新缓存

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821115719363.png" alt="image-20210821115719363" style="zoom: 50%;" />

### Canal概述

> **Canal [kə'næl]**，译意为水道/管道/沟渠，canal是阿里巴巴旗下的一款开源项目，基于Java开发。基于数据库增量日志解析，提供增量数据订阅&消费。GitHub的地址：https://github.com/alibaba/canal

> Canal是基于mysql的主从同步来实现的，MySQL主从同步的原理如下：
>

![image-20210821115914748](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821115914748.png)

> 1）MySQL master 将数据变更写入二进制日志( binary log），其中记录的数据叫做binary log events
>
> 2）MySQL slave 将 master 的 binary log events拷贝到它的中继日志(relay log)
>
> 3）MySQL slave 重放 relay log 中事件，将数据变更反映它自己的数据

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821120049024.png" alt="image-20210821120049024" style="zoom:80%;" />

> Canal就是把自己伪装成MySQL的一个slave节点，从而监听master的binary log变化。再把得到的变化信息通知给Canal的客户端，进而完成对其它数据库的同步。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821115948395.png" alt="image-20210821115948395" style="zoom:80%;" />



### MySQL配置

> 注意：这里只需要开启主库的配置，不用去管从库，因为从库是canal伪装的

#### 修改配置文件

```apl
# 查看MySQL配置文件位置
/usr/bin/mysql --verbose --help | grep -A 1 'Default options'
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205261501433.png" alt="image-20220526150106366" style="zoom:80%;" />

> 这个信息的意思是： 服务器首先读取的是/etc/my.cnf文件，如果前一个文件不存在则继续读/etc/mysql/my.cnf文件，如若还不存在便会去读~/.my.cnf文件
>

```sh
vim /etc/my.cnf
```

> 文件的内容如下：除了server_id，其他内容可选
>

```ini
[mysqld]
## 设置server_id，同一局域网中需要唯一
server_id=101
skip-name-resolve
character_set_server=utf8
# 只需要对这个数据库进行主从
binlog-do-db=xue
## 指定不需要同步的数据库名称
binlog-ignore-db=mysql
## 开启二进制日志功能
log-bin=mysql-bin
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

```apl
# 配置完成后需要重新启动MySQL
systemctl restart mysqld
```

#### 测试使用

```apl
mysql -uroot -p123456
```

重启成功后通过如下命令查看binlog是否启用

```apl
show variables like '%log_bin%';
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209162313645.png" alt="image-20220916231324523" style="zoom:80%;" />

再查看下MySQL的binlog模式；

```mysql
show variables like 'binlog_format%'; 
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205251457036.png" alt="image-20220525145755987" style="zoom:80%;" />

查看binlog位置

```apl
show master status;
```

 <img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209162240919.png" alt="image-20220916224058676" style="zoom:80%;" />

#### 创建canal用户

接下来添加一个仅用于数据同步的账户，出于安全考虑，这里仅提供对heima这个库的操作权限。

```mysql
-- 降低密码等级
set global validate_password.policy=0;
set global validate_password.length=4;
-- 创建用户授予权限
create user 'canal'@'%' identified by 'canal';
GRANT SELECT ,REPLICATION SLAVE , REPLICATION CLIENT,super ON *.* TO 'canal'@'%';
use mysql;
alter user 'canal'@'%' identified with mysql_native_password by 'canal';
FLUSH PRIVILEGES;
```

### Canal搭建

#### Docker版安装⭐

```sh
# 创建网络，方便后续Docker版的mq等连进来
docker network create heima
# 因为我没用docker版的mysql和springboot，因此此步骤可以省略
docker network connect heima mysql
```

```sh
docker run -p 11111:11111 --name canal \
-e canal.destinations=heima \
-e canal.instance.master.address=192.168.88.101:3306  \
-e canal.instance.dbUsername=canal  \
-e canal.instance.dbPassword=canal  \
-e canal.instance.connectionCharset=UTF-8 \
-e canal.instance.tsdb.enable=true \
-e canal.instance.gtidon=false  \
-e canal.instance.filter.regex=.*\\..* \
--network heima \
-d canal/canal-server:v1.1.5
```

```sh
docker exec -it canal bash
tail -f canal-server/logs/canal/canal.log
# 这个才是看真实是否连接成功的
tail -f canal-server/logs/heima/heima.log
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306130936919.png" alt="image-20230613093619660" style="zoom:80%;" />

- `-p 11111:11111`：这是canal的默认监听端口
- `-e canal.instance.master.address=mysql:3306`：数据库地址和端口，如果不知道mysql容器地址，可以通过`docker inspect 容器id`来查看
- canal.destinations=heima:canal集群名称
- `-e canal.instance.dbUsername=canal`：数据库用户名
- `-e canal.instance.dbPassword=canal` ：数据库密码
- `-e canal.instance.filter.regex=`：要监听的表名称

表名称监听支持的语法：

```
mysql 数据解析关注的表，Perl正则表达式.
多个正则之间以逗号(,)分隔，转义符需要双斜杠(\\) 
常见例子：
1.  所有表：.*   or  .*\\..*
2.  canal schema下所有表： canal\\..*
3.  canal下的以canal打头的表：canal\\.canal.*
4.  canal schema下的一张表：canal.test1
5.  多个规则组合使用然后以逗号隔开：canal\\..*,mysql.test1,mysql.test2 
```

#### 压缩包版安装

安装好JDK，将我们下载好的压缩包`canal.deployer-1.1.5-SNAPSHOT.tar.gz`上传到Linux服务器

进入下载地址：https://github.com/alibaba/canal/releases/download

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209170907649.png" alt="image-20220917090710582" style="zoom:80%;" />

```apl
mkdir /root/canal
tar -xvf canal.deployer-1.1.6.tar.gz -C /root/canal
```

目录结构

```apl
tree canal
```

```c
├── bin
│   ├── restart.sh
│   ├── startup.bat
│   ├── startup.sh
│   └── stop.sh
├── conf
│   ├── canal_local.properties
│   ├── canal.properties
│   └── example
│       └── instance.properties
├── lib
├── logs
│   ├── canal
│   │   └── canal.log
│   └── example
│       ├── example.log
│       └── example.log
└── plugin
```

配置文件(基本不改)

> 目录：conf/example/instance.properties
>

```apl
cd /root/canal
vi conf/example/instance.properties
```

主要编辑内容如下

注意解开注释，其余就空着就行了

```properties
# 需要同步数据的MySQL地址
canal.instance.master.address=127.0.0.1:3306
canal.instance.master.journal.name=
canal.instance.master.position=
canal.instance.master.timestamp=
canal.instance.master.gtid=
# 用于同步数据的数据库账号
canal.instance.dbUsername=canal
# 用于同步数据的数据库密码
canal.instance.dbPassword=canal
# 数据库连接编码
canal.instance.connectionCharset = UTF-8
# 需要订阅binlog的表过滤正则表达式
canal.instance.filter.regex=.*\\..*
```

> 目录：/root/canal/conf/canal.properties

```properties
# 可以配置下
canal.destinations = example
```

> 启动关闭重启,注意要在canal主目录下

```apl
#启动服务
sh bin/startup.sh
```

启动成功后可使用如下命令查看服务日志信息；

```apl
tail -f logs/canal/canal.log
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220402111322230.png" alt="image-20220402111322230" style="zoom:67%;" />

启动成功后可使用如下命令查看instance日志信息；

```c
tail -f logs/example/example.log 
```

如果想要停止`canal-server`服务可以使用如下命令。

```apl
sh bin/stop.sh
```

重启

```apl
sh bin/restart.sh
```

查看canal的监听端口

```apl
netstat -tulpn
```

- 11110：canal admin端口
- 11111：canal监听端口
- 11112：指标监控端口

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220402113657614.png" alt="image-20220402113657614" style="zoom:67%;" />





### 基础使用⭐

> 我们可以利用Canal提供的Java客户端，监听Canal通知消息。当收到变化的消息时，完成对缓存的更新。不过这里我们会使用GitHub上的第三方开源的canal-starter客户端，与SpringBoot完美整合，自动装配，比官方客户端要简单好用很多。

> 地址：https://github.com/NormanGyllenhaal/canal-client

> 引入依赖，编写配置

```xml
<dependency>
    <groupId>top.javatool</groupId>
    <artifactId>canal-spring-boot-starter</artifactId>
    <version>1.2.1-RELEASE</version>
</dependency>
```

```yaml
canal:
  destination: heima # canal的集群名字，要与安装canal时设置的名称一致
  server: 192.168.88.101:11111 # canal服务地址
# 注意数据库连接也要改成上面Mysql配置的数据库
spring:
  application:
    name: itemservice
  datasource:
    url: jdbc:mysql://192.168.88.101:3306/xue?useSSL=false
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209170929295.png" alt="image-20220917092909161" style="zoom:80%;" />

#### 监听单表

```java
@Data
@TableName("tb_item")
public class Item {
    @TableId(type = IdType.AUTO)
    private Long id;//商品id
    private String name;//商品名称
    private String title;//商品标题
    private Long price;//价格（分）
    private String image;//商品图片
    private String category;//分类名称
    private String brand;//品牌名称
    private String spec;//规格
    private Integer status;//商品状态 1-正常，2-下架
    private Date createTime;//创建时间
    private Date updateTime;//更新时间
    @TableField(exist = false)
    private Integer stock;
    @TableField(exist = false)
    private Integer sold;
}
```

```java
@CanalTable(value = "tb_item")
@Component
@Slf4j
public class ItemHandler implements EntryHandler<Item> {

    // 新增操作
    @Override
    public void insert(Item item) {
        //你的逻辑
        log.info("新增 {}",item);
    }
    // 对于更新操作来讲，before中的属性只包含变更的属性
    // after 包含所有属性，通过对比可发现那些属性更新了
    @Override
    public void update(Item before, Item after) {
        //你的逻辑
        log.info("更新 {} {}",before,after);
    }
    // 删除操作
    @Override
    public void delete(Item item) {
        //你的逻辑
        log.info("删除 {}",item);
    }
}
```

#### 监听所有表

```java
@CanalTable(value = "all")
@Component
@Slf4j
public class authorHandler implements EntryHandler<Map<String, String>> {
    @Override
    public void insert(Map<String, String> map) {
        log.info("insert message  {}", map);
    }

    @Override
    public void update(Map<String, String> before, Map<String, String> after) {
        log.info("update before {} ", before);
        log.info("update after {}", after);
    }

    @Override
    public void delete(Map<String, String> map) {
        log.info("delete  {}", map);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209170940504.png" alt="image-20220917094044400" style="zoom:80%;" />

### 实战应用

#### 修改Item实体类

> Canal推送给canal-client的是被修改的这一行数据（row），而我们引入的canal-client则会帮我们把行数据封装到Item实体类中。这个过程中需要知道数据库与实体的映射关系，要用到JPA的几个注解：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205032232860.png" alt="image-20220503223236748" style="zoom:80%;" />

> 通过@Id、@Column、等注解完成Item与数据库表字段的映射：
>

```java
@Data
@TableName("tb_item")
public class Item {
    @TableId(type = IdType.AUTO)
    @Id
    private Long id;//商品id
    @Column(name = "name")
    private String name;//商品名称
    private String title;//商品标题
    private Long price;//价格（分）
    private String image;//商品图片
    private String category;//分类名称
    private String brand;//品牌名称
    private String spec;//规格
    private Integer status;//商品状态 1-正常，2-下架
    private Date createTime;//创建时间
    private Date updateTime;//更新时间
    @TableField(exist = false)
    @Transient
    private Integer stock;
    @TableField(exist = false)
    @Transient
    private Integer sold;
}
```

#### 编写监听器(重点)

> 通过实现`EntryHandler<T>`接口编写监听器，监听Canal消息。注意两点：
>

- 实现类通过`@CanalTable("tb_item")`指定监听的表信息
- EntryHandler的泛型是与表对应的实体类

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205032233573.png" alt="image-20220503223320453" style="zoom:80%;" />

```java
@CanalTable("tb_item")
@Component
public class ItemHandler implements EntryHandler<Item> {
	// 缓存预热
    @Autowired
    private RedisHandler redisHandler;
    // JVM缓存
    @Autowired
    private Cache<Long, Item> itemCache;

    @Override
    public void insert(Item item) {
        // 写数据到JVM进程缓存
        itemCache.put(item.getId(), item);
        // 写数据到redis
        redisHandler.saveItem(item);
    }

    @Override
    public void update(Item before, Item after) {
        // 写数据到JVM进程缓存
        itemCache.put(after.getId(), after);
        // 写数据到redis
        redisHandler.saveItem(after);
    }

    @Override
    public void delete(Item item) {
        // 删除数据到JVM进程缓存
        itemCache.invalidate(item.getId());
        // 删除数据到redis
        redisHandler.deleteItemById(item.getId());
    }
}
```

> RedisHandler是我们之前做缓存预热时编写的一个类，新增内容如下：
>

```java
@Component
public class RedisHandler implements InitializingBean {

    @Autowired
    private StringRedisTemplate redisTemplate;
    ....
    public void saveItem(Item item) {
        try {
            String json = MAPPER.writeValueAsString(item);
            redisTemplate.opsForValue().set("item:id:" + item.getId(), json);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteItemById(Long id) {
        redisTemplate.delete("item:id:" + id);
    }
}
```

> 修改数据库tb_item表，查看Redis和JVM缓存中数据是否发送修改，结果已经成功修改



# 内存策略⭐

Redis之所以性能强，最主要的原因就是基于内存存储。然而单节点的Redis其内存大小不宜过大，会影响持久化或主从同步性能。我们可以通过修改配置文件来设置Redis的最大内存：

## 设置内存大小和淘汰策略⭐

### 设置最大内存

首先 `Redis` 提供了一个参数 `maxmemory` 来配置 `Redis` 最大使用内存：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209181326831.png" alt="image-20220918132618756" style="zoom:80%;" />

```apl
maxmemory <bytes>
```

```apl
# 获取Redis能使用的最大内存大小
config get maxmemory
#设置Redis最大占用内存大小为100M
config set maxmemory 100mb
```

或者也可以通过命令 `config set maxmemory 1GB` 来动态修改。如果没有设置该参数，那么在 `32` 位的操作系统中 `Redis` 最多使用 `3GB` 内存，而在 `64` 位的操作系统中则不限制

### 设置和获取内存淘汰策略

> PS：淘汰策略也可以直接使用命令 `config set maxmemory-policy <策略>` 来进行动态配置。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209181445045.png" alt="image-20220918144505969" style="zoom:80%;" />

```apl
# 配置文件修改策略
maxmemory-policy allkeys-lru
```

```apl
# 通过配置文件设置淘汰策略（修改redis.conf文件）
config get maxmemory-policy
# 通过命令修改淘汰策略
config set maxmemory-policy allkeys-lru
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208092318829.png" alt="image-20220809231835690" style="zoom:67%;" />

可以看到当前使用的默认的noeviction策略

## 内存过期策略

当内存使用达到上限时，就无法存储更多数据了。为了解决这个问题，Redis提供了一些策略实现内存回收：

- 内存过期策略
- 内存淘汰策略

### 内存过期设置

在学习Redis缓存的时候我们说过，可以通过expire命令给Redis的key设置TTL（存活时间）：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209181327796.png" alt="image-20220918132741711" style="zoom:80%;" />

> 可以发现，当key的TTL到期以后，再次访问name返回的是nil，说明这个key已经不存在了，对应的内存也得到释放。从而起到内存回收的目的。



### 过期策略-DB结构

> Redis本身是一个典型的key-value内存存储数据库，因此所有的key、value都保存在之前学习过的Dict结构中。不过在其database结构体中，有两个Dict：一个用来记录key-value；另一个用来记录key-TTL。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209181428375.png" alt="image-20220918142839279" style="zoom:80%;" />



### 过期删除策略⭐

如果将一个过期的键删除，我们一般都会有三种策略：

#### 惰性删除

> 不管键有没有过期都不主动删除，等到每次去获取键时再判断是否过期，如果过期就删除该键，否则返回键对应的值。这种策略对内存不够友好，可能会浪费很多内存。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209181434462.png" alt="image-20220918143428362" style="zoom:80%;" />

在 `Redis` 当中，其选择的是策略 `2` 和策略 `3` 的综合使用。不过 `Redis` 的定期扫描只会扫描设置了过期时间的键，因为设置了过期时间的键 `Redis` 会单独存储，所以不会出现扫描所有键的情况：

#### 周期删除

> 为每个键设置一个定时器，一旦过期时间到了，周期性的**抽样部分过期的key**，则将键删除。这种策略对内存很友好，但是对 `CPU` 不友好，因为每个定时器都会占用一定的 `CPU` 资源。

- Redis服务初始化函数`initServer()`中设置定时任务，按照server.hz的频率来执行过期key清理，`模式为SLOW`
- Redis的每个事件循环前会调用`beforeSleep()`函数，执行过期key清理，`模式为FAST`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209181437400.png" alt="image-20220918143702301" style="zoom:80%;" />

**SLOW**模式规则：

①执行频率受server.hz影响，默认为10，即每秒执行10次，每个执行周期100ms。

②`执行清理耗时不超过一次执行周期的25%，执行频率默认为10，默认slow模式耗时不超过25ms`

③逐个遍历db，逐个遍历db中的bucket，抽取20个key判断是否过期

④如果没达到时间上限（25ms）并且过期key比例大于10%，再进行一次抽样，否则结束

**FAST**模式规则（过期key比例小于10%不执行 ）：

①执行频率受beforeSleep()调用频率影响，`但两次FAST模式间隔不低于2ms，每次耗时不超过1ms`

②执行清理耗时不超过1ms

③逐个遍历db，逐个遍历db中的bucket，抽取20个key判断是否过期

④如果没达到时间上限（1ms）并且过期key比例大于10%，再进行一次抽样，否则结束

#### 定期扫描

> 系统每隔一段时间就定期扫描一次，发现过期的键就进行删除。这种策略相对来说是上面两种策略的折中方案，需要注意的是这个定期的频率要结合实际情况掌控好，使用这种方案有一个缺陷就是可能会出现已经过期的键也被返回。



## 内存淘汰策略

> **内存淘汰**：就是当Redis内存使用达到设置的上限时，主动挑选**部分key**删除以释放更多内存的流程。Redis会在处理客户端命令的方法processCommand()中尝试做内存淘汰：

### 八大淘汰策略

`Redis` 中提供了 `8` 种淘汰策略

> 注意：如果没有可删除的键对象，内存还是不够时，则报错

| 淘汰策略        | 说明                                                         |
| :-------------- | :----------------------------------------------------------- |
| volatile-lru    | 对设置了TTL的key，基于LFI算法进行淘汰。                      |
| allkeys-lru     | 对全体key，基于LFU算法进行淘汰。                             |
| volatile-lfu    | 对设置了TTL的key，基于LRU算法进行淘汰。                      |
| allkeys-lfu     | 对全体key，基于LRU算法进行淘汰。                             |
| volatile-random | 对设置了TTL的key ，随机进行淘汰。                            |
| allkeys-random  | 对全体key ，随机进行淘汰。                                   |
| volatile-ttl    | 对设置了TTL的key，比较key的剩余TTL值，TTL越小越先被淘汰。    |
| noeviction      | 默认策略，不淘汰任何key，但是内存满时不允许写入新数据，默认就是这种策略 |

### LRU和LFU分析

比较容易混淆的有两个：

- **LRU**（**L**east **R**ecently **U**sed），最少最近使用。用当前时间减去最后一次访问时间，这个值越大则淘汰优先级越高

- **LFU**（**L**east **F**requently **U**sed），最少频率使用。会统计每个key的访问频率，值越小淘汰优先级越高。



### 淘汰逻辑分析

Redis的数据都会被封装为RedisObject结构：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206082242311.png" alt="image-20220608224248227" style="zoom:80%;" />

LFU的访问次数之所以叫做**逻辑访问次数**，是因为并不是每次key被访问都计数，而是通过运算：

①生成0~1之间的随机数R

②计算 (旧次数 * lfu_log_factor + 1)，记录为P

③如果 R < P ，则计数器 + 1，且最大不超过255

④访问次数会随时间衰减，距离上一次访问时间每隔 lfu_decay_time 分钟，计数器 -1

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206082243139.png" alt="image-20220608224342027" style="zoom: 80%;" />



# 数据库和缓存双写一致性⭐⭐

[如何保证数据库和缓存双写一致性？ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU1NTkwODE4Mw==&mid=2247502123&idx=1&sn=1471d2592156dd60274301845ea00188&chksm=fbcfa413ccb82d05ffd6aa4655a8e984ad6ab886cceacfee50900a1b6d52ab5f9010aee0bd27&mpshare=1&scene=23&srcid=0827QldybeWp7rBXVutzf2nS&sharer_sharetime=1661578679538&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

[数据库跟缓存的双写一致性 (qq.com)](https://mp.weixin.qq.com/s?__biz=Mzg2NzYyNjQzNg==&mid=2247486612&idx=1&sn=e3dabdbedafd33192095fdd33cb3c305&chksm=ceb9f03ff9ce7929eb05aebc64a309ecb568ea1c6b5eca396a08f927f0eabec688122b7a3865&scene=21#wechat_redirect)

数据库和缓存（比如：redis）双写数据一致性问题，是一个跟开发语言无关的公共问题。尤其在高并发的场景下，这个问题变得更加严重。

我很负责的告诉大家，该问题无论在面试，还是工作中遇到的概率非常大，所以非常有必要跟大家一起探讨一下。

今天这篇文章我会从浅入深，跟大家一起聊聊，数据库和缓存双写数据一致性问题常见的解决方案，这些方案中可能存在的坑，以及最优方案是什么。

## 1. 一致性问题和常见方案

### 1 读取场景(没啥)

通常情况下，我们使用缓存的主要目的是为了提升查询的性能。大多数情况下，我们是这样使用缓存的：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208271511995.png" alt="image-20220827151102852" style="zoom: 67%;" />

> 1. 用户请求过来之后，先查缓存有没有数据，如果有则直接返回。
> 2. 如果缓存没数据，再继续查数据库。
> 3. 如果数据库有数据，则将查询出来的数据，放入缓存中，然后返回该数据。
> 4. 如果数据库也没数据，则直接返回空。

这是缓存非常常见的用法。一眼看上去，好像没有啥问题。

### 2 更新场景(问题不少)

但你忽略一个非常重要地方：**如果数据库中的某条数据，放入缓存之后，又立马被更新了，那么该如何更新缓存呢？**

不更新缓存行不行？

> 答：当然不行，如果不更新缓存，在很长的一段时间内（决定于缓存的过期时间），用户请求从缓存中获取到的都可能是旧值，而非数据库的最新值。这不是有数据不一致的问题？

更新过程之所以会出现数据不一致问题，有内外两大原因：

- **内部原因**：Redis和MySQL的更新不是天然的原子操作，非事务性的组合拳。
- **外部原因**：实际中的读写请求是并发且无序的，可预测性很差，完全不可控。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101206827.png" alt="image-20221210120614723" style="zoom:50%;" />

### 3 数据不一致的感知

我们来看个实际中的例子，进一步了解缓存系统的数据不一致问题。

平时上下班挤地铁的时候，我们经常会听网易云，比如我喜欢听民谣，所有会关注官方发布的一些民谣歌曲榜单

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101235365.png" alt="image-20221210123508196" style="zoom:67%;" />

这是个非常典型的读多写少的场景，因为歌单是网易云的运营同学配置的，作为用户我们是无法修改的歌单的内容的。

所以假如我是网易云的后端同学，我肯定会把歌单的信息存储在Redis中，缓存下来提高性能，大概可以是这个样子：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101235992.png" alt="image-20221210123542862" style="zoom:80%;" />

假如因为版权问题，运营删除了一首歌，此时更新了MySQL，但是如果Redis中的数据并没有及时被更新，那么就会有一部分用户在歌单中看到本已被删除的歌曲，点击时可能无法播放等。

> **画外音**：这就是缓存和主存储的数据不一致的现象，当然具体网易云是咋实现的，咱也不清楚，上述的场景纯属作者脑补来说明不一致问题的直观实例。

###  4 理性看待不一致问题

数据一致性可以说是分布式系统中必然存在的问题，数据一致性可以分为：

- **强一致性**：时时刻刻保持一致。
- **最终一致性**：允许短暂的不一致，但是最后还是一致的。

要实现缓存和主存储的强一致性，需要借助于复杂的分布式一致性协议等，倒不如不用缓存，毕竟缓存的优势还是读多写少的场景。

> **画外音**：缓存并不是什么万金油，对于写多读少的场景，或许并不是适合用缓存，劝大家不要唯缓存论。

在工程上大部分场景下最终一致性就足够了，因此我们将问题转化为：

> **在保证数据最终一致性的前提下，如何把数据不一致带来的影响降低到业务可接受的范围内。**

### 5 更新还是删除是个问题

当MySQL被更新时，我们如何处理Redis中的老数据呢？

江湖上有两种常见的做法，我们一起来看看：

- `删除操作`：直接将key淘汰掉，是否再次被加载由后续读请求决定，本次只负责删除，只管杀不管埋。
- `更新操作`：直接update发生变化的key，相当于帮后面的请求做了加载的操作，管杀管埋。

可以明确一点删除操作直接操作就行，但是更新操作可能涉及的处理步骤更多，也就是update比delete更复杂。

还有一点，我们需要尽量保证Redis中的数据都是热数据，update每次都会使得数据驻留在Redis中，或许这是没有必要的，因为这些可能是冷数据，至于要加载哪些数据，还是交给后面的请求比较合适。

综上，我们更倾向于将delete操作作为通用的选择，因此文章后续都是基于删除缓存的策略来展开的。

### 6 如何解决不一致问题

那么，我们该如何更新缓存呢？目前有以下4种方案：

1. 先写缓存，再写数据库
2. 先写数据库，再写缓存
3. 先删缓存，再写数据库
4. 先写数据库，再删缓存

接下来，我们详细说说这4种方案。

## 2. 先写缓存，再写数据库(不可取)

对于更新缓存的方案，很多人第一个想到的可能是在写操作中直接更新缓存（写缓存），更直接明了。

那么，问题来了：在写操作中，到底是先写缓存，还是先写数据库呢？

我们在这里先聊聊先写缓存，再写数据库的情况，因为它的问题最严重。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208271512438.png" alt="image-20220827151229350" style="zoom:67%;" />

某一个用户的每一次写操作，如果刚写完缓存，突然网络出现了异常，导致写数据库失败了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208271512445.png" alt="image-20220827151246351" style="zoom:67%;" />

其结果是缓存更新成了最新数据，但数据库没有，这样缓存中的数据不就变成脏数据了？如果此时该用户的查询请求，正好读取到该数据，就会出现问题，因为该数据在数据库中根本不存在，这个问题非常严重。

我们都知道，缓存的主要目的是把数据库的数据临时保存在内存，便于后续的查询，提升查询速度。

但如果某条数据，在数据库中都不存在，你缓存这种“`假数据`”又有啥意义呢？

因此，先写缓存，再写数据库的方案是不可取的，在实际工作中用得不多。

## 3. 先写数据库，再写缓存(不可取)

既然上面的方案行不通，接下来，聊聊先写数据库，再写缓存的方案，该方案在低并发编程中有人在用（我猜的）。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101423024.png" alt="image-20221210142310914" style="zoom:50%;" />

这种模式在更新MySQL和淘汰Redis这段时间内，请求读取的还是Redis的旧数据，不过等MySQL更新完成，就可以立刻恢复一致，影响相对比较小。

但是，假如T0时刻读取的数据在缓存没有，那么触发Cache Miss后会产生回写，假如这个回写动作是在T4时刻完成，那么写入的还是老数据，如图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101424954.png" alt="image-20221210142444846" style="zoom:80%;" />

用户的写操作，先写数据库，再写缓存，可以避免之前“假数据”的问题。但它却带来了新的问题。什么问题呢？

这种情况确实有问题，但是真是好巧不巧：

- 事件A：更新MySQL前出现一个读请求，且缓存中无数据出现cache miss
- 事件B：T3时刻回写Redis的操作才完成，在此之前T2时刻清除了缓存

那么发生问题的概率就是P(A)*P(B)，从实际考虑这种综合事件发生的概率非常低，因为写操作远慢于读操作。

也就是实际场景中上图中更新MySQL&淘汰缓存的操作耗时更久，可以把之前回写到Redis老数据给清除掉。

> **画外音**：先更新MySQL再淘汰Redis的方案，虽然存在小概率不一致问题，但是总体来说工程上是可用的，比如非要说写完MySQL挂了，Redis就没淘汰，这种情况只能说确实有问题。

### 1 写缓存失败了

如果把写数据库和写缓存操作，放在同一个事务当中，当写缓存失败了，我们可以把写入数据库的数据进行回滚。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208271513713.png" alt="image-20220827151330625" style="zoom:67%;" />

如果是并发量比较小，对接口性能要求不太高的系统，可以这么玩。

但如果在高并发的业务场景中，写数据库和写缓存，都属于远程操作。为了防止出现大事务，造成的死锁问题，通常建议写数据库和写缓存不要放在同一个事务中。

也就是说在该方案中，如果写数据库成功了，但写缓存失败了，数据库中已写入的数据不会回滚。

这就会出现：数据库是`新数据`，而缓存是`旧数据`，两边`数据不一致`的情况。

### 2 高并发下的问题

假设在高并发的场景中，针对同一个用户的同一条数据，有两个写数据请求：a和b，它们同时请求到业务系统。

其中请求a获取的是旧数据，而请求b获取的是新数据，如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208271513572.png" alt="image-20220827151347464" style="zoom:80%;" />

1. 请求a先过来，刚写完了数据库。但由于网络原因，卡顿了一下，还没来得及写缓存。
2. 这时候请求b过来了，先写了数据库。
3. 接下来，请求b顺利写了缓存。
4. 此时，请求a卡顿结束，也写了缓存。

很显然，在这个过程当中，请求b在缓存中的`新数据`，被请求a的`旧数据`覆盖了。

也就是说：在高并发场景中，如果多个线程同时执行先写数据库，再写缓存的操作，可能会出现数据库是新值，而缓存中是旧值，两边数据不一致的情况。

### 3 浪费系统资源

该方案还有一个比较大的问题就是：每个写操作，写完数据库，会马上写缓存，比较`浪费系统资源`。

为什么这么说呢？你可以试想一下，如果写的缓存，并不是简单的数据内容，而是要经过非常复杂的计算得出的最终结果。这样每写一次缓存，都需要经过一次非常复杂的计算，不是非常浪费系统资源吗？

尤其是`cpu`和`内存`资源。还有些业务场景比较特殊：`写多读少`。如果在这类业务场景中，每个用的写操作，都需要写一次缓存，有点得不偿失。由此可见，在高并发的场景中，先写数据库，再写缓存，这套方案问题挺多的，也不太建议使用。如果你已经用了，赶紧看看踩坑了没？

## 4. 先删缓存，再写数据库

通过上面的内容我们得知，如果直接更新缓存的问题很多。那么，为何我们不能换一种思路：不去直接更新缓存，而改为删除缓存呢？删除缓存方案，同样有两种：

> 1. 先删缓存，再写数据库
> 2. 先写数据库，再删缓存

我们一起先看看：先删缓存，再写数据库的情况。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101428920.png" alt="image-20221210142830808" style="zoom:50%;" />

- 在T1时刻：Redis和MySQL对于age的值都是18，二者一致;
- 在T2时刻：有更新请求需要设置age=20，此时Redis中就没有age这个数据了；在完成Redis淘汰后，进行MySQL数据更新age=20;

这个方案听着还不错的样子，但是读写请求都是并发的，先后顺序完全无法预测，甚至后发出的请求先处理完成，也是很常见的。

因此就造成一个明显的漏洞：在淘汰Redis的数据完成后，更新MySQL完成之前，这个时间段内如果有新的读请求过来，发现Cache Miss了，就会把旧数据重新写到Redis中，再次造成不一致，并且毫无察觉后续读的都是旧数据。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101429745.png" alt="image-20221210142923605" style="zoom:50%;" />

说白了，在用户的写操作中，先执行删除缓存操作，再去写数据库。这套方案，可以是可以，但也会有一样问题。

> **画外音**：这个方案其实不能说完全没有用，但是至少不完美吧，还可以再想想别的方案。

高并发下的问题

假设在高并发的场景中，同一个用户的同一条数据，有一个读数据请求c，还有另一个写数据请求d（一个更新操作），同时请求到业务系统。如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208271514642.png" alt="image-20220827151436524" style="zoom:80%;" />

1. 请求d先过来，把缓存删除了。但由于网络原因，卡顿了一下，还没来得及写数据库。
2. 这时请求c过来了，先查缓存发现没数据，再查数据库，有数据，但是旧值。
3. 请求c将数据库中的旧值，更新到缓存中。
4. 此时，请求d卡顿结束，把新值写入数据库。

在这个过程当中，请求d的新值并没有被请求c写入缓存，同样会导致缓存和数据库的数据不一致的情况。更正：图中步骤7写入旧值，步骤9要删掉。

那么，这种场景的数据不一致问题，能否解决呢？

## 5 延时双删

在上面的业务场景中，一个读数据请求，一个写数据请求。当写数据请求把缓存删了之后，读数据请求，可能把当时从数据库查询出来的旧值，写入缓存当中。

有人说还不好办，请求d在写完数据库之后，把缓存重新删一次不就行了？

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101420437.png" alt="image-20221210142027332" style="zoom:80%;" />

> 这就是我们所说的`缓存双删`，即在写数据库之前删除一次，写完数据库后，再删除一次。
>

> 该方案有个非常关键的地方是：第二次删除缓存，并非立马就删，而是要在一定的`时间间隔`之后。
>

我们再重新回顾一下，高并发下一个读数据请求，一个写数据请求导致数据不一致的产生过程：

> 1. 请求d先过来，把缓存删除了。但由于网络原因，卡顿了一下，还没来得及写数据库。
> 2. 这时请求c过来了，先查缓存发现没数据，再查数据库，有数据，但是旧值。
> 3. 请求c将数据库中的旧值，更新到缓存中。
> 4. 此时，请求d卡顿结束，把新值写入数据库。
> 5. 一段时间之后，比如：500ms，请求d将缓存删除。

这样来看确实可以解决缓存不一致问题。

**那么，为什么一定要间隔一段时间之后，才能删除缓存呢？**

> 请求d卡顿结束，把新值写入数据库后，请求c将数据库中的旧值，更新到缓存中。
>

> 此时，如果请求d删除太快，在请求c将数据库中的旧值更新到缓存之前，就已经把缓存删除了，这次删除就没任何意义。必须要在请求c更新缓存之后，再删除缓存，才能把旧值及时删除了。
>

> 所以需要在请求d中加一个时间间隔，确保请求c，或者类似于请求c的其他请求，如果在缓存中设置了旧值，最终都能够被请求d删除掉。
>

**接下来，还有一个问题：如果第二次删除缓存时，删除失败了该怎么办？**

这里先留点悬念，后面会详细说。

> 说实话个人觉得，这个方案有点堆操作的感觉，而且设置延时的目的是为了避免思路三的小概率问题，延时设置多久不好确定，二来延时降低了并发性能，同时前置的删除缓存操作起到的作用并不大。

这个方案倒是透露出一种思想：多删几次，可能一致性更有保证，那确实如此。

> **画外音**：这个方案也不是说不行，其实有点麻烦，并且在复杂高并发场景中反而影响性能，要是一般的场景或许也能用起来。

## 5. 先写数据库，再删缓存

从前面得知，先删缓存，再写数据库，在并发的情况下，也可能会出现缓存和数据库的数据不一致的情况。

那么，我们只能寄希望于最后的方案了。

接下来，我们重点看看先写数据库，再删缓存的方案。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208271515125.png" alt="image-20220827151519033" style="zoom:67%;" />

在高并发的场景中，有一个读数据请求，有一个写数据请求，更新过程如下：

1. 请求e先写数据库，由于网络原因卡顿了一下，没有来得及删除缓存。
2. 请求f查询缓存，发现缓存中有数据，直接返回该数据。
3. 请求e删除缓存。

在这个过程中，只有请求f读了一次旧数据，后来旧数据被请求e及时删除了，看起来问题不大。

但如果是读数据请求先过来呢？

1. 请求f查询缓存，发现缓存中有数据，直接返回该数据。
2. 请求e先写数据库。
3. 请求e删除缓存。

这种情况看起来也没问题呀？

答：对的。

但就怕出现下面这种情况，即缓存自己失效了。如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208271515453.png" alt="image-20220827151541329" style="zoom:80%;" />

1. 缓存过期时间到了，自动失效。
2. 请求f查询缓存，发缓存中没有数据，查询数据库的旧值，但由于网络原因卡顿了，没有来得及更新缓存。
3. 请求e先写数据库，接着删除了缓存。
4. 请求f更新旧值到缓存中。

这时，缓存和数据库的数据同样出现不一致的情况了。

但这种情况还是比较少的，需要同时满足以下条件才可以：

1. 缓存刚好自动失效。
2. 请求f从数据库查出旧值，更新缓存的耗时，比请求e写数据库，并且删除缓存的还长。

我们都知道查询数据库的速度，一般比写数据库要快，更何况写完数据库，还要删除缓存。所以绝大多数情况下，写数据请求比读数据情况耗时更长。

由此可见，系统同时满足上述两个条件的概率非常小。

> 推荐大家使用先写数据库，再删缓存的方案，虽说不能100%避免数据不一致问题，但出现该问题的概率，相对于其他方案来说是最小的。

但在该方案中，如果删除缓存失败了该怎么办呢？

## 6. 删缓存失败怎么办？

其实先写数据库，再删缓存的方案，跟缓存双删的方案一样，有一个共同的风险点，即：如果缓存删除失败了，也会导致缓存和数据库的数据不一致。

那么，删除缓存失败怎么办呢？

答：需要加`重试机制`。

在接口中如果更新了数据库成功了，但更新缓存失败了，可以立刻重试3次。如果其中有任何一次成功，则直接返回成功。如果3次都失败了，则写入数据库，准备后续再处理。

当然，如果你在接口中直接`同步重试`，该接口并发量比较高的时候，可能有点影响接口性能。

这时，就需要改成`异步重试`了。

异步重试方式有很多种，比如：

1. 每次都单独起一个线程，该线程专门做重试的工作。但如果在高并发的场景下，可能会创建太多的线程，导致系统OOM问题，不太建议使用。
2. 将重试的任务交给线程池处理，但如果服务器重启，部分数据可能会丢失。
3. 将重试数据写表，然后使用elastic-job等定时任务进行重试。
4. 将重试的请求写入mq等消息中间件中，在mq的consumer中处理。
5. 订阅mysql的binlog，在订阅者中，如果发现了更新数据请求，则删除相应的缓存。

## 7. 定时任务

使用`定时任务重试`的具体方案如下：

1. 当用户操作写完数据库，但删除缓存失败了，需要将用户数据写入重试表中。如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208271516673.png" alt="image-20220827151623477" style="zoom:50%;" />

1. 在定时任务中，异步读取重试表中的用户数据。重试表需要记录一个重试次数字段，初始值为0。然后重试5次，不断删除缓存，每重试一次该字段值+1。如果其中有任意一次成功了，则返回成功。如果重试了5次，还是失败，则我们需要在重试表中记录一个失败的状态，等待后续进一步处理。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208271516828.png" alt="image-20220827151641624" style="zoom: 50%;" />

1. 在高并发场景中，定时任务推荐使用`elastic-job`。相对于xxl-job等定时任务，它可以分片处理，提升处理速度。同时每片的间隔可以设置成：1,2,3,5,7秒等。

使用定时任务重试的话，有个缺点就是实时性没那么高，对于实时性要求特别高的业务场景，该方案不太适用。但是对于一般场景，还是可以用一用的。

但它有一个很大的优点，即数据是落库的，不会丢数据。

## 8. mq

既然直接操作MySQL和Redis都多少存在一些问题，那么能不能引入中间层来解决问题呢？

> 把MySQL的更新操作完成后不直接操作Redis，而是把这个操作命令(消息)扔到一个中间层，然后由Redis自己来消费更新数据，这是一种解耦的异步方案。

> 在高并发的业务场景中，mq（消息队列）是必不可少的技术之一。它不仅可以异步解耦，还能削峰填谷。对保证系统的稳定性是非常有意义的。
>

> mq的生产者，生产了消息之后，通过指定的topic发送到mq服务器。然后mq的消费者，订阅该topic的消息，读取消息数据之后，做业务逻辑处理。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101242431.png" alt="image-20221210124209303" style="zoom:67%;" />

单纯为了更新缓存引入中间件确实有些复杂，但是像MySQL提供了binlog的同步机制，此时Redis就作为Slave进行主从同步，实现数据的更新，成本也还可以接受。

> **画外音**：引入中间层思想真是万金油啊！

使用`mq重试`的具体方案如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208271517664.png" alt="image-20220827151722460" style="zoom: 67%;" />

1. 当用户操作写完数据库，但删除缓存失败了，产生一条mq消息，发送给mq服务器。
2. mq消费者读取mq消息，重试5次删除缓存。如果其中有任意一次成功了，则返回成功。如果重试了5次，还是失败，则写入`死信队列`中。
3. 推荐mq使用`rocketmq`，重试机制和死信队列默认是支持的。使用起来非常方便，而且还支持顺序消息，延迟消息和事务消息等多种业务场景。

当然在该方案中，删除缓存可以完全走异步。即用户的写操作，在写完数据库之后，不用立刻删除一次缓存。而直接发送mq消息，到mq服务器，然后有mq消费者全权负责删除缓存的任务。

因为mq的实时性还是比较高的，因此改良后的方案也是一种不错的选择。

## 9. binlog+mq⭐

前面我们聊过的，无论是定时任务，还是mq（消息队列），做重试机制，对业务都有一定的侵入性。

在使用定时任务的方案中，需要在业务代码中增加额外逻辑，如果删除缓存失败，需要将数据写入重试表。

而使用mq的方案中，如果删除缓存失败了，需要在业务代码中发送mq消息到mq服务器。

其实，还有一种更优雅的实现，即`监听binlog`，比如使用：`canal`等中间件。

具体方案如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208271520146.png" alt="image-20220827152052994" style="zoom:80%;" />

1. 在业务接口中写数据库之后，就不管了，直接返回成功。
2. mysql服务器会自动把变更的数据写入binlog中。
3. binlog订阅者获取变更的数据，然后删除缓存。

这套方案中业务接口确实简化了一些流程，只用关心数据库操作即可，而在binlog订阅者中做缓存删除工作。

但如果只是按照图中的方案进行删除缓存，只删除了一次，也可能会失败。

如何解决这个问题呢？

答：这就需要加上前面聊过的`重试机制`了。如果删除缓存失败，写入重试表，使用定时任务重试。或者写入mq，让mq自动重试。

在这里推荐使用`mq自动重试机制`。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208271521917.png" alt="image-20220827152112739" style="zoom:80%;" />

在binlog订阅者中如果删除缓存失败，则发送一条mq消息到mq服务器，在mq消费者中自动重试5次。如果有任意一次成功，则直接返回成功。如果重试5次后还是失败，则该消息自动被放入死信队列，后面可能需要人工介入。

## 10 设置缓存过期时间

当向Redis写入一条数据时，同时设置过期时间x秒，业务不同过期时间不同。

过期时间到达时Redis就会删掉这条数据，后续读请求Redis出现Cache Miss，进而读取MySQL，然后把数据写到Redis。

如果发生更新操作时，只操作MySQL，那么Redis中的数据更新就只是依赖于过期时间来保底。

换句话说：如果某个key的数据目前在缓存中，当数据发生更新时，只写MySQL并不写Redis，在更新数据后且缓存过期前的这段时间内，读取的数据是不一致的。

> **画外音**：这种方案是最简单的，如果业务对短时间不一致问题并不在意，设置过期时间的方案就足够了，没有必要搞太复杂。



# 缓存更新策略

标题也可以是：`高并发场景下，先更新缓存还是先更新数据库`

在大型系统中，为了减少数据库压力通常会引入缓存机制，一旦引入缓存又很容易造成缓存和数据库数据不一致，导致用户看到的是旧数据。

`为了减少数据不一致的情况，更新缓存和数据库的机制显得尤为重要`，接下来带领大家踩踩坑。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231947646.png" alt="image-20220723194703557" style="zoom: 67%;" />

## Cache aside

`Cache aside`也就是`旁路缓存`，是比较常用的缓存策略。

**（1）`读请求`常见流程**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231949600.png" alt="image-20220723194928495" style="zoom: 33%;" />

应用首先会判断缓存是否有该数据，缓存命中直接返回数据，缓存未命中即缓存穿透到数据库，从数据库查询数据然后回写到缓存中，最后返回数据给客户端。

**（2）`写请求`常见流程**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207231950309.png" alt="image-20220723195003237" style="zoom:40%;" />

首先更新数据库，然后从缓存中删除该数据。

看了写请求的图之后，有些同学可能要问了：为什么要删除缓存，直接更新不就行了？这里涉及到几个坑，我们一步一步踩下去。

## Cache aside踩坑

Cache aside策略如果用错就会遇到深坑，下面我们来逐个踩。

**踩坑一：先更新数据库，再更新缓存**

如果同时有两个`写请求`需要更新数据，每个写请求都先更新数据库再更新缓存，在并发场景可能会出现数据不一致的情况。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207232047536.png" alt="image-20220723204755432" style="zoom:50%;" />

先更新数据库，再更新缓存

如上图的执行过程：

（1）`写请求1`更新数据库，将 age 字段更新为18；

（2）`写请求2`更新数据库，将 age 字段更新为20；

（3）`写请求2`更新缓存，缓存 age 设置为20；

（4）`写请求1`更新缓存，缓存 age 设置为18；

执行完预期结果是数据库 age 为20，缓存 age 为20，结果缓存 age为18，这就造成了缓存数据不是最新的，出现了脏数据。

**踩坑二：先删缓存，再更新数据库**

如果`写请求`的处理流程是`先删缓存再更新数据库`，在一个`读请求`和一个`写请求`并发场景下可能会出现数据不一致情况。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207232049613.png" alt="image-20220723204916505" style="zoom:50%;" />

先删缓存，再更新数据库

如上图的执行过程：

（1）`写请求`删除缓存数据；

（2）`读请求`查询缓存未击中(Hit Miss)，紧接着查询数据库，将返回的数据回写到缓存中；

（3）`写请求`更新数据库。

整个流程下来发现`数据库`中age为20，`缓存`中age为18，缓存和数据库数据不一致，缓存出现了脏数据。

**踩坑三：先更新数据库，再删除缓存**

在实际的系统中针对`写请求`还是推荐`先更新数据库再删除缓存`，但是在理论上还是存在问题，以下面这个例子说明。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207232051323.png" alt="image-20220723205153202" style="zoom:50%;" />

先更新数据库，再删除缓存

如上图的执行过程：

（1）`读请求`先查询缓存，缓存未击中，查询数据库返回数据；

（2）`写请求`更新数据库，删除缓存；

（3）`读请求`回写缓存；

整个流程操作下来发现`数据库age为20`，`缓存age为18`，即数据库与缓存不一致，导致应用程序从缓存中读到的数据都为旧数据。

但我们仔细想一下，上述问题发生的概率其实非常低，因为通常数据库更新操作比内存操作耗时多出几个数量级，上图中最后一步回写缓存（set age 18）速度非常快，通常会在更新数据库之前完成。

如果这种极端场景出现了怎么办？我们得想一个兜底的办法：`缓存数据设置过期时间`。通常在系统中是可以允许少量的数据短时间不一致的场景出现。

## Read through

在 Cache Aside 更新模式中，应用代码需要维护两个数据源头：一个是缓存，一个是数据库。而在 `Read-Through` 策略下，应用程序无需管理缓存和数据库，只需要将数据库的同步委托给缓存提供程序 `Cache Provider` 即可。所有数据交互都是通过`抽象缓存层`完成的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207232052118.png" alt="image-20220723205226008" style="zoom:67%;" />

如上图，应用程序只需要与`Cache Provider`交互，不用关心是从缓存取还是数据库。

在进行大量读取时，`Read-Through` 可以减少数据源上的负载，也对缓存服务的故障具备一定的弹性。如果缓存服务挂了，则缓存提供程序仍然可以通过直接转到数据源来进行操作。

`Read-Through 适用于多次请求相同数据的场景`，这与 Cache-Aside 策略非常相似，但是二者还是存在一些差别，这里再次强调一下：

- 在 Cache-Aside 中，应用程序负责从数据源中获取数据并更新到缓存。
- 在 Read-Through 中，此逻辑通常是由独立的缓存提供程序（Cache Provider）支持。

## Write through

`Write-Through` 策略下，当发生数据更新(Write)时，缓存提供程序 `Cache Provider` 负责更新底层数据源和缓存。

缓存与数据源保持一致，并且写入时始终通过`抽象缓存层`到达数据源。

`Cache Provider`类似一个代理的作用。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207232052517.png" alt="image-20220723205245424" style="zoom:67%;" />

## Write behind

`Write behind`在一些地方也被成为`Write back`， 简单理解就是：应用程序更新数据时只更新缓存， `Cache Provider`每隔一段时间将数据刷新到数据库中。说白了就是`延迟写入`。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207232053999.png" alt="image-20220723205311901" style="zoom:67%;" />

如上图，应用程序更新两个数据，Cache Provider 会立即写入缓存中，但是隔一段时间才会批量写入数据库中。

这种方式有优点也有缺点：

- `优点`是数据写入速度非常快，适用于频繁写的场景。
- `缺点`是缓存和数据库不是强一致性，对一致性要求高的系统慎用。

总结一下

学了这么多，相信大家对缓存更新的策略都已经有了清晰的认识。最后稍稍总结一下。

缓存更新的策略主要分为三种：

- Cache aside
- Read/Write through
- Write behind

Cache aside 通常会先更新数据库，然后再删除缓存，为了兜底通常还会将数据设置缓存时间。

Read/Write through 一般是由一个 Cache Provider 对外提供读写操作，应用程序不用感知操作的是缓存还是数据库。

Write behind简单理解就是延迟写入，Cache Provider 每隔一段时间会批量输入数据库，优点是应用程序写入速度非常快。



# Redis 阻塞情况

## 命令阻塞

使用不当的命令造成客户端阻塞：

- keys * ：获取所有的 key 操作；
- Hgetall：返回哈希表中所有的字段和；
- smembers：返回集合中的所有成员；

这些命令时间复杂度是O(n)，有时候也会全表扫描，随着n的增大耗时也会越大从而导致客户端阻塞。

## SAVE 阻塞

大家都知道 Redis 在进行 RDB 快照的时候，会调用系统函数 fork() ，创建一个子线程来完成临时文件的写入，而触发条件正是配置文件中的 save 配置。

当达到我们的配置时，就会触发 bgsave 命令创建快照，这种方式是不会阻塞主线程的，而手动执行 save 命令会在主线程中执行，**阻塞**主线程。

## 同步持久化

当 Redis 直接记录 AOF 日志时，如果有大量的写操作，并且配置为同步持久化

```
appendfsync always
```

即每次发生数据变更会被立即记录到磁盘，因为写磁盘比较耗时，性能较差，所以有时会阻塞主线程。

## AOF 重写

1. fork 出一条子线程来将文件重写，在执行 `BGREWRITEAOF` 命令时，Redis 服务器会维护一个 AOF 重写缓冲区，该缓冲区会在子线程创建新 AOF 文件期间，记录服务器执行的所有写命令。
2. 当子线程完成创建新 AOF 文件的工作之后，服务器会将重写缓冲区中的所有内容追加到新 AOF 文件的末尾，使得新的 AOF 文件保存的数据库状态与现有的数据库状态一致。
3. 最后，服务器用新的 AOF 文件替换旧的 AOF 文件，以此来完成 AOF 文件重写操作。

阻塞就是出现在第2步的过程中，将缓冲区中新数据写到新文件的过程中会产生**阻塞**。

## AOF 日志

AOF 的日志记录不像关系型数据库那样在执行命令之前记录日志（方便故障恢复），而是采用先执行命令后记录日志的方式。

原因就是 AOF 记录日志是不会对命令进行语法检查的，这样就能减少额外的检查开销，不会对当前命令的执行产生阻塞，但可能会给下一个操作带来阻塞风险。

**这是因为 AOF 日志也是在主线程中执行的**，如果在把日志文件写入磁盘时，磁盘写压力大，就会导致写盘很慢，进而导致后续的操作也无法执行了。

## 大 Key 问题

大 key 并不是指 key 的值很大，而是 key 对应的 value 很大。

大 key 造成的阻塞问题如下：

- 客户端超时阻塞：由于 Redis 执行命令是单线程处理，然后在操作大 key 时会比较耗时，那么就会阻塞 Redis，从客户端这一视角看，就是很久很久都没有响应。
- 引发网络阻塞：每次获取大 key 产生的网络流量较大，如果一个 key 的大小是 1 MB，每秒访问量为 1000，那么每秒会产生 1000MB 的流量，这对于普通千兆网卡的服务器来说是灾难性的。
- 阻塞工作线程：如果使用 del 删除大 key 时，会阻塞工作线程，这样就没办法处理后续的命令。

### 查找大 key

当我们在使用 Redis 自带的 `--bigkeys` 参数查找大 key 时，最好选择在从节点上执行该命令，因为主节点上执行时，会**阻塞**主节点。

- 我们还可以使用 SCAN 命令来查找大 key；

- 通过分析 RDB 文件来找出 big key，这种方案的前提是 Redis 采用的是 RDB 持久化。网上有现成的工具：

- - redis-rdb-tools：Python 语言写的用来分析 Redis 的 RDB 快照文件用的工具
  - rdb_bigkeys：Go 语言写的用来分析 Redis 的 RDB 快照文件用的工具，性能更好。

## 删除大 key

删除操作的本质是要释放键值对占用的内存空间。

释放内存只是第一步，为了更加高效地管理内存空间，在应用程序释放内存时，**操作系统需要把释放掉的内存块插入一个空闲内存块的链表**，以便后续进行管理和再分配。这个过程本身需要一定时间，而且会**阻塞**当前释放内存的应用程序。

所以，如果一下子释放了大量内存，空闲内存块链表操作时间就会增加，相应地就会造成 Redis **主线程的阻塞**，如果主线程发生了阻塞，其他所有请求可能都会超时，超时越来越多，会造成 Redis 连接耗尽，产生各种异常。

> 删除大 key 时建议采用分批次删除和异步删除的方式进行。

## 清空数据库

清空数据库和上面 bigkey 删除也是同样道理，flushdb、flushall 也涉及到删除和释放所有的键值对，是 Redis 阻塞点

## 集群扩容

Redis 集群可以进行节点的动态扩容缩容，这一过程目前还处于**半自动**状态，需要人工介入。

在扩缩容的时候，需要进行数据迁移。而 Redis 为了保证迁移的一致性，迁移所有操作都是**同步**操作。

执行迁移时，两端的 Redis 均会进入时长不等的**阻塞**状态，对于小Key，该时间可以忽略不计，但如果一旦 Key 的内存使用过大，严重的时候会触发集群内的故障转移，造成不必要的切换。







# Java客户端

在Redis官网中提供了各种语言的客户端，地址：https://redis.io/clients

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205042034494.png" alt="image-20220504203402416" style="zoom:80%;" />



<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205042034563.png" alt="image-20220504203435492" style="zoom:67%;" />



# Jedis

Jedis 是老牌Redis 的 Java 客户端，提供了比较全面的 Redis 命令的操作支持，是目前使用最广泛的客户端

官方：https://github.com/redis/jedis

文档：https://www.javadoc.io/doc/redis.clients/jedis/latest/index.html

> 优点很突出：比较全面的提供了 Redis 的操作特性，也就是说你能用 redis 命令操作的，Jedis 包都也给你封装好了。使用广泛，易上手

当然，缺点也有：

> - Jedis 客户端实例不是线程安全的，需要借助连接池来管理和使用 Jedis
> - 使用阻塞的I/O，方法调用都是同步，程序流需要等到 sockets 处理完 I/O 才能执行，不支持异步

如何在项目中集成 Jedis 呢？请看下文！

## 快速入门

### 引入依赖

功能：就是使用java来操作redis,创建maven工程，引入Jedis依赖

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>4.3.1</version>
</dependency>
```

### 创建和关闭连接

```java
private Jedis jedis;

@BeforeEach
void setUp() throws Exception {
    // 1.构造一个 Jedis 对象，因为这里使用的默认端口 6379，所以不用配置端口
    jedis = new Jedis("192.168.88.101", 6379);
    // 2.密码认证
    // jedis.auth("111111");
    // 3.测试是否连接成功
    String ping = jedis.ping();
    // 4.返回 pong 表示连接成功
    System.out.println(ping);
}

@AfterEach
void tearDown() throws Exception {
    if (jedis != null) {
        jedis.close();
    }
}
```

### 测试增删

```java
@Test
void setJedis() {
    // 1.设置字符串
    String res = jedis.set("name", "张三");
    System.out.println(res);
    // 2.获取字符串
    String name = jedis.get("name");
    System.out.println("name = " + name);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306151634049.png" alt="image-20230615163402974" style="zoom:80%;" />

```JAVA
@Test
void testHash() {
    jedis.hset("user:1","name", "张三");
    jedis.hset("user:1","age", "33");
    // 获取所有的属性
    jedis.hgetAll("user:1").forEach((k, v) -> System.out.println(k + " = " + v));
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306151637156.png" alt="image-20230615163735080" style="zoom:80%;" />

> 对于 Jedis 而言，一旦连接上了 Redis 服务器，剩下的操作就非常容易了，**由于 Jedis 中的 API 和 Redis 的命令高度一致，所以，Jedis 中的方法见名知意，直接使用即可**。

## 连接池

> 虽然 redis 服务端是单线程操作，但是在实际项目中，使用 Jedis 对象来操作 redis 时，每次操作都需要新建/关闭 TCP 连接，连接资源开销很高，同时 Jedis 对象的个数不受限制，在极端情况下可能会造成连接泄漏，同时 Jedis 存在多线程不安全的问题。

```java
public class JedisConnectionFactory {
    private static final JedisPool jedisPool;
    static {
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        // 最大连接
        jedisPoolConfig.setMaxTotal(8);
        // 最大空闲连接
        jedisPoolConfig.setMaxIdle(8);
        // 最小空闲连接
        jedisPoolConfig.setMinIdle(0);
        // 设置最长等待时间， ms
        jedisPoolConfig.setMaxWait(Duration.ofMillis(200));
        // 有密码就跟着写就行，没有就不设置
        jedisPool = new JedisPool(jedisPoolConfig, "192.168.88.101", 6379, 
                                  1000,"315217");
    }

    // 获取Jedis对象
    public static Jedis getJedis(){
        return jedisPool.getResource();
    }
}
```

> 只需要修改下面的连接即可，其他不变

```java
@BeforeEach
void setUp() throws Exception {
    // 1.构造一个 Jedis 对象，因为这里使用的默认端口 6379，所以不用配置端口
    // 修改这里使用连接池即可
    jedis = JedisConnectionFactory.getJedis();
    // 2.密码认证
    // jedis.auth("111111");
    // 3.测试是否连接成功
    String ping = jedis.ping();
    // 4.返回 pong 表示连接成功
    System.out.println(ping);
}
```

## 验证码案例

> 1、输入手机号，点击发送后随机生成6位数字码，2分钟有效
>
> 2、输入验证码，点击验证，返回成功或失败
>
> 3、每个手机号每天只能输入3次

![image-20210917151726227](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210917151726227.png)



```java
package com.it.jedis;

import redis.clients.jedis.Jedis;

import java.util.Random;

public class PhoneCode {
    public static void main(String[] args) {
        //模拟验证码发送
		//verifyCode("17315118674");

        Jedis jedis = new Jedis("127.0.0.1",6379);
        // 获取正确的验证码
        String code = jedis.get("VerifyCode17315118674:code");
        System.out.println(code);
        //进行判断验证码正确性
        getRedisCode("17315118674",code);

    }

    //3、验证码校验
    public static void getRedisCode(String phone,String code){
        //从redis获取验证码
        Jedis jedis = new Jedis("127.0.0.1",6379);
        //验证码key
        String codeKey = "VerifyCode"+phone+":code";
        String redisCode = jedis.get(codeKey);
        //判断
        if (redisCode.equals(code)){
            System.out.println("成功");
        }else {
            System.out.println("失败");
        }
        jedis.close();
    }

    //2、每个手机号每天只能发三次，验证码放到redis中，设置过期时间
    public static void verifyCode(String phone){
        //连接redis
        Jedis jedis = new Jedis("127.0.0.1",6379);
        //拼接key
        //手机发送次数key
        String countKey = "VerifyCode"+phone+":count";
        //验证码key
        String codeKey = "VerifyCode"+phone+":code";

        //每个手机只能发送三次
        String count = jedis.get(countKey);
        if (count == null){
            //没有发送次数，第一次发送
            //设置发送次数是1
            jedis.setex(countKey,24*60*60,"1");
        }else if (Integer.parseInt(count)<=2){
            //发送次数+1
            jedis.incr(countKey);
        }else if (Integer.parseInt(count)>2){
            //发送三次，不能再发送
            System.out.println("今天已经超过三次了");
            jedis.close();
        }
        //验证码放到redis里面
        String vcode = getCode();
        jedis.setex(codeKey,120,vcode);
        jedis.close();
    }

    //1、生成6位验证码
    public static String getCode(){
        Random random = new Random();
        String code = "";
        for (int i = 0; i < 6; i++) {
            int rand = random.nextInt(10);
            code += rand;
        }
        return code;
    }
}
```



## 集群配置

> 在实际的项目生产环境中，redis 通常不是以单台服务实例来运行的，因为一旦服务器挂了，可能所有的下游服务都会受到影响，因此为了保障单台服务器即使出现故障也能运行，通常运维组会搭建集群环境，来保证服务高可用。

搭建的方式有两种，哨兵模式和 Cluster 模式。

> - 哨兵模式：对redis服务器进行监控，如果有宕机的，就从备机里面选一个出来作为主机
> - Cluster 模式：将数据进行分片存储，避免全部节点数据都一样，浪费空间

### 哨兵模式

哨兵模式简单的说，就是一台主机，一台备机，外加一台监控服务，当监控服务观测到主机已经宕机，就会将备用机切换成主机，以便继续提供服务。

```java
public class RedisPoolUtils {

    private static Jedis jedis;

    private static JedisSentinelPool jedisSentinelPool;

    static{
        try {
            JedisPoolConfig config = new JedisPoolConfig();
            //最大空闲连接数, 默认8个
            config.setMaxIdle(8);
            //最大连接数, 默认8个
            config.setMaxTotal(8);
            //最小空闲连接数, 默认0
            config.setMinIdle(0);
            //获取连接时的最大等待毫秒数(如果设置为阻塞时BlockWhenExhausted),
            //如果超时就抛异常, 小于零:阻塞不确定的时间,  默认-1
            config.setMaxWaitMillis(3000);
            //在获取连接的时候检查有效性,表示取出的redis对象可用, 默认false
            config.setTestOnBorrow(true);


            //redis服务器列表
            Set<String> sentinels = new HashSet<>();
            sentinels.add(new HostAndPort("192.168.43.212", 26379).toString());
            sentinels.add(new HostAndPort("192.168.43.213", 26379).toString());
            sentinels.add(new HostAndPort("192.168.43.214", 26379).toString());

            //初始化连接池
            jedisSentinelPool = new JedisSentinelPool("mymaster", sentinels, 
                                                      config, "111111");
            // 从池中获取一个Jedis对象
            jedis = jedisSentinelPool.getResource();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
}
```

### 集群模式

为了保证高可用，redis-cluster集群通常会引入主从复制模型，一个主节点对应一个或者多个从节点，当主节点宕机的时候，就会启用从节点。

```java
public class RedisPoolUtils {

    static{
        try {
            JedisPoolConfig config = new JedisPoolConfig();
            //最大空闲连接数, 默认8个
            config.setMaxIdle(8);
            //最大连接数, 默认8个
            config.setMaxTotal(8);
            //最小空闲连接数, 默认0
            config.setMinIdle(0);
            //获取连接时的最大等待毫秒数(如果设置为阻塞时BlockWhenExhausted),
            //如果超时就抛异常, 小于零:阻塞不确定的时间,  默认-1
            config.setMaxWaitMillis(3000);
            //在获取连接的时候检查有效性,表示取出的redis对象可用, 默认false
            config.setTestOnBorrow(true);

            Set<HostAndPort> nodes = new HashSet<>();
            nodes.add(new HostAndPort("192.168.43.212", 26379));
            nodes.add(new HostAndPort("192.168.43.213", 26379));
            nodes.add(new HostAndPort("192.168.43.214", 26379));

            JedisCluster jedisCluster = new JedisCluster(nodes, config);
            jedisCluster.set("key", "hello world");

            jedisCluster.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```



# SpringDataRedis ⭐

> SpringData是Spring中数据操作的模块，包含对各种数据库的集成，其中对Redis的集成模块就叫做SpringDataRedis，官网地址：https://spring.io/projects/spring-data-redis

> - 提供了对不同Redis客户端的整合（Lettuce和Jedis）
>
> - 提供了RedisTemplate统一API来操作Redis
>
> - 支持Redis的发布订阅模型
>
> - 支持Redis哨兵和Redis集群
>
> - 支持基于Lettuce的响应式编程
>
> - 支持基于JDK、JSON、字符串、Spring对象的数据序列化及反序列化
>
> - 支持基于Redis的JDKCollection实现

## 快速入门

SpringDataRedis中提供了RedisTemplate工具类，其中封装了各种对Redis的操作。并且将不同数据类型

的操作API封装到了不同的类型中：

![image-20220303172431308](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220303172431308.png)

### 引入依赖

```xml
<!--Redis依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<!--连接池依赖-->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```

### 配置文件

```yml
spring:
  redis:
     port: 6379
     host: 192.168.88.101
     database: 0 #操作的是0号数据库
     password: 315217
     lettuce: # 默认连接池，不写不生效
       pool:
         max-active: 8  # 最大连接（使用负值表示没有限制）
         max-idle: 8    # 最大空闲连接
         min-idle: 0    # 最小空闲连接
         max-wait: 100ms # 连接等待时间(负数表示没限制)
         time-between-eviction-runs: 10s #每10s运行一次空闲连接回收器(独立线程) 
```

### 注入测试

```java
@SpringBootTest
public class RedisTest {

    @Resource
    private RedisTemplate<String, Object> redisTemplate;

    @Test
    void testString() {
        // 插入一条string类型数据
        redisTemplate.opsForValue().set("name", "李四");
        // 读取一条string类型数据
        Object name = redisTemplate.opsForValue().get("name");
        System.out.println("name = " + name);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306152115431.png" alt="image-20230615211552308" style="zoom:80%;" />

## 序列化

### 为什么序列化

> RedisTemplate可以接收任意Object作为值写入Redis，只不过写入前会把Object序列化为字节形式，默认是采用JDK序列化，得到的结果是这样的：

![image-20220303173049972](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220303173049972.png)

> 缺点：可读性差、内存占用较大、最重要的是无法直接读取

### 自动序列化

> 我们可以自定义RedisTemplate的序列化方式，代码如下：

```java
@Configuration
public class RedisConfig {
    @Bean
    public RedisTemplate<String,Object> redisTemplate(LettuceConnectionFactory
                                                      lettuceConnectionFactory){
        // 创建redisTemplate
        RedisTemplate<String,Object> redisTemplate = new RedisTemplate<>();
        // 设置连接工厂
        redisTemplate.setConnectionFactory(lettuceConnectionFactory);
        //设置key序列化方式string
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        //设置value的序列化方式json
        redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer());
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashValueSerializer(new
                GenericJackson2JsonRedisSerializer());
        redisTemplate.afterPropertiesSet();
        return redisTemplate;
    }
}
```

> 序列号完成后，进行测试，保存数据(对象类型)

```java
@Override
public Boolean save(admin admin) {
    //1 先插入mysql并成功
    int i = adminMapper.insert(admin);
    if(i > 0)
    {
        //2 需要再次查询一下mysql将数据捞回来并ok
        admin = adminMapper.selectById(admin.getId());
        //3 将捞出来的user存进redis，完成新增功能的数据一致性。
        String key = CACHE_KEY_USER+admin.getId();
        redisTemplate.opsForValue().set(key,admin);
    }

    // 插入删除等操作返回的都是影响行数，即是数字。那么则大于0为真，其他情况为假
    return true;
}
```

> 查询数据(对象)

```java
@Override
public admin getById(Integer id) {
    admin ad = null;
    String key = CACHE_KEY_USER+id;
    //1 先从redis里面查询，如果有直接返回结果，如果没有再去查询mysql
    ad  = (admin) redisTemplate.opsForValue().get(key);
    System.out.println(ad);
    if (ad == null){
        //2 redis里面无，继续查询mysql
        ad = adminMapper.selectById(id);
        if (ad == null){
            //3.1 redis+mysql 都无数据
            //你具体细化，防止多次穿透，我们规定，记录下导致穿透的这个key回写redis
            return ad;
        }else {
            //3.2 mysql有，需要将数据写回redis，保证下一次的缓存命中率
            redisTemplate.opsForValue().set(key,ad);
        }
    }
    return ad;
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220303182031944.png" alt="image-20220303182031944" style="zoom:67%;" />

> 查询所有

```java
@Override
public List<admin> getAll() {
    List<admin> admins = null;
    List<admin> all = (List<admin>) redisTemplate.opsForValue().get("all");
    if (all == null){
        admins = adminMapper.selectList(null);
        if (admins == null) {
            return null;
        }else {
            redisTemplate.opsForValue().set("all",admins);
        }
    }
    return admins;
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220303181631969.png" alt="image-20220303181631969" style="zoom: 50%;" />

> 尽管JSON的序列化方式可以满足我们的需求，但依然存在一些问题，如图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220303183028063.png" alt="image-20220303183028063" style="zoom:67%;" />

> 为了在反序列化时知道对象的类型，`JSON序列化器会将类的class类型写入json结果中`，存入Redis，会带来额外的内存开销。

### 手动序列化⭐

> 为了节省内存空间，我们并不会使用JSON序列化器来处理value，而是统一使用String序列化器，要求只能存储String类型的key和value。当需要存储Java对象时，手动完成对象的序列化和反序列化。

> `这样就不用上面的配置类了，但是写序列化和反序列化稍烦`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220303183201118.png" alt="image-20220303183201118" style="zoom:80%;" />



> Spring默认提供了一个**StringRedisTemplate**类，它的key和value的序列化方式默认就是String方式。省去了我们自定义RedisTemplate的过程

```java
@Resource
private StringRedisTemplate stringRedisTemplate;
//JSON工具
private static final ObjectMapper mapper = new ObjectMapper();

@Test
void testString2() throws JsonProcessingException {
    // 准备对象
    User user = new User("任硕", 18);
    // 手动转换为json
    String json = mapper.writeValueAsString(user);
    // 插入一条string类型数据
    stringRedisTemplate.opsForValue().set("user:200", json);
    // 读取一条string类型数据
    String val = stringRedisTemplate.opsForValue().get("user:200");
    // 反序列化
    User user1 = mapper.readValue(val, User.class);
    System.out.println("user1 = " + user1);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306152130724.png" alt="image-20230615213040665" style="zoom:80%;" />

### 序列化Cache方法

> 就是使用@Cache注解方式来实现缓存操作的

```java
@Bean
public CacheManager cacheManager(RedisConnectionFactory factory) {
    // 解决查询缓存转换异常的问题
    ObjectMapper om = new ObjectMapper();
    //POJO无public的属性或方法时，不报错
    om.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
    // null值字段不显示
    om.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
    // 序列化JSON串时，在值上打印出对象类型
    // om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
    // 替换上方 过期的enableDefaultTyping
    om.activateDefaultTyping(LaissezFaireSubTypeValidator.instance ,
                             ObjectMapper.DefaultTyping
                             .NON_FINAL, JsonTypeInfo.As.WRAPPER_ARRAY);
    new Jackson2JsonRedisSerializer<>(Object.class).setObjectMapper(om);
    // 解决jackson2无法反序列化LocalDateTime的问题
    om.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    om.registerModule(new GeoModule());

    // 配置序列化（解决乱码的问题）
    RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
            // 默认 30天过期
            .entryTtl(Duration.ofDays(30))
            .serializeKeysWith(RedisSerializationContext.SerializationPair
                               .fromSerializer(new StringRedisSerializer()))
            .serializeValuesWith(RedisSerializationContext.SerializationPair
                                 .fromSerializer(new 
                                                 GenericJackson2JsonRedisSerializer()))
            .disableCachingNullValues();

    return RedisCacheManager.builder(factory)
            .cacheDefaults(config)
            .build();
}
```



## 通用操作

### 获取所有key|判断value类型

```java
/**
 * 通用操作，针对不同的数据类型都可以操作
*/
@Test
public void testCommon(){
    //获取Redis中所有的key
    Set<String> keys = redisTemplate.keys("*");
    for (String key : keys) {
        System.out.println(key);
    }

    //判断某个key是否存在
    Boolean itcast = redisTemplate.hasKey("itcast");
    System.out.println(itcast);

    //删除指定key
    redisTemplate.delete("myZset");

    //获取指定key对应的value的数据类型
    DataType dataType = redisTemplate.type("myset");
    System.out.println(dataType.name());

}
```

这些方法在以下这几种类型中是通用的

提前注入RedisTemplate

```java
@Autowired
private RedisTemplate<String, Object> redisTemplate;
```

### 删除单个key

```java
//删除key
public void delete(String key){
    redisTemplate.delete(key);
}
//进行使用
//进行删除key
redisTemplate.delete("name");
```

### 删除多个key

```java
//删除多个key
public void deleteKey (String ...keys){
    redisTemplate.delete(keys);
}
//进行使用
//删除多个key，传入的是集合元素
redisTemplate.delete(Arrays.asList("name1","name2"));
```

### 指定key的失效时间

```java
//指定key的失效时间
public void expire(String key,long time){
    redisTemplate.expire(key,time,TimeUnit.MINUTES);
}
//进行使用
//设置过期时间,25秒
redisTemplate.boundValueOps("id").set("2",25, TimeUnit.SECONDS);
//4、单独设置过期时间
//注意：值前面已经设置过了
redisTemplate.boundValueOps("name").expire(10,TimeUnit.MINUTES);
redisTemplate.expire("name1",10,TimeUnit.MINUTES);
```

### 根据key获取过期时间

```java
//根据key获取过期时间
public long getExpire(String key){
    Long expire = redisTemplate.getExpire(key);
    return expire;
}
//进行使用
//获取过期时间,-2表示永久过期，否则显示剩余秒数
Long t = redisTemplate.getExpire("name");
System.out.println(t);
```

### 判断key是否存在

```java
//判断key是否存在
public boolean hasKey(String key){
    return redisTemplate.hasKey(key);
}
//进行使用
Boolean zSetKey1 = redisTemplate.hasKey("zSetKey");
System.out.println(zSetKey1);
```



## 准备数据

### 依赖

```xml
<dependencies>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>

    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>3.4.3</version>
    </dependency>

    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>5.1.47</version>
    </dependency>

    <dependency>
        <groupId>org.apache.commons</groupId>
        <artifactId>commons-pool2</artifactId>
    </dependency>
    
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```

### application.yml

```yml
spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://127.0.0.1:3306/hmdp?useSSL=false&serverTimezone=UTC
    username: root
    password: 123456
  redis:
    port: 6379
    host: 127.0.0.1
    lettuce: # 默认连接池，不写不生效
      pool:
        max-active: 8  # 最大连接
        max-idle: 8    # 最大空闲连接
        min-idle: 0    # 最小空闲连接
        max-wait: 100ms # 连接等待时间
        time-between-eviction-runs: 10s #每10s运行一次空闲连接回收器(独立线程)
```

### 实体类

```java
@Data
public class boys {
    private int id;
    @TableField("boyName")
    private String boyName;
    @TableField("userCP")
    private int userCP;
    private int sex;
}
```

### mapper

```java
@Mapper
public interface boysMapper extends BaseMapper<boys> {
}
```

### 序列化

```java
@Bean
public RedisTemplate<String,Object> redisTemplate(LettuceConnectionFactory lettuceConnectionFactory)
{
    RedisTemplate<String,Object> redisTemplate = new RedisTemplate<>();

    redisTemplate.setConnectionFactory(lettuceConnectionFactory);
    //设置key序列化方式string
    redisTemplate.setKeySerializer(new StringRedisSerializer());
    //设置value的序列化方式json
    redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer());
    redisTemplate.setHashKeySerializer(new StringRedisSerializer());
    redisTemplate.setHashValueSerializer(new
            GenericJackson2JsonRedisSerializer());
    redisTemplate.afterPropertiesSet();
    return redisTemplate;
}
```



### 查询测试

```java
@Resource
private RedisTemplate<String, Object> redisTemplate;

@Resource
private boysMapper boysMapper;
```

```java
@Test
public void test(){
    List<boys> list = boysMapper.selectList(null);
    list.forEach(System.out::println);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205080952770.png" alt="image-20220508095226714" style="zoom:80%;" />



## String类型

### 存储值

```java
/**
 * 操作String类型数据
*/
@Test
public void testString(){
    //存值
    redisTemplate.opsForValue().set("city123","beijing");

    //取值
    String value = (String) redisTemplate.opsForValue().get("city123");
    System.out.println(value);

    //存值，同时设置过期时间
    redisTemplate.opsForValue().set("key1","value1",10l, TimeUnit.SECONDS);

    //存值，如果存在则不执行任何操作
    Boolean aBoolean = redisTemplate.opsForValue().setIfAbsent("city1234", "nanjing");
    System.out.println(aBoolean);
}
```

使用手动序列化存储数据库字段

```java
//注意：是StringRedisTemplate
@Resource
private StringRedisTemplate stringRedisTemplate;
//手动序列化
final ObjectMapper  mapper = new ObjectMapper();
//数据库查询
@Resource
private boysMapper boysMapper;
```

```java
@Test
public void setBoys() {
    boys list = boysMapper.selectById(2);
    try {
        String s = mapper.writeValueAsString(list);
        stringRedisTemplate.opsForValue().set("hmdp:boys:2",s);
    } catch (JsonProcessingException e) {
        e.printStackTrace();
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205072115826.png" alt="image-20220507211551757" style="zoom:80%;" />

加上过期时间

10s后过期

```apl
stringRedisTemplate.opsForValue().set("hmdp:boys:2",s,10, TimeUnit.SECONDS);
```

使用自定序列化(必须加载那个序列化bean，不然存入的全是二进制)

```java
@Test
public void setBoys1() {
    boys list = boysMapper.selectById(2);
    redisTemplate.opsForValue().set("hmdp:boys:2",list);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205072122374.png" alt="image-20220507212218312" style="zoom:80%;" />

加上过期时间

10s后过期

```java
redisTemplate.opsForValue().set("hmdp:boys:2",list,10,TimeUnit.SECONDS);
```

### 获取值

```java
@Test
public void getOne() {
    Object b1 = redisTemplate.opsForValue().get("hmdp:boys:2");
    System.out.println(b1);
}
```

```apl
boys(id=2, boyName=张飞, userCP=10, sex=1)
```



### 更新值

其实就是再次存储即可

```java
@Test
public void UpdateOne() {
    boys b1 = new boys();
    b1.setBoyName("张三");
    b1.setUserCP(12);
    b1.setSex(1);
    //存入Redis
    redisTemplate.opsForValue().set("hmdp:boys:2",b1);
    Object b = redisTemplate.opsForValue().get("hmdp:boys:2");
    //存入数据库
    boysMapper.insert((boys) b);
}
```



### 其他方法测试

```java
@Test
public void TestString(){
    //获取过期时间,-2表示永久过期，否则显示剩余秒数
    Long t = redisTemplate.getExpire("hmdp:boys:2");
    System.out.println(t);

    //进行删除key
    redisTemplate.delete("hmdp:boys:2");
    //删除多个key，传入的是集合元素
    redisTemplate.delete(Arrays.asList("hmdp:boys:2","hmdp:boys:2"));

    //判断key是否存在
    Boolean b = redisTemplate.hasKey("hmdp:boys:2");
    System.out.println(b);
}
```



## Hash类型

### 存储值

```java
/**
 * 操作Hash类型数据
*/
@Test
public void testHash(){
    HashOperations hashOperations = redisTemplate.opsForHash();

    //存值
    hashOperations.put("002","name","xiaoming");
    hashOperations.put("002","age","20");
    hashOperations.put("002","address","bj");

    //取值
    String age = (String) hashOperations.get("002", "age");
    System.out.println(age);

    //获得hash结构中的所有字段
    Set keys = hashOperations.keys("002");
    for (Object key : keys) {
        System.out.println(key);
    }

    //获得hash结构中的所有值
    List values = hashOperations.values("002");
    for (Object value : values) {
        System.out.println(value);
    }
}
```

#### 存储普通值

```java
@Test
public void setHash() {
    redisTemplate.opsForHash().put("map","name","任硕");
    redisTemplate.opsForHash().put("map","age","12");
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205072131990.png" alt="image-20220507213118927" style="zoom: 80%;" />



#### 存储map(常用)

```java
@Test
public void setHash1() {
    //通过Map插入值
    HashMap<String, Object> map = new HashMap<>();
    map.put("name","张三");
    map.put("password","123456");

    //加入对象，这和插入数据库对象一样
    boys b = boysMapper.selectById(2);
    map.put("hmdp:boys:2",b);
    redisTemplate.opsForHash().putAll("map2",map);

    //设置过期时间(可选)
    redisTemplate.expire("map2",20,TimeUnit.SECONDS);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205072137216.png" alt="image-20220507213738151" style="zoom:80%;" />

### 获取key

```java
@Test
public void getHashKey() {
    //获取所有的key
    //1、通过redisTemplate获取值
    Set<Object> keys1 = redisTemplate.boundHashOps("HashKey").keys();
    System.out.println(keys1);

    //2、通过ValueOperations获取值
    Set<Object> keys2 = redisTemplate.opsForHash().keys("User");
    System.out.println(keys2);
}
```

### 获取value

```java
@Test
public void getHashValue() {
    //获取所有的value
    //1、通过redisTemplate获取值
    List<Object> values1 = redisTemplate.boundHashOps("HashKey").values();

    //2、通过ValueOperations获取值
    List<Object> value2 = redisTemplate.opsForHash().values("User");
    System.out.println(values1);
    System.out.println(value2);
}
```

### 根据key获取value

```java
@Test
public void getHashKeyValue() {
    //1、通过redisTemplate获取
    Object o = redisTemplate.boundHashOps("HashKey").get("SmallKey1");
    System.out.println(o);

    //2、通过ValueOperations获取值
    Object o1 = redisTemplate.opsForHash().get("User", "name");
    System.out.println(o1);
}
```

### 获取所有的键值对集合

```java
//获取所有键值对集合
@Test
public void getHashKeyAndValue() {
    //1、通过redisTemplate获取
    Map<Object, Object> entries = redisTemplate.boundHashOps("HashKey").entries();
    //2、通过ValueOperations获取值
    Map<Object, Object> entries1  = redisTemplate.opsForHash().entries("User");
    System.out.println(entries);
    System.out.println(entries1);
}
```

### 删除等相关方法

```java
@Test
public void testDeleteHash() {
    //删除小key
    redisTemplate.opsForHash().delete("HashKey","SmallKey1");
    //删除大key
    redisTemplate.delete("HashKey");
    Boolean b1 = redisTemplate.opsForHash().hasKey("HashKey","SmallKey2");
    System.out.println(b1);
    //判断大key是否存在
    Boolean b2 = redisTemplate.hasKey("HashKey");
    System.out.println(b2);
    //获取过期时间
    Long t = redisTemplate.getExpire("HashKey");
    System.out.println(t);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220304165150702.png" alt="image-20220304165150702" style="zoom:67%;" />



## Set类型

```java
/**
 * 操作Set类型的数据
*/
@Test
public void testSet(){
    SetOperations setOperations = redisTemplate.opsForSet();

    //存值
    setOperations.add("myset","a","b","c","a");

    //取值
    Set<String> myset = setOperations.members("myset");
    for (String o : myset) {
        System.out.println(o);
    }

    //删除成员
    setOperations.remove("myset","a","b");

    //取值
    myset = setOperations.members("myset");
    for (String o : myset) {
        System.out.println(o);
    }

}
```

### 插入值

```java
@Test
public void setV() {
    List<boys> boys = boysMapper.selectList(null);
    //1、通过redisTemplate设置值
    boys.forEach((boy)->{
        redisTemplate.opsForSet().add("boys",boy);
    });
    //设置过期时间
    redisTemplate.expire("setKey1",200,TimeUnit.SECONDS);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205080932368.png" alt="image-20220508093219291" style="zoom:80%;" />



### 获取值

```java
@Test
public void getV() {
    //1、通过redisTemplate获取值
    Set<Object> boys = redisTemplate.opsForSet().members("boys");
    if (boys != null) {
        boys.forEach(System.out::println);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205080936757.png" alt="image-20220508093618705" style="zoom:80%;" />



### 其他方法

```java
@Test
public void testSetM() {
    //根据value从一个set中查询,是否存在
    Boolean isEmpty = redisTemplate.opsForSet().isMember("boys","setValue2");
    //获取Set缓存的长度
    Long size = redisTemplate.opsForSet().size("boys");
    //移除指定的元素
    Long result1 = redisTemplate.opsForSet().remove("boys","setValue1");
    //移除指定的key
    Boolean result2 = redisTemplate.delete("boys");
    //获取过期时间
    Long time = redisTemplate.getExpire("boys");
    System.out.println(time);
    System.out.println(isEmpty);
    System.out.println(size);
    System.out.println(result1);
    System.out.println(result2);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205080938445.png" alt="image-20220508093833393" style="zoom:80%;" />



## List类型

### 存储值

```java
/**
 * 操作List类型的数据
*/
@Test
public void testList(){
    ListOperations listOperations = redisTemplate.opsForList();

    //存值
    listOperations.leftPush("mylist","a");
    listOperations.leftPushAll("mylist","b","c","d");

    //取值
    List<String> mylist = listOperations.range("mylist", 0, -1);
    for (String value : mylist) {
        System.out.println(value);
    }

    //获得列表长度 llen
    Long size = listOperations.size("mylist");
    int lSize = size.intValue();
    for (int i = 0; i < lSize; i++) {
        //出队列
        String element = (String) listOperations.rightPop("mylist");
        System.out.println(element);
    }
}
```

#### 分条存储

```java
@Test
public void testList() {
    //1、通过redisTemplate设置值
    List<boys> boys = boysMapper.selectList(null);
    boys.forEach(boy -> {
        redisTemplate.opsForList().leftPush("boys",boy);
    });
    //设置过期时间，填入集合名称
    redisTemplate.expire("boys",100,TimeUnit.MINUTES);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205072248109.png" alt="image-20220507224805048" style="zoom:80%;" />



#### 批量存储

```java
@Test
public void testList() {
    //2、将list集合放入缓存
    ArrayList<Object> list1 = new ArrayList<>();
    admin a = new admin(22,"sda","213");
    list1.add(a);
    list1.add("张三");
    list1.add("李四");
    redisTemplate.opsForList().leftPushAll("list1",String.valueOf(list1));
    //设置过期时间，填入集合名称
    redisTemplate.expire("list1",100,TimeUnit.MINUTES);
}
```



### 获取值

#### 获取所有内容

```java
@Test
public void testSearchList() {
    //获取所有内容
    List<Object> boys = redisTemplate.opsForList().range("boys",0, -1);
    if (boys != null) {
        boys.forEach(System.out::println);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205072256550.png" alt="image-20220507225600494" style="zoom:80%;" />



#### 左右弹出元素

```java
@Test
public void testSearchList() {
    //左右各弹出一个元素
    Object b1 = redisTemplate.opsForList().leftPop("boys");  //从左侧弹出一个元素
    Object b2 = redisTemplate.opsForList().rightPop("boys"); //从右侧弹出一个元素
    System.out.println(b1);
    System.out.println(b2);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205072257384.png" alt="image-20220507225745328" style="zoom:80%;" />



#### 根据索引查询元素

```java
@Test
public void testSearchList() {
    //根据索引查询元素
    Object listKey4 = redisTemplate.opsForList().index("boys",1);
    System.out.println(listKey4);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205072258567.png" alt="image-20220507225837511" style="zoom:80%;" />



#### 获取列表长度

```java
@Test
public void testSearchList() {
    //获取List缓存的长度
    Long size = redisTemplate.opsForList().size("boys");
    System.out.println("list的长度："+size);
}
```



#### 根据索引修改元素值

```java
@Test
public void testSearchList() {
    
    //根据索引修改List中的某条数据(key，索引，值)
    redisTemplate.opsForList().set("list",1,"java");
}
```





### 删除值

```java
//移除N个值为value(key,移除个数，值)
redisTemplate.opsForList().remove("list",3L,"value");
```



## Zset类型(排序)

```java
/**
 * 操作ZSet类型的数据
*/
@Test
public void testZset(){
    ZSetOperations zSetOperations = redisTemplate.opsForZSet();

    //存值
    zSetOperations.add("myZset","a",10.0);
    zSetOperations.add("myZset","b",11.0);
    zSetOperations.add("myZset","c",12.0);
    zSetOperations.add("myZset","a",13.0);

    //取值
    Set<String> myZset = zSetOperations.range("myZset", 0, -1);
    for (String s : myZset) {
        System.out.println(s);
    }

    //修改分数
    zSetOperations.incrementScore("myZset","b",20.0);

    //取值
    myZset = zSetOperations.range("myZset", 0, -1);
    for (String s : myZset) {
        System.out.println(s);
    }

    //删除成员
    zSetOperations.remove("myZset","a","b");

    //取值
    myZset = zSetOperations.range("myZset", 0, -1);
    for (String s : myZset) {
        System.out.println(s);
    }
}
```

### 存储值

```java
@Test
public void testZsetInsert() {
    //查询所有用户
    List<boys> boys = boysMapper.selectList(null);
    //使用lambda表达式的方式遍历
    boys.forEach((boy)->{
        //第一个参数是集合名、第二个参数是每一条数据、第三条分数是分数
        redisTemplate.opsForZSet().add("boy", boy, boy.getUserCP());
    });
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205072201230.png" alt="image-20220507220143150" style="zoom: 67%;" />



### 获取值

#### 获取值(不带分数)

打印全部内容(不包含分数)

```java
@Test
public void testSearch() {
    //按照排名先后(从小到大)打印指定区间内的元素, -1为打印全部
    Set<Object> set = redisTemplate.opsForZSet().range("boy",0,-1);
    //查询到不为空，才能进行遍历
    if (set != null ){
        set.forEach(System.out::println);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205072206576.png" alt="image-20220507220609511" style="zoom:80%;" />



#### 获取值(带分数)

返回集合内元素的排名，以及分数（从小到大）

```java
@Test
public void testSearch() {
    Set<ZSetOperations.TypedTuple<Object>> set = redisTemplate.opsForZSet()
                                     .rangeWithScores("boy", 0, -1);

    for (ZSetOperations.TypedTuple<Object> set1 : set) {
        System.out.println(set1.getValue() + " : " + set1.getScore());
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205072216316.png" alt="image-20220507221619250" style="zoom:80%;" />



#### 获取指定分数范围

```java
@Test
public void testSearch1() {
    //返回集合内元素在指定分数范围内的排名（从小到大）
    Set<Object> byScore = redisTemplate.opsForZSet()
            .rangeByScore("boy",0D, 100D);

    //带偏移量和个数，(key，起始分数，最大分数，偏移量，个数)
    Set<Object> byScore1 = redisTemplate.opsForZSet()
            .rangeByScore("boy", 0D, 100D,1, 3);

    System.out.println(byScore);
    System.out.println(byScore1);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205072239804.png" alt="image-20220507223905745" style="zoom:80%;" />



### 相关个数、排名统计

```java
@Test
public void testSearch() {
    //返回集合内的成员个数
    Long size = redisTemplate.opsForZSet().size("zSetKey");
    //获得指定元素的分数:1.0,double类型
    Double score = redisTemplate.opsForZSet().score("zSetKey", "张三");
    //返回集合内指定分数范围的成员个数（Double类型）
    Long count1 = redisTemplate.opsForZSet().count("zSetKey", 0D, 3D);
    //返回指定成员的排名
    //从小到大
    Long startRank = redisTemplate.opsForZSet().rank("zSetKey","李四");
    //从大到小
    Long endRank = redisTemplate.opsForZSet().reverseRank("zSetKey","张三");
    System.out.println(startRank+"---"+endRank);
    System.out.println(size+"--"+score+"--"+count1);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220304162259622.png" alt="image-20220304162259622" style="zoom:80%;" />



### 删除值

#### 删除全部

```java
@Test
public void testDelete() {
    redisTemplate.delete("boy");
}
```

#### 删除指定分数

```java
@Test
public void testDelete() {
    //删除指定分数范围的元素（double类型）
    redisTemplate.opsForZSet().removeRangeByScore("boy",8,12);
}
```

#### 删除指定索引

```java
@Test
public void testDelete() {
    //删除指定索引范围的元素（Long类型）
    redisTemplate.opsForZSet().removeRange("boy",0L,3L);
}
```

## SpringBoot连接哨兵

> 在Sentinel集群监管下的Redis主从集群，其节点会因为自动故障转移而发生变化，Redis的客户端必须感知这种变化，及时更新连接信息。**Spring的RedisTemplate底层利用lettuce实现了节点的感知和自动切换**。

### 1 引入依赖

在项目的pom文件中引入依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

### 2 配置Redis地址

然后在配置文件application.yml中指定redis的sentinel相关信息：

> 注意：这边配置的不是redis集群地址(7001、7002、7003)，而是sentinel地址(27001)

```yml
spring:
  redis:
    sentinel:
      master: mymaster # 指定master名称
      nodes: # 指定redis-sentinel集群信息
        - 192.168.22.130:27001
        - 192.168.22.130:27002
        - 192.168.22.130:27003
```

### 3 配置读写分离(集群也要配置)

在项目的启动类中，添加一个新的bean：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209171232762.png" alt="image-20220917123240643" style="zoom:80%;" />

```java
@Bean
public LettuceClientConfigurationBuilderCustomizer 
    clientConfigurationBuilderCustomizer(){
    return clientConfigurationBuilder -> 
          clientConfigurationBuilder.readFrom(ReadFrom.REPLICA_PREFERRED);
}
```

这个bean中配置的就是读写策略，包括四种：

> - MASTER：从主节点读取
> - MASTER_PREFERRED：优先从master节点读取，master不可用才读取replica
> - REPLICA：从slave（replica）节点读取
> - REPLICA _PREFERRED：优先从slave（replica）节点读取，所有的slave都不可用才读取master

### 4 访问测试

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @GetMapping("/get/{key}")
    public String hi(@PathVariable String key) {
        return redisTemplate.opsForValue().get(key);
    }

    @GetMapping("/set/{key}/{value}")
    public String hi(@PathVariable String key, @PathVariable String value) {
        redisTemplate.opsForValue().set(key, value);
        return "success";
    }
}
```

进行访问：

:8080/set/name/zhangsan

:8080/get/name

成功完成测试



## Redission 实战

详细源码「码哥」上传到 GitHub 了：https://github.com/MageByte-Zero/springboot-parent-pom.git

### pom 依赖

```xml
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson-spring-boot-starter</artifactId>
    <version>3.16.7</version>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```

```yml
spring:
  application:
    name: redission
  redis:
    host: 127.0.0.1
    port: 6379
    ssl: false
```

### 定义Service

```java
import org.redisson.api.RHyperLogLog;
import org.redisson.api.RedissonClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HyperLogLogService {

    @Autowired
    private RedissonClient redissonClient;

    /**
     * 将数据添加到 HyperLogLog
     *
     * @param logName
     * @param item
     * @param <T>
     */
    public <T> void add(String logName, T item) {
        RHyperLogLog<T> hyperLogLog = redissonClient.getHyperLogLog(logName);
        hyperLogLog.add(item);
    }

    /**
     * 将集合数据添加到 HyperLogLog
     * @param logName
     * @param items
     * @param <T>
     */
    public <T> void addAll(String logName, List<T> items) {
        RHyperLogLog<T> hyperLogLog = redissonClient.getHyperLogLog(logName);
        hyperLogLog.addAll(items);
    }

    /**
     * 将 otherLogNames 的 log 合并到 logName
     *
     * @param logName       当前 log
     * @param otherLogNames 需要合并到当前 log 的其他 logs
     * @param <T>
     */
    public <T> void merge(String logName, String... otherLogNames) {
        RHyperLogLog<T> hyperLogLog = redissonClient.getHyperLogLog(logName);
        hyperLogLog.mergeWith(otherLogNames);
    }

    /**
     * 统计基数
     *
     * @param logName 需要统计的 logName
     * @param <T>
     * @return
     */
    public <T> long count(String logName) {
        RHyperLogLog<T> hyperLogLog = redissonClient.getHyperLogLog(logName);
        return hyperLogLog.count();
    }
}
```

### 单元测试

```java
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RedissionApplication.class)
public class HyperLogLogTest {

    @Autowired
    private HyperLogLogService hyperLogLogService;

    @Test
    public void testAdd() {
        String logName = "码哥字节:Redis为什么这么快:uv";
        String item = "肖菜鸡";
        hyperLogLogService.add(logName, item);
        log.info("添加元素[{}]到 log [{}] 中。", item, logName);
    }

    @Test
    public void testCount() {
        String logName = "码哥字节:Redis为什么这么快:uv";
        long count = hyperLogLogService.count(logName);
        log.info("logName = {} count = {}.", logName, count);
    }

    @Test
    public void testMerge() {
        ArrayList<String> items = new ArrayList<>();
        items.add("肖菜鸡");
        items.add("谢霸哥");
        items.add("陈小白");

        String otherLogName = "码哥字节:Redis多线程模型原理与实战:uv";
        hyperLogLogService.addAll(otherLogName, items);
        log.info("添加 {} 个元素到 log [{}] 中。", items.size(), otherLogName);

        String logName = "码哥字节:Redis为什么这么快:uv";
        hyperLogLogService.merge(logName, otherLogName);
        log.info("将 {} 合并到 {}.", otherLogName, logName);

        long count = hyperLogLogService.count(logName);
        log.info("合并后的 count = {}.", count);
    }
}
```

























