
其实spring支持9种表达式，`execution`只是其中一种。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207221551516.png" alt="image-20220722155108406" style="zoom:50%;" />

## AOP 开发明确的事项

- aop：面向切面编程

- aop底层实现：基于JDK的动态代理 和 基于Cglib的动态代理

- aop的重点概念：

  ```c
  Pointcut（切入点）：被增强的方法
  
  Advice（通知/ 增强）：封装增强业务逻辑的方法
  
  Aspect（切面）：切点+通知
  
  Weaving（织入）：将切点与通知结合的过程
  ```

  开发明确事项：

  ```c
  谁是切点（切点表达式配置）
  
  谁是通知（切面类中的增强方法）
  
  将切点和通知进行织入配置
  ```



## 注解通知的类型

### 详解

- JoinPoint：适用于前置、后置、返回后、抛出异常后通知
- ProceedingJoinPoint：适用于环绕通知

通知的配置语法：@通知注解(“切点表达式")

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211002184540992.png" alt="image-20211002184540992" style="zoom:80%;" />

为了更好的理解这几种通知类型，我们来看一张图

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206031300916.png" alt="1630166147697" style="zoom:80%;" />

(1)前置通知，`追加功能到方法执行前`,类似于在代码1或者代码2添加内容

(2)后置通知,`追加功能到方法执行后`,`不管方法执行的过程中有没有抛出异常都会执行`，类似于在代码5添加内容

(3)返回后通知,`追加功能到方法执行后，只有方法正常执行结束后才进行`,类似于在代码3添加内容，如果方法执行抛出异常，返回后通知将不会被添加

(4)抛出异常后通知,`追加功能到方法抛出异常后，只有方法执行出异常才进行`,类似于在代码4添加内容，只有方法抛出异常后才会被添加

(5)环绕通知,`环绕通知功能比较强大，它可以追加功能到方法执行的前后，这也是比较常用的方式，它可以实现其他四种通知类型的功能`。

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Time {
}
```

### 环绕通知(重点)

环绕通知注意事项

1. 环绕通知必须依赖形参`ProceedingJoinPoint`才能实现对原始方法的调用，进而实现原始方法调用前后同时添加通知
2. 通知中如果未使用ProceedingJoinPoint对原始方法进行调用将跳过原始方法的执行
3. `对原始方法的调用可以不接收返回值，通知方法设置成void即可，如果接收返回值，最好设定为Object类型`
4. 原始方法的返回值如果是void类型，`通知方法的返回值类型可以设置成void,也可以设置成Object`
5. 由于无法预知原始方法运行后是否会抛出异常，`因此环绕通知方法必须要处理Throwable异常`

注意：`环绕通知返回值会取代最后方法返回值，因此可以对最后方法进行增强`

```java
@Around("@annotation(com.it.aop.Time)")
public Object methodExporter(ProceedingJoinPoint joinPoint) throws Throwable {
    log.info("前置增强");
    //调用目标方法
    Object proceed = joinPoint.proceed();
    log.info("后置增强");
    //返回结果,这个结果会传递给被代理对象的方法，会取代原来结果，如果不改就是原样
    //如果修改返回结果，要和原来返回结果相同
    return proceed;
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206031541104.png" alt="image-20220603154146051" style="zoom:80%;" />

### 前置通知

该通知在方法执行之前执行，只需在公共方法上加@Before注解，就能定义前置通知：

```java
@Before("pointcut()")
public void beforeLog(JoinPoint joinPoint) {
    System.out.println("打印请求日志");
}
```

### 后置通知

该通知在方法执行之后执行，只需在公共方法上加@After注解，就能定义后置通知：

```java
@After("pointcut()")
public void afterLog(JoinPoint joinPoint) {
    System.out.println("打印响应日志");
}
```

#### 结果通知(了解)

该通知在方法结束后执行，能够获取方法返回结果，只需在公共方法上加@AfterReturning注解，就能定义结果通知：

```java
@AfterReturning(pointcut = "@annotation(com.it.aop.Time)", returning = "result")
public void afterReturning(Object result) throws Exception {
    //获取@Around返回参数
    ObjectMapper mapper = new ObjectMapper();
    System.out.println("业务层接口返回结果: " + mapper.writeValueAsString(result));
    log.info("业务层接口返回结果: {}", result);
}
```

### 异常通知

该通知在方法抛出异常之后执行，只需在公共方法上加@AfterThrowing注解，就能定义异常通知：

```java
@AfterThrowing(pointcut = "pointcut()", throwing = "e")
public void afterThrowing(JoinPoint joinPoint, Throwable e) {
    System.out.println("异常："+e);
}
```

## JoinPoint(获取参数)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207221555445.png" alt="image-20220722155505362" style="zoom:50%;" />

### 获取正常参数

```java
import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Time {
}
```

```java
@Around("@annotation(com.it.aop.Time)")
public Object methodExporter(ProceedingJoinPoint joinPoint) throws Throwable {
    // 获取返回结果
    Object proceed = joinPoint.proceed();
    // 获取传入参数
    Object[] args = joinPoint.getArgs();
    // 获取类名
    String name = joinPoint.getSignature().getDeclaringTypeName();
    // 获取方法名
    String methodName = joinPoint.getSignature().getName();
    // 获取方法参数类型和方法名(详细版本)
    Signature signature = joinPoint.getSignature();

    log.info("传入参数：{}", Arrays.toString(args));
    log.info("返回结果：{}", proceed);
    log.info("方法名：{}.{}", name, methodName);
    log.info("详细版方法名：{}", signature);
    return proceed;
}
```

测试

```java
//在这里直接把注解写在方法上即可
@Time
@GetMapping("list1")
public Map<String, String> list(String name, String age) {
    Map<String, String> result = new LinkedHashMap<>();
    result.put("name",name);
    result.put("age",age);
    return result;
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206031703217.png" alt="image-20220603170348168" style="zoom:80%;" />

### 获取注解内部参数

如果要获取注解内部的值，主要修改

新增aop注解

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

加上参数

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Time {
    // 描述内容
    String description() default "";
}
```

切面中获取

```java
log.info("注解内部值     : {}", ((MethodSignature) joinPoint.getSignature())
        .getMethod().getAnnotation(Time.class).description());
```

传入参数

```java
//在这里直接把注解写在方法上即可
@Time(description = "这是list方法")
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206031706366.png" alt="image-20220603170611323" style="zoom:80%;" />



## 基于注解的 AOP 开发

### 依赖

```xml
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
</dependency>
```

### AOP通知获取参数和返回值

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

//作用在方法上
@Target(ElementType.METHOD)
//@Retention作用是被它定义的注解要保留多久，RunTime运行时
@Retention(RetentionPolicy.RUNTIME)
//接口+@，表示说明注解
public @interface Time {
}
```

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import java.util.Date;

//关键代码1：说明当前对象是一个切面
@Aspect
//关键代码2：允许Spring IOC对当前对象实例化并管理
@Component
@Slf4j
public class TimeAspect {

    //@Around环绕通知，最强大的通知类型，可以控制方法的入参、执行、返回结果等各方面细节
    //这里写的是接口路径
    @Around("@annotation(com.it.aop.Time)")
    public Object methodExporter(ProceedingJoinPoint joinPoint) throws Throwable {

        ObjectMapper mapper = new ObjectMapper();
        // 获取参数
        String jsonParam = mapper.writeValueAsString(joinPoint.getArgs());
        //计算方法执行时间
        long st = new Date().getTime();
        //获取方法返回值
        Object proceed = joinPoint.proceed();
        long et = new Date().getTime();

        //将返回结果json序列化
        String jsonResult = null;
        if (proceed != null) {
            jsonResult = mapper.writeValueAsString(proceed);
        }else {
            // 异常处理
            throw new RuntimeException("返回值为空");
        }
        //模拟上报服务器过程
        log.info("正在上报服务器：\ntarget:{}.{}\nexecution:{}ms,\nparameter:{}\nresult:{}"
                ,joinPoint.getTarget().getClass().getSimpleName()
                ,joinPoint.getSignature().getName()
                ,(et-st)
                ,jsonParam
                ,jsonResult);
        return proceed;
    }
}
```

```java
//在这里直接把注解写在方法上即可
@Time
@GetMapping("list")
public Map<String, String> list(int page, int rows) {
    Map<String, String> result = new LinkedHashMap<>();
    result.put("code","0");
    result.put("message","success");
    //休眠测试用
    try {
        Thread.sleep(new Random().nextInt(1000));
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    return result;
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206031249891.png" alt="image-20220603124944832" style="zoom:80%;" />



## 获取方法入参和时间示例

```xml
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
</dependency>
```

### 设置注解

```java
//作用在方法上
@Target(ElementType.METHOD)
//@Retention作用是被它定义的注解要保留多久，RunTime运行时
@Retention(RetentionPolicy.RUNTIME)
//接口+@，表示说明注解
public @interface Time {
}
```

### 设置切面

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import java.util.Date;

//关键代码1：说明当前对象是一个切面
@Aspect
//关键代码2：允许Spring IOC对当前对象实例化并管理
@Component
@Slf4j
public class TimeAspect {
    //关键代码3：说明切面的作用范围，任何增加@MethodExporter的目标方法都将在执行方法前执行该切面方法
    //@Around环绕通知，最强大的通知类型，可以控制方法的入参、执行、返回结果等各方面细节
    //这里写的是接口路径
    @Around("@annotation(com.it.aop.Time)")
    public Object methodExporter(ProceedingJoinPoint joinPoint) throws Throwable {
        //计算方法执行时间
        long st = new Date().getTime();
        //执行目标方法，获取方法返回值
        Object proceed = joinPoint.proceed();
        long et = new Date().getTime();
        //这里用于封装结果json
        ObjectMapper mapper = new ObjectMapper();
        //获取执行方法的参数getArgs
        String jsonParam = mapper.writeValueAsString(joinPoint.getArgs());
        //将返回结果json序列化
        String jsonResult = null;
        if (proceed != null) {
            jsonResult = mapper.writeValueAsString(proceed);
        }else {
            jsonResult = "null";
        }
        //模拟上报服务器过程
        log.info("正在上报服务器：\ntarget:{}.{}\nexecution:{}ms,\nparameter:{}\nresult:{}"
                ,joinPoint.getTarget().getClass().getSimpleName()
                ,joinPoint.getSignature().getName()
                ,(et-st)
                ,jsonParam
                ,jsonResult);
        return proceed;
    }
}
```

### 测试使用

```java
//在这里直接把注解写在方法上即可
@Time
@GetMapping("list")
public Map<String, String> list(int page, int rows) {
    Map<String, String> result = new LinkedHashMap<>();
    result.put("code","0");
    result.put("message","success");
    //休眠测试用
    try {
        Thread.sleep(new Random().nextInt(1000));
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    return result;
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206031200567.png" alt="image-20220603120036507" style="zoom:80%;" />



## 修改传入参数示例

将传入的参数去掉前后空格

### 设置注解

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

//作用在方法上
@Target(ElementType.METHOD)
//@Retention作用是被它定义的注解要保留多久，RunTime运行时
@Retention(RetentionPolicy.RUNTIME)
//接口+@，表示说明注解
public @interface TrimStr {
}
```

### 设置切面

```java
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

//关键代码1：说明当前对象是一个切面
@Aspect
//关键代码2：允许Spring IOC对当前对象实例化并管理
@Component
@Slf4j
public class TrimStrAspect {
    //关键代码3：说明切面的作用范围，任何增加@MethodExporter的目标方法都将在执行方法前执行该切面方法
    //@Around环绕通知，最强大的通知类型，可以控制方法的入参、执行、返回结果等各方面细节
    //这里写的是接口路径
    @Around("@annotation(com.it.aop.TrimStr)")
    public Object methodExporter(ProceedingJoinPoint pjp) throws Throwable {
        //获取原始方法的参数
        Object[] args = pjp.getArgs();
        for (int i = 0; i < args.length; i++) {
            //判断参数是不是字符串
            if(args[i].getClass().equals(String.class)){
                args[i] = args[i].toString().trim();
            }
        }
        //将修改后的参数传入到原始方法z的执行中，注意：一定要传入args，不然不生效
        //也就是执行时传入修改过的参数
        return pjp.proceed(args);
    }
}
```

### 测试使用

```java
//在这里直接把注解写在方法上即可
@TrimStr
@GetMapping("list1")
public Map<String, String> list(String name, String age) {
    Map<String, String> result = new LinkedHashMap<>();
    result.put("name",name);
    result.put("age",age);
    return result;
}
```



## AOP记录日志示例

### 注解示例

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface Log {
    // 加入方法描述
    String description() default "";
}
```

### 切面配置

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import javax.servlet.http.HttpServletRequest;

@Aspect
@Component
@Slf4j
public class LogAspect {

    // 以自定义 @WebLog 注解为切点
    @Pointcut("@annotation(com.it.aop.Log)")
    // 注解的无参构造
    public void Log() {}

    // 在切点之前织入
    @Before("Log()")
    public void doBefore(JoinPoint joinPoint) throws Throwable {
        // 开始打印请求日志
        ServletRequestAttributes attributes = (ServletRequestAttributes)
                RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        // 打印请求相关参数
        log.info("=============== Start ============");
        // 打印请求 url
        log.info("URL            : {}", request.getRequestURL().toString());
        // 打印 Http method
        log.info("HTTP Method    : {}", request.getMethod());
        // 打印调用 controller 的全路径以及执行方法
        log.info("Class Method   : {}.{}",
                joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName());
        // 打印请求的 IP
        log.info("IP             : {}", request.getRemoteAddr());
        // 打印请求入参
        log.info("Request Args   : {}",
                new ObjectMapper().writeValueAsString(joinPoint.getArgs()));
        // 打印注解内部的值
        log.info("Annotation     : {}", ((MethodSignature) joinPoint.getSignature())
                .getMethod().getAnnotation(Log.class).description());
    }

    // 在切点之后织入
    @After("Log()")
    public void doAfter() throws Throwable {
        // 结束后打个分隔线，方便查看
        log.info("=========== End ================");
    }

    // 环绕
    @Around("Log()")
    public Object doAround(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        //开始时间
        long startTime = System.currentTimeMillis();
        Object result = proceedingJoinPoint.proceed();
        // 打印出参
        log.info("Response Args  : {}", new ObjectMapper().writeValueAsString(result));
        // 执行耗时
        log.info("Time-Consuming : {} ms", System.currentTimeMillis() - startTime);
        return result;
    }
}
```

### 测试示例

```java
@GetMapping("hello")
@Log(description = "这是描述方法")
public String hello(String name){
    return "Hello "+name;
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206031406949.png" alt="image-20220603140656895" style="zoom:80%;" />



# Spring事务

## Spring事务简介

### 事务的特性

事务（Transaction)是由一系列对系统中数据进行访问与更新的操作所组成的一个程序 执行逻辑单元（Unit)。事务具有四个特征，分别是原子性（Atomicity )、一致性（Consistency )、隔离性（Isolation) 和持久性（Durability),简称为事务的ACID特性。

- 原子性（Atomicity）：原子性是指事务是一个不可分割的工作单位，事务中的操作要么都发生，要么都不发生。
- 一致性（Consistency）：事务执行前后数据的完整性必须保持一致。比如在转账事务操作中，事务执行前后金额的总数应保持不变。
- 隔离性（Isolation）：事务的隔离性是多个用户并发访问数据库时，数据库为每一个用户开启的事务，不能被其他事务的操作数据所干扰，多个并发事务之间要相互隔离。
- 持久性（Durability）：持久性是指一个事务一旦被提交，它对数据库中数据的改变就是永久性的，接下来即使数据库发生故障也不应该对其有任何影响。

### 事务并发的问题

1.丢失修改（丢失更新）：两个事务T1和T2读入同一数据并修改，T2的提交结果破坏了T1提交的结果，导致T1的修改被丢失。

 2.不可重复读：事务T1读取某一数据后，事务T2对其做了修改，当事务T1再次读该数据时，得到与前一次不同的值。

3.幻读：事务T1按一定条件从数据库中读取了某些数据记录后，事务T2删除了其中部分记录，当T1再次按相同条件读取数据时，发现某些记录消失了；或者说事务T2插入了部分新记录，当T1再次按相同条件读取数据时，发现多出来了部分数据。

注意：幻读和不可重复读的主要区别在于：

- 幻读针对的是查询结果为多个的场景，出现了数据的增加 or 减少

- 不可重复度读对的是某些特定的记录，这些记录的数据与之前不一致

4.读“脏”数据：事务T1修改某一数据后，事务T2读取同一数据，然后T1由于某种原因操作被撤销（回滚），这时T1已修改过的数据恢复原值，T2读到的数据就与数据库中的真实数据不一致，这时T2读到的数据就为“脏”数据，即不正确的数据。

### 相关概念介绍

- 事务作用：`在数据层保障一系列的数据库操作同成功同失败`
- Spring事务作用：在数据层或**==业务层==**保障一系列的数据库操作同成功同失败

数据层有事务我们可以理解，为什么业务层也需要处理事务呢?

注意：

> mysql默认隔离级别：可重复读 。在这种隔离级别下，所有事务前后多次的读取到的数据内容是不变的。也就是某个事务（在SpringBoot中表现为加了@Transactional注解的方法为一个事务整体）在执行的过程中，不允许其他事务进行相关字段的update操作（加行锁），但允许其他事务进行add操作，造成某个事务前后多次读取到的数据总量不一致的现象，从而产生幻读。这是mysql的默认事务隔离级别。
>
> 异常回滚类型：注解 @Transactional只对unchecked异常进行事务回滚，可以通过添加@Transactional(rollbackFor=Exception.class) 来对所有异常进行回滚。

举个简单的例子，

* `转账业务会有两次数据层的调用，一次是加钱一次是减钱`
* `把事务放在数据层，加钱和减钱就有两个事务`
* `没办法保证加钱和减钱同时成功或者同时失败`
* `这个时候就需要将事务放在业务层进行处理`

Spring为了管理事务，提供了一个平台事务管理器`PlatformTransactionManager`

![1630243651541](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206101720595.png)

`commit是用来提交事务，rollback是用来回滚事务`。

PlatformTransactionManager只是一个接口，Spring还为其提供了一个具体的实现:

![1630243993380](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206101720607.png)

从名称上可以看出，我们只需要给它一个DataSource对象，它就可以帮你去在业务层管理事务。其内部采用的是JDBC的事务。所以说如果你持久层采用的是JDBC相关的技术，就可以采用这个事务管理器来管理你的事务。而Mybatis内部采用的就是JDBC的事务，所以后期我们Spring整合Mybatis就采用的这个DataSourceTransactionManager事务管理器。

事务管理在系统开发中是不可缺少的一部分，`Spring`提供了很好事务管理机制，主要分为`编程式事务`和`声明式事务`两种。

### 事务实现代码

**编程式事务**：是指在代码中手动的管理事务的提交、回滚等操作，代码侵入性比较强，如下示例：

```java
try {
    //TODO something
     transactionManager.commit(status);
} catch (Exception e) {
    transactionManager.rollback(status);
    throw new InvoiceApplyException("异常失败");
}
```

**声明式事务**：基于`AOP`面向切面的，它将具体业务与事务处理部分解耦，代码侵入性很低，所以在实际开发中声明式事务用的比较多。声明式事务也有两种实现方式，一是基于`TX`和`AOP`的xml配置文件方式，二种就是基于@Transactional注解了。

```java
@Transactional
@GetMapping("/test")
public String test() {
    int insert = cityInfoDictMapper.insert(cityInfoDict);
}
```



### 转账案例-需求分析

接下来通过一个案例来学习下Spring是如何来管理事务的。

先来分析下需求:

需求: 实现任意两个账户间转账操作

需求微缩: A账户减钱，B账户加钱

为了实现上述的业务需求，我们可以按照下面步骤来实现下:
①：`数据层提供基础操作，指定账户减钱（outMoney），指定账户加钱（inMoney）`

②：`业务层提供转账操作（transfer），调用减钱与加钱的操作`

③：`提供2个账号和操作金额执行转账操作`

④：`基于Spring整合MyBatis环境搭建上述操作`

### 转账案例(实现事务)

##### 步骤1:准备数据库表

之前我们在整合Mybatis的时候已经创建了这个表,可以直接使用

```sql
create database spring_db character set utf8;
use spring_db;
create table tbl_account(
    id int primary key auto_increment,
    name varchar(35),
    money double
);
insert into tbl_account values(1,'Tom',1000);
insert into tbl_account values(2,'Jerry',1000);
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206101809940.png" alt="image-20220610180901865" style="zoom:80%;" />

##### 步骤2:创建项目导入jar包

项目的pom.xml添加相关依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <!--mysql依赖-->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
    <!--mybatis-plus依赖-->
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>3.5.1</version>
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
</dependencies>
```

##### 步骤3:根据表创建模型类

```java
@Data
public class account implements Serializable {
    private Integer id;
    private String name;
    private Double money;
}
```

##### 步骤4:创建Mapper接口

```java
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.it.entity.account;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface accountMapper extends BaseMapper<account> {

    @Update("update tbl_account set money = money + #{money} where name = #{name}")
    public void inMoney(@Param("name") String name, @Param("money") Double money);

    @Update("update tbl_account set money = money - #{money} where name = #{name}")
    public void outMoney(@Param("name") String name, @Param("money") Double money);
}
```

##### 步骤5:创建Service接口和实现类

```java
public interface AccountService {
    /**
     * 转账操作
     * @param out 传出方
     * @param in 转入方
     * @param money 金额
     */
    public void transfer(String out,String in ,Double money) ;
}
```

```java
import com.it.mapper.accountMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Service
public class AccountServiceImpl implements AccountService {

    @Resource
    private accountMapper accountMapper;

    //out，in是name
    //不加该注解，那么依旧是只有一个改变，否则就是两个都不变
    @Transactional
    public void transfer(String out,String in ,Double money) {
        accountMapper.outMoney(out,money);
        //抛出异常，测试事务
        int i = 1/0;
        accountMapper.inMoney(in,money);
    }
}
```

##### 步骤6:编写测试

```java
@Resource
private AccountService accountService;

@Test
public void testTransfer() {
    //Tom -> Jack 转账100元
    accountService.transfer("Tom", "Jerry", 100.0);
}
```





## 事务知识

上述环境，运行单元测试类，会执行转账操作，`Tom`的账户会减少100，`Jerry`的账户会加100。

这是正常情况下的运行结果，但是如果在转账的过程中出现了异常，如:

这个时候就模拟了转账过程中出现异常的情况，正确的操作应该是转账出问题了，`Tom`应该还是900，`Jerry`应该还是1100，但是真正运行后会发现，并没有像我们想象的那样，`Tom`账户为800而`Jerry`还是1100,100块钱凭空消息了，银行乐疯了。如果把转账换个顺序，银行就该哭了。

不管哪种情况，都是不允许出现的，对刚才的结果我们做一个分析:

①：`程序正常执行时，账户金额A减B加，没有问题`

②：`程序出现异常后，转账失败，但是异常之前操作成功，异常之后操作失败，整体业务失败`

当程序出问题后，我们需要让事务进行回滚，而且这个事务应该是加在业务层上，而Spring的事务管理就是用来解决这类问题的。

Spring提供了一个@EnableTransactionManagement注解在配置类上来开启声明式事务的支持（开启注解支持）。使用了@EnableTransactionManagement后，Spring容器会自动扫描注解@Transactional的方法和类。`SpringBoot默认已开启`，可不用显式注解。`要使用事务，我们只需要在需要事务的类或方法上使用@Transactional 注解即可`，当注解在类上的时候意味着此类的所有public方法都是开启事务的。`被注解的方法都成为一个事务整体，同一个事务内共享一个数据库连接，所有操作同时发生。如果在事务内部执行过程中发生了异常，则事务整体会自动进行回滚。`



## 三大核心类

Spring 中对事务的支持提供了三大基础设施，我们先来了解下。

1. PlatformTransactionManager
2. TransactionDefinition
3. TransactionStatus

这三个核心类是 Spring 处理事务的核心类。

### 1 PlatformTransactionManager

PlatformTransactionManager 是事务处理的核心，它有诸多的实现类，如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212081240164.png" alt="image-20221208124035002" style="zoom:67%;" />



PlatformTransactionManager 的定义如下：

```java
public interface PlatformTransactionManager {
 	TransactionStatus getTransaction(@Nullable TransactionDefinition definition);
	void commit(TransactionStatus status) throws TransactionException;
 	void rollback(TransactionStatus status) throws TransactionException;
}
```

可以看到 `PlatformTransactionManager` 中定义了基本的事务操作方法，这些事务操作方法都是平台无关的，具体的实现都是由不同的子类来实现的。

这就像 JDBC 一样，SUN 公司制定标准，其他数据库厂商提供具体的实现。这么做的好处就是我们 Java 程序员只需要掌握好这套标准即可，不用去管接口的具体实现。以 `PlatformTransactionManager` 为例，它有众多实现，如果你使用的是 JDBC 那么可以将 `DataSourceTransactionManager` 作为事务管理器；如果你使用的是 Hibernate，那么可以将 `HibernateTransactionManager` 作为事务管理器；如果你使用的是 JPA，那么可以将 `JpaTransactionManager` 作为事务管理器。`DataSourceTransactionManager`、`HibernateTransactionManager` 以及 `JpaTransactionManager` 都是 `PlatformTransactionManager` 的具体实现，但是我们并不需要掌握这些具体实现类的用法，我们只需要掌握好 `PlatformTransactionManager` 的用法即可。

`PlatformTransactionManager` 中主要有如下三个方法：

**1.getTransaction()**

> getTransaction() 是根据传入的 TransactionDefinition 获取一个事务对象，TransactionDefinition 中定义了一些事务的基本规则，例如传播性、隔离级别等。

**2.commit()**

> commit() 方法用来提交事务。

**3.rollback()**

> rollback() 方法用来回滚事务。

### 2 TransactionDefinition

`TransactionDefinition` 用来描述事务的具体规则，也称作事务的属性。事务有哪些属性呢？看下图：

可以看到，主要是五种属性：

1. 隔离性
2. 传播性
3. 回滚规则
4. 超时时间
5. 是否只读

这五种属性接下来松哥会和大家详细介绍。

`TransactionDefinition` 类中的方法如下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/GvtDGKK4uYmGWzE7sFQZmh74H5Z4j2e763Ff20fkYqVcmthuUJVibIGkRuxwBCHicLw9GehM1Sh6b4j5gOD3menQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

可以看到一共有五个方法：

1. getIsolationLevel()，获取事务的隔离级别
2. getName()，获取事务的名称
3. getPropagationBehavior()，获取事务的传播性
4. getTimeout()，获取事务的超时时间
5. isReadOnly()，获取事务是否是只读事务

TransactionDefinition 也有诸多的实现类，如下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/GvtDGKK4uYmGWzE7sFQZmh74H5Z4j2e7p77Phbh3fkaTY2pSBTRl8ghdcD5YCA2rVS51W5VdM3gQE7xgo6Y1Fw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

如果开发者使用了编程式事务的话，直接使用 `DefaultTransactionDefinition` 即可。

### 3 TransactionStatus

TransactionStatus 可以直接理解为事务本身，该接口源码如下：

```java
public interface TransactionStatus extends SavepointManager, Flushable {
 	boolean isNewTransaction();
 	boolean hasSavepoint();
 	void setRollbackOnly();
 	boolean isRollbackOnly();
	void flush();
	boolean isCompleted();
}
```

1. isNewTransaction() 方法获取当前事务是否是一个新事务。
2. hasSavepoint() 方法判断是否存在 savePoint()。
3. setRollbackOnly() 方法设置事务必须回滚。
4. isRollbackOnly() 方法获取事务只能回滚。
5. flush() 方法将底层会话中的修改刷新到数据库，一般用于 Hibernate/JPA 的会话，如 JDBC 类型的事务无任何影响
6. isCompleted() 方法用来获取是一个事务是否结束。

**这就是 Spring 中支持事务的三大基础设施。**



## @Transactional

@Transactional 可以作用在`接口`、`类`、`类方法`。

- **作用于类**：当把@Transactional 注解放在类上时，表示所有该类的`public`方法都配置相同的事务属性信息。
- **作用于方法**：当类配置了@Transactional，方法也配置了@Transactional，方法的事务会覆盖类的事务配置信息。
- **作用于接口**：不推荐这种使用方法，因为一旦标注在Interface上并且配置了Spring AOP 使用CGLib动态代理，将会导致@Transactional注解失效
- ==建议写在实现类或实现类的方法上==

### rollbackFor属性

`@Transactional`只能回滚`RuntimeException`和`RuntimeException`下面的子类抛出的异常 不能回滚`Exception`异常

如果需要支持回滚`Exception`异常请用`@Transactional(rollbackFor = Exception.class)`

这里如果是增删改的时候我建议大家都使用`@Transactional(rollbackFor = Exception.class)`



## @Transactional隔离级别

事务之间有不同的隔离级别，不同的隔离级别可以解决并发事务所带来的问题。在SpringBoot中，事务的隔离级别定义为@Transactional 注解中的属性

```java
@Transactional(isolation = Isolation.DEFAULT)
```

```java
//默认的隔离级别，使用当前数据库的隔离级别。会是后面四种隔离级别的其中一种
int ISOLATION_DEFAULT = -1;

int ISOLATION_READ_UNCOMMITTED = 1;//读未提交;

int ISOLATION_READ_COMMITTED = 2; //读已提交；

int ISOLATION_REPEATABLE_READ = 4; //重复读；

int ISOLATION_SERIALIZABLE = 8; //串行化
```

- DEFAULT ：默认值（也是SpringBoot的隔离级别默认值），表示使用底层数据库的默认隔离级别。大部分数据库为READ_COMMITTED(MySql默认隔离级别为REPEATABLE_READ) 
- READ_UNCOMMITTED ：该隔离级别表示一个事务可以读取另一个事务修改但还没有提交的数据。该级别不能防止脏读和不可重复读，因此很少使用该隔离级别。 （解决了丢失修改，但会出现脏读，不可重复读和幻读）
- READ_COMMITTED ：该隔离级别表示一个事务只能读取另一个事务已经提交的数据。该级别可以防止脏读，这也是大多数情况下的推荐值。 （解决了更新丢失，脏读。但会出现不可重复读，幻读）
- REPEATABLE_READ ：该隔离级别表示一个事务在整个过程中可以多次重复执行某个查询，并且每次返回的记录都相同。即使在多次查询之间有新增的数据满足该查询，这些新增的记录也会被忽略。该级别可以防止脏读和不可重复读。 （解决了更新丢失，脏读，不可重复度，同时有人指出在 mysql 的 innodb 引擎上，配合 mvvc + gap 锁，已经解决了幻读问题）
- SERIALIZABLE ：所有的事务依次逐个执行，这样事务之间就完全不可能产生干扰，也就是说，该级别可以防止脏读、不可重复读以及幻读。但是这将严重影响程序的性能。通常情况下也不会用到该级别。  （解决所有问题，串行执行）

## @Transactional角色

这节中我们重点要理解两个概念，分别是`事务管理员`和`事务协调员`。

1. 未开启Spring事务之前:

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206101720610.png" alt="1630248794837" style="zoom:80%;" />

* AccountDao的outMoney因为是修改操作，会开启一个事务T1
* AccountDao的inMoney因为是修改操作，会开启一个事务T2
* AccountService的transfer没有事务，
  * 运行过程中如果没有抛出异常，则T1和T2都正常提交，数据正确
  * 如果在两个方法中间抛出异常，T1因为执行成功提交事务，T2因为抛异常不会被执行
  * 就会导致数据出现错误

2. 开启Spring的事务管理后

![1630249111055](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206101720616.png)

* transfer上添加了@Transactional注解，在该方法上就会有一个事务T
* AccountDao的outMoney方法的事务T1加入到transfer的事务T中
* AccountDao的inMoney方法的事务T2加入到transfer的事务T中
* 这样就保证他们在同一个事务中，当业务层中出现异常，整个事务就会回滚，保证数据的准确性。

通过上面例子的分析，我们就可以得到如下概念:

- 事务管理员：发起事务方，在Spring中通常指代业务层开启事务的方法
- 事务协调员：加入事务方，在Spring中通常指代数据层方法，也可以是业务层方法



## @Transactional属性

上一节我们介绍了两个概念，事务的管理员和事务的协同员，对于这两个概念具体做什么的，我们待会通过案例来使用下。除了这两个概念，还有就是事务的其他相关配置都有哪些，就是我们接下来要学习的内容。

在这一节中，我们主要学习三部分内容`事务配置`、`转账业务追加日志`、`事务传播行为`。

### 1 事务配置

![1630250069844](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206101720614.png)

上面这些属性都可以在`@Transactional`注解的参数上进行设置。

* readOnly：true只读事务，false读写事务，增删改要设为false,查询设为true。

* timeout:设置超时时间单位秒，在多长时间之内事务没有提交成功就自动回滚，-1表示不设置超时时间。

* rollbackFor:当出现指定异常进行事务回滚

* noRollbackFor:当出现指定异常不进行事务回滚

  * 思考:出现异常事务会自动回滚，这个是我们之前就已经知道的

  * noRollbackFor是设定对于指定的异常不回滚，这个好理解

  * rollbackFor是指定回滚异常，对于异常事务不应该都回滚么，为什么还要指定?

    * 这块需要更正一个知识点，并不是所有的异常都会回滚事务，比如下面的代码就不会回滚

      ```java
      public interface AccountService {
          /**
           * 转账操作
           * @param out 传出方
           * @param in 转入方
           * @param money 金额
           */
          //配置当前接口方法具有事务
          public void transfer(String out,String in ,Double money) throws IOException;
      }
      
      @Service
      public class AccountServiceImpl implements AccountService {
      
          @Autowired
          private AccountDao accountDao;
      	@Transactional
          public void transfer(String out,String in ,Double money) throws IOException{
              accountDao.outMoney(out,money);
              //int i = 1/0; //这个异常事务会回滚
              if(true){
                  throw new IOException(); //这个异常事务就不会回滚
              }
              accountDao.inMoney(in,money);
          }
      
      }
      ```

* 出现这个问题的原因是，Spring的事务只会对`Error异常`和`RuntimeException异常`及其子类进行事务回顾，其他的异常类型是不会回滚的，对应IOException不符合上述条件所以不回滚
      

  * 此时就可以使用rollbackFor属性来设置出现IOException异常不回滚

    ```java
    @Service
    public class AccountServiceImpl implements AccountService {
    
        @Autowired
        private AccountDao accountDao;
    	 @Transactional(rollbackFor = {IOException.class})
        public void transfer(String out,String in ,Double money) throws IOException{
            accountDao.outMoney(out,money);
            //int i = 1/0; //这个异常事务会回滚
            if(true){
                throw new IOException(); //这个异常事务就不会回滚
            }
            accountDao.inMoney(in,money);
        }
    
    }
    ```

* rollbackForClassName等同于rollbackFor,只不过属性为异常的类全名字符串

* noRollbackForClassName等同于noRollbackFor，只不过属性为异常的类全名字符串

* isolation设置事务的隔离级别

  * DEFAULT   :默认隔离级别, 会采用数据库的隔离级别
  * READ_UNCOMMITTED : 读未提交
  * READ_COMMITTED : 读已提交
  * REPEATABLE_READ : 重复读取
  * SERIALIZABLE: 串行化

介绍完上述属性后，还有最后一个事务的传播行为，为了讲解该属性的设置，我们需要完成下面的案例。



### 2 转账业务追加日志案例

##### 1 需求分析

在前面的转案例的基础上添加新的需求，完成转账后记录日志。

- 需求：实现任意两个账户间转账操作，并对每次转账操作在数据库进行留痕
- 需求微缩：A账户减钱，B账户加钱，数据库记录日志

基于上述的业务需求，我们来分析下该如何实现:

①：基于转账操作案例添加日志模块，实现数据库中记录日志

②：业务层转账操作（transfer），调用减钱、加钱与记录日志功能

需要注意一点就是，我们这个案例的预期效果为:

==无论转账操作是否成功，均进行转账操作的日志留痕==

##### 2 环境准备

该环境是基于转账环境来完成的，所以环境的准备可以参考`6.1.3的环境搭建步骤`，在其基础上，我们继续往下写

###### 步骤1:创建日志表

```sql
create table tbl_log(
   id int primary key auto_increment,
   info varchar(255),
   createDate datetime
)
```

```java
@Data
public class log {
    private Integer id;
    private String info;
    private LocalDateTime createDate;
}
```

###### 步骤2:添加LogMapper接口

```java
@Mapper
public interface logMapper extends BaseMapper<log> {
    @Insert("insert into tbl_log (info,createDate) values(#{info},now())")
    public void log(String info);
}
```

###### 步骤3:添加LogService接口与实现类

```java
public interface LogService {
   public void log(String out, String in, Double money);
}
```

```java
import com.it.mapper.logMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import javax.annotation.Resource;

@Service
public class LogServiceImpl implements LogService {

    @Resource
    private logMapper logMapper;
    // 事务传播
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void log(String out,String in,Double money ) {
        logMapper.log("转账操作由"+out+"到"+in+",金额："+money);
    }
}
```

###### 步骤4:在转账的业务中添加记录日志

```java
import com.it.mapper.accountMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.annotation.Resource;

@Service
public class AccountServiceImpl implements AccountService {

    @Resource
    private accountMapper accountMapper;

    @Resource
    private LogService logService;

    //out，in是name
    //不加该注解，那么依旧是只有一个改变，否则就是两个都不变
    @Transactional(rollbackFor = Exception.class)
    public void transfer(String out,String in ,Double money) {
        //注意：不能catch异常，不然事务就不能执行了
        try {
            accountMapper.outMoney(out,money);
            //抛出异常，测试事务
            int i = 1/0;
            accountMapper.inMoney(in,money);
        } finally{
            logService.log(out,in,money);
        }
    }
}
```

###### 步骤5:运行程序

* 当程序正常运行，tbl_account表中转账成功，tbl_log表中日志记录成功

* 当转账业务之间出现异常(int i =1/0),转账失败，tbl_account成功回滚，但是tbl_log表未添加数据
* 这个结果和我们想要的不一样，什么原因?该如何解决?
* 失败原因:日志的记录与转账操作隶属同一个事务，同成功同失败
* 最终效果:无论转账操作是否成功，日志必须保留

```java
@Resource
private AccountService accountService;

@Test
public void testTransfer() {
    //Tom -> Jack 转账100元
    accountService.transfer("Tom", "Jerry", 100.0);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206101944351.png" alt="image-20220610194459273" style="zoom:80%;" />



### 3 事务传播行为

![1630253779575](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206101720197.png)

对于上述案例的分析:

* log方法、inMoney方法和outMoney方法都属于增删改，分别有事务T1,T2,T3
* transfer因为加了@Transactional注解，也开启了事务T
* 前面我们讲过Spring事务会把T1,T2,T3都加入到事务T中
* 所以当转账失败后，所有的事务都回滚，导致日志没有记录下来
* 这和我们的需求不符，`这个时候我们就想能不能让log方法单独是一个事务呢?`

要想解决这个问题，就需要用到事务传播行为，所谓的事务传播行为指的是:

事务传播行为：事务协调员对事务管理员所携带事务的处理态度。

具体如何解决，就需要用到之前我们没有说的`propagation属性`。

##### 1.修改logService改变事务的传播行为

```java
@Service
public class LogServiceImpl implements LogService {

    @Autowired
    private LogDao logDao;
	//propagation设置事务属性：传播行为设置为当前操作需要新事务
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void log(String out,String in,Double money ) {
        logDao.log("转账操作由"+out+"到"+in+",金额："+money);
    }
}
```

运行后，就能实现我们想要的结果，不管转账是否成功，都会记录日志。

##### 2.事务传播行为的可选值

![1630254257628](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206101720202.png)

对于我们开发实际中使用的话，因为默认值需要事务是常态的。根据开发过程选择其他的就可以了，例如案例中需要新事务就需要手工配置。其实入账和出账操作上也有事务，采用的就是默认值。



# Spring 事务失效的 8 种场景！

对于从事java开发工作的同学来说，spring的事务肯定再熟悉不过了。

在某些业务场景下，如果一个请求中，需要同时写入多张表的数据。为了保证操作的原子性（要么同时成功，要么同时失败），避免数据不一致的情况，我们一般都会用到spring事务。

确实，spring事务用起来贼爽，就用一个简单的注解：`@Transactional`，就能轻松搞定事务。我猜大部分小伙伴也是这样用的，而且一直用一直爽。

但如果你使用不当，它也会坑你于无形。

今天我们就一起聊聊，事务失效的一些场景，说不定你已经中招了。不信，让我们一起看看。

<img src="https://mmbiz.qpic.cn/mmbiz_jpg/uL371281oDFI5ibhP1TXOMnqQtJhfb3XCnTbgmpiab2LDA8VVCmg2jMUoeJd70gAJsj7vL2IB0icYxsbsvnKIu9LQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />



## 一 事务不生效

### 1.访问权限问题

众所周知，java的访问权限主要有四种：private、default、protected、public，它们的权限从左到右，依次变大。

但如果我们在开发过程中，把有某些事务方法，定义了错误的访问权限，就会导致事务功能出问题，例如：

```java
@Service
public class UserService {
    
    @Transactional
    private void add(UserModel userModel) {
         saveData(userModel);
         updateData(userModel);
    }
}
```

我们可以看到add方法的访问权限被定义成了`private`，这样会导致事务失效，spring要求被代理方法必须是`public`的。说白了，在`AbstractFallbackTransactionAttributeSource`类的`computeTransactionAttribute`方法中有个判断，如果目标方法不是public，则`TransactionAttribute`返回null，即不支持事务。

也就是说，如果我们自定义的事务方法（即目标方法），它的访问权限不是`public`，而是private、default或protected的话，spring则不会提供事务功能。

### 2. 方法用final修饰

有时候，某个方法不想被子类重新，这时可以将该方法定义成final的。普通方法这样定义是没问题的，但如果将事务方法定义成final，例如：

```java
@Service
public class UserService {

    @Transactional
    public final void add(UserModel userModel){
        saveData(userModel);
        updateData(userModel);
    }
}
```

我们可以看到add方法被定义成了`final`的，这样会导致事务失效。

为什么？

如果你看过spring事务的源码，可能会知道spring事务底层使用了aop，也就是通过jdk动态代理或者cglib，帮我们生成了代理类，在代理类中实现的事务功能。

但如果某个方法用final修饰了，那么在它的代理类中，就无法重写该方法，而添加事务功能。

> 注意：如果某个方法是static的，同样无法通过动态代理，变成事务方法。

### 3.方法内部调用

有时候我们需要在某个Service类的某个方法中，调用另外一个事务方法，比如：

```java
@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    @Transactional
    public void add(UserModel userModel) {
        userMapper.insertUser(userModel);
        updateStatus(userModel);
    }

    @Transactional
    public void updateStatus(UserModel userModel) {
        doSameThing();
    }
}
```

我们看到在事务方法add中，直接调用事务方法updateStatus。从前面介绍的内容可以知道，updateStatus方法拥有事务的能力是因为spring aop生成代理了对象，但是这种方法直接调用了this对象的方法，所以updateStatus方法不会生成事务。

由此可见，在同一个类中的方法直接内部调用，会导致事务失效。

那么问题来了，如果有些场景，确实想在同一个类的某个方法中，调用它自己的另外一个方法，该怎么办呢？

#### 3.1 新加一个Service方法

这个方法非常简单，只需要新加一个Service方法，把@Transactional注解加到新Service方法上，把需要事务执行的代码移到新方法中。具体代码如下：

```java
@Servcie
public class ServiceA {
   @Autowired
   prvate ServiceB serviceB;

   public void save(User user) {
         queryData1();
         queryData2();
         serviceB.doSave(user);
   }
 }

 @Servcie
 public class ServiceB {

    @Transactional(rollbackFor=Exception.class)
    public void doSave(User user) {
       addData1();
       updateData2();
    }

 }
```

#### 3.2 在该Service类中注入自己

如果不想再新加一个Service类，在该Service类中注入自己也是一种选择。具体代码如下：

```java
@Servcie
public class ServiceA {
   @Autowired
   prvate ServiceA serviceA;

   public void save(User user) {
         queryData1();
         queryData2();
         serviceA.doSave(user);
   }

   @Transactional(rollbackFor=Exception.class)
   public void doSave(User user) {
       addData1();
       updateData2();
    }
 }
```

可能有些人可能会有这样的疑问：这种做法会不会出现循环依赖问题？

答案：不会。

其实spring ioc内部的三级缓存保证了它，不会出现循环依赖问题。但有些坑，如果你想进一步了解循环依赖问题，可以看看我之前文章《[spring：我是如何解决循环依赖的？](https://mp.weixin.qq.com/s?__biz=MzUxODkzNTQ3Nw==&mid=2247485600&idx=1&sn=0c49b94e7fbd35c88c4470e936023e3e&chksm=f9800e7acef7876ca05ab45ce9420ea140f188e84153f23d0af9d044f475458ad38d49a6546a&token=1641046204&lang=zh_CN&scene=21#wechat_redirect)》。

#### 3.3 通过AopContent类

在该Service类中使用AopContext.currentProxy()获取代理对象

上面的方法2确实可以解决问题，但是代码看起来并不直观，还可以通过在该Service类中使用AOPProxy获取代理对象，实现相同的功能。具体代码如下：

```java
@Servcie
public class ServiceA {

   public void save(User user) {
         queryData1();
         queryData2();
         ((ServiceA)AopContext.currentProxy()).doSave(user);
   }

   @Transactional(rollbackFor=Exception.class)
   public void doSave(User user) {
       addData1();
       updateData2();
    }
 }
```

### 4.未被spring管理

在我们平时开发过程中，有个细节很容易被忽略。即使用spring事务的前提是：对象要被spring管理，需要创建bean实例。

通常情况下，我们通过@Controller、@Service、@Component、@Repository等注解，可以自动实现bean实例化和依赖注入的功能。

当然创建bean实例的方法还有很多，有兴趣的小伙伴可以看看我之前写的另一篇文章《[@Autowired的这些骚操作，你都知道吗？](https://mp.weixin.qq.com/s?__biz=MzUxODkzNTQ3Nw==&mid=2247488466&idx=1&sn=1e63e6991b5fb47e067d2edf055981d3&chksm=f9801508cef79c1ea208906ceef09593a9f594b3926478eb65b7ef64e0311f13ac5aaf4135ce&token=1641046204&lang=zh_CN&scene=21#wechat_redirect)》

如果有一天，你匆匆忙忙的开发了一个Service类，但忘了加@Service注解，比如：

```java
//@Service
public class UserService {

    @Transactional
    public void add(UserModel userModel) {
         saveData(userModel);
         updateData(userModel);
    }    
}
```

从上面的例子，我们可以看到UserService类没有加`@Service`注解，那么该类不会交给spring管理，所以它的add方法也不会生成事务。

### 5.多线程调用

在实际项目开发中，多线程的使用场景还是挺多的。如果spring事务用在多线程场景中，会有问题吗？

```java
@Slf4j
@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private RoleService roleService;

    @Transactional
    public void add(UserModel userModel) throws Exception {
        userMapper.insertUser(userModel);
        new Thread(() -> {
            roleService.doOtherThing();
        }).start();
    }
}

@Service
public class RoleService {

    @Transactional
    public void doOtherThing() {
        System.out.println("保存role表数据");
    }
}
```

从上面的例子中，我们可以看到事务方法add中，调用了事务方法doOtherThing，但是事务方法doOtherThing是在另外一个线程中调用的。

这样会导致两个方法不在同一个线程中，获取到的数据库连接不一样，从而是两个不同的事务。如果想doOtherThing方法中抛了异常，add方法也回滚是不可能的。

如果看过spring事务源码的朋友，可能会知道spring的事务是通过数据库连接来实现的。当前线程中保存了一个map，key是数据源，value是数据库连接。

```java
private static final ThreadLocal<Map<Object, Object>> resources =
               new NamedThreadLocal<>("Transactional resources");
```

我们说的同一个事务，其实是指同一个数据库连接，只有拥有同一个数据库连接才能同时提交和回滚。如果在不同的线程，拿到的数据库连接肯定是不一样的，所以是不同的事务。

### 6.表不支持事务

周所周知，在mysql5之前，默认的数据库引擎是`myisam`。

它的好处就不用多说了：索引文件和数据文件是分开存储的，对于查多写少的单表操作，性能比innodb更好。

有些老项目中，可能还在用它。

在创建表的时候，只需要把`ENGINE`参数设置成`MyISAM`即可：

```sql
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `one_category` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `two_category` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `three_category` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `four_category` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin
```

myisam好用，但有个很致命的问题是：`不支持事务`。

如果只是单表操作还好，不会出现太大的问题。但如果需要跨多张表操作，由于其不支持事务，数据极有可能会出现不完整的情况。

此外，myisam还不支持行锁和外键。

所以在实际业务场景中，myisam使用的并不多。在mysql5以后，myisam已经逐渐退出了历史的舞台，取而代之的是innodb。

> 有时候我们在开发的过程中，发现某张表的事务一直都没有生效，那不一定是spring事务的锅，最好确认一下你使用的那张表，是否支持事务。

### 7.未开启事务

有时候，事务没有生效的根本原因是没有开启事务。

你看到这句话可能会觉得好笑。

开启事务不是一个项目中，最最最基本的功能吗？

为什么还会没有开启事务？

没错，如果项目已经搭建好了，事务功能肯定是有的。

但如果你是在搭建项目demo的时候，只有一张表，而这张表的事务没有生效。那么会是什么原因造成的呢？

当然原因有很多，但没有开启事务，这个原因极其容易被忽略。

如果你使用的是springboot项目，那么你很幸运。因为springboot通过`DataSourceTransactionManagerAutoConfiguration`类，已经默默的帮你开启了事务。

你所要做的事情很简单，只需要配置`spring.datasource`相关参数即可。

但如果你使用的还是传统的spring项目，则需要在applicationContext.xml文件中，手动配置事务相关参数。如果忘了配置，事务肯定是不会生效的。

具体配置如下信息：

```xml
<!-- 配置事务管理器 --> 
<bean class="org.springframework.jdbc.datasource.DataSourceTransactionManager" id="transactionManager"> 
    <property name="dataSource" ref="dataSource"></property> 
</bean> 
<tx:advice id="advice" transaction-manager="transactionManager"> 
    <tx:attributes> 
        <tx:method name="*" propagation="REQUIRED"/>
    </tx:attributes> 
</tx:advice> 
<!-- 用切点把事务切进去 --> 
<aop:config> 
    <aop:pointcut expression="execution(* com.susan.*.*(..))" id="pointcut"/> 
    <aop:advisor advice-ref="advice" pointcut-ref="pointcut"/> 
</aop:config> 
```

默默的说一句，如果在pointcut标签中的切入点匹配规则，配错了的话，有些类的事务也不会生效。

## 二 事务不回滚

### 1.错误的传播特性

其实，我们在使用`@Transactional`注解时，是可以指定`propagation`参数的。

该参数的作用是指定事务的传播特性，spring目前支持7种传播特性：

- `REQUIRED` 如果当前上下文中存在事务，那么加入该事务，如果不存在事务，创建一个事务，这是默认的传播属性值。
- `SUPPORTS` 如果当前上下文存在事务，则支持事务加入事务，如果不存在事务，则使用非事务的方式执行。
- `MANDATORY` 如果当前上下文中存在事务，否则抛出异常。
- `REQUIRES_NEW` 每次都会新建一个事务，并且同时将上下文中的事务挂起，执行当前新建事务完成以后，上下文事务恢复再执行。
- `NOT_SUPPORTED` 如果当前上下文中存在事务，则挂起当前事务，然后新的方法在没有事务的环境中执行。
- `NEVER` 如果当前上下文中存在事务，则抛出异常，否则在无事务环境上执行代码。
- `NESTED` 如果当前上下文中存在事务，则嵌套事务执行，如果不存在事务，则新建事务。

如果我们在手动设置propagation参数的时候，把传播特性设置错了，比如：

```java
@Service
public class UserService {

    @Transactional(propagation = Propagation.NEVER)
    public void add(UserModel userModel) {
        saveData(userModel);
        updateData(userModel);
    }
}
```

我们可以看到add方法的事务传播特性定义成了Propagation.NEVER，这种类型的传播特性不支持事务，如果有事务则会抛异常。

目前只有这三种传播特性才会创建新事务：REQUIRED，REQUIRES_NEW，NESTED。

### 2.自己吞了异常

事务不会回滚，最常见的问题是：开发者在代码中手动try...catch了异常。比如：

```java
@Slf4j
@Service
public class UserService {
    
    @Transactional
    public void add(UserModel userModel) {
        try {
            saveData(userModel);
            updateData(userModel);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
    }
}
```

这种情况下spring事务当然不会回滚，因为开发者自己捕获了异常，又没有手动抛出，换句话说就是把异常吞掉了。

如果想要spring事务能够正常回滚，必须抛出它能够处理的异常。如果没有抛异常，则spring认为程序是正常的。

### 3.手动抛了别的异常

即使开发者没有手动捕获异常，但如果抛的异常不正确，spring事务也不会回滚。

```java
@Slf4j
@Service
public class UserService {
    
    @Transactional
    public void add(UserModel userModel) throws Exception {
        try {
             saveData(userModel);
             updateData(userModel);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new Exception(e);
        }
    }
}
```

上面的这种情况，开发人员自己捕获了异常，又手动抛出了异常：Exception，事务同样不会回滚。

因为spring事务，默认情况下只会回滚`RuntimeException`（运行时异常）和`Error`（错误），对于普通的Exception（非运行时异常），它不会回滚。

### 4.自定义了回滚异常

在使用@Transactional注解声明事务时，有时我们想自定义回滚的异常，spring也是支持的。可以通过设置`rollbackFor`参数，来完成这个功能。

但如果这个参数的值设置错了，就会引出一些莫名其妙的问题，例如：

```java
@Slf4j
@Service
public class UserService {
    
    @Transactional(rollbackFor = BusinessException.class)
    public void add(UserModel userModel) throws Exception {
       saveData(userModel);
       updateData(userModel);
    }
}
```

如果在执行上面这段代码，保存和更新数据时，程序报错了，抛了SqlException、DuplicateKeyException等异常。而BusinessException是我们自定义的异常，报错的异常不属于BusinessException，所以事务也不会回滚。

即使rollbackFor有默认值，但阿里巴巴开发者规范中，还是要求开发者重新指定该参数。

这是为什么呢？

因为如果使用默认值，一旦程序抛出了Exception，事务不会回滚，这会出现很大的bug。所以，建议一般情况下，将该参数设置成：Exception或Throwable。

### 5.嵌套事务回滚多了

```java
public class UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private RoleService roleService;

    @Transactional
    public void add(UserModel userModel) throws Exception {
        userMapper.insertUser(userModel);
        roleService.doOtherThing();
    }
}

@Service
public class RoleService {

    @Transactional(propagation = Propagation.NESTED)
    public void doOtherThing() {
        System.out.println("保存role表数据");
    }
}
```

这种情况使用了嵌套的内部事务，原本是希望调用roleService.doOtherThing方法时，如果出现了异常，只回滚doOtherThing方法里的内容，不回滚 userMapper.insertUser里的内容，即回滚保存点。。但事实是，insertUser也回滚了。

why?

因为doOtherThing方法出现了异常，没有手动捕获，会继续往上抛，到外层add方法的代理方法中捕获了异常。所以，这种情况是直接回滚了整个事务，不只回滚单个保存点。

怎么样才能只回滚保存点呢？

```java
@Slf4j
@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private RoleService roleService;

    @Transactional
    public void add(UserModel userModel) throws Exception {

        userMapper.insertUser(userModel);
        try {
            roleService.doOtherThing();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
    }
}
```

可以将内部嵌套事务放在try/catch中，并且不继续往上抛异常。这样就能保证，如果内部嵌套事务中出现异常，只回滚内部事务，而不影响外部事务。

## 三 其他

### 1 大事务问题

在使用spring事务时，有个让人非常头疼的问题，就是大事务问题。

通常情况下，我们会在方法上`@Transactional`注解，填加事务功能，比如：

```java
@Service
public class UserService {
    
    @Autowired 
    private RoleService roleService;
    
    @Transactional
    public void add(UserModel userModel) throws Exception {
       query1();
       query2();
       query3();
       roleService.save(userModel);
       update(userModel);
    }
}


@Service
public class RoleService {
    
    @Autowired 
    private RoleService roleService;
    
    @Transactional
    public void save(UserModel userModel) throws Exception {
       query4();
       query5();
       query6();
       saveData(userModel);
    }
}
```

但`@Transactional`注解，如果被加到方法上，有个缺点就是整个方法都包含在事务当中了。

上面的这个例子中，在UserService类中，其实只有这两行才需要事务：

```java
roleService.save(userModel);
update(userModel);
```

在RoleService类中，只有这一行需要事务：

```java
saveData(userModel);
```

现在的这种写法，会导致所有的query方法也被包含在同一个事务当中。

如果query方法非常多，调用层级很深，而且有部分查询方法比较耗时的话，会造成整个事务非常耗时，而从造成大事务问题。

关于大事务问题的危害，可以阅读一下我的另一篇文章《[让人头痛的大事务问题到底要如何解决？](https://mp.weixin.qq.com/s?__biz=MzUxODkzNTQ3Nw==&mid=2247485262&idx=1&sn=abe19452e4c13876270f329cc6929be7&chksm=f9800194cef78882e5ad4d8eb00b7e3f745a4159aee6afb1858cc16cae599f8889afa330e17b&token=305097496&lang=zh_CN&scene=21#wechat_redirect)》，上面有详细的讲解。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301628745.png" alt="image-20220530162831667" style="zoom:80%;" />



### 2.编程式事务

`奇怪，并不能成功运行`

上面聊的这些内容都是基于`@Transactional`注解的，主要说的是它的事务问题，我们把这种事务叫做：`声明式事务`。

其实，spring还提供了另外一种创建事务的方式，即通过手动编写代码实现的事务，我们把这种事务叫做：`编程式事务`。例如：

```java
   @Autowired
   private TransactionTemplate transactionTemplate;
   
   ...
   
   public void save(final User user) {
         queryData1();
         queryData2();
         transactionTemplate.execute((status) => {
            addData1();
            updateData2();
            return Boolean.TRUE;
         })
   }
```

在spring中为了支持编程式事务，专门提供了一个类：TransactionTemplate，在它的execute方法中，就实现了事务的功能。

相较于`@Transactional`注解声明式事务，我更建议大家使用，基于`TransactionTemplate`的编程式事务。主要原因如下：

1. 避免由于spring aop问题，导致事务失效的问题。
2. 能够更小粒度的控制事务的范围，更直观。

> 建议在项目中少使用@Transactional注解开启事务。但并不是说一定不能用它，如果项目中有些业务逻辑比较简单，而且不经常变动，使用@Transactional注解开启事务开启事务也无妨，因为它更简单，开发效率更高，但是千万要小心事务失效的问题。

# 为什么事务没有生效

**用 Spring 的 @Transactional 注解控制事务有哪些不生效的场景？**

不知道小伙伴们有没有这样的经历，在自己开心的编写业务代码时候，突然某一个方法里的事务好像失效了。然后 debug 跟踪代码时发现，自己第一步的 insert 或者 update 的数据在语句执行完毕后，数据库中并没有立即出现更改或保存完的新数据。

所以一度怀疑spring 的事务失效了。那么这篇文章就来总结一下，大家给大家造成 “spring事务失效”错觉的 几个常见场景，然后对症下药。

以本人的经历中遇到的问题，大概分有以下几个场景：

- 数据库引擎是否支持事务（Mysql 的 MyIsam引擎不支持事务）；
- 注解所在的类是否被加载为 Bean（是否被spring 管理）；
- 注解所在的方法是否为 public 修饰的；
- 是否存在自身调用的问题；
- 所用数据源是否加载了事务管理器；
- `@Transactional`的扩展配置`propagation`是否正确。

## 数据库引擎不支持事务

这里以 MySQL 为例，其 MyISAM 引擎是不支持事务操作的，InnoDB 才是支持事务的引擎，一般要支持事务都会使用 InnoDB。

根据 MySQL 的官方文档：

> https://dev.mysql.com/doc/refman/5.5/en/storage-engine-setting.html

从 MySQL 5.5.5 开始的默认存储引擎是：InnoDB，之前默认的都是：MyISAM，所以这点要值得注意，底层引擎不支持事务再怎么搞都是白搭。

## 没有被 Spring 管理

如下面例子所示：

```java
// @Service  
public class OrderServiceImpl implements OrderService {  
   
    @Transactional  
    public void updateOrder(Order order) {  
        // update order  
    }  
   
}  
```

如果此时把 `@Service` 注解注释掉，这个类就不会被加载成一个 Bean，那这个类就不会被 Spring 管理了，事务自然就失效了。

## 方法不是 public

以下来自 Spring 官方文档：

> When using proxies, you should apply the @Transactional annotation only to methods with public visibility. If you do annotate protected, private or package-visible methods with the @Transactional annotation, no error is raised, but the annotated method does not exhibit the configured transactional settings. Consider the use of AspectJ (see below) if you need to annotate non-public methods.

大概意思就是 `@Transactional` 只能用于 public 的方法上，否则事务不会失效，如果要用在非 public 方法上，可以开启 AspectJ 代理模式。

## 自身调用问题

来看两个示例：

```java
//示例1  
   
@Service  
public class OrderServiceImpl implements OrderService {  
   
    public void update(Order order) {  
        updateOrder(order);  
    }  
   
    @Transactional  
    public void updateOrder(Order order) {  
        // update order  
    }  
   
}  
//示例2  
   
@Service  
public class OrderServiceImpl implements OrderService {  
   
    @Transactional  
    public void update(Order order) {  
        updateOrder(order);  
    }  
   
    @Transactional(propagation = Propagation.REQUIRES_NEW)  
    public void updateOrder(Order order) {  
        // update order  
    }  
   
}  
```

- 示例1 中，update方法上面没有加 `@Transactional` 注解，调用有 `@Transactional` 注解的 `updateOrder` 方法，`updateOrder` 方法上的事务管用吗？
- 示例2 中，update方法上面没有加 `@Transactional` 注解，调用有 `@Transactional` 注解的 `updateOrder` 方法，`updateOrder` 方法上的事务管用吗？

这两个例子的答案是：都不管用！

因为它们发生了自身调用，就调该类自己的方法，而没有经过 Spring 的代理类，默认只有在外部调用事务才会生效，这也是老生常谈的经典问题了。

这个的解决方案之一就是在的类中注入自己，用注入的对象再调用另外一个方法，这个不太优雅，另外一个可行的方案可以参考《[Spring 如何在一个事务中开启另一个事务？](http://mp.weixin.qq.com/s?__biz=MzI4Njc5NjM1NQ==&mid=2247490867&idx=2&sn=360579d8ac0b9893b00afaee1865ee68&chksm=ebd6221fdca1ab09ae179a8949c8ccb6734d8632503e6f04fc404ae6ef794fd5e49ab26964ef&scene=21#wechat_redirect)》这篇文章。

## 数据源没有配置事务管理器

如下代码所示，当前数据源若没有配置事务管理器，那也是白搭！

```java
@Bean  
public PlatformTransactionManager transactionManager(DataSource dataSource) {  
    return new DataSourceTransactionManager(dataSource);  
}  
```

## @Transactional的扩展配置不支持事务

`Propagation.NOT_SUPPORTED`：表示不以事务运行，当前若存在事务则挂起。这表示不支持以事务的方式运行，所以即使事务生效也是白搭！

```java
@Service  
public class OrderServiceImpl implements OrderService {  
   
    @Transactional  
    public void update(Order order) {  
        updateOrder(order);  
    }  
   
    @Transactional(propagation = Propagation.NOT_SUPPORTED)  
    public void updateOrder(Order order) {  
        // update order  
    }  
   
}  
```

## 异常被吃了

这个也是出现比较多的场景：把异常吃了，然后又不抛出来，事务也不会回滚！

```java
@Service  
public class OrderServiceImpl implements OrderService {  
   
    @Transactional  
    public void updateOrder(Order order) {  
        try {  
            // update order  
        } catch {  
   
        }  
    }  
   
}  
```

## 异常类型错误

接上面的例子，再抛出一个异常

```java
@Service  
public class OrderServiceImpl implements OrderService {  
   
    @Transactional  
    public void updateOrder(Order order) {  
        try {  
            // update order  
        } catch {  
            throw new Exception("更新错误");  
        }  
    }  
   
}  
```

这样事务也是不生效的，因为默认回滚的是：`RuntimeException`，如果你想触发其他异常的回滚，需要在注解上配置一下，如：

```java
@Transactional(rollbackFor = Exception.class)  
```

这个配置仅限于 Throwable 异常类及其子类。本文总结了 8 种事务失效的场景，其实发生最多就是自身调用、异常被吃、异常抛出类型不对这 3 个了，像文章开头说的那样，本文不一定总结得全，只是总结常见的事务失效的场景，如果你还知道其他场景也欢迎留言分享。



# 解决大事务问题

[让人头痛的大事务问题到底要如何解决？ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzkwNjMwMTgzMQ==&mid=2247490259&idx=1&sn=1dd11c5f49103ca303a61fc82ce406e0&chksm=c0ebc23bf79c4b2db58b28ef752560bd91a1932ceb6713c9b19b821db0f29e1c58275d334076&token=2041133408&lang=zh_CN&scene=21#wechat_redirect)

## 大事务引发的问题

在分享解决办法之前，先看看系统中如果出现大事务可能会引发哪些问题

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022/202204211825734.png" alt="image-20220421182555608" style="zoom:67%;" />

从上图可以看出如果系统中出现大事务时，问题还不小，所以我们在实际项目开发中应该尽量避免大事务的情况。如果我们已有系统中存在大事务问题，该如何解决呢？



## 解决办法

### 少用@Transactional注解

大家在实际项目开发中，我们在业务方法加上`@Transactional`注解开启事务功能，这是非常普遍的做法，它被称为`声明式事务`。

部分代码如下：

```java
@Transactional(rollbackFor=Exception.class)
public void save(User user) {
     doSameThing...
}
```

然而，我要说的第一条是：少用`@Transactional`注解。

为什么？

1. 我们知道`@Transactional`注解是通过`spring`的`aop`起作用的，但是如果使用不当，事务功能可能会失效。如果恰巧你经验不足，这种问题不太好排查。至于事务哪些情况下会失效，可以参考我之前写的《[spring事务的这10种坑，你稍不注意可能就会踩中！！！](http://mp.weixin.qq.com/s?__biz=MzUxODkzNTQ3Nw==&mid=2247483852&idx=1&sn=e39ff9c4778c1d948347b725e539f8d4&chksm=f9800716cef78e00a8ba890694e030fa910e1fcabe50cac5a9db3c9aaab6b368916a87fa15dd&scene=21#wechat_redirect)》这篇文章。
2. `@Transactional`注解一般加在某个业务方法上，会导致整个业务方法都在同一个事务中，粒度太粗，不好控制事务范围，是出现大事务问题的最常见的原因。

那我们该怎么办呢？

可以使用`编程式事务`，在`spring`项目中使用`TransactionTemplate`类的对象，手动执行事务。

部分代码如下：

```java
   @Autowired
   private TransactionTemplate transactionTemplate;
   
   ...
   
   public void save(final User user) {
         transactionTemplate.execute((status) => {
            doSameThing...
            return Boolean.TRUE;
         })
   }
```

从上面的代码中可以看出，使用`TransactionTemplate`的`编程式事务`功能自己灵活控制事务的范围，是避免大事务问题的首选办法。

当然，我说少使用`@Transactional`注解开启事务，并不是说一定不能用它，如果项目中有些业务逻辑比较简单，而且不经常变动，使用`@Transactional`注解开启事务开启事务也无妨，因为它更简单，开发效率更高，但是千万要小心事务失效的问题。



### 将查询(select)方法放到事务外

如果出现大事务，可以将查询(select)方法放到事务外，也是比较常用的做法，因为一般情况下这类方法是不需要事务的。

比如出现如下代码：

```java
@Transactional(rollbackFor=Exception.class)
public void save(User user) {
     queryData1();
     queryData2();
     addData1();
     updateData2();
}
```

可以将`queryData1`和`queryData2`两个查询方法放在事务外执行，将真正需要事务执行的代码才放到事务中，比如：`addData1`和`updateData2`方法，这样就能有效的减少事务的粒度。

如果使用`TransactionTemplate`的`编程式事务`这里就非常好修改。

```java
   @Autowired
   private TransactionTemplate transactionTemplate;
   
   ...
   
   public void save(final User user) {
         queryData1();
         queryData2();
         transactionTemplate.execute((status) => {
            addData1();
            updateData2();
            return Boolean.TRUE;
         })
   }
```

但是如果你实在还是想用`@Transactional`注解，该怎么拆分呢？

```java
public void save(User user) {
         queryData1();
         queryData2();
         doSave();
    }
   
    @Transactional(rollbackFor=Exception.class)
    public void doSave(User user) {
       addData1();
       updateData2();
    }
```

这个例子是非常经典的错误，这种直接方法调用的做法事务不会生效，给正在坑中的朋友提个醒。因为`@Transactional`注解的声明式事务是通过`spring aop`起作用的，而`spring aop`需要生成代理对象，直接方法调用使用的还是原始对象，所以事务不会生效。

有没有办法解决这个问题呢？

1.新加一个Service方法

这个方法非常简单，只需要新加一个Service方法，把`@Transactional`注解加到新Service方法上，把需要事务执行的代码移到新方法中。具体代码如下：

```java
@Servcie
publicclass ServiceA {
     @Autowired
     prvate ServiceB serviceB;
  
     public void save(User user) {
           queryData1();
           queryData2();
           serviceB.doSave(user);
     }
   }
   
   @Servcie
   publicclass ServiceB {
   
      @Transactional(rollbackFor=Exception.class)
      public void doSave(User user) {
         addData1();
         updateData2();
      }
   
   }
```

2.在该Service类中注入自己

如果不想再新加一个Service类，在该Service类中注入自己也是一种选择。具体代码如下：

```java
@Servcie
  publicclass ServiceA {
     @Autowired
     prvate ServiceA serviceA;
  
     public void save(User user) {
           queryData1();
           queryData2();
           serviceA.doSave(user);
     }
     
     @Transactional(rollbackFor=Exception.class)
     public void doSave(User user) {
         addData1();
         updateData2();
      }
   }
```

可能有些人可能会有这样的疑问：这种做法会不会出现循环依赖问题？

其实`spring ioc`内部的三级缓存保证了它，不会出现循环依赖问题。如果你想进一步了解循环依赖问题，可以看看我之前文章《[spring解决循环依赖为什么要用三级缓存？](http://mp.weixin.qq.com/s?__biz=MzUxODkzNTQ3Nw==&mid=2247483837&idx=1&sn=e5cefc6653a94995f4bc1424ab1087ce&chksm=f9800767cef78e714e974b4fd059915e0bb7962a2a28a9cd657494d9c73fa5a8288a31831973&scene=21#wechat_redirect)》。

3.在该Service类中使用AopContext.currentProxy()获取代理对象

上面的方法2确实可以解决问题，但是代码看起来并不直观，还可以通过在该Service类中使用AOPProxy获取代理对象，实现相同的功能。具体代码如下：

```java
@Servcie
  publicclass ServiceA {
  
     public void save(User user) {
           queryData1();
           queryData2();
           ((ServiceA)AopContext.currentProxy()).doSave(user);
     }
     
     @Transactional(rollbackFor=Exception.class)
     public void doSave(User user) {
         addData1();
         updateData2();
      }
   }
```

### 事务中避免远程调用

我们在接口中调用其他系统的接口是不能避免的，由于网络不稳定，这种远程调的响应时间可能比较长，如果远程调用的代码放在某个事物中，这个事物就可能是大事务。当然，远程调用不仅仅是指调用接口，还有包括：发MQ消息，或者连接redis、mongodb保存数据等。

```java
@Transactional(rollbackFor=Exception.class)
   public void save(User user) {
         callRemoteApi();
         addData1();
   }
```

远程调用的代码可能耗时较长，切记一定要放在事务之外。

```java
   @Autowired
   private TransactionTemplate transactionTemplate;
   
   ...
   
   public void save(final User user) {
         callRemoteApi();
         transactionTemplate.execute((status) => {
            addData1();
            return Boolean.TRUE;
         })
   }
```

有些朋友可能会问，远程调用的代码不放在事务中如何保证数据一致性呢？这就需要建立：`重试`+`补偿机制`，达到数据`最终一致性`了。

### 事务中避免一次性处理太多数据

如果一个事务中需要处理的数据太多，也会造成大事务问题。比如为了操作方便，你可能会一次批量更新1000条数据，这样会导致大量数据锁等待，特别在高并发的系统中问题尤为明显。

解决办法是分页处理，1000条数据，分50页，一次只处理20条数据，这样可以大大减少大事务的出现。

### 非事务执行

在使用事务之前，我们都应该思考一下，是不是所有的数据库操作都需要在事务中执行？

```java
   @Autowired
   private TransactionTemplate transactionTemplate;
   
   ...
   
   public void save(final User user) {
         transactionTemplate.execute((status) => {
            addData();
            addLog();
            updateCount();
            return Boolean.TRUE;
         })
   }
```

上面的例子中，其实`addLog`增加操作日志方法 和 `updateCount`更新统计数量方法，是可以不在事务中执行的，因为操作日志和统计数量这种业务允许少量数据不一致的情况。

```java
   @Autowired
   private TransactionTemplate transactionTemplate;
   
   ...
   
   public void save(final User user) {
         transactionTemplate.execute((status) => {
            addData();           
            return Boolean.TRUE;
         })
         addLog();
         updateCount();
   }
```

当然大事务中要鉴别出哪些方法可以非事务执行，其实没那么容易，需要对整个业务梳理一遍，才能找出最合理的答案。

### 异步处理

还有一点也非常重要，是不是事务中的所有方法都需要同步执行？我们都知道，方法同步执行需要等待方法返回，如果一个事务中同步执行的方法太多了，势必会造成等待时间过长，出现大事务问题。

看看下面这个列子：

```java
   @Autowired
   private TransactionTemplate transactionTemplate;
   
   ...
   
   public void save(final User user) {
         transactionTemplate.execute((status) => {
            order();
            delivery();
            return Boolean.TRUE;
         })
   }
```

`order`方法用于下单，`delivery`方法用于发货，是不是下单后就一定要马上发货呢？

答案是否定的。

这里发货功能其实可以走mq异步处理逻辑。

```java
   @Autowired
   private TransactionTemplate transactionTemplate;
   
   ...
   
   public void save(final User user) {
         transactionTemplate.execute((status) => {
            order();
            return Boolean.TRUE;
         })
         sendMq();
   }
```

## 总结

本人从网友的一个问题出发，结合自己实际的工作经验分享了处理大事务的6种办法：

1. 少用@Transactional注解
2. 将查询(select)方法放到事务外
3. 事务中避免远程调用
4. 事务中避免一次性处理太多数据
5. 非事务执行
6. 异步处理

# @Transactional 注解

在Spring中进行事务管理非常简单，只需要在方法上加上注解`@Transactional`，Spring就可以自动帮我们进行事务的开启、提交、回滚操作。甚至很多人心里已经将Spring事务与`@Transactional`划上了等号，只要有数据库相关操作就直接给方法加上`@Transactional`注解。

不瞒你说，我之前也一直是这样，直到使用`@Transactional`导致了一次生产事故，而那次生产事故还导致我当月绩效被打了D...

## @Transactional导致的生产事故

19年在公司做了一个内部报销的项目，有这样一个业务逻辑：

1、员工加班打车可以通过滴滴出行企业版直接打车，第二天打车费用可以直接同步到我们的报销平台

2、员工可以在报销平台勾选自己打车费用并创建一张报销单进行报销，创建报销单的同时会创建一条审批流（统一流程平台）让领导审批

当时创建报销单的代码是这么写的：

```java
 /**
 * 保存报销单并创建工作流
 */
@Transactional(rollbackFor = Exception.class)
public void save(RequestBillDTO requestBillDTO){
     //调用流程HTTP接口创建工作流
    workflowUtil.createFlow("BILL",requestBillDTO);
    
    //转换DTO对象
    RequestBill requestBill = JkMappingUtils.convert(requestBillDTO, RequestBill.class);
    requestBillDao.save(requestBill);
    //保存明细表
    requestDetailDao.save(requestBill.getDetail())
}
```

代码非常简单也很 “**优雅**”，先通过http接口调用工作流引擎创建审批流，然后保存报销单，而为了**保证**操作的事务，在整个方法上加上了`@Transactional`注解（**仔细想想，这样真的能保证事务吗？**）。

报销项目属于公司内部项目，本身是没什么高并发的，系统也一直稳定运行着。

在年末的一天下午（前几天刚好下了大雪，打车的人特别多），公司发通知邮件说年度报销窗口即将关闭，需要尽快将未报销的费用报销掉，而刚好那天工作流引擎在进行安全加固。

收到邮件后报销的人开始逐渐增多，在接近下班的时候到达顶峰，此时报销系统开始出现了故障：**数据库监控平台一直收到告警短信，数据库连接不足，出现大量死锁；日志显示调用流程引擎接口出现大量超时；同时一直提示`CannotGetJdbcConnectionException`，数据库连接池连接占满。**

在发生故障后，我们尝试过杀掉死锁进程，也进行过暴力重启，只是不到10分钟故障再次出现，收到大量电话投诉。
最后没办法只能向全员发送停机维护邮件并发送故障报告，而后，绩效被打了个D，惨...。

## 事故原因分析

通过对日志的分析我们很容易就可以定位到故障原因就是保存报销单的save()方法，而罪魁祸首就是那个`@Transactional`注解。

我们知道`@Transactional` 注解，是使用 AOP 实现的，本质就是在目标方法执行前后进行拦截。在目标方法执行前加入或创建一个事务，在执行方法执行后，根据实际情况选择提交或是回滚事务。

当 Spring 遇到该注解时，会自动从数据库连接池中获取 connection，并开启事务然后绑定到 ThreadLocal 上，对于@Transactional注解包裹的整个方法都是**使用同一个connection连接**。如果我们出现了耗时的操作，比如第三方接口调用，业务逻辑复杂，大批量数据处理等就会导致我们我们占用这个connection的时间会很长，数据库连接一直被占用不释放。一旦类似操作过多，就会导致数据库连接池耗尽。

在一个事务中执行RPC操作导致数据库连接池撑爆属于是典型的**长事务问题**，类似的操作还有在事务中进行大量数据查询，业务规则处理等...

**何为长事务？**

顾名思义就是运行时间比较长，长时间未提交的事务，也可以称之为**大事务**。

**长事务会引发哪些问题？**

长事务引发的常见危害有：

1. 数据库连接池被占满，应用无法获取连接资源；
2. 容易引发数据库死锁；
3. 数据库回滚时间长；
4. 在主从架构中会导致主从延时变大。

## 如何避免长事务？

既然知道了长事务的危害，那如何在开发中避免出现长事务问题呢？

很明显，解决长事务的宗旨就是 **对事务方法进行拆分，尽量让事务变小，变快，减小事务的颗粒度。**

既然提到了事务的颗粒度，我们就先回顾一下Spring进行事务管理的方式。

**声明式事务**

首先我们要知道，通过在方法上使用`@Transactional`注解进行事务管理的操作叫**声明式事务** 。

使用声明式事务的**优点** 很明显，就是使用很简单，可以自动帮我们进行事务的开启、提交以及回滚等操作。使用这种方式，程序员只需要关注业务逻辑就可以了。

声明式事务有一个最大的**缺点**，就是事务的颗粒度是整个方法，无法进行精细化控制。

与声明式事务对应的就是**编程式事务**。

基于底层的API，开发者在代码中手动的管理事务的开启、提交、回滚等操作。在spring项目中可以使用`TransactionTemplate`类的对象，手动控制事务。

```
@Autowired 
private TransactionTemplate transactionTemplate; 
 
... 

public void save(RequestBill requestBill) { 
    transactionTemplate.execute(transactionStatus -> {
        requestBillDao.save(requestBill);
        //保存明细表
        requestDetailDao.save(requestBill.getDetail());
        return Boolean.TRUE; 
    });
} 
```

使用编程式事务最大的好处就是可以精细化控制事务范围。

所以避免长事务最简单的方法就是**不要使用声明式事务`@Transactional`，而是使用编程式事务手动控制事务范围。**

有的同学会说，`@Transactional`使用这么简单，有没有办法既可以使用`@Transactional`，又能避免产生长事务？

那就需要对方法进行拆分，将不需要事务管理的逻辑与事务操作分开：

```
@Service
public class OrderService{

    public void createOrder(OrderCreateDTO createDTO){
        query();
        validate();
        saveData(createDTO);
    }
  
  //事务操作
    @Transactional(rollbackFor = Throwable.class)
    public void saveData(OrderCreateDTO createDTO){
        orderDao.insert(createDTO);
    }
}
```

`query()`与`validate()`不需要事务，我们将其与事务方法`saveData()`拆开。

当然，这种拆分会命中使用`@Transactional`注解时事务不生效的经典场景，很多新手非常容易犯这个错误。`@Transactional`注解的声明式事务是通过spring aop起作用的，而spring aop需要生成代理对象，直接在同一个类中方法调用使用的还是原始对象，事务不生效。其他几个常见的事务不生效的场景为：

> - @Transactional 应用在非 public 修饰的方法上
> - @Transactional 注解属性 propagation 设置错误
> - @Transactional 注解属性 rollbackFor 设置错误
> - 同一个类中方法调用，导致@Transactional失效
> - 异常被catch捕获导致@Transactional失效

正确的拆分方法应该使用下面两种：

1. 可以将方法放入另一个类，如新增 `manager层`，通过spring注入，这样符合了在对象之间调用的条件。

```
@Service
public class OrderService{
    @Autowired
   private OrderManager orderManager;

    public void createOrder(OrderCreateDTO createDTO){
        query();
        validate();
        orderManager.saveData(createDTO);
    }
}

@Service
public class OrderManager{
  
    @Autowired
   private OrderDao orderDao;
  
  @Transactional(rollbackFor = Throwable.class)
    public void saveData(OrderCreateDTO createDTO){
        orderDao.saveData(createDTO);
    }
}
```



1. 启动类添加`@EnableAspectJAutoProxy(exposeProxy = true)`，方法内使用`AopContext.currentProxy()`获得代理类，使用事务。

```
SpringBootApplication.java

@EnableAspectJAutoProxy(exposeProxy = true)
@SpringBootApplication
public class SpringBootApplication {}
OrderService.java
  
public void createOrder(OrderCreateDTO createDTO){
    OrderService orderService = (OrderService)AopContext.currentProxy();
    orderService.saveData(createDTO);
}
```

## 小结

使用`@Transactional`注解在开发时确实很方便，但是稍微不注意就可能出现长事务问题。所以对于复杂业务逻辑，我这里更建议你使用编程式事务来管理事务，当然，如果你非要使用`@Transactional`，可以根据上文提到的两种方案进行方法拆分。



# @Autowired报错的4种解决方案

注入mapper接口报错

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061746268.png" alt="image-20220706174612205" style="zoom:50%;" />

上图的报错信息相信大部分程序员都遇到过，**奇怪的是虽然代码报错，但丝毫不影响程序的正常执行**，也就是虽然编译器 IDEA 报错，但程序却能正常的执行，那这其中的原因又是为何？

## 报错原因分析

报错的原因首先是因为 IDEA 强大的报警机制，@Autowired 为 Spring 的注解，含义是将某类动态的注入到当前类中，如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061746618.png" alt="image-20220706174640558" style="zoom:50%;" />

@Autowired 默认是根据 type 进行注入，并且注入时要求（注入）对象不能为 NULL，默认值如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061746060.png" alt="image-20220706174650999" style="zoom:50%;" />

而 **IDEA 报错的原因是：@Autowired 为 Spring 的注解，而注入的 Mapper 对象使用的又是 @Mapper 的注解，然而 @Mapper 又为 MyBaits 的注解，IDEA 能很好的兼容并识别 Spring 的注解，但不能很好的识别 MyBatis 的注解，因此在使用 @Autowired 注解时，IDEA 并不能检测到 @Mapper 注解的对象不为 NULL，因此就会报错。**
<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061747911.png" alt="image-20220706174710840" style="zoom:50%;" />

这就是为什么使用 Spring 的注解 @Repository/@Component... 不报错，而使用 @Mapper 注解却会报错的根本原因，如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061747556.png" alt="image-20220706174747492" style="zoom:50%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061748311.png" alt="image-20220706174807224" style="zoom:50%;" />



## 解决方案1：关闭报警机制

关闭 IDEA 注入报警机制，可以避免报错，实现步骤如下。

1.打开 IDEA，找到参数设置选项 “Preferences...” ，如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061748452.png" alt="image-20220706174822240" style="zoom:50%;" />

2.依次选择 “Editor” -> “Inspections” -> “Spring” -> “Spring Core” -> “Code” -> “Autowiring for bean class” 将 “Error” 级别修改成 “Waring” 级别，如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061748877.png" alt="image-20220706174833788" style="zoom:50%;" />

设置完成之后点击确认，查看之前报错的 Mapper 类，此时展示效果如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061748519.png" alt="image-20220706174843470" style="zoom:50%;" />

报错信息消失了。



## 解决方案2：添加Spring注解

在 Mapper 的类上添加 Spring 的注解，也可以解决 IDEA 报错的问题，如 @Repository 或 @Component 这类注解，如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061745921.png" alt="image-20220706174552854" style="zoom:50%;" />

或使用 @Repository 注解，如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061745405.png" alt="image-20220706174540340" style="zoom:50%;" />

查看之前的报错信息：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061745736.png" alt="image-20220706174529687" style="zoom:50%;" />

报错消失了。

## 解决方案3：允许注入对象为NULL

设置允许注入的 Mapper 对象为 NULL，也可以避免 IDEA 报错，只需要设置 @Autowired(required=false) 即可，如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061745112.png" alt="image-20220706174515049" style="zoom:50%;" />

（其中 userMapper2 对象就不报错了）

- @Autowired(required=true)：表示当使用 @Autowired 注解的时候，该 bean 必须存在，否则注入失败，默认值。
- @Autowired(required=false)：表示忽略当前要注入的 bean，如果有直接注入，没有则跳过，不会报错。

@Autowired 默认值的实现源码：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061745131.png" alt="image-20220706174503064" style="zoom:50%;" />

## 解决方案4：使用@Resource注解

使用 @Resource 注解替换 @Autowired 注解也可以避免报错，它们的对比效果如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061744418.png" alt="image-20220706174449355" style="zoom: 50%;" />

@Resource 注解和 @Autowired 注解以当前的场景来说，它们的主要区别是 @Resource 是 Java 自身提供的注解，而 @Autowired 是 Spring 提供的注解，@Autowired 默认值为 required=true，所以必须要一个非 NULL 的对象，当 IDEA 检测不到对象为 NULL 时就会报错，而 @Resource 并没有这项要求。

## 总结

> 使用 @Autowired 注解导入 Mapper 对象报错的原因，是因为 @Autowired 默认情况下，需要注入一个非 NULL 的对象，而被 @Mapper 修饰的类为 MyBatis 的注解，IDEA 并不能很好的识别其为非 NULL 对象，因此就会报错。当然，它的解决方案也有很多，推荐使用 @Resource 替代 @Autowired 注解的方式来解决此问题。

# @Service详解

> Spring中如Service有多个实现类，它怎么知道该注入哪个ServiceImpl类？

## 三个方法

**方法一：** Controller中注入service的时候使用@Autowired自动注入，`@Qualifier("beanId")`来指定注入哪一个。

**方法二：** Controller中注入service的时候使用`@Resource(type = 类名.class)`来指定注入哪一个。

**方法三：**

1. 每个service的impl都可以指定名称（使用`@Service（“名称”）`）
2. Controller中注入service的时候使用名称来指定注入哪一个（使用`@Resource(name="名称")`）。

**@Service注解，其实做了两件事情：**

1、声明TeacherServiceImpl.java是一个bean。因为TeacherServiceImpl .java是一个bean，其他的类才可以使用@Autowired将TeacherServiceImpl 作为一个成员变量自动注入。

2、TeacherServiceImpl.java在bean中的id是"teacherServiceImpl "，即类名且首字母小写。

> 注意：不能有同名的，不然要报错。

**@Autowired注解的意思就是:**

当Spring发现`@Autowired`注解时，将自动在代码上下文中找到和其匹配（默认是类型匹配）的Bean，并自动注入到相应的地方去。

`@Resource`的作用相当于`@Autowired`。

**@Autowired和@Resource两个注解的区别：**

1.`@Autowired`是Spring的注解，`@Resource`是J2EE的注解，这个看一下导入注解的时候这两个注解的包名就一清二楚了。

2.`@Autowired`默认按照byType方式进行bean匹配，`@Resource`默认按照byName方式进行bean匹配。

3.@Autowired默认情况下必须要求依赖对象必须存在，如果要允许null值，可以设置它的required属性为false，如：`@Autowired(required=false)`。

## 代码实现

#### 方法一代码如下

接口

```java
public interface HumanService {
    public String name();
}
```

接口实现类

```java
@Service
public class TeacherServiceImpl implements HumanService {
    @Override
    public String name() {
        System.out.println("teacher");
        return "teacher";
    }
}
@Service
public class DoctorServiceImpl implements HumanService {
    @Override
    public String name() {
        System.out.println("doctor");
        return "doctor";
    }
}
```

控制器

```java
@RestController
public class HumanController {
//    @Resource(type = DoctorServiceImpl.class) //方法二
    @Autowired
    @Qualifier("teacherServiceImpl")
    private HumanService humanService;

    @RequestMapping("/name")
    public String name(){
        return humanService.name();
    }
}
```

#### 方法三代码如下

接口

```java
public interface HumanService {
    public String name();
}
```

接口实现类

```java
@Service("teacherService")
public class TeacherServiceImpl implements HumanService {
    @Override
    public String name() {
        System.out.println("teacher");
        return "teacher";
    }
}
@Service("doctorService")
public class DoctorServiceImpl implements HumanService {
    @Override
    public String name() {
        System.out.println("doctor");
        return "doctor";
    }
}
```

控制器

```java
@RestController
public class HumanController {

    @Resource(name="doctorService")
    private HumanService humanService;

    @RequestMapping("/name")
    public String name(){
        return humanService.name();
    }
}
```





# 11个小技巧，玩转Spring

## 前言

最近有些读者私信我说希望后面多分享spring方面的文章，这样能够在实际工作中派上用场。正好我对spring源码有过一定的研究，并结合我这几年实际的工作经验，把spring中我认为不错的知识点总结一下，希望对您有所帮助。

## 一 如何获取spring容器对象

### 1.实现BeanFactoryAware接口

```java
@Service
public class PersonService implements BeanFactoryAware {
    private BeanFactory beanFactory;

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        this.beanFactory = beanFactory;
    }

    public void add() {
        Person person = (Person) beanFactory.getBean("person");
    }
}
```

实现接口，然后重写方法，就能从该方法中获取到spring容器对象。`BeanFactoryAware``setBeanFactory`

### 2.实现ApplicationContextAware接口

```java
@Service
public class PersonService2 implements ApplicationContextAware {
    private ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws 
        BeansException {
        this.applicationContext = applicationContext;
    }

    public void add() {
        Person person = (Person) applicationContext.getBean("person");
    }

}
```

实现接口，然后重写方法，也能从该方法中获取到spring容器对象。`ApplicationContextAware``setApplicationContext`

### 3.实现ApplicationListener接口

```java
@Service
public class PersonService3 implements ApplicationListener<ContextRefreshedEvent> {
    private ApplicationContext applicationContext;


    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        applicationContext = event.getApplicationContext();
    }

    public void add() {
        Person person = (Person) applicationContext.getBean("person");
    }

}
```

实现接口，需要注意的是该接口接收的泛型是类，然后重写方法，也能从该方法中获取到spring容器对象。`ApplicationListener``ContextRefreshedEvent``onApplicationEvent`

此外，不得不提一下接口，它其实是一个空接口，里面不包含任何方法。`Aware`

它表示已感知的意思，通过这类接口可以获取指定对象，比如：

- 通过BeanFactoryAware获取BeanFactory
- 通过ApplicationContextAware获取ApplicationContext
- 通过BeanNameAware获取BeanName等

Aware接口是很常用的功能，目前包含如下功能：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061812197.png" alt="image-20220706181224112" style="zoom:50%;" />

## 二 如何初始化bean 

spring中支持3种初始化bean的方法：

- xml中指定init-method方法
- 使用@PostConstruct注解
- 实现InitializingBean接口

第一种方法太古老了，现在用的人不多，具体用法就不介绍了。

### 1.使用@PostConstruct注解

```java
@Service
public class AService {

    @PostConstruct
    public void init() {
        System.out.println("===初始化===");
    }
}
```

在需要初始化的方法上增加注解，这样就有初始化的能力。`@PostConstruct`

### 2.实现InitializingBean接口

```java
@Service
public class BService implements InitializingBean {

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("===初始化===");
    }
}
```

实现接口，重写方法，该方法中可以完成初始化功能。`InitializingBean``afterPropertiesSet`

这里顺便抛出一个有趣的问题：、 和 的执行顺序是什么样的？`init-method``PostConstruct``InitializingBean`

决定他们调用顺序的关键代码在类的方法中。`AbstractAutowireCapableBeanFactory``initializeBean`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061813599.png" alt="image-20220706181311516" style="zoom:67%;" />

这段代码中会先调用的方法，而是通过实现的，它就是一个，所以先执行。`BeanPostProcessor``postProcessBeforeInitialization``PostConstruct``InitDestroyAnnotationBeanPostProcessor``BeanPostProcessor``PostConstruct`

而方法中的代码：`invokeInitMethods`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061813936.png" alt="image-20220706181325830" style="zoom:50%;" />

决定了先调用，再调用。`InitializingBean``init-method`

所以得出结论，他们的调用顺序是：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061813740.png" alt="image-20220706181342606" style="zoom: 33%;" />

## 三 自定义自己的Scope

我们都知道默认支持的只有两种：`spring``Scope`

- singleton 单例，每次从spring容器中获取到的bean都是同一个对象。
- prototype 多例，每次从spring容器中获取到的bean都是不同的对象。

```c
spring web`又对进行了扩展，增加了：`Scope
```

- RequestScope 同一次请求从spring容器中获取到的bean都是同一个对象。
- SessionScope 同一个会话从spring容器中获取到的bean都是同一个对象。

即便如此，有些场景还是无法满足我们的要求。

比如，我们想在同一个线程中从spring容器获取到的bean都是同一个对象，该怎么办？

这就需要自定义了。`Scope`

第一步实现接口：`Scope`

```java
public class ThreadLocalScope implements Scope {

    private static final ThreadLocal THREAD_LOCAL_SCOPE = new ThreadLocal();

    @Override
    public Object get(String name, ObjectFactory<?> objectFactory) {
        Object value = THREAD_LOCAL_SCOPE.get();
        if (value != null) {
            return value;
        }

        Object object = objectFactory.getObject();
        THREAD_LOCAL_SCOPE.set(object);
        return object;
    }

    @Override
    public Object remove(String name) {
        THREAD_LOCAL_SCOPE.remove();
        return null;
    }

    @Override
    public void registerDestructionCallback(String name, Runnable callback) {

    }

    @Override
    public Object resolveContextualObject(String key) {
        return null;
    }

    @Override
    public String getConversationId() {
        return null;
    }
}
```

第二步将新定义的注入到spring容器中：`Scope`

```java
@Component
public class ThreadLocalBeanFactoryPostProcessor implements BeanFactoryPostProcessor {

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws 
        BeansException {
        beanFactory.registerScope("threadLocalScope", new ThreadLocalScope());
    }
}
```

第三步使用新定义的：`Scope`

```java
@Scope("threadLocalScope")
@Service
public class CService {

    public void add() {
    }
}
```

## 四 别说FactoryBean没用

说起就不得不提，因为面试官老喜欢问它们的区别。`FactoryBean``BeanFactory`

- BeanFactory：spring容器的顶级接口，管理bean的工厂。
- FactoryBean：并非普通的工厂bean，它隐藏了实例化一些复杂Bean的细节，给上层应用带来了便利。

如果你看过spring源码，会发现它有70多个地方在用FactoryBean接口。

![图片](https://mmbiz.qpic.cn/mmbiz_png/uL371281oDELdgnZC2EVRmh8HYBrPD7vTVYWc3BZ64373MkUZRhVDe8w0uA6s9k7RSwl5siabkvMVRVa4ycpKMg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

上面这张图足以说明该接口的重要性，请勿忽略它好吗？

特别提一句：的对象就是通过类创建的。`mybatis``SqlSessionFactory``SqlSessionFactoryBean`

我们一起定义自己的：`FactoryBean`

```
@Component
public class MyFactoryBean implements FactoryBean {

    @Override
    public Object getObject() throws Exception {
        String data1 = buildData1();
        String data2 = buildData2();
        return buildData3(data1, data2);
    }

    private String buildData1() {
        return "data1";
    }

    private String buildData2() {
        return "data2";
    }

    private String buildData3(String data1, String data2) {
        return data1 + data2;
    }


    @Override
    public Class<?> getObjectType() {
        return null;
    }
}
```

获取实例对象：`FactoryBean`

```
@Service
public class MyFactoryBeanService implements BeanFactoryAware {
    private BeanFactory beanFactory;

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        this.beanFactory = beanFactory;
    }

    public void test() {
        Object myFactoryBean = beanFactory.getBean("myFactoryBean");
        System.out.println(myFactoryBean);
        Object myFactoryBean1 = beanFactory.getBean("&myFactoryBean");
        System.out.println(myFactoryBean1);
    }
}
```

- `getBean("myFactoryBean");`获取的是MyFactoryBeanService类中getObject方法返回的对象，
- `getBean("&myFactoryBean");`获取的才是MyFactoryBean对象。

## 五 轻松自定义类型转换

spring目前支持3中类型转换器：

- Converter<S,T>：将 S 类型对象转为 T 类型对象
- ConverterFactory<S, R>：将 S 类型对象转为 R 类型及子类对象
- GenericConverter：它支持多个source和目标类型的转化，同时还提供了source和目标类型的上下文，这个上下文能让你实现基于属性上的注解或信息来进行类型转换。

这3种类型转换器使用的场景不一样，我们以为例。假如：接口中接收参数的实体对象中，有个字段的类型是Date，但是实际传参的是字符串类型：2021-01-03 10:20:15，要如何处理呢？`Converter<S,T>`

第一步，定义一个实体：`User`

```java
@Data
public class User {
    private Long id;
    private String name;
    private Date registerDate;
}
```

第二步，实现接口：`Converter`

```java
public class DateConverter implements Converter<String, Date> {

    private SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Override
    public Date convert(String source) {
        if (source != null && !"".equals(source)) {
            try {
                simpleDateFormat.parse(source);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        return null;
    }
}
```

第三步，将新定义的类型转换器注入到spring容器中：

```java
@Configuration
public class WebConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new DateConverter());
    }
}
```

第四步，调用接口

```java
@RequestMapping("/user")
@RestController
public class UserController {

    @RequestMapping("/save")
    public String save(@RequestBody User user) {
        return "success";
    }
}
```

请求接口时对象中字段会被自动转换成类型。`User``registerDate``Date`

## 六 spring mvc拦截器，用过的都说好

spring mvc拦截器根spring拦截器相比，它里面能够获取和 等web对象实例。`HttpServletRequest``HttpServletResponse`

spring mvc拦截器的顶层接口是：，包含三个方法：`HandlerInterceptor`

- preHandle 目标方法执行前执行
- postHandle 目标方法执行后执行
- afterCompletion 请求完成时执行

为了方便我们一般情况会用HandlerInterceptor接口的实现类类。`HandlerInterceptorAdapter`

假如有权限认证、日志、统计的场景，可以使用该拦截器。

第一步，继承类定义拦截器：`HandlerInterceptorAdapter`

```java
public class AuthInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, 
    Object handler)
            throws Exception {
        String requestUrl = request.getRequestURI();
        if (checkAuth(requestUrl)) {
            return true;
        }

        return false;
    }

    private boolean checkAuth(String requestUrl) {
        System.out.println("===权限校验===");
        return true;
    }
}
```

第二步，将该拦截器注册到spring容器：

```java
@Configuration
public class WebAuthConfig extends WebMvcConfigurerAdapter {
 
    @Bean
    public AuthInterceptor getAuthInterceptor() {
        return new AuthInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new AuthInterceptor());
    }
}
```

第三步，在请求接口时spring mvc通过该拦截器，能够自动拦截该接口，并且校验权限。

该拦截器其实相对来说，比较简单，可以在类的方法中看到调用过程：`DispatcherServlet``doDispatch`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061820097.png" alt="image-20220706182015976" style="zoom:50%;" />

顺便说一句，这里只讲了spring mvc的拦截器，并没有讲spring的拦截器，是因为我有点小私心，后面就会知道。

## 七 Enable开关真香

不知道你有没有用过开头的注解，比如：、、等，这类注解就像开关一样，只要在定义的配置类上加上这类注解，就能开启相关的功能。`Enable``EnableAsync``EnableCaching``EnableAspectJAutoProxy``@Configuration`

是不是很酷？

让我们一起实现一个自己的开关：

第一步，定义一个LogFilter：

```java
public class LogFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
    throws IOException, ServletException {
        System.out.println("记录请求日志");
        chain.doFilter(request, response);
        System.out.println("记录响应日志");
    }

    @Override
    public void destroy() {
        
    }
}
```

第二步，注册LogFilter：

```java
@ConditionalOnWebApplication
public class LogFilterWebConfig {

    @Bean
    public LogFilter timeFilter() {
        return new LogFilter();
    }
}
```

注意，这里用了注解，没有直接使用注解。`@ConditionalOnWebApplication``@Configuration`

第三步，定义开关注解：`@EnableLog`

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Import(LogFilterWebConfig.class)
public @interface EnableLog {

}
```

第四步，只需在启动类加上注解即可开启LogFilter记录请求和响应日志的功能。`springboot``@EnableLog`

## 八 RestTemplate拦截器的春天

我们使用调用远程接口时，有时需要在中传递信息，比如：traceId，source等，便于在查询日志时能够串联一次完整的请求链路，快速定位问题。`RestTemplate``header`

这种业务场景就能通过接口实现，具体做法如下：`ClientHttpRequestInterceptor`

第一步，实现接口：`ClientHttpRequestInterceptor`

```java
public class RestTemplateInterceptor implements ClientHttpRequestInterceptor {

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body,
                                        ClientHttpRequestExecution execution)
        throws IOException {
        request.getHeaders().set("traceId", MdcUtil.get());
        return execution.execute(request, body);
    }
}
```

第二步，定义配置类：

```java
@Configuration
public class RestTemplateConfiguration {

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setInterceptors(Collections.singletonList(restTemplateInterceptor()));
        return restTemplate;
    }

    @Bean
    public RestTemplateInterceptor restTemplateInterceptor() {
        return new RestTemplateInterceptor();
    }
}
```

其中MdcUtil其实是利用工具在中存储和获取traceId`MDC``ThreadLocal`

```java
public class MdcUtil {

    private static final String TRACE_ID = "TRACE_ID";

    public static String get() {
        return MDC.get(TRACE_ID);
    }

    public static void add(String value) {
        MDC.put(TRACE_ID, value);
    }
}
```

当然，这个例子中没有演示MdcUtil类的add方法具体调的地方，我们可以在filter中执行接口方法之前，生成traceId，调用MdcUtil类的add方法添加到中，然后在同一个请求的其他地方就能通过MdcUtil类的get方法获取到该traceId。`MDC`

## 九 统一异常处理

以前我们在开发接口时，如果出现异常，为了给用户一个更友好的提示，例如：

```java
@RequestMapping("/test")
@RestController
public class TestController {

    @GetMapping("/add")
    public String add() {
        int a = 10 / 0;
        return "成功";
    }
}
```

如果不做任何处理请求add接口结果直接报错：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061818201.png" alt="image-20220706181842120" style="zoom:67%;" />

what？用户能直接看到错误信息？

这种交互方式给用户的体验非常差，为了解决这个问题，我们通常会在接口中捕获异常：

```java
@GetMapping("/add")
public String add() {
        String result = "成功";
        try {
            int a = 10 / 0;
        } catch (Exception e) {
            result = "数据异常";
        }
        return result;
}
```

接口改造后，出现异常时会提示：“数据异常”，对用户来说更友好。

看起来挺不错的，但是有问题。。。

如果只是一个接口还好，但是如果项目中有成百上千个接口，都要加上异常捕获代码吗？

答案是否定的，这时全局异常处理就派上用场了：。`RestControllerAdvice`

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public String handleException(Exception e) {
        if (e instanceof ArithmeticException) {
            return "数据异常";
        }
        if (e instanceof Exception) {
            return "服务器内部异常";
        }
        retur nnull;
    }
}
```

只需在方法中处理异常情况，业务接口中可以放心使用，不再需要捕获异常（有人统一处理了）。真是爽歪歪。`handleException`

## 十 异步也可以这么优雅

以前我们在使用异步功能时，通常情况下有三种方式：

- 继承Thread类
- 实现Runable接口
- 使用线程池

让我们一起回顾一下：

1. 继承Thread类

```java
public class MyThread extends Thread {

    @Override
    public void run() {
        System.out.println("===call MyThread===");
    }

    public static void main(String[] args) {
        new MyThread().start();
    }
}
```

1. 实现Runable接口

```java
public class MyWork implements Runnable {
    @Override
    public void run() {
        System.out.println("===call MyWork===");
    }

    public static void main(String[] args) {
        new Thread(new MyWork()).start();
    }
}
```

1. 使用线程池

```java
public class MyThreadPool {

    private static ExecutorService executorService = new ThreadPoolExecutor(1, 5, 60, TimeUnit.SECONDS, new ArrayBlockingQueue<>(200));

    static class Work implements Runnable {

        @Override
        public void run() {
            System.out.println("===call work===");
        }
    }

    public static void main(String[] args) {
        try {
            executorService.submit(new MyThreadPool.Work());
        } finally {
            executorService.shutdown();
        }

    }
}
```

这三种实现异步的方法不能说不好，但是spring已经帮我们抽取了一些公共的地方，我们无需再继承类或实现接口，它都搞定了。`Thread``Runable`

如何spring异步功能呢？

第一步，springboot项目启动类上加注解。`@EnableAsync`

```java
@EnableAsync
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        new SpringApplicationBuilder(Application.class).web(WebApplicationType.SERVLET).run(args);
    }
}
```

第二步，在需要使用异步的方法上加上注解：`@Async`

```java
@Service
public class PersonService {

    @Async
    public String get() {
        System.out.println("===add==");
        return "data";
    }
}
```

然后在使用的地方调用一下：personService.get();就拥有了异步功能，是不是很神奇。

默认情况下，spring会为我们的异步方法创建一个线程去执行，如果该方法被调用次数非常多的话，需要创建大量的线程，会导致资源浪费。

这时，我们可以定义一个线程池，异步方法将会被自动提交到线程池中执行。

```java
@Configuration
public class ThreadPoolConfig {

    @Value("${thread.pool.corePoolSize:5}")
    private int corePoolSize;

    @Value("${thread.pool.maxPoolSize:10}")
    private int maxPoolSize;

    @Value("${thread.pool.queueCapacity:200}")
    private int queueCapacity;

    @Value("${thread.pool.keepAliveSeconds:30}")
    private int keepAliveSeconds;

    @Value("${thread.pool.threadNamePrefix:ASYNC_}")
    private String threadNamePrefix;

    @Bean
    public Executor MessageExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(corePoolSize);
        executor.setMaxPoolSize(maxPoolSize);
        executor.setQueueCapacity(queueCapacity);
        executor.setKeepAliveSeconds(keepAliveSeconds);
        executor.setThreadNamePrefix(threadNamePrefix);
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();
        return executor;
    }
}
```

spring异步的核心方法：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061817751.png" alt="image-20220706181753648" style="zoom:50%;" />

根据返回值不同，处理情况也不太一样，具体分为如下情况：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061817292.png" alt="image-20220706181729211" style="zoom:67%;" />

## 十一 听说缓存好用，没想到这么好用 

spring cache架构图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061814216.png" alt="image-20220706181447095" style="zoom:50%;" />

它目前支持多种缓存：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061815280.png" alt="image-20220706181500197" style="zoom:50%;" />

我们在这里以为例，它是官方推荐的。`caffeine``spring`

第一步，引入的相关jar包`caffeine`

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
<dependency>
    <groupId>com.github.ben-manes.caffeine</groupId>
    <artifactId>caffeine</artifactId>
    <version>2.6.0</version>
</dependency>
```

第二步，配置，开启`CacheManager``EnableCaching`

```java
@Configuration
@EnableCaching
public class CacheConfig {
    @Bean
    public CacheManager cacheManager(){
        CaffeineCacheManager cacheManager = new CaffeineCacheManager();
        //Caffeine配置
        Caffeine<Object, Object> caffeine = Caffeine.newBuilder()
                //最后一次写入后经过固定时间过期
                .expireAfterWrite(10, TimeUnit.SECONDS)
                //缓存的最大条数
                .maximumSize(1000);
        cacheManager.setCaffeine(caffeine);
        return cacheManager;
    }
}
```

第三步，使用注解获取数据`Cacheable`

```java
@Service
public class CategoryService {
   
   //category是缓存名称,#type是具体的key，可支持el表达式
   @Cacheable(value = "category", key = "#type")
   public CategoryModel getCategory(Integer type) {
       return getCategoryByType(type);
   }

   private CategoryModel getCategoryByType(Integer type) {
       System.out.println("根据不同的type:" + type + "获取不同的分类数据");
       CategoryModel categoryModel = new CategoryModel();
       categoryModel.setId(1L);
       categoryModel.setParentId(0L);
       categoryModel.setName("电器");
       categoryModel.setLevel(3);
       return categoryModel;
   }
}
```

调用categoryService.getCategory()方法时，先从缓存中获取数据，如果能够获取到数据则直接返回该数据，不会进入方法体。如果不能获取到数据，则直接方法体中的代码获取到数据，然后放到缓存中。



# @Autowired & @Resource

[相比 @Autowired，为什么更推荐你使用 @Resource ？](https://mp.weixin.qq.com/s?__biz=MzI4Njc5NjM1NQ==&mid=2247539328&idx=2&sn=cc10fd6fb34b4a9a470f8704ee3185d0&chksm=ebd565acdca2ecbad61fa5323b6f135098bb74fecb5a36c90696516bb0bd093932b03c48361d&mpshare=1&scene=23&srcid=05104HsHcSt3R6Pz4qEHHcCD&sharer_sharetime=1683684581486&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

## 区别

> `@Autowired` 和 `@Resource` 注解都是做bean注入时使用的！其中`@Autowired`时Spring提供的注解；`@Resource`并不是Spring提供的，而是JDK提供的，但是Spring支持该注解的注入，使用的时候不需要导入而外的架包。

## 相同点

> 两者都可以写在 属性 或者 setter方法 上。如果两者都写在字段上，那么就不需要再写setter方法了！

## 不同点

### @Autowired

默认的情况下是按照byType的方式注入！

我们可以举一个例子

```
public class TestServiceImpl() {
 
    @Autowired
    private UserDao userDao;
 
    ... 
}
```

上述代码，会先去容器中查找一下，有哪些对象的类型是UserDao，找到之后把具体的值赋值到userDao中去（但是如果找到多个的话，会报错！）`@Autowired`注解是按照类型（byType）装配依赖对象的，默认情况下它要求依赖对象必须存在；如果允许null值，我们可以设置required属性为false。

如果我们想使用按照名称（byName）来装配，可以结合`@Qualifier`注解一起使用

> 问：假如我们的UserDao有多个实现类，比如`UserDaoImpl1`、`UserDaoImpl2`，我们的代码要怎么写？

如果不用 `@Qualifier` 那默认是使用byType，会找到多个UserDao类型的，会报错！！！所以要像下面的代码这样写！！！

**方案一（@Qualifier）**

```
public class TestServiceImpl() {
 
    @Autowired
    @Qualifier("userDaoImpl1")  // 指定哪一个实现类
    private UserDao userDao;
 
    ...   
}
```

**方案二（@Primary）**

在 `@Autowired` 中，如果有多个Bean，但是我们不想使用的@Qualifier时候，可以这样做：

使用`@Primary`注解指定一个进行注入！！！

```
@Primary
@Mapper
public class UserDaoImpl01 implements UserDao {
    ...
}
@Mapper
public class UserDaoImpl02 implements UserDao {
    ...
}
```

### @Resource

默认按照是byName的方式注入，如果名称找不到，则按照类型注入。

`@Resource` 中有两个重要的属性 name 和 type

在Spring中，将`@Resource`注解的name属性解析为bean的名称，type为bean的类型。

- 如果使用name属性，则使用byName的自动注入策略
- 如果使用type属性，则使用byType的自动注入策略
- 如果不指定，这是将会通过反射机制使用byName自动注入策略

### @Resource的装配顺序

1）如果同时指定了name和type，则从Spring上下文中找到唯一匹配的bean进行装配，找不到则抛出异常

2）如果指定了name，则从上下文中查找名称(id)匹配的bean进行装配，找不到则抛出异常

3）如果指定了type，则从上下文中找到类型匹配的唯一bean进行装配，找不到或者找到多个，都会抛出异常

4）如果既没有指定name，又没有指定type，则自动按照byName方式进行装配。如果没有匹配，则回退为一个原始类型(UserDao)进行匹配，如果匹配则自动装配。（先Name后type）

## 为什么更推荐使用 @Resource 

> Resource注解在字段上，这个注解是属于J2EE的，减少了与spring的耦合。

> 但是其实啊，这个问题，我觉得很多人可能对它的理解有误！更推荐使用 `@Resource` ，我觉得不是因为`@Resource`注解性能更好之类的。而是因为其可以指定是通过 name 还是 type 的注入方式，而`@Autowired`注解本身自己是不能实现这个效果的，要和`@Qualifier`一起用才可以！



# 图解Spring解决循环依赖

## 前言

Spring如何解决的循环依赖，是近两年流行起来的一道Java面试题。

其实笔者本人对这类框架源码题还是持一定的怀疑态度的。

如果笔者作为面试官，可能会问一些诸如“如果注入的属性为null，你会从哪几个方向去排查”这些场景题。

那么既然写了这篇文章，闲话少说，发车看看Spring是如何解决的循环依赖，以及带大家看清循环依赖的本质是什么。

## 正文

通常来说，如果问Spring内部如何解决循环依赖，一定是单默认的单例Bean中，属性互相引用的场景。

比如几个Bean之间的互相引用：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208111724650.png" alt="image-20220811172403516" style="zoom:50%;" />

甚至自己“循环”依赖自己：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208111724386.png" alt="image-20220811172416292" style="zoom:50%;" />

先说明前提：原型(Prototype)的场景是不支持循环依赖的，通常会走到`AbstractBeanFactory`类中下面的判断，抛出异常。

```java
if (isPrototypeCurrentlyInCreation(beanName)) {
  throw new BeanCurrentlyInCreationException(beanName);
}
```

原因很好理解，创建新的A时，发现要注入原型字段B，又创建新的B发现要注入原型字段A...

这就套娃了, 你猜是先StackOverflow还是OutOfMemory？

Spring怕你不好猜，就先抛出了BeanCurrentlyInCreationException

基于构造器的循环依赖，就更不用说了，官方文档都摊牌了，你想让构造器注入支持循环依赖，是不存在的，不如把代码改了。

那么默认单例的属性注入场景，Spring是如何支持循环依赖的？

## Spring解决循环依赖

首先，Spring内部维护了三个Map，也就是我们通常说的三级缓存。

笔者翻阅Spring文档倒是没有找到三级缓存的概念，可能也是本土为了方便理解的词汇。

在Spring的`DefaultSingletonBeanRegistry`类中，你会赫然发现类上方挂着这三个Map：

- *singletonObjects* 它是我们最熟悉的朋友，俗称“单例池”“容器”，缓存创建完成单例Bean的地方。
- *singletonFactories* 映射创建Bean的原始工厂
- *earlySingletonObjects* 映射Bean的早期引用，也就是说在这个Map里的Bean不是完整的，甚至还不能称之为“Bean”，只是一个Instance.

后两个Map其实是“垫脚石”级别的，只是创建Bean的时候，用来借助了一下，创建完成就清掉了。

所以笔者前文对“三级缓存”这个词有些迷惑，可能是因为注释都是以Cache of开头吧。

为什么成为后两个Map为垫脚石，假设最终放在singletonObjects的Bean是你想要的一杯“*凉白开*”。

那么Spring准备了两个杯子，即*singletonFactories*和*earlySingletonObjects*来回“倒腾”几番，把热水晾成“*凉白开*”放到singletonObjects中。

闲话不说，都浓缩在图里。

上面的是一张GIF，如果你没看到可能还没加载出来。*三秒一帧，不是你电脑卡*。

笔者画了17张图简化表述了Spring的主要步骤，GIF上方即是刚才提到的三级缓存，下方展示是主要的几个方法。

当然了，这个地步你肯定要结合Spring源码来看，要不肯定看不懂。

如果你只是想大概了解，或者面试，可以先记住笔者上文提到的“三级缓存”，以及下文即将要说的本质。

## 循环依赖的本质

上文了解完Spring如何处理循环依赖之后，让我们跳出“阅读源码”的思维，假设让你实现一个有以下特点的功能，你会怎么做？

- 将指定的一些类实例为单例
- 类中的字段也都实例为单例
- 支持循环依赖

举个例子，假设有类A：

```java
public class A {
    private B b;
}
```

类B：

```java
public class B {
    private A a;
}
```

说白了让你模仿Spring：假装A和B是被@Component修饰，
并且类中的字段假装是@Autowired修饰的，处理完放到Map中。

其实非常简单，笔者写了一份粗糙的代码，可供参考：

```java
    /**
     * 放置创建好的bean Map
     */
    private static Map<String, Object> cacheMap = new HashMap<>(2);

    public static void main(String[] args) {
        // 假装扫描出来的对象
        Class[] classes = {A.class, B.class};
        // 假装项目初始化实例化所有bean
        for (Class aClass : classes) {
            getBean(aClass);
        }
        // check
        System.out.println(getBean(B.class).getA() == getBean(A.class));
        System.out.println(getBean(A.class).getB() == getBean(B.class));
    }

    @SneakyThrows
    private static <T> T getBean(Class<T> beanClass) {
        // 本文用类名小写 简单代替bean的命名规则
        String beanName = beanClass.getSimpleName().toLowerCase();
        // 如果已经是一个bean，则直接返回
        if (cacheMap.containsKey(beanName)) {
            return (T) cacheMap.get(beanName);
        }
        // 将对象本身实例化
        Object object = beanClass.getDeclaredConstructor().newInstance();
        // 放入缓存
        cacheMap.put(beanName, object);
        // 把所有字段当成需要注入的bean，创建并注入到当前bean中
        Field[] fields = object.getClass().getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            // 获取需要注入字段的class
            Class<?> fieldClass = field.getType();
            String fieldBeanName = fieldClass.getSimpleName().toLowerCase();
            // 如果需要注入的bean，已经在缓存Map中，那么把缓存Map中的值注入到该field即可
            // 如果缓存没有 继续创建
            field.set(object, cacheMap.containsKey(fieldBeanName)
                    ? cacheMap.get(fieldBeanName) : getBean(fieldClass));
        }
        // 属性填充完成，返回
        return (T) object;
    }
```

这段代码的效果，其实就是处理了循环依赖，并且处理完成后，cacheMap中放的就是完整的“Bean”了

这就是“循环依赖”的本质，而不是“Spring如何解决循环依赖”。

之所以要举这个例子，是发现一小部分盆友陷入了“阅读源码的泥潭”，而忘记了问题的本质。

为了看源码而看源码，结果一直看不懂，却忘了本质是什么。

如果真看不懂，不如先写出基础版本，逆推Spring为什么要这么实现，可能效果会更好。

### what？问题的本质居然是two sum！

看完笔者刚才的代码有没有似曾相识？没错，和two sum的解题是类似的。

不知道two sum是什么梗的，笔者和你介绍一下：

two sum是刷题网站leetcode序号为1的题，也就是大多人的算法入门的第一题。

常常被人调侃，有算法面的公司，被面试官钦定了，合的来。那就来一道two sum走走过场。

问题内容是：给定一个数组，给定一个数字。返回数组中可以相加得到指定数字的两个索引。

比如：给定`nums = [2, 7, 11, 15], target = 9`
那么要返回 `[0, 1]`，因为`2 + 7 = 9`

这道题的优解是，一次遍历+HashMap：

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        throw new IllegalArgumentException("No two sum solution");
    }
}
//作者：LeetCode
//链接：https://leetcode-cn.com/problems/two-sum/solution/liang-shu-zhi-he-by-leetcode-2/
//来源：力扣（LeetCode）
```

先去Map中找需要的数字，没有就将当前的数字保存在Map中，如果找到需要的数字，则一起返回。

和笔者上面的代码是不是一样？

先去缓存里找Bean，没有则实例化当前的Bean放到Map，如果有需要依赖当前Bean的，就能从Map取到。

## 结尾

如果你是上文笔者提到的“陷入阅读源码的泥潭”的读者，上文应该可以帮助到你。

可能还有盆友有疑问，为什么一道“two-sum”，Spring处理的如此复杂？
这个想想Spring支持多少功能就知道了，各种实例方式..各种注入方式..各种Bean的加载，校验..各种callback，aop处理等等..

Spring可不只有依赖注入，同样Java也不仅是Spring。如果我们陷入了某个“牛角尖”，不妨跳出来看看，可能会更佳清晰哦。

# @EventListener

你好呀，我是苏三。[揭开@EventListener的神秘面纱](https://mp.weixin.qq.com/s?__biz=MzkwNjMwMTgzMQ==&mid=2247503600&idx=2&sn=ac39d119cfaeaaed3354d343002bb5fd&chksm=c0e81618f79f9f0e2555885c8dffb1daaa9d4088cc8db4439a8ad3f33acb9bacd242f36e5f8b&mpshare=1&scene=23&srcid=0424CoFbf3lcgP3gHaIAPLcW&sharer_sharetime=1682296332060&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

前段时间看到同事在项目里面使用了一个叫做 @EventLintener 的注解。

在这之前，我知道这个注解的用法和想要达到的目的，但是也仅限于此，其内部工作原理对我来说是一个黑盒，我完完全全不知道它怎么就实现了“监听”的效果。

现在既然已经出现在项目里面了，投入上生产上去使用了，所以我打算盘一下它，以免以后碰到问题的时候错过一个装逼的...

哦，不。

错过一个表现自己的机会。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSPthnOF5GN2gqKYKLcXZVWs4Bz5rZRVvDHpb3dMmzB3lQ2YaRmuMrDw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

## Demo

首先，按照歪歪歪师傅的老规矩，第一步啥也别说，先搞一个 Demo 出来，没有 Demo 的源码解读，就像是吃面的时候没有大蒜，差点意思。

先铺垫一个背景吧。

假设现在的需求是用户注册成功之后给他发个短信，通知他一下。

正常来说，伪代码很简单：

```
boolean success = userRegister(user);
if(success){
    sendMsg("客官，你注册成功了哦。记得来玩儿~");
}
```

这代码能用，完全没有任何问题。但是，你仔细想，发短信通知这个动作按理来说，不应该和用户注册的行为“耦合”在一起，难道你短信发送的时候失败了，用户就不算注册成功吗？

上面的代码就是一个耦合性很强的代码。

怎么解耦呢？

应该是在用户注册成功之后，发布一个“有用户注册成功了”的事件：

```
boolean success = userRegister(user);
if(success){
    publicRegisterSuccessEvent(user);
}
```

然后有地方去监听这个事件，在监听事件的地方触发“短信发送”的动作。

这样的好处是后续假设不发短信了，要求发邮件，或者短信、邮件都要发送，诸如此类的需求变化，我们的用户注册流程的代码不需要进行任何变化，仅仅是在事件监听的地方搞事情就完事了。

这样就算是完成了两个动作的“解耦”。

怎么做呢？

我们可以基于 Spring 提供的 ApplicationListener 去做这个时间。

我的 Demo 里面用的 Spring 版本是 5.2.10。

这次的 Demo 也非常的简单，我们首先需要一个对象来封装事件相关的信息，比如我这里用户注册成功，肯定要关心的是 userName：

```
@Data
public class RegisterSuccessEvent {

    private String userName;

    public RegisterSuccessEvent(String userName) {
        this.userName = userName;
    }
}
```

我这里只是为了做 Demo，对象很简单，实际使用过程中，你需要什么字段就放进去就行。

然后需要一个事件的监听逻辑：

```
@Slf4j
@Component
public class RegisterEventListener {

    @EventListener
    public void handleNotifyEvent(RegisterSuccessEvent event) {
        log.info("监听到用户注册成功事件：" +
                "{}，你注册成功了哦。记得来玩儿~", event.getUserName());
    }

}
```

接着，通过 Http 接口来进行事件发布：

```
@Resource
private ApplicationContext applicationContext;
@GetMapping("/publishEvent")
public void publishEvent() {
    applicationContext.publishEvent(new RegisterSuccessEvent("歪歪"));
}
```

最后把服务启动起来，调用一次：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRStsJsgib60cOAoNyWZThHHeqoAllwDLvaDDEk4lDcRXXWcbxPWBIVBqQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

输出正常，完事儿，这个 Demo 就算是搞定了，就只有十多行代码。

这么简单的 Demo 你都不想亲自动手去搭一个的话，想要靠肉眼学习的话，那么我只能说：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSHpVlqGib0wevx8TuxQRwXy8vzbJoNsvMKy5cHRtBibMS8sdib7e8kgOEw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## Debug

来，我问你，如果是你的话，就这几行代码，第一个断点你会打在哪里？

这没啥好犹豫的，肯定是选择打事件监听的这个地方：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSqK6xaIR0lHZF3dQyEpLhstq9bnF7XTHMdvHNFicJCic55cJZsIuiaHeLw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

然后直接就是一个发起调用，拿到调用栈再说：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSVlseuc81CW4YXVAB6pExjKCuTav3P8HJ3NIibIawdhnuqPtBJ2cN56A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

通过观察调用栈发现，全是 Spring 的 event 包下的方法。

此时，我还是一头雾水的，完全不知道应该怎么去看，所以我只有先看第一个涉及到 Spring 源码的地方，也就是这个反射调用的地方：

> org.springframework.context.event.ApplicationListenerMethodAdapter#doInvoke

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSelKwa1jvNnLftS7cssKpic93zZibrPqFQhByIsPYJTh98khbW4iceTibQQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

通过观察这三个关键的参数，我们可以断定此时确实是通过反射在调用我们 Demo 里面的 RegisterEventListener 类的 handleNotifyEvent 方法，入参是 RegisterSuccessEvent 对象，其 userName 字段的值是“歪歪”：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSnfUdIjl1TaDXallao08A0D5S61lIIbM7HPQLRhAxcNjI63eb9GXdBA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

此时，我的第一个问题就来了：Spring 是怎么知道要去触发我的这个方法的呢？

或者换个问法：handleNotifyEvent 这个我自己写的方法名称怎么就出现在这里了呢？

然后顺着这个 method 找过去一看：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSibLJkU4p58HFMh71YUricjNXiazqKu5mtcCNEP6SVwbAkACHeL9icvAKkw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

哦，原来是当前类的一个字段，随便还看到了 beanName，也是其一个字段，对应着 Demo 的 RegisterEventListener。

到这里，第二个问题就随之而来了：既然关键字段都在当前类里面了，那么这个当前类，也就是 ApplicationListenerMethodAdapter 是什么时候冒出来的呢？

带着这个问题，继续往下查看调用栈，会看到这里的这个 listener 就是我们要找的这个“当前类”：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSLMvFwox3zt08lQV6xsG3zQn33gWXDonQl4yGn9UrHT5qLrEq3icXZLg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

所以，我们的问题就变成了，这个 listener 是怎么来的？

然后你就会来到这个地方，把目光停在这个地方：

> org.springframework.context.event.SimpleApplicationEventMulticaster#multicastEvent

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSlibTCfD3RtvIMaUtJEUAurUsVx23N4PoX1Brp0DJXYrJ3zs6k502WjA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

为什么会在这个地方停下来呢？

因为在这个方法里面，就是整个调用链中 listener 第一次出现的地方。

所以，第二个断点的位置，我们也找到了，就是这个地方：

> org.springframework.context.event.SimpleApplicationEventMulticaster#multicastEvent

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSCplu8ZmInuOicaJbmZSib8hW1gje97mb3ZjVibBNbNGWxJPxlzmKibQ8NQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

但是，朋友们注意，我要但是了。

但是，当然把断点打在这个地方，重启服务准备调试的时候，你会发现重启的过程中就会停在断点处，而停下来的时候，你去调试会发现根本就不是你所关心的逻辑。

全是 Spring 启动过程中触发的一些框架的监听逻辑。比如应用启动事件，就会在断点处停下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSkBbG9W8mZaNUDmcl6KhnO9HYmObITU10xrsPoPl9uoFOhHiaEfud0pQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

怎么办呢？

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSZ4uiaBo78UhuuicD0RDchtMNaAcSqxHp8QnB4fkMytafGMpcIibHbIyBg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

针对这种情况，有两个办法。

第一个是服务启动过程中，把断点停用，启动完成之后再次打开断点，然后触发调用。

idea 也提供了这样的功能，这个图标就是全局的断点启用和停用的图标：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSv1x082yJ0JaMe9446SPko4e1cuyFe1HpwUyIczBqs9KwtS8X06Puag/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这个方法在我们本次调试的过程中是行之有效的，但是假设如果以后你想要调试的代码，就是要在框架启动过程中调试的代码呢？

所以，我更想教你第二种方案：使用条件断点。

通过观察入参，我们可以看到 event 对象里面有个 payload 字段，里面放的就是我们 Demo 中的 RegisterSuccessEvent 对象：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSmvaWAj1TjqACNd6FUibHz3ZxsbIEQHyIPbiaXMRJUIc8T34nFkrBhXTQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

那么，我们可不可以打上断点，然后让 idea 识别到是上述情况的时候，即有 RegisterSuccessEvent 对象的时候，才在断点处停下来呢？

当然是可以的，打条件断点就行。

在断点处右键，然后弹出框里面有个 Condition 输入框：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSrF1bk8LOHGjic4QUV2ojDqabDgGXfVeNNhySFFqbAW0eh3coq1NGGuQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

Condition，都认识吧，高考词汇，四级词汇了，抓紧时间背一背：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSxx6kWoGF9f6qDAMFXnhDT3CRbRXLxlmibA1K782jJKMKORNHFXyicjvw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

在 idea 的断点这里，它是“条件”的意思，带着个输入框，代表让你输入条件的意思。

另外，关于 Condition 还有一个短语，叫做 in good condition。

反应过来大概是“状况良好”的意思。

比如：我已出仓，in good condition。

再比如：Your hair is not in good condition。

就是说你头发状况不太好，需要注意一下。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSsUrFKSlSaicsQWcaICcgDefr9KEArRg8ff0QK8iaicye7UGDRfXxuTLtg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

扯远了，说回条件断点。

在这里，我们的条件是：event 对象里面的 payload 字段放的是我们 Demo 中的 RegisterSuccessEvent 对象时就停下来。

所以应该是这样的：

> event instanceof PayloadApplicationEvent && (((PayloadApplicationEvent) event).payload instanceof RegisterSuccessEvent)

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSJ9dNRadN2FLnMI3koBtvXibribKdkcibpfSia6DE5CYJ1Ppiafhy3f0Nbbw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

当我们这样设置完成之后，重启项目，你会发现重启过程非常丝滑，并没有在断点处停下来，说明我们的条件断点起作用了。

然后，我们再次发起调用，在断点处停下来了：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSKgojoIxLcMCibL8MNTyDgvFMGj6l3wjBGGZAWzf81F8TNI6fakbyCUg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

主要关注 134 行的 listener 是怎么来的。

当我们观察 getApplicationListeners 方法的时候，会发现这个方法它主要是在对 retrieverCache 这个缓存在搞事情。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRShSwkCfhmz5niaGp982UAmOfHasShTnGccJupbfZ9zWseZymJm9gv5fQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这个缓存里面放的就是在项目启动过程中已经触发过的框架自带的 listener 对象：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSRCmjDmtbPfTibgxgBTPkickzbnTG4Zv59HDgMnoFgtN3icolHEm2yMzug/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

调用的时候，如果能从缓存中拿到对应的 listener，则直接返回。而我们 Demo 中的自定义 listener 是第一次触发，所以肯定是没有的。

因此关键逻辑就在 retrieveApplicationListeners 方法里面：

> org.springframework.context.event.AbstractApplicationEventMulticaster#retrieveApplicationListeners

这个方法里面的逻辑较多，我不会逐行解析。

只说一下这个关键的 for 循环：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRS3nak3qicSH7ib2EGLNCJJNueLOyDyyGddBcxictkia5GZ6Cr2JP0eoIPAg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这个 for 循环在干啥事呢？

就是循环当前所有的 listener，过滤出能处理当前这个事件的 listener。

可以看到当前一共有 20 个 listener，最后一个 listener 就是我们自定义的 registerEventListener：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSRnF3fYbiaDLMkxHCtypl892xvxNn7fxhP3DcKISksVXiaHMfx2hnVFVQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

每一个 listener 都经过一次 supportsEvent 方法判断：

> supportsEvent(listener, eventType, sourceType)

这个方法，就是判断 listener 是否支持给定的事件：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSkJAZyEJ1cal4Uw4ZkfWOicrSlu0H5AldgdaQ5mZ91abHK0TJCFLLKDQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

因为我们知道当前的事件是我们发布的 RegisterSuccessEvent 对象。

对应到源码中，这里给定的事件，也就是 eventType 字段，对应的就是我们的 RegisterSuccessEvent 对象。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSeHOhiaD8ydWjZZIGv8YHDT2As7VPHyiaTG35zFzf1iaVJF9rLOOrDuNWA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

所以当循环到我们的 registerEventListener 的时候，在 supportsEventType 方法中，用 eventType 和 declaredEventTypes 做了一个对比，如果比上了，就说明当前的 listener 能处理这个 eventType。

前面说了 eventType 是 RegisterSuccessEvent 对象。

那么这个 declaredEventTypes 是个啥玩意呢？

declaredEventTypes 字段也在之前就出现过的 ApplicationListenerMethodAdapter 类里面。supportsEventType 方法也是这个类的方法：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSI4Z45zXBdtNPAuU0ibG2KcWS0cmMib0zJOMxEqCAyDF1kjMZRSpn5ibDA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

而这个 declaredEventTypes，就是 RegisterSuccessEvent 对象：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSSXSI4JkoWJNhTOy8jT3OARClopmsFa2Fm38OyjK0jYOrPCOJWDFH8w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这不就呼应上了吗？

所以，这个 for 循环结束之后，里面一定是有 registerEventListener的，因为它能处理当前的 RegisterSuccessEvent 这个事件。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSh2Pe8hwuyWM5XA3icbCKjE06AxrbpEcZecBoBUl6O7oOfIpJ9SH4Khw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

但是你会发现循环结束之后 list 里面有两个元素，突然冒出来个 DelegatingApplicationListener 是什么鬼？

这个时候怎么办？

别去研究它，它不会影响我们的程序运行，所以可以先做个简单的记录，不要分心，要抓住主要矛盾。

经过前面的一顿分析，我们现在又可以回到这里了。

通过 debug 我们知道这个时候我们拿到的就是我们自定义的 listener 了：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSUxV83ZP1lQ1cR13KY7eeC7oYNNpkiawO9VEKwAR8LVlQfHJYvjABTpA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

从这个 listener 里面能拿到类名、方法名，从 event 中能拿到请求参数。

后续反射调用的过程，条件齐全，顺理成章的就完成了事件的发布。

看到这里，你细细回想一下，整个的调试过程，是不是一环扣一环。只要思路不乱，抓住主干，问题不大。

## 进一步思考

到这里，你是不是认为已经调试的差不多了？

自己已经知道了 Spring 自定义 listener 的大致工作原理了？

闭着眼睛想一想也就知道大概是一个什么流程了？

那么我问你一个问题：你回想一下我最最开始定位到反射这个地方的时候是怎么说的？

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSiatj98SFwiaiaznsMJOCXIrX4da07d489CLwL1RLSjLXpKRvSPCLiak77Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

是不是给了你这一张图，说 beanName、method、declaredEventTypes 啥的都在 ApplicationListenerMethodAdapter 这个类里面？

请问：这些属性是什么时候设置到这个类里面的呢？

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSL6vTXjYPsZIgMTrEsQhSia8UompKRuJnWff7SBxBr0w07U1ibz1CWTZA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这个...

好像...

是不是确实没讲？

是的，所以说这部分我也得给你补上。

但是如果我不主动提，你是不是也想不起来呢，所以我也完全可以就写到这里就结束了。

我把这部分单独写一个小节就是提一下这个问题：如果你只是跟着网上的文章看，特别是源码解读或者方案设计类文章，只是看而不带着自己的思路，不自己亲自下手，其实很多问题你思考不全的，关键是看完以后你还会误以为你学全了。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSrJvVW6rialOE9sqSsYSiasHsFibiaYhnAicnh4Iic1W6P9BEzHsmsCUbbdag/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

现在我们看一下 ApplicationListenerMethodAdapter 这个类是咋来的。

我们不就是想看看 beanName 是啥时候和这个类扯上关系的嘛，很简单，刚刚才提到的条件断点又可以用起来了：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSNSS45hWial5x4ml7XPBg3kEk29RVTv7ibT1p5v4jt46kFa6dibT3wBWng/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

重启之后，在启动的过程中就会在构造方法中停下，于是我们又有一个调用栈了：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSmWdkfptRDroNryfGaouEN6gkibPZgqCia48XECvARVShkvDibqqlknVpQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

可以看到，在这个构造方法里面，就是在构建我们要寻找的 beanName、method、declaredEventTypes 这类字段。

而之所以会触发这个构造方法，是因为 Spring 容器在启动的过程中调用了下面这个方法：

> org.springframework.context.event.EventListenerMethodProcessor#afterSingletonsInstantiated

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSr2qQtxDO7tgmIRQrU24bWlxAVKhmEa9LxrdDfzkqDV2gkTSVO62b7A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

在这个方法里面，会去遍历 beanNames，然后在 processBean 方法里面找到带有 @EventListener 注解的 bean：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRStFC47qMDl3wboTZwebvh7cSYazMwMj4euAVO75VNOX6C7FYnJxbINg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

在标号为 ① 地方找到这个 bean 具体是哪些方法标注了 @EventListener。

在标号为 ② 的地方去触发 ApplicationListenerMethodAdapter 类的构造方法，此时就可以把 beanName，代理目标类，代理方法通过参数传递过去。

在标号为 ③ 的地方，将这个 listener 加入到 Spring 的上下文中，后续触发的时候直接从这里获取即可。

那么 afterSingletonsInstantiated 这个方法是什么时候触发的呢？

还是看调用栈：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRS4SDYicC7MeJLPm1TGSC9Mnq0OmHw0ydoxuIG6ETaibOfDUibINXaNDqiag/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

你即使再不熟悉 Spring，你至少也听说过容器启动过程中有一个 refresh 的动作吧？

就是这个地方：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSD3tUnVjo2DenNSWGBcvRjysqyoZa8LCq1O3dwUJsScicD2BOLV6yZRQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这里，refreshContext，就是整个 SpringBoot 框架启动过程的核心方法中的一步。

就是在这个方法里面中，在服务启动的过程中，ApplicationListenerMethodAdapter 这个类和一个 beanName 为 registerEventListener 的类扯上了关系，为后续的事件发布的动作，埋好了伏笔。

## 细节

前面了解了关于 Spring 的事件发布机制主干代码的流程之后，相信你已经能从“容器启动时”和“请求发起时”这两个阶段进行了一个粗犷的说明了。

但是，注意，我又要“但是”了。

里面其实还有很多细节需要注意的，比如事件发布是一个串行化的过程。假设某个事件监听逻辑处理时间很长，那么势必会导致其他的事件监听出现等待的情况。

比如我搞两个事件监听逻辑，在其中一个的处理逻辑中睡眠 3s，模拟业务处理时间。发起调用之后，从日志输出时间上可以看出来，确实是串行化，确实是出现了等待的情况：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSaibGUVPzLFfyvBJJ49IJ1m2fu08zN6ibELOGANGibx2o1P9cvzIkzYkSg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

针对这个问题，我们前面讲源码关于获取到 listener 之后，其实有这样的一个逻辑：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSGKFcucUc9rJFosKN4xtPAygRKb6iaeDCicwsAZgk7NqYpcibiaeXxgqx2w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这不就是线程池异步的逻辑吗？

只不过默认情况下是没有开启线程池的。

开始之后，日志就变成了这样：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSBsiauZynjPicUAQ9lz0XIscrZM3MDOqibjHKicnNXmGpNLJJO1OwpEqLHA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

那么怎么开启呢？

主干流程都给你说了个大概了，这些分支细节，就自己去研究吧。

再比如，@EventListener 注解里面还有这两个参数，我们是没有使用到的：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSJ933zM6icNgia6nWe8wZxiaQm7DZZHHNoIEd8z2J5wF09wS7Jy76EQnUQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

它应该怎么使用并且其到的作用是什么呢？

对应的源码是哪个部分呢？

这也是属于分支细节的部分，自己去研究吧

再再比如，前面讲到 ApplicationListenerMethodAdapter 这个类的时候：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSqSGnCf3hLWIWaQnPibcd3gz6Y9fhhT5PXUGSYlpLa8wDrjljH3oic1rQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

你会发现它还有一个子类，点过去一看，它有一个叫做 ApplicationListenerMethodTransactionalAdapter 的儿子：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRS4wbgicvHO35SvRRCTqLRH25XianqPEwfxibWOpZcgjWMoUghaeKUvVJiaQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这个儿子的名字里面带着个 “Transactional”，你就知道这是和事务相关的东西了。

它里面有个叫做 TransactionalEventListener 的字段，它也是一个注解，里面对应着事务的多个不同阶段：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSXiayBUrtNt17P7dicicGPrUZxaFCZt3Y6Nh3iaxlVqK3cKOuxJlKlcKcew/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

想都不用想，肯定是可以针对事务不同阶段进行事件监听。

这部分“儿子”的逻辑，是不是也可以去研究研究。

再再再比如，前面提到了 Spring 容器在启动的过程中调用了下面这个方法：

> org.springframework.context.event.EventListenerMethodProcessor#afterSingletonsInstantiated

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSr2qQtxDO7tgmIRQrU24bWlxAVKhmEa9LxrdDfzkqDV2gkTSVO62b7A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这个方法属于哪个类？

它属于 EventListenerMethodProcessor 这个类。

那么请问这个类是什么时候出现在 Spring 容器里面的呢？

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSL6vTXjYPsZIgMTrEsQhSia8UompKRuJnWff7SBxBr0w07U1ibz1CWTZA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这个...

好像...

是不是确实没讲？

是的，但是这个类在整个框架里面只有一次调用：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRShTEEwhO1ADsibHy8ibredYWKInrundYHl4MCRibFdgbbeZS2TMl5ukHtQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

调试起来那不是手拿把掐的事情？

也可以去研究研究嘛，看着看着，不就慢慢的从 @EventLintener 这个小口子，把源码越撕越大了？

![图片](https://mmbiz.qpic.cn/mmbiz_png/ELQw2WCMgt04vBXG4Bic4R1WFTKuLhFRSg9enErIztLL385EUbcQd3MOP6IkBDD6sh9LrHc1qLnn77ibUyIPYMuA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

好了，本文的技术部分就到这里啦。



# Spring解决循环依赖为什么需要三级缓存？

## 前言

什么是循环依赖呢？我们抛开Spring这个框架来聊下什么是循环依赖，循环依赖可能在我们平时的开发过程中是属于比较常见的。Spring容器最大的功能就是对bean的生命周期进行管理，每个bean在创建的过程中，需要得到一个完整的bean需要对bean的所有属性进行赋值，如果两个bean出现了相互依赖的情况，如果Spring没有处理循环依赖，那么出现的结果就是在bean的创建过程中出现相互依赖，导致这个bean永远无法创建出来，则就导致一直在相互创建，那么Spring是如何来解决循环依赖的呢？

## 什么情况下会循环依赖

1.先看如下demo: B和A相互循环依赖

```
@Component
public class B {
    @Autowired
    private A a;
}

@Component
public class A {
    @Autowired
    private B b;
}
```

启动项目：结果没有报错。

1. 加入异步逻辑修改

```
@Component
public class A {
    @Autowired
    private B b;
   @Async
    public void test(){

    }
}

@Component
public class B {
    @Autowired
    private A a;
}
@EnableAsync
public class App {
    public static void main(String[] args) {
        ApplicationContext ctx = new AnnotationConfigApplicationContext(App.class);
    }

}
```

启动后：![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZryY52M8nLNBQy13FBLMoiajndicwh0P0YOuvAj0hdTfE0se1rL3lnvILibQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

解决方案：加入lazy注解：

```
@Component
public class B {
    @Autowired
    @Lazy
    private A a;
}
@Component
public class A {
    @Autowired
    private B b;
   @Async
    public void test(){

    }
}
```

启动后：没有异常

上面发现使用@Async异步注解，循环依赖就会报错，有可能是因为有了@Async注解修饰的方法，其对应的类被代理了，那代理了就会报错么？我们继续尝试事务注解看看。

```
@Component
public class A {
    @Autowired
    private B b;
    @Transactional
    public void test(){

    }
}

@Component
public class B {
    @Autowired
    private A a;
}
@EnableTransactionManagement
public class App {
    public static void main(String[] args) {
        ApplicationContext ctx = new AnnotationConfigApplicationContext(App.class);
    }

}
```

启动后：正常，没有报错。

于是我们不经要问：

1. 循环依赖本来不会报错，为何添加@Async异步注解后就会导致报错
2. 为何添加@Transactional注解就不会报错
3. 使用了@Async异步注解的循环依赖，为何可以使用@lazy注解解决

我们要想清楚上面的问题，就需要了解Bean的生命周期。

## Bean的生命周期

一个简单的Bean生命周期如下：![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZry7iak11AJ4zDM0za8YFCjZLS1pBgMeqbwDc2B8ibGuOHYHIaFSicypYlqQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

问题出现就属性赋值这里：

![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZrybWRuqqlOV5FPgbR3YZIwSFrBiccw5KA6ahmCWpxKgyOWntEzhAcJTxg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

由图：我们知道，当B也依赖A时，需要去容器中找到A，A已经实例化了，只是还没属性赋值，所以，不应该再实例化，解决方案：在A创建的实例化后，用一个map存起来A来不就行了么？于是有了二级缓存

![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZryfQsicHqSFV045hJjHcAMw9Yu6E4VhYib432w4licnCW9TDsK3XOhfAWWQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

似乎上面已经可以解决循环依赖了，但细想一下我们会发现问题：

![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZryh4CrvOj9g28GE6KengTCwZ44oQcPr1ftHZG7kwlCtaCH76JXD8gasw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

通过上面的逻辑，我们发现了问题所在，B赋值属性A时，如果从Map中直接获取，那么得到的是原生对象，如果后续A没有被代理，一切没问题，如果A被代理了，那么B得到的对象就不对了，怎么解决，如果我们将aop提前是不是解决了问题。

![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZryK191ymoGpXVJ3DiccrmeQNbBKYzTlaxJia4vG8vrhr6mcic7XSHtZKh4g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

由于A对象的Aop方式提前了，那么B依赖的A就是代理对象了，A对象执行赋值后，后续到Aop这一步，会判断是否已经AOP过了，是的话就不会再Aop了，问题来了:如果C也跟A相互依赖，难道C去依赖A时，也要通过ObjectFactory获取A的代理对象么？如果是这样，A就存在2个代理对象了，A是单例的，因此这样不行，于是产生了一个新的缓存，我们称之为三级缓存。

![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZrypb2VRxxSR2lO4WZlviaxxNSupGCID02BWWUaPmEEnLiaMpSZN5yGFAew/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

于是，spring似乎完美解决了循环依赖问题？但为何使用@Async进行异步代理，会报错？

![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZryM42LJ9Qz8scuY1bE8olDhb3gUIYlU1EQKOd9mAVzvmDvSNX1XYDvGg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

我们看看报错的原因就知道：

![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZryyic3qWOG3mnhWNpLBnAndI7lm9KziawziaAU00mTExRZkpuZNWxAEUBqw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**那为何@Transactional修饰就没问题呢？**

原因是因为：ObjectFactory.getObject()方法可以产生代理对象

## 为何使用@lazy注解修饰就能解决问题呢？

![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZryqia9dxZSEUJiangeFbqA6hKP9FHONINAhc50yqdMWRgCLqDch7IK0SzQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

我们看看源码：

![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZryu1sOaiaOdNQUOSvpyQt8ibXn21bHOWt1Str86zGgBEia8boIgK2Aw5o3w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZryhGp7OxfkmuptUM7nRnr7OrFRxvHSMSOf3Y1nINWq1kR7FSrPDpSsJg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZrygDtvws4Og61xYgjOB5ibHXIjnCk48sqPxRd85d60fMcNa3cZoJKBibxA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZrySbyicsqmGTKeVuPbiatkfCibdqkDdyNnv5SwmtOQ6WdGzyBJLrQgMQtOA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZrymGxAr7Sf4nA6hzkKZw95KGcapxgP5vsZ9O8YfCc9ibsOJBaKWCl8LBQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

从源码来看，为何@Aync注解修饰，不能在ObjectFactory.getObject()方法实现代理对象：

![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZryZiaqhx6gfK4qHcxoslLps0yUgrpniacPLibZhOByBic3EHfibs0CFQb11Dg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZrypbjbgrqtk6WNvNLtqj8DQqCcA4OrqRgSZwDiaLPw8XUNGUK8GPaqaBQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZryY8wlsZVVhyic3bhg2LAmfyVeotBs2tqPxqu7cFR2u1IKBMia80iccTDpg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

而@Tranctional注解相关的处理器

![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZryYiaPudibmTRaG3zNbSoqhG0tPRrGrjia00ekwLVgYI5GJDrd2k6qU9ebQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZrys98PdFoGXkRDeklOkGMOsvkGTydbSadr5186pnqKb2icJC8Q9U1LCMw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZryEIhP5fwPOa1Q0jDFfXTX1DLMVn71aGxbkfXn4opgzZk5Hy16NpWLyA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

那么问题？如果A已经在getObject()方法后产生了代理类，后续init（）方法后，还会执行代理么？答案是不会了，因为：

![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZryb1N11kDhLeXE4R2iamum0fUgicrhxaS8pTLdPtzxtz5Y3R3ia7GcAu9dw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/VbfrPx9GoVcha0bBdbLNCCq2QIGQXZryoCTl4BbtBNmrk2VElndfcDl2uOQFssKbPpbI6b5ribNiaTvmMsCJZAqg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



## 总结

本文主要以简单的案例演示了Spring的循环依赖的问题，通过梳理Bean的生命周期，让我们了解Spring为何需要三级缓存才能解决循环依赖。















































   



 



