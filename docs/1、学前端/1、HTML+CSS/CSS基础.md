


## 注释规范

```css
/* 给h1元素添加样式 */
h1 {
   /* 设置文字颜色为红色 */
   color: red;
   /* 设置文字大小为40px */
   font-size: 40px
}
```

## 代码风格⭐

> 项目上线时，我们会通过工具将【展开风格】的代码，变成【紧凑风格】，这样可以减小文件体积，节约网络流量，同时也能让用户打开网页时速度更快。

样式书写一般有两种：一种是紧凑格式 (Compact)

```css
h3 { color: deeppink;font-size: 20px;}
```

一种是展开格式（推荐）

```css
h3 {
	color: deeppink;
    font-size: 20px;    
}
```

## 代码大小写

样式选择器，属性名，属性值关键字全部使用小写字母书写，属性字符串允许使用大小写。

```css
/* 推荐 */
h3{
	color: pink;
}
	
/* 不推荐 */
H3{
	COLOR: PINK;
}
```

## CSS 初体验

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212011527494.png" alt="image-20221201152722319" style="zoom:80%;" />





# 标签显示模式⭐⭐

## 块级元素

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210161300036.png" alt="image-20221016130017956" style="zoom:80%;" />

![image-20210924111451097](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924111451097.png)

块级元素的特点

> （1）比较霸道，自己独占一行
>
> （2）高度，宽度、外边距以及内边距都可以控制。
>
> （3）宽度默认是容器（父级宽度）的100%
>
> （4）是一个容器及盒子，里面可以放行内或者块级元素。

注意：

> - 只有 文字才 能组成段落  因此 p  里面不能放块级元素，特别是 p 不能放div 
> - 同理还有这些标签h1,h2,h3,h4,h5,h6,dt，他们都是文字类块级标签，里面不能放其他块级元素。

## 行内元素

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210161302318.png" alt="image-20221016130220236" style="zoom:80%;" />

![image-20210924111526315](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924111526315.png)

行内元素的特点：

> （1）相邻行内元素在一行上，一行可以显示多个。
>
> （2）高、宽直接设置是无效的。
>
> （3）默认宽度就是它本身内容的宽度。
>
> （4）**行内元素只能容纳文本或则其他行内元素。**

 注意：

> - 链接里面不能再放链接。
> - 特殊情况a里面可以放块级元素，但是给a转换一下块级模式最安全
>

## 行内块元素

可以对它们设置宽高和对齐属性，有些资料可能会称它们为行内块元素

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210161303145.png" alt="image-20221016130352060" style="zoom:80%;" />

```html
<body>
    <img src="./images/1.jpg" alt="">
    <img src="./images/1.jpg" alt="">
</body>
```

```css
/* 行内块: 一行显示多个; 加宽高生效 */
img {
    width: 100px;
    height: 100px;
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212011944520.png" alt="image-20221201194424377" style="zoom:80%;" />

行内块元素的特点：

> （1）和相邻行内元素（行内块）在一行上,但是之间会有空白缝隙。一行可以显示多个
> （2）默认宽度就是它本身内容的宽度。
> （3）高度，行高、外边距以及内边距都可以控制。

## 显示模式区别

| 元素模式   | 元素排列               | 设置样式               | 默认宽度         | 包含                     |
| ---------- | ---------------------- | ---------------------- | ---------------- | ------------------------ |
| 块级元素   | 一行只能放一个块级元素 | 可以设置宽度高度       | 容器的100%       | 容器级可以包含任何标签   |
| 行内元素   | 一行可以放多个行内元素 | 不可以直接设置宽度高度 | 它本身内容的宽度 | 容纳文本或则其他行内元素 |
| 行内块元素 | 一行放多个行内块元素   | 可以设置宽度和高度     | 它本身内容的宽度 |                          |

## 标签显示模式转换 display

目的：改变元素默认的显示特点，让元素符合布局要求

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210161304297.png" alt="image-20221016130451226" style="zoom:80%;" />



## 拓展-嵌套规范 | 居中方法

### HTML嵌套规范注意点

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210161305674.png" alt="image-20221016130548600" style="zoom:80%;" />

### 居中方法总结

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210161457879.png" alt="image-20221016145728804" style="zoom: 80%;" />

## 综合案例

### 导航栏

```html
<body>
    <!-- a*5 -->
    <!-- 选多行加内容删除 alt + shift + 鼠标左键单击 -->
    <a href="#">导航1</a>
    <a href="#">导航2</a>
    <a href="#">导航3</a>
    <a href="#">导航4</a>
    <a href="#">导航5</a>
</body>
```

```css
<style>
    /* a 显示模式是行内, 加宽高默认不生效, 转显示模式: 行内块 */
    a {
        text-decoration: none;
        width: 100px;
        height: 50px;
        background-color: red;
        display: inline-block;
        color: #fff;
        text-align: center;
        line-height: 50px;
    }
    a:hover {
        background-color: orange;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212012051081.png" alt="image-20221201205155821" style="zoom:80%;" />

### 导航栏二

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212012056976.png" alt="image-20221201205635863" style="zoom:80%;" />

```html
<a href="#" class="one">五彩导航</a>
<a href="#" class="two">五彩导航</a>
<a href="#" class="three">五彩导航</a>
<a href="#" class="four">五彩导航</a>
```

```css
<style>
    a {
        text-decoration: none;
        width: 120px;
        height: 58px;
        background-color: pink;
        display: inline-block;
        text-align: center;
        line-height: 50px;
        color: #fff;
    }
    /* 每个a的背景图不同, 单独找到每个a, 设置不同的背景图片 */
    .one {
        background-image: url(./images/bg1.png);
    }

    .two {
        background-image: url(./images/bg2.png);
    }

    .three {
        background-image: url(./images/bg3.png);
    }

    .four {
        background-image: url(./images/bg4.png);
    }

    .one:hover {
        background-image: url(./images/bg5.png);
    }

    .two:hover {
        background-image: url(./images/bg6.png);
    }

    .three:hover {
        background-image: url(./images/bg7.png);
    }

    .four:hover {
        background-image: url(./images/bg8.png);
    }
</style>
```



# HTML元素关系

分为：①父元素、②子元素、③祖先元素、④后代元素、⑤兄弟元素。

## 父元素

> 直接包裹某个元素的元素，就是该元素的父元素

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231024352.png" alt="image-20230323102448277" style="zoom:80%;" />

## 子元素

> 被父元素直接包含的元素（简记：儿子元素）。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231025004.png" alt="image-20230323102525931" style="zoom:80%;" />

## 祖先元素

> 父亲的父亲......，一直往外找，都是祖先。父元素，也算是祖先元素的一种。例如：张三的父亲，也算是张三的祖先，但一般还是称呼：父亲。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231026535.png" alt="image-20230323102615466" style="zoom:80%;" />

## 后代元素

> 儿子的儿子......，一直往里找，都是后代。子元素，也算是后代元素的一种。
>
> 例如：张三的儿子，也算是张三的后代，但一般还是称呼：儿子。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231027391.png" alt="image-20230323102722325" style="zoom:80%;" />

## 兄弟元素

> 具有相同父元素的元素，互为兄弟元素。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231027227.png" alt="image-20230323102757157" style="zoom:80%;" />



# 选择器⭐

## 基础选择器

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210161239849.png" alt="image-20221016123904772" style="zoom:80%;" />

### 标签选择器

> 标签选择器（元素选择器）是指用**HTML标签名**称作为选择器，为页面中某一类标签指定统一CSS样式

最常见的 CSS 选择器就是元素选择器。选择器通常将是某个 HTML 元素：

```css
h1 {
  color: red;
  font-size: 50px;
}
```

在 W3C 标准中，元素选择器又称为类型选择器（type selector）。类型选择器匹配文档语言元素类型的名称。类型选择器匹配文档树中该元素类型的每一个实例。

> - 标签选择器 可以把某一类标签**全部**选择出来  比如所有的div标签  和 所有的 span标签
> - 能快速为页面中同类型的标签统一样式
> - 不能设计差异化样式。

### 类选择器⭐⭐

> 类选择器使用“.”（英文点号）进行标识，可以为元素对象定义单独或相同的样式。 可以选择一个或者多个标签 
>

> - 类选择器使用“.”（英文点号）进行标识，后面紧跟类名(自定义，我们自己命名的)
> - 长名称或词组可以使用中横线来为选择器命名。
> - 不要纯数字、中文等命名， 尽量使用英文字母来表示。
> - 各个类名中间用空格隔开。多类名选择器在后期布局比较复杂的情况下，还是较多使用的。

```css
<style>
    /* 选中页面中所有类名为speak的元素 */
    .speak {
        color: red;
    }
    /* 选中页面中所有类名为answer的元素 */
    .answer {
        color: green;
    }
    /* 选中页面中所有类名为big的元素 */
    .big {
        font-size: 20px;
    }
</style>
```

```html
<body>
    <h1>欢迎来到土味官网，土的味道我知道</h1>
    <h2>土味情话</h2>
    <h3>作者：优秀的网友们</h3>
    <!-- 一个标签可以使用多个类名 , 需要空格隔开即可 -->
    <p class="speak big">我对你说：万水千山总是情，爱我多点行不行！</p>
    <p class="speak">我对你说：草莓、蓝莓、蔓越莓，今天你想我了没？</p>
    <p class="speak">我对你说：我心里给你留了一块地，我的死心塌地！</p>
    <span class="speak">哈哈</span>
    <br>
    <h2>反杀土味情话</h2>
    <h3>作者：更优秀的网友们</h3>
    <p class="answer">你回答我：一寸光阴一寸金，劝你死了这条心！</p>
    <p class="answer">你回答我：西瓜、南瓜、哈密瓜，把你打成大傻瓜！</p>
    <p class="answer">你回答我：我心里只有一块地，我的玛莎拉蒂！</p>
</body>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231002177.png" alt="image-20230323100232100" style="zoom:80%;" />

### id选择器

W3C标准规定，在同一个页面内，不允许有相同名字的id对象出现，但是允许相同名字的class。

id 选择器用来指定具有ID的元素的样式。ID 选择器前面有一个 # 号 - 也称为棋盘号或井号。

> - 类选择器（class） 好比人的名字，  是可以多次重复使用的， 比如  张伟  王伟  李伟  李娜
> - id选择器     好比人的身份证号码，  全中国是唯一的， **不得重复。 只能使用一次**。

id选择器使用`#`进行标识，后面紧跟id名

```css
#my_id {
  color: red;
  font-size: 50px;
}
```

标签，id唯一，不能重复，只能为一个标签定义

~~~css
<p id="id名"></p>
~~~

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210161241809.png" alt="image-20221016124106717" style="zoom:80%;" />

### 通配符选择器

> 通配符选择器用`*`号表示，  *   就是所有标签，是所有选择器中作用范围最广的，能匹配页面中所有的元素。
>
> 开发中使用极少，只会在极特殊情况下才会用到
>
> 在基础小页面中可能会用于去除标签默认的margin和padding（后续讲解）

例如下面的代码，使用通配符选择器定义CSS样式，清除所有HTML标记的默认边距(常用)。

```css
* {
  margin: 0;                    /* 定义外边距*/
  padding: 0;                   /* 定义内边距*/
}
```

> 会匹配页面所有的元素，降低页面响应速度，不建议随便使用

```css
<style>
    * {
        color: orange;
        font-size: 40px;
    }
</style>
```

```html
<body>
    <h1>欢迎来到土味官网，土的味道我知道</h1>
    <br>
    <h2>土味情话</h2>
    <h3>作者：优秀的网友们</h3>
    <p>万水千山总是情，爱我多点行不行！</p>
    <p>草莓、蓝莓、蔓越莓，今天你想我了没？</p>
    <p>我心里给你留了一块地，我的死心塌地！</p>
</body>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303230957611.png" alt="image-20230323095723521" style="zoom: 50%;" />

### 基础选择器总结

| 选择器       | 作用                          | 缺点                     | 使用情况   | 用法                 |
| ------------ | ----------------------------- | ------------------------ | ---------- | -------------------- |
| 标签选择器   | 可以选出所有相同的标签，比如p | 不能差异化选择           | 较多       | p { color：red;}     |
| 类选择器     | 可以选出1个或者多个标签       | 可以根据需求选择         | 非常多     | .nav { color: red; } |
| id选择器     | 一次只能选择器1个标签         | 只能使用一次             | 不推荐使用 | #nav {color: red;}   |
| 通配符选择器 | 选择所有的标签                | 选择的太多，有部分不需要 | 不推荐使用 | * {color: red;}      |

基础选择器我们一共学了4个，  每个都有自己的价值， 可能再某个地方都能用到。但是如果说，一定要找个最常用的，那么，肯定是类选择器。

> - 尽量少用通用选择器 `*`
> - 尽量少用 ID 选择器
> - 不使用无具体语义定义的标签选择器 div span 

## 复合选择器

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210161248207.png" alt="image-20221016124728668" style="zoom:80%;" />

### 后代选择器⭐

> 概念：后代选择器又称为包含选择器，作用：用来选择元素或元素组的**子孙后代**
>
> 其写法就是把外层标签写在前面，内层标签写在后面，中间用**空格**分隔，先写父亲爷爷，在写儿子孙子。 
>
> 当标签嵌套，内层标签就成为外层标签的后代。子孙后代都可以选择。 或者说，它能选择任何包含在内标签

~~~css
父级 子级 {
    属性:属性值;
    属性:属性值;
}
~~~

~~~css
.class h3{
    color:red;
    font-size:16px;
}
~~~

![image-20210924105440083](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924105440083.png)

```html
<style>
    ul li {
        color: red;
    }
    ol li {
        color: green;
    }
    ul li a {
        color: orange;
    }
    ol li a {
        color: gray;
    }
    .subject li.front-end {
        color: blue;
    }
    .subject div.front-end {
        color: chocolate;
    }
</style>
```

```html
<body>
    <ul>
        <li>抽烟</li>
        <li>喝酒</li>
        <li>
            <a href="#">烫头</a>
        </li>
    </ul>
    <hr>
    <ol>
        <li>张三</li>
        <li>李四</li>
        <li>
            <a href="#">王五</a>
        </li>
    </ol>
    <hr>
    <ol class="subject">
        <li class="front-end">前端</li>
        <div class="front-end">学科介绍：学好前端，挂帅杨帆！</div>
        <li>Java</li>
        <li>大数据</li>
        <li>UI</li>
    </ol>
</body>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231031409.png" alt="image-20230323103147345" style="zoom:80%;" />

### 子代选择器

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231032643.png" alt="image-20230323103225565" style="zoom:80%;" />

~~~css
.class > h3{
    color:red;
    font-size:14px;
}
~~~

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231040094.png" alt="image-20230323104024031" style="zoom:80%;" />

> 这里的子 指的是 亲儿子  不包含孙子 重孙子之类。

```css
.demo > h3 {color: red;}   说明  h3 一定是demo 亲儿子。  demo 元素包含着h3
```

### 兄弟选择器

#### 相邻兄弟选择器

> 作用：选中指定元素后，符合条件的相邻兄弟元素。相邻，就是紧挨着他的下一个，简记：**睡在我下铺的兄弟**
>
> 语法： 选择器1+选择器2 {} 。

```css
/* 选中div后相邻的兄弟p元素 */
div+p {
   color:red;
}
```

#### 通用兄弟选择器

> 作用：选中指定元素后，符合条件的所有兄弟元素。（简记：**睡在我下铺的所有兄弟**）
>
> 语法： 选择器1~选择器2 {} 。注意：两种兄弟选择器，选择的是下面的兄弟。

```css
/* 选中div后的所有的兄弟p元素 */
div~p {
   color:red;
}
```

```css
<style>
    /* 选中div后紧紧相邻的兄弟p元素（睡在我下铺的兄弟）—— 相邻兄弟选择器 */
    /* div+p {
        color: red;
    } */

    /* 选中div后所有的兄弟p元素（睡在我下铺的所有兄弟）—— 通用兄弟选择器 */
    div~p {
        color: red;
    }
    li~li {
        color: orange;
    }
</style>
```

```html
<body>
    <div>尚硅谷</div>
    <p>前端</p>
   <p>Java</p>
   <p>大数据</p>
   <p>UI</p>
    <ul>
        <li>主页</li>
        <li>秒杀</li>
        <li>订单</li>
        <li>我的</li>
    </ul>
</body>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231045563.png" alt="image-20230323104546497" style="zoom:80%;" />

### 属性选择器

> 作用：选中属性值符合一定要求的元素。

> 1. [属性名] 选中具有某个属性的元素。
> 2. [属性名="值"] 选中包含某个属性，且属性值等于指定值的元素。
> 3. [属性名^="值"] 选中包含某个属性，且属性值以指定的值开头的元素。
> 4. [属性名$="值"] 选中包含某个属性，且属性值以指定的值结尾的元素。
> 5. [属性名*=“值”] 选择包含某个属性，属性值包含指定值的元素。

```css
/* 选中具有title属性的元素 */
div[title]{color:red;}
/* 选中title属性值为atguigu的元素 */
div[title="atguigu"]{color:red;}
/* 选中title属性值以a开头的元素 */
div[title^="a"]{color:red;}
/* 选中title属性值以u结尾的元素 */
div[title$="u"]{color:red;}
/* 选中title属性值包含g的元素 */
div[title*="g"]{color:red;}
```



### 交集选择器 

不建议使用

> 交集有并且的含义（通俗理解：即......又...... 的意思），例如：年轻且长得帅。
>
> 条件交集选择器由两个选择器构成，找到的标签必须满足：既有标签一的特点，也有标签二的特点。
>
> 语法：选择器1选择器2选择器3...选择器n {}

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924105613938.png" alt="image-20210924105613938" style="zoom:67%;" />

```css
<style>
    /* 选中类名为rich的元素*/
    .rich {
        color: gold;
    }
    /* 选中类名为beauty的元素*/
    .beauty {
        color: red;
    }
    /* 选中类名为beauty的p元素，这种形式（元素配合类选择器）以后用的很多！！ */
    p.beauty {
        color: green;
    }
    /* 选中同时具备rich和beauty类名的元素 */
    .rich.beauty {
        color: orange;
    }
</style>
```

```html
<body>
    <h2 class="rich">土豪张三</h2>
    <h2 class="beauty">明星李四</h2>
    <h2 class="rich beauty">土豪明星王五</h2>
    <hr>
    <p class="beauty">小狗旺财</p>
    <p class="beauty">小猪佩奇</p>
</body>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231020145.png" alt="image-20230323102043061" style="zoom:80%;" />

> 1. 有标签名，标签名必须写在前面。
> 2. id 选择器、通配选择器，理论上可以作为交集的条件，但实际应用中几乎不用 —— 因为没有意义。
> 3. 交集选择器中不可能出现两个元素选择器，因为一个元素，不可能即是p 元素又是span 元素。
> 4. 用的最多的交集选择器是：元素选择器配合类名选择器，例如： p.beauty 。

### 并集选择器⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212011801144.png" alt="image-20221201180125037" style="zoom:80%;" />

任何形式的选择器（包括标签选择器、class类选择器id选择器等），都可以作为并集选择器的一部分。

```css
/* p div span h1 文字颜色是红色 */
/* 选择器1, 选择器2 {} */
p, 
div, 
span, 
h1 {
    color: red;
}
```

### 选择器总结

| 选择器     | 作用                     | 特征                 | 使用情况 | 隔开符号及用法                          |
| ---------- | ------------------------ | -------------------- | -------- | --------------------------------------- |
| 后代选择器 | 用来选择元素后代         | 是选择所有的子孙后代 | 较多     | 符号是**空格** .nav a                   |
| 子代选择器 | 选择 最近一级元素        | 只选亲儿子           | 较少     | 符号是**>**   .nav>p                    |
| 交集选择器 | 选择两个标签交集的部分   | 既是 又是            | 较少     | **没有符号**  p.one                     |
| 并集选择器 | 选择某些相同样式的选择器 | 可以用于集体声明     | 较多     | 符号是**逗号** .nav, .header            |
| 伪类选择器 | 给链接更改状态           |                      | 较多     | 重点记住 a{} 和 a:hover  实际开发的写法 |

## 伪类选择器⭐

> 作用：选中特殊状态的元素。
>
> 如何理解“伪” ? — 虚假的，不是真的。
>
> 如何理解“伪类”？ — 像类( class )，但不是类，是元素的一种特殊状态。

### 动态伪类

> 什么是激活？—— 按下鼠标不松开。注意：遵循LVHA 的顺序，即： link 、visited 、hover 、active --> l**o**v**e   **hate 
>
> 因为a链接浏览器具有默认样式，所以我们实际工作中都需要给链接单独指定样式。

> :link 超链接**未被访问**的状态。
>
> :visited 超链接**访问过**的状态。
>
> :hover 鼠标**悬停**在元素上的状态。
>
> :active 元素**激活**的状态。

实际工作开发中，我们很少写全四个状态，一般我们写法如下：

```css
<style>
    /* 选中的是没有访问过的a元素 */
    a:link {
        color: orange;
    }
    /* 选中的是访问过的a元素 */
    a:visited {
        color: gray;
    }
    /* 选中的是鼠标悬浮状态的a元素 */
    a:hover {
        color: skyblue;
    }
    /* 选中的是激活状态的a元素 */
    a:active {
        color: green;
    }
    /* 选中的是鼠标悬浮的span元素 */
    span:hover {
        color: green;
    }
    /* 选中的是激活的span元素 */
    span:active {
        color: red;
    }
    /* 选中的是获取焦点状态的input元素、获取焦点状态的select元素 */
    input:focus,select:focus {
        color: orange;
        background-color: green;
    }
</style>
```

```html
<body>
    <a href="https://www.baidu.com">去百度</a>
    <a href="https://www.jd.com">去京东</a>
    <!-- 任何标签都可以添加伪类, 任何一个标签都可以鼠标悬停 -->
    <span>尚硅谷</span>
    <br>
    <input type="text">
    <br>
    <input type="text">
    <br>
    <input type="text">
    <select>
        <option value="beijing">北京</option>
        <option value="shanghai">上海</option>
    </select>
</body>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231056296.png" alt="image-20230323105631232" style="zoom:80%;" />

### 结构伪类

> 1. 作用：根据元素在HTML中的结构关系查找元素
> 2. 优势：减少对于HTML中类的依赖，有利于保持代码整洁
> 3. 场景：常用于查找某父级选择器中的子元素

#### 常用结构

> 1. :first-child 所有兄弟元素中的**第一个**。
> 2. :last-child 所有兄弟元素中的**最后一个**。
> 3. :nth-child(n) 所有兄弟元素中的**第 n 个**。
> 4. :first-of-type 所有**同类型**兄弟元素中的**第一个**。
> 5. :last-of-type 所有**同类型**兄弟元素中的**最后一个**。
> 6. :nth-of-type(n) 所有**同类型**兄弟元素中的 **第n个** 。

#### 关于n的值

> 1. 0 或不写：什么都选不中 —— 几乎不用。
> 2. n ：选中所有子元素 —— 几乎不用。
> 2. 4n：选择4的倍数的子元素
> 4. 1~正无穷的整数 ：选中对应序号的子元素。
> 5. 2n 或 even ：选中序号为偶数的子元素。
> 6. 2n+1 或 odd ：选中序号为奇数的子元素。
> 6. -n+3 ：选中的是前3 个。

#### 了解即可

> 1. :nth-last-child(n) 所有兄弟元素中的倒数第 n 个。
> 2. :nth-last-of-type(n) 所有同类型兄弟元素中的 倒数第n个 。
> 3. :only-child 选择没有兄弟的元素（独生子女）。
> 4. :only-of-type 选择没有同类型兄弟的元素。
> 5. :root 根元素。
> 6. :empty 内容为空元素（空格也算内容）。

#### 基本使用

```css
/* 选中的是div的第一个儿子p元素（按照所有兄弟计算的）*/
div>p:first-child
/* 选中的是div的最后一个儿子p元素（按照所有兄弟计算的）*/
div>p:last-child
/* 选中的是div的后代p元素，且p的父亲是谁无所谓，但p必须是其父亲的第一个儿子（按照所有兄弟计算的）*/
div p:first-child
/* 选中的是p元素，且p的父亲是谁无所谓，但p必须是其父亲的第一个儿子（按照所有兄弟计算的）*/
p:first-child
/* 选中的是div的第n个儿子p元素（按照所有兄弟计算的）*/
div>p:nth-child(3)
/* 选中的是div的偶数个儿子p元素（按照所有兄弟计算的） */
div>p:nth-child(2n)
/* 选中的是div的第一个儿子p元素（按照所有同类型兄弟计算的）*/
div>p:first-of-type
/* 选中的是div的最后一个儿子p元素（按照所有同类型兄弟计算的）*/
div>p:last-of-type
/* 选中的是div的第n个儿子p元素（按照所有同类型兄弟计算的）*/
div>p:nth-of-type(5)
```

```css
/* 选中div中倒数第n个的儿子p元素（按照所有兄弟）*/
div>p:nth-last-child(3)
/* 选中div中倒数第n个的儿子p元素（按照所有同类型的兄弟）*/
div>p:nth-last-of-type(2)
/* 选中的是没有兄弟的span元素 */
span:only-child
/* 选中的是没有同类型兄弟的span元素 */
span:only-of-type
/* 选中的是根元素 */
:root 
/* 选中的是没有内容的div元素 */
div:empty
```

```html
<!-- ul>li{这是第$个li}*8 -->
<ul>
    <li>这是第1个li</li>
    <li>这是第2个li</li>
    <li>这是第3个li</li>
    <li>这是第4个li</li>
    <li>这是第5个li</li>
    <li>这是第6个li</li>
    <li>这是第7个li</li>
    <li>这是第8个li</li>
</ul>
```

```css
<style>
    /* 选中的是根元素 */
    :root {
        background-color: gray;
    }
    /* 选中第一个 */
    li:first-child {
         background-color: green;
    }
  
    /* 最后一个 */
    li:last-child {
        background-color: red;
    }

    /* 任意一个 */
    li:nth-child(5) {
        background-color: orange;
    }

    /* 倒数第xx个 */
    li:nth-last-child(2) {
        background-color: blue;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210190900504.png" alt="image-20221019090018440" style="zoom:80%;" />

> ➢ 问题：在下列案例中，如果需要找到第一个a标签，如何去查找？

```html
<ul>
    <li>
        <a href="#">这是第1个li里面的a1</a>
        <a href="#">这是第1个li里面的a2</a>
        <!-- 选中第三个a -->
        <a href="#">这是第1个li里面的a3</a>
        <a href="#">这是第1个li里面的a4</a>
        <a href="#">这是第1个li里面的a5</a>
    </li>
    <li><a href="#">这是第2个li里面的a</a></li>
    <li><a href="#">这是第3个li里面的a</a></li>
    <li><a href="#">这是第4个li里面的a</a></li>
    <li><a href="#">这是第5个li里面的a</a></li>
    <li><a href="#">这是第6个li里面的a</a></li>
    <li><a href="#">这是第7个li里面的a</a></li>
    <li><a href="#">这是第8个li里面的a</a></li>
</ul>
```

```css
<style>
    /* 找到第一个li 里面的  第三个a  设置文字颜色是红色 */
    li:first-child a:nth-child(3) {
        color: red;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212120958046.png" alt="image-20221212095852959" style="zoom:80%;" />



### 否定伪类

> :not(选择器) 排除满足括号中条件的元素。

```css
<style>
    /* 选中的是div的儿子p元素，但是排除类名为fail的元素 */
    /* div>p:not(.fail) {
        color: red;
    } */

    /* 选中的是div的儿子p元素，但是排除title属性值以“你要加油”开头的 */
    /* div>p:not([title^="你要加油"]) {
        color: red;
    } */

    /* 选中的是div的儿子p元素，但排除第一个儿子p元素 */
    div>p:not(:first-child) {
        color: red;
    }
</style>
```

```html
<div>
    <p>张三：98分</p>
    <p>李四：88分</p>
    <p>王五：78分</p>
    <p>赵六：68分</p>
    <p class="fail" title="你要加油啊！孙七">孙七：58分</p>
    <p class="fail" title="你要加油啊！老八">老八：48分</p>
</div>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231444545.png" alt="image-20230323144450476" style="zoom:80%;" />

### UI伪类

> 1. :checked 被选中的复选框或单选按钮。
>
> 2. :enable 可用的表单元素（没有 disabled 属性）。
> 3. :disabled 不可用的表单元素（有disabled 属性）。

```css
<style>
    /* 选中的是勾选的复选框或单选按钮 */
    input:checked {
        width: 100px;
        height: 100px;
    }
    /* 选中的是被禁用的input元素 */
    input:disabled {
        background-color: gray;
    }
    /* 选中的是可用的input元素 */
    input:enabled {
        background-color: green;
    }

</style>
```

```html
<div>
    <input type="checkbox">
    <input type="radio" name="gender">
    <input type="radio" name="gender">
    <input type="text">
    <input type="text" disabled>
</div>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231449826.png" alt="image-20230323144942755" style="zoom:80%;" />

### 目标伪类 

> :target 选中锚点指向的元素。目标伪类演示，类似于锚点链接

```css
<style>
    div {
        background-color: gray;
        height: 300px;
    }
    div:target {
        background-color: green;
    }
</style>
```

```html
<body>
    <a href="#one">去看第1个</a>
    <a href="#two">去看第2个</a>
    <a href="#three">去看第3个</a>
    <a href="#four">去看第4个</a>
    <a href="#five">去看第5个</a>
    <a href="#six">去看第6个</a>

    <div id="one">第1个</div>
    <br>
    <div id="two">第2个</div>
    <br>
    <div id="three">第3个</div>
    <br>
    <div id="four">第4个</div>
    <br>
    <div id="five">第5个</div>
    <br>
    <div id="six">第6个</div>
</body>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231453011.png" alt="image-20230323145336908" style="zoom:80%;" />

### 语言伪类

> :lang() 根据指定的语言选择元素（本质是看lang 属性的值）。

```css
<style>
    div:lang(en) {
        color: red;
    }
    :lang(zh-CN) {
        color: green;
    }
</style>
```

```html
<body>
    <div>尚硅谷1</div>
    <div lang="en">尚硅谷2</div>
    <p>前端</p>
    <span>你好</span>
</body>
```

## 伪元素选择器

> 作用：选中元素中的一些特殊位置。

> - ::first-letter 选中元素中的**第一个文字**
> - ::first-line 选中元素中的**第一行文字**
> - ::selection 选中**被鼠标选中**的内容
> - ::placeholder 选中输入框的**提示文字**
> - ::before 在元素**最开始**的位置，创建一个子元素（必须用 content 属性指定内容）
> - ::after 在元素**最后的**位置，创建一个子元素（必须用 content 属性指定内容）

```css
<style>
    /* 什么是伪元素？ —— 很像元素，但不是元素（element），是元素中的一些特殊位置 */
    /* 选中的是div中的第一个文字 */
    div::first-letter {
        color: red;
        font-size: 40px;
    }
    /* 选中的是div中的第一行文字 */
    div::first-line {
        background-color: yellow;
    }
    /* 选中的是div中被鼠标选择的文字 */
    div::selection {
        background-color: green;
        color: orange;
    }
    /* 选中的是input元素中的提示文字 */
    input::placeholder {
        color: skyblue;
    }
    /* 选中的是p元素最开始的位置，随后创建一个子元素 */
    p::before {
        content:"￥";
    }
    /* 选中的是p元素最后的位置，随后创建一个子元素 */
    p::after {
        content:".00"
    }
</style>
```

```html
<body>
    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Sunt quibusdam amet eligendi velit dolore sequi,
        ex voluptatem facere, molestias unde exercitationem pariatur
        rem vero ut quidem quaerat aliquam</div>
    <br>
    <input type="text" placeholder="请输入您的用户名">
    <p>199</p>
    <p>299</p>
    <p>399</p>
    <p>499</p>
</body>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231502075.png" alt="image-20230323150252997" style="zoom:80%;" />

## 选择器优先级（权重）

> 通过不同的选择器，选中相同的元素 ，并且为相同的样式名设置不同的值时，就发生了样式的冲突。到底应用哪个样式，此时就需要看优先级了。

> 行内样式 > ID选择器 > 类选择器 > 元素选择器 > 通配选择器。

计算方式：每个选择器，都可计算出一组权重，格式为： (a,b,c)

> - a : ID 选择器的个数。
> - b : 类、伪类、属性 选择器的个数。
> - c : 元素、伪元素 选择器的个数。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231506526.png" alt="image-20230323150608450" style="zoom:80%;" />

> 比较规则：按照从左到右的顺序，依次比较大小，当前位胜出后，后面的不再对比，例如：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231507204.png" alt="image-20230323150724140" style="zoom:80%;" />

特殊规则：

> 1. 行内样式权重大于所有选择器。
> 2. !important 的权重，大于行内样式，大于所有选择器，权重最高！

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231508095.png" alt="image-20230323150810920" style="zoom:80%;" />



# 像素 & 颜色 & 字体⭐

## 像素

> 概念：我们的电脑屏幕是，是由一个一个“小点”组成的，每个“小点”，就是一个像素（px）。
>
> 规律：像素点越小，呈现的内容就越清晰、越细腻。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231745076.png" alt="image-20230323174538900" style="zoom:80%;" />

> 注意点：如果电脑设置中开启了缩放，那么就会影响一些工具的测量结果，但这无所谓，因为我们工作中都是参考详细的设计稿，去给元素设置宽高。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231748375.png" alt="image-20230323174810267" style="zoom:80%;" />

```css
<style>
    .atguigu1 {
        width: 1cm;
        height: 1cm;
        background-color: red;
    }
    .atguigu2 {
        width: 10mm;
        height: 10mm;
        background-color: green;
    }
    .atguigu3 {
        width: 100px;
        height: 100px;
        background-color: blue;
    }
</style>
```

```html
<body>
    <div class="atguigu1"></div>
    <br>
    <div class="atguigu2"></div>
    <br>
    <div class="atguigu3"></div>
</body>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231754430.png" alt="image-20230323175430361" style="zoom:80%;" />

## 颜色

### name

> 编写方式：直接使用颜色对应的英文单词，编写比较简单，例如：红色：red、绿色：green、蓝色：blue、紫色：purple、橙色：orange灰色：gray
>
> 颜色名这种方式，表达的颜色比较单一，所以用的并不多。
>
> 具体颜色名参考MDN 官方文档：https://developer.mozilla.org/en-US/docs/Web/CSS/named-color

### rgb 或 rgba

> 编写方式：使用 红、黄、蓝 这三种光的三原色进行组合。
>
> r 表示 红色、g 表示 绿色、b 表示 蓝色、a 表示 透明度

```css
/* 使用 0~255 之间的数字表示一种颜色 */
color: rgb(255, 0, 0);/* 红色 */
color: rgb(0, 255, 0);/* 绿色 */
color: rgb(0, 0, 255);/* 蓝色 */
color: rgb(0, 0, 0);/* 黑色 */
color: rgb(255, 255, 255);/* 白色 */
/* 混合出任意一种颜色 */
color:rgb(138, 43, 226) /* 紫罗兰色 */
color:rgba(255, 0, 0, 0.5);/* 半透明的红色 */
/* 也可以使用百分比表示一种颜色（用的少） */
color: rgb(100%, 0%, 0%);/* 红色 */
color: rgba(100%, 0%, 0%,50%);/* 半透明的红色 */
```

小规律

> 1. 若三种颜色值相同，呈现的是灰色，值越大，灰色越浅。
> 2. rgb(0, 0, 0) 是黑色， rgb(255, 255,255) 是白色。
> 3. 对于rbga 来说，前三位的rgb 形式要保持一致，要么都是0~255 的数字，要么都是百分比。

### hex | hexa

> HEX 的原理同与 rgb 一样，依然是通过：红、绿、蓝色 进行组合，只不过要用 6位（分成3组） 来表达，
>
> 格式为：# rr gg bb     注意点： IE 浏览器不支持HEXA ，但支持HEX

> 每一位数字的取值范围是： 0 ~ f ，即：（ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, a, b, c,d, e, f ）
>
> 所以每一种光的最小值是： 00 ，最大值是： ff

```css
color: #ff0000;/* 红色 */
color: #00ff00;/* 绿色 */
color: #0000ff;/* 蓝色 */
color: #000000;/* 黑色 */
color: #ffffff;/* 白色 */
/* 如果每种颜色的两位都是相同的，就可以简写*/
color: #ff9988;/* 可简为：#f98 */
/* 但要注意前三位简写了，那么透明度就也要简写 */
color: #ff998866;/* 可简为：#f986 */
```

### hsl | hsla

> HSL 是通过：色相、饱和度、亮度，来表示一个颜色的，格式为： hsl(色相,饱和度,亮度)
>
> 色相：取值范围是0~360 度，具体度数对应的颜色如下图：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303231757890.png" alt="image-20230323175740755" style="zoom:80%;" />

> 饱和度：取值范围是0%~100% 。（向色相中对应颜色中添加灰色， 0% 全灰， 100% 没有灰）
>
> 亮度：取值范围是0%~100% 。（ 0% 亮度没了，所以就是黑色。100% 亮度太强，所以就是白色了）
>
> HSLA 其实就是在HSL 的基础上，添加了透明度。

## 常用字体属性

### font-size:大小

> font-size属性用于设置字号，浏览器默认字体大小是16px
>

~~~css
p {  
    font-size:20px; 
}
~~~

> - 可以使用相对长度单位，也可以使用绝对长度单位。
> - 相对长度单位比较常用，推荐使用像素单位px，绝对长度单位使用较少。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924102054580.png" alt="image-20210924102054580" style="zoom:80%;" />

> * 我们文字大小以后，基本就用px了，其他单位很少使用。
> * Chrome 浏览器支持的最小文字为12px ，默认的文字大小为16px ，并且0px 会自动消失。
> * 不同浏览器默认的字体大小可能不一致，所以最好给一个明确的值，不要用默认大小。一般给body指定整个页面文字的大小。
> 3. 通常以给 body 设置font-size 属性，这样body 中的其他元素就都可以继承了。

### font-family:字体⭐

#### 字体使用

font-family属性用于设置哪一种字体。 

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210161046014.png" alt="image-20221016104657932" style="zoom:80%;" />

~~~css
p { 
    font-family:"微软雅黑";
}
~~~

> - 网页中常用的字体有宋体、微软雅黑、黑体等，例如将网页中所有段落文本的字体设置为微软雅黑
> - 可以同时指定多个字体，中间以逗号隔开，表示如果浏览器不支持第一个字体，则会尝试下一个，直到找到合适的字体， 如果都没有，则以我们电脑默认的字体为准。

```css
div {
    /* font-family: 宋体; */
    /* 如果用户电脑没有安装微软雅黑, 就按黑体显示文字 */
    /* 如果电脑没有安装黑体, 就按任意一种非衬线字体系列显示 */
    font-family: 微软雅黑, 黑体, sans-serif;
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210161234560.png" alt="image-20221016123448492" style="zoom:80%;" />

#### 常见字体系列⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210161045883.png" alt="image-20221016104538598" style="zoom:80%;" />

#### CSS Unicode字体

> - 在 CSS 中设置字体名称，直接写中文是可以的。但是在文件编码（GB2312、UTF-8 等）不匹配时会产生乱码
> - 为什么使用 Unicode字体？xp 系统不支持 类似微软雅黑的中文。

解决方案：

> - 方案一： 你可以使用英文来替代。 比如` font-family:"Microsoft Yahei"`。
> - 方案二： 在 CSS 直接使用 Unicode 编码来写字体名称可以避免这些错误。

```css
font-family: "\5FAE\8F6F\96C5\9ED1";   表示设置字体为“微软雅黑”。
```

| 字体名称    | 英文名称        | Unicode 编码         |
| ----------- | --------------- | -------------------- |
| 宋体        | SimSun          | \5B8B\4F53           |
| 新宋体      | NSimSun         | \65B0\5B8B\4F53      |
| 黑体        | SimHei          | \9ED1\4F53           |
| 微软雅黑    | Microsoft YaHei | \5FAE\8F6F\96C5\9ED1 |
| 楷体_GB2312 | KaiTi_GB2312    | \6977\4F53_GB2312    |
| 隶书        | LiSu            | \96B6\4E66           |
| 幼园        | YouYuan         | \5E7C\5706           |
| 华文细黑    | STXihei         | \534E\6587\7EC6\9ED1 |
| 细明体      | MingLiU         | \7EC6\660E\4F53      |
| 新细明体    | PMingLiU        | \65B0\7EC6\660E\4F53 |

为了照顾不同电脑的字体安装问题，我们尽量只使用宋体和微软雅黑中文字体



### font-weight:粗细

在html中如何将字体加粗我们可以用标签来实现，使用 b  和 strong 标签是文本加粗。lighter ：细、normal ： 正常

bold ：粗、bolder ：很粗 （多数字体不支持）

| 属性值  | 描述                                                      |
| ------- | :-------------------------------------------------------- |
| normal  | 默认值（不加粗的）                                        |
| bold    | 定义粗体（加粗的）                                        |
| 100~900 | 400 等同于 normal，而 700 等同于 bold  我们重点记住这句话 |

> **提倡：  我们平时更喜欢用数字来表示加粗和不加粗。**
>
> 100~1000 且无单位，数值越大，字体越粗 （或一样粗，具体得看字体设计时的精确程度）。
>
> 100~300 等同于lighter ， 400~500 等同于normal ， 600 及以上等同于bold 。

```css
div {
    /* 加粗 */
    font-weight: 700;
}

h1 {
    /* 不加粗 */
    font-weight: 400;
}
```

### font-style:风格

> 在html中如何将字体倾斜我们可以用标签来实现,字体倾斜除了用 i  和 em 标签，font-style属性用于定义字体风格，如设置斜体、倾斜或正常字体，其可用属性值如下：
>

| 属性   | 作用                                                    |
| ------ | :------------------------------------------------------ |
| normal | 默认值，浏览器会显示标准的字体样式  font-style: normal; |
| italic | 浏览器会显示斜体的字体样式。                            |

> **平时我们很少给文字加斜体，反而喜欢给斜体标签（em，i）改为普通模式**。

```less
div {
    /* 倾斜 */
    font-style: italic;
}

em {
    /* 正常的, 不倾斜 */
    font-style: normal;
}
```

### font:综合设置字体样式 (重点)

font属性用于对字体样式进行综合设置

基本语法格式如下：

```css
选择器 { 
font:  font-style  font-weight  font-size/line-height  font-family;
}
```

> - 使用font属性时，**不能更换顺序，**各个属性以**空格**隔开。
> - 其中**不需要设置的属性可以省略（取默认值）**，但**必须保留font-size和font-family属性**，否则font 不起作用。

```css
.atguigu {
    font: bold italic 100px "STCaiyun","STHupo",sans-serif;
}
```

### font 总结

| 属性        | 表示     | 注意点                                                       |
| :---------- | :------- | :----------------------------------------------------------- |
| font-size   | 字号     | 我们通常用的单位是px 像素，一定要跟上单位                    |
| font-family | 字体     | 实际工作中按照团队约定来写字体                               |
| font-weight | 字体粗细 | 记住加粗是 700 或者 bold  不加粗 是 normal 或者  400  记住数字不要跟单位 |
| font-style  | 字体样式 | 记住倾斜是 italic     不倾斜 是 normal  工作中我们最常用 normal |
| font        | 字体连写 | 1. 字体连写是有顺序的  不能随意换位置 2. 其中字号 和 字体 必须同时出现 |

## 常用文本属性

### 文本颜色

> 属性名： color，作用：控制文字的颜色。
>
> 可选值：颜色名、rgb 或rgba、HEX 或HEXA （十六进制）、HSL 或HSLA
>
> 开发中常用的是： rgb/rgba 或 HEX/HEXA （十六进制）。

```css
<style>
    div {
        font-size: 90px;
    }

    .atguigu1 {
        color: red;
        color: rgb(255, 0, 0);
        color: rgba(255, 0, 0, .5);
        color: #00f;
        color: hsl(0, 100%, 50%);
        color: hsla(0, 100%, 50%, .5);
        background-color: orange;
    }
</style>
```

### 文本间距

> 字母间距： letter-spacing
>
> 单词间距： word-spacing （通过空格识别词）
>
> 属性值为像素（ px ），正值让间距增大，负值让间距缩小。

```css
<style>
    div {
        font-size: 30px;
    }
    .atguigu2 {
        /* 字母间距 */
        letter-spacing: 20px;
    }
    .atguigu3 {
        /* 单词间距 */
        word-spacing: 20px;
    }
</style>
```

```html
<div>
    <div>You got a dream, you gotta protect it.尚硅谷1</div>
    <div class="atguigu2">You got a dream, you gotta protect it.尚硅谷2</div>
    <div class="atguigu3">You got a dream, you gotta protect it.尚硅谷3</div>
</div>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303240948174.png" alt="image-20230324094821074" style="zoom:80%;" />

### 文本修饰

> 属性名： text-decoration。作用：控制文本的各种装饰线。通常我们用于给链接修改装饰效果
>
> 可选值：none ： 无装饰线（常用）、underline ：下划线（常用）、overline ： 上划线、line-through ： 删除线
>
> 可搭配如下值使用：dotted ：虚线、wavy ：波浪线、也可以指定颜色

```css
a {
    text-decoration: none;
}
```

| 值           | 描述                                                  |
| ------------ | ----------------------------------------------------- |
| none         | 默认。定义标准的文本。 取消下划线（最常用）           |
| underline    | 定义文本下的一条线。下划线 也是我们链接自带的（常用） |
| overline     | 定义文本上的一条线。（不用）                          |
| line-through | 定义穿过文本下的一条线。（不常用）                    |

### 文本缩进

> 属性名： text-indent 。作用：控制文本首字母的缩进。属性值： css 中的长度单位，例如： px

> - 其属性值可为不同单位的数值、em字符宽度的倍数、或相对于浏览器窗口宽度的百分比%，允许使用负值,
> - 建议使用em作为设置单位。（**推荐：1em = 当前标签的font-size的大小**）
> - **1em 就是一个字的宽度   如果是汉字的段落， 1em 就是一个汉字的宽度**

~~~css
p {
   /*行间距*/
   line-height: 25px;
   /*首行缩进2个字，1个em 就是1个字的大小*/
   text-indent: 2em;  
 }
~~~

### 对齐_水平

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210161228342.png" alt="image-20221016122837271" style="zoom:67%;" />                   <img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210161228998.png" alt="image-20221016122853921" style="zoom:69%;" />

> text-align属性用于设置文本内容的水平对齐，相当于html中的align对齐属性，**给父盒子设置**

> text-align : center 能让哪些元素水平居中？
>
> **文本、span标签、a标签、input标签、img标签**
>
> 注意点：**如果需要让以上元素水平居中， text-align : center 需要给以上元素的 父元素 设置**

其可用属性值如下：

| 属性   |       解释       |
| ------ | :--------------: |
| left   | 左对齐（默认值） |
| right  |      右对齐      |
| center |     居中对齐     |

注意：是让盒子里面的内容水平居中， 而不是让盒子居中对齐

```html
<div class="news">
    <h1>新闻标题</h1>
    <img src="./images/1.jpg" alt="">
</div>
```

```css
<style>
    .news {
        text-align: center;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212011723483.png" alt="image-20221201172346335" style="zoom: 50%;" />

### 对齐_垂直

> 1. 顶部：无需任何属性，在垂直方向上，默认就是顶部对齐。
>
> 2. 居中：对于单行文字，让height = line-height 即可。问题：多行文字垂直居中怎么办？—— 后面用定位去做
>
> 3. 底部：对于单行文字，目前一个临时的方式：让line-height = ( height × 2 ) - font-size - x 。
>
>    备注： x 是根据字体族，动态决定的一个值。问题：垂直方向上的底部对齐，更好办法是什么？—用定位去做

 行高我们利用最多的一个地方是： 可以让单行文本在盒子中垂直居中对齐。

> **文字的行高等于盒子的高度。**

这里情况些许复杂，开始学习，我们可以先从简单地方入手学会。

行高   =  上距离 +  内容高度  + 下距离 

![image-20210924121153688](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924121153688.png)

上距离和下距离总是相等的，因此文字看上去是垂直居中的。

**行高和高度的三种关系**

> - 如果 行高 等 高度  文字会 垂直居中
> - 如果行高 大于 高度   文字会 偏下 
> - 如果行高小于高度   文字会  偏上 

### 行高⭐

> 由于字体设计原因，文字最终呈现的大小，并不一定与 font-size 的值一致，可能大，也可能小。例如： font-size 设为40px ，最终呈现的文字，可能比 40px 大，也可能比 40px小。通常情况下，文字相对字体设计框，并不是垂直居中的，通常都靠下 一些。

#### 使用方法

> line-height属性用于设置行间距，就是行与行之间的距离，即字符的垂直间距，一般称为行高。单位：line-height常用的属性值单位有三种，分别为像素px，相对值em和百分比%，实际工作中使用最多的是像素px可以使用行高来分开文字之间的距离。一般情况下，行距比字号大7，8像素左右就可以了
>

```css
div {
   /* 第一种写法，值为像素 */
   line-height: 40px;

   /* 第二种写法，值为normal */
   line-height: normal; 

   /* 第三种写法，值为数值，参考自身font-size 的倍数—— 用的比较多 */
   line-height: 1.5;

   /* 第四种写法，值为百分比，参考自身font-size 的百分比 */
   line-height: 150%;
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210161223407.png" alt="image-20221016122347321" style="zoom:80%;" />

#### 行高测量

行高的测量方法：

​             <img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924121120910.png" alt="image-20210924121120910" style="zoom: 67%;" />

#### 行高注意事项

> line-height 过小会怎样？—— 文字产生重叠，且最小值是0 ，不能为负数。

```css
/* 注意点1：行高过小会怎样？ —— 文字重叠，且最小值是0，不能为负数。 */
#d1 {
    font-size: 40px;
    background-color: skyblue;
    line-height: 0px;
}
```

> line-height 是可以继承的，且为了能更好的呈现文字，最好写数值。

```css
/* 注意点2：行高是可以继承的 */
#d2 {
    font-size: 40px;
    background-color: orange;
    line-height: 1.5;
}
span {
    font-size: 200px;
    color: red;
}
```

> line-height 和height 关系？设置height ，那么高度就是height 的值。不设置height ，根据line-height计算高度

```css
/* 注意点3：line-height和height是什么关系。设置了height，高度就是height的值。没有设置height，高度就是 line-height*行数*/
#d3 {
    font-size: 40px;
    background-color: yellowgreen;
    line-height: 100px;
}

#d4 {
    font-size: 40px;
    background-color: skyblue;
    line-height: 0px;
}
```

#### 应用场景

> 对于多行文字：**控制行与行之间的距离**。

```css
/* 行高的应用场景1：调整多行文字的间距 */
#d5 {
    font-size: 40px;
    background-color: skyblue;
    line-height: 100px;
}
```

> 对于单行文字：让height 等于line-height ，**可以实现文字垂直居中**。备注：由于字体设计原因，靠上述办法实现的居中，并不是绝对的垂直居中，但如果一行中都是文字，不会太影响观感。

```css
/* 行高的应用场景2：单行文字的垂直居中 */
#d6 {
    font-size: 40px;
    background-color: skyblue;
    height: 300px;
    line-height: 300px;
}
```

### vertical-align

> 属性名： vertical-align 。作用：用于指定同一行元素之间，或 表格单元格 内文字的 垂直对齐方式。
>
> 常用值：
>
> 1. baseline （默认值）：使元素的基线与父元素的基线对齐。
> 2. top ：使元素的顶部与其所在行的顶部对齐。
> 3. middle ：使元素的中部与父元素的基线加上父元素字母x 的一半对齐。
> 4. bottom ：使元素的底部与其所在行的底部对齐。特别注意： vertical-align 不能控制块元素。

```css
<style>
    div {
        font-size: 18px;
        height: 60px;
        background-color: skyblue;
    }
    span {
        font-size: 40px;
        background-color: orange;
        vertical-align: middle;
    }
    img {
        height: 30px;
        vertical-align: top;
    }
    .san {
        vertical-align: bottom;
    }
</style>
```

### 文本属性总结

| 属性            | 表示     | 注意点                                                  |
| :-------------- | :------- | :------------------------------------------------------ |
| color           | 颜色     | 我们通常用  十六进制   比如 而且是简写形式 #fff         |
| line-height     | 行高     | 控制行与行之间的距离                                    |
| text-align      | 水平对齐 | 可以设定文字水平的对齐方式                              |
| text-indent     | 首行缩进 | 通常我们用于段落首行缩进2个字的距离   text-indent: 2em; |
| text-decoration | 文本修饰 | 记住 添加 下划线  underline  取消下划线  none           |

### 全屏铺满自适应⭐

> 一张清晰漂亮的背景图片能给网页加分不少，设计师也经常会给页面的背景使用大图，我们既不想图片因为不同分辨率图片变形，也不希望当在大屏的情况下，背景有一块露白，简而言之，就是实现能自适应屏幕大小又不会变形的背景大图，而且背景图片不会随着滚动条滚动而滚动。

> 给body标签指定背景图，这样背景图就可以填充整个浏览器viewport了。其实，该方案对所有的块级容器都可以生效。块级容器的宽高是动态的，那么背景图将自动伸缩，充满整个容器。

```css
body {
	/* 加载背景图 */
	background-image: url(images/bg.jpg);
	/* 背景图垂直、水平均居中 */
	background-position: center center;
	/* 背景图不平铺 */
	background-repeat: no-repeat;
	/* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
	background-attachment: fixed;
	/* 让背景图基于容器大小伸缩 */
	background-size: cover;
	/* 设置背景颜色，背景图加载过程中会显示背景色 */
	background-color: #464646;
}
```

## 新增背景属性

### background-origin

作用：设置背景图的原点。

> 1. padding-box ：从padding 区域开始显示背景图像。—— 默认值
> 2. border-box ： 从border 区域开始显示背景图像。
> 3. content-box ： 从content 区域开始显示背景图像。

```html
<div class="box1">你好啊</div>
```

```css
<style>
    .box1 {
        width: 400px;
        height: 400px;
        background-color: skyblue;
        margin: 0 auto;
        font-size: 40px;
        padding: 50px;
        border: 50px dashed rgba(255, 0, 0, 0.7);
        /* 设置背景图 */
        background-image: url('../images/bg01.jpg');
        background-repeat: no-repeat;
        background-origin: border-box;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303261641096.png" alt="image-20230326164136962" style="zoom:50%;" />

### background-clip⭐

作用：设置背景图的向外裁剪的区域。

> 1. border-box ： 从border 区域开始向外裁剪背景。 —— 默认值
> 2. padding-box ： 从padding 区域开始向外裁剪背景。
> 3. content-box ： 从content 区域开始向外裁剪背景。
> 4. text ：背景图只呈现在文字上。注意：若值为text ，那么backgroun-clip 要加上-webkit- 前缀。

```html
<div class="box1">你好啊</div>
```

```css
<style>
    .box1 {
        width: 300px;
        height: 300px;
        background-color: skyblue;
        margin: 0 auto;
        font-size: 120px;
        font-weight: bold;
        padding: 50px;
        border: 50px dashed rgba(255, 0, 0, 0.7);
        /* 文字必须是透明的 */
        color: transparent;
        /* 设置背景 */
        background-image: url('../images/bg02.jpg');
        background-repeat: no-repeat;
        background-origin: border-box;
        -webkit-background-clip: text;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303261646803.png" alt="image-20230326164640715" style="zoom:67%;" />

### background-size

作用：设置背景图的尺寸。

> 1. 用长度值指定背景图片大小，不允许负值。background-size: 300px 200px;
> 2. 用百分比指定背景图片大小，不允许负值。background-size: 100% 100%;
> 3. auto ： 背景图片的真实大小。 —— 默认值
> 4. contain ： 将背景图片等比缩放，使背景图片的宽或高，与容器的宽或高相等，再将完整背景图片包含在容器内，但要注意：可能会造成容器里部分区域没有背景图片。background-size: contain;
> 5. cover ：将背景图片等比缩放，直到完全覆盖容器，图片会尽可能全的显示在元素上，但要注意：背景图片有可能显示不完整。—— **相对比较好的选择**。background-size: cover;

```html
<div></div>
```

```css
div {
    width: 400px;
    height: 400px;
    padding: 50px;
    border: 50px dashed rgba(255, 0, 0, 0.7);
     background-image: url('../images/bg03.jpg');
     background-repeat: no-repeat;
     /*background-size: 400px 400px;*/
    /* background-size: 100% 100%; */
    /* background-size: contain; */
    background-size: cover;
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303261648398.png" alt="image-20230326164844160" style="zoom:50%;" />

### backgorund 复合属性

```css
background: color url repeat position / size origin clip
```

> 1. origin 和 clip 的值如果一样，如果只写一个值，则origin 和 clip 都设置；如果设置了两个值，前面的是origin ，后面的clip 。
> 2. size 的值必须写在 position 值的后面，并且用 / 分开。

```html
<div class="box1">你好啊</div>
```

```css
<style>
    .box1 {
        width: 400px;
        height: 400px;
        margin: 0 auto;
        font-size: 40px;
        padding: 50px;
        border: 50px dashed rgba(255, 0, 0, 0.7);
        /* background: 背景颜色 背景url 是否重复 位置 / 大小 原点 裁剪方式; */
        background:skyblue url('../images/bg03.jpg') no-repeat 10px 10px / 500px 500px 
                           border-box content-box;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303261652764.png" alt="image-20230326165249605" style="zoom: 33%;" />

### 多背景图

CSS3 允许元素设置多个背景图片

```html
<div></div>
```

```css
<style>
    div {
        width: 400px;
        height: 400px;
        border: 1px solid black;
        background: url('../images/bg-lt.png') no-repeat left top,
                    url('../images/bg-rt.png') no-repeat right top,
                    url('../images/bg-lb.png') no-repeat left bottom,
                    url('../images/bg-rb.png') no-repeat right bottom;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303261653252.png" alt="image-20230326165343164" style="zoom:50%;" />

## 鼠标

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303241043265.png" alt="image-20230324104312148" style="zoom:80%;" />

```css
<style>
    div {
        width: 400px;
        height: 400px;
        background-color: skyblue;
        /* 扩展：自定义鼠标光标 */
        cursor: url("../images/arrow.png"),pointer;
    }
    button {
        cursor: pointer;
    }
    input {
        cursor: move;
    }
</style>
```

```html
<div>
    把鼠标放进来看一看
    <input type="text">
    <a href="#">百度</a>
    <button>点我</button>
</div>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303241045629.png" alt="image-20230324104524524" style="zoom:80%;" />

# 三大特性⭐

## 层叠性

> 1. **层叠就是覆盖，后面的属性覆盖前面的属性**
> 2. 给同一个标签设置相同的样式 → 此时样式会层叠覆盖 → **最终写在最后的样式会生效**
> 3. **当样式冲突时，只有当选择器优先级相同时，才能通过层叠性判断结果**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924121957928.png" alt="image-20210924121957928" style="zoom:80%;" />

> 所谓层叠性是指多种CSS样式的叠加。是浏览器处理冲突的一个能力,如果一个属性通过两个相同选择器设置到同一个元素上，那么这个时候一个属性就会将另一个属性层叠掉
>

> 原则：样式冲突，遵循的原则是**就近原则。** 那个样式离着结构近，就执行那个样式。样式不冲突，不会层叠
>

> CSS层叠性最后的执行口诀：  长江后浪推前浪，前浪死在沙滩上。

## 继承性

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210161500292.png" alt="image-20221016150023197" style="zoom:80%;" />

![image-20210924122105491](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924122105491.png)

> 恰当地使用继承可以简化代码，降低CSS样式的复杂性。比如有很多子级孩子都需要某个样式，可以给父级指定一个，这些孩子继承过来就好了。CSS继承性口诀：  龙生龙，凤生凤，老鼠生的孩子会打洞。

 **常见应用场景**

> 1. 可以直接给ul设置 list-style:none 属性，从而去除列表默认的小圆点样式
>
> 2. 直接给body标签设置统一的font-size，从而统一不同浏览器默认文字大小

**继承失效的特殊情况**

如果元素有浏览器默认样式，此时继承性依然存在，但是优先显示浏览器的默认样式

1. a标签的color会继承失效，其实color属性继承下来了，但是被浏览器默认设置的样式给覆盖掉了

2. h系列标签的font-size会继承失效，其实font-size属性继承下来了，但是被浏览器默认设置的样式给覆盖掉了

## 优先级⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210161505493.png" alt="image-20221016150547396" style="zoom:80%;" />

![image-20210924122404894](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924122404894.png)

定义CSS样式时，经常出现两个或更多规则应用在同一元素上，此时，

> * 选择器相同，则执行层叠性
> * 选择器不同，就会出现优先级的问题。

### 权重叠加计算

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210161507578.png" alt="image-20221016150723485" style="zoom: 67%;" />

### 权重计算公式

关于CSS权重，我们需要一套计算公式来去计算，这个就是 CSS Specificity（特殊性）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210161508875.png" alt="image-20221016150803788" style="zoom:80%;" />

| 标签选择器             | 计算权重公式 |
| ---------------------- | ------------ |
| 继承或者 *通配符       | 0,0,0,0      |
| 每个元素（标签选择器） | 0,0,0,1      |
| 每个类，伪类           | 0,0,1,0      |
| 每个ID                 | 0,1,0,0      |
| 每个行内样式 style=""  | 1,0,0,0      |
| 每个!important  重要的 | ∞ 无穷大     |

> - 值从左到右，左面的最大，一级大于一级，数位之间没有进制，级别之间不可超越。 
>
> - 关于CSS权重，我们需要一套计算公式来去计算，这个就是 CSS Specificity（特殊性）

### 权重叠加计算⭐

我们经常用交集选择器，后代选择器等，是有多个基础选择器组合而成，那么此时，就会出现权重叠加。

就是一个简单的加法计算

- div ul  li   ------>      0,0,0,3
- .nav ul li   ------>      0,0,1,2
- a:hover      -----—>   0,0,1,1
- .nav a       ------>      0,0,1,1

> 注意： 数位之间没有进制 比如说： 0,0,0,5 + 0,0,0,5 =0,0,0,10 而不是 0,0, 1, 0， 所以不会存在10个div能赶上一个类选择器的情况。

```less
/* (行内, id, 类, 标签) */

/* (0, 1, 0, 1) */
div #one {
  color: orange;
}

/* (0, 0, 2, 0) */
.father .son {
  color: skyblue;
}

/* 0, 0, 1, 1 */
.father p {
  color: purple;
}

/* 0, 0, 0, 2 */
div p {
  color: pink;
} 
```

### 继承的权重是0

这个不难，但是忽略很容易绕晕。其实，我们修改样式，一定要看该标签有没有被选中。

> 1） 如果选中了，那么以上面的公式来计权重。谁大听谁的。 
>
> 2） 如果没有选中，那么权重是0，因为继承的权重为0.

### 计算题⭐⭐

#### 第1题：普通题

```less
<style>
   /* (行内, id, 类, 标签) */
   /* !important 最高 */
   /* 继承: 最低 */
   /* (0, 2, 0, 0) */
   #father #son {
      color:blue; 
   } 
   
   /* (0, 1, 1, 1) */
   #father p.c2 {
      color:black;
   } 
   
   /* (0, 0, 2, 2) */
   div.c1 p.c2 {
      color:red;
   } 

   /* 继承, 最低 */
   #father { 
      color:green !important;
   } 

   /* 继承, 最低 */
   div#father.c1 {
      color: yellow ;
   } 

</style>
```

```html
<div id="father" class="c1">
   <p id="son" class="c2">
      这行文本是什么颜色的？ 
   </p>
</div>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212112130612.png" alt="image-20221211213029532" style="zoom:80%;" />

#### 第2题: 标签选择器选择一类

```css
<style>
   /* (行内, id, 类, 标签) */
   /* !important 最高 */
   /* 继承: 最低 */
   /* 2 */
  div div {
      color: skyblue;
   } 

   /* 1 */
   div {
      color: red;
   }
</style>
```

```html
<div>
   <div>
      <div>
         这行文本是什么颜色？
      </div>
   </div>
</div>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212112129812.png" alt="image-20221211212929727" style="zoom:80%;" />

#### 第3题: 权重叠加每位不存在进制

```css
<style>
   /* (行内, id, 类, 标签) */
   div div div div div div div div div div div div {  
      color: red;
   }
   
   .one { 
      color: pink;
   }
</style>
```

```html
<div>
   <div>
      <div>
         <div>
            <div>
               <div>
                  <div>
                     <div>
                        <div>
                           <div>
                              <div>
                                 <div class="one">这行文字是什么颜色的？</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212112131851.png" alt="image-20221211213140772" style="zoom:80%;" />

#### 第4题：权重相同此时比较层叠性

```css
<style>
   /* (0, 0, 2, 1) */
   .c1 .c2 div { 
      color: blue;
   }

   /* (0, 1, 0, 1) */
   div #box3 {
      color:green;
   }
   
   /* (0, 1, 0, 1) */
   #box1 div {
      color:yellow;
   }
</style>
```

```html
<div id="box1" class="c1">
   <div id="box2" class="c2">
      <div id="box3" class="c3">
         这行文本是什么颜色的？
      </div>
   </div>
</div>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212112133709.png" alt="image-20221211213311615" style="zoom:80%;" />

#### 第5题: 全是继承的特殊情况

```css
<style>
   /* 都是继承, 继承里面谁高, 看继承哪个父级, 哪个父级高, 哪个选择器生效 */

   /* 继承 */
   div p {
      color:red;
   } 

   /* 继承 */
   .father {
      color:blue;
   } 
</style>
```

```html
<div class="father">
   <p class="son"> 
      <span>文字</span>
   </p>
</div>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212112134312.png" alt="image-20221211213425221" style="zoom:80%;" />

### 样式查错流程

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210161508878.png" alt="image-20221016150844797" style="zoom:80%;" />

# 背景图 & img标签

在开发中，我们可以使用 HTML 中的`<img>`标签来设置图片，也可以使用 CSS 背景来设置图片。除此之外，还可以使用 SVG `<image>` 来设置图片。那这些方式之间有哪些区别呢？下面就来看看这些方法都是怎么使用的，它们都有哪些优缺点，以及何时该使用哪种方法！

## img 标签

在最简单的情况下，img 元素必须包含 src 属性：

```less
<img src="cool.jpg" alt="">
```

### 设置宽高

在页面加载时，它们会在页面图像加载时发生一些布局变化。为避免这种情况，可以为其设置 `height` 和 `width` 属性：

```less
<img src="cool.jpg" width="200" height="100" alt="">
```

这样设置有什么作用呢？来看效果：

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMMBcw1Jgicb5ialAo7VqrDZFDcyvN151Z8Q8jeISBibia1iccM3QXbISbqu6RCduOHB2qzh9dc91IBd9CQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

可以看到，右侧的图像在加载完之前，已经提前保留了空间，这就是设置了 `height` 和 `width` 属性的缘故。

### 隐藏图像

可以使用 CSS 来隐藏图像，但是隐藏之后，它仍将加载到页面中。

```less
img {
  display: none;
}
```

这段代码不会阻止浏览器加载图像，即使它在视觉上是隐藏的。原因是 `<img>` 被认为是**可替换元素**，所以无法控制它加载的内容。

> 在 CSS 中，可替换元素的展现效果不是由 CSS 来控制的。这些元素是一种外部对象，它们外观的渲染，是独立于 CSS 的。
>
> 
>
> 简单来说，它们的内容不受当前文档的样式的影响。CSS 可以影响可替换元素的位置，但不会影响到可替换元素自身的内容。某些可替换元素，例如 `<iframe>` 元素，可能具有自己的样式表，但它们不会继承父文档的样式。

### 图像可访问性

HTML图 像可以通过将`alt`属性设置为有意义的描述来访问。这对屏幕阅读器用户非常有用。

如果不需要 `alt` 描述，也不要删除它。如果删除了，图像 src 将被读出，这对可访问性非常不利。

来看下面两个图片：

```less
<img class="food-thumb" width="300" height="200" src="cheescake.jpg">

<img class="food-thumb" width="300" height="200" src="cheescake.jpg" alt="">
```

这里，src 都无效且未加载。第一个没有设置 `alt` 属性，而第二个设置了一个空的 `alt` 属性。效果如下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMBcw1Jgicb5ialAo7VqrDZFDQtDuWhQZDlG0GqJZDnnv0jIAz15xW9L9GFSprD5JbsomFXpfwPgiaOw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)没有 `alt` 的图像仍然保留其空间，这不利于可访问性。而另一个折叠以适应其空 `alt` 属性的内容，这导致它由于具有边框而显示为一个小点。

但是，当有 `alt` 属性值时，它会是这样的：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMBcw1Jgicb5ialAo7VqrDZFDPOgz68icskbeQDlqEYD2v2sU8uy8zFxhopXa4HM0yYgvicNyl7piciaicEg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)这样可以更好的向用户反馈，让用户知道这个加载失败的图片内容是什么。

除此之外，我们还可以使用**伪元素**来替换显示的默认替代文本，方法是将伪元素放置在默认文本的顶部，将其隐藏起来。

```less
img:after { 
  content: "\f1c5" " " attr(alt);

  font-size: 16px;
  font-family: FontAwesome;
  color: rgb(100, 100, 100);

  display: block;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
```

效果如下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMBcw1Jgicb5ialAo7VqrDZFDEf2Z9pbyX1cDawr9q9bDRayPZVY1XOmufgbjgCMZY1wgaNkQE8eojA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 响应式图像

<img> 的好处是它可以扩展为具有特定视口大小的图片的多个版本。

#### （1）srcset 属性

```less
<img src="small.jpg" srcset="medium.jpg 500w, large.jpg 800w" alt="">
```

这是一个很简单的例子。不过，srcset 并不是根据屏幕宽度显示多个图像尺寸的完美解决方案。浏览器会选择合适的图像，我们无法控制。

#### （2）HTML picture 元素

```less
<picture>
  <source srcset="large.jpg" media="(min-width: 800px)" />
  <source srcset="medium.jpg" media="(min-width: 500px)" />
  <img src="small.jpg" />
</picture>
```

另一种方式就是使用 `<picture>` 元素。这种方式更容易且更可预测。

### 调整图像大小

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMBcw1Jgicb5ialAo7VqrDZFDXwSdIUSicUDDNYHN6SGN857iaZB2icC2icAUQXavibmhL9Ho2rrJgETbcnA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)CSS 中的 object-fit 和 object-position 属性可以与 `<img>` 标签一起使用。使用它们可以控制 `<img>` 的内容如何调整大小和定位，就像 CSS 背景图一样。

> object-fit 的可能值为：fill、contain、cover、none、scale-down

可以这样使用：

```less
img {
  object-fit: cover;
  object-position: 50% 50%;
}
```

介绍完 `<img>` 元素，下面来看看 CSS 中的背景图。

## 背景图

要想设置背景图，首先需要一个 HTML 元素。

```less
<div class="element">content</div>
.element {
  background: url('cool.jpg');
}
```

### 多重背景

CSS 背景图的好处是可以使用 CSS 轻松控制多个背景。来看下面的例子：

```less
.element {
    background: url('cool-1.jpg'), url('cool-2.jpg');
}
```

### 隐藏图像

我们可以在特定视口上隐藏和显示图像，而无需下载它。如果图片没有设置 CSS，则不会下载。

```less
@media (min-width: 700px) {
    .element {
        background: url('cool-1.jpg');
    }
}
```

在上面的例子中，有一个背景图，它仅在视口宽度大于 700px 时显示。

### 图像保存

如果想要保存网页上的图像，只需右键单击然后选择保存即可。但这不适用于 CSS 背景图。如果不检查检查元素，就无法下载使用 CSS 添加的图像。想要下载背景图，只能在 DevTools 中打开背景图 url 中的链接来下载。

### 伪元素

我们可以将伪元素与 CSS 背景图一起使用，例如在图像顶部显示叠加层。对于 `<img>`，这是不可能的，除非为叠加层添加一个单独的元素。

## SVG

SVG 最大的优势是在不影响质量的情况下进行缩放。此外，借助 SVG，可以嵌入 JPG、PNG 或 SVG 图像：

```html
<svg width="200" height="200">
  <image href="cheesecake.jpg" height="100%" width="100%" preserveAspectRatio="xMidYMid slice" />
</svg>
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMBcw1Jgicb5ialAo7VqrDZFDicgl6jO80a8eLd6OPkmubHonAYM0QYImO6apgKoXKuxNoc7rXefdveA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)这里我们添加了一个 `preserveAspectRatio` 属性，这是使图像保持 SVG 的宽度和高度，而不会被拉伸或压缩。当 `<image>` 宽度较大时，它将填充其父级（SVG）宽度而不会被拉伸。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMBcw1Jgicb5ialAo7VqrDZFDZj3yf0ibvCqPQbtr7FseTSFxrg19B2lJ6PYmE3E4lMzN1YtnTP9ArTQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)这和 CSS 中的 `object-fit: cover` 或 `background-size: cover` 非常相似。

## 图像可访问性

当谈到 SVG 的可访问性时，就不得不说说 `<title>` 元素。例如，可以像下面这样添加它：

```html
<svg width="200" height="200">
   <title>A photo of blueberry Cheescake</title>
   <image href="cheesecake.jpg" height="100%" width="100%" 
          preserveAspectRatio="xMidYMid slice" />
</svg>
```

更重要的是，可以使用 `<desc>`元素：

```html
<svg width="200" height="200">
   <title>A photo of blueberry Cheescake</title>
   <desc>A meaningful description about the image</desc>
   <image href="cheesecake.jpg" height="100%" width="100%" preserveAspectRatio="xMidYMid slice" />
</svg>
```

给 SVG 添加标题或描述之后，其访问性就提高了。

### 图像保存

和 CSS 背景图类似，在检查元素并复制图像的 URL 之前，不能下载嵌入在 SVG 中的图像。如果想要阻止用户下载特定图像，它可能会很有用。至少，它会减少轻松下载图像的机会。

## 如何选择

下面通过五个例子，看看不同情况应该使用哪种设置图像方式。

### 文章标题背景

文章标题和简介下面有一张背景图：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMBcw1Jgicb5ialAo7VqrDZFDh811R3uswvKZpT8FB69TIu8rfCuSZlPiaoErYicKwkcECf8Ncdk71WOw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)对于这张图片，有一些要求：

- 图像可以通过后端进行动态更改；
- 图像上有一个遮罩层，有助于使内容易于阅读；
- 图片有三种尺寸：小、中、大，每个都用于特定的视口。

先来考虑几个问题：

- 这张图片对用户来说重要吗，还是可有可无？
- 是否需要在所有视口尺寸上都使用它？
- 图片是静态的还是会动态变化？

#### 解决方案-1

我们可以使用多个 CSS 背景来实现，一个用于遮罩层，另一个是实际的背景图：

```less
.hero {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
      url('landscape.jpg');
  background-repeat: no-repeat;
  background-size: 100%, cover;
}
```

这样是可以实现的。如果想要动态更改背景图，就可以使用内联 CSS：

```less
<section class="hero" 
 style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('landscape.jpg');">
  <!-- 内容区域 -->
</section>
```

这样是可行的，但是代码看起来很丑陋。或许可以使用 CSS 变量来修改一下？

```less
<section class="hero" style="--bg-url: url('landscape.jpg')">
  <!-- 内容区域 -->
</section>
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMBcw1Jgicb5ialAo7VqrDZFD1B6MicFtPY47v61KH5zyPcEUuwfHWEPibVnsLicVgot2xQ9sOianXtH4og/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)现在，我们可以通过更新`--bg-url`变量来更换背景图，这看起来比内联 CSS 好多了。

对于这个解决方案，主要适用于以下情况：

- 图像不重要，可有可无。
- 图像不会动态修改，而是固定的。

#### 解决方案-2

下面再来看看第二个解决方案：使用 img 标签。

```html
<section class="hero">
  <h2 class="hero__title">CSS背景图和 img 标签怎么选？</h2>
  <p class="hero__desc">文章简介......</p>
  <img src="landscape.jpg" alt="">
</section>
```

在 CSS 中，需要将图像绝对定位在内容的下方，并且还需要一个伪元素作为遮罩。

```less
.hero {
  position: relative;
}

.hero img {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
```

这个解决方案的好处就是很容易更改图像的`src`属性。此外，如果图像很重要，这个方案就更合适。除此之外，使用HTML`<img>`可以在图像未加载的情况下添加回退功能。这种回退至少可以保持内容可读。

```less
.hero img {
    background: #2962ff;
}
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMBcw1Jgicb5ialAo7VqrDZFDrBicwaQHgFE3SFM1tQ5OibsyNmrnC3qHAEGLDLaTwMWXjXwTWicejzTCA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 网站 Logo

#### 细节多的 Logo

对于网站的 Logo，当一有很多细节或形状时，将其用作内联 SVG 可能不太好。**建议使用**`**＜img＞**`，图像文件类型可以是`png`、`jpg`或`svg`。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMBcw1Jgicb5ialAo7VqrDZFDaOicDib6KaumpK20T34tfy73OweMtcslWRb8CTQb9icQIn7YFsicrC2Jrg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

```html
<a href="#"><img src="logo.svg" alt="Nature Food"></a>
```

#### 带动画的 Logo

有一个简单的 Logo，有一个形状和文字组成。当鼠标悬停在Logo上时，需要改变 Logo 的颜色。这时最合适的方案就是**使用内联 SVG。**

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMBcw1Jgicb5ialAo7VqrDZFDFILDdwIQFerRVN5bRhnQU4vK1LXUaXXZF33NKjWKms7dp6xa1cDAtA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

```html
<a href="#">
    <svg class="logo" width="115" height="47" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(-5 -5)" fill="none" fill-rule="evenodd">
        <rect fill="#D8D8D8" transform="rotate(45 28.5 28.5)" x="9" y="9" 
              width="39" height="39" rx="11" />
        <text font-family="Rubik-Medium, Rubik" font-size="25" font-weight="400" fill="#6F6F6F">
          <tspan x="63.923" y="36.923">Rect</tspan>
        </text>
      </g>
    </svg>
</a>
.logo rect,
.logo text {
  transition: 0.3s ease-out;
}

.logo:hover rect,
.logo:hover text {
  fill: #4a7def;
}
```

#### 响应式的 Logo

所谓的响应式 Logo 就是在不同视口下，显示的 Logo 不一样。例如下面的 Logo：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMBcw1Jgicb5ialAo7VqrDZFDwlwNvLsqAic8sE3ic3k9p57ZrHnsoyOdjXFANw2cLRicfGXd3rQd3XrLA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)当视口的宽度超过 `1350px` 时就显示右边的 Logo，否则就显示左边的 Logo。

这里比较完美的解决方案就是`<picture>`元素，它可以添加两个版本的 Logo ：

```html
<a class="logo" href="/">
  <picture>
    <source media="(min-width: 1350px)" srcset="sm-logo--full.svg">
  <img src="sm-logo.svg" alt="Smashing Magazine">
 </picture>
</a>
```

在 CSS 中，需要将视口的宽度更改为等于或大于1350px：

```less
.logo {
  display: inline-block;
  width: 45px;
}

@media (min-width: 1350px) {
  .logo {
    width: 180px;
  }
}
```

#### （4）带渐变的 Logo

当有一个带渐变色的 Logo 时，可以使用 SVG 来轻松实现渐变色。

```html
<svg class="logo" width="115" height="47" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#4a7def"></stop>
      <stop offset="50%" stop-color="#ab4787"></stop>
    </linearGradient>
  </defs>
  <g transform="translate(-5 -5)" fill="none" fill-rule="evenodd">
    <rect fill="#AB4787" transform="rotate(45 28.5 28.5)" x="9" y="9" width="39" 
          height="39" rx="11" />
      <text font-family="Rubik-Medium, Rubik" font-size="30" 
            font-weight="400" fill="url(#gradient)">
        <tspan x="63.923" y="36.923">Rect</tspan>
      </text>
  </g>
</svg>
```

这里添加了一个`＜linearGradient＞`，并将其作为 `text` 的 `fill` 属性，轻松实现了带渐变色的 Logo。

### 页面打印

如果用户需要打印页面，需要避免将图像作为CSS的背景，因为背景图不会被打印，而会显示一个空白区域：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMBcw1Jgicb5ialAo7VqrDZFD1ia6DTyQdyJ3T7BN8a6sjNRLQgncc1plIrmBhvicbmZhY4f1ZJYMGbow/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)不过，我们可以通过强制浏览器显示图像来解决这个问题（不适用于 Firefox 和 IE）：

```less
.element {
    background: url('cheesecake.png') center/cover no-repeat;
    -webkit-print-color-adjust: exact;
}
```

对于这种情况，使用 HTML `<img>` 标签会更安全，因为它可以完美地打印出来。

# 长度单位 & 元素显示模式

## 长度单位

> px ：像素。em ：相对元素font-size 的倍数。rem ：相对根字体大小，html标签就是根。% ：相对父元素计算
>
> 注意： CSS 中设置长度，必须加单位，否则样式无效！

```css
<style>
    html {
        font-size: 40px;
    }
    #d1 {
        /* 第一种长度单位：px（像素） */
        width: 200px;
        height: 200px;
        font-size: 20px;
        background-color: skyblue;
    }
    #d2 {
        /* 第二种长度单位：em（相对于当前元素或其父元素的font-size的倍数） */
        width: 10em;
        height: 10em;
        font-size: 20px;
        background-color: orange;
    }
    #d3 {
        /* 第三种长度单位：rem（相对于根元素的font-size的倍数） */
        width: 5rem;
        height: 5rem;
        font-size: 20px;
        background-color: green;
    }
    #d4 {
        width: 200px;
        height: 200px;
        font-size: 20px;
        background-color: gray;
    }
    .inside {
        /* 第四种长度单位：%（相对其父元素的百分比） */
        width: 50%;
        height: 25%;
        font-size: 150%;
        background-color: orange;
    }
    .test {
        font-size: 20px;
        text-indent: 2em;
        background-color: yellowgreen;
    }
</style>
```

## 元素显示模式⭐

### 各元素的显示模式

> 注意：元素早期只分为：行内元素、块级元素，区分条件也只有一条："是否独占一行"，如果按照这种分类方式，行内块元素应该算作行内元素。

#### 块元素（block）

> 1. 在页面中独占一行，不会与任何元素共用一行，是从上到下排列的。
> 2. 默认宽度：撑满父元素。
> 3. 默认高度：由内容撑开。
> 4. 可以通过CSS 设置宽高。

```html
1. 主体结构标签： <html> 、<body>

2. 排版标签： <h1> ~ <h6> 、<hr> 、<p> 、<pre> 、<div>

3. 列表标签： <ul> 、<ol> 、<li> 、<dl> 、<dt> 、<dd>

4. 表格相关标签： <table> 、<tbody> 、<thead> 、<tfoot> 、<tr> 、<caption>

5. <form> 与<option>
```

#### 行内元素（inline）

> 1. 在页面中不独占一行，一行中不能容纳下的行内元素，会在下一行继续从左到右排列。
> 2. 默认宽度：由内容撑开。
> 3. 默认高度：由内容撑开。
> 4. 无法通过CSS 设置宽高。

```html
1. 文本标签： <br> 、<em> 、<strong> 、<sup> 、<sub> 、<del> 、<ins>
    
2. 超链接和label：<a> 与<label>
```

#### 行内块元素（inline-block）

> 1. 在页面中不独占一行，一行中不能容纳下的行内元素，会在下一行继续从左到右排列。
> 2. 默认宽度：由内容撑开。
> 3. 默认高度：由内容撑开。
> 4. 可以通过CSS 设置宽高。

```html
1. 图片： <img>

2. 单元格： <td> 、<th>
    
3. 表单控件： <input> 、<textarea> 、<select> 、<button>
    
4. 框架标签： <iframe>
```

### 修改元素的显示模式

通过CSS 中的 display 属性可以修改元素的默认显示模式，常用值如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303241102663.png" alt="image-20230324110232547" style="zoom:80%;" />

```html
<body>
    <div id="d1">你好1</div>
    <div id="d2">你好2</div>
    <div id="d3">你好3</div>
    <hr>
    <a id="s1" href="https://www.baidu.com">去百度</a>
    <a id="s2" href="https://www.jd.com">去京东</a>
    <a id="s3" href="https://www.toutiao.com">去百头条</a>
</body>
```

```css
<style>
    div {
        width: 200px;
        height: 200px;
        font-size: 20px;
        display: inline-block;
    }
    #d1 {
        background-color: skyblue;
    }
    #d2 {
        background-color: orange;
    }
    #d3 {
        background-color: green;
    }
    a {
        width: 200px;
        height: 200px;
        font-size: 20px;
        display: block;
    }
    #s1 {
        background-color: skyblue;
    }
    #s2 {
        background-color: orange;
    }
    #s3 {
        background-color: green;
    }
</style>
```



# 盒子模型

## 盒子模型的组成⭐

> 页面中的每一个标签下，都可看做是一个 “盒子”，通过盒子的视角更方便的进行布局。浏览器在渲染（显示）网页时，会将网页中的元素看做是一个个的矩形区域，我们也形象的称之为 盒子。每个盒子分别由：内容区域（content）、内边距区域（padding）、边框区域（border）、外边距区域（margin ）构成，这就是盒子模型

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303241527930.png" alt="image-20230324152759812" style="zoom:80%;" />

> 盒子的大小 = content + 左右 padding + 左右 border 
>
> 注意：外边距margin 不会影响盒子的大小，但会影响盒子的位置。

```html
<div>你好啊</div>
```

```css
<style>
    div {
        /* 内容区的宽 */
        width: 400px;
        /* 内容区的高 */
        height: 400px;
        /* 内边距，设置的背景颜色会填充内边距区域 */
        padding: 20px;
        /* 边框，设置的背景颜色会填充边框区域 */
        border: 10px solid transparent;
        /* 外边距 */
        margin: 50px;

        font-size: 20px;
        background-color: gray;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303251537458.png" alt="image-20230325153720270" style="zoom:80%;" />

## 盒子内容区（content）

> ➢ 作用：利用 width 和 height 属性默认设置是盒子 内容区域 的大小
>
> ➢ 属性：width / height
>
> ➢ 常见取值：数字+px

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303241529763.png" alt="image-20230324152920643" style="zoom:80%;" />

> **max-width 、min-width 一般不与 width 一起使用**
>
> **max-height 、min-height 一般不与 height 一起使用**

```css
div {
    width: 800px;
    /* min-width: 600px; */
    /* max-width: 1000px; */

    height: 200px;
    /* min-height: 50px; */
    /* max-height: 400px; */
    background-color: skyblue;
}
```

## 默认宽度

> 所谓的默认宽度，就是不设置width 属性时，元素所呈现出来的宽度。
>
> 总宽度 = 父的content — 自身的左右margin 。
>
> 内容区的宽度 = 父的content — 自身的左右margin — 自身的左右border — 自身的左右padding 。

## 边框（border）

### 单个属性

> ➢ 作用：给设置边框粗细、边框样式、边框颜色效果
>
> ➢ 单个属性：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212111918971.png" alt="image-20221211191833879" style="zoom:80%;" />

### 连写形式⭐

> ➢ 属性名：border
>
> ➢ 属性值：单个取值的连写，取值之间以空格隔开，如：border : 10px solid red;
>
> ➢ 快捷键：bd + tab

### 单方向设置

> ➢ 场景：只给盒子的某个方向单独设置边框
>
> ➢ 属性名：border - 方位名词
>
> ➢ 属性值：连写的取值

### 完整示例

```css
div {
    width: 200px;
    height: 200px;
    background-color: pink;
    /* border: 粗细  线条样式   颜色 -- 不分先后顺序 */
    /* solid : 实线 */
    /* border: 1px solid #000; */

    /* dashed: 虚线 */
    /* border: 5px dashed #000; */

    /* dotted : 点线 */
    /* border: 5px dotted #000; */
    
    border-left: 5px dotted #000;
    border-right: 5px dotted #000;
    border-top: 1px solid red;
    border-bottom: 1px solid red;
}
```

### 边框渐变

border-image属性是一个是一个简写属性，通过此属性可使用图片来创建边框，该属性的使用语法是：

```css
border-image: source slice width outset repeat|initial|inherit;
```

> border-image-source：用于指定要用于绘制边框的图像的位置。
> border-image-slice：图像边界向内偏移。
> border-image-width：图像边界的宽度。
> border-image-outset：用于指定在边框外部绘制 border-image-area 的量。
> border-image-repeat：用于设置图像边界是否应重复（repeat）、拉伸（stretch）或铺满（round）。

下面主要介绍通过border-image来实现渐变色边框。

```css
<div class="content"></div>
<style>
    .content {
        width: 200px;
        height: 200px;
        border:20px solid #ddd;
        border-image: -webkit-linear-gradient(red,yellow) 30 30;
        border-image: -moz-linear-gradient(red,yellow) 30 30;
        border-image: linear-gradient(red,yellow) 30 30;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121707348.png" alt="image-20221212170734255" style="zoom: 50%;" />

> 但是border-image无法实现圆角，所以换一个思路：通过padding来实现，给父节点设置渐变背景，通过padding模拟边框（此处的padding值就是border需要的值），注意父元素和子元素的border-radius属性值保持一致。

```html
<div class="content">
    <div class="box"></div>
</div>
```

```css
<style>
    .content {
        width: 200px;
        height: 200px;
        box-sizing: border-box;
        padding: 20px;
        border-radius: 50%;
        background-image: -webkit-linear-gradient(top, red 0%, blue 30%, yellow 60%, 
            green 90%);
        background-image: -moz-linear-gradient(top, red 0%, blue 30%, yellow 60%, green 90%);
        background-image: linear-gradient(top, red 0%, blue 30%, yellow 60%, green 90%);
    }
    .box {
        width:100%;
        height:100%;
        border-radius:50%;
        background:#fff;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121709712.png" alt="image-20221212170904626" style="zoom:80%;" />



## 盒子实际大小初级计算公式

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212111920836.png" alt="image-20221211192003711" style="zoom:80%;" />

```css
div {
    /* border 撑大盒子尺寸 */
    /* 盒子尺寸 = width  或 height + 边框线 */
    /* 如果400 * 400 尺寸 ，则要减去对应边框线 */
    width: 380px;
    height: 380px;
    background-color: green;
    border: 10px solid #000;
}
```

```html
<body>
    <div>div</div>
</body>
```



## 盒子边框的小案例

> ➢ 需求：根据设计图，通过PxCook量取数据，通过代码在网页中完成一致的效果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212111921684.png" alt="image-20221211192104606" style="zoom:50%;" />

```html
<body>
    <div></div>
</body>
```

```css
div {
    width: 280px;
    height: 280px;
    background-color: #ffc0cb;
    border: 10px solid #00f;
}
```

## 新浪导航案例

> ➢ 需求：根据设计图，通过PxCook量取数据，通过代码在网页中完成一致的效果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212111921470.png" alt="image-20221211192148391" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212111922455.png" alt="image-20221211192207370" style="zoom: 67%;" />

> 注意：从外到内 : 先宽高背景色, 放内容, 调节内容的位置; 控制文字细节

```html
<div class="box">
    <a href="#">新浪导航</a>
    <a href="#">新浪导航航</a>
    <a href="#">新浪导航航航</a>
    <a href="#">新浪导航航航航</a>
</div>
```

```css
<style>
     /* 创建最外面的父盒子，宽度不加默认100% */
    .box {
        height: 40px;
        /* 橙色上边框 */
        border-top: 3px solid #ff8500;
        /* 灰色下边框 */
        border-bottom: 1px solid #edeef0;
    }

    /* 后代: box里面的a */
    .box a {
        /*width: 80px;*/
        /* 高度同父盒子 */
        height: 40px;
        padding: 0 16px;
        /* 给盒子颜色，推荐先加上: 清楚的看到文字在什么位置 */
        background-color: #edeef0;
        /* 关键：a标签不能设置宽高，因此要进行转换 */
        display: inline-block;
        text-align: center;
        /* 和盒子高度相同，文字垂直居中 */
        line-height: 40px;
        font-size: 12px;
        color: #4c4c4c;
        /* a标签去掉下划线 */
        text-decoration: none;
    }

    .box a:hover {
        background-color: #edeef0;
        color: #ff8400;
    }
</style>
```

## 内边距（padding）

### 内边距（padding）- 取值

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212111923970.png" alt="image-20221211192306861" style="zoom:80%;" />

### 单方向设置

> ➢ 场景：只给盒子的某个方向单独设置内边距
>
> ➢ 属性名：padding - 方位名词
>
> ➢ 属性值：数字 + px

### 完整实例

> 多值写法, 永远都是从上开始顺时针转一圈, 如果数不够, 看对面

```html
<body>
    <div>文字</div>
</body>
```

```css
div {
    width: 300px;
    height: 300px;
    background-color: pink;
    /* 添加了4个方向的内边距 */
    /* padding: 50px; */

    /* padding 属性可以当做复合属性使用, 表示单独设置某个方向的内边距 */
    /* padding 最多取4个值 */

    /* 四值: 上  右   下  左 */
    /* padding: 10px 20px 40px 80px; */

    /* 三值 : 上   左右   下*/
    /* padding: 10px 40px 80px; */

    /* 两值 : 上下  左右*/
    /* padding: 10px 80px; */

    padding-left: 10px;
    padding-bottom: 50px;
}
```





## 盒子实际大小终极计算公式

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212111924911.png" alt="image-20221211192447781" style="zoom:80%;" />

```html
<body>
    <div>文字</div>
</body>
```

```css
div {
    /* 撑大盒子的都有啥? border + padding */
    /* 240+10*2+20*2=300 */
    width: 240px;
    height: 240px;
    background-color: pink;
    border: 10px solid #000;
    padding: 20px;
}
```



## 新浪导航的优化

> ➢ 需求：优化之前的新浪导航，如果每个导航的字数增加，如何完成效果？

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212111925372.png" alt="image-20221211192521296" style="zoom:80%;" />

```html
<div class="box">
    <a href="#">新浪</a>
    <a href="#">新浪导航新浪导航</a>
    <a href="#">新浪导航</a>
    <a href="#">新浪导航</a>
</div>
```

## 不会撑大盒子的特殊情况（拓展）

➢ 不会撑大盒子的特殊情况（块级元素）

> - 如果子盒子没有设置宽度，此时宽度默认是父盒子的宽度
> - 此时给子盒子设置左右的padding或者左右的border，此时不会撑大子盒子

## 外边距（margin）

### 外边距语法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212111927573.png" alt="image-20221211192723463" style="zoom:80%;" />



```css
div {
    width: 100px;
    height: 100px;
    background-color: pink;
    margin: 50px;
    margin-left: 100px;
}
```

### 清除默认的内外边距

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212112240958.png" alt="image-20221211224014833" style="zoom:80%;" />

```css
* {
    margin: 0;
    padding: 0;
}
```

### 版心水平居中

```css
div {
    width: 1000px;
    height: 300px;
    background-color: pink;
    margin: 0 auto;
}
```

```html
<body>
    <!-- 版心: 网页的有效内容 -->
    <!-- 版心居中 -->
    <div>版心</div>
</body>
```

### margin 注意事项

> 子元素的margin ，是参考父元素的content 计算的。（因为是父亲的content 中承装着子元素）

```html
<!-- 子元素的margin是参考父元素的content计算的。 -->
<div class="outer">
    <div class="inner"></div>
</div>
```

```css
<style>
    .outer {
        width: 400px;
        height: 400px;
        padding: 50px;
        background-color: gray;
    }
    .inner {
        width: 100px;
        height: 100px;
        margin: 100px;
        background-color: orange;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303251558851.png" alt="image-20230325155835711" style="zoom: 33%;" />

> 上margin 、左margin ：影响自己的位置；下margin 、右margin ：影响后面兄弟元素的位置。

```html
<body>
    <!-- 上margin、左margin会影响自身的位置，下margin、右margin会影响兄弟元素的位置 -->
    <div class="box box1">1</div>
    <div class="box box2">2</div>
    <div class="box box3">3</div>
    <hr>
    <img src="../images/悟空.jpg" alt="">
    <img class="second" src="../images/悟空.jpg" alt="">
    <img src="../images/悟空.jpg" alt="">
</body>
```

```css
<style>
    .box {
        width: 200px;
        height: 200px;
    }
    .box1 {
        background-color: skyblue;
    }
    .box2 {
        background-color: orange;
        margin-top: 50px;
        margin-bottom: 50px;
    }
    .box3 {
        background-color: green;
    }
    .second {
        margin-left: 50px;
        margin-right: 50px;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303251600903.png" alt="image-20230325160016751" style="zoom:33%;" />

> 块级元素、行内块元素，均可以完美地设置四个方向的margin ；但行内元素，左右margin 可以完美设置，上下margin 设置无效。

> ➢ 场景：给行内元素设置margin和padding时
>
> ➢ 结果：水平方向的margin和padding布局中有效！ 垂直方向的margin和padding布局中无效！

```html
<body>
    <!-- 对于行内元素来说，左右的margin是可以完美设置的，上下的margin设置后是无效的。 -->
    <!-- 行内元素   内外边距  margin  padding -->
    <!-- 如果想要通过margin或padding改变行内标签的垂直位置, 无法生效 -->
    <!-- 行内标签的margin-top和bottom 不生效 -->
    <!-- 行内标签的padding-top或botttom 不生效 -->
    <!-- 行内元素垂直内外边距不生效，加个行高就可以了 -->
    <span>span</span>
    <span>span</span>
</body>
```

```css
<style>
    span {
        /* margin: 100px; */
        /* padding: 100px; */
        line-height: 100px;
    }
</style>
```

> margin 值可以是 auto ，如果给一个块级元素设置左右margin 都为 auto ，该块级元素会在父元素中水平居中

```html
<body>
    <!-- margin的值也可以是auto，给一个块级元素左右margin设置auto可以实现该元素在其父元素内水平居中 -->
    <div>你好啊</div>
    <span>好好学习</span>
</body>
```

```css
<style>
    div {
        width: 800px;
        height: 100px;
        /* margin-left: auto; */
        /* margin-right: auto; */
        margin: 100px auto;
        background-color: deepskyblue;
    }
    span {
        background-color: purple;
        margin: 0 auto;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303251606799.png" alt="image-20230325160610670" style="zoom:80%;" />

> margin 的值可以是负值。

```html
<body>
    <div class="box box1">1</div>
    <div class="box box2">2</div>
</body>
```

```css
<style>
    .box {
        width: 200px;
        height: 200px;
    }
    .box1 {
        background-color: skyblue;
    }
    .box2 {
        margin-top: -200px;
        background-color: orange;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303251607335.png" alt="image-20230325160710206" style="zoom:80%;" />

### margin 合并问题

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212112048869.png" alt="image-20221211204823775" style="zoom:67%;" />

```html
<body>
    <div class="one">11</div>
    <div class="two">22</div>
</body>
```

```css
<style>
    div {
        width: 100px;
        height: 100px;
        background-color: pink;
    }

    .one {
        /* margin-bottom: 50px; */
        margin-bottom: 60px;
    }

    .two {
        margin-top: 50px;
    }
</style>
```

### margin 塌陷问题

> ➢ 场景：互相嵌套 的 块级元素，子元素的 margin-top 会作用在父元素上
>
> ➢ 结果：导致父元素一起往下移动

```html
<div class="father">
    <div class="son">son</div>
</div>
```

```css
<style>
    .father {
        width: 300px;
        height: 300px;
        background-color: pink;
        /* padding-top: 50px; */
        /* 如果设计稿没有border, 不能使用这个解决办法 */
        /* border: 1px solid #000; */
        /* overflow: hidden; */
    }

    .son {
        width: 100px;
        height: 100px;
        background-color: skyblue;

        margin-top: 50px;

        display: inline-block;
    }
</style>
```

➢ 解决方法：

> - 给父元素设置border-top 或者 padding-top（分隔父子元素的margin-top）
> - 给父元素设置overflow：hidden
> - 转换成行内块元素
> - 设置浮动

## margin负值之美

### 负边距+定位：水平垂直居中

> 咱们前面讲过 一个绝对定位的盒子， 利用  父级盒子的 50%，  然后 往左(上) 走 自己宽度的一半 ，可以实现盒子水平垂直居中。

###  压住盒子相邻边框 

![image-20210924145533981](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924145533981.png)

## 新闻列表

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212112243233.png" alt="image-20221211224340136" style="zoom:67%;" />

```html
<!-- 从外到内 -->
<div class="news">
    <h2>最新文章/New Articles</h2>
    <ul>
        <li><a href="#">北京招聘网页设计，平面设计，php</a></li>
        <li><a href="#">北京招聘网页设计，平面设计，php</a></li>
        <li><a href="#">北京招聘网页设计，平面设计，php</a></li>
        <li><a href="#">北京招聘网页设计，平面设计，php</a></li>
        <li><a href="#">北京招聘网页设计，平面设计，php</a></li>
    </ul>
</div>
```

```css
<style>
    * {
        margin: 0;
        padding: 0;
        /* 所有的标签都可能添加内边距或border, 都內减模式 */
        box-sizing: border-box;
    }
    /* 最外面的父盒子，设置宽高，内外边距，边框线 */
    .news {
        width: 500px;
        height: 400px;
        border: 1px solid #ccc;
        margin: 50px auto;
        padding: 42px 30px 0;
    }

    .news h2 {
        border-bottom: 1px solid #ccc;
        font-size: 30px;
        font-weight: 400;
        /* 行高是1倍, 就是字号的大小 */
        line-height: 1;
        padding-bottom: 9px;
    }

    /* 去掉列表的小圆点 */
    ul {
        list-style: none;
    }

    /* li {} */
    .news li {
        height: 50px;
        border-bottom: 1px dashed #ccc;
        /*padding-left: 28px;*/
        line-height: 50px;
    }

    .news a {
        text-decoration: none;
        color: #666;
        font-size: 18px;
    }
</style>
```





# 盒子新增属性

## box-sizing 怪异盒模型

使用box-sizing 属性可以设置盒模型的两种类型

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303261615105.png" alt="image-20230326161507025" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303261620624.png" alt="image-20230326162046527" style="zoom:80%;" />

```html
<div>
    <div class="box1"></div>
    <div class="box2"></div>
</div>
```

```css
<style>
    .box1 {
        width: 200px;
        height: 200px;
        background-color: deepskyblue;
        padding: 5px;
        border: 5px solid black;
        margin-right: 20px;
        float: left;
    }
    .box2 {
        width: 200px;
        height: 200px;
        background-color: gray;
        padding: 5px;
        border: 5px solid black;
        /* 內减模式 */
        /* 变成CSS3的盒子模型, 好处: 加了border和padding不需要手动减法 */
        box-sizing: border-box;
        float: left;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303261623716.png" alt="image-20230326162356645" style="zoom:80%;" />

## resize 调整盒子大小

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303261615300.png" alt="image-20230326161532220" style="zoom:80%;" />

```html
<div class="box1">
    <div class="box2">123</div>
</div>
```

```css
<style>
    .box1 {
        width: 400px;
        height: 400px;
        background-color: orange;
        resize: both;
        overflow: scroll;
    }
    .box2 {
        width: 800px;
        height: 600px;
        background-color: skyblue;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303261626038.png" alt="image-20230326162633960" style="zoom:50%;" />

## box-shadow 盒子阴影

使用 box-shadow 属性为盒子添加阴影。默认值： box-shadow:none 表示没有阴影

```css
box-shadow: h-shadow v-shadow blur spread color inset;
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303261617458.png" alt="image-20230326161713333" style="zoom:80%;" />

```css
/* 写两个值，含义：水平位置、垂直位置 */
box-shadow: 10px 10px;
/* 写三个值，含义：水平位置 垂直位置 阴影的颜色 */
box-shadow: 10px 10px red;
/* 写三个值，含义：水平位置、垂直位置、模糊值 */
box-shadow: 10px 10px 10px;
/* 写四个值，含义：水平位置 垂直位置 模糊程度 阴影颜色 */
box-shadow: 10px 10px 10px red;
/* 写五个值，含义：水平位置 垂直位置 模糊程度 外延值 阴影颜色 */
box-shadow: 10px 10px 10px 10px blue;
/* 写六个值，含义：水平位置 垂直位置 模糊程度 外延值 阴影颜色 内阴影 */
box-shadow: 10px 10px 20px 3px blue inset;
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303261632540.png" alt="image-20230326163204457" style="zoom:67%;" />

```html
<div class="box1">你好啊</div>
```

```css
<style>
    .box1 {
        width: 400px;
        height: 400px;
        background-color: orange;
        margin: 100px auto 0;
        font-size: 40px;
        position: relative;
        top: 0;
        left: 0;
        transition: 0.4s linear all ;
    }
    .box1:hover {
        box-shadow: 0 0 20px black;
        top: -1px;
        left: 0;
    }
</style>
```



## opacity 不透明度

> opacity 属性能为整个元素添加透明效果， 值是 0 到 1 之间的小数， 0 是完全透明， 1 表示完全不透明。

> - opacity 是一个属性，设置的是整个元素（包括元素里的内容）的不透明度。
> - rgba 是颜色的设置方式，用于设置颜色，它的透明度，仅仅是调整颜色的透明度。

```html
<div>
    <div class="box1">你好啊</div>
    <div class="box2">
        <img src="../images/你瞅啥.jpg" alt="">
        <h1>你瞅啥</h1>
    </div>
</div>
```

```css
<style>
    .box1 {
        width: 200px;
        height: 200px;
        background-color: orange;
        font-size: 40px;
        opacity: 0.6;
        font-weight: bold;
    }
    .box2 {
        position: relative;
    }
    h1 {
        position: absolute;
        top: 100px;
        left: 0;
        background-color: black;
        color: white;
        width: 400px;
        line-height: 100px;
        text-align: center;
        font-size: 40px;
        opacity: 0.5;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303261635438.png" alt="image-20230326163512337" style="zoom:50%;" />

## border-radius 边框圆角

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924125947505.png" alt="image-20210924125947505" style="zoom:80%;" />

同时设置四个角的圆角：

```css
border-radius:length;  
```

分开设置每个角的圆角（几乎不用）：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303261700424.png" alt="image-20230326170052321" style="zoom: 67%;" />

```css
border-raidus: 左上角x 右上角x 右下角x 左下角x / 左上y 右上y 右下y 左下y
```

其中每一个值可以为 数值或百分比的形式。 技巧： 让一个正方形  变成圆圈 

~~~css
border-radius: 50%;
~~~

```html
<div></div>
```

```css
div {
    width: 400px;
    height: 400px;
    border: 2px solid black;
    margin: 0 auto;
    /* border-radius: 200px; */
    /* border-radius: 50%; */
    /* border-top-left-radius: 100px; */
    /* border-top-right-radius: 50px; */
    /* border-bottom-right-radius: 20px; */
    /* border-bottom-left-radius: 10px; */
    /* border-top-left-radius: 100px 50px; */
    /* border-top-right-radius: 50px 20px; */
    /* border-bottom-right-radius: 20px 10px; */
    /* border-bottom-left-radius: 10px 5px; */
    border-radius:100px 50px 20px 10px / 50px 20px 10px 5px;
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303261703425.png" alt="image-20230326170349334" style="zoom:50%;" />

## outline 边框外轮廓

> - outline-width ：外轮廓的宽度。
> - outline-color ：外轮廓的颜色。
> - outline-style ：外轮廓的风格。

> none ： 无轮廓、dotted ： 点状轮廓、dashed ： 虚线轮廓、solid ： 实线轮廓、double ： 双线轮廓
>
> outline-offset 设置外轮廓与边框的距离，正负值都可以设置。 outline-offset 不是outline 的子属性，是独立属性
>
> outline 复合属性：outline:50px solid blue;

```html
<div class="box1">你好啊</div>
```

```css
<style>
    .box1 {
        width: 400px;
        height: 400px;
        padding: 10px;
        border: 10px solid black;
        background-color: gray;
        font-size: 40px;
        margin: 100px auto 0;
        /* outline-width: 20px; */
        /* outline-color: orange; */
        /* outline-style: solid; */
        outline-offset: 30px;
        outline:20px solid orange;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303261720031.png" alt="image-20230326172047933" style="zoom:50%;" />

# 浮动

## 浮动

### 行内块元素的问题

```html
<body>
    <div class="one">one</div>
    <div class="two">two</div>
</body>
```

```css
<style>
    div {
        /* 浏览器解析行内块或行内标签的时候, 如果标签换行书写会产生一个空格的距离 */
        display: inline-block;
        width: 100px;
        height: 100px;
    }

    .one {
        background-color: pink;
    }

    .two {
        background-color: skyblue;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121006453.png" alt="image-20221212100654389" style="zoom:67%;" />

### 浮动的作用

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121011535.png" alt="image-20221212101103434" style="zoom:50%;" />

```html
<!-- 1. 图文环绕 -->
<img src="./images/1.jpg" alt="">
肯定是福建安老师看见了阿里的萨里里的萨里肯定是福建安老师看见
了阿里的萨里肯定是福建安老师看见了阿里的萨里肯定是福建安老师看见
了阿里的萨里肯定是福建安老师看见了阿里的萨里肯定是福建安老师看见了阿
里的萨里肯定是福建安老师看见了阿里的萨里肯定是福建安老师看见了阿里的
萨里肯定是福建安老师看见了阿里的萨里肯定是福建安老师看见了阿里的萨里肯定
是福建安老师看见了阿里的萨里肯定是福建安老师看见了阿里的萨里肯定是福
建安老师看见了
```

```css
img {
    float: left;
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121012183.png" alt="image-20221212101219104" style="zoom:50%;" />

```html
<!-- 2. 网页布局: 块在一行排列 -->
<div class="one">one</div>
<div class="two">two</div>
```

```css
<style> 
    div {
        width: 100px;
        height: 100px;
    }

    .one {
        background-color: pink;
        float: left;
    }

    .two {
        background-color: skyblue;
        /* 简写形式：flr */
        /* float: right; */
        float: left;
    }
</style>
```

### 浮动的特点

> 1. 🤢脱离文档流。
> 2. 😊不管浮动前是什么元素，浮动后：默认宽与高都是被内容撑开（尽可能小），而且可以设置宽高。
> 3. 😊不会独占一行，可以与其他元素共用一行。
> 4. 😊不会margin 合并，也不会margin 塌陷，能够完美的设置四个方向的margin 和padding 。
> 5. 😊不会像行内块一样被当做文本处理（没有行内块的空白问题）。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212120942868.png" alt="image-20221212094229730" style="zoom:80%;" />

```html
<body>
    <div class="one">one</div>
    <div class="two">two</div>
    <div class="three">three</div>
</body>
```

```css
<style>
    /* 浮动的标签  顶对齐 */
    /* 浮动: 在一行排列, 宽高生效 -- 浮动后的标签具备行内块特点 */
    .one {
        width: 100px;
        height: 100px;
        background-color: pink;
        float: left;
        margin-top: 50px;
    }

    .two {
        width: 200px;
        height: 200px;
        background-color: skyblue;
        float: left;
        /* 因为有浮动, 不能生效 - 盒子无法水平居中 */
        margin: 0 auto;
    }

    .three {
        width: 300px;
        height: 300px;
        background-color: orange;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121016601.png" alt="image-20221212101635518" style="zoom:67%;" />

### 浮动的案例

#### 小米布局

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121019830.png" alt="image-20221212101930719" style="zoom:80%;" />

```html
<body>
    <!-- 通栏的盒子: 宽度和浏览器宽度一样大 -->
    <div class="top"></div>
    <div class="header">头部</div>
    <div class="content">
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
</body>
```

```css
<style>
    * {
        margin: 0;
        padding: 0;
    }

    .top {
        /* 宽度高度背景色 */
        height: 40px;
        background-color: #333;
    }

    .header {
        width: 1226px;
        height: 100px;
        background-color: #ffc0cb;
        margin: 0 auto;
    }

    .content {
        width: 1226px;
        height: 460px;
        background-color: green;
        margin: 0 auto;
    }

    .left {
        float: left;
        width: 234px;
        height: 460px;
        background-color: #ffa500;
    }

    .right {
        float: left;
        width: 992px;
        height: 460px;
        background-color: #87ceeb;
    }

    /* CSS书写顺序: 浏览器执行效率更高
        1. 浮动 / display
        2. 盒子模型: margin border padding 宽度高度背景色
        3. 文字样式
    */
</style>
```

#### 小米产品

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121023571.png" alt="image-20221212102308471" style="zoom:80%;" />

```html
<div class="box">
    <div class="left"></div>
    <div class="right">
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
</div>
```

```css
<style>
    * {
        margin: 0;
        padding: 0;
    }

    .box {
        margin: 0 auto;
        width: 1226px;
        height: 614px;
        /* background-color: pink; */
    }

    .left {
        float: left;
        width: 234px;
        height: 614px;
        background-color: #800080;
    }

    .right {
        /* 左右两侧盒子是有空隙的，因此这个右浮动，左侧盒子左浮动 */
        float: right;
        width: 978px;
        height: 614px;
        /* background-color: green; */
    }

    ul {
        /* 去掉列表的符号 */
        list-style: none;
    }

    .right li {
        float: left;
        margin-right: 14px;
        margin-bottom: 14px; /* 注意：距离底部14px很重要，能分开内部盒子 */
        width: 234px;
        height: 300px;
        background-color: #87ceeb;
    }

    /* 如果父级的宽度不够, 子级会自动换行 */
    /* 右侧第四个li和第八个li右侧间距清除 */
    .right li:nth-child(4n) {
        margin-right: 0;
    }
</style>
```

#### 导航案例

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121042415.png" alt="image-20221212104239332" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121043206.png" alt="image-20221212104317104" style="zoom: 67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121037474.png" alt="image-20221212103747381" style="zoom:80%;" />

```html
<!-- 导航 -->
<div class="nav">
    <ul>
        <li><a href="#">今日天气</a></li>
        <li><a href="#">新闻1111111111111</a></li>
        <li><a href="#">新闻</a></li>
        <li><a href="#">新闻</a></li>
        <li><a href="#">新闻</a></li>
        <li><a href="#">新闻</a></li>
        <li><a href="#">新闻</a></li>
        <li><a href="#">新闻</a></li>
    </ul>
</div>
```

```css
<style>
    * {
        margin: 0;
        padding: 0;
    }

    .nav {
        margin: 50px auto;
        width: 700px;
        height: 50px;
        background-color: #ffc0cb;
    }

    ul {
        list-style: none;
    }

    .nav li {
        float: left;
    }

    .nav li a {
        display: block;
        /* 2. 盒子模型，为了避免文字撑开盒子，因此要去掉宽度，文字间用padding左右分隔 */
        /*width: 80px;*/
        height: 50px;
        padding: 0 16px;
        /* background-color: green; */
        /* 3. 文字样式 */
        text-align: center;
        line-height: 50px;
        color: #fff;
        text-decoration: none;
    }

    .nav li a:hover {
        background-color: green;
    }
</style>
```



## 浮动小练习

### 盒子1右浮动

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303251633699.png" alt="image-20230325163328544" style="zoom:80%;" />

### 盒子1左浮动

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303251634384.png" alt="image-20230325163401215" style="zoom:80%;" />

### 所有盒子都浮动

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303251634925.png" alt="image-20230325163433774" style="zoom:80%;" />

### 所有盒子浮动后，盒子3落下来

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303251635330.png" alt="image-20230325163506170" style="zoom:80%;" />

## 清除浮动

### 清除浮动的介绍

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121044200.png" alt="image-20221212104406105" style="zoom: 67%;" />

### 受浮动影响的情况

> **父子级标签, 子级浮动, 父级没有高度, 后面的标准流盒子会受影响, 显示到上面的位置**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121100300.png" alt="image-20221212110010180" style="zoom:80%;" />

```html
<body>
    <!-- 父子级标签, 子级浮动, 父级没有高度, 后面的标准流盒子会受影响, 显示到上面的位置 -->
    <div class="top">
        <div class="left"></div>
        <div class="right"></div>
    </div>
    <div class="bottom"></div>
</body>
```

```css
<style>
    .top {
        margin: 0 auto;
        width: 1000px;
        /* height: 300px; */
        background-color: pink;
    }

    .bottom {
        height: 100px;
        background-color: green;
    }

    .left {
        float: left;
        width: 200px;
        height: 300px;
        background-color: #ccc;
    }

    .right {
        float: right;
        width: 790px;
        height: 300px;
        background-color: skyblue;
    }
</style>
```

### 直接设置父元素高度

> 优点：简单粗暴，方便
>
> 缺点：有些布局中不能固定父元素高度。如：新闻列表、京东推荐模块

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121102587.png" alt="image-20221212110213416" style="zoom:80%;" />

### 额外标签法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121103620.png" alt="image-20221212110321538" style="zoom:67%;" />

```html
<!-- 父子级标签, 子级浮动, 父级没有高度, 后面的标准流盒子会受影响, 显示到上面的位置 -->
<div class="top">
    <div class="left"></div>
    <div class="right"></div>
    <div class="clearfix"></div>
</div>
<div class="bottom"></div>
```

```css
<style>
    .top {
        margin: 0 auto;
        width: 1000px;
        /* height: 300px; */
        background-color: pink;
    }

    .bottom {
        height: 100px;
        background-color: green;
    }

    .left {
        float: left;
        width: 200px;
        height: 300px;
        background-color: #ccc;
    }

    .right {
        float: right;
        width: 790px;
        height: 300px;
        background-color: skyblue;
    }

    .clearfix {
        /* 清除左右两侧浮动的影响 */
        clear: both;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121111718.png" alt="image-20221212111118579" style="zoom:80%;" />

### 单伪元素清除法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121104760.png" alt="image-20221212110428657" style="zoom: 50%;" />

```html
<body>
    <!-- 父子级标签, 子级浮动, 父级没有高度, 后面的标准流盒子会受影响, 显示到上面的位置 -->
    <div class="top clearfix">
        <div class="left"></div>
        <div class="right"></div>
        <!-- 通过css 添加标签 -->
    </div>
    <div class="bottom"></div>
</body>
```

```css
<style>
    .top {
        margin: 0 auto;
        width: 1000px;
        /* height: 300px; */
        background-color: pink;
    }

    .bottom {
        height: 100px;
        background-color: green;
    }

    .left {
        float: left;
        width: 200px;
        height: 300px;
        background-color: #ccc;
    }

    .right {
        float: right;
        width: 790px;
        height: 300px;
        background-color: skyblue;
    }

    /* 单伪元素清除浮动 和 额外标签法原理是一样的 */
    .clearfix::after {
        content: '';

        /* 伪元素添加的标签是行内, 要求块 */
        display: block;
        clear: both;

        /* 为了兼容性 */
        height: 0;
        visibility: hidden;
    }
</style>
```

### 双伪元素清除法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121106025.png" alt="image-20221212110612931" style="zoom:67%;" />

```html
<body>
    <!-- 父子级标签, 子级浮动, 父级没有高度, 后面的标准流盒子会受影响, 显示到上面的位置 -->
    <div class="top clearfix">
        <div class="left"></div>
        <div class="right"></div>
    </div>
    <div class="bottom"></div>
</body>
```

```css
<style>
    .top {
        margin: 0 auto;
        width: 1000px;
        /* height: 300px; */
        background-color: pink;
    }

    .bottom {
        height: 100px;
        background-color: green;
    }

    .left {
        float: left;
        width: 200px;
        height: 300px;
        background-color: #ccc;
    }

    .right {
        float: right;
        width: 790px;
        height: 300px;
        background-color: skyblue;
    }

    /*  .clearfix::before 作用: 解决外边距塌陷问题
        外边距塌陷: 父子标签, 都是块级, 子级加margin会影响父级的位置
    */
    /* 清除浮动 */
    .clearfix::before,
    .clearfix::after {
        content: '';
        display: table;
    }

    /* 真正清除浮动的标签 */
    .clearfix::after {
        /* content: '';
        display: table; */
        clear: both;
    }
</style>
```

### 给父元素设置overflow : hidden

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212121107875.png" alt="image-20221212110702778" style="zoom:67%;" />

```html
<body>
    <!-- 父子级标签, 子级浮动, 父级没有高度, 后面的标准流盒子会受影响, 显示到上面的位置 -->
    <div class="top">
        <div class="left"></div>
        <div class="right"></div>
    </div>
    <div class="bottom"></div>
</body>
```

```css
<style>
    .top {
        margin: 0 auto;
        width: 1000px;
        /* height: 300px; */
        background-color: pink;
	    /* 给父元素添加overflow即可 */
        overflow: hidden;
    }

    .bottom {
        height: 100px;
        background-color: green;
    }

    .left {
        float: left;
        width: 200px;
        height: 300px;
        background-color: #ccc;
    }

    .right {
        float: right;
        width: 790px;
        height: 300px;
        background-color: skyblue;
    }
</style>
```

## 浮动大练习

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303251721204.png" alt="image-20230325172156027" style="zoom:80%;" />

```html
<div class="container">
    <!-- 头部 -->
    <div class="page-header clearfix">
        <div class="logo leftfix">logo</div>
        <div class="banner1 leftfix">banner1</div>
        <div class="banner2 leftfix">banner2</div>
    </div>
    <!-- 菜单 -->
    <div class="menu">菜单</div>
    <!-- 内容区 -->
    <div class="content clearfix">
        <!-- 左侧 -->
        <div class="left leftfix">
            <!-- 上 -->
            <div class="top clearfix">
                <div class="item1 leftfix">栏目一</div>
                <div class="item2 leftfix">栏目二</div>
            </div>
            <!-- 下 -->
            <div class="bottom clearfix">
                <div class="item3 leftfix">栏目三</div>
                <div class="item4 leftfix">栏目四</div>
                <div class="item5 leftfix">栏目五</div>
                <div class="item6 leftfix">栏目六</div>
            </div>
        </div>
        <!-- 右侧 -->
        <div class="right rightfix">
            <div class="item7">栏目七</div>
            <div class="item8">栏目八</div>
            <div class="item9">栏目九</div>
        </div>
    </div>
    <!-- 页脚 -->
    <div class="footer">页脚</div>
</div>
```

```css
<style>
    /* 清除默认样式 */
    * {
        margin: 0;
        padding: 0;
    }
    /* 设置左右浮动类名，推荐写法 */
    .leftfix {
        float: left;
    }
    .rightfix {
        float: right;
    }
    /* 清除浮动带来的影响 */
    .clearfix::after {
        content: '';
        display: block;
        clear: both;
    }
    /* 设置版心，给个宽度，居中 */
    .container {
        width: 960px;
        margin: 0 auto;
        text-align: center;
    }
    /* 头部：logo,banner1,banner2 */
    /* 头部：各自样式设置 */
    .logo {
        width: 200px;
    }
    /* 头部：中间元素，给左右外间距 */
    .banner1 {
        width: 540px;
        margin: 0 10px;
    }
    .banner2 {
        width: 200px;
    }
    /* 头部：统一样式设置，高度、行高、背景色 */
    .logo,.banner1,.banner2 {
        height: 80px;
        line-height: 80px;
        background-color: #ccc;
    }
    /* 中部：宽度和父盒子一致，因此给高度即可 */
    .menu {
        height: 30px;
        background-color: #ccc;
        margin-top: 10px;
        line-height: 30px;
    }
    /* 中部左侧：上 */
    .item1,.item2 {
        width: 368px;
        height: 198px;
        line-height: 198px;
        border: 1px solid black;
        margin-right: 10px;
    }

    .content {
        margin-top: 10px;
    }
    /* 中部左侧下 */
    .item3,.item4,.item5,.item6 {
        width: 178px;
        height: 198px;
        line-height: 198px;
        border: 1px solid black;
        margin-right: 10px;
    }
    .bottom {
        margin-top: 10px;
    }
    /* 中部右侧 */
    .item7,.item8,.item9 {
        width: 198px;
        height: 128px;
        line-height: 128px;
        border: 1px solid black;
    }
    /* 中部右侧：中间盒子，给上下外边距，来进行分隔 */
    .item8 {
        margin: 10px 0;
    }
    /* 底部盒子 */
    .footer {
        height: 60px;
        background-color: #ccc;
        margin-top: 10px;
        line-height: 60px;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303251751149.png" alt="image-20230325175151958" style="zoom:80%;" />

# 定位

## 相对定位

### 如何设置相对定位

> 给元素设置 position:relative 即可实现相对定位。可以使用 left 、right 、top 、bottom 四个属性调整位置。

```html
<div class="outer">
    <div class="box box1">1</div>
    <div class="box box2">2</div>
    <div class="box box3">3</div>
</div>
```

```css
<style>
    .outer {
        width: 500px;
        background-color: skyblue;
        border: 1px solid black;
        padding: 20px;
    }
    .box {
        width: 200px;
        height: 200px;
        font-size: 20px;
    }
    .box1 {
        background-color: #888;
    }
    .box2 {
        background-color: orange;
        position: relative;
        top: 10px;
        left: 10px;
        /* left: 100px; */
        /* margin-left: 50px; */
        /* float: right; */
    }
    .box3 {
        background-color: green;
        /* position: relative; */
        /* top: -50px; */
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303252112835.png" alt="image-20230325211234668" style="zoom:50%;" />

### 相对定位的参考点在哪里

> 相对自己原来的位置

### 相对定位的特点

> 1. 不会脱离文档流，元素位置的变化，只是视觉效果上的变化，不会对其他元素产生任何影响。
> 2. 定位元素的显示层级比普通元素高，无论什么定位，显示层级都是一样的。默认规则是：定位的元素会盖在普通元素之上。都发生定位的两个元素，后写的元素会盖在先写的元素之上。
>
> 3. left 不能和right 一起设置， top 和bottom 不能一起设置。
> 4. 相对定位的元素，也能继续浮动，但不推荐这样做。
> 5. 相对行为的元素，也能通过margin 调整位置，但不推荐这样做。

注意：绝大多数情况下，相对定位，会与绝对定位配合使用。

## 绝对定位

### 如何设置绝对定位

> 给元素设置 position: absolute 即可实现绝对定位。可以使用 left 、right 、top 、bottom 四个属性调整位置。

```html
<div class="outer">
    <div class="box box1">1</div>
    <div class="box box2">2</div>
    <div class="box box3">3</div>
</div>
<div>112312</div>
```

```css
<style>
    .outer {
        width: 500px;
        background-color: skyblue;
        border: 1px solid black;
        padding: 20px;
        position: relative;
    }
    .box {
        width: 200px;
        height: 200px;
        font-size: 20px;
    }
    .box1 {
        background-color: #888;
    }
    .box2 {
        background-color: orange;
        position: absolute;
        top: 220px;
        left: 20px;
    }
    .box3 {
        background-color: green;
    }
    .outer:hover .box2 {
        left:220px;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303252114130.png" alt="image-20230325211429960" style="zoom:67%;" />

### 绝对定位的参考点在哪里

参考它的包含块。什么是包含块？

> 1. 对于没有脱离文档流的元素：包含块就是父元素；
> 2. 对于脱离文档流的元素：包含块是第一个拥有定位属性的祖先元素，如果所有祖先都没定位，那就是整个页面

### 绝对定位元素的特点

> 1. 脱离文档流，会对后面的兄弟元素、父元素有影响。
> 2. left 不能和right 一起设置， top 和bottom 不能一起设置。
> 3. 绝对定位、浮动不能同时设置，如果同时设置，浮动失效，以定位为主。
> 4. 绝对定位的元素，也能通过margin 调整位置，但不推荐这样做。
> 5. 无论是什么元素（行内、行内块、块级）设置为绝对定位之后，都变成了定位元素。何为定位元素？ —— 默认宽、高都被内容所撑开，且能自由设置宽高。

## 固定定位

### 如何设置为固定定位？

> 给元素设置 position: fixed 即可实现固定定位。可以使用 left 、right 、top 、bottom 四个属性调整位置。

```html
<body>
    <div class="outer">
        <div class="box box1">1</div>
        <span class="box box2">哥哥需要视频聊天吗？点我哦，即可开始</span>
        <div class="box box3">3</div>
    </div>
    <div>123421</div>
</body>
```

```css
<style>
    .outer {
        width: 500px;
        background-color: skyblue;
        border: 1px solid black;
        padding: 20px;
        position: relative;
    }
    .box {
        width: 200px;
        height: 200px;
        font-size: 20px;
    }
    .box1 {
        background-color: #888;
    }
    .box2 {
        background-color: orange;
        position: fixed;
        bottom: 0;
        right: 0;
    }
    .box3 {
        background-color: green;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303252117350.png" alt="image-20230325211740172" style="zoom:50%;" />

### 固定定位的参考点在哪里？

> 参考它的视口什么是视口？—— 对于PC 浏览器来说，视口就是我们看网页的那扇“窗户”。

### 固定定位元素的特点

> 1. 脱离文档流，会对后面的兄弟元素、父元素有影响。
> 2. left 不能和right 一起设置， top 和bottom 不能一起设置。
> 3. 固定定位和浮动不能同时设置，如果同时设置，浮动失效，以固定定位为主。
>
> 4. 固定定位的元素，也能通过margin 调整位置，但不推荐这样做。
> 5. 无论是什么元素（行内、行内块、块级）设置为固定定位之后，都变成了定位元素。



## 粘性定位

### 如何设置为粘性定位

> 给元素设置 position:sticky 即可实现粘性定位。
>
> 可以使用 left 、right 、top 、bottom 四个属性调整位置，不过最常用的是top 值。

```html
<body>
    <!-- 头部 -->
    <div class="page-header">头部</div>
    <!-- 内容区 -->
    <div class="content">
        <!-- 每一项 -->
        <div class="item">
            <div class="first">A</div>
            <h2>A1</h2>
            <h2>A2</h2>
            <h2>A3</h2>
            <h2>A4</h2>
            <h2>A5</h2>
            <h2>A6</h2>
            <h2>A7</h2>
            <h2>A8</h2>
        </div>
        <div class="item">
            <div class="first">B</div>
            <h2>B1</h2>
            <h2>B2</h2>
            <h2>B3</h2>
            <h2>B4</h2>
            <h2>B5</h2>
            <h2>B6</h2>
            <h2>B7</h2>
            <h2>B8</h2>
        </div>
        <div class="item">
            <div class="first">C</div>
            <h2>C1</h2>
            <h2>C2</h2>
            <h2>C3</h2>
            <h2>C4</h2>
            <h2>C5</h2>
            <h2>C6</h2>
            <h2>C7</h2>
            <h2>C8</h2>
        </div>
    </div>
</body>
```

```css
<style>
    * {
        margin: 0;
        padding: 0;
    }
    body {
        height: 2000px;
    }
    .page-header {
        height: 100px;
        text-align: center;
        line-height: 100px;
        background-color: orange;
        font-size: 20px;
    }

    .item {
        background-color: gray;
    }
    .first {
        background-color: skyblue;
        font-size: 40px;
        position: sticky;
        /* 距离顶端多远粘性定位生效，一般都设置成0 */
        top: 0;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303252119890.png" alt="image-20230325211918715" style="zoom:67%;" />

### 粘性定位的参考点在哪里

> 离它最近的一个拥有“滚动机制”的祖先元素，即便这个祖先不是最近的真实可滚动祖先。

### 粘性定位元素的特点

> - 不会脱离文档流，它是一种专门用于窗口滚动时的新的定位方式。最常用的值是top 值。
> - 粘性定位和浮动可以同时设置，但不推荐这样做。
> - 粘性定位的元素，也能通过margin 调整位置，但不推荐这样做。
> - 粘性定位和相对定位的特点基本一致，不同的是：粘性定位可以在元素到达某个位置时将其固定。

## 定位层级

> 1. 定位元素的显示层级比普通元素高，无论什么定位，显示层级都是一样的。
> 2. 如果位置发生重叠，默认情况是：后面的元素，会显示在前面元素之上。
> 3. 可以通过 css 属性 z-index 调整元素的显示层级。
> 4. z-index 的属性值是数字，没有单位，值越大显示层级越高。
> 5. 只有定位的元素设置 z-index 才有效。
> 6. 如果z-index 值大的元素，依然没有覆盖掉z-index 值小的元素，那么请检查其包含块的层级。

```html
<body>
    <div class="outer">
        <div class="box box1">1</div>
        <div class="box box2">2</div>
        <div class="box box3">3</div>
        <div class="box box4">4</div>
    </div>
    <div class="box box5">5</div>
</body>
```

```css
<style>
    .outer {
        width: 500px;
        background-color: skyblue;
        border: 1px solid black;
        padding: 20px;
        position: relative;
        z-index: 11;
    }
    .box {
        width: 200px;
        height: 200px;
        font-size: 20px;
    }
    .box1 {
        background-color: #888;
    }
    .box2 {
        background-color: orange;
        position: relative;
        top: -150px;
        left: 50px;
    }
    .box3 {
        background-color: green;
        position: absolute;
        top: 130px;
        left: 130px;
    }
    .box4 {
        background-color: red;
        position: fixed;
        top: 200px;
        left: 200px;
        z-index: 50;
    }
    .box5 {
        background-color: purple;
        position: fixed;
        top: 300px;
        left: 300px;
        z-index: 10;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303252123439.png" alt="image-20230325212314247" style="zoom: 67%;" />

## 定位的特殊应用

> 1. 发生固定定位、绝对定位后，元素都变成了定位元素，默认宽高被内容撑开，且依然可以设置宽高。
> 2. 发生相对定位后，元素依然是之前的显示模式。
> 3. 以下所说的特殊应用，只针对 绝对定位 和 固定定位 的元素，不包括相对定位的元素。

### 定位可以忽视内边距

```html
<div class="outer">
    <div class="inner"></div>
</div>
```

```css
<style>
    .outer {
        width: 800px;
        height: 600px;
        /* 父盒子设置内边距 */
        padding: 20px;
        background-color: #888;
        position: relative;
    }
    .inner {
        width: 200px;
        height: 200px;
        background-color: orange;
        /* 子盒子绝对定位，不去管父盒子的内边距了 */
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
```

可以发现，父盒子设置的内边距失效了

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303252133956.png" alt="image-20230325213333788" style="zoom:80%;" />

### 让定位元素的宽充满包含块

> 1. 块宽想与包含块一致，可以给定位元素同时设置 left 和 right 为0 。
> 2. 高度想与包含块一致， top 和 bottom 设置为 0 。

```html
<div class="outer">
    <div class="inner">你好啊</div>
</div>
```

```css
<style>
    .outer {
        height: 400px;
        background-color: #888;
        position: relative;
    }
    .inner {
        background-color: orange;
        font-size: 20px;
        /* 此时有内边距和边框 */
        padding: 20px;
        border: 10px solid black;
        position: absolute;
        /* 上下左右完全撑满父盒子 */
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303252124926.png" style="zoom:67%;" />

### 让定位元素在包含块中居中

```html
<div class="outer">
    <div class="inner">你好啊</div>
</div>
```

```css
<style>
    .outer {
        width: 800px;
        height: 400px;
        background-color: #888;
        position: relative;
    }
    .inner {
        width: 400px;
        height: 100px;
        background-color: orange;
        font-size: 20px;
        position: absolute;
        /* 方案一：推荐写法 */
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        /* 方案二
        left: 50%;
        top: 50%;
        margin-left: 负的宽度一半;-200px
        margin-top: 负的高度一半;-50px */
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303252129031.png" alt="image-20230325212944851" style="zoom:50%;" />

> 注意：该定位的元素必须设置宽高！！！

# 布局⭐

## 版心

> - 在PC 端网页中，一般都会有一个固定宽度且水平居中的盒子，来显示网页的主要内容，这是网页的版心
> - 版心的宽度一般是960 ~ 1200 像素之间。版心可以是一个，也可以是多个

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303251934835.png" alt="image-20230325193413627" style="zoom:80%;" />

## 元素显示与隐藏

目的：让一个元素在页面中消失或者显示出来

场景：类似网站广告，当我们点击关闭就不见了，但是我们重新刷新页面，会重新出现！

### display 显示（重点）

> 设置 display:none ，就可以让元素隐藏。彻底地隐藏，不但看不见，也不占用任何位置，没有大小宽高。
>

~~~
display: none 隐藏对象

display：block 除了转换为块级元素之外，同时还有显示元素的意思。
~~~

特点： **隐藏之后，不再保留位置。**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924145031334.png" alt="image-20210924145031334" style="zoom:80%;" />

> 实际开发场景：配合后面js做特效，比如下拉菜单，原先没有，鼠标经过，显示下拉菜单， 应用极为广泛
>

### visibility 可见性 (了解)

> visibility 属性默认值是 show ，如果设置为 hidden ，元素会隐藏。元素看不见了，还占有原来的位置
>

~~~
visibility：visible ; 　对象可视

visibility：hidden; 　  对象隐藏
~~~

特点： 隐藏之后，继续保留原有位置。（停职留薪）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924145052399.png" alt="image-20210924145052399" style="zoom:67%;" />

### overflow 溢出(重点)

检索或设置当对象的内容超过其指定高度及宽度时如何管理内容。


| 属性值      | 描述                                       |
| ----------- | ------------------------------------------ |
| **visible** | 不剪切内容也不添加滚动条                   |
| **hidden**  | 不显示超过对象尺寸的内容，超出的部分隐藏掉 |
| **scroll**  | 不管超出内容否，总是显示滚动条             |
| **auto**    | 超出自动显示滚动条，不超出不显示滚动条     |

 ![image-20210924145117411](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924145117411.png)

## 样式继承

> 有些样式会继承，元素如果本身设置了某个样式，就使用本身设置的样式；但如果本身没有设置某个样式，会从父元素开始一级一级继承（优先继承离得近的祖先元素）。

> 会继承的 css 属性：**字体属性、文本属性（除了vertical-align）、文字颜色** 等。
>
> 不会继承的 css 属性：**边框、背景、内边距、外边距、宽高、溢出方式** 等。

> **一个规律：能继承的属性，都是不影响布局的，简单说：都是和盒子模型没关系的**。

## 默认样式

元素一般都些默认的样式，例如：

```html
1. <a> 元素：下划线、字体颜色、鼠标小手。
2. <h1> ~ <h6> 元素： 文字加粗、文字大小、上下外边距。
3. <p> 元素：上下外边距
4. <ul> 、ol 元素：左内边距
5. body 元素： 8px 外边距（4个方向）
```

> 优先级：元素的默认样式 > 继承的样式，所以如果要重置元素的默认样式，选择器一定要直接选择器到该元素。

## 布局技巧⭐

> **行内元素、行内块元素**，**可以被父元素当做文本处理**。即：可**以像处理文本对齐一样，去处理：行内、行内块在父元素中的对齐**。例如： text-align 、line-height 、text-indent 等。

> 如何让子元素，在父亲中**水平居中**：若子元素为块元素，给父元素加上： margin:0 auto; 。若子元素为行内元素、行内块元素，给父元素加上： text-align:center 。

> 如何让子元素，在父亲中**垂直居中**：若子元素为块元素，给子元素加上： margin-top ，值为：(父元素content －子元素盒子总高) / 2。

```html
<div class="outer">
    <div class="inner">inner</div>
</div>
```

```css
<style>
    .outer {
        width: 400px;
        height: 400px;
        background-color: gray;
        overflow: hidden;
    }
    .inner {
        width: 200px;
        height: 100px;
        background-color: orange;
        /* 盒子水平垂直居中，垂直居中：(400-100)/2=150 */
        /* 下面两句可以缩写成：margin: 150px auto 0;，即上、左右、下 */
        margin: 0 auto;
        margin-top: 150px;
        /* 盒子内元素居中 */
        text-align: center;
        line-height: 100px;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303261104540.png" alt="image-20230326110425341" style="zoom:40%;" />

> 若子元素为行内元素、行内块元素：让父元素的height = line-height ，每个子元素都加上： verticalalign:middle; 。补充：若想绝对垂直居中，父元素font-size 设置为0 。

```html
<div class="outer">
    <span>出来玩啊？</span>
    <img src="../images/悟空.jpg" alt="">
</div>
```

```css
<style>
    .outer {
        width: 400px;
        height: 400px;
        background-color: gray;
        text-align: center;
        line-height: 400px;
        font-size: 0px;
        text-indent: 20px;
    }
    img {
        vertical-align: middle;
    }
    span {
        font-size: 40px;
        vertical-align: middle;
        background-color: orange;
    }
</style>
```

## 元素间的空白问题

> 产生的原因：行内元素、行内块元素，彼此之间的换行会被浏览器解析为一个空白字符。

```html
<div>
    <span class="s1">人之初</span>
    <span class="s2">性本善</span>
    <span class="s3">性相近</span>
    <hr>
    <img src="../images/悟空.jpg" alt="">
    <img src="../images/悟空.jpg" alt="">
    <img src="../images/悟空.jpg" alt="">
</div>
```

```css
<style>
    div {
        height: 200px;
        background-color: gray;
        font-size: 0;
    }
    .s1 {
        background-color: skyblue;
    }
    .s2 {
        background-color: orange;
    }
    .s3 {
        background-color: green;
    }
    span {
        font-size: 20px;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303261023801.png" alt="image-20230326102304612" style="zoom:80%;" />

> 解决方案：
>
> 方案一： 去掉换行和空格（不推荐）。
>
> 方案二： 给父元素设置 font-size:0 ，再给需要显示文字的元素，单独设置字体大小（推荐）。

## 行内块的幽灵空白问题

> 产生原因：行内块元素与文本的基线对齐，而文本的基线与文本最底端之间是有一定距离的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303251636488.png" alt="image-20230325163639259" style="zoom:80%;" />

> 解决方案：三种方式任选其一即可
>
> 方案一： 给行行内块设置vertical ，值不为 baseline 即可，设置为 middel 、bottom 、top 均可。
>
> 方案二： 若父元素中只有一张图片，设置图片为 display:block 。
>
> 方案三： 给父元素设置 font-size: 0 。如果该行内块内部还有文本，则需单独设置fontsize

```html
<div>
    <img src="../images/我的自拍.jpg" alt="悟空">
</div>
```

```css
<style>
    div {
        width: 600px;
        background-color: skyblue;
        /* font-size: 0; */
    }
    img {
        height: 200px;
        /* vertical-align: bottom; */
        display: block;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303251637409.png" alt="image-20230325163750240" style="zoom:80%;" />

##  溢出的文字省略号显示

> white-space:nowrap ；强制在同一行内显示所有文本，直到文本结束或者遭遇br标签对象才换行。
>
> text-overflow：ellipsis ；当对象内文本溢出时显示省略标记（...）
>
> overflow: hidden; 超出部分隐藏

```html
<div class="s1">123213213213123213123123</div>
```

```css
<style>
  .s1 {
      width: 50px;
      /*1. 先强制一行内显示文本*/
      white-space: nowrap;
      /*2. 超出的部分隐藏*/
      overflow: hidden;
      /*3. 文字用省略号替代超出的部分*/
      text-overflow: ellipsis;
  }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303261056813.png" alt="image-20230326105653627" style="zoom:80%;" />

## 常用布局名词

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303251935725.png" alt="image-20230325193510547" style="zoom: 80%;" />

## 重置默认样式⭐

很多元素都有默认样式，比如：

> 1. p 元素有默认的上下margin 。
> 2. h1~h6 标题也有上下margin ，且字体加粗。``
> 3. body 元素有默认的8px 外边距。
> 4. 超链接有默认的文字颜色和下划线。
> 5. ul 元素有默认的左pading 。
> 6. .......

> 在早期，元素默认样式，能够让我们快速的绘制网页，但如今网页的设计越来越复杂，内容越来越多，而且很精细，这些默认样式会给我们绘制页面带来麻烦；而且这些默认样式，在不同的浏览器上呈现出来的效果也不一样，所以我们需要重置这些默认样式。

### 方案一：使用全局选择器

> 此种方法，在简单案例中可以用一下，但实际开发中不会使用，因为 * 选择的是所有元素，而并不是所有的元素都有默认样式；而且我们重置时，有时候是需要做特定处理的，比如：想让a 元素的文字是灰色，其他元素文字是蓝色。

```css
* {
    margin: 0;
    padding: 0;....
}
```

### 方案二：reset.css

> 选择到具有默认样式的元素，清空其默认的样式。经过reset 后的网页，好似“一张白纸”，开发人员可根据设计稿，精细的去添加具体的样式。

### 方案三：Normalize.css⭐

> Normalize.css 是一种最新方案，它在清除默认样式的基础上，保留了一些有价值的默认样式。
>
> 官网地址： http://necolas.github.io/normalize.css/

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303252153237.png" alt="image-20230325215345030" style="zoom: 67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303252154865.png" alt="image-20230325215401666" style="zoom:67%;" />



```css
<link rel="stylesheet" href="./normalize.css">
<style>
    .demo {
        background-color: gray;
    }
</style>
```

```html
<body>
    <div class="demo">123</div>
    <h1>一级标题</h1>
    <h2>二级标题</h2>
    <h3>三级标题</h3>
    <h4>四级标题</h4>
    <a href="#">去百度</a>
    <ul>
        <li>张三</li>
        <li>李四</li>
        <li>王五</li>
    </ul>
</body>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303260945912.png" alt="image-20230326094553729" style="zoom:80%;" />

相对于 reset.css ， Normalize.css 有如下优点：

> 1. 保护了有价值的默认样式，而不是完全去掉它们。
> 2. 为大部分HTML元素提供一般化的样式。
> 3. 新增对 HTML5 元素的设置。
> 4. 对并集选择器的使用比较谨慎，有效避免调试工具杂乱。备注： Normalize.css 的重置，和reset.css 相比，更加的温和，开发时可根据实际情况进行选择。

## 去掉列表小圆点

无序和有序列表前面默认的列表样式，在不同浏览器显示效果不一样，而且也比较难看，所以，我们一般上来就直接去掉这些列表样式就行了。 代码如下

~~~css
li { 
    list-style: none;
}
~~~

# 单位

> 说起 CSS 单位，我们最常用的可能就是像素单位（px），它是一个绝对单位，也就是说一个10px的文字，放在哪里都是一样大的。单位可以影响颜色、距离、尺寸等一系列的属性。CSS中单位的形式有很多种

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212211146221.png" alt="image-20221221114636093" style="zoom:67%;" />



## 相对单位

相对单位就是相对于另一个长度的长度。CSS中的相对单位主要分为两大类：

> - 字体相对单位，他们都是根据font-size来进行计算的。常见的字体相对单位有：em、rem、ex、ch；
> - 视窗相对单位，他们都是根据视窗大小来决定的。常见的视窗相对单位有vw、vh、vmax、vmin。

下面就来看看这些常见的CSS单位。

### em 和 rem

em是最常见的相对长度单位，适合基于特定的字号进行排版。根据CSS的规定，1em 等于元素的font-size属性的值。

> em 是相对于父元素的字体大小进行计算的。如果当前对行内文本的字体尺寸未进行显示设置，则相对于浏览器的默认字体尺寸。当DOM元素嵌套加深时，并且同时给很多层级显式的设置了font-size的值的单位是em，那么就需要层层计算，复杂度会很高。当然，上面的这个说法是不严谨 的。来看一个例子：

```html
<div class="parent">
    <div class="child">
        子元素
    </div>
</div>
```

```css
<style>
    .parent {
        width: 300px;
        height: 300px;
        font-size: 20px;
    }
    .child {
        border: 1em solid ;
    }
</style>
```

> 这里给父元素设置了字体大小为20px，然后给子元素的border宽度设置为1em，这时，子元素的border值为20px，确实是相对于父元素的字体大小设置的：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303282102847.png" alt="image-20230328210210480" style="zoom:80%;" />

那如果我们给子元素的字体设置为30px：

```css
.child {
  font-size: 30px;
  border: 1em solid ;
}
```

这时可以看到，子元素的边框宽度就是30px，它是相对自己大小进行计算的：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303282102579.png" alt="image-20230328210223236" style="zoom:80%;" />

> 所以，可以得出结论：**如果自身元素是没有设置字体大小的，那么就会根据其父元素的字体大小作为参照去计算，如果元素本身已经设置了字体，那么就会基于自身的字体大小进行计算**。

> em单位除了可以作用于 font-size之外，还可以运用于其他使用长度的属性，比如border-width、width、height、margin、padding、text-shadow等。所以，em的使用还是比较复杂的，它可能会继承任意一级父元素的字体大小。需要谨慎使用。

rem相对于em就简单了很多，它是根据页面的根元素（根元素）的字体大小来计算的。来对上面的例子进行修改：

```css
.child {
  font-size: 30px;
  border: 1rem solid ;
}

html {
 font-size: 25px;
}
```

效果如下，可以看到，边框的长度变成了25px，它是根据根元素html的字体大小计算的：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303282102764.png" alt="image-20230328210235434" style="zoom:80%;" />

如果没有对根元素设定字号的话，font-size: 1rem的作用与font-size: initial相同。

使用 em 和 rem 可以让我们灵活的够控制元素整体的放大和缩小，而不是固定大小。那何时应使用 em，何时应使用 rem 呢？可以根据两者的差异来进行选择：

> - 两者在客户端中计算出来的样式都会以px的形式显示；
> - rem是相对于根元素html的font-size计算，em 相对于元素的font-size计算；
> - 当需要根据浏览器的font-size设置缩放时，应该使用 rem；
> - 使用 em 应该根据组件的font-size来定，而不是根元素的font-size来定；
> - rem 可以从浏览器字体设置中继承 font-size 值， em 可能受任何继承过来的父元素 font-size 的影响。

### ex 和 ch

ex 和 ch 都是排版用的单位，它们的大小取决于元素的font-size 和 font-family属性。

> ex 指的是所用字体中小写字母 x 的高度。因此，如果两个字体不一样，那么 ex 的值是不一样的。因为每种字体的小写 x 的高度是不一样的。

> ch 和 ex 类似，不过它是基于数字 0 的宽度计算的。会随着字体的变化而变化。而0 的宽度通常是对字体的平均字符宽度，它是一个估计值。由于 ch 是一个近似等宽的单元，所以在设置容器的宽度时很有用，比如一个容器想要显示指定个数的字符串时，就可以使用这个单位。

### vw、vh、vmax 和 vmin

这四个单位都是视窗单位，所谓的视窗，在web端指的就是可视区域，移动端的视窗指的就是布局视窗。如果视窗大小发生了变化，那么这些值都会随之变化。这四个单位指的是：

> - vw：视窗宽度的百分比；
> - vh：视窗高度的百分比；
> - vmax：较大的 vh 和 vw；
> - vmin：较小的 vh 和 vw。

> 假如一个浏览器的高度是800px，那么1vh的值就是8px。vh和vw的大小总是和视窗的高度和宽度有关。vmin 和 vmax 与视窗宽度和高度的最大值和最小值有关。假如一个浏览器高度为500px，宽度为1200px，那么1vmin就是5px，1vmax就是12px。

> 这些单位都是长度单位，所以可以在任何允许使用长度单位的地方使用。这些单位比较适合用于创建全视区界面，例如移动设备的界面，因为元素是根据视区的尺寸而变化的，与文档树中的任何元素都没有关系。

## 绝对单位

> 在 CSS 中，绝对单位包括：px 、pt 、pc、 cm 、 mm 、in 等。绝对单位是一个固定的值，它反应了一个真实的物理尺寸。它不会受屏幕大小或者字体的影响。它们的大小取决于值以及屏幕的分辨率（DPI，每英寸的点数）。px就是我们最常用的绝对单位之一。这些绝对单位的换算关系如下：
>

```css
1in = 25.4mm = 2.54cm = 6pc = 72pt =96px
```

### px

> px 全称为 Pixels，表示像素，它并不严格等于显示器的像素，尤其在高清屏下。尽管CSS单位会根据浏览器、操作系统或者硬件适当缩放，在某些设备或者用户的分辨率设置下也会发生变化，但96px通常等于一个物理英寸大小
>

> CSS 将光栅图像(如照片等)的显示方式定义为默认每一个图像大小为1px。一个“600x400”解析度的照片的长宽分别为“600px”和“400px”，所以照片本身的像素并不会与显示装置像素一致，而是与 px 单位一致。如此就可以将图像完整的与网页的其它元素排列起来。
>

> 很多时候， px 也常被称为 CSS 像素。它是一个绝对单位，但也可以被视为相对单位，因为像素单位相对的是设备像素。在同一个设备上，每 1 个 CSS 像素所代表的物理像素是可以变化的；在不同的设备之间，每 1 个 CSS 像素所代表的物理像素是可以变化的。
>

```css
.box {
    width: 100px;
    height: 100px;
}
```

### pt

> pt 全称为 Point，表示点。常用于软件设计和排版印刷行业（笔者做的前端系统，最终的产物就是一个需要拿去印刷的PDF，所以会经常用到这个单位）。当使用这个单位时，无论显示器的分辨率是多少，打印在纸上的结果都是一样的。如果单纯为了网页的显示，建议就使用px像素单位，如果需要输出印刷产品，就可以考虑使用pt。
>

### pc

pc 全程为 Picas，表示派卡。相当于我国新四号铅字的尺寸。派卡也是印刷的术语，1派卡等于12点。它和 px 的换算关系如下：

```css
1pc = 16px
```

### cm

cm 全称为 Centimeters，表示厘米。它和 px 的换算关系如下：

```css
1cm = 37.8px
```

### mm

mm 全称为 Millimeters，表示毫米。它和 px 的换算关系如下：

```css
1mm = 3.78px
```

### in

in 全称为 Inches，表示英寸。它和 px 的换算关系如下：

```css
1in = 96px
```

## 频率单位

CSS中的频率单位有两个：赫兹（Hz）和千赫兹（kHz）。它们的换算关系如下：

```css
1kHz = 1000Hz
```

通常情况下，频率单位使用在听或说级联样式表中。频率可以被用来改变一个语音阅读文本的音调。低频率就是低音，高频率就是高音。

```css
.low { 
  pitch: 105Hz; 
} 

.squeal { 
  pitch: 135Hz; 
}
```

需要注意，当数值为0时，单位对值没有影响，但是单位是不能省略的。也就是说0、0Hz、0kHz是不一样的。所以，在使用频率单位时，不要直接写0。另外，这两个单位是不区分大小写的。

## 时间单位

CSS中的时间单位有两个：秒（s）和毫秒（ms）。这两个时间单位都是CSS新增的单位。这两个单位的换算关系如下：

```css
1s = 1000ms
```

时间单位主要用于**过度和动画**中，用于定义持续时间或延迟时间。下面两种定义是等效的：

```css
a[href] {
 transition-duration: 2.5s;
}

a[href] {
 transition-duration: 2500s;
}
```

## 分辨率单位

> CSS中的分辨率单位有三个：dpi、dpcm、dppx。这三个单位都是CSS3中华新增的单位。他们都是正值，不允许为负值。这三个单位的换算关系如下：
>

```css
1dppx = 96dpi
1dpi ≈ 0.39dpcm
1dpcm ≈ 2.54dpi
```

分辨率单位主要用于**媒体查询**等操作。

### dpi

> dpi 全称为 dots per inch，表示每英寸包含的点的数量。普通屏幕通常包含 72或96个点，大于 192dpi 的屏幕被称为高分屏
>

```css
@media screen and (min-resolution: 96dpi) { ... }
@media print and (min-resolution: 300dpi) { ... }
```

### dpcm

> dpcm 全称为 dots per centimeter，表示每厘米包含的点的数量。
>

```css
@media screen and (min-resolution: 28dpcm) { ... }
@media print and (min-resolution: 118dpcm) { ... }
```

### dppx

> dppx 全称为 dots per pixel，表示每像素（px）包含点的数量。由于CSS px的固定比率为1:96，因此1dppx相当于96dpi。它对应于由图像分辨率定义的CSS中显示的图像的默认分辨率。
>

```css
@media screen and (min-resolution: 2dppx) { ... }
@media screen and (min-resolution: 1dppx) and (max-resolution: 1.9dppx) { ... }
```

## 角度单位

CSS中的角度单位有四个：deg、grad、rad、turn。这些角度单位都是CSS3中新增的单位。它们的换算关系如下：

```
90deg = 100grad = 0.25turn ≈ 1.570796326794897rad
```

一般这些角度单位用于元素的**旋转操作，**包括2D旋转、3D旋转等。

- 当旋转值为正值时，元素会顺时针旋转；
- 当旋转值为负值时，元素会逆时针旋转。

> 通常情况下，一个完整的旋转就是360度。所以，所有的角度都在0-360度之间。但是，超出这个范围的值也是允许的，只不过都会归到0-360度之间。比如，顺时针旋转420度（450deg）、逆时针旋转270度（-270deg）、顺时针旋转90度（90deg）都是一样的效果，都会归为90deg。但是当使用动画时，这些角度值就非常重要了。
>

> CSS的旋转主要依赖于 transform 属性中的 rotate() 、rotate3d、 skew() 等方法。只需给它们传递旋转的角度即可。
>

> 除了旋转会使用角度之外，线性渐变也会经常使用角度值：
>

```
background: linear-gradient(45deg, #000, #fff);
```

### deg

> deg 全称为 Degress，表示度，一个圆总共360度。
>

```
transform: rotate(2deg);
```

### grad

> grad 全称为 Gradians，表示梯度，一个圆总共400梯度。
>

```
transform: rotate(2grad);
```

### rad

> rad 全称为 Radians，表示弧度，一个圆总共2π弧度。
>

```
transform: rotate(2rad);
```

### turn

> turn 全称为 Turns，表示圈（转），一个圆总共一圈（转）。
>

```
transform:rotate(.5turn);
```

## 百分比单位

> 百分比（%）也是我们比较常用的单位之一，所有接受长度值的属性都可以使用百分比单位。但是不同属性使用该单位的效果可能并不一样。但是都需要有一个参照值，也就是说百分比值是一个相对的值。

下面来看看常见场景中的百分比单位的使用。

### 盒模型中的百分比

> 在CSS中的盒模型包含的属性有：width、max-width、min-width、height、max-height、min-height、padding、margin等。这些属性在使用百分比时，参照物不尽相同：

> - width、max-width、min-width：值为百分比时，其相对于包含块的 width 进行计算；
> - height、max-height、min-height：值为百分比时，其相对于包含块的 height 进行计算；
> - padding、margin：值为百分比时，如果是水平的值，就是相对于包含块的 width 进行计算；如果是垂直的值，就是相对于包含块的 height 进行计算。

### 文本中的百分比

文本控制的属性有font-size、line-height 、vertical-align、 text-indent等。这些属性使用百分比时，参照物不尽相同

> - font-size：根据父元素的font-size 进行计算；
> - line-height：根据font-size进行计算；
> - vertical-align：根据line-height进行计算；
> - text-indent：如果是水平的，则根据width进行计算，如果是垂直的，则根据 height 进行计算。

### 定位中的百分比

在CSS中用控制 position 位置的top、right、bottom、left都可以使用百分比作为单位。其参照物就是包含块的同方向的width和height。不同定位的包含块不尽相同：

> - 如果元素为静态（ static ）或相对定位（ relative ），包含块一般是其父容器；
> - 如果为绝对定位（ absolute ），包含块应该是离它最近的 position 为 absolute 、 relative 或 fixed 的祖先元素
> - 如果元素为固定定位（ fixed ），包含块就是视窗（ viewport ）。

### 变换中的百分比

CSS 中的 transform 属性中的 translate 和 transform-origin 值也可以设置百分比。

> - translateX() 根据容器的 width 计算
> - translateY() 根据容器的 height 计算
> - transform-origin 中横坐标（ x ）相对于容器的 width 计算；纵坐标（ y ）相对于容器的 height 计算

注意，在 translate 还有一个 z 轴的函数 translateZ() 。它是不接受百分比为单位的值。

# 高级技巧

## PS基本操作

因为网页美工大部分效果图都是利用ps 来做的，所以，以后我们大部分切图工作都是在ps里面完成。

- 文件--打开 --  可以打开 我们要测量的图片
- ctrl+r 可以打开标尺  或者  视图 --  标尺
- 右击标尺，  把里面的单位改为  像素  
- ctrl+ 加号 键  可以 放大  视图  ctrl+ 减号 缩小视图
- 按住空格键，  鼠标可以 变成小手 ，拖动 ps 视图
- 用选区 拖动  可以 测量 大小 
- ctrl+ d  可以取消选区  或者旁边空白处点击一下也可以取消选区

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924125849028.png" alt="image-20210924125849028" style="zoom:80%;" />

## PxCook测量工具

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212111914437.png" alt="image-20221211191447276" style="zoom: 50%;" />

##  精灵图

###  为什么需要精灵技术

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924145430849.png" alt="image-20210924145430849" style="zoom:80%;" />

> 图所示为网页的请求原理图，**当用户访问一个网站时，需要向服务器发送请求，网页上的每张图像都要经过一次请求才能展现给用户**。然而，一个网页中往往会应用很多小的背景图像作为修饰，**当网页中的图像过多时，服务器就会频繁地接受和发送请求，这将大大降低页面的加载速度**。
>

>  **为了有效地减少服务器接受和发送请求的次数，提高页面的加载速度。**

### 精灵技术讲解

> CSS 精灵其实是将网页中的一些背景图像整合到一张大图中（精灵图），然而，各个网页元素通常只需要精灵图中不同位置的某个小图，要想精确定位到精灵图中的某个小图。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924145442369.png" alt="image-20210924145442369" style="zoom:80%;" />

这样，当用户访问该页面时，只需向服务发送一次请求，网页中的背景图像即可全部展示出来。

* background-image
* background-repeat
* background-position属性进行背景定位，
* 其中最关键的是使用background-position 属性精确地定位。

首先我们知道，css精灵技术主要针对于背景图片，插入的图片img 是不需要这个技术的。

1. 精确测量，每个小背景图片的大小和 位置。
2. 给盒子指定小背景图片时， 背景定位基本都是 负值。

### 制作精灵图(了解)

> CSS 精灵其实是将网页中的一些背景图像整合到一张大图中（精灵图），就是把小图拼合成一张大图。大部分情况下，精灵图都是网页美工做。我们精灵图上放的都是小的装饰性质的背景图片。 插入图片不能往上放。

> 我们可以横向摆放也可以纵向摆放，但是每个图片之间留有适当的空隙。在我们精灵图的最低端，留一片空隙，方便我们以后添加其他精灵图。结束语：   小公司，背景图片很少的情况，没有必要使用精灵技术，维护成本太高。 如果是背景图片比较多，可以建议使用精灵技术。

## 三角形之美

```html
<div class="sanjiao"></div>
```

```css
.sanjiao {
  width: 0;
  height: 0;
  line-height:0;
  font-size: 0;
  /* 只需要将其他三边设置成透明，只留下一个方向的即可有三角形 */
  border-top: 100px solid red;
  border-right: 100px solid transparent;
  border-bottom: 100px solid transparent;
  border-left: 100px solid transparent;
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303261001426.png" alt="image-20230326100104238" style="zoom:80%;" />

一张图， 你就知道 css 三角是怎么来的了, 做法如下：

> 1. 我们用css 边框可以模拟三角效果
> 2. 宽度高度为0
> 3. 我们4个边框都要写， 只保留需要的边框颜色，其余的不能省略，都改为 transparent 透明就好了
> 4. 为了照顾兼容性 低版本的浏览器，加上 font-size: 0;  line-height: 0;

## 网站变灰

> 大家可以看到全站的内容都变成灰色了，包括按钮、图片等等。这时候我们可能会好奇这是怎么做到的呢？有人会以为所有的内容都统一换了一个 CSS 样式，图片也全换成灰色的了，按钮等样式也统一换成了灰色样式。但你想想这个成本也太高了，而且万一某个控件忘记加灰色样式了岂不是太突兀了。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212022135037.png" alt="image-20221202213527981" style="zoom:80%;" />

### 实现方法

> 审查一下网页的源代码，我们可以发现在 html 的这个地方多了一个疑似的 class，叫做 gray，gray 中文即灰色。另外看看 CSDN，它也是用的这个 CSS 样式，其内容为：
>

```css
html {  
   -webkit-filter: grayscale(100%); 
   -moz-filter: grayscale(100%);  
   -ms-filter: grayscale(100%);  
   -o-filter: grayscale(100%);  
   filter: grayscale(100%); 
   filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
}
```

这个实现看起来兼容性会更好一些。因此我们可以确定，通过一个全局的 CSS 样式就能将整个网站变成灰色效果。

### filter 滤镜方法

> 这里我们就来详细了解一下这究竟是一个什么样的 CSS 样式。这个样式名叫做 filterfilter链接为：https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter官方介绍内容如下：
>

> **`filter`** CSS 属性将模糊或颜色偏移等图形效果应用于元素。滤镜通常用于调整图像，背景和边框的渲染。CSS 标准里包含了一些已实现预定义效果的函数。你也可以参考一个 SVG 滤镜，通过一个 URL 链接到 SVG 滤镜元素 (SVG filter element[1])。

其实就是一个滤镜的意思。官方有一个 Demo，可以看下效果，如图所示。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/yjdDibu0qm7GOF4hcZCobuUL5ZchJJYlKI8YkE4trLiaJ6vX6BfAoKc6ODicFX4VkVNib7HojDNhckBW3yQ3qiad8PQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

比如这里通过 filter 样式改变了图片、颜色、模糊、对比度等等信息。

其所有用法示例如下：

```css
/* URL to SVG filter */
filter: url("filters.svg#filter-id");
/* <filter-function> values */
filter: blur(5px);
filter: brightness(0.4);
filter: contrast(200%);
filter: drop-shadow(16px 16px 20px blue);
filter: grayscale(50%);
filter: hue-rotate(90deg);
filter: invert(75%);
filter: opacity(25%);
filter: saturate(30%);
filter: sepia(60%);
/* Multiple filters */
filter: contrast(175%) brightness(3%);
/* Global values */
filter: inherit;
filter: initial;
filter: unset;
```

比如这里如果我们可以使用 blur 设置高斯模糊，用法如下：

```css
filter: blur(radius)
```

给图像设置高斯模糊。radius 一值设定高斯函数的标准差，或者是屏幕上以多少像素融在一起，所以值越大越模糊；如果没有设定值，则默认是 0；这个参数可设置绝对像素值，但不接受百分比值。

可以达成这样的效果：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212022142028.png" alt="image-20221202214159957" style="zoom:80%;" />

再说回刚才的灰色图像，这里其实就是设置了 grayscale，其用法如下：

```css
filter: grayscale(percent)
```

将图像转换为灰度图像。值定义转换的比例。percent 值为 100% 则完全转为灰度图像，值为 0% 图像无变化。值在 0% 到 100% 之间，则是效果的线性乘子。若未设置，值默认是 0。另外除了传递百分比，还可以传递浮点数，效果是一样

```css
filter: grayscale(1)filter: grayscale(100%)
```

都可以将节点转化为 100% 的灰度模式。所以一切到这里就清楚了，如果我们想要把全站变成灰色，再考虑到各浏览器兼容写法，可以参考下 CSDN 的写法：

```css
.gray { 
   -webkit-filter: grayscale(100%);  
   -moz-filter: grayscale(100%);  
   -ms-filter: grayscale(100%);   
   -o-filter: grayscale(100%);   
   filter: grayscale(100%);  
   filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
}
```

这样想要变灰的节点只需要加上 gray 这个 clss 就好了，比如加到 html 节点上就可以全站变灰了。

最后呢，看一下浏览器对 filter 这个样式的兼容性怎样，如图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212022143267.png" alt="image-20221202214328207" style="zoom:80%;" />

这里我们看到，这里除了 IE，其他的 PC、手机端的浏览器都支持了，Firefox 的 PC、安卓端还单独对 SVG 图像加了支持，可以放心使用。











