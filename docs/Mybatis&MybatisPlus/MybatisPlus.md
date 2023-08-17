



# 概述

[MyBatis-plus！YYDS！ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzAwMTA0OTg3Ng==&mid=2247492398&idx=1&sn=92ccdd932bb8ffb74dc713ce83e6b89c&chksm=9add3755adaabe43542c7d49c9b04cf0dd2d144c6c7da02d52d06ec54d0eb9b5de3901456623&mpshare=1&scene=23&srcid=0723Kq56ygDWIwY0563eP4jc&sharer_sharetime=1658590542807&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

[看了我的 mybatis-plus 用法，全公司同事开始悄悄模仿了 (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU2OTMyMTAxNA==&mid=2247514212&idx=1&sn=8ceabf1775546e3fcbc53fb3d86f1bf2&chksm=fc828b3dcbf5022b4d16ed77a9d502aa817b2334007d009191f4ec4c4e509d2ada909c07017c&mpshare=1&scene=23&srcid=1113sdChXvIpQsuOUzDijcQ7&sharer_sharetime=1668292655383&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

> MyBatis-Plus （简称 MP）是一个 MyBatis (opens new window)的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。
>

![framework](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/mybatis-plus-framework.jpg)



# 核心注解

## @TableName

> 注解在类上，指定类和数据库表的映射关系。**实体类的类名（转成小写后）和数据库表名相同时**，可以不指定该注解。描述：表名注解，标识实体类对应的表，使用位置：实体类
>

```java
@TableName("tb_shop")
public class shop {
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
```

> 数据库表名是tb_shop，数据库类定义成shop，依旧能够映射，另一种**全局映射方式**
>
> 数据表表前缀，加上他创建实体类时可以省略tb_
>
> 作用同@TableName,比如数据库表名tb_sale，则实体类是sale即可

```yml
mybatis-plus:
  global-config:
    db-config:
      table-prefix: tb_
```

## @TableId

> 注解在实体类的某一字段上，**表示这个字段对应数据库表的主键**。当主键名为id时（表中列名为id，实体类中字段名为id），无需使用该注解显式指定主键，mp会自动关联。**若类的字段名和表的列名不一致，可用`value`属性指定表的列名**。另，这个注解有个重要的属性`type`，用于指定主键策略。

```java
// 此时数据库字段是uid,而mp只能对id起作用，因此就需要转换，value就是数据库主键
@TableId(value = "uid", type = IdType.AUTO)
private Long id;
```

```java
@Data
public class shop  {
    // type，用于指定主键策略，默认是ASSIGN_ID，雪花算法
    // 注意：后面controller、mapper等要使用id也要用Long，不然就是类型转换异常
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;
}
```

> 注意：当设置成AUTO，数据库主键要设置自增才会有效，不然没有用

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220308173209988.png" alt="image-20220308173209988" style="zoom:67%;" />

> 注意：数据库类型要和字段类型相匹配，不然不会插入成功的。比如ASSIGN_ID是Long，数据库则要设置成int，ASSIGN_UUID是String，数据库表则要写varchar，字段要设置长一点
>

> 全局配置主键生成策略

```yml
mybatis-plus:
  # 全局配置主键生成策略
  global-config:
    db-config:
      id-type: auto
```

```java
// 此时的实体类就不需要设置IdType了
@TableId
private Long id;
```

## @TableTield

注解在某一字段上，指定Java实体类的字段和数据库表的列的映射关系。这个注解有如下几个应用场景。

> **字段名不一致**：例如实体类属性name，表中字段username，此时需要在实体类属性上使用@TableField("username")设置属性所对应的字段名

> **排除非表字段**：若Java实体类中某个字段，不对应表中的任何列，它只是用于保存一些额外的，或组装后的数据，则可以设置`exist`属性为`false`，这样在对实体对象进行插入时，会忽略这个字段。排除非表字段也可以通过其他方式完成，如使用`static`或`transient`关键字，但个人觉得不是很合理

> **字段验证策略**：通过`insertStrategy`，`updateStrategy`，`whereStrategy`属性进行配置，可以控制在实体对象进行插入，更新，或作为WHERE条件时，对象中的字段要如何组装到SQL语句中。

> **字段填充策略**：通过`fill`属性指定，字段为空时会进行自动填充

```java
public class shop {
    //数据库表名是name，这样配置映射关系
    @TableField(value = "name")
    private String username;
}
```

```java
@Data
public class category {
    @TableId(type = IdType.AUTO)
    private int id;

    @TableField(value = "name") //数据库表字段
    private String username; //自定义字段

    private String fatherid;

    @TableField(select = false)  //查询时不返回该字段的值
    private String delstatus;

    @TableField(exist = false)  //该字段不存在数据库中
    private String address;
}
```

### FieldStrategy

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208271549640.png" alt="image-20220827154926580" style="zoom:80%;" />

### FieldFill

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208271548702.png" alt="image-20220827154842651" style="zoom:80%;" />

## @TableLogic

> 物理删除：真实删除，将对应数据从数据库中删除，之后查询不到此条被删除的数据
>
> 逻辑删除：假删除，将对应数据中代表是否被删除字段的状态修改为“被删除状态”，之后在数据库中仍旧能看到此条数据记录
>
> 使用场景：可以进行数据恢复

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220308174826206.png" alt="image-20220308174826206" style="zoom:67%;" />

```java
@Data
@TableName("tb_shop")
public class shop  implements Serializable { 
    //加上这个注解即可：1表示删除，0表示没删除
    //这样删除语句就自动变成更新语句了
    @TableLogic
    private int deleted;
}
```

## @Version

> 描述：乐观锁注解、标记 `@Verison` 在字段上
>

## @EnumValue

> 描述：普通枚举类注解(注解在枚举字段上
>

## @TableLogic

> 描述：表字段逻辑处理注解（逻辑删除）
>

| 属性   | 类型   | 必须指定 | 默认值 | 描述         |
| :----- | :----- | :------- | :----- | :----------- |
| value  | String | 否       | ""     | 逻辑未删除值 |
| delval | String | 否       | ""     | 逻辑删除值   |

## @OrderBy

描述：内置 SQL 默认指定排序，优先级低于 wrapper 条件查询

| 属性   | 类型    | 必须指定 | 默认值          | 描述           |
| :----- | :------ | :------- | :-------------- | :------------- |
| isDesc | boolean | 否       | true            | 是否倒序查询   |
| sort   | short   | 否       | Short.MAX_VALUE | 数字越小越靠前 |

## camel

> 注意：数据库表中字段用下划线连接，在实体类中要改成小驼峰，例：实体类 createTime ----------->  数据库：create_time，对应查询语句会自动改变字段名称。如果想让数据库字段和实体类字段一一对应，比如create_time对应create_time，则要进行如下操作
>

```yml
mybatis-plus:
  configuration:
    map-underscore-to-camel-case: false
```

> 项目中经常会遇到一些数据，每次都使用相同的方式填充，例如记录的创建时间，更新时间等。我们可以使用MyBatis Plus的自动填充功能，完成这些字段的赋值工作。
>

## 雪花算法

> 需要选择合适的方案去应对数据规模的增长，以应对逐渐增长的访问压力和数据量。数据库的扩展方式主要包括：业务分库、主从复制，数据库分表。

### 数据库分表

> 将不同业务数据分散存储到不同的数据库服务器，能够支撑百万甚至千万用户规模的业务，但如果业务继续发展，同一业务的单表数据也会达到单台数据库服务器的处理瓶颈。例如，淘宝的几亿用户数据，如果全部存放在一台数据库服务器的一张表中，肯定是无法满足性能要求的，此时就需要对单表数据进行拆分。单表数据拆分有两种方式：垂直分表和水平分表。示意图如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305241514239.png" alt="image-20230524151408107" style="zoom: 67%;" />

### 垂直分表

> 垂直分表适合将表中某些不常用且占了大量空间的列拆分出去。例如，前面示意图中的 nickname 和 description 字段，假设我们是一个婚恋网站，用户在筛选其他用户的时候，主要是用 age 和 sex 两个字段进行查询，而 nickname 和 description 两个字段主要用于展示，一般不会在业务查询中用到。description 本身又比较长，因此我们可以将这两个字段独立到另外一张表中，这样在查询 age 和 sex 时，就能带来一定的性能提升。

### 水平分表

> 水平分表适合表行数特别大的表，有的公司要求单表行数超过 5000 万就必须进行分表，这个数字可以作为参考，但并不是绝对标准，关键还是要看表的访问性能。对于一些比较复杂的表，可能超过 1000万就要分表了；而对于一些简单的表，即使存储数据超过 1 亿行，也可以不分表。但不管怎样，当看到表的数据量达到千万级别时，作为架构师就要警觉起来，因为这很可能是架构的性能瓶颈或者隐患。水平分表相比垂直分表，会引入更多的复杂性，例如要求全局唯一的数据id该如何处理

### 主键自增

> ①以最常见的用户 ID 为例，可以按照 1000000 的范围大小进行分段，1 ~ 999999 放到表 1中，1000000 ~ 1999999 放到表2中，以此类推。

> ②复杂点：分段大小的选取。分段太小会导致切分后子表数量过多，增加维护复杂度；分段太大可能会导致单表依然存在性能问题，一般建议分段大小在 100 万至 2000 万之间，具体需要根据业务选取合适的分段大小。

> ③优点：可以随着数据的增加平滑地扩充新的表。例如，现在的用户是 100 万，如果增加到 1000 万，只需要增加新的表就可以了，原有的数据不需要动。

> ④缺点：分布不均匀。假如按照 1000 万来进行分表，有可能某个分段实际存储的数据量只有 1 条，而另外一个分段实际存储的数据量有 1000 万条。

### 取模

> ①同样以用户 ID 为例，假如我们一开始就规划了 10 个数据库表，可以简单地用 user_id % 10 的值来表示数据所属的数据库表编号，ID 为 985 的用户放到编号为 5 的子表中，ID 为 10086 的用户放到编号为 6 的子表中。

> ②复杂点：初始表数量的确定。表数量太多维护比较麻烦，表数量太少又可能导致单表性能存在问题。

> ③优点：表分布比较均匀。④缺点：扩充新的表很麻烦，所有数据都要重分布。

### 雪花算法

> 雪花算法是由Twitter公布的分布式主键生成算法，它能够保证不同表的主键的不重复性，以及相同表的主键的有序性。整体上按照时间自增排序，并且整个分布式系统内不会产生ID碰撞，并且效率较高

> 核心思想：长度共64bit（一个long型）。首先是一个符号位，1bit标识，由于long基本类型在Java中是带符号的，最高位是符号位，正数是0，负数是1，所以id一般是正数，最高位是0。

> 41bit时间截(毫秒级)，存储的是时间截的差值（当前时间截 - 开始时间截)，结果约等于69.73年。

> 10bit作为机器的ID（5个bit是数据中心，5个bit的机器ID，可以部署在1024个节点）。
>
> 12bit作为毫秒内的流水号（意味着每个节点在每毫秒可以产生 4096 个 ID）。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305241530029.png" alt="image-20230524153011896" style="zoom:80%;" />





# 快速开始

## DataSource

```sql
create table `tb_user` (
  `id` bigint unsigned not null auto_increment comment '主键',
  `phone` varchar(11) not null comment '手机号码',
  `password` varchar(128) default '' comment '密码，加密存储',
  `nick_name` varchar(32) default '' comment '昵称，默认是用户id',
  `icon` varchar(255) default '' comment '人物头像',
  `create_time` timestamp not null default current_timestamp comment '创建时间',
  `update_time` timestamp not null default current_timestamp on update 
    current_timestamp comment '更新时间',
  primary key (`id`) using btree,
  unique key `unique_key_phone` (`phone`) using btree
) engine=innodb auto_increment=1
```

```sql
insert into tb_user(id,phone,password,nick_name,icon) values
(null,1110,321,'张三','p1.jpg'),
(null,1111,321,'李四','p2.jpg'),
(null,1112,321,'王五','p3.jpg'),
(null,1113,321,'二麻子','p4.jpg'),
(null,1104,321,'四愣子','p5.jpg');
```

## pom.xml

> 包括mybatis-plus-boot-starter、mysql、lomlok。就这三个依赖，在项目中使用Lombok可以减少很多重复代码的书写。比如说getter/setter/toString等方法的编写。要在idea插件中安装lombok依赖才能使用
>

> spring-boot-starter、spring-boot-starter-test  这两个是SpringBoot依赖
>

```xml
<dependencies>
        <!--mysql依赖-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
        <!--mybatis-plus依赖-->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.5.2</version>
        </dependency>
        <!--lombok依赖-->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        <!-- 数据连接池 druid-->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.2.8</version>
        </dependency>
        <!--如果不加入这依赖配置监控统计拦截的filters时这个会报错filters: stat,wall,log4j-->
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
        </dependency>
</dependencies>
```

## application.yml

> 自己将application.properties修改成application.yml
>

```yml
server:
  port: 8081
  
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    # 由于默认的是UTC时间，所以在中国有8个小时的时差，需要将serverTimezone的值改为GMT%2B8
    # 还可以拼接如下条件：&characterEncoding=utf-8&useSSL=false
    url: jdbc:mysql://localhost:3306/xue?serverTimezone=GMT%2B8
    username: root
    password: 123456
    type: com.alibaba.druid.pool.DruidDataSource
    
# 下面是可选配置    
mybatis-plus:
  configuration:
    # mybatisPlus日志，可以在控制台查看具体的sql执行语句
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
    # 数据库字段的下划线转驼峰,比如数据库字段cron_id，实体类就是cronId
    map-underscore-to-camel-case: true
```

![](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207251550724.png)

> 注意：1、这里的 url 使用了 ?serverTimezone=GMT%2B8 后缀，因为Spring Boot 2.1 集成了 8.0版本的jdbc驱动，这个版本的 jdbc 驱动需要添加这个后缀。MySQL5.0版本不需要，写不写都行。否则运行测试用例报告如下错误：java.sql.SQLException: The server time zone value 'ÖÐ¹ú±ê×¼Ê±¼ä' is unrecognized or represents more 
>

> 这里的 driver-class-name 使用了 com.mysql.cj.jdbc.Driver ，在 jdbc 8 中 建议使用这个驱动，之前的 com.mysql.jdbc.Driver 已经被废弃，否则运行测试用例的时候会有 WARN 信息
>

## 核心代码

### Mybatis-X

> 此插件能直接生成mapper、service、和entity代码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305231551812.png" alt="image-20230523155144716" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305231552631.png" alt="image-20230523155240534" style="zoom:80%;" />

> 代码生成器能直接生成代码，接下来展示下生成的代码

### entity⭐

#### User

```java
@TableName(value ="tb_user")
@Data
public class User extends BaseEntity implements Serializable {
    private static final long serialVersionUID = 1L;
    private String phone;
    private String password;
    private String nickName;
    private String icon;
}
```

#### BaseEntity

```java
@Data
public class BaseEntity implements Serializable {
	// AUTO表示跟随数据库的主键增长策略
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    // 创建日期
    @JsonFormat(locale = "zh", timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
    // 更新日期
    @JsonFormat(locale = "zh", timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateTime;
    // 备注
    @TableField(select = false)
    private String remark;
}
```

### mapper

> 注意：此处没有生成@Mapper注解，需要去主类或配置类上添加扫描注解

```java
public interface userMapper extends BaseMapper<User> {

}
```

```java
@MapperScan({"com.it.mapper"})
@SpringBootApplication
public class MybatisPlusDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(MybatisPlusDemoApplication.class, args);
    }

}
```

### service

```java
public interface userService extends IService<User> {

}
```

```java
@Service
public class userServiceImpl extends ServiceImpl<userMapper, User>
    implements userService{

}
```

### knife4j

> 文档地址：https://doc.xiaominfo.com/，knife4j是为Java MVC框架集成Swagger生成Api文档的增强解决方案

#### API文档

前后端分离开发模式中，api文档是最好的沟通方式。Swagger 是一个规范和完整的框架，用于生成、描述、调用和可视化 RESTful 风格的 Web 服务。

> 1、及时性 (接口变更后，能够及时准确地通知相关前后端开发人员)
>
> 2、规范性 (并且保证接口的规范性，如接口的地址，请求方式，参数及响应格式和错误信息)
>
> 3、一致性 (接口信息一致，不会出现因开发人员拿到的文档版本不一致，而出现分歧)
>
> 4、可测性 (直接在接口文档上进行测试，以方便理解业务)

#### 集成knife4j

> knife4j属于service模块公共资源，因此我们集成到service-uitl模块

##### 添加依赖

操作模块：service-uitl

```xml
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-openapi2-spring-boot-starter</artifactId>
    <version>4.1.0</version>
</dependency>
```

##### 配置文件

```yml
knife4j:
  enable: true
  openapi:
    title: Knife4j官方文档
    description: 我是测试
    email: xiaoymin@foxmail.com
    concat: 八一菜刀
    url: https://docs.xiaominfo.com
    version: v4.0
    license: Apache 2.0
    license-url: https://stackoverflow.com/
    terms-of-service-url: https://stackoverflow.com/
    group:
      test1:
        group-name: 接口
        api-rule: package
        api-rule-resources:
          - com.it.controller
```

```
spring.profiles.active=a
```

##### 访问路径

http://127.0.0.1:8003/doc.html

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305271058093.png" alt="image-20230527105816957" style="zoom:80%;" />



## 统一结果返回

```java
@Getter
public enum ResultCodeEnum {
    // 定义枚举
    SUCCESS(200,"成功"),
    FAIL(201, "失败"),
    SERVICE_ERROR(2012, "服务异常"),
    DATA_ERROR(204, "数据异常"),
    LOGIN_AUTH(208, "未登陆"),
    PERMISSION(209, "没有权限");
    // 设置code和message
    private Integer code;
    private String message;
    // 设置有参构造，目的是传递参数
    private ResultCodeEnum(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}
```

```java
@Data
public class R<T> {
    // 状态码和信息
    private Integer code;
    private String message;
    // 封装的结果
    private T data;
    // 构造器私有
    private R(){}
    // 进行返回数据封装
    public static <T> R<T> build(T body, ResultCodeEnum resultCodeEnum) {
        R<T> result =  new R<>();
        // 封装数据
        if (body != null) {
            result.setData(body);
        }
        // 状态码
        result.setCode(resultCodeEnum.getCode());
        // 返回信息
        result.setMessage(resultCodeEnum.getMessage());
        return result;
    }
    // 操作成功，根据是否传入参数进行方法重载
    public static<T> R<T> ok(){
        return build(null,ResultCodeEnum.SUCCESS);
    }
    public static<T> R<T> ok(T data){
        return build(data, ResultCodeEnum.SUCCESS);
    }
    // 操作失败，根据是否传入参数进行方法重载
    public static<T> R<T> fail(){
        return build(null,ResultCodeEnum.FAIL);
    }
    public static<T> R<T> fail(T data){
        return build(data, ResultCodeEnum.FAIL);
    }
    // 可以自定义消息和返回值，即通过R.ok().code(304).message("事务回滚出错")
    public R<T> message(String msg){
        this.setMessage(msg);
        return this;
    }
    public R<T> code(Integer code){
        this.setCode(code);
        return this;
    }
}
```

## 全局异常处理

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    /**-------- 通用异常处理方法 --------**/
    @ExceptionHandler(Exception.class)
    public R errorFull(Exception e) {
        e.printStackTrace();
        return R.fail(); // 通用异常结果
    }

    @ExceptionHandler(NullPointerException.class)
    public R errorNull(Exception e) {
        e.printStackTrace();
        return R.fail().code(403).message("空指针异常"); // 通用异常结果
    }
}
```

## CURD

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private userService userService;

    @GetMapping("findAll")
    public R findAll() {
        List<User> list = userService.list();
        if (list == null) {
            return R.fail();
        }
        return R.ok(list);
    }

    @GetMapping("get/{id}")
    public R get(@PathVariable Long id) {
        User user = userService.getById(id);
        return R.ok(user);
    }

    @PostMapping("save")
    public R save(@RequestBody User user) {
        boolean is_success = userService.save(user);
        if (is_success) {
            return R.ok();
        } else {
            return R.fail();
        }
    }

    @PutMapping("update")
    public R updateById(@RequestBody User user) {
        boolean is_success = userService.updateById(user);
        if (is_success) {
            return R.ok();
        } else {
            return R.fail();
        }
    }

    @DeleteMapping("remove/{id}")
    public R remove(@PathVariable Long id) {
        boolean is_success = userService.removeById(id);
        if (is_success) {
            return R.ok();
        } else {
            return R.fail();
        }
    }

    @DeleteMapping("batchRemove")
    public R batchRemove(@RequestBody List<Long> idList) {
        boolean is_success = userService.removeByIds(idList);
        if (is_success) {
            return R.ok();
        } else {
            return R.fail();
        }
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305231645048.png" alt="image-20230523164525964" style="zoom:80%;" />



# CURD接口

## Service CURD接口⭐

### 基础配置

> 见上面的快速开始

### 保存 save

```java
// 插入一条记录（选择字段，策略插入）
boolean save(T entity);
// 插入（批量）
boolean saveBatch(Collection<T> entityList);
// 插入（批量）batchSize：每批次多少提交
boolean saveBatch(Collection<T> entityList, int batchSize);
```

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private userService userService;
	// 直接插入
    @PostMapping("save")
    public R save(@RequestBody User user) {
        boolean is_success = userService.save(user);
        if (is_success) {
            return R.ok();
        } else {
            return R.fail();
        }
    }
	// 批量插入，是单个SQL语句进行循环插入的，也就是一条一条插入
    @PostMapping("saveBatch")
    public R saveBatch(@RequestBody List<User> user) {
        boolean is_success = userService.saveBatch(user);
        if (is_success) {
            return R.ok();
        } else {
            return R.fail();
        }
    }
    // 批量插入，每10条提交一次，batchSize决定多少条进行提交
    @PostMapping("saveBatchSize")
    public R saveBatchSize(@RequestBody List<User> user,
                           @RequestParam(defaultValue = "10") int batchSize) {
        System.out.println(batchSize);
        boolean is_success = userService.saveBatch(user,batchSize);
        if (is_success) {
            return R.ok();
        } else {
            return R.fail();
        }
    }
}
```

> 保存的表单：http://127.0.0.1:8081/user/saveBatchSize

```json
[
    {
		"id": null,
	    "phone": "1368612",
	    "password": "21312",
	    "nickName": "小鱼同学",
	    "icon": "/imgs/blogs/blog1.jpg"
    },
	{
		"id": null,
	    "phone": "1368621",
	    "password": "21312",
	    "nickName": "小鱼同学",
	    "icon": "/imgs/blogs/blog1.jpg"
	}
]
```



### 保存或更新

> 用法同save

```java
// TableId 注解存在更新记录，否插入一条记录
boolean saveOrUpdate(T entity);
// 根据updateWrapper尝试更新，否继续执行saveOrUpdate(T)方法
boolean saveOrUpdate(T entity, Wrapper<T> updateWrapper);
// 批量修改插入
boolean saveOrUpdateBatch(Collection<T> entityList);
// 批量修改插入
boolean saveOrUpdateBatch(Collection<T> entityList, int batchSize);
```

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private userService userService;

    @PostMapping("save")
    public R saveOrUpdate(@RequestBody User user) {
        boolean is_success = userService.saveOrUpdate(user);
        if (is_success) {
            return R.ok();
        } else {
            return R.fail();
        }
    }

    @PostMapping("saveBatch")
    public R saveOrUpdateBatch(@RequestBody List<User> user) {
        boolean is_success = userService.saveOrUpdateBatch(user);
        if (is_success) {
            return R.ok();
        } else {
            return R.fail();
        }
    }
    // 批量插入或更新，每10条提交一次，batchSize决定多少条进行提交
    @PostMapping("saveBatchSize")
    public R saveOrUpdateBatch(@RequestBody List<User> user,
                           @RequestParam(defaultValue = "10") int batchSize) {
        System.out.println(batchSize);
        boolean is_success = userService.saveOrUpdateBatch(user,batchSize);
        if (is_success) {
            return R.ok();
        } else {
            return R.fail();
        }
    }
}
```

### 删除 remove

```java
// 根据 entity 条件，删除记录
boolean remove(Wrapper<T> queryWrapper);
// 根据 ID 删除
boolean removeById(Serializable id);
// 根据 columnMap 条件，删除记录
boolean removeByMap(Map<String, Object> columnMap);
// 删除（根据ID 批量删除）
boolean removeByIds(Collection<? extends Serializable> idList);
```

> 注意：**如果字段加上了@TableLogic注解，那么删除会失败，因为删除操作变成了更新操作**
>

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private userService userService;

    //根据id删除
    @DeleteMapping("remove/{id}")
    public R remove(@PathVariable Long id) {
        boolean is_success = userService.removeById(id);
        if (is_success) {
            return R.ok();
        } else {
            return R.fail();
        }
    }
    //删除（根据ID 批量删除）:直接输入3,4这样即可
    @DeleteMapping("removeByIds")
    public R batchRemove(@RequestBody List<Long> idList) {
        boolean is_success = userService.removeByIds(idList);
        if (is_success) {
            return R.ok();
        } else {
            return R.fail();
        }
    }
}
```

> 批量删除：http://127.0.0.1:8081/user/removeByIds

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305232131345.png" alt="image-20230523213124259" style="zoom:80%;" />

### 更新update

```java
// 根据 UpdateWrapper 条件，更新记录 需要设置sqlset
boolean update(Wrapper<T> updateWrapper);
// 根据 whereWrapper 条件，更新记录
boolean update(T updateEntity, Wrapper<T> whereWrapper);
// 根据 ID 选择修改
boolean updateById(T entity);
// 根据ID 批量更新
boolean updateBatchById(Collection<T> entityList);
// 根据ID 批量更新
boolean updateBatchById(Collection<T> entityList, int batchSize);
```

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private userService userService;

    //根据id更新
    @PutMapping("update")
    public R updateById(@RequestBody User user) {
        boolean is_success = userService.updateById(user);
        if (is_success) {
            return R.ok();
        } else {
            return R.fail();
        }
    }
    //根据id更新(多个)
    @PutMapping("updateBatchByIds")
    public R updateBatchByIds(@RequestBody List<User> user) {
        boolean is_success = userService.updateBatchById(user);
        if (is_success) {
            return R.ok();
        } else {
            return R.fail();
        }
    }
    // 批量插入，每10条提交一次，batchSize决定多少条进行提交
    @PutMapping("updateBatchSize")
    public R updateBatchSize(@RequestBody List<User> user,
                           @RequestParam(defaultValue = "10") int batchSize) {
        System.out.println(batchSize);
        boolean is_success = userService.updateBatchById(user,batchSize);
        if (is_success) {
            return R.ok();
        } else {
            return R.fail();
        }
    }
}
```

### 查询get

```java
// 根据 ID 查询
T getById(Serializable id);
// 根据 Wrapper，查询一条记录。结果集，如果是多个会抛出异常，随机取一条加上限制条件 wrapper.last("LIMIT 1")
T getOne(Wrapper<T> queryWrapper);
// 根据 Wrapper，查询一条记录
T getOne(Wrapper<T> queryWrapper, boolean throwEx);
// 根据 Wrapper，查询一条记录
Map<String, Object> getMap(Wrapper<T> queryWrapper);
// 根据 Wrapper，查询一条记录
<V> V getObj(Wrapper<T> queryWrapper, Function<? super Object, V> mapper);
```

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private userService userService;

    //根据ID查询
    @GetMapping("getById/{id}")
    public R getById(@PathVariable("id") int id) {
        return R.ok(userService.getById(id));
    }
    
    // 根据id批量查询
    @GetMapping("findByIds")
    public R findByIds(@RequestParam("id") List<Integer> ids) {
        return R.ok(userService.listByIds(ids));
    }
    // 条件查询
    // 结果集，如果是多个会抛出异常，随机取一条加上限制条件 wrapper.last("LIMIT 1")
    @GetMapping("findByName")
    public R findById(String username) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.last("limit 1");
        return R.ok(userService.getOne(queryWrapper));
    }
    // 条件查询，like
    @GetMapping("findByNickName")
    public R findByTime(String nickname){
        List<User> list = userService.list(new LambdaQueryWrapper<User>()
                .like(User::getNickName,nickname));
        return R.ok(list);
    }
    // 条件查询复杂
    @PostMapping("getCon")
    public R getCon(@RequestBody User user) {
        //封装条件，判断条件值不为空
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        //获取条件值
        String username = user.getNickName();
        LocalDateTime createTimeBegin = user.getCreateTime();
        LocalDateTime createTimeEnd = user.getUpdateTime();
        //判断条件值不为空
        //like 模糊查询：StringUtils是commons-lang3包下的
        if(!StringUtils.isEmpty(username)) {
            wrapper.like(User::getNickName,username);
        }
        // 日期类型：没法用StringUtils
        // ge 大于等于
        if(createTimeBegin != null) {
            wrapper.ge(User::getCreateTime,createTimeBegin);
        }
        // le 小于等于
        if(createTimeEnd  != null ) {
            wrapper.le(User::getUpdateTime,createTimeEnd);
        }
        List<User> list = userService.list(wrapper);
        return R.ok(list);
    }
}
```



### 查询全部list

```java
// 查询所有
List<T> list();
// 查询列表
List<T> list(Wrapper<T> queryWrapper);
// 查询（根据ID 批量查询）
Collection<T> listByIds(Collection<? extends Serializable> idList);
// 查询（根据 columnMap 条件）
Collection<T> listByMap(Map<String, Object> columnMap);
// 查询所有列表
List<Map<String, Object>> listMaps();
// 查询列表
List<Map<String, Object>> listMaps(Wrapper<T> queryWrapper);
// 查询全部记录
List<Object> listObjs();
// 查询全部记录
<V> List<V> listObjs(Function<? super Object, V> mapper);
// 根据 Wrapper 条件，查询全部记录
List<Object> listObjs(Wrapper<T> queryWrapper);
// 根据 Wrapper 条件，查询全部记录
<V> List<V> listObjs(Wrapper<T> queryWrapper, Function<? super Object, V> mapper);
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208252212412.png" alt="image-20220825221257310" style="zoom:80%;" />

### 条件查询

```java
// 条件查询复杂
@PostMapping("getCon")
public R getCon(@RequestBody User user) {
    //封装条件，判断条件值不为空
    LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
    //获取条件值
    String username = user.getNickName();
    LocalDateTime createTimeBegin = user.getCreateTime();
    LocalDateTime createTimeEnd = user.getUpdateTime();
    //判断条件值不为空
    //like 模糊查询：StringUtils是commons-lang3包下的
    if(!StringUtils.isEmpty(username)) {
        wrapper.like(User::getNickName,username);
    }
    // 日期类型：没法用StringUtils
    // ge 大于等于
    if(createTimeBegin != null) {
        wrapper.ge(User::getCreateTime,createTimeBegin);
    }
    // le 小于等于
    if(createTimeEnd  != null ) {
        wrapper.le(User::getUpdateTime,createTimeEnd);
    }
    List<User> list = userService.list(wrapper);
    return R.ok(list);
}
```

## Mapper CURD接口

### 新增

> insert会有int返回值，是数据库中受影响的行数。成功返回值为1，不成功返回0
>

```java
@Test
public void testInsert(){
    User user = new User(null, "张三", 23, "zhangsan@atguigu.com");
    //INSERT INTO user ( id, name, age, email ) VALUES ( ?, ?, ?, ? )
    int result = userMapper.insert(user);
    System.out.println("受影响行数："+result);
    //1475754982694199298，前提是没有设置ID生成策略
    System.out.println("id自动获取："+user.getId());
}
```

> 最终执行的结果，所获取的id为1475754982694199298
>
> 这是因为MyBatis-Plus在实现插入数据时，会默认基于雪花算法的策略生成id

### 更新

```java
// 根据 whereWrapper 条件，更新记录
int update(@Param(Constants.ENTITY) T updateEntity, 
           @Param(Constants.WRAPPER) Wrapper<T> whereWrapper);
// 根据 ID 修改
int updateById(@Param(Constants.ENTITY) T entity);
```

#### 根据id更新

> 会有int返回值，是数据库中受影响的行数。成功返回值为1，不成功返回0
>
> 根据Id更新操作userMapper.updateById(user)

**注意：**update时生成的sql自动是动态sql：UPDATE user SET age=?  WHERE  id=? 

```java
@Test
public void testUpdateById(){
  User user = new User();
  user.setId(1L);
  user.setAge(28);
  int result = userMapper.updateById(user);
  System.out.println(result);
}
```

#### 根据条件进行更新

方式1

```java
@Test
public void update() {
    category c = new category();
    c.setUsername("aa电视");
    c.setFatherid("11");
    c.setDelstatus("0");
    QueryWrapper<category> wrapper = new QueryWrapper<>();
    wrapper.eq("name","bb电视");
    int update = categoryMapper.update(c, wrapper);
    System.out.println(update);
}
```

方式2

```java
@Test
public void update1() {
   UpdateWrapper<category> wrapper = new UpdateWrapper<>();
   wrapper.set("name","blibli").set("fatherid","12").set("delstatus","0")
           .eq("name","aa电视");
    int update = categoryMapper.update(null, wrapper);
    System.out.println(update);
}
```

### 查询

```java
// 根据 ID 查询
T selectById(Serializable id);
// 根据 entity 条件，查询一条记录
T selectOne(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

// 查询（根据ID 批量查询）
List<T> selectBatchIds(@Param(Constants.COLLECTION) Collection<? extends Serializable> idList);
// 根据 entity 条件，查询全部记录
List<T> selectList(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
// 查询（根据 columnMap 条件）
List<T> selectByMap(@Param(Constants.COLUMN_MAP) Map<String, Object> columnMap);
// 根据 Wrapper 条件，查询全部记录
List<Map<String, Object>> selectMaps(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
// 根据 Wrapper 条件，查询全部记录。注意： 只返回第一个字段的值
List<Object> selectObjs(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

// 根据 entity 条件，查询全部记录（并翻页）
IPage<T> selectPage(IPage<T> page, @Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
// 根据 Wrapper 条件，查询全部记录（并翻页）
IPage<Map<String, Object>> selectMapsPage(IPage<T> page, 
                                          @Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
// 根据 Wrapper 条件，查询总记录数
Integer selectCount(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
```

#### 根据id查询记录

对应生成的sql语句：

SELECT id,username,password FROM admin WHERE id=?

userMapper.selectById(1);

```java
@Test
public void testSelectById(){
    User user = userMapper.selectById(1);
    System.out.println(user);
}
```

#### 通过多个id批量查询

完成了动态sql的foreach的功能

userMapper.selectBatchIds(Arrays.asList(1, 2, 3));

```java
@Test
public void testSelectBatchIds(){
    List<User> users = userMapper.selectBatchIds(Arrays.asList(1, 2, 3));
    users.forEach(System.out::println);
}
```

#### 条件查询

通过map封装查询条件(用的较少)

```java
@Test
public void testSelectByMap(){
    HashMap<String, Object> map = new HashMap<>();
    map.put("name", "Helen");
    map.put("age", 18);
    List<User> users = userMapper.selectByMap(map);
    users.forEach(System.out::println);
}
```

#### 查询所有

```java
@Test
public void findAll(){
    // 对应SQL语句：SELECT id,username,password FROM admin
    List<admin> admins = adminMapper.selectList(null);
    admins.forEach(System.out::println);
}
```

> **注意：**map中的key对应的是数据库中的列名。例如数据库user_id，实体类是userId，这时map的key需要填写user_id

#### **查询单个**

> 只能查一个，如果有多个数据就会抛出异常。
>

```java
@Test
public void selectOne() {
    QueryWrapper<category> wrapper = new QueryWrapper<>();
    wrapper.eq("name","bb电视");
    category category = categoryMapper.selectOne(wrapper);
    System.out.println(category);
}
```

#### 查询条数

```java
@Test
public void selectCount() {
    QueryWrapper<category> wrapper = new QueryWrapper<>();
    wrapper.like("name","电");
    Integer count = categoryMapper.selectCount(wrapper);
    System.out.println(count);
}
```

### 删除

#### 根据id删除记录

```java
@Test
public void testDeleteById(){
    //通过id删除用户信息，DELETE FROM user WHERE id=?，类型超过范围加上L，表示Lang类型
    int result = userMapper.deleteById(8);
    System.out.println(result);
}
```

#### 根据id批量删除

 int result = userMapper.deleteBatchIds(Arrays.asList(8, 9, 10));

```java
@Test
public void testDeleteBatchIds() {
     //批量删除
     int result = userMapper.deleteBatchIds(Arrays.asList(8, 9, 10));
     System.out.println(result);
}
```

#### 条件查询删除

  方式一

```java
@Test
public void testDeleteByMap() {
    HashMap<String, Object> map = new HashMap<>();
    map.put("name", "Helen");
    map.put("age", 18);
    int result = userMapper.deleteByMap(map);
    System.out.println(result);
}
```

方式2

```java
@Test
public void delete() {
    QueryWrapper<category> wrapper = new QueryWrapper<>();
    wrapper.eq("name","blibli");
    int delete = categoryMapper.delete(wrapper);
    System.out.println(delete);
}
```

## XML 接口方式

> 需要复杂的SQL查询或者是多表连接查询时需要写XML，这里使用方法同Mybatis，具体写法见Mybatis
>
> 在使用MybatisX插件生成时，也会在resource目录下生成mapper文件

第一步：添加位置

```yml
mybatis-plus:
  # 设置mapper.xml位置
  mapper-locations: classpath:mapper/*xml
  # 使用它在xml的resultType路径下就不用写全限定名了，只需要写类名即可
  type-aliases-package: com.it.entity
```

第二步：写Mapper，可以自己创建一个新接口不继承BaseMapper,也可以直接如下

```java
@Repository
public interface userMapper extends BaseMapper<User> {
    List<User> findAll1();
}
```

第三步:写xml。头就用mybatis的头，写法同mybatis

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.it.mapper.userMapper">
    <!--这边的resultType只写了类名，就是因为上面配置了type-aliases -->
    <select id="findAll1" resultType="User">
        select * from tb_user
    </select>
</mapper>
```

最后：注入，进行测试

```java
@SpringBootTest
class MybatisPlusTests {

    @Resource
    private userMapper userMapper;

    @Test
    public void findAll() {
        List<User> list = userMapper.findAll1();
        list.forEach(System.out::println);
    }
}
```

> 注意：当xml文件不在resource目录下时需要进行配置

```xml
<build>
    <finalName>${project.artifactId}</finalName>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
    <resources>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.yml</include>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>false</filtering>
        </resource>
        <resource>
            <directory>src/main/resources</directory>
            <includes>
                <include>**/*.yml</include>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
                <include>**/*.png</include>
            </includes>
            <filtering>false</filtering>
        </resource>
    </resources>
</build>
```

```properties
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl # 查看日志
  mapper-locations: classpath:com/it/mapper/xml/*.xml
```



# 条件查询⭐

个人感觉复杂语句直接写SQL得了、如果想进行复杂条件查询，那么需要使用条件构造器 Wapper

[一分钟教你更好使用Mybatis Plus条件查询](https://mp.weixin.qq.com/s?__biz=Mzg4MjYyOTgwNw==&mid=2247494257&idx=1&sn=a3857820ef5319d7a66b8f917a337753&chksm=cf5167b1f826eea75725338f4fa9db1376681ed520db4a35c38f74ef4c2a2ffc7901a3ac1b78&mpshare=1&scene=23&srcid=12226kqNwaNKAfLJvxCGpbB8&sharer_sharetime=1671724436836&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

项目地址：https://github.com/YSOcean/mybatisplusstudy.git

## 常用方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/20200813105229605.png" alt="在这里插入图片描述" style="zoom:80%;" />

## 使用步骤

 注意：以下条件构造器的方法入参中的 `column `均表示数据库字段

```java
//第一步：创建QueryWrapper对象
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
//第二步，用queryWrapper对象调用方法
queryWrapper
        .isNull("name")
        .ge("age", 12)
        .isNotNull("email");
//第三步：传入queryWrapper参数
int result = userMapper.delete(queryWrapper);
```

> 以下出现的第一个入参`boolean condition`表示该条件**是否**加入最后生成的sql中，例如：

```java
// 相当于动态SQL，只要条件为空，就不参与拼接SQL，避免出现查不到的问题
// 下面每一个方法第一个参数都是condition
query.like(StringUtils.isNotBlank(name), Entity::getName, name) 
     .eq(age!=null && age >= 0, Entity::getAge, age)
```

## 条件连接

> **不调用`or`则默认为使用 `and `连**

```java
/**
 * and
 * 实例SQL：SELECT id,user_name,user_age FROM user WHERE ((id = ? AND user_age <> ?))
 */
@Test
public void testAnd(){
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    // 在表达式中优先执行
    queryWrapper.and(i->i.eq("id",1).ne("user_age",18));
    List<User> list = userMapper.selectList(queryWrapper);
    System.out.println(list);
}
```

## 子查询

### inSql & notInSql

```java
/**
 * inSql
 * 实例SQL：SELECT id,user_name,user_age FROM user WHERE (id IN (select id from user))
*/
@Test
public void testInSql(){
    QueryWrapper queryWrapper = new QueryWrapper();
    //查询所有数据
    queryWrapper.inSql("id","select id from user");
    List<User> list = userMapper.selectList(queryWrapper);
    System.out.println(list);
}
```

```java
/**
 * notInSql
   SELECT id,user_name,user_age FROM user 
   WHERE (id NOT IN (select id from user where id > 2))
 */
@Test
public void testNotInSql(){
    QueryWrapper queryWrapper = new QueryWrapper();
    //查询所有数据
    queryWrapper.notInSql("id","select id from user where id > 2");
    List<User> list = userMapper.selectList(queryWrapper);
    System.out.println(list);
}
```

### exists & notExists

> 如果子查询有任意数据返回，exists就返回true，子查询外的查询语句执行
>
> 如果子查询没有数据返回，exists就返回false，子查询外的查询语句就不执行

```java
/**
 * exists
 * 实例SQL：SELECT id,user_name,user_age FROM user 
           WHERE (EXISTS (select id from user where user_age = 1))
*/
@Test
public void testExists(){
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.exists("select id from user where user_age = 1");
    List<User> list = userMapper.selectList(queryWrapper);
    System.out.println(list);
}
```

```java
 /**
 * notExists
 * 实例SQL：SELECT id,user_name,user_age FROM user 
            WHERE (EXISTS (select id from user where user_age = 1))
 */
@Test
public void testNotExists(){
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.notExists("select id from user where user_age = 1");
    List<User> list = userMapper.selectList(queryWrapper);
    System.out.println(list);
}
```

## 指定要查询的列

- 例: `select("id", "name", "age")`
- 例: `select(i -> i.getProperty().startsWith("test"))`

```java
@GetMapping("/find2")
public List<admin> find2(admin admin){
    QueryWrapper<admin> wrapper = new QueryWrapper<>();
    // SELECT id,username FROM admin WHERE deleted=0 AND (username LIKE ? ...
    wrapper.select("id","username")
           .like("username",admin.getUsername())
           .or()
           .like("password",admin.getPassword());
    return adminService.list(wrapper);
}
```

## 条件优先级

> 如果想让条件优先执行，就在and方法里加上lambda表达式，这样优先级最高

```java
@Test
public void test04() {
   QueryWrapper<User> queryWrapper = new QueryWrapper<>();
   //将（年龄大于20并且用户名中包含有a）或邮箱为null的用户信息修改
   //UPDATE t_user SET age=?, email=? 
   // WHERE (username LIKE ? AND age > ? OR email IS NULL)
   queryWrapper.like("username", "a").gt("age", 20).or().isNull("email");
   user = new User();
   user.setAge(18);
   user.setEmail("user@atguigu.com");
   int result = userMapper.update(user, queryWrapper);
   System.out.println("受影响的行数：" + result);
}
```

```java
@Test
public void test04() {
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    //将用户名中包含有a并且（年龄大于20或邮箱为null）的用户信息修改
    // UPDATE t_user SET age=?, email=? WHERE (username LIKE ? AND (age > ? OR
    // email IS NULL))
    //lambda表达式内的逻辑优先运算
    queryWrapper.like("username", "a")
    .and(i -> i.gt("age", 20).or().isNull("email"));
    User user = new User();
    user.setAge(18);
    user.setEmail("user@atguigu.com");
    int result = userMapper.update(user, queryWrapper);
    System.out.println("受影响的行数：" + result);
}
```

# 条件构造器

## QueryWrapper

> 继承自 AbstractWrapper ,自身的内部属性 entity 也用于生成 where 条件
>
> 及 LambdaQueryWrapper, 可以通过 new QueryWrapper().lambda() 方法获取

```java
// 条件查询
@GetMapping("findByName")
public R findById(String nickName) {
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    // 第一个参数是数据库表的字段名，而不是实体类的字段名
    wrapper.like("nick_name",nickName)
           .between("age",20,30)
           .isNotNull("icon")
           .orderByAsc("id");
    List<User> list = userService.list(wrapper);
    return R.ok(list);
}
```

```java
// 条件删除
@Test
public void test03(){
   //删除email为空的用户
   //DELETE FROM t_user WHERE (email IS NULL)
   QueryWrapper<User> queryWrapper = new QueryWrapper<>();
   queryWrapper.isNull("email");
   //条件构造器也可以构建删除语句的条件
   int result = userMapper.delete(queryWrapper);
   System.out.println("受影响的行数：" + result);
}
```

```java
// 条件更新
@Test
public void test04(){
   QueryWrapper<User> queryWrapper = new QueryWrapper<>();
   // 拼装查询条件
   queryWrapper.gt("age",20).like("username","a").or().isNull("email");
   // 设置用户信息
   User user = new User();
   user.setName("小米");
   user.setPhone("12321")
   int result = userMapper.update(user,queryWrapper);
   System.out.println("受影响的行数：" + result);
}
```

## UpdateWrapper

> 既可以设置修改条件，也可以设置修改字段

```java
//注意和普通更新的区别
@PutMapping("update1")
public Boolean update1(@RequestBody User user){
    // 根据传入的用户名进行更新，注意：此时用户名不能修改，是用来查询的
    UpdateWrapper<User> wrapper = new UpdateWrapper<>();
    // 第一个参数是数据库字段
    wrapper.eq("nick_name", user.getNickName());
    return userService.update(user,wrapper);
}
```

```java
@PutMapping("update2")
public R update2(@RequestBody User user){
    // 根据传入的用户名进行更新，注意：此时用户名不能修改，是用来查询的
    UpdateWrapper<User> wrapper = new UpdateWrapper<>();
    // 第一个参数是数据库字段
    wrapper.like("nick_name", user.getNickName())
           .and(i -> i.gt("age", 20).or().isNull("icon"));
    wrapper.set("nick_name", user.getNickName());
    return R.ok(userService.update(user,wrapper));
}
```

##  LambdaQueryWrapper

> LambdaQueryWrapper 和 LambdaUpdateWrapper 这是相对于 QueryWrapper 及 UpdateWrapper 的 Lmbda 语法实现方式。有没有发现使用 Lamba 语法很爽，语法简洁，另外有个优点是，使用QueryWrapper或者UpdateWrapper时，对于条件的某个列，我们是写的字符串配置，比如 QueryWrapper.eq("id",1);这里的id是数据库表的列名，很有可能我们会写错，但是通过lambda 的方式，LambdaQueryWrapper.eq(User::getId,1)，这样就不会有写错的可能了。所以推荐大家使用Lambda方式

分别通过如下两种方式获取：

```java
//两种方式        
LambdaQueryWrapper queryLambda = new QueryWrapper().lambda();
LambdaQueryWrapper lambdaQueryWrapper = new LambdaQueryWrapper<>();

//两种方式
LambdaUpdateWrapper updateLambda = new UpdateWrapper().lambda();
LambdaUpdateWrapper lambdaUpdateWrapper = new LambdaUpdateWrapper();
```

注意：获取LambdaQueryWrapper 和 LambdaUpdateWrapper 对象时，为了使用lambda语法，要使用泛型。

下面我演示几个实例：

```java
/**
 * LambdaQueryWrapper
 * SQL实例：SELECT id,user_name,user_age FROM user WHERE (id = ? AND user_age <> ?)
 */
@Test
public void testLambdaQueryWrapper(){
    LambdaQueryWrapper<User> queryLambda = new LambdaQueryWrapper<>();
    queryLambda.eq(User::getId,"1").ne(User::getUserAge,25);
    List<User> users = userMapper.selectList(queryLambda);
    System.out.println(users);
}
```

```java
/**
 * LambdaQueryWrapper
 * SQL实例：UPDATE user SET user_name=? WHERE (user_name = ?)
 */
@Test
public void testLambdaUpdateWrapper(){
    User user = new User();
    user.setUserName("LambdaUpdateWrapper");
    LambdaUpdateWrapper<User> userLambdaUpdateWrapper = new LambdaUpdateWrapper<>();
    userLambdaUpdateWrapper.eq(User::getUserName,"IT可乐");
    userMapper.update(user,userLambdaUpdateWrapper);
}
```

```java
queryWrapper.eq(User::getName,"liangd1"); //可以通过Lambda获取数据库列名
```

```java
@Test
public void TestLambdaQueryWrapper() {
    //1、查询单条
    LambdaQueryWrapper<boys> queryWrapper = new LambdaQueryWrapper<>();
    queryWrapper
            .like(false,boys::getBoyName, null)
            .between(boys::getUserCP, 1,22)
            .or()
            .eq(boys::getSex, 1);
    
    List<boys> users = boysMapper.selectList(queryWrapper);
    users.forEach(System.out::println);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205081046135.png" alt="image-20220508104601052" style="zoom:80%;" />

## LambdaUpdateWrapper

```java
@Test
public void test10() {
    //组装set子句
    LambdaUpdateWrapper<User> updateWrapper = new LambdaUpdateWrapper<>();
    // 拼接查询条件
    updateWrapper.like(User::getName, "a")
                  // lambda表达式内的逻辑优先运算
        		 .and(i -> i.lt(User::getAge, 24).or().isNull(User::getEmail)); 
    updateWrapper.set(User::getAge, 18).set(User::getEmail, "user@atguigu.com")
    int result = userMapper.update(null, updateWrapper);
    System.out.println("受影响的行数：" + result);
}
```

## LambdaQueryChainWrapper

> 超级简化形态

```java
@Test
public void findOne(){
    //1、eq查询单条
    course one = new LambdaQueryChainWrapper<>(courseMapper)
                 .eq(course::getName,"java")
                 .one();
    System.out.println("One:" + one);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208251824923.png" alt="image-20220825182429834" style="zoom:80%;" />

## Chain

> 链式调用，可以不用条件构造器完成 条件设置和增删改查。推荐！因为优雅！

```java
@Test
void testQuery(){
    // 直接写query()即可
    List<User> userList = userService.query()
            .eq("name", "工藤新一")
            .gt("age", 17)
            .list();
    for(User user: userList) {
        System.out.println(user);
    }
}
```

```java
@Test
void testUpdate1(){
    User user = new User();
    user.setName("renshuo");
    user.setAge(111);
    user.setEmail("毛利侦探事务所");
    userService.update()
            .eq("name", "工藤新一")
            .gt("age", 17)
            .update(user);
}
```

## 开发条件构造⭐

> 在真正开发的过程中，组装条件是常见的功能，而这些条件数据来源于用户输入，是可选的，因此我们在组装这些条件时，必须先判断用户是否选择了这些条件，若选择则需要组装该条件，若没有选择则一定不能组装，以免影响SQL执行的结果

```java
@Test
public void test08() {
    //定义查询条件，有可能为null（用户未输入或未选择）
    String username = null;
    Integer ageBegin = 10;
    Integer ageEnd = 24;
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    // StringUtils.isNotBlank(),这个方法是MybatisPlus的方法
    // 判断某字符串是否不为空且长度不为0且不由空白符(whitespace)构成
    if(StringUtils.isNotBlank(username)){
        queryWrapper.like("username","a");
    }
    // 不是String类型的，用null判断
    if(ageBegin != null){
        queryWrapper.ge("age", ageBegin);
    }
    if(ageEnd != null){
        queryWrapper.le("age", ageEnd);
    }
    // SELECT id,username AS name,age,email,is_deleted FROM t_user 
    // WHERE (age >=? AND age <= ?)
    List<User> users = userMapper.selectList(queryWrapper);
    users.forEach(System.out::println);
}
```

> 上面的实现方案没有问题，但是代码比较复杂，我们可以使用带condition参数的重载方法构建查询条件，简化代码的编写

```java
@Test
public void test08UseCondition() {
    //定义查询条件，有可能为null（用户未输入或未选择）
    String username = null;
    Integer ageBegin = 10;
    Integer ageEnd = 24;
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    // StringUtils.isNotBlank()判断某字符串是否不为空且长度不为0且不由空白符(whitespace)构成
    queryWrapper.like(StringUtils.isNotBlank(username), "username", "a")
                .ge(ageBegin != null, "age", ageBegin)
                .le(ageEnd != null, "age", ageEnd);
    // SELECT id,username AS name,age,email,is_deleted FROM t_user 
    // WHERE (age >=? AND age <= ?)
    List<User> users = userMapper.selectList(queryWrapper);
    users.forEach(System.out::println);
}
```



# 逻辑删除

> 日常中，我们在电脑中删除一个文件后，也仅仅是把该文件放入了回收站，日后若有需要还能进行查看或恢复。当我们确定不再需要某个文件，可以将其从回收站中彻底删除。这也是类似的道理。

> **物理删除**：**真实删除，将对应数据从数据库中删除，之后查询不到此条被删除数据**
>
> **逻辑删除**：**假删除，将对应数据中代表是否被删除字段状态修改为“被删除状态”，之后在数据库中仍旧能看到此条数据记录。类似于回收站的功能**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305251513452.png" alt="image-20230525151324356" style="zoom:80%;" />

## 使用方法⭐

### 数据库字段

> **数据库中添加 deleted字段，并设置默认值为0**

```sql
alter table tb_user add column `deleted` boolean default 0
```

### application.yml

> application.yml加入配置（可以不加，**可选配置**）此为默认值，除了logic-delete-field
>

```yml
mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: deleted # 全局逻辑删除的实体字段名(since 3.3.0,配置后可以忽略不配步骤2
      logic-delete-value: 1 # 逻辑已删除值(默认为 1)
      logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)
```

### 实体类字段

> 前面在`application.yml`中做的配置，是全局的。通常来说，对于多个表，我们也会统一逻辑删除字段的名称，统一逻辑已删除和未删除的值，所以全局配置即可。当然，若要对某些表进行单独配置，在实体类的对应字段上使用`@TableLogic`即可
>

```java
// @TableLogic注解此时可以不用添加，因为上面已经全局配置了logic-delete-field
private Integer deleted;
```

### 功能测试

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private userService userService;

    // 根据ID查询
    @GetMapping("getById/{id}")
    public R getById(@PathVariable("id") int id) {
        return R.ok(userService.getById(id));
    }
	// 根据ID删除
    @DeleteMapping("/delete/{id}")
    public R delete(@PathVariable("id") Integer id){
        return R.ok(userService.removeById(id));
    }
}
```

http://127.0.0.1:8083/user/delete/30

http://127.0.0.1:8083/user/getById/30

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305251525556.png" alt="image-20230525152512487" style="zoom:80%;" />

> 测试后发现，数据并没有被删除，deleted字段的值由0变成了1，分析打印的sql语句，是一条update
>

## 注意事项

3.1.0以下会出现逻辑删除失效，此时要加上拦截器才能用。3.4.2版本目前直接用没有问题。

```java
@Configuration
public class MyBatisPlusConfiguration {
    @Bean
    public ISqlInjector sqlInjector() {
        return new LogicSqlInjector();
    }
}
```

注意，上述的影响，只针对mp自动注入的SQL生效。如果是自己手动添加的自定义SQL，则不会生效。

另，逻辑删除可在`application.yml`中进行全局配置，也可在实体类中用`@TableLogic`进行局部配置。



# 自动填充

## 数据库新增两个字段

```mysql
alter table tb_shop add column createTime datetime;
alter table tb_shop add column updateTime datetime;
```

```properties
# 数据库字段的下划线转驼峰,比如数据库字段cron_id，实体类就是cronId，加上false不进行该转换
mybatis-plus.configuration.map-underscore-to-camel-case=false
```

## 实体上添加注解

可选参数：

- 默认不处理 DEFAULT
- 插入填充字段 INSERT
- 更新填充字段 UPDATE
- 插入和更新填充字段：INSERT_UPDATE

```java
//FieldFill.INSERT添加（插入）时执行
@TableField(fill = FieldFill.INSERT)
private LocalDateTime createTime;

//@TableField(fill = FieldFill.UPDATE)，添加和修改时执行
@TableField(fill = FieldFill.INSERT_UPDATE)
private LocalDateTime updateTime;
```

## 创建配置类

```java
import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
public class MyMetaObjectHandler implements MetaObjectHandler {

    @Override
    public void insertFill(MetaObject metaObject) {
        // 插入时自动填充
        // 注意第二个参数要填写实体类中的字段名称，而不是表的列名称
        this.strictInsertFill(metaObject, "createTime", LocalDateTime::now, 
                              LocalDateTime.class);
        this.strictInsertFill(metaObject, "updateTime", LocalDateTime::now,
                              LocalDateTime.class);
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        // 更新时自动填充
        this.strictUpdateFill(metaObject, "updateTime", LocalDateTime::now, 
                              LocalDateTime.class);
    }
}
```

插入数据的时候不需要插入updateTime和insertTime，插入完成后刷新数据库发现插入或更新成功

> 注意，自动填充仅在该字段为空时会生效，若该字段不为空，则直接使用已有的值

## 插入测试

```java
@PostMapping("insertOne")
public void insertOne(@RequestBody course cs){
    courseService.save(cs);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208251643277.png" alt="image-20220825164304124" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208251643554.png" alt="image-20220825164324500" style="zoom:80%;" />



# 乐观锁

## 应用场景

> 一件商品，成本价是80元，售价是100元。老板先是通知小李，说你去把商品价格增加50元。小李正在玩游戏，耽搁了一个小时。正好一个小时后，老板觉得商品价格增加到150元，价格太高，可能会影响销量。又通知小王，你把商品价格降低30元。

> 此时，小李和小王同时操作商品后台系统。小李操作的时候，系统先取出商品价格100元；小王也在操作，取出的商品价格也是100元。小李将价格加了50元，并将100+50=150元存入了数据库；小王将商品减了30元，并将100-30=70元存入了数据库。是的，如果没有锁，小李的操作就完全被小王的覆盖了。现在商品价格是70元，比成本价低10元。几分钟后，这个商品很快出售了1千多件商品，老板亏1万多。

> 上面的故事，如果是乐观锁，小王保存价格前，会检查下价格是否被人修改过了。如果被修改过了，则重新取出的被修改后的价格，150元，这样他会将120元存入数据库。如果是悲观锁，小李取出数据后，小王只能等小李操作完之后，才能对价格进行操作，也会保证最终的价格是120元。

## 乐观锁逻辑

> **乐观锁就是ta比较乐观，觉得怎么操作都不会出问题，ta干什么都不会加锁**，如果一旦出现了问题呢，ta就会再次更新值进行测试。乐观锁假设数据一般情况下不会造成冲突，所以在数据进行提交更新的时候，才会正式对数据的冲突与否进行检测，如果发现冲突了，则返回给用户错误的信息，让用户决定如何去做。效率相对来说比较高~

> **主要适用场景：**当要更新一条记录的时候，希望这条记录没有被别人更新，也就是说实现线程安全的数据更新。多人同时修改一条数据，最后提交的人会把之前人提交的结果覆盖。

> - 取出记录时，获取当前 version
> - 更新时，带上这个 version
> - 执行更新时， set version = newVersion where version = oldVersion
> - 如果 version 不对，就更新失败

这种思想和CAS（Compare And Swap）非常相似。

## 模拟修改冲突

### 数据准备

> 可以直接在源数据表上添加version字段

```sql
alter table admin add column `version` int default 1;
```

> 创建新表，并添加数据

```sql
create table t_product (
  id bigint(20) not null comment '主键id',
  name varchar(30) null default null comment '商品名称',
  price int(11) default 0 comment '价格',
  version int(11) default 0 comment '乐观锁版本号',
  primary key (id)
);
insert into t_product (id, name, price) values (1, '外星人笔记本', 100);
```

### 基础代码

```java
@Data
@TableName("t_product")
public class Product {
    private Long id;
    private String name;
    private Integer price;
    private Integer version;
}
```

```java
public interface ProductMapper extends BaseMapper<Product> {
}
```

### 修改冲突

```java
@Test
public void testConcurrentUpdate() {
    //1、小李
    Product p1 = productMapper.selectById(1L);
    System.out.println("小李取出的价格：" + p1.getPrice());
    //2、小王
    Product p2 = productMapper.selectById(1L);
    System.out.println("小王取出的价格：" + p2.getPrice());
    //3、小李将价格加了50元，存入了数据库
    p1.setPrice(p1.getPrice() + 50);
    int result1 = productMapper.updateById(p1);
    System.out.println("小李修改结果：" + result1);
    //4、小王将商品减了30元，存入了数据库
    p2.setPrice(p2.getPrice() - 30);
    int result2 = productMapper.updateById(p2);
    System.out.println("小王修改结果：" + result2);
    //最后的结果
    Product p3 = productMapper.selectById(1L);
    //价格覆盖，最后的结果：70
    System.out.println("最后的结果：" + p3.getPrice());
}
```

> 小李取出的价格：100
>
> 小王取出的价格：100
>
> 最后的结果：70

## 乐观锁解决冲突

### SQL实现

```sql
-- 数据库中添加version字段，取出记录时，获取当前version
SELECT id,`name`,price,`version` FROM product WHERE id=1
-- 更新时，version + 1，如果where语句中的version版本不对，则更新失败
UPDATE product SET price=price+50, `version`=`version` + 1 WHERE id=1 AND `version`=1
```

### 添加乐观锁插件

创建配置类,加入乐观锁插件

```java
@Bean
public MybatisPlusInterceptor mybatisPlusInterceptor() {
    MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
    interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
    return interceptor;
}
```

### 实体类添加version字段

```java
@Version
private Integer version;
```

### 模拟冲突

```java
@Resource
private ProductMapper productMapper;

@Test
public void testConcurrentUpdate() {
    //1、小李
    Product p1 = productMapper.selectById(1L);
    System.out.println("小李取出的价格：" + p1.getPrice());
    //2、小王
    Product p2 = productMapper.selectById(1L);
    System.out.println("小王取出的价格：" + p2.getPrice());
    //3、小李将价格加了50元，存入了数据库
    p1.setPrice(p1.getPrice() + 50);
    int result1 = productMapper.updateById(p1);
    System.out.println("小李修改结果：" + result1);
    //4、小王将商品减了30元，存入了数据库
    p2.setPrice(p2.getPrice() - 30);
    int result2 = productMapper.updateById(p2);
    System.out.println("小王修改结果：" + result2);
    // 如果不进行此判断，则小王修改失败，最后结果为150
    if(result2 == 0){
        //失败重试，重新获取version并更新
        p2 = productMapper.selectById(1L);
        p2.setPrice(p2.getPrice() - 30);
        result2 = productMapper.updateById(p2);
    }
    System.out.println("小王修改重试的结果：" + result2);
    //最后的结果:120
    Product p3 = productMapper.selectById(1L);
    System.out.println("最后的结果：" + p3.getPrice());
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305251000889.png" alt="image-20230525100045800" style="zoom:80%;" />



# 批量插入

> 批量插入主要是在获取连接、关闭连接、释放资源和提交事务等方面较耗能

## 前期准备

### SQL准备

```sql
create table student(
    id int primary key auto_increment ,
    name varchar(255),
    age int,
    addr varchar(255),
    addr_num varchar(255)
);

select count(*) from student;
truncate table student;
```

### 引入依赖

```xml
<!-- MyBatis-Plus 依赖 -->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.3.1</version>
</dependency>

<!-- 数据库连接驱动 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>

<!-- 使用注解，简化代码-->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```

### 连接配置

```yml
datasource:
  #  连接地址（解决UTF-8中文乱码问题 + 时区校正）
  #  rewriteBatchedStatements=true 开启批处理模式
  url: jdbc:mysql://127.0.0.1:3306/xuexi?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai&rewriteBatchedStatements=true
  #  用户名
  username: root
  #  密码
  password: 123456
  #  连接驱动名称
  driver-class-name: com.mysql.cj.jdbc.Driver
```

### 实体类

```java
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName(value = "student")
public class Student {

    /**  主键  type:自增 */
    @TableId(type = IdType.AUTO)
    private int id;

    /**  名字 */
    private String name;

    /**  年龄 */
    private int age;

    /**  地址 */
    private String addr;

    /**  地址号  @TableField：与表字段映射 */
    @TableField(value = "addr_num")
    private String addrNum;

    public Student(String name, int age, String addr, String addrNum) {
        this.name = name;
        this.age = age;
        this.addr = addr;
        this.addrNum = addrNum;
    }
}
```

### Mapper

```java
@Mapper
public interface studentMapper extends BaseMapper<Student> {

}
```

## 单条插入(太慢)

测试平均时间约是177秒，实在是不忍直视（捂脸），因为利用for循环进行单条插入时，每次都是在获取连接(Connection)、释放连接和资源关闭等操作上，（如果数据量大的情况下）极其消耗资源，导致时间长。

```java
@Test
public void insert1(){
    long begin = System.currentTimeMillis(); // 统计开始时间
    List<course> list = new ArrayList<>();
    course cs = new course();
    for (int i = 0; i < 50000; i++) {
        // 生成随机字符串
        cs.setName("张三"+i);
        list.add(cs);
    }
    // 一条一条插入
    for (course course : list) {
        courseService.save(course);
    }
    long end = System.currentTimeMillis(); // 统计结束时间
    System.out.println("执行时间：" + (end - begin)+" ms"); // 时间太长
}
```

## 原生批量插入

使用MyBatis-Plus实现IService接口中批处理`saveBatch()`方法，对底层源码进行查看时，可发现其实是for循环插入，但是与第一点相比，为什么性能上提高了呢？因为利用分片处理（`batchSize = 1000`） + 分批提交事务的操作，从而提高性能，并非在Connection上消耗性能。

```java
@Test
public void insert3(){
    long begin = System.currentTimeMillis(); // 统计开始时间
    List<course> list = new ArrayList<>();
    course cs = new course();
    for (int i = 0; i < 1000000; i++) {
        // 生成随机字符串
        cs.setName("张三"+i);
        list.add(cs);
    }
    // MP 批量插入
    courseService.saveBatch(list);
    long end = System.currentTimeMillis(); // 统计结束时间
    System.out.println("执行时间：" + (end - begin)+" ms"); // 执行时间：134138 ms
}
```

重点注意：MySQL JDBC驱动默认情况下忽略`saveBatch()`方法中的`executeBatch()`语句，将需要批量处理的一组SQL语句进行拆散，执行时一条一条给MySQL数据库，造成实际上是分片插入，即与单条插入方式相比，有提高，但是性能未能得到实质性的提高。

```c
url连接加上它会加快插入速度：rewriteBatchedStatements = true 
```

## Guava+批量插入分片实现

MyBatis 原生批量插入时的问题：可能会因为插入的数据太多从而导致运行失败，我们可以通过分片的方式来解决此问题，分片批量插入的实现步骤如下：

1. 计算出分片的数量（分为 N 批）；
2. 使用 Lists.partition 方法将集合进行分片（分为 N 个集合）；
3. 循环将分片的集合进行批量插入的操作。

要实现分片功能，第一步我们先要添加 Guava 框架的支持，在 pom.xml 中添加以下引用：

```xml
<!-- google guava 工具类 -->
<!-- https://mvnrepository.com/artifact/com.google.guava/guava -->
<dependency>
  <groupId>com.google.guava</groupId>
  <artifactId>guava</artifactId>
  <version>31.0.1-jre</version>
</dependency>
```

那接下来，就是改造我们的 MyBatis 批量插入代码了，具体实现如下：

```java
@Test
public void insert2(){
    long begin = System.currentTimeMillis(); // 统计开始时间
    List<course> list = new ArrayList<>();
    course cs = new course();
    for (int i = 0; i < 1000000; i++) {
        // 生成随机字符串
        cs.setName("张三"+i);
        list.add(cs);
    }
    // 分片批量插入
    int count = (int) Math.ceil(1000000 / 1000.0); // 分为 n 份，每份 1000 条
    // 第二个参数表示分成多少份
    List<List<course>> listPartition = Lists.partition(list, count);
    // 分片批量插入
    for (List<course> item : listPartition) {
        courseService.saveBatch(item);
    }
    long end = System.currentTimeMillis(); // 统计结束时间
    System.out.println("执行时间：" + (end - begin)+" ms"); // 执行时间：137419 ms
}
```

## foreach实现

简明：拼接格式：`insert into student(xxxx) value(xxxx),(xxxx),(xxxxx).......`

总结：拼接结果就是将所有的数据集成在一条SQL语句的value值上，其由于提交到服务器上的insert语句少了，网络负载少了，性能也就提上去。

但是当数据量上去后，可能会出现内存溢出、解析SQL语句耗时等情况，但与第一点相比，提高了极大的性能。

```java
// 使用@Insert注解插入：此处为简便，不写Mapper.xml文件
@Insert("<script>" +
        "insert into student (name,age,addr,addr_num) values " +
        "<foreach collection='studentList' item='item' separator=','> " +
        "(#{item.name}, #{item.age}, #{item.addr}, #{item.addrNum}) " +
        "</foreach> " +
        "</script>")
int insertSplice(@Param("studentList") List<Student> studentList);
```

```java
@Test
public void insertBySQL(){
    ArrayList<Student> arrayList = new ArrayList<>();
    long startTime = System.currentTimeMillis();
    for (int i = 0; i < 50000; i++){
        Student student = new Student("李毅" + i,24,"张家界市" + i,i + "号");
        arrayList.add(student);
    }
    studentMapper.insertSplice(arrayList);
    long endTime = System.currentTimeMillis();
    System.out.println("插入数据消耗时间：" + (endTime - startTime));
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202210262046489.png" alt="image-20221026204646436" style="zoom:80%;" />

## 循环插入 + 开启批处理⭐⭐

> 循环插入 + 开启批处理模式（总耗时：1.7秒）（重点：一次性提交）

简明：开启批处理，关闭自动提交事务，共用同一个SqlSession之后，for循环单条插入的性能得到实质性的提高；由于同一个SqlSession省去对资源相关操作的耗能、减少对事务处理的时间等，从而极大程度上提高执行效率。（目前个人觉得最优方案）

```yml
datasource:
  #  连接地址（解决UTF-8中文乱码问题 + 时区校正）
  #  rewriteBatchedStatements=true 开启批处理模式
  url: jdbc:mysql://127.0.0.1:3307/xuexi?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai&rewriteBatchedStatements=true
  #  用户名
  username: root
  #  密码
  password: 123456
  #  连接驱动名称
  driver-class-name: com.mysql.cj.jdbc.Driver
```

```java
@Resource
private SqlSessionFactory sqlSessionFactory;

@Test
public void forSaveBatch(){
    //  开启批量处理模式 BATCH 、关闭自动提交事务 false
    SqlSession sqlSession = sqlSessionFactory.openSession(ExecutorType.BATCH,false);
    //  反射获取，获取Mapper
    StudentMapper studentMapper = sqlSession.getMapper(StudentMapper.class);
    long startTime = System.currentTimeMillis();
    for (int i = 0 ; i < 50000 ; i++){
        Student student = new Student("李毅" + i,24,"张家界市" + i,i + "号");
        studentMapper.insertStudent(student);
    }
    // 一次性提交事务
    sqlSession.commit();
    // 关闭资源
    sqlSession.close();
    long endTime = System.currentTimeMillis();
    System.out.println("总耗时： " + (endTime - startTime));
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202210262028414.png" alt="image-20221026202812147" style="zoom:80%;" />

## 性能对比

稍微总结下我粗略的对比（虽然粗略，但实验结果符合原理层面的理解），如果你想更准确地实验，可以使用JMH，并且测试更多组数（如 5000，10000等）的情况。

| 批量保存方式                            | 数据量（条） | 耗时（ms） |
| :-------------------------------------- | :----------- | :--------- |
| 单条循环插入                            | 1000         | 121011     |
| mybatis-plus saveBatch                  | 1000         | 59927      |
| mybatis-plus saveBatch(添加rewtire参数) | 1000         | 2589       |
| 手动拼接sql                             | 1000         | 2275       |
| jdbc executeBatch                       | 1000         | 55663      |
| jdbc executeBatch(添加rewtire参数)      | 1000         | 324        |

所以如果有使用 jdbc 的 Batch 性能方面的需求，要将 rewriteBatchedStatements 设置为 true，这样能提高很多性能。然后如果喜欢手动拼接 sql 要注意一次拼接的数量，分批处理。



# 防全表更新与删除插件

> 针对 update 和 delete 语句 作用: 阻止恶意的全表更新删除
>

## 定义插件

注入MybatisPlusInterceptor类，并配置BlockAttackInnerInterceptor拦截器

```java
@Bean
public MybatisPlusInterceptor mybatisPlusInterceptor() {
    MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
    interceptor.addInnerInterceptor(new BlockAttackInnerInterceptor());
    return interceptor;
}
```

## 测试全表删除

```java
@DeleteMapping("/delete")
public Boolean delete(){
    return adminService.remove(null);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220322180319067.png" alt="image-20220322180319067" style="zoom:80%;" />

可以发现，全表删除失败

## 测试全表更新

此时只传入username或者password，没有传入id

```java
@PutMapping("/updatePass")
public Boolean updatePass(@RequestBody admin admin){
    return adminService.update(admin,null);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220322180948388.png" alt="image-20220322180948388" style="zoom:67%;" />

# 分页

> MyBatis Plus自带分页插件，只要简单的配置即可实现分页功能，mybatis的是pageHelper，使用方法类似分页插件使用方法:先创建配置类
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208261354483.png" alt="image-20220826135438192" style="zoom: 80%;" />

## 配置分页插件

```java
@Configuration
@MapperScan({"com.it.mapper"})
public class MPConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // 必须配置
        PaginationInnerInterceptor paginationInnerInterceptor = new 
            PaginationInnerInterceptor(DbType.MYSQL);
        // 下面两个属性是可选配置
        // 溢出总页数后是否进行处理，默认不处理false，
        // 如果设置true,如果溢出总页数的时候是跳到第一页的。
        paginationInnerInterceptor.setOverflow(true);
        // 设置最大分页数
        paginationInnerInterceptor.setMaxLimit(100000L);
        interceptor.addInnerInterceptor(paginationInnerInterceptor);
        return interceptor;
    }
}
```

## 基本分页

```java
//基本分页查询
@GetMapping("/simple/{page}/{limit}")
public R SimpleIndex(@PathVariable Long page,
                     @PathVariable Long limit) {
    //创建page对象
    Page<User> pageParam = new Page<>(page,limit);
    //调用mp的方法实现条件分页查询。第二个参数是查询条件
    IPage<User> pageModel = userService.page(pageParam, null);
    return R.ok(pageModel);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305242159047.png" alt="image-20230524215920905" style="zoom:80%;" />



## 条件分页查询

```java
//用户条件分页查询
@GetMapping("{page}/{limit}")
public R index(@PathVariable Long page,
               @PathVariable Long limit,
               User user) {
    //创建page对象
    Page<User> pageParam = new Page<>(page,limit);
    //封装条件，判断条件值不为空
    LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
    //获取条件值
    String username = user.getNickName();
    LocalDateTime createTimeBegin = user.getCreateTime();
    Integer age = user.getAge();
    //判断条件值不为空
    //like 模糊查询
    if(!StringUtils.isEmpty(username)) {
        wrapper.like(User::getNickName,username);
    }
    //ge 大于等于
    if(createTimeBegin != null) {
        wrapper.ge(User::getCreateTime,createTimeBegin);
    }
    //le 小于等于
    if(age != null) {
        wrapper.between(User::getAge,0,100);
    }
    //调用mp的方法实现条件分页查询
    IPage<User> pageModel = userService.page(pageParam, wrapper);
    return R.ok(pageModel);
}
```

> 访问测试：http://127.0.0.1:8082/user/1/2

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305242155841.png" alt="image-20230524215502626" style="zoom:80%;" />

## 自定义分页-xml

```java
@Resource
private userMapper userMapper;

//简单分页查询
@GetMapping("my/{currentPage}/{limit}")
public R MyIndex(@PathVariable Long currentPage,
                 @PathVariable Long limit,
                 Integer age) {
    //创建page对象
    Page<User> page = new Page<>(currentPage,limit);
    //调用mp的方法实现条件分页查询
    IPage<User> pageModel = userMapper.selectPageByAge(page,age);
    return R.ok(pageModel);
}
```

```java
public interface userMapper extends BaseMapper<User> {
    List<User> findAll1();
    // 通过年龄查询用户信息并分页
    // MybatisPlus所提供的分页对象，必须位于第一个参数的位置
    // @Param：用于写xml的SQL语句传参
    Page<User> selectPageByAge(@Param("page") Page<User> page,
                               @Param("age") Integer age);
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.it.mapper.userMapper">
    
    <!--这边的resultType只写了类名，就是因为上面配置了type-aliases -->
    <select id="selectPageByAge" resultType="User">
        select * from tb_user where age > #{age}
    </select>
    
</mapper>
```



## 自定义分页-java

### service

```java
//自定义分页
Map<String, Object>  getPage(Long currentPage, Long pageSize);
```

```java
//自定义方法肯定要注入mapper接口的
@Autowired
private shopMapper shopMapper;
//无条件分页
@Override
public Map<String, Object> getPage(Long currentPage, Long pageSize) {
    IPage<shop> page = new Page<>(currentPage,pageSize);
    IPage<shop> shopIPage = shopMapper.selectPage(page, null);
    //如果当前页大于总页码值，那么就使用最大的页码值作为当前页码值
    if (currentPage > shopIPage.getPages()) {
        IPage<shop> page1 = new Page<>(shopIPage.getPages(),pageSize);
        shopIPage = shopMapper.selectPage(page1,null);
    }
    Map<String, Object> map = new HashMap<>();
    List<shop> records = shopIPage.getRecords();
    //获取总页数
    long pages = shopIPage.getPages();
    //获取总记录数
    long total = shopIPage.getTotal();
    map.put("data",records);
    map.put("pages",pages);
    map.put("total",total);
    return map;
}
```

### controller

```java
@GetMapping("/page/{currentPage}/{pageSize}")
public Map<String, Object> getPage(
                 @PathVariable("currentPage") Long currentPage,
                 @PathVariable("pageSize") Long pageSize){

    return shopService.getPage(currentPage, pageSize);
}
```

访问：/page/5/2

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208261448400.png" alt="image-20220826144834300" style="zoom:67%;" />

## 自定义条件分页

### service

```java
//条件查询带分页
Map<String, Object> getPageCondition(Long currentPage,Long pageSize,shop shop);
```

> 方式一：通过StringUtils和null进行条件拼接，相对复杂
>

```java
@Override
public Map<String, Object> getPageCondition(Long currentPage, Long pageSize, course course) {
    IPage<course> page = new Page<>(currentPage,pageSize);
    QueryWrapper<course> wrapper = new QueryWrapper<>();
    //判空，如果字段为空就不加上该字段，都为空就去掉where
    // hasText：空字符串、null都为false，有字符才为true
    if (StringUtils.hasText(course.getName())){
        wrapper.like("name",course.getName());
    }
    // 注意：不是String类型用hasText判空会出问题，直接自己来判断
    if (course.getSex() != null) {
        wrapper.eq("sex",course.getSex());
    }

    IPage<course> shopIPage = courseMapper.selectPage(page, wrapper);
    //如果当前页大于总页码值，那么就使用最大的页码值作为当前页码值
    if (currentPage > shopIPage.getPages()) {
        IPage<course> page1 = new Page<>(shopIPage.getPages(),pageSize);
        shopIPage = courseMapper.selectPage(page1,wrapper);
    }

    Map<String, Object> map = new HashMap<>();
    List<course> records = shopIPage.getRecords();
    //获取总页数
    long pages = shopIPage.getPages();
    //获取总记录数
    long total = shopIPage.getTotal();
    map.put("data",records);
    map.put("pages",pages);
    map.put("total",total);
    return map;
}
```

> 方式二：通过MP内部的第一个参数进行条件判断
>

```java
@Override
public Map<String, Object> getPageCondition(Long currentPage, 
                                            Long pageSize, 
                                            course course) {
    .....
    // 判空，如果字段为空就不加上该字段，都为空就去掉where
    // hasText：空字符串、null都为false，有字符才为true
    wrapper.like(StringUtils.hasText(course.getName()),"name",course.getName())
           .eq(course.getSex() != null,"sex",course.getSex());
    .....
}
```

### controller

```java
@PostMapping("/page1/{currentPage}/{pageSize}")
public Map<String, Object> getPageCondition(
        @PathVariable("currentPage") Long currentPage,
        @PathVariable("pageSize") Long pageSize,
        @RequestBody(required = false) shop shop){

    return shopService.getPageCondition(currentPage,pageSize,shop);
}
```



# 数据安全

> 该功能为了保护数据库配置及数据安全，在一定的程度上控制开发人员流动导致敏感信息泄露。
>
> 注意：开发环境不能用，这是用在生产环境中的

[(41条消息) Mybatis-Plus数据安全保护-及其使用方法_心醉瑶瑾前的博客-CSDN博客_mybatisplus 数据安全](https://blog.csdn.net/qq_46452300/article/details/122026032)

## 生成AES密钥

```java
@Test
void test(){ //生成十六位随机AES密钥
    String randomKey= AES.generateRandomKey();
    System.out.println(randomKey);
}
```

## 根据密钥加密

```java
@Test
void test01() {
    //生成的十六位随机AES密钥，就是上面的方法生成的密钥
    String randomKey = "625b787771ba8ccd";
    //使用随机密钥加密需要加密的数据，列如数据库url,username,password
    String url = "jdbc:mysql://localhost:3306/xuexi?serverTimezone=UTC";
    String username = "root";
    String password = "123456";
    String aesUrl = AES.encrypt(url, randomKey);
    String aesUsername = AES.encrypt(username, randomKey);
    String aesPassword = AES.encrypt(password, randomKey);
    System.out.println("url:"+"mpw:"+aesUrl);
    System.out.println("username:"+"mpw:"+aesUsername);
    System.out.println("password:"+"mpw:"+aesPassword);
}
```

将配置文件中对应替换

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220322164104188.png" alt="image-20220322164104188" style="zoom:67%;" />

> application.yml进行修改
>

```yml
// 加密配置 mpw: 开头紧接加密内容（ 非数据库配置专用 YML 中其它配置也是可以使用的 ）
spring:
  datasource:
    url: mpw:qRhvCwF4GOqjessEB3G+a5okP+uXXr96wcucn2Pev6Bf1oEMZ1gVpPPhdDmjQqoM
    password: mpw:Hzy5iliJbwDHhjLs1L0j6w==
    username: mpw:Xb+EgsyuYRXw7U7sBJjBpA==
```

## 访问测试

> 方式一：idea设置参数

```apl
// idea 设置 Program arguments , 服务器可以设置为启动环境变量 
--mpw.key=d1104d7c3b616f0b
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305251505799.png" alt="image-20230525150534720" style="zoom:80%;" />

> 方式二：项目打包，进行测试，密钥就是上面生成的密钥

```apl
java -jar test1.jar --mpw.key=625b787771ba8ccd
```



# SQL性能分析(输出执行时间)

SQL性能分析拦截器，用于输出每条 SQL 语句及其执行时间

> SQL 性能执行分析,开发环境使用，超过指定时间，停止运行。有助于发现问题
>

```xml
<!-- https://mvnrepository.com/artifact/p6spy/p6spy -->
<dependency>
    <groupId>p6spy</groupId>
    <artifactId>p6spy</artifactId>
    <version>3.9.1</version>
</dependency>
```

> application.yml 配置

```yaml
spring:
  datasource:
    driver-class-name: com.p6spy.engine.spy.P6SpyDriver
    url: jdbc:p6spy:mysql://localhost:3306/xue?serverTimezone=GMT%2B8
    ...
```

> resource目录下创建spy.properties
>

```properties
module.log=com.p6spy.engine.logging.P6LogFactory,com.p6spy.engine.outage.P6OutageFactory
# 自定义日志打印,自定义P6SpyLogger类的地址(重要)
logMessageFormat=com.it.config.P6spySqlFormatConfig
# 输出到控制台
# appender=com.p6spy.engine.spy.appender.StdoutLogger
# 输出到文件，注意：控制台和文件只能成功一个，先到先得
logfile=spy.log
## 配置记录Log例外
excludecategories=info,debug,result,batc,resultset
# 设置使用p6spy driver来做代理
deregisterdrivers=true
# 日期格式
dateformat=yyyy-MM-dd HH:mm:ss
# 实际驱动
driverlist=com.mysql.cj.jdbc.Driver
# 是否开启慢SQL记录
outagedetection=true
# 慢SQL记录标准 秒
outagedetectioninterval=2
```

> 自定义日志输出格式(可选)：com.it.config.P6spySqlFormatConfig
>

```java
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.p6spy.engine.spy.appender.MessageFormattingStrategy;

//自定义p6spy SQL输出格式
public class P6spySqlFormatConfig implements MessageFormattingStrategy {

    public String formatMessage(int connectionId, String now, long elapsed, 
                                String category, String prepared, 
                                String sql, String url) {
        return StringUtils.isNotEmpty(sql) ? "耗时 ：" + elapsed + " ms " + now +
            "\nSQL 语 句：" + sql.replaceAll("[\\s]+", " ") + "\n" : null;
    }
}
```

结果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220310102150680.png" alt="image-20220310102150680" style="zoom:67%;" />



# ActiveRecord

## 核心思想

> ActiveRecord（简称AR）一直广受动态语言（ PHP 、 Ruby 等）的喜爱，而 Java 作为准静态语言，对于 ActiveRecord 往往只能感叹其优雅，所以我们也在 AR 道路上进行了一定的探索，喜欢大家能够喜欢。
>

> ActiveRecord也属于ORM（对象关系映射）层，由Rails最早提出，遵循标准的ORM模型：表映射到记录，记 录映射到对象，字段映射到对象属性。配合遵循的命名和配置惯例，能够很大程度的快速实现模型的操作，而 且简洁易懂。

ActiveRecord的主要思想是：

> 1.  每一个数据库表对应创建一个类，类的每一个对象实例对应于数据库中表的一行记录；
>2. 通常表的每个字段 在类中都有相应的Field； ActiveRecord同时负责把自己持久化，在ActiveRecord中封装了对数据库的访问，即CURD;
> 3.  ActiveRecord是一种领域模型(Domain Model)，封装了部分业务逻辑；

## 基本使用

### 实体类继承Model类

```java
@Data
public class sysuser extends Model<sysuser> {
    private int id;
    private String upass;
    private String utype;
    private String delstatus;
}
```

> Mapper:虽然不使用，但是一定要定义
>

```java
public interface sysuserMapper extends BaseMapper<sysuser> {
}
```

> 测试，方法有很多，用法同上面的增删改查
>

### 查找所有

```java
@Test
public void testfindAll(){
    sysuser user = new sysuser();
    List<sysuser> sysusers = user.selectAll();
    System.out.println(sysusers);
}
```

### 插入数据

```java
@Test
public void testInsert(){
    sysuser user = new sysuser();
    user.setUname("任硕");
    user.setUpass("315217");
    user.setUtype("管理员");
    user.setDelstatus("0");
    boolean insert = user.insert();
    System.out.println(insert);
}
```

### 更新数据

```java
@Test
public void testUpdate(){
    sysuser user = new sysuser();
    user.setUname("猫眼");
    user.setUpass("123315217");
    user.setUtype("管理员");
    user.setDelstatus("0");
    QueryWrapper<sysuser> wrapper = new QueryWrapper<>();
    wrapper.eq("id",19);
    boolean update = user.update(wrapper);
    System.out.println(update);
}
```

### 删除数据

```java
@Test
public void testDelete(){
    sysuser user = new sysuser();
    user.setId(1);
    boolean delete = user.deleteById();
    System.out.println(delete);
}
```

### 条件查询

```java
@Test
public void testCondition(){
    sysuser user = new sysuser();
    QueryWrapper<sysuser> wrapper = new QueryWrapper<>();
    wrapper.eq("uname","任硕");
    List<sysuser> sysusers = user.selectList(wrapper);
    System.out.println(sysusers);
}
```



# 通用枚举

> 解决了繁琐的配置，让 mybatis 优雅的使用枚举属性！其实就是对应修改属性值：比如数据库中sex字段为1,代表男，2代表女。那么可以用枚举 从 3.5.2 版本开始只需完成 `步骤1: 声明通用枚举属性` 即可
>

## 数据库字段

```sql
alter table tb_user add column `sex` int(1) null default 1 comment '1-男，2-女';
```

## 定义枚举类⭐

```java
@Getter
public enum SexEnum {

    MAN(1, "男"), WOMAN(2, "女");

    //标记数据库存的值是value
    @EnumValue
    private final int value;

    //必须有它，不然显示的就是MAN，而不是男
    @JsonValue
    private final String desc;

    SexEnum(int value, String desc) {
        this.value = value;
        this.desc = desc;
    }
}
```

## 加入包扫描(3.5.2版本省略)

```properties
mybatis-plus.type-enums-package = com.it.enums
```

## 修改实体类⭐

```java
@TableName(value ="tb_user")
@Data
public class User extends BaseEntity {
    private static final long serialVersionUID = 1L;
    private String phone;
    private String password;
    private String nickName;
    private String icon;
    // 设置枚举字段
    private SexEnum sex;
    private Integer age;
}
```

## 查询测试

```java
//根据ID查询
@GetMapping("getById/{id}")
public R getById(@PathVariable("id") int id) {
    return R.ok(userService.getById(id));
}
```

访问测试：http://127.0.0.1:8083/user/getById/2

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305251023650.png" alt="image-20230525102319563" style="zoom:80%;" />

## 插入数据测试

```java
// 直接插入
@PostMapping("save")
public R save(@RequestBody User user) {
    boolean is_success = userService.save(user);
    if (is_success) {
        return R.ok();
    } else {
        return R.fail();
    }
}
```

http://127.0.0.1:8083/user/save,输入如下数据，就是正常输入男女

```json
{
	"id": null,
	"phone": "13686091322",
	"password": "21312",
	"nickName": "小鱼同学12",
    "sex": "女",
	"icon": "/imgs/blogs/blog1.jpg"
}
```

数据库中查看，插入的值是2，说明已经成功转换

# 代码生成器

## 代码生成器旧⭐

> 挺好用的，推荐使用

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>3.4.1</version>
</dependency>

<dependency>
    <groupId>org.apache.velocity</groupId>
    <artifactId>velocity-engine-core</artifactId>
    <version>2.0</version>
</dependency>
```

```java
import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.PackageConfig;
import com.baomidou.mybatisplus.generator.config.StrategyConfig;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;

public class CodeGet {

    public static void main(String[] args) {

        // 1、创建代码生成器
        AutoGenerator mpg = new AutoGenerator();
        // 2、全局配置
        // 全局配置
        GlobalConfig gc = new GlobalConfig();
        gc.setOutputDir("D:\\SpringBoot新项目\\MybatisPlusDemo"+"/src/main/java");
        //去掉Service接口的首字母I，因为生成器会自动加I,所以要去掉
        gc.setServiceName("%sService");
        gc.setAuthor("renshuo"); // 设置作者
        gc.setOpen(false); // 设置目录是否展开，没啥用
        mpg.setGlobalConfig(gc);
        // 3、数据源配置
        DataSourceConfig dsc = new DataSourceConfig();
        dsc.setUrl("jdbc:mysql://localhost:3306/xuexi?serverTimezone=GMT%2B8&useSSL=false");
        dsc.setDriverName("com.mysql.cj.jdbc.Driver");
        dsc.setUsername("root");
        dsc.setPassword("123456");
        dsc.setDbType(DbType.MYSQL);
        mpg.setDataSource(dsc);
        // 4、包配置
        PackageConfig pc = new PackageConfig();
        pc.setParent("com.it");
        //pc.setModuleName("auth"); //模块名
        pc.setController("controller");
        pc.setService("service");
        pc.setMapper("mapper");
        mpg.setPackageInfo(pc);
        // 5、策略配置
        StrategyConfig strategy = new StrategyConfig();
        // 设置表名，可以设置多个，用逗号隔开
        strategy.setInclude("account");
        //数据库表映射到实体的命名策略
        strategy.setNaming(NamingStrategy.underline_to_camel);
        //数据库表字段映射到实体的命名策略
        strategy.setColumnNaming(NamingStrategy.underline_to_camel);
        // lombok 模型 @Accessors(chain = true) setter链式操作
        strategy.setEntityLombokModel(true);
        strategy.setRestControllerStyle(true); //restful api风格控制器
        strategy.setControllerMappingHyphenStyle(true); //url中驼峰转连字符
        mpg.setStrategy(strategy);
        // 6、执行
        mpg.execute();
    }
}
```

> 访问测试

```java
@RestController
@RequestMapping("/account")
public class AccountController {

    @Resource
    private AccountService accountService;

    @GetMapping("findAll")
    public R findAll() {
        return R.ok(accountService.list());
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305251106102.png" alt="image-20230525110631019" style="zoom:80%;" />

## 代码生成器新

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>3.5.1</version>
</dependency>
<dependency>
    <groupId>org.freemarker</groupId>
    <artifactId>freemarker</artifactId>
    <version>2.3.31</version>
</dependency>
```

```java
public class FastAutoGeneratorTest {

    public static void main(String[] args) {
        FastAutoGenerator.create("jdbc:mysql://127.0.0.1:3306/xuexi?characterEncoding=utf-8&userSSL=false", "root", "123456")
                .globalConfig(builder -> {
                    builder.author("renshuo") // 设置作者
                            //.enableSwagger() // 开启 swagger 模式
                            .fileOverride() // 覆盖已生成文件
                            .outputDir("D:\\SpringBoot新项目\\MybatisPlusDemo"+"/src/main/java");
                })
                .packageConfig(builder -> {
                    builder.parent("com.it") // 设置父包名
                            // 如果设置，最后就是com.it.my包下生成
                            //.moduleName("my")
                            // 设置mapperXml生成路径
                           .pathInfo(Collections.singletonMap(OutputFile.mapperXml, "D:\\SpringBoot新项目\\MybatisPlusDemo\\src\\main\\resources\\mapper")); 
                })
                .strategyConfig(builder -> {
                    builder.addInclude("account") // 设置需要生成的表名
                           .addTablePrefix("t_", "c_"); // 设置过滤表前缀
                })
                // 使用Freemarker引擎模板，默认的是Velocity引擎模板
                .templateEngine(new FreemarkerTemplateEngine()) 
                .execute();
    }
}
```

> 访问测试

```java
@RestController
@RequestMapping("/account")
public class AccountController {

    @Resource
    private IAccountService accountService;

    @GetMapping("findAll")
    public R findAll() {
        return R.ok(accountService.list());
    }
}
```

http://127.0.0.1:8083/account/findAll

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305251106102.png" style="zoom:80%;" />

## xml扫描问题

> 因为代码生成器生成的xml文件是在sec/java/..目录下的，因此无法检测到，需要在pom.xml中配置路径

```xml
<build>
    <finalName>${project.artifactId}</finalName>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
    <resources>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.yml</include>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>false</filtering>
        </resource>
        <resource>
            <directory>src/main/resources</directory>
            <includes>
                <include>**/*.yml</include>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
                <include>**/*.png</include>
            </includes>
            <filtering>false</filtering>
        </resource>
    </resources>
</build>
```





# 多数据源

## 引入坐标

坐标：https://mvnrepository.com/artifact/com.baomidou/dynamic-datasource-spring-boot-starter

mybatisPlus：[多数据源 | MyBatis-Plus (baomidou.com)](https://baomidou.com/pages/a61e1b/#文档-documentation)

版本同mybatisPlus地址

```xml
<dependency>
  <groupId>com.baomidou</groupId>
  <artifactId>dynamic-datasource-spring-boot-starter</artifactId>
  <version>3.5.1</version>
</dependency>
```

## 配置数据源

```yml
spring:
  datasource:
    dynamic:
      #设置默认的数据源或者数据源组,默认值即为master
      primary: master 
      #严格匹配数据源,默认false. true未匹配到指定数据源时抛异常,false使用默认数据源
      strict: false 
      datasource:
        master:
          driver-class-name: com.mysql.jdbc.Driver
          url: jdbc:mysql://localhost:3306/xuexi?serverTimezone=GMT%2B8
          username: root
          password: 123456
        slave1:
          driver-class-name: com.mysql.jdbc.Driver
          url: jdbc:mysql://localhost:3306/xue?serverTimezone=GMT%2B8
          username: root
          password: 123456
```

## 使用@DS切换数据源

> **@DS** 可以注解在方法上或类上，**同时存在就近原则 方法上注解优先于类上注解**。
>
> **一般都加在ServiceImpl上**

```java
@DS("slave1")
@Service
public class userServiceImpl extends ServiceImpl<userMapper, User>  implements userService{
}
```

```java
@DS("master")
@Service
public class AccountServiceImpl extends ServiceImpl<AccountMapper, Account> implements IAccountService {

}
```

## 进行测试

```java
@Autowired
private authorService authorService;

@Test
public void find() {
    System.out.println(authorService.getById(3));
}
```



# MybatisX

MybatisX 是一款基于 IDEA 的快速开发插件，为效率而生。

安装方法：打开 IDEA，进入 File -> Settings -> Plugins -> Browse Repositories，输入 mybatisx 搜索并安装。 

-  Java 与 XML 调回跳转 Mapper   
- 方法自动生成 XML

 Mapper接口写完方法后，有红色波浪线，点击，然后Generate Statement，即可在xml中生成对应的查询(没有SQL语句)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211026195546899.png" alt="image-20211026195546899" style="zoom:80%;" />

生成这样

```xml
<select id="findById" resultType="com.it.entity.category"></select>
```

只要在内部写对应的SQL语句即可

## 代码生成器

> **生成代码(需先在 idea 配置 Database 配置数据源)** 

![生成代码](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305251427752.gif)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220310142427927.png" alt="image-20220310142427927" style="zoom:67%;" />

![image-20220310143655253](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220310143655253.png)





## 生成增删改查

### 生成新增⭐

在Mapper层，输入insertSelective，**按alt+enter**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220310150111104.png" alt="image-20220310150111104" style="zoom:67%;" />

点击第一个，即可在mapper.xml中生成SQL

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220310150313701.png" alt="image-20220310150313701" style="zoom: 50%;" />

输入deleteByIdAndName,同样按alt+enter进行删除SQL的生成

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305251433117.gif" alt="生成新增" style="zoom:80%;" />

### 生成查询

<img src="https://www.baomidou.com/img/mybatisx-tip-select.gif" alt="生成查询" style="zoom:80%;" />

### 生成修改

<img src="https://www.baomidou.com/img/mybatisx-tip-update.gif" alt="生成修改" style="zoom:80%;" />

### 生成删除

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305251433412.gif" alt="生成删除" style="zoom:80%;" />

## 其他功能

### XML 跳转

![跳转](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305251431044.gif)

### 重置模板

![生成代码](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305251432777.gif)





# MybatisPlus企业级功能

这个是要收费的，现在只是使用试用版

https://gitee.com/baomidou/mybatis-mate-examples

当然还要引入MybatisPlus依赖

```xml
<dependency>
  <groupId>com.baomidou</groupId>
  <artifactId>mybatis-mate-starter</artifactId>
  <version>1.2.5</version>
</dependency>
```

## 字段对称加解密

### 语法简介

注解 @FieldEncrypt

|   属性    |   类型    | 必须指定 |      默认值      | 描述                 |
| :-------: | :-------: | :------: | :--------------: | -------------------- |
| password  |  String   |    否    |        ""        | 加密密码             |
| algorithm | Algorithm |    否    | PBEWithMD5AndDES | PBE MD5 DES 混合算法 |
| encryptor |   Class   |    否    |    IEncryptor    | 加密处理器           |

算法 Algorithm

|            算法             |                        描述                         |
| :-------------------------: | :-------------------------------------------------: |
|           MD5_32            |                   32 位 md5 算法                    |
|           MD5_16            |                   16 位 md5 算法                    |
|           BASE64            |          64 个字符来表示任意二进制数据算法          |
|             AES             |                    AES 对称算法                     |
|             RSA             |                   非对称加密算法                    |
|             SM2             |          国密 SM2 非对称加密算法，基于 ECC          |
|             SM3             |   国密 SM3 消息摘要算法，可以用 MD5 作为对比理解    |
|             SM4             | 国密 SM4 对称加密算法，无线局域网标准的分组数据算法 |
|      PBEWithMD5AndDES       |                      混合算法                       |
|   PBEWithMD5AndTripleDES    |                      混合算法                       |
| PBEWithHMACSHA512AndAES_256 |                      混合算法                       |
|    PBEWithSHA1AndDESede     |                      混合算法                       |
|    PBEWithSHA1AndRC2_40     |                      混合算法                       |

👉 [国密 SM2.3.4 算法使用规范(opens new window)](https://gitee.com/baomidou/mybatis-mate-examples/tree/master/国密SM2.3.4算法使用规范)

MD5 算法为不可逆算法，存储数据库及查询结果都是密文 SM4 算法必须依赖 bouncycastle 加密库 混合算法必须依赖 jasypt 加密库 【注意】查询返回加密对象必须包含`加密注解`信息，单纯的返回某个 String 或者 List 某个集合是无法解密的。

### AES对称加密

```yml
# Mybatis Mate 配置
mybatis-mate:
  # 授权信息，固定
  cert:
    # 请添加微信wx153666购买授权，不白嫖从我做起！ 测试证书会失效，请勿正式环境使用
    grant: thisIsTestLicense
    license: TtY9GC88CzSkEmUhzIyvM2MJKvsgPyxoNCExH4/GhaBwuTQ93aeLaR6/dM49wMSk+oQdmqUibCM8b5H74s1Nx+2C5V3U1gKiLtddVc8Eg8oC1F2nLxOiDKDvPpdxWFGsPW6mQE2LDr+tK8GXpFS3N8xwmYy/gHCwQ4Avqp9JqBbke7pZzL2adIlxYHmCYpfNTN+NRHIEFaGFTBlzZHDb3UfJaeqLaAtWBol0QOPEM69Kz3JSemxBHnEO1ID75bwwmkgqC7Ps4z9iYAK9GLzzaPwSiFELNCmIvwa5YSJLxP9NMQUWbVGIRqehxnVqfgx/68+yIfpByqGTMxLR33yeEQ==
  encryptor:
    # 对称算法密钥，随机字符串作为密钥即可（有些算法长度有要求16位，注意）
    password: qmh9MK4KsZY8FnqkJYk8tzgc0H
```

```java
@Data
public class user {
    private int id;
    private String name;

    @FieldEncrypt(algorithm = Algorithm.AES)
    private String password;
}
```

```java
@Mapper
public interface userMapper extends BaseMapper<user> {
}
```

```java
@Test
public void insert(){
    user u = new user();
    u.setName("张三");
    u.setPassword("315217");
    userMapper.insert(u);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208261829436.png" alt="image-20220826182949340" style="zoom:80%;" />

进行查询，发现已经进行了解密

```java
@Test
public void s1(){
    List<user> users = userMapper.selectList(null);
    users.forEach(System.out::println);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208261833736.png" alt="image-20220826183342654" style="zoom:80%;" />

### RSA非对称加密⭐

```java
@Test
@SneakyThrows
public void testGenKey() {
    Map<String, Key> keyMap = RSA.genKeyPair();
    String privateKey = RSA.getPrivateKey(keyMap);
    String publicKey = RSA.getPublicKey(keyMap);
    // 生成公钥和私钥
    System.out.println(privateKey);
    System.out.println(publicKey);
}
```

复制到application.yml中

```yml
# Mybatis Mate 配置
mybatis-mate:
  # 授权信息，固定
  cert:
    # 请添加微信wx153666购买授权，不白嫖从我做起！ 测试证书会失效，请勿正式环境使用
    grant: thisIsTestLicense
    license: TtY9GC88CzSkEmUhzIyvM2MJKvsgPyxoNCExH4/GhaBwuTQ93aeLaR6/dM49wMSk+oQdmqUibCM8b5H74s1Nx+2C5V3U1gKiLtddVc8Eg8oC1F2nLxOiDKDvPpdxWFGsPW6mQE2LDr+tK8GXpFS3N8xwmYy/gHCwQ4Avqp9JqBbke7pZzL2adIlxYHmCYpfNTN+NRHIEFaGFTBlzZHDb3UfJaeqLaAtWBol0QOPEM69Kz3JSemxBHnEO1ID75bwwmkgqC7Ps4z9iYAK9GLzzaPwSiFELNCmIvwa5YSJLxP9NMQUWbVGIRqehxnVqfgx/68+yIfpByqGTMxLR33yeEQ==
  encryptor:
    # 对称算法密钥，随机字符串作为密钥即可（有些算法长度有要求16位，注意）
    # password: qmh9MK4KsZY8FnqkJYk8tzgc0H
    # 非对称加密 RSA 公钥私钥(不用就不加)
    publicKey: 公钥
    privateKey: 私钥
```

```java
@Data
public class user {
    private int id;
    private String name;
    // 改成RSA即可，其他正常使用，和上面一样
    @FieldEncrypt(algorithm = Algorithm.RSA)
    private String password;
}
```



### 自定义加解密

```java
import mybatis.mate.annotation.Algorithm;
import mybatis.mate.encrypt.IEncryptor;

public class CustomIRncryptor implements IEncryptor {
    // 加密
    @Override
    public String encrypt(Algorithm algorithm, String password, 
                          String publicKey, String input, Object metaObj) {
        return input+"123";
    }
    // 解密
    @Override
    public String decrypt(Algorithm algorithm, String password, 
                          String publicKey, String out, Object metaObj) {
        return out.replaceAll("123","");
    }
}
```

```java
@Data
public class user {
    private int id;
    private String name;
    // 自定义加解密
    @FieldEncrypt(encryptor = CustomIRncryptor.class)
    private String password;
}
```

后面正常插入，数据库中对应密码就会多123



## 字段脱敏

- 注解 @FieldSensitive
- 注解 `FieldSensitive` 实现数据脱敏，内置 `手机号`、`邮箱`、`银行卡号` 等 9 种常用脱敏规则

### 正经用法

```java
@Bean
public ISensitiveStrategy sensitiveStrategy() {
    // 自定义 testStrategy 类型脱敏处理
    return new SensitiveStrategy();
}
```

```java
@Data
public class user {
    private int id;
    private String name;
    private String password;
    // 脱敏规则
    @FieldSensitive(SensitiveType.phone)
    private String phone;
}
```

```java
@GetMapping("findAll")
public List<user> findAll() {
    return userMapper.selectList(null);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208262318381.png" alt="image-20220826231805310" style="zoom:67%;" />

### 自定义脱敏

```java
@Bean
public ISensitiveStrategy sensitiveStrategy() {
    // 自定义 testStrategy 类型脱敏处理
    return new SensitiveStrategy().addStrategy("test", t -> t + "***test****");
}
```

```java
@Data
public class user {
    private int id;
    private String name;
    private String password;
    // 脱敏规则
    @FieldSensitive("test")
    private String phone;
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208262323451.png" alt="image-20220826232306382" style="zoom:80%;" />

## 多数据源分库分表（读写分离）

注解 @Sharding

|   属性   |  类型  | 必须指定 |         默认值         | 描述                         |
| :------: | :----: | :------: | :--------------------: | ---------------------------- |
|  value   | String |    是    |           ""           | 分库组名，空使用默认主数据源 |
| strategy | Class  |    否    | RandomShardingStrategy | 分库&分表策略                |

配置

```yml
mybatis-mate:
  sharding:
    health: true # 健康检测
    primary: mysql # 默认选择数据源
    datasource:
      mysql: # 数据库组
        - key: node1
          ...
        - key: node2
          cluster: slave # 从库读写分离时候负责 sql 查询操作，主库 master 默认可以不写
          ...
      postgres:
        - key: node1 # 数据节点
          ...
```

- 注解 `Sharding` 切换数据源，组内节点默认随机选择（查从写主）

```java
@Mapper
@Sharding("mysql")
public interface UserMapper extends BaseMapper<User> {

    @Sharding("postgres")
    Long selectByUsername(String username);

}
```

- 切换指定数据库节点

```java
// 切换到 mysql 从库 node2 节点
ShardingKey.change("mysqlnode2");
```



## 数据敏感词过滤

- 数据敏感词过滤（AC 算法）配置完处理器，框架自动处理请求的所有字符串敏感词过滤，支持嵌套关键词让敏感词无处遁形。
- 数据库自维护敏感词库（免费、可控），默认加载缓存词根支持指定重新加载词库。



## 字段数据绑定（字典回写）

- 注解 @FieldBind

|   属性   |  类型  | 必须指定 | 默认值 | 描述                                               |
| :------: | :----: | :------: | :----: | -------------------------------------------------- |
| sharding | String |    否    |   ""   | 分库分表数据源指定                                 |
|   type   | String |    是    |        | 类型（用于区分不同业务）                           |
|  target  | String |    是    |        | 目标显示属性（待绑定属性，注意非数据库字段请排除） |

- 数据库 `sex` 值 `0`、`1` 自动映射为 `男`、`女`
- 可以绑定映射为对象，例如：根据订单 ID 映射 订单对象或者编号

```java
@FieldBind(type = "user_sex", target = "sexText")
private Integer sex;
// 绑定显示属性，非表字典（排除）
@TableField(exist = false)
private String sexText;
```

- 绑定业务处理类需要实现 IDataBind 接口，注入 spring 容器

```java
@Component
public class DataBind implements IDataBind {
  ...
}
```



