

# 安装、启动、进入

[史上最全系列 | Redis 原理+知识点总结（1.5万字、8大知识点、17张图）](https://mp.weixin.qq.com/s?__biz=Mzg5NDY3NzIwMA==&mid=2247505344&idx=1&sn=6868afa74c816ccd0334055c899e4081&chksm=c0196c7ff76ee56909c890542a27c07f4895e14ecc6b1bc10fbabe47c5fad242fb3d8de198fa&mpshare=1&scene=23&srcid=0416yXB6nHnmAIdI3e2EKnpv&sharer_sharetime=1681660511765&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

## 下载和安装

此处选择的Linux版本为CentOS 7，Redis的官方网站地址：https://redis.io/

安装C 语言的编译环境，Redis是基于C语言编写的，因此首先需要安装Redis所需要的gcc依赖：

```sh
yum install -y gcc tcl
gcc --version
```

下载并解压

```sh
tar -zxvf redis-6.2.6.tar.gz
cd redis-6.2.6
```

> 在redis-6.2.6目录下再次执行make命令（只是编译好），注意：如果没有准备好C语言编译环境，make 会报错—Jemalloc/jemalloc.h：没有那个文件。解决方案：运行make distclean，在该目录依次执行
>

```sh
make && make install
```

## 默认安装目录

> 安装完成后，默认安装在/usr/local/bin
>

```sh
cd /usr/local/bin
```

redis-benchmark:性能测试工具，可以在自己本子运行，看看自己本子性能如何,进入/usr/local/bin,执行,即可执行测试

```sh
./redis-benchmark
```

> - redis-check-aof：修复有问题的AOF文件，rdb和aof后面讲
>
>
> - redis-check-dump：修复有问题的dump.rdb文件
>
>
> - redis-sentinel：Redis集群使用
>
>
> - redis-server：Redis服务器启动命令
>
>
> - redis-cli：客户端，操作入口

## 启动 Redis

redis的启动方式有很多种，例如：

### 默认启动 不推荐

> 安装完成后，在任意目录输入redis-server命令即可启动Redis：
>

```c
redis-server
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211211081716167.png" alt="image-20211211081716167" style="zoom: 40%;" />

这种启动属于`前台启动`，会阻塞整个会话窗口，窗口关闭或者按下`CTRL + C`则Redis停止。不推荐使用

### 指定配置文件启动 ⭐

#### 修改配置文件

```sh
find / -name redis.conf
# 我们先将这个配置文件备份一份
cp /etc/redis.conf redis.conf.bck
```

```properties
# 允许访问的地址，默认是127.0.0.1，会导致只能在本地访问。
# 修改为0.0.0.0则可以在任意IP访问，生产环境不要设置为0.0.0.0
bind 0.0.0.0
# 守护进程，修改为yes后即可后台运行
daemonize yes 
# 关闭保护模式，不然远程连不上
protected-mode no
# 设置密码，连接时需要加上-a参数
requirepass 315217
```

#### 根据配置文件启动

```sh
redis-server /etc/redis.conf
redis-cli -p 6379
```

```sh
# 利用redis-cli来执行 shutdown 命令，即可停止 Redis 服务，
redis-cli shutdown
# 因为之前配置了密码，因此需要通过 -u 来指定密码
redis-cli -u 123321 shutdown
```

## 注册系统服务⭐

我们也可以通过配置来实现开机自启。首先，新建一个系统服务文件：

```sh
vi /etc/systemd/system/redis.service
```

```sh
[Unit]
Description=redis-server
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/bin/redis-server /etc/redis.conf
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

然后重载系统服务：

```sh
systemctl daemon-reload
```

现在，我们可以用下面这组命令来操作redis了：

```sh
# 启动
systemctl start redis
# 停止
systemctl stop redis
# 重启
systemctl restart redis
# 查看状态
systemctl status redis
```

执行下面的命令，可以让redis开机自启：

```sh
systemctl enable redis
```

## Win10 Redis安装

https://github.com/redis-windows/redis-windows/releases/tag/7.0.8

https://dblab.xmu.edu.cn/blog/4091/

https://github.com/redis-windows/redis-windows/blob/main/README.zh_CN.md

> 以管理员运行cmd

```sh
sc.exe create Redis binpath=D:\Redis-7.0.11-Windows-x64-with-Service\RedisService.exe start= auto
net start Redis
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230703162112922.png" alt="image-20230703162112922" style="zoom:80%;" />

```properties
# 允许访问的地址，默认是127.0.0.1，会导致只能在本地访问。
# 修改为0.0.0.0则可以在任意IP访问，生产环境不要设置为0.0.0.0
bind 0.0.0.0
# 守护进程，修改为yes后即可后台运行
daemonize yes 
# 关闭保护模式，不然远程连不上
protected-mode no
# 设置密码，连接时需要加上-a参数
requirepass 315210
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230703162028816.png" alt="image-20230703162028816" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230703163720889.png" alt="image-20230703163720889" style="zoom:80%;" />

# Redis客户端

Redis 更准确的描述是一个数据结构服务器。Redis 的这种特殊性质让它在开发人员中很受欢迎。

- 命令行客户端
- 图形化桌面客户端
- 编程客户端

## Redis命令行客户端

Redis安装完成后就自带了命令行客户端：redis-cli，使用方式如下：

```c
redis-cli [options] [commonds]
```

其中常见的options有：

- `-h 127.0.0.1`：指定要连接的redis节点的IP地址，默认是127.0.0.1
- `-p 6379`：指定要连接的redis节点的端口，默认是6379
- `-a 123321`：指定redis的访问密码 

其中的commonds就是Redis的操作命令，例如：

- `ping`：与redis服务端做心跳测试，服务端正常会返回`pong`
- 不指定commond时，会进入`redis-cli`的交互控制台：

![image-20211211110439353](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211211110439353.png)

## RESP ⭐

GitHub上的大神编写了Redis的图形化桌面客户端，地址：https://github.com/uglide/RedisDesktopManager

不过该仓库提供的是RedisDesktopManager的源码，并未提供windows安装包。

在下面这个仓库可以找到安装包：https://github.com/lework/RedisDesktopManager-Windows/releases

![image-20211211111351885](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211211111351885.png)

### 安装

解压缩后，运行安装程序即可安装：

![image-20211214155123841](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211214155123841.png)

此处略。

安装完成后，在安装目录下找到rdm.exe文件：

![image-20211211110935819](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211211110935819.png)

双击即可运行：

![image-20211214155406692](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211214155406692.png)

### 建立连接

点击左上角的`连接到Redis服务器`按钮：

![image-20211214155424842](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211214155424842.png)

在弹出的窗口中填写Redis服务信息：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211211111614483.png" alt="image-20211211111614483" style="zoom:50%;" />

点击确定后，在左侧菜单会出现这个链接：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211214155804523.png" alt="image-20211214155804523" style="zoom:67%;" />

点击即可建立连接了：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211214155849495.png" alt="image-20211214155849495" style="zoom:67%;" />

Redis默认有16个仓库，编号从0至15.  通过配置文件可以设置仓库数量，但是不超过16，并且不能自定义仓库名称。如果是基于redis-cli连接Redis服务，可以通过select命令来选择数据库：

```sh
# 选择 0号库
select 0
```

## RedisInsight

> 测评：相比于其他可视化工具，RedisInsight 实现的功能更强大、执行效率更改，通用性更好，出了 CRUD 基本功能的支持，还支持内存分析、指标监控、发布/订阅、慢命令日志查询等等。

### 基本使用

首先下载RedisInsight的安装包，下载地址：https://redis.com/redis-enterprise/redis-insight/

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnP8pq58EOF6FXibUVy19icMxmQXj5l9FKSibAZ6svdF7icHmcHfqEYaias2B62PAurPF83D4mpw4rRwicQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

下载完成后直接安装即可，安装完成后在主界面选择`添加Redis数据库`；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnP8pq58EOF6FXibUVy19icMxqS2PFVVicwSMUib9JG3A461AQscjib3PSu0keAnWPibURicic3iaLTIzeXowQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 选择`手动添加数据库`，输入Redis服务连接信息即可；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnP8pq58EOF6FXibUVy19icMxM686MAuYXUVpiaUEiamiaSyb9AZg7fFIyhgbiaxADsSeEpiaVp10xcMK0Og/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

打开连接后即可管理Redis，右上角会显示已经安装的Redis增强模块；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnP8pq58EOF6FXibUVy19icMxTdIyfLM2Xb0YI6aCMiaXqYcONfGKloIlZKIpXcxzEyBjTkIicDruRB5Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 接下来我们就可以通过RedisInsight在Redis中添加键值对数据了，比如添加`String`类型键值对；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnP8pq58EOF6FXibUVy19icMxshw1jibphPDrRibWR9ICN7a0gwW8iaUNqPndSHAOCibNDaypasuJabMqlA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 添加Hash类型，编辑的时候可以单个属性编辑，还是挺方便的；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnP8pq58EOF6FXibUVy19icMx35OYibniawGVGqJGzCsNXbDRF7wWXXhWvMu3ydFQWckNjiaQ6ZWYy6orw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 添加List类型，编辑的时候可以直接Push元素进去；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnP8pq58EOF6FXibUVy19icMxRdBEWmficDceYxBy2EoMCUaKsDGQH9TVXdNQcSKgIwlYk9aroBtRxUg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 添加JSON类型，安装RedisJSON模块后可支持；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnP8pq58EOF6FXibUVy19icMxL7m0YnSVFVN2FeoUfH4y1GZQZ4S9t1cppAjjurFsS3cTogxnfib0WDw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 对原生JSON类型，不仅支持高亮预览，还能支持新增、编辑和删除单个属性，够方便！

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnP8pq58EOF6FXibUVy19icMxGicscWcibm8xotquVTGEhOyVZGHRAoAtktJsYxsLSgTDRWjuVqXnSSlQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 另外RedisInsight还支持深色和浅色两种主题切换，在设置中即可更改。

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnP8pq58EOF6FXibUVy19icMxDG4THJKoY2qec5jxj2l6TNtupscAictV2QWDrqrtZVt5yP1qagND6cQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### CLI

RedisInsight的图形化界面功能满足不了你的话，还可以试试它的`CLI`功能，点击左下角CLI标签即可打开；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnP8pq58EOF6FXibUVy19icMxWXLX1kTYktynlqnArMic9w6ILH6XjZOwozFN0d8MicRsuiaUYK4WgiaB4g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 贴心的Redis官方怕你记不住命令，还添加了`Command Helper`这个查找命令文档的功能，比如我们可以搜索下`hget`这个命令的用法。

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnP8pq58EOF6FXibUVy19icMxbz97adFghLkInAOJ7aftINhnpcycMqriawzNwWcuO2xwYRglPmHy6Zg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Profiler

通过Profiler功能，我们可以查看Redis的命令执行日志，比如我们使用RedisInsight添加一个叫`testKey`的键值对，Profiler将显示如下日志。

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnP8pq58EOF6FXibUVy19icMxJjuJDkne1S2jib9qoVfMcJctt0fcbneYEU2lrhPKFHBQuSYdtMdsDxQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



## Redis Desktop Manager

Redis Desktop Manager 应该是现在使用率最广的可视化工具了，存在时间很久，经过了数次迭代，基于 Qt 5 开发，支持跨平台支持。以前是免费的，不过现在改成收费工具，试用期可以有半个月的时间，最新版的访问地址如下！

```sh
https://github.com/uglide/RedisDesktopManager/releases
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212221130279.png" alt="image-20221222113047120" style="zoom:67%;" />

测评：界面看着比较简洁，该有的功能都有，功能很全，key 的显示可以支持按冒号分割的键名空间。

**免费版本的下载地址如下**！

百度网盘：`https://pan.baidu.com/s/1rMWR-OQnfsxJ3_HSqEE8xw`

提取码：`tebu`

## AnotherRedisDesktopManager

> AnotherRedisDesktopManager 是一款比较稳定简洁的 redis UI工具，国人开发，支持跨平台，完全免费，最新版的访问地址如下！https://github.com/qishibo/AnotherRedisDesktopManager
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212221131517.png" alt="image-20221222113141360" style="zoom:67%;" />

> 测评：基本的功能都有，有监控统计，支持暗黑主题，还支持集群的添加，是一款非常不错的可视化客户端。



# NoSQL数据库 

## SQL VS NoSQL

> NoSQL(NoSQL = **Not Only SQL** )，意即“不仅仅是SQL”，泛指**非关系型的数据库**。 NoSQL 不依赖业务逻辑方式存储，而以简单的key-value模式存储。因此大大的增加了数据库的扩展能力。**不遵循SQL标准，不支持ACID，远超于SQL的性能**。

### 完整对比

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207162152624.png" alt="image-20220716215214433" style="zoom:80%;" />

> 扩展性：垂直表示没考虑数据拆分和分片，水平表示考虑到了数据拆分和分片

### 结构化 VS 非结构化

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306151431510.png" alt="image-20230615143140424" style="zoom:80%;" />

### SQL VS NoSQL

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306151432041.png" alt="image-20230615143225958" style="zoom:80%;" />

## Redis特征

Redis诞生于2009年全称是**Remote** **Dictionary** Server，远程词典服务器，是基于内存的键值型NoSQL数据库

> - 键值（key-value）型，value支持多种不同数据结构，功能丰富
> - 单线程，每个命令具备原子性
> - 低延迟，速度快（基于内存、IO多路复用、良好的编码）。
> - 支持数据持久化
> - 支持主从集群、分片集群
> - 支持多语言客户端

> - **性能极高** - Redis 读速度 110000次/s，写的速度是 81000次/s。
> - **丰富的数据类型** - Redis 支持的类型 String， Hash 、List 、Set 及 Ordered Set 数据类型操作。
> - **原子性** - Redis 的所有操作都是原子性的，意思就是要么成功，要么失败。单个操作时原子性的。多个操作也支持事务，即原子性，通过 MULTI 和 EXEC 指令包起来。
> - **丰富的特性** - Redis 还支持 publis/subscribe，通知，key 过期等等特性。
> - **高速读写** ，redis 使用自己实现的分离器，代码量很短，没有使用 lock(MySQL),因此效率非常高。

## 不同数据库适用场景

> 对数据**高并发**的读写，**海量**数据的**读写**，对**数据高可扩展性**


![image-20211102103837062](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211102103837062.png)

## 不适用场景

> - 需要事务支持，基于sql的结构化查询存储，处理复杂的关系,需要即席查询
>
>
> - **用不着sql的和用了sql也不行的情况，请考虑用NoSql**

## 优缺点

### 优势

> - 性能极高 - Redis 读速度 110000 次/s，写的速度是 81000 次/s。
> - 丰富的数据类型 - Redis 支持的类型 String， Hash 、List 、Set 及 Ordered Set 数据类型操作。
> - 原子性  - Redis 的所有操作都是原子性的，意思就是要么成功，要么失败。单个操作时原子性的。多个操作也支持事务，即原子性，通过 MULTI 和 EXEC 指令包起来。
> - 丰富的特性 - Redis 还支持 publis/subscribe，通知，key 过期等等特性。
> - 高速读写 ，redis 使用自己实现的分离器，代码量很短，没有使用 lock(MySQL),因此效率非常高。

### 缺点

> - 持久化。Redis 直接将数据存储到内存中，要将数据保存到磁盘上，Redis 可以使用两种方式实现持久化过程。定时快照(snapshot)：每隔一段时间将整个数据库写到磁盘上，每次均是写全部数据，代价非常高。第二种方式基于语句追加（aof）：只追踪变化的数据，但是追加的 log 可能过大，同时所有的操作均重新执行一遍，回复速度慢。
> - 耗内存  、占用内存过高。

## 常用NoSQL数据库

### Memcache

> - **很早**出现的NoSql数据库
>
> - 数据都在内存中，一般**不持久化**
>
> - 支持简单的key-value模式，**支持类型单一**
>
> - 一般是作为**缓存数据库**辅助持久化的数据库

### Redis ⭐

- Redis官方网站：http://redis.io
- Redis中文官方网站：  http://redis.cn/  

> - 几乎覆盖了Memcached的绝大部分功能
>
> - 数据都在内存中，**支持持久化**，主要用作备份恢复
>
> - 除了支持简单的key-value模式，还**支持多种数据结构的存储**，比如 list、set、hash、zset等。
>
> - 一般是作为**缓存数据库**辅助持久化的数据库

### MongoDB

> - 高性能、开源、模式自由(schema free)的**文档型数据库**
>
> - 数据都在内存中， 如果内存不足，把不常用的数据保存到硬盘
>
> - 虽然是key-value模式，但是对value（尤其是**json**）提供了丰富的查询功能
>
> - 支持二进制数据及大型对象
>
> - 可以根据数据的特点**替代RDBMS** ，成为独立的数据库。或者配合RDBMS，存储特定的数据。

## Redis应用场景

[16 个 Redis 常见使用场景！ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247494383&idx=2&sn=e9eb08b27e8765859de5da05a360d221&chksm=fc2c56e7cb5bdff1c1b6d61c7b926a61101fcb5942bd5c0af19057e7344d683b8cdb10f135fb&mpshare=1&scene=23&srcid=04155g4cEWhQL4U4L1y4F36R&sharer_sharetime=1650025400646&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

### 抽奖

自带一个随机获得值，Spop 命令用于移除集合中的指定 key 的一个或多个随机元素，移除后会返回移除的元素

```apl
spop myset
```

### 点赞、签到、打卡

假如上面的微博ID是t1001，用户ID是u3001，用 like:t1001 来维护 t1001 这条微博的所有点赞用户

- 点赞了这条微博：sadd like:t1001 u3001
- 取消点赞：srem like:t1001 u3001
- 是否点赞：sismember like:t1001 u3001
- 点赞的所有用户：smembers like:t1001
- 点赞数：scard like:t1001

是不是比数据库简单多了。

### 商品标签

老规矩，用 tags:i5001 来维护商品所有的标签。

- sadd tags:i5001 画面清晰细腻
- sadd tags:i5001 真彩清晰显示屏
- sadd tags:i5001 流程至极

### 商品筛选

```apl
# 获取差集
sdiff set1 set2
# 获取交集（intersection ）
sinter set1 set2
# 获取并集
sunion set1 set2
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbudegdrhbGahVfBv4MHUH1tywAUjc9qN73ZmEUiaGhzg1BZD5FXX2v5sVqyI2jrVUmm88MDs34eicmGQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

假如：iPhone11 上市了

```apl
sadd brand:apple iPhone11

sadd brand:ios iPhone11

sad screensize:6.0-6.24 iPhone11

sad screentype:lcd iPhone 11
```

赛选商品，苹果的、ios的、屏幕在6.0-6.24之间的，屏幕材质是LCD屏幕

```apl
sinter brand:apple brand:ios screensize:6.0-6.24 screentype:lcd
```

### 用户关注、推荐模型

follow 关注 fans 粉丝

相互关注：

- sadd 1:follow 2
- sadd 2:fans 1
- sadd 1:fans 2
- sadd 2:follow 1

我关注的人也关注了他(取交集)：

- sinter 1:follow 2:fans

可能认识的人：

- 用户1可能认识的人(差集)：sdiff 2:follow 1:follow
- 用户2可能认识的人：sdiff 1:follow 2:follow

### 缓存

> 缓存现在几乎是所有大中型网站都在用的必杀技，合理利用缓存提升网站的访问速度，还能大大降低数据库的访问压力。Redis 提供了键过期功能，也提供了灵活的键淘汰策略，所以，现在 Redis 用在缓存的场合非常多。

### 排行榜

> Redis 提供的`有序集合`数据类结构能够实现复杂的排行榜应用。
>
> id 为6001 的新闻点击数加1：`zincrby hotNews:20190926 1 n6001`
>
> 获取今天点击最多的15条：`zrevrange hotNews:20190926 0 15 withscores`
>
> **可以作为数据库，缓存热点数据(经常被查询，但是不经常被修改或者删除的数据)和消息中间件等大部分功能**

### 计数器

> 视频网站的播放量，每次浏览 +1，并发量高时如果每次都请求数据库操作无疑有很大挑战和压力。Redis 提供的 incr 命令来实现计数器功能，内存操作，性能非常好，非常适用于这些技术场景。

### 分布式会话

> 相对复杂的系统中，一般都会搭建 Redis 等内存数据库为中心的 session 服务，session 不再由容器管理，而是由 session 服务及内存数据管理。

### 分布式锁

> 在并发高的场合中，可以利用 Redis 的 setnx 功能来编写分布式的锁，如果设置返回 1，说明获取锁成功，否则获取锁失败。

### 社交网络

> 点赞、踩、关注/被关注，共同好友等是社交网站的基本功能，社交网站的访问量通常来说比较大，而且传统的关系数据库不适合这种类型的数据，Redis 提供的哈希，集合等数据结构能很方便的实现这些功能。

### 最新列表

> Redis 列表结构，LPUSH 可以在列表头部插入一个内容 ID 作为关键字，LTRIM 可以用来限制列表的数量，这样列表永远为 N ，无需查询最新的列表，直接根据 ID 去到对应的内容也即可。

### 消息系统

> 消息队列是网站经常用的中间件，如 ActiveMQ，RabbitMQ，Kafaka 等流行的消息队列中间件，主要用于业务解耦，流量削峰及异步处理试试性低的业务。Redis 提供了发布/订阅及阻塞队列功能，能实现一个简单的消息队列系统。另外，这个不能和专业的消息中间件相比。



# 基本数据类型

学习网址：http://www.redis.cn/commands.html

> Redis是一个key-value的数据库，key一般是String类型，不过value的类型多种多样，Redis为了方便我们学习，将操作不同数据类型的命令也做了分组，在官网（ [https://redis.io/commands ](https://redis.io/commands)）可以查看
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205042041390.png" alt="image-20220504204159309" style="zoom:67%;" />

## 基础命令

### 查看redis版本

```sh
redis-server -v
redis-server --version
```

### 关闭Redis

```sh
# 通过shutdown关闭，或者进入redis-cli后shutdown
redis-cli shutdown
shutdown
# 直接关闭端口
ps -ef | grep redis
kill -9 redisPid
```

### 进入Redis

```sh
redis-cli -h 192.168.31.202 -p 6379 -a 315217
redis-cli -h 192.168.22.130 -p 6379
redis-cli -p 6379
redis-cli 
```

### 数据库命令

```lua
-- select   数字 切换数据库
seletc 3
-- dbsize   查看当前数据库的key的数量
dbsize
-- flushdb  清空当前库
flushdb
-- flushall 通杀全部库
flushall
```

## 键(key)

```lua
-- 查看当前库所有key,也可以模糊查询，生产环境下不建议使用
keys *
keys *name*

-- 判断某个key是否存在
exists key

-- 查看你的key是什么类型
type key

-- 删除指定的key数据，一个或多个，用空格隔开
del key
del k1 k2 k3

-- 根据value选择非阻塞删除,仅将keys从keyspace元数据中删除，真正的删除会在后续异步操作
unlink key

-- 为给定的key设置过期时间,单位秒
expire key 10

-- 移除key的过期时间，再次用ttl key查看，为-1表示永不过期
persist key

-- 查看还有多少秒过期，-1表示永不过期，-2表示已过期
ttl key 
```

## 字符串(string)

> String是Redis最基本的类型，一个key对应一个value。String类型是**二进制安全的**。意味着Redis的string**可以包含任何数据**。比如jpg图片或者序列化的对象。其value是字符串，不过根据字符串的格式不同，又可以分为3类：
>

> - string：普通字符串
> - int：整数类型，可以做自增、自减操作
> - float：浮点类型，可以做自增、自减操作

> 不管哪种格式，底层都是字节数组形式存储，只不过是编码方式不同。字符串的最大不能超过512m
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205042048062.png" alt="image-20220504204828001" style="zoom:67%;" />

### key命名要求

> Redis没有类似MySQL中的Table的概念，我们该如何区分不同类型的key呢？例如，需要存储用户、商品信息到redis，有一个用户id是1，有一个商品id恰好也是1。**Redis的key允许有多个单词形成层级结构，多个单词之间用':'隔开**，格式如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207162215899.png" alt="image-20220716221546811" style="zoom:80%;" />

> 这个格式并非固定，也可以根据自己的需求来删除或添加词条。例如我们的项目名称叫 heima，有user和product两种不同类型的数据，我们可以这样定义key：

> - user相关的key：`heima:user:1`
> - product相关的key：`heima:product:1`

> 如果Value是一个Java对象，例如一个User对象，则可以将对象序列化为JSON字符串后存储：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205042053383.png" alt="image-20220504205310323" style="zoom:80%;" />

### 命令语法

#### 添加查询

```lua
-- 添加键值对
set key value 
-- 查询对应键值
get key 
-- 同时设置一个或多个 key-value对 
mset k1 v1 k2 v2 ...  
-- 同时获取一个或多个 value 
mget key1 key2 key3 ...  
-- 以新换旧，设置了新值同时获得旧值
getset key value 
--将给定的value追加到原值的末尾
append key value  
```

#### 自增自减

```lua
--将key中储存的数字值增减1,只能对数字值操作，如果为空，新增值为1
incr key  
decr key 

-- 将key中储存的数字值增减 ，自定义步长，比如1，2，3，4
incrby key 步长 
decrby key 步长 
```

#### 组合命令

```lua
-- setnx：添加一个String类型的键值对，前提是这个key不存在，否则不执行
setnx key value 
-- 同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在
msetnx k1 v1 k2 v2  
-- setex：添加一个String类型的键值对，并且指定有效期，单位秒
setex key 过期时间 value
setex name 10 jack
set name jack ex 10
-- 设置k1，超时时间10s
set k1 v1 xx ex 10
```

#### 其他命令

```lua
-- 获得值的长度
strlen key 

-- 获得value值，起始位置一般为0，结束位置为-1,注意，一个key对应一个value
getrange  key 起始位置 结束位置  

-- 用value覆写key所储存的字符串值，从<起始位置>开始(索引从0开始)
setrange key 起始位置 value
```

### 应用场景

#### 缓存对象

使用 String 来缓存对象有两种方式：

> 直接缓存整个对象的 JSON，
>

```lua
set heima:user:1 '{"name":"xiaolin", "age":18}'
set heima:user:2 '{"name":"renshuo", "age":22}'
set heima:product:1 '{"id":1, "name":"小米11", "price": 4999}'
set heima:product:2 '{"id":2, "name":"荣耀6", "price": 2999}'
```

> 采用将 key 进行分离为 user:ID:属性，采用 MSET 存储，用 MGET 获取各属性值，命令例子：
>

```lua
mset heima:user:3:name xiaolin heima:user:3:age 18 heima:user:3:name xiaomei heima:user:3:age 20
```

#### 常规计数

因为 Redis 处理命令是单线程，所以执行命令的过程是原子的。因此 String 数据类型适合计数场景，比如计算访问次数、点赞、转发、库存数量等等。

比如计算文章的阅读量：

```apl
# 初始化文章的阅读量
set aritcle:readcount:1001 0
# 阅读量+1
incr aritcle:readcount:1001
# 阅读量+1
incr aritcle:readcount:1001
# 阅读量+1
incr aritcle:readcount:1001
# 获取对应文章的阅读量 "3"
get aritcle:readcount:1001
```

#### 分布式锁

SET 命令有个 NX 参数可以实现「key不存在才插入」，可以用它来实现分布式锁：

- 如果 key 不存在，则显示插入成功，可以用来表示加锁成功；
- 如果 key 存在，则会显示插入失败，可以用来表示加锁失败。

一般而言，还会对分布式锁加上过期时间，分布式锁的命令如下：

```apl
SET lock_key unique_value NX PX 10000
```

- lock_key 就是 key 键；
- unique_value 是客户端生成的唯一的标识；
- NX 代表只在 lock_key 不存在时，才对 lock_key 进行设置操作；
- PX 10000 表示设置 lock_key 的过期时间为 10s，这是为了避免客户端发生异常而无法释放锁。

而解锁的过程就是将 lock_key 键删除，但不能乱删，要保证执行操作的客户端就是加锁的客户端。所以，解锁的时候，我们要先判断锁的 unique_value 是否为加锁客户端，是的话，才将 lock_key 键删除。

可以看到，解锁是有两个操作，这时就需要 Lua 脚本来保证解锁的原子性，因为 Redis 在执行 Lua 脚本时，可以以原子性的方式执行，保证了锁释放操作的原子性。

```lua
-- 释放锁时，先比较 unique_value 是否相等，避免锁的误释放
if redis.call("get",KEYS[1]) == ARGV[1] then
    return redis.call("del",KEYS[1])
else
    return 0
end
```

这样一来，就通过使用 SET 命令和 Lua 脚本在 Redis 单节点上完成了分布式锁的加锁和解锁。

### 数据结构

String的数据结构为**简单动态字符串**(Simple Dynamic String,缩写SDS)。是可以修改的字符串，内部结构实现上类似于Java的ArrayList，采用预分配冗余空间的方式来减少内存的频繁分配.

![image-20210916191943760](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210916191943760.png)

如图中所示，内部为当前字符串实际分配的空间capacity一般要高于实际字符串长度len。当字符串长度小于1M时，扩容都是加倍现有的空间，如果超过1M，扩容时一次只会多扩1M的空间。需要注意的是字符串最大长度为512M。

> SDS  不仅可以保存文本数据，还可以保存二进制数据。因为 `SDS` 使用 `len` 属性的值而不是空字符来判断字符串是否结束，并且 SDS 的所有 API 都会以处理二进制的方式来处理 SDS 存放在 `buf[]` 数组里的数据。所以 SDS 不光能存放文本数据，而且能保存图片、音频、视频、压缩文件这样的二进制数据

> SDS 获取字符串长度的时间复杂度是 O(1)。因为 C 语言的字符串并不记录自身长度，所以获取长度的复杂度为 O(n)；而 SDS 结构里用 `len` 属性记录了字符串长度，所以复杂度为 `O(1)`。

> Redis 的 SDS API 是安全的，拼接字符串不会造成缓冲区溢出。因为 SDS 在拼接字符串之前会检查 SDS 空间是否满足要求，如果空间不够会自动扩容，所以不会导致缓冲区溢出的问题。

## 列表(List)

> Redis 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）。它的底层实际是个**双向链表**，对两端的操作性能很高，通过索引下标的操作中间的节点性能会较差。常用来存储一个有序数据，例如：**朋友圈点赞列表，评论列表等**。
>

> List 列表是简单的字符串列表，**按照插入顺序排序**，可以从头部或尾部向 List 列表添加元素。列表的最大长度为 `2^32 - 1`，也即每个列表支持超过 `40 亿`个元素。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207162228468.png" alt="image-20220716222830385" style="zoom:80%;" />

Redis中的List类型与Java中的LinkedList类似。既可以支持正向检索和也可以支持反向检索。

> 有序、元素可以重复、、插入和删除快、查询速度一般

### 常用命令

```lua
-- 从左边/右边插入一个或多个值
lpush k1 v1 v2 v3 .... 
rpush k1 v1 v2 v3 .... 
-- 从左边/右边吐出一个值,吐出值后元素就不在列表中了。值在键在，值亡键亡
lpop/rpop k1
-- 从<key1>列表右边吐出一个值，插到<key2>列表左边。
rpoplpush <key1> <key2>
-- BLPOP和BRPOP：与LPOP和RPOP类似，只不过在没有元素时等待指定时间（下设100s），而不是直接返回nil
blpop k1 100
brpop k1 100

-- 按照索引下标获得元素(从左到右)
lrange <key> <start> <stop>

-- 0左边第一个，-1右边第一个，（0-1表示获取所有）
lrange mylist 0 -1 

-- 按照索引下标获得元素(从左到右)
lindex <key><index>

-- 获得列表长度 
llen <key>

-- 在<value>的后面插入<newvalue>插入值
linsert <key> before <value><newvalue>

-- 从左边删除n个value(从左到右)，value表示多个相同的value
lrem <key> <n> <value>

-- 将列表key下标为index的值替换成value
lset <key> <index> <value>
```

### 数据结构

> List的数据结构为快速链表quickList。首先在列表元素较少的情况下会使用一块连续的内存存储，这个结构是ziplist，也即是压缩列表。它将所有的元素紧挨着一起存储，分配的是一块连续的内存。

> 当数据量比较多的时候才会改成quicklist。因为普通的链表需要的附加指针空间太大，会比较浪费空间。比如这个列表里存的只是int类型的数据，结构上还需要两个额外的指针prev和next。

![image-20210916194212615](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210916194212615.png)

> Redis将链表和ziplist结合起来组成了quicklist。也就是将多个ziplist使用双向指针串起来使用。这样既满足了快速的插入删除性能，又不会出现太大的空间冗余。
>

## 集合(Set)

> Redis set对外提供的功能与list类似是一个列表的功能，特殊之处在于set是可以**自动去重**的，当你需要存储一个列表数据，又不希望出现重复数据时，set是一个很好的选择，并且**set提供了判断某个成员是否在一个set集合内**的重要方法，这个也是list所不能提供的。

> Redis的Set是string类型的无序集合。它底层其实是一个value为null的hash表，所以添加，删除，查找的复杂度都是O(1)一个集合最多可以存储 `2^32-1` 个元素

> - **无序、元素不可重复、查找快、支持交集、并集、差集等功能**
> - **List 可以存储重复元素，Set 只能存储非重复元素**
> - **List 是按照元素的先后顺序存储元素的，而 Set 则是无序方式存储元素的**

### 常见命令

#### 增删查

```lua
-- 将一个或多个 member 元素加入到集合 key 中，已经存在的 member 元素将被忽略
sadd  <key>  <value1> <value2> ..... 
sadd s1 a b c

-- 取出该集合的所有值
smembers <key>
smembers s1

-- 删除集合中的某个元素
srem <key> <value1> <value2> ....
srem s1 a

-- 判断集合<key>是否为含有该<value>值，有1，没有0
sismember <key><value>
sismember s1 a
```

#### 交并差集⭐

> 使用详见下面的实战案例

```lua
-- 返回两个集合的交集元素
sinter <key1> <key2>
-- 将交集结果存入新集合destination中
sinterstore destination key [key ...]

-- 返回两个集合的并集元素
sunion <key1> <key2>

-- 将并集结果存入新集合destination中
sunionstore destination key [key ...]

-- 返回两个集合的差集元素(key1中的，不包含key2中的)
sdiff <key1> <key2>

-- 将差集结果存入新集合destination中
sdiffstore destination key [key ...]
```

#### 其他命令

```lua
-- 返回该集合的元素个数
scard <key>

-- 随机从该集合中吐出一个值，从集合key中随机选出count个元素，元素从key中删除
spop <key> 

-- 随机从该集合中取出n个值。不会从集合中删除
srandmember <key><n> 

-- 把集合中一个值从一个集合移动到另一个集合
smove <source> <destination> value
```

### 实战演练 ⭐

> 将下列数据用Redis的Set集合来存储：
>

> 张三的好友有：李四、王五、赵六
>

```apl
sadd zs lisi wangwu zhaoliu
```

> 李四的好友有：王五、麻子、二狗
>

```apl
sadd ls wangwu mazi ergou
```

利用Set的命令实现下列功能：

```apl
# 计算张三的好友有几人，3
scard zs

# 计算张三和李四有哪些共同好友，"wangwu"
sinter zs ls

# 查询张三和李四的好友总共有哪些人
sunion zs ls

# 查询哪些人是张三的好友却不是李四的好友，"zhaoliu"，"lisi"
sdiff zs ls

# 判断李四是否是张三的好友，1
sismember zs lisi

# 判断张三是否是李四的好友，0
sismember lsis zs

# 将李四从张三的好友列表中移除，1
srem zs lisi

# 再次查看张三好友，"zhaoliu"，"wangwu"
smembers zs
```

### 应用场景

> 因此 Set 类型比较适合用来数据去重和保障数据的唯一性，还可以用来统计多个集合的交集、错集和并集等，当我们存储的数据是无序并且需要去重的情况下，比较适合使用集合类型进行存储。
>

> 但是要提醒你一下，这里有一个潜在的风险。**Set 的差集、并集和交集的计算复杂度较高，在数据量较大的情况下，如果直接执行这些计算，会导致 Redis 实例阻塞**。
>

> 在主从集群中，为了避免主库因为 Set 做聚合计算（交集、差集、并集）时导致主库被阻塞，**我们可以选择一个从库完成聚合统计，或者把数据返回给客户端，由客户端来完成聚合统计。**
>

#### 点赞

Set 类型可以保证一个用户只能点一个赞，这里举例子一个场景，key 是文章id，value 是用户id。

`uid:1` 、`uid:2`、`uid:3`  三个用户分别对 article:1 文章点赞了。

```apl
# uid:1 用户对文章 article:1 点赞
sadd article:1 uid:1
# uid:2 用户对文章 article:1 点赞
sadd article:1 uid:2
# uid:3 用户对文章 article:1 点赞
sadd article:1 uid:3
```

`uid:1` 取消了对 article:1 文章点赞。

```apl
srem article:1 uid:1
```

获取  article:1 文章所有点赞用户 :

```apl
smembers article:1
```

获取 article:1 文章的点赞用户数量：

```apl
scard article:1
```

判断用户 `uid:1` 是否对文章 article:1 点赞了

```apl
# 返回0说明没点赞，返回1则说明点赞了
sismember article:1 uid:1 
```

#### 共同关注

> Set 类型支持交集运算，所以可以用来计算共同关注的好友、公众号等。key 可以是用户id，value 则是已关注的公众号的id。uid:1 用户关注公众号 id 为 5、6、7、8、9，uid:2用户关注公众号 id 为 7、8、9、10、11
>

```apl
# uid:1 用户关注公众号 id 为 5、6、7、8、9
sadd uid:1 5 6 7 8 9
# uid:2  用户关注公众号 id 为 7、8、9、10、11
sadd uid:2 7 8 9 10 11
```

`uid:1` 和 `uid:2` 共同关注的公众号：

```apl
# 获取共同关注
siner uid:1 uid:2
```

给  `uid:2`  推荐 `uid:1` 关注的公众号：

```apl
sdiff uid:1 uid:2
```

验证某个公众号是否同时被  `uid:1`  或  `uid:2`  关注:

```apl
# 返回0，说明没关注，返回1，说明关注了
sismember uid:1 5
sismember uid:2 5
```

#### 抽奖活动

> 存储某活动中中奖的用户名 ，Set 类型因为有去重功能，可以保证同一个用户不会中奖两次。key为抽奖活动名，value为员工名称，把所有员工名称放入抽奖箱 ：
>

```apl
sadd lucky Tom Jerry John Sean Marry Lindy Sary Mark
```

如果允许重复中奖，可以使用 SRANDMEMBER 命令。

```apl
# 抽取 1 个一等奖，抽取 2 个二等奖：
srandmember lucky 1
srandmember lucky 2
# 抽取 3 个三等奖
srandmember lucky 3
```

如果不允许重复中奖，可以使用 SPOP 命令。

```apl
# 抽取一等奖1个,# 抽取二等奖2个,# 抽取三等奖3个
spop lucky 1
spop lucky 2
spop lucky 3
```



### 数据结构

> Set 类型的底层数据结构是由**哈希表或整数集合**实现的：
>
> - 如果集合中的元素都是整数且元素个数小于 `512` （默认值，`set-maxintset-entries`配置）个，Redis 会使用**整数集合**作为 Set 类型的底层数据结构；
> - 如果集合中的元素不满足上面条件，则 Redis 使用**哈希表**作为 Set 类型的底层数据结构。

## 有序集合Zset

> Redis有序集合zset与普通集合set非常相似，是一个**没有重复元素的字符串集合**。不同之处是有序集合的每个成员都关联了一个**评分（score）**，**这个评分（score）被用来按照从最低分到最高分的方式排序集合中的成员**。集合的成员是唯一的，但是评分可以是重复了 。

> 因为元素是有序的, 所以你也可以很快的根据评分（score）或者次序（position）来获取一个范围的元素。访问有序集合的中间元素也是非常快的,因此你能够使用有序集合作为一个没有重复成员的智能列表。**可排序、元素不重复、查询速度快、经常被用来实现排行榜这样的功能**。

### 命令使用

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301241113557.png" alt="image-20230124111301402" style="zoom:60%;" />

```ASN.1
-- 将一个或多个member元素及其 score 值加入到有序集key当中
zadd <key> <score1><value1> <score2><value2>…
zadd topn 10 java 20 c++ 15 c 14 mysql 17 redis

-- 返回有序集key中，下标在<start><stop>之间的元素带withscores，可以让分数一起和值返回到结果集
zrange <key> <start><stop> [WITHSCORES]
zrange topn 0 -1
zrange topn 0 -1 withscores

-- 元素个数
zcard key

-- 返回有序集key中，所有score 值介于min和max之间(包括等于min或max)的成员。
-- 有序集成员按 score 值递增(从小到大)次序排列
zrangebyscore key minmax [withscores] [limit offset count]
zrangebyscore topn 10 15
zrangebyscore topn 10 15 withscores

-- 改为从大到小排列，排名默认升序，降序则在Z后面加上REV即可，如下
zrevrangebyscore key max min [withscores] [limit offset count]        
zrevrangebyscore topn 20 14
zrevrangebyscore topn 20 14 withscores

-- 为元素的score加上增量
zincrby <key> <increment> <value>   
zincrby topn 2 mysql

-- 删除该集合下，指定值的元素
zrem <key><value>
zrem topn java

-- 统计该集合，分数区间内的元素个数 
zcount <key><min><max>
zcount topn 10 15

-- 返回该值在集合中的排名，从0开始
zrank <key><value>
zrank topn mysql
```

### 实战案例

```lua
-- 将班级的下列学生得分存入Redis的SortedSet中：并实现下列功能：
zadd stus 85 Jack 89 Lucy 82 Rose 95 Tom 78 Jerry 92 Amy 76 Miles

-- 删除Tom同学
zrem stus Tom

-- 获取Rose同学的排名:2
zrank stus Rose

-- 查询80分以下有几个学生:2
zcount stus 0 80

-- 给Amy同学加2分
zincrby stus 2 Amy

-- 查出成绩前3名的同学
zrevrange stus 0 2

-- 查出成绩80分以下的所有同学
zrangebyscore stus 0 80
```



### **应用场景**

> Zset 类型（Sorted Set，有序集合） 可以根据元素的权重来排序，我们可以自己来决定每个元素的权重值。比如说，我们可以根据元素插入 Sorted Set 的时间确定权重值，先插入的元素权重小，后插入的元素权重大。
>
> 在面对需要展示最新列表、排行榜等场景时，如果数据更新频繁或者需要分页显示，可以优先考虑使用 Sorted Set。

#### 排行榜

有序集合比较典型的使用场景就是排行榜。例如学生成绩的排名榜、游戏积分排行榜、视频播放排名、电商系统中商品的销量排名等。我们以博文点赞排名为例，小林发表了五篇博文，分别获得赞为 200、40、100、50、150。

```lua
zadd <key> <score1><value1> <score2><value2>…
# arcticle:1 文章获得了200个赞
zadd user:xiaolin:ranking 200 arcticle:1
# arcticle:2 文章获得了40个赞
zadd user:xiaolin:ranking 40 arcticle:2
# arcticle:3 文章获得了100个赞
zadd user:xiaolin:ranking 100 arcticle:3
# arcticle:4 文章获得了50个赞
zadd user:xiaolin:ranking 50 arcticle:4
# arcticle:5 文章获得了150个赞
zadd user:xiaolin:ranking 150 arcticle:5
```

文章 arcticle:4 新增一个赞，可以使用 ZINCRBY 命令（为有序集合key中元素member的分值加上increment）：

```c
zincrby user:xiaolin:ranking 1 arcticle:4
"51"
```

查看某篇文章的赞数，可以使用 ZSCORE 命令（返回有序集合key中元素个数）：

```c
zscore user:xiaolin:ranking arcticle:4
"50"
```

获取小林文章赞数最多的 3 篇文章，可以使用 ZREVRANGE ，倒序获取有序集合 key 从start下标到stop下标的元素

```c
# WITHSCORES 表示把 score 也显示出来
> zrevrange user:xiaolin:ranking 0 2 withscores
1) "arcticle:1"
2) "200"
3) "arcticle:5"
4) "150"
5) "arcticle:3"
6) "100"
```

获取小林 100 赞到 200 赞的文章，可以使用 ZRANGEBYSCORE 命令（返回有序集合中指定分数区间内的成员，分数由低到高排序）：

```c
> zrangebyscore user:xiaolin:ranking 100 200 withscores
1) "arcticle:3"
2) "100"
3) "arcticle:5"
4) "150"
5) "arcticle:1"
6) "200"
```

#### 电话、姓名排序

使用有序集合的 `ZRANGEBYLEX` 或 `ZREVRANGEBYLEX` 可以帮助我们实现电话号码或姓名的排序，我们以 `ZRANGEBYLEX` （返回指定成员区间内的成员，按 key 正序排列，分数必须相同）为例。

**注意：不要在分数不一致的 SortSet 集合中去使用 ZRANGEBYLEX和 ZREVRANGEBYLEX 指令，因为获取的结果会不准确。**

*1、电话排序*

我们可以将电话号码存储到 SortSet 中，然后根据需要来获取号段：

```c
> ZADD phone 0 13100111100 0 13110114300 0 13132110901 
(integer) 3
> ZADD phone 0 13200111100 0 13210414300 0 13252110901 
(integer) 3
> ZADD phone 0 13300111100 0 13310414300 0 13352110901 
(integer) 3
```

获取所有号码:

```c
> ZRANGEBYLEX phone - +
1) "13100111100"
2) "13110114300"
3) "13132110901"
4) "13200111100"
5) "13210414300"
6) "13252110901"
7) "13300111100"
8) "13310414300"
9) "13352110901"
```

获取 132 号段的号码：

```c
> ZRANGEBYLEX phone [132 (133
1) "13200111100"
2) "13210414300"
3) "13252110901"
```

获取132、133号段的号码：

```c
> ZRANGEBYLEX phone [132 (134
1) "13200111100"
2) "13210414300"
3) "13252110901"
4) "13300111100"
5) "13310414300"
6) "13352110901"
```

2、姓名排序

```c
> zadd names 0 Toumas 0 Jake 0 Bluetuo 0 Gaodeng 0 Aimini 0 Aidehua 
(integer) 6
```

获取所有人的名字:

```c
> ZRANGEBYLEX names - +
1) "Aidehua"
2) "Aimini"
3) "Bluetuo"
4) "Gaodeng"
5) "Jake"
6) "Toumas"
```

获取名字中大写字母A开头的所有人：

```c
> ZRANGEBYLEX names [A (B
1) "Aidehua"
2) "Aimini"
```

获取名字中大写字母 C 到 Z 的所有人：

```c
> ZRANGEBYLEX names [C [Z
1) "Gaodeng"
2) "Jake"
3) "Toumas"
```

#### 班级分数

将班级的下列学生得分存入Redis的SortedSet中：

Jack 85, Lucy 89, Rose 82, Tom 95, Jerry 78, Amy 92, Miles 76

```apl
zadd stus 85 Jack  89 Lucy  82 Rose 95 Tom 78 Jerry 92 Amy 76 Miles
```

并实现下列功能：

- 删除Tom同学

```apl
# 1
zrem stus Tom
```

- 获取Amy同学的分数

```apl
zscore  stus  Amy
```

- 获取Rose同学的排名

```apl
zrank stus  Rose
```

- 查询80分以下有几个学生

```apl
zcount  stus  0  80
```

- 给Amy同学加2分

```apl
zincrby stus 2  Amy
```

- 查出成绩前3名的同学

```apl
zrange stus 0  2
# 后三名同学
zrevrange  stus  0 2
```

- 查出成绩80分以下的所有同学

```apl
zrangebyscore stus  0  80
```



### 数据结构

#### 基本数据结构

> SortedSet(zset)是Redis提供的一个非常特别的数据结构，一方面它等价于Java的数据结构Map<String, Double>，可以给每一个元素value赋予一个权重score，另一方面它又类似于TreeSet，内部的元素会按照权重score进行排序，可以得到每个元素的名次，还可以通过score的范围来获取元素的列表。

zset底层使用了两个数据结构

> hash，hash的作用是关联元素value和权重score，保障元素value的唯一性，可以通过元素value找到相应的score值
>
> 跳跃表，跳跃表的目的在于给元素value排序，根据score的范围获取元素列表。

#### 跳跃表

> 有序集合在生活中比较常见，例如根据成绩对学生排名，根据得分对玩家排名等。对于有序集合的底层实现，可以用数组、平衡树、链表等。数组不便元素的插入、删除；平衡树或红黑树虽然效率高但结构复杂；链表查询需要遍历所有效率低。Redis采用的是跳跃表。跳跃表效率堪比红黑树，实现远比红黑树简单。

对比有序链表和跳跃表，从链表中查询出51

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301251054831.png" alt="image-20230125105446724" style="zoom:67%;" />

要查找值为51的元素，需要从第一个元素开始依次查找、比较才能找到。共需要6次比较。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301251055059.png" alt="image-20230125105512942" style="zoom:67%;" />

从第2层开始，1节点比51节点小，向后比较。

21节点比51节点小，继续向后比较，后面就是NULL了，所以从21节点向下到第1层

在第1层，41节点比51节点小，继续向后，61节点比51节点大，所以从41向下

在第0层，51节点为要查找的节点，节点被找到，共查找4次。

 从此可以看出跳跃表比有序链表效率要高



## 哈希(Hash)

> Hash类型，也叫散列，其value是一个无序字典，**类似于Java中的HashMap结构**。**Hash类型特别适用于存储对象，方便修改对象的某个属性**
>

### String & Hash 结构

> **String结构是将对象序列化为JSON字符串后存储**，**当需要修改对象某个字段时很不方便**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205042054477.png" alt="image-20220504205408418" style="zoom:80%;" />

> **Hash结构可以将对象中的每个字段独立存储，可以针对单个字段做CRUD**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205042054772.png" alt="image-20220504205457710" style="zoom:80%;" />

### 命令使用

> 本质上就是在String命令上加了个h前缀

#### 增加查询

```sql
-- 给<key>集合中<field>键赋值<value>，添加或者修改hash类型key的field的值
hset key field value
hset user:1001 id 1
hset user:1001 name zhangsan
hset user:1001 age 33
-- 修改的时候会直接进行覆盖
hset user:1001 age 55
-- 批量存储
hmset user:1002 id 2 name lisi port 1003 school TUT

-- 从<key1>集合<field>取出 value，获取一个hash类型key的field的值
hget user:1001 name
-- 批量获取多个hash类型key的field的值
hmget user:1002 id name school
```

#### 批量获取键值

```lua
-- 获取一个hash类型的key中的所有的field和value
hgetall user:1002
-- 列出该hash集合的所有field
hkeys user:1002
-- 列出该hash集合的所有value，获取一个hash类型的key中的所有的value
hvals user:1002
-- 查看哈希表 key 中，给定域 field 是否存在
hexists user:1002 name
```

#### 自增自减

```lua
-- 为哈希表 key 中的域 field 的值加上增量,让一个hash类型key的字段值自增并指定步长
hincrby <key> <field> <increment>
-- 给id增加2
hincrby user:1002 id 2
-- 给id自减2
hincrby user:1002 id -2
```

#### 组合命令

```lua
-- 添加一个hash类型的key的field值，前提是这个field不存在，否则不执行
hsetnx <key> <field> <value>
hsetnx user:1002 school TJUT
```

### 应用场景

#### 缓存对象

Hash 类型的 （key，field， value） 的结构与对象的（对象id， 属性， 值）的结构相似，也可以用来存储对象。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301251139299.png" alt="image-20230125113902191" style="zoom: 60%;" />

我们可以使用如下命令，将用户对象的信息存储到 Hash 类型：

```apl
# 存储一个哈希表uid:1的键值
hset uid:1 name Tom age 15
# 存储一个哈希表uid:2的键值
hset uid:2 name Jerry age 13
# 获取哈希表用户id为1中所有的键值
hgetall uid:1
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301251138888.png" alt="image-20230125113828741" style="zoom:67%;" />

#### 购物车

以用户 id 为 key，商品 id 为 field，商品数量为 value，恰好构成了购物车的3个要素，如下图所示。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206182221093.png" alt="image-20220618222142941" style="zoom:50%;" />

涉及的命令如下：

- 添加商品：`HSET cart:{用户id} {商品id} 1`
- 添加数量：`HINCRBY cart:{用户id} {商品id} 1`
- 商品总数：`HLEN cart:{用户id}`
- 删除商品：`HDEL cart:{用户id} {商品id}`
- 获取购物车所有商品：`HGETALL cart:{用户id}`

当前仅仅是将商品ID存储到了Redis 中，在回显商品具体信息的时候，还需要拿着商品 id 查询一次数据库，获取完整的商品的信息

###  数据结构

Hash 类型的底层数据结构是由**压缩列表或哈希表**实现的：

- 如果哈希类型元素个数小于 `512` 个（默认值，可由 `hash-max-ziplist-entries` 配置），所有值小于 `64` 字节（默认值，可由 `hash-max-ziplist-value` 配置）的话，Redis 会使用**压缩列表**作为 Hash 类型的底层数据结构；
- 如果哈希类型元素不满足上面条件，Redis 会使用**哈希表**作为 Hash 类型的 底层数据结构。

**在 Redis 7.0 中，压缩列表数据结构已经废弃了，交由 listpack 数据结构来实现了**。



# 新数据类型⭐

## Bitmaps 位操作

> Redis提供了Bitmaps这个“数据类型”可以实现对位的操作：Bitmaps本身不是一种数据类型， 实际上它就是字符串（key-value） ， 但是它可以对字符串的位进行操作。
>

> Bitmaps单独提供了一套命令， 所以在Redis中使用Bitmaps和使用字符串的方法不太相同。 **可以把Bitmaps想象成一个以位为单位的数组， 数组的每个单元只能存储0和1， 数组的下标在Bitmaps中叫做偏移量。**
>

> 我们按月来统计用户签到信息，签到记录为1，未签到则记录为0，把每一个bit位对应当月的每一天，形成了映射关系。用0和1标示业务状态，这种思路就称为位图（BitMap）。Redis中是利用string类型数据结构实现BitMap，因此最大上限是512M，转换为bit则是 2^32个bit位。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220316110556705.png" alt="image-20220316110556705" style="zoom: 80%;" />

> 什么是二值统计
>
> 也就是集合中的元素的值只有 0 和 1 两种，在签到打卡和用户是否登陆的场景中，只需记录`签到(1)`或 `未签到(0)`，`已登录(1)`或`未登陆(0)`。

### 内部实现

> Bitmap 本身是用 String 类型作为底层数据结构实现的一种统计二值状态的数据类型。
>
> String 类型是会保存为二进制的字节数组，所以，Redis 就把字节数组的每个 bit 位利用起来，用来表示一个元素的二值状态，你可以把 Bitmap 看作是一个 bit 数组。

### 常用命令

```apl
# 设置值，其中value只能是 0 和 1
setbit key offset value
setbit users:20210101 1 1
setbit users:20210101 6 1
setbit users:20210102 11 1
setbit users:20210102 13 1

# 获取值
getbit key offset
getbit users:20210101 13

# 获取指定范围内值为 1 的个数，start 和 end 以字节为单位
bitcount key start end
bitcount users:20210101 0 -1
# bitop 运算，bitop是一个复合操作
# 它可以做多个Bitmaps的and（交集） 、 or（并集） 、 not（非） 、 xor（异或） 
# 操作并将结果保存在destkey中
bitop and(or/not/xor) <destkey> [key1 key2…]
bitop and desk1 users:20210101 users:20210102
```

### 实战演练

2020-11-04 日访问网站的userid=1,2,5,9。

```assembly
setbit unique:users:20201104 1 1

setbit unique:users:20201104 2 1

setbit unique:users:20201104 5 1

setbit unique:users:20201104 9 1
```

2020-11-03 日访问网站的userid=0,1,4,9

```assembly
setbit unique:users:20201103 0 1

setbit unique:users:20201103 1 1

setbit unique:users:20201103 4 1

setbit unique:users:20201103 9 1
```

 计算出两天都访问过网站的**用户数量**，结果为2，有两天是都访问过

```assembly
bitop and desk1 unique:users:20201103 unique:users:20201104
bitcount desk1
```

计算出任意一天都访问过网站的**用户数量**（例如月活跃就是类似这种） ， 可以使用or求**并集(去重)**，结果为6

```assembly
bitop or desk2 unique:users:20201103 unique:users:20201104
bitcount desk2
```



### **应用场景**

> Bitmap 类型非常适合二值状态统计的场景，这里的二值状态就是指集合元素的取值就只有 0 和 1 两种，在记录海量数据时，Bitmap 能够有效地节省内存空间。

#### 用户签到统计⭐

在签到打卡的场景中，我们只用记录签到（1）或未签到（0），所以它就是非常典型的二值状态。

> 签到统计时，每个用户一天的签到用 1 个 bit 位就能表示，一个月（假设是 31 天）的签到情况用 31 个 bit 位就可以，而一年的签到也只需要用 365 个 bit 位，根本不用太复杂的集合类型。

比如统计编号 89757 的用户在 2021 年 5 月份的打卡情况要如何进行？

> key 可以设计成 `uid:sign:{userId}:{yyyyMM}`，月份的每一天的值 - 1 可以作为 offset（因为 offset 从 0 开始，所以 `offset = 日期 - 1`）。

假设我们要统计 ID 100 的用户在 2022 年 6 月份的签到情况，就可以按照下面的步骤进行操作。

第一步，执行下面的命令，记录该用户 6 月 3 号已签到。

```c
SETBIT uid:sign:100:202206 2 1
```

第二步，检查该用户 6 月 3 日是否签到。

```c
GETBIT uid:sign:100:202206 2 
```

第三步，统计该用户在 6 月份的签到次数。

```c
BITCOUNT uid:sign:100:202206
```

这样，我们就知道该用户在 6 月份的签到情况了。

> 如何统计这个月首次打卡时间呢？

Redis 提供了 `BITPOS key bitValue [start] [end]`指令，返回数据表示 Bitmap 中第一个值为 `bitValue` 的 offset 位置。

在默认情况下， 命令将检测整个位图， 用户可以通过可选的 `start` 参数和 `end` 参数指定要检测的范围。所以我们可以通过执行这条命令来获取 userID = 100 在 2022 年 6 月份**首次打卡**日期：

```c
BITPOS uid:sign:100:202206 1
```

> 需要注意的是，因为 offset 从 0 开始的，所以我们需要将返回的 value + 1 。
>

#### 判断用户登陆状态⭐

> 怎么用 Bitmap 来判断海量用户中某个用户是否在线呢？

Bitmap 提供了 `GETBIT、SETBIT` 操作，通过一个偏移值 offset 对 bit 数组的 offset 位置的 bit 位进行读写操作，需要注意的是 offset 从 0 开始。

> 只需要一个 key = login_status 表示存储用户登陆状态集合数据， 将用户 ID 作为 offset，在线就设置为 1，下线设置 0。通过 `GETBIT`判断对应的用户是否在线。50000 万 用户只需要 6 MB 的空间。
>

假如我们要判断 ID = 10086 的用户的登陆情况：

第一步，执行以下指令，表示用户已登录。

```c
SETBIT login_status 10086 1
```

第二步，检查该用户是否登陆，返回值 1 表示已登录。

```c
GETBIT login_status 10086
```

第三步，登出，将 offset 对应的 value 设置成 0。

```c
SETBIT login_status 10086 0
```



#### 连续签到用户总数

> 在记录了一个亿的用户连续 7 天的打卡数据，如何统计出这连续 7 天连续打卡用户总数呢？

我们把每天的日期作为 Bitmap 的 key，userId 作为 offset，若是打卡则将 offset 位置的 bit 设置成 1。

key 对应的集合的每个 bit 位的数据则是一个用户在该日期的打卡记录。

一共有 7 个这样的 Bitmap，如果我们能对这 7 个 Bitmap 的对应的 bit 位做 『与』运算。同样的 UserID offset 都是一样的，当一个 userID 在 7 个 Bitmap 对应对应的 offset 位置的 bit = 1 就说明该用户 7 天连续打卡。

结果保存到一个新 Bitmap 中，我们再通过 `BITCOUNT` 统计 bit = 1 的个数便得到了连续打卡 3 天的用户总数了。

Redis 提供了 `BITOP operation destkey key [key ...]`这个指令用于对一个或者多个 key 的 Bitmap 进行位元操作。

`opration` 可以是 `and`、`OR`、`NOT`、`XOR`。当 BITOP 处理不同长度的字符串时，较短的那个字符串所缺少的部分会被看作 `0` 。空的 `key` 也被看作是包含 `0` 的字符串序列。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208131823521.png" alt="image-20220813182345432" style="zoom:50%;" />

3 个 Bitmap，对应的 bit 位做「与」操作，结果保存到新的 Bitmap 中。

操作指令表示将 三个 bitmap 进行 AND 操作，并将结果保存到 destmap 中。接着对 destmap 执行 BITCOUNT 统计。

举个例子，比如将三个 bitmap 进行 AND 操作，并将结果保存到 destmap 中，接着对 destmap 执行 BITCOUNT 统计。

```apl
# 与操作
BITOP AND destmap bitmap:01 bitmap:02 bitmap:03
# 统计 bit 位 =  1 的个数
BITCOUNT destmap
```

> 即使一天产生一个亿的数据，Bitmap 占用的内存也不大，大约占 12 MB 的内存（10^8/8/1024/1024），7 天的 Bitmap 的内存开销约为 84 MB。同时我们最好给 Bitmap 设置过期时间，让 Redis 删除过期的打卡数据，节省内存。

思路才是最重要，当我们遇到的统计场景只需要统计数据的二值状态，比如用户是否存在、 ip 是否是黑名单、以及签到打卡统计等场景就可以考虑使用 Bitmap。

只需要一个 bit 位就能表示 0 和 1。在统计海量数据的时候将大大减少内存占用。



### Bitmaps与set对比

假设网站有1亿用户， 每天独立访问的用户有5千万， 如果每天用集合类型和Bitmaps分别存储活跃用户可以得到表

**存储一天活跃用户对比**

| 数据类型 | 每个用户id占用空间 | 需要存储的用户量 | 全部内存量             |
| -------- | ------------------ | ---------------- | ---------------------- |
| 集合类型 | 64位               | 50000000         | 64位*50000000 = 400MB  |
| Bitmaps  | 1位                | 100000000        | 1位*100000000 = 12.5MB |

**存储独立用户空间对比**

很明显， 这种情况下使用Bitmaps能节省很多的内存空间， 尤其是随着时间推移节省的内存还是非常可观的

| 数据类型 | 一天   | 一个月 | 一年  |
| -------- | ------ | ------ | ----- |
| 集合类型 | 400MB  | 12GB   | 144GB |
| Bitmaps  | 12.5MB | 375MB  | 4.5GB |

 但Bitmaps并不是万金油， 假如该网站每天的独立访问用户很少， 例如只有10万（大量的僵尸用户） ， 那么两者的对比如下表所示， 很显然， 这时候使用Bitmaps就不太合适了， 因为基本上大部分位都是0

**存储一天活跃用户对比（独立用户比较少）**

| 数据类型 | 每个userid占用空间 | 需要存储的用户量 | 全部内存量             |
| -------- | ------------------ | ---------------- | ---------------------- |
| 集合类型 | 64位               | 100000           | 64位*100000 = 800KB    |
| Bitmaps  | 1位                | 100000000        | 1位*100000000 = 12.5MB |

 主要功能：进行位操作。可以提高效率



##  HyperLogLog

### 基本介绍

#### UV & PV

在工作当中，我们经常会遇到与统计相关的功能需求，比如统计网站PV（PageView页面访问量）,可以使用Redis的incr、incrby轻松实现。

> UV：全称UniqueVisitor，也叫独立访客量，是指通过互联网访问、浏览这个网页的自然人。1天内同一个用户多次访问该网站，只记录1次。
>
> PV：**全称**PageView，也叫页面访问量或点击量，用户每访问网站的一个页面，记录1次PV，用户多次打开页面，则记录多次PV。往往用来衡量网站的流量。

#### 基数问题

但像UV（UniqueVisitor，独立访客）、独立IP数、搜索记录数等需要去重和计数的问题如何解决？这种求集合中不重复元素个数的问题称为基数问题。

> 什么是基数？比如数据集 {1, 3, 5, 7, 5, 7, 8}， 那么这个数据集的基数集为 {1, 3, 5 ,7, 8}, 基数(不重复元素)为5。 基数估计就是在误差可接受的范围内，快速计算基数。

解决基数问题有很多种方案：

> （1）数据存储在MySQL表中，使用distinct count计算不重复个数
>
> （2）使用Redis提供的hash、set、bitmaps等数据结构来处理

以上的方案结果精确，但随着数据不断增加，导致占用空间越来越大，对于非常大的数据集是不切实际的。

能否能够降低一定的精度来平衡存储空间？Redis推出了HyperLogLog

> Redis HyperLogLog 是用来做基数统计的算法，HyperLogLog 的优点是，在输入元素的数量或者体积非常非常大时，计算基数所需的空间总是固定的、并且是很小的。

> 在 Redis 里面，每个 HyperLogLog 键只需要花费 12 KB 内存，就可以计算接近 2^64 个不同元素的基数。这和计算基数时，元素越多耗费内存就越多的集合形成鲜明对比。

> 但是，因为 HyperLogLog 只会根据输入元素来计算基数，而不会储存输入元素本身，所以 HyperLogLog 不能像集合那样，返回输入的各个元素。

### 基本命令

#### pfadd

> 将所有元素添加到指定HyperLogLog中。如果执行命令后HLL估计的近似基数发生变化，则返回1，否则返回0

```apl
# 添加指定元素到 HyperLogLog 中
pfadd key element [element ...]
pfadd lan java c c#
pfadd lan redis mysql
pfadd lan redis
pfadd lan c++
pfadd lan1 c++
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301251008927.png" alt="image-20230125100836793" style="zoom:67%;" />

#### pfcount

> 计算HLL的近似基数，计算多个HLL，比如用HLL存储每天的UV，计算一周的UV可以使用7天的UV合并计算即可

```apl
# 返回给定 HyperLogLog 的基数估算值。
pfcount key [key ...]
pfcount lan # 结果是6，即添加进入的元素总数
pfcount lan lan1  # 自动去重
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301251011972.png" alt="image-20230125101135850" style="zoom:67%;" />

#### pfmerge

> 将一个或多个HLL合并后的结果存储在另一个HLL中，比如每月活跃用户可以使用每天的活跃用户来合并计算可得

```apl
# 将多个 HyperLogLog 合并为一个 HyperLogLog
pfmerge destkey sourcekey [sourcekey ...]
# lan3不存在，lan1和lan2进行合并，自动去重，结果保存到lan3中
pfmerge lan3 lan lan1
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301251013150.png" alt="image-20230125101354017" style="zoom:67%;" />

### 实战演练

我们直接利用单元测试，向HyperLogLog中添加100万条数据，看看内存占用和统计效果如何

```java
@Resource
private StringRedisTemplate stringRedisTemplate;

@Test
void testHyperLogLog() {
    String[] values = new String[1000];
    int j = 0;
    for (int i = 0; i < 1000000; i++) {
        //每隔1000条发一次
        j = i % 1000;
        values[j] = "user_" + i;
        if(j == 999){
            // 发送到Redis
            stringRedisTemplate.opsForHyperLogLog().add("hl2", values);
        }
    }
    // 统计数量
    Long count = stringRedisTemplate.opsForHyperLogLog().size("hl2");
    System.out.println("count = " + count);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301241328882.png" alt="image-20230124132820780" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301241328870.png" alt="image-20230124132844774" style="zoom:67%;" />

### 应用场景⭐

在移动互联网的业务场景中，**数据量很大**，我们需要保存这样的信息：一个 key 关联了一个数据集合，同时对这个数据集合做统计。

- 统计一个 `APP` 的日活、月活数；
- 统计一个页面的每天被多少个不同账户访问量（Unique Visitor，UV））；
- 统计用户每天搜索不同词条的个数；
- 统计注册 IP 数。

通常情况下，我们面临的用户数量以及访问量都是巨大的，比如**百万、千万级别的用户数量，或者千万级别、甚至亿级别**的访问信息。

#### 百万级网页 UV 计数

Redis HyperLogLog  优势在于只需要花费 12 KB 内存，就可以计算接近 2^64 个元素的基数，和元素越多就越耗费内存的 Set 和 Hash 类型相比，HyperLogLog 就非常节省空间。所以，非常适合统计百万级以上的网页 UV 的场景。

在统计 UV 时，你可以用 PFADD 命令（用于向 HyperLogLog 中添加新元素）把访问页面的每个用户都添加到 HyperLogLog 中。

```c
pfadd page1:uv user1 user2 user3 user4 user5
```

接下来，就可以用 PFCOUNT 命令直接获得 page1 的 UV 值了，这个命令的作用就是返回 HyperLogLog 的统计结果。

```c
pfcount page1:uv
```

> 不过，有一点需要你注意一下，HyperLogLog 的统计规则是基于概率完成的，所以它给出的统计结果是有一定误差的，标准误算率是 0.81%。这也就意味着，你使用 HyperLogLog 统计的 UV 是 100 万，但实际的 UV 可能是 101 万。虽然误差率不算大，但是，如果你需要精确统计结果的话，最好还是继续用 Set 或 Hash 类型。
>

## Geospatial

> Redis 3.2 中增加了对GEO类型的支持。GEO，Geographic，地理信息的缩写。该类型，就是元素的2维坐标，在地图上就是经纬度。redis基于该类型，提供了经纬度设置，查询，范围查询，距离查询，经纬度Hash等常见操作。

### 内部实现

GEO 本身并没有设计新的底层数据结构，而是**直接使用了 Sorted Set 集合类型**。

> GEO 类型使用 GeoHash 编码方法实现了经纬度到 Sorted Set 中元素权重分数的转换，这其中的两个关键机制就是「对二维地图做区间划分」和「对区间进行编码」。一组经纬度落在某个区间后，就用区间的编码值来表示，并把编码值作为 Sorted Set 元素的权重分数。

> 这样一来，我们就可以把经纬度保存到 Sorted Set 中，利用 Sorted Set 提供的“按权重进行有序范围查找”的特性，实现 LBS 服务中频繁使用的“搜索附近”的需求。
>

### 基本命令

#### geoadd

```apl
# 添加地理位置（经度，纬度，名称）
geoadd key longitude latitude member [longitude latitude member ...]
# 分别添加上海重庆深圳和北京的经纬度
geoadd china:city 121.47 31.23 shanghai
geoadd china:city 106.50 29.53 chongqing 114.05 22.52 shenzhen 116.38 39.90 beijing
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301250955570.png" alt="image-20230125095520398" style="zoom:67%;" />

> 两极无法直接添加，一般会下载城市数据，直接通过 Java 程序一次性导入。
>
> 有效的经度从 -180 度到 180 度。有效的纬度从 -85.05112878 度到 85.05112878 度。
>
> 当坐标位置超出指定范围时，该命令将会返回一个错误。已经添加的数据，是无法再次往里面添加的。

#### geopos

> 获得指定地区的坐标值，不存在的返回 nil

```assembly
geopos key member [member ...]
geopos china:city shanghai
geopos china:city chongqing
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301250957080.png" alt="image-20230125095704951" style="zoom:67%;" />

#### geodist

> 获取两个位置之间的直线距离

```assembly
geodist key member1 member2 [m|km|ft英里|mi英尺]
geodist china:city chongqing shanghai km
geodist china:city chongqing shanghai m
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301250958217.png" alt="image-20230125095858095" style="zoom:67%;" />

> m 表示单位为米[默认值]。
>
> km 表示单位为千米。
>
> mi 表示单位为英里。
>
> ft 表示单位为英尺。
>
> 如果用户没有显式地指定单位参数， 那么 GEODIST 默认使用米作为单位

#### georadius

```assembly
# 以给定的经纬度为中心，找出某一半径内的元素：经度 纬度 距离 单位
georadius <key> <longitude><latitude>radius m|km|ft|mi  
georadius china:city 110 30 1000 km
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301251000619.png" alt="image-20230125100012481" style="zoom:67%;" />

### 应用场景

#### 滴滴叫车

> 这里以滴滴叫车的场景为例，介绍下具体如何使用 GEO 命令：GEOADD 和 GEORADIUS 这两个命令。
>

> 假设车辆 ID 是 33，经纬度位置是（116.034579，39.030452），我们可以用一个 GEO 集合保存所有车辆的经纬度，集合 key 是 cars:locations。执行这个命令，可以把 ID 号为 33 的车辆的当前经纬度位置存入 GEO 集合中
>

```c
geoadd cars:locations 116.034579 39.030452 33
```

当用户想要寻找自己附近的网约车时，LBS 应用就可以使用 GEORADIUS 命令。

> 例如，LBS 应用执行下面的命令时，Redis 会根据输入的用户的经纬度信息（116.054579，39.030452 ），查找以这个经纬度为中心的 5 公里内的车辆信息，并返回给 LBS 应用。
>

```c
# 结果为33
georadius cars:locations 116.054579 39.030452 5 km ASC COUNT 10
```



# redis.conf 配置文件 ⭐

## 配置详解

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212221119486.png" alt="image-20221222111930293" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212221120897.png" alt="image-20221222112019722" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212221120987.png" alt="image-20221222112046780" style="zoom:80%;" />

## 单位

> 配置大小单位,开头定义了一些基本的度量单位，**只支持bytes，不支持bit**，大小写不敏感
>

```ini
1k => 1000 bytes
1kb => 1024 bytes
1m => 1000000 bytes
1mb => 1024*1024 bytes
1g => 1000000000 bytes
1gb => 1024*1024*1024 bytes
```

## include

> 包含，类似jsp中的include，多实例的情况可以把公用的配置文件提取出来，比如自己想建立一个以端口号为6380启动的配置文件，提取原来的配置文件，然后再进行新增覆盖对应内容即可
>

```ini
include /myredis/redis.conf
pidfile /var/run/redis_6380.pid
port 6380
dbfilename dump6379.rdb
```

## 网络配置 ⭐

### bind

> 默认情况bind=127.0.0.1只能接受本机的访问请求。不写的情况下，无限制接受任何ip地址的访问
>
> 生产环境肯定要写你应用服务器的地址；服务器是需要远程访问的，所以需要将其注释掉
>
> **如果开启了protected-mode，那么在没有设定bind ip且没有设密码的情况下，Redis只允许接受本机的响应**

```ini
bind 0.0.0.0
```

### protected-mode

> no表示允许远程访问，将本机访问保护模式设置no,不然外界访问就会出错，和上面bind都要进行修改
>

```ini
protected-mode no
```

### port

> 端口号，默认 6379
>

```ini
port 6379
```

### tcp-backlog

> 设置tcp的backlog，backlog其实是一个连接队列，backlog队列总和=未完成三次握手队列 + 已经完成三次握手队列。**在高并发环境下你需要一个高backlog值来避免慢客户端连接问题**。
>

> 注意Linux内核会将这个值减小到/proc/sys/net/core/somaxconn的值（128），所以需要确认增大/proc/sys/net/core/somaxconn和/proc/sys/net/ipv4/tcp_max_syn_backlog（128）两个值来达到想要的效果
>

```ini
tcp-backlog 511
```

### timeout

> 一个空闲的客户端维持多少秒会关闭，0表示关闭该功能。即**永不关闭**
>

```ini
timeout 0
```

### tcp-keepalive

> 对访问客户端的一种心跳检测，每个n秒检测一次。
>
> 单位为秒，如果设置为0，则不会进行Keepalive检测，建议设置成60 

```ini
tcp-keepalive 0
```



## GENERAL 通用

### daemonize

> 是否为后台进程，设置为yes，**守护进程，后台启动**。Docker启动redis时要将它修改为no
>

```ini
daemonize yes
```

`Redis`采用的是单进程多线程的模式，`daemonize`是用来指定`redis`是否要用守护线程的方式启动。默认情况下，`Redis`不作为守护进程运行。如果需要，请使用“是”。

```c
daemonize no 
//当前界面将进入redis的命令行界面，exit强制退出或者关闭连接工具(putty，
//xshell等)都会导致redis进程退出。

daemonize yes     
//代表开启守护进程模式。在该模式下，redis 会在后台运行，并将进程 pid 号写入
//至 redis.conf 选项 pidfile 设置的文件中，此时 redis 将一直运行，除非手动kill该进程。
```

### pidfile

> 存放pid文件的位置，每个实例会产生一个不同的pid文件
>

```ini
pidfile "/var/run/redis_6379.pid"
```

### loglevel & logfile

> 指定日志记录级别，Redis总共支持四个级别：debug、verbose、notice、warning，默认为notice，四个级别根据使用阶段来选择，生产环境选择notice 或者warning

```ini
# 日志记录级别
loglevel notice
# 日志文件名称
logfile "server_log.txt"
```

### databases 16 

> 设定库的数量默认16，默认数据库为0，可以使用SELECT id命令在连接上指定数据库id
>

```ini
databases 16
```



## 安全Security⭐

### 永久设置密码

设置密码，去掉前面的注释符号，redis6.0配置文件设置密码不生效了，很奇怪

```sh
vim /etc/redis.conf
```

```ini
# requirepass foobared
requirepass 315217
```

```sh
systemctl restart redis
```

### 临时设置密码

重启redis服务器，密码就还原了

```sh
# 设置密码
config get requirepass
config set requirepass 1234
# 清除密码
config set requirepass ""
```

### 连接使用

设置密码后，要添加密码才能使用

```sh
# 用auth方式加密
redis-cli
auth 315217
set k1 v1
```

```sh
# -a方式输入密码
redis-cli -a 315217
set k2 v2
```



## Limits 限制⭐

### maxclients

> 设置redis同时可以与多少个客户端进行连接。默认情况下为10000个客户端。如果达到了此限制，redis则会拒绝新的连接请求，并且向这些连接请求方发出“max number of clients reached”以作回应。

```ini
maxclients 10000
```

### maxmemory 

> 建议必须设置，否则，将内存占满，造成服务器宕机。设置redis可以使用的内存量。一旦到达内存使用上限，redis将会试图移除内部数据，移除规则可以通过maxmemory-policy来指定。

> 如果redis无法根据移除规则来移除内存中的数据，或者设置了“不允许移除”，那么redis则会针对那些需要申请内存的指令返回错误信息，比如SET、LPUSH等。

> 但是对于无内存申请的指令，仍然会正常响应，比如GET等。如果你的redis是主redis（说明你的redis有从redis），那么在设置内存使用上限时，需要在系统中留出一些内存空间给同步队列缓存，只有在你设置的是“不移除”的情况下，才不用考虑这个因素。

```ini
maxmemory 400mb
```

### maxmemory-policy

> - volatile-lru：使用LRU算法移除key，只对设置了过期时间的键；（最近最少使用）
> - allkeys-lru：在所有集合key中，使用LRU算法移除key
> - volatile-random：在过期集合中移除随机的key，只对设置了过期时间的键
> - allkeys-random：在所有集合key中，移除随机的key
> - volatile-ttl：移除那些TTL值最小的key，即那些最近要过期的key
> - noeviction：不进行移除。针对写操作，只是返回错误信息

```ini
maxmemory-policy noeviction
```

### maxmemory-samples

> - 设置样本数量，LRU算法和最小TTL算法都并非是精确的算法，而是估算值，所以你可以设置样本的大小，redis默认会检查这么多个key并选择其中LRU的那个。
> - 一般设置3到7的数字，数值越小样本越不准确，但性能消耗越小

```ini
maxmemory-samples 5
```

### replica-ignore-maxmemory

 副本忽略最大内存

```apl
replica-ignore-maxmemory yes
```

从`Redis 5`开始，默认情况下，`replica`节点会忽略`maxmemory`设置（除非在发生`failover`后，此节点被提升为`master`节点）。

这意味着只有`master`才会执行过期删除策略，并且`master`在删除键之后会对`replica`发送`DEL`命令。

这个行为保证了`master`和`replicas`的一致性，并且这通常也是你需要的，但是若你的`replica`节点是可写的，或者你希望`replica`节点有不同的内存配置，并且你确保所有到`replica`写操作都幂等的，那么你可以修改这个默认的行为 （请确保你明白你在做什么）。

**「注意」**默认情况下`replica`节点不会执行过期策略，它有可能使用了超过`maxmemory`设定的值的内存。因此你需要监控`replicas`节点所在的机器并且确保在`master`节点到达配置的`maxmemory`大小时，`replicas`节点不会超过物理内存的大小。



# RediSearch + RedisJSON

[比 Elasticsearch 更快！RediSearch + RedisJSON = 王炸！ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247498172&idx=1&sn=f1df934fe4384a27e5ec6340a4642789&chksm=fc2c45b4cb5bcca22e8ac4384c27c93e805e0d1a85432a6c2d69c23e6b96e8677853d92a48cb&mpshare=1&scene=23&srcid=0511TYAaDopOjhhZLHE5LQYX&sharer_sharetime=1652199711433&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

> Redis是开发中非常常用的内存数据存储中间件，之前基本上用它来做内存存储使用。最近发现Redis推出了很多增强模块，例如通过RedisJSON可以支持原生JSON对象的存储，使用RediSearch可以作为搜索引擎使用，并且支持中文搜索！今天给大家带来RediSearch+RedisJSON作为搜索引擎的使用实践，希望对大家有所帮助！

- 官方文档：https://developer.redis.com/howtos/redisjson/
- 参考手册：https://oss.redis.com/redisearch/
- 性能测试：https://redis.com/blog/search-benchmarking-redisearch-vs-elasticsearch/

## RedisMod简介

首先介绍下RedisMod这个东西，它是一系列Redis的增强模块。有了RedisMod的支持，Redis的功能将变得非常强大。目前RedisMod中包含了如下增强模块：

- RediSearch：一个功能齐全的搜索引擎；
- RedisJSON：对JSON类型的原生支持；
- RedisTimeSeries：时序数据库支持；
- RedisGraph：图数据库支持；
- RedisBloom：概率性数据的原生支持；
- RedisGears：可编程的数据处理；
- RedisAI：机器学习的实时模型管理和部署。

## 安装 & 使用

> 首先我们需要安装带所有RedisMod的Redis，使用Docker来安装非常方便的！

使用如下命令下载RedisMod的镜像；

```sh
docker pull redislabs/redismod:preview
```

在容器中运行RedisMod服务。

```sh
docker run -p 6379:6379 --name redismod \
-v /mydata/redismod/data:/data \
-d redislabs/redismod:preview
```

正常使用即可

```sh
docker exec -it redismod bash
redis-cli
```

## RedisJSON

> 有了RedisJSON模块，Redis就可以存储原生JSON类型数据了，通过它你可以很方便地访问JSON中的各个属性，类似在MongoDB中那样，下面我们就来体验下，这里我们将使用RedisInsight 来操作Redis。

- 首先通过`JSON.SET`命令向Redis中添加JSON类型键值对，几个商品对象数据，由于JSON是树形结构的，使用`$`符号代表往JSON的根节点中添加数据；

```apl
JSON.SET product:1 $ '{"id":1,"productSn":"7437788","name":"小米8","subTitle":"全面屏游戏智能手机 6GB+64GB 黑色 全网通4G 双卡双待","brandName":"小米","price":2699,"count":1}'
JSON.SET product:2 $ '{"id":2,"productSn":"7437789","name":"红米5A","subTitle":"全网通版 3GB+32GB 香槟金 移动联通电信4G手机 双卡双待","brandName":"小米","price":649,"count":5}'
JSON.SET product:3 $ '{"id":3,"productSn":"7437799","name":"Apple iPhone 8 Plus","subTitle":"64GB 红色特别版 移动联通电信4G手机","brandName":"苹果","price":5499,"count":10}'
```

- 数据插入成功后，在RedisInsight中将看到如下信息，JSON数据支持格式化高亮显示；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205131719708.png" alt="image-20220513171921617" style="zoom: 67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205131720326.png" alt="image-20220513172003250" style="zoom:80%;" />

- 接下来可以通过`JSON.GET`命令获取JSON类型键值对的值；

```apl
JSON.GET product:1
```

- 也可以只获取值的指定属性，在RedisJSON中，获取JSON对象中的属性时需要以`.`开头；

```apl
JSON.GET product:1 .name .subTitle
```

- 也可以只获取值的指定属性，在RedisJSON中，获取JSON对象中的属性时需要以`.`开头；

```apl
JSON.GET product:1 .name .subTitle
```



## RediSearch

> 通过RediSearch模块，Redis可以变成一个功能强大的全文搜索引擎，并且原生支持中文搜索，下面我们就来体验

- 使用RediSearch来搜索数据之前，我们得先创建下索引，建立索引的语法有点复杂，我们先来看下；

```apl
FT.CREATE {index}
  [ON {data_type}]
     [PREFIX {count} {prefix} [{prefix} ..]
     [LANGUAGE {default_lang}]
  SCHEMA {identifier} [AS {attribute}]
      [TEXT | NUMERIC | GEO | TAG ] [CASESENSITIVE]
      [SORTABLE] [NOINDEX]] ...
```

- 使用`FT.CREATE`命令可以建立索引，语法中的参数意义如下；

- - index：索引名称；
  - data_type：建立索引的数据类型，目前支持JSON或者HASH两种；
  - PREFIX：通过它可以选择需要建立索引的数据前缀，比如`PREFIX 1 "product:"`表示为键中以`product:`为前缀的数据建立索引；
  - LANGUAGE：指定TEXT类型属性的默认语言，使用chinese可以设置为中文；
  - identifier：指定属性名称；
  - attribute：指定属性别名；
  - TEXT | NUMERIC | GEO | TAG：这些都是属性可选的类型；
  - SORTABLE：指定属性可以进行排序。

- 看了语法可能不太好理解，直接对之前的商品数据建立索引试试就懂了；

```apl
FT.CREATE productIdx ON JSON PREFIX 1 "product:" LANGUAGE chinese SCHEMA $.id AS id NUMERIC $.name AS name TEXT $.subTitle AS subTitle TEXT $.price AS price NUMERIC SORTABLE $.brandName AS brandName TAG
```

- 建立完索引后，我们就可以使用`FT.SEARCH`对数据进行查看了，比如使用`*`可以查询全部；

```apl
FT.SEARCH productIdx *
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205131722098.png" alt="image-20220513172223009" style="zoom:67%;" />

- 由于我们设置了`price`字段为`SORTABLE`，我们可以以`price`降序返回商品信息；

```apl
FT.SEARCH productIdx * SORTBY price DESC
```

- 还可以指定返回的字段；

```apl
FT.SEARCH productIdx * RETURN 3 name subTitle price
```

- 我们把`brandName`设置为了`TAG`类型，我们可以使用如下语句查询品牌为`小米`或`苹果`的商品；

```apl
FT.SEARCH productIdx '@brandName:{小米 | 苹果}'
```

- 我们把`brandName`设置为了`TAG`类型，我们可以使用如下语句查询品牌为`小米`或`苹果`的商品；

```apl
FT.SEARCH productIdx '@brandName:{小米 | 苹果}'
```

- 我们把`brandName`设置为了`TAG`类型，我们可以使用如下语句查询品牌为`小米`或`苹果`的商品；

```apl
FT.SEARCH productIdx '@brandName:{小米 | 苹果}'
```

- 在`FT.SEARCH`中直接指定搜索关键词，可以对所有`TEXT`类型的属性进行全局搜索，支持中文搜索，比如我们搜索下包含`黑色`字段的商品；

```apl
FT.SEARCH productIdx '黑色'
```

- 当然我们也可以指定搜索的字段，比如搜索副标题中带有`红色`字段的商品；

```apl
FT.SEARCH productIdx '@subTitle:红色'
```

- 通过`FT.DROPINDEX`命令可以删除索引，如果加入`DD`选项的话，会连数据一起删除；

```apl
FT.DROPINDEX productIdx
```

- 通过`FT.INFO`命令可以查看索引状态；

```apl
FT.INFO productIdx
```

- RediSearch的搜索语法比较复杂，不过我们可以对比SQL来使用它，具体可以参考下表。

  <img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205131725865.png" alt="image-20220513172508778" style="zoom:80%;" />

## 对比Elasticsearch

> Redis官方曾公布了RediSearch与Elasticsearch的性能对比测试，大家可以看下。

### 索引能力

对Wikipedia的560万（5.3GB）文档进行索引，RediSearch耗时`221s`，Elasticsearch耗时`349s`，RediSearch快了`58%`！

### 查询能力

数据建立索引后，使用32个客户端对两个单词进行检索，RediSearch的吞吐量达到`12.5K ops/sec`，Elasticsearch的吞吐量为`3.1K ops/sec`，RediSearch比Elasticsearch要快`4倍`。同时RediSearch的延迟为`8ms`，而Elasticsearch为`10ms`，RediSearch延迟稍微低些！



# 发布和订阅

## 发布和订阅介绍

> Redis 发布订阅 (pub/sub) 是一种消息通信模式：**发送者 (pub) 发送消息，订阅者 (sub) 接收消息**。Redis 客户端可**以订阅任意数量的频道**。Redis 提供了基于「发布/订阅」模式的消息机制，在这种模式下，消息发布者与订阅者不需要进行直接通信。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208131618206.png" alt="image-20220813161813082" style="zoom: 50%;" />

> 如上图所示，消息发布者只需要想指定的频道发布消息，订阅该频道的每个客户端都可以接受到到这个消息。
>

> 使用 Redis 发布订阅这种机制，对于上面业务，下单支付业务只需要向**「支付结果」**这个频道发送消息，其他下游业务订阅**「支付结果」**这个频道，就能收相应消息，然后做出业务处理即可。
>

Redis 中提供了一组命令，可以用于发布消息，订阅频道，取消订阅以及按照模式订阅。

> - 使用频道（Channel）的发布订阅；
> - 使用模式（Pattern）的发布订阅。

**需要注意的是，发布订阅机制与 db 空间无关，比如在 db 10 发布， db0 的订阅者也会收到消息。**

## 频道（Channel）的发布订阅

> 订阅者订阅频道；发布者向「频道」发布消息；所有订阅「**频道**」的订阅者收到消息。

 客户端订阅频道，任意进入一个CMD

```assembly
# 可以只订阅一个频道
subscribe chan1
# 可以订阅多个频道
subscribe chan1 chan2 chan3
```

其他客户端发布，发布完成内容在订阅客户端查看，进入另一个CMD

```assembly
publish chan1 hello
publish chan1 renshuo
publish chan2 renshuo1
publish chan3 renshuo3
```

注：**发布的消息没有持久化，如果在订阅的客户端收不到hello，只能收到订阅后发布的消息**

## 模式（Pattern）的发布订阅

> Redis 还支持模式匹配的订阅方式。简单来说，客户端可以订阅一个带 `*` 号的模式，如果某些频道的名字与这个模式匹配，那么当其他客户端发送给消息给这些频道时，订阅这个模式的客户端也将会到收到消息。使用 Redis 订阅模式，我们需要使用一个新的指令 **「psubscribe」**。
>

```sh
# 订阅和取消订阅
psubscribe pay.*
punsubscribe pay.*
```

案例演示

订阅模式的指令是`PSUBSCRIBE`，如下表示 LSP 订阅「smile.girl.*」模式：

```sh
psubscribe smile.girls.*
```

对应的反向取消模式订阅的指令是`PUNSUBSCRIBE smile.girl.*`。

```sh
publish smile.girls.Tina hello,zhangsan
publish smile.girls.Lucy hello,zhangsan1
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301241152192.png" alt="image-20230124115233054" style="zoom:67%;" />

> 需要注意的是，**如果一个客户端订阅了与模式匹配的模式和频道，那么客户端会收到多次消息。**
>

# 事务+锁+秒杀

> Redis事务是一个单独的隔离操作：事务中的所有命令都会序列化、按顺序地执行。事务在执行的过程中，不会被其他客户端发送来的命令请求所打断。**Redis事务的主要作用就是串联多个命令防止别的命令插队**
>

> 单独的隔离操作 ：事务中的所有命令都会序列化、按顺序地执行。事务在执行的过程中，不会被其他客户端发送来的命令请求所打断。 

> 没有隔离级别的概念 ：队列中的命令没有提交之前都不会实际被执行，事务提交前任何指令都不会被实际执行

> 不保证原子性 ：事务中如果有一条命令执行失败，其后的命令仍然会被执行，没有回滚 

## Multi、Exec、discard

> 从输入**multi命令开始，**输入的命令都会依次进入命令队列中，但不会执行，直到输入**exec执行**后，Redis会将之前的命令队列中的命令依次执行。组队的过程中可以通过**discard来放弃组队**。 
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210918104039098.png" alt="image-20210918104039098" style="zoom:67%;" />

### 正常组队

```sh
multi
set k1 v1
set k2 v2
exec
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301241549962.png" alt="image-20230124154959839" style="zoom:67%;" />

### 放弃组队

```sh
multi
set a1 v1
set a2 v2
discard
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301241551562.png" alt="image-20230124155128417" style="zoom: 67%;" />

## 事务的错误处理

> 组队中某个命令出现了报告错误，执行时整个的所有队列都会被取消。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210918105105018.png" alt="image-20210918105105018" style="zoom:67%;" />

> 如果执行阶段某个命令报出了错误，则只有报错的命令不会被执行，而其他的命令都会执行，不会回滚。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210918105125524.png" alt="image-20210918105125524" style="zoom:67%;" />



## 悲观锁 & 乐观锁

### 悲观锁

> **悲观锁(Pessimistic Lock)**, 顾名思义，就是很悲观，每次去拿数据的时候都认为别人会修改，所以每次在拿数据的时候都会上锁，这样别人想拿这个数据就会block直到它拿到锁。**传统的关系型数据库里边就用到了很多这种锁机制，比如行锁，表锁等，读锁，写锁等**，都是在做操作之前先上锁。

### 乐观锁

> **乐观锁(Optimistic Lock),** 顾名思义，就是很乐观，每次去拿数据的时候都认为别人不会修改，所以不会上锁，但是在更新的时候会判断一下在此期间别人有没有去更新这个数据，可以使用版本号等机制。**乐观锁适用于多读的应用类型，这样可以提高吞吐量**。Redis就是利用这种check-and-set机制实现事务的。**抢票就是典型的乐观锁，好多人去抢一张票，最后只有一个人会支付成功。**

### Redis+乐观锁

在执行multi之前，先执行watch key1 [key2],**可以监视一个(或多个) key** ，**如果在事务执行之前这个(或这些) **

```assembly
watch key [key ...]
```

**key 被其他命令所改动，那么事务将被打断**。

```assembly
unwatch
```

取消 watch命令对所有 key 的监视。
如果在执行 WATCH 命令之后，EXEC 命令或DISCARD 命令先被执行了的话，那么就不需要再执行UNWATCH 了。

乐观锁的使用

客户端1

```assembly
-- 注意：balance还没被创建
watch balance
multi
incrby balance 10
exec
```

客户端2

```assembly
set balance 10
watch balance
multi
incrby balance 10
exec
```

![image-20210918110254328](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210918110254328.png)

## Redis秒杀方案

解决计数器和人员记录的事务操作，执行过程：库存-1，成功者+1

> - **加事务-乐观锁(解决超卖),但出现遗留库存和连接超时**
> - **加连接池解决超时问题** 
> - **解决库存依赖问题，LUA脚本**

# 经典问题⭐

## 缓存穿透

### 问题描述

> key对应的数据在数据源并不存在，每次针对此key的请求从缓存获取不到，请求都会压到数据源，从而可能压垮数据源。比如用一个不存在的用户id获取用户信息，不论缓存还是数据库都没有，若黑客利用此漏洞进行攻击可能压垮数据库。**即数据不存在 Redis 也不存在于数据库。**如果此时穿透了缓存，而直接数据库的请求数量非常多，数据库可能因为扛不住压力而挂掉。呜呜呜。
>

> 一个一定不存在缓存及查询不到的数据，由于缓存是不命中时被动写的，并且出于容错考虑，如果从存储层查不到数据则不写入缓存，这将导致这个不存在的数据每次请求都要到存储层去查询，失去了缓存的意义。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301242221200.png" alt="image-20230124222154024" style="zoom:50%;" />

### 解决方案

#### 缓存空值 ⭐

> **对空值缓存：**如果一个查询返回的数据为空（不管是数据是否不存在），我们仍然把这个空结果（null）进行缓存，设置空结果的过期时间会很短，最长不超过五分钟

所以，通常情况下，我们很少用布隆过滤器解决缓存穿透问题。其实，还有另外一种更简单的方案，即：`缓存空值`。

> 当某个用户id在缓存中查不到，在数据库中也查不到时，也需要将该用户id缓存起来，只不过值是空的。这样后面的请求，再拿相同的用户id发起请求时，就能从缓存中获取空数据，直接返回了，而无需再去查一次数据库。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207072331633.png" alt="image-20220707233120501" style="zoom: 33%;" />

关键点是不管从数据库有没有查到数据，都将结果放入缓存中，只是如果没有查到数据，缓存中的值是空的罢了。

这时候，我们就会问了呀 ~，如果大量不存在的请求过来，那么这时候缓存岂不是会缓存许多空对象了吗~~~

> 没错哦！这也是使用缓存空对象会导致的一个问题：如果时间一长这样会导致缓存中存在大量空对象，这样不仅会占用许多的内存空间，还会浪费许多资源呀！。那这有没有什么可以解决的方法呢？我们来想一想：我们可以将这些对象在一段时间之后清理下不久可以了吗 ~
>

嗯嗯，没错！在想想 Redis 里是不是给我们提供了有关过期时间的命令呀(*^▽^*)，这样我们可以在设置空对象的时间，顺便设置一个过期时间，就可以解决个问题了呀！

```c
setex key seconds valule://设置键值对的同时指定过期时间(s)
```

在Java 中直接调用 API 操作即可：

```js
redisCache.put(Integer.toString(id), null, 60) //过期时间为 60s
```

#### 设置白名单

> **设置可访问的名单（白名单）：**使用bitmaps类型定义一个可以访问的名单，名单id作为bitmaps的偏移量，每次访问和bitmap里面的id进行比较，如果访问id不在bitmaps里面，进行拦截，不允许访问。

#### 布隆过滤器

> **采用布隆过滤器**：(布隆过滤器（Bloom Filter）是1970年由布隆提出的。它实际上是一个很长的二进制向量(位图)和一系列随机映射函数（哈希函数）。

> 布隆过滤器可以用于检索一个元素是否在一个集合中。它的优点是空间效率和查询时间都远远超过一般的算法，缺点是有一定的误识别率和删除困难。)将所有可能存在的数据哈希到一个足够大的bitmaps中，一个一定不存在的数据会被 这个bitmaps拦截掉，从而避免了对底层存储系统的查询压力。

#### 实时监控

> **进行实时监控：**当发现Redis的命中率开始急速降低，需要排查访问对象和访问的数据，和运维人员配合，可以设置黑名单限制服务

## 缓存击穿

### 问题描述

> 缓存击穿是指有某个key经常被查询，经常被用户特殊关怀，也就类比“熟客” 或者 一个key经常不被访问。但是这时候，如果这个key在缓存的过期时间失效的时候或者这是个冷门key时，这时候突然有大量有关这个key的访问请求，这样会导致大并发请求直接穿透缓存，请求数据库，瞬间对数据库的访问压力增大。
>
> **单一热点数据、高并发、数据失效**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207072333034.png" alt="image-20220707233319903" style="zoom:50%;" />

### 解决方案

#### 加锁

> 数据库压力过大的根源是，因为同一时刻太多的请求访问了数据库。如果我们能够限制，同一时刻只有一个请求才能访问某个productId的数据库商品信息，不就能解决问题了？
>

答：没错，我们可以用`加锁`的方式，实现上面的功能。

> 对于缓存击穿的问题：我们常用的解决方案是加锁。对于key过期的时候，当key要查询数据库的时候加上一把锁，这时只能让第一个请求进行查询数据库，然后把从数据库中查询到的值存储到缓存中，对于剩下的相同的key，可以直接从缓存中获取即可。
>

> 如果我们是在单机环境下：直接使用常用的锁即可（如：Lock、Synchronized等），在分布式环境下我们可以使用分布式锁，如：基于数据库、基于Redis或者zookeeper 的分布式锁。
>

> 在访问数据库时加锁，防止多个相同productId的请求同时访问数据库。然后，数据库中查询到的结果，放入缓存
>

#### 自动续期

出现缓存击穿问题是由于key过期了导致的。那么，我们换一种思路，在key快要过期之前，就自动给它续期，不就OK了？

答：没错，我们可以用job给指定key自动续期。

比如说，我们有个分类功能，设置的缓存过期时间是30分钟。但有个job每隔20分钟执行一次，自动更新缓存，重新设置过期时间为30分钟。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207072334439.png" alt="image-20220707233427301" style="zoom:50%;" />

这样就能保证，分类缓存不会失效。

此外，在很多请求第三方平台接口时，我们往往需要先调用一个获取token的接口，然后用这个token作为参数，请求真正的业务接口。一般获取到的token是有有效期的，比如24小时之后失效。

如果我们每次请求对方的业务接口，都要先调用一次获取token接口，显然比较麻烦，而且性能不太好。

这时候，我们可以把第一次获取到的token缓存起来，请求对方业务接口时从缓存中获取token。

同时，有一个job每隔一段时间，比如每隔12个小时请求一次获取token接口，不停刷新token，重新设置token的过期时间。

#### 缓存不失效

> 此外，对于很多热门key，其实是可以不用设置过期时间，让其永久有效的。比如参与秒杀活动的热门商品，由于这类商品id并不多，在缓存中我们可以不设置过期时间。
>

> 在秒杀活动开始前，我们先用一个程序提前从数据库中查询出商品的数据，然后同步到缓存中，提前做**预热**。等秒杀活动结束一段时间之后，我们再**手动删除**这些无用的缓存即可。
>

#### 过期时间 + 随机值

> 对于热点数据，我们不设置过期时间，这样就可以把请求都放在缓存中处理，充分把 Redis 高吞吐量性能利用起来。或者过期时间再加一个随机值。
>

设计缓存的过期时间时，使用公式：**过期时间=base 时间+随机时间**。

> 即相同业务数据写缓存时，在基础过期时间之上，再加一个随机的过期时间，让数据在未来一段时间内慢慢过期，避免瞬时全部过期，对 DB 造成过大压力
>

#### 缓存预热 ⭐

> 预先把热门数据提前存入 Redis 中，并设热门数据的过期时间超大值。key可能会在某些时间点被超高并发地访问，是一种非常“热点”的数据。这个时候，需要考虑一个问题：缓存被“击穿”的问题。
>

## 缓存雪崩

> **数据保存在缓存系统并设置了过期时间，但是由于在同时一刻，大量数据同时过期。系统就把请求全部打到数据库获取数据，并发量大的话就会导致数据库压力激增**。而缓存雪崩是缓存击穿的升级版，缓存击穿说的是某一个热门key失效了，而缓存雪崩说的是有多个热门key同时失效。看起来，如果发生缓存雪崩，问题更严重。

> **缓存雪崩是发生在大量数据同时失效的场景，而缓存击穿是在某个热点数据失效的场景，这是最大区别**

### 问题描述

> 由于后台小哥预热缓存的时候将所有商品的缓存时间都设置为2小时过期，所有的商品在同一个时间点全部失效，瞬间所有的请求都落在数据库上，导致数据库扛不住压力崩溃，用户所有的请求都超时报错。

缓存雪崩目前有两种：

> 有大量的热门缓存，同时失效。会导致大量的请求，访问数据库。而数据库很有可能因为扛不住压力，而直接挂掉
>
> 缓存服务器down机了，可能是机器硬件问题，或者机房网络问题。总之，造成了整个缓存的不可用

归根结底都是有大量的请求，透过缓存，而直接访问数据库了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207072336915.png" alt="image-20220707233630773" style="zoom:45%;" />

后台小哥通过日志定位排查发现问题后，进行了一系列操作：

> 首先通过API Gateway（网关）限制大部分流量进来 
>
> 接着将宕机的数据库服务重启 
>
> 再重新预热缓存 
>
> 确认缓存和数据库服务正常后将网关流量正常放开，大约01：30 抢购活动恢复正常。

### 解决方案

#### 构建多级缓存

> nginx缓存 + redis缓存 +其他缓存（ehcache等）
>

#### 互斥锁

> 跟缓存击穿解决思路一致，同一时间只让一个线程构建缓存，其他线程阻塞排队。用加锁或者队列的方式保证来保证不会有大量的线程对数据库一次性进行读写，从而避免失效时大量的并发请求落到底层存储系统上。不适用高并发情况
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207072323908.png" alt="image-20220707232325808" style="zoom: 50%;" />



#### 均匀过期

> 比如我们可以在原有的失效时间基础上增加一个随机值，比如1-5分钟随机，这样每一个缓存的过期时间的重复率就会降低，就很难引发集体失效的事件。设置不同的过期时间，让缓存失效的时间点尽量均匀。通常可以为有效期增加随机值或者统一规划有效期。
>

> 为了解决缓存雪崩问题，我们首先要尽量避免缓存同时失效的情况发生。这就要求我们不要设置相同的过期时间。
>

> 可以在设置的过期时间基础上，再加个1~60秒的随机数。实际过期时间 = 过期时间 + 1~60秒的随机数
>

这样即使在高并发的情况下，多个请求同时设置过期时间，由于有随机数的存在，也不会出现太多相同的过期key。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207072323511.png" alt="image-20220707232305404" style="zoom: 67%;" />

#### 缓存永不过期

> 跟缓存击穿解决思路一致，缓存在物理上永远不过期，用一个异步的线程更新缓存。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207072324890.png" alt="image-20220707232449779" style="zoom: 50%;" />

#### 高可用

> 针对缓存服务器down机的情况，在前期做系统设计时，可以做一些高可用架构。比如：如果使用了redis，可以使用哨兵模式，或者集群模式，避免出现单节点故障导致整个redis服务不可用的情况。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207072340552.png" alt="image-20220707234011398" style="zoom: 40%;" />

> 使用哨兵模式之后，当某个master服务下线时，自动将该master下的某个slave服务升级为master服务，替代已下线的master服务继续处理请求。
>

#### 服务降级

> 如果做了高可用架构，redis服务还是挂了，该怎么办呢？这时候，就需要做服务降级了。
>

> 我们需要配置一些默认的兜底数据。程序中有个全局开关，比如有10个请求在最近一分钟内，从redis中获取数据失败，则全局开关打开。后面的新请求，就直接从配置中心中获取默认的数据。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207072339944.png" alt="image-20220707233952815" style="zoom: 33%;" />

> 当然，还需要有个job，每隔一定时间去从redis中获取数据，如果在最近一分钟内可以获取到两次数据（这个参数可以自己定），则把全局开关关闭。后面来的请求，又可以正常从redis中获取数据了。需要特别说一句，该方案并非所有的场景都适用，需要根据实际业务场景决定。
>

#### 接口限流

> 当访问的不是核心数据的时候，在查询的方法上加上**接口限流保护**。比如设置 10000 req/s。
>

> 如果访问的是核心数据接口，缓存不存在允许从数据库中查询并设置到缓存中。这样的话，只有部分请求会发送到数据库，减少了压力。限流，就是指，我们在**业务系统的请求入口前端控制每秒进入系统的请求数，避免过多的请求被发送到数据库。**
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208151627282.png" alt="image-20220815162728163" style="zoom: 33%;" />

## 缓存热点 

> 对于突发事件，大量用户同时去访问热点信息，这个突发热点信息所在的缓存节点就很容易出现过载和卡顿现象，甚至 Crash，我们称之为缓存热点。
>

> 这个在新浪微博经常遇到，某大V明星出轨、结婚、离婚，瞬间引发数百千万的吃瓜群众围观，访问同一个key，流量集中打在一个缓存节点机器，很容易打爆网卡、带宽、CPU的上限，最终导致缓存不可用。
>

**解决方案：**

> - 首先能先找到这个热key来，比如通过Spark实时流分析，及时发现新的热点key。
> - 将集中化流量打散，避免一个缓存节点过载。由于只有一个key，我们可以在key的后面拼上有序编号，比如key#01、key#02、key#10多个副本，这些加工后的key位于多个缓存节点上。
> - 每次请求时，客户端随机访问一个即可

> 可以设计一个缓存服务治理管理后台，实时监控缓存的SLA，并打通分布式配置中心，对于一些`hot key`可以快速、动态扩容。

## 缓存大Key

> 当访问缓存时，如果key对应的value过大，读写、加载很容易超时，容易引发网络拥堵。另外缓存的字段较多时，每个字段的变更都会引发缓存数据的变更，频繁的读写，导致慢查询。如果大key过期被缓存淘汰失效，预热数据要花费较多的时间，也会导致慢查询。
>

> 所以我们在设计缓存的时候，要注意缓存的粒度，既不能过大，如果过大很容易导致网络拥堵；也不能过小，如果太小，查询频率会很高，每次请求都要查询多次。
>

**解决方案：**

> - 方案一：设置一个阈值，当value的长度超过阈值时，对内容启动压缩，降低kv的大小
> - 方案二：评估大key所占的比例，由于很多框架采用池化技术，如：Memcache，可以预先分配大对象空间。真正业务请求时，直接拿来即用。
> - 方案三：颗粒划分，将大key拆分为多个小key，独立维护，成本会降低不少
> - 方案四：大key要设置合理的过期时间，尽量不淘汰那些大key

# 分布式锁

## 分布式锁概述

> 随着业务发展的需要，原单体单机部署的系统被演化成分布式集群系统后，由于分布式系统多线程、多进程并且分布在不同机器上，这将使原单机部署情况下的并发控制锁策略失效，单纯的Java API并不能提供分布式锁的能力。为了解决这个问题就需要一种跨JVM的互斥机制来控制共享资源的访问，这就是分布式锁要解决的问题！
>

分布式锁主流的实现方案：

> 基于数据库实现分布式锁、基于缓存（Redis等）、基于Zookeeper

每一种分布式锁解决方案都有各自的优缺点：

> 性能：redis最高、可靠性：zookeeper最高

为了确保分布式锁可用，我们至少要确保锁的实现同时**满足以下四个条件**：

> \- 互斥性。在任意时刻，只有一个客户端能持有锁。
>
> \- 不会发生死锁。即使有一个客户端在持有锁的期间崩溃而没有主动解锁，也能保证后续其他客户端能加锁。
>
> \- 解铃还须系铃人。加锁和解锁必须是同一个客户端，客户端自己不能把别人加的锁给解了。
>
> \- 加锁和解锁必须具有原子性。

## Redis 命令

```sql
-- setnx上锁
setnx age 11
-- 再次设置，就会出错
setnx age 22
-- 除非删除该key，才能修改
del age
```

改进版本：加上过期时间，nx：上锁，ex：加上过期时间

```assembly
set name1 maoyan nx ex 20
```



## 实战演练

### 基础实现

```java
@Resource
private RedisTemplate redisTemplate;
```

```java
@GetMapping("testLock")
public void testLock() {
    //1获取锁，setne
    Boolean lock = redisTemplate.opsForValue().setIfAbsent("lock", "111");
    //2获取锁成功、查询num的值
    if(lock){
        Object value = redisTemplate.opsForValue().get("num");
        //2.1判断num为空
        if (value == null){
            redisTemplate.opsForValue().set("num", 0);
           value = redisTemplate.opsForValue().get("num");
        }
        //2.2有值就转成成int
        int num = Integer.parseInt(value+"");
        //2.3把redis的num加1
        redisTemplate.opsForValue().set("num", ++num);
        //2.4释放锁，del
        redisTemplate.delete("lock");
    }else{
        //3获取锁失败、每隔0.1秒再获取
        try {
            Thread.sleep(100);
            testLock();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

```apl
ab -c 100 -n 1000 http://192.168.0.199:8080/testLock
```

> - -n	即requests，用于**指定压力测试总共的执行次数**
> - -c	即concurrency，用于**指定的并发数**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301241704596.png" alt="image-20230124170431447" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301241704896.png" alt="image-20230124170409792" style="zoom:80%;" />

### 进阶版

> 设置过期时间有两种方式：
>
> 首先想到通过expire设置过期时间（缺乏原子性：如果在setnx和expire之间出现异常，锁也无法释放）
>
> 在set时指定过期时间（推荐）

```java
@GetMapping("testLock")
public void testLock() {
    // 优化之UUID防误删
    String uuid = UUID.randomUUID().toString();
    // 1、获取锁，setIfAbsent就是setnx,后面两个时间参数可选
    Boolean lock = redisTemplate.opsForValue().setIfAbsent("lock", uuid,3,
            TimeUnit.SECONDS);
    //2获取锁成功、查询num的值
    if (lock) {
        Object value = redisTemplate.opsForValue().get("num");
        //2.1判断num为空
        if (value == null){
            redisTemplate.opsForValue().set("num", 0);
            value = redisTemplate.opsForValue().get("num");
        }
        //2.2有值就转成成int
        int num = Integer.parseInt(value + "");
        //2.3把redis的num加1
        redisTemplate.opsForValue().set("num", ++num);
        //2.4释放锁，del
        redisTemplate.delete("lock");

    } else {
        //3获取锁失败、每隔0.1秒再获取
        try {
            Thread.sleep(100);
            testLock();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

```apl
ab -c 100 -n 1000 http://192.168.0.199:8080/testLock
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301241709683.png" alt="image-20230124170914525" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301241709041.png" alt="image-20230124170941932" style="zoom:67%;" />

### 终极版

```java
@GetMapping("testLockLua")
public void testLockLua() {
    //1 声明一个uuid ,将做为一个value 放入我们的key所对应的值中
    String uuid = UUID.randomUUID().toString();
    //2 定义一个锁：lua 脚本可以使用同一把锁，来实现删除！
    String skuId = "25"; // 访问skuId 为25号的商品 100008348542
    String locKey = "lock:" + skuId; // 锁住的是每个商品的数据
    // 3 获取锁
    Boolean lock = redisTemplate.opsForValue().setIfAbsent(locKey, uuid, 3, TimeUnit.SECONDS);

    // 第一种： lock 与过期时间中间不写任何的代码。
    // redisTemplate.expire("lock",10, TimeUnit.SECONDS);//设置过期时间
    // 如果true
    if (lock) {
        // 执行的业务逻辑开始
        // 获取缓存中的num 数据
        Object value = redisTemplate.opsForValue().get("num");
        // 如果是空直接返回
        //2.1判断num为空
        if (value == null){
            redisTemplate.opsForValue().set("num", 0);
            value = redisTemplate.opsForValue().get("num");
        }
        // 不是空 如果说在这出现了异常！ 那么delete 就删除失败！ 也就是说锁永远存在！
        int num = Integer.parseInt(value + "");
        // 使num 每次+1 放入缓存
        redisTemplate.opsForValue().set("num", String.valueOf(++num));
        /*使用lua脚本来锁*/
        // 定义lua 脚本
        String script = "if redis.call('get', KEYS[1]) == ARGV[1] then return " +
                        "redis.call('del', KEYS[1]) else return 0 end";
        // 使用redis执行lua执行
        DefaultRedisScript<Long> redisScript = new DefaultRedisScript<>();
        redisScript.setScriptText(script);
        // 设置一下返回值类型 为Long
        // 因为删除判断的时候，返回的0,给其封装为数据类型。如果不封装那么默认返回String 类型，
        // 那么返回字符串与0 会有发生错误。
        redisScript.setResultType(Long.class);
        // 第一个要是script 脚本 ，第二个需要判断的key，第三个就是key所对应的值。
        redisTemplate.execute(redisScript, Arrays.asList(locKey), uuid);
    } else {
        // 其他线程等待
        try {
            // 睡眠
            Thread.sleep(100);
            // 睡醒了之后，调用方法。
            testLockLua();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

```sh
ab -c 100 -n 1000 http://192.168.0.199:8080/testLockLua 
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301241719912.png" alt="image-20230124171906756" style="zoom:67%;" />



# 消息队列

## 消息队列概述

**消息队列**（**M**essage **Q**ueue），字面意思就是存放消息的队列。最简单的消息队列模型包括3个角色：

> - 消息队列：存储和管理消息，也被称为消息代理（Message Broker）
> - 生产者：发送消息到消息队列
> - 消费者：从消息队列获取消息并处理消息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205061715375.png" alt="image-20220506171525306" style="zoom:80%;" />

Redis提供了三种不同的方式来实现消息队列：

> - list结构：基于List结构模拟消息队列
> - PubSub：基本的点对点消息模型
> - Stream：比较完善的消息队列模型

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205061716012.png" alt="image-20220506171612949" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623151649042.png" alt="image-20230623151649042" style="zoom:80%;" />

## 基于List的消息队列

> **消息队列**（**M**essage **Q**ueue），字面意思就是存放消息的队列。而Redis的list数据结构是一个双向链表，很容易模拟出队列效果。

队列是入口和出口不在一边，因此我们可以利用：LPUSH 结合 RPOP、或者 RPUSH 结合 LPOP来实现。

> 不过要注意的是，当队列中没有消息时RPOP或LPOP操作会返回null，并不像JVM的阻塞队列那样会阻塞并等待消息。因此这里应该使用**BRPOP**或者**BLPOP**来实现阻塞效果。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205061717699.png" alt="image-20220506171710637" style="zoom:80%;" />



> 基于List的消息队列有哪些优缺点？

优点：

> - 利用Redis存储，不受限于JVM内存上限
> - 基于Redis的持久化机制，数据安全性有保证
> - 可以满足消息有序性

缺点：

> - 无法避免消息丢失
> - 只支持单消费者



## 基于PubSub的消息队列

> **PubSub（发布订阅）**是Redis2.0版本引入的消息传递模型。顾名思义，消费者可以订阅一个或多个channel，生产者向对应channel发送消息后，所有订阅者都能收到相关消息。

> - SUBSCRIBE channel [channel] ：订阅一个或多个频道
> - PUBLISH channel msg ：向一个频道发送消息
> - PSUBSCRIBE pattern[pattern] ：订阅与pattern格式匹配的所有频道

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205061722917.png" alt="image-20220506172219845" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623150840696.png" alt="image-20230623150840696" style="zoom:80%;" />

> 基于PubSub的消息队列有哪些优缺点？
>

> 优点：采用发布订阅模型，支持多生产、多消费

缺点：

> - 不支持数据持久化
> - 无法避免消息丢失
> - 消息堆积有上限，超出时数据丢失

## 基于Stream的消息队列

> Stream 是 Redis 5.0 引入的一种新数据类型，可以实现一个功能非常完善的消息队列。

### 基本语法

#### 发送消息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623151917352.png" alt="image-20230623151917352" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623151816231.png" alt="image-20230623151816231" style="zoom:80%;" />

#### 读取消息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623151949164.png" alt="image-20230623151949164" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623152003432.png" alt="image-20230623152003432" style="zoom:80%;" />

#### 阻塞消息-读取最新消息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623152040824.png" alt="image-20230623152040824" style="zoom:80%;" />

> 在业务开发中，我们可以循环的调用XREAD阻塞方式来查询最新消息，从而实现持续监听队列的效果，伪代码如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623152104343.png" alt="image-20230623152104343" style="zoom:80%;" />

> STREAM类型消息队列的XREAD命令特点：
>
> 消息可回溯、一个消息可以被多个消费者读取、可以阻塞读取、有消息漏读的风险

### 消费者组

> **消费者组（Consumer Group）**：将多个消费者划分到一个组中，监听同一个队列。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623151249598.png" alt="image-20230623151249598" style="zoom:80%;" />

#### 创建消费者组

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623151332058.png" alt="image-20230623151332058" style="zoom:67%;" />

#### 读取消息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623151413459.png" alt="image-20230623151413459" style="zoom:67%;" />

#### 基本思路

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623151448208.png" alt="image-20230623151448208" style="zoom:67%;" />

STREAM类型消息队列的XREADGROUP命令特点：

> 消息可回溯、可以多消费者争抢消息，加快消费速度、可以阻塞读取
>
> 没有消息漏读的风险、有消息确认机制，保证消息至少被消费一次



# Redis6新功能

## ACL

### 功能简介

> ACL是Access Control List（访问控制列表）的缩写，该功能允许根据可以执行的命令和可以访问的键来限制某些连接。在Redis 5版本之前，Redis 安全规则只有密码控制 还有通过rename 来调整高危命令比如 flushdb ， KEYS* ， shutdown 等。

Redis 6 则提供ACL的功能对用户进行更细粒度的权限控制 ：

> - 接入权限:用户名和密码 
>
>
> - 可以执行的命令 
>
>
> - 可以操作的 KEY


参考官网：https://redis.io/topics/acl

### 基础命令

```apl
# 展现用户权限列表
acl list
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301241951932.png" alt="image-20230124195117764" style="zoom: 67%;" />

查看添加权限指令类别

```apl
acl cat
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301241952378.png" alt="image-20230124195219155" style="zoom:50%;" />

加参数类型名可以查看类型下具体命令

```apl
acl cat string
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301241953530.png" alt="image-20230124195301362" style="zoom:50%;" />

查看当前用户

```apl
acl whoami
```

### ACL规则 

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301242009943.png" alt="image-20230124200940780" style="zoom:67%;" />

### 实战演练

通过命令创建新用户默认权限

```apl
acl setuser user1
acl list
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301242011726.png" alt="image-20230124201151593" style="zoom:67%;" />

> 在上面的示例中，我根本没有指定任何规则。如果用户不存在，这将使用just created的默认属性来创建用户。如果用户已经存在，则上面的命令将不执行任何操作。

设置有用户名、密码(就叫password)、ACL权限、并启用的用户

> key必须带有cached，只有get操作

```apl
acl setuser user2 on >password ~cached:* +get
```

切换用户，验证权限

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301242015479.png" alt="image-20230124201511294" style="zoom:67%;" />



## IO多线程

> Redis 6 加入多线程,但跟 Memcached 这种从 IO处理到数据访问多线程的实现模式有些差异。Redis6 的**多线程部分只是用来处理网络数据的读写和协议解析，执行命令仍然是单线程**。之所以这么设计是不想因为多线程而变得复杂，需要去控制 key、lua、事务，LPUSH/LPOP 等等的并发问题
>

> 另外，多线程IO默认也是不开启的，需要再配置文件中配置
>

```ini
io-threads-do-reads  yes 
io-threads 4
```



## 工具支持Cluster

> 之前老版Redis想要搭集群需要单独安装ruby环境，Redis 5 将 redis-trib.rb 的功能集成到 redis-cli ，另外官方 redis-benchmark 工具开始支持 cluster 模式了，通过多线程的方式对多个分片进行压测。

```
redis-benchmark --help
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301242033775.png" alt="image-20230124203355523" style="zoom:67%;" />



## Redis其他新功能

> RESP3新的 Redis 通信协议：**优化服务端与客户端之间通信**
>

> Client side caching客户端缓存：基于 RESP3 协议实现的客户端缓存功能。为了进一步提升缓存的性能，**将客户端经常访问的数据cache到客户端。减少TCP网络交互**。
>

> Proxy集群代理模式：Proxy 功能，让 Cluster 拥有像单实例一样的接入方式，降低大家使用cluster的门槛。不过需要注意的是代理不改变 Cluster 的功能限制，不支持的命令还是不会支持，比如跨 slot 的多Key操作。
>

> Modules API：Redis 6中模块API开发进展非常大，因为Redis Labs为了开发复杂的功能，从一开始就用上Redis模块。Redis可以变成一个框架，利用Modules来构建不同系统，而不需要从头开始写然后还要BSD许可。Redis一开始就是一个向编写各种系统开放的平台。
>



# Redis+Lua

> Redis提供了Lua脚本功能，在一个脚本中编写多条Redis命令，确保多条命令执行时的原子性。Lua是一种编程语言，它的基本语法大家可以参考网站：https://www.runoob.com/lua/lua-tutorial.html
>

> Redis 事务的执行并不能完全保证原子性，**那么如何将一批命令操作做到原子性操作呢**？Redis 支持通过 Lua 脚本来实现一批命令原子性操作，执行脚本的常用命令为  EVAL。

## 基本语法

### eval函数

这里重点介绍Redis提供的调用函数，语法如下：

```sh
eval "return redis.call('set','name','jack')" 0
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206130918562.png" alt="image-20220613091812423" style="zoom:80%;" />

例如，我们要执行 redis.call('set', 'name', 'jack') 这个脚本，语法如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206111630333.png" alt="image-20220611163001248" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206111631198.png" alt="image-20220611163152120" style="zoom:80%;" />

### 基础用法

例如，我们要执行set name jack，则脚本是这样：

```lua
redis.call('set','name','jack')
```

例如，我们要先执行set name Rose，再执行get name，则脚本如下：

```lua
redis.call('set','name','Rose')
local name = redis.call('get', 'name')
return name
```

写好脚本以后，需要用Redis命令来调用脚本，调用脚本的常见命令如下：

```lua
eval script numkeys key [key ...] arg [arg ...]
```

就是把上面写的lua脚本放在一行，用双引号包起来，后面带个0就行，很简单

```lua
eval "redis.call('set','name','Rose') local name = redis.call('get', 'name') return name" 0
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301242257687.png" alt="image-20230124225729562" style="zoom:67%;" />

### 高级用法 ⭐

> 如果脚本中的key、value不想写死，可以作为参数传递。key类型参数会放入KEYS数组，其它参数会放入ARGV数组，在脚本中可以从KEYS和ARGV数组获取这些参数：
>

KEYS对应key，ARGV对应value

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206111633285.png" alt="image-20220611163333199" style="zoom:80%;" />

> 比如我们给指定的`key`设置指定值`value`，并且设置过期时间`60`秒，实现原子性操作，如果操作成功就返回 1，否则返回 0

```sh
EVAL "if redis.call('setnx', KEYS[1], ARGV[1]) == 1 then return redis.call('expire', KEYS[1], ARGV[2]) else return 0 end" 1 key1 hello 60
```

> 获取指定`key`的值，如果存在就删除`key`，实现原子性操作，如果操作成功就返回 1，否则返回 0
>

```sh
EVAL "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end" 1 key1 hello
```

## 整合语法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206130931649.png" alt="image-20220613093109542" style="zoom:80%;" />

## Redis分布式锁示例

unlock.lua

```lua
-- 这里的 KEYS[1] 就是锁的key，这里的ARGV[1] 就是当前线程标示
-- 获取锁中的标示，判断是否与当前线程标示一致
-- 比较线程标示与锁中的标示是否一致
if(redis.call('get', KEYS[1]) ==  ARGV[1]) then
    -- 一致，则删除锁
    -- 释放锁 del key
    return redis.call('del', KEYS[1])
end
-- 不一致，则直接返回
return 0
```



# 慢查询日志

## 基本配置

> Redis慢速日志是一个系统，用于记录超过指定值的查询执行时间。执行时间不包括I/O操作。比如与客户交谈、发送回复等等，而只是实际执行命令所需的时间（这是命令执行阶段，线程被阻塞且无法服务同时的其他请求）。

> 您可以使用两个参数配置慢日志：一个告诉Redis要超过多少执行时间（以微秒为单位）命令，另一个参数是慢日志。记录新命令时，最旧的命令将从记录的命令队列。

关于慢查询日志的配置有两个：slowlog-max-len、slowlog-log-slower-than

### slowlog-max-len

> **作用**：慢查询日志最多存储多少条。
>
> **默认值**：128。从源码中我们可以找到这个选项的默认值为 128
>
> **配置建议**：线上要调大慢查询列表，避免长命令在记录时被截断，不占大内存。线上配置 1000 以上

### slowlog-log-slower-than

> **作用**：慢查询的预设阀值，当命令的耗时超过这个配置就会被记录到慢查询日志中。
>
> **默认值：** 10 ms。
>
> **配置建议**：默认值超过 10ms 被判定为慢查询，需要根据并发量来调整，高流量场景 配置为 1 ms。
>
> **持久化日志**：将慢查询日志持久化到数据库，避免丢失日志，可以开发可视化的查询界面供运维排查

> **慢查询**：**在Redis执行时耗时超过某个阈值的命令，称为慢查询**。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205022151007.png" alt="image-20220502215135968" style="zoom:67%;" />

慢查询的阈值可以通过配置指定：

> slowlog-log-slower-than：慢查询阈值，单位是微秒。默认是10000，建议1000

> 慢查询会被放入慢查询日志中，日志的长度有上限，可以通过配置指定：

> slowlog-max-len：慢查询日志（本质是一个队列）的长度。默认是128，建议1000

```apl
config get slowlog-log-slower-than
# 以下时间以微秒表示，因此1000000相当于至一秒。请注意，负数将禁用慢速日志，而值为零强制记录每个命令
config set slowlog-log-slower-than 1000
# 此长度没有限制。只需注意它会消耗内存。您可以使用SLOWLOG RESET回收慢速日志使用的内存
config set slowlog-max-len 1000
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205022152955.png" alt="image-20220502215213920" style="zoom: 80%;" />

> 修改这两个配置可以使用：config set命令：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205022152690.png" alt="image-20220502215243655" style="zoom:80%;" />

## 基础使用

> 查看慢查询日志列表：

> - **slowlog len：查询慢查询日志长度**
> - **slowlog get [n]：读取n条慢查询日志**
> - **slowlog reset：清空慢查询列表**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205022153581.png" alt="image-20220502215322544" style="zoom:80%;" />

> 通过RESP查看，很详细

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207181053872.png" alt="image-20220718105333764" style="zoom:80%;" />



































