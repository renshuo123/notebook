
传入数据

```json
[
  {
    "age": 20,
    "email": "123@qq.com",
    "empName": "wqw",
    "sex": "男"
  },
  {
    "age": 22,
    "email": "1234@qq.com",
    "empName": "wqw1",
    "sex": "女"
  }
]
```

```sql
insert into t_emp values (null,?,?,?,?,null) , (null,?,?,?,?,null)
```



### 批量删除

```sql
delete from t_emp where eid in ( ? , ? , ? )
```

```java
int deleteMoreByArray(@Param("ids") int[] ids);
```

```xml
<delete id="deleteMoreByArray">
    delete from t_emp where eid in
    <foreach collection="ids" item="eid" separator="," open="(" close=")">
        #{eid}
    </foreach>
</delete>
```

```java
@DeleteMapping("deleteMoreByIds")
public R deleteMoreByIds(int[] ids){
    return R.ok(empMapper.deleteMoreByArray(ids));
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305281250369.png" style="zoom: 67%;" />

## SQL片段

> 可将重复的 sql 提取出来，使用时用 include 引用即可，最终达到 sql 重用的目的

> 抽取查询字段

```xml
<!--第一步：抽取sql片段简化编写-->
<sql id="empColumns">eid,emp_name,age,sex,email</sql>

<select id="findAll" resultMap="empResultMap">
   <!--第二步：进行引用-->
   select <include refid="empColumns"></include> from t_emp
</select>
```

> 抽取sql语句

```xml
<sql id="getAll">select eid,emp_name,age,sex,email from t_emp</sql>
<!--resultType是创建好的已经存在的类型，resultMap是查询结果的映射关系-->
<select id="findAll" resultMap="empResultMap">
    <include refid="getAll"></include>
</select>
```

# Mybatis缓存

## 常见概念

> **MyBatis 缓存**：它用来优化 SQL 数据库查询的，但是可能会产生脏数据。
>
> **SqlSession**：代表和数据库的一次会话，向用户提供了操作数据库的方法。
>
> **MappedStatement**：代表要发往数据库执行的指令，可以理解为是 SQL 的抽象表示。

> **Executor**：代表用来和数据库交互的执行器，接受 MappedStatment 作为参数。
>
> **namespace**：每个 Mapper 文件只能配置一个 namespace，用来做 Mapper 文件级别的缓存共享。

## 一级缓存

> 一级缓存是SqlSession级别的，通过同一个SqlSession查询的数据会被缓存，下次查询相同的数据，就会从缓存中直接获取，不会从数据库重新访问，一级缓存默认开启。

> MyBatis一级缓存内部设计简单，只是一个没有容量限定的 HashMap，在缓存的功能性上有所欠缺
>
> MyBatis的一级缓存最大范围是SqlSession内部，有多个SqlSession或者分布式的环境下，数据库写操作会引起脏数据，建议设定缓存级别为Statement
>
> 一级缓存的配置中，默认是 SESSION 级别，即在一个MyBatis会话中执行的语句，都会共享这个缓存。

### 一级缓存原理

> 在一次 SqlSession 中（数据库会话），程序执行多次查询，且查询条件完全相同，多次查询之间程序没有其他增删改操作，则第二次及后面的查询可以从缓存中获取数据，避免走数据库。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212171140271.png" alt="image-20221217114012170" style="zoom:50%;" />

> 每个SqlSession中持有了Executor，每个Executor中有一个LocalCache。当用户发起查询时，MyBatis根据当前执行的语句生成`MappedStatement`，在Local Cache进行查询，如果缓存命中的话，直接返回结果给用户，如果缓存没有命中的话，查询数据库，结果写入`Local Cache`，最后返回结果给用户。

Local Cache 其实是一个 hashmap 的结构：

```java
private Map<Object, Object> cache = new HashMap<Object, Object>();
```

如下图所示，有两个 SqlSession，分别为 SqlSession1 和 SqlSession2，每个 SqlSession 中都有自己的缓存，缓存是 hashmap 结构，存放的键值对。键是 SQL 语句组成的 Key ：

```java
Statement Id + Offset + Limmit + Sql + Params
```

值是 SQL 查询的结果：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212171141688.png" alt="image-20221217114101579" style="zoom:50%;" />

### 一级缓存配置

默认开启，无需配置

在 application,properties 文件配置，`name=localCacheScope`，value有两值：`SESSION` 和 `STATEMENT`

```properties
mybatis.configuration.local-cache-scope=session
```

> SESSION：开启一级缓存功能
>
> STATEMENT：缓存只对当前执行的这一个 SQL 语句有效，也就是没有用到一级缓存功能。

###  一级缓存考题

> 考题（1）只开启了一级缓存，下面的代码调用了三次查询操作 getStudentById，请判断，下列说法正确的是？

```java
// 打开一个 SqlSession
SqlSession sqlSession = factory.openSession(true);
StudentMapper studentMapper = sqlSession.getMapper(StudentMapper.class); 
// 根据 id=1 查询学生信息
System.out.println(studentMapper.getStudentById(1)); 
// 根据 id=1 查询学生信息
System.out.println(studentMapper.getStudentById(1)); 
// 根据 id=1 查询学生信息
System.out.println(studentMapper.getStudentById(1));
```

答案：第一次从数据库查询到的数据，第二次和第二次从 MyBatis 一级缓存查询的数据。

解答：第一次从数据库查询后，后续查询走 MyBatis 一级缓存

> 考题（2）只开启了一级缓存，下面代码示例中，开启了一个 SqlSession 会话，调用了一次查询，然后对数据进行了更改，又调用了一次查询，下列关于两次查询的说法，正确的是？

```java
// 打开一个 SqlSession
SqlSession sqlSession = factory.openSession(true);
StudentMapper studentMapper = sqlSession.getMapper(StudentMapper.class); 
// 根据 id=1 查询学生信息
System.out.println(studentMapper.getStudentById(1)); 
// 插入了一条学生数据，改变了数据库
System.out.println("增加了" + studentMapper.addStudent(buildStudent()) + "个学生"); 
// 根据 id=1 查询学生信息
System.out.println(studentMapper.getStudentById(1)); 
sqlSession.close();
```

**答案**：第一次从数据库查询到的数据，第二次从数据库查询的数据

**解答**：第一次从数据库查询后，后续更新（包括增删改）数据库中的数据后，这条 SQL 语句的缓存失效了，后续查询需要重新从数据库获取数据。

> 考题（3）当开启了一级缓存，下面的代码中，开启了两个 SqlSession，第一个 SqlSession 查询了两次学生 A 的姓名，第二次 SqlSession 更新了一次学生 A 的姓名，请判断哪个选项符合最后的查询结果。

```java
SqlSession sqlSession1 = factory.openSession(true); 
SqlSession sqlSession2 = factory.openSession(true); 

StudentMapper studentMapper = sqlSession1.getMapper(StudentMapper.class); 
StudentMapper studentMapper2 = sqlSession2.getMapper(StudentMapper.class); 

studentMapper2.updateStudentName("B",1); 
System.out.println(studentMapper.getStudentById(1)); 
System.out.println(studentMapper2.getStudentById(1));
```

**答案**：

```
A
B
```

> **解答**：只开启一级缓存的情况下，SqlSession 级别是不共享的。代码示例中，分别创建了两个 SqlSession，在第一个 SqlSession 中查询学生 A 的姓名，第二个 SqlSession 中修改了学生 A 的姓名为 B，SqlSession2 更新了数据后，不会影响 SqlSession1，所以 SqlSession1 查到的数据还是 A。

### 一级缓存失效场景

> 1. 不同的SqlSession对应不同的一级缓存
> 2. 同一个SqlSession但是查询条件不同
> 3. 同一个SqlSession两次查询期间执行了任何一次增删改操作
> 4. 同一个SqlSession两次查询期间手动清空了缓存

## 二级缓存

### 二级缓存概述

> - MyBatis的二级缓存相对于一级缓存来说，实现了`SqlSession`之间缓存数据的共享，同时粒度更加的细，能够到`namespace`级别，通过Cache接口实现类不同的组合，对Cache的可控性也更强。
> - MyBatis在多表查询时，极大可能会出现脏数据，有设计缺陷，安全使用二级缓存的条件比较苛刻
> - 在分布式环境下，由于默认的MyBatis Cache实现都是基于本地的，分布式环境下必然会出现读取到脏数据，需要使用集中式缓存将 MyBatis的Cache 接口实现，有一定的开发成本，直接使用Redis、Memcached 等分布式缓存可能成本更低，安全性也更高。

### 二级缓存原理

> 一级缓存最大的共享范围就是一个 `SqlSession` 内部，如果多个 `SqlSession` 之间需要共享缓存，则需要使用到二级缓存。

> 开启二级缓存后，会使用 `CachingExecutor` 装饰 `Executor`，进入一级缓存的查询流程前，先在CachingExecutor 进行二级缓存的查询。
>
> 二级缓存开启后，同一个 `namespace`下的所有操作语句，都影响着同一个Cache。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212171202834.png" alt="image-20221217120229476" style="zoom:50%;" />

每个 Mapper 文件只能配置一个 namespace，用来做 Mapper 文件级别的缓存共享。

```
<mapper namespace="mapper.StudentMapper"></mapper>
```

> 二级缓存被同一个 `namespace` 下的多个 `SqlSession` 共享，是一个全局的变量。MyBatis 的二级缓存不适应用于映射文件中存在多表查询的情况。
>

> 通常我们会为每个单表创建单独的映射文件，由于MyBatis的二级缓存是基于`namespace`的，多表查询语句所在的`namspace`无法感应到其他`namespace`中的语句对多表查询中涉及的表进行的修改，引发脏数据问题。
>

### 缓存查询顺序

> - 先查询二级缓存，因为二级缓存中可能会有其他程序已经查出来的数据，可以拿来直接使用
> - 如果二级缓存没有命中，再查询一级缓存
> - 如果一级缓存也没有命中，则查询数据库
> - SqlSession关闭之后，一级缓存中的数据会写入二级缓存。

### 二级缓存配置

> - 在核心配置文件中，设置全局配置属性cacheEnabled="true"，**默认为true，不需要设置**
> - 在对应xxxxMapper.xml映射文件中的mapper内部直接写它就行，设置标签

```xml
<cache />
```

注意实体类上要加上序列化

```java
public class admin implements Serializable
```

> **这样我们使用查询时查询第一次控制台正常打印SQL语句，而进行第二次查询时，如果没有加上这个cache，那么还是正常打印SQL语句，加上cache就会提示，而不会去打印SQL，说明缓存找到了**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220228153114699.png" alt="image-20220228153114699" style="zoom:80%;" />

> 二级缓存的相关配置，基本不用去配置
>

```xml
<cache blocking="" flushInterval="" size="" eviction="" readOnly="" type=""/>
```

在mapper配置文件中添加的cache标签可以设置一些属性：eviction属性：缓存回收策略

> LRU（Least Recently Used） – 最近最少使用的：移除最长时间不被使用的对象。默认的是 LRU。
>
> FIFO（First in First out） – 先进先出：按对象进入缓存的顺序来移除它们。
>
> SOFT – 软引用：移除基于垃圾回收器状态和软引用规则的对象。
>
> WEAK – 弱引用：更积极地移除基于垃圾收集器状态和弱引用规则的对象。
>

> - flushInterval属性：刷新间隔，单位毫秒。**默认情况是不设置，也就是没有刷新间隔，缓存仅仅调用语句时刷新**
>
> - size属性：引用数目，正整数。**代表缓存最多可以存储多少个对象，太大容易导致内存溢出**
>
> - readOnly属性：只读，true/false，因此默认是false
>
>   **true：只读缓存；会给所有调用者返回缓存对象的相同实例。因此这些对象不能被修改。这提供了重要的性能优势。**
>
>   false：读写缓存；会返回缓存对象的拷贝（通过序列化）。这会慢一些，但是安全

###  二级缓存考题

测试`update`操作是否会刷新该`namespace`下的二级缓存。

> 开启了一级和二级缓存，通过三个SqlSession 查询和更新 学生张三的姓名，最后的输出结果是什么

```java
SqlSession sqlSession1 = factory.openSession(true); 
SqlSession sqlSession2 = factory.openSession(true); 
SqlSession sqlSession3 = factory.openSession(true); 

StudentMapper studentMapper = sqlSession1.getMapper(StudentMapper.class); 
StudentMapper studentMapper2 = sqlSession2.getMapper(StudentMapper.class); 
StudentMapper studentMapper3 = sqlSession3.getMapper(StudentMapper.class); 

System.out.println("studentMapper读取数据: " + studentMapper.getStudentById(1)); 
sqlSession1.commit(); 
System.out.println("studentMapper2读取数据: " + studentMapper2.getStudentById(1)); studentMapper3.updateStudentName("李四",1); 
sqlSession3.commit(); 
System.out.println("studentMapper2读取数据: " + studentMapper2.getStudentById(1));
```

**答案**：

```
张三
张三
李四
```

> **解答**：三个 SqlSession 是共享 MyBatis 缓存，SqlSession2 更新数据后，MyBatis 的 namespace 缓存（StudentMapper） 就失效了，SqlSession2 最后是从数据库查询到的数据。

## 整合EHCache缓存

> EHCache 和 MyBatis 已经帮我们整合好了一个自定义缓存，我们可以直接拿来用，不需要自己去实现 MyBatis 的 `org.apache.ibatis.cache.Cache` 接口。
>

> 添加 mybatis-ehcache 依赖包
>

```xml
<!-- Mybatis EHCache整合包 -->
<dependency>
    <groupId>org.mybatis.caches</groupId>
    <artifactId>mybatis-ehcache</artifactId>
    <version>1.2.2</version>
</dependency>
<!-- 下面这个日志文件依赖可以不加 -->
<!-- slf4j日志门面的一个具体实现 -->
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.2.3</version>
</dependency>
```

> 在resource目录下创建EHCache的配置文件ehcache.xml
>

```xml
<?xml version="1.0" encoding="utf-8" ?>
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="http://ehcache.org/ehcache.xsd">
    <!-- 磁盘保存路径 -->
    <diskStore path="H:\test"/>
    <defaultCache
            maxElementsInMemory="1000"
            maxElementsOnDisk="10000000"
            eternal="false"
            overflowToDisk="true"
            timeToIdleSeconds="120"
            timeToLiveSeconds="120"
            diskExpiryThreadIntervalSeconds="120"
            memoryStoreEvictionPolicy="LRU">
    </defaultCache>
</ehcache>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220228163038000.png" alt="image-20220228163038000" style="zoom: 80%;" />

> 在xxxxMapper.xml中引入，哪个需要缓存就加那个，比如EmpMapper.xml
>

```xml
<cache type="org.mybatis.caches.ehcache.EhcacheCache"/>
```

> 加入logback日志，存在SLF4J时，作为简易日志的log4j将失效，此时我们需要借助SLF4J的具体实现logback来打印日志。在resource目录下创建logback的配置文件logback.xml
>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration debug="true">
    <!-- 指定日志输出的位置 -->
    <appender name="STDOUT"
              class="ch.qos.logback.core.ConsoleAppender">
    <encoder>
    <!-- 日志输出的格式 -->
    <!-- 按照顺序分别是：时间、日志级别、线程名称、打印日志的类、日志主体内容、换行
    -->
    <pattern>[%d{HH:mm:ss.SSS}] [%-5level] [%thread] [%logger] [%msg]%n</pattern>
    </encoder>
    </appender>
    <!-- 设置全局日志级别。日志级别按顺序分别是：DEBUG、INFO、WARN、ERROR -->
    <!-- 指定任何一个日志级别都只打印当前级别和后面级别的日志。 -->
    <root level="DEBUG">
        <!-- 指定打印日志的appender，这里通过“STDOUT”引用了前面配置的appender -->
        <appender-ref ref="STDOUT" />
    </root>
    <!-- 根据特殊需求指定局部日志级别 -->
    <logger name="com.it.mapper" level="DEBUG"/>
</configuration>
```

> 访问测试，多次访问，查看缓存命中率，再去看缓存设置的文件夹，发现已经有数据了

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305281538997.png" alt="image-20230528153822917" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305281539375.png" alt="image-20230528153903299" style="zoom:80%;" />

# 逆向工程

正向工程：先创建Java实体类，由框架负责根据实体类生成数据库表。Hibernate是支持正向工程的。

逆向工程：先创建数据库表，由框架负责根据数据库表，反向生成如下资源：

> Java实体类、Mapper接口、Mapper映射文件

# 流式查询

mybatis的流式查询，有点冷门，实际用的场景比较少，但是在某些特殊场景下，却是十分有效的一个方法。很多人没有听说过，实际上是对mybatis没有太重视，对mybatis想法还停留一个dao接口对应着mapper里的一个sql，mybatis的关键是如何写好sql以及sql的优化上；

其实mybatis远不止这些，通过这篇文章，和大家一块来见识一下流式查询，mybatis相对冷门的神秘面纱。文章的内容将从以下几个方面展开：

- 什么是mybatis的流式查询；
- Cursor接口的主要方法；
- 代码层面如何实现；
- 具体的应用场景；
- 使用中的一些注意事项；

## 环境配置

- jdk版本:1.8
- 开发工具：Intellij iDEA 2020.1
- springboot:2.3.9.RELEASE
- mybatis-spring-boot-starter：2.1.4

## 什么是mybatis流式查询？

> 使用mybatis作为持久层的框架时，通过mybatis执行查询数据的请求执行成功后，mybatis返回的结果集不是一个集合或对象，而是一个迭代器，可以通过遍历迭代器来取出结果集，避免一次性取出大量的数据而占用太多的内存。

## Cursor

`org.apache.ibatis.cursor.Cursor`接口有三个抽象方法，分别是

- **isOpen()** ：判断cursor是否正处于打开状态;
- **isConsumed()** ：判断查询结果是否全部读取完；
- **getCurrentIndex()** ：查询已读取数据在全部数据里的索引位置；

```java
public interface Cursor<T> extends Closeable, Iterable<T> {
 //判断cursor是否正处于打开状态
 //当返回true，则表示cursor已经开始从数据库里刷新数据了；
  boolean isOpen();
  //判断查询结果是否全部读取完；
  //当返回true,则表示查询sql匹配的全部数据都消费完了；
  boolean isConsumed();
   //查询已读取数据在全部数据里的索引位置；
   //第一条数据的索引位置为0；当返回索引位置为-1时，则表示已经没有数据可以读取；
  int getCurrentIndex();
}
```

## 代码实现

mybatis的所谓流式查询，就是服务端程序查询数据的过程中，与远程数据库一直保持连接，不断的去数据库拉取数据，提交事务并关闭sqlsession后，数据库连接断开，停止数据拉取，需要注意的是使用这种方式，需要自己手动维护sqlsession和事务的提交。

1、实现方式很简单，原来返回的类型是集合或对象，流式查询返回的的类型Curor，泛型内表示实际的类型，其他没有变化；

```xml
@Mapper
public interface PersonDao {
    Cursor<Person> selectByCursor();
    Integer queryCount();
 
}
<select id="selectByCursor" resultMap="personMap">
    select * from sys_person order by id desc
</select>
<select id="queryCount" resultType="java.lang.Integer">
    select count(*) from sys_person
</select>
```

2、dao层向service层返回的是Cursor类型对象，只要不提交关闭sqlsession，服务端程序就可以一直从数据数据库读取数据，直到查询sql匹配到数据全部读取完；

示例里的主要业务逻辑是：从sys_person表中读取所有的人员信息数据，然后按照每1000条数据为一组，读取到内存里进行处理，以此类推，直到查询sql匹配到数据全部处理完，再提交事务，关闭sqlSession；

```java
@Service
@Slf4j
public class PersonServiceImpl implements IPersonService {
    @Autowired
    private SqlSessionFactory sqlSessionFactory;
 
    @Override
    public void getOneByAsync() throws InterruptedException {
        new Thread(new Runnable() {
            @SneakyThrows
            @Override
            public void run() {
                // 使用sqlSessionFactory打开一个sqlSession，
                // 在没有读取完数据之前不要提交事务或关闭sqlSession
                log.info("----开启sqlSession");
                SqlSession sqlSession = sqlSessionFactory.openSession();
                 try {
                     //获取到指定mapper
                     PersonDao mapper = sqlSession.getMapper(PersonDao.class);
                     //调用指定mapper的方法，返回一个cursor
                     Cursor<Person> cursor = mapper.selectByCursor();
                     //查询数据总量
                     Integer total = mapper.queryCount();
                   //定义一个list，用来从cursor中读取数据，每读取够1000条的时候，开始处理这批数据；
                   //当前批数据处理完之后，清空list，准备接收下一批次数据；直到大量的数据全部处理完；
                     List<Person> personList = new ArrayList<>();
                     int i = 0;
                     if (cursor != null) {
                         for (Person person : cursor) {
                             if (personList.size() < 1000) {
                             log.info("----id:{},userName:{}", person.getId(), 
                                      person.getUserName());
                                 personList.add(person);
                             } else if (personList.size() == 1000) {
                                ++i;
                                log.info("----{}、从cursor取数据达到1000条，开始处理数据", i);
                                log.info("----处理数据中...");
                                Thread.sleep(1000);//休眠1s模拟处理数据需要消耗的时间；
                                log.info("----{}、从cursor中取出的1000条数据已经处理完毕", i);
                                personList.clear();
                                personList.add(person);
                             }
                             if (total == (cursor.getCurrentIndex() + 1)) {
                                ++i;
                                log.info("----{}、从cursor取数据达到1000条，开始处理数据", i);
                                 log.info("----处理数据中...");
                                 Thread.sleep(1000);//休眠1s模拟处理数据需要消耗的时间；
                                 log.info("----{}、从cursor中取出的1000条数据已经处理完毕", i);
                                 personList.clear();
                             }
                         }
                         if (cursor.isConsumed()) {
                             log.info("----查询sql匹配中的数据已经消费完毕！");
                         }
                     }
                     sqlSession.commit();
                     log.info("----提交事务");
                 }catch (Exception e){
                     e.printStackTrace();
                     sqlSession.rollback();
                 }
                 finally {
                     if (sqlSession != null) {
                         //全部数据读取并且做好其他业务操作之后，提交事务并关闭连接；
                         sqlSession.close();
                         log.info("----关闭sqlSession");  
                     }
                 }
                
            }
        }).start();
    }
}
```

## 应用场景

其实mybatis的流式查询适用范围很有限，这里举个例子，假如有这样一个需求 :有50万员工的一年的工资数据明细，需要输出一张公司支出工资的数据报表。

需求很简单，估计有人是这样想：这太简单了，查询出员工的工资数据明细，然后按照套上公式逐条计算出结果，然后汇总计算结果，插入到新的结果表里不就行了。事实上这件事绝对不简单：

- 50万的数据全部读取到jvm的内存里得占用多大空间？
- 这么多对象的垃圾回收又需要多久？
- 这么多数据计算是高频行为还是低步行为？
- 如果计算到某条员工的数据发生异常，已经计算好的数据要不要全部回滚？...

总之，直接取出50万数据来计算，风险肯定不小。那怎么办呢？

在实际的开发中，也经常遇到一些百十万，说大不大，说小不小的数据报表处理，我的主要设计思路通常就是数据切隔+异步，具体怎么做呢？结合上面的例子，是这样的：

1、按照月份、省份或者部门，对工资明细数据进行数据切隔分组；

2、把不同月份、省份、部门的工资数据包装成多线程任务，放到线程池中去执行；

3、根据切隔的多线程任务数量，定义一个同步工具类CountDownLatch；

4、根据同步工具类CountDownLatch，来判断所有的多线程任务是否全部执行完；等到所有的多线程任务全部执行完成后，再执行汇总的逻辑；

5、在多线程任务里，查询具体月份、省份的员工工资数据明细的时候，如果数据量还是不少，就可以使用mybatis的流式查询，分批获取员工工资明细数据，进行当前批的计算、汇总，然后所有分批数据都计算完成后，再汇总所有分批数据；

## 注意事项

> mybatis的流式查询的本意，是避免大量数据的查询而导致内存溢出，因此dao层查询返回的是一个迭代器（Cursor），可以每次从迭代器中取出一条查询结果，在实际业务开发过程中，即是根据实际的jvm内存大小，从迭代器中取出一定数量的数据后，再进行数据处理，待处理完之后，继续取出一定数据再处理，以此类推直到全部数据处理完，这样做的最大好处就是能够降低内存使用和垃圾回收器的负担，使数据处理的过程相对更加高效、可控，内存溢出的风险较小；

> 好处很明显，缺点也很就明显，处理的时间可能会变长，需要引入多线程异步操作，并且在迭代器遍历和数据处理的过程中，数据库连接不能断开，即当前sqlSession要保持持续打开状态，一量断开，数据读取就会中断，所以关于这块的处理，使用mybatis原生的sqlSession进行手动查询、提交事务、回滚和关闭sqlSession最为稳妥、最简单；



# 分页

## 基本配置

在官网可以查看PageHelper的maven坐标

> ①导入通用PageHelper的坐标
>
> ②在mybatis核心配置文件中配置PageHelper插件
>
> ③测试分页数据获取

①导入通用PageHelper坐标

```xml
<!-- https://mvnrepository.com/artifact/com.github.pagehelper/pagehelper-spring-boot-starter -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.4.1</version>
</dependency>
```

②在application.properties核心配置文件中配置PageHelper插件

```properties
# 设置分页插件
# dialect：必须指定该属性，可选值为oracle,mysql,mariadb,sqlite,hsqldb,postgresql
pagehelper.helperDialect=mysql
# 合理化分页，最后一页和第一页
pagehelper.reasonable=true
# 分页插件会从查询方法的参数值中，自动根据上面 params 配置的字段中取值，查找到合适的值时就会自动分页
pagehelper.supportMethodsArguments=true
# 为了支持startPage(Object params)方法，增加了该参数来配置参数映射，用于从对象中根据属性名取值
pagehelper.params=count=countSql
```

## 分页数据

- pageNum：当前页的页码  
- pageSize：每页显示的条数  
- size：当前页显示的真实条数  
- total：总记录数  
- pages：总页数  
- prePage：上一页的页码  
- nextPage：下一页的页码
- isFirstPage/isLastPage：是否为第一页/最后一页  
- hasPreviousPage/hasNextPage：是否存在上一页/下一页  
- navigatePages：导航分页的页码数  
- navigatepageNums：导航分页的页码，\[1,2,3,4,5]

```java
@SpringBootTest
class MybatisDemoApplicationTests {

    @Resource
    private EmpMapper empMapper;

    @Test
    public void testPageHelper() {
        //设置分页参数
        PageHelper.startPage(1,2);
        //设置查找到的数据集合，这边要调用查询所有数据的方法
        List<Emp> select = empMapper.findAll();
        //其他分页的数据，第二个参数可选，表示导航页显示几个
        PageInfo<Emp> pageInfo = new PageInfo<>(select,5);
        //分页相关参数
        System.out.println("总条数："+pageInfo.getTotal());
        System.out.println("总页数："+pageInfo.getPages());
        System.out.println("当前页："+pageInfo.getPageNum());
        System.out.println("当前页显示的真实条数："+pageInfo.getSize());
        System.out.println("每页显示长度："+pageInfo.getPageSize());
        System.out.println("是否第一页："+pageInfo.isIsFirstPage());
        System.out.println("是否最后一页："+pageInfo.isIsLastPage());
        System.out.println("下一页的页码："+pageInfo.getNextPage());
        System.out.println("上一页的页码："+pageInfo.getPrePage());
        System.out.println("是否存在上一页："+pageInfo.isHasPreviousPage());
        System.out.println("是否存在下一页："+pageInfo.isHasNextPage());
        System.out.println("导航分页的页码数,就是上面设置的5："+pageInfo.getNavigatePages());
        System.out.println("导航分页的页码："+
                Arrays.toString(pageInfo.getNavigatepageNums()));
        System.out.println(pageInfo.getList());
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220227154204975.png" alt="image-20220227154204975" style="zoom:67%;" />

其实最后pageInfo.getList()可以获取大部分内容，如下

```json
Page{
    count=true, 
    pageNum=1, 
    pageSize=2, 
    startRow=0, 
    endRow=2, 
    total=7, 
    pages=4, 
    reasonable=true, 
    pageSizeZero=false
}
[admin(id=4, username=张三, password=4321), admin(id=5, username=李四, password=21321)]
```

## 基本分页

> 配置分页，这边是关于分页设置的

```java
@GetMapping("/simple/{page}/{limit}")
public R SimpleIndex(@PathVariable Integer page,
                     @PathVariable Integer limit) {
    //设置分页参数
    PageHelper.startPage(page,limit);
    //设置查找到的数据集合，这边要调用查询所有数据的方法
    List<Emp> select = empMapper.findAll();
    //其他分页的数据，第二个参数可选，表示导航页显示几个
    PageInfo<Emp> pageInfo = new PageInfo<>(select,5);
    return R.ok(pageInfo);
}
```

> 下面就是关于查询所有的findAll方法

```java
public interface EmpMapper {
    List<Emp> findAll();
}
```

```xml
<select id="findAll" resultType="Emp">
    select eid,emp_name,age,sex,email from t_emp
</select>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305281609556.png" alt="image-20230528160925456" style="zoom:80%;" />

## 条件分页

```java
@GetMapping("/index/{page}/{limit}")
public R Index(@PathVariable Integer page,
               @PathVariable Integer limit,
               Emp emp) {
    //设置分页参数
    PageHelper.startPage(page,limit);
    //设置查找到的数据集合，这边要调用查询数据的方法
    List<Emp> select = empMapper.findByCon(emp);
    //其他分页的数据，第二个参数可选，表示导航页显示几个
    PageInfo<Emp> pageInfo = new PageInfo<>(select,5);
    return R.ok(pageInfo);
}
```

```java
public interface EmpMapper {
    List<Emp> findByCon(Emp emp);
}
```

```xml
<select id="findByCon" resultType="com.it.entity.Emp">
    <!-- emp_name empName这个是起别名的方式来解决数据库字段和实体类字段不一致的问题 -->
    select eid,emp_name empName,age,sex,email from t_emp
    <!-- 当少条件时，where后面直接加and，如 where and age，这是错的 -->
    <!-- 因此增加了where标签来决定是否进行拼接条件 -->
    <trim prefix="where" suffixOverrides="and|or">
        <if test="empName != null and empName != ''">
            emp_name like concat("%",#{empName},"%") and
        </if>
        <if test="age != null and age != ''">
            age >= #{age} and
        </if>
        <if test="sex != null and sex != ''">
            sex = #{sex} and
        </if>
        <if test="email != null and email != ''">
            email = #{email}
        </if>
    </trim>
</select>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305281625340.png" alt="image-20230528162556208" style="zoom:80%;" />



# 基于注解开发

## 常用注解 

> 这几年来注解开发越来越流行，Mybatis也可以使用注解开发方式，这样我们就可以减少编写Mapper映射文件了。我们先围绕一些基本的CRUD来学习，再学习复杂映射多表操作。
>

> @Insert：实现新增、@Update：实现更新、@Delete：实现删除、@Select：实现查询
>

> @Result：实现结果集封装、@Results：可以与@Result 一起使用，封装多个结果集
>

> @One：实现一对一结果集封装、@Many：实现一对多结果集封装
>

## 单表增删改查⭐

我们完成简单的user表的增删改查的操作

### 实体类

```java
@Data
public class User {
    private int id;
    private String username;
    private String password;
    //注意：这边把日期设置成String类型，插入数据时方便修改
    private String birthday;
}
```

### 数据库表

```sql
create table `user2` (
  `id` int(11) not null auto_increment,
  `username` varchar(50) default null,
  `password` varchar(50) default null,
  `birthday` varchar(50) default null,
  primary key (`id`)
) engine=innodb auto_increment=1 default charset=utf8
```

```sql
insert into user2 values
(null,'人生1','1231','2020-2-21'),
(null,'人生2','1232','2020-2-22'),
(null,'人生3','1233','2020-2-23'),
(null,'人生4','1234','2020-2-24');
```

### Mapper

```java
public interface UserMapper {
    //List<User> findAllUserAndRole(@Param("id") Integer id);
    //注解开发
    @Select("select * from user2")
    public List<User> findAllzhu();

    @Select("select * from user2 where id = #{id}")
    public User findUserById(int id);

    @Insert("insert into user2 values (#{id},#{username}, #{password}, #{birthday})")
    public Boolean save(User user);

    @Delete("delete from user2 where id = #{id}")
    public Boolean deleteById(int id);

    @Update("update user2 set username=#{username},password=#{password} " +
            "where id =#{id}")
    public Boolean updateById(User user);
}
```

### 测试CURD

```java
@RestController
@RequestMapping("user")
public class UserController {

    @Resource
    private UserMapper userMapper;

    //查找所有数据
    @GetMapping("findAll")
    public R findAll()  {
        List<User> user = userMapper.findAllzhu();
        return R.ok(user);
    }

    //根据id查找用户
    @GetMapping("getById/{id}")
    public R getById(@PathVariable Integer id) {
        User user = userMapper.findUserById(2);
        return R.ok(user);
    }

    //保存一条数据
    @PostMapping("save")
    public R save(@RequestBody User user) {
        return R.ok(userMapper.save(user));
    }

    //删除一条数据
    @DeleteMapping("deleteById/{id}")
    public R deleteById(@PathVariable Integer id){
        return R.ok(userMapper.deleteById(id));
    }

    //更新一条数据
    @PutMapping("updateById")
    public R updateById(@RequestBody User user)  {
        return R.ok(userMapper.updateById(user));
    }

}
```

> 实现复杂关系映射之前我们可以在映射文件中通过配置<\resultMap>来实现，使用注解开发后，我们可以使用@Results注解，@Result注解，@One注解，@Many注解组合完成复杂关系的配置
>

## 一对多

### SQL实现

```sql
也是分步查询，同上面一对一查询
select * from user;
select * from orders where uid=查询出用户的id;
```

### 实体类

```java
@Data
public class Dept {
    private Integer did;
    private String deptName;
    // 一对多：部门对应的员工
    private List<Emp> emps;
}
```

```java
@Data
public class Emp implements Serializable {
    private Integer eid;
    private String empName;
    private Integer age;
    private String sex;
    private String email;
    // 多对一
    private Dept dept;
}
```

### Mapper

#### DeptMapper

```java
public interface DeptMapper {

    // 一对多
    @Select("select * from t_dept where did = #{did}")
    @Results({
            // property对应的是entity表的属性名，column对应的是sql的属性名
            @Result(id=true,property = "did",column = "did"),
            @Result(property = "deptName",column = "dept_name"),
            @Result(
                    property = "emps", //要封装的属性名称
                    column = "did", //根据那个字段去查询emp表的数据
                    javaType = List.class,//要封装的实体类型
                    //select属性，代表查询哪个接口的方法获取数据
                    many = @Many(select = "com.it.mapper.EmpMapper.getById")
            ),
    })
    Dept getEmpAndDept4(@Param("did") Integer did);
}
```

#### EmpMapper

```java
public interface EmpMapper {

    @Select("select * from t_emp where did = #{did}")
    @Results({
            // property对应的是entity表的属性名，column对应的是sql的属性名
            @Result(property = "eid",column = "eid"),
            @Result(property = "empName",column = "emp_name"),
            @Result(property = "age",column = "age"),
            @Result(property = "sex",column = "sex"),
            @Result(property = "email",column = "age"),
    })
    List<Emp> getById(@Param("did") Integer did);
}
```

### DeptController

```java
@GetMapping("getEmpAndDept4")
public R getEmpAndDept4(Integer did){
    return  R.ok(deptMapper.getEmpAndDept4(did));
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305282113917.png" alt="image-20230528211339812" style="zoom:80%;" />

## 多对多

> 用户表和角色表的关系为，一个用户有多个角色，一个角色被多个用户使用
>
> 多对多查询的需求：**查询用户同时查询出该用户的所有角色**

### SQL实现

```sql
select * from user;

select * from role r,user_role ur 
where r.id= ur.role_id 
and   ur.user_id=用户的id
```

### 实体类

```java
@Data
public class User {
    private Integer id;
    private String username;
    //多对多，代表当前用户具备哪些角色
    private List<Role> roleList;
}
```

```java
@Data
public class Role {
    private Integer id;
    private String name;
}
```

### Mapper

#### UserMapper

```java
public interface UserMapper {
    //多对多
    @Select("select * from sys_user where id = #{id}")
    @Results({
            //property对应的是entity表的属性名，column对应的是sql的属性名
            @Result(id=true,property = "id",column = "id"),
            @Result(property = "username",column = "username"),
            @Result(
                    property = "roleList", //要封装的属性名称
                    column = "id", //根据那个字段去查询user表的数据
                    javaType = List.class,//要封装的实体类型
                    //select属性，代表查询哪个接口的方法获取数据
                    many = @Many(select = "com.it.mapper.RoleMapper.findByUid")
            ),

    })
    List<User> findAndAllById(@Param("id") Integer id);
}
```

#### RoleMapper

```java
public interface RoleMapper {

    @Select("select * from sys_user_role ur,sys_role r " +
            "where ur.role_id = r.id and ur.user_id = #{uid}")
    public List<Role> findByUid(@Param("uid") int uid);
}
```

### 测试实现

```java
@RestController
@RequestMapping("user")
public class UserController {

    @Resource
    private UserMapper userMapper;

    //多对多，多个用户对应多个身份
    @GetMapping("findAndAllById")
    public R findAllUserAndRole(Integer id) {
        List<User> allUserAndRole = userMapper.findAndAllById(id);
        System.out.println(allUserAndRole);
        return R.ok(allUserAndRole);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305282129490.png" alt="image-20230528212944394" style="zoom:80%;" />



## 多对一

> **查询员工信息以及员工所对应的部门信息**

### SQL实现

> 上面快速开始创建的两张表，t_emp和t_dept

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305271954241.png" alt="image-20230527195457142" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305271954164.png" alt="image-20230527195436084" style="zoom:80%;" />

```sql
select * from t_emp emp left join t_dept dept
on emp.did = dept.did
where emp.eid = 1;
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305271954228.png" alt="image-20230527195417129" style="zoom:80%;" />

### 实体类

```java
@Data
public class Emp {
    private Integer eid;
    private String empName;
    private Integer age;
    private String sex;
    private String email;
    // 多对一
    private Dept dept;
}
```

### Mapper

```java
public interface EmpMapper {

    // 查询员工以及员工对应的部门信息(多对一)
    @Select("select * from t_emp emp left join t_dept dept " +
            "on emp.did = dept.did where emp.eid = #{eid}")
    @Results({
            // property对应的是entity表的属性名，column对应的是sql的属性名
            @Result(property = "eid",column = "eid"),
            @Result(property = "empName",column = "empName"),
            @Result(property = "age",column = "age"),
            @Result(property = "sex",column = "sex"),
            @Result(property = "email",column = "age"),
            // property对应Emp实体类的dept实体类，正常,级联赋值方式
            @Result(property = "dept.did",column = "did"),
            @Result(property = "dept.deptName",column = "dept_name"),
    })
    Emp getEmpAndDept2(@Param("eid") Integer eid);
}
```

### Controller

```java
@GetMapping("getEmpAndDept2")
public R getEmpAndDept2(Integer eid){
    return  R.ok(empMapper.getEmpAndDept2(eid));
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305272003267.png" alt="image-20230527200304176" style="zoom:80%;" />

### 分步查询

> 我不想多表查询，如何获取结果，那我就分步查询

#### EmpMapper

```java
public interface EmpMapper {

    // 查询员工以及员工对应的部门信息(多对一)
    @Select("select * from t_emp emp left join t_dept dept " +
            "on emp.did = dept.did where emp.eid = #{eid}")
    @Results({
            // property对应的是entity表的属性名，column对应的是sql的属性名
            @Result(property = "eid",column = "eid"),
            @Result(property = "empName",column = "empName"),
            @Result(property = "age",column = "age"),
            @Result(property = "sex",column = "sex"),
            @Result(property = "email",column = "age"),
            @Result(
                    property = "dept", //要封装的属性名称
                    column = "did", //根据那个字段去查询user表的数据
                    javaType = Dept.class,//要封装的实体类型
                    //select属性，代表查询哪个接口的方法获取数据
                    one = @One(select = "com.it.mapper.DeptMapper.findUserById")
            ),
            // property对应Emp实体类的dept实体类，正常,级联赋值方式
            @Result(property = "dept.did",column = "did"),
            @Result(property = "dept.deptName",column = "dept_name"),
    })
    Emp getEmpAndDept2(@Param("eid") Integer eid);
}
```

#### DeptMapper

```java
public interface DeptMapper {
    @Select("select * from t_dept where did = #{did}")
    Dept findUserById(@Param("did") Integer did);
}
```

#### EmpController

```java
@GetMapping("getEmpAndDept2")
public R getEmpAndDept2(Integer eid){
    return  R.ok(empMapper.getEmpAndDept2(eid));
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305272031336.png" alt="image-20230527203107242" style="zoom:80%;" />



