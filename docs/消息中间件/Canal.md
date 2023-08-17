



# Canal入门

canal官方文档：https://github.com/alibaba/canal/wiki

[MySQL如何实时同步数据到ES？试试这款阿里开源的神器！ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247487292&idx=1&sn=3d9c08bd622aac48eb4834d854c707b8&scene=21#wechat_redirect)

## Canal介绍和下载

canal主要用途是对MySQL数据库增量日志进行解析，提供增量数据的订阅和消费，简单说就是可以对MySQL的增量数据进行实时同步，支持同步到MySQL、Elasticsearch、HBase等数据存储中去。

首先我们需要下载canal的各个组件`canal-server`、`canal-adapter`、`canal-admin`

下载地址：https://github.com/alibaba/canal/releases

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205251758552.png" alt="image-20220525175818499" style="zoom:80%;" />

canal的各个组件的用途各不相同，下面分别介绍下：

- canal-server（canal-deploy）：可以直接监听MySQL的binlog，把自己伪装成MySQL的从库，只负责接收数据，并不做处理。
- canal-adapter：相当于canal的客户端，会从canal-server中获取数据，然后对数据进行同步，可以同步到MySQL、Elasticsearch和HBase等存储中去。
- canal-admin：为canal提供整体配置管理、节点运维等面向运维的功能，提供相对友好的WebUI操作界面，方便更多用户快速和安全的操作

- 由于不同版本的MySQL、Elasticsearch和canal会有兼容性问题，所以我们先对其使用版本做个约定。

| 应用          | 端口  | 版本   |
| :------------ | :---- | :----- |
| MySQL         | 3309  | 5.7    |
| Elasticsearch | 9200  | 7.17.1 |
| Kibanba       | 5601  | 7.17.1 |
| canal-server  | 11111 | 1.1.15 |
| canal-adapter | 8081  | 1.1.15 |
| canal-admin   | 8099  | 1.1.15 |



## Canal工作原理

canal会模拟MySQL主库和从库的交互协议，从而伪装成MySQL的从库，然后向MySQL主库发送dump协议，MySQL主库收到dump请求会向canal推送binlog，canal通过解析binlog将数据同步到其他存储中去。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205251757604.png" alt="image-20220525175729548" style="zoom:80%;" />

## 注意事项

> Canal默认MySQL版本是5版本，8版本不支持



## MySQL主从配置

由于canal是通过订阅MySQL的binlog来实现数据同步的，所以我们需要开启MySQL的binlog写入功能，并设置`binlog-format`为ROW模式，

### my.cnf

```ini
vi /etc/my.cnf
```

```ini
# 设置server_id，同一局域网中需要唯一
server_id=101 
# 指定不需要同步的数据库名称
binlog-ignore-db=mysql  
# 开启二进制日志功能
log-bin=mall-mysql-bin  
# 设置二进制日志使用内存大小（事务）
binlog_cache_size=1M  
# 设置使用的二进制日志格式（mixed,statement,row）
binlog_format=row  
# 二进制日志过期清理时间。默认值为0，表示不自动清理。
expire_logs_days=7  
# 跳过主从复制中遇到的所有错误或指定类型的错误，避免slave端复制中断。
# 如：1062错误是指一些主键重复，1032错误是因为主从数据库数据不一致
slave_skip_errors=1062  
```

```apl
systemctl restart mysqld
```

配置完成后需要重新启动MySQL，重启成功后通过如下命令查看binlog是否启用；

```sql
show variables like '%log_bin%';
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205251456284.png" alt="image-20220525145655200" style="zoom:80%;" />

再查看下MySQL的binlog模式；

```mysql
show variables like 'binlog_format%'; 
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205251457036.png" alt="image-20220525145755987" style="zoom:80%;" />

### 创建canal用户授予权限

注意：进入premium执行可能会出错

```xml-dtd
mysql -uroot -p123456
```

执行如下命令

```sql
use mysql;
#降低密码层级
set global validate_password.policy=0;
set global validate_password.length=4;
#创建canal同步账户:账号密码都是canal
CREATE USER canal@'%' IDENTIFIED with mysql_native_password BY 'canal';
#授权canal用户允许远程到mysql实现主从复制 
#查询权限，主从复制权限，用户复制权限
GRANT SELECT, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'canal'@'%'; 
#刷新
FLUSH PRIVILEGES;
```

### 查询用户

```sql
use mysql;
select * from user;
```

### 创建测试表

```sql
CREATE TABLE `product`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sub_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL,
  `pic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;
```



## canal-server(主从)

注意要安装好JDK

将我们下载好的压缩包`canal.deployer-1.1.5-SNAPSHOT.tar.gz`上传到Linux服务器

### 下载并解压canal

进入下载地址：https://github.com/alibaba/canal/releases/download

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209170907649.png" alt="image-20220917090710582" style="zoom:80%;" />

```apl
mkdir /root/canal
tar -xvf canal.deployer-1.1.6.tar.gz -C /root/canal
```

目录

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

### 配置文件

目录：conf/example/instance.properties

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

### 启动关闭重启

注意要在canal主目录下

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



### Java代码实现

https://gitee.com/sure-s-renshuo/canal.git

创建maven项目，引入依赖

```xml
<dependencies>
    <dependency>
        <groupId>com.alibaba.otter</groupId>
        <artifactId>canal.client</artifactId>
        <version>1.1.5</version>
    </dependency>
    <dependency>
        <groupId>com.alibaba.otter</groupId>
        <artifactId>canal.protocol</artifactId>
        <version>1.1.5</version>
    </dependency>
</dependencies>
```

java实现

```java
import com.alibaba.fastjson.JSONObject;
import com.alibaba.otter.canal.client.CanalConnector;
import com.alibaba.otter.canal.client.CanalConnectors;
import com.alibaba.otter.canal.protocol.CanalEntry;
import com.alibaba.otter.canal.protocol.Message;
import com.google.protobuf.ByteString;
import com.google.protobuf.InvalidProtocolBufferException;
import java.net.InetSocketAddress;
import java.util.List;

public class AD {
    public static void main(String[] args) throws InterruptedException,
                                                  InvalidProtocolBufferException {
        //TODO 获取连接：example不用改，最后两个是账号密码，注意ip是canal地址的ip
        CanalConnector canalConnector = CanalConnectors.newSingleConnector(
                      new InetSocketAddress("192.168.22.130", 11111), "example", 
            "canal", "canal");
        while (true) {
            //TODO 连接
            canalConnector.connect();
            //TODO 订阅数据库：这表示监控所有数据库和表
            canalConnector.subscribe("*.*");
            //TODO 获取数据：一次性最多获取100条数据
            Message message = canalConnector.get(100);
            //TODO 获取Entry集合
            List<CanalEntry.Entry> entries = message.getEntries();
            //TODO 判断集合是否为空,如果为空,则等待一会继续拉取数据
            if (entries.size() <= 0) {
                //System.out.println("当次抓取没有数据，休息一会。。。。。。");
                Thread.sleep(1000);
            } else {
                //TODO 遍历entries，单条解析
                for (CanalEntry.Entry entry : entries) {
                    //1.获取表名
                    String tableName = entry.getHeader().getTableName();
                    //2.获取类型
                    CanalEntry.EntryType entryType = entry.getEntryType();
                    //3.获取序列化后的数据
                    ByteString storeValue = entry.getStoreValue();
                    //4.判断当前entryType类型是否为ROWDATA
                    if (CanalEntry.EntryType.ROWDATA.equals(entryType)) {
                        //5.反序列化数据
                        CanalEntry.RowChange rowChange = CanalEntry
                            .RowChange.parseFrom(storeValue);
                        //6.获取当前事件的操作类型
                        CanalEntry.EventType eventType = rowChange.getEventType();
                        //7.获取数据集
                        List<CanalEntry.RowData> rowDataList = rowChange.getRowDatasList();
                        //8.遍历rowDataList，并打印数据集
                        for (CanalEntry.RowData rowData : rowDataList) {
                            JSONObject beforeData = new JSONObject();
                            List<CanalEntry.Column> beforeColumnsList = rowData
                                .getBeforeColumnsList();
                            for (CanalEntry.Column column : beforeColumnsList) {
                                beforeData.put(column.getName(), column.getValue());
                            }
                            JSONObject afterData = new JSONObject();
                            List<CanalEntry.Column> afterColumnsList = rowData
                                                    .getAfterColumnsList();
                            for (CanalEntry.Column column : afterColumnsList) {
                                afterData.put(column.getName(), column.getValue());
                            }
                            //数据打印：重点操作在这，可以进行rabbitmq同步、同步到mongodb等操作
                            System.out.println("Table:" + tableName +
                                    ",EventType:" + eventType +
                                    ",Before:" + beforeData +
                                    ",After:" + afterData);
                        }
                    } else {
                        System.out.println("当前操作类型为：" + entryType);
                    }
                }
            }
        }
    }
}
```

修改数据库内容

无论插入或删除或更新，都能监听到数据并打印下来

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205251540272.png" alt="image-20220525154049222" style="zoom:80%;" />



### Java代码简化版

[(42条消息) 数据异构 Canal-Spring-Boot-Starter的技术实现_独行-浪子的博客-CSDN博客](https://blog.csdn.net/duxing_langzi/article/details/124349157)

Canal提供了各种语言的客户端，当Canal监听到binlog变化时，会通知Canal的客户端。

![image-20210821120049024](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210821120049024.png)

我们可以利用Canal提供的Java客户端，监听Canal通知消息。当收到变化的消息时，完成对缓存的更新。

不过这里我们会使用GitHub上的第三方开源的canal-starter客户端。地址：https://github.com/NormanGyllenhaal/canal-client

与SpringBoot完美整合，自动装配，比官方客户端要简单好用很多。

#### 引入依赖

```xml
<dependency>
    <groupId>top.javatool</groupId>
    <artifactId>canal-spring-boot-starter</artifactId>
    <version>1.2.1-RELEASE</version>
</dependency>
```

#### 编写配置

```yaml
canal:
  destination: heima # canal的集群名字，要与安装canal时设置的名称一致
  server: 192.168.150.101:11111 # canal服务地址
```

#### 修改Item实体类

Canal推送给canal-client的是被修改的这一行数据（row），而我们引入的canal-client则会帮我们把行数据封装到Item实体类中。这个过程中需要知道数据库与实体的映射关系，要用到JPA的几个注解：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205032232860.png" alt="image-20220503223236748" style="zoom:80%;" />

通过@Id、@Column、等注解完成Item与数据库表字段的映射：

```java
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

import javax.persistence.Column;
import java.util.Date;

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

通过实现`EntryHandler<T>`接口编写监听器，监听Canal消息。注意两点：

- 实现类通过`@CanalTable("tb_item")`指定监听的表信息
- EntryHandler的泛型是与表对应的实体类

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205032233573.png" alt="image-20220503223320453" style="zoom:80%;" />

```java
import com.github.benmanes.caffeine.cache.Cache;
import com.heima.item.config.RedisHandler;
import com.heima.item.pojo.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import top.javatool.canal.client.annotation.CanalTable;
import top.javatool.canal.client.handler.EntryHandler;

@CanalTable("tb_item")
@Component
public class ItemHandler implements EntryHandler<Item> {

    @Autowired
    private RedisHandler redisHandler;
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

在这里对Redis的操作都封装到了RedisHandler这个对象中，是我们之前做缓存预热时编写的一个类，内容如下：

```java
package com.heima.item.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.heima.item.pojo.Item;
import com.heima.item.pojo.ItemStock;
import com.heima.item.service.IItemService;
import com.heima.item.service.IItemStockService;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RedisHandler implements InitializingBean {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private IItemService itemService;
    @Autowired
    private IItemStockService stockService;

    private static final ObjectMapper MAPPER = new ObjectMapper();

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





## canal-adapter(ES同步)

可以将MySQL数据增量传入到ES中

将我们下载好的压缩包`canal.adapter-1.1.5-SNAPSHOT.tar.gz`上传到Linux服务器，然后解压到指定目录`/mydata/canal-adpter`，解压完成后目录结构如下；

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
  flatMessage: true # 扁平message开关, 是否以json字符串形式投递数据, 仅在kafka/rocketMQ模式下有效
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

添加配置文件`canal-adapter/conf/es7/product.yml`，

用于配置MySQL中的表与Elasticsearch中索引的映射关系；

注意：看SQL

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

- 首先我们需要在Elasticsearch中创建索引，和MySQL中的product表相对应，直接在Kibana的`Dev Tools`中使用如下命令创建即可；

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

删除成功后，在Elasticsearch中搜索下，发现数据已经删除了，至此MySQL同步到Elasticsearch的功能完成了！



## canal-admin(可视化)

注意：当前只支持MySQL5版本，不支持MySQL8版本

### 安装和配置

将我们下载好的压缩包`canal.admin-1.1.5-SNAPSHOT.tar.gz`上传到Linux服务器

```apl
mkdir canalAdmin
tar -xvf canal.admin-1.1.5-SNAPSHOT.tar.gz  -C canalAdmin
```

解压，看目录

```c
├── bin
│   ├── restart.sh
│   ├── startup.bat
│   ├── startup.sh
│   └── stop.sh
├── conf
│   ├── application.yml
│   ├── canal_manager.sql
│   ├── canal-template.properties
│   ├── instance-template.properties
│   ├── logback.xml
│   └── public
│       ├── avatar.gif
│       ├── index.html
│       ├── logo.png
│       └── static
├── lib
└── logs
```

### 配置MySQL

注意：docker安装完MySQL并run出容器后，建议请先修改完字符集编码后再新建mysql库-表-插数据

1. 搜索mysql镜像

```apl
docker search mysql
```

2. 拉取mysql镜像

```apl
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

参数说明：

- **-p 3309:3306**：将容器的 3306 端口映射到宿主机的 3309 端口。
- **-v $PWD/conf:/etc/mysql/conf.d**：将主机当前目录下的 conf/my.cnf 挂载到容器的 /etc/mysql/my.cnf。配置目录
- **-v /DockerData/mysql/log**：将主机当前目录下的 logs 目录挂载到容器的 /logs。日志目录
- **-v /DockerData/mysql/data** ：将主机当前目录下的data目录挂载到容器的 /var/lib/mysql，数据目录
- **-e MYSQL_ROOT_PASSWORD=123456：**初始化 root 用户的密码。

**改成中文**

```apl
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

```apl
docker restart mysql5.7
```

查看编码(修改成功)

```mysql
show variables like 'character%';
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220208130605973.png" alt="image-20220208130605973" style="zoom:67%;" />

进入conf，执行canal_manager.sql

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205251750260.png" alt="image-20220525175028210" style="zoom:80%;" />

修改配置文件`conf/application.yml`，按如下配置即可，主要是修改数据源配置和`canal-admin`的管理账号配置，注意需要用一个有读写权限的数据库账号，比如管理账号`root:root`

```yml
server:
  port: 8099
spring:
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8

spring.datasource:
  address: 192.168.22.130:3309
  database: canal_manager
  username: root
  password: 123456
  driver-class-name: com.mysql.jdbc.Driver
  url: jdbc:mysql://${spring.datasource.address}/${spring.datasource.database}?useUnicode=true&characterEncoding=UTF-8&useSSL=false
  hikari:
    maximum-pool-size: 30
    minimum-idle: 1

canal:
  adminUser: admin
  adminPasswd: admin
```

`下面这个配置原本就是这样，不用修改`

接下来对之前搭建的`canal-server`的`conf/canal_local.properties`文件进行配置，主要是修改`canal-admin`的配置，修改完成后使用`sh bin/startup.sh local`重启`canal-server`：

```properties
# register ip
canal.register.ip =
# canal admin config
canal.admin.manager = 127.0.0.1:8089
canal.admin.port = 11110
canal.admin.user = admin
canal.admin.passwd = 4ACFE3202A5FF5CF467898FC58AAB1D615029441
# admin auto register
canal.admin.register.auto = true
canal.admin.register.cluster = 
```

### 启动服务

使用`startup.sh`脚本启动`canal-admin`服务；

```apl
sh bin/startup.sh
```

启动成功后可使用如下命令查看服务日志信息；

```apl
tail -f logs/admin.log
```

- 访问canal-admin的Web界面，输入账号密码`admin:123456`即可登录，访问地址：http://192.168.22.130:8099

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205251732567.png" alt="image-20220525173224294" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205251754400.png" alt="image-20220525175419352" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205251754560.png" alt="image-20220525175459473" style="zoom:80%;" />

## Canal+RabbitMQ

### 1、打开MySQL的binlog日志

修改MySQL的日志文件，my.cnf 配置如下：

```apl
[mysqld]
log-bin=mysql-bin # 开启 binlog
binlog-format=ROW # 选择 ROW 模式
server_id=1 # 配置 MySQL replaction 需要定义，不要和 canal 的 slaveId 重复
```

### 2、设置MySQL的配置

需要设置服务端配置文件中的MySQL配置，这样Canal才能知道需要监听哪个库、哪个表的日志文件。

一个 Server 可以配置多个实例监听 ，Canal 功能默认自带的有个 example 实例，本篇就用 example 实例 。如果增加实例，复制 example 文件夹内容到同级目录下，然后在 `canal.properties` 指定添加实例的名称。

**修改canal.deployer-1.1.5\conf\example\instance.properties配置文件**

```apl
# url
canal.instance.master.address=127.0.0.1:3306
# username/password
canal.instance.dbUsername=root
canal.instance.dbPassword=root
# 监听的数据库
canal.instance.defaultDatabaseName=test

# 监听的表，可以指定，多个用逗号分割，这里正则是监听所有
canal.instance.filter.regex=.*\\..*
```

### 3、设置RabbitMQ的配置

服务端默认的传输方式是**tcp**，需要在配置文件中设置**MQ**的相关信息。

这里需要修改两处配置文件，如下；

**1、canal.deployer-1.1.5\conf\canal.properties**

这个配置文件主要是设置MQ相关的配置，比如URL，用户名、密码...

```apl
# 传输方式：tcp, kafka, rocketMQ, rabbitMQ
canal.serverMode = rabbitMQ
##################################################
######### 		    RabbitMQ	     #############
##################################################
rabbitmq.host = 127.0.0.1
rabbitmq.virtual.host =/
# exchange
rabbitmq.exchange =canal.exchange
# 用户名、密码
rabbitmq.username =guest
rabbitmq.password =guest
## 是否持久化
rabbitmq.deliveryMode = 2
```

**2、canal.deployer-1.1.5\conf\example\instance.properties**

这个文件设置MQ的路由KEY，这样才能路由到指定的队列中，如下：

```properties
canal.mq.topic=canal.routing.key
```

### 4、RabbitMQ新建exchange和Queue

在RabbitMQ中需要新建一个**canal.exchange**（必须和配置中的相同）的exchange和一个名称为 **canal.queue**（名称随意）的队列。

其中绑定的路由KEY为：**canal.routing.key**（必须和配置中的相同），如下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212070930776.png" alt="image-20221207093052697" style="zoom:67%;" />

### 5、启动服务端

点击bin目录下的脚本，windows直接双击**startup.bat**，启动成功如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212070931651.png" alt="image-20221207093109545" style="zoom:80%;" />

### 6、测试

在本地数据库**test**中的**oauth_client_details**插入一条数据，如下：

```sql
INSERT INTO `oauth_client_details` VALUES ('myjszl', 'res1', '$2a$10$F1tQdeb0SEMdtjlO8X/0wO6Gqybu6vPC/Xg8OmP9/TL1i4beXdK9W', 'all', 'password,refresh_token,authorization_code,client_credentials,implicit', 'http://www.baidu.com', NULL, 1000, 1000, NULL, 'false');
```

此时查看MQ中的**canal.queue**已经有了数据，如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212070932317.png" alt="image-20221207093245231" style="zoom:80%;" />

其实就是一串JSON数据，这个JSON如下：

```json
{
 "data": [{
  "client_id": "myjszl",
  "resource_ids": "res1",
  "client_secret": "$2a$10$F1tQdeb0SEMdtjlO8X/0wO6Gqybu6vPC/Xg8OmP9/TL1i4beXdK9W",
  "scope": "all",
  "authorized_grant_types": "password,refresh_token,authorization_code,client_credentials,implicit",
  "web_server_redirect_uri": "http://www.baidu.com",
  "authorities": null,
  "access_token_validity": "1000",
  "refresh_token_validity": "1000",
  "additional_information": null,
  "autoapprove": "false"
 }],
 "database": "test",
 "es": 1640337532000,
 "id": 7,
 "isDdl": false,
 "mysqlType": {
  "client_id": "varchar(48)",
  "resource_ids": "varchar(256)",
  "client_secret": "varchar(256)",
  "scope": "varchar(256)",
  "authorized_grant_types": "varchar(256)",
  "web_server_redirect_uri": "varchar(256)",
  "authorities": "varchar(256)",
  "access_token_validity": "int(11)",
  "refresh_token_validity": "int(11)",
  "additional_information": "varchar(4096)",
  "autoapprove": "varchar(256)"
 },
 "old": null,
 "pkNames": ["client_id"],
 "sql": "",
 "sqlType": {
  "client_id": 12,
  "resource_ids": 12,
  "client_secret": 12,
  "scope": 12,
  "authorized_grant_types": 12,
  "web_server_redirect_uri": 12,
  "authorities": 12,
  "access_token_validity": 4,
  "refresh_token_validity": 4,
  "additional_information": 12,
  "autoapprove": 12
 },
 "table": "oauth_client_details",
 "ts": 1640337532520,
 "type": "INSERT"
}
```

每个字段的意思已经很清楚了，有表名称、方法、参数、参数类型、参数值.....

**客户端要做的就是监听MQ获取JSON数据，然后将其解析出来，处理自己的业务逻辑。**

### 7、Canal客户端搭建

客户端很简单实现，要做的就是消费Canal服务端传递过来的消息，监听**canal.queue**这个队列。

#### 1、创建消息实体类

MQ传递过来的是JSON数据，当然要创建个实体类接收数据，如下：

```java
/**
 * @author 公众号 码猿技术专栏
 * Canal消息接收实体类
 */
@NoArgsConstructor
@Data
public class CanalMessage<T> {
    @JsonProperty("type")
    private String type;

    @JsonProperty("table")
    private String table;

    @JsonProperty("data")
    private List<T> data;

    @JsonProperty("database")
    private String database;

    @JsonProperty("es")
    private Long es;

    @JsonProperty("id")
    private Integer id;

    @JsonProperty("isDdl")
    private Boolean isDdl;

    @JsonProperty("old")
    private List<T> old;

    @JsonProperty("pkNames")
    private List<String> pkNames;

    @JsonProperty("sql")
    private String sql;

    @JsonProperty("ts")
    private Long ts;
}
```

#### 2、MQ消息监听业务

接下来就是监听队列，一旦有Canal服务端有数据推送能够及时的消费。

代码很简单，只是给出个接收的案例，具体的业务逻辑可以根据业务实现，如下：

```java
import cn.hutool.json.JSONUtil;
import cn.myjszl.middle.ware.canal.mq.rabbit.model.CanalMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

/**
 * 监听MQ获取Canal增量的数据消息
 */
@Component
@Slf4j
@RequiredArgsConstructor
public class CanalRabbitMQListener {

    @RabbitListener(bindings = {
            @QueueBinding(
                    value = @Queue(value = "canal.queue", durable = "true"),
                    exchange = @Exchange(value = "canal.exchange"),
                    key = "canal.routing.key"
            )
    })
    public void handleDataChange(String message) {
        //将message转换为CanalMessage
        CanalMessage canalMessage = JSONUtil.toBean(message, CanalMessage.class);
        String tableName = canalMessage.getTable();
        log.info("Canal 监听 {} 发生变化；明细：{}", tableName, message);
        //TODO 业务逻辑自己完善...............
    }
}
```

#### 3、测试

下面向表中插入数据，看下接收的消息是什么样的，SQL如下：

```sql
INSERT INTO `oauth_client_details`
VALUES('myjszl', 'res1', '$2a$10$F1tQdeb0SEMdtjlO8X/0wO6Gqybu6vPC/Xg8OmP9/TL1i4beXdK9W', 'all', 'password,refresh_token,authorization_code,client_credentials,implicit', 'http://www.baidu.com', NULL, 1000, 1000, NULL, 'false');
```

客户端转换后的消息如下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212070933315.png" alt="image-20221207093353207" style="zoom:80%;" />

上图可以看出所有的数据都已经成功接收到，只需要根据数据完善自己的业务逻辑即可。





# Canal踩坑与原因分析

## Binlog解析错误

这个问题主要由以下几种典型情况：

- INSERT/UPDATE/DELETE被解析为Query或DDL语句
- Binlog重复解析，即一个操作又有QUERY消息，又有对应的INSERT/UPDATE/DELETE消息。

这两个问题主要都是因为Binlog不是row模式导致的，先来复习下Binlog的三种模式。

### MySQL Binlog的三种模式

MySQL在进行主从同步时，会使用Binlog，从库读取Binlog来进行数据的同步。但是Binlog是有三种不同的运行模式的，分别是ROW模式、Statement模式和Mix模式

#### ROW模式

Binlog日志中仅记录哪一条记录被修改了，修改成什么样了，会非常清楚的记录下每一行数据修改的细节，**「Master修改了哪些行，slave也直接修改对应行的数据」**

> 优点：row的日志内容会非常清楚的记录下每一行数据修改的细节，非常容易理解。而且不会出现某些特定情况下的存储过程和function，以及trigger的调用和出发无法被正确复制问题。
>
> 缺点：在row模式下，所有的执行的语句当记录到日志中的时候，都将以每行记录的修改来记录，这样可能会产生大量的日志内容。

#### Statement模式

每一条会修改数据的sql都会记录到master的binlog中，**「slave在复制的时候sql进程会解析成和原来master端执行相同的sql再执行。」**

> 优点：在statement模式下首先就是解决了row模式的缺点，不需要记录每一行数据的变化减少了binlog日志量，节省了I/O以及存储资源，提高性能。因为他只需要记录在master上所执行的语句的细节以及执行语句的上下文信息。

> 缺点：在statement模式下，由于他是记录的执行语句，所以，为了让这些语句在slave端也能正确执行，那么他还必须记录每条语句在执行的时候的一些相关信息，也就是上下文信息，以保证所有语句在slave端被执行的时候能够得到和在master端执行时候相同的结果。另外就是，由于mysql现在发展比较快，很多的新功能不断的加入，使mysql的复制遇到了不小的挑战，自然复制的时候涉及到越复杂的内容，bug也就越容易出现。在statement中，目前已经发现不少情况会造成Mysql的复制出现问题，主要是修改数据的时候使用了某些特定的函数或者功能的时候会出现，比如：sleep()函数在有些版本中就不能被正确复制，在存储过程中使用了last_insert_id()函数，可能会使slave和master上得到不一致的id等等。由于row是基于每一行来记录的变化，所以不会出现，类似的问题。

#### Mix模式

> 从官方文档中看到，之前的 MySQL 一直都只有基于 statement 的复制模式，直到 5.1.5 版本的 MySQL 才开始支持 row 复制。从 5.0 开始，MySQL 的复制已经解决了大量老版本中出现的无法正确复制的问题。但是由于存储过程的出现，给 MySQL Replication 又带来了更大的新挑战。
>
> 另外，看到官方文档说，从 5.1.8 版本开始，MySQL 提供了除 Statement 和 Row 之外的第三种复制模式：Mixed，实际上就是前两种模式的结合。
>
> **「在 Mixed 模式下，MySQL 会根据执行的每一条具体的 SQL 语句来区分对待记录的日志形式，也就是在 statement 和 row 之间选择一种。」**
>
> 新版本中的 statment 还是和以前一样，仅仅记录执行的语句。而新版本的 MySQL 中对 row 模式也被做了优化，并不是所有的修改都会以 row 模式来记录，比如遇到表结构变更的时候就会以 statement 模式来记录，如果 SQL 语句确实就是 update 或者 delete 等修改数据的语句，那么还是会记录所有行的变更。

### 问题分析

说完了三种模式，下面就来看看在Canal中会带来的影响，**「简单来说就是会造成Canal解析Query出现问题」**。

我的客户端代码片段：

```java
String tableName = header.getTableName();
String schemaName = header.getSchemaName();

RowChange rowChange = null;

try {
    rowChange = RowChange.parseFrom(entry.getStoreValue());
} catch (InvalidProtocolBufferException e) {
    LOGGER.error("解析数据变化出错", e);
}

EventType eventType = rowChange.getEventType();

LOGGER.info("当前正在操作表 {}.{}  执行操作 = {}", schemaName, tableName, eventType);
```

运行后，可以看到输出：

![图片](https://mmbiz.qpic.cn/mmbiz_png/qm3R3LeH8rajEpxibPrMn2kkeGLDGWJV6Ou1rAy8lia9gwEPqd7luPqwZYHEozzuvwoqKpJd9BIj0ULztDUnulhw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

红框标出的部分，可以看出其实是一次操作，但是应该由于是Mix模式，canal解析成了两条消息，一次是QUERY，一次是UPDATE。

官方文档其实给出了解释：

https://github.com/alibaba/canal/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94

> 问1：INSERT/UPDATE/DELETE被解析为Query或DDL语句？
>
> 答1：出现这类情况主要原因为收到的binlog就为Query事件，比如:
>
> 1. binlog格式为非row模式，通过show variables like 'binlog_format'可以查看. 针对statement/mixed模式，DML语句都会是以SQL语句存在
> 2. mysql5.6+之后，在binlog为row模式下，针对DML语句通过一个开关(binlog-rows-query-log-events=true, show variables里也可以看到该变量)，记录DML的原始SQL，对应binlog事件为RowsQueryLogEvent，同时也有对应的row记录. ps. canal可以通过properties设置来过滤：canal.instance.filter.query.dml = true

懂了问题出在Binlog后，其实这个问题也就不是太大，只是一开始让人很迷惑。

## Filter失效

Canal提供了filter可以过滤掉不需要监听的表（黑名单），或者指定需要监听的表（白名单）。

我们通常在canal-server端的conf/example/instance.properties文件中进行设置：

```apl
# table regex
canal.instance.filter.regex=.*\\..*
# table black regex
canal.instance.filter.black.regex=
```

设置规则方式为：

mysql 数据解析关注的表，Perl正则表达式。多个正则之间以逗号(,)分隔，转义符需要双斜杠(\\)

常见例子：

1.  所有表：.*   or  .*\\..*
2.  canal schema下所有表：canal\\..*
3.  canal下的以canal打头的表：canal\\.canal.*
4.  canal schema下的一张表：canal.test1
5.  多个规则组合使用：canal\\..*,mysql.test1,mysql.test2 (逗号分隔)

也可以在客户端与canal进行连接时，用客户端的`connector.subscribe("xxxxxxx");`来覆盖服务端初始化时的设置。

Canal官方可能是收到的filter设置不成功的反馈有点多了，在canal1.1.3+版本之后,会在日志里记录最后使用的filter条件，可以对比使用的filter看看是否和自己期望的是一致：

```apl
c.a.o.canal.parse.inbound.mysql.dbsync.LogEventConvert - --> init table filter : ^.*\..*$
c.a.o.canal.parse.inbound.mysql.dbsync.LogEventConvert - --> init table black filter :
```

### 可能原因一：客户端调用subscribe("xxx")

如果失效，首先看下自己在客户端是不是调用过`connector.subscribe("xxxxxxx");`覆盖了服务端初始化时的设置。

### 可能原因二：Binlog非ROW模式

Binlog如果不是row模式，filter会失效

> 过滤条件只针对row模式的数据有效(ps. mixed/statement因为不解析sql，所以无法准确提取tableName进行过滤)

我上面截图中那种收到两条消息的情况，第一条消息就是一个QURTY，并且没法确定表名，所以没法开启过滤。

## 消费落后

### 问题分析

Canal现在的架构是单机消费，就算是高可用架构，为了保证binlog消费的顺序，依然是单机高可用，也就是在一台消费者挂了之后在其他待命的消费者中启动一台继续消费。（这个是目前版本我的理解，以后或许会有并发消费的新版本出来。）可以看下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208221540330.png" alt="image-20220822154008230" style="zoom:67%;" />

这种情况下，在Binlog数据量极大时，消费进程就有可能处理不过来。最后就会**「体现在消费跟不上，进度滞后，甚至挂掉」**。在Canal开源仓库的issues中你可以看到很多类似的问题报告：

我在部署完Canal后，在遇到数据库写入高峰期，就遇到了数据延迟问题。数据延迟还是小事，但是一旦延迟到堆满了内存缓冲区，不消费的话，新的消息就进不来了。



### 解决办法

**「一个可行的解决办法是，将消息拉取后，写入消息队列（如RabbitMQ/Kafka），用消息队列来堆积消息处理，来保证大量消息堆积后不会导致canal卡死，并且可以支持数据持久化。」**

**「我自己对Canal这样做的的猜测：Canal应该想是让专业的工具做专业的事，Canal就只是一个读取Binlog的中间件，并不是专业的消息队列，消息应该让专业的消息队列来处理。」**

## 总结

Canal实际用起来，特别是好好读他的文档后，能感觉到还有许多问题和坑，还需要自己多多实践一下，调研一下，才知道什么是适合自身业务的。之后如果遇到更多Canal的坑，我还会持续记录下来。



# Maxwell

## 前言

Maxwell 是一个读取 MySQL binlogs 并将修改行字段的更新写入 Kafka, Kinesis, RabbitMQ, Google Cloud Pub/Sub 或 Redis (Pub/Sub or LPUSH) 以作为 JSON 的应用程序。

Maxwell的操作开销很低，只需要mysql和一个写入位置即可。它的常见用例包括ETL，缓存建立/过期，指标收集，搜索索引和服务间通信。

Maxwell为您提供了事件来源的一些好处，而不必重新构建整个平台。

Maxwell 拥有可对底层进行操作的操作栏(operational bar)，可生成一致、易于获取的更新流，你可以轻松“固定”流处理系统的一些优点，而无需通过整个代码库来添加（不可靠）检测点。 

常见用例包括 ETL、缓存构建/到期、指标收集、搜索索引和服务间通信。

可在表的初始加载过程中执行 SELECT * from table (bootstrapping)

支持在 master promotion 上的自动位置恢复

为 Kakfa 提供灵活的分区方案 —— 按数据库、表、主键或字段进行

Maxwell 通过充当完整的 mysql 副本来完成所有这些操作，包括用于 create/alter/drop 语句的 SQL 解析器。

源码地址：https://github.com/zendesk/maxwell

### 对比canal

- Maxwell 没有 Canal那种server+client模式，只有一个server把数据发送到消息队列或redis。
- Maxwell 有一个亮点功能，就是Canal只能抓取最新数据，对已存在的历史数据没有办法处理。而Maxwell有一个bootstrap功能，可以直接引导出完整的历史数据用于初始化，非常好用。
- Maxwell不能直接支持HA，但是它支持断点还原，即错误解决后重启继续上次点儿读取数据。
- Maxwell只支持json格式，而Canal如果用Server+client模式的话，可以自定义格式。
- Maxwell比Canal更加轻量级。

![](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205241906818.png)



###  Maxwell工作原理

>  Maxwell的工作原理很简单，就是把自己伪装成MySQL的一个slave，然后以slave的身份假装从MySQL(master)复制数据。



## 安装配置

> 注意：1.30版本以后支持JDK11，不支持JDK1.8

1、下载对应版本的安装包

- 地址：https://github.com/zendesk/maxwell
- 安装包名称：`maxwell-1.29.2.tar.gz`

```apl
tar -zxvf maxwell-1.29.2.tar.gz
cd maxwell-1.29.2
-- 可选
cp config.properties.example config.properties
```

- 注意：一定要保证使用`maxwell` 用户和 `123456` 密码能够连接上mysql数据库



## 配置MySQL

```apl
vim /etc/my.cnf
```

```properties
server-id=1
log-bin=mysql-bin
binlog_format=row
```

```apl
systemctl restart mysqld
```

创建用户

```apl
mysql -uroot -p123456
```

```apl
set global validate_password.policy=0;
set global validate_password.length=1;
```

```sql
create user 'maxwell'@'%' identified by '123456';
GRANT ALL ON *.* TO maxwell@'%';
```

```sql
flush privileges;
```

```apl
-- 创建数据库，自己不需要写任何表
CREATE DATABASE maxwell;
```



## 启动和监控

### 方式一

```apl
bin/maxwell \
--user='maxwell' \
--password='123456' \
--host='localhost' \
--port='3306' \
--producer=stdout
```

启动成功

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205241803825.png" alt="image-20220524180316627" style="zoom: 67%;" />

修改任意数据库的任意表

响应数据

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205241808190.png" alt="image-20220524180820120" style="zoom:80%;" />



### 方式二

```apl
cd maxwell-1.29.2
cp config.properties.example config.properties
```

修改如下

```apl
vim config.properties
```

```apl
log_level=info
# 这边默认是kafka
producer=stdout
# kafka.bootstrap.servers=localhost:9092
# mysql login info
host=localhost
user=maxwell
password=123456
```

启动

```apl
bin/maxwell --config ./config.properties
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205241814813.png" alt="image-20220524181455674" style="zoom:80%;" />

观察生成的json

Maxwell是以行为单位进行日志采集的

```json
{
	"database": "books",
	"table": "author",
	"type": "insert",
	"ts": 1653387633,
	"xid": 2901,
	"commit": true,
	"data": {
		"id": 1,
		"name": "张三"
	}
}
```



## 指定监控表和库

filter进行过滤，先排除所有表，再将author表加进去

```apl
bin/maxwell \
--user='maxwell' \
--password='123456' \
--filter='exclude:*.*,include:books.author' \
--host='localhost' \
--port='3306' \
--producer=stdout
```

当然，可以修改成

```apl
--filter 'exclude:*.*,include:books.author' \
# 指定监控books库
--filter 'exclude:*.*,include:books.*' \
--filter 'exclude: foodb.*, include: foodb.tbl, include: foodb./table_\d+/'
```



## 全量同步

进入MySQL数据库中，执行

```sql
-- 使用maxwell数据库
use maxwell;
-- 监测heima数据库的tb_item表
insert into maxwell.bootstrap(database_name,table_name) values('heima','tb_item');
```

进行启动MaxWell

```apl
bin/maxwell \
--user='maxwell' \
--password='123456' \
--host='localhost' \
--port='3306' \
--producer=stdout
```

启动时，可以发现数据已经成功同步显示过去了

正在启动时也能进行同步

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205241849115.png" alt="image-20220524184908851" style="zoom: 67%;" />

`当然，关闭之后再启动就不会再同步上面的数据了，想要再次同步需要执行上面的SQL语句`



## 输出到Redis

```apl
vim config.properties
```

```properties
log_level=info
producer=redis
# mysql login info
host=localhost
port=3306
user=maxwell
password=123456
# redis配置
redis_host=127.0.0.1
redis_port=6379
#redis_auth=redis_auth
redis_database=0
redis_key=maxwell
redis_stream_json_key=message 
#默认pubsub
redis_type=lpush
```

进行启动

```apl
bin/maxwell --config ./config.properties
```

修改数据

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205242034906.png" alt="image-20220524203417790" style="zoom:80%;" />

如果默认是pubsub的话，需要

```apl
redis-server /etc/redis.conf
redis-cli
SUBSCRIBE maxwell
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205242036219.png" alt="image-20220524203626049" style="zoom:80%;" />









