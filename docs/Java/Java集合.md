



# 集合概述

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220411212356916.png" alt="image-20220411212356916" style="zoom:80%;" />

## 为什么要用集合

> 集合和数组类似，都是容器。**为什么用集合？**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301050929919.png" alt="image-20230105092953767" style="zoom: 50%;" />

### 数组的特点

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220411212638854.png" alt="image-20220411212638854" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301050930945.png" alt="image-20230105093029821" style="zoom:67%;" />

### 集合的特点

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301050933692.png" alt="image-20230105093319554" style="zoom: 67%;" />



## 集合体系结构

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301050934435.png" alt="image-20230105093452316" style="zoom: 50%;" />

> Collection单列集合，每个元素（数据）只包含一个值。
>
> Map双列集合，每个元素包含两个值（键值对）。

## Collection 集合体系⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301050939074.png" alt="image-20230105093917941" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301050940447.png" alt="image-20230105094013346" style="zoom:67%;" />

## 集合对于泛型的支持

> 集合都是支持泛型的，可以在编译阶段约束集合只能操作某种数据类型
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220411213628254.png" alt="image-20220411213628254" style="zoom:67%;" />

## 集合如何选择

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051709257.png" alt="image-20230105170922108" style="zoom: 50%;" />

# Collection 集合

> 注意：Collection是List和Set集合的父类，这里的方法是List和Set的公有方法，List和Set均可使用这些方法。
>

## Collection 初体验

```java
// 有序 可重复 有索引
Collection list = new ArrayList();
list.add("Java");
list.add("Java");
list.add("Mybatis");
list.add(23);
list.add(23);
list.add(false);
list.add(false);
System.out.println(list);
```

```java
// 无序 不重复  无索引
Collection list1 = new HashSet();
list1.add("Java");
list1.add("Java");
list1.add("Mybatis");
list1.add(23);
list1.add(23);
list1.add(false);
list1.add(false);
System.out.println(list1);
```

```java
Collection<Double> list4 = new ArrayList<>();
list4.add(23.4);
list4.add(233.0);
list4.add(233.3);
```

## 常用API

> Collection是单列集合的祖宗接口，它的功能是全部单列集合都可以继承使用的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220411213216596.png" alt="image-20220411213216596" style="zoom:67%;" />

```java
public class CollectionDemo {
    public static void main(String[] args) {
        // HashSet:添加的元素是无序，不重复，无索引。
        Collection<String> c = new ArrayList<>();
        // 1.添加元素, 添加成功返回true。
        c.add("Java");
        c.add("HTML");
        System.out.println(c.add("HTML"));
        c.add("MySQL");
        c.add("Java");
        System.out.println(c.add("黑马"));
        System.out.println(c); // [Java, HTML, HTML, MySQL, Java, 黑马]

        // 2.清空集合的元素。
        // c.clear();
        // System.out.println(c);

        // 3.判断集合是否为空 是空返回true,反之。
        System.out.println(c.isEmpty());

        // 4.获取集合的大小。
        System.out.println(c.size());

        // 5.判断集合中是否包含某个元素。
        System.out.println(c.contains("Java"));  // true
        System.out.println(c.contains("java")); // false
        System.out.println(c.contains("黑马")); // true

        // 6.删除某个元素:如果有多个重复元素默认删除前面的第一个！
        System.out.println(c.remove("java")); // false
        System.out.println(c);
        System.out.println(c.remove("Java")); // true
        System.out.println(c);

        // 7.把集合转换成数组  [HTML, HTML, MySQL, Java, 黑马]
        Object[] arrs = c.toArray();
        System.out.println("数组：" + Arrays.toString(arrs));

        System.out.println("----------------------拓展----------------------");
        Collection<String> c1 = new ArrayList<>();
        c1.add("java1");
        c1.add("java2");
        Collection<String> c2 = new ArrayList<>();
        c2.add("赵敏");
        c2.add("殷素素");
        // addAll把c2集合的元素全部倒入到c1中去。
        c1.addAll(c2);
        System.out.println(c1);
        System.out.println(c2);
    }
}
```

## 集合遍历方式

### 最普通方式

#### 初始版本

```java
for(int i = 0; i < lists.size(); i++) {
    System.out.println(lists.get(i));
}
```

- 优点：较常见，易于理解
- 缺点：每次都要计算 list.size()

#### 进阶版本

数组长度提取出来

```java
int m = list.size();
for (int i = 0; i < m; i++) {
      System.out.println(list.get(i));
}
```

- 优点：不必每次都计算
- 缺点：m的作用域不够小，违反了最小作用域原则；不能在for循环中操作list的大小，比如除去或新加一个元素

#### 高级版本

采用倒序的写法

```java
for (int i = list.size() - 1; i >= 0; i--) {
	System.out.println(list.get(i));
}
```

- 优点：不必每次都计算 ，变量的作用域遵循最小范围原则。
- 缺点：结果的顺序会反；看起来不习惯，不易读懂。
- 适用场合：与显示结果顺序无关的地方：比如保存之前数据的校验。



### iterator 迭代器遍历

> - 遍历就是一个一个的把容器中的元素访问一遍
> - 迭代器在Java中的代表是**Iterator**，迭代器是集合的专用遍历方式
> - 迭代器如果取元素越界：**会出现NoSuchElementException异常**

获取迭代器

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220411225449066.png" alt="image-20220411225449066" style="zoom:67%;" />

迭代器方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220411225522261.png" alt="image-20220411225522261" style="zoom:67%;" />

执行流程

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220411225604998.png" alt="image-20220411225604998" style="zoom: 50%;" />

```java
Iterator<String> it = list1.iterator();
while(it.hasNext()){  
    System.out.println(it.next());
}
```



### foreach 遍历

> - 增强for循环：**既可以遍历集合也可以遍历数组**。
> - 它是JDK5之后出现的，其内部原理是一个Iterator迭代器，**遍历集合相当于是迭代器的简化写法**。
> - 实现Iterable接口的类才可以使用迭代器和增强for，Collection接口已经实现了Iterable接口。
> - **修改第三方变量的值不会影响到集合中的元素**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220411230118229.png" alt="image-20220411230118229" style="zoom:67%;" />

```java
for (String s : list1) { 
    System.out.println(s);
}
```



### Lambda 遍历

得益于JDK 8开始的新技术Lambda表达式，提供了一种更简单、更直接的遍历集合的方式

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220411230937605.png" alt="image-20220411230937605" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220411230955473.png" alt="image-20220411230955473" style="zoom:67%;" />

```java
public static void t1() {
    List<String> lists = new ArrayList<>();
    Collections.addAll(lists,"张三","李四");
    //简写方式
    lists.forEach(s -> {
        if (s.equals("张三")) {
            System.out.println(s);
        }
    });
    
    //超级简写
    lists.forEach(System.out::println);
    
    //正常方式
    lists.forEach(new Consumer<String>() {
        @Override
        public void accept(String s) {
            System.out.println(s);
        }
    });
}
```



## 存储自定义类型的对象

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051008572.png" alt="image-20230105100844405" style="zoom:67%;" />

定义实体类

```java
public class Movie {
    private String name;
    private double score;
    private String actor;
    // 无参有参，set get , toString方法
}
```

集合存储

```java
public static void test1() {
    // 1、定义一个电影类
    // 2、定义一个集合对象存储3部电影对象
    Collection<Movie> movies = new ArrayList<>();
    movies.add(new Movie("《你好，李焕英》", 9.5, "张小斐,贾玲,沈腾,陈赫"));
    movies.add(new Movie("《唐人街探案》", 8.5, "王宝强,刘昊然,美女"));
    movies.add(new Movie("《刺杀小说家》",8.6, "雷佳音,杨幂"));
    System.out.println(movies);

    // 3、遍历集合容器中的每个电影对象
    for (Movie movie : movies) {
        System.out.println("片名：" + movie.getName());
        System.out.println("得分：" + movie.getScore());
        System.out.println("主演：" + movie.getActor());
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220412100146825.png" alt="image-20220412100146825" style="zoom:67%;" />



# List集合

## List系列集合特点

> - ArrayList、LinekdList ：有序，可重复，有索引。
> - 有序：存储和取出的元素顺序一致
> - 有索引：可以通过索引操作元素
> - 可重复：存储的元素可以重复

1、ArrayList：底层数据结构是数组，查询快，增删慢，线程不安全，效率高，可以存储重复元素

2、LinkedList 底层数据结构是链表，查询慢，增删快，线程不安全，效率高，可以存储重复元素

3、Vector:底层数据结构是数组，查询快，增删慢，线程安全，效率低，可以存储重复元素

## List 集合特有方法

> List集合因为支持索引，所以多了很多索引操作的独特api，其他Collection的功能List也都继承了

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051138310.png" alt="image-20230105113856181" style="zoom:67%;" />

```java
public class ListDemo01 {
    public static void main(String[] args) {
        // 1.创建一个ArrayList集合对象：
        // List:有序，可重复，有索引的。
        ArrayList<String> list = new ArrayList<>(); // 一行经典代码！
        list.add("Java");
        list.add("Java");
        list.add("HTML");
        list.add("HTML");
        list.add("MySQL");
        list.add("MySQL");

        // 2.在某个索引位置插入元素。
        list.add(2, "黑马");
        System.out.println(list);

        // 3.根据索引删除元素,返回被删除元素
        System.out.println(list.remove(1));
        System.out.println(list);

        // 4.根据索引获取元素:public E get(int index):返回集合中指定位置的元素。
        System.out.println(list.get(1));

        // 5.修改索引位置处的元素: public E set(int index, E element)
        System.out.println(list.set(1, "传智教育"));
        System.out.println(list);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051141935.png" alt="image-20230105114120826" style="zoom:67%;" />

## List 遍历小结

```java
public class ListDemo02 {
    public static void main(String[] args) {
        List<String> lists = new ArrayList<>();
        lists.add("java1");
        lists.add("java2");
        lists.add("java3");

        // （1）for循环
        System.out.println("-----------------------");

        for (int i = 0; i < lists.size(); i++) {
            String ele = lists.get(i);
            System.out.println(ele);
        }

        // （2）迭代器
        System.out.println("-----------------------");
        Iterator<String> it = lists.iterator();
        while (it.hasNext()){
            String ele = it.next();
            System.out.println(ele);
        }

        // （3）foreach
        System.out.println("-----------------------");
        for (String ele : lists) {
            System.out.println(ele);
        }

        // （4）JDK 1.8开始之后的Lambda表达式
        System.out.println("-----------------------");
        lists.forEach(s -> {
            System.out.println(s);
        });

        // （5）JDK 1.8开始之后的Lambda表达式升级版
        System.out.println("-----------------------");
        lists.forEach(System.out::println);
    }
}
```

## 集合分片

前些天在实现 MyBatis 批量插入时遇到了一个问题，当批量插入的数据量比较大时，会导致程序执行报错

> 原因是 MySQL 只能执行一定长度的 SQL 语句，但当插入的数据量较多时，会生成一条很长的 SQL，这样程序在执行时就会报错。

> 要解决这个问题，有两种方法：第一，设置 MySQL 可以执行 SQL 的最大长度；第二，将一个大 List 分成 N 个小 List 进行。由于无法准确的界定程序中最大的 SQL 长度，所以最优的解决方案还是第二种，于是就有了今天的这篇文章。

### 简介

将一个 List 分成多个小 List 的过程，我们称之为分片，当然也可以叫做“List 分隔”，选一个你喜欢的、好理解的叫法就行。

在 Java 中，分片的常见实现方法有以下几种：

1. 使用 Google 的 Guava 框架实现分片；
2. 使用 Apache 的 commons 框架实现分片；
3. 使用国产神级框架 Hutool 实现分片；
4. 使用 JDK 8 中提供 Stream 实现分片；
5. 自定义分片功能。

接下来我们分别来看。

### 1.Google Guava(推荐)

先在项目的 pom.xml 中添加框架支持，增加以下配置：

```xml
<!-- google guava 工具类 -->
<!-- https://mvnrepository.com/artifact/com.google.guava/guava -->
<dependency>
  <groupId>com.google.guava</groupId>
  <artifactId>guava</artifactId>
  <version>31.0.1-jre</version>
</dependency>
```

有了 Guava 框架之后，只需要使用 Lists.partition 方法即可实现分片，如下代码所示：

```java
@Test
public void test1() {
    // 原集合
    List<String> OLD_LIST = Arrays.asList("唐僧,悟空,八戒,沙僧,曹操,刘备,孙权".split(","));
    // 集合分片
    List<List<String>> newList = Lists.partition(OLD_LIST, 3);
    // 打印分片集合
    newList.forEach(i -> {
        System.out.println(i);
        System.out.println("集合长度：" + i.size());
    });
}
```

以上代码的执行结果如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206301518898.png" alt="image-20220630151850834" style="zoom:67%;" />



### 2.apache commons

先在项目的 pom.xml 中添加框架支持，增加以下配置：

```xml
<!-- apache 集合工具类 -->
<!-- https://mvnrepository.com/artifact/org.apache.commons/commons-collections4 -->
<dependency>
  <groupId>org.apache.commons</groupId>
  <artifactId>commons-collections4</artifactId>
  <version>4.4</version>
</dependency>
```

有了  commons 框架之后，只需要使用 ListUtils.partition 方法即可实现分片，如下代码所示：

```java
@Test
public void test1() {
    // 原集合
    List<String> OLD_LIST = Arrays.asList("唐僧,悟空,八戒,沙僧,曹操,刘备,孙权".split(","));
    // 集合分片
    List<List<String>> newList = ListUtils.partition(OLD_LIST, 3);
    // 打印分片集合
    newList.forEach(i -> {
        System.out.println(i);
        System.out.println("集合长度：" + i.size());
    });
}
```

以上代码的执行结果如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206301520580.png" alt="image-20220630152010498" style="zoom:67%;" />

### 3.Hutool

先在项目的 pom.xml 中添加框架支持，增加以下配置：

```xml
<!-- 工具类 hutool -->
<!-- https://mvnrepository.com/artifact/cn.hutool/hutool-all -->
<dependency>
  <groupId>cn.hutool</groupId>
  <artifactId>hutool-all</artifactId>
  <version>5.7.14</version>
</dependency>
```

有了 Hutool 框架之后，只需要使用 ListUtil.partition 方法即可实现分片，如下代码所示：

```java
@Test
public void test1() {
    // 原集合
    List<String> OLD_LIST = Arrays.asList("唐僧,悟空,八戒,沙僧,曹操,刘备,孙权".split(","));
    // 分片处理
    List<List<String>> newList = ListUtil.partition(OLD_LIST, 3);
    newList.forEach(i -> {
        System.out.println("集合长度：" + i.size());
        System.out.println(i);
    });
}
```

以上代码的执行结果如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206301527981.png" alt="image-20220630152737913" style="zoom:67%;" />



### 5.自定义分片

如果你不想引入第三方框架，并且使用 Stream 也无法满足你的需求，你就可以考虑自己写代码来实现分片功能了。因为此方式不常用，所以咱们这里只给出关键方法。

自定义分片功能的关键实现方法是 JDK 自带的 subList 方法，如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206301522391.png" alt="image-20220630152237325" style="zoom:67%;" />

使用示例如下：

```java
@Test
public void test1() {
    // 原集合
    List<String> OLD_LIST = Arrays.asList("唐僧,悟空,八戒,沙僧,曹操,刘备,孙权".split(","));
    // 集合分隔
    List<String> list = OLD_LIST.subList(0, 3);
    // 打印集合中的元素
    list.forEach(i -> {
        System.out.println(i);
    });
}
```

以上代码的执行结果如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206301523381.png" alt="image-20220630152345317" style="zoom:67%;" />



## ArrayList 集合底层原理

> ArrayList底层是**基于数组实现的**：根据索引定位元素快，增删需要做元素的移位操作。
>
> 第一次创建集合并添加第一个元素的时候，**在底层创建一个默认长度为10的数组**。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051147009.png" alt="image-20230105114728870" style="zoom:67%;" />

> **List集合存储的元素要超过容量怎么办？**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051148949.png" alt="image-20230105114808813" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051148548.png" alt="image-20230105114836413" style="zoom:67%;" />

## LinkedList 集合

### LinkedList 基本语法

> 底层数据结构是**双链表**，查询慢，首尾操作的速度是极快的，所以多了很多首尾操作的特有API。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051151150.png" alt="image-20230105115155014" style="zoom: 50%;" />

> LinkedList是支持双链表，定位前后的元素是非常快的，增删首尾的元素也是最快的。所以提供了很多操作首尾元素的特殊API可的实以做栈和队列现。如果查询多而增删少用ArrayList集合。(用的最多的)，如果查询少而增删首尾较多用LinkedList集合。

注意：创建LinkedList集合要这样创建：

```java
LinkedList<String> li = new LinkedList<>();
```

如果这样创建，就不能用特有方法了。

```java
List<String> li = new LinkedList<>();
```

### API示例

```java
public class ListDemo03 {
    public static void main(String[] args) {
        // LinkedList可以完成队列结构，和栈结构 （双链表）
        // 1、做一个队列：
        LinkedList<String> queue = new LinkedList<>();
        // 入队
        queue.addLast("1号");
        queue.addLast("2号");
        queue.addLast("3号");
        System.out.println(queue);
        System.out.println(queue.getFirst());
        System.out.println(queue.getLast());
        // 出队
        System.out.println(queue.removeFirst());
        System.out.println(queue.removeFirst());
        System.out.println(queue);
        // 2、做一个栈
        LinkedList<String> stack = new LinkedList<>();
        // 入栈 压栈 (push)
        stack.push("第1颗子弹");
        stack.push("第2颗子弹");
        stack.push("第3颗子弹");
        stack.push("第4颗子弹");
        System.out.println(stack);
        // 出栈  弹栈 pop
        System.out.println(stack.pop());
        System.out.println(stack.pop());
        System.out.println(stack.pop());
        System.out.println(stack);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051201786.png" alt="image-20230105120154676" style="zoom:67%;" />

## 集合的并发修改异常问题

> **从集合中的一批元素中找出某些数据并删除，如何操作？是否存在问题呢 ？**

### 问题引出

> 当我们从集合中找出某个元素并删除的时候可能出现一种并发修改异常问题。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051204938.png" alt="image-20230105120429836" style="zoom:60%;" />

#### 准备数据

```java
// 1、准备数据
ArrayList<String> list = new ArrayList<>();
list.add("黑马");
list.add("Java");
list.add("Java");
list.add("赵敏");
list.add("赵敏");
list.add("素素");
System.out.println(list); // [黑马, Java, Java, 赵敏, 赵敏, 素素]
```

#### foreach 问题

```java
// b、foreach遍历删除 (会出现问题，这种无法解决的，foreach不能边遍历边删除，会出bug)
for (String s : list) {
    if("Java".equals(s)){
        list.remove(s);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051210523.png" alt="image-20230105121017409" style="zoom:67%;" />

#### lambda 问题引出

```java
// c、lambda表达式(会出现问题，这种无法解决的，Lambda遍历不能边遍历边删除，会出bug)
list.forEach(s -> {
    if("Java".equals(s)){
        list.remove(s);
    }
});
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051212338.png" alt="image-20230105121214225" style="zoom:67%;" />

### 解决方案

> 迭代器遍历集合但是**用迭代器自己的删除方法操作可以解决。**
>
> **使用for循环遍历并删除元素不会存在这个问题。**

#### 迭代器方法删除

```java
// 需求：删除全部的Java信息。
// a、迭代器遍历删除
Iterator<String> it = list.iterator();
while (it.hasNext()){
    String ele = it.next();
    if("Java".equals(ele)){
        // 删除Java
        // list.remove(ele); // 集合删除会出毛病
        it.remove(); // 删除迭代器所在位置的元素值（没毛病）
    }
}
System.out.println(list);
```

#### for 倒序删除

```java
// d、for循环(边遍历边删除集合没毛病，但是必须从后面开始遍历删除才不会出现漏掉应该删除的元素)
for (int i = list.size() - 1; i >= 0 ; i--) {
    String ele = list.get(i);
    if("Java".equals(ele)){
        list.remove(ele);
    }
}
System.out.println(list);
```

## 数组转List

### Arrays.asList

通过 `Arrays.asList(strArray)` 方式,将数组转换List后，不能对List增删，只能查改，否则抛异常。

需要在将数组转换为List后，对List进行增删改查操作，在List的数据量不大的情况下，可以使用

```java
List list = Arrays.asList(strArray);
ArrayList<String> list = new ArrayList<String>(Arrays.asList(strArray)) ;
```



### Collections.addAll

通过`Collections.addAll(arrayList, strArray)`方式转换，根据数组的长度创建一个长度相同的List，然后通过`Collections.addAll()`方法，将数组中的元素转为二进制，然后添加到List中，这是最高效的方法。

**关键代码**：

```java
ArrayList< String> arrayList = new ArrayList<String>(strArray.length);
Collections.addAll(arrayList, strArray);
```

测试：

```java
private void testArrayCastToListEfficient(){
	String[] strArray = new String[2];
 	ArrayList< String> arrayList = new ArrayList<String>(strArray.length);
    Collections.addAll(arrayList, strArray);
    arrayList.add("1");
    System.out.println(arrayList);
}
```

执行结果：同样成功追加一个元素“1”。

**使用场景**：需要在将数组转换为List后，对List进行增删改查操作，在List的数据量巨大的情况下，优先使用，可以提高操作速度。



## 初始化集合时必须指定大小(重点)

### 阿里规范

阿里巴巴《Java开发手册》第 1 章编程规范，第 6 节集合处理的第 17 条规定如下：

> 【推荐】集合初始化时，指定集合初始值大小
>
> 说明：HashMap 使用 HashMap(int initialCapacity) 初始化，`如果暂时无法确定集合大小，那么指定默认值（16）即可。`
>
> 正例：initialCapacity = (需要存储的元素个数 / 负载因子) + 1。注意负载因子（即 loader factor）默认为 0.75，如果暂时无法确定初始值大小，请设置为 16（即默认值）。
>
> 反例：HashMap 需要放置 1024 个元素，由于没有设置容量初始大小，随着元素不断增加，容量 7 次被迫扩大，resize 需要重建 hash 表。当放置的集合元素个数达千万级别时，不断扩容会严重影响性能。

### 规范解读

此规范的主要目的完全是出于性能考虑，查看 `HashMap` 的源码也就可以发现此规范的原因，如果我们能为集合设置合理的大小就可以避免 `HashMap` 的扩容操作，而 `HashMap` 的扩容方法 `resize` 有很多逻辑判断和业务操作，如果设置了合理的大小就可以避免执行更多的代码，因此就可以更大限度的提高集合的执行效率

### 性能评测

接下来我们来测试一下设置 `size` 的性能和不设置 `size` 的性能差别，我们已知需要插入 1024 个数据，根据默认的负载因子 0.75 和公式 `(存储元素个数/负载因子)+1` 得出需要设置的大小为 1367（取整）。

> 小贴士：公式“(存储元素个数/负载因子)+1”说明：因为 HashMap 的实际存储量等于：元素个数*负载因子，为了防止 HashMap 扩容，所以公式必须是“(存储元素个数/负载因子)+1”才能防止动态扩容。

### 总结

在初始化集合时，如果已知集合的数量，那么一定要在初始化时设置集合的容量大小，这样就可以有效的提高集合的性能，但需要注意的是 `HashMap` 的实际存储量是“元素个数*负载因子”，而负载因子默认是 0.75，因此在设置大小时，要使用“(存储元素个数/负载因子)+1”的公式计算出正确的值再进行设置。

## ArrayList和LinkedList性能分析

在面试的时候，经常会被问到几个问题：

ArrayList和LinkedList的区别，相信大部分朋友都能回答上：

> ArrayList是基于数组实现，LinkedList是基于链表实现
>
> 当随机访问List时，ArrayList比LinkedList的效率更高，等等

当被问到ArrayList和LinkedList的使用场景是什么时，大部分朋友的答案可能是：

> ArrayList和LinkedList在新增、删除元素时，LinkedList的效率要高于 ArrayList，而在遍历的时候，ArrayList的效率要高于LinkedList。那这个回答是否准确呢？今天我们就来研究研究！

### 添加元素测试

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207291847451.png" alt="image-20220729184715376" style="zoom:67%;" />

通过这组测试，我们可以知道LinkedList添加元素的效率未必要高于ArrayList。

> 从集合头部位置添加元素

由于ArrayList是数组实现的，在添加元素到数组头部的时候，需要对头部以后的数据进行复制重排，所以效率很低；

LinkedList是基于链表实现，在添加元素的时候，首先会通过循环查找到添加元素的位置，如果要添加的位置处于List的前半段，就从前往后找；若其位置处于后半段，就从后往前找，因此LinkedList添加元素到头部是非常高效的。

> 从集合中间位置位置添加元素

ArrayList在添加元素到数组中间时，同样有部分数据需要复制重排，效率也不是很高；

LinkedList将元素添加到中间位置，是添加元素最低效率的，因为靠近中间位置，在添加元素之前的循环查找是遍历元素最多的操作。

> 从集合尾部位置添加元素

而在添加元素到尾部的操作中，在没有扩容的情况下，ArrayList的效率要高于LinkedList。

这是因为ArrayList在添加元素到尾部的时候，不需要复制重排数据，效率非常高。

LinkedList虽然也不用循环查找元素，但LinkedList中多了new对象以及变换指针指向对象的过程，所以效率要低于ArrayList。

> 注意：这是排除动态扩容数组容量的情况下进行的测试，如果有动态扩容的情况，ArrayList的效率也会降低。

### 删除元素操作性能测试

ArrayList和LinkedList删除元素操作测试的结果和添加元素操作测试的结果很接近！

**结论：**如果需要在List的头部进行大量的插入、删除操作，那么直接选择LinkedList。否则，ArrayList即可。

### 遍历测试

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207291846288.png" alt="image-20220729184653218" style="zoom:67%;" />

我们可以看到，LinkedList的for循环性能是最差的，而ArrayList的for循环性能是最好的。

> 这是因为LinkedList基于链表实现的，在使用for循环的时候，每一次for循环都会去遍历半个List，所以严重影响了遍历的效率；ArrayList则是基于数组实现的，并且实现了RandomAccess接口标志，意味着ArrayList可以实现快速随机访问，所以for循环效率非常高。LinkedList的迭代循环遍历和ArrayList的迭代循环遍历性能相当，也不会太差，所以在遍历LinkedList时，我们要切忌使用for循环遍历。
>

# ArrayList

## 集合常用方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031304091.png" alt="image-20230103130426955" style="zoom:67%;" />

### 创建集合并添加元素

```java
List<String>  list= new ArrayList<>();//add添加元素
list.add("任硕");
list.add("猫眼");
list.add("王瑞");
System.out.println(list); //[任硕, 猫眼, 王瑞]
```

### 移除元素

```java
//remove移除元素
list.remove(1);//移除对应索引元素
list.remove("任硕");//移除和值相同的元素
System.out.println(list); //[王瑞]//
```

### 清空元素

```java
list.clear();
```

### 判断集合是否为空

```java
Boolean b = list.isEmpty();
```

### 返回集合中元素的个数

```java
int size = list.size();
```

### 将集合中的元素添加到另一个集合

```java
List<String> list1 = new ArrayList<>();
list1.addAll(list);
```

### 将集合元素转换成数组

```java
list1.toArray();
```

### 完整示例

```java
public static void main(String[] args) {
    ArrayList<String> list = new ArrayList<>();
    list.add("Java");
    list.add("Java");
    list.add("MySQL");
    list.add("MyBatis");
    list.add("HTML");

    // 1、public E get(int index)：获取某个索引位置处的元素值
    String e = list.get(3);
    System.out.println(e);

    // 2、public int size()：获取集合的大小（元素个数）
    System.out.println(list.size());

    // 3、完成集合的遍历
    for (int i = 0; i < list.size(); i++) {
        System.out.println(list.get(i));
    }

    // 4、public E remove(int index)：删除某个索引位置处的元素值,并返回被删除的元素值
    System.out.println(list); // [Java, Java, MySQL, MyBatis, HTML]
    String e2 = list.remove(2);
    System.out.println(e2);
    System.out.println(list);

    // 5、public boolean remove(Object o):直接删除元素值，删除成功返回true，删除失败返回false
    System.out.println(list.remove("MyBatis"));
    System.out.println(list);

    ArrayList<String> list1 = new ArrayList<>();
    list1.add("Java");
    list1.add("王宝强");
    list1.add("Java");
    list1.add("MySQL");
    System.out.println(list1);
    // 只会删除第一次出现的这个元素值，后面的不删除
    System.out.println(list1.remove("Java"));
    System.out.println(list1);


    // 6、public E set(int index,E element)：修改某个索引位置处的元素值。
    String e3 = list1.set(0 , "贾乃亮");
    System.out.println(e3);
    System.out.println(list1);
}
```



<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031304388.png" alt="image-20230103130452272" style="zoom:67%;" />

## 影片信息展示

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031305165.png" alt="image-20230103130519024" style="zoom:67%;" />

```java
public static void main(String[] args) {
    // 1、定义一个电影类：Movie
    // 2、定义一个ArrayList集合存储这些影片对象。
    ArrayList<Movie> movies = new ArrayList<>();

    // 3、创建影片对象封装电影数据，把对象加入到集合中去。
    movies.add(new Movie("《肖生克的救赎》", 9.7 , "罗宾斯"));
    movies.add(new Movie("《霸王别姬》", 9.6 , "张国荣、张丰毅"));
    movies.add(new Movie("《阿甘正传》", 9.5 , "汤姆.汉克斯"));

    // 4、遍历集合中的影片对象并展示出来
    for (int i = 0; i < movies.size(); i++) {
        Movie movie = movies.get(i);
        System.out.println("片名：" + movie.getName());
        System.out.println("评分：" + movie.getScore());
        System.out.println("主演：" + movie.getActor());
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031343291.png" alt="image-20230103134310194" style="zoom:67%;" />

> **结论：集合中存储的元素并不是对象本身，而是对象的地址。**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031307447.png" alt="image-20230103130719308" style="zoom:67%;" />



## 学生信息系统的数据搜索

### 问题描述

后台程序需要存储如上学生信息并展示，然后要提供按照学号搜索学生信息的功能

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031306204.png" alt="image-20230103130608104" style="zoom:80%;" />

> ①定义Student类，定义ArrayList集合存储如上学生对象信息，并遍历展示出来。
>
> ②提供一个方法，可以接收ArrayList集合，和要搜索的学号，返回搜索到的学生对象信息，并展示。
>
> ③使用死循环，让用户可以不停的搜索。

### Student实体类

```java
public class Student {
    private String studyId;
    private String name;
    private int age;
    private String className;
    // 以下是无参和有参构造，get|set方法
}
```

### 定义数据

```java
public static List<Student> getData() {
    // 1、定义一个学生类，后期用于创建对象封装学生数据
    // 2、定义一个集合对象用于装学生对象
    List<Student> students = new ArrayList<>();
    students.add(new Student("20180302","叶孤城",23,"护理一班"));
    students.add(new Student("20180303","东方不败",23,"推拿二班"));
    students.add(new Student( "20180304","西门吹雪",26,"中药学四班"));
    students.add(new Student( "20180305","梅超风",26,"神经科2班"));
    System.out.println("学号\t\t名称\t年龄\t\t班级");
    return students;
}
```

### 展示数据

```java
public static void list(List<Student> students) {
    // 3、遍历集合中的每个学生对象并展示其数据
    for (int i = 0; i < students.size(); i++) {
        Student s = students.get(i);
        System.out.println(s.getStudyId() +"\t\t" + s.getName()+"\t\t"
                + s.getAge() +"\t\t" + s.getClassName());
    }
}
```

### 搜索数据

```java
public static void search(List<Student> students) {
    // 4、让用户不断的输入学号，可以搜索出该学生对象信息并展示出来（独立成方法）
    Scanner sc = new Scanner(System.in);
    while (true) {
        System.out.println("请您输入要查询的学生的学号：");
        String id = sc.next();
        Student s = getStudentByStudyId(students, id);
        // 判断学号是否存在
        if(s == null){
            System.out.println("查无此人！");
        }else {
            // 找到了该学生对象了，信息如下
            System.out.println(s.getStudyId() +"\t\t" + s.getName()+"\t\t"
                    + s.getAge() +"\t\t" + s.getClassName());
        }
    }
}
```

```java
// 根据学号，去集合中找出学生对象并返回
public static Student getStudentByStudyId(List<Student> students, String studyId){
    for (int i = 0; i < students.size(); i++) {
        Student s = students.get(i);
        if(s.getStudyId().equals(studyId)){
            return s;
        }
    }
    return null; // 查无此学号！
}
```

### main方法

```java
public static void main(String[] args) {
    list(getData());
    search(getData());
}
```

### 结果展示

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031340842.png" alt="image-20230103134032692" style="zoom: 67%;" />



# Set集合

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220412101334546.png" alt="image-20220412101334546" style="zoom:67%;" />

## Set 特点

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051610597.png" alt="image-20230105161016448" style="zoom: 50%;" />

## HashSet

> HashSet 实现了 Set 接口，由哈希表（实际是 HashMap）提供支持。HashSet 不保证集合的迭代顺序，但允许插入 null 值。也就是说 HashSet 不能保证元素插入顺序和迭代顺序相同。HashSet 具备去重的特性，也就是说它可以将集合中的重复元素自动过滤掉，保存存储在 HashSet 中的元素都是唯一的。

### HashSet 基本用法

HashSet 基本操作方法有：add（添加）、remove（删除）、contains（判断某个元素是否存在）和 size（集合数量）。这些方法的性能都是固定操作时间，如果哈希函数是将元素分散在桶中的正确位置。HashSet 基本使用如下：

```java
public class SetDemo1 {
    public static void main(String[] args) {
        // 看看Set系列集合的特点： HashSet LinkedHashSet TreeSet
        Set<String> sets = new HashSet<>(); // 一行经典代码  无序不重复，无索引
        // Set<String> sets = new LinkedHashSet<>(); // 有序  不重复 无索引
        sets.add("MySQL");
        sets.add("MySQL");
        sets.add("Java");
        sets.add("Java");
        sets.add("HTML");
        sets.add("HTML");
        sets.add("SpringBoot");
        sets.add("SpringBoot");
        System.out.println(sets); // [Java, MySQL, HTML, SpringBoot]
    }
}
```



### HashSet 无序性

HashSet 不能保证插入元素的顺序和循环输出元素的顺序一定相同，也就是说 HashSet 其实是无序的集合，具体代码示例如下：

```java
@Test
public void test1() {
    HashSet<String> mapSet = new HashSet<>();
    mapSet.add("深圳");
    mapSet.add("北京");
    mapSet.add("西安");
    // 循环打印 HashSet 中的所有元素
    mapSet.forEach(System.out::println);
}
```

以上程序的执行结果如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206301634826.png" alt="image-20220630163416758" style="zoom:67%;" />

从上述代码和执行结果可以看出，HashSet 插入的顺序是：**深圳 -> 北京 -> 西安**，而循环打印的顺序却是：**西安 -> 深圳 -> 北京**，所以 **HashSet 是无序的，不能保证插入和迭代的顺序一致**。

> PS：如果要保证插入顺序和迭代顺序一致，可使用 LinkedHashSet 来替换 HashSet。

### HashSet 错误用法

有人说 HashSet 只能保证基础数据类型不重复，却不能保证自定义对象不重复？这样说对吗？我们通过以下示例来说明此问题。

#### HashSet 与基本数据类型

使用 HashSet 存储基本数据类型，实现代码如下：

```java
@Test
public void test1() {
    HashSet<Long> longSet = new HashSet<>();
    longSet.add(666l);
    longSet.add(777l);
    longSet.add(999l);
    longSet.add(666l);
    // 循环打印 HashSet 中的所有元素
    longSet.forEach(System.out::println);
}
```

以上程序的执行结果如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206301640220.png" alt="image-20220630164037141" style="zoom:67%;" />

> 从上述结果可以看出，使用 HashSet 可以保证基础数据类型不重复。

#### HashSet 与自定义对象类型

接下来，将自定义对象存储到 HashSet 中，实现代码如下：

```java
@Getter
@Setter
@ToString
class Person {
    private String name;
    private String password;

    public Person(String name, String password) {
        this.name = name;
        this.password = password;
    }
}
```

```java
@Test
public void test1() {
    HashSet<Person> personSet = new HashSet<>();
    personSet.add(new Person("曹操", "123"));
    personSet.add(new Person("孙权", "123"));
    personSet.add(new Person("曹操", "123"));
    // 循环打印 HashSet 中的所有元素
    personSet.forEach(System.out::println);
}
```


以上程序的执行结果如下：

> 从上述结果可以看出，自定义对象类型确实没有被去重，那也就是说 HashSet 不能实现自定义对象类型的去重咯？其实并不是，HashSet 去重功能是依赖元素的 hashCode 和 equals 方法判断的，通过这两个方法返回的都是 true 那就是相同对象，否则就是不同对象。而前面的 Long 类型元素之所以能实现去重，正是因为 Long 类型中已经重写了 hashCode 和 equals 方法，具体实现源码如下：

```java
@Override
public boolean equals(Object o) {
    if (this == o) return true; // 引用相等返回 true
    // 如果等于 null，或者对象类型不同返回 false
    if (o == null || getClass() != o.getClass()) return false;
    // 强转为自定义 Person 类型
    Person persion = (Person) o;
    // 如果 name 和 password 都相等，就返回 true
    return Objects.equals(name, persion.name) &&
            Objects.equals(password, persion.password);
}
@Override
public int hashCode() {
    // 对比 name 和 password 是否相等
    return Objects.hash(name, password);
}
```

更多关于 hashCode 和 equals 的内容，详见：[https://mp.weixin.qq.com/s/40zaEJEkQYM3Awk2EwIrWA](https://mp.weixin.qq.com/s?__biz=MzI0NjgwNzUyMw==&mid=2247483863&idx=1&sn=d27ba465c9d150ae8f9e24482f5763b3&scene=21#wechat_redirect)

那么，想让 HashSet 支持自定义对象去重，只需要在自定义对象中重写 hashCode 和 equals 方法即可，具体实现代码如下：

```java
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Person {
    private String name;
    private String password;
}
```

重新运行以上代码，执行结果如下图所示：

从上述结果可以看出，之前的重复项“曹操”已经被去重了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202206301648812.png" alt="image-20220630164813739" style="zoom:67%;" />

### HashSet 底层原理

#### 底层原理

> HashSet集合底层采取**哈希表**存储的数据。
>
> 哈希表是一种对于增删改查数据性能都较好的结构。
>
> JDK8之前的，底层使用**数组+链表**组成
>
> JDK8开始后，底层采用**数组+链表+红黑树**组成。

#### 哈希值

> 是JDK根据对象的**地址，按照某种规则算出来的int类型的数值。**
>
> public int hashCode()：返回对象的哈希值
>
> 同一个对象多次调用hashCode()方法返回的哈希值是相同的
>
> 默认情况下，不同对象的哈希值是不同的。

```java
public class SetDemo2 {
    public static void main(String[] args) {
        // 目标：学会获取对象的哈希值，并确认一下
        String name = "itheima";
        System.out.println(name.hashCode());
        System.out.println(name.hashCode());

        String name1 = "itheima1";
        System.out.println(name1.hashCode());
        System.out.println(name1.hashCode());
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051643183.png" alt="image-20230105164312078" style="zoom:80%;" />

#### 哈希表的详细流程

> ① **创建一个默认长度16，默认加载因为0.75的数组，数组名table**
>
> ② **根据元素的哈希值跟数组的长度计算出应存入的位置**
>
> ③ **判断当前位置是否为null，如果是null直接存入，如果位置不为null，表示有元素，则调用equals方法比较           属性值，如果一样，则不存，如果不一样，则存入数组。**
>
> ④ **当数组存满到16\*0.75=12时，就自动扩容，每次扩容原先的两倍**

### HashSet 集合去重复原理

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051627104.png" alt="image-20230105162744968" style="zoom:50%;" />

> HashSet 底层是由 HashMap 实现的，它可以实现重复元素的去重功能，如果存储的是自定义对象必须重写 hashCode 和 equals 方法。HashSet 保证元素不重复是利用 HashMap 的 put 方法实现的，在存储之前先根据 key 的 hashCode 和 equals 判断是否已存在，如果存在就不在重复插入了，这样就保证了元素的不重复。

```java
public class Student {
    private String name;
    private int age;
    private char sex;
	...
    // 只要2个对象内容一样，结果一定是true
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return age == student.age && sex == student.sex && Objects.equals(name, student.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age, sex);
    }
}
```

```java
public class SetDemo3 {
    public static void main(String[] args) {
        // Set集合去重复原因：先判断哈希值算出来的存储位置是否相同 再判断equals
        Set<Student> sets = new HashSet<>();
        Student s1 = new Student("无恙", 20, '男');
        Student s2 = new Student("无恙", 20, '男');
        Student s3 = new Student("周雄", 21, '男');
        System.out.println(s1.hashCode());
        System.out.println(s2.hashCode());
        System.out.println(s3.hashCode());
        sets.add(s1);
        sets.add(s2);
        sets.add(s3);
        System.out.println(sets);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051646617.png" alt="image-20230105164629505" style="zoom:67%;" />

### Set 集合去重案例

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051641544.png" alt="image-20230105164138354" style="zoom:67%;" />



## LinkedHashSet

> - **有序**、不重复、无索引。这里的有序指的是保证存储和取出的元素顺序一致
> - **原理**：底层数据结构是依然哈希表，只是每个元素又额外的多了一个双链表的机制记录存储的顺序。

```java
public class SetDemo4 {
    public static void main(String[] args) {
        // 看看Set系列集合的特点： HashSet LinkedHashSet TreeSet
        Set<String> sets = new LinkedHashSet<>(); // 有序  不重复 无索引
        sets.add("MySQL");
        sets.add("MySQL");
        sets.add("Java");
        sets.add("Java");
        sets.add("HTML");
        sets.add("HTML");
        sets.add("SpringBoot");
        sets.add("SpringBoot");
        System.out.println(sets); // [MySQL, Java, HTML, SpringBoot]
    }
}
```



## TreeSet

### 概述和特点

> - 不重复、无索引、可排序
> - 可排序：按照元素的大小默认升序（有小到大）排序。
> - TreeSet集合底层是基于红黑树的数据结构实现排序的，增删改查性能都较好。
> - **注意：TreeSet集合是一定要排序的，可以将元素按照指定的规则进行排序**

### TreeSet集合默认的规则

> - 对于数值类型：Integer , Double，官方默认按照大小进行升序排序。
> - 对于字符串类型：默认按照首字符的编号升序排序。
> - 对于自定义类型如Student对象，TreeSet无法直接排序。
> - **注意：想要使用TreeSet存储自定义类型，需要制定排序规则**

### 自定义排序规则

> 方式一：让自定义的类（如学生类）实现Comparable接口**重写里面的**compareTo**方法**来定制比较规则
>
> 方式二：TreeSet集合有参数构造器，可以设置Comparator接口对应的比较器对象，来定制比较规则
>
> **注意：如果TreeSet集合存储的对象有实现比较规则，集合也自带比较器，默认使用集合自带的比较器排序**

**两种方式中，关于返回值的规则：**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051650502.png" alt="image-20230105165053372" style="zoom: 60%;" />

### TreeSet集合进行对象排序

#### Comparable 方式

```java
public class Apple implements Comparable<Apple>{
    private String name;
    private String color;
    private double price;
    private int weight;
    //省略构造set/get方法
    //方式一：类自定义比较规则
    @Override
    public int compareTo(Apple o) {
        // 按照重量进行比较的
        return this.weight - o.weight ; // 去重重量重复的元素
        // return this.weight - o.weight >= 0 ? 1 : -1; // 保留重量重复的元素
    }
}
```

```java
public class SetDemo5 {
    public static void main(String[] args) {
        Set<Apple> apples = new TreeSet<>();
        apples.add(new Apple("红富士", "红色", 9.9, 500));
        apples.add(new Apple("青苹果", "绿色", 15.9, 300));
        apples.add(new Apple("绿苹果", "青色", 29.9, 400));
        apples.add(new Apple("黄苹果", "黄色", 9.8, 500));
        apples.forEach(System.out::println);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051704791.png" alt="image-20230105170453640" style="zoom:67%;" />

#### 集合自定义方式 ⭐

复杂方式

```java
public static void t2(){
    Set<Apple> apples = new TreeSet<>(new Comparator<Apple>() {
        @Override
        public int compare(Apple o1, Apple o2) {
            return Double.compare(o2.getPrice() , o1.getPrice()); // 降序
        }
    });
    apples.add(new Apple("红富士", "红色", 9.9, 500));
    apples.add(new Apple("青苹果", "绿色", 15.9, 300));
    apples.add(new Apple("绿苹果", "青色", 29.9, 400));
    apples.forEach(System.out::println);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220412111929773.png" alt="image-20220412111929773" style="zoom:67%;" />

上面升序降序写法

```java
//正常方式
return o1.getWeight() - o2.getWeight(); // 升序
return o2.getWeight() - o1.getWeight(); // 降序
//注意：浮点型建议直接使用Double.compare进行比较
return Double.compare(o1.getPrice() , o2.getPrice()); // 升序
return Double.compare(o2.getPrice() , o1.getPrice()); // 降序
```

简写方式

```java
public static void t1(){
    Set<Apple> apples = new TreeSet<>((o1,  o2) ->  
                                      Double.compare(o2.getPrice() , o1.getPrice()));
    apples.add(new Apple("红富士", "红色", 9.9, 500));
    apples.add(new Apple("青苹果", "绿色", 15.9, 300));
    apples.add(new Apple("绿苹果", "青色", 29.9, 400));
    apples.add(new Apple("黄苹果", "黄色", 9.8, 500));
    apples.forEach(System.out::println);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220412111057306.png" alt="image-20220412111057306" style="zoom:67%;" />



### 案例：生成10个不同的随机数

```java
Set<Integer> set = new TreeSet<>();
Random r = new Random();
while(set.size()<10){  
    int num = r.nextInt(20)+1;   
    set.add(num);
}
for (Integer i:set) {   
    System.out.println(i);
}
```



## BitSet⭐

如果我们需要对 bit 数组进行一些操作该怎么办呢？你是不是会使用 boolean[] 来实现呢？其实，有一种更有效、更节省内存的方法来实现。这就是 BitSet 类。BitSet 类允许我们存储和操作 bit 的数组。与 boolean[] 相比，它消耗的内存要少 8 倍。我们可以对数组进行逻辑操作，例如：and、or、xor。

### 简单使用

```java
public static void t1() {
    BitSet bs1 = new BitSet();
    for (int i = 0; i < 10; i++) {
        bs1.set(i);
    }
    System.out.println(bs1);
    //可以正常使用stream方法
    int sum = bs1.stream().sum();
    System.out.println(bs1.stream().average().getAsDouble());
    System.out.println(sum);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205111006374.png" alt="image-20220511100610314" style="zoom:80%;" />

### 求交集并集差集

```java
public static void t2() {
    BitSet bs1 = new BitSet();
    bs1.set(0);
    bs1.set(2);
    bs1.set(4);
    System.out.println("bs1 : " + bs1);

    BitSet bs2 = new BitSet();
    bs2.set(1);
    bs2.set(2);
    bs2.set(3);
    System.out.println("bs2 : " + bs2);
    //交集
    bs2.xor(bs1);
    System.out.println("交集: " + bs2);
    //并集
    bs2.or(bs1);
    System.out.println("并集: " + bs2);
    //差集
    bs2.andNot(bs1);
    System.out.println("差集: " + bs2);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205111005120.png" alt="image-20220511100550044" style="zoom:80%;" />





# List 去重

## 前置知识

正式开始之前，先来搞懂两组概念：**无序集合和有序集合 & 无序和有序**。因为接下来的方法实现中，会反复提及这两组概念，所以有必要在正式开始之前，先把它们搞清楚。

### 无序集合

无序集合是指，`数据读取的顺序和数据插入的顺序是不一致`的。

例如，插入集合的顺序是：1、5、3、7，而集合的读取顺序竟然是：1、3、5、7。

### 有序集合

有序集合的概念和无序集合的概念正好相反，它是指`集合的读取顺序和插入顺序是一致的`。

例如，插入数据的顺序是：1、5、3、7，那么读取的顺序也是：1、5、3、7。

### 有序和无序

通过上面的无序集合和有序集合，我们可以得出有序和无序的概念。有序指的是数据的排列顺序和读取顺序符合我们的预期就叫做有序。而无序指的是数据的排列顺序和读取顺序不符合我们的预期就叫做无序。

> PS：如果对于有序和无序的概念不是很清楚也没关系，通过下面的事例，我们可以进一步的理解它们的含义。



## 去重方法

### 实体类

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Person {
    private String name;
    private String password;
    private int age;
}
```

### contains(有序)

要进行数据去重，我们首先想到的是新建一个集合，然后循环原来的集合，每次循环判断原集合中的循环项，如果当前循环的数据，没有在新集合中存在就插入，已经存在了就舍弃，这样当循环执行完，我们就得到了一个没有重复元素的集合了，实现代码如下：

```java
@Test
public void test1() {
    // 创建并给 List 赋值
    List<Person> list = new ArrayList<>();
    list.add(new Person("李四", "123456", 20));
    list.add(new Person("张三", "123456", 18));
    list.add(new Person("王五", "123456", 22));
    list.add(new Person("张三", "123456", 18));
    // 去重操作
    List<Person> newList = new ArrayList<>(list.size());
    list.forEach(i -> {
        if (!newList.contains(i)) { // 如果新集合中不存在则插入
            newList.add(i);
        }
    });
    // 打印集合信息
    newList.forEach(System.out::println);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202206302155267.png" alt="image-20220630215508207" style="zoom:67%;" />



### 迭代器(无序)

定义 List 去重，除了上面的新建集合之外，我们也可以使用迭代器循环判断每一项数据，`如果当前循环的数据，在集合中存在两份或两份以上，就将当前的元素删除掉，这样循环完之后，也可以得到一个没有重复数据的集合`，实现代码如下：

```java
@Test
public void test1() {
    // 创建并给 List 赋值
    List<Person> list = new ArrayList<>();
    list.add(new Person("李四", "123456", 20));
    list.add(new Person("张三", "123456", 18));
    list.add(new Person("王五", "123456", 22));
    list.add(new Person("张三", "123456", 18));
    // 去重操作
    Iterator<Person> iterator = list.iterator();
    while (iterator.hasNext()) {
        // 获取循环的值
        Person item = iterator.next();
        // 如果存在两个相同的值
        if (list.indexOf(item) != list.lastIndexOf(item)) {
            // 移除相同的值
            iterator.remove();
        }
    }
    // 打印集合信息
    list.forEach(System.out::println);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202206302157214.png" alt="image-20220630215711155" style="zoom:67%;" />

此方法的实现比上一种方法的实现代码要少一些，并且不需要新建集合，但此方法得到的新集合是无序的，也就是新集合的排列顺序和原集合不一致，`因此也不是最优的解决方案`。

### HashSet(无序)

我们知道 HashSet 天生具备“去重”的特性，那我们只需要将 List 集合转换成 HashSet 集合就可以了

```java
@Test
public void test1() {
    // 创建并给 List 赋值
    List<Person> list = new ArrayList<>();
    list.add(new Person("李四", "123456", 20));
    list.add(new Person("张三", "123456", 18));
    list.add(new Person("王五", "123456", 22));
    list.add(new Person("张三", "123456", 18));
    // 去重操作
    HashSet<Person> set = new HashSet<>(list);
    // 打印集合信息
    set.forEach(System.out::println);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202206302152599.png" alt="image-20220630214638895" style="zoom:67%;" />

此方法的实现代码较为简洁，`但缺点是 HashSet 会自动排序，这样新集合的数据排序就和原集合不一致了`，如果对集合的顺序有要求，那么此方法也不能满足当前需求。

### LinkedHashSet(有序，优选)

既然 HashSet 会自动排序不能满足需求，那就使用 LinkedHashSet，它既能去重又能保证集合的顺序

```java
@Test
public void test1() {
    // 创建并给 List 赋值
    List<Person> list = new ArrayList<>();
    list.add(new Person("李四", "123456", 20));
    list.add(new Person("张三", "123456", 18));
    list.add(new Person("王五", "123456", 22));
    list.add(new Person("张三", "123456", 18));
    // 去重操作
    LinkedHashSet<Person> set = new LinkedHashSet<>(list);
    // 打印集合信息
    set.forEach(System.out::println);
}
```


从上述代码和执行结果可以看出，LinkedHashSet 是到目前为止，实现比较简单，且最终生成的新集合与原集合顺序保持一致的实现方法，是我们可以考虑使用的一种去重方法



### Stream去重(有序，最优)

JDK 8 为我们带来了一个非常实用的方法 Stream，使用它可以实现很多功能，比如下面的去重功能：

```java
@Test
public void test1() {
    // 创建并给 List 赋值
    List<Person> list = new ArrayList<>();
    list.add(new Person("李四", "123456", 20));
    list.add(new Person("张三", "123456", 18));
    list.add(new Person("王五", "123456", 22));
    list.add(new Person("张三", "123456", 18));
    // 去重操作
    list = list.stream().distinct().collect(Collectors.toList());
    // 打印集合信息
    list.forEach(System.out::println);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202206302144105.png" alt="image-20220630214459038" style="zoom:67%;" />

Stream 实现去重功能和其他方法不同的是，它不用新创建集合，使用自身接收一个去重的结果就可以了，并且实现代码也很简洁，并且去重后的集合顺序也和原集合的顺序保持一致，`是我们最优先考虑的去重方法`。



# 可变参数

## 概述

> - 可变参数用**在形参中可以接收多个数据**
> - 可变参数的格式：**数据类型 ...参数名称**
>
> - 传输参数非常灵活，方便，**可以不传参数，可以传一个或者多个，也可以传一个数组**
> - 可变参数在方法内部**本质上就是一个数组**

> - 一个形参列表中可变参数只能有1个
> - **可变参数必须放在形参列表的最后面**

## 使用示例⭐

### 数组展示

```java
public class MethodDemo {
    public static void main(String[] args) {
        sum(); // 1、不传参数
        sum(10); // 2、可以传输一个参数
        sum(10, 20, 30); // 3、可以传输多个参数
        sum(new int[]{10, 20, 30, 40, 50}); // 4、可以传输一个数组
    }

    // 注意：一个形参列表中只能有一个可变参数,可变参数必须放在形参列表的最后面
    public static void sum(int...nums){
        // 注意：可变参数在方法内部其实就是一个数组。 nums
        System.out.println("元素个数：" + nums.length);
        System.out.println("元素内容：" + Arrays.toString(nums));
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051717518.png" alt="image-20230105171741383" style="zoom: 67%;" />

### 数组求和

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051718646.png" alt="image-20230105171820489" style="zoom:67%;" />

```java
public class Test7 {  
    public static void main(String[] args) {
        System.out.println(sum());
        System.out.println(sum(1,2));    
        System.out.println(sum(3,4,5));  
        System.out.println(sum(7,9,5,8)); 
    }     
    public static int sum(int ...a){       
        int sum = 0;        
        for (int i: a){         
            sum += i;      
        }       
        return sum;   
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051719002.png" alt="image-20230105171859886" style="zoom:67%;" />

# Map集合

## Map 概述

Map用于保存具有映射关系的数据，Map里保存着两组数据：key和value，它们都可以使任何引用类型的数据，但**key不能重复**。所以通过指定的key就可以取出对应的value。

### Map 特点

> - Map 没有继承 Collection 接口， Map 提供 key 到 value 的映射，你可以通过“键”查找“值”。
> - 一个 Map 中不能包含相同的 key ，每个 key 只能映射一个 value 。
> - **如果键的值重复，后一个value值会覆盖前一个相同键值的value。**
> - Map集合的键是无序、不重复的，无索引、值不做要求，可以重复
> - Map集合的键值对都可以为null

### Map 集合体系

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211015133226947.png" alt="image-20211015133226947" style="zoom:80%;" />

> - 使用最多的Map是HashMap
> - 重点掌握HashMap、LinkedHashMap、TreeMap。其他后续理解

### Map 集合实现类特点

> - HashMap：元素按照键是**无序**、不重复、无索引、值不做要求(与Map体系一致)
> - LinkedHashMap:元素按照键是**有序**、不重复、无索引、值不做要求
> - TreeMap: 元素按照键是**有序**、不重复、无索引、值不做要求

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051855347.png" alt="image-20230105185522150" style="zoom:67%;" />

### Map 基本使用

```java
// 目标：认识Map体系的特点：按照键无序，不重复，无索引。值不做要求。
public class MapDemo1 {
    public static void main(String[] args) {
        // 1、创建一个Map集合对象
        // Map<String, Integer> maps = new HashMap<>(); // 一行经典代码
        Map<String, Integer> maps = new LinkedHashMap<>();
        maps.put("鸿星尔克", 3);
        maps.put("Java", 1);
        maps.put("枸杞", 100);
        maps.put("Java", 100); // 覆盖前面的数据
        maps.put(null, null);
        System.out.println(maps); // {鸿星尔克=3, Java=100, 枸杞=100, null=null}
    }
}
```

## Map API

Map是双列集合的祖宗接口，它的功能是全部双列集合都可以继承使用的

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051854996.png" alt="image-20230105185404826" style="zoom:67%;" />

```java
public class MapDemo {
    public static void main(String[] args) {
        // 1.添加元素: 无序，不重复，无索引。
        Map<String , Integer> maps = new HashMap<>();
        maps.put("iphoneX",10);
        maps.put("娃娃",20);
        maps.put("iphoneX",100);//  Map集合后面重复的键对应的元素会覆盖前面重复的整个元素！
        maps.put("huawei",100);
        maps.put("生活用品",10);
        maps.put("手表",10);
        // {huawei=100, 手表=10, 生活用品=10, iphoneX=100, 娃娃=20}
        System.out.println(maps);

        // 2.清空集合
        // maps.clear();
        // System.out.println(maps);

        // 3.判断集合是否为空，为空返回true ,反之！
        System.out.println(maps.isEmpty());

        // 4.根据键获取对应值:public V get(Object key)
        Integer key = maps.get("huawei");
        System.out.println(key);
        System.out.println(maps.get("生活用品")); // 10
        System.out.println(maps.get("生活用品2")); // null

        // 5.根据键删除整个元素。(删除键会返回键的值)
        System.out.println(maps.remove("iphoneX"));
        System.out.println(maps);

        // 6.判断是否包含某个键 ，包含返回true ,反之
        System.out.println(maps.containsKey("娃娃"));  // true
        System.out.println(maps.containsKey("娃娃2"));  // false
        System.out.println(maps.containsKey("iphoneX")); // false

        // 7.判断是否包含某个值。
        System.out.println(maps.containsValue(100));  //
        System.out.println(maps.containsValue(10));  //
        System.out.println(maps.containsValue(22)); //

        // {huawei=100, 手表=10, 生活用品=10, 娃娃=20}
        // 8.获取全部键的集合：public Set<K> keySet()
        Set<String> keys = maps.keySet();
        System.out.println(keys);

        System.out.println("------------------------------");
        // 9.获取全部值的集合：Collection<V> values();
        Collection<Integer> values = maps.values();
        System.out.println(values);

        // 10.集合的大小
        System.out.println(maps.size()); // 4

        // 11.合并其他Map集合。(拓展)
        Map<String , Integer> map1 = new HashMap<>();
        map1.put("java1", 1);
        map1.put("java2", 100);
        Map<String , Integer> map2 = new HashMap<>();
        map2.put("java2", 1);
        map2.put("java3", 100);
        map1.putAll(map2); // 把集合map2的元素拷贝一份到map1中去
        System.out.println(map1);
        System.out.println(map2);
    }
}
```

## Map集合遍历方式⭐⭐

[HashMap 的 7 种遍历方式与性能分析！ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247487948&idx=2&sn=cdcf54b06a0dc9be155e018eeb4e88fb&chksm=fc2fadc4cb5824d2dcdba9df633baddcb5744ec9100b757e5e99e18b092dee8db62eaa42aaa1&mpshare=1&scene=23&srcid=05106IYE88XDFWiAEcFMElLz&sharer_sharetime=1652115066662&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208141454010.png" alt="image-20220814145423928" style="zoom:67%;" />

HashMap **遍历从大的方向来说，可分为以下 4 类**：

1. 迭代器（Iterator）方式遍历；
2. For Each 方式遍历；
3. Lambda 表达式遍历（JDK 1.8+）;
4. Streams API 遍历（JDK 1.8+）。

但每种类型下又有不同的实现方式，因此具体的遍历方式又可以分为以下 7 种：

1. 使用迭代器（Iterator）EntrySet 的方式进行遍历；
2. 使用迭代器（Iterator）KeySet 的方式进行遍历；
3. 使用 For Each EntrySet 的方式进行遍历；
4. 使用 For Each KeySet 的方式进行遍历；
5. 使用 Lambda 表达式的方式进行遍历；
6. 使用 Streams API 单线程的方式进行遍历；
7. 使用 Streams API 多线程的方式进行遍历。

接下来我们来看每种遍历方式的具体实现代码。

### 准备数据

```java
//准备数据
public static Map<Integer, String> t() {
    // 创建并赋值 HashMap
    Map<Integer, String> map = new HashMap<>();
    map.put(1, "Java");
    map.put(2, "JDK");
    map.put(3, "Spring Framework");
    map.put(4, "MyBatis framework");
    map.put(5, "Java中文社群");
    return map;
}
```

### 迭代器 EntrySet(性能高)

EntrySet 是早期 HashMap 遍历的主要方法，其实现代码如下：

```java
public static void t1(){
    Map<Integer, String> map = t();
    // 1、把Map集合转换成Set集合
    Set<Map.Entry<String, Integer>> entries = maps.entrySet();
    // 2、开始遍历
    for(Map.Entry<String, Integer> entry : entries){
         String key = entry.getKey();
         int value = entry.getValue();
         System.out.println(key + "：" + value);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205121521515.png" alt="image-20220512152114460" style="zoom:80%;" />

> EntrySet之所以比 KeySet的性能高是因为，KeySet在循环时使用了 map.get(key)，而 map.get(key)相当于又遍历了一遍 Map 集合去查询 key所对应的值。为什么要用“又”这个词？那是因为在使用迭代器或者 for 循环时，其实已经遍历了一遍 Map 集合了，因此再使用 map.get(key)查询时，相当于遍历了两遍。
>
> 而 EntrySet只遍历了一遍 Map 集合，之后通过代码“Entry<Integer, String> entry = iterator.next()”把对象的 key和 value值都放入到了 Entry对象中，因此再获取 key和 value值时就无需再遍历 Map 集合，只需要从Entry对象中取值就可以了。所以，EntrySet的性能比 KeySet的性能高出了一倍，因为 KeySet相当于循环了两遍 Map 集合，而EntrySet只循环了一遍。
>

### 迭代器 KeySet(性能低)

KeySet 的遍历方式是循环 Key 内容，再通过 map.get(key) 获取 Value 的值，具体实现如下：

> 通过以上代码，我们可以看出使用 KeySet 遍历，其性能是不如 EntrySet 的，因为 KeySet 其实循环了两遍集合，第一遍循环是循环 Key，而获取 Value 有需要使用 map.get(key)，相当于有循环了一遍集合，所以 `KeySet 循环不能建议使用，因为循环了两次，效率比较低。`

```java
public static void t1(){
    Map<Integer, String> map = t();
    // 1、键找值：第一步：先拿到集合的全部键
    Set<String> keys = maps.keySet();
    // 2、第二步：遍历每个键，根据键提取值
    for (String key : keys) {
         int value = maps.get(key);
         System.out.println(key + "===>" + value);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205121523566.png" alt="image-20220512152303513" style="zoom:80%;" />



### Lambda(最简单)

得益于JDK 8开始的新技术Lambda表达式，提供了一种更简单、更直接的遍历集合的方式

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220412114416499.png" alt="image-20220412114416499" style="zoom:67%;" />

流程

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220412114444268.png" alt="image-20220412114444268" style="zoom:67%;" />

```java
public static void t1(){
    Map<Integer, String> map = t();
    //遍历
    map.forEach((key, value) -> {
        System.out.println(key+"="+value);
    });
}
```



### Streams API 单线程

> Stream 遍历是先得到 map 集合的 EntrySet，然后再执行 forEach 循环

实现代码如下：

```java
public static void t1(){
    Map<Integer, String> map = t();
    //遍历
    map.entrySet().stream().forEach((entry) -> {
        System.out.println(entry.getKey()+"="+entry.getValue());
    });
}
```



### Streams API 多线程(性能最高)

Stream 多线程的遍历方式和上一种遍历方式类似，只是多执行了一个 parallel 并发执行的方法，此方法会根据当前的硬件配置生成对应的线程数，然后再进行遍历操作，实现代码如下：

```java
public static void t1(){
    Map<Integer, String> map = t();
    //遍历
    map.entrySet().parallelStream().forEach((entry) -> {
        System.out.println(entry.getKey()+"="+entry.getValue());
    });
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205121530483.png" alt="image-20220512153059428" style="zoom:80%;" />

> 注意上述图片的执行结果，可以看出当前执行结果和之前的所有遍历结果都不一样（打印元素的顺序不一样），因为程序是并发执行的，所以没有办法保证元素的执行顺序和打印顺序，这就是并发编程的特点。
>



### 安全性测试

> 我们不能在遍历中使用集合 `map.remove()` 来删除数据，这是非安全的操作方式，但我们可以使用迭代器的 `iterator.remove()` 的方法来删除数据，这是安全的删除集合的方式。同样的我们也可以使用 Lambda 中的 `removeIf` 来提前删除数据，或者是使用 Stream 中的 `filter` 过滤掉要删除的数据进行循环，这样都是安全的，当然我们也可以在 `for` 循环前删除数据在遍历也是线程安全的。

从上面的性能测试结果和原理分析，我想大家应该选用那种遍历方式，已经心中有数的，而接下来我们就从「**安全**」的角度入手，来分析那种遍历方式更安全。

我们把以上遍历划分为四类进行测试：迭代器方式、For 循环方式、Lambda 方式和 Stream 方式，测试代码如下。

#### 1.迭代器方式

```java
Iterator<Map.Entry<Integer, String>> iterator = map.entrySet().iterator();
while (iterator.hasNext()) {
    Map.Entry<Integer, String> entry = iterator.next();
    if (entry.getKey() == 1) {
        // 删除
        System.out.println("del:" + entry.getKey());
        iterator.remove();
    } else {
        System.out.println("show:" + entry.getKey());
    }
}
```

以上程序的执行结果：

> show:0
>
> del:1
>
> show:2

测试结果：**迭代器中循环删除数据安全**。

#### 2.For 循环方式

```java
for (Map.Entry<Integer, String> entry : map.entrySet()) {
    if (entry.getKey() == 1) {
        // 删除
        System.out.println("del:" + entry.getKey());
        map.remove(entry.getKey());
    } else {
        System.out.println("show:" + entry.getKey());
    }
}
```

以上程序的执行结果：

![图片](https://mmbiz.qpic.cn/mmbiz_png/HrWw6ZuXCsgg2akYxAAibK8UY8kKvNDSibw83V0x5s2XtHOTbLmxVWxu47U3nvbZ3O3TIOBm6DNyrg9hTPEFhMOg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

测试结果：**For 循环中删除数据非安全**。

#### 3.Lambda 方式

```java
map.forEach((key, value) -> {
    if (key == 1) {
        System.out.println("del:" + key);
        map.remove(key);
    } else {
        System.out.println("show:" + key);
    }
});
```

以上程序的执行结果：

![图片](https://mmbiz.qpic.cn/mmbiz_png/HrWw6ZuXCsgg2akYxAAibK8UY8kKvNDSibI2gMTvdR68ibQnI4LCvr1E66g4jvv4AfG2dQjricwbXUIibiaONICvia4Fw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)测试结果：**Lambda 循环中删除数据非安全**。

**Lambda 删除的正确方式**：

```java
// 根据 map 中的 key 去判断删除
map.keySet().removeIf(key -> key == 1);
map.forEach((key, value) -> {
    System.out.println("show:" + key);
});
```

以上程序的执行结果：

> show:0
>
> show:2

从上面的代码可以看出，可以先使用 `Lambda` 的 `removeIf` 删除多余的数据，再进行循环是一种正确操作集合的方式。

#### 4.Stream 方式

```java
map.entrySet().stream().forEach((entry) -> {
    if (entry.getKey() == 1) {
        System.out.println("del:" + entry.getKey());
        map.remove(entry.getKey());
    } else {
        System.out.println("show:" + entry.getKey());
    }
});
```

以上程序的执行结果：

![图片](https://mmbiz.qpic.cn/mmbiz_png/HrWw6ZuXCsgg2akYxAAibK8UY8kKvNDSibroZEllaKwrFolYsDabsDMrOLnibXDWGmdhLCZQKlicYYMvEJvQe0RE9g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

测试结果：**Stream 循环中删除数据非安全**。

**Stream 循环的正确方式**：

```java
map.entrySet().stream().filter(m -> 1 != m.getKey()).forEach((entry) -> {
    if (entry.getKey() == 1) {
        System.out.println("del:" + entry.getKey());
    } else {
        System.out.println("show:" + entry.getKey());
    }
});
```

以上程序的执行结果：

> show:0
>
> show:2

从上面的代码可以看出，可以使用 `Stream` 中的 `filter` 过滤掉无用的数据，再进行遍历也是一种安全的操作集合的方式。



## Map案例-统计投票人数

**需求**：某个班级80名学生，现在需要组成秋游活动，班长提供了四个景点依次是（A、B、C、D）,每个学生只能选择一个景点，请统计出最终哪个景点想去的人数最多。

**分析**

> - 将80个学生选择的数据拿到程序中去。
>
> - 定义Map集合用于存储最终统计的结果。
>
> - 遍历80个学生选择的数据，看Map集合中是否存在，不存在存入“数据=1“，存在则其对应值+1,

```java
public static void t4() {
    // 1、把80个学生选择的数据拿进来。
    String[] selects = {"A" , "B", "C", "D"};
    StringBuilder sb = new StringBuilder();
    Random r = new Random();
    //从数组中任选一个
    for (int i = 0; i < 80; i++) {
        sb.append(selects[r.nextInt(selects.length)]);
    }
    System.out.println(sb); // 生成80个ABCD

    // 2、定义一个Map集合记录最终统计的结果： A=30 B=20 C=20 D=10  键是景点 值是选择的数量
    Map<Character, Integer> infos = new HashMap<>(); //

    // 3、遍历80个学生选择的数据
    for (int i = 0; i < sb.length(); i++) {
        // 4、提取当前选择景点字符
        char ch = sb.charAt(i);
        // 5、判断Map集合中是否存在这个键
        if(infos.containsKey(ch)){
            // 让其值 + 1
            infos.put(ch , infos.get(ch) + 1);
        }else {
            // 说明此景点是第一次被选
            infos.put(ch , 1);
        }
    }
    // 4、输出集合
    System.out.println(infos);
}
```



## HashMap

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301052117401.png" alt="image-20230105211717117" style="zoom:67%;" />

```java
public static void t5() {
    // Map集合是根据键去除重复元素,因此如果键是对象则要重写equals和hashcode方法
    Map<Student, String> maps = new HashMap<>();
    Student s1 = new Student("无恙", 20, '男');
    Student s2 = new Student("无恙", 20, '男');
    Student s3 = new Student("周雄", 21, '男');
    maps.put(s1, "北京");
    maps.put(s2, "上海");
    maps.put(s3, "广州");
    maps.forEach((k, v) -> System.out.println(k + ":" + v));
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220412120626297.png" alt="image-20220412120626297" style="zoom:67%;" />

## LinkedHashMap

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301052118025.png" alt="image-20230105211817836" style="zoom:60%;" />

```java
public static void t6() {
    // 1、创建一个Map集合对象
    Map<String, Integer> maps = new LinkedHashMap<>();
    maps.put("鸿星尔克", 3);
    maps.put("Java", 1);
    maps.put("枸杞", 100);
    maps.put("Java", 100); // 覆盖前面的数据
    maps.put(null, null);
    maps.forEach((k, v) -> System.out.println(k + ":" + v));
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220412120833993.png" alt="image-20220412120833993" style="zoom:67%;" />

## TreeMap

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301052118994.png" alt="image-20230105211855800" style="zoom:60%;" />

TreeMap集合自定义排序规则有2种

> - 类实现Comparable接口，重写比较规则。
> - 集合自定义Comparator比较器对象，重写比较规则

### Comparable 排序

```java
public static void t1() {
    Map<Integer, String> maps1 = new TreeMap<>();
    maps1.put(13 , "王麻子");
    maps1.put(1 , "张三");
    maps1.put(3 , "县长");
    maps1.forEach((k,v) -> {
        System.out.println(k+"--->"+v);
    });
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220412153535922.png" alt="image-20220412153535922" style="zoom:67%;" />

### 自带比较器排序

#### 复杂方式

```java
public static void t2() {
    // TreeMap集合自带排序。  可排序 不重复（只要大小规则一样就认为重复）  无索引
    Map<Apple, String> maps2 = new TreeMap<>(new Comparator<Apple>() {
        @Override
        public int compare(Apple o1, Apple o2) {
            return Double.compare(o2.getPrice() , o1.getPrice()); // 按照价格降序排序！
        }
    });
    maps2.put(new Apple("红富士", "红色", 9.9, 500), "山东" );
    maps2.put(new Apple("青苹果", "绿色", 15.9, 300), "广州");
    maps2.put(new Apple("绿苹果", "青色", 29.9, 400), "江西");
    maps2.put(new Apple("黄苹果", "黄色", 9.8, 500), "湖北");
    maps2.forEach((k,v) -> {
        System.out.println(k+"--->"+v);
    });
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220412153625398.png" alt="image-20220412153625398" style="zoom:67%;" />

#### 结果简化

```java
public static void t3() {
    Map<Apple, String> maps2 = new TreeMap<>((o1, o2) -> {
          return Double.compare(o2.getPrice() , o1.getPrice()); // 按照价格降序排序！
    });
    maps2.put(new Apple("红富士", "红色", 9.9, 500), "山东" );
    maps2.put(new Apple("青苹果", "绿色", 15.9, 300), "广州");
    maps2.put(new Apple("绿苹果", "青色", 29.9, 400), "江西");
    maps2.put(new Apple("黄苹果", "黄色", 9.8, 500), "湖北");
    maps2.forEach((k,v) -> {
        System.out.println(k+"--->"+v);
    });
}
```

## 集合嵌套案例

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301052125017.png" alt="image-20230105212551852" style="zoom:50%;" />

```java
public class MapTest4 {
    public static void main(String[] args) {
        // 1、要求程序记录每个学生选择的情况。
        // 使用一个Map集合存储。
        Map<String, List<String>> data = new HashMap<>();

        // 2、把学生选择的数据存入进去。
        List<String> selects = new ArrayList<>();
        Collections.addAll(selects, "A", "C");
        data.put("罗勇", selects);

        List<String> selects1 = new ArrayList<>();
        Collections.addAll(selects1, "B", "C" , "D");
        data.put("胡涛", selects1);

        List<String> selects2 = new ArrayList<>();
        Collections.addAll(selects2 , "A",  "B", "C" , "D");
        data.put("刘军", selects2);

        System.out.println(data);

        // 3、统计每个景点选择的人数。
        Map<String, Integer> infos = new HashMap<>(); // {}

        // 4、提取所有人选择的景点的信息。
        Collection<List<String>> values = data.values();
        System.out.println(values);
        // values = [[A, B, C, D], [B, C, D], [A, C]]
        //             value

        for (List<String> value : values) {
            for (String s : value) {
                // 有没有包含这个景点
                if(infos.containsKey(s)){
                    infos.put(s, infos.get(s) + 1);
                }else {
                    infos.put(s , 1);
                }
            }
        }

        System.out.println(infos);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301052125194.png" alt="image-20230105212528051" style="zoom:80%;" />

## HashMap注意事项

本文演示了 HashMap 作为返回类型时隐藏的一个小“坑”，因为 HashMap 本身是无序的，所以它会导致查询顺序和插入顺序不一致的问题，对应的解决方案有两种：使用确定的数据类型来替代 HashMap，比如 List，或者使用有序的 LinkedHashMap 来替代无序的 HashMap。

### 起因

最近公司的系统要增加一个新的列表展示功能，功能本身难度并不大，但遇到了一个很“可怪”的问题。小伙伴在执行查询列表时，`明明已经使用了 order by 进行排序了，但最终查询出来的数据却还是乱的。`

预期中的（正确）结果：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206301544490.png" alt="image-20220630154449424" style="zoom:50%;" />

现实中的（非预期）结果：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206301545062.png" alt="image-20220630154506999" style="zoom:50%;" />

那到底是哪里出现了问题呢？

### 问题展示

为了方便展示，我把复杂的业务程序简化成了以下代码：

```java
@Test
public void test1() {
    HashMap<String, Object> result = getList();
    result.forEach((k, v) -> {
        System.out.println(k + "：" + v);
    });
}
```

```java
// 查询方法(简化版)
public static HashMap<String, Object> getList() {
    HashMap<String, Object> result = new HashMap<>(); // 最终返回的结果集
    // 伪代码：从数据库中查询出了数据，然后对数据进行处理之后，存到了
    for (int i = 1; i <= 5; i++) {
        result.put("2022-10-" + i, "hello java" + i);
    }
    return result;
}
```

以上程序的执行结果如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206301547039.png" alt="image-20220630154750974" style="zoom:67%;" />

预期的结果应该是按时间的先后顺序展示的，如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206301547611.png" alt="image-20220630154734536" style="zoom: 67%;" />

> PS：以上示例代码中，插入元素的顺序是有序的（从 1 到 5），相当于实际业务场景中的 order by。

### 原因分析

> 既然原数据使用了 order by 排序，那么原数据肯定是没问题的，那问题就只会出现在返回集 HashMap 上，然后我们再把焦点放到 HashMap 上， 瞬间醒悟，哦，原来如此。**HashMap 使用的是哈希方式进行存储的，因此存入和读取的顺序可能是不一致的**，这也说 HashMap 是无序的集合，所以会导致插入的（或 order by 的）顺序，与最终展示的顺序不一致。

### 解决方案

经过上面的分析我们顺利找到了问题，那接下来就是制定相应的解决方案了，我想到的解决方案有两个：

1. 稍微麻烦一点但正确的解决方案：将返回的不确定数据类型 HashMap 改为确定的数据类型，比如 List；
2. 简单一点但并不是最优的解决方案：将无序的 HashMap 改为有序的 LinkedHashMap，此方案的优点是，只需要改动一个单词就可以解决整个问题了。

第一种解决方案大家都懂这里就不演示了，接下来咱们使用第二种解决方案将上面的问题改造一下，最终的实现代码如下：

```java
// 查询方法(简化版)
public static HashMap<String, Object> getList() {
    HashMap<String, Object> result = new LinkedHashMap<>(); // 最终返回的结果集
    // 伪代码：从数据库中查询出了数据，然后对数据进行处理之后，存到了
    for (int i = 1; i <= 5; i++) {
        result.put("2022-10-" + i, "hello java" + i);
    }
    return result;
}
```

以上程序的执行结果如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206301549521.png" alt="image-20220630154929455" style="zoom:67%;" />

从上述结果可以看出，当使用 LinkedHashMap 替代了 HashMap  之后，返回的顺序就能和插入的顺序保持一致了。

### LinkedHashMap 的魔力

为什么 HashMap 是无序的，而 LinkedHashMap 却是有序的呢？

> 这要从二者的实现说起了，LinkedHashMap 属于 HashMap 的子类，所以 LinkedHashMap  除了拥有 HashMap 的所有特性之后，还具备自身的一些扩展属性，其中就包括 **LinkedHashMap 中额外维护了一个双向链表，这个双向链表就是用来保存元素的（插入）顺序的**，这也是为什么 LinkedHashMap 可以实现访问顺序和插入顺序一致的原因了。



## Map几个好用方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022/202204211010311.png" alt="image-20220421101008257" style="zoom:67%;" />

### 预防空指针问题

日常开发中我们通常会从 `Map`获取元素，然后进行相关的业务处理，示例代码如下：

```java
Map<String, String> map = new HashMap();
map.put("公号", "小黑十一点半");
map.put("主理人", "楼下小黑哥");
// 可能存在 NPE 问题
System.out.println(map.get("支付").toUpperCase());
```

如果就像示例代码直接处理，一旦 `Map`中相应元素不存在，那么我们就会碰到空指针问题。

为了解决这个问题，通常我们可以先判断一下元素是否为 `null`，如果不为 `null`，再做相应的业务处理。

```java
// 第一种 if 判空
String value = map.get("支付");
if (!Objects.isNull(value)) {
    System.out.println(value.toUpperCase());
}
```

这种方式唯一劣势就是代码处理上比较繁琐，不是很简洁。

所以针对这种情况，其实可以使用**「条件运算符」**，设置一个默认空值，从而避免后续处理发生空指针。

```java
// 第一种 if 判空
String value = map.get("支付");
// 第二种 条件运算符
value = Objects.isNull(value) ? "" : value;
```

这种方式比较简洁，所以日常开发中我比较喜欢用这种方式。

> ps: 这里的前提，空字符串对于业务没有特殊意义。如果存在特殊意义，那就不能使用这种方式了。

那如果使用 JDK8 ，其实就很方便了，我们就可以使用 `Map#getOrDefault`直接代替条件运算符。

```java
// 等同于条件运算符的效果：Objects.isNull(value) ? "" : value;
//第一个参数是key，第二个参数是没有该值去给默认值
String value = map.getOrDefault("支付","没有该值");
```

借助 `Map#getOrDefault` 一行代码直接搞定，就是这么简单。

如果你还在使用 JDK8 之前的版本，没办法使用这个方法。没关系，我们可以借助 Apache **「Common-Lang3」** 提供的工具类 `MapUtils` 避免空指针。

```java
// Apache MapUtils
String value = MapUtils.getString(map, "支付", "");
```

`MapUtils`这个工具类相对于`Map#getOrDefault`有一个好处，针对传入 `Map`为 `null` 的情况，可以设置默认值。

假设我们是从 `POJO`对象获取 `Map` 参数，这个时候为了防止空指针，我们就需要提前做一个空指针的判断。

不过如果使用 `MapUtils`，那我们就不需要判断是否为 `null`，方法内部已经封装这个逻辑。

```java
MapUtils.getString(pojo.getMap(),"支付", "");
```



### 巧用 computeIfAbsent

日常开发中，我们会碰到这类场景，需要`一个键需要映射到多个值`，这个时候我们可以使用 `Map<K, List<V>>`这个结构。

此时添加元素的时候，我们需要做一些判断，当内部元素不存在时候主动创建一个集合对象，示例代码如下：

```java
Map<String, List<String>> map = new HashMap();

List<String> classify = map.get("java框架");
if (Objects.isNull(classify)) {
    classify = new ArrayList<>();
    classify.add("Spring");
    map.put("java框架", classify);
} else {
    classify.add("Spring");
}
```

上面的代码比较繁琐，到了 JDK8，`Map`新增一个 `computeIfAbsent`方法：

```java
default V computeIfAbsent(K key,
        Function<? super K, ? extends V> mappingFunction) {
```

如果 `Map`中  `key` 对应的 `value` 不存在，则会将 `mappingFunction` 计算产生的值作为保存为该 `key` 的 `value`，并且返回该值。否则不作任何计算，将会直接返回  `key` 对应的 value。

利用这个特性，我们可以直接使用 `Map#computeIfAbsent`一行代码完成上面的场景，示例代码如下：

```java
public static void t1() {
    Map<String, Object> map = new HashMap<>();
    //创建集合
    List<String> list = new ArrayList<>();
    list.add("张三");
    list.add("李四");
    //其实直接map.put也是可以的，因为value值是Object类型
    map.computeIfAbsent("姓名", key -> list);
    System.out.println(map);
}
```

那其实 `Map` 中还有一个方法 `putIfAbsent`，功能跟 `computeIfAbsent`比较类似。

那刚开始使用的时候，误以为可以使用 `putIfAbsent`完成上面的需求：

```java
// ERROR:会有 NPE 问题
map.putIfAbsent("java框架", new ArrayList<>()).add("Spring");
```

那其实这是错误的，当 `Map` 中 `key` 对应 `value` 不存在的时候，`putIfAbsent`将会直接返回 `null`。

而 `computeIfAbsent`将会返回 `mappingFunction`计算之后的值，像上面的场景直接返回就是 `new ArrayList`。

这一点需要注意一下，切勿用错方法，导致空指针。

最后针对上面这种一个键需要映射到多个值，其实还有一个更优秀的解决办法，使用 Google Guava 提供的新集合类型 `Multiset`，以此快速完成一个键需要映射到多个值的场景。

示例代码如下：

```java
ArrayListMultimap<Object, Object> multiset= ArrayListMultimap.create();
multiset.put("java框架","Spring");
multiset.put("java框架","Mybatis");
// java框架--->Spring,Mybatis
```



### 单词统计

假设有如下需求，我们需要统计一段文字中相关单词出现的次数。那实现方式其实很简单，使用 `Map`存储相关单词的次数即可，示例代码如下：

```java
Map<String, Integer> countMap = new HashMap();
Integer count = countMap.get("java");
if (Objects.isNull(count)) {
    countMap.put("java", 1);
    
} else {
    countMap.put("java", count++);
}
```

这类代码是不是很熟悉？同样比较繁琐。

接下来我们可以使用 JDK8 `Map` 新增方法进行改造，这次使用上面用过的 `getOrDefault` 再加 `put` 方法快速解决，示例代码如下：

```java
// getOrDefault
Integer count = countMap.getOrDefault("java",0);
countMap.put("java", count + 1);
```

那其实我们还有一种办法，这次我们使用 `Map#merge`这个新方法，一句代码完成上述需求，示例代码如下：

```java
countMap.merge("java", 1, Integer::sum);
```

说真的，刚看到 `merge`这个方法的时候还是有点懵，尤其后面直接使用 `lambda` 函数，让人不是很好理解。

这里先将`lambda` 函数还原成正常类，给大家着重解释一下这个方法：

```java
countMap.merge("java", 1, new BiFunction<Integer, Integer, Integer>() {
    @Override
    public Integer apply(Integer oldValue, Integer newValue) {
        return Integer.sum(oldValue,newValue);
    }
});
```

用上面代码说明一下`merge`方法，如果 `java`这个值在 `countMap`中不存在，那么将会其对应的 `value` 设置为 1。

那如果 `java` 在 `countMap` 中存在，则会调用第三个参数 `remappingFunction` 函数方法进行计算。

`remappingFunction` 函数中，`oldValue`代表原先 `countMap` 中 `java` 的值，`newValue`代表我们设置第二个参数 **「1」**，这里我们将两者相加，刚好完成累加的需求。

### merge()用法

Java 8 最大的特性无异于更多地面向函数，比如引入了 lambda等，可以更好地进行函数式编程。前段时间无意间发现了 map.merge() 方法，感觉还是很好用的，此文简单做一些相关介绍。首先我们先看一个例子。

> merge() 可以这么理解：它将新的值赋值到 key （如果不存在）或更新给定的key 值对应的 value

#### 使用场景

这个使用场景相对来说还是比较多的，比如分组求和这类的操作，虽然 stream 中有相关 groupingBy() 方法，但如果你想在循环中做一些其他操作的时候，merge() 还是一个挺不错的选择的。

#### merge() 怎么用？

假设我们有这么一段业务逻辑，我有一个学生成绩对象的列表，对象包含学生姓名、科目、科目分数三个属性，要求求得每个学生的总成绩。加入列表如下：

```java
private List<StudentScore> buildATestList() {
        List<StudentScore> studentScoreList = new ArrayList<>();
        StudentScore studentScore1 = new StudentScore() {{
            setStuName("张三");
            setSubject("语文");
            setScore(70);
        }};
        StudentScore studentScore2 = new StudentScore() {{
            setStuName("张三");
            setSubject("数学");
            setScore(80);
        }};
        StudentScore studentScore3 = new StudentScore() {{
            setStuName("张三");
            setSubject("英语");
            setScore(65);
        }};
        StudentScore studentScore4 = new StudentScore() {{
            setStuName("李四");
            setSubject("语文");
            setScore(68);
        }};
        StudentScore studentScore5 = new StudentScore() {{
            setStuName("李四");
            setSubject("数学");
            setScore(70);
        }};
        StudentScore studentScore6 = new StudentScore() {{
            setStuName("李四");
            setSubject("英语");
            setScore(90);
        }};
        StudentScore studentScore7 = new StudentScore() {{
            setStuName("王五");
            setSubject("语文");
            setScore(80);
        }};
        StudentScore studentScore8 = new StudentScore() {{
            setStuName("王五");
            setSubject("数学");
            setScore(85);
        }};
        StudentScore studentScore9 = new StudentScore() {{
            setStuName("王五");
            setSubject("英语");
            setScore(70);
        }};

        studentScoreList.add(studentScore1);
        studentScoreList.add(studentScore2);
        studentScoreList.add(studentScore3);
        studentScoreList.add(studentScore4);
        studentScoreList.add(studentScore5);
        studentScoreList.add(studentScore6);
        studentScoreList.add(studentScore7);
        studentScoreList.add(studentScore8);
        studentScoreList.add(studentScore9);

        return studentScoreList;
    }
```

我们先看一下常规做法：

```java
ObjectMapper objectMapper = new ObjectMapper();
List<StudentScore> studentScoreList = buildATestList();
Map<String, Integer> studentScoreMap = new HashMap<>();
studentScoreList.forEach(studentScore -> {
       if (studentScoreMap.containsKey(studentScore.getStuName())) {
            studentScoreMap.put(studentScore.getStuName(), 
            studentScoreMap.get(studentScore.getStuName()) + studentScore.getScore());
       } else {
            studentScoreMap.put(studentScore.getStuName(), studentScore.getScore());
       }
});
System.out.println(objectMapper.writeValueAsString(studentScoreMjavaap));
// 结果如下：
// {"李四":228,"张三":215,"王五":235}
```

然后再看一下 merge() 是怎么做的：

```java
Map<String, Integer> studentScoreMap2 = new HashMap<>();
studentScoreList.forEach(studentScore -> studentScoreMap2.merge(
       studentScore.getStuName(),
       studentScore.getScore(),
       Integer::sum));
System.out.println(objectMapper.writeValueAsString(studentScoreMap2));
// 结果如下：
// {"李四":228,"张三":215,"王五":235}
```



## List 转 Map

[List 转 Map， 齐活！ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247497214&idx=2&sn=7cc28b1ad7c2f70f0ef278de59f562b4&chksm=fc2c49f6cb5bc0e0a8ab93e9b93bea8db5bfbe3b469ae601203af49b73a3f8b88fd46b7ea3ea&mpshare=1&scene=23&srcid=0511RLoySDzMu3eAtXbyabDI&sharer_sharetime=1652199865076&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

### 准备工作

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Animal {
    private int id;
    private String name;
}
```

我们假定 id 字段 是唯一的， 所以我们把 id 作为 Map 的key。

打印数据

```java
public static void t1() {
    List<Animal> list = new ArrayList<>();
    Collections.addAll(list, new Animal(1, "cat"), new Animal(2, "dog"));
    Map<Integer, Animal> map = convertList(list);
    // 打印全部数据
    map.forEach((k, v) -> log.info("key: {}, value: {}", k, v));
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205121259877.png" alt="image-20220512125906801" style="zoom:80%;" />



### 使用 Java 8 之前的方法

在使用Java 8 之前，就只能使用比较传统的for 循环来转换。

```java
public static Map<Integer, Animal> convertList(List<Animal> list) {
    Map<Integer, Animal> map = new HashMap<>();
    for (Animal animal : list) {
        map.put(animal.getId(), animal);
    }
    return map;
}
```



### 使用Java 8 stream(推荐)

```java
public static Map<Integer, Animal> convertList(List<Animal> list) {
    return list.stream()
            .collect(Collectors.toMap(Animal::getId, Function.identity()));
}
```



### 使用Guava库

除了使用核心的Java API ，我们还能通过第三方库来实现这些操作。

使用Guava 库， 我们需要先引入依赖， 我们先在maven 中引入进来。

```xml
<!-- https://mvnrepository.com/artifact/com.google.guava/guava -->
<dependency>
    <groupId>com.google.guava</groupId>
    <artifactId>guava</artifactId>
    <version>31.0.1-jre</version>
</dependency>
```

接下来使用 Maps.uniqueIndex() 进行转换

```java
public static Map<Integer, Animal> convertList(List<Animal> list) {
    return Maps.uniqueIndex(list, Animal::getId);
}
```



### 使用 Apache Commons 库

除了 Guava ，我们还可以使用常用的 Apache Commons 库来进行转换。

我们现在Maven 中引入 commons 的依赖库

```xml
<!-- https://mvnrepository.com/artifact/org.apache.commons/commons-collections4 -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-collections4</artifactId>
    <version>4.4</version>
</dependency>
```

接下来我们使用 MapUtils.populateMap() 方法进行转换。

```java
public static Map<Integer, Animal> convertList(List<Animal> list) {
    Map<Integer, Animal> map = new HashMap<>();
    MapUtils.populateMap(map, list, Animal::getId);
    return map;
}
```



### Map Key 的冲突问题

由于List中可以存在多个相同的实例， 但是map却不行， 那我们来看看Map要怎么处理呢？

首先，我们初始化一个有重复对象的 List

```java
List<Animal> list = new ArrayList<>();
Collections.addAll(list, new Animal(1, "cat"), new Animal(2, "dog"),new Animal(2, "dog"));
```

- Apache Commons 和 Java 8 之前的代码是一样的，相同id的Map 在put 的时候会进行覆盖
- 而 Java 8 的 Collectors.toMap() 和 Guava 的 MapUtils.populateMap() 分别抛出 IllegalStateException 和   IllegalArgumentException。



# 不可变集合

## 简介

注意：是java9推出的

> - 不可变集合，就是不可被修改的集合。
> - 集合的数据项在创建的时候提供，并且在整个生命周期中都不可改变。否则报错

**为什么要创建不可变集合**？

> - 如果某个数据不能被修改，把它防御性地拷贝到不可变集合中是个很好的实践。
> - 或者当集合对象被不可信的库调用时，不可变形式是安全的。

**如何创建不可变集合？**

- 在List、Set、Map接口中，都存在of方法，可以创建一个不可变的集合

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220412155905677.png" alt="image-20220412155905677" style="zoom:67%;" />

- 这个集合不能添加，不能删除，不能修改

## 创建List

```java
// 1、不可变的List集合
List<Double> lists = List.of(569.5, 700.5, 523.0,  570.5);
// lists.add(689.0);
// lists.set(2, 698.5);
// System.out.println(lists);
double score = lists.get(1);
System.out.println(score);
```

```java
public class CollectionDemo {
    private static List<Integer> list1;

    public static void main(String[] args) {
        List<Integer> lists = new ArrayList<>();
        Collections.addAll(lists, 1,2,3);
        list1 = Collections.unmodifiableList(lists);
        list1.add(1);
    }
}
```

## 创建Set

```java
// 2、不可变的Set集合
Set<String> names = Set.of("迪丽热巴", "迪丽热九", "马尔扎哈", "卡尔眨巴" );
// names.add("三少爷");
System.out.println(names);
```

## 创建Map

真正实现一个静态不可变的map，需要Collections.unmodifiableMap，代码如下：

```java
public class Test2 {    
    private static final Map<Integer, String> map;   
    static {      
        Map<Integer,String> aMap = new HashMap<>();      
        aMap.put(1, "one");     
        aMap.put(2, "two");       
        map = Collections.unmodifiableMap(aMap);  
    }
    public static void main(String[] args) {   
        map.put(3, "3");       
        Iterator itr = map.entrySet().iterator();      
        while(itr.hasNext()) {          
            Map.Entry entry = (Map.Entry) itr.next();           
            // get key           
            Integer key = (Integer) entry.getKey();       
            // get value            
            String value = (String) entry.getValue();
            System.out.println("key:"+key+",value:"+value);      
        }  
    }
}
```

运行结果如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207181814916.png" alt="image-20220718181442836" style="zoom:67%;" />

可以发现，继续往map添加元素是会报错的，实现真正不可变的map。



# Stream 流⭐

[Java 8 Stream：2 万字 20 个实例，玩转集合的筛选、归约、分组、聚合 (qq.com)](https://mp.weixin.qq.com/s?__biz=MzkzMDI1NjcyOQ==&mid=2247498451&idx=1&sn=2ec53ca05217886909cbfbff1cc249f3&chksm=c27fb8e5f50831f3ff43ddf0fa06443aa51259a780c17e95c3da7504d76f08063fe39cfece44&mpshare=1&scene=23&srcid=04202Xpf6mC19iyjJRTyczcf&sharer_sharetime=1650467878744&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

## Stream 概述

### 优势 & 特性

> - 在JDK8中，得益于**Lambda表达式所带来的函数式编程**，引入了一个全新的Stream流概念
> - 目的：用于**简化集合和数组操作的API**
> - 能让我们快速完成复杂的操作，如**筛选、切片、映射、查找、去除重复，统计，匹配和归约**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220412160124914.png" alt="image-20220412160124914" style="zoom:67%;" />

> 1. **不存储数据，而是按照特定的规则对数据进行计算，一般会输出结果**。
> 2. **不会改变数据源，通常情况下会产生一个新的集合或一个值**。
> 3. **具有延迟执行特性，只有调用终端操作时，中间操作才会执行**。

### 思想核心

#### 核心思想

![image-20211015110026203](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211015110026203.png)

> 也就是下面的由数据源----->中间操作------->终端操作

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207311139513.png" alt="image-20220731113915432" style="zoom:67%;" />

#### 中间操作

> - 当数据源中的数据上了流水线后，这个过程对数据进行的所有操作都称为“中间操作”；
> - 中间操作仍然会返回一个流对象，因此多个中间操作可以串连起来形成一个流水线；
> - stream 提供了多种类型的中间操作，如 filter、distinct、map、sorted 等等；

#### 终端操作

> - 当所有的中间操作完成后，若要将数据从流水线上拿下来，则需要执行终端操作；
> - stream 对于终端操作，可以直接提供一个中间操作的结果，或者将结果转换为特定的 collection、array、String

### 使用入门

需求：按照下面的要求完成集合的创建和遍历

> - **创建一个集合，存储多个字符串元素**
> - **把集合中所有以"张"开头的元素存储到一个新的集合**
> - **把"张"开头的集合中的长度为3的元素存储到一个新的集合**
> - **遍历上一步得到的集合中的元素输出。**

#### 使用集合API

```java
@Test
public void test1() {
    List<String> names = new ArrayList<>();
    Collections.addAll(names,"张三","李四唉","王五五","张强");
    //1、从集合中找出姓张的新集合
    List<String> zhang = new ArrayList<>();
    for (String name:names) {
        if (name.startsWith("张")){
            zhang.add(name);
        }
    }
    System.out.println(zhang); //[张三, 张强]
    //2、找名称长度是3的姓名
    List<String> th = new ArrayList<>();
    for(String name:names){
        if (name.length() == 3){
            th.add(name);
        }
    }
    System.out.println(th); //[李四唉, 王五五]
}
```

#### 使用Stream流

```java
// 正常使用
names.stream().filter(s -> s.startsWith("张") || s.length()==3)
              .forEach(System.out::println);
// 链式编程
names.stream().filter(s -> s.startsWith("张"))
              .filter(s -> s.length()==2)
              .forEach(System.out::println);
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212201429316.png" alt="image-20221220142903151" style="zoom: 50%;" />

## 第一步：获取Stream流 ⭐

> Stream操作集合或者数组的第一步是先得到Stream流，然后才能使用流的功能
>

```java
public class StreamDemo02 {
    public static void main(String[] args) {
        // Collection集合获取流
        Collection<String> list = new ArrayList<>();
        Stream<String> s =  list.stream();
        // 创建一个并行流
        Stream<String> parallelStream = list.parallelStream();
        
        // Map集合获取流
        Map<String, Integer> maps = new HashMap<>();
        // 键流
        Stream<String> keyStream = maps.keySet().stream();
        // 值流
        Stream<Integer> valueStream = maps.values().stream();
        // 键值对流（拿整体）
        Stream<Map.Entry<String,Integer>> keyAndValueStream =  maps.entrySet().stream();

        // 数组获取流
        String[] names = {"赵敏","小昭","灭绝","周芷若"};
        Stream<String> nameStream = Arrays.stream(names);
        Stream<String> nameStream2 = Stream.of(names);
    }
}
```

## 第二步：中间方法 ⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211015111730918.png" alt="image-20211015111730918" style="zoom: 80%;" />

### 数据准备

```java
public class Person {
    private String name;  // 姓名
    private int salary; // 薪资
    private int age; // 年龄
    private String sex; //性别
    private String area;  // 地区
    // 省略了一大堆javabean方法
}
```

```java
public static List<Person> getPersonList() {
    List<Person> personList = new ArrayList<>();
    personList.add(new Person("Tom", 8900, 22,"male" ,"New York"));
    personList.add(new Person("Jack", 7000,23, "male","Washington"));
    personList.add(new Person("Lily", 7800,24, "female", "Washington"));
    personList.add(new Person("Anni", 8200, 21,"female", "New York"));
    personList.add(new Person("Owen", 9500, 12,"male", "New York"));
    personList.add(new Person("Alisa", 7900, 32,"female", "New York"));
    return personList;
}
```

### 过滤filter⭐

> **筛选，是按照一定的规则校验流中的元素，将符合条件的元素提取到新的流中的操作**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022/202204221743516.png" alt="image-20220422174302446" style="zoom: 67%;" />

#### filter

```java
public static void filterTest() {
    List<User> list = getUsers();
    // 获取所有男性用户
    list.stream().filter(user -> user.getSex() == '男').forEach(System.out::println);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206190953249.png" alt="image-20220619095313161" style="zoom:67%;" />

#### filter+find

```java
public static void s1() {
    Person p1 = getPersonList().stream()
            .filter(person -> person.getSalary() > 8500)
        	// 找到第一个符合条件的,使用findAny是获取任意一个
            .findFirst().get();
    System.out.println("p1 = " + p1);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.8.17/image-20230714160739297.png" alt="image-20230714160739297" style="zoom:80%;" />

#### filter+map

```java
public static void filterTest() {
    List<User> list = getUsers();
    // map方法改变了原来的list
    list.stream().filter(user -> user.getSex() == '男').map(user -> {
        user.setId(user.getId());
        user.setName(user.getName() + "先生");
        user.setSalary(user.getSalary() * 1.1);
        return user;
    }).forEach(System.out::println);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206191000334.png" alt="image-20220619100057254" style="zoom:67%;" />

#### filter+字符串API

```java
public static void filterTest() {
    List<User> list = getUsers();
    // 得到名字长度为3个字的人(过滤),集合中的方法均能使用
    list.stream().filter(s -> s.getName().length() ==2).forEach(System.out::println); 
    // 相同
    list.stream().filter(s -> s.getName().equals("老子")).forEach(System.out::println); 
    //以苏开头
    list.stream().filter(s -> s.getName().startsWith("苏")).forEach(System.out::println); 
    //包含
    list.stream().filter(s -> s.getName().contains("子")).forEach(System.out::println); 
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206191005905.png" alt="image-20220619100521826" style="zoom:67%;" />

### 映射map⭐

> 映射，可以将一个流的元素按照一定的映射规则映射到另一个流中。分为`map`和`flatMap`
>

> - map：接收一个函数作为参数，该函数会被应用到每个元素上，并将其映射成一个新的元素。
> - flatMap：接收一个函数作为参数，将流中的每个值都换成另一个流，然后把所有流连接成一个流

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022/202204221748068.png" alt="image-20220422174846990" style="zoom: 67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022/202204221748582.png" alt="image-20220422174858508" style="zoom:67%;" />

> **英文字符串数组的元素全部改为大写。整数数组每个元素+3**

```java
public static void map() {
    String[] strArr = { "abcd", "bcdd", "defde", "fTr" };
    Arrays.stream(strArr)
            // 字符全部大写
            .map(String::toUpperCase)
            .forEach(System.out::println);

    List<Integer> intList = Arrays.asList(1, 3, 5, 7, 9, 11);
    List<Integer> intListNew = intList.stream()
            // 每个元素加3
            .map(x -> x + 3)
            .collect(Collectors.toList());
    System.out.println("每个元素+3：" + intListNew);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.8.17/image-20230714155158315.png" alt="image-20230714155158315" style="zoom:80%;" />

> **将员工的薪资全部增加100**

```java
public static void s2() {
    // 不改变原来员工集合的方式
    List<Person> personListNew = getPersonList().stream()
            .map(person -> {
                // 给每位员工工资+100
                person.setSalary(person.getSalary()+100);
                return person; })
            .collect(Collectors.toList());
    personListNew.forEach(System.out::println);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.8.17/image-20230714160142266.png" alt="image-20230714160142266" style="zoom:80%;" />

### 归约reduce⭐

> 如果需要将所有数据归纳得到一个数据，可以使用reduce 方法
>

> 归约，也称缩减，顾名思义，是把一个流缩减成一个值，能实现对集合求和、求乘积和求最值操作
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022/202204221749182.png" alt="image-20220422174927127" style="zoom:67%;" />

```java
public static void reduce() {
    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
    // 两个参数：初始值和二元操作符(可以是Lambda表达式)
    Integer sum = numbers.stream().reduce(0, Integer::sum);
    Integer max = numbers.stream().reduce(0, Integer::max);
    Integer min = numbers.stream().reduce(1, Integer::min);
    Integer reduce = numbers.stream().reduce((x, y) -> x * y).get();
    System.out.println("sum = " + sum);
    System.out.println("max = " + max);
    System.out.println("min = " + min);
    System.out.println("reduce = " + reduce);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.8.17/image-20230714154634134.png" alt="image-20230714154634134" style="zoom:80%;" />

### 合并Stream流

```java
public static void combine() {
    List<Person> list = getPersonList();
    Stream<Person> s1 = list.stream().skip(3);
    Stream<Person> s2 = list.stream().limit(2);
    // 合并成一个流(数据也变成两倍了)
    Stream<Person> newStream = Stream.concat(s1, s2);
    // 注意:合并流之后,不能操作之前的流啦.
    newStream.forEach(System.out::println);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.8.17/image-20230714152805131.png" alt="image-20230714152805131" style="zoom:80%;" />

### 排序sorted⭐

sorted，中间操作。有两种排序：

> - sorted()：自然排序，流中元素需实现Comparable接口
> - sorted(Comparator com)：Comparator排序器自定义排序

```java
public static void testSort() {
    List<Person> newList = getPersonList().stream()
            // 按工资升序排序（自然排序）
            .sorted(Comparator.comparing(Person::getSalary))
            // 按照年龄降序排序(工资相同则按照年龄降序排序)
            .sorted(Comparator.comparing(Person::getAge).reversed())
            .collect(Collectors.toList());
    newList.forEach(System.out::println);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.8.17/image-20230714153617036.png" alt="image-20230714153617036" style="zoom:80%;" />

### 去重distinct

流还支持一个叫做 **distinct** 的方法，它会返回一个元素各异（根据流所生成的元素的 hashCode 和 equals 方法实现）的流。

```java
public static void filterTest() {
    // 这里进行多复制几条相同的
    List<Person> list = getPersonList();
    // 去重需要在实体类中实现equals和hashcode方法，不然不生效
    list.stream().distinct().forEach(System.out::println);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.8.17/image-20230714152221430.png" alt="image-20230714152221430" style="zoom:80%;" />

### 分页skip+limit

> - limit 方法用于获取指定数量的流。
> - skip表示的是扔掉前n个元素。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022/202204221750799.png" alt="image-20220422175028722" style="zoom:67%;" />

```java
public static void testPage() {
    List<Person> list = getPersonList();
    list.stream().skip(3).forEach(System.out::println);
    list.stream().limit(1).forEach(System.out::println);
    list.stream().skip(2).limit(2).forEach(System.out::println);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.8.17/image-20230714151546901.png" alt="image-20230714151546901" style="zoom:80%;" />

### 统计summaryStatistics

> SummaryStatistics 用于收集统计信息(**总数、最大、最小、求和以及平均数**)的状态对象
>

```java
public static void summary() {
    List<Person> list = getPersonList();
    DoubleSummaryStatistics stats = list.stream()                 
                                        .mapToDouble(Person::getSalary)
                                        .summaryStatistics();
    System.out.println("总人数 = " + stats.getCount());
    System.out.println("最大值 : " + stats.getMax());
    System.out.println("最小值 : " + stats.getMin());
    System.out.println("求和 : " + stats.getSum());
    System.out.println("平均数 : " + stats.getAverage());
}
```


### 调试输出peek⭐

> 你可以在 `peek()` 方法中执行其他自定义操作，例如记录日志、修改对象状态等。但需要注意，`peek()` 方法应该被用于调试或记录流的中间结果，而不应该用于执行副作用操作或修改流中的元素。

```java
public static void s1() {
    List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

    names.stream()
            .filter(name -> name.length() > 3)
            .map(String::toUpperCase)
            .peek(System.out::println)
            .sorted()
            .map(String::toLowerCase)
            .forEach(System.out::println);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.8.17/image-20230714161711708.png" alt="image-20230714161711708" style="zoom:80%;" />

## 最终步：终结方法

终结方法只能调用一次，不可调用第二次

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211015130253173.png" alt="image-20211015130253173" style="zoom:80%;" />

```java
public static void testForeach() {
    // 遍历
    getPersonList().stream().filter(p -> p.getAge()>23).forEach(System.out::println);
    getPersonList().forEach(System.out::println);
    // 计数
    long count = getPersonList().stream().count();
    long count1 = getPersonList().size();
    System.out.println(count+"-"+count1);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301071525292.png" alt="image-20230107152505128" style="zoom:67%;" />

### 归集(toList/toSet/toMap

> 因为流不存储数据，那么在中的数据完成处理后，需要将流中的数据重新归集到新的集合里。`toList`、`toSet`和`toMap`比较常用，另外还有`toCollection`、`toConcurrentMap`等复杂一些的用法。
>

```java
public static void filterTest() {
    List<User> list = getUsers();
    // 转换成list
    List<User> li = list.stream().filter(s -> s.getSalary()>3000)
                         .collect(Collectors.toList());
    // 转换成set
    Set<User> li1 = list.stream()
                        .filter(s -> s.getSalary() > 3000)
                        .collect(Collectors.toSet());
    // 转换成map
    Map<Integer, User> map = list.stream()
                                 .filter(s -> s.getSalary() > 3000)
                                 .collect(Collectors.toMap(User::getId, s -> s));
    System.out.println(li);
    System.out.println(set);
    System.out.println(map);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211221600616.png" alt="image-20221122160008509" style="zoom:80%;" />

### 分组groupingBy/partitioningBy

> - 分区：将`stream`按条件分为两个`Map`，比如员工按薪资是否高于8000分为两部分。
> - 分组：将集合分为多个Map，比如员工按性别分组。有单级分组和多级分组。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022/202204221749847.png" alt="image-20220422174950774" style="zoom:67%;" />

**「案例：将员工按薪资是否高于8000分为两部分；将员工按性别和地区分组」**

```java
public static void s9() {
    // 将员工按薪资是否高于8000分组
    Map<Boolean, List<Person>> part = getPersonList().stream()
            .collect(Collectors.partitioningBy(x -> x.getSalary() > 8000));
    
    // 将员工按性别分组
    Map<String, List<Person>> group = getPersonList().stream()
            .collect(Collectors.groupingBy(Person::getSex));
    
    // 将员工先按性别分组，再按地区分组
    Map<String, Map<String, List<Person>>> group2 = getPersonList().stream()
            .collect(Collectors.groupingBy(Person::getSex,
                                           Collectors.groupingBy(Person::getArea)));

    System.out.println("员工按薪资是否大于8000分组情况：" + part);
    System.out.println("员工按性别分组情况：" + group);
    System.out.println("员工按性别、地区：" + group2);
}
```

### 拼接joining

`joining`可以将stream中的元素用`特定的连接符`（没有的话，则直接连接）`连接成一个字符串`。

```java
public static void testReduce() {
    List<Person> personList = getPersonList();
    String names = personList.stream().map(p -> p.getName()).collect(Collectors.joining(","));
    System.out.println("所有员工的姓名：" + names);
    List<String> list = Arrays.asList("A", "B", "C");
    String string = list.stream().collect(Collectors.joining("-"));
    System.out.println("拼接后的字符串：" + string);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301071625901.png" alt="image-20230107162534733" style="zoom:67%;" />

## 并行Stream流

> stream是顺序流，由主线程按顺序对流执行操作，而parallelStream是并行流，内部以多线程并行执行的方式对流进行操作，但前提是流中的数据处理没有顺序要求。例如筛选集合中的奇数，两者的处理不同之处：
>
> **stream：** 适用于避免线程安全问题、要求顺序执行、数据处理简单不耗时的任务；
>
> **parallelStream：** 适用于不存在线程安全问题、不需要顺序性执行、数据处理比较耗时的任务；

```java
// 掌握获取并行Stream流的两种方式
// 方式一:直接获取并行的Stream流
List<String> list = new ArrayList<>();
Stream<String> stream = list.parallelStream();

// 方式二:将串行流转成并行流
Stream<String> parallel = list.stream().parallel();
```

```java
public static void s9() {
    List<Integer> list = new ArrayList<>();
    Collections.addAll(list, 1,2,3,4,5);
    list.parallelStream().filter(s -> {
        System.out.println(Thread.currentThread() + "::" + s);
        return s > 3;
    }).count();
    System.out.println(list);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205082217169.png" alt="image-20220508221751089" style="zoom:80%;" />

### 并行流线程安全问题

问题：添加数据时

```java
@Test
public void parallelStreamNotice1() {
    ArrayList<Integer> list = new ArrayList<Integer>();
    for (int i = 0; i < 1000; i++) {
        list.add(i);
    }
    List<Integer> newList = new ArrayList<>();
    // 使用并行的流往集合中添加数据
    list.parallelStream()
            .forEach(s -> {
                newList.add(s);
            });
    System.out.println("newList = " + newList.size());
}
```

本来应该是1000个数字结果变成了877

解决方法： 加锁、使用线程安全的集合或者调用Stream的toArray() / collect() 操作就是满足线程安全的了。

方法1

```java
// 解决parallelStream线程安全问题方案一: 使用同步代码块
ArrayList<Integer> list = new ArrayList<>();
Object obj = new Object();
IntStream.rangeClosed(1, 1000)
        .parallel()
        .forEach(i -> {
            synchronized (obj) {
                list.add(i);
            }
        });
System.out.println(list.size());
```

方法2

```java
//解决parallelStream线程安全问题方案二: 使用线程安全的集合
List<Integer> synchronizedList = Collections.synchronizedList(list);
IntStream.rangeClosed(1, 1000)
        .parallel()
        .forEach(i -> {
            synchronizedList.add(i);
        });
System.out.println("list = " + synchronizedList.size());
```

方法3

```java
// 解决parallelStream线程安全问题方案三: 调用Stream流的collect/toArray
List<Integer> collect = IntStream.rangeClosed(1, 1000)
        .parallel()
        .boxed()
        .collect(Collectors.toList());
System.out.println("collect.size = " + collect.size());
```

### 并行流执行速度一定比串行快吗

答案是：**不一定**，并行流的设计是比较讨巧的，其中有三个地方容易踩坑

- 同一个进程提交给并行流的任务都会被同一个公共线程池处理，因此，如果在多线程的环境中使用了并行流，反而会降低并发，使得处理变慢
- 并行流的公共线程池大小为可用处理器减一，并且并行流会使用外部线程去处理内部子任务，搭配`ThreadLocal`使用的时候务必要慎重，在一些与`ThreadLocal`强耦合的场景，可能会导致`ThreadLocal`误清理，其他线程相关的全局变量同理
- 并行流的设计是为了应对计算密集型的场景的，如果有较多的IO场景，比如常见的RPC调用，在高并发的场景下会导致外部线程阻塞，引起外部线程数增多，且这类问题在测试的时候不容易发现，极易引起生产故障。
- 并行流（ParallelStream）的背后其实是 Java7 开始支持的 [Fork/Join](https://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484997&idx=1&sn=51b297dddbbba40912f71236fb297453&scene=21#wechat_redirect)，即把一个大任务拆分成 N 个小任务，然后最终合并各个子任务的结果，所以对于子任务线程的拆分、创建、结果合并等操作都需要不少的开销，特别是线程的创建。所以这种不耗时的简单排序操作事实上是不适用于并行流（ParallelStream）的，它所带来的线程创建的损耗可能还会比顺序流（Stream）还要更慢。

## 综合案例

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301071443797.png" alt="image-20230107144323530" style="zoom:80%;" />

### 定义实体类

#### Employee

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    private String name;
    private char sex;
    private double salary;
    private double bonus;
    private String punish; // 处罚信息
} 
```

#### Topperformer

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Topperformer {
    private String name;
    private double money; // 月薪
}    
```

### 定义数据

```java
// 开发一部
List<Employee> one = new ArrayList<>();
one.add(new Employee("猪八戒",'男',30000 , 25000, null));
one.add(new Employee("孙悟空",'男',25000 , 1000, "顶撞上司"));
one.add(new Employee("沙僧",'男',20000 , 20000, null));
one.add(new Employee("小白龙",'男',20000 , 25000, null));
// 开发二部
List<Employee> two = new ArrayList<>();
two.add(new Employee("武松",'男',15000 , 9000, null));
two.add(new Employee("李逵",'男',20000 , 10000, null));
two.add(new Employee("西门庆",'男',50000 , 100000, "被打"));
two.add(new Employee("潘金莲",'女',3500 , 1000, "被打"));
two.add(new Employee("武大郎",'女',20000 , 0, "下毒"));
```

### 开发一部的最高工资的员工

```java
// 1、开发一部的最高工资的员工
Topperformer t = one.stream().max(Comparator.comparingDouble(e -> e.getSalary() + e.getBonus()))
        // 只去获取姓名和工资
        .map(e -> new Topperformer(e.getName(),
             e.getSalary() + e.getBonus())).get();
System.out.println(t);
```



### 统计平均工资去掉最高工资和最低工资

```java
// 2、统计平均工资，去掉最高工资和最低工资
one.stream().sorted(Comparator.comparingDouble(e -> e.getSalary() + e.getBonus()))
        .skip(1).limit(one.size() - 2).forEach(e -> {
    // 求出总和：剩余员工的工资总和
    allMoney += (e.getSalary() + e.getBonus());
});
System.out.println("开发一部的平均工资是：" + allMoney / (one.size() - 2));
```

### 合并2个集合流，再统计

```java
// 3、合并2个集合流，再统计
Stream<Employee> s1 = one.stream();
Stream<Employee> s2 = two.stream();
Stream<Employee> s3 = Stream.concat(s1 , s2);
s3.sorted(Comparator.comparingDouble(e -> e.getSalary() + e.getBonus()))
        .skip(1).limit(one.size() + two.size() - 2).forEach(e -> {
    // 求出总和：剩余员工的工资总和
    allMoney2 += (e.getSalary() + e.getBonus());
});
```

### 开发部的平均工资

```java
// BigDecimal
BigDecimal a = BigDecimal.valueOf(allMoney2);
BigDecimal b = BigDecimal.valueOf(one.size()  + two.size() - 2);
//向最接近数字方向舍入的舍入模式，如果与两个相邻数字的距离相等，则向上舍入
System.out.println("开发部的平均工资是：" + a.divide(b,2, RoundingMode.HALF_UP));
```





# Collections集合工具类

- java.util.Collections：是集合工具类
- 作用:Collections并不属于集合，是用来操作集合的工具类

## 转换集合(不能添加和删除)

```java
List<String> list = Arrays.asList("hello", "world");
System.out.println(list);
```



## 批量添加和打乱⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211015144801847.png" alt="image-20211015144801847"  />

```java
public static void test1() {
    List<String> names = new ArrayList<>();
    //添加所有
    Collections.addAll(names,"张三","李四","王二");
    System.out.println(names);//[张三, 李四, 王二]
    //打乱
    Collections.shuffle(names);//打乱list集合
    System.out.println(names);//[张三, 王二, 李四]
    //取反
    Collections.reverse(list);
    System.out.println(list);
}
```



## 排序相关API

![image-20211015144837267](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211015144837267.png)

**按住shift+f6键，可以同时修改相同名字的单词**

```java
List<Integer> num = new ArrayList<>();
Collections.addAll(num,6,5,8,42,21,31);
//排序
Collections.sort(num);
System.out.println(num);
// 定制排序：从大到小排序
Collections.sort(apples, (o1,  o2) ->  Double.compare(o1.getPrice() , o2.getPrice()));
System.out.println(apples);
```

## 最大最小值

```java
List<Integer> num = new ArrayList<>();
Collections.addAll(num,6,5,8,42,21,31);
//最大最小值
Integer max = Collections.max(num);
System.out.println(max);
Integer min = Collections.min(num);
System.out.println(min);
```

## 交换值

```java
List<Integer> num = new ArrayList<>();
Collections.addAll(num,6,5,8,42,21,31);
//交换两个数的位置
Collections.swap(num,1,2);
System.out.println(num);
```

## 填充值

```java
List<Integer> num = new ArrayList<>();
Collections.addAll(num,6,5,8,42,21,31);
//集合内的值全部都是1
Collections.fill(num,1);
System.out.println(num);
```

## 元素出现次数

```java
List<Integer> num = new ArrayList<>();
Collections.addAll(num,6,5,8,42,21,31);
//统计元素出现次数
int frequency = Collections.frequency(num, 1);
System.out.println(frequency);
```

## 全部替换

```java
List<Integer> num = new ArrayList<>();
Collections.addAll(num,6,5,8,42,21,31);
//全部替换，第一个元素是旧值，第二个是新值
Collections.replaceAll(num, 1, 2);
System.out.println(num);
```

## 综合案例-斗地主⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051830642.png" alt="image-20230105183033399" style="zoom:67%;" />

### Card 实体类

```java
public class Card {
    private String size;
    private String color;
    private int index; // 牌的真正大小
    // 省略了无参有参构造，set、get方法，下面toString是自己重写的
    @Override
    public String toString() {
        return size + color;
    }
}
```

```
业务需求分析:
    斗地主的做牌, 洗牌, 发牌, 排序（拓展知识）, 看牌。
    业务: 总共有54张牌。
    点数: "3","4","5","6","7","8","9","10","J","Q","K","A","2"
    花色: "♠", "♥", "♣", "♦"
    大小王: "👲" , "🃏"
    点数分别要组合4种花色，大小王各一张。
    斗地主：发出51张牌，剩下3张作为底牌。
```

### 静态集合存储牌

```java
// 1、定义一个静态的集合存储54张牌对象
 public static List<Card> allCards = new ArrayList<>();

// 2、做牌：定义静态代码块初始化牌数据
static {
    // 3、定义点数：个数确定，类型确定，使用数组
    String[] sizes = {"3","4","5","6","7","8","9","10","J","Q","K","A","2"};
    // 4、定义花色：个数确定，类型确定，使用数组
    String[] colors = {"♠", "♥", "♣", "♦"};
    // 5、组合点数和花色
    int index = 0; // 记录牌的大小
    for (String size : sizes) {
        index++;
        for (String color : colors) {
            // 6、封装成一个牌对象。
            Card c = new Card(size, color, index);
            // 7、存入到集合容器中去
            allCards.add(c);
        }
    }
    // 8 大小王存入到集合对象中去 "👲" , "🃏"
    Card c1 = new Card("" ,  "🃏", ++index);
    Card c2 = new Card("" ,  "👲",++index);
    Collections.addAll(allCards , c1 , c2);
    System.out.println("新牌：" + allCards);
}
```

### 给牌排序

```java
// 给牌排序
private static void sortCards(List<Card> cards) {
    // cards = [J♥, A♦, 3♥, 🃏, 5♦, Q♥, 2♥
    Collections.sort(cards, (o1, o2) -> {
        // o1 = J♥
        // o2 = A♦
        // 知道牌的大小，才可以指定规则
        return o2.getIndex() - o1.getIndex();
    });
}
```

### 洗牌发牌等

```java
public static void main(String[] args) {
    // 9、洗牌
    Collections.shuffle(allCards);
    System.out.println("洗牌后：" + allCards);
    // 10、发牌（定义三个玩家，每个玩家的牌也是一个集合容器）
    List<Card> linhuchong = new ArrayList<>();
    List<Card> jiumozhi = new ArrayList<>();
    List<Card> renyingying = new ArrayList<>();
    // 11、开始发牌（从牌集合中发出51张牌给三个玩家，剩余3张作为底牌）
    // allCards = [🃏, A♠, 5♥, 2♠, 2♣, Q♣, 👲, Q♠ ...
    //    i        0  1   2   3   4   5    6  7      %  3
    for (int i = 0; i < allCards.size() - 3; i++) {
        // 先拿到当前牌对象
        Card c = allCards.get(i);
        if(i % 3 == 0) {
            // 请阿冲接牌
            linhuchong.add(c);
        }else if(i % 3 == 1){
            // 请阿鸠
            jiumozhi.add(c);
        }else if(i % 3 == 2){
            // 请盈盈接牌
            renyingying.add(c);
        }
    }
    // 12、拿到最后三张底牌(把最后三张牌截取成一个子集合)
    List<Card> lastThreeCards = allCards.subList(allCards.size() - 3 , allCards.size());

    // 13、给玩家的牌排序（从大到小 可以自己先试试怎么实现）
    sortCards(linhuchong);
    sortCards(jiumozhi);
    sortCards(renyingying);

    // 14、输出玩家的牌：
    System.out.println("啊冲：" + linhuchong);
    System.out.println("啊鸠：" + jiumozhi);
    System.out.println("盈盈：" + renyingying);
    System.out.println("三张底牌：" + lastThreeCards);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301051839724.png" alt="image-20230105183911581" style="zoom:67%;" />



# commons-collections4

集合与数组我们日常也需要经常使用，也需要对其进行判空：

```java
if (null == list || list.isEmpty()) {

}
```

> ps: 数组、Map 集合与其类似

上面代码如字符串判空一样写起来都非常简单，但是也比较容易写出会抛出空指针异常的代码。这里我们可以使用 **commons-collections** 提供工具类。

pom

```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-collections4</artifactId>
    <version>4.4</version>
</dependency>
```

> ps: 还有一个低版本的 ，artifactId 为 commons-collections

## 集合Map数组判空(重要)

我们可以使用 `CollectionUtils/MapUtils`进行判空判断。

```java
// List/Set 集合判空
if(CollectionUtils.isEmpty(list)){

}
// Map 等集合进行判空
if (MapUtils.isEmpty(map)) {
    
}
```

至于数组判空判断需要使用 `commons-lang` 下的 `ArrayUtils`进行判断:

```java
// 数组判空
if (ArrayUtils.isEmpty(array)) {
    
}
```

## ListUtils

emptyIfNull：返回完整list元素，不为空值。`如果传入list为null，返回空list`

defaultIfNull：可以在为null的时候，自己给个默认值返回

fixedSizeList：不解释

hashCodeForList：给List吧它的HashCode计算出来

intersection：取交集，生成一个新的List

### 数组加入到现有集合

除此之外还有一些列的对于集合增强方法，比如快速将数组加入到现有集合中：

```java
@Test
public void testTransfer() {
    List<String> listA = new ArrayList<>();
    listA.add("1");
    listA.add("2");
    listA.add("3");
    String[] arrays = {"a", "b", "c"};
    ListUtils.addAll(listA, arrays);
    System.out.println(listA);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206151127507.png" alt="image-20220615112739412" style="zoom:80%;" />

其他方法感兴趣同学可以再自行研究下，另外 Guava 中也有提供对于集合的操作增强类 `Lists/Maps`,这个可以看下阿粉之前写的：[老司机阿粉带你玩转 Guava 集合类](https://mp.weixin.qq.com/s?__biz=MzU3NzczMTAzMg==&mid=2247487136&idx=1&sn=6ad0e4058e19b68779274c51ec124e65&scene=21#wechat_redirect)。



### 切割集合(好用)

切割 把一个大的List切割成多个List 非常好用

常用场景：有10000个id需要批量查询，我们可以切割一下，200个发一次请求去查询一次，还可以开多个线程，用闭锁去弄

```java
@Test
public void testTransfer() {
    List<String> list1 = new ArrayList<String>(){{
        add("a");
        add("b");
        add("c");

        add("a");
        add("b");
        add("c");
    }};
    //3个元素为一组，多的另算
    List<List<String>> partition = ListUtils.partition(list1, 3);
    System.out.println(partition); //[[a, b, c], [a, b, c]]
}
```



### 交集和并集

```java
@Test
public void testTransfer() {
    List<String> list1 = new ArrayList<String>(){{
        add("a");
        add("b");
        add("c");
    }};
    List<String> list2 = new ArrayList<String>(){{
        add("c");
        add("c");
        add("d");
    }};

    //取出交集 并且返回一个新的List
    List<String> sumlist = ListUtils.sum(list1, list2);
    System.out.println(sumlist); //[a, b, c, d, e]
    // 取并集 并且返回一个新的List，就是合并集合
    List<String> union = ListUtils.union(list1, list2);
    System.out.println(union);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206151217620.png" alt="image-20220615121715562" style="zoom:67%;" />



## Map工具类(MapUtils)

### Map判空(常用)

```java
// Map 等集合进行判空
if (MapUtils.isEmpty(map)) {
    
}
```

### Map判null(常用)

emptyIfNull
之前我们经常会这么写（不返回null的Map）：

```java
if (map != null) {
    return Collections.emptyMap();
}
```

现在可以直接这么来了：

返回完整map元素，不为空值。`如果传入map为null，返回空Map`

```java
return MapUtils.emptyIfNull(map);
```

测试

```java
@Test
public void testTransfer() {
    Map<String, String> map = new HashMap<>();
    map = null;
    Map<String, String> stringStringMap = MapUtils.emptyIfNull(map);
    System.out.println(stringStringMap); // {}
}
```



## SetUtils

difference：找到两个set之间的不同元素，返回的是第一个set里有的，但是第二个set里没有的元素们

disjunction：和上面方法类似，但是属于加强版，会返回第一个set和第二个有差异的所有元素们

```java
@Test
public void testTransfer() {
    Set<String> set1 = new HashSet<String>(){{
        add("a");
        add("b");
        add("c");
    }};
    Set<String> set2 = new HashSet<String>(){{
        add("c");
        add("d");
        add("e");
    }};

    SetUtils.SetView<String> difference = SetUtils.difference(set1, set2);
    System.out.println(difference); //[a,b]
    Set<String> strings = difference.toSet();
    System.out.println(strings); //[a,b]
    SetUtils.SetView<String> disjunction = SetUtils.disjunction(set1, set2);
    System.out.println(disjunction); //[a, b, d, e]
}
```

emptyIfNull：见上MapUtils类似方法

newIdentityHashSet：可以实例化出一个newIdentityHashSet

isEqualSet：两个set里面的元素是否都一样（长度一样、元素一样），有时候判断还是非常有用的

union：合并两个set，生成一个新的set



## Bag集合(记录出现次数)

Bag继承自Collection接口，定义了一个集合，`该集合会记录对象在集合中出现的次数`。

假设你有一个包，包含{a, a, b, c}。调用getCount(a)方法将返回2，调用uniqueset()方法将返回{a, b, c}的set集合。

```java
public interface Bag<E> extends Collection<E> {}
```

顾名思义，它是包的意思，所以也是拿来装数据的。

HashBag使用`HashMap`作为数据存储，是一个`标准的`Bag实现。

TreeBag使用`TreeMap`作为数据存储，用法与HashBag类似，只是TreeBag会使用自然顺序对元素进行排序。

`使用的方式和List差不多，效果也大同小异`。
场景：`比如我们需要具体知道每个元素出现的次数的时候，并且实现快速去重，使用Bag会非常便捷`

对应的BagUtils，能提供BagUtils.EMPTY_BAG、synchronizedBag、unmodifiableBag等编程同步、只读的快捷方法

```java
@Test
public void testTransfer() {
    // 创建Bag集合
    Bag<String> hashBag = new HashBag<>();
    hashBag.add("张三");
    hashBag.add("张三");
    //一次性放置多个元素
    hashBag.add("李四", 3);
    System.out.println(hashBag); // [3:李四,2:张三]

    // 迭代器
    Iterator<?> iterator = hashBag.iterator();
    System.out.println("包中元素为：");
    while (iterator.hasNext()) {
        System.out.println(iterator.next());
    }
    System.out.println("包中元素个数为：" + hashBag.size()); //包中元素个数为：5
    //下面两个特有的方法 使用起来较为方便
    System.out.println("包中entity1个数为：" + hashBag.getCount("张三")); //包中entity1个数为：2
    System.out.println("去重后个数为：" + hashBag.uniqueSet().size()); //去重后个数为：2
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206151614923.png" alt="image-20220615161408836" style="zoom: 67%;" />



## BidiMap(双重Map)

使用双向映射，可以使用值查找键，并且可以使用键轻松查找值。（自然，它可以根据key移除，也可以根据value移除）

该场景使用还是比较多的，比如一对一的映射关系，都可以使用这来存储。如果你使用HashMap，那你得维护两个，还是比较麻烦的

```java
public interface BidiMap<K, V> extends IterableMap<K, V> {}
```

也是个普通的Map。继承IterableMap增加了一种迭代方式，例子里会有讲解


DualHashBidiMap

底层维护两个HashMap，一个正向，一个逆向来达到效果的。

```java
@Test
public void testTransfer() {
    BidiMap<String, String> map = new DualHashBidiMap<>();
    map.put("name", "张三");
    map.put("age", "22");
    //多出来的一种遍历方式  还是非常人性化的
    MapIterator<String, String> it = map.mapIterator();
    while (it.hasNext()) {
        it.next(); //此句话必须调用  返回的是key，效果同getKey，但必须调用
        System.out.println(it.getKey() + "---" + it.getValue());
    }
    System.out.println(map.get("name"));
    //根据value拿key
    System.out.println(map.getKey("张三"));
    //这个方法是Map接口的
    System.out.println(map.getOrDefault("k", "查不到key输出这个默认值"));
    //返回一个逆序的视图  注意是视图
    BidiMap<String, String> inverseMap = map.inverseBidiMap();

    //根据key删除
    inverseMap.remove("name");
    //根据value删除
    inverseMap.removeValue("张三");

    System.out.println(map);
    System.out.println(inverseMap);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206151625040.png" alt="image-20220615162507961" style="zoom: 67%;" />

## MultiKeyMap(多键Map)

MultiKeyMap能够解决我们平时可能遇到的一个痛点。
比如我们Map的key，可能是由多个字段的值联合决定的（有点类似联合索引的意思），这个时候我们一般方案为：自己拼接字符串，然后put进去。

但现在有了MultiKeyMap，我们可以非常优雅的解决这个问题：

```java
@Test
public void testTransfer() {
    // MultiKey功能很简单：装载多个key的一个对象
    MultiKey<String> multiKey = new MultiKey<>("a", "b");
    System.out.println(multiKey); //MultiKey[a, b]

    MultiKeyMap<String, String> multiKeyMap = new MultiKeyMap<>();

    // 多个键对应一个值 两个key：name和NAME
    multiKeyMap.put("name", "NAME", "jianggujin");
    System.out.println(multiKeyMap); //{MultiKey[name, NAME]=jianggujin}
    System.out.println(multiKeyMap.get("name")); //null
    System.out.println(multiKeyMap.get("NAME")); //null
    System.out.println(multiKeyMap.get("name", "NAME")); //jianggujin

    //测试key覆盖
    multiKeyMap.put("name", "shixiang", "cover");
    System.out.println(multiKeyMap);

    //这样子  value值才会被覆盖
    multiKeyMap.put("name", "NAME", "cover");
    System.out.println(multiKeyMap);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206151628526.png" alt="image-20220615162836451" style="zoom:67%;" />

我们可以看到 name+NAME联合确定了一个value值。这样子，我们就可以非常优雅的处理这种情况

> MultiKeyMap底层采用MultiKey作为普通Map的key，采用HashedMap存储

简单的说就是做了一个HashMap的通用替代品。让也能使用IterableMap的迭代器那样去使用和迭代Map了，没什么多余的可以说明的。

## LRUMap(淘汰算法)

底层是LRU算法

> LRU算法的设计原则是：如果一个数据在最近一段时间没有被访问到，那么在将来它被访问的可能性也很小。`也就是说，当限定的空间已存满数据时，应当把最久没有被访问到的数据淘汰。`

```java
@Test
public void testTransfer() {
    //创建LRUMap，设置集合大小
    LRUMap<Object, Object> map = new LRUMap<>(3);

    System.out.println(map); //{}
    System.out.println(map.size()); //0
    System.out.println(map.maxSize()); //3
    System.out.println(map.isFull()); //false

    map.put("fang", "a");
    map.put("shi", "b");
    map.put("xiang", "c");

    System.out.println(map); //{fang=a, shi=b, xiang=c}
    System.out.println(map.size()); //3
    System.out.println(map.maxSize()); //3
    System.out.println(map.isFull()); //true

    //虽然满了 但还是可以往里面塞数据
    //如果我们都没有get使用过 那就从后往前挤出来吧
    map.put("heng", "heng");
    map.put("heng22", "heng22");
    System.out.println(map); //{xiang=c, heng=heng, heng22=heng22}
    System.out.println(map.size()); //3
    System.out.println(map.maxSize()); //3
    System.out.println(map.isFull()); //true

    //我此处多次使用xiang这个key 我们会发现xiang这个key就不会被挤出来
    map.get("xiang");
    map.get("xiang");
    //再次存入值测试
    map.put("heng", "heng");
    map.put("heng22", "heng22");
    System.out.println(map); //{xiang=c, heng=heng, heng22=heng22}
    System.out.println(map.size()); //3
    System.out.println(map.maxSize()); //3
    System.out.println(map.isFull()); //true
}
```



