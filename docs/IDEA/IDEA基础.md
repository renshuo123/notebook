

# IDEA 学习⭐⭐

# 认识IntelliJ IDEA

## Why IDEA ?

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230855592.png" alt="image-20221123085543513" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230855644.png" alt="image-20221123085557571" style="zoom:80%;" />

> JetBrains官方说明：尽管我们采取了多种措施确保受访者的代表性，但结果可能会略微偏向 JetBrains 产品的用户，因为这些用户更有可能参加调查。此外，2022年，某美国软件开发商在对近千名专业的Java开发者调研后，发布了《2022年Java开发者生产力报告》。报告提到：JetBrains 的 IntelliJ IDEA是最受欢迎的 Java IDE，占 48% ，其次是 Eclipse，占24%，Visual Studio Code 占 18%。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141029375.png" alt="image-20230114102914288" style="zoom:67%;" />

## Why IDEA 2022.x

在Java 17正式发布之前，Java开发框架Spring率先在官博宣布，Spring Framework 6和Spring Boot 3计划在2022年第四季度实现总体可用性的高端基线：

Java 17+(来自 Spring Framework 5.3.x 线中的 Java 8-17)

Jakarta EE 9+（来自Spring框架5.3.x 线中的 Java EE 7-8）

Spring 官方说明： https://spring.io/blog/2022/01/20/spring-boot-3-0-0-m1-is-now-available

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230857424.png" alt="image-20221123085714337" style="zoom:80%;" />

> 意味着：springboot3.0 是需要用java17和spring6.0为基础建设。如果从企业选型最新springboot3.0作为架构来说，它搭配jdk17肯定是标配了。

## JetBrains 公司介绍

IDEA，是 JetBrains ( **https://www.jetbrains.com/**)公司的产品，该公司成立于2000年，总部位于捷克的布拉格，致力于为开发者打造最高效智能的开发工具。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230858883.png" alt="image-20221123085824817" style="zoom:80%;" />

公司旗下还有其它产品，比如：

WebStorm：用于开发 JavaScript、HTML5、CSS3 等前端技术

PyCharm：用于开发 python

PhpStorm：用于开发 PHP

RubyMine：用于开发 Ruby/Rails

AppCode：用于开发 Objective - C/Swift

CLion：用于开发 C/C++

DataGrip：用于开发数据库和 SQL

Rider：用于开发.NET

GoLand：用于开发 Go

用于开发 Android的Android Studio，也是Google 基于 IDEA 社区版进行迭代的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230859602.png" alt="image-20221123085910528" style="zoom:80%;" />

## IntelliJ IDEA 介绍

IDEA，全称 IntelliJ IDEA ，是 Java 语言的集成开发环境，目前已经（基本） 代替 了Eclipse的使用。IDEA 在业界被公认为是最好的 Java 开发工具（之一），因其 功能强悍 、 设置人性化 ，而深受Java、大数据、移动端程序员的喜爱。尤其在智能代码助手、代码自动提示、重构、J2EE支持、Ant、JUnit、CVS 整合、代码审查、创新的 GUI 设计等方面的功能可以说是超常的。

IntelliJ IDEA 在 2015 年的官网上这样介绍自己：Excel at enterprise, mobile and web development with Java, Scala and Groovy,with all the latestmodern technologies and frameworks available out of thebox.

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230900171.png" alt="image-20221123090001093" style="zoom:80%;" />

 

## IDEA的主要优势：(vs Eclipse)

### 功能强大

① 强大的整合能力。比如：Git、Maven、Spring等

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230900135.png" alt="image-20221123090056068" style="zoom:80%;" />

② 开箱即用的体验（集成版本控制系统、多语言支持的框架随时可用，无需额外安装插件）

**符合人体工程学**

① 高度智能（快速的智能代码补全、实时代码分析、可靠的重构工具）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230902316.png" alt="image-20221123090229208" style="zoom:80%;" />

② 提示功能的快速、便捷、范围广

③ 好用的快捷键和代码模板

④ 精准搜索

 

## IDEA 的下载

下载网址： https://www.jetbrains.com/idea/download/#section=windows

IDEA 分为两个版本： 旗舰版(Ultimate) 和 社区版(Community) 。

IDEA的大版本每年迭代一次，大版本下的小版本（如：2022.x）迭代时间不固定，一般每年3个小版本

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230906919.png" alt="image-20221123090657836" style="zoom:80%;" />

两个不同版本的详细对比

可以参照官网： https://www.jetbrains.com/idea/features/editions_comparison_matrix.html

官网提供的详细使用文档： **https://www.jetbrains.com/help/idea/meet-intellij-idea.html**



# 卸载与安装

## 卸载过程

这里以卸载2022.1.2版本为例说明。在【控制面板】找到【卸载程序】

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230908419.png" alt="image-20221123090815330" style="zoom:80%;" />

右键点击或左键双击IntelliJ IDEA 2022.1.2进行卸载：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230908030.png" alt="image-20221123090833950" style="zoom:80%;" />

如果需要保留下述数据，就不要打√。如果想彻底删除IDEA所有数据，那就打上√。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230908246.png" alt="image-20221123090855172" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230909618.png" alt="image-20221123090906549" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230909133.png" alt="image-20221123090923062" style="zoom:80%;" />

## 清理残留

软件卸载完以后，还需要删除其它几个位置的残留

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230910171.png" alt="image-20221123091029099" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230910862.png" alt="image-20221123091044780" style="zoom:80%;" />

## 安装前的准备

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230911870.png" alt="image-20221123091115797" style="zoom:80%;" />

- 64 位 Microsoft Windows 11、10、8
- 最低 2 GB 可用 RAM，推荐 8 GB 系统总 RAM
- 2.5 GB 硬盘空间，推荐 SSD
- 最低屏幕分辨率 1024x768

从安装上来看，IntelliJ IDEA 对硬件的要求 似乎不是很高 。可是在实际开发中并不是这样的，因为 IntelliJ IDEA 执行时会有大量的缓存、索引文件，所以如果你正在使用 Eclipse / MyEclipse，想通过 IntelliJ IDEA来解决计算机的卡、慢等问题，这基本上是不可能的，本质上你应该对自己的硬件设备进行升级。

## 安装过程

1、下载完安装包，双击直接安装

2、欢迎安装

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230912573.png" alt="image-20221123091209475" style="zoom:67%;" />

3、是否删除电脑上低版本的IDEA（如果有，可以选择忽略）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230912395.png" alt="image-20221123091227293" style="zoom:67%;" />

如果电脑上有低版本的IDEA，可以选择删除或保留。

这里没有卸载旧版本，如果需要卸载，记得勾选下面的保留旧的设置和配置。

4、选择安装目录

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230912406.png" alt="image-20221123091248316" style="zoom:80%;" />

选择安装目录，目录中要避免中文和空格。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230913883.png" alt="image-20221123091309790" style="zoom:67%;" />

5、创建桌面快捷图标等

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230913580.png" alt="image-20221123091331492" style="zoom:67%;" />

确认是否与.java、.groovy、.kt 格式文件进行关联。这里建议不关联。

6、在【开始】菜单新建一个文件夹（这里需要确认文件夹的名称），来管理IDEA的相关内容。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230913479.png" alt="image-20221123091355391" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230914727.png" alt="image-20221123091407638" style="zoom:80%;" />

7、完成安装

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230914140.png" alt="image-20221123091426037" style="zoom:80%;" />

## 注册破解

## 闪退 | 无响应 问题⭐

问题描述1：2022.1启动不了，双击桌面图标，没有响应。

问题描述2：进入到安装目录...\IntelliJ IDEA 2022.1.2\bin，打开CMD。输入idea，发现报错。

解决办法：打开C:\Users\songhk\AppData\Roaming\JetBrains\IntelliJIdea2022.1\idea64.exe.vmoptions

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230915993.png" alt="image-20221123091558919" style="zoom:80%;" />

内容如下所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230916699.png" alt="image-20221123091611636" style="zoom:80%;" />

删除红框的数据以后，再登录即可正常进入。

> 原因：之前使用过的比如2021.2.2版本，pojie了。新版IEDA太智能了，把现有的启运参数也都复制过去
>
> 了。又因为最新的IDEA，不兼容pojie程序-javaagent:D:\develop_tools\IDEA\IntelliJ IDEA
>
> 2021.2.2\bin\jetbrains-agent.jar了，所以报错了，所以JVM结束了，所以没有启动画面，凉凉了。

 

## IDEA卡顿问题⭐

解决方案： 找到idea安装目录下的bin文件夹下的idea.exe.vmoptions文件！

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230954375.png" alt="image-20221123095432306" style="zoom:80%;" />

idea.exe.vmoptions：默认32位机器运行的
idea64.exe.vmoptions：默认64位机器运行的

手动修改：关键的三个参数的说明 

1、 -Xms 是最小启动内存参数
2、 -Xmx 是最大运行内存参数
3、 -XX:ReservedCodeCacheSize 保留代码占用的内存容量参数

```sh
-Xms2048m
-Xmx4096m
-XX:ReservedCodeCacheSize=1024m
```



# HelloWorld的实现

## 1 新建Project - Class

选择"New Project"：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230917859.png" alt="image-20221123091725778" style="zoom:67%;" />

指名工程名、使用的JDK版本等信息。如下所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230918622.png" alt="image-20221123091845541" style="zoom:80%;" />

接着创建Java类：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230919172.png" alt="image-20221123091905102" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230919682.png" alt="image-20221123091918613" style="zoom:80%;" />

## 2 编写代码

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```

## 3 运行

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230921986.png" alt="image-20221123092115915" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230921720.png" alt="image-20221123092125646" style="zoom:80%;" />

# JDK相关设置

## 1 项目的JDK设置

> File-->Project Structure...-->Platform Settings -->SDKs

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230922984.png" alt="image-20221123092258900" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231558811.png" alt="image-20221123155843715" style="zoom:80%;" />

> 注1：SDKs全称是Software Development Kit ，这里一定是选择JDK的安装根目录，不是JRE的目录。
>
> 注2：这里还可以从本地添加多个JDK。使用“+”即可实现。

## 2 out目录和编译版本

> File-->Project Structure...-->Project Settings -->Project

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230925391.png" alt="image-20221123092501307" style="zoom:80%;" />



# IDEA详细设置⭐

## 1 如何打开详细配置界面

### 1、显示工具栏

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230928245.png" alt="image-20221123092819145" style="zoom:80%;" />

### 2、选择详细配置菜单或按钮

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230928709.png" alt="image-20221123092837616" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230928119.png" alt="image-20221123092849047" style="zoom:80%;" />

## 2 系统设置

### 1、默认启动项目配置

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230929962.png" alt="image-20221123092925878" style="zoom:80%;" />

启动IDEA时，默认自动打开上次开发的项目？还是自己选择？

如果去掉Reopen last project on startup前面的对勾，每次启动IDEA就会出现如下界面：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230929013.png" alt="image-20221123092957935" style="zoom:80%;" />

### 2、取消自动更新

> Settings-->Appearance & Behavior->System Settings -> Updates

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230930623.png" alt="image-20221123093040540" style="zoom:80%;" />

默认都打√了，建议检查IDE更新的√去掉，检查插件更新的√选上。



## 3 主题、字体、背景图

### 1、选择主题

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230931140.png" alt="image-20221123093123075" style="zoom:80%;" />

### 2、设置菜单和窗口字体和大小

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230931229.png" alt="image-20221123093152156" style="zoom: 80%;" />

### 3、设置IDEA背景图

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230933541.png" alt="image-20221123093335461" style="zoom: 80%;" />

选择一张合适的图片作为背景，即可。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230934154.png" alt="image-20221123093438070" style="zoom:80%;" />

## 4 设置编辑器主题样式

### 1、编辑器主题

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230935198.png" alt="image-20221123093522133" style="zoom:80%;" />

### 2、字体大小

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230935717.png" alt="image-20221123093547632" style="zoom:80%;" />

更详细的字体与颜色如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230936841.png" alt="image-20221123093611752" style="zoom:80%;" />

> 温馨提示：如果选择某个font字体，中文乱码，可以在fallback font（备选字体）中选择一个支持中文的字体。

### 3、注释的字体颜色

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230937455.png" alt="image-20221123093706362" style="zoom:80%;" />

> Block comment：修改多行注释的字体颜色
>
> Doc Comment –> Text：修改文档注释的字体颜色
>
> Line comment：修改单行注释的字体颜色

### 4、显示行号与方法分隔符

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230937559.png" alt="image-20221123093755484" style="zoom:80%;" />



## 5 代码提示取消大小写匹配

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230939037.png" alt="image-20221123093928956" style="zoom:80%;" />

IntelliJ IDEA 的代码提示和补充功能有一个特性： 区分大小写 。 如果想不区分大小写的话，就把这个对勾去掉。 建议去掉勾选 。



## 6 自动导包、自动移除没用的包

### 1 手动导包

默认需要自己手动导包，Alt+Enter快捷键

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230941038.png" alt="image-20221123094100950" style="zoom:67%;" />

### 2 自动导包设置

动态导入明确的包：Add unambiguous imports on the fly，该设置具有全局性；

优化动态导入的包：Optimize imports on the fly，该设置只对当前项目有效；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211281506513.png" alt="image-20221128150645418" style="zoom:80%;" />



## 7 设置项目文件编码（一定要改）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230955102.png" alt="image-20221123095538000" style="zoom:67%;" />

说明： Transparent native-to-ascii conversion主要用于转换ascii，显式原生内容。一般都要勾选。

## 8 设置控制台的字符编码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230956683.png" alt="image-20221123095648595" style="zoom:80%;" />

## 9 创建文件时自动生成作者和时间信息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230957293.png" alt="image-20221123095711211" style="zoom:80%;" />

比如：

```java
/**
* ClassName: ${NAME}
* Package: ${PACKAGE_NAME}
* Description:
* @Author 任硕
* @Create ${DATE} ${TIME}
* @Version 1.0
*/
```

后面新创建的Java类，就会出现这样的类头

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231620667.png" alt="image-20221123162048580" style="zoom:67%;" />

常用的预设的变量，这里直接贴出官网给的：

```java
${PACKAGE_NAME} - the name of the target package where the new class or interface will
be created.
${PROJECT_NAME} - the name of the current project.
${FILE_NAME} - the name of the PHP file that will be created.
${NAME} - the name of the new file which you specify in the New File dialog box during
the file creation.
${USER} - the login name of the current user.
${DATE} - the current system date.
${TIME} - the current system time.
${YEAR} - the current year.
${MONTH} - the current month.
${DAY} - the current day of the month.
${HOUR} - the current hour.
${MINUTE} - the current minute.
${PRODUCT_NAME} - the name of the IDE in which the file will be created.
${MONTH_NAME_SHORT} - the first 3 letters of the month name. Example: Jan, Feb, etc.
${MONTH_NAME_FULL} - full name of a month. Example: January, February, etc.
```

## 10 设置自动编译

> 可以提高运行速度：Settings-->Build,Execution,Deployment-->Compiler

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211230959776.png" alt="image-20221123095941679" style="zoom:80%;" />

## 11 设置为省电模式(可忽略)

> IntelliJ IDEA 有一种叫做 省电模式 的状态，开启这种模式之后 IntelliJ IDEA 会 关掉代码检查 和 代码提示 等功能。所以一般也可认为这是一种 阅读模式 ，如果你在开发过程中遇到突然代码文件不能进行检查和提示，可以来看看这里是否有开启该功能。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231000814.png" alt="image-20221123100025720" style="zoom:80%;" />

## 12 取消双击shift搜索

因为我们按shift切换中英文输入方式，经常被按到，总是弹出搜索框，太麻烦了。可以取消它。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231002918.png" alt="image-20221123100253831" style="zoom:80%;" />

方式1：适用于IDEA 2022.1.2版本

在2022.1版本中，采用如下方式消双击shift出现搜索框：搜索double即可，勾选Disable double modifier

key shortcuts，禁用这个选项。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231003808.png" alt="image-20221123100312737" style="zoom:80%;" />

方式2：适用于IDEA 2022.1.2之前版本

双击shift 或 ctrl + shift + a，打开如下搜索窗口：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231003061.png" alt="image-20221123100330985" style="zoom:80%;" />

选择registry...，找到"ide.suppress.double.click.handler"，把复选框打上勾就可以取消双击shift出现搜索框了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231003419.png" alt="image-20221123100352323" style="zoom:80%;" />

## 13 取消tab页单行显示

是否在单行显式编辑器选项卡（建议去掉勾选）

tab过多会自动关闭：`settings` - `editor` - `General` - `Editor tabs` - `tab limit` 数值设大就好了

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211281508306.png" alt="image-20221128150851224" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211281509249.png" alt="image-20221128150910173" style="zoom:80%;" />



## 14 设置import显示 * 的个数

设置代码样式：比如，设置import显示"*"时的个数

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231004183.png" alt="image-20221123100454108" style="zoom:80%;" />

> 总结：以上这些设置看似只是针对当前Project设置的，但是新建的其它Project也是同样适用的。

## 15 双斜杠注释改成紧跟代码头

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211281514287.png" alt="image-20221128151419178" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211281514118.png" alt="image-20221128151438031" style="zoom:80%;" />

## 16 优化版本控制的目录颜色展示

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211281516012.png" alt="image-20221128151627926" style="zoom:80%;" />

## 17 显示行号和方法分割线

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211281521522.png" alt="image-20221128152159436" style="zoom: 80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211281522628.png" alt="image-20221128152235540" style="zoom:80%;" />

## 18 选中复制整行

> 原本只会复制你选中的代码，改完配置后，就能复制整行，无论你是否完全选中

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121224424.png" alt="image-20221212122434320" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121224905.png" alt="image-20221212122456819" style="zoom:67%;" />

## 19 关闭代码检查

> 与eclipse类似，idea也可以自己关闭代码检查 减少资源使用，但不推荐全部关闭，（是大佬当我没说），把我们项目中不会使用到的关闭就好了

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121436213.png" alt="image-20221212143614130" style="zoom:80%;" />

## 20 隐藏文件

> 1. 【Files】→【Settings】
> 2. 【Editor】→【File Types】→【Ignored Files and Folders】
> 3. 输入要隐藏的名称，支持*号通配符
> 4. 回车确认添加

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212140953499.png" alt="image-20221214095307419" style="zoom:80%;" />

## 显示usages提示

作用：版本高的idea有时变量方法会有usages提示，它会提示此方法、变量在哪里被使用了，如下图

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304101411510.png" alt="image-20230410141112440" style="zoom:80%;" />

开启\关闭：Setting->Editor->Inlay Hints->Code vision->Usages，选择方框可选择开启或关闭

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304101411710.png" alt="image-20230410141125624" style="zoom:67%;" />

## 日志文件彩色显示

> 依赖插件：ideolog，是默认安装的，无需自己安装

> 进入任一日志文件，点击显示上下文操作，点击日志，配置正则，即可正常显示

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306151034639.png" alt="image-20230615103406562" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306151046423.png" alt="image-20230615104636334" style="zoom:80%;" />



# 强大功能

## 注释更改⭐

> 使用ctrl + r，进行替换

```
/\*\*\s*\*\s*(.*?)\s*\*/
//$1\n
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230627102430580.png" alt="image-20230627102430580" style="zoom:80%;" />

# 配置导入与导出

http://www.taodudu.cc/news/show-1749553.html

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305051455017.png" alt="image-20230505145555919" style="zoom:80%;" />

# 强大功能

## 1.查看代码历史版本

> 鼠标在需要查看的java类 右键 找到`Local History` >> `Show History` 点开即可看到历史版本，常用于自己忘记代码改了哪些内容 或需要恢复至某个版本 (注意 只能看近期修改 太久了也是看不到的)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121426385.png" alt="image-20221212142642267" style="zoom:67%;" />

## 2. 调整idea的虚拟内存

尽管本质都是去改变 .vmoptions配置文件，但推荐使用`Change Memory Settings`去调整，选择`Edit Custom VM Options` 或者在本地磁盘目录更改，通过某些方法破解的idea 很可能造成idea打不开的情况

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121430676.png" alt="image-20221212143033583" style="zoom:67%;" />

## 3 微服务中将不同项目添加到同窗口

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuf7Trj846CBqvOYJ092l1CWWN4Oyq54X5MOxbsR2F85OvzeGicR0ERzZCDbzK49gsTn83WRcAKiaDzw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

步骤：`View` ——>`Tool Windows` ——> `services` ——>`add services`

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuf7Trj846CBqvOYJ092l1CW3hl9l0IVwBrk7hZv22vN2icBGnXWY83gaspAJ5n1xzooVXgKErEPcrQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



### 8. idea同个项目不同端口多开

> 这是个非常实用的功能，可以模拟集群 测试负载均衡。此外 在开发阶段也是非常好用，开发过程中，让别人直接连自己本地测试 是不是非常方便？那自己又想打断点调试 会影响别人 怎么办呢 ？这个时候多开的作用就体现出来了！

> 网上很多方法提到勾选 `Allow parallel run` (不同版本idea 名称不一样) ， 但我本地启动发现每次都会同时同端口启动多个，不知道是版本问题还是操作问题，这里我用的是另一种有效的方法：

在 `VM options` 加上-Dserver.port=8993

8993是区别于 application.yml 配置中 port 的另一个端口  ， 达到不同端口多开的效果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121510110.png" alt="image-20221212151011001" style="zoom:80%;" />



# 工程与模块管理

## IDEA项目结构

### 层级关系

> project(工程) - module(模块) - package(包) - class(类)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141033660.png" style="zoom:60%;" />

### 项目结构

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141031015.png" alt="image-20230114103138947" style="zoom:67%;" />

### 使用步骤

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141033893.png" alt="image-20230114103305797" style="zoom:67%;" />

## Project和Module的概念

这些结构的划分，是为了方便管理功能代码。在 IntelliJ IDEA 中，提出了Project和Module这两个概念。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231007374.png" alt="image-20221123100719287" style="zoom:80%;" />

> 在 IntelliJ IDEA 中Project是 最顶级的结构单元 ，然后就是Module。目前，主流的大型项目结构基本都是多Module的结构，这类项目一般是 按功能划分 的，比如：user-core-module、user-facade-module和user-hessian-module等等，模块之间彼此可以 相互依赖 ，有着不可分割的业务关系。因此，对于一个Project来说：

> 当为单Module项目的时候，这个单独的Module实际上就是一个Project。
>
> 当为多Module项目的时候，多个模块处于同一个Project之中，此时彼此之间具有 互相依赖 的关联关系。
>
> 当然多个模块没有建立依赖关系的话，也可以作为单独一个“小项目”运行。

## 创建Module

建议创建“Empty空工程”，然后创建多模块，每一个模块可以独立运行，相当于一个小项目。JavaSE阶段不涉及到模块之间的依赖。后期再学习模块之间的依赖。

（1）选择创建模块

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231010809.png" alt="image-20221123101038714" style="zoom:80%;" />

（2）选择模块类型：这里选择创建Java模块，给模块命名，确定存放位置

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231010800.png" alt="image-20221123101059708" style="zoom:80%;" />

模块声明在工程下面

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231011109.png" alt="image-20221123101146034" style="zoom:67%;" />

## 删除模块(Module)

（1）移除模块

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231012226.png" alt="image-20221123101214132" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231012765.png" alt="image-20221123101223699" style="zoom:80%;" />

（2）彻底删除模块

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231012159.png" alt="image-20221123101246060" style="zoom:80%;" />



## 导入老师的模块

（1）将老师的模块 teacher_chapter04 整个的复制到自己IDEA项目的路径下

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231013185.png" alt="image-20221123101341112" style="zoom:80%;" />

接着打开自己IDEA的项目，会在项目目录下看到拷贝过来的module，只不过不是以模块的方式呈现。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231013207.png" alt="image-20221123101358123" style="zoom:67%;" />

（2）查看Project Structure，选择import module

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231014459.png" alt="image-20221123101426375" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231014019.png" alt="image-20221123101445932" style="zoom:80%;" />

（3）选择要导入的module：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231015280.png" alt="image-20221123101544174" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231015407.png" alt="image-20221123101554331" style="zoom:80%;" />

（4）接着可以一路Next下去，最后选择Overwrite

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231016474.png" alt="image-20221123101612380" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231016085.png" alt="image-20221123101629011" style="zoom:80%;" />

最后点击OK即可了。

## 同时打开两个IDEA项目工程

### 1、两个IDEA项目工程效果

有些同学想要把上课练习代码和作业代码分开两个IDEA项目工程。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231019220.png" alt="image-20221123101955147" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231020776.png" alt="image-20221123102007706" style="zoom:80%;" />

### 2、新建一个IDEA项目

注意：第一次需要新建，之后直接打开项目工程即可

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231020954.png" alt="image-20221123102035882" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231020924.png" alt="image-20221123102045835" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231020180.png" alt="image-20221123102057098" style="zoom:80%;" />

### 3、打开两个IDEA项目

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231021342.png" alt="image-20221123102123272" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231021575.png" alt="image-20221123102135483" style="zoom: 80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231021580.png" alt="image-20221123102150498" style="zoom:80%;" />



## 导入非IDEA工程代码

### 1、导入Moudle

将相应章节的源文件粘贴到module的src下。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231022331.png" alt="image-20221123102247245" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231023883.png" alt="image-20221123102326790" style="zoom:80%;" />

打开其中各个源文件，会发现有乱码。比如：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231023010.png" alt="image-20221123102344915" style="zoom:80%;" />

### 2、设置编码

当前项目是UTF-8。如果原来的.java文件都是GBK的（如果原来.java文件有的是GBK，有的是UTF-8就比较麻烦了）。可以单独把这两个模块设置为GBK编码的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231024723.png" alt="image-20221123102416624" style="zoom:80%;" />

改为GBK，确认即可。如图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231024645.png" alt="image-20221123102431567" style="zoom:80%;" />

# Live Templates 代码模板

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304152101625.png" alt="image-20230415210121414" style="zoom:80%;" />

## 查看模板后缀补全⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231025053.png" alt="image-20221123102522952" style="zoom:80%;" />

## 查看Live Templates模板实时模板

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231026006.png" alt="image-20221123102603887" style="zoom:80%;" />

每次编码过程中，只要输入模板代码缩写，便可帮助我们自动生成相应代码：

![图片](https://mmbiz.qpic.cn/mmbiz_png/yAZ9womsrh9moRJYu3szIibtbnkeIBWFyT20oPn5tZnic2ia1oeVHJNb5axsmoD5ctsIuiafaslf4oztHZ6Vul4iawA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

位置`Settings -> Editor -> Live Templates`。里面有许多系统默认配置，自定义配置可以按如上截图中1~9步骤操作。

整体配置不是那么复杂，除变量函数外。可以先学习了解看看系统默认配置都是怎么配的，可以尝试去修改它，然后敲敲代码看看是什么效果。

`变量函数`相关建议多看看官方文档：

```
https://www.jetbrains.com/help/idea/2017.1/live-templates-2.html#predefined_functions
```

系统级函数比较丰富，也支持自定义函数，比如结合Groovy脚本。例如下面是变量函数配置来实现打印方法入参：

```
groovyScript(" _1.collect { it + ' = {}'}.join(', ') +   '\",' + _1.collect {it}.join(', ')  ", methodParameters())
```

输入log缩写，按提示选择，整体效果如下：

![图片](https://mmbiz.qpic.cn/mmbiz_gif/yAZ9womsrh9moRJYu3szIibtbnkeIBWFynYHU85nfUMoFNeicqo6iamX90fToyJv7IPIdOFP9EjopCyZKB4JMSVoA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)



## 常用代码模板⭐⭐

### 非空判断

> 变量.null：if(变量 == null)
>
> 变量.nn：if(变量 != null)
>
> 变量.notnull：if(变量 != null)
>
> ifn：if(xx == null)
>
> inn：if(xx != null)

![图片](https://mmbiz.qpic.cn/mmbiz_gif/tO7NEN7wjr6pdtUuBS9hMYhbXE0icjiby0ibxchmElXrvqz8wmTbK4OXeAQY23SQiaTQCGB2JqBsfTGroExo9qDhxw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

![图片](https://mmbiz.qpic.cn/mmbiz_gif/tO7NEN7wjr6pdtUuBS9hMYhbXE0icjiby0q8F8wnT0gXYPcibtFgkSdTlykL6KsWzAib88bS3W8dEeiacazw7e2ib2hg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

![图片](https://mmbiz.qpic.cn/mmbiz_gif/tO7NEN7wjr6pdtUuBS9hMYhbXE0icjiby0tiasLfeMOQGiaFibn6Vs3LicbKYPS1bNXjFLHopOtxwDBglv8toEgnkSJQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

![图片](https://mmbiz.qpic.cn/mmbiz_gif/tO7NEN7wjr6pdtUuBS9hMYhbXE0icjiby0wgxBmzamsrFBDuGX3ia3YqhhEs2ibEia4ysPbOjw42kUtBh96cmmiboS9Q/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### 条件判断

定义一个`boolean`类型的变量`flag`和一个`String`类型的变量`name`来进行测试。

```java
boolean flag = true;
String name = "Java旅途";
```

```java
flag.if ---> if (flag) {}
flag.else ---> if (!flag) {}
string.null --->  if (string == null) {}
string.notnull & string.nn ---> if (string != null) {}
string.switch ---> switch (string) {}
flag.while ---> while (flag) {}
```

### 遍历数组和集合

> 数组或集合变量.fori：for循环
>
> 数组或集合变量.for：增强for循环
>
> 数组或集合变量.forr：反向for循环
>
> 数组或集合变量.iter：增强for循环遍历数组或集合

![图片](https://mmbiz.qpic.cn/mmbiz_gif/tO7NEN7wjr6pdtUuBS9hMYhbXE0icjiby0lI4s8X2QyBMybqVCkaRfUu6gwvJ6ibsGiaFSbCcLHIrFUojgjVia6GHVA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

![图片](https://mmbiz.qpic.cn/mmbiz_gif/tO7NEN7wjr6pdtUuBS9hMYhbXE0icjiby0XbvGFxQs66k8Rx1j1AlcpfswSpPiaibm8ADaUTRq7P5p2LMsNPNnJ53A/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

#### fori

输入完，按回车后，光标会在 `i<`的位置，等待输入临界值。

```java
fori       --->  for (int i = 0; i < ; i++) {}
param.fori --->  for (int i = 0; i < param.length; i++) {}
```

#### forr

从最后一个元素进行遍历

```java
param.forr ---> for (int i = param.length - 1; i >= 0; i--) {}
```

#### iter

用 forEach 的方式循环，在一个数组或者列表变量下方使用。

```java
param.for & param.iter ---> for (String s : param) {}
```

#### itco

用迭代器的方式迭代，同样是在一个列表变量下方使用。

```java
List<String> array = new ArrayList<>();
for (Iterator<String> iterator = array.iterator(); iterator.hasNext(); ) {
  String next =  iterator.next();
}
```

### 输出语句

> sout：相当于System.out.println
>
> souf：带格式化的文本输出，System.out.printf();
>
> soutm：**打印当前方法的名称**
>
> soutp：**打印当前方法的形参及形参对应的实参值**
>
> soutv：打印方法中声明的最近的变量的值
>
> 变量.sout：打印当前变量值
>
> 变量.soutv：打印当前变量名及变量值

```java
public static void m1(String name,String address) {
    System.out.println("test.m1"); // soutm：输出类名.方法名
    System.out.println("name = " + name + ", address = " + address); // soutp
    System.out.println("name = " + name); // soutv：可选输出name还是address
    System.out.println("address = " + address);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231645224.png" alt="image-20221123164511146" style="zoom:80%;" />

### 变量和对象声明

新定义一个`User`类，添加`name`和`age`两个属性用来测试。

```java
public class User {
    
    private String name = "Java旅途";
    private int age = 18;
    
    public User() {}

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

创建一个对象。

```java
User.new --> new User();
// Xxx.new 或者 .var ：创建Xxx类的对象，并赋给相应的变量
// Xxx.new .field：会将方法内刚创建的Xxx对象抽取为一个属性
new User().var ---> User user = new User();
new User().field ---> private User user; user = new User();
// 对象.cast：将对象进行强转，对象.castvar：将对象强转后，并赋给一个变量
new object.castvar ---> User user = (User) new Object();
```

### 静态常量声明

> 注意声明位置：不能在方法中声明，包括main方法

> psf：public static final
>
> psfi：public static final int
>
> psfs：public static final String
>
> prsf：private static final
>
> St：String 

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231650302.png" alt="image-20221123165031192" style="zoom:80%;" />

### 快速try...catch

手动写try...catch比较麻烦，这时快速try...catch可以给我们节省不少时间，只需加`.try`即可

```java
String str = "123";
str.try
```

```java
try {
    str
} catch (Exception e) {
    e.printStackTrace();
}
```

### 快速定义Optional

有时候我们想把某个对象转换成`Optional`，避免出现空指针问题，只需加`.opt`即可，具体效果如下：

![图片](https://mmbiz.qpic.cn/mmbiz_gif/uL371281oDGPIdY8rfMW5JICc6pYBDevFPibOI03Ro3UfF8DZI8uTlMIng1hgN24SNFkzKJia9AnhxtKINBDribDA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### synchronized 上锁

语法：

```
string.synchronized
```

效果：

```
synchronized (string) {}
```

### Surround Templates

这种模板是在选中一段代码后，然后使用快捷键 `option`+`command`+`j`调出提示框，然后选择一个模板类型。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304152102963.png" alt="image-20230415210244780" style="zoom:67%;" />

这个快捷键是 MAC 系统下的，如果你用的是 windows，可以通过点击 `code`菜单项，找到 `Sorround With`，看看快捷键是什么。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304152102116.png" alt="image-20230415210255907" style="zoom:50%;" />

**C**

实现一个 `Callable`

```java
Callable<Object> callable = new Callable<Object>() {
  public Object call() throws Exception {
    System.out.println("hello");
  }
};
```

**RL 和 WL**

插入一段读锁或写锁加解锁代码。

```java
// 要先声明一个读写锁实例
ReadWriteLock readWriteLock = new ReentrantReadWriteLock();
readWriteLock.readLock().lock();
try {
  System.out.println("hello");
} finally {
  readWriteLock.readLock().unlock();
}
```





## 自定义代码模板⭐

### 自定义后缀补全模板⭐

#### 创建模板

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231028952.png" alt="image-20221123102857855" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231029515.png" alt="image-20221123102915406" style="zoom:80%;" />

#### 使用

> 输入String.list，然后回车即可

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231652337.png" alt="image-20221123165212261" style="zoom:80%;" />

生成如下内容

```java
List<String> |  =new ArrayList<>();
```

然后在竖线位置输入集合名称即可



### 自定义Live Templates模板

例如：定义sop代表System.out.print();语句

① 在Live Templates中增加模板

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231029684.png" alt="image-20221123102956604" style="zoom:80%;" />

②先定义一个模板的组，这样方便管理所有自定义的代码模板

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231030607.png" alt="image-20221123103011539" style="zoom:80%;" />

③在模板组里新建模板

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231030610.png" alt="image-20221123103034531" style="zoom:80%;" />

④定义模板（以输出语句为例）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231030500.png" alt="image-20221123103059402" style="zoom:80%;" />

> Abbreviation：模板的缩略名称
>
> Description：模板的描述
>
> Template text：模板的代码片段
>
> 模板应用范围。比如点击Define。选择如下：应用在java代码中。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231031281.png" alt="image-20221123103122198" style="zoom:80%;" />



### 模板1：单元测试模板

```java
@Test
public void test$var1$(){
	$var2$
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231032848.png" alt="image-20221123103208769" style="zoom:80%;" />

### 模板2：创建多线程

```java
new Thread(){
	public void run(){
		$var$
	}
};
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231032616.png" alt="image-20221123103256536" style="zoom:80%;" />

### 模板3：冒泡排序

```java
for(int $INDEX$ = 1; $INDEX$ < $ARRAY$.length; $INDEX$++) {
	for(int $INDEX2$ = 0; $INDEX2$ < $ARRAY$.length-$INDEX$; $INDEX2$++) {
		if($ARRAY$[$INDEX2$] > $ARRAY$[$INDEX2$+1]){
			$ELEMENT_TYPE$ temp = $ARRAY$[$INDEX2$];
			$ARRAY$[$INDEX2$] = $ARRAY$[$INDEX2$+1];
			$ARRAY$[$INDEX2$+1] = temp;
		}
	}
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231033635.png" alt="image-20221123103350545" style="zoom:80%;" />

### 模板3：计时

比如我最新在做一些系统优化的工作，这个过程中，我会频繁的用 `commons-lang3`的 `StopWatch`来看某些方法或者某些代码段的执行时间。比如下面的代码段：

```java
StopWatch stopWatch = new StopWatch("代码段");
stopWatch.start();
try {
  Thread.sleep(1000);
} catch (InterruptedException e) {
  throw new RuntimeException(e);
}
stopWatch.stop();
System.out.printf("执行时间 %s%n",stopWatch.toString());
```

由于我比较懒，所以我不想每次都敲重复的内容，连粘贴复制都不想。所以就想到了 Live Template。

1、打开 IDEA 的设置窗口，找到 Editor 下的 `Live Templates`，在右侧找到 `Java`，点击最右侧的加号。

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaWSDo4TfyZjMZQa7sqtXu1gpmGR6IQtLgNMlGewaHKewicfupuTDz3uYMoialFYibFYglC8MvqnOo4Rzr0k9nbmHw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

2、输入这个 Template 的名字，到时候可以在编辑器中通过输入这个名字来插入这个模板。

输入描述，帮助我们记忆。

最后输入模板的内容。

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaWSDo4TfyZjMZQa7sqtXu1gpmGR6IQtLqjk4gt4jn7zZ3VTBut9Tgjrso53zrYIrRcg01eibct97pjujdS0dWng/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

我给这个模板起名为 `watch`，模板内容如下：

```java
StopWatch stopWatch = new StopWatch("$MESSAGE$");
stopWatch.start();
$SELECTION$
stopWatch.stop();
System.out.printf("执行时间 %s%n",stopWatch.toString());
```

`$SELECTION$`表示选中的部分，我们要监控的正好是某个方法或者某个代码段，所以正好可以用 Surround Templates，并且在内容中用了 `$SELECTION$`，模板就默认为  Surround Templates了。

`$MESSAGE$`就是一个占位符的作用，当我们插入这个模板后，光标会定位到这个占位符，我们就可以在需要定制的地方输入我们想要的内容了。在这里呢，由于我的一个方法中可能用到多个 StopWatch，所以正好在这儿占位，给不同的 StopWatch 赋予不同的名字。

## 注释模板

### 类注释

打开 IDEA 的 `Settings`，点击 `Editor-->File and Code Templates`，点击右边 `File`选项卡下面的 `Class`，在其中添加图中红框内的内容：

```java
/**
 * @author jitwxs
 * @date ${YEAR}年${MONTH}月${DAY}日 ${TIME}
 */
```

<img src="https://mmbiz.qpic.cn/mmbiz_png/WwPkUCFX4x556Ue2VJr0KuFG8bTr8O5N3T1C939bpicnst4ia9VQUOGeAgCOwLUbvaRxgNquGA9bcDane98XrGEg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

在我提供的示例模板中，说明了作者和时间，IDEA 支持的所有的模板参数在下方的 `Description` 中被列出来。保存后，当你创建一个新的类的时候就会自动添加类注释。如果你想对接口也生效，同时配置上图中的 `Interface` 项即可。

### 方法注释

**不同于目前网络上互相复制粘贴的方法注释教程，本文将实现以下功能：**

- 根据形参数目自动生成 `@param` 注解
- 根据方法是否有返回值智能生成 `@Return` 注解

相较于类模板，为方法添加注释模板就较为复杂，首先在 `Settings` 中点击 `Editor-->Live Templates`。

点击最右边的 `+`，首先选择 `2. Template Group...` 来创建一个模板分组：

![图片](https://mmbiz.qpic.cn/mmbiz_png/WwPkUCFX4x556Ue2VJr0KuFG8bTr8O5NKPDeicdlib5NGuUeUn9iaRZfy84icBF4qVgQHZKsnDs5LfHT99ZCcouCMQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

在弹出的对话框中填写分组名，我这里叫做 userDefine：

![图片](https://mmbiz.qpic.cn/mmbiz_png/WwPkUCFX4x556Ue2VJr0KuFG8bTr8O5N65T3gAFT0w1swMJI4Wb7JttwKXAhhZoiabZfX6Am8rMFYBq3K4uP1qg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

然后选中刚刚创建的模板分组 `userDefine`，然后点击 `+`，选择 `1. Live Template`：

![图片](https://mmbiz.qpic.cn/mmbiz_png/WwPkUCFX4x556Ue2VJr0KuFG8bTr8O5NPTibeMtFBIdKvFupBC6rx5yVUF4evJ2TjZF7HfTtf901dzPwVclkUOw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

此时就会创建了一个空的模板，我们修改该模板的 `Abbreviation`、`Description` 和 `Template text`。需要注意的是，`Abbreviation` 必须为 `*`，最后检查下 `Expand with` 的值是否为 Enter 键。

![图片](https://mmbiz.qpic.cn/mmbiz_png/WwPkUCFX4x556Ue2VJr0KuFG8bTr8O5NaFkkON8QhJKaejoHuhYNDickhibMycEcMXWeojRbDSk5mkibaz2uXdmZA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

上图中· `Template text` 内容如下，请直接复制进去，**需要注意首行没有 `/`，且 `\*` 是顶格的**。

```java
/*
 * @author jitwxs
 * @date $date$ $time$$param$ $return$
 */
```

注意到右下角的 `No applicable contexts yet` 了吗，这说明此时这个模板还没有指定应用的语言：

![图片](https://mmbiz.qpic.cn/mmbiz_png/WwPkUCFX4x556Ue2VJr0KuFG8bTr8O5Nh5ndllQJJrKFCiatNAphpoJtSOLr27uQ6qlFdNyV5wIjJFBQPeGvcaw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

点击 `Define`，在弹框中勾选`Java`，表示将该模板应用于所有的 Java 类型文件。

![图片](https://mmbiz.qpic.cn/mmbiz_png/WwPkUCFX4x556Ue2VJr0KuFG8bTr8O5Na3rl9q9iabicdYttU5vAUZYuSicavoSnaUERBEYBZXwueibfKcMYIibGeGw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)设置 applicable contexts

还记得我们配置 `Template text` 时里面包含了类似于 `$date$` 这样的参数，此时 IDEA 还不认识这些参数是啥玩意，下面我们对这些参数进行方法映射，让 IDEA 能够明白这些参数的含义。点击 `Edit variables` 按钮：

![图片](https://mmbiz.qpic.cn/mmbiz_png/WwPkUCFX4x556Ue2VJr0KuFG8bTr8O5NnDYeGZ4Iicpzeel1UkpwZibNaWjhUBdC83TDEQ9v2Y1qFFsFLXOQgKQQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

为每一个参数设置相对应的 `Expression`：

![图片](https://mmbiz.qpic.cn/mmbiz_png/WwPkUCFX4x556Ue2VJr0KuFG8bTr8O5N8ewKfSUaDHCcWeQpA65fUeqsyV4QkRzibaCfPYOkgJppLjvNKESlTrg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)设置 Expression

需要注意的是，`date` 和 `time` 的 `Expression` 使用的是 IDEA 内置的函数，直接使用下拉框选择就可以了，而 `param` 这个参数 IDEA 默认的实现很差，因此我们需要手动实现，代码如下：

```java
groovyScript("def result = '';def params = \"${_1}\".replaceAll('[\\\\[|\\\\]|\\\\s]', '').split(',').toList(); for(i = 0; i < params.size(); i++) {if(params[i] != '')result+='* @param ' + params[i] + ((i < params.size() - 1) ? '\\r\\n ' : '')}; return result == '' ? null : '\\r\\n ' + result", methodParameters())
```

另外 `return` 这个参数我也自己实现了下，代码如下：

```java
groovyScript("return \"${_1}\" == 'void' ? null : '\\r\\n * @return ' + \"${_1}\"", methodReturnType())
```

> 注：你还注意到我并没有勾选了 `Skip if defined` 属性，它的意思是如果在生成注释时候如果这一项被定义了，那么鼠标光标就会直接跳过它。我并不需要这个功能，因此有被勾选该属性。

点击 OK 保存设置，大功告成！

### 检验成果

### 类注释

类注释只有在**新建类时才会自动生成**，效果如下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/WwPkUCFX4x556Ue2VJr0KuFG8bTr8O5N2aegYbxPDFGUl1K4qlNSNjKbpfdjiceratzxows19cRKN5K5uqoGLnw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)类注释

### 方法注释

将演示以下几种情况：

1. 无形参
2. 单个形参
3. 多个形参
4. 无返回值
5. 有返回值

![图片](https://mmbiz.qpic.cn/mmbiz_png/WwPkUCFX4x556Ue2VJr0KuFG8bTr8O5N3EdzGJa7hIdgHuq386c3ia1eTWRcZroktwqVo2rhY8b4k2TQibaXyQmQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)方法注释

### Q & A

**（1）为什么模板的 `Abbreviation` 一定要叫 `\*` ？`Expand with` 要保证是 Enter 键？**

答：因为 IDEA 模板的生成逻辑是 `模板名 + 生成键`，当生成键是 Enter 时，我们输入 `* + Enter` 就能够触发模板。

这也同时说明了为什么注释模板首行是一个 `*` 了，因为当我们先输入 `/*`，然后输入 `* + Enter`，触发模板，首行正好拼成了 `/**`，符合 Javadoc 的规范。

**（2）注释模板中为什么有一行空的 `\*`？**

答：因为我习惯在这一行写方法说明，所以就预留了一行空的写，你也可以把它删掉。

**（3）注释模板中 `$time$$param$` 这两个明明不相干的东西为什么紧贴在一起？**

答：首先网上提供的大部分 param 生成函数在无参情况下仍然会生成一行空的 `@param`，因此我对param 函数的代码进行修改，使得在无参情况下不生成 `@param`，但是这就要求 `$param$` 要和别人处在同一行中，不然没法处理退格。

**（4）为什么 return 参数不使用 `methodReturnType()`， 而要自己实现？**

答：`methodReturnType()` 在无返回值的情况下会返回 void，这并没有什么意义，因此我对 methodReturnType() 返回值进行了处理，仅在有返回值时才生成。

**（5）为什么 `$return$` 不是单独一行？**

答：因为当 `methodReturnType()` 返回 null 时，无法处理退格问题，原因同第三点。



# 常用快捷键 

## IDEA的日常快捷键

### 第1组：通用型

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231523453.png" alt="image-20221123152304364" style="zoom:80%;" />

### 第2组：提高编写速度（上）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231523851.png" alt="image-20221123152353744" style="zoom:80%;" />

### 第3组：提高编写速度（下）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231527311.png" alt="image-20221123152738216" style="zoom:80%;" />

![图片](https://mmbiz.qpic.cn/mmbiz_gif/LEFcpfxrbq6GN932uicD7rU53aSNMjWtunTWLPs6Ho1ZqhO5vWOmChkqFyZC4oeGV2tibPcmOULNbnib3eoXXttYQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### 第4组：类结构、查找和查看源码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231528625.png" alt="image-20221123152808528" style="zoom:80%;" />

### 第5组：查找、替换与关闭

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231528640.png" alt="image-20221123152845555" style="zoom:80%;" />

### 第6组：调整格式

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231529197.png" alt="image-20221123152915105" style="zoom: 80%;" />

## Debug快捷键

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231529772.png" alt="image-20221123152950678" style="zoom:80%;" />

## 查找和替换⭐

### 查找内容

#### 查找整个项目文件内容

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210201053786.png" alt="image-20221020105353679" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210201054146.png" alt="image-20221020105442078" style="zoom:80%;" />

#### 查找某个文件名（按两下Shift）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210201055150.png" alt="image-20221020105538094" style="zoom:80%;" />

#### 普通查找（Ctrl+F）

这个就不用说了，最普通的，当前文件查找，这个很常用

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210201056083.png" alt="image-20221020105621018" style="zoom:80%;" />

### 替换内容

#### 单页面替换内容ctrl+r

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210201130338.png" alt="image-20221020113044282" style="zoom:80%;" />

#### 整个项目替换

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210201131671.png" alt="image-20221020113159620" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210201132935.png" alt="image-20221020113227877" style="zoom:80%;" />

## 快速抽取方法⭐

本来快捷键是ctrl+alt+m，但是不知道被哪个软件占用了这个快捷键因此按不出来，可以使用选中代码，然后点击抽取方法，即可实现将代码片段抽取

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211240927104.png" alt="image-20221124092732010" style="zoom:80%;" />

初始代码

```java
public class HelloModule {
    public static void main(String[] args) {
        System.out.println("hello,module!");
    }
}
```

抽取效果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211240930038.png" alt="image-20221124093044951" style="zoom:80%;" />

## 快速收尾(加分号|加大括号)

> `ctrl+shift+enter`其实是表示`为您收尾`的意思，不只是用来给代码加分号的。比如说：

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuc64ibKlVeda4KyHwkfsWaouW2SMdln1Ic5gEbcLXWzuhbdYVxPOhqM3oznlKGycKzEOqqlcfLZiciaw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这段代码，我们还需要为if语句加上大括号才能编译通过，这个时候你直接输入`ctrl+shift+enter`，`IDEA`会自动帮你收尾，加上大括号的。

## 快捷键查看和修改

### 1 查看快捷键

1、已知快捷键操作名，未知快捷键

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231719156.png" alt="image-20221123171955055" style="zoom:67%;" />

2、已知快捷键，不知道对应的操作名

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231720073.png" alt="image-20221123172014978" style="zoom:80%;" />

### **3** 自定义快捷键

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231720383.png" alt="image-20221123172040266" style="zoom:80%;" />

### **4** 使用其它平台快捷键

苹果电脑或者是用惯Eclipse快捷的，可以选择其他快捷键插件。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231721229.png" alt="image-20221123172105130" style="zoom:80%;" />

## 多行同时编辑

> 同时按住 Ctrl Shift Alt，然后鼠标左键依次点击要编辑的地方就可以同时编辑了

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212081907328.png" alt="image-20221208190752234" style="zoom:80%;" />

## 快速匹配方法的大括号位置

> `ctrl+[ ctrl+]` 可以快速跳转到方法大括号的起止位置，配合方法分隔符使用，不怕找不到方法在哪儿分割了

## 查看历史记录 ⭐

> 还是以浏览器为例，当我们已经点击很多网页，这时想查看之前看过一个网页，使用后退就会很费劲，需要一个个回退过去查找。这种情况下，直接从历史记录查看将会变得很高效。同样的，IDEA 也提供类似的功能查看历史文件，并且在弹出窗口内可以使用关键键快速查找。快捷键如下：**ctrl + E**

![图片](https://mmbiz.qpic.cn/mmbiz_gif/LEFcpfxrbq6GN932uicD7rU53aSNMjWtuCnbOzFs3NIDIFsmJrqlltib7dtL2N1DJXOtic0lJX9SoK5g80iaSAn64Q/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

## 查看最近修改代码位置 ⭐

另外 IDEA 中还有可以查看最近修改代码的位置，直接点击快速跳转。**ctrl + shift + E**

![图片](https://mmbiz.qpic.cn/mmbiz_gif/LEFcpfxrbq6GN932uicD7rU53aSNMjWtuor9jqnMEuiaLFgNWNjl3KDVCNemefhfccc2OxaD5LftibSGMTNcOME3Q/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

## 预览某个类的代码

例如我们在test类中，有句代码：`People p = new People(); `我们想稍微查看一下People这个类，但是tab已经够多了，`ctrl+alt+b`会打开新的标签，标签多了就混乱了，尤其一堆命名类似的tab,这时候我们可以按`ctrl+shift+i` 实现预览功能，不占tab

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121439484.png" alt="image-20221212143929406" style="zoom:80%;" />

## 查看方法在哪里被调用

`ctrl+alt+h` 可以清楚看到方法在哪些地方被调用；在知道这个快捷键之前，都是`ctrl+h`（idea默认 `ctrl+shift+f`）搜索，肉眼找的…

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121441754.png" alt="image-20221212144105659" style="zoom:80%;" />

## 查看当前类所有的method

```
Ctrl+F12
```

## 快速查看类、字段的注释

这是一个很有用的小技巧 按F2可以快速查看某个类或某个字段的文档注释 ;基于这点 其它IDE应该也是可以快速查看文档注释内容 不仅仅是idea特性,这也是为什么阿里编码规范里面会明确声明实体类字段需要用文档注释 而不能使用双斜杠// 注释 ,还记得刚看到这个规范的时候 很不理解 特地去百度 看到有人说就是个习惯问题 很显然不能说服人，直到发现F2可以快速查看之后 恍然大悟！

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuf7Trj846CBqvOYJ092l1CWM2FxGTwnn05NhZgm4lnPBHNLH433BOwmicy4coNW3Gc4KBIXGEiaDxFg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuf7Trj846CBqvOYJ092l1CW9biccepWEYkSw2Jut4ibZ3xJRBlKs16RdiaQjOxfIl1Jc1GeGLRrGwLIg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 快捷键切换回上一个点击开的tab

当我们打开了多个tab的时候 ， 想要快速回到上一个点击的tab中 有的时候肉眼很难找

我们可以用快捷键 `alt + ←` 键 (eclipse版快捷键 idea默认快捷键需要自测) ，有的时候我们在后面tab编辑了内容 按一次可能不够 需要在多按几次 ,相应的 `alt + → `切换到下一个点击的tab

> 常见应用场景： debug发生类跳转时 、利用快捷键在其它类中创建方法时

即使两个tab不相邻 也可以切换回去



## 变量批量重命名

有时候手误会把变量名拼写错误，等到自己发现时，这个变量已经被引用了多次，这时再修改，需要把所有引用的地方都修改一遍，这就很麻烦。IDEA 重构功能-重命名（**Rename**），可以修改命名，并且一键替换所有的引用的地方。

另外函数名、类名修改都可以使用这个快捷键。快捷键如下：**shift + F6**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301131644453.png" alt="image-20230113164409381" style="zoom:67%;" />

## 前进/后退

我们使用浏览器的过程，可以点击后退查看之前的浏览记录。在 IDEA 也有同样的功能，当我们编辑代码时，点击查看了调用类实现逻辑，然后可以使用后退快捷键，快速回到刚才待编辑的代码处。

有后退，当然也有前进啦~ **前进/后退快捷键如下：Ctrl + Alt + Left/Right（方向键）**

![图片](https://mmbiz.qpic.cn/mmbiz_gif/LEFcpfxrbq6GN932uicD7rU53aSNMjWtuLiaxAlaJichVebmZDqlLROsuwQ4D1T0j1oSibicic8tHBpHJrUyl8PknqWQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)



# 断点调试(Debug)

[IDEA断点调试技巧，多张动图包教包会 (qq.com)](https://mp.weixin.qq.com/s?__biz=MzI4Njc5NjM1NQ==&mid=2247526655&idx=1&sn=37c90fc993cddd2026629a3d8384167e&chksm=ebd557d3dca2dec52c68b69afb7b746ca4662630c4ff1e34bee887fca2e7fee2694fd0e8e2e7&mpshare=1&scene=23&srcid=08268qnpMKI9jbJcRhSWFsbu&sharer_sharetime=1661475831505&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

[在 IDEA 中的各种调试技巧，轻松定位 Bug（超级全面） (qq.com)](https://mp.weixin.qq.com/s?__biz=MzI4Njc5NjM1NQ==&mid=2247506835&idx=1&sn=ab279e4c7c4e5768bdc7873d14e5283a&chksm=ebd5e4bfdca26da9d5bc4268b59e98739ecb763b361e8f25426f440307c4e0820e4a7c470483&mpshare=1&scene=23&srcid=0728HBd7UpDQbzTAjL1nF2oH&sharer_sharetime=1659017257513&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

编好的程序在执行过程中如果出现错误，该如何查找或定位错误呢？简单的代码直接就可以看出来，但如果代码比较复杂，就需要借助程序调试来查找错误了。

运行编写好的程序时，可能出现的几种情况：

> \> 情况1：没有任何bug,程序执行正确！如果出现如下的三种情况，都又必要使用debug
>
> \> 情况2：运行以后，出现了错误或异常信息。但是通过日志文件或控制台，显示了异常信息的位置。
>
> \> 情况3：运行以后，得到了结果，但是结果不是我们想要的。
>
> \> 情况4：运行以后，得到了结果，结果大概率是我们想要的。但是多次运行的话，可能会出现不是我们想要的情  况。比如：多线程情况下，处理线程安全问题。

## Debug的步骤

Debug(调试)程序步骤如下：

1、添加断点

2、启动调试

3、单步执行

4、观察变量和执行流程，找到并解决问题

### 1、添加断点

在源代码文件中，在想要设置断点的代码行的前面的标记行处，单击鼠标左键就可以设置断点，在相同位置再次单击即可取消断点。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231533946.png" alt="image-20221123153325861" style="zoom:80%;" />

### 2、启动调试

IDEA提供多种方式来启动程序(Launch)的调试，分别是通过菜单(Run –> Debug)、图标(“绿色臭虫” 等等

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231534139.png" alt="image-20221123153404040" style="zoom:80%;" />

## 基本操作

### 基础功能

在IDEA中Java相关的最常用几个Debug基础操作如下截图：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/yAZ9womsrhiblkXJ6TV6XnN2vlSwKXN9n3BBFLxbC0KlvKibdwfkpmF1dyjCYC5znCFc3bhbnVib0HfMiblreNbJaw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**图中1-9对应功能作用说明如下：**

- **1>.Show Execution Point ：**显示执行点（Alt + F10）
  **作用：**当我们查看其它方法而忘记了断点执行的位置时，通过该功能可以快速定位到断点所在的位置。
- **2>.Step Over ：**步过（F8）
  **作用：**执行该方法的下一步（如果该行代码是方法，也不会进入到方法的内部）。
- **3>.Step Into ：**步入（F7）
  **作用：**如果当前行是方法调用，则进入到该方法的内部，否则跳转到下一行代码。
- **4>.Force Step Into ：**强制步入（Alt + Shift + F7）
  **作用：**强制进入到具体方法的内部继续执行。
- **5>.Step Out ：**步出（Shift + F8）
  **作用：**跳转到上一层方法的下一行代码，常和4强制步入配合使用。
- **6>.Drop Frame ：**丢帧
  **作用：**丢弃掉当前断点所在方法的栈帧，回退到上一层的方法，但是数据的状态若已改变了则是无法回退到之前的数据状态的。
- **7>.Run to Cursor ：**运行到光标处（Alt + F9）
  **作用：**运行到光标的所在位置。如果光标之前还有断点，则运行到该断点；如果该光标不在运行路径上，则运行到下一个断点或直接结束。
- **8>.Evaluate Expression ：**执行表达式（Alt + F8）
  **作用：**可用于执行一段我们实时写的代码。另当我们在测试时，发现某段代码逻辑很难有符合条件的数据时，可以通过该功能直接修改数据，来加快我们的测试。
- **9>.Trace Current Stream Chain ：**Stream调试
  **作用：**当我们暂停在Stream的代码行时，可以将Stream的整个处理流程以图形化界面形式展示,可看到每个步处理前后的数据，便于定位排查是哪一步出了问题。

### 断点类型

在IDEA中对于JAVA断点分成了如下 4 类（图标均为红色，注意形状不同）：

- **1>.行断点（Line Breakpoints）：**
  **图标：**红色圆形
  **作用：**最常用类型。运行时，在断点所在行进行暂停。
- **2>.方法断点（Method Breakpoints）：**
  **图标：**红色菱形
  **作用：**在方法入口和出口都会自动暂停。入口处暂停便于让我们从头调试整个方法，出口处暂停便于让我们看到方法执行完时，方法体内各个变量数据状态现况。有时候我们的一个接口会存在很多实现类，我们短时间内难以分析究竟是运行到了哪个实现类中，这个时候就可以使用方法断点，我们将断点打在接口方法上，运行到该方法时，会自动跳到实际执行的实现类，无需通过上下文环境去分析是哪个实现类。
- **3>.字段断点（Field Watchpoints）：**
  **图标：**红色眼睛
  **作用：**在具体字段发生变更（默认）或者被访问（需要额外设置）时暂停。
- **4>.异常断点（Exception Breakpoints）：**
  **图标：**红色闪电
  **作用：**可以在抛出异常的地方进行暂停。异常断点不是在具体代码行上加断点，而是在断点详情页中直接添加，当运行时，如果抛出所添加的异常，则会自动暂停在抛出异常的代码处。

## 应用场景

下面结合现实中常见应用场景，看看上面介绍的断点类型和断点功能具体如何应用。

**2.1、如何做到不用一行行debug而能高效定位到属性变量被访问或被修改？**
应用断点类型：字段断点（Field Watchpoints）

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/yAZ9womsrhiblkXJ6TV6XnN2vlSwKXN9noDdxqX2R82WaxBv56uaQWgHqk7UEibz5cBK9yDPEdfJgCRJd8Xtibd0A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

当我们想知道某个属性在什么时候被`修改`，从入口处开始调试太麻烦，我们可以直接在字段上打上字段断点，这样字段被修改的时候就会自动暂停；如果我们想在字段被`访问`时也暂停，则可以右键字段断点，将【Field access】勾选上即可。

**2.2、错过了断点，如何不必重新请求或重启进而可以继续调试此断点？**
应用断点功能：丢帧（Drop Frame）

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/yAZ9womsrhiblkXJ6TV6XnN2vlSwKXN9nUaq8xxwuGZPQyJtxSZX6FaAhnSC6KdHnsGRwMyxr96lUNE4F9fkoibQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&wx_co=1)

从A方法进入到B方法后，当我们快执行完B方法时，发现某个重要流程被我们跳过了，想再看一下，则此时就可以通过`Drop Frame`先回退到A方法，然后再次重新进入B方法。

**2.3、如何知道当前具体执行是哪个实现（接口/抽象方法实现太多）？**
应用断点类型：方法断点（Method Breakpoints）

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/yAZ9womsrhiblkXJ6TV6XnN2vlSwKXN9nxRdIxOBV5HhtbTgNALN20814rl8LLjIpQibxzRJDWeUklB9DtRc4oXA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

时而一个接口/抽象方法会存在很多实现，阅读源码时难以得知究竟是会运行到了具体哪个实现中，此时就可以使用方法断点，我们将断点打在接口方法上，运行到该方法时，会自动跳到实际执行的实现类方法上，而无需通过上下文环境去一点点分析推敲会执行到哪个实现类上。

**2.4、如何设置条件断点，进而不需一层层debug，可直达断点处？**
应用断点功能：断点条件（Condition）

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/yAZ9womsrhiblkXJ6TV6XnN2vlSwKXN9nscvMUzRVqkhuOLiaj5PZlEEIRC739EqD5yAZu1OJquOKq4guWFw0tHQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

当断点所在的地方执行次数过多时，避免浪费时间层层debug。例如在遍历List当字符串等于abc时存在问题，我们想跳过其它字符串，则可以设置此断点条件str.equals("abc")表达式，来达到只在我们关注的abc字符串执行时才暂停下来，其它一路绿灯。

**2.5、如何快速精确定位到抛出具体异常的代码行？**
应用断点类型：异常断点（Exception Breakpoints）

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/yAZ9womsrhiblkXJ6TV6XnN2vlSwKXN9nCuqH0qppJ9tqD96Q7NB6l5dEe2QsrUsdKtfW4pQXuhxQpBCJgibA3Dg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

当想让在运行时，某个具体异常如MyException只要发生则暂停下来，则就可以使用异常断点功能。当有此异常发生时，则就可以暂停在发生代码行上。

**2.6、如何伪造抛出指定异常便于调试？**
应用断点功能：主动抛异常（Throw Exception）

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/yAZ9womsrhiblkXJ6TV6XnN2vlSwKXN9nZ7AYhMgtNCmc0pibzk0bqHpPoibvYGG45fUuVlGmIQGaBFr3Nicp3Tqnw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

在开发中，常需要验证程序对异常的处理逻辑是否正确，这个时候就需要我们在程序运行时主动抛出异常才会触发相关逻辑来验证，比如验证：事务是否会回滚、Web层的统一异常处理等等。你是如何做的，来支持此种调试呢？

简单粗暴地在代码中造异常吗？是可以完成目标。但不够优雅，且太麻烦了，因为测试好还要记得删掉它，若忘记了，那就是直接写了个Bug^_^尤其远程环境Debug时更有用——避免了来回改代码部署重启。

**2.7、多线程情况下如何调试？**
应用断点功能：多线程调试（Suspend）

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/yAZ9womsrhiblkXJ6TV6XnN2vlSwKXN9nnibpkcSgvflZasJCwXKAaxWTVuMM8YsPjIb1kEbsicVjUWn3UObj9nLg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

Suspend有两种模式：`All`（暂停全部线程，只能Debug第一个暂停线程）和 `Thread`（暂停进入断点的线程，并不影响其它线程正常执行。所有进入此断点的线程会依次进行Debug）。

**2.8、Stream该如何调试？**
应用断点功能：Stream调试（Trace Current Stream Chain）

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/yAZ9womsrhiblkXJ6TV6XnN2vlSwKXN9nKLlZSiabgNClcSFnKclZrOBcSeELibH5V9FF24orhvRNFFYSNiaEia6yhw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&wx_co=1)

合理使用Stream会让代码更加简洁，但是现在存在大量滥用Stream情况，Stream本身就比较抽象，大量滥用会使得Stream代码难以理解和调试。通过该功能便于直观地看到每步骤处理前后的数据情况，利于快速定位排查是哪一步出了问题。

## 调试按钮⭐

### 1.完整分析⭐⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231534547.png" alt="image-20221123153448445" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231535116.png" alt="image-20221123153506023" style="zoom:80%;" />

### 1.返回断点位置

1号按钮，这个用的不多，如果你从其他地方想要回到断点位置，就按一下即可，如下GIF所示。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/eQPyBffYbuegRgxhQwguXia8ABzkDsojnwKdYsE3rdgEx3xic2r9WN5LkvPkhoVPhdDQT2sjClYP4w4halaEVnwg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### **2.步过**

2号按钮，说人话就是一行行的往下执行，不会进入方法里面，如下所示。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/eQPyBffYbuegRgxhQwguXia8ABzkDsojnmOGMY84ZAiajo5RuRY04iaJy2ohUPZkbR8Ptialp86lksk9icV4FbGdtqA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### **3.步入**

3号按钮，可以进入我们自定义的方法，如果是其他类库的方法不会进入，如下所示。扩展：[最全的java面试题库](http://mp.weixin.qq.com/s?__biz=MzIyNDU2ODA4OQ==&mid=2247494250&idx=2&sn=957a5eb085292fb716d5b7db6f8a8628&chksm=e80e5c1cdf79d50adce9e6266562ad1e283a5997b7f3b21f3c394d20819080c2f34aea7b8eaa&scene=21#wechat_redirect)

![图片](https://mmbiz.qpic.cn/mmbiz_gif/eQPyBffYbuegRgxhQwguXia8ABzkDsojndwlScKtyOU6nlkVUhIcM5vKJIl2BicgnxDxD0IyJzCicwQwqISqqXfJA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### **5.强制步入，步出**

4号5号按钮，前者可以进入深层的方法，包括官方的源码，后者就是从对应的方法中出来，演示如下。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/eQPyBffYbuegRgxhQwguXia8ABzkDsojniaKsUh5DzNGrfm4gxFngj3GxCGKVezhDr1gJrgXFgoQFpgcV04RN7dQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### **6.回退断点**

6号按钮是很特殊的，如果你的代码中没有调用其他地方的方法，那么是呈灰色的，无法使用，只有进入更深层的方法，才能够使用，其实就是后悔药，我们很多时候调试时不小心按的快了点，很容易错过想看的位置，只能再次重启吗？不，使用这个drop frame 就可以了，演示如下。

可以看到，这里往下执行了add，但是还没有执行完，按这个按钮，再次回到了调用方法之前，但对于数据库插入等操作，其实是无法回退的，这里的回退只是因为记录了栈信息才能够做到的。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/eQPyBffYbuegRgxhQwguXia8ABzkDsojnpDibzHMPwB9eNlFSOFodibnRHicgBNsruttcqQkrv2ueTU6pCEiajvhTew/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)但是要注意，如果你某个方法调用完毕了，你想再回去那就没有办法了。

### **7.断点跳到光标处**

7号按钮也用的不多，主要是为了快速跳转到光标指向的那一行，如下所示。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/eQPyBffYbuegRgxhQwguXia8ABzkDsojnqzZnMFMh7XZ6QQPYtdgbObwCicpV60BaWpQ2IenZYaz9Mn0SgMFDvBg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### **8.表达式计算**

8号按钮是计算表达式的，我们模拟从数据库获取集合，用表达式查询对应的元素，如下所示。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/eQPyBffYbuegRgxhQwguXia8ABzkDsojnZnwXdicxkdZibQZpPsTj1ibwlv4vKVDCzb7GTA7Cd2XVLVFj607EWJMmw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### **9.恢复程序**

9号按钮称为 `Resume Program`，能够跳转到指定的断点处，我们在10行和第100行各加一个断点，需要点几下该按钮跳转到100行呢？答案是一次即可，第一次断点会在第10行停下，点击改按钮直接飞越90行到第100行，如下所示。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/eQPyBffYbuegRgxhQwguXia8ABzkDsojnUx2qtYbVNfYiaZ9UWoZKgUwdTLFTtfSIbvGOzA48zk3N3ib2soYocnfA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### **10.停止程序**

10号按钮就是停止调试，但是注意，即便停止了调试，程序也会继续运行下去，如何想让他就在断点处停止呢？后面我会说到。

### **11.查看所有断点**

11号按钮打开又别有乾坤，基本功能如下图所示，主要是设置，查看断点信息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241105430.png" alt="image-20221124110558384" style="zoom:80%;" />

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuegRgxhQwguXia8ABzkDsojnmPOeY07xwe7qFhDUr1eDC34Gt2vpw1wObzVhXOtz6WWlIgRoW5XvUw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### **12.禁用断点**

12号按钮就简单了，暂时禁用掉断点，方便程序继续执行，一般配合 `Resume Program`。

### **13.其他**

13号其实不是按钮，而是一块区域，这里面存放了很多变量的信息，方便我们查看。

14号按钮其实之前被我忽略掉了，这次拿出来讲一下，在watch可以监控变量的变化，有同学说，中间的变量栏也可以看啊，但是单独拉出来，看起来更加的方便，演示如下。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/eQPyBffYbuegRgxhQwguXia8ABzkDsojngXuHVQlPECnI9xBdAFa7KT08NfSXwGv4ttupTgnZRAuibAbS1w9gzzQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)



## 多种Debug情况介绍

### 1 行断点

断点打在代码所在的行上。执行到此行时，会停下来。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241051512.png" alt="image-20221124105102448" style="zoom:80%;" />

### **2** 方法断点

断点设置在方法的签名上，默认当进入时，断点可以被唤醒。也可以设置在方法退出时，断点也被唤醒

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231536460.png" alt="image-20221123153655360" style="zoom:80%;" />

> 在多态的场景下，在父类或接口的方法上打断点，会自动调入到子类或实现类的方法

方法断点是不是用在普通方法上的，最好的用法是在接口上使用，当我们在调试源码的时候，如果在接口上打了断点，再往下走，可以直接跳转到实现类的实现方法上，而不需要我们一个个的去找。

案例中，有一个接口`DemoInterface`，它有两个实现类，让我们看下效果吧，演示如下。

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuegRgxhQwguXia8ABzkDsojnCKTlubtMOID8ibV7qriaVrKGp70pk7xJhREwib61djMTmDvgPHVAMiaOZg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)注意，方法断点是一个菱形标志。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/eQPyBffYbuegRgxhQwguXia8ABzkDsojnRq1AuXHOhpJ6ib31opzvyqBP9Mh19GP7FGQ5iaiafomic4fDIMib1sT457A/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

其实可以直接在接口方法上打断点，直接跳转到对应的实现方法的，这里是为了放慢演示速度。

### 3 字段断点

> 在类的属性声明上打断点，默认对属性的修改操作进行监控，**查看变量修改情况**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231538235.png" alt="image-20221123153845141" style="zoom:67%;" />

属性断点是打在属性上的，我们无需再`getter setter`方法上打断点，在属性上打上断点，就会出现一个小眼睛的标志，如下所示。在眼睛上点击右键可以设置。

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuegRgxhQwguXia8ABzkDsojnvYDvgA3ff9SbIIGib6vRxFiaHCkqsWBQG0uTJj7hdvvgPqCfwjt4PNMg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

我们一般是通过getter，setter方法设值的，所以就会在这两个方法上停留。

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuegRgxhQwguXia8ABzkDsojnyJ8d4Qfsg7jNtQ0IBH7wEIic5iblCic04xre4bS6Yl34iagm9Rl7OB8kwQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_gif/eQPyBffYbuegRgxhQwguXia8ABzkDsojnwSMXj7dxAVSficiblxtksRg1megovw6FUbh9icEbJlAypX6mkztCeVuZw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)



### 4 条件断点⭐

```java
int[] arr = new int[]{1,2,3,4,5,6,7,8,9,10,11,12};

for (int i = 0; i < arr.length; i++) {
    int target = arr[i];
    System.out.println(target);
}
```

针对上述代码，在满足arr[i] % 3 == 0的条件下，执行断点。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231539509.png" alt="image-20221123153931421" style="zoom: 80%;" />

启动DEBUG，查看效果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241101318.png" alt="image-20221124110132265" style="zoom:80%;" />

跳转到下一个断点位置，注意是点击它，而不是点击横栏上的单步执行

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241102906.png" alt="image-20221124110244854" style="zoom:80%;" />

可以看到，立即进行了按条件跳转

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241103537.png" alt="image-20221124110325487" style="zoom:80%;" />

循环中经常用到这个技巧，比如：遍历1个大List的过程中，想让断点停在某个特定值。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205150941840.png" alt="image-20220515094125787" style="zoom:80%;" />

示例二

参考上图，在断点的位置，右击断点旁边的小红点，会出来一个界面，在Condition这里填入断点条件即可，这样调试时，就会自动停在i=10的位置

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205150941069.png" alt="image-20220515094143032" style="zoom:80%;" />

我想要在某个条件满足的时候打上断点，而不想一步步的走下去，有什么办法吗？当然有，在断点处右击，在`condition`里填入相应的条件即可，演示如下。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/eQPyBffYbuegRgxhQwguXia8ABzkDsojn4usI8hzHKNgMj1r7ia7iaJiaCngaFM23C1sBz7vayKlUYSz0xY314WJLg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)



### 5 异常断点

对异常进行跟踪。如果程序出现指定异常，程序就会执行断点，自动停住。

通过下图的方式，对指定的异常进行监控：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231540781.png" alt="image-20221123154021679" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241106686.png" alt="image-20221124110648632" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241107388.png" alt="image-20221124110700343" style="zoom:80%;" />

执行前不需要标记异常，只需要执行debug，就会自动显示闪电符号的异常

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241109324.png" alt="image-20221124110900273" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241109030.png" alt="image-20221124110910991" style="zoom:80%;" />

在线上由于空指针出现了BUG，我们想快速定位到哪里出现了空指针，应该怎么做呢，答案就是，异常断点！

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuegRgxhQwguXia8ABzkDsojn1AMXg4J9BibCc3ic2EMpqTe2bHCX6aE4icJNrdkDQB30SIUc6vrHicHFzw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)注意，异常断点是一个闪电的标志。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/eQPyBffYbuegRgxhQwguXia8ABzkDsojn1MiaNMulv1zUxjyvM6I9NRT2bDp2uYZdnJj5EMuiaAk2YT9obq4ZotEg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

可以看到，我们在全局打了个空指针断点，只要哪里出现了空指针，就会在那里停止，太方便了！

### 6 线程调试

示例一

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231540998.png" alt="image-20221123154055904" style="zoom:80%;" />

```java
"Thread2".equals(Thread.currentThread().getName())
```

示例二

多线程同时运行时，谁先执行，谁后执行，完全是看CPU心情的，无法控制先后，运行时可能没什么问题，但是调试时就比较麻烦了，最明显的就是断点乱跳，一会儿停这个线程，一会儿停在另一个线程，比如下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205150943491.png" alt="image-20220515094311442" style="zoom:80%;" />

如果想希望下一个断点位置是第2句诗句，可能要失望了：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205150943858.png" alt="image-20220515094334810" style="zoom:80%;" />

如果想让线程在调试时，想按自己的愿意来，让它停在哪个线程就停在哪个线程，可以在图中3个断点的小红点上右击，<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205150944652.png" alt="image-20220515094402610" style="zoom:80%;" />

即：Suspend挂起的条件是按每个线程来，而非All。把这3个断点都这么设置后，再来一发试试

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205150949930.png" alt="image-20220515094913756" style="zoom:80%;" />

注意上图中的红框位置，断点停下来时，这个下拉框可以看到各个线程（注：给线程起个容易识别的名字是个好习惯！），我们可以选择线程“天空中的飞鸟”

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205150949639.png" alt="image-20220515094933514" style="zoom:80%;" />

断点如愿停在了第2句诗。

### 7 强制结束

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241118361.png" alt="image-20221124111819305" style="zoom:80%;" />

进入insert方法，在数据还没写入数据表之前，自己就发现问题了，需要强制结束

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241115377.png" alt="image-20221124111546321" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231543005.png" alt="image-20221123154332901" style="zoom:80%;" />

执行按步骤执行，查看结果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241118405.png" alt="image-20221124111845359" style="zoom:80%;" />



### 8 stream流断点

我们使用流的时候，很难看到中间做了什么，但其实idea就帮我们解决了，我用断点调试下面代码，给大家演示下。

其实只需要找到这个按钮就行了

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuegRgxhQwguXia8ABzkDsojnzmBZhQI7OgbIAHmCIF0r4LB7lLa9r3sr20tcHlodWbjAAxiap81K5Nw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

```java
 List<Integer> list = new ArrayList<>(Arrays.asList(1, 3, 3, 4, 4, 4, 5, 6, 78));
        List<Integer> collect = list.stream()
          //先将偶数筛选，再去重，返回集合
                .filter(s -> s % 2 == 0)
                .distinct()
                .collect(Collectors.toList());
```

![图片](https://mmbiz.qpic.cn/mmbiz_gif/eQPyBffYbuegRgxhQwguXia8ABzkDsojnt51lpDDoc70xYEcw9Kltu8RX8EAuEU1lnKMJoUusMyucldLI2mewjQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241026928.png" alt="image-20221124102635806" style="zoom:80%;" />

## 自定义调试数据视图

调试窗口空白处右键

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231544345.png" alt="image-20221123154412223" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231544871.png" alt="image-20221123154433769" style="zoom:80%;" />

## 常见问题

问题：使用Step Into时，会出现无法进入源码的情况。如何解决？

方案1：使用 force step into 即可

方案2：点击Setting -> Build,Execution,Deployment -> Debugger -> Stepping

把Do not step into the classess中的 java.* 、 javax.* 取消勾选即可。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231545655.png" alt="image-20221123154526557" style="zoom:80%;" />



# 创建不同类型的工程

## 1 创建Java工程

在工程上，右键- New - Module，如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231957983.png" alt="image-20221123195758896" style="zoom: 80%;" />

指明Java工程的名称及使用的JDK版本

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231958669.png" alt="image-20221123195825549" style="zoom:80%;" />

创建包：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231958960.png" alt="image-20221123195846878" style="zoom:80%;" />

提供包名：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231959803.png" alt="image-20221123195903709" style="zoom:80%;" />

在包下创建类，即可：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231959832.png" alt="image-20221123195924751" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231959614.png" alt="image-20221123195941536" style="zoom:80%;" />

测试代码：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211232000390.png" alt="image-20221123200017303" style="zoom:80%;" />

## 2 创建Java Web工程

### 1 IDEA中配置Tomcat

在IDEA中配置Tomcat之前，需要保证已经安装并配置了Tomcat的环境变量。如果没有安装并配置，可以

参考尚硅谷宋红康Tomcat8.5快速部署.docx 配置完成以后，在命令行输入：**catalina run** 。能够启动tomcat，则证明安装配置成功。下面看如何在IDEA中配置：

## 3 创建Maven Java工程

### 1 Maven的介绍

Maven是一款自动化构建工具，专注服务于Java平台的 项目构建 和 依赖管理 。在JavaEE开发的历史上构

建工具的发展也经历了一系列的演化和变迁：Make→Ant→Maven→Gradle→其他……

构建环节：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241501759.png" alt="image-20221124150157700" style="zoom:80%;" />

> ①清理：删除以前的编译结果，为重新编译做好准备。
>
> ②编译：将Java源程序编译为字节码文件。
>
> ③测试：运行单元测试用例程序，确保项目在迭代开发过程中关键点的正确性。
>
> ④报告：测试程序的结果。
>
> ⑤打包：将java项目打成jar包；将Web项目打成war包。
>
> ⑥安装：将jar包或war包安装到本地仓库中。
>
> ⑦部署：将jar或war从Maven仓库中部署到Web服务器上运行。

### 2 Maven的配置

maven的下载 – 解压 – 环境变量的配置这里就不赘述了，下面直接整合Maven。选择自己Maven的目录，和settings文件，然后配置自己的仓库reposiroty

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241503240.png" alt="image-20221124150328169" style="zoom:80%;" />

### 3 Maven Java工程的创建

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241504358.png" alt="image-20221124150404295" style="zoom:80%;" />

指明当前maven工程的名称、模板等信息。这里要求一个项目组的jdk版本必须一致。

通过坐标，就可以定位仓库中具体的jar包。如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241504204.png" alt="image-20221124150440128" style="zoom:80%;" />

新创建的maven 的java工程缺少相应的resources文件目录，需要创建如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241505426.png" alt="image-20221124150500362" style="zoom:80%;" />

指明main下resources的文件目录类型：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241505469.png" alt="image-20221124150523393" style="zoom:80%;" />

类似的操作test目录下，提供resources即可。这里说明Maven的java工程的目录结构：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241506177.png" alt="image-20221124150606128" style="zoom:80%;" />

- main目录用于存放主程序。
- test目录用于存放测试程序。
- java目录用于存放源代码文件。
- resources目录用于存放配置文件和资源文件。

### 4 编写代码及测试

第1步：创建Maven的核心配置文件pom.xml

```xml
<!-- 添加Junit的依赖   -->
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
    <scope>test</scope>
</dependency>
```

第2步：编写主程序代码

在src/main/java/com/atguigu/java目录下新建文件HelloMaven.java

```java
public class HelloMaven {
    public String hello(String message){
        return message;
    }
}
```

第3步：编写测试代码

在/src/test/java/com/atguigu/java目录下新建测试文件HelloMavenTest.java

```java
@Test
public void testHelloMaven(){
    HelloMaven helloMaven = new HelloMaven();
    System.out.println(helloMaven.hello("Maven ^_^"));
}
```

第4步：运行几个基本的Maven命令

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241512821.png" alt="image-20221124151220759" style="zoom:80%;" />

目录下也会有对应的生命周期。其中常用的是：clean、compile、package、install。比如这里install，如果其他项目需要将这里的模块作为依赖使用，那就可以install。安装到本地仓库的位置。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241512846.png" alt="image-20221124151250791" style="zoom:80%;" />



# 关联数据库

## 1 创建数据库连接

找到数据库选项

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231739033.png" alt="image-20221123173956923" style="zoom:80%;" />

添加指定数据库：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231745165.png" alt="image-20221123174523056" style="zoom:80%;" />

配置MySQL数据库的详细信息：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231748269.png" alt="image-20221123174859172" style="zoom: 80%;" />

> 表面上很多人认为配置 Database 就是为了有一个 GUI 管理数据库功能，但是这并不是 IntelliJ IDEA 的Database 最重要特性。数据库的 GUI 工具有很多，IntelliJ IDEA 的 Database 也没有太明显的优势。IntelliJ IDEA 的 Database 最大特性就是对于 Java Web 项目来讲，常使用的 ORM 框架，如 Hibernate、Mybatis 有很好的支持，比如配置好了 Database 之后，IntelliJ IDEA 会自动识别 domain 对象与数据表的关系，也可以通过 Database 的数据表直接生成 domain 对象等。

## 2 数据库图标

图标1：同步当前的数据库连接。这个是最重要的操作。配置好连接以后或通过其他工具操作数据库以后，需要同步

图标2：配置当前的连接

图标3：断开当前的连接

图标4：显示相应数据库对象的数据

图标5：编辑修改当前数据库对象

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231750262.png" alt="image-20221123175047128" style="zoom:80%;" />

## 3 展示ER图

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231751693.png" alt="image-20221123175131597" style="zoom:80%;" />

可以导出文件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211231751183.png" alt="image-20221123175155084" style="zoom:80%;" />

## 4 数据库操作

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241516872.png" alt="image-20221124151610784" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211241516218.png" alt="image-20221124151651136" style="zoom:80%;" />



# IDEA看代码高效率⭐

## 基本操作

这一部分的内容主要是一些我平时看源码的时候常用的快捷键/小技巧！非常好用！

掌握这些快捷键/小技巧，看源码的效率提升一个等级！

### 查看当前类的层次结构

| 使用频率 | 相关快捷键 |
| :------- | :--------- |
| ⭐⭐⭐⭐⭐    | `Ctrl + H` |

平时，我们阅读源码的时候，经常需要查看类的层次结构。就比如我们遇到抽象类或者接口的时候，经常需要查看其被哪些类实现。

拿 Spring 源码为例，`BeanDefinition` 是一个关于 Bean 属性/定义的接口。

```
public interface BeanDefinition extends AttributeAccessor, BeanMetadataElement {
  ......
}
```

如果我们需要查看 `BeanDefinition` 被哪些类实现的话，只需要把鼠标移动到 `BeanDefinition` 类名上，然后使用快捷键 `Ctrl + H` 即可。

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TynfGvtQZyQB3dAdHjFX5XIprzChqHwIId6G0DEh6ib46kO3VD1Vqwia7ibpCpEhzC415QpTFma3RrLQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

同理，如果你想查看接口 `BeanDefinition` 继承的接口 `AttributeAccessor` 被哪些类实现的话，只需要把鼠标移动到 `AttributeAccessor` 类名上，然后使用快捷键 `Ctrl + H` 即可。

### 查看类结构

| 使用频率 | 相关快捷键                            |
| :------- | :------------------------------------ |
| ⭐⭐⭐⭐     | `Alt + 7`(Win) / `Command +7` （Mac） |

类结构可以让我们快速了解到当前类的方法、变量/常量，非常使用！

我们在对应的类的任意位置使用快捷键 `Alt + 7`(Win) / `Command +7` （Mac）即可。

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TynfGvtQZyQB3dAdHjFX5XItrEOt7yUOZicZXNXAjeFyrTbhCtoL1vh1pYhRwRcswYBXehMhHVuSzg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 快速检索类

| 使用频率 | 相关快捷键                               |
| :------- | :--------------------------------------- |
| ⭐⭐⭐⭐⭐    | `Ctrl + N` (Win) / `Command + O` （Mac） |

使用快捷键 `Ctrl + N` (Win) / `Command + O` （Mac）可以快速检索类/文件。

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TynfGvtQZyQB3dAdHjFX5XIuj6uwa8kgwogK2p8E4rV5BY0Nrn9fkic4za9wLwpjsnDJiagucHcRsGw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 关键字检索

| 使用频率 | 相关快捷键 |
| :------- | :--------- |
| ⭐⭐⭐⭐⭐    | 见下文     |

- 当前文件下检索 ：`Ctrl + F` (Win) / `Command + F` （Mac）
- 全局的文本检索 : `Ctrl + Shift + F` (Win) / `Command + Shift + F` （Mac）

### 查看方法/类的实现类

| 使用频率 | 相关快捷键                                         |
| :------- | :------------------------------------------------- |
| ⭐⭐⭐⭐     | `Ctrl + Alt + B` (Win) / `Command + Alt + B` (Mac) |

如果我们想直接跳转到某个方法/类的实现类，直接在方法名或者类名上使用快捷键 `Ctrl + Alt + B/鼠标左键` (Win) / `Command + Alt + B/鼠标左键` (Mac) 即可。

如果对应的方法/类只有一个实现类的话，会直接跳转到对应的实现类。

比如 `BeanDefinition` 接口的 `getBeanClassName()` 方法只被 `AbstractBeanDefinition` 抽象类实现，我们对这个方法使用快捷键就可以直接跳转到 `AbstractBeanDefinition` 抽象类中对应的实现方法。

```
public interface BeanDefinition extends AttributeAccessor, BeanMetadataElement {
  @Nullable
 String getBeanClassName();
  ......
}
```

如果对应的方法/类有多个实现类的话，IDEA 会弹出一个选择框让你选择。

比如 `BeanDefinition` 接口的 `getParentName()` 方法就有多个不同的实现。

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TynfGvtQZyQB3dAdHjFX5XI1icDTgjaVgtbDGJKSkAOicApCBwdgvfaY0oxiaQzW0kdqiaH1I5g1kj3NQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 查看方法被使用的情况

| 使用频率 | 相关快捷键 |
| :------- | :--------- |
| ⭐⭐⭐⭐     | `Alt + F7` |

我们可以通过直接在方法名上使用快捷键 `Alt + F7` 来查看这个方法在哪些地方被调用过。

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TynfGvtQZyQB3dAdHjFX5XIbDUBG9DBwZqiaicamtWBPPGDNiaNIJGNPs1XUztR3OWYLyNHQB4ULtMoA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 查看最近使用的文件

| 使用频率 | 相关快捷键                             |
| :------- | :------------------------------------- |
| ⭐⭐⭐⭐⭐    | `Ctrl + E`(Win) / `Command +E` （Mac） |

你可以通过快捷键 `Ctrl + E`(Win) / `Command +E` （Mac）来显示 IDEA 最近使用的一些文件。

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TynfGvtQZyQB3dAdHjFX5XI9ibFODMNugJ8BSgVg4iaiaALERI4d4CQUAaju2ia6B78yichibuiaDwK8ibViaA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 查看图表形式的类继承链

| 使用频率 | 相关快捷键               |
| :------- | :----------------------- |
| ⭐⭐⭐⭐     | 相关快捷键较多，不建议记 |

点击类名 **右键** ，选择 **Shw Diagrams** 即可查看图表形式的类继承链。

<img src="https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TynfGvtQZyQB3dAdHjFX5XIAcYgxXEFichuU5ACnG26m5t1dRVeXZbBvALXOhaeiaLer61k8QZtjaQg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

你还可以对图表进行一些操作。比如，你可以点击图表中具体的类 **右键**，然后选择显示它的实现类或者父类。

<img src="https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TynfGvtQZyQB3dAdHjFX5XIibBbe6QQDGXEs2Ap77dAGcSttTLNKEhbDwtMmc1P1IRtbFibwPaAU7HA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

再比如你还可以选择是否显示类中的属性、方法、内部类等等信息。

<img src="https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TynfGvtQZyQB3dAdHjFX5XIpQtIon8Jicgjj8KDsDjf9TgXRDeYRfLJcr0icXJS0cfgY3yp4MqN66Aw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

如果你想跳转到对应类的源码的话，直接点击图表中具体的类 **右键** ，然后选择 **Jump to Source** 。

<img src="https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TynfGvtQZyQB3dAdHjFX5XIQldrEjvdGiafib5qlJkeRzzUIek2sda2KJG81lPJqlicaibfYdicxiaYs6Qg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

## 插件推荐

### 一键生成方法的序列图

**序列图**（Sequence Diagram），亦称为**循序图**，是一种 UML 行为图。表示系统执行某个方法/操作（如登录操作）时，对象之间的顺序调用关系。

这个顺序调用关系可以这样理解：你需要执行系统中某个对象 a 提供的方法/操作 login（登录），但是这个对象又依赖了对象 b 提供的方法 getUser(获取用户)。因此，这里就有了 a -> b 调用关系之说。

我们可以通过 **SequenceDiagram** 这个插件一键生成方法的序列图。

> 如果你因为网络问题没办法使用 IDEA 自带的插件市场的话，也可以通过 IDEA 插件市场的官网手动下载安装。

<img src="https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TynfGvtQZyQB3dAdHjFX5XIDbqct7ruAFTMgRbKRzMUrf8mDchSJBKhZibWp8GPBemYWTFf3Jo48mw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

**如何使用呢？**

1、选中方法名（注意不要选类名），然后点击鼠标右键，选择 **Sequence Diagram** 选项即可！

<img src="https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TynfGvtQZyQB3dAdHjFX5XIw1LbL5VTLAeJOPyECSjlxPJKicopHlgVRUR6CTbtS59CNyFuPepO2ag/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

2、配置生成的序列图的一些基本的参数比如调用深度之后，我们点击 ok 即可！

<img src="https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TynfGvtQZyQB3dAdHjFX5XIMWknniaLJyuQZ2iap8xjGOJUDG3MnfHufFLy30CdGhmO7DIlrfOsePtw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

3、你还可以通过生成的时序图来定位到相关的代码，这对于我们阅读源码的时候尤其有帮助！

<img src="https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TynfGvtQZyQB3dAdHjFX5XIDgo4QCSRjaUjLf8ffIuTkGFjseYEtwq5FcF3icPLU8NvKCNaibh9g8zg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

4、时序图生成完成之后，你还可以选择将其导出为图片。

<img src="https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TynfGvtQZyQB3dAdHjFX5XIDJWam1pic8ZrzFAt6L9EZZKPanPSU1SB120o8eicEro4oWlcA0N2wWaQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

相关阅读：[《安利一个 IDEA 骚操作:一键生成方法的序列图》](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247494507&idx=2&sn=50764e6f24f3f48738770154d032dde4&scene=21#wechat_redirect) 。

### 项目代码统计

为了快速分析项目情况，我们可以对项目的 **代码的总行数、单个文件的代码行数、注释行数等信息进行统计。**

**Statistic** 这个插件来帮助我们实现这一需求。

<img src="https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TynfGvtQZyQB3dAdHjFX5XIgnH2n2ZoEk2Jnwro7vndgRgFiadD5yNAURjI5Jz8VZ2WdfVjBt31Bow/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

有了这个插件之后你可以非常直观地看到你的项目中所有类型的文件的信息比如数量、大小等等，可以帮助你更好地了解你们的项目。

<img src="https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TynfGvtQZyQB3dAdHjFX5XI0nMlxcnTOM7NVbmve8DHELsJvtwMpXTpDvbdvrPzz9ib1TtjlofE0JQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

你还可以使用它看所有类的总行数、有效代码行数、注释行数、以及有效代码比重等等这些东西。

<img src="https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TynfGvtQZyQB3dAdHjFX5XIWZKmFL9R6UIYcKdpvzl17FraQH12fcibwnX9ib3icUkCP5ia3RO5oiciaSNQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

如果你担心插件过多影响 IDEA 速度的话，可以只在有代码统计需求的时候开启这个插件，其他时间禁用它就完事

# IDEA代码重构技巧⭐

## 重构函数

### 1、提取方法

提取想要的代码，按快捷键`Ctrl+Alt+M`，就会弹出框，写出方法名称即可提取一个方法

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbud2zjuVNCuLhvg7SPH3JLZ83UMK5L9icbTXqdYGVCWFsFercKf4pRlIycUibDY5uXvRJUncKh1pxX6A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbud2zjuVNCuLhvg7SPH3JLZ8BcuzZHQU2Bj09AH63WqY3MSQBKV766slPvD3LPwNQ3am9eHSoTqubw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 2、合并方法

反向操作，选中方法后，把方法代码直接并入主方法里面

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbud2zjuVNCuLhvg7SPH3JLZ8CtgrVQMphqsBH1huTkzJLDFKS6YMWHdCqgyxh6aiciahgg6ia53OKNPlA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 3、方法重命名

```
Ctrl+Shift+Alt+T`，或者`Shift+F6
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbud2zjuVNCuLhvg7SPH3JLZ8TKU7LTlIjlNjyvX0RvDEhlY8BgRrIdvwibthywaQDWNkhNxn5ReJmIQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbud2zjuVNCuLhvg7SPH3JLZ83bpAMmVxV6rBdejRcFQe9qu8p4gibqKKky71UlrWMBZwlrxtIzYiaPTQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 4、函数参数位置更改与重命名

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbud2zjuVNCuLhvg7SPH3JLZ8LWjbGT8ibfibOjbPOTicutm679juf7KmAe474X5wvcyjMZtia3kzshae4A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbud2zjuVNCuLhvg7SPH3JLZ89gHbh9DiciboWU8ywIsXplnyTdUlYNKWfAV2lJ569fg4AuRcebk35P8A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 重构变量

- `Ctrl+Alt+C` 快速提取常量（Constant）
- `Ctrl+Alt+V`快速提取变量（Variable）
- `Ctrl+Alt+F`快速提取成员变量（Filed Variable）
- `Ctrl+Shift+f6` 重构变量的类型

点击变量，直接使用快捷键

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbud2zjuVNCuLhvg7SPH3JLZ8tC3BFuE9Y9iaX9ymYyyjgHGPeE6UEjd6EWAZVqqEQ9rk7haFWktLEIg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbud2zjuVNCuLhvg7SPH3JLZ8tCuiaxfxSSgzl7ic7eguKGSGYzEvLY2MkcUeGuTjsiayBIDqI8hUyq9yw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 提取方法到父类

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbud2zjuVNCuLhvg7SPH3JLZ8picCvSGLQXiaf2E9HhRzZU9BDnpyfwtCAYf7JsyR996EpGfeWBCjS9jg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbud2zjuVNCuLhvg7SPH3JLZ8rxJzXQAy7MINicufUKKibLEdbzD1yLOseRKIeHTqtxMXASib5FjdINhaQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbud2zjuVNCuLhvg7SPH3JLZ8oP1FOyz9k5etTPYDqCZXrXm0FtpTbMR2HCSQP6MhDQx9hIavtZ3YSQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

# IDEA 性能优化设置

> 在我们日常使用IDEA进行开发时，可能会遇到许多卡顿的瞬间，明明我们的机器配置也不低啊？为什么就会一直卡顿呢？原来这是因为IDEA软件在我们安装的时候就设置了默认的内存使用上限（通常很小），这就是造成我们使用IDEA时卡顿的根本原因。

> 比如我这台电脑，明明是16GB的运行内存，但是IDEA默认给我分配的使用上限是1GB，当我运行大量代码时自然而然的就会产生卡顿。

## 查看项目占用内存大小

我们可以通过显示内存使用情况来查看当前项目占用的内存大小。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303061010171.png" alt="image-20230306101005054" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303061010288.png" alt="image-20230306101024151" style="zoom:67%;" />

> 可以看到当前我的程序占用了690MB的内存，而上限是1024MB（在性能突发时完全承受不住）。我们可以通过进入IDEA的设置来更改这些配置。

## 自定义虚拟机内存

**1.选择顶部导航栏中的Help，然后点击`Edit Custom VM Options`（自定义虚拟机内存）。**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303061011159.png" alt="image-20230306101111059" style="zoom:67%;" />

**2.接下来我们将会看到这个界面：**

```
-Xmx1024m    // 最大内存上限为：1024MB（1GB）
-Xms256m     // 初始内存分配大小为：256MB
-XX:ReservedCodeCacheSize=128m    //代码缓冲区大小：128MB
-XX:+UseG1GC
```

我们对其进行适当的修改（具体根据个人电脑配置），并保存文件：

```
-Xmx4096m
-Xms4096m
-XX:ReservedCodeCacheSize=256m
-XX:+UseG1GC
```

**3. 缓存清理（使新配置生效）：**

选择 `File ---> Invalidate Caches`（清理无效的缓存）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303061011684.png" alt="image-20230306101131564" style="zoom:67%;" />

保持默认的选项，选择确定清理缓存并重启IDEA （结束）。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303061011171.png" alt="image-20230306101151058" style="zoom:67%;" />

好了，最后我们来看一下重启之后的IDEA效果~没错，很流畅

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303061012132.png" alt="image-20230306101230959" style="zoom:67%;" />

## 详细参数

另外说一句，JetBrains系列的产品都可以通过这种设置来解决卡顿的问题。没错，包括PyCharm、Android Studio、WebStorm等，其余参数说明如下：参数说明：

```
-server:一定要作为第一个参数，在多个CPU时性能佳
-Xms：初始Heap大小，使用的最小内存,cpu性能高时此值应设的大一些
-Xmx：java heap最大值，使用的最大内存
-XX:PermSize:设定内存的永久保存区域
-XX:MaxPermSize:设定最大内存的永久保存区域
-XX:MaxNewSize:
+XX:AggressiveHeap 使 Xms 失去意义。
-Xss：每个线程的Stack大小
-verbose:gc 现实垃圾收集信息
-Xloggc:gc.log 指定垃圾收集日志文件
-Xmn：young generation的heap大小，一般设置为Xmx的3、4分之一
-XX:+UseParNewGC ：缩短minor收集的时间
-XX:+UseConcMarkSweepGC ：缩短major收集的时间
```

提示：此选项在Heap Size 比较大而且Major收集时间较长的情况下使用更合适。



# 其他小技巧

## 我最爱的【演出模式】

我们可以使用【Presentation Mode】，将`IDEA`弄到最大，可以让你只关注一个类里面的代码，进行毫无干扰的`coding`。可以使用`Alt+V`快捷键，弹出`View`视图，然后选择`Enter Presentation Mode`。效果如下：
![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuc64ibKlVeda4KyHwkfsWaouicAC1S1v91vNibKl1TRyk5Mmxic2m0oQqxglrrRxTqKLzm3FVxuOoJ1bw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这个模式的好处就是，可以让你更加专注，因为你只能看到特定某个类的代码。可能读者会问，进入这个模式后，我想看其他类的代码怎么办？这个时候，就要考验你快捷键的熟练程度了。你可以使用`CTRL+E`弹出最近使用的文件。又或者使用`CTRL+N`和`CTRL+SHIFT+N`定位文件。

如何退出这个模式呢？很简单，使用`ALT+V`弹出view视图，然后选择`Exit Presentation Mode` 即可。但是我强烈建议你不要这么做，因为你是可以在`Enter Presentation Mode`模式下在`IDEA`里面做任何事情的。当然前提是，你对`IDEA`足够熟练。

------

## 神奇的Inject language

如果你使用`IDEA`在编写`JSON`字符串的时候，然后要一个一个`\`去转义双引号的话，就实在太不应该了，又烦又容易出错。在`IDEA`可以使用`Inject language`帮我们自动转义双引号。
![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuc64ibKlVeda4KyHwkfsWaouhx1YX3IvZIb7iawSXQe4X1GE3kh7AFss1o0pht4K03EdUNzakGvyWCw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

先将焦点定位到双引号里面，使用`alt+enter`快捷键弹出`inject language`视图，并选中
`Inject language or reference`。
![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuc64ibKlVeda4KyHwkfsWaoujs0OcOqRJ4vARhC1MlMkHx1bT4Gw2AfJZFV1rRDZtSlDSFvyJI8XaA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

选择后,切记，要直接按下`enter`回车键，才能弹出`inject language`列表。在列表中选择 `json`组件。
![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuc64ibKlVeda4KyHwkfsWaou5ZHHnLibCsEo6cTtyY9sZicVhYBNwvsyqWe98BnMUic05k7gc4VJToKdw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

选择完后。鼠标焦点自动会定位在双引号里面，这个时候你再次使用`alt+enter`就可以看到
![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuc64ibKlVeda4KyHwkfsWaouF9ymMlhWxzfOrsPyNic0CriclHL09yPUwJbXyrrWjkeEJicdSVSCrSSVg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

选中`Edit JSON Fragment`并回车，就可以看到编辑`JSON`文件的视图了。
![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuc64ibKlVeda4KyHwkfsWaouaAxfEv9CATNiboLnXpEStnoFPBuY6jdMicy2Al1PT6FxAVYMvVsFQVJQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

可以看到`IDEA`确实帮我们自动转义双引号了。如果要退出编辑`JSON`信息的视图，只需要使用`ctrl+F4`快捷键即可。

`Inject language`可以支持的语言和操作多到你难以想象，读者可以自行研究。

------

## 使用快捷键移动分割线

假设有下面的场景，某个类的名字在`project`视图里被挡住了某一部分。
![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuc64ibKlVeda4KyHwkfsWaouKr2YHGSboCyGG0U06XVECtN3MsRX05DDx1DnlK9yJqKmymicdeaSEqA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

你想完整的看到类的名字，该怎么做。一般都是使用鼠标来移动分割线，但是这样子效率太低了。可以使用`alt+1`把鼠标焦点定位到`project`视图里，然后直接使用`ctrl+shift+左右箭头`来移动分割线。

------



------

## 不要动不动就使用IDEA的重构功能

`IDEA`的重构功能非常强大，但是也有时候，在单个类里面，如果只是想批量修改某个文本，大可不必使用到重构的功能。比如说：
![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuc64ibKlVeda4KyHwkfsWaou1NpuFqYFzpwzzaE7lhPvYY3uNibkdfP2tEicjrDw4WMMibfXIQnYYRsHA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

上面的代码中，有5个地方用到了rabbitTemplate文本，如何批量修改呢？
首先是使用`ctrl+w`选中`rabbitTemplate`这个文本,然后依次使用5次`alt+j`快捷键，逐个选中，这样五个文本就都被选中并且高亮起来了，这个时候就可以直接批量修改了。
![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuc64ibKlVeda4KyHwkfsWaouJR4LxgLF8OCjKTSoTII9pu8yfFPuUric7A8slBibYMm3PnrynLJS20MQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



## 把鼠标定位到project视图里

当工程里的包和类非常多的时候，有时候我们想知道当前类在project视图里是处在哪个位置。
![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuc64ibKlVeda4KyHwkfsWaouLIia70ffezVNw2tqtvGIVl2KAkA1F7tJw3EZINkrMcKsA3AOF6kTSJQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

上面图中的`DemoIDEA`里，你如何知道它是在`spring-cloud-config`工程里的哪个位置呢？
可以先使用`alt+F1`，弹出`Select in`视图，然后选择`Project View`中的`Project`，回车，就可以立刻定位到类的位置了。

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuc64ibKlVeda4KyHwkfsWaouwJMWYxCDrLoTwOVD08DzWEFkDpgnuSic5wx29KGNzlGGiaRQ9SyjJaYA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)这里写图片描述

那如何从`project`跳回代码里呢？可以直接使用`esc`退出`project`视图，或者直接使用`F4`,跳到代码里。

------

## 强大的symbol

如果你依稀记得某个方法名字几个字母，想在`IDEA`里面找出来，可以怎么做呢？
直接使用`ctrl+shift+alt+n`，使用`symbol`来查找即可。
比如说：
![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuc64ibKlVeda4KyHwkfsWaouLiaPpMyzLlYZtjvlWHB5ZcJzXWj7kPHKm5Q5GKicQnzP0CQhZIUJDENg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

你想找到checkUser方法。直接输入`user`即可。
![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuc64ibKlVeda4KyHwkfsWaouvzicHe9nkkG98TJKAUyYVJMR4LfoNOFoOwvSNdpCibooKibDgTiaiayjHsQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

如果你记得某个业务类里面有某个方法，那也可以使用首字母找到类,然后加个`.`，再输入方法名字也是可以的。
![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuc64ibKlVeda4KyHwkfsWaouYiaVr8j30o8YAmdI88HeKA1jXVplExiavxdIypD6AvZtEUaU0icpHnGOg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

------

## 如何找目录

使用`ctrl+shift+n`后，使用`/`，然后输入目录名字即可.
![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuc64ibKlVeda4KyHwkfsWaouk3motdy7cn4FC2biaDcr3Hfic4hcVeNudwv8OadXc8K6dgvnQnn9l3ibQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



## 按照模板找内容

这个也是我非常喜欢的一个功能，可以根据模板来找到与模板匹配的代码块。比如说：

> 想在整个工程里面找到所有的try catch语句,但是catch语句里面没有做异常处理的。

catch语句里没有处理异常，是极其危险的。我们可以`IDEA`里面方便找到所有这样的代码。
![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuc64ibKlVeda4KyHwkfsWaouGMmQcbgrZtUR4vpfX3DHo0CtRPwM5XWmlQ9FenEZOjFuDYMgqT22AA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

首先使用`ctrl+shift+A`快捷键弹出action框，然后输入`Search Struct`
![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuc64ibKlVeda4KyHwkfsWaouPiaME7phsePM8WLeCTRPQiaDorHzIfEqR36fFhEibegMZJf9dpOlDVQPA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

选择`Search Structurally`后，回车，跳转到模板视图。
![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuc64ibKlVeda4KyHwkfsWaou4MLFxCQ2l17amxIic34aUX91kTQItSUDIgoyAmJZaRYZ0OBen6738kg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

点击`Existing Templates`按钮，选择`try`模板。为了能找出catch里面没有处理异常的代码块，我们需要配置一下`CatchStatement`的`Maximum count`的值，将其设置为1。

点击`Edit Variables`按钮，在界面修改`Maximum count`的值。
![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuc64ibKlVeda4KyHwkfsWaouKQbEUxIMDc1ibF61OlLNiceAoxcfUv2WEFJ1egs7OQuMP64jghs7zhqw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

最后点击`find`按钮，就可以找出catch里面没有处理异常的代码了。
![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbuc64ibKlVeda4KyHwkfsWaouMOoU3qrSzSQo4O2zWSkyWVxL7B0zv47FyUONp9ltqA0vffeZESibvibg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



# DataGrip

DataGrip 是由 JetBrains 公司（就是那个出品 Intellij IDEA 的公司,JetBrains出品，必属精品）推出的数据库管理软件。如果你不爱折腾的话，这家公司出品的很多 IDE 都是你的最佳选择，比如你进行 Python 开发的可以选择 JetBrains 全家桶中的 PyCharm 。

**DataGrip 支持几乎所有主流的关系数据库产品，如 DB2、Derby、H2、MySQL、Oracle、PostgreSQL、SQL Server、Sqllite 及 Sybase 等，并且提供了简单易用的界面，开发者上手几乎不会遇到任何困难。**

我相信，当你第一眼看到 DataGrip 以后，会有一种惊艳的感觉，就好比你第一眼看到一个姑娘，就是那么一瞥，你对自己说，就是她了！

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TydrqornfKia1R3ibaZ6icvTN66ib1JCFbgrKMMhuaaMuT9yKoXNVo1RsGvwKrwK5CgUKgUsq1CyREAIw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

废话不多说，来看看 DataGrip 的常用功能。

## 下载

DataGrip 下载链接如下 https://www.jetbrains.com/datagrip/download。安装过程也很简单，双击安装，下一步，中间会让你选择主题，本人选择的是经典的 Darcula，安装完成后，启动，界面如下

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5CdYZwUIhxhPCEicV7FKryhYGkgRg1n7XXReUw4FOSzbCWoVQC0cuGuQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



如果你使用的是 IDEA 的话，内置的数据库管理我觉得基本就够用了，不需要再重新下载PJ **DataGrip**了。



## 配置 Data Source

相信使用过 IDEA 的同学看到这个界面都会感到很亲切。`File->DataSource` ：配置数据源。

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5xI8jicKJJGWIH65GQlqZibKVzzcX2AsguWNiaKrQ19icXXtDJ2lLiculcpQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)DataGrip 支持主流的数据库。你也可以在 Database 视图中展开绿色的+号，添加数据库连接

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5qN1huNf9hATvwrTqVZG5YTibygGMSibYsDk95OAxtV76JRZibw51dzbbQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)选择需要连接的数据库类型

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5XYmOoR4wfxctHeq1X5mZEPnYRcCjmVN39ZQXQsdRK3z7icvAnibiaW09g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

在面板中，左上部分列出了已经建立的数据库连接，点击各项，右侧会展示当前连接的配置信息，General 面板中，可以配置数据库连接的信息，如主机、用户名、密码等，不同数据库配置信息不完全相同，填入数据库 URL，注意，URL 后有个选项，可以选择直接填入 url，那么就不需要单独填主机名、端口等信息了。

Driver 部分显示数据库驱动信息，如果还没有下载过驱动，底部会有个警告，提示缺少驱动

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5HlJZn0nTN8BZ3s8xxqiblL5FQzqe21ARiaD17lvfM5ibSicJ4RE546duGA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)点击 Driver 后的数据库类型，会跳转到驱动下载页面，点击 download，下载完会显示驱动包

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5GeU1ibO0MYaSNHHFzDToM9GGGBGSjdniczyiaGGicNf3W8ct21xVwGnS0w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd58K9ZEJgZ3IgcpuiazvRSj91pHmubfy7VYFFmVzBCichUp3iaXTbyzHdCQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)如果下载的驱动有问题，可以手动添加本地驱动包，在试用过程中，创建 Oracle 连接时，下载的驱动包就有问题，提示缺少 class，点击右侧绿色的+号，选择本地下载好的 jar 包，通过右侧上下箭头，将导入的 jar 包移到最上位置就 OK 了

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5xDjjfm8yxHG0EFcBlYAE9ThstYwGibQKDQkoaf4iaAmiaTyjEq5tZSIBw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

点击 Test Connection，查看配置是否正确，接下来就可以使用了。

## 常用设置

打开 DataGrip，选择 `File->Settings`，当前面板显示了常用设置项

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5ZVDib3mfiarqx7G2fbVCDCn4t4ibrwv02TcAnSWCiaS0w7W6BwzCwyjZhA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)基本上默认设置就足够了，要更改设置也很简单，左侧菜单已经分类好了，第一项是数据库相关的配置，第二项是配置外观的，在这里可以修改主题，key map 修改快捷键，editor 配置编辑器相关设置，在这里可以修改编辑器字体，展开 edit 项: `Editor->Color & Fonts->Font`

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5icaYZoeLoAibicF8zfoU8cvJupzzfV6NXaYnmIcgjFeJgVxu6mqWqJnVw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)需要将当前主题保存一下，点击 save as，起个名，选择重命名后的主题就能修改了，这里我选择习惯的 Conurier New 字体，大小为 14 号，点击右下角的 apply，点击 OK

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5S9CFnL96UciaHRJ7bU505hHoxs6NqRs6hhibnibdUfic2OqjZMabkCMbgA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)点击查看原始大小图片

其他的没啥好设置的了。

## 数据库常用操作

接下来，我们来使用 DataGrip 完成数据库的常用操作，包括查询数据、修改数据，创建数据库、表等。

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5icbHGVw1Q3Eg8mYXEwgZRgjntyWLvC8uwX85sFVRkpc0IENFWmiayffg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)左上区域显示了当前数据库连接，展开后会显示数据库表等信息，如果展开后没有任何信息，需要选中数据库连接，点击上面的旋转图标同步一下，下方有个 More Schema 选项，点击可以切换不同的 schema。

### sql 语句编写

右键选中的数据库连接，选择 open console，就可以在右侧的控制台中书写 sql 语句了。

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5LibcXGL2qnU66IqqGJyzsX8ArpCIY8uHWiaIT2056vsiabaSk6jViaZLOQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**
DataGrip 的智能提示非常爽，无论是标准的 sql 关键字，还是表名、字段名，甚至数据库特定的字段，都能提示，不得不感叹这智能提示太强大了，Intellij IDEA 的智能提示也是秒杀 eclipse。**

写完 sql 语句后，可以选中，电子左上侧绿色箭头执行

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5KJMsOswzaztIVOY2k4dv2ykKssW8n0IpGtibNGAmPyibxUma7ibjOveKA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)也可以使用快捷键 `Ctrl+Enter`，选中情况下，会直接执行该 sql，未选中情况下，如果控制台中有多条 sql，会提示你要执行哪条 sql。

之前习惯了 dbvisualizer 中的操作，dbvisualizer 中光标停留在当前 sql 上(sql 以分号结尾)，按下`Ctrl+.`快捷键会自动执行当前 sql，其实 DataGrip 也能设置，在 `setting->Database-General`中

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5lGfrLI0lk8icBZmKxOjfGBoJ7mvyalhQolIhdpiaNL6tyycOzdqsBpJQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)语句执行时默认是提示，改成 smallest statement 后，光标停留在当前语句时，按下 Ctrl+Enter 就会直接执行当前语句。

语句的执行结果在底部显示

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5fNBcnFd5huRH1NuXTsY66RQibrhMEY0E3sIk43hFZUaF30hOibsZM7Pw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)如果某列的宽度太窄，可以鼠标点击该列的任意一个，使用快捷键`Ctrl+Shift+左右箭头`可以调整宽度，如果要调整所有列的宽度，可以点击左上角红框部分，选择所有行，使用快捷键`Ctrl+Shift+左右箭头调整`

### 修改数据

添加行、删除行也很方便，上部的+、-按钮能直接添加行或删除选中的行，编辑列同样也很方便，双击要修改的列，输入修改后的值，鼠标在其他部分点击就完成修改了

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd50uokNJ7tJVrY6WMB6AaCXpM0D9PiawlicMUk4Dyg5WyTUvw30KaUiaf3g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)有的时候我们要把某个字段置为 null，不是空字符串""，DataGrip 也提供了渐变的操作，直接在列上右键，选择 set null

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5p65DH7RgiaZ9FhWpI5icic5lIP5XgDxWds7xmwsvUBfoM6vuNW01C75AA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)对于需要多窗口查看结果的，即希望查询结果在新的 tab 中展示，可以点击 pin tab 按钮，那新查询将不会再当前 tab 中展示，而是新打开一个 tab

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5cFdUppiakdq8MdTcibdYqFIlaI4bGolSffcjBT1x9ETlCyKyWtn4j4zQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

旁边的 output 控制台显示了执行 sql 的日志信息，能看到 sql 执行的时间等信息

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5HC8RrhbSicdI1iapdGUYvicC1pacGbmvandb0dOKicN53OEbBztYD4sYicA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)我就问这么吊的工具，还有谁！！！

### 新建表

要新建表也是相当简单、智能，选中数据库连接，点击绿色+号下选择 table

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5LxKMd0lRxnKftzxqRlSERZibkM0tFrGoWNH173AWQgQTIlz4LO7C9xA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)在新打开的窗口中，可以填写表信息

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5PGqgH5FgW8uGYA2TySt7hZVrYgvARGEynkAib7Cz4nqGzHz5TZztFKA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)我就问你看到这个窗口兴奋不兴奋！！！

顶部可以填写表名、表注释，中间可以点击右侧绿色+号添加列，列类型 type 也是能自动补全，default 右侧的消息框图标点击后能对列添加注释，旁边的几个 tab 可以设置索引及外键

所有这些操作的 DDL 都会直接在底部显示

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5sBtdiakgckRr637j8Wu6Iq8Mc86z1k4gzLJpQegFzWU9QnOOS4RIarw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)我就问你怕不怕

表建完后，可以点击下图中的 table 图标，打开表查看视图

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5cPoZc78rxGVZ4WUrl6HfVmHeJa3LpzAnG4eYuUohqAYOqiapibTo59SQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)可以查看表的数据，也能查看 DDL 语句

### 数据库导出

这些基本功能的设计、体验，已经惊艳到我了，接下来就是数据的导出。

DataGrip 的导出功能也是相当强大，选择需要导出数据的表，右键，Dump Data To File

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5H01ZKcuicxXViaDnJk0Oia5BbicxrnOTxXtOfFx5N9kMvjlhWQSRUicLtfg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)即可以导出 insert、update 形式的 sql 语句，也能导出为 html、csv、json 格式的数据

也可以在查询结果视图中导出

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5Xs1UHYFXPiatLjfhkypCY54y7yr4nDwd8hwjYI4vOheG1AQgWAVWu6w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)点击右上角下载图标，在弹出窗口中可以选择不同的导出方式，如 sql insert、sql update、csv 格式等

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5jskVug7q1v7AjNCEbFicceK9VXtAQKqsXVhBQvV3ftpfjVovtgicSx0Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

如果是导出到 csv 格式，还能控制导出的格式

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5hMnw8hXTSX4SEdj1lnPaLUia1mfaKNhFODdTstZJ391f37oqPltoHxA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

导出后用 excel 打开是这种结果

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5bzjpuhKkCV0ciaGqAuHc6mqAkYXeR3o2ZxSibUg4l94mevGy80eeibfHg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)除了能导出数据外，还能导入数据

选择表，右键->Import from File，选择要导入的文件

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd50NkEIZ4SvzICCTRheIv19LMI6nqjsbiaawPmkWWHn2iaLX3WBs5VeiaDQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)注意，导出的时候如果勾选了左侧的两个 header 选项，导入的时候如果有 header，也要勾选，不然会提示列个数不匹配

## 小技巧

### 导航+全局搜索

#### 关键字导航

当在 datagrip 的文本编辑区域编写 sql 时，按住键盘 Ctrl 键不放，同时鼠标移动到 sql 关键字上，比如表名、字段名称、或者是函数名上，鼠标会变成手型，关键字会变蓝，并加了下划线，点击，会自动定位到左侧对象树，并选中点击的对象

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5XmJ8ZzWEkt6BYBsuiapJgPzOh5uogvM4YwhIh1XV85V8GQicnnhTg3rg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### 快速导航到指定的表、视图、函数等

在 datagrip 中，使用 Ctrl+N 快捷键，弹出一个搜索框，输入需要导航的名称，回车即可

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5EIH7yuf97LD4eeGQcjuyIn1tReLEEG1icJY1SUial1u3r9Sp44zkoCnw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### 全局搜索

连续两次按下 shift 键，或者鼠标点击右上角的搜索图标，弹出搜索框，搜索任何你想搜索的东西

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5C4466RpZiaPfwnSG3OqDP2YvotWZ3D20R2OgG04lfIe9YcZjf5EzzsA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### 结果集搜索

在查询结果集视图区域点击鼠标，按下 Ctrl+F 快捷键，弹出搜索框，输入搜索内容，支持正则表达式、过滤结果

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5ujwq7p9lc6K3xQkp4cM7fOiarj5Ab2KXNtI4JCEGg9gUicmu5G59Sjxg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### 导航到关联数据

表之间会有外检关联，查询的时候，能直接定位到关联数据，或者被关联数据，例如 user1 表有个外检字段 classroom 指向 classroom 表的主键 id，在查询 classroom 表数据的时候，可以在 id 字段上右键，go to，referencing data

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5tFGXRKacs4gBcyeibALp6NwzYkhHtKicHibn9Nj1O3lmSh115Ihu7jSTA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)选择要显示第一条数据还是显示所有数据

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5cNEa8QpBqFt7ccz4DBhdU5lpMXhiaNNbhjIUFPr9f1Mic9ONpybWqicIw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)会自动打开关联表的数据

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5UUSNLqSnZyuLBnpKoFjNqxRoSeAeWEiaph5I7TUA5FYnqCNlGe0dVdA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)相反，查询字表的数据时，也能自动定位到父表

### 数据转换

#### 结果集数据过滤

对于使用 table edit（对象树中选中表，右键->table editor）打开的结果集，可以使用条件继续过滤结果集，如下图所示，可以在结果集左上角输入款中输入 where 条件过滤

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5Mj5zjhqVGCKkeLbibgKibDQmXaxic2iaIibbLicnxGAicGO52CC1UfPlbW0yw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)也可以对着需要过滤数据的列右键，filter by 过滤

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5QKWMMZk5uT8V1ZPrjia9Ric9lnqQMGacZNjDKHsX0ZncqxOhBkrZUmAw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### 行转列

对于字段比较多的表，查看数据要左右推动，可以切换成列显示，在结果集视图区域使用 Ctrl+Q 快捷键

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5uT6GNfF6Q1ic6EA4JMMynPjIAGK8tdCASwvPWNDNZesg4HFzsjRD6Sg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### 变量重命名

鼠标点击需要重命名的变量，按下 Shift+F6 快捷键，弹出重命名对话框，输入新的名称

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5dWJ3fLrdxibJ8vFd7ge6mlWqgjJrNwCh8NeX5TvetYZOrQmXiaXf0akQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### 自动检测无法解析的对象

如果表名、字段名不存在，datagrip 会自动提示，此时对着有问题的表名或字段名，按下 Alt+Enter，会自动提示是否创建表或添加字段

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5QJaY87P4OjFnWP0MwqQLUT16WsOcviauaWicOD8hESBl9yIXPPic7RLPw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### 权限定字段名

对于查询使用表别名的，而字段中没有使用别名前缀的，datagrip 能自动添加前缀，鼠标停留在需要添加别名前缀的字段上，使用 Alt+Enter 快捷键

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5NHTibqoxTrFPRKqnd7ODgaG1qUddEqvJKtdSjxGlC2JDSFGcxxMttEA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 格式化

#### *通配符自动展开

查询的时候我们会使用 select *查询所有列，这是不好的习惯，datagrip 能快速展开列，光标定位到*后面，按下 Alt+Enter 快捷键

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5gaoKUic1XZiblBczyroOvMSFxs72CxIlzDtqLN2ibQ8BDR7IwzyFPbZqA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### 大写自动转换⭐

> sql 使用大写形式是个好的习惯，如果使用了小写，可以将光标停留在需要转换的字段或表名上，使用 Ctrl+shift+U 快捷键自动转换
>

#### sql 格式化

> 选中需要格式化的 sql 代码，使用 Ctrl+Alt+L 快捷键，datagrip 提供了一个功能强大的编辑器，实现了 notpad++的列编辑模式
>

### 列编辑

#### 多光标模式

> 在编辑 sql 的时候，可能需要同时输入或同时删除一些字符，按下 alt+shift，同时鼠标在不同的位置点击，会出现多个光标
>

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5TVB5YuQg2Eah1zKRCiaW8LA0C4cZkRMzwuR2ibicahqCHl12hvhQucgFg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### 代码注释

选中要注释的代码，按下 Ctrl+/或 Ctrl+shift+/快捷键，能注释代码，或取消注释

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5yMCwre4WfZUn1Qyj8W30cmPnVGibtdmVqFPOWBvQUG9YJp7exsYg0icA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### 列编辑

按住键盘 Alt 键，同时按下鼠标左键拖动，能选择多列，拷贝黏贴等操作

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd59W2hico5YdFUMFiaQdaiagMQxeseqeiaU5iaZ7m60Fr4XTcEIfkqC24SOvg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 历史记录

#### 代码历史

在文本编辑器中，邮件，local history，show history，可以查看使用过的 sql 历史

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5O20lWlKTIIEUrx48NFWdLecNhnAMIG9yqKI4qIiaCMlM1aYL8uIH8yw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### 命令历史

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9TzUdlYibqcawzTbnibeicw1yd5y0dze0kalxbNHq8SF5B7egLMKBZh484WdPfAoCcNtib6XzV1yaS4Osg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 运行

> 在每次写完sql后，都要用鼠标手动去点击一下执行这个图标，会让人不厌其烦，而datagrip中也提供了运行的快捷键，ctrl + enter,如下图，成功运行：



# PyCharm

## 快捷键

### 1、代码编辑

| 序号 | 快捷键             | 作用                           |
| ---- | ------------------ | ------------------------------ |
| 1    | CTRL+ALT+SPACE     | 快速导入任意类                 |
| 2    | CTRL+SHIFT+ENTER   | 代码补全                       |
| 3    | SHIFT+F1           | 查看外部文档                   |
| 4    | CTRL+Q             | 快速查找文档                   |
| 5    | CTRL+P             | 参数信息（在方法中调用的参数） |
| 6    | CTRL+MOUSEOVERCODE | 基本信息                       |
| 7    | CTRL+F1            | 显示错误或警告的描述           |
| 8    | CTRL+INSERT        | 生成代码                       |
| 9    | CTRL+O             | 重载方法                       |
| 10   | CTRL+ALT+T         | 包裹代码                       |
| 11   | CTRL+/             | 单行注释                       |
| 12   | CTRL+SHIFT+/       | 块注释                         |
| 13   | CTRL+W             | 逐步选择代码（块）             |
| 14   | CTRL+SHIFT+W       | 逐步取消选择代码（块）         |
| 15   | CTRL+SHIFT+[       | 从当前位置选择到代码块的开始   |
| 16   | CTRL+SHIFT+]       | 从当前位置选择到代码块的结束   |
| 17   | ALT+ENTER          | 代码快速修正                   |
| 18   | CTRL+ALT+L         | 代码格式标准化                 |
| 19   | CTRL+ALT+O         | 最佳化导入                     |
| 20   | CTRL+ALT+I         | 自动缩进                       |
| 21   | TAB                | 代码向后缩进                   |
| 23   | SHIFT+TAB          | 代码向前取消缩进               |
| 24   | CTRL+SHIFT+V       | 历史复制粘贴表                 |
| 25   | CTRL+D             | 复制当前代码行/块              |
| 26   | CTRL+Y             | 删除当前代码行/块              |
| 27   | CTRL+SHIFT+J       | 代码连接为一行                 |
| 28   | SHIFT+ENTER        | 开启新一行                     |
| 28   | CTRL+SHIFT+U       | 字母大写                       |
| 29   | CTRL+DELETE        | 向后逐渐删除                   |
| 30   | CTRL+BACKSPACE     | 向前逐渐删除                   |
| 31   | CTRL+NUMPAD+/-     | 代码块展开/折叠                |
| 32   | CTRL+SHIFT+NUMPAD+ | 所有代码块展开叠               |
| 33   | CTRL+SHIFT+NUMPAD- | 所有代码块折叠                 |
| 34   | CTRL+F4            | 关闭活动编辑窗口               |

### 2、搜索/替换

| 序号 | 快捷键       | 作用           |
| ---- | ------------ | -------------- |
| 1    | CTRL+F       | 查找           |
| 2    | F3           | 查找下一个     |
| 3    | SHIFT+F3     | 查找上一个     |
| 4    | CTRL+R       | 替换           |
| 5    | CTRL+SHIFT+F | 指定路径下查找 |
| 6    | CTRL+SHIFT+R | 指定路径下替换 |

### 3、代码运行

| 序号 | 快捷键         | 作用                     |
| ---- | -------------- | ------------------------ |
| 1    | ALT+SHIFT+F10  | 选择程序文件并运行代码   |
| 2    | ALT+SHIFT+F9   | 选择程序文件并调试代码   |
| 3    | SHIFT+F10      | 运行代码                 |
| 4    | SHIFT+F9       | 调试代码                 |
| 5    | CTRL+SHIFT+F10 | 运行当前编辑区的程序文件 |

### 4、代码调试

| 序号 | 快捷键   | 作用                 |
| ---- | -------- | -------------------- |
| 1    | F8       | 单步                 |
| 2    | F7       | 单步（无函数时同F8） |
| 3    | SHIFT+F8 | 单步跳出             |
| 4    | ALT+F9   | 运行到光标所在位置处 |
| 5    | ALT+F8   | 测试语句             |
| 6    | F9       | 重新运行程序         |
| 7    | CTRL+F8  | 切换断点             |
| 8    | CTRL+F8  | 查看断点             |

### 5、应用搜索

| 序号 | 快捷键        | 作用             |
| ---- | ------------- | ---------------- |
| 1    | ALT+F7        | 查找应用         |
| 2    | CTRL+F7       | 在文件中查找应用 |
| 3    | CTRL+SHIFT+F7 | 在文件中高亮应用 |
| 4    | CTRL+ALT+F7   | 显示应用         |

### 6、代码重构

| 序号 | 快捷键     | 作用             |
| ---- | ---------- | ---------------- |
| 1    | F5         | 复制文件         |
| 2    | F6         | 移动文件         |
| 3    | SHIFT+F6   | 重命名           |
| 4    | ALT+DELETE | 安全删除         |
| 5    | CTRL+F6    | 改变函数形式参数 |
| 6    | CTRL+ALT+M | 将代码提取为函数 |
| 7    | CTRL+ALT+V | 将代码提取为变量 |
| 8    | CTRL+ALT+C | 将代码提取为常数 |
| 9    | CTRL+ALT+F | 将代码提取为字段 |
| 10   | CTRL+ALT+P | 将代码提取为参数 |

### 7、动态模块

| 序号 | 快捷键     | 作用             |
| ---- | ---------- | ---------------- |
| 1    | CTRL+ALT+J | 使用动态模板包裹 |
| 2    | CTRL+J     | 插入动态模板     |

### 8、导航

| 序号 | 快捷键               | 作用                           |
| ---- | -------------------- | ------------------------------ |
| 1    | CTRL+N               | 进入类                         |
| 2    | CTRL+SHIFT+N         | 进入文件                       |
| 3    | CTRL+ALT+SHIFT+N     | 进入符号                       |
| 4    | CTRL+←←              | 进入上一个编辑位置             |
| 5    | CTRL+→→              | 进入下一个编辑位置             |
| 6    | CTRL+→→              | 进入下一个编辑位置             |
| 7    | SHIFT+ESC            | 隐藏活动/最后活动的窗口        |
| 8    | CTRL+SHIFT+F4        | 关闭活动的运行/消息/查找等窗口 |
| 9    | CTRL+G               | 显示光标所在行与列             |
| 10   | CTRL+E               | 弹出最近打开的文件             |
| 11   | CTRL+ALT+←/→←/→      | 向前/向后导航                  |
| 12   | CTRL+SHIFT+BACKSPACE | 导航到最后编辑的位置           |
| 13   | CTRL+B               | 跳转到声明部分                 |
| 14   | CTRL+CLICK(鼠标左键) | 跳转到声明部分                 |
| 15   | CTRL+ALT+B           | 跳转到代码实施部分             |
| 16   | CTRL+SHIFT+I         | 打开快速定义查找               |
| 16   | CTRL+SHIFT+B         | 跳转到类型说明                 |
| 17   | CTRL+U               | 跳转超类/方法                  |
| 18   | CTRL+↑↑              | 跳转到上一个方法               |
| 19   | CTRL+↓↓              | 跳转到下一个方法               |
| 20   | CTRL+[               | 跳转到代码块的开头             |
| 21   | CTRL+]               | 跳转到代码块的结尾             |
| 22   | CTRL+F12             | 弹出文件结构                   |
| 23   | CTRL+H               | 弹出类层次结构                 |
| 24   | CTRL+SHIFT+H         | 弹出方法层次结构               |
| 25   | CTRL+ALT+H           | 弹出调用层次结构               |
| 26   | F2/SHIFT+F2          | 下一个/上一个错误              |
| 27   | F4                   | 查看源代码                     |
| 28   | ALT+HOME             | 显示导航栏                     |
| 29   | F2/SHIFT+F2          | 下一个/上一个错误              |
| 30   | F11                  | 增加书签                       |
| 31   | CTRL+F11             | 增加数字/字母书签              |
| 32   | CTRL+SHIFT+[1-9]     | 增加数字书签                   |
| 33   | SHIFT+F11            | 显示书签                       |

### 9、通用

| 序号 | 快捷键         | 作用                         |
| ---- | -------------- | ---------------------------- |
| 1    | ALT+[0-9]      | 打开相应的工具窗口           |
| 2    | CTRL+ALT+Y     | 同步                         |
| 3    | CTRL+SHIFT+F12 | 最大化编辑器                 |
| 4    | ALT+SHIFT+F    | 添加到收藏夹                 |
| 5    | ALT+SHIFT+I    | 使用当前配置文件检查当前文件 |
| 6    | CTRL+ALT+S     | 快速出现设置对话框           |
| 7    | CTRL+SHIFT+A   | 查找并调试编辑器的功能       |
| 8    | ALT+TAB        | 在选项卡和工具窗口之间切换   |

## 插件

### Rainbow CSV

该插件的作用在于能够对`CSV`文件当中的不同的行都可以用不同的颜色标出，如下图所示

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304151111384.png" alt="image-20230415111115217" style="zoom:80%;" />

这样当我们查阅起`CSV`文件的时候自然会方便许多

### Rainbow Brackets

该插件的作用在于能够将括号以不同的颜色标注出来，这个非常的便捷在于我们能够快速地找出到底有哪几个括号是缺失的，如下图所示

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304151111941.png" alt="image-20230415111123783" style="zoom:67%;" />

### Indent Rainbow

该插件的作用在于能够对于不同层级缩进的空格标注不同的颜色，如下图所示

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304151111873.png" alt="image-20230415111148713" style="zoom:80%;" />

### Tabnine 

该插件主要在于可以帮助我们自动填充代码，由于是在**人工智能技术**的驱动之下，因此每次都可以精准的预测我们将要填充的究竟是什么代码。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304151112259.png" alt="image-20230415111208088" style="zoom:80%;" />

### CodeGlance

该插件的主要作用表现为会在`IDE`的最右侧生成一条工具栏，这样可以更加便捷的跳转至所要寻找的代码位置

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304151112797.png" alt="image-20230415111237618" style="zoom:80%;" />

### Material Theme

该插件的作用在于能够为`Pycharm`提供多种不同的页面风格大家则可以根据自己的喜好选择不同风格的页面

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304151113412.png" alt="image-20230415111317257" style="zoom:80%;" />













































