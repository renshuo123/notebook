

# 主要内容

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205041741566.png" alt="image-20220504174135483" style="zoom:80%;" />

> 项目地址：https://gitee.com/sure-s-renshuo/hm-dianping
>



# 短信登录⭐

## 基础准备

### 数据库表

```sql
create database hmdp character set utf8mb4;
use hmdp;
drop table if exists `tb_user`;
create table `tb_user`  (
  `id` bigint(20) unsigned not null auto_increment comment '主键',
  `phone` varchar(11) not null comment '手机号码',
  `password` varchar(128) null default '' comment '密码，加密存储',
  `nick_name` varchar(32) null default '' comment '昵称，默认是用户id',
  `icon` varchar(255) null default '' comment '人物头像',
  `create_time` timestamp not null default current_timestamp comment '创建时间',
  `update_time` timestamp not null default current_timestamp on update 
    current_timestamp comment '更新时间',
  primary key (`id`) using btree,
  unique index `unique_key_phone`(`phone`) using btree
) engine = innodb auto_increment = 1 ;
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305221421870.png" alt="image-20230522142141816" style="zoom:80%;" />

```sql
insert into `tb_user`(id,phone,password,nick_name,icon) values
(1, '13686869696', '', '小鱼同学', '/imgs/blogs/blog1.jpg'),
(2, '13838411438', '', '可可今天不吃肉','/imgs/icons/kkjtbcr.jpg'),
(4, '13456789011', '', '人生大事', '/imgs/icons/kkjtbcr1.jpg'),
(5, '13456789001', '', '毛遂自建', '/imgs/icons/kkjtbcr2.jpg');
```

### 坐标依赖

```xml
<dependencies>
    <!--spring-data-redis-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>
    <!--commons-pool2连接池-->
    <dependency>
        <groupId>org.apache.commons</groupId>
        <artifactId>commons-pool2</artifactId>
    </dependency>
    <!--spring-boot-starter-web-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <!--mysql-connector-java-->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <scope>runtime</scope>
    </dependency>
    <!--lombok-->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    <!--spring-boot-starter-test-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <!--mybatis-plus-->
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>3.4.3</version>
    </dependency>
    <!--hutool-->
    <dependency>
        <groupId>cn.hutool</groupId>
        <artifactId>hutool-all</artifactId>
        <version>5.7.17</version>
    </dependency>
</dependencies>
```

### 连接配置

```yml
server:
  port: 8081
spring:
  application:
    name: hmdp
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://127.0.0.1:3306/xue?useSSL=false&serverTimezone=UTC
    username: root
    password: 123456
  redis:
    host: 127.0.0.1
    port: 6379
    # password: 123321
    lettuce:
      pool:
        max-active: 10
        max-idle: 10
        min-idle: 1
        time-between-eviction-runs: 10s
  jackson:
    default-property-inclusion: non_null # JSON处理时忽略非空字段
mybatis-plus:
  type-aliases-package: com.hmdp.entity # 别名扫描包，在xml中写SQL有效
logging:
  level:
    com.hmdp: debug
```

### knife4j

> 文档地址：https://doc.xiaominfo.com/，knife4j是为Java MVC框架集成Swagger生成Api文档解决方案

#### API文档

> 前后端分离开发模式中，api文档是最好的沟通方式。Swagger 是一个规范和完整的框架，用于生成、描述、调用和可视化 RESTful 风格的 Web 服务。
>

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
          - com.hmdp.controller
```

```
spring.profiles.active=a
```

##### 访问路径

http://127.0.0.1:8081/doc.html

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305271058093.png" alt="image-20230527105816957" style="zoom:80%;" />

### 统一返回结果

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {
    private Boolean success;
    private String errorMsg;
    private Object data;
    private Long total;

    public static Result ok(){
        return new Result(true, null, null, null);
    }
    public static Result ok(Object data){
        return new Result(true, null, data, null);
    }
    public static Result ok(List<?> data, Long total){
        return new Result(true, null, data, total);
    }
    public static Result fail(String errorMsg){
        return new Result(false, errorMsg, null, null);
    }
}
```

### 正则工具类

```java
public abstract class RegexPatterns {
    /**
     * 手机号正则
     */
    public static final String PHONE_REGEX = 
                  "^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\\d{8}$";
    /**
     * 邮箱正则
     */
    public static final String EMAIL_REGEX = 
                  "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$";
    /**
     * 密码正则。4~32位的字母、数字、下划线
     */
    public static final String PASSWORD_REGEX = "^\\w{4,32}$";
    /**
     * 验证码正则, 6位数字或字母
     */
    public static final String VERIFY_CODE_REGEX = "^[a-zA-Z\\d]{6}$";

}
```

```java
public class RegexUtils {
    /**
     * 是否是无效手机格式
     * @param phone 要校验的手机号
     * @return true:符合，false：不符合
     */
    public static boolean isPhoneInvalid(String phone){
        return mismatch(phone, RegexPatterns.PHONE_REGEX);
    }
    /**
     * 是否是无效邮箱格式
     * @param email 要校验的邮箱
     * @return true:符合，false：不符合
     */
    public static boolean isEmailInvalid(String email){
        return mismatch(email, RegexPatterns.EMAIL_REGEX);
    }

    /**
     * 是否是无效验证码格式
     * @param code 要校验的验证码
     * @return true:符合，false：不符合
     */
    public static boolean isCodeInvalid(String code){
        return mismatch(code, RegexPatterns.VERIFY_CODE_REGEX);
    }

    // 校验是否不符合正则格式
    private static boolean mismatch(String str, String regex){
        if (StrUtil.isBlank(str)) {
            return true;
        }
        return !str.matches(regex);
    }
}
```

### User实体类和工具类

登录完成返回实体类

```java
@Data
public class UserDTO {
    private Long id;
    private String nickName;
    private String icon;
}
```

```java
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("tb_user")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    //主键
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    //手机号码
    private String phone;
    //密码，加密存储
    private String password;
    //昵称，默认是随机字符
    private String nickName;
    //用户头像
    private String icon;
    //创建时间
    private LocalDateTime createTime;
    //更新时间
    private LocalDateTime updateTime;
}
```

登录实体类

```java
@Data
public class LoginFormDTO {
    private String phone;
    private String code;
    private String password;
}
```

### controller

```java
@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private IUserService userService;

    @Resource
    private IUserInfoService userInfoService;

    // 发送手机验证码
    @PostMapping("code")
    public Result sendCode(@RequestParam("phone") String phone, HttpSession session) {
        // TODO 发送短信验证码并保存验证码
        return Result.fail("功能未完成");
    }

    // 登录功能：loginForm 登录参数，包含手机号、验证码；或者手机号、密码
    @PostMapping("/login")
    public Result login(@RequestBody LoginFormDTO loginForm, HttpSession session){
        // TODO 实现登录功能
        return Result.fail("功能未完成");
    }

    // 登出功能
    @PostMapping("/logout")
    public Result logout(){
        // TODO 实现登出功能
        return Result.fail("功能未完成");
    }

    @GetMapping("/me")
    public Result me(){
        // TODO 获取当前登录的用户并返回
        return Result.fail("功能未完成");
    }

    @GetMapping("/info/{id}")
    public Result info(@PathVariable("id") Long userId){
        // 查询详情
        UserInfo info = userInfoService.getById(userId);
        if (info == null) {
            // 没有详情，应该是第一次查看详情
            return Result.ok();
        }
        info.setCreateTime(null);
        info.setUpdateTime(null);
        // 返回
        return Result.ok(info);
    }
}
```

> 访问测试：:8081/shop-type/list

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306160844480.png" alt="image-20230616084434407" style="zoom:80%;" />

## Session登录

### 登录流程

> session默认存活30分钟，超过30分钟不处理就自动删除

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220314144723213.png" alt="image-20220314144723213" style="zoom:80%;" />

### 发送验证码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207171026832.png" alt="image-20220717102638699" style="zoom:80%;" />

> UserController

#### 基本验证码

```java
@PostMapping("code")
public Result sendCode(@RequestParam("phone") String phone, 
                       HttpSession session) {
    // TODO 发送短信验证码并保存验证码
    return userService.sendCode(phone,session);
}
```

```java
public interface IUserService extends IService<User> {
   Result sendCode(String phone, HttpSession session);
}
```

```java
// UserServiceImpl
@Override
public Result sendCode(String phone, HttpSession session) {
    //1、校验手机号：正则"^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\\d{8}$"
    //   该正则是自己定义的工具类
    if (RegexUtils.isPhoneInvalid(phone)) {
        //2、如果不符合，返回错误信息
        return Result.fail("手机号格式错误");
    }
    //3、符合，生成验证码,RandomUtil是hutool工具包
    String code = RandomUtil.randomNumbers(6);
    
    //4、保存验证码用session
    session.setAttribute("code",code);

    //5、发送验证码
    log.debug("发送验证码成功，验证码：{}",code);
    
    //返回ok，发送成功
    return Result.ok();
}
```

> 功能测试：http://127.0.0.1:8081/user/code

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305221510334.png" alt="image-20230522151012267" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306160933580.png" alt="image-20230616093315515" style="zoom:80%;" />

#### 升级验证码

> 还是UserServiceImpl类

```java
// 定义结束时间
private LocalDateTime lastSentTime;
// UserServiceImpl
@Override
public Result sendCode(String phone, HttpSession session) {
    //1、校验手机号：正则"^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\\d{8}$"
    //   该正则是自己定义的工具类
    LocalDateTime currentTime = LocalDateTime.now();
    if (RegexUtils.isPhoneInvalid(phone)) {
        //2、如果不符合，返回错误信息
        return Result.fail("手机号格式错误");
    }
    if (lastSentTime == null || lastSentTime.until(currentTime, 
                                                   ChronoUnit.SECONDS) >= 60) {
        // Enough time has passed, send the verification code
        System.out.println("Sending verification code...");
        // 发送验证码的逻辑代码
        //3、符合，生成验证码,RandomUtil是hutool工具包
        String code = RandomUtil.randomNumbers(6);
        //4、保存验证码用session
        session.setAttribute("code",code);
        //5、发送验证码
        log.debug("发送验证码成功，验证码：{}",code);
        // Update the last sent time
        lastSentTime = currentTime;
        //返回ok，发送成功
        return Result.ok();
    } else {
        // Not enough time has passed, cannot send the verification code
        System.out.println("Cannot send verification code. Please wait for some time.");
        return Result.fail("请稍后再试");
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202306160947837.png" alt="image-20230616094755759" style="zoom:80%;" />

### 登录功能实现

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207171033024.png" alt="image-20220717103326930" style="zoom:67%;" />

#### entity

> LoginFormDTO：登录的表单信息

```java
@Data
public class LoginFormDTO {
    private String phone;
    private String code;
    private String password;
}
```

> UserDTO：返回的数据信息，不能带密码

```java
@Data
public class UserDTO {
    private Long id;
    private String nickName;
    private String icon;
}
```

#### UserController

```java
@PostMapping("login")
public Result login(@RequestBody LoginFormDTO loginForm,
                    HttpSession session){
    // TODO 实现登录功能
    return userService.login(loginForm,session);
}
```

#### IUserService

```java
public interface IUserService extends IService<User> {
	// 发送验证码
    Result sendCode(String phone, HttpSession session);
  	// 登录功能
    Result login(LoginFormDTO loginForm, HttpSession session);
}
```

#### UserServiceImpl

```java
@Override
public Result login(LoginFormDTO loginForm, HttpSession session) {
    //1、先校验手机号
    String phone = loginForm.getPhone();
    if (RegexUtils.isPhoneInvalid(phone)) {
        //2、如果不符合，返回错误信息
        return Result.fail("手机号格式错误");
    }
    //2、再校验验证码，从session取出验证码，再和输入的验证码进行比较
    Object cacheCode = session.getAttribute("code");   
    String code = loginForm.getCode();
    if (cacheCode == null || !cacheCode.equals(code)) {
        //3、不一致，报错
        return Result.fail("验证码错误");
    }
    //4、一致，根据手机号查询用户select * from tb_user where phone = ?
    User user = query().eq("phone", phone).one();
    //5、判断用户是否存在
    if (user == null) {
        //6、不存在，创建新用户保存
        user = createUserWithPhone(phone);
    }
    //7、保存用户信息到session中，
    //注意：这边要隐藏用户敏感信息,将user当中的属性拷贝到UserDTO(user的部分属性)中
    session.setAttribute("user", 
                         BeanUtil.copyProperties(user, UserDTO.class)); 
    //session保存不需要返回保存内容
    return Result.ok();
}
```

> UserServiceImpl：注册目前无需写接口，登陆时用户不存在直接创建，因此只写实现即可

```java
private User createUserWithPhone(String phone) {
    //1、创建用户
    User user = new User();
    user.setPhone(phone);
    // 随机生成昵称
    user.setNickName("user_"+RandomUtil.randomString(10));
    //2、保存用户，save是MybatisPlus的方法
    save(user);
    return user;
}
```

#### 功能测试

> 发送验证码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305221532478.png" alt="image-20230522153231424" style="zoom:80%;" />

> 进行登录

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305221532171.png" alt="image-20230522153259119" style="zoom:80%;" />

### 登录校验拦截器

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207171034824.png" alt="image-20220717103431751" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220314154403399.png" alt="image-20220314154403399" style="zoom:67%;" />

#### ThreadLocal

> 用来保存用户信息
>

```java
public class UserHolder {
    // 创建ThreadLocal对象
    private static final ThreadLocal<UserDTO> tl = new ThreadLocal<>();
	// 创建存、取、删、静态方法
    public static void saveUser(UserDTO userId){
        tl.set(userId);
    }
    
    public static UserDTO getUser(){
        return tl.get();
    }

    public static void removeUser(){
        tl.remove();
    }
}
```

#### LoginInterceptor

```java
public class LoginInterceptor implements HandlerInterceptor{
    public boolean preHandle(HttpServletRequest request, 
                             HttpServletResponse response, 
                             Object handler) throws Exception {
        //1、获取session
        HttpSession session = request.getSession();
        //2、获取session中的用户
        Object user = session.getAttribute("user");
        //3、判断用户是否存在
        if (user == null) {
            //不存在，拦截，返回401状态码
            response.setStatus(401);
            return false;
        }  
        //5、存在，保存信息到ThreadLocal
        UserHolder.saveUser((UserDTO)user);
        //6、放行
        return true;
    }

    public void afterCompletion(HttpServletRequest request,
                                HttpServletResponse response, 
                                Object handler, @Nullable Exception ex)
        throws Exception {
        //移除用户，避免内存泄露
        UserHolder.removeUser();
    }
}
```

#### MvcConfig

> 拦截器写好后还需要配置，不然不会生效

```java
@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 拦截器注册，添加排除不需要拦截的路径
        registry.addInterceptor(new LoginInterceptor())

                .excludePathPatterns(
                        "/shop/**",
                        "/voucher/**",
                        "/shop-type/**",
                        "/upload/**",
                        "/blog/hot",
                        "/user/code",
                        "/user/login",
                        "/swagger-resources/**",
                        "/webjars/**",
                        "/v2/**", "/swagger-ui.html/**",
                        "/api", "/api-docs", "/api-docs/**", "/doc.html/**"
                );
    }
}
```

#### UserController

> 登录成功获取用户

```java
@GetMapping("me")
public Result me(){
    // TODO 获取当前登录的用户并返回，在拦截器中已经把用户信息放到UserHolder里面了
    UserDTO user = UserHolder.getUser();
    return Result.ok(user);
}
```

> 登出功能

```java
@PostMapping("/logout")
public Result logout(HttpSession session){
    // TODO 实现登出功能
    session.removeAttribute("user");
    return Result.ok("登出成功");
}
```

#### 访问测试

> 前面获取验证码和登录流程和上面一样，接下来只需要调用me方法获取信息即可，在knif4j一样

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305221551375.png" alt="image-20230522155113319" style="zoom:80%;" />



### 集群共享问题

> **Session共享问题**：**多台Tomcat并不共享session存储空间，当请求切换到不同tomcat服务时导致数据丢失的问题**。session的替代方案应该满足：

> - 数据共享
>
> - 内存存储
> - key、value结构

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220314154521491.png" alt="image-20220314154521491" style="zoom:67%;" />



## Redis登录

### 流程图解

#### 登录注册

> 每一个用户都是唯一的，因此redis的key是唯一的

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220314160722513.png" alt="image-20220314160722513" style="zoom:67%;" />

#### 校验状态

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220314160757368.png" alt="image-20220314160757368" style="zoom:67%;" />



### 信息保存格式

> 保存登录的用户信息，可以使用String结构，以JSON字符串来保存，比较直观

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220314160840149.png" alt="image-20220314160840149" style="zoom:67%;" />

> Hash结构可以将对象中的每个字段独立存储，可以针对单个字段做CRUD，并且内存占用更少

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220314160905860.png" alt="image-20220314160905860" style="zoom:67%;" />

Redis代替session需要考虑的问题：

- 选择合适的数据结构
- 选择合适的key
- 选择合适的存储粒度

### 前端逻辑⭐

> 就是请求头添加一个authorization，把token保存在里面

> login.vue

```js
login() {
    if(!this.radio){
        this.$message.error("请先确认阅读用户协议");
        return
    }
    if(!this.form.phone || !this.form.code){
        this.$message.error("手机号和验证码不能为空");
        return
    }
    axios.post("/user/login",this.form).then(({data}) => {
        // 保存用户信息到session
        sessionStorage.setItem("token",data)
    })
    // 跳转到首页
    location.href = "/info.html"
}
```

> axios请求工具类

```js
// request拦截器，将用户token放入头中
let token = sessionStorage.getItem("token");
axios.interceptors.request.use(
  config => {
    if(token) config.headers['authorization'] = token
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
```

### Redis常量类

```java
public class RedisConstants {
    // 验证码，时间
    public static final String LOGIN_CODE_KEY = "login:code:";
    public static final Long LOGIN_CODE_TTL = 200L;
    public static final TimeUnit LOGIN_CODE_TIME = TimeUnit.SECONDS;
    
    // 登录用户信息
    public static final String LOGIN_USER_KEY = "login:token:";
    public static final Long LOGIN_USER_TTL = 250L;
    public static final TimeUnit LOGIN_USER_TIME = TimeUnit.SECONDS;
}
```

### 发送验证码

> 修改上面的session登录即可

```java
@PostMapping("code")
public Result sendCode(@RequestParam("phone") String phone) {
    // TODO 发送短信验证码并保存验证码
    return userService.sendCode(phone);
}
```

```java
Result sendCode(String phone);
```

> 基础实现

```java
@Resource
private StringRedisTemplate stringRedisTemplate;

@Override
public Result sendCode(String phone) {
    //1、校验手机号
    if (RegexUtils.isPhoneInvalid(phone)) {
        //2、如果不符合，返回错误信息
        return Result.fail("手机号格式错误");
    }
    //3、符合，生成验证码
    String code = RandomUtil.randomNumbers(6);

    //改用redis,设置有效期,设置常量
    stringRedisTemplate.opsForValue()
            .set(RedisConstants.LOGIN_CODE_KEY +phone,code,
                 RedisConstants.LOGIN_CODE_TTL, RedisConstants.LOGIN_CODE_TIME);

    //5、发送验证码
    log.debug("发送验证码成功，验证码：{}",code);
    //返回ok
    return Result.ok();
}
```

> 升级版本实现

```java
private LocalDateTime lastSentTime;

// UserServiceImpl
@Resource
private StringRedisTemplate stringRedisTemplate;

@Override
public Result sendCode(String phone) {
    //1、校验手机号：正则"^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\\d{8}$"
    //   该正则是自己定义的工具类
    LocalDateTime currentTime = LocalDateTime.now();
    if (RegexUtils.isPhoneInvalid(phone)) {
        //2、如果不符合，返回错误信息
        return Result.fail("手机号格式错误");
    }
    // 60秒内不能重复发送
    if (lastSentTime == null || lastSentTime.until(currentTime, 
                                                   ChronoUnit.SECONDS) >= 60) {
        // Enough time has passed, send the verification code
        System.out.println("Sending verification code...");
        // 发送验证码的逻辑代码
        //3、符合，生成验证码,RandomUtil是hutool工具包
        //3、符合，生成验证码
        String code = RandomUtil.randomNumbers(6);
        //改用redis,设置有效期,设置常量
        stringRedisTemplate.opsForValue()
                .set(RedisConstants.LOGIN_CODE_KEY + phone,code,
                        RedisConstants.LOGIN_CODE_TTL, RedisConstants.LOGIN_CODE_TIME);
        //5、发送验证码
        log.debug("发送验证码成功，验证码：{}",code);
        // Update the last sent time
        lastSentTime = currentTime;
        //返回ok，发送成功
        return Result.ok();
    } else {
        // Not enough time has passed, cannot send the verification code
        System.out.println("Cannot send verification code. Please wait for some time.");
        return Result.fail("请稍后再试");
    }
}
```

### 登录功能实现

```java
//登录参数，包含手机号、验证码；或者手机号、密码
@PostMapping("login")
public Result login(@RequestBody LoginFormDTO loginForm){
    // TODO 实现登录功能
    return userService.login(loginForm);
}
```

```java
Result login(LoginFormDTO loginForm);
```

```java
@Override
public Result login(LoginFormDTO loginForm) {
    //1、校验手机号
    String phone = loginForm.getPhone();
    if (RegexUtils.isPhoneInvalid(phone)) {
        //2、如果不符合，返回错误信息
        return Result.fail("手机号格式错误");
    }
    //2、校验验证码，从redis获取验证码并校验
    String cacheCode = stringRedisTemplate.opsForValue()
                       .get(RedisConstants.LOGIN_CODE_KEY + phone);
    String code = loginForm.getCode();
    //打印一下，看看两个是否相同
    log.info("code:{},cacheCode:{}",code,cacheCode);
    //3、验证码不一致或不存在，报错
    if (cacheCode == null || !cacheCode.equals(code)) {
        return Result.fail("验证码错误");
    }
    //4、一致，根据手机号查询用户select * from tb_user where phone = ?
    User user = query().eq("phone", phone).one();
    //5、判断用户是否存在
    if (user == null) {
        //6、不存在，创建新用户保存(下面的方法)
        user = createUserWithPhone(phone);
    }
    //7、将信息保存到redis中，随机生成token，作为登录令牌，这不是标准的token，只是UUID
    String token = UUID.randomUUID().toString();
    //8、将user对象里的部分信息复制到userDTO中(保护隐私)
    UserDTO userDTO = BeanUtil.copyProperties(user, UserDTO.class);
    //9、将UserDTO对象转为HashMap存储，下面这种情况是普通用法
    //Map<String, Object> userMap = BeanUtil.beanToMap(userDTO);
    //因为stringRedisTemplate要求对象内部key全是string才行，因此里面用到string转换
    Map<String, Object> userMap = BeanUtil.beanToMap(userDTO,new HashMap<>(),
            CopyOptions.create()
                    .setIgnoreNullValue(true)
                     // 将字段值全部转换成String类型                                
                    .setFieldValueEditor((fieldName,fieldValue) ->
                            fieldValue.toString()));
    //存储,这个是为了存储在redis中，返回给前端的只需要token
    String tokenKey = RedisConstants.LOGIN_USER_KEY+token;
    log.info("tokenKey:"+tokenKey);
    //将信息保存到hash
    stringRedisTemplate.opsForHash().putAll(tokenKey,userMap);
    //获取存储的hash信息
    Map<Object, Object> userMap1 = stringRedisTemplate.opsForHash().entries(tokenKey);
    //设置token有效期
    stringRedisTemplate.expire(tokenKey,RedisConstants.LOGIN_USER_TTL,
                               RedisConstants.LOGIN_USER_TIME);
    //注意把token返回
    return Result.ok(token);
}
```

> 用户不存在创建用户(和session中一样)

```java
private User createUserWithPhone(String phone) {
    //1、创建用户
    User user = new User();
    user.setPhone(phone);
    user.setNickName("user_"+RandomUtil.randomString(10));
    //2、保存用户
    save(user);
    return user;
}
```



<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205052107563.png" alt="image-20220505210738458" style="zoom:80%;" />



### 拦截器⭐

> **因为目前拦截器只拦截需要登录校验的路径，而一些如首页等路径是不会去拦截的，如果用户不去访问这些路径，拦截器的token有效期就不会刷新，这样token有效期到了登录就会失效**。我们想让拦截器只要用户访问任何路径都会触发，这样就能一直刷新token有效期了。**即token必须是自动续期的**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207171132072.png" alt="image-20220717113218979" style="zoom:67%;" />

> 拦截器优化：第一个拦截器拦截所有路径，这样能一直刷新登录有效期，第二个拦截器拦截登录请求

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205052118051.png" alt="image-20220505211817932" style="zoom:80%;" />

#### UserHolder

```java
public class UserHolder {
    private static final ThreadLocal<UserDTO> tl = new ThreadLocal<>();

    public static void saveUser(UserDTO user){
        tl.set(user);
    }

    public static UserDTO getUser(){
        return tl.get();
    }

    public static void removeUser(){
        tl.remove();
    }
}
```

#### RefreshTokenInterceptor

> 第一个拦截器，拦截所有请求，但目标只是为了刷新token，无论token是否存在，路径都能访问通过
>
> 注意：拦截所有请求是在配置类中设置

```java
public class RefreshTokenInterceptor implements HandlerInterceptor{
	// 注入stringRedisTemplate
    private  StringRedisTemplate stringRedisTemplate;

    //因为不是Spring的类，不能@Resource注入，所以要使用构造函数来注入
    public RefreshTokenInterceptor(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }
	// 前置拦截器
    public boolean preHandle(HttpServletRequest request, 
                             HttpServletResponse response, 
                             Object handler) throws Exception {
        //获取请求头的token，前端传过来的
        String token = request.getHeader("authorization");
        //判断token是否为空，为空也放行，感觉没必要判断，StrUtil是hutool工具包
        if (StrUtil.isBlank(token)) {
            return true;
        }
        //2、获取Redis中的用户，从Hash类型中取到
        String key = RedisConstants.LOGIN_USER_KEY + token;
        Map<Object, Object> userMap = stringRedisTemplate.opsForHash().entries(key);
        //判断用户是否存在，这里同样不要拦截，直接放行，感觉没必要判断
        if (userMap.isEmpty()) {
            return true;
        }
        //5、将查询到的Hash数据转换为userDTO对象，第三个参数表示是否忽略错误，false不忽略
        UserDTO userDTO = BeanUtil.fillBeanWithMap(userMap, 
                                                   new UserDTO(), false);
        //6、存在，保存用户信息到ThreadLocal
        UserHolder.saveUser(userDTO);
        //6、放行
        //7、刷新token有效期
        stringRedisTemplate.expire(key,RedisConstants.LOGIN_USER_TTL,
                                       RedisConstants.LOGIN_USER_TIME);
        return true;
    }

    public void afterCompletion(HttpServletRequest request, 
                                HttpServletResponse response, 
                                Object handler, @Nullable Exception ex) 
        throws Exception {
        //移除用户
        UserHolder.removeUser();
    }
}
```

#### LoginInterceptor

> 第二个拦截器，负责真正的拦截动作

```java
public class LoginInterceptor implements HandlerInterceptor {

    public boolean preHandle(HttpServletRequest request, 
                             HttpServletResponse response, 
                             Object handler) throws Exception {
        //判读是否需要拦截(ThreadLocal中是否有用户)
        if (UserHolder.getUser() == null) {
            //没有用户，需要拦截，并设置状态码
            response.setStatus(401);
            return false;
        }
        //有用户，放行
        return true;
    }
}
```

#### MvcConfig

> 注册拦截器

```java
@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //order表示执行先后顺序，order越大越晚执行，确保第一个拦截器一定在第二个前面执行
        registry.addInterceptor(new 
                                RefreshTokenInterceptor(stringRedisTemplate))
                // 拦截一切路径
                .addPathPatterns("/**").order(0);
        registry.addInterceptor(new LoginInterceptor())
                // 只拦截需要登录的路径，即放行不需要登录的路径
                .excludePathPatterns(
                        "/shop/**",
                        "/voucher/**",
                        "/shop-type/**",
                        "/upload/**",
                        "/blog/hot",
                        "/user/code",
                        "/user/login",
                        "/swagger-resources/**",
                        "/webjars/**",
                        "/v2/**", "/swagger-ui.html/**",
                        "/api", "/api-docs", "/api-docs/**", "/doc.html/**"
                ).order(1);
    }
}
```

#### UserController

```java
@GetMapping("me")
public Result me(){
    // TODO 获取当前登录的用户并返回
    //在拦截器中已经把用户信息放到UserHolder里面了
    UserDTO user = UserHolder.getUser();
    return Result.ok(user);
}
```

### 验证测试

#### 发送验证码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305221639599.png" alt="image-20230522163905539" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305221639664.png" alt="image-20230522163926614" style="zoom:80%;" />

#### 登录测试

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305221640981.png" alt="image-20230522164013921" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305221640129.png" alt="image-20230522164049073" style="zoom:80%;" />

#### 获取个人信息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202305221643466.png" alt="image-20230522164325409" style="zoom:80%;" />



# 商户查询缓存

> **缓存**就是数据交换的缓冲区（称作Cache [ kæʃ ] ），是存贮数据的临时地方，一般读写性能较高。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230622100740988.png" alt="image-20230622100740988" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230622101059955.png" alt="image-20230622101059955" style="zoom:80%;" />

## 添加商户缓存(基础版)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220313161513005.png" alt="image-20220313161513005" style="zoom:67%;" />

```java
@GetMapping("/{id}")
public Result queryShopById(@PathVariable("id") Long id) {
    return shopService.queryById(id);
}
```

```java
public interface IShopService extends IService<Shop> {
    Result queryById(Long id);
}
```

```java
@Service
public class ShopServiceImpl extends ServiceImpl<ShopMapper, Shop>
       implements IShopService {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public Result queryById(Long id) {
        // cache:shop: + id
        String key = RedisConstants.CACHE_SHOP_KEY+id;
        //1、从redis中查询商铺缓存
        String shopJson = stringRedisTemplate.opsForValue().get(key);
        //2、判断是否存在,只有有值为true，为空则为false,StrUtil是hutool包下的内容
        if (StrUtil.isNotBlank(shopJson)) {
            //存在，直接返回(转换成Json类型，如果定义了序列化类，就不用转换了)
            Shop shop = JSONUtil.toBean(shopJson, Shop.class);
            return Result.ok(shop);
        }
        //4、redis不存在，根据id查询数据库
        Shop shop = getById(id);
        //5、mysql不存在，返回错误
        if (shop == null) {
            return Result.fail("店铺不存在");
        }
        //6、存在，写入redis
        stringRedisTemplate
                .opsForValue()
                .set(key, JSONUtil.toJsonStr(shop));
        //7、返回
        return Result.ok(shop);
    }
}
```

进行多次访问，发现只打印了一次数据库

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230622115644972.png" alt="image-20230622115644972" style="zoom:80%;" />

## 缓存更新策略(一致性)

![image-20220313163621410](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220313163621410.png)

> 低一致性需求：使用内存淘汰机制。例如店铺类型的查询缓存
>
> 高一致性需求：主动更新，并以超时剔除作为兜底方案。例如店铺详情查询的缓存

### 主动更新策略

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220313164154673.png" alt="image-20220313164154673" style="zoom:67%;" />

### Cache Aside Pattern

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230622122223139.png" alt="image-20230622122223139" style="zoom:80%;" />

### 缓存更新策略的最佳方案(重点)

> 读操作：`缓存命中则直接返回，缓存未命中则查询数据库，并写入缓存，设定超时时间`
>
> 写操作：`先写数据库，然后再删除缓存，要确保数据库与缓存操作的原子性`
>
> 结论：`先操作数据库，再删除缓存`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207171432843.png" alt="image-20220717143245715" style="zoom:67%;" />



## 双写一致(基础优化)

> 保证缓存和数据库双写一致:`给查询商铺的缓存添加超时剔除和主动更新的策略`
>

### 添加超时时间

```java
@Override
public Result queryById(Long id) {
    String key = "cache:shop:" + id;
    //1、从redis中查询商铺缓存
    String shopJson = stringRedisTemplate.opsForValue().get(key);
    //2、判断是否存在,只有有值为true，为空则为false
    if (StrUtil.isNotBlank(shopJson)) {
        //存在，直接返回(转换成Json类型，如果定义了序列化类，就不用转换了)
        Shop shop = JSONUtil.toBean(shopJson, Shop.class);
        return Result.ok(shop);
    }
    //4、redis不存在，根据id查询数据库
    Shop shop = getById(id);
    //5、mysql不存在，返回错误
    if (shop == null) {
        return Result.fail("店铺不存在");
    }
    //6、存在，写入redis
    stringRedisTemplate
            .opsForValue()
            // 在基础版的基础上添加了过期时间，30分钟
            .set(key,JSONUtil.toJsonStr(shop),30L, TimeUnit.MINUTES);
    //7、返回
    return Result.ok(shop);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230622124215010.png" alt="image-20230622124215010" style="zoom:80%;" />

### 添加主动更新

> 就是更新数据库时顺便删除缓存
>

```java
@PutMapping
public Result updateShop(@RequestBody Shop shop) {
    // 写入数据库
    return shopService.update(shop);
}
```

```java
Result update(Shop shop);
```

```java
@Override
@Transactional
public Result update(Shop shop) {
    Long id = shop.getId();
    if (id == null) {
        return Result.fail("店铺id不能为空");
    }
    //1、更新数据库
    updateById(shop);
    //2、删除缓存(删除如果出错，需要回滚，因此要加上@Transactional)
    stringRedisTemplate.delete(RedisConstants.CACHE_SHOP_KEY+id);
    return Result.ok();
}
```

> 更新数据，再去看RESP，发现缓存已经删除了

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230622124359657.png" alt="image-20230622124359657" style="zoom:80%;" />

## 缓存穿透(继续优化)

> `指客户端请求的数据在缓存中和数据库中都不存在，这样缓存永远不会生效，这些请求都会打到数据库`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220313165418151.png" alt="image-20220313165418151" style="zoom: 80%;" />

### 解决方案

#### 缓存null值

> - 优点：实现简单，维护方便
> - 缺点：`额外的内存消耗、可能造成短期的不一致`

#### 布隆过滤

> - 优点：内存占用较少，没有多余key，hash值，根据01判断是否存在
> - 缺点：`实现复杂、存在误判可能`

#### 辅助方案

> - **增强id的复杂度，避免被猜测id规律**
>
> - **做好数据的基础格式校验**
>
> - **加强用户权限校验**
>
> - **做好热点参数的限流**

### 代码实现

> 这里使用缓存空值方式来解决缓存穿透问题

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205051506126.png" alt="image-20220505150643031" style="zoom:80%;" />

> 先判断缓存内是否有值，有就返回，如何值没有，但是有key，表示不为空，则表示查到了空值

```java
@Override
public Result queryById(Long id) {
    // cache:shop: + id
    String key = RedisConstants.CACHE_SHOP_KEY+id;
    //1、从redis中查询商铺缓存
    String shopJson = stringRedisTemplate.opsForValue().get(key);
    //2、判断是否存在,只有有值为true，为空则为false,StrUtil是hutool包下的内容
    if (StrUtil.isNotBlank(shopJson)) {
        //存在，直接返回(转换成Json类型，如果定义了序列化类，就不用转换了)
        Shop shop = JSONUtil.toBean(shopJson, Shop.class);
        return Result.ok(shop);
    }
    // 判断命中的是否是空值(上面的条件是Redis查到了结果，然后返回结果)
    // 这里是在后面缓存空值时，查到了空值，则返回店铺不存在
    if (shopJson != null) {
        //返回一个错误信息
        return Result.fail("店铺不存在");
    }
    //4、redis不存在，根据id查询数据库
    Shop shop = getById(id);
    //5、mysql不存在，返回错误,解决缓存穿透：判断命中的是否是空值,并缓存空值
    if (shop == null) {
        //将空值写入redis，解决缓存穿透⭐，即redis和数据库都查不到时的情况
        stringRedisTemplate.opsForValue().set(key,"",2L,TimeUnit.MINUTES);
        return Result.fail("店铺不存在");
    }
    //6、存在，写入redis
    stringRedisTemplate
            .opsForValue()
            .set(key, JSONUtil.toJsonStr(shop),30L, TimeUnit.MINUTES);
    //7、返回
    return Result.ok(shop);
}
```

> 当访问不存在的店铺时，会查询数据库，提示一次店铺不存在，接着继续查询该店铺，直接走redis
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230622131326761.png" alt="image-20230622131326761" style="zoom:80%;" />

## 缓存雪崩(继续优化)

> **缓存雪崩**是指在同一时段**大量的缓存key同时失效**或者**Redis服务宕机**，导致大量请求到达数据库

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220313170214370.png" alt="image-20220313170214370" style="zoom:67%;" />

> - **给不同的Key的TTL添加随机过期值(最简单)**
>
> - 利用Redis集群提高服务的可用性
>
> - 给缓存业务添加降级限流策略
>
> - 给业务添加多级缓存

```java
public class RedisConstants {
    // 创建 Random 对象(应对雪崩问题)
    public static Random random = new Random();
    // 验证码，时间
    public static final String LOGIN_CODE_KEY = "login:code:";
    public static final Long LOGIN_CODE_TTL = 200L;
    public static final TimeUnit LOGIN_CODE_TIME = TimeUnit.SECONDS;
    // 登录用户信息
    public static final String LOGIN_USER_KEY = "login:token:";
    public static final Long LOGIN_USER_TTL = 250L;
    public static final TimeUnit LOGIN_USER_TIME = TimeUnit.MINUTES;
    // 空值过期
    public static final Long CACHE_NULL_TTL = 2L;
    // 商品过期,10，110
    public static Integer CACHE_SHOP_TTL = random.nextInt(101) + 10;
    public static final String CACHE_SHOP_KEY = "cache:shop:";
    // 分布式锁过期，范围在 10 到 20 之间
    public static final String LOCK_SHOP_KEY = "lock:shop:";
    public static final Integer LOCK_SHOP_TTL = random.nextInt(11) + 10;
}
```

## 缓存击穿(进阶优化)

> **缓存击穿问题**也叫热点Key问题，就是一个被**高并发访问**并且**缓存重建业务较复杂**的key突然失效了，无数的请求访问会在瞬间给数据库带来巨大的冲击。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220313170605576.png" alt="image-20220313170605576" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220313170916769.png" alt="image-20220313170916769" style="zoom:67%;" />

### 方式一：互斥锁

> 给缓存重建过程加锁，确保重建过程只有一个线程执行，其他线程等待

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220313170651399.png" alt="image-20220313170651399" style="zoom:67%;" />

> 执行流程
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220313171306668.png" alt="image-20220313171306668" style="zoom: 80%;" />

#### 自定义锁

> 使用setnx实现锁，key如果存在就不插入

##### 拆分查询方法

```java
@Override
public Result queryById(Long id) {
    //互斥锁解决缓存击穿
    Shop shop = queryWithMutex(id);
    if (shop == null) {
        return Result.fail("店铺不存在！");
    }
    //7、返回
    return Result.ok(shop);
}
```

```java
public Shop queryWithMutex(Long id) {
    String key = RedisConstants.CACHE_SHOP_KEY + id;
    //从redis中查询商铺缓存
    String shopJson = stringRedisTemplate.opsForValue().get(key);
    //2、判断是否存在,只有有值为true，为空则为false
    if (StrUtil.isNotBlank(shopJson)) {
        //存在，直接返回
        Shop shop = JSONUtil.toBean(shopJson, Shop.class);
        return shop;
    }
    //解决缓存穿透：判断命中的是否是空值
    if (shopJson != null) {
        //返回一个错误信息
        return null;
    }
    //4 实现缓存重建
    //4.1 获取互斥锁
    Shop shop = null;
    String lockKey = "lock:shop:"+id;
    try {
        // 获取锁
        boolean isLock = tryLock(lockKey);
        //4.2 判断是否获取成功
        if (!isLock) {
            //4.3 失败，则休眠并重试
            Thread.sleep(50);
            return queryWithMutex(id);
        }
        //4.4 成功，根据id查询数据
        shop = getById(id);
        //注意：这边睡眠是用来模拟实际环境，进行测试
        Thread.sleep(500);
        //5、不存在，返回错误
        if (shop == null) {
            //将空值写入redis，解决缓存穿透，即redis和数据库都查不到时的情况
            stringRedisTemplate.opsForValue()
                    .set(key,"",RedisConstants.CACHE_NULL_TTL,TimeUnit.MINUTES);
            return null;
        }
        //6、存在，写入redis
        stringRedisTemplate.opsForValue()
                .set(key,JSONUtil.toJsonStr(shop),RedisConstants.CACHE_SHOP_TTL,
                        TimeUnit.MINUTES);
    } catch (InterruptedException e) {
        throw new RuntimeException(e);
    } finally {
        //7 释放互斥锁
        unlock(lockKey);
    }
    //8 返回
    return shop;
}
```

##### 上锁和解锁

```java
//上锁和解锁方法
private boolean tryLock(String key) {
    //setIfAbsent就是对应setnx上锁方法
    Boolean flag = stringRedisTemplate.opsForValue()
                   .setIfAbsent(key, "1", 10, TimeUnit.SECONDS);
    return BooleanUtil.isTrue(flag);
}

private void unlock(String key) {
    stringRedisTemplate.delete(key);
}
```

#### Redisson锁👍

```java
@Resource
RedissonClient redissonClient;
private RLock lock;

@Override
public Result queryById(Long id) {
    //互斥锁解决缓存击穿
    Shop shop = queryWithMutex(id);
    if (shop == null) {
        return Result.fail("店铺不存在！");
    }
    //7、返回
    return Result.ok(shop);
}
```

```java
public Shop queryWithMutex(Long id) {
    String key = "cache:shop:" + id;
    //从redis中查询商铺缓存
    String shopJson = stringRedisTemplate.opsForValue().get(key);
    //2、判断是否存在,只有有值为true，为空则为false
    if (StrUtil.isNotBlank(shopJson)) {
        //存在，直接返回
        Shop shop = JSONUtil.toBean(shopJson, Shop.class);
        return shop;
    }
    //解决缓存穿透：判断命中的是否是空值
    if (shopJson != null) {
        //返回一个错误信息
        return null;
    }
    //4 实现缓存重建
    //4.1 获取互斥锁
    Shop shop = null;
    String lockKey = "lock:shop:"+id;
    try {
        lock = redissonClient.getLock(lockKey);
        boolean isLock = lock.tryLock(1L, TimeUnit.MINUTES);
        //4.2 判断是否获取成功
        if (!isLock) {
            //4.3 失败，则休眠并重试
            Thread.sleep(50);
            log.error("获取锁失败....");
            //再次进行查询试图获取锁
            return queryWithMutex(id);
        }
        //4.4 成功，根据id查询数据
        shop = getById(id);
        //注意：这边睡眠是用来模拟实际环境，进行测试
        Thread.sleep(50);
        //5、不存在，返回错误
        if (shop == null) {
            //将空值写入redis，解决缓存穿透，即redis和数据库都查不到时的情况
            stringRedisTemplate.opsForValue()
                    .set(key,"",2L,TimeUnit.MINUTES);
            return null;
        }
        //6、存在，写入redis
        stringRedisTemplate.opsForValue()
                .set(key,JSONUtil.toJsonStr(shop),30L,
                        TimeUnit.MINUTES);
    } catch (InterruptedException e) {
        throw new RuntimeException(e);
    } finally {
        //7 释放互斥锁
        log.warn("准备释放锁 .... 1");
        lock.unlock();
    }
    //8 返回
    return shop;
}
```

使用jmeter

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205051552897.png" alt="image-20220505155213815" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205051551468.png" alt="image-20220505155107355" style="zoom:80%;" />



### 方式二：逻辑过期

> - 热点key缓存永不过期，而是设置一个逻辑过期时间，查询到数据通过对逻辑过期时间判断来决定是否需要重建缓存。
> - 重建缓存也通过互斥锁来保证单线程执行。
> - 重建缓存利用独立线程异步执行。
> - 其他线程无需等待，直接查询旧数据即可

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220313170705702.png" alt="image-20220313170705702" style="zoom:67%;" />

#### 执行流程

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230622161217451.png" alt="image-20230622161217451" style="zoom:80%;" />

#### 新建配置类

```java
@Data
public class RedisData {
    private LocalDateTime expireTime;
    //为避免修改实体类，使用它来保存查询到的对象
    private Object data;
}
```

#### 修改保存方法

```java
public void saveShop2Redis(Long id,Long expireSeconds) {
    //1、查询店铺数据
    Shop shop = getById(id);
    //2、封装逻辑过期时间
    RedisData redisData = new RedisData();
    redisData.setData(shop);
    redisData.setExpireTime(LocalDateTime.now().plusSeconds(expireSeconds));
    //3、写入redis
    stringRedisTemplate.opsForValue()
        .set(RedisConstants.cache_shop_key+id,JSONUtil.toJsonStr(redisData));
}
```

#### 测试保存方法

```java
@Resource
private ShopServiceImpl shopService;

@Test
void test() {
    shopService.saveShop2Redis(1L,10L);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220313175244676.png" alt="image-20220313175244676" style="zoom:50%;" />

#### 修改查询方法

```java
@Override
public Result queryById(Long id) {
    Shop shop = queryWithLogicalExpire(id);
    if (shop == null) {
        return Result.fail("店铺不存在！");
    }
    //7、返回
    return Result.ok(shop);
}
```

```java
//创建线程池
private static final ExecutorService cache_executor = 
    Executors.newFixedThreadPool(10);

public Shop queryWithLogicalExpire(Long id) {
    String key = RedisConstants.cache_shop_key + id;
    //从redis中查询商铺缓存
    String shopJson = stringRedisTemplate.opsForValue().get(key);
    //2、判断是否存在,只有有值为true，为空则为false
    if (StrUtil.isBlank(shopJson)) {
        //3、不存在，直接返回null
        return null;
    }
    //4、命中，需要把json反序列化为对象
    RedisData redisData = JSONUtil.toBean(shopJson, RedisData.class);
    Shop shop = JSONUtil.toBean((JSONObject) redisData.getData(),Shop.class);
    LocalDateTime expireTime = redisData.getExpireTime();
    //5、判断是否过期
    if (expireTime.isAfter(LocalDateTime.now())) {
        //5.1 未过期，直接返回店铺信息
        return shop;
    }
    //5.2 已过期，需要缓存重建
    //6、 缓存重建
    //6.1 获取互斥锁
    String lockKey = "lock:shop" +id;
    boolean isLock = tryLock(lockKey);
    //6.2 判断是否获取锁成功
    if (isLock) {
        //6.3成功，开启独立线程，实现缓存重建
        cache_executor.submit(()->{
            try {
                //重建缓存
                this.saveShop2Redis(id,20L);
            } catch (Exception e) {
                throw new RuntimeException(e);
            } finally {
                //释放锁
                unlock(lockKey);
            }
        });
    }
    //6.4 返回过期的商铺信息
    return shop;
}
```

> 测试：缓存中有102茶餐厅，我直接去数据库中修改成103茶餐厅，用jmeter测试，发现前面两个是102，后面全都是103了，说明重建成功
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220313182311432.png" alt="image-20220313182311432" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220313182346103.png" alt="image-20220313182346103" style="zoom: 67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220313182405021.png" alt="image-20220313182405021" style="zoom:67%;" />

## 封装Redis工具类

> 基于StringRedisTemplate封装一个缓存工具类，满足下列需求
>

### 工具类需求

> 方法1： 利用json`实现对象序列化并存储在string类型的key中`，并且`可以设置过期时间`

```java
set(String key, Object value, Long time, TimeUnit unit) 
```

> 方法2： 利用json实现对象序列化并存储在string类型的key中，并且可以设置逻辑过期时间，用于处理缓存击穿问题
>

```java
setWithLogicalExpire(String key, Object value, Long time, TimeUnit unit)
```

> 方法3：根据Key查询json数据，并根据type的类型反序列化。查询失败时，利用dbFallback功能去数据库查询，并写入缓存，设置过期时间。需要利用缓存null值来解决缓存穿透问题
>

```java
<R, K> R getPassThrough(String keyPrefix, K id,
Class<R> type, Function<K, R> dbFallback, Long time, TimeUnit unit)
```

> 方法4：**热点Key的查询**，根据Key查询json数据，并根据type的类型反序列化。查询失败时，利用dbFallback功能去数据库查询，并写入缓存，设置过期时间。需要利用逻辑过期解决缓存击穿问题
>

```java
<R, K> R getHotKey(String keyPrefix, K id, Class<R> type, Function<K, R> dbFallback, Long time, TimeUnit unit)
```

### 配置类

> 这里是使用逻辑过期来实现解决缓存击穿

```java
@Data
public class RedisData {
    private LocalDateTime expireTime;
    //为避免修改实体类，使用它来保存查询到的对象
    private Object data;
}
```

### 完整工具类

```java
import cn.hutool.core.util.BooleanUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;
import static com.hmdp.utils.RedisConstants.LOCK_SHOP_KEY;
import static com.hmdp.utils.RedisConstants.cache_null_ttl;


@Slf4j
@Component
public class CacheClient {
    // 使用StringRedisTemplate并使用构造函数注入
    private final StringRedisTemplate stringRedisTemplate;
    // 创建线程池
    private static final ExecutorService CACHE_REBUILD_EXECUTOR = 
                         Executors.newFixedThreadPool(10);

    public CacheClient(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }
    // set方法
    public void set(String key, Object value, Long time, TimeUnit unit) {
        stringRedisTemplate.opsForValue().set(key, 
                                              // 将存入的值进行序列化
                                              JSONUtil.toJsonStr(value), 
                                              time, 
                                              unit);
    }
    // 以逻辑过期时间
    public void setWithLogicalExpire(String key, Object value, Long time, TimeUnit unit) {
        // 设置逻辑过期，这边RedisData是上面的实体类
        RedisData redisData = new RedisData();
        redisData.setData(value);
        // 过期时间为当前时间+传入时间
        redisData.setExpireTime(LocalDateTime.now().plusSeconds(unit.toSeconds(time)));
        // 写入Redis
        stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(redisData));
    }
    
    // 设置自定义泛型，查询时返回类型不确定，因此要用泛型，缓存穿透
    public <R,ID> R queryWithPassThrough(
            String keyPrefix, ID id, Class<R> type, Function<ID, R> dbFallback, 
        Long time, TimeUnit unit){
        String key = keyPrefix + id;
        // 1.从redis查询商铺缓存
        String json = stringRedisTemplate.opsForValue().get(key);
        // 2.判断是否存在
        if (StrUtil.isNotBlank(json)) {
            // 3.存在，直接返回
            return JSONUtil.toBean(json, type);
        }
        // 判断命中的是否是空值
        if (json != null) {
            // 返回一个错误信息
            return null;
        }

        // 4.不存在，根据id查询数据库
        R r = dbFallback.apply(id);
        // 5.不存在，返回错误
        if (r == null) {
            // 将空值写入redis
            stringRedisTemplate.opsForValue().set(key, "", cache_null_ttl,
                                                  TimeUnit.MINUTES);
            // 返回错误信息
            return null;
        }
        // 6.存在，写入redis
        this.set(key, r, time, unit);
        return r;
    }
    // 设置自定义泛型，R参数，ID返回值，缓存击穿
    public <R, ID> R queryWithLogicalExpire(
            // 查数据库是函数，因此参数类型是Function
            String keyPrefix, ID id, Class<R> type, Function<ID, R> dbFallback, 
        Long time, TimeUnit unit) {
        String key = keyPrefix + id;
        // 1.从redis查询商铺缓存
        String json = stringRedisTemplate.opsForValue().get(key);
        // 2.判断是否存在
        if (StrUtil.isBlank(json)) {
            // 3.存在，直接返回
            return null;
        }
        // 4.命中，需要先把json反序列化为对象
        RedisData redisData = JSONUtil.toBean(json, RedisData.class);
        R r = JSONUtil.toBean((JSONObject) redisData.getData(), type);
        LocalDateTime expireTime = redisData.getExpireTime();
        // 5.判断是否过期
        if(expireTime.isAfter(LocalDateTime.now())) {
            // 5.1.未过期，直接返回店铺信息
            return r;
        }
        // 5.2.已过期，需要缓存重建
        // 6.缓存重建
        // 6.1.获取互斥锁
        String lockKey = LOCK_SHOP_KEY + id;
        boolean isLock = tryLock(lockKey);
        // 6.2.判断是否获取锁成功
        if (isLock){
            // 6.3.成功，开启独立线程，实现缓存重建
            CACHE_REBUILD_EXECUTOR.submit(() -> {
                try {
                    // 查询数据库
                    R newR = dbFallback.apply(id);
                    // 重建缓存
                    this.setWithLogicalExpire(key, newR, time, unit);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }finally {
                    // 释放锁
                    unlock(lockKey);
                }
            });
        }
        // 6.4.返回过期的商铺信息
        return r;
    }
    // 设置自定义泛型，缓存穿透互斥锁
    public <R, ID> R queryWithMutex(
            String keyPrefix, ID id, Class<R> type, Function<ID, R> dbFallback, 
        Long time, TimeUnit unit) {
        String key = keyPrefix + id;
        // 1.从redis查询商铺缓存
        String shopJson = stringRedisTemplate.opsForValue().get(key);
        // 2.判断是否存在
        if (StrUtil.isNotBlank(shopJson)) {
            // 3.存在，直接返回
            return JSONUtil.toBean(shopJson, type);
        }
        // 判断命中的是否是空值
        if (shopJson != null) {
            // 返回一个错误信息
            return null;
        }

        // 4.实现缓存重建
        // 4.1.获取互斥锁
        String lockKey = LOCK_SHOP_KEY + id;
        R r = null;
        try {
            boolean isLock = tryLock(lockKey);
            // 4.2.判断是否获取成功
            if (!isLock) {
                // 4.3.获取锁失败，休眠并重试
                Thread.sleep(50);
                return queryWithMutex(keyPrefix, id, type, dbFallback, time, unit);
            }
            // 4.4.获取锁成功，根据id查询数据库
            r = dbFallback.apply(id);
            // 5.不存在，返回错误
            if (r == null) {
                // 将空值写入redis
                stringRedisTemplate.opsForValue().set(key, "", cache_null_ttl, 
                                                      TimeUnit.MINUTES);
                // 返回错误信息
                return null;
            }
            // 6.存在，写入redis
            this.set(key, r, time, unit);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }finally {
            // 7.释放锁
            unlock(lockKey);
        }
        // 8.返回
        return r;
    }
    // 上锁和解锁
    private boolean tryLock(String key) {
        Boolean flag = stringRedisTemplate.opsForValue().setIfAbsent(key, "1", 10,
                                                                     TimeUnit.SECONDS);
        return BooleanUtil.isTrue(flag);
    }

    private void unlock(String key) {
        stringRedisTemplate.delete(key);
    }
}
```

### 测试工具类

> 使用:和上面区别是少写了一大堆方法，只要写下面即可
>

```java
@Resource
private CacheClient cacheClient;

@Override
public Result queryById(Long id) {
    //缓存穿透，击穿同样，只是换了方法名
    Shop shop = cacheClient
            .queryWithPassThrough(RedisConstants.CACHE_SHOP_KEY,id,
                    Shop.class,
                    this::getById,RedisConstants.CACHE_SHOP_TTL,TimeUnit.MINUTES);
    if (shop == null) {
        return Result.fail("店铺不存在！");
    }
    //7、返回
    return Result.ok(shop);
}
```

> 测试逻辑过期时间，注意：knife4j与SpringBootTest有冲突，目前测试时只能先注释掉knife4j依赖
>

```java
@Resource
private CacheClient cacheClient;
//逻辑过期时间
@Test
public void testSaveShop() {
    Shop shop = shopService.getById(1L);
    cacheClient.setWithLogicalExpire(CACHE_SHOP_KEY + 1L, shop,
                                     10L, TimeUnit.SECONDS);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207171558070.png" alt="image-20220717155846966" style="zoom: 50%;" />

# 优惠卷秒杀

> 每个店铺都可以发布优惠券：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205061453374.png" alt="image-20220506145312231" style="zoom:80%;" />

> 当用户抢购时，就会生成订单并保存到tb_voucher_order这张表中
>

```sql
drop table if exists `tb_voucher_order`;
create table `tb_voucher_order`  (
  `id` bigint(20) not null comment '主键',
  `user_id` bigint(20) unsigned not null comment '下单的用户id',
  `voucher_id` bigint(20) unsigned not null comment '购买的代金券id',
  `pay_type` tinyint(1) unsigned not null default 1 
                        comment '支付方式 1：余额支付；2：支付宝；3：微信',
  `status` tinyint(1) unsigned not null default 1 
           comment '订单状态，1：未支付；2：已支付；3：已核销；4：已取消；5：退款中；6：已退款',
  `create_time` timestamp not null default current_timestamp comment '下单时间',
  `pay_time` timestamp null default null comment '支付时间',
  `use_time` timestamp null default null comment '核销时间',
  `refund_time` timestamp null default null comment '退款时间',
  `update_time` timestamp not null default current_timestamp on update current_timestamp 
                comment '更新时间',
  primary key (`id`) using btree
) engine = innodb character set = utf8mb4 collate = utf8mb4_general_ci ;
```

## 数据库表

每个店铺都可以发布优惠券，分为平价券和特价券。平价券可以任意购买，而特价券需要秒杀抢购：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205061525932.png" alt="image-20220506152500803" style="zoom:80%;" />

表关系如下：

- tb_voucher：优惠券的基本信息，优惠金额、使用规则等
- tb_seckill_voucher：优惠券的库存、开始抢购时间，结束抢购时间。特价优惠券才需要填写这些信息

```sql
CREATE TABLE `tb_voucher` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `shop_id` bigint(20) unsigned DEFAULT NULL COMMENT '商铺id',
  `title` varchar(255) NOT NULL COMMENT '代金券标题',
  `subTitle` varchar(1024) DEFAULT NULL COMMENT '副标题',
  `rules` varchar(1024) DEFAULT NULL COMMENT '使用规则',
  `pay_value` bigint(10) unsigned NOT NULL COMMENT '支付金额，单位是分。例如200代表2元',
  `actual_value` bigint(10) NOT NULL COMMENT '抵扣金额，单位是分。例如200代表2元',
  `type` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '0,普通券；1,秒杀券',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '1,上架; 2,下架; 3,过期',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT
```

```sql
CREATE TABLE `tb_seckill_voucher` (
  `voucher_id` bigint(20) unsigned NOT NULL COMMENT '关联的优惠券的id',
  `stock` int(8) unsigned NOT NULL COMMENT '库存',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `begin_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '生效时间',
  `end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '失效时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`voucher_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='秒杀优惠券表，与优惠券是一对一关系'
```



## 全局唯一ID👍

### 唯一ID组成

> 当用户抢购时，就会生成订单并保存到tb_voucher_order这张表中，而订单表如果使用数据库自增ID就存在一些问题：id的规律性太明显，受单表数据量的限制
>

> 全局ID生成器，是一种分布式系统下用来生成全局唯一ID的工具，一般要满足下列特性
>

> **唯一性、高可用、高性能、递增性、安全性**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207171714017.png" alt="image-20220717171435924" style="zoom:50%;" />

> 为了增加ID的安全性，我们可以不直接使用Redis自增的数值，而是拼接一些其他的信息
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220313220007022.png" alt="image-20220313220007022" style="zoom: 80%;" />

ID组成部分

> - 符号位：1bit，`永远为0`
> - 时间戳：31bit，`以秒为单位，可以使用69年`
> - 序列号：32bit，`秒内的计数器，支持每秒产生2的32次方个不同ID`

### 生成策略

- UUID
- Redis自增
- snowflake算法
- 数据自增

Redis自增ID策略

- 每天一个key，方便统计订单量
- ID构造是：时间戳+计数器

### 自定义ID生成器

```java
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

@Component
public class RedisIdWorker {
    //开始时间，单位秒
    private static final long begin_timeStrap = 1640995200L;
    //序列号位数
    private static final int count_bits = 32;

    @Resource
    private StringRedisTemplate stringRedisTemplate;
    
    public long nextId(String keyPrefix) {
        //1、生成时间戳，单位秒
        LocalDateTime now = LocalDateTime.now();
        long nowSecond = now.toEpochSecond(ZoneOffset.UTC);
        // timestamp：46459560
        long timestamp = nowSecond - begin_timeStrap;
        //2、生成序列号(每一天)
        //2.1 当前日期，精确到天，以当前日期来分隔每一天的ID，避免超过：date：20230622
        String date = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        //2.2 自增长key
        Long count = stringRedisTemplate.opsForValue()
                                        .increment("icr:" + keyPrefix + ":" + date);
        //3、拼接并返回：timestamp << 32表示向左移动32位，因为当前时间戳在低位，需要移动到中间
        //| count或运算，最终结果：199541474742771044，十进制，转成二进制就是32位了
        return timestamp << 32 | count ;
    }
}
```

### 雪花算法👍

> 可以自己写，当然也可以使用hutool工具类提供的雪花算法
>

```xml
<dependency>
    <groupId>cn.hutool</groupId>
    <artifactId>hutool-all</artifactId>
    <version>5.7.17</version>
</dependency>
```

```java
@Component
public class RedisIdWorker {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    public long nextId(String keyPrefix) {
        // 参数1为终端ID,参数2为数据中心ID
        Snowflake snowflake = IdUtil.getSnowflake(1, 1);
        long snowflakeNextId = snowflake.nextId();
        // 生成key对应的日期
        LocalDateTime now = LocalDateTime.now();
        String date = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        // 设置key时要加上当天日期，value就是雪花算法生成的ID
        stringRedisTemplate.opsForValue()
                .set("icr:"+keyPrefix+":"+date,String.valueOf(snowflakeNextId));
        return snowflakeNextId;
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230622173557766.png" alt="image-20230622173557766" style="zoom:80%;" />

### 测试唯一ID

```java
@Resource
private RedisIdWorker redisIdWorker;

//建立500线程
private ExecutorService es = Executors.newFixedThreadPool(500);

@Test
void testIdWork() throws InterruptedException {
    CountDownLatch latch = new CountDownLatch(300);
    Runnable task = () -> {
        for (int i = 0; i < 100; i++) {
            long id = redisIdWorker.nextId("order");
            System.out.println("id = " + id);
        }
        latch.countDown();
    };
    long begin = System.currentTimeMillis();
    for (int i = 0; i < 300; i++) {
        es.submit(task);
    }
    latch.await();
    long end = System.currentTimeMillis();
    System.out.println("time = "+(end-begin));
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220314140912379.png" alt="image-20220314140912379" style="zoom: 67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230622173557766.png" alt="image-20230622173557766" style="zoom:80%;" />

## 添加优惠卷

> 在VoucherController中提供了一个接口，添加秒杀优惠券：向tb_voucher和tb_seckill_voucher同时添加

### Voucher

> 注意：这两个表是合并在一起的，其中tb_voucher为主表，tb_seckill_voucher字段用exist=false

```java
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("tb_voucher")
public class Voucher implements Serializable {
    private static final long serialVersionUID = 1L;
    // 主键
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    // 商铺id
    private Long shopId;
    // 代金券标题
    private String title;
    // 副标题
    private String subTitle;
    // 使用规则
    private String rules;
    // 支付金额
    private Long payValue;
    // 抵扣金额
    private Long actualValue;
    // 优惠券类型
    private Integer type;
    // 优惠券类型
    private Integer status;
    // 库存
    @TableField(exist = false)
    private Integer stock;
    // 生效时间
    @TableField(exist = false)
    private LocalDateTime beginTime;
    // 失效时间
    @TableField(exist = false)
    private LocalDateTime endTime;
    // 创建时间
    private LocalDateTime createTime;
    // 更新时间
    private LocalDateTime updateTime;
}
```

### VoucherController

```java
// 新增秒杀券 @param voucher 优惠券信息，包含秒杀信息 @return 优惠券id
@PostMapping("seckill")
public Result addSeckillVoucher(@RequestBody Voucher voucher) {
    voucherService.addSeckillVoucher(voucher);
    return Result.ok(voucher.getId());
}
```

### IVoucherService

```java
public interface IVoucherService extends IService<Voucher> {
	// 新增优惠卷
    void addSeckillVoucher(Voucher voucher);
}
```

### VoucherServiceImpl

```java
@Service
public class VoucherServiceImpl extends ServiceImpl<VoucherMapper, Voucher> 
    implements IVoucherService {

    @Resource
    private ISeckillVoucherService seckillVoucherService;

    @Override
    @Transactional
    public void addSeckillVoucher(Voucher voucher) {
        // 保存优惠券
        save(voucher);
        // 保存秒杀信息
        SeckillVoucher seckillVoucher = new SeckillVoucher();
        seckillVoucher.setVoucherId(voucher.getId());
        seckillVoucher.setStock(voucher.getStock());
        seckillVoucher.setBeginTime(voucher.getBeginTime());
        seckillVoucher.setEndTime(voucher.getEndTime());
        seckillVoucherService.save(seckillVoucher);
    }
}
```

> 插入数据

```json
{
  "actualValue": 10000,
  "payValue": 8000,
  "rules": "全程通用\\n无需预约\\n可无限叠加\\n仅限堂食",
  "shopId": 1,
  "stock": 100,
  "subTitle": "周一到周日均可用",
  "title": "100元代金券",
  "type": 1,
  "beginTime": "2023-06-21T10:09:15",
  "endTime": "2023-06-25T10:09:15"
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230622181142955.png" alt="image-20230622181142955" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230622182711425.png" alt="image-20230622182711425" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230622182732751.png" alt="image-20230622182732751" style="zoom:80%;" />



## 集群搭建

使用jvm锁在单工程单服务情况下确实没有问题，但是在集群情况下会怎样？

接下启动多个服务并使用nginx负载均衡，结构如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208302225501.png" alt="1606453095867" style="zoom:80%;" />

### IDEA启动多个实例

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209051306914.png" alt="image-20220905130647864" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209051305202.png" alt="image-20220905130502147" style="zoom: 70%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209051305643.png" alt="image-20220905130547595" style="zoom:80%;" />

启动三个服务（端口号分别8081 8082 8083），如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209051307784.png" alt="image-20220905130737730" style="zoom:80%;" />

### 配置Nginx⭐

**Linux版安装**

> 因为使用的是windows版本，这步可以省略了

```shell
# 拉取镜像
docker pull nginx:latest
# 创建nginx对应资源、日志及配置目录
mkdir -p /opt/nginx/logs /opt/nginx/conf /opt/nginx/html
# 先在conf目录下创建nginx.conf文件，配置内容参照下方
cd /opt/nginx/conf
vim nginx.conf
# 再运行容器
docker run -d -p 80:80 --name nginx -v /opt/nginx/html:/usr/share/nginx/html -v /opt/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v /opt/nginx/logs:/var/log/nginx nginx
```

**nginx.conf⭐⭐**

```nginx
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    
    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;
    #gzip  on;

    #include /etc/nginx/conf.d/*.conf;
	# 配置负载均衡
	upstream distributed {
		server 192.168.0.155:8081 max_fails=5 fail_timeout=10s weight=1;
		server 192.168.0.155:8082 max_fails=5 fail_timeout=10s weight=2;
		server 192.168.0.155:8083 max_fails=5 fail_timeout=10s weight=1;
	}
	
	server {
	   listen       80;
       server_name  127.0.0.1;
		location / {
			proxy_pass http://distributed;
		}
	}
}
```

### 启动nginx测试⭐

双击nginx.exe启动即可，或者进入CMD执行

```apl
start nginx #启动 
nginx -s stop #快速停止 
nginx -s quit #优雅关闭，在退出前完成已经接受的连接请求 
nginx -s reload #重新加载配置
```

在浏览器中测试：127.0.0.1是我的nginx服务器地址

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202209051316589.png" alt="image-20220905131639538" style="zoom:80%;" />

经过测试，通过nginx访问服务一切正常。

### Jmeter压力测试

注意：先把数据库库存量还原到5000。

参照之前的测试用例，再创建一个新的测试组：参数给之前一样

![1606467848874](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208302225553.png)

配置nginx的地址及 服务的访问路径如下：

![1606467953589](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208302225722.png)

测试结果：性能只是略有提升。

![image-20220313215233371](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208302225808.png)

数据库库存剩余量如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623100200532.png" alt="image-20230623100200532" style="zoom:80%;" />

又出现了并发问题，即出现了超卖现象。

## 实现秒杀下单(基础版)

### 基本流程

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205061551730.png" alt="image-20220506155138575" style="zoom:80%;" />

下单时需要判断两点：

> - 秒杀是否开始或结束，如果尚未开始或已经结束则无法下单
>
> - 库存是否充足，不足则无法下单
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205061552551.png" alt="image-20220506155215486" style="zoom:80%;" />

### VoucherOrderController

```java
@RestController
@RequestMapping("/voucher-order")
public class VoucherOrderController {
    @Resource
    private IVoucherOrderService voucherOrderService;

    @PostMapping("seckill/{id}")
    public Result seckillVoucher(@PathVariable("id") Long voucherId) {
        return voucherOrderService.seckillVoucher(voucherId);
    }
}
```

### IVoucherOrderService

```java
public interface IVoucherOrderService extends IService<VoucherOrder> {
    Result seckillVoucher(Long voucherId);
}
```

### VoucherOrderServiceImpl⭐

> 库存扣减和订单新增

```java
@Service
public class VoucherOrderServiceImpl extends ServiceImpl<VoucherOrderMapper, 
VoucherOrder>
                                     implements IVoucherOrderService {

    @Resource
    private ISeckillVoucherService seckillVoucherService;

    @Resource
    private RedisIdWorker redisIdWorker;

    @Override
    @Transactional
    public Result seckillVoucher(Long voucherId) {
        // 1.查询优惠券
        SeckillVoucher voucher = seckillVoucherService.getById(voucherId);
        // 2.判断秒杀是否开始
        if (voucher.getBeginTime().isAfter(LocalDateTime.now())) {
            // 尚未开始
            return Result.fail("秒杀尚未开始！");
        }
        // 3.判断秒杀是否已经结束
        if (voucher.getEndTime().isBefore(LocalDateTime.now())) {
            // 尚未开始
            return Result.fail("秒杀已经结束！");
        }
        // 4. 判断库存是否充足
        if (voucher.getStock() < 1) {
            // 扣减失败
            return Result.fail("库存不足！");
        }

        // 5.扣减库存
        boolean success = seckillVoucherService.update()
                .setSql("stock = stock - 1") // set stock = stock - 1
                .eq("voucher_id", voucherId) // where id = ?
                .update();
        // 4. 判断库存是否充足
        if (!success) {
            // 扣减失败
            return Result.fail("库存不足！");
        }
        // 7.创建订单(存入订单表中)
        VoucherOrder voucherOrder = new VoucherOrder();
        // 7.1.生成订单id
        long orderId = redisIdWorker.nextId("order");
        voucherOrder.setId(orderId);
        // 7.2.用户id(从UserHolder中取)
        // Long userId = UserHolder.getUser().getId();
        // 之前创建的用户，做测试用
        Long userId = 4L;
        voucherOrder.setUserId(userId);
        // 7.3.代金券id
        voucherOrder.setVoucherId(voucherId);
        save(voucherOrder);
        // 7.返回订单id
        return Result.ok(orderId);
    }
}
```

> 测试之前，需要先登录，就是将authorization生成的token放入header中

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230622221156250.png" alt="image-20230622221156250" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230622221210884.png" alt="image-20230622221210884" style="zoom: 67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230622221017299.png" alt="image-20230622221017299" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230622220949376.png" alt="image-20230622220949376" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230622221242182.png" alt="image-20230622221242182" style="zoom:80%;" />





## 库存超卖问题

### 超卖重现

> 修改库存为100，添加请求头

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230622222050215.png" alt="image-20230622222050215" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230622222103838.png" alt="image-20230622222103838" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623100434029.png" alt="image-20230623100434029" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623100200532.png" style="zoom:80%;" />

### 悲观锁和乐观锁

> 超卖问题是典型的多线程安全问题，针对这一问题的常见解决方案就是加锁：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205061611791.png" alt="image-20220506161112678" style="zoom:80%;" />

#### 乐观锁

> 乐观锁的关键是判断之前查询得到的数据是否有被修改过，常见的方式有两种：
>

##### 版本号法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205061612418.png" alt="image-20220506161248365" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205061613347.png" alt="image-20220506161305280" style="zoom:80%;" />

##### CAS法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205061613525.png" alt="image-20220506161330472" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205061613854.png" alt="image-20220506161343791" style="zoom:80%;" />

#### 乐观锁解决超卖

> 在上面代码修改，在扣减前判断库存是否>0即可
>

```java
// 5.扣减库存
boolean success = seckillVoucherService.update()
        .setSql("stock = stock - 1") // set stock = stock - 1
        .eq("voucher_id", voucherId).gt("stock", 0)// where id = ? and stock > 0
        .update();
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623101535457.png" alt="image-20230623101535457" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623101523497.png" alt="image-20230623101523497" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623101505074.png" alt="image-20230623101505074" style="zoom:80%;" />

> 超卖这样的线程安全问题，解决方案有哪些？

> 1.悲观锁：添加同步锁，让线程串行执行

- 优点：简单粗暴
- 缺点：性能一般

> 2.乐观锁：不加锁，在更新时判断是否有其它线程在修改

- 优点：性能好
- 缺点：存在成功率低的问题

## 一人一单问题

> 需求：修改秒杀业务，要求同一个优惠券，一个用户只能下一单
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205061624407.png" alt="image-20220506162444343" style="zoom:80%;" />

> VoucherOrderServiceImpl，继续在上面超卖方法上解决

### 基础版本

> 无法解决一人一单问题

```java
@Override
@Transactional
public Result seckillVoucher(Long voucherId) {
    // 1.查询优惠券
    SeckillVoucher voucher = seckillVoucherService.getById(voucherId);
    // 2.判断秒杀是否开始
    if (voucher.getBeginTime().isAfter(LocalDateTime.now())) {
        // 尚未开始
        return Result.fail("秒杀尚未开始！");
    }
    // 3.判断秒杀是否已经结束
    if (voucher.getEndTime().isBefore(LocalDateTime.now())) {
        // 尚未开始
        return Result.fail("秒杀已经结束！");
    }
    // 4. 判断库存是否充足
    if (voucher.getStock() < 1) {
        // 扣减失败
        return Result.fail("库存不足！");
    }

    // 5.一人一单🚗
    // Long userId = UserHolder.getUser().getId();
    // 测试用
    Long userId = 4L;
    // 查询订单
    Integer count = query().eq("user_id", userId).eq("voucher_id", voucherId).count();
    // 判断是否存在
    if (count > 0) {
        return Result.fail("用户已经购买过一次");
    }

    // 6.扣减库存
    boolean success = seckillVoucherService.update()
            .setSql("stock = stock - 1") // set stock = stock - 1
            .eq("voucher_id", voucherId) .gt("stock", 0)// where id = ?
            .update();
    // 7. 判断库存是否充足
    if (!success) {
        // 扣减失败
        return Result.fail("库存不足！");
    }
    // 8.创建订单(存入订单表中)
    VoucherOrder voucherOrder = new VoucherOrder();
    // 8.1.生成订单id
    long orderId = redisIdWorker.nextId("order");
    voucherOrder.setId(orderId);
    // 8.2.用户id(从UserHolder中取)
    // Long userId = UserHolder.getUser().getId();
    // 之前创建的用户，做测试用
    //Long userId = 4L;
    voucherOrder.setUserId(userId);
    // 8.3.代金券id
    voucherOrder.setVoucherId(voucherId);
    save(voucherOrder);
    // 9.返回订单id
    return Result.ok(orderId);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623103051658.png" alt="image-20230623103051658" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623103119128.png" alt="image-20230623103119128" style="zoom:80%;" />

### 进阶版本

> 分布式锁

> 配置Redisson

```xml
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson</artifactId>
    <version>3.11.2</version>
</dependency>
```

```java
@Configuration
public class RedissonConfig {

    @Bean
    public RedissonClient redissonClient(){
        Config config = new Config();
        // 可以用"rediss://"来启用SSL连接
        config.useSingleServer().setAddress("redis://192.168.88.101:6379")
                                .setPassword("315217");
        return Redisson.create(config);
    }
}
```

> VoucherOrderServiceImpl继续修改，同时解决了超卖和一人一单

```java
@Override
public Result seckillVoucher(Long voucherId) {
    // 1.查询优惠券
    SeckillVoucher voucher = seckillVoucherService.getById(voucherId);
    // 2.判断秒杀是否开始
    if (voucher.getBeginTime().isAfter(LocalDateTime.now())) {
        // 尚未开始
        return Result.fail("秒杀尚未开始！");
    }
    // 3.判断秒杀是否已经结束
    if (voucher.getEndTime().isBefore(LocalDateTime.now())) {
        // 尚未开始
        return Result.fail("秒杀已经结束！");
    }
    // 4. 判断库存是否充足
    if (voucher.getStock() < 1) {
        // 扣减失败
        return Result.fail("库存不足！");
    }
    // 将原来的扣减方法提取出来上锁
    return createVoucherOrder(voucherId);
}
```

```java
@Resource
private RedissonClient redissonClient;

@Transactional
public Result createVoucherOrder(Long voucherId) {
    // 5.一人一单
    // Long userId = UserHolder.getUser().getId();
    // 测试用
    Long userId = 4L;
    // 创建锁对象
    RLock redisLock = redissonClient.getLock("lock:order:" + userId);
    // 尝试获取锁
    boolean isLock = redisLock.tryLock();
    // 判断
    if(!isLock){
        // 获取锁失败，直接返回失败或者重试
        return Result.fail("不允许重复下单！");
    }
    try {
        // 5.1.查询订单
        int count = query().eq("user_id", userId).eq("voucher_id", voucherId).count();
        // 5.2.判断是否存在
        if (count > 0) {
            // 用户已经购买过了
            return Result.fail("用户已经购买过一次！");
        }
        // 6.扣减库存
        boolean success = seckillVoucherService.update()
                .setSql("stock = stock - 1") // set stock = stock - 1
                .eq("voucher_id", voucherId).gt("stock", 0) // where id = ? and stock>0
                .update();
        if (!success) {
            // 扣减失败
            return Result.fail("库存不足！");
        }
        // 7.创建订单
        VoucherOrder voucherOrder = new VoucherOrder();
        // 7.1.订单id
        long orderId = redisIdWorker.nextId("order");
        voucherOrder.setId(orderId);
        // 7.2.用户id
        voucherOrder.setUserId(userId);
        // 7.3.代金券id
        voucherOrder.setVoucherId(voucherId);
        save(voucherOrder);
        // 7.返回订单id
        return Result.ok(orderId);
    } finally {
        // 释放锁
        redisLock.unlock();
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623103618272.png" alt="image-20230623103618272" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623103547777.png" alt="image-20230623103547777" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623103606568.png" alt="image-20230623103606568" style="zoom:80%;" />

## 秒杀优化⭐

### 思路分析

> 同步秒杀

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205061708920.png" alt="image-20220506170813794" style="zoom:80%;" />

> 异步秒杀

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205061710878.png" alt="image-20220506171055778" style="zoom:80%;" />

### 执行流程⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205061711513.png" alt="image-20220506171138453" style="zoom:80%;" />

> ①新增秒杀优惠券的同时，将优惠券信息保存到Redis中
>
> ②基于Lua脚本，判断秒杀库存、一人一单，决定用户是否抢购成功
>
> ③如果抢购成功，将优惠券id和用户id封装后存入阻塞队列
>
> ④开启线程任务，不断从阻塞队列中获取信息，实现异步下单功能

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205061712845.png" alt="image-20220506171202751" style="zoom:80%;" />

秒杀业务的优化思路是什么？

> ①先利用Redis完成库存余量、一人一单判断，完成抢单业务
>
> ②再将下单业务放入阻塞队列，利用独立线程异步下单
>
> ②基于阻塞队列的异步秒杀存在哪些问题？内存限制问题、数据安全问题

### 基础代码

#### 修改新增秒杀券

> VoucherController

```java
/**
 * 新增秒杀券
 * @param voucher 优惠券信息，包含秒杀信息
 * @return 优惠券id
 */
@PostMapping("seckill")
public Result addSeckillVoucher(@RequestBody Voucher voucher) {
    voucherService.addSeckillVoucher(voucher);
    return Result.ok(voucher.getId());
}
```

```java
public interface IVoucherService extends IService<Voucher> {
    void addSeckillVoucher(Voucher voucher);
}
```

```java
@Service
public class VoucherServiceImpl extends ServiceImpl<VoucherMapper, Voucher> 
                                implements IVoucherService {

    @Resource
    private ISeckillVoucherService seckillVoucherService;
	// 保存结果到Redis中
    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Override
    @Transactional
    public void addSeckillVoucher(Voucher voucher) {
        // 保存优惠券
        save(voucher);
        // 保存秒杀信息
        SeckillVoucher seckillVoucher = new SeckillVoucher();
        seckillVoucher.setVoucherId(voucher.getId());
        seckillVoucher.setStock(voucher.getStock());
        seckillVoucher.setBeginTime(voucher.getBeginTime());
        seckillVoucher.setEndTime(voucher.getEndTime());
        seckillVoucherService.save(seckillVoucher);
        // 保存秒杀库存到Redis中，seckill:stock:
        stringRedisTemplate.opsForValue()
            .set(RedisConstants.SECKILL_STOCK_KEY + voucher.getId(), 
                 voucher.getStock().toString());
    }
}
```

> 访问测试

```json
{
  "actualValue": 10000,
  "payValue": 8000,
  "rules": "全程通用\\n无需预约\\n可无限叠加\\n仅限堂食",
  "shopId": 1,
  "stock": 100,
  "subTitle": "周一到周日均可用",
  "title": "100元代金券",
  "type": 1,
  "beginTime": "2023-06-21T10:09:15",
  "endTime": "2023-06-25T10:09:15"
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623112835475.png" alt="image-20230623112835475" style="zoom:80%;" />

> 在redis中保存库存

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623112911638.png" alt="image-20230623112911638" style="zoom:67%;" />

#### seckill.lua

> 直接放在resource目录下即可

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623115641273.png" alt="image-20230623115641273" style="zoom:67%;" />

```lua
-- 1.参数列表
-- 1.1.优惠券id
local voucherId = ARGV[1]
-- 1.2.用户id
local userId = ARGV[2]
-- 1.3.订单id
local orderId = ARGV[3]

-- 2.数据key
-- 2.1.库存key
local stockKey = 'seckill:stock:' .. voucherId
-- 2.2.订单key
local orderKey = 'seckill:order:' .. voucherId

-- 3.脚本业务
-- 3.1.判断库存是否充足 get stockKey,因为获取的是字符串类型，需要转换成number
if(tonumber(redis.call('get', stockKey)) <= 0) then
    -- 3.2.库存不足，返回1
    return 1
end
-- 3.2.判断用户是否下单 SISMEMBER orderKey userId SISMEMBER判断是否是成员
if(redis.call('sismember', orderKey, userId) == 1) then
    -- 3.3.存在，说明是重复下单，返回2
    return 2
end
-- 3.4.扣库存 incrby stockKey -1
redis.call('incrby', stockKey, -1)
-- 3.5.下单（保存用户）sadd orderKey userId
redis.call('sadd', orderKey, userId)
return 0
```

#### VoucherOrderServiceImpl

> 还是改造方法，将上面的一人一单和超卖一起解决

```java
@Service
public class VoucherOrderServiceImpl extends ServiceImpl<VoucherOrderMapper, 
                                     VoucherOrder>
                                     implements IVoucherOrderService {

     @Resource
     private RedisIdWorker redisIdWorker;
     @Resource
     private StringRedisTemplate stringRedisTemplate;

     private static final DefaultRedisScript<Long> SECKILL_SCRIPT;

    static {
         SECKILL_SCRIPT = new DefaultRedisScript<>();
         SECKILL_SCRIPT.setLocation(new ClassPathResource("seckill.lua"));
         SECKILL_SCRIPT.setResultType(Long.class);
     }

    @Override
    public Result seckillVoucher(Long voucherId) {
        // 这边使用自定义ID，用来测试
        //Long userId = UserHolder.getUser().getId();
        Long userId = 4L;
        long orderId = redisIdWorker.nextId("order");
         // 1.执行lua脚本
         Long result = stringRedisTemplate.execute(
                 SECKILL_SCRIPT,
                 Collections.emptyList(),
                 voucherId.toString(), userId.toString(), String.valueOf(orderId)
         );
         int r = result.intValue();
         // 2.判断结果是否为0
         if (r != 0) {
             // 2.1.不为0 ，代表没有购买资格
             return Result.fail(r == 1 ? "库存不足" : "不能重复下单");
         }
         // 为0，有购买资格，把下单信息保存到阻塞队列TODO

         // 3.返回订单id
         return Result.ok(orderId);
     }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623123032883.png" alt="image-20230623123032883" style="zoom: 67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623123104013.png" alt="image-20230623123104013" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623123126071.png" alt="image-20230623123126071" style="zoom:80%;" />

### 优化代码(消息队列)

> ①创建一个Stream类型的消息队列，名为stream.orders
>

```sh
xgroup create stream.orders g1 0 mkstream
```

> ②修改之前的秒杀下单Lua脚本seckill.lua，在认定有抢购资格后，直接向stream.orders中添加消息，内容包含voucherId、userId、orderId

```lua
-- 1.参数列表
-- 1.1.优惠券id
local voucherId = ARGV[1]
-- 1.2.用户id
local userId = ARGV[2]
-- 1.3.订单id
local orderId = ARGV[3]
-- 2.数据key
-- 2.1.库存key
local stockKey = 'seckill:stock:' .. voucherId
-- 2.2.订单key
local orderKey = 'seckill:order:' .. voucherId

-- 3.脚本业务
-- 3.1.判断库存是否充足 get stockKey,因为获取的是字符串类型，需要转换成number
if(tonumber(redis.call('get', stockKey)) <= 0) then
    -- 3.2.库存不足，返回1
    return 1
end
-- 3.2.判断用户是否下单 SISMEMBER orderKey userId SISMEMBER判断是否是成员
if(redis.call('sismember', orderKey, userId) == 1) then
    -- 3.3.存在，说明是重复下单，返回2
    return 2
end
-- 3.4.扣库存 incrby stockKey -1
redis.call('incrby', stockKey, -1)
-- 3.5.下单（保存用户）sadd orderKey userId
redis.call('sadd', orderKey, userId)
-- 3.6.发送消息到队列中， XADD stream.orders * k1 v1 k2 v2 ...
redis.call('xadd', 'stream.orders', '*', 'userId', userId, 'voucherId', voucherId, 
                                         'id', orderId)
return 0
```

> ③项目启动时，开启一个线程任务，尝试获取stream.orders中的消息，完成下单

```java
@Slf4j
@Service
public class VoucherOrderServiceImpl extends ServiceImpl<VoucherOrderMapper, 
VoucherOrder> implements IVoucherOrderService {

    @Resource
    private ISeckillVoucherService seckillVoucherService;

    @Resource
    private RedisIdWorker redisIdWorker;
    @Resource
    private RedissonClient redissonClient;
    @Resource
    private StringRedisTemplate stringRedisTemplate;

    private static final DefaultRedisScript<Long> SECKILL_SCRIPT;

    static {
        SECKILL_SCRIPT = new DefaultRedisScript<>();
        SECKILL_SCRIPT.setLocation(new ClassPathResource("seckill.lua"));
        SECKILL_SCRIPT.setResultType(Long.class);
    }

    private static final ExecutorService SECKILL_ORDER_EXECUTOR = 
        Executors.newSingleThreadExecutor();

    @PostConstruct
    private void init() {
        SECKILL_ORDER_EXECUTOR.submit(new VoucherOrderHandler());
    }

    private class VoucherOrderHandler implements Runnable {

        @Override
        public void run() {
            while (true) {
                try {
                    // 1.获取消息队列中的订单信息 
                    // XREADGROUP GROUP g1 c1 COUNT 1 BLOCK 2000 STREAMS s1 >
                    List<MapRecord<String, Object, Object>> list = 
                        stringRedisTemplate.opsForStream().read(
                            Consumer.from("g1", "c1"),
                            StreamReadOptions.empty().count(1)
                                             .block(Duration.ofSeconds(2)),
                            StreamOffset.create("stream.orders", 
                                                ReadOffset.lastConsumed())
                    );
                    // 2.判断订单信息是否为空
                    if (list == null || list.isEmpty()) {
                        // 如果为null，说明没有消息，继续下一次循环
                        continue;
                    }
                    // 解析数据
                    MapRecord<String, Object, Object> record = list.get(0);
                    Map<Object, Object> value = record.getValue();
                    VoucherOrder voucherOrder = BeanUtil.fillBeanWithMap(value, 
                                                        new VoucherOrder(), true);
                    // 3.创建订单
                    createVoucherOrder(voucherOrder);
                    // 4.确认消息 XACK
                    stringRedisTemplate.opsForStream().acknowledge("s1", "g1", 
                                                                   record.getId());
                } catch (Exception e) {
                    log.error("处理订单异常", e);
                    handlePendingList();
                }
            }
        }

        private void handlePendingList() {
            while (true) {
                try {
                    // 1.获取pending-list中的订单信息 
                    // XREADGROUP GROUP g1 c1 COUNT 1 BLOCK 2000 STREAMS s1 0
                    List<MapRecord<String, Object, Object>> list = 
                        stringRedisTemplate.opsForStream().read(
                            Consumer.from("g1", "c1"),
                            StreamReadOptions.empty().count(1),
                            StreamOffset.create("stream.orders", ReadOffset.from("0"))
                    );
                    // 2.判断订单信息是否为空
                    if (list == null || list.isEmpty()) {
                        // 如果为null，说明没有异常消息，结束循环
                        break;
                    }
                    // 解析数据
                    MapRecord<String, Object, Object> record = list.get(0);
                    Map<Object, Object> value = record.getValue();
                    VoucherOrder voucherOrder = BeanUtil.fillBeanWithMap(value, 
                                                    new VoucherOrder(), true);
                    // 3.创建订单
                    createVoucherOrder(voucherOrder);
                    // 4.确认消息 XACK
                    stringRedisTemplate.opsForStream().acknowledge("s1", "g1", 
                                                                   record.getId());
                } catch (Exception e) {
                    log.error("处理订单异常", e);
                }
            }
        }
    }


    private void createVoucherOrder(VoucherOrder voucherOrder) {
        Long userId = voucherOrder.getUserId();
        Long voucherId = voucherOrder.getVoucherId();
        // 创建锁对象
        RLock redisLock = redissonClient.getLock("lock:order:" + userId);
        // 尝试获取锁
        boolean isLock = redisLock.tryLock();
        // 判断
        if (!isLock) {
            // 获取锁失败，直接返回失败或者重试
            log.error("不允许重复下单！");
            return;
        }
        try {
            // 5.1.查询订单
            int count = query().eq("user_id", userId).eq("voucher_id", 
                                                         voucherId).count();
            // 5.2.判断是否存在
            if (count > 0) {
                // 用户已经购买过了
                log.error("不允许重复下单！");
                return;
            }

            // 6.扣减库存
            boolean success = seckillVoucherService.update()
                    .setSql("stock = stock - 1") // set stock = stock - 1
                     // where id = ? and stock > 0
                    .eq("voucher_id", voucherId).gt("stock", 0) 
                    .update();
            if (!success) {
                // 扣减失败
                log.error("库存不足！");
                return;
            }
            // 7.创建订单
            save(voucherOrder);
        } finally {
            // 释放锁
            redisLock.unlock();
        }
    }

    @Override
    public Result seckillVoucher(Long voucherId) {
        Long userId = UserHolder.getUser().getId();
        long orderId = redisIdWorker.nextId("order");
        // 1.执行lua脚本
        Long result = stringRedisTemplate.execute(
                SECKILL_SCRIPT,
                Collections.emptyList(),
                voucherId.toString(), userId.toString(), String.valueOf(orderId)
        );
        int r = result.intValue();
        // 2.判断结果是否为0
        if (r != 0) {
            // 2.1.不为0 ，代表没有购买资格
            return Result.fail(r == 1 ? "库存不足" : "不能重复下单");
        }
        // 3.返回订单id
        return Result.ok(orderId);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623154751032.png" alt="image-20230623154751032" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230623154805914.png" alt="image-20230623154805914" style="zoom:80%;" />



# 达人探店

## 发布探店笔记

探店笔记类似点评网站的评价，往往是图文结合。对应的表有两个：

> - tb_blog：探店笔记表，包含笔记中的标题、文字、图片等
> - tb_blog_comments：其他用户对探店笔记的评价

```sql
CREATE TABLE `tb_blog` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `shop_id` bigint(20) NOT NULL COMMENT '商户id',
  `user_id` bigint(20) unsigned NOT NULL COMMENT '用户id',
  `title` varchar(255)  NOT NULL COMMENT '标题',
  `images` varchar(2048) NOT NULL COMMENT '探店的照片，最多9张，多张以","隔开',
  `content` varchar(2048)  NOT NULL COMMENT '探店的文字描述',
  `liked` int(8) unsigned zerofill DEFAULT '00000000' COMMENT '点赞数量',
  `comments` int(8) unsigned zerofill DEFAULT NULL COMMENT '评论数量',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE 
                                   CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT
```

```sql
CREATE TABLE `tb_blog_comments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint(20) unsigned NOT NULL COMMENT '用户id',
  `blog_id` bigint(20) unsigned NOT NULL COMMENT '探店id',
  `parent_id` bigint(20) unsigned zerofill NOT NULL COMMENT '关联的1级评论id，如果是一级评论，则值为0',
  `answer_id` bigint(20) unsigned NOT NULL COMMENT '回复的评论id',
  `content` varchar(255) NOT NULL COMMENT '回复的内容',
  `liked` int(8) unsigned zerofill DEFAULT NULL COMMENT '点赞数',
  `status` tinyint(1) unsigned zerofill DEFAULT NULL COMMENT '状态，0：正常，1：被举报，2：禁止查看',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205051150085.png" alt="image-20220505115017963" style="zoom:80%;" />



### 发布流程

> 注意：上传图片和发布笔记是两个接口
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205051151205.png" alt="image-20220505115158093" style="zoom:80%;" />

### 上传图片

#### 基本配置

```java
public class SystemConstants {
    public static final String IMAGE_UPLOAD_DIR = "D:\360yasuo";
    public static final String USER_NICK_NAME_PREFIX = "user_";
    public static final int DEFAULT_PAGE_SIZE = 5;
    public static final int MAX_PAGE_SIZE = 10;
}
```

```properties
# 单个文件上传大小,值可以使用后缀“MB”或“KB”分别表示兆字节或千字节
spring.servlet.multipart.max-file-size=100MB
# 最大请求大小。值可以使用后缀“MB”或“KB”分别表示兆字节或千字节
spring.servlet.multipart.max-request-size=100MB
```

#### 实体类

```java
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("tb_blog")
public class Blog implements Serializable {
    private static final long serialVersionUID = 1L;
    //主键
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    //商户id
    private Long shopId;
    //用户id
    private Long userId;
    //用户图标
    @TableField(exist = false)
    private String icon;
    //用户姓名
    @TableField(exist = false)
    private String name;
    //标题
    private String title;
    // 探店的照片，最多9张，多张以","隔开
    private String images;
    //探店的文字描述
    private String content;
    //点赞数量
    private Integer liked;
    //是否点赞过
    @TableField(exist = false)
    private Boolean isLike;
    //评论数量
    private Integer comments;
    // 创建时间
    private LocalDateTime createTime;
    //更新时间
    private LocalDateTime updateTime;
}
```

#### 上传图片并获取图片名称

```java
@Slf4j
@RestController
@RequestMapping("upload")
public class UploadController {

    //上传图片
    @PostMapping("blog")
    public Result uploadImage(@RequestParam("file") MultipartFile image) {
        try {
            // 获取原始文件名称
            String originalFilename = image.getOriginalFilename();
            // 生成新文件名
            String fileName = createNewFileName(originalFilename);
            // 保存文件
            image.transferTo(new File(SystemConstants.IMAGE_UPLOAD_DIR, fileName));
            // 返回结果
            log.debug("文件上传成功，{}", fileName);
            return Result.ok(fileName);
        } catch (IOException e) {
            throw new RuntimeException("文件上传失败", e);
        }
    }
    //删除图片
    @GetMapping("/blog/delete")
    public Result deleteBlogImg(@RequestParam("name") String filename) {
        File file = new File(SystemConstants.IMAGE_UPLOAD_DIR, filename);
        if (file.isDirectory()) {
            return Result.fail("错误的文件名称");
        }
        FileUtil.del(file);
        return Result.ok();
    }
    //获取图片名
    private String createNewFileName(String originalFilename) {
        // 获取后缀
        String suffix = StrUtil.subAfter(originalFilename, ".", true);
        // 生成目录
        String name = UUID.randomUUID().toString();
        int hash = name.hashCode();
        int d1 = hash & 0xF;
        int d2 = (hash >> 4) & 0xF;
        // 判断目录是否存在
        File dir = new File(SystemConstants.IMAGE_UPLOAD_DIR, 
                            StrUtil.format("/blogs/{}/{}", d1, d2));
        if (!dir.exists()) {
            dir.mkdirs();
        }
        // 生成文件名
        return StrUtil.format("/blogs/{}/{}/{}.{}", d1, d2, name, suffix);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624161938006.png" alt="image-20230624161938006" style="zoom:80%;" />

### 发布博客

```java
@RestController
@RequestMapping("/blog")
public class BlogController {

    @Resource
    private IBlogService blogService;
    @Resource
    private IUserService userService;

    @PostMapping
    public Result saveBlog(@RequestBody Blog blog) {
        // 获取登录用户
        UserDTO user = UserHolder.getUser();
        blog.setUserId(user.getId());
        // 保存探店博文
        blogService.save(blog);
        // 返回id
        return Result.ok(blog.getId());
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624162130177.png" alt="image-20230624162130177" style="zoom:80%;" />

## 查看探店笔记

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624162342945.png" alt="image-20230624162342945" style="zoom:80%;" />

> BlogController

```java
@GetMapping("/{id}")
public Result queryBlogById(@PathVariable("id") Long id) {
    return blogService.queryBlogById(id);
}
```

```java
public interface IBlogService extends IService<Blog> {
    Result queryBlogById(Long id);
}
```

```java
@Service
public class BlogServiceImpl extends ServiceImpl<BlogMapper, Blog> 
                             implements IBlogService {

    @Resource
    private IUserService userService;

    @Override
    public Result queryBlogById(Long id) {
        // 1.查询blog
        Blog blog = getById(id);
        if (blog == null) {
            return Result.fail("笔记不存在！");
        }
        // 2.查询blog有关的用户
        queryBlogUser(blog);
        return Result.ok(blog);
    }
    //查询blog有关的用户（根据blog保存的userId,去用户表查询name和icon并返回）
    private void queryBlogUser(Blog blog) {
        Long userId = blog.getUserId();
        User user = userService.getById(userId);
        blog.setName(user.getNickName());
        blog.setIcon(user.getIcon());
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624163235695.png" alt="image-20230624163235695" style="zoom:80%;" />

## 查询热门笔记(分页)

```java
@GetMapping("/hot")
public Result queryHotBlog(@RequestParam(value = "current", defaultValue = "1")
                                         Integer current) {
    return blogService.queryHotBlog(current);
}
```

```java
public interface IBlogService extends IService<Blog> {

    Result queryBlogById(Long id);

	// 查询热门日志
    Result queryHotBlog(Integer current);
}
```

```java
@Override
public Result queryHotBlog(Integer current) {
    // 根据用户查询
    Page<Blog> page = query().orderByDesc("liked")
                             .page(new Page<>(current, SystemConstants.MAX_PAGE_SIZE));
    // 获取当前页数据
    List<Blog> records = page.getRecords();
    // 根据blog保存的id查询用户，调用下面的queryBlogUser方法
    // 也就是每一条blog都要查询对应的用户名和头像
    records.forEach(this::queryBlogUser);
    return Result.ok(records);
}
```

```java
//查询blog有关的用户(公共方法)
private void queryBlogUser(Blog blog) {
    Long userId = blog.getUserId();
    User user = userService.getById(userId);
    blog.setName(user.getNickName());
    blog.setIcon(user.getIcon());
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624172504424.png" alt="image-20230624172504424" style="zoom:80%;" />

# 点赞功能

## 点赞流程

在首页的探店笔记排行榜和探店图文详情页面都有点赞的功能：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624165442248.png" alt="image-20230624165442248" style="zoom:80%;" />

> - `同一个用户只能点赞一次，再次点击则取消点赞`
>
> - 如果当前用户已经点赞，`则点赞按钮高亮显示（前端已实现，判断字段Blog类的isLike属性）`

## 点赞功能

> 1. 给Blog类中添加一个isLike字段，`标示是否被当前用户点赞`
> 2. 修改点赞功能，`利用Redis的set集合判断是否点赞过，未点赞过则点赞数+1，已点赞过则点赞数-1`
> 3. 修改根据id查询Blog的业务，判断当前登录用户是否点赞过，赋值给isLike字段
> 4. 修改分页查询Blog业务，判断当前登录用户是否点赞过，赋值给isLike字段

```java
// blog
@TableField(exist = false)
private Boolean isLike;
```

```java
// blogController
@PutMapping("/like/{id}")
public Result likeBlog(@PathVariable("id") Long id) {
    return blogService.likeBlog(id);
}
```

```java
public interface IBlogService extends IService<Blog> {
    Result queryBlogById(Long id);
    Result likeBlog(Long id);
}
```

```java
// BlogServiceImpl
@Override
public Result likeBlog(Long id) {
    // 1.获取登录用户
    Long userId = UserHolder.getUser().getId();
    // 2.判断当前登录用户是否已经点赞
    String key = "blog:liked:" + id;
    //使用zset去重，避免单用户重复点赞，同时记录点赞时间，用来排名
    Boolean isMember = stringRedisTemplate.opsForSet().isMember(key, userId.toString());
    if (BooleanUtil.isFalse(isMember)) {
        // 3.如果未点赞，可以点赞
        // 3.1.数据库点赞数 + 1
        boolean isSuccess = update().setSql("liked = liked + 1")
                .eq("id", id).update();
        // 3.2.保存用户到Redis的set集合  zadd key value score
        if (isSuccess) {
            stringRedisTemplate.opsForSet()
                                .add(key, userId.toString());
        }
    } else {
        // 4.如果已点赞，取消点赞
        // 4.1.数据库点赞数 -1
        boolean isSuccess = update().setSql("liked = liked - 1")
                                    .eq("id", id).update();
        // 4.2.把用户从Redis的set集合移除
        if (isSuccess) {
            stringRedisTemplate.opsForSet().remove(key, userId.toString());
        }
    }
    return Result.ok();
}
```

> 重复点击，分别对应点赞和取消点赞

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624171234678.png" alt="image-20230624171234678" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624171337040.png" alt="image-20230624171337040" style="zoom:80%;" />

> 查看博客时，看是否被点过赞，修改上面的查看探店笔记代码
>

```java
@Override
public Result queryBlogById(Long id) {
    // 1.查询blog
    Blog blog = getById(id);
    if (blog == null) {
        return Result.fail("笔记不存在！");
    }
    // 2.查询blog有关的用户
    queryBlogUser(blog);
    // 3.查询blog是否被点赞
    isBlogLiked(blog);
    return Result.ok(blog);
}
```

```java
//查询blog有关的用户(公共方法)
private void queryBlogUser(Blog blog) {
    Long userId = blog.getUserId();
    User user = userService.getById(userId);
    blog.setName(user.getNickName());
    blog.setIcon(user.getIcon());
}
```

```java
private void isBlogLiked(Blog blog) {
    // 1.获取登录用户
    UserDTO user = UserHolder.getUser();
    if (user == null) {
        // 用户没登录，无需查询是否点赞
        return;
    }
    Long userId = user.getId();
    // 2.判断当前登录用户是否已经点赞
    String key = "blog:liked:" + blog.getId();
    Double score = stringRedisTemplate.opsForZSet().score(key, userId.toString());
    blog.setIsLike(score != null);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624172740051.png" alt="image-20230624172740051" style="zoom:67%;" />

> 修改热门博客，显示是否点过赞

```java
@Override
public Result queryHotBlog(Integer current) {
    // 根据用户查询
    Page<Blog> page = query().orderByDesc("liked")
                             .page(new Page<>(current, SystemConstants.MAX_PAGE_SIZE));
    // 获取当前页数据
    List<Blog> records = page.getRecords();
    // 根据blog保存的id查询用户，调用下面的queryBlogUser方法
    // 也就是每一条blog都要查询对应的用户名和头像
    // 修改这里，判断每一条博客是否都点赞了
    records.forEach(blog -> {
        this.queryBlogUser(blog);
        this.isBlogLiked(blog);
    });
    return Result.ok(records);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624173108549.png" alt="image-20230624173108549" style="zoom:67%;" />

## 点赞排行榜

### 基本流程

> 在探店笔记的详情页面，应该把给该笔记点赞的人显示出来，比如最早点赞的TOP5，形成点赞排行榜
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205051119465.png" alt="image-20220505111914366" style="zoom:80%;" />

> 需求：按照点赞时间先后排序，返回Top5的用户
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220316185453164.png" alt="image-20220316185453164" style="zoom: 80%;" />

### 修改成Zset

> 修改上面的点赞功能，增加排序功能

```java
@Service
public class BlogServiceImpl extends ServiceImpl<BlogMapper, Blog> 
                             implements IBlogService {

    @Resource
    private IUserService userService;
    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public Result queryBlogById(Long id) {
        // 1.查询blog
        Blog blog = getById(id);
        if (blog == null) {
            return Result.fail("笔记不存在！");
        }
        // 2.查询blog有关的用户
        queryBlogUser(blog);
        // 3.查询blog是否被点赞
        isBlogLiked(blog);
        return Result.ok(blog);
    }

    @Override
    public Result likeBlog(Long id) {
        // 1.获取登录用户
        Long userId = UserHolder.getUser().getId();
        // 2.判断当前登录用户是否已经点赞
        String key = "blog:liked:" + id;
        //使用zset去重，避免单用户重复点赞，同时记录点赞时间，用来排名
        Double score = stringRedisTemplate.opsForZSet().score(key, userId.toString());
        if (score == null) {
            // 3.如果未点赞，可以点赞
            // 3.1.数据库点赞数 + 1
            boolean isSuccess = update().setSql("liked = liked + 1")
                    .eq("id", id).update();
            // 3.2.保存用户到Redis的set集合  zadd key value score
            if (isSuccess) {
                stringRedisTemplate.opsForZSet()
                                    .add(key, 
                                    userId.toString(),System.currentTimeMillis());
            }
        } else {
            // 4.如果已点赞，取消点赞
            // 4.1.数据库点赞数 -1
            boolean isSuccess = update().setSql("liked = liked - 1")
                                        .eq("id", id).update();
            // 4.2.把用户从Redis的set集合移除
            if (isSuccess) {
                stringRedisTemplate.opsForZSet().remove(key, userId.toString());
            }
        }
        return Result.ok();
    }

    @Override
    public Result queryHotBlog(Integer current) {
        // 根据用户查询
        Page<Blog> page = query().orderByDesc("liked")
                                 .page(new Page<>(current, 
                                                  SystemConstants.MAX_PAGE_SIZE));
        // 获取当前页数据
        List<Blog> records = page.getRecords();
        // 根据blog保存的id查询用户，调用下面的queryBlogUser方法
        // 也就是每一条blog都要查询对应的用户名和头像
        records.forEach(blog -> {
            this.queryBlogUser(blog);
            this.isBlogLiked(blog);
        });
        return Result.ok(records);
    }


    //查询blog有关的用户
    private void queryBlogUser(Blog blog) {
        Long userId = blog.getUserId();
        User user = userService.getById(userId);
        blog.setName(user.getNickName());
        blog.setIcon(user.getIcon());
    }

    private void isBlogLiked(Blog blog) {
        // 1.获取登录用户
        Long userId = UserHolder.getUser().getId();
        // 2.判断当前登录用户是否已经点赞
        String key = "blog:liked:" + blog.getId();
        Double score = stringRedisTemplate.opsForZSet().score(key, userId.toString());
        blog.setIsLike(score != null);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624195845213.png" alt="image-20230624195845213" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624195832039.png" alt="image-20230624195832039" style="zoom:80%;" />

### 点赞排行榜

```java
@GetMapping("/likes/{id}")
public Result queryBlogLikes(@PathVariable("id") Long id) {
    return blogService.queryBlogLikes(id);
}
```

```java
public interface IBlogService extends IService<Blog> {

    Result queryBlogById(Long id);

    Result likeBlog(Long id);

    Result queryHotBlog(Integer current);
	// 点赞排行榜
    Result queryBlogLikes(Long id);
}
```

```java
@Override
public Result queryBlogLikes(Long id) {
    String key = "blog:liked:" + id;
    // 1.查询top5的点赞用户 zrange key 0 4
    Set<String> top5 = stringRedisTemplate.opsForZSet().range(key, 0, 4);
    if (top5 == null || top5.isEmpty()) {
        return Result.ok(Collections.emptyList());
    }
    // 2.解析出其中的用户id
    List<Long> ids = top5.stream().map(Long::valueOf).collect(Collectors.toList());
    String idStr = StrUtil.join(",", ids);
    // 3.根据用户id查询用户 WHERE id IN ( 5 , 1 ) ORDER BY FIELD(id, 5, 1)
    // 因为查询in会出现乱序的情况，所以要加上order by field
    List<UserDTO> userDTOS = userService.query()
            .in("id", ids).last("ORDER BY FIELD(id," + idStr + ")").list()
            .stream()
            .map(user -> BeanUtil.copyProperties(user, UserDTO.class))
            .collect(Collectors.toList());
    // 4.返回
    return Result.ok(userDTOS);
}
```

> 往Redis中保存几条数据

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624200934697.png" alt="image-20230624200934697" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624201122099.png" alt="image-20230624201122099" style="zoom:80%;" />



# 好友关注

[Redis实现微博好友功能微服务（关注，取关，共同关注）](https://mp.weixin.qq.com/s?__biz=MzU2MTI4MjI0MQ==&mid=2247521075&idx=1&sn=55c459baf6230c8ac7957932a80016f0&chksm=fc79fe9dcb0e778b0b8c7149507105019ca3bb612384f878051aedd6969e71e536f69271d1fa&mpshare=1&scene=23&srcid=1228oqqbyMbcrvbTvEuRXKU8&sharer_sharetime=1672239327901&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

## 关注和取关

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220316185703379.png" alt="image-20220316185703379" style="zoom:67%;" />

> **需求**：基于该表数据结构，实现两个接口：

> 1. **关注和取关接口**
> 2. **判断是否关注的接口**

> 关注是User之间的关系，**是博主与粉丝的关系**，数据库中有一张`tb_follow中间表`来标示
>

```sql
drop table if exists `tb_follow`;
create table `tb_follow`  (
  `id` bigint(20) not null auto_increment comment '主键',
  `user_id` bigint(20) unsigned not null comment '用户id',
  `follow_user_id` bigint(20) unsigned not null comment '关联的用户id',
  `create_time` timestamp not null default current_timestamp comment '创建时间',
  primary key (`id`) using btree
) engine = innodb auto_increment = 1 character set = utf8mb4;
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624223320512.png" alt="image-20230624223320512" style="zoom:80%;" />

> 注意: 这里需要把主键修改为自增长，简化开发
>

### Follow

```java
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("tb_follow")
public class Follow implements Serializable {
    private static final long serialVersionUID = 1L;
    //主键
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    //用户id
    private Long userId;
    //关联的用户id
    private Long followUserId;
    //创建时间
    private LocalDateTime createTime;
}
```

### FollowController

```java
@RestController
@RequestMapping("/follow")
public class FollowController {

    @Resource
    private IFollowService followService;

    // 关注
    // 参数分别是：被关注的用户id，关注还是取关
    @PutMapping("/{id}/{isFollow}")
    public Result follow(@PathVariable("id") Long followUserId,
                         @PathVariable("isFollow") Boolean isFollow) {
        return followService.follow(followUserId, isFollow);
    }
    // 有没有关注
    @GetMapping("/or/not/{id}")
    public Result isFollow(@PathVariable("id") Long followUserId) {
        return followService.isFollow(followUserId);
    }
}
```

### IFollowService

```java
public interface IFollowService extends IService<Follow> {
    Result follow(Long followUserId, Boolean isFollow);
    Result isFollow(Long followUserId);
}
```

```java
@Service
public class FollowServiceImpl extends ServiceImpl<FollowMapper, Follow> 
                               implements IFollowService {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Resource
    private IUserService userService;

    @Override
    public Result follow(Long followUserId, Boolean isFollow) {
        // 1.获取登录用户
        Long userId = UserHolder.getUser().getId();
        String key = "follows:" + userId;
        // 1.判断到底是关注还是取关
        if (isFollow) {
            // 2.关注，新增数据
            Follow follow = new Follow();
            follow.setUserId(userId);
            follow.setFollowUserId(followUserId);
            boolean isSuccess = save(follow);
            if (isSuccess) {
                // 把关注用户的id，放入redis的set集合 sadd userId followerUserId
                stringRedisTemplate.opsForSet().add(key, followUserId.toString());
            }
        } else {
            // 3.取关删除delete from tb_follow where user_id = ? and follow_user_id = ?
            boolean isSuccess = remove(new QueryWrapper<Follow>()
                    .eq("user_id", userId).eq("follow_user_id", followUserId));
            if (isSuccess) {
                // 把关注用户的id从Redis集合中移除
                stringRedisTemplate.opsForSet().remove(key, followUserId.toString());
            }
        }
        return Result.ok();
    }

    //上面需要使用它
    @Override
    public Result isFollow(Long followUserId) {
        // 1.获取登录用户
        Long userId = UserHolder.getUser().getId();
        // 2.查询是否关注
        //select count(*) from tb_follow where user_id = ? and follow_user_id = ?
        Integer count = query().eq("user_id", userId).eq("follow_user_id",
                followUserId).count();
        // 3.判断
        return Result.ok(count > 0);
    }
}
```

### 测试功能

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624224801912.png" alt="image-20230624224801912" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624224827706.png" alt="image-20230624224827706" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624224840492.png" alt="image-20230624224840492" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624224900670.png" alt="image-20230624224900670" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624224928941.png" alt="image-20230624224928941" style="zoom:80%;" />

## 共同关注

> 需求：利用Redis中set，实现共同关注功能。在博主个人页面展示出当前用户与博主的共同好友。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624225222165.png" alt="image-20230624225222165" style="zoom:67%;" />

> 在上面关注和取关功能里面，已经使用了set集合，现在就是取交集

### FollowController

```java
// 传入的id是另一个用户的id
@GetMapping("/common/{id}")
public Result followCommons(@PathVariable("id") Long id){
    return followService.followCommons(id);
}
```

### FollowService

```java
Result followCommons(Long id);
```

```java
@Override
public Result followCommons(Long id) {
    // 1.获取当前用户
    Long userId = UserHolder.getUser().getId();
    String key = "follows:" + userId;
    // 2.求交集
    String key2 = "follows:" + id;
    Set<String> intersect = stringRedisTemplate.opsForSet().intersect(key, key2);
    if (intersect == null || intersect.isEmpty()) {
        // 无交集
        return Result.ok(Collections.emptyList());
    }
    // 3.解析id集合
    List<Long> ids = intersect.stream()
                     .map(Long::valueOf).collect(Collectors.toList());
    // 4.查询用户
    List<UserDTO> users = userService.listByIds(ids)
            .stream()
            .map(user -> BeanUtil.copyProperties(user, UserDTO.class))
            .collect(Collectors.toList());
    return Result.ok(users);
}
```

### 测试功能

> 手动添加数据，当前用户是1010，求另一个用户和当前用户的共同关注

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624230237333.png" alt="image-20230624230237333" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624230223928.png" alt="image-20230624230223928" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230624230340520.png" alt="image-20230624230340520" style="zoom:67%;" />



## 共同推送(重要)

### Feed流

关注推送也叫做Feed流，直译为投喂。为用户持续的提供“沉浸式”的体验，通过无限下拉刷新获取新的信息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625094728110.png" alt="image-20230625094728110" style="zoom:80%;" />

### 常见模式

**Timeline**：不做内容筛选，简单的按照内容发布时间排序，常用于好友或关注。例如朋友圈

> - 优点：信息全面，不会有缺失。并且实现也相对简单
>
> - 缺点：信息噪音较多，用户不一定感兴趣，内容获取效率低

**智能排序**：利用智能算法屏蔽掉违规的、用户不感兴趣的内容。推送用户感兴趣信息来吸引用户

> - 优点：投喂用户感兴趣信息，用户粘度很高，容易沉迷
>
> - 缺点：如果算法不精准，可能起到反作用

本例中的个人页面，是基于关注的好友来做Feed流，因此采用Timeline的模式。实现方案有三种：

> - 拉模式、推模式、推拉结合

#### 拉模式

> **拉模式**：也叫做读扩散

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625095023677.png" alt="image-20230625095023677" style="zoom:80%;" />

#### 推模式

> 推模式：也叫做写扩散

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625095821854.png" alt="image-20230625095821854" style="zoom:80%;" />

#### 推拉结合模式

> **推拉结合模式**：也叫做读写混合，兼具推和拉两种模式的优点

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625095857686.png" alt="image-20230625095857686" style="zoom:80%;" />



#### 模式对比

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220316191328266.png" alt="image-20220316191328266" style="zoom: 80%;" />

### 推模式实现

> ①修改新增探店笔记的业务，在保存blog到数据库的同时，推送到粉丝的收件箱
>
> ②收件箱满足可以根据时间戳排序，必须用Redis的数据结构实现
>
> ③查询收件箱数据时，可以实现分页查询

> BlogController的saveBlog原方法

```java
@PostMapping
public Result saveBlog(@RequestBody Blog blog) {
    // 获取登录用户
    UserDTO user = UserHolder.getUser();
    blog.setUserId(user.getId());
    // 保存探店博文
    blogService.save(blog);
    // 返回id
    return Result.ok(blog.getId());
}
```

> 修改saveBlog方法

```java
@PostMapping
public Result saveBlog(@RequestBody Blog blog) {
    return blogService.saveBlog(blog);
}
```

```java
Result saveBlog(Blog blog);
```

```java
@Override
public Result saveBlog(Blog blog) {
    // 1.获取登录用户
    UserDTO user = UserHolder.getUser();
    blog.setUserId(user.getId());
    // 2.保存探店笔记
    boolean isSuccess = save(blog);
    if(!isSuccess){
        return Result.fail("新增笔记失败!");
    }
    // 3.查询笔记作者的所有粉丝
    // select * from tb_follow where follow_user_id = ?
    List<Follow> follows = followService.query()
                    .eq("follow_user_id", user.getId()).list();
    // 4.推送笔记id给所有粉丝
    for (Follow follow : follows) {
        // 4.1.获取粉丝id
        Long userId = follow.getUserId();
        // 4.2.推送
        String key = "feed:" + userId;
        stringRedisTemplate.opsForZSet()
                .add(key, blog.getId().toString(), System.currentTimeMillis());
    }

    // 5.返回id
    return Result.ok(blog.getId());
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625101540049.png" alt="image-20230625101540049" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625101859997.png" alt="image-20230625101859997" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625101953964.png" alt="image-20230625101953964" style="zoom:80%;" />



### Feed流分页问题

> Feed流中的数据会不断更新，所以数据的角标也在变化，因此不能采用传统的分页模式
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220316191506741.png" alt="image-20220316191506741" style="zoom:67%;" />

#### 滚动分页

> 在这里进行滚动分页测试

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625103254430.png" alt="image-20230625103254430" style="zoom:80%;" />

> 滚动分页查询参数：
>
> - max:  当前时间戳丨上一次查询的最小时间戳
> - min:0
> - offset:0 ：在上一次的结果中，与最小值一样的元素的个数
> - count:3

```sh
# 第一次查询，最大值就是时间戳的最大值，就是当前时间，这里设置的1000是表示最大值
zrevrangebyscore z1 1000 0 withscores limit 0 3
zrevrangebyscore z1 6 0 withscores limit 2 3
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625103754890.png" alt="image-20230625103754890" style="zoom:80%;" />

#### 滚动实现

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625104346940.png" alt="image-20230625104346940" style="zoom:80%;" />

```java
@Data
public class ScrollResult {
    private List<?> list;
    private Long minTime;
    private Integer offset;
}
```

> BlogController

```java
@GetMapping("/of/follow")
// max：上一次查询的最小时间戳，也就是本次查询的最大时间戳
// offset：本次跳过的元素个数
public Result queryBlogOfFollow(
        @RequestParam("lastId") Long max, 
        @RequestParam(value = "offset", defaultValue = "0") 
        Integer offset){
    return blogService.queryBlogOfFollow(max, offset);
}
```

```java
Result queryBlogOfFollow(Long max, Integer offset);
```

```java
@Override
public Result queryBlogOfFollow(Long max, Integer offset) {
    // 1.获取当前用户
    Long userId = UserHolder.getUser().getId();
    // 2.查询收件箱 ZREVRANGEBYSCORE key Max Min LIMIT offset count
    String key = "feed:" + userId;
    Set<ZSetOperations.TypedTuple<String>> typedTuples = 
             stringRedisTemplate.opsForZSet()
        	 // key，min，max，offset,count
            .reverseRangeByScoreWithScores(key, 0, max, offset, 2);
    // 3.非空判断
    if (typedTuples == null || typedTuples.isEmpty()) {
        return Result.ok();
    }
    // 4.解析数据：blogId、minTime（时间戳）、offset
    List<Long> ids = new ArrayList<>(typedTuples.size());
    long minTime = 0; // 2
    int os = 1; // 2
    // 5 4 4 2 2
    for (ZSetOperations.TypedTuple<String> tuple : typedTuples) { 
        // 4.1.获取id
        ids.add(Long.valueOf(tuple.getValue()));
        // 4.2.获取分数(时间戳）
        long time = tuple.getScore().longValue();
        if(time == minTime){
            os++;
        }else{
            minTime = time;
            os = 1;
        }
    }
    // 5.根据id查询blog,in+field实现范围排序查询
    String idStr = StrUtil.join(",", ids);
    List<Blog> blogs = query().in("user_id", ids)
                      .last("ORDER BY FIELD(id," + idStr + ")").list();
    for (Blog blog : blogs) {
        // 5.1.查询blog有关的用户
        queryBlogUser(blog);
        // 5.2.查询blog是否被点赞
        isBlogLiked(blog);
    }
    // 6.封装并返回
    ScrollResult r = new ScrollResult();
    r.setList(blogs);
    r.setOffset(os);
    r.setMinTime(minTime);
    return Result.ok(r);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625115416859.png" alt="image-20230625115416859" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625115514505.png" alt="image-20230625115514505" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625115435752.png" alt="image-20230625115435752" style="zoom:80%;" />



# 附近商铺(geo)

## GEO数据结构

### 基本语法

> GEO就是Geolocation的简写形式，代表地理坐标。Redis在3.2版本中加入了对GEO的支持，允许存储地理坐标信息，帮助我们根据经纬度来检索数据。常见的命令有：
>

> [GEOADD](https://redis.io/commands/geoadd)：添加一个地理空间信息，包含：经度（longitude）、纬度（latitude）、值（member）

> [GEODIST](https://redis.io/commands/geodist)：计算指定的两个点之间的距离并返回

> [GEOHASH](https://redis.io/commands/geohash)：将指定member的坐标转为hash字符串形式并返回

> [GEOPOS](https://redis.io/commands/geopos)：返回指定member的坐标

> [GEORADIUS](https://redis.io/commands/georadius)：指定圆心、半径，找到该圆内包含的所有member，并按照与圆心之间的距离排序后返回。6.2后已废弃

> [GEOSEARCH](https://redis.io/commands/geosearch)：在指定范围内搜索member，并按照与指定点之间的距离排序后返回。范围可以是圆形或矩形。6.2.新功能

> [GEOSEARCHSTORE](https://redis.io/commands/geosearchstore)：与GEOSEARCH功能一致，不过可以把结果存储到一个指定的key。 6.2.新功能

### 实战案例

> 北京南站（ 116.378248 39.865275 ）北京站（ 116.42803 39.903738 ）北京西站 116.322287 39.893729 
>

```apl
geoadd g1 116.378248 39.865275 bjn 116.42803 39.903738 bjz  116.322287 39.893729 bjx
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205050934761.png" alt="image-20220505093433695" style="zoom:80%;" />

计算北京西站到北京站的距离

```apl
geodist g1 bjn bjx
geodist g1 bjn bjx km
geodist g1 bjx bjz km
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205050950905.png" alt="image-20220505095051851" style="zoom:80%;" />

搜索天安门（ 116.397904 39.909005 ）附近10km内的所有火车站，并按照距离升序排序

```apl
# byradius按照圆形搜索,bybox，按照矩形搜索
geosearch g1 fromlonlat 116.397904 39.909005  byradius 10 km withdist
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205050951828.png" alt="image-20220505095142776" style="zoom: 80%;" />

```apl
# 返回该地点的经纬度
geopos g1 bjz
# 返回该地点的hash值
geohash g1 bjz
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205050952396.png" alt="image-20220505095235340" style="zoom:80%;" />



## 附近商户搜索

### 功能描述

> 在首页中点击某个频道，即可看到频道下的商户：
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625145919912.png" alt="image-20230625145919912" style="zoom:80%;" />

> 按照商户类型做分组，类型相同的商户作为同一组，以typeId为key存入同一个GEO集合中即可
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205051045857.png" alt="image-20220505104540789" style="zoom:80%;" />

### 依赖切换

> SpringDataRedis的2.3.9版本并不支持Redis 6.2提供的GEOSEARCH命令，因此我们需要提示其版本，修改自己的POM文件，内容如下：
>

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.data</groupId>
            <artifactId>spring-data-redis</artifactId>
        </exclusion>
        <exclusion>
            <groupId>io.lettuce</groupId>
            <artifactId>lettuce-core</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.springframework.data</groupId>
    <artifactId>spring-data-redis</artifactId>
    <version>2.6.2</version>
</dependency>
<dependency>
    <groupId>io.lettuce</groupId>
    <artifactId>lettuce-core</artifactId>
    <version>6.1.6.RELEASE</version>
</dependency>
```

### 数据导入

> 将数据库内的经纬度坐标导入Redis中
>

```java
@Resource
private StringRedisTemplate stringRedisTemplate;

@Resource
private ShopServiceImpl shopService;

@Test
void loadShopData() {
    // 1.查询店铺信息
    List<Shop> list = shopService.list();
    // 2.把店铺分组，按照typeId分组，typeId一致的放到一个集合(type表示店铺类型，如美食、美发)
    Map<Long, List<Shop>> map = list.stream()
                                .collect(Collectors.groupingBy(Shop::getTypeId));
    // 3.分批完成写入Redis
    for (Map.Entry<Long, List<Shop>> entry : map.entrySet()) {
        // 3.1.获取类型id
        Long typeId = entry.getKey();
        String key = "shop:geo:" + typeId;
        // 3.2.获取同类型的店铺的集合
        List<Shop> value = entry.getValue();
        List<RedisGeoCommands.GeoLocation<String>> locations = new ArrayList<>
                                                                   (value.size());
        // 3.3.写入redis GEOADD key 经度 纬度 member
        for (Shop shop : value) {
            //简单写法(性能低)因为需要重复迭代
            //stringRedisTemplate.opsForGeo().add(key, 
            //new Point(shop.getX(), shop.getY()), shop.getId().toString());
            locations.add(new RedisGeoCommands.GeoLocation<>(
                    shop.getId().toString(),
                    new Point(shop.getX(), shop.getY())
            ));
        }
        stringRedisTemplate.opsForGeo().add(key, locations);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625150807070.png" alt="image-20230625150807070" style="zoom:80%;" />

### 搜索实现

> ShopController

```java
//根据商铺类型分页查询商铺信息
//typeId：店铺类型，current：当前页码，x,y表示经纬度
@GetMapping("/of/type")
public Result queryShopByType(
        @RequestParam("typeId") Integer typeId,
        @RequestParam(value = "current", defaultValue = "1") Integer current,
        @RequestParam(value = "x", required = false) Double x,
        @RequestParam(value = "y", required = false) Double y) {
    return shopService.queryShopByType(typeId, current, x, y);
}
```

```java
Result queryShopByType(Integer typeId, Integer current, Double x, Double y);
```

```java
@Resource
private StringRedisTemplate stringRedisTemplate;

@Override
public Result queryShopByType(Integer typeId, Integer current, Double x, Double y) {
    // 1.判断是否需要根据坐标查询
    if (x == null || y == null) {
        // 不需要坐标查询，按数据库查询
        Page<Shop> page = query()
                .eq("type_id", typeId)
                .page(new Page<>(current, SystemConstants.DEFAULT_PAGE_SIZE));
        // 返回数据
        return Result.ok(page.getRecords());
    }

    // 2.计算分页参数：5
    int from = (current - 1) * SystemConstants.DEFAULT_PAGE_SIZE;
    int end = current * SystemConstants.DEFAULT_PAGE_SIZE;

    // 3.查询redis、按照距离排序、分页。结果：shopId、distance
    String key = "shop:geo:" + typeId;
    // GEOSEARCH key BYLONLAT x y BYRADIUS 10 WITHDISTANCE
    GeoResults<RedisGeoCommands.GeoLocation<String>> results = 
        stringRedisTemplate.opsForGeo() 
            .search(
                    key, // 指定圆心
                    GeoReference.fromCoordinate(x, y),
                    //5000表示5km范围内
                    new Distance(5000), // withdistance+分页
                    RedisGeoCommands.GeoSearchCommandArgs
                                    .newGeoSearchArgs().includeDistance().limit(end)
            );
    
    // 4.解析出id
    if (results == null) {
        return Result.ok(Collections.emptyList());
    }
    List<GeoResult<RedisGeoCommands.GeoLocation<String>>> list = results.getContent();
    if (list.size() <= from) {
        // 没有下一页了，结束
        return Result.ok(Collections.emptyList());
    }
    // 4.1.截取 from ~ end的部分
    List<Long> ids = new ArrayList<>(list.size());
    Map<String, Distance> distanceMap = new HashMap<>(list.size());
    list.stream().skip(from).forEach(result -> {
        // 4.2.获取店铺id
        String shopIdStr = result.getContent().getName();
        ids.add(Long.valueOf(shopIdStr));
        // 4.3.获取距离
        Distance distance = result.getDistance();
        distanceMap.put(shopIdStr, distance);
    });
    
    // 5.根据id查询Shop
    String idStr = StrUtil.join(",", ids);
    List<Shop> shops = query().in("id", ids)
                              .last("ORDER BY FIELD(id," + idStr + ")").list();
    // 将distance设置到shop实体类中去
    for (Shop shop : shops) {
        shop.setDistance(distanceMap.get(shop.getId().toString()).getValue());
    }
    // 6.返回
    return Result.ok(shops);
}
```

> :8082/shop/of/type

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625152051610.png" alt="image-20230625152051610" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205051030109.png" alt="image-20220505103027050" style="zoom:80%;" />

> 获取5km的店铺信息：一次显示5条，每次下拉再次刷新显示
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205051031992.png" alt="image-20220505103136929" style="zoom:80%;" />

# 用户签到

## BitMap用法

### MySQL缺点

假如我们用一张表来存储用户签到信息，其结构应该如下：

```sql
drop table if exists `tb_sign`;
create table `tb_sign`  (
  `id` bigint(20) unsigned not null auto_increment comment '主键',
  `user_id` bigint(20) unsigned not null comment '用户id',
  `year` year not null comment '签到的年',
  `month` tinyint(2) not null comment '签到的月',
  `date` date not null comment '签到的日期',
  `is_backup` tinyint(1) unsigned null default null comment '是否补签',
  primary key (`id`) using btree
) engine = innodb auto_increment = 1 character set = utf8mb4;
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625152154576.png" alt="image-20230625152154576" style="zoom:80%;" />

> 假如有1000万用户，平均每人每年签到次数为10次，则这张表一年的数据量为 1亿条
>

> 每签到一次需要使用（8 + 8 + 1 + 1 + 3 + 1）共22 字节的内存，一个月则最多需要600多字节
>

### BitMap详解

> 我们按月来统计用户签到信息，签到记录为1，未签到则记录为0,把每一个bit位对应当月的每一天，形成了映射关系。用0和1标示业务状态，这种思路就称为位图BitMap。**Redis中是利用string类型数据结构实现**BitMap，因此最大上限是512M，转换为bit则是 2^32个bit位。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625152401235.png" alt="image-20230625152401235" style="zoom:80%;" />

> [SETBIT](https://redis.io/commands/setbit)：向指定位置（offset）存入一个0或1
>
> [GETBIT](https://redis.io/commands/getbit) ：获取指定位置（offset）的bit值
>
> [BITCOUNT](https://redis.io/commands/bitcount) ：统计BitMap中值为1的bit位的数量
>
> [BITFIELD](https://redis.io/commands/bitfield) ：操作（查询、修改、自增）BitMap中bit数组中的指定位置（offset）的值
>
> [BITFIELD_RO](https://redis.io/commands/bitfield_ro) ：获取BitMap中bit数组，并以十进制形式返回
>
> [BITOP](https://redis.io/commands/bitop) ：将多个BitMap的结果做位运算（与 、或、异或）
>
> [BITPOS](https://redis.io/commands/bitpos) ：查找bit数组中指定范围内第一个0或1出现的位置

```apl
-- 设置Bitmaps中某个偏移量的值（0或1），offset:偏移量从0开始
setbit <key> <offset> <value>
```

```apl
setbit bm1 0 1
setbit bm1 1 1
setbit bm1 2 1
setbit bm1 4 1
setbit bm1 6 0
setbit bm1 7 1
```

可以发现二进制结果：11101001

```apl
getbit  bm1   2
bitcount  bm1
# u表示无符号，2表示2bit
bitfield bm1 get u2 0
bitfield bm1 get u3 0
bitfield bm1 get u4 0
```

```apl
bitpos bm1  0
bitpos bm1  1
```

## 签到功能实现

> 需求：实现签到接口，将当前用户当天签到信息保存到Redis中
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205042205904.png" alt="image-20220504220553829" style="zoom: 80%;" />

> 提示：因为BitMap底层是基于String数据结构，因此其操作也都封装在字符串相关操作中了
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205042206485.png" alt="image-20220504220613414" style="zoom:80%;" />

> 数据存储方式
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205042207838.png" alt="image-20220504220751768" style="zoom:80%;" />

> UserController

```java
@PostMapping("/sign")
public Result sign(){
    return userService.sign();
}
```

```java
Result sign();
```

```java
@Override
public Result sign() {
    // 1.获取当前登录用户id：10
    // 登录用户时，会把用户信息保存到UserHolder中
    Long userId = UserHolder.getUser().getId();
    // 2.获取日期
    LocalDateTime now = LocalDateTime.now();
    // 3.拼接key：:202205，最终拼接：sign:10:202205,即当前月份
    String keySuffix = now.format(DateTimeFormatter.ofPattern(":yyyyMM"));
    String key = "sign:" + userId + keySuffix;
    // 4.获取今天是本月的第几天：4
    int dayOfMonth = now.getDayOfMonth();
    // 5.写入Redis SETBIT key offset 1,true表示1
    // 最终拼接：key=sign:10:202205,偏移量为3：因为索引从0开始，true就是1，false就是0
    stringRedisTemplate.opsForValue().setBit(key, dayOfMonth - 1, true);
    return Result.ok();
}
```

> 结果：00010000，因为1字节=8bit，所以出现位数是8位
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205042228911.png" alt="image-20220504222806840" style="zoom:80%;" />

> 目前我只在4号签到一天，可以发现第4位是1，其他位全都是0，即我在4号进行了签到

## 连续签到统计

### 连续签到分析

> **问题1：什么叫做连续签到天数？**

> `从最后一次签到开始向前统计，直到遇到第一次未签到为止，计算总的签到次数，就是连续签到天数`

> **问题2：如何得到本月到今天为止的所有签到数据？**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625153822676.png" alt="image-20230625153822676" style="zoom:80%;" />

```sh
# 这里dayofMonth今天是几号就写几号，u是固定的，表示无符号，dayOfMonth表示今天是几号，就写几(偏移量)
# 最后一个0表示从第几位开始查，当然是从0开始
BITFIELD key GET u[dayOfMonth] 0
# 如
bitfield sign:10:202205 GET u16 0
```

> **问题3：如何从后向前遍历每个bit位？**`与1做与运算(因为只有和1做与运算的是1结果才是1，否则结果都是0)`，就能得到最后一个bit位。随后右移1位，下一个bit位就成为了最后一个bit位

### 统计实现

> 需求：实现下面接口，统计当前用户截止当前时间在本月的连续签到天数
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5/202205042247935.png" alt="image-20220504224746870" style="zoom: 80%;" />

> UserController

```java
@GetMapping("/sign/count")
public Result signCount(){
    return userService.signCount();
}
```

```java
Result signCount();
```

```java
@Override
public Result signCount() {
    // 1.获取当前登录用户
    Long userId = UserHolder.getUser().getId();
    // 2.获取日期
    LocalDateTime now = LocalDateTime.now();
    // 3.拼接key
    String keySuffix = now.format(DateTimeFormatter.ofPattern(":yyyyMM"));
    String key = "sign:" + userId + keySuffix;
    // 4.获取今天是本月的第几天
    int dayOfMonth = now.getDayOfMonth();
    // 5.获取本月截止今天为止的所有的签到记录，返回的是一个十进制的数字 
    //  bitfield sign:10:202205 GET u4 0
    List<Long> result = stringRedisTemplate.opsForValue().bitField(
            key,
            //创建子命令，对应上面的GET
            BitFieldSubCommands.create()
           .get(BitFieldSubCommands
               .BitFieldType
               .unsigned(dayOfMonth)).valueAt(0)
    );
    if (result == null || result.isEmpty()) {
        // 没有任何签到结果
        return Result.ok(0);
    }
    //取出列表中的唯一十进制整数,15958017（十进制）
    Long num = result.get(0);
    if (num == null || num == 0) {
        return Result.ok(0);
    }
    // 6.循环遍历
    int count = 0;
    while (true) {
        // 6.1.让这个数字与1做与运算，得到数字的最后一个bit位  // 判断这个bit位是否为0
        if ((num & 1) == 0) {
            // 如果为0，说明未签到，结束
            break;
        }else {
            // 如果不为0，说明已签到，计数器+1
            count++;
        }
        // 把数字右移一位，抛弃最后一个bit位，覆盖掉原num,继续下一个bit位
        num >>>= 1;
    }
    return Result.ok(count);
}
```

> 为了方便查看结果，这里先存入一部分数据

```sh
setbit sign:1010:202306 1 1
setbit sign:1010:202306 2 1
setbit sign:1010:202306 3 1
setbit sign:1010:202306 4 1
setbit sign:1010:202306 7 1
setbit sign:1010:202306 8 1
setbit sign:1010:202306 9 1
```

> 得到的十进制数字和对应的二进制值

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625155050142.png" alt="image-20230625155050142" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625154252591.png" alt="image-20230625154252591" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625154534893.png" alt="image-20230625154534893" style="zoom:80%;" />



# UV统计

## HyperLogLog

首先我们搞懂两个概念：

> UV：**全称**Unique Visitor，也叫独立访客量，是指通过互联网访问、浏览这个网页的自然人。`1天内同一个用户多次访问该网站，只记录1次`。
>

> PV：全称PageView，也叫页面访问量或点击量，用户每访问网站的一个页面，记录1次PV，`用户多次打开页面，则记录多次PV`。往往用来衡量网站的流量。
>

> UV统计在服务端做会比较麻烦，因为要判断该用户是否已经统计过了，需要将统计过的用户信息保存。`但是如果每个访问的用户都保存到Redis中，数据量会非常恐怖`。
>

> Hyperloglog(HLL)是从Loglog算法派生的概率算法，用于确定非常大的集合的基数，`而不需要存储其所有值`。相关算法原理大家可以参考：[https://juejin.cn/post/6844903785744056333#heading-0](https://juejin.cn/post/6844903785744056333)
>

> Redis中的HLL是基于string结构实现的，`单个HLL的内存永远小于16kb，内存占用低的令人发指`！作为代价，其测量结果是概率性的，有小于0.81％的误差。不过对于UV统计来说，这完全可以忽略。
>

## 基本命令

### pfadd 

```assembly
# 添加指定元素到 HyperLogLog 中  
pfadd <key> <element>[element ...]    
```

```assembly
pfadd lan java c c#
pfadd lan redis mysql
pfadd lan redis
```

> 将所有元素添加到指定HyperLogLog数据结构中。如果执行命令后HLL估计的近似**基数发生变化，则返回1，否则返回0**
>

### pfcount

> 计算HLL的近似基数，可以计算多个HLL，比如用HLL存储每天的UV，计算一周的UV可以使用7天的UV合并计算即可
>

```assembly
pfcount key [key ...] 
```

> 直接统计key内有多少个value
>

```assembly
pfcount lan
```

> 统计多个key有多少value(**自动去重**)
>

```assembly
# 你多次插入相同的值，结果也一样，是自动去重的
pfadd lan1 jdk java c#
pfadd lan1 jdk java c#
pfadd lan2 cK java cw
-- 结果为5
pfcount lan lan1  
```

### pfmerge

```assembly
# 将一个或多个HLL合并后的结果存储在另一个HLL中，比如每月活跃用户可以使用每天的活跃用户来合并计算可得
pfmerge <destkey> <sourcekey> [sourcekey ...] 
```

```assembly
# lan3不存在，lan1和lan2进行合并，自动去重，结果保存到lan3中
pfmerge lan3 lan2 lan1
```

## 单元测试

> 我们直接利用单元测试，向HyperLogLog中添加100万条数据，看看内存占用和统计效果如何
>

```java
@Resource
private StringRedisTemplate stringRedisTemplate;
@Test
void testHyperLogLog() {
    String[] values = new String[1000];
    int j = 0;
    for (int i = 0; i < 1000000; i++) {
        //每隔1000条发一次，j就一直是0-999
        j = i % 1000;
        values[j] = "user_" + i;
        if(j == 999){
            // 发送到Redis
            stringRedisTemplate.opsForHyperLogLog().add("hl2", values);
        }
    }
    // 统计数量
    Long count = stringRedisTemplate.opsForHyperLogLog().size("hl2");
    System.out.println("count = " + count);
}
```

> 结果：count = 997593，插入1000000条数据，成功997593，成功率相当高了
>

## 实战测试

> 统计用户访问次数，在拦截器中操作，第一个拦截器，拦截所有请求时进行

```java
public class RefreshTokenInterceptor implements HandlerInterceptor {
    // 注入stringRedisTemplate
    private StringRedisTemplate stringRedisTemplate;

    //因为不是Spring的类，不能@Resource注入，所以要使用构造函数来注入
    public RefreshTokenInterceptor(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }
    // 前置拦截器
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws Exception {
        //获取请求头的token，前端传过来的
        String token = request.getHeader("authorization");
        //判断token是否为空，为空也放行，感觉没必要判断，StrUtil是hutool工具包
        if (StrUtil.isBlank(token)) {
            return true;
        }
        //2、获取Redis中的用户，从Hash类型中取到
        String key = RedisConstants.LOGIN_USER_KEY + token;
        Map<Object, Object> userMap = stringRedisTemplate.opsForHash().entries(key);
        //判断用户是否存在，这里同样不要拦截，直接放行，感觉没必要判断
        if (userMap.isEmpty()) {
            return true;
        }
        //5、将查询到的Hash数据转换为userDTO对象，第三个参数表示是否忽略错误，false不忽略
        UserDTO userDTO = BeanUtil.fillBeanWithMap(userMap,
                new UserDTO(), false);
        //6、存在，保存用户信息到ThreadLocal
        UserHolder.saveUser(userDTO);
        //6、放行
        //7、刷新token有效期
        stringRedisTemplate.expire(key,RedisConstants
                                   .LOGIN_USER_TTL,RedisConstants.LOGIN_USER_TIME);
        
        // UV统计：有多少用户访问了🚗🚗🚗
        Long id = UserHolder.getUser().getId();
        stringRedisTemplate.opsForHyperLogLog().add("user:total", String.valueOf(id));
        Long size = stringRedisTemplate.opsForHyperLogLog().size("user:total");
        System.out.println("用户访问个数 = " + size);
        return true;
    }

    public void afterCompletion(HttpServletRequest request,
                                HttpServletResponse response,
                                Object handler, @Nullable Exception ex)
            throws Exception {
        //移除用户
        UserHolder.removeUser();
    }
}
```

> 登录一个用户，访问任意路径，即可发现如下，只有一个用户得到

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.6.17/image-20230625161317127.png" alt="image-20230625161317127" style="zoom:80%;" />
