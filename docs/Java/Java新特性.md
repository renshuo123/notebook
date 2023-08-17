



# 类型推断

[一文汇总 JDK 5 到 JDK 15 中的牛逼功能！ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU1NTkwODE4Mw==&mid=2247493574&idx=1&sn=dba845955b4b5210073a9f00fb0d3f66&chksm=fbcf8afeccb803e8ea0bb3a4c2b8321040f15eaa8a151e938e01b3edde2189a09a39a7cbef06&mpshare=1&scene=23&srcid=0702rT303UtTfUjdWifP6nu7&sharer_sharetime=1656692040250&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

然而到了 JDK 10 时，我们就有了新的选择，JDK 10 中新增了 `var` 局部变量推断的功能，使用它我们可以很 happy 的忘记数据类型这件事了，那它是如何使用的呢？接下来我们一起来看。

## 使用对比

接下来我们就使用对比的方式，来体会一下 `var` 的作用。

#### 场景一：定义字符串

**旧写法：**

```java
String str = "Hello, Java.";
```

**新写法：**

```java
var s = "Hello, Java.";
```

> PS：这里的旧写法指的是 JDK 10 之前的版本，而新写法指的是 JDK 10 以后（包含 JDK 10）的版本。

#### 场景二：数值相加

**旧写法：**

```java
int num1 = 111;
double num2 = 555.666d;
double num3 = num1 + num2;
System.out.println(num3);
```

> PS：当遇到不同类型相加时（`int`+ `double`）会发生数据类型向上转型，因此 `num3` 就会升级为 `double` 类型。

**新写法：**

```java
var n1 = 111L;
var n2 = 555.666;
var n3 = n1 + n2;
System.out.println(n3);
```

#### 场景三：集合

**旧写法：**

```java
List<Object> list = new ArrayList<>();
list.add("Hello");
list.add("Java");
```

**新写法：**

```java
var list = new ArrayList<>();
list.add("Hello");
list.add("Java");
```

#### 场景四：循环

**旧写法：**

```java
for (Object item : list) {
    System.out.println("item:" + item);
}
for (int i = 0; i < 10; i++) {
    // do something...
}
```

**新写法：**

```java
for (var item : list) {
    System.out.println("item:" + item);
}
for (var i = 0; i < 10; i++) {
    // do something...
}
```

#### 场景五：配合 Lambda 使用

**旧写法：**

```java
List<Object> flist = list.stream().filter(v ->
                v.equals("Java")).collect(Collectors.toList());
System.out.println(flist);
```

**新写法：**

```java
var flist = list.stream().filter(v ->
             v.equals("Java")).collect(Collectors.toList());
System.out.println(flist);
```

## 优点分析

通过上面的示例我们可以看出， `var` 具备**两个明显的优点：提高了代码的可读性和命名对齐**。

### ① 提高了可读性

我们在没有使用 `var` 之前，如果类型的名称很长就会出现下面的这种情况：

```java
InternationalCustomerOrderProcessor<AnonymousCustomer, SimpleOrder<Book>> orderProcessor = 
    createInternationalOrderProcessor(customer, order);
```

当限定每行不能超过 150 个字符的话，变量名就会被推到下一行显示，这样整个代码的可读性就变得很低。但当我们使用了 `var` 之后，代码就变成了这样：

```java
var orderProcessor = createInternationalOrderProcessor(customer, order);
```

从上述的代码可以看出，当类型越长时，`var`（可读性）的价值就越大。

### ② 命名对齐

在不使用 `var` 时，当遇到下面这种情况，代码就是这样的：

```java
// 显式类型
No no = new No();
AmountIncrease<BigDecimal> more = new BigDecimalAmountIncrease();
HorizontalConnection<LinePosition, LinePosition> jumping =
  new HorizontalLinePositionConnection();
Variable variable = new Constant(6);
List<String> names = List.of("Java", "中文社群");
```

在使用了 `var` 之后，代码是这样的：

```java
var no = new No();
var more = new BigDecimalAmountIncrease();
var jumping = new HorizontalLinePositionConnection();
var variable = new Constant(6);
var names = List.of("Java", "中文社群");
```

从上述代码可以看出使用了 `var` 之后，命名对齐了，整个代码也变得更优雅了。



## 使用规则 & 反例

`var` 的实现来自于 JEP 286 (改善提议 286），详情地址 ：http://openjdk.java.net/jeps/286

从 JEP 286 的标题“局部变量类型推断”可以看出，`var` 只能用于局部变量声明，也就是说 `var` 必须满足以下条件：

- 它只能用于局部变量上；
- 声明时必须初始化；
- 不能用作方法参数和全局变量（类变量）。

> PS：因为 `var` 的实现必须根据等会右边的代码进行类型推断，因此它不能被赋值 null 或不被初始化。

#### 反例一：未初始化和赋值 null

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208131008477.png" alt="image-20220813100850407" style="zoom:67%;" />

#### 反例二：中途类型更改

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208160950880.png" alt="image-20220813100903220" style="zoom:67%;" />

#### 反例三：全局变量

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208131009325.png" alt="image-20220813100926238" style="zoom:67%;" />

####  反例四：作为返回值

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208131009024.png" alt="image-20220813100936949" style="zoom:67%;" />

##  原理分析

经过前面的使用我们对 `var` 已经有了初步的认识，但 `var` 的实现原理是什么呢？

为了搞清楚它的原理，我们对下面的代码进行了编译（使用命令 `javac MainTest.java`）：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208131007487.png" alt="image-20220813100719369" style="zoom: 50%;" />

然后我们再用反编译工具打开被编译的类发现：`var` 竟然被替换成一个个确定的数据类型了，如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208131008983.png" alt="image-20220813100817865" style="zoom:50%;" />

由此我们可以得出结论：**`var` 关键字的实现和它的名字密切相关， `var` 只是局部类型推断，它只会在 Java 编码期和编译期有效，当类被编译为 class 文件时，`var` 就会变成一个个确定的数据类型（通过推断得出）。** 所以我们可以把 `var` 通俗的理解为 Java 的语法糖，使用它可以让我们快速优雅的实现业务代码，但 `var` 在字节码层面是不存在的。



# 模块化系统⭐

> 本质上讲，模块(module)的概念，其实就是package外再裹一层，也就是说，用模块来管理各个package，通过声明某个package暴露，不声明默认就是隐藏。因此，模块化使得代码组织上更安全，因为它可以指定哪些部分可以暴露，哪些部分隐藏。

> 模块独立、化繁为简：模块化（以 Java 平台模块系统的形式）将 JDK 分成一组模块，可以在编译时，运行时或者构建时进行组合
>
> - 主要目的在于减少内存的开销
> - 只须必要模块，而非全部jdk模块，可简化各种类库和大型应用的开发和维护
> - 改进 Java SE 平台，使其可以适应不同大小的计算设备
> - 改进其安全性，可维护性，提高性能

## 什么是模块化？

> 一个大型系统，比如一个商城网站，它会包含很多模块的，如：订单模块，用户信息模块，商品信息模块，广告位模块等等。各个模块之间会相互调用。**如果每个模块单独运行都会带动其他所有模块，性能非常低效。但是，如果某一模块运行时，只会启动它所依赖的模块，性能大大提升。**这就是JDK 9模块化的思想。

## 什么是JDK 9模块化？

> Java 平台模块系统，即Project Jigsaw，把模块化开发实践引入到了Java平台中。在引入了模块系统之后，JDK 被重新组织成94个模块。Java 应用可以通过新增的jlink 工具，创建出只包含所依赖的JDK模块的自定义运行时镜像。这样可以极大的减少Java运行时环境的大小。

## JDK 9 模块的重要特征

> - 在其工件（artifact）的根目录中包含了一个描述模块的 module-info.class 文 件。
> - 工件的格式可以是传统的 JAR 文件或是 Java 9 新增的 JMOD 文件。
> - 这个文件由根目录中的源代码文件 module-info.java 编译而来。
> - 该模块声明文件可以描述模块的不同特征。

在 module-info.java 文件中，我们可以用新的关键词module来声明一个模块，如下所示。下面给出了一个模块com.mycompany.mymodule的最基本的模块声明

```java
module com.jay.sample {   //关键词module来声明一个模块
    exports com.jay.sample; //使用 exports可以声明模块对其他模块所导出的包。
    requires com.jay.common; //使用requires可以声明模块对其他模块的依赖关系。
}
```

## 模块化的代码演示步骤

需求： 变量一个Module模块，然后使用ModuleB模块进行访问。

> 1. 创建一个ModuleA，然后创建两个包，com.itheima.utils和com.itheima.model.
>
> 2. 在utils包中创建一个ArrayUtils工具类并创建一个获取最大值的方法
>
> 3. 在modle包中创建一个Person类
>
> 4. 新建一个输出模块信息，只是输出utils包，model包对外隐藏
>
> 5. 创建一个ModuleB,然后新建一个ModuleTest类，测试使用ArrayUtils
>
> 6. 创建一个输入模块信息，并添加依赖

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021006994.png" alt="image-20230102100649876" style="zoom:67%;" />

在utils包中创建一个ArrayUtils工具类并创建一个获取最大值的方法

```java
package com.itheima.utils;

public class ArrayUtils {

    public static int getMax(int[] arr){
        //1.定义一个变量存储当前的最大值
        int max = arr[0];
        //2. 使用存储最大值的变量与数组中的每一个元素进行对比
        for (int i = 1; i < arr.length; i++) {
            if(arr[i]>max){
                //3. 如果发现了数组的元素比最大值变量要大，那么最大值的变量存储当前的元素
                max = arr[i];
            }
        }
        //4. 返回最大值
        return max;
    }
}
```

在module包中创建一个Person类

```java
package com.itheima.model;

public class Person {
    
	private int id;
	private String name;
    
	public Person(int id, String name) {
		this.id = id;
		this.name = name;
    }
}
```

新建一个输出模块信息，只是输出utils包，model包对外隐藏

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021011126.png" alt="image-20230102101112982" style="zoom:67%;" />

```java
module moduleA {
	exports com.itheima.utils;
}
```

创建一个ModuleB,然后新建一个ModuleTest类，测试使用ArrayUtils

```java
package com.itheima.test;

public class ModuleTest {
	public static void main(String[] args) {
		int[] arr= {10,19,50,3,2};
		int max = ArrayUtils.getMax(arr);
		System.out.println("最大值："+max);
	}
}
```

创建一个输入模块信息，并添加依赖

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021014235.png" alt="image-20230102101403098" style="zoom:80%;" />



## 模块化使用示例2

创建两个module，一个module负责调用另一个module

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211251012870.png" alt="image-20221125101201794" style="zoom:80%;" />

创建Person类

```java
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public Person() {
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
```

导入对应包

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211251017039.png" alt="image-20221125101723950" style="zoom:80%;" />

```java
module java9demo {
    // 导出对应的包
    exports com.it.entity;
}
```

> **exports**：控制着哪些包可以被其它模块访问到。所有不被导出的包。**默认都被封装在模块里面。**

接收对应包

> 注意：报错先别管，接着下一步进行就行

```java
module java9Test {
    requires java9demo;
}
```

引入测试

```java
import com.it.entity.Person;

public class moduleTest {
    public static void main(String[] args) {
        Person p = new Person();
        System.out.println(p);
    }
}
```

注意：导入第一项

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211251009926.png" alt="image-20221125100934815" style="zoom:80%;" />

成功运行

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211251014526.png" alt="image-20221125101429450" style="zoom:80%;" />



# Jshell ⭐

> 像 Python 和 Scala 之类的语言早就有交互式编程环境 REPL (read -evaluate - print - loop)了，以交互式的方式对语句和表达式进行求值。开发者只需要输入一些代码，就可以在编译前获得对程序的反馈。而之前的 Java 版本要想执行代码，必须创建文件、声明类、提供测试方法方可实现。

- Java 9 中终于拥有了 REPL 工具：jShell。利用 jShell 在没有创建类的情况下直接声明变量，计算表达式，执行语句。即开发时可以在命令行里直接运行 java 的代码，而无需创建 Java 文件，无需跟人解释”public static void main(String[] args)”这句废话。
- jShell 也可以从文件中加载语句或者将语句保存到文件中。
- jShell 也可以是 tab 键进行自动补全和自动添加分号。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211251020824.png" alt="image-20221125102002748" style="zoom:80%;" />

jShell工具相当于cmd工具，然后呢，你可以像在cmd工具操作一样，直接在上面运行Java方法，Java语句等~

```java
jshell> System.out.println("关注公众号：Java中文社群");
```

## 直接声明变量、方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021022880.png" alt="image-20230102102241754" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021023081.png" alt="image-20230102102309980" style="zoom:67%;" />





## 获取帮助

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211251022237.png" alt="image-20221125102228153" style="zoom:80%;" />

## 基本使用

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211251022836.png" alt="image-20221125102255765" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211251023063.png" alt="image-20221125102315980" style="zoom:80%;" />

> Tips：在 JShell 环境下，语句末尾的“;” 是可选的。但推荐还是最好加上。提高代码可读性

## 导入指定的包

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211251023061.png" alt="image-20221125102350987" style="zoom:80%;" />

**默认已经导入如下的所有包：（包含** **java.lang** **包）**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211251024628.png" alt="image-20221125102408540" style="zoom:80%;" />

## 只需按下Tab键，就能自动补全代码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211251024798.png" alt="image-20221125102454717" style="zoom:80%;" />



## /list 查看当前所有代码（仅当前控制台）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021024117.png" alt="image-20230102102430020" style="zoom:80%;" />

> Tips：我们还可以重新定义相同方法名和参数列表的方法，即为对现有方法的修改（或覆盖）。

## 没有受检异常（编译时异常）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211251030944.png" alt="image-20221125103015876" style="zoom:80%;" />

> 说明：本来应该强迫我们捕获一个 IOException，但却没有出现。因为jShell 在后台为我们隐藏了。

## /methods查看所有的方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021031656.png" alt="image-20230102103126563" style="zoom:67%;" />

## /var 查看所有的变量

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021029523.png" alt="image-20230102102921427" style="zoom:67%;" />

## /edit 打开编辑器

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021028356.png" alt="image-20230102102822231" style="zoom:80%;" />

## /open 路径 执行外部的代码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021027326.png" alt="image-20230102102750210" style="zoom:67%;" />

## /imports 查看默认导入的包

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021027803.png" alt="image-20230102102710683" style="zoom:67%;" />

## /edit退出 jShell

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211251029339.png" alt="image-20221125102951276" style="zoom:80%;" />



# 数据类型

## 类型匹配 instanceof

> instanceof 的模式匹配（jdk14出预览，jdk16最终确认）

### 基本使用

JDK16之前版本，先进行类型匹配，再进行强行转换

> * 先判断obj的真实数据类型
> * 判断成立后进行了强制类型转换（将对象obj强制类型转换为String）
> * 声明一个新的本地变量str，指向上面的obj 

```java
public static void beforeWay(Object obj) {
    // 通过instanceof判断obj对象的真实数据类型是否是String类型
    if (obj instanceof String) {
        // 如果进来了，说明obj的类型是String类型，直接进行强制类型转换。
        String str = (String) obj;
        // 输出字符串的长度
        System.out.println("字符串长度 = " + str.length());
    } else {
        System.out.println("obj = " + obj);
    }
}
```

现在可以类型匹配+强转一步到位

```java
public static void beforeWay(Object obj) {
    // 通过instanceof判断obj对象的真实数据类型是否是String类型
    if (obj instanceof String str) {
        // 输出字符串的长度
        System.out.println("字符串长度 = " + str.length());
    } else {
        System.out.println("obj = " + obj);
    }
}
```

### 注意事项

> 如果obj是String的实例，则将其强制转换为String并分配给绑定变量s。绑定变量在if语句的true块中，而不在if语句的false块中。
>

```java
if (obj instanceof String s) {
    // 使用s
} else {
    // 不能使用s
}
```

与局部变量的范围不同，绑定变量的范围由包含的表达式和语句的语义确定。例如，在此代码中：

```java
if (!(obj instanceof String s)) {
    .. s.contains(..) ..
} else {
    .. s.contains(..) ..
}
```

true块中的s表示封闭类中的字段，false块中的s表示由instanceof运算符引入的绑定变量。

当if语句的条件变得比单个instanceof更复杂时，绑定变量的范围也会相应地增长。 例如，在此代码中：

```java
if (obj instanceof String s && s.length() > 5) {
    .. s.contains(..) ..
}
```

绑定变量s在`&&`运算符右侧以及true块中。仅当instanceof成功并分配给s时，才评估右侧。

另一方面，在此代码中：

```java
if (obj instanceof String s || s.length() > 5) { // 这样写是错误的
    .. s.contains(..) ..
}
```

绑定变量s不在`||`右侧的范围内运算符，也不在true块的范围内。s指的是封闭的一个字段。

### 经典做法

> **模式匹配帮助简化案例的经典做法：**通常`equals()`方法的实现都会先检查目标对象的类型。`instanceof`的模式匹配可以简化`equals()`方法的实现逻辑。下面代码中的Student类

普通生成的实体类的equals方法

```java
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Student student = (Student) o;

    return name != null ? name.equals(student.name) : student.name == null;
}
```

使用instanceof改进的equals方法

```java
// 简化后做法！  
@Override
public boolean equals(Object obj) {
  return (obj instanceof Student s) && Objects.equals(this.name, s.name);
}
```



## 标识符优化

在 java 8 中，标识符可以独立使用“_”来命名：

```java
String _ = "hello";
System.out.println(_);
```

但是，在 java 9 中规定“_”不再可以单独命名标识符了，如果使用，会报错：



# 字符串

## String底层结构的变化

string类的当前实现将字符存储在char数组中，每个字符使用两个字节（16位）。从许多不同的应用程序收集的数据表明，字符串是堆使用的主要组成部分，而且，大多数字符串对象只包含拉丁-1字符。这样的字符只需要一个字节的存储空间，因此这样的字符串对象的内部字符数组中的一半空间将被闲置。

> 由字符数组变成字节数据，节省内存空间

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021108929.png" alt="image-20230102110808731" style="zoom: 50%;" />



## 文本块改进

> 文本块是一种多行字符串文字，它避免了大多数转义序列的需要，以一种可预测的方式自动设置字符串的格式，并在需要时使开发人员可以控制格式，简化编写 Java 程序的任务。

### HTML 文本块

使用“一维”字符串文字*

```java
String html = "<html>\n" +
              "    <body>\n" +
              "        <p>Hello, world</p>\n" +
              "    </body>\n" +
              "</html>\n";
```

使用“二维”文本块

```java
String html = """
              <html>
                  <body>
                      <p>Hello, world</p>
                  </body>
              </html>
              """;
    
System.out.println("""
    Hello,
    itheima
    text blocks!
    """);
```

文本块是Java语言的新语法，可以用来表示任何字符串，具有更高的表达能力和更少的复杂度。文本块的开头定界符是由三个双引号 **"""** 开始，从新的一行开始字符串的内容。这里的新起的这行不属于字符串，只表示内容开始，是语法的一部分。以 **"""** 结束。 **"""** 可以紧跟字符串内容，也可以另起一行。**另起一行时，字符串内容最后会留有一新行。**

```java
"""
line 1
line 2
line 3
"""
```

等效于字符串文字：

```java
"line 1\nline 2\nline 3\n"
```

或字符串文字的串联：

```java
"line 1\n" +
"line 2\n" +
"line 3\n"
```

如果在字符串的末尾不需要行终止符，则可以将结束定界符放在内容的最后一行。例如，文本块：

```java
"""
line 1
line 2
line 3"""
```

等效于字符串文字：

```java
"line 1\nline 2\nline 3"
```

文本块可以表示空字符串，尽管不建议这样做，因为它需要两行源代码：

```java
String empty = """
""";
```

以下是一些格式错误的文本块的示例：

```java
String a = """""";   // no line terminator after opening delimiter
String b = """ """;  // no line terminator after opening delimiter
String c = """
           ";        // no closing delimiter (text block continues to EOF)
String d = """
           abc \ def
           """;      // unescaped backslash (see below for escape processing)
```

### SQL

使用原始的字符串语法：

```java
String query = "SELECT `EMP_ID`, `LAST_NAME` FROM `EMPLOYEE_TB`\n" +
               "WHERE `CITY` = 'INDIANAPOLIS'\n" +
               "ORDER BY `EMP_ID`, `LAST_NAME`;\n";
```

使用文本块语法：

```java
String query = """
               SELECT `EMP_ID`, `LAST_NAME` FROM `EMPLOYEE_TB`
               WHERE `CITY` = 'INDIANAPOLIS'
               ORDER BY `EMP_ID`, `LAST_NAME`;
               """;
```

### 多语言示例

使用原始的字符串语法：

```java
ScriptEngine engine = new ScriptEngineManager().getEngineByName("js");
Object obj = engine.eval("function hello() {\n" +
                         "    print('\"Hello, world\"');\n" +
                         "}\n" +
                         "\n" +
                         "hello();\n");
```

使用文本块语法：

```java
ScriptEngine engine = new ScriptEngineManager().getEngineByName("js");
Object obj = engine.eval("""
                         function hello() {
                             print('"Hello, world"');
                         }
                         
                         hello();
                         """);
```

### 缩进

java编译器会自动删除不需要的缩进：

- 每行结尾的空格都会删除
- 每行开始的共有的空格会自动删除
- 只保留相对缩进。

```python
System.out.println("""
    Hello,
    itheima
    text blocks!
    """);
// 结果
// > Hello,
// > itheima
// > text blocks!
// >

System.out.println("""
    Hello,
      itheima
    text blocks!
    """);
// 结果
// > Hello,
// >   itheima
// > text blocks!
// >
```

新行 **"""** 结束时，将 **"""** 向左调整，则可以给所有行前加相应数量的空格。将 **"""** 向右调整，没有作用。

```python
System.out.println("""
        Hello,
        multiline
        text blocks!
    """);
// 结果
// >     Hello,
// >     multiline
// >     text blocks!
```



## 新增字符串API

JDK 11增加了一系列好用的字符串处理方法

> - isBlank()：如果字符串为空或字符串仅包含空格（包括制表符），则返回 true。注意与isEmpty() 不同，isEmpty()仅在长度为 0 时返回 true。
> - lines()：将字符串拆分为字符串流，每个字符串包含一行。
> - strip() ：分别从开头和结尾；
> - stripLeading()/stripTrailing()仅开始和仅结束删除空格。
> - repeat(int times)：返回一个字符串，该字符串采用原始字符串并按指定的次数重复该字符串。
> - readString()：允许从文件路径直接读取到字符串。
> - writeString(Path path)：将字符串直接写入指定路径处的文件。
> - indent(int level)：缩进字符串的指定量。负值只会影响前导空格。
> - transform(Function f)：将给定的 lambda 应用于字符串。

### 字符串判空

```java
// 判断字符串是否为空白
System.out.println("判断字符串是否为空白："+"    ".isBlank()); // true
System.out.println("判断字符串是否为空："+"    ".isEmpty());  // false
```

### 去除字符串前后空白

```java
// 去除字符串的前后空白
// JDK 11去除前后空白的方法strip是支持去除全角空格的
System.out.println("去除字符串的前后空白:"+"　　　itheima　　　".strip());
System.out.println("去除字符串的前后空格:"+"　　　itheima　　　".trim());
// 去除字符串的首部空白
System.out.println("　　　itheima　　　".stripLeading()+"aaa");
// 去除字符串的尾部空白
System.out.println("　　　itheima　　　".stripTrailing()+"aaa");
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301011620613.png" alt="image-20230101162047542" style="zoom:80%;" />

### 复制字符串

```java
public static void a1() {
    // 复制字符串
    System.out.println("jay".repeat(3));
    System.out.println("jay".repeat(10));
}
```

### 统计字符串行数

```java
// 统计字符串中的行数
System.out.println("A\nB\nC\nD\n".lines().count());
```

## 打印表情包

目前支持最新的Unicode的类主要有

> - java.lang包下的Character, String
> - java.awt.font下的相关类。
> - java.text包下的Bidi,Normalizer等。

```java
public static void a1() {
    System.out.println("\uD83E\uDD93");
    System.out.println("\uD83E\uDD92");
    System.out.println("\uD83E\uDDDA");
    System.out.println("\uD83E\uDDD9");
    System.out.println("\uD83E\uDDD1");
    System.out.println("\uD83E\uDDD8");
    System.out.println("\uD83E\uDD95");
    System.out.println("\uD83E\uDD2e");
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301011737082.png" alt="image-20230101173720989" style="zoom:67%;" />

## transform 字符串处理

transform(Function)：对字符串进行处理后返回。

```java
public static void a1() {
    // transform 内部传入的是函数
    var rs = "itheima".transform(s -> s +"学习Java!").transform(s -> s.toUpperCase());
    System.out.println(rs); // ITHEIMA学习JAVA!
}
```



## indent 字符串缩进

indent ：该方法允许我们调整String实例的缩进

```java
System.out.println("=======================");
String result = "Java\nMySQL\nMyBatis".indent(3);
System.out.println(result);
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301011903492.png" alt="image-20230101190301405" style="zoom:80%;" />



# API

## 数学函数

> 改进现有的字符串和数组函数，并在Aarch64处理器上为java.lang.Math 下的sin , cos 和log函数实现新的内联函数。从而实现专用的CPU架构下提高应用程序的性能。

```java
public static void a1() {
    long startTime = System.nanoTime();
    for(int i = 0 ; i < 10000000 ; i++ ){
        Math.sin(i);
        Math.cos(i);
        Math.log(i);
    }
    long endTime = System.nanoTime();
    // JDK 11下耗时：1564ms
    // JDK 17下耗时：601ms
    // JDK 8前耗时：10523ms
    System.out.println(TimeUnit.NANOSECONDS.toMillis(endTime-startTime)+"ms");
}
```

## 压缩数字格式

> NumberFormat添加了对以紧凑形式格式化数字的支持。紧凑数字格式是指以简短或人类可读形式表示的数字。例如，在en_US语言环境中，1000可以格式化为“1K”，1000000可以格式化为“1M”，具体取决于指定的样式NumberFormat.Style。紧凑数字格式由LDML的Compact Number格式规范定义。要获取实例，请使用NumberFormat紧凑数字格式所给出的工厂方法之一。

```java
public static void a1() {
    //例如：
    NumberFormat fmt = NumberFormat.getCompactNumberInstance(Locale.US, 
                                                             NumberFormat.Style.SHORT);
    String result = fmt.format(1000);
    System.out.println(result);
    // 上面的例子导致“1K”。
    var cnf = NumberFormat.getCompactNumberInstance(Locale.CHINA,
            NumberFormat.Style.SHORT);
    System.out.println(cnf.format(3_0000));
    System.out.println(cnf.format(3_4200));
    System.out.println(cnf.format(3_000_000));
    System.out.println(cnf.format(3L << 30));
    System.out.println(cnf.format(3L << 50));
    System.out.println(cnf.format(3L << 60));
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301011811239.png" alt="image-20230101181102152" style="zoom: 67%;" />

## Base64 编码

Java 8把Base64编码的支持加入到官方库中~

```java
public static void s1() {
    String str = "公众号:Java中文社群";
    String encoded = Base64.getEncoder().encodeToString(str.getBytes(StandardCharsets.UTF_8));
    String decoded = new String(Base64.getDecoder().decode(encoded), StandardCharsets.UTF_8);
    System.out.println(encoded);
    System.out.println(decoded);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207032303637.png" alt="image-20220703230304565" style="zoom:67%;" />



# 类和接口

## Records类型⭐

> 我们对Java最大的意见是啥？当然是太繁琐了，一个简单的功能，繁重的语法要整出好几十行，不急，改进这就来了，看看新的Recodes类型吧！
>

假设你现在有这么一个类:

```java
public class Person {
    private String name;
    private int age;
    // 下面是有参无参，get/set、equals、hashcode、toString方法，特别繁琐
    ...
}
```

> 这是一个典型的不可变的数据对象，equals ()方法， hashCode()方法，toString()方法其实都是比较通用的。但是我们不得不为它多写那么几行代码。虽然有IDE的鼎力协助，但是看上去还是不怎么爽（如果没有IDE，更要哭了）。不过没事Records来了！用Records来表示上面的类，你只需要:
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211251501118.png" alt="image-20221125150140061" style="zoom: 67%;" />

```java
record Person(String name, String sex) { }
```

> 是不是特别简单，record类和普通的class不一样，帮你隐式生成一些字段和构造函数。使用测试
>

```java
public static void a1() {
    Person p = new Person("张三","男"); // 能传参，说明写了有参构造
    System.out.println("p = " + p); // 能成功打印对象，说明重写了toString
    System.out.println(p.name()+p.sex());
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301011535285.png" alt="image-20230101153533212" style="zoom:80%;" />

## 接口支持私有方法

> 当我们在一个接口里写多个默认方法或者静态方法的时候，可能会遇到程序重复的问题。我们可以把这些重复的程序提取出来，创建一个新的方法，用private进行修饰，这样就创造了一个只有接口可以调用的私有方法。

> 在 Java 9 中，接口更加的灵活和强大，连方法的访问权限修饰符都可以声明为 private 的了，此时方法将不会成为你对外暴露的 API的一部分

```java
public interface UserDao {
    default void methodA(){
        System.out.println("methodA...");
        System.out.println("A....");
        System.out.println("B....");
        System.out.println("C....");
    }
    
    default void methodB(){
        System.out.println("methodB...");
        System.out.println("A....");
        System.out.println("B....");
        System.out.println("C....");
    }
}
```

```java
public interface MyInterface {
    // jdk 7 声明的抽象方法
    void thod1();
    // jdk 8 声明的静态抽象方法
    public static void thod2(){
        System.out.println("默认 static 方法");
    };
    // jdk 8 声明的默认方法
    default void thod3(){
        System.out.println("默认方法");
        thod1();
        thod4();
    };
    // jdk 9 声明的私有方法
    private void  thod4(){
        System.out.println("私有方法");
        thod1();
    }
}
```

> 存在的问题： 以上代码的methodA与methodB存在着代码冗余问题，我们可以把这部分公共的方法抽取成私有的方法提供给接口内部去使用。接口私有方法的作用：**解决接口中默认方法与静态方法代码重复的问题**
>
> 因为接口中静态方法和默认方法都是有方法体的，有方法体就有重复代码的可能

```java
public interface UserDao {
    default void methodA(){
        System.out.println("methodA...");
        commons();
    }
    default void methodB(){
        System.out.println("methodB...");
        commons();
    }
    //定一个私有的方法，把重复部分的代码抽离出来。然后在methodA与methodB方法内部去调用。
    //私有方法只能在本类中调用，这里包括接口的实现类也不能调用。
    private void commons(){
        System.out.println("A....");
        System.out.println("B....");
        System.out.println("C....");
    }
}
```

```java
class UserDaoImpl implements UserDao {
    public static void main(String[] args) {
        UserDaoImpl dao = new UserDaoImpl();
        dao.methodA();
        dao.methodB();
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021045720.png" alt="image-20230102104519620" style="zoom: 67%;" />

# 集合

## 不可变集合

> 要创建一个只读、不可改变的集合，必须构造和分配它，然后添加元素，最后包装成一个不可修改的集合。
>

### 1 JDK9之前做法

为了创建不可变集合，JDK9之前酱紫的：

```java
public static void main(String[] args) {
    List<String> namesList = new ArrayList <>();
    namesList.add("Joe");
    namesList.add("Bob");
    namesList.add("Bill");
    namesList = Collections.unmodifiableList(namesList);
    System.out.println(namesList);
}
```

缺点：我们一下写了五行。即：它不能表达为单个表达式。

### 2 稍微简单处理

当然，我们也可以稍微简单点处理：

简单操作一

```java
public static void main(String[] args) {
    List<String> list =
            Collections.unmodifiableList(Arrays.asList("a", "b", "c"));
    Set<String> set = Collections.unmodifiableSet(new
            HashSet<>(Arrays.asList("a", "b", "c")));
    System.out.println(list);
    System.out.println(set);
}
```

简单操作二

```java
public static void main(String[] args) {
    //如下操作不适用于 jdk 8 及之前版本,适用于 jdk 9
    Map<String,Integer> map = Collections.unmodifiableMap(new HashMap<>(){
          {   put("a", 1);
              put("b", 2);
              put("c", 3);
          }
    });
    map.forEach((k,v) -> System.out.println(k + ":" + v));
}
```

### 3 JDK9做法⭐

> Java 9 因此引入了方便的方法，这使得类似的事情更容易表达。调用集合中静态方法 of()，可以将不同数量的参数传输到此工厂方法。中。此功能可用于 Set 和 List，也可用于 Map 的类似形式。此时得到的集合，是不可变的：在创建后，继续添加元素到这些集合会导致“UnsupportedOperationException” 。由于 Java 8 中接口方法的实现，可以直接在 List，Set 和 Map 的接口内定义这些方法，便于调用。

> JDK 9 提供了List.of()、Set.of()、Map.of()和Map.ofEntries()等工厂方法来创建不可变集合：

```java
public static void main(String[] args) {
    List<String> list = List.of("a", "b", "c");
    
    Set<String> set = Set.of("a", "b", "c");
    
    Map<String, Integer> map1 = Map.of("Tom", 12, "Jerry", 21, "Lilei", 33);

    Map<String, Integer> map2 = Map.ofEntries(
            Map.entry("Tom", 89),
            Map.entry("Jim", 78),
            Map.entry("Tim", 98)
    );
}
```

## 复制集合 copyof

> copyOf会将集合中的元素复制到一个新集合中,而这个集合是不能去增删改,返回的是不可变的集合

```java
public static void a1() {
    // 学习集合新增的copyof方法
    List<String> list = new ArrayList<>();
    list.add("aa");
    list.add("bb");
    list.add("cc");

    List<String> copyOfList = List.copyOf(list);
    for (String s : copyOfList) {
        System.out.println(s);
    }

    System.out.println("--------------");
    Set<String> set = new HashSet<>();
    set.add("aa");
    set.add("bb");

    Set<String> copyOfSet = Set.copyOf(set);
    for (String s : copyOfSet) {
        System.out.println(s);
    }
    // copyOfSet.add("cc");

    System.out.println("-------------");
    Map<String, String> map = new HashMap<>();
    map.put("k1", "v1");
    map.put("k2", "v2");

    Map<String, String> copyOfMap = Map.copyOf(map);
    Set<Map.Entry<String, String>> entrySet = copyOfMap.entrySet();
    for (Map.Entry<String, String> entry : entrySet) {
        System.out.println(entry.getKey() + "::" + entry.getValue());
    }

    // copyOfMap.put("k1", "v13");
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301012129747.png" alt="image-20230101212941657" style="zoom:67%;" />

## 钻石操作符<泛型>升级

- 钻石操作符是在 java 7 中引入的，可以让代码更易读，但它不能用于匿名的内部类。
- 在 java 9 中， 它可以与匿名的内部类一起使用，从而提高代码的可读性。

```java
//JDK 5,6
Map<String, String> map56 = new HashMap<String,String>();
//JDk 7,8
Map<String, String> map78 = new HashMap<>();
//JDK 9 结合匿名内部类的实现
Map<String, String> map9 = new HashMap<>(){};
```

在 java 8 中如下的操作是会报错的：

```java
public static List<String> flattenStrings(List<String>... lists) {
    Set<String> set = new HashSet<>(){}; // 注意后面跟了个{}
    for(List<String> list : lists) {
        set.addAll(list);
    }
    return new ArrayList<>(set);
}
```

编译报错信息：'<>' cannot be used with anonymous classes

**使用举例**

```java
public static void main(String[] args) {
    List<String> list = new ArrayList<>();
    Collections.addAll(list,"1","2","3");
    List<String> list1 = flattenStrings(list);
    System.out.println(list1);
}
```

```java
public static List<String> flattenStrings(List<String>... lists) {
    Set<String> set = new HashSet<>(){};
    for(List<String> list : lists) {
        set.addAll(list);
    }
    return new ArrayList<>(set);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211251053320.png" alt="image-20221125105325243" style="zoom:80%;" />

# Stream

> Java 9 中，Stream API 变得更好，Stream 接口中添加了 4 个新的方法：**dropWhile, takeWhile, ofNullable**，还有个 iterate 方法的新重载方法，可以让你提供一个 Predicate (判断条件)来指定什么时候结束迭代。

## 1 结果聚合

> teeing 收集器已公开为静态方法Collectors::teeing。该收集器将其输入转发给其他两个收集器，然后将它们的结果使用函数合并。

```java
public static void t1(){
    List<Student> list = Arrays.asList(
            new Student("唐一", 55),
            new Student("唐二", 60),
            new Student("唐三", 90));

    //平均分 总分
    String result = list.stream().collect(Collectors.teeing(
            Collectors.averagingInt(Student::getScore),
            Collectors.summingInt(Student::getScore),
            (s1, s2) -> s1 + ":" + s2));

    //最低分  最高分
    String result2 = list.stream().collect(Collectors.teeing(
            Collectors.minBy(Comparator.comparing(Student::getScore)),
            Collectors.maxBy(Comparator.comparing(Student::getScore)),
            (s1, s2) -> s1.orElseThrow() + ":" + s2.orElseThrow()
    ));

    System.out.println(result);
    System.out.println(result2);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212052254988.png" alt="image-20221205225429923" style="zoom:80%;" />

## 2 toList

```java
public static void t1(){
    List<String> list = Arrays.asList("1", "2", "3");
    //之前这样写
    List<Integer> oneList = list.stream()
            .map(Integer::parseInt)
            .collect(Collectors.toList());

    //现在可以这样写 (JDK16特性 )
    List<Integer> twoList = list.stream()
            .map(Integer::parseInt)
            .toList();
    System.out.println("oneList = " + oneList);
    System.out.println("twoList = " + twoList);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212052257748.png" alt="image-20221205225718694" style="zoom:80%;" />



## takeWhile

> takeWhile() ：从*Stream*中依次获取满足条件的元素，直到不满足条件为止结束获取，只**要遇到第一个不满足的条件元素马上停止获取**

```java
// takeWhile() ：从Stream中依次获取满足条件的元素，
// 直到不满足条件为止结束获取，只要遇到第一个不满足的条件元素马上停止获取
public static void testTakeWhile(){
    //1.创建一个流
    Stream<Integer> stream = Stream.of(10, 20, 30, 40, 50, 7, 60);
    //2 筛选符合条件的元素 条件：num<50
    stream.takeWhile(num->num<50).forEach(num->
         System.out.print(num+",")); // 10,20,30,40,
}
```



## dropWhile

> dropWhile 的行为与 takeWhile 相反，返回剩余的元素。使用一个断言（Predicate 接口）作为参数，直到断言语句第一次返回true，返回给定Stream的子集

```java
//- dropWhile() ： 从Stream中依次删除满足条件的元素，直到不满足条件为止结束删除
public static void testDropWhile(){
    //1.创建一个流
    Stream<Integer> stream = Stream.of(10, 20, 30, 40, 50, 7, 60);
    //2 删除符合条件的元素 条件：num<50
    stream.dropWhile(num->num<50).forEach(num->
            System.out.print(num+",")); //结果：50， 7， 60
}
```



## 3 iterate

iterate() 方法能够返回以seed（第一个参数）开头，匹配 Predicate（第二个参数）直到返回false，并使用第三个参数生成下一个元素的元素流。

```java
// 原来的控制终止方式，从1输出到10
Stream.iterate(1, i -> i + 1).limit(10).forEach(System.out::println);
// 现在的终止方式，也是输出1-10，注意看，和for循环基本一样
Stream.iterate(1, i -> i <= 10,i -> i + 1).forEach(System.out::println);
```





```java
//语法
static <T> Stream<T> iterate(T seed, Predicate<? super T> hasNext, UnaryOperator<T> next)
//代码示例
IntStream.iterate(2, x -> x < 10, x -> x*x).forEach(System.out::println);
//输出
2
4
```





## 4 ofNullable

Java 8 中 Stream 不能完全为 null，否则会报空指针异常。而 Java 9 中的ofNullable 方法允许我们创建一个单元素 Stream，可以包含一个非空元素，也可以创建一个空 Stream。

如果指定元素为非null，则获取一个元素并生成单个元素流，元素为null则返回一个空Stream。

```java
public static void main(String[] args) {
    //报 NullPointerException
    //Stream<Object> stream1 = Stream.of(null);
    //System.out.println(stream1.count());
    //不报异常，允许通过
    Stream<String> stringStream = Stream.of("AA", "BB", null);
    System.out.println(stringStream.count());//3
    
    //不报异常，允许通过
    List<String> list = new ArrayList<>();
    list.add("AA");
    list.add(null);
    System.out.println(list.stream().count());//2
    
    //ofNullable()：允许值为 null
    Stream<Object> stream1 = Stream.ofNullable(null);
    System.out.println(stream1.count());//0
    Stream<String> stream = Stream.ofNullable("hello world");
    System.out.println(stream.count());//1
}
```

### 5 Optional类中stream()的使用

```java
public static void main(String[] args) {
    List<String> list = new ArrayList<>();
    list.add("Tom");
    list.add("Jerry");
    list.add("Tim");
    Optional<List<String>> optional = Optional.ofNullable(list);
    Stream<List<String>> stream = optional.stream();
    stream.flatMap(x -> x.stream()).forEach(System.out::println);
}
```

![image-20221125112903726](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211251129826.png)



# Optional

java 9 中，java.util.Optional 添加了很多新的有用方法，如：

- stream()
- ifPresentOrElse()
- or()

ifPresentOrElse 方法的改进就是有了 else，接受两个参数 Consumer 和 Runnable。

```java
import java.util.Optional;
 
public class OptionalTest {
   public static void main(String[] args) {
      Optional<Integer> optional = Optional.of(1);
 
      optional.ifPresentOrElse( x -> System.out.println("Value: " + x),() -> 
         System.out.println("Not Present."));
 
      optional = Optional.empty();
 
      optional.ifPresentOrElse( x -> System.out.println("Value: " + x),() -> 
         System.out.println("Not Present."));
   }  
}
```



# 条件判断

## Switch ⭐

> Java的switch语句是一个变化较大的语法（可能是因为Java的switch语句一直不够强大、熟悉swift或者js语言的同学可与swift的switch语句对比一下，就会发现Java的switch相对较弱），因为Java的很多版本都在不断地改进switch语句：

下面简单回顾一下switch的进化阶段：

- 从Java 5+开始，Java的switch语句可使用枚举了
- 从Java 7+开始，Java的switch语句支持使用String类型的变量和表达式了
- 从Java 11+开始，Java的switch语句会自动对省略break导致的贯穿提示警告（以前需要使用-X:fallthrough选项才能显示出来) 。
- 但从JDK12开始，Java的switch语句有了很大程度的增强。

### 传统switch写法

```java
public static void a1() {
    // 声明变量score，并为其赋值为'C'
    var score = 'C';
    // 执行switch分支语句
    switch (score) {
        case 'A':
            System.out.println("优秀");
        case 'B':
            System.out.println("良好");
        case 'C':
            System.out.println("中");
        case 'D':
            System.out.println("及格");
        case 'E':
            System.out.println("不及格");
            break;
        default:
            System.out.println("数据非法！");
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301011748577.png" alt="image-20230101174841492" style="zoom:80%;" />

### 不需要break

> 在JDK 12之前如果switch忘记写break将导致贯穿，在JDK 12中对switch的这一贯穿性做了改进。你只要将case后面的冒号（:）改成箭头，那么你即使不写break也不会贯穿了，因此上面程序可改写如下形式：

```java
public static void a1() {
    // 声明变量score，并为其赋值为'C'
    var score = 'C';
    // 执行switch分支语句
    switch (score){
        case 'A' -> System.out.println("优秀");
        case 'B' -> System.out.println("良好");
        case 'C' -> System.out.println("中");
        case 'D' -> System.out.println("及格");
        case 'E' -> System.out.println("不及格");
        default -> System.out.println("成绩数据非法！");
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301011755203.png" alt="image-20230101175541117" style="zoom:80%;" />

### 支持switch表达式

Java 12的switch甚至可作为表达式了——不再是单独的语句。例如如下程序。上面程序直接将switch表达式的值赋值给s变量，这样switch不再是一个语句，而是一个表达式.

```java
public static void a1() {
    var score = 'B';
    String rs = switch (score){
        case 'A' -> "优秀";
        case 'B' -> "良好";
        case 'C' -> "中";
        case 'D' -> "及格";
        case 'E' -> "较差";
        default -> "成绩数据非法！";
    };
    System.out.println("执行的结果："+rs);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301011751385.png" alt="image-20230101175156298" style="zoom:80%;" />



### 支持多值匹配

> 当你把switch中的case后的冒号改为箭头之后，此时switch就不会贯穿了，但在某些情况下，程序本来就希望贯穿比如我就希望两个case共用一个执行体！JDK 12的switch中的case也支持多值匹配，这样程序就变得更加简洁了

```java
public static void a1() {
    var score = 'D';
    String rs = switch (score){
        case 'A','B' -> "优秀";
        case 'C','D' -> "中等";
        case 'E' -> "一般";
        default -> "成绩数据非法！";
    };
    System.out.println("执行的结果："+rs);
}
```

### 支持yield关键字

> jdk13使用yield，我们现在可以有效地从 switch 表达式返回值，并能够更容易实现策略模式。

引入 yield 关键字

传统的switch：

```java
private static String getText(int number) {
    String result = "";
    switch (number) {
        case 1, 2:result = "one or two";break;
        case 3:result = "three";break;
        case 4, 5, 6:result = "four or five or six";break;
        default:result = "unknown";break;
    }
}
```

Java 13之后，value break 语句不再被编译，而是用 yield 来进行值返回

```java
private static String getText(int number) {
    return switch (number) {
        case 1, 2:
            yield "one or two";
        case 3:
            yield "three";
        case 4, 5, 6:
            yield "four or five or six";
        default:
            yield "unknown";
    };
}
```

## catch中捕获多个异常类型

JDK 7之前

```java
try{
   //do something
} catch (FirstException e) {
     logger.error(e);
} catch (SecondException e) {
     logger.error(ex);
}
```

JDk 7之后

```java
try{
   //do something
} catch (FirstException | SecondException e) {
     logger.error(e);
}
```



# 文件 IO

## 释放资源优化

### jdk8之前释放资源代码

```java
import java.io.FileInputStream;
import java.io.IOException;

//回顾jdk8之前释放资源的代码
public class JDK7 {
    public static void main(String[] args) throws IOException {
        FileInputStream fileInputStream = null;
        try {
            //1. 建立程序与文件的数据通道
            fileInputStream = new FileInputStream("a.txt");
            //2. 创建字节数组缓冲区
            byte[] buf = new byte[1024];
            int length = 0 ;
            //3. 读取数据，并且输出
            while((length = fileInputStream.read(buf))!=-1){
                System.out.println(new String(buf,0,length));
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            fileInputStream.close();
        } 
    }
}
```

> 通过上述代码我们可以看到释放资源代码非常累赘， 如果释放资源较多的时候，很容易就会出现释放资源代码超过了正常业务的代码. 对此随着jdk版本的不断更新迭代，也对释放资源代码做了很大幅度的优化。

### JDK8释放资源代码

```java
import java.io.FileInputStream;
import java.io.IOException;
//回顾jdk8之前释放资源的代码
public class JDK8 {
    public static void main(String[] args) {
        //需要释放资源的流，填写在try()中
        //注意：初始化流对象的代码一定要写在try()内部中。
        try(FileInputStream fileInputStream = new FileInputStream("F:/a.txt");){
            //1. 建立程序与文件的数据通道
            //2. 创建字节数组缓冲区
            byte[] buf = new byte[1024];
            int length = 0 ;
            //3. 读取数据，并且输出
            while((length = fileInputStream.read(buf))!=-1){
                System.out.println(new String(buf,0,length));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

> 注意：JDK8开始已经不需要我们再手动关闭资源，只需要把要关闭资源的代码放入try语句中即可，但是要求初始化资源的语句必须位于try语句中

### JDK9释放资源代码⭐

```java
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
//回顾jdk8之前释放资源的代码
public class JDK9 {
    public static void main(String[] args) throws FileNotFoundException {
        //需要释放资源的流，填写在try()中
        FileInputStream fileInputStream = new FileInputStream("F:/a.txt");
        try(fileInputStream){
            //1. 建立程序与文件的数据通道
            //2. 创建字节数组缓冲区
            byte[] buf = new byte[1024];
            int length = 0 ;
            //3. 读取数据，并且输出
            while((length = fileInputStream.read(buf))!=-1){
                System.out.println(new String(buf,0,length));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

java 9 中，用资源语句编写 try 将更容易，我们可以在 try 子句中使用已经初始化过的资源，此时的资源是 final 的：

```java
InputStreamReader reader = new InputStreamReader(System.in);
OutputStreamWriter writer = new OutputStreamWriter(System.out);
try(reader;writer){
    // reader 是 final 的，不可再被赋值
    // reader = null;
}catch (IOException e){
    e.printStackTrace();
}
```

## 获取文件信息

Java7 提供了全新的NIO2.0 API，方便文件管理的编码。如，可以在java.nio.file包下使用Path、Paths、Files、WatchService等常用类型。

```java
public static void main(String[] args) throws Exception {
    Path path = Path.of("itheima.txt"); //创建Path对象
    System.out.println(path.getFileName()); //获取当前文件名称
    System.out.println(path.toAbsolutePath()); // 获取文件绝对路径
    byte[] bytes= Files.readAllBytes(path);  //读取文件
    System.out.println(new String(bytes, StandardCharsets.UTF_8));
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021138966.png" alt="image-20230102113854867" style="zoom:67%;" />

## 读写writeString | readString

```java
public static void a1() throws IOException {
    // Files类更方便的读写数据方法
    Path of = Path.of("itheima.txt");
    Files.writeString(of,"Java的学习，JDK11新特性！"); // 写入数据
    // Files类更方便的读数据方法
    String rs = Files.readString(of, StandardCharsets.UTF_8);
    System.out.println(rs);
}
```

## 复制文件 transferTo

### 以前IO流复制文件

```java
// 以前IO流复制文件
public static void test01() throws Exception {
    FileReader fr = new FileReader("a.txt");
    FileWriter fw = new FileWriter("b.txt");
    // 以前复制文件代码比较麻烦,循环读写
    char[] chs = new char[1024];
    int len;
    while ((len = fr.read(chs)) != -1) {
        fw.write(chs, 0, len);
    }
    fw.close();
    fr.close();
}
```

### 现在IO流复制文件

```java
// 使用 transferTo方法复制文件
public static void test02() throws IOException {
    FileReader fr = new FileReader("a.txt");
    FileWriter fw = new FileWriter("c.txt");
    // 将输入流中的数据转到输出流中
    fr.transferTo(fw);
    fw.close();
    fr.close();
}
```

```java
public static void a1() throws IOException {
    // InputStream 还终于有了一个非常有用的方法：transferTo
    try(InputStream is = new FileInputStream("itheima.txt");
        OutputStream os = new FileOutputStream("newItheima.txt");){
        // 开始把字节输入流中的全部字节数据转移到字节输出流中去。
        is.transferTo(os);
        System.out.println("复制完成！");
    }catch (Exception e){
        e.printStackTrace();
    }
}
```

## PrintStream

```java
// 需求,使用GBK编码来打印内容
public static void test02() throws IOException {
    PrintStream ps = new PrintStream("ps2.txt", Charset.forName("gbk"));
    ps.print("你好中国");
    ps.close();
}

// 观察PrintStream默认使用什么编码?
// IDEA默认使用的是UTF-8编码
public static void test01() throws Exception {
    PrintStream ps = new PrintStream("ps.txt");
    ps.println("你好中国");
    ps.close();
}
```

## 文件匹配 mismatch

```java
public static void a1() throws IOException {
    Writer fw = new FileWriter("a.txt");
    fw.write("add");
    fw.write("bbb");
    fw.write("ccc");
    fw.close();

    Writer fw1 = new FileWriter("b.txt");
    fw1.write("add3dd");
    fw1.write("bbb");
    fw1.write("ccc");
    fw1.close();
    // 两个文件的匹配：mismatch方法
    // 如果两个文件没有不匹配的，完全匹配返回-1.
    // 如果不匹配会返回第一个不匹配的字符索引值
    System.out.println(Files.mismatch(Path.of("a.txt") ,Path.of("b.txt"))); // 3
}
```

## ByteArrayOutputStream

通过ByteArrayOutputStream新增的toString(Charset)， 可以将字节数组输出流中的数据按照指定的编码转成字符串

```java
public static void test02() throws IOException {
    String str = "你好";
    // byte[] bytes = str.getBytes(); // 使用默认编码UTF-8将字符串转成字节数组
    // 使用指定的GBK编码将字符串转成字节数组
    byte[] bytes = str.getBytes(Charset.forName("GBK")); 
    System.out.println(Arrays.toString(bytes));
    // UTF-8 [-28, -67, -96, -27, -91, -67]
    // GBK [-60, -29, -70, -61]
    ByteArrayInputStream bais = new ByteArrayInputStream(bytes);
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    int b;
    while ((b = bais.read()) != -1) {
        baos.write(b);
    }
    // System.out.println(baos.toString()); // 使用默认的UTF-8编码将字节数组转成字符串
    // 使用指定的gbk编码将字节数组转成字符串
    System.out.println(baos.toString(Charset.forName("GBK"))); 
    baos.close();
    bais.close();
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301012142433.png" alt="image-20230101214207337" style="zoom:80%;" />

# HTTP 客户端

## HTTP Client的优势

API必须是易于使用的，包括简单的阻塞模式

必须支持通知机制如HTTP消息头收到、错误码、HTTP消息体收到

简洁的API能够支持80-90%的需求

必须支持标准和通用身份验证机制

必须能够轻松使用WebSocket

必须支持HTTP 2

必须执行与现有网络API一致的安全检查

必须对lambda表达式等新语言功能很友好

应该对嵌入式系统友好，避免永久运行的后台线程

必须支持HTTPS / TLS

满足HTTP 1.1和HTTP 2的性能要求

需求：使用Http Client请求如下网址内容：

[请求网站](http://api.k780.com:88/?app=life.time&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301011713738.png" alt="image-20230101171353628" style="zoom: 67%;" />

## 发起同步请求

```java
public static void a1() throws Exception {
    // 地址
    String url = "http://api.k780.com:88/?app=life.time&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json";
    // 1.创建一个HttpClient客户都对象
    HttpClient client = HttpClient.newHttpClient();

    // 2.创建一个请求对象：request ,封装地址，参数，请求方式（Get Post）
    // 注意：GET()方法的调用可以省略，默认就是get请求。
    HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url)).GET().build();

    // 3.通过HttpClient对象发起request请求得到一个响应结果对象
    /*
     * 参数一：请求对象
     * 参数二：响应的结果处理成字符串结果。
     * 返回的是一个响应对象。
     */
    HttpResponse<String> response = client.send(request
            ,HttpResponse.BodyHandlers.ofString());

    // 4.得到响应码
    int code = response.statusCode();
    // 5.得到响应的结果数据：字符串
    String rs = response.body();
    ObjectMapper mapper = new ObjectMapper();
    Map map = mapper.readValue(rs, Map.class); // JSON字符串转换成Map
    map.forEach((k,v)->{
        System.out.println("k = " + k + " v= " + v);
    });
    // 6.输出结果
    System.out.println("响应码 = " + code);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301011728164.png" alt="image-20230101172830061" style="zoom:80%;" />

## 发起异步请求

```java
public static void send02(){
    // 地址
    String url = "http://api.k780.com:88/?app=life.time&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json";
    // 1.创建一个HttpClient客户都对象
    HttpClient client = HttpClient.newHttpClient();

    // 2.创建一个请求对象：request ,封装地址，参数，请求方式（Get Post）
    // 注意：GET()方法的调用可以省略，默认就是get请求。
    HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url)).GET().build();

    // 3.通过客户端对象发起request的异步请求
    CompletableFuture<HttpResponse<String>> future =
            client.sendAsync(request,HttpResponse.BodyHandlers.ofString());

    // 4.异步：监听结果数据
    future.whenComplete((stringHttpResponse,throwable) -> {
        // 5.结果数据的处理
        if(throwable != null){
            // 请求出错了
            throwable.printStackTrace();
        }else{
            int code = stringHttpResponse.statusCode();
            String rs = stringHttpResponse.body();
            System.out.println(code+"->"+rs);
        }
    }).join(); // 阻塞等待异步结果。

    System.out.println("结束程序!");
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301011734175.png" alt="image-20230101173409086" style="zoom:80%;" />

























