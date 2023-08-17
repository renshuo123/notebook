

③创建Controller和业务方法

```java
public class QuickController {
	public String quickMethod(){
		System.out.println("quickMethod running.....");
		return "index";
	}
}
```

③创建视图页面index.jsp

```jsp
<html>
<body>
    <h2>Hello SpringMVC!</h2>
</body>
</html>
```

④配置注解

```java
@Controller
public class QuickController {
	@RequestMapping("/quick")
	public String quickMethod(){
		System.out.println("quickMethod running.....");
			return "index";
	}
}
```

⑥访问测试地址

控制台打印

页面显示

![image-20211008093931593](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211008093931593.png)



### SpringMVC流程图示

![image-20211008094007521](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211008094007521.png)





## SpringMVC的组件解析

### SpringMVC的执行流程

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211008094211304.png" alt="image-20211008094211304" style="zoom:80%;" />



①用户发送请求至前端控制器DispatcherServlet。

②DispatcherServlet收到请求调用HandlerMapping处理器映射器。

③处理器映射器找到具体的处理器(可以根据xml配置、注解进行查找)，生成处理器对象及处理器拦截器(如果有则生成)一并返回给DispatcherServlet。

④DispatcherServlet调用HandlerAdapter处理器适配器。

⑤HandlerAdapter经过适配调用具体的处理器(Controller，也叫后端控制器)。

⑥Controller执行完成返回ModelAndView。

⑦HandlerAdapter将controller执行结果ModelAndView返回给DispatcherServlet。

⑧DispatcherServlet将ModelAndView传给ViewReslover视图解析器。

⑨ViewReslover解析后返回具体View。

⑩DispatcherServlet根据View进行渲染视图（即将模型数据填充至视图中）。DispatcherServlet响应用户。



### SpringMVC组件解析

1. **前端控制器：DispatcherServlet**

​    用户请求到达前端控制器，它就相当于 MVC 模式中的 C，DispatcherServlet 是整个流程控制的中心，由

它调用其它组件处理用户的请求，DispatcherServlet 的存在降低了组件之间的耦合性。

2. **处理器映射器：HandlerMapping**

​    HandlerMapping 负责根据用户请求找到 Handler 即处理器，SpringMVC 提供了不同的映射器实现不同的

映射方式，例如：配置文件方式，实现接口方式，注解方式等。

3. **处理器适配器：HandlerAdapter**

​    通过 HandlerAdapter 对处理器进行执行，这是适配器模式的应用，通过扩展适配器可以对更多类型的处理

器进行执行。

4. **处理器：Handler**

​    它就是我们开发中要编写的具体业务控制器。由 DispatcherServlet 把用户请求转发到 Handler。由

Handler 对具体的用户请求进行处理。

5. **视图解析器：View Resolver**

​    View Resolver 负责将处理结果生成 View 视图，View Resolver 首先根据逻辑视图名解析成物理视图名，即具体的页面地址，再生成 View 视图对象，最后对 View 进行渲染将处理结果通过页面展示给用户。

6. **视图：View**

​    SpringMVC 框架提供了很多的 View 视图类型的支持，包括：jstlView、freemarkerView、pdfView等。最常用的视图就是 jsp。一般情况下需要通过页面标签或页面模版技术将模型数据通过页面展示给用户，需要由程序员根据业务需求开发具体的页面



# SpringMVC的请求(重要)

## 请求参数类型

客户端请求参数的格式是：name=value&name=value……

服务器端要获得请求的参数，有时还需要进行数据的封装，SpringMVC可以接收如下类型的参数

- 基本类型参数
- POJO类型参数，就是JavaBean
- 嵌套POJO类型参数
- 常用数组类型参数
- 集合类型参数

## 参数传递

#### 4.3.1 普通参数

* 普通参数:url地址传参，地址参数名与形参变量名相同，定义形参即可接收参数。

![1630481585729](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206050954978.png)

如果形参与地址参数名不一致该如何解决?

发送请求与参数:

```
/commonParamDifferentName?name=张三&age=18
```

后台接收参数:

```java
@RequestMapping("/commonParamDifferentName")
@ResponseBody
public String commonParamDifferentName(String userName , int age){
    System.out.println("普通参数传递 userName ==> "+userName);
    System.out.println("普通参数传递 age ==> "+age);
    return "{'module':'common param different name'}";
}
```

因为前端给的是`name`,后台接收使用的是`userName`,两个名称对不上，导致接收数据失败:

![1630481772035](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206050954991.png)

解决方案:使用@RequestParam注解

```java
@RequestMapping("/commonParamDifferentName")
    @ResponseBody
    public String commonParamDifferentName(@RequestPaam("name") String userName , int age){
        System.out.println("普通参数传递 userName ==> "+userName);
        System.out.println("普通参数传递 age ==> "+age);
        return "{'module':'common param different name'}";
    }
```

**注意:写上@RequestParam注解框架就不需要自己去解析注入，能提升框架处理性能**

#### 4.3.2 POJO数据类型

简单数据类型一般处理的是参数个数比较少的请求，如果参数比较多，那么后台接收参数的时候就比较复杂，这个时候我们可以考虑使用POJO数据类型。

* POJO参数：请求参数名与形参对象属性名相同，定义POJO类型形参即可接收参数

此时需要使用前面准备好的POJO类，先来看下User

```java
public class User {
    private String name;
    private int age;
    //setter...getter...略
}
```

发送请求和参数:

![1630482186745](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206050954975.png)

后台接收参数:

```java
//POJO参数：请求参数与形参对象中的属性对应即可完成参数传递
@RequestMapping("/pojoParam")
@ResponseBody
public String pojoParam(User user){
    System.out.println("pojo参数传递 user ==> "+user);
    return "{'module':'pojo param'}";
}
```

**注意:**

* POJO参数接收，前端GET和POST发送请求数据的方式不变。
* ==请求参数key的名称要和POJO中属性的名称一致，否则无法封装。==

#### 4.3.3 嵌套POJO类型参数

如果POJO对象中嵌套了其他的POJO类，如

```java
public class Address {
    private String province;
    private String city;
    //setter...getter...略
}
public class User {
    private String name;
    private int age;
    private Address address;
    //setter...getter...略
}
```

* 嵌套POJO参数：请求参数名与形参对象属性名相同，按照对象层次结构关系即可接收嵌套POJO属性参数

发送请求和参数:

![1630482363291](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206050954946.png)

后台接收参数:

```java
//POJO参数：请求参数与形参对象中的属性对应即可完成参数传递
@RequestMapping("/pojoParam")
@ResponseBody
public String pojoParam(User user){
    System.out.println("pojo参数传递 user ==> "+user);
    return "{'module':'pojo param'}";
}
```

**注意:**

==请求参数key的名称要和POJO中属性的名称一致，否则无法封装==

#### 4.3.4 数组类型参数

举个简单的例子，如果前端需要获取用户的爱好，爱好绝大多数情况下都是多个，如何发送请求数据和接收数据呢?

* 数组参数：请求参数名与形参对象属性名相同且请求参数为多个，定义数组类型即可接收参数

发送请求和参数:

![1630482999626](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206050954982.png)

后台接收参数:

```java
  //数组参数：同名请求参数可以直接映射到对应名称的形参数组对象中
    @RequestMapping("/arrayParam")
    @ResponseBody
    public String arrayParam(String[] likes){
        System.out.println("数组参数传递 likes ==> "+ Arrays.toString(likes));
        return "{'module':'array param'}";
    }
```

#### 4.3.5 集合类型参数

数组能接收多个值，那么集合是否也可以实现这个功能呢?

发送请求和参数:

![1630484283773](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206050954977.png)

后台接收参数:

```java
//集合参数：同名请求参数可以使用@RequestParam注解映射到对应名称的集合对象中作为数据
@RequestMapping("/listParam")
@ResponseBody
public String listParam(List<String> likes){
    System.out.println("集合参数传递 likes ==> "+ likes);
    return "{'module':'list param'}";
}
```

运行会报错，

![1630484339065](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206050954582.png)

错误的原因是:SpringMVC将List看做是一个POJO对象来处理，将其创建一个对象并准备把前端的数据封装到对象中，但是List是一个接口无法创建对象，所以报错。

解决方案是:使用`@RequestParam`注解

```java
//集合参数：同名请求参数可以使用@RequestParam注解映射到对应名称的集合对象中作为数据
@RequestMapping("/listParam")
@ResponseBody
public String listParam(@RequestParam List<String> likes){
    System.out.println("集合参数传递 likes ==> "+ likes);
    return "{'module':'list param'}";
}
```

* 集合保存普通参数：请求参数名与形参集合对象名相同且请求参数为多个，@RequestParam绑定参数关系
* 对于简单数据类型使用数组会比集合更简单些。

## 参数绑定@RequestParam

| 名称     | @RequestParam                                          |
| -------- | ------------------------------------------------------ |
| 类型     | 形参注解                                               |
| 位置     | SpringMVC控制器方法形参定义前面                        |
| 作用     | 绑定请求参数与处理器方法形参间的关系                   |
| 相关参数 | required：是否为必传参数 <br/>defaultValue：参数默认值 |

当请求的参数名称与Controller的业务方法参数**名称**不一致时，就需要通过@RequestParam注解显示的绑定

- value：与请求参数名称
- required：此在指定的请求参数是否必须包括，默认是true，提交时如果没有此参数就会报错
- defaultValue：当没有指定请求参数时，则使用指定的默认值赋值

请求路径上参数是name,而方法的参数名是username，这样的情况要用@RequestParam进行参数绑定

```java
@GetMapping(value="/quick16")
public void save16(@RequestParam(value="name",required = false,defaultValue = "itcast") String username) throws IOException {
        System.out.println(username);
}
```



## 日期类型参数传递

前面我们处理过简单数据类型、POJO数据类型、数组和集合数据类型以及JSON数据类型，接下来我们还得处理一种开发中比较常见的一种数据类型，`日期类型`

日期类型比较特殊，因为对于日期的格式有N多中输入方式，比如:

* 2088-08-18
* 2088/08/18
* 08/18/2088
* ......

针对这么多日期格式，SpringMVC该如何接收，它能很好的处理日期类型数据么?

### 入参格式化：@DateTimeFormat

因为传入的参数是 String 类型的，而用来接收参数的 DateVo 的 date 属性是 java.util.Date 类型的，类型无法转换。

这时，就可以使用 Spring 的 @DateTimeFormat 注解格式化参数

可以看到，加入 @DateTimeFormat 注解后参数可以被接收到了，但日期时间的格式还是需要自己再手动转换一下。

因为 @DateTimeFormat 注解的 pattern 属性值指定的日期时间格式并不是将要转换成的日期格式，这个指定的格式是和传入的参数对应的，假如注解为：

```c
@DateTimeFormat(pattern="yyyy/MM/dd HH:mm:ss")
```

则传入的参数应该是这样的：

```c
2018/08/02 22:05:55
```

否则会抛出异常。

| 名称     | @DateTimeFormat                 |
| -------- | ------------------------------- |
| 类型     | ==形参注解==                    |
| 位置     | SpringMVC控制器方法形参前面     |
| 作用     | 设定日期时间型数据格式          |
| 相关属性 | pattern：指定日期时间格式字符串 |

先修改UserController类，添加第三个参数

```java
@RequestMapping("/dataParam")
@ResponseBody
public String dataParam(Date date,
                        @DateTimeFormat(pattern="yyyy-MM-dd") Date date1,
                        @DateTimeFormat(pattern="yyyy/MM/dd HH:mm:ss") Date date2)
    System.out.println("参数传递 date ==> "+date);
	System.out.println("参数传递 date1(yyyy-MM-dd) ==> "+date1);
	System.out.println("参数传递 date2(yyyy/MM/dd HH:mm:ss) ==> "+date2);
    return "{'module':'data param'}";
}
```

使用PostMan发送请求，携带两个不同的日期格式，

```c
/dataParam?date=2088/08/08&date1=2088-08-08&date2=2088/08/08 8:08:08
```



### 出参格式化：@JsonFormat注解

注意事项：`只是获取数据时进行格式化，存储数据时还是正常的该是Date该是LocalTime就是那样，不变`

使用`@JsonFormat`注解格式化时间，应该算是一个基本操作了，大部分开发者都应用此种方式，简单方便。

```java
import java.time.LocalDateTime;
import java.util.Date;

@Data
public class User {
    private Integer id;
    private String name;
    @JsonFormat(locale = "zh", timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
    @JsonFormat(locale = "zh", timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updateTime;
}
```

进行测试使用

```java
@GetMapping("/hello1")
public User hello1() {
    User u = new User();
    u.setId(1);
    u.setName("张三");
    u.setCreateTime(LocalDateTime.now());
    u.setUpdateTime(new Date());
    return u;
}
```

结果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220416155816160.png" alt="image-20220416155816160" style="zoom: 55%;" />

测试一下结果，发现 `Date` 类型和 `LocalDateTime` 类型都格式化成功，但还是有个问题，这样做仍然比较繁琐，每个实体类的日期字段都要加`@JsonFormat`注解，重复的工作量也不小。接着往下看~



### 完整配置

```java
@Data
public class User {
    private Integer id;
    private String name;
    @JsonFormat(locale = "zh", timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(locale = "zh", timezone = "GMT+8", pattern = "yyyy-MM-dd")
    private Date updateTime;
}
```



## Restful风格的参数的获取(应用)

Restful是一种软件架构风格、设计风格，而不是标准，只是提供了一组设计原则和约束条件。主要用于客户端和服务器交互类的软件，基于这个风格设计的软件可以更简洁，更有层次，更易于实现缓存机制等。

Restful风格的请求是使用“url+请求方式”表示一次请求目的的，HTTP 协议里面四个表示操作方式的动词如下：

- GET：用于获取资源
- POST：用于新建资源
- PUT：用于更新资源
- DELETE：用于删除资源  

例如：注意，和上面请求参数不同的是，参数不再是以?来拼接如/uer?id=1,而是以正常的路径/user/1

- /user/1    GET ：       得到 id = 1 的 user
- /user/1   DELETE：  删除 id = 1 的 user
- /user/1    PUT：       更新 id = 1 的 user
- /user       POST：      新增 user

上述url地址/user/1中的1就是要获得的请求参数，在SpringMVC中可以使用占位符进行参数绑定。地址/user/1可以写成/user/{id}，占位符{id}对应的就是1的值。在业务方法中我们可以使用**@PathVariable**注解进行占位符的匹配获取工作。

`:8080/itheima_springmvc1/quick17/zhangsan`

```java
@GetMapping(value="/quick17/{name}")
@ResponseBody
public void save17(@PathVariable(value="name") String username) throws IOException {
       System.out.println(username);
}
```



## 自定义类型转换器

SpringMVC 默认已经提供了一些常用的类型转换器，例如客户端提交的字符串转换成int型进行参数设置。

但是不是所有的数据类型都提供了转换器，没有提供的就需要自定义转换器，例如：日期类型的数据就需要自定义转换器。（不常用）

使用步骤

```java
@Configuration
public class WebConfig implements Converter<String, Date> {
    public Date convert(String dateStr) {
        //将日期字符串转换成日期对象 返回
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;
        try {
            date = format.parse(dateStr);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return date;
    }
}
```

```java
@GetMapping("getDate")
public Date save18(Date date) {
    System.out.println(date);
    return date;
}
```



## 获得HttpServlet的API

SpringMVC支持使用原始ServletAPI对象作为控制器方法的参数进行注入，常用的对象如下：

- HttpServletRequest
- HttpServletResponse
- HttpSession

```java
@RequestMapping(value="/quick19")
@ResponseBody
public void save19(HttpServletRequest request, HttpServletResponse response, 
                   HttpSession session) throws IOException {
        System.out.println(request);
        System.out.println(response);
        System.out.println(session);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206051104996.png" alt="image-20220605110427932" style="zoom:80%;" />



## 获得请求头信息(应用)

使用@RequestHeader可以获得请求头信息，相当于web阶段学习的request.getHeader(name)

@RequestHeader注解的属性如下：

value：请求头的名称

required：是否必须携带此请求头

不需要自己输入内容，这个是获取请求头信息

```java
@GetMapping("getHeader")
public String getHeader(
    @RequestHeader(value = "User-Agent",required = false) String user_agent,              
    @RequestHeader(value = "Accept-Language",required = false) String accept_language) {
    System.out.println(user_agent);
    System.out.println(accept_language);
    return "成功";
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206051101273.png" alt="image-20220605110135188" style="zoom:80%;" />



使用@CookieValue可以获得指定Cookie的值

@CookieValue注解的属性如下：

value：指定cookie的名称

required：是否必须携带此cookie

```java
@RequestMapping(value="/quick21")
@ResponseBody
public void save21(@CookieValue(value = "JSESSIONID") String jsessionId) throws IOException {
        System.out.println(jsessionId);
}
```





# SpringMVC的文件上传

## 简单介绍

### 文件上传介绍

文件上传，也称为upload，是指将本地图片、视频、音频等文件上传到服务器上，可以供其他用户浏览或下载的过

程。文件上传在项目中应用非常广泛，我们经常发微博、发微信朋友圈都用到了文件上传功能。

文件上传时，对页面的form表单有如下要求：

- method="post" 采用post方式提交数据
- enctype="multipart/form-data" 采用multipart格式上传文件
- type="file" 使用input的file控件上传

```html
<form method="post" action="/common/upload" enctype="multipart/form-data">
    <input name="myFile" type="file"  />
    <input type="submit" value="提交" /> 
</form>
```

目前一些前端组件库也提供了相应的上传组件，但是底层原理还是基于form表单的文件上传。

例如ElementUI中提供的upload上传组件：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220415172804129.png" alt="image-20220415172804129" style="zoom:67%;" />

服务端要接收客户端页面上传的文件，通常都会使用Apache的两个组件，`这两个组件都在web依赖里面`：

- commons-fileupload

- commons-io

Spring框架在spring-web包中对文件上传进行了封装，大大简化了服务端代码，我们只需要在Controller的方法中声

明一个MultipartFile类型的参数即可接收上传的文件，例如：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220415172951901.png" alt="image-20220415172951901" style="zoom:67%;" />

### 文件下载介绍

文件下载，也称为download，是指将文件从服务器传输到本地计算机的过程。

通过浏览器进行文件下载，通常有两种表现形式：

- 以附件形式下载，弹出保存对话框，将文件保存到指定磁盘目录

- 直接在浏览器中打开

通过浏览器进行文件下载，本质上就是服务端将文件以流的形式写回浏览器的过程。



## 配置项

### 首要配置



```properties
# 单个文件上传大小,值可以使用后缀“MB”或“KB”分别表示兆字节或千字节
spring.servlet.multipart.max-file-size=100MB
# 最大请求大小。值可以使用后缀“MB”或“KB”分别表示兆字节或千字节
spring.servlet.multipart.max-request-size=100MB
```

设置基础路径

```java
//设置基础路径
private final String basePath = "E:\\";
```



### 可选配置

```properties
# 是否启用对分段上传的支持
spring.servlet.multipart.enabled = true

# 将文件写入磁盘的阈值。值可以使用后缀“MB”或“KB”分别表示兆字节或千字节。
spring.servlet.multipart.file-size-threshold = 100MB

# 上传文件的中间位置
spring.servlet.multipart.location = D:/temp

# 是否在文件或参数访问时懒惰地解析多部分请求
spring.servlet.multipart.resolve-lazily = false 
```



## 文件上传

### 上传单个文件

```java
//设置基础路径
private final String basePath = "E:\\";
```

```java
//文件上传
@PostMapping("/upload")
public String upload(MultipartFile file){
    //file是一个临时文件，需要转存到指定位置，否则本次请求完成后临时文件会删除
    log.info(file.toString());
    //原始文件名
    String originalFilename = file.getOriginalFilename();//abc.jpg
    String suffix = originalFilename.substring(originalFilename.lastIndexOf("."));
    //使用UUID重新生成文件名，防止文件名称重复造成文件覆盖: abc.jpg
    String fileName = UUID.randomUUID().toString() + suffix;

    //创建一个目录对象
    File dir = new File(basePath);
    //判断当前目录是否存在
    if(!dir.exists()){
        //目录不存在，需要创建
        dir.mkdirs();
    }
    try {
        //将临时文件转存到指定位置
        file.transferTo(new File(basePath + fileName));
    } catch (IOException e) {
        e.printStackTrace();
    }
    return fileName;
}
```

返回文件名

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220415180710579.png" alt="image-20220415180710579" style="zoom: 67%;" />



### 上传多个文件

特别注意点：MultipartFile[]后面跟的file名称要和前端匹配，不然文件长度就是0

```java
@PostMapping("/uploadManyFile")
public String save23(MultipartFile[] file) throws IOException {
    if(file.length == 0){
        return "请选择要上传的文件";
    }
    List<String> list = new ArrayList<>();
    for (MultipartFile multipartFile : file) {
        if(multipartFile.isEmpty()){
            return "文件上传失败";
        }
        //取得当前上传文件的文件名称
        String originalFilename = multipartFile.getOriginalFilename();
        //生成文件名
        String fileName = UUID.randomUUID() +"&"+ originalFilename;
        //转移文件路径
        String pathname = "E:\\"+fileName;
        list.add(pathname);
        multipartFile.transferTo(new File(pathname));
    }
    System.out.println(list.get(0));
    return "上传了："+list.size()+"个文件";
}
```

在resource下的static目录创建Upload.html测试

注意看input的name，要和后台参数相同

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>多文件上传</title>
</head>
<body>
<form action=":8080//uploadManyFile" method="post"
      enctype="multipart/form-data">
    <input type="file" name="file" value="请选择文件" multiple>
    <input type="submit" value="上传">
</form>
</body>
</html>
```

当然，如果不相同，可以用@RequestParam

```java
public String save23(@RequestParam("files") MultipartFile[] file)
```

对应前端

```html
<input type="file" name="files" value="请选择文件" multiple>
```



## 文件下载

[Spring boot下载文件的2种方式 - kribee - 博客园 (cnblogs.com)](https://www.cnblogs.com/kribee/p/14307540.html)

```java
@GetMapping("/download1")
public ResponseEntity<InputStreamResource> downloadFile(String fileName)
        throws IOException {
    log.info("进入下载方法...");
    //读取文件(找到文件)
    String filePath = "E://" + fileName;
    FileSystemResource file = new FileSystemResource(filePath);
    //设置响应头
    HttpHeaders headers = new HttpHeaders();
    headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
    headers.add("Content-Disposition", 
                String.format("attachment; filename=\"%s\"", file.getFilename()));
    headers.add("Pragma", "no-cache");
    headers.add("Expires", "0");

    return ResponseEntity
            .ok()
            .headers(headers)
            .contentLength(file.contentLength())
            .contentType(MediaType.parseMediaType("application/octet-stream"))
            .body(new InputStreamResource(file.getInputStream()));
}
```

输入文件位置

```apl
:8080/download1?fileName=a.png
```

即可下载文件

### 图片回显

```java
//设置基础路径
private final String basePath = "D:\\";
//文件下载
@GetMapping("/download")
public void download(String name, HttpServletResponse response){
    try {
        //输入流，通过输入流读取文件内容
        FileInputStream fileInputStream = new
                                          FileInputStream(new File(basePath + name));

        //输出流，通过输出流将文件写回浏览器
        ServletOutputStream outputStream = response.getOutputStream();
		//设置文件类型：这里设置成图片
        response.setContentType("image/jpeg");
        int len = 0;
        byte[] bytes = new byte[1024];
        while ((len = fileInputStream.read(bytes)) != -1){
            outputStream.write(bytes,0,len);
            outputStream.flush();
        }
        //关闭资源
        outputStream.close();
        fileInputStream.close();
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

这个文件回显不能在swagger里测试，直接在浏览器中测试

```apl
:8080/download?name=26d6502b-68f6-4d34-8601-ef2450cca694.png
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220415180539025.png" alt="image-20220415180539025" style="zoom: 50%;" />



## 文件删除

```java
//删除文件
@DeleteMapping("/deleteFile")
public String delete1(String fileName) throws IOException {
    File file = new File(basePath + fileName);
    boolean delete = file.delete();
    System.out.println(delete);
    return "删除成功";
}
```

输入图片路径即可删除

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220415180454556.png" alt="image-20220415180454556" style="zoom: 50%;" />



# 统一结果、统一异常

## 统一结果

如果随着业务的增长，我们需要返回的数据类型会越来越多。对于前端开发人员在解析数据的时候就比较凌乱了，所以对于前端来说，如果后台能够返回一个统一的数据结果，前端在解析的时候就可以按照一种方式进行解析。开发就会变得更加简单。

所以我们就想能不能将返回结果的数据进行统一，具体如何来做，大体的思路为:

* 为了封装返回的结果数据:==创建结果模型类，封装数据到data属性中==
* 为了封装返回的数据是何种操作及是否操作成功:==封装操作结果到status属性中==
* 操作失败后为了封装返回的错误信息:==封装特殊消息到message(msg)属性中==
* 当然也可以按需加入其他扩展值，`比如我们就在返回对象中添加了timestamp接口调用时间`

### 定义返回对象

```java
import lombok.Data;

@Data
public class R<T> {
    /** 结果状态 ,具体状态码参见ResultData.java*/
    private int status;
    private String message;
    private T data;
    private long timestamp ;

    public R(){
        this.timestamp = System.currentTimeMillis();
    }

    public static <T> R<T> success(T data) {
        R<T> resultData = new R<>();
        resultData.setStatus(ReturnCode.RC100.getCode());
        resultData.setMessage(ReturnCode.RC100.getMessage());
        resultData.setData(data);
        return resultData;
    }

    public static <T> R<T> fail(int code, String message) {
        R<T> resultData = new R<>();
        resultData.setStatus(code);
        resultData.setMessage(message);
        return resultData;
    }
}
```

### 定义状态码

```python
public enum ReturnCode {
    /**操作成功**/
    RC100(100,"操作成功"),
    /**操作失败**/
    RC999(999,"操作失败"),
    /**服务限流**/
    RC200(200,"服务开启限流保护,请稍后再试!"),
    /**服务降级**/
    RC201(201,"服务开启降级保护,请稍后再试!"),
    /**热点参数限流**/
    RC202(202,"热点参数限流,请稍后再试!"),
    /**系统规则不满足**/
    RC203(203,"系统规则不满足要求,请稍后再试!"),
    /**授权规则不通过**/
    RC204(204,"授权规则不通过,请稍后再试!"),
    /**access_denied**/
    RC403(403,"无访问权限,请联系管理员授予权限"),
    /**access_denied**/
    RC401(401,"匿名用户访问无权限资源时的异常"),
    /**服务异常**/
    RC500(500,"系统异常，请稍后重试"),

    INVALID_TOKEN(2001,"访问令牌不合法"),
    ACCESS_DENIED(2003,"没有权限访问该资源"),
    CLIENT_AUTHENTICATION_FAILED(1001,"客户端认证失败"),
    USERNAME_OR_PASSWORD_ERROR(1002,"用户名或密码错误"),
    UNSUPPORTED_GRANT_TYPE(1003, "不支持的认证模式");

    /**自定义状态码**/
    private final int code;
    /**自定义描述**/
    private final String message;

    ReturnCode(int code, String message){
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
```

### 测试

```java
@RestController
public class Test1 {
    @GetMapping("/test1")
    public R<String> test1(){
        return R.success("hello world");
    }
}
```

此时调用接口获取到的返回值是这样：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220416111846057.png" alt="image-20220416111846057" style="zoom:67%;" />

这样确实已经实现了我们想要的结果，我在很多项目中看到的都是这种写法，在Controller层通过`R.success()`对返回结果进行包装后返回给前端。看到这里我们不妨停下来想想，这样做有什么弊端呢？

最大的弊端就是我们后面每写一个接口都需要调用`R.success()`这行代码对结果进行包装，重复劳动，浪费体力；而且还很容易被其他老鸟给嘲笑。



## 统一结果升级版

这时使用swagger可能有点问题

要优化这段代码很简单，我们只需要借助SpringBoot提供的`ResponseBodyAdvice`即可。

> ResponseBodyAdvice的作用：拦截Controller方法的返回值，统一处理返回值/响应体，一般用来统一返回格式，加解密，签名等等。

### 实现方式

在上面两个类的基础上，再加上一个类

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

@RestControllerAdvice
public class ResponseAdvice implements ResponseBodyAdvice<Object> {
    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public boolean supports(MethodParameter 
                            methodParameter, 
                            Class<? extends HttpMessageConverter<?>> aClass) {
        return true;
    }

    @SneakyThrows
    @Override
    public Object beforeBodyWrite(Object o, 
                                  MethodParameter methodParameter, 
                                  MediaType mediaType, 
                                  Class<? extends HttpMessageConverter<?>> aClass,
                                  ServerHttpRequest serverHttpRequest, 
                                  ServerHttpResponse serverHttpResponse) {
        //转换成json格式
        if(o instanceof String){
            return objectMapper.writeValueAsString(R.success(o));
        }
        //全局异常接入返回的标准格式
        if(o instanceof R){
            return o;
        }
        return R.success(o);
    }
}
```

定义全局异常处理类

```java
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class RestExceptionHandler {
    /**
     * 默认全局异常处理。
     * @param e the e
     * @return ResultData
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public R<String> exception(Exception e) {
        log.error("全局异常信息 ex={}", e.getMessage(), e);
        return R.fail(ReturnCode.RC500.getCode(),e.getMessage());
    }
}
```

进行访问

```java
@GetMapping("/hello")
public String getStr(){
    return "hello world";
}
```

返回值

```json
{
  "status": 100,
  "message": "操作成功",
  "data": "hello world",
  "timestamp": 1650079783098
}
```



## 统一结果常用版

### 结果类枚举

- 前三者可定义结果枚举，如：success，code，message

```java
@Getter
public enum ResultCodeEnum {
    SUCCESS(true,20000,"成功"),
    UNKNOWN_ERROR(false,20001,"未知错误"),
    PARAM_ERROR(false,20002,"参数错误"),
    NULL_POINT(false,20007,"空指针异常"),
    HTTP_CLIENT_ERROR(false,20008,"http异常")
    ;

    // 响应是否成功
    private final Boolean success;
    // 响应状态码
    private final Integer code;
    // 响应信息
    private final String message;

    ResultCodeEnum(boolean success, Integer code, String message) {
        this.success = success;
        this.code = code;
        this.message = message;
    }
}
```

### 统一结果类

- 第5个属于自定义返回，利用前4者可定义统一返回对象

**注意：**

1. 外接只可以调用统一返回类的方法，不可以直接创建，影刺构造器私有；
2. 内置静态方法，返回对象；
3. 为便于自定义统一结果的信息，建议使用链式编程，将返回对象设类本身，即return this;
4. 响应数据由于为json格式，可定义为JsonObject或Map形式；

```java
@Data
public class R {
    private Boolean success;

    private Integer code;

    private String message;

    private Map<String, Object> data = new HashMap<>();

    // 构造器私有
    private R(){}

    // 通用返回成功
    public static R ok() {
        R r = new R();
        r.setSuccess(ResultCodeEnum.SUCCESS.getSuccess());
        r.setCode(ResultCodeEnum.SUCCESS.getCode());
        r.setMessage(ResultCodeEnum.SUCCESS.getMessage());
        return r;
    }

    // 通用返回失败，未知错误
    public static R error() {
        R r = new R();
        r.setSuccess(ResultCodeEnum.UNKNOWN_ERROR.getSuccess());
        r.setCode(ResultCodeEnum.UNKNOWN_ERROR.getCode());
        r.setMessage(ResultCodeEnum.UNKNOWN_ERROR.getMessage());
        return r;
    }

    // 设置结果，形参为结果枚举
    public static R setResult(ResultCodeEnum result) {
        R r = new R();
        r.setSuccess(result.getSuccess());
        r.setCode(result.getCode());
        r.setMessage(result.getMessage());
        return r;
    }

    /**------------使用链式编程，返回类本身-----------**/
    
    // 自定义返回数据
    public R data(Map<String,Object> map) {
        this.setData(map);
        return this;
    }

    // 通用设置data
    public R data(String key,Object value) {
        this.data.put(key, value);
        return this;
    }

    // 自定义状态信息
    public R message(String message) {
        this.setMessage(message);
        return this;
    }

    // 自定义状态码
    public R code(Integer code) {
        this.setCode(code);
        return this;
    }

    // 自定义返回结果
    public R success(Boolean success) {
        this.setSuccess(success);
        return this;
    }
}
```

### 控制层返回

- 视图层使用统一结果

```java
@RestController
@RequestMapping("/api/v1/users")
public class TeacherAdminController {

    @Autowired
    private UserService userService;

    @GetMapping
    public R list() {
        List<Teacher> list = teacherService.list(null);
        return R.ok().data("itms", list).message("用户列表");
    }
}    
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022/202204201625559.png" alt="image-20220420162534458" style="zoom: 50%;" />

统一结果类的使用参考了mybatis-plus中R对象的设计



## 统一异常

### 1 问题描述

在讲解这一部分知识点之前，我们先来演示个效果，修改BookController类的`getById`方法

```java
@GetMapping("/{id}")
public Result getById(@PathVariable Integer id) {
    //手动添加一个错误信息
    if(id==1){
        int i = 1/0;
    }
    Book book = bookService.getById(id);
    Integer code = book != null ? Code.GET_OK : Code.GET_ERR;
    String msg = book != null ? "" : "数据查询失败，请重试！";
    return new Result(code,book,msg);
}
```

重新启动运行项目，使用PostMan发送请求，当传入的id为1，则会出现报错：

前端接收到这个信息后和之前我们约定的格式不一致，这个问题该如何解决?

在解决问题之前，我们先来看下异常的种类及出现异常的原因:

- 框架内部抛出的异常：因使用不合规导致
- 数据层抛出的异常：因外部服务器故障导致（例如：服务器访问超时）
- 业务层抛出的异常：因业务逻辑书写错误导致（例如：遍历业务书写操作，导致索引异常等）
- 表现层抛出的异常：因数据收集、校验等规则导致（例如：不匹配的数据类型间导致异常）
- 工具类抛出的异常：因工具类书写不严谨不够健壮导致（例如：必要释放的连接长期未释放等）

看完上面这些出现异常的位置，你会发现，在我们开发的任何一个位置都有可能出现异常，而且这些异常是不能避免的。所以我们就得将异常进行处理。



### 2 异常处理器的使用

#### 步骤1:创建异常处理器类

```java
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

//@RestControllerAdvice用于标识当前类为REST风格对应的异常处理器
@RestControllerAdvice
@Slf4j
public class ProjectExceptionAdvice {
    //除了自定义的异常处理器，保留对Exception类型的异常处理，用于处理非预期的异常
    @ExceptionHandler(Exception.class)
    public void doException(Exception ex){
        log.info("嘿嘿,异常你哪里跑！");
    }
}
```

==确保SpringMvcConfig能够扫描到异常处理器类==

#### 步骤2:让程序抛出异常

修改`BookController`的getById方法，添加`int i = 1/0`.

```java
@GetMapping("/{id}")
public Result getById(@PathVariable Integer id) {
  	int i = 1/0;
    Book book = bookService.getById(id);
    Integer code = book != null ? Code.GET_OK : Code.GET_ERR;
    String msg = book != null ? "" : "数据查询失败，请重试！";
    return new Result(code,book,msg);
}
```

#### 步骤3:运行程序，测试

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206042154073.png" alt="image-20220604215433012" style="zoom:80%;" />

至此，就算后台执行的过程中抛出异常，最终也能按照我们和前端约定好的格式返回给前端。

### 3 知识点

知识点1：@RestControllerAdvice

| 名称 | @RestControllerAdvice              |
| ---- | ---------------------------------- |
| 类型 | ==类注解==                         |
| 位置 | Rest风格开发的控制器增强类定义上方 |
| 作用 | 为Rest风格开发的控制器类做增强     |

**说明:**此注解自带@ResponseBody注解与@Component注解，具备对应的功能

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206042145743.png" alt="1630659060451" style="zoom:80%;" />

知识点2：@ExceptionHandler

| 名称 | @ExceptionHandler                                            |
| ---- | ------------------------------------------------------------ |
| 类型 | ==方法注解==                                                 |
| 位置 | 专用于异常处理的控制器方法上方                               |
| 作用 | 设置指定异常的处理方案，功能等同于控制器方法，<br/>出现异常后终止原始控制器执行,并转入当前方法执行 |

**说明：**此类方法可以根据处理的异常不同，制作多个方法分别处理对应的异常



### 4 项目异常处理方案

#### 4.1 异常分类

异常处理器我们已经能够使用了，那么在咱们的项目中该如何来处理异常呢?

因为异常的种类有很多，如果每一个异常都对应一个@ExceptionHandler，那得写多少个方法来处理各自的异常，所以我们在处理异常之前，需要对异常进行一个分类:

业务异常（BusinessException）

规范的用户行为产生的异常

- 用户在页面输入内容的时候未按照指定格式进行数据填写，如在年龄框输入的是字符串

  ![1630659599983](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206042145225.png)

不规范的用户行为操作产生的异常

- 如用户故意传递错误数据

  ![1630659622958](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206042145253.png)

系统异常（SystemException）

项目运行过程中可预计但无法避免的异常

- 比如数据库或服务器宕机

其他异常（Exception）

编程人员未预期到的异常，如:用到的文件不存在

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206042145262.png" alt="1630659690341" style="zoom:80%;" />

将异常分类以后，针对不同类型的异常，要提供具体的解决方案:



#### 4.2 异常解决方案

业务异常（BusinessException）

- 发送对应消息传递给用户，提醒规范操作
  - 大家常见的就是提示用户名已存在或密码格式不正确等

系统异常（SystemException）

发送固定消息传递给用户，安抚用户

- 系统繁忙，请稍后再试
- 系统正在维护升级，请稍后再试
- 系统出问题，请联系系统管理员等

发送特定消息给运维人员，提醒维护

- 可以发送短信、邮箱或者是公司内部通信软件

记录日志

- 发消息和记录日志对用户来说是不可见的，属于后台程序

其他异常（Exception）

- 发送固定消息传递给用户，安抚用户
- 发送特定消息给编程人员，提醒维护（纳入预期范围内）
  - 一般是程序没有考虑全，比如未做非空校验等

记录日志



### 5 异常解决方案的实现(重要)

> 思路:
>
> 1.先通过自定义异常，完成BusinessException和SystemException的定义
>
> 2.将其他异常包装成自定义异常类型
>
> 3.在异常处理器类中对不同的异常进行处理

#### 步骤1:自定义异常类

##### 自定义SystemException

```java
//自定义异常处理器，用于封装异常信息，对异常进行分类
public class SystemException extends RuntimeException{
    private Integer code;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public SystemException(Integer code, String message) {
        super(message);
        this.code = code;
    }

    public SystemException(Integer code, String message, Throwable cause) {
        super(message, cause);
        this.code = code;
    }
}
```

##### 自定义BusinessException

```java
//自定义异常处理器，用于封装异常信息，对异常进行分类
public class BusinessException extends RuntimeException{
    private Integer code;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public BusinessException(Integer code, String message) {
        super(message);
        this.code = code;
    }

    public BusinessException(Integer code, String message, Throwable cause) {
        super(message, cause);
        this.code = code;
    }
}
```

##### 自定义code

上面为了使`code`看着更专业些，我们在Code类中再新增需要的属性

```java
//状态码
public class Code {
    public static final Integer SAVE_OK = 20011;
    public static final Integer DELETE_OK = 20021;
    public static final Integer UPDATE_OK = 20031;
    public static final Integer GET_OK = 20041;

    public static final Integer SAVE_ERR = 20010;
    public static final Integer DELETE_ERR = 20020;
    public static final Integer UPDATE_ERR = 20030;
    public static final Integer GET_ERR = 20040;
    public static final Integer SYSTEM_ERR = 50001;
    public static final Integer SYSTEM_TIMEOUT_ERR = 50002;
    public static final Integer SYSTEM_UNKNOW_ERR = 59999;
    public static final Integer BUSINESS_ERR = 60002;
}
```

##### 统一结果返回Result

```java
@Data
public class Result {
    //描述统一格式中的数据
    private Object data;
    //描述统一格式中的编码，用于区分操作，可以简化配置0或1表示成功失败
    private Integer code;
    //描述统一格式中的消息，可选属性
    private String msg;

    public Result() {
    }
    //构造方法是方便对象的创建
    public Result(Integer code,Object data) {
        this.data = data;
        this.code = code;
    }
    //构造方法是方便对象的创建
    public Result(Integer code, Object data, String msg) {
        this.data = data;
        this.code = code;
        this.msg = msg;
    }
}
```



**说明:**

* 让自定义异常类继承`RuntimeException`的好处是，后期在抛出这两个异常的时候，就不用在try...catch...或throws了
* 自定义异常类中添加`code`属性的原因是为了更好的区分异常是来自哪个业务的

#### 步骤2:将其他异常包成自定义异常

假如在BookServiceImpl的getById方法抛异常了，该如何来包装呢?

```java
@GetMapping("getById/{id}")
public String getById(@PathVariable Integer id) {
    //模拟业务异常，包装成自定义异常
    if(id == 1){
        throw new BusinessException(Code.BUSINESS_ERR,"请不要使用你的技术挑战我的耐性!");
    }
    //模拟系统异常，将可能出现的异常进行包装，转换成自定义异常
    try{
        int i = 1/0;
    }catch (Exception e){
        throw new SystemException(Code.SYSTEM_TIMEOUT_ERR,"服务器访问超时，请重试!",e);
    }
    return "根据id查询成功";
}
```

具体的包装方式有：

* 方式一:`try{}catch(){}`在catch中重新throw我们自定义异常即可。
* 方式二:直接throw自定义异常即可

#### 步骤3:处理器类中处理自定义异常

```java
import com.it.result.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

//@RestControllerAdvice用于标识当前类为REST风格对应的异常处理器
@RestControllerAdvice
@Slf4j
public class ProjectExceptionAdvice {
    //@ExceptionHandler用于设置当前处理器类对应的异常类型
    @ExceptionHandler(SystemException.class)
    public Result doSystemException(SystemException ex){
        //记录日志
        //发送消息给运维
        //发送邮件给开发人员,ex对象发送给开发人员
        return new Result(ex.getCode(),null,ex.getMessage());
    }

    @ExceptionHandler(BusinessException.class)
    public Result doBusinessException(BusinessException ex){
        return new Result(ex.getCode(),null,ex.getMessage());
    }

    //除了自定义的异常处理器，保留对Exception类型的异常处理，用于处理非预期的异常
    @ExceptionHandler(Exception.class)
    public Result doOtherException(Exception ex){
        //记录日志
        //发送消息给运维
        //发送邮件给开发人员,ex对象发送给开发人员
        return new Result(Code.SYSTEM_UNKNOW_ERR,null,"系统繁忙，请稍后再试！");
    }
}
```

##### 步骤4:运行程序

根据ID查询，

如果传入的参数为1，会报`BusinessException`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206042221780.png" alt="image-20220604222105719" style="zoom:80%;" />

如果传入的是其他参数，会报`SystemException`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206042222256.png" alt="image-20220604222154034" style="zoom:80%;" />

对于异常我们就已经处理完成了，不管后台哪一层抛出异常，都会以我们与前端约定好的方式进行返回，前端只需要把信息获取到，根据返回的正确与否来展示不同的内容即可。







# HttpServlet方法(重要)

## HttpServletRequest

HttpServletRequest对象代表客户端的请求，当客户端通过HTTP协议访问服务器时，HTTP请求头中的所有信息都封装在这个对象中，通过这个对象提供的方法，可以获得客户端请求的所有信息。

### 获得客户机信息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206042036918.png" alt="image-20220604203649850" style="zoom:80%;" />



### 获得客户机请求头

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206042036238.png" alt="image-20220604203630168" style="zoom:80%;" />



### 获得客户机请求参数

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206042037472.png" alt="image-20220604203728413" style="zoom:80%;" />





## HttpServletResponse

Web服务器收到客户端的http请求，会针对每一次请求，分别创建一个用于代表请求的request对象、和代表响应的response对象。request和response对象即然代表请求和响应，那我们要获取客户机提交过来的数据，只需要找request对象就行了。要向客户机输出数据，只需要找response对象就行了。

### 向客户端(浏览器)发送响应头的相关方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206042040085.png" alt="image-20220604204046018" style="zoom:80%;" />



### 向客户端(浏览器)发送响应状态码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206042042015.png" alt="image-20220604204210961" style="zoom:80%;" />



## HttpSession

- Session表示会话，不止是在javaweb中存在，只要是web开发，都有会话这种机制。
- 在java中会话对应的类型是：javax.servlet.http.HttpSession，简称session/会话
- 在java web中session是一个存储在WEB服务器端的java对象，该对象代表用户和WEB服务器的一次会话。

> 那什么才叫一次会话呢？
>
> - 一般多数情况下，是这样描述的：用户打开浏览器，在浏览器上进行一些操作，然后将浏览器关闭，表示一次会话结束。
> - 本质上的描述：从session对象的创建，到最终session对象超时之后销毁，这个才是真正意义的一次完整会话。

- Cookie可以将会话状态保存在浏览器客户端，HttpSession可以将会话状态保存在WEB服务器端。
- 在会话进行过程中，web服务器一直为当前这个用户维护者一个会话对象/HttpSession
- 在WEB容器中，WEB容器维护者大量的HttpSession对象，换句话说，在WEB容器中应该有一个“session列表”
- 也就是说张三访问WEB服务器，服务器会生成一个张三的session对象，李四去访问WEB服务器，服务器会生成一个李四的session对象。
- 系统为每一个访问者都设立了独立的session对象，用以存取数据，并且各个访问者的session对象互不干扰。
- session与cookie是紧密相关的
- Cookie可以将会话状态保存在客户端，HttpSession可以将会话状态保存在服务器端。
- session的使用要求用户浏览器必须支持cookie，如果浏览器不支持使用cookie，或者设置为禁用cookie，那么将不能使用session。
- 思考以下问题？？？

假设有两个用户，一个是北京的张三，一个是南京的李四，都在访问京东商城购物网站，那么在京东WEB服务器中一定会有两个购物车，一个是张三的购物车，一个是属于李四的购物车，大家思考：一个WEB服务器，两个浏览器客户端，为什么张三在购物的时候向购物车中放入的商品一定是放到张三的购物车中，而不会存放到李四的购物车中，也就是说session是怎么实现和某个特定用户绑定的？

下面使用图形描述session的工作原理：

### session的工作原理

 1. 打开浏览器，在浏览器上发送首次请求
 2. 服务器会创建一个HttpSession对象，该对象代表一次会话
 3. 同时生成HttpSession对象对应的Cookie对象，并且Cookie对象的name是jsessionid，Cookie的value是32位长度的字符串（jsessionid=xxxx）
 4. 服务器将Cookie的value和HttpSession对象绑定到session列表中
 5. 服务器将Cookie完整发送给浏览器客户端
 6. 浏览器客户端将Cookie保存到缓存中
 7. 只要浏览器不关闭，Cookie就不会消失
 8. 当再次发送请求的时候，会自动提交缓存中当的Cookie
 9. 服务器接收到Cookie，验证该Cookie的name是否是jsessionid，然后获取该Cookie的value
 10. 通过Cookie的value去session列表中检索对应的HttpSession对象 


### 常用方法

```java
@PostMapping("/getUser")
public void getUser(HttpSession session) {
    //设置值
    session.setAttribute("name", "zhangsan");
    //获取值
    Object name = session.getAttribute("name");
    log.info("session1:{}", name);
    //删除session
    session.removeAttribute("name");
    log.info("session1:{}", name);
    //创建时间
    long creationTime = session.getCreationTime();
    log.info("creationTime:{}", creationTime);
    long lastAccessedTime = session.getLastAccessedTime();
    log.info("lastAccessedTime:{}", lastAccessedTime);
    //网络最大无活动等待时间：1800
    long maxInactiveInterval = session.getMaxInactiveInterval();
    log.info("maxInactiveInterval:{}", maxInactiveInterval);
    //销毁session
    session.invalidate();
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206051233284.png" alt="image-20220605123309219" style="zoom:80%;" />



# SpringMVC的拦截器

## 拦截器的作用(理解)

Spring MVC 的拦截器类似于 Servlet  开发中的过滤器 Filter，用于对处理器进行预处理和后处理。

将拦截器按一定的顺序联结成一条链，这条链称为拦截器链（InterceptorChain）。在访问被拦截的方法或字段时，拦截器链中的拦截器就会按其之前定义的顺序被调用。拦截器也是AOP思想的具体实现。

讲解拦截器的概念之前，我们先看一张图:

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206041818768.png" alt="1630676280170" style="zoom:80%;" />

(1)浏览器发送一个请求会先到Tomcat的web服务器

(2)Tomcat服务器接收到请求以后，会去判断请求的是静态资源还是动态资源

(3)如果是静态资源，会直接到Tomcat的项目部署目录下去直接访问

(4)如果是动态资源，就需要交给项目的后台代码进行处理

(5)在找到具体的方法之前，我们可以去配置过滤器(可以配置多个)，按照顺序进行执行

(6)然后进入到到中央处理器(SpringMVC中的内容)，SpringMVC会根据配置的规则进行拦截

(7)如果满足规则，则进行处理，找到其对应的controller类中的方法进行执行,完成后返回结果

(8)如果不满足规则，则不进行处理

(9)这个时候，如果我们需要在每个Controller方法执行的前后添加业务，具体该如何来实现?

这个就是拦截器要做的事。

拦截器（Interceptor）是一种动态拦截方法调用的机制，在SpringMVC中动态拦截控制器方法的执行

作用:

* 在指定的方法调用前后执行预先设定的代码
* 阻止原始方法的执行
* 总结：拦截器就是用来做增强



## 拦截器执行流程

最后我们来看下拦截器的执行流程:

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206041843730.png" alt="1630679464294" style="zoom:80%;" />

当有拦截器后，请求会先进入preHandle方法，

如果方法返回true，则放行继续执行后面的handle[controller的方法]和后面的方法

如果返回false，则直接跳过后面方法的执行。



## 拦截器实现

### 创建拦截器

```java
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class ProjectInterceptor2 implements HandlerInterceptor {
    //在目标方法执行之前 执行
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                             Object handler) throws Exception {
        System.out.println("处理前");
        // 如果为false，则请求会被直接拦截，后续的Handler都不会再执行
        return true;
    }
    //在目标方法执行之后 视图对象返回之前执行
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response,
                           Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("处理后");
    }

    //在流程都执行完毕后 执行
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
                                Object handler, Exception ex) throws Exception {
        System.out.println("清理");
    }
}
```

### 添加拦截器

设置拦截器的拦截路径，支持*通配符

```c
/**         表示拦截所有映射
/*          表示拦截所有/开头的映射
/user/*     表示拦截所有/user/开头的映射
/user/add*  表示拦截所有/user/开头，且具体映射名称以add开头的映射
/user/*All  表示拦截所有/user/开头，且具体映射名称以All结尾的映射
```



```java
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Resource;

@Configuration
//实现WebMvcConfigurer接口可以简化开发，但具有一定的侵入性
public class SpringMvcConfig implements WebMvcConfigurer {

    @Resource
    private ProjectInterceptor2 projectInterceptor2;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //配置多拦截器，/books/*表示拦截所有books开头的url
        registry.addInterceptor(projectInterceptor2).addPathPatterns("/books","/books/*");
    }
}
```



## 拦截器参数

### 前置处理方法

原始方法之前运行preHandle

```java
public boolean preHandle(HttpServletRequest request,
                         HttpServletResponse response,
                         Object handler) throws Exception {
    System.out.println("preHandle");
    return true;
}
```

* request:请求对象
* response:响应对象
* handler:被调用的处理器对象，本质上是一个方法对象，对反射中的Method对象进行了再包装

使用request对象可以获取请求数据中的内容，如获取请求头的`Content-Type`

```java
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, 
                         Object handler) throws Exception {
    String contentType = request.getHeader("Content-Type");
    System.out.println("preHandle..."+contentType);
    System.out.println(request.getRequestURL());
    System.out.println(request.getQueryString());
    System.out.println(request.getRemoteHost());
    System.out.println(request.getRemoteAddr());
    System.out.println(request.getRemotePort());
    System.out.println(request.getPathInfo());
    System.out.println(request.getLocalAddr());
    System.out.println(request.getLocalName());
    Enumeration<String> headerNames = request.getHeaderNames();
    while (headerNames.hasMoreElements()) {
         String name = headerNames.nextElement();
         System.out.println(name + ":" + request.getHeader(name));
    }
    return true;
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206042108047.png" alt="image-20220604210800972" style="zoom:80%;" />



使用handler参数，可以获取方法的相关信息

```java
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, 
                         Object handler) throws Exception {
    HandlerMethod hm = (HandlerMethod)handler;
    String methodName = hm.getMethod().getName();//可以获取方法的名称
    System.out.println("preHandle..."+methodName);
    //如果是SpringMVC请求
    if(handler instanceof HandlerMethod){
       HandlerMethod handlerMethod = (HandlerMethod) handler;
       log.info("当前拦截的方法为：{}",handlerMethod.getMethod().getName());
       log.info("当前拦截的方法参数个数为：{}",
                handlerMethod.getMethod().getParameters().length);
       log.info("当前拦截的方法为：{}",handlerMethod.getBean().getClass().getName());
       log.info("开始拦截---------");
       String uri = request.getRequestURI();
       log.info("拦截的uri："+uri);
     }
    return true;
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206042106941.png" alt="image-20220604210602886" style="zoom:80%;" />



### 后置处理方法

原始方法运行后运行，如果原始方法被拦截，则不执行  

```java
public void postHandle(HttpServletRequest request,
                       HttpServletResponse response,
                       Object handler,
                       ModelAndView modelAndView) throws Exception {
    System.out.println("方法执行完成");
}
```

前三个参数和上面的是一致的。

modelAndView:如果处理器执行完成具有返回结果，可以读取到对应数据与页面信息，并进行调整

因为咱们现在都是返回json数据，所以该参数的使用率不高。



### 完成处理方法

拦截器最后执行的方法，无论原始方法是否执行

```java
public void afterCompletion(HttpServletRequest request,
                            HttpServletResponse response,
                            Object handler,
                            Exception ex) throws Exception {
    System.out.println("afterCompletion");
}
```

前三个参数与上面的是一致的。

ex:如果处理器执行过程中出现异常对象，可以针对异常情况进行单独处理  

因为我们现在已经有全局异常处理器类，所以该参数的使用率也不高。

这三个方法中，最常用的是==preHandle==,在这个方法中可以通过返回值来决定是否要进行放行，我们可以把业务逻辑放在该方法中，如果满足业务则返回true放行，不满足则返回false拦截。



## 配置多个拦截器

目前，我们在项目中只添加了一个拦截器，如果有多个，该如何配置?配置多个后，执行顺序是什么?

### 步骤1:创建拦截器类

实现接口，并重写接口中的方法

```java
@Component
public class ProjectInterceptor2 implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, 
                             Object handler) throws Exception {
        System.out.println("preHandle...222");
        return false;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, 
                           Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("postHandle...222");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
                                Object handler, Exception ex) throws Exception {
        System.out.println("afterCompletion...222");
    }
}
```

### 步骤2:配置拦截器类

```java
@Configuration
@ComponentScan({"com.itheima.controller"})
@EnableWebMvc
//实现WebMvcConfigurer接口可以简化开发，但具有一定的侵入性
public class SpringMvcConfig implements WebMvcConfigurer {
    @Autowired
    private ProjectInterceptor projectInterceptor;
    @Autowired
    private ProjectInterceptor2 projectInterceptor2;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //配置多拦截器
        registry.addInterceptor(projectInterceptor).addPathPatterns("/books","/books/*");
        registry.addInterceptor(projectInterceptor2).addPathPatterns("/books","/books/*");
    }
}
```

步骤3:运行程序，观察顺序

![1630680435269](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206041825223.png)

拦截器执行的顺序是和配置顺序有关。就和前面所提到的运维人员进入机房的案例，先进后出。

* 当配置多个拦截器时，形成拦截器链
* 拦截器链的运行顺序参照拦截器添加顺序为准
* 当拦截器中出现对原始处理器的拦截，后面的拦截器均终止运行
* 当拦截器运行中断，仅运行配置在前面的拦截器的afterCompletion操作

![1630680579735](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206041825227.png)

preHandle：与配置顺序相同，必定运行

postHandle:与配置顺序相反，可能不运行

afterCompletion:与配置顺序相反，可能不运行。

这个顺序不太好记，最终只需要把握住一个原则即可:以最终的运行结果为准



## 知识小结(记忆)

拦截器中的方法说明如下

![image-20211008131818526](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211008131818526.png)



# 常用注解

## @RequestParam

#### 简介

用于**方法形参和请求参数定义不相同**时使用，主要可以设置参数可选填写required = false

- 此注解是从请求正文中获取请求参数，给**控制器方法形参赋值**的。 
- **当请求参数的名称和控制器方法形参变量名称一致时，无须使用此注解。**
- 同时，当没有获取到请求参数时，此注解还可以给控制器方法形参提供默认值。
- 注意：它**只能出现在方法的参数**上
- 它是在4.2版本中加入的。和value属性互为引用。
- **指定参数是否必须有值。当为true时，参数没有值会报错**。
- 在参数没有值时的默认值。

```java
//此时name属性url显示的是username，可以选填，不填也不会报错
@GetMapping("useReq")
public String useReq(@RequestParam(value = "username",required =
        false) String name, Integer age) {
    System.out.println("控制器方法执行了" + name + "," + age);
    return "测试成功";
}
```

注意

当参数是实体类时，传入参数名要和**set方法的参数名**相同，不然会报错。不一定要和定义的参数名相同，因为可以对set方法的参数名称进行修改的。

用lombok就不考虑这个问题了，毕竟set方法都是自动生成的

```java
@Data
public class User {
    private String name;
    private int age;
}
```

```java
@GetMapping(value = "/test" )
public String test(User user){
    System.out.println(user);
    return  "测试成功";
}
```



##  @InitBinder

#### 简介

用于初始化表单请求参数的数据绑定器。就是输入数据要符合这个注解定义的格式，不然会出错

```java
@InitBinder
public void dateBinder(WebDataBinder dataBinder){
    dataBinder.addCustomFormatter(new DateFormatter("yyyy-MM-dd"));
}
```

在实体类属性上加上@DateTimeFormat同样能实现要求输入数据的功能

```java
@DateTimeFormat(pattern = "yyyy-MM-dd")
private Date birthday;
```

但@InitBinder可以支持更多数据类型。

注意：当前controller类的InitBinder注解只对当前类的方法起作用

可以使用@**ControllerAdvice**进行方法增强



## @ControllerAdvice(重要)

#### 简介

- 用于给控制器提供一个**增强的通知**。 
- 以保证可以在多个控制器之间实现增强共享方法。


```java
//不添加basepackages默认给该包下所有controller类起作用
@ControllerAdvice
public class ControllerAdv {
    @InitBinder
    public void dateBinder(WebDataBinder dataBinder){
        dataBinder.addCustomFormatter(new DateFormatter("yyyy-MM-dd"));
    }
}
```



## @RequestHeader

此注解是从**请求消息头中获取消息头的值**，并把值赋给控制器方法形参。可以添加默认值，没有值的话，就给它默认值。也可以不添加默认值。能获取到当前页面Header中的值

注意它只能出现在方法的参数上

```java
@GetMapping("/useRequestHeader")
public String useRequestHeader(@RequestHeader(value="Accept-Language",
        required=false,defaultValue = "test")String requestHeader){
    System.out.println(requestHeader); //zh-CN,zh;q=0.9
    return "success";
}
```



## @CookieValue

此注解是从请求消息头中获取Cookie的值，并把值赋给控制器方法形参。

它只能出现在方法的参数上

```java
@GetMapping("/useCookieValue")
public String useCookieValue(@CookieValue(value="JSESSIONID",required=false) String cookieValue){
    System.out.println(cookieValue);
    return "success";
}
```



## @ModelAttribute

可以用来修饰传入的数据

它可以用于修饰方法，或者是参数。 

 当修饰方法时，**表示执行控制器方法之前，被此注解修饰的方法都会执行。即在所有方法执行之前执行** 

 **当修饰参数时，用于获取指定的数据给参数赋值**。

当注解写在方法上，则表示存入时的名称。（值是方法的返回值）

当注解写在参数上，可以从ModelMap,Model,Map中的获取数据。（前提是之前存入过）

指定的是存入时的key。

使用方式1

```java
@ModelAttribute
public void showModel(String username, Model model) {
    System.out.println("执行了showModel方法"+username);
    username = username + "renshuo";
    model.addAttribute("username",username); //存值
}
//其他方法进行取值
@GetMapping("/testModelAttribute")
public String testModelAttribute(@ModelAttribute("username")String username) {
    System.out.println("执行了控制器的方法"+username);
    return "success";
}
```

方式2

```java
//方法指定取的时候的key
@ModelAttribute("username")
public String showModel(String username) {
    System.out.println("执行了showModel方法"+username);
    username = username + "renshuo";
    return username;
}
//其他方法进行取值
@GetMapping("/testModelAttribute")
public String testModelAttribute(@ModelAttribute("username")String username) {
    System.out.println("执行了控制器的方法"+username);
    return "success";
}
```

运行结果

执行了showModel方法mogu2018
执行了控制器的方法mogu2018renshuo



@SessionAttribute和@SessionAttributes（还是有点问题）

往Session中存数据和取数据

带s是存数据，不带s的是取数据

此注解是用于让开发者和ServletAPI进行解耦。 

让开发者可以无需使用HttpSession的getAttribute方法即可从会话域中获取数据。

当我们在控制器方法形参中加入Model或者ModelMap类型参数时，默认是存入请求域的。 

但当控制器上使用了此注解，就会往会话域中添加数据。

```java
@PutMapping("/testPut")
public String testPut(Model model){
    //从请求域中存数据
    model.addAttribute("username", "泰斯特");
    return "success";
}

@GetMapping("/testSessionAttribute")
public String testSessionAttribute(@SessionAttribute(value = "username",required = false)String username){
    System.out.println("username is "+username);
    return username;
}
```



## @RequestBody

用于获取全部的请求体。**输入**时变成json格式



## @ResponseBody

用于用流输出响应正文。**输出**到浏览器上

结合使用

```java
@PostMapping("/useRequestBody")
@ResponseBody
public User useRequestBody(@RequestBody(required=false) User user){
    System.out.println(user);
    return user;
}
```

注意：使用@ResponseBody作为返回值和将@ResponseBody写在方法上作用一样

```java
@RequestMapping("useResponseBody")
public @ResponseBody String useResponseBody(String name){
    return "success";
}
```



## @RestController

它具备@Controller注解的全部功能，同时多了一个@ResponseBody注解的功能

## @RestControllerAdvice

它和@ControllerAdvice注解的作用一样，并且支持@ResponseBody的功能



## @PathVariable

#### 简介

它是springmvc框架支持rest风格url的标识。

它可以用于**获取请求url映射中占位符对应的值**。

传统方式
	:8080/user/save		POST
	:8080/user/update	POST
	:8080/user/delete?id=1	GET
	:8080/user/find?id=1	GET

restful方式
	:8080/user/		  POST		保存
	:8080/user/3		PUT		  更新
	:8080/user/5		DELETE	删除
	:8080/user/1		GET		  查询一个

形参名称必须和路径名称一样，即 {id} ====  Integer id

如果不一样，可以用@PathVariable("id")来取路径的名字

#### 使用

名称一样

```java
@GetMapping("/usePathVariable/{id}")
public String usePathVariable(@PathVariable Integer id)
```

也可以这样

```java
@GetMapping("/usePathVariable/{id}")
public String usePathVariable(@PathVariable("id") Integer id) {
    System.out.println(id);
    return "id的值为:"+id;
}
```

名称不一样也能用，也就是这样

```java
@GetMapping("/usePathVariable/{id}")
public String usePathVariable(@PathVariable("id") Integer uid) {
    System.out.println(uid);
    return "id的值为:"+uid;
}
```



# SpringMVC 请求参数获取

**1、直接把表单的参数写在Controller相应的方法的形参中，适用于get方式提交，不适用于post方式提交。**

```java
@GetMapping("/addUser1")
public String addUser1(String username,String password) {
    System.out.println("username is:"+username);
    System.out.println("password is:"+password);
    return "true";
}
```



**2、通过HttpServletRequest接收，post方式和get方式都可以。**

```java
@GetMapping("/addUser2")
public String addUser2(HttpServletRequest request) {
    String username=request.getParameter("username");
    String password=request.getParameter("password");
    System.out.println("username is:"+username);
    System.out.println("password is:"+password);
    return "true";
}
```



**3、通过一个bean来接收,post方式和get方式都可以。**

```java
@Data
public class User {
    private Integer id;
    private String name;
}
```

```java
@PostMapping("/addUser3")
public String addUser3(@RequestBody User user) {
    System.out.println("username is:"+user.getId());
    System.out.println("password is:"+user.getName());
    return "true";
}
```



**4、通过@PathVariable获取路径中的参数**

例如，访问/SSMDemo/demo/addUser4/lixiaoxi/111111 路径时，则自动将URL中模板变量{username}和{password}绑定到通过@PathVariable注解的同名参数上，即入参后username=lixiaoxi、password=111111。

```java
@GetMapping("/addUser4/{username}/{password}")
public String addUser4(@PathVariable String username,
                       @PathVariable String password) {
    System.out.println("username is:"+username);
    System.out.println("password is:"+password);
    return "true";
}
```



**5、使用@ModelAttribute注解获取POST请求的FORM表单数据**

```java
@PostMapping("/addUser5")
public String addUser5(@ModelAttribute("user") User user) {
    System.out.println("username is:"+user.getId());
    System.out.println("password is:"+user.getName());
    return "true";
}
```



**6、用注解@RequestParam绑定请求参数到方法入参**

当请求参数username不存在时会有异常发生,可以通过设置属性required=false解决,例如: @RequestParam(value="username", required=false)

```java
@GetMapping(value="/addUser6")
public String addUser6(@RequestParam("username") String username,
                       @RequestParam(value = "password",required = false) String password) {
    System.out.println("username is:"+username);
    System.out.println("password is:"+password);
    return "true";
}
```



# 跨域访问

前后端分离大势所趋，跨域问题更是老生常谈，随便用标题去google或百度一下，能搜出一大片解决方案，那么为啥又要写一遍呢，不急往下看。

> 注：具有相同的Origin，也即是拥有相同的协议、主机地址以及端口。一旦这三项数据中有一项不同，那么该资源就将被认为是从不同的Origin得来的，进而不被允许访问。

CORS就是为了解决SOP问题而生的，当然CORS不是唯一的解决方案



## CORS简介

> CORS是一个W3C标准，全称是"跨域资源共享”（Cross-origin resource sharing）。它允许浏览器向跨源(协议 + 域名 + 端口)服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。CORS需要浏览器和服务器同时支持。它的通信过程，都是浏览器自动完成，不需要用户参与。
>
> 对于开发者来说，CORS通信与同源的AJAX/Fetch通信没有差别，代码完全一样。浏览器一旦发现请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

**浏览器将CORS请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。**

> 浏览器发出CORS简单请求，只需要在头信息之中增加一个Origin字段。

> 浏览器发出CORS非简单请求，会在正式通信之前，增加一次OPTIONS查询请求，称为"预检"请求（preflight）。浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。

简单请求就是HEAD、GET、POST请求，并且HTTP的头信息不超出以下几种字段 Accept、Accept-Language、Content-Language、Last-Event-ID、Content-Type **注：Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain**

反之，就是非简单请求。

其实实现CORS很简单，就是在服务端加一些响应头，并且这样做对前端来说是无感知的，很方便。

## 详解响应头

- Access-Control-Allow-Origin 该字段必填。它的值要么是请求时Origin字段的具体值，要么是一个*，表示接受任意域名的请求。
- Access-Control-Allow-Methods 该字段必填。它的值是逗号分隔的一个具体的字符串或者*，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。
- Access-Control-Expose-Headers 该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。
- Access-Control-Allow-Credentials 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie.默认情况下，不发生Cookie，即：false。对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json，这个值只能设为true。如果服务器不要浏览器发送Cookie，删除该字段即可。
- Access-Control-Max-Age 该字段可选，用来指定本次预检请求的有效期，单位为秒。在有效期间，不用发出另一条预检请求。

顺便提一下，如果在开发中，发现每次发起请求都是两条，一次OPTIONS，一次正常请求，注意是每次，那么就需要配置Access-Control-Max-Age，避免每次都发出预检请求。

## 解决办法

### 第一种办法(常用)

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS")
                .allowCredentials(true)
                .maxAge(3600)
                .allowedHeaders("*");
    }
}
```

------

### 第二种办法

```java
import org.springframework.context.annotation.Configuration;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
@WebFilter(filterName = "CorsFilter ")
@Configuration
public class CorsFilter implements Filter {
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) 
        throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) res;
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, PUT");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With,
                           Content-Type, Accept");
        chain.doFilter(req, res);
    }
}
```

这种办法，是基于过滤器的方式，方式简单明了，就是在response中写入这些响应头，好多文章都是第一种和第二种方式都叫你配置，其实这是没有必要的，只需要一种即可。

这里也吐槽一下，大家不求甚解的精神。

------

### 第三种办法

```java
public class GoodsController {
@CrossOrigin(origins = ":4000")
@GetMapping("goods-url")
public Response queryGoodsWithGoodsUrl(@RequestParam String goodsUrl) throws Exception {}
}  
```

以放在method、class等上面，类似RequestMapping，也就是说，整个controller下面的方法可以都受控制，也可以单个方法受控制

这三种配置方式都用了的话，谁生效呢，类似css中样式，就近原则，懂了吧。



# Restful风格

## REST简介

==REST==（Representational State Transfer），表现形式状态转换,它是一种软件架构==风格==

当我们想表示一个网络资源的时候，可以使用两种方式:

传统风格资源描述形式

* `/user/getById?id=1` 查询id为1的用户信息
* `/user/saveUser` 保存用户信息

REST风格描述形式

* `/user/1` 
* `/user`



## Rest优点

传统方式一般是一个请求url对应一种操作，这样做不仅麻烦，也不安全，因为会程序的人读取了你的请求url地址，就大概知道该url实现的是一个什么样的操作。

查看REST风格的描述，你会发现请求地址变的简单了，并且光看请求URL并不是很能猜出来该URL的具体功能

所以REST的优点有:

- 隐藏资源的访问行为，无法通过地址得知对资源是何种操作
- 书写简化

但是我们的问题也随之而来了，一个相同的url地址即可以是新增也可以是修改或者查询，那么到底我们该如何区分该请求到底是什么操作呢?

## Rest访问风格

按照REST风格访问资源时使用==行为动作==区分对资源进行了何种操作

* `/users`	查询全部用户信息 GET（查询）
* `/users/1`  查询指定用户信息 GET（查询）
* `/users`    添加用户信息    POST（新增/保存）
* `/users`    修改用户信息    PUT（修改/更新）
* `/users/1`  删除用户信息    DELETE（删除）

请求的方式比较多，但是比较常用的就4种，分别是`GET`,`POST`,`PUT`,`DELETE`。

按照不同的请求方式代表不同的操作类型。

* 发送GET请求是用来做查询
* 发送POST请求是用来做新增
* 发送PUT请求是用来做修改
* 发送DELETE请求是用来做删除

但是==注意==:

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206032227803.png" alt="image-20220603222702736" style="zoom:80%;" />

* REST提供了对应的架构方式，按照这种架构设计项目可以降低开发的复杂性，提高系统的可伸缩性
* REST中规定GET/POST/PUT/DELETE针对的是查询/新增/修改/删除，但是我们如果非要用GET请求做删除，这点在程序上运行是可以实现的
* 但是如果绝大多数人都遵循这种风格，你写的代码让别人读起来就有点莫名其妙了。

* 描述模块的名称通常使用复数，也就是加s的格式描述，表示此类资源，而非单个资源，例如:users、books、accounts......

清楚了什么是REST风格后，我们后期会经常提到一个概念叫`RESTful`，那什么又是RESTful呢?

* 根据REST风格对资源进行访问称为==RESTful==。

后期我们在进行开发的过程中，大多是都是遵从REST风格来访问我们的后台服务，所以可以说咱们以后都是基于RESTful来进行开发的。



## 注解详解

知识点1：@PathVariable

| 名称 | @PathVariable                                                |
| ---- | ------------------------------------------------------------ |
| 类型 | ==形参注解==                                                 |
| 位置 | SpringMVC控制器方法形参定义前面                              |
| 作用 | 绑定路径参数与处理器方法形参间的关系，要求路径参数名与形参名一一对应 |

(1)如果方法形参的名称和路径`{}`中的值不一致，该怎么办?

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206032212378.png" alt="1630506231379" style="zoom: 67%;" />

关于接收参数，我们学过三个注解`@RequestBody`、`@RequestParam`、`@PathVariable`,这三个注解之间的区别和应用分别是什么?

区别

* @RequestParam用于接收url地址传参或表单传参
* @RequestBody用于接收json数据
* @PathVariable用于接收路径参数，使用{参数名称}描述路径参数

应用

* 后期开发中，发送请求参数超过1个时，以json格式为主，@RequestBody应用较广
* 如果发送非json格式数据，选用@RequestParam接收请求参数
* 采用RESTful进行开发，当参数数量较少时，例如1个，可以采用@PathVariable接收请求路径变量，通常用于传递id值

知识点1：@RestController

| 名称 | @RestController                                              |
| ---- | ------------------------------------------------------------ |
| 类型 | ==类注解==                                                   |
| 位置 | 基于SpringMVC的RESTful开发控制器类定义上方                   |
| 作用 | 设置当前控制器类为RESTful风格，<br/>等同于@Controller与@ResponseBody两个注解组合功能 |

知识点2：@GetMapping @PostMapping @PutMapping @DeleteMapping

| 名称     | @GetMapping @PostMapping @PutMapping @DeleteMapping          |
| -------- | ------------------------------------------------------------ |
| 类型     | ==方法注解==                                                 |
| 位置     | 基于SpringMVC的RESTful开发控制器方法定义上方                 |
| 作用     | 设置当前控制器方法请求访问路径与请求动作，每种对应一个请求动作，<br/>例如@GetMapping对应GET请求 |
| 相关属性 | value（默认）：请求访问路径                                  |



## RESTful快速开发

### 原版缺点

做完了RESTful的开发，你会发现==好麻烦==，麻烦在哪?

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206032212379.png" alt="1630507339724" style="zoom:80%;" />

问题1：每个方法的@RequestMapping注解中都定义了访问路径/books，重复性太高。

问题2：每个方法的@RequestMapping注解中都要使用method属性定义请求方式，重复性太高。

问题3：每个方法响应json都需要加上@ResponseBody注解，重复性太高。

对于上面所提的这三个问题，具体该如何解决?

对于刚才的问题，我们都有对应的解决方案：

问题1：每个方法的@RequestMapping注解中都定义了访问路径/books，重复性太高。

```c
将@RequestMapping提到类上面，用来定义所有方法共同的访问路径。
```

问题2：每个方法的@RequestMapping注解中都要使用method属性定义请求方式，重复性太高。

```c
使用@GetMapping  @PostMapping  @PutMapping  @DeleteMapping代替
```

问题3：每个方法响应json都需要加上@ResponseBody注解，重复性太高。

```c
1.将ResponseBody提到类上面，让所有的方法都有@ResponseBody的功能
2.使用@RestController注解替换@Controller与@ResponseBody注解，简化书写
```



### Restful开发演示

```java
@RestController //@Controller + ReponseBody
@RequestMapping("/books")
public class BookController {
    
	//@RequestMapping(method = RequestMethod.POST)
    @PostMapping
    public String save(@RequestBody Book book){
        System.out.println("book save..." + book);
        return "{'module':'book save'}";
    }

    //@RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id){
        System.out.println("book delete..." + id);
        return "{'module':'book delete'}";
    }

    //@RequestMapping(method = RequestMethod.PUT)
    @PutMapping
    public String update(@RequestBody Book book){
        System.out.println("book update..." + book);
        return "{'module':'book update'}";
    }

    //@RequestMapping(value = "/{id}",method = RequestMethod.GET)
    @GetMapping("/{id}")
    public String getById(@PathVariable Integer id){
        System.out.println("book getById..." + id);
        return "{'module':'book getById'}";
    }

    //@RequestMapping(method = RequestMethod.GET)
    @GetMapping
    public String getAll(){
        System.out.println("book getAll...");
        return "{'module':'book getAll'}";
    }
    
}
```





















