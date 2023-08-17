

# Java概览

## Java 概览

### 背景知识

![image-20230114091821489](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301140918644.png)

### 为什么用 Java

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301140919287.png" alt="image-20230114091923198" style="zoom:67%;" />

### Java 发展史

Java语言的产品是 **JDK Java Development Kit** **：**Java开发者工具包 **，**必须安装JDK才能使用Java语言。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301140927853.png" alt="image-20230114092748758" style="zoom:67%;" />



### Java能做什么

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301140920152.png" alt="image-20230114092010043" style="zoom:80%;" />

### Java 技术体系

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301140920029.png" alt="image-20230114092052926" style="zoom:67%;" />

## Java 环境搭建

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021006318.png" alt="image-20220602100626245" style="zoom:80%;" />

### 获取JDK

官网：https://www.oracle.com/java/technologies/downloads/

进入官网：https://www.oracle.com/index.html

选择“Product”->“Java”，选择“Download Java”，选择“Java archive”

网页往下拉，找到对应版本，如Java 8，进入这个页面，往下拉，找到对应系统的版本

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301140929241.png" alt="image-20230114092933130" style="zoom:67%;" />

PS：下载历史版本需要Oracle账户：Oracle账号密码：1597374863@qq.com，315217renS!

### Linux版本安装

#### 1. 上传安装包

使用FinalShell自带的上传工具将jdk的二进制发布包上传到Linux 

由于上述在进行文件上传时，选择的上传目录为根目录 /，上传完毕后，我们执行指令 cd / 切换到根目录下，查看上传的安装包。

![image-20220206120608412](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220206120608412.png)

#### 2. 解压安装包

执行如下指令，将上传上来的压缩包进行解压，并通过-C参数指定解压文件存放目录为 /usr/local。

```apl
tar -zxvf jdk-8u171-linux-x64.tar.gz -C /usr/local
```

![image-20220206120616991](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220206120616991.png)

#### 3. 配置环境变量

使用vim命令修改/etc/profile文件，在文件末尾加入如下配置

```apl
vim /etc/profile
```

```apl
export JAVA_HOME=/usr/local/jdk1.8.0_171
export PATH=$JAVA_HOME/bin:$PATH
```

#### 4. 重新加载profile文件

为了使更改的配置立即生效，需要重新加载profile文件，执行命令:

```apl
source /etc/profile
```

#### 5. 检查安装是否成功

```apl
java -version
```

![image-20210814182327675](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210814182327675.png) 

### 验证JDK是否安装成功

> 在命令行 窗口中分别输入javac –version 及 java –version看版本提示，如果版本提示与自己安装的版本号一致，则代表JDK环境搭建成功。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301140936963.png" alt="image-20230114093645873" style="zoom:80%;" />

### **Javac** **和** **java**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301140939691.png" alt="image-20230114093958604" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301140940618.png" alt="image-20230114094015536" style="zoom:67%;" />

## 命令行常用命令

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021003789.png" alt="image-20220602100323723" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301140943771.png" alt="image-20230114094321669" style="zoom: 50%;" />



## 第一个Java程序

> 第一个Java程序建议使用记事本书写。
>
> 建议代码文件名全英文，首字母大写，满足驼峰模式，源代码文件的后缀必须是.java 。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301140946811.png" alt="image-20230114094612702" style="zoom:80%;" />

![image-20230114095926548](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301140959656.png)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141000774.png" alt="image-20230114100014685" style="zoom:67%;" />

## HelloWorld 相关问题

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141001721.png" alt="image-20230114100108618" style="zoom: 60%;" />

### Windows的文件扩展名没有勾选

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141001028.png" alt="image-20230114100152911" style="zoom:67%;" />

### 代码写对了，但是忘记保存了

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141002158.png" alt="image-20230114100236058" style="zoom:67%;" />

### 文件名和类名不一致

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141002339.png" alt="image-20230114100250234" style="zoom:67%;" />

### 大小写错误

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141003883.png" alt="image-20230114100315757" style="zoom:67%;" />

### 括号不配对

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141003627.png" alt="image-20230114100344515" style="zoom:50%;" />

### 编译、执行使用不当

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141004663.png" alt="image-20230114100404566" style="zoom:67%;" />

## Java程序的执行原理

### 机器语言

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141009698.png" alt="image-20230114100819175" style="zoom:67%;" />

### 机器语言实现呼吸灯

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141010808.png" alt="image-20230114101033704" style="zoom:67%;" />

### 编程语言发展历程

> 机器语言、汇编语言、高级语言
>
> 不管是什么样的高级编程语言，最终都是翻译成计算机底层可以识别的机器语言

### BUG

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141013019.png" alt="image-20230114101301747" style="zoom:67%;" />

## JDK的组成、跨平台原理

### JDK的组成

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141014732.png" alt="image-20230114101425612" style="zoom:67%;" />

### Java的跨平台、工作原理

> 一次编译，处处可用，我们的程序只需要开发一次，就可以在各种安装了JVM的系统平台上运行

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141015931.png" alt="image-20230114101518808" style="zoom:67%;" />



## Path和Java_home环境变量

### Path 环境变量

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141018053.png" alt="image-20230114101840959" style="zoom:67%;" />

### Path 原理

> 当我们在Path中配置某个程序路径后，启动命令行窗口启动程时，是如何去找该程序的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141020750.png" alt="image-20230114102034658" style="zoom:80%;" />

### 配置Java_home环境变量

[(191条消息) 一步步教你如何配置Java环境变量（超级详细）_java环境变量配置_玺泺的博客-CSDN博客](https://blog.csdn.net/m0_61003412/article/details/120832955)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141022157.png" alt="image-20230114102255047" style="zoom: 67%;" />



# Java基础语法

## 注释

> 注释是写在程序中对代码进行解释说明的文字，方便自己和其他人查看，以便理解程序的。

### 注释种类

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141051698.png" alt="image-20230114105127600" style="zoom:80%;" />

### 注释特点

> 注释不影响程序的执行。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141053014.png" alt="image-20230114105308909" style="zoom:67%;" />

### 注释快捷键

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141054820.png" alt="image-20230114105434743" style="zoom:67%;" />

## 字面量

> 计算机是用来处理数据的，字面量就是告诉程序员：数据在程序中的书写格式。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141056290.png" alt="image-20230114105639181" style="zoom:67%;" />

```java
public class LiteralDemo {
    public static void main(String[] args) {
        // 目标：学会常见字面量数据在程序中的书写格式。
        // 1、整数、小数
        System.out.println(666);
        System.out.println(3.14);

        // 2、字符：加单引号，有且仅能有一个字符
        System.out.println('a');
        System.out.println('A');
        System.out.println('0');
        System.out.println('中');
        //System.out.println('中国'); // 报错的
        //System.out.println(''); // 报错的
        System.out.println(' ');
        // 注意：几个特殊字符
        System.out.println('a');
        System.out.println('\n'); // \n代表换行
        System.out.println('a');
        System.out.println('\t'); // \t代表一个tab

        // 3、字符串：加双引号，里面的内容可以随便写
        System.out.println("");
        System.out.println("    ");
        System.out.println("黑马程序员");
        System.out.println("我爱您中国 abc 1234324 ");

        // 4、布尔值：true , false
        System.out.println(true);
        System.out.println(false);
    }
}
```

## 变量

> 变量就是内存中的一块区域，用来存储一个数据的，且存储的数据可以被替换。变量中只能存一个值，变量中存的值是可以替换的，内存中的一块区域，用来存储一个数据的，且存储的数据可以被替换

### 变量基本使用

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141101797.png" alt="image-20230114110117701" style="zoom:67%;" />

```java
public class VariableDemo1 {
    public static void main(String[] args) {
        // 目标：让同学们学会定义并使用变量。
        // 数据类型 变量名称 = 初始值;
        // 注意：从右往左边看的（赋值）
        int age = 21;
        System.out.println(age);

        age = 25;
        System.out.println(age);

        System.out.println("-------------实际操作------------");
        double money = 6.0;
        System.out.println(money);

        // 收红包4元
        money = money + 4.0;
        System.out.println(money);
    }
}
```

### 变量注意点

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141108497.png" alt="image-20230114110817402" style="zoom:67%;" />

```java
public class VariableDemo2 {
    public static void main(String[] args) {
          // 目标：理解变量定义的注意事项，并注意。
          // 1、变量要先声明再使用
          int age = 21;
          age = 25;
          System.out.println(age);
        
          // 2、变量声明后，不能存储其他类型的数据。
          // age = 35.9;

         // 3、变量的有效范围是从定义开始到“}”截止,且在同一个范围内部不能定义2个同名的变量。
         {
             double money = 23.5;
             System.out.println(money);
             // double money = 10.4; // 报错
             // int age = 28; // 报错
         }
        // System.out.println(money); // 报错
        System.out.println(age);
        double money = 99.5;
        System.out.println(money);

        // 4、变量定义的时候可以没有初始值，但是使用的时候必须给初始值。
        int number ;
        number = 100;
        System.out.println(number);

        System.out.println("----------------数据在底层存储的原理：二进制形式------------------");
        char ch = 'a'; // ch = 97
        System.out.println(ch + 1);
        System.out.println(ch); // a

        int i1 = 0b01100001;
        System.out.println(i1);

        int i2 = 0141;
        System.out.println(i2);

        int i3 = 0x61;
        System.out.println(i3);
    }
}
```





## 关键字 & 标识符

凡是在程序中需要自己命名的地方都是标识符，例如：变量名、包名、类名等

### 关键字

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141148597.png" alt="image-20230114114837489" style="zoom: 50%;" />

### 标识符

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141152757.png" alt="image-20230114115203632" style="zoom:67%;" />

### 标识符命名规则

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021011559.png" alt="image-20220602101129471" style="zoom:80%;" />



## 进制转换

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141120396.png" alt="image-20230114112000304" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021004569.png" alt="image-20220602100404506" style="zoom:80%;" />

### 八进制、十六进制

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141133466.png" alt="image-20230114113356356" style="zoom:67%;" />

### 计算机计算

> 打开本地计算器，直接搜calc或者计算机即可，选择程序员

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141123774.png" alt="image-20230114112312670" style="zoom:50%;" />



### 代码实现

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208072334330.png" alt="image-20220807233419166" style="zoom:67%;" />

```java
public static void test() {
    // 转换成二进制
    String s = Integer.toBinaryString(100);
    //转换成八进制
    String s1 = Integer.toOctalString(100);
    //转换成十六进制
    String s2 = Integer.toHexString(100);
    //字符串转数字
    int i = Integer.parseInt("212");
    System.out.println(s);
    System.out.println(s1);
    System.out.println(s2);
    System.out.println(i);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208072337602.png" alt="image-20220807233721455" style="zoom:67%;" />

## 数据单位

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141135043.png" alt="image-20230114113514954" style="zoom:67%;" />



## 数据类型

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141140726.png" alt="image-20230114114018607" style="zoom:67%;" />

```java
public class VariableDemo3 {
    public static void main(String[] args) {
        // 目标：掌握常用8种基本数据类型定义变量。
        // 1、byte 字节型
        byte age =  120;
        byte age2 = 127;
        //byte age3 = 128;

        // 2、short 短整型
        short s1 = 32542;
        // short s2 = 42542;

        // 3、int 整型 (默认类型，如果不确定数据的范围会多大，就用int)
        int i = 1;
        int it = 243244244;

        // 4、long 长整型
        long l = 32332323;
        // 注意：随便写一个字面量34243243243245默认是当成int类型的，
        // 34243243243245虽然没有超过long的范围
        // 但是34243243243245它超过了int本身的范围，
        // 如果希望34243243243245这个数据是long类型的，需要在后面加L l
        long l2 = 34243243243245L;

        // 5、浮点型（小数）
        // float称为单精度小数：注意：随便写一个小数字面量默认是double类型的，
        // 如果希望随便写一个小数默认是float类型的需要加上F/f
        float f = 3.14F;

        // 6、double 双精度
        double score = 99.5;

        // 7、字符型
        char ch = '徐';
        char ch1 = '黑';

        // 8、布尔类型
        boolean flag = true;
        boolean flag2 = false;

        System.out.println("--引用数据类型：String--");
        // String表示的是字符串类型，定义的变量可以存储一个字符串
        String name = "黑马程序员";
        System.out.println(name);

        int class1 = 21;
        int itheima = 23;
    }
}
```

## 类型转换

### 自动类型转换

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301131718484.png" alt="image-20230113171801369" style="zoom:67%;" />

```java
public class TypeDemo1 {
    public static void main(String[] args) {
        // 目标：理解自动类型转换
        byte a = 20;
        int b = a; // 发生了自动类型转换
        System.out.println(a);
        System.out.println(b);

        int age = 23;
        double db = age; // 自动类型转换
        System.out.println(db);

        char ch = 'a'; // 00000000 01100001
        int code = ch; // 00000000 00000000 00000000 01100001
        System.out.println(code);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301131719721.png" alt="image-20230113171934635" style="zoom:67%;" />

### 表达式的自动类型转换

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301131720071.png" alt="image-20230113172023988" style="zoom:50%;" />

```java
public class TypeDemo2 {
    public static void main(String[] args) {
        //目标：掌握表达式的自动类型转换的规则。
        byte a = 10;
        int b = 20;
        double c = 1.0;
        double rs = a + b + c;
        System.out.println(rs);

        double rs2 = a + b - 2.3;
        System.out.println(rs2);

        // 面试题
        byte i = 100;
        byte j = 120;
        int k = i + j;
        System.out.println(k);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301131722596.png" alt="image-20230113172211512" style="zoom:67%;" />

### 强制类型转换

> 可以强行将类型范围大的变量、数据赋值给类型范围小的变量。
>
> 强制类型转换**可能**造成数据(丢失)溢出；浮点型强转成整型，直接丢掉小数部分，保留整数部分返回。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301131724203.png" alt="image-20230113172404117" style="zoom:67%;" />

```java
public class TypeDemo3 {
    public static void main(String[] args) {
        // 目标：理解强制类型转换，并使用。
        int a = 20;
        byte b = (byte)a;
        System.out.println(a);
        System.out.println(b);

        int i = 1500;
        byte j = (byte) i;
        System.out.println(j);

        double score = 99.5;
        int it = (int) score;
        System.out.println(it); // 99
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301131725322.png" alt="image-20230113172516238" style="zoom:67%;" />



## 键盘录入

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301132045775.png" alt="image-20230113204523628" style="zoom:67%;" />

```java
// 1、导包操作 (并不需要自己写的，以后通过工具进行导入更方便)
public class ScannerDemo {
    public static void main(String[] args) {
        // 目标：接收用户的键盘输入的数据。
        // 2、得到一个键盘扫描器对象
        Scanner sc = new Scanner(System.in);

        System.out.println("请您输入您的年龄：");
        // 3、等待接收用户输入一个整数，按了回车键才会把数据交给age变量
        int age = sc.nextInt();
        System.out.println("您的年龄是：" + age);

        System.out.println("请您输入您的名称：");
        // 4、等待接收用户输入一个字符串，按了回车键才会把数据交给name变量
        String name = sc.next();
        System.out.println(name + "欢迎进入系统！");
    }
}
```

# 运算符

## 算术运算符

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021038638.png" alt="image-20220602103854549" style="zoom:80%;" />

### 算术运算符语法

```java
private static void extracted() {
  int a = 10;
  int b = 3;
  System.out.println(a + b);
  System.out.println(a - b);
  System.out.println(a * b);
  System.out.println(a / b); // 3.3333  ==>  3
  System.out.println(a * 1.0 / b); // 3.3333
  System.out.println(3 / 2);
  System.out.println(3 * 1.0 / 2); // 1.5
  System.out.println(3 / 2 * 1.0); // 1.0
  System.out.println(a % b); // 1
}
```

### 数值拆分

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301131739096.png" alt="image-20230113173920014" style="zoom:67%;" />

```java
public class OperatorTest2 {
    public static void main(String[] args) {
        // 需求：拆分3位数，把个位、十位、百位分别输出
        int data = 589;

        // 1、个位
        int ge = data % 10;
        System.out.println(ge);

        // 2、十位
        int shi = data / 10 % 10;
        System.out.println(shi);

        // 3、百位
        int bai = data / 100;
        System.out.println(bai);
    }
}
```

## + 做连接符⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301131747984.png" alt="image-20230113174714856" style="zoom:67%;" />

```java
public class OperatorDemo3 {
    public static void main(String[] args) {
        // 目标：+符号做连接符的识别
        int a = 5 ;
        System.out.println("abc" + 'a'); // abca
        System.out.println("abc" + a);   // abc5
        System.out.println(5 + a); // 10
        System.out.println("abc" + 5 + 'a'); // abc5a
        System.out.println(15 + "abc" + 15); // 15abc15
        System.out.println(a + 'a'); // 102
        System.out.println(a + "" +'a'); // 5a
        System.out.println(a + 'a'+" itheima "); // 102 itheima
        System.out.println("itheima"+ a + 'a'); // itheima5a
        System.out.println("itheima"+ ( a + 'a' ));// itheima102
    }
}
```

## 自增自减运算符

> ++ 和 -- 既可以放在变量的后边，也可以放在变量的前边
>
> ++ 、-- 只能操作变量，不能操作字面量的

### 基本使用

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301131750985.png" alt="image-20230113175027903" style="zoom: 50%;" />

```java
public class OperatorDemo4 {
    public static void main(String[] args) {
        // 目标：学会使用自增自减运算符： ++ --
        int a = 10;
        // a++; // a = a + 1
        ++a; // a = a + 1
        System.out.println(a); // 11

        int b = 10;
        //b--; // b = b -1
        --b;
        System.out.println(b); // 9

        System.out.println("------------------------------");
        // 在表达式中或者不是单独操作的情况，++ -- 在变量前后存在区别
        // ++ -- 在变量前面。先+1 -1 再使用。
        int i = 10;
        int j = ++i;
        System.out.println(i); // 11
        System.out.println(j); // 11

        // ++ -- 在变量的后面 先使用再+1 -1
        int m = 10;
        int n = m++;
        System.out.println(m); // 11
        System.out.println(n); // 10

        System.out.println("-----------拓展案例（可以了解和参考）--------------");
        int k = 3;
        int p = 5;
        // k  3 4 5 4
        // p  5 4 3 4
        // rs    3  +  5  -   4  + 4   - 5   +  4 + 2
        int rs = k++ + ++k - --p + p-- - k-- + ++p + 2;
        System.out.println(k); // 4
        System.out.println(p); // 4
        System.out.println(rs); // 9
    }
}
```

### 前后区别

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301131757601.png" alt="image-20230113175729519" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301131751923.png" alt="image-20230113175127826" style="zoom:50%;" />



## 赋值运算符

> **注意：扩展的赋值运算符隐含了强制类型转换。**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301131810334.png" alt="image-20230113181019229" style="zoom:67%;" />

```java
public class OperatorDemo5 {
    public static void main(String[] args) {
        // 目标：学会使用赋值运算符：= += -= *= /= %=
        int a = 10;
        int b = 200;
        // a = a + b;
        a += b; // a = (int)(a + b)
        System.out.println(a);

        byte i = 10;
        byte j = 20;
        // i = (byte) (i + j);
        i += j; // i = (byte) (i + j);
        System.out.println(i);

        int m = 10;
        int n = 5;
        // m += n;
        // m -= n;  // 等价于： m = (int)(m - n)
        // m *= n;  // 等价于： m = (int)(m * n)
        // m /= n;  // 等价于： m = (int)(m / n)
        m %= n;  // 等价于： m = (int)(m % n)
        System.out.println(m);
    }
}
```

## 关系运算符(条件判断)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301131813745.png" alt="image-20230113181344628" style="zoom:67%;" />

```java
public class OperatorDemo6 {
    public static void main(String[] args) {
        // 目标：学会使用关系运算符。
        int a = 10;
        int b = 10;

        boolean rs = a == b;
        System.out.println(rs);

        System.out.println(a == b);
        System.out.println(a != b); // false
        System.out.println(a > b); //  false
        System.out.println(a >= b); // true
        System.out.println(a < b); // false
        System.out.println(a <= b); // true

        int i = 10;
        int j = 5;
        System.out.println(i == j); // false
        System.out.println(i != j); // true
        System.out.println(i > j); // true
        System.out.println(i >= j); // true
        System.out.println(i < j); // false
        System.out.println(i <= j); // false
        System.out.println(i = j); // 5 相等判断必须是== 如果使用=是在进行赋值操作！
    }
}
```



## 逻辑运算符⭐

### 逻辑运算符

> 可以把多个条件的布尔结果放在一起运算，最终返回一个布尔结果。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301131817140.png" alt="image-20230113181705020" style="zoom:67%;" />

### 短路运算符⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301131824325.png" alt="image-20230113182436220" style="zoom:67%;" />

### 案例演示

```java
public class OperatorDemo7 {
    public static void main(String[] args) {
        // 目标：学会使用逻辑运算符，并能够选择合适的逻辑运算符解决问题。
        double size = 9.8;
        double storage = 6;
        // 需求：尺寸大于等于6.95 内存要大于等于8GB
        // 注意：必须前后都是true结果才是true
        System.out.println(size >= 6.95 & storage >=8); // false

        // 需求：要么内存大于等于8 要么尺寸大于等于6.95
        // 注意：只要有一个是true 结果就一定是true
        System.out.println(size >= 6.95 | storage >=8); // true

        System.out.println(!true); // false
        System.out.println(!false); // true

        // 逻辑异或：必须两个不同结果才是true
        System.out.println(false ^ true); // true
        System.out.println(true ^ false); // true
        System.out.println(true ^ true); // false
        System.out.println(false ^ false); // false

        System.out.println("-----------&&  &  || |的区别-------------------");
        int a = 10;
        int b = 20;
        System.out.println(a > 100 && ++b > 10); // false
        System.out.println(a > 100 & ++b > 10); // false
        System.out.println(b); // 21

        int i = 10;
        int j = 20;
        System.out.println(i > 2 || ++j > 10); // true
        System.out.println(i > 2 | ++j > 10); // true
        System.out.println(j); // 21
    }
}
```



## 三元运算符

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301131917328.png" alt="image-20230113191748214" style="zoom:67%;" />

### 基本语法

```java
public class OperatorDemo8 {
    public static void main(String[] args) {
        // 目标：学会使用三元运算符，理解其流程
        double score = 18;
        String rs = score >= 60 ? "考试通过" : "挂科";
        System.out.println(rs); // 挂科

        // 需求：需要从2个整数中找出较大值
        int a = 10000;
        int b = 2000;
        int max = a > b ? a : b;
        System.out.println(max); // 10000

        System.out.println("-------------拓展知识-------------");
        int rsMax1 = i > j ? (i > k ? i : k) : (j > k ? j : k);
        System.out.println(rsMax1); // 50
    }
}
```

### 求最大值

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301131922741.png" alt="image-20230113192225563" style="zoom:67%;" />

```java
private static void getMax(int i, int j, int k) {
    // 1、找出2个整数的较大值，可以使用：Math.max(i, j)
    int temp = i > j ? i : j;
    // 2、拿临时变量与第三个变量的值继续比较
    int rsMax = temp > k ? temp : k;
    System.out.println(rsMax);
}
```

## 位运算符

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021043985.png" alt="image-20220602104347900" style="zoom:80%;" />

## 运算符优先级

> 在表达式中，哪个运算符先执行后执行是要看优先级的，例如 “*、/” 的优先级高于”+、-”。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301131959284.png" alt="image-20230113195950170" style="zoom: 67%;" />



# 程序流程控制

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121028001.png" alt="image-20230112102849827" style="zoom:67%;" />

## IF 分支⭐

根据判定的结果（真或假）决定执行某个分支的代码

### If分支三种格式

![image-20211016110248338](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211016110248338.png)

### IF 第一种格式

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121033066.png" alt="image-20230112103318955" style="zoom: 60%;" />

```java
// 需求：心跳（60 - 100）之间是正常的，否则系统提示进一步检查
// 格式1： if(条件表达式){  代码... }
int heartBeat = 30;
if(heartBeat < 60 || heartBeat > 100) {
    System.out.println("您的心跳数据是：" + heartBeat +"，您可能需要进一步检查！");
}
System.out.println("检查结束");
```

### IF 第二种格式

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121034886.png" alt="image-20230112103405771" style="zoom:60%;" />

```java
// 格式2： if(条件表达式){ 代码... } else {  代码... }
// 需求：发红包。
double money = 1;
// 发送一个1314.
if(money >= 1314){
    System.out.println("您当前发送红包成功~~~");
}else {
    System.out.println("您自己都没钱，就别发了~~");
}
```

### IF 第三种格式

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121035756.png" alt="image-20230112103508626" style="zoom:60%;" />

```java
// 格式3： if(条件表达式){ 代码...}else if(条件表达式){ 代码... } ... else{ 代码...}
// 绩效系统： 0-60 C  60-80 B 80-90 A 90-100 A+
int score = 199;
if(score >= 0 && score < 60){
    System.out.println("您本月的绩效是：C");
}else if(score >= 60 && score < 80){
    System.out.println("您本月的绩效是：B");
}else if(score >= 80 && score < 90){
    System.out.println("您本月的绩效是：A");
}else if(score >= 90 && score <= 100){
    System.out.println("您本月的绩效是：A+");
}else {
    System.out.println("您录入的分数有毛病！");
}
```

## switch语句

> switch 底层是使用 int 型 来进行判断的，即使是枚举、String类型，最终也是转变成 int 型。由于 long 型表示范围大于 int 型，因此不支持 long 类型。也是匹配条件去执行分支, **适合做值匹配的分支选择，结构清晰，格式良好。**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121044177.png" alt="image-20211016110507988" style="zoom:80%;" />

```java
public class SwitchDemo2 {
    public static void main(String[] args) {
        String weekday = "周二";
        getDaily(weekday);
    }

    public static void getDaily(String weekday) {
        switch (weekday){
            case "周一":
                System.out.println("埋头苦干，解决bug ");
                break;
            case "周二":
                System.out.println("请求大牛程序员帮忙");
                break;
            case "周三":
                System.out.println("今晚啤酒、龙虾、小烧烤");
                break;
            case "周四":
                System.out.println("主动帮助新来的女程序解决bug");
                break;
            case "周五":
                System.out.println("今晚吃鸡");
                break;
            case "周六":
                System.out.println("与王婆介绍的小芳相亲");
                break;
            case "周日":
                System.out.println("郁郁寡欢、准备上班");
                break;
            default:
                System.out.println("数据有误！");
        }
    }
}
```





## if & switch业务场景

> - **if其实在功能上远远强大于switch**。
> - if适合做区间匹配。
> - switch适合做：值匹配的分支选择、代码优雅。



## switch 注意事项

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121047819.png" alt="image-20230112104719711" style="zoom:67%;" />



## switch穿透性⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121050986.png" alt="image-20230112105026865" style="zoom:67%;" />

```java
public class SwicthDemo4 {
    public static void main(String[] args) {
        // 需求：用户输入月份可以展示该月份的天数。1、3 、5、 7 、 8、 10、 12月份是 31天
        // 2月份是闰年为29天、非闰年为28天。4 、6 、9、 11月份 是30天
        int month = 7;
        switch (month){
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                System.out.println(month +"是31天！");
                break;
            case 2:
                System.out.println(month +"月闰年为29天、非闰年为28天！");
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                System.out.println(month +"是30天！");
                break;
            default:
                System.out.println("数据有误！");
        }
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121052101.png" alt="image-20230112105254015" style="zoom:80%;" />

## for 循环语句

### for 基本语法

> - for(;;)中两个分号不可以省略，但是表达式可以省略
> - 适用于起始条件和终止条件明确，循环次数比较明显的情况

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211016111328866.png" alt="image-20211016111328866" style="zoom:80%;" />

```java
public class ForDemo1 {
    public static void main(String[] args) {
        // 目标：学会使用for循环，并理解它的执行流程。
        // 需求：输出3次HelloWorld
        for (int i = 0; i < 3; i++) {
            System.out.println("HelloWorld");
        }

        System.out.println("---------------------");
        for (int i = 0; i < 5; i++) {
            System.out.println("HelloWorld");
        }

        System.out.println("---------------------");
        for (int i = 1; i < 5; i++) {
            System.out.println("HelloWorld");
        }

        System.out.println("---------------------");
        for (int i = 1; i <= 5; i++) {

        }

        System.out.println("---------------------");
        for (int i = 1; i <= 5; i+=2) {
            System.out.println("HelloWorld");
        }
    }
}
```

### for 执行流程

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121058693.png" alt="image-20230112105850575" style="zoom:67%;" />

### for 循环案例

#### 求和

```java
public class ForTest2 {
    public static void main(String[] args) {
        // 需求：计算1-5的和
        // 2、定义一个整数变量用于累加数据求和
        int sum = 0;
        // 1、定义一个for循环找到 1 2 3 4 5
        for (int i = 1; i <= 5 ; i++) {
            sum += i;
        }
        System.out.println("1-5的和是：" + sum); // 15
    }
}
```

#### 求奇数和

```java
public class ForTest3 {
    public static void main(String[] args) {
        // 需求：求1-0的奇数和
        // 3、定义一个求和的变量 累加奇数和
        int sum = 0;
        // 1、定义一个循环找到 1 2 3...10
        for (int i = 1; i <= 10; i++) {
            // i  1 2 3 4 5 6 7 8 9 10
            // 2、筛选出奇数
            if(i % 2 == 1){
                // i = 1 3 5 7 9
                sum += i;
            }
        }
        // 4、输出求和变量即可
        System.out.println("1-10的奇数和是：" + sum);

        System.out.println("-------------------");
        // 2、定义一个求和的变量 累加奇数和
        int sum1 = 0;
        // 1、定义循环找到 1 3 5 7 9
        for (int i = 1; i <= 10; i+=2) {
            // i = 1 3 5 7 9
            sum1 += i;
        }
        // 3、输出求和变量即可
        System.out.println("1-10的奇数和是：" + sum1);
    }
}
```

#### 水仙花数

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121104277.png" alt="image-20230112110454183" style="zoom:60%;" />

```java
public class ForTest4 {
    public static void main(String[] args) {
        // 需求：找出水仙花数并输出
        // 在循环外定义一个变量用于记录水仙花的个数
        int count = 0;
        // 1、定义一个for循环找出全部三位数
        for (int i = 100; i <= 999; i++) {
            // 2、判断这个三位数是否满足要求
            // i = 157
            // 个位
            int ge = i % 10;
            // 十位
            int shi = i / 10 % 10;
            // 百位
            int bai = i / 100;
            if( (ge*ge*ge + shi * shi * shi + bai * bai * bai) == i){
                System.out.println("水仙花数："+i);
                count++;
            }
        }
        System.out.println(); // 换行！
        System.out.println("水仙花个数是：" + count);
    }
}
```

## while 循环语句

### while 基本语法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211016111439638.png" alt="image-20211016111439638" style="zoom:80%;" />

```java
public class WhileDemo5 {
    public static void main(String[] args) {
        // 目标：学会使用while循环，并理解它的流程
        int i = 0;
        while (i < 3){
            System.out.println("Hello World");
            i++;
        }
        System.out.println("----------------------");
        int j = 0;
        while (j < 3){
            System.out.println("Hello World");
        }
    }
}
```

### while 案例

> 世界最高山峰是珠穆朗玛峰(8848.86米=8848860毫米)，假如我有一张足够大的纸，它的厚度是0.1毫米。请问，折叠多少次，可以折成珠穆朗玛峰的高度。**这种不清楚要循环多少次的情况可以选择用while实现。**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121113878.png" alt="image-20230112111338770" style="zoom: 60%;" />

```java
public class WhileTest6 {
    public static void main(String[] args) {
        // 需求：珠穆朗峰高度是8848860 纸张厚度 0.1 折叠纸张直到不低于珠穆朗峰位置，求折叠几次
        // 1、定义变量记录山峰的高度 纸张的厚度
        double peakHeight = 8848860;
        double paperThickness = 0.1;

        // 3、定义一个变量用于记录纸张折叠的次数
        int count = 0;

        // 2、定义一个while循环控制纸张进行折叠
        while (paperThickness < peakHeight){
            // 让纸张的厚度多一倍
            paperThickness *= 2;
            count++;
        }
        System.out.println("折叠的次数：" + count);
        System.out.println("纸张的最终厚度：" + paperThickness);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121116659.png" alt="image-20230112111619570" style="zoom:67%;" />

### for & while 应用场景

> - 功能上是完全一样的，for能解决的while也能解决，反之亦然。
> - 使用规范是：知道循环几次：使用for；不知道循环几次建议使用：while。

### do.....while

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211016111611367.png" alt="image-20211016111611367" style="zoom:80%;" />

```java
public class DoWhileDemo7 {
    public static void main(String[] args) {
        // 目标：学会使用dowhile循环，并理解其执行流程
        int i = 0;
        do {
            System.out.println("Hello World");
            i++;
        }while (i < 3);
    }
}
```

## 三种循环区别

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121123505.png" alt="image-20230112112341360" style="zoom:67%;" />



## 死循环

> 一直循环的执行下去，如果没有干预不会停止下来。

### 死循环写法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121124335.png" alt="image-20230112112414222" style="zoom:67%;" />

### 死循环案例-输入密码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121126774.png" alt="image-20230112112615686" style="zoom:67%;" />

```java
public class DeadForDemo8 {
    public static void main(String[] args) {
        // 1、定义正确的密码
        int okPassword = 520;
        // 2、定义一个死循环让用户不断的输入密码认证
        Scanner sc = new Scanner(System.in);
        while (true) {
            System.out.println("请您输入正确的密码：");
            int password = sc.nextInt();
            // 3、使用if判断密码是否正确
            if(password == okPassword){
                System.out.println("登录成功了~~~");
                break; // 可以理解结束当前所在循环的执行的
            }else {
                System.out.println("密码错误！");
            }
        }
    }
}
```

## 循环嵌套

> 外部循环每循环一次，内部循环全部执行完一次。

```java
public class ForForDemo9 {
    public static void main(String[] args) {
        // 场景：假如你有老婆，然后你犯错了，你老婆罚你说5天，每天3句我爱你。
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 3; j++) {
                System.out.println("我爱你");
            }
            System.out.println("--------------");
        }
        
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 5; j++) {
                System.out.print("*");
            }
            System.out.println(); // 换行
        }
    }
}
```



## break & continue

### break & continue 基本使用

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121133468.png" alt="image-20230112113357342" style="zoom:67%;" />

```java
public class BreakAndContinueDemo10 {
    public static void main(String[] args) {
        // 目标：理解break 和 continue的作用。
        // 场景：假如你又有老婆了，然后你犯错了，你老婆罚你做5天家务，每天都是洗碗。
        // 但是洗碗到第三天后心软了 原谅你了不用洗了
        for (int i = 0; i < 5; i++) {
            System.out.println("快乐的洗碗~~~~");
            if(i == 2) {
                break; // 跳出并结束当前循环的执行~~
            }
        }
        
        // continue 跳出当前循环的当次执行，进入循环的下一次
        // 场景：假如你又有老婆了，然后你犯错了，你老婆罚你做5天家务，
        // 每天都是洗碗。但是洗碗到第三天后心软了 原谅你了不用洗了 但是依然不解恨 继续洗第4天 5天
        for (int i = 1; i <= 5 ; i++) {
            if(i == 3){
                continue; // 立即跳出当次执行，进入循环的下一次！
            }
            System.out.println("洗碗：" + i);
        }
    }
}
```

### 拓展-跳出所有循环

break   : 可以用在嵌套循环中**跳出整个外部循环**的并立即结束它.

```java
OUT:
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 4; j++) {
        if (j == 2){
            break OUT;
        }
        System.out.println("hello,world");
    }
}
```

continue: 可以用在嵌套循环中**跳出外部循环的当次执行**，进入外部循环的下一次。

```java
OUT:
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 4; j++) {
        if (j == 2){
            continue OUT;
        }
        System.out.println("hello,world");
    }
}
```





# 方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121207395.png" alt="image-20230112120717285" style="zoom:67%;" />

## 方法概述

### 什么是方法

> 方法是一种语法结构，它可以把一段代码封装成一个功能，以方便重复调用。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121204008.png" alt="image-20230112120457912" style="zoom:67%;" />

### 方法使用好处

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121206421.png" alt="image-20230112120638316" style="zoom:67%;" />

## 方法定义和调用

### 方法定义

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121215118.png" alt="image-20230112121551026" style="zoom:67%;" />

### 方法调用

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121216290.png" alt="image-20230112121615211" style="zoom:67%;" />

```java
public class MethodDemo2 {
    public static void main(String[] args) {
        // 目标：学习方法的完整定义格式，并理解其调用和执行流程
        int rs = add(100, 200);
        System.out.println("和是：" + rs);

        System.out.println("-----------------");
        int rs1 = add(200, 300);
        System.out.println("和是：" + rs1);
    }

    public static int add(int a, int b){
        int c = a + b;
        return c;
    }
}
```

### 方法格式注意点

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121214252.png" alt="image-20230112121440164" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121214070.png" alt="image-20230112121452965" style="zoom:67%;" />

### 方法其他定义格式

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121222044.png" alt="image-20230112122232939" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121222935.png" alt="image-20230112122247837" style="zoom:67%;" />

### 方法定义技巧

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121229504.png" alt="image-20230112122956394" style="zoom:67%;" />

## 方法的调用流程 - Debug

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121212561.png" alt="image-20230112121229434" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121212615.png" alt="image-20230112121251500" style="zoom:67%;" />

## 方法常见问题

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121226389.png" alt="image-20230112122605277" style="zoom:67%;" />

## 方法小案例⭐

### 1-n求和

```java
public class Test1 {
    public static void main(String[] args) {
        // 需求：使用方法计算1-n的和并返回
        System.out.println("1-5的和是：" + sum(5));
        System.out.println("--------------------");
        System.out.println("1-100的和是：" + sum(100));
    }

    public static int sum(int n){
        int sum = 0;
        for (int i = 1; i <= n ; i++) {
            sum += i;
        }
        return sum;
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121232612.png" alt="image-20230112123258526" style="zoom:67%;" />

### 判断奇偶

```java
public class Test2 {
    public static void main(String[] args) {
        // 需求：判断一个整数是奇数还是偶数 并进行结果的输出 使用方法完成
        check(11);
        System.out.println("-------------");
        check(100);
    }

    public static void check(int number) {
        if(number % 2 == 0){
            System.out.println(number + "是偶数");
        }else {
            System.out.println(number + "是奇数");
        }
    }
}
```

### 找到数组最大值

```Java
public class Test3 {
    public static void main(String[] args) {
        // 需求：使用方法，支持找出任意整型数组的最大值返回。
        int[] ages = {23, 19, 25, 78, 34};
        int max = getArrayMaxData(ages);
        System.out.println("最大值数据是：" + max);

        System.out.println("-------------------");
        int[] ages1 = {31, 21, 99, 78, 34};
        int max1 = getArrayMaxData(ages1);
        System.out.println("最大值数据是：" + max1);
    }

    public static int getArrayMaxData(int[] arr){
        // 找出数组的最大值返回
        int max = arr[0];
        // 遍历数组的每个元素与最大值的数据进行比较，若较大则替换
        for (int i = 1; i < arr.length; i++) {
            if(arr[i] > max){
                max = arr[i];
            }
        }
        return max;
    }
}
```

## 方法重载

> 同一个类中，出现多个方法名称相同，但是形参列表是不同的，那么这些方法就是重载方法

### 方法重载语法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121415517.png" alt="image-20230112141532377" style="zoom:67%;" />

```java
public class MethodDemo1 {
    public static void main(String[] args) {
        // 目标：识别方法重载的形式。并理解其调用流程，最后需要知道使用方法重载的好处。
        fire();
        fire("岛国");
        fire("岛国", 1000);
    }

    public static void fire(){
        fire("米国");
    }

    public static void fire(String location){
        fire(location, 1);
    }

    public static void fire(String location, int number){
        System.out.println("默认发射"+number+"枚武器给"+location+"~~~");
    }
}
```

### 重载方法示例

```java
public class MethodDemo2 {
    // 新方法
    public static void open() {}

    // 重载方法
    public static void open(int a) {}

    // 重载方法
    static void open(int a, int b) {}

    // 重载方法
    public static void open(double a, int b) {}

    // 重载方法
    public static void open(int a, double b) {}

    // 重复方法
    // public void open(int i, double d) { }

    // 新方法
    public static void OPEN(){ }

}
```



## 参数传递机制

### 基本类型传递

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121406306.png" alt="image-20230112140652162" style="zoom:67%;" />

```java
public class Test1 {    
    
    public static void main(String[] args) {            
        int a = 10;        
        change(a);    
    }    
 
    public static void change(int c){        
        System.out.println(c);    
    }
}
```

### 引用类型的参数传递

```java
public class Test1 {    

    public static void main(String[] args) {        
        int []ages = {12,10,9,123};        
        change(ages);    
    }
    
    public static void change(int [] c){   
        System.out.println(Arrays.toString(c));                                       
    }
}
```

基本类型和引用类型的参数在传递的时候有什么不同？

- 都是值传递。
- 基本类型的参数传输存储的**数据值**。
- 引用类型的参数传输存储的**地址值**。

## return 技巧

> return;  --->  单独使用return关键字，可以立即跳出并结束当前方法的执行。

```java
public class ReturnDemo {
    public static void main(String[] args) {
        // 目标：明确return关键字的作用。
        System.out.println("main开始。。");
        chu(10 , 0);
        System.out.println("main结束。。");
    }

    public static void chu(int a, int b){
        if(b == 0){
            System.out.println("您输入的数据有问题，除数不能是0！！");
            return; // 立即跳出当前方法，并结束当前方法的执行。
        }

        int c = a / b;
        System.out.println("结果是：" + c);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121420844.png" alt="image-20230112142059746" style="zoom:67%;" />

# 编程思维训练

## 涉及到的知识点

- 变量、数组
- 运算符：基本运算符、关系运算符、逻辑运算符…
- 程序流程控制：if、switch；for、while；死循环、循环嵌套
- 跳转关键字：break、continue、return。
- 方法

## 案例一：买飞机票

**需求**

> - 机票价格按照淡季旺季、头等舱和经济舱收费、输入机票原价、月份和头等舱或经济舱。
> - 按照如下规则计算机票价格：旺季（5-10月）头等舱9折，经济舱8.5折，淡季（11月到来年4月）头等舱7折，经济舱6.5折。

**分析：**

> - 定义一个方法可以进行键盘录入机票原价、月份和机舱类型。
> - 使用if判断月份是是旺季还是淡季，使用switch分支判断是头等舱还是经济舱。
> - 选择对应的折扣进行计算并返回计算的结果。

```java
public class Test1 {
    public static void main(String[] args) {
        // 3、录入购买信息，调用方法得到最终结果
        Scanner sc = new Scanner(System.in);
        System.out.println("机票原价：");
        double price = sc.nextDouble();
        System.out.println("月份：");
        int month = sc.nextInt();
        System.out.println("仓位类型（头等舱、经济舱）：");
        String type = sc.next();

        double rs = calc(price, month, type);
        System.out.println("您当前购买机票的价格是：" + rs);
    }

    // 1、定义一个方法：形参（原价、月份、头等舱经济舱） 返回值类型申明：double
    public static double calc(double money, int month, String type){
        // 2、判断月份是淡季还是旺季
        if(month >= 5 && month <= 10){
            // 旺季
            switch (type){
                case "经济舱":
                    money *= 0.85;
                    break;
                case "头等舱":
                    money *= 0.9;
                    break;
                default:
                    System.out.println("您输入的仓位不正确~~");
                    money = -1; // 当前无法计算价格了！
            }
        }else if(month == 11 || month == 12 || month >= 1 && month <= 4){
            switch (type){
                case "经济舱":
                    money *= 0.65;
                    break;
                case "头等舱":
                    money *= 0.7;
                    break;
                default:
                    System.out.println("您输入的仓位不正确~~");
                    money = -1; // 当前无法计算价格了！
            }
        }else {
            System.out.println("月份有问题");
            money = -1;
        }

        return money;
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141455889.png" alt="image-20230114145522786" style="zoom: 67%;" />

## 案例二：找素数

> 除了1和它本身以外，不能被其他正整数整除，就叫**素数。**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141505582.png" alt="image-20230114150515480" style="zoom:67%;" />

```java
// 1、定义一个循环，找到101-200之间的全部数据
for (int i = 101; i <= 200 ; i++) {
    // i = 101 102 103 ... 199 200

    // 信号位：标记
    boolean flag = true; // 一开始认为当前数据是素数。 

    // 2、判断当前遍历的这个数据是否是素数,j是除数，不能被1整除最小整数是2，因此判断范围是  j = i / 2
    for (int j = 2; j < i / 2; j++) {
        if(i % j == 0){
            flag = false; // 假设失败了，i不是素数
            break; // 没有必要继续判定下去了！
        }
    }

    // 3、根据判定的结果选择是否输出这个数据，是素数则输出
    if(flag){
        System.out.print(i + "\t");
    }
}
```



## 案例三：开发验证码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141511943.png" alt="image-20230114151150832" style="zoom:67%;" />

### 标准方式实现

验证码工具类

```java
public class ItheimUtil {

    // 注意：由于工具类无需创建对象，所以把其构造器私有化会显得很专业！
    private ItheimUtil(){
    }

    // 静态方法
    public static String createVerifyCode(int n){
        // 开发一个验证码
        // 1、定义一个变量记住验证码。
        StringBuilder code = new StringBuilder();
        // 2、定义一个变量记住全部验证码字符。
        String data = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        // 3、定义一个循环生成几个随机索引，去得到几个字符
        Random r = new Random();
        for (int i = 0; i < n; i++) {
            // 4、获取随机索引对应的字符。链接给code
            int index = r.nextInt(data.length());
            code.append(data.charAt(index));
        }
        return code.toString();
    }
}
```

别处调用

```java
public class Check {
    public static void main(String[] args) {
        // 开发一个验证码：传入的是位数
        System.out.println(ItheimUtil.createVerifyCode(6));
    }
}
```

### 自定义方式实现

```java
// 1、定义一个方法返回一个随机验证码：是否需要返回值类型申明？String  是否需要申明形参：int n
public static String createCode(int n){
    // 3、定义一个字符串变量记录生成的随机字符
    StringBuilder code = new StringBuilder();
    Random r = new Random();
    // 2、定义一个for循环，循环n次，依次生成随机字符
    for (int i = 0; i < n; i++) {
        // i = 0 1 2 3 4
        // 3、生成一个随机字符：英文大写 小写 数字 (0 1 2)
        int type = r.nextInt(3); // 0  1  2
        switch (type){
            case 0:
                // 大写字符（A 65 - Z 65+25）  (0 - 25) + 65
                char ch = (char) (r.nextInt(26) + 65);
                code.append(ch);
                break;
            case 1:
                // 小写字符（a 97 - z 97+25）  (0 - 25) + 97
                char ch1 = (char) (r.nextInt(26) + 97);
                code.append(ch1);
                break;
            case 2:
                // 数字字符
                code.append(r.nextInt(10)); // 0 - 9
                break;
        }
    }
    return code.toString();
}
```



## 案例四：数组元素的复制

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141529144.png" alt="image-20230114152944047" style="zoom:67%;" />

```java
// 需求：把一个数组中的元素复制到另一个新数组中去。
public class Test4 {
    public static void main(String[] args) {
        int[] arr1 = {11, 22, 33, 44, 55};
        // int[] arr2 = arr1; // 没有完成了数组复制。
        int[] arr2 = new int[arr1.length];
        copy(arr1 , arr2);
        printArray(arr1);
        printArray(arr2);
    }

    public static void printArray(int[] arr){
        System.out.print("[");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(i == arr.length - 1 ? arr[i] : arr[i] + ", ");
        }
        System.out.println("]");
    }


    public static void copy(int[] arr1, int[] arr2){
        // 正式完成元素的复制
        for (int i = 0; i < arr1.length; i++) {
            arr2[i] = arr1[i];
        }
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141537958.png" alt="image-20230114153720862" style="zoom:80%;" />

## 案例五：评委打分

> 需求：在唱歌比赛中，有6名评委给选手打分，分数范围是[0 - 100]之间的整数。选手的最后得分为：去掉最高分、最低分后的4个评委的平均分，请完成上述过程并计算出选手的得分。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141540680.png" alt="image-20230114154053576" style="zoom:67%;" />

```java
public class Test5 {
    public static void main(String[] args) {
        // 1、定义一个动态初始化的数组，用于后期录入6个评委的分数
        int[] scores = new int[6];

        // 2、录入6个评委的分数
        Scanner sc = new Scanner(System.in);
        for (int i = 0; i < scores.length; i++) {
            System.out.println("请您输入第" + (i + 1) +"个评委的打分：");
            int score = sc.nextInt();
            // 3、把这个分数存入到数组的对应位置处
            scores[i] = score;
        }

        // 3、遍历数组中的每个数据，找出最大值 最小值 总分
        // int max = scores[0] , min = scores[0] , sum = 0;
        int max = scores[0] ;
        int min = scores[0] ;
        int sum = 0;
        for (int i = 0; i < scores.length; i++) {
            if(scores[i] > max){
                // 替换最大值变量存储的数据
                max = scores[i];
            }
            
            if(scores[i] < min){
                // 替换最小值变量存储的数据
                min = scores[i];
            }
            
            // 统计总分
            sum += scores[i];
        }
        System.out.println("最高分是：" + max);
        System.out.println("最低分是：" + min);
        // 4、统计平均分即可
        double result = (sum - max - min) * 1.0 / (scores.length - 2);
        System.out.println("选手最终得分是：" + result);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141542485.png" alt="image-20230114154241378" style="zoom:67%;" />

## 案例六：数字加密和解密

> 需求：某系统的数字密码，比如1983，采用加密方式进行传输，规则如下：先得到每位数，然后每位数都加上5再对10求余，最后将所有数字反转，得到一串新数。
>

```java
public class Test6 {
    public static void main(String[] args) {
        // 1、定义一个数组存储需要加密的数据
        int[] arr = {1, 9, 8, 3};
        System.out.println("加密后的密码 = " + secure(arr));
        // 其实再加密一次就是解密的结果了
        System.out.println("解密后的密码 = " + secure(arr));
    }

    private static String secure(int[] arr) {
        // 遍历数组中的每个数据，按照规则进行修改
        for (int i = 0; i < arr.length; i++) {
            arr[i] = (arr[i] + 5) % 10;
        }

        // 把数组中的元素进行反转操作。
        for (int i = 0, j = arr.length - 1; i < j; i++, j--) {
            // 交换 i 和 j位置处的值，即可反转
            int temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return Arrays.toString(arr);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141605752.png" alt="image-20230114160550640" style="zoom:67%;" />

## 案例七：抽奖

> 需求：一个大V直播抽奖，奖品是现金红包，分别有{2, 588 , 888, 1000, 10000}五个奖金。请使用代码模拟抽奖，打印出每个奖项，奖项的出现顺序要随机且不重复。打印效果如下：（随机顺序，不一定是下面的顺序）
>

```java
// 1、定义一个数组存储可以抽奖的金额 总数
int[] money = {2, 588, 888, 1000, 10000};

// 2、定义一个数组用于存储已经被抽中的奖金金额。
int[] lockMoney = new int[money.length];

// 3、开始模拟抽奖逻辑
Scanner sc = new Scanner(System.in);
Random r = new Random();
for (int i = 0; i < money.length; i++) {
    // 分别代表抽奖一次。
    System.out.println("您要开始打开红包吗，您可以输入任意内容进行抽奖：");
    sc.next(); // 目的是为了让程序在这里等一下，直到用户按了数据和回车就下来抽奖一次！

    while (true) {
        // 4、开始抽奖了，随机一个索引取提取金额
        int index = r.nextInt(money.length);
        int currentMoney = money[index];

        boolean flag = true; // 代表默认没有被抽过

        // 5、判断这个红包金额之前是否有人抽中过！
        for (int j = 0; j < lockMoney.length; j++) {
            if(lockMoney[j] == currentMoney){
                // 说明这个金额已经被抽过了！
                flag = false; // 表示已经被抽走了
                break;
            }
        }

        if(flag){
            System.out.println("您当前很幸运，抽中了：" + currentMoney);
            // 必须把这个金额放到被抽中的数组中去
            lockMoney[i] = currentMoney;
            break; // 当次抽象已经结束！
        }
    }
}
```

## 案例八：双色球

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141607769.png" alt="image-20230114160744613" style="zoom:67%;" />

### 随机一组中奖号码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141608862.png" alt="image-20230114160856729" style="zoom:67%;" />

```java
public static int[] createLuckNumber(){
    // a、定义一个动态初始化的数组，存储7个数字
    int[] numbers = new int[7];  // [12, 23, 0, 0, 0, 0, | 0]         i
    // b、遍历数组，为每个位置生成对应的号码。(注意：遍历前6个位置，生成6个不重复的红球号码，范围是1-33)
    Random r = new Random();
    for (int i = 0; i < numbers.length - 1; i++) {
        // 为当前位置找出一个不重复的1-33之间的数字
        while (true) {
            int data = r.nextInt(33) + 1; // 1-33 ====>  (0-32) + 1

            // c、注意：必须判断当前随机的这个号码之前是否出现过，
            //    出现过要重新随机一个，直到不重复为止，才可以存入数组中去。
            // 定义一个flag变量，默认认为data是没有重复的
            boolean flag = true;
            for (int j = 0; j < i; j++) {
                if(numbers[j] == data) {
                    // data当前这个数据之前出现过，不能用
                    flag = false;
                    break;
                }
            }
            if(flag) {
                // data这个数据之前没有出现过，可以使用了
                numbers[i] = data;
                break;
            }
        }
    }
    // d、为第7个位置生成一个1-16的号码作为蓝球号码
    numbers[numbers.length - 1] = r.nextInt(16) + 1;
    return numbers;
}
```

### 用户输入一组双色球号码

> 定义一个方法，该方法可以录入用户输入的6个红球和1个篮球号码
>
> 该方法最终需要返回一个数组，数组中就是用户录入的号码（7位）。

```java
public static int[] userInputNumbers(){
    // a、动态初始化一个数组，长度为7
    int[] numbers = new int[7];
    Scanner sc = new Scanner(System.in);
    for (int i = 0; i < numbers.length - 1; i++) {
        System.out.println("请您输入第"+(i + 1)+"个红球号码（1-33、不重复）：");
        int data = sc.nextInt();
        numbers[i] = data;
    }

    // b、录入一个蓝球号码
    System.out.println("请您输入一个蓝球号码（1-16）：");
    int data = sc.nextInt();
    numbers[numbers.length - 1] = data;

    return numbers;
}
```

### 中奖情况判断

> 定义一个方法，可以接收中奖号码的数组，用户选号的数组。
>
> 根据命中红球数和篮球数判断最终的中奖情况并输出详情和中奖金额。

```java
public static void judge(int[] luckNumbers, int[] userNumbers ){
    // 判断是否中奖了。
    // luckNumbers = [12, 23, 8, 16, 15, 32,   9]
    // userNumbers = [23, 13, 18, 6, 8, 33,   10]
    // 1、定义2个变量分别存储红球命中的个数，以及蓝球命中的个数。
    int redHitNumbers = 0;
    int blueHitNumbers = 0;

    // 2、判断红球命中了几个，开始统计
    for (int i = 0; i < userNumbers.length - 1; i++) {
        for (int j = 0; j < luckNumbers.length - 1; j++) {
            // 每次找到了相等了，意味着当前号码命中了
            if(userNumbers[i] == luckNumbers[j]){
                redHitNumbers ++ ;
                break;
            }
        }
    }

    // 蓝球号码是否命中了
    blueHitNumbers = luckNumbers[6] == userNumbers[6] ? 1 : 0;

    System.out.println("中奖号码是："  );
    printArray(luckNumbers);
    System.out.println("您投注号码是："  );
    printArray(userNumbers);
    System.out.println("您命中了几个红球：" + redHitNumbers);
    System.out.println("您是否命中蓝球：" + ( blueHitNumbers == 1 ? "是": "否" ) );

    // 判断中奖情况了
    if(blueHitNumbers == 1 && redHitNumbers < 3){
        System.out.println("恭喜您，中了5元小奖！");
    }else if(blueHitNumbers == 1 && redHitNumbers == 3
            || blueHitNumbers == 0 && redHitNumbers == 4){
        System.out.println("恭喜您，中了10元小奖！");
    }else if(blueHitNumbers == 1 && redHitNumbers == 4
            || blueHitNumbers == 0 && redHitNumbers == 5){
        System.out.println("恭喜您，中了200元！");
    }else if(blueHitNumbers == 1 && redHitNumbers == 5){
        System.out.println("恭喜您，中了3000元大奖！");
    }else if(blueHitNumbers == 0 && redHitNumbers == 6){
        System.out.println("恭喜您，中了500万超级大奖！");
    }else if(blueHitNumbers == 1 && redHitNumbers == 6){
        System.out.println("恭喜您，中了1000万巨奖！可以开始享受人生，诗和远方！！");
    }else {
        System.out.println("感谢您为福利事业做出的突出贡献！！");
    }
}
```

### 代码测试

```java
public static void main(String[] args) {
    // 1、随机6个红球号码（1-33，不能重复），随机一个蓝球号码（1-16），可以采用数组装起来作为中奖号码
    int[] luckNumbers = createLuckNumber();
    // printArray(luckNumbers);

    // 2、录入用户选中的号码
    int[] userNumbers = userInputNumbers();

    // 3、判断中奖情况
    judge(luckNumbers, userNumbers);

}
```

# 数组

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111340488.png" alt="image-20230111134000367" style="zoom:67%;" />

## 数组的特点

- 数组是**相同类型的变量的集合**，所有元素的类型都一样
- 可以指定数组包含的元素个数 ，最多为 int 的最大值个元素
- 每个元素都有一个固定的编号，称之为索引（index ），从0开始递增，索引类型为 int
- 数组是定长的创建之后，**长度不可以改变**。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111339863.png" alt="image-20230111133926690" style="zoom:67%;" />

## 声明和初始化

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021228844.png" alt="image-20220602122848771" style="zoom:80%;" />

### 静态初始化

> 定义数组的时候直接给数组赋值

```java
public class ArrayDemo1 {
    public static void main(String[] args) {
        // 目标：学会使用静态初始化的方式定义数组
        // 数据类型[] 数组名称 = new 数据类型[]{元素1,元素2,...}
        
        double[] scores1 = new double[]{99.5, 88.0, 75.5};
        int[] ages1 = new int[]{12, 24, 36};
        String[] names1 = new String[]{"牛二", "全蛋儿", "老王"};
        
        // 简化写法
        double[] scores2 = {99.5, 88.0, 75.5}; 
        int[] ages2 = {12, 24, 36};
        String[] names2 = {"牛二", "全蛋儿", "老王"};
        System.out.println(scores1);
    }
}
```

### 动态初始化

> 定义数组的时候只确定元素的类型和数组的长度，之后再存入具体数据。

```java
public class ArrayDemo4 {
    public static void main(String[] args) {
        // 目标：学会动态初始化数组的定义和使用。
        double[] scores = new double[3]; // [0.0, 0.0, 0.0]
        // 赋值
        scores[0] = 99.5;
        System.out.println(scores[0]);
        System.out.println(scores[2]);
        String[] names = new String[90];
        names[0] = "迪丽热巴";
        names[2] = "马尔扎哈";
        System.out.println(names[0]);
        System.out.println(names[1]);
        System.out.println(names[2]);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111604463.png" alt="image-20230111160401370" style="zoom:67%;" />

### 初始化应用场景

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111625669.png" alt="image-20230111162538543" style="zoom:80%;" />

### 元素默认值

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111627118.png" alt="image-20230111162703011" style="zoom:67%;" />

## 数组注意事项

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111608908.png" alt="image-20230111160855776" style="zoom:50%;" />

```java
public class ArrayAttentionDemo3 {
    public static void main(String[] args) {
        // 目标：理解数组的注意事项
        // 1、数据类型[] 数组名称 也可以写成 数据类型 数组名称[]
        int[] ages1 = {11, 23, 45};
        int ages2[] = {11, 23, 45};

        // 2、什么类型的数组只能存放什么类型的元素
        // String[] names = {"西门吹雪", "独孤求败", 23}; // 错误的

        // 3、数组一旦定义出来之后，类型和长度就固定了
        int[] ages3 = {11, 23, 45};
        System.out.println(ages2[3]); // 报错！ 长度固定是3了不能访问第4个元素！！
    }
}
```

## Arrays 数组工具类

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021226305.png" alt="image-20220602122603223" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041659927.png" alt="image-20230104165906743" style="zoom:67%;" />

### toString 输出数组

```java
int [] arr = {10,7,5,12,3};
System.out.println(Arrays.toString(arr)); //[10, 7, 5, 12, 3]
```

### sort 排序

```java
Arrays.sort(arr); //排序
System.out.println(Arrays.toString(arr));
```

### binarySearch 二分搜索

```java
//二分搜索查找元素位置，必须排序好才能查找，否则出bug
//返回不存在元素规律 -（应该插入的位置+1）
int i = Arrays.binarySearch(arr, 10);
System.out.println(i);
```

```java
// 注意：数组如果么有排好序，可能会找不到存在的元素，从而出现bug!!
int[] arr2 = {12, 36, 34, 25 , 13,  24,  234, 100};
System.out.println(Arrays.binarySearch(arr2 , 36));
```

### asList 数组转集合

将输入字段转化成list列表

```java
List<String> list = Arrays.asList("张三","里斯");
System.out.println(list); // [张三, 里斯]
```

### fill 元素填充

```java
int [] age = new int[10];
Arrays.fill(age,0);
System.out.println(Arrays.toString(age)); // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
```

### sort 自定义排序

设置Comparator接口对应的比较器对象，来定制比较规则

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206061513779.png" alt="image-20220606151325683" style="zoom:80%;" />

定义一个javaBean类

```java
@Data
public class User {  
    private String name;  
    private int age;  
}
```

自定义排序,按年龄排序

```java
User[] user = new User[3];
user[0] = new User("renshuo",22);
user[1] = new User("maoyan",21);
user[2] = new User("wangrui",24);
System.out.println(Arrays.toString(user));
//自定义排序
Arrays.sort(user, new Comparator<User>() {   
    @Override  
    public int compare(User o1, User o2) {
        //return o1.getAge()- o2.getAge();//按年龄升序    
        return o2.getAge()-o1.getAge(); //按年龄降序
        //return Double.compare(o1.getAge(),o2.getAge());//比较浮点型升序    
    }     
});
    System.out.println(Arrays.toString(user));
}
```

利用lambda语法进行简化

```java
Arrays.sort(user, (o1, o2) -> {
    // 自己指定比较规则
    // return o1.getAge() - o2.getAge(); // 按照年龄升序排序！
    // return o2.getAge() - o1.getAge(); // 按照年龄降序排序！！
    // return Double.compare(o1.getHeight(), o2.getHeight()); // 比较浮点型可以这样写 升序
    return Double.compare(o2.getHeight(), o1.getHeight()); // 比较浮点型可以这样写  降序
});
System.out.println(Arrays.toString(students));
```

### copyOf 和 copyOfRange

要使用copyOfRange，我们需要一个原始数组和我们想要复制的开始索引（包括）和结束索引（不包括）。 我们先定一个数组 intro。

```java
String[] intro = new String[] { "once", "upon", "a", "time" };
String[] abridgement = Arrays.copyOfRange(storyIntro, 0, 3); 

assertArrayEquals(new String[] { "once", "upon", "a" }, abridgement); 
assertFalse(Arrays.equals(intro, abridgement));
```

要使用 copyOf ，，我们需要使用intro和一个目标数组大小，然后我们会得到一个该长度的新数组。

```java
String[] revised = Arrays.copyOf(intro, 3);
String[] expanded = Arrays.copyOf(intro, 5);

assertArrayEquals(Arrays.copyOfRange(intro, 0, 3), revised);
assertNull(expanded[4]);
```

注意，如果我们的目标尺寸大于原始尺寸，copyOf会用 null 填充数组。

### equals 和 deepEquals

我们可以使用 equals 进行简单的数组大小和内容比较。 如果我们添加一个null作为其中一个元素，内容检查就会失败。

```java
assertTrue(Arrays.equals(new String[] { "once", "upon", "a", "time" }, intro));
assertFalse(Arrays.equals(new String[] { "once", "upon", "a", null }, intro));
```

当我们有嵌套或多维数组时，我们可以使用deepEquals不仅检查顶层元素，还可以递归地执行检查。

```java
Object[] story = new Object[] { intro, new String[] { "chapter one", "chapter two" }, end };
Object[] copy = new Object[] { intro, new String[] { "chapter one", "chapter two" }, end };

assertTrue(Arrays.deepEquals(story, copy));
assertFalse(Arrays.equals(story, copy));
```

注意，这里 deepEquals 是通过的，但equals却失败了。这是因为deepEquals在每次遇到数组时都会调用自己，而equals只是比较子数组的引用。

### hashCode 和 deepHashCode

我们使用hashCode来计算一个基于数组内容的整数

```java
Object[] looping = new Object[]{ intro, intro }; 
int hashBefore = Arrays.hashCode(looping);
int deepHashBefore = Arrays.deepHashCode(looping);
```

现在，我们将原数组的一个元素设置为空，并重新计算哈希值。

```java
intro[3] = null;
int hashAfter = Arrays.hashCode(looping);
```

deepHashCode检查嵌套数组的元素数量和内容是否匹配。 如果我们用deepHashCode重新计算。

```java
int deepHashAfter = Arrays.deepHashCode(looping);
```

现在，我们能够看到这两个方法的不同。

```java
assertEquals(hashAfter, hashBefore);
assertNotEquals(deepHashAfter, deepHashBefore);
```

deepHashCode是我们在数组上使用HashMap和HashSet等数据结构时使用的基础计算。

### setAll

通过setAll，我们可以用一个 functional interface 来设置一个数组的所有元素。下面的代码现将位置索引作为一个参数传入到getWord方法中。

```java
String[] longAgo = new String[4];
Arrays.setAll(longAgo, i -> this.getWord(i)); 
assertArrayEquals(longAgo, new String[]{"a","long","time","ago"});
```

当然，异常处理是使用lambda的一个比较棘手的部分。所以请记住，如果lambda抛出一个异常，那么Java就不会定义数组的最终状态。

## 数组常用操作

### 取值、赋值、长度

数组变量的length 属性，可以获取数组的长度。数组是定长的，创建之后，长度不可以改变。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021230346.png" alt="image-20220602123008279" style="zoom:80%;" />

```java
public class ArrayDemo2 {
    public static void main(String[] args) {
        // 目标：学会访问数组的元素
        int[] ages = {12, 24, 36};
        // 取值： 数组名称[索引]
        System.out.println(ages[0]);
        System.out.println(ages[1]);
        System.out.println(ages[2]);
        // 赋值：数组名称[索引] = 数据;
        ages[2] = 100;
        System.out.println(ages[2]);
        // 访问数组的长度
        System.out.println(ages.length);
    }
}
```



### 数组遍历

遍历：就是一个一个数据的访问。为什么要遍历？ 搜索、数据统计等等都需要用到遍历。

```java
int []ages = {12,10,9,123};
for (int i = 0; i < ages.length; i++) {
    System.out.println(ages[i]);
}
```



### 数组越界问题

使用数组常见的一个错误是 IndexOutOfBoundException 数组越界，比如下面就是一个越界的例子

```java
public class IndexOutOfBoundExample {
    public static void main(String[] args) {
        int[] array = new int[5];
        System.out.println(array[array.length]);
    }
}
```

- 如果没有把握数组是否会越界，可以把索引和数组长度做比较，注意索引是从 0 开始的，不是从 1 开始的。

```java
public class CompareIndex {
    public static void main(String[] args) {
        int size = 60;
        double[] array = new double[size];

        for (int i = 0; i < 10; i++) {
            int index = (int) (Math.random() * size * 3);
            if (index >= 0 && index < array.length) {
                System.out.println(array[index]);
            } else {
                System.out.println("数组出界！");
            }
        }
    }
}
```

### 数组变量指向新数组

> 数组变量可以指向新的数组实体。这时候，数组变量的值就是新的数组实体的地址了，这种数组变量的赋值操作，叫做让变量指向新的数组。

```java
public class AssignArray {
    public static void main(String[] args) {
        int[] array = new int[3];

        array[0] = 9;

        System.out.println("array长度为" + array.length + "。array[0] = " + array[0] + 
                           " array 指向的地址为：" + array);

        array = new int[32];

        System.out.println("array长度为" + array.length + "。array[0] = " + array[0] + 
                           " array 指向的地址为：" + array);
    }
}
```

上面的例程的输出是

```java
array长度为3。array[0] = 9 array 指向的地址为：[I@78e03bb5
array长度为32。array[0] = 0 array 指向的地址为：[I@5e8c92f4
```

可以看到数组变量指向新数组后，变量值保存的数组地址发生了变化。

- 如果没有别的数组变量指向原来的数组实体，也就是说，如果没有数组变量“记得”原来数组的地址，原来的数组实体就再也不可访问，也就好像“消失”了。后面会被GC回收。

### 多维数组

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021234524.png" alt="image-20220602123435444" style="zoom:80%;" />

- 二维数组是一维数组的延伸。
- 二维数组定义的语法，比如定义一个doubule类型的二维数组 `double[][] = new doube[3][6]`，第一维有三个元素，每个元素的值都是指向的double一维数组的地址，第二维数组的长度为6。
- **一般写代码时最多就用到二维数组，再多维，写的程序太难让人理解，不推荐使用**。

```java
public class MultiDimensionArray {
    public static void main(String[] args) {
        // 创建一个double类型的二维数组
        double[][] mult = new double[3][5];

        // 循环查看每个数组元素的值，在给数组元素赋值前，数组元素的值其实都是每种类型的初始值。
        for (int i = 0; i < mult.length; i++) {
            for (int j = 0; j < mult[i].length; j++) {
                System.out.println("mult[" + i + "][" + j + "]=" + 
                                   mult[i][j]);
            }
        }

        // 其实第一维的数组，每个元素都是一个下一维度的属于的变量。在这里我们可以改变这个变量的值
        // 也就是让它指向一个新的变量。
        mult[2] = new double[100];

        // 检查每个的数组的长度，发现最后一个的长度不一样了，因为它指向了新的数组。
        for (int i = 0; i < mult.length; i++) {
            System.out.println("mult[" + i + "].length=" + 
                               mult[i].length);
        }
    }
}
```

## 数组案例

### 数组元素求和

```java
public class Test1 {
    public static void main(String[] args) {
        // 需求：数组元素求和
        // 1、把这些数据拿到程序中使用数组记住
        int[] money = {16, 32, 8, 100, 78};

        // 3、定义一个求和变量累加数组的元素值
        int sum = 0;

        // 2、遍历数组中的每个元素
        for (int i = 0; i < money.length; i++) {
            // 拿到每个元素值累加
            sum += money[i];
        }

        // 4、输出求和变量即可
        System.out.println("数组的元素和是：" + sum);
    }
}
```

### 求数组最大值

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111633621.png" alt="image-20230111163328423" style="zoom:50%;" />

```java
public class Test2 {
    public static void main(String[] args) {
        // 需求：数组元素求最值。

        // 1、定义一个静态初始化的数组，存储一批颜值。
        int[] faceScore = {15, 9000, 10000, 20000, 9500, -5};
        //                 0    1      2     3      4    5

        // 2、定义一个变量用于存储最大值元素，建议使用第一个元素作为参照。
        int max = faceScore[0];

        // 3、遍历数组的每个元素，依次与最大值变量的数据比较，若较大，则替换。
        for (int i = 1; i < faceScore.length; i++) {
            if(faceScore[i] > max){
                max = faceScore[i];
            }
        }

        // 4、输出最大值变量存储的数据即可。
        System.out.println("数组的最大值是：" + max);
    }
}
```

### 数组反转

```java
public static void reverseArr() {
    int[] nums = {1, 2, 4, 54, 464};
    // 首尾两两交换
    for (int i = 0; i < nums.length/2; i++) {
        int temp = nums[i];
        nums[i] = nums[nums.length-1-i];
        nums[nums.length-1-i] = temp;
    }
    System.out.println(Arrays.toString(nums));
}
```

### 猜数字

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111634066.png" alt="image-20230111163410952" style="zoom: 50%;" />

```java
public class Test3 {
    public static void main(String[] args) {
        // 需求：5个 1-20之间的随机数，让用户猜测，猜中要提示猜中，
        // 还要输出该数据在数组中第一次出现的索引，并打印数组的内容出来。
        // 没有猜中继续。
        // 1、定义一个动态初始化的数组存储5个随机的1-20之间的数据
        int[] data = new int[5];

        // 2、动态的生成5个1-20之间的随机数并存入到数组中去。
        Random r = new Random();
        for (int i = 0; i < data.length; i++) {
            // i = 0 1 2 3 4
            data[i] = r.nextInt(20) + 1;
        }

        // 3、使用一个死循环让用户进行猜测
        Scanner sc = new Scanner(System.in);
        OUT:
        while (true) {
            System.out.println("请您输入一个1-20之间的整数进行猜测：");
            int guessData = sc.nextInt();

            // 4、遍历数组中的每个数据，看是否有数据与猜测的数据相同，相同代表猜中了，给出提示
            for (int i = 0; i < data.length; i++) {
                if(data[i] == guessData){
                    System.out.println("您已经猜中了该数据，运气不错了！您猜中的数据索引是：" + i);
                    break OUT; // 结束了整个死循环，代表游戏结束了！
                }
            }
            System.out.println("当前猜测的数据在数组中不存在，请重新猜测！");
        }

        // 5、输出数组的全部元素，让用户看到自己确实是猜中了某个数据。
        for (int i = 0; i < data.length; i++) {
            System.out.print(data[i] + "\t");
        }
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111637124.png" alt="image-20230111163727022" style="zoom:67%;" />

### 随机排名

```java
public class Test4 {
    public static void main(String[] args) {
        // 目标：键盘录入一组工号，最终要随机输出一组出来作为排名
        // 1、动态初始化一个数组，存储5个工号
        int[] codes = new int[5];

        // 2、定义一个循环，循环5次，依次录入一个工号存入对应的位置
        Scanner sc = new Scanner(System.in);
        for (int i = 0; i < codes.length; i++) {
            // 正式录入工号
            System.out.println("请您输入第" + (i + 1) + "个员工的工号：");
            int code = sc.nextInt();
            // 存入到数组中去
            codes[i] = code;
        }

        // 3、遍历数组中的每个元素，然后随机一个索引出来，
        //    让该元素与随机索引位置处的元素值进行交换（本节的重点）
        // codes = [12, 36, 28, 45, 99]
        Random r = new Random();
        for (int i = 0; i < codes.length; i++) {
            // 当前遍历的元素值：codes[i]
            // 随机一个索引位置出来：codes[index]
            int index = r.nextInt(codes.length);

            // 定义一个临时变量存储index位置处的值
            int temp = codes[index];
            codes[index] = codes[i];
            codes[i] = temp;
        }

        // 4、遍历数组元素输出就是随机排名的结果
        for (int i = 0; i < codes.length; i++) {
            System.out.print(codes[i] + "\t");
        }
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111636706.png" alt="image-20230111163646574" style="zoom:67%;" />

### 冒泡排序

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111645505.png" alt="image-20230111164528267" style="zoom:67%;" />

```java
public class Test5 {
    public static void main(String[] args) {
        // 1、定义一个数组，存储一些数据啊
        int[] arr = {5, 2, 3, 1, 6, 7, 0};
        //           0  1  2  3

        // 2、定义一个循环控制比较的轮数
        for (int i = 0; i < arr.length - 1; i++) {
            // i == 0  比较的次数 3  j = 0 1 2
            // i == 1  比较的次数 2  j = 0 1
            // i == 2  比较的次数 1  j = 0
            // 3、定义一个循环控制每轮比较的次数，占位
            for (int j = 0; j < arr.length - i - 1; j++) {
                // 判断j当前位置的元素值 是否 大于后一个位置 若较大 则交换
                if(arr[j] > arr[j+1]) {
                    int temp = arr[j+1];
                    arr[j+1] = arr[j];
                    arr[j] = temp;
                }
            }
        }

        // 遍历数组内容输出
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + "\t");
        }
    }
}
```

## 数组使用常见问题

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111859475.png" alt="image-20230111185908290" style="zoom:67%;" />



# 面向对象基础

## 面向对象和面向过程的区别

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081309415.png" alt="image-20220608130911316" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081310770.png" alt="image-20220608131005696" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081310460.png" alt="image-20220608131023383" style="zoom:80%;" />



## 类和对象

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141252038.png" alt="image-20230114125231927" style="zoom:67%;" />

### 类和对象定义

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141254690.png" alt="image-20230114125425572" style="zoom:80%;" />

```java
public class Car {
    // 属性（成员变量）
    String name; // 名称
    double price; // 价格

    // 行为（方法）
    public void start(){
        System.out.println(name + " 价格是：" + price +", 启动成功！");
    }

    public void run(){
        System.out.println(name + " 价格是：" + price +", 跑的很快！");
    }
}
```

```java
public class Test {
    public static void main(String[] args) {
        // 如何去获取汽车的对象。
        Car c1 = new Car();
        System.out.println(c1);
        c1.name = "宝马X3";
        c1.price = 37.89;
        System.out.println(c1.name);
        System.out.println(c1.price);
        c1.start();
        c1.run();

        System.out.println("-------------------");
        Car c2 = new Car();
        c2.name = "奔驰GLC";
        c2.price = 39.89;
        System.out.println(c2.name);
        System.out.println(c2.price);
        c2.start();
        c2.run();
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141326552.png" alt="image-20230114132612452" style="zoom:67%;" />

### 注意事项

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141329818.png" alt="image-20230114132904722" style="zoom:67%;" />

### 对象成员变量默认值⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081314310.png" alt="image-20220608131449229" style="zoom: 67%;" />



### Java对象内存图

#### 多个对象的内存图

   1.对象放在哪个位置？**堆内存中**

2. 对象变量在内存哪个位置，其中存储的是什么？**栈内存中，存储的是对象在堆内存中的地址**

3. 成员变量的数据放在哪里，存在于哪个位置？**对象中，存在于堆内存中**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081316067.png" alt="image-20220608131645956" style="zoom:80%;" />

#### 两个变量指向同一个对象内存图

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081318506.png" alt="image-20220608131823394" style="zoom:80%;" />

示例

```java
public class Student {
    String name;
    char sex;
    String hobby;

    public void study(){
        System.out.println("姓名：" + name +"，性别是：" + sex
                + "，爱好是：" + hobby + "的学生在好好学习，天天向上！");
    }
}
```

```java
public class Test {
    public static void main(String[] args) {
        // 目标：掌握2个变量指向同一个对象的形式
        Student s1 = new Student();
        s1.name = "小明";
        s1.sex = '男';
        s1.hobby = "睡觉、游戏、听课";
        s1.study();

        // 关键：把s1赋值给学生类型的变量s2
        Student s2 =  s1;
        System.out.println(s1);
        System.out.println(s2);
        //修改s2，看s1有没有改变
        s2.hobby = "爱提问";
        //果然改变
        System.out.println(s2.name);
        System.out.println(s2.sex);
        System.out.println(s1.hobby);
        s2.study();
        //都为null，肯定报错
        s1 = null;
        s2 = null;
        System.out.println(s1.name);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081344955.png" alt="image-20220608134420863" style="zoom:80%;" />

### 垃圾回收

- 注意：当堆内存中的**类对象**或**数组对象**，没有被任何变量引用（指向）时，就会被判定为内存中的**“垃圾”。**
- `Java存在自动垃圾回收器，会定期进行清理`

## 构造器

### 构造器目的

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141336664.png" alt="image-20230114133612560" style="zoom:67%;" />

### 构造器作用

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081335758.png" alt="image-20220608133551654" style="zoom:80%;" />

### 构造器测试

```java
public class Car {
    String name;
    double price;

    // 无参数构造器(默认存在的)
    public Car(){
        System.out.println("无参数构造器被触发执行~~~");
    }

    // 有参数构造器
    public Car(String n, double p){
        System.out.println("有参数构造器被触发执行~~~");
        name = n;
        price = p;
    }
}
```

```java
// 目标：明白构造器的作用和分类。(开发的人，理解能力好)
public class ConstructorDemo {
    public static void main(String[] args) {
        Car c = new Car();
        System.out.println(c.name);
        System.out.println(c.price);

        Car c2 = new Car("奔驰GLC", 39.78);
        System.out.println(c2.name);
        System.out.println(c2.price);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141343204.png" alt="image-20230114134307119" style="zoom:67%;" />

### 注意事项

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141339678.png" alt="image-20230114133935560" style="zoom:67%;" />

## this关键字

### this 概览

- this关键字可以出现在成员方法、构造器中，**代表当前对象的地址**

- 作用：访问当前对象的成员变量、成员方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081335711.png" alt="image-20220608133500603" style="zoom:80%;" />

### this 使用示例

```java
public class Car {
    String name;
    double price;

    public void goWith(String name){
        System.out.println(this.name +"正在和：" + name +"比赛！");
    }

    // 无参数构造器(默认存在的)
    public Car(){
        System.out.println("无参数构造器被触发执行~~~");
    }

    // 有参数构造器
    public Car(String name, double price){
        System.out.println("有参数构造器被触发执行~~~");
        System.out.println(this);
        this.name = name;
        this.price = price;
    }
}
```

```java
public class ThisDemo {
    public static void main(String[] args) {
        Car c = new Car("宝马X3", 37.89);
        System.out.println(c);
        System.out.println(c.name);
        System.out.println(c.price);

        c.goWith("奔驰GLC");
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141349757.png" alt="image-20230114134954662" style="zoom:67%;" />

## 封装

### 封装思想

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141410765.png" alt="image-20230114141002653" style="zoom:67%;" />

### 封装思想好处

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141410458.png" alt="image-20230114141047358" style="zoom:58%;" /><img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141411872.png" alt="image-20230114141121776" style="zoom:60%;" />

### 如何进行封装更好

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141412667.png" alt="image-20230114141251555" style="zoom:67%;" />

### 封装实现

```java
public class Student {
    // private私有的成员变量，只能在本类访问。
   private int age;

   public int getAge(){
       return age;
   }

   public void setAge(int age){
        if(age >= 0 && age <= 200){
            this.age = age;
        }else {
            System.out.println("年龄数据有问题，应该不是人的年龄！");
        }
   }
}
```

```java
public class Test {
    public static void main(String[] args) {
        Student s = new Student();
        // s.age = -23;
        s.setAge(-23);
        System.out.println(s.getAge());
    }
}    
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081338319.png" alt="image-20220608133852235" style="zoom:80%;" />

## JavaBean

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141359687.png" alt="image-20230114135954582" style="zoom: 67%;" />

### JavaBean语法

> 也可以称为实体类，其对象可以用于在程序中封装数据。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141358371.png" alt="image-20230114135820274" style="zoom:67%;" />

### 创建JavaBean实体类

```java
public class User {
    private double height;
    private String name;
    private double salary;
    private String address;
    private String phone;

    public User() {
    }

    public User(double height, String name, double salary, String address, String phone) {
        this.height = height;
        this.name = name;
        this.salary = salary;
        this.address = address;
        this.phone = phone;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
```

### 使用

方式一

```java
User user1 = new User(176, "黑马吴彦祖", 30000, "黑马", "110");
System.out.println(user1.getName());
System.out.println(user1.getHeight());
System.out.println(user1.getSalary());
System.out.println(user1.getAddress());
System.out.println(user1.getPhone());
```

方式二

```java
User user = new User();
user.setName("二狗");
user.setHeight(163);
user.setSalary(50000);
user.setAddress("中国");
user.setPhone("13141314520");
System.out.println(user.getName());
System.out.println(user.getHeight());
System.out.println(user.getSalary());
System.out.println(user.getAddress());
System.out.println(user.getPhone());
```



## 成员变量和局部变量

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081322100.png" alt="image-20220608132249002" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081323091.png" alt="image-20220608132314992" style="zoom:80%;" />

# ATM 系统实现

## 技术选型

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141425846.png" alt="image-20230114142523712" style="zoom:67%;" />

## 账户类、首页设计

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141426020.png" alt="image-20230114142634874" style="zoom:67%;" />

```java
/**
   账户类
 */
public class Account {
    // 成员变量，私有
    private String cardId;
    private String userName; // 用户名
    private String passWord; // 密码
    private double money; // 账户余额
    private double quotaMoney; // 每次取现额度

    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public double getMoney() {
        return money;
    }

    public void setMoney(double money) {
        this.money = money;
    }

    public double getQuotaMoney() {
        return quotaMoney;
    }

    public void setQuotaMoney(double quotaMoney) {
        this.quotaMoney = quotaMoney;
    }
}
```

```java
public static void main(String[] args) {
    // 1、定义账户类
    // 2、定义一个集合容器，负责以后存储全部的账户对象，进行相关的业务操作。
    ArrayList<Account> accounts = new ArrayList<>();
    Scanner sc = new Scanner(System.in);
    // 3、展示系统的首页
    while (true) {
        System.out.println("===============黑马ATM系统=================");
        System.out.println("1、账户登录");
        System.out.println("2、账户开户");

        System.out.println("请您选择操作：");
        int command = sc.nextInt();
        switch (command){
            case 1:
                // 用户登录操作
                login(accounts, sc);
                break;
            case 2:
                // 用户账户开户(ALT + ENTER)
                register(accounts,sc);
                break;
            default:
                System.out.println("您输入的操作命令不存在~~");
        }
    }
}
```

## 用户开户功能实现

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141428766.png" alt="image-20230114142824487" style="zoom:67%;" />

```java
/**
 * 用户开户功能的实现
 * @param accounts 接收的账户集合。
 */
private static void register(ArrayList<Account> accounts, Scanner sc) {
    System.out.println("===================系统开户操作========================");
    // 1、创建一个账户对象，用于后期封装账户信息。
    Account account = new Account();

    // 2、录入当前这个账户的信息，注入到账户对象中去。
    System.out.println("请您输入账户用户名：");
    String userName = sc.next();
    account.setUserName(userName);

    while (true) {
        System.out.println("请您输入账户密码：");
        String passWord = sc.next();
        System.out.println("请您输入确认密码：");
        String okPassWord = sc.next();
        if(okPassWord.equals(passWord)){
            // 密码认证通过，可以注入给账户对象
            account.setPassWord(okPassWord);
            break; // 密码已经录入成功了，死循环没有必要继续了！
        }else {
            System.out.println("对不起，您输入的2次密码不一致，请重新确认~~");
        }
    }

    System.out.println("请您输入账户当次限额：");
    double quotaMoney = sc.nextDouble();
    account.setQuotaMoney(quotaMoney);

    // 为账户随机一个8位且与其他账户的卡号不重复的号码。(独立功能，独立成方法)。
    String cardId = getRandomCardId(accounts);
    account.setCardId(cardId);

    // 3、把账户对象添加到账户集合中去。
    accounts.add(account);
    System.out.println("恭喜您，" + userName + "先生/女生，您开户成功，您的卡号是：" 
                       + cardId + "，请您妥善保管卡号" );
}
```

```java
// 为账户生成8位与其他账户卡号不同的号码
private static String getRandomCardId(ArrayList<Account> accounts) {
    Random r = new Random();
    while (true) {
        // 1、先生成8位数字
        String cardId = ""; // 03442522
        for (int i = 0; i < 8; i++) {
            cardId += r.nextInt(10);
        }

        // 2、判断这个8位的卡号是否与其他账户的卡号重复了。
        // 根据这个卡号去查询账户的对象
        Account acc = getAccountByCardId(cardId, accounts);
        if(acc == null){
            // 说明cardId 此时没有重复，这个卡号是一个新卡号了，可以使用这个卡号作为新注册账户的卡号了
            return cardId;
        }
    }
}
```

## 用户登录功能实现

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141429844.png" alt="image-20230114142947704" style="zoom:67%;" />

```java
private static void login(ArrayList<Account> accounts, Scanner sc) {
    System.out.println("===================系统登录操作========================");
    // 1、判断账户集合中是否存在账户，如果不存在账户，登录功能不能进行。
    if(accounts.size() == 0) {
        System.out.println("对不起，当前系统中，无任何账户，请先开户，再来登录~~");
        return; // 卫语言风格，解决方法的执行。
    }

    // 2、正式进入登录操作
    while (true) {
        System.out.println("请您输入登录卡号：");
        String cardId = sc.next();
        // 3、判断卡号是否存在：根据卡号去账户集合中查询账户对象。
        Account acc = getAccountByCardId(cardId, accounts);
        if(acc != null){
            while (true) {
                // 卡号存在的
                // 4、让用户输入密码，认证密码
                System.out.println("请您输入登录密码：");
                String passWord = sc.next();
                // 判断当前账户对象的密码是否与用户输入的密码一致
                if(acc.getPassWord().equals(passWord)) {
                    // 登录成功了
                    System.out.println("恭喜您，" + acc.getUserName() 
                                       +"先生/女生进入系统，您的卡号是：" + acc.getCardId());
                    // .... 查询 转账 取款 ....
                    // 展示登录后的操作页。
                    showUserCommand(sc, acc, accounts);
                    return; // 干掉登录方法
                }else {
                    System.out.println("对不起，您输入的密码有误~~");
                }
            }
        }else {
            System.out.println("对不起，系统中不存在该账户卡号~~");
        }
    }
}
```

## 用户操作页设计、查询账户、退出账号

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141431605.png" alt="image-20230114143106469" style="zoom:67%;" />

```java
private static void showUserCommand(Scanner sc, Account acc, ArrayList<Account> accounts) {
    while (true) {
        System.out.println("===============用户操作页===================");
        System.out.println("1、查询账户");
        System.out.println("2、存款");
        System.out.println("3、取款");
        System.out.println("4、转账");
        System.out.println("5、修改密码");
        System.out.println("6、退出");
        System.out.println("7、注销账户");
        System.out.println("请选择：");
        int command = sc.nextInt();
        switch (command) {
            case 1:
                // 查询账户(展示当前登录的账户信息)
                showAccount(acc);
                break;
            case 2:
                // 存款
                depositMoney(acc, sc);
                break;
            case 3:
                // 取款
                drawMoney(acc, sc);
                break;
            case 4:
                // 转账
                transferMoney(sc, acc, accounts);
                break;
            case 5:
                // 修改密码
                updatePassWord(sc, acc);
                return; // 让当前方法停止执行，跳出去
            case 6:
                // 退出
                System.out.println("退出成功，欢迎下次光临");
                return; // 让当前方法停止执行，跳出去
            case 7:
                // 注销账户
                if(deleteAccount(acc,sc,accounts)){
                    // 销户成功了，回到首页
                    return; // 让当前方法停止执行，跳出去
                }else {
                    // 没有销户成功， 还是在操作页玩
                    break;
                }
            default:
                System.out.println("您输入的操作命令不正确~~");
        }
    }
}
```

```java
// 展示账户信息
private static void showAccount(Account acc) {
    System.out.println("===================当前账户信息如下========================");
    System.out.println("卡号：" + acc.getCardId());
    System.out.println("户主：" + acc.getUserName());
    System.out.println("余额：" + acc.getMoney());
    System.out.println("限额：" + acc.getQuotaMoney());
}
```

```java
/**
 * 根据卡号查询出一个账户对象出来
 * @param cardId  卡号
 * @param accounts 全部账户的集合
 * @return  账户对象 | null
 */
private static Account getAccountByCardId(String cardId,ArrayList<Account> accounts){
    for (int i = 0; i < accounts.size(); i++) {
        Account acc = accounts.get(i);
        if(acc.getCardId().equals(cardId)){
            return acc;
        }
    }
    return null; // 查无此账户
}
```

## 存款功能实现

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141432183.png" alt="image-20230114143217074" style="zoom:67%;" />

```java
private static void depositMoney(Account acc, Scanner sc) {
    System.out.println("===================用户存钱操作========================");
    System.out.println("请您输入存款金额：");
    double money = sc.nextDouble();

    // 更新账户余额：原来的钱 + 新存入的钱
    acc.setMoney(acc.getMoney() + money);
    System.out.println("恭喜您，存钱成功，当前账户信息如下：");
    showAccount(acc);
}
```

## 取款功能实现

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141432908.png" alt="image-20230114143241784" style="zoom:67%;" />

```java
private static void drawMoney(Account acc, Scanner sc) {
    System.out.println("===================用户取钱操作========================");
    // 1、判断是否足够100元。
    if(acc.getMoney() < 100) {
        System.out.println("对不起，当前账户中不够100元，不能取钱~");
        return;
    }

    while (true) {
        // 2、提示用户输入取钱金额
        System.out.println("请您输入取款金额：");
        double money = sc.nextDouble();

        // 3、判断这个金额是否满足要求。
        if(money > acc.getQuotaMoney()) {
            System.out.println("对不起，您当前取款金额超过每次限额，每次最多可取：" 
                               + acc.getQuotaMoney());
        }else {
            // 没有超过当次限额。
            // 4、判断是否超过了账户的总余额。
            if(money > acc.getMoney()){
                System.out.println("余额不足，您账户目前总余额是：" + acc.getMoney());
            }else {
                // 可以取钱了。
                System.out.println("恭喜您，取钱" + money +"元，成功！");
                // 更新余额
                acc.setMoney(acc.getMoney() - money);
                // 取钱结束了。
                showAccount(acc);
                return; // 干掉取钱方法
            }
        }
    }

}
```

## 转账功能实现

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141433719.png" alt="image-20230114143317579" style="zoom:67%;" />

```java
private static void transferMoney(Scanner sc, Account acc, ArrayList<Account> accounts) {
    System.out.println("===================用户转账操作========================");
    // 1、判断是否足够2个账户
    if(accounts.size() < 2){
        System.out.println("当前系统中，不足2个账户，不能进行转账，请去开户吧~~");
        return; // 结束当前方法
    }

    // 2、判断自己的账户是否有钱
    if(acc.getMoney() == 0) {
        System.out.println("对不起，您自己都都没钱，就别转了吧~~");
        return;// 结束当前方法
    }

    while (true) {
        // 3、真正开始转账
        System.out.println("请您输入对方账户的卡号：");
        String cardId = sc.next();

        // 这个卡号不能是自己的卡号
        if(cardId.equals(acc.getCardId())){
            System.out.println("对不起，您不可以给自己进行转账~~");
            continue; // 结束当次执行，死循环进入下一次
        }

        // 判断这个卡号是存在的：根据这个卡号去查询对方账户对象。
        Account account = getAccountByCardId(cardId, accounts);
        if(account == null){
            System.out.println("对不起，您输入对方的这个账号不存在~~");
        }else {
            // 这个账户对象存在了：继续认证他的姓氏
            String userName = account.getUserName(); // 黑马周芷若
            String tip = "*" + userName.substring(1);
            System.out.println("请您输入["+ tip +"]的姓氏");
            String preName = sc.next();

            // 认证姓氏是否输入正确。
            if(userName.startsWith(preName)) {
                while (true) {
                    // 认证通过，真正开始转账了
                    System.out.println("请您输入转账金额：");
                    double money = sc.nextDouble();
                    // 判断余额是否足够
                    if(money > acc.getMoney()) {
                        System.out.println("对不起，您余额不足，您最多可以转账：" + acc.getMoney());
                    }else {
                        // 余额足够，可以转了
                        acc.setMoney(acc.getMoney() - money);
                        account.setMoney(account.getMoney() + money);
                        System.out.println("转账成功！您的账户还剩余：" + acc.getMoney());
                        return; // 直接干掉转账方法
                    }
                }
            }else {
                System.out.println("对不起，您输入的信息有误~~");
            }
        }
    }
}
```

## 密码修改、销户功能实现

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301141433634.png" alt="image-20230114143347493" style="zoom:67%;" />

```java
private static void updatePassWord(Scanner sc, Account acc) {
    System.out.println("===================用户密码修改========================");
    while (true) {
        System.out.println("请您输入当前密码：");
        String passWord = sc.next();
        // 1、判断这个密码是否正确
        if(acc.getPassWord().equals(passWord)){
            while (true) {
                // 密码正确
                // 2、输入新密码。
                System.out.println("请您输入新密码：");
                String newPassWord = sc.next();

                System.out.println("请您确认新密码：");
                String okPassWord = sc.next();

                if(newPassWord.equals(okPassWord)) {
                    // 2次密码一致，可以修改了
                    acc.setPassWord(newPassWord);
                    System.out.println("恭喜您，您密码修改成功了~~");
                    return;
                }else {
                    System.out.println("您输入的2次密码不一致~~");
                }
            }
        }else {
            System.out.println("您输入的密码不正确~");
        }
    }
}
```

```java
private static boolean deleteAccount(Account acc, Scanner sc, ArrayList<Account> accounts) {
    System.out.println("===================用户销户========================");
    System.out.println("您真的要销户？y/n");
    String rs = sc.next();
    switch (rs) {
        case "y":
            // 真正的销户
            // 从当前账户集合中，删除当前账户对象，销毁就完成了。
            if(acc.getMoney() > 0){
                System.out.println("您账户中还有钱没有取完，不允许销户~");
            }else {
                accounts.remove(acc);
                System.out.println("您的账户销户完成~~");
                return true; // 销户成功
            }
            break;
        default:
            System.out.println("好的，当前账户继续保留~");
    }
    return false;
}
```



# static 静态关键字⭐

## static 是什么

> - static关键字是静态的意思，可以修饰成员方法，成员变量。
> - static修饰成员变量之后称为**静态成员变量（类变量）**，修饰方法之后称为**静态方法（类方法）**
> - 修饰成员变量时表示该成员变量在内存中**只存储一份**，**可以被共享访问，修改**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031605580.png" alt="image-20230103160531471" style="zoom:80%;" />

## 静态成员变量

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301032127156.png" alt="image-20230103212733991" style="zoom:67%;" />

> - **静态成员变量**,static修饰，内存中加载一次；常表示如在线人数信息等需要被共享的信息，可以被共享访问
> - **实例成员变量**，无static修饰，存在于每个对象中：常表示姓名name、年龄age等属于每个对象的信息

```java
public class User {    
      
    // 在线人数，注意：static修饰的成员变量：静态成员变量，只在内存中有一份，可以被共享
    public static int onlineNumber = 10;    
    // 实例成员变量    
    private String name;    
    private int age;
    
    public static void main(String[] args) {        
        //1、类名.成员变量名（推荐）        
        User.onlineNumber++;        
        User u1 = new User();        
        u1.name = "任硕";        
        u1.age = 22;        
        //不推荐使用对象访问静态成员变量        
        u1.onlineNumber++;        
        User u2 = new User();        
        u1.name = "张三";        
        u1.age = 24;        
        //不推荐使用对象访问静态成员变量        
        u2.onlineNumber++;        
        System.out.println(onlineNumber); //13    
    }
}
```



## 静态成员方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301032126094.png" alt="image-20230103212651934" style="zoom:67%;" />

> 静态成员方法（有static修饰，归属于类），建议用类名访问，也可以用对象访问。
>
> 实例成员方法（无static修饰，归属于对象），只能用对象触发访问
>
> 注意：**普通方法需要创建对象才能调用，而静态方法可以直接用方法名调用**

```java
public class Student {
    // 实例成员变量：无static修饰，属于对象。
    private String name;

    // 静态成员方法: 有static修饰，归属于类，可以被共享访问，用类名或者对象名都可以访问。
    public static int getMax(int age1, int age2){
        return Math.max(age1, age2);
    }

    // 实例方法:属于对象的，只能用对象触发访问
    public void study(){
        System.out.println(name + "在好好学习，天天向上~");
    }

    public static void main(String[] args) {
        // 1、类名.静态成员方法
        System.out.println(Student.getMax(10, 3));
        // 注意：同一个类中，访问静态方法，类名可以省略不写。
        System.out.println(getMax(10, 32));

        // study(); // 报错了，实例方法不能直接调用，要创建对象才能访问
        // 2、对象.实例方法
        Student s = new Student();
        s.name = "猪八戒";
        s.study();

        // 3、对象.静态方法 (语法是可行，但是不推荐)
        System.out.println(s.getMax(13,34));
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031619129.png" alt="image-20230103161943009" style="zoom:80%;" />

## static 访问注意事项

> 静态方法只能访问静态的成员，不可以直接访问实例成员。
>
> 实例方法可以访问静态的成员，也可以访问实例成员。
>
> 静态方法中是不可以出现this关键字的。

```java
public class Test3 {

    // 静态成员
    public static int onlineNumber = 10;
    public static void test2(){
        System.out.println("==test2==");
    }

    // 实例成员
    private String name;
    public void run(){
        System.out.println(name + "跑的快~~");
    }

    // 3、静态方法中不可以出现this关键字
    public static void test3(){
        // System.out.println(this); // this只能代表当前对象！！
    }

    // 2、实例方法可以访问静态成员，也可以访问实例成员
    public void go(){
        System.out.println(Test3.onlineNumber);
        System.out.println(onlineNumber);
        test2();
        System.out.println(name);
        System.out.println(this);
        run();
    }

    // 1、静态方法只能访问静态成员，不能"直接"访问实例成员。
    public static void test(){
        System.out.println(Test3.onlineNumber);
        System.out.println(onlineNumber);
        test2();
        // System.out.println(name); // 不能直接访问实例成员。
        // run(); // 不能直接访问实例成员
    }

    public static void main(String[] args) {
        // 目标：理解static 访问相关的语法：面试笔试题，或者以后理解程序很重要的知识（拓展）。
    }
}
```



## static 工具类

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301032125422.png" alt="image-20230103212556159" style="zoom:80%;" />

### 工具类作用

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031629357.png" alt="image-20230103162942220" style="zoom:67%;" />

### 验证码工具类

```java
public class ItheimUtil {

    // 注意：由于工具类无需创建对象，所以把其构造器私有化会显得很专业！
    private ItheimUtil(){
    }

    // 静态方法
    public static String createVerifyCode(int n){
        // 开发一个验证码
        // 1、定义一个变量记住验证码。
        StringBuilder code = new StringBuilder();
        // 2、定义一个变量记住全部验证码字符。
        String data = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        // 3、定义一个循环生成几个随机索引，去得到几个字符
        Random r = new Random();
        for (int i = 0; i < n; i++) {
            // 4、获取随机索引对应的字符。链接给code
            int index = r.nextInt(data.length());
            code.append(data.charAt(index));
        }
        return code.toString();
    }
}
```

别处调用

```java
public class Check {
    public static void main(String[] args) {
        // 开发一个验证码：传入的是位数
        System.out.println(ItheimUtil.createVerifyCode(6));
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031630800.png" alt="image-20230103163050663" style="zoom:80%;" />

### 数组工具类

```java
public class ArrayUtil {

    // 私有构造器
    private ArrayUtil() {
    }

    public static String toString(int[] arr) {
        if (arr == null) {
            return "数组为空，请传入数组";
        }
        StringBuilder result = new StringBuilder("[");
        for (int i = 0; i < arr.length; i++) {
            result.append((i == arr.length - 1) ? arr[i] : arr[i] + ", ");
        }
        result.append("]");
        return result.toString();
    }
}
```

调用工具类方法

```java
public class Login {
    public static void main(String[] args) {
        int [] arr = null;
        int [] arr1 = {};
        int [] arr2 = {1 ,2 ,3};
        System.out.println(ArrayUtil.toString(arr));
        System.out.println(ArrayUtil.toString(arr1));
        System.out.println(ArrayUtil.toString(arr2));
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031649366.png" alt="image-20230103164944254" style="zoom:67%;" />



## static 代码块

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301032122565.png" alt="image-20230103212222372" style="zoom:67%;" />

### 静态代码块

> 作用：可以在程序加载时进行**静态**数据的初始化操作(准备内容)
>
> 格式：static{}
>
> 特点：需要通过static关键字修饰，随着类的加载而加载，并且自动触发、只执行一次

#### 基本使用

```java
public class StaticDemo1 {

    public static String schoolName;

    // 静态代码块：有static修饰，属于类，与类一起优先加载一次，自动触发执行。
    // 作用：可以用于初始化静态资源。
    static {
        System.out.println("------静态代码块被触发执行了------");
        schoolName = "黑马";
    }

    public static void main(String[] args) {
        // 目标：先理解静态代码块。
        System.out.println("------main方法执行------");
        System.out.println(schoolName);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031718387.png" alt="image-20230103171821245" style="zoom:67%;" />

#### 应用案例-洗牌

斗地主游戏时，在启动房间时，应该提前准备好54张牌，后续才可以使用这些牌的数据。

1. 该房间只要一副牌
2. 定义一个静态ArrayList集合存储54张牌，静态的集合只会加载一份
3. 当系统启动的同时需要准备好54张牌的数据，此时可以用静态代码块完成

```java
public class StaticTest3 {

    // 1、定义一个静态的集合，这样这个集合只加载 一个。因为当前房间只需要一副牌。
    public static ArrayList<String> cards = new ArrayList<>();

    /**
      2、在程序真正运行main方法前，把54张牌放进去吧，后续游戏可以直接使用了。
     */
    static {
        // 3、正式做牌，放到集合中去。
        // a、定义一个数组存储全部点数：类型确定了，个数确定了。
        String[] sizes = {"3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2"};
        // b、定义一个数组存储全部的花色：类型确定了，个数确定了。
        String[] colors = {"♥", "♠", "♦", "♣"};
        // c、遍历点数
        for (int i = 0; i < sizes.length; i++) {
            // sizes[i]
            // d、遍历花色
            for (int j = 0; j < colors.length; j++) {
                // colors[j]
                // 一张牌
                String card = sizes[i] + colors[j];
                cards.add(card);
            }
        }
        // e、单独加入大小王。
        cards.add("小🃏");
        cards.add("大🃏");
    }

    public static void main(String[] args) {
        // 目标：模拟游戏启动前，初始化54张牌数据。
        System.out.println("新牌：" + cards);
        Collections.shuffle(cards);
        System.out.println("洗牌：" + cards);
    }
}
```

运行结果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031741170.png" alt="image-20230103174131028" style="zoom:80%;" />



### 构造代码块(了解)

格式：{}

特点：每次创建对象，调用构造器时，都会执行该代码中的代码，并且在构造器执行前执行

使用场景：初始化实例资源

```java
public class test1 {    
    private String name;    
    {        
        name = "张三";        
        System.out.println("构造块执行");    
    }    
    public test1(){        
        System.out.println("无参构造执行");    
    }    
    public static void main(String[] args) {        
        test1 t = new test1();        
        System.out.println(t.name);    
    }
}
```

运行结果

```
构造块执行无参构造执行张三
```

## static 单例模式

> 可以保证系统中，应用该模式的这个类永远只有一个实例，即一个类永远只能创建一个对象。
>
> 例如任务管理器对象我们只需要一个就可以解决问题了，这样可以节省内存空间。

**单例的实现方式很多**：饿汉单例模式。懒汉单例模式，…

### 饿汉单例设计模式

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031745594.png" alt="image-20230103174537461" style="zoom:67%;" />

```java
// 使用饿汉单例实现单例类
public class SingleInstance {
    // 2、饿汉单例是在获取对象前，对象已经提前准备好了一个。
    // 这个对象只能是一个，所以定义静态成员变量记住。
    public static SingleInstance instance = new SingleInstance();

    // 1、必须把构造器私有化。
    private SingleInstance(){
    }
}
```

```java
// 使用单例模式创建对象
public class Test1 {
    public static void main(String[] args) {
        // 目标：理解饿汉单例的设计步骤。
        SingleInstance s1 = SingleInstance.instance;
        SingleInstance s2 = SingleInstance.instance;
        System.out.println(s1 == s2); // true
    }
}
```

### 懒汉单例设计模式

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031748062.png" alt="image-20230103174830915" style="zoom: 67%;" />

```java
// 懒汉单例
public class SingleInstance2 {

    // 2、定义一个静态的成员变量负责存储一个对象。只加载一次，只有一份。
    // 注意：最好私有化，这样可以避免给别人挖坑！
    private static SingleInstance2 instance;

    // 3、提供一个方法，对外返回单例对象。
    public static SingleInstance2 getInstance() {
        if(instance == null){
            // 第一次来拿对象 ：此时需要创建对象。
            instance = new SingleInstance2();
        }
        return instance;
    }

    // 1、私有化构造器
    private SingleInstance2(){
    }
}
```

```java
public class Test2 {
    public static void main(String[] args) {
        // 目标: 掌握懒汉单例的设计。理解其思想。
        SingleInstance2 s1 = SingleInstance2.getInstance();
        SingleInstance2 s2 = SingleInstance2.getInstance();
        System.out.println(s1 == s2); // true
    }
}
```



# 包 | 权限修饰符 | final | 常量

## 包package | 权限修饰符

### 包

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301040942235.png" alt="image-20230104093939261" style="zoom:80%;" />

```java
// 导包
import com.itheima.d1_package.it.Student;
import java.util.Scanner;

public class Test {
    public static void main(String[] args) {
        // 目标：理解以下两点
        // 1、同一个包下的类，互相可以直接访问。
        System.out.println(User.onlineNumber);

        // 2、不同包下的类，必须先导包才可以访问。
        Student s = new Student();
        Scanner sc = new Scanner(System.in);

        // 3、如果这个类中使用不同包下的相同的类名，⭐
        // 此时默认只能导入一个类的包，另一个类要使用全名访问。
        com.itheima.d1_package.it2.Student s2 = new com.itheima.d1_package.it2.Student();
    }
}
```

### 权限修饰符

> - 权限修饰符：是用来控制一个成员能够被访问的范围的。
> - 可以修饰成员变量，方法，构造器，内部类，不同权限修饰符修饰的成员能够被访问的范围将受到限制。
> - 作用范围：由小到大（**private -> 缺省 -> protected - > public** ）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210701144849189.png" alt="image-20210701144849189" style="zoom:67%;" />

自己定义成员要求

> - 成员变量一般私有。
> - 方法一般公开。
> - 如果该成员只希望本类访问，使用private修饰。
> - 如果该成员只希望本类，同一个包下的其他类和子类访问，使用protected修饰。

```java
public class Fu {
    // 1.private 只能本类中访问
    private void show1() {
        System.out.println("private");
    }

    // 2.缺省：本类，同一个包下的类中。
    void show2() {
        System.out.println("缺省");
    }

    // 3.protected：本类，同一个包下的类中，其他包下的子类
    protected void show3() {
        System.out.println("protected");
    }

    // 4.任何地方都可以
    public void show4() {
        System.out.println("public");
    }

    public static void main(String[] args) {
        //创建Fu的对象，测试看有哪些方法可以使用
        Fu f = new Fu();
        f.show1();
        f.show2();
        f.show3();
        f.show4();
    }
}
```



## final修饰符

### final 作用

> - final 关键字是最终的意思，可以修饰（类、方法、变量）
> - 修饰类：**表明该类是最终类，不能被继承**。
> - 修饰方法：**表明该方法是最终方法，不能被重写**
> - 修饰变量：**表示该变量第一次赋值后，不能再次被赋值(有且仅能被赋值一次)**

### final 修饰变量的注意

> final修饰的变量是基本类型：那么变量存储的**数据值**不能发生改变。
>
> final修饰的变量是引用类型：那么变量存储的**地址值**不能发生改变，但是地址指向的对象内容是可以发生变化的

### final 使用

```java
public class Test2 {

    // 修饰静态成员变量(public static final修饰的也称为常量了)
    public static final String schoolName = "黑马";

    // 修饰实例成员变量。（几乎不用）
    private final String name = "猪刚鬣";

    public static void main(String[] args) {
        // 目标：理解final修饰变量的作用：总规则：变量有且仅能被赋值一次。（理解语法）
        // 变量有几种：
        //    1、局部变量
        //    2、成员变量
        //           -- 实例成员变量。
        //           -- 静态成员变量。

        // 一：修饰局部变量
        final double rate = 3.14;
        // rate = 3.19; // 第二次赋值了。
        buy(0.8);

        // schoolName = "黑马程序员"; // 第二次赋值了。

        Test2 t = new Test2();
        System.out.println(t.name);
        // t.name = "天蓬元帅";

        // 注意：final修饰引用类型的变量，其地址值不能改变，但是指向的对象的内容可以改变的。
        final Teacher t2 = new Teacher("学习，授课，吹吹水~~");
        // t2 = null;  // 第二次赋值了。
        System.out.println(t2.getHobby());
        t2.setHobby("运动");
        System.out.println(t2.getHobby());
    }

    public static void buy(final double z){
         // z = 0.1; // 第二次赋值了。
    }
}
```

```java
final class Teacher{
    private String hobby;

    public Teacher(String hobby) {
        this.hobby = hobby;
    }

    public String getHobby() {
        return hobby;
    }

    public void setHobby(String hobby) {
        this.hobby = hobby;
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041000592.png" alt="image-20230104100046172" style="zoom:80%;" />

## 常量

### 常量作用

> - 常量是使用了public static final修饰的成员变量，必须有初始化值，而且执行的过程中其值不能被改变。
> - 常量的作用和好处：可以用于做系统的配置信息，方便程序的维护，同时也能提高可读性。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081358005.png" alt="image-20220608135819919" style="zoom:80%;" />

### 常量的执行原理

> - 在编译阶段会进行“**宏替换**”，把使用常量的地方全部替换成真实的字面量。
> - 这样做的好处是让使用常量的程序的执行性能与直接使用字面量是一样的

### 常量示例

```java
public class Test {
    // 常量：public static final修饰的成员变量，注意：名称全部英文大写，多个单词下划线连接。
    public static final String SCHOOL_NAME = "黑马程序员";
    public static final String COUNTRY = "中国";
    public static final int NUMBER = 10000;

    // 常量：充当配置信息
    public static final String SCHOOL = "传智教育中心";
    public static final String LOGIN_NAME = "admin";
    public static final String PASS_WORD = "123456";

    public static void main(String[] args) {
        // 目标：认识常量，知道常量的作用。
        // SCHOOL_NAME = "黑马"; // 第二次赋值。
        System.out.println(SCHOOL_NAME);
        System.out.println(COUNTRY);
        System.out.println(NUMBER);
        System.out.println(SCHOOL);
        System.out.println(LOGIN_NAME);
        System.out.println(PASS_WORD);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041006218.png" alt="image-20230104100655909" style="zoom:67%;" />

```java
// 常量类：配置类
public class Constant {
    public static final int UP = 1;
    public static final int DOWN = 2;
    public static final int LEFT = 3;
    public static final int RIGHT = 4;
}
```

```java
class Test1 {
    public static void main(String[] args) {
        System.out.println(Constant.UP);
        System.out.println(Constant.DOWN);
        System.out.println(Constant.LEFT);
        System.out.println(Constant.RIGHT);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041013716.png" alt="image-20230104101300352" style="zoom:80%;" />

# 多态

## 多态概述

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041328599.png" alt="image-20230104132802758" style="zoom:67%;" />

## 多态的优势

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041331067.png" alt="image-20230104133103829" style="zoom:67%;" />

```java
public class Animal {
    public String name = "动物名称";
    public void run(){
        System.out.println("动物可以跑~~");
    }
}
```

```java
public class Dog extends Animal {
    public String name = "狗名称";
    @Override
    public void run() {
        System.out.println("🐕跑的贼溜~~~~~");
    }

    // 独有功能
    public void lookDoor(){
        System.out.println("🐕在看🚪！！！");
    }
}
```

```java
public class Tortoise extends Animal {
    public String name = "乌龟名称";

    @Override
    public void run() {
        System.out.println("🐢跑的非常慢~~~");
    }
}
```

```java
public class Test {
    public static void main(String[] args) {
        Animal d = new Dog();
        go(d);
        // d.lookDoor();
        Animal t = new Tortoise();
        go(t);
    }

    /**
       希望这个方法可以接收一切子类动物对象
     * @param a
     */
    public static void go(Animal a){
        System.out.println("预备~~~");
        a.run();
        System.out.println("结束~~~~");
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041338162.png" alt="image-20230104133812924" style="zoom:80%;" />

## 多态类型转换

> 目的：调用子类特有功能

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041332177.png" alt="image-20230104133208521" style="zoom: 50%;" />

```java
public class Test {
    public static void main(String[] args) {
        // 自动类型转换
        Animal a = new Dog();
        a.run();
        // a.lookDoor(); // 多态下无法调用子类独有功能

        // 强制类型转换:可以实现调用子类独有功能的
        Dog d = (Dog) a;
        d.lookDoor();

        // 注意：多态下直接强制类型转换，可能出现类型转换异常
        // 规定：有继承或者实现关系的2个类型就可以强制类型转换，运行时可能出现问题。
        // Tortoise t1 = (Tortoise) a;
        // 建议强制转换前，先判断变量指向对象的真实类型，再强制类型转换。
        if(a instanceof Tortoise){
            Tortoise t = (Tortoise) a;
            t.layEggs();
        }else if(a instanceof Dog){
            Dog d1 = (Dog) a;
            d1.lookDoor();
        }

        System.out.println("---------------------");
        Animal a1 = new Dog();
        go(a1);
    }

    public static void go(Animal a){
        System.out.println("预备~~~");
        a.run();
        // 独有功能
        if(a instanceof Tortoise){
            Tortoise t = (Tortoise) a;
            t.layEggs();
        }else if(a instanceof Dog){
            Dog d1 = (Dog) a;
            d1.lookDoor();
        }
        System.out.println("结束~~~~");
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041341318.png" alt="image-20230104134127748" style="zoom:67%;" />

## 多态综合案例

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041342749.png" alt="image-20230104134215604" style="zoom:67%;" />

### USB接口

```java
public interface USB {
    void connect();
    void unconnect();
}
```

### Computer 类

```java
public class Computer {
    // 提供一个安装的入口：行为。
    public void installUSB(USB u){
        u.connect();
        // 独有功能
        if(u instanceof Mouse){
            Mouse m = (Mouse) u;
            m.click();
        }else if(u instanceof KeyBoard) {
            KeyBoard k = (KeyBoard) u;
            k.keyDown();
        }

        u.unconnect();
    }
}
```

### KeyBoard

```java
/**
   实现类（子类）
 */
public class KeyBoard implements USB{
    private String name;

    public KeyBoard(String name) {
        this.name = name;
    }

    @Override
    public void connect() {
        System.out.println(name + "成功的接入了设备了~~~");
    }

    @Override
    public void unconnect() {
        System.out.println(name + "成功的从设备弹出了~~~");
    }

    /**
      独有功能
     */
    public void keyDown(){
        System.out.println(name + "写下了：老铁，6666，下次再来哦，老弟~~~~");
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

### Mouse

```java
public class Mouse implements USB{
    private String name;

    public Mouse(String name) {
        this.name = name;
    }

    @Override
    public void connect() {
        System.out.println(name + "成功的接入了设备了~~~");
    }

    @Override
    public void unconnect() {
        System.out.println(name + "成功的从设备弹出了~~~");
    }

    /**
      独有功能
     */
    public void click(){
        System.out.println(name + "双击点亮小红心~~~~");
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

### Test

```java
/**
    目标：USB设备模拟
    1、定义USB接口：接入 拔出
    2、定义2个USB的实现类：鼠标、键盘。
    3、创建一个电脑对象，创建USB设备对象，安装启动。
 */
public class Test {
    public static void main(String[] args) {
        // a、创建电脑对象
        Computer c = new Computer();
        // b、创建USB设备对象
        USB u = new Mouse("罗技鼠标");
        c.installUSB(u);

        USB k = new KeyBoard("双飞燕键盘");
        c.installUSB(k);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041352059.png" alt="image-20230104135237940" style="zoom:67%;" />

# 内部类

## 内部类使用场景

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041355471.png" alt="image-20230104135526318" style="zoom:80%;" />



## 静态内部类(了解)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041400695.png" alt="image-20230104140000566" style="zoom:67%;" />

```java
public class Outer {

    public static int a = 100;
    private String hobby;

    /**
       学习静态成员内部类
     */
    public static class Inner{
        private String name;
        private int age;
        public static String schoolName;

        public Inner(){}

        public Inner(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public void show(){
            System.out.println("名称：" + name);
            System.out.println(a);
            // System.out.println(hobby); // 报错！
            // Outer o = new Outer();
            // System.out.println(o.hobby);
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
        }
    }
}
```

```java
public class Test {
    public static void main(String[] args) {
        Outer.Inner in = new Outer.Inner();
        in.setName("张三");
        in.show();
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041401988.png" alt="image-20230104140109872" style="zoom:80%;" />

> 1. 静态内部类中是否可以直接访问外部类的静态成员？  可以，外部类的静态成员只有一份可以被共享访问
> 2. 静态内部类中是否可以直接访问外部类的实例成员？ 不可以，外部类的实例成员必须用外部类对象访问



## 成员内部类(了解)

### 基本语法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041404167.png" alt="image-20230104140413042" style="zoom:67%;" />

```java
public class Outer {
    public static int num = 111;
    private String hobby;

    public Outer() {
    }

    public Outer(String hobby) {
        this.hobby = hobby;
    }

    // 成员内部类：不能加static修饰 属于外部类对象的
    public class Inner{
        private String name;
        private int age;
        //public static int a = 100; // JDK 16开始支持静态成员了

        //public static void test(){
        //    System.out.println(a);
        //}

        public void show(){
            System.out.println("名称：" + name);
            System.out.println("数量：" + num);
            System.out.println("爱好：" + hobby);
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
        }
    }
}
```

```java
public class Test {
    public static void main(String[] args) {
        Outer.Inner in = new Outer().new Inner();
        in.setName("内部");
        in.show();
        //Outer.Inner.test();

        System.out.println("------------");
        Outer.Inner in1 = new Outer("爱听课").new Inner();
        in1.show();
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041403383.png" alt="image-20230104140347259" style="zoom:67%;" />

> 成员内部类中是否可以直接访问外部类的静态成员? 可以，外部类的静态成员只有一份可以被共享访问，成员内部类的实例方法中是否可以直接访问外部类的实例成员？可以，因为必须先有外部类对象，才能有成员内部类对象，所以可以直接访问外部类对象的实例成员

### 面试题

请观察如下代码，写出合适的代码对应其注释要求输出的结果。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041426010.png" alt="image-20230104142613884" style="zoom:67%;" />

```java
class People{
    private int heartbeat = 150;

    // 成员内部类
    public class Heart{
        private int heartbeat = 110;

        public void show(){
            int heartbeat = 78;
            System.out.println(heartbeat); // 78
            System.out.println(this.heartbeat); // 110
            System.out.println(People.this.heartbeat); // 150
        }
    }
}
```

```java
public class Test2 {
    public static void main(String[] args) {
        People.Heart heart = new People().new Heart();
        heart.show();
    }
}
```

## 局部内部类(了解)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041427479.png" alt="image-20230104142738358" style="zoom:67%;" />

```java
public class Test {

    static {
         class Dog{}
         abstract class Animal{}
    }

    public static void main(String[] args) {
        class Cat{
            private String name;
            public String getName() {
                return name;
            }
            public void setName(String name) {
                this.name = name;
            }
        }
        Cat c = new Cat();
        c.setName("叮当猫~");
        System.out.println(c.getName());
    }
}
```



## 匿名内部类(重点)

### 匿名内部类概述

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041430267.png" alt="image-20230104143031099" style="zoom: 67%;" />

```java
abstract class Animal{
    public abstract void run();
}
```

```java
// 匿名内部类：能省略了老虎类继承动物类的那个步骤
public class Test {
    public static void main(String[] args) {
        Animal a = new Animal(){
            @Override
            public void run() {
                System.out.println("老虎跑的块~~~");
            }
        };
        a.run();
    }
}
```



### 开发中的使用形式

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041444928.png" alt="image-20230104144453810" style="zoom:67%;" />

![image-20230104143215987](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041432499.png)

```java
interface Swimming{
    void swim();
}
```

```java
public class Test2 {
    public static void main(String[] args) {
        Swimming s = new Swimming() {
            @Override
            public void swim() {
                System.out.println("学生快乐的自由泳🏊‍");
            }
        };
        go(s);
        System.out.println("--------------");
        Swimming s1 = new Swimming() {
            @Override
            public void swim() {
                System.out.println("老师泳🏊的贼快~~~~~");
            }
        };
        go(s1);
        System.out.println("--------------");
        go(new Swimming() {
            @Override
            public void swim() {
                System.out.println("运动员🏊的贼快啊~~~~~");
            }
        });
    }

    // 学生 老师 运动员可以一起参加游泳比赛
    public static void go(Swimming s){
        System.out.println("开始。。。");
        s.swim();
        System.out.println("结束。。。");
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041439319.png" alt="image-20230104143956195" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041433387.png" alt="image-20230104143300273" style="zoom:67%;" />





# 继承 ⭐

## 什么是继承

![image-20211013195108724](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211013195108724.png)

> 解决方案：把相同的属性和行为抽离出来，可以降低重复代码的书写

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031758049.png" alt="image-20230103175827875" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301032121554.png" alt="image-20230103212113343" style="zoom:67%;" />

## 继承范例

```java
// 人类：父类
public class People {
    public void run(){
        System.out.println("人会跑~~");
    }
}
```

```java
// 学生类：子类
public class Student extends People {

}
```

```java
public class Test {
    public static void main(String[] args) {
        // 目标：认识继承这种关系。搞清楚使用继承的好处。
        Student s = new Student();
        s.run();
    }
}
```

## 继承设计规范

> 子类们相同特征(共性属性，共性方法)放在父类中定义，子类独有的属性和行为应该定义在子类自己里面
>
> 如果子类的独有属性、行为定义在父类中，会导致其它子类也会得到这些属性和行为，这不符合面向对象逻辑

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031801629.png" alt="image-20230103180146471" style="zoom:67%;" />

```java
// 父类
public class People {
    private String name;
    private int age;

    // 查看课表
    public void queryCourse(){
        System.out.println(name + "在查看课表~~");
    }
    // 下面是get、set方法
}
```

```java
//子类
public class Student extends People {

    // 独有的行为,填写反馈信息
    public void writeInfo(){
        System.out.println(getName() + "写下了：学习语法，好哈皮~~");
    }
}
```

```java
public class Test {
    public static void main(String[] args) {
        // 目标：理解继承的设计思想。
        Student s = new Student();
        s.setName("蜘蛛精");// 使用父类的。
        s.setAge(999);// 使用父类的。
        System.out.println(s.getName());// 使用父类的。
        System.out.println(s.getAge());// 使用父类的。
        s.queryCourse();// 父类的
        s.writeInfo(); // 子类的方法
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031805256.png" alt="image-20230103180558118" style="zoom:67%;" />

## 继承特点

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301032120023.png" alt="image-20230103212013855" style="zoom:50%;" />

> ①子类可以继承父类的属性和行为，但是子类不能继承父类的构造器。
>
> ​     **子类是否可以继承父类的私有成员？**可以的，只是不能直接访问。
>
> ②Java是单继承模式：一个类只能继承一个直接父类。
>
> ③Java不支持多继承、但是支持多层继承。
>
> ④Java中所有的类都是Object类的子类。

### 子类是否继承父类的静态成员

> - 有争议的知识点。
> - 子类可以直接使用父类的静态成员（共享）
> - 但个人认为：子类不能继承父类的静态成员。（共享并非继承）

### 只支持单继承，不支持多继承

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031817098.png" alt="image-20230103181733909" style="zoom:67%;" />

### Java支持多层继承

> 子类 A 继承父类 B ，父类B 可以 继承父类 C

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031818945.png" alt="image-20230103181826771" style="zoom:67%;" />

### Object 祖宗类

> Java中所有类，要么直接继承了Object , 要么默认继承了Object , 要么间接继承了Object, Object是祖宗类。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031819206.png" alt="image-20230103181930044" style="zoom:67%;" />



## 继承后：成员变量、成员方法的访问特点

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301032119535.png" alt="image-20230103211924398" style="zoom:67%;" />

在子类方法中访问成员(成员变量，成员方法)满足：**就近原则**

> - 先在子类局部范围找
> - 然后在子类成员范围找
> - 然后父类成员范围找，如果父类范围还没有找到就会报错(不会去找父亲的父亲)

注意：使用super可以访问父类的属性和方法

> 如果子父类中，出现了重名的成员，会优先使用子类的，如果要使用父类的则要通过super关键字

```java
class Animal{
    public String name = "动物名";
    public void run(){
        System.out.println("动物可以跑~~");
    }
}
```

```java
class Dog extends Animal{
    // 子类属性和方法
    public String name = "狗名";
    public void lookDoor(){
        System.out.println("狗可以看门~~");
    }

    public void showName(){
        String name = "局部名";
        System.out.println(name);
        System.out.println(this.name); // 当前子类对象的name
        System.out.println(super.name); // super找父类的name
        super.run(); // super找父类的方法
        run(); // 子类的run
    }
	// 子类重写父类方法
    public void run(){
        System.out.println("狗跑的贼快~~~");
    }
}
```

```java
public class Test {
    public static void main(String[] args) {
        // 目标：理解继承后成员的访问特点：就近原则。
        Dog d = new Dog();
        d.run(); // 子类的
        d.lookDoor(); // 子类的
        d.showName();
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031825808.png" alt="image-20230103182534686" style="zoom:67%;" />

## 继承后：方法重写

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031900848.png" alt="image-20230103190015685" style="zoom:67%;" />

### 重写示例

```java
// 旧手机：父类的
class Phone{
    public void call(){
        System.out.println("打电话~");
    }

    public void sendMsg(){
        System.out.println("发短信~");
    }

    public static void test(){

    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031901657.png" alt="image-20230103190108498" style="zoom: 67%;" />

```java
/**
   新手机：子类。
 */
class NewPhone extends Phone{
    // 重写的方法
    // 1、@Override重写校验注解，加上之后，这个方法必须是正确重写的，这样更安全。
    // 2、提高程序的可读性，代码优雅！
    // 注意：重写方法的名称和形参列表必须与被重写的方法一模一样。
    @Override
    public void call(){
        super.call(); // 先用它爸爸的基本功能
        System.out.println("开始视频通话~~");
    }
    // 重写的方法
    @Override
    public void sendMsg(){
        super.sendMsg(); // 先用它爸爸的基本功能
        System.out.println("发送有趣的图片~");
    }
    // 注意：静态方法不能被重写
//    @Override
//    public static void test(){
//
//    }
}
```

```java
public class Test {
    public static void main(String[] args) {
        // 目标：认识方法重写。
        NewPhone hw = new NewPhone();
        hw.call();
        hw.sendMsg();
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031903916.png" alt="image-20230103190357766" style="zoom:67%;" />

### 重写总结

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301032118324.png" alt="image-20230103211817138" style="zoom:50%;" />

## 继承后：子类构造器的特点

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031908874.png" alt="image-20230103190828733" style="zoom:67%;" />

### 案例演示

```java
public class Animal {
    public Animal(){
        System.out.println("父类Animal无参数构造器被执行~");
    }
}
```

```java
public class Dog extends Animal{
    public Dog(){
        super(); // 写不写都有，默认找父类的无参数构造器执行
        System.out.println("子类Dog无参数构造器被执行~");
    }

    public Dog(String name){
        super(); // 写不写都有，默认找父类的无参数构造器执行
        System.out.println("子类Dog有参数构造器被执行~");
    }
}
```

```java
public class Test {
    public static void main(String[] args) {
        // 目标：认识继承后子类构造器的特点
        // 特点：子类的全部构造器默认会先访问父类的无参数构造器再执行自己
        Dog d1 = new Dog();
        System.out.println(d1);

        System.out.println("-----");

        Dog d2 = new Dog("金毛");
        System.out.println(d2);
    }
}
```

### 特点总结

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301032117328.png" alt="image-20230103211732143" style="zoom: 50%;" />



## 继承后：子类构造器访问父类有参构造器

> 调用父类有参数构造器，初始化继承自父类的数据
>
> super(....) 根据参数调用父类构造器

```java
public class People {
    private String name;
    private int age;
    // 有参无参，get set等
}
```

```java
public class Teacher extends People{

    public Teacher(){
    }
    public Teacher(String name, int age){
        // 调用父类的有参数构造器：初始化继承自父类的数据
        super(name, age);
    }
}
```

```java
public class Test {
    public static void main(String[] args) {
        // 目标：学习子类构造器如何去访问父类有参数构造器，还要清楚其作用。
        Teacher t = new Teacher("dlei", 18);
        System.out.println(t.getName());
        System.out.println(t.getAge());
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301032101299.png" alt="image-20230103210157066" style="zoom:80%;" />

## this、super

### this、super基本语法

> **this**：代表本类对象的引用；**super**：代表父类存储空间的标识。
>
> **实际上，在以上的总结中，唯独只有this调用本类其他构造器我们是没有接触过的。**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301032103089.png" alt="image-20230103210259896" style="zoom:67%;" />

### 案例演示

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301032104322.png" alt="image-20230103210443072" style="zoom:67%;" />

```java
public class Student {
    private String name;
    private String schoolName;

    public Student() {
    }

    // 学生不填写学校，默认这个对象的学校是黑马
    public Student(String name) {
        // 借用本类兄弟构造器
        this(name, "黑马程序员");
    }

    public Student(String name, String schoolName) {
        // super(); // 必须先初始化父类，再初始化自己。
        this.name = name;
        this.schoolName = schoolName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }
}
```

```java
public class Test {
    public static void main(String[] args) {
        // 目标：理解this(...)的作用：本类构造器中访问本类兄弟构造器。
        Student s1 = new Student("殷素素", "冰火岛自学");
        System.out.println(s1.getName());
        System.out.println(s1.getSchoolName());

        // 如果学生不填写学校，默认这个对象的学校是黑马
        Student s2 = new Student("张三丰");
        System.out.println(s2.getName());
        System.out.println(s2.getSchoolName());
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301032107159.png" alt="image-20230103210712996" style="zoom:67%;" />

### 使用总结

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301032115117.png" alt="image-20230103211511899" style="zoom: 50%;" />

# 接口和抽象类

## 抽象类

### 抽象类入门

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041028333.png" alt="image-20230104102803339" style="zoom:80%;" />

> - 抽象方法只有方法签名，不能声明方法体。
> - 一个类中如果定义了抽象方法，这个类必须声明成抽象类，否则报错。

### 抽象的使用场景

> 抽象类可以理解成不完整的设计图，一般作为父类，让子类来继承。
>
> 当父类知道子类一定要完成某些行为，但是每个子类该行为的实现又不同，于是该父类就把该行为定义成抽象方法的形式，具体实现交给子类去完成。此时这个类就可以声明成抽象类。
>
> 抽象类和接口类似，它也是用来定义对象的公共行为的，并且它也不能直接实例化，抽象类的实现关键字为 abstract class，子类用 extends 关键字继承父类。抽象类的使用如下：

```java
public abstract class AbstractExample {
    // 定义普通变量
    int count = 2;
    // 定义私有变量
    private static int total = 10;
    // 定义抽象方法
    public abstract void methodA();
    // 定义普通方法
    public void methodB() {
        System.out.println("Hi,methodB.");
    }
}
```

接下来使用一个普通类继承上面的抽象类：

```java
public class AbstractSon extends AbstractExample {
    @Override
    public void methodA() {
        System.out.println("Hi,method A.");
    }
    public static void main(String[] args) {
        AbstractSon abs = new AbstractSon();
        // 抽象类中的变量重新赋值
        abs.count = 666;
        System.out.println(abs.count);
        // 抽象类中的抽象方法
        abs.methodA();
        // 抽象类中的普通方法
        abs.methodB();
    }
}
```

以上程序的执行结果如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202206301654280.png" alt="image-20220630165433174" style="zoom:67%;" />

通过上述代码和执行结果可以得出以下结论：

1. 抽象类使用 abstract 关键字声明。
2. 抽象类中可以包含普通方法和抽象方法，抽象方法不能有具体的代码实现。
3. 抽象类需要使用 extends 关键字实现继承。
4. 抽象类不能直接实例化。
5. 抽象类中属性控制符无限制，可以定义 private 类型的属性。

### 抽象类的案例

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041034738.png" alt="image-20230104103429868" style="zoom:80%;" />

```java
public abstract class Card {
    private String userName;
    private double money;

    // 定义一个支付方法：表示卡片可以支付。抽象方法
    public abstract void pay(double money2);
    // 省略了set、get方法
}
```

```java
public class GoldCard extends Card{

    @Override
    public void pay(double money2) {
        System.out.println("您当前消费：" + money2);
        System.out.println("您卡片当前余额是：" + getMoney());
        // 优惠价：
        double rs = money2 * 0.8;
        System.out.println(getUserName() + ":您实际支付：" + rs);
        // 更新账户余额
        setMoney(getMoney() - rs);
    }
}
```

```java
public class Test {
    public static void main(String[] args) {
        // 目标：学习一下抽象类的基本使用：做父类，被继承，重写抽象方法
        GoldCard c = new GoldCard();
        c.setMoney(10000);
        c.setUserName("任硕");
        c.pay(300);
        System.out.println("剩余：" + c.getMoney());
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041054983.png" alt="image-20230104105421579" style="zoom:80%;" />

### 抽象类特征和注意事项

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041056843.png" alt="image-20230104105616690" style="zoom: 67%;" />

### final和abstract是什么关系

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041057415.png" alt="image-20230104105701394" style="zoom:80%;" />

### 应用：模板方法模式⭐

#### 什么时候使用模板方法模式

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041101977.png" alt="image-20230104110127888" style="zoom:80%;" />

#### 理解模板方法：写作文案例

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041102122.png" alt="image-20230104110207968" style="zoom:67%;" />

父类定义模板方法

```java
public abstract class Student {
    /**
       正式：声明了模板方法模式
       final ：这个方法不能被子类重写，因为它是给子类直接使用的。
     */
    public final void write(){
        System.out.println("\t\t\t\t《我的爸爸》");
        System.out.println("你的爸爸是啥样，来说说：");
        // 正文部分（每个子类都要写的，每个子类写的情况不一样
        // 因此。模板方法把正文部分定义成抽象方法，交给具体的子类来完成）
        System.out.println(writeMain());

        System.out.println("我的爸爸简直太好了~~");
    }

    public abstract String writeMain();
}
```

子类使用模板方法

```java
public class StudentChild extends Student{
    @Override
    public String writeMain() {
        return "的爸爸太牛b了，他总是买东西给我吃。。";
    }
}
```

```java
public class StudentMiddle extends Student{
    @Override
    public String writeMain() {
        return  "我的爸爸也很牛，我开车都不看红绿灯的，" +
                "下辈子还要做他儿子~~";
    }
}
```

测试使用

```java
public class Test {
    public static void main(String[] args) {
        // 目标：理解模板方法模式的思想和使用步骤。
        StudentMiddle s = new StudentMiddle();
        s.write();

        StudentChild s2 = new StudentChild();
        s2.write();
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041116214.png" alt="image-20230104111650225" style="zoom:67%;" />

#### 注意事项

> **模板方法我们是建议使用final修饰的，这样会更专业，那么为什么呢？**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041117961.png" alt="image-20230104111738118" style="zoom:80%;" />

## 接口

接口是 Java 语言中的一个抽象类型，用于定义对象的公共行为。它的创建关键字是 interface，在接口的实现中可以定义方法和常量，其普通方法是不能有具体的代码实现的，而在 JDK 8 之后，接口中可以创建 static 和 default 方法了，并且这两种方法可以有默认的方法实现

### 接口格式

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041119180.png" alt="image-20230104111956403" style="zoom:67%;" />

### 接口定义

```java
// 声明了一个接口: 体现一种规范，规范一定是公开的。
public interface InterfaceDemo {
    // 目标：接口中的成分特点：JDK 8之前接口中只能有抽象方法和常量。
    // 1、常量：
    // 注意：由于接口体现规范思想，规范默认都是公开的，所以代码层面，public static final 可以省略不写
    String SHCOOL_NAME = "黑马程序员";
    //public static final String SHCOOL_NAME = "黑马程序员";

    // 2、抽象方法
    // 注意：由于接口体现规范思想，规范默认都是公开的，所以代码层面，public abstract可以省略不写
    void run();
    // public abstract void run();

    void eat();
    // public abstract void eat();
}
```

### 接口多实现

> 一个类实现接口，**必须重写完全部接口的全部抽象方法**，否则这个类需要定义成抽象类。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041125800.png" alt="image-20230104112557098" style="zoom: 67%;" />

#### 定义接口

```java
public interface Law {
    void rule();// 遵纪守法
}
```

```java
public interface SportMan {
    void run();
    void competition();
}
```

#### 定义实现类

```java
public class PingPongMan implements SportMan, Law{
    private String name;
    public PingPongMan(String name) {
        this.name = name;
    }

    @Override
    public void run() {
        System.out.println(name + "必须跑步训练！");
    }

    @Override
    public void competition() {
        System.out.println(name + "要参加比赛，为国争光~！");
    }

    @Override
    public void rule() {
        System.out.println(name + "必须守法~~");
    }
}
```

#### 测试

```java
public class Test {
    public static void main(String[] args) {
        // 目标：理解接口的基本使用：被类实现。
        PingPongMan p = new PingPongMan("张继科");
        p.run();
        p.competition();
        p.rule();
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041128066.png" alt="image-20230104112758240" style="zoom:67%;" />

### 接口多继承

> **接口多继承的作用：**规范合并，整合多个接口为同一个接口，便于子类实现

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041133754.png" alt="image-20230104113310809" style="zoom:80%;" />

#### 定义接口

```java
public interface Law {
    void rule();
}
```

```java
public interface People {
    void eat();
    void sleep();
}
```

#### 继承多接口

```java
// 接口可以多继承：一个接口可以同时继承多个接口
public interface SportMan extends Law, People {
    void run();
    void competition();
}
```

#### 实现接口

```java
public class BasketBallMan implements SportMan{

    @Override
    public void rule() {

    }

    @Override
    public void eat() {

    }

    @Override
    public void sleep() {

    }

    @Override
    public void run() {

    }

    @Override
    public void competition() {

    }
}
```

### JDK8接口新增方法⭐

> **注意：JDK8新增的3种方法我们自己在开发中很少使用，通常是Java源码涉及到的，我们需要理解、识别语法、明白调用关系即可。**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041143653.png" alt="image-20230104114336454" style="zoom:67%;" />

#### 默认方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041134047.png" alt="image-20230104113423190" style="zoom:67%;" />



#### 静态方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041134999.png" alt="image-20230104113449848" style="zoom: 67%;" />



#### 私有方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041135749.png" alt="image-20230104113544990" style="zoom:67%;" />



#### 新增方法原因

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041139766.png" alt="image-20230104113908198" style="zoom:67%;" />

**项目**Version2.0需要对Inter接口丰富，加入10个新的抽象方法，此时改了接口就要所有实现类实现这些方法。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041139913.png" alt="image-20230104113955528" style="zoom:67%;" />



### 使用接口的注意事项

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041144798.png" alt="image-20230104114426497" style="zoom:67%;" />

## 接口和抽象类区别

### 区别1：定义关键字不同

接口使用关键字 interface 来定义。抽象类使用关键字 abstract 来定义。

### 区别2：继承或实现的关键字不同

接口使用 implements 关键字定义其具体实现。抽象类使用 extends 关键字实现继承。

### 区别3：子类扩展的数量不同

接口的实现类可以有多个，如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202206301655563.png" alt="image-20220630165513446" style="zoom:67%;" />

而抽象类的子类，只能继承一个抽象类，如下图所示，继承多个抽象类就会报错：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202206301655725.png" alt="image-20220630165531600" style="zoom:67%;" />

在 Java 语言中，一个类只能继承一个父类（单继承)，但可以实现多个接口。

### 区别4：属性访问控制符不同

接口中属性的访问控制符只能是 public，如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202206301700832.png" alt="image-20220630170000727" style="zoom:67%;" />

> 接口中的属性默认是 public static final 修饰的。

抽象类中的属性访问控制符无限制，可为任意控制符，如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202206301659313.png" alt="image-20220630165950211" style="zoom:67%;" />

### 区别5：方法控制符不同

接口中方法的默认控制符是 public，并且不能定义为其他控制符，如下图所示：


抽象类中的方法控制符无限制，其中抽象方法不能使用 private 修饰，如下代码所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202206301659020.png" alt="image-20220630165924906" style="zoom:67%;" />

### 区别6：方法实现不同

接口中普通方法不能有具体的方法实现，在 JDK 8 之后 static 和 default 方法必须有方法实现，如下代码所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202206301657754.png" alt="image-20220630165700646" style="zoom:67%;" />

从上述结果可以看出：static 或 default 方法如果没有方法实现就会报错，而普通方法如果有方法实现就会报错。

抽象类中普通方法可以有方法实现，抽象方法不能有方法实现，如下代码所示：

从上述结果可以看出：抽象类中的普通方法如果没有方法实现就会报错，而抽象方法如果有方法实现则会报错。

### 区别7：静态代码块使用不同

接口中不能使用静态代码块，如下代码所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202206301656423.png" alt="image-20220630165634319" style="zoom:67%;" />

抽象类中可以使用静态代码块，如下代码所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202206301656638.png" alt="image-20220630165645532" style="zoom:67%;" />

# Lambda表达式

## Lambda概述

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041622999.png" alt="image-20230104162237820" style="zoom: 60%;" />

## 体验Lambda表达式

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041624289.png" alt="image-20230104162457112" style="zoom:67%;" />

## 简化常见函数式接口⭐

### 简单排序

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041628021.png" alt="image-20230104162829816" style="zoom:67%;" />

### 集合遍历简化

#### Map 遍历

比如我们对Map 的遍历 传统方式遍历如下:

```java
@Test
public void test1() {
    Map<String, String> map = new HashMap<>();
    map.put("a", "a");
    map.put("b", "b");
    map.put("c", "c");
    System.out.println("map普通方式遍历:");
    for (String key : map.keySet()) {
        System.out.println("k=" + key + "，v=" + map.get(key));
    }
}
```

使用Lambda进行遍历:

```java
@Test
public void test1() {
    Map<String, String> map = new HashMap<>();
    map.put("a", "a");
    map.put("b", "b");
    map.put("c", "c");
    map.forEach((k, v) -> {
        System.out.println("k=" + k + "，v=" + v);
    });
}
```

#### List 遍历简化

List也同理，不过List还可以通过双冒号运算符遍历:

```java
List<String> list = new ArrayList<String>();
list.add("a");
list.add("bb");
list.add("ccc");
list.add("dddd");
System.out.println("list拉姆达表达式遍历:");
list.forEach(v -> { System.out.println(v); });
System.out.println("list双冒号运算符遍历:");
list.forEach(System.out::println);
```

### 自定义排序⭐

使用过 Java8 的 Lamdba 的应该知道，匿名内部类可以简化为 Lambda 表达式为：

```java
Collections.sort(students, (Student h1, Student h2) -> h1.getName().compareTo(h2.getName()));
```

在 Java8 中，`List`类中增加了`sort`方法，所以`Collections.sort`可以直接替换为：

```java
students.sort((Student h1, Student h2) -> h1.getName().compareTo(h2.getName()));
```

根据 Java8 中 Lambda 的类型推断，我们可以将指定的`Student`类型简写：

```java
students.sort((h1, h2) -> h1.getName().compareTo(h2.getName()));
```

至此，我们整段排序逻辑可以简化为：

```java
@Test
void baseSortedLambdaWithInferring() {
    final List<Student> students = Lists.newArrayList(
            new Student("Tom", 10),
            new Student("Jerry", 12)
    );
    students.sort((h1, h2) -> h1.getName().compareTo(h2.getName()));
    students.forEach(System.out::println);
}
```



## Lambda 省略写法

> 参数类型可以省略不写。
>
> 如果只有一个参数，参数类型可以省略，同时()也可以省略。
>
> 如果Lambda表达式的方法体代码只有一行代码。可以省略大括号不写,同时要省略分号！
>
> 如果Lambda表达式的方法体代码只有一行代码。可以省略大括号不写。此时，如果这行代码是return语句，必须省略return不写，同时也必须省略";"不写

### 1、可选类型声明

在使用过程中，我们可以不用显示声明参数类型，编译器可以统一识别参数类型，例如：

```java
Collections.sort(names, (s1, s2) -> s1.compareTo(s2));
```

上面代码中的参数`s1`、`s2`的类型是由编译器推理得出的，你也可以显式指定该参数的类型，例如：

```java
Collections.sort(names, (String s1, String s2) -> s1.compareTo(s2));
```

运行之后，两者结果一致！

### 2、可选的参数圆括号

当方法那只有一个参数时，无需定义圆括号，例如：

```java
Arrays.asList( "a", "b", "d" ).forEach(e -> System.out.println(e));
```

但多个参数时，需要定义圆括号，例如：

```java
Arrays.asList( "a", "b", "d" ).sort( ( e1, e2 ) -> e1.compareTo( e2 ) );
```

### 3、可选的大括号

当主体只包含了一行时，无需使用大括号，例如：

```java
Arrays.asList( "a", "b", "c" ).forEach( e -> System.out.println( e ) );
```

当主体包含多行时，需要使用大括号，例如：

```java
Arrays.asList( "a", "b", "c" ).forEach( e -> {
    System.out.println( e );
    System.out.println( e );
} );
```

### 4、可选的返回关键字

如果表达式中的语句块只有一行，则可以不用使用`return`语句，返回值的类型也由编译器推理得出，例如：

```java
Arrays.asList( "a", "b", "d" ).sort( ( e1, e2 ) -> e1.compareTo( e2 ) );
```

如果语句块有多行，可以在大括号中指明表达式返回值，例如：

```java
Arrays.asList( "a", "b", "d" ).sort( ( e1, e2 ) -> {
    int result = e1.compareTo( e2 );
    return result;
} );
```

### 5、变量作用域

还有一点需要了解的是，Lambda 表达式可以引用类成员和局部变量，但是会将这些变量隐式得转换成`final`，例如：

```java
String separator = ",";
Arrays.asList( "a", "b", "c" ).forEach(
    ( String e ) -> System.out.print( e + separator ) );
```

和

```java
final String separator = ",";
Arrays.asList( "a", "b", "c" ).forEach(
    ( String e ) -> System.out.print( e + separator ) );
```

两者等价！，同时，Lambda 表达式的局部变量可以不用声明为`final`，但是必须不可被后面的代码修改（即隐性的具有 final 的语义），例如：

```java
int num = 1;
Arrays.asList(1,2,3,4).forEach(e -> System.out.println(num + e));
num =2;
//报错信息：Local variable num defined in an enclosing scope must be final or effectively final
```

在 Lambda 表达式当中不允许声明一个与局部变量同名的参数或者局部变量，例如：

```java
int num = 1;
Arrays.asList(1,2,3,4).forEach(num -> System.out.println(num));
//报错信息：Variable 'num' is already defined in the scope
```

## Lambda实现超强排序

我们在系统开发过程中，对数据排序是很常见的场景。一般来说，我们可以采用两种方式：

1. 借助存储系统（SQL、NoSQL、NewSQL 都支持）的排序功能，查询的结果即是排好序的结果
2. 查询结果为无序数据，在内存中排序。

今天要说的是第二种排序方式，在内存中实现数据排序。

首先，我们定义一个基础类，后面我们将根据这个基础类演示如何在内存中排序。

### 方式一：Comparator

```java
@Test
public void test1() {
    final List<Student> students = Lists.newArrayList(
            new Student("Tom", 10),
            new Student("Jerry", 12)
    );
    students.sort(new Comparator<Student>() {
        @Override
        public int compare(Student h1, Student h2) {
            return h1.getName().compareTo(h2.getName());
        }
    });
    students.forEach(k -> {
        System.out.println(k);
    });
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206301559955.png" alt="image-20220630155914865" style="zoom:67%;" />

因为定义的`Comparator`是使用`name`字段排序，在 Java 中，`String`类型的排序是通过单字符的 ASCII 码顺序判断的，`J`排在`T`的前面，所以`Jerry`排在第一个。

### 方式二：Lambda⭐

使用过 Java8 的 Lamdba 的应该知道，匿名内部类可以简化为 Lambda 表达式为：

```java
Collections.sort(students, (Student h1, Student h2) -> h1.getName().compareTo(h2.getName()));
```

在 Java8 中，`List`类中增加了`sort`方法，所以`Collections.sort`可以直接替换为：

```java
students.sort((Student h1, Student h2) -> h1.getName().compareTo(h2.getName()));
```

根据 Java8 中 Lambda 的类型推断，我们可以将指定的`Student`类型简写：

```java
students.sort((h1, h2) -> h1.getName().compareTo(h2.getName()));
```

至此，我们整段排序逻辑可以简化为：

```java
@Test
void baseSortedLambdaWithInferring() {
    final List<Student> students = Lists.newArrayList(
            new Student("Tom", 10),
            new Student("Jerry", 12)
    );
    students.sort((h1, h2) -> h1.getName().compareTo(h2.getName()));
    students.forEach(System.out::println);
}
```

### 方式三：comparing

在 Java8 中，`Comparator`类新增了`comparing`方法，可以将传递的`Function`参数作为比较元素，比如：

```java
@Test
void sortedUsingComparator() {
    final List<Student> students = Lists.newArrayList(
            new Student("Tom", 10),
            new Student("Jerry", 12)
    );
    students.sort(Comparator.comparing(Student::getName));
    students.forEach(System.out::println);
}
```

### 多条件排序

我们在静态方法一节中展示了多条件排序，还可以在`Comparator`匿名内部类中实现多条件逻辑：

```java
@Test
void sortedMultiCondition() {
    final List<Student> students = Lists.newArrayList(
            new Student("Tom", 10),
            new Student("Jerry", 12),
            new Student("Jerry", 13)
    );
    students.sort((s1, s2) -> {
        if (s1.getName().equals(s2.getName())) {
            return Integer.compare(s1.getAge(), s2.getAge());
        } else {
            return s1.getName().compareTo(s2.getName());
        }
    });
    students.forEach(System.out::println);
}
```

从逻辑来看，多条件排序就是先判断第一级条件，如果相等，再判断第二级条件，依次类推。在 Java8 中可以使用`comparing`和一系列`thenComparing`表示多级条件判断，上面的逻辑可以简化为：

```java
@Test
void sortedMultiConditionUsingComparator() {
    final List<Student> students = Lists.newArrayList(
            new Student("Tom", 10),
            new Student("Jerry", 12),
            new Student("Jerry", 13)
    );
    students.sort(Comparator.comparing(Student::getName).thenComparing(Student::getAge));
    students.forEach(System.out::println);
}
```

这里的`thenComparing`方法是可以有多个的，用于表示多级条件判断，这也是函数式编程的方便之处。

### Stream中进行排序

Java8 中，不但引入了 Lambda 表达式，还引入了一个全新的流式 API：Stream API，其中也有`sorted`方法用于流式计算时排序元素，可以传入`Comparator`实现排序逻辑：

```java
@Test
void streamSorted() {
    final List<Student> students = Lists.newArrayList(
            new Student("Tom", 10),
            new Student("Jerry", 12)
    );
    final Comparator<Student> comparator = (h1, h2) -> h1.getName().compareTo(h2.getName());
    final List<Student> sortedStudents = students.stream()
            .sorted(comparator)
            .collect(Collectors.toList());
    sortedStudents.forEach(System.out::println);
}
```

同样的，我们可以通过 Lambda 简化书写：

```java
@Test
void streamSortedUsingComparator() {
    final List<Student> students = Lists.newArrayList(
            new Student("Tom", 10),
            new Student("Jerry", 12)
    );
    final Comparator<Student> comparator = Comparator.comparing(Student::getName);
    final List<Student> sortedStudents = students.stream()
            .sorted(comparator)
            .collect(Collectors.toList());
    sortedStudents.forEach(System.out::println);
}
```



### 倒序排列

排序就是根据`compareTo`方法返回的值判断顺序，如果想要倒序排列，只要将返回值取返即可：

```java
@Test
void sortedReverseUsingComparator2() {
    final List<Student> students = Lists.newArrayList(
            new Student("Tom", 10),
            new Student("Jerry", 12)
    );
    final Comparator<Student> comparator = (h1, h2) -> h2.getName().compareTo(h1.getName());
    students.sort(comparator);
    Assertions.assertEquals(students.get(0), new Student("Tom", 10));
}
```

**借助**`Comparator`**的**`reversed`**方法倒序**

在 Java8 中新增了`reversed`方法实现倒序排列，用起来也是很简单：

```java
@Test
void sortedReverseUsingComparator() {
    final List<Student> students = Lists.newArrayList(
            new Student("Tom", 10),
            new Student("Jerry", 12)
    );
    final Comparator<Student> comparator = (h1, h2) -> h1.getName().compareTo(h2.getName());
    students.sort(comparator.reversed());
    Assertions.assertEquals(students.get(0), new Student("Tom", 10));
}
```

### Stream中定义排序反转

在`Stream`中的操作与直接列表排序类似，可以反转`Comparator`定义，也可以使用`Comparator.reverseOrder()`反转。实现如下：

```java
@Test
void streamReverseSortedUsingComparator() {
    final List<Student> students = Lists.newArrayList(
            new Student("Tom", 10),
            new Student("Jerry", 12)
    );
    final List<Student> sortedStudents = students.stream()
            .sorted(Comparator.comparing(Student::getName, Comparator.reverseOrder()))
            .collect(Collectors.toList());
    Assertions.assertEquals(sortedStudents.get(0), new Student("Tom", 10));
}
```

### null 值的判断

前面的例子中都是有值元素排序，能够覆盖大部分场景，但有时候我们还是会碰到元素中存在`null`的情况：

1. 列表中的元素是 null
2. 列表中的元素参与排序条件的字段是 null

如果还是使用前面的那些实现，我们会碰到`NullPointException`异常，即 NPE

所以，我们需要考虑这些场景。

使用`Comparator.nullsLast`实现`null`在结尾：

```java
@Test
void sortedNullLast() {
    final List<Student> students = Lists.newArrayList(
            null,
            new Student("Snoopy", 12),
            null
    );
    students.sort(Comparator.nullsLast(Comparator.comparing(Student::getName)));
    Assertions.assertNotNull(students.get(0));
    Assertions.assertNull(students.get(1));
    Assertions.assertNull(students.get(2));
}
```

使用`Comparator.nullsFirst`实现`null`在开头：

```java
@Test
void sortedNullFirst() {
    final List<Student> students = Lists.newArrayList(
            null,
            new Student("Snoopy", 12),
            null
    );
    students.sort(Comparator.nullsFirst(Comparator.comparing(Student::getName)));
    Assertions.assertNull(students.get(0));
    Assertions.assertNull(students.get(1));
    Assertions.assertNotNull(students.get(2));
}
```

是不是很简单，接下来我们看下如何实现排序条件的字段是 null 的逻辑。



# 枚举

> 使用枚举描述一些特定的业务场景，比如一年中的春、夏、秋、冬，还有每周的周一到周天，还有各种颜色，以及可以用它来描述一些状态信息，比如错误码等。**枚举的作用：**"是为了做信息的标志和信息的分类"。

- 枚举类都是继承了枚举类型：java.lang.Enum
- 枚举都是最终类，不可以被继承。
- 构造器的构造器都是私有的，枚举对外不能创建对象。
- 枚举类的第一行默认都是罗列枚举对象的名称的。
- 枚举类相当于是多例模式。

## 枚举常用方法

> - name(); 返回enum实例声明时的名字
> - ordinal(); 返回一个int值，表示enum实例在声明的次序
> - equals(); 返回布尔值，enum实例判断相等
> - compareTo() 比较enum实例与指定对象的顺序
> - values(); 返回enum实例的数组
> - valueOf(String name) 由名称获取枚举类中定义的常量

## 使用实例(通用)

```java
public enum Color {
    SPRING("春天","春暖花开"),
    SUMMER("夏天","夏日炎炎"),
    AUTUMN("秋天","秋高气爽"),
    WINTER("冬天","白雪皑皑");
    private final String name;
    private final String desc;
    Color(String name,String desc){
        this.name = name;
        this.desc = desc;
    }
    public String getName(){
        return name;
    }
    public String getDesc(){
        return desc;
    }

    @Override
    public String toString() {
        return "Color{" +
                "name='" + name + '\'' +
                ", desc='" + desc + '\'' +
                '}';
    }
}
```

```java
public static void test3(){
    System.out.println(Color.AUTUMN);
    System.out.println(Color.valueOf("AUTUMN"));
    System.out.println(Color.SUMMER.ordinal());
    System.out.println(Color.SUMMER.getName());
    System.out.println(Color.SUMMER.getDesc());
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206012238927.png" alt="image-20220601223817832" style="zoom:80%;" />

## 枚举的 7 种使用方法⭐

很多人不使用枚举的一个重要的原因是对枚举不够熟悉，那么我们就先从枚举的 7 种使用方法说起。

### 用法一：常量

在 JDK 1.5 之前，我们定义常量都是 `public static final...` ，但有了枚举，我们就可以把这些常量定义成一个枚举类了，实现代码如下：

创建枚举类

```java
public enum Color {
    RED, GREEN, BLUE, YELLOW, ORANGE
}
```

使用

```java
public static void test3(){
    for (int i = 0; i < Color.values().length; i++) {
        System.out.println("索引" + Color.values()[i].ordinal()+"，值：" + Color.values()[i]);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206012218486.png" alt="image-20220601221821389" style="zoom:80%;" />

### 用法二：switch

将枚举用在 switch 判断中，使得代码可读性更高了，实现代码如下：

```java
enum ColorEnum {
    GREEN, YELLOW, RED
}
public class ColorTest {
    ColorEnum color = ColorEnum.RED;

    public void change() {
        switch (color) {
            case RED:
                color = ColorEnum.GREEN;
                break;
            case YELLOW:
                color = ColorEnum.RED;
                break;
            case GREEN:
                color = ColorEnum.YELLOW;
                break;
        }
    }
}
```

### 用法三：枚举中增加方法

我们可以在枚举中增加一些方法，让枚举具备更多的特性，实现代码如下：

```java
public class EnumTest {
    public static void main(String[] args) {
        ErrorCodeEnum errorCode = ErrorCodeEnum.SUCCESS;
        System.out.println("状态码：" + errorCode.code() + 
                           " 状态信息：" + errorCode.msg());
    }
}

enum ErrorCodeEnum {
    SUCCESS(1000, "success"),
    PARAM_ERROR(1001, "parameter error"),
    SYS_ERROR(1003, "system error"),
    NAMESPACE_NOT_FOUND(2001, "namespace not found"),
    NODE_NOT_EXIST(3002, "node not exist"),
    NODE_ALREADY_EXIST(3003, "node already exist"),
    UNKNOWN_ERROR(9999, "unknown error");

    private int code;
    private String msg;

    ErrorCodeEnum(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public int code() {
        return code;
    }

    public String msg() {
        return msg;
    }

    public static ErrorCodeEnum getErrorCode(int code) {
        for (ErrorCodeEnum it : ErrorCodeEnum.values()) {
            if (it.code() == code) {
                return it;
            }
        }
        return UNKNOWN_ERROR;
    }
}
```

以上程序的执行结果为：

> 状态码：1000 状态信息：success

### 用法四：覆盖枚举方法⭐

#### 方法一

我们可以覆盖一些枚举中的方法用于实现自己的业务，比如我们可以覆盖 `toString()` 方法，实现代码如下：

```java
public class EnumTest {
    public static void main(String[] args) {
        ColorEnum colorEnum = ColorEnum.RED;
        System.out.println(colorEnum.toString());
    }
}

enum ColorEnum {
    RED("红色", 1), GREEN("绿色", 2), BLANK("白色", 3), YELLOW("黄色", 4);
    //  成员变量
    private String name;
    private int index;

    //  构造方法
    private ColorEnum(String name, int index) {
        this.name = name;
        this.index = index;
    }

    //覆盖方法
    @Override
    public String toString() {
        return this.index + "：" + this.name;
    }
}
```

以上程序的执行结果为：

> 1：红色

#### 方法二

```java
public enum OrderStatus {
    NO_PAY("未支付",0),
    PAY("已支付",1){
        @Override
        public void printOrderStatus() {
            System.out.println("已支付");
        }
    },
    REFUNDING("退款中",2),
    REFUNDED("退款成功",3),
    FAIL_REFUNDED("退款失败",4),
    ;

    private final String name;
    private final int status;

    private OrderStatus(String name,int status){
        this.name = name;
        this.status = status;
    }

    public void printOrderStatus(){
        System.out.println("打印订单状态");
    }
}

class EnumTest {
    public static void main(String[] args) {
        OrderStatus.PAY.printOrderStatus();
        OrderStatus.NO_PAY.printOrderStatus();
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208211716283.png" alt="image-20220821171643146" style="zoom: 80%;" />

### 用法五：实现接口

枚举类可以用来实现接口，但不能用于继承类，因为枚举默认继承了 `java.lang.Enum` 类，在 Java 语言中允许实现多接口，但不能继承多个父类，实现代码如下：

```java
public class EnumTest {
    public static void main(String[] args) {
        ColorEnum colorEnum = ColorEnum.RED;
        colorEnum.print();
        System.out.println("颜色：" + colorEnum.getInfo());
    }
}

interface Behaviour {
    void print();

    String getInfo();
}

enum ColorEnum implements Behaviour {
    RED("红色", 1), GREEN("绿色", 2), BLANK("白色", 3), YELLOW("黄色", 4);
    private String name;
    private int index;

    private ColorEnum(String name, int index) {
        this.name = name;
        this.index = index;
    }

    @Override
    public void print() {
        System.out.println(this.index + "：" + this.name);
    }

    @Override
    public String getInfo() {
        return this.name;
    }
}
```

以上程序的执行结果为：

> 1：红色
>
> 颜色：红色

### 用法六：在接口中组织枚举类

我们可以在一个接口中创建多个枚举类，用它可以很好的实现“多态”，也就是说我们可以将拥有相同特性，但又有细微实现差别的枚举类聚集在一个接口中，实现代码如下：

```java
public class EnumTest {
    public static void main(String[] args) {
        // 赋值第一个枚举类
        ColorInterface colorEnum = ColorInterface.ColorEnum.RED;
        System.out.println(colorEnum);
        // 赋值第二个枚举类
        colorEnum = ColorInterface.NewColorEnum.NEW_RED;
        System.out.println(colorEnum);
    }
}

interface ColorInterface {
    enum ColorEnum implements ColorInterface {
        GREEN, YELLOW, RED
    }
    enum NewColorEnum implements ColorInterface {
        NEW_GREEN, NEW_YELLOW, NEW_RED
    }
}
```

以上程序的执行结果为：

> RED
>
> NEW_RED

### 用法七：使用枚举集合

在 Java 语言中和枚举类相关的，还有两个枚举集合类 `java.util.EnumSet` 和 `java.util.EnumMap`，使用它们可以实现更多的功能。

使用 `EnumSet` 可以保证元素不重复，并且能获取指定范围内的元素，示例代码如下：

```java
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

public class EnumTest {
    public static void main(String[] args) {
        List<ColorEnum> list = new ArrayList<ColorEnum>();
        list.add(ColorEnum.RED);
        list.add(ColorEnum.RED);  // 重复元素
        list.add(ColorEnum.YELLOW);
        list.add(ColorEnum.GREEN);
        // 去掉重复数据
        EnumSet<ColorEnum> enumSet = EnumSet.copyOf(list);
        System.out.println("去重：" + enumSet);

        // 获取指定范围的枚举（获取所有的失败状态）
        EnumSet<ErrorCodeEnum> errorCodeEnums = EnumSet.range(ErrorCodeEnum.ERROR,
                                                              ErrorCodeEnum.UNKNOWN_ERROR);
        System.out.println("所有失败状态：" + errorCodeEnums);
    }
}

enum ColorEnum {
    RED("红色", 1), GREEN("绿色", 2), BLANK("白色", 3), YELLOW("黄色", 4);
    private String name;
    private int index;

    private ColorEnum(String name, int index) {
        this.name = name;
        this.index = index;
    }
}

enum ErrorCodeEnum {
    SUCCESS(1000, "success"),
    ERROR(2001, "parameter error"),
    SYS_ERROR(2002, "system error"),
    NAMESPACE_NOT_FOUND(2003, "namespace not found"),
    NODE_NOT_EXIST(3002, "node not exist"),
    NODE_ALREADY_EXIST(3003, "node already exist"),
    UNKNOWN_ERROR(9999, "unknown error");

    private int code;
    private String msg;

    ErrorCodeEnum(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public int code() {
        return code;
    }

    public String msg() {
        return msg;
    }
}
```

以上程序的执行结果为：

> 去重：[RED, GREEN, YELLOW]
>
> 所有失败状态：[ERROR, SYS_ERROR, NAMESPACE_NOT_FOUND, NODE_NOT_EXIST, NODE_ALREADY_EXIST, UNKNOWN_ERROR]

`EnumMap` 与 `HashMap` 类似，不过它是一个专门为枚举设计的 `Map` 集合，相比 `HashMap` 来说它的性能更高，因为它内部放弃使用链表和红黑树的结构，采用数组作为数据存储的结构。

`EnumMap` 基本使用示例如下：

```java
import java.util.EnumMap;

public class EnumTest {
    public static void main(String[] args) {
        EnumMap<ColorEnum, String> enumMap = new EnumMap<>(ColorEnum.class);
        enumMap.put(ColorEnum.RED, "红色");
        enumMap.put(ColorEnum.GREEN, "绿色");
        enumMap.put(ColorEnum.BLANK, "白色");
        enumMap.put(ColorEnum.YELLOW, "黄色");
        System.out.println(ColorEnum.RED + ":" + enumMap.get(ColorEnum.RED));
    }
}

enum ColorEnum {
    RED, GREEN, BLANK, YELLOW;
}
```

以上程序的执行结果为：

> RED:红色

### 使用注意事项

阿里《Java开发手册》对枚举的相关规定如下，我们在使用时需要稍微注意一下。

> 【强制】所有的枚举类型字段必须要有注释，说明每个数据项的用途。
>
> 【参考】枚举类名带上 Enum 后缀，枚举成员名称需要全大写，单词间用下划线隔开。说明：枚举其实就是特殊的常量类，且构造方法被默认强制是私有。正例：枚举名字为 ProcessStatusEnum 的成员名称：SUCCESS / UNKNOWN_REASON。

## 状态转换案例

订单是电商项目中不可缺少的组成部分，而订单状态的转换也是我们经常讨论的问题。我们都知道订单状态的转换是有一定的逻辑性的，不可以随意转换。

**例**：你想购买某个商品，只是把它加入了购物车，此时应该是**未支付状态**。如果来个请求想把它转换为**退款状态**，那么系统应该抛出提示信息“状态转换失败，请先完成购买！”

接下来我们就用**枚举**来完成一下订单状态转换的限制。

```java
public enum OrderStatus{
    NO_PAY("未支付",0){
        @Override
        public Boolean canChange(OrderStatus orderStatus) {
            switch (orderStatus){
                case PAY:
                    return true;
                default:
                    return false;
            }
        }
    },
    PAY("已支付",1){
        @Override
        public Boolean canChange(OrderStatus orderStatus) {
            //因为退款接口一般都会有延迟，所以会先转化为“退款中”状态
            if (orderStatus == OrderStatus.REFUNDING) {
                return true;
            }
            return false;
        }
    },
    REFUNDING("退款中",2){
        @Override
        public Boolean canChange(OrderStatus orderStatus) {
            switch (orderStatus){
                case REFUNDED:
                case FAIL_REFUNDED:
                    return true;
                default:
                    return false;
            }
        }
    },
    REFUNDED("退款成功",3),
    FAIL_REFUNDED("退款失败",4),
    ;

    private final String name;
    private final int status;

    private OrderStatus(String name,int status){
        this.name = name;
        this.status = status;
    }

    //自定义转换方法
    public Boolean canChange(OrderStatus orderStatus){
        return false;
    }
}
```

调用方法：

```java
class EnumTest {
    public static void main(String[] args) {
        Boolean aBoolean = OrderStatus.NO_PAY.canChange(OrderStatus.PAY);
        String statusStr = aBoolean?"可以":"不可以";
        System.out.println("是否可以完成状态转换："+ statusStr);

        Boolean flag = OrderStatus.REFUNDED.canChange(OrderStatus.FAIL_REFUNDED);
        String flagStr = flag?"可以":"不可以";
        System.out.println("是否可以完成状态转换："+ flagStr);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208211744396.png" alt="image-20220821174401259" style="zoom:80%;" />



## 枚举使用场景

枚举的常见使用场景是单例，它的完整实现代码如下：

```java
public class Singleton {
    // 枚举类型是线程安全的，并且只会装载一次
    private enum SingletonEnum {
        INSTANCE;
        // 声明单例对象
        private final Singleton instance;
        // 实例化
        SingletonEnum() {
            instance = new Singleton();
        }
        private Singleton getInstance() {
            return instance;
        }
    }
    // 获取实例（单例对象）
    public static Singleton getInstance() {
        return SingletonEnum.INSTANCE.getInstance();
    }
    private Singleton() {
    }
    // 类方法
    public void sayHi() {
        System.out.println("Hi,Java.");
    }
}
class SingletonTest {
    public static void main(String[] args) {
        Singleton singleton = Singleton.getInstance();
        singleton.sayHi();
    }
}
```

因为枚举只会在类加载时装载一次，所以它是线程安全的，这也是《Effective Java》作者极力推荐使用枚举来实现单例的主要原因。

## EnumSet 和EnumMap

### 预备枚举类

```java
enum SeasonEnum {
    SPRING,SUMMER,FALL,WINTER,;
}
```

### EnumSet

先来看看EnumSet的继承体系图

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207181820750.png" alt="image-20220718182042622" style="zoom: 50%;" />

显然，EnumSet也实现了set接口，相比于HashSet，它有以下优点：

- 消耗较少的内存
- 效率更高，因为是位向量实现的。
- 可以预测的遍历顺序（enum常量的声明顺序）
- 拒绝加null

**EnumSet就是set的高性能实现，它的要求就是存放必须是同一枚举类型。**EnumSet的常用方法：

- allof() 创建一个包含指定枚举类里所有枚举值的EnumSet集合
- range() 获取某个范围的枚举实例
- of() 创建一个包括参数中所有枚举元素的EnumSet集合
- complementOf（） 初始枚举集合包括指定枚举集合的补集

看实例，最实际：

```java
public class EnumTest {   
    public static void main(String[] args) {       
        // Creating a set      
        EnumSet<SeasonEnum> set1, set2, set3, set4;
        // Adding elements       
        set1 = EnumSet.of(SeasonEnum.SPRING,  SeasonEnum.FALL, SeasonEnum.WINTER);   
        set2 = EnumSet.complementOf(set1);    
        set3 = EnumSet.allOf(SeasonEnum.class);        
        set4 = EnumSet.range(SeasonEnum.SUMMER,SeasonEnum.WINTER);       
        System.out.println("Set 1: " + set1);       
        System.out.println("Set 2: " + set2);        
        System.out.println("Set 3: " + set3);       
        System.out.println("Set 4: " + set4);  
    }
}
```

输出结果：

```java
Set 1: [SPRING, FALL, WINTER]
Set 2: [SUMMER]
Set 3: [SPRING, SUMMER, FALL, WINTER]
Set 4: [SUMMER, FALL, WINTER]
```

### EnumMap

EnumMap的继承体系图如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207181822327.png" alt="image-20220718182203215" style="zoom:67%;" />

EnumMap也实现了Map接口，相对于HashMap，它也有这些优点：

- 消耗较少的内存
- 效率更高
- 可以预测的遍历顺序
- 拒绝null

**EnumMap就是map的高性能实现。** 它的常用方法跟HashMap是一致的，唯一约束是枚举相关。

看实例，最实际：

```java
public class EnumTest {    
    public static void main(String[] args) {       
        Map<SeasonEnum, String> map = new EnumMap<>(SeasonEnum.class);    
        map.put(SeasonEnum.SPRING, "春天");        
        map.put(SeasonEnum.SUMMER, "夏天");    
        map.put(SeasonEnum.FALL, "秋天");      
        map.put(SeasonEnum.WINTER, "冬天");     
        System.out.println(map);        
        System.out.println(map.get(SeasonEnum.SPRING));   
    }
}
```

运行结果

```java
{SPRING=春天, SUMMER=夏天, FALL=秋天, WINTER=冬天}
春天
```

### 枚举为什么是线程安全的？

这一点要从枚举最终生成的字节码说起，首先我们先来定义一个简单的枚举类：

```java
public enum ColorEnumTest {
    RED, GREEN, BLANK, YELLOW;
}
```

然后我们再将上面的那段代码编译为字节码，具体内容如下：

```java
public final class ColorEnumTest extends java.lang.Enum<ColorEnumTest> {
  public static final ColorEnumTest RED;
  public static final ColorEnumTest GREEN;
  public static final ColorEnumTest BLANK;
  public static final ColorEnumTest YELLOW;
  public static ColorEnumTest[] values();
  public static ColorEnumTest valueOf(java.lang.String);
  static {};
}
```

从上述结果可以看出枚举类最终会被编译为被 `final` 修饰的普通类，它的所有属性也都会被 `static` 和 `final` 关键字修饰，所以枚举类在项目启动时就会被 JVM 加载并初始化，而这个执行过程是线程安全的，所以枚举类也是线程安全的类。

> 小贴士：代码反编译的过程是先用 javac 命令将 java 代码编译字节码（.class），再使用 javap 命令查看编译的字节码。

### 枚举比较小技巧

我们在枚举比较时使用 == 就够了，因为枚举类是在程序加载时就创建了（它并不是 `new` 出来的），并且枚举类不允许在外部直接使用 `new` 关键字来创建枚举实例，所以我们在使用枚举类时本质上只有一个对象，因此在枚举比较时使用 == 就够了。

并且我们在查看枚举的 `equlas()` 源码会发现，它的内部其实还是直接调用了 == 方法，源码如下：

```java
public final boolean equals(Object other) {
    return this==other;
}
```



# 包装类

因为 Java 的设计理念是一切皆是对象，在很多情况下，需要以对象的形式操作。比如 hashCode() 获取哈希值，或者 getClass() 获取类等。

> - Java为了实现一切皆对象，为8种基本类型提供了对应的引用类型。
>
> - 后面的集合和泛型其实也只能支持包装类型，不支持基本数据类型。

## 基本类型和引用类型

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211016131755149.png" alt="image-20211016131755149" style="zoom:80%;" />

## 拆箱和装箱

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206012146663.png" alt="image-20220601214624570" style="zoom:80%;" />

```java
// 底层自动调用Integer.valueOf方法
Integer a2 = 11; // 自动装箱
System.out.println(a2);

Integer it = 100;
int it1 = it; // 自动拆箱
System.out.println(it1);

double db = 99.5;
Double db2 = db; // 自动装箱
double db3 = db2; // 自动拆箱
System.out.println(db3);

// int age = null; // 报错了！
Integer age1 = null;
Integer age2 = 0;
```

## 类型转换⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301042111028.png" alt="image-20230104211147822" style="zoom: 50%;" />

### toString 数字转字符串

```java
// 1、包装类可以把基本类型的数据转换成字符串形式。（没啥用）
Integer i3 = 23;
String rs = i3.toString();
System.out.println(rs + 1);

String rs1 = Integer.toString(i3);
System.out.println(rs1 + 1);

// 可以直接+字符串得到字符串类型
String rs2 = i3 + "";
System.out.println(rs2 + 1);
```

### parsexxx 字符串转数字

主要方法：parseXXX

```java
public static void test() {
    //字符串转数字
    int i = Integer.parseInt("212");
    //数字转字符串
    String s = String.valueOf(212);
    //字符串转Boolean
    boolean aTrue = Boolean.parseBoolean("true");
    // double
    double d = Double.parseDouble("212");
}
```



## 获取包装类对象方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208072322276.png" alt="image-20220807232202104" style="zoom:67%;" />

## 包装类对象的缓存问题⭐⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206012151445.png" alt="image-20220601215118346" style="zoom:80%;" />

# 常用API

## Math

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041531965.png" alt="image-20230104153112794" style="zoom:67%;" />

```java
public class MathDemo {
    public static void main(String[] args) {
        // 1.取绝对值:返回正数
        System.out.println(Math.abs(10)); // 10
        System.out.println(Math.abs(-10.3)); // 10.3

        // 2.向上取整: 5
        System.out.println(Math.ceil(4.00000001)); // 5.0
        System.out.println(Math.ceil(4.0)); // 4.0
        // 3.向下取整：4
        System.out.println(Math.floor(4.99999999)); // 4.0
        System.out.println(Math.floor(4.0)); // 4.0

        // 4.求指数次方
        System.out.println(Math.pow(2 , 3)); // 2^3 = 8.0
        // 5.四舍五入 10
        System.out.println(Math.round(4.49999)); // 4
        System.out.println(Math.round(4.500001)); // 5

        System.out.println(Math.random());  // 0.0 - 1.0 （包前不包后）

        // 拓展： 3 - 9 之间的随机数  （0 - 6） + 3
        //  [0 - 6] + 3 -> [3 - 9]
        int data =  (int)(Math.random() * 7) + 3;
        System.out.println(data);
    }
}
```



## DecimalFormat(保留几位小数)

DecimalFormat：对小数进行格式化，保留几位小数。与格式化时间联想记。

> - . 表示小数点
> - 0和# 表示数位，保留几位就几个0或者#

```java
public static void t1() {
    double d= 10/3.0;
    System.out.println(d);//3.3333333333333335
    // . 表示小数点
    // 0和#表示数字
    // 保留两位小数                        格式
    DecimalFormat df = new DecimalFormat(".00"); // 或者.##
    String s = df.format(d); // 把 d 转成上面设置的格式
    System.out.println(s);//3.33
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206301039590.png" alt="image-20220630103933518" style="zoom:80%;" />



## Random 生成随机数

本文我们介绍了 4 种生成随机数的方法，其中 Math 是对 Random 的封装，所以二者比较类似。Random 生成的是伪随机数，是以当前纳秒时间作为种子数的，并且在多线程竞争比较激烈的情况下因为要进行 CAS 操作，所以存在一定的性能问题，但**对于绝大数应用场景来说，使用 Random 已经足够了。当在竞争比较激烈的场景下可以使用 ThreadLocalRandom 来替代 Random，但如果对安全性要求比较高的情况下，可以使用 SecureRandom 来生成随机数**，因为 SecureRandom 会收集一些随机事件来作为随机种子，所以 SecureRandom 可以看作是生成真正随机数的一个工具类。

### Random

Random 类诞生于 JDK 1.0，它产生的随机数是**伪随机数**，也就是有规则的随机数。在随机数生成时，随机算法的起源数字称为种子数（seed），在种子数的基础上进行一定的变换，从而产生需要的随机数字。

**Random 对象在种子数相同的情况下，相同次数生成的随机数是相同的**。比如两个种子数相同的 Random 对象，第一次生成的随机数字完全相同，第二次生成的随机数字也完全相同。**默认情况下 new Random() 使用的是当前纳秒时间作为种子数的**。

Random类提供的方法：API

- `nextBoolean()`- 返回均匀分布的 或者`true``false`
- `nextBytes(byte[] bytes)`
- `nextDouble()`- 返回 0.0 到 1.0 之间的均匀分布的`double`
- `nextFloat()`- 返回 0.0 到 1.0 之间的均匀分布的`float`
- `nextGaussian()`- 返回 0.0 到 1.0 之间的高斯分布（即正态分布）的`double`
- `nextInt()`- 返回均匀分布的`int`
- `nextInt(int n)`- 返回 0 到 n 之间的均匀分布的 （包括 0，不包括 n）`int`
- `nextLong()`- 返回均匀分布的`long`
- `setSeed(long seed)`- 设置种子

**只要种子一样，产生的随机数也一样：** 因为种子确定，随机数算法也确定，因此输出是确定的！

**Random类默认使用当前系统时钟作为种子**

```java
Random random1 = new Random(10000);
Random random2 = new Random(10000);

for (int i = 0; i < 5; i++) {
    System.out.println(random1.nextInt() + " = " + random2.nextInt());
}
```

**结果：**

> -498702880 = -498702880 -858606152 = -858606152 1942818232 = 1942818232 -1044940345 = -1044940345 1588429001 = 1588429001

#### ① 基础使用

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121142543.png" alt="image-20230112114257437" style="zoom:67%;" />

使用 Random 生成一个从 0 到 10 的随机数（不包含 10），实现代码如下：

```java
public class RandomDemo1 {
    public static void main(String[] args) {
        // 目标：学会使用Java提供的随机数类Random
        // 1、导包
        // 2、创建随机数对象
        Random r = new Random();

        // 3、调用nextInt功能（方法）可以返回一个整型的随机数给你
        for (int i = 0; i < 20; i++) {
            int data = r.nextInt(10); // 0 - 9 不包含10的（包前不包后）
            System.out.println(data);
        }

        System.out.println("-----------------------");
        // 1 - 10 ==> -1 ==> (0 - 9) + 1
        int data = r.nextInt(10) + 1;
        System.out.println(data);

        // 3 - 17 ==> -3 ==> (0 - 14) + 3
        int data1 = r.nextInt(15) + 3;
        System.out.println(data1);
    }
}
```



#### ② 优缺点分析

Random 使用 LGC 算法生成伪随机数的**优点是执行效率比较高，生成的速度比较快**。

它的**缺点是如果 Random 的随机种子一样的话，每次生成的随机数都是可预测的（都是一样的）**。如下代码所示，当我们给两个线程设置相同的种子数的时候，会发现每次产生的随机数也是相同的：

```java
// 创建两个线程
for (int i = 0; i < 2; i++) {
    new Thread(() -> {
        // 创建 Random 对象，设置相同的种子
        Random random = new Random(1024);
        // 生成 3 次随机数
        for (int j = 0; j < 3; j++) {
            // 生成随机数
            int number = random.nextInt();
            // 打印生成的随机数
            System.out.println(Thread.currentThread().getName() + ":" +
                               number);
            // 休眠 200 ms
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("---------------------");
        }
    }).start();
}
```

以上程序的执行结果为：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022/202204210959385.png" alt="image-20220421095907347" style="zoom:50%;" />

#### ③ 线程安全问题

当我们要使用一个类时，我们首先关心的第一个问题是：它是否为线程安全？对于 Random 来说，**Random 是线程安全的**。

> PS：线程安全指的是在多线程的场景下，程序的执行结果和预期的结果一致，就叫线程安全的，否则则为非线程安全的（也叫线程安全问题）。比如有两个线程，第一个线程执行 10 万次 ++ 操作，第二个线程执行 10 万次 -- 操作，那么最终的结果应该是没加也没减，如果程序最终的结果和预期不符，则为非线程安全的。

来解决线程安全问题的，因此对于绝大数随机数生成的场景，使用 Random 不乏为一种很好的选择。



### ThreadLocalRandom

ThreadLocalRandom 是 JDK 1.7 新提供的类，它属于 JUC（java.util.concurrent）下的一员，为什么有了 Random 之后还会再创建一个 ThreadLocalRandom？

原因很简单，通过上面 Random 的源码我们可以看出，Random 在生成随机数时使用的 CAS 来解决线程安全问题的，然而 **CAS 在线程竞争比较激烈的场景中效率是非常低的**，原因是 CAS 对比时老有其他的线程在修改原来的值，所以导致 CAS 对比失败，所以它要一直循环来尝试进行 CAS 操作。所以**在多线程竞争比较激烈的场景可以使用 ThreadLocalRandom 来解决 Random 执行效率比较低的问题**。

当我们第一眼看到 ThreadLocalRandom 的时候，一定会联想到一次类 ThreadLocal，确实如此。**ThreadLocalRandom 的实现原理与 ThreadLocal 类似，它相当于给每个线程一个自己的本地种子，从而就可以避免因多个线程竞争一个种子，而带来的额外性能开销了**。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022/202204211001029.png" alt="image-20220421100139949" style="zoom:67%;" />

#### ① 基础使用

接下来我们使用 ThreadLocalRandom 来生成一个 0 到 10 的随机数（不包含 10），实现代码如下：

```java
// 得到 ThreadLocalRandom 对象
ThreadLocalRandom random = ThreadLocalRandom.current();
for (int i = 0; i < 10; i++) {
    // 生成 0-9 随机整数
    int number = random.nextInt(10);
    // 打印结果
    System.out.println("生成随机数：" + number);
}
```

以上程序的执行结果为：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022/202204211002469.png" alt="image-20220421100207439" style="zoom:50%;" />

#### ② 实现原理

ThreadLocalRandom 的实现原理和 ThreadLocal 类似，它是让每个线程持有自己的本地种子，该种子在生成随机数时候才会被初始化

#### ③ 优缺点分析

ThreadLocalRandom 结合了 Random 和 ThreadLocal 类，并被隔离在当前线程中。因此它通过避免竞争操作种子数，从而**在多线程运行的环境中实现了更好的性能**，而且也保证了它的**线程安全**。

另外，不同于 Random， ThreadLocalRandom 明确不支持设置随机种子。它重写了 Random 的`setSeed(long seed)` 方法并直接抛出了 `UnsupportedOperationException` 异常，因此**降低了多个线程出现随机数重复的可能性**。

源码如下：

```java
public void setSeed(long seed) {
    // only allow call from super() constructor
    if (initialized)
        thrownew UnsupportedOperationException();
}
```

只要程序中调用了 setSeed() 方法就会抛出 `UnsupportedOperationException` 异常

#### ThreadLocalRandom 缺点分析

虽然 ThreadLocalRandom 不支持手动设置随机种子的方法，但并不代表 ThreadLocalRandom 就是完美的，当我们查看 ThreadLocalRandom 初始化随机种子的方法 initialSeed() 源码时发现，默认情况下它的随机种子也是以当前时间有关，源码如下：

```java
private static long initialSeed() {
    // 尝试获取 JVM 的启动参数
    String sec = VM.getSavedProperty("java.util.secureRandomSeed");
    // 如果启动参数设置的值为 true，则参数一个随机 8 位的种子
    if (Boolean.parseBoolean(sec)) {
        byte[] seedBytes = java.security.SecureRandom.getSeed(8);
        long s = (long)(seedBytes[0]) & 0xffL;
        for (int i = 1; i < 8; ++i)
            s = (s << 8) | ((long)(seedBytes[i]) & 0xffL);
        return s;
    }
    // 如果没有设置启动参数，则使用当前时间有关的随机种子算法
    return (mix64(System.currentTimeMillis()) ^
            mix64(System.nanoTime()));
}
```

从上述源码可以看出，当我们设置了启动参数“-Djava.util.secureRandomSeed=true”时，ThreadLocalRandom 会产生一个随机种子，一定程度上能缓解随机种子相同所带来随机数可预测的问题，然而**默认情况下如果不设置此参数，那么在多线程中就可以因为启动时间相同，而导致多个线程在每一步操作中都会生成相同的随机数**。

### SecureRandom

SecureRandom 继承自 Random，该类提供加密强随机数生成器。**SecureRandom 不同于 Random，它收集了一些随机事件，比如鼠标点击，键盘点击等，SecureRandom 使用这些随机事件作为种子。这意味着，种子是不可预测的**，而不像 Random 默认使用系统当前时间的毫秒数作为种子，从而避免了生成相同随机数的可能性。

#### 基础使用

```java
// 创建 SecureRandom 对象，并设置加密算法
SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
for (int i = 0; i < 10; i++) {
    // 生成 0-9 随机整数
    int number = random.nextInt(10);
    // 打印结果
    System.out.println("生成随机数：" + number);
}
```

以上程序的执行结果为：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022/202204211005018.png" alt="image-20220421100558977" style="zoom: 50%;" />

SecureRandom 默认支持两种加密算法：

1. SHA1PRNG 算法，提供者 sun.security.provider.SecureRandom；
2. NativePRNG 算法，提供者 sun.security.provider.NativePRNG。

当然除了上述的操作方式之外，你还可以选择使用 `new SecureRandom()` 来创建 SecureRandom 对象，实现代码如下：

```java
SecureRandom secureRandom = new SecureRandom();
```

通过 new 初始化 SecureRandom，默认会使用 NativePRNG 算法来生成随机数，但是也可以配置 JVM 启动参数“-Djava.security”参数来修改生成随机数的算法，或选择使用 `getInstance("算法名称")` 的方式来指定生成随机数的算法。

### Math

Math 类诞生于 JDK 1.0，它里面包含了用于执行基本数学运算的属性和方法，如初等指数、对数、平方根和三角函数，当然它里面也包含了生成随机数的静态方法 `Math.random()` ，**此方法会产生一个 0 到 1 的 double 值**

#### ① 基础使用

```java
for (int i = 0; i < 10; i++) {
    // 产生随机数
    double number = Math.random();
    System.out.println("生成随机数：" + number);
}
```

以上程序的执行结果为：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022/202204211007654.png" alt="image-20220421100701605" style="zoom:50%;" />

#### ② 扩展

当然如果你想**用它来生成一个一定范围的 int 值**也是可以的，你可以这样写：

```java
for (int i = 0; i < 10; i++) {
    // 生成一个从 0-99 的整数
    int number = (int) (Math.random() * 100);
    System.out.println("生成随机数：" + number);
}
```

以上程序的执行结果为：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022/202204211007318.png" alt="image-20220421100752287" style="zoom:50%;" />

#### ③ 实现原理

通过分析 `Math` 的源码我们可以得知：当第一次调用 `Math.random()` 方法时，自动创建了一个伪随机数生成器，实际上用的是 `new java.util.Random()`，当下一次继续调用 `Math.random()` 方法时，就会使用这个新的伪随机数生成器。

源码如下：

```java
public static double random() {
    return RandomNumberGeneratorHolder.randomNumberGenerator.nextDouble();
}

private static final class RandomNumberGeneratorHolder {
    static final Random randomNumberGenerator = new Random();
}
```

### 猜数字游戏

> ①随机生成一个1-100之间的数据
>
> ②使用死循环让用户不断提示用户猜测，猜大提示过大，猜小提示过小，猜中结束游戏。

```java
public class RamdomTest2 {
    public static void main(String[] args) {
        // 1、随机一个幸运号码 1- 100之间  (0 - 99) + 1
        Random r = new Random();
        int luckNumber = r.nextInt(100) + 1;

        // 2、使用一个死循环让用户不断的去猜测，并给出提示
        Scanner sc = new Scanner(System.in);
        while (true) {
            // 让用户输入数据猜测
            System.out.println("请您输入猜测的数据（1-100）：");
            int guessNumber = sc.nextInt();

            // 3、判断这个猜测的号码与幸运号码的大小情况
            if(guessNumber > luckNumber){
                System.out.println("您猜测的数据过大~");
            }else if(guessNumber < luckNumber){
                System.out.println("您猜测的数据过小");
            }else {
                System.out.println("恭喜您，猜中了，可以去买单了~~~");
                break; // 直接跳出并结束当前死循环！！
            }
        }
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301121149598.png" alt="image-20230112114947489" style="zoom:67%;" />

## System

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041540220.png" alt="image-20230104154010985" style="zoom:80%;" />

### exit 程序终止

```java
System.exit(0); // JVM终止！
```

### currentTimeMillis 统计函数耗时

```java
public static void s1()  {
    // 开始和结束时间
    long start = System.currentTimeMillis();
    for (int i = 0; i < 1000; i++) {
        System.out.println(i+" ");
    }
    long end = System.currentTimeMillis();
    System.out.println("耗时：" + (end - start) + "ms");
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202206011820531.png" alt="image-20220601182038449" style="zoom:80%;" />

### arraycopy 数组拷贝

```java
/**
 arraycopy(Object src,  int  srcPos, Object dest, int destPos, int length)
 参数一：被拷贝的数组
 参数二：从哪个索引位置开始拷贝
 参数三：复制的目标数组
 参数四：粘贴位置
 参数五：拷贝元素的个数
 */
```

```java
int[] arr1 = {10, 20, 30, 40, 50, 60, 70};
int[] arr2 = new int[6]; // [0, 0, 0, 0, 0, 0] ==>  [0, 0, 40, 50, 60, 0]
System.arraycopy(arr1, 3, arr2, 2, 3);
System.out.println(Arrays.toString(arr2)); // [0, 0, 40, 50, 60, 0]
```



## Object ⭐

### Object类的作用

> 一个类要么默认继承了Object类，要么间接继承了Object类，Object类是Java中的祖宗类。
>
> Object作为所有类的父类，提供了很多常用的方法给每个子类对象拿来使用。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041454478.png" alt="image-20230104145409327" style="zoom:67%;" />

### toString 方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041455597.png" alt="image-20230104145507417" style="zoom:67%;" />

```java
// 实体类要生成toString方法，这样才能正常显示对象
@Override
public String toString() {
    return "Student{" +
            "name='" + name + '\'' +
            ", sex=" + sex +
            ", age=" + age +
            '}';
}
```

### equals方法

#### 基本语法

> 如果 a 和 b 都是对象，则 a==b 是比较两个对象的引用，只有当 a 和 b 指向的是堆中的同一个对象才会返回 true。

> 而 a.equals(b) 是进行逻辑比较，当内容相同时，返回true，所以通常需要重写该方法来提供逻辑一致性的比较。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041456929.png" alt="image-20230104145609748" style="zoom:67%;" />

#### 详细用法

> `a.equals(b)`, a 是null, 抛出NullPointException异常。
>
> `a.equals(b)`, a不是null, b是null,  返回false

> `Objects.equals(a, b)`比较时， 若a 和 b 都是null, 则返回 true, 如果a 和 b 其中一个是null, 另一个不是null, 则返回false。注意：不会抛出空指针异常。

```
null.equals("abc")    →   抛出 NullPointerException 异常
"abc".equals(null)    →   返回 false
null.equals(null)     →   抛出 NullPointerException 异常
Objects.equals(null, "abc")    →   返回 false
Objects.equals("abc",null)     →   返回 false
Objects.equals(null, null)     →   返回 true
```

> a 和 b 如果都是空值字符串："", 则 `a.equals(b)`, 返回true, 如果a和b其中有一个不是空串，则返回false;
>
> 这种情况下 `Objects.equals` 与情况1 行为一致。

```
"abc".equals("")    →   返回 false
"".equals("abc")    →   返回 false
"".equals("")       →   返回 true
Objects.equals("abc", "")    →   返回 false
Objects.equals("","abc")     →   返回 false
Objects.equals("","")        →   返回 true
```

#### 案例演示

```java
@Override
public boolean equals(Object o) {
    // 1、判断是否是同一个对象比较，如果是返回true。
    if (this == o) return true;
    // 2、如果o是null返回false  如果o不是学生类型返回false  ...Student !=  ..Pig
    if (o == null || this.getClass() != o.getClass()) return false;
    // 3、说明o一定是学生类型而且不为null
    Student student = (Student) o;
    return sex == student.sex && age == student.age && Objects.equals(name, student.name);
}
```

```java
public class Test2 {
    public static void main(String[] args) {
        Student s1 = new Student("周雄", '男', 19);
        Student s2 = new Student("周雄", '男', 19);
        // equals默认是比较2个对象的地址是否相同，子类重写后会调用子类重写的来比较内容是否相同。
        System.out.println(s1.equals(s2)); // true
        System.out.println(s1 == s2); // false
        System.out.println(Objects.equals(s1, s2)); // true
    }
}
```

### hashCode

> equals 方法和 hashCode 方法是 Object 类中的两个基础方法，它们共同协作来判断两个对象是否相等。

#### hashCode基本 使用

相等的值 hashCode 一定相同的示例：

```java
public class HashCodeExample {
    public static void main(String[] args) {
        String s1 = "Hello";
        String s2 = "Hello";
        String s3 = "Java";
        System.out.println("s1 hashCode:" + s1.hashCode());
        System.out.println("s2 hashCode:" + s2.hashCode());
        System.out.println("s3 hashCode:" + s3.hashCode());
    }
}
```

以上程序的执行结果，如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202206302128835.png" alt="image-20220630212813723" style="zoom:67%;" />

不同的值 hashCode 也有可能相同的示例：

```java
public class HashCodeExample {
    public static void main(String[] args) {
        String s1 = "Aa";
        String s2 = "BB";
        System.out.println("s1 hashCode:" + s1.hashCode());
        System.out.println("s2 hashCode:" + s2.hashCode());
    }
}
```

以上程序的执行结果，如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202206302128410.png" alt="image-20220630212847301" style="zoom:67%;" />

#### 为什么和equals一起重写

> 在Java中，equals方法是用于比较两个对象是否相等的方法，而hashCode方法则是用于获取对象的哈希码的方法。哈希码是一个整数，用于快速比较两个对象是否相等。

> 在某些情况下，我们需要将对象存储在散列表或集合中，比如HashMap、HashSet等。这些集合在插入和查找元素时，通常会使用对象的哈希码来确定它们在数据结构中的位置，然后再使用equals方法进行比较。如果对象的equals方法返回true，则说明它们相等，可以将它们视为同一个元素。

因此，为了正确地使用散列表和集合，我们需要保证以下两点：

> 1. 如果两个对象相等，则它们的哈希码必须相等。
> 2. 如果两个对象的哈希码相等，则它们不一定相等，需要使用equals方法再次比较。

> 这就是为什么在Java中，如果我们重写了equals方法，就必须同时重写hashCode方法，并且保证它们的实现符合上述要求。否则，我们将无法正确地使用散列表和集合，可能导致程序出现错误或异常。

> 值得注意的是，hashCode方法的实现可能会影响到集合的性能，因为哈希冲突会导致集合中的元素数量增加，从而影响到查找和插入的效率。因此，我们需要尽可能地避免哈希冲突，同时保证hashCode方法的实现高效而准确。

## Objects 工具类

> Objects是一个工具类，提供了一些方法去完成一些功能。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041505666.png" alt="image-20230104150516503" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041508480.png" alt="image-20230104150800324" style="zoom: 67%;" />

```java
public class Test {
    public static void main(String[] args) {
        String s1 = null;
        String s2 = new String("itheima");
        //System.out.println(s1.equals(s2));   // 留下了隐患，可能出现空指针异常。
        System.out.println(Objects.equals(s1, s2)); // 更安全，结果也是对的！ false
        System.out.println(Objects.isNull(s1)); // true
        System.out.println(s1 == null); // true
        System.out.println(Objects.isNull(s2)); // false
        System.out.println(s2 == null); // false
    }
}
```



## Runtime运行环境

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207081737175.png" alt="image-20220708173716865" style="zoom:67%;" />

```java
public static void getRuntime() throws IOException {
    //当前虚拟机运行环境
    //1.总内存大小，单位byte
    System.out.println(Runtime.getRuntime().maxMemory()/ 1024/ 1024);
    //2.获取CPU线程数
    System.out.println(Runtime.getRuntime().availableProcessors());
    //3.获取已经使用内存大小单位byte
    System.out.println(Runtime.getRuntime().totalMemory()/ 1024/ 1024);
    //4.剩余内存大小
    System.out.println(Runtime.getRuntime().freeMemory()/1024 /1024);
    //5.运行CMD命令
    //示例：关机：shutdown 加上参数才能执行
    // -s 默认一分钟关机，-s -t 指定关机时间，单位秒
    // -a取消关机操作，-r 关机并重启
    Runtime.getRuntime().exec("shutdown -s -t 36000");
    // 取消关机
    Runtime.getRuntime().exec("shutdown -a");
    // 打开记事本
    Runtime.getRuntime().exec("notepad");
    // exit停止虚拟机，参数是status
    // Runtime.getRuntime().exit(1);
}
```



## StopWatch统计耗时

这个是Spring自带的，无需引入依赖

有时在做开发的时候需要记录每个任务执行时间，或者记录一段代码执行时间，最简单的方法就是打印当前时间与执行完时间的差值，然后这样如果执行大量测试的话就很麻烦，并且不直观，如果想对执行的时间做进一步控制，则需要在程序中很多地方修改，目前spring-framework提供了一个StopWatch类可以做类似任务执行时间控制，也就是封装了一个对开始时间，结束时间记录工具

### 简单使用

```java
@Test
public void test1() throws Exception {
    StopWatch sw = new StopWatch();
    // 计时可以取名
    sw.start("任务一");
    // 可以在这里添加一些业务，比如调用一些服务，访问数据库等等
    Thread.sleep(1000);
    sw.stop();
    System.out.println(sw.prettyPrint());
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207291010922.png" alt="image-20220729101036799" style="zoom:67%;" />

### 统计多个任务耗时

```java
@Test
public void test1() throws Exception {
    StopWatch sw = new StopWatch();
    sw.start("A");
    Thread.sleep(500);
    sw.stop();
    sw.start("B");
    Thread.sleep(300);
    sw.stop();
    sw.start("C");
    Thread.sleep(200);
    sw.stop();
    System.out.println(sw.prettyPrint());
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207291013715.png" alt="image-20220729101302608" style="zoom:67%;" />

### 不同的打印结果

- `getTotalTimeSeconds()` 获取总耗时秒，同时也有获取毫秒的方法
- `prettyPrint()` 优雅的格式打印结果，表格形式
- `shortSummary()` 返回简短的总耗时描述
- `getTaskCount()` 返回统计时间任务的数量
- `getLastTaskInfo().getTaskName()` 返回最后一个任务TaskInfo对象的名称



# BigDecimal

## 为什么用BigDecimal

> 《阿里巴巴 Java 开发手册》中提到：“为了避免精度丢失，可以使用 BigDecimal来进行浮点数的运算”

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041559575.png" alt="image-20230104155954408" style="zoom:67%;" />

**为什么浮点数 `float` 或 `double` 运算的时候会有精度丢失的风险呢？**

> 这个和计算机保存浮点数的机制有很大关系。我们知道计算机是二进制的，而且计算机在表示一个数字时，宽度是有限的，无限循环的小数存储在计算机时，只能被截断，所以就会导致小数精度发生损失的情况。这也就是解释了为什么浮点数没有办法用二进制精确表示。就比如说十进制下的 0.2 就没办法精确转换成二进制小数：

```java
// 0.2 转换为二进制数的过程为，不断乘以 2，直到不存在小数为止，
// 在这个计算过程中，得到的整数部分从上到下排列就是二进制的结果。
0.2 * 2 = 0.4 -> 0
0.4 * 2 = 0.8 -> 0
0.8 * 2 = 1.6 -> 1
0.6 * 2 = 1.2 -> 1
0.2 * 2 = 0.4 -> 0（发生循环）
...
```

## 使用步骤

```java
// 两种创建方式，一种是传入字符串数字，一种是使用valueOf
BigDecimal a = new BigDecimal("1.0");
BigDecimal b = BigDecimal.valueOf(0.9);
BigDecimal c = new BigDecimal("0.8");

BigDecimal x = a.subtract(b);
BigDecimal y = b.subtract(c);

System.out.println(x); /* 0.1 */
System.out.println(y); /* 0.1 */
System.out.println(Objects.equals(x, y)); /* true */
```

> 注意事项：BigDecimal是一定要进行精度运算的，如果结果是无限循环，则使用它或出现异常。
>

JDK早已为我们考虑到了浮点数的计算精度问题，因此提供了专用于高精度数值计算的**大数类**来方便我们使用。

可以看到，常用的`BigInteger` 和 `BigDecimal`就是处理高精度数值计算的利器。

```java
BigDecimal num3 = new BigDecimal( Double.toString( 1.0f ) );
BigDecimal num4 = new BigDecimal( Double.toString( 0.99999999f ) );
System.out.println( num3 == num4 );  // 打印 false

BigDecimal num1 = new BigDecimal( Double.toString( 0.2 ) );
BigDecimal num2 = new BigDecimal( Double.toString( 0.7 ) );

// 加
System.out.println( num1.add( num2 ) );  // 打印：0.9

// 减
System.out.println( num2.subtract( num1 ) );  // 打印：0.5

// 乘
System.out.println( num1.multiply( num2 ) );  // 打印：0.14

// 除
System.out.println( num2.divide( num1 ) );  // 打印：3.5
```

```java
//再次举例
BigDecimal a = BigDecimal.valueOf(1.1123);
BigDecimal b = BigDecimal.valueOf(1.23123);
System.out.println(a.add(b)); //2.34353
System.out.println(a.multiply(b));//1.369497129
```

当然了，像`BigInteger` 和 `BigDecimal`这种大数类的运算效率肯定是不如原生类型效率高，代价还是比较昂贵的，是否选用需要根据实际场景来评估。

## 常见方法

### 加减乘除

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302031558827.png" alt="image-20230203155857707" style="zoom:80%;" />

```java
BigDecimal a = new BigDecimal("1.0");
BigDecimal b = new BigDecimal("0.9");
System.out.println(a.add(b));// 1.9
System.out.println(a.subtract(b));// 0.1
System.out.println(a.multiply(b));// 0.90
System.out.println(a.divide(b));// 无法除尽，抛出 ArithmeticException 异常
System.out.println(a.divide(b, 2, RoundingMode.HALF_UP));// 1.11
```

这里需要注意的是，在我们使用 `divide` 方法的时候尽量使用 3 个参数版本，并且`RoundingMode` 不要选择 `UNNECESSARY`，否则很可能会遇到 `ArithmeticException`（无法除尽出现无限循环小数的时候），其中 `scale` 表示要保留几位小数，`roundingMode` 代表保留规则。

```java
public BigDecimal divide(BigDecimal divisor, int scale, RoundingMode roundingMode) {
    return divide(divisor, scale, roundingMode.oldMode);
}
```

保留规则非常多，这里列举几种:

```java
public enum RoundingMode {
   // 2.5 -> 3 , 1.6 -> 2
   // -1.6 -> -2 , -2.5 -> -3
    UP(BigDecimal.ROUND_UP),
   // 2.5 -> 2 , 1.6 -> 1
   // -1.6 -> -1 , -2.5 -> -2
    DOWN(BigDecimal.ROUND_DOWN),
    // 2.5 -> 3 , 1.6 -> 2
   // -1.6 -> -1 , -2.5 -> -2
    CEILING(BigDecimal.ROUND_CEILING),
    // 2.5 -> 2 , 1.6 -> 1
   // -1.6 -> -2 , -2.5 -> -3
    FLOOR(BigDecimal.ROUND_FLOOR),
    // 2.5 -> 3 , 1.6 -> 2
   // -1.6 -> -2 , -2.5 -> -3
    HALF_UP(BigDecimal.ROUND_HALF_UP),
   //......
}
```

### 大小比较

`a.compareTo(b)` : 返回 -1 表示 `a` 小于 `b`，0 表示 `a` 等于 `b` ， 1 表示 `a` 大于 `b`。

```java
BigDecimal a = new BigDecimal("1.0");
BigDecimal b = new BigDecimal("0.9");
System.out.println(a.compareTo(b));// 1
```

举例：a大于等于b

```java
new bigdemica(a).compareTo(new bigdemical(b)) >= 0
```

### 保留几位小数

通过 `setScale`方法设置保留几位小数以及保留规则。保留规则有挺多种，不需要记，IDEA 会提示。

```java
BigDecimal m = new BigDecimal("1.255433");
BigDecimal n = m.setScale(3,RoundingMode.HALF_DOWN);
System.out.println(n);// 1.255
```

## 注意事项

> 注意：我们在使用 BigDecimal时，为了防止精度丢失，推荐使用它的BigDecimal(String val)构造方法或者**BigDecimal.valueOf(double val)** 静态方法来创建对象。

《阿里巴巴 Java 开发手册》对这部分内容也有提到，如下图所示。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302031559865.png" alt="image-20230203155935740" style="zoom:80%;" />

## BigDecimal典型问题

### 1 浮点数的舍入和格式化该如何选择？

我们首先来看看使用String.format的格式化舍入，会有什么结果，我们知道浮点数有double和float两种，下边我们就用这两种来举例子：

```java
double num1 = 3.35;
float num2 = 3.35f;
System.out.println(String.format("%.1f", num1));
System.out.println(String.format("%.1f", num2));
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207311506867.png" alt="image-20220731150652745" style="zoom:67%;" />

得到的结果似乎与我们的预期有出入，其实这个问题也很好解释，double和float的精度是不同的，double的3.35相当于3.350000000000000088817841970012523233890533447265625，而float的3.35相当于3.349999904632568359375，String.format才有的又是四舍五入的方式舍入，所以精度问题和舍入方式就导致了运算结果与我们预期不同。

Formatter类中默认使用的是HALF_UP的舍入方式，如果我们需要使用其他的舍入方式来格式化，可以手动设置。

到这里我们就知道通过String.format的方式来格式化这条路坑有点多，所以，**「浮点数的字符串格式化还得要使用BigDecimal来进行」**。

来，上代码，测试一下究竟是不是那么回事：

```java
BigDecimal num1 = new BigDecimal("3.35");
//小数点后1位，向下舍入
BigDecimal num2 = num1.setScale(1, BigDecimal.ROUND_DOWN);
System.out.println(num2); //3.3
//小数点后1位，四舍五入
BigDecimal num3 = num1.setScale(1, BigDecimal.ROUND_HALF_UP);
System.out.println(num3); //3.4
```

这次得到的结果与我们预期一致。

### 2 等值比较

```java
BigDecimal bd1 = new BigDecimal("1.0");
BigDecimal bd2 = new BigDecimal("1.00");
System.out.println(bd1.equals(bd2));
System.out.println(bd1.compareTo(bd2));
```

控制台的输出将会是：

```apl
false
0
```

究其原因是，`BigDecimal`中`equals`方法的实现会比较两个数字的精度，而`compareTo`方法则只会比较数值的大小。实际的使用中，我们常常是只希望比较两个BigDecimal的value，这里就要注意，要使用compareTo方法：

```java
System.out.println(new BigDecimal("1").compareTo(new BigDecimal("1.0")))
// 结果：true
```

### 3 BigDecimal并不代表无限精度

先看这段代码

```java
BigDecimal a = new BigDecimal("1.0");
BigDecimal b = new BigDecimal("3.0");
a.divide(b) // results in the following exception.
```

结果会抛出异常：

```apl
java.lang.ArithmeticException: Non-terminating decimal expansion; no exact representable decimal result.
```

关于这个异常，Oracle的官方文档有具体说明

> 大意是，如果除法的商的结果是一个无限小数但是我们期望返回精确的结果，那程序就会抛出异常。回到我们的这个例子，我们需要告诉`JVM`我们不需要返回精确的结果就好了

```java
BigDecimal a = new BigDecimal("1.0");
BigDecimal b = new BigDecimal("3.0");
a.divide(b, 2, RoundingMode.HALF_UP)// 0.33
```

### 4 BigDecimal转回String要小心

```java
BigDecimal d = BigDecimal.valueOf(12334535345456700.12345634534534578901);
String out = d.toString(); // Or perform any formatting that needs to be done
System.out.println(out); // 1.23345353454567E+16
```

可以看到结果已经被转换成了科学计数法，可能这个并不是预期的结果`BigDecimal`有三个方法可以转为相应的字符串类型，切记不要用错：

```java
// 有必要时使用科学计数法
String toString();    
// 不使用科学计数法
String toPlainString();   
// 工程计算中经常使用的记录数字的方法，与科学计数法类似，但要求10的幂必须是3的倍数
String toEngineeringString();  
```

### 5 执行顺序不能调换（乘法交换律失效）

乘法满足交换律是一个常识，但是在计算机的世界里，会出现不满足乘法交换律的情况

```java
BigDecimal a = BigDecimal.valueOf(1.0);
BigDecimal b = BigDecimal.valueOf(3.0);
BigDecimal c = BigDecimal.valueOf(3.0);
// 先除后乘，推荐先乘后除
System.out.println(a.divide(b, 2, RoundingMode.HALF_UP).multiply(c)); // 0.990
System.out.println(a.multiply(c).divide(b, 2, RoundingMode.HALF_UP)); // 1.00
```

别小看这这0.01的差别，在汇金领域，会产生非常大的金额差异。

### 6 new BigDecimal()还是BigDecimal.valueOf()？

先看下面这段代码

```java
BigDecimal bd1 = new BigDecimal(0.01);
BigDecimal bd2 = BigDecimal.valueOf(0.01);
System.out.println("bd1 = " + bd1);
System.out.println("bd2 = " + bd2);
```

输出到控制台的结果是：

```apl
bd1 = 0.01000000000000000020816681711721685132943093776702880859375
bd2 = 0.01
```

造成这种差异的原因是0.1这个数字计算机是无法精确表示的，送给`BigDecimal`的时候就已经丢精度了，而`BigDecimal#valueOf`的实现却完全不同

```java
public static BigDecimal valueOf(double val) {
    // Reminder: a zero double returns '0.0', so we cannot fastpath
    // to use the constant ZERO.  This might be important enough to
    // justify a factory approach, a cache, or a few private
    // constants, later.
    return new BigDecimal(Double.toString(val));
}
```

它使用了浮点数相应的字符串来构造`BigDecimal`对象，因此避免了精度问题。所以大家要尽量要使用字符串而不是浮点数去构造`BigDecimal`对象，如果实在不行，就使用`BigDecimal#valueOf()`方法吧。

## moneta最佳实践

关于金额计算，很多业务团队会基于`BigDecimal`再封装一个`Money`类，其实我们直接可以用一个半官方的`Money`类：JSR 354 ,虽然没能在`Java 9`中成为`Java`标准，很有可能集成到后续的`Java`版本中成为官方库。

### 1 maven坐标

```java
<dependency>
    <groupId>org.javamoney</groupId>
    <artifactId>moneta</artifactId>
    <version>1.1</version>
</dependency>
```

### 2 新建Money类

```java
CurrencyUnit cny = Monetary.getCurrency("CNY");
Money money = Money.of(1.0, cny); 
// 或者 Money money = Money.of(1.0, "CNY");
//System.out.println(money);
```

### 3 金额运算

```java
CurrencyUnit cny = Monetary.getCurrency("CNY");
Money oneYuan = Money.of(1.0, cny);
Money threeYuan = oneYuan.add(Money.of(2.0, "CNY")); //CNY 3
Money tenYuan = oneYuan.multiply(10); // CNY 10
Money fiveFen = oneYuan.divide(2); //CNY 0.5
```

### 4 比较相等

```java
Money fiveFen = Money.of(0.5, "CNY"); //CNY 0.5
Money anotherFiveFen = Money.of(0.50, "CNY"); // CNY 0.50
System.out.println(fiveFen.equals(anotherFiveFen)); // true
```

可以看到，这个类对金额做了显性的抽象，增加了金额的单位，也避免了直接使用`BigDecimal`的一些坑。

## BigDecimal 工具类

> - float和double类型，主要是为了科学计算和工程计算而设计的，之所以执行二进制浮点运算，是为了在广泛的数值范围上提供较为精确的快速近和计算。
> - 并没有提供完全精确的结果，所以不应该被用于精确的结果的场合。
> - 当浮点数达到一定大的数，就会自动使用科学计数法，这样的表示只是近似真实数而不等于真实数。
> - 当十进制小数位转换二进制的时候也会出现无限循环或者超过浮点数尾数的长度。

所以，在涉及到精度计算的过程中，我们尽量使用String类型来进行转换

```java
import java.math.BigDecimal;

public class BigDecimalUtils {
    public static BigDecimal doubleAdd(double v1, double v2) {
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));
        return b1.add(b2);
    }
    public static BigDecimal floatAdd(float v1, float v2) {
        BigDecimal b1 = new BigDecimal(Float.toString(v1));
        BigDecimal b2 = new BigDecimal(Float.toString(v2));
        return b1.add(b2);
    }
    public static BigDecimal doubleSub(double v1, double v2) {
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));
        return b1.subtract(b2);
    }
    public static BigDecimal floatSub(float v1, float v2) {
        BigDecimal b1 = new BigDecimal(Float.toString(v1));
        BigDecimal b2 = new BigDecimal(Float.toString(v2));
        return b1.subtract(b2);
    }

    public static BigDecimal doubleMul(double v1, double v2) {
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));
        return b1.multiply(b2);
    }
    public static BigDecimal floatMul(float v1, float v2) {
        BigDecimal b1 = new BigDecimal(Float.toString(v1));
        BigDecimal b2 = new BigDecimal(Float.toString(v2));
        return b1.multiply(b2);
    }

    public static BigDecimal doubleDiv(double v1, double v2) {
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));
        // 保留小数点后两位 ROUND_HALF_UP = 四舍五入
        return b1.divide(b2, 2, BigDecimal.ROUND_HALF_UP);
    }
    public static BigDecimal floatDiv(float v1, float v2) {
        BigDecimal b1 = new BigDecimal(Float.toString(v1));
        BigDecimal b2 = new BigDecimal(Float.toString(v2));
        // 保留小数点后两位 ROUND_HALF_UP = 四舍五入
        return b1.divide(b2, 2, BigDecimal.ROUND_HALF_UP);
    }
    /**
     * 比较v1 v2大小
     * @param v1
     * @param v2
     * @return v1>v2 return 1  v1=v2 return 0 v1<v2 return -1
     */
    public static int doubleCompareTo(double v1, double v2) {
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));
        return  b1.compareTo(b2);
    }
    public static int floatCompareTo(float v1, float v2) {
        BigDecimal b1 = new BigDecimal(Float.toString(v1));
        BigDecimal b2 = new BigDecimal(Float.toString(v2));
        return  b1.compareTo(b2);
    }
}
```



# 正则表达式 ⭐

正则表达式可以用一些规定的字符来制定规则，并用来校验数据格式的合法性。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206060955349.png" alt="image-20220606095524278" style="zoom:80%;" />

## 正则表达式初体验

> - 需求：假如现在要求校验一个qq号码是否正确，6位及20位之内，必须全部是数字 。
> - 先使用目前所学知识完成校验需求；然后体验一下正则表达式检验。

### 使用正常方法

```java
public static boolean checkQQ(String qq){
    // 1、判断qq号码的长度是否满足要求
    if(qq == null || qq.length() < 6 || qq.length() > 20 ) {
        return false;
    }

    // 2、判断qq中是否全部是数字，不是返回false
    //  251425a87
    for (int i = 0; i < qq.length(); i++) {
        // 获取每位字符
        char ch = qq.charAt(i);
        // 判断这个字符是否不是数字，不是数字直接返回false
        if(ch < '0' || ch > '9') {
            return false;
        }
    }

    return true; // 肯定合法了！
}
```

### 使用正则

```java
public static boolean checkQQ2(String qq){
    // 第一个\表示转译，第二个\d表示数字，第三个{6,20}表示6-20位
    return qq != null && qq.matches("\\d{6,20}");
}
```

### 测试

```java
// 需求：校验qq号码，必须全部数字 6 - 20位
System.out.println(checkQQ("251425998"));
System.out.println(checkQQ("2514259a98"));
System.out.println(checkQQ(null));
System.out.println(checkQQ("2344"));

System.out.println("-------------------------");
// 正则表达式的初体验：
System.out.println(checkQQ2("251425998"));
System.out.println(checkQQ2("2514259a98"));
System.out.println(checkQQ2(null));
System.out.println(checkQQ2("2344"));
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206061015493.png" alt="image-20220606101551427" style="zoom:80%;" />



## 正则表达式匹配规则

### 匹配规则

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206060956321.png" alt="image-20220606095658246" style="zoom:80%;" />

### Java匹配语法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206060958257.png" alt="image-20220606095822190" style="zoom:80%;" />

### 案例演示

#### 只能是 a  b  c

```java
public static void t1() {
    System.out.println("a".matches("[abc]")); // true
    System.out.println("z".matches("[abc]")); // false
}
```

#### 不能出现a  b  c

```java
//以上正则匹配只能校验单个字符。
public static void t2() {
    System.out.println("a".matches("[^abc]")); // false
    System.out.println("z".matches("[^abc]")); // true
    System.out.println("---------------------------------");
    System.out.println("a".matches("\\d")); // false
    System.out.println("3".matches("\\d")); // true
    System.out.println("333".matches("\\d")); // false
    System.out.println("z".matches("\\w")); // true
    System.out.println("2".matches("\\w")); // true
    System.out.println("21".matches("\\w")); // false
    System.out.println("你".matches("\\w")); //false
    System.out.println("你".matches("\\W")); // true
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206061026730.png" alt="image-20220606102642660" style="zoom:80%;" />

#### 校验密码

```java
//必须是数字 字母 下划线 至少 6位
public static void t3() {
    System.out.println("2442fsfsf".matches("\\w{6,}"));
    System.out.println("244f".matches("\\w{6,}"));
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206061028425.png" alt="image-20220606102801344" style="zoom:80%;" />

#### 验证码 必须是数字和字符必须是4位

```java
public static void t4() {
    System.out.println("23dF".matches("[a-zA-Z0-9]{4}"));
    System.out.println("23_F".matches("[a-zA-Z0-9]{4}"));
    System.out.println("23dF".matches("[\\w&&[^_]]{4}"));
    System.out.println("23_F".matches("[\\w&&[^_]]{4}"));
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206061028349.png" alt="image-20220606102843268" style="zoom:80%;" />



## 校验邮箱、手机号、电话

①请编写程序模拟用户输入手机号码、验证格式正确，并给出提示，直到格式输入正确为止。

②请编写程序模拟用户输入邮箱号码、验证格式正确，并给出提示，直到格式输入正确为止。

③请编写程序模拟用户输入电话号码、验证格式正确，并给出提示，直到格式输入正确为止。

### 校验手机号

```java
public static void checkPhone(){
    Scanner sc = new Scanner(System.in);
    while (true) {
        System.out.println("请您输入您的注册手机号码：");
        String phone = sc.next();
        // 判断手机号码的格式是否正确
        if(phone.matches("1[3-9]\\d{9}")){
            System.out.println("手机号码格式正确，注册完成！");
            break;
        }else {
            System.out.println("格式有误！");
        }
    }
}
```

### 校验邮箱

```java
public static void checkEmail(){
    Scanner sc = new Scanner(System.in);
    while (true) {
        System.out.println("请您输入您的注册邮箱：");
        String email = sc.next();
        // 判断邮箱格式是否正确   3268847878@qq.com
        // 判断邮箱格式是否正确   3268847dsda878@163.com
        // 判断邮箱格式是否正确   3268847dsda878@pci.com.cn
        if(email.matches("\\w{1,30}@[a-zA-Z0-9]{2,20}(\\.[a-zA-Z0-9]{2,20}){1,2}")){
            System.out.println("邮箱格式正确，注册完成！");
            break;
        }else {
            System.out.println("格式有误！");
        }
    }
}
```

### 校验电话号码

```java
public static void checkTel(){
    Scanner sc = new Scanner(System.in);
    while (true) {
        System.out.println("请您输入您的电话号码：");
        String tel = sc.next();
        // 判断邮箱格式是否正确   027-3572457  0273572457
        if(tel.matches("0\\d{2,6}-?\\d{5,20}")){
            System.out.println("格式正确，注册完成！");
            break;
        }else {
            System.out.println("格式有误！");
        }
    }
}
```



## 正则表达式在字符串方法中的应用

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206061038779.png" alt="image-20220606103812706" style="zoom:80%;" />

```java
public static void s1() {
    String names = "小路dhd_fhdf342蓉儿43fdffdfbjdfaf小何";
    //按照字母数字下划线分割
    String[] arrs = names.split("\\w+");
    for (String arr : arrs) {
        System.out.println(arr);
    }
    System.out.println("---------------------------------");
    //将字母数字下划线替换成空格
    String names2 = names.replaceAll("\\w+", "  ");
    System.out.println(names2);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206061043970.png" alt="image-20220606104324902" style="zoom:80%;" />



## 正则表达式爬取信息(了解)

```java
public static void s1() {
    String rs = "来黑马程序学习Java,电话020-43422424，或者联系邮箱" +
            "itcast@itcast.cn,电话18762832633，0203232323" +
            "邮箱bozai@itcast.cn，400-100-3233 ，4001003232";

    // 需求：从上面的内容中爬取出 电话号码和邮箱。
    // 1、定义爬取规则，字符串形式
    // 括号表示分组,第一个括号表示匹配邮箱，|表示或，第二个括号表示匹配电话号码，正则就是上面电话邮箱
    String regex = "(\\w{1,30}@[a-zA-Z0-9]{2,20}(\\.[a-zA-Z0-9]{2,20}){1,2})|(1[3-9]\\d{9})" +
            "|(0\\d{2,6}-?\\d{5,20})|(400-?\\d{3,9}-?\\d{3,9})";

    // 2、把这个爬取规则编译成匹配对象。
    Pattern pattern = Pattern.compile(regex);

    // 3、得到一个内容匹配器对象
    Matcher matcher = pattern.matcher(rs);

    // 4、开始找了
    while (matcher.find()) {
        String rs1 = matcher.group();
        System.out.println(rs1);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206061048433.png" alt="image-20220606104826366" style="zoom:80%;" />



# 异常

## 什么是异常

> **异常是指阻止当前方法或作用域继续执行的问题**。比如你**读取的文件不存在，数组越界，日期格式化异常，进行除法时，除数为0**等都会导致异常。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202206011745786.png" alt="image-20220601174508721" style="zoom:80%;" />

## 异常体系结构⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301061928362.png" alt="image-20230106192810238" style="zoom:67%;" />

> ERROR表示编译时或者系统错误，如虚拟机相关的错误，OutOfMemoryError等，error是无法处理的。Exception代码异常，Java程序员关心的基类型通常是Exception。它能被程序本身可以处理，这也是它跟Error的区别。它可以分为RuntimeException（运行时异常）和CheckedException（可检查的异常）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202206011746054.png" alt="image-20220601174625957" style="zoom: 80%;" />

### 编译时异常和运行时异常

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301062119919.png" alt="image-20230106211939791" style="zoom:67%;" />

### 常见的运行时异常

> **直接继承自RuntimeException或者其子类，**编译阶段不会报错，运行时可能出现的错误。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301062121179.png" alt="image-20230106212141025" style="zoom:67%;" />

```java
public class ExceptionDemo {
    public static void main(String[] args) {
        System.out.println("程序开始。。。。。。");
        // 1.数组索引越界异常: ArrayIndexOutOfBoundsException
        int[] arr = {1, 2, 3};
        System.out.println(arr[2]);
        // System.out.println(arr[3]); // 运行出错，程序终止

        // 2.空指针异常 : NullPointerException。直接输出没有问题。
        // 但是调用空指针的变量的功能就会报错！！ 
        String name = null;
        System.out.println(name); // null
        // System.out.println(name.length()); // 运行出错，程序终止

        // 3.类型转换异常：ClassCastException。 
        Object o = 23;
        // String s = (String) o;  // 运行出错，程序终止

        // 5.数学操作异常：ArithmeticException。
        //int c = 10 / 0;

        // 6.数字转换异常： NumberFormatException
        //String number = "23";
        String number = "23aabbc";
        Integer it = Integer.valueOf(number); // 运行出错，程序终止
        System.out.println(it + 1);
        
        System.out.println("程序结束。。。。。");
    }
}
```

### 常见的编译时异常

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301062124613.png" alt="image-20230106212426422" style="zoom: 50%;" />

```java
public class ExceptionDemo {
    public static void main(String[] args) throws ParseException {
        String date = "2015-01-12 10:23:21";
        // 创建一个简单日期格式化类：
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM-dd HH:mm:ss");
        // 解析字符串时间成为日期对象
        Date d = sdf.parse(date);
        System.out.println(d);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301062128663.png" alt="image-20230106212823564" style="zoom:67%;" />

### 异常关键字

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202206011749260.png" alt="image-20220601174905195" style="zoom:80%;" />

## 异常处理流程

> 异常一旦出现，会自动创建异常对象，最终抛出给虚拟机，虚拟机只要收到异常，就直接输出异常信息，干掉程序！！默认的异常处理机制并不好，一旦真的出现异常，程序立即死亡！

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301062131569.png" alt="image-20230106213142454" style="zoom:50%;" />

```java
public class ExceptionDemo {
    public static void main(String[] args) {
        System.out.println("程序开始。。。。。。。。。。");
        chu(10, 0);
        System.out.println("程序结束。。。。。。。。。。");
    }

    public static void chu(int a , int b){
        System.out.println(a);
        System.out.println(b);
        int c = a / b;
        System.out.println(c);
    }
}
```

![image-20230106213327101](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301062133207.png)

## 异常处理机制(重点)

编译时异常是编译阶段就出错的，所以必须处理，否则代码根本无法通过

> - 出现异常直接抛出去给调用者，调用者也继续抛出去。
>
> - 出现异常自己捕获处理，不麻烦别人。
> - 两者结合，出现异常直接抛出去给调用者，调用者捕获处理。

### try...catch

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301062138875.png" alt="image-20230106213824750" style="zoom: 67%;" />

```java
public class ExceptionDemo02 {
    public static void main(String[] args) {
        System.out.println("程序开始。。。。");
        parseTime("2011-11-11 11:11:11");
        System.out.println("程序结束。。。。");
    }

    public static void parseTime(String date) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM-dd HH:mm:ss");
            Date d = sdf.parse(date);
            System.out.println(d);

            InputStream is = new FileInputStream("E:/meinv.jpg");
        } catch (Exception e) {
            e.printStackTrace(); // 打印异常栈信息
        }
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301062142379.png" alt="image-20230106214223269" style="zoom:67%;" />

### throws

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301062137791.png" alt="image-20230106213748666" style="zoom: 60%;" />

```java
public class ExceptionDemo01 {
    public static void main(String[] args) throws Exception {
        System.out.println("程序开始。。。。。");
        parseTime("2011-11-11 11:11:11");
        System.out.println("程序结束。。。。。");
    }

    public static void parseTime(String date) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date d = sdf.parse(date);
        System.out.println(d);
        InputStream is = new FileInputStream("E:/meinv.jpg");
    }

}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301062141755.png" alt="image-20230106214124629" style="zoom:67%;" />

### 前两者结合⭐

> 在出现异常的地方把异常一层一层的抛出给最外层调用者，最外层调用者集中捕获处理！！（规范做法）
>
> 这种方案最外层调用者可以知道底层执行的情况，同时程序在出现异常后也不会立即死亡，这是理论上最好方案

```java
public class ExceptionDemo03 {
    public static void main(String[] args) {
        System.out.println("程序开始。。。。");
        try {
            parseTime("2011-11-11 11:11:11");
            System.out.println("功能操作成功~~~");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("功能操作失败~~~");
        }
        System.out.println("程序结束。。。。");
    }

    public static void parseTime(String date) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy、MM-dd HH:mm:ss");
        Date d = sdf.parse(date);
        System.out.println(d);

        InputStream is = new FileInputStream("D:/meinv.jpg");
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301062143405.png" alt="image-20230106214306284" style="zoom:67%;" />



## 异常类的几个重要方法

#### getMessage

getMessage会返回Throwable的 `detailMessage`属性，而 `detailMessage`就表示发生异常的详细消息描述。

举个例子， `FileNotFoundException`异常发生时，这个 `detailMessage`就包含这个找不到文件的名字。

#### getLocalizedMessage

throwable的本地化描述。子类可以重写此方法，以生成特定于语言环境的消息。对于不覆盖此方法的子类，默认实现返回与相同的结果 getMessage()。

#### getCause

返回此可抛出事件的原因，或者，如果原因不存在或未知，返回null。

#### printStackTrace

该方法将堆栈跟踪信息打印到标准错误流。

输出的第一行，包含此对象toString()方法的结果。剩余的行表示，先前被方法fillInStackTrace()记录的数据。如下例子:

## 异常处理使代码更稳健的案例

> **需求**：键盘录入一个合理的价格为止（必须是数值）。**分析**：定义一个死循环，让用户不断的输入价格。

```java
// 需求：需要输入一个合法的价格为止 要求价格大于 0
public class Test2 {
    public static void main(String[] args) {
        Scanner sc  = new Scanner(System.in);
        while (true) {
            try {
                System.out.println("请您输入合法的价格：");
                String priceStr = sc.nextLine();
                // 转换成double类型的价格
                double price = Double.valueOf(priceStr);
                // 判断价格是否大于 0
                if(price > 0) {
                    System.out.println("定价：" + price);
                    break;
                }else {
                    System.out.println("价格必须是正数~~~");
                }
            } catch (Exception e) {
                System.out.println("用户输入的数据有毛病，请您输入合法的数值，建议为正数~~");
            }
        }
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301062154198.png" alt="image-20230106215420084" style="zoom:67%;" />

## 自定义异常⭐

### 为什么需要自定义异常

> - Java提供的异常体系不可能预见所有的错误。
> - 业务开发中，使用自定义异常，可以让项目代码更加规范，也便于管理。
> - 可以使用异常的机制管理业务问题，如提醒程序员注意。
> - 同时一旦出现bug，可以用异常的形式清晰的指出出错的地方。

### 自定义异常的分类

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301062148133.png" alt="image-20230106214827013" style="zoom: 67%;" />

### 自定义异常示例

#### 年龄检查异常

首先创建一个类继承Exception或者是RuntimeException(推荐)，然后右键生成两个构造方法

```java
public class ItheimaAgeIlleagalException extends Exception{
    public ItheimaAgeIlleagalException() {
    }

    public ItheimaAgeIlleagalException(String message) {
        super(message);
    }
}
```

```java
public class ItheimaAgeIlleagalRuntimeException extends RuntimeException{
    public ItheimaAgeIlleagalRuntimeException() {
    }
    
    public ItheimaAgeIlleagalRuntimeException(String message) {
        super(message);
    }
}
```

这样就可以直接调用了.遇到异常抛出即可

```java
public class ExceptionDemo {
    public static void main(String[] args) {
        try {
            //checkAge2(-23);
            checkAge(-100);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void checkAge2(int age)  {
        if(age < 0 || age > 200){
            // 抛出去一个异常对象给调用者
            // throw ：在方法内部直接创建一个异常对象，并从此点抛出
            // throws : 用在方法申明上的，抛出方法内部的异常
            throw new ItheimaAgeIlleagalRuntimeException(age + " is illeagal!");
        }else {
            System.out.println("年龄合法：推荐商品给其购买~~");
        }
    }

    public static void checkAge(int age) throws ItheimaAgeIlleagalException {
        if(age < 0 || age > 200){
            // 抛出去一个异常对象给调用者
            // throw ：在方法内部直接创建一个异常对象，并从此点抛出
            // throws : 用在方法申明上的，抛出方法内部的异常
            throw new ItheimaAgeIlleagalException(age + " is illeagal!");
        }else {
            System.out.println("年龄合法：推荐商品给其购买~~");
        }
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202206011755000.png" alt="image-20220601175520930" style="zoom:80%;" />

#### 带错误码和信息的异常

下面是我司自定义异常类的一个简单demo，生成有参无参构造方法，get、set方法

```java
public class BizException extends Exception {    
    //错误信息    
    private String message;    
    //错误码    
    private String errorCode;   
    
    public BizException() {    
    }    
    public BizException(String message, String errorCode) {        
        this.message = message;        
        this.errorCode = errorCode;    
    }    
    @Override    
    public String getMessage() {        
        return message;    
    }    
    public void setMessage(String message) {        
        this.message = message;    
    }    
    public String getErrorCode() {        
        return errorCode;    
    }    
    public void setErrorCode(String errorCode) {        
        this.errorCode = errorCode;    
    }
}
```

**跑个main方测试一下**

```java
public class TestBizException {    
    public static void testBizException() throws BizException {     
            System.out.println("throwing BizException from testBizException()");
            throw new BizException("100","哥，我错了");                                 
     }    
    public static void main(String[] args) {        
        try {            
            testBizException();        
        } catch (BizException e) {            
            System.out.println("自己定义的异常");            
            e.printStackTrace();        
        }    
    }
}
```

**运行结果：**

```java
exception.BizException: 100
throwing BizException from testBizException()
自己定义的异常    
    at exception.TestBizException.testBizException(TestBizException.java:7)    
    at exception.TestBizException.main(TestBizException.java:12)
```

## try-with-resources

try-with-resources，是Java7提供的一个新功能，它用于自动资源管理。

- 资源是指在程序用完了之后必须要关闭的对象。
- try-with-resources保证了每个声明了的资源在语句结束的时候会被关闭
- 什么样的对象才能当做资源使用呢？只要实现了java.lang.AutoCloseable接口或者java.io.Closeable接口的对象，都OK。

**在 `try-with-resources`出现之前**

```java
try{    
    //open resources like File, Database connection, Sockets etc
} catch (FileNotFoundException e) {    
    // Exception handling like FileNotFoundException, IOException etc
}finally{    
    // close resources
}
```

**Java7， `try-with-resources`出现之后，使用资源实现**

```java
try(// open resources here){    
    // use resources
} catch (FileNotFoundException e) {    
    // exception handling
}
// resources are closed as soon as try-catch block is executed.
```

**Java7使用资源demo**

```java
public class Java7TryResourceTest {    
    public static void main(String[] args) {        
        try (BufferedReader br = new 
             BufferedReader(new FileReader("C:/jaywei.txt"))) {            
            System.out.println(br.readLine());        
        } catch (IOException e) {           
            e.printStackTrace();        
        }    
    }
}
```

**使用了 `try-with-resources`的好处**

- 代码更加优雅，行数更少。
- 资源自动管理，不用担心内存泄漏问题。

## try-catch-finally注意事项

在 Java 语言中 try-catch-finally 看似简单，一副人畜无害的样子，但想要真正的“掌控”它，却并不是一件容易的事。别的不说，咱就拿 fianlly 来说吧，别看它的功能单一，但使用起来却“暗藏杀机”，若您不信，咱来看下面的这几个例子...

### 坑1：finally中使用return

若在 finally 中使用 return，那么即使 try-catch 中有 return 操作，也不会立马返回结果，而是再执行完 finally 中的语句再返回。此时问题就产生了：**如果 finally 中存在 return 语句，则会直接返回 finally 中的结果，从而无情的丢弃了 try 中的返回值。**

#### ① 反例代码

```java
public static void main(String[] args) throws FileNotFoundException {
    System.out.println("执行结果:" + test());
}

private static int test() {
    int num = 0;
    try {
        // num=1,此处不返回
        num++;
        return num;
    } catch (Exception e) {
        // do something
    } finally {
        // num=2,返回此值
        num++;
        return num;
    }
}
```

以上代码的执行结果如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207021112790.png" alt="image-20220702111210688" style="zoom: 50%;" />

#### ② 原因分析

如果在 finally 中存在 return 语句，那么 try-catch 中的 return 值都会被覆盖，如果程序员在写代码的时候没有发现这个问题，那么就会导致程序的执行结果出错。

#### ③ 解决方案

如果 try-catch-finally 中存在 return 返回值的情况，**一定要确保 return 语句只在方法的尾部出现一次**。

#### ④ 正例代码

```java
public static void main(String[] args) throws FileNotFoundException {
    System.out.println("执行结果:" + testAmend());
}
private static int testAmend() {
    int num = 0;
    try {
        num = 1;
    } catch (Exception e) {
        // do something
    } finally {
        // do something
    }
    // 确保 return 语句只在此处出现一次
    return num;
}
```



### 坑2：finally中的代码“不执行”

如果说上面的示例比较简单，那么下面这个示例会给你不同的感受，直接来看代码。

#### ① 反例代码

```java
public static void main(String[] args) throws FileNotFoundException {
    System.out.println("执行结果:" + getValue());
}
private static int getValue() {
    int num = 1;
    try {
        return num;
    } finally {
        num++;
    }
}
```

以上代码的执行结果如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207021113540.png" alt="image-20220702111302444" style="zoom:67%;" />

#### ② 原因分析

**本以为执行的结果会是 2，但万万没想到竟然是 1**，用马大师的话来讲：「我大意了啊，没有闪」。

有人可能会问：如果把代码换成 ++num，那么结果会不会是 2 呢？

很抱歉的告诉你，并不会，执行的结果依然是 1。那为什么会这样呢？

磊哥在这里对这些字节码做一个简单的翻译：

> iconst 是将 int 类型的值压入操作数栈。istore 是将 int 存储到局部变量。iload 从局部变量加载 int 值。iinc 通过下标递增局部变量。ireturn 从操作数堆栈中返回 int 类型的值。astore 将引用存储到局部变量中。

#### ③ 解决方案

实际上，Java 虚拟机会把 finally 语句块作为 subroutine（对于这个 subroutine 不知该如何翻译为好，干脆就不翻译了，免得产生歧义和误解）直接插入到 try 语句块或者 catch 语句块的控制转移语句之前。但是，还有另外一个不可忽视的因素，那就是在执行 subroutine（也就是 finally 语句块）之前，try 或者 catch 语句块会保留其返回值到本地变量表（Local Variable Table）中，待 subroutine 执行完毕之后，再恢复保留的返回值到操作数栈中，`然后通过 return 或者 throw 语句将其返回给该方法的调用者（invoker）`。

因此如果在 try-catch-finally 中如果有 return 操作，**一定要确保 return 语句只在方法的尾部出现一次！**这样就能保证 try-catch-finally 中所有操作代码都会生效。

#### ④ 正例代码

```java
private static int getValueByAmend() {
    int num = 1;
    try {
        // do something
    } catch (Exception e) {
        // do something
    } finally {
        num++;
    }
    return num;
}
```

### 坑3：finally中的代码“非最后”执行

#### ① 反例代码

```java
public static void main(String[] args) throws FileNotFoundException {
    execErr();
}
private static void execErr() {
    try {
        throw new RuntimeException();
    } catch (RuntimeException e) {
        e.printStackTrace();
    } finally {
        System.out.println("执行 finally.");
    }
}
```

以上代码的执行结果如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207021115542.png" alt="image-20220702111524436" style="zoom:67%;" />

从以上结果可以看出 **finally 中的代码并不是最后执行的，而是在 catch 打印异常之前执行的**，这是为什么呢？

#### ② 原因分析

产生以上问题的真实原因其实并不是因为 try-catch-finally，当我们打开 e.printStackTrace 的源码就能看出一些端倪了，源码如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207021115574.png" alt="image-20220702111541477" style="zoom:67%;" />

从上图可以看出，当执行 e.printStackTrace()  和 finally 输出信息时，使用的并不是同一个对象。**finally 使用的是标准输出流：System.out，而 e.printStackTrace()  使用的却是标准错误输出流：System.err.println**，它们执行的效果等同于：

```java
public static void main(String[] args) {
    System.out.println("我是标准输出流");
    System.err.println("我是标准错误输出流");
}
```

而以上代码执行结果的顺序也是随机的，而产生这一切的原因，我们或许可以通过标准错误输出流（System.err）的注释和说明文档中看出：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207021116867.png" alt="image-20220702111604722" style="zoom:50%;" />

我们简单的对以上的注释做一个简单的翻译：

> “标准”错误输出流。该流已经打开，并准备接受输出数据。通常，此流对应于主机环境或用户指定的显示输出或另一个输出目标。按照惯例，即使主要输出流（out 输出流）已重定向到文件或其他目标位置，该输出流（err 输出流）也能用于显示错误消息或其他信息，这些信息应引起用户的立即注意。

从源码的注释信息可以看出，标准错误输出流（System.err）和标准输出流（System.out）使用的是不同的流对象，即使标准输出流并定位到其他的文件，也不会影响到标准错误输出流。那么我们就可以大胆的猜测：二者是独立执行的，并且为了更高效的输出流信息，二者在执行时是并行执行的，因此我们看到的结果是打印顺序总是随机的。

为了验证此观点，我们将标准输出流重定向到某个文件，然后再来观察 System.err 能不能正常打印，实现代码如下：

```java
public static void main(String[] args) throws FileNotFoundException {
    // 将标准输出流的信息定位到 log.txt 中
    System.setOut(new PrintStream(new FileOutputStream("log.txt")));
    System.out.println("我是标准输出流");
    System.err.println("我是标准错误输出流");
}
```

以上代码的执行结果如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207021116841.png" alt="image-20220702111634727" style="zoom: 67%;" />

当程序执行完成之后，我们发现在项目的根目录出现了一个新的 log.txt 文件，打开此文件看到如下结果：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207021116848.png" alt="image-20220702111653721" style="zoom: 50%;" />

从以上结果可以看出标准输出流和标准错误输出流是彼此独立执行的，且 JVM 为了高效的执行会让二者并行运行，所以最终我们看到的结果是 finally 在 catch 之前执行了。

#### ③ 解决方案

知道了原因，那么问题就好处理，我们只需要将 try-catch-finally 中的输出对象，改为统一的输出流对象就可以解决此问题了。

#### ④ 正例代码

```java
private static void execErr() {
    try {
        throw new RuntimeException();
    } catch (RuntimeException e) {
        System.out.println(e);
    } finally {
        System.out.println("执行 finally.");
    }
}
```

改成了统一的输出流对象之后，我手工执行了 n 次，并没有发现任何问题。

### 坑4：finally中的代码“不执行”

finally 中的代码一定会执行吗？如果是之前我会毫不犹豫的说“是的”，但在遭受了社会的毒打之后，我可能会这样回答：**正常情况下 finally 中的代码一定会执行的，但如果遇到特殊情况 finally 中的代码就不一定会执行了**，比如下面这些情况：

- 在 try-catch 语句中执行了 System.exit；
- 在 try-catch 语句中出现了死循环；
- 在 finally 执行之前掉电或者 JVM 崩溃了。

如果发生了以上任意一种情况，finally 中的代码就不会执行了。**虽然感觉这一条有点“抬杠”的嫌疑，但墨菲定律告诉我们，如果一件事有可能会发生，那么他就一定会发生。所以从严谨的角度来说，这个观点还是成立的**，尤其是对于新手来说，神不知鬼不觉的写出一个自己发现不了的死循环是一件很容易的事，不是嘛？

### ① 反例代码

```java
public static void main(String[] args) {
    noFinally();
}
private static void noFinally() {
    try {
        System.out.println("我是 try~");
        System.exit(0);
    } catch (Exception e) {
        // do something
    } finally {
        System.out.println("我是 fially~");
    }
}
```

以上代码的执行结果如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207021118466.png" alt="image-20220702111811362" style="zoom:67%;" />

从以上结果可以看出 finally 中的代码并没有执行。

#### ② 解决方案

排除掉代码中的 System.exit 代码，除非是业务需要，但也**要注意如果在 try-cacth 中出现了 System.exit 的代码，那么 finally 中的代码将不会被执行。**



# 泛型

## 泛型概述

### 泛型特性

> - 泛型：是JDK5中引入的特性，**可以在编译阶段约束操作的数据类型，并进行检查**
> - 泛型的格式：<数据类型> ;注意：**泛型只能支持引用数据类型**
> - 集合体系的全部接口和实现类都是支持泛型的使用的

### 泛型好处

- 统一数据类型
- 把运行期间的问题提前到了编译期间，避免了强制类型转换可能出现的异常，因为编译阶段的类型就能确定下来
- Java语言引入泛型的好处是**安全简单**。泛型的好处是在编译的时候检查类型安全
- 并且所有的强制转换都是自动和隐式的，提高代码的重用率。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211015135316832.png" alt="image-20211015135316832" style="zoom: 80%;" />

```java
// JDK1.7之前
ArrayList<String> list = new ArrayList<String>();
// JDK1.7之后，简化了一个泛型类型
ArrayList<String> list = new ArrayList<>();
```

## 泛型类

### 基本语法

> **泛型类的原理**：把出现泛型变量的地方全部替换成传输的真实数据类型。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051222324.png" alt="image-20230105122213207" style="zoom: 60%;" />

### 示例1

> 模拟ArrayList集合自定义一个集合MyArrayList集合,完成添加和删除功能的泛型设计即可。

```java
public class MyArrayList<E> {
    private final ArrayList<E> lists = new ArrayList<>();

    public void add(E e){
        lists.add(e);
    }

    public void remove(E e){
        lists.remove(e);
    }

    @Override
    public String toString() {
        return lists.toString();
    }
}
```

```java
public class Test {
    public static void main(String[] args) {
        // 需求：模拟ArrayList定义一个MyArrayList ，关注泛型设计
        MyArrayList<String> list = new MyArrayList<>();
        list.add("Java");
        list.add("Java");
        list.add("MySQL");
        list.remove("MySQL");
        System.out.println(list);

        MyArrayList<Integer> list2 = new MyArrayList<>();
        list2.add(23);
        list2.add(24);
        list2.add(25);
        list2.remove(25);
        System.out.println(list2);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051226182.png" alt="image-20230105122618081" style="zoom:67%;" />

### 示例2

```java
public class Gen<T> {    
    private T name;   
    public T getName() {        
        return name;   
    }   
    public void setName(T name) {  
        this.name = name; 
    }
}
```

实现

```java
class Test{  
    public static void main(String[] args) {  
        Gen<String> g1 = new Gen<>();
        g1.setName("任硕");  
        System.out.println(g1.getName());    
        Gen<Integer> g2 = new Gen<>();    
        g2.setName(12);     
        System.out.println(g2.getName());  
    }
}
```

## 泛型接口

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051336119.png" alt="image-20230105133657010" style="zoom:67%;" />

### 示例1

> 教务系统，提供一个接口可约束一定要完成数据（学生，老师）的增删改查操作

```java
public interface Data<E> {
    void add(E e);
    void delete(int id);
    void update(E e);
    E queryById(int id);
}
```

```java
public class Student {
}
```

```java
public class Teacher {
}
```

```java
public class StudentData implements Data<Student>{
    @Override
    public void add(Student student) {

    }

    @Override
    public void delete(int id) {

    }

    @Override
    public void update(Student student) {

    }

    @Override
    public Student queryById(int id) {
        return null;
    }
}
```

```java
public class TeacherData implements Data<Teacher>{
    @Override
    public void add(Teacher teacher) {

    }

    @Override
    public void delete(int id) {

    }

    @Override
    public void update(Teacher teacher) {

    }

    @Override
    public Teacher queryById(int id) {
        return null;
    }
}
```

### 示例2

泛型也可以应用于接口。

```java
public interface Generator<T> {  
    T next();
}
```

实现类去实现这个接口的时候，可以指定泛型T的具体类型。

指定具体类型为Integer的实现类：

```java
public class NumberGenerator implements Generator<Integer> {
    @Override   
    public Integer next() {   
        return new Random().nextInt(); 
    }
}
```

指定具体类型为String的实现类：

```java
public class StringGenerator implements Generator<String> {
    @Override   
    public String next() {      
        return "测试泛型接口";  
    }
}
```



## 泛型方法

### 泛型方法概述

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051228562.png" alt="image-20230105122831446" style="zoom:60%;" />

### 示例1

给你任何一个类型的数组，都能返回它的内容。也就是实现Arrays.toString(数组)的功能！

```java
public class GenericDemo {
    public static void main(String[] args) {
        String[] names = {"小璐", "蓉容", "小何"};
        printArray(names);

        Integer[] ages = {10, 20, 30};
        printArray(ages);

        Integer[] ages2 = getArr(ages);
        String[]  names2 = getArr(names);
        System.out.println(Arrays.toString(ages2));
        System.out.println(Arrays.toString(names2));
    }

    public static <T> T[] getArr(T[] arr){
        return arr;
    }

    public static <T> void printArray(T[] arr){
        if(arr != null){
            StringBuilder sb = new StringBuilder("[");
            for (int i = 0; i < arr.length; i++) {
                sb.append(arr[i]).append(i == arr.length - 1 ? "" : ", ");
            }
            sb.append("]");
            System.out.println(sb);
        }else {
            System.out.println(arr);
        }
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051232687.png" alt="image-20230105123242580" style="zoom:67%;" />

### 示例2

1、在泛型类里写泛型方法

```java
public class Gen<T> {  
    public void show(T t){  
        System.out.println(t);  
    }
}
```

实现

```java
class Test{  
    public static void main(String[] args) {    
        Gen<String> g1 = new Gen<>();    
        g1.show("你好");  
        Gen<Integer> g2 = new Gen<>();    
        g2.show(123);  
    }
}
```

2、直接写泛型方法，这样创建对象变简单

```java
class Test{   
    public static void main(String[] args) {   
        show1("任硕");     
        show1(true);  
    }   
    public static <T> void show1(T t){     
        System.out.println(t);  
    }
}
```



## 泛型通配符

我们定义泛型时，经常碰见T，E，K，V，？等通配符。本质上这些都是通配符，是编码时一种约定俗成的东西。当然，你换个A-Z中另一个字母表示没有关系，但是为了可读性，一般有以下定义：

> - ？ 表示不确定的 java 类型
> - T (type) 表示具体的一个java类型
> - K V (key value) 分别代表java键值中的Key Value
> - E (element) 代表Element

通配符通常分三类：

- 无边界通配符，如 `<?>`
- 上边界限定通配符,如 `<?extendsE>`;
- 下边界通配符，如 `<?superE>`;

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202206011736821.png" alt="image-20220601173645743" style="zoom:80%;" />

## 泛型擦除

### 什么是类型擦除

什么是Java**泛型擦除**呢？ 先来看demo：

```java
Class c1 = new ArrayList<Integer>().getClass();
Class c2 = new ArrayList<String>().getClass();
System.out.println(c1 == c2); /*Outputtrue*/
```

日常开发中， `ArrayList<Integer>` 和 `ArrayList<String>` 很容易被认为是不同的类型。但是这里输出结果是true，这是因为Java泛型是使用擦除实现的，不管是 `ArrayList<Integer>()` 还是 `newArrayList<String>()`，在编译生成的字节码中都不包含泛型中的类型参数，即都擦除成了ArrayList，也就是被擦除成“原生类型”，这就是泛型擦除。

### 类型擦除底层

Java泛型在编译期完成，它是依赖编译器实现的。其实，编译器主要做了这些工作：

- set()方法的类型检验
- get()处的类型转换，编译器插入了一个checkcast语句，

再看个例子：

```java
public class GenericTest<T> {
    private T t;
    public T get() {     
        return t;  
    }
    public void set(T t) {    
        this.t = t;  
    }
    public static void main(String[] args) {    
        GenericTest<String> test = new GenericTest<String>();     
        test.set("jay@huaxiao");    
        String s = test.get();      
        System.out.println(s);   
    }
}/* Outputjay@huaxiao*/
```

javap -c GenericTest.class反编译GenericTest类可得

- 看第11，set进去的是原始类型Object（#6）；
- 看第15，get方法获得也是Object类型（#7），说明类型被擦出了。
- 再看第18，它做了一个checkcast操作，是一个String类型，强转。



## 泛型的限制与局限

使用Java泛型需要考虑以下一些约束与限制，其实几乎都跟泛型擦除有关。

### 不能用基本类型实例化类型化参数

不能用类型参数代替基本类型。因此， 没有 `Pair<double>`, 只 有 `Pair<Double>`。 当然, 其原因是类型擦除。擦除之后， Pair 类含有 Object 类型的域， 而 Object 不能存储 double值。

### 运行时类型查询只适用于原始类型

如，getClass()方法等只返回原始类型，因为JVM根本就不知道泛型这回事，它只知道原始类型。

```java
if(a instanceof Pair<String>) //ERROR,仅测试了a是否是任意类型的一个Pair，会看到编译器ERROR警告
if(a instanceof Pair<T>) //ERROR
Pair<String> p = (Pair<String>) a;//WARNING,仅测试a是否是一个Pair
Pair<String> stringPair = ...;
Pair<Employee> employeePair = ...;
if(stringPair.getClass() == employeePair.getClass())  //会得到true，因为两次调用getClass都将返回Pair.class
```

### 不能创建参数化类型的数组

不能实例化参数化类型的数组， 例如：

```java
Pair<String>[] table = new Pair<String>[10]; // Error
```

### 不能实例化类型变量

不能使用像 new T(...)，newT[...] 或 T.class 这样的表达式中的类型变量。例如， 下面的 `Pair<T>` 构造器就是非法的：

```java
public Pair() { 
    first = new T(); 
    second = new T(); 
} // Error 
```

### 使用泛型接口时，避免重复实现同一个接口

```java
interface Swim<T> {}
class Duck implements Swim<Duck> {}
class UglyDuck extends Duck implements Swim<UglyDuck> {}
```

### 可以消除对受查异常的检查

```java
@SuppressWamings("unchecked") 
public static <T extends Throwable〉void throwAs(Throwable e) throws T { 
    throw (T) e; 
}
```

### 定义API返回报文时，尽量使用泛型

```java
public class Response<T> extends BaseResponse { 
    private static final long serialVersionUID = -xxx;
    private T data;
    private String code;
    public Response() { }
    public T getData() {  
        return this.data;  
    }
    public void setData(T data,String code ) {     
        this.data = data;    
        this.code = code;    
    }
}
```















