

# 认识InfluxDB

## InfluxDB的使用场景

> InfluxDB 是一种时序数据库，时序数据库通常被用在监控场景，比如运维和 IOT（物联网）领域。这类数据库旨在存储时序数据并实时处理它们。

> 比如。我们可以写一个程序将服务器上 CPU 的使用情况每隔 10 秒钟向 InfluxDB 中写入一条数据。接着，我们写一个查询语句，查询过去 30 秒 CPU 的平均使用情况，然后让这个查询语句也每隔 10 秒钟执行一次。最终，我们配置一条报警规则，如果查询语句的执行结果>xxx，就立刻触发报警。

> 上述就是一个指标监控的场景，在 IOT 领域中，也有大量的指标需要我们监控。比如，机械设备的轴承震动频率，农田的湿度温度等等。

## 为什么不用关系型数据库

### 写入性能

> 关系型数据库也是支持时间戳的，也能够基于时间戳进行查询。但是，从我们的使用场景出发，需要注意数据库的写入性能。通常，关系型数据库会采用 B+树数据结构，在数据写入时，有可能会触发叶裂变，从而产生了对磁盘的随机读写，降低写入速度。

> 当前市面上的时序数据库通常都是采用 LSM Tree 的变种，顺序写磁盘来增强数据的写入能力。网上有不少关于性能测试的文章，同学们可以自己去参考学习，通常时序数据库都会保证在单点每秒数十万的写入能力。

### 数据价值

> 我们之前说，时序数据库一般用于指标监控场景。这个场景的数据有一个非常明显的特点就是冷热差别明显。通常，指标监控只会使用近期一段时间的数据，比如我只查询某个设备最近 10 分钟的记录，10 分钟前的数据我就不再用了。那么这 10 分钟前的数据，对我们来说就是冷数据，应该被压缩放到磁盘里去来节省空间。而热数据因为经常要用，数据库就应该让它留在内存里，等待查询。而市面上的时序数据库大都有类似的设计。

### 时间不可倒流，数据只写不改

时序数据是描述一个实体在不同时间所处的不同状态。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232053756.png" alt="image-20230423205327684" style="zoom:80%;" />

> 就像是我们打开任务管理器，查看 CPU 的使用情况。我发现 CPU 占用率太高了，于是杀死了一个进程，但 10 秒前的数据不会因为我关闭进程再发生改变了。这是时序数据的一大特点。与之相应，时序数据库基本上是插入操作较多，而且还没有什么更新需求。

### 数据的应用

根据上文的介绍，我们首先可以知道时序数据一般用在监控场景。大体上，数据的应用可以分为 4 步走。

（1）数据采集

（2）存储

（3）查询（包括聚合操作）

（4）报警

> 这样一看，只给一个数据库其实只能完成数据的存储和查询功能，上游的采集和下游的报警都需要自己来实现。因此 InfluxData 在 InfluxDB1.X 的时候推出了 TICK 生态来推出start 全套的解决方案。

TICK4 个字母分别对应 4 个组件。

>  T : Telegraf 数据采集组件，收集&发送数据到 InfluxDB
>
>  I : InfluxDB 存储数据&发送数据到 Chronograf
>
> C : Chronograf - 总的用户界面，起到总的管理功能
>
> K : Kapacitor 后台处理报警信息。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232056179.png" alt="image-20230423205611122" style="zoom:80%;" />

> 到了 2.x，TICK 进一步融合，ICK 的功能全部融入了 InfluxDB，仅需安装 InfluxDB 就能得到一个管理页面，而且附带了定时任务和报警功能。

## influxDB 版本比较与选型

### 版本特性比较

> 2020 年 InfluxDB 推出了 2.0 的正式版。2.x 同 1.x 相比，底层引擎原理相差不大，但会涉及一些概念的转变（例如 db/rp 换成了 org/bucket）。另外，对于 TICK 生态来说，1.x 需要自己配置各个组件。2.x 则是更加方便集成，有很棒的管理页面。另外，在查询语言方面，1.x 是使用 InfluxQL 进行查询，它的风格近似 SQL。2.x 推出了 FLUX 查询语言，可以使用函数与管道符，是一种更符合时序数据特性的更具表现力的查询语言。

### 选型，本文档使用 InfluxDB 2.4

> 市场现状：目前企业里面用 InfluxDB 1.X 和 InfluxDB 2.X 都有人在用，数量上InfluxDB1.X 占多一些。
>
> 易用性：在开发中，InfluxDB 1.X 集成生态会比较麻烦，InfluxDB 2.X 相对来说更加便利。
>
> 性能：InfluxDB 1.X 和 2.X 的内核原理基本一致，性能上差距不大。
>
> 集群：InfluxDB 从 0.11 版本开始，就闭源了集群功能的代码。也就是说，你只能免费试用 InfluxDB 的单节点版开源，想要集群等功能就需要购买企业版。不过就InfluxDB 1.8 来说，有开源项目根据 0.11 的代码思路提供了 InfluxDB 开源的集群方案。也有开源项目给 InfluxDB 2.3 增加了反向代理功能，让我们可以横向拓展 InfluxDB 的服务能力

InfluxDB Cluster 对应 1.8.10：https://github.com/chengshiwen/influxdb-cluster

InfluxDB Proxy 对应 1.2 - 1.8：https://github.com/chengshiwen/influx-proxy

InfluxDB Proxy 对应 2.3：https://github.com/chengshiwen/influx-proxy/tree/influxdb-v2

> FLUX 语言支持：自 InfluxDB 1.7 和 InfluxDB 2.0 以来，InfluxDB 推出了一门独立的新的查询语言 FLUX，而且作为一个独立的项目来运作。InfluxData 公司希望 FLUX 语言能够成为一个像 SQL 一样的通用标准，而不仅仅是查询 InfluxDB 的特定语言。而且不管是你是选择 InfluxDB 1.X 还是 2.X 最终都会接触到 FLUX。不过 2.X 对 FLUX 的支持性要更好一些。

### InfluxDB 产品概况

> ◼ InfluxDB 1.8 在小版本上还在更新，主要是修复一些 BUG，不再添加新特性
>
> ◼ InfluxDB 2.4 这是 InfluxDB 较新的版本，仍然在增加新的特性。
>
> ◼ InfluxDB 企业版 1.9 需要购买，相比开源版，它有集群功能。
>
> ◼ InfluxDB Cloud，免部署，跑在 InfluxData 公司的云服务器上，你可以使用客户端来操作。功能上对应 2.4

> 2.x 与 1.x 的主要区别：两个版本的内核原理基本一致，性能上的差别不大。差别主要是在，权限管理方式不同，2.x TICK 的集成性比 1.x 好，1.x 中的 database 到了 2.x 中变成了 bucket 等。

## 安装部署 InfluxDB

### 下载安装

在 linux 环境下有两种安装方式

> 通过包管理工具安装，比如 apt 和 yum
>
> 直接下载可执行二进制程序的压缩包

本课程选用第二种方式，你可以使用下面的命令下载程序包

```sh
wget https://dl.influxdata.com/influxdb/releases/influxdb2-2.4.0-linux-amd64.tar.gz
```

压缩包下载好后，将其解压到目标路径。

```sh
mkdir -p /opt/module
tar -xzvf influxdb2-2.4.0-linux-amd64.tar.gz -C /opt/module
```

> Go 语言开发的项目一般来说会只打包成单独的二进制可执行文件，也就是解压后目录下的 influxd 文件，这一文件中全是编译后的本地码，可以直接跑在操作系统上，不需要安装额外的运行环境或者依赖。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232102535.png" alt="image-20230423210202503" style="zoom:80%;" />

现在，可以运行使用下面的命令，正式开启 InfluxDB 服务进程。

```sh
cd /opt/module/
mv influxdb2_linux_amd64/ influxdb
cd influxdb/
./influxd
```

### 进行初始化配置

使用浏览器访问 http://192.168.31.202:8086/。如果是安装后的首次使用，InfluxDB 会返回一个初始化的引导界面。按照给定步骤完成操作就好。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232102701.png" alt="image-20230423210234652" style="zoom:80%;" />

### 创建用户和初始化存储桶

点击 GET STARTED 按钮，进入下一个步骤（添加用户）。如图所示，你需要填写、组织名称、用户名称、用户密码。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232103071.png" alt="image-20230423210320997" style="zoom:80%;" />

填写完后点击 CONTINUE 按钮进入下一步。

### 配置完成

看到如图所示的页面，说明我们已经开始使用 tony 这一用户身份和 InfluxDB 交互了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232103964.png" alt="image-20230423210353885" style="zoom:80%;" />

# InfluxDB入门（借助Web UI）

借助 Web UI，我们可以更好地理解 InfluxDB 的功能划分。接下来，我们就从 Web UI入手，先了解 InfluxDB基本功能

## 数据源相关

### Load Data（加载数据）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232105650.png" alt="image-20230423210525594" style="zoom:67%;" />

如图所示，页面上左侧的向上箭头，对应着 InfluxDB Web UI 的 Load Data（加载数据）页面。

### 上传数据文件

> 在 Web UI 上，你可以用文件的方式上传数据，前提是文件中的数据符合 InfluxDB 支持的类型，包括 CSV、带 Flux 注释的 CSV 和 InfluxDB 行协议。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232106774.png" alt="image-20230423210600731" style="zoom:80%;" />

> 点击其中任意一个按钮，将进入数据的上传页面，页面中包含了详细的说明文档，包含你的数据应该符合什么格式，你要把数据放到哪个存储桶里，还包括用命令行来上传数据的命令模板。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232106236.png" alt="image-20230423210625164" style="zoom:80%;" />

### 写入 InfluxDB 的代码模板

> InfluxDB 提供了各种编程语言的连接库，你甚至可以在前端嵌入向 InfluxDB 写入数据的代码，因为 InfluxDB 向外提供了一套功能完整的 REST API。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232107474.png" alt="image-20230423210722421" style="zoom:80%;" />

点击任何一个语言的 LOGO，你会看到使用这门语言，将数据写入到 InfluxDB 的代码模板。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232107793.png" alt="image-20230423210737708" style="zoom:80%;" />

建议从这里拷贝初始化客户端的代码。

配置 Telegraf 的输入插件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232108943.png" alt="image-20230423210803883" style="zoom:80%;" />

> Telegraf 是一个插件化的数据采集组件，在这里你可以找一下没有对应你的目标数据源的插件，点击它的 logo。可以看到这个插件配置的写法，但是关于这方面的内容，还是建议参考 Telegraf 的官方文档，那个更细更全一些。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232108253.png" alt="image-20230423210839181" style="zoom:80%;" />

### 管理存储桶

> 你可以将 InfluxDB 中的 bucket 理解为普通关系型数据库中的 database。在 Load data 页面上，点击上访的 BUCKETS 选项卡，就可以进入 bucket 管理页面了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232109234.png" alt="image-20230423210902187" style="zoom:80%;" />

### 创建 Bucket

> 点击右上角的 CREATE BUCKET 按钮，会有一个创建存储桶的弹窗，这里你可以给bucket 指定一个名称和数据的过期时间。比如你设置过期时间为 6 小时，那 InfluxDB 就会自动把存储桶中距离当前时间超过 6 小时的数据删除

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232110821.png" alt="image-20230423211059756" style="zoom:80%;" />

### **调整** Bucket **的设置**

存储桶的过期时间的名称都是可以修改的，点击任一 Bucket 信息卡的 SETTINGS 按钮会弹出一个调整设置的会话框。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232111266.png" alt="image-20230423211119203" style="zoom:67%;" />

> 重命名是 InfluxDB 不建议的操作，因为大量的代码和 InfluxDB 定时任务都需要通过指定 Bucket 的名称来进行连接，贸然更改 Bucket 的名称可能导致这些程序无法正常工作。

### **设置** Label

在每个 Bucket 信息卡的左下方都有一个 Add a label 按钮，点击这个按钮，你可以为Bucket 添加一个标签。不过这个功能一般很少用

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232111133.png" alt="image-20230423211149083" style="zoom:67%;" />

### **向** Bucket **添加数据**

> 每个存储桶信息卡的右边都有一个添加数据按钮，点击这个按钮可以快速导入一些数据。这里还可以创建一个抓取任务（被抓取的数据在格式上必须符合 prometheus 数据格式）

### 示例 1：创建 Bucket **并从文件导入数据**

#### **创建** **Bucket**

（1）将鼠标悬停在 左侧的按钮上，点击 Buckets，进入 Bucketde 的管理页面。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232112336.png" alt="image-20230423211257288" style="zoom:80%;" />

> 点击 CREATE BUCKET 按钮，指定一个名称，这里我们将其设为 example01，删除策略保留默认的 NEVER，表示永远不会删除数据

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232113894.png" alt="image-20230423211323858" style="zoom:67%;" />

点击 CREATE 按钮，可以看到我们的 Buckets 已经创建成功了。

#### 进入上传数据引导页面

在 Load Data 页面，点击 Line Prtocol 进入 InfluxDB 行协议格式数据的上传引导页面。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232114042.png" alt="image-20230423211450979" style="zoom:80%;" />

#### 录入数据

> （1）点击选择存储桶
>
> （2）选择 ENTER MANUALLY，手动输入数据
>
> （3）将数据粘到输入框
>
> （4）在右侧指明时间精度，包括纳秒、微秒、毫秒和秒

```
people,name=tony age=12
people,name=xiaohong age=13
people,name=xiaobai age=14
people,name=xiaohei age=15
people,name=xiaohua age=12
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232115386.png" alt="image-20230423211511284" style="zoom:80%;" />

当前我们写的数据格式叫做 InfluxDB 行协议。你可以查看附录 2 来了解这一数据格式的知识。

最后点击 WRITE DATA，将数据写到 InfluxDB。如果出现 Data Written Successfully，那么说明数据写入成功。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232121554.png" alt="image-20230423212139510" style="zoom:80%;" />

> InfluxDB 是一个无模式的数据库，也就是除了在输入数据之前需要显示创建存储桶（数据库），你不需要手动创建 measurement 或者指定各个 field 都是什么类型，你甚至可以前后在同一个 measurement 下插入 filed 不同的数据

### **管理** **Telegraf** 数据源

> 点击 Load Data 页面的 TELEGRAF 选项卡，可以快速生成一些 Telegraf 配置文件。并向外暴露一个端口，允许 telegraf 远程使用 InfluxDB 中生成的配置。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232124265.png" alt="image-20230423212418218" style="zoom:80%;" />

#### 什么是 Telegraf

> Telegraf 是 InfluxDB 生态中的一个数据采集组件，它可以讲各种时序数据自动采集到InfluxDB。现在，Telegraf 不仅仅是 InfluxDB 的数据采集组件了，很多时序数据库都支持与 Telegraf 进行协作，不少类似的时序数据收集组件选择在 Telegraf 的基础上二次开发。所以，我们将 Telegraf 录成了一门专门的课，大家可以到 B 站上找尚硅谷的 Telegraf 课程，

将课程看到示例 3，就可以理解本课程中使用到的关于 Telegraf 的知识点了。

#### 创建 Telegraf **配置文件**

> InfluxDB 的 Web UI 为我们提供了几种最常用的 telegraf 配置模板，包括监控主机指标、云原生容器状态指标，nginx 和 redis 等。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232125279.png" alt="image-20230423212542220" style="zoom:80%;" />

通过页面，你可以勾选几种监控目标，然后一步步操作去创建一个 Telegraf 的配置文出来。

#### **管理** Telegraf **配置文件接口**

完成 Telegraf 的配置后，页面上会多出一个关于 telegraf 实例的信息卡。如图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232126225.png" alt="image-20230423212609185" style="zoom:80%;" />

点击蓝色的 Setup Instructions。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232126160.png" alt="image-20230423212623082" style="zoom:80%;" />

会弹出一个对话框，引导你完成 telegraf 的配置。可以看到第三步的命令。

```sh
telegraf --config :8086/api/v2/telegrafs/09dc7d49c444f000
```

这个命令中有一个 URL，其实意思也就是 InluxDB 向外提供了一个 API，通过这个API 可以访问刚才生成的配置文件

#### **修改** Telegraf **配置**

已经生成的配置文件如何去修改呢？你可以点击卡片的标题。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232127104.png" alt="image-20230423212708058" style="zoom:80%;" />

这个时候，会弹出一个配置文件的编辑页面，不过这个时候没有交互式的选项了，你需要自己直接面对配置文件。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232127086.png" alt="image-20230423212728995" style="zoom:80%;" />

修改完配置文件后，记得点击右方的 SAVE CHANGES 保存修改。

### 示例2：使用Telegraf将数据收集到InfluxDB

在本示例中，我们会使用 Telegraf 这个工具将一台机器上的 CPU 使用情况转变成时序数据，写到我们的 InfluxDB 中。

#### **下载** **Telegraf**

可以使用下面的命令下载 telegraf，也可以在本课程的配套资料中获取（关注尚硅谷微信公众号，回复“大数据”）。

```
wget https://dl.influxdata.com/telegraf/releases/telegraf-1.23.4_linux_amd64.tar.gz
```

#### 解压压缩包

将 telegraf 解压到目标路径。

```sh
tar -zxvf telegraf-1.23.4_linux_amd64.tar.gz -C /opt/module/
```

#### 创建一个新的 Bucket

回到 Web UI 界面

（1）点击左侧工具栏中的 Buckets 按钮

（2）点击右侧蓝色的 CREATE BUCKET 按钮

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232129254.png" alt="image-20230423212937178" style="zoom:80%;" />

（3）创建一个名为 example02 的 buckets，因为是演示，所以这里将过期时间设为 1小时。设置好后点击 CREATE

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232129886.png" alt="image-20230423212955848" style="zoom:80%;" />

（4）如果出现相应的 example02 的卡片，说明存储桶已经创建成功。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232130285.png" alt="image-20230423213013249" style="zoom:80%;" />

#### **在** **Web UI** **上创建** **telegraf** **配置文件**

（1）在左侧的工具栏上点击 Telegraf 按钮。

（2）点击右侧蓝色的 CREATE CONFIGURATION 创建 telegraf 配置文件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232130519.png" alt="image-20230423213037466" style="zoom:80%;" />

（3）在 Bucket 栏选择 example02，表示让 telegraf 将抓取到的数据写到 example02 存储桶中，下面的选项卡勾选 System。点击 CONTINUE。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232131020.png" alt="image-20230423213101930" style="zoom:80%;" />

（4）点击 CONTINUE 按钮后，会进入一个配置插件的页面。你可以自己决定是否启用这些插件。这里需要给生成的 Telegraf 配置起一个名字，方便管理。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232131233.png" alt="image-20230423213125170" style="zoom:80%;" />

（5）点击 CREATE AND VERIFY 按钮，这个时候其实 Telegraf 的配置就已经创建好了，你会进入一个 Telegraf 的配置引导界面，如图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232132625.png" alt="image-20230423213232556" style="zoom:80%;" />

#### 声明 Telegraf 环境变量

按照 Web UI 上的建议，首先，你要在部署 Telegraf 的主机上声明一个环境变量叫INFLUX_TOKEN，它是用来赋予 Telegraf 向 InfluxDB 写数据权限的。这里我们就不配环境变量了，请在单一的 shell 会话下完成后面的操作。

所以到你下载好 Telegraf 的机器上，执行下面的命令。（注意！TOKEN 是随机生成的，请按照自己的情况修改命令）

```
export INFLUX_TOKEN=v4TsUzZWtqgot18kt_adS1r-7PTsMIQkbnhEQ7oqLCP2TQ5Q-PcUP6RMyTHLy4IryP1_2rIamNarsNqDc_S_eA==
```

#### **启动** Telegraf

首先 cd 到我们解压的 telegraf 目录。

```
cd /opt/module/telegraf-1.23.4
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232133828.png" alt="image-20230423213340782" style="zoom:80%;" />

telegraf 的可执行文件在 ./usr/bin 目录下。cd 过去。

```
cd ./usr/bin
```

从 Web UI 中复制运行 telegraf 的命令，修改 host 然后执行，老师的 telegraf 和InfluxDB 在同一台机器上，所以可以使用 localhost。最终命令如下。

```sh
telegraf --config :8086/api/v2/telegrafs/09dcf4afcfd90000telegraf 
```

运行效果如下图所示。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232134674.png" alt="image-20230423213428625" style="zoom:80%;" />

#### 验证数据采集结果

（1）点击左侧 按钮进入 Data Explorer 页面。

（2）在左下角第一个选项卡选择 example02，表示要从 example02 这个存储桶中查数据。

（3）点击好第一个选项卡后，会自动弹出第二个选项卡，勾选 cpu。

（4）点击右上方的 SUBMIT 按钮。

（5）如果出现折线图，说明我们成功地使用 Telegraf 把数据导进来了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232134950.png" alt="image-20230423213459825" style="zoom:80%;" />

#### 编写启停脚本

> 后面我们很多时候都要使用 telegraf 抓取的主机监控数据来进行查询演示。为了方便启停，我们编写一个 shell 脚本来管理 telegraf 任务。

（1）首先 cd 到~/bin 路径下，如果~路径下没有 bin，就创建 bin 这个目录。通常，~/bin 是 PATH 环境变量包含的一个目录。

```sh
cd ~
mkdir bin
cd ~/bin
```

（2）到~/bin 路径下创建一个文件 host_tel.sh

```
vim host_tel.sh
```

（3）键入如下内容

```sh
#!/bin/bash
is_exist(){
pid=`ps -ef | grep telegraf | grep -v grep | awk '{print $2}'`
# 如果不存在返回 1，存在返回 0
if [ -z "${pid}" ]; then
return 1
else
return 0
fi
}
stop(){
is_exist
if [ $? -eq "0" ]; then
kill ${pid}
if [ $? -eq "0" ]; then
echo "进程号:${pid},弄死你"
else
echo "进程号:${pid},没弄死"
fi
else
echo "本来没有 telegraf 进程"
fi
}
start(){
is_exist
if [ $? -eq "0" ]; then
echo "跑着呢，pid 是${pid}"
else
export INFLUX_TOKEN=v4TsUzZWtqgot18kt_adS1r-
7PTsMIQkbnhEQ7oqLCP2TQ5Q-PcUP6RMyTHLy4IryP1_2rIamNarsNqDc_S_eA==
/opt/module/telegraf-1.23.4/usr/bin/telegraf --config 
:8086/api/v2/telegrafs/09dcf4afcfd90000
fi
}
status(){
is_exist
if [ $? -eq "0" ]; then
echo "telegraf 跑着呢"
else
echo "telegraf 没有跑"
fi
}
usage(){
echo "哦！请你 start 或 stop 或 status"
exit 1
}
case "$1" in
"start")
start
;;
"stop")
stop
;;
"status")
status
;;
*)
usage
;;
esac 最后
```

（4）最后给这个脚本加上一个执行权限，你可以执行下面的代码。

```
chmod 755 ./host_tel.sh
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232137913.png" alt="image-20230423213704871" style="zoom:80%;" />

> 最终需要注意。InfluxDB 只是帮你管理了一下 Telegraf 的配置文件。InfluxDB 并不能管理 Telegraf 的启停和运行状态。如何运行 Telegraf 还是需要开发者手动或者编写脚本来维护的。

### 管理抓取任务

#### 什么是抓取任务

> 抓取任务就是你给定一个 URL，InfluxDB 每隔一段时间去访问这个链接，把访问到的数据入库。在 InfluxDB 1.x 的时候，类似的任务只能由 Telegraf 来实现。**在 InfluxDB 2.x 中，内置了抓取功能（但是定制性上不如 Telegraf，比如轮询间隔只能是 10 秒）**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232138785.png" alt="image-20230423213813735" style="zoom:80%;" />

另外，目标 URL 暴露出来的数据格式必须得是 Prometheus 数据格式。关于Prometheus 数据格式的详细介绍同学们可以参考本文档的附录 3

#### InfluxDB 自身暴露的监控接口

你可以访问 :8086/metrics 来查看 InfluxDB 暴露出来的性能数据。这里面有，InfluxDB 的 GC 情况

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232139872.png" alt="image-20230423213917808" style="zoom:80%;" />

以及各个 API 的使用情况，如图所示，说的是各个 API 被谁请求过多少次。

![image-20230423213934473](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232139575.png)

### 示例3：让InfluxDB主动拉取数据

#### 创建一个存储桶

如图所示，我们创建了一个名为 example03 的存储桶。数据的过期时间设为 1 小时。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232140066.png" alt="image-20230423214037022" style="zoom:80%;" />

#### 创建抓取任务

（1）进入抓取任务的管理页面

（2）点击 CREATE SCRAPER 按钮，创建抓取任务。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232141635.png" alt="image-20230423214101584" style="zoom:80%;" />

（3）在对话框上，给抓取任务起一个名字，此处命名为 example03_scraper

（4）右方的下拉框上，选择我们刚才创建的存储桶，example03。

（5）最下方设置一下目标路径，最后点击 CREATE

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232141163.png" alt="image-20230423214129096" style="zoom:67%;" />

（6）如果页面上出现新的卡片，说明配置成功。接下来去看一下数据有没有进来。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232141968.png" alt="image-20230423214147928" style="zoom:80%;" />

#### 验证抓取结果

（1）点击左侧的按钮，打开 Data Explorer

（2）在左下角第一个卡片选择要从哪个存储桶抽取数据，本例对应的是 example03

（3）第一个卡片选择好后，会自动弹出第二个卡片，你可以选择任意一个指标名称。

（4）点击右侧的 SUBMIT 按钮，提交查询。

（5）如果折线图成功加载，说明有数据了，抓取成功！

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232142846.png" alt="image-20230423214220717" style="zoom:80%;" />

#### 补充

1）InfluxDB的监控数据默认会被抓取到初始化的存储桶中抓取任务管理面板上，我们发现自己还没创建什么东西呢，就有一个抓取任务。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232143025.png" alt="image-20230423214259976" style="zoom:80%;" />

> 这个抓取任务是 InfluxDB 自动为我们创建的，它会把我们刚才访问/metrics 拿到的数据写到 test_init 这个存储桶中去，而 test_init 这个存储桶是我们首次登录的时候为了初始化而创建的。所以大家要知道 test_init 中的一些监控数据是怎么产生的。

**2）** **InfluxDB** **的抓取任务都是** **10** **秒一次，无法自定义设置**至少截至目前（2.4 版本），用户无法去自定义抓取间隔。InfluxDB 会每隔 10 秒一次去抓取数据，这一点需要注意。

### 管理 API Token

点击左侧的 API Tokens 按钮，进入 API Token 的管理页面。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232144457.png" alt="image-20230423214410390" style="zoom:80%;" />

#### API Token 是干什么用的

> 简单来说，influxdb 会向外暴露一套 HTTP API。我们后面要学的命令行工具什么的，其实都是封装的对 influxdb 的 http 请求。所以，在 InfluxDB 中，对权限的管理主要就体现在 API 的 Tokens 上。客户端会将 token 放到 http 的请求头上，influxdb 服务端就根据客户端发来的请求头部的 token，来判断你能不能对某个存储桶读写，能不能删除存储桶，创建仪表盘等。

#### **查看** API Token **权限**

截至目前，我们还没有自己手动创建过 API Token。但是可以看到页面上已经有一些Token 了，这些 Token 是由我们之前示例里面的操作自动生成的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232145826.png" alt="image-20230423214503766" style="zoom:67%;" />

#### 了解tony's Token

现在，我们围绕着 InfluxDB 中已有的 Token 来学习相关的知识，我们的 InfluxDB 上现在只有初始化时创建的 tony 账户，在 Token 列表中，我们可以看到有一个名为 tony's Token的 token。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232145243.png" alt="image-20230423214533200" style="zoom:80%;" />

#### **修改** token **的名称**

点击 token 右边的 符号，可以修改 token 名称。

没有客户端会用 token 的名称来调用 token，所以修改 token 名称不会影响已经部署的应用。

InfluxDB 从未要求 token 的名称必须全局唯一，所以名称重复也是可以的。如图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232146374.png" alt="image-20230423214602321" style="zoom:67%;" />

 **token** **可以临时关停、也可以删除**

正如你说看到，token 卡片下面的 Active 按钮是一个开关，可以在启用和停用之间进行切换。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232146858.png" alt="image-20230423214623823" style="zoom:80%;" />

同时，你也可以删除 token，但是这可能对你已经部署的应用产生不可挽回的影响。

**3） 查看** **Token** **权限**

点击 token 的名称，可以看到这个 token 具体有哪些权限。这里我们比较两个 token，可以看到 tony' Token 的权限很高

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232146693.png" alt="image-20230423214652632" style="zoom:67%;" />

下面这个 Token 是我们前面示例，生成 Telegraf 配置的时候自动生成的 token。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232147039.png" alt="image-20230423214711000" style="zoom:80%;" />

点开看一下它的权限。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232147460.png" alt="image-20230423214725408" style="zoom:80%;" />

可以看到这个 token 的权限就小得多了，它只能向一个存储桶里写数据，查的权限都没有呢。

#### 创建 API Token

页面的右方有一个 GENERATE API TOKEN。点一下会出来一个下拉菜单，这其实是Web UI 上的权限模板

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232147348.png" alt="image-20230423214755295" style="zoom:80%;" />

在 Web UI 上，有两种类型的模板让你可以快速创建 token。

Read/Write API Token 仅读写存储桶的 Token创建 Token 时还可以限定这个 Token 能操作哪些存储桶。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232148112.png" alt="image-20230423214820048" style="zoom:80%;" />

All Access API Token 生成带所有权限的 Token

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304232149126.png" alt="image-20230423214903071" style="zoom:80%;" />

> 注意！InfluxDB 的 Token 是可以进行更细的管理的，Web UI 上给的只是生成 Token 的模板，准备了用户的常用需求，但不代表它的全部功能。

## 查询工具

关于 InfluxDB 的查询，需要用户掌握一门叫 FLUX 的语言。本节暂时不讲解 FLUX 语言的知识，而是先了解 InfluxDB 重要的两个开发工具——Data Explorer 和 Notebook

### Data Explorer

#### 什么是Data Explorer

> explorer，探险家、探索者的意思。所以正如其字面意思，你可以使用 Data Explorer 探索数据，理解数据。说白了，就是你可以尝试性地写写 FLUX 查询语言（InfluxDB 独创的一门独立查询语言，课程后面会讲解），看一下数据的效果。开发过程中，你可以将它作为一个 FLUX 语言的 IDE。但是，目前我们不会向大家讲解 FLUX 语言。后面会这门语言起一个专门的章节。

#### **Data Explorer** **的页面**

点击左边的 图标，进入 Data Explorer。我们可以将 Data Explorer 的界面简单分为两个区域，上半部分为**数据预览区**，下半部分为**查询编辑区。**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241440265.png" alt="image-20230424144053162" style="zoom:80%;" />

#### 查询编辑区

查询编辑区为你提供了两种查询工具，一个是查询构造器，一个是 FLUX 脚本编辑器。

**（1）查询构造器**

> 你一进入 Data Explorer 页面，默认会打开查询构造器。使用查询构造器，你可以通过点按的方式完成查询。它背后的原理其实是根据你的设置，自动生成一条 FLUX 语句，提交给数据库完成查询。

> 能够出现查询构造器这种东西，说明时序数据的查询之间遵循着某种规律。不同业务之间的查询步骤可能高度相似

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241442897.png" alt="image-20230424144211833" style="zoom:80%;" />

如上图，这是查询构造器的极简介绍。在后面的示例中，我们会详细讲解它的使用

**（2）FLUX脚本编辑器**

你可以手动将查询构造器切换为 **FLUX** **脚本编辑器**。然后愉快地编写 FLUX 脚本，实现各种奇葩查询。编辑器十分友好，还带自动提示和函数文档。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241442888.png" alt="image-20230424144244805" style="zoom:80%;" />

#### 数据预览区

数据预览区可以将你的数据展示出来。下图是一个效果图。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241443858.png" alt="image-20230424144316764" style="zoom:80%;" />

默认情况下，数据预览区会将你的数据展示为一个折线图。不过除此之外，你还可以让数据展示为散点图、饼图或者查看原始数据等等。

#### **其他功能**

除了查询和展示数据的功能外。Data Explorer 还有一些拓展功能

**1） 将数据导出为** **CSV**

在执行查询之后，DataExplorer 允许你快速地将数据导出为一个 CSV 文件。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241443128.png" alt="image-20230424144352075" style="zoom:80%;" />

**2） 将当前查询和可视化效果保存为仪表盘的一个单元**

你可以将当前的查询逻辑和图形展示保存为某个仪表盘的一部分。这个功能需要在查询逻辑已经实现的前提下，点击右上角的 SAVE AS 触达。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241444881.png" alt="image-20230424144412820" style="zoom:80%;" />

**3） 创建定时任务**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241444768.png" alt="image-20230424144438701" style="zoom:67%;" />

> Data Explorer 中的查询逻辑可以保存为一个定时任务，也就是 TASK。这里提前说一下 InfluxDB 中的 TASK 是什么。TASK 其实是一个定时执行的 FLUX 语言写的脚本。因为FLUX 是一个脚本语言，所以它其实有一定的 IO 能力。可以使用 http 与外面的系统进行通信，还可以将计算完的数据回写给 InfluxDB。所以通常 TASK 有两种使用场景。

> 数据检查与报警。对查询后的结果进行一下条件判断，如果不合规，就使用 http向外通知报警。
>
> 聚合操作。在 InfluxDB 里开窗完成聚合计算，计算后的数据再写回到 InfluxDB，这样下游 BI（数据看板）可以直接去查询聚合后的数据了，而不是每次都把数据从InfluxDB 里拉出来重新计算。这样可以减少 IO，不过会增加 InfluxDB 的压力。生产环境下需要根据实际情况进行取舍。

**4） 定义全局变量**

在 DataExplorer 里，你可以声明一些全局变量。全局变量的类型可以是 Map（键值对）、CSV 和 FLUX 脚本。这样，将来你可以直接引用这些变量，比如你的数据里有地区编码。你就可以将编码到地区名称的映射保存为一个全局 Map，供以后每次查询时使用。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241445659.png" alt="image-20230424144540579" style="zoom:67%;" />

### 示例4：在Data Explorer进行查询和可视化

#### 打开 Data Explorer

点击左侧的 按钮，进入 Data Explorer 页面。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241446367.png" alt="image-20230424144640277" style="zoom:80%;" />

#### 设置查询条件

我们现在要查询的是 test_init 存储桶下的 go_goroutines 测量，这个测量反应的是我们InfluxDB 进程中的 goroutines（轻量级线程）数量。首先，在左下角的查询构造器的 FROM 选项卡，选择 test_init 存储桶

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241446373.png" alt="image-20230424144659308" style="zoom:80%;" />

接着会弹出一个 Filter 选项卡，默认情况下这里是选择_measurement，此处我们选择go_goroutines。

#### 注意查询时间范围

右上角有一个带时钟符号的下拉菜单，这个菜单可以帮你纵向选择要查询数据的时间范围，通常默认是 1h。如下图

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241447201.png" alt="image-20230424144729147" style="zoom:67%;" />

#### 注意右侧的窗口聚合选项

> 在查询构造器的最右边，有一个开窗聚合选项卡。使用查询构造器进行查询，就必须使用开窗聚合。默认情况下，DataExplorer 会根据你设置的查询时间范围，自动调整窗口大小，此处查询范围 1h 对应窗口大小 10s。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241447399.png" alt="image-20230424144753340" style="zoom:50%;" />

同时，聚合方式默认是平均值。

#### 提交查询

点击右侧的 SUBMIT 按钮可以立刻提交查询。之后，数据展示区会出现相应的折线图。

如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241448179.png" alt="image-20230424144817116" style="zoom:80%;" />

点击 View Raw Data，可以看到原始数据

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241448181.png" alt="image-20230424144832092" style="zoom:80%;" />

#### 查询原理

我们使用查询构造器进行查询，其实是 Web UI 根据我们指定的查询条件生成了一套FLUX 查询脚本。点击 SCRIPT EDITOR 按钮，可以看到查询构造器生成的 FLUX 脚本。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241448055.png" alt="image-20230424144852003" style="zoom:80%;" />

#### 可视化原理

其实默认情况下的可视化，是依据返回数据中的_value 来展示的，但是有些时候，你想查询的数据可能字段名不会被判别为_value。它会安静地躺在原始数据中。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241449908.png" alt="image-20230424144918851" style="zoom:80%;" />

### Notebook

#### 什么是Notebook

> Notebook 是 InfluxDB2.x 推出的功能，交互上模仿了 Jupyter NoteBook。它可以用于开发、文档编写、运行代码和展示结果。你可以将 InfluxDB 笔记本视为按照顺序处理数据的集合。每个步骤都由一个“单元格”表示。一个单元格可以执行查询、可视化、处理或将数据写入存储桶等操作。Notebook 可

以帮你完成下述操作

> 执行 FLUX 代码、可视化数据和添加注释性的片段
>
> 创建报警或者计划任务
>
> 对数据进行降采样或者清洗
>
> 生成要和团队分享的 Runbooks
>
> 将数据回写到存储桶

> Notebook 和 DataExplorer 相比，主要是交互风格上的不同。DataExplorer 倾向于一锤子买卖，而 Notebook 可以将数据展示拆分为一个又一个具体的步骤。另外，NoteBook 可以用来开发告警任务 DataExplorer 则不能。

#### **进入** Notebook **的导航界面**

点击左侧的 按钮，即可进入 Notebook 的导航页面。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241451682.png" alt="image-20230424145117602" style="zoom:80%;" />

导航页面分两个部分：

上面是创建引导，除了创建一个空白的 Notebook，InfluxDB 还为你提供了 3 个模板。分别是 Set an Alert（设置一个报警）、Schedule a Task （调度一个任务）、write a Flux Script（写一个 Flux 脚本）。

下面是 Notebook 列表，过去你创建过的 NoteBook 再这里都会展示出来。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241451148.png" alt="image-20230424145142099" style="zoom:80%;" />

卡片上还有这个 Notebook 对应的创建时间和修改时间。通过卡片你可以对一个Notebook 重命名，可以将它复制和删除

#### 创建一个空白的notebook

想要继续后面的步骤，我们必须先创建一个 Notebook。如下图所示，在页面上方点击New Notebook 按钮即可。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241452363.png" alt="image-20230424145218299" style="zoom:80%;" />

现在，你看到的就是 Notebook 的操作页面了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241452982.png" alt="image-20230424145232908" style="zoom:80%;" />

#### NoteBook 工作流

目前你看到的页面应当是如下图所示的样子。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241452374.png" alt="image-20230424145256315" style="zoom:67%;" />

我们在页面中看到的一个又一个卡片，在 NoteBook 中叫做 Cell。一个 NoteBook 工作流就是多个 Cell 按照先后顺序组合起来的执行流程。这些 Cell 中间随时可以插入别的 Cell，而且 Cell 和 Cell 还可以调换顺序。

按照 Cell 功能，Cell 可以按照下面的方式分类。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241453958.png" alt="image-20230424145326876" style="zoom:80%;" />

> 数据源相关的 Cell、查询构造器、直接编写 FLUX 脚本
>
> 可视化相关的 Cell、 将数据展示为一个 Table、将数据展示为一张图、添加笔记。
>
> 行为 Cell、进行报警、定时任务设定

#### 工作流范式

在 NoteBook 里编写工作流通常是有套路可循的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241454077.png" alt="image-20230424145427004" style="zoom:80%;" />

> 通常一个 notebook 工作流以查询数据开始，后面的 Cell 跟上把数据展示出来，当数据需要进一步修改的时候，可以再加一个 FLUX 脚本 cell，notebook 为我们留了一个接口，通过这种方式，后面的 Flux cell 可以将前面的数据作为数据源进行查询。最终，notebook 工作流可以以任务设置或者报警操作作为整个工作流的终点，当然这不是强制要求。

#### NoteBook 控件

在 notebook 上存在下述几种控件

**1） 时区转换**

右上角有一个 Local 按钮，通过这个按钮，你可以选择将日期时间显示为系统所设时区还是 UTC 时间。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241455956.png" alt="image-20230424145509895" style="zoom:67%;" />

**2） 仅显示可视化**

点击 Presentation 按钮，可以选择是否仅显示数据展示的 cell。如果开启这个选项，那么查询构造器和 FLUX 脚本的 Cell 就会被折叠。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241455917.png" alt="image-20230424145535874" style="zoom:80%;" />

**3） 删除按钮**

点击确定后，可以删除整个 notebook。<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241455625.png" alt="image-20230424145553578" style="zoom:50%;" />



**4） 复制按钮**

右上角的复制按钮可以立刻为当前 NoteBook 创建一个副本<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241456562.png" alt="image-20230424145613522" style="zoom:67%;" />

**5） 运行按钮**

RUN 按钮可以快速地执行 Notebook 中的查询操作并重新渲染其中的可视化 Cell。

 

### 示例5：使用NoteBook查询和可视化数据

#### 使用查询构造器记性查询

默认情况下，你创建的空白 NoteBook，自带 3 个 cell。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241457426.png" alt="image-20230424145722368" style="zoom:67%;" />

第一个 cell，默认是一个查询构造器，相对于 DataExplorer 来说，notebook 的查询构造器不同的地方在于它没有开窗聚合操作。此处，同样还是查询 test_init 中的 go_goroutines 测量。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241457074.png" alt="image-20230424145740011" style="zoom:80%;" />

#### 提交查询

点击 RUN 按钮。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241457810.png" alt="image-20230424145754762" style="zoom:80%;" />

可以看到下面的原始数据和折线图都出现了

![image-20230424145809580](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241458665.png)

#### 添加说明 **cell**

notebook 允许用户在工作流中加入说明性的 cell。我们选择在最前面加一个说明性 cell。首先，点击左侧的紫色＋号。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241458553.png" alt="image-20230424145834483" style="zoom:67%;" />

点击 NOTE 按钮。可以看到，我们已经创建了一个说明 cell。这里面还支持MarkDown 语法，

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241458342.png" alt="image-20230424145853290" style="zoom:80%;" />

现在，我们随便写点东西

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241459072.png" alt="image-20230424145906018" style="zoom:67%;" />

点击右上右上角的 PREVIEW 按钮，markdown 就会被渲染展示。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241459182.png" alt="image-20230424145939115" style="zoom:80%;" />

# FLUX 语法

## 认识FLUX语言

> Flux 是一种函数式的数据脚本语言，它旨在将查询、处理、分析和操作数据统一为一种语法。想要从概念上理解 FLUX，你可以想想水处理的过程。我们从源头把水抽取出来，然后按照我们的用水需求，在管道上进行一系列的处理修改（去除沉积物，净化）等，最终以消耗品的方式输送到我们的目的地（饮水机、灌溉等）。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241500013.png" alt="image-20230424150028888" style="zoom:67%;" />

> 注意：InfluxData 公司对 FLUX 语言构想并不是仅仅让它作为 InfluxDB 的特定查询语言，而是希望它像 SQL 一样，成为一种标准。按照这个计划，FLUX 语言应该具备处理来自不同数据源的数据的能力。

## 最简示例

与处理水一样，使用 FLUX 语言进行查询时会执行以下操作。

（1）从数据源中查询指定数量的数据

（2）根据时间或字段筛选数据

（3）将数据进行处理或者聚合以得到预期结果

（4）返回最终的结果

下面 3 个示例的处理逻辑都是一样的，只不过数据源有所不同，这 3 个示例只是让大家看一下语法，不需要运行。

示例 1：从 InfluxDB 查询数据并聚合

```
from(bucket: "example-bucket")
 |> range(start: -1d)
 |> filter(fn: (r) => r._measurement == "example-measurement")
 |> mean()
|> yield(name: "_results")
```

示例 2：从 CSV 文件查询数据并聚合

```
import "csv"
csv.from(file: "path/to/example/data.csv")
 |> range(start: -1d)
 |> filter(fn: (r) => r._measurement == "example-measurement")
 |> mean()
 |> yield(name: "_results")
```

示例 3：从 PostgreSQL 数据库查询数据并聚合

```
import "sql"
sql.from(
 driverName: "postgres",
 dataSourceName: "postgresql://user:password@localhost",
 query: "SELECT * FROM TestTable",
)
 |> filter(fn: (r) => r.UserID == "123ABC456DEF")
 |> mean(column: "purchase_total")
 |> yield(name: "_results")
```

上面 3 个示例用的函数都是一模一样的，下面来讲解示例中出现的代码：

> from( )函数可以指定数据源。
>
> | > 管道转发符，将一个函数的输出转发给下一个函数。
>
> range( )，fliter( ) 两个函数在根据列的值对数据进行过滤
>
> mean( )函数在计算所剩数据的平均值。
>
> yield( ) 将最终的计算结果返回给用户。

## FLUX是查询语言

> 虽然，FLUX 语言的自我定位一个脚本语言，但是我们必须注意它也是一个查询语言的事实。因此，一个 FLUX 脚本想要成功执行，它就必须返回一个表流。就像是 SQL 语言想要正确执行，它就必须返回一张表。

> 表流是 FLUX 里提出一种数据结构，在后面的课程里我们会表流的概念进行深度的讲解。另外需要注意，我们后面的代码，如果只返回一个单值，比如单个整数或者字符串这种，那就必须把这个值转换成表流才能运行。这个时候必须使用 array.from 函数。

```
from "array
x = 1
array.from(rows: [{"value":x}])
```

array.from 函数的作用就是把 x 这个单值，包装在了一个表流里面返回了。

## 版本对应

> 需要注意，因为 InfluxDB 是一个用 Go 语言编写的数据库，它的整个项目成果就是一个单独的可执行二进制文件，所以 FLUX 语言其实也会被编译到同一个文件里。这意味着InfluxDB 和 FLUX 会有版本绑定的关系。

> 这里，我放了一个链接 https://docs.influxdata.com/flux/v0.x/influxdb-versions/ ，它是官方 FLUX 文档的一部分，这里明确记录了 InfluxDB 版本的 FLUX 语言版本的对应关系。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241504748.png" alt="image-20230424150433664" style="zoom:67%;" />

## 基本语法

### 注释

> 在 FLUX 脚本中，没有多行注释一说，用户只能写单行注释。如果一行以两个斜杠开头，那么这一行中的所有内容会被视为注释。

```
// 这是一行注释。
```

### 变量与复制

使用赋值运算符（=）将表达式的结果赋值变量，最终你可以使用变量名来返回变量的值。

```
s = "foo" // string
i = 1 // integer
f = 2.0 // float (floating point number)
s // Returns foo
i // Returns 1
f // Returns 2.0
```

### 基本表达式

FLUX 支持基本的表达式，比如：

> +数字相加或字符串拼接
>
> -数字减法
>
> *数字相乘
>
> / 数字除法
>
> % 取模

```
1 + 1
// Returns 2
10 * 3
// Returns 30
(12.0 + 18.0) / (2.0 ^ 2.0) + (240.0 % 55.0)
// Returns 27.5
"John " + "Doe " + "is here!"
// Returns John Doe is here!
```

### 谓词表达式

#### 比较运算符

谓词表达式使用比较运算符和逻辑运算符来实现，谓词表达式的最后的返回结果只能为 true 或 false

```
"John" == "John"
// Returns true
41 < 30
// Returns false
"John" == "John" and 41 < 30
// Returns false
"John" == "John" or 41 < 30
// Returns true
```

另外

>  =~可以判断一个字符串时候能被正则表达式匹配上。
>
> !~是=~的反操作，判断一个字符串是不是不能被某个正则表达式匹配。

```
"abcdefg" =~ "abc|bcd"
// Returns true
"abcdefg" !~ "abc|bcd"
// Returns false
```

#### 逻辑运算符

在 FLUX 语言中，表示与逻辑需要使用关键字 and，表示或逻辑需要使用关键字 or。

```
a = true
b = false
x = a and b
// Returns false
y = a or b
// Returns true
```

最后，not 可以用来进行逻辑取反。

```
a = true
b = not a
// Returns false
```

### 控制语句

所谓控制语句是指一个编程语言中用来空值代码执行顺序的语法。比如：

> if else、for while 循环、try catch 异常捕获

不过，在 InfluxDB 中，这些语法统统没有。唯一一个和 if else 比较像的是 FLUX 语言中的条件子句，它和 python 中的条件子句功能一样且语法相似，和 java 语言相比的话它有些像三元表达式。

```
x = 0
y = if x == 0 then "hello" else "world"
```

> 此处，if then else 被我们成为条件子句，你需要先指定一个条件，然后当条件为 true的时候，条件子句会返回 then 后面的内容，也就是"hello"。如果是 flase，那么就会返回else 后面的内容，也就是"world"。

## 数据类型

### 基本数据类型

#### **Boolean** **（布尔型）**

**将数据类型转换为boolean**

使用 bool( )函数可以将下述的 4 个基本数据类型转换为 boolean：

string（字符串）：字符串必须是 "true" 或 "false"

float（浮点数）：值必须是 0.0（

false）或 1.0（true）

int（整数）：值必须是 0（false）或 1（true）

uint（无符号整数）：值必须是 0（false）或 1（true）

```
bool(v: "true")
// Returns true
bool(v: 0.0)
// Returns false
bool(v: 0)
// Returns false
bool(v: uint(v: 1))
// Returns true
```

#### **bytes** （字节）

注意是 bytes（复数）不是 byte，bytes 类型表示一个由字节组成的序列。

**定义** **bytes**

FLUX 没有提供关于 bytes 的语法。可以使用 bytes 函数将字符串转为 bytes。

```
bytes(v:"hello")
// Returns [104 101 108 108 111]
```

注意：只有字符串类型可以转换为 bytes。

**将表示十六进制的字符串转为** **bytes**

（1）引入"contrib/bonitoo-io/hex"包

（2）使用 hex.bytes() 将表示十六进制的字符串转为 bytes

```
import "contrib/bonitoo-io/hex"
hex.bytes(v: "FF5733")
// Returns [255 87 51] (bytes)
```

**使用** **display( )函数获取** **bytes** **的字符串形式**

使用 display( )返回字节的字符串表示形式。bytes 的字符串表示是 0x 开头的十六进制表示。

示例:

```
import "sampledata"
sampledata.string()
|> map(fn: (r) => ({r with _value: display(v: bytes(v: 
r._value))}))
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241511067.png" alt="image-20230424151143004" style="zoom:67%;" />

#### Duration **持续时间**

持续时间提供了纳秒级精度的时间长度。

**持续时间的语法**

⚫ ns：纳秒

⚫ us：微秒

⚫ ms：毫秒

⚫ s ：秒

⚫ m ：分钟

⚫ h ：小时

⚫ d ：天

⚫ w ：周

⚫ mo：日历月

⚫ y ：日历年

```
1ns // 1 纳秒
1us // 1 微妙
1ms // 1 毫秒
1s // 1 秒
1m // 1 分钟
1h // 1 小时
1d // 1 天
1w // 1 星期
1mo // 1 日历月
1y // 1 日历年
3d12h4m25s // 3 天 12 小时 4 分钟又 25 秒
```

注意！持续时间的声明不要包含先导 0，比如：

```
01m // 解析为整数 0 和 1 分钟的持续时间
02h05m //解析为整数 0、2 小时的持续时间，整数 0 和 5 分钟的持续时间。而不是 2小时又 5 分钟
```

**将其他数据类型解释为持续时间**

使用 duration( )函数可以将以下基本数据类型转换为持续时间字符串：将表示持续时间字符串的函数转换为持续时间。

int：将整数先解释为纳秒再转换为持续时间

unit：将整数先解释为纳秒再转换为持续时间。

```
duration(v: "1h30m")
// Returns 1h30m
duration(v: 1000000)
// Returns 1ms
duration(v: uint(v: 3000000000))
// Returns 3s
```

注意！你可以在 FLUX 语言中使用 duration 类型的变量与时间做运算，但是你不能在table 中创建 duration 类型的列

**duration** **的算术运算**

要对 duration 进行加法、减法、乘法或除法操作，需要按下面的步骤来。

（1）使用 int( )或 unit()将持续时间转换为 int 数值

（2）使用算术运算符进行运算

（3）把运算的结果再转换回 Duration 类型

```
duration(v: int(v: 6h4m) + int(v: 22h32s))
// 返回 1d4h4m32s
duration(v: int(v: 22h32s) - int(v: 6h4m))
// 返回 15h56m32s
duration(v: int(v: 32m10s) * 10)
// 返回 5h21m40s
duration(v: int(v: 24h) / 2)
// 返回 12h
```

注意！声明持续时间的时候不要包含前导 0，前面的零会被 FLUX 识别为整数

**时间和持续时间相加运算**

（1）导入 date 包

（2）使用 date.add( )函数将持续时间和时间相加

```
import "date"
date.add(d: 1w, to: 2021-01-01T00:00:00Z)
// 2021-01-01 加上一周
// Returns 2021-01-08T00:00:00.000000000Z
```

**时间和持续时间相减运算**

（1）导入 date 包

（2）使用 date.add( )函数从时间中减去持续时间

```
import "date"
date.sub(d: 1w, from: 2021-01-01T00:00:00Z)
// 2021-01-01 减去一周
// Returns 2020-12-25T00:00:00.000000000Z
```

#### Regular expression 正则表达式

**定义一个正则表达式**

FLUX 语言是 GO 语言实现的，因此使用 GO 的正则表达式语法。正则表达式需要声明在正斜杠之间 / /

**使用正则表达式进行逻辑判断**

使用正则表达式进行逻辑判断，需要使用 =~ 和 != 操作符。=~ 的意思是左值（字符串）

能够被右值匹配，!~表示左值（字符串）不能被右值匹配。

```
"abc" =~ /\w/
// Returns true
"z09se89" =~ /^[a-z0-9]{7}$/
// Returns true
"foo" !~ /^f/
// Returns false
"FOO" =~ /(?i)foo/
// Returns true
```

**将字符串转为正则表达式**

（1）引入 regexp 包

（2）使用 regexp.compile( ) 函数可以将字符串转为正则表达式

```
import "regexp"
regexp.compile(v: "^- [a-z0-9]{7}")
// Returns ^- [a-z0-9]{7} (regexp type)
```

**将匹配的子字符串全部替换**

（1）引入 regexp 包

（2）使用 regexp.replaceAllString( )函数，并提供下列参数：

r：正则表达式

v：要搜索的字符串

t： 一旦匹配，就替换为该字符串

```
import "regexp"
regexp.replaceAllString(r: /a(x*)b/, v: "-ab-axxb-", t: "T")
// Returns "-T-T-"
```

**得到字符串中第一个匹配成功的结果**

（1）导入 regexp 包

（2）使用 regexp.findString( )来返回正则表达式匹配中的第一个字符串，需要传递以下参数：r：正则表达式v：要进行匹配的字符串

```
import "regexp"
regexp.findString(r:"abc|bcd",v:"xxabcwwed")
// Returns "abc"
```

#### String 字符串

**定义一个字符串**

字符串类型表示一个字符序列。字符串是不可改变的，一旦创建就无法修改。字符串是一个由双引号括起来的字符序列，在 FLUX 中，还支持你用\x 作为前缀的十六进制编码来声明字符串。

```
"abc"
"string with double \" quote"
"string with backslash \\"
"日本語"
"\xe6\x97\xa5\xe6\x9c\xac\xe8\xaa\x9e"
```

**将其他基本数据类型转换为字符串**

使用 srting( )函数可以将下述基本类型转换为字符串：

boolean 布尔值

bytes 字节序列

duration 持续时间

float 浮点数

uint 无符号整数

time 时间

```
string(v: 42)
// 返回 "42"
```

**将正则表达式转换为字符串**

因为正则表达式也是一个基本数据类型，所以正则表达式也可以转换为字符串，但是需要借助额外的包。

（1）引入 regexp 包

（2）使用 regexp.compile( )将

#### Time 时间点

**定义一个时间点**

一个 time 类型的变量其实是一个纳秒精度的时间点。示例：时间点必须使用 RFC3339 的时间格式进行声明

```
YYYY-MM-DD
YYYY-MM-DDT00:00:00Z
YYYY-MM-DDT00:00:00.000Z
```

**date** **包**

date 包里的函数主要是用来从 Time 类型的值里提取年月日秒等信息的。比如 date.hour：

```
import "date"
x = 2020-01-01T19:22:31Z
date.hour(t:x)
//Returns 19
```

#### Float 浮点数

**定义一个浮点数**

FLUX 中的浮点数是 64 位的浮点数。一个浮点数包含整数位，小数点，和小数位。

```
0.0
123.4
-123.456
```

**科学计数法**

FLUX 没有直接提供科学计数法语法，但是你可以使用字符换写出一个科学计数法表示的浮点数，再使用 float( )函数将该字符串转换为浮点数。

```
1.23456e+78
// Error: error @1:8-1:9: undefined identifier e
float(v: "1.23456e+78")
// Returns 1.23456e+78 (float)
```

**无限**

FLUX 也没有提供关于无限的语法，定义无限要使用字符串与 float( )函数结合的方式。

```
+Inf
// Error: error @1:2-1:5: undefined identifier Inf
float(v: "+Inf")
// Returns +Inf (float)
```

**Not a Number** **非数字**

FLUX 语言不支持直接从语法上声明 NAN，但是你可以使用字符串与 float( )函数的方法声明一个 NaN 的 float 类型变量。

```
NaN
// Error: error @1:2-1:5: undefined identifier NaN
float(v: "NaN")
// Returns NaN (float)
```

**将其他基本类型转换为** **float**

使用 float 函数可以将基本数据类型转换为 float 类型的值。

string：必须得是一个符合数字格式的字符串或者科学计数法。

bool：true 转换为 1.0，false 转换为 0.0

int（整数）

uint（无符号整数）

```
float(v: "1.23")
// 1.23
float(v: true)
// Returns 1.0
float(v: 123)
// Returns 123.0
```

**对浮点数进行逻辑判断**

使用 FLUX 表达式来比较浮点数。逻辑表达式两侧必须是同一种类型。

```
12345600.0 == float(v: "1.23456e+07")
// Returns true
1.2 > -2.1
// Returns true
```

####  Integer 整数

**定义一个整数**

一个 integer 的变量是一个 64 位有符号的整数。

**类型名称**：int

**最小值：-9223372036854775808**

**最大值：9223372036854775807**

一个整数的声明就是普通的整数写法，前面可以加 - 表示负数。-0 和 0 是等效的。

```
0
2
1254
-1254
```

**将数据类型转换为整数**

使用 int( )函数可以将下述的基本类型转换为整数：

string：字符串必须符合整数格式，由数字[0-9]组成

bool：true 返回 1，0 返回 false

duration：返回持续时间的纳秒数

time：返回时间点对应的 Unix 时间戳纳秒数

float：返回小数点前的整数部分，也就是截断

unit：返回等效于无符号整数的整数，如果超出范围，就会发生整数环绕

```
int(v: "123")
// 123
int(v: true)
// Returns 1
int(v: 1d3h24m)
// Returns 98640000000000
int(v: 2021-01-01T00:00:00Z)
// Returns 1609459200000000000
int(v: 12.54)
// Returns 12
```

你可以在将浮点数转换为整数之前进行舍入操作。当你将浮点数转换为整数时，会进行截断操作。如果你想进行四舍五入，可以使用math 包中的 round( )函数。

**将表示十六进制数字的字符串转换为整数**

将表示十六进制数字的字符串转换为整数，需要。

（1）引入 contrib/bonito-io/hex 包

（2）使用 hex.int( )函数将表示十六进制数字的字符串转换为整数

```
import "contrib/bonitoo-io/hex"
hex.int(v: "e240")
// Returns 123456
```

#### **UIntegers** **无符号整数**

FLUX 语言里不能直接声明无符号整数，但这却是一个 InfluxDB 中具备的类型。在FLUX 语言中，我们需要使用 uint 函数来讲字符串、整数或者其他数据类型转换成无符号整数。

```
uint(v: "123")
// 123
uint(v: true)
// Returns 1
uint(v: 1d3h24m)
// Returns 98640000000000
uint(v: 2021-01-01T00:00:00Z)
// Returns 1609459200000000000
uint(v: 12.54)
// Returns 12
uint(v: -54321)
// Returns 18446744073709497295
```

#### **Null** **空值**

**定义一个** **Null** **值**

FLUX 语言并不能在语法上直接支持声明一个 Null，但是我们可以通过 debug.null 这个函数来声明一个指定类型的空值

```
import "internal/debug"
// Return a null string
debug.null(type: "string")
// Return a null integer
debug.null(type: "int")
// Return a null boolean
debug.null(type: "bool")
```

**定义一个** **null**

截至目前，还无法在 FLUX 语言中手动地声明一个 NULL 值。注意！空字符串不是 null 值

**判断值是否为** **null**

你可以使用 exists（存在）这个关键字来判断目标值是不是非空，如果是空值我们会得到一个 false，如果不是空值我们会得到一个 true。

```
import "array"
import "internal/debug"
x = debug.null(type: "string")
y = exists x
// Returns false
```

**正则表达式类型**

正则表达式在 FLUX 中作为一种数据类型，而且在语法上提供直接的支持，可以在谓词表达式中使用正则表达式。

```
regex = /^foo/
"foo" =~ regex
// Returns true
"bar" =~ regex
// Returns false
```

**display** **函数**

使用 display( )函数可以将任何类型的值输出为相应的字符串类型。

```
x = bytes(v: "foo")
display(v: x)
// Returns "0x666f6f"
```

**FLUX** **类型不代表** **InfluxDB** **类型**

> 需要注意，FLUX 语言里有些基本数据类型比如持续时间(Duration)和正则表达式是不能放在表流里面充当字段类型的。简单来说，Duration 类型和正则表达式类型都是 FLUX语言特有的。有些类型是为了让 FLUX 在编写代码时更加方便，让它能够拥有更多的特性，但这并不代表这些类型能够存储到 InfluxDB 中。

## 复合类型

### Record（记录）

> 一个记录是一堆键值对的集合，其中键必须是字符串，值可以是任意类型，在键上没有空白字符的前提下，键上的双引号可以省略。在语法上，record 需要使用{}声明，键值对之间使用英文逗号（,）分开。另外，一个Record 的内容可以为空，也就是里面没有键值对。

```
{foo: "bar", baz: 123.4, quz: -2}
{"Company Name": "ACME", "Street Address": "123 Main St.", id: 1123445} 
```

**从** **record** **中取值**

**1） 点表示法 取值**

如果 key 中没有空白字符，那么你可以使用 .key 的方式从 record 中取值。

```
c = {name: "John Doe", address: "123 Main St.", id: 1123445}
c.name
// Returns John Doe
c.id
// Returns 1123445
```

**2）中括号方式取值**

可以使用[" "]的方式取值，当 key 中有空白字符的时候，也只能用这种方式来取值。

```
c = {"Company Name": "ACME", "Street Address": "123 Main St.", id: 
1123445}
c["Company Name"]
// Returns ACME
c["id"]
// Returns 1123445
```

**嵌套与链式取值**

Record 类型可以进行嵌套引用。

从嵌套的 Record 中引用值的时候可以采用链式调用的方式。链式调用时，点表示法和中括号还可以混用。

```
customer = 
 {
 name: "John Doe",
 address: {
 street: "123 Main St.",
 city: "Pleasantville",
 state: "New York"
 }
 }
customer.address.street
// Returns 123 Main St.
customer["address"]["city"]
// Returns Pleasantville
customer["address"].state
// Returns New York
```

**record** **的** **key** **是静态的**

record 类型变量中的 key 是静态的，一旦声明，其中的 key 就被定死了。一旦你访问这个 record 中一个没有的 key，就会直接抛出异常。正常的话应该返回 null。

```
o = {foo: "bar", baz: 123.4}
o.key
// Error: type error: record is missing label haha
// 错误：类型错误：record 找不到 haha 这个标签
```

 **操作** **records**

**1） 拓展一个** **record**

使用 with 操作符可以拓展一个 record，当原始的 record 中有这个 key 时，原先 record的值会被覆盖；如果原先的 record 中没有制定的 key，那么会将旧 record 中的所有元素和with 中指定的元素复制到一个新的 record 中。

示例： 覆盖原先的值，并添加一个 key 为 pet，value 为"Spot"的元素。

```
c = {name: "John Doe", id: 1123445}
{c with name: "Xiao Ming", pet: "Spot"}
// Returns {id: 1123445, name: Xiao Ming, pet: Spot}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241537207.png" alt="image-20230424153758119" style="zoom:67%;" />

**列出一个** **record** **中所有的** **keys**

（1）导入 experimental（实验的）包。

（2）使用 expertimental.objectyKeys(o:c)方法来拿到一个 record 的所有 key。

```
import "experimental"
c = {name: "John Doe", id: 1123445}
experimental.objectKeys(o: c)
// Returns [name, id]
```

**比较两个** **record** **是否相等**

可以使用双等号= =来判断两个 record 是否相等。如果两个 record 的每个 key，每个key 对应的 value 和类型都相同，那么两个 record 就相等。

```
{id: 1, msg: "hello"} == {id: 1, msg: "goodbye"}
// Returns false
{foo: 12300.0, bar: 34500.0} == {bar: float(v: "3.45e+04"), foo: 
float(v: "1.23e+04")}
// Returns true
```

**将** **record** **转为字符串**

使用 display( )函数可以将 record 转为字符串。

```
x = {a: 1, b: 2, c: 3}
display(v: x)
// Returns "{a: 1, b: 2, c: 3}"
```

**嵌套** **Record** **的意义**

> 注意，嵌套的 Record 无法放到 FLUX 语言返回的表流中，这个时候会发生类型错误，它会说 Record 类型不能充当某一列的类型。那 FLUX 为什么还支持对 Record 进行嵌套使用呢？

> 其实这是为了一些网络通讯的功能来服务，在 FLUX 语言中我们有一个 http 库。借助这个函数库，我们可以向外发送 http post 请求，而这种时候我们就有可能要发送嵌套的json。细心的同学可能发现，我们的 record 在语法层面上和 json 语法是统一的，而且FLUX 语言提供了一个 json 函数库，借助这个库中的 encode 函数，我们可以轻易地将一个record 转为 json 字符串然后发送出去。

### Array（数组）

**定义一个** **Array**

数据是一个由相同类型的值构成的有序序列。在语法上，数组是用方括号[ ]起来的一堆同类型元素，元素之间用英文逗号( , )分隔，并且类型必须相同。

```
["1st", "2nd", "3rd"]
[1.23, 4.56, 7.89]
[10, 25, -15]
```

**从** **Array** **中取值**

可以使用中括号 [ ] 加索引的方式从数组中取值，数组索引从 0 开始。

```
arr = ["one", "two", "three"]
arr[0]
// Returns one
arr[2]
// Returns two
```

**遍历一个数组**

**检查一个数组中是否包含某元素**

使用 contains( )函数可以检查一个数组中是否包含某个元素。

```
names = ["John", "Jane", "Joe", "Sam"]
contains(value: "Joe", set: names)
// Returns true
```

### Dictionary（字典）

**定义一个字典**

字典和记录很像，但是 key-value 上的要求有所不同。一个字典是一堆键值对的集合，其中所有键的类型必须相同，且所有值的的类型必须相同。在语法上，dictionary 需要使用方括号[ ]声明，键的后面跟冒号（:）键值对之间需要使用英文逗号（ , ）分隔。

```
[0: "Sun", 1: "Mon", 2: "Tue"]
["red": "#FF0000", "green": "#00FF00", "blue": "#0000FF"]
[1.0: {stable: 12, latest: 12}, 1.1: {stable: 3, latest: 15}]
```

**引用字典中的值**

（1）导入 dict 包

（2）使用 dict.get( )并提供下述参数:

**a) dict：**要取值的字典

**b) key：**要用到的 key

**c) default：**默认值，如果对应的 key 不存在就返回该值

```
import "dict"
positions =
 [
 "Manager": "Jane Doe",
 "Asst. Manager": "Jack Smith",
 "Clerk": "John Doe",
 ]
dict.get(dict: positions, key: "Manager", default: "Unknown 
position")
// Returns Jane Doe
dict.get(dict: positions, key: "Teller", default: "Unknown 
position")
// Returns Unknown position
```

**从列表创建字典**

（1）导入 dict 包

（2）使用 dict.fromList( )函数从一个由 records 组成的数组中创建字典。其中，数组中的每个 record 必须是{key:xxx,value:xxx}形式

```
import "dict"
list = [{key: "k1", value: "v1"}, {key: "k2", value: "v2"}]
dict.fromList(pairs: list)
// Returns [k1: v1, k2: v2]
```

**向字典中插入键值对**

（1）导入 dict 包

（2）使用 dict.insert( )函数添加一个新的键值对，如果 key 早就存在，那么就会覆盖这个 key 对应的 value。

```
import "dict"
exampleDict = ["k1": "v1", "k2": "v2"]
dict.insert(dict: exampleDict, key: "k3", value: "v3")
// Returns [k1: v1, k2: v2, k3: v3]
```

**从字典中移除键值对**

（1）引入 dict 包

（2）使用 dict.remove 方法从字典中删除一个键值对

```
import "dict"
exampleDict = ["k1": "v1", "k2": "v2"]
dict.remove(dict: exampleDict, key: "k2")
// Returns [k1: v1]
```

### function（函数）

**声明一个函数**

一个函数是使用一组参数来执行操作的代码块。函数可以是命名的，也可以是匿名的。在小括号( )中声明参数，并使用箭头=>将参数传递到代码块中。

```
square = (n) => n * n
square(n:3)
// Returns 9
```

FLUX 不支持位置参数。调用函数时，必须显示指定参数名称。

**为函数提供默认值**

我们可以为某些函数指定默认值，如果为函数指定了默认值，也就意味着在调用这个函数时，有默认值的函数时非必须

```
chengfa = (a,b=100) => a* b
chengfa(a:3)
// Returns 300
```

## 函数包

Flux 的标准库使用包组织起来的。包将 Flux 的众多函数分门别类，默认情况下加载universe 包，这个包中的函数可以不用 import 直接使用。其他包的函数需要在你的 Flux 脚本中先用 import 语法导入一下。

```
import "array"
import "math"
import "influxdata/influxdb/sample"
```

> 但是，截至目前，虽然你可以自定义函数，但是你无法自定义包。如果希望将自己的自定义函数封装在一个包里以供复用，那就必须从源码上进行修改

## FLUX文档

### 如何查看函数文档

这是 FLUX 语言的文档 https://docs.influxdata.com/flux/v0.x/ ，通常来说我们使用FLUX 的文档主要是用它来查看一些函数怎么用，如图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241545249.png" alt="image-20230424154545119" style="zoom:67%;" />

点击 Standard libaray，就可以看到 FLUX 的所有函数包了。效果如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241546137.png" alt="image-20230424154617058" style="zoom:67%;" />

点击一个包的左侧的+按钮，就可以看到这个包里的所有函数，任意点击其中一个，就可以看到这个函数的详细说明，包括会返回什么，调用的时候需要传递什么参数等等。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241546709.png" alt="image-20230424154644619" style="zoom:67%;" />

再往下拉，你还可以看到每个函数都有很详细的使用示例。代码基本上是可以拿来改改就用的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241547129.png" alt="image-20230424154711019" style="zoom:67%;" />

### 避免使用实验中的函数

另外，需要额外注意有一个函数库的名字叫 experimental，这个单词是实验的意思，也就是在未来的 FLUX 版本中，这个函数有可能会变，参数名可能也不是很确定，甚至这个函数可能会在未来的某个版本被放弃。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241547920.png" alt="image-20230424154754856" style="zoom:80%;" />

如果你有升级的打算，那么 experimental 里面的函数应该敬而远之，否则在未来的某个时间，很有可能会导致重复开发

### 查看函数可以在哪些版本中使用

另外需要注意，每个函数的文档标题正下方都会标记这个函数是从哪个 FLUX 版本开始加入的。比如从下图我们就可以知道 request.do()函数是从 0.173 之后才能用的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241548704.png" alt="image-20230424154855640" style="zoom:80%;" />

下面这张图告诉我们 array.concat()函数从 0.173 版本之后就不能再用了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241549952.png" alt="image-20230424154909881" style="zoom:67%;" />

## FLUX查询InfluxDB

### 基本语法

使用 FLUX 语言查询 InfluxDB，必须以 from -> range 打头。range 必须紧跟在 from 后面，不这么写的话会直接报错。

```
from(bucket: "test_init")
 |> range(start: -1h)
```

### 表、表流以及序列

我们知道 InfluxDB 是使用序列的方式去管理数据的。而 FLUX 语言又企图兼容一些关系型数据库的查询，而关系型数据库里的数据结构就是一个有行有列的 table。因此对于FLUX 语言来说，就需要将序列和表统一成一个东西。

所以 FLUX 引入了表流的概念。简单来说，FLUX 可以一次性查出多个序列，这个时候一个序列对应一张表，而表流

其实就是多张表的集合。同时表流和表的关系其实是全表和子表的关系，子表是全表按照_field，tag_set 和_measurement 进行 group by 之后的结果。在这种情况下，如果调用聚合函数，其实只会在子表中进行聚合。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241550784.png" alt="image-20230424155054704" style="zoom:67%;" />

最后，如果一张表对应的是一个序列了，那么一张表里的一行其实就对应着序列中的一个数据点了。

### filter 维度过滤

使用 filert 函数可以对数据按照_measurement、标签集和字段级进行过滤，后面的课程会给大家讲解 filter 的性能问题。

### 类型转换函数与下划线字段

> Flux 语言中有很多不用指定字段名称的管道函数，比如 toInt()。其实 toInt()这个函数默认要求你的字段中必须要有_value 字段，没有_value 字段的话也会直接报错。其实在我们查询出来的数据中，以下划线开头的字段其实代表了一种约定，就是FLUX 中有很多函数想要正常运行时要依赖于这些下划线打头的字段的。

所以原则上来说，程序员应该遵守这些约定，不要擅自更改下划线开头的字段。

### map 函数

map 函数的作用是遍历表流中的每一条数据。

```
import "array"
array.from(rows: [{"name":"tony"},{"name":"jack"}])
|> map(fn: (r)=> {
return if r["name"] == "tony" then {"_name": "tony 不是
jack"} else {"_name":"jack 不是 tony"}
})
```

这里需要注意，map 函数需要我们传递一个参数 fn，它要求传递一个单个参数输入，且输出必须是 record 的函数，其中输入数据的类型会是 record。

### 自定义管道函数

此处，我们定义一个管道函数，它可以将表流中的_value 字段的值乘上 x 倍。请同学们在接下来的示例中注意声明管道函数时所用的语法。

```
big100 = (table=<-,x) => {
return table
|> map(fn: (r) => ({r with "_value":r["_value"]*x}))
}
```

接下来我们调用刚才声明的函数，最终整个脚本如下:

```
big100 = (table=<-,x) => {
return table
|> map(fn: (r) => ({r with "_value":r["_value"]*x}))
}
from(bucket: "test_init")
|> range(start: -1h)
|> filter(fn: (r) => r["_measurement"] == "go_goroutines")
|> big100(x:100)
```

可以自行运行查看函数效果。

这里需要强调的是，管道函数的第一个参数必须写成 table=<-，它表示通过管道符输

入进来的表流数据，需要注意，table 并不一定写成 table 但是=<-的格式绝对不能变。

### 在文档中区分管道函数和普通函数

再次来到函数文档。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241553239.png" alt="image-20230424155321146" style="zoom:80%;" />

当我们看到一个函数文档，它会有一个区域叫做 Function type Signature（函数签名），它表示着函数接收哪些参数以及会返回什么。最前面的小括号里的内容就是参数列表，如果参数列表的第一个参数是<-tables: stream[A]，那就表示它是一个可以接收表流输入的管道函数。

反之，如果没有<-tables: stream[A]，那么它就是一个普通函数。

### **window** **和** aggregateWindow **函数**

window 函数和 aggregateWindow 函数其实代表着 InfluxDB 中的两种开窗方式，两者不同的地方在于，window 函数会将整个表流重新分组。window 开窗后，是按照序列+窗口的方式对整个表流进行分组。但是 aggregateWindow 函数会保留原来的分组方式，这样一来，使用 aggregateWindow 函数进行开窗后的表流，仍然是按照序列的方式来分组的。

### **yield** **和** **join**

> 当 flux 脚本中出现未被赋值给某个变量的表流时，InfluxDB 执行 FLUX 脚本时会自动帮他们在管道的最后面加上|> yield(name: "\_result")函数，yield 函数其实是指定了我们当前这个表流是整个 FLUX 脚本最后返回的结果，而且这个结果的名字叫"\_result"。当 FLUX脚本中出现多个为赋值给变量的表流时，给多个表流自动补上|>yield(name:"_result")就会出问题了，这是因为当有多个表流后面都有|>yield 时，其实相当于一个 FLUX 脚本会返回多个结果。但是此处要求名称是不能重复的，所以当有多个未赋值的表流时，就必须显示指定 yield(name:"xxx")，而且名称千万不可重复。

> 但是，在一个 FLUX 脚本里同时返回多个结果集并不是推荐的操作，这通常会让程序的逻辑变的很奇怪，我们之所以能在一个 FLUX 脚本里面写多次 from 函数，其实是为了方便我们进行 join 的。

> 再但是，老师并不建议在 FLUX 脚本中使用 join 操作，这必须要谈到 FLUX 脚本的常见使用场景，就是每隔一段时间进行一次查询。如果这个时候，我用一个 from 从 InfluxDB中查询数据，其中有 code=01 等机器编号信息。然后我再用一个 from 去查询 mysql，得到一张机器的属性表。接下来对两张表进行 join，这在逻辑上很合理，但最大的问题就是FLUX 脚本无法实现数据的缓存。如果我这个 FLUX 脚本是每 15 秒执行一次，那就会导致我们需要每 15 秒要去 mysql 上全表扫描一遍机器信息表，效率十分低下。

> 个人建议仅使用 FLUX 进行简单的查询，然后在应用层的程序里进行 join 操作。因此，本课程并不讲解 FLUX 语言的 join 操作。

# InfluxDB HTTP API

InfluxDB 启动后，会向外提供一套 HTTP API。外部程序可以也仅能通过 HTTP API 与InfluxDB 进行通信。我们后面要讲到的 influx 命令行、Web UI 和各编程语言的客户端库，其内部都是封装的对 HTTP API 的调用。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241555720.png" alt="image-20230424155556637" style="zoom:80%;" />

> 所以各种客户端同 InfluxDB 交互时，都离不开 API TOKEN。因为 HTTP 是一种支持官方且简单的协议，这也方便了用户进行二次开发。InfluxDB 提供了丰富的 API 和客户端库，可以随时和你的应用程序集成。你也可以随时使用 curl 和 ApiPost、Postman 这类程序来测试 API 接口。

## 准备 token

> 在你想尝试使用 HTTP API 与 InfluxDB 进行交互时，首先应该用账号和密码登到 Web UI 上选择或创建一个对应的 API TOKEN。课程中，我们使用 tony's Token，这是一个具有全部权限的 API Token，实际开发时应谨慎使用，防止 Token 被劫持出现安全问题。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241557959.png" alt="image-20230424155724870" style="zoom:80%;" />

在后面的操作中，你每次发出 HTTP 请求时都需要在请求头上携带 token。

## 准备接口测试工具

在 shell 中你可以使用 curl 测试接口，不过带图形界面的程序终归是更易用一些。本课程选用 ApiPost 这一专门的接口测试软件进行演示。ApiPost 是一款国产软件，对标的是 google 的 postman，截至视频课录制时，ApiPost 的最新版本是 6，易用性比上一个版本有大幅提升，用起来很顺手。直接访问 ApiPost ：https://www.apipost.cn/

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241558155.png" alt="image-20230424155810985" style="zoom:67%;" />

**准备调试环境**

（1）在左侧的目录栏上有一个文件夹 按钮，点一下，创建一个新的目录。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241558249.png" alt="image-20230424155840161" style="zoom:67%;" />

（2）给目录命名，同时为这个目录添加一个公用 header。这样这个目录下的所有接口都会自动带上这个 header，不需要我们再一个个地手动设置了。我们之前提到过，要想使用 InfluxDB 的 API，请求头上必须要加上 token。所以，我们就把 token 设为公用 header。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241559129.png" alt="image-20230424155906002" style="zoom:67%;" />

## 接口授权

现在我们先来看一下授权是否是成功的。

（1）首先，点击左侧的目录名称，右键会弹出一个菜单栏。点击新建接口

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241600299.png" alt="image-20230424160032236" style="zoom:67%;" />

首先你可以自定义一个接口的名称，然后在URL 栏，填写:8086/api/v2/authorizations 点发送

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241601329.png" alt="image-20230424160107230" style="zoom:80%;" />

（3）接下来我们可以看到页面的下方弹出了返回的数据。这个接口返回的数据我们InfluxDB 上目前所有的 Token 信息，包括他们拥有什么权限。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241601714.png" alt="image-20230424160124632" style="zoom:80%;" />

成功看到数据，说明我们的 Token 是有效的。

（4）最后记得点击保存，或者使用 Ctrl+S 快捷键。这样，我们目录下面才会真正留下一个接口。方便你日后访问。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241601225.png" alt="image-20230424160144159" style="zoom:67%;" />

我们也可以看一下授权失败是什么效果。

（1）在目录上点击右键，再点击编辑目录。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241602639.png" alt="image-20230424160203567" style="zoom:67%;" />

（2）将 Authotization 请求头关掉. 点击右下角的保存

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241602733.png" alt="image-20230424160218649" style="zoom:80%;" />

（3）现在回到我们的接口调试页面上，再次点击发送。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241602712.png" alt="image-20230424160235640" style="zoom:80%;" />

（4）可以看到状态码为 401，而且数据的 json 告诉我们没有授权。

（5）记得回去将目录的公共请求头放开，继续进行后面的操作。

## 登录授权方式

登录授权其实是留给 Web UI 用的，但是你也可以尝试用这种方式获取授权。InfluxDB服务端会判断你的 cookie 是否合法、以及是否过期。符合要求的话就能调用接口实现一系列操作。

进行接下来的操作前，记得关闭目录下的公用请求头。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241603114.png" alt="image-20230424160311015" style="zoom:67%;" />

**创建登录会话**

（1）在 InlfluxDB api v2 目录下创建一个新的接口

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241603395.png" alt="image-20230424160329327" style="zoom:80%;" />

（2）给接口自定义一个名称

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241603940.png" alt="image-20230424160344800" style="zoom:80%;" />

（3）请求的类型选择 POST

（4）填写目标的 URL

（5）配置登录信息

​			a) 在请求连接的下方点击一下“认证”按钮

​			b) 在认证方式上选择 Basic auth 认证

​			c) 在下方的输入框上输入 InfluxDB 的用户名和密码，课程中是 tony, 11111111。

（6）点击发送。

**登录原理**

**1） 什么是** **Basic auth** **认证**

你常见的认证方式可能是将用户名和密码放到 post 请求的请求体中，再发送给服务端进行认证。不过我们刚才并没有在请求体里放用户名和密码，而是配置了一个叫 Basic auth认证的东西。这个功能叫 http 基本认证，是 http 协议的一部分

基本认证的默认实现是：

（1）把用户名和密码用英文冒号拼起来，也就成了 tony:11111111

（2）再将拼起来的字符串用 Base64 算法编码。（tony:11111111 的 Base64 编码为dG9ueToxMTExMTExMQ==）

（3）给编码结果 dG9ueToxMTExMTExMQ==，添加一个前缀 Basic 所以最后的结果就是。Basic dG9ueQ==

（4）把这个字符串放到一个 key 为 authorization 的请求头中，发送给服务端。

**2） 查看请求头**

所以，你可以在页面下方查看这次请求的请求头，如图所示，它就是我们基本认证的结晶。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241605580.png" alt="image-20230424160512497" style="zoom:80%;" />

在众多的编程语言中，base64 算法都会作为标准库的一部分存在。你可以在 python 中验证 tony:11111111 的 base64 编码结果。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241605498.png" alt="image-20230424160539425" style="zoom:80%;" />

**3） 查看响应头**

我们还可以看一下这次请求的响应头，你可以看到响应头上有一个 key 为 set-cookie 的键值对。set-cookie 键其实会向浏览器，或者编程语言中的 Session 对象添加一个全局cookie。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241606797.png" alt="image-20230424160600727" style="zoom:80%;" />

以后每次的请求就会自动携带这个 cookie，以后 InfluxDB 的接口服务就会依据这个cookie 来判断请求方是否有权限进行相关操作。ApiPost 也有记录 cookie 的功能，你可以在ApiPost 的 Cookie 管理器中，查看已经设置的全局 cookie。

**4） 查看** **Cookie** **管理器**

（1）ApiPost 的 Cookie 管理器在页面的最上方。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241606084.png" alt="image-20230424160628983" style="zoom:80%;" />

（2）弹出的窗口就是 Cookie 管理器。下面首先会列出你的域名或者 host，老师这里是 localhost，点一下，可以看到它下面的全部 cookie。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241607629.png" alt="image-20230424160708542" style="zoom:80%;" />

（3）再点一下 influxdb-oss-seesion，就可以看到这个 cookie 的内容可，可以看到它跟刚才响应头的 set-cookie 内容一模一样。

**验证授权效果**

接下来，我们会到之前的列出所有 token 的接口里去，在目录共享请求头关闭的前提下，调用 api。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241607569.png" alt="image-20230424160735479" style="zoom:80%;" />

（1）直接点击发送按钮

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241607465.png" alt="image-20230424160752361" style="zoom:80%;" />

（2）响应码为 200，且成功出现了数据，说明我们现在是有权限的，可以点击下面的请求头按钮，看这次请的请求头

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241608683.png" alt="image-20230424160817600" style="zoom:80%;" />

**关闭全局** **cookie** **再查看效果**

接下来我们关闭全局 cookie 再查看效果。

（1）在 ApiPost 中打开 Cookie 管理器，按图中操作，关闭 Cookie。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241608934.png" alt="image-20230424160841848" style="zoom:80%;" />

（2）再次向 /api/v2/authorizations 发送请求。可以看到我们这次没权限了

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241608451.png" alt="image-20230424160858376" style="zoom:80%;" />

（3）再次查看请求头。这次我们失去了 cookie。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241609210.png" alt="image-20230424160925136" style="zoom:80%;" />

这一节，我们学会了用登录的方式获取授权。但是，大家还要注意两点

> **http 基本认证默认实现的安全问题**：我们前面讲过，http 基本认证其实就是把 tony:11111111 的 Base64 编码放在的请求头上，但是 Base64 只是一种数据的编码方式，它不是加密算法也不是信息摘要算法。这也就是说，一旦我的请求被拦截，那对方就能看到我的用户名和密码，对我实施中间人攻击。

如图所示，Base64 编码的字符串也可以被解码为明文。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241610456.png" alt="image-20230424161031369" style="zoom:80%;" />

> 所以，从安全角度考虑，不应当在开发时将 Web UI 暴露在公网上。而且集成应用时，授权也千万不可以用登录方式，应该全部使用 token。

**Cookie 有过期时间**，当你和别的应用进行集成时，也不应该使用登录的方式，登录授予的 cookie 是有过期

时间的，大概半小时，cookie 就会过期。用户必须重新登录拿到新的 cookie 才能和InfluxDB 继续交互。

**授权的内容就讲到这了。**同学们进行后面操作的时候，记得恢复目录的公用请求头，并关闭 Cookie。这样，我

们就还是使用 token 授权的方式完成后面的一系列操作。

## 接口安全：配置 HTTPS

> HTTP 是一种纯文本通信协议。早期很多互联网协议都是使用明文的方式来传输数据的。这样，最大的问题就是如果我们的网络请求被劫持，那么劫持的一方可以看到我们请求中的所有数据（包括 Token）,这样就算是使用 Token 进行授权比 user:password 安全一些，但泄漏 Token 也会带来很多麻烦事。所以，InfluxDB 官方强烈建议我们开启 HTTPS。

### 使用 openssl 生成证书

下面是官方给出的命令模板。

```
sudo openssl req -x509 -nodes -newkey rsa:2048 \
 -keyout /etc/ssl/influxdb-selfsigned.key \
 -out /etc/ssl/influxdb-selfsigned.crt \
 -days <NUMBER_OF_DAYS>
```

自己跑的时候可以参考做一下调整

**命令解释：**

req -x509，指定生成自签名证书的格式。

 -newkey rsa:2048，生成证书请求或者自签名整数时自动生成密钥，然后生成的密钥名称由 keyout 指定。rsa:2048 意思是产生 rsa 密钥，位数是 2048。

-keyout，指定生成的密钥名称。

-out，证书的保存路径

 -days，证书的有效期限，单位是 day（天）,默认是 365 天。

现在，我们执行下面的命令

```
openssl req -x509 -nodes -newkey rsa:2048 \
 -keyout /opt/module/influxdb2_linux_amd64/selfsigned.key \
 -out /opt/module/influxdb2_linux_amd64/selfsigned.crt \
 -days 60
```

执行这个命令后，会让你输入更多信息。你可以直接全部敲回车，将这些字段留空。不影响生成我们有效的证书文件。

执行完这个命令后，/opt/module/influxdb2_linux_amd/ 目录下会产生两个文件，一个是selfsigned.crt（证书文件）另一个是 selfsigned.key（密钥文件）。而且他们的有效期是 60 天至此，你的密钥文件就成功生成了！

### 确保启动 **influxd** 用户对密钥文件有读取权限

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241619605.png" alt="image-20230424161945525" style="zoom:80%;" />

### **启动** **influxd** **服务时指定证书和密钥路径**

使用 influxd 命令启动 InfluxDB 服务时，记得指定一下整数的密钥的路径。

```
./influxd \
--tls-cert="/opt/module/influxdb2_linux_amd64/selfsigned.crt" \
--tls-key="/opt/module/influxdb2_linux_amd64/selfsigned.key"
```

### **验证** **HTTPS** 协议是否生效

回到我们的 ApiPost6，再次向 http:/localhost:8086/api/v2/authorizations 发送 GET 请求。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241621439.png" alt="image-20230424162138349" style="zoom:67%;" />

可以看到，我们使用 http 的协议头再进行访问，响应的状态码为 400，并提示我们向HTTPS 服务器发送了一个 HTTP 请求。现在我们将 URL 前面的 http 改成 https 再试一下。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241621078.png" alt="image-20230424162155955" style="zoom:67%;" />

如果你也能达到这个效果，说明 influxd 的 ssl/tls 认证已经开启，服务端和客户端传递的将会是加密数据而非明文数据

### 更改已存在的telegraf配置和Scrapers

我们之前在 WebUI 中配置过 Telegraf 配置和指标的抓取任务，我们配的是 http 协议的 URL ，现在需要全部换成 https

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241622090.png" alt="image-20230424162238005" style="zoom:80%;" />

## 其他生产安全考虑

HTPS 是 InfluxDB 开发时，最基础也是最该考虑的安全措施，除此之外 InfluxDB 在设计时还为用户考虑了其他的安全措施，这里给大家简单地介绍一下，不再进行操作演示。

### **IP** 白名单

> 可以参考: https://docs.influxdata.com/influxdb/v2.4/security/enable-hardening/ 这个 IP 白名单并不是限制谁可以访问我的。而是限制，我 InfluxDB 的查询可以访问谁的。因为 FLUX 语言具有发送网络请求的能力，你可以使用 InfluxDB 的相关配置限定，FLUX 脚本可以向哪些地址发送请求。

### 机密管理

> 这一块的内容可以参考：https://docs.influxdata.com/influxdb/v2.4/security/secrets/

> 假如，我们的自己的应用程序和 InfluxDB 集成，而用到的一段 FLUX 脚本刚好需要使用某个第三方服务的用户名和密码（比如查询 mysql）。

```
import "influxdata/influxdb/secrets"
import "sql"
sql.from(
   driverName: "postgres",
   dataSourceName: "postgresql://tony:11111111@localhost",
   query:"SELECT * FROM example-table",
)
```

> 应用和 InfluxDB 服务之间走的也是 HTTP 通信，那么写在脚本中的用户名和密码是有可能泄漏的。这个时候，你可以把用户名和密码用键值的方式放到 InfluxDB 管理起来，然后，你就可以在脚本里用 key 的方式在 InfluxDB 里获取 tony 的用户名和密码了。

```
import "influxdata/influxdb/secrets"
import "sql"
username = secrets.get(key: "POSTGRES_USERNAME")
password = secrets.get(key: "POSTGRES_PASSWORD")
sql.from(
    driverName: "postgres",
    dataSourceName: "mysql://${username}:${password}@localhost",
    query:"SELECT * FROM example-table",
)
```

这样，我们 Mysql 的用户名和密码，就没有在网络上泄漏的风险了。

###  token管理

可以参考：https://docs.influxdata.com/influxdb/v2.4/security/tokens/

我们之前讲过在 Web 上去创建 token。这里再给大家补充一下 Token 的类型。

**操作者** **Token**。操作者令牌有跨越组织的管理权限，它对 InfluxDB OSS 2.x 上的所有组织和资源有完全的读写访问权限。某些操作必须需要操作员权限（比如 查看服务器配置）。操作者 Token 是在 InfluxDB 初始化设置的过程中创建的。要想再创建一个操作者

Token，就必须使用先有的操作者 Token。由于操作者 Token 对 InfluxDB 中所有的组织具有完全的读写访问权限。因此 InfluxDB建议为每个组织创建一个全权限 Token，并用这些 Token 来管理 InfluxDB。这有助于防止组织间不小心误操作对方资源。

**全权限** **Token**。对单个组织中所有资源的完全读取和写入访问权限

**读/写 Token。**对组织中特定的存储桶进行读取和写入。

### 禁用部分开发功能

可以参考：https://docs.influxdata.com/influxdb/v2.4/security/disable-devel/

InfluxDB 的 API 中，有一部分是为了方便外部系统去监控和观测 InfluxDB 的状态和性

能的。如果你觉得这部分可能影响安全，那么你可以随时把它们禁了。

/metrics，上文给大家演示过，这里面有各种监控 InfluxDB 运行的指标

Web UI，用户的图形界面交互。

/debug/pprof，这个接口里面是 Go 语言程序的运行时指标，比如堆内存用了多少，有多少线程数等等。

## API 文档

### 查看 API 文档

可以直接在浏览器上访问 http(s)://localhost:8086/docs ，这样可以直接看到对应当前InfluxDB 版本对应的 API 文档。

另外也可以在 InfluxDB 官网上查看在线文档。https://docs.influxdata.com/influxdb/v2.4/api/ 

### **测试工具与** OpenAPI

如果你访问的是本地部署的 InfluxDB，那么访问 :8086 还能下载相应的OpenAPI 文档。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241627906.png" alt="image-20230424162701822" style="zoom:80%;" />

访问 :8086/doc 页面的顶部有一个 Download 按钮，点一下。浏览器里会说下载了一个 json 文件。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241627561.png" alt="image-20230424162719452" style="zoom:80%;" />

> 可以打开看一下，这其实是一个符合 OpenApi3.0 格式的 API 文档定义文件。现在的ApiPost 和 Postman 对这一格式都能自动生成接口测试。此处我们拿 postman 作为演示。

## Postman 快速生成测试项目

**使用** **postman** **导入** **openapi**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241628960.png" alt="image-20230424162806884" style="zoom:80%;" />

在 postman 的左侧目录上方，有一个 import 按钮，点一下，会弹出一个对话框。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241628790.png" alt="image-20230424162828697" style="zoom:80%;" />

可以看到，这里他说支持上传 OpenApi 格式的文件。点击 Upload Files 按钮，选择刚才下载的 swagger(2).json。最后点击右下角的 Import 按钮。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241628581.png" alt="image-20230424162844495" style="zoom:80%;" />

**查看导入效果**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241629076.png" alt="image-20230424162859976" style="zoom:80%;" />

可以看到，InfluxDB 中的全部 API 已经导入到 postman 中了。但是这里没有文档中的说明性文字了。找回他们的方法是在 postman 的左边找到 draft，点击一下，再点击右方的Documentation。如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241629116.png" alt="image-20230424162926024" style="zoom:80%;" />

![image-20230424162936632](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241629725.png)

现在，你就可以看到既能阅读，又能立刻进行测试的 API 文档了。



# influx 命令行工具

> 从 InfluxDB 2.1 版本之后，influx 命令行和 InfluxDB 数据库服务程序是分开打包的，所以安装 InfluxDB 并不会附带 influx 命令行工具。用户必须单独安装 influx 命令行工具。influx 命令行工具包含很多管理 influxDB 的命令。包括存储桶、组织、用户、任务等。从 2.1 版本之后，安装 InfluxDB 不会附带 influx 命令行工具，现在 influx 工具和InfluxDB 在源码上也已经分开维护了，下载时需要注意对上版本。

## 开源项目的发行版

这一部分的内容可以详细参考 Gitee 官方文档 https://gitee.com/help/articles/4328#article-header0

所谓发行，就是这个开源项目进行到一定程度，各种特性和功能已经趋于完善和稳定，到了可以出一个阶段性版本的时候了。通常来说，github 或者 gitee 上放的是一个项目的源码，但是源码需要经过编译之后才能运行的，那么当作者觉得自己的项目，目前开发进度差不多，应该没什么坑的时候，他就可以自己创建一个发行版。这个时候，作者需要自己上传一些附件，比如 v1.0.0 的编译后程序，v1.0.0 的文档和源码等。规范的发行信息里面应该还有比如 changelog（修改记录）这些信息，告诉用户，这个版本相比上个版本，增加了哪些新的功能，又修复了哪些 bug。

**如何去找一个项目的发行版**

首先，你可以去访问官网，通常来说一个开源项目通常应该有它自己的官网，在它的官网上，应该可以找到它的历史版本。但是，有些官网就是新版发布了之后就下架旧版的下载资源，比如 InfluxDB 就是这么干的。另外，通常开源项目都会在 github 或者 gitee 上去维护一个版本的时间线。打开你关注的开源项目首页，如图所示是 InfluxDB 的项目首页。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241631110.png" alt="image-20230424163129996" style="zoom:80%;" />

点击右下角的 Release。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241631328.png" alt="image-20230424163146231" style="zoom:80%;" />

可以看到这个框架从盘古开天辟地至今的所有发行版。通常，在一个版本记录的最下方，会有这个版本对应的已编译好的可执行程序和源码。你可以把它下载下来使用。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241632337.png" alt="image-20230424163203208" style="zoom:80%;" />

### **去找** influx **命令行工具的开源项目**

大多数时候，你会在 github 上通过搜索项目名称的方式来从查找你关注的项目。但是如果项目本身的热度不高，那它可能不会出现在搜索结果的第一页里。最后你要向后翻好久才能找到你的项目。当前 InfluxDB 的热度还算行，但是它周围对应的工具热度就不一定高了。这个时候，你可以将目光聚焦于单个公司下的所有项目。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241633699.png" alt="image-20230424163322567" style="zoom:80%;" />

找到 influx-cli 项目，打开之。https://github.com/influxdata/influx-cli

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241633443.png" alt="image-20230424163347327" style="zoom:80%;" />

**下载安装发行版**

点击 Releases 链接，看到最新的版本。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241634569.png" alt="image-20230424163406488" style="zoom:80%;" />

往下看页面，找到 linux-amd64.tar.gz

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241634519.png" alt="image-20230424163422424" style="zoom:80%;" />

下载到 /opt/software/

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241634761.png" alt="image-20230424163436678" style="zoom:80%;" />

解压到 /opt/module/

```
tar -zxvf influxdb2-client-2.4.0-linux-amd64.tar.gz -C /opt/module/
```

## 配置 influx-cli

### 创建配置

influx 命令行工具是你每执行一次操作时，调用一次命令。并不是开启一个持续性的会话。而 influx 其实底层还是封装的对 InfluxDB 的服务进程的 http 请求。也就是它还是需要配置 Token 什么的来获取授权。

所以，为了避免以后每次请求的时候都在命令行里面写一遍 token。我们应该先去搞个配置文件。

使用下面的命令可以创 influx 命令行的配置。

```
./influx config create --config-name influx.conf \
--host-url :8086 \
--org atguigu \
--token 
ZA8uWTSRFflhKhFvNW4TcZwwvd2NHFW1YIVlcj9Am5iJ4ueHawWh49_jszoKybEym
HqgR5mAWg4XMv4tb9TP3w== \
--active
```

这个命令其实会在~/.influxdbv2/目录下创建一个 configs 文件，这个文件中，就是我们命令行中写的各项配置。如图

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241635401.png" alt="image-20230424163550327" style="zoom:80%;" />

**更改配置**

如果你中途配置错误了，再使用上文的命令，它会说这个配置已经存在。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241636555.png" alt="image-20230424163608470" style="zoom:80%;" />

也就是说，在 /home/dengziqi/.influxdbv2/configs 文件中，["name"]配置快不能重复必须全局唯一。这个时候如果你想调整配置，应该把 create 换成 update。也就是

```
./influx config update --config-name influx.conf xxxxxxxx
```

**在多份配置之间切换**

我们现在用下面的命令再创建一个配置，直接复制 influx.conf 中的内容，把名字修改成 influx2.conf

```
./influx config create --config-name influx2.conf \
--host-url :8086 \
--org atguigu \
--token 
ZA8uWTSRFflhKhFvNW4TcZwwvd2NHFW1YIVlcj9Am5iJ4ueHawWh49_jszoKybEym
HqgR5mAWg4XMv4tb9TP3w== \
--active
```

命令成功执行后，再次打开 ~/.influxdbv2/configs 文件。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241636437.png" alt="image-20230424163657343" style="zoom:80%;" />

可以看到 configs 中的文件内容变了，多了一个名为["influx2.conf"]的配置块，而且，旧的["influx.conf"]从 active="true"变成了 previous="true"，同时["influx2.conf"]中有一个active="true" 的键值对。说明，如果现在使用 influx-cli 执行操作，那会直接使用influx2.conf 配置块中的内容。

你还可以使用下面的命令切换当前正在使用的配置。

```
influx config influx.conf
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241637331.png" alt="image-20230424163724254" style="zoom:80%;" />

再次查看 ~/.influxdbv2/configs 文件

```
vim ~/.influxdbv2/configs
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241637166.png" alt="image-20230424163748032" style="zoom:80%;" />

**删除一个配置**

influx2.conf 现在对我们来说是多余的了，现在，我们将它删除掉。

使用下面的命令删除 influx2.conf。

```
./influx config remove influx2.conf
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241638576.png" alt="image-20230424163806494" style="zoom:80%;" />

执行后，再次查看~/.influxdbv2/config 文件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241638991.png" alt="image-20230424163822866" style="zoom:80%;" />

可以看到，["influx2.conf"]消失了。而且，我们的 influx.conf 自动变成了 active=true。

## influx-cli 命令罗列

我们已经知道 influx-cli 背后封装的是对 InfluxDB HTTP API 的请求。那么 influx-cli 有多少功能基本上就取决于它封装了多少命令，本课程不会介绍 influx-cli 的全部功能。通过下表，同学们可以一探 influx-cli 的功能。

详情可以参考：https://docs.influxdata.com/influxdb/v2.4/reference/cli/influx/

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241638412.png" alt="image-20230424163858309" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241639840.png" alt="image-20230424163916733" style="zoom:80%;" />

# JAVA 操作 InfluxDB

InfluxDB 客户端可以参考：https://github.com/influxdata/influxdb-client-java

## 创建 maven 项目

这里我创建了一个名为 java4influx 的 maven 项目

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304241640872.png" alt="image-20230424164008780" style="zoom:80%;" />

### **导入** maven **依赖**

在 pom.xml 里加入如下依赖。

```xml
<dependencies>
    <dependency>
    <groupId>com.influxdb</groupId>
    <artifactId>influxdb-client-java</artifactId>
    <version>6.5.0</version>
    </dependency>
</dependencies>
```





































