



# 计算机基础

## 计算机先驱

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303202010854.png" alt="image-20230320201004776" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303202010640.png" alt="image-20230320201016568" style="zoom:80%;" />

## 学习路线

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303211623837.png" alt="image-20230321162322638" style="zoom:80%;" />

## 计算机基础知识

> 计算机称电脑，是现代一种用于高速计算的电子计算机器，可以进行数值计算、逻辑计算，还具有存储记忆功能

> 计算机由 硬件 + 软件组成：硬件：看得见摸得着的物理部件。软件：可以指挥硬件工作的指令。

> 软件分类：系统软件：Windows、Linux、Android、Harmony 等。应用软件：微信、QQ、王者荣耀、PhotoShop等

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303202012619.png" alt="image-20230320201228506" style="zoom:80%;" />

## C/S架构与B/S架构

上面提到的应用软件，又分为两大类：

> C/S架构，特点：需要安装、偶尔更新、不跨平台、开发更具针对性。
>
> B/S架构，特点：无需安装、无需更新、可跨平台、开发更具通用性。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303211634670.png" alt="image-20230321163424553" style="zoom:80%;" />

> 名词解释：C => client（客户端）、B => browser（浏览器）、S => server（服务器）。服务器 ：为软件提供数据的设备（在背后默默的付出）。

> 前端工程师，主要负责编写 B/S架构中的网页（呈现界面、实现交互）。
>
> 备注：大前端时代，我们可以用前端的技术栈，做出一个C/S架构的应用、甚至搭建一个服务器😎

## 浏览器相关知识

> 浏览器是网页运行的平台，常见浏览器有： 谷歌(Chrome) 、Safari 、IE 、火狐(Firefox) 、欧朋(Opera) 等

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303211636346.png" alt="image-20230321163625274"  />

### 浏览器市场份额

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303202014318.png" alt="image-20230320201434166" style="zoom:80%;" />

### 浏览器内核

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303211641918.png" alt="image-20230321164113796" style="zoom:80%;" />

### 常见内核

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303202015313.png" alt="image-20230320201522224" style="zoom:80%;" />

### 多核浏览器

> 多核浏览器就是多个内核

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303211643468.png" alt="image-20230321164302397" style="zoom:80%;" />

## 网页概念

> 网址：我们在浏览器中输入的地址。
>
> 网页：浏览器所呈现的每一个页面。
>
> 网站：多个网页构成了一个网站。

### 网站

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303211646056.png" alt="image-20230321164601941" style="zoom:80%;" />

### 网页标准

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303202016567.png" alt="image-20230320201617429" style="zoom:80%;" />

## 相关国际组织

### IETF

> 全称：Internet Engineering Task Force（国际互联网工程任务组），成立于1985年底，是一个权威的互联网技术标准化组织，主要负责互联网相关技术规范的研发和制定，当前绝大多数国际互联网技术标准均出自IETF。
>
> 官网： https://www.ietf.org

### W3C

> 全称：World Wide Web Consortium（万维网联盟），创建于1994年，是目前Web技术领域，最具影响力的技术标准机构。共计发布了200多项技术标准和实施指南，对互联网技术的发展和应用起到了基础性和根本性的支撑作用，官网： https://www.w3.org

### WHATWF

> 全称：Web Hypertext Application Technology Working Group（网页超文本应用技术工作小组）成立于2004年，是一个以推动网络HTML 5 标准为目的而成立的组织。由Opera、Mozilla基金会、苹果，等这些浏览器厂商组成。官网： https://whatwg.org/

## HTML 发展历史

从 HTML 1.0 开始发展，期间经历了很多版本，目前HTML的最新标准是：HMTL 5，具体发展史如图（了解即可）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303202018357.png" alt="image-20230320201844258" style="zoom:80%;" />

## 开发者文档⭐

经常查阅文档是一个非常好的学习习惯。

> W3C :  http://www.w3school.com.cn/
>
> MDN: https://developer.mozilla.org/zh-CN/
>
> W3School： www.w3school.com.cn

# HTML 初识

## HTML 作用

> - HTML 指的是超文本标记语言 (**H**yper **T**ext **M**arkup **L**anguage)是用来描述网页的一种语言。
> - HTML 不是一种编程语言，而是一种标记语言 (markup language)
> - 标记语言是一套标记标签 (markup tag)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303211653607.png" alt="image-20230321165353536" style="zoom:80%;" />

**pink老师 一句话说出html作用:**

> 网页是由网页元素组成的 ， 这些元素是利用html标签描述出来，然后通过浏览器解析，就可以显示给用户了

**所谓超文本，有2层含义：** 

> 1. 因为它可以加入图片、声音、动画、多媒体等内容（**超越文本限制 **）
> 2. 不仅如此，它还可以从一个文件跳转到另一个文件，与世界各地主机的文件连接（**超级链接文本 **）。

```html
<img src="timg.jpg" />
```

**html 总结:**

> * html 是超文本标记(标签)语言
> * 我们学习html 主要学习html标签
> * 我们用html标签描述网页元素。 比如 图片标签 、文字标签、链接标签等等
> * 标签有自己的语法规范，所有的html标签都是用 <> 表示的
> * H（很）T（甜）M（蜜）L（啦） 是很快乐的一件事情

## HTML基本结构

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303211932426.png" alt="image-20230321193212297" style="zoom:80%;" />

### HTML 基本骨架

HTML 有自己的语言语法骨架格式：（要遵循，要专业） 要求务必非常流畅的默写下来。

webstorm中输入!，然后按tab键即可生成完整骨架

```html
<html>   
    <head>     
        <title></title>
    </head>
    <body>
    </body>
</html>
```

| 标签名             |    定义    | 说明                                                    |
| ------------------ | :--------: | :------------------------------------------------------ |
| \<html>\</html>    |  HTML标签  | 页面中最大的标签，我们成为  根标签                      |
| \<head>\</head>    | 文档的头部 | 注意在head标签中我们必须要设置的标签是title             |
| \<titile>\</title> | 文档的标题 | 让页面拥有一个属于自己的网页标题                        |
| \<body>\</body>    | 文档的主体 | 元素包含文档的所有内容，页面内容 基本都是放到body里面的 |

### 团队约定大小写

HTML标签名、类名、标签属性和大部分属性值统一用小写

推荐：

```html
<head>     
   <title>我的第一个页面</title>
</head>
```

不推荐：

```html
<HEAD>     
   <TITLE>我的第一个页面</TITLE>
</HEAD>
```

## HTML元素标签分类

> 在HTML页面中，带有“< >”符号的元素被称为HTML标签，如上面提到的 &lt;html&gt;、&lt;head&gt;、&lt;body&gt;都是HTML骨架结构标签。
>

### 常规元素（双标签）

```html
<标签名> 内容 </标签名>   比如 <body>  我是文字  </body>
```

> * 该语法中“<标签名>”表示该标签的作用开始，一般称为“开始标签（start tag）”，“</标签名>” 表示该标签的作用结束，一般称为“结束标签（end tag）”。
> * 和开始标签相比，结束标签只是在前面加了一个关闭符“/”。
> * 我们以后接触的基本都是双标签

### 空元素（单标签）

```html
<标签名 />  比如  <br />
```

> * 空元素 用单标签来表示， 简单点说，就是里面不需要包含内容， 只有一个开始标签不需要关闭。
> * 这种单身狗标签非常少，一共没多少，我们多记忆就好

**pink老师 一句话说出他们:**

> 世界上单身狗毕竟是少数的， 大部分还是喜欢成双成对，不要拉下你的另外一半，对待一个双标签要有始有终。

## HTML标签关系

主要针对于**双标签** 的相互关系分为两种：  请大家务必熟悉记住这种标签关系，因为后面我们标签嵌套特别多，很容易弄混他们的关系。

### 嵌套关系

```html
<head>  
	<title> </title> 
</head>
```

### 并列关系

```html
<head></head><body></body>
```

> 倡议：**如果两个标签之间的关系是嵌套关系，子元素最好缩进一个tab键的身位（一个tab是4个空格）。如果是并列关系，最好上下对齐。**html双标签 可以分为  有 一种是 父子级 包含关系的标签，一种是 兄弟级 并列关系的标签

## 标签属性

所谓属性就是**外在特性**  比如 手机的颜色 手机的尺寸 ，总结就是手机的。。

> - 手机的颜色是黑色   
> - 手机的尺寸是 8寸 
> - 水平线的长度是 200  
> - 图片的宽度 是  300    

使用HTML制作网页时，如果想让HTML标签提供更多的信息，可以使用HTML标签的属性加以设置。

```html
<标签名 属性1="属性值1" 属性2="属性值2" …> 内容 </标签名>
<手机 颜色="红色" 大小="5寸">  </手机>
```

> 1. 标签可以拥有多个属性，必须写在开始标签中，位于标签名后面。
> 2. 属性之间不分先后顺序，标签名与属性、属性与属性之间均以空格分开。
> 3. 采取  键值对 的格式   key="value"  的格式

## 代码开发工具

- 为了提高我们的开发效率

- 减少代码的出错我们不提倡用记事本开发，我们有更好的犀利哥。

  <img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/s.png" />

## 文档声明

作用：告诉浏览器当前网页的版本。注意：文档声明，必须在网页的第一行，且在html 标签的外侧。

```html
<!DOCTYPE html>
或
<!DOCTYPE HTML>
或
<!doctype html>
```

## 页面语言

简单来说，可能对于程序来说没有太大的作用，但是它可以告诉浏览器，搜索引擎，一些处理Html的程序对页面语言内容来做一些对应的处理或者事情。最常见的2个：`en`定义语言为英语，`zh-CN`定义语言为中文

[HTML ISO 国家/地区代码参考手册](https://www.w3school.com.cn/tags/html_ref_country_codes.asp)

~~~html
<html lang="en">  指定html 语言种类,考虑浏览器和操作系统的兼容性，目前仍然使用 zh-CN 属性值
~~~

> - 根据根据lang属性来设定不同语言的css样式，或者字体
> - 告诉搜索引擎做精确的识别
> - 让语法检查程序做语言识别
> - 帮助翻译工具做识别
> - 帮助网页阅读程序做识别

## 字符编码

> 计算机对数据的操作：存储时，对数据进行：编码。读取时，对数据进行：解码。
>
> 编码、解码，会遵循一定的规范 —— 字符集。字符集有很多中，常见的有（了解）：

### 常见字符编码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303211949881.png" alt="image-20230321194917788" style="zoom:80%;" />

### 使用原则

> 原则1：存储时，务必采用合适的字符编码 。否则：无法存储，数据会丢失！
>
> 原则2：存储时采用哪种方式编码 ，读取时就采用哪种方式解码。否则：数据错乱（乱码）！

> 例如文字中，包含有：中文、英文、泰文、缅甸文。若使用 ISO8859-1 编码存储，在存入的那一刻，就出问题了，因为ISO8859-1 仅支持英文！为保证所有的输入，都能正常存储和读取，现在几乎全都采用： UFT-8 编码。所以我们编写html 文件时，也都统一用UFT-8 编码。

```html
<head>
    <!-- 一般情况下统一使用 "UTF-8" 编码, 请尽量统一写成标准的 "UTF-8"，
         不要写成 "utf-8" 或 "utf8" 或 "UTF8" -->
	<meta charset="UTF-8"/>
</head>
```

## 标准结构

> 输入! ，随后回车即可快速生成标准结构。生成的结构中，有两个meta标签，我们暂时用不到，可以先删掉。配置VScode 的内置插件emmet ，可以对生成结构的属性进行定制。在存放代码的文件夹中，存放一个favicon.ico 图片，可配置网站图标。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <input type="text">
</body>
</html>
```

## 注释

> 在HTML中还有一种特殊的标签——注释标签。如果需要在HTML文档中添加一些便于阅读和理解但又不需要显示在页面中的注释文字，就需要使用注释标签。

```html
<!-- 注释语句 -->     快捷键是：    ctrl + /       或者 ctrl +shift + / 
```

```html
<body>
    <marquee loop="1">
        尚硅谷
        <!-- 下面的输入框是可以滚动的，
             且只能滚动一次，注释可以换行
             <!-- 注释是不能嵌套的，这样就不行 -->
             -->
        <input type="text">
    </marquee>
    <!-- 下面的输入框是不可以滚动的 -->
    <!-- <input type="text"> -->
</body>
```

> 注释是给人看的，目的是为了更好的解释这部分代码是干啥的， 程序是不执行这个代码的

## 路径⭐

### 相对路径

> 以引用文件之网页所在位置为参考基础，而建立出的目录路径。因此，当保存于不同目录的网页引用同一个文件时，所使用的路径将不相同，故称之为相对路径。相对路径，是从代码所在的这个文件出发， 去寻找我们的目标文件的，而 我们所说的 上一级 下一级 同一级  简单说，就是 图片 位于 HTML 页面的位置

#### 同级目录

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211292102205.png" alt="image-20221129210227121" style="zoom:80%;" />

#### 下级路径

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211292121950.png" alt="image-20221129212121861" style="zoom:80%;" />

#### 上级目录

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211292121464.png" alt="image-20221129212154380" style="zoom:80%;" />

### 绝对路径

> 绝对路径以Web站点根目录为参考基础的目录路径。之所以称为绝对，意指当所有网页引用同一个文件时，所使用的路径都是一样的。

> 盘符开头：D:\day01\images\1.jpg，完整地址：https://www.itcast.cn/2018czgw/images/logo.gif（了解）
>

# 常用标签⭐

 首先 HTML和CSS是两种完全不同的语言，我们学的是结构，就只写HTML标签，认识标签就可以了。 不会再给结构标签指定样式了。HTML标签有很多，这里我们学习最为常用的，后面有些较少用的，我们可以查下手册就可以了。 

## 排版标签

> 排版标签主要和css搭配使用，显示网页结构的标签，是网页布局最常用的标签。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303202044750.png" alt="image-20230320204432682" style="zoom:80%;" />

> 1. h1 最好写一个， h2~h6 能适当多写。
> 2. h1~h6 不能互相嵌套，例如： h1 标签中最好不要写h2 标签了。
> 3. p 标签很特殊！它里面不能有： h1~h6 、p 、div 标签（暂时先这样记，后面会说规律）。

### 标题标签h

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211292031085.png" alt="image-20221129203138987" style="zoom:80%;" />

### 段落标签p

> 单词缩写：  paragraph  段落  [ˈpærəgræf]    无须记这个单词。可以把 HTML 文档分割为若干段落，在网页中要把文字有条理地显示出来，离不开段落标签，就如同我们平常写文章一样，整个网页也可以分为若干个段落，而段落的标签就是p
>

```html
<p>  文本内容  </p>
```

> 是HTML文档中最常见的标签，默认情况下，文本在一个段落中会根据浏览器窗口的大小自动换行。
>

### 水平线标签hr

> 单词缩写：  horizontal  横线 在网页中常常看到一些水平线将段落与段落之间隔开，使得文档结构清晰，层次分明。这些水平线可以通过插入图片实现，也可以简单地通过标签来完成，\<hr />就是创建横跨网页水平线的标签
>

```html
<hr />是单标签
```

###  换行标签br 

> 在HTML中，一个段落中的文字会从左到右依次排列，直到浏览器窗口的右端，然后自动换行。如果希望某段文本强制换行显示，就需要使用换行标签。这时如果还像在word中直接敲回车键换行就不起作用了。
>

```html
<br />
```

### 布局标签div和span

> div   span    是没有语义的     是我们网页布局主要的2个盒子   想必你听过  css+div
>
> div 就是  division  的缩写   分割， 分区的意思  其实有很多div 来组合网页。
>
> span   跨度，跨距；范围    

```html
<div> 这是头部 </div>    <span>今日价格</span>
```

他们两个都是盒子，用来装我们网页元素的， 只不过他们有区别，现在我们主要记住使用方法和特点就好了

> * div标签  用来布局的，但是现在一行只能放一个div
> * span标签  用来布局的，一行上可以放好多个span

> 块级元素：独占一行（排版标签都是块级元素）
>
> 行内元素：不独占一行

> 块级元素 中能写 行内元素 和 块级元素（简单记：块级元素中几乎什么都能写）。
>
> 行内元素 中能写 行内元素，但不能写 块级元素。注意：h1~h6 不能互相嵌套。p 中不要写块级元素。

### 排版标签总结

| 标签名          | 定义       | 说明                                  |
| --------------- | :--------- | :------------------------------------ |
| \<hx>\</hx>     | 标题标签   | 作为标题使用，并且依据重要性递减      |
| \<p>\</p>       | 段落标签   | 可以把 HTML 文档分割为若干段落        |
| \<hr />         | 水平线标签 | 没啥可说的，就是一条线                |
| \<br />         | 换行标签   |                                       |
| \<div>\</div>   | div标签    | 用来布局的，但是现在一行只能放一个div |
| \<span>\</span> | span标签   | 用来布局的，一行上可以放好多个span    |

## 文本标签

> 在网页中，有时需要为文字设置粗体、斜体或下划线效果，这时就需要用到HTML中的文本格式化标签，使文字以特殊的方式显示。推荐使用后面的表格，语义更强烈：strong，em等

### 常用文本标签

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211292034751.png" alt="image-20221129203403680" style="zoom:80%;" />

> 请同学们重点记住 前两组   加粗 和 倾斜   后面两组没记住回来查

```html
<body>
    <p>预防电信诈骗，请安装：<em>国家反诈中心app</em>。</p>
    <p>你好啊，<ins>嘿嘿嘿，骗你哒</ins></p>
    <p>当我们出门的时候，一定要<strong>关好门窗</strong>！</p>
    <p>前端三个框架为：<span style="color: #0a58ca">Angular、React、Vue</span></p>
</body>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303212034897.png" alt="image-20230321203429845" style="zoom:80%;" />

### 不常用文本标签

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303212039511.png" alt="image-20230321203909422" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303212039365.png" alt="image-20230321203924302" style="zoom:80%;" />

> 这些不常用的文本标签，编码时不用过于纠结（酌情而定，不用也没毛病）。
>
> blockquote 与 address 是块级元素，其他的文本标签，都是行内元素。
>
> 有些语义感不强的标签，我们很少使用，例如：small 、b 、u 、q 、blockquote
>
> HTML标签太多了！记住那些：重要的、语义感强的标签即可：h1~h6 、p 、div 、em 、strong 、span

## 图像标签⭐

### 标签属性和用法

> 要想在网页中显示图像就需要使用图像标签（它是一个单身狗）
>

```html
<!-- alt : 替换文本, 当图片不显示的时候显示的文字 -->
<!-- width和height属性只需要给出一个值, 另一个等比例缩放 -- 好处就是图片不变形 -->
<img src="cat.gif" 
     alt="这是一只猫" 
     title="这是title文字, 鼠标悬停的时候显示" 
     width="200px" 
     height="800px">
```

> 该语法中src属性用于指定图像文件的路径和文件名，他是img标签的必需属性。还有border属性，border = 数字 后面我们会用css来做，这里童鞋们就记住这个border 单词就好了
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211292042954.png" alt="image-20221129204243882" style="zoom:80%;" />

### 图片防变形

> 如果只设置width或height中的一个，另一个没设置的会自动等比例缩放（此时图片不会变形）
>
> 如果同时设置了width和height两个，若设置不当此时图片可能会变形

```html
<!-- alt : 替换文本, 当图片不显示的时候显示的文字 -->
<!-- width和height属性只需要给出一个值, 另一个等比例缩放 -- 好处就是图片不变形 -->
<img src="cat.gif" alt="这是一只猫" width="200px" height="350px">
```

给了图片宽和高，可以看到，图片变形的很厉害

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211292047656.png" alt="image-20221129204713505" style="zoom: 33%;" />

只给图片一个属性，看图片变化，变得正常了，没有被拉伸

```html
<!-- width和height属性只需要给出一个值, 另一个等比例缩放 -- 好处就是图片不变形 -->
<img src="cat.gif" alt="这是一只猫" width="200px">
<img src="cat.gif" alt="这是一只猫" height="200px">
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211292049247.png" alt="image-20221129204917067" style="zoom:80%;" />

### 常见图片格式

#### jpg 格式

> 概述：扩展名为.jpg 或 .jpeg ，是一种有损的压缩格式（把肉眼不容易观察出来的细节丢弃了）
>
> 主要特点：支持的颜色丰富、占用空间较小、不支持透明背景、不支持动态图。
>
> 使用场景：对图片细节没有极高要求的场景，例如：网站的产品宣传图等 。—— 该格式网页中很常见。

#### png 格式

> 概述：扩展名为.png ，是一种无损的压缩格式，能够更高质量的保存图片。
>
> 主要特点：支持的颜色丰富、占用空间略大、支持透明背景、不支持动态图。
>
> 使用场景：①想让图片有透明背景；②想更高质量的呈现图片；例如 ：公司logo图、重要配图等。

#### bmp 格式

> 概述：扩展名为.bmp ，不进行压缩的一种格式，在最大程度上保留图片更多的细节。
>
> 主要特点：支持的颜色丰富、保留的细节更多、占用空间极大、不支持透明背景、不支持动态图。
>
> 使用场景：对图片细节要求极高的场景，例如：一些大型游戏中的图片 。（网页中很少使用）

#### gif 格式

> 概述：扩展名为.gif ，仅支持256种颜色，色彩呈现不是很完整。
>
> 主要特点：支持的颜色较少、支持简单透明背景、支持动态图。
>
> 使用场景：网页中的动态图片。

#### webp 格式

> 概述：扩展名为.webp ，谷歌推出的一种格式，专门用来在网页中呈现图片。
>
> 主要特点：具备上述几种格式的优点，但兼容性不太好，一旦使用务必要解决兼容性问题。
>
> 使用场景：网页中的各种图片。

#### base64 格式

> 本质：一串特殊的文本，要通过浏览器打开，传统看图应用通常无法打开。
>
> 原理：把图片进行base64 编码，形成一串文本。
>
> 如何生成：靠一些工具或网站。
>
> 如何使用：直接作为img 标签的src 属性的值即可，并且不受文件位置的影响。
>
> 使用场景：一些较小的图片，或者需要和网页一起加载的图片。

## 超链接标签

> 主要作用：从当前页面进行跳转。可以实现：**①跳转到指定页面、②跳转到指定文件（也可触发下载）、③跳转到锚点位置、④唤起指定应用**

### 基本语法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303212114017.png" alt="image-20230321211441950" style="zoom:80%;" />

```html
<a href="跳转目标" target="目标窗口的弹出方式">文本或图像</a>
```

### 跳转到页面

> 1. 代码中的多个空格、多个回车，都会被浏览器解析成一个空格！
> 2. 虽然a 是行内元素，但a 元素可以包裹除它自身外的任何元素！

```html
<!-- 跳转其他网页 -->
<a href="https://www.jd.com/" target="_blank">去京东</a>
<!-- 跳转本地网页 -->
<a href="./10_HTML排版标签.html" target="_self">去看排版标签</a>
```

### 跳转到文件

> 注意1：若浏览器无法打开文件，则会引导用户下载。
>
> 注意2：若想强制触发下载，请使用download 属性，属性值即为下载文件的名称。

```html
<!-- 浏览器能直接打开的文件 -->
<a href="./resource/自拍.jpg">看自拍</a>
<a href="./resource/小电影.mp4">看小电影</a>
<a href="./resource/小姐姐.gif">看小姐姐</a>
<a href="./resource/如何一夜暴富.pdf">点我一夜暴富</a>
<!-- 浏览器不能打开的文件，会自动触发下载 -->
<a href="./resource/内部资源.zip">内部资源</a>
<!-- 强制触发下载 -->
<a href="./resource/小电影.mp4" download="电影片段.mp4">下载电影</a>
```

### 跳转到锚点

第一步：设置锚点

```html
<!-- 第一种方式：a标签配合name属性 -->
<a name="test1"></a>
<!-- 第二种方式：其他标签配合id属性 -->
<h2 id="test2">我是一个位置</h2>
```

注意点：

> 1. 具有 href 属性的 a 标签是超链接，具有 name 属性的 a 标签是锚点。
> 2. name 和id 都是区分大小写的，且id 最好别是数字开头。

第二步：跳转锚点

```html
<!-- 跳转到test1锚点-->
<a href="#test1">去test1锚点</a>
<!-- 跳到本页面顶部 -->
<a href="#">回到顶部</a>
<!-- 跳转到其他页面锚点 -->
<a href="demo.html#test1">去demo.html页面的test1锚点</a>
<!-- 刷新本页面 -->
<a href="">刷新本页面</a>
<!-- 执行一段js,如果还不知道执行什么，可以留空，javascript:; -->
<a href="javascript:alert(1);">点我弹窗</a>
```

使用实例

```html
<body>
    <a href="#htl">看灰太狼</a>
    <a href="#atm">看奥特曼</a>

    <p>我是一只羊，一只很肥美的羊</p>
    <img src="./path_test/a/喜羊羊.jpg" alt="喜羊羊">

    <a name="htl"></a>
    <p>我是一只狼，一只很邪恶的狼</p>
    <img src="./path_test/a/b/灰太狼.jpg" alt="灰太狼">

    <p id="atm">我是一只奥特曼，一只很能打的奥特曼</p>
    <img src="./奥特曼.jpg" alt="奥特曼">

    <p>我是一只怪兽，一只很丑的怪兽</p>
    <img src="./path_test/怪兽.jpg" alt="怪兽">

    <p>整体的介绍完毕了</p>
    <a href="#">回到顶部</a>
    <a href="">刷新页面</a>
    <a href="javascript:;">点我弹窗</a>
</body>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303212125044.png" alt="image-20230321212502913" style="zoom:80%;" />

### 唤起指定应用

通过a 标签，可以唤起设备应用程序

```html
<!-- 唤起设备拨号 -->
<a href="tel:10010">电话联系</a>
<!-- 唤起设备发送邮件 -->
<a href="mailto:10010@qq.com">邮件联系</a>
<!-- 唤起设备发送短信 -->
<a href="sms:10086">短信联系</a>
```

将页面变成二维码，然后手机进行上面测试，即可

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303212127489.png" alt="image-20230321212749416" style="zoom:80%;" />

## 音视频标签

### 音频标签

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303222117629.png" alt="image-20230322211745536" style="zoom:80%;" />

```css
<style>
    audio {
        width: 600px;
        /* height: 500px; */
        border: 1px solid black;
    }
</style>
```

```html
<body>
    <audio src="./小曲.mp3" controls loop preload="metadata"></audio>
</body>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303222120981.png" alt="image-20230322212022909" style="zoom:80%;" />

### 视频标签

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303222117436.png" alt="image-20230322211711337" style="zoom:80%;" />

```css
<style>
    video {
        width: 600px;
    }
</style>
```

```html
<body>
    <!-- 谷歌浏览器可以让视频自动播放, 但是必须是静音状态muted -->
    <video src="./小电影.mp4" controls muted loop poster="./封面.png" preload="auto"></video>
</body>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303222119026.png" alt="image-20230322211906943" style="zoom:80%;" />

### 音频案例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>03_音频案例</title>
    <style>
        audio {
            width: 600px;
        }
        .mask {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.727);
        }
        .dialog {
            position: absolute;
            width: 400px;
            height: 400px;
            background-color: green;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            font-size: 40px;
            text-align: center;
            line-height: 400px;
        }
        span {
            border: 1px solid white;
            color: white;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <audio id="music" src="./小曲.mp3" controls></audio>
    <div class="mask" id="mask">
        <div class="dialog">
            <span>点我登录</span>
            <span onclick="go()">随便听听</span>
        </div>
    </div>

    <script>
        function go (){
            music.play()
            mask.style.display = 'none'
        }
    </script>
</body>
</html>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303222129660.png" alt="image-20230322212941582" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303222129505.png" alt="image-20230322212954436" style="zoom:80%;" />

## 综合案例-招聘

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211292027577.png" alt="image-20221129202741331" style="zoom:80%;" />

```html
<body>
    <h1>腾讯科技高级web前端开发岗位</h1>
    <hr>
    <h2>职位描述</h2>
    <p>负责重点项目的前端技术方案和架构的研发和维护工作；</p>
    <h2>岗位要求</h2>
    <p>5年以上前端开发经验， <strong>精通html5/css3/javascript等</strong> web开发技术；</p>
    <p>熟悉bootstrap，vue，angularjs，reactjs等框架，熟练掌握一种以上；</p>
    <p>代码⻛格严谨，能⾼保真还原设计稿，能兼容各种浏览器；</p>
    <p>对web前端的性能优化以及web常见漏洞有一定的理解和相关实践；</p>
    <p>具备良好的分析解决问题能力，能独立承担任务，有开发进度把控能力；</p>
    <p>责任心强，思路路清晰，抗压能力好，具备良好的对外沟通和团队协作能力。</p>
    <h2>工作地址</h2>
    <p>上海市-徐汇区-腾云大厦</p>
    <img src="./images/map.jpg" alt="">
</body>
```



# 表格标签

> - 表格的现在还是较为常用的一种标签，但不是用来布局
> - **常见显示、展示表格式数据。**因为它可以让数据显示的非常的规整，可读性非常好。
> - **特别是后台展示数据的时候表格运用是否熟练就显得很重要**，
> - 一个清爽简约的表格能够把繁杂的数据表现得很有条理，虽然 div 布局也可以做到，但是没有表格方便

## 基本结构

### 完整结构

一个完整的表格由：**表格标题、表格头部、表格主体、表格脚注**，四部分组成

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303202048431.png" alt="image-20230320204806336" style="zoom:80%;" />

### 表格标签

> table：表格、caption：表格标题、thead：表格头部
>
> tbody ：表格主体、tfoot ：表格注脚、tr ：每一行
>
> th 、td ：每一个单元格（备注：表格头部中用th ，表格主体、表格脚注中用： td ）

## 创建表格

在HTML网页中，要想创建表格，就需要使用表格相关的标签。**创建表格的基本语法：**

```html
<table>
  <tr>
    <td>单元格内的文字</td>
    ...
  </tr>
  ...
</table>
```

要深刻体会表格、行、单元格他们的构成。

> 1. table用于定义一个表格标签。
>
> 2. tr标签 用于定义表格中的行，必须嵌套在 table标签中。
>
> 3. td 用于定义表格中的单元格，必须嵌套在<tr></tr>标签中。
>
> 4. 字母 td 指表格数据（table data），即数据单元格的内容，现在我们明白，表格最合适的地方就是用来存储数据

## 表格属性

表格有部分属性我们不常用，这里重点记住 cellspacing 、 cellpadding。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/tt.png" />

> 我们经常有个说法，是三参为0，  平时开发的我们这三个参数    border  cellpadding  cellspacing  为  0
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/07table%E8%A1%A8%E6%A0%BC%E5%B1%9E%E6%80%A7.jpg">

**案例实现**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/%E8%A1%A8%E6%A0%BC%E6%95%88%E6%9E%9C01.png">

>  cellspacing="0"是必须的，不然表格间会有间隙，非常难看

```html
<table width="500" height="300" border="1" cellpadding="20" cellspacing="0" align="center">
   <tr>  <th>姓名</th>   <th>性别</th> <th>年龄</th>  </tr>
   <tr>  <td>刘德华</td> <td>男</td> <td>55</td>  </tr>
   <tr>  <td>郭富城</td> <td>男</td> <td>52</td>  </tr>
   <tr>  <td>张学友</td> <td>男</td> <td>58</td>  </tr>
   <tr>  <td>黎明</td>   <td>男</td> <td>18</td>  </tr>
   <tr>  <td>刘晓庆</td> <td>女</td> <td>63</td>  </tr>
</table>
```

## 表头 & 脚注 & 对齐 &标题

### 表格划分结构

> 对于比较复杂的表格，表格的结构也就相对的复杂了，所以又将表格分割成三个部分：**题头、正文和脚注**。而这三部分分别用:thead,tbody,tfoot来标注， 这样更好的分清表格结构

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/thead.png" />

> 1. \<thead>\</thead>：用于定义表格的头部。用来放标题之类的东西。\<thead> 内部必须拥有 \<tr> 标签！
> 2. \<tbody>\</tbody>：用于定义表格的主体。放数据本体 。
> 3. \<tfoot>\</tfoot>放表格的脚注之类。
> 4. 以上标签都是放到table标签中。

### 表头th

作用：一般表头单元格位于表格的第一行或第一列，并且文本加粗居中

语法：只需用表头标签&lt;th&gt;</th&gt;替代相应的单元格标签&lt;td&gt;</td&gt;即可。 

 <img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/th.png" style="zoom: 80%;" />

```html
<table width="500" height="500" border="1" cellspacing="0" cellpadding="0">
  <!-- align：水平方向,left,right,center，valign：垂直方向：top,center,bottom -->
  <tr valign="bottom">
    <th>姓名</th>
    <th>性别</th>
    <th>电话</th>
  </tr>
  <tr align="center">
    <td>小王</td>
    <td>女</td>
    <td>110</td>
  </tr>
  <tr align="center">
    <td>小明</td>
    <td>男</td>
    <td>120</td>
  </tr>
</table>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303221435781.png" alt="image-20230322143512703" style="zoom:50%;" />

> th 也是一个单元格   只不过和普通的 td单元格不一样，它会让自己里面的文字居中且加粗

### 标题caption

**定义和用法**

```html
<table>
   <caption>我是表格标题</caption>
</table>
```

> 1. caption 元素定义**表格标题**，通常这个标题会被居中且显示于表格之上。
> 2. caption 标签**必须紧随 table 标签之后**。
> 3. 这个标签**只存在表格里面才有意义**。你是风儿我是沙

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/pa.png" />

### 完整案例

```html
<table border="1" align="center" width="500" height="500" cellspacing="0">
    <!-- 表格标题 -->
    <caption>学生信息</caption>
    <!-- 表格头部 -->
    <thead height="50" align="center" valign="middle">
        <tr>
            <th width="50" height="50" align="right" valign="bottom">姓名</th>
            <th>性别</th>
            <th>年龄</th>
            <th>民族</th>
            <th>政治面貌</th>
        </tr>
    </thead>
    <!-- 表格主体 -->
    <tbody height="200" align="center" valign="middle">
        <tr height="80" align="center" valign="middle">
            <td>张三</td>
            <td>男</td>
            <td>18</td>
            <td>汉族</td>
            <td>团员</td>
        </tr>
        <tr>
            <td align="right" valign="top">赵六</td>
            <td>女</td>
            <td>21</td>
            <td>壮族</td>
            <td>团员</td>
        </tr>
    </tbody>
    <!-- 表格脚注,colspan：跨列-->
    <tfoot height="50" align="center" valign="middle">
        <tr>
            <td colspan="5">共计：2人</td>
        </tr>
    </tfoot>
</table>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303221442724.png" alt="image-20230322144259662" style="zoom:80%;" />

## 合并单元格

合并单元格是我们比较常用的一个操作，但是不会合并的很复杂。

###  跨行 & 列合并

> * 跨行合并：rowspan="合并单元格的个数"      
> * 跨列合并：colspan="合并单元格的个数"

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/08table%E5%90%88%E5%B9%B6%E5%8D%95%E5%85%83%E6%A0%BC.jpg" style="zoom:80%;" >

### 合并单元格顺序

> **合并的顺序我们按照   先上 后下     先左  后右 的顺序 **，跟我们以前学习汉字的书写顺序完全一致。

> 1. 先确定是跨行还是跨列合并。根据先上后下先左 后右的原则找到目标单元格，然后写上合并方式还有要合并的单元格数量,比如 ： \<td colspan="3">   \</td>
> 3. 删除多余的单元格

### 案例演示

```html
<table border="1" width="400" height="300" cellspacing="0" cellpadding="20">
    <caption><strong>学生成绩单</strong></caption>
    <thead>
        <tr>
            <th>姓名</th>
            <th>成绩</th>
            <th>评语</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>张三</td>
            <td rowspan="2">100分</td>
            <td>真棒, 第一名</td>
        </tr>
        <tr>
            <td>李四</td>
            <td>真棒, 第二名</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>总结</td>
            <td colspan="2">郎才女貌</td>
        </tr>
    </tfoot>
</table>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211300935613.png" alt="image-20221130093517545" style="zoom:80%;" />

## 总结表格

| 标签名              | 定义           | 说明                                         |
| ------------------- | :------------- | :------------------------------------------- |
| <table></table>     | 表格标签       | 就是一个四方的盒子                           |
| <tr></tr>           | 表格行标签     | 行标签要再table标签内部才有意义              |
| <td></td>           | 单元格标签     | 单元格标签是个容器级元素，可以放任何东西     |
| <th></th>           | 表头单元格标签 | 它还是一个单元格，但是里面的文字会居中且加粗 |
| <caption></caption> | 表格标题标签   | 表格的标题，跟着表格一起走，和表格居中对齐   |
| clospan 和 rowspan  | 合并属性       | 用来合并单元格的                             |

1. 表格提供了HTML 中定义表格式数据的方法。
2. 表格中由行中的单元格组成。
3. 表格中没有列元素，列的个数取决于行的单元格个数。
4. 表格不要纠结于外观，那是CSS 的作用。
5. 表格的学习要求：  能手写表格结构，并且能简单合并单元格。

## 综合案例--学生信息表

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211301026014.png" alt="image-20221130102602938" style="zoom:80%;" />

```html
<table border="1" width="500" height="300" cellspacing="0">
    <caption><h3>优秀学生信息表格</h3></caption>
    <tr>
        <th>年级</th>
        <th>姓名</th>
        <th>学号</th>
        <th>班级</th>
    </tr>
    <tr>
        <td rowspan="2">高三</td>
        <td>迪丽热巴</td>
        <td>110</td>
        <td>三年二班</td>
    </tr>
    <tr>
        <td>古力娜扎</td>
        <td>120</td>
        <td>三年三班</td>
    </tr>
    <tr>
        <td>评语</td>
        <td colspan="3">你们很优秀</td>
    </tr>
</table>
```

# 列表标签（重点）

## 1、应用场景

前面我们知道表格一般用于数据展示的，但是网页中还是有很多跟表格类似的布局，如下图~~ 我们用什么做呢？

> - 场景：在网页中按照行展示关联性的内容，如：新闻列表、排行榜、账单等
> - 特点：按照行的方式，整齐显示内容
> - 种类：无序列表、有序列表、自定义列表

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211300914981.png" alt="image-20221130091436869" style="zoom:80%;" />

## 2、无序列表 ul （重点）

无序列表的各个列表项之间没有顺序级别之分，是并列的。其基本语法格式如下：

> ul标签中只允许嵌套li标签
>
> li标签中可以嵌套任意内容

```html
<ul>
  <li>列表项1</li>
  <li>列表项2</li>
  <li>列表项3</li>
  ......
</ul>
```

比如下面这些，新闻是没有顺序的，不用排队，先到先得，后发布先显示。

 <img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/ul.png" style="zoom:67%;" />

**脚下留心：**

```sh
 1. <ul></ul>中只能嵌套<li></li>，直接在<ul></ul>标签中输入其他标签或者文字的做法是不被允许的。
 2. <li>与</li>之间相当于一个容器，可以容纳所有元素。
 3. 无序列表会带有自己样式属性，放下那个样式，一会让CSS来！
```

## 3、有序列表 ol （了解）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/gold.png" style="zoom:67%;" />

有序列表即为有排列顺序的列表，其各个列表项按照一定的顺序排列定义，有序列表的基本语法格式如下：

```html
<ol>
  <li>列表项1</li>
  <li>列表项2</li>
  <li>列表项3</li>
  ......
</ol>
```

  所有特性基本与ul 一致。  但是实际中比 无序列表 用的少很多。

## 4、自定义列表（理解）

定义列表常用于对术语或名词进行解释和描述，定义列表的列表项前没有任何项目符号。其基本语法如下：

```html
<dl>
  <dt>名词1</dt>
  <dd>名词1解释1</dd>
  <dd>名词1解释2</dd>
  ...
  <dt>名词2</dt>
  <dd>名词2解释1</dd>
  <dd>名词2解释2</dd>
  ...
</dl>
```

 <img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/2.jpg" style="zoom: 50%;" /> 

用的还可以：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/mix.png" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/09%E8%87%AA%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8.jpg">

## 5、列表总结

> 无序列表最常用，有序列表偶尔用，自定义列表底部导航用

| 标签名      |     定义     | 说明                                                   |
| ----------- | :----------: | :----------------------------------------------------- |
| \<ul>\</ul> | **无序标签** | 里面只能包含li    没有顺序，我们以后布局中最常用的列表 |
| \<ol>\</ol> |   有序标签   | 里面只能包含li    有顺序， 使用情况较少                |
| \<dl>\</dl> |  自定义列表  | 里面有2个兄弟， dt 和 dd                               |

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211300919116.png" alt="image-20221130091954037" style="zoom:80%;" />

# 表单标签(掌握)

> 表单目的是为了收集用户信息。在我们网页中， 我们也需要跟用户进行交互，收集用户资料，此时也需要表单
>

> 在HTML中，一个完整的表单通常由表单控件（也称为表单元素）、提示信息和表单域3个部分构成。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211300939612.png" alt="image-20221130093918540" style="zoom:80%;" />

> **表单控件： **包含了具体的表单功能项，如单行文本输入框、密码输入框、复选框、提交按钮、重置按钮等
>
> **提示信息：**一个表单中通常还需要包含一些说明性的文字，提示用户进行填写和操作
>
> **表单域：**  他相当于一个容器，用来容纳所有的表单控件和提示信息，可以通过他定义处理表单数据所用程序的url地址，以及数据提交到服务器的方法。如果不定义表单域，表单中的数据就无法传送到后台服务器。

## 基本结构

> 收集的用户信息怎么传递给服务器？通过form表单域。在HTML中，form标签被用于定义表单域，以实现用户信息的收集和传递，form中的所有内容都会被提交给服务器。
>

```html
<form action="url地址" method="提交方式" name="表单名称">各种表单控件</form>
```

| 属性   | 属性值   | 作用                                               |
| ------ | :------- | -------------------------------------------------- |
| action | url地址  | 用于指定接收并处理表单数据的服务器程序的url地址。  |
| method | get/post | 用于设置表单数据的提交方式，其取值为get或post。    |
| name   | 名称     | 用于指定表单的名称，以区分同一个页面中的多个表单。 |

每个表单都应该有自己表单域。我们现在做页面，不写看不到效果，但是 如果后面学 ajax 后台交互的时候，必须需要 form表单域。

```html
<body>
    <!-- 调用百度搜索框搜索 -->
    <form action="https://www.baidu.com/s">
        <input type="text" name="wd">
        <button>去百度搜索</button>
    </form>
    <hr>
    <!-- 调用京东搜索框搜索 -->
    <form action="https://search.jd.com/search" target="_self" method="get">
        <input type="text" name="keyword">
        <button>去京东搜索</button>
    </form>
    <hr>
    <!-- 直接点击超链接跳转 -->
    <a href="https://search.jd.com/search?keyword=手机">搜索手机</a>
</body>
```



## input 控件⭐

### 基本语法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211300940652.png" alt="image-20221130094026551" style="zoom:80%;" />

```html
<input type="属性值" value="你好">
```

> - input 输入的意思 
> - <input /&gt;标签为单标签
> - type属性设置不同的属性值用来指定不同的控件类型
> - 除了type属性还有别的属性

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/input.png" style="zoom:67%;" />

### 文本框和密码框

* 这个属性通过改变值，可以决定了你属于那种input表单。
* 比如 type = 'text'  就表示 文本框 可以做 用户名， 昵称等。
* 比如 type = 'password'  就是表示密码框   用户输入的内容 是不可见的。

```html
<!-- 写什么就显示什么 -->
文本框: <input type="text" placeholder="请输入用户名">
<!-- 书写的内容都会变成点点显示 -->
密码框: <input type="password" placeholder="请输入密码">
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211300949160.png" alt="image-20221130094944097" style="zoom:80%;" />

### value & name

- value属性：用户输入的内容，提交之后会发送给后端服务器
- name属性：当前控件的含义，提交之后可以告诉后端发送过去的数据是什么含义
- 后端接收到数据的格式是：name的属性值 = value的属性值

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211300946582.png" alt="image-20221130094631475" style="zoom:80%;" />



### 单选框和复选框

表示默认选中状态。  较常见于 单选按钮和复选按钮。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211300950432.png" alt="image-20221130095038363" style="zoom:80%;" />

```html
<div style="width: 200px;height: 200px; margin: 20px auto;padding: 20px">
    
    性别:<input type="radio" name="sex" value="男" checked="checked" />男
    <input type="radio" name="sex" value="女" />女
    <br>
    
    爱好:<input type="checkbox" name="basket" value="打篮球" checked="checked" />打篮球
    <input type="checkbox" name="foot" value="踢足球" />踢足球
</div>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211300955769.png" alt="image-20221130095517709" style="zoom:80%;" />

### 文件选择

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211300957758.png" alt="image-20221130095746689" style="zoom: 80%;" />

```html
上传文件: <input type="file">

上传多个文件: <input type="file" multiple>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211300958911.png" alt="image-20221130095845852" style="zoom:80%;" />

### 按钮 & 提交 & 重置

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211301000631.png" alt="image-20221130100024545" style="zoom: 80%;" />

```html
<form action="">
    用户名: <input type="text">
    <br>
    <br>
    密码: <input type="password">
    <br>
    <br>
    <!-- 提交，重置，按钮 -->
    <input type="submit" value="免费注册">
    <input type="reset">
    <input type="button" value="普通按钮">
</form> 
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211301001325.png" alt="image-20221130100132263" style="zoom:80%;" />

### 隐藏域

> 用户不可见的一个输入区域，作用是： 提交表单的时候，携带一些固定的数据。
>
> name 属性：指定数据的名称。value 属性：指定的是真正提交的数据。

```html
<input type="hidden" name="tag" value="100">
```

### input 属性小结

| 属性    | 说明     | 作用                                                   |
| ------- | :------- | ------------------------------------------------------ |
| type    | 表单类型 | 用来指定不同的控件类型                                 |
| value   | 表单值   | 表单里面默认显示的文本                                 |
| name    | 表单名字 | 页面中的表单很多，name主要作用就是用于区别不同的表单。 |
| checked | 默认选中 | 表示那个单选或者复选按钮一开始就被选中了               |

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211301002360.png" alt="image-20221130100204276" style="zoom:80%;" />

### 实战案例

```html
<form action="https://search.jd.com/search">
    <!-- 文本输入框 -->
    账户：<input type="text" name="account" value="zhangsan" maxlength="10"><br>
    <!-- 密码输入框 -->
    密码：<input type="password" name="pwd" value="123" maxlength="6"><br>
    <!-- 单选框 -->
    性别：
    <input type="radio" name="gender" value="male">男 
    <input type="radio" name="gender" value="female" checked>女<br>
    <!-- 多选框 -->
    爱好：
    <input type="checkbox" name="hobby" value="smoke" checked>抽烟
    <input type="checkbox" name="hobby" value="drink">喝酒
    <input type="checkbox" name="hobby" value="perm" checked>烫头<br>
    其他：
    <textarea name="other" cols="23" rows="3"></textarea><br>
    籍贯：
    <select name="place">
        <option value="冀">河北</option>
        <option value="鲁">山东</option>
        <option value="晋" selected>山西</option>
        <option value="粤">广东</option>
    </select>
    <!-- 隐藏域 -->
    <input type="hidden" name="from" value="toutiao">
    <br>
    <!-- 确认按钮_第一种写法 -->
    <button type="submit">确认</button>
    <!-- 确认按钮_第二种写法 -->
    <!-- <input type="submit" value="确认"> -->
    <!-- 重置按钮_第一种写法 -->
    <!-- <button type="reset">重置</button> -->
    <!-- 重置按钮_第二种写法 -->
    <input type="reset" value="点我重置">
    <!-- 普通按钮_第一种写法 -->
    <input type="button" value="检测账户是否被注册">
    <!-- 普通按钮_第二种写法 -->
    <!-- <button type="button">检测账户是否被注册</button> -->
</form>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303221457769.png" alt="image-20230322145700700" style="zoom:80%;" />

## label标签

> 用于绑定一个表单元素, 当点击label标签的时候, 被绑定的表单元素就会获得输入焦点。提升用户体验
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211301011348.png" alt="image-20221130101143274" style="zoom:80%;" />

 

**如何绑定元素呢？**

> 第一种用法就是用label直接包括input表单，适合单个表单选择

```html
<label> 
    用户名： <input type="radio" name="usename" value="请输入用户名">  
</label>
```

> 第二种用法 for 属性规定 label 与哪个表单元素绑定id。

```html
<label for="sex">男</label>
<input type="radio" name="sex" id="sex">
```

```html
<form action="https://search.jd.com/search">
    <label for="zhanghu">账户：</label>
    <input id="zhanghu" type="text" name="account" maxlength="10"><br>
    <label>
        密码：
        <input id="mima" type="password" name="pwd" maxlength="6">
    </label>
    <br>
    性别：
    <input type="radio" name="gender" value="male" id="nan">
    <label for="nan">男</label> 
    <label>
        <input type="radio" name="gender" value="female" id="nv">女
    </label>
    <br>
    爱好：
    <label>
        <input type="checkbox" name="hobby" value="smoke">抽烟
    </label>
    <label>
        <input type="checkbox" name="hobby" value="drink">喝酒
    </label>
    <label>
        <input type="checkbox" name="hobby" value="perm">烫头
    </label><br>
    <label for="qita">其他：</label>
    <textarea id="qita" name="other" cols="23" rows="3"></textarea><br>
    籍贯：
    <select name="place">
        <option value="冀">河北</option>
        <option value="鲁">山东</option>
        <option value="晋">山西</option>
        <option value="粤">广东</option>
    </select>
    <input type="hidden" name="from" value="toutiao">
    <br>
    <input type="submit" value="确认">
    <input type="reset" value="点我重置">
    <input type="button" value="检测账户是否被注册">
</form>
```

## 轮廓线和文本域拖拽

### 轮廓线 outline

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924145149299.png" alt="image-20210924145149299" style="zoom:80%;" />

 是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用。 

```css
 outline : outline-color ||outline-style || outline-width 
```

 但是我们都不关心可以设置多少，我们平时都是去掉的。 li  

最直接的写法是 ：  outline: 0;   或者  outline: none;

```html
 <input  type="text"  style="outline: 0;"/>
```

### 防止拖拽文本域resize

![image-20210924145204267](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924145204267.png)

实际开发中，我们文本域右下角是不可以拖拽： 

```html
<textarea  style="resize: none;"></textarea>
```



## 禁用表单控件

> 给表单控件的标签设置 disabled 既可禁用表单控件。
>
> input 、textarea 、button 、select 、option 都可以设置 disabled 属性

```js
<input disabled type="button" value="检测账户是否被注册">
```

## 文本域

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211301010927.png" alt="image-20221130101027847" style="zoom:80%;" />

```html
<textarea cols="60" rows="30">  文本内容</textarea>
```

> 通过textarea控件可以轻松地创建多行文本输入框.
>
> cols="每行中的字符数" rows="显示的行数"  我们实际开发不用它来设置尺寸，用CSS来设置尺寸

文本框和文本域区别

| 表单              |  名称  |       区别       |                  默认值显示 |             用于场景 |
| :---------------- | :----: | :--------------: | --------------------------: | -------------------: |
| input type="text" | 文本框 | 只能显示一行文本 | 单标签，通过value显示默认值 | 用户名、昵称、密码等 |
| textarea          | 文本域 | 可以显示多行文本 |  双标签，默认值写到标签中间 |               留言板 |

## select下拉列表

如果有多个选项让用户选择，为了节约空间，我们可以使用select控件定义下拉列表.

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211301009127.png" alt="image-20221130100953048" style="zoom:80%;" />

```html
<select> 
    <option>选项1</option> 
    <option>选项2</option> 
    <option>选项3</option> 
</select>
```

> 1. &lt;select&gt;  中至少包含一对 option 
> 2. 在option 中定义selected =" selected "时，当前项即为默认选中项。
> 3. 但是我们实际开发会用的比较少

```html
<select>
    <option>北京</option>
    <option>上海</option>
    <option>广州</option>
    <option selected>深圳</option>
</select>
```

## fieldset 与 legend

> fieldset 可以为表单控件分组、legend 标签是分组的标题。

```html
<form action="https://search.jd.com/search">
    <!-- 主要信息 -->
    <fieldset>
        <legend>主要信息</legend>
        <label for="zhanghu">账户：</label>
        <input id="zhanghu" type="text" name="account" maxlength="10"><br>
        <label>
            密码：
            <input id="mima" type="password" name="pwd" maxlength="6">
        </label>
        <br>
        性别：
        <input type="radio" name="gender" value="male" id="nan">
        <label for="nan">男</label> 
        <label>
            <input type="radio" name="gender" value="female" id="nv">女
        </label>
    </fieldset>
    <br>
    <fieldset>
        <legend>附加信息</legend>
        爱好：
        <label>
            <input type="checkbox" name="hobby" value="smoke">抽烟
        </label>
        <label>
            <input type="checkbox" name="hobby" value="drink">喝酒
        </label>
        <label>
            <input type="checkbox" name="hobby" value="perm">烫头
        </label><br>
        <label for="qita">其他：</label>
        <textarea id="qita" name="other" cols="23" rows="3"></textarea><br>
        籍贯：
        <select name="place">
            <option value="冀">河北</option>
            <option value="鲁">山东</option>
            <option value="晋">山西</option>
            <option value="粤">广东</option>
        </select>
    </fieldset>
    <input type="hidden" name="from" value="toutiao">
    <br>
    <input type="submit" value="确认">
    <input type="reset" value="点我重置">
    <input type="button" value="检测账户是否被注册">
</form>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303221946042.png" alt="image-20230322194627948" style="zoom:80%;" />

## 新增表单属性⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303222103065.png" alt="image-20230322210354976" style="zoom:80%;" />

```html
<form action="">
    账号：<input 
            type="text" 
            name="account" 
            placeholder="请输入账号" 
            required 
            autofocus 
            autocomplete="on"
            pattern="\w{6}"
          >
    <br>
    密码：<input type="password" name="pwd" placeholder="请输入密码" required pattern="\w{6}">
    <br>
    性别：
        <input type="radio" value="male" name="gender" required>男
        <input type="radio" value="female" name="gender">女
    <br>
    爱好：
        <input type="checkbox" value="smoke" name="hobby">抽烟
        <input type="checkbox" value="drink" name="hobby" required>喝酒
        <input type="checkbox" value="perm" name="hobby">烫头
    <br>
    其他：<textarea name="other" placeholder="请输入密码" required pattern="\w{6}"></textarea>
    <br>
    <button>提交</button>
</form>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303222107692.png" alt="image-20230322210743625" style="zoom:80%;" />

## input 新增属性值

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303222104730.png" alt="image-20230322210434627" style="zoom:80%;" />

```html
<!-- novalidate：如果给form 标签设置了该属性，表单提交的时候不再进行验证。 -->
<form action="" novalidate>
     邮箱：<input type="email" required name="email">
     url：<input type="url" required name="url">
     数值：<input type="number" required name="number" step="2" max="80" min="20">
     搜索：<input type="search" required name="keyword">
     电话：<input type="tel" required name="phone">
     光照强度：<input type="range" name="range" max="80" min="20" value="22">
     颜色：<input type="color" name="color">
     日期：<input type="date" required name="date">
     月份：<input type="month" required name="month">
     周：<input type="week" required name="week">
     时间：<input type="time" required name="time">
     日期+时间：<input type="datetime-local" required name="time2">
    <br>
    <button>提交</button>
</form>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303222106869.png" alt="image-20230322210643799" style="zoom:80%;" />

## 综合案例--婚恋网注册

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211301028397.png" alt="image-20221130102800287" style="zoom:67%;" />

```html
<body>
    <h1>青春不常在，抓紧谈恋爱</h1>
    <hr>
    <form action="">
        昵称: <input type="text" placeholder="请输入昵称">
        <br>
        <br>
        性别: 
        <label><input type="radio" name="sex" checked> 男</label>
        <label><input type="radio" name="sex"> 女</label>
        <br><br>

        所在城市:
        <select>
            <option>北京</option>
            <option selected>上海</option>
            <option>广州</option>
        </select>
        <br>
        <br>
        喜欢的类型:
        <label><input type="checkbox" checked> 可爱</label>
        <label><input type="checkbox" checked> 性感</label>
        <label><input type="checkbox"> 御姐</label>

        <br>
        <br>

        个人介绍: <br>
        <textarea name="" id="" cols="60" rows="10"></textarea>
        <h3>我承诺</h3>
        <ul>
            <li>年满18岁、单身</li>
            <li>年满18岁、单身</li>
            <li>年满18岁、单身</li>
        </ul>
        <!-- 按钮: input button -->
        <input type="submit" value="免费注册">
        <button type="reset">重置</button>
    </form>
</body>
```



# 语义化标签

## 布局标签

### 语义化布局标签

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211301019408.png" alt="image-20221130101930305" style="zoom:80%;" />

> artical可以有多个section 。section 强调的是分段或分块，如果将一块内容分成几段的时候，可使用section
>
> article比section 更强调独立性，一块内容如果比较独立、比较完整，应该使用article 元素

```html
<body>
    <header>网页头部</header>
    <nav>网页导航</nav>
    <footer>网页底部</footer>
    <aside>侧边栏</aside>
    <section>网页区块</section>
    <article>文章</article>
</body>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211301024735.png" alt="image-20221130102429677" style="zoom:80%;" />

### 语义化标签实战⭐

```html
<body>
    <!-- 头部 -->
    <header class="page-header">
        <h1>尚品汇</h1>
    </header>
    <hr>
    <!-- 主导航 -->
    <nav>
        <a href="#">首页</a>
        <a href="#">订单</a>
        <a href="#">购物车</a>
        <a href="#">我的</a>
    </nav>
    <!-- 主要内容 -->
    <div class="page-content">
        <!-- 侧边栏导航 -->
        <aside style="float: right;">
            <nav>
                <ul>
                    <li><a href="#">秒杀专区</a></li>
                    <li><a href="#">会员专区</a></li>
                    <li><a href="#">领取优惠券</a></li>
                    <li><a href="#">品牌专区</a></li>
                </ul>
            </nav>
        </aside>
        <!-- 文章 -->
        <article>
            <h2>《如何一夜暴富》</h2>
            <section>
                <h3>第一种方式：通过做梦</h3>
                <p>你要这么做梦：xxxxxxxxxxxxxxxxxxxxxxx</p>
            </section>
            <section>
                <h3>第二种方式：通过买彩票</h3>
                <p>你要这么买彩票：xxxxxxxxxxxxxxxxxxxxxxx</p>
            </section>
            <section>
                <h3>第三种方式：通过学习前端</h3>
                <p>你要来到尚硅谷学前端：xxxxxxxxxxxxxxxxxxxxxxx</p>
            </section>
        </article>
    </div>
    <hr>
    <footer>
        <nav>
            <a href="#">友情链接1</a>
            <a href="#">友情链接2</a>
            <a href="#">友情链接3</a>
            <a href="#">友情链接4</a>
        </nav>
    </footer>
</body>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303222038613.png" alt="image-20230322203819518" style="zoom:80%;" />

## 状态标签

### meter 标签

> 语义：定义已知范围内的标量测量。也被称为 gauge （尺度），双标签，例如：电量、磁盘用量等。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303222042748.png" alt="image-20230322204222676" style="zoom:80%;" />

```html
<span>手机电量：</span>
<meter max="100" min="0" value="90" low="10" high="10" optimum="90"></meter>
<meter max="100" min="0" value="80" low="20" high="20" optimum="60"></meter>
<meter max="100" min="0" value="70" low="30" high="30" optimum="30"></meter>
```

### progress 标签

> 语义：显示某个任务完成的进度的指示器，一般用于表示进度条，双标签，例如：工作完成进度等。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303222043641.png" alt="image-20230322204347568" style="zoom:80%;" />

```css
<style>
    progress {
        width: 50px;
    }
</style>
```

```html
<span>当前进度：</span>
<progress max="100" value="50"></progress>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303222047420.png" alt="image-20230322204705354" style="zoom:80%;" />

## 列表标签

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303222044224.png" alt="image-20230322204415155" style="zoom:80%;" />

```html
<body>
    <form action="#">
        <input type="text" list="mydata">
        <button>搜索</button>
    </form>
    <datalist id="mydata">
        <option value="周杰伦">周杰伦</option>
        <option value="周冬雨">周冬雨</option>
        <option value="马冬梅">马冬梅</option>
        <option value="温兆伦">温兆伦</option>
    </datalist>
    <hr>
    <details>
        <summary>如何一夜暴富？</summary>
        <p>来到尚硅谷学习前端</p>
    </details>
</body>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303222048213.png" alt="image-20230322204845146" style="zoom:80%;" />

## 文本标签

### 文本注音

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303222055628.png" alt="image-20230322205503561" style="zoom:80%;" />

https://www.qqxiuzi.cn/zh/pinyin/

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303222054903.png" alt="image-20230322205431813" style="zoom:80%;" />

```html
<ruby>
    <span>魑魅魍魉</span>
    <rt>chī mèi wǎng liǎng </rt>
</ruby>
<hr>
<div>
    <ruby>
        <span>魑</span>
        <rt>chī</rt>
    </ruby>
    <ruby>
        <span>魅</span>
        <rt>mèi</rt>
    </ruby>
</div>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303222056546.png" alt="image-20230322205622481" style="zoom:80%;" />

### 文本标记

> 注意： W3C 建议 mark 用于标记搜索结果中的关键字。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303222055812.png" alt="image-20230322205528753" style="zoom:80%;" />

```html
<p>Lorem ipsum <mark>dolor</mark> sit amet consectetur adipisicing elit. Laboriosam, nemo?</p>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303222056385.png" alt="image-20230322205633319" style="zoom:80%;" />

## 其他标签

### 1 水平居中

让你实现水平居中，用这个标签就对了，标签名也非常得语义化

```html
<div style="width: 300px;height: 300px;background-color: #00a4ff">
    <div style="text-align: center;">123</div>
    <center>456</center>
</div>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211301035551.png" alt="image-20221130103550477" style="zoom:50%;" />

原理也很简单，其实就是这个标签自带了 `text-align: center` 的样式

### 2 缩写加注释

abbr 全称是 **abbreviations**，意思是缩写。应用场景也很简单，为一些文章中的缩写增加注释

以前在文章中对于缩写的解释经常会这么做：

```html
DAU（Daily Active User），日活跃用户数 ......
```

那我们用 `abbr` 标签呢？

```html
<abbr title="Daily Active User">
    DAU
</abbr>
<span>，日活跃用户数 ......</span>
```

展示的效果如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211301037599.png" alt="image-20221130103707531" style="zoom:80%;" />

这个标签就可以把全称隐藏掉，弱化信息量，让真正不知道该缩写的用户主动去获取缩写的具体意思，这个在 `markdown` 里经常会出现

### 3 高亮显示

`<mark/>` 在 markdown 中也是很常用的，用于将包裹的文本高亮展示

```html
<mark>高亮文本</mark>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211301038980.png" alt="image-20221130103839915" style="zoom:80%;" />

如果全文统一高亮样式，可以专门对 mark 标签进行样式重置，这样就不用对你用的每个 `div` 加一个 `highlight` 的类名了，又不语义化，又徒增文档大小

### 4 上标和下标

`<sup/>`和`<sub/>`分别表示上标和下标，在 markdown 中出现得也很频繁，比如数学公式和引用

```html
<div>3<sup>[2]</sup></div>
<div>4<sub>2</sub></div>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211301039641.png" alt="image-20221130103925573" style="zoom:80%;" />

上标和下标的样式原理也比较简单，主要就是利用了 `vertical-align` 的 `top` 和 `sub` 属性值，然后将字号缩小，不过有现成的标签，干嘛不用呢？

### 5 文本描述

`figure` 是用于包裹其它标签的内容的，然后再利用另一个标签 `figcaption` ，可以对包裹的内容进行一个文本描述，例如：

```html
<figure>
    <img src="/media/cc0-images/elephant-660-480.jpg"
         alt="大象">
    <figcaption>这是一张大象的照片</figcaption>
</figure>
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/lgHVurTfTcwvpeqibic6SqJsOooJWSseNGNHVgibfkkRYWbSQ69KolKAc3wH0GKpAdROQ6Qib6cJypPkgpkMR7lzIQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

那要是图片挂了呢？

![图片](https://mmbiz.qpic.cn/mmbiz_png/lgHVurTfTcwvpeqibic6SqJsOooJWSseNGsiaWbkoNLzJc47Ueezta1EHicx0j0YLoUKhXqb1DEXOcTrA8TicicaicKGA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

再友好点处理，我们把 `img` 标签的 `alt` 属性去掉

![图片](https://mmbiz.qpic.cn/mmbiz_png/lgHVurTfTcwvpeqibic6SqJsOooJWSseNGvia3httd3LlnIHic46FIiaCcxbK7NTvoImUfZJ4LjFP5picETX6MR7Ug9g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

漂亮，终于把我一直厌烦的图裂icon给干掉了，样式还巨好看

当然不止能包裹 `img` 标签，其它任何都是可以的

嘿嘿，给大家在本文来个实战👇，下面这个可以点击，样式也是利用了 `figure` 这个标签

[![图片](https://mmbiz.qpic.cn/mmbiz_jpg/lgHVurTfTcwvpeqibic6SqJsOooJWSseNGicZfTCmUzC9ABjdaIib57IGZuzic7zW1VYH3XibUXKGnzKJyrIsWmSYOrA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)](https://mp.weixin.qq.com/s?__biz=MzkxMjI3MTA1Mg==&mid=2247515122&idx=1&sn=b150e432c8045be68cbe54a9cba75c4d&chksm=c10d8851f67a0147e8d9c4bf041e4c922d7f5c9da423e0730d4ecfb085ed49be3f14e4492a5b&token=1941016612&lang=zh_CN&scene=21#wechat_redirect)我是figure标签产生的

### 6 进度条⭐

说到 `<progress/>` 这个标签就很有意思了，去年有段时间我做的业务里涉及到了进度条，当时是前同事做的，然后有一些性能问题，我就在研究如何优化，减少进度条改变带来的性能问题，当时还写了一篇 [我优化了进度条，页面性能竟提高了70%](https://mp.weixin.qq.com/s?__biz=MzkxMjI3MTA1Mg==&mid=2247504125&idx=1&sn=fc37ad16af44a659e4d3c6216284dea4&chksm=c10de35ef67a6a48ea5bdceb7cddc274f349227044c52ad8671fa9de995d43543df0362915c7&token=1941016612&lang=zh_CN&scene=21#wechat_redirect)

虽然最后问题时解决了，但是也有幸收到了张鑫旭大佬的评论，他告诉我 `progress` 这个标签就足够了，既有语义化，又有进度条的功能，性能还好，兼容性也很不错。后来经过一番尝试，还真是

```html
<!-- 进度条最大值为100，当前进度为60，即60% -->
<div style="width: 300px;height: 300px;">
     <progress max="100" value="10"></progress>
     <progress max="100" value="20"></progress>
     <progress max="100" value="30"></progress>
     <progress max="100" value="40"></progress>
     <progress max="100" value="50"></progress>
     <progress max="100" value="70"></progress>
     <progress max="100" value="100"></progress>
</div>
```

浏览器自带的样式就已经很好看了，效果如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211301044462.png" alt="image-20221130104400385" style="zoom:80%;" />

业务中我们也就可以通过控制 `value` 属性，来改变进度条的进度了

### 7 area

`area` 这个标签也非常有意思，它的作用是为图片提供点击热区，可以自己规定一张图的哪些区域可点击，且点击后跳转的链接，也可以设置成点击下载文件，我们来举个例子：

```html
<img src="example.png" width="100" height="100" alt="" usemap="#map">

<map name="map">
  <area shape="rect" coords="0,0,100,50" alt="baidu" href="https://www.baidu.com">
  <area shape="rect" coords="0,50,100,100" alt="sougou" href="https://www.sogou.com/">
</map>
```

`area` 一般要搭配 `map` 标签一起使用，每个 `area` 标签表示一个热区，例如上面代码中，我们定义了两个热区，热区形状都为`rect`（矩形），他们的热区分别是：

- 坐标 `(0,0)` 到 坐标 `(100,50)` 的一个矩形
- 坐标 `(0,50)` 坐标 `(100,100)` 的一个矩形

我们都知道，默认的坐标轴是这样的：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211301053383.png" alt="image-20221130105309311" style="zoom:67%;" />

因此，我们划分的两个热区就是:

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211301053664.png" alt="image-20221130105321582" style="zoom:80%;" />

最后再来看一下我们的实际效果：

<img src="https://mmbiz.qpic.cn/mmbiz_gif/lgHVurTfTcwvpeqibic6SqJsOooJWSseNGa7LZK3CsIlkG1bZbQZVIWsxXUld6OgAMIeicpHAAfFQn5adl3BefOiaQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1" alt="图片" style="zoom:80%;" />

### 8 详情

`details` 字面意思是 "详情"，在markdown里也经常用，用该标签包裹了的内容默认会被隐藏，只留下一个简述的文字，我们点击以后才会展示详细的内容

```html
<details>
  <p>我是一段被隐藏的内容</p>
</details>
```

效果如下：

<img src="https://mmbiz.qpic.cn/mmbiz_gif/lgHVurTfTcwvpeqibic6SqJsOooJWSseNGFb7LRGcdhWqDUvu1oRuNBA989xTwkpBm1QNdEvUXqCynU1zn37CcnQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1" alt="图片" style="zoom:80%;" />

这还没有加任何一行的 `js` 代码，我们点击后，`details` 标签上会多一个 `open` 的属性，被隐藏的内容就展示出来了

默认情况下，简要文字为 `"详情"`，想要修改这个文字，要搭配 `summary` 标签来使用

```html
<details>
  <summary>点击查看更多</summary>
  <p>我是一段被隐藏的内容</p>
</details>
```

就搞定了

![图片](https://mmbiz.qpic.cn/mmbiz_png/lgHVurTfTcwvpeqibic6SqJsOooJWSseNGQGgAHzYC3MxKuhZeH1gZAmQKlf9SKEpvbFB0naTjq0vC2NrsmGOGYA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)


<img src="https://mmbiz.qpic.cn/mmbiz_png/lgHVurTfTcwvpeqibic6SqJsOooJWSseNGWgOhSt2XzJwZD7OXpmoRcia4ic5uBmrSzcEoxCr2XeOZNDZN8k9pH3Hw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:80%;" />

# 字符实体

## HTML的空格合并现象

> 场景：如果在html代码中同时并列出现多个空格、换行、缩进等，最终浏览器只会解析出一个空格
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211301021166.png" alt="image-20221130102135089" style="zoom: 80%;" />

## 常见字符实体

> 场景：在网页中展示特殊符号效果时，需要使用字符实体替代。在HTML 中我们可以用一种特殊的形式的内容，来表示某个符号，这种特殊形式的内容，就是HTML 实体。比如小于号 < 用于定义 HTML 标签的开始。如果我们希望浏览器正确地显示这些字符，我们必须在HTML 源码中插入字符实体。字符实体由三部分组成：一个& 和 一个实体名称（或者一个# 和 一个实体编号），最后加上一个分号; 。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303222016469.png" alt="image-20230322201639369" style="zoom:80%;" />


可以使用`::placeholder` CSS 选择器更改占位符文本的样式：

```css
::placeholder {
  color: #210065;
  opacity: 0.7;
  font-size: 16px;
}
```



# 很有用的 HTML 属性

## inputmode

`inputmode` 全局属性是一个枚举属性，它提供了用户在编辑元素或其内容时可能输入的数据类型的提示。

```html
<input type="text" inputmode="tel" />
```

该属性可以取以下值：

> - **none：** 不使用虚拟键盘，这个时候页面需要使用自定义的键盘代替
> - **text：** 默认值，会显示标准输入键盘
> - **decimal：** 小数表示键盘，除了数字之外可能会有小数点 . 或者千分符逗号 ,。
> - **numeric：** 显示0-9的数字键盘。
> - **tel：** 手机数字键盘，会有星号 * 或者井号 # 键。
> - **search：** 提交按钮会显示 'search' 或者 ‘搜索’。
> - **email：** 键盘上会有 @ 符号键。
> - **url：** 键盘上会有斜杠 / 符号键。

当我们将 `inputmode` 属性设置为 tel 时，调起的虚拟键盘如下

<img src="https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOOyibLVcjFTsNvia9taklJmJFibicNsRXC9ibAr0S8BlSF9OxiaCkCckiclrujKReF5WkSnPd2o4NaP3fLQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:50%;" />

## multiple

`multiple` 属性可设置或返回是否可有多个选项被选中。该属性可以用于 `input` 或 `select` 标签。

在 `input` 标签中，当指定类型为 `file` 或 `email` 时，可以设置 `multiple` 多选选项。

- 当类型为 `email` 时，输入值为逗号分隔的邮件列表，会从里表中的每个邮件地址中删除所有空格。
- 当类型为 `file` 时，用户可以选择多个文件。

```html
<input type="file" name="img" multiple> 
```

在 select 标签中，当设置了 multiple 属性时，同时可以通过 size 属性来指定可选项的个数：

```html
<select multiple="multiple" size="2"> 
  <option value="1">北京</option>
  <option value="2">上海</option>
  <option value="3">广州</option>
  <option value="4">深圳</option>
</select>
```

使用 multiple 属性进行电子邮件输入

电子邮件输入使用 multiple 属性，输入以逗号分隔的电子邮件地址列表。 将从列表中的每个地址中删除所有空格

```html
<input type="email" multiple>
```

## 自定义有序列表属性

在 `<ol>` 元素可以用于指定有序列表。我们可以通过一些属性来指定列表中的编号行为：

### 1 倒序排序

以相反的顺序对项目进行编号（从高到低）：

```html
<ol reversed>
  <li>浔阳江头夜送客，枫叶荻花秋瑟瑟。</li>
  <li>主人下马客在船，举酒欲饮无管弦。</li>
  <li>醉不成欢惨将别，别时茫茫江浸月。</li>
  <li>忽闻水上琵琶声，主人忘归客不发。</li>
  <li>寻声暗问弹者谁？琵琶声停欲语迟。</li>
  <li>移船相近邀相见，添酒回灯重开宴。</li>
  <li>千呼万唤始出来，犹抱琵琶半遮面。</li>
</ol>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212221701219.png" alt="image-20221222170126098" style="zoom: 50%;" />

这里只有编号会发生变化，并不会影响内容的顺序。

### 2 设置起点数字

定义从哪个数字开始：

```html
<ol start="10">
  <li>浔阳江头夜送客，枫叶荻花秋瑟瑟。</li>
  <li>主人下马客在船，举酒欲饮无管弦。</li>
  <li>醉不成欢惨将别，别时茫茫江浸月。</li>
  <li>忽闻水上琵琶声，主人忘归客不发。</li>
  <li>寻声暗问弹者谁？琵琶声停欲语迟。</li>
  <li>移船相近邀相见，添酒回灯重开宴。</li>
  <li>千呼万唤始出来，犹抱琵琶半遮面。</li>
</ol>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212221703194.png" alt="image-20221222170357078" style="zoom:50%;" />

### 3 序号类型

用于定义是使用数字、字母还是罗马数字。`type` 属性接受表示编号类型的五个单字符值（a、A、i、I、1）之一。

```html
<ol type="i">
  <li>浔阳江头夜送客，枫叶荻花秋瑟瑟。</li>
  <li>主人下马客在船，举酒欲饮无管弦。</li>
  <li>醉不成欢惨将别，别时茫茫江浸月。</li>
  <li>忽闻水上琵琶声，主人忘归客不发。</li>
  <li>寻声暗问弹者谁？琵琶声停欲语迟。</li>
  <li>移船相近邀相见，添酒回灯重开宴。</li>
  <li>千呼万唤始出来，犹抱琵琶半遮面。</li>
</ol>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212221705921.png" alt="image-20221222170503802" style="zoom:50%;" />

### 4 中间截断数字

用于在特定列表项上指定自定义数字：

```html
<ol>
  <li>浔阳江头夜送客，枫叶荻花秋瑟瑟。</li>
  <li>主人下马客在船，举酒欲饮无管弦。</li>
  <li>醉不成欢惨将别，别时茫茫江浸月。</li>
  <li value="10">忽闻水上琵琶声，主人忘归客不发。</li>
  <li>寻声暗问弹者谁？琵琶声停欲语迟。</li>
  <li>移船相近邀相见，添酒回灯重开宴。</li>
  <li>千呼万唤始出来，犹抱琵琶半遮面。</li>
</ol>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212221706278.png" alt="image-20221222170611163" style="zoom:50%;" />

## decoding

<img> 标签的 decoding 属性用于告诉浏览器使用何种方式解析图像数据。

```html
<img src="/images/example.png" alt="Example" decoding="async">
```

该属性可以取以下三个值：

- **sync**: 同步解码图像，保证与其他内容一起显示。
- **async**: 异步解码图像，加快显示其他内容。
- **auto**: 默认模式，表示不偏好解码模式。由浏览器决定哪种方式更适合用户。

此属性类似于在`<script>`上使用 `async` 属性。加载图像所需的时间不会改变，但其“解码”的方式由解码属性决定。`decoding` 属性可以控制是否允许浏览器尝试异步加载图像。异步加载对 `<img>` 元素很有用，对屏幕外的图像对象可能会更有用。

## loading

`loading` 属性不仅可以用在 `<img>` 元素上，也可以用在 `<iframe>` 元素上，用于触发`<iframe>`网页的懒加载：

```html
<iframe src="/page.html" width="800" height="40" loading="lazy">
```

该属性可以取以下三个值：

- `auto`：浏览器的默认行为，与不使用loading属性效果相同。
- `lazy`：懒加载，即将滚动进入视口时开始加载。
- `eager`：立即加载资源 ，无论在页面上的位置如何。

需要注意，如果`<iframe>`是隐藏的，则`loading`属性无效，将会立即加载。

## form

在大多数情况下，我们会将表单输入和控件嵌套在 `<form>` 元素中。当然，我们也可以将表单输入放在任何位置，并将其与所属的 `<form>` 元素相关联。只需要使用 form 属性来指定其所属的form表单即可：

```apl
<form id="myForm" action="">
  <input id="name">
  <button type="submit">
</form>

<input type="email" form="myForm">
```

可以看到，表单外部的电子邮件 `<input>` 的 `form` 属性设置为 `myForm`，该属性与表单的 `id` 相同。可以使用此属性和表单的 `id` 将表单控件（包括提交按钮）与任何表单相关联。

## imagesizes 和 imagesrcset

`imagesizes` 和 `imagesrcset` 属性用来预加载响应式图像，可以与 `rel=preload` 以及 `<link>` 元素一起定义，如下所示：

```apl
<link rel="preload"
      as="image"
      imagesrcset="images/example-480.png 480w,
                   images/example-800.png 800w,
                   images/example.png 2000w"
      imagesizes="(max-width: 600px) 480px,
                  (max-width: 1000px) 800px,
                  1000px"
      src="images/example.png"
      alt="Example Image">
```

这里使用 `rel=preload` 会通知浏览器希望指定的资源优先加载，因此它们不会被脚本和样式表之类的东西阻塞。`as` 属性指定所请求内容的类型。

可以使用 `href` 属性以及 `preload` 和 `as` 来预加载常规图像。还可以使用 `imagesrcset` 和 `imagesizes` 属性来预加载正确的图像，具体取决于视口的大小或在 `imagesizes` 属性中指定的其他媒体功能。

## enterkeyhint

当我们在手机键盘上按下回车键（`enter`）时，在不同的场景下可能执行的操作有所不同，比如换行、发送消息、执行搜索、确认等等。这些操作可以通过 `enterkeyhint` 属性来实现。

`enterkeyhint` 属性是一个全局属性，可应用于将 `contenteditable` 设置为 `true` 的表单控件或元素。它的用法如下：

```html
<input enterkeyhint="values">
```

它的属性值有以下情况：

- **done：** 完成并关闭输入法编辑器。
- **enter：** 换行。
- **go：** 输入完并继续下一个表单。
- **search：** 输入后搜索内容。
- **send：** 发送消息。
- **next：** 将把用户带到下一个接受文本的字段。
- **previous：** 将用户带到将接受文本的上一个字段。

```
Next：<input type="text" enterkeyhint="next">
Done: <input type="text" enterkeyhint="done">
  Go: <input type="text" enterkeyhint="go">
```

在手机键盘中进行输入时，可以看到键盘的 enter 键显示不同的操作：

<img src="https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOOyibLVcjFTsNvia9taklJmJAaoBiajdbbUmY1ZmibmHxjvxOMpaCR4MJwV4SPLNtmRCEicLmphAUC89g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:50%;" />

<img src="https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOOyibLVcjFTsNvia9taklJmJ6XlblfFmiaGRhfB5qZSUp7uRBfCYZvSAxPSyibkfwIlNDlVJPtmA29Cw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:50%;" />

## contenteditable 网页可编辑

您可以使用 contenteditable 属性使网页上的 HTML 内容可编辑。 这是一个全局属性，它对所有 HTML 元素都是通用的

```html
<p contenteditable="true">
    在这里您可以编辑您想输入的内容
</p>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212251010809.png" alt="image-20221225101036731" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212251011068.png" alt="image-20221225101144981" style="zoom:80%;" />

## spellcheck 检查拼写错误

> spellcheck 属性指定是否可以检查元素的拼写错误。 您可以对 元素中的文本、可编辑元素中的文本或输入元素中的文本(密码除外)中的文本进行拼写检查。

```html
<p contenteditable="true" spellcheck="true">
    在这里输入您想拼写检查的内容
</p>
```

## download

您可以使用下载属性下载资源。download 属性告诉浏览器下载指定的 URL 而不是导航到它。 您可以将下载属性与 标签和 标签一起使用。注意：下载属性仅适用于同源 URL。 它遵循同源策略的规则。

```html
<a href="xyz.png" download="myImage">下载</a>
```

## accept 指定用户可以上传的文件类型

标签的 accept 属性指定用户可以上传的文件类型。 您可以指定一个或多个文件类型的逗号分隔列表作为其值。

### 接受音频文件

```html
<input type="file" id="audioFile" accept="audio/*">
```

### 接受视频文件

```html
<input type="file" id="videoFile" accept="video/*">
```

### 接受图像文件

```html
<input type="file" id="imageFile" accept="image/*">
```

### 接受 Microsoft Word 文件

```html
<input type="file" id="docpicker"
       accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
```

### 接受 PNG 或 JPEG 文件

```html
<input type="file" id="imageFile" accept=".png, .jpg, .jpeg">
```

### 接受 PDF 文件

```html
<input type="file" id="pdfFile" accept=".pdf">
```

## translate

translate 属性告诉浏览器在页面本地化时该元素是否应该被翻译。 它可以有 2 个值：“是”或“否”。

```html
<p translate="no">输入您想翻译或者不需要翻译的内容</p>
```

输入您想翻译或者不需要翻译的内容

## poster

poster 属性用于在视频下载或用户播放视频之前显示图像。

注意：如果您不指定任何内容，则在第一帧可用之前不会显示任何内容。 当第一帧可用时，它显示为海报帧。

```html
<video controlssrc="http://www.示例.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
       poster="posterImage.png"></video>
```

## pattern

元素的模式属性允许您指定一个正则表达式，元素的值将根据该正则表达式进行验证。 您可以将模式属性与多种输入类型一起使用，例如文本、日期、搜索、URL、电话、电子邮件和密码。

```html
<form><input name="username" id="username" pattern="[A-Za-z0-9]+"></form>
```

## autocomplete

autocomplete 属性指定浏览器是否应根据用户输入自动完成输入。 您可以将 autocomplete 属性用于多种输入类型，例如文本、搜索、URL、电话、电子邮件、密码、日期选择器、范围和颜色。 您可以将此属性与 元素或 元素一起使用。

```html
<input name="credit-card-number" id="credit-card-number" autocomplete="off">
```

## autofocus 自动对焦

autofocus 属性是一个布尔属性，指示元素应该专注于页面加载。

### 在 input 元素中使用

```html
<input type="text" autofocus/>搜索
```

### 在 select 元素中使用

```html
<select name="languages" id="languages" autofocus>
   <option value="C++">C++</option>
   <option value="Python">Python</option>
   <option value="JavaScript">JavaScript</option>
   <option value="Java">Java</option>
</select>
```

### 在 textarea 元素中使用

```html
<textarea autofocus>输入您想要显示的内容</textarea>
```















