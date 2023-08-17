

# Zabbix

## Zabbix 入门

### Zabbix 概述

> Zabbix 是一款能够监控各种网络参数以及服务器健康性和完整性的软件。Zabbix 使用灵活的通知机制，允许用户为几乎任何事件配置基于邮件的告警，这样可以快速反馈服务器的问题。基于已存储的数据，Zabbix 提供了出色的报告和数据可视化功能。Zabbix 支持轮询和被动捕获。

> 基于 Web 的前端页面确保您的网络状态和服务器健康状况可以从任何地方进行评估。在经过适当的配置后，Zabbix 可以在监控 IT 基础设施方面发挥重要作用。无论是对于拥有少量服务器的小型组织，还是拥有大量服务器的大型公司而言，同样适用。

### 基础架构

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201027642.png" alt="image-20230420102725573" style="zoom:80%;" />

> 核心组件主要是 Agent 和 Server，其中 Agent 主要负责采集数据并通过主动或者被动的方式采集数据发送到 Server/Proxy，除此之外，为了扩展监控项，Agent 还支持执行自定义脚本。Server 主要负责接收 Agent 发送的监控信息，并进行汇总存储，触发告警等。

> Zabbix Server 将收集的监控数据存储到 Zabbix Database 中。Zabbix Database 支持常用的关系型数据库，如果 MySQL、PostgreSQL、Oracle 等，默认是 MySQL，并提供 Zabbix Web页面（PHP 编写）数据查询。

### Zabbix 和 Prometheus

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201028190.png" alt="image-20230420102812122" style="zoom:80%;" />

> **从开发语言上看**，为了应对高并发和快速迭代的需求，监控系统的开发语言已经慢慢从 C 语言转移到 Go。不得不说，Go 凭借简洁的语法和优雅的并发，在 Java占据业务开发，C 占领底层开发的情况下，准确定位中间件开发需求，在当前开源中间件产品中被广泛应用。

> **从系统成熟度上看**，Zabbix 是老牌的监控系统：Zabbix 是在 1998 年就出现的，系统功能比较稳定，成熟度较高。而 Prometheus 是最近几年才诞生的，虽然功能还在不断迭代更新，但站在巨人的肩膀之上，在架构设计上借鉴了很多老牌监控系统的经验；

> **从数据存储方面来看**，Zabbix 采用关系数据库保存，这极大限制了 Zabbix 采集的性能，而 Prometheus 自研一套高性能的时序数据库，在 V3 版本可以达到每秒千万级别的数据存储，对接第三方时序数据库扩展历史数据的存储

> **从配置复杂度上看**，Prometheus只有一个核心 server 组件，一条命令便可启动，相比，其他系统配置相对麻烦；

> **从社区活跃度上看**，目前 Zabbix 比较活跃，但基本都是国内的公司参与，Prometheus 在这方面占据绝对优势，社区活跃度虽然不如，但是受到 CNCF 的支持，后期的发展值得期待；

> **从容器支持角度看，**由于 Zabbix 出现得比较早，当时容器还没有诞生，自然对容器的支持也比较差。而 Prometheus 的动态发现机制，不仅可以支持 swarm 原生集群，还支持Kubernetes 容器集群的监控，是目前容器监控最好解决方案。

> 如果监控的是物理机，用 Zabbix，Zabbix 在传统监控系统中，尤其是在服务器相关监控方面，占据绝对优势。甚至环境变动不会很频繁的情况下，Zabbix 也会比 Prometheus 好使；但如果是云环境的话，除非是 Zabbix 玩的非常溜，可以做各种定制，否则还是Prometheus 吧，毕竟人家就是干这个的。Prometheus 开始成为主导及容器监控方面的标配，并且在未来可见的时间内被广泛应用。如果是刚刚要上监控系统的话，不用犹豫了，Prometheus 准没错

## Zabbix 部署

### 集群规划

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201032136.png" alt="image-20230420103218077" style="zoom:80%;" />

### 准备工作

如果集群开启，先关闭集群。因为安装 Zabbix 前，需要重启虚拟机

```sh
# 关闭 3 台节点防火墙
# 分别在 102、103 和 104 上执行
sudo systemctl stop firewalld.service
sudo systemctl disable firewalld.service
```

```sh
# 关闭 3 台节点上的 SELinux
sudo vim /etc/selinux/config
```

修改如下内容

```properties
# This file controls the state of SELinux on the system.
# SELINUX= can take one of these three values:
# enforcing - SELinux security policy is enforced.
# permissive - SELinux prints warnings instead of enforcing.
# disabled - No SELinux policy is loaded.
SELINUX=disabled
# SELINUXTYPE= can take one of these two values:
# targeted - Targeted processes are protected,
# mls - Multi Level Security protection.
SELINUXTYPE=targeted
```

```sh
# 重启服务器
sudo reboot
```

#### 配置 Zabbix yum 源

> 三台均执行

```sh
# 安装 zabbix 的软件仓库配置包，这个包包含了 yum（软件包管理器）的配置文件。
sudo rpm -Uvh https://mirrors.aliyun.com/zabbix/zabbix/5.0/rhel/7/x86_64/zabbix-release-5.0-1.el7.noarch.rpm
# 安装 Software Collections 仓库
sudo yum install -y centos-release-scl
```

#### 修改 zabbix 仓库配置文件

hadoop102、hadoop103、hadoop104 三台节点，依次执行如下步骤。

 **查看原始 zabbix.repo 文件**

```sh
sudo cat /etc/yum.repos.d/zabbix.repo
```

查看内容如下

```sh
[zabbix]
name=Zabbix Official Repository - $basearch
baseurl=http://repo.zabbix.com/zabbix/5.0/rhel/7/$basearch/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-ZABBIX-A14FE591
[zabbix-frontend]
name=Zabbix Official Repository frontend - $basearch
baseurl=http://repo.zabbix.com/zabbix/5.0/rhel/7/$basearch/frontend
enabled=0
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-ZABBIX-A14FE591
[zabbix-debuginfo]
name=Zabbix Official Repository debuginfo - $basearch
baseurl=http://repo.zabbix.com/zabbix/5.0/rhel/7/$basearch/debuginfo/
enabled=0
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-ZABBIX-A14FE591
gpgcheck=1
[zabbix-non-supported]
name=Zabbix Official Repository non-supported - $basearch
baseurl=http://repo.zabbix.com/non-supported/rhel/7/$basearch/
enabled=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-ZABBIX
gpgcheck=1
```

**执行以下命令完成全局替换，修改为阿里云镜像**

```sh
sudo sed -i 's/http:\/\/repo.zabbix.com/https:\/\/mirrors.aliyun.com\/zabbix/
g' /etc/yum.repos.d/zabbix.repo
```

**查看修改之后的 zabbix.repo 文件**

```
sudo cat /etc/yum.repos.d/zabbix.repo
```

```sh
[zabbix]
name=Zabbix Official Repository - $basearch
baseurl=https://mirrors.aliyun.com/zabbix/zabbix/5.0/rhel/7/$basearch/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-ZABBIX-A14FE591
[zabbix-frontend]
name=Zabbix Official Repository frontend - $basearch
baseurl=https://mirrors.aliyun.com/zabbix/zabbix/5.0/rhel/7/$basearch/frontend
enabled=0
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-ZABBIX-A14FE591
[zabbix-debuginfo]
name=Zabbix Official Repository debuginfo - $basearch
baseurl=https://mirrors.aliyun.com/zabbix/zabbix/5.0/rhel/7/$basearch/debuginfo/
enabled=0
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-ZABBIX-A14FE591
gpgcheck=1
[zabbix-non-supported]
name=Zabbix Official Repository non-supported - $basearch
baseurl=https://mirrors.aliyun.com/zabbix/non-supported/rhel/7/$basearch/
enabled=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-ZABBIX
gpgcheck=1
```

**打开/etc/yum.repos.d/zabbix.repo 文件，启用 zabbix-web 仓库**

```sh
[zabbix]
name=Zabbix Official Repository - $basearch
baseurl=https://mirrors.aliyun.com/zabbix/zabbix/5.0/rhel/7/$basearch/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-ZABBIX-A14FE591
[zabbix-frontend]
name=Zabbix Official Repository frontend - $basearch
baseurl=https://mirrors.aliyun.com/zabbix/zabbix/5.0/rhel/7/$basearch/frontend
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-ZABBIX-A14FE591
[zabbix-debuginfo]
name=Zabbix Official Repository debuginfo - $basearch
baseurl=https://mirrors.aliyun.com/zabbix/zabbix/5.0/rhel/7/$base
arch/debuginfo/
enabled=0
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-ZABBIX-A14FE591
gpgcheck=1
[zabbix-non-supported]
name=Zabbix Official Repository non-supported - $basearch
baseurl=https://mirrors.aliyun.com/zabbix/non-supported/rhel/7/$basearch/
enabled=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-ZABBIX
gpgcheck=1
```

### 安装 Zabbix

**在 hadoop102、hadoop103、hadoop104 三台节点分别执行以下安装命令**

```sh
sudo yum install -y zabbix-server-mysql zabbix-agent zabbix-web-mysql-scl zabbix-apache-conf-scl
sudo yum install -y zabbix-agent
sudo yum install -y zabbix-agent
```

### 配置 Zabbix

**创建 zabbix 数据库**

```sh
mysql -uroot -p123456 -e"create database zabbix character set utf8 collate utf8_bin"
```

**导入 Zabbix 建表语句**

```sh
zcat /usr/share/doc/zabbix-server-mysql-5.0.18/create.sql.gz | mysql -uroot -p123456 zabbix
```

**配置 Zabbix_Server（hadoop102）**

**修改 zabbix-server 配置文件**

```sh
sudo vim /etc/zabbix/zabbix_server.conf
DBHost=hadoop102
DBName=zabbix
DBUser=root
DBPassword=123456
```

**配置 Zabbix_Agent（三台节点）**

**修改 zabbix-agent 配置文件**

```sh
sudo vim /etc/zabbix/zabbix_agentd.conf
Server=hadoop102
#ServerActive=127.0.0.1
#Hostname=Zabbix server
```

**配置 Zabbix_Web 时区**

**修改/etc/opt/rh/rh-php72/php-fpm.d/zabbix.conf 文件**

```sh
sudo vim /etc/opt/rh/rh-php72/php-fpm.d/zabbix.conf
[zabbix]
user = apache
group = apache
listen = /var/opt/rh/rh-php72/run/php-fpm/zabbix.sock
listen.acl_users = apache
listen.allowed_clients = 127.0.0.1
pm = dynamic
pm.max_children = 50
pm.start_servers = 5
pm.min_spare_servers = 5
pm.max_spare_servers = 35
php_value[session.save_handler] = files
php_value[session.save_path] = 
/var/opt/rh/rh-php72/lib/php/session/
php_value[max_execution_time] = 300
php_value[memory_limit] = 128M
php_value[post_max_size] = 16M
php_value[upload_max_filesize] = 2M
php_value[max_input_time] = 300
php_value[max_input_vars] = 10000
php_value[date.timezone] = Asia/Shanghai
```

### 启动停止 Zabbix

#### 启动 Zabbix

```sh
sudo systemctl start zabbix-server zabbix-agent httpd rh-php72-php-fpm
sudo systemctl enable zabbix-server zabbix-agent httpd rh-php72-php-fpm
sudo systemctl start zabbix-agent
sudo systemctl enable zabbix-agent
sudo systemctl start zabbix-agent
sudo systemctl enable zabbix-agent
```

#### 停止 Zabbix

```sh
sudo systemctl stop zabbix-server zabbix-agent httpd rh-php72-php-fpm
sudo systemctl disable zabbix-server zabbix-agent httpd rh-php72-php-fpm
sudo systemctl stop zabbix-agent
sudo systemctl disable zabbix-agent
sudo systemctl stop zabbix-agent
sudo systemctl disable zabbix-agent
```

### 连接 Zabbix_Web 数据库

**浏览器访问**：http://hadoop102/zabbix/

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201039665.png" alt="image-20230420103906598" style="zoom:80%;" />

**检查配置**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201039506.png" alt="image-20230420103941433" style="zoom:80%;" />

**配置数据库**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201040683.png" alt="image-20230420104001609" style="zoom:80%;" />

**配置 zabbix-server**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201040846.png" alt="image-20230420104030769" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201040615.png" alt="image-20230420104043538" style="zoom:80%;" />

### 登录 Zabbix

> **用户名：Admin 密码：zabbix**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201041360.png" alt="image-20230420104112296" style="zoom:80%;" />

**点击 User Settings，语言设成中文**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201041708.png" alt="image-20230420104131640" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201041542.png" alt="image-20230420104149480" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201042251.png" alt="image-20230420104204168" style="zoom:80%;" />

> 注意：这里默认会对 Zabbix Server 进行监控，但是我们可以看到目前该主机是红色，不可用的状态，原因是主机的地址不能使用 127.0.0.1 需要后续我们单独配置。

## Zabbix 使用

### Zabbix 术语

**主机（Host）**一台你想监控的网络设备，用 IP 或域名表示。

**监控项（Item）**你想要接收的主机的特定数据，一个度量数据。

**触发器（Trigger）**一个被用于定义问题阈值和“评估”监控项接收到的数据的逻辑表达式。

**动作（Action）**一个对事件做出反应的预定义的操作，比如邮件通知。

### Zabbix 实战

这里我们以监控 Hdfs 集群为例，给大家进行演示，所以首先先执行 start-dfs.sh，启动 HDFS

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201044232.png" alt="image-20230420104449172" style="zoom:80%;" />

**创建 Host**

**点击配置/主机/创建主机**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201045813.png" alt="image-20230420104515713" style="zoom:80%;" />

**配置主机（Host）**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201046672.png" alt="image-20230420104616596" style="zoom:80%;" />

**查看新增（Host）**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201046702.png" alt="image-20230420104635631" style="zoom:80%;" />

**重复以上步骤，再创建 hadoop103、hadoop104 主机。**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201046812.png" alt="image-20230420104648735" style="zoom:80%;" />

**创建监控项（Items）**

**点击监控项（Items）**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201047282.png" alt="image-20230420104713176" style="zoom:80%;" />

**点击创建监控项（Create Item）**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201047168.png" alt="image-20230420104729095" style="zoom:80%;" />

**配置监控项（Item）**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201048891.png" alt="image-20230420104808809" style="zoom:80%;" />

**查看创建的监控项**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201048604.png" alt="image-20230420104831530" style="zoom:80%;" />

**查看监控项最新数据**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201048019.png" alt="image-20230420104844952" style="zoom:80%;" />

### 创建触发器（Trigger）

**点击配置/主机/触发器**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201049587.png" alt="image-20230420104912480" style="zoom:80%;" />

**点击创建触发器**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201049465.png" alt="image-20230420104931399" style="zoom:80%;" />

**编辑触发器**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201049052.png" alt="image-20230420104955984" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201050179.png" alt="image-20230420105008119" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201050866.png" alt="image-20230420105020792" style="zoom:80%;" />

### 创建动作（Action）

**点击配置/动作/创建动作**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201050113.png" alt="image-20230420105052038" style="zoom:80%;" />

**编辑动作（Action）**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201051314.png" alt="image-20230420105109240" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201051760.png" alt="image-20230420105119712" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201052890.png" alt="image-20230420105204823" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201052432.png" alt="image-20230420105217367" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201052711.png" alt="image-20230420105229632" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201052954.png" alt="image-20230420105244889" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201052616.png" alt="image-20230420105259552" style="zoom:80%;" />

### 申请邮箱

邮件报警，可以采用 126、163、qq 等邮箱。下面以 163 邮箱为例。

**登录邮箱后，点击设置->POP3/SMTP/IMAP**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201053725.png" alt="image-20230420105338614" style="zoom:80%;" />

**开启 SMTP 服务**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201053909.png" alt="image-20230420105354847" style="zoom:80%;" />

**一定要记住授权码**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201054779.png" alt="image-20230420105410711" style="zoom:80%;" />

### 创建报警媒介类型（Media type）

**点击管理/报警媒介类型/Email**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201055429.png" alt="image-20230420105531357" style="zoom:80%;" />

**编辑 Email，这里配置的 email 用于发送报警邮件。**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201055395.png" alt="image-20230420105548320" style="zoom:80%;" />

**测试 Email**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201056119.png" alt="image-20230420105610048" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201056606.png" alt="image-20230420105620542" style="zoom:80%;" />

### 给动作中配置的用户配置 Email

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201058458.png" alt="image-20230420105809392" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201058810.png" alt="image-20230420105826743" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201058993.png" alt="image-20230420105840919" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201058160.png" alt="image-20230420105850088" style="zoom:80%;" />

### 测试

**关闭集群中的 HDFS，会有如下效果**

```sh
stop-dfs.sh
```

**查看仪表盘故障信息**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201101167.png" alt="image-20230420110139094" style="zoom:80%;" />

**查看邮件，接收故障信息**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201102130.png" alt="image-20230420110203056" style="zoom:80%;" />

## 创建模板

> 模板是可以方便地应用于多个主机的一组实体。 实体可以是监控项、触发器、图形、应用、web 场景等。由于生产上的许多主机是相同或类似的，所以，为一个主机创建的一组实体（项目，触发器，图形，...）可能对其它主机也适用。当然，你可以将它们复制到每个新的主机上，但需要费很大功夫。

> 相反，使用模板，可以将它们复制到一个模板，然后根据需要将模板应用于尽可能多的主机。因此，使用模板是减少工作量并简化 Zabbix 配置的好方法。另外，使用模板还有一个好处是当所有主机都需要更改时，只需要在模板上更改某些内容将会将更改应用到所有链接的主机。

### 点击配置/模板/创建模板

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201103012.png" alt="image-20230420110332916" style="zoom:80%;" />

**配置模板名称/群组**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201103891.png" alt="image-20230420110348823" style="zoom:80%;" />

**配置监控项**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201104278.png" alt="image-20230420110407199" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201104268.png" alt="image-20230420110418198" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201105379.png" alt="image-20230420110553296" style="zoom:80%;" />

### 配置触发器

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201106579.png" alt="image-20230420110639505" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201106419.png" alt="image-20230420110650343" style="zoom:80%;" />

### 配置动作

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201107193.png" alt="image-20230420110711119" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201107576.png" alt="image-20230420110723504" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201107391.png" alt="image-20230420110733334" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201107290.png" alt="image-20230420110746224" style="zoom:80%;" />

### 为 hadoop103 应用模板

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201108934.png" alt="image-20230420110807831" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201108374.png" alt="image-20230420110817295" style="zoom:67%;" />

### 测试

➢ **启动 hadoop 集群**

```
sbin/start-dfs.sh
```

➢ **停止 hadoop 集群**

```
sbin/stop-dfs.sh
```

➢ **查看报警邮件**

## Zabbix 和 Grafana 集成

> grafana 是一款采用 Go 语言编写的开源应用，主要用于大规模指标数据的可视化展现，是网络架构和应用分析中最流行的**时序数据展示**工具，目前已经支持绝大部分常用的时序数据库。下载地址：https://grafana.com/grafana/download

### 上传并解压

➢ 将 grafana-enterprise-8.1.2-1.x86_64.rpm 上传至/opt/software/目录下，安装：

```sh
sudo yum install grafana-enterprise-8.1.2-1.x86_64.rpm
```

➢ 启动 Grafana

```sh
sudo systemctl start grafana-server
```

➢ 打开 web：http://hadoop102:3000,默认用户名和密码：admin

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201110872.png" alt="image-20230420111019773" style="zoom:80%;" />

### 快速入门

#### 创建 Dashboard

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201110712.png" alt="image-20230420111052612" style="zoom:80%;" />

#### 新建 panel

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201111071.png" alt="image-20230420111140993" style="zoom:80%;" />

**选择数据源，此处选择 Grafana 提供的随机测试数据**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201111891.png" alt="image-20230420111158798" style="zoom:80%;" />

#### 选择合适的可视化类型

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201112256.png" alt="image-20230420111218168" style="zoom:80%;" />

#### 保存 Dashboard 和 panel，并命名

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201112221.png" alt="image-20230420111241142" style="zoom:80%;" />

### 集成 Zabbix

#### 配置数据源

使用 Grafana 与其他系统集成时，需要配置对应的 DataSource

**点击下图所示按钮，增加数据源**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201113144.png" alt="image-20230420111322071" style="zoom:80%;" />

**选择所需数据源**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201113099.png" alt="image-20230420111337024" style="zoom:80%;" />

**如没有所需数据源，点击下图所示地址，获取更多数据源**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201113395.png" alt="image-20230420111351326" style="zoom:80%;" />

**搜索 zabbix，并点击搜索结果**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201114226.png" alt="image-20230420111407158" style="zoom:80%;" />

**按照所需插件的说明进行部署**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201114949.png" alt="image-20230420111421838" style="zoom:67%;" />

**以下是插件部署步骤**

安装插件

```
sudo grafana-cli plugins install alexanderzobnin-zabbix-app
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201115563.png" alt="image-20230420111522507" style="zoom:80%;" />

重启 Grafana

```
sudo systemctl restart grafana-server
```

 启用插件，点击设置/插件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201117653.png" alt="image-20230420111749584" style="zoom:80%;" />

搜索 zabbix，并点击搜索结果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201118369.png" alt="image-20230420111805295" style="zoom:80%;" />

启用 Zabbix 插件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201118849.png" alt="image-20230420111818775" style="zoom:80%;" />

#### 配置 zabbix 数据源

新增数据源

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201118065.png" alt="image-20230420111841991" style="zoom:80%;" />

搜索 zabbix，并点击搜索结果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201119577.png" alt="image-20230420111924502" style="zoom:80%;" />

配置数据源

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201119804.png" alt="image-20230420111955717" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201120784.png" alt="image-20230420112009688" style="zoom:80%;" />

#### 集成案例

**为方便展示效果，在 Zabbix 中为 hadoop102 主机应用一个 Zabbix 内置的Linux 系统监控模板。**

找到 hadoop102 主机

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201120204.png" alt="image-20230420112036103" style="zoom:80%;" />

点击模板，搜索 linux，并选择 Template OS Linux by Zabbix agent

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201121507.png" alt="image-20230420112103404" style="zoom:80%;" />

点击更新

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201121582.png" alt="image-20230420112126510" style="zoom:80%;" />

**集成 Grafana，展示模板中的系统监控项**

点击 Dashboards，找到前边创建的 Test 看板

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201121033.png" alt="image-20230420112144920" style="zoom:80%;" />

新建 panel

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201122068.png" alt="image-20230420112159992" style="zoom:80%;" />

选择 Zabbix 数据源

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201122055.png" alt="image-20230420112216982" style="zoom:80%;" />

选择要展示的监控项

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201122447.png" alt="image-20230420112231376" style="zoom:80%;" />

选择合适的图标类型

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201440020.png" alt="image-20230420144012938" style="zoom:80%;" />

保存配置

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201440350.png" alt="image-20230420144029278" style="zoom:80%;" />

## 集成第三方告警平台睿象云

> 邮件通知常会出现接收不及时的问题，为确保通知信息被及时接收，可通过配置 Zabbix或者 Grafana 与第三方平台告警平台集成，进而通过第三方平台提供的多种告警媒介（例如电话，短信）等发送告警信息。本文以第三方告警平台**睿象云**为例，进行集成演示。

### 注册睿象云账号

集成睿象云之前须在其官网进行注册并登录，注册时需填入个人手机号和电子邮箱，以

下是其官方网站 https://www.aiops.com。登录之后会看到如下界面。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201441862.png" alt="image-20230420144147778" style="zoom:80%;" />

### 获取睿象云 CA 的 Appkey

点击 CA 智能告警平台

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201442655.png" alt="image-20230420144220589" style="zoom:80%;" />

点击集成

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201442825.png" alt="image-20230420144251749" style="zoom:80%;" />

选择 Zabbix

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201443635.png" alt="image-20230420144312557" style="zoom:80%;" />

填入应用名称，并点击“保存并获取应用 key”

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201443024.png" alt="image-20230420144342936" style="zoom:80%;" />

得到 AppKey 之后，配置 Zabbix

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201444496.png" alt="image-20230420144401422" style="zoom:80%;" />

### 和 Zabbix 集成

查看 Zabbix 脚本目录

```sh
sudo vim /etc/zabbix/zabbix_server.conf 
```

查看 AlertScriptsPath

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201444303.png" alt="image-20230420144439219" style="zoom:80%;" />

切换到 Zabbix 脚本目录

```sh
cd AlertScriptsPath 路径
```

获取 Cloud Alert Agent 包：

```sh
sudo wget https://download.aiops.com/ca_agent/zabbix/ca_zabbix_release-4.0.0.tar.gz
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201445779.png" alt="image-20230420144527718" style="zoom:80%;" />

解压、安装

```sh
sudo tar -zxvf ca_zabbix_release-4.0.0.tar.gz 
sudo cloudalert/bin/install.sh 睿象云的 Appkey
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201445977.png" alt="image-20230420144555887" style="zoom:80%;" />

在 zabbix server 管理界面查看是否添加成功

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201446197.png" alt="image-20230420144612109" style="zoom:67%;" />

### 配置分派策略

分派策略可以配置，哪些应用的告警信息，发送给哪些用户。

点击“配置”→“分派策略”→“新建分派

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201446196.png" alt="image-20230420144642119" style="zoom:80%;" />

配置具体分派策略

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201446702.png" alt="image-20230420144657622" style="zoom:80%;" />

### 配置通知策略

通知策略，可以配置被分派人接收告警的通知方式，通知时间，通知延时等等。

1）点击“配置”→“通知策略”→“新建通知”

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201447767.png" alt="image-20230420144720694" style="zoom:80%;" />

配置具体的通知策略

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201447735.png" alt="image-20230420144734652" style="zoom:80%;" />

### 禁用 zabbix 中的 send_email 的动作

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201447287.png" alt="image-20230420144753196" style="zoom:80%;" />

### 配置 Cloud Alert Action 的触发条件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304201448474.png" alt="image-20230420144813404" style="zoom:80%;" />

### 测试电话、短信和邮件通知

我们将 102、103、104 上的 datanode 停掉，随后 Zabbix 的触发器会被触发，触发

的动作是交给睿象云发送告警信息。按照本文的配置，告警信息会以邮件、短信和电话的方

式发送到注册时填入的手机号码。

### 卸载 Cloud Alert

**Web 设置卸载**

> ➢ 删除报警媒介 cloudalert media。
>
> ➢ 删除用户群组 cloudalert group。
>
> ➢ 删除用户 cloudalert。
>
> ➢ 删除动作 cloudalert action。

在执行 install.sh 脚本的时候就会添加这些.

**脚本文件卸载**

> 删除脚本 AlertScriptsPath 路径下 的 cloudalert 文件夹

# MySQL数据可视化

[5分钟搞定！这款颜值爆表的数据可视化工具，你值得拥有！ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247496969&idx=1&sn=f1f4e9d3cbc6f98ee445545c255b77f7&chksm=fc2c4901cb5bc0172968a93ad4ea9aec6a178915e979e3017e200ec58f8ea3959a593bb5cb49&mpshare=1&scene=23&srcid=0511LBqC22cEiYp8ML6SJ0UC&sharer_sharetime=1652200090861&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

## 简介

今天体验了一把Metabase，确实是一款开箱即用的好工具，搭建起来仅需5分钟。Metabase生成的图表也非常漂亮，使用也很方便，而且对于多表分析也无需手写SQL。如果大家有数据可视化方面的需求，不妨试试它！

- 项目地址：https://github.com/metabase/metabase
- 官方文档：https://www.metabase.com/docs/latest/

Metabase是一款简单、快捷的BI（数据可视化）工具，在Github上已有`27k+Star`，可见其是非常流行的。

- 使用Docker搭建非常快速，5分钟即可完成搭建和设置；
- 人人可用的数据可视化工具，你不需要懂SQL；
- 提供了丰富的仪表盘界面，真正颜值在线的工具，支持数据自动刷新；
- 支持自定义SQL查询，适合懂SQL的人使用；
- 强大的数据透视功能，可以根据数据自动生成仪表板；
- 可以进行多表数据的关联分析，并且无需手写SQL。

下面是一张由Metabase生成的仪表盘，还是挺炫酷的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205121229858.png" alt="image-20220512122929784" style="zoom:80%;" />

## 安装和启动

- 官方地址：https://github.com/metabase/metabase
- 官方文档：https://www.metabase.com/docs/latest/

`可以直接官网下载jar包运行，然后访问localhost:3000即可`

```apl
java -jar metabase.jar
```

> 使用Docker安装Metabase非常简单，下面我们将采用此种方式安装。

- 首先下载Metabase的Docker镜像，仅`400M`大小，非常小巧；

```apl
docker pull metabase/metabase
```

- 接下来使用如下命令运行Metabase服务；

```apl
docker run -p 3000:3000 --name metabase \
-v /mydata/metabase-data:/metabase-data \
-e "MB_DB_FILE=/metabase-data/metabase.db" \
-d metabase/metabase
```

- 运行过程中，可以使用如下命令查看日志；

```apl
docker logs -f metabase
```

- 从日志中我们很容易看出，Metabase又是一款Java开发的神器，当输出如下日志时，代表启动成功了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207241847260.png" alt="image-20220724184747069" style="zoom:67%;" />

- 最后开启防火墙的`3000`端口，以供外部访问。

```apl
firewall-cmd --zone=public --add-port=3000/tcp --permanent
firewall-cmd --reload
```

## 连接和基本配置

> 在使用Metabase之前，我们还需要一些配置。

- 首先通过如下地址访问Metabase，有一个欢迎界面，访问地址：http://192.168.22.130:3000/

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207241849308.png" alt="image-20220724184904252" style="zoom:67%;" />

- 然后选择语言，Metabase的国际化做的还是挺好的，支持很多种语言；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207241849521.png" alt="image-20220724184941462" style="zoom:67%;" />

- 接下来创建一个管理员账户；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207241850577.png" alt="image-20220724185037514" style="zoom:50%;" />

- 然后选择数据库，Metabase支持的数据库种类也挺丰富的；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207241851520.png" alt="image-20220724185108457" style="zoom:50%;" />

- 配置数据库连接信息；

注意：当出现连接不上数据库的情况时，可能原因是用户未开放远程连接权限，如下操作即可

```sql
mysql -uroot -p123456
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207241859760.png" alt="image-20220724185937683" style="zoom: 50%;" />

- 选择是否允许匿名收集使用事件；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207241901691.png" alt="image-20220724190134615" style="zoom: 50%;" />

- 设置完成之后就可以进入Metabase的主界面了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207241902900.png" alt="image-20220724190230808" style="zoom: 50%;" />

## 开始使用

这里使用示例数据库：最下面的Sample

> Metabase内置了H2数据库，里面有一些示例数据，下面我们使用该数据来演示下它的基本使用。

- 首先我们打开示例数据库看下，里面有哪些数据，基本就是订单、商品、用户这些数据表；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207241905761.png" alt="image-20220724190518705" style="zoom:67%;" />

- 我们打开`Orders`表可以查看表中数据；

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207241905045.png" alt="image-20220724190532961" style="zoom:50%;" />

- 在Metabase中，一张可视化图表被称之为`问题`，我们下面来制作一张`2019-2020年商品销售额增长趋势图`，先通过`过滤器`设置过滤条件为`Created At`；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJkqJx5IvjXnb6xM97icQ0XDcAJxuxDfDRkVHSE5m1ib6NHJe0G59mBSGA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 然后进行条件设置并添加过滤器；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJH9CmK8elueZZtEZrEpibL9kVicu9MiaYSJbka1jfm3Ur4ATEks4mTmydw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 然后通过`聚合`功能，设置聚合条件为`总和->Total`；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJD582ISVdyJI0wFvgyp8IaqNSJSlLW5zzRssC35OEFxUyHyMqXfT0VA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 再设置分组条件为`Created At`，并按月进行分组；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJqMQoxcR3kcsg8PGLjNWSMo8dFFjUIKOTq2YLVBMnIWr78ZfsEo121Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 之后就会生成一张趋势折线图了，通过左下角的`可视化`按钮，我们可以切换图表；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJcPzMGQP6QJY4pXDrUhQwjnD4SVd7pS3VJQE41hl7TvOQla0hNdmQjw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 支持的图表还是挺多的，最后点击`保存`按钮可以进行保存；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJHPKfXLMicLGUrq44Kib5ibicKm5kJMlDH1pzKU7NP4iaLx5leGbBtXzTyEw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 我们还可以使用顶部的`加号`按钮创建仪表盘；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJuoDiaw587gMxkG4wR0f6E9ibZc4sDqKu1NIyAZzQCm8eWbfhx3ODiagkg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 然后将图表都添加到仪表盘中去，一个`电商平台的销售看板`就完成了。

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJwocUibTXXjythhIj1mBK6scyShtrch1MvRYfwkibbWACyKOfeCZbdURw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 高级

> Metabase的功能远不只与此，下面再来介绍一些它的高级用法。

### 透视数据表

> 透视是个非常神奇的功能，当我们拿到一堆数据不知道如何分析时，使用它能为我们自动生成各种图表，说不定就有你想要的结果。

- 下面我们来透视下`Orders`表，点击闪电按钮即可使用；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJoI29LDHohy79301F4QdGC7jmBicMnjAck641RvEic7URexkzKR0bUPxA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 这时Metabase将自动生成一个仪表板，分析一些数据，比如总共的订单量、每个商品的销量、每个商品分类的销量，大家可以找找自己感兴趣的数据；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJDgicjescrjhTOswsbsHdP1Qe4wdbjmcQ89dfybbqtHic8mibWHCaWYmtg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 点击右侧的放大按钮，可以根据条件进行更精细化的分析，比如时间，这里按时间维度分析了订单的各种情况。

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJWGFI2VWTycNL8qTDoEOtgiacYibSJpgl7wtC69ZMoNu9aGicvJ7kKCUOA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 自定义首页

> 通过标记功能，我们可以把感兴趣的内容固定到首页去。

- 比如我们对之前的`某电商平台销售看板`比较感兴趣，就可以将它进行标记；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJSuDE0VcXiaJFOc994Rz4bvH6dqWNEF9cYRDq49cljcDS9cRJZH6kCUQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 标记完成后就可以在首页方便地进行查看了。

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJkmLVUn6gEThOzVNHMAjpHA3yuGG2w6GEazMvVbrpJgicrUhtN2zDWVw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 自定义SQL查询

> 有时候我们分析的数据比较复杂，可以自定义SQL来实现。

- 可以点击`创建问题`按钮，然后来创建`原生查询`；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJZ2e0LDBFIrNMVFDt2q3uTK9L5uAibe81y4Yibia111EL5wpicVSX5nrOyA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 然后选择好数据库，输入自定义SQL就可以进行查询了。

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJZUppD5aAusx6nApFxCljldaSGb0aQJn9wfyjuJrqGvmtvsxtvo1IjA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 数据表关联

> 有时候我们进行数据分析时，需要多张表的数据，此时可以使用数据表关联功能，无需手写SQL即可实现。

- 比如说我们想`按分类统计商品销量`，分类信息在`Products`表中，销量信息在`Orders`表中，我们可以通过`显示编辑器`来选择`关联`功能；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJ23Goic46AWs2ecFviakuAh2gv1fwrOR2GJEUMP9KoxcoXTZVwfyriafkg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 然后管理`Orders`表和`Products`表，再对销量进行求和后按商品分类进行分组即可实现；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJCxOJfTvBr7oGq31vHRdZAOBNzaB47UjNjKbgDK8RDypqxXgWkoHPdQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 接下来我们就可以看到各个商品按分类的销量统计图了。

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJE2W04AnVI7lVRrbwIia5kFvUs6p9hUbJuXSFKFZOZDkXhJMcFQyUAfw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 管理员设置

> 通过管理员设置功能，我们可以修改Metabase的系统设置，比如语言设置、用户管理、数据库管理等。

- 点击`设置->管理员`即可切换到管理员进行设置；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJP6hYJjCcQAZVSuLjeq2saV0oprnPZpP5bpN8BW7Vzx6dVCS4AZMFKA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 在`设置`中，我们可以进行一些基础设置；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJomVAvQtqo1aialrHByrjEIre5hRnjzcb0Zx33f7KwtJAew4akV8FRjQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 在`人员`中可以进行用户管理；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJlnGsYokS1yA6mlGVpmA5DtmIbuty3OiaOm8cWlhokmIvkJsXeJFgavw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 在`数据源`中可以管理各个数据库的连接信息，我们之前一直使用的示例数据就是存在`H2`数据库中的；

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJXRtS5m33G5oSPkvpy3X0ibrt4iacT9OPmcarq8RxUOgaSx6tQprWTU2w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 在`权限`中可以进行权限管理。

![图片](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlkprliby2MBRRC6VrCxf2XJKwPlIAfaaoORuFXu5ENJ66UJ5SeddVdnFReF1Df4iavwGWrskud9D9g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

# 其他监控

## Uptime Kuma 简易监控系统⭐

> 最近介绍了很多监控相关的系统，今天又发现一个很简易美观好用的在线监控系统 -- **Uptime Kuma**。这个系统算是最近推荐的几个监控系统中比较简洁、美观的，而且使用简单，支持多种服务，支持多类型通知。总体来说还是很值得尝试的一个系统，心动了就快点尝试下吧。

项目地址：https://github.com/louislam/uptime-kuma

### 简介

<img src="https://mmbiz.qpic.cn/mmbiz_png/4XgGs2SeJoHPP0kX4hqBP4KVX9S2DK6LYOgsMd3RJYW3cqyqrefLOy4axpm4eCwQF4JKjyKmHXQWYn9Inosh4g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />**Uptime Kuma** 是一个开源的监控工具，功能全面，使用简单，还支持自托管服务，并且限制更少。

### 使用方法

#### 安装系统

使用 docker 安装最简单，一条命令即可搞定，建议开启VPN，不然速度较慢

```sh
docker run -d --restart=always -p 3001:3001 -v uptime-kuma:/app/data --name uptime-kuma louislam/uptime-kuma:1
```

或者需要安装相关环境,前提：

```
Node.js >= 14
Git
pm2 - For run in background
```

安装命令：

```sh
# Update your npm to the latest version
npm install npm -g

git clone https://github.com/louislam/uptime-kuma.git
cd uptime-kuma
npm run setup

# Option 1. Try it
node server/server.js

# (Recommended) Option 2. Run in background using PM2
# Install PM2 if you don't have it: 
npm install pm2 -g && pm2 install pm2-logrotate

# Start Server
pm2 start server/server.js --name uptime-kuma
```

#### 监控类型

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302111626265.png" alt="image-20230211162601186" style="zoom:67%;" />

#### 监控MySQL

安装完成后即可浏览器打开  **:3001** 

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302111618125.png" alt="image-20230211161804056" style="zoom:67%;" />

> mysql://root:123456@192.168.0.198:3307/xuexi

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302111621597.png" alt="image-20230211162159474" style="zoom:67%;" />

![image-20230211162427317](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302111624807.png)

#### 监控百度

![image-20230211162744935](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302111627050.png)

![image-20230211162815859](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302111628009.png)



## OSHI 监控系统

### 项目简介

OSHI 是一个基于 JNA（本地）的免费的操作系统和硬件信息库，专为 Java 设计。它可以跨平台的获取系统信息以及硬件信息，如操作系统版本、进程、内存和 CPU 使用情况、磁盘和分区、设备、传感器等。它不需要安装任何额外的本地库，因此接入起来很方便。

```
-- OSHI
https://github.com/oshi/oshi
-- Ward
https://github.com/Rudolf-Barbu/Ward
```

### 项目使用

#### Maven 依赖

我们通过配置 Maven 依赖来引入 OSHI，如下所示：

```xml
<dependency>
    <groupId>com.github.oshi</groupId>
    <artifactId>oshi-core</artifactId>
    <version>6.4.0</version>
</dependency>
```

这里注意的是，不同版本的 JDK 环境，需要引用不同版本的包：

- JDK8: oshi-core-6.4.0
- JPMS: oshi-core-java11-6.4.0
- JDK6: oshi-core-3.14.0

#### 简单例子

在这里写一个简单的例子，包括了一些常用硬件参数的获取，注释已经写的很详细了：

```java
public static void main(String[] args) {
    // 系统信息类
    SystemInfo systemInfo = new SystemInfo();
    // 获取硬件信息
    HardwareAbstractionLayer hardware = systemInfo.getHardware();

    // CPU信息
    CentralProcessor centralProcessor = hardware.getProcessor();
    // 获取CPU名称
    String name = centralProcessor.getProcessorIdentifier().getName();
    // 获取CPU核心数
    int physicalProcessorCount = centralProcessor.getPhysicalProcessorCount();
    // 获取当前CPU每个核心的频率
    long[] currentFreq = centralProcessor.getCurrentFreq();
    System.out.println("CPU名称：" + name);
    System.out.println("CPU核心数：" + physicalProcessorCount);

    // 内存信息
    GlobalMemory memory = hardware.getMemory();
    // 内存总大小
    long totalOfG = memory.getTotal() / 1024 / 1024 / 1024;
    // 可用大小
    long availableOfG = memory.getAvailable() / 1024 / 1024 / 1024;
    System.out.println("内存总大小：" + totalOfG + "G");
    System.out.println("内存可用大小：" + availableOfG + "G");

    // 磁盘信息
    List<HWDiskStore> diskStores = hardware.getDiskStores();
    // 获取磁盘总大小
    long total = diskStores.stream().mapToLong(HWDiskStore::getSize).sum();
    System.out.println("磁盘总大小：" + total / 1024 / 1024 / 1024 + "G");

    // 系统运行时间
    long uptimeInSeconds = systemInfo.getOperatingSystem().getSystemUptime();
    System.out.println("系统运行时间：" + uptimeInSeconds / 3600 + "小时");
}
```

在本地运行之后输出如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303201614507.png" alt="image-20230320161424427" style="zoom:80%;" />

### 漂亮的仪表盘

看过上面的例子，你会发现 OSHI 其实很好用吧。但是只有一个例子的展示大家应该不太满足，所以我特意找了一个已经开发好的监控工具——Ward。Ward 是一款简单、极简主义的服务器监控工具。它用漂亮的仪表盘的形式来展示系统的硬件信息。如图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303201614682.png" alt="image-20230320161443559" style="zoom:80%;" />

其实 Ward 是一个很简单的 springboot 项目，借助于该项目，简单阅读下源码就能更好的理解 OSHI 的使用啦。



## 分布式之系统监控

Frostmourne 项目地址：https://github.com/AutohomeCorp/frostmourne

### 项目特点

- 支持多种数据源：ES、Prometheus、InfluxDB、MySQL等
- 支持多种报警消息发送：钉钉、企业微信、飞书、短信
- 自定义消息模板，消息模板有md和text两种类型
- 支持分布式调度
- 内置权限管理，数据权限隔离

### 项目介绍

Frostmourne 监听日志数据，当触发报警规则，通过钉钉、企业微信、短信等方式通知开发人员，从而避免生产事故。

![图片](https://mmbiz.qpic.cn/mmbiz/4XgGs2SeJoF0KzVLicgTOvJfpYsRbs91icBiaSDaHibOl6DRQhGt4OR6MPDE8XulWf0wCJTwntepIetQhd3n3x4icCA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

### 快速使用

将 frostmourne.sql 文件导入到数据库中，直接在GitHub中下载安装包，修改application.properties中的数据源。

```sh
# 启动命令
./scripts/startup.sh
# 停止命令
./scripts/shutdown.sh
```

默认端口是10054。在浏览器访问：:10054/

![图片](https://mmbiz.qpic.cn/mmbiz/4XgGs2SeJoF0KzVLicgTOvJfpYsRbs91icURLMT6h6SRCAdKc2ficlaHmqmAzfshl0YichOZYUK3glOgx5NOAAds2Q/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

目前大多数项目中使用 ELK方式采集日志比较多，所以这里以配置ES数据源举例子：

1、添加`Elasticsearch`数据源

2、配置监控基础信息

3、编写查询语句

4、配置报警规则

5、配置消息模板

6、配置报警消息发送规则

![图片](https://mmbiz.qpic.cn/mmbiz/4XgGs2SeJoF0KzVLicgTOvJfpYsRbs91icFE3EibnsyJQKozcujHRW48GeGGYRyTNP3w5T0T2Ldw8VHGssUxniaadA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

钉钉报警截图：

![图片](https://mmbiz.qpic.cn/mmbiz/4XgGs2SeJoF0KzVLicgTOvJfpYsRbs91ic6fhaHaE7fSM3m5q3cJqxDb6RlSusicnYHsYyOYC0x2rnbZickgffTpqg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

# 监控系统选型

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207191643424.png" alt="image-20220719164359271" style="zoom:67%;" />

之前，我写过几篇有关「线上问题排查」的文章，文中附带了一些监控图，有些读者对此很感兴趣，问我监控系统选型上有没有好的建议？

目前我所经历的几家公司，监控系统都是自研的。其实业界有很多优秀的开源产品可供选择，能满足绝大部分的监控需求，如果能从中选择一款满足企业当下的诉求，显然最省时省力。

这篇文章，我将对监控体系的基础知识、原理和架构做一次系统性整理，同时还会对几款最常用的开源监控产品做下介绍，以便大家选型时参考。内容包括3部分：

- 必知必会的监控基础知识
- 主流监控系统介绍
- 监控系统的选型建议

## 为什么需要数据驱动运维

首先，那下面的几个常见运维场景，运维人一定不意外：

### 缺少跨系统监控的统一视图

企业历史积淀的监控系统较多，既有如云资源监控、网络资源监控、存储资源监控等通用基础监控，也有如业务监控、数据库监控、各种中间件监控等定向监控。这些监控背后数据种类多、格式不统一，且分散在各自系统中。各系统拥有独立的权限管理方式以及数据展现方式，导致在故障发生时，缺少统一的视图汇总各类数据，无法有效辅助运维人员进行故障分析。运维人员无法直观地判断异常指标间的关联关系，需要各个系统不断跳转并反复查看，手工进行数据整合和分析判断。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209091304642.png" alt="image-20220909130445568" style="zoom:80%;" />

### 缺少业务视角的指标关联

在故障发生时，往往最先反应在业务指标上，然而业务指标通常缺少与其他各种类型运维监控数据、告警数据关联关系，导致运维人员在故障处理的过程中效率较低。监控工具缺少与业务数据、告警数据和系统关系数据的有效整合，使得故障定位的过程需要多个系统运维人员共同参与分析，很难直接从业务角度来发现监控数据之间的关系。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209091305939.png" alt="image-20220909130505884" style="zoom:80%;" />

### 缺少纵深交互的分析能力

系统故障无法完全避免，故障管理的重点是对故障快速响应和恢复服务。通常运维人员在故障定位时，很大程度上依赖运维经验，而监控工具更多是提供单一层面、单一指标的排查方式，无法有效结合应用架构及相关指标进行关联分析。导致在故障定位时存在根因定位不准确、定位不够及时等情况。随着系统复杂度不断增加，系统可用性要求不断提升，监控工具不再单纯是统一的整合和展示，还需要更有效的分析手段，通过关联、下钻等交互方式辅助查找故障根源。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209091305500.png" alt="image-20220909130524428" style="zoom:80%;" />

### 缺少针对场景的定制能力

特定行业的业务场景相对较为固定，监控工具缺少针对具体运维场景进行数据整合和展示，以及定制数据关联和分析的功能，使得运维人员在特定场景下的故障处理效率较低。



## 我们需要哪些数据

想要解决以上场景，我们就需要大量的数据去进行分析，从而实现数据驱动运维。但数据驱动运维是一个不断演进的动态过程，我们很难在运维数据可视化分析体系的搭建初期就清晰的规划，我们需要哪些数据，又要摒弃哪些数据。因此，我们采集尽可能多的数据，再进行分门别类的整合。在这一过程中，我们尝试进行以下分类：

### 面向业务

对于运维来说，端是非常重要的数据采集点。端采集的数据可以更直接反映用户对产品的感知。这其中涵盖面向运营的产品业务数据，也包括面向运维的产品技术指标。通过相互关联，可以让运维人在某些场景下，快速找到事件相关性。比如说当前资源容量规划与业务增长之间的关系，订单支付成功率与服务调用的关系等等。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/qdzZBE73hWtgNhRxBcSgdHUbibZzaicZx9NMhW1jdkK0ep3mU6XysP308TIFIJjCqr8oUxgvIsU0MaB9MlQicsaSA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 面向服务 & 接口

作为面向应用的能力封装，各类服务的特征和采集都与传统资源采集方法截然不同。不同的服务需要关注的指标都非常不同。用户在客户端发生请求之后，会产生大量的调用。虽然接口调用数据存在数据量大、不同语言不同采集方式等问题，但在故障发现和运维优化等方面，接口调用数据最有说服力，直观展现相关服务健康度。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/qdzZBE73hWtgNhRxBcSgdHUbibZzaicZx9dibOtkh3y0v0bOl8BrnUt3iaE1g3VM3ticEIZPryiaXe49xl3WTv2jq2Bw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 面向资源

产品在向用户提供相关服务的背后，CPU、内存、磁盘 IO 等资源决定着服务的支撑力度。虽然云原生帮助企业实现更加迅捷地扩缩容。但运维扔需要建立相应容量模型来计算资源使用率，以应对业务突发情况。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/qdzZBE73hWtgNhRxBcSgdHUbibZzaicZx9luQ7qd7jMiayI9tvFyzpDe00hUMHTxeQvUxk8SSjBCd64yOibUpCiadsQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



## 必知必会的监控知识⭐⭐

我们可以理解监控系统就像我们古代打战的哨兵一样，哨兵的角色非常重要，敌人来了，哨兵会第一时间发出预警(吹笛、打鼓、放烟)，让守城的战士能够最快的时间处理，应对。

那对于我们应用系统而言，监控系统就像我们第三只眼，如果有应用系统出现问题，我们可以通过监控系统看是哪里出现问题，是redis挂了，还是说服务器内存满了，有监控系统我们可以很轻松、快速的定位问题。

甚至我们可以设置预警，对一些将要出现的问题进行提前预防处理，及时避免问题的发生。

### 1. 监控系统的7大作用

正所谓「无监控，不运维」，监控系统的地位不言而喻。不管你是监控系统的开发者还是使用者，首先肯定要清楚：监控系统的目标是什么？它能发挥什么作用？

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207191644295.png" alt="image-20220719164425223" style="zoom: 50%;" />

- **实时采集监控数据**：包括硬件、操作系统、中间件、应用程序等各个维度的数据。
- **实时反馈监控状态**：通过对采集的数据进行多维度统计和可视化展示，实时体现监控对象的状态是正常还是异常
- **预知故障和告警：**能够提前预知故障风险，并及时发出告警信息。
- **辅助定位故障：**提供故障发生时的各项指标数据，辅助故障分析和定位。
- **辅助性能调优：**为性能调优提供数据支持，比如慢SQL，接口响应时间等。
- **辅助容量规划：**为服务器、中间件以及应用集群的容量规划提供数据支撑。
- **辅助自动化运维：**为自动扩容或者根据配置的SLA进行服务降级等智能运维提供数据支撑。

### 2. 使用监控系统的正确姿势

> 出任何线上事故，先不说其他地方有问题，监控部分一定是有问题的。

听着很甩锅的一句话，仔细思考好像有一定道理。我们在事故复盘时，通常会思考这3个和监控有关的问题：有没有做监控？监控是否及时？监控信息是否有助于快速定位问题？

可见光有一套好的监控系统还不够，还必须知道**「****如何****用好它」**。一个成熟的研发团队通常会定一个监控规范，用来统一监控系统的使用方法。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207191645922.png" alt="image-20220719164526873" style="zoom:67%;" />

- **了解监控对象的工作原理：**要做到对监控对象有基本的了解，清楚它的工作原理。比如想对JVM进行监控，你必须清楚JVM的堆内存结构和垃圾回收机制。
- **确定监控对象的指标：**清楚使用哪些指标来刻画监控对象的状态？比如想对某个接口进行监控，可以采用请求量、耗时、超时量、异常量等指标来衡量。
- **定义合理的报警阈值和等级：**达到什么阈值需要告警？对应的故障等级是多少？不需要处理的告警不是好告警，可见定义合理的阈值有多重要，否则只会降低运维效率或者让监控系统失去它的作用。
- **建立完善的故障处理流程：**收到故障告警后，一定要有相应的处理流程和oncall机制，让故障及时被跟进处理。

### 3. 监控的对象和指标都有哪些⭐

监控已然成为了整个产品生命周期非常重要的一环，运维关注硬件和基础监控，研发关注各类中间件和应用层的监控，产品关注核心业务指标的监控。可见，监控的对象已经越来越立体化。

这里，我对常用的监控对象以及监控指标做了分类整理，供大家参考。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202210241633453.png" alt="image-20221024162810360" style="zoom: 67%;" />

#### 1 硬件监控

包括：电源状态、CPU状态、机器温度、风扇状态、物理磁盘、raid状态、内存状态、网卡状态

#### 2 服务器基础监控

- CPU：单个CPU以及整体的使用情况
- 内存：已用内存、可用内存
- 磁盘：磁盘使用率、磁盘读写的吞吐量
- 网络：出口流量、入口流量、TCP连接状态

#### 3 数据库监控

包括：数据库连接数、QPS、TPS、并行处理的会话数、缓存命中率、主从延时、锁状态、慢查询

#### 4 中间件监控

- Nginx：活跃连接数、等待连接数、丢弃连接数、请求量、耗时、5XX错误率
- Tomcat：最大线程数、当前线程数、请求量、耗时、错误量、堆内存使用情况、GC次数和耗时
- 缓存 ：成功连接数、阻塞连接数、已使用内存、内存碎片率、请求量、耗时、缓存命中率
- 消息队列：连接数、队列数、生产速率、消费速率、消息堆积量

#### 5 应用监控

- HTTP接口：URL存活、请求量、耗时、异常量
- RPC接口：请求量、耗时、超时量、拒绝量
- JVM ：GC次数、GC耗时、各个内存区域的大小、当前线程数、死锁线程数
- 线程池：活跃线程数、任务队列大小、任务执行耗时、拒绝任务数
- 连接池：总连接数、活跃连接数
- 日志监控：访问日志、错误日志
- 业务指标：视业务来定，比如PV、订单量等

### 4. 监控系统的基本流程

无论是开源的监控系统还是自研的监控系统，监控的整个流程大同小异，一般都包括以下模块：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202210241636370.png" alt="image-20221024163557109" style="zoom:67%;" />

- **数据采集：**采集的方式有很多种，包括日志埋点进行采集（通过Logstash、Filebeat等进行上报和解析），JMX标准接口输出监控指标，被监控对象提供REST API进行数据采集（如Hadoop、ES），系统命令行，统一的SDK进行侵入式的埋点和上报等。
- **数据传输：**将采集的数据以TCP、UDP或者HTTP协议的形式上报给监控系统，有主动Push模式，也有被动Pull模式。
- **数据存储：**有使用MySQL、Oracle等RDBMS存储的，也有使用时序数据库RRDTool、OpentTSDB、InfluxDB存储的，还有使用HBase存储的。
- **数据展示：**数据指标的图形化展示。
- **监控告警：**灵活的告警设置，以及支持邮件、短信、IM等多种通知通道。

## 主流监控系统介绍

下面再来认识下主流的开源监控系统，由于篇幅有限，我挑选了3款使用最广泛的监控系统：Zabbix、Open-Falcon、Prometheus，会对它们的架构进行介绍，同时总结下各自的优劣势。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207191648395.png" alt="image-20220719164800340" style="zoom: 50%;" />

### 1. Zabbix（老牌监控的优秀代表）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207191648771.png" alt="image-20220719164843698" style="zoom:67%;" />

Zabbix 1998年诞生，核心组件采用C语言开发，Web端采用PHP开发。它属于老牌监控系统中的优秀代表，监控功能很全面，使用也很广泛，差不多有70%左右的互联网公司都曾使用过 Zabbix 作为监控解决方案。

先来了解下Zabbix的架构设计：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207191649097.png" alt="image-20220719164903037" style="zoom:50%;" />

Zabbix架构图

- **Zabbix Server：**核心组件，C语言编写，负责接收Agent、Proxy发送的监控数据，也支持JMX、SNMP等多种协议直接采集数据。同时，它还负责数据的汇总存储以及告警触发等。
- **Zabbix Proxy：**可选组件，对于被监控机器较多的情况下，可使用Proxy进行分布式监控，它能代理Server收集部分监控数据，以减轻Server的压力。
- **Zabbix Agentd：**部署在被监控主机上，用于采集本机的数据并发送给Proxy或者Server，它的插件机制支持用户自定义数据采集脚本。Agent可在Server端手动配置，也可以通过自动发现机制被识别。数据收集方式同时支持主动Push和被动Pull 两种模式。
- **Database：**用于存储配置信息以及采集到的数据，支持MySQL、Oracle等关系型数据库。同时，最新版本的Zabbix已经开始支持时序数据库，不过成熟度还不高。
- **Web Server：**Zabbix的GUI组件，PHP编写，提供监控数据的展现和告警配置。

下面是 Zabbix 的优势：

- **产品成熟：**由于诞生时间长且使用广泛，拥有丰富的文档资料以及各种开源的数据采集插件，能覆盖绝大部分监控场景。
- **采集方式丰富：**支持Agent、SNMP、JMX、SSH等多种采集方式，以及主动和被动的数据传输方式。
- **较强的扩展性**：支持Proxy分布式监控，有agent自动发现功能，插件式架构支持用户自定义数据采集脚本。
- **配置管理方便**：能通过Web界面进行监控和告警配置，操作方便，上手简单。

下面是 Zabbix 的劣势：

- **性能瓶颈：**机器量或者业务量大了后，关系型数据库的写入一定是瓶颈，官方给出的单机上限是5000台，个人感觉达不到，尤其现在应用层的指标越来越多。虽然最新版已经开始支持时序数据库，不过成熟度还不高。
- **应用层监控支持有限：**如果想对应用程序做侵入式的埋点和采集（比如监控线程池或者接口性能），zabbix没有提供对应的sdk，通过插件式的脚本也能曲线实现此功能，个人感觉zabbix就不是做这个事的。
- **数据模型不强大**：不支持tag，因此没法按多维度进行聚合统计和告警配置，使用起来不灵活。
- **方便二次开发难度大**：Zabbix采用的是C语言，二次开发往往需要熟悉它的数据表结构，基于它提供的API更多只能做展示层的定制。

### 2. Open-Falcon 小米出品，国内流行

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207191650259.png" alt="image-20220719165014191" style="zoom:80%;" />

Open-falcon 是小米2015年开源的企业级监控工具，采用Go和Python语言开发，这是一款灵活、高性能且易扩展的新一代监控方案，目前小米、美团、滴滴等超过200家公司在使用它。

小米初期也使用的Zabbix进行监控，但是机器量和业务量上来后，Zabbix就有些力不从心了。因此，后来自主研发了Open-Falcon，在架构设计上吸取了Zabbix的经验，同时很好地解决了Zabbix的诸多痛点。

先来了解下Open-Falcon的架构设计：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207191650388.png" alt="image-20220719165047290" style="zoom:67%;" />

Open-Falcon架构图，来自网络

- **Falcon-agent：**数据采集器和收集器，Go开发，部署在被监控的机器上，支持3种数据采集方式。首先它能自动采集单机200多个基础监控指标，无需做任何配置；同时支持用户自定义的plugin获取监控数据；此外，用户可通过http接口，自主push数据到本机的proxy-gateway，由gateway转发到server.
- **Transfer：**数据分发组件，接收客户端发送的数据，分别发送给数据存储组件Graph和告警判定组件Judge，Graph和Judge均采用一致性hash做数据分片，以提高横向扩展能力。同时Transfer还支持将数据分发到OpenTSDB，用于历史归档。
- **Graph：**数据存储组件，底层使用RRDTool（时序数据库）做单个指标的存储，并通过缓存、分批写入磁盘等方式进行了优化。据说一个graph实例能够处理8W+每秒的写入速率。
- **Judge和Alarm：**告警组件，Judge对Transfer组件上报的数据进行实时计算，判断是否要产生告警事件，Alarm组件对告警事件进行收敛处理后，将告警消息推送给各个消息通道。
- **API：**面向终端用户，收到查询请求后会去Graph中查询指标数据，汇总结果后统一返回给用户，屏蔽了存储集群的分片细节。

下面是Open-Falcon的优势：

- **自动采集能力：**Falcon-agent 能自动采集服务器的200多个基础指标（比如CPU、内存等），无需在server上做任何配置，这一点可以秒杀Zabbix.
- **强大的存储能力**：底层采用RRDTool，并且通过一致性hash进行数据分片，构建了一个分布式的时序数据存储系统，可扩展性强。
- **灵活的数据模型：**借鉴OpenTSDB，数据模型中引入了tag，这样能支持多维度的聚合统计以及告警规则设置，大大提高了使用效率。
- **插件统一管理：**Open-Falcon的插件机制实现了对用户自定义脚本的统一化管理，可通过HeartBeat Server分发给agent，减轻了使用者自主维护脚本的成本。
- **个性化监控支持**：基于Proxy-gateway，很容易通过自主埋点实现应用层的监控（比如监控接口的访问量和耗时）和其他个性化监控需求，集成方便。

下面是Open-Falcon的劣势：

- **整体发展一般：**社区活跃度不算高，同时版本更新慢，有些大厂是基于它的稳定版本直接做二次开发的，关于以后的前景其实有点担忧。
- **UI不够友好**：对于业务线的研发来说，可能只想便捷地完成告警配置和业务监控，但是它把机器分组、策略模板、模板继承等概念全部暴露在UI上，感觉在围绕这几个概念设计UI，理解有点费劲。
- **安装比较复杂：**个人的亲身感受，由于它是从小米内部衍生出来的，虽然去掉了对小米内部系统的依赖，但是组件还是比较多，如果对整个架构不熟悉，安装很难一蹴而就。

### 3. Prometheus（号称下一代监控系统）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207191653000.png" alt="image-20220719165332939" style="zoom:80%;" />

Prometheus（普罗米修斯）是由前google员工2015年正式发布的开源监控系统，采用Go语言开发。它不仅有一个很酷的名字，同时它有Google与k8s的强力支持，开源社区异常火爆。

Prometheus 2016年加入云原生基金会，是继k8s后托管的第二个项目，未来前景被相当看好。它和Open-Falcon最大不同在于：数据采集是基于Pull模式的，而不是Push模式，并且架构非常简单。

先来了解下Prometheus的架构设计：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207191653045.png" alt="image-20220719165356976" style="zoom:67%;" />

Prometheus架构图，来自网络

- **Prometheus Server：**核心组件，用于收集、存储监控数据。它同时支持静态配置和通过Service Discovery动态发现来管理监控目标，并从监控目标中获取数据。此外，Prometheus Server 也是一个时序数据库，它将监控数据保存在本地磁盘中，并对外提供自定义的 PromQL 语言实现对数据的查询和分析。
- **Exporter：**用来采集数据，作用类似于agent，区别在于Prometheus是基于Pull方式拉取采集数据的，因此，Exporter通过HTTP服务的形式将监控数据按照标准格式暴露给Prometheus Server，社区中已经有大量现成的Exporter可以直接使用，用户也可以使用各种语言的client library自定义实现。
- **Push gateway：**主要用于瞬时任务的场景，防止Prometheus Server来pull数据之前此类Short-lived jobs就已经执行完毕了，因此job可以采用push的方式将监控数据主动汇报给Push gateway缓存起来进行中转。
- **Alert Manager：**当告警产生时，Prometheus Server将告警信息推送给Alert Manager，由它发送告警信息给接收方。
- **Web UI：**Prometheus内置了一个简单的web控制台，可以查询配置信息和指标等，而实际应用中我们通常会将Prometheus作为Grafana的数据源，创建仪表盘以及查看指标。

下面是Prometheus的优势：

- **轻量管理：**架构简单，不依赖外部存储，单个服务器节点可直接工作，二进制文件启动即可，属于轻量级的Server，便于迁移和维护。
- **较强的处理能力**：监控数据直接存储在Prometheus Server本地的时序数据库中，单个实例可以处理数百万的metrics。
- **灵活的数据模型：**同Open-Falcon，引入了tag，属于多维数据模型，聚合统计更方便。
- **强大的查询语句：**PromQL允许在同一个查询语句中，对多个metrics进行加法、连接和取分位值等操作。
- **很好地支持云环境**：能自动发现容器，同时k8s和etcd等项目都提供了对Prometheus的原生支持，是目前容器监控最流行的方案。

下面是Prometheus的劣势：

- **功能不够完善：**Prometheus从一开始的架构设计就是要做到简单，不提供集群化方案，长期的持久化存储和用户管理，而这些是企业变大后所必须的特性，目前要做到这些只能在Prometheus之上进行扩展。
- **网络规划变复杂**：由于Prometheus采用的是Pull模型拉取数据，意味着所有被监控的endpoint必须是可达的，需要合理规划网络的安全配置。



## 监控系统的选型建议

通过上面的介绍，大家对主流的监控系统应该有了一定的认识。面对选型问题，我的建议是：

1、先明确清楚你的监控需求：要监控的对象有哪些？机器数量和监控指标有多少？需要具备什么样的告警功能？

2、监控是一项长期建设的事情，一开始就想做一个 All In One 的监控解决方案，我觉得没有必要。从成本角度考虑，在初期直接使用开源的监控方案即可，先解决有无问题。

3、从系统成熟度上看，Zabbix属于老牌的监控系统，资料多，功能全面且稳定，如果机器数量在几百台以内，不用太担心性能问题，另外，采用数据库分区、SSD硬盘、Proxy架构、Push采集模式都可以提高监控性能。

4、Zabbix在服务器监控方面占绝对优势，可以满足90%以上的监控场景，但是应用层的监控似乎并不擅长，比如要监控线程池的状态、某个内部接口的执行时间等，这种通常都要做侵入式埋点。相反，新一代的监控系统Open-Falcon和Prometheus在这一点做得很好。

5、从整体表现上来看，新一代监控系统也有明显的优势，比如：灵活的数据模型、更成熟的时序数据库、强大的告警功能，如果之前对zabbix这种传统监控没有技术积累，建议使用Open-Falcon或者Prometheus.

6、Open-Falcon的核心优势在于数据分片功能，能支撑更多的机器和监控项；Prometheus则是容器监控方面的标配，有Google和k8s加持。

7、Zabbix、Open-Falcon和Prometheus都支持和Grafana做快速集成，想要美观且强大的可视化体验，可以和Grafana进行组合。

8、用合适的监控系统解决相应的问题即可，可以多套监控同时使用，这种在企业初期很常见。

9、到中后期，随着机器数据增加和个性化需求增多（比如希望统一监控平台、打通公司的CMDB和组织架构关系），往往需要二次开发或者通过监控系统提供的API做集成，从这点来看，Open-Falcon或者Prometheus更合适。

10、如果非要自研，可以多研究下主流监控系统的架构方案，借鉴它们的优势。





























