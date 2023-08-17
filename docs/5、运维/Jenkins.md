

# Jenkins

Jenkins，原名 Hudson，2011 年改为现在的名字。它是一个开源的实现持续集成的软件工具。

官方网站：https://www.jenkins.io/

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208100941073.png" alt="image-20220810094145988" style="zoom: 50%;" />



# GitLab安装使用

官方网站：https://about.gitlab.com/

安装所需最小配置：内存至少4G

最低要求网站：https://docs.gitlab.cn/jh/install/requirements.html

安装：https://gitlab.cn/install/

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208100952502.png" alt="image-20220810095225415" style="zoom:50%;" />

## centos7安装

官方安装文档：https://gitlab.cn/install/?version=ce

### 1. 安装和配置必须的依赖项

在 CentOS 7上，下面的命令也会在系统防火墙中打开 HTTP、HTTPS 和 SSH 访问。这是一个可选步骤，如果您打算仅从本地网络访问极狐GitLab，则可以跳过它。

```apl
sudo yum install -y curl policycoreutils-python openssh-server perl
sudo systemctl enable sshd
sudo systemctl start sshd
```

（可选）下一步，安装 Postfix 以发送电子邮件通知。如果您想使用其他解决方案发送电子邮件，请跳过此步骤并在安装极狐GitLab 后[配置外部 SMTP 服务器](https://docs.gitlab.cn/omnibus/settings/smtp.html)。

```apl
sudo yum install postfix
sudo systemctl enable postfix
sudo systemctl start postfix
```

在安装 Postfix 的过程中可能会出现一个配置界面，在该界面中选择“Internet Site”并按下回车。把“mail name”设置为您服务器的外部 DNS 域名并按下回车。如果还有其它配置界面出现，继续按下回车以接受默认配置。

### 2. 下载/安装极狐GitLab

配置极狐GitLab 软件源镜像。

```apl
curl -fsSL https://packages.gitlab.cn/repository/raw/scripts/setup.sh | /bin/bash
```

接下来，安装极狐GitLab。确保您已正确[设置您的 DNS](https://docs.gitlab.cn/omnibus/settings/dns.html)，并更改 https://gitlab.example.com 为您要访问极狐GitLab 实例的 URL。安装包将在该 URL 上自动配置和启动极狐GitLab。

对于 `https` 站点，极狐GitLab 将使用 Let's Encrypt 自动请求 SSL 证书，这需要有效的主机名和入站 HTTP 访问。您也可以使用自己的证书或仅使用 `http://`（不带`s`）。

如果您想为初始管理员用户(`root`)指定自定义密码，请查看[文档](https://docs.gitlab.cn/omnibus/installation/index.html#设置初始密码)。如果未指定密码，将自动生成随机密码。

执行如下命令开始安装：

```apl
sudo EXTERNAL_URL="https://192.168.22.130" yum install -y gitlab-jh
```

启动gitlab

```apl
gitlab-ctl start                  # 启动所有 gitlab 组件
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208101005637.png" alt="image-20220810100502559" style="zoom:67%;" />

### 3. 访问极狐GitLab 实例并登录

注意：是https    https://192.168.22.130/

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208101051986.png" alt="image-20220810105132871" style="zoom:67%;" />

除非您在安装过程中指定了自定义密码，否则将随机生成一个密码并存储在 /etc/gitlab/initial_root_password 文件中(出于安全原因，24 小时后，此文件会被第一次 `gitlab-ctl reconfigure` 自动删除，因此若使用随机密码登录，建议安装成功初始登录成功之后，立即修改初始密码）。使用此密码和用户名 `root` 登录。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208101054043.png" alt="image-20220810105407982" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208101054461.png" alt="image-20220810105431390" style="zoom:67%;" />

有关安装和配置的详细说明，请参阅我们的[文档](https://docs.gitlab.cn/omnibus/installation/)。

修改登录密码

https://192.168.22.130/admin/users/root/edit

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208101057315.png" alt="image-20220810105737244" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208101056125.png" alt="image-20220810105652069" style="zoom:67%;" />

### 4. 后续配置

完成安装后，请参考建议的[后续配置](https://docs.gitlab.cn/jh/install/next_steps.html)，包括身份验证选项和注册限制的配置。

### 5 查看剩余内存

```apl
free -m
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208101014880.png" alt="image-20220810101451815" style="zoom:67%;" />

## gitlab常用命令

```apl
gitlab-ctl start                  # 启动所有 gitlab 组件
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208101005637.png" alt="image-20220810100502559" style="zoom:67%;" />

```apl
gitlab-ctl stop                   # 停止所有 gitlab 组件；
gitlab-ctl restart                # 重启所有 gitlab 组件；
gitlab-ctl status                 # 查看服务状态；
gitlab-ctl reconfigure            # 启动服务；
vi /etc/gitlab/gitlab.rb         # 修改默认的配置文件；
gitlab-ctl tail                   # 查看日志；
```



## docker下安装

https://docs.gitlab.cn/jh/install/docker.html

安装所需最小配置

- 内存至少4G
- 系统内核至少在3.10以上 `uname -r` 命令可查看系统内核版本

1.添加容器

```shell
docker run --detach \
  --hostname 192.168.22.130 \
  --publish 443:443 --publish 80:80 \
  --name gitlab \
  --restart always \
  --volume $GITLAB_HOME/config:/etc/gitlab:Z \
  --volume $GITLAB_HOME/logs:/var/log/gitlab:Z \
  --volume $GITLAB_HOME/data:/var/opt/gitlab:Z \
  --shm-size 256m \
  registry.gitlab.cn/omnibus/gitlab-jh:latest
```

2.启动容器

```shell
docker start gitlab
```

3.查看已存在的容器

```shell
docker ps -a
```

4.进入容器

```
docker exec -it  gitlab /bin/bash
```

### 登录访问

#### http://192.168.22.130

当首次运行出现502错误的时候排查两个原因

1. 虚拟机内存至少需要4g
2. 稍微再等等刷新一下可能就好了

### 管理员账号登录

用户名：root

密码存在下面文件中，登录后需要改密码不然24小时之后会失效

```apl
cat /etc/gitlab/initial_root_password
```



## 创建项目

### gitlab创建项目

https://192.168.22.130/projects/new

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208101101459.png" alt="image-20220810110136358" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208101103995.png" alt="image-20220810110312900" style="zoom:67%;" />

界面同github

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208101104583.png" alt="image-20220810110427476" style="zoom:67%;" />





# Jenkins安装

官方文档介绍非常详细

https://www.jenkins.io

安装需求

```
机器要求：

256 MB 内存，建议大于 512 MB

10 GB 的硬盘空间（用于 Jenkins 和 Docker 镜像）

需要安装以下软件：

Java 8 ( JRE 或者 JDK 都可以)

Docker （导航到网站顶部的Get Docker链接以访问适合您平台的Docker下载）
```



### 安装JDK

1 检索可用包

```
yum search java|grep jdk
```

2 安装

```
yum install java-1.8.0-openjdk
```



首次启动war包会在`/root/.jenkins`生成配置文件

待完全启动成功后 访问服务器8080端口完成配置

初始化后的密码：

```
Jenkins initial setup is required. An admin user has been created and a password generated.
Please use the following password to proceed to installation:

4e67bbe261da476abdc63c5b51311646

This may also be found at: /root/.jenkins/secrets/initialAdminPassword
```

密码文件使用后会自动删除

### Maven安装

官网

https://maven.apache.org/

下载后复制到Jenkins所在服务器解压缩即可



## Jenkins + Git + Maven 自动化部署配置



#### 1 Git配置

![image-20220726213303821](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208100926220.png)



![image-20220726213505879](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208100926234.png)





#### 2 Maven配置

![image-20220726214239888](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208100926236.png)







#### 3 Pom.xml配置

![image-20220726214200732](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208100926235.png)



### git安装

```
yum install -y git
```

#### javahome配置(可选)

```
/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.322.b06-1.el7_9.x86_64


export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.322.b06-1.el7_9.x86_64
export JRE_HOME=$JAVA_HOME/jre
PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
export JAVA_HOME JRE_HOME CLASS_PATH PATH

jdk
/etc/alternatives/jre_openjdk
source /etc/profile 立即生效
```

#### 报错找不到jdk？

```
默认yum安装java的时候会显示安装的是openjdk1.8 实则实际上只安装了jre
yum install -y java-devel
```

#### Maven阿里云镜像

修改`/usr/local/maven/conf/settings.xml`



```xml
<?xml version="1.0" encoding="UTF-8"?>

<!--
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->

<!--
 | This is the configuration file for Maven. It can be specified at two levels:
 |
 |  1. User Level. This settings.xml file provides configuration for a single user,
 |                 and is normally provided in ${user.home}/.m2/settings.xml.
 |
 |                 NOTE: This location can be overridden with the CLI option:
 |
 |                 -s /path/to/user/settings.xml
 |
 |  2. Global Level. This settings.xml file provides configuration for all Maven
 |                 users on a machine (assuming they're all using the same Maven
 |                 installation). It's normally provided in
 |                 ${maven.conf}/settings.xml.
 |
 |                 NOTE: This location can be overridden with the CLI option:
 |
 |                 -gs /path/to/global/settings.xml
 |
 | The sections in this sample file are intended to give you a running start at
 | getting the most out of your Maven installation. Where appropriate, the default
 | values (values used when the setting is not specified) are provided.
 |
 |-->
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
  <!-- localRepository
   | The path to the local repository maven will use to store artifacts.
   |
   | Default: ${user.home}/.m2/repository
  <localRepository>/path/to/local/repo</localRepository>
  -->
  <localRepository>${user.home}/.m2/repository</localRepository>
  <!-- interactiveMode
   | This will determine whether maven prompts you when it needs input. If set to false,
   | maven will use a sensible default value, perhaps based on some other setting, for
   | the parameter in question.
   |
   | Default: true
  <interactiveMode>true</interactiveMode>
  -->

  <!-- offline
   | Determines whether maven should attempt to connect to the network when executing a build.
   | This will have an effect on artifact downloads, artifact deployment, and others.
   |
   | Default: false
  <offline>false</offline>
  -->

  <!-- pluginGroups
   | This is a list of additional group identifiers that will be searched when resolving plugins by their prefix, i.e.
   | when invoking a command line like "mvn prefix:goal". Maven will automatically add the group identifiers
   | "org.apache.maven.plugins" and "org.codehaus.mojo" if these are not already contained in the list.
   |-->
  <pluginGroups>
    <!-- pluginGroup
     | Specifies a further group identifier to use for plugin lookup.
    <pluginGroup>com.your.plugins</pluginGroup>
    -->
    <pluginGroup>org.mortbay.jetty</pluginGroup>
  </pluginGroups>

  <!-- proxies
   | This is a list of proxies which can be used on this machine to connect to the network.
   | Unless otherwise specified (by system property or command-line switch), the first proxy
   | specification in this list marked as active will be used.
   |-->
  <proxies>
    <!-- proxy
     | Specification for one proxy, to be used in connecting to the network.
     |
    <proxy>
      <id>optional</id>
      <active>true</active>
      <protocol>http</protocol>
      <username>proxyuser</username>
      <password>proxypass</password>
      <host>proxy.host.net</host>
      <port>80</port>
      <nonProxyHosts>local.net|some.host.com</nonProxyHosts>
    </proxy>
    -->
  </proxies>

  <!-- servers
   | This is a list of authentication profiles, keyed by the server-id used within the system.
   | Authentication profiles can be used whenever maven must make a connection to a remote server.
   |-->
  <servers>
    <!-- server
     | Specifies the authentication information to use when connecting to a particular server, identified by
     | a unique name within the system (referred to by the 'id' attribute below).
     | 
     | NOTE: You should either specify username/password OR privateKey/passphrase, since these pairings are 
     |       used together.
     |
    <server>
      <id>deploymentRepo</id>
      <username>repouser</username>
      <password>repopwd</password>
    </server>
    -->
    
    <!-- Another sample, using keys to authenticate.
    <server>
      <id>siteServer</id>
      <privateKey>/path/to/private/key</privateKey>
      <passphrase>optional; leave empty if not used.</passphrase>
    </server>
    -->
    <server>
        <id>releases</id>
        <username>ali</username>
        <password>ali</password>
      </server>
      <server>
        <id>Snapshots</id>
        <username>ali</username>
        <password>ali</password>
      </server>
  </servers>

  <!-- mirrors
   | This is a list of mirrors to be used in downloading artifacts from remote repositories.
   |
   | It works like this: a POM may declare a repository to use in resolving certain artifacts.
   | However, this repository may have problems with heavy traffic at times, so people have mirrored
   | it to several places.
   |
   | That repository definition will have a unique id, so we can create a mirror reference for that
   | repository, to be used as an alternate download site. The mirror site will be the preferred
   | server for that repository.
   |-->
  <mirrors>
    <!-- mirror
     | Specifies a repository mirror site to use instead of a given repository. The repository that
     | this mirror serves has an ID that matches the mirrorOf element of this mirror. IDs are used
     | for inheritance and direct lookup purposes, and must be unique across the set of mirrors.
     |
    <mirror>
      <id>mirrorId</id>
      <mirrorOf>repositoryId</mirrorOf>
      <name>Human Readable Name for this Mirror.</name>
      <url>http://my.repository.com/repo/path</url>
    </mirror>
     -->
    <mirror>
      <!--This sends everything else to /public -->
      <id>nexus</id>
      <mirrorOf>*</mirrorOf> 
      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
    </mirror>
    <mirror>
      <!--This is used to direct the public snapshots repo in the 
          profile below over to a different nexus group -->
      <id>nexus-public-snapshots</id>
      <mirrorOf>public-snapshots</mirrorOf> 
      <url>http://maven.aliyun.com/nexus/content/repositories/snapshots/</url>
    </mirror>
    <mirror>
      <!--This is used to direct the public snapshots repo in the 
          profile below over to a different nexus group -->
      <id>nexus-public-snapshots1</id>
      <mirrorOf>public-snapshots1</mirrorOf> 
      <url>https://artifacts.alfresco.com/nexus/content/repositories/public/</url>
    </mirror>
  </mirrors>

  <!-- profiles
   | This is a list of profiles which can be activated in a variety of ways, and which can modify
   | the build process. Profiles provided in the settings.xml are intended to provide local machine-
   | specific paths and repository locations which allow the build to work in the local environment.
   |
   | For example, if you have an integration testing plugin - like cactus - that needs to know where
   | your Tomcat instance is installed, you can provide a variable here such that the variable is
   | dereferenced during the build process to configure the cactus plugin.
   |
   | As noted above, profiles can be activated in a variety of ways. One way - the activeProfiles
   | section of this document (settings.xml) - will be discussed later. Another way essentially
   | relies on the detection of a system property, either matching a particular value for the property,
   | or merely testing its existence. Profiles can also be activated by JDK version prefix, where a
   | value of '1.4' might activate a profile when the build is executed on a JDK version of '1.4.2_07'.
   | Finally, the list of active profiles can be specified directly from the command line.
   |
   | NOTE: For profiles defined in the settings.xml, you are restricted to specifying only artifact
   |       repositories, plugin repositories, and free-form properties to be used as configuration
   |       variables for plugins in the POM.
   |
   |-->
   <profiles> 
    <profile>
      <id>development</id>
      <repositories>
        <repository>
          <id>central</id>
          <url>http://central</url>
          <releases><enabled>true</enabled><updatePolicy>always</updatePolicy></releases>
          <snapshots><enabled>true</enabled><updatePolicy>always</updatePolicy></snapshots>
        </repository>
      </repositories>
     <pluginRepositories>
        <pluginRepository>
          <id>central</id>
          <url>http://central</url>
          <releases><enabled>true</enabled><updatePolicy>always</updatePolicy></releases>
          <snapshots><enabled>true</enabled><updatePolicy>always</updatePolicy></snapshots>
        </pluginRepository>
      </pluginRepositories>
    </profile>
    <profile>
      <!--this profile will allow snapshots to be searched when activated-->
      <id>public-snapshots</id>
      <repositories>
        <repository>
          <id>public-snapshots</id>
          <url>http://public-snapshots</url>
          <releases><enabled>false</enabled></releases>
          <snapshots><enabled>true</enabled><updatePolicy>always</updatePolicy></snapshots>
        </repository>
      </repositories>
     <pluginRepositories>
        <pluginRepository>
          <id>public-snapshots</id>
          <url>http://public-snapshots</url>
          <releases><enabled>false</enabled></releases>
          <snapshots><enabled>true</enabled><updatePolicy>always</updatePolicy></snapshots>
        </pluginRepository>
      </pluginRepositories>
    </profile>
  </profiles>
 
   <activeProfiles>
    <activeProfile>development</activeProfile>
    <activeProfile>public-snapshots</activeProfile>
   </activeProfiles>

  <!-- activeProfiles
   | List of profiles that are active for all builds.
   |
  <activeProfiles>
    <activeProfile>alwaysActiveProfile</activeProfile>
    <activeProfile>anotherAlwaysActiveProfile</activeProfile>
  </activeProfiles>
  -->
</settings>

```

### publish over ssh 配置

1 安装插件

在Configure System菜单里 往下来


2 添加一台目标服务器

![image-20220726223917263](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208100926235.png)

![image-20220726223937722](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208100926239.png)

3 修改配置

![image-20220727165700419](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208100926058.png)





#### 超时机制

输出命令时一定要注意不要让窗口卡主，不然Jenkins会认为认为一直没完成

#### shell的日志输出

```
nohup java -jar /root/xxoo/demo*.jar >mylog.log 2>&1 &
```



#### 数据流重定向

数据流重定向就是将某个命令执行后应该要出现在屏幕上的数据传输到其他地方

标准输入（stdin）：代码为0，使用<或<<;
标准输出（stdout）：代码为1，使用>或>>;
标准错误输出（stderr）：代码为2，使用2>或2>>

\> 覆盖写
\>> 追加写



### 运行前清理

配置杀死之前运行的进程



```shell
#!/bin/bash

#删除历史数据
rm -rf xxoo

appname=$1
#获取传入的参数
echo "arg:$1"


#获取正在运行的jar包pid
pid=`ps -ef | grep $1 | grep 'java -jar' | awk '{printf $2}'`

echo $pid

#如果pid为空，提示一下，否则，执行kill命令
if [ -z $pid ];
#使用-z 做空值判断
        then
                echo "$appname not started"

        else
               kill -9 $pid
                echo "$appname stoping...."

check=`ps -ef | grep -w $pid | grep java`
if [ -z $check ];

        then
                echo "$appname pid:$pid is stop"
        else
                echo "$appname stop failed"

fi


fi

```



### 几种构建方式

- 快照依赖构建/Build whenever a SNAPSHOT dependency is built
  - 当依赖的快照被构建时执行本job
- 触发远程构建 (例如,使用脚本)
  - 远程调用本job的restapi时执行本job
- job依赖构建/Build after other projects are built
  - 当依赖的job被构建时执行本job
- 定时构建/Build periodically
  - 使用cron表达式定时构建本job
- 向GitHub提交代码时触发Jenkins自动构建/GitHub hook trigger for GITScm polling
  - Github-WebHook出发时构建本job
- 定期检查代码变更/Poll SCM
  - 使用cron表达式定时检查代码变更，变更后构建本job

#### 触发远程构建/gitlab上改动自动构建

代码改动自动可以使用gitlab的webhook回调钩子调起Jenkins的启动任务接口

在构建触发器中配置接口和token

![image-20220728170250273](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208100926069.png)



#### 定时构建

##### Jenkins cron表达式

标准cron

https://crontab.guru

Jenkins cron不是标准的cron表达式

```
第一个 * 表示每个小时的第几分钟，取值0~59

H * * * *
H：每小时执行一次

第二颗 * 表示小时，取值0~23

* 15 * * * 表示每天下午3点
* 1 * * *  表示每天凌晨1点

第三颗 * 表示一个月的第几天，取值1~31
* 1 5 * *  表示每月5日凌晨1点

第四颗 * 表示第几月，取值1~12
* 15 5 1 *  表示每年几月执行

第五颗 * 表示一周中的第几天，取值0~7，其中0和7代表的都是周日

```

**“/”**

表示每隔多长时间，比如 */10 * * * * 表示 每隔10分钟

**“H”**

hash散列值，以job名取值，获取到以job名为入参的唯一值，相同名称值也相同，这个偏移量会和实际时间相加，获得一个真实的运行时间

意义在于：不同的项目在不同的时间运行，即使配置的值是一样的，比如 都是`15 * * * * ` ，表示每个小时的第15分钟开始执行任务，那么会造成同一时间内在Jenkins中启动很多job，换成`H/15 * * * *`,那么在首次启动任务时，会有随机值参与进来，有的会在17分钟启动 有的会在19分钟启动，随后的启动时间也是这个值。这样就能错开相同cron值的任务执行了。

H的值也可以设置范围



`H * * * *`表示一小时内的任意时间

`*/10 * * * *`每10分钟

`H/10 * * * *`每10分钟,可能是7,17,27，起始时间hash，步长不变

`45 3 * * 1-6 ` 每个周一至周六，凌晨3点45 执行1次

`45 3-5 * * 1-6 ` 每个周一至周六，凌晨3点45 ，凌晨4点45，凌晨5点45 各执行1次

`H(40-48) 3-5 * * 1-6 ` 在40~48之间取值 其他同上

`45 3-5/2 * * 1-6 ` 每个周一至周六，凌晨3点45 ，凌晨5点45 各执行1次

` 45 0-6/2 * * 1-6 * * 1-6 ` 0点开始，每间隔2小时执行一次 0:45、2:45、4:45

#### 源码变更构建

使用Poll SCM 方式与Build periodically一样

会主动定期检查代码托管服务器上是否有变化，一旦发生变化执行job构建

### 测试报告邮件通知

使用163免费邮箱发送邮件时注意密码填认证码，也就是发送手机短信后给的那个，不要用登录邮箱的密码

类似下面。。

```
KDWJUWDQBWMOYGDC
```

### 



### 自动化部署到docker容器中

#### docker外挂目录

```
docker run -d -p 8080:8080 --name demo-out -v /root/jarfile/demo-1-0.0.1-SNAPSHOT.jar:/app.jar openjdk:11 java -jar app.jar
```



#### 打包到容器内



1. 准备一台测试服务器 docker环境
2. 准备支持jdk的镜像



```
FROM openjdk:11
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp
RUN javac Main.java
CMD ["java", "Main"]
```





1. 把jar包打包到容器内

dockerfile

```dockerfile
FROM openjdk:11
EXPOSE 8080

WORKDIR /root

ADD jarfile/demo*.jar /root/app.jar
ENTRYPOINT ["java","-jar","/root/app.jar"]
```



打包镜像

```
docker build -t demo .
```



配置国内镜像

修改`/etc/docker/daemon.json`文件，没有的话创建一个

写入

```
{
    "registry-mirrors": [
        "https://ustc-edu-cn.mirror.aliyuncs.com",
        "http://hub-mirror.c.163.com",
        "https://registry.aliyuncs.com"
    ]
}
```

重启服务

```
systemctl daemon-reload
systemctl restart docker
```





## Jenkins集群/并发构建



集群化构建可以有效提升构建效率，尤其是团队项目比较多或是子项目比较多的时候，可以并发在多台机器上执行构建。





## 流水线 pipeline

流水线既能作为任务的本身，也能作为Jenkinsfile

使用流水线可以让我们的任务从ui手动操作，转换为代码化，像docker的dockerfile一样，从shell命令到配置文件，更适合大型项目，可以让团队其他开发者同时参与进来，同时也可以编辑开发Jenkinswebui不能完成的更复杂的构建逻辑，作为开发者可读性也更好。



### 完整语法

5个必备的组成部分

```
pipeline：整条流水线
agent：指定执行器
stages：所有阶段
stage：某一阶段，可有多个
steps：阶段内的每一步，可执行命令
```



### 测试脚本

#### 基础框架

```
pipeline {
    agent any

    stages {
        stage('拉取代码') {
            steps {
            
                echo '拉取代码完成'
               
            }

        }
        stage('执行构建') {
            steps {
                echo '执行构建完成'


            }

        }
    }
    
    post {
        
        always {
            
            echo "完成"
            
        }
        
        failure {
            
            echo "失败"
        }
    }
}
```

#### 阶段视图 Stage View

#### blue ocean可视化界面

全新的流水线控制ui，可重复执行某阶段代码

插件中心搜索blue ocean安装即可

#### post

流水线完成后可执行的任务

- always 无论流水线或者阶段的完成状态。
- changed 只有当流水线或者阶段完成状态与之前不同时。
- failure 只有当流水线或者阶段状态为"failure"运行。
- success 只有当流水线或者阶段状态为"success"运行。
- unstable 只有当流水线或者阶段状态为"unstable"运行。例如：测试失败。
- aborted 只有当流水线或者阶段状态为"aborted "运行。例如：手动取消。

#### agent

可以指定执行节点

label 指定运行job的节点标签

any 不指定，由Jenkins分配

```
pipeline {
    agent {
        node {
            label "jenkins-02"
        }
        
    }

    stages {
        stage('拉取代码') {
            steps {
          
                sh """
                    sleep 10
                            
                   """

                echo '拉取代码完成'
               
            }

        }
        stage('执行构建') {
            steps {
                echo '执行构建完成'


            }

        }
    }
    
    post {
        
        always {
            
            echo "完成"
            
        }
        
        failure {
            
            echo "失败"
        }
    }
}

```



### pipeline中执行自动化构建

```
pipeline {
    agent any

    tools {
        
        maven "maven3"
        
    }
    stages {
        stage("拉取代码") {
            steps {
                
                
                git branch: 'main', credentialsId: 'gitlab', url: 'http://192.168.44.103/root/java-project.git'
                echo '拉取成功'
            }
        }

        stage("执行构建") {
            steps {
                
            //    sh "mvn --version"
                sh """ 
                cd demo-1
                
                mvn clean package
                """
                
                echo '构建完成'
            }

        }
        
        
        stage("clean test server"){
            
            steps{
                
sshPublisher(publishers: [sshPublisherDesc(configName: 'testserver', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''rm -rf *

docker stop demo
docker rm demo
docker rmi demo
''', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '/root')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }
        
        
        
        
        
        stage("发送jar包到测试服务器") {
            steps {
                
                sshPublisher(publishers: [sshPublisherDesc(configName: 'testserver', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '/jarfile', remoteDirectorySDF: false, removePrefix: 'demo-1/target', sourceFiles: '**/demo*.jar'), sshTransfer(cleanRemote: false, excludes: '', execCommand: '''docker build -t demo .
docker run -d -p 8080:8080 --name demo demo''', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '/', remoteDirectorySDF: false, removePrefix: 'demo-1/docker', sourceFiles: 'demo-1/docker/dockerfile')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
                
                
                echo 'jar send over!'
            }

        }

    }
}

```



#### 声明式流水线

好处

- 更像是在Jenkins web ui中的操作
- 可读性比较高
- 可以使用blue ocean自动生成
- 支持语法检查

坏处

- 代码逻辑能力比脚本式弱，不能完成特别复杂的任务	



#### 脚本式流水线

好处

- 更少的代码和弱规范要求
- 更灵活的自定义代码操作
- 不受约束，可以构建特别复杂的工作流和流水线

坏处

- 读写对编程要求比较高
- 比声明式流水线代码更复杂



# 部署案例

[Jenkins+Docker 一键自动化部署 SpringBoot 项目 (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU4MDUyMDQyNQ==&mid=2247509452&idx=1&sn=a8fb5de200164a3d52dd58f330b4067d&chksm=fd57754aca20fc5c7deb6a7acc47649d4047d8261df98c56472ddebeb9f7be5c8c7cc0862fe5&mpshare=1&scene=23&srcid=0820b5rbDuQkbFNAhCRNr6ue&sharer_sharetime=1660967366964&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

[我常用的自动化部署技巧，贼好用，推荐给大家！ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247485031&idx=2&sn=38ee903435b46a9708ab24c9e0bc9b60&chksm=fc2fba6fcb583379d8f31a38887d4a89bcfceb102ed389e1c4b63cbe16cd19f5947fc803dbd9&mpshare=1&scene=23&srcid=0809HsjoSkWtflEqRQMdm48Z&sharer_sharetime=1660038814050&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

[使用Jenkins一键打包部署SpringBoot应用，就是这么6！ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247484270&idx=1&sn=92bc35f7568e061059e58af919e75bde&chksm=fc2fbf66cb5836703713c6da2258704fe3a1adc5f643e0150c545236ec3d6c87385dbc5c2e4a&mpshare=1&scene=23&srcid=08109gU85cbiqXPNtscQay8S&sharer_sharetime=1660105615393&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)



# 灰度发布、蓝绿发布、滚动发布

在项目迭代的过程中，不可避免需要”上线“。上线对应着部署，或者重新部署；部署对应着修改；修改则意味着风险。目前有很多部署发布的技术, 这儿将常见的做一个总结。

上面所说难免有些抽象, 举一个情景例子, 加入你是微博项目负责人员, 现在新版本较原来的老版本有很大的改变, 这设计到服务架构、前端UI等等, 经过测试功能没有障碍, 那么这时候如何让用户切换到新的版本呢?

显而易见, 第一次发布的应用是没有所谓的这个问题的, 这种如何发布的思考只会出现在后面的版本迭代中。

## 01、蓝绿发布

蓝绿部署中，一共有两套系统：一套是正在提供服务系统(也就是上面说的旧版)，标记为“绿色”；另一套是准备发布的系统，标记为“蓝色”。两套系统都是功能完善的，并且正在运行的系统，只是系统版本和对外服务情况不同。正在对外提供服务的老系统是绿色系统，新部署的系统是蓝色系统。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208230958063.png" alt="image-20220823095846980" style="zoom:80%;" />

蓝色系统不对外提供服务，用来做啥？

用来做发布前测试，测试过程中发现任何问题，可以直接在蓝色系统上修改，不干扰用户正在使用的系统。

蓝色系统经过反复的测试、修改、验证，确定达到上线标准之后，直接将用户切换到蓝色系统, 切换后的一段时间内，依旧是蓝绿两套系统并存，但是用户访问的已经是蓝色系统。这段时间内观察蓝色系统（新系统）工作状态，如果出现问题，直接切换回绿色系统。

当确信对外提供服务的蓝色系统工作正常，不对外提供服务的绿色系统已经不再需要的时候，蓝色系统正式成为对外提供服务系统，成为新的绿色系统。原先的绿色系统可以销毁，将资源释放出来，用于[部署下一个蓝色系统。

### 02、蓝绿发布特点

1. 蓝绿部署的目的是减少发布时的中断时间、能够快速撤回发布。
2. 两套系统没有耦合的时候才能百分百保证不干扰

### 03、蓝绿发布注意事项

蓝绿部署只是[上线策略中的一种，它不是可以应对所有情况的万能方案。蓝绿部署能够简单快捷实施的前提假设是目标系统是非常内聚的，如果目标系统相当复杂，那么如何切换、两套系统的数据是否需要以及如何同步等，都需要仔细考虑。

当你切换到蓝色环境时，需要妥当处理未完成的业务和新的业务。如果你的数据库后端无法处理，会是一个比较麻烦的问题；

- 可能会出现需要同时处理“微服务架构应用”和“传统架构应用”的情况，如果在蓝绿[部署中协调不好这两者，还是有可能会导致服务停止。
- 需要提前考虑数据库与应用部署同步迁移 /回滚的问题。
- 蓝绿部署需要有基础设施支持。
- 在非隔离基础架构（ VM 、 Docker 等）上执行蓝绿[部署，蓝色环境和绿色环境有被摧毁的风险。

## 04、滚动发布

一般是取出一个或者多个服务器停止服务，执行更新，并重新将其投入使用。周而复始，直到集群中所有的实例都更新成新版本。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208230959741.png" alt="image-20220823095938675" style="zoom:67%;" />

发布流程:

相对于蓝绿发布需要一套完备的机器不同, 滚动发布只需要一台机器(这儿这是为了理解, 实际可能是多台), 我们只需要将部分功能部署在这台机器上, 然后去替换正在运行的机器, 如上图, 将更新后的功能部署在Server1 上, 然后Server1去替换正在运行的Server, 替换下来的物理机又可以继续部署Server2的新版本, 然后去替换正在工作的Server2 , 以此类推, 直到替换完所有的服务器, 至此 ,服务更新完成。

### 05、滚动发布特点

1. 这种部署方式相对于蓝绿部署，更加节约资源——它不需要运行两个集群、两倍的实例数。我们可以部分部署，例如每次只取出集群的20%进行升级。
2. 回滚困难

### 06、滚定发布注意事项

1. 滚动发布没有一个确定可行的环境。使用蓝绿[部署，我们能够清晰地知道老版本是可行的，而使用滚动发布，我们无法确定。
2. 修改了现有的环境。
3. 回滚困难。举个例子，在某一次发布中，我们需要更新100个实例，每次更新10个实例，每次部署需要5分钟。当滚动发布到第80个实例时，发现了问题，需要回滚，这个回滚却是一个痛苦，并且漫长的过程。
4. 有的时候，我们还可能对系统进行动态伸缩，如果部署期间，系统自动扩容/缩容了，我们还需判断到底哪个节点使用的是哪个代码。尽管有一些自动化的运维工具，但是依然令人心惊胆战。
5. 因为是逐步更新，那么我们在上线代码的时候，就会短暂出现新老版本不一致的情况，如果对上线要求较高的场景，那么就需要考虑如何做好兼容的问题。

## 07、灰度发布

灰度发布, 也叫金丝雀发布。是指在黑与白之间，能够平滑过渡的一种发布方式。AB test就是一种灰度发布方式，让一部分用户继续用A，一部分用户开始用B，如果用户对B没有什么反对意见，那么逐步扩大范围，把所有用户都迁移到B上面来。灰度发布可以保证整体系统的稳定，在初始灰度的时候就可以发现、调整问题，以保证其影响度，而我们平常所说的金丝雀[部署也就是灰度发布的一种方式。

具体到服务器上, 实际操作中还可以做更多控制，譬如说，给最初更新的10台服务器设置较低的权重、控制发送给这10台服务器的请求数，然后逐渐提高权重、增加请求数。一种平滑过渡的思路, 这个控制叫做“流量切分”。

> 17世纪，英国矿井工人发现，金丝雀对瓦斯这种气体十分敏感。空气中哪怕有极其微量的瓦斯，金丝雀也会停止歌唱；而当瓦斯含量超过一定限度时，虽然鲁钝的人 类毫无察觉，金丝雀却早已毒发身亡。当时在采矿设备相对简陋的条件下，工人们每次下井都会带上一只金丝雀作为“瓦斯检测指标”，以便在危险状况下紧急撤离。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208231000948.png" alt="image-20220823100026882" style="zoom:67%;" />

过程:

1. 准备好部署各个阶段的工件，包括：构建工件，测试脚本，配置文件和部署清单文件。
2. 将“金丝雀”服务器部署进服务器中, 测试。
3. 从负载均衡列表中移除掉“金丝雀”服务器。
4. 升级“金丝雀”应用（排掉原有流量并进行[部署）。
5. 对应用进行自动化测试。
6. 将“金丝雀”服务器重新添加到负载均衡列表中（连通性和健康检查）。
7. 如果“金丝雀”在线使用测试成功，升级剩余的其他服务器。（否则就回滚）

## 08、A/B测试

A/B测试和蓝绿发布、滚动发布以及金丝雀发布，完全是两回事。

蓝绿发布、滚动发布和金丝雀是发布策略，目标是确保新上线的系统稳定，关注的是新系统的BUG、隐患。

A/B测试是效果测试，同一时间有多个版本的服务对外服务，这些服务都是经过足够测试，达到了[上线标准的服务，有差异但是没有新旧之分（它们[上线时可能采用了蓝绿部署的方式）。

A/B测试关注的是不同版本的服务的实际效果，譬如说转化率、订单情况等。

A/B测试时，线上同时运行多个版本的服务，这些服务通常会有一些体验上的差异，譬如说页面样式、颜色、操作流程不同。相关人员通过分析各个版本服务的实际效果，选出效果最好的版本。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208231000488.png" alt="image-20220823100050435" style="zoom:80%;" />





# Jenkins构建SpringBoot

自动持续集成不知道大家伙有没有听说过，有用过类似的工具吗？

简而言之，自动持续集成的工作主要是能对项目进行构建、自动化测试和发布。

今天这篇文章就来讲讲常用的持续集成的工具`Jenkins`以及如何自动构建`Spring Boot`项目。

## 如何安装Jenkins？

Jenkins是Java开发的一套工具，可以直接下载`war`包部署在`Tomcat`上，但是今天用最方便、最流行的`Docker`安装。

### 环境准备

在开始安装之前需要准备以下环境和工具：

1. 一台服务器，当然没有的话可以用自己的电脑，作者的服务器型号是`Ubuntu`。
2. `JDK`环境安装，作者的版本是`1.8`，至于如何安装，网上很多教程。
3. 准备`maven`环境，官网下载一个安装包，放在指定的目录下即可。
4. `Git`环境安装，网上教程很多。
5. 代码托管平台，比如`Github`、`GitLab`等。

### 开始安装Jenkins

`Docker`安装`Jenkins`非常方便，只要跟着作者的步骤一步步操作，一定能够安装成功。

#### Docker环境安装

每个型号服务器安装的方式各不相同，读者可以根据自己的型号安装，网上教程很多。

#### 拉取镜像

我这里安装的版本是`jenkins/jenkins:2.222.3-centos`，可以去这里获取你需要的版本: `https://hub.docker.com/_/jenkins?tab=tags`。执行如下命令安装：

```sh
docker pull jenkins/jenkins:2.222.3-centos
```

#### 创建本地数据卷

在本地创建一个数据卷挂载docker容器中的数据卷，我创建的是`/data/jenkins_home/`，命令如下：

```sh
mkdir -p /data/jenkins_home/
```

需要修改下目录权限，因为当映射本地数据卷时，`/data/jenkins_home/`目录的拥有者为`root`用户，而容器中`jenkins`用户的 `uid` 为 `1000`。

```sh
chown -R 1000:1000 /data/jenkins_home/
```

#### 创建容器

除了需要挂载上面创建的`/data/jenkins_home/`以外，还需要挂载`maven`、`jdk`的根目录。启动命令如下：

```sh
docker run -d --name jenkins -p 8040:8080 -p 50000:50000 -v /data/jenkins_home:/var/jenkins_home -v /usr/local/jdk:/usr/local/jdk -v /usr/local/maven:/usr/local/maven jenkins/jenkins:2.222.3-centos
```

以上命令解析如下：

1. `-d`：后台运行容器
2. `--name`：指定容器启动的名称
3. `-p`：指定映射的端口，这里是将服务器的`8040`端口映射到容器的`8080`以及`50000`映射到容器的`50000`。**「注意：」** `8040`和`50000`一定要是开放的且未被占用，如果用的是云服务器，还需要在管理平台开放对应的规则。
4. `-v`：挂载本地的数据卷到`docker`容器中，**「注意：」** 需要将`JDK`和`maven`的所在的目录挂载。

## 初始化配置

容器启动成功，则需要配置`Jenkins`，安装一些插件、配置远程推送等等。

### 访问首页

容器创建成功，访问`http://ip:8040`，如果出现以下页面表示安装成功：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061753165.png" alt="image-20221206175317110" style="zoom:80%;" />

### 输入管理员密码

启动成功，则会要求输入密码，如下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061753546.png" alt="image-20221206175334477" style="zoom:80%;" />

这里要求输入的是管理的密码，提示是在`/var/jenkins_home/secrets/initialAdminPassword`，但是我们已经将`/var/jenkins_home`这个文件夹挂载到本地目录了，因此只需要去挂载的目录`/data/jenkins_home/secrets/initialAdminPassword`文件中找。

输入密码，点击继续。

### 安装插件

初始化安装只需要安装社区推荐的一些插件即可，如下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061753686.png" alt="image-20221206175354598" style="zoom:67%;" />

这里选择`安装推荐的插件`，然后 `Jenkins` 会自动开始安装。

**「注意：」** 如果出现想插件安装很慢的问题，找到`/data/jenkins_home/updates/default.json`文件，替换的内容如下：

1. 将 `updates.jenkins-ci.org/download` 替换为`mirrors.tuna.tsinghua.edu.cn/jenkins`
2. 将 `www.google.com` 替换为`www.baidu.com`。

执行以下两条命令：

```
sed -i 's/www.google.com/www.baidu.com/g' default.json

sed -i 's/updates.jenkins-ci.org\/download/mirrors.tuna.tsinghua.edu.cn\/jenkins/g' default.json
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061754274.png" alt="image-20221206175410169" style="zoom:67%;" />

全部安装完成，继续下一步。

### 创建管理员

随便创建一个管理员，按要求填写信息，如下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061754883.png" alt="image-20221206175421822" style="zoom:67%;" />

### 实例配置

配置自己的服务器`IP`和`端口`，如下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061754672.png" alt="image-20221206175433615" style="zoom:80%;" />

### 配置完成

按照以上步骤，配置完成后自动跳转到如下界面：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061754294.png" alt="image-20221206175449219" style="zoom:67%;" />

## 构建Spring Boot 项目

在构建之前还需要配置一些开发环境，比如`JDK`，`Maven`等环境。

### 配置JDK、maven、Git环境

`Jenkins`集成需要用到`maven`、`JDK`、`Git`环境，下面介绍如何配置。

首先打开`系统管理`->`全局工具配置`，如下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061756719.png" alt="image-20221206175625653" style="zoom:80%;" />

分别配置`JDK`，`Git`，`Maven`的路径，根据你的实际路径来填写。

**「注意」**：这里的`JDK`、`Git`、`Maven`环境一定要挂载到`docker`容器中，否则会出现以下提示：

```
 xxxx is not a directory on the Jenkins master (but perhaps it exists on some agents)
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061756168.png" alt="image-20221206175643095" style="zoom:80%;" />

配置成功后，点击保存。

### 安装插件

除了初始化配置中安装的插件外，还需要安装如下几个插件：

1. `Maven Integration`
2. `Publish Over SSH`

打开`系统管理` -> `插件管理`，选择`可选插件`，勾选中 `Maven Integration` 和 `Publish Over SSH`，点击`直接安装`。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061758666.png" alt="image-20221206175808617" style="zoom:80%;" />

在安装界面勾选上安装完成后重启 `Jenkins`。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061758614.png" alt="image-20221206175817562" style="zoom:67%;" />

### 添加 SSH Server

`SSH Server` 是用来连接部署服务器的，用于在项目构建完成后将你的应用推送到服务器中并执行相应的脚本。

打开 `系统管理` -> `系统配置`，找到 `Publish Over SSH` 部分，选择`新增`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061758738.png" alt="image-20221206175838683" style="zoom:67%;" />

点击 `高级` 展开配置

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061758317.png" alt="image-20221206175852252" style="zoom:80%;" />

最终配置如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061759338.png" alt="image-20221206175914263" style="zoom:67%;" />

配置完成后可点击 `Test Configuration` 测试连接，出现 `success` 则连接成功。

### 添加凭据

凭据 是用来从 `Git` 仓库拉取代码的，打开 `凭据` -> `系统` -> `全局凭据` -> `添加凭据`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061759666.png" alt="image-20221206175929612" style="zoom:80%;" />

这里配置的是`Github`，直接使用`用户名`和`密码`，如下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061759816.png" alt="image-20221206175948750" style="zoom:67%;" />

创建成功，点击保存。

### 新建Maven项目

以上配置完成后即可开始构建了，首先需要新建一个`Maven`项目，步骤如下。

#### 创建任务

首页点击`新建任务`->`构建一个maven项目`，如下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061801817.png" alt="image-20221206180123733" style="zoom:80%;" />

#### 源码管理

在源码管理中，选择`Git`，填写`仓库地址`，选择之前添加的`凭证`。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061801932.png" alt="image-20221206180135852" style="zoom:67%;" />

#### 构建环境

勾选 `Add timestamps to the Console Output`，代码构建的过程中会将日志打印出来。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061801376.png" alt="image-20221206180151324" style="zoom:67%;" />

#### 构建命令

在`Build`中，填写 `Root POM` 和 `Goals and options`，也就是你构建项目的命令。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061802748.png" alt="image-20221206180206697" style="zoom:67%;" />

#### Post Steps

选择`Run only if build succeeds`，添加 `Post` 步骤，选择 `Send files or execute commands over SSH`。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061802125.png" alt="image-20221206180219039" style="zoom:67%;" />

上图各个选项解析如下：

1. `name`:选择前面添加的`SSH Server`
2. `Source files`:要推送的文件
3. `Remove prefix`:文件路径中要去掉的前缀，
4. `Remote directory`:要推送到目标服务器上的哪个目录下
5. `Exec command`:目标服务器上要执行的脚本

`Exec command`指定了需要执行的脚本，如下：

```properties
# jdk环境，如果全局配置了，可以省略
export JAVA_HOME=/xx/xx/jdk
export JRE_HOME=/xx/xx/jdk/jre
export CLASSPATH=/xx/xx/jdk/lib
export PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$PATH
 
# jenkins编译之后的jar包位置，在挂载docker的目录下
JAR_PATH=/data/jenkins_home/workspace/test/target
# 自定义的jar包位置
DIR=/data/test

## jar包的名称
JARFILE=swagger-demo-0.0.1-SNAPSHOT.jar

if [ ! -d $DIR/backup ];then
   mkdir -p $DIR/backup
fi

ps -ef | grep $JARFILE | grep -v grep | awk '{print $2}' | xargs kill -9

if [ -f $DIR/backup/$JARFILE ]; then
 rm -f $DIR/backup/$JARFILE
fi

mv $JAR_PATH/$JARFILE $DIR/backup/$JARFILE


java -jar $DIR/backup/$JARFILE > out.log &
if [ $? = 0 ];then
        sleep 30
        tail -n 50 out.log
fi

cd $DIR/backup/
ls -lt|awk 'NR>5{print $NF}'|xargs rm -rf
```

以上脚本大致的意思就是将`kill`原有的进程，启动新构建`jar`包。

> 脚本可以自己定制，比如备份`Jar`等操作。

## 构建任务

项目新建完成之后，一切都已准备就绪，点击`立即构建`可以开始构建任务，控制台可以看到`log`输出，如果构建失败，在`log`中会输出原因。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061810885.png" alt="image-20221206181022806" style="zoom:67%;" />

任务构建过程会执行脚本启动项目。

## 如何构建托管在GitLab的项目？

上文介绍的例子是构建`Github`仓库的项目，但是企业中一般都是私服的`GitLab`，那么又该如何配置呢？

其实原理是一样的，只是在构建任务的时候选择的是`GitLab`的凭据，下面将详细介绍。

### 安装插件

在`系统管理`->`插件管理`->`可选插件`中搜索`GitLab Plugin`并安装。

### 添加GitLab API token

首先打开 `凭据` -> `系统` -> `全局凭据` -> `添加凭据`，如下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061810719.png" alt="image-20221206181042661" style="zoom:80%;" />

上图中的`API token`如何获取呢？

打开`GitLab`（例如公司内网的`GitLab`网站），点击个人设置菜单下的`setting`，再点击`Account`，复制`Private token`，如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061810048.png" alt="image-20221206181057989" style="zoom:80%;" />

上图的`Private token`则是`API token`，填上即可。

### 配置GitLab插件

打开`系统管理`->`系统配置`->`GitLab`，如下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061811822.png" alt="image-20221206181155746" style="zoom:67%;" />

配置成功后，点击`Test Connection`，如果提示`Success`则配置成功。

### 新建任务

新建一个Maven任务，配置的步骤和上文相同，唯一区别则是配置`Git`仓库地址的地方，如下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061811297.png" alt="image-20221206181137225" style="zoom:67%;" />

仓库地址和凭据需要填写`Gitlab`相对应的。

### 后续操作

后续一些操作，比如构建项目，控制台输出等操作，都是和`GitHub`操作相同，不再赘述了。

## 多模块项目如何构建？

如果你的多模块不是通过私服仓库依赖的，那么在构建打包是有先后顺序的，在新建任务的时候需要配置`Build`的`maven`命令，如下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212061811378.png" alt="image-20221206181120305" style="zoom:80%;" />

上图中的`Goals and options`中的命令就是构建`api`这个模块的命令，至于这个命令是什么意思，前面有单独一篇文章介绍过，请看[一次打包引发的思考，原来maven还能这么玩~](https://mp.weixin.qq.com/s?__biz=MzU3MDAzNDg1MA==&mid=2247485752&idx=1&sn=615f97bd9d161a87f309261c665397b4&scene=21#wechat_redirect)。





# Jenkins+Docker

本文章实现最简单全面的Jenkins+docker+springboot 一键自动部署项目，步骤齐全，少走坑路。

**环境**：centos7+git(gitee)

简述实现步骤：在docker安装jenkins，配置jenkins基本信息，利用Dockerfile和shell脚本实现项目自动拉取打包并运行。

> 基于 SpringBoot + Vue + uni-app 实现的全套电商系统来了，能支持完整的订单流程！最近mall项目发布了大家期待已久的`前台商城系统`和`视频教程`，具体可以参考下文。
>
> - [mall前台商城系统正式发布，支持完整订单流程！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247507977&idx=1&sn=07b2b95709b46efce1bedeae9b6ffdda&scene=21#wechat_redirect)
> - [mall视频教程来了，主流Java技术一网打尽！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247508026&idx=1&sn=b501236f4a24ac8b855ba8f1b5177d56&scene=21#wechat_redirect)

## 安装docker

docker 安装社区版本CE

- 确保 yum 包更新到最新。

```
yum update
```

- 卸载旧版本(如果安装过旧版本的话)

```
yum remove docker  docker-common docker-selinux docker-engine
```

- 安装需要的软件包

```
yum install -y yum-utils device-mapper-persistent-data lvm2
```

- 设置yum源

```
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

- 安装docker

```
yum install docker-ce  #由于repo中默认只开启stable仓库，故这里安装的是最新稳定版17.12.0
yum install <自己的版本>  # 例如：sudo yum install docker-ce-17.12.0.ce
```

- 启动和开机启动

```
systemctl start docker
systemctl enable docker
```

- 验证安装是否成功

```
docker version
```

## 安装Jenkins

Jenkins中文官网：https://www.jenkins.io/zh/

- 安装J enkins

docker 安装一切都是那么简单，注意检查8080是否已经占用！如果占用修改端口

```
docker run --name jenkins -u root --rm -d -p 8080:8080 -p 50000:50000 -v /var/jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock jenkinsci/blueocean
```

如果没改端口号的话

安装完成后访问地址-> `http://{部署Jenkins所在服务IP}:8080`

此处会有几分钟的等待时间。

- 初始化 Jenkins

详情见官网教程->`https://www.jenkins.io`

- 解锁 Jenkins

进入Jenkins容器：`docker exec -it {Jenkins容器名} bash`

例如 `docker exec -it jenkins bash`

查看密码：`cat /var/lib/jenkins/secrets/initialAdminPassword`

复制密码到输入框里面

![图片](https://mmbiz.qpic.cn/mmbiz_png/NW4iaKVI4GNNLwxG4hXR3cy7wI4AzdACPrbEhqbcLR8wXrg2KAhUuILPY6o7qC22AdrchC2O5kpkHSy62jv9chA/640?wx_fmt=png&random=0.2761577485869935&wxfrom=5&wx_lazy=1&wx_co=1)

- 安装插件

选择第一个：安装推荐的插件

![图片](https://mmbiz.qpic.cn/mmbiz_png/NW4iaKVI4GNNLwxG4hXR3cy7wI4AzdACPMShC9B9Gb1uaG4wa1HiaEGaoKYKa3IsH63icts1LdKAOwokfbCbkn0hA/640?wx_fmt=png&random=0.24174694738504887&wxfrom=5&wx_lazy=1&wx_co=1)

- 创建管理员用户

此账户一定要记住哦

## 系统配置

- 安装需要插件

进入【`首页`】–【`系统管理`】–【`插件管理`】–【`可选插件`】

搜索以下需要安装的插件，点击安装即可。

![图片](https://mmbiz.qpic.cn/mmbiz_png/NW4iaKVI4GNNLwxG4hXR3cy7wI4AzdACPQDKicJDxKMYtmb2MR4zTsibv5nNPOQbXMaK7fF7RuxaeumlDclmjKqbA/640?wx_fmt=png&random=0.0851113119142719&wxfrom=5&wx_lazy=1&wx_co=1)

- 安装Maven Integration
- 安装Publish Over SSH(如果不需要远程推送，不用安装)
- 如果使用Gitee 码云，安装插件Gitee（Git自带不用安装）
- 配置Maven

进入【`首页`】–【`系统管理`】–【`全局配置`】，拉到最下面maven–maven安装

![图片](https://mmbiz.qpic.cn/mmbiz_png/NW4iaKVI4GNNLwxG4hXR3cy7wI4AzdACPia49FfDyicLsL2PFLPF3pLjHRADicwTQXoia7GEA0r5kwCleEFvIgmicmGA/640?wx_fmt=png&random=0.2950981127239827&wxfrom=5&wx_lazy=1&wx_co=1)

## 创建任务

- 新建任务

点击【`新建任务`】，输入任务名称，点击构建一个自由风格的软件项目

![图片](https://mmbiz.qpic.cn/mmbiz_png/NW4iaKVI4GNNLwxG4hXR3cy7wI4AzdACPn4pxtrwxiaVpNPCXVzzxibKnMn4hvt3j7grKIKsvwtu2cgia5f9od5jSQ/640?wx_fmt=png&random=0.5713521000113295&wxfrom=5&wx_lazy=1&wx_co=1)

- 源码管理

点击【`源码管理`】–【`Git`】，输入仓库地址，添加凭证，选择好凭证即可。

![图片](https://mmbiz.qpic.cn/mmbiz_png/NW4iaKVI4GNNLwxG4hXR3cy7wI4AzdACPOMibyibMl1EhH9Aib2s2lcywNibN4q4kaer2lW755YUFEaUxXpm3saC2CQ/640?wx_fmt=png&random=0.7040381943590521&wxfrom=5&wx_lazy=1&wx_co=1)![图片](https://mmbiz.qpic.cn/mmbiz_png/NW4iaKVI4GNNLwxG4hXR3cy7wI4AzdACPoC0a8j24GtrU1kDfBCoxLbLHzOxCPF8CLOKmvKF1SiannerYcTtMSOA/640?wx_fmt=png&random=0.3578799357090834&wxfrom=5&wx_lazy=1&wx_co=1)

- 构建触发器

点击【`构建触发器`】–【`构建`】–【`增加构建步骤`】–【`调用顶层Maven目标`】–【`填写配置`】–【`保存`】

![图片](https://mmbiz.qpic.cn/mmbiz_png/NW4iaKVI4GNNLwxG4hXR3cy7wI4AzdACPFRPpniaN1AeLVaj1ia4C6a4iaBHHqF9psdXibQQRDWFda8o0qO8aXy998g/640?wx_fmt=png&random=0.15483698622630326&wxfrom=5&wx_lazy=1&wx_co=1)

此处命令只是install，看是否能生成jar包

```
clean install -Dmaven.test.skip=true
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/NW4iaKVI4GNNLwxG4hXR3cy7wI4AzdACPcuVDibxKIgToKm3kINsEibqtibnDU7dV2hEryTTUiaIMPSqYUjFY0h4tKw/640?wx_fmt=png&random=0.39540935727714044&wxfrom=5&wx_lazy=1&wx_co=1)

- 保存

点击【`保存`】按钮即可

## 测试

该功能测试是否能正常打包

- 构建

点击构建按钮![图片](https://mmbiz.qpic.cn/mmbiz_png/NW4iaKVI4GNNLwxG4hXR3cy7wI4AzdACPO0oSgB0Hm2x6P31EGU7UY1USSMhyj3icwibofRLnNoBE2M2ze36Damtw/640?wx_fmt=png&random=0.6333519074716008&wxfrom=5&wx_lazy=1&wx_co=1)

- 查看日志

点击正在构建的任务，或者点击任务名称，进入详情页面，查看控制台输出，看是否能成功打成jar包。

该处日志第一次可能下载依赖jar包失败，再次点击构建即可成功。

![图片](https://mmbiz.qpic.cn/mmbiz_png/NW4iaKVI4GNNLwxG4hXR3cy7wI4AzdACPwWo4BwS4wjnVxb3dE2gXttNz7oHCwaegprnwvibPUmOmjN1ibt7zJxCA/640?wx_fmt=png&random=0.5999876700852618&wxfrom=5&wx_lazy=1&wx_co=1)![图片](https://mmbiz.qpic.cn/mmbiz_png/NW4iaKVI4GNNLwxG4hXR3cy7wI4AzdACPR7ZIgzsXNFukU8lU5v22NCxlsE8s6RkgQ2qiaScpSicKiboUe8gJAjF1A/640?wx_fmt=png&random=0.7780396922427533&wxfrom=5&wx_lazy=1&wx_co=1)

- 查看项目位置

```
cd /var/jenkins_home/workspace
```

`ll`命令即可查看是否存在

## 运行项目

因为我们项目和jenkins在同一台服务器，所以我们用shell脚本运行项目，原理既是通过dockerfile 打包镜像，然后docker运行即可。

- Dockerfile

在springboot项目根目录新建一个名为Dockerfile的文件，注意没有后缀名，其内容如下:（大致就是使用jdk8，把jar包添加到docker然后运行prd配置文件）

```
FROM jdk:8
VOLUME /tmp
ADD target/zx-order-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8888
ENTRYPOINT ["Bash","-DBash.security.egd=file:/dev/./urandom","-jar","/app.jar","--spring.profiles.active=prd"]
```

- 修改jenkins任务配置

![图片](https://mmbiz.qpic.cn/mmbiz_png/NW4iaKVI4GNNLwxG4hXR3cy7wI4AzdACPodf2UHianoee3djfCv0SHTyxiaen9CFgOLic89EIXQlDStJqUg20Jd7Lg/640?wx_fmt=png&random=0.8426236552246651&wxfrom=5&wx_lazy=1&wx_co=1)

配置如下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/NW4iaKVI4GNNLwxG4hXR3cy7wI4AzdACPTIevYoH9CEPPicianP33fnFmMWkxHMVZiaRbVSA7esFlQmXb4Hh4x0s5w/640?wx_fmt=png&random=0.917211172327181&wxfrom=5&wx_lazy=1&wx_co=1)

```
-t：指定新镜像名
.：表示Dockfile在当前路径
cd /var/jenkins_home/workspace/zx-order-api
docker stop zx-order || true
docker rm zx-order || true
docker rmi zx-order || true
docker build -t zx-order .
docker run -d -p 8888:8888 --name zx-order zx-order:latest
```

备注：

- 我上图用了docker logs -f 是为了方便看日志，真实不要用，因为会一直等待日志，构建任务会失败
- 加|| true 是如果命令执行失败也会继续实行，为了防止第一次没有该镜像报错
- 保存

点击保存即可

- 构建

![图片](https://mmbiz.qpic.cn/mmbiz_png/NW4iaKVI4GNNLwxG4hXR3cy7wI4AzdACP1O6qdkh7ibB11ql6qmX8CSibk74qKdzW0AzuPYXORYtiaeot3uRwUMBPQ/640?wx_fmt=png&random=0.7267159854280252&wxfrom=5&wx_lazy=1&wx_co=1)

查看jenkins控制台输出，输出如下，证明成功！

- 验证

```
docker ps 查看是否有自己的容器
docker logs 自己的容器名 查看日志是否正确
```

浏览器访问项目试一试







































































