

# Maven基础概述

## 课程思路

### 小白

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302041536703.png" alt="image-20230204153638639" style="zoom: 50%;" />

### 普通开发人员

![image-20230204153713708](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302041537351.png)

### 资深开发人员

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302041539301.png" alt="image-20230204153956180" style="zoom:67%;" />

## 应用场景

### 自动部署

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302041533587.png" alt="image-20230204153305399" style="zoom:67%;" />

### 私有仓库

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302041534739.png" alt="image-20230204153426644" style="zoom:67%;" />

## 为什么学 Maven

> - **管理规模庞大的 jar 包，需要专门工具。**
> - **脱离 IDE 环境执行构建操作，需要专门工具。**

### 作为依赖管理工具

> 随着我们使用越来越多的框架，或者框架封装程度越来越高，项目中使用的jar包也越来越多。项目中，一个模块里面用到上百个jar包是非常正常的。比如下面的例子，我们只用到 SpringBoot、SpringCloud 框架中的三个功能，最终却导入了 106 个 jar 包：

- Nacos 服务注册发现
- Web 框架环境
- 图模板技术 Thymeleaf

而如果使用 Maven 来引入这些 jar 包只需要配置三个『**依赖**』：

```xml
<!-- Nacos 服务注册发现启动器 -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>

<!-- web启动器依赖 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- 视图模板技术 thymeleaf -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

> 框架中使用的 jar 包，不仅数量庞大，而且彼此之间存在错综复杂的依赖关系。依赖关系的复杂程度，已经上升到了完全不能靠人力手动解决的程度。另外，jar 包之间有可能产生冲突。增加了我们在 jar 包使用过程中的难度

> 而实际上 jar 包之间的依赖关系是普遍存在的，如果要由程序员手动梳理无疑会增加极高的学习成本，而这些工作又对实现业务功能毫无帮助。而使用 Maven 则几乎不需要管理这些关系，极个别的地方调整一下即可，极大的减轻了我们的工作量。

### 作为构建管理工具

> 你没有注意过的构建：你可以不使用 Maven，但是构建必须要做。当我们使用 IDEA 进行开发时，构建是 IDEA 替我们做的。

脱离 IDE 环境仍需构建

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302041546839.png" alt="image-20230204154607748" style="zoom:67%;" />

## 什么是 Maven

### 构建

> Java 项目开发过程中，构建指的是使用**『原材料生产产品』**的过程。

#### 原材料

> Java 源代码、基于 HTML 的 Thymeleaf 文件、图片、配置文件

#### 产品 & 构建

> 产品：一个可以在服务器上运行的项目

构建过程包含的主要的环节：

> - 清理：删除上一次构建的结果，为下一次构建做好准备
> - 编译：Java 源程序编译成 *.class 字节码文件
> - 测试：运行提前准备好的测试程序
> - 报告：针对刚才测试的结果生成一个全面的信息

#### 打包 & 安装 & 部署

> - Java工程：jar包
> - Web工程：war包

> - 安装：把一个 Maven 工程经过打包操作生成的 jar 包或 war 包存入 Maven 仓库


可选其实就是『可有可无』。官网的解释是：

![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img013.b6ada9b0.png)

其核心含义是：Project X 依赖 Project A，A 中一部分 X 用不到的代码依赖了 B，那么对 X 来说 B 就是『可有可无』的。

![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img012.b802c22a.png)

### 版本仲裁

> 其实 Maven 的版本仲裁机制只是在没有人为干预的情况下，自主决定 jar 包版本的一个办法。而实际上我们要使用具体的哪个版本，还要取决于项目中的实际情况。所以在项目正常运行的情况下，jar 包版本可以由 Maven 仲裁，不必我们操心；而发生冲突时 Maven 仲裁决定的版本无法满足要求，此时就应该由程序员明确指定 jar 包版本

#### ①最短路径优先

在下图的例子中，对模块 pro25-module-a 来说，Maven 会采纳 1.2.12 版本。

![image-20230205135639250](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302051356336.png)

#### ②路径相同时先声明者优先

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302051357455.png" alt="image-20230205135708374" style="zoom:67%;" />

此时 Maven 采纳哪个版本，取决于在 pro29-module-x 中，对 pro30-module-y 和 pro31-module-z 两个模块的依赖哪一个先声明。



## Maven 自定义插件

### 本节定位

> 其实实际开发中**几乎没有什么场景需要我们开发自定义 Maven 插件**，所以本节只是通过这个角度帮助我们更好的理解插件的目标和生命周期阶段之间的关系。

### 插件开发

#### ①创建工程

#### ②设定打包方式

```xml
<packaging>maven-plugin</packaging>
```

#### ③引入依赖

下面两种方式二选一：

##### [1]将来在文档注释中使用注解

```xml
<dependency>


- 首先为每一个环境声明一个 profile
  - 环境 A：profile A
  - 环境 B：profile B
  - 环境 C：profile C
  - ……
- 然后激活某一个 profile

#### ④默认 profile

其实即使我们在 pom.xml 中不配置 profile 标签，也已经用到 profile了。为什么呢？因为根标签 project 下所有标签相当于都是在设定默认的 profile。这样一来我们也就很容易理解下面这句话：project 标签下除了 modelVersion 和坐标标签之外，其它标签都可以配置到 profile 中。

### profile 配置

#### ①外部视角：配置文件

从外部视角来看，profile 可以在下面两种配置文件中配置：

- settings.xml：全局生效。其中我们最熟悉的就是配置 JDK 1.8。
- pom.xml：当前 POM 生效

#### ②内部实现：具体标签

从内部视角来看，配置 profile 有如下语法要求：

##### [1] profiles/profile 标签

- 由于 profile 天然代表众多可选配置中的一个所以由复数形式的 profiles 标签统一管理。
- 由于 profile 标签覆盖了 pom.xml 中的默认配置，所以 profiles 标签通常是 pom.xml 中的最后一个标签。

##### [2]id 标签

每个 profile 都必须有一个 id 标签，指定该 profile 的唯一标识。这个 id 标签的值会在命令行调用 profile 时被用到。这个命令格式是：-D<profile id>。

##### [3]其它允许出现的标签

一个 profile 可以覆盖项目的最终名称、项目依赖、插件配置等各个方面以影响构建行为。

- build
  - defaultGoal
  - finalName
  - resources
  - testResources
  - plugins
- reporting
- modules
- dependencies
- dependencyManagement
- repositories
- pluginRepositories
- properties

### 激活 profile

#### ①默认配置默认被激活

前面提到了，POM 中没有在 profile 标签里的就是默认的 profile，当然默认被激活。

#### ②基于环境信息激活

环境信息包含：JDK 版本、操作系统参数、文件、属性等各个方面。一个 profile 一旦被激活，那么它定义的所有配置都会覆盖原来 POM 中对应层次的元素。大家可以参考下面的标签结构：

```xml
<profile>
	<id>dev</id>
    <activation>
        <!-- 配置是否默认激活 -->
    	<activeByDefault>false</activeByDefault>
        <jdk>1.5</jdk>
        <os>
        	<name>Windows XP</name>
            <family>Windows</family>
            <arch>x86</arch>
            <version>5.1.2600</version>
        </os>
        <property>
        	<name>mavenVersion</name>
            <value>2.0.5</value>
        </property>
        <file>
        	<exists>file2.properties</exists>
            <missing>file1.properties</missing>
        </file>
    </activation>
</profile>
```

这里有个问题是：多个激活条件之间是什么关系呢？

- Maven **3.2.2 之前**：遇到第一个满足的条件即可激活——**或**的关系。
- Maven **3.2.2 开始**：各条件均需满足——**且**的关系。

下面我们来看一个具体例子。假设有如下 profile 配置，在 JDK 版本为 1.6 时被激活：

```xml
<profiles>
	<profile>
    	<id>JDK1.6</id>
        <activation>
            <!-- 指定激活条件为：JDK 1.6 -->
        	<jdk>1.6</jdk>
        </activation>
        ……
    </profile>
</profiles>
```

这里需要指出的是：Maven 会自动检测当前环境安装的 JDK 版本，只要 JDK 版本是以 1.6 开头都算符合条件。下面几个例子都符合：

- 1.6.0_03
- 1.6.0_02
- ……

#### ③命令行激活

##### [1]列出活动的 profile

```sh
# 列出所有激活的 profile，以及它们在哪里定义
mvn help:active-profiles
```

##### [2]指定某个具体 profile

```xml
mvn compile -P<profile id>
```

### 操作举例

#### ①编写 Lambda 表达式代码

Lambda 表达式代码要求 JDK 版本必须是 1.8，我们可以以此来判断某个指定更低 JDK 版本的 profile 是否被激活生效。

```java
@Test
public void test() {
    new Thread(()->{
        System.out.println(Thread.currentThread().getName() + " is working");
    }).start();
}
```

以目前配置运行这个测试方法：

![images](data:image/png;base64,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)

#### ②配置 profile

```xml
<profiles>
    <profile>
        <id>myJDKProfile</id>
        <!-- build 标签：意思是告诉 Maven，你的构建行为，我要开始定制了！ -->
        <build>
            <!-- plugins 标签：Maven 你给我听好了，你给我构建的时候要用到这些插件！ -->
            <plugins>
                <!-- plugin 标签：这是我要指定的一个具体的插件 -->
                <plugin>
                    <!-- 插件的坐标。此处引用的 maven-compiler-plugin 插件不是第三方的，
                         是一个 Maven 自带的插件。 -->
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <version>3.1</version>

                    <!-- configuration 标签：配置 maven-compiler-plugin 插件 -->
                    <configuration>
                        <!-- 具体配置信息会因为插件不同、需求不同而有所差异 -->
                        <source>1.6</source>
                        <target>1.6</target>
                        <encoding>UTF-8</encoding>
                    </configuration>
                </plugin>
            </plugins>
        </build>
    </profile>
</profiles>
```

#### ③执行构建命令

```sh
mvn clean test -PmyJDKProfile
```

![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img024.4eeaea9b.png)

### 资源属性过滤

#### ①简介

> Maven 为了能够通过 profile 实现各不同运行环境切换，提供了一种『资源属性过滤』的机制。通过属性替换实现不同环境使用不同的参数。

#### ②操作演示

##### [1]配置 profile

```xml
<profiles>
    <profile>
        <id>devJDBCProfile</id>
        <properties>
            <dev.jdbc.user>root</dev.jdbc.user>
            <dev.jdbc.password>atguigu</dev.jdbc.password>
            <dev.jdbc.url>:3306/db_good</dev.jdbc.url>
            <dev.jdbc.driver>com.mysql.jdbc.Driver</dev.jdbc.driver>
        </properties>
        <build>
            <resources>
                <resource>
                    <!-- 表示为这里指定的目录开启资源过滤功能 -->
                    <directory>src/main/resources</directory>

                    <!-- 将资源过滤功能打开 -->
                    <filtering>true</filtering>
                </resource>
            </resources>
        </build>
    </profile>
</profiles>
```

##### [2]创建待处理的资源文件

```properties
dev.user=${dev.jdbc.user}
dev.password=${dev.jdbc.password}
dev.url=${dev.jdbc.url}
dev.driver=${dev.jdbc.driver}
```

##### [3]执行处理资源命令

```sh
mvn clean resources:resources -PdevJDBCProfile
```

##### [4]找到处理得到的资源文件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302051659754.png" alt="image-20230205165918660" style="zoom:67%;" />

##### [5]延伸

我们时不时会在 resource 标签下看到 includes 和 excludes 标签。它们的作用是：

- includes：指定执行 resource 阶段时要包含到目标位置的资源
- excludes：指定执行 resource 阶段时要排除的资源

情看下面的例子：

```xml
<build>
    <resources>
        <resource>
            <!-- 表示为这里指定的目录开启资源过滤功能 -->
            <directory>src/main/resources</directory>

            <!-- 将资源过滤功能打开 -->
            <filtering>true</filtering>

            <includes>
                <include>*.properties</include>
            </includes>

            <excludes>
                <exclude>happy.properties</exclude>
            </excludes>
        </resource>
    </resources>
</build>
```

执行处理资源命令：

```sh
mvn clean resources:resources -PdevJDBCProfile
```

执行效果如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302051659690.png" alt="image-20230205165902596" style="zoom:67%;" />

当然我们这里只是以 properties 文件为例，并不是只能处理 properties 文件。





# Maven 私服：Nexus

## 1、Nexus 安装

### ①下载地址

小诀窍：使用迅雷下载比直接用浏览器下载快很多

https://download.sonatype.com/nexus/3/latest-unix.tar.gz

### ②上传、解压

上传到 Linux 系统，解压后即可使用，不需要安装。但是需要**注意**：必须提前安装 JDK。

```sh
tar -xvf latest-unix.tar.gz
```

### ③启动 Nexus

```sh
cd nexus-3.45.1-01/
bin/nexus start
```

```sh
bin/nexus status
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302051725326.png" alt="image-20230205172521205" style="zoom:67%;" />

### ④查看端口占用情况

```sh
netstat -anp | grep java
```

上面 45614 这个每次都不一样，不用管它。我们要访问的是 8081 这个端口。但是需要**注意**：8081 端口的这个进程要在启动 /opt/nexus-3.37.0-01/bin/nexus 这个主体程序**一、两分钟**后才会启动，请耐心等待。

### ⑤访问 Nexus 首页

首页地址：http://[Linux 服务器地址]:8081/，初始化界面还是很酷的：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302051726986.png" alt="image-20230205172649763" style="zoom:67%;" />

## 2、初始设置

![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img002.e1ac8197.png)

![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img003.97a620db.png)

这里参考提示：

- 用户名：admin
- 密码：查看 **/root/sonatype-work/nexus3/admin.password** 文件

```sh
cat /root/sonatype-work/nexus3/admin.password
```

所以登录信息输入如下：

![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img004.266b8a05.png)

继续执行初始化：

![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img005.4b81e5ab.png)

给 admin 用户指定新密码：

![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img006.43ebb0ac.png)

匿名登录，启用还是禁用？由于启用匿名登录后，后续操作比较简单，这里我们演示禁用匿名登录的操作方式：

![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img007.9291087d.png)

完成：

![images](data:image/png;base64,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)

## 3、对接 Nexus

### ①通过 Nexus 下载 jar 包

#### [1]了解 Nexus 上的各种仓库

![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img009.7f737ed7.png)

| 仓库类型 | 说明                                           |
| -------- | ---------------------------------------------- |
| proxy    | 某个远程仓库的代理                             |
| group    | 存放：通过 Nexus 获取的第三方 jar 包           |
| hosted   | 存放：本团队其他开发人员部署到 Nexus 的 jar 包 |

| 仓库名称        | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| maven-central   | Nexus 对 Maven 中央仓库的代理                                |
| maven-public    | Nexus 默认创建，供开发人员下载使用的组仓库                   |
| maven-releasse  | Nexus 默认创建，供开发人员部署自己 jar 包的宿主仓库 要求 releasse 版本 |
| maven-snapshots | Nexus 默认创建，供开发人员部署自己 jar 包的宿主仓库 要求 snapshots 版本 |

初始状态下，这几个仓库都没有内容：

![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img010.e3573d0b.png)

#### [2]使用空的本地仓库

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302051730174.png" alt="image-20230205173017039" style="zoom:80%;" />

```xml
<!-- 配置一个新的 Maven 本地仓库 -->
<localRepository>D:/maven-repository-new</localRepository>
```

#### [3]指定 Nexus 服务器地址

把我们原来配置阿里云仓库地址的 mirror 标签改成下面这样：

```xml
<mirror>
	<id>nexus-mine</id>
	<mirrorOf>central</mirrorOf>
	<name>Nexus mine</name>
	<url>http://192.168.198.100:8081/repository/maven-public/</url>
</mirror>
```

这里的 url 标签是这么来的：

![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img012.5a3b1f11.png)



![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img013.959ab72e.png)

把上图中看到的地址复制出来即可。如果我们在前面允许了匿名访问，到这里就够了。但如果我们禁用了匿名访问，那么接下来我们还要继续配置 settings.xml：

```xml
<server>
  <id>nexus-mine</id>
  <username>admin</username>
  <password>315217ren</password>
</server>
```

这里需要**格外注意**：server 标签内的 id 标签值必须和 mirror 标签中的 id 值一样。

#### [4]效果

找一个用到框架的 Maven 工程，执行命令：

```sh
mvn clean compile
```

下载过程日志：

> Downloading from nexus-mine: http://192.168.198.100:8081/repository/maven-public/com/jayway/jsonpath/json-path/2.4.0/json-path-2.4.0.pom
> Downloaded from nexus-mine: http://192.168.198.100:8081/repository/maven-public/com/jayway/jsonpath/json-path/2.4.0/json-path-2.4.0.pom (2.6 kB at 110 kB/s)
> Downloading from nexus-mine: http://192.168.198.100:8081/repository/maven-public/net/minidev/json-smart/2.3/json-smart-2.3.pom
> Downloaded from nexus-mine: http://192.168.198.100:8081/repository/maven-public/net/minidev/json-smart/2.3/json-smart-2.3.pom (9.0 kB at 376 kB/s)
> Downloading from nexus-mine: http://192.168.198.100:8081/repository/maven-public/net/minidev/minidev-parent/2.3/minidev-parent-2.3.pom
> Downloaded from nexus-mine: http://192.168.198.100:8081/repository/maven-public/net/minidev/minidev-parent/2.3/minidev-parent-2.3.pom (8.5 kB at 404 kB/s)
> Downloading from nexus-mine: http://192.168.198.100:8081/repository/maven-public/net/minidev/accessors-smart/1.2/accessors-smart-1.2.pom
> Downloaded from nexus-mine: http://192.168.198.100:8081/repository/maven-public/net/minidev/accessors-smart/1.2/accessors-smart-1.2.pom (12 kB at 463 kB/s)

下载后，Nexus 服务器上就有了 jar 包：

![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img014.cc0e87c3.png)

### ②将 jar 包部署到 Nexus

#### [1]配置 Maven 工程

> 在POM.xml中进行配置

```xml
<distributionManagement>
    <snapshotRepository>
        <id>nexus-mine</id>
        <name>Nexus Snapshot</name>
        <url>http://192.168.198.100:8081/repository/maven-snapshots/</url>
    </snapshotRepository>
</distributionManagement>
```

这里 snapshotRepository 的 id 标签也必须和 settings.xml 中指定的 mirror 标签的 id 属性一致。

#### [2]执行部署命令

```sh
mvn deploy
```

> Uploading to nexus-mine: http://192.168.198.100:8081/repository/maven-snapshots/com/atguigu/demo/demo07-redis-data-provider/1.0-SNAPSHOT/maven-metadata.xml
> Uploaded to nexus-mine: http://192.168.198.100:8081/repository/maven-snapshots/com/atguigu/demo/demo07-redis-data-provider/1.0-SNAPSHOT/maven-metadata.xml (786 B at 19 kB/s)
> Uploading to nexus-mine: http://192.168.198.100:8081/repository/maven-snapshots/com/atguigu/demo/demo07-redis-data-provider/maven-metadata.xml
> Uploaded to nexus-mine: http://192.168.198.100:8081/repository/maven-snapshots/com/atguigu/demo/demo07-redis-data-provider/maven-metadata.xml (300 B at 6.5 kB/s)
> [INFO] ------------------------------------------------------------------------
> [INFO] Reactor Summary:
> [INFO]
> [INFO] demo-imperial-court-ms-show 1.0-SNAPSHOT ........... SUCCESS [ 1.875 s]
> [INFO] demo09-base-entity ................................. SUCCESS [ 21.883 s]
> [INFO] demo10-base-util ................................... SUCCESS [ 0.324 s]
> [INFO] demo08-base-api .................................... SUCCESS [ 1.171 s]
> [INFO] demo01-imperial-court-gateway ...................... SUCCESS [ 0.403 s]
> [INFO] demo02-user-auth-center ............................ SUCCESS [ 2.932 s]
> [INFO] demo03-emp-manager-center .......................... SUCCESS [ 0.312 s]
> [INFO] demo04-memorials-manager-center .................... SUCCESS [ 0.362 s]
> [INFO] demo05-working-manager-center ...................... SUCCESS [ 0.371 s]
> [INFO] demo06-mysql-data-provider ......................... SUCCESS [ 6.779 s]
> [INFO] demo07-redis-data-provider 1.0-SNAPSHOT ............ SUCCESS [ 0.273 s]

![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img015.b413af9d.png)

### ③引用别人部署的 jar 包

#### [1]提出问题

- 默认访问的 Nexus 仓库：maven-public
- 存放别人部署 jar 包的仓库：maven-snapshots

#### [2]配置 Maven 工程

> 配置在POM.xml中

```xml
<repositories>
    <repository>
        <id>nexus-mine</id>
        <name>nexus-mine</name>
        <url>http://192.168.198.100:8081/repository/maven-snapshots/</url>
        <snapshots>
            <enabled>true</enabled>
        </snapshots>
        <releases>
            <enabled>true</enabled>
        </releases>
    </repository>
</repositories>
```

## 4、修改仓库配置

举例：修改 maven-central 仓库代理的远程库地址

![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img128.714c1100.png)

![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img129.c33151a5.png)

![images](data:image/png;base64,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)



# jar包冲突问题

## 1、谁需要面对 jar 包冲突？

先给结论：编订依赖列表的程序员。初次设定一组依赖，因为尚未经过验证，所以确实有可能存在各种问题，需要做有针对性的调整。那么谁来做这件事呢？我们最不希望看到的就是：团队中每个程序员都需要自己去找依赖，即使是做同一个项目，每个模块也各加各的依赖，没有统一管理。那前人踩过的坑，后人还要再踩一遍。而且大家用的依赖有很多细节都不一样，版本更是五花八门，这就让事情变得更加复杂。

所以虽然初期需要根据项目开发和实际运行情况对依赖配置不断调整，最终确定一个各方面都 OK 的版本。但是一旦确定下来，放在父工程中做依赖管理，各个子模块各取所需，这样基本上就能很好的避免问题的扩散。

即使开发中遇到了新问题，也可以回到源头检查、调整 dependencyManagement 配置的列表——而不是每个模块都要改。所以学完这一节你应该就会对前面讲过的『继承』有了更深的理解。

## 2、表现形式

由于实际开发时我们往往都会整合使用很多大型框架，所以一个项目中哪怕只是一个模块也会涉及到大量 jar 包。数以百计的 jar 包要彼此协调、精密配合才能保证程序正常运行。而规模如此庞大的 jar 包组合在一起难免会有磕磕碰碰。最关键的是由于 jar 包冲突所导致的问题非常诡异，这里我们只能罗列较为典型的问题，而没法保证穷举。

但是我们仍然能够指出一点：一般来说，由于我们自己编写代码、配置文件写错所导致的问题通常能够在异常信息中看到我们自己类的全类名或配置文件的所在路径。如果整个错误信息中完全没有我们负责的部分，全部是框架、第三方工具包里面的类报错，这往往就是 jar 包的问题所引起的。

而具体的表现形式中，主要体现为找不到类或找不到方法。

### ①抛异常：找不到类

此时抛出的常见的异常类型：

- java.lang.**ClassNotFoundException**：编译过程中找不到类
- java.lang.**NoClassDefFoundError**：运行过程中找不到类
- java.lang.**LinkageError**：不同类加载器分别加载的多个类有相同的全限定名

我们来举个例子：

```xml
<dependency>
    <groupId>org.apache.httpcomponents</groupId>
    <artifactId>httpclient</artifactId>
    <version>4.x.x</version>
</dependency>
```

httpclient 这个 jar 包中有一个类：org.apache.http.conn.ssl.NoopHostnameVerifier。这个类在较低版本中没有，但在较高版本存在。比如：

| jar 包版本 | 是否存在 |
| ---------- | -------- |
| 4.3.6      | 否       |
| 4.4        | 是       |

那当我们确实需要用到 NoopHostnameVerifier 这个类，我们看到 Maven 通过依赖传递机制引入了这个 jar 包，所以没有明确地显式声明对这个 jar 包的依赖。可是 Maven 传递过来的 jar 包是 4.3.6 版本，里面没有包含我们需要的类，就会抛出异常。

而『冲突』体现在：4.3.6 和 4.4 这两个版本的 jar 包都被框架所依赖的 jar 包给传递进来了，但是假设 Maven 根据**『版本仲裁』**规则实际采纳的是 4.3.6。

### ②抛异常：找不到方法

程序找不到符合预期的方法。这种情况多见于通过反射调用方法，所以经常会导致：java.lang.NoSuchMethodError。比如 antlr:antlr:x.x.x 这个包中有一个接口：antlr.collections.AST

| 版本  | getLine()方法 |
| ----- | ------------- |
| 2.7.2 | 无            |
| 2.7.6 | 有            |

### ③没报错但结果不对

发生这种情况比较典型的原因是：两个 jar 包中的类分别实现了同一个接口，这本来是很正常的。但是问题在于：由于没有注意命名规范，两个不同实现类恰巧是同一个名字。

![images](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAACGCAIAAABsTJAZAAAP80lEQVR42u2df2gcxxXH5/7pHyU1DqGlTlIjW0dCCmnllqSklYWcJpJoSZHoH5UMxXJbHHT9w1Jx7RAMssGEyg2VQkGipsHqP9UV0lqUNlhunIhabWhCajWFGAf9Qk2c0BIkHCg0/6Rv9U5PT7Oze7N3t9qd3ffFHHerudnR+LPvvu/daqbw8ccfK5EoKyoI0KIsSYAWZUoCtChTEqBFmZIALcqUBGhRpiRA16VCoTA1NdXb26sdP3/+/KlTp2Rud14CdF0KAhp/NDAwMD4+rh1fWlpqbm627N/YgyhEAnRdIqBtMOUtR0ZGTp48WbVzATqqBOi6pEVogLWjo2NhYYG3KZVKbW1tvI0AHZ8E6FpULpf7+vr4ESQPYAV84eXly5fxOJppjq8AHasE6Lpk9NBw8Nq1a62trXNzcwcPHlxcXNy/fz/9VICOVQJ0XSKgi8UigBveuLOzEyK3AB2rBOi6ZIzQiCwGaf9bBOhYJUDXJWAO0NRKzuFFaAE6VgnQtQuAg0egUytrgP3o6OgIAlGAjlUCdC2iGEyWA+EOF1VCBOj4JEDXJc1DY1mDu2e/nxagY5UAXZc0oP0IdnV1KVaWVgJ0zBKg6xIHulwur66ughVRmxW6Uqk0MTEhdeidlABdl4JuTiJLrdGsBOiYJUDXJSPQmDLivUoAtFYGkbvtYpUAXbsQTQ40OOaZmRm1PTDjl4gUkiVCxyoBuhZhNUNtFqExJKvNG0T97TnEAnSsEqBFmZIA7YzW19fhcffu3UkPJNUSoJ3RgQMHWlpaLl68mPRAUi0BOpogTCYVI6enp3t6eq5fvw5YJz0N6ZUAHU1nzpx57rnn1tbWEjk7BGl4BKaTnob0SoCOIAjP+/btO378OGCdyABWVlZgAOA6+vv7k56MlEqAjiAMz8vLywlmZkePHgXvkewY0iwB2lYQHeETP8HwjIJPCRhGe3u7ZIdGCdC2GhoagtAI/jXx0CjZYYgEaCtheB4eHh4cHEx6LJ4kOwySAG0lcK6zs7NpCM8oyQ6DJEBX1/z8PETEtNEj2aFRAnR1AToQEV955ZWkB7JNkh0aJUBXETiNQ4cOXbp0qbu7O+mx6JLs0C8BuoqAZnhMW3gmSXaoSYAOE4ZAoBk+2ZMei1mSHWoSoMME4RlSLvAbSQ8kTJIdcgnQgUp/eEZJdsglQAfKifCMkuyQJECb5Up4Jkl2iBKgDYIPcQjPTU1NToRnlGSHKAHaoMnJyaGhIQjPbn2CS3aoBGi/MMfq7u4eHR1Neiy1jDzn2aEArWtsbOzs2bNgRsFyJD2WyJLssICLHNNrwpuvd5yfg+vrkF01HTlyJNm7+G319pOF+y9sjf/mMXg80P3b+RsfaAe939TXMoMH7/sFRujqi3XnRGfPKiB5bW3NDRv69pP+Yyvvfrjv0amLP2nv77kv6fHtqIBvLzoL0CQIz/v2eY/O2DAT0KCjT81OX11Zvnp4965PJD3EnVMFaMU+f3MuCM9jYy4BDV6RPn+51m9/BMaj/eE9EKeTHuMOzkbOgZ6fV2ArKPHD8Dw46FkO14EGTb+00vPDK9env93ywF2VX/D2R+BG6GX2lHegjx71IKZvTiA8T06q69eBcmemIwRotZEdwiMwjS9nX7t16Lt/WHu9P8s+BJJClVegh4bUykoFaHhy4IAXnoeHvflIemi2Cgdayw4xZmcf6NwmhQA0uA68cR+eT09jeFYOAR2UFJJ4dpiXCJ1boMFjIMQYnkdHFd4EUSg446GrAs2zw8wDnfeyHZrm5WXPTM/OVsIzuOo774RMsWkZfpB+mYAGiCcv3Rw88iC+pOxw/cP/5QJolVcPPTbmMQ0e+tAhdfGiF56Bb/AeG5liGv8k1i+jh56/8QFEZaB29OmvonvG7HD06UcA6OWX+5ru+VTSA49nNnIONOLb3u4RDH4D4IY4DVgD6K5YjpCkcOiZV8d+9c+WB+46fuRBsByQHQLck5feFqAzKzDQPT3ek5YWz0bDI2C9cUuPM9NRtcpx9udvAMRYe8YbPDIMtKc8l+0IaLDOw8NebN68fcOZ6QgHGgUcDz3z19nX3sOX2Qc6t0khGAxwz2A5wEBvv1HUGaCrVjlIkBqCCYGYzb87zKDyDDTYDDTNmrJUttMErrr7saasRui8l+2ClGGgs628J4VBcghoGw+dHwnQZgnQjkqADpIz0yFA68pz2S5YzkyHAK0rz1WOYDkDtCSFugRovxzy0AI0VwPKdvB/PzWlent3aMSlklpaUpcvxzwv+QC66/sv7v/crvEzrTsz0vO//MeF39xY+FOMrNSbFM7NqXPn1MxMINPlsurr0w+OjKhTpwL7vHZNtbZu9X/w4Lax+YGGU5w+rRYWGjov7gBdj4cGoGfm3hno+7yR6bk33j94+PfawZEff+XUT/8W1OHUz77e+81mfL70r9vNj5UXX+qFawaP+IHGUzQwB4gANJA0MRGtd45msag6OtT4+MavsYEp/2llCpZUc/O24wjr4qIaGKi8VwMa14iBn544ofbv1weAHWojsZqXbAFd/uNi34+uRuoWwD35gy/ic+AeHi8//w21iSkHd2sk91/gx+Gkk7+7CRdMZ+u9+F4N6OLj5cXV23A5HX6i2Prlz+JBaOO/YOyJjwa0/We9H80goDGEA7KAo/9dlanZaIPH+TC6urzAHBKbz5+vfBTQ9WAtN2hWUYC2xwJQO/adB6oCjfH12q+/hThqQKOwDR7nQJfOzE1MveUfkhFoEJ2luizLdkSS3wYgiNx1NBZo4zCs/mOKlSfQf8SAm1mgATsNDsC342v3ctfRQKC5bDw0As37QfSDfJFBUascwNMLL3iRj8jzA+1XVKApuNoL3sujNZ4FYnNTk9dVxMzVGaAjJYWA461//xco5I7CD7SmqEDX4HDUpq/wA41nJN9SXbWV7RAXpIQ/D1I40Bg+wyM0vKu/3+vEMkKj6Yfe7r7b67azM0JtxCEPXVuVA+CjmMefGxUONKV9IREa3wVXUQ0RGt9rGaEjl+04l8gfBNdbt8xJntpkVxO0jAo00HnliheA0XLMzFSxxdgVxWwYNozTPjXMJNDw2X3lL+/wnOzc4EPADUDAA/bWHG6QpB2EeEye2BJoZBQCMFoO79R7dwWFWz/QuL6oZQIQuWwHoDz7rBf5eDzmSVuQao7Q2IBXOeDs8JJKLsZPBnQsIyPq5Mmtl/apoUNA25ftANDX3vwPmAEe7Sh2+oEm1RyhsQGvcgCscHbwxNjAf15/Uti8d5d96br2OjQHlPtgm/YcaEDtwoVKHNWApkIh71lLCrnV5r8ChmR6I9XvLH/NTAJN4qE6pAxHCgJaK55woIlLnoBqSSG32nRV1FnlaMzddkheeA9BQJOXUNuB1oisqq4uz4dge+xfM83YwDo1dINmVffNSUhVOC5BQJOXqIxkE2j8vsa+0IZ1DGzvtxz0/Q7/jiZMlmW7QvSvxjlSQUAjZzgAy7IdXQAhbYK+A7JODTMFNBIWtWfqNghoBFFtomZTtuMXQEgbrR+86sI731KdNyfx0BgiI9BYf8DMUgO6hi8m1eZlGX7t2UV9Z4Cu514OIz1+BQENBIPBXVy9rQEdZBvChZ0Yh2Q5zorqAZpjZ1O2a2vz3Da1pNQNHm08D90ZQtleUButJl35j9m49kLeS3LIQ9cMNLewNmW706Uv8QI2vh1v7bAxA+Qcws9Vp+Wo62477kopOTPGP/IVnDP6OmZ1dRvQcJGAjOUI4GxgQB0+HFglVKFeGT8ZjKz7T5RtoKngAGwRMcYQSL5Cba+dYbFv7547AGue0r386rvGklzx8XJxr3dnX3gOGhTdw+swfFS1JIUUKbV3YcDmPlUrn207d6FSR8M21BUQCZeEH2hME7FZUKGwKrKWqaFDQEdNCqm6rCVtFLCpNzxiDKhIJ4CLbQhooB/69wONJh6b8bs7/MMzAm2fX0YGmmJtiBNF8sKhAWKIe16KxrcfO7btAjC6CGMpo1HKJNDESkiAtLlxAmiGR6y+aaVo/w3WFP75IPGiilRgtp0NS6CpjmtjQDcn2txY+6KkMkcb1wCJR2u8foIuD5sLrCa5QbOyAxpv1LS/HYJngVzaFyXUmJdQeLRGrxLkFqhBhDvpbLSTfySLnsQGPqxU2PhdZZcsRlSmgG6IMMDbwIfXj7L7vtoyWYwg+ZtCk5wBWv6mUJcA7ZdDHlqA5pK17cwSoB2VrJxklkNAy0IzXAK0WQK0oxKgg+TMdAjQumRtO5OcmQ4BWpdUOUxyBmhJCnUJ0H455KEFaC4p25klQDsqSQrNcgho8dBcArRZArSjEqCD5Mx0CNC6pGxnkjPTIUDrkiqHSc4ALUmhLgHaL4c8tADNJWU7swRoRyVJoVkOAS0emkuANkuAdlQCdJCcmQ4BWpeU7UxyZjoEaF1S5TDJGaAlKdSVNqC7urytJ3ZsJ0+jHPLQ6QF67o33+5+ajXVfzaqKpWzH1zCPKtrmwmbVGFpMrPHzklegqy6JG6LSmTl4DFlbw7/HheWKdZHG3/iksB6gaSUkv7RFZMplNTnpNY4DPIeAbqyHrhlo47azJBwhAk1L1dhsHlDD+FNU5dAWueMqlbzd2TjQ6EyA6Tj8SW6Brlna1oYkpNYIdMi7ap+NuCM0X0Ca9osABItFL7jy5UNp+TwuWgoM+mlr0zf2hDFjnI5hvUY3aFaxRWhuD2iRLlyLcWLqLW15O77kLon66fjei3w/Fy1C2240Ya+Gl+0IaL6tPC2SG7SpISIL7a9c2drpp6PDDDScYmWl4p4hmjZ6pUYlQNOmb3x9UQB6YfW2lvYhstD4z6+/RwYaEG97aI8RaP7exvqNihpe5TB6aAjJ8I92Vg5CENoYgdZKH9AMAjNtlqVUw1NDZ4COOynkuwr5V8vlzYxA89KH33IEbZFYl+IDmruIzk7v0QZovq4uWQ4AGoI3EmzczLOxjtchDx0T0OQiwF3QllbhQGvbIdNehufG/873ZwnZ6K0h44+xbMf3FKTn9hF620ALnuGGII3dagki/DTiVt7V5iXfQD/8hU8TeZxC+whNwk0qHn3knr177uDd0k9jAVrF46EJYgzVuNp+JKApYA8MqBMnvA6hB4Sbb0ah7cbZgHlxB+g4PDQnj28iaA+0tqnms8+/efiJ4t2f+WTcliNeoMlywOO5c5WSXDjQ3Fr4u4VEEGKz36CH91nLvOQbaG454OXpsdexuBYCNLcWxm4Ba3iiJYUNW+ScnShdX6zQWvxG7SBjbtCsUvPFimIL9/vV+MwvRA0v28VTdthh5RHouArDO6zGVjnQ9YZvb+yCnAG6UUkhul77jYXSq7TdbZcGOeSh03O3XRokfyRrlgDtqNJ1c1J65BDQKbk5KSUSoM0SoB2VAB0kZ6ZDgNZFZbsCc9HEd14PugQ0f0lwQ6zK6cHNKodIlBH9H48SyceeyTfgAAAAAElFTkSuQmCC)

具体例子是有的同学在实际工作中遇到过：项目中部分模块使用 log4j 打印日志；其它模块使用 logback，编译运行都不会冲突，但是会引起日志服务降级，让你的 log 配置文件失效。比如：你指定了 error 级别输出，但是冲突就会导致 info、debug 都在输出。

## 3、本质

以上表现形式归根到底是**两种基本情况**导致的：

### ①同一jar包的不同版本

![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img101.0a16f272.png)

### ③不同jar包中包含同名类

这里我们拿 netty 来举个例子，netty 是一个类似 Tomcat 的 Servlet 容器。通常我们不会直接依赖它，所以基本上都是框架传递进来的。那么当我们用到的框架很多时，就会有不同的框架用不同的坐标导入 netty。大家可以参照下表对比一下两组坐标：

| 截止到3.2.10.Final版本以前的坐标形式：                       | 从3.3.0.Final版本开始以后的坐标形式：                        |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| <dependency> <groupId>**org.jboss.netty**</groupId> <artifactId>**netty**</artifactId> <version>**3.2.10.Final**</version> </dependency> | <dependency> <groupId>**io.netty**</groupId> <artifactId>**netty**</artifactId> <version>**3.9.2.Final**</version> </dependency> |

但是偏偏这两个**『不同的包』**里面又有很多**『全限定名相同』**的类。例如：

> org.jboss.netty.channel.socket.ServerSocketChannelConfig.class org.jboss.netty.channel.socket.nio.NioSocketChannelConfig.class org.jboss.netty.util.internal.jzlib.Deflate.class org.jboss.netty.handler.codec.serialization.ObjectDecoder.class org.jboss.netty.util.internal.ConcurrentHashMap$HashIterator.class org.jboss.netty.util.internal.jzlib.Tree.class org.jboss.netty.util.internal.ConcurrentIdentityWeakKeyHashMap$Segment.class org.jboss.netty.handler.logging.LoggingHandler.class org.jboss.netty.channel.ChannelHandlerLifeCycleException.class org.jboss.netty.util.internal.ConcurrentIdentityHashMap$ValueIterator.class org.jboss.netty.util.internal.ConcurrentIdentityWeakKeyHashMap$Values.class org.jboss.netty.util.internal.UnterminatableExecutor.class org.jboss.netty.handler.codec.compression.ZlibDecoder.class org.jboss.netty.handler.codec.rtsp.RtspHeaders$Values.class org.jboss.netty.handler.codec.replay.ReplayError.class org.jboss.netty.buffer.HeapChannelBufferFactory.class
>
> ……

其实还有很多，这里列出的只是冰山一角。

当然，如果全限定名相同，类中的代码也完全相同，那么用着也行。问题是如果**『全限定名相同』**，但是**『代码不同』**，那可太坑了。我们随便找一个来看看：

| 坐标信息：org.jboss.netty:netty:jar:3.2.10.Final             |
| ------------------------------------------------------------ |
| **代码截图：** ![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img102.7c201094.png) |

| 坐标信息：io.netty:netty:jar:3.9.2.Final                     |
| ------------------------------------------------------------ |
| **代码截图：** ![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img103.9c32611b.png) |

## 4、解决办法

### ①概述

> 很多情况下常用框架之间的整合容易出现的冲突问题都有人总结过了，拿抛出的异常搜索一下基本上就可以直接找到对应的 jar 包。我们接下来要说的是通用方法。

不管具体使用的是什么工具，基本思路无非是这么两步：

> - 第一步：把彼此冲突的 jar 包找到
> - 第二步：在冲突的 jar 包中选定一个。具体做法无非是通过 exclusions 排除依赖，或是明确声明依赖。

### ②IDEA 的 Maven Helper 插件⭐

这个插件是 IDEA 中安装的插件，不是 Maven 插件。它能够给我们罗列出来同一个 jar 包的不同版本，以及它们的来源。但是对不同 jar 包中同名的类没有办法。

- [在 IDEA 中安装 Maven helper 插件](http://heavy_code_industry.gitee.io/code_heavy_industry/pro002-maven/chapter10/verse02-part01.html)。
- [基于 pom.xml 的依赖冲突分析](http://heavy_code_industry.gitee.io/code_heavy_industry/pro002-maven/chapter10/verse02-part02.html)。

### ③Maven 的 enforcer 插件

> 使用 Maven 的 enforcer 插件既可以检测同一个 jar 包的不同版本，又可以检测不同 jar 包中同名的类。

#### [1]引入 netty 依赖

这里我们引入两个对 netty 的依赖，展示不同 jar 包中有同名类的情况。

```xml
<dependencies>
    <dependency>
        <groupId>org.jboss.netty</groupId>
        <artifactId>netty</artifactId>
        <version>3.2.10.Final</version>
    </dependency>

    <dependency>
        <groupId>io.netty</groupId>
        <artifactId>netty</artifactId>
        <version>3.9.2.Final</version>
    </dependency>
</dependencies>
```

#### [2]配置 enforcer 插件

```xml
<build>
    <pluginManagement>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-enforcer-plugin</artifactId>
                <version>1.4.1</version>
                <executions>
                    <execution>
                        <id>enforce-dependencies</id>
                        <phase>validate</phase>
                        <goals>
                            <goal>display-info</goal>
                            <goal>enforce</goal>
                        </goals>
                    </execution>
                </executions>
                <dependencies>
                    <dependency>
                        <groupId>org.codehaus.mojo</groupId>
                        <artifactId>extra-enforcer-rules</artifactId>
                        <version>1.0-beta-4</version>
                    </dependency>
                </dependencies>
                <configuration>
                    <rules>
                        <banDuplicateClasses>
                            <findAllDuplicates>true</findAllDuplicates>
                        </banDuplicateClasses>
                    </rules>
                </configuration>
            </plugin>
        </plugins>
    </pluginManagement>
</build>
```

#### [3]测试

执行如下 Maven 命令：

```sh
mvn clean package enforcer:enforce
```

部分运行结果：

> [INFO] --- maven-enforcer-plugin:1.4.1:enforce (default-cli) @ pro32-duplicate-class ---
> [WARNING] Rule 0: org.apache.maven.plugins.enforcer.BanDuplicateClasses failed with message:
> Duplicate classes found:
>
> Found in:
> io.netty:netty:jar:3.9.2.Final:compile
> org.jboss.netty:netty:jar:3.2.10.Final:compile
> Duplicate classes:
> org/jboss/netty/channel/socket/ServerSocketChannelConfig.class
> org/jboss/netty/channel/socket/nio/NioSocketChannelConfig.class
> org/jboss/netty/util/internal/jzlib/Deflate.class
> org/jboss/netty/handler/codec/serialization/ObjectDecoder.class
> org/jboss/netty/util/internal/ConcurrentHashMap$HashIterator.class
>
> ……

TIP:最后，问你一个问题：解决 jar 包冲突问题这么麻烦，是不是不该用 Maven？

# 体系外 jar 包引入

## 1、提出问题

『体系外 jar 包』这个名字是我起的，来源是这样——目前来说我们在 Maven 工程中用到的 jar 包都是通过 Maven 本身的机制导入进来的。

而实际开发中确实有可能用到一些 jar 包并非是用 Maven 的方式发布，那自然也没法通过 Maven 导入。

此时如果我们能够拿到该 jar 包的源码那还可以自己建一个 Maven 工程，自己打包。可是如果连源码都没有呢？

这方面的例子包括一些人脸识别用的 jar 包、海康视频监控 jar 包等等。

## 2、解决办法

### ①准备一个体系外 jar 包

我们通过学 Maven 以前的方式创建一个 Java 工程，然后导出 jar 包即可用来测试。

![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img016.4e398cba.png)

![images](data:image/png;base64,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)

![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img018.b2e5347f.png)

![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img019.5b1e9d05.png)

![images](data:image/png;base64,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)

![images](data:image/png;base64,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)

![images](data:image/png;base64,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)

![images](data:image/png;base64,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)

### ②将该 jar 包安装到 Maven 仓库

这里我们使用 install 插件的 install-file 目标：

```sh
mvn install:install-file -Dfile=[体系外 jar 包路径] \
-DgroupId=[给体系外 jar 包强行设定坐标] \
-DartifactId=[给体系外 jar 包强行设定坐标] \
-Dversion=1 \
-Dpackage=jar
```

例如（Windows 系统下使用 ^ 符号换行；Linux 系统用 \）：

```sh
mvn install:install-file -Dfile=D:\idea2019workspace\atguigu-maven-outer\out\artifacts\atguigu_maven_outer\atguigu-maven-outer.jar ^
-DgroupId=com.atguigu.maven ^
-DartifactId=atguigu-maven-outer ^
-Dversion=1 ^
-Dpackaging=jar
```

执行结果：

![images](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img024.5a4875e8.png)

再看本地仓库中确实有：

![imags](data:image/png;base64,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)

我们打开 POM 文件看看：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd" xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.atguigu.maven</groupId>
  <artifactId>atguigu-maven-outer</artifactId>
  <version>1</version>
  <description>POM was created from install:install-file</description>
</project>
```

### ③测试

在其它地方依赖这个 jar 包：

```xml
<dependency>
    <groupId>com.atguigu.maven</groupId>
    <artifactId>atguigu-maven-outer</artifactId>
    <version>1</version>
</dependency>
```

创建对象、调用方法：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302051711011.png" alt="image-20230205171113914" style="zoom:67%;" />

























































