



# 脚本入门

## 什么是Shell

通过编写Shell命令发送给linux内核去执行, 操作就是计算机硬件. 所以Shell命令是用户操作计算机硬件的桥梁,

Shell是命令,  类似于windows系统Dos命令

Shell是一个门程序设计语言, Shell里面含有变量, 函数, 逻辑控制语句等等

## Shell的运行过程

当用户下达指令给该操作系统的时候，实际上是把指令告诉shell，经过shell解释，处理后让内核做出相应的动作。 系统的回应和输出的信息也由shell处理，然后显示在用户的屏幕上。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042118727.png" alt="image-20200313223530826" style="zoom:80%;" />

## Shell解析器

查看linux系统centos支持的shell解析器

```shell
cat /etc/shells
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208051112448.png" alt="image-20220805101538710" style="zoom:67%;" />

介绍解析器类型

| 解析器类型                       | 介绍                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| /bin/sh                          | Bourne Shell,是UNIX最初使用的shell;                          |
| <font color=red>/bin/bash</font> | <font color=red>Bourne Again Shell它是Bourne Shell的扩展，简称bash，是LinuxOS默认shell,有灵活和强大的编辑接口，同时又很友好的用户界面，交互性很强；</font> |
| /sbin/nologin                    | 未登录解析器,  shell设置为/sbin/nologin 是用于控制用户禁止登陆系统的, 有时候有些服务，比如邮件服务，大部分都是用来接收主机的邮件而已，并不需要登陆 |
| /bin/dash                        | dash（Debian Almquist Shell），也是一种 Unix shell。它比 Bash 小，只需要较少的磁盘空间，但是它的对话性功能也较少，交互性较差。 |
| /bin/csh                         | C Shell是C语言风格Shell                                      |
| /bin/tcsh                        | 是C Shell的一个扩展版本。                                    |

> Centos默认的解析器是bash

```shell
# /bin/bash
echo $SHELL
```

> 含义:  打印输出当前系统环境使用的Shell解析器类型
>
> echo  用于打印输出数据到终端
>
> $SHELL是全局共享的读取解析器类型环境变量, 全局环境变量时所有的Shell程序都可以读取的变量,

## 编写规范⭐⭐

### 后缀名规范

> shell脚本文件就是一个文本文件,  后缀名建议使用 `.sh` 结尾
>

### 首行格式规范

首行需要设置Shell解析器的类型, 语法

```shell
#!/bin/bash
```

> 含义:  设置当前shell脚本文件采用bash解析器运行脚本代码

## 注释格式

单行注释, 语法

```shell
# 注释内容
```

多行注释, 语法

```shell
:<<!
 注释内容1
 注释内容2
!
```

## HelloWord

1、创建shell脚本文件

```shell
touch helloworld.sh
```

2、编辑文件

```shell
vim helloworld.sh
```

3、增加shell脚本文件内容如下，并保存退出

```shell
#!/bin/bash
echo "hello world"
```

4、执行脚本

```shell
sh helloworld.sh
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241003719.png" alt="image-20220924100320887" style="zoom:80%;" />

## 执行脚本3种方式⭐

### 3种方式的区别

> sh或bash执行脚本文件方式是**直接使用Shell解析器运行脚本文件, 不需要可执行权限**
>
> 仅路径方式是执行脚本文件自己, 需要可执行权限

### sh命令执行

```shell
# 相对路径
sh helloworld.sh
# 绝对路径
sh /root/helloworld.sh
```

### bash命令执行

```shell
# 相对路径效果
bash helloworld.sh
# 绝对路径效果
bash /root/shell/helloworld.sh
```

### 仅路径执行

步骤1：设置所有用户对此脚本文件增加可执行性权限

```shell
# "a+x"是权限参数，它告诉计算机要将"执行"权限（"x"）添加给"所有人"（"a"）即赋予所有人可以执行的权限
chmod a+x helloworld.sh
```

步骤2：执行脚本

```sh
# 相对路径执行命令
./helloworld.sh
# 绝对路径执行命令
/root/helloworld.sh
```

## 实战演练⭐

> 实现在/root/itheima/目录下创建一个one.txt,在one.txt文件中增加内容“Hello Shell”。
>

### 实现步骤

1、进入root目录，执行创建/root/itheima目录命令

```shell
mkdir /root/itheima
cd  /root/itheima
```

2、创建/root/batch.sh文件

```shell
touch batch.sh
```

2、编辑batch.sh文件，编写shell命令

```shell
vim batch.sh
```

3、编写命令

命令1：创建/root/itheima/one.txt文件

命令2：输出“I love Shell”字符串数据到one.txt文件中

```shell
#!/bin/bash
touch /root/itheima/one.txt  # 创建文件one.txt
echo "Hello Shell">>/root/itheima/one.txt  #输出数据到one.txt文件中
```

### 运行脚本效果

运行batch.sh脚本文件

```shell
sh batch.sh
```

查看one.txt文件内容

```shell
cat itheima/one.txt
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241021067.png" alt="image-20220924102130973" style="zoom:80%;" />

# 变量

1. 系统环境变量，是系统提供的共享变量.是linux系统加载Shell的配置文件中定义的变量共享给所有的Shell程序使用
2. 自定义变量
3. 特殊符号变量

## 系统变量

### 配置文件

1.全局配置文件

```
/etc/profile
/etc/profile.d/*.sh
/etc/bashrc
```

2.个人配置文件

```
当前用户/.bash_profile
当前用户/.bashrc
```

一般情况下，我们都是直接针对全局配置进行操作。

### 环境变量分类

在Linux系统中，环境变量按照其作用范围不同大致可以分为系统级环境变量和用户级环境变量。

> 系统级环境变量：Shell环境加载全局配置文件中的变量共享给所有用户所有Shell程序使用, 全局共享
> 用户级环境变量：Shell环境加载个人配置文件中的变量共享给当前用户的Shell程序使用, 登录用户使用

### 查看当前系统变量

查看命令

```apl
env
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241024957.png" alt="image-20220924102420718" style="zoom:80%;" />

### 查看系统变量+自定变量+函数

```shell
set
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241027607.png" alt="image-20220924102759476" style="zoom:80%;" />

### 常用系统变量⭐

| 变量名称 | 含义                                                         |
| -------- | ------------------------------------------------------------ |
| PATH     | 与windows环境变量PATH功能一样，设置命令的搜索路径，以冒号为分割 |
| HOME     | 当前用户主目录：/root                                        |
| SHELL    | 当前shell解析器类型：/bin/bash                               |
| HISTFILE | 显示当前用户执行命令的历史列表文件：/root/.bash_history      |
| PWD      | 显示当前所在路径：/root                                      |
| OLDPWD   | 显示之前的路径                                               |
| HOSTNAME | 显示当前主机名：itheima                                      |
| HOSTTYPE | 显示主机的架构，是i386、i686、还是x86、x64等：x86_64         |
| LANG     | 设置当前系统语言环境：zh_CN.UTF-8                            |

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241026220.png" alt="image-20220924102658109" style="zoom:80%;" />

### 全局环境变量配置⭐

> 当前用户进入Shell环境初始化的时候会加载全局配置文件/etc/profile里面的环境变量, 供给所有Shell程序使用
>
> 以后只要是所有Shell程序或命令使用的变量, 就可以定义在这个文件中

> 增加命令: 定义变量VAR1=VAR1 并导出为环境变量
>
> 扩展: **vim里面的命令模式使用G快速定位到文件末尾位置, 使用gg定位到文件首行位置**

```shell
vim /etc/profile
```

添加设置变量VAR1=VAR1并导出成为环境变量, 在/etc/profile文件末尾添加如下命令

```shell
# 创建环境变量
name=zhangsan
export name
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241219661.png" alt="image-20220924121918555" style="zoom:80%;" />

3、:wq保存/etc/profile退出

4、重新加载/etc/profile文件数据更新系统环境变量

```shell
source /etc/profile
```

> 注意：如果这一步不执行，无法读取更新的环境变量

5、输出环境变量VAR1

```shell
echo $name
```

## 自定义变量

### 自定义局部变量

> 就是定义在一个脚本文件中的变量, 只能在这个脚本文件中使用的变量, 就是局部变量
>

```shell
var_name=value
```

> 1. **变量名称可以有字母,数字和下划线组成, 但是不能以数字开头**
> 2. **等号两侧不能有空格**
> 3. **在bash环境中, 变量的默认类型都是字符串类型, 无法直接进行数值运算**
> 4. **变量的值如果有空格, 必须使用双引号括起来**
> 5. **不能使用Shell的关键字作为变量名称**

#### 查询 & 删除

```Shell
# 语法1: 直接使用变量名查询
$var_name
# 语法2: 使用花括号,# 区别: 花括号方式适合拼接字符串
${var_name}
```

```shell
unset var_name
```

#### 实战演示⭐

```sh
name=renshuo
# 结论:  推荐大家使用花括号才是编程好习惯
echo my name is ${name}
echo my name is ${name}123
echo my name is $name
unset name
echo my name is ${name}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241032287.png" alt="image-20220924103235187" style="zoom:80%;" />

### 自定义常量

> 就是变量设置值以后不可以修改的变量叫常量, 也叫只读变量，加上readonly即可

```apl
readonly var_name
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241035208.png" alt="image-20220924103528101" style="zoom:80%;" />

### 自定义全局变量

> 就是在当前脚本文件中定义全局变量, 这个全局变量可以在当前Shell环境与子Shell环境中都可以使用

#### 父子环境

> 例如:  有2个Shell脚本文件 A.sh 和 B.sh，如果 在A.sh脚本文件中执行了B.sh脚本文件, 那么A.sh就是父Shell环境, B.sh就是子Shell环境
>

#### 自定义全局变量语法

```Shell
export var_name1 var_name2
```

#### 案例需求

> 测试全局变量在子Shell中是否可用,  在父Shell中是否可用
>

#### 实战演练

创建demo2.sh和demo3.sh文件

```sh
touch demo2.sh demo3.sh
```

编辑demo2.sh, 里面定义变量VAR4并设置为全局, 并里面执行demo3.sh脚本文件

```shell
vim demo2.sh
```

```sh
#!/bin/bash
name1=itheima
export name1
echo "demo2.sh输出name1变量：${name1}"
bash demo3.sh
```

编辑demo3.sh,  里面打印VAR4

```shell
vim demo3.sh
```

```sh
#!/bin/bash
echo "在demo3中打印name1变量：${name1}"
```

执行脚本文件demo2.sh,  观察打印name1效果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303111359820.png" alt="image-20230311135951646" style="zoom:80%;" />

执行脚本文件后, 在交互式Shell环境打印VAR4,  观察打印VAR4效果

![image-20200608224459074](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042118615.png)



## 特殊变量⭐

### 获取输入参数：$n

#### 语法规则

> **用于接收脚本文件执行时传入的参数**

```shell
$n
# 执行脚本文件传入参数语法
sh 脚本文件 输入参数1 输入参数2 ...
```

> - $0 用于获取当前脚本文件名称的
> - $1~$9, 代表获取第一输入参数到第9个输入参数
> - 第10个以上的输入参数获取参数的格式: ${数字}, 否则无法获取

#### 案例演示

创建demo4.sh文件

```apl
touch demo4.sh
vim demo4.sh
```

编辑demo4.sh文件, 输出脚本文件名称\第一个输入参数\第二个输入参数

```sh
#!/bin/bash
echo "脚本文件名：${0}"
echo "第一个输入参数：${1}"
echo "第二个输入参数：${2}"
```

执行demo4.sh文件,输入输出参数itcast  itheima的2个输入参数, 观察效果

```apl
sh demo4.sh itcast heima
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241044971.png" alt="image-20220924104416872" style="zoom:80%;" />

### 获取输入参数个数：$#

#### 语法规则

 ```shell
# 获取所有输入参数的个数
$#
 ```

#### 案例演示

编辑demo4.sh, 输出输入参数个数

```apl
vim demo4.sh
```

```sh
#!/bin/bash
echo "脚本文件名：${0}"
echo "第一个输入参数：${1}"
echo "第二个输入参数：${2}"
echo "输入参数个数：$#"
```

执行demo4.sh传入参数看效果

```apl
sh demo4.sh itcast heima renshuo
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241051936.png" alt="image-20220924105109806" style="zoom:80%;" />

### 获取所有输入参数：$*、$@⭐

#### 语法规则

> \#含义都是获取所有输入参数, 用于以后**输出所有参数**

```shell
$*
$@
```

`$*`与`$@`区别

```shell
# 1.不使用双引号括起来, 功能一样
# $*和$@获取所有输入参数,格式为: $1 $2 ... $n

# 2.使用双引号括起来
# "$*"获取的所有参数拼接为一个字符串, 格式为: "$1 $2 ... $n"
# "$@"获取一组参数列表对象, 格式为: "$1" "$2" ... "$n"

# 使用循环打印所有输入参数可以看出区别
```

#### 循环语法

```shell
for var in 列表变量
do		 # 循环开始
   命令   # 循环体
done      # 循环结束
```

#### 案例演示

直接输出所有输入参数, 与循环方式输出所有输入参数(使用双引号包含 `$*` 与 `$@`  )

```shell
#!/bin/bash
# 命令1: 打印当前脚本文件名字
echo "当前脚本文件名称:$0"
# 命令2: 打印第1个输入参数
echo "第一个输入参数:$1"
# 命令4: 打印第10个输入参数
echo "第十个输入参数带花括号获取:${10}"
# 命令5 打印所有输入参数的个数
echo "所有输入参数个数:${#}"


# 增加命令: 实现直接输出所有输入后参数
echo '使用$*直接输出:'$*
echo '使用$@直接输出:'$@

# 增加命令: 使用$*循环打印输出所有输入参数
echo '循环遍历输出$*所有参数'
for item in "$*"
do
   echo $item
done

# 增加命令: 使用$@循环打印输出所有输入参数
echo '循环遍历输出$@所有参数'
for item in "$@"
do
   echo $item
done
```

运行观察区别

```apl
sh demo4.sh itcast heima renshuo
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241057828.png" alt="image-20220924105718671" style="zoom:80%;" />

### 获取函数返回值：$？

#### 语法规则

> **用于获取上一个Shell命令的退出状态码, 或者是函数的返回值**
>
> **每个Shell命令的执行都有一个返回值, 这个返回值用于说明命令执行是否成功**
>
> **一般来说, 返回0代表命令执行成功, 非0代表执行失败**

```shell
$?
```

#### 案例演示

输入一个正确命令, 再输出`$?`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241100478.png" alt="image-20220924110010385" style="zoom:80%;" />

输入一个错误命令, 在输出`$?`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241100927.png" alt="image-20220924110027825" style="zoom:80%;" />



### 获取当前Shell环境进程ID：$$

查看当前Shell环境进程编号

```Shell
ps -aux|grep bash
echo $$
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241213927.png" alt="image-20220924121359785" style="zoom:80%;" />

输出 $$  显示当前shell环境进程编号

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241213181.png" alt="image-20220924121309082" style="zoom:80%;" />

## 环境变量加载流程

注意：不同的工作环境加载环境变量流程不一样

![image-20200608181518841](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042118150.png)

# 字符串变量

> 字符串（String）就是一系列字符的组合。字符串是 Shell 编程中最常用的数据类型之一（除了数字和字符串，也没有其他类型了）
>

## 字符串格式

### 定义方式

> 单引号方式、**双引号方式(推荐)**、不用引号方式

```sh
age='123'
age="123"
age=123
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241228029.png" alt="image-20220924122858930" style="zoom:80%;" /> 

### 格式区别

> 单引号,  **原样输出, 不会解析里面的变量**
>
> 双引号,  **会解析里面的变量, 并且可以使用子双引号, 需要转义**
>
> 不使用引号, **也会解析里面的变量, 但是不能含有空格, 空格后面的字符串会作为命令去执行**

```sh
age=1233
echo 'abc${age}'
echo "abc${age}"
echo abc ${age}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303111531437.png" alt="image-20230311153100327" style="zoom:80%;" />

## 字符串长度

```shell
${#字符串变量名}
```

```sh
age=123
echo ${#age}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241232550.png" alt="image-20220924123238451" style="zoom:80%;" />

## 字符串拼接

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042119826.png" alt="image-20200610171003827" style="zoom:80%;" />

```sh
echo 你的年龄是${age}
echo 你的年龄是 ${age}
```

## 字符串截取⭐

| 格式                       | 说明                                                         |
| -------------------------- | ------------------------------------------------------------ |
| `${变量名:start:length}`   | 从 string 字符串的左边第 start 个字符开始，<br>向右截取 length 个字符。start从0开始 |
| `${变量名:start}`          | 从 string 字符串的左边第 start 个字符开始截取，直到最后。    |
| `${变量名:0-start:length}` | 从 string 字符串的右边第 start 个字符开始，<br>向右截取 length 个字符。start从1开始, 代表右侧第一个字符 |
| `${变量名:0-start}`        | 从 string 字符串的右边第 start 个字符开始截取，直到最后。    |
| `${变量名#*chars}`         | 从 string 字符串左边第一次出现 *chars 的位置开始，<br>截取 *chars 右边的所有字符。 |
| `${变量名##*chars}`        | 从 string 字符串左边最后一次出现 *chars 的位置开始，<br>截取 *chars 右边的所有字符。 |
| `${变量名%chars*}`         | 从 string 字符串右边第一次出现 chars* 的位置开始，<br>截取 chars* 左边的所有字符。 |
| `${变量名%%chars*}`        | 从 string 字符串右边最后一次出现 chars* 的位置开始，<br>截取 chars* 左边的所有字符 |

> 字符串"welcome to itheima"
>

```shell
var1="welcome to itheima"
# 从左侧第0个开始,向左截取2个字符：we
echo ${var1:0:2}
# 从左侧第11个开始,向左截取所有字符：itheima
echo ${var1:11}
# 从右侧第5个开始,向右截取2个字符：he
echo ${var1:0-5:2}
# 截取左边第一次出现字符e右边的所有字符：lcome to itheima
echo ${var1#*e}
# 截取左边最后一次出现字符e右边的所有字符：ima
echo ${var1##*e}
# 截取右边第一次次出现字符e左边的所有字符：welcome to ith
echo ${var1%e*}
# 截取右边最后一次出现字符e左边的所有字符：w
echo ${var1%%e*}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241244437.png" alt="image-20220924124401289" style="zoom:80%;" />



# 索引数组变量

> 注意Bash Shell 只支持一维数组，不支持多维数组。

## 数组定义

> 在 Shell 中，用括号`( )`来表示数组，数组元素之间用空格来分隔，注意，赋值号 `=` 两边不能有空格

1.定义数组，两种方式，内容随便，shell是弱类型

```shell
# 1、定义数字存储100,3,22,58,77,17,20
arr=(29 100 13 8 91)
# 2、指定元素赋值初始化，由于只赋值了3个元素, 所以数组的长度是3
arr1=([0]=1 [2]=100 [4]=renshuo)
# 3、Shell 是弱类型的，它并不要求所有数组元素的类型必须相同
arr3=(20 56 "http://www.itcast.cn/")
```

2.Shell数组元素定义后不是固定的,  定义后还可以赋值

```shell
arr[6]=100
```

## 数组元素获取

1.通过下标获取元素值,index从0开始

```shell
${arr[index]}
```

> 注意使用`{ }`

2.获取值同时复制给其他变量

```shell
item=${arr[index]}
```

3.使用 `@` 或 `*` 可以获取数组中的所有元素

```shell
${arr[@]}
${arr[*]}
```

4.获取数组的长度或个数

```shell
${#arr[@]}
${#arr[*]}
```

5.获取数组指定元素的字符长度

```shell
${#arr[索引]}
```

## 数组拼接

所谓 Shell 数组拼接（数组合并），就是将两个数组连接成一个数组

使用 `@` 和 `*` 获取数组所有元素之后进行拼接

```shell
array_new=(${array1[@]} ${array2[@]} ...)
array_new=(${array1[*]} ${array2[*]} ...)
```

```sh
nums=(29 100 13 8 91 44)
nums2=(29 100 13 8 91 44)
nums3=(${nums[@]} ${nums2[@]})
echo ${nums3[@]}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241257955.png" alt="image-20220924125740840" style="zoom:80%;" />

## 数组删除

删除数组指定元素数据和删除整个数组数据

**删除数组指定元素数据**

```shell
unset array_name[index]
unset arr[1]
```

**删除整个数组**

```shell
unset array_name
```

# 内置命令⭐

## 内置命令介绍

Shell 内置命令，就是由 Bash Shell 自身提供的命令，而不是文件系统中的可执行脚本文件。

使用type 来确定一个命令是否是内置命令：

```apl
type 命令
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042119135.png" alt="image-20200630083936549" style="zoom:80%;" />

> 通常来说，内置命令会比外部命令执行得更快，执行外部命令时不但会触发磁盘 I/O，还需要 fork 出一个单独的进程来执行，执行完成后再退出。而执行内置命令相当于调用当前 Shell 进程的一个函数, 还是在当前Shell环境进程内, 减少了上下文切换。
>

## 内置命令列表

| 命令        | 说明                                                  |
| ----------- | ----------------------------------------------------- |
| :           | 扩展参数列表，执行重定向操作                          |
| .           | 读取并执行指定文件中的命令（在当前 shell 环境中）     |
| ==alias==   | 为指定命令定义一个别名                                |
| bg          | 将作业以后台模式运行                                  |
| bind        | 将键盘序列绑定到一个 readline 函数或宏                |
| break       | 退出 for、while、select 或 until 循环                 |
| builtin     | 执行指定的 shell 内建命令                             |
| caller      | 返回活动子函数调用的上下文                            |
| cd          | 将当前目录切换为指定的目录                            |
| command     | 执行指定的命令，无需进行通常的 shell 查找             |
| compgen     | 为指定单词生成可能的补全匹配                          |
| complete    | 显示指定的单词是如何补全的                            |
| compopt     | 修改指定单词的补全选项                                |
| continue    | 继续执行 for、while、select 或 until 循环的下一次迭代 |
| ==declare== | 声明一个变量或变量类型。                              |
| dirs        | 显示当前存储目录的列表                                |
| disown      | 从进程作业表中刪除指定的作业                          |
| ==echo==    | 将指定字符串输出到 STDOUT                             |
| enable      | 启用或禁用指定的内建shell命令                         |
| eval        | 将指定的参数拼接成一个命令，然后执行该命令            |
| exec        | 用指定命令替换 shell 进程                             |
| ==exit==    | 强制 shell 以指定的退出状态码退出                     |
| export      | 设置子 shell 进程可用的变量                           |
| fc          | 从历史记录中选择命令列表                              |
| fg          | 将作业以前台模式运行                                  |
| getopts     | 分析指定的位置参数                                    |
| hash        | 查找并记住指定命令的全路径名                          |
| help        | 显示帮助文件                                          |
| history     | 显示命令历史记录                                      |
| jobs        | 列出活动作业                                          |
| kill        | 向指定的进程 ID(PID) 发送一个系统信号                 |
| let         | 计算一个数学表达式中的每个参数                        |
| local       | 在函数中创建一个作用域受限的变量                      |
| logout      | 退出登录 shell                                        |
| mapfile     | 从 STDIN 读取数据行，并将其加入索引数组               |
| popd        | 从目录栈中删除记录                                    |
| printf      | 使用格式化字符串显示文本                              |
| pushd       | 向目录栈添加一个目录                                  |
| pwd         | 显示当前工作目录的路径名                              |
| ==read==    | 从 STDIN 读取一行数据并将其赋给一个变量               |
| readarray   | 从 STDIN 读取数据行并将其放入索引数组                 |
| readonly    | 从 STDIN 读取一行数据并将其赋给一个不可修改的变量     |
| return      | 强制函数以某个值退出，这个值可以被调用脚本提取        |
| set         | 设置并显示环境变量的值和 shell 属性                   |
| shift       | 将位置参数依次向下降一个位置                          |
| shopt       | 打开/关闭控制 shell 可选行为的变量值                  |
| source      | 读取并执行指定文件中的命令（在当前 shell 环境中）     |
| suspend     | 暂停 Shell 的执行，直到收到一个 SIGCONT 信号          |
| test        | 基于指定条件返回退出状态码 0 或 1                     |
| times       | 显示累计的用户和系统时间                              |
| trap        | 如果收到了指定的系统信号，执行指定的命令              |
| type        | 显示指定的单词如果作为命令将会如何被解释              |
| typeset     | 声明一个变量或变量类型。                              |
| ulimit      | 为系统用户设置指定的资源的上限                        |
| umask       | 为新建的文件和目录设置默认权限                        |
| unalias     | 刪除指定的别名                                        |
| unset       | 刪除指定的环境变量或 shell 属性                       |
| wait        | 等待指定的进程完成，并返回退出状态码                  |

## alias设置别名⭐

> alisa 用于给命令创建别名。**可以将经常操作比较复杂的命令进行设置别名, 通过别名的操作提高工作效率**
>

### 定义 | 删除别名

```shell
# 设置别名
alias 别名="命令"
# 删除指定的别名
unalias 别名
# 删除当前Shell环境中所有别名
unalias -a
```

> 注意:  以上2种方式删除都是临时删除当前Shell的别名,  如果想永久删除必须去配置文件中手动删除

### 查看全部别名

上面是系统为了方便命令操作默认将部分命令创建为别名  `ll` 的命令与`ls -l`的效果一样,   就是因为ll是别名

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303111553591.png" alt="image-20230311155316470" style="zoom:80%;" />

### 持久化别名⭐

```sh
vi /etc/profile
# 直接在最后写入如下内容
alias psa='ps -aux'
# 刷新配置文件
source /etc/profile
# 使用命令能够实现上面ps -aux效果
psa
```

### 实战演练⭐

输出所有进程信息

```shell
# 基础命令
ps -aux
# 给上面的命令起别名为psList, 并使用psList输出
alias psList='ps -aux'
# 使用别名，作用就是基础命令
psList
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241528826.png" alt="image-20220924152851666" style="zoom:80%;" />

删除psList别名

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241530929.png" alt="image-20220924153046823" style="zoom:80%;" />

## echo输出字符串

> echo 是一个 Shell 内置命令，用于在终端输出字符串，并在最后默认加上换行符
>

```shell
# 默认输出换行语法
echo "Hello World"
echo "Hello World，${name}"

# -n：不在输出末尾添加换行符
echo -n 字符串

# -e：输出带有转义字符的文本
echo -e "Hello\tWorld\nGoodbye"

# \c：用于强制清除echo的结尾换行输出
echo -e "hello world\c"
```

## read读取控制台输入

> read 是 Shell 内置命令，用于从标准输入中读取数据并赋值给变量。如果没有进行重定向，默认就是从终端控制台读取用户输入的数据；如果进行了重定向，那么可以从文件中读取数据。

### 基本语法

```apl
read [-options] [var1 var2 ...]
```

> `options`表示选项，如下表所示；`var`表示用来存储数据的变量，可以有一个，也可以有多个。
>
> `options`和`var`都是可选的，如果没有提供变量名，那么读取的数据将存放到环境变量 `REPLY` 变量中。
>
> $REPLY保存read最后一个读入命令的数据

options支持的参数

| 选项         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| -a array     | 把读取的数据赋值给数组 array，从下标 0 开始。                |
| -d delimiter | 用字符串 delimiter 指定读取结束的位置，而不是一个换行符（读取到的数据不包括 delimiter）。 |
| -e           | 在获取用户输入的时候，对功能键进行编码转换，不会直接显式功能键对应的字符。 |
| -n num       | 读取 num 个字符，而不是整行字符。                            |
| -p  prompt   | 显示提示信息，提示内容为 prompt。                            |
| -r           | 原样读取（Raw mode），不把反斜杠字符解释为转义字符。         |
| -s           | 静默模式（Silent mode），不会在屏幕上显示输入的字符。<br>当输入密码和其它确认信息的时候，这是很有必要的。 |
| -t seconds   | 设置超时时间，单位为秒。如果用户没有在指定时间内输入完成，<br>那么 read 将会返回一个非 0 的退出状态，表示读取失败。 |
| -u fd        | 使用文件描述符 fd 作为输入源，而不是标准输入，类似于重定向。 |

### 示例1：多个变量赋值

> 使用read命令读取数据,要有提示信息"请输入姓名,年龄,爱好:" 将数据赋值给多个变量，打印每一个变量的值

编辑文件

```shell
vim read1.sh
```

read1.sh文件内容

```shell
#!/bin/bash
read -p "请输入姓名,年龄,爱好: " name age hobby
echo "姓名：$name"
echo "年龄：$age"
echo "爱好：$hobby"
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241509302.png" alt="image-20220924150919156" style="zoom:80%;" />

### 示例2：读取一个字符

> 使用read命令读取数据,要有提示信息"您确定要删除数据吗?(请输入y/n):" 并且设置读取一个字符打印这个字符输出

```shell
vim read2.sh
```

read2.sh文件内容

```shell
#!/bin/bash
# char不是数据类型，而是接收的一个字符
read -n 1 -p '请输入一个字符: ' var1
printf '\n'
echo '你输入的字符为:'$var1
```

> - `-n 1`：表示只读取一个字符。
>- `-p '请输入一个字符: '`：表示在读取用户输入之前，输出提示信息"请输入一个字符："。
> - `var1`：表示将读取的字符赋值给变量`var1`。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241515514.png" alt="image-20220924151546403" style="zoom:80%;" />

### 示例3：限制时间输入

> 在终端控制台输入时, 设置指定时间内输入密码，read限制时间输入：`read -t 秒数 var1`
>

编辑文件read3.sh脚本文件

```shell
# 使用read命令读取数据,要有提示信息"请输入密码(20秒内):" 并且设置限制时间20秒
# 输出一个换行
# 使用read命令读取数据,要有提示信息"请再次输入密码(20秒内):" 并且设置限制时间20秒
# 输出一个换行
# 校验密码与再次输入的密码是否一致
```

```shell
vim read3.sh
```

read3.sh文件内容

```shell
#!/bin/bash
read -t 20 -sp '请输入密码(20秒内):' pwd1
printf '\n'
read -t 20 -sp '请再次输入密码(20秒内):' pwd2
printf '\n'
if
        [ $pwd1 == $pwd2 ]
then
        echo '密码与确认密码一致, 验证通过'
else
        echo '密码与确认密码不一致,验证失败'
fi
```

执行文件运行效果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241518559.png" alt="image-20220924151850452" style="zoom:80%;" />

### 示例4：读取并赋值给数组

```sh
#!/bin/bash

# 定义一个空数组
my_array=()

# 循环读取用户输入
for ((i=0; i<3; i++)); do
  echo "请输入第 $((i+1)) 个值："
  read input_value
  my_array[$i]=$input_value
done

# 输出数组的值
echo "数组的值为："
echo "${my_array[@]}"
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303111631824.png" alt="image-20230311163131669" style="zoom:80%;" />

## exit退出

> exit用于退出当前Shell环境进程结束运行, 并且可以返回一个状态码.一般使用 `$?` 可以获取退出状态码。比如执行一个脚本文件里面操作一个文件时，可以返回1 表示文件不存在，2 表示文件没有读取权限，3 表示文件类型不对

### 基本语法

正确退出语法

```shell
exit  # 默认返回状态码0, 一般代表命令执行成功
```

错误退出语法

```shell
exit 非0数字 # 数字建议的范围0~255,  一般代表命令执行失败
```

### 示例：使用exit退出

> 编写Shell脚本使用exit 退出,  退出时返回一个非0数字状态值,  执行脚本文件并打印返回状态值
>

编辑文件

```shell
vim exit.sh
```

exit.sh文件内容: 使用`exit 数字` 退出结束当前Shell

```shell
#!/bin/bash
echo 'one'
exit 6
echo 'two'
```

运行效果

![image-20200630150541964](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042119488.png)

## declare设置变量属性

> declare命令用于声明 shell 变量。可用来声明变量并设置变量的属性，也可用来显示shell函数。若不加上任何参数，则会显示全部的shell变量与函数(与执行set指令的效果相同)。
>

### declare命令作用

> 1.declare设置变量的属性[重要]
>
> 2.查看全部Shell变量与函数
>
> 3.实现关联数组变量[重要]

### declare语法

#### 设置语法

```apl
declare [+/-][aArxif][变量名称＝设置值]
```

> +/- 　"-"可用来指定变量的属性，"+"则是取消变量所设的属性。
>
> a    array,设置为普通索引数组
>
> A    Array,设置为key-value关联数组
>
> r 　readonly,将变量设置为只读,  也可以使用readonly
>
> x 　exprot,设置变量成为全局变量，也可以使用export
>
> i 　int,设置为整型变量。
>
> f     function,设置为一个函数变量

#### 查看全部Shell变量与函数语法

```apl
declare [-fF]
```

> declare 后无参数, 查询全部Shell变量与函数定义, 与set功能一模一样
>
> -f 　查询仅显示函数定义。
>
> -F    查询仅显示函数名字

#### key-value关联数组变量语法

关联数组也称为“键值对（key-value）”数组，键（key）也即字符串形式的数组下标，值（value）也即元素值。

```shell
declare -A 关联数组变量名=([字符串key1]=值1 [字符串key2]=值2 ...)
```

> declare也可以用于定义普通索引数组,  `-a` 参数创建普通或索引数组   `-A` 创建关联数组
>
> `declare -a 关联数组变量名=(值1 值2 ...)`
>
> `declare -a 关联数组变量名=([0]=值1 [1]=值2 ...)`

获取指定key的值

```shell
${关联数组变量名[key]}
```

获取所有值

```shell
${关联数组变量名[*]} # 方式1
${关联数组变量名[@]} # 方式2
```



### 示例1：设置变量属性

> 操作一个变量属性,  设置为整型\ 取消整型\设置为只读等操作
>

> 1. 使用declare设置一个整型变量并赋值
> 2. 取消变量的整型类型, 尝试设置其他类型值尝试
> 3. 设置变量只读, 尝试赋值测试

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042119492.png" alt="image-20200630164537518" style="zoom:80%;" />

### 示例2：查看当前Shell所有函数名

查看所有变量与所有函数

```apl
declare
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042119500.png" alt="image-20200701093735283" style="zoom:80%;" />

查看所有函数与定义

```shell
declare -f
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042119503.png" alt="image-20200701094119327" style="zoom:80%;" />

查询所有函数名列表

```shell
declare -F
```

![image-20200701094553443](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042119210.png)



### 示例3：实现普通索引数组

> 使用declare定义一普通数组,并获取打印元素数据的值
>

1.创建declare1.sh文件

2.编辑declare1.sh文件内容,  使用declare定义普通数组数据与打印

2.执行文件

```shell
vim declare1.sh
```

declare1.sh文件内容

```shell
#!/bin/bash
declare -a arr1=(1 2 3 aa)
echo ${arr1[1]}
echo ${arr1[*]}

declare -a arr2=([0]=1 [1]=2  [2]=3  [4]=aa)
echo ${arr2[1]}
echo ${arr2[*]}

declare -a arr2[3]=4
echo ${arr2[*]}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042119215.png" alt="image-20200701101651788" style="zoom:80%;" />

### 示例4：实现key-value关联数组

> 使用declare定义关联数组并打印输出
>

```sh
#!/bin/bash
# 创建索引数组
echo "创建索引数组"
declare -a array1=(100 abc "itheima")
# 获取索引数组数据
echo "获取array1数组第3个元素: ${array1[2]}"
echo "打印array1数组所有元素:${array1[*]}"

echo 

# 创建关联数组
echo "创建关联数组"
declare -A array2=(["one"]=100 ["two"]=abc ["itcast"]="itheima")
# 获取索引数组数据
echo "获取array2数组key="itcast"元素: ${array2["itcast"]}"
echo "打印array2数组所有元素:${array2[@]}"
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241600666.png" alt="image-20220924160044527" style="zoom:80%;" />

> 注意: 使用参数`-A`  才是关联数组  , 关联数组无法使用索引获取
>

![image-20200701105943576](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042119217.png)

![image-20200708093710733](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042119224.png)



# 运算符

## 算术运算符

> 原生bash不支持简单的数学运算，但是可以通过其他命令来实现，例如 awk 和 expr，expr 最常用。expr 是一款表达式计算工具，使用它能完成表达式的求值操作。

### 基本语法

```shell
# 例如，两个数相加
#!/bin/bash
# 注意使用的是反引号 ` 而不是单引号 '，只能进行整数运算，不能小数运算
# `expr 算术运算符表达式`,运算符表达式中每个数字与符号之间要有空格
val = `expr 2 + 2`
echo "两数之和为 : $val"
```

```
两数之和为 : 4
```

> - 表达式和运算符之间要有空格，例如 2+2 是不对的，必须写成 2 + 2
> - 完整的表达式要被反引号包含，注意这个字符不是常用的单引号，在 Esc 键下边。

### 实战演示

> - 乘号前边必须加反斜杠才能实现乘法运算；
> - if...then...fi 是条件语句，后续将会讲解。
> - 在 MAC 中 shell 的 expr 语法是：$((表达式))，此处表达式中的 "*" 不需要转义符号 "" 。

```sh
#!/bin/bash
# 使用read命令读取输入2个数字，-p：输入一个字符
read -p "请输入第一个数字:" a
read -p "请输入第二个数字:" b

# 对2个数字进行算术运算
echo "a=${a},b=${b}"
echo "a+b=`expr $a + $b`"
echo "a-b=`expr $a - $b`"
echo "a*b=`expr $a \* $b`"
echo "b/a=`expr $b / $a`"
echo "b%a=`expr $b % $a`"
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241607089.png" alt="image-20220924160719953" style="zoom:80%;" />



## 整数比较运算符

### 语法规则

下表列出了常用的比较运算符，假定变量 a 为 1，变量 b 为 2：

| 运算符 | 说明                                                         | 举例                     |
| :----- | :----------------------------------------------------------- | :----------------------- |
| `-eq`  | equals 检测两个数是否相等，相等返回 0, 否则返回1。           | `[ $a -eq $b ]` 返回 1。 |
| `-ne`  | not equals检测两个数是否不相等，不相等返回 true。            | `[ $a -ne $b ]` 返回 0。 |
| `-gt`  | greater than检测左边的数是否大于右边的,<br>是返回0, 否则1    | `[ $a -gt $b ]` 返回 1。 |
| `-lt`  | lower than检测左边的数是否小于右边的,<br>是返回0, 否则1      | `[ $a -lt $b ]` 返回 0。 |
| `-ge`  | greater equals检测左边的数是否大于等于右边的,<br>是返回0, 否则1 | `[ $a -ge $b ] `返回 1。 |
| `-le`  | lower equals检测左边的数是否小于等于右边的,<br>是返回0, 否则1 | `[ $a -le $b ] `返回 0。 |
| `<`    | 检测左边的数是否小于右边的,<br/>是返回0, 否则1               | `(($a<$b))` 返回0        |
| `<=`   | 检测左边的数是否小于等于右边的,<br/>是返回0, 否则1           | `(($a<=$b))` 返回0       |
| `>`    | 检测左边的数是否大于右边的,<br/>是返回0, 否则1               | `(($a>$b))` 返回1        |
| `>=`   | 检测左边的数是否大于等于右边的,<br/>是返回0, 否则1           | `(($a>=$b))` 返回1       |
| `==`   | 检测左边的数是否等于右边的,<br/>是返回0, 否则1               | `(($a==$b))` 返回1       |
| `!=`   | 检测左边的数是否不等于右边的,<br/>是返回0, 否则1             | `(($a!=$b))` 返回0       |

> 注意:
>
> 整数比较运算符只支持整数，不支持小数与字符串(字符串比较后续讲解)，除非字符串的值是整数数字。
>
> 每个命令都有返回值,  这个后面我们会讲解退出状态再具体说明,  返回0代表成功, 返回1代表失败

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241612958.png" alt="image-20220924161249812" style="zoom:80%;" />

### 案例演示⭐

```shell
#!/bin/bash
a=1 b=2
echo "a=${a} b=${b}"
if [ $a -eq $b ]
then
   echo "$a -eq $b : a 等于 b"
else
   echo "$a -eq $b: a 不等于 b"  # 输出这个
fi
if [ $a -ne $b ]
then
   echo "$a -ne $b: a 不等于 b"  # 输出这个
else
   echo "$a -ne $b : a 等于 b"
fi
if [ $a -gt $b ]
then
   echo "$a -gt $b: a 大于 b"
else
   echo "$a -gt $b: a 不大于 b"  # 输出这个
fi
if [ $a -lt $b ]
then
   echo "$a -lt $b: a 小于 b"   # 输出这个
else
   echo "$a -lt $b: a 不小于 b"
fi
if [ $a -ge $b ]
then
   echo "$a -ge $b: a 大于或等于 b"
else
   echo "$a -ge $b: a 小于 b"  # 输出这个
fi
if [ $a -le $b ]
then
   echo "$a -le $b: a 小于或等于 b"  # 输出这个
else
   echo "$a -le $b: a 大于 b"
fi

if (($a > $b))
then
   echo "$a > $b: a 大于 b"
else
   echo "$a > $b: a 不大于 b"
fi
if (($a < $b))
then
   echo "$a < $b: a 小于 b"
else
   echo "$a < $b: a 不小于 b"
fi
if (($a >= $b))
then
   echo "$a >= $b: a 大于或等于 b"
else
   echo "$a >= $b: a 小于 b"
fi
if (($a <= $b))
then
   echo "$a <= $b: a 小于或等于 b"
else
   echo "$a <= $b: a 大于 b"
fi
```

运行效果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241609977.png" alt="image-20220924160904836" style="zoom:80%;" />

## 字符串比较运算符

> 可以比较2个变量, 变量的类型可以为数字（整数，小数）与字符串
>

### 语法规则

下表列出了常用的字符串运算符，假定变量 a 为 "abc"，变量 b 为 "efg"：

字符串比较可以使用 `[[]]` 和 `[]` 2种方式

| 运算符  | 说明                                                         | 举例                                                         |
| :------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| == 或 = | 相等。用于比较两个字符串或数字，相同则返回 0。可以使用`=`    | `[ $a == $b ] `返回1 <br>`[  $a = $b ]` 返回 1<br>`[[ $a == $b ]]` 返回1<br>`[[ $a = $b ]]` 返回1 |
| !=      | 不相等。用于比较两个字符串或数字，不相同则返回 0。           | `[ $a != $b ]` 返回 0<br>`[[ $a != $b ]]` 返回 0             |
| <       | 小于, 用于比较两个字符串或数字， 小于返回0， 否则返回1       | `[ $a \< $b ]` 返回 0<br/>`[[ $a < $b ]]` 返回 0             |
| >       | 大于, 用于比较两个字符串或数字， 大于返回0， 否则返回1       | `[ $a \> $b ]` 返回 1<br/>`[[ $a > $b ]]` 返回 1             |
| -z      | 检测字符串长度是否为0，如果长度为0返回则返回0, 否则返回1。   | [ -z $a ] 返回 false。                                       |
| -n      | 检测字符串长度是否不为 0，如果长度不为 0 则返回0, 否则返回1。 | [ -n "$a" ] 返回 true。                                      |
| $       | 检测字符串是否不为空，不为空返回0, 为空返回1。               | [ $a ] 返回 true。                                           |

> 字符串比较没有 `<=`  可以通过 `[[ "a" < "b" && "a" == "b" ]]`

### 实战演示

```shell
#!/bin/bash

a="itheima" b="itcast" c=1 d=2
echo "a=${a},b=${b},c=${c},d=${d}"

if [ $a = $b ]
then
   echo "$a = $b : a 等于 b"
else
   echo "$a = $b: a 不等于 b"
fi

if [ $a != $b ]
then
   echo "$a != $b : a 不等于 b"
else
   echo "$a != $b: a 等于 b"
fi

if [[ $a > $b ]]
then
   echo "$a > $b : a 大于 b"
else
   echo "$a > $b: a 不大于 b"
fi

if [ $a \> $b ]
then
   echo "$a > $b : a 大于 b"
else
   echo "$a > $b: a 不大于 b"
fi

if [[ $c > $d ]]
then
   echo "$c > $d : c 大于 d"
else
   echo "$c > $d: c 不大于 d"
fi

if [ -z $a ]
then
   echo "-z $a : 字符串长度为 0"
else
   echo "-z $a : 字符串长度不为 0"
fi

if [ -n "$a" ]
then
   echo "-n $a : 字符串长度不为 0"
else
   echo "-n $a : 字符串长度为 0"
fi

if [ $a ]
then
   echo "$a : 字符串不为空"
else
   echo "$a : 字符串为空"
fi
```

运行效果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241616215.png" alt="image-20220924161629079" style="zoom:80%;" />

## 布尔运算符

### 语法示例

| 运算符 | 说明                                                         | 举例                     |
| :----- | :----------------------------------------------------------- | :----------------------- |
| !      | 非运算，取反, 表达式为 true 则返回 false，<br>否则返回 true。 | `[ ! 表达式 ]` 取反。    |
| -o     | or 或运算，有一个表达式为 true 则返回 true。                 | `[ 表达式1 -o 表达式2 ]` |
| -a     | and 与运算，两个表达式都为 true 才返回 true。                | `[ 表达式1 -a 表达式2 ]` |

> 注意布尔运算符放在`[]` 或 与test命令配合使用才有效
>
> 布尔运算符常与与test命令配合使用, 后续讲解

### 案例演示

```shell
#!/bin/bash
a=1 b=2
# $a 小于 2 且 $b 大于 10
if [ $a -lt 2 -a $b -gt 10 ]
then
   echo "$a 小于 2 且 $b 大于 10 : 返回 true"   
else
   echo "$a 小于 2 且 $b 大于 10 : 返回 false"  # $b -gt 10不成立, 输出这个表达式
fi
# $a 小于 10 或 $b 大于 10
if [ $a -lt 10 -o $b -gt 10 ]
then
   echo "$a 小于 10 或 $b 大于 10 : 返回 true"  # $a -lt 10 成立, 输出这个表达式
else
   echo "$a 小于 10 或 $b 大于 10 : 返回 false"
fi
# $a 大于 $b 取反
if [ ! $a -gt $b ]
then
   echo "$a 大于 $b 取反 : 返回 true"
else
   echo "$a 大于 $b 取反 : 返回 false"   # $a -gt $b 为true , 取反为false, 输出这个表达式
fi
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241623736.png" alt="image-20220924162321619" style="zoom:80%;" />



## 逻辑运算符

### 语法介绍

| 运算符 | 说明       | 举例                       |
| :----- | :--------- | :------------------------- |
| &&     | 逻辑的 AND | `[[ 表达式1 && 表达式2 ]]` |
| `||`   | 逻辑的 OR  | `[[ 表达式1 || 表达式2 ]]` |
| !      | 逻辑非     | `[[ ! 表达式 ]]`           |

> 使用`&&`  和  `||`  的运算符必须放在 `[[]]`  或 `(())`中才有效, 否则报错
>
> `!` 可以用在`[]`,`[[]]`中, 不可以在(())

### 案例演示

```shell
#!/bin/bash

a=1 b=2

if [[ $a -lt 10 && $b -gt 10 ]]
then
   echo "返回 true" 
else
   echo "返回 false"  # $b -gt 10 不成立, 输出false
fi

if [[ $a -lt 10 || $b -gt 10 ]]
then
   echo "返回 true"   # $a -lt 10 成立,  输出true
else
   echo "返回 false"  
fi
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241625703.png" alt="image-20220924162527586" style="zoom:80%;" />



## 文件测试运算符⭐

> 能够使用常用文件测试运算符检查文件
>
> 例如:  文件是否存在\是否可读\是否可执行\是否为空\是否可写\是否是目录\是否是普通文件

### 文件类型

> -：普通文件、d：目录文件、l：链接文件、b：块设备文件、c：字符设备文件、p：管道文件

> 块设备文件: 比如计算机硬盘/dev/sda
>
> ![image-20200708123349968](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042119794.png)
>
> 字符设备文件: 比如计算机的USB文件/dev/usb
>
> <img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241650819.png" alt="image-20220924165036700" style="zoom:80%;" />
>
> 设备文件都是对应计算机硬件的,  不同的设备文件代表不同的传输数据方式

### 语法介绍

| 操作符          | 说明                                                         | 举例                    |
| :-------------- | :----------------------------------------------------------- | :---------------------- |
| -b file         | 检测文件是否是块设备文件，如果是，则返回 true。              | [ -b $file ] 返回 false |
| -c file         | 检测文件是否是字符设备文件，如果是，则返回 true。            | [ -c $file ] 返回 false |
| ==-d file==     | directory, 检测文件是否是目录，如果是，则返回 true。         | [ -d $file ] 返回 false |
| ==-f file==     | file, 检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回 true。 | [ -f $file ] 返回 true  |
| -g file         | 检测文件是否设置了 SGID 位，如果是，则返回 true。            | [ -g $file ] 返回 false |
| -k file         | 检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true。  | [ -k $file ] 返回 false |
| -p file         | 检测文件是否是有名管道文件，如果是，则返回 true。            | [ -p $file ] 返回 false |
| -u file         | 检测文件是否设置了 SUID 位，如果是，则返回 true。            | [ -u $file ] 返回 false |
| ==-r file==     | read,检测文件是否可读，如果是，则返回 true。                 | [ -r $file ] 返回 true  |
| ==-w file==     | write,检测文件是否可写，如果是，则返回 true。                | [ -w $file ] 返回 true  |
| ==-x file==     | execute, 检测文件是否可执行，如果是，则返回 true。           | [ -x $file ] 返回 true  |
| ==-s file==     | size, 检测文件是否为空（文件大小是否大于0），不为空返回 true | [ -s $file ] 返回 true  |
| ==-e file==     | exists, 检测文件（包括目录）是否存在，如果是，则返回 true。  | [ -e $file ] 返回 true  |
| file1 -nt file2 | new than(nt),  file1是否比file2新                            | [ file1 -nt file2 ]     |
| file1 -ot file2 | old than(ot), file1是否比file2旧                             | [ file1 -ot file2 ]     |

其他检查符：

- -S: 判断某文件是否 socket。
- -L: link, 检测文件是否存在并且是一个符号链接。

```sh
[ options 文件路径字符串]
或
[[ options 文件路径字符串 ]]
```

### 案例演示

```sh
#!/bin/bash

file1="/root/docker-compose.yml"
file2="/root/net.sh"

# 测试文件是否可写
if [[ -w $file1 ]]
then 
    echo "file1文件可写"
else 
    echo "file1文件不可写"
fi

# 测试文件是否读
if [[ -r $file1 ]]
then 
    echo "file1文件可读"
else 
    echo "file1文件不可读"
fi


# 测试文件是否可执行
if [[ -x $file1 ]]
then 
    echo "file1文件可执行"
else 
    echo "file1文件不可执行"
fi


# 测试文件是否是普通文件
if [[ -f $file1 ]]
then 
    echo "file1文件是普通文件"
else 
    echo "file1文件不是普通文件"
fi

# 测试文件是否为空
if [[ -s $file1 ]]
then 
    echo "file1文件不为空"
else 
    echo "file1文件为空"
fi

# 测试文件是否存在
if [[ -e $file1 ]]
then 
    echo "file1文件存在"
else 
    echo "file1文件不存在"
fi


# 测试文件是否是目录
if [[ -d $file1 ]]
then 
    echo "file1是目录"
else 
    echo "file1不是目录"
fi


# 测试文件1是否比文件2新
if [[ $file1 -nt $file2 ]]
then 
    echo "file1比file2新"
else 
    echo "file1比file2旧"
fi
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241647357.png" alt="image-20220924164736228" style="zoom:80%;" />



# 重要判断&执行符

## [[ ]]

`[[ ]]`: 是一个bash shell的关键字，用于测试条件表达式，支持高级表达式匹配和操作，例如`[[ $var == "abc" ]]`，比`[ $var = "abc" ]`更灵活。`[[ ]]`支持`&&`、`||`、`<`、`>`、`<=`、`>=`、`=~`等操作符，还支持文件名通配符和正则表达式等功能。在`[[ ]]`中使用变量时，不需要加引号，因为其中的变量扩展是不会被分割的。`[[ ]]`是bash shell中的扩展功能，不适用于其他的shell。

字符串比较

```sh
if [[ "$str1" == "$str2" ]]; then
    echo "str1 equals to str2"
fi
```

模式匹配

```sh
if [[ "$str" == foo* ]]; then
    echo "str starts with foo"
fi
```

文件名扩展

```sh
if [[ -d /path/to/dir ]]; then
    echo "/path/to/dir exists and is a directory"
fi
```

正则表达式匹配

```sh
if [[ "$str" =~ pattern ]]; then
    echo "str matches pattern"
fi
```

数值比较

```sh
if [[ "$num1" -eq "$num2" ]]; then
    echo "num1 equals to num2"
fi
```

## [ ]

`[]`: 是一种常用的条件测试命令，常用于if语句中进行条件测试。例如`[ $var -eq 5 ]`，表示判断变量`$var`的值是否等于5。`[]`支持各种比较运算符和逻辑运算符，例如`-eq`、`-ne`、`-lt`、`-gt`、`-le`、`-ge`、`&&`、`||`等。需要注意的是，在`[]`中使用变量时，需要将变量用引号引起来，以避免空格和其他特殊字符对测试结果的影响。

字符串比较

```sh
if [ "$str1" = "$str2" ]; then
    echo "str1 equals to str2"
fi
```

数值比较

```sh
if [ "$num1" -eq "$num2" ]; then
    echo "num1 equals to num2"
fi
```

文件检查

```sh
if [ -f /path/to/file ]; then
    echo "/path/to/file exists and is a regular file"
fi
```

目录检查

```sh
if [ -d /path/to/dir ]; then
    echo "/path/to/dir exists and is a directory"
fi
```

注意，在使用`[]`时，需要使用空格将不同的测试项分开，并将变量使用双引号引起来，否则会出现意料之外的错误

## ( )

`()`: 是用于创建子shell的符号，括号中的命令将在一个子shell中执行，该子shell中的变量和环境变量与当前shell是独立的。例如，`(cd /tmp; ls)`表示在一个子shell中执行`cd /tmp`和`ls`命令。

创建子Shell（subshell）

```sh
# 在子Shell中运行命令
(cd /root && ls)

# 在子Shell中定义变量
(var=value; echo $var)
```

定义数组

```sh
# 定义索引数组
arr=(a b c)

# 定义关联数组
declare -A arr=([name]=John [age]=30)
```

需要注意的是，使用`()`时，不需要在括号周围添加空格。

## (( ))

`(())`: 是一种用于进行算术运算的符号，例如`((x=5+3))`表示将8赋值给变量`$x`。`(())`支持算术运算符和逻辑运算符，例如`+`、`-`、`*`、`/`、`%`、`&`、`|`、`^`、`~`等。

```sh
# 定义变量并进行整数运算
num1=10
num2=20
result=$((num1 + num2))

# 支持常见的数值运算符
result=$((num1 + num2 * 2))

# 支持变量的自增和自减
num1=10
((num1++))
echo $num1  # 输出 11

((num1--))
echo $num1  # 输出 10

# 支持常见的位运算符
result=$((num1 & num2))
```



## test

> **test 命令用于检查某个条件是否成立，它可以进行数值、字符和文件三个方面的测试**。**功能与[]一样**，可以用于if语句中进行条件测试。例如，`test -f /etc/passwd`表示测试文件`/etc/passwd`是否存在。`test`命令支持各种比较运算符和逻辑运算符，例如`-eq`、`-ne`、`-lt`、`-gt`、`-le`、`-ge`、`&&`、`||`等。

### 基本语法

```shell
if test 数字1 options 数字2 
then  
...
fi
```

options具体如下

| 参数 | 说明           |
| :--- | :------------- |
| -eq  | 等于则为真     |
| -ne  | 不等于则为真   |
| -gt  | 大于则为真     |
| -ge  | 大于等于则为真 |
| -lt  | 小于则为真     |
| -le  | 小于等于则为真 |

### 使用实例

检查文件是否存在

```sh
if test -f /path/to/file
then
  echo "文件存在"
else
  echo "文件不存在"
fi
```

检查目录是否存在

```sh
if test -d /path/to/dir
then
  echo "目录存在"
else
  echo "目录不存在"
fi
```

比较两个字符串

```sh
if test "$str1" = "$str2"
then
  echo "两个字符串相等"
else
  echo "两个字符串不相等"
fi
```

```sh
if test -z $str2
then
	echo "str2字符串长度为0"
else
	echo "str2字符串长度不为0"
fi
```

检查数字大小关系

```sh
if test "$num1" -eq "$num2"
then
  echo "两个数字相等"
elif test "$num1" -lt "$num2"
then
  echo "$num1 小于 $num2"
else
  echo "$num1 大于 $num2"
fi
```

## [[]] 和 [] 的区别

#### 区别1: word splitting的发生

`[[]]` 不会有word splitting发生

`[]` 会有word splitting发生

> 会将含有空格字符串进行分拆分割后比较

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042119060.png" alt="image-20200704092823470" style="zoom:80%;" />

> 通过 `$?`  获取上一个命令的退出状态, 0代表成功, 1代表失败

#### 区别2: 转义字符

`[[]]`  对 `<` 不需要转义, 格式为 ` [[ 字符串1 < 字符串2 ]]`

`[]` 需要对 `<,>` 转义 ,  格式为 ` [ 字符串1 \< 字符串2 ]`

`[]` 执行效果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042119065.png" alt="image-20200704100701687" style="zoom:80%;" />

`[[]]` 执行效果, 不需要转义执行结果正确

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042119068.png" alt="image-20200704100843230" style="zoom:80%;" />



# 计算命令

## expr命令详解

> expr (evaluate expressions 的缩写)，译为“表达式求值”。是一个功能强大，并且比较复杂的命令，它除了可以实现整数计算，还可以结合一些选项对字符串进行处理，例如计算字符串长度、字符串比较、字符串匹配、字符串提取等。优点: 可以直接输出，缺点:  计算表达式里面引用变量使用$,  特殊字符需要转义，只能计算一个表达式
>

> 1. 整数计算
     >
     >    `expr 整数运算表达式`
>
> 2. 字符串操作
     >
     >    `expr length 字符串`  获取字符串的长度
     >
     >    `expr substr 字符串 start end`  截取字符串
     >
     >    `expr index 字符串  查找的字符`  查找字符在字符串中第一次出现的位置,  位置从1开始的
     >
     >    `expr match 字符串  正则表达式`
     >
     >    `expr 字符串: 正则表达式`

### 求值表达式(在上面有)

计算语法

```shell
expr 算术运算符表达式
例如: expr 1 + 1  返回: 2
例如: expr \( 10 + 10 \) \* 2 + 100 返回:140
```

![image-20200703102043699](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120617.png)

获取计算结果赋值给新变量语法

```shell
result=`expr 算术运算符表达式`
result=`expr 1 + 1`  输出result得到结果: 2
```

### 字符串API

计算字符串的长度语法

```shell
expr length 字符串
expr length "itheima"  返回: 7
```

截取字符串语法

```shell
expr substr 字符串 start end
# start 截取字符串的起始位置, 从1开始
# end 截取字符串的结束位置, 包含这个位置截取
expr substr "itheima" 1 2  返回: it
```

获取第一个字符在字符串中出现的位置语法

```shell
expr index 被查找字符串  需要查找的字符
例如 expr index "itheima" t  会返回: 2 
```

正则表达式匹配1语法

```shell
expr match 字符串 正则表达式
# 正则表达式默认带有^ ,  代表以什么开头
# 返回值为符合匹配字符的长度, 否则返回为0
# 例如: expr match "itheima" ".*m"  会返回: 6
# 正则表达式通配符"."代表任意一个字符
# 正则表达式通配符"*"代表签名的字符可以出现0到多次
# ".*m" 含义为匹配字符串中m前面的字符串长度 
```

正则表表达式匹配2语法,  功能与语法1一样

```shell
expr 字符串 : 正则表达式
# 正则表达式默认带有^ ,  代表以什么开头，.*表示0到多个，.*m匹配0到多个m
# 返回值为符合匹配字符的长度, 否则返回为0
expr "itheima" : ".*m"  返回: 6
```

### 实战演练⭐

> 四则运算: ( 10 + 10 ) * 2 + 100
>
> 计算"itheima"字符串的长度
>
> 获取"itheima"字符串中"t"第一个字符在字符串中出现的位置
>
> 正则表达式match匹配查找itheima字符串中m前面任意字符的总长度

cal1.sh脚本文件代码

```Shell
#!/bin/bash
# 四则运算
result=`expr \( 10 + 10 \) \* 2 + 100`
echo "(10+10)*2+100=${result}"

# 计算字符串的长度
echo "itheima字符串长度=`expr length "itheima"`"

# 获取第一个字符在字符串中出现的位置
echo "itheima字符串中第一个t的位置=`expr index "itheima" t`"

# 正则表达式匹配1
echo "正则表达式match匹配查找itheima字符串中m前面任意字符的总长度=`expr match "itheima" ".*m"`"

# 正则表达式匹配2
echo "正则表达式匹配查找itheima字符串中m前面任意字符的总长度=`expr "itheima" : ".*m"`"
```

运行效果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241700789.png" alt="image-20220924170056648" style="zoom:80%;" />



## (())命令详解

### 语法分析

> 双小括号 (( )) , 用于进行数学运算表达式的执行 , 将数学运算表达式放在`((`和`))`之间。
>
> 可以使用`$`获取 (( )) 表达式命令的结果，这和使用`$`获得变量值是一样的。
>
> 优点:  直接输出, 里面直接使用变量名, 特殊字符不需要转义, 多个表达式赋值
>
> 缺点: 需要获取值以后才可以输出

> 括号内赋值:  **((变量名=整数表达式))**
>
> 括号外赋值: **变量名=$((整数表达式))**
>
> 多表达式赋值: **((变量名1=整数表达式1,变量名2=整数表达式2,...))**
>
> 与if条件句配合使用:  **if ((整数表达式))**

```apl
((表达式))
```

| 运算操作符/运算命令                           | 说明                                                         |
| --------------------------------------------- | ------------------------------------------------------------ |
| ((a=1+6))<br> ((b=a-1)) <br>((c=a+b))         | 这种写法可以在计算完成后给变量赋值。以 ((b=a-1)) 为例，<br>即将 a-1 的运算结果赋值给变量 c。  注意，使用变量时不用加`$`前缀，<br>(( )) 会自动解析变量名。 |
| `a=$((1+6)`<br> `b=$((a-1))`<br> `c=$((a+b))` | 可以在 (( )) 前面加上`$`符号获取 (( )) 命令的执行结果，<br>也即获取整个表达式的值。以 `c=$((a+b))` 为例，即将 a+b 这个<br>表达式的运算结果赋值给变量 c。  注意，如果 c=((a+b)) 这样的写<br>法是错误的，不加`$`就不能取得表达式的结果。 |
| ((a>7 && b==c))                               | (( )) 也可以进行逻辑运算，在 if 语句中常会使用逻辑运算。     |
| echo $((a+10))                                | 需要立即输出表达式的运算结果时，可以在 (( )) 前面加`$`符号。 |
| ((a=3+5, b=a+10))                             | 对多个表达式同时进行计算, 多表表达式使用","号隔开            |

> 注意:  符号之间有无空格都可以 , (( a = 1 + 6 )) 等价于 ((a=1+6))

### 案例演示

calculatej2.sh脚本代码

```shell
#!/bin/bash
# 计算1+6赋值给变量a
((a=1+6))

# 计算变量a-1赋值给变量b
((b=a-1))

# 计算变量a+变量b赋值给变量c
((c=a+b))

# 打印变量a,变量b, 变量c的值
echo "a=${a},b=${b},c=${c}"

# $赋值写法
a=$((1+6)) b=$((a-1)) c=$((a+b))
echo "a=${a},b=${b},c=${c}"

# (())多个表达式计算赋值
((a=1+6,b=a-1,c=a+b))
echo "a=${a},b=${b},c=${c}"

# echo输出直接使用(())
echo "1+6=$((1+6))"

# (()) 用于逻辑表达式 在if中使用
if ((a>7 && b==c))
then
    echo "a>7 && b==c 成立"
else
    echo "a>7 && b==c 不成立"
fi
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241710307.png" alt="image-20220924171049178" style="zoom:80%;" />

## let命令详解

> let 命令和双小括号 (( )) 在数字计算方面功能一样.  但是没有(())功能强大,  **let只能用于赋值计算, 不能直接输出, 不可以条件判断一起使用**
>
> 优点: 赋值简单,特殊字符不需要转义。缺点: 不能直接输出
>

作用: 用于赋值,是最简洁的整数运算赋值命令

> 计算赋值用法: let 变量名=整数运算表达式
>
> 多个表达式计算赋值用法:   let 变量名1=整数运算表达式1  变量名2=整数运算表达式2 ...

### 语法规则

```shell
let 赋值表达式
```

> 注意
>
> 1. 语法功能等价于`((表达式))`
>
> 2. 多个表达式之间使用空格,  不是","号
>
> 3. 对于类似`let a+b`这样的写法，Shell 虽然计算了 a+b 的值，但却将结果丢弃, 如果 `echo let a+b` 会直接输出字符串 `a+b` ；若不想这样，可以使用`let sum=a+b`将 a+b 的结果保存在变量 sum 中。
     >
     >    ![image-20200703113800668](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120624.png)
     >
     >    输出建议使用(())

### 实战演练

```shell
#!/bin/bash
# 计算1+6赋值给变量a
let a=1+6

# 计算变量a-1赋值给变量b
let b=a-1

# 计算变量a+变量b赋值给变量c
let c=a+b

# 打印变量a,变量b, 变量c的值
echo "a=${a},b=${b},c=${c}"

# let多个表达式计算赋值
let a=1+6 b=a-1 c=a+b
echo "a=${a},b=${b},c=${c}"
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241714003.png" alt="image-20220924171420850" style="zoom:80%;" />

## $[]命令详解

> 和 (())、let 命令类似，$[] 也只能进行整数运算。但是只能对单个表达式的计算求值与输出：$[表达式]
>
> 优点: 特殊字符不需要转义,
>
> 缺点: 不能多表达是计算,

> 1. $[] 会对`表达式`进行计算，并取得计算结果
>
> 2. 表达式内部不可以赋值给变量

calculate4.sh脚本代码

```shell
#!/bin/bash
# 计算1+6赋值给变量a
a=$[1+6]

# 计算变量a-1赋值给变量b
b=$[a-1]

# 计算变量a+变量b赋值给变量c
c=$[a+b]

# 打印变量a,变量b, 变量c的值
echo "a=${a},b=${b},c=${c}"

# 直接输出
echo "$[1+6],$[7-1],$[7+6]"
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241716331.png" alt="image-20220924171635207" style="zoom:80%;" />

## bc命令详解

> Bash shell内置了对整数运算的支持，但是并不支持浮点运算，而 linux bc (basic calculator)命令可以很方便的进行浮点运算. bc命令是Linux简单的计算器,能进行进制转换与计算。能转换的进制包括十六进制、十进制、八进制、二进制等。可以使用的运算符号包括(+)加法、(-)减法、(*)乘法、(/)除法、(^)指数、(%)余数等
>

通常在linux下bc当计算器用, 具体有3个用法

1. bc中互动式的数学运算
2. shell中非互动式的管道运算
3. shell中非互动式的输入重定向运算

### 语法分析

```shelll
bc [options] [参数]
```

| 选项   | 说明                                                        |
| ------ | ----------------------------------------------------------- |
| -h     | help，帮助信息                                              |
| -v     | version，显示命令版本信息                                   |
| ==-l== | mathlib, 使用标准数学库, 例如使用内置函数就需要使用这个参数 |
| -i     | interactive, 强制交互                                       |
| -w     | warn, 显示 POSIX 的警告信息                                 |
| -s     | standard, 使用 POSIX 标准来处理                             |
| ==-q== | quiet, 不显示欢迎信息                                       |

> 默认使用bc命令后回车会有很多欢迎信息，  可以使用  `bc -q`  回车后不会有欢迎信息

示例演示

创建task.txt文件, 编辑文件内容(一个计算表达式一行)

```shell
108*67+12345
58+2007*11
```

执行命令

![image-20200703153959498](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120507.png)

> 可以使用 `quit` 命令退出bc

### 内置变量

| 变量名      | 作 用                                                        |
| ----------- | ------------------------------------------------------------ |
| scale       | 指定精度，也即小数点后的位数, 对计算结果指定保留小数；默认为 0，也即不使用小数部分。 |
| ibase       | 指定输入的数字的进制，默认为十进制。                         |
| obase       | 指定输出的数字的进制，默认为十进制。                         |
| last 或者 . | 获取最近计算打印结果的数字                                   |

### 内置数学函数

| 函数名  | 作用                               |
| ------- | ---------------------------------- |
| s(x)    | 计算 x 的正弦值，x 是弧度值。      |
| c(x)    | 计算 x 的余弦值，x 是弧度值。      |
| a(x)    | 计算 x 的反正切值，返回弧度值。    |
| l(x)    | 计算 x 的自然对数。                |
| e(x)    | 求 e 的 x 次方。                   |
| j(n, x) | 贝塞尔函数，计算从 n 到 x 的阶数。 |

### 示例：bc中互动式的数学运算

使用 `bc -q` 命令，回车即可,  直接进行计算器进行运算

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120509.png" alt="image-20200703151035148" style="zoom:80%;" />

退出bc使用 `quit`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120517.png" alt="image-20200703151349964" style="zoom:80%;" />

### 示例：shell中非互动式的管道运算

在 Shell 脚本中，我们可以借助管道使用 bc 计算器

借助管道使用 bc 计算器语法

直接进行bc的表达式计算输出

```shell
echo "expression" | bc [options]
```

> "expression" 表达式必须复合bc命令要求的公式
>
> "expression"  表达式里面可以引用shell变量
>
> 例如:  Shell变量 `a=2`   在表达式里面引用的语法:  `$a`

将bc计算结果赋值给Shell变量

```shell
# 第一种方式
var_name=`echo "expression" | bc [options]`

# 第二种方式
var_name=$(echo "expression" | bc [options])
```

> $() 与 `` 功能一样, 都是执行里面的命令
>
> 区别
>
> ​	 `` 是所有linux系统支持的方式,  兼容性较好, 但是容易与引号产生混淆
>
> ​      $() 不是所有linux系统都支持的方式,  兼容性较差, 但是不容易产生混淆

![image-20200703154646821](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120522.png)

引用shell变量进行计算

![image-20200703155152427](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120524.png)

> 注意 b是bc中定义的新变量, 与shell变量没有任何关系,  所以不可以在shell中获取b变量

进制转换

![image-20200703155732347](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120527.png)

### 示例：shell中非互动式的输入重定向运算

> 将计算表达式输出给bc去执行, 特点类似于文件中输入,可以输入多行表达式, 更加清晰
>

```shell
# 第一种方式
var_name=`bc [options] << EOF
第一行表达式1
第二行表达式2
...
EOF
`

# 第二种方式
var_name=$(bc [options] << EOF
第一行表达式1
第二行表达式2
...
EOF
)
```

> `var_name` 这是Shell变量的名字
>
> `bc` 执行bc的命令
>
> `EOF..EOF`  输入流的多行表达式
>
> 含义:  将EOF中间多行表达式输入给到bc去执行, j将bc执行的结果给到Shell变量var_name

![image-20200703161628360](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120113.png)

> 如果有大量的数学计算，那么使用输入重定向就比较方便，因为数学表达式可以换行，写起来更加清晰。

# 流程控制

## if else语句

> if条件判断逻辑控制语句
>

### if语法

多行写法语法

```shell
if  条件
then
    命令
fi
```

可以将if语句放入一行语法

```shell
if 条件; then 命令; fi
```

### if else 语法

```shell
if  条件
then
   命令
else
   命令
fi
```

### if elif else 语法

```shell
if  条件1
then
   命令1
elif 条件2
then
    命令2
elif 条件3
then
    命令3
……
else
   命令N
fi
```

### 实战演练

> 提示"请输入你的考试成绩:" 接收用户输入一个成绩, 之后使用if else条件句判断
>
> 要求1: 小于 60 输出"不及格"
>
> 要求2: 大于等于70 并且 小于80 输出"中等"
>
> 要求3: 大于等于80 并且 小于90 输出"良好"
>
> 要求4: 大于等于90 并且 小于等于100 输出"优秀"
>
> 要求5: 以上不符合输出"成绩不合法"

```shell
#!/bin/bash
# -p：显示提示信息
read -p "请输入你的考试成绩:" score
if (( $score < 60 )); then
    echo "不及格"
elif (( $score >= 60 && $score < 70 )); then
    echo "及格"
elif (( $score >= 70 && $score < 80 )); then
    echo "中等"
elif (( $score >= 80 && $score < 90 )); then
    echo "良好"
elif (( $score >= 90 && $score <= 100 )); then
    echo "优秀"
else
    echo "成绩不合法"
fi
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241808079.png" alt="image-20220924180838933" style="zoom:80%;" />

## if退出状态

> linux任何命令的的执行都会有一个退出状态,  无论是内置命令还是外部文件命令. 还是自定义的 Shell 函数，当它退出（运行结束）时，都会返回一个比较小的整数值给调用（使用）它的程序，这就是命令的**退出状态**
>

> 查询每个命令的退出状态：常见命令 `$?`。大多数命令状态0代表成功, 非0代表失败. 也有特殊的命令,比如 diff 命令用来比较两个文件的不同，对于“没有差别”的文件返回 0，对于“找到差别”的文件返回 1，对无效文件名返回 2

Shell 中，有多种方式取得命令的退出状态，其中 `$?` 是最常见的一种.

![image-20200703172613295](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120129.png)

### 和逻辑符组合

Shell if 语句使用逻辑运算符将多个退出状态组合起来，这样就可以一次判断多个条件了。

| 运算符     | 使用格式         | 说明                                                         |
| ---------- | ---------------- | ------------------------------------------------------------ |
| && 或 -a   | 条件1 && 条件2   | 逻辑与运算符，当 条件1 和 条件2 同时成立时，<br>整个表达式才成立。  如果检测到 条件1 的退出状态为 0，<br>就不会再检测 条件2 了，因为不管 条件2 的退出状态是什么，<br>整个表达式必然都是不成立的，检测了也是多此一举。 |
| \|\| 或 -o | 条件1 \|\| 条件2 | 逻辑或运算符，条件1 和 条件2 两个表<br>达式中只要有一个成立，整个表达式就成立。  如果检<br>测到 条件1 的退出状态为 1，就不会再检测 条件2 了，因为<br>不管 条件2 的退出状态是什么，整个表达式必然都是成立的，<br>检测了也是多此一举。 |
| !          | !条件            | 逻辑非运算符，相当于“取反”的效果。如果 条件 成立，那么整<br>个表达式就不成立；如果 条件 不成立，那么整个表达式就成立。 |

### 实战演练⭐⭐

提示输入"请输入文件全名: "和"请输入数据:" 并接收文件名与数据

使用逻辑运算符判断满足2 条件 :  文件需要具有可写权限  和   输入的数据长度不为0

满足以上2个条件 将用户输入的 数据 写入到指定的文件中去

control2.sh脚本文件代码

```sh
#!/bin/bash
read -p "请输入文件全名: " filename
read -p "请输入数据:" data
# -w文件是否可写，-a表示and并且，-n数据不为空,-e表示文件是否存在
if [ -w $filename -a -n $data -a -e $filename ]
then
        echo $data
        echo $data > $filename
        echo "写入成功"
else
        touch $filename
        echo $data > $filename
        echo "创建并写入成功"
fi
```

> test命令用于对文件或字符串进行检测,  `-w` 判断文件是否存在并且可写,  `-n` 用于检测字符串是否非空
>
> `$data > $filename`   其中 `>`  用于将内容输出到指定文件中去

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241836748.png" alt="image-20220924183622614" style="zoom:80%;" />

### 文件测试⭐

| 参数          | 说明                                             |
| :------------ | :----------------------------------------------- |
| ==-e 文件名== | exists, 如果文件存在，则为真                     |
| ==-r 文件名== | read,如果文件存在且可读，则为真                  |
| ==-w 文件名== | write,如果文件存在且可写，则为真                 |
| ==-x 文件名== | execute,如果文件存在且可执行，则为真             |
| ==-s 文件名== | string,如果文件存在且至少有一个字符，则为真      |
| ==-d 文件名== | directory,如果文件存在且为目录，则为真           |
| -f 文件名     | file,如果文件存在且为普通文件，则为真            |
| -c 文件名     | character,如果文件存在且为字符型特殊文件，则为真 |
| -b 文件名     | 如果文件存在且为块特殊文件，则为真               |

control5.sh脚本代码

```shell
#!/bin/bash

if test -w control1.sh
then
    echo '文件已存在并且可写!'
else
    echo '文件不存在或不可写!'
fi

if test -e control1.sh -a -e control2.sh
then
    echo '两个文件都存在!'
else
    echo '可能有一个或两个文件不存在'
fi
```

Shell提供了与( -a )、或( -o )、非( ! )三个逻辑操作符用于将测试条件连接起来，其优先级为："!"最高，"-a"次之，"-o"最低,  语法

```shell
test 条件1 -o 条件2 -a 条件3 ...
```

![image-20200704074322642](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120790.png)

## case语句

Shell case语句为多选择语句。可以用case语句匹配一个值与一个模式，如果匹配成功，执行相匹配的命令;

当分支较多，并且判断条件比较简单时，使用 case in 语句就比较方便了。

### 语法规则

```shell
case 值 in
匹配模式1)
    命令1
    命令2
    ...
    ;;
匹配模式2）
    命令1
    命令2
    ...
    ;;
*)
    命令1
    命令2
    ...
    ;;
esac
```

每一匹配模式必须以右括号结束。取值可以为变量或常数。匹配发现取值符合某一模式后，其间所有命令开始执行直至 ;;(类似break, 不可以替代否则语法报错)。取值将检测匹配的每一个模式。一旦模式匹配，则执行完匹配模式相应命令后不再继续其他模式。如果无一匹配模式，使用星号 * 捕获该值，再执行后面的命令。

case、in 和 esac 都是 Shell 关键字,   esac就是case的反写在这里代表结束case

匹配模式:  可以是一个数字、一个字符串，甚至是一个简单正则表达式。

简单正则表达式支持如下通配符

| 格式  | 说明                                                         |
| ----- | ------------------------------------------------------------ |
| *     | 表示任意字符串。                                             |
| [abc] | 表示 a、b、c 三个字符中的任意一个。比如，[15ZH] 表示 1、5、Z、H 四个字符中的任意一个。 |
| [m-n] | 表示从 m 到 n 的任意一个字符。比如，[0-9] 表示任意一个数字，[0-9a-zA-Z] 表示字母或数字。 |
| \|    | 表示多重选择，类似逻辑运算中的或运算。比如，abc \| xyz 表示匹配字符串 "abc" 或者 "xyz"。 |

### 案例演示

```shell
#!/bin/bash
read -p "请输入一个0~7的数字:" number
case $number in
1)
    echo "星期一"
	;;
2)
    echo "星期二"
    ;;
3)
    echo "星期三"
    ;;
4)
    echo "星期四"
    ;;
5)
    echo "星期五"
    ;;
6)
    echo "星期六"
    ;;
0|7)
    echo "星期日"
    ;;
*)
    echo "您输入的数字无效"
    ;; 
esac
```

运行效果

![image-20200704142506942](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120794.png)



## while语句

> while用于循环执行一系列命令
>

### 语法规则

多行写法

```shell
while 条件
do
	命令1
	命令2
	...
	continue; # 结束当前这一次循环, 进入下一次循环
	break; # 结束当前循环
done
```

一行写法

```shell
while 条件; do 命令; done;
```

### 案例演示

```sh
#!/bin/bash
read -p "请输入一个数字:" number
i=0
while (( $i < $number ))
do
  echo "hello world"
  ((i++))
done
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209241948529.png" alt="image-20220924194810389" style="zoom:80%;" />

### 无限循环

```shell
while :
do
    command
done
```

```shell
while true
do
    command
done
```

```shell
while true; do echo 123; done
```

### break & continue

```sh
#!/bin/bash
read -p "请输入一个数字:" number
i=0
while (( $i < $number ))
do
  echo "hello world"
  let i++
  if ((i==3))
  then
      echo "退出"
      break;
  fi
done
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303121502434.png" alt="image-20230312150225203" style="zoom:80%;" />

```sh
#!/bin/bash
read -p "请输入一个数字:" number
i=0
while (( $i < $number ))
do
  echo "hello world"
  let i++
  if ((i==3))
  then
      echo "退出"
      continue;
  fi
done
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303121504443.png" alt="image-20230312150431284" style="zoom:80%;" />

## until语句

> until 也是循环结构语句,  until 循环与 while 循环在处理方式上刚好相反,  循环条件为false会一致循环, 条件为true停止循环.
>

### 语法规则

```shell
until 条件
do
    命令
done
```

条件如果返回值为1(代表false)，则继续执行循环体内的语句，否则跳出循环。

### 案例演示

```shell
#!/bin/bash
read -p "请输入一个数字:" number
i=0
until (($i > $number))
do
  echo "hello world"
  ((i++))
done
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209242125269.png" alt="image-20220924212533069" style="zoom:80%;" />

## for循环

### 循环方式1

多行写法

```shell
for var in item1 item2 ... itemN
do
    命令1
    命令2
    ...
done
```

一行写法

```shell
for var in item1 item2 ... itemN; do 命令1; 命令2…; done;
```

> var是循环变量，item1 item2 ... itemN 是循环的范围
>

```sh
#!/bin/bash
read -p "请输入一个循环的数字:" number
i=0
for i in 1 3 5 6
do
   echo "hello${i}"
done
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209242145832.png" alt="image-20220924214536680" style="zoom:80%;" />

### 循环方式2

多行写法

```shell
for var in {start..end}
do
	命令
done
```

> start:  循环范围的起始值,必须为整数
>
> end: 循环范围的结束值, 必须为整数

一行写法

```shell
for var in {start..end}; do 命令; done
```

循环1到5并打印

```shell
for i in {1..5}; do echo $i; done
```

```sh
#!/bin/bash
for i in {1..10}
do
   echo "hello${i}"
done
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209242147881.png" alt="image-20220924214735707" style="zoom:80%;" />

### 循环方式3

多行写法

```shell
for((i=start;i<=end;i++))
do
	命令
done
```

一行写法

```shell
for((i=start;i<=end;i++)); do 命令; done
```

```sh
for((i=0;i<=3;i++)); do echo "hello,${i}"; done
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209242149107.png" alt="image-20220924214954932" style="zoom:80%;" />

### 无限循环

```shell
for((;;)); do 命令; done
```

## select语句

> select in 循环用来增强交互性，它可以显示出带编号的菜单，用户输入不同的编号就可以选择不同的菜单，并执行不同的功能.   select in 是 Shell 独有的一种循环，非常适合终端（Terminal）这样的交互场景, 其他语言没有;常与 case in 一起配合使用
>

### 语法

```shell
select var in menu1 menu2 ...
do
    命令
done
```

> 注意: select 是无限循环（死循环），输入空值，或者输入的值无效，都不会结束循环，只有遇到 break 语句，或者按下 Ctrl+D 组合键才能结束循环。
>
> 执行命令过程中: 终端会输出 `#?`  代表可以输入选择的菜单编号

### 演示1

```shell
#!/bin/bash
echo "你的爱好是什么?"
select hobby in "编程" "游戏" "篮球" "游泳"
do
	echo $hobby
    break
done
echo "你的爱好是:${hobby}"
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209242152075.png" alt="image-20220924215249922" style="zoom:80%;" />

### 演示2

```shell
#!/bin/bash
echo "你的爱好是什么"
select hobby in "编程" "游戏" "篮球" "游泳"
do
    case $hobby in
        "编程")
            echo "编程,多敲代码"
            break
            ;;
        "游戏")
            echo "少玩游戏"
            break
            ;;
        "篮球"|"游泳")
            echo "运动有利健康"
            break
            ;;
        *)
            echo "输入错误，请重新输入"
    esac
done
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209242153028.png" alt="image-20220924215341871" style="zoom:80%;" />

# 系统函数

## 函数介绍

Shell编程和其他编程语言一样, 有函数,  函数是由若干条shell命令组成的语句块，实现Shell脚本代码重用和模块化编程

函数分类：系统函数、自定义函数

## 系统函数

### basename

> basename函数用于获取文件名的函数,  根据给出的文件路径截取出文件名
>

```apl
basename [string / pathname] [suffix]  
```

> 根据根据指定字符串或路径名进行截取文件名,  比如:  根据路径"/one/two/aa.txt",  可以截取出aa.txt
>
> suffix: 用于截取的时候去掉指定的后缀名.

```apl
basename /root/itheima/t.txt
```

![image-20200704175505682](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120326.png)

### dirname系统函数

> 从指定的文件绝对路径,  去除文件名，返回剩下的前缀目录路径
>

```apl
dirname 文件绝对路径
```

![image-20200704184207793](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120330.png)

## 自定义函数⭐

> 开发人员可以通过自定义开发函数,实现代码重用.
>

### 基本语法

```shell
# 函数的定义
[ function ] funname ()
{
    命令
    [return 返回值]

}

# 调用函数
funname 传递参数1 传递参数2 ...
```

> 1. 可以带function fun() 定义，也可以直接fun() 定义,不带任何参数。
>
> 2. 参数返回，可以显示加：return 返回，如果不加，将以最后一条命令运行结果，作为返回值。 return后跟数值n(0~255)

> 必须在调用函数地方之前，先声明函数，shell脚本是逐行运行,  只要先运行了函数, 后面才可以时使用函数
>

###   示例：无参无返回值函数

文件脚本代码

```shell
#!/bin/bash
demo()
{
    echo "执行了函数"
}

# 调用函数
demo
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209242203609.png" alt="image-20220924220350451" style="zoom:80%;" />

### 示例：无参有返回值函数

fun2.sh文件脚本代码

```shell
#!/bin/bash
sum()
{
    echo "求两个数的和..."
    read -p "输入第一个数字: " n1
    read -p "输入第二个数字: " n2
    echo "两个数字分别为 $n1 和 $n2 "
    return $(($n1+$n2))
}

# 调用函数
sum
echo "两个数字的和为: $? "  # 获取函数返回值
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209242204199.png" alt="image-20220924220436040" style="zoom:80%;" />

### 示例：有参函数

#### 语法介绍

在Shell中，调用函数时可以向其传递参数。在函数体内部，通过 `$n` 的形式来获取参数的值，例如，`$1` 表示第一个参数，`$2` 表示第二个参数...

其他参数介绍

| 参数处理 | 说明                                                         |
| :------- | :----------------------------------------------------------- |
| $#       | 传递到脚本或函数的参数个数                                   |
| $*       | 以一个单字符串显示所有向脚本传递的参数                       |
| $$       | 脚本运行的当前进程ID号                                       |
| $!       | 后台运行的最后一个进程的ID号                                 |
| $@       | 与$*相同，但是使用时加引号，并在引号中返回每个参数。         |
| $?       | 显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误。 |

#### 示例演示

fun3.sh文件脚本代码

```shell
#!/bin/bash
funParam(){
    echo "第一个参数为 $1 !"
    echo "第二个参数为 $2 !"
    echo "第十个参数为 $10 !"
    echo "第十个参数为 ${10} !"
    echo "第十一个参数为 ${11} !"
    echo "参数总数有 $# 个!"
    echo "作为一个字符串输出所有参数 $* !"
}
# 调用函数
funParam 1 2 3 4 5 6 7 8 9 10 22
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209242205529.png" alt="image-20220924220555364" style="zoom:80%;" />

## shell程序与函数的区别

函数和shell程序比较相似，区别在于：

- Shell 程序(内置命令和外部脚本文件),  外部脚本文件是在子Shell中运行,  会开启独立的进程运行
- Shell函数在当前Shell的进程中运行

```shell
#!/bin/bash
demo(){
    echo "函数中打印当前进程ID:$$"
}

echo "当前脚本文件(Shell程序)打印当前进程ID:$$"
# 调用函数
demo
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209242208232.png" alt="image-20220924220853075" style="zoom:80%;" />

# 重定向输入输出⭐

## 重定向介绍

### 标准输入介绍

从键盘读取用户输入的数据，然后再把数据拿到Shell程序中使用；

### 标准输出介绍

Shell程序产生的数据，这些数据一般都是呈现到显示器上供用户浏览查看;

### 默认输入输出文件

每个 Unix/Linux 命令运行时都会打开三个文件,  文件如下

| 文件名 | 类型                                  | 文件描述符(file description, fd) | 功能                     |
| ------ | ------------------------------------- | -------------------------------- | ------------------------ |
| stdin  | (standard input)<br>标准输入文件      | 0                                | 获取键盘的输入数据       |
| stdout | (standard output)<br/>标准输出文件    | 1                                | 将正确数据输出到显示器上 |
| stderr | (standard error)<br/>标准错误输出文件 | 2                                | 将错误信息输出到显示器上 |

> 每个文件都有一个唯一的 **文件描述符fd**,  后面会通过唯一 **文件描述符fd** 操作对应的信息

Shell程序操作输入输出时用到这3个文件

1. Shell程序默认会从stdin文件中读取输入数据
2. Shell程序默认会向stdout文件输出正确数据
3. Shell程序默认会项stderr文件中输出错误信息

这3个文件用于临时传输数据使用

### 重定向输入输出介绍

标准输入是数据默认从键盘流向程序，如果改变了它的方向，数据就从其它地方流入，这就是输入重定向。

标准输出是数据默认从程序流向显示器，如果改变了它的方向，数据就流向其它地方，这就是输出重定向。

> Linux Shell 重定向分为两种，一种输入重定向，一种是输出重定向；

### 重定向的作用

输出重定向是指命令的结果不再输出到显示器上，而是输出到其它地方，一般是文件中。这样做的最大好处就是把命令的结果保存起来，当我们需要的时候可以随时查询。

## 重定向语法⭐

| 命令                  | 说明                                                         |
| :-------------------- | :----------------------------------------------------------- |
| 命令 > file           | 将正确数据重定向输出到 file 文件中, 覆盖方式                 |
| 命令 < file           | 将输入重定向从 file 文件中读取数据                           |
| 命令 >> file          | 将正确数据重定向输出到 file 文件中, 追加方式                 |
| 命令 < file1 > file2  | 从file文件读取数据, 输出数据到file2文件中                    |
| 命令 fd> file         | 根据指定的文件描述符fd 将数据重定向输出到 file 文件中, 覆盖方式 |
| 命令 fd>> file        | 根据指定的文件描述符fd 将数据重定向输出到 file 文件中, 追加方式 |
| 命令 > file fd1>& fd2 | 将 fd1 和 fd2 文件描述符合并 输出到文件。                    |
| fd1<& fd2             | 将 fd1 和 fd2 文件描述符合并 从文件读取输入.                 |
| << tag                | 读取终端输入数据,  将开始标记 tag 和结束标记 tag 之间的内容作为输入。<br>标记名tag可以任意 |

> 在输出重定向中，`>`代表的是覆盖输出，`>>`代表的是追加输出。
>
> fd是文件描述符
>
> ​		0 通常是标准输入（STDIN），
>
> ​		1 是标准输出（STDOUT），
>
> ​		2 是标准错误输出（STDERR）。
>
> fd>  或  fd>>  中间不可以有空格

## 文件写入覆盖

### 1、覆盖

这里有两种格式可以使用

格式一

```bash
#!/bin/bash
cat << EOF > /root/test.txt
Hello!
My site is www.361way.com
My site is www.91it.org
Test for cat and EOF!
EOF
```

格式二

```bash
#!/bin/bash
cat > /root/test.txt <<EOF
Hello!
My site is www.361way.com
My site is www.91it.org
Test for cat and EOF!
EOF
```

两种写法区别无法是要写入的文件放在中间或最后的问题，至于选哪种看个人喜好吧。

### 2、追加

覆盖的写法基本和追加一样，不同的是单重定向号变成双重定向号。

格式一

```bash
#!/bin/bash
cat << EOF >> /root/test.txt
Hello!
My site is www.361way.com
My site is www.91it.org
Test for cat and EOF!
EOF
```

格式二

```bash
#!/bin/bash
cat >> /root/test.txt <<EOF
Hello!
My site is www.361way.com
My site is www.91it.org
Test for cat and EOF!
EOF
```

需要注意的是，不论是覆盖还是追加，在涉及到变量操作时是需要进行转义的，例如：

```bash
#!/bin/bash
cat <<EOF >> /root/a.txt
PATH=\$PATH:\$HOME/bin
export ORACLE_BASE=/u01/app/oracle
export ORACLE_HOME=\$ORACLE_BASE/10.2.0/db_1
export ORACLE_SID=yqpt
export PATH=\$PATH:\$ORACLE_HOME/bin
export NLS_LANG="AMERICAN_AMERICA.AL32UTF8"
EOF
```

### 3、语法

> tee [-ai][--help][--version][文件...]

参数：

```bash
-a或--append 　附加到既有文件的后面，而非覆盖它．
-i或--ignore-interrupts 　忽略中断信号。
--help 　在线帮助。
--version 　显示版本信息。
```

实例
使用指令"tee"将用户输入的数据同时保存到文件"file1"和"file2"中，输入如下命令：

$ tee file1 file2 #在两个文件中复制内容

以上命令执行后，将提示用户输入需要保存到文件的数据，如下所示：

My Linux #提示用户输入数据
My Linux #输出数据，进行输出反馈

此时，可以分别打开文件"file1"和"file2"，查看其内容是否均是"My Linux"即可判断指令"tee"是否执行成功。

## 输出示例：正确信息重定向输出

创建文件redirect1.txt

```shell
touch redirect1.txt
```

执行who命令重定向输出到redirect1.txt文件中

```shell
echo "itheima" >> redirect1.txt
ls  >> redirect2.txt
pwd >> redirect2.txt
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209242215974.png" alt="image-20220924221533793" style="zoom:80%;" />

## 输出示例：错误信息重定向输出

预览错误消息

```shell
ls java
```

![image-20200705214312724](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120844.png)

没有java目录所以报错，将错误消息输出到redirect2.txt文件中，该文件不用手动创建

```shell
ls java 2> redirect2.txt
```

> 2 是标准错误输出（STDERR）, 注意
>
> `>` 覆盖方式输出
>
> `2>` 注意fd与>符号之间不能有空格

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209242218254.png" alt="image-20220924221843081" style="zoom:80%;" />

## 输出示例：正确和错误信息同时输出⭐

将正确信息与错误信息都保存到一个文件中

```shell
echo "itcast" >> redirect2.txt 2>&1
```

> 数字 1 代表正确输出的结果输出到文件中
> 数字 2 代表错误结果输出到文件中
>
> `2>& 1` 将正确和错误都输出到文件中.  `2>&` 中间不能有空格,  写法有2种
>
> 合并第一种写法:  `2>& 1`、合并第二种写法:  `2>&1`
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209242222471.png" alt="image-20220924222229287" style="zoom:80%;" />

## 输入示例：统计文件数据行数

### wc命令介绍

> Linux wc 命令可以用来对文本进行统计，包括单词个数、行数、字节数
>

### wc命令语法

```shell
wc  [options]  [文件名]
```

options有如下:

| 选项 | 含义                  |
| ---- | --------------------- |
| `-c` | character, 统计字节数 |
| `-w` | word, 统计单词数      |
| `-l` | line, 统计行数        |

### 演示

统计文件redirect2.txt中数据行数

```shell
wc -l < redirect2.txt
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209242223686.png" style="zoom:80%;" />

## 输入示例：逐行读取文件数据

循环读取文件每一行数据

```shell
while read str; do echo $str; done < redirect2.txt
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209242224353.png" alt="image-20220924222403176" style="zoom:80%;" />

## 输入示例：读取终端输入数据的行数

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303121540573.png" alt="image-20230312154010409" style="zoom:80%;" />

# 工具篇⭐⭐

grep , sed ,awk , cut 文本字符串操作四剑客的区别

> grep：**查找匹配的行**
>
> cut：  **截取数据. 截取某个文件中的列, 重点是按照列分割,  这个命令不适合截取文件中有多个空白字符的字段**
>
> sed： **增删改查数据. sed用于在文件中以行来截取数据进行增\删\改\查**
>
> awk：**截取分析数据.  可以在某个文件中是以竖列来截取分析数据**,

## cut文本切割

> 一个强大文本处理工具，它可以将文本按列进行划分的文本处理。cut命令逐行读入文本，然后按列划分字段并进行提取、输出等操作。

### 语法分析

```shell
cut [options]  filename
```

options参数说明

| 选项参数        | 功能                                                         |
| --------------- | ------------------------------------------------------------ |
| -f 提取范围     | 列号，获取第几列                                             |
| -d 自定义分隔符 | 自定义分隔符，默认为制表符。                                 |
| -c 提取范围     | 以字符为单位进行分割                                         |
| -b 提取范围     | 以字节为单位进行分割。这些字节位置将忽略多字节字符边界，除非也指定了 -n 标志。 |
| -n              | 与“-b”选项连用，不分割多字节字符；                           |

提取范围说明

| 提取范围  | 说明                                                       |
| --------- | ---------------------------------------------------------- |
| n-        | 提取指定第n列或字符或字节后面所有数据                      |
| n-m       | 提取指定第n列或字符或字节到第m列或字符或字节中间的所有数据 |
| -m        | 提取指定第m列或字符或字节前面所有数据                      |
| n1,n2,... | 提前指定枚举列的所有数据                                   |

cut切割提取列

> cut  文件或数据 -d 分隔符切割 -f 提取第X列

cut切割提取字符

> cut  文件或数据 -c 提取字符范围

cut切割提取字节

> cut  文件或数据 -nb 提取直接范围

### 示例：切割提取指定列数据

cut1.txt文件数据准备

```shell
touch cut1.txt
```

编辑文件添加内容

```shell
AA  itheima 11 XX
BB  itcast 22 XXX
CC  Shell 33 XXXX
DD  it 44 XXXXXXX
```

提取文件中第一列数据

```shell
# 按照空格分隔获取第一列，-d切割列
# -d " "：指定字段的分隔符为空格，表示以空格作为字段分隔符
# -f 1：指定要提取的字段为第1个字段，表示只提取以空格分隔的第一个单词
cut cut1.txt -d " " -f 1
```

![image-20200707230710596](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120073.png)

提取文件中第一列,第三列, 枚举查找

```shell
cut cut1.txt -d " " -f 1,3
```

![image-20200707232926482](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120088.png)

提取文件中第二列,第三列,第四列, 范围查找

```sh
cut cut1.txt -d " " -f 2-4
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209242253751.png" alt="image-20220924225317571" style="zoom:80%;" />

提取文件中第一列后面所有列的数据

```shell
cut cut1.txt -d " "  -f 2- 
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209242254786.png" alt="image-20220924225409604" style="zoom:80%;" />

提起文件中结束列前面所有列的数据

```shell
cut -d " " -f -2 cut1.txt
# -2 提取指定列前面所有列数据
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209242254188.png" alt="image-20220924225449025" style="zoom:80%;" />

### 示例: 切割提取指定字符数据

提取每行前3个字符

```shell
cut cut1.txt -c1-3
```

运行效果

![image-20200711142653293](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120089.png)

提取每行第4个字符以后的数据

```shell
cut cut1.txt -c 4-
```

运行效果

![image-20200711143324756](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120794.png)

提取每行第3个字符前面所有字符

```shell
cut cut1.txt -c -3
```

![image-20200711143438631](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120799.png)

### 示例：切割提取指定字节数据

提取字符串"abc传智播客" 前3个字节

```shell
echo "abc传智播客" | cut -b -3
```

![image-20200711143706340](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120807.png)

提取字符串"abc传智播客" 前4个字节

```shell
echo "abc传智播客" | cut -b -4
```

![image-20200711143754196](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120808.png)

提取字符串"abc传智播客" 前6个字节

```shell
echo "abc传智播客" | cut -b -6
# 由于linux系统默认utf-8码表, 所以一个汉字占3个字节
```

![image-20200711143926461](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120811.png)

提取字符串"abc传智播客" 前4个字节, 就可以将汉字 "传"输出,

```shell
echo "abc传智播客" | cut -nb -4
#  -n 取消多字节字符分割直接输出
```

![image-20200711144139142](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120813.png)

### 示例：切割提取指定单词数据

在cut1.txt文件中切割出"itheima"

```shell
# 获取itheima所在的哪一行数据，按照空格切割第二列
cat cut1.txt | grep itheima | cut -d " " -f 2
```

![image-20200708003059162](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120461.png)



### 示例：切割提取bash进程的PID号

```shell
ps -aux | grep 'bash' | head -n 1 | cut -d " " -f 6
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209250620537.png" alt="image-20220925062031309" style="zoom:80%;" />

### 示例：切割提取IP地址⭐

```shell
# 找到broadcast所在的行，再去切割第10列，就是数前面空格，inet是第9列
ifconfig | grep broadcast | cut -d " " -f 10
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209242257936.png" alt="image-20220924225713743" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209242257438.png" alt="image-20220924225753275" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209242258881.png" alt="image-20220924225822711" style="zoom:80%;" />

## sed文本增删改

> sed （stream editor, 流编辑器） 是Linux下一款功能强大的非交互流式文本编辑器(vim是交互式文本编辑器)，可以对文本文件的每一行数据匹配查询之后进行增、删、改、查等操作，支持按行、按字段、按正则匹配文本内容，灵活方便，特别适合于大文件的编辑.
>

> sed是一种流编辑器，它一次处理一行内容,  将这行放入缓存(存区空间称为：模式空间)，然后才对这行进行处理，处理完后，将缓存区的内容发送到终端。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120475.png" alt="image-20200711095515087" style="zoom:80%;" />

### 语法

```apl
sed [选项参数] [模式匹配/sed程序命令] [文件名]
```

> 模式匹配,sed会读取每一行数据到模式空间中, 之后判断当前行是否符合模式匹配要求,符合要求就会
> 执行sed程序命令, 否则不会执行sed程序命令;**如果不写匹配模式,那么每一行都会执行sex程序命令**

选项参数说明

| 选项参  数                 | 功能                                                         |
| -------------------------- | ------------------------------------------------------------ |
| `-e`                       | 直接在指令列模式上进行sed的动作编辑。它告诉sed将下一个参数解释为一个sed指令，只有当命令行上给出多个sed指令时才需要使用-e选项;一行命令语句可以执行多条sed命令 |
| `-i`                       | 直接对内容进行修改，不加-i时默认只是预览，不会对文件做实际修改 |
| `-f`                       | 后跟保存了sed指令的文件                                      |
| `-n`                       | 取消默认输出，sed默认会输出所有文本内容，使用-n参数后只显示处理过的行 |
| `-r ruguler              ` | 使用扩展正则表达式，默认情况sed只识别基本正则表达式 *        |

sed程序命令功能描述

| 命令 | 功能描述                                      |
| ---- | --------------------------------------------- |
| `a`  | add新增，a的后面可以接字串，在下一行出现      |
| `c`  | change更改, 更改匹配行的内容                  |
| d    | delete删除, 删除匹配的内容                    |
| `i`  | insert插入, 向匹配行前插入内容                |
| `p`  | print打印, 打印出匹配的内容，通常与-n选项和用 |
| s    | substitute替换, 替换掉匹配的内容              |
| `=`  | 用来打印被匹配的行的行号                      |
| `n`  | 读取下一行，遇到n时会自动跳入下一行           |

特殊符号


### 数据准备

sed.txt文件内容

```shell
ABC
itheima itheima
itcast
123
itheima
```



### 示例：向文件中添加数据

#### 演示1: 指定行号的前或后面添加数据

```shell
# 向第三行后面添加hello(未修改原文件，只进行预览)
sed '3ahello' sed.txt
# 向第三行后面添加hello(修改完源文件)
sed -i '3ahello' sed.txt
```

> 3 , 代表第三行
>
> a,  代表在后面添加, 出现在下一行
>
> 注意这里没有修改源文件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209250913708.png" alt="image-20220925091337508" style="zoom:80%;" />

向第三行**前面**添加hello

```shell
sed '3ihello' sed.txt
```

> 3 , 代表第三行
>
> i,  代表在前面添加, 出现在上一行
>
> 注意这里没有修改源文件，加上-i才能修改

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209250914442.png" alt="image-20220925091413246" style="zoom:80%;" />

#### 演示2: 指定内容前或后面添加数据

向内容 `itheima` 后面添加 `hello` ，如果文件中有多行包括 ``itheima` `，则每一行后面都会添加

```shell
sed '/itheima/ahello' sed.txt
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209250915296.png" alt="image-20220925091551110" style="zoom:80%;" />

向内容 `itheima` 前面添加 `hello` ，如果文件中有多行包括 ``itheima` `，则每一行前面都会添加

```shell
sed '/itheima/ihello' sed.txt
```

运行效果

![image-20200710001012028](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120040.png)

#### 演示3: 在最后一行前或后添加hello

在最后一行后面添加hello

```shell
sed '$ahello' sed.txt
```

> $a:  最后一行后面添加

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209250917712.png" alt="image-20220925091747518" style="zoom:80%;" />

在最后一行前面添加hello

```shell
sed '$ihello' sed.txt
```

> $i:  最后一行前面添加

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209250918804.png" alt="image-20220925091816604" style="zoom:80%;" />



### 示例: 删除文件中的数据

#### 演示1: 删除第2行

命令

```shell
sed  '2d' sed.txt
# d 用于删除
# 2d 删除第2行
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209250918694.png" alt="image-20220925091851493" style="zoom:80%;" />

命令: 删除第1行,第4行数据

```shell
sed '1d;4d' sed.txt
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209250919375.png" alt="image-20220925091926174" style="zoom:80%;" />



#### 演示2: 删除奇数行

从第一行开始删除，每隔2行就删掉一行

```shell
sed '1~2d' sed.txt
# 1~2 从第1行开始, 每隔2行删一次
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209250920568.png" alt="image-20220925092006404" style="zoom:80%;" />

#### 演示3:  删除指定范围的多行数据

删除从第1行到第3行的数据

```shell
sed '1,3d' sed.txt
# 1,3  从指定第1行开始到第3行结束
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209250920446.png" alt="image-20220925092037259" style="zoom:80%;" />



#### 演示3:  删除指定范围取反的多行数据

删除从第1行到第3行取反的数据

```shell
sed '1,3!d' sed.txt
# 1,3! 从指定第1行开始到第3行结束取反, 就是不在这个范围的行
```

运行效果

![image-20200710171410645](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120743.png)

#### 演示4: 删除最后一行

```shell
sed  '$d' sed.txt
```

运行效果

![image-20200710173137962](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120750.png)

#### 演示5: 删除匹配itheima的行

```shell
sed '/itheima/d' sed.txt
```

运行效果

![image-20200710173601573](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120751.png)

#### 演示6: 删除匹配行到最后一行

删除匹配itheima行到最后一行 , 命令

```shell
sed '/itheima/,$d' sed.txt
# , 代表范围匹配
```

运行效果

![image-20200710174149348](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120760.png)

#### 演示7: 删除匹配行及其后面一行

删除匹配itheima行及其后面一行

```shell
sed '/itheima/,+1d' sed.txt
```

运行效果

![image-20200710174655691](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120290.png)

#### 演示9: 删除不匹配的行

删除不匹配 `itheima` 或 `itcast` 的行

```shell
sed '/itheima\|itcast/!d' sed.txt

# \| 是正则表达式的或者 这里|需要转义, 所以为\|
# ! 取反
```

运行效果

![image-20200711105205862](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120300.png)

### 示例：更改文件中的数据

#### 演示1:将文件的第一行修改为hello

命令

```shell
sed  '1chello'  sed.txt
```

运行效果

![image-20200710110433788](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120302.png)

#### 演示2: 将包含itheima的行修改为hello

命令

```shell
sed  '/itheima/chello' sed.txt
```

运行效果

![image-20200710110651523](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120305.png)

#### 演示3: 将最后一行修改为hello

命令

```shell
sed '$chello' sed.txt
```

运行效果

![image-20200710111014651](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120312.png)

#### 演示4: 将文件中的itheima替换为hello

将文件中的itheima替换为hello,默认只替换每行第一个itheima

```shell
sed 's/itheima/hello/'  sed.txt
```

运行效果

![image-20200710154359291](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120315.png)

> 注意 `'s/itheima/hello/'`  最后一个`/` 不可少

将文本中所有的itheima都替换为hello, 全局替换

```shell
sed 's/itheima/hello/g'  sed.txt
# g 代表匹配全局所有符合的字符
```

![image-20200710154642832](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120244.png)

#### 演示5: 将每行中第二个匹配替换

将每行中第二个匹配的itheima替换为hello 命令

```shell
sed 's/itheima/hello/2'   sex.txt
```

运行效果

![image-20200710154829235](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120251.png)

#### 演示6: 替换后的内容写入文件

将每行中第二个匹配的itheima替换为hello ,  将替换后的内容写入到sed2.txt文件中

```shell
# 第一种方式
sed -n 's/itheima/hello/2pw sed2.txt' sed.txt
# w写入
# p打印, -n只是获取

# 第二种方式
sed -n 's/itheima/hello/2p ' sed.txt > sed2.txt
```

运行效果

![image-20200710161127555](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120254.png)

#### 演示7: 正则表达式匹配替换

匹配有 `i` 的行，替换匹配行中 `t` 后的所有内容为空

```shell
sed '/i/s/t.*//g' sed.txt
# /t.*/ 表示逗号后的所又内容
```

运行效果

![image-20200710162013813](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120261.png)

#### 演示8: 每行末尾拼接test

```shell
sed 's/$/& test' sed.txt
# & 用于拼接
```

运行效果

![image-20200710164435499](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120265.png)

#### 演示9: 每行行首添加注释 `#`

命令

```shell
sed 's/^/#/' sed.txt
```

运行效果

![image-20200711111533278](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120264.png)



### 示例: 查询文件或管道中的数据

#### 需求1: 查询含有  `itcast`  的行数据

命令

```shell
sed -n '/itcast/p' sed.txt
```

运行效果

![image-20200711113348831](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120072.png)

#### 需求2: 管道过滤查询

管道查询所有进程中含有sshd的进程信息命令

```shell
ps -aux | sed -n '/sshd/p'
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209250928431.png" alt="image-20220925092846205" style="zoom:80%;" />

### 示例: 多个sed程序命令执行

将sed.txt文件中的第1行删除并将 `itheima` 替换为 `itcast`

```shell
# 第一种方式, 多个sed程序命令 在每个命令之前使用 -e 参数
sed -e '1d' -e 's/itheima/itcast/g' sed.txt 

# 第二种方式
sed  '1d;s/itheima/itcast/g' sed.txt
```

运行效果

![image-20200711105707546](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120078.png)

### sed高级用法: 缓存区数据交换

#### 模式空间与暂存空间介绍

1. 首先需要明白, sed处理文件是逐行处理的, 即**读取一行处理一行,输出一行**;

2. sed把文件读出来每一行存放的空间叫模式空间, 会在该空间中对读到的内容做相应处理;

3. 此外sed还有一个额外的空间即暂存空间, 暂存空间刚开始里边只有个空行, 记住这一点;

4. sed可使用相应的命令从模式空间往暂存空间放入内容或从暂存空间取内容放入模式空间;

   > 2个缓存空间传输数据的目的是为了更好的处理数据, 一会参考案例学习

#### 关于缓存区sed程度命令

| 命令 | 含义                                                       |
| ---- | ---------------------------------------------------------- |
| h    | 将**模式空间**里面的内容复制到**暂存空间**缓存区(覆盖方式) |
| H    | 将**模式空间**里面的内容复制到**暂存空间**缓存区(追加方式) |
| g    | 将**暂存空间**里面的内容复制到**模式空间**缓存区(覆盖方式) |
| G    | 将**暂存空间**里面的内容复制到**模式空间**缓存区(追加方式) |
| x    | 交换2个空间的内容                                          |

### 示例: 缓存空间数据交换

#### 演示1: 第一行粘贴到最后1行

将模式空间第一行复制到暂存空间(覆盖方式),并将暂存空间的内容复制到模式空间中的最后一行(追加方式)

```shell
sed '1h;$G' sed.txt
# 1h 从模式空间中将第一行数据复制到暂存空间(覆盖方式)
# $G 将暂存空间中的内容复制到模式空间中最后一行(追加方式)
```

运行效果

![image-20200711103556835](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120082.png)

#### 演示2: 第一行删除后粘贴到最后1行

将模式空间第一行复制到暂存空间(覆盖方式)并删除, 最后将暂存空间的内容复制到模式空间中的最后一行(追加方式)

```shell
sed '1{h;d};$G' sed.txt
# 1{h;d}对模式空间中的第一行数据同时进行复制到暂存空间(覆盖方式)和删除模式空间中的第一行数据
```

![image-20200711103901519](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120087.png)

#### 演示3: 第一行数据复制粘贴替换其他行数据

将模式空间第一行复制到暂存空间(覆盖方式), 最后将暂存空间的内容复制到模式空间中替换从第2行开始到最后一行的每一行数据(覆盖方式)

```shell
sed '1h;2,$g' sed.txt
```

![image-20200711104451987](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120089.png)

#### 演示4: 将前3行数据数据复制粘贴到最后一行

将前3行数据复制到暂存空间(追加方式), 之后将暂存空间的所有内容复制粘贴到模式空间最后一行(追加方式)

```shell
sed '1,3H;$G' sed.txt
```

![image-20200711104856968](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120139.png)

### 示例: 给每一行添加空行

```shell
sed G -i sed.txt
# G 每行后面添加一个空行
# -i 修改源文件
```

![image-20200711095724616](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120145.png)

### 示例: 删除所有的空行

```shell
sed -i '/^$/d' sed.txt
```

![image-20200711095844232](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120151.png)

## awk文本分析

> awk是一个强大的文本分析工具，相对于grep的查找，sed的编辑，awk在其对数据分析并生成报告时,显得尤为强大简单来说awk就是把文件逐行的读入，以空格为默认分隔符将每行切片，切开的部分再进行各种分析处理, 因为切开的部分使用awk可以定义变量,运算符, 使用流程控制语句进行深度加工与分析。
>

> 创始人 Alfred V. **A**ho、Peter J. **W**einberger和Brian W. **K**ernighan  awk由来是姓氏的首字母

### 语法

```shell
awk [options] 'pattern{action}' {filenames}
```

> pattern：表示AWK在数据中查找的内容，就是匹配模式
>
> action：在找到匹配内容时所执行的一系列命令

选项参数说明

| 选项参数 | 功能                   |
| -------- | ---------------------- |
| -F       | 指定输入文件拆分分隔符 |
| -v       | 赋值一个用户定义变量   |

### awk内置变量

| 内置变量 | 含义                                                         |
| -------- | ------------------------------------------------------------ |
| ARGC     | 命令行参数个数                                               |
| ARGV     | 命令行参数排列                                               |
| ENVIRON  | 支持队列中系统环境变量的使用                                 |
| FILENAME | awk浏览的文件名                                              |
| FNR      | 浏览文件的记录数                                             |
| FS       | 设置输入域分隔符，等价于命令行 -F选项                        |
| NF       | 浏览记录的域的个数, 根据分隔符分割后的列数                   |
| NR       | 已读的记录数, 也是行号                                       |
| OFS      | 输出域分隔符                                                 |
| ORS      | 输出记录分隔符                                               |
| RS       | 控制记录分隔符                                               |
| `$n`     | `$0`变量是指整条记录。`$1`表示当前行的第一个域,`$2`表示当前行的第二个域,......以此类推。 |
| $NF      | $NF是number finally,表示最后一列的信息，跟变量NF是有区别的，变量NF统计的是每行列的总数 |

### 数据准备

```shell
# 表示当前目录
cp /etc/passwd ./
```

### 示例 : 默认每行空格切割数据

```shell
# print后的连接符任意
echo "abc 123 456" | awk '{print $1"，"$2"，"$3}'
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209250957470.png" alt="image-20220925095732237" style="zoom:80%;" />

### 示例: 打印含有匹配信息的行

搜索passwd文件有root关键字的所有行

```shell
awk '/root/' passwd
# '/root/' 是查找匹配模式, 没有action命令, 默认输出所有符合的行数据
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209250958506.png" alt="image-20220925095818315" style="zoom:80%;" />

### 示例: 打印匹配行中第7列数据

搜索passwd文件有root关键字的所有行, 然后以":"拆分并打印输出第7列

```shell
awk -F: '/root/{print $7}' passwd
# -F: 以':'分隔符拆分每一个列(域)数据
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209250959425.png" alt="image-20220925095909176" style="zoom:80%;" />

### 示例: 打印文件每行属性信息

统计passwd:  文件名，每行的行号，每行的列数，对应的完整行内容:

```shell
awk -F ':' '{print "文件名:" FILENAME ",行号:" NR ",列数:" NF ",内容:" $0}' passwd
# "文件名:" 用于拼接字符串
```

运行效果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209251000258.png" alt="image-20220925100001918" style="zoom:80%;" />

使用printf替代print,可以让代码阅读型更好

```shell
awk -F ':' '{printf("文件名:%5s,行号:%2s, 列数:%1s, 内容:%2s\n",FILENAME,NR,NF,$O)}' passwd
# printf(格式字符串,变量1,变量2,...)
# 格式字符串: %ns 输出字符串,n 是数字，指代输出几个字符, n不指定自动占长度
# 格式字符串: %ni 输出整数,n 是数字，指代输出几个数字
# 格式字符串: %m.nf 输出浮点数,m 和 n 是数字，指代输出的整数位数和小数位数。如 %8.2f 代表共输出 8 位数，其中 2 位是小数，6 位是整数；
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209251000016.png" alt="image-20220925100051763" style="zoom:80%;" />

### 示例: 打印第二行信息

打印/etc/passwd/的第二行信息

```shell
awk -F ':' 'NR==2{printf("filename:%s,%s\n",FILENAME,$0)}' passwd
```

运行效果

![image-20200711171311183](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120941.png)

### 示例: 查找以c开头的资源

awk过滤的使用,  查找当前目录下文件名以c开头的文件列表

```shell
ls -a | awk '/^c/'
```

运行效果

![image-20200711171918200](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120951.png)

### 示例: 打印第一列

按照":" 分割查询第一列打印输出

```shell
awk -F ':' '{print $1}' passwd
```

运行效果

![image-20200711172121503](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120965.png)

### 示例: 打印最后1列

```shell
# 按照":" 分割查询最后一列打印输出
awk -F: '{print $NF}' passwd
```

![image-20200711172417497](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120969.png)

### 示例: 打印倒数第二列

```shell
# 按照":" 分割查询倒数第二列打印输出
awk -F: '{print $(NF-1)}' passwd
# $(NF-N) N是几, 就是倒数第几列
```

![image-20200711173518580](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120674.png)

### 示例: 打印10到20行的第一列

获取第10到20行的第一列的信息

```shell
awk -F: '{if(NR>=10 && NR<=20) print $1}' passwd
```

![image-20200711173734821](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120683.png)

### 示例: 多分隔符使用

"one:two/three"字符串按照多个分隔符":"或者"/" 分割, 并打印分割后每个列数据

```shell
echo "one:two/three" | awk -F '[:/]' '{printf("%s\n%s\n%s\n%s\n",$0,$1,$2,$3)}'
```

![image-20200711174827654](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120685.png)

### 示例: 添加开始与结束内容

给数据添加开始与结束

```shell
echo -e  "abc\nabc" | awk 'BEGIN{print "开始..."} {print $0} END{print "结束..."}'
# BEGIN 在所有数据读取行之前执行；END 在所有数据执行之后执行。
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209251005773.png" alt="image-20220925100522531" style="zoom:80%;" />

### 示例 : 使用循环拼接分割后的字符串

"abc itheima     itcast   21" 使用空格分割后, 通过循环拼接在一起

```shell
echo "abc itheima itcast   21" | awk -v str="" -F '[ ]+' '{for(n=1;n<=NF;n++){ str=str$n} print str }'
 
 # -v 定义变量
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209251006661.png" alt="image-20220925100635377" style="zoom:80%;" />

### 示例: 操作指定数字运算

将passwd文件中的用户id增加数值1并输出

```shell
echo "2.1" | awk -v i=1 '{print $0+i}'
```

运行效果

![image-20200711215839824](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120697.png)

### 示例: 切割ip

切割IP

```shell
ifconfig | awk '/broadcast/{print}' | awk -F " " '{print $2}'
```

运行效果

![image-20200711220230406](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120265.png)

示例: 显示空行行号

查询sed.txt中空行所在的行号

```shell
sed 'G' sed.txt | awk '/^$/{print NR}'
```

![image-20200712085616584](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120274.png)

## sort排序

> sort命令是在Linux里非常有用，它将文件进行排序，并将排序结果标准输出或重定向输出到指定文件。
>

### 语法

```shell
sort (options) 参数
```

| 选项            | 说明                                                     |
| --------------- | -------------------------------------------------------- |
| ==-n==          | number,依照数值的大小排序                                |
| ==-r==          | reverse, 以相反的顺序来排序                              |
| ==-t 分隔字符== | 设置排序时所用的分隔字符, 默认空格是分隔符               |
| ==-k==          | 指定需要排序的列                                         |
| -d              | 排序时，处理英文字母、数字及空格字符外，忽略其他的字符。 |
| -f              | 排序时，将小写字母视为大写字母                           |
| -b              | 忽略每行前面开始出的空格字符                             |
| ==-o 输出文件== | 将排序后的结果存入指定的文件                             |
| -u              | 意味着是唯一的(unique)，输出的结果是去完重了的           |
| -m              | 将几个排序好的文件进行合并                               |

参数：指定待排序的文件列表

### 数据准备

sort.txt文本文件代码

```shell
张三 30  
李四 95  
播仔 85 
播仔 85
播仔 86
AA 85
播妞 100
```

### 示例1: 数字升序

按照“ ”空格分割后的第2列数字升序排序。

```shell
sort -t " " -k2n,2 sort.txt
# -t " " 代表使用空格分隔符拆分列
# -k 2n,2 代表根据从第2列开始到第2列结束进行数字升序, 仅对第2列排序,n表示升序
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209250936614.png" alt="image-20220925093649404" style="zoom:80%;" />



### 示例2: 数字升序去重

先按照“ ”空格分割后的,  然后,按照第2列数字升序排序,  最后对所有列去重

```shell
 sort -t " " -k2n,2 -uk1,2 sort.txt
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120283.png" alt="image-20200713012712536" style="zoom:80%;" />

> 注意: 先排序再去重

### 示例3: 数字升序去重结果保存到文件

```shell
sort -t " " -k2n,2 -uk1,2 -o sort2.txt sort.txt
```

运行效果

![image-20200713012900639](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120292.png)

### 示例4: 数字降序去重

先按照“ ”空格分割后的,  然后,按照第2列数字降序排序,  最后对所有列去重

```shell
sort -t " " -k2nr,2 -uk1,2 sort.txt
```

运行效果

![image-20200713013216947](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120294.png)

### 示例5: 多列排序

数据准备sort3.txt

```shell
公司A,部门A,3
公司A,部门B,0
公司A,部门C,10
公司A,部门D,9
公司B,部门A,30
公司B,部门B,40
公司B,部门C,43
公司B,部门D,1
公司C,部门A,30
公司C,部门B,9
公司C,部门C,100
公司C,部门D,80
公司C,部门E,60
```

要求:  以","分割先对第一列字符串升序,  再对第3列数字降序

```shell
sort -t "," -k1,1 -k3nr,3 sort3.txt
```

运行效果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120026.png" alt="image-20200713013821197" style="zoom:80%;" />

能够使用sort对字符串升序或降序排序

> 字符串升序: `sort -kstart,end 文件`
>
> 字符串降序: `sort -kstartr,end 文件`

能够使用sort 对数字升序或降序

> 数字升序: `sort -kstartn,end 文件`
>
> 数字降序: `sort -kstartnr,end 文件`

能够使用sort 对多列进行排序

> `sort -kstart[nr],end  -kstart[nr],end ... 文件`

# 经典应用⭐⭐

## 查询 & 删除空行

> 问题：使用Linux命令查询file.txt中空行所在的行号，file1.txt数据准备
>

```shell
itheima itheima

itcast
123

itheima
```

```shell
# awk：命令名称，用于处理文本数据
# '/^$/{print NR}'：awk程序，包含一个模式和一个动作，用于匹配空行并输出它们所在的行号
# /^$/：模式，用于匹配空行，即不包含任何字符的行
# {print NR}：动作，用于输出空行所在的行号（即行号）
# file1.txt：输入文件名
awk '/^$/{print NR}' file1.txt
sed -i '/^$/d' file1.txt
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303121611925.png" alt="image-20230312161132687" style="zoom:80%;" />

## 求一列的和

问题：有文件file2.txt内容如下:

```shell
张三 40
李四 50
王五 60
```

使用Linux命令计算第二列的和并输出

```shell
# {sum+=$2}：awk程序，包含一个动作，用于计算文件中第2个字段的总和。
# {sum+=$2}：动作，用于将每行文本中的第2个字段加到变量sum中。
# END{print "求和: "sum}：awk程序，包含一个动作，用于在处理完所有行后输出结果。
# END：特殊的模式，用于在处理完所有行后执行。
# {print "求和: "sum}：动作，用于输出求和结果。
awk '{sum+=$2} END{print "求和: "sum}' file1.txt
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303121631057.png" alt="image-20230312163157854" style="zoom:80%;" />

## 检查文件是否存在

问题：Shell脚本里如何检查一个文件是否存在？如果不存在该如何处理？

```shell
if [ -e /root/file1.txt ]; then  echo "文件存在"; else echo "文件不存在"; fi
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303121633433.png" alt="image-20230312163310224" style="zoom:80%;" />

## 数字排序 & 求和

问题：用shell写一个脚本，对文本中无序的一列数字排序

```shell
张三 40
李四 20
王五 60
```

```shell
# 它会首先读取file1.txt文件中的每一行文本，并按照第二个字段进行排序。
# 然后，awk程序会读取排序后的文本，并将每行文本中的第二个字段加到变量sum中，
# 以计算第二个字段的总和。同时，它还会输出排序后的文本，以便查看排序结果
# 最后，它会输出第二个字段的总和，以便查看计算结果。
sort -t " " -k2,2 file1.txt | awk '{sum+=$2;print} END{print "求和: "sum}'
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303121646309.png" alt="image-20230312164649086" style="zoom:80%;" />

## 搜索指定目录下文件内容

问题：请用shell脚本写出查找当前文件夹（/root）下所有的文本文件内容中包含有字符”123”的文件名称?

这段代码是一个shell命令，用于在`/root`目录及其子目录中查找包含字符串`123`的文件，并列出这些文件所在的路径，去除重复的路径，并按字典序排序。具体来说，该命令的各个部分含义如下：

- `grep -r "123" /root`：在`/root`目录及其子目录中递归查找包含字符串`123`的文件，并将它们的内容输出到标准输出。
- `|`：管道符号，用于将前一个命令的输出作为后一个命令的输入。
- `cut -d ":" -f 1`：将前一个命令的输出作为输入，使用冒号作为分隔符，只保留每行文本的第一个字段。
- `|`：管道符号，用于将前一个命令的输出作为后一个命令的输入。
- `sort -u`：将前一个命令的输出作为输入，去除重复的行，并按字典序排序。

> 因此，执行该命令后，它会在`/root`目录及其子目录中递归查找包含字符串`123`的文件，并将它们的内容输出到标准输出。然后，它会将输出中的每一行文本使用冒号作为分隔符，只保留每行文本的第一个字段，这样就得到了这些文件所在的路径。最后，它会去除重复的路径，并按字典序排序，以便查看这些文件的列表。

> 需要注意的是，这个命令需要以管理员身份运行，因为它会搜索`/root`目录及其子目录，这是一个只有管理员才能访问的目录。另外，该命令可能会产生大量输出，因此可以使用`grep -r "123" /root | wc -l`来统计包含字符串`123`的文件数量。

```shell
grep -r "123" /root | cut -d ":" -f 1| sort -u
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303121649845.png" alt="image-20230312164914413" style="zoom:67%;" />

## 批量生成文件名

问题: 批量生产指定数目的文件,文件名采用"纳秒"命名

```shell
#!/bin/bash
read -t 30 -p "请输入创建文件的数目:" n
# 检测非数字输入，将变量n中所有的数字都替换为空字符串，然后将替换后的结果输出。
# 其中，sed命令中的s/[0-9]//g表示将输入文本中所有的数字（0-9）都替换为空字符串，
# g表示替换所有匹配到的数字，而不仅仅是第一个
# 如果变量n的值为abc123def456，那么执行该命令后，变量test的值就为abcdef，即去除了所有的数字。
test=$(echo $n | sed 's/[0-9]//g')
# -n "$n"：判断变量n的值是否为非空字符串，如果是，则返回true，否则返回false
# -z "$test"：判断变量test的值是否为空字符串，如果是，则返回true，否则返回false
# -a，表示逻辑与操作，表示只有当两个条件都为true时，整个表达式才为true
if [ -n "$n" -a -z "$test" ]
then
      for ((i=0;i<$n;i=i+1 ))
      do
           # $(date +%N)会执行date +%N命令，将其结果作为字符串返回，+%N选项表示输出当前时间的纳秒部分
           name=$(date +%N)
           # 如果当前目录下不存在名为temp的文件夹，则创建一个名为temp的文件夹
           # [! -d ./temp] 表示如果当前目录下不存在名为temp的文件夹，则条件成立，
           # &&表示只有当前一个条件成立时才执行后面的命令，因此，
           # 如果当前目录下不存在名为temp的文件夹，则执行mkdir -p ./temp，创建一个名为temp的文件夹。
           [ ! -d ./temp ] &&  mkdir -p ./temp
           touch "./temp/$name"
           echo "创建 $name 成功!"
      done
      else
           echo "创建失败"
           exit 1
fi
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209251028909.png" alt="image-20220925102801668" style="zoom:80%;" />

## 批量改名

问题: 将/root/temp目录下所有文件名重命名为"旧文件名-递增数字"?

重命名命令

```shell
rename 旧文件名 新文件名 旧文件所在位置
```

脚本代码file5.sh

```shell
#!/bin/bash
filenames=$(ls /root/temp)
number=1
for name in $filenames
do
    printf "命令前:%s" ${name}
    newname=${name}"-"${number}
    rename $name ${newname} /root/temp/*
    let number++ #每个改名后的文件名后缀数字加1
    printf "重命名后:%s \n" ${newname}
done
```

运行效果

![image-20200713091236973](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120696.png)

## 批量创建用户

问题: 根据users.txt中提供的用户列表,一个名一行, 批量添加用户到linux系统中

已知users.txt数据准备

```shell
user1
user2
```

知识点分析1: 添加用户命令

```shell
useradd 用户名
```

知识点分析2: 设置每个用户密码默认密码

```shell
echo "123456" | passwd --stdin 用户名
```

运行效果

![image-20200713092318381](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120701.png)

面试题答案: 脚本代码file6.sh

```shell
#!/bin/bash
ULIST=$(cat /root/users.txt)  ##/root/users.txt  里面存放的是用户名，一个名一行
for UNAME in $ULIST
do
     useradd $UNAME
     echo "123456" | passwd --stdin $UNAME &>/dev/null
     [ $? -eq 0 ] && echo "$UNAME用户名与密码添加初始化成功!"
done
```

![image-20200713093129265](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120715.png)

## 筛选单词

问题: 根据给出的数据输出里面单词长度大于3的单词

数据准备

```shell
I may not be able to change the past, but I can learn from it.
```

shell脚本file7.sh

```shell
echo "I may not be able to change the past, but I can learn from it." | awk -F "[ ,.]" '{for(i=1;i<NF;i++){ if(length($i)>3){print $i}}}'
```

运行效果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303121725858.png" alt="image-20230312172514622" style="zoom:80%;" />

## 单词及字母去重排序

问题

```dart
1、按单词出现频率降序排序！
2、按字母出现频率降序排序！
```

file8.txt 文件内容

```shell
No. The Bible says Jesus had compassion2 on them for He saw them as sheep without a shepherd. They were like lost sheep, lost in their sin. How the Lord Jesus loved them! He knew they were helpless and needed a shepherd. And the Good Shepherd knew He had come to help them. But not just the people way back then. For the Lord Jesus knows all about you, and loves you too, and wants to help you.
```

按照单词出现频率降序

```shell
awk -F "[,. ]+" '{for(i=1;i<=NF;i++)S[$i]++}END{for(key in S)print S[key],key}' file8.txt |sort -rn|head
```

运行效果

![image-20200713101616727](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120720.png)

按照字符出现频率降序前10个

```shell
awk -F "" '{for(i=1;i<=NF;i++)S[$i]++}END{for(key in S)print S[key],key}' file8.txt |sort -rn|head
```

运行效果

![image-20200713101521632](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208042120593.png)

## 扫描网络内存活主机

问题:  扫描192.168.56.1到192.168.56.254之间ip的是否存活, 并输出是否在线?

服务器ip存活分析

```shell
ping ip地址 -c 2
# 如果ip地址存活发送2个数据包会至少接收返回1个数据包
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209251044739.png" alt="image-20220925104451470" style="zoom:80%;" />

完整脚本代码

```shell
#!/bin/bash
count=0
for i  in 192.168.22.{1..254}
do
    # 使用ping命令发送2个包测试, 并获取返回接收到包的个数
    # NR==6，第六行，print $4，第四列
    receive=$(ping $i -c 2|awk 'NR==6{print $4}')
    # 接收返回包大于0 说明主机在线
    if [ ${receive} -gt 0 ]
    then
        echo "${i} 在线"
        ((count+=1))
    else
        echo "${i} 不在线"
    fi

done
echo "在线服务器有:"$count"个
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208052218149.png" alt="image-20220805221841831" style="zoom:67%;" />

## MySQL分库备份

```shell
#!/bin/bash
user=root      #用户名
pass=123456      #密码
backfile=/root/mysql/backup #备份路径
[ ! -d $backfile ] && mkdir -p $backfile #判断是否有备份路径，不存在就创建目录
cmd="mysql -u$user -p$pass"  #登录数据库
dump="mysqldump -u$user -p$pass " #mysqldump备份参数
# 获取库名列表，2>/dev/null将警告信息输出到/dev/null
# egrep -v "_schema|mysql，不去备份系统数据库
dblist=`$cmd -e "show databases;" 2>/dev/null |sed 1d|egrep -v "_schema|mysql|sys"` 
echo "需要备份的数据列表:"
echo $dblist
echo "开始备份:"
#for循环备份库列表
for db_name in $dblist 
do
   printf '正在备份数据库:%s' ${db_name}
   #库名+时间备份打包至指定路径下
   $dump $db_name 2>/dev/null |gzip >${backfile}/${db_name}_$(date +%m%d).sql.gz 
   printf ',备份完成\n'
done
echo "全部备份完成!!!"
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209251234938.png" alt="image-20220925123401683" style="zoom:80%;" />



## MySQL分库分表备份

```sql
mysql -uroot -p123456
# 避免去备份系统数据库
show databases;
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209251226326.png" alt="image-20220925122612063" style="zoom:80%;" />

```shell
#!/bin/bash
user=root      #用户名
pass=123456      #密码
backfile=/root/mysql/backup # 设置备份路径

[ ! -d $backfile ] && mkdir -p $backfile #判断是否有备份路径，如果没有，则创建该路径
cmd="mysql -u$user -p$pass"  #登录数据库
dump="mysqldump -u$user -p$pass " #mysqldump备份参数

# 获将包含所有不属于系统保留的数据库名称列表
# ${cmd} -e "show databases;"用于获取所有数据库的名称列表。
# 2>/dev/null表示将标准错误输出重定向到/dev/null设备，以避免错误信息输出到屏幕上
# |sed 1d表示使用sed命令删除第一行输出（因为第一行输出是表头信息）
# |egrep -v "_schema|mysql|sys"表示使用egrep命令过滤掉名称中包含_schema、mysql或sys的数据库
# 这些数据库通常是系统保留的数据库，不需要进行处理。
dblist=`$cmd -e "show databases;" 2>/dev/null |sed 1d|egrep -v "_schema|mysql|sys"` 
echo "需要备份的数据列表:"
echo $dblist
echo "开始备份:"
for db_name in $dblist #for循环备份库列表
do
   printf '正在备份数据库:%s\n' ${db_name}
   tables=`mysql -u$user -p"$pass" -e "use $db_name;show tables;" 2>/dev/null|sed 1d`
   for j in $tables
      do
         printf '正在备份数据库 %s 表 %s ' ${db_name} ${j}
         $dump -B --databases $db_name --tables $j 2>/dev/null > 
         ${backfile}/${db_name}-${j}-`date +%m%d`.sql
         printf ',备份完成\n'
      done
      printf '数据库 %s 备份完成\n' ${db_name}
done
echo "全部备份完成!!!"
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209251227001.png" alt="image-20220925122715694" style="zoom:80%;" />











