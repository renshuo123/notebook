



# 初识Sentinel

## 雪崩问题

### 雪崩问题

> **微服务调用链路中的某个服务故障，引起整个链路中的所有微服务都不可用，这就是雪崩**。

> 微服务中，服务间调用关系错综复杂，一个微服务往往依赖于多个其它微服务。如图，如果服务提供者发生了故障，当前的应用的部分业务因为依赖于服务I，因此也会被阻塞。此时，其它不依赖于服务I的业务似乎不受影响。但是，依赖服务I的业务请求被阻塞，用户不会得到响应，则tomcat的这个线程不会释放，于是越来越多的用户请求到来，越来越多的线程会阻塞：
>

> 服务器支持的线程和并发数有限，请求一直阻塞，会导致服务器资源耗尽，从而导致所有其它服务都不可用，那么当前服务也就不可用了。那么，依赖于当前服务的其它服务随着时间的推移，最终也都会变的不可用，形成级联失败，雪崩就发生了：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900957.png" alt="image-20210715172710340" style="zoom:80%;" />

### 雪崩解决方案

#### 超时处理

> 解决雪崩问题的常见方式有四种：
>

> 超时处理：**设定超时时间，请求超过一定时间没有响应就返回错误信息，不会无休止等待**
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900958.png" alt="image-20210715172820438" style="zoom: 67%;" />

> 只是能缓解雪崩，不能解决雪崩

#### 仓壁模式

> **限定每个业务能使用的线程数，避免耗尽整个tomcat的资源，因此也叫线程隔离**。

> 仓壁模式来源于船舱的设计：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900959.png" alt="image-20210715172946352" style="zoom: 50%;" />

> 船舱都会被隔板分离为多个独立空间，当船体破损时，只会导致部分空间进入，将故障控制在一定范围内，避免整个船体都被淹没。于此类似，我们可以限定每个业务能使用的线程数，避免耗尽整个tomcat的资源，因此也叫线程隔离。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900960.png" alt="image-20210715173215243" style="zoom: 50%;" />

#### 熔断降级

> 断路器模式：由**断路器**统计业务执行的**异常比例**，如果超出阈值则会**熔断**该业务，**拦截访问该业务的一切请求。断路器会统计访问某个服务的请求数量**，异常比例：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900961.png" alt="image-20210715173327075" style="zoom: 50%;" />

> 当发现访问服务D的请求异常比例过高时，认为服务D有导致雪崩的风险，会拦截访问服务D的一切请求，形成熔断：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900962.png" alt="image-20210715173428073" style="zoom: 50%;" />

#### 流量控制

> **流量控制**：**限制业务访问的QPS(每秒处理的请求数)，避免服务因流量的突增而故障**。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900963.png" alt="image-20210715173555158" style="zoom:80%;" />



## 服务保护技术

在SpringCloud当中支持多种服务保护技术：

早期比较流行的是Hystrix框架，但目前国内实用最广泛的还是阿里巴巴的Sentinel框架，这里做下对比：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081723848.png" alt="image-20220808172341760" style="zoom:67%;" />

##  Sentinel特性

> 官网地址：https://sentinelguard.io/zh-cn/index.html

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306102213650.png" alt="image-20230610221310550" style="zoom:80%;" />

> sentinel顾名思义：卫兵；在Redis中叫做**哨兵**，用于监控主从切换，但是在微服务中叫做**流量防卫兵**。

> Sentinel 以流量为切入点，从**流量控制**、**熔断降级**、**系统负载**保护等多个维度保护服务的稳定性。

Sentinel 具有以下特征:

> - **丰富的应用场景**：Sentinel 承接了阿里巴巴**近 10 年的双十一**大促流量的核心场景，例如秒杀（即突发流量控制在系统容量可以承受的范围）、消息削峰填谷、集群流量控制、实时熔断下游应用
> - **完备的实时监控**：Sentinel 同时提供实时的监控功能。您可以在控制台中看到接入应用的单台机器秒级数据，甚至 500 台以下规模的集群的汇总运行情况。
> - **广泛的开源生态**：Sentinel 提供开箱即用的与其它开源框架/库的整合模块，例如与 Spring Cloud、Apache Dubbo、gRPC、Quarkus 的整合。您只需要引入相应的依赖并进行简单的配置即可快速地接入 Sentinel。同时 Sentinel 提供 Java/Go/C++ 等多语言的原生实现。
> - **完善的 SPI 扩展机制**：Sentinel 提供简单易用、完善的 SPI 扩展接口。您可以通过实现扩展接口来快速地定制逻辑。例如定制规则管理、适配动态数据源等。

**Sentinel 的主要特性如下图**：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207101117633.png" alt="image-20220710111737564" style="zoom:67%;" />

**Sentinel 分为两个部分**:

- 核心库（Java 客户端）不依赖任何框架/库，能够运行于所有 Java 运行时环境，同时对 Dubbo / Spring Cloud 等框架也有较好的支持。
- 控制台（Dashboard）基于 Spring Boot 开发，打包后可以直接运行，不需要额外 Tomcat 等应用容器

**总之一句话：sentinel真牛逼，完爆Hystrix.........**



# Sentinel初体验

> sentinel和**nacos**一样，都有一个控制台，但是这里不用自己手动搭建一个微服务，官方已经搭建好了，只需要下载对应得jar包运行即可。下载地址：https://github.com/alibaba/Sentinel/tags
>

## 版本选择

> 这里选择的`spring-cloud-alibaba-dependencies`的版本是`2.2.1.RELEASE`，因此sentinel版本选择`1.7.1`，大家可以根据自己的版本选择对应sentinel的版本。[版本说明](https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E)

> SpringCloud Alibaba和SpringCloud版本对应

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306102229807.png" alt="image-20230610222912713" style="zoom:80%;" />

> SpringCloudAlibaba和Sentinel版本对应

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306102230372.png" alt="image-20230610223033249" style="zoom:80%;" />

> **注意**：一定要按照官方推荐的版本适配，否则出现意想不到的BUG追悔莫及.........

## 安装和启动Sentinel⭐⭐

> sentinel官方提供了UI控制台，方便我们对系统做限流设置。大家可以在[GitHub](https://github.com/alibaba/Sentinel/releases)下载Jar包
>

将jar包放到任意非中文目录，执行命令：

```sh
java -jar sentinel-dashboard-1.8.1.jar
# 如果8080端口被占用，就切换hu
java -jar sentinel-dashboard-1.8.4.jar --server.port=8081
```

> 如果要修改Sentinel的默认端口、账户、密码，可以通过下列配置：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081726672.png" alt="image-20220808172619605" style="zoom:67%;" />

例如，修改端口：

```sh
java -Dserver.port=8090 -jar sentinel-dashboard-1.8.1.jar
```

> 访问:8080页面，就可以看到sentinel的控制台了：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121704300.png" alt="image-20220912170443247" style="zoom:80%;" />

> 需要输入账号和密码，默认都是：sentinel，登录后，发现一片空白，什么都没有：是因为我们还没有与微服务整合。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306102232502.png" alt="image-20230610223218420" style="zoom:80%;" />

### 配置用户名和密码

> 那么问题来了：**默认的用户名和密码在生产环境上肯定不能用，如何修改呢？**从 Sentinel 1.6.0 起sentinel已经支持自定义用户名和密码了，只需要在执行jar命令时指定即可，命令如下：
>

```apl
java -Dsentinel.dashboard.auth.username=admin -Dsentinel.dashboard.auth.password=123 -jar sentinel-dashboard-1.8.5.jar
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121704707.png" alt="image-20220912170408629" style="zoom:80%;" />

用户可以通过如下参数进行配置：

- `-Dsentinel.dashboard.auth.username=sentinel` 用于指定控制台的登录用户名为 `sentinel`；
- `-Dsentinel.dashboard.auth.password=123456` 用于指定控制台的登录密码为 `123456`；如果省略这两个参数，默认用户和密码均为 `sentinel`；
- `-Dserver.servlet.session.timeout=7200` 用于指定 Spring Boot 服务端 session 的过期时间，如 `7200` 表示 7200 秒；`60m` 表示 60 分钟，默认为 30 分钟；

> **注意**：部署多台控制台时，session 默认不会在各实例之间共享，这一块需要自行改造。

### 其他配置参数

除了用户名密码相关的配置，sentinel控制台还提供了其他的可配置选项，如下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202210292104954.png" alt="image-20221029210401871" style="zoom:80%;" />

## 整合微服务

> 我们在order-service中整合sentinel，并连接sentinel的控制台
>
> 项目搭建详见SpringCloud笔记

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306102235412.png" alt="image-20230610223521328" style="zoom:80%;" />

> 1）order-service引入sentinel依赖

```xml
<!--sentinel-->
<dependency>
    <groupId>com.alibaba.cloud</groupId> 
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```

> 2）配置控制台，修改application.yaml文件，添加下面内容：

```yaml
server:
  port: 8088
spring:
  cloud: 
    sentinel:
      transport:
        dashboard: localhost:8080
```

> 3）打开浏览器，访问:8088/order/101，这样才能触发sentinel的监控。

> 然后再访问sentinel的控制台，查看效果：:8080/#/dashboard/metric/orderservice
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121706632.png" alt="image-20220912170621553" style="zoom:80%;" />



# 流量控制

> 雪崩问题虽然有四种方案，但是`限流是避免服务因突发的流量而发生故障`，是对微服务雪崩问题的预防。我们先学习这种模式。
>

## 基本介绍

> **流量控制**（flow control），其原理是监控应用流量的 **QPS** 或**并发线程数**等指标，当达到指定的**阈值**时对流量进行控制，以避免被瞬时的流量高峰冲垮，从而保障应用的**高可用性**。

> **QPS**：每秒请求数，即在不断向服务器发送请求的情况下，服务器每秒能够处理的请求数量。

> **并发线程数**：指的是施压机施加的同时请求的线程数量。

同一个资源可以创建多条限流规则，一条限流规则由以下元素组成：

> - **resource**：资源名，即限流规则的作用对象。
> - **count**：  限流阈值
> - **grade**：限流阈值类型（1：QPS  0：并发线程数），默认值QPS
> - **limitApp**：流控针对的调用来源，若为 `default` 则不区分调用来源，默认值default
> - **strategy**：判断的根据是资源自身**(0)**，还是根据其它关联资源 \**(1)\**，还是根据链路入口**(2)**，默认值根据资源本身。
> - **controlBehavior**：  流控效果（直接拒绝(0) / 排队等待(2) / 预热冷启动(1))，默认值直接拒绝。

以上元素限流元素对应的类是`com.alibaba.csp.sentinel.slots.block.flow.FlowRule`，如下

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207101123885.png" alt="image-20220710112307720" style="zoom:67%;" />

> **注意**：各个元素的取值以及默认值一定要记住，后续配置将会用到。以上几个元素在sentinel控制台对应规则如下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207101123873.png" alt="image-20220710112319799" style="zoom:67%;" />

## 簇点链路

> 簇点链路：就是项目内的调用链路，链路中被监控的每个接口就是一个资源。默认情况下sentinel会监控SpringMVC的每一个端点（Endpoint），**因此SpringMVC的每一个端点（Endpoint）就是调用链路中的一个资源。流控、熔断等都是针对簇点链路中的资源来设置的，因此我们可以点击对应资源后面的按钮来设置规则。**
>

> 当请求进入微服务时，首先会访问DispatcherServlet，然后进入Controller、Service、Mapper，这样的一个调用链就叫做**簇点链路**。簇点链路中被监控的每一个接口就是一个**资源**。
>

> 默认情况下sentinel会监控SpringMVC的每一个端点（Endpoint，也就是controller中的方法），因此SpringMVC的每一个端点（Endpoint）就是调用链路中的一个资源。
>

> 例如，我们刚才访问的order-service中的OrderController中的端点：/order/{orderId}
>

![image-20210715191757319](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900968.png)

> 流控、熔断等都是针对簇点链路中的资源来设置的，因此可以点击对应资源后面的按钮来设置规则：
>

- 流控：`流量控制`
- 降级：`降级熔断`
- 热点：`热点参数限流，是限流的一种`
- 授权：`请求的权限控制`

## 快速入门

> 点击资源/order/{orderId}后面的流控按钮，就可以弹出表单。
>

![image-20210715191757319](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900968.png)

> 表单中可以填写限流规则，如下：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900969.png" alt="image-20210715192010657" style="zoom:80%;" />

> 其义是限制 /order/{orderId}这个资源的单机QPS为1，`即每秒只允许1次请求，超出的请求会被拦截并报错。`
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206181657852.png" alt="image-20220618165741795" style="zoom:67%;" />

## 流控模式

> 在添加限流规则时，点击高级选项，可以选择三种**流控模式**：对应元素`strategy`，分别如下：
>

> - 直接拒绝：`接口达到限流条件时，直接限流`
> - 关联：`当关联的资源达到阈值时，就限流自己`
> - 链路：`只记录指定链路上的流量（指定资源从入口资源进来的流量，如果达到阈值，就可以限流）`

下面来详细介绍下以上三种流控模式。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900977.png" alt="image-20210715201827886" style="zoom:67%;" />

快速入门测试的就是直接模式。

### 直接拒绝

> 顾名思义：默认的流量控制方式，当QPS超过任意规则的阈值后，新的请求就会被立即拒绝，拒绝方式为抛出`FlowException`。上面的几个例子都是配置了直接拒绝这个模式，这里不再详细介绍。
>

### 关联模式

> 关联模式：统计与当前资源相关的另一个资源，触发阈值时，对当前资源限流

> 使用场景：比如用户支付时需要修改订单状态，同时用户要查询订单。查询和修改操作会争抢数据库锁，产生竞争。业务需求是有限支付和更新订单的业务，因此当修改订单业务触发阈值时，需要对查询订单业务限流。**简而言之：A关联B，一旦B达到阈值，则A被限流**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081735216.png" alt="image-20220808173543164" style="zoom:67%;" />

> **配置规则**：`当/write资源访问量触发阈值时，就会对/read资源限流，避免影响/write资源。`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900978.png" alt="image-20210715202540786" style="zoom:67%;" />

> - 在OrderController新建两个端点：/order/query和/order/update，无需实现业务
> - 配置流控规则，**当/order/ update资源被访问的QPS超过5时，对/order/query请求限流**

> 1）在orderController中配置接口

```java
// 定义/order/query端点，模拟订单查询
@GetMapping("/query")
public String queryOrder() {
    return "查询订单成功";
}
// 定义/order/update端点，模拟订单更新
@GetMapping("/update")
public String updateOrder() {
    return "更新订单成功";
}
```

> 2）重启服务，查看sentinel控制台的簇点链路：注意：**要先访问几次，才能看到**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900979.png" alt="image-20210716101805951" style="zoom:80%;" />



> 3）配置流控规则：对哪个端点限流，就点击哪个端点后面的按钮。我们是对订单查询/order/query限流，因此点击它后面的按钮：在表单中填写流控规则：

![image-20210716101934499](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900980.png)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900981.png" alt="image-20210716102103814" style="zoom:80%;" />

> 4）在Jmeter测试，选择《流控模式-关联》：

![image-20210716102416266](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900982.png)

> 可以看到1000个用户，100秒，因此QPS为10，超过了我们设定的阈值：5，查看http请求：
>

![image-20210716102532554](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900983.png)

> 请求的目标是/order/update，这样这个断点就会触发阈值。但限流的目标是/order/query，我们在浏览器访问，可以发现：确实被限流了。
>

![image-20210716102636030](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900984.png)

### 链路模式

> **链路模式**：只针对从指定链路访问到本资源的请求做统计，判断是否超过阈值。例如有两条请求链路：

> - /test1 --> /common
>
> - /test2 --> /common

> 如果只希望统计从/test2进入到/common的请求，而不去管/test1进入common的请求。则这样配置：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900986.png" alt="image-20210716103536346" style="zoom:67%;" />

**实战案例**

> 需求：**有查询订单和创建订单业务，两者都需要查询商品。针对从查询订单进入到查询商品的请求统计，并设置限流**。

> 1. 在OrderService中添加一个queryGoods方法，不用实现业务
>
> 2. 在OrderController中，改造/order/query端点，调用OrderService中的queryGoods方法
>
> 3. 在OrderController中添加一个/order/save的端点，调用OrderService的queryGoods方法
>
> 4. 给queryGoods设置限流规则，从/order/query进入queryGoods的方法限制QPS必须小于2

> 1）添加查询商品方法，在order-service服务中，给OrderService类添加一个queryGoods方法：

```java
public void queryGoods(){
    System.err.println("查询商品");
}
```

> 2）查询订单时，查询商品，在order-service的OrderController中，修改/order/query端点的业务逻辑：

```java
@GetMapping("/query")
public String queryOrder() {
    // 查询商品
    orderService.queryGoods();
    // 查询订单
    System.out.println("查询订单");
    return "查询订单成功";
}
```

> 3）新增订单，查询商品，在order-service的OrderController中，修改/order/save端点，模拟新增订单：

```java
@GetMapping("/save")
public String saveOrder() {
    // 查询商品
    orderService.queryGoods();
    // 查询订单
    System.err.println("新增订单");
    return "新增订单成功";
}
```

> 4）给查询商品添加资源标记⭐默认情况下，OrderService中的方法是不被Sentinel监控的，需要我们自己通过注解来标记要监控的方法。给OrderService的queryGoods方法添加@SentinelResource注解：

```java
@SentinelResource("goods")
public void queryGoods(){
    System.err.println("查询商品");
}
```

> 链路模式中，是对不同来源的两个链路做监控。**但是sentinel默认会给进入SpringMVC的所有请求设置同一个root资源，会导致链路模式失效**。我们需要关闭这种对SpringMVC的资源聚合，修改order-service服务的application.yml文件：
>

```yaml
spring:
  cloud:
    sentinel:
      web-context-unify: false # 关闭context整合
```

> 重启服务，访问/order/query和/order/save，可以查看到sentinel的簇点链路规则中，出现了新的资源：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900987.png" alt="image-20210716105227163" style="zoom: 80%;" />

> 5）添加流控规则，点击goods资源后面的流控按钮(任意点一个就行)，在弹出的表单中填写下面信息：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900988.png" alt="image-20210716105408723" style="zoom:80%;" />

> 只统计从/order/query进入/goods的资源，QPS阈值为2，超出则被限流。
>

> 6）Jmeter测试，选择《流控模式-链路》：

![image-20210716105612312](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900989.png)

> 可以看到这里200个用户，50秒内发完，QPS为4，超过了我们设定的阈值2
>

> 一个http请求是访问/order/save：运行的结果：完全不受影响。
>

![image-20210716105812789](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900990.png)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306111115511.png" alt="image-20230611111508410" style="zoom:80%;" />

> 另一个是访问/order/query：运行结果：每次只有2个通过。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306111117844.png" alt="image-20230611111706743" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306111117444.png" alt="image-20230611111725346" style="zoom:80%;" />

## 流控效果

在流控的高级选项中，还有一个流控效果选项：

![image-20210716110225104](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900994.png)

流控效果是指请求达到流控阈值时应该采取的措施，包括三种：

> - 快速失败：达到阈值后，新的请求会被立即拒绝并抛出FlowException异常。`是默认的处理方式`。
>
> - warm up：预热模式，对超出阈值的请求同样是拒绝并抛出异常。但这种模式阈值会动态变化，从一个较小值逐渐增加到最大阈值。
>
> - 排队等待：让所有的请求按照先后次序排队执行，两个请求的间隔不能小于指定时长

###  快速失败

> 默认的流量控制方式，当QPS超过任意规则的阈值后，新的请求就会被立即拒绝，拒绝方式为抛出`FlowException`。
>

### warm up

> warm up即**预热/冷启动**方式。当系统长期处于低水位的情况下，当流量突然增加时，直接把系统拉升到高水位可能瞬间把系统压垮。通过"冷启动"，让通过的流量**缓慢增加**，在**一定时间内**逐渐增加到**阈值上限**，给冷系统一个**预热**的时间，避免冷系统被压垮。
>

> 例如，我设置QPS的maxThreshold为10，预热时间为5秒，那么初始阈值就是 10 / 3 ，也就是3，然后在5秒后逐渐增长到10.
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900995.png" alt="image-20210716110629796" style="zoom:67%;" />

> **注意**：这一效果只针对QPS流控，并发线程数流控不支持。预热底层是根据**令牌桶**算法实现的，源码对应得类在`com.alibaba.csp.sentinel.slots.block.flow.controller.WarmUpController`

> 算法中有一个**冷却因子**`coldFactor`，默认值是**3**，即请求 QPS 从 **`threshold(阈值) / 3`** 开始，经预热时长逐渐升至设定的 QPS 阈值。比如设定QPS阈值为3，流控效果为warm up，预热时长为5秒，如下

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207101344171.png" alt="image-20220710134431090" style="zoom: 50%;" />

> 这样配置之后有什么效果呢：QPS起初会从(3/3/=1)每秒通过一次请求开始预热直到5秒之后达到每秒通过3次请求。动态效果图如下：
>

<img src="https://mmbiz.qpic.cn/mmbiz_gif/19cc2hfD2rDegdibpfIEibT8H4QLTMvLsrdthkMiaVL4S0RWnLOt5SMA4BzwCQud8YEhibEdYt3nxc9AjHxX8icNJCw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1" alt="图片" style="zoom:67%;" />

> 阈值一般是一个微服务能承担的最大QPS，但是一个服务刚刚启动时，一切资源尚未初始化（**冷启动**），如果直接将QPS跑到最大值，可能导致服务瞬间宕机。
>

> 需求：给/order/{orderId}这个资源设置限流，最大QPS为10，利用warm up效果，预热时长为5秒
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900996.png" alt="image-20210716111012387" style="zoom:67%;" />

> Jmeter测试选择《流控效果，warm up》：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900997.png" alt="image-20210716111136699" style="zoom:67%;" />

> QPS为10.刚刚启动时，大部分请求失败，成功的只有3个，说明QPS被限定在3：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900998.png" alt="image-20210716111303701" style="zoom:67%;" />

> 随着时间推移，成功比例越来越高：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900999.png" alt="image-20210716111404717" style="zoom:67%;" />

> 到Sentinel控制台查看实时监控：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900000.png" alt="image-20210716111526480" style="zoom:67%;" />

> 一段时间后：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900001.png" alt="image-20210716111658541" style="zoom:67%;" />

### 排队等待

> 当请求超过QPS阈值时，快速失败和warm up 会**拒绝新的请求并抛出异常**。而排队等待则是**让所有请求进入一个队列中，然后按照阈值允许的时间间隔依次执行**。后来的请求必须等待前面执行完成，如果请求预期的等待时间超出最大时长，则会被拒绝。`例如：QPS = 5，意味着每200ms处理一个队列中的请求；timeout = 2000，意味着预期等待时长超过2000ms的请求会被拒绝并抛出异常。`
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206181715033.png" alt="image-20220618171506961" style="zoom:80%;" />

> 那什么叫做预期等待时长呢？比如现在一下子来了12 个请求，因为每200ms执行一个请求，那么：

> - 第6个请求的**预期等待时长** =  200 * （6 - 1） = 1000ms
> - 第12个请求的预期等待时长 = 200 * （12-1） = 2200ms，超过2000被拒绝

> 现在，第1秒同时接收到10个请求，但第2秒只有1个请求，此时QPS的曲线这样的：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900002.png" alt="image-20210716113147176" style="zoom: 67%;" />

> 如果使用队列模式做流控，所有进入的请求都要排队，以固定的200ms的间隔执行，QPS会变平滑
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900003.png" alt="image-20210716113426524" style="zoom: 67%;" />

> 平滑的QPS曲线，对于服务器来说是更友好的。匀速排队方式会严格控制请求通过的间隔时间，也即是让请求以均匀的速度通过，对应的是**漏桶算法**。**注意**：这一效果只针对QPS流控，并发线程数流控不支持。
>

> **简单举个栗子**：你去大学食堂吃饭，只有一个阿姨在打饭，那么所有人都要排队打饭，每次只有一个人打到饭，其他人都在排队等待。**不同的是sentinel有个超时等待时间，一旦超过这个预定设置的时间将会被限流。**

> 这种方式适合用于请求以突刺状来到，这个时候我们不希望一下子把所有的请求都通过，这样可能会把系统压垮；同时我们也期待系统以稳定的速度，逐步处理这些请求，以起到“**削峰填谷**”的效果，而不是拒绝所有请求。

> 需求：给/order/{orderId}这个资源设置限流，最大QPS为10，利用排队的流控效果，超时时长设置为5s
>

> 1）添加流控规则

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900004.png" alt="image-20210716114048918" style="zoom:80%;" />

> 2）Jmeter测试，选择《流控效果，队列》：

![image-20210716114243558](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900005.png)

> QPS为15，已经超过了我们设定的10。如果是之前的 快速失败、warmup模式，超出的请求应该会直接报错。但是我们看看队列模式的运行结果：
>

![image-20210716114429361](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900006.png)

> 全部都通过了。再去sentinel查看实时监控的QPS曲线：
>

![image-20210716114522935](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900007.png)

> QPS非常平滑，一致保持在10，但是超出的请求没有被拒绝，而是放入队列。因此**响应时间**（等待时间）会越来越长。当队列满了以后，才会有部分请求失败：
>

![image-20210716114651137](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900008.png)

## 热点参数限流

> **只去限制某个id的访问，比如限制一号商品访问**。之前的限流是统计访问某个资源的所有请求，判断是否超过QPS阈值。而热点参数限流是**分别统计参数值相同的请求**，判断是否超过QPS阈值。

### 全局参数限流

> 例如，一个根据id查询商品的接口：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900009.png" alt="image-20210716115014663" style="zoom: 67%;" />

> 访问/goods/{id}的请求中，id参数值会有变化，热点参数限流会根据参数值分别统计QPS，统计结果：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900010.png" alt="image-20210716115131463" style="zoom:67%;" />

> 当id=1的请求触发阈值被限流时，id值不为1的请求不受影响。配置示例：
>

![image-20210716115232426](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900011.png)

> 代表的含义是：对hot这个资源的0号参数（第一个参数）做统计，每秒**相同参数值**的请求数不能超过5
>

### 热点参数限流

> 刚才的配置中，对查询商品这个接口的所有商品一视同仁，QPS都限定为5.而在实际开发中，可能部分商品是热点商品，例如秒杀商品，我们希望这部分商品的QPS限制与其它商品不一样，高一些。那就需要配置热点参数限流的高级选项了：在新增热点规则的高级选项里面
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900012.png" alt="image-20210716115717523" style="zoom:67%;" />

> 结合上个配置，这里的含义是对0号的long类型参数限流，每秒相同参数的QPS不超过5，有两个例外
>

> - 如果100号商品，每1秒允许的QPS为10
> - 如果101号商品，每1秒允许的QPS为15

### 实战案例

**案例需求**：给/order/{orderId}这个资源添加热点参数限流，规则如下：

> - 默认的热点参数规则是每1秒请求量不超过2
>
>
> - 给102这个参数设置例外：每1秒请求量不超过4
>
>
> - 给103这个参数设置例外：每1秒请求量不超过10

> **注意事项**：热点参数限流对默认的SpringMVC资源无效，需要利用@SentinelResource注解标记资源

#### 1）标记资源

> 给order-service中的OrderController中的/order/{orderId}资源添加注解：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900013.png" alt="image-20210716120033572" style="zoom:80%;" />

#### 2）热点参数限流规则

> 访问该接口，可以看到我们标记的hot资源出现了：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900014.png" alt="image-20210716120208509" style="zoom:80%;" />

> 这里不要点击hot后面的按钮，页面有BUG，点击左侧菜单中**热点规则**菜单：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900015.png" alt="image-20210716120319009" style="zoom:80%;" />

> 点击新增，填写表单：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900016.png" alt="image-20210716120536714" style="zoom:80%;" />

#### 3）Jmeter测试

> 选择《热点参数限流 QPS1》：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900017.png" alt="image-20210716120754527" style="zoom:80%;" />

> 这里发起请求的QPS为5.包含3个http请求：普通参数，QPS阈值为2
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900018.png" alt="image-20210716120840501" style="zoom:80%;" />

运行结果：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900019.png" alt="image-20210716121105567" style="zoom:80%;" />

> 例外项，QPS阈值为4
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900020.png" alt="image-20210716120900365" style="zoom:80%;" />

> 运行结果：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900021.png" alt="image-20210716121201630" style="zoom:80%;" />

> 例外项，QPS阈值为10
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900022.png" alt="image-20210716120919131" style="zoom:80%;" />

> 运行结果：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900023.png" alt="image-20210716121220305" style="zoom:80%;" />

## 系统自适应限流⭐

> 前面热点参数、普通流量限流都是针对的某个接口，这里系统自适应限流针对是整个系统的入口流量，从单台机器的 **load**、**CPU 使用率**、**平均 RT**、**入口 QPS** 和**并发线程数**等几个维度监控应用指标，让系统尽可能跑在最大吞吐量的同时保证系统整体的稳定性。
>

sentinel控制台对应如下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207101405153.png" alt="image-20220710140514076" style="zoom:67%;" />

阈值类型有五种，分别如下：

> - **Load 自适应**（仅对 Linux/Unix-like 机器生效）：系统的 load1 作为启发指标，进行自适应系统保护。当系统 load1 超过设定的启发值，且系统当前的并发线程数超过估算的系统容量时才会触发系统保护（BBR 阶段）。系统容量由系统的 `maxQps * minRt` 估算得出。设定参考值一般是 `CPU cores * 2.5`。
> - **CPU usage**（1.5.0+ 版本）：当系统 CPU 使用率超过阈值即触发系统保护（取值范围 0.0-1.0），比较灵敏。
> - **平均 RT**：当单台机器上所有入口流量的平均 RT 达到阈值即触发系统保护，单位是毫秒。
> - **并发线程数**：当单台机器上所有入口流量的并发线程数达到阈值即触发系统保护。
> - **入口 QPS**：当单台机器上所有入口流量的 QPS 达到阈值即触发系统保护。[官方文档](https://github.com/alibaba/Sentinel/wiki/%E7%B3%BB%E7%BB%9F%E8%87%AA%E9%80%82%E5%BA%94%E9%99%90%E6%B5%81)

系统规则的配置比较简单，这里以入口QPS为例进行演示，为了演示真实情况，清掉所有的限流规则，添加系统规则，如下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207101405930.png" alt="image-20220710140525859" style="zoom: 67%;" />

> 这个QPS系统规则一配置，该微服务中的所有接口都将会被这个规则限制，比如访问：:9009/sentinel/provider/pay，连续点击，如下图：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207101405331.png" alt="image-20220710140537279" style="zoom:67%;" />

> 可以看到已经被限流了，不仅是这个接口，所有接口都会生效。
>

> **注意**：系统规则中的入口QPS这个规则不建议配置，一旦配置上了可能导致整个服务不可用。



# 隔离和降级

## 基本概念

> 限流是一种预防措施，虽然限流可以尽量避免因高并发而引起的服务故障，但服务还会因为其它原因而故障而要将这些故障控制在一定范围，避免雪崩，就要靠**线程隔离**（舱壁模式）和**熔断降级**手段了。
>

> 虽然限流可以尽量避免因高并发而引起的服务故障，但服务还会因为其它原因而故障。而要将这些故障控制在一定范围，避免雪崩，就要靠线程隔离（舱壁模式）和熔断降级手段了。不管是线程隔离还是熔断降级，都是对客户端（调用方）的保护。

> 股票市场的熔断，当价格触发到了熔点之后，会暂停交易一段时间，或者交易可以继续进行，但是报价会限制在一定的范围。电压过高导致保险丝触发熔断保护

> **线程隔离**之前讲到过：调用者在调用服务提供者时，给每个调用的请求分配独立线程池，出现故障时，最多消耗这个线程池内资源，`避免把调用者的所有资源耗尽`。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900960.png" alt="image-20210715173215243" style="zoom: 67%;" />



> **熔断降级**：是在调用方这边加入断路器，统计对服务提供者的调用，如果调用的失败比例过高，则熔断该业务，`不允许访问该服务的提供者了。`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900962.png" alt="image-20210715173428073" style="zoom:67%;" />



> 可以看到，不管是线程隔离还是熔断降级，都是对**客户端**（调用方）的保护。需要在**调用方** 发起远程调用时做线程隔离、或者服务熔断。而我们的微服务远程调用都是基于Feign来完成的，因此我们需要将Feign与Sentinel整合，在Feign里面实现线程隔离和服务熔断。
>

## Feign整合Sentinel

> SpringCloud中，微服务调用都是通过Feign来实现的，因此做客户端保护必须整合Feign和Sentinel。
>

> - 在application.yml中配置：feign.sentienl.enable=true
> - 给FeignClient编写FallbackFactory并注册为Bean
> - 将FallbackFactory配置到FeignClient

> 首先我们需要在OrderService的pom.xml中添加Feign相关依赖：
>

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
<!--引入HttpClient依赖-->
<dependency>
    <groupId>io.github.openfeign</groupId>
    <artifactId>feign-httpclient</artifactId>
 </dependency>
```

> 修改OrderService的application.yml文件，开启Feign的Sentinel功能：在应用启动类上添加@EnableFeignClients启动Feign的功能；
>

```yml
feign:
  httpclient:
    enabled: true # 支持HttpClient的开关
    max-connections: 200 # 最大连接数
    max-connections-per-route: 50 # 单个路径的最大连接数
  sentinel:
    enabled: true # 开启feign对sentinel的支持
```

> **编写失败降级逻辑**业务失败后，不能直接报错，而应该返回用户一个友好提示或者默认结果

> ①方式一：FallbackClass，无法对远程调用的异常做处理
>
> ②方式二：FallbackFactory，可以对远程调用的异常做处理，我们选择这种(还是在order-service)

> **步骤一**：定义类，实现FallbackFactory：

```java
@Slf4j
//UserClient是feign客户端
public class UserClientFallbackFactory implements FallbackFactory<UserClient> {
    @Override
    public UserClient create(Throwable throwable) {
        return new UserClient() {
            @Override
            public User findById(Long id) {
                log.error("查询用户异常", throwable);
                // 返回一个空的用户，即用户都为null
                return new User();
            }
        };
    }
}
```

> **步骤二**：将UserClientFallbackFactory注册为一个Bean：

```java
@Bean
public UserClientFallbackFactory userClientFallbackFactory(){
    return new UserClientFallbackFactory();
}
```

> **步骤三**：UserClient接口中使用UserClientFallbackFactory：

```java
@FeignClient(value = "userservice", fallbackFactory = UserClientFallbackFactory.class)
public interface UserClient {

    @GetMapping("/user/{id}")
    User findById(@PathVariable("id") Long id);
}
```

> 重启后，访问一次订单查询业务，然后查看sentinel控制台，可以看到新的簇点链路：可以对这个客户端进行限流啥的操作
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121811373.png" alt="image-20220912181109295" style="zoom:80%;" />



## 线程隔离（舱壁模式）

### 实现方式

> - 线程池隔离
>
> - 信号量隔离（Sentinel默认采用）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900026.png" alt="image-20210716123036937" style="zoom:67%;" />



> **线程池隔离**：给每个服务调用业务分配一个线程池，利用线程池本身实现隔离效果

> **信号量隔离**：不创建线程池，而是计数器模式，记录业务使用的线程数量，达到信号量上限时，禁止新的请求。两者的优缺点：

> 基于线程池模式，有额外开销，但隔离控制更强

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900027.png" alt="image-20210716123240518" style="zoom:67%;" />



### Sentinel线程隔离

> 在添加限流规则时，可以选择两种阈值类型：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900028.png" alt="image-20210716123411217" style="zoom:80%;" />

> - QPS：就是每秒的请求数，在快速入门中已经演示过
>
> - 线程数：是该资源能使用用的tomcat线程数的最大值。也就是通过限制线程数量，实现**线程隔离**

> 给 order-service服务中的UserClient的查询用户接口设置流控规则，线程数不能超过2。
>

> 1）配置隔离规则，选择feign接口后面的流控按钮：

![image-20210716123831992](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900029.png)

> 填写表单：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900030.png" alt="image-20210716123936844" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121826410.png" alt="image-20220912182607349" style="zoom:80%;" />

> 2）Jmeter测试：选择《阈值类型-线程数<2》：

![image-20210716124229894](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900031.png)

> 一次发生10个请求，有较大概率并发线程数超过2，而超出的请求会走之前定义的失败降级逻辑，返回一个空的用户。查看运行结果：
>

![image-20210716124147820](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900032.png)

> 发现虽然结果都是通过了，不过部分请求得到的响应是降级返回的null信息。
>



## 熔断降级

> 熔断降级是解决雪崩问题的重要手段。思路是由**断路器**统计服务调用的异常比例、慢请求比例，如果超出阈值则会**熔断**该服务。`即拦截访问该服务的一切请求；而当服务恢复时，断路器会放行访问该服务的请求。`
>

> 断路器控制熔断和放行是通过状态机来完成的：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900033.png" alt="image-20210716130958518" style="zoom:67%;" />

状态机包括三个状态：

> - closed：关闭状态，断路器放行所有请求，并开始统计异常比例、慢请求比例。超过阈值则切换到open状态
> - open：打开状态，服务调用被**熔断**，访问被熔断服务的请求会被拒绝，快速失败，直接走降级逻辑。Open状态5秒后会进入half-open状态
> - half-open：半开状态，放行一次请求，根据执行结果来判断接下来的操作。
>   - 请求成功：则切换到closed状态
>   - 请求失败：则切换到open状态

断路器熔断策略有三种：慢调用、异常比例、异常数

### 慢调用

> **慢调用**：业务的响应时长（RT）`大于指定时长的请求`认定为慢调用请求。在指定时间内，如果请求数量超过设定的最小数量，慢调用比例大于设定的阈值，则触发熔断。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900034.png" alt="image-20210716145934347" style="zoom: 80%;" />

> 解读：RT超过500ms的调用是慢调用，统计最近10000ms内的请求，如果请求量超过10次，并且慢调用比例不低于0.5，则触发熔断，熔断时长为5秒。然后进入half-open状态，放行一次请求做测试。
>

> 需求：给 UserClient的查询用户接口设置降级规则，慢调用的RT阈值为50ms，统计时间为1秒，最小请求数量为5，失败阈值比例为0.4，熔断时长为5
>

> 1）设置慢调用，修改user-service中的/user/{id}这个接口的业务。通过休眠模拟一个延迟时间：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900035.png" alt="image-20210716150234787" style="zoom:80%;" />

> 此时，orderId=101的订单，关联的是id为1的用户，调用时长为60ms：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121838345.png" alt="image-20220912183805232" style="zoom:80%;" />

> orderId=102的订单，关联的是id为2的用户，调用时长为非常短；
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121838068.png" alt="image-20220912183828967" style="zoom:80%;" />

> 2）设置熔断规则，下面，给feign接口设置降级规则：超过50ms的请求都会被认为是慢请求

![image-20210716150654094](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900038.png)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121839327.png" alt="image-20220912183957260" style="zoom: 67%;" />



> 3）测试在浏览器访问：:8088/order/101，快速刷新5次，可以发现：

> 这里可以用Jmeter进行测试，自己刷浏览器好像不太能刷出来
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121948872.png" alt="image-20220912194811794" style="zoom:80%;" />

> 触发了熔断，请求时长缩短至5ms，快速失败了，并且走降级逻辑，返回的null
>

### 异常比例、异常数

> 断路器熔断策略有三种：慢调用、异常比例或异常数，**异常比例或异常数**：统计指定时间内的调用，如果调用次数超过指定请求数，并且出现异常的比例达到设定的比例阈值（或超过指定异常数），则触发熔断。
>

> 异常比例：统计最近1000ms内的请求，如果请求量超过10次，并且异常比例不低于0.4，则触发熔断。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900042.png" alt="image-20210716131430682" style="zoom: 80%;" />

> 异常数：统计最近1000ms内的请求，如果请求量超过10次，并且异数不低于2次，则触发熔断。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900043.png" alt="image-20210716131522912" style="zoom: 80%;" />

> 案例-异常比例：需求：给 UserClient的查询用户接口设置降级规则，统计时间为1秒，最小请求数量为5，失败阈值比例为0.4，熔断时长为5s

> 1）设置异常请求，修改user-service中的/user/{id}接口。手动抛出异常，以触发异常比例的熔断：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900044.png" alt="image-20210716151348183" style="zoom: 80%;" />

> 也就是说，id 为 2时，就会触发异常
>

> 2）设置熔断规则，下面，给feign接口设置降级规则：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209122041067.png" alt="image-20220912204149999" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900045.png" alt="image-20210716151538785" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209122041814.png" alt="image-20220912204110667" style="zoom:80%;" />

> 在5次请求中，只要异常比例超过0.4，也就是有2次以上的异常，就会触发熔断。
>

> 3）测试，在浏览器快速访问：:8088/order/102，快速刷新5次，触发熔断：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209122042018.png" alt="image-20220912204241943" style="zoom:80%;" />

> 此时，我们去访问本来应该正常的103：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209122105571.png" alt="image-20220912210523502" style="zoom:80%;" />

# 授权规则

> 授权规则可以对请求方来源做判断和控制。
>

## 授权规则

### 基本规则

授权规则可以对调用方的来源做控制，有白名单和黑名单两种方式。

> - 白名单：来源（origin）**在白名单内的调用者允许访问**
>
> - 黑名单：来源（origin）**在黑名单内的调用者不允许访问**

> 点击左侧菜单的授权，可以看到授权规则：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900049.png" alt="image-20210716152349191" style="zoom: 67%;" />

> 我们允许请求从gateway到order-service，不允许浏览器访问order-service，
>
> 那么白名单中就要填写**网关的来源名称（origin）**。

### 自定义请求头

> Sentinel是通过RequestOriginParser这个接口的parseOrigin来获取请求的来源的。这个方法的作用就是从request对象中，获取请求者的origin值并返回。默认情况下，sentinel不管请求者从哪里来，返回值永远是default，也就是说一切请求的来源都被认为是一样的值default。因此，我们需要自定义这个接口的实现，让**不同的请求，返回不同的origin**。
>

> 在order-service服务中，我们定义一个RequestOriginParser的实现类：我们会尝试从request-header中获取origin值。
>

```java
@Component
public class HeaderOriginParser implements RequestOriginParser {
    @Override
    public String parseOrigin(HttpServletRequest request) {
        // 1.获取请求头，这是自定义的请求头，名字叫origin，任意
        String origin = request.getHeader("origin");
        // 2.非空判断，没有给个默认值blank
        if (StringUtils.isEmpty(origin)) {
            origin = "blank";
        }
        return origin;
    }
}
```

### 网关添加请求头

> 既然获取请求origin的方式是从reques-header中获取origin值，我们必须让**所有从gateway路由到微服务的请求都带上origin头**。只有带上这个origin头，才能正常访问，这样，从gateway路由的所有请求都会带上origin头，值为order-gateway。而从其它地方到达微服务的请求则没有这个头。

> 下面是完整网关模块实现，只需要注意yml文件中的origin请求头配置即可

```xml
<!--nacos服务注册发现依赖-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
<!--网关gateway依赖-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
<!-- 因为SpringCloud20及以上已弃用ribbon，所以要加上loadbalancer -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-loadbalancer</artifactId>
</dependency>
<!-- 加上缓存依赖，不然会进行警告  -->
<dependency>
    <groupId>com.github.ben-manes.caffeine</groupId>
    <artifactId>caffeine</artifactId>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
<!--nacos配置管理依赖-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
```

> 自定义日志

```java
@Slf4j
@Component
@Order(value = Integer.MIN_VALUE)
public class AccessLogGlobalFilter implements GlobalFilter {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        //filter的前置处理
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getPath().pathWithinApplication().value();
        InetSocketAddress remoteAddress = request.getRemoteAddress();
        return chain
                // 继续调用filter
                .filter(exchange)
                // filter的后置处理
                .then(Mono.fromRunnable(() -> {
                    ServerHttpResponse response = exchange.getResponse();
                    HttpStatus statusCode = response.getStatusCode();
                    log.info("请求路径:{},远程IP地址:{},响应码:{}", path, 
                             remoteAddress, statusCode);
                }));
    }
}
```

> 自定义权限校验

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonResponse {
    private String code;
    private String message;
}
```

```java
@Component
public class AuthorizeFilter implements GlobalFilter, Ordered {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // 1.获取请求参数
        ServerHttpRequest request = exchange.getRequest();
        MultiValueMap<String, String> params = request.getQueryParams();
        // 2.获取参数中的 authorization 参数
        String auth = params.getFirst("authorization");
        // 3.判断参数值是否等于 admin
        if ("admin".equals(auth)) {
            // 4.是，放行
            return chain.filter(exchange);
        }
        // 5.否，拦截
        // 5.1.设置状态码
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        // 5.2.拦截请求
        return exchange.getResponse().setComplete();
    }
    @Override
    public int getOrder() {
        return -1;
    }
}
```

yml⭐

```yml
server:
  port: 10010
logging:
  level:
    cn.itcast: debug
  pattern:
    dateformat: MM-dd HH:mm:ss:SSS
spring:
  application:
    name: gateway
  cloud:
    nacos:
      server-addr: localhost:8848 # nacos地址
    gateway:
      routes:
        - id: user-service # 路由标示，必须唯一
          uri: lb://userservice # 路由的目标地址
          predicates: # 路由断言，判断请求是否符合规则
            - Path=/user/** # 路径断言，判断路径是否是以/user开头，如果是则符合
        - id: order-service
          uri: lb://orderservice
          predicates:
            - Path=/order/**
      default-filters:
        - AddRequestHeader=Truth,Itcast is freaking awesome!
        # 只要添加这个请求头即可
        - AddRequestHeader=origin,order-gateway
```

访问：:10010/order/101?authorization=admin

访问：:8088/order/101，让控制台检测到

### 配置授权规则⭐

接下来，我们添加一个授权规则，放行origin值为gateway的请求。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306111300645.png" alt="image-20230611130018555" style="zoom:80%;" />

也可以设置IP

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209122126458.png" alt="image-20220912212639391" style="zoom:80%;" />

### 测试授权

> 现在，我们直接跳过网关，访问order-service服务：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900052.png" alt="image-20210716153348396" style="zoom:80%;" />

> 通过网关访问：访问网关：:10010/order/101?authorization=admin
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209122118940.png" alt="image-20220912211837853" style="zoom:80%;" />



## 自定义异常结果⭐⭐

> 默认情况下，发生限流、降级、授权拦截时，都会抛出异常到调用方。异常结果都是flow limmiting（限流）。这样不够友好，无法得知是限流还是降级还是授权拦截。
>

### 异常类型

而如果要自定义异常时的返回结果，需要实现BlockExceptionHandler接口：

```java
public interface BlockExceptionHandler {
    // 处理请求被限流、降级、授权拦截时抛出的异常：BlockException
    void handle(HttpServletRequest request, HttpServletResponse response,
                BlockException e)
        throws Exception;
}
```

这个方法有三个参数：

> - HttpServletRequest request：request对象
> - HttpServletResponse response：response对象
> - BlockException e：被sentinel拦截时抛出的异常

这里的BlockException包含多个不同的子类：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206181745470.png" alt="image-20220618174550404" style="zoom:67%;" />

### 自定义异常处理

> 下面，我们就在order-service定义一个自定义异常处理类：
>

```java
import com.alibaba.csp.sentinel.adapter.spring.webmvc.callback.BlockExceptionHandler;
import com.alibaba.csp.sentinel.slots.block.BlockException;
import com.alibaba.csp.sentinel.slots.block.authority.AuthorityException;
import com.alibaba.csp.sentinel.slots.block.degrade.DegradeException;
import com.alibaba.csp.sentinel.slots.block.flow.FlowException;
import com.alibaba.csp.sentinel.slots.block.flow.param.ParamFlowException;
import org.springframework.stereotype.Component;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class SentinelExceptionHandler implements BlockExceptionHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       BlockException e) throws Exception {
        String msg = "未知异常";
        int status = 429;

        if (e instanceof FlowException) {
            msg = "请求被限流了";
        } else if (e instanceof ParamFlowException) {
            msg = "请求被热点参数限流";
        } else if (e instanceof DegradeException) {
            msg = "请求被降级了";
        } else if (e instanceof AuthorityException) {
            msg = "没有权限访问";
            status = 401;
        }
        response.setContentType("application/json;charset=utf-8");
        response.setStatus(status);
        response.getWriter().println("{\"msg\": " + msg + ", \"status\": " + status + 
                                     "}");
    }
}
```

> 重启测试，在不同场景下，会返回不同的异常消息.
>

> 限流：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209122130046.png" alt="image-20220912213008986" style="zoom:80%;" />

> 授权拦截时：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209122130523.png" alt="image-20220912213054453" style="zoom: 80%;" />

# 集群流控

## 集群流控介绍

首先一个简单的问题：为什么需要集群流控？单机流控不香吗？原因如下：

> 对于微服务要想保证高可用，必须是集群，假设有100个集群，那么想要设置流控规则，是不是每个微服务都要设置一遍？维护成本太高了

> 单体流控还会造成**流量不均匀**的问题，出现总流控阈值没有达到某些微服务已经被限流了，这个是非常糟糕的问题，因此实际生产中对于集群不推荐单体流控。

> 那么如何解决上述的问题呢？sentinel为我们提供了集群流控的规则。思想很简单就是提供一个专门的server来统计调用的总量，其他的实例都与server保持通信。集群流控可以精确地控制整个集群的**调用总量**，结合**单机限流兜底**，可以更好地发挥流量控制的效果。
>

集群流控中共有两种身份：

> **Token Client**：集群流控客户端，用于向所属 Token Server 通信请求 token。集群限流服务端会返回给客户端结果，决定是否限流。

> **Token Server**：即集群流控服务端，处理来自 Token Client 的请求，根据配置的集群规则判断是否应该发放 token（是否允许通过）。

sentinel的集群限流有两种模式，分别如下：

> - **独立模式（Alone）**：即作为独立的 token server 进程启动，独立部署，隔离性好，但是需要额外的部署操作。独立模式适合作为 Global Rate Limiter 给集群提供流控服务。
> - **嵌入模式（Embedded）**：即作为内置的 token server 与服务在同一进程中启动。在此模式下，集群中各个实例都是对等的，token server 和 client 可以随时进行转变，因此无需单独部署，灵活性比较好。但是隔离性不佳，需要限制 token server 的总 QPS，防止影响应用本身。嵌入模式适合某个应用集群内部的流控。

## 配置测试

> 下面就以嵌入模式为例介绍一下如何配置。直接启动三个集群，端口分别为`8088`、`8089`、`8090`
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209122143061.png" alt="image-20220912214335997" style="zoom:80%;" />

> 启动成功，在sentinel控制台将会看到有三个实例已经被监控了，经过访问三个接口，会出现如下
>

- :8088/order/101
- :8089/order/101
- :8090/order/101

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209122145394.png" alt="image-20220912214550321" style="zoom:80%;" />

> 此时只需要在控制台指定一个服务为token server，其他的为token client，**集群流控->新增token server**，操作如下图：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209122147665.png" alt="image-20220912214713574" style="zoom:80%;" />

> 选取一个作为服务端，另外两个作为客户端，此时就已经配置好了，如下图：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209122148939.png" alt="image-20220912214813854" style="zoom:80%;" />

> 正常选择流量控制
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209122153481.png" alt="image-20220912215322399" style="zoom:80%;" />

> 进入任意节点进行访问测试
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209122153179.png" alt="image-20220912215357109" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209122154160.png" alt="image-20220912215410092" style="zoom:80%;" />



# 规则持久化

> 现在，sentinel的所有规则都是内存存储，重启后所有规则都会丢失。在生产环境下，我们必须确保这些规则的持久化，避免丢失。比如设置了orderservice规则，而该应用重启之后，规则全部消失
>

## 规则管理模式

规则是否能持久化，取决于规则管理模式，sentinel支持三种规则管理模式：

> - 原始模式：Sentinel的默认模式，将规则保存在内存，重启服务会丢失。
> - pull模式
> - push模式

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206181748732.png" alt="image-20220618174848644" style="zoom:80%;" />

### pull模式

> pull模式：控制台将配置的规则推送到Sentinel客户端，而客户端会将配置规则保存在本地文件或数据库中。以后会定时去本地文件或数据库中查询，更新本地规则。时效性差，会导致数据不一致问题
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900057.png" alt="image-20210716154155238" style="zoom:80%;" />



### push模式

> push模式：控制台将配置规则推送到远程配置中心，例如Nacos。Sentinel客户端监听Nacos，获取配置变更的推送消息，完成本地配置更新。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206091900058.png" alt="image-20210716154215456" style="zoom:80%;" />



## 实现Nacos双向持久化⭐

sentinel默认的持久化只能从nacos推送到sentinel控制台，但是实际生产中肯定是双向修改都能推送的，这个如何解决呢？其实sentinel官方文档就有说到解决方法，不过需要**自己修改sentinel控制台的源码**来实现。

这个还是比较复杂的，sentinel只帮我们实现了流控规则的demo，其他的还是要自己修改，这点不太人性化....

在这之前需要自己下载对应版本的sentinel控制台的源码，地址：https://github.com/alibaba/Sentinel/tags

### 修改order-service服务

修改OrderService，让其监听Nacos中的sentinel规则配置。

#### 引入依赖

在order-service中引入sentinel监听nacos的依赖：

```xml
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-datasource-nacos</artifactId>
</dependency>
```

#### 配置nacos地址

在order-service中的application.yml文件配置nacos地址及监听的配置信息：

```yaml
spring:
  cloud:
    sentinel:
      datasource:
        flow:
          nacos:
            server-addr: localhost:8848 # nacos地址
            dataId: orderservice-flow-rules
            groupId: SENTINEL_GROUP
            rule-type: flow # 还可以是：degrade、authority、param-flow
```

### 修改sentinel-dashboard源码

直接Git下来源码：https://github.com/alibaba/Sentinel.git

> SentinelDashboard默认不支持nacos的持久化，需要修改源码。
>

#### 项目结构

然后并用IDEA打开这个项目，结构如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206181705626.png" alt="image-20210618201412878" style="zoom:67%;" />

#### 修改nacos依赖

在sentinel-dashboard源码的pom文件中，nacos的依赖默认的scope是test，只能在测试时使用，这里要去除：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206181705628.png" alt="image-20210618201607831" style="zoom:80%;" />

将sentinel-datasource-nacos依赖的scope去掉：

```xml
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-datasource-nacos</artifactId>
</dependency>
```

#### 添加nacos支持

在sentinel-dashboard的test包下，已经编写了对nacos的支持，我们需要将其拷贝到main下。

![image-20210618201726280](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206181705629.png)



#### 修改nacos地址

然后，还需要修改测试代码中的NacosConfig类：

![image-20210618201912078](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206181705632.png)

修改其中的nacos地址，让其读取application.properties中的配置：

![image-20210618202047575](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206181705634.png)

在sentinel-dashboard的application.properties中添加nacos地址配置：

```properties
nacos.addr=localhost:8848
```

#### 配置nacos数据源

另外，还需要修改com.alibaba.csp.sentinel.dashboard.controller.v2包下的FlowControllerV2类：

![image-20210618202322301](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206181705175.png)

让我们添加的Nacos数据源生效：

![image-20210618202334536](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206181705233.png)

#### 修改前端页面

接下来，还要修改前端页面，添加一个支持nacos的菜单。

修改src/main/webapp/resources/app/scripts/directives/sidebar/目录下的sidebar.html文件：

![image-20210618202433356](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206181705236.png)

将其中的这部分注释打开：

![image-20210618202449881](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206181705238.png)

修改其中的文本：

![image-20210618202501928](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206181705242.png)

#### 重新编译、打包项目

运行IDEA中的maven插件，编译和打包修改好的Sentinel-Dashboard：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206181705250.png" alt="image-20210618202701492" style="zoom:67%;" />

#### 启动

启动方式跟官方一样：

```sh
java -jar sentinel-dashboard.jar
```

如果要修改nacos地址，需要添加参数：

```sh
java -jar -Dnacos.addr=localhost:8848 sentinel-dashboard.jar
```

## 实现Nacos单向持久化⭐

> 默认情况下，当我们在Sentinel控制台中配置规则时，控制台推送规则方式是通过API将规则推送至客户端并直接更新到内存中。一旦我们重启应用，规则将消失。下面我们介绍下如何将配置规则进行持久化，以存储到Nacos为例。

### 添加依赖

先在pom.xml中添加相关依赖：

```xml
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-datasource-nacos</artifactId>
</dependency>
```

### yml配置

修改orderservice的application.yml配置文件，添加Nacos数据源配置：

```yml
cloud:
  sentinel:
    ## nacos持久化配置
    datasource:
      ## 配置流控规则，名字任意
      ds-flow:
        nacos:
          ## nacos的地址
          server-addr: 127.0.0.1:8848
          ## 配置ID
          dataId: ${spring.application.name}-sentinel
          ## 配置分组，默认是DEFAULT_GROUP
          groupId: DEFAULT_GROUP
          ## 配置存储的格式
          data-type: json
          ## rule-type设置对应得规则类型，总共七大类型，在
          # com.alibaba.cloud.sentinel.datasource.RuleType这个枚举类中有体现
          rule-type: flow
      ## 配置降级规则，名字任意
      ds-degrade:
        nacos:
          ## nacos的地址
          server-addr: 127.0.0.1:8848
          ## 配置ID
          dataId: ${spring.application.name}-degrade
          ## 配置分组，默认是DEFAULT_GROUP
          groupId: DEFAULT_GROUP
          ## 配置存储的格式
          data-type: json
          ## rule-type设置对应得规则类型，总共七大类型，在
          # com.alibaba.cloud.sentinel.datasource.RuleType这个枚举类中有体现
          rule-type: degrade
    transport:
      dashboard: localhost:8080 # 显示在sentinel中
```

### Nacos配置规则

在Nacos中添加配置：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209122243538.png" alt="image-20220912224322461" style="zoom:80%;" />

添加配置信息如下：

```js
[
    {
        "resource": "/rateLimit/byUrl",
        "limitApp": "default",
        "grade": 1,
        "count": 1,
        "strategy": 0,
        "controlBehavior": 0,
        "clusterMode": false
    }
]
```

相关参数解释：

- resource：资源名称；
- limitApp：来源应用；
- grade：阈值类型，0表示线程数，1表示QPS；
- count：单机阈值；
- strategy：流控模式，0表示直接，1表示关联，2表示链路；
- controlBehavior：流控效果，0表示快速失败，1表示Warm Up，2表示排队等待；
- clusterMode：是否集群。

### 测试实现

重启orderservice服务，访问测试

发现Sentinel控制台已经有了如下限流规则：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209122247934.png" alt="image-20220912224741860" style="zoom:80%;" />

进行修改nacos中的规则，再次回来看，发现立即改变了

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209122248442.png" alt="image-20220912224827369" style="zoom: 80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209122248234.png" alt="image-20220912224850153" style="zoom:80%;" />

### 规则实现写法⭐⭐

很多人好奇JOSN中的配置到底怎么写？其实很简单，陈某在介绍各种规则的时候都明确告诉你每种规则对应源码中的实现类，比如流控规则对应的类就是`com.alibaba.csp.sentinel.slots.block.flow.FlowRule`，JOSN中各个属性也是来源于这个类。

下面陈某列出各个规则的JSON配置，开发中照着改即可。

#### 1、流控规则

```json
[
  {
    // 资源名
    "resource": "/test",
    // 针对来源，若为 default 则不区分调用来源
    "limitApp": "default",
    // 限流阈值类型(1:QPS;0:并发线程数）
    "grade": 1,
    // 阈值
    "count": 1,
    // 是否是集群模式
    "clusterMode": false,
    // 流控效果(0:快速失败;1:Warm Up(预热模式);2:排队等待)
    "controlBehavior": 0,
    // 流控模式(0:直接；1:关联;2:链路)
    "strategy": 0,
    // 预热时间（秒，预热模式需要此参数）
    "warmUpPeriodSec": 10,
    // 超时时间（排队等待模式需要此参数）
    "maxQueueingTimeMs": 500,
    // 关联资源、入口资源(关联、链路模式)
    "refResource": "rrr"
  }
]
```

#### 2、降级规则

```json
[
  {
   // 资源名
    "resource": "/test1",
    "limitApp": "default",
    // 熔断策略（0:慢调用比例，1:异常比率，2:异常计数）
    "grade": 0,
    // 最大RT、比例阈值、异常数
    "count": 200,
    // 慢调用比例阈值，仅慢调用比例模式有效（1.8.0 引入）
    "slowRatioThreshold": 0.2,
    // 最小请求数
    "minRequestAmount": 5,
    // 当单位统计时长(类中默认1000)
    "statIntervalMs": 1000,
    // 熔断时长
    "timeWindow": 10
  }
]
```

#### 3、热点规则

```json
[
  {
   // 资源名
    "resource": "/test1",
    // 限流模式（QPS 模式，不可更改）
    "grade": 1,
    // 参数索引
    "paramIdx": 0,
    // 单机阈值
    "count": 13,
    // 统计窗口时长
    "durationInSec": 6,
    // 是否集群 默认false
    "clusterMode": 默认false,
    // 
    "burstCount": 0,
    // 集群模式配置
    "clusterConfig": {
      // 
      "fallbackToLocalWhenFail": true,
      // 
      "flowId": 2,
      // 
      "sampleCount": 10,
      // 
      "thresholdType": 0,
      // 
      "windowIntervalMs": 1000
    },
    // 流控效果（支持快速失败和匀速排队模式）
    "controlBehavior": 0,
    // 
    "limitApp": "default",
    // 
    "maxQueueingTimeMs": 0,
    // 高级选项
    "paramFlowItemList": [
      {
       // 参数类型
        "classType": "int",
       // 限流阈值
        "count": 222,
       // 参数值
        "object": "2"
      }
    ]
  }
]
```

#### 4、系统规则

负值表示没有阈值检查。`不需要删除参数`

```json
[
  {
   // RT
    "avgRt": 1,
    // CPU 使用率
    "highestCpuUsage": -1,
    // LOAD
    "highestSystemLoad": -1,
    // 线程数
    "maxThread": -1,
    // 入口 QPS
    "qps": -1
  }
]
```

**5、授权规则**

```json
[
  {
    // 资源名
    "resource": "sentinel_spring_web_context",
   // 流控应用
    "limitApp": "/test",
    // 授权类型(0代表白名单；1代表黑名单。)
    "strategy": 0
  }
]
```

**注意**：对于上述JOSN中的一些可选属性不需要的时候可以删除。

> 官方文档：[官方文档](https://github.com/alibaba/Sentinel/wiki/%E5%9C%A8%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83%E4%B8%AD%E4%BD%BF%E7%94%A8-Sentinel)

## sentinel-dashboard-apollo⭐

sentinel-dashboard-apollo 是从官方 [Sentinel](https://github.com/alibaba/Sentinel) fork 的 dashboard 定制版，支持所有配置持久化到 apollo。

> 官网：http://blog.fengjx.com/sentinel-dashboard-apollo-wiki/#%E8%AF%B4%E6%98%8E
>
> 下载地址：https://gitee.com/fengjx/Sentinel/tree/dashboard%2Fapollo%2F1.8.6/





# 分布式事务⭐

# 分布式事务问题

## 本地事务

> 本地事务，也就是传统的**单机事务**。在传统数据库事务中，必须要满足四个原则：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081112926.png" alt="image-20210724165045186" style="zoom:67%;" />

## 分布式事务

> 分布式事务是指事务的参与者、支持事务的服务器、资源服务器以及事务管理器**「分别位于不同的分布式系统的不同节点之上」**。一个大的操作由N多的小的操作共同完成。而这些小的操作又分布在不同的服务上。针对于这些操作，**「要么全部成功执行，要么全部不执行」**。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061612958.png" alt="image-20220706161255788" style="zoom: 33%;" />

> 转账是最经典的分布式事务场景，假设用户 A 使用银行 app 发起一笔跨行转账给用户 B，银行系统首先扣掉用户 A 的钱，然后增加用户 B 账户中的余额。如果其中某个步骤失败，此时就有可能会出现 2 种**「异常」**情况：

> - 用户 A 的账户扣款成功，用户 B 账户余额增加失败
> - 用户 A 账户扣款失败，用户 B 账户余额增加成功。

> 对于银行系统来说，以上 2 种情况都是**「不允许发生」**，此时就需要事务来保证转账操作的成功。在**「单体应用」**中，我们只需要贴上@Transactional注解就可以开启事务来保证整个操作的**「原子性」**。
>

> 但是看似以上简单的操作，在实际的应用架构中，不可能是单体的服务，我们会把这一系列操作交给**「N个服务」**去完成，也就是拆分成为**「分布式微服务架构」**。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061612828.png" alt="image-20220706161245767" style="zoom: 33%;" />

> 比如下订单服务，扣库存服务等等，必须要**「保证不同服务状态结果的一致性」**，于是就出现了分布式事务。**分布式事务**，就是指不是在单个服务或单个数据库架构下，产生的事务，例如：

> - 跨数据源的分布式事务
> - 跨服务的分布式事务
> - 综合情况

> 在数据库水平拆分、服务垂直拆分之后，一个业务操作通常要跨多个数据库、服务才能完成。例如电商行业中比较常见的下单付款案例，包括下面几个行为：

> - 创建新订单
> - 扣减商品库存
> - 从用户账户余额扣除金额

> 完成上面的操作需要访问三个不同的微服务和三个不同的数据库。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081131217.png" alt="image-20220808113103145" style="zoom:67%;" />



> 订单的创建、库存的扣减、账户扣款在每一个服务和数据库内是一个本地事务，可以保证ACID原则。但是当我们把三件事情看做一个"业务"，要满足保证“业务”的原子性，要么所有操作全部成功，要么全部失败，不允许出现部分成功部分失败的现象，这就是**分布式系统下的事务**了。此时ACID难以满足，这是分布式事务要解决的问题
>



# 项目搭建

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081112932.png" alt="image-20210724165634571" style="zoom: 67%;" />

seata-demo：父工程，负责管理项目依赖

> - account-service：账户服务，负责管理用户的资金账户。提供扣减余额的接口
> - storage-service：库存服务，负责管理商品库存。提供扣减库存的接口
> - order-service：订单服务，负责管理订单。创建订单时，需要调用account-service和storage-service

## 数据库表

### 账户表

```sql
use xue;
drop table if exists `account_tbl`;
create table `account_tbl`  (
  `id` int(11) not null auto_increment,
  `user_id` varchar(255) character set utf8  default null,
  `money` int(11) unsigned null default 0,
  primary key (`id`) using btree
) engine = innodb auto_increment = 1 character set = utf8;
insert into `account_tbl` values (1, 'user202103032042012', 1000);
```

### 订单表

```sql
drop table if exists `order_tbl`;
create table `order_tbl`  (
  `id` int(11) not null auto_increment,
  `user_id` varchar(255) default null,
  `commodity_code` varchar(255) default null,
  `count` int(11) null default 0,
  `money` int(11) null default 0,
  primary key (`id`) using btree
) engine = innodb auto_increment = 1;
```

### 库存表

```sql
drop table if exists `storage_tbl`;
create table `storage_tbl`  (
  `id` int(11) not null auto_increment,
  `commodity_code` varchar(255) default null,
  `count` int(11) unsigned null default 0,
  primary key (`id`) using btree,
  unique index `commodity_code`(`commodity_code`) using btree
) engine = innodb auto_increment = 2;
insert into `storage_tbl` values (1, '100202003032041', 10);
```

## 父pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
                             http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>cn.itcast.demo</groupId>
    <artifactId>seata-demo</artifactId>
    <version>1.0-SNAPSHOT</version>
    <modules>
        <module>storage-service</module>
        <module>account-service</module>
        <module>order-service</module>
    </modules>
    <packaging>pom</packaging>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.9.RELEASE</version>
        <relativePath/>
    </parent>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
        <spring-cloud.version>Hoxton.SR8</spring-cloud.version>
        <mybatis.plus.version>3.3.0</mybatis.plus.version>
        <mysql.version>5.1.47</mysql.version>
        <alibaba.version>2.2.5.RELEASE</alibaba.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>com.alibaba.cloud</groupId>
                <artifactId>spring-cloud-alibaba-dependencies</artifactId>
                <version>${alibaba.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <!-- springCloud -->
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <!-- mysql驱动 -->
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
            </dependency>
            <dependency>
                <groupId>com.baomidou</groupId>
                <artifactId>mybatis-plus-boot-starter</artifactId>
                <version>${mybatis.plus.version}</version>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <dependencies>
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-lang3</artifactId>
            <version>3.4</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        <!--单元测试-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

## order-service

### pom.xml

```xml
<dependencies>
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    </dependency>
    <!--seata-->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
        <exclusions>
            <!--版本较低，1.3.0，因此排除-->
            <exclusion>
                <artifactId>seata-spring-boot-starter</artifactId>
                <groupId>io.seata</groupId>
            </exclusion>
        </exclusions>
    </dependency>
    <dependency>
        <groupId>io.seata</groupId>
        <artifactId>seata-spring-boot-starter</artifactId>
        <!--seata starter 采用1.5.2版本-->
        <version>1.5.2</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-openfeign</artifactId>
    </dependency>
</dependencies>
```

```yml
server:
  port: 8082
spring:
  application:
    name: order-service
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/xue?useUnicode=true&characterEncoding=utf8&allowMultiQueries=true&useSSL=false
    username: root
    password: 123456
  cloud:
    nacos:
      server-addr: localhost:8848
mybatis-plus:
  global-config:
    db-config:
      insert-strategy: not_null
      update-strategy: not_null
      id-type: auto
logging:
  level:
    org.springframework.cloud.alibaba.seata.web: debug
    cn.itcast: debug
  pattern:
    dateformat: MM-dd HH:mm:ss:SSS
```

### entity

```java
@Data
@TableName("order_tbl")
public class Order {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String userId;
    private String commodityCode;
    private Integer count;
    private Integer money;
}
```

### Mapper

```java
public interface OrderMapper extends BaseMapper<Order> {
}
```

### Service

```java
public interface OrderService {

    // 创建订单
    Long create(Order order);
}
```

```java
@Slf4j
@Service
public class OrderServiceImpl implements OrderService {
    
    @Resource
    private AccountClient accountClient;
    @Resource
    private StorageClient storageClient;
    @Resource
    private OrderMapper orderMapper;

    @Override
    @Transactional
    public Long create(Order order) {
        // 创建订单
        orderMapper.insert(order);
        try {
            // 使用的是Feign方法调用
            // 扣用户余额
            accountClient.deduct(order.getUserId(), order.getMoney());
            // 扣库存
            storageClient.deduct(order.getCommodityCode(), order.getCount());
        } catch (FeignException e) {
            log.error("下单失败，原因:{}", e.contentUTF8(), e);
            throw new RuntimeException(e.contentUTF8(), e);
        }
        return order.getId();
    }
}
```

### client

```java
@FeignClient("account-service")
public interface AccountClient {
    @PutMapping("/account/{userId}/{money}")
    void deduct(@PathVariable("userId") String userId, 
                @PathVariable("money") Integer money);
}
```

```java
@FeignClient("storage-service")
public interface StorageClient {
    @PutMapping("/storage/{code}/{count}")
    void deduct(@PathVariable("code") String code, 
                @PathVariable("count") Integer count);
}
```

### OrderController

```java
@RestController
@RequestMapping("order")
public class OrderController {

    @Resource
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Long> createOrder(Order order){
        Long orderId = orderService.create(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(orderId);
    }
}
```





## account-service



## storage-service







##  测试

```sh
curl --location --request POST ':8082/order?userId=user202103032042012&commodityCode=100202003032041&count=20&money=200'
```

> 测试发现，当库存不足时（count>10），如果余额已经扣减，并不会回滚，出现了分布式事务问题。

![image-20210724170113404](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081112944.png)





# 理论基础⭐

解决分布式事务问题，需要一些分布式系统的基础知识作为理论指导。

## CAP定理

1998年，加州大学的计算机科学家 Eric Brewer 提出，分布式系统有三个指标。

> - Consistency（一致性）
> - Availability（可用性）
> - Partition tolerance （分区容错性）

> 在一个分布式系统中，以下三点特性无法同时满足，**「鱼与熊掌不可兼得」**。CAP理论作为分布式系统的基础理论，指的是在一个分布式系统中， Consistency（一致性）、 Availability（可用性）、Partition tolerance（分区容错性），这三个要素最多只能同时实现两点。
>

> 一致性（C）：在分布式系统中的所有数据备份，**「在同一时刻是否拥有同样的值」**。（等同于所有节点访问同一份最新的数据副本）

> 可用性（A）：在集群中一部分节点**「故障」**后，集群整体**「是否还能响应」**客户端的读写请求。（对数据更新具备高可用性）

> 分区容错性（P）：即使出现**「单个组件无法可用,操作依然可以完成」**。

### 一致性

> Consistency（一致性）：用户访问分布式系统中的任意节点，得到的数据必须一致。

> 比如现在包含两个节点，其中的初始数据是一致的：当我们修改其中一个节点的数据时，两者的数据产生了差异：要想保住一致性，就必须实现node01 到 node02的数据同步：
>

### 可用性

> Availability （可用性）：用户访问集群中的任意健康节点，必须能得到响应，而不是超时或拒绝。如图，有三个节点的集群，访问任何一个都可以及时得到响应：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081112585.png" alt="image-20210724170932072" style="zoom:67%;" />

> 当有部分节点因为网络故障或其它原因无法访问时，代表节点不可用：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081112601.png" alt="image-20210724171007516" style="zoom:67%;" />

### 分区容错

> **Partition（分区）**：因为网络故障或其它原因导致分布式系统中的部分节点与其它节点失去连接，形成独立分区。**Tolerance（容错）**：在集群出现分区时，整个系统也要持续对外提供服务

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081112064.png" alt="image-20210724171041210" style="zoom: 50%;" />



### 矛盾问题

> 在分布式系统中，系统间的网络不能100%保证健康，一定会有故障的时候，而服务有必须对外保证服务。因此Partition Tolerance不可避免。当节点接收到新的数据变更时，就会出现问题了：
>

![image-20210724171546472](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081112081.png)

| 选择 | 说明                                                         |
| :--- | :----------------------------------------------------------- |
| CA   | 放弃分区容错性，加强一致性和可用性，其实就是传统的单机数据库的选择 |
| AP   | 放弃一致性，分区容错性和可用性，这是很多分布式系统设计时的选择 |
| CP   | 放弃可用性，追求一致性和分区容错性，网络问题会直接让整个系统不可用 |

> 具体地讲在分布式系统中，在任何数据库设计中，一个Web应用**「至多只能同时支持上面的两个属性」**。显然，任何横向扩展策略都要依赖于数据分区。因此，设计人员必须在一致性与可用性之间做出选择。如果此时要保证**一致性**，就必须等待网络恢复，完成数据同步后，整个集群才对外提供服务，服务处于阻塞状态，不可用。如果此时要保证**可用性**，就不能等待网络恢复，那node01、node02与node03之间就会出现数据不一致。
>

> 也就是说，在P一定会出现的情况下，A和C之间只能实现一个。

## BASE理论

BASE理论是对CAP的一种解决思路，包含三个思想：

> - **Basically Available** **（基本可用）**：分布式系统出现故障时，`允许损失部分可用性，即保证核心可用`
> - **Soft State（软状态）：**在一定时间内，`允许出现中间状态，比如临时的不一致状态。`
> - **Eventually Consistent（最终一致性）**：虽然无法保证强一致性，但是在软状态结束后，`最终达到数据一致`。

> 在分布式系统中，我们往往追求的是可用性，它的重要程序比一致性要高，那么如何实现高可用性呢？
>

> BASE理论是对CAP中的一致性和可用性进行一个权衡的结果，理论的核心思想就是：我们无法做到强一致，但每个应用都可以根据自身的业务特点，采用适当的方式来使系统达到最终一致性（Eventual consistency）。
>

## 解决思路

分布式事务最大的问题是各个子事务的一致性问题，因此可以借鉴CAP定理和BASE理论，有两种解决思路

> - AP模式：**各子事务分别执行和提交，允许出现结果不一致，然后采用弥补措施恢复数据即可，实现最终一致**。
>
> - CP模式：**各个子事务执行后互相等待，同时提交，同时回滚，达成强一致。但事务等待过程中，处于弱可用状态**。

> 但不管是哪种模式，都需要在子系统事务之间互相通讯协调事务状态，就是需要一个**事务协调者(TC)**
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081112099.png" alt="image-20210724172123567" style="zoom:67%;" />

这里的子系统事务，称为**分支事务**；有关联的各个分支事务在一起称为**全局事务**。

> - 全局事务：`整个分布式事务`
> - 分支事务：分布式事务中`包含的每个子系统的事务`
> - 最终一致思想：各分支事务分别执行并提交，`如果有不一致的情况，再想办法恢复数据`
> - 强一致思想：各分支事务执行完业务不要提交，`等待彼此结果。而后统一提交或回滚`



# 初识Seata

> Seata是 2019 年 1 月份蚂蚁金服和阿里巴巴共同开源的分布式事务解决方案。致力于提供高性能和简单易用的分布式事务服务，为用户打造一站式的分布式解决方案。官网地址：http://seata.io/，其中的文档、播客中提供了大量的使用说明、源码分析。
>

![image-20210724172225817](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081112117.png)

## Seata架构⭐

### 重要角色

Seata事务管理中有三个重要的角色：

> - **TC (Transaction Coordinator) -** **事务协调者：**维护全局和分支事务状态，协调全局事务提交或回滚
>
> - **TM (Transaction Manager) -** **事务管理器：**定义全局事务的范围、开始全局事务、提交或回滚事务
>
> - **RM (Resource Manager) -** **资源管理器：**管理分支事务处理的资源，与TC交谈以注册分支事务和报告分支事务的状态，并驱动分支事务提交或回滚。

### 整体架构图

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081112136.png" alt="image-20210724172326452" style="zoom:67%;" />

### 解决方案⭐

Seata基于上述架构提供了四种不同的分布式事务解决方案：

> - **XA模式**：**强一致性分阶段事务模式，牺牲了一定的可用性，无业务侵入**
> - **TCC模式**：**最终一致的分阶段事务模式，有业务侵入**
> - **AT模式**：**最终一致的分阶段事务模式，无业务侵入，也是Seata的默认模式**
> - **SAGA模式**：**长事务模式，有业务侵入**

无论哪种方案，都离不开TC，也就是事务的协调者。

## 部署TC服务⭐

> 注意：nacos版本是2.1.1，版本过低启动seata时会报错

> 起步官网：https://seata.io/zh-cn/docs/ops/deploy-guide-beginner.html
>

### 下载并解压

首先我们要下载seata-server包，地址在：https://github.com/seata/seata/releases

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209111547461.png" alt="image-20220911154724387" style="zoom:80%;" />

> 在非中文目录解压缩这个zip包，其目录结构如下：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209111645200.png" alt="image-20220911164552120" style="zoom:80%;" />

### 修改配置

> 修改conf目录下的**application.yml**文件：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209111646405.png" alt="image-20220911164632353" style="zoom:80%;" />

内容如下：

```yml
seata:
  # 读取tc服务端的配置文件的方式，这里是从nacos配置中心读取，这样如果tc是集群，可以共享配置
  config:
    # support: nacos 、 consul 、 apollo 、 zk  、 etcd3
    # 配置nacos地址等信息
    type: nacos
    nacos:
      server-addr: 127.0.0.1:8848
      namespace:
      group: DEFAULT_GROUP
      username: nacos
      password: nacos
      dataId: seataServer.properties

  registry:
    # tc服务的注册中心类，这里选择nacos，也可以是eureka、zookeeper等
    # support: nacos 、 eureka 、 redis 、 zk  、 consul 、 etcd3 、 sofa
    type: nacos
    # seata tc 服务注册到 nacos的服务名称，可以自定义
    nacos:
      application: seata-server
      server-addr: 127.0.0.1:8848
      group: DEFAULT_GROUP
      namespace:
      cluster: SH
      username: nacos
      password: nacos
```

### nacos添加配置文件

> 特别注意，为了让tc服务的集群可以共享配置，我们选择了nacos作为统一配置中心。因此服务端配置文件seataServer.properties文件需要在nacos中配好。
>

格式如下：

![image-20220912134520313](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121345365.png)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121346953.png" alt="image-20220912134600900" style="zoom:80%;" />

配置内容如下：

> 其中的数据库地址、用户名、密码都需要修改成你自己的数据库信息。

```properties
# 数据存储方式，db代表数据库
store.mode=db
store.db.datasource=druid
store.db.dbType=mysql
store.db.driverClassName=com.mysql.cj.jdbc.Driver
store.db.url=jdbc:mysql://127.0.0.1:3306/seata?useUnicode=true&rewriteBatchedStatements=true
store.db.user=root
store.db.password=123456
store.db.minConn=5
store.db.maxConn=30
store.db.globalTable=global_table
store.db.branchTable=branch_table
store.db.queryLimit=100
store.db.lockTable=lock_table
store.db.maxWait=5000
# 事务、日志等配置
server.recovery.committingRetryPeriod=1000
server.recovery.asynCommittingRetryPeriod=1000
server.recovery.rollbackingRetryPeriod=1000
server.recovery.timeoutRetryPeriod=1000
server.maxCommitRetryTimeout=-1
server.maxRollbackRetryTimeout=-1
server.rollbackRetryTimeoutUnlockEnable=false
server.undo.logSaveDays=7
server.undo.logDeletePeriod=86400000

# 客户端与服务端传输方式
transport.serialization=seata
transport.compressor=none
# 关闭metrics功能，提高性能
metrics.enabled=false
metrics.registryType=compact
metrics.exporterList=prometheus
metrics.exporterPrometheusPort=9898
```

### 创建数据库表

特别注意：tc服务在管理分布式事务时，需要记录事务相关数据到数据库中，你需要提前创建好这些表。

> 数据库表所在位置

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121344610.png" alt="image-20220912134405561" style="zoom:80%;" />

> 这些表主要记录全局事务、分支事务、全局锁信息：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121343382.png" alt="image-20220912134309329" style="zoom:80%;" />

### 启动TC服务

> 进入bin目录，运行其中的seata-server.bat即可：
>

![image-20210622205427318](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209111133080.png)

```apl
# 进入CMD，执行
seata-server.bat
# 启动nacos
startup.cmd -m standalone
```

> 启动成功后，seata-server应该已经注册到nacos注册中心了。打开浏览器，访问nacos地址：http://192.168.88.1:8848/nacos/index.html，然后进入服务列表页面，可以看到seata-tc-server的信息：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306111818860.png" alt="image-20230611181848703" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209111649460.png" alt="image-20220911164928396" style="zoom:80%;" />

## 微服务集成Seata

> 我们以Storage-service为例来演示。
>

> 父依赖绑定
>

```xml
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
    <java.version>1.8</java.version>
    <spring-cloud.version>Hoxton.SR8</spring-cloud.version>
    <mybatis.plus.version>3.3.0</mybatis.plus.version>
    <mysql.version>5.1.47</mysql.version>
    <alibaba.version>2.2.5.RELEASE</alibaba.version>
</properties>
```

### 引入依赖⭐

> 首先，在order-service中引入依赖：
>

```xml
<!--seata-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
    <exclusions>
        <!--版本较低，1.3.0，因此排除--> 
        <exclusion>
            <artifactId>seata-spring-boot-starter</artifactId>
            <groupId>io.seata</groupId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <!--seata starter 采用1.5.2版本-->
    <version>1.5.2</version>
</dependency>
```

> nacos依赖，nacos-client依赖版本可以换，不换也行
>

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    <exclusions>
        <exclusion>
            <groupId>com.alibaba.nacos</groupId>
            <artifactId>nacos-client</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>com.alibaba.nacos</groupId>
    <artifactId>nacos-client</artifactId>
    <version>2.1.1</version>
</dependency>
```

### 配置TC地址

> 在order-service中的application.yml中，配置TC服务信息，结合服务名称获取TC地址：
>

> 注意：内容对应在Seata配置文件中配置

![image-20210724173654258](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081112636.png)

```yaml
seata:
  registry: # TC服务注册中心的配置，微服务根据这些信息去注册中心获取tc服务地址
    type: nacos # 注册中心类型 nacos
    nacos:
      server-addr: 127.0.0.1:8848 # nacos地址
      namespace: "" # namespace，默认为空，public
      group: DEFAULT_GROUP # 分组，默认是DEFAULT_GROUP
      application: seata-server # seata服务名称
      username: nacos
      password: nacos
  tx-service-group: seata-demo # 事务组名称
  service:
    vgroup-mapping: # 事务组与cluster的映射关系，不能直接配cluster
      seata-demo: SH
```

> 微服务如何根据这些配置寻找TC的地址呢？注册到Nacos中的微服务，确定一个具体实例需要四个信息
>

> - namespace：命名空间
> - group：分组
> - application：服务名
> - cluster：集群名
>

### 其它服务

> 其它两个微服务也都参考order-service的步骤来做，`完全一样`，然后看日志

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306111827958.png" alt="image-20230611182758825" style="zoom:80%;" />



# 事务模式⭐

下面我们就一起学习下Seata中的四种不同的事务模式。

## XA模式

> XA 规范 是 X/Open 组织定义的分布式事务处理（DTP，Distributed Transaction Processing）标准，XA 规范 描述了全局的TM与局部的RM之间的接口，几乎所有主流的数据库都对 XA 规范 提供了支持。
>

### 两阶段提交

> XA是规范，目前主流数据库都实现了这种规范，实现的原理都是基于两阶段提交。
>

正常情况：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081112651.png" alt="image-20210724174102768" style="zoom:67%;" />

异常情况：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081112666.png" alt="image-20210724174234987" style="zoom:67%;" />

一阶段：

- 事务协调者通知每个事物参与者执行本地事务
- 本地事务执行完成后报告事务执行状态给事务协调者，此时事务不提交，继续持有数据库锁

二阶段：

- 事务协调者基于一阶段的报告来判断下一步操作
  - 如果一阶段都成功，则通知所有事务参与者，提交事务
  - 如果一阶段任意一个参与者失败，则通知所有事务参与者回滚事务

### Seata的XA模型

> Seata对原始的XA模式做了简单的封装和改造，以适应自己的事务模型，基本架构如图：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081112682.png" alt="image-20210724174424070" style="zoom:67%;" />

RM一阶段的工作：

> ​	① 注册分支事务到TC
>
> ​	② 执行分支业务sql但不提交
>
> ​	③ 报告执行状态到TC

TC二阶段的工作：

> TC检测各分支事务执行状态
>

> a.如果都成功，通知所有RM提交事务
>
> b.如果有失败，通知所有RM回滚事务
>
> RM二阶段的工作：接收TC指令，提交或回滚事务

### 优缺点

XA模式的优点是什么？

> - 事务的强一致性，满足ACID原则。
> - 常用数据库都支持，实现简单，并且没有代码侵入

XA模式的缺点是什么？

> - 因为一阶段需要锁定数据库资源，等待二阶段结束才释放，性能较差
> - 依赖关系型数据库实现事务

### 实现XA模式⭐

> Seata的starter已经完成了XA模式的自动装配，实现非常简单，步骤如下：
>

> 1）修改application.yml文件（`每个参与事务的微服务`），开启XA模式：
>

```yaml
seata:
  data-source-proxy-mode: XA
```

> 2）给发起`全局事务的入口方法`添加@GlobalTransactional注解:本例中是OrderServiceImpl中的create方法.

```java
@Override
@GlobalTransactional
public Long create(Order order) {
    // 创建订单
    orderMapper.insert(order);
    try {
        // 扣用户余额
        accountClient.deduct(order.getUserId(), order.getMoney());
        // 扣库存
        storageClient.deduct(order.getCommodityCode(), order.getCount());

    } catch (FeignException e) {
        log.error("下单失败，原因:{}", e.contentUTF8(), e);
        throw new RuntimeException(e.contentUTF8(), e);
    }
    return order.getId();
}
```

> 3）重启服务并测试重启order-service，再次测试，发现无论怎样，三个微服务都能成功回滚。

> 当余额库存都正常时，一切正常。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209120918288.png" alt="image-20220912091819214" style="zoom:80%;" />

当数量不足时，发生异常，数据库都没有进行减少操作

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209120919841.png" alt="image-20220912091908757" style="zoom:80%;" />

seata库的global_table生成数据

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209120917509.png" alt="image-20220912091703284" style="zoom:80%;" />



## AT模式⭐

> AT模式同样是**分阶段提交的事务**模型，不过**缺弥补了XA模型中资源锁定周期过长的缺陷**。

### Seata的AT模型

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121354686.png" alt="image-20220912135439618" style="zoom:80%;" />

### 流程梳理

> 我们用一个真实的业务来梳理下AT模式的原理。
>

> 比如，现在又一个数据库表，记录用户余额：其中一个分支业务要执行的SQL为：
>

```sql
update tb_account set money = money - 10 where id = 1
```

AT模式下，当前分支事务执行流程如下：

一阶段：

1）TM发起并注册全局事务到TC

2）TM调用分支事务

3）分支事务准备执行业务SQL

4）RM拦截业务SQL，根据where条件查询原始数据，形成快照。

```json
{
    "id": 1, "money": 100
}
```

5）RM执行业务SQL，提交本地事务，释放数据库锁。此时 `money = 90`

6）RM报告本地事务状态给TC

二阶段：

1）TM通知TC事务结束

2）TC检查分支事务状态

​	 a）如果都成功，则立即删除快照

​	 b）如果有分支事务失败，需要回滚。读取快照数据（`{"id": 1, "money": 100}`），将快照恢复到数据库。此时数据库再次恢复为100

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209120922692.png" alt="image-20220912092249622" style="zoom:80%;" />

### AT与XA的区别

简述AT模式与XA模式最大的区别是什么？

> - XA模式一阶段不提交事务，锁定资源；AT模式一阶段直接提交，不锁定资源。
> - XA模式依赖数据库机制实现回滚；AT模式利用数据快照实现数据回滚。
> - XA模式强一致；AT模式最终一致

### 脏写问题

> 在多线程并发访问AT模式的分布式事务时，有可能出现脏写问题，如图：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081112207.png" alt="image-20210724181541234" style="zoom:80%;" />



> 解决思路就是引入了全局锁的概念。在释放DB锁之前，先拿到全局锁。避免同一时刻有另外一个事务来操作当前数据。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081112222.png" alt="image-20210724181843029" style="zoom:80%;" />

### 优缺点

AT模式的优点：

- 一阶段完成直接提交事务，释放数据库资源，性能比较好
- 利用全局锁实现读写隔离
- 没有代码侵入，框架自动完成回滚和提交

AT模式的缺点：

- 两阶段之间属于软状态，属于最终一致
- 框架的快照功能会影响性能，但比XA模式要好很多

### 实现AT模式⭐

> AT模式中的快照生成、回滚等动作都是由框架自动完成，没有任何代码侵入，因此实现非常简单。只不过，AT模式需要一个表来记录全局锁、另一张表来记录数据快照undo_log。
>

> 1）导入数据库表，记录全局锁,undo_log所在地址：https://github.com/seata/seata/tree/master/script/client/at/db

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121619552.png" alt="image-20220912161910492" style="zoom:80%;" />

> seata-at.sql，其中lock_table导入到TC服务关联的数据库(一开始就导入了,即在搭建seata时就创建了)，undo_log表导入到微服务关联的数据库：
>

```sql
CREATE TABLE IF NOT EXISTS `undo_log`
(
    `branch_id`     BIGINT       NOT NULL COMMENT 'branch transaction id',
    `xid`           VARCHAR(128) NOT NULL COMMENT 'global transaction id',
    `context`       VARCHAR(128) NOT NULL COMMENT 'undo_log context,such as   
                                                   serialization',
    `rollback_info` LONGBLOB     NOT NULL COMMENT 'rollback info',
    `log_status`    INT(11)      NOT NULL COMMENT '0:normal status,1:defense status',
    `log_created`   DATETIME(6)  NOT NULL COMMENT 'create datetime',
    `log_modified`  DATETIME(6)  NOT NULL COMMENT 'modify datetime',
    UNIQUE KEY `ux_undo_log` (`xid`, `branch_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4;
```

2）修改application.yml文件，将事务模式修改为AT模式即可：

```yaml
seata:
  data-source-proxy-mode: AT # 默认就是AT
```

3）重启服务并测试

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121000068.png" alt="image-20220912100025004" style="zoom:80%;" />

> 注意：数据库表中并没有数据，因为他在过程中就被删除了，避免占用大量内存，但没有undo_log表会提升

## TCC模式

> TCC模式与AT模式非常相似，**每阶段都是独立事务**，不同的是**TCC通过人工编码来实现数据恢复**。需要实现三个方法：

> - Try：资源的检测和预留； 
>
> - Confirm：完成资源操作业务；要求 Try 成功 Confirm 一定要能成功。
>
> - Cancel：预留资源释放，可以理解为try的反向操作。

### 流程分析

> 举例，一个扣减用户余额的业务。假设账户A原来余额是100，需要余额扣减30元。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121001727.png" alt="image-20220912100105659" style="zoom:80%;" />

### Seata的TCC模型

> Seata中的TCC模型依然延续之前的事务架构，如图：
>

![image-20210724182937713](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081112726.png)

### 优缺点

TCC模式的每个阶段是做什么的？

- Try：资源检查和预留
- Confirm：业务执行和提交
- Cancel：预留资源的释放

TCC的优点是什么？

- 一阶段完成直接提交事务，释放数据库资源，性能好
- 相比AT模型，无需生成快照，无需使用全局锁，性能最强
- 不依赖数据库事务，而是依赖补偿操作，可以用于非事务型数据库

TCC的缺点是什么？

- 有代码侵入，需要人为编写try、Confirm和Cancel接口，太麻烦
- 软状态，事务是最终一致
- 需要考虑Confirm和Cancel的失败情况，做好幂等处理

### 事务悬挂和空回滚

#### 1）空回滚

当某分支事务的try阶段**阻塞**时，可能导致全局事务超时而触发二阶段的cancel操作。在未执行try操作时先执行了cancel操作，这时cancel不能做回滚，就是**空回滚**。

如图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081112741.png" alt="image-20210724183426891" style="zoom:67%;" />

执行cancel操作时，应当判断try是否已经执行，如果尚未执行，则应该空回滚。

#### 2）业务悬挂

对于已经空回滚的业务，之前被阻塞的try操作恢复，继续执行try，就永远不可能confirm或cancel ，事务一直处于中间状态，这就是**业务悬挂**。

执行try操作时，应当判断cancel是否已经执行过了，如果已经执行，应当阻止空回滚后的try操作，避免悬挂



### 实现TCC模式

解决空回滚和业务悬挂问题，必须要记录当前事务状态，是在try、还是cancel？

#### 0）前期准备

```java
@Data
@TableName("account_tbl")
public class Account {
    @TableId
    private Long id;
    private String userId;
    private Integer money;
}
```

```java
@Data
@TableName("account_freeze_tbl")
public class AccountFreeze {
    @TableId(type = IdType.INPUT)
    private String xid;
    private String userId;
    private Integer freezeMoney;
    private Integer state;

    public static abstract class State {
        public final static int TRY = 0;
        public final static int CONFIRM = 1;
        public final static int CANCEL = 2;
    }
}
```

```java
public interface AccountMapper extends BaseMapper<Account> {

    @Update("update account_tbl set money = money - ${money} where user_id = #{userId}")
    int deduct(@Param("userId") String userId, @Param("money") int money);

    @Update("update account_tbl set money = money + ${money} where user_id = #{userId}")
    int refund(@Param("userId") String userId, @Param("money") int money);
}
```

```java
public interface AccountFreezeMapper extends BaseMapper<AccountFreeze> {
}
```

#### 1）思路分析

为了实现空回滚、防止业务悬挂，以及幂等性要求。我们必须在数据库记录冻结金额的同时，记录当前事务id和执行状态，为此我们设计了一张表：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121014279.png" alt="image-20220912101414212" style="zoom:80%;" />

这里我们定义一张表：

```sql
CREATE TABLE `account_freeze_tbl` (
  `xid` varchar(128) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL COMMENT '用户id',
  `freeze_money` int(11) unsigned DEFAULT '0' COMMENT '冻结金额',
  `state` int(1) DEFAULT NULL COMMENT '事务状态，0:try，1:confirm，2:cancel',
  PRIMARY KEY (`xid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
```

- xid：是全局事务id
- freeze_money：用来记录用户冻结金额
- state：用来记录事务状态

接下来，我们改造account-service，利用TCC实现余额扣减功能。

#### 2）声明TCC接口

TCC的Try、Confirm、Cancel方法都需要在接口中基于注解来声明，

我们在account-service项目中的`cn.itcast.account.service`包中新建一个接口，声明TCC三个接口：

```java
@LocalTCC
public interface AccountTCCService {
    //Try逻辑，@TwoPhaseBusinessAction中的name属性要与当前方法名一致，用于指定Try逻辑对应的方法
    @TwoPhaseBusinessAction(name = "deduct", 
                            commitMethod = "confirm", 
                            rollbackMethod = "cancel")
    void deduct(@BusinessActionContextParameter(paramName = "userId") String userId,
                @BusinessActionContextParameter(paramName = "money")int money);
    // 二阶段confirm确认方法、可以另命名，但要保证与commitMethod一致 
    // context 上下文,可以传递try方法的参数
    // boolean 执行是否成功
    boolean confirm(BusinessActionContext ctx);
    // 二阶段回滚方法，要保证与rollbackMethod一致
    boolean cancel(BusinessActionContext ctx);
}
```

#### 3）编写实现类

在account-service服务中的`cn.itcast.account.service.impl`包下新建一个类，实现TCC业务：

```java
@Service
@Slf4j
public class AccountTCCServiceImpl implements accountTccService {

    @Autowired
    private AccountMapper accountMapper;
    @Autowired
    private AccountFreezeMapper freezeMapper;

    @Override
    @Transactional
    public void deduct(String userId, int money) {
        // 0.获取事务id
        String xid = RootContext.getXID();
        // 悬挂判断，判断freeze中是否有冻结记录，如果有，一定是CANCEL执行过，我要拒绝业务
        AccountFreeze oldFreeze = freezeMapper.selectById(xid);
        if (oldFreeze != null) {
            // CANCEL执行过，我要拒绝业务
            return;
        }
        // 1.扣减可用余额
        accountMapper.deduct(userId, money);
        // 2.记录冻结金额，事务状态
        AccountFreeze freeze = new AccountFreeze();
        freeze.setUserId(userId);
        freeze.setFreezeMoney(money);
        freeze.setState(AccountFreeze.State.TRY);
        freeze.setXid(xid);
        freezeMapper.insert(freeze);
    }

    @Override
    public boolean confirm(BusinessActionContext ctx) {
        // 1.获取事务id
        String xid = ctx.getXid();
        // 2.根据id删除冻结记录
        int count = freezeMapper.deleteById(xid);
        return count == 1;
    }

    @Override
    public boolean cancel(BusinessActionContext ctx) {
        // 0.查询冻结记录
        String xid = ctx.getXid();
        String userId = ctx.getActionContext("userId").toString();
        AccountFreeze freeze = freezeMapper.selectById(xid);
        // 1.空回滚判断，判断freeze是否为null，为null证明try没执行，需要空回滚
        if (freeze == null) {
            //证明try没执行，需要空回滚
            freeze = new AccountFreeze();
            freeze.setUserId(userId);
            freeze.setFreezeMoney(0);
            freeze.setState(AccountFreeze.State.CANCEL);
            freeze.setXid(xid);
            freezeMapper.insert(freeze);
            return true;
        }
        // 2. 幂等判断
        if (freeze.getState() == AccountFreeze.State.CANCEL) {
            // 已经处理过一次了，无需重复处理
            return true;
        }
        // 1.恢复可用余额
        accountMapper.refund(freeze.getUserId(), freeze.getFreezeMoney());
        // 2.将冻结金额清零，状态改为CANCEL
        freeze.setFreezeMoney(0);
        freeze.setState(AccountFreeze.State.CANCEL);
        int count = freezeMapper.updateById(freeze);
        return count == 1;
    }
}
```

#### 4）修改controller

```java
// 换成TCC接口就行
@Autowired
private accountTccService accountService;
```

#### 4）测试

访问成功

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121057904.png" alt="image-20220912105717826" style="zoom:80%;" />

访问失败

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121058266.png" alt="image-20220912105819185" style="zoom:80%;" />

表中生成记录

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121058799.png" alt="image-20220912105849753" style="zoom:80%;" />



## SAGA模式

Saga 模式是 Seata 即将开源的长事务解决方案，将由蚂蚁金服主要贡献。

其理论基础是Hector & Kenneth  在1987年发表的论文[Sagas](https://microservices.io/patterns/data/saga.html)。

Seata官网对于Saga的指南：https://seata.io/zh-cn/docs/user/saga.html

### 原理

> 在 Saga 模式下，分布式事务内有多个参与者，每一个参与者都是一个冲正补偿服务，需要用户根据业务场景实现其正向操作和逆向回滚操作。
>

> 分布式事务执行过程中，依次执行各参与者的正向操作，如果所有正向操作均执行成功，那么分布式事务提交。如果任何一个正向操作执行失败，那么分布式事务会去退回去执行前面各参与者的逆向回滚操作，回滚已提交的参与者，使分布式事务回到初始状态。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121104290.png" alt="image-20220912110456202" style="zoom:80%;" />

### 优缺点

优点：

- 事务参与者可以基于事件驱动实现异步调用，吞吐高
- 一阶段直接提交事务，无锁，性能好
- 不用编写TCC中的三个阶段，实现简单

缺点：

- 软状态持续时间不确定，时效性差
- 没有锁，没有事务隔离，会有脏写

## 四种模式对比

我们从以下几个方面来对比四种实现：

> - 一致性：能否保证事务的一致性？强一致还是最终一致？
> - 隔离性：事务之间的隔离性如何？
> - 代码侵入：是否需要对业务代码改造？
> - 性能：有无性能损耗？
> - 场景：常见的业务场景

如图：

![image-20210724185021819](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081112770.png)



# 高可用

Seata的TC服务作为分布式事务核心，一定要保证集群的高可用性。

## 高可用架构模型

> 搭建TC服务集群非常简单，启动多个TC服务，注册到nacos即可。但集群并不能确保100%安全，万一集群所在机房故障怎么办？所以如果要求较高，一般都会做异地多机房容灾。
>

> 比如一个TC集群在上海，另一个TC集群在杭州：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208081112995.png" alt="image-20210724185240957" style="zoom:80%;" />

> 微服务基于事务组（tx-service-group)与TC集群的映射关系，来查找当前应该使用哪个TC集群。当SH集群故障时，只需要将vgroup-mapping中的映射关系改成HZ。则所有微服务就会切换到HZ的TC集群了。
>

## 实现高可用

计划启动两台seata的tc服务节点：

| 节点名称 | ip地址    | 端口号 | 集群名称 |
| -------- | --------- | ------ | -------- |
| seata    | 127.0.0.1 | 8091   | SH       |
| seata2   | 127.0.0.1 | 8092   | HZ       |

> 之前我们已经启动了一台seata服务，端口是8091，集群名为SH。
>

> 现在，将seata目录复制一份，起名为seata2
>

> 修改seata2/conf/application.yml内容如下：
>

> 注意：只需修改port和cluster，其他不用变

```yml
# 修改它
server:
  port: 7092
...
seata:
  ...
  registry:
    # tc服务的注册中心类，这里选择nacos，也可以是eureka、zookeeper等
    # support: nacos 、 eureka 、 redis 、 zk  、 consul 、 etcd3 、 sofa
    type: nacos
    # seata tc 服务注册到 nacos的服务名称，可以自定义
    nacos:
      application: seata-server
      server-addr: 127.0.0.1:8848
      group: SEATA_GROUP
      namespace:
      # 修改它
      cluster: HZ
      ...
```

进入seata2/bin目录，然后运行命令：

```apl
seata-server.bat
```

打开nacos控制台，查看服务列表：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121328402.png" alt="image-20220912132821331" style="zoom:80%;" />

点进详情查看：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209111133587.png" alt="image-20210624151221747" style="zoom:80%;" />

## 将事务组映射配置到nacos

> 接下来，我们需要将tx-service-group与cluster的映射关系都配置到nacos配置中心。
>

> 新建一个配置：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121232286.png" alt="image-20220912123223221" style="zoom:80%;" />

> 配置的内容如下：
>

```properties
# 事务组映射关系,seata-demo和application.yml配置的tx-service-group名称相同
service.vgroupMapping.seata-demo=SH
# 下面都是默认配置，基本不用改，也可以自己修改，实现热更新
service.enableDegrade=false
service.disableGlobalTransaction=false
# 与TC服务的通信配置
transport.type=TCP
transport.server=NIO
transport.heartbeat=true
transport.enableClientBatchSendRequest=false
transport.threadFactory.bossThreadPrefix=NettyBoss
transport.threadFactory.workerThreadPrefix=NettyServerNIOWorker
transport.threadFactory.serverExecutorThreadPrefix=NettyServerBizHandler
transport.threadFactory.shareBossWorker=false
transport.threadFactory.clientSelectorThreadPrefix=NettyClientSelector
transport.threadFactory.clientSelectorThreadSize=1
transport.threadFactory.clientWorkerThreadPrefix=NettyClientWorkerThread
transport.threadFactory.bossThreadSize=1
transport.threadFactory.workerThreadSize=default
transport.shutdown.wait=3
# RM配置
client.rm.asyncCommitBufferLimit=10000
client.rm.lock.retryInterval=10
client.rm.lock.retryTimes=30
client.rm.lock.retryPolicyBranchRollbackOnConflict=true
client.rm.reportRetryCount=5
client.rm.tableMetaCheckEnable=false
client.rm.tableMetaCheckerInterval=60000
client.rm.sqlParserType=druid
client.rm.reportSuccessEnable=false
client.rm.sagaBranchRegisterEnable=false
# TM配置
client.tm.commitRetryCount=5
client.tm.rollbackRetryCount=5
client.tm.defaultGlobalTransactionTimeout=60000
client.tm.degradeCheck=false
client.tm.degradeCheckAllowTimes=10
client.tm.degradeCheckPeriod=2000

# undo日志配置
client.undo.dataValidation=true
client.undo.logSerialization=jackson
client.undo.onlyCareUpdateColumns=true
client.undo.logTable=undo_log
client.undo.compress.enable=true
client.undo.compress.type=zip
client.undo.compress.threshold=64k
client.log.exceptionRate=100
```

## 微服务读取nacos配置

接下来，需要修改每一个微服务的application.yml文件，让微服务读取nacos中的client.properties文件：

原来写死是这样的

```yml
tx-service-group: seata-demo # 事务组名称
  service:
    vgroup-mapping: # 事务组与cluster的映射关系，不能直接配cluster
      seata-demo: SH
```

要写成下面这样，去掉service和下面的内容

```yml
tx-service-group: seata-demo # 事务组名称
config:
  type: nacos
  nacos:
    server-addr: 127.0.0.1:8848
    username: nacos
    password: nacos
    group: SEATA_GROUP
    data-id: client.properties
```

> 重启微服务，现在微服务到底是连接tc的SH集群，还是tc的HZ集群，都统一由nacos的client.properties来决定了。重启服务，目前全显示在HZ客户端
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121201469.png" alt="image-20220912120104415" style="zoom:80%;" />

> 修改成HZ，再次发布
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121202651.png" alt="image-20220912120226589" style="zoom:80%;" />

> 修改之后，能热更新，两个控制台都能正常显示注册
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209121227659.png" alt="image-20220912122724606" style="zoom:80%;" />



# 面试分析

1、分布式事务了解吗？

2、你们是如何解决分布式事务问题的？

## 面试官心理分析

> 只要聊到你做了分布式系统，必问分布式事务，你对分布式事务一无所知的话，确实会很坑，你起码得知道有哪些方案，一般怎么来做，每个方案的优缺点是什么。
>

> 现在面试，分布式系统成了标配，而分布式系统带来的分布式事务也成了标配了。因为你做系统肯定要用事务吧，如果是分布式系统，肯定要用分布式事务吧。先不说你搞过没有，起码你得明白有哪几种方案，每种方案可能有啥坑？比如 TCC 方案的网络问题、XA 方案的一致性问题。

## 面试题剖析

 分布式事务的实现主要有以下 5 种方案：

- XA 方案
- TCC 方案
- 本地消息表
- 可靠消息最终一致性方案
- 最大努力通知方案

 2两阶段提交方案/XA方案 所谓的 XA 方案，即：两阶段提交，有一个**事务管理器**的概念，负责协调多个数据库（资源管理器）的事务，事务管理器先问问各个数据库你准备好了吗？如果每个数据库都回复 ok，那么就正式提交事务，在各个数据库上执行操作；如果任何其中一个数据库回答不 ok，那么就回滚事务。  

这种分布式事务方案，比较适合单块应用里，跨多个库的分布式事务，而且因为严重依赖于数据库层面来搞定复杂的事务，效率很低，绝对不适合高并发的场景。如果要玩儿，那么基于 `Spring+JTA` 就可以搞定，自己随便搜个 demo 看看就知道了。

这个方案，我们很少用，一般来说**某个系统内部如果出现跨多个库**的这么一个操作，是**不合规**的。我可以给大家介绍一下， 现在微服务，一个大的系统分成几十个甚至几百个服务。一般来说，我们的规定和规范，是要求**每个服务只能操作自己对应的一个数据库**。

如果你要操作别的服务对应的库，不允许直连别的服务的库，违反微服务架构的规范，你随便交叉胡乱访问，几百个服务的话，全体乱套，这样的一套服务是没法管理的，没法治理的，可能会出现数据被别人改错，自己的库被别人写挂等情况。

如果你要操作别人的服务的库，你必须是通过**调用别的服务的接口**来实现，绝对不允许交叉访问别人的数据库。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141028709.png" alt="image-20220814102857647" style="zoom:67%;" />

##  TCC 方案

TCC 的全称是：Try、Confirm、Cancel。

- Try 阶段：这个阶段说的是对各个服务的资源做检测以及对资源进行**锁定或者预留**。
- Confirm 阶段：这个阶段说的是在各个服务中**执行实际的操作**。
- Cancel 阶段：如果任何一个服务的业务方法执行出错，那么这里就需要**进行补偿**，就是执行已经执行成功的业务逻辑的回滚操作。（把那些执行成功的回滚）

这种方案说实话几乎很少人使用，我们用的也比较少，但是也有使用的场景。因为这个**事务回滚**实际上是**严重依赖于你自己写代码来回滚和补偿**了，会造成补偿代码巨大，非常之恶心。

比如说我们，一般来说跟**钱**相关的，跟钱打交道的，**支付**、**交易**相关的场景，我们会用 TCC，严格保证分布式事务要么全部成功，要么全部自动回滚，严格保证资金的正确性，保证在资金上不会出现问题。

而且最好是你的各个业务执行的时间都比较短。

但是说实话，一般尽量别这么搞，自己手写回滚逻辑，或者是补偿逻辑，实在太恶心了，那个业务代码很难维护。

## 本地消息表

 本地消息表其实是国外的 ebay 搞出来的这么一套思想。

这个大概意思是这样的：

1. A 系统在自己本地一个事务里操作同时，插入一条数据到消息表；
2. 接着 A 系统将这个消息发送到 MQ 中去；
3. B 系统接收到消息之后，在一个事务里，往自己本地消息表里插入一条数据，同时执行其他的业务操作，如果这个消息已经被处理过了，那么此时这个事务会回滚，这样**保证不会重复处理消息**；
4. B 系统执行成功之后，就会更新自己本地消息表的状态以及 A 系统消息表的状态；
5. 如果 B 系统处理失败了，那么就不会更新消息表状态，那么此时 A 系统会定时扫描自己的消息表，如果有未处理的消息，会再次发送到 MQ 中去，让 B 再次处理；
6. 这个方案保证了最终一致性，哪怕 B 事务失败了，但是 A 会不断重发消息，直到 B 那边成功为止。

这个方案说实话最大的问题就在于**严重依赖于数据库的消息表来管理事务**啥的，会导致如果是高并发场景咋办呢？咋扩展呢？所以一般确实很少用。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141011026.png" alt="image-20220814101111943" style="zoom:80%;" />



## 可靠消息最终一致性方案 

这个的意思，就是干脆不要用本地的消息表了，直接基于 MQ 来实现事务。比如阿里的 RocketMQ 就支持消息事务。大概的意思就是：

1. A 系统先发送一个 prepared 消息到 mq，如果这个 prepared 消息发送失败那么就直接取消操作别执行了；
2. 如果这个消息发送成功过了，那么接着执行本地事务，如果成功就告诉 mq 发送确认消息，如果失败就告诉 mq 回滚消息；
3. 如果发送了确认消息，那么此时 B 系统会接收到确认消息，然后执行本地的事务；
4. mq 会自动**定时轮询**所有 prepared 消息回调你的接口，问你，这个消息是不是本地事务处理失败了，所有没发送确认的消息，是继续重试还是回滚？一般来说这里你就可以查下数据库看之前本地事务是否执行，如果回滚了，那么这里也回滚吧。这个就是避免可能本地事务执行成功了，而确认消息却发送失败了。
5. 这个方案里，要是系统 B 的事务失败了咋办？重试咯，自动不断重试直到成功，如果实在是不行，要么就是针对重要的资金类业务进行回滚，比如 B 系统本地回滚后，想办法通知系统 A 也回滚；或者是发送报警由人工来手工回滚和补偿。
6. 这个还是比较合适的，目前国内互联网公司大都是这么玩儿的，要不你举用 RocketMQ 支持的，要不你就自己基于类似 ActiveMQ？RabbitMQ？自己封装一套类似的逻辑出来，总之思路就是这样子的。

## 最大努力通知方案 

这个方案的大致意思就是：

1. 系统 A 本地事务执行完之后，发送个消息到 MQ；
2. 这里会有个专门消费 MQ 的**最大努力通知服务**，这个服务会消费 MQ 然后写入数据库中记录下来，或者是放入个内存队列也可以，接着调用系统 B 的接口；
3. 要是系统 B 执行成功就 ok 了；要是系统 B 执行失败了，那么最大努力通知服务就定时尝试重新调用系统 B，反复 N 次，最后还是不行就放弃。

##  你们公司是如何处理分布式事务的？ 

如果你真的被问到，可以这么说，我们某某特别严格的场景，用的是 TCC 来保证强一致性；然后其他的一些场景基于阿里的 RocketMQ 来实现分布式事务。

你找一个严格资金要求绝对不能错的场景，你可以说你是用的 TCC 方案；如果是一般的分布式事务场景，订单插入之后要调用库存服务更新库存，库存数据没有资金那么的敏感，可以用可靠消息最终一致性方案。











