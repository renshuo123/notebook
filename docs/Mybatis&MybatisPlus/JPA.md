

# 常用注解

## 基本注解

### @Entity

> 标注于实体类声明语句之前，指出该 Java 类为实体类，将映射到指定的数据库表。name(可选)：实体名称。 缺省为实体类的非限定名称。该名称用于引用查询中的实体。不与 @Table 结合时，表名默认为类名的 SnakeCase（蛇形命名法），若使用name属性，则表名为 name 值。

```java
//以下三个类皆映射表名 student_info 
@Entity  
public class StudentInfo{...}

@Entity(name="student_info")  
public class StudentInfo{...}

@Entity
@Table(name = 'student_info')
public class StudentInfo{...}
```

### @Table

> 当实体类与其映射的数据库表名不同名时需要使用@Table标注说明，该标注与@Entity标注并列使用，置于实体类声明语句之前。name：用于指明数据库的表名。catalog、schema：用于设置表所属的数据库目录或模式，通常为数据库名。Mysql不支持catalog，schema是数据库名。一般不需要设置。uniqueConstraints：用来批量命名唯一键,其作用等同于多个：@Column(unique = true)，一般不需要设置。

```java
@Entity
@Table(name = "student_info", uniqueConstraints = {@UniqueConstraint(columnNames = "class_id")})
public class StudentInfo {
    @Column(name = "class_id")
    private String classId;
}
```

### @Basic(未加注解的默认注解)

表示一个简单的属性到数据库表的字段的映射,对于没有任何注解的属性，默认即为 @Basic 。

> - fetch: 表示该属性的读取策略，其中 EAGER （默认）表示立即加载，LAZY 表示延迟加载。
> - optional：表示该属性是否允许为 null ，默认为 true 。

### @Transient

> - 表示该属性并非一个到数据库表的字段的映射，ORM 框架将忽略该属性。
> - 如果一个属性并非数据库表的字段映射，就务必将其标示为@Transient，否则，ORM框架默认其注解为@Basic

### @Column

> 当实体的属性与其映射的数据库表的列不同名时需要使用@Column 标注说明，该注解通常置于实体的属性前或属性的getter方法之前，还可与 @Id 标注一起使用。

> - name：用于设置映射数据库表的列名。
> - unique：是否是唯一标识，默认为 false(不唯一)
> - nullable：否允许为 null，默认为true(null)
> - insertable：表示在 ORM 框架执行插入操作时，该字段是否应出现 INSERT 语句中，默认为true
> - updatable：表示在 ORM 框架执行更新操作时，该字段是否应该出现在 UPDATE 语句中，默认为 true。对于一经创建就不可以更改的字段，该属性非常有用，如对于birthday字段。或者创建时间/注册时间(可以将其设置为 false 不可修改)。
> - length：数据长度，仅对String类型的字段有效，默认值255
> - precision、scale：表示精度，当字段类型为double时，precision表示数值的总长度，scale表示小数点所占的位数，默认值均为0。
> - columnDefinition：表示该字段在数据库中的实际类型。通常ORM框架可以根据属性类型自动判断数据库中字段的类型，但是如果要将 String 类型映射到特定数据库的 BLOB 或 TEXT 字段类型，该属性非常有用。

### @Id

> 用于声明一个实体类的属性映射为数据库的主键列。

### @GeneratedValue

- JPA通用策略生成器，通过 strategy 属性指定。

- 定义了以下几种可供选择的策略：

  > - AUTO：JPA 自动选择合适的策略，是默认选项；
  > - IDENTITY：采用数据库 ID自增长的方式来自增主键字段，Oracle 不支持这种方式；
  > - SEQUENCE：通过序列产生主键，通过 @SequenceGenerator 注解指定序列名，MySql 不支持这种方式
  > - TABLE：通过表产生主键，框架借由表模拟序列产生主键，使用该策略可以使应用更易于数据库移植。该策略一般与另外一个注解一起使用@TableGenerator。

- 默认情况下，JPA 自动选择一个最适合底层数据库的主键生成策略：SqlServer 对应 IDENTITY，MySQL 对应 AUTO。

- generator：使用指定的主键生成器时，这里设置为生成器名称。

### @GenericGenerator

自定义主键生成策略

- name：生成器名称
- strategy：预定义的 Hibernate 策略或完全限定的类名。

```java
@Data
@Entity
@Table(name = "student_info")
public class StudentInfo {
    @Id
    @Column(name = "id")
    @GenericGenerator(name="idGenerator", strategy="uuid")
    @GeneratedValue(generator = "idGenerator")
    private String id;

    @Transient
    private String age;

    @Column(name = "name")
    private String name;
}
```

## 其他注解

### @Enumerated

直接映射枚举类型的字段。

- value：

- - ORDINAL：映射到数据库字段为数字（默认）
  - String：映射到数据库字段为字符串

```java
@Entity
@Data
@Table(name = "StudentInfo")
public class Student {
    @Column
    @Enumerated
    private Sex sex;
}
```

### @Temporal

对于日期时间属性映射时，可使用 @Temporal 注解来调整精度。

- DATE：日期
- TIME：时间
- TIMESTAMP：日期时间

```java
@Data
@Entity
@Table(name = "student_info")
public class Student {
    @Column
    @Temporal(TemporalType.DATE)
    private Date birthday;
}
```

### @DynamicInsert、@DynamicUpdate

> @DynamicInsert：设置为true，表示insert对象的时候，生成动态的insert语句，如果这个字段的值是null就不会加入到insert语句中。
>
> @DynamicUpdate：设置为true，表示update对象的时候，生成动态的update语句，如果这个字段的值是null就不会被加入到update语句中。

```java
@Data
@Entity
@Table(name = "user_info")
@DynamicInsert
@DynamicUpdate
public class User {
    @Id
    @Column(name = "id")
    @GenericGenerator(name="idGenerator", strategy="uuid")
    @GeneratedValue(generator = "idGenerator")
    private String id;

    @Column(name = "name")
    private String name;

    @Basic
    private Integer age;

    @Column(name = "create_time")
    private Long createTime;

    @Column(name = "remark")
    private String remark;
}
```

### @Access

指定实体的访问模式(Access mode)，包括AccessType.FIELD及AccessType.PROPERTY。

> AccessType.FIELD: 字段访问（@Column注解在属性上），通过字段来获取或设置实体的状态,getter和setter方法可能存在或不存在。这样JPA默认的访问类型为AccessType.FIELD。

> AccessType.PROPERTY: 属性访问（@Column注解在get方法上），持久化属性必须有getter和setter方法,属性的类型由getter方法的返回类型决定,同时必须与传递到setter方法的单个参数的类型相同。这样JPA默认的访问类型为AccessType.PROPERTY。

## 复合主键

### @EmbeddedId + @Embeddable

> 当需要多个属性作为复合主键时，可以把该属性做为一个内部类嵌套在实体类中，使用@EmbeddedId + @Embeddable实现：

> @EmbeddedId：复合主键

- @Embeddable：注释Java类的，表示类是嵌入类：

- - 必须要实现Serializable接口
  - 需要有无参的构造函数

```java
// 复合主键类
@Data
@Embeddable
public static class StudentId implements Serializable {

    @Column(name = "id")
    private Integer id;

    @Column(name = "class_id")
    private Integer classId;
}

//实体类
@Data
@Entity
@Table(name = "student_info")
public class StudentInfo {

    @EmbeddedId
    private StudentId studentId;

    @Column(name = "name")
    private String name;

}
```

### @IdClass

注解复合主键的类,复合主键类必须满足：

> - 实现Serializable接口;
> - 有默认的public无参数的构造方法;
> - 重写equals和hashCode方法。

```java
// 复合主键类
@Data
@Embeddable
public static class StudentId implements Serializable {

    @Column(name = "id")
    private Integer id;

    @Column(name = "class_id")
    private Integer classId;
}

//实体类
@Data
@Entity
@IdClass(StudentId.class)
@Table(name = "student_info")
public class StudentInfo {

    @EmbeddedId
    private StudentId studentId;

    @Column(name = "name")
    private String name;

}
```

### @Embedded + @AttributeOverride

- @Embedded：注释属性的，表示该属性的类是嵌入类。
- @AttributeOverrides：里面只包含了@AttributeOverride类型数组。
- @AttributeOverride：包含要覆盖的@Embeddable类中字段名name和新增的@Column字段的属性。

```java
// 复合主键类
@Data
@Embeddable
public static class StudentId implements Serializable {
    private Integer id;
    private Integer classId;
}

@Data
@Entity
@Table(name = "student_info")
public class StudentInfo {

    @Embedded
    @AttributeOverrides( {
            @AttributeOverride(name = "id", column = @Column(name = "id")),
            @AttributeOverride(name = "classId", column = @Column(name = "class_id")) 
            })
    private StudentId id;

    @Column(name = "name")
    private String name;

}
```

## 实体间关联关系

### @OneToOne

实体间一对一的关系。

- fetch：立即加载和延迟加载

- cascade：当前类对象操作了之后，级联对象的操作。

- - REMOVE：级联删除操作。删除当前实体时，与它有映射关系的实体也会跟着被删除。
  - MERGE：级联更新（合并）操作。当前对象中的数据改变，会相应地更新级联对象中的数据。
  - DETACH：级联脱管/游离操作。如果要删除一个实体，但是它有外键无法删除，你就需要这个级联权限了。它会撤销所有相关的外键关联。
  - REFRESH：级联刷新操作。更新数据前先刷新对象和级联对象，再更新。
  - PERSIST：级联持久化（保存）操作。持久保存拥有方实体时，也会持久保存该实体的所有相关数据。
  - ALL，当前类增删改查改变之后，关联类跟着增删改查，拥有以上所有级联操作权

- mappedBy：拥有关联关系的域，如果关系是单向的就不需要，双向关系表，那么拥有关系的这一方有建立、解除和更新与另一方关系的能力，而另一方没有，只能被动管理，这 个属性被定义在关系的被拥有方。

- orphanRemoval：如果设置为true，当关系被断开时，多方实体将被删除。否则会将对象的引用置为null。

- targetEntity：表示该属性关联的实体类型。该属性通常不必指定，ORM 框架根据属性类型自动判断。

一对一关系的例子

people 表（id，name，sex，birthday，address_id） address 表（id，phone，zipcode，address）

People和Address是一对一的关系。

**方式一：通过外键的方式(一个实体通过外键关联到另一个实体的主键)**

@JoinColum：保存表与表之间关系的字段，它要标注在实体属性上。一般修饰在主控方，用来定义一对一，一对多等关系列。

关联的实体的主键一般是用来做外键的。但如果此时不想主键作为外键，则需要设置referencedColumnName属性。

```java
@Entity
public class People {
 
    @Id
    @Column(name = "id")
    @GenericGenerator(name = "idGenerator", strategy = "uuid")
    @GeneratedValue(generator = "idGenerator")
    private String id;
 
    @Column(name = "name")
    private String name;//姓名
 
    @Column(name = "sex")
    private String sex;//性别
 
    @Column(name = "birthday")
    private Date birthday;//出生日期
 
    @OneToOne(cascade=CascadeType.ALL)//People是关系的维护端，当删除 people，会级联删除 address
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;//地址
 
}

@Entity
public class Address {
    @Id
    @Column(name = "id")
    @GenericGenerator(name = "idGenerator", strategy = "uuid")
    @GeneratedValue(generator = "idGenerator")
    private String id;
 
    @Column(name = "phone")
    private String phone;//手机
 
    @Column(name = "zipcode")
    private String zipcode;//邮政编码
 
    @Column(name = "address")
    private String address;//地址
}
```

**方式二：通过关联表的方式来保存一对一的关系。**

关联表：people_address (people_id，address_id)

@JoinTable：用于构建一对多，多对多时的连接表，默认会以主控表加下划线加反转表为表名。

- JoinColumns：该属性值可接受多个@JoinColumn，用于配置连接表中外键列的信息，这些外键列参照当前实体对应表的主键列。
- inverseJoinColumns：该属性值可接受多个@JoinColumn，用于配置连接表中外键列的信息，这些外键列参照当前实体的关联实体对应表的主键列。

```java
@Entity
public class People {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;//id
 
    @Column(name = "name")
    private String name;//姓名
 
    @Column(name = "sex")
    private String sex;//性别
 
    @Column(name = "birthday")
    private Timestamp birthday;//出生日期
 
    @OneToOne(cascade=CascadeType.ALL)//People是关系的维护端
    @JoinTable(name = "people_address",
            joinColumns = @JoinColumn(name="people_id"),
            inverseJoinColumns = @JoinColumn(name = "address_id"))
    private Address address;//地址
 
}

@Entity
public class Address {
    @Id
    @Column(name = "id")
    @GenericGenerator(name = "idGenerator", strategy = "uuid")
    @GeneratedValue(generator = "idGenerator")
    private String id;
 
    @Column(name = "phone")
    private String phone;//手机
 
    @Column(name = "zipcode")
    private String zipcode;//邮政编码
 
    @Column(name = "address")
    private String address;//地址
}
```

### @OneToMany和@ManyToOne

注解一对多和多对一关系。

> - JPA使用@OneToMany和@ManyToOne来标识一对多的双向关联。一端(One)使用@OneToMany，多端(Many)使用@ManyToOne。
> - 在JPA规范中，一对多的双向关系由多端(Many)来维护。就是说多端(Many)为关系维护端，负责关系的增删改查。一端(One)则为关系被维护端，不能维护关系。
> - 一端(One)使用@OneToMany注释的mappedBy属性表明是关系被维护端。
> - 多端(Many)使用@ManyToOne和@JoinColumn来注释属性，@ManyToOne表明是多端，@JoinColumn设置在表中的关联字段(外键)。

**例子**

- 文章表 article (id，title，content，author_id)
- 作者表 author (id，name)

```java
@Entity
public class Author {
 
    @Id
    @Column(name = "id")
    @GenericGenerator(name = "idGenerator", strategy = "uuid")
    @GeneratedValue(generator = "idGenerator")
    private String id;
 
    @Column
    private String name;//姓名
 
    //级联保存、更新、删除、刷新;延迟加载。当删除用户，会级联删除该用户的所有文章
    //拥有mappedBy注解的实体类为关系被维护端
    //mappedBy="author"中的author是Article中的author属性
    @OneToMany(mappedBy = "author",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    private List<Article> articleList;//文章列表
}
 
@Entity
public class Article {
 
    @Id
    @Column(name = "id")
    @GenericGenerator(name = "idGenerator", strategy = "uuid")
    @GeneratedValue(generator = "idGenerator")
    private String id;
 
    @Column
    private String title;
 
    @Lob  // 大对象，映射 MySQL 的 Long Text 类型
    @Basic(fetch = FetchType.LAZY) // 懒加载
    @Column(nullable = false) 
    private String content;//文章全文内容
 
    //可选属性optional=false,表示author不能为空。删除文章，不影响用户
    @ManyToOne(cascade={CascadeType.MERGE,CascadeType.REFRESH},optional=false)
    //设置在article表中的关联字段(外键)
    @JoinColumn(name="author_id")
    private Author author;//所属作者
 
}
```

### @ManyToMany

注解多对多的关系。角色和权限是多对多的关系。一个角色可以有多个权限，一个权限也可以被很多角色拥有。

> JPA中使用@ManyToMany来注解多对多的关系，由一个关联表来维护。这个关联表的表名默认是：主表名+下划线+从表名。这个关联表只有两个外键字段，分别指向主表ID和从表ID。字段的名称默认为：主表名+下划线+主表中的主键列名，从表名+下划线+从表中的主键列名。

**例子**

> - 权限表 user_permission(id，permission_name)
> - 角色表 user_role(id，department_id, create_time, description, name, update_time)
> - 关联表 user_role_permission 表(role_id, permission_id)

**注意**

> - 多对多关系中一般不设置级联保存、级联删除、级联更新等操作。
> - 本例中，由于加了@JoinTable注解，关联关系表会按照注解指定的生成。否则去掉注解，指定Role为关系维护端，所以生成的关联表名称为：user_role_permission，关联表的字段为：role_id 和permission_id。

```java
@Data
@Entity
@Table(name = "user_permission")
public class Permission implements Comparable<Permission> {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "permission_name")
    private String permissionName;

    @ManyToMany(mappedBy="permissions")
    private Set<Role> roles;

}

@Data
@Entity
@Table(name = "user_role")
public class Role {

    @Id
    @Column(name = "id")
    @GenericGenerator(name = "idGenerator", strategy = "uuid")
    @GeneratedValue(generator = "idGenerator")
    private String id;

    @Column(name = "create_time")
    private Long createTime;

    @Column(name = "update_time")
    private Long updateTime;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "department_id")
    private String departmentId;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "user_role_permission", joinColumns = {@JoinColumn(name = "role_id")},
            inverseJoinColumns = {@JoinColumn(name = "permission_id")})
    private List<Permission> permissions;

}
```







