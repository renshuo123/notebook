

# 安装Nvidia驱动

[(180条消息) Ubuntu18.04安装Nvidia驱动【全网不坑，超全步骤】（亲测～）_ubuntu安装nvidia显卡驱动_心清似水淡若云、的博客-CSDN博客](https://blog.csdn.net/weixin_44348719/article/details/125049064)



# 效果酷炫命令

想想电影黑客帝国中的画面，估计很多人都会叹为观止。

其实只要会用 Linux 操作系统，就可以实现电脑屏幕的字符串雨了！是不是很高大上呢！

今天将介绍 10 个 Linux 系统的操作指令，都能实现十分酷炫的效果，绝对令人叹为观止！废话不多说，直接进入主题！

## cmatrix 黑客帝国

这个就很酷，有《黑客帝国》那种矩阵风格的动画效果。

```
sudo apt-get install cmatrix
```

接下来就是见证奇迹的时刻：

![图片](https://mmbiz.qpic.cn/mmbiz_gif/s4IVctYyOhh8tW962ttRT7hEebnVtHIatbDaz6zXXAVx4tKiaOfnyR97ok4qTxfo3H5PygY9GzJYIWPHnI5DBlg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)



## sl  小火车来喽

运行结果是一辆呼啸而过的火车，安装命令如下：

```
sudo apt-get install sl
```

运行结果如下：

![图片](https://mmbiz.qpic.cn/mmbiz_gif/s4IVctYyOhh8tW962ttRT7hEebnVtHIa3ARibiamWUd10DqIqulFJiaBqFsthoogtV28s9aka46SpTuyElVExENZw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)



## htop 任务管理器

htop 是 Linux 操作系统的图形化性能检测工具，如果类比的话相当于 Windows 操作系统的任务管理器。安装命令如下

```
sudo apt-get install htop
```

运行出来的结果是绿色的界面，同时动态的检测显示：

<img src="https://mmbiz.qpic.cn/mmbiz_gif/s4IVctYyOhh8tW962ttRT7hEebnVtHIaMNGB6U9dZ9PgoDZ2lwnrHnKTxOMIGTB3nq6gHBhAc5vSJ1I1icMVvvw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1" alt="图片" style="zoom:50%;" />



## hollywood 装逼

说实话这个命令可能就是抖音里很火的那个，你眼中的程序猿 VS 现实中的程序猿。高大上仪表盘，假装自己日理万机，宵衣旰食。听起来是不是很不错。Dustin Kirkland 利用一个长途飞行的时间，编写了这个炫酷、有趣但也没什么实际作用的软件。 在其它 Linux 发行版中，可以通过以下命令安装。

```
sudo apt-add-repository ppa:hollywood/ppa
sudo apt-get install hollywood
sudo apt-get install byobu
```

然后通过`hollywood`这个命令即可欣赏到一个炫酷的界面

![图片](https://mmbiz.qpic.cn/mmbiz_gif/s4IVctYyOhh8tW962ttRT7hEebnVtHIa0mYY9FORQ413BiaGabdYrkl57Z8OPtv5QFNF56ibRJhphzHib3Vb8IhZQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)



## cal 输出年月

cal 命令是 Linux 系统命令行的日历可视化指令，输入对应的年月，就可以打印出来对应的日历表。例如查询 2020 年 9 月的日历，执行命令如下：

```
cal 9 2020
```

运行截图如下：

![图片](https://mmbiz.qpic.cn/mmbiz_gif/s4IVctYyOhh8tW962ttRT7hEebnVtHIasq5xbC9AATicEalY28xwvxAEDRyYNKNNELfhu19V9uV7VqGfB2JPHsA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

## fortune 来一句笑话

输出一句话，有笑话，名言什么的 （还有唐诗宋词）。软件包安装：

```
sudo apt-get install fortune
```

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/BFibC8wtke3u3KIlpzRpxCN8hAoicFfLSPBgA6W9cnBwtjQtEvYy2GNicLvDcxWlBibibib00p0Q8fGiaeurTzMC6oJnA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)    这些都是英文的，如果你想看中国的唐诗三百首，则需要再安装：

```
sudo apt-get install fortune-zh
```

来多执行几次`fortune-zh`，可以看到不同的唐诗：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/BFibC8wtke3u3KIlpzRpxCN8hAoicFfLSPeCfgTeHs9xf3Pica7qT59fWyia5LZJLP2hRxmQuzGekF5kOpHibPMUiaTg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



## cowsay 打印牛羊等动物

cowsay 命令可以打印出来一头牛，并且可以指定让这头牛说任意的话语，安装命令如下：

```
sudo apt-get install cowsay
```

比如让这头牛说“Hello，world”，执行以下命令：

```
cowsay "Hello,world"
```

执行结果如下所示：

<img src="https://mmbiz.qpic.cn/mmbiz_png/s4IVctYyOhh8tW962ttRT7hEebnVtHIaQMAlGCYWIudUEFWLT1eSTicZ5GrfOmxic7ib0rThuE0CF5BQNmDso8T6w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

还有一种骚操作是 **cowsay -l** 查看其它动物的名字，然后 **-f** 跟上动物名，如：

<img src="https://mmbiz.qpic.cn/sz_mmbiz_png/BFibC8wtke3u3KIlpzRpxCN8hAoicFfLSPjUY4nIdHQtoC793Rc9hyYe0490QicJYWkibD6Obgibl1E5f7VmeDUtB1Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

## aafire 燃烧的火

aafire 终端命令可以将字符串像火焰一样的燃烧地输出。安装命令如下：

```
sudo apt-get install libaa-bin
```

终端执行 aafire 指令，看效果：

![图片](https://mmbiz.qpic.cn/mmbiz_gif/s4IVctYyOhh8tW962ttRT7hEebnVtHIaQvfzRIgjMllFfiaB9fHXtYicx0Np5MsO02ibQXfteBWLm2PttrSz4kkhw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)



## yes 死循环输出

yes 命令为 Linux 系统的自带命令，只需要直接在终端输入即可，yes 指令的功能是持续地输出指定的字符串。我们试试在 Linux 系统的终端持续输出“hello，world”字符串：

```
yes hello,world
```

执行效果如下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/s4IVctYyOhh8tW962ttRT7hEebnVtHIaa4pZ913wWKuxibv3iaPe6NGDBQBXZu73YttfeqAa4HjXicEeTELd6aQgQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

只要系统运行，就会持续输出指定的字符串，输入 Ctrl+c 时停止输出。



## bastet 俄罗斯方块

使用 bastet 命令可以在 Linux 系统下玩俄罗斯方块，安装命令如下：

```
sudo apt-get install bastet
```

运行结果如下：

<img src="https://mmbiz.qpic.cn/mmbiz_gif/s4IVctYyOhh8tW962ttRT7hEebnVtHIasiaEfxInFoYLkEibA04oUDPggv4BoRy57iaJ7rLr57pso1rgZD1Hj2ibdw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1" alt="图片" style="zoom:67%;" />



## aview 图片字符化

这个命令可以将图片以 ASCII 码格式在终端上显示，有点 cool。安装软件包：

```
apt-get install aview
```

执行命令，将一张大象的图片 **elephant.jpg** 进行转码显示：

```
asciiview elephant.jpg -driver curses
```



## rm -rf  终结一切

第十个 Linux 操作系统指令，已经被做成表情包，广泛流传了，废话不多说，直接上表情包……

![图片](https://mmbiz.qpic.cn/mmbiz_gif/s4IVctYyOhh8tW962ttRT7hEebnVtHIan9PkE1uPnYcPnr0ZvxhZUdBRv80KfI5nicfFyn5DM3X5XmK4KD3vaOg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

效果太过酷炫，一般人不敢看~~~哈哈哈~~~

## pv 字匀速显示

有时候我们在电影屏幕上看到一些字幕一个个匀速显示出来，像有人在边敲键盘，边显示一样。Linux 上的 pv 命令可实现这种效果。首先安装软件包：

```
sudo apt-get install pv
```

这里我用英文座右铭运行实验：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/BFibC8wtke3u3KIlpzRpxCN8hAoicFfLSPnibgotk2iaic2YpkEtkQnGmq4GBMxLTxP0TpQOicZUib8GNA6icOzFSdB88g/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&wx_co=1)

## boxes ASCII 艺术画

这个命令可以实现在输入的文本或者代码周围框上各种 ASCII 艺术画，非常有趣！首先安装软件包：

```
sudo apt-get install boxes
```

现在我把一段文字不加任何效果输出是这样的：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/BFibC8wtke3u3KIlpzRpxCN8hAoicFfLSPk1K5PEedlPibT7WCNcwCn84qLxQficwibFmReFs0UvNibgfJ2qgKWITn2w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)    

现在加上小猫的图案：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/BFibC8wtke3u3KIlpzRpxCN8hAoicFfLSPtVUic0U8CFLZnebjA7gicY3nKTxH3ricSqwlGEJBjIK1Uo0qhhyE6kVpg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)    

亦或者小狗：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/BFibC8wtke3u3KIlpzRpxCN8hAoicFfLSPrqgBxkX3HIicXxWibbFNeECW4PBPCO3ZiapficuibnOoicTQgtb04iamF4eng/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)    

小老鼠：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/BFibC8wtke3u3KIlpzRpxCN8hAoicFfLSPGC22M364FORKHF4WPAuT2z6uQDyUHV4QMZvMVgeAHh7SibbuG8oT6lw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)    

更多的效果就不展示了，等待着你们去发现~

## linux_logo 系统信息

这个命令可以用来显示 linux 版本 logo 图片及系统信息。安装软件包：

```
sudo apt install linuxlogo
```

直接运行`linux_logo`命令即可：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/BFibC8wtke3u3KIlpzRpxCN8hAoicFfLSPYezCHTPKwrjOrd8r7Mp0oyjMK4JmEB4zvHTRanwxq4Tjhy6BnKog9Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)    我们可以查看内置的 logo 列表：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/BFibC8wtke3u3KIlpzRpxCN8hAoicFfLSPcWHhdCOjE16d5pqujejkfAyrMOjiakHKNERkWoVNyGkaxUEkm5oE5Kw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)    接下来我们开始利用命令在终端循环打印 logo：

```
for i in {1..30};do linux_logo -f -L $i;sleep 2;done
```

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/BFibC8wtke3u3KIlpzRpxCN8hAoicFfLSPoawuWUMA3qxqAnrnRTbIxu3SpgHk2lrHusbAhyG7x6VqUx7rON5hCw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&wx_co=1)

## screenfetch 系统、主题信息

这个命令可以用来显示系统、主题信息。软件包安装：

```
sudo apt install screenfetch
```

直接运行`screenfetch`命令即可：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/BFibC8wtke3u3KIlpzRpxCN8hAoicFfLSPV8XHe2eeaxn2KCZ981jS1cssCSr1ApyleA5LNFEpibdia1zqCYiakxO8Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## oneko 喵星人

桌面上出现一只喵星人，跟着你的鼠标跑，你不动了它就睡觉。软件包安装：

```
sudo apt-get install oneko
```

直接`oneko`命令运行：

<img src="https://mmbiz.qpic.cn/sz_mmbiz_gif/BFibC8wtke3u3KIlpzRpxCN8hAoicFfLSP0ptTIvibIhfibP19HWXgzlcFmUwhlCjvJp5lkRhmiaKrx9BgB8icDULfMw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

要关掉这个小家伙，直接 `ctrl + c` 即可。

## figlet 、toilet 艺术字生成器

艺术字生成器，由 ASCII 字符组成，把文本显示成标题栏。先安装软件包：

```
sudo apt-get install figlet
sudo apt-get install toilet
```

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/BFibC8wtke3u3KIlpzRpxCN8hAoicFfLSPMe7vN1ep7voVKrwhNqohva2zOL7JibPIU1SQK1L1jwI3W8RicwbgrfyQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

toilet 还可以添加颜色：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/BFibC8wtke3u3KIlpzRpxCN8hAoicFfLSPC4gdSp9RNAhibxf0DRzvvEicbKDycETID7q9wpWWTiakIN2kEeONYwicBQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

# 必备命令⭐

[Linux 操作必备 150 个命令，速度收藏～](https://mp.weixin.qq.com/s?__biz=Mzk0NzI3ODMyMA==&mid=2247503076&idx=2&sn=f74239a0c5a9653925853ca93acd9055&chksm=c37bd47bf40c5d6d84350f1b4cd6b87806293bd540172b523be8ebaffcae4c2e3141a9664af1&mpshare=1&scene=23&srcid=0412hW6Zy5Ulv5Baf5zss7Xa&sharer_sharetime=1681229510633&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

## 线上查询及帮助

| **man**  | 查看命令帮助，命令的词典，更复杂的还有 info，但不常用。 |
| :------- | :------------------------------------------------------ |
| **help** | 查看 Linux 内置命令的帮助，比如 cd 命令。               |

## 文件和目录操作

| **ls**       | 全拼 list，功能是列出目录的内容及其内容属性信息。            |
| :----------- | :----------------------------------------------------------- |
| **cd**       | 全拼 change directory，功能是从当前工作目录切换到指定的工作目录。 |
| **cp**       | 全拼 copy，其功能为复制文件或目录。                          |
| **find**     | 查找的意思，用于查找目录及目录下的文件。                     |
| **mkdir**    | 全拼 make directories，其功能是创建目录。                    |
| **mv**       | 全拼 move，其功能是移动或重命名文件。                        |
| **pwd**      | 全拼 print working directory，其功能是显示当前工作目录的绝对路径。 |
| **rename**   | 用于重命名文件。                                             |
| **rm**       | 全拼 remove，其功能是删除一个或多个文件或目录。              |
| **rmdir**    | 全拼 remove empty directories，功能是删除空目录。            |
| **touch**    | 创建新的空文件，改变已有文件的时间戳属性。                   |
| **tree**     | 功能是以树形结构显示目录下的内容。                           |
| **basename** | 显示文件名或目录名。                                         |
| **dirname**  | 显示文件或目录路径。                                         |
| **chattr**   | 改变文件的扩展属性。                                         |
| **lsattr**   | 查看文件扩展属性。                                           |
| **file**     | 显示文件的类型。                                             |
| **md5sum**   | 计算和校验文件的 MD5 值。                                    |

## 查看文件及内容处理

| **cat**        | 全拼 concatenate，功能是用于连接多个文件并且打印到屏幕输出或重定向到指定文件中。 |
| :------------- | :----------------------------------------------------------- |
| **tac**        | tac 是 cat 的反向拼写，因此命令的功能为反向显示文件内容。    |
| **more**       | 分页显示文件内容。                                           |
| **less**       | 分页显示文件内容，more 命令的相反用法。                      |
| **head**       | 显示文件内容的头部。                                         |
| **tail**       | 显示文件内容的尾部。                                         |
| **cut**        | 将文件的每一行按指定分隔符分割并输出。                       |
| **split**      | 分割文件为不同的小片段。                                     |
| **paste**      | 按行合并文件内容。                                           |
| **sort**       | 对文件的文本内容排序。                                       |
| **uniq**       | 去除重复行。oldboy                                           |
| **wc**         | 统计文件的行数、单词数或字节数。                             |
| **iconv**      | 转换文件的编码格式。                                         |
| **dos2unix**   | 将 DOS 格式文件转换成 UNIX 格式。                            |
| **diff**       | 全拼 difference，比较文件的差异，常用于文本文件。            |
| **vimdiff**    | 命令行可视化文件比较工具，常用于文本文件。                   |
| **rev**        | 反向输出文件内容。                                           |
| **grep/egrep** | 过滤字符串，三剑客老三。                                     |
| **join**       | 按两个文件的相同字段合并。                                   |
| **tr**         | 替换或删除字符。                                             |
| **vi/vim**     | 命令行文本编辑器。                                           |

## 文件压缩及解压缩

| **tar**   | 打包压缩。oldboy |
| :-------- | :--------------- |
| **unzip** | 解压文件。       |
| **gzip**  | gzip 压缩工具。  |
| **zip**   | 压缩工具。       |

## 信息显示

| **uname**    | 显示操作系统相关信息的命令。     |
| :----------- | :------------------------------- |
| **hostname** | 显示或者设置当前系统的主机名。   |
| **dmesg**    | 显示开机信息，用于诊断系统故障。 |
| **uptime**   | 显示系统运行时间及负载。         |
| **stat**     | 显示文件或文件系统的状态。       |
| **du**       | 计算磁盘空间使用情况。           |
| **df**       | 报告文件系统磁盘空间的使用情况。 |
| **top**      | 实时显示系统资源使用情况。       |
| **free**     | 查看系统内存。                   |
| **date**     | 显示与设置系统时间。             |
| **cal**      | 查看日历等时间信息。             |

## 搜索文件

| **which**   | 查找二进制命令，按环境变量 PATH 路径查找。                   |
| :---------- | :----------------------------------------------------------- |
| **find**    | 从磁盘遍历查找文件或目录。                                   |
| **whereis** | 查找二进制命令，按环境变量 PATH 路径查找。                   |
| **locate**  | 从数据库 (/var/lib/mlocate/mlocate.db) 查找命令，使用 updatedb 更新库。 |

## 用户管理

| **useradd**  | 添加用户。                                                   |
| :----------- | :----------------------------------------------------------- |
| **usermod**  | 修改系统已经存在的用户属性。                                 |
| **userdel**  | 删除用户。                                                   |
| **groupadd** | 添加用户组。                                                 |
| **passwd**   | 修改用户密码。                                               |
| **chage**    | 修改用户密码有效期限。                                       |
| **id**       | 查看用户的 uid,gid 及归属的用户组。                          |
| **su**       | 切换用户身份。                                               |
| **visudo**   | 编辑 / etc/sudoers 文件的专属命令。                          |
| **sudo**     | 以另外一个用户身份（默认 root 用户）执行事先在 sudoers 文件允许的命令。 |

## 基础网络操作

| **telnet**   | 使用 TELNET 协议远程登录。                   |
| :----------- | :------------------------------------------- |
| **ssh**      | 使用 SSH 加密协议远程登录。                  |
| **scp**      | 全拼 secure copy，用于不同主机之间复制文件。 |
| **wget**     | 命令行下载文件。                             |
| **ping**     | 测试主机之间网络的连通性。                   |
| **route**    | 显示和设置 linux 系统的路由表。              |
| **ifconfig** | 查看、配置、启用或禁用网络接口的命令。       |
| **ifup**     | 启动网卡。                                   |
| **ifdown**   | 关闭网卡。                                   |
| **netstat**  | 查看网络状态。                               |
| **ss**       | 查看网络状态。                               |

## 深入网络操作

| **nmap**       | 网络扫描命令。                                           |
| :------------- | :------------------------------------------------------- |
| **lsof**       | 全名 list open files，也就是列举系统中已经被打开的文件。 |
| **mail**       | 发送和接收邮件。                                         |
| **mutt**       | 邮件管理命令。                                           |
| **nslookup**   | 交互式查询互联网 DNS 服务器的命令。                      |
| **dig**        | 查找 DNS 解析过程。                                      |
| **host**       | 查询 DNS 的命令。                                        |
| **traceroute** | 追踪数据传输路由状况。                                   |
| **tcpdump**    | 命令行的抓包工具。                                       |

## 磁盘与文件系统

| **mount**     | 挂载文件系统。                                            |
| :------------ | :-------------------------------------------------------- |
| **umount**    | 卸载文件系统。                                            |
| **fsck**      | 检查并修复 Linux 文件系统。                               |
| **dd**        | 转换或复制文件。                                          |
| **dumpe2fs**  | 导出 ext2/ext3/ext4 文件系统信息。                        |
| **dump**      | ext2/3/4 文件系统备份工具。                               |
| **fdisk**     | 磁盘分区命令，适用于 2TB 以下磁盘分区。                   |
| **parted**    | 磁盘分区命令，没有磁盘大小限制，常用于 2TB 以下磁盘分区。 |
| **mkfs**      | 格式化创建 Linux 文件系统。                               |
| **partprobe** | 更新内核的硬盘分区表信息。                                |
| **e2fsck**    | 检查 ext2/ext3/ext4 类型文件系统。                        |
| **mkswap**    | 创建 Linux 交换分区。                                     |
| **swapon**    | 启用交换分区。                                            |
| **swapoff**   | 关闭交换分区。                                            |
| **sync**      | 将内存缓冲区内的数据写入磁盘。                            |
| **resize2fs** | 调整 ext2/ext3/ext4 文件系统大小。                        |

## 系统权限及用户授权

| **chmod** | 改变文件或目录权限。         |
| :-------- | :--------------------------- |
| **chown** | 改变文件或目录的属主和属组。 |
| **chgrp** | 更改文件用户组。             |
| **umask** | 显示或设置权限掩码。         |

## 查看系统用户登陆信息

| **whoami**  | 显示当前有效的用户名称，相当于执行 id -un 命令。       |
| :---------- | :----------------------------------------------------- |
| **who**     | 显示目前登录系统的用户信息。                           |
| **w**       | 显示已经登陆系统的用户列表，并显示用户正在执行的指令。 |
| **last**    | 显示登入系统的用户。                                   |
| **lastlog** | 显示系统中所有用户最近一次登录信息。                   |
| **users**   | 显示当前登录系统的所有用户的用户列表。                 |
| **finger**  | 查找并显示用户信息。                                   |

## 内置命令及其它

| **echo**    | 打印变量，或直接输出指定的字符串                       |
| :---------- | :----------------------------------------------------- |
| **printf**  | 将结果格式化输出到标准输出。                           |
| **rpm**     | 管理 rpm 包的命令。                                    |
| **yum**     | 自动化简单化地管理 rpm 包的命令。                      |
| **watch**   | 周期性的执行给定的命令，并将命令的输出以全屏方式显示。 |
| **alias**   | 设置系统别名。                                         |
| **unalias** | 取消系统别名。                                         |
| **date**    | 查看或设置系统时间。                                   |
| **clear**   | 清除屏幕，简称清屏。                                   |
| **history** | 查看命令执行的历史纪录。                               |
| **eject**   | 弹出光驱。                                             |
| **time**    | 计算命令执行时间。                                     |
| **nc**      | 功能强大的网络工具。                                   |
| **xargs**   | 将标准输入转换成命令行参数。                           |
| **exec**    | 调用并执行指令的命令。                                 |
| **export**  | 设置或者显示环境变量。                                 |
| **unset**   | 删除变量或函数。                                       |
| **type**    | 用于判断另外一个命令是否是内置命令。                   |
| **bc**      | 命令行科学计算器                                       |

## 系统管理与性能监视

| **chkconfig** | 管理 Linux 系统开机启动项。                                  |
| :------------ | :----------------------------------------------------------- |
| **vmstat**    | 虚拟内存统计。                                               |
| **mpstat**    | 显示各个可用 CPU 的状态统计。                                |
| **iostat**    | 统计系统 IO。                                                |
| **sar**       | 全面地获取系统的 CPU、运行队列、磁盘 I/O、分页（交换区）、内存、 CPU 中断和网络等性能数据。 |
| **ipcs**      | 用于报告 Linux 中进程间通信设施的状态，显示的信息包括消息列表、共享内存和信号量的信息。 |
| **ipcrm**     | 用来删除一个或更多的消息队列、信号量集或者共享内存标识。     |
| **strace**    | 用于诊断、调试 Linux 用户空间跟踪器。我们用它来监控用户空间进程和内核的交互，比如系统调用、信号传递、进程状态变更等。 |
| **ltrace**    | 命令会跟踪进程的库函数调用, 它会显现出哪个库函数被调用。     |

## 关机 / 重启 / 注销和查看信息

| **shutdown** | 关机。                          |
| :----------- | :------------------------------ |
| **halt**     | 关机。                          |
| **poweroff** | 关闭电源。                      |
| **logout**   | 退出当前登录的 Shell。          |
| **exit**     | 退出当前登录的 Shell。          |
| **Ctrl+d**   | 退出当前登录的 Shell 的快捷键。 |

## 进程管理

| **bg**          | 将一个在后台暂停的命令，变成继续执行 （在后台执行）。        |
| :-------------- | :----------------------------------------------------------- |
| **fg**          | 将后台中的命令调至前台继续运行。                             |
| **jobs**        | 查看当前有多少在后台运行的命令。                             |
| **kill**        | 终止进程。                                                   |
| **killall**     | 通过进程名终止进程。                                         |
| **pkill**       | 通过进程名终止进程。                                         |
| **crontab**     | 定时任务命令。                                               |
| **ps**          | 显示进程的快照。                                             |
| **pstree**      | 树形显示进程。                                               |
| **nice/renice** | 调整程序运行的优先级。                                       |
| **nohup**       | 忽略挂起信号运行指定的命令。                                 |
| **pgrep**       | 查找匹配条件的进程。                                         |
| **runlevel**    | 查看系统当前运行级别。                                       |
| **init**        | 切换运行级别。                                               |
| **service**     | 启动、停止、重新启动和关闭系统服务，还可以显示所有系统服务的当前状态。 |

# 后台运行任务

## 问题的引入

> 程序员最不能容忍的是在使用终端的时候往往因为网络，关闭屏幕，执行CTRL+C等原因造成ssh断开造成正在运行程序退出，使得我们的工作功亏一篑。

> 其背后的主要原因在于上述的相关操作，shell默认会发送中断信号给该终端session关联的进程，从而导致进程跟随终端退出，为了弄清这个问题我们首先要了解两种中断信号：

> 1）sigint：signal interrupt，ctrl+c会发送此信号，主动关闭程序
>
> 2）sighup: signal hang up，关闭终端，网络断线，关闭屏幕会发送此挂断信号。

今天就给大家介绍linux中几种后台任务的执行方法避免上述问题。

## & 符号

> 这是一种把 &放在执行命令最后，使启动的程序忽略sigint信号,此时执行ctrl+c关闭就不会关闭此进程，但是当屏幕关闭，断网仍然会造成进程退出。

```
sh test.sh &
```

## nohup指令

> nohup（no hang up）,意思就是不挂断运行，用nohup运行命令可以使命令永久执行下去，和用户终端没有关系，断开SSH不影响运行，nohup捕获了SIGHUP，并做了忽略处理，因此当屏幕关闭，断网等造成ssh中断时进程不会退出。但是ctrl+c可以关闭关闭该进程。因此大多数情况同时使用nohup和&启动的程序，ctrl+c和关闭终端都无法关闭。在缺省情况下所有输出都被重定向到一个名为nohup.out的文件

nohup指令基本使用格式：

```
nohup Command \[ Arg ... \] \[ & \]
```

后台不中断执行./test.sh,stdout输出给out.log，stderr输出给err.log

```
nohup ./test.sh > out.log 2>err.log  &
```

相关的数字含义如下：

- 0 – stdin (standard input)，
- 1 – stdout (standard output),显然 nohup command > out.log 等价于 nohup command 1> out.log
- 2 – stderr (standard error)

可能你也会见到这种写法，其含义是把stderr也重定向给stdin

```
nohup ./test.sh > out.log 2>&1  &
```

## ctrl + z、jobs、fg、bg

> 如果我们程序在启动的时候并没有使用&，nohup怎么办呢，难道我们需要先执行ctrl + c将在前台执行的进程终止执行再重新启动吗，显然有好的方法！

### ctrl + z

将一个正在前台执行的作业进程放到后台，并且暂停，用术语讲就是挂起,执行后如下：

```
[1]+ Stopped ./test.sh
```

### jobs

查看当前有多少在后台运行的命令,[jobnumber] 就是作业号。

```
jobs  
[1]+ Stopped ./test.sh   
[2]+ Running ./test2.sh &
```

### bg

将后台中暂停（挂起）的作业进程继续运行,例如把1号作业(./test.sh) 放到后台运行，注意看已经带了&

```
bg 1  

[1]+ ./test.sh  &
```

### fg

将后台中的作业进程调至前台继续运行,例如把2号作业（./test2.sh &）调至前台运行

```
fg 2   

./test2.sh
```

## screen命令

### 介绍

> 如果说上面的方法是通过linux 相关本身命令实现了前后台任务调度，那么screen就提供了另外一种思路。

> 不说人话的版本：GNU Screen是一款由GNU计划开发的用于命令行终端切换的自由软件。用户可以通过该软件同时连接多个本地或远程的命令行会话，并在其间自由切换。GNU Screen可以看作是窗口管理器的命令行界面版本。它提供了统一的管理多个会话的界面和相应的功能。

> 说人话的版本: 我们可以粗略地认为screen是一个虚拟终端软件，直接在linux系统里面启动了另外一个后台程序接管（维持）了你的终端会话，当你直接连接的终端ssh断开时他仍然让程序认为你的ssh持续链接着，这样也就不会出现进程接收到中断信号而退出。

### 安装

```
yum install screen
```

### 使用

1）新建会话

```
screen -S yourname -> 新建一个叫yourname的session
```

2） 列出当前所有的session

```
screen -ls
```

3）恢复会话（回到yourname这个session）

```
screen -r yourname
```

4） detach某个session

```
screen -d yourname -> 远程detach某个session 
screen -d -r yourname -> 结束当前session并回到yourname这个session
```

5）删除会话

```
screen -S pid-X quit
```

# 别再用kill -9关闭程序了

> “
>
> kill 可将指定的信息送至程序。预设的信息为 SIGTERM(15)，可将指定程序终止。若仍无法终止该程序，可使用 SIGKILL(9) 信息尝试强制删除程序。程序或工作的编号可利用 ps 指令或 jobs 指令查看。

### kill -9 pid ???

讲的这个复杂，简单点来说就是用来杀死 Linux 中的进程，啥？你问我啥是进程？请自行百度。

我相信很多人都用过 kill -9 pid 这个命令，彻底杀死进程的意思，一般情况我们使用它没有上面问题，但是在我们项目中使用它就有可能存在致命的问题。

### kill -9 pid 带来的问题

由于kill -9 属于暴力删除，所以会给程序带来比较严重的后果，那究竟会带来什么后果呢？

举个栗子：转账功能，再给两个账户进行加钱扣钱的时候突然断电了？这个时候会发生什么事情？

对于 InnoDB 存储引擎来说，没有什么损失，因为它支持事务，但是对于 MyISAM 引擎来说那简直就是灾难，为什么？

假如给 A 账户扣了钱，现在需要将 B 账户加钱，这个时候停电了，就会造成，A 的钱被扣了，但是 B 没有拿到这笔钱，这在生产环境是绝对不允许的，kill -9  相当于突然断电的效果。

当然了，像转账这种，肯定不是使用 MyISAM 引擎，但是如今分布式火了起来，跨服务转账已经是很平常的事情。

这种时候如果使用 kill -9 去停止服务，那就不是你的事务能保证数据的准确性了，这个时候你可能会想到分布式事务。

这个世界上没有绝对的安全系统或者架构，分布式事务也是一样，他也会存在问题，概率很小。

如果一旦发生，损失有可能是无法弥补的，所以一定不能使用 kill -9 去停止服务，因为你不知道他会造成什么后果。

在 MyISAM 引擎中表现的更明显，比如用户的信息由两张表维护，管理员修改用户信息的时候需要修改两张表。

但由于你的 kill -9 暴力结束项目，导致只修改成功了一张表，这也会导致数据的不一致性。

这是小事，因为大不了再修改一次，但是金钱、合同这些重要的信息如果由于你的暴力删除导致错乱，我觉得可能比删库跑路还严重，至少删库还能恢复，你这个都不知道错在哪里。

那我们应该怎么结束项目呢？其实 Java 给我们提供了结束项目的功能，比如：Tomcat 可以使用 shutdown.bat/shutdown.sh 进行优雅结束。

什么叫优雅结束？

- 第一步：停止接收请求和内部线程。
- 第二步：判断是否有线程正在执行。
- 第三步：等待正在执行的线程执行完毕。
- 第四步：停止容器。

以上四步才是正常的结束流程，那 SpringBoot 怎么正常结束服务呢？下面我介绍几种正常结束服务的方案，请拿好小本本做好笔记。

### 优雅结束服务

### ①kill -15 pid

这种方式也会比较优雅的结束进程（项目），使用他的时候需要慎重，为什么呢？

我们来看个例子，我写了一个普通的 controller 方法做测试：

```
@GetMapping(value = "/test")
    public String test(){
        log.info("test --- start");
        try {
            Thread.sleep(100000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        log.info("test --- end");
        return "test";
    }
```

代码很简单，打印：test — start 之后让让程序休眠 100 秒，然后再打印：test — end。

在线程休眠中我们使用 kill -15 pid 来结束这个进程，你们猜 test — end 会被打印吗？

application.yml：

```
server:  port: 9988
```

启动项目：

```
sudo mvn spring-boot:run
```

这是 maven 启动 SpringBoot 项目的方式：

![图片](https://mmbiz.qpic.cn/mmbiz_png/QFzRdz9libEaO7cicciaPtp3yI5mTqpl2TAn0iamSNcJvcJJmAeLqhnGicibaSUVm4ussicwK1KvicicXzJpQQwU4TsL3MQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

看到这个就代表项目启动成了，找到项目的进程 id：

```
sudo ps -ef |grep shutdown
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/QFzRdz9libEaO7cicciaPtp3yI5mTqpl2TA1GZJDzzsuR6oeVS3s9OftGIeScsHRWibOnJjgBxFF4rYUWhWVxTOJMw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这个就是项目的进程号，接下来我们先测试 test 接口，让线程进入休眠状态，然后再使用 kill -15 14086 停止项目：

```
sudo curl 127.0.0.1:9988/test
```

回到项目日志：

![图片](https://mmbiz.qpic.cn/mmbiz_png/QFzRdz9libEaO7cicciaPtp3yI5mTqpl2TAoXLic4J3QdU1VYpInBudPlNwtCDLckGIRiaJMZbLKkySzHhacbucFb7g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

我们发现请求已经到达服务，并且线程已经成功进入休眠，现在我们 kill -15 14086 结束进程：

```
sudo kill -15 14086
```

这就和 sleep 这个方法有关了，在线程休眠期间，当调用线程的 interrupt 方法的时候会导致 sleep 抛出异常。

这里很明显就是 kill -15 这个命令会让程序马上调用线程的 interrupt 方法，目的是为了让线程停止。

虽然让线程停止，但线程什么时候停止还是线程自己说的算，这就是为什么我们还能看到：test — end 的原因。

### ②ConfigurableApplicationContext colse

我们先看怎么实现：

```
package com.ymy.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class TestController  implements ApplicationContextAware {

    private  ApplicationContext  context;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.context = applicationContext;
    }


    @GetMapping(value = "/test")
    public String test(){
        log.info("test --- start");
        try {
            Thread.sleep(100000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        log.info("test --- end");
        return "test";
    }

    /**
     * 停机
     */
    @PostMapping(value = "shutdown")
    public void shutdown(){
        ConfigurableApplicationContext cyx = (ConfigurableApplicationContext) context;
        cyx.close();
    }
}
```

重点在：cyx.close(); 为什么他能停止 SpringBoot 项目呢？请看源码：

```
public void close() {
        synchronized(this.startupShutdownMonitor) {
            this.doClose();
            if (this.shutdownHook != null) {
                try {
                    Runtime.getRuntime().removeShutdownHook(this.shutdownHook);
                } catch (IllegalStateException var4) {
                }
            }

        }
    }
```

程序在启动的时候向 JVM 注册了一个关闭钩子，我们在执行 colse 方法的时候会删除这个关闭钩子，JVM 就会知道这是需要停止服务。

我们看测试结果：

![图片](https://mmbiz.qpic.cn/mmbiz_png/QFzRdz9libEaO7cicciaPtp3yI5mTqpl2TAolwibmFk2p5o5czMibJ0f4af5WPFdXEMxz9VLq2ZUXukDtWMEbhR2wPA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/QFzRdz9libEaO7cicciaPtp3yI5mTqpl2TAuD04d9egahMLicJynVyMqicic22W6UhyicQo4Bk5BV5Hx8fs32MtxWFHvw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

很明显，他也出发了线程的 interrupt 方法导致线程报错，原理和 kill -15 差不多。

### ③actuator

这种方式是通过引入依赖的方式停止服务，actuator 提供了很多接口，比如健康检查，基本信息等等，我们也可以使用他来优雅的停机。

引入依赖：

```
<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

application.yml：

```
server:
  port: 9988

management:
  endpoints:
    web:
      exposure:
        include: shutdown
  endpoint:
    shutdown:
      enabled: true
  server:
    port: 8888
```

我这里对 actuator 的接口重新给定了一个接口，这样可提高安全性，下面我们来测试一下：

```
@RequestMapping(value = "/test",method = RequestMethod.GET)
    public String test(){
        System.out.println("test --- start");
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("test --- end");
        return "hello";
    }
```

在请求 test 途中停止服务：

![图片](https://mmbiz.qpic.cn/mmbiz_png/QFzRdz9libEaO7cicciaPtp3yI5mTqpl2TAEfXQIw8cPcxddicKicXusl4icxYzjSAzSEMVOy6pAmyib85fuacIdur48w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

我们发现发送停止服务请求之后还给我们返回了提示信息，很人性化，我们看看控制台：

![图片](https://mmbiz.qpic.cn/mmbiz_png/QFzRdz9libEaO7cicciaPtp3yI5mTqpl2TAHfpQDeNuamgvnHUUe0WC4zdZWPVoGw28jA4lUMjViaPVNZyC1kfFjZw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/QFzRdz9libEaO7cicciaPtp3yI5mTqpl2TA3rlsoRNJpGLZNPleKTlTGWymbibKt9hP92JTnA514ibeZA2UnAIvdyibg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

test — end 被执行了，不过在停止线程池的时候还是调用了线程的 interrupt 方法，导致 sleep 报错，这三种方式都可以比较优雅的停止 SpringBoot 服务。

如果我项目中存在线程休眠，我希望 10 秒以后再停止服务可以吗？肯定是可以的，我们只需要稍微做点修改就可以了。

新增停止 SpringBoot 服务类：ElegantShutdownConfig.java。

```
package com.ymy.config;

import org.apache.catalina.connector.Connector;
import org.springframework.boot.web.embedded.tomcat.TomcatConnectorCustomizer;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextClosedEvent;

import java.util.concurrent.Executor;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class ElegantShutdownConfig implements TomcatConnectorCustomizer, ApplicationListener<ContextClosedEvent> {

    private volatile Connector connector;
    private final int waitTime = 10;

    @Override
    public void customize(Connector connector) {
        this.connector = connector;
    }

    @Override
    public void onApplicationEvent(ContextClosedEvent event) {
        connector.pause();
        Executor executor = connector.getProtocolHandler().getExecutor();
        if (executor instanceof ThreadPoolExecutor) {
            try {
                ThreadPoolExecutor threadPoolExecutor = (ThreadPoolExecutor) executor;
                threadPoolExecutor.shutdown();
                if (!threadPoolExecutor.awaitTermination(waitTime, TimeUnit.SECONDS)) {
                    System.out.println("请尝试暴力关闭");
                }
            } catch (InterruptedException ex) {
                System.out.println("异常了");
                Thread.currentThread().interrupt();
            }
        }

    }
}
```

在启动类中加入 bean：

```
package com.ymy;

import com.ymy.config.ElegantShutdownConfig;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.connector.Connector;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatConnectorCustomizer;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.ContextClosedEvent;

import java.util.concurrent.Executor;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

@SpringBootApplication
public class ShutdownServerApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext run = SpringApplication.run(ShutdownServerApplication.class, args);
        run.registerShutdownHook();
    }


    @Bean
    public ElegantShutdownConfig elegantShutdownConfig() {
        return new ElegantShutdownConfig();
    }

    @Bean
    public ServletWebServerFactory servletContainer() {
        TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory();
        tomcat.addConnectorCustomizers(elegantShutdownConfig());
        return tomcat;
    }
}
```

这样我们就配置好了，我们再来测试一遍，test 的接口还是休眠 10 秒：

![图片](https://mmbiz.qpic.cn/mmbiz_png/QFzRdz9libEaO7cicciaPtp3yI5mTqpl2TAPEfGQBTib3oAoUsNBEavp6Yx2lq6MkDicVyuicfSDVf1tHnzDLg6thnCA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

我们发现这次没有报错了，他是等待了一段时间之后再结束的线程池，这个时间就是我们在 ElegantShutdownConfig 类中配置的 waitTime。

那可能你会有疑问了，JVM 没有立即停止，那这个时候在有请求会发生什么呢？如果关闭的时候有新的请求，服务将不在接收此请求。

### 数据备份操作

如果我想在服务停止的时候做点备份操作啥的，应该怎么做呢？其实很简单在你要执行的方法上添加一个注解即可：@PreDestroy。

- Destroy：消灭、毁灭。
- pre：前缀缩写。

所以合在一起的意思就是在容器停止之前执行一次，你可以在这里面做备份操作，也可以做记录停机时间等。

新增服务停止备份工具类：DataBackupConfig.java。

```
package com.ymy.config;

import org.springframework.context.annotation.Configuration;

import javax.annotation.PreDestroy;

@Configuration
public class DataBackupConfig {

    @PreDestroy
    public  void backData(){

        System.out.println("正在备份数据。。。。。。。。。。。");
    }
}
```

我们再来测试然后打印控制台日志：

![图片](https://mmbiz.qpic.cn/mmbiz_png/QFzRdz9libEaO7cicciaPtp3yI5mTqpl2TAZP0wVm99mPyMekuNHTo6a7RFfxrMtc52ViaMNiaFUxia270XoRJfXpKvQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)


![图片](https://mmbiz.qpic.cn/mmbiz_png/QFzRdz9libEaO7cicciaPtp3yI5mTqpl2TAzINT8epCK1s0QibY3GUib4V3xt2wddXH5lw639BCxFxziccIhEgJT1uFg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



# Linux服务器最大TCP连接

## 困惑很多人的并发问题

在网络开发中，我发现有很多同学对一个基础问题始终是没有彻底搞明白。那就是一台服务器最大究竟能支持多少个网络连接？我想我有必要单独发一篇文章来好好说一下这个问题。

> 很多同学看到这个问题的第一反应是65535。原因是：“听说端口号最多有65535个，那长连接就最多保持65535个了。”是这样的吗？还有的人说：“应该受TCP连接里四元组的空间大小限制，算起来是200多万亿个！”

如果你对这个问题也是理解得不够彻底，那么今天讲个故事讲给你听！

## 一次关于服务器端并发的聊天

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwoo5ibkEGbrfCkOXicTNTjPGxzv6h8iaQXTt7zGndbmn4sht6iasE6Y5LdW64ZAgdkxibTtah5qyGoMKqQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

> "TCP连接四元组是源IP地址、源端口、目的IP地址和目的端口。任意一个元素发生了改变，那么就代表的是一条完全不同的连接了。拿我的Nginx举例，它的端口是固定使用80。另外我的IP也是固定的，这样目的IP地址、目的端口都是固定的。剩下源IP地址、源端口是可变的。所以理论上我的Nginx上最多可以建立2的32次方（ip数）×2的16次方（port数）个连接。这是两百多万亿的一个大数字！！"

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwoo5ibkEGbrfCkOXicTNTjPGxzjVPBaZFsRWxsP4PT92osvJcEicb4giceBWX3pO37OnI6qCDiaeHZ63Pg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

> "进程每打开一个文件（linux下一切皆文件，包括socket），都会消耗一定的内存资源。如果有不怀好心的人启动一个进程来无限地创建和打开新的文件，会让服务器崩溃。所以linux系统出于安全角度的考虑，在多个位置都限制了可打开的文件描述符的数量，包括系统级、用户级、进程级。这三个限制的含义和修改方式如下："

- 系统级：当前系统可打开的最大数量，通过fs.file-max参数可修改
- 用户级：指定用户可打开的最大数量，修改/etc/security/limits.conf
- 进程级：单个进程可打开的最大数量，通过fs.nr_open参数可修改

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwoo5ibkEGbrfCkOXicTNTjPGxbO8LmdRkuWzWnGMGR2uG5luAtmDxb11XRjq17ntiasSHbwf5NEZf7hA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

> "我的接收缓存区大小是可以配置的，通过sysctl命令就可以查看。"

```
$ sysctl -a | grep rmem
net.ipv4.tcp_rmem = 4096 87380 8388608
net.core.rmem_default = 212992
net.core.rmem_max = 8388608
```

> "其中在tcp_rmem"中的第一个值是为你们的TCP连接所需分配的最少字节数。该值默认是4K，最大的话8MB之多。也就是说你们有数据发送的时候我需要至少为对应的socket再分配4K内存，甚至可能更大。"

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwoo5ibkEGbrfCkOXicTNTjPGxS9JZ4Rf3jw5Cic6k7yqkJuEn87oJahc7TO5wGkUBkh6P8YRTUFTINAA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

> "TCP分配发送缓存区的大小受参数net.ipv4.tcp_wmem配置影响。"

```
$ sysctl -a | grep wmem
net.ipv4.tcp_wmem = 4096 65536 8388608
net.core.wmem_default = 212992
net.core.wmem_max = 8388608
```

> "在net.ipv4.tcp_wmem"中的第一个值是发送缓存区的最小值，默认也是4K。当然了如果数据很大的话，该缓存区实际分配的也会比默认值大。"

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwoo5ibkEGbrfCkOXicTNTjPGxKBBZ0b8hQGzMib9I0Sw4MlFfgVqt5QSMZDgBTwFa9aeVXN1coEpGArQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 服务端百万连接达成记

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwoo5ibkEGbrfCkOXicTNTjPGxibQjHJpozOYHaYGiaD3txd4MmGXcDThW96z7oMbH9PlVaaC417GblyKA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

> “准备啥呢，还记得前面说过Linux对最大文件对象数量有限制，所以要想完成这个实验，得在用户级、系统级、进程级等位置把这个上限加大。我们实验目的是100W，这里都设置成110W，这个很重要！因为得保证做实验的时候其它基础命令例如ps，vi等是可用的。“

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwoo5ibkEGbrfCkOXicTNTjPGxVHMr5VAUIcFpS1P5bcUnAe9lGkkn8kd6hGAYl5w7h3x7EqV2qt4WDQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwoo5ibkEGbrfCkOXicTNTjPGxprMrmcJjPQc142jpJNg0piauyFgqn0ic4lwuK5Na8S7lk3NLENhEOxJA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

活动连接数量确实达到了100W：

```
$ ss -n | grep ESTAB | wc -l  
1000024
```

当前机器内存总共是3.9GB，其中内核Slab占用了3.2GB之多。MemFree和Buffers加起来也只剩下100多MB了：

```
$ cat /proc/meminfo
MemTotal:        3922956 kB
MemFree:           96652 kB
MemAvailable:       6448 kB
Buffers:           44396 kB
......
Slab:          3241244KB kB
```

通过slabtop命令可以查看到densty、flip、sock_inode_cache、TCP四个内核对象都分别有100W个：

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwoo5ibkEGbrfCkOXicTNTjPGxuw4Y9XO0IHuzkHBwnCFTSkJRvKYwlwibv1kvMibfPcEBaiaVDekMtXWYA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwoo5ibkEGbrfCkOXicTNTjPGxPkdoiaTrf5Sdzq4ibuIIB8mN5YqjlSPR1JLTmcIdss3RJqs7XnvNNmSA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



# Linux服务端最大并发数

## 开场白

在开始今天的文章之前，先抛一个面试题出来：

> 你接触过的单机最大并发数是多少？
> 你认为当前正常配置的服务器物理机最大并发数可以到多少？
> 说说你的理解和分析。

思考几分钟，如果你可以**有理有据地说出答案**，那确实就不用再往下看了，关上手机去陪陪家人是个不错的选择。

思考几分钟，如果你**没有头绪或者对答案不确定**，那么你先不用着急关闭页面去玩耍，你应该继续往下看，因为这个问题很不错。

![图片](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZibu6QZauU9zUcre7RvLf7icChfuS7diaTcxlfhqoDtywqvSBECicHuwjENAxfCMpsicykWGYMQ0keXKg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

对于后端开发人员来说，并发数往往和技术难度是呈正相关的，实际上也确实如此：**体量决定架构**。

服务端根据不同业务场景会有不同的侧重点，单纯追求高并发其实并不是根本目的，**高可用&稳定性更重要**。

所以最终我们的目的是：**保证高可用高稳定的基础上追求高并发，降本增效**。

高可用&高并发是我们直观感受到的，本质上这是个**复杂的系统工程**，每个环节都会影响结果，每一块都值得研究和深入。

<img src="https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZibu6QZauU9zUcre7RvLf7ic9xdUEcyPezq66oDWiaHc0Dewu9A48duaFMn2rt84n7PmWKg92ibcx7icA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:80%;" />

本文通过一道面试题切入，先描述了C10K和C10M问题，进而详细说明了客户端的最大访问数和服务端的最大并发数计算和原理，最后描述了NAT场景下的访问并发数。

> 虽然理论服务端并发数非常大，但是我们也没有必要觉得并发数高就厉害，服务复杂程度不一样，**切忌唯并发数来判断业务和开发者水平**。试想echo服务和订单交易服务显然是不一样的，我们**应该做的是在服务稳定和高可用的前提下去从缓存/网络/数据库等多个角度来优化提高性能**。

## C10K问题和C10M问题

在2000年初的时候，全球互联网的规模并不大，但是当时就已经提出了C10K问题，所谓**C10K就是单机1w并发问题**，虽然现在不觉得是个难题了，但是这在当初是很有远见和挑战的问题。

<img src="https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZibu6QZauU9zUcre7RvLf7icjWfXEVZu70MOQuhKiaANIRz8ytYhsJO20dXAeusiaNsYgjA2hCuV9HKA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

C10K问题最早由**Dan Kegel**发布于其个人站点，原文链接如下:

> **http://www.kegel.com/c10k.html**

相关资料显示Dan Kegel目前工作于**Google**，从1978年起开始接触计算机编程，是Winetricks和Crosstool的作者，大佬年轻时的照片：

![图片](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZibu6QZauU9zUcre7RvLf7ic5MjAZNctyPzKGYicZp4SUMUqILWVJ4FsM8Xrc7ZzaQL3Pk3GyLjUxNA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

Dan Kegel这篇文章阅读难度并不大，大白建议从事服务端开发或者对高性能网络开发有兴趣的读者尝试读一读。

在APUE第三版都没有提到epoll，所以**我们解决C10K问题的时间并不长**，其中IO复用epoll/kqueue/iocp等技术对于C10k问题的解决起到了非常重要的作用。

开源大神们基于epoll/kqueue等开发了诸如libevent/libuv等网络库，从而大幅提高了高并发网络的开发效率，对于C/C++程序员来说并不陌生。

![图片](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZibu6QZauU9zUcre7RvLf7icwrVRF3kSwvMdsge6KrdiaEQGVibzic7uBOZw851iclbQ2cm1tXssWpwuQw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这里简单提一下针对下一个10年的展望和挑战：**C10M问题**。

站在浪尖的那一批人早就开始思考**让单机达到1000w并发**，现在听起来感觉不可思议，但是要达到这个目标，除了硬件上的提升，更重要的是**对系统软件和协议栈的改造**。

![图片](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZibu6QZauU9zUcre7RvLf7icQlvML1DLvvwrULdzdjUqkpDwmWhmmKZNJ4picZX3mv5Mx06tt2zaU8Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

Errata Security的CEO Robert Graham在Shmoocon 2013大会上的演讲，大佬重要的观点是：

> **不要让OS内核执行所有繁重的任务：将数据包处理、内存管理、处理器调度等任务从内核转移到应用程序高效地完成，让诸如Linux这样的OS只处理控制层，数据层完全交给应用程序来处理。**

确实也是如此，**难道你不觉得Linux内核做了太多不该自己做的事情了吗**？

近几年出现的DPDK、PFRING、NETMAP等技术也是类似的思想，现在流行的协处理器+CPU的架构也是这样的：

![图片](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZibu6QZauU9zUcre7RvLf7icL04E6OJbCnpnibQ3BTYEpNs46Q3kpcSfMqK13x4duN69oR9gn2GV4Uw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 服务器最大并发数分析

前面提到的C10K和C10M问题都是围绕着提升服务器并发能力展开的，但是难免要问：**服务器最大的并发上限是多少**？

![图片](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZibu6QZauU9zUcre7RvLf7icib5m03SiayEibcsHCaYnVlb03af2JmDdEeGHA9JfEYHaxk4z3ARuxhNQA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 1 五元组

做过通信的盆友们一定听过**五元组**这个概念，一个五元组可以唯一标记一个网络连接，所以要理解和分析最大并发数，就必须理解五元组：

![图片](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZibu6QZauU9zUcre7RvLf7icnBd55Fem053fREQZ1wOzr4wviaBYrs3sjxtiaOd7WznhA7JnjZ1RSGkA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这样的话，就可以基本认为：**理论最大并发数 = 服务端唯一五元组数**。

### 2 端口&IP组合数

那么对于服务器来说，服务端唯一五元组数最大是多少呢？

**有人说是65535**，显然不是，但是之所以会有这类答案是因为当前Linux的端口号是2字节大小的short类型，总计2^16个端口，除去一些系统占用的端口，可用端口确实只剩下64000多了。

对于服务端本身来说，DestPort数量确实有限，假定有多张网卡，每个网卡绑定多个IP，**服务端的Port端口数和IP数的组合类型也是有限的**。

对于客户端来说，本身的端口和IP也是一样有限的，虽然这是个**组合问题**，但是数量还是有限的：

![图片](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZibu6QZauU9zUcre7RvLf7icNcicTDq68qlIoeZu5cINXz3EQIHGKUy4FaOVKUpC2UqdJAPeFVFInxw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 3 并发数理论极限

看了前面的端口&IP的组合数计算，好像并发数并不会特别大。

**错了，是真的会很大。**

分析一下，前面的计算都是针对单个服务器或者客户端的，但是**实际上每个服务器会应对全网的所有客户端**，那么从服务端看，源IP和源Port的数量是非常大的。

**理论上服务端可以接受的客户端IP是2^32(按照IPv4计算）,端口数是2^16，目前端口号仍然是16bit的，所有这个理论最大值是2^48**，果然很大！

![图片](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZibu6QZauU9zUcre7RvLf7icxJDaILeLKoAdBa4t7AK4w5h0eF9OITKyrZFnDRtLRkibKBUGIcPw4tA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 4 实际情况

天下没有免费的午餐。

**每一条连接都是要消耗系统资源的**，所以实际中可能会设置最大并发数来保证服务器的安全和稳定，所以**这个理论最大并发数是不可能达到的**。

**实际中并发数和业务是直接相关的**，像Redis这种内存型的服务端并发十几万都是没问题的，大部分来讲几十/几百/几千/几万等是存在的。

## 客户端最大连接数 

理解了服务器的最大并发数是2^48，那么**客户端最多可以连接多少服务器呢**？

![图片](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZibu6QZauU9zUcre7RvLf7icrGoKbWnGGN6z6IavlPJMcMjzgWiaCJ3LTs1vz1ia1icT9zWjTJia1rhIFw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

对于客户端来说，当然可以借助于多网卡多IP来增加连接能力，我们仍然假定客户端只有1张网卡1个IP，由于端口数的限制到2^16，再去掉系统占用的端口，剩下可用的差不多64000。

![图片](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZibu6QZauU9zUcre7RvLf7icVMZ1MToDCeG3icPopDLezsuqkNuQicEewTqPk4dA7HTNmAEcGJiathRDw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

也就是说，客户端虽然可以连接任意的目的IP和目的端口，但是客户端自身端口是有限的，所以**客户端的理论最大连接数是2^16**，含系统占用端口。

## NAT环境下的客户端

解决前面的两个问题之后，来看另外一个问题：

> **一个公网出口NAT服务设备最多可同时支持多少内网IP并发访问外网服务？**

毕竟公网IP都是有限并且要花钱的，我们大部分机器都是在局域网中结合NAT来进行外网访问的，所以这个场景还是很熟悉的。来看下**内网机器访问外网时的IP&端口替换和映射还原的过程**，就明白了：

![图片](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZibu6QZauU9zUcre7RvLf7ic4vCCiaibz3fagWs7UsWxQWUjfc8HTb6jsSe00icoka7WPZAkeLM9au4lA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



因为这时的客户端是NAT设备，所以NAT环境下最多支持65535个并发访问外网。



# Linux 中 CPU 利用率是如何算出来的

在线上服务器观察线上服务运行状态的时候，绝大多数人都是喜欢先用 top 命令看看当前系统的整体 cpu 利用率。例如，随手拿来的一台机器，top 命令显示的利用率信息如下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwqH85vreK5IDjV8DfNTUBfBZJ1IO0dcFhWIEp35apYI01n9TcDUdRxdJRtgZ5EO9A6iaoBykIBMslg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这个输出结果说简单也简单，说复杂也不是那么容易就能全部搞明白的。例如：

问题 1：top 输出的利用率信息是如何计算出来的，它精确吗？
问题 2：ni 这一列是 nice，它输出的是 cpu 在处理啥时的开销？
问题 3：wa 代表的是 io wait，那么这段时间中 cpu 到底是忙碌还是空闲？

今天我们对 cpu 利用率统计进行深入的学习。通过今天的学习，你不但能了解 cpu 利用率统计实现细节，还能对 nice、io wait 等指标有更深入的理解。今天我们先从自己的思考开始！

## 先思考一下

抛开 Linux 的实现先不谈，如果有如下需求，有一个四核服务器，上面跑了四个进程。

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwqH85vreK5IDjV8DfNTUBfBbGAnytO2s1NhVwAv5FEXGtZoJeCTejMCM4LXDGsEgSdG2TNzjthVJQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

让你来设计计算整个系统 cpu 利用率的这个需求，支持像 top 命令这样的输出，满足以下要求：

- cpu 使用率要尽可能地准确；
- 要尽可能地体现秒级瞬时 cpu 状态。

可以先停下来思考几分钟。

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwqH85vreK5IDjV8DfNTUBfB6u7zIo27yQNKJThIJr1v4DMSDojdUOcIMWF4VRczayrEtvib24uTCfQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

好，思考结束。经过思考你会发现，这个看起来很简单的需求，实际还是有点小复杂的。

其中一个思路是把所有进程的执行时间都加起来，然后再除以系统执行总时间*4。

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwqH85vreK5IDjV8DfNTUBfBYf5lcGdFEETunSkXRMACwGG4UORpqb9KjVV9NDHzPpTN5diah1gXibHw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这个思路是没问题的，用这种方法统计很长一段时间内的 cpu 利用率是可以的，统计也足够的准确。

但只要用过 top 你就知道 top 输出的 cpu 利用率并不是长时间不变的，而是默认 3 秒为单位会动态更新一下（这个时间间隔可以使用 -d 设置）。我们的这个方案体现总利用率可以，体现这种瞬时的状态就难办了。你可能会想到那我也 3 秒算一次不就行了？但这个 3 秒的时间从哪个点开始呢。粒度很不好控制。

上一个思路问题核心就是如何解决瞬时问题。提到瞬时状态，你可能就又来思路了。那我就用瞬时采样去看，看看当前有几个核在忙。四个核中如果有两个核在忙，那利用率就是 50%。

这个思路思考的方向也是正确的，但是问题有两个：

- 你算出的数字都是 25% 的整数倍；
- 这个瞬时值会导致 cpu 使用率显示的剧烈震荡。

比如下图：

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwqH85vreK5IDjV8DfNTUBfB5FlNsUpWn5TUeAWuJLfGLwq8zx9NFcUvSib6oxDLQMvvs8VKYLlogog/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

在 t1 的瞬时状态看来，系统的 cpu 利用率毫无疑问就是 100%，但在 t2 时间看来，使用率又变成 0% 了。思路方向是对的，但显然这种粗暴的计算无法像 top 命令一样优雅地工作。

我们再改进一下它，把上面两个思路结合起来，可能就能解决我们的问题了。在采样上，我们把周期定得细一些，但在计算上我们把周期定得粗一些。

我们引入采用周期的概念，定时比如每 1 毫秒采样一次。如果采样的瞬时，cpu 在运行，就将这 1 ms 记录为使用。这时会得出一个瞬时的 cpu 使用率，把它都存起来。

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwqH85vreK5IDjV8DfNTUBfBictzQPdfGp0Jicl0VmiaVx0KkuM9ufzYicLGiaWMCnxYSBnzZUcyqnSWN1A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

在统计 3 秒内的 cpu 使用率的时候，比如上图中的 t1 和 t2 这段时间范围。那就把这段时间内的所有瞬时值全加一下，取个平均值。这样就能解决上面的问题了，统计相对准确，避免了瞬时值剧烈震荡且粒度过粗（只能以 25% 为单位变化）的问题了。

可能有同学会问了，假如 cpu 在两次采样中间发生变化了呢，如下图这种情况。

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwqH85vreK5IDjV8DfNTUBfBn2Sm8MoDSicsHEOficN0WibQQwl1zaibcpcKMjuTR6aTM8O2L3Sm30hfFw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

在当前采样点到来的时候，进程 A 其实刚执行完，有一点点时间既没被上一个采样点统计到，本次也统计不到。对于进程 B，其实只开始了一小段时间，把 1 ms 全记上似乎有点多记了。

确实会存在这个问题，但因为我们的采样是 1 ms 一次，而我们实际查看使用的时候最少也是秒级别地用，会包括有成千上万个采样点的信息，所以这种误差并不会影响我们对全局的把握。

事实上，Linux 也就是这样来统计系统 cpu 利用率的。虽然可能会有误差，但作为一项统计数据使用已经是足够了的。在实现上，Linux 是将所有的瞬时值都累加到某一个数据上的，而不是真的存了很多份的瞬时数据。

接下来就让我们进入 Linux 来查看它对系统 cpu 利用率统计的具体实现。

## top 命令使用数据在哪儿

上一节我们说的 Linux 在实现上是将瞬时值都累加到某一个数据上的，这个值是内核通过 /proc/stat 伪文件来对用户态暴露。Linux 在计算系统 cpu 利用率的时候用的就是它。

整体上看，top 命令工作的内部细节如下图所示。

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwqH85vreK5IDjV8DfNTUBfBhHebNVZKmVicHjKjmVLj9AuQzgHEpZykq25GjJLfZlVZhX1JTGnX0DQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- top 命令访问 /proc/stat 获取各项 cpu 利用率使用值；
- 内核调用 stat_open 函数来处理对 /proc/stat 的访问；
- 内核访问的数据来源于 kernel_cpustat 数组，并汇总；
- 打印输出给用户态。

接下来我们把每一步都展开来详细看看。

通过使用 strace 跟踪 top 命令的各种系统调用，可以看到它对该文件的调用。

```
# strace top
...
openat(AT_FDCWD, "/proc/stat", O_RDONLY) = 4
openat(AT_FDCWD, "/proc/2351514/stat", O_RDONLY) = 8
openat(AT_FDCWD, "/proc/2393539/stat", O_RDONLY) = 8
...
```

> 除了 /proc/stat 外，还有各个进程细分的 /proc/{pid}/stat，是用来计算各个进程的 cpu 利用率时使用的。

内核为各个伪文件都定义了处理函数，/proc/stat 文件的处理方法是 proc_stat_operations。

```
//file:fs/proc/stat.c
static int __init proc_stat_init(void)
{
 proc_create("stat", 0, NULL, &proc_stat_operations);
 return 0;
}

static const struct file_operations proc_stat_operations = {
 .open  = stat_open,
 ...
};
```

proc_stat_operations 中包含了该文件对应的操作方法。当打开 /proc/stat 文件的时候，stat_open 就会被调用到。stat_open 依次调用 single_open_size，show_stat 来输出数据内容。我们来看看它的代码：

```
//file:fs/proc/stat.c
static int show_stat(struct seq_file *p, void *v)
{
 u64 user, nice, system, idle, iowait, irq, softirq, steal;

 for_each_possible_cpu(i) {
  struct kernel_cpustat *kcs = &kcpustat_cpu(i);

  user += kcs->cpustat[CPUTIME_USER];
  nice += kcs->cpustat[CPUTIME_NICE];
  system += kcs->cpustat[CPUTIME_SYSTEM];
  idle += get_idle_time(kcs, i);
  iowait += get_iowait_time(kcs, i);
  irq += kcs->cpustat[CPUTIME_IRQ];
  softirq += kcs->cpustat[CPUTIME_SOFTIRQ];
  ...
 }

 //转换成节拍数并打印出来
 seq_put_decimal_ull(p, "cpu  ", nsec_to_clock_t(user));
 seq_put_decimal_ull(p, " ", nsec_to_clock_t(nice));
 seq_put_decimal_ull(p, " ", nsec_to_clock_t(system));
 seq_put_decimal_ull(p, " ", nsec_to_clock_t(idle));
 seq_put_decimal_ull(p, " ", nsec_to_clock_t(iowait));
 seq_put_decimal_ull(p, " ", nsec_to_clock_t(irq));
 seq_put_decimal_ull(p, " ", nsec_to_clock_t(softirq));
 ...
}
```

在上面的代码中，for_each_possible_cpu 是在遍历存储着 cpu 使用率数据的 kcpustat_cpu 变量。该变量是一个 percpu 变量，它为每一个逻辑核都准备了一个数组元素。里面存储着当前核所对应各种事件，包括 user、nice、system、idel、iowait、irq、softirq 等。

在这个循环中，将每一个核的每种使用率都加起来。最后通过 seq_put_decimal_ull 将这些数据输出出来。

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwqH85vreK5IDjV8DfNTUBfBkVQhRkt2A4DKdA2dcJicchB1ObdAhF51JP9nMvdJriba6zUibOUom4ib3g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

注意，在内核中实际每个时间记录的是纳秒数，但是在输出的时候统一都转化成了节拍单位。至于节拍单位多长，下一节我们介绍。总之， /proc/stat 的输出是从 kernel_cpustat 这个 percpu 变量中读取出来的。

我们接着再看看这个变量中的数据是何时加进来的。

## 统计数据怎么来的

前面我们提到内核是以采样的方式来统计 cpu 使用率的。这个采样周期依赖的是 Linux 时间子系统中的定时器。

Linux 内核每隔固定周期会发出 timer interrupt (IRQ 0)，这有点像乐谱中的节拍的概念。每隔一段时间，就打出一个拍子，Linux 就响应之并处理一些事情。

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwqH85vreK5IDjV8DfNTUBfBakoDoNlRZQXW5morqWDu4Kib7M0o03o0L0v8eNWmWeplBmn64WGaI7A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

一个节拍的长度是多长时间，是通过 CONFIG_HZ 来定义的。它定义的方式是每一秒有几次 timer interrupts。不同的系统中这个节拍的大小可能不同，通常在 1 ms 到 10 ms 之间。可以在自己的 Linux config 文件中找到它的配置。

```
# grep ^CONFIG_HZ /boot/config-5.4.56.bsk.10-amd64
CONFIG_HZ=1000
```

从上述结果中可以看出，我的机器每秒要打出 1000 次节拍。也就是每 1 ms 一次。

每次当时间中断到来的时候，都会调用 update_process_times 来更新系统时间。更新后的时间都存储在我们前面提到的 percpu 变量 kcpustat_cpu 中。

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwqH85vreK5IDjV8DfNTUBfBiaiam2nPqwT9BeHxibXdDxIS7dhSwhTtQluE9JxHKuT6nTz2CujOZX5Dw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

我们来详细看下汇总过程 update_process_times 的源码，它位于 kernel/time/timer.c 文件中。

```
//file:kernel/time/timer.c
void update_process_times(int user_tick)
{
 struct task_struct *p = current;

 //进行时间累积处理
 account_process_tick(p, user_tick);
 ...
}
```

这个函数的参数 user_tick 指的是采样的瞬间是处于内核态还是用户态。接下来调用 account_process_tick。

```
//file:kernel/sched/cputime.c
void account_process_tick(struct task_struct *p, int user_tick)
{
 cputime = TICK_NSEC;
 ...

 if (user_tick)
  //3.1 统计用户态时间
  account_user_time(p, cputime);
 else if ((p != rq->idle) || (irq_count() != HARDIRQ_OFFSET))
  //3.2 统计内核态时间
  account_system_time(p, HARDIRQ_OFFSET, cputime);
 else
  //3.3 统计空闲时间
  account_idle_time(cputime);
}
```

在这个函数中，首先设置 `cputime = TICK_NSEC`, 一个 TICK_NSEC 的定义是一个节拍所占的纳秒数。接下来根据判断结果分别执行 account_user_time、account_system_time 和 account_idle_time 来统计用户态、内核态和空闲时间。

### 用户态时间统计

```
//file:kernel/sched/cputime.c
void account_user_time(struct task_struct *p, u64 cputime)
{
 //分两种种情况统计用户态 CPU 的使用情况
 int index;
 index = (task_nice(p) > 0) ? CPUTIME_NICE : CPUTIME_USER;

 //将时间累积到 /proc/stat 中
 task_group_account_field(p, index, cputime);
 ......
}
```

account_user_time 函数主要分两种情况统计：

- 如果进程的 nice 值大于 0，那么将会增加到 CPU 统计结构的 nice 字段中。
- 如果进程的 nice 值小于等于 0，那么增加到 CPU 统计结构的 user 字段中。

看到这里，开篇的问题 2 就有答案了，其实用户态的时间不只是 user 字段，nice 也是。之所以要把 nice 分出来，是为了让 Linux 用户更一目了然地看到调过 nice 的进程所占的 cpu 周期有多少。

我们平时如果想要观察系统的用户态消耗的时间的话，应该是将 top 中输出的 user 和 nice 加起来一并考虑，而不是只看 user！

接着调用 task_group_account_field 来把时间加到前面我们用到的 kernel_cpustat 内核变量中。

```
//file:kernel/sched/cputime.c
static inline void task_group_account_field(struct task_struct *p, int index,
      u64 tmp)
{
 __this_cpu_add(kernel_cpustat.cpustat[index], tmp);
 ...
}
```

### 内核态时间统计

我们再来看内核态时间是如何统计的，找到 account_system_time 的代码。

```
//file:kernel/sched/cputime.c
void account_system_time(struct task_struct *p, int hardirq_offset, u64 cputime)
{
 if (hardirq_count() - hardirq_offset)
  index = CPUTIME_IRQ;
 else if (in_serving_softirq())
  index = CPUTIME_SOFTIRQ;
 else
  index = CPUTIME_SYSTEM;

 account_system_index_time(p, cputime, index);
}
```

内核态的时间主要分 3 种情况进行统计。

- 如果当前处于硬中断执行上下文, 那么统计到 irq 字段中；
- 如果当前处于软中断执行上下文, 那么统计到 softirq 字段中；
- 否则统计到 system 字段中。

判断好要加到哪个统计项中后，依次调用 account_system_index_time、task_group_account_field 来将这段时间加到内核变量 kernel_cpustat 中。

```
//file:kernel/sched/cputime.c
static inline void task_group_account_field(struct task_struct *p, int index,
      u64 tmp)
{ 
 __this_cpu_add(kernel_cpustat.cpustat[index], tmp);
}
```

### 空闲时间的累积

没错，在内核变量 kernel_cpustat 中不仅仅是统计了各种用户态、内核态的使用时间，空闲也一并统计起来了。

如果在采样的瞬间，cpu 既不在内核态也不在用户态的话，就将当前节拍的时间都累加到 idle 中。

```
//file:kernel/sched/cputime.c
void account_idle_time(u64 cputime)
{
 u64 *cpustat = kcpustat_this_cpu->cpustat;
 struct rq *rq = this_rq();

 if (atomic_read(&rq->nr_iowait) > 0)
  cpustat[CPUTIME_IOWAIT] += cputime;
 else
  cpustat[CPUTIME_IDLE] += cputime;
}
```

在 cpu 空闲的情况下，进一步判断当前是不是在等待 IO（例如磁盘 IO），如果是的话这段空闲时间会加到 iowait 中，否则就加到 idle 中。从这里，我们可以看到 iowait 其实是 cpu 的空闲时间，只不过是在等待 IO 完成而已。

看到这里，开篇问题 3 也有非常明确的答案了，io wait 其实是 cpu 在空闲状态的一项统计，只不过这种状态和 idle 的区别是 cpu 是因为等待 io 而空闲。

## 总结

本文深入分析了 Linux 统计系统 CPU 利用率的内部原理。全文的内容可以用如下一张图来汇总：

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwqH85vreK5IDjV8DfNTUBfB0Zy6wFfI2icK1DDq4CJaWpJA08QDibuXR6mSPib3GxfyAD3yONy9hgHyQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

Linux 中的定时器会以某个固定节拍，比如 1 ms 一次采样各个 cpu 核的使用情况，然后将当前节拍的所有时间都累加到 user/nice/system/irq/softirq/io_wait/idle 中的某一项上。

top 命令是读取的 /proc/stat 中输出的 cpu 各项利用率数据，而这个数据在内核中是根据 kernel_cpustat 来汇总并输出的。

回到开篇问题 1，top 输出的利用率信息是如何计算出来的，它精确吗？

/proc/stat 文件输出的是某个时间点的各个指标所占用的节拍数。如果想像 top 那样输出一个百分比，计算过程是分两个时间点 t1, t2 分别获取一下 stat 文件中的相关输出，然后经过个简单的算术运算便可以算出当前的 cpu 利用率。

再说是否精确。这个统计方法是采样的，只要是采样，肯定就不是百分之百精确。但由于我们查看 cpu 使用率的时候往往都是计算 1 秒甚至更长一段时间的使用情况，这其中会包含很多采样点，所以查看整体情况是问题不大的。

另外从本文，我们也学到了 top 中输出的 cpu 时间项目其实大致可以分为三类：

**第一类：**用户态消耗时间，包括 user 和 nice。如果想看用户态的消耗，要将 user 和 nice 加起来看才对。
**第二类：**内核态消耗时间，包括 irq、softirq 和 system。
**第三类：**空闲时间，包括 io_wait 和 idle。其中 io_wait 也是 cpu 的空闲状态，只不过是在等 io 完成而已。如果只是想看 cpu 到底有多闲，应该把 io_wait 和 idle 加起来才对。

# Linux系统负载

今天，我们来聊聊linux负载相关的参数和问题。我们经常会使用 `top` 命令来查看系统的性能情况，在 `top` 命令的第一行可以看到 `load average` 这个数据，如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202302271535882.png" alt="image-20230227153551772" style="zoom:67%;" />

`load average` 包含 3 列，分别表示 1 分钟、5 分钟和 15 分钟的 `系统平均负载`。

对于系统平均负载这个数值，可能很多同学并不完全理解其意义，并不知道数值达到多少时才表示系统负载过高。本文将会以简单的语言来介绍系统平均负载这个概念，并且会介绍 Linux 内核是怎么计算这个数值。

## 系统平均负载

> 《Understanding Linux CPU Load》这篇文章已经非常通俗的解释了什么是 `系统平均负载`，借用一下此文中例子

> 如果将 CPU 比作是桥梁，对于单核的 CPU 就好比是单车道的桥梁。每次桥梁只能让一辆汽车通过，并且要以规定的速度通过。那么：

> 如果每个时刻都只有一辆汽车通过，那么所有汽车都不用排队，此时桥梁的使用率最高。以平均负载 1.0 表示，如下图所示：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ciab8jTiab9J4s2b0yp6lH4YeiaFic9em4M9ssumcQLibIwYiachgAedqn0cMtjqMAv2ZzI1lwS2ibA6foPsJLicVicZhLg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

> 如果每隔一段时间才有一辆汽车通过，那么表示桥梁部分时间处于空闲的情况。并且间隔的时间越长，表示桥梁空闲率越高。此时的平均负载小于 1.0，如下图所示：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ciab8jTiab9J4s2b0yp6lH4YeiaFic9em4M9h7j3shQibHvHB7fGPTFmL9EKp8URZbnZicoK6icEiafBnVsvuFeof2JWdQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

> 当有大量的汽车通过桥梁时，有些汽车需要等待其他车辆通过后才能继续通行，这时表示桥梁超负荷工作。此时平均负载大于1.0，如下图所示：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ciab8jTiab9J4s2b0yp6lH4YeiaFic9em4M9hdRKCxMjwf8aa2GXD7ctpz6ibJs5TblR6FlttawNBEfmLA6E7LJfLxw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

系统的平均负载与上面的例子一样，在单核 CPU 的环境下：

> - 当平均负载等于 1.0 时，表示 CPU 使用率最高。
> - 当平均负载小于 1.0 时，表示 CPU 使用率处于空闲状态。
> - 当平均负载大于 1.0 时，表示 CPU 使用率已经超过负荷。

对于单核 CPU 来说，平均负载 1.0 表示使用率最高。但对于多核 CPU 来说，平均负载要乘以核心数。比如在 4 核 CPU 的系统中，当平均负载为 4.0 时，才表示 CPU 的使用率最高。

## Linux 平均负载计算原理

在介绍系统平均负载的计算原理前，先要介绍一下什么是系统负载。在 Linux 系统中，系统负载表示 **系统中当前正在运行的进程数量**，其包括 `可运行状态` 的进程数和 `不可中断休眠状态` 的进程数的和。注意：不可中断休眠状态的进程一般是在等待 I/O 完成的进程。

```
系统负载 = 可运行状态进程数 + 不可中断休眠状态进程数
```

知道了什么是 `系统负载`，那么 `系统平均负载` 就容易理解了。比如每 5 秒统计一次系统负载，1 分钟内会统计 12 次。如下所示：

```
第5秒  -> 系统负载
第10秒 -> 系统负载
第15秒 -> 系统负载
...
第60秒 -> 系统负载
```

然后把每次统计到的系统负载加起来，再除以统计次数，即可得出 `系统平均负载`。如下图所示：



![图片](https://mmbiz.qpic.cn/mmbiz_png/ciab8jTiab9J4s2b0yp6lH4YeiaFic9em4M9q6EoibS28TZqgSjxoZ03W3bklThxV8RpE7gicCsKFO8uTqPjnDwheLaA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

但这种计算方式有些缺陷，就是预测系统负载的准确性不够高，因为越老的数据越不能反映现在的情况。打个比方，要预测某条公路今天的车流量，使用昨天的数据作为预测依据，会比使用一个月之前的数据作为依据要准确得多。

**所以，时间越近的数据，对未来的预测准确性越高。**

Linux 内核使用一种名为 `指数平滑法` 的算法来解决这个问题，指数平滑法的核心思想是对新老数据进行加权，越老的数据权重越低。

> 指数平滑法：是由 Robert G..Brown 提出的一种加权移动平均法，有兴趣了解其数学原理的可以搜索相关资料，本文不作详细介绍。

其计算公式如下（来源于 Linux 内核代码 kernel/sched/core.c）：

```
load1 = load0 * e + active * (1 - e)
```

解释一下上面公式的意思：

- **load1**：表示时间 t + 1 的系统负载。
- **load0**：表示时间 t 的系统负载。
- **e**：表示衰减系数。
- **active**：表示系统中的活跃进程数（可运行状态进程数 + 不可中断休眠状态进程数）。

所以，我们就可以使用上面的公式来预测任何时间的系统平均负载了。比如，我们要预测时间点 n 的系统平均负载，那么可以这样来计算：

```
load1 = load0 * e + active * (1 - e)
load2 = load1 * e + active * (1 - e)
load3 = load2 * e + active * (1 - e)
...
loadn = loadn-1 * e + active * (1 - e)
```

现在就只剩下 `衰减系数` 该如何计算了。

从 Linux 内核的注释可以了解到，计算 1 分钟内系统平均负载的 `衰减系数` 的计算方式如下：

```
1 / exp(5sec / 1min)
```

其中：

- **5sec**：表示统计的时间间隔，5秒。
- **1min**：表示统计的时长，1分钟。
- **exp**：表示以自然常数 e 为底的指数函数。

也就是说，要计算一分钟的系统平均负载时，需要使用上面的 `衰减系数`。对于 5 分钟和 15 分钟的 `衰减系数` 的计算方式分别为：

```
1 / exp(5sec / 5min)
1 / exp(5sec / 15min)
```

Linux 内核已经把 1 分钟、5 分钟和 15 分钟的 `衰减系数` 结果计算出来，并且定义在 `include/linux/sched.h` 文件中，如下所示：

```
#define EXP_1       1884        /* 1/exp(5sec/1min) as fixed-point */
#define EXP_5       2014        /* 1/exp(5sec/5min) */
#define EXP_15      2037        /* 1/exp(5sec/15min) */
```

通过上述公式计算出来的 `衰减系数` 是个浮点数，而在内核中是不能进行浮点数运行的。解决方法是先对 `衰减系数` 进行扩大，然后在展示时最缩小。所以，上面的 `衰减系数` 数值是经过扩大 2048 倍后的结果。

## Linux 平均负载计算实现

**万事俱备，只欠东风**。上面我们已经把所有的知识点介绍了，现在来分析一下 Linux 内核代码是怎样实现的。

### 1. 数据存储

在 Linux 内核中，使用了 `avenrun` 数组来存储 1 分钟、5 分钟和 15 分钟的系统平均负载，如下代码所示：

```
unsigned long avenrun[3];
```

如元素 `avenrun[0]` 用于存储 1 分钟内的系统平均负载，而元素 `avenrun[1]` 用于存储 5 分钟的系统平均负载，如此类推。

### 2. 统计过程

由于统计需要定时进行，所以内核把统计过程放置到 `时钟中断` 中进行。当 `时钟中断` 触发时，将会调用 `do_timer()` 函数，而 `do_timer()` 函数将会调用 `calc_global_load()` 来统计系统平均负载。

我们来看看 `calc_global_load()` 函数的实现：

```c
void calc_global_load(unsigned long ticks)
{
    long active, delta;

    // 1. 如果还没到统计的时间间隔，那么将不进行统计（5秒统计一次）
    if (time_before(jiffies, calc_load_update + 10))
        return;

    // 2. 获取活跃进程数
    delta = calc_load_fold_idle();
    if (delta)
        atomic_long_add(delta, &calc_load_tasks);

    active = atomic_long_read(&calc_load_tasks);
    active = active > 0 ? active * FIXED_1 : 0;

    // 3. 统计各个时间段系统平均负载
    avenrun[0] = calc_load(avenrun[0], EXP_1, active);
    avenrun[1] = calc_load(avenrun[1], EXP_5, active);
    avenrun[2] = calc_load(avenrun[2], EXP_15, active);

    // 4. 更新下次统计的时间（增加5秒）
    calc_load_update += LOAD_FREQ;

    ...
}
```

`calc_global_load()` 函数主要完成 4 件事情：

1. 判断当前时间是否需要进行统计，如果还没到统计的时间间隔，那么将不进行统计（5秒统计一次）。
2. 获取活跃进程数（可运行状态进程数 + 不可中断休眠状态进程数）。
3. 统计各个时间段系统平均负载（1分钟、5分钟和15分钟）。
4. 更新下次统计的时间（增加5秒）。

从上面的分析可知，`calc_global_load()` 函数将会调用 `calc_load()` 来计算系统平均负载。其代码如下：

```c
/*
 * a1 = a0 * e + a * (1 - e)
 */
static unsigned long
calc_load(unsigned long load, unsigned long exp, unsigned long active)
{
    load *= exp;
    load += active * (FIXED_1 - exp);
    load += 1UL << (FSHIFT - 1);

    return load >> FSHIFT;
}
```

`calc_load()` 函数的各个参数意义如下：

- **load**：`t-1` 时间点的系统负载。
- **exp**：衰减系数。
- **active**：活跃进程数。

可以看出，`calc_load()` 函数的实现就是按照 `指数平滑法` 来计算的。

## 负载命令⭐

https://blog.csdn.net/junboliang/article/details/105819798

https://zhuanlan.zhihu.com/p/60066607

### stress

```sh
sudo yum install epel-release
sudo yum update
sudo yum install stress
```

模拟CPU负载：

```

stress --cpu 4 --timeout 60s
```

这会模拟4个CPU核心的负载，在60秒后停止。

模拟内存负载：

```
stress --vm 1 --vm-bytes 512M --timeout 60s
```

这会模拟使用512MB内存的虚拟机，持续60秒。

模拟IO负载：

```
stress --io 4 --timeout 60s
```

这会模拟4个IO操作，在60秒后停止。

模拟磁盘负载：

```
stress --hdd 1 --hdd-bytes 1G --timeout 60s
```

这会模拟写入1GB数据的磁盘操作，在60秒后停止。

### lookbusy

```sh
# 下载编译安装lookbusy
wget http://www.devin.com/lookbusy/download/lookbusy-1.4.tar.gz
tar -xzf lookbusy-1.4.tar.gz
cd lookbusy-1.4
./configure
make & make install
```

```sh
# 所有的cpu使用率都是30%
lookbusy -c 30
# 占用所有 CPU 核心各 70%
lookbusy -c 70 
# 占用两个 CPU 核心各 70%
lookbusy -c 70 -n 2 
# 占用所有 CPU 核心在 60%-70% 上下浮动
lookbusy -c 60-70 -r curve 
# cpu以60分钟为周期，30分钟是峰值，使用率在60%-70%上下浮动
lookbusy -c 60-70 --cpu-mode curve --cpu-curve-period 60m --cpu-curve-peak 30m 
```

### sysbench

[akopytov/sysbench：可编写脚本的数据库和系统性能基准测试 (github.com)](https://github.com/akopytov/sysbench)

#### 快速安装

Debian/Ubuntu

```
curl -s https://packagecloud.io/install/repositories/akopytov/sysbench/script.deb.sh | sudo bash
sudo apt -y install sysbench
```

RHEL/CentOS:

```
curl -s https://packagecloud.io/install/repositories/akopytov/sysbench/script.rpm.sh | sudo bash
sudo yum -y install sysbench
```

#### 测试概览

```sh
sysbench --help
sysbench --test=cpu help
sysbench --test=fileio help
sysbench --test=memory help
sysbench threads help
```

#### 测试CPU

```
sysbench cpu --cpu-max-prime=20000 --threads=2 run
```

#### 测试磁盘IO

```sh
sysbench --test=fileio --file-total-size=2G prepare
```

#### 测试MySQL数据库

准备测试数据：Sysbench需要一些测试数据来执行基准测试。你可以使用Sysbench提供的脚本生成测试数据。以下命令将生成4个包含10000行数据的表：执行完成就看到mysql中生成了对应表

```sh
# 重要参数：--mysql-db指定数据库，--table-size=10000每张表生成1万条数据
# 重要参数：--tables=4生成4张表，--threads=20，20个线程并发执行
sysbench oltp_read_write --mysql-host=127.0.0.1 --mysql-port=3306 --mysql-user=root --mysql-password=123456 --mysql-db=xuexi  --table-size=10000 --tables=4 --threads=20 prepare
```

执行基准测试：执行以下命令来运行基准测试：

```sh
# 重要参数：--threads=20，线程数，--time=10持续时间10s，--report-interval=3，3秒输出一次报告
# --percentile=99,在99%的情况下系统的性能水平
sysbench oltp_read_write --mysql-host=127.0.0.1 --mysql-port=3306 --mysql-user=root --mysql-password=123456 --mysql-db=xuexi --table-size=10000 --tables=4 --threads=20 --report-interval=3 --time=10 --percentile=99  run
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304291950602.png" alt="image-20230429195008464" style="zoom:80%;" />

清理测试数据：完成测试后，可以使用以下命令清理测试数据：

```sh
sysbench oltp_read_write --mysql-host=127.0.0.1 --mysql-port=3306 --mysql-user=root --mysql-password=123456 --mysql-db=xuexi --table-size=10000 --tables=4 --threads=10 cleanup
```



# 服务器优化⭐⭐

听多了架构优化，数据库优化，今天我们来聊聊服务器优化。

我们开发的软件服务需要在服务器上运行，所以服务器性能代表了软件的性能上限，因此服务器性能调优是个十分重要的环节，然而大部分同学对服务器性能调优关注的较少，今天从3个部分对服务器性能调优进行介绍，分别是：服务器配置选择，服务器负载分析，服务器内核参数调优。

## 服务器配置选择

服务器一般是由CPU、内存、磁盘和网卡组成，因此选择服务器配置就是选择CPU核数、内存大小、磁盘大小及类型、网络带宽。但是，服务器配置的选择是很难标准化的，也就是说很难推断出“一台需要达到1000TPS的后端服务器”的配置应该是什么样的。因为软件的最终运行性能与软件的实现方式是紧密相关的，即使是同一个后端应用程序中的两个接口，由于具体功能的差别，性能也会有所差别。

因此，服务器配置的选择应该基于具体的测试结果。一开始可以选用配置较低的服务器做调优和测试，并以该服务器的测试结果作为选择服务器的依据。

> 以一个订单业务为例，经过测试后，一台配置为4核 CPU 、16GB内存、10Mbps带宽、50GB机械磁盘的服务器的测试结果为：支持50并发量和300TPS吞吐量（增大并发量后会出现超时报错）。而在压力测试过程中， CPU 的使用率接近75%，内存使用率在 50％以下，带宽使用率在50％以下，除去日志以外无磁盘操作。

因此可以认为，一台配置为4核 CPU ( CPU 使用率需要在75％以下）、8GB内存（内存使用率可以接近100%)、 5Mbps 带宽（带宽使用率可以接近100%）的服务器，可以满足订单接口支持50并发量、300TPS吞吐量的压力。

> 如果需要达到200并发数、2400TPS吞吐量的目标的话，则需要8台配置为4核 CPU 、8GB内存、5Mbps带宽的服务器，或者1台配置为32核 CPU 、64GB内存、40Mbps带宽的服务器。当然，最终的服务器配置还是需要通过测试来验证。

> 注意：在以上订单接口的例子中，后端服务器和数据库等服务器需要一起调试，避免后端服务器性能过剩，而数据库等服务器性能不足的情况发生。另外，以上选择服务器配置的方法不一定适用于所有场景，请斟酌参考。

## 服务器内核参数调优

光有强大的物理性能是不够的，还需要对内核参数进行调优，这样才能在高并发压力下充分体现服务器应有的性能。当然，并不是所有的服务器都需要做高并发性能调优，一般来说，只需要对要处理高并发请求的服务器进行内核参数调优即可，常见的包括：前端服务器，后端服务器，数据库服务器。

服务器常见的调优参数主要有两个：单个进程最大打开文件数 和 TCP相关设置。

### 单个进程最大打开文件数

修改单个文件最大打开文件数，只需要编辑`/etc/security/limits.conf`文件，在文件末尾加上以下四句

```apl
* soft	nofile	65535
* hard	nofile	65535
* soft	nproc	65535
* hard	nproc	65535
```

其中`*` 代表所有用户，65536代表修改的值，重启后生效。

### TCP相关设置

修改TCP相关参数，可以优化TCP高并发通信，编辑`/etc/sysctl.conf`文件，添加以下内容

```apl
# 为防止洪水攻击，高并发系统需要将此项关闭
net.ipv4.tcp_syncookies = 0

# 开启TCP连接重用，允许处理TIME-WAIT状态的连接重新用于新的TCP连接
net.ipv4.tcp_tw_reuse = 1

# 开启快速回收TCP连接中处于TIME-WAIT状态的连接
net.ipv4.tcp_tw_recycle = 1

# 修改超时时间（ s )，该值表示如果连接由本端关闭，则连接处于 FIN-WAIT-2状态的时间为 
net.ipv4.tcp_fin_timeout = 30

# 当 keepalive（长连接）启用的时候，TCP发送 keepalive 消息（探测包）的时间间隔（ s ),默认为2个小时
net.ipv4.tcp_keepalive_time =1200

# 服务器对外连接的端口范围，影响该服务器与其他服务器的连接数
net.ipv4.ip_local_port_range =102465535

# SYN队列的长度，可以容纳更多等待连接的网络连接数，默认为1024 
net.ipv4.tcp_max_syn_backlog = 65535

#保持 TIME_WAIT 状态连接的最大数量，如果超过此值，TIME_WAIT 将立刻被清除并打印警告信息，默认为180000
net.ipv4.tcp_max_tw_buckets =5000

# 每个网络接口接收数据包的速率比内核处理这些包的速率快时，允许送到队列的数据包的最大数目
net.core.netdev_max_backlog =65535

# TCP最大连接数
net.core.somaxconn = 65535

# 预留用于接收缓冲的内存默认值（字节） 
net.core.rmem_default = 8388608

# 预留用于接收缓冲的内存最大值（字节） 
net.core.rmem_max = 16777216

# 预留用于发送缓冲的内存默认值（字节） 
net.core.wmem_default = 8388608

# 预留用于发送缓冲的内存最大值（字节） 
net.core.wmem_maX = 16777216

# 避免时间戳异常
net.ipv4.tcp_timestamps = 0

# 系统中最多有多少个 TCP 套接字不被关联到任何一个用户文件句柄上，如果超过这个数字，连接将即刻被复位并打印警告信息，这个限制仅仅是为了防止简单的DoS 攻击
net.ipv4.tcp_max_orphans =3276800
```





## Linux服务端最大并发数

在开始今天的文章之前，先抛一个面试题出来：

> 你接触过的单机最大并发数是多少？
> 你认为当前正常配置的服务器物理机最大并发数可以到多少？
> 说说你的理解和分析。

思考几分钟，如果你可以**有理有据地说出答案**，那确实就不用再往下看了，关上手机去陪陪家人是个不错的选择。

思考几分钟，如果你**没有头绪或者对答案不确定**，那么你先不用着急关闭页面去玩耍，你应该继续往下看，因为这个问题很不错。

对于后端开发人员来说，并发数往往和技术难度是呈正相关的，实际上也确实如此：**体量决定架构**。

服务端根据不同业务场景会有不同的侧重点，单纯追求高并发其实并不是根本目的，**高可用&稳定性更重要**。

所以最终我们的目的是：**保证高可用高稳定的基础上追求高并发，降本增效**。

高可用&高并发是我们直观感受到的，本质上这是个**复杂的系统工程**，每个环节都会影响结果，每一块都值得研究和深入。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208281002645.png" alt="image-20220828100200547" style="zoom:67%;" />

## 2. C10K问题和C10M问题

在2000年初的时候，全球互联网的规模并不大，但是当时就已经提出了C10K问题，所谓**C10K就是单机1w并发问题**，虽然现在不觉得是个难题了，但是这在当初是很有远见和挑战的问题。

C10K问题最早由**Dan Kegel**发布于其个人站点，原文链接如下:

> **http://www.kegel.com/c10k.html**

相关资料显示Dan Kegel目前工作于**Google**，从1978年起开始接触计算机编程，是Winetricks和Crosstool的作者，大佬年轻时的照片：

Dan Kegel这篇文章阅读难度并不大，大白建议从事服务端开发或者对高性能网络开发有兴趣的读者尝试读一读。

在APUE第三版都没有提到epoll，所以**我们解决C10K问题的时间并不长**，其中IO复用epoll/kqueue/iocp等技术对于C10k问题的解决起到了非常重要的作用。

开源大神们基于epoll/kqueue等开发了诸如libevent/libuv等网络库，从而大幅提高了高并发网络的开发效率，对于C/C++程序员来说并不陌生。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208281003952.png" alt="image-20220828100310866" style="zoom:80%;" />

这里简单提一下针对下一个10年的展望和挑战：**C10M问题**。

站在浪尖的那一批人早就开始思考**让单机达到1000w并发**，现在听起来感觉不可思议，但是要达到这个目标，除了硬件上的提升，更重要的是**对系统软件和协议栈的改造**。

Errata Security的CEO Robert Graham在Shmoocon 2013大会上的演讲，大佬重要的观点是：

> **不要让OS内核执行所有繁重的任务：将数据包处理、内存管理、处理器调度等任务从内核转移到应用程序高效地完成，让诸如Linux这样的OS只处理控制层，数据层完全交给应用程序来处理。**

确实也是如此，**难道你不觉得Linux内核做了太多不该自己做的事情了吗**？

近几年出现的DPDK、PFRING、NETMAP等技术也是类似的思想，现在流行的协处理器+CPU的架构也是这样的：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208281003486.png" alt="image-20220828100337409" style="zoom:67%;" />

## 3. 服务器最大并发数分析

前面提到的C10K和C10M问题都是围绕着提升服务器并发能力展开的，但是难免要问：**服务器最大的并发上限是多少**？

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208281003278.png" alt="image-20220828100350177" style="zoom:50%;" />

### 3.1 五元组

做过通信的盆友们一定听过**五元组**这个概念，一个五元组可以唯一标记一个网络连接，所以要理解和分析最大并发数，就必须理解五元组：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208281004510.png" alt="image-20220828100408432" style="zoom:80%;" />

这样的话，就可以基本认为：**理论最大并发数 = 服务端唯一五元组数**。

### 3.2 端口&IP组合数

那么对于服务器来说，服务端唯一五元组数最大是多少呢？

**有人说是65535**，显然不是，但是之所以会有这类答案是因为当前Linux的端口号是2字节大小的short类型，总计2^16个端口，除去一些系统占用的端口，可用端口确实只剩下64000多了。

对于服务端本身来说，DestPort数量确实有限，假定有多张网卡，每个网卡绑定多个IP，**服务端的Port端口数和IP数的组合类型也是有限的**。

对于客户端来说，本身的端口和IP也是一样有限的，虽然这是个**组合问题**，但是数量还是有限的：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208281005766.png" alt="image-20220828100556660" style="zoom:50%;" />

### 3.3 并发数理论极限

看了前面的端口&IP的组合数计算，好像并发数并不会特别大。

**错了，是真的会很大。**

分析一下，前面的计算都是针对单个服务器或者客户端的，但是**实际上每个服务器会应对全网的所有客户端**，那么从服务端看，源IP和源Port的数量是非常大的。

**理论上服务端可以接受的客户端IP是2^32(按照IPv4计算）,端口数是2^16，目前端口号仍然是16bit的，所有这个理论最大值是2^48**，果然很大！

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208281006836.png" alt="image-20220828100609745" style="zoom:67%;" />

### 3.4 实际情况

天下没有免费的午餐。

**每一条连接都是要消耗系统资源的**，所以实际中可能会设置最大并发数来保证服务器的安全和稳定，所以**这个理论最大并发数是不可能达到的**。

**实际中并发数和业务是直接相关的**，像Redis这种内存型的服务端并发十几万都是没问题的，大部分来讲几十/几百/几千/几万等是存在的。

## 4. 客户端最大连接数 

理解了服务器的最大并发数是2^48，那么**客户端最多可以连接多少服务器呢**？

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208281006875.png" alt="image-20220828100622786" style="zoom:50%;" />

对于客户端来说，当然可以借助于多网卡多IP来增加连接能力，我们仍然假定客户端只有1张网卡1个IP，由于端口数的限制到2^16，再去掉系统占用的端口，剩下可用的差不多64000。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208281006316.png" alt="image-20220828100636233" style="zoom:67%;" />

也就是说，客户端虽然可以连接任意的目的IP和目的端口，但是客户端自身端口是有限的，所以**客户端的理论最大连接数是2^16**，含系统占用端口。

## 5. NAT环境下的客户端

解决前面的两个问题之后，来看另外一个问题：

> **一个公网出口NAT服务设备最多可同时支持多少内网IP并发访问外网服务？**

毕竟公网IP都是有限并且要花钱的，我们大部分机器都是在局域网中结合NAT来进行外网访问的，所以这个场景还是很熟悉的。

来看下**内网机器访问外网时的IP&端口替换和映射还原的过程**，就明白了：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208281006435.png" alt="image-20220828100655328" style="zoom:80%;" />



因为这时的客户端是NAT设备，所以NAT环境下最多支持65535个并发访问外网。

## 6.小结

本文通过一道面试题切入，先描述了C10K和C10M问题，进而详细说明了客户端的最大访问数和服务端的最大并发数计算和原理，最后描述了NAT场景下的访问并发数。

虽然理论服务端并发数非常大，但是我们也没有必要觉得并发数高就厉害，服务复杂程度不一样，**切忌唯并发数来判断业务和开发者水平**。

试想echo服务和订单交易服务显然是不一样的，我们**应该做的是在服务稳定和高可用的前提下去从缓存/网络/数据库等多个角度来优化提高性能**。



# 服务器被入侵怎么办

> 下文中的，给文件和目录加锁，是指给文件和目录增加了一些属性，只读等

## 1 服务器入侵现象

近期有一个朋友的服务器(自己做了网站)好像遭遇了入侵，具体现象是：服务器 CPU 资源长期 100%，负载较高。服务器上面的服务不能正常提供服务。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211141220170.png" alt="image-20221114122027997" style="zoom:67%;" />

朋友处理了一会没有解决，我开始想说我不是搞安全的，我怎么会，但朋友开出了天价，一顿海底捞，我在生活和现实面前低头了。开始上手看看了。

## 2 服务器排查和处理

### 1 服务器被入侵的可能原因

1. 服务器 ssh 密码 设置得很简单。
2. 腾讯云安全组范围放得很大。
3. 使用了宝塔，宝塔面板的密码也是很简单的密码(应该不是这个入侵入口)。

### 2 排查和处理步骤

1、ps -ef / top 找出占用进程最大的服务

问题现象

ps/top 命令 已经被替换了。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLGlj7Vq66zrCVZ2YmniaFBZu6sUeIFZDORtmw6icdt8yvW6KKljib3tk7ibqwqZLdOdgrbcscX4rBxkNA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

2、查找详细的入侵痕迹 last 或者 grep 'Accepted' /var/log/secure。

```sh
grep 'Accepted'  /var/log/secure 
```

```sh
[root@VM-12-12-centos ~]# grep 'Accepted'  /var/log/secure 
Aug 26 21:51:37 VM-12-12-centos sshd[19822]: Accepted password for root from 34.215.138.2 port 36720 ssh2
Aug 27 08:52:05 VM-12-12-centos sshd[3053]: Accepted password for root from 127.0.0.1 port 57534 ssh2
Aug 27 08:58:50 VM-12-12-centos sshd[7038]: Accepted password for root from 127.0.0.1 port 57548 ssh2
Aug 27 09:10:02 VM-12-12-centos sshd[14830]: Accepted publickey for lighthouse from 106.55.203.49 port 44204 ssh2: RSA SHA256:123456/UIbl8
Aug 27 09:10:03 VM-12-12-centos sshd[14913]: Accepted publickey for lighthouse from 81.69.102.49 port 60820 ssh2: RSA SHA256:123456/UIbl8
Aug 27 09:14:08 VM-12-12-centos sshd[17307]: Accepted password for root from 127.0.0.1 port 57690 ssh2
Aug 27 09:34:22 VM-12-12-centos sshd[29150]: Accepted publickey for lighthouse from 106.55.203.55 port 38044 ssh2: RSA SHA256:123456/UIbl8
Aug 27 09:34:23 VM-12-12-centos sshd[29233]: Accepted publickey for lighthouse from 81.69.102.60 port 51190 ssh2: RSA SHA256:123456/UIbl8
```

> lighthouse 腾讯云轻量服务器

我们在这里就可以看到，有一些境外IP 34.215.138.2 成功登录了，这些 IP不是我们的正常登录。在 /var/log/secure 日志里，我看到了 IP 34.215.138.2 尝试登录不到500次 就已经破解成功了。

### 3 处理措施

这里我们立马采取了第一个措施，

1. 在腾讯云安全组限制了 SSH 的登录IP， 之前的安全组 SSH 是放行所有IP。
2. 将 SSH ROOT 密码修改。
3. /root/.ssh/authorized_keys 备份，并清空。

```sh
[root@VM-12-12-centos ~]# cp -rp /root/.ssh/authorized_keys  /root/.ssh/authorized_keys.bak
cp: cannot create regular file ‘/root/.ssh/authorized_keys.bak’: Permission denied
```

这时我们就遇到了权限的问题，这个晚点展开讲，因为我们已经限制了源IP， 所以这个我们可以晚点来处理。

3、查看最近新增的一些用户

问题现象

```s
cat /etc/passwd
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211141223034.png" alt="image-20221114122321891" style="zoom:80%;" />

**处理措施**

锁定用户

```
[root@VM-12-12-centos ~]# usermod  -L  sys1  
```

4、我这里不计划去找进程（已经在新建一台版本一致的系统， 来拷贝 top 和 ps 命令，需要一小会，我们趁这个时间，先看看其他），因为之前朋友重启过服务器，发现服务器启动过一会才会负载较高。我认为入侵者应该放了一些定时任务和启动脚本里面。

**问题现象**

定时任务

crond 读取配置文件会从以下几个路径读取：

- /var/spool/cron/ , 由crontab -e 进行写入，配置文件无需指定用户
- /etc/crontab ，只能root 进行编辑，配置文件需指定用户
- /etc/cron.d/ ,在此文件夹下创建定时任务文件，配置文件需指定用户
- /etc/cron.*

/var/spool/cron/ 未找到(后面会说到这里有障眼法)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLGlj7Vq66zrCVZ2YmniaFBZu1m44NHdgrcLsr3YSYQEx1MKjibzc1HFMIDqch7ydCdguibSUmXQJHE5g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

图片

/etc/crontab 未找到(后面会说到这里有障眼法)

但是我在 /var/log/cron 一直看到有任务执行。每间隔5分钟。

```
Aug 27 22:00:01 VM-12-12-centos CROND[16839]: (root) CMD (/sbin/httpss >/dev/null 2>&1;^M                                                                                                    )
Aug 27 22:00:01 VM-12-12-centos CROND[16840]: (root) CMD (/usr/local/qcloud/YunJing/YDCrontab.sh > /dev/null 2>&1)
Aug 27 22:00:01 VM-12-12-centos CROND[16842]: (root) CMD (/usr/lib/mysql/mysql;^Mno crontab for root                                                                                                   )

Aug 27 22:05:01 VM-12-12-centos CROND[17486]: (root) CMD (/usr/lib/mysql/mysql;^Mno crontab for root                                                                                                   )
Aug 27 22:05:01 VM-12-12-centos CROND[17487]: (root) CMD (/sbin/httpss >/dev/null 2>&1;^M                                                                                                    )
```

**处理措施**

这里我们先做的操作就是，先把 /usr/lib/mysql/mysql 和 /sbin/httpss 给删除。删除的时候还是提示没有权限。我们知道这些文件应该是加琐了，所以我开始解锁，我们发现 chattr 也被替换和锁住了。所以不能操作下去了。

开机启动脚本

/etc/rc.local ， 我们也发现了一个脚本。

```
[root@VM-12-12-centos ~]# cat /etc/rc.local 
#!/bin/bash

# THIS FILE IS ADDED FOR COMPATIBILITY PURPOSES
#
# It is highly advisable to create own systemd services or udev rules
# to run scripts during boot instead of using this file.
#
# In contrast to previous versions due to parallel execution during boot
# this script will NOT be run after all other services.
#
# Please note that you must run 'chmod +x /etc/rc.d/rc.local' to ensure
# that this script will be executed during boot.

/usr/bin/0f4f80f9ab start
```

但是这个文件好像不存在的，我们就把这个给注释了。

5、还原更改了 top、ps、chattr、lsattr.

- 首先我们从相同版本的机器拷贝了 chattr、lsattr， 我们得先操作这个， 因为我们的 top 和 ps 都被锁住了。
- 我将文件上传至 /tmp 目录，然后增加可执行权限，然后先给 /usr/bin/chattr 解除锁定。

```
/tmp/chattr -ai /usr/bin/chattr
```

- 执行完之后，发现还是不能替换 /usr/bin/chattr。最后耗费了一段时间才反应到，入侵者可能不仅仅加锁了文件还加锁了 /usr/bin/。
- 解锁目录

```
/tmp/chattr -ai /usr/bin/
```

- 这下才能把 /usr/bin/chattr 给替换掉。
- 接下来参考这些，我们把 top 和 ps 、lsattr 给还原了。

部分截图

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLGlj7Vq66zrCVZ2YmniaFBZuwJibY3Dibaat6ZWm4k7N7Ol7KibD3TE1UJn54kJWgSxm1rWVIgHJibACTw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 3 本次入侵需要带来启示的点

### 1 ps 、top 、chattr 、lsattr

在这些命令被替换了，并且我们想还原又还原不了的场景，我们可以拷贝同版本的机器相同的命令放在其它目录，用这些命令来解除入侵者将它已经替换并锁定了文件。注意有些入侵者不仅会在文件层面加锁，还会在当前的文件的目录这一层加锁。我之前在这个上面困惑了一段时间。

### 2 文件内容隐藏

上文中，我执行 crontab -l 和 cat 查看 /etc/cron.d/ 下面的文件。发现文件没有内容。

其实不知道使用了什么特殊字符还是什么隐藏了， 其实是存在定时任务的。

示例：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLGlj7Vq66zrCVZ2YmniaFBZu3xazn1HZLEbEjJLKPaRYoXibGf0uknlk3FAW3vJdXk29p0PprzPrRdw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLGlj7Vq66zrCVZ2YmniaFBZuvXS7s8E7ZPZWXRic8I1Njl15HOxEBoARs3yZWqG3Nm8kICOkwDtStEQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLGlj7Vq66zrCVZ2YmniaFBZuMPxibepT7CP8ll68GTVaOlGQJ5BDnTugnHCwvMEvWibG2vK1yynLxPsg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这个配置是如何导致 cat/more 看不了的, 今天再次看了下，这个文件可能是被当成了数据文件，因为我把这个文件 file 查看了之后，文件属性是data. 然后文件包含的特殊字符，导致隐藏了。

### 3 其中一个脚本

我们可以看到这个脚本其实一直在 更改 /etc/ld.so.preload 的内容。并且在关闭一些扫描软件和系统的服务。

> 在 Linux 操作系统的动态链接库加载过程中，动态链接器会读取 LD_PRELOAD 环境变量的值和默认配置文件 /etc/ld.so.preload 的文件内容，并将读取到的动态链接库进行预加载，即使程序不依赖这些动态链接库，LD_PRELOAD 环境变量和 /etc/ld.so.preload 配置文件中指定的动态链接库依然会被装载，它们的优先级比 LD_LIBRARY_PATH 环境变量所定义的链接库查找路径的文件优先级要高，所以能够提前于用户调用的动态库载入。——段落引自《警惕利用 Linux 预加载型恶意动态链接库的后门》

我已经删除了 /usr/local/lib/libprocesshider.so 文件，之后每次执行命令会有这个报错。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLGlj7Vq66zrCVZ2YmniaFBZuQgBSXhn0b2lSxpH3R170RTFX8oqrSjaSltHmhy7qkHXtxMINXCUQnQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

我在清空文件 /etc/ld.so.preload 之后，我发现好了一会后，还是出现这个，我再看 /etc/ld.so.preload 文件，里面又写了 /usr/local/lib/libprocesshider.so ，我怀疑还有定时任务，但是我找了一会定时任务，还是没有找到。后面在查看异常进程的时候，我看到了这个进程

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLGlj7Vq66zrCVZ2YmniaFBZu2n59rzVib78Oj26saUJO7bIDTA4x5l4Aic3k8iaWx9Jj394v3K1cm9ghA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLGlj7Vq66zrCVZ2YmniaFBZu3zeS9pVT5ibMwoicBoKkpKT030O8e2DmNTZpDkSJwh4Be6BibuE5V2Zaw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

发现这个脚本的就是一直在循环执行上面内容。将这个进程 kill 后，然后删除脚本。

## 4 本次服务器被入侵的一些启示

1、用好云厂家的安全组。对一些关键端口，放行规则尽量最小/

2、服务器相关的一些密码尽量增加复杂性。

3、增加对一些关键文件的监控. (通过监控软件监控 md5值)

- /etc/passwd
- /etc/shadow
- /etc/group
- /root/.bash_history
- /root/.ssh/authorized_keys
- /etc/ssh/sshd_config
- /etc/profile
- /var/spool/cron/root
- /etc/crontab
- /etc/ld.so.preload
- /etc/rc.local
- lsof
- ps
- netstat
- top
- ls
- pstree
- last
- history
- sudo
- password
- chattr
- lsattr

4、服务器入侵之后，我们需要怎么处理才是最好的。

> https://cloud.tencent.com/document/product/296/9604 https://help.aliyun.com/document_detail/40994.htm?spm=a2c4g.11186623.0.0.75c56956NVPBST

1. 服务器如果有开放SSH 远程登录，可以设置限制登录(安全组、或者服务)，只放行自己的IP. 查找详细的入侵痕迹 last 或者 grep 'Accepted' /var/log/secure

> /root/.ssh/authorized_keys /etc/passwd 这些文件也可以看下。将一些新建的用户锁定。

1. 服务器如果可以关闭外网，就关闭外网。在安全组层面设置下，或者路由或者NAT。
2. 首先看下 ps/top 命令有没有被篡改， 如果有的话， 从其他正常的机器上拷贝至服务器上。然后执行查看异常进程。也要查询下 /etc/ld.so.preload 是否有被篡改。如果有的的话，记得清空里面的内容，然后将对应的文件删除或者重命名。

> 如果使用过程中遇到了文件不可删，不可改的问题，需要使用 chattr -ia 文件名 如果 chattr 也被串改，那就需要从别的机器拷贝。然后复原。

1. 如果上述没有找到，可以通过 netstat 间接查看异常的连接从而查询异常进程。
2. 检查开机启动 和 crontab 相关的内容 。
3. 检查异常进程。

以上就是这次入侵的处理过程和得到的一些小启示，后续有了解新的会继续补充。



# Linux 网络性能的 15 个优化建议

Linux 网络在性能方面有哪些优化手段可用呢？本文将给出一些开发或者运维中的 Linux 网络性能优化建议。

要注意的是，每一种性能优化方法都有它适用或者不适用的应用场景，根据当前的项目现状灵活来选择用或者不用。

## 尽量减少不必要的网络 IO

第一个建议就是不必要用网络 IO 的尽量不用。

是的，网络在现代的互联网世界里承载了很重要的角色。用户通过网络请求线上服务、服务器通过网络读取数据库中数据，通过网络构建能力无比强大分布式系统。网络很好，能降低模块的开发难度，也能用它搭建出更强大的系统。但是这不是你滥用它的理由！

原因是即使是本机网络 IO 开销仍然是很大的。先说发送一个网络包，首先得从用户态切换到内核态，花费一次系统调用的开销。进入到内核以后，又得经过冗长的协议栈，这会花费不少的 CPU 周期，最后进入环回设备的“驱动程序”。接收端呢，软中断花费不少的 CPU 周期又得经过接收协议栈的处理，最后唤醒或者通知用户进程来处理。当服务端处理完以后，还得把结果再发过来。又得来这么一遍，最后你的进程才能收到结果。你说麻烦不麻烦。另外还有个问题就是多个进程协作来完成一项工作就必然会引入更多的进程上下文切换开销，这些开销从开发视角来看，做的其实都是无用功。

上面分析的还只是本机网络 IO，如果是跨机器的还得会有双方网卡的 DMA 拷贝过程，以及两端之间的网络 RTT 耗时延迟。所以，网络虽好，但也不能随意滥用！

## 尽量合并网络请求

在可能的情况下，尽可能地把多次的网络请求合并到一次，这样既节约了双端的 CPU 开销，也能降低多次 RTT 导致的耗时。我们举个实践中的例子可能更好理解。假如有一个 redis，里面存了每一个 App 的信息（应用名、包名、版本、截图等等）。你现在需要根据用户安装应用列表来查询数据库中有哪些应用比用户的版本更新，如果有则提醒用户更新。

那么最好不要写出如下的代码：

```sh
<?php 
for(安装列表 as 包名){
  redis->get(包名)
  ...
}
```

> 上面这段代码功能实现上没问题，问题在于性能。据我们统计现代用户平均安装 App 的数量在 60 个左右。那这段代码在运行的时候，每当用户来请求一次，你的服务器就需要和 redis 进行 60 次网络请求。总耗时最少是 60 个 RTT 起。更好的方法是应该使用 redis 中提供的批量获取命令，如 hmget、pipeline 等，经过一次网络 IO 就获取到所有想要的数据，如图。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212291551884.png" alt="image-20221229155156753" style="zoom:67%;" />

## 调用者与被调用机器尽可能部署得近

> 我们知道，在握手一切正常的情况下，TCP 握手的时间基本取决于两台机器之间的 RTT 耗时。虽然我们没办法彻底去掉这个耗时，但是我们却有办法把 RTT 降低，那就是把客户端和服务器放得足够的近一些。尽量把每个机房内部的数据请求都在本地机房解决，减少跨地网络传输。

> 举例，假如你的服务是部署在北京机房的，你调用的 mysql、redis 最好都位于北京机房内部。尽量不要跨过千里万里跑到广东机房去请求数据，即使你有专线，耗时也会大大增加！在机房内部的服务器之间的 RTT 延迟大概只有零点几毫秒，同地区的不同机房之间大约是 1 ms 多一些。但如果从北京跨到广东的话，延迟将是 30 - 40 ms 左右，几十倍的上涨！

## 内网调用不要用外网域名

假如说你所负责的服务需要调用兄弟部门的一个搜索接口，假设接口是："http://www.sogou.com/wq?key=开发"。

既然是兄弟部门，那很可能这个接口和你的服务是部署在一个机房的。即使没有部署在一个机房，一般也是有专线可达的。**所以不要直接请求 www.sogou.com，而是应该使用该服务在公司对应的内网域名**。在我们公司内部，每一个外网服务都会配置一个对应的内网域名，我相信你们公司也有。

为什么要这么做，原因有以下几点：

1）**外网接口慢**。本来内网可能过个交换机就能达到兄弟部门的机器，非得上外网兜一圈再回来，时间上肯定会慢。

2）**带宽成本高**。在互联网服务里，除了机器以外，另外一块很大的成本就是 IDC 机房的出入口带宽成本。两台机器在内网不管如何通信都不涉及到带宽的计算。但是一旦你去外网兜了一圈回来，行了，一进一出全部要缴带宽费，你说亏不亏！！

3）**NAT 单点瓶颈**。一般的服务器都没有外网 IP，所以要想请求外网的资源，必须要经过 NAT 服务器。但是一个公司的机房里几千台服务器中，承担 NAT 角色的可能就那么几台。它很容易成为瓶颈。我们的业务就遇到过好几次 NAT 故障导致外网请求失败的情形。NAT 机器挂了，你的服务可能也就挂了，故障率大大增加。

## 调整网卡 RingBuffer 大小

在 Linux 的整个网络栈中，RingBuffer 充当了一个任务的收发中转站的角色。对于接收过程来讲，网卡负责往 RingBuffer 中写入收到的数据帧，ksoftirqd 内核线程负责从中取走处理。只要 ksoftirqd 线程工作得足够快，RingBuffer 这个中转站就不会出现问题。

但是我们设想一下，假如某一时刻，瞬间来了特别多的包，而 ksoftirqd 处理不过来了，会发生什么？这时 RingBuffer 可能瞬间就被填满了，后面再来的包，网卡直接就会丢弃，不做任何处理！

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwrXUoWVbHSG80ibNxjChtjUkfqTshFY2YR7LZQDKC8608oNowSLbNG6qa8dK9Ee81LWQc9zeTib1t7A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

通过 ethtool 就可以加大 RingBuffer 这个“中转仓库”的大小。

```
# ethtool -G eth1 rx 4096 tx 4096
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwrXUoWVbHSG80ibNxjChtjUkicDXQPeysibT7yWt3iadJU9A5pdorMQFLoyV2H1QBolTNE8J2xNDVIa1A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这样网卡会被分配更大一点的“中转站”，可以解决偶发的瞬时的丢包。不过这种方法有个小副作用，那就是排队的包过多会增加处理网络包的延时。所以应该让内核处理网络包的速度更快一些更好，而不是让网络包傻傻地在 RingBuffer 中排队。

## 减少内存拷贝

假如你要发送一个文件给另外一台机器，那么比较基础的做法是先调用 read 把文件读出来，再调用 send 把数据把数据发出去。这样数据需要频繁地在内核态内存和用户态内存之间拷贝，如图所示。

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwrXUoWVbHSG80ibNxjChtjUkHHhNfovoBqB8yic9k3icGBb3MDUoNzciaSGjNlT1j0vXVOF6HlAp3esGw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

目前减少内存拷贝主要有两种方法，分别是使用 mmap 和 sendfile 两个系统调用。使用 mmap 系统调用的话，映射进来的这段地址空间的内存在用户态和内核态都是可以使用的。如果你发送的数据是 mmap 映射进来的数据，则内核直接就可以从地址空间中读取，这样就节约了一次从内核态到用户态的拷贝过程。

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwrXUoWVbHSG80ibNxjChtjUkp74cONt3RZZZAAAWgaOTQhicDgyKXBTh76sjtsMXUcmynGiaMeaiadQBQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

不过在 mmap 发送文件的方式里，系统调用的开销并没有减少，还是发生两次内核态和用户态的上下文切换。如果你只是想把一个文件发送出去，而不关心它的内容，则可以调用另外一个做得更极致的系统调用 - sendfile。在这个系统调用里，彻底把读文件和发送文件给合并起来了，系统调用的开销又省了一次。再配合绝大多数网卡都支持的"分散-收集"（Scatter-gather）DMA 功能。可以直接从 PageCache 缓存区中 DMA 拷贝到网卡中。这样绝大部分的 CPU 拷贝操作就都省去了。

![图片](https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwrXUoWVbHSG80ibNxjChtjUktOOkKcm4TSDvxOcPJVJL85t62vyOLGbNL0N0mRsz35QR62D90icW5Jw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 使用 eBPF 绕开协议栈的本机 IO

如果你的业务中涉及到大量的本机网络 IO，可以考虑这个优化方案。本机网络 IO 和跨机 IO 比较起来，确实是节约了驱动上的一些开销。发送数据不需要进 RingBuffer 的驱动队列，直接把 skb 传给接收协议栈（经过软中断）。但是在内核其它组件上，可是一点都没少，系统调用、协议栈（传输层、网络层等）、设备子系统整个走了一个遍。连“驱动”程序都走了（虽然对于回环设备来说这个驱动只是一个纯软件的虚拟出来的东东）。

如果想用本机网络 IO，但是又不想频繁地在协议栈中绕来绕去。那么你可以试试 eBPF。使用 eBPF 的 sockmap 和 sk redirect 可以绕过 TCP/IP 协议栈，而被直接发送给接收端的 socket，业界已经有公司在这么做了。

<img src="https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwrXUoWVbHSG80ibNxjChtjUkyT4yaoiaZJJlujhQVf6VD4komc8gZiaMK49icnrp1f912AT19u45S4wrA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

## 尽量少用 recvfrom 等进程阻塞方式

在使用了 recvfrom 阻塞方式来接收 socket 上数据的时候，每次一个进程专⻔为了等一个 socket 上的数据就得被从 CPU 上拿下来，然后再换上另一个 进程。等到数据 ready 了，睡眠的进程又会被唤醒。总共两次进程上下文切换开销。如果我们服务器上有大量的用户请求需要处理，那就需要有很多的进程存在，而且不停地切换来切换去。这样的缺点有如下几个：

- 因为每个进程只能同时等待一条连接，所以需要大量的进程。
- 进程之间互相切换的时候需要消耗很多 CPU 周期，一次切换大约是 3 - 5 us 左右。
- 频繁的切换导致 L1、L2、L3 等高速缓存的效果大打折扣。

大家可能以为这种网络 IO 模型很少见了。但其实在很多传统的客户端 SDK 中，比如 mysql、redis 和 kafka 仍然是沿用了这种方式。

## 使用成熟的网络库

使用 epoll 可以高效地管理海量的 socket。在服务器端，我们有各种成熟的网络库进行使用。这些网络库都对 epoll 使用了不同程度的封装。

> 首先第一个要给大家参考的是 Redis。老版本的 Redis 里单进程高效地使用 epoll 就能支持每秒数万 QPS 的高性能。如果你的服务是单进程的，可以参考 Redis 在网络 IO 这块的源码。

> 如果是多线程的，线程之间的分工有很多种模式。那么哪个线程负责等待读 IO 事件，哪个线程负责处理用户请求，哪个线程又负责给用户写返回。根据分工的不同，又衍生出单 Reactor、多 Reactor、以及 Proactor 等多种模式。大家也不必头疼，只要理解了这些原理之后，选择一个性能不错的网络库就可以了。比如 PHP 中的 Swoole、Golang 的 net 包、Java 中的 netty、C++ 中的  Sogou Workflow 都封装得非常的不错。

## 使用 Kernel-ByPass 新技术

如果你的服务对网络要求确实特别特别的高，而且各种优化措施也都用过了，那么现在还有终极优化大招 -- Kernel-ByPass 技术。

内核在接收网络包的时候，要经过很⻓的收发路径。在这期间牵涉到很多内核组件之间的协同、协议栈的处理、以及内核态和用户态的拷贝和切换。Kernel-ByPass 这类的技术方案就是绕开内核协议栈，自己在用户态来实现网络包的收发。这样不但避开了繁杂的内核协议栈处理，也减少了频繁的内核态用户态之间的拷贝和切换，性能将发挥到极致！

目前我所知道的方案有 SOLARFLARE 的软硬件方案、DPDK 等等。如果大家感兴趣，可以多去了解一下！

<img src="https://mmbiz.qpic.cn/mmbiz_png/BBjAFF4hcwrXUoWVbHSG80ibNxjChtjUkGibp3vHPPoUfTmiarzCIgFL3AvobdIRu53uvLupAsSZREEEJXatoLHhg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:50%;" />

## 配置充足的端口范围

客户端在调用 connect 系统调用发起连接的时候，需要先选择一个可用的端口。内核在选用端口的时候，是采用从可用端口范围中某一个随机位置开始遍历的方式。如果端口不充足的话，内核可能需要循环撞很多次才能选上一个可用的。这也会导致花费更多的 CPU 周期在内部的哈希表查找以及可能的自旋锁等待上。因此不要等到端口用尽报错了才开始加大端口范围，而是应该一开始的时候就保持一个比较充足的值。

```
# vi /etc/sysctl.conf
net.ipv4.ip_local_port_range = 5000 65000
# sysctl -p  //使配置生效
```

如果端口加大了仍然不够用，那么可以考虑开启端口 reuse 和 recycle。这样端口在连接断开的时候就不需要等待 2MSL 的时间了，可以快速回收。开启这个参数之前需要保证 tcp_timestamps 是开启的。

```
# vi /etc/sysctl.conf
net.ipv4.tcp_timestamps = 1
net.ipv4.tcp_tw_reuse = 1
net.ipv4.tw_recycle = 1
# sysctl -p
```

## 小心连接队列溢出

服务器端使用了两个连接队列来响应来自客户端的握手请求。这两个队列的长度是在服务器 listen 的时候就确定好了的。如果发生溢出，很可能会丢包。所以如果你的业务使用的是短连接且流量比较大，那么一定得学会观察这两个队列是否存在溢出的情况。因为一旦出现因为连接队列导致的握手问题，那么 TCP 连接耗时都是秒级以上了。

对于半连接队列， 有个简单的办法。那就是只要保证 tcp_syncookies 这个内核参数是 1，就能保证不会有因为半连接队列满而发生的丢包。

对于全连接队列来说，可以通过 netstat -s 来观察。netstat -s 可查看到当前系统全连接队列满导致的丢包统计。但该数字记录的是总丢包数，所以你需要再借助 watch 命令动态监控。

```
# watch 'netstat -s | grep overflowed' 
160 times the listen queue of a socket overflowed //全连接队列满导致的丢包
```

如果输出的数字在你监控的过程中变了，那说明当前服务器有因为全连接队列满而产生的丢包。你就需要加大你的全连接队列的⻓度了。全连接队列是应用程序调用 listen 时传入的 backlog 以及内核参数 net.core.somaxconn 二者之中较小的那个。如果需要加大，可能两个参数都需要改。

如果你手头并没有服务器的权限，只是发现自己的客户端机连接某个 server 出现耗时长，想定位一下是否是因为握手队列的问题。那也有间接的办法，可以 tcpdump 抓包查看是否有 SYN 的 TCP Retransmission。如果有偶发的 TCP Retransmission， 那就说明对应的服务端连接队列可能有问题了。

## 减少握手重试

我们知道，如果握手发生异常，客户端或者服务端就会启动超时重传机制。这个超时重试的时间间隔是翻倍地增长的，1 秒、3 秒、7 秒、15 秒、31 秒、63 秒 ......。对于我们提供给用户直接访问的接口来说，重试第一次耗时 1 秒多已经是严重影响用户体验了。如果重试到第三次以后，很有可能某一个环节已经报错返回 504 了。所以在这种应用场景下，维护这么多的超时次数其实没有任何意义。倒不如把他们设置得小一些，尽早放弃。其中客户端的 syn 重传次数由 tcp_syn_retries 控制，服务器半连接队列中的超时次数是由 tcp_synack_retries 来控制。把它们两个调成你想要的值。

## 如果请求频繁，请弃用短连接改用长连接

如果你的服务器频繁请求某个 server，比如 redis 缓存。和建议 1 比起来，一个更好一点的方法是使用长连接。这样的好处有：

1）**节约了握手开销**。短连接中每次请求都需要服务和缓存之间进行握手，每次都得让用户多等一个握手的时间开销

2）**规避了队列满的问题**。我们知道，当全连接或者半连接队列溢出的时候，服务器直接丢包。而客户端呢并不知情，所以傻傻地等 3 秒才会重试。要知道 tcp 本身并不是专门为互联网服务设计的，这个 3 秒的超时对于互联网用户的体验影响是致命的。

3）**端口数不容易出问题**。端连接中，在释放连接的时候，客户端使用的端口需要进入 TIME_WAIT 状态，等待 2 MSL 的时间才能释放。所以如果连接频繁，端口数量很容易不够用。而长连接就固定使用那么几十上百个端口就够用了。

## TIME_WAIT 的优化

很多线上服务如果使用了短连接的情况下，就会出现大量的 TIME_WAIT。

> 首先，我想说的是，没有必要见到两三万个 TIME_WAIT 就恐慌得不行。从内存的⻆度来考虑，一条 TIME_WAIT 状态的连接仅仅是 0.5 KB 的内存而已。从端口占用的角度来说，确实是消耗掉了一个端口。但假如你下次再连接的是不同的 Server 的话，该端口仍然可以使用。只有在所有 TIME_WAIT 都聚集在和一个 Server 的连接上的时候才会有问题。

> 那怎么解决呢? 其实办法有很多。第一个办法是按上面建议开启端口 reuse 和 recycle。 第二个办法是限制 TIME_WAIT 状态的连接的最大数量。

```sh
# vi /etc/sysctl.conf
net.ipv4.tcp_max_tw_buckets = 32768
# sysctl -p
```

如果再彻底一些，也可以干脆直接用⻓连接代替频繁的短连接。连接频率大大降低以后，自然也就没有 TIME_WAIT 的问题了。好了，以上就是今天要给大家介绍的网络性能相关的 15 条建议，希望对大家有所帮助。

# 终端操作快捷键

作为一名 Linux 下的开发人员，和 Linux 系统打交道是每天必做的事情，通过 Linux 终端下命令行与 Linux 进行交互。熟练掌握 Linux 终端下命令行的操作可以让我们的工作达到事半功倍的效果，熟悉常用的终端命令快捷键可以很大程度上提高我们的工作效率。下面是平时常用的终端快捷键，希望小伙伴们熟练掌握，并灵活运用。

## 1、终端及标签页快捷键

| 快捷键              | 功能          |
| :------------------ | :------------ |
| Shift+Ctrl+T        | 新建标签页    |
| Shift+Ctrl+W        | 关闭标签页    |
| Ctrl+PageUp         | 前一标签页    |
| Ctrl+PageDown       | 后一标签页    |
| Shift+Ctrl+PageUp   | 标签页左移    |
| Shift+Ctrl+PageDown | 标签页右移    |
| Alt+1               | 切换到标签页1 |
| Alt+2               | 切换到标签页2 |
| Alt+3               | 切换到标签页3 |
| Shift+Ctrl+N        | 新建窗口      |
| Shift+Ctrl+Q        | 关闭终端      |
| F11                 | 全屏          |
| Ctrl+Shift+加号     | 放大          |
| Ctrl+减号           | 缩小          |

## 2、剪切/复制/粘贴/删除等快捷键

| 快捷键       | 功能                                       |
| :----------- | :----------------------------------------- |
| Shift+Ctrl+C | 复制                                       |
| Shift+Ctrl+V | 粘贴                                       |
| Ctrl+Insert  | 复制命令行内容                             |
| Shift+Insert | 粘贴命令行内容                             |
| Ctrl+k       | 剪切（删除）光标处到行尾的字符             |
| Ctrl+u       | 剪切（删除）光标处到行首的字符             |
| Ctrl+w       | 剪切（删除）光标前的一个单词               |
| Ctrl+y       | 粘贴Ctrl+u，Ctrl+k，Ctrl+w删除的文本       |
| Ctrl+c       | 中断终端正在执行的任务或者开始新命令输入行 |
| Ctrl+h       | 删除光标所在处的前一个字符（相当于退格键） |
| Ctrl+l       | 清除屏幕所有内容，同clear命令              |
| Ctrl+s       | 锁定终端，使之无法输入内容                 |
| Ctrl+q       | 解锁执行Ctrl+s的锁定状态                   |
| Ctrl+z       | 暂停执行在终端运行的任务                   |

## 3、移动光标快捷键

| 快捷键  | 功能                     |
| :------ | :----------------------- |
| Ctrl+a  | 移到行首                 |
| Ctrl+e  | 移到行尾                 |
| Ctrl+b  | 往回(左)移动一个字符     |
| Ctrl+f  | 往后(右)移动一个字符     |
| Alt+b   | 往回(左)移动一个单词     |
| Alt+f   | 往后(右)移动一个单词     |
| Ctrl+xx | 在命令行尾和光标之间移动 |

## 4、历史命令快捷键

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305111658510.png" alt="image-20230511165828407" style="zoom: 67%;" />

## 5、控制命令

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305111658947.png" alt="image-20230511165806854" style="zoom:80%;" />



# Linux 实用运维脚本

[Linux 实用运维脚本分享 (qq.com)](https://mp.weixin.qq.com/s?__biz=MzAwMjg1NjY3Nw==&mid=2247528432&idx=1&sn=1d91bd1a80fcf1f1f8855316fb72e2d4&chksm=9ac62c7aadb1a56c790006287b61336b50fa9833b2e68382cd331c228ee21350429a118d46a4&scene=132#wechat_redirect)

## 简单命令

```apl
#查看僵尸进程
ps -al | gawk '{print $2,$4}' | grep Z

# 匹配电子邮件的地址
cat index.html | egrep -o "[A-Za-z0-9._]+@[A-Za-z0-9.]+\.[a-zA-Z]{2,4}" > ans.txt

#匹配http URL
cat index.html | egrep -o "http://[A-Za-z0-9.]+\.[a-zA-Z]{2,3}" > ans.txt 

#纯文本形式下载网页
lynx -dump www.baidu.com > plain.txt

#只打印HTTP头部信息，无须远程下载文件
curl --head www.baidu.com

#使用POST提交数据
curl -d "param2=nickwolfe¶m2=12345" http://www.linuxidc.com/login.cgi

#显示分组途经的网关
traceroute www.baidu.com

#列出系统中的开放端口以及运行在端口上的服务
lsof -i 

#nc命令建立socket连接

#设置监听　nc -l 5555
#连接到套接字 nc 192.0.0.1 5555

#快速文件传输
#接收端　nc -l 5555 > destination_filename
#发送端　nc 192.0.0.1 5555 < source_filename

#找出指定目录最大的n个文件
du -ak target_dir | sort -nrk 1 | head -n 4
# du中a为递归,k为kb；sort中n为数字,r为降序,k指定列

#向终端中的所有登陆用户发送广播信息
cat message.txt | wall

#创建新的screen窗口
screen

#打印所有的.txt和.pdf文件
find . \( -name "*.txt" -o -name "*.pdf" \) -print

# -exec command {} \;是连用的，所有符合的都会放置在{}中，去执行command 

#将文件分割成多个大小为10kb的文件
split -b 10k data.file 

#打印两个文件的交集
comm A.txt B.txt -3 | sed 's/^\t//'

#sed移除空白行
sed '/^$/d' file
```



## MySQL备份

```shell
#!/bin/bash
set -e
USER="root"
PASSWORD="123456"
# 数据库数据目录 #
DATA_DIR="/data/mysql"
BIN_INDEX=$DATA_DIR"/mysql-bin.index"
# 备份目录 #
BACKUP_DIR="/data/backup/mysql"
BACKUP_LOG="/var/log/mysql/backup.log"

DATE=`date +"%Y%m%d"`
TIME=`date +"%Y%m%d%H"`

LOG_TIME=`date +"%Y-%m-%d %H:%M:%S"`
DELETE_BINLOG_TIME="7 day"
INCREMENT_INTERVAL="3 hour"

note() {
    printf "[$LOG_TIME] note: $*\n" >> $BACKUP_LOG;
}

warning() {
    printf "[$LOG_TIME] warning: $*\n" >> $BACKUP_LOG;
}

error() {
    printf "[$LOG_TIME] error: $*\n" >> $BACKUP_LOG;
    exit 1;
}

full_backup() {
    local dbs=`ls -l $DATA_DIR | grep "^d" | awk -F " " '{print $9}'`

    for db in $dbs
    do
        local backup_dir=$BACKUP_DIR"/full/"$db
        local filename=$db"."$DATE
        local backup_file=$backup_dir"/"$filename".sql"

        if [ ! -d $backup_dir ]
        then
            mkdir -p $backup_dir || { error "创建数据库 $db 全量备份目录 $backup_dir 失败";
            continue; }
            note "数据库 $db 全量备份目录 $backup_dir  不存在，创建完成";
        fi

        note "full backup $db start ..."
        mysqldump --user=${USER} --password=${PASSWORD} --flush-logs --skip-lock-tables --quick $db > $backup_file || { warning "数据库 $db 备份失败"; continue; }

        cd $backup_dir
        tar -cPzf $filename".tar.gz" $filename".sql"
        rm -f $backup_file
        chown -fR mysql:mysql $backup_dir

        note "数据库 $db 备份成功";
        note "full backup $db end."
    done
}

increment_backup() {
    local StartTime=`date "-d $INCREMENT_INTERVAL ago" +"%Y-%m-%d %H:%M:%S"`
    local DELETE_BINLOG_END_TIME=`date "-d $DELETE_BINLOG_TIME ago" +"%Y-%m-%d %H:%M:%S"`
    local dbs=`ls -l $DATA_DIR | grep "^d" | awk -F " " '{print $9}'`

    mysql -u$USER -p$PASSWORD -e "purge master logs before '$DELETE_BINLOG_END_TIME'" && note "delete $DELETE_BINLOG_TIME days before log";

    filename=`cat $BIN_INDEX | awk -F "/" '{print $2}'`
    for i in $filename
    do
        for db in $dbs
        do
            local backup_dir=$BACKUP_DIR"/increment/"$db
            local filename=$db"."$TIME
            local backup_file=$backup_dir"/"$filename".sql"

            if [ ! -d $backup_dir ]
            then
                mkdir -p $backup_dir || { error "创建数据库 $db 增量备份目录 $backup_dir 失败"; continue; }
                note "数据库 $db 增量备份目录 $backup_dir  不存在，创建完成";
            fi

            note "increment backup $db form time $StartTime start ..."

            mysqlbinlog -d $db --start-datetime="$StartTime" $DATA_DIR/$i >> $backup_file || { warning "数据库 $db 备份失败"; continue; }

            note "increment backup $db end."
        done
    done

    for db in $dbs
    do
        local backup_dir=$BACKUP_DIR"/increment/"$db
        local filename=$db"."$TIME
        local backup_file=$backup_dir"/"$filename".sql"

        cd $backup_dir
        tar -cPzf $filename".tar.gz" $filename".sql"
        rm -f $backup_file

        note "数据库 $db 备份成功";
    done
}

case "$1" in
    full)
        full_backup
    ;;
    increment)
        increment_backup
    ;;
    *)
        exit 2
    ;;
esac

exit 1
```



## 目录备份

```sh
#!/bin/bash
#
# 时间
DATE=$(date '+%Y-%m-%d_%H_%M_%S')
# 备份目录 
BACKUPDIR="/home/backups"
# 需要备份的目录
SORFILE=/opt
# 目标文件名
DESFILE=/home/backups/$SORFILE.$(date '+%Y-%m-%d_%H_%M_%S').zip

[ ! -d $BACKUPDIR ] && mkdir -p $BACKUPDIR
cd $BACKUPDIR

echo "start backup $SORFILE ..."
sleep 3
#echo "$DESFILE"

#tar cvf $DESFILE $SORFILE
#gzip -f .zip $DESFILE
zip -r $DESFILE $SORFILE &>/dev/null
if [ "$?" == "0" ]
then
   echo $(date +%Y-%m-%d)" zip sucess">>backup.log
else
   echo $(date +%Y-%m-%d)" zip failed">>backup.log
   exit 0
fi

# 删除3天前的备份
find $BACKUPDIR -type f -ctime +3 | xargs rm -rf
```

## PING查询

```sh
#!/bin/bash
#用途：根据网络配置对网络地址192.168.0进行修改，检查是否是活动状态

#{start..end}shell扩展生成一组地址
for ip in 192.168.22.{1..255}
do 
    (
    ping $ip -c 2 &> /dev/null 
    # > 标准输出重定向，和1>一致
    # 2>&1 将标准错误输出　重定向　到标准输出
    # &>file 将标准输出和标准错误输出都重定向到文件filename中
    if [ $? -eq 0 ];then
        echo $ip is alive
    fi
    )&
done
wait
#并行ping,加速
```



## 磁盘IO检查

```sh
##iostat是查看磁盘活动统计情况

##显示所有设备负载情况 r/s:  每秒完成的读 I/O 设备次数。即 rio/s；w/s:  每秒完成的写 I/O 设备次数。即 wio/s等
iostat 

##每隔2秒刷新磁盘IO信息，并且每次显示3次
iostat 2 3

#显示某个磁盘的IO信息
iostat -d sda1

##显示tty和cpu信息
iostat -t

##以M为单位显示磁盘IO信息
iostat -m

##查看TPS和吞吐量信息  kB_read/s：每秒从设备（drive expressed）读取的数据量；kB_wrtn/s：每秒向设备（drive expressed）写入的数据量；kB_read：读取的总数据量；kB_wrtn：写入的总数量数据量；
iostat -d -k 1 1

#查看设备使用率（%util）、响应时间（await）
iostat -d -x -k 1 1

#查看CPU状态
iostat -c 1 3

#统计进程(pid)的stat,进程的stat自然包括进程的IO状况
pidstat

#只显示IO
pidstat -d  1 

#-d IO 信息,-r 缺页及内存信息-u CPU使用率-t 以线程为统计单位1  1秒统计一次
pidstat -u -r -d -t 1

#文件级IO分析,查看当前文件由哪些进程打开
lsof   
ls /proc/pid/fd

#利用 sar 报告磁盘 I/O 信息DEV 正在监视的块设备 tps 每秒钟物理设备的 I/O 传输总量 rd_sec/s 每秒从设备读取的扇区数量 wr_sec/s 每秒向设备写入的扇区数量 avgrq-sz I/O 请求的平均扇区数
#avgqu-sz I/O 请求的平均队列长度 await I/O 请求的平均等待时间，单位为毫秒 svctm I/O 请求的平均服务时间，单位为毫秒 %util I/O 请求所占用的时间的百分比，即设备利用率
sar -pd 10 3 

#iotop  top的io版
iotop

#查看页面缓存信息 其中的Cached 指用于pagecache的内存大小（diskcache-SwapCache）。随着写入缓存页，Dirty 的值会增加 一旦开始把缓存页写入硬盘,Writeback的值会增加直到写入结束。
cat /proc/meminfo 

#查看有多少个pdflush进程 Linux 用pdflush进程把数据从缓存页写入硬盘
#pdflush的行为受/proc/sys/vm中的参数的控制/proc/sys/vm/dirty_writeback_centisecs (default 500): 1/100秒, 多长时间唤醒pdflush将缓存页数据写入硬盘。默认5秒唤醒2个（更多个）线程。如果wrteback的时间长于dirty_writeback_centisecs的时间，可能会出问题
cat /proc/sys/vm/nr_pdflush_threads

#查看I/O 调度器
#调度算法
#noop anticipatory deadline [cfq] 
#deadline :    deadline 算法保证对既定的IO请求以最小的延迟时间。
#anticipatory：有个IO发生后，如果又有进程请求IO，则产生一个默认6ms猜测时间，猜测下一个进程请求IO是干什么。这对于随机读取会造成较大的延时。对数据库应用很糟糕，而对于Web Server等则会表现不错。
#cfq:        对每个进程维护一个IO队列，各个进程发来的IO请求会被cfq以轮循方式处理，对每一个IO请求都是公平。适合离散读的应用。
#noop:        对所有IO请求都用FIFO队列形式处理。默认IO不会存在性能问题。
cat /sys/block/[disk]/queue/scheduler


#改变IO调度器
$ echo deadline > /sys/block/sdX/queue/scheduler
#提高调度器请求队列的
$ echo 4096 > /sys/block/sdX/queue/nr_requests
```



## 性能相关

```sh
#查看当前系统load
uptime

#查看系统状态和每个进程的系统资源使用状况
top

#可视化显示CPU的使用状况
htop

#查看每个CPU的负载信息
mpstat -P ALL 1

#每隔1秒查看磁盘IO的统计信息
iostat -xkdz 1

#每隔一秒查看虚拟内存的使用信息
vmstat 1

#查看内存使用统计信息
free

#查看网络使用信息
nicstat -z 1

#类似vmstat的显示优化的工具
dstat 1

#查看系统活动状态，比如系统分页统计，块设备IO统计等
sar

#网络连接状态查看
netstat -s

#进程资源使用信息查看
pidstat 1
pidstat -d 1

#查看某个进程的系统调用信息 -p后面是进程id，-tttT 进程系统后的系统调用时间
strace -tttT -p 12670
#统计IO设备输入输出的系统调用信息
strace -c dd if=/dev/zero of=/dev/null bs=512 count=1024k


#tcpdump 查看网络数据包
tcpdump -nr /tmp/out.tcpdump

#块设备的读写事件信息统计
btrace /dev/sdb 

#iotop查看某个进程的IO操作统计信息
iotop -bod5

#slabtop 查看内核 slab内存分配器的使用信息
slabtop -sc

#系统参数设置
sysctl -a

#系统性能指标统计信息
perf stat gzip file1
#系统cpu活动状态查看
perf record -a -g -F 997 sleep 10
```



## 进程相关

```sh
## processes  进程管理

##ps查看当前系统执行的线程列表，进行瞬间状态，不是连续状态，连续状态需要使用top名称查看  更多常用参数请使用 man ps查看
ps

##显示所有进程详细信息
ps aux

##-u 显示某个用户的进程列表
ps -f -u www-data 

## -C 通过名字或者命令搜索进程
ps -C apache2

## --sort  根据进程cpu使用率降序排列，查看前5个进程  -pcpu表示降序  pcpu升序
ps aux --sort=-pcpu | head -5 

##-f 用树结构显示进程的层次关系，父子进程情况下
ps -f --forest -C apache2 

##显示一个父进程的所有子进程
ps -o pid,uname,comm -C apache2
ps --ppid 2359 

##显示一个进程的所有线程  -L 参数
ps -p 3150 -L 

##显示进程的执行时间 -o参数
ps -e -o pid,comm,etime 

##watch命令可以用来实时捕捉ps显示进程
watch -n 1 'ps -e -o pid,uname,cmd,pmem,pcpu --sort=-pmem,-pcpu | head -15' 

##jobs 查看后台运行的进程  jobs命令执行的结果，＋表示是一个当前的作业，减号表是是一个当前作业之后的一个作业，jobs -l选项可显示所有任务的PID,jobs的状态可以是running, stopped, Terminated,但是如果任务被终止了（kill），shell 从当前的shell环境已知的列表中删除任务的进程标识；也就是说，jobs命令显示的是当前shell环境中所起的后台正在运行或者被挂起的任务信息
jobs

##查看后台运营的进程号
jobs -p

##查看现在被终止或者退出的进程号
jobs -n


##kill命令 终止一个前台进程可以使用Ctrl+C键   kill  通过top或者ps获取进程id号  kill [-s 信号 | -p ] [ -a ] 进程号 ...
##发送指定的信号到相应进程。不指定型号将发送SIGTERM（15）终止指定进程。关闭进程号12的进程
kill 12


##等同于在前台运行PID为123的进程时按下Ctrl+C键
kill -2 123

##如果任无法终止该程序可用“-KILL” 参数，其发送的信号为SIGKILL(9) ，将强制结束进程  
kill -9 123

##列出所有信号名称
##HUP    1    终端断线
##INT     2    中断（同 Ctrl + C）
##QUIT    3    退出（同 Ctrl + \）
##TERM   15    终止
##KILL    9    强制终止
##CONT   18    继续（与STOP相反， fg/bg命令）
##STOP    19    暂停（同 Ctrl + Z）
kill -l

##得到指定信号的数值
kill -l KILL

##杀死指定用户所有进程
kill -u peidalinux
kill -9 $(ps -ef | grep peidalinux) 

##将后台中的命令调至前台继续运行  将进程123调至前台执行
fg 123

##将一个在后台暂停的命令，变成继续执行
bg  123

##该命令可以在你退出帐户/关闭终端之后继续运行相应的进程。nohup就是不挂起的意思  下面输出被重定向到myout.file文件中
nohup command > myout.file 2>&1 &

##at：计划任务，在特定的时间执行某项工作，在特定的时间执行一次。
## 格式：at HH:MM YYYY-MM-DD //HH（小时）:MM（分钟） YYYY（年）-MM（月份）-DD（日）
##HH[am pm]+D(天) days //HH（小时）[am（上午）pm（下午）]+days（天）
at 12:00（时间） //at命令设定12:00执行一项操作
#at>useradd aaa //在at命令里设定添加用户aaa
#ctrl+d //退出at命令
#tail -f /etc/passwd //查看/etc/passwd文件后十行是否增加了一个用户aaa

##计划任务设定后，在没有执行之前我们可以用atq命令来查看系统没有执行工作任务。
atq

##启动计划任务后，如果不想启动设定好的计划任务可以使用atrm命令删除。
atrm 1 //删除计划任务1

##pstree命令：列出当前的进程，以及它们的树状结构  格式：pstree [选项] [pid|user]
pstree

##nice命令：改变程序执行的优先权等级 应用程序优先权值的范围从-20～19，数字越小，优先权就越高。一般情况下，普通应用程序的优先权值（CPU使用权值）都是0，如果让常用程序拥有较高的优先权等级，自然启动和运行速度都会快些。需要注意的是普通用户只能在0～19之间调整应用程序的优先权值，只有超级用户有权调整更高的优先权值（从-20～19）。
nice [-n <优先等级>][--help][--version][命令]
nice -n 5 ls

##sleep命令：使进程暂停执行一段时间
date;sleep 1m;date


##renice命令 renice命令允许用户修改一个正在运行进程的优先权。利用renice命令可以在命令执行时调整其优先权。
##其中，参数number与nice命令的number意义相同。（1） 用户只能对自己所有的进程使用renice命令。（2） root用户可以在任何进程上使用renice命令。（3） 只有root用户才能提高进程的优先权
renice -5 -p 5200  #PID为5200的进程nice设为-5 

##pmap命令用于显示一个或多个进程的内存状态。其报告进程的地址空间和内存状态信息 #pmap PID 
pmap 20367
```



## javadump.sh

```sh
#!/bin/sh

DUMP_PIDS=`ps  --no-heading -C java -f --width 1000 |awk '{print $2}'`
if [ -z "$DUMP_PIDS" ]; then
    echo "The server $HOST_NAME is not started!"
    exit 1;
fi

DUMP_ROOT=~/dump
if [ ! -d $DUMP_ROOT ]; then
  mkdir $DUMP_ROOT
fi

DUMP_DATE=`date +%Y%m%d%H%M%S`
DUMP_DIR=$DUMP_ROOT/dump-$DUMP_DATE
if [ ! -d $DUMP_DIR ]; then
  mkdir $DUMP_DIR
fi

for PID in $DUMP_PIDS ; do
#Full thread dump 用来查线程占用，死锁等问题
  $JAVA_HOME/bin/jstack $PID > $DUMP_DIR/jstack-$PID.dump 2>&1
  echo -e ".\c"
#打印出一个给定的Java进程、Java core文件或远程Debug服务器的Java配置信息，具体包括Java系统属性和JVM命令行参数。
  $JAVA_HOME/bin/jinfo $PID > $DUMP_DIR/jinfo-$PID.dump 2>&1
  echo -e ".\c"
#jstat能够动态打印jvm(Java Virtual Machine Statistics Monitoring Tool)的相关统计信息。如young gc执行的次数、full gc执行的次数，各个内存分区的空间大小和可使用量等信息。
  $JAVA_HOME/bin/jstat -gcutil $PID > $DUMP_DIR/jstat-gcutil-$PID.dump 2>&1
  echo -e ".\c"
  $JAVA_HOME/bin/jstat -gccapacity $PID > $DUMP_DIR/jstat-gccapacity-$PID.dump 2>&1
  echo -e ".\c"
#未指定选项时，jmap打印共享对象的映射。对每个目标VM加载的共享对象，其起始地址、映射大小及共享对象文件的完整路径将被打印出来，  
  $JAVA_HOME/bin/jmap $PID > $DUMP_DIR/jmap-$PID.dump 2>&1
  echo -e ".\c"
#-heap打印堆情况的概要信息，包括堆配置，各堆空间的容量、已使用和空闲情况  
  $JAVA_HOME/bin/jmap -heap $PID > $DUMP_DIR/jmap-heap-$PID.dump 2>&1
  echo -e ".\c"
#-dump将jvm的堆中内存信息输出到一个文件中,然后可以通过eclipse memory analyzer进行分析
#注意：这个jmap使用的时候jvm是处在假死状态的，只能在服务瘫痪的时候为了解决问题来使用，否则会造成服务中断。
  $JAVA_HOME/bin/jmap -dump:format=b,file=$DUMP_DIR/jmap-dump-$PID.dump $PID 2>&1
  echo -e ".\c"
#显示被进程打开的文件信息
if [ -r /usr/sbin/lsof ]; then
  /usr/sbin/lsof -p $PID > $DUMP_DIR/lsof-$PID.dump
  echo -e ".\c"
  fi
done
#主要负责收集、汇报与存储系统运行信息的。
if [ -r /usr/bin/sar ]; then
/usr/bin/sar > $DUMP_DIR/sar.dump
echo -e ".\c"
fi
#主要负责收集、汇报与存储系统运行信息的。
if [ -r /usr/bin/uptime ]; then
/usr/bin/uptime > $DUMP_DIR/uptime.dump
echo -e ".\c"
fi
#内存查看
if [ -r /usr/bin/free ]; then
/usr/bin/free -t > $DUMP_DIR/free.dump
echo -e ".\c"
fi
#可以得到关于进程、内存、内存分页、堵塞IO、traps及CPU活动的信息。
if [ -r /usr/bin/vmstat ]; then
/usr/bin/vmstat > $DUMP_DIR/vmstat.dump
echo -e ".\c"
fi
#报告与CPU相关的一些统计信息
if [ -r /usr/bin/mpstat ]; then
/usr/bin/mpstat > $DUMP_DIR/mpstat.dump
echo -e ".\c"
fi
#报告与IO相关的一些统计信息
if [ -r /usr/bin/iostat ]; then
/usr/bin/iostat > $DUMP_DIR/iostat.dump
echo -e ".\c"
fi
#报告与网络相关的一些统计信息
if [ -r /bin/netstat ]; then
/bin/netstat > $DUMP_DIR/netstat.dump
echo -e ".\c"
fi
echo "OK!"
```



## 常用工具安装

```sh
#!/usr/bin/env bash

# ---------------------------------------------------------------------------------
# 控制台颜色
BLACK="\033[1;30m"
RED="\033[1;31m"
GREEN="\033[1;32m"
YELLOW="\033[1;33m"
BLUE="\033[1;34m"
PURPLE="\033[1;35m"
CYAN="\033[1;36m"
RESET="$(tput sgr0)"
# ---------------------------------------------------------------------------------

printf "${BLUE}\n"
cat << EOF
###################################################################################
# 安装常用命令工具
# 命令工具清单如下：
# 核心工具：df、du、chkconfig
# 网络工具：ifconfig、netstat、route、iptables
# IP工具：ip、ss、ping、tracepath、traceroute
# DNS工具：dig、host、nslookup、whois
# 端口工具：lsof、nc、telnet
# 下载工具：curl、wget
# 编辑工具：emacs、vim
# 流量工具：iftop、nethogs
# 抓包工具：tcpdump
# 压缩工具：unzip、zip
# 版本控制工具：git、subversion
#
###################################################################################
EOF
printf "${RESET}\n"

printf "\n${GREEN}>>>>>>>>> 安装常用命令工具开始${RESET}\n"

# 核心工具
printf "\n${CYAN}>>>> install coreutils(df、du)${RESET}\n"
yum install -y coreutils
printf "\n${CYAN}>>>> install chkconfig${RESET}\n"
yum install -y chkconfig

# 网络工具
printf "\n${CYAN}>>>> install net-tools(ifconfig、netstat、route)${RESET}\n"
yum install -y net-tools
printf "\n${CYAN}>>>> install iptables${RESET}\n"
yum install -y iptables

# IP工具
printf "\n${CYAN}>>>> install iputils(ping、tracepath)${RESET}\n"
yum install -y iputils
printf "\n${CYAN}>>>> install traceroute${RESET}\n"
yum install -y traceroute
printf "\n${CYAN}>>>> install iproute(ip、ss)${RESET}\n"
yum install -y iproute

# 端口工具
printf "\n${CYAN}>>>> install lsof${RESET}\n"
yum install -y lsof
printf "\n${CYAN}>>>> install nc${RESET}\n"
yum install -y nc
printf "\n${CYAN}>>>> install netstat${RESET}\n"
yum install -y netstat

# DNS工具
printf "\n${CYAN}>>>> install bind-utils(dig、host、nslookup)${RESET}\n"
yum install -y bind-utils
printf "\n${CYAN}>>>> install whois${RESET}\n"
yum install -y whois

# 下载工具
printf "\n${CYAN}>>>> install curl${RESET}\n"
yum install -y curl
printf "\n${CYAN}>>>> install wget${RESET}\n"
yum install -y wget

# 编辑工具
printf "\n${CYAN}>>>> install emacs${RESET}\n"
yum install -y emacs
printf "\n${CYAN}>>>> install vim${RESET}\n"
yum install -y vim

# 流量工具
printf "\n${CYAN}>>>> install iftop${RESET}\n"
yum install -y iftop
printf "\n${CYAN}>>>> install nethogs${RESET}\n"
yum install -y nethogs

# 抓包工具
printf "\n${CYAN}>>>> install tcpdump${RESET}\n"
yum install -y tcpdump

# 压缩工具
printf "\n${CYAN}>>>> install unzip${RESET}\n"
yum install -y unzip

# 版本控制工具
printf "\n${CYAN}>>>> install git${RESET}\n"
yum install -y git
printf "\n${CYAN}>>>> install subversion${RESET}\n"
yum install -y subversion

printf "\n${GREEN}<<<<<<<< 安装常用命令工具结束${RESET}\n"
```



## 常用lib库安装

```sh
#!/usr/bin/env bash
# ---------------------------------------------------------------------------------
# 控制台颜色
BLACK="\033[1;30m"
RED="\033[1;31m"
GREEN="\033[1;32m"
YELLOW="\033[1;33m"
BLUE="\033[1;34m"
PURPLE="\033[1;35m"
CYAN="\033[1;36m"
RESET="$(tput sgr0)"
# ---------------------------------------------------------------------------------
printf "${BLUE}\n"
cat << EOF
###################################################################################
# 安装常见 lib
# 如果不知道命令在哪个 lib，可以使用 yum search xxx 来查找
# lib 清单如下：
# gcc gcc-c++ kernel-devel libtool
# openssl openssl-devel
# zlib zlib-devel
# pcre
###################################################################################
EOF
printf "${RESET}\n"

printf "\n${GREEN}>>>>>>>>> 安装常见 lib 开始${RESET}\n"

printf "\n${CYAN}>>>> install gcc gcc-c++ kernel-devel libtool${RESET}\n"
yum -y install make gcc gcc-c++ kernel-devel libtool

printf "\n${CYAN}>>>> install openssl openssl-devel${RESET}\n"
yum -y install make openssl openssl-devel

printf "\n${CYAN}>>>> install zlib zlib-devel${RESET}\n"
yum -y install make zlib zlib-devel

printf "\n${CYAN}>>>> install pcre${RESET}\n"
yum -y install pcre

printf "\n${GREEN}<<<<<<<< 安装常见 lib 结束${RESET}\n"
```



## 系统检查脚本(好用)

```sh
#!/usr/bin/env bash

##############################################################################
# console color
C_RESET="$(tput sgr0)"
C_BLACK="\033[1;30m"
C_RED="\033[1;31m"
C_GREEN="\033[1;32m"
C_YELLOW="\033[1;33m"
C_BLUE="\033[1;34m"
C_PURPLE="\033[1;35m"
C_CYAN="\033[1;36m"
C_WHITE="\033[1;37m"
##############################################################################

printf "${C_PURPLE}"
cat << EOF
###################################################################################
# 系统信息检查脚本
###################################################################################
EOF
printf "${C_RESET}"

[[ $(id -u) -gt 0 ]] && echo "请用root用户执行此脚本！" && exit 1
sysversion=$(rpm -q centos-release | cut -d- -f3)
double_line="==============================================================="
line="----------------------------------------------"

# 打印头部信息
printHeadInfo() {
  cat << EOF
+---------------------------------------------------------------------------------+
|                           欢迎使用 【系统信息检查脚本】                          |
+---------------------------------------------------------------------------------+
EOF
}

# 打印尾部信息
printFootInfo() {
  cat << EOF
+---------------------------------------------------------------------------------+
|                            脚本执行结束，感谢使用！|
+---------------------------------------------------------------------------------+
EOF
}

options=( "获取系统信息" "获取服务信息" "获取CPU信息" "获取系统网络信息" "获取系统内存信息" "获取系统磁盘信息" "获取CPU/内存占用TOP10" "获取系统用户信息" "输出所有信息" "退出" )
printMenu() {
  printf "${C_BLUE}"
  printf "主菜单：\n"
  for i in "${!options[@]}"; do
    index=`expr ${i} + 1`
    val=`expr ${index} % 2`
    printf "\t(%02d) %-30s" "${index}" "${options[$i]}"
    if [[ ${val} -eq 0 ]]; then
      printf "\n"
    fi
  done
  printf "${C_BLUE}请输入需要执行的指令：\n"
  printf "${C_RESET}"
}

# 获取系统信息
get_systatus_info() {
  sys_os=$(uname -o)
  sys_release=$(cat /etc/redhat-release)
  sys_kernel=$(uname -r)
  sys_hostname=$(hostname)
  sys_selinux=$(getenforce)
  sys_lang=$(echo $LANG)
  sys_lastreboot=$(who -b | awk '{print $3,$4}')
  sys_runtime=$(uptime | awk '{print  $3,$4}' | cut -d, -f1)
  sys_time=$(date)
  sys_load=$(uptime | cut -d: -f5)

  cat << EOF
【系统信息】
系统: ${sys_os}
发行版本:   ${sys_release}
系统内核:   ${sys_kernel}
主机名:    ${sys_hostname}
selinux状态:  ${sys_selinux}
系统语言:   ${sys_lang}
系统当前时间: ${sys_time}
系统最后重启时间:   ${sys_lastreboot}
系统运行时间: ${sys_runtime}
系统负载:   ${sys_load}
EOF
}

# 获取CPU信息
get_cpu_info() {
  Physical_CPUs=$(grep "physical id" /proc/cpuinfo | sort | uniq | wc -l)
  Virt_CPUs=$(grep "processor" /proc/cpuinfo | wc -l)
  CPU_Kernels=$(grep "cores" /proc/cpuinfo | uniq | awk -F ': ' '{print $2}')
  CPU_Type=$(grep "model name" /proc/cpuinfo | awk -F ': ' '{print $2}' | sort | uniq)
  CPU_Arch=$(uname -m)
  cat << EOF
【CPU信息】
物理CPU个数:$Physical_CPUs
逻辑CPU个数:$Virt_CPUs
每CPU核心数:$CPU_Kernels
CPU型号:$CPU_Type
CPU架构:$CPU_Arch
EOF
}

# 获取服务信息
get_service_info() {
  port_listen=$(netstat -lntup | grep -v "Active Internet")
  kernel_config=$(sysctl -p 2> /dev/null)
  if [[ ${sysversion} -gt 6 ]]; then
    service_config=$(systemctl list-unit-files --type=service --state=enabled | grep "enabled")
    run_service=$(systemctl list-units --type=service --state=running | grep ".service")
  else
    service_config=$(/sbin/chkconfig | grep -E ":on|:启用" | column -t)
    run_service=$(/sbin/service --status-all | grep -E "running")
  fi
  cat << EOF
【服务信息】
${service_config}
  ${line}
运行的服务:
${run_service}
  ${line}
监听端口:
${port_listen}
  ${line}
内核参考配置:
${kernel_config}
EOF
}

# 获取系统内存信息
get_mem_info() {
  check_mem=$(free -m)
  MemTotal=$(grep MemTotal /proc/meminfo | awk '{print $2}') #KB
  MemFree=$(grep MemFree /proc/meminfo | awk '{print $2}') #KB
  let MemUsed=MemTotal-MemFree
  MemPercent=$(awk "BEGIN {if($MemTotal==0){printf 100}else{printf \"%.2f\",$MemUsed*100/$MemTotal}}")
  report_MemTotal="$((MemTotal/1024))" "MB" #内存总容量(MB)
  report_MemFree="$((MemFree/1024))" "MB" #内存剩余(MB)
  report_MemUsedPercent=$(free | sed -n '2p' | gawk 'x = int(( $3 / $2 ) * 100) {print x}' | sed 's/$/%/')

  cat << EOF
【内存信息】
内存总容量(MB): ${report_MemTotal}
内存剩余量(MB):${report_MemFree}
内存使用率: ${report_MemUsedPercent}
EOF
}

# 获取系统网络信息
get_net_info() {
  pri_ipadd=$(ip addr | awk '/^[0-9]+: / {}; /inet.*global/ {print gensub(/(.*)\/(.*)/, "\\1", "g", $2)}')
  pub_ipadd=$(curl ifconfig.me -s)
  gateway=$(ip route | grep default | awk '{print $3}')
  mac_info=$(ip link | egrep -v "lo" | grep link | awk '{print $2}')
  dns_config=$(egrep -v "^$|^#" /etc/resolv.conf)
  route_info=$(route -n)
  cat << EOF
【网络信息】
系统公网地址:${pub_ipadd}
系统私网地址:${pri_ipadd}
网关地址:${gateway}
MAC地址:${mac_info}
路由信息:
${route_info}
DNS 信息:
${dns_config}
EOF
}

# 获取系统磁盘信息
get_disk_info() {
  disk_info=$(fdisk -l | grep "Disk /dev" | cut -d, -f1)
  disk_use=$(df -hTP | awk '$2!="tmpfs"{print}')
  disk_percent=$(free | sed -n '2p' | gawk 'x = int(( $3 / $2 ) * 100) {print x}' | sed 's/$/%/')
  disk_inode=$(df -hiP | awk '$1!="tmpfs"{print}')

  cat << EOF
【磁盘信息】
${disk_info}
磁盘使用: ${disk_use}
磁盘使用百分比: ${disk_percent}
inode信息: ${disk_inode}
EOF
}

# 获取系统用户信息
get_sys_user() {
  login_user=$(awk -F: '{if ($NF=="/bin/bash") print $0}' /etc/passwd)
  ssh_config=$(egrep -v "^#|^$" /etc/ssh/sshd_config)
  sudo_config=$(egrep -v "^#|^$" /etc/sudoers | grep -v "^Defaults")
  host_config=$(egrep -v "^#|^$" /etc/hosts)
  crond_config=$(for cronuser in /var/spool/cron/*; do
    ls ${cronuser} 2> /dev/null | cut -d/ -f5; egrep -v "^$|^#" ${cronuser} 2> /dev/null;
    echo "";
  done)
  cat << EOF
【用户信息】
系统登录用户:
${login_user}
  ${line}
ssh 配置信息:
${ssh_config}
  ${line}
sudo 配置用户:
${sudo_config}
  ${line}
定时任务配置:
${crond_config}
  ${line}
hosts 信息:
${host_config}
EOF
}

# 获取CPU/内存占用TOP10
get_process_top_info() {

  top_title=$(top -b n1 | head -7 | tail -1)
  cpu_top10=$(top -b n1 | head -17 | tail -11)
  mem_top10=$(top -b n1 | head -17 | tail -10 | sort -k10 -r)

  cat << EOF
【TOP10】
CPU占用TOP10:
${cpu_top10}
内存占用TOP10:
${top_title}
  ${mem_top10}
EOF
}

show_dead_process() {
  printf "僵尸进程：\n"
  ps -al | gawk '{print $2,$4}' | grep Z
}

get_all_info() {
  get_systatus_info
  echo ${double_line}
  get_service_info
  echo ${double_line}
  get_cpu_info
  echo ${double_line}
  get_net_info
  echo ${double_line}
  get_mem_info
  echo ${double_line}
  get_disk_info
  echo ${double_line}
  get_process_top_info
  echo ${double_line}
  get_sys_user
}

main() {
  while [[ 1 ]]
  do
    printMenu
    read option
    local index=$[ ${option} - 1 ]
    case ${options[${index}]} in
      "获取系统信息")
        get_systatus_info ;;
      "获取服务信息")
        get_service_info ;;
      "获取CPU信息")
        get_cpu_info ;;
      "获取系统网络信息")
        get_net_info ;;
      "获取系统内存信息")
        get_mem_info ;;
      "获取系统磁盘信息")
        get_disk_info ;;
      "获取CPU/内存占用TOP10")
        get_process_top_info ;;
      "获取系统用户信息")
        get_sys_user ;;
      "输出所有信息")
        get_all_info > sys.log
        printf "${C_GREEN}信息已经输出到 sys.log 中。${C_RESET}\n\n"
      ;;
      "退出")
        exit ;;
      *)
        clear
        echo "抱歉，不支持此选项" ;;
    esac
  done
}

######################################## MAIN ########################################
printHeadInfo
main
printFootInfo
printf "${C_RESET}"
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207052252281.png" alt="image-20220705225247078" style="zoom:67%;" />



# Linux5种IO模型

大家好，我是老三，人生有三大难题，事业、爱情，和——这顿吃什么！人在家中躺，肚子饿得响，又到了不得不吃的时候，这顿饭该怎么吃？吃什么呢？Linux里有五种IO模型：`阻塞IO`、`非阻塞IO`、`多路复用IO`、`信号驱动式IO`和`异步IO`，我发现这五种IO模型，其实能和吃饭这件事关联起来。

## 阻塞IO（Blocking I/O）

> 阻塞IO是最常见的IO模型。当发起一个IO操作时，比如读取数据，系统会调用read()函数。如果请求的数据没有准备好，此时进程会被挂起（blocked），进入等待状态。直到数据准备好，而且复制到应用进程的缓冲区，这时候才会返回。从调用到返回，整个时间段都是阻塞的，所以被称为阻塞IO。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305111700765.png" alt="image-20230511170025666" style="zoom:67%;" />

就像是手机没电的时候，去饭馆吃饭，我点完菜，只能等着厨师做好，服务员端上来，我才能愉快干饭。这段时间，我就只能坐在座位上干等。

## 非阻塞IO（Non-Blocking I/O）

> 阻塞IO，还是比较浪费资源的，那么非阻塞IO就来了。所谓非阻塞IO，是在调用IO操作时，如果缓冲区没有数据的话，直接返回一个错误码。应用进程需要不断轮询，来检查数据是否准备好。数据准备好了，就返回数据。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305111701764.png" alt="image-20230511170116662" style="zoom:67%;" />

> 就像是我奢侈一把，想吃个西餐，于是就去了肯德基，点完餐，我就可以坐着刷刷手机。当然，我还需要时不时地看看我的餐是不是已经备好，餐备好了，就去取一下。

## 多路复用IO（I/O Multiplexing）

> 虽然非阻塞IO相比阻塞IO，性能提升了很多，但是轮询过程中，还是有大量的系统调用，上下文切换的开销比较大。那么，多路复用IO就来了。

> 多路指的是多个数据通道，复用指的是一个进程可以同时监控多个文件描述符（比如socket），当某个文件描述符状态发生变化（比如变得可读或可写），多路复用的函数将返回变化的文件描述符。这样，在数据传输过程中，同一个进程中不同的任务都能被处理。特点是在数据传输过程中，进程能够同时处理多个任务，提高了程序的效率。

> select、poll、epoll 等都是 I/O 多路复用的具体实现。以select/poll为例，进程通过将一个或多个fd传递给select或poll系统调用，阻塞在select操作上，这样select/poll可以侦测多个fd是否处于就绪状态。当有fd就绪时，立即回调函数rollback，接下来就可以进行读取。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305111701595.png" alt="image-20230511170141482" style="zoom:67%;" />

> 就像是我想吃顿好的，于是选择去吃自助餐，自助餐有很多餐区，我先看看哪个餐区有我想吃的菜，然后端着盘子去取就行了，一个人就可以取多个菜，肉、蔬菜、水果，什么都能吃一点，而且不用怎么等。

## 信号驱动式IO（Signal-Driven I/O）

> 信号驱动式IO利用信号机制来进行数据传输。进程首先告诉内核，当数据准备好时，请发送一个SIGIO信号。进程继续执行其他任务，等到收到信号后，再开始进行数据传输。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305111702900.png" alt="image-20230511170240797" style="zoom:67%;" />

> 就像是我去吃饭，外带，跟服务员打声招呼，餐好了通知我，这时候我就可以去干其它事情，餐备好之后，服务员通知我，我取餐就行了。

## 异步IO（Asynchronous I/O）

> 异步IO是指当发起一个IO操作后，系统会立即返回。异步IO操作在后台进行数据传输，数据传输完成后，系统将通知进程。这样，在整个数据传输的过程中，进程都可以执行其他任务，不需要等待。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305111704812.png" alt="image-20230511170451708" style="zoom:67%;" />

> 就像是准备吃饭了，我自己懒得动，直接在某团上点个餐，点完之后爱干啥干啥，等着快递小哥给我送到就行了。













































