



# HTML初体验⭐

> HTML 是什么：即 HyperText Markup language **超文本标记语言**，咱们熟知的网页就是用它编写的，HTML 的作用是定义网页的内容和结构。

> * HyperText 是指用**超链接**的方式组织网页，**把网页联系起来**
> * Markup 是指用 **<标签>**的方式**赋予内容不同的功能和含义**

CSS 是什么：即 Cascading  Style  Sheets 级联（层叠）样式表，它**描述了网页的表现与展示效果**

## MDN 学习网站

https://developer.mozilla.org/zh-CN/

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211081710710.png" alt="image-20221108171029593" style="zoom:80%;" />

## HTML 元素

HTML 由一系列元素 `elements` 组成，例如

### 段落标签p

```html
<p>Hello, world!</p>
```

> * 整体称之为元素
> * `<p>` 和 `</p>` 分别称为起始和结束标签
> * 标签包围起来的 Hello, world 称之为内容
>
> * p 是预先定义好的 html 标签，作用是**将内容作为一个单独的段落**

### 标签属性

元素还可以有属性，如

```html
<p id="p1">Hello, world!</p>
```

> 属性一般是预先定义好的，这里的 id 属性是给元素一个唯一的标识

### 标签嵌套

元素之间可以嵌套，如

```html
<p>HTML 是一门非常<b>强大</b>的语言</p>
```

错误嵌套写法：

```apl
<p>HTML 是一门非常<b>强大的语言</p></b>
```

### 空元素

不包含内容的元素称之为空元素，如

```html
<img src="1.png">
<img src="1.png"/>
```

* img 作用是用来展示图片
* src 属性用来指明图片路径

## HTML 页面

前面介绍的只是单独的 HTML 元素，它们可以充当一份完整的 HTML 页面的组成部分

> 直接在页面输入!，然后再按tab即可生成

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="utf-8">
    <title>测试页面</title>
  </head>
  <body>
    <p id="p1">Hello, world!</p>
    <img src="1.png">
  </body>
</html>
```

- `lang` 元素定义网页语言，如果为en，则网页会提示翻译，推荐修改成zh

* `html` 元素囊括了页面中所有其它元素，整个页面只需一个，称为根元素
* `head` 元素包含的是那些不用于展现内容的元素，如 `title`，`link`，`meta` 等
* `body` 元素包含了对用户展现内容的元素，例如后面会学到的用于展示文本、图片、视频、音频的各种元素

# HTML 常见元素⭐

## 文本标签

### 标题Heading

```html
<h1>1号标题</h1>
<h2>2号标题</h2>
<h3>3号标题</h3>
<h4>4号标题</h4>
<h5>5号标题</h5>
<h6>6号标题</h6>
```

### 段落 Paragraph

```html
<p>段落</p>
```

### 列表 List 

> 无序列表 unordered list
>

```html
<ul>
    <li>列表项1</li>
    <li>列表项2</li>
    <li>列表项3</li>
</ul>
```

> 有序列表
>

```html
<ol>
    <li>列表项1</li>
    <li>列表项2</li>
    <li>列表项3</li>
</ol>
```

> 多级列表
>

```html
<ul>
    <li>
    	北京市
        <ul>
            <li>海淀区</li>
            <li>朝阳区</li>
            <li>昌平区</li>
        </ul>
    </li>
    <li>
    	河北省
        <ul>
            <li>石家庄</li>
            <li>保定</li>
        </ul>
    </li>
</ul>
```

### 超链接Anchor

> **网页跳转**

```html
<a href="2.html">本地网页</a>
<hr>
<a href="http://www.baidu.com">互联网网页</a>
```

> **锚点跳转：跳到底部和回到顶部**

```html
<div>
    <!-- 跳转到底部id为p1的位置，#号表示页面内部跳转 -->
    <a href="#p1">页面内锚点</a>
    <!-- 中间隔开 -->
    <div style="height: 800px"></div>
    <!-- 给内容加上id，作为锚点跳转，要和最上面的a标签id名称相同.a连接写#表示回到顶部 -->
    <p id="p1">很下面的内容 <a href="#">回到顶部</a></p>
</div>
```

## 多媒体标签

### 图片

```html
<img src="文件路径"> 
```

#### URL+文件地址

```Html
<img src="heima.png" alt="heima">
```

#### URL+base64编码

> **img格式**

```html
data:媒体类型;base64,数据
<img src="data:媒体类型;base64,数据">
```

> **生成base64编码**

```java
public static void getBase64() throws IOException {
    byte[] bytes = Files.readAllBytes(Path.of("heima.png"));
    System.out.println(Arrays.toString(bytes)); // 打印bytes数组
    String s = Base64.getEncoder().encodeToString(bytes); // 生成Base64编码
    System.out.println(s);
}
```

> **生成一大堆编码，复制过去就行**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211081704267.png" alt="image-20221108170453030" style="zoom:80%;" />

> **复制到img**

```html
<img src="data:image/png;base64,iVBORw0...编码很长" alt="">
<img src="data:image/png;base64,base64编码跟在这里" alt="">
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211081706766.png" alt="image-20221108170655684" style="zoom:80%;" />

#### object URL

> 需要配合 javascript 使用

### Video

```html
<video src="test.mp4" width="300" controls autoplay></video>
<video controls autoplay>
    <source src="test.mp4" type="video/mp4">
    <source src="test.mp4.webm" type="video/webm">
    <p>你的浏览器不支持 HTML5 视频。可点击<a href="test.mp4">此链接</a>观看</p>
</video>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211081709219.png" alt="image-20221108170900123" style="zoom:80%;" />

### Audio

```html
<audio src="bgm.mp3" controls></audio>  
<audio controls>
  <source src="viper.mp3" type="audio/mp3">
  <source src="viper.ogg" type="audio/ogg">
  <p>你的浏览器不支持 HTML5 音频，可点击<a href="viper.mp3">此链接</a>收听。</p>
</audio>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211081709465.png" alt="image-20221108170919405" style="zoom:80%;" />

## 表单元素⭐

### 作用与语法

#### 基本语法和分析

> 表单的作用：**收集**用户填入的**数据**，并将这些数据**提交给服务器**
>

```html
<form action="服务器地址" method="请求方式" enctype="数据格式">
    <!-- 表单项 -->
    <input type="submit" value="提交按钮">
</form>
```

method 请求方式有 

> * **get （默认）提交时，数据跟在 URL 地址之后**
> * **post 提交时，数据在请求体内**

enctype 在 post 请求时，指定请求体的数据格式

> * application/x-www-form-urlencoded（默认）
> * multipart/form-data

其中表单项提供多种收集数据的方式

> 有 name 属性的表单项数据，才会被发送给服务器

#### 表单基本用法

```html
<!-- 表单的基本用法 -->
<form action="https://www.baidu.com/s">
    <input type="text" name="wd"/>
    <input type="submit" value="搜索">
</form>
```

### 常见表单项

#### 文本框

```html
<input type="text" name="uesrname" placeholder="请输入用户名">
```

#### 密码框

```html
<input type="password" name="password" placeholder="请输入密码">
```

#### 隐藏框

> 不显示，但会把name传递给后端
>

```html
<input type="hidden" name="id">
```

#### 日期框

```html
<input type="date" name="birthday">
```

#### 单选

```html
<input type="radio" name="sex" value="男" checked>
<input type="radio" name="sex" value="女">
```

#### 多选

```html
<input type="checkbox" name="fav" value="唱歌">
<input type="checkbox" name="fav" value="逛街">
<input type="checkbox" name="fav" value="游戏">
```

#### 文件上传

```html
<input type="file" name="avatar">
```

### 表单+后端⭐

> **后端接收**

```java
@Data
public class User {
    private String username;
    private String password;
    private String id;
    // 指定接收的日期格式，前端必须按照该格式传入日期
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthday; 
    
    private String sex;
    private List<String> fav; // 多选
}
```

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @PostMapping("getUser")
    public User getUser(User user) {
        System.out.println("user:" + user);
        return user;
    }
}
```

> **form表单**

```html
<form action=":8080/user/getUser" method="post">
  <input type="text" name="username" placeholder="请输入用户名">
  <hr>
  <input type="password" name="password" placeholder="请输入密码">
  <hr>
  <input type="hidden" name="id" value="1">
  <hr>
  生日 <input type="date" name="birthday">
  <hr>
  男<input type="radio" name="sex" value="男" checked>
  女<input type="radio" name="sex" value="女">
  <hr>
  唱歌<input type="checkbox" name="fav" value="唱歌" checked>
  逛街<input type="checkbox" name="fav" value="逛街">
  游戏<input type="checkbox" name="fav" value="游戏">
  <hr>
  <input type="submit" value="提交">
</form>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212151014909.png" alt="image-20221215101458820" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.8.17/image-20230715151131948.png" alt="image-20230715151131948" style="zoom:80%;" />

### 文件上传+后端

> 后端代码

```yml
spring:
  servlet:
    multipart:
      # 最大请求大小。值可以使用后缀“MB”或“KB”分别表示兆字节或千字节
      max-request-size: 100MB
      # 单个文件上传大小,值可以使用后缀“MB”或“KB”分别表示兆字节或千字节
      max-file-size: 100MB
```

```java
//设置基础路径
private final String basePath = "E:\\";
```

```java
@PostMapping("upload")
// 此处file名称必须和前端的name相同
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

> **form表单：注意：此时表单新增method和enctype，这个是为上传文件准备的**

```html
<form action=":8080/upload" method="post" enctype="multipart/form-data">
    <!-- 注意：此处name名称必须和后端的MultipartFile名称相同 -->
    <input type="file" name="file">
    <hr>
    <input type="submit" value="提交">
</form>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211081758763.png" alt="image-20221108175813694" style="zoom:80%;" />

# HTTP 请求⭐

## 请求组成

请求由三部分组成

> 1. **请求行**：GET /test2?name=%E5%BC%A0&age=20 HTTP/1.1
> 2. **请求头**：Host、Content-Type、Content-Length
> 3. **请求体**：可选，name=%E5%BC%A0&age=18

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212151022448.png" alt="image-20221215102217345" style="zoom:80%;" />

## 测试程序

可以在idea中创建http文件进行请求，在创建文件的最下面

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212151025565.png" alt="image-20221215102552499" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212151026962.png" alt="image-20221215102618890" style="zoom:80%;" />

可以用 telnet 程序测试：直接在命令行输入telnet 172.31.32.1 8080即可

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211081933271.png" alt="image-20221108193337179" style="zoom:80%;" />



## 请求方式与数据格式

### GET 请求示例

```java
@GetMapping("test2")
public String test2(String name, Integer age) {
    System.out.println(name + " " + age);
    return "收到:" + name + " " + age;
}
```

> 发起HTTP请求
>

```sh
GET /test2?name=zhangsan&age=20 HTTP/1.1
Host: localhost:8080
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212151027353.png" alt="image-20221215102742265" style="zoom:67%;" />

### POST 请求示例

> **后端接口**

```java
@Data
public class User1 {
    private String name;
    private int age;
}
```

> 注意事项：此时不可以加上@RequestBody注解，不然会出现Unsupported Media Type 415 类型不匹配

```java
@PostMapping("test3")
public User1 test3(User1 user) {
    System.out.println(user);
    return user;
}
```

**发起http请求**

> 请求体是名字=值格式，对应Content-Type类型就是application/x-www-form-urlencoded

> application/x-www-form-urlencoed 格式细节：
>

> * 参数分成名字和值，中间用 = 分隔
> * 多个参数使用 **&** 进行分隔
> * 【张】等特殊字符需要用 encodeURIComponent() 编码为 【%E5%BC%A0】后才能发送

```sh
POST /test3 HTTP/1.1
Host: localhost:8080
Content-Type: application/x-www-form-urlencoded

name=%E5%BC%A0&age=18
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212151043279.png" alt="image-20221215104303173" style="zoom:50%;" />

### JSON 请求示例

> 注意：此时加上了@RequestBody注解，用来接收JSON数据，必须加上@RequestBody

```java
@PostMapping("test4")
public User1 test4(@RequestBody User1 user) {
    System.out.println(user);
    return user;
}
```

```sh
POST /test4 HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{"name":"zhang","age":18}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212151049861.png" alt="image-20221215104934747" style="zoom:50%;" />

json 对象格式

```
{"属性名":属性值}
```

其中属性值可以是

> * 字符串 ""
> * 数字
> * true, false
> * null
> * 对象
> * 数组： [元素1, 元素2, ...]

### multipart 请求示例

> multipart：请求由多部分组成，使用分隔符进行数据划分

* boundary用来定义分隔符
* 起始分隔符是 `--分隔符`
* 结束分隔符是 `--分隔符--`

```java
@PostMapping("/test2")
public String test2(String name, Integer age) {
    System.out.println(name + " " + age);
    return "收到:" + name + " " + age;
}
```

```sh
POST /test2 HTTP/1.1
Host: localhost:8080
Content-Type: multipart/form-data; boundary=123

--123
Content-Disposition: form-data; name="name"

lisi
--123
Content-Disposition: form-data; name="age"

30
--123--
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212151125607.png" alt="image-20221215112552497" style="zoom:67%;" />

### URL编码

```java
@Test
public void test() throws Exception {
    // utf-8
    byte[] bytes = "张".getBytes(StandardCharsets.UTF_8);
    System.out.println(bytes);

    for (byte b : bytes) {
        System.out.println(Integer.toHexString(Byte.toUnsignedInt(b)));
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211081943375.png" alt="image-20221108194320310" style="zoom:80%;" />

### 数据格式小结

客户端发送：编码 

> * application/x-www-form-urlencoded ：url 编码
> * application/json：utf-8 编码
> * multipart/form-data：每部分编码可以不同

表单只支持以 application/x-www-form-urlencoded 和 multipart/form-data 格式发送数据

> * 文件上传需要用 multipart/form-data 格式
> * js 代码可以支持任意格式发送数据 

服务端接收

> * 对 application/x-www-form-urlencoded 和 multipart/form-data 格式的数据，Spring 接收方式是统一的，只需要用 java bean 的属性名对应请求参数名即可
> * 对于 applicaiton/json 格式的数据，Spring 接收需要使用 @RequestBody 注解 + java bean 的方式

## Session 原理

Http 无状态，有会话

> * 无状态是指，**请求之间相互独立，第一次请求的数据，第二次请求不能重用**
> * 有会话是指，**客户端和服务端都有相应的技术，可以暂存数据，让数据在请求间共享**
> * 服务端使用了 session 技术来暂存数据

### 存入数据

```java
@PostMapping("s1")
public String s1(HttpSession session, String name) {
    session.setAttribute("name", name);
    return "数据已存储";
}
```

```sh
POST /s1 HTTP/1.1
Host: localhost:8080
Content-Type: application/x-www-form-urlencoded

name=zhangsan
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212151144991.png" alt="image-20221215114455860" style="zoom: 50%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211081948482.png" alt="image-20221108194805404" style="zoom:80%;" />

### 取出数据

```java
@PostMapping("s2")
public String s2(HttpSession session) {
    return "取出数据" + session.getAttribute("name");
}
```

> 取出数据需要加上JSESSIONID，上面响应的已经有了
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212151144069.png" alt="image-20221215114429967" style="zoom: 50%;" />



<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211081952927.png" alt="image-20221108195218845" style="zoom:80%;" />

### 身份验证

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212151131332.png" alt="image-20221215113100185" style="zoom:80%;" />

```mermaid
sequenceDiagram
participant Client
participant L as LoginController
participant i as LoginInterceptor
participant Session
rect rgb(200, 223, 255)
Client ->> +L : 登录请求
L ->> L : 检查用户名，密码，验证通过
L ->> +Session : 存入用户名
Session -->> -L: 
L -->> -Client: 登录成功
end
rect rgb(200, 190, 255)
Client ->> +i : 其它请求
i ->> +Session : 获取用户名
Session -->> -i : 
i ->> i: 用户名存在，放行
i -->> -Client : 
end
```

## JWT 原理

> jwt 技术实现身份验证
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209262138805.png" alt="image-20220926213819704" style="zoom:80%;" />

### 生成 token

```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId> <!-- or jjwt-gson if Gson is preferred -->
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
```

```java
SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

@PostMapping("j1")
public String j1(String name, String pass) {
    if ("zhang".equals(name) && "123".equals(pass)) {
        String token = Jwts.builder().setSubject(name).signWith(key).compact();
        return "验证身份通过:" + token;
    } else {
        return "验证身份失败";
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211081956458.png" alt="image-20221108195647380" style="zoom:80%;" />

### 校验 token

```java
@PostMapping("j2")
public String j2(@RequestHeader String authorization) {
    try {
        System.out.println(authorization);
        Jws<Claims> jws = Jwts.parserBuilder()
                          .setSigningKey(key).build().parseClaimsJws(authorization);
        return "校验通过, 你是:" + jws.getBody().getSubject();
    } catch (Exception e) {
        return "校验失败";
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211081957587.png" alt="image-20221108195753491" style="zoom:80%;" />

### JWT测试

```java
@Test
public void test() {
    // header(签名算法)    payload(数据)  签名(重要)，保障数据不被篡改
    // eyJzdWIiOiJhZG1pbiJ9
    String token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ6aGFuZyJ9._1-P_TLlzQPb1_lCyGwplMZaKQ8Mcw_plBbYPZ3OX28";
    //               1                   2           3 ==> 6
    //               1                   4           3 ==> 8
    System.out.println(new String(Base64.getDecoder().decode("eyJhbGciOiJIUzI1NiJ9")));
    System.out.println(new String(Base64.getDecoder().decode("eyJzdWIiOiJ6aGFuZyJ9")));
    // 可以把token的第二部分内容部分换成admin来欺骗服务器吗，不可以，因为有前面
    String str = """
            {"sub":"admin"}""";
    System.out.println(Base64.getEncoder()
                       .encodeToString(str.getBytes(StandardCharsets.UTF_8)));
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211082000691.png" alt="image-20221108200008620" style="zoom:80%;" />



# Javascript⭐

它是一种脚本语言，可以用来更改页面内容，控制多媒体，制作图像、动画等等

## JS引入方式

### 内置引入

```html
<script>
	// js 代码
</script>
```

### 外部引入

```html
<script src="js脚本路径"></script>
```

> 注意，到了框架之后，引入方式会有不同

## 修改元素内容示例

```js
div>
    <p id="p1">11111</p>
</div>
<script src="1.js"></script>
```

```js
let a = document.getElementById("p1");
a.innerText = "44444";
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212151245789.png" alt="image-20221215124536699" style="zoom:80%;" />

# 变量与数据类型

## 声明变量和常量

### let⭐

> 能用let声明变量就不要用var，用var会产生作用域问题

```js
let 变量名 = 值;
// let 声明的是变量，可以被多次赋值
let a = 100;  // 初始值是 100
a = 200;	  // ok, 被重新赋值为 200
```

### const⭐

> const 修饰的叫常量，只能赋值一次
>

```js
const b = 300; // 初始值是 300
b = 400;	   // error, 不能再次赋值

const c = [1,2,3]; // const 并不意味着它引用的内容不可修改
c[2] = 4; 	        // ok, 数组内容被修改成 [1,2,4]
c = [5,6];			// error, 不能修改数组
```

### var

> var声明变量，会产生作用域问题

```js
// var 声明的变量可以被多次赋值，例如
var f = 100;
f = 200;
```

## 基本数据类型

### undefined 和 null

> undefined ：用来表示未定义

> * **执行表达式或函数，没有返回结果，出现 undefined**
> * **访问数组不存在的元素，访问对象不存在的属性，出现 undefined**
> * **定义变量，没有初始化，出现 undefined**

```js
console.log(1);  	// 函数没有返回值, 结果是  undefined

let a = 10;		 	// 表达式没有返回值, 结果是 undefined
let b = [1,2,3];

let e = null; // 程序员直接赋值null

console.log(b[10]); // 数组未定义元素是 undefined

let c = {"name":"张三"};
console.log(c.age); // 对象未定义属性是 undefined

let d;
console.log(d);		// 变量未初始化是 undefined
```

共同点和区别

> * **都没有属性、方法**，**二者合称 Nullish**
> * **undefined 由 js 产生，未初始化和无返回值和访问不存在的元素**
> * **null 是由程序员主动提供的，比如可以返回值为null，可以给变量定义为null**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211101939194.png" alt="image-20221110193948106" style="zoom:80%;" />

### string⭐

#### 字符串三种写法

> 三种写法：单引号，双引号，反引号

```js
let a = "hello";  // 双引号
let b = "world";  // 单引号
let c = `hello`;  // 反引号
```

> html代码如何用 java 和 js 中的字符串如何表示？

```js
// java中，jdk8以上，可以使用三个双引号包裹，无需进行转义
String s1 = "<a href=\"1.html\">超链接</a>";

// js 就比较灵活，使用反引号即可
let s1 = '<a href="1.html">超链接</a>';
let s2 = `<a href="1.html">超链接</a>`;
```

#### 模板字符串

> 需求：拼接 URI 的请求参数，如
>

```sh
/test?name=zhang&age=18
/test?name=li&age=20
```

> 传统方法拼接
>

```js
let name = ; // zhang li ...
let age = ; // 18 20 ...

let uri = "/test?name=" + name + "&age=" + age;
```

> 模板字符串方式
>

```js
let name = ; // zhang li ...
let age = ; // 18 20 ...

let uri = `/test?name=${name}&age=${age}`;
```

### number 和 bigint:star:

> number 类型标识的是双精度浮动小数，例如
>

```js
10 / 3;   // 结果 3.3333333333333335
```

> 既然是浮点小数，那么可以除零
>

```js
10 / 0;	  // 结果 Infinity 正无穷大
-10 / 0;  // 结果 -Infinity 负无穷大
```

> 浮点小数都有运算精度问题，例如
>

```js
2.0 - 1.1; // 结果 0.8999999999999999
```

> 字符串转数字
>

```js
let a1 = "10" - 0   // 通过-0，能让字符串转换成数字，比较简单

parseInt("10"); 	// 结果是数字 10 
parseInt("10.5");	// 结果是数字 10, 去除了小数部分
parseInt("10") / 3; // 结果仍视为 number 浮点数, 因此结果为 3.3333333333333335

parseInt("abc");	// 转换失败，结果是特殊值 NaN (Not a Number)
```

> 要表示真正的整数，需要用 bigint，数字的结尾用 n 表示它是一个 bigint 类型
>

```js
10n / 3n;			// 结果 3n, 按整数除法处理
```

### boolean :star:

> 在 js 中，不是 boolean 才能用于条件判断，你可以在 if 语句中使用【数字】、【字符串】... 作为判断
>

```js
let b = 1;

if(b) { // true
    console.log("进入了");
}
```

> 这时就有一个规则，当需要条件判断时，这个值被当作 true 还是 false，当作 true 的值归类为 truthy，当作 false 的值归类为 falsy
>

* `false`
* `Nullish (null, undefined)`
* `0, 0n, NaN`
* ``` "" '' `` ```  即长度为零的字符串

> 剩余的值绝大部分都是 truthy，有几个容易被当作 falsy 实际是 truthy 的
>

* `"false", "0"` 即字符串的 false 和 字符串的零
* `[]` 空数组
* `{}` 空对象

### symbol

> 很少使用

## let、var 与作用域

> 如果函数外层引用的是 let 变量，那么外层普通的 {} 也会作为作用域边界，最外层的 let 也占一个 script 作用域
>

```js
let x = 10; 
if(true) {
    let y = 20;
    function b() {
        console.log(x,y);
    }
    console.dir(b);
}
```

> 如果函数外层引用的是 var 变量，外层普通的 {} 不会视为边界
>

```js
var x = 10; 
if(true) {
    var y = 20;
    function b() {
        console.log(x,y);
    }
    console.dir(b);
}
```

> 如果 var 变量出现了重名，则他俩会被视为同一作用域中的同一个变量
>

```js
var e = 10; 
if(true) {
    var e = 20;
    console.log(e);	// 打印 20
}
console.log(e);		// 因为是同一个变量，还是打印 20
```

> 如果是 let，则视为两个作用域中的两个变量
>

```js
let e = 10; 
if(true) {
    let e = 20;	
    console.log(e);	// 打印 20
}
console.log(e);		// 打印 10
```

> 要想里面的 e 和外面的 e 能区分开来，最简单的办法是改成 let，或者用函数来界定作用域范围
>

```js
var e = 10; 
if(true) {
    function b() {
        var e = 20;
    	console.log(e);
    }
    b();
}
console.log(e);	
```



## JS 动态类型

> 静态类型语言，如 Java，值有类型，变量也有类型、赋值给变量时，类型要相符
>

```java
int a = 10;
String b = "abc";

int c = "abc";  // 错误
```

> 而 js 属于动态类型语言，值有类型，但变量没有类型，赋值给变量时，没要求，例如
>

```js
let a = 200;

let b = 100;
b = 'abc';
b = true;
```

> 动态类型看起来比较灵活，但变量没有类型，会给后期维护带来困难，例如
>

```js
function test(obj) {
    // obj 的类型未知，必须根据不同类型做出相应的容错处理
}
```



# 函数

## 定义函数

```js
function 函数名(参数) {
    // 函数体
    return 结果;
}
```

```js
function add(a, b) {
    return a + b;
}
```

## 调用函数

```js
函数名(实参);
```

```js
add(1, 2);     // 返回 3
```

> js 中的函数调用特点：对参数的**类型**和**个数**都没有限制，例如
>

```js
console.log(add(4, 5, 6)) // 返回 9, 第三个参数没有被用到, 不会报错
console.log(add(4, 5))
console.log(add('a', 'b'))
console.log(add(4)) // 返回 NaN, 这时 b 没有定义是 undefined, undefined 做数学运算结果就是 NaN
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212151620731.png" alt="image-20221215162008627" style="zoom:80%;" />

## 带默认参数的函数⭐

> java 中（spring）**要实现默认参数的效果得这么做**：
>

```java
@RestController 
public class MyController {
    
    @RequestMapping("/page")
    @ResponseBody
    public void page(
        @RequestParam(defaultValue="1") int page, 
        @RequestParam(defaultValue="10") int size){
        // ...
    }
}
```

> JS中实现默认参数

```js
function pagination(page = 1, size = 10) {
    console.log(page, size);
}
pagination() // 调用函数
```

## 匿名函数(立即执行)

### 匿名函数定义和调用

> 匿名函数要包裹在圆括号内，表示是一个表达式

```js
(function (参数) {
    // 函数体
    return 结果;
})
```

```js
(function(a,b){
    return a + b;
})
```

### 立即传参

> 第一种场景：**定义完毕后立刻调用**，**后面的括号表示立即传参，即只调用一次**

```js
(function(a,b){
    return a + b;
})(1,2)
```

### 作为其它对象的方法

> 第二种场景：**作为其它对象的方法，例如，页面有元素**
>

```html
<p id="p1">点我啊</p>
```

> 此元素有一个 onclick 方法，会在鼠标单击这个元素后被执行，onclick 方法刚开始是 null，需要赋值后才能使用
>

```js
document.getElementById("p1").onclick = (function(){
    console.log("鼠标单击了...");
});
```

## 箭头函数⭐

> 匿名函数的更简化写法

```js
(参数) => {
    // 函数体
    return 结果;
}
```

> * 如果没有参数，() 还是要保留
> * 如果只有一个参数，() 可以省略
> * 如果函数体内只有一行代码，{} 可以省略
> * 如果这一行代码就是结果，return 可以省略

```js
let s = (a, b) => {
    return a * b;
}

s(11,22) // 调用箭头函数
```

## 函数是对象⭐

> 以下形式在 js 中非常常见！可以参与赋值，例，具名函数也能参与赋值
>

```js
function abc() {
    console.log("bb");
}

document.getElementById("p1").onclick = abc;
```

> 有属性、有方法，执行 `console.dir(abc)`，输出结果如下
>

```
ƒ abc()
    arguments: null
    caller: null
    length: 0
    name: "abc"
    ➡prototype: {constructor: ƒ}
    [[FunctionLocation]]: VM1962:1
    ➡[[Prototype]]: ƒ ()
    ➡[[Scopes]]: Scopes[1]
```

> * 其中带有 f 标记的是方法，不带的是属性
> * 带有 ➡ 符号的可以继续展开，限于篇幅省略了
>
> * 带有 `[[ ]]` 的是内置属性，不能访问，只能查看
> * 相对重要的是 `[[Prototype]]` 和 `[[Scopes]]` 会在后面继承和作用域时讲到

> **可以作为方法参数**

```js
function a() {
    console.log('a')
}

function b(fn) {          // fn 将来可以是一个函数对象
    console.log('b')
    fn();                 // 调用函数对象
}

b(a)
```

> **可以作为方法返回值**

```js
function c() {
    console.log("c");
    function d() {
        console.log("d");
    }
    return d;
}

c()()
```

## 函数作用域

> 函数可以嵌套（js 代码中很常见，只是嵌套的形式更多是匿名函数，箭头函数）
>

```js
function a() {
    function b() {        
    }
}
```

> 看下面的例子
>

```js
function c() {
    var z = 30;
}
// 使用var可以进行变量的跨区访问，函数b内部可以访问x和y的值，但无法访问z的值
var x = 10;
function a() {
    var y = 20;
    function b() {
        // 看这里，内部函数可以访问外部函数变量
        console.log(x, y);
    }
    b();
}
a(); // 10 20
```

> * 以函数为分界线划定作用域，所有函数之外是全局作用域
> * **内层作用域(函数b)----->外层作用域(函数a)------->全局作用域(变量x的位置)**
> * **查找变量时，由内向外查找**
>   * 在内层作用域找到变量，就会停止查找，不会再找外层
>   * 所有作用域都找不到变量，报错
> * **作用域本质上是函数对象的属性，可以通过 console.dir 来查看调试**

## 闭包

> JS中的闭包

```js
var x = 10;
function a() {
    var y = 20;
    function b() {
        console.log(x,y);
    }
    return b; // b函数作为返回值
}
a()();  // 在外面执行了 b 10 20
```

> Java中的闭包

```java
public class TestClosure {
    public static void main(String[] args) {
        a().accept(10);
    }

    public static Consumer<Integer> a() {
        int y = 20;
        Consumer<Integer> b =
                x -> System.out.println(x + "," + y); // 10,20
        return b;
    }
}
```

> * 函数定义时，它的作用域已经确定好了，因此无论函数将来去了哪，都能从它的作用域中找到当时那些变量
> * 别被概念忽悠了，闭包就是指**函数能够访问自己的作用域中变量**



# 数组

## 基本用法

```js
// 创建数组
let arr = [1,2,3]; 

// 获取数组元素
console.log(arr[0]); // 输出 1

// 修改数组元素
array[0] = 5;		 // 数组元素变成了 [5,2,3]

// 遍历数组元素，其中 length 是数组属性，代表数组长度
for(let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
```

## 数组增删

```js
let arr = [1,2,3]; 

arr.push(4);    	// 向数组尾部(右侧)添加元素, 结果 [1,2,3,4]
arr.shift();		// 从数组头部(左侧)移除元素, 结果 [2,3,4]
arr.splice(1,1);	// 删除【参数1】索引位置的【参数2】个元素，删除3，结果 [2,4]
```

## 数组转字符串

```js
let arr = ['a','b','c'];

console.log(arr.join()) // 默认使用【,】作为连接符，结果 'a,b,c'
console.log(arr.join('')) // 结果 'abc'
console.log(arr.join('-')) // 结果 'a-b-c'
console.log(arr.join('--')) // 结果 a--b--c
console.log(arr.join('*')) // 结果 a*b*c
```

## 映射、过滤、遍历⭐

> * 高阶函数，map，filter，forEach
> * 回调函数，例如作为参数传入的函数

### 映射map

> 传给 map 的函数，参数代表旧元素，返回值代表新元素

```js
let arr = [1,2,3,6];
let arr1 = arr.map((i) => {return i * 10}); // 箭头函数
console.log(arr1)

let arr2 = arr.map( i => i * 100 ); // 箭头函数
console.log(arr2)
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212151707532.png" alt="image-20221215170700406" style="zoom:80%;" />

> map 的内部实现（伪代码）
>

```js
function map(a) { // 参数是一个函数
    let narr = [];
    for(let i = 0; i < arr.length; i++) {
        let o = arr[i]; // 旧元素
        let n = a(o);   // 新元素
        narr.push(n);
    }
    return narr;
} 
```

### 过滤filter

> 传给 filter 的函数，参数代表旧元素，返回 true 表示要留下的元素

```js
let arr = [1,2,3,6];
arr.filter((i)=> i % 2 == 1); // 结果 [1,3]
```

### 遍历forEach 

```js
let arr = [1,2,3,6];

for(let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

arr.forEach((i) => console.log(i));
```

## 查找、判断、规约

### 查找some 

```js
const arr = ['小红', '你大红', '苏大强', '宝']

// forEach 循环一旦开始，无法在中间被停止
arr.forEach((item, index) => {
  console.log('object')
  if (item === '苏大强') {
    console.log(index)
  }
})
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.8.17/image-20230715210241193.png" alt="image-20230715210241193" style="zoom:80%;" />

```js
// 从数组中找元素，使用some方法
arr.some((item, index) => {
  console.log('ok')
  if (item === '苏大强') {
    console.log(index)
    // 在找到对应的项之后，可以通过 return true 固定的语法，来终止 some 循环
    return true
  }
})
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.8.17/image-20230715210318335.png" alt="image-20230715210318335" style="zoom:80%;" />

### 判断every

```js
const arr = [
  { id: 1, name: '西瓜', state: true },
  { id: 2, name: '榴莲', state: false },
  { id: 3, name: '草莓', state: true },
]

// 需求：判断数组中，水果是否被全选了！
const result = arr.every(item => item.state)
console.log(result)
```

### 规约reduce

```js
const arr = [
  { id: 1, name: '西瓜', state: true, price: 10, count: 1 },
  { id: 2, name: '榴莲', state: false, price: 80, count: 2 },
  { id: 3, name: '草莓', state: true, price: 20, count: 3 },
]
```

```js
// 需求：把购物车数组中，已勾选的水果，总价累加起来！
let amt = 0 // 总价
arr.filter(item => item.state).forEach(item => {
    amt += item.price * item.count
})

console.log(amt)
```

```js
// arr.filter(item => item.state).reduce((累加的结果, 当前循环项) => { }, 初始值)
const result = arr.filter(item => item.state)
                  .reduce((amt, item) => amt += item.price * item.count, 0)
console.log(result)
```



# 对象

## 定义对象语法

### 语法

```js
let obj = {
    属性名: 值,
    方法名: 函数,
    get 属性名() {},
    set 属性名(新值) {}
}
```

### 定义方式1

```js
let stu1 = {
    name: "小明",
    age: 18,
    study: function(){
        console.log(this.name + "爱学习");
    }    
}
```

### 定义方式2

```js
let name = "小黑";
let age = 20;
let study = function(){
    console.log(this.name + "爱学习");
}

let stu2 = { name, age, study }
```

### 定义方式3（重点，使用最多）

> **注意**：**对象方法这么写，仅限于对象内部，外部方法还得是function 函数名() 这种格式**

```js
let stu3 = {
    name: "小白",
    age: 18,
    study(){
        console.log(this.name + "爱学习");
    }    
}
```

### 定义方式4

```js
let stu4 = {
    _name: null, // 类似于java中私有成员变量，get获取属性，set设置属性
    get name() {
        console.log("进入了get");
        return this._name;
    },
    set name(name) {
        console.log("进入了set");
        this._name = name;
    }
}
```

调用 get，set

```js
stu4.name = "小白"

console.log(stu4.name)
```



## 特色：属性增删

对比一下 Java 中的 Object

> * Java 的 Object 是以类作为模板来创建，对象不能脱离类模板的范围，对象的属性、能用的方法都是确定好的
> * js 的对象，不需要什么模板，它的属性和方法可以随时加减

```js
let stu = {
    name:'张三'
};

stu.age = 18;					// 添加属性
delete stu.age;					// 删除属性

stu.study = function() {		// 添加方法
    console.log(this.name + "在学习");
}
```

添加 get，set，需要借助 Object.definePropery

```js
let stu = {_name:null};

Object.defineProperty(stu, "name", {
    get(){
        return this._name;
    },
    set(name){
        this._name = name;
    }
});
```

* 参数1：目标对象
* 参数2：属性名
* 参数3：get，set 的定义

## 特色：this

### Java 中的 this

先来对 Java 中的 this 有个理解

> * Java 中的 **this 是个隐式参数**
> * Java 中，**我们说 this 代表的就是调用方法的那个对象**

```java
public class TestMethod {

    static class Student {
        private String name;

        public Student(String name) {
            this.name = name;
        }
	    // 隐式参数
        public void study(Student this, String subject) {
            System.out.println(this.name + "在学习 " + subject);
        }
    }

    public static void main(String[] args) {
        Student stu = new Student("小明");
        
        // 下面的代码，本质上是执行 study(stu, "java")，因此 this 就是 stu
        stu.study("java"); 
    }
}
```

### JS 中的 this

> js 中的 this 也是隐式参数，但它与函数运行时上下文相关
>

例如，一个“落单”的函数

```js
function study(subject) {
    console.log(this.name + "在学习 " + subject)
}
```

测试一下

```js
study("js");  // 输出 在学习 js
```

> 这是因为此时函数执行，全局对象 window 被当作了 this，window 对象的 name 属性是空串
>

同样的函数，如果作为对象的方法

```js
let stu = {
    name:"小白",
    study
}
```

这种情况下，会将当前对象作为 this

```js
stu.study('js'); 	// 输出 小白在学习 js
```

还可以动态改变 this

```js
let stu = {name:"小黑"};
study.call(stu, "js");	// 输出 小黑在学习 js
```

> 这回 study 执行时，就把 call 的第一个参数 stu 作为 this
>

> 一个例外是，在**箭头函数**内出现的 this，以外层 this 理解 
>

### 匿名函数

```js
let stu = {
    name: "小花",
    friends: ["小白","小黑","小明"],
    play() {
        // this.friends属于当前对象，因此可以调用，
        // 而里面的this.name已经是内部函数了，不可以访问外部
        this.friends.forEach(function(e){
            console.log(this.name + "与" + e + "在玩耍");
        });
    }
}
stu.play()
```

> this.name 所在的函数是【落单】的函数，因此 this 代表 window

输出结果为

```
与小白在玩耍
与小黑在玩耍
与小明在玩耍
```

### 箭头函数⭐

```js
// 推荐使用，能成功解决this访问问题
let stu = {
    name: "小花",
    friends: ["小白","小黑","小明"],
    play() {
        this.friends.forEach(e => {
            console.log(this.name + "与" + e + "在玩耍");
        })
    }    
}
```

> this.name 所在的函数是箭头函数，因此 this 要看它外层的 play 函数，play 又是属于 stu 的方法，因此 this 代表 stu 对象
>

输出结果为

```
小花与小白在玩耍
小花与小黑在玩耍
小花与小明在玩耍
```

### 不用箭头函数的做法

```js
let stu = {
    name: "小花",
    friends: ["小白","小黑","小明"],
    play() {
        let me = this; // 重新指向this，此时me就是stu对象
        this.friends.forEach(function(e){
            console.log(me.name + "与" + e + "在玩耍");
        });
    }
}
```

## 特色：原型继承

```js
let father = {
    f1: '父属性',
    m1: function() {
        console.log("父方法");
    }
}

let son = Object.create(father);

console.log(son.f1);  // 打印 父属性
son.m1();			  // 打印 父方法
```

* father 是父对象，son 去调用 .m1 或 .f1 时，自身对象没有，就到父对象找
* son 自己可以添加自己的属性和方法
* son 里有特殊属性 `__proto__` 代表它的父对象，js 术语： son 的原型对象
* 不同浏览器对打印 son 的 `__proto__` 属性时显示不同
  * Edge 打印 console.dir(son) 显示 `[[Prototype]]`
  * Firefox 打印 console.dir(son) 显示 `<prototype>`

## 特色：基于函数的原型继承

出于方便的原因，js 又提供了一种基于函数的原型继承

> 1. 负责创建子对象，给子对象提供属性、方法，功能上相当于构造方法
>
> 2. **函数有个特殊的属性 prototype，它就是函数创建的子对象的父对象**
>
>    **注意！**名字有差异，这个属性的作用就是为新对象提供原型

```js
function cons(f2) {
    // 创建子对象(this), 给子对象提供属性和方法
    this.f2 = f2;
    this.m2 = function () {
        console.log("子方法");
    }
}

// cons.prototype 就是父对象
cons.prototype.f1 = "父属性";
cons.prototype.m1 = function() {
    console.log("父方法");
}
```

配合 new 关键字，创建子对象

```js
let son = new cons("子属性")
```

子对象的 `__proto__` 就是函数的 `prototype` 属性



## JSON

之前我们讲 http 请求格式时，讲过 json 这种数据格式，它的语法看起来与 js 对象非常相似，例如：

### JSON 与 JS 对象区别

> 一个 json 对象可以长这样：注意属性名加了引号
>

```json
{
    "name":"张三",
    "age":18
}
```

> 一个 js 对象长这样：注意属性名没有引号
>

```js
{
    name:"张三",
    age:18
}
```

那么他们的区别在哪儿呢？我总结了这么几点

本质不同

> json 对象本质上是个字符串，它的职责是作为客户端和服务器之间传递数据的一种格式，它的属性只是样子货
>
> js 对象是切切实实的对象，可以有属性方法

语法细节不同

> * json 中只能有 null、true|false、数字、字符串（只有双引号）、对象、数组
> * json 中不能有除以上的其它 js 对象的特性，如方法等
> * json 中的属性必须用双引号引起来

### JSON与 JS 对象的转换

```js
JSON.parse(json字符串);  // 返回js对象

JSON.stringify(js对象);  // 返回json字符串
```

```java
let stu = {
    name: "小花",
    friends: ["小白","小黑","小明"],
    play() {
        let me = this; // 重新指向this，此时me就是stu对象
        this.friends.forEach(function(e){
            console.log(me.name + "与" + e + "在玩耍");
        });
    }
}
// 对象和JSON字符串互相转换
// 转成JSON
let jstu = JSON.stringify(stu);
console.log(jstu)
// 转成对象
let dstu = JSON.parse(jstu);
console.log(dstu)
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.8.17/image-20230715212722307.png" alt="image-20230715212722307" style="zoom:80%;" />

## 实用技巧

### 创建一个绝对空的对象

> 我们可以通过 `{}` 来创建空对象。 然而，通过方法中创建的对象，`proto`、`hasOwnProperty`等对象方法仍然是存在的，这是因为使用 `{}` 将创建一个继承自 `Object` 类的对象。

> 如果需要创建一个绝对空的对象，最好使用 `Object.create(null)`，它将创建一个不从任何对象继承且没有属性的对象。

```js
let vehical = Object.create(null);

// vehicle.__proto__ === "undefined"  ✅
```

### 使用扩展运算符组合两个对象

> 在许多情况下，需要组合来自不同来源的两个或多个数据集。最常用的方法是使用 `Object.assign()`。该方法需要多个参数。 第一个是分配的对象，其余参数是需要组合的对象。

```js
const name = { id: '1234', name: 'Charuka'};
const university = { id: '1234', university: 'Harvard'};
const PersonalDetails = Object.assign({}, name, university);

console.log(PersonalDetails); 
// { id: '1234', name: 'Charuka', university: 'Harvard' }
```

> 使用扩展运算符进行组合更方便，只需展开任意数量的对象，并将它们组合成一个对象即可。

```js
const PersonalDetails = { ...name, ...university };

console.log(PersonalDetails); 
// { id: '1234', name: 'Charuka', university: 'Harvard' }
```

> 需要注意，如果存在重复的键，那后面的会将覆盖前面对象的键。

### 从对象获取键和值的列表

在开发过程中，有时需要从对象中仅获取键或仅获取值。可以通过以下两个内置函数来实现：

- `Object.keys()`：用于获取键列表。
- `Object.values()`：用于获取值列表。

```js
const vehicle = { brand: 'BWM', year: 2022, type: 'suv'};
//获取键
console.log(Object.keys(vehicle)); // [ 'brand', 'year', 'type' ]
//获取值
console.log(Object.values(vehicle)); // [ 'BWM', 2022, 'suv' ]
```

### 检查属性

> 使用 for-in 循环时，检查对象的属性有助于避免迭代对象原型中的属性。可以使用 `Object.hasOwnProperty()`进行检查，而不是使用 if-else。

```js
const vehicle = { brand: 'BWM', year: 2022, type: 'suv'};
for (var item in vehicle) {  
    if (vehicle.hasOwnProperty(item)) { 
        console.log(item);                 
    };  
};
// brand
// year
// type
```

### 克隆对象

> 假设有一个对象并且需要复制它以更改其值，但原始对象应该保持不变。可以通过以下方法来实现。

> 第一种方法是使用 `Object.assign()`，它将所有可枚举属性的值从一个对象复制到另一个对象。

```js
const initialVehicle = { brand: 'BWM', year: 2022, type: 'suv'};
const secondaryVehicle = Object.assign({}, initialVehicle);
console.log(secondaryVehicle); // { brand: 'BWM', year: 2022, type: 'suv'};
```

第二种方法是使用 `JSON.parse()` 复制对象。

```js
var initialVehicle = { brand: 'BWM', year: 2022, type: 'suv'};
var secondaryVehicle = JSON.parse(JSON.stringify(initialVehicle));
console.log(secondaryVehicle); // { brand: 'BWM', year: 2022, type: 'suv'};
```

### 从对象中选择特定数据

> 针对对象中的特定键（`key`），可以使用不同的方法进行选择。选择方法的选择取决于希望对这些值进行的操作。下面的示例展示了一种有条理的方式从对象中选择数据，并可以选择所需的键，并将它们提取到一个新的对象中。

```js
const selectObj = (obj, items) => { 
  return items.reduce((result, item) => {
    result[item] = obj[item]; 
    return result;
  }, {});
};
const vehicle = { brand: 'BWM', year: 2022, type: 'suv'};
const selected = selectObj(vehicle, ['brand', 'type']);
console.log(selected); // { brand: 'BWM', type: 'suv' }
```

### 从对象中删除键

> 有时我们需要从对象中删除特定的键及其值。最合适的方法是编写一个可重用的删除方法，该方法将一个对象和要删除的键列表作为输入。 然后循环遍历要删除的每个键并将其从对象中删除。

```js
const remove = (object, removeList = []) => {
  const result = { ...object };
  removeList.forEach((item) => {
    delete result[item];
  });
  return result;
}

const vehicle = { brand: 'BWM', year: 2022, type: 'suv'}

const itemRemoved = remove(vehicle, ['year']);
console.log(itemRemoved); // Result { brand: 'BWM', type: 'suv' }
```

### 将对象数据拉入数组

> 在某些情况下，我们需要将对象数据拉入数组中，例如下拉菜单。可以使用 `Object.entries()` 函数，该函数将一个对象作为其第一个参数并返回一个数组。返回的结果是一个二维数组。内部数组将有两个值：第一个是键，第二个是值。

```js
const vehicle = { brand: 'BWM', year: 2022, type: 'suv'}
console.log(Object.entries(vehicle)); 
// [ [ 'brand', 'BWM' ], [ 'year', 2022 ], [ 'type', 'suv' ] ]
```

### 循环访问 JavaScript 对象

> JavaScript 中有多种方法可用于循环访问对象。第一种方法是使用 `Object.entries()`，该函数可以避免查找原始对象中的每个值。

```js
const vehicle = { brand: 'BWM', year: 2022, type: 'suv'}
Object.entries(vehicle).forEach(
    ([key, value]) => console.log(key, value)
);
// brand BWM
// year 2022
// type suv
```

> 作为一种更好、更清晰的方法，可以使用 `Object.entries()` 进行对象解构。

```js
const vehicle = { brand: 'BWM', year: 2022, type: 'suv'}
for (const [key, value] of Object.entries(vehicle)) {
    console.log(key, value);
}
// brand BWM
// year 2022
// type suv
```

### 有条件地向对象添加属性

> 通常，开发人员使用 if-else 来有条件地向对象添加新元素。 然而，最简单的方法是使用对象解构和扩展运算符。

```js
const type = { type: 'suv' };
const vehicle = {
  brand: 'BMW',
  year: 2022,
  ...(!type ? {} : type)
}
console.log(vehicle); //{ brand: 'BMW', year: 2022, type: 'suv' }
```

同样，使用不同的条件，可以向对象添加任意数量的元素。



# 运算符 & 表达式⭐

* `+ - * / % ** `
* `+= -= *= /= %= **=`
* `++ --`
* 位运算、移位运算
* `== != > >= < <=`
* `=== !==` :star:
* `&& || !` :star:
* `?? ?.` :star:
* `...` :star:
* 解构赋值 :star:

## 严格相等

> 严格相等运算符，用作逻辑判等
>

```js
1 == 1    	// 返回 true 
1 == '1'	// 返回 true，会先将右侧的字符串转为数字，再做比较
1 === '1'	// 返回 false，类型不等，直接返回 false
```

> typeof 查看某个值的类型
>

```js
typeof 1	// 返回 'number'
typeof '1'	// 返回 'string'
```

## 逻辑或 & 默认值

> 如果值1 是 Truthy，返回值1，如果值1 是 Falsy 返回值 2

```js
值1 || 值2
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212151804333.png" alt="image-20221215180432176" style="zoom:80%;" />

> 需求，如果参数 n **没有传值**，给它一个默认值【男】
>

### 推荐做法

```js
function test(n = '男') {
    console.log(n);
}
```

### 你可能的做法

```js
function test(n) {
    if(n === undefined) {
        n = '男';
    }
    console.log(n);
}
```

### 还可能是这样

```js
function test(n) {
    n = (n === undefined) ? '男' : n;
    console.log(n);
}
```

### 老旧代码中可能的做法（不推荐）

```js
function test(n) {
    n = n || '男';
    console.log(n);
}
```



## 条件判断⭐

### 判断是否为 nullish

#### 基本语法

> 注意：null和undefine 统称为 nullish

```js
值1 ?? 值2
```

> * 值1 是 nullish，返回值2
> * 值1 不是 nullish，返回值1

#### 使用示例

需求，如果参数 n 没有传递或是 null，给它一个【男】

> 如果用传统办法
>

```js
function test(n) {
    if(n === undefined || n === null) {
        n = '男';
    }
    console.log(n);
}
```

> 用 ??
>

```js
function test(n) {
    n = n ?? '男';
    console.log(n);
}
```

### 访问对象参数

> 需求，函数参数是一个对象，可能包含有子属性，例如，参数可能是
>

```js
let stu1 = {
    name:"张三",
    address: {
        city: '北京'
    }
};

let stu2 = {
    name:"李四"
}

let stu3 = {
    name:"李四",
    address: null
}
```

> 现在要访问子属性（有问题）
>

```js
function test(stu) {
    console.log(stu.address.city)
}
```

> 现在希望当某个属性是 nullish 时，短路并返回 undefined，可以用 ?.

> 用传统办法 

```js
function test(stu) {
    if(stu.address === undefined || stu.address === null) {
        console.log(undefined);
        return;
    }
    console.log(stu.address.city)
}
```

> 用简单方法
>

```js
function test(stu) {
    console.log(stu.address?.city) // undefine
}
```

## 展开运算符⭐

### 作用1：打散数组⭐

> 打散可以理解为【去掉了】数组外侧的中括号，只剩下数组元素，把元素传递给多个参数

```js
let arr = [1,2,3];

function test(a,b,c) {
    console.log(a,b,c);
}
```

> 需求，把数组元素依次传递给函数参数
>

> 传统写法
>

```js
test(arr[0],arr[1],arr[2]);		// 输出 1,2,3
```

> 展开运算符写法
>

```js
test(...arr);					// 输出 1,2,3
```

### 作用2：复制数组或对象⭐

> 数组
>

```js
let arr1 = [1,2,3];
let arr2 = [...arr1];		// 复制数组
```

> 对象
>

```js
let obj1 = {name:'张三', age: 18};

let obj2 = {...obj1};		// 复制对象
```

> **注意**：展开运算符复制属于浅拷贝，例如

```js
let o1 = {name:'张三', address: {city: '北京'} }
let o2 = {...o1};
// 修改后，o1和o2都被修改了
o2.address.city = '上海'
console.log(o1) // { name: '张三', address: { city: '上海' } }
console.log(o2) // { name: '张三', address: { city: '上海' } }
```

### 作用3：合并数组或对象⭐

> 合并数组
>

```js
let a1 = [1,2];
let a2 = [3,4];

let b1 = [...a1,...a2];		// 结果 [1,2,3,4]
let b2 = [...a2,5,...a1]	// 结果 [3,4,5,1,2]
```

> 合并对象
>

```js
let o1 = {name:'张三'};
let o2 = {age:18};
let o3 = {name:'李四'};

let n1 = {...o1, ...o2};	// 结果 {name:'张三',age:18}

let n2 = {...o3, ...o2, ...o1}; // 结果 {name:'李四',age:18}，后面会覆盖前面的同名变量
```

> 复制对象时出现同名属性，后面的会覆盖前面的
>



## 解构赋值

### 数组解构⭐

#### 声明变量

```js
let arr = [1,2,3];
let [a, b, c] = arr;	// 结果 a=1, b=2, c=3

let arr = [1, 2, 3, 4, 5, 6]
let [a,b,...c] =  arr // 结合扩展运算符
console.log(a,b,c) // 结果 1 2 [ 3, 4, 5, 6 ]
```

#### 函数传参

```js
let arr = [1,2,3];

function test([a,b,c]) {
    console.log(a,b,c) 	// 结果 a=1, b=2, c=3
}

test(arr);				
```

### 对象解构⭐

#### 声明变量

```js
let obj = {name:"张三", age:18};

let { name, age } = obj;	// 结果 name=张三, age=18
let { name : res } = obj;   // 结果 res = 张三，对接收值重命名
```

#### 函数传参

```js
// 定义对象
let obj = {name:"张三", age:18};

// 传递参数使用{}包围即可
function test({name, age}) {
    console.log(name, age); // 结果 name=张三, age=18
}

test(obj) // 传入整个对象
```



# 循环 & 控制 

* `if ... else`
* `switch`
* `while`
* `do ... while`
* `for` 
* `for ... in` :star:
* `for ... of` :star:
* `try ... catch` :star:

## for in 遍历对象

> **主要用来遍历对象**

```js
let father = {
    name:'张三',
    age:18,
    study:function(){
        console.log('study')
    }
};

for(const n in father) {
    console.log(n, father[n]); // 依次打印key和value
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212152304014.png" alt="image-20221215230453920" style="zoom:80%;" />

> * **其中 const n 代表遍历出来的属性名，即key**
> * **注意1：方法名也能被遍历出来（它其实也算一种特殊属性）**
> * **注意2：遍历子对象时，父对象的属性会跟着遍历出来**

```js
// Object.create，复制对象
let son = Object.create(father);
son.sex = "男";

for(const n in son) {
    console.log(n);
}
```

> 注意3：**在 for in 内获取属性值，要使用 [] 语法，而不能用 . 语法**

```js
for(const n in son) {
    console.log(n, son[n]);
}
```

## for of ⭐

> **主要用来遍历数组，也可以是其它可迭代对象，如 Map，Set 等，不能用来遍历对象**

### 遍历数组

```js
let a1 = [1, 2, 3];

for(const i of a1) {
    console.log(i); // 1 2 3
}
```

### 遍历数组对象

```js
let a2 = [
    {name:'张三', age:18},
    {name:'李四', age:20},
    {name:'王五', age:22}
];

for(const obj of a2) {
    console.log(obj.name, obj.age);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212152308432.png" alt="image-20221215230819360" style="zoom:80%;" />

### 解构赋值遍历⭐

```js
// 解构赋值
for(const {name,age} of a2) {
    console.log(name, age);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212152310824.png" alt="image-20221215231033746" style="zoom:80%;" />

## try catch

### 定义异常步骤

```js
let stu1 = {name:'张三', age:18, address: {city:'北京'}};
let stu2 = {name:'张三', age:18};

function test(stu) {
    try {
        console.log(stu.address.city)   
    } catch(e) {
        console.log('出现了异常', e.message)
    } finally {
        console.log('finally');
    }
}
```

### 测试使用

```js
test(stu1)
test(stu2)
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212152314837.png" alt="image-20221215231426753" style="zoom:80%;" />



# Node 多版本切换

## 卸载原NodeJS

> 只需要搜索nodejs，打开文件所在位置，既可以发现这个

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212160918868.png" alt="image-20221216091819754" style="zoom:80%;" />

## 安装 nvm

> nvm 即 (node version manager)，好处是方便切换 node.js 版本
>
> 安装包下载路径：https://github.com/coreybutler/nvm-windows/releases

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.8.17/image-20230716112907849.png" alt="image-20230716112907849" style="zoom:80%;" />

安装注意事项

> 1. 要卸载掉现有的 nodejs
> 2. 提示选择 nvm 和 nodejs 目录时，一定要避免目录中出现空格
> 3. 选用【以管理员身份运行】cmd 程序来执行 nvm 命令
> 4. 首次运行前设置好国内镜像地址

## 设置淘宝镜像

```apl
nvm node_mirror http://npm.taobao.org/mirrors/node/
nvm npm_mirror https://npm.taobao.org/mirrors/npm/
```

## 首先查看有哪些可用版本

```
nvm list available
```

输出

```
|   CURRENT    |     LTS      |  OLD STABLE  | OLD UNSTABLE |
|--------------|--------------|--------------|--------------|
|    18.7.0    |   16.16.0    |   0.12.18    |   0.11.16    |
|    18.6.0    |   16.15.1    |   0.12.17    |   0.11.15    |
|    18.5.0    |   16.15.0    |   0.12.16    |   0.11.14    |
|    18.4.0    |   16.14.2    |   0.12.15    |   0.11.13    |
|    18.3.0    |   16.14.1    |   0.12.14    |   0.11.12    |
|    18.2.0    |   16.14.0    |   0.12.13    |   0.11.11    |
|    18.1.0    |   16.13.2    |   0.12.12    |   0.11.10    |
|    18.0.0    |   16.13.1    |   0.12.11    |    0.11.9    |
|    17.9.1    |   16.13.0    |   0.12.10    |    0.11.8    |
|    17.9.0    |   14.20.0    |    0.12.9    |    0.11.7    |
|    17.8.0    |   14.19.3    |    0.12.8    |    0.11.6    |
|    17.7.2    |   14.19.2    |    0.12.7    |    0.11.5    |
|    17.7.1    |   14.19.1    |    0.12.6    |    0.11.4    |
|    17.7.0    |   14.19.0    |    0.12.5    |    0.11.3    |
|    17.6.0    |   14.18.3    |    0.12.4    |    0.11.2    |
|    17.5.0    |   14.18.2    |    0.12.3    |    0.11.1    |
|    17.4.0    |   14.18.1    |    0.12.2    |    0.11.0    |
|    17.3.1    |   14.18.0    |    0.12.1    |    0.9.12    |
|    17.3.0    |   14.17.6    |    0.12.0    |    0.9.11    |
|    17.2.0    |   14.17.5    |   0.10.48    |    0.9.10    |
```

## 建议安装 LTS（长期支持版）

```
nvm install 16.16.0
nvm install 14.20.0
```

执行 `nvm list` 会列出已安装版本

```
nvm list
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212160933531.png" alt="image-20221216093343435" style="zoom:80%;" />

## Node 版本切换

切换到 16.16.0

```
nvm use 16.16.0
```

切换到 14.20.0

```
nvm use 14.20.0
```

> 安装后 nvm 自己的环境变量会自动添加，**但可能需要手工添加 nodejs 的 PATH 环境变量**
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212160934597.png" alt="image-20221216093442497" style="zoom:80%;" />

## 检查 npm

npm 是 js 的包管理器，就类似于 java 界的 maven，要确保它使用的是国内镜像

检查镜像

```
npm get registry
```

如果返回的不是 `https://registry.npm.taobao.org/`，需要做如下设置

```
npm config set registry https://registry.npm.taobao.org/
```



# 前端案例

## 搭建前端服务器

> 新建一个保存项目的 client 文件夹，进入文件夹执行
>

```
npm install express --save-dev
```

> 修改 package.json 文件
>

```json
{
  "type": "module",
  "devDependencies": {
    "express": "^4.18.1"
  }
}
```

> 其中 devDependencies 是 npm install --save-dev 添加的
>

> 编写 main.js 代码
>

```js
import express from 'express'
const app = express() // 使用express服务器

app.use(express.static('./')) // 设置静态资源映射，根目录，./表示当前目录
app.listen(7070)
```

> 执行 js 代码（运行前端服务器）
>

```
node main.js
```

> 在根目录创建index.html，内容写入随便
>

> 访问：:7070/index.html
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212160957864.png" alt="image-20221216095754767" style="zoom:80%;" />



## 效果和架构

### 初步效果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211102111802.png" alt="image-20221110211142671" style="zoom:80%;" />

### 架构

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211102109268.png" alt="image-20221110210948099" style="zoom:80%;" />

> * 前端只有静态页面，使用 Express 服务器
> * 后端使用 Tomcat 服务器，通过 SpringBoot、MyBatis 等框架获取数据库数据

## JS 实现

### 基本结构和样式

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212161006879.png" alt="image-20221216100655781" style="zoom:80%;" />

```html
<div>
    <div class="title">学生列表</div>
    <div class="thead">
        <div class="row bold">
            <div class="col">编号</div>
            <div class="col">姓名</div>
            <div class="col">性别</div>
            <div class="col">年龄</div>
        </div>
    </div>
    <div class="tbody">
        <div class="row">
            <div class="col">1</div>
            <div class="col">张三</div>
            <div class="col">男</div>
            <div class="col">18</div>
        </div>
    </div>
</div>
```

```css
<style>
    html,
    body {
        font-family: 华文行楷;
        font-size: 20px;
    }
    /* 标题：设置外边距，水平居中 */
    .title {
        margin-bottom: 10px;
        font-size: 30px;
        color: #333;
        text-align: center;
    }
    /* 设置父盒子水平居中，注意：是亲父亲 */
    .row {
        background-color: #fff;
        display: flex;
        justify-content: center;
    }
    /* 设置子盒子大小，和文字水平垂直居中 */
    .col {
        border: 1px solid #f0f0f0;
        width: 15%;
        height: 35px;
        text-align: center;
        line-height: 35px;
    }

    .bold .col {
        background-color: #f1f1f1;
    }
</style>
```

### 查找元素

> * document.getElementById - **根据 id 值查找一个元素**
> * [document|元素].querySelector - **根据选择器查找第一个匹配元素**
> * [document|元素].querySelectorAll - **根据选择器查找所有匹配元素**

#### 根据类名查找

```js
document.querySelector('.title'); // 找到 <div class="title">学生列表</div>
```

```js
document.querySelector('.col'); // 找到 <div class="col">编号</div>
```

```js
document.querySelectorAll('.col');
/*
  找到的是一个集合
  <div class="col">编号</div>
  <div class="col">姓名</div>
  <div class="col">性别</div>
  <div class="col">年龄</div>
  <div class="col">1</div>
  <div class="col">张三</div>
  <div class="col">男</div>
  <div class="col">18</div>
*/
```

```js
const thead = document.querySelector('.thead');

// 只在 thead 元素范围内找
thead.querySelectorAll('.col');

/*
  找到的是一个集合
  <div class="col">编号</div>
  <div class="col">姓名</div>
  <div class="col">性别</div>
  <div class="col">年龄</div>
*/
```

#### 根据id查找

根据 id 属性查找既可以用

```js
document.getElementById("id值")
```

也可以用 

```js
document.querySelector("#id值")
```

### 修改元素内容

> * 元素.innerHTML
> * 元素.textContent

```js
document.querySelector('.title').innerHTML = '侠客列表'
```

> innerHTML  会解析内容中的标签，例如textContext 不会解析内容中的标签
>
> 给 innerHTML 或 textContent 赋值空串，可以实现清空标签内容的效果

### 利用模板

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212161024278.png" alt="image-20221216102405155" style="zoom:80%;" />

```html
<div>
    <div class="title">学生列表</div>
    <div class="thead">
        <div class="row bold">
            <div class="col">编号</div>
            <div class="col">姓名</div>
            <div class="col">性别</div>
            <div class="col">年龄</div>
        </div>
    </div>
    <div class="tbody">
    </div>
</div>

<template id="tp"> <!-- 模板不在页面显示，只是一个可重用的代码 -->
    <div class="row">
        <div class="col">xx</div>
        <div class="col">xx</div>
        <div class="col">xx</div>
        <div class="col">xx</div>
    </div>
</template>

<script>
    // 将来这些数据从 java 端返回
    let array = [
        { id: 1, name: '张三', sex: '男', age: 18 },
        { id: 2, name: '李四', sex: '女', age: 17 }
    ];

    const tp = document.getElementById("tp");
    const row = tp.content;
    const [c1,c2,c3,c4] = row.querySelectorAll(".col");
    const tbody = document.querySelector('.tbody');
    for(const {id,name,sex,age} of array) { // 使用for of解构数组对象
        c1.textContent = id;
        c2.textContent = name;
        c3.textContent = sex;
        c4.textContent = age;
        // 复制元素
        const newRow = document.importNode(row, true);
        // 建立父子关系，左边父，右边子，即将内容添加到tbody
        tbody.appendChild(newRow);
    }
</script>
```



## Java实现同步异步⭐

### 异步方式

```java
// 异步方式
static void async() {
    LoggerUtil.get().debug("之前...");
    CompletableFuture.supplyAsync(() -> {
        LoggerUtil.get().debug("开始计算");
        sleep2s();
        LoggerUtil.get().debug("结束计算");
        return "123";
    }, pool).thenAcceptAsync(result->LoggerUtil.get().debug(result), pool);

    LoggerUtil.get().debug("之后...");
}
```

### 同步方式

```java
// 同步方式
static void sync() throws InterruptedException, ExecutionException {
    LoggerUtil.get().debug("之前...");
    String result = CompletableFuture.supplyAsync(() -> {
        LoggerUtil.get().debug("开始计算");
        sleep2s();
        LoggerUtil.get().debug("结束计算");
        return "123";
    }, pool).get(); // 直接用get接收结果就是同步

    LoggerUtil.get().debug(result);
    LoggerUtil.get().debug("之后...");
}
```

> sleep2s

```java
static void sleep2s() {
    try {
        Thread.sleep(2000);
    } catch (InterruptedException e) {
        throw new RuntimeException(e);
    }
}
```

### 调用执行结果

```java
static ExecutorService pool = Executors.newFixedThreadPool(2);

public static void main(String[] args) throws Exception {
    async();
    // sync();
}
```

async异步结果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211102158126.png" alt="image-20221110215804992" style="zoom:80%;" />

sync同步结果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211102159328.png" alt="image-20221110215921191" style="zoom:80%;" />



## Fetch API

> Fetch API 可以用来获取远程数据，它有两种方式接收结果，同步方式与异步方式
>

### 基本语法

```js
fetch(url, options) // 返回 Promise
```

同步方式

```js
const 结果 = await Promise
// 后续代码
```

> * await 关键字必须在一个标记了 async 的 function 内来使用
> * 后续代码不会在结果返回前执行

异步方式：后续代码不必等待结果返回就可以执行

```js
Promise
	.then(结果 => { ... })
// 后续代码                 
```

### 同步方式案例

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211102144553.png" alt="image-20221110214427424" style="zoom:80%;" />

> 在 根目录创建 **students.json** 文件
>

```json
[
    { "id": 1, "name": "张三", "sex": "男", "age": 18 },
    { "id": 2, "name": "李四", "sex": "女", "age": 17 }
]
```

现在用 fetch api 获取这些数据，并展示

```html
<div>
    <div class="title">学生列表</div>
    <div class="thead">
        <div class="row bold">
            <div class="col">编号</div>
            <div class="col">姓名</div>
            <div class="col">性别</div>
            <div class="col">年龄</div>
        </div>
    </div>
    <div class="tbody">
    </div>
</div>
<!-- 数据主要在这展示 -->
<template id="tp">
    <div class="row">
        <div class="col">xx</div>
        <div class="col">xx</div>
        <div class="col">xx</div>
        <div class="col">xx</div>
    </div>
</template>
```

```html
<script>
    // await必须搭配async使用
    async function findStudents() {
        try {
            // 获取响应对象
            const resp = await fetch('students.json')

            // 获取响应体, 按json格式转换为js数组
            const array = await resp.json();

            // 显示数据
            const tp = document.getElementById("tp");
            const row = tp.content;
            const [c1,c2,c3,c4] = row.querySelectorAll(".col");
            const tbody = document.querySelector('.tbody');
            for(const {id,name,sex,age} of array) {
                c1.textContent = id;
                c2.textContent = name;
                c3.textContent = sex;
                c4.textContent = age;
                // 复制元素
                const newRow = document.importNode(row, true);
                // 建立父子关系
                tbody.appendChild(newRow);
            }
        } catch (e) {
            console.log(e);
        }

    }
    findStudents()
</script>
```

* fetch('students.json') 内部会发送请求，但响应结果不能立刻返回，因此 await 就是等待响应结果返回
* 其中 resp.json() 也不是立刻能返回结果，它返回的也是 Promise 对象，也要配合 await 取结果

### 异步方式案例

```html
<script>
    fetch('students.json')
        .then( resp => resp.json() )
        .then( array => {
        	// 显示数据
            const tp = document.getElementById("tp");
            const row = tp.content;
            const [c1,c2,c3,c4] = row.querySelectorAll(".col");
            const tbody = document.querySelector('.tbody');
            for(const {id,name,sex,age} of array) {
                c1.textContent = id;
                c2.textContent = name;
                c3.textContent = sex;
                c4.textContent = age;
                // 复制元素
                const newRow = document.importNode(row, true);
                // 建立父子关系
                tbody.appendChild(newRow);
            }
        })
        .catch( e => console.log(e) )

</script>
```

> * 第一个 then 是在响应返回后，才会调用它里面的箭头函数，箭头函数参数即 resp  响应对象
> * 第二个 then 是在 json 解析完成后，才会调用它里面的箭头函数，箭头函数参数即解析结果（本例是 array 数组）
> * 上一个 then 返回的是 Promise 对象时，才能链式调用下一个 then



## 跨域问题

### 不同源问题

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211102209396.png" alt="image-20221110220900249" style="zoom:80%;" />

> 只要协议、主机、端口之一不同，就不同源，例如


同源检查是浏览器的行为，而且只针对 fetch、xhr 请求

> * 如果是其它客户端，例如 java http client，postman，它们是不做同源检查的
> * 通过表单提交、浏览器直接输入 url 地址这些方式发送的请求，也不会做同源检查

更多相关知识请参考[跨源资源共享（CORS） - HTTP | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)

### 请求响应头解决

> fetch 请求跨域，会携带一个 Origin 头，代表【发请求的资源源自何处】，目标通过它就能辨别是否发生跨域，我们的例子中：student.html 发送 fetch 请求，告诉 tomcat，我源自 localhost:7070
>

> 目标资源通过返回 Access-Control-Allow-Origin 头，告诉浏览器【允许哪些源使用此响应】
>

> 我们的例子中：tomcat 返回 fetch 响应，告诉浏览器，这个响应允许源自 localhost:7070 的资源使用

### 代理解决

```cmd
npm install http-proxy-middleware --save-dev
```

> 在 express 服务器启动代码中加入
>

```js
import {createProxyMiddleware} from 'http-proxy-middleware'

// ...
app.use('/api', createProxyMiddleware({target: ':8080', 
                                       changeOrigin: true }));
```

> fetch 代码改为
>

```js
const resp = await fetch(':7070/api/students')
```

> 或
>

```js
const resp = await fetch('/api/students')
```



# 模块化

> 模块之间相互引用的话，就需要导入导出

## 单个导出 const、let、function

> 只需要在对应的变量或者函数前面加上export即可

```js
export const a = 10;
export let b = 20;
export function c() {
    console.log('c');
}
```

> 1.html中导入

```js
<script>
  import {a, b, c} from './1.js'

  console.log(a, b, c)
</script>
```

## 全部导出

```js
const a = 10;
let b = 20;
function c() {
    console.log('c')
}

export {a,b,c}
```

> 导入方式同上

## 导出 default，只能有一个

> 注意：一个JS文件中只能有一个export default

```js
export const a = 10;
export let b = 20;
export function c() {
    console.log('c')
}

export default b;
```

> 导入默认值时，就不用加上{}了

```js
<script>
  import b from './1.js'

  console.log(b)
</script>
```



## 导入语法

```html
<script type="module">
	import 语句
</script>
```

> import 需要遵循同源策略
>

### 整个导入

```js
import * as module from '/1.js' // import * as module 必须起别名
console.log(module.a)		// 输出10
console.log(module.b)		// 输出20
module.c()					// 输出c
```

### 单个导入

```js
import {a,c} from '/1.js'
console.log(a)				// 输出10
c()							// 输出c
```

### 导入默认

```js
import x from '/1.js'
console.log(x)				// 输出20
```















































