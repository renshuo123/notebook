

# 图解浏览器渲染原理及流程

## 前言

先来看看 Chrome 浏览器的多进程架构：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPuicswVTddySNddOFXztNYhQQXDQhuJut7PFwMicEEos1e4mniaNibp36Gicw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

通常，我们打包出来的 HTML、CSS、JavaScript 等文件，经过浏览器运行之后就会显示出页面，这个过程就是浏览器的渲染进程来操作实现的，渲染进程的主要任务就是**将静态资源转化为可视化界面：**

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPuXiaDB1iaKF4A5ZK8Okt6lCKWrqgtH8138C2HWa1uIV0uOvITtsoo65wQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

对于中间的浏览器，它就是一个黑盒，下面就来看看这个黑盒是如何将静态资源转化为前端界面的。由于渲染机制比较复杂，所以渲染模块在执行过程中会被划分为很多子阶段，输入的静态资源经过这些子阶段，最后输出页面。我们将一个处理流程称为渲染流水线，其大致流程如下图所示：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPuL920EI9gUbhuE8suA0IicOWoSBpSnLhQ0vdsbMpWrXmH5Ec7bePt7kQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这里主要包含五个过程：

- **DOM树构建**：渲染引擎使用HTML解析器（调用XML解析器）解析HTML文档，将各个HTML元素逐个转化成DOM节点，从而生成DOM树；
- **CSSOM树构建**：CSS解析器解析CSS，并将其转化为CSS对象，将这些CSS对象组装起来，构建CSSOM树；
- **渲染树构建**：DOM 树和 CSSOM 树都构建完成以后，浏览器会根据这两棵树构建出一棵渲染树；
- **页面布局**：渲染树构建完毕之后，元素的位置关系以及需要应用的样式就确定了，这时浏览器会计算出所有元素的大小和绝对位置；
- **页面绘制**：页面布局完成之后，浏览器会将根据处理出来的结果，把每一个页面图层转换为像素，并对所有的媒体文件进行解码。

对于这五个流程，每一阶段都有对应的产物：**DOM树、CSSOM树、渲染树、盒模型、界面。**

下图为渲染引擎工作流程中各个步骤所对应的模块：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPuadRV8P0HvSLYiaPpIMqQVzs24I0psMAQOnzx9Ms0B4p9T6iaRwKzmeEQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

从图中可以看出，渲染引擎主要包含的模块有：

- **HTML 解析器**：解析HTML文档，主要作用是将HTML文档转换成DOM树；
- **CSS 解析器**：将DOM中的各个元素对象进行计算，获取样式信息，用于渲染树的构建；
- **JavaScript 解释器**：使用JavaScript可以修改网页的内容、CSS规则等。JavaScript解释器能够解释JavaScript代码，并通过DOM接口和CSSOM接口来修改网页内容、样式规则，从而改变渲染结果；
- **页面布局**：DOM创建之后，渲染引擎将其中的元素对象与样式规则进行结合，可以得到渲染树。布局则是针对渲染树，计算其各个元素的大小、位置等布局信息。
- **页面绘制**：使用图形库将布局计算后的渲染树绘制成可视化的图像结果。

## DOM树构建

在说构建DOM树之前，我们需要知道，**为什么要构建DOM树呢？** 这是因为，浏览器无法直接理解和使用 HTML，所以需要将HTML转化为浏览器能够理解的结构——DOM树。

了解过数据结构的小伙伴对于树结构应该不陌生，**树是由结点或顶点和边组成的且不存在着任何环的一种数据结构**。一棵非空的树包括一个根结点，还有多个附加结点，所有结点构成一个多级分层结构。下面通过一张图来看看什么是树结构：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPu9PpYiaVNpmxNy3pqSPrhgmE3GRWJSZW3Z4e9M10y1Joyoc2CPpazhzw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

对于上面的三个结构，前两个都是树，他们都只有唯一的根节点，而且不存在环结构。而第三个存在环，所以就不是一个树结构。

在页面中，每个HTML标签都会被浏览器解析成文档对象。HTML本质上就是一个嵌套结构，在解析时会把每个文档对象用一个树形结构组织起来，所有的文档对象都会挂在document上，这种组织方式就是HTML最基础的结构——文档对象模型（DOM），这棵树的每个文档对象就叫做DOM节点。

在渲染引擎中，DOM 有三个层面的作用：

- 从页面的视角来看，DOM 是生成页面的基础数据结构；
- 从 JavaScript 脚本视角来看，DOM 提供给 JavaScript 脚本操作的接口，通过这套接口，JavaScript 可以对 DOM 结构进行访问，从而改变文档的结构、样式和内容；
- 从安全视角来看，DOM 是一道安全防护线，一些不安全的内容在 DOM 解析阶段会被拒之门外。

在渲染引擎内部，HTML 解析器负责将 HTML 字节流转换为 DOM 结构，其转化过程如下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPuia9yuicUicEXf00PM6QH5QvtR8OdmjIVcJYefFyiciavrKtWn4Z3WVKpvRA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 1. 字符流 → 词（token）

HTML结构会首先通过分词器将字节流拆分为词（token）。Token分为Tag Token 和文本 Token。下面来看一个HTML代码是如何被拆分的：

```
<body>
    <div>
        <p>hello world</p>
    </div>
</body>
```

对于这段代码，可以拆成词：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPuK8JYh8P0HjgnwkQtm5NfMFPnW0lw2yvtNqInHACiaG6A6nM9OzTGTrg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

可以看到，Tag Token 又分 StartTag 和 EndTag，`<body>`、`<div>`、`<p>`就是 StartTag ，`</body>`、`</div>`、`</p>`就是 EndTag，分别对应图中的蓝色和红色块，文本 Token 对应绿色块。

这里会通过状态机将字符拆分成token，所谓的状态机就是将每个词的特征逐个拆分成独立的状态，然后再将所有词的特征字符合并起来，形成一个连通的图结构。那为什么要使用状态机呢？因为每读取一个字符，都要做一次决策，这些决策都和当前的状态有关。

实际上，状态机的作用就是用来做词法分析的，将字符流分解为词（token）。

### 2. 词（token）→ DOM树

接下来就需要将 Token 解析为 DOM 节点，并将 DOM 节点添加到 DOM 树中。这个过程是通过**栈结构**来实现的，这个栈主要用来计算节点之间的父子关系，上面步骤中生成的token会按顺序压入栈中，该过程的规则如下：

- 如果分词器解析出来是**StartTag Token**，HTML 解析器会为该 Token 创建一个 DOM 节点，然后将该节点加入到 DOM 树中，它的父节点就是栈中相邻的那个元素生成的节点；
- 如果分词器解析出来是 **文本** **Token**，那么会生成一个文本节点，然后将该节点加入到 DOM 树中，文本 Token 是不需要压入到栈中，它的父节点就是当前栈顶 Token 所对应的 DOM 节点；
- 如果分词器解析出来的是**EndTag Token**，比如是 EndTag div，HTML 解析器会查看 Token 栈顶的元素是否是 StarTag div，如果是，就将 StartTag div从栈中弹出，表示该 div 元素解析完成。

通过分词器产生的新 Token 就这样不停地入栈和出栈，整个解析过程就这样一直持续下去，直到分词器将所有字节流分词完成。

下面来看看这的Token栈是如何工作的，有如下HTML结构：

```
<html>
    <body>
        <div>hello juejin</div>
        <p>hello world</p>
    </body>
</html>
```

开始时，HTML解析器会创建一个根为 document 的空的 DOM 结构，同时将 StartTag document 的Token压入栈中，然后再将解析出来的第一个 StartTag html 压入栈中，并创建一个 html 的DOM节点，添加到 document 上，这时 Token 栈和 DOM树 如下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPuaqAajxHDwQURny9gocpbVVLDf58V1V27AjzTjWjjfxibQ59mgUWibW7g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

接下来body和div标签也会和上面的过程一样，进行入栈操作：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPu8nMhIXF2PQzvrb60T4oniaCgwUXMib873h5Q4xYricRqicMbbxCldAtWNA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

随后就会解析到 div标签中的文本Token，渲染引擎会为该 Token 创建一个文本节点，并将该 Token 添加到 DOM 中，它的父节点就是当前 Token 栈顶元素对应的节点：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPupMoZicriaSfHFgeCwiaYNwm7yficwch2MwHozDkkmib0pok3HCPKfkOjN4Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

接下来就是第一个EndTag div，这时 HTML 解析器会判断当前栈顶元素是否是 StartTag div，如果是，则从栈顶弹出 StartTag div，如下图所示：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPuo0gr6hUhSS61Sm4PyicBxhdXzr4qiacReZmBUs8o1yc6w5ber2ZIS3Ug/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

再之后的过程就和上面类似了，最终的结果如下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPu0QxricvKmmXM75JYGnvicft9AWW4m5Kiao8l1F87NeNy4Q262knbviaJ3g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## CSSOM树构建

上面已经基本了解了DOM的构建过程，但是这个DOM结构只包含节点，并不包含任何的样式信息。下面就来看看，浏览器是如何把CSS样式应用到DOM节点上的。

同样，浏览器也是无法直接理解CSS代码的，需要将其浏览器可以理解的CSSOM树。实际上。浏览器在构建 DOM 树的同时，如果样式也加载完成了，那么 CSSOM 树也会同步构建。CSSOM 树和 DOM 树类似，它主要有两个作用：

- 提供给 JavaScript 操作样式的能力；
- 为渲染树的合成提供基础的样式信息。

不过，CSSOM 树和 DOM 树是独立的两个数据结构，它们并没有一一对应关系。DOM 树描述的是 HTML 标签的层级关系，CSSOM 树描述的是选择器之间的层级关系。可以在浏览器的控制台，通过`document.styleSheets`命令来查看CSSOM树：

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPuMKib17Mwc4rQa3U33wf9u3pGvJickDlWdicdHqgiaq7OPtmkYr4UZBSOJw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

那CSS样式的来源有哪些呢？

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPutD43YjVLX6Q5vfsglF93cicsq16s5Vd9FYawWYpYvCn3Bvg90XWYyUQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

CSS样式的来源主要有三种：

- 通过 link 引用的外部 CSS 样式文件；
- `<style>`标签内的CSS样式；
- 元素的style属性内嵌的CSS。

在将CSS转化为树形对象之前，还需要将样式表中的属性值进行标准化处理，比如，当遇到以下CSS样式：

```
body { font-size: 2em }
p {color:blue;}
div {font-weight: bold}
div p {color:green;}
div {color:red; }
```

可以看到上面CSS中有很多属性值，比如2em、blue、red、bold等，这些数值并不能被浏览器直接理解。所以，需要将所有值转化为浏览器渲染引擎容易理解的、标准化的计算值，这个过程就是属性值标准化。经过标准化的过程，上面的代码会变成这样：

```
body { font-size: 32px }
p {color: rgb(0, 0, 255);}
div {font-weight: 700}
div p {color: (0, 128, 0);}
div {color: (255, 0, 0); }
```

可以看到，2em被解析成了32px，blue被解析成了rgb(255, 0, 0)，bold被解析成700。现在样式的属性已被标准化了，接下来就需要计算 DOM 树中每个节点的样式属性了，这就涉及到 CSS 的继承规则和层叠规则。

#### （1）样式继承

在 CSS 中存在样式的继承机制，CSS 继承就是每个 DOM 节点都包含有父节点的样式。比如在 HTML 上设置“font-size:20px;”，那么页面里基本所有的标签都可以继承到这个属性了。

在CSS中，有继承性的属性主要有以下几种：

1. **字体系列属性**

- font-family：字体系列
- font-weight：字体的粗细
- font-size：字体的大小
- font-style：字体的风格

1. **文本系列属性**

- text-indent：文本缩进
- text-align：文本水平对齐
- line-height：行高
- word-spacing：单词之间的间距
- letter-spacing：中文或者字母之间的间距
- text-transform：控制文本大小写（就是uppercase、lowercase、capitalize这三个）
- color：文本颜色

1. **元素可见性**

- visibility：控制元素显示隐藏

1. **列表布局属性**

- list-style：列表风格，包括list-style-type、list-style-image等

1. **光标属性**

- cursor：光标显示为何种形态

#### （2）样式层叠

样式计算过程中的第二个规则是样式层叠。层叠是 CSS 的一个基本特征，它是一个定义了 如何合并来自多个源的属性值的算法。它在 CSS 处于核心地位，CSS 的全称“层叠样式表”正是强调了这一点。这里不再多说。

总之，样式计算阶段的目的是为了计算出 DOM 节点中每个元素的具体样式，在计算过程 中需要遵守 CSS 的继承和层叠两个规则。这个阶段最终输出的内容是每个 DOM 节点的样 式，并被保存在 ComputedStyle 的结构内。

对于以下代码：

```
<html>
 <head>
  <link href="./style.css">
        <style>
            .juejin {
                width: 100px;
                height: 50px;
                background: red;
            }

            .content {
                font-size: 25px;
                line-height: 25px;
                margin: 10px;
            }
        </style>
 </head>
    <body>
        <div class="juejin">
         <div>CUGGZ</div>
        </div>
        <p style="color: blue" class="content">
            <span>hello world</span>
            <p style="display: none;">浏览器</p>
        </p>
    </body>
</html>
```

最终生成的CSSOM树大致如下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPuAjCYMVEG6L46ibKGP8ZIKr6NSPLibo0OkXCTa97iaVyanOZpxDMByeICw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 渲染树构建

在 DOM 树和 CSSOM 树都渲染完成之后，就会进入渲染树的构建阶段。渲染树就是 DOM 树和 CSSOM 树的结合，会得到一个可以知道每个节点会应用什么样式的数据结构。这个结合的过程就是遍历整个 DOM 树，然后在 CSSOM 树里查询到匹配的样式。

在不同浏览器里，构建渲染树的过程不太一样：

- 在 Chrome 里会在每个节点上使用 attach() 方法，把 CSSOM 树的节点挂在 DOM 树上作为渲染树。
- 在 Firefox 里会单独构造一个新的结构， 用来连接 DOM 树和 CSSOM 树的映射关系。

那为什么要构建渲染树呢？在上面的示例中可以看到，DOM树可能包含一些不可见的元素，比如head标签，使用display:none;属性的元素等。所以在显示页面之前，还要额外地构建一棵**只包含可见元素的渲染树**。

下面来看看构建渲染树的过程：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPuYxbaFrsLM6XrSymLLhfmrFqhRg8I3fyia1oZt2FwnHiappBoicwayUbGQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

可以看到，DOM树中不可见的节点都没有包含到渲染树中。为了构建渲染树，浏览器上大致做了如下工作：遍历DOM树中所有可见节点，并把这些节点加到布局中，而不可见的节点会被布局树忽略掉，如 head 标签下面的全部内容，再比如 p.p 这个元素，因为它的属性包含 `dispaly:none`，所以这个元素也没有被包含进渲染树中。如果给元素设置了`visibility: hidden`属性，那这个元素会出现在渲染树中，因为具有这个样式的元素是需要占位的，只不过不需要显示出来。

这里在查找的过程中，出于效率的考虑，会从 CSSOM 树的叶子节点开始查找，对应在 CSS 选择器上也就是从选择器的最右侧向左查找。所以，不建议使用标签选择器和通配符选择器来定义元素样式。

除此之外，同一个 DOM 节点可能会匹配到多个 CSSOM 节点，而最终的效果由哪个 CSS 规则来确定，就是样式优先级的问题了。当一个 DOM 元素受到多条样式控制时，样式的优先级顺序如下：**内联样式 > ID选择器 > 类选择器 > 标签选择器 > 通用选择器 > 继承样式 > 浏览器默认样式**

CSS常见选择器的优先级如下：

| **选择器**     | **格式**      | **优先级权重** |
| :------------- | :------------ | :------------- |
| id选择器       | #id           | 100            |
| 类选择器       | .classname    | 10             |
| 属性选择器     | a[ref=“eee”]  | 10             |
| 伪类选择器     | li:last-child | 10             |
| 标签选择器     | div           | 1              |
| 伪元素选择器   | li:after      | 1              |
| 相邻兄弟选择器 | h1+p          |                |
| 子选择器       | ul>li         |                |
| 后代选择器     | li a          |                |
| 通配符选择器   | *             |                |

对于选择器的**优先级**：

- 标签选择器、伪元素选择器：1；
- 类选择器、伪类选择器、属性选择器：10；
- id 选择器：100；
- 内联样式：1000；

**注意：**

- !important声明的样式的优先级最高；
- 如果优先级相同，则最后出现的样式生效；
- 继承得到的样式的优先级最低；

## 页面布局

经过上面的步骤，就生成了一棵渲染树，这棵树就是展示页面的关键。到现在为止，已经有了需要渲染的所有节点之间的结构关系及其样式信息。下面就需要进行页面的布局。

通过计算渲染树上每个节点的样式，就能得出来每个元素所占空间的大小和位置。当有了所有元素的大小和位置后，就可以在浏览器的页面区域里去绘制元素的边框了。这个过程就是布局。这个过程中，浏览器对渲染树进行遍历，将元素间嵌套关系以盒模型的形式写入文档流：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPutYIQY3ia0MvpMmp09icmAUTian8Pib7IoRxRCcREUeKbSJCglNVlCJjibsw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

盒模型在布局过程中会计算出元素确切的大小和定位。计算完毕后，相应的信息被写回渲染树上，就形成了布局渲染树。同时，每一个元素盒子也都携带着自身的样式信息，作为后续绘制的依据。

## 页面绘制

### 1. 构建图层

经过布局，每个元素的位置和大小就有了，那下面是不是就该开始绘制页面了？答案是否定的，因为页面上可能有很多复杂的场景，比如3D变化、页面滚动、使用z-index进行z轴的排序等。所以，为了实现这些效果，渲染引擎还需要为特定的节点生成专用的**图层**，并生成一棵对应的图层树。

那什么是图层呢？我们可以在Chrome浏览器的开发者工具中，选择Layers标签（如果没有，可以在更多工具中查找），就可以看到页面的分层情况，以掘金首页为例，其分层情况如下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPucZFYB9g1cCy2nhxSrF1WqskDsvkNnMiabfFm4MhF7SXO9Fjyud60tRg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

可以看到，渲染引擎给页面分了很多图层，这些图层会按照一定顺序叠加在一起，就形成了最终的页面。这里，将页面分解成多个图层的操作就成为**分层，** 最后将这些图层合并到一层的操作就成为**合成，** 分层和合成通常是一起使用的。Chrome 引入了分层和合成的机制就是为了提升每帧的渲染效率。

通常情况下，并不是渲染树上的每个节点都包含一个图层，如果一个节点没有对应的图层，那这个节点就会属于其父节点的图层。那什么样的节点才能让浏览器引擎为其创建一个新的图层呢？需要满足以下其中一个条件：

#### （1）拥有层叠上下文属性的元素

我们看到的页面通常是二维的平面，而层叠上下文能够让页面具有三维的概念。这些 HTML 元素按照自身属性的优先级分布在垂直于这个二维平面的 z 轴上。下面是盒模型的层叠规则：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPu7GGmQuMyH6qsicJ59D4JkMzJ0S0paf3MKkEhVmY8Wx0p2IvmcUQ8Uog/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

对于上图，由上到下分别是：

- 背景和边框：建立当前层叠上下文元素的背景和边框。
- 负的z-index：当前层叠上下文中，z-index属性值为负的元素。
- 块级盒：文档流内非行内级非定位后代元素。
- 浮动盒：非定位浮动元素。
- 行内盒：文档流内行内级非定位后代元素。
- z-index:0：层叠级数为0的定位元素。
- 正z-index：z-index属性值为正的定位元素。

**注意:** 当定位元素z-index:auto，生成盒在当前层叠上下文中的层级为 0，不会建立新的层叠上下文，除非是根元素。

#### （2）需要裁剪的元素

什么是裁剪呢？假如有一个固定宽高的div盒子，而里面的文字较多超过了盒子的高度，这时就会产生裁剪，浏览器渲染引擎会把裁剪文字内容的一部分用于显示在 div 区域。当出现裁剪时，浏览器的渲染引擎就会为文字部分单独创建一个图层，如果出现滚动条，那么滚动条也会被提升为单独的图层。

### 2. 绘制图层

在完成图层树的构建之后，渲染引擎会对图层树中的每个图层进行绘制，下面就来看看渲染引擎是怎么实现图层绘制的。

**渲染引擎在绘制图层时，会把一个图层的绘制分成很多绘制指令，然后把这些指令按照顺序组成一个待绘制的列表：**

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPuuiaoasG1JRgb0h6gYs7NlR3FGg3hw9C29rfGTAib95uCpdsy8R6g8xcQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

可以看到，绘制列表中的指令就是一系列的绘制操作。通常情况下，绘制一个元素需要执行多条绘制指令，因为每个元素的背景、边框等属性都需要单独的指令进行绘制。所以在图层绘制阶段，输出的内容就是绘制列表。

在Chrome浏览器的开发者工具中，通过Layer标签可以看到图层的绘制列表和绘制过程：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPubgJG867zynlrFFV17bXrEevLUP12PHNVrAIx3qSmsC2ApKicd9FvuVw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

绘制列表只是用来记录绘制顺序和绘制指令的列表，而**绘制操作是由渲染引擎中的合成线程来完成的**。当图层绘制列表准备好之后，主线程会把该绘制列表提交给合成线程。

注意：合成操作是在合成线程上完成的，所以，在执行合成操作时并不会影响到主线程的执行。

很多情况下，图层可能很大，比如一篇长文章，需要滚动很久才能到底，但是用户只能看到视口的内容，所以没必要把整个图层都绘制出来。因此，合成线程会将图层划分为图块，这些图块的大小通常是 256x256 或者 512x512。合成线程会优先将视口附近的图块生成位图。**实际生成位图的操作是在光栅化阶段来执行的，所谓的光栅化就是按照绘制列表中的指令生成图片。**

当所有的图块都被光栅化之后，合成线程就会生成一个绘制图块的命令，浏览器相关进程收到这个指令之后，就会将其页面内容绘制在内存中，最后将内存显示在屏幕上，这样就完成了页面的绘制。

**至此，整个渲染流程就完成了，其过程总结如下：**

1. 将HTML内容构建成DOM树；
2. 将CSS内容构建成CSSOM树；
3. 将DOM 树和 CSSOM 树合成渲染树；
4. 根据渲染树进行页面元素的布局；
5. 对渲染树进行分层操作，并生成分层树；
6. 为每个图层生成绘制列表，并提交到合成线程；
7. 合成线程将图层分成不同的图块，并通过栅格化将图块转化为位图；
8. 合成线程给浏览器进程发送绘制图块指令；
9. 浏览器进程会生成页面，并显示在屏幕上。

## 扩展

### 1. 重排和重绘

说完浏览器引擎的渲染流程，再来看两个重要的概念：重排（Reflow）和重绘（Repaint）。

我们知道，渲染树是动态构建的，所以，DOM节点和CSS节点的改动都可能会造成渲染树的重新构建。渲染树的改动就会造成页面的重排或者重绘。下面就来看看这两个概念，以及它们触发的条件和减少触发的操作。

#### （1）重排

当我们的操作引发了 DOM 树中几何尺寸的变化（改变元素的大小、位置、布局方式等），这时渲染树里有改动的节点和它影响的节点都要重新计算。这个过程就叫做重排，也称为回流。在改动发生时，要重新经历页面渲染的整个流程，所以开销是很大的。

以下操作都会导致页面重排：

- 页面首次渲染；
- 浏览器窗口大小发生变化；
- 元素的内容发生变化；
- 元素的尺寸或者位置发生变化；
- 元素的字体大小发生变化；
- 激活CSS伪类；
- 查询某些属性或者调用某些方法；
- 添加或者删除可见的DOM元素。

在触发重排时，由于浏览器渲染页面是基于流式布局的，所以当触发回流时，会导致周围的DOM元素重新排列，它的影响范围有两种：

- 全局范围：从根节点开始，对整个渲染树进行重新布局；
- 局部范围：对渲染树的某部分或者一个渲染对象进行重新布局。

#### （2）重绘

当对 DOM 的修改导致了样式的变化、但未影响其几何属性（比如修改颜色、背景色）时，浏览器不需重新计算元素的几何属性、直接为该元素绘制新的样式（会跳过重排环节），这个过程叫做重绘。简单来说，重绘是由对元素绘制属性的修改引发的。

当我们修改元素绘制属性时，页面布局阶段不会执行，因为并没有引起几何位置的变换，所以就直接进入了绘制阶段，然后执行之后的一系列子阶段。相较于重排操作，重绘省去了布局和分层阶段，所以执行效率会比重排操作要高一些。

下面这些属性会导致回流：

- color、background 相关属性：background-color、background-image 等；
- outline 相关属性：outline-color、outline-width 、text-decoration；
- border-radius、visibility、box-shadow。

注意：**当触发重排时，一定会触发重绘，但是重绘不一定会引发重排。**

相对来说，重排操作的消耗会比较大，所以在操作中尽量少的造成页面的重排。为了减少重排，可以通过以下方式进行优化：

- 在条件允许的情况下尽量使用 CSS3 动画，它可以调用 GPU 执行渲染。
- 操作DOM时，尽量在低层级的DOM节点进行操作
- 不要使用`table`布局， 一个小的改动可能会使整个`table`进行重新布局
- 使用CSS的表达式
- 不要频繁操作元素的样式，对于静态页面，可以修改类名，而不是样式。
- 使用 absolute 或者 fixed，使元素脱离文档流，这样他们发生变化就不会影响其他元素
- 避免频繁操作DOM，可以创建一个文档片段`documentFragment`，在它上面应用所有DOM操作，最后再把它添加到文档中
- 将元素先设置`display: none`，操作结束后再把它显示出来。因为在display属性为none的元素上进行的DOM操作不会引发回流和重绘。
- 将DOM的多个读操作（或者写操作）放在一起，而不是读写操作穿插着写。这得益于**浏览器的渲染队列机制**。

浏览器针对页面的回流与重绘，进行了自身的优化——**渲染队列，** 浏览器会将所有的回流、重绘的操作放在一个队列中，当队列中的操作到了一定的数量或者到了一定的时间间隔，浏览器就会对队列进行批处理。这样就会让多次的回流、重绘变成一次回流重绘。

### 2. JavaScript 对 DOM 的影响

当解析器解析HTML时，如果遇到了script标签，判断这是脚本，就会暂停 DOM 的解析，因为接下来的 JavaScript 脚本可能会修改当前已经生成的 DOM 结构。

来看一段代码：

```
<html>
    <body>
        <div>hello juejin</div>
        <script>
            document.getElementsByTagName('div')[0].innerText = 'juejin yyds'
        </script>
        <p>hello world</p>
    </body>
</html>
```

这里，当解析完div标签后，就会解析script标签，这时的DOM结构如下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPuXWuVtTfdiaCDJpbkzlxaLTXbq8jc62TLckAtgbkPIDmS84eGm6aBvXQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这时，HTML解析器就会暂停工作，JavaScript引擎就会开始工作，并执行script标签中的脚本内容。由于这段脚本修改了第一个div的内容，所以执行完这个脚本之后，div中的文本就变成了“juejin yyds”，当脚本执行完成之后，HTML解析器就会恢复解析过程，继续解析后面的内容，直至生成最终的DOM。

上面我们说的JavaScript脚本是通过script标签直接嵌入到HTML中的。当在页面中引入JavaScript脚本时，情况就会变得复杂。比如：

```
<html>
    <body>
        <div>hello juejin</div>
        <script type="text/javascript" src='./index.js'></script>
        <p>hello world</p>
    </body>
</html>
```

其实这里的执行流程和上面时一样的，当遇到script标签时，HTML解析器都会暂停解析并去执行脚本文件。不过这里执行 JavaScript 脚本时，需要先下载脚本。脚本的下载过程会阻塞 DOM 的解析，而通常下载又是非常耗时的，会受到网络环境、JavaScript 脚本文件大小等因素的影响。

经过上面的分析可知，JavaScript 线程会阻塞 DOM 的解析，我们可以通过CDN、压缩脚本等方式来加速 JavaScript 脚本的加载。如果脚本文件中没有操作DOM的相关代码，就可以将JavaScript脚本设置为异步加载，可以给script标签添加 async 或 defer 属性来实现脚本的异步加载。两者的使用方式如下：

```
<script async type="text/javascript" src='./index.js'></script>
<script defer type="text/javascript" src='./index.js'></script>
```

下图可以直观的看出异步加载和直接加载的区别:

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMXFz3G9GZROYFKXvaWZCPu4GgOykxEZO1geVicInlSL7XMnnjoJYKib6HWpPibqJiaqYWcrib2v1HG8zg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

其中蓝色代表脚本下载，红色代表脚本执行，绿色代表HTML解析，灰色表示HTML解析暂停。

> 当初始HTML文档已完全加载和解析时，将触发DOMContentLoaded事件，而不需要等待样式表，图像和子框架页面加载。该事件可以用来检测HTML页面是否完全加载完毕。

**defer 和 async属性都是去异步加载外部的JS脚本文件，它们都不会阻塞页面的解析**，其区别如下：

- **执行顺序：** 多个带async属性的标签，不能保证加载的顺序；多个带defer属性的标签，按照加载顺序执行；
- **脚本是否并行执行：** async属性，表示**后续文档的加载和执行与js脚本的加载和执行是并行进行的**，即异步执行；defer属性，加载后续文档的过程和js脚本的加载(此时仅加载不执行)是并行进行的(异步)，JavaScript 脚本需要等到文档所有元素解析完成之后才执行，DOMContentLoaded事件触发执行之前。

再来看另外一种情况：

```
<html>
    <head>
   <style src='./style.css'></style>
    </head>
    <body>
        <div>hello juejin</div>
        <script>
            const ele = document.getElementsByTagName('div')[0];
            ele.innerText = 'juejin yyds';    // 操作DOM
            ele.style.color = 'skyblue';      // 操作CSSOM
        </script>
        <p>hello world</p>
    </body>
</html>
```

上面的代码中，第9行是操作DOM的，而第10行是操作CSSOM的，所以在执行 JavaScript 脚本之前，还需要先解析 JavaScript 语句之上所有的 CSS 样式。所以如果代码里引用了外部的 CSS 文件，那么在执行 JavaScript 之前，还需要 等待外部的 CSS 文件下载完成，并解析生成 CSSOM 对象之后，才能执行 JavaScript 脚本。而 JavaScript 引擎在解析 JavaScript 之前，是不知道 JavaScript 是否操纵了 CSSOM 的，所以渲染引擎在遇到 JavaScript 脚本时，不管该脚本是否操纵了 CSSOM，都会执行 CSS 文件下载，解析操作，再执行 JavaScript 脚本。

所以，JavaScript 会阻塞 DOM 生成，而样式文件又会阻塞 JavaScript 的执行，我们在开发时需要格外注意这一点。

最后再来看一种情况，示例代码如下：

```
<html>
    <head>
        <style src='./style.css'></style>
    </head>
    <body>
        <div>hello juejin</div>
        <script type="text/javascript" src='./index.js'></script>
        <p>hello world</p>
    </body>
</html>
```

这段HTML代码中包含了CSS外部引用和JavaScript外部文件，在接收到 HTML 数据之后的预解析过程中，HTML 预解析器识别出来了有 CSS 文件和 JavaScript 文件需要下载，就会同时发起两个文件的下载请求。



# Chrome调试工具

“工欲善其事，必先利其器”

Chrome浏览器不仅可以调试页面、JS、请求、资源、cookie，还可以模拟手机进行调试。我们现在只是使用html和css，我们先讲一下现在常用的调试。

## 使用

直接在页面上点击右键，然后选择  “检查”     快捷键    F12  或者   ctrl+shift+i

 <img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924150226492.png" alt="image-20210924150226492" style="zoom:80%;" />

基本的结构布局是左边html 右边是 css

![image-20210924150240117](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924150240117.png)

### chrome调试数值

可以鼠标点击后面的数值，  按下键盘  上箭头 是 调大 数值， 下箭头是 调小数值

![chrome5](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/chrome5.png)



### 快速定位css所在行数

![chrome6](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/chrome6.png)





## Chrome提示的常见布局错误

### 1). css单词书写错误提示

用下图所示的黑色箭头，点击我们需要的 html 元素。

![image-20210924150613056](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924150613056.png)

### 2). css无显示

声明类名和html调用名不一致   或者   css文件引入不对  或者  这个样式的前面 多余了一些符号影响的

![image-20210924150601761](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924150601761.png)

### 3). html 结构不匹配(重要) 

左侧   展开可以看到html 标签是否匹配

 ![image-20210924150551349](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20210924150551349.png)



### 4). 通过颜色判断盒子

蓝色是 盒子的 宽度高度     青色是 内边距     橙色 是外边距   通过这个很方便的看到盒子给的范围

 ![chrome8](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/chrome8.png)



# Chrome DevTools中的现代Web调试

如今，开发者通常会利用框架、构建工具和编译器从更高级别的角度来编写 Web 应用程序。在 DevTools 中调试或分析 Web 应用程序时，目前能查看和调试的都是已经编译的代码，而不是实际编写的代码。很多时候，我们并不想调试已经编译、压缩后的代码，而是想调试原始代码：

- 使用 TypeScript 时，不想调试编译之后的 JavaScript，而是想调试原始的 TypeScript 代码；
- 当使用 Angular、JSX 之类的模板时，并不希望调试生成的 DOM。而是调试自己编写的组件。

总而言之，我们可能希望在编写自己的代码时对其进行调试。虽然 source maps 已经在一定程度上缩小了这一差距，但 Chrome DevTools 和生态系统可以在这方面做更多的事情。下面就来看一看吧！

## Deployed 和 Authored 代码

目前，在 Sources 面板中导航文件树时，可以看到已编译（通常已压缩）包的内容，这些是浏览器下载和运行的实际文件。DevTools 将其称为 Deployed 代码。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOM6h0CIWYPhlzDqnhB5uOejz0OiagQM3NsRXOwILPbUAudVFaxoQibMqGTIGgkblicfnIIXPicWqZ0UQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这在调试时可能并不是很方便，我们希望查看和调试自己编写的代码，而不是打包完的代码。为了弥补这一点，现在可以通过树来显示我们编写代码（这被称为 Authored 代码）。这使得树更接近于在 IDE 中看到的源文件，并且这些文件现在与 Deployed 代码是分离的：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOM6h0CIWYPhlzDqnhB5uOejtw5YNm32dH1JN4FbztgicIMYc82OFiclMCnECGlHG211QvmlibvIiaetg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

可以在 Chrome DevTools 中开启此选项：**DevTools** > **Settings** > **Experiments** > **Group sources into Authored and Deployed trees.**

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOM6h0CIWYPhlzDqnhB5uOeEzSKiaLH6FWXxbEAHcu5v7S68KknpcLKiafztLOMUKb9Oc4Go5jS2nJw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

> 注：Chrome DevTools 团队计划很快默认启用此实验选项。

## Just my code

> 注：这是 Chrome Canary 106 版本的预览功能。

当使用依赖项或在框架之上构建应用时，第三方文件可能会阻碍我们的调试。多数时候，我们只想调试自己编写的代码，而不是隐藏在 `node_modules` 文件中的某些第三方库的代码。

为了弥补这一点，DevTools 默认启用了一个额外的设置：自动将已知的第三方脚本添加到忽略列表。可以在 **DevTools** > **Settings** > **Ignore List** 中找到它。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOM6h0CIWYPhlzDqnhB5uOes79xoG7ssaOXNHAYibQuLSTWZFE1Eoldb6YJlRyTRX6qiatptWWeee7Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

启用此设置后，DevTools 会隐藏框架或构建工具标记为忽略的任何文件或文件夹。作为开发者，我们不需要做任何事情来启用这种新的行为，具体实施取决于框架。比如，从 Angular v14.1.0 开始，其 `node_modules` 和 webpack 文件的内容已被标记为忽略。因此，这些文件夹、其中的文件等都不会出现在 DevTools 的各个位置。

### （1）在堆栈跟踪中

这些被忽略的文件不再出现在堆栈跟踪中，现在可以看到更多相关的堆栈跟踪信息：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOM6h0CIWYPhlzDqnhB5uOe1Z6FmoXAQ0evUyUPichic36LEJITTlmlVIHyZdhL7MXmeqMxxF715EcA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

如果想查看堆栈跟踪的所有调用帧，可以单击显示更多帧链接。

这同样适用于在调试和单步执行代码时看到的调用堆栈。当框架或打包程序通知 DevTools 的第三方脚本时，DevTools 会自动隐藏所有不相关的调用框架并在单步调试时跳过任何被忽略的代码。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOM6h0CIWYPhlzDqnhB5uOekCTQmYckBUkJGROA3Lr31gsFpymS8icgBZ6oodr6YtSy2n3iawUnRKcw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### （2）在文件树中

要想在 Sources 面板的 Authored 代码树中隐藏忽略的文件和文件夹，需要在 DevTools 的 Settings > Experiments 中选中 **Hide ignore-listed code in sources tree view**。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOM6h0CIWYPhlzDqnhB5uOeGgB5cuuGjxl3fZCCrT4h1oBYsE5icHaibebOJjfUeYicaOUG7ibEN9H4tQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

在示例的 Angular 项目中，node_modules 和 webpack 文件夹现在已经隐藏了：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOM6h0CIWYPhlzDqnhB5uOeKeN4BRzn5uydMaoPicWVAgf0KY8NhQ1DtNbRF6dyKXjHp8pyEQuLB2w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### （3）在快速打开菜单中

被忽略的代码不仅可以在文件树中隐藏，还可以在“**快速打开**”菜单（快捷键：Control+P (Linux/Windows) 或 Command+P (Mac)）中隐藏。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOM6h0CIWYPhlzDqnhB5uOeuUOcJzgZpoLfNU0ThILRpjQ9wVoRlFF0F5ibwN1icrickAGhOUe4lu89g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 对堆栈跟踪的改进

Chrome DevTools 对堆栈跟踪引入了更多改进。

### （1）Linked 堆栈跟踪

当某些操作是异步触发时，DevTools 中的堆栈跟踪目前只能显示部分情况。例如，在 `framework.js` 文件中有一个简单的 `scheduler`：

```
function makeScheduler() {
  const tasks = [];

  return {
    schedule(f) {
      tasks.push({ f });
    },

    work() {
      while (tasks.length) {
        const { f } = tasks.shift();
        f();
      }
    },
  };
}

const scheduler = makeScheduler();

function loop() {
  scheduler.work();
  requestAnimationFrame(loop);
};

loop();
```

在 `example.js` 文件中使用 `scheduler`：

```
function someTask() {
  console.trace("done!");
}

function businessLogic() {
  scheduler.schedule(someTask);
}

businessLogic();
```

在 `someTask` 方法中添加断点或检查控制台中打印的跟踪时，看不到任何与` businessLogic()` 调用相关的信息：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOM6h0CIWYPhlzDqnhB5uOeYa3USP4TL2f8szHknibicueW7q5YhkOo6MzGQI3ibk7YYsWHxFc26Xdrg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

在堆栈跟踪中也看不到面包屑来帮助我们找出导致该任务的事件之间的因果关系。多亏了一个名为“Async Stack Tagging”的新功能，通过将异步代码的两个部分链接在一起，解决了这个问题。

Async Stack Tagging API 引入了一个名为 `console.createTask()` 的新控制台方法。API 签名如下：

```
interface Console {
  createTask(name: string): Task;
}

interface Task {
  run<T>(f: () => T): T;
}
```

`console.createTask()` 调用返回一个 `Task` 实例，可以使用它来运行任务的内容 f。

```
// 任务创建
const task = console.createTask(name);

// 任务执行
task.run(f);
```

该任务形成了创建它的上下文和正在执行的异步函数的上下文之间的链接。

> 注：Async stack tagging API 将在 Chrome 106 中可用。

把它应用到 `makeScheduler` 函数中，代码变为了这样：

```
function makeScheduler() {
  const tasks = [];

  return {
    schedule(f) {
      const task = console.createTask(f.name);
      tasks.push({ task, f });
    },

    work() {
      while (tasks.length) {
        const { task, f } = tasks.shift();
        task.run(f); // instead of f();
      }
    },
  };
}
```

有了它，Chrome DevTools 现在能够更好的显示堆栈跟踪：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOM6h0CIWYPhlzDqnhB5uOeibEkvIAyal847rwR8t4PNmvlRnxo7UkfIhias8Siaqc19BOZiaN59WNOQw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

注意，`businessLogic()` 现在是如何包含在堆栈跟踪中的。不仅如此，该任务的名称为 `someTask` 而不是像以前那样通用的 `requestAnimationFrame`。

### （2）友好的调用帧

在构建项目时，框架通常会从各种模板语言生成代码，例如 Angular 或 JSX 模板，它们将看起来像 HTML 的代码转换为最终在浏览器中运行的纯 JavaScript。有时，这些生成的函数被命名为不太友好的名称——要么是压缩后的单字母名称，要么是一些晦涩或不熟悉的名称。

在示例项目中，包含一个名称：AppComponent_Template_app_button_handleClick_1_listener，可以在堆栈跟踪中看到它：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOM6h0CIWYPhlzDqnhB5uOeV80XRfggibVjg7G7pqWicsoAMFbzFC5SprMKkAuNeicuJgwXVGVgAFSPQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

为了解决这个问题，Chrome DevTools 现在支持通过 source maps 重命名这些函数。作为开发者，我们无需执行任何操作即可启用此功能，具体实施取决于框架。

通过本文列出来的新增功能，Chrome DevTools 可以为我们提供更好的调试体验！Chrome 团队还想探索更多领域，特别是如何改善 DevTools 中的分析体验。期待 Chrome DevTools 未来可以带来更友好的调试体验！

> 参考：https://developer.chrome.com/en/blog/devtools-modern-web-debugging/



# 实用的Chrome DevTools调试技巧

Chrome DevTools 提供了很多实用功能来调试源代码、捕获元素状态、更新和测试元素属性、模拟各种设备环境等。今天就来学习几个超实用的调试技巧！

## 1. 选择和检查 DOM 元素

在 Chrome DevTools 的 Console 面板中，可以输入一些带 `$` 的命令来选择和检查 DOM 元素。

`$0` - `$4` 命令可以用来显示在 Elements 面板中检查的最后五个 DOM 元素，`$0` 返回最近一次选择的元素，`$1` 返回最近一次之前选择的元素，以此类推。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCx5KYer8kmg17Ff3VibvJHRCVpbbZ77wQEibQCa2MG47F1u5sibRBCYibzpA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

`$(selector)` 返回带有指定的 CSS 选择器的第一个 DOM 元素的引用。这个命令就等同于 `document.querySelector()` 函数：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCxQFhdGSFmdSM1ib1qibBFY1gIBWzeAzxaNjkLqZgmeLDH78hpARbry27Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

`$$(selector)` 返回与给定 CSS 选择器匹配的元素数组。这个命令等同于 `document.querySelectorAll()` 函数：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCxuhtqybjia7LQA4tS5BxiafsA7TCeTSW2mV8d2TTP0BpiciaPzhd7ibODCAw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 2. 复制数据

在日常开发中，我们会使用 Chrome DevTools 来调试页面，比如修改页面的样式、节点属性等。其为我们提供了复制数据的功能，可以将修改后的内容复制到源代码中。

**复制 CSS 样式：**

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCxqgotkW5yiaEg2cMpjx6f4QhDTsvdbxVBVyvBR1VG7MUnQRRx87efB6A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

我们可以复制 CSS 规则或声明，甚至可以将内容复制为 JavaScript 键值对：

```css
// Copy rule
element.style {
    max-height: 90%;
    max-width: 90%;
}

// Copy all decalarations as js
maxHeight: '90%',
maxWidth: '90%'

// Copy property
max-height

// Copy value
90%
```

**复制 HTML 内容**，右键点击要复制的元素 -> Copy，点击要复制的内容类型即可：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCxgx7JDZlAq8ic5WjyNsQl2Uknh1arvpsxVuqxBYJI8ia0ScRiaycViaKvwA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**复制请求数据：**

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCxdd57zTckFdt0iafvXpibkkwmTULIhGgCniboF4DmbPu3H2IL9TibyAHl6g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 3. 发送 XHR 请求

Chrome DevTools 支持重新发送 XHR 请求。在和后端进行接口联调时，如果想要重新发送请求，并且参数保持不变，可以直接右键点击要重新发送的 XHR 请求，点击 Replay XHR 即可重新发送该请求：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCxcJL46BhmMGterAF268ybQVURuYZCy2KXia4HbcVHiajAdWj4YYwaGiapQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

对于一个请求，有时需要修改请求参数并重新发送，可以直接在控制台发送请求。只需要先右键点击需要重新发送的 XHR 请求，选择 Copy -> Copy as fetch：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCx7PkRbU6YcpY7hBE4HFtRyPLaBwaiam75N3xHW8fpLmupaTvO5YFKNMw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

在 Console 面板中粘贴已经复制的请求内容，修改所需参数，按下回车发送请求即可：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCxVlPAkVEn0FA7OPsMggQsL3XLnLIunovv47dTe4S9fLrYoxTaquL9ZQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 4. 颜色选择器

Chrome DevTools 提供了一个颜色选择器来设置背景颜色和文本颜色。颜色选择器具有各种功能：颜色选择器具有各种功能，例如

- 色调控制；
- 使用吸管从页面元素中选择颜色；
- 切换调色板；
- 可以在当前颜色的 RGBA、HSLA 和十六进制表示之间切换；
- 不透明度控制。

只需在元素样式的颜色显示块上点击即可弹出颜色选择器：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCxo6qCQZTpQXibnXB3oIwUlsSEFrnZAbYuo4Vib4RYEkGLm7cEkW2haW5A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

可以使用吸管从页面上直接吸取颜色：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCx5gqcdB09bboQoE5IdzZM9T2YCW86icnvyJ3gpNlLpGtNNUGCCn1XeYA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 5. 监听事件

可以在 Chrome Devtools 的 Console 面板中输入 `monitorEvents()` 来监听指定目标事件的信息。该方法有两个参数，第一个参数是要监听的对象。如果未提供第二个参数，所有事件都会返回。要指定要监听的事件，传递一个字符串或字符串数组作为第二个参数。

例如，监听页面 body 上的点击事件：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCx6dp49sYIaqROSF1RHibXichY0fDYfN11LQ176urhibDH4542cV4QWUISA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

可以调用 `unmonitorEvents()` 方法来停止监听事件，需要传递一个停止监视对象的参数。例如，停止监听 body 对象上的事件：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCxsia6r8dq1UpeBQaYySVGkqetTE6cgPwLmY6R6oicvnHbpYuxCrbgqpYg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 6. 检查未使用的 CSS

可以在 Coverage 面板中检查页面中没有使用的 CSS 和 JavaScript 代码，可以通过以下步骤来打开 Coverage 面板：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCxzzQbhYticOkEhRicPNrg33YBNjUjyxicPkjicUhlw20VK2a3QAySxhlrIA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

点击刷新按钮开始重新加载页面，以测试页面的代码覆盖率：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCx4K3vWZ6Y0FUmeEXjMicAZpMw5CSzib2Bt4icVuD8z8jHiaHFjmotibUh9LQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

检查页面的资源使用情况，点击可以查看哪些代码是没有使用的，可以通过删除那些未使用的代码来最小化 CSS 文件的大小：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCxaOWwsdZibVXW13O5uTA49bBJ8k2CibINm1S1IEWkZ1zS9h2RzMaBicsKg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

对于测试结果，可以进行筛选、过滤、下载等操作。

## 7. 引用 HTML 元素

在 Chrome DevTools 的 Elements 面板中右键点击要引用的 HTML 元素，选择 `Store as global variable` 即可将其保存为一个变量，其变量名会在 Console 面板中打印出来：

<img src="https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCxPKaMSga08aC5PMoA2y8SOGScWibpPXEk5krdIHDbwA89XcZ504zutqg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1" alt="图片" style="zoom:80%;" />

## 8. 日志点

Logpoints （日志点）是一种向控制台提供调试信息的方式，而无需使用 console.log()，这在线上应用调试时会很有用。可以通过右键单击 DevTools 中的 Source 选项卡中的任何行并指定要记录的表达式来添加新的 Logpoint。执行该行时，就会在控制台中获得它的值。

<img src="https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCxqicicDREE8RicAskHxrIOE1sNp8xLlRowDD3KquSicBArVkMpKPoPIdrxw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1" alt="图片" style="zoom: 80%;" />

使用该功能可以减少调试代码，提高代码的整洁性。并且，线上应用也可以直接添加控制台输出。

## 9. 动态表达式

实时表达式是一种在表达式更改时显示其值的功能。这有助于追踪代价高昂的表达式（如动画中使用的表达式）或变化很大的表达式（例如，如果正在遍历数组）的问题。它会将 Console 面板里的表达式置顶，并且能随着用户点击的变化，而动态刷新该置顶的表达式。

只需点击下图中眼睛图标，输入一个想要置顶的 JavaScript 表达式即可：

<img src="https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCxsngYZT2BrlU2goVRCfuRIN5bEHfCgnZOibYyjl0xzIoUpYmF2JzOt5A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:80%;" />

<img src="https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCxopV1BiaXj6TPJaag4ckevOt2xVmTvx9GB00iczd2wOYyzibuibYMZMBBmw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1" alt="图片" style="zoom:80%;" />

## 10. 调试动画

Chrome DevTools 提供了检查和修改动画的功能。它可以帮助我们播放动画、修改动画时间并分析特定时间范围内的视图。

<img src="https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCx7YcD8n5bEU2JSPMhGNziaqJQib8IZLl5O3NoiauoibYqFkqbg4YYOLYvYg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

只需在 More tools -> Animations中打开动画面板进行调试即可：

<img src="https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCxbkqQe6xDFq0Dph7pO1E6iaYM4C9sjMQPrYhNDkzFV7j4wxSt6skTWYQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:80%;" />Animation Inspector (动画检查器）分为四个主要部分：

- Controls (控件) ：从此处可以清除所有当前捕获的动画组，或更改当前选定动画组的速度。
- Overview (概述) ：在此处选择一个动画组以在详细窗格中检查和修改它。
- Timeline (时间轴) ：暂停并从此处开始播放动画，或跳到动画中的特定点。
- Details (详细) ：检查并修改当前选定的动画组。

<img src="https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMfkFu0hnmh0UpoiaFXVxiaCxLr7EXjRleS4RfxXs2hbfgh3rxzwoAF5m0Biczicxf946DJJqNc0E8VYg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />



# 高级调试技巧⭐

## 1 一键重新发起请求⭐

在与后端接口联调或排查线上BUG时，你是不是也经常听到他们说这句话：**你再发起一次请求试试，我这边看下为啥出错了！**

重发请求，这有一种简单到发指的方式。

1. 选中`Network`
2. 点击`Fetch/XHR`
3. 选择要重新发送的请求
4. 右键选择`Replay XHR`

<img src="https://mmbiz.qpic.cn/mmbiz_gif/d3KxlCFgM07CmiaAnbADu5iaHdBO1dyrjthApsKSf6w1txTP8PjJuCpb0R0LMjrmDI74vhgibuO6r94zb5462Ix9g/640?wx_fmt=gif&wxfrom=5&wx_lazy=1" alt="图片" style="zoom:80%;" />

不用刷新页面，不用走页面交互，是不是非常爽！！！

## 2 控制台快速发起请求⭐

还是联调或修BUG的场景，针对同样的请求，有时候需要**修改入参**重新发起，有啥快捷方式？

1. 选中`Network`
2. 点击`Fetch/XHR`
3. 选择`Copy as fetch`
4. 控制台粘贴代码
5. 修改参数，回车搞定

<img src="https://mmbiz.qpic.cn/mmbiz_gif/d3KxlCFgM07CmiaAnbADu5iaHdBO1dyrjtNvUTd107Csj369ucia6H3zR83Tw5GDmB3mmX2zMTwDPp6MLesFKAIGg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1" alt="图片" style="zoom:80%;" />

曾经我总是通过改代码或者手写`fetch`的方式处理，想想真是太傻了...

## 3 复制JavaScript变量

假如你的代码经过计算会输出一个**复杂的对象**，且需要被复制下来发送给其他人，怎么办？

使用`copy`函数，将`对象`作为入参执行即可

<img src="https://mmbiz.qpic.cn/mmbiz_gif/d3KxlCFgM07CmiaAnbADu5iaHdBO1dyrjtysca1v0dOjqPZcD6OpXmZd7DgJqreC7miaeEGxhm8fzoCUfcUzAgHicw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1" alt="图片" style="zoom:80%;" />

以前我总是通过`JSON.stringify(fetfishObj, null, 2)`打印到控制台，再手动复制粘贴，这效率实在是太低了...

## 4 控制台获取Elements面板选中元素

调试网页时通过`Elements`面板选中元素后，如果想通过`JS`知道它的一些属性，如`宽`、`高`、`位置`等怎么办呢？

1. 通过`Elements`选择要调试的元素
2. 控制台直接用`$0`访问

![图片](https://mmbiz.qpic.cn/mmbiz_gif/d3KxlCFgM07CmiaAnbADu5iaHdBO1dyrjtwJGicPickVvFdOOM7Hus6tzIOTfH2picywqZMfIotic4A9m1rfIMICNA9A/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

## 5 截取一张全屏的网页

偶尔咱们也会有对网页截屏的需求，一屏还好，系统自带的截屏或者微信截图等都可以办到，但是要求**将超出一屏的内容也截下来咋办呢**？

1. 准备好需要截屏的内容
2. `cmd + shift + p` 执行`Command`命令，或者
3. <img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211101121774.png" alt="image-20221110112158736" style="zoom:80%;" />
4. 输入`Capture full size screenshot` 按下回车

![图片](https://mmbiz.qpic.cn/mmbiz_gif/d3KxlCFgM07CmiaAnbADu5iaHdBO1dyrjtsDDV8buou7Svmc9o0jmznjTVpuqaqg96FF3duHoZCraTV79TyzGpuQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

**如果要截取选中的部分元素呢？**

答案也很简单，第三步输入`Capture node screenshot`即可

![图片](https://mmbiz.qpic.cn/mmbiz_gif/d3KxlCFgM07CmiaAnbADu5iaHdBO1dyrjt7UFpMm3eYGicTCdh9bm8iaFTzGvaunorRfkaIJRf3SL2GUn8CKIk5YiaA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

## 6 一键展开所有DOM元素

调试元素时，在层级比较深的情况下，你是不是也经常一个个展开去调试？有一种更加快捷的方式

按住`opt`键 + click（需要展开的最外层元素）

![图片](https://mmbiz.qpic.cn/mmbiz_gif/d3KxlCFgM07CmiaAnbADu5iaHdBO1dyrjtfTILWdOb8hU0yXHJ6ib4qN3g0wp4OtRORq5Kw11vuZvRWbGZp8iaDibvA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

## 7 控制台引用上一次执行的结果⭐

来看看这个场景，我猜你也一定遇到过, 对某个字符串进行了各种工序，然后我们想知道每一步执行的结果，该咋办？。

```js
'fatfish'.split('').reverse().join('') // hsiftaf
```

**你可能会这样做**

```js
// 第1步
'fatfish'.split('') // ['f', 'a', 't', 'f', 'i', 's', 'h']
// 第2步
['f', 'a', 't', 'f', 'i', 's', 'h'].reverse() // ['h', 's', 'i', 'f', 't', 'a', 'f']
// 第3步
['h', 's', 'i', 'f', 't', 'a', 'f'].join('') // hsiftaf
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211101117578.png" alt="image-20221110111729542" style="zoom:80%;" />

**更简单的方式**

使用`$_`引用上一次操作的结果，不用每次都复制一遍

```js
// 第1步
'fatfish'.split('') // ['f', 'a', 't', 'f', 'i', 's', 'h']
// 第2步
$_.reverse() // ['h', 's', 'i', 'f', 't', 'a', 'f']
// 第3步
$_.join('') // hsiftaf
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211101118634.png" alt="image-20221110111808600" style="zoom:80%;" />

## 8 快速切换主题

有的同学喜欢chrome的白色主题，有的喜欢黑色，我们可以使用快捷键迅速切换两个主题。

1. `cmd + shift + p` 执行`Command`命令
2. 输入`Switch to dark theme`或者`Switch to light theme`进行主题切换

![图片](https://mmbiz.qpic.cn/mmbiz_gif/d3KxlCFgM07CmiaAnbADu5iaHdBO1dyrjthEeXtsPjG8kLRicTyFEGtfw9mH6p7XtTicFzASjDum5Xu2M1d3TZ3ytA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

## 9 "$"和"$$"选择器

在控制台使用`document.querySelector`和`document.querySelectorAll`选择当前页面的元素是最常见的需求了，不过着实有点太长了，咱们可以使用`$`和`$$`替代。

<img src="https://mmbiz.qpic.cn/mmbiz_gif/d3KxlCFgM07CmiaAnbADu5iaHdBO1dyrjttLZmsLhOUhsS050tOicSlTBh4BayG3sRv4ub4Apep8tIGBm2kgJIqnA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1" alt="图片" style="zoom:80%;" />

## 10 $i直接在控制台安装npm包

你遇到过这个场景吗？有时候想使用比如`dayjs`或者`lodash`的某个`API`，但是又不想去官网查，如果可以在控制台直接试出来就好了。Console Importer 就是这么一个插件，用来在控制台直接安装`npm`包。

1. 安装`Console Importer`插件
2. $i('name')安装npm包

<img src="https://mmbiz.qpic.cn/mmbiz_gif/d3KxlCFgM07CmiaAnbADu5iaHdBO1dyrjtGC2Yu0HyRgBj8RfZXan7OmM1eBNXUGO3boXs8qsRfePkrsa64Nle5A/640?wx_fmt=gif&wxfrom=5&wx_lazy=1" alt="图片" style="zoom:80%;" />

## 11 Add conditional breakpoint条件断点

假设有下面这段代码，咱们希望食物名字是`🍫`时才触发断点，可以怎么弄？

```js
const foods = [
  {
    name: '🍔',
    price: 10
  },
  {
    name: '🍫',
    price: 15
  },
  {
    name: '🍵',
    price: 20
  },
]

foods.forEach((v) => {
  console.log(v.name, v.price)
})
```

这在大量数据下，只想对符合条件时打断点条件将会非常方便。试想如果没有条件断点咱们是不是要点n次debugger？

![图片](https://mmbiz.qpic.cn/mmbiz_gif/d3KxlCFgM07CmiaAnbADu5iaHdBO1dyrjtZZicPWKZxamcSfmjVwXFnnrSC9qFDSq6oB1tgBiaWqKNKcMS8C5FkzVg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)



# Chrome Devtools

## Sources 切换分组方式

Sources 面板默认是按照域名来分组的，这样想找某个文件比较麻烦：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgMKEziboCSiaKZEfKu9TmtjzzXeqhoZnvNBPl7YzjMbR35vmia0VcTIdHBmkc9iaV47XTaZicJXzTsicQg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

其实可以切换到不以域名分组的方式：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgMKEziboCSiaKZEfKu9TmtjzmAFI3Dy4AwBLUsCsSd1DItd4w51CCs51Aef3u6WzKFdQINdicT7licDQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这样想找某个文件是不是就清爽多了。

## Network 自定义展示列

Network 是可以修改展示的列的，比如我勾选 Cookie 和 Set-Cookie：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgMKEziboCSiaKZEfKu9TmtjzHTicrQUrRxUqBjZRtt3wc0g3LdYsQfvvN8iaQApc0FibCl5nW0N3cib6lg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

就会在 Network 列表里展示这两列：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgMKEziboCSiaKZEfKu9Tmtjz8BaNPfEfm8MZv9sNKbwNicAXqO1vSYiahOoX6lgvtfXeB9NFBSPCntUQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这两列啥意思呢？

Set-Cookie 的意思就是这个请求的响应会设置几个 cookie。

点开请求的详情确实是这样的：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgMKEziboCSiaKZEfKu9TmtjzgiazLg43gorzDQj294p7DkwdQ8zZvtojvFo9NAoibVc4ib6vMk9MTO01A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

Cookies 的意思就是说这个请求会携带几个 cookie：

比如那个携带 17 个 cookie 的请求：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgMKEziboCSiaKZEfKu9TmtjzX8dTcYvCVwiaWA5O3lzGqSNkSaYHMY8JZ3TbRDyAYEzpVnDTfbeO0Pw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

不用数，肯定是 17 个。

除此以外，你还可以自定义展示的 header：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgMKEziboCSiaKZEfKu9TmtjzjibmGzmgtD25FOFWt86FmtVh5M2MoqZ2xiaZbIbqEZnlJ3bMIic97BAsw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgMKEziboCSiaKZEfKu9TmtjzeZ86sDHkgZxsSGGypfPoCA58KXsHxusb5MWVgOoGQo4Dh31RC0fldA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

想展示啥 header 都行。

有同学可能会问，请求详情里不是能看到所有 header 么？这里展示有什么意义么？

效率不一样呀，一个个点开看，和列表里直接展示这个 header，那效率肯定差很多呀。

## 样式快速复制

我们经常用 chrome devtools 来调试样式，然后把调好的样式复制到编辑器里。

大家是不是都是选中再复制的？其实不用，可以直接用这两个功能：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgMKEziboCSiaKZEfKu9TmtjzYCLbO2lmNHp2oNtobicouEQwqsaC5pmTpzuOjmZD4x7FsnSibdFzn9Ow/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

复制单个样式或者复制全部样式，效率更高一些。

## 快速查看计算后的样式

有的时候我们写的样式是要经过一些计算才能得到最终的样式的，比如 rem，calc 等：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgMKEziboCSiaKZEfKu9TmtjzC96fx1y11yrwTFoaVwGEslMYBxUuUibznAbzxJ8BGT7aPa2DfriczLMA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

怎么知道这里的 1rem 计算后是多少呢？

可以在右边的 computed 里找：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgMKEziboCSiaKZEfKu9TmtjzfIkncLzbz7V3pbBO1dVUorSL0MepOOcOJicbSnZSkBOrHyagqFQibubw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

但是这样是也太多了吧，怎么快速找到我想看的那个 1rem 对应的是多少呢？

可以右键这个样式，点击 view computed value，就可以快速过滤出对应那条样式对应的计算后的样式了：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgMKEziboCSiaKZEfKu9TmtjzXjrOXiapAjIY6qMjfGJI4mpibicchLsEicsRAnjzx66VEaxCLMv7hFp11A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 调试手机网页

很多人调试移动端的网页都是用 vconsole 来展示日志，这样效率是很低的。

chrome devtools 支持远程调试，可以调试安卓手机上的网页。

用 USB 连接手机和电脑就行（安卓手机上要在设置里打开允许 USB 调试）。

之后打开 chrome://inspect 就可以看到所有手机上的网页了，还有 APP 调试包的 webview 里的网页：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgMKEziboCSiaKZEfKu9Tmtjzab1xA7ZYODDzlc4xicvqvfSQ72GKZuYzlXvicEcgr1Bd9FLzoDMlJC8Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

点击 inspect 就可以调试移动端网页了：

<img src="https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgMKEziboCSiaKZEfKu9TmtjzqCK53plc90hJiaiaUgia3ZImhyjYhnmBhW5Kw6wIpkSUa7ZxDkL4wRxxw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:80%;" />

可以审查元素，可以在控制台执行一些 JS，可以用 Network 查看网络请求，大部分调试功能都能用。这不比 vconsole 香么？

浏览器里的网页，还有调试包 APP 的 webview 里的网页都能调试。当然，最好还是手机也用 chrome 浏览器打开，这样支持的功能是最多的。

## 总结

今天我们又学了一些 chrome devtools 的小技巧：

- Sources 默认是按照域名分组，可以切换成文件名列表的方式，更容易查找文件
- Network 可以自定义展示列，比如 Cookie、Set-Cookie 或者任意的 header
- 样式可以右键 copy declaration 快速复制
- 样式可以右键 view computed value 快速查看计算之后的值
- chrome devtools 可以调试 USB 连接的安卓手机的网页（浏览器里的和调试包 APP 的 webview 里的），调试体验比 vconsole 好得多

这几个小技巧看一遍就记住了，下次用 chrome devtools 的时候就试一下吧。



# 前端调试技巧⭐

今天分享了 Network 相关的小技巧：

过滤请求可以用 status-code、mime-type、resource-type 等过滤器，有啥过滤器可以通过 - 来提示，但是 - 是非的意思，之后要去掉，过滤器可以组合来使用。

过滤器不支持内容过滤，这个可以自己搜索。

sourcemap 文件的请求不显示在 Network 里，这个可以在 dawer 的 develop resources 面板里看到。

Network 的请求列表可以自定义展示的列，waterfall 也可以改展示的信息，我觉得展示 duration 有用的多。

学会了这些 Network 小技巧，相信你调试网络请求时效率会更高。

## filter⭐

一个网站会有很多的请求，当你想查找某个请求的时候，是怎么过滤的呢？

关键词搜索么？

但是关键词搜索只能根据 url 来过滤。

很多时候这样不太够。

比如我想搜索视频类型的请求，根据 url 怎么过滤？比如我想搜索大于 1M 的请求，根据 url 怎么过滤？

这时候就可以用过滤器功能了。

输入 mime-type，加个冒号，Chrome DevTools 就会列出当前网页的请求的所有 mime type，选择某一种，就会过滤出那种 mime type 的请求。

比如过滤 mp4 请求：

<img src="https://mmbiz.qpic.cn/mmbiz_gif/YprkEU0TtGgmuUNspd6UnbmLpYHa8kdtEOwL80R801qqcS4ib5icQswxZKSFdoTPmXtJMU9p2K9UXvOy9heDynVg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1" alt="图片" style="zoom:80%;" />

过滤 webp 请求：

<img src="https://mmbiz.qpic.cn/mmbiz_gif/YprkEU0TtGgmuUNspd6UnbmLpYHa8kdtEgoxUSyapt9gVD7F23I2gyJaxPQVDGwUicdiazvoMK4wZJWlEic815uAQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1" alt="图片" style="zoom:80%;" />

或者不根据 mime-type，根据资源的大致分类来过滤：

输入 resource-type，加个冒号或者按右方向键，会展示出所有的资源分类，包括 document、stylesheet、image 等：

![图片](https://mmbiz.qpic.cn/mmbiz_gif/YprkEU0TtGgmuUNspd6UnbmLpYHa8kdtLMVIryQqc1Xrm89xGjlibjIGvIBlsWribDMIX6LWwZWXFtHRIZPokrRw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

其实这就是 Network 的这部分：

![图片](https://mmbiz.qpic.cn/mmbiz_gif/YprkEU0TtGgmuUNspd6UnbmLpYHa8kdtDHgxShMx0uYG7iaM7HeLNoaztypYZECVPjyxbQ44zEb1HDAr5ILskbw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

而且还可以按住 command 键多选。

除了资源类型外，还可以根据状态码过滤：

![图片](https://mmbiz.qpic.cn/mmbiz_gif/YprkEU0TtGgmuUNspd6UnbmLpYHa8kdtpgstpiaTyc4tlm9Wgv4SnfzeWWarKn5uMyqaJgxpQR641Jvu1yic5Zkw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

比如 200、404、500 等，只是我测试的这个页面没有 404 之类的请求。

状态码 0 代表被删除或取消的请求，网络请求是可以被取消的，这种就可以通过状态码 0 来过滤。

此外还可以根据资源的大小来过滤：

通过 larger-than 指定 100、300k、2M 等大小的限制，就可以过滤出大小大于这个值的请求。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/YprkEU0TtGgmuUNspd6UnbmLpYHa8kdtDWCqA6XMVCibI4awx6C6n8zGvT2jsdmNFHCfwPt2diaicIb5ibjOF4icbWA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

还可以根据请求方式，是 GET、POST 等来过滤：

![图片](https://mmbiz.qpic.cn/mmbiz_gif/YprkEU0TtGgmuUNspd6UnbmLpYHa8kdt3Qficibs8Jic80kQL5afaHoOeMWRCVcxJG9v03pLbica1icabe9sA2tJ1kQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

根据是否包含某个响应 header 来过滤：

![图片](https://mmbiz.qpic.cn/mmbiz_gif/YprkEU0TtGgmuUNspd6UnbmLpYHa8kdtFTHAuJ0WVlwsZDj8qh0IfHz5ebqvzZSiajXqic807oNrw382MTOT7T7w/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

has-response-header:Set-Cookie 过滤出来的就是有设置 cookie 的响应的请求

has-response-header:access-control-allow-origin 过滤出来的就是支持跨域的请求

根据是否包含某个 cookie 来过滤：

![图片](https://mmbiz.qpic.cn/mmbiz_gif/YprkEU0TtGgmuUNspd6UnbmLpYHa8kdtMrLwIZ1qf3ITHfBH0Tg36ib8aY90zTrWfiaGia1v4qCH0YLSF0j9JJe3w/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

常用的过滤器主要有这些：

- has-response-header：过滤响应包含某个 header 的请求
- method：根据 GET、POST 等请求方式过滤请求
- domain: 根据域名过滤
- status-code：过滤响应码是 xxx 的请求，比如 404、500 等
- larger-than：过滤大小超过多少的请求，比如 100k，1M
- mime-type：过滤某种 mime 类型的请求，比如 png、mp4、json、html 等
- is：过滤某种状态的请求，比如 from cache 从缓存拿的，比如 running 还在运行的
- resource-type：根据请求分类来过滤，比如 document 文档请求，stylesheet 样式请求、fetch 请求，xhr 请求，preflight 预检请求
- cookie-name：过滤带有某个名字的 cookie 的请求

当然，这些不需要记，输入一个 - 就会提示所有的过滤器：

![图片](https://mmbiz.qpic.cn/mmbiz_gif/YprkEU0TtGgmuUNspd6UnbmLpYHa8kdt790V1hm215y0FeHbSkhw0y5Oa0sBAbTZsib7nsKA2xA9WXianiaVgGawg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

但是这个减号之后要去掉，它是非的意思：

![图片](https://mmbiz.qpic.cn/mmbiz_gif/YprkEU0TtGgmuUNspd6UnbmLpYHa8kdtno4PShwtRjGlBgx3Rnz2RYpqB5Vvoq3f9lRJ3V1mr8t2XJvD8XFctQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

和右边的 invert 选项功能一样。

而且，这些过滤器都可以组合，只要中间加个空格就行。

但是有同学会问了，这些过滤器里好像不支持根据内容过滤呀。

确实，过滤器不支持这个，但是可以自己搜：

![图片](https://mmbiz.qpic.cn/mmbiz_gif/YprkEU0TtGgmuUNspd6UnbmLpYHa8kdtQNgNHLiaiaKfyDbHjib97uCLgibeibFPWTaOxq0xSEyxtWW9tKbKMicaTsTA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

## developer resources

看到 sourcemap 有的同学可能会问，对了，sourcemap 文件为啥在 Network 里看不到呢？

明明会下载 sourcemap 文件，为啥我从来没看到过呢？

其实这个被 Network 过滤掉了，想看到这些文件的请求在另一个地方：

点击 show console drawer：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgmuUNspd6UnbmLpYHa8kdtjRl8TQM0qkbaumqkhvYIgoVxRtCW1FNTlKvNIojMUJB6nWDwJIaxibA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

打开 developer resources:

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgmuUNspd6UnbmLpYHa8kdtd11IM2XlZYH7OdTHo07ACR6gXYsTXqSTyQX6zSLMpGrk9O8icKNIa9Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

就可以看到所有的 sourcemap 请求了：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgmuUNspd6UnbmLpYHa8kdtTd7jX4vtzok6nXLMrTDDroKmvXNrFzSfbbAnJ6NsGHoucMX2uv68Eg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## custom columns

请求的列表里展示什么列是可以自定义的：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgmuUNspd6UnbmLpYHa8kdtwoyz6MpQ8ibaPhMIoThXHKlohVth405LJicibhSIdgAZKlyYTgUZD1utg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

比如 cookies 和 set-cookies 就可以看到所有携带和设置 cookie 的请求：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgmuUNspd6UnbmLpYHa8kdt5dRUBcRXVDBZbSpL1a8jrIGVevAVQrvyt8yLwzdniaRb9bGgRxnupPQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

勾选 cache-control 可以直观看到不同资源的缓存设置：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgmuUNspd6UnbmLpYHa8kdtk6ay4DV1OoemvibWy5ffmbtWHq3s2MKibicduDe7YmtjENk2Nu10e8OSQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

请求列表右边有个 waterfall，默认是展示请求的时间，但我觉得这个没啥用，我更喜欢看请求响应的耗时：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgmuUNspd6UnbmLpYHa8kdtOaJL6Zzkpy1TjfeysM1yGa8aQDDhWCVz1qt4CUMsoUIfbssxfrcmQA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

所以我会把它换成 total duration：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgmuUNspd6UnbmLpYHa8kdth45Y79jj9J5rMYNFq9jL9XtPUXrZPbevsODBDkcuRKtTOc2OTD8zyg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这样 waterfall 展示的就是耗时了：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGgmuUNspd6UnbmLpYHa8kdtBjbDF8QZWOZVWaLib6JNFibGEkBart5xfuHdQzC2EbJghVJylwyzRJcQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

可以直观的看到请求的耗时，还可以排序。我觉得这个数据有用的多。



# Chrome 日常功能

众所周知，`chrome`是目前市面上一骑绝尘，占有绝对领导地位的浏览器。其强大的功能和生态圈，不但惊艳了很多用户，也让很多开发者爱不释手。不过不少开发者(**尤其是初中级开发者**)使用`chrome`还是停留在`F12`打开控制台`查看log`、`检查元素`或者`debug`打断点阶段，其实chrome的强大的功能远远超过我们的想象。本文针对这种情况，结合实际业务开发场景，为`初中级前端开发者`整理了一些在日常开发中可以大幅`提高效率`但又不容易被发掘的chrome特性。帮助大家提高日常效率，节省出更多的时间**学**(✋🏻)**习**(🐟)！！



> 如果这篇文章能给您带来一点点的帮助的话，麻烦移动下鼠标点个❤️赞❤️吧！您的点赞会给笔者带来更新的持续动力！

## 1 关闭同源安全模式，一秒解决所有跨域问题

不管是`日常开发`还是`面试`，`跨域`和`同源策略`都是一个老生常谈的问题。基本上每一个新手成长过程中都会遇到下面让人抓狂的经典报错：`No 'Access-Control-Allow-Origin' header is present on the requested resource`😖😖😖

![图片](https://mmbiz.qpic.cn/sz_mmbiz/H8M5QJDxMHpt0u6WOaRKIjr44bD4XQ9q0Eria6llMnITZRicF89WhHTcTT25XqzLlcrQo6Q8QHFcTicUia6ZJbmdWg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)image.png

怎么改js都代码都改不好，快要崩溃。

就算是去问了度娘，度娘告诉我们这是跨域问题，需要配置请求headers头来解决，我们还是一脸懵逼：什么是`反向代理`？还要找`后端解决`？说的不好被后端看出来`水平很菜`怎么办？

其实，跨域是仅仅存在浏览器端，为了安全策略而采用的一种方案。如果是仅仅是本地调试的话，我们完全可以把这个安全策略禁用掉，让所有的跨域限制都放开，可以在chrome中更加自由的翱翔！

> ps: 这种方案只能仅仅用在本地调试功能和需求，不需要很多配置就可以快速开发好前端功能，正式上到测试环境或者生产环境还是要采用反向代理等策略哦~

禁用方式也很简单，window的操作步骤分别只有2步，mac更是只需要一行命令行即可。

```
a. 新建一个chrome快捷方式，右键“属性”。
b. “快捷方式”选项卡里选择“目标”，添加  --args --disable-web-security --user-data-dir
```

![图片](https://mmbiz.qpic.cn/sz_mmbiz/H8M5QJDxMHpt0u6WOaRKIjr44bD4XQ9q2I1YfT4C0qU9j9BHHiaU4LOlA0PU6v2OziawKfMfYerzibDBf5D2deZXA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)image.png



## 2 无痕模式实现多账号同时登陆

很多后台管理系统的日常开发过程中，我们经常遇到这样的问题：系统有多角色多账号，且在本地调试开发的时候往往会遇到需要`同时登录多个账号`调试需求的情况。比如：

1. 开发OA工作流审批。从发起审批到部门领导总经理，一层层流程我们开发的时候，得需要挨个登录退出切换账号，才能完成需求开发，登录页面看的快吐了。
2. 多账号调试。我们本地自测的时候，往往由于账号数据问题，需要看多个账号的数据来渲染页面，但是在`单端登录`的情况下，一个账号登录完了，在登录另一个账号就需要先退出，或者踢掉之前的账号，来回切换苦不堪言。

以前我们不想来回切换的时候，就会再去打开一个新的其他浏览器（甚至还见过找一个新电脑...）。这样解决两个账号还好，多个账号就得找多个不同浏览器，治标不治本...

那么有没有更好更快的做法呢? 有！那就是`无痕模式`！我们只需要在chrome任务栏里轻轻右击选中`打开新的无痕式窗口`，就可以得到一个`干净`的，`不被其他页签干扰`的`'全新'`的浏览器！想同时登陆多少账号都可以啦！

![图片](https://mmbiz.qpic.cn/sz_mmbiz/H8M5QJDxMHpt0u6WOaRKIjr44bD4XQ9qUdAR3f5XxOhco9ic4hYB1XsjL596y7qhOEjrFWtnKuFX5kib56rdGrpg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)image.png

## 3 自定义浏览器网速，快速定位接口异步问题

我们在日常开发中，经常会有这样一些场景故事：

测试提了一个bug：**打开XXX页面数据显示不正确**。我们拿到问题单，在本地疯狂刷新页面，怎么刷数据都是对的。在测试人员的坚持和截图/录屏`实锤`下，于是乎我们开始抛出经典debug方法：`你重启电脑试试`！

客户说我这里打开页面很慢，白屏很长时间，需要优化。我们自己打开页面的时候，因为是本地资源，加载无延迟，就会说没问题，你看很快啊，页面很nice，不用优化！

有经验的前端开发都知道，其实很多问题`偶现`或者某些`特定机器`、`特定环境`下出现，大部分都是因为是`网速`、`配置`、`代理`等等一系列额外环境因素造成的，其中最常见的就是`网速造成的异步加载问题`。测试的电脑往往因为`压测力度大`、或者`网速占用率较高`等原因，会更容易出现一些异步加载问题。

此外，由于一些客户特殊的环境，往往网速很慢，我们开发的时候，一般会有较高的宽带配置，很难复现客户问题。

那么，我们可以不可以也给项目营造一个`苛刻`的周边环境，让很多问题可以更容易复现呢？答案就是浏览器的`自定义network速率`。话不多说，直接上图：

![图片](https://mmbiz.qpic.cn/sz_mmbiz/H8M5QJDxMHpt0u6WOaRKIjr44bD4XQ9qjOLaLZ4WQ5q4Y0PaM4awa6lyKqaV5kHTPFhRXfEnEuFnggEq4ibUdGA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)image.png

![图片](https://mmbiz.qpic.cn/sz_mmbiz/H8M5QJDxMHpt0u6WOaRKIjr44bD4XQ9q1hk2wbBSCmeLj54FnOWPTictDxaVu2m2pibuhY5u2BBxh16DE4TQjT5g/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)image.png

可以看到，我们不但可以选择`无限制`、`高速3G`、`低速3G`、`离线`模式，还可以通过`add`自定义想要的网速模式。利用这个功能，我们可以更快定位问题，更好的做`首屏优化`了！

> ps:除了网速可以限制，我们还可以对cpu运行速度加以限制，用来更好的复现问题，cpu的限制就留给各位自己去查咯~

## 4 控制台自动模拟鼠标hover、focus事件

还是以实际开发场景为例，我们需要在一些鼠标`hover悬浮`或者`input点击聚焦focus`的情况下改变一些样式,如：

```less
// <input class="demo-input" />
.demo-input:focus {
    border: 1px solid #000000;
}

// <div class="demo-div" />
.demo-div:hover {
    border: 1px solid #000000;
}
```

这个代码需要优化调试的时候，我们往往要去控制台`element`一项中去寻找`input`或者`div`元素，然后使用箭头定位到元素找到他的class样式。

但是我们会比较尴尬的发现，我们`聚焦`或者`悬浮`元素的时候，就没办法去查看元素在控制台的样式代码，当我们去控制台查看代码的时候，因为元素已经失焦，就没有办法触发`聚焦`或者`悬浮`！

很多开发者麻了的同时，只能硬着皮头去代码里一点点去翻。其实chrome这么强大肯定会考虑到这一点~我们此时可以利用控制面板中的模拟聚焦功能，直接贴图：

![图片](https://mmbiz.qpic.cn/sz_mmbiz/H8M5QJDxMHpt0u6WOaRKIjr44bD4XQ9qTsXic7oKxpQpxJpQ61ou42QvHcmk2W0nb5Fw6PybRJnYz4qK5qt7tzg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)image.png

## 5 log和network日志保留

有一些页面需要去通过查看`log`或者`network`接口自动去调试需求的同时，代码逻辑中还存在刷新动作(`window.location.reload`)，这样会导致一种情况就是我们辛辛苦苦在一点点查`log`或者`network`接口日志的时候，还没来的及看完返回值，页面啪一下就没了，所有的log日志都被清空重载了，很是悲伤。。

我们可以利用chrome的`preserve log`将所有的日志一直保留下去~

**控制台console日志**保留：

![图片](https://mmbiz.qpic.cn/sz_mmbiz/H8M5QJDxMHpt0u6WOaRKIjr44bD4XQ9qqQicPOqcGlJI7MnR8mRNZAnux6fjf7icrqMbqCK6EEWJTDwlmARfqIyA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)image.png

**控制台network日志**保留：

![图片](https://mmbiz.qpic.cn/sz_mmbiz/H8M5QJDxMHpt0u6WOaRKIjr44bD4XQ9qaTC46fxc8SPFWNJhquj6iav2f8vMqDxS90TlNibyx3Oy0YMMIdr023xw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)image.png

这样我们就再也不用担心日志消失啦！



# Chrome DevTools中的这些骚操作

[Chrome DevTools中的这些骚操作，你都知道吗？](https://mp.weixin.qq.com/s?__biz=MzU2MTIyNDUwMA==&mid=2247509374&idx=1&sn=6053a4e1affabb71f4d085b7ae9e0aee&chksm=fc7eeb25cb0962334afd959fda7f12d964db97799e1a620e760cacdb9e1cdf751135974d9068&mpshare=1&scene=23&srcid=1220Je8p0PV2z93WGy9VpdDI&sharer_sharetime=1671534236850&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

## 1. 保留日志

当我们刷新完页面之后，通常控制台的 Console 面板就会被清空。如果想保留控制台的日志，就可以在设置中勾选 Preserve log 选项以保留控制台中的日志。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElHbeatg0Tlo6MGe9wL0RwwdicKCUjuj5CHNWUZyXwGeEKeBJ42maoJbA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 2. 代码覆盖率

我们可以打开设置，在`Experiments`中勾选`Record coverage while performance tracing`选项。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElkRd15kOksynkAFscwOrNkt3a8zibJe82AkViagumDOZyHfoiciapqdxEmw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

在面板下方的`Coverage`面板中点击红色按钮以记录页面的代码覆盖率：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElibN5wzfowqmLfgGehqTOYv2Ahb6ItqslTia3vUORK2DC7Ph7tq4RdUHQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

> 代码覆盖率使用动态分析法来收集代码运行时的覆盖率，让开发者知道有代码在页面上真正的使用。动态分析是指在应用运行状态下收集代码执行数据的过程，换句话说，覆盖率数据就是在代码执行过程中通过标记收集到的。

## 3. 显示重绘

在浏览器的开发者工具中可以通过开启显示重绘选项以查看页面在执行操作时哪些元素会发生重绘。在控制台右上角三个点中的 `More tools` 选项中开启 `Rendering` 选项卡：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElUKhvC4cA7YpS2iacCchYKF3vZZ3Rp21QoQO4ItX0HoYoVPBhkM0QGfg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

开启 Rendering（渲染）选项后，开启 `Paint flashing`：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElCwLr9V7iaW287FuIpTNAHfY3wZicRIvsbibvfRUMicmibJrPGAhEkg9IVwQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

当刷新页面时，显示绿色的区域就是重新绘制区域。

## 4. 检查动画

Chrome 的开发者工具不仅可以调试样式，还可以调试动画，可以在控制台右上角三个点中的 `More tools` 选项中开启 `Animations` 选项卡：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElXtDwRx6H5RicjGkibeTta4ibP8CvRsiabz0jnGQFh28BpXKkROy50Pvnlw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

当页面的动画执行时，就会在时间轨道上查看所有的动画，点击其中一个动画可以懂得执行过程以及时间轴：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqEl1sPJFwibaGiab5uy4Mz93ViavoJOvxymU3aAs54gMfVQaDUQr7Jrl5F9A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

我们可以在时间轴上定位到任一时刻的动画帧，也可以拖动左右两端的圆点来修改动画的延迟和周期，修改之后可以在属性面板看到对应的 CSS 样式。

## 5. 截图

Chrome 浏览器内置了截图功能，可以在浏览器开发者工具中使用 `Ctrl+Shift+P`（Windows）或者`Command+Shift+P`（Mac）快捷键打开搜索来查找`screenshot`：![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElzzibFwpd3zXa8dA1yOTpvwKjmPfFBicjExelhuQ5mcHmDMbZdBzeANHA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)这里有四个选项：

- 第一个：截取自选区域；
- 第二个：截取整个网页；
- 第三个：截取当前节点；
- 第四个：截取当前屏幕。

截图完成后自动下载到下载目录，打开浏览器的下载框或本机的下载目录即可看到图片。

## 6. Local Overrides

我们可以使用本地资源覆盖网页所使用的资源，比如可以使用本地 CSS 文件覆盖网页的css文件，修改样式。将本地的文件夹映射到网络，在 Chrome 开发者功能里面对 CSS 样式的修改都会直接改动本地文件，页面重新加载，使用的资源也是本地资源，达到持久化的效果。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElUOibE7K5Pc3lyNib837oBDu9stich76veu612SOv42PhWKqs8u8smBUyg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**详见：**https://developer.chrome.com/blog/new-in-devtools-65/#overrides

## 7. 全局搜索代码

Chrome浏览器为我们提供了全局搜索的概念，可以点击开发者工具右上角的三个点，点击Search选项，在Search面板中搜索所需关键字即可，点击搜索结果即可跳到对应文件的代码行：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElkR0eDlLoKuIxYRDKWHxVF2K8JwRPe47p2dcy6g2e5OicvOYcmZHW3Tw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 8. 事件监听器的断点

有时应用会在用户发生交互时出现问题，这时我们就可以添加事件监听器添加断点来捕获这些事件以检查交互时的问题。可以在`Source`面板右侧的`Event Listener Breakpoints`中勾选相应的事件：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElbTFB6hfjSxlQq4cptwl86sWuiaQOlwXU6ic1RVmN5SuIS5QX5seWRlOA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 9. DOM 操作的断点

当页面的内容发生变化时，如果想要知道是哪些脚本影响了它，就可以给DOM设置断点。我们可以右键点击需要设置断点的DOM元素，在弹出的菜单中点击`Break on`以选择合适的断点。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElOztItzSaxj0utKqDPq2YUMmou5j6ib59rgpAUvXQdvIcgVPuAGrclCA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

可以看到，Break on中有三个选项：

- `Subtree Modifications`：子节点（内容、属性）修改通知，常用在子节点内容发生变化后，来定位源码；
- `Attributes Modifications`：当前节点的属性修改通知，常用在节点的 className 等属性被修改后，来定位源码了；
- `Node Removal`：当前节点移动时通知，常用在节点被移除时，定位源码。

## 10. 异步请求的断点

XHR breakpoints 可以用于异步请求的断点，点击加号即可添加断点规则，输入请求 的 URL 地址（片段），会在请求地址包含对应字符串的异步请求发出的位置自动停止：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElFp99TbMkhOg0jRdEumXDccwdUQicVibbGzJdCtibzcBeMqLcwlqCMxzow/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 11. CSS Overview

在 Chrome 的管理面板中，开启 CSS Overview 面板之后，就可以查看当前网站的样式信息了，包括颜色信息、字体信息、媒体查询等。当我们需要优化页面的 CSS 时，这个功能就派上用场了。除此之外，还可以使用该功能方便地查看其他优秀网站的样式信息。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElaFbyBe6Z2oF1xWf9O97o4Lx5l0vBHSv6RrMCiaQXjfc0TdzkiaIpIbwg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

默认情况下，该面板是不开启的，可以通过以下步骤来开启此功能：

1. 在任意页面打开 Chrome 浏览器的 DevTools；
2. 单击**更多选项** -> **More tools** -> **CSS Overview**。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElOUD9NYog16jG8hHEOxiaL7PPu0XOhXCQPehkjsSgjjYLYclmeuJSvvA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

那该如何使用 CSS Overview 面板呢？很简单，只需要点击 **Capture overview** 按钮来生成页面的 CSS overview报告即可。如果想重新运行CSS Overview，只需点击左上角的**清除**图标，然后再点击 **Capture overview** 按钮即可。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElibY6H4oA69noBYibYwKibic1P7Mj4bzTasLQmBm8wP0TosprXxZtZc8sgQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

CSS Overview 报告主要由五部分组成：

（1）**Overview summary：** 页面 CSS 的高级摘要

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElW1vyjkn1ibHdazhURDjs2QQeAaOhtUtdT5UhlklDTQh8xj5CrwFsgibA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

（2）**Colors：** 页面中的所有颜色。颜色按背景颜色、文本颜色等用途分组。它还显示了具有低对比度问题的文本。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElL8BvDEwY9u50btib97omWZ0jNHX7qruU5FpuLHfOkBPMlFq14lhE50w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

每种颜色都是可点击的。我们可以单击它以获取使用该颜色的元素列表。将鼠标悬停在列表中的元素上就可以突出显示页面中对应的元素。**单击列表中的元素就可以在“Elements**”面板中打开该元素。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqEleRTKFxQmRWqc5YGSHWkgwAIvjYhicnIVowxFYTialo3icD9Uvibxu0LdsA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

（3）**Font info：字体信息，** 页面中的所有字体及其出现，按不同的字体大小、字体粗细和行高分组。与**颜色**部分类似，可以单击以查看受影响元素的列表。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElaKmgvfW8x0SD7LUWjR2en72ztRBjvMLA3OD6VHMRKvh9jeibLoang6Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

（4）**Unused declarations：** 未使用的声明，包含所有无效的样式，按原因分组。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqEleMOnJOSEtPHW6vPLomXfGFMvic3hib56v4JnF27H8PFJPt4dpDicpwq2Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

（5）**Media queries：** 媒体查询，页面中定义的所有媒体查询，按出现次数最高的排序。单击可以查看受影响元素的列表。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElXgOJ12KE2hoTSicumsAfXRVKB1JRwHic5K51LClTgOSqXhXWKqv1fqwg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 12. CSP 违规断点

**Chrome DevTools CSP 违规断点可以捕捉到与CSP违规有关的可能的异常，并在代码中指出这些异常。**

> CSP 即内容安全策略，它允许限制网站中的某些行为以提高安全性。例如，CSP 可用于禁止内联脚本或禁止eval，这两者都可以减少跨站脚本 (XSS)攻击的攻击面。
>
> 一个特别新的 CSP 是可信类型 (TT)策略，它支持动态分析，可以系统地防止对网站的一大类注入攻击。为了实现这一点，TT 支持网站监管其 JavaScript 代码，只允许将某些类型的东西分配给 DOM 接收器，例如 innerHTML。
>
> 网站可以通过包含特定的 HTTP 标头来激活内容安全策略。例如，标头content-security-policy: require-trusted-types-for 'script'; trusted-types default激活页面的 TT 策略。
>
> 目前，调试 TT 违规的唯一方法是在 JS 异常上设置断点。由于强制 TT 违规将触发异常，因此此功能可能会很有用。但是，在现实的场景中，需要对 TT 违规进行更细粒度的控制。特别是，我们希望仅在 TT 违规（而不是其他异常）上中断，也在仅报告模式下中断，并区分不同类型的 TT 违规。

启用该功能将为应用程序增加一个额外的安全层，减少跨站脚本（XSS）等漏洞。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElaxUvkJKTQOo9S01ibbiaewC4bBojiazXL4ckEibRwYich05D3XhJmhz9s8A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

那该如何启用该功能呢？可以通过以下步骤来开启此功能：

1. 在任意页面打开 Chrome 浏览器的 DevTools；
2. 点击右上角**设置**图标 -> 选中左侧 **Experiments** -> 勾选 **Show CSP Violations view；**

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElEpLXUgxqRrMNyOxph29YHCfE2cljQfNcpicwpticzNufaotiaI3Pe6zFw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

1. 重启浏览器的 DevTools；
2. 在 **CSP Violations Breakpoints \**下选择\** Trusted Type Violations** 即可。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElaQOZREeNOOn7tgXnTsC904CianDS2Geef9wyS5fYHuEnHEUOR9duHBg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

当遇到有安全问题的代码时，Chrome DevTools 甚至会显示如何修复改问题。

## 13. 新的字体编辑器工具

Chrome DevTools 提供了一个实验性的字体编辑器工具，可以用来改变字体设置。可以用它来改变**字体、大小、粗细、行高、字符间距**，并实时看到变化。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElwnt5ia0t4NgYnwRRYlfSMpjVfXIMlZjGX6CwWpERq1dzibibgZzGoVuCQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

那该如何启用该功能呢？可以通过以下步骤来开启此功能：

1. 在任意页面打开 Chrome 浏览器的 DevTools；
2. 点击右上角**设置**图标 -> 选中左侧 **Experiments** -> 勾选 **Enable New Font Editor Tools within Styles Pane；**

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElfh42TZjWfveibdzXOt7ngAeL4PJiasxYPmKxbxD9oCPkardNYUFNo6Gg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

1. 重启浏览器的 DevTools；
2. 选择HTML元素，其中包括想改变的字体，点击字体图标即可。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElMb02w0CjfpsIqSPA2icL45cl4MsZNXHt4HEwtnrbgeaiaVAjvA6oIj5Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 14. 双屏模式

通过启用双屏模式，可以在 Chrome DevTools 模拟器的双屏设备上调试你的 web 应用。这对于开发要适配折叠屏手机的应用是非常有用的。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElTnf7kqS9s7RNxdDdTb6lumw0jP0ppJLf1yvD9YNwldseygOMwAdKuA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

那该如何启用该功能呢？可以通过以下步骤来开启此功能：

1. 在任意页面打开 Chrome 浏览器的 DevTools；
2. 点击右上角**设置**图标 -> 选中左侧 **Experiments** -> 勾选 **Emulation: Support dual-screen mode；**

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElSyM21d4YOToJfX8kNxfukpzeZAWDIEZ7cT5OCJkScA2OiaEfWwSGhhA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

1. 重启浏览器的 DevTools；
2. ①切换到移动设备调试 -> ②选择一个双屏设备 -> ③点击上方的切换双屏模式。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqEl6yWCjRBGnx7icflthwuclGODpplspFmOhTYcZBCvf2Tibibh0UHibxSHLA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 15. 完整的可访问性树视图

通过 Chrome DevTools Accessibility Tree，可以检查为每个DOM元素创建的可访问性对象。这项功能与 Elements 选项卡相似，但使用它可以深入探索应用的更多可访问性细节。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElPVmeHUibxxnUToo865Dh8YCIiak98ouOiakoCEradSqzQlZfbC9uT1L0A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

那该如何启用该功能呢？可以通过以下步骤来开启此功能：

1. 在任意页面打开 Chrome 浏览器的 DevTools；
2. 点击右上角**设置**图标 -> 选中左侧 **Experiments** -> 勾选 Enable the Full accessibility tree view in the Elements pane；

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqEl68Nia4UkGEe1w5OHjOibj1hq5jgOiaEQejQQnRCu1dib2ucicXWmsZ7qvKA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

1. 重启浏览器的 DevTools；
2. 在Elements面板中点击右上角的无障碍按钮，将元素视图模式切换为无障碍树视图。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNX3uP5DquicfeAxJ584JqElFYbES7N4fedAI1XkiaLTiaMicAUePcnCw99KEqTJUGfYibyibo8DDq5zOGQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



# 优秀扩展插件⭐

[推荐50个超实用的 Chrome 扩展，建议收藏！](https://mp.weixin.qq.com/s?__biz=MzU2MTIyNDUwMA==&mid=2247495781&idx=1&sn=b802610c1030a2dde60d2dc073e448e4&chksm=fc7ebe3ecb0937286e0527fc6867947e64502e7128e675ef7b4faa4e63ccaad1aafd25fb4ab5&mpshare=1&scene=23&srcid=1223ZXJdYxW956xhGxSbljOL&sharer_sharetime=1671798424896&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

大家好，我是 CUGGZ。今天来分享 50 个超实用的 Chrome 浏览器扩展！![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbZUwiaZ0yhFYjs6oE99LsaAp1sw5Bj3jNS5z0hcN1QeCSRm6uQrj6Wkw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## JSON

###  JSONView

`JSON`数据格式简单，结构化，层次分明，是开发人员最常用的数据格式，目前是大部分接口返回值的首选。

> 有时我们在浏览器中访问get请求数据，由于接口返回值太多，一眼根本无法看出数据的层次和结构，顿时有点懵逼。针对这种情况，很多人可能会想到，将数据复制到一些在线的Json工具，或者使用postman发送请求，这样就能非常愉快地浏览格式化的数据。

> 这样不是不行，我想说的是，其实不用这么麻烦，还有更简单的方式。只要安装一款chrome插件，在浏览器中，就能轻松访问浏览格式化的数据。这款插件的名字是：`JSONView`。

<img src="https://mmbiz.qpic.cn/mmbiz_png/uL371281oDF3wW2hgFThLtkFrV3Z0ANGiaWazU8IC3uEzUC571axoX2WZR5icF47J6waesagGZRIYlVOQQOpNb5w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:50%;" />

之后，再访问接口时，就能看到更人性化的数据了：

<img src="https://mmbiz.qpic.cn/mmbiz_png/uL371281oDF3wW2hgFThLtkFrV3Z0ANGicOh9WFk7jbLWicor2pvYJgm9tHAPb8OWZqCkeCDovHIVN3aeHbAukzA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:50%;" />

不说了，这就是我想要的。

### JSON Viewer Pro

JSON Viewer Pro 用于可视化JSON文件。其核心功能包括：

- 支持将JSON数据进行格式化，并使用属性或者图表进行展示；
- 使用面包屑深入遍历 JSON 属性；
- 在输入区写入自定义 JSON；
- 导入本地 JSON 文件；
- 使用上下文菜单下载 JSON 文件；
- 网址过滤器；
- 改变主题；
- 自定义 CSS ；
- 复制属性和值；

输入界面如下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBb6FbT08GgzGfnMyT4D0m3trTdvwQ7b0NVL3UB1Bq4icKOEwdw2EKjq3A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

格式化之后：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbqeApzaPsbnNVicL2a1icibkfJLGrGUgaiboxh6FLuXrh1MF4lN0ShCU95w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### JSONVue

JSONVue 是一个JSON数据查看器，主要用来格式化JSON数据：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbPc0Du4QJB3ghkfSr83l2KjpcmggXBwlZyz9De7E6tg5kGMHlib2WXPA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBb0TK4FuozM1uJ9CITXicumsWrezo6tdyXb7UZgnDzCsz5qKSIa0z9XtA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### JSON Formatter

<img src="https://mmbiz.qpic.cn/mmbiz_png/MtIub1ta1ib5wrAo845I2JyjyIkSR5EjeXa7Be8YjDECjzkFibb3LS1Z6ypwBNsyXbMfkCksXHYbNT7QA4w6jB7w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

这款插件应该就不用我多说了吧，相信每个前端都会有一款 `Json` 格式化插件，这个插件用起来也很简单，只需要添加到拓展程序即可，当我们下次打开一个`json`文件的时候就会自动帮我们格式化完成。

<img src="https://mmbiz.qpic.cn/mmbiz_png/MtIub1ta1ib5wrAo845I2JyjyIkSR5Eje2jKE7pykboDYMehLARBDWMdE5yZB1KGjO6l5ZyMsIMIIQh1EZ6esMg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

## 网站技术

### Library Sniffer

Library Sniffer 是一款给开发者使用的工具，能够探测当前网页所使用的类库、框架和服务器环境，为开发者提供了方便。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbzgV0s3oicrEX2GliclZ1xR2pdgkn7aCmhyF8Sk3XyiblMPhJDUmUb1Btg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Wappalyzer

> Wappalyzer 扩展可以用来识别网站背后的底层技术。通过此扩展，可以了解特定应用程序是否是用 React、Vue、Angular、PHP等编写的。还可以访问有关 Web 服务器、编程语言、框架、内容管理系统、分析的信息工具、数据库等。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBb6bLeMS9a8YB1O3BlUDY11I1gBfzyO2AzJPhBLBniahPdWbNg9NFrs1g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### WhatRuns

> WhatRuns 扩展程序只需单击一下即可找到任何网站上使用的技术。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbBQ3GEVxrf3c6TYKFicsqAVuwWKrwrEB6XHY1icuibHWCOjIrhgLghFRkA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 开发调试

### PerfectPixel by WellDoneCode

> 使用PerfectPixel插件可以将设计图加载至网页中，与已成型的网页进行重叠对比，以帮助开发和设计人员规范网页像素精度。这是一款可以优化前端页面显示的Chrome插件。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbPfEP7oBBiaMhmZVQNc3icUmT4aEB9XDUka75n2g8ThWhuG86Iaztm39g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Clear Cache

可以使用此扩展程序快速清除缓存，无需任何确认对话框、弹出窗口等。可以在选项页面上自定义要清除的数据和数量，包括：应用程序缓存、缓存、Cookie、下载、文件系统、表单数据、历史记录、索引数据库、本地存储、插件数据、密码和 WebSQL。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBb2GibyNGRgiaHIfSnAiaRGJtAwNPP23FmicTTFKKnicFT0szz2rgmFGUvfjA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### VisBug

VisBug 是一个使用 JavaScript 构建的开源网页设计调试工具，它可以让用户使用点击式和拖放式界面来查看网站的元素。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBb1EFkABZXuyv2eiapbujndD1G27eBR0aTtFgfJRoSkictHzoxfrO7W7tQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Debug CSS

Debug CSS 是一个帮助调试CSS的插件。他可以显示出页面元素的轮播，按住Ctrl，并将鼠标悬浮在元素上，即可查看其信息：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbJh85biabeoeZ2u170BkaicybrIv3b8ahdn2GneiaZZ3pthEzBuwE00mjg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### CSS Viewer

CSS Viewer 是一款适用于 Web 开发人员的高效 Chrome 扩展。顾名思义，CSS 查看器可以显示将鼠标悬停在任何网页上的元素的 CSS 属性。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbCyL2b2X2frEOlMYyOYvaWVgImfDXEfJrKXWib3riaIFicjUkaLFZ378eA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### EditThisCookie

EditThisCookie 是一个 cookie 管理器。可以添加，删除，编辑，搜索，锁定和屏蔽cookies。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbBv0QOCgOibgpdTP1eVnKW7u9xHp26hUmZLYq9Gc8wibwb8W9FX44t01w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### React Developer Tools

React Developer Tools 是开源 JavaScript 库 React 的 Chrome DevTools 扩展。它允许我们在 Chrome 开发者工具中检查 React 组件层次结构。安装此插件之后，将在 Chrome DevTools 中获得两个新选项卡："⚛️ Components" 和 "⚛️ Profiler"：

- Components 选项卡显示了在页面上呈现的根 React 组件，以及它们最终呈现的子组件；
- Profiler 选项卡用来记录性能信息。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbicrNz7SpHl0JffsEfA0owMxicOr4GhUHmcy4WFLLIhFCD6ib1BDeXSk1Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Vue.js devtools

Vue.js devtools 是一款基于chrome浏览器的用于调试Vue.js应用程序的插件，可以使得开发人员大大提高调试效率。支持用户对DOM结构数据结构进行解析和调试功能。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbDEZv4H0dd0kHsVtfn1xtrl031yvhmweNg5HpgjiauyIn2GdEhfbxHiaA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Augury

Augury 可以帮助开发人员在 Google Chrome 浏览器中调试和分析 Angular 应用程序。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbFGcHs2zlb5OSA8RgQ4icae5qUic6fwM1y97K6j8w3fEDI7BGZn7hdCdA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Firebug Lite for Google Chrome

Firebug Lite是火狐浏览器中著名的开发者工具firebug插件移植到Chrome中的插件，在Chrome中安装了Firebug Lite插件以后，开发人员可以像在火狐浏览器中使用firebug一样熟悉的方式来调试网页内容，其包含了基本的HTML、CSS以及Javascript的调试功能，用于帮助网页前端开发工程师快速地调试网页，以便及时地找到网页中的BUG并及时修复。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbD7xIngFbdZejib4micqNrpqbBKZQialb7GFX1lmJMgQEzGA6SrICloHYQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### HTML Validator

HTML Validator 在 Chrome 的开发者工具中添加了 HTML Validator。HTML 页面的错误数通过浏览器状态栏中的图标显示，详细信息可以在浏览器的开发者工具中查看。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbgIG8exRCDeGYXWuf7gDZiaiayhF5vvAznY76tZicAzqBd3phexCmdnCTQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Web Developer

Web Developer 扩展为带有各种 Web 开发工具的浏览器添加了一个工具栏按钮。该扩展适用于 Chrome 和 Firefox，并且可以在这些浏览器支持的任何平台上运行，包括 Windows、macOS 和 Linux。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbRPEVb4EAZqtG8FHuib9gcSKJOXdOa5OxK1ciadMRIhR825YKUpDUkGfw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Requestly

Requestly 是一款Chrome和Firefox浏览器插件，提供URL转发、修改HTTP请求和结果、插入脚本等功能。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbwqmu7K3w2Mt5nBUeD92mEVzu2Picmk6A9GXxRHpIjQ3icibtAKST8AaIg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Window Resizer

Window Resizer 主要用来调整浏览器窗口的大小以模拟各种屏幕分辨率。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbiagSXhqBZCBqhQCfOC7oLk7yYgzOCZp4DNzG240R4Zsum9xmibR3Htsw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Responsive Viewer

Responsive Viewer 是在一个视图中显示多个屏幕的 Chrome 扩展程序。该扩展将帮助前端开发人员在开发响应式网站/应用程序时测试多个屏幕。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbziaXZwBHHQ6ysZl394r6pKkzmePCG086g9icyTlfRicMlY6cRQF3wdicGg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Moesif Origin & CORS Changer

此插件允许直接从浏览器发送跨域请求，而不会收到跨域错误。可以使用此插件覆盖 Request Origin 标头，并将 Access-Control-Allow-Origin 设置为 *.

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbp8jq3oOicUWDPVKqY0I5DsNL6ZQ5RKFFGsEPLWoP5Z48Jpk4A6480OA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### ColorPick Eyedropper

ColorPick Eyedropper 是一个放大的吸管和颜色选择器工具，可让从网页等中选择颜色值。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbJqLAqScxm9H0ScETianMvCPARBW0GzKwFhpsC7LIptsBvc72eQXicxvQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### CSSPeeper

CSS Peeper 用于检查和复制元素样式的优秀工具，使用 CSSPeeper 可以将鼠标悬停在网页中的任何元素上，然后单击鼠标即可复制元素的样式。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbJ6AXKEQ5sib7vro6e6O6rTLGvtDuJt0ziatKibBolPgwonVxG4SCTxc6w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Dimensions

Dimensions是一款能帮助使用者对网页上各种元素属性之间的距离进行测量的Chrome页面元素测量插件，该插件在点击启动插件图标后，可以对页面中图像、输入字段、按钮以及视频等页面元素之间上下左右的方位尺寸进行测量，同时还可以通过使用快捷键来快速启用或关闭该插件的功能，简单实用。![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbKgib3Z7XyNoUIZh87TNnDZGBW3xLC7UOicGon40qL5vc2tFcI5iaNHnaw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Site Palette

Site Palette 用于生成调色板。设计师和前端开发人员必备的工具。可以通过这款插件轻松获取网站的配色方案。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBb3AdBegV2ib4THromJoMhUKMCsGP2zy1ZhiaM2IvI6RIvyO22Hd5PfMLA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### ColorZilla

ColorZilla 是一款功能强大的提取网页色彩的工具；也是个快速的对颜色进行调节的Chrome插件，许多的用户将这款软件称呼为颜色吸取插件，它提取的颜色是非常的多样化，还可生产css颜色的代码等。

- 吸管器-获取页面上任何像素或区域的颜色；
- 一个先进的颜色选择器类似于可以在Photoshop和Paint Shop Pro中找到的；
- 网页颜色分析器-分析任何网页上的DOM元素颜色，找到相应的元素；
- 终极CSS梯度发生器；
- 调色板查看器与7预先安装调色板；
- 颜色历史最近挑选的颜色；
- 显示标签名称，类别，编号，大小等元素信息；
- 光标下的轮廓元素；
- 自动将生成或采样的颜色复制到CSS RGB，Hex和其他格式的剪贴板；
- 使用键盘快速采样页面颜色的键盘快捷键。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBby345H77ndN2RmjAGEmkJHqAU2NIU70B52z5Dynaic3ytjfLpUwtaKfg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbucaiaDmtj0sK6CM6e5B7XmtibgWAP3Vbp3c5nqg5RMfxrM59XibakG1TA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 字体

### WhatFont

> 当我们想查看网页中文字的字体时，最常用的方法就是在控制台查看文字的字体样式。那还有没有更简单的方法呢？WhatFont 就是一个查看网页字体的Chrome扩展。只需要的点击扩展图标，再点需要查看为文字即可：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbzPz90CjPlzoLTnrZ9bH1c3oSxqI06sZFjZib61wesYzkBiagZqcG0U1A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Fonts Ninja

Fonts Ninja 可以从任何网站识别字体、添加书签、试用并购买它们。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbZf4Zdxy058crSebNm0A2Re6xe4ZKxpQIdQtGPdPSMtvTS2JsE1yIUA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 标签页

### Omni⭐

> Omni 是一个可以大大提高 Chrome 使用生产力的浏览器插件，可以通过简单的命令界面管理选项卡、书签、浏览器历史记录、执行各种操作等等，类似在 Mac 上使用 `Alfred` 一样。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212201011177.gif" alt="preview" style="zoom:67%;" />

如果你也是喜欢在使用 Chrome 浏览器的时候开几十个 Tab 页的话，那么你一定能体会到这种痛苦，比如想要找到之前的某个 Tab 页真的太难了，在新版本的 Chrome 浏览器中已经支持了搜索功能，通过 `Command+Shift+A` 即可唤醒。但是 Omni 实现的功能体验更加优秀，通过快捷键 `Command/Ctrl + Shift + K` 就能呼出一个类似的菜单。

Omni 具有以下的一些特性：

- 🗄 切换、打开、关闭和搜索 Tab
- 📚 浏览和管理书签
- 🔍 搜索你的浏览历史记录
- ⚡️ 50 多项提高生产力的措施
- 🔮 用于过滤和执行更多操作的特殊命令
- 🧩 与 Notion、Figma、Docs、Asana 集成......
- ⌨️ 静音、固定、书签等操作的快捷方式......
- ⚙️ 有助于解决浏览问题的高级设置
- 🌙 黑暗模式

#### 安装

**直接搜索插件安装**

直接在 Chrome 商店 https://chrome.google.com/webstore/detail/omni-bookmark-history-tab/mapjgeachilmcbbokkgcbgpbakaaeehi/ 下载安装即可。当然你也可以在本地运行 Omni，而无需从 Chrome 商店或 Firefox 附加组件安装。

**在 github 上安装**

在 GitHub 的代码库 https://github.com/alyssaxuu/omni 中，可以通过单击绿色的`code`按钮，然后单击`Download ZIP`下载代码包来，然后在浏览器中转到 `chrome://extensions/`，并启用开发者模式。拖动 `src` 文件夹到浏览器中，这样就可以在本地使用 Omni 了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212201010551.png" alt="image-20221220101055490" style="zoom:67%;" />

#### 使用⭐

安装完成后可以将该插件固定到工具栏，或者使用快捷键 `Command/Ctrl + Shift + K` 唤醒。

<img src="https://mmbiz.qpic.cn/mmbiz_png/5tqrztXFpumxoc7SgFk8rToFPMggVysZd2AswkFDB8QXR2L5fDxrryfe3BcoKDjyiarlr2ZuYKMWvkJhEsNeBOA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

如果你使用 Chrome 浏览器也可以前往 `chrome://extensions/shortcuts` 修改快捷键。要想关掉 Omni 则只需要使用按键 `Esc` 即可。

此外我们也可以通过 Omni 使用各种命令来执行操作或过滤结果。

- `/tabs`: 搜索 Tab 页
- `/bookmarks`: 搜索书签
- `/history`: 搜索浏览器历史
- `/actions`: 搜索所有可用的操作
- `/remove`: 删除书签或关闭标签

![图片](https://mmbiz.qpic.cn/mmbiz_png/5tqrztXFpumxoc7SgFk8rToFPMggVysZ5ObtRQNibsEbsIibw9btDaJHdnicuvJQhkokfLI9mDzFyywHT4ZBStibicg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

更多功能大家可以自行测试体验。

> 项目仓库：https://github.com/alyssaxuu/omni

### BrowserStack

> 使用 BrowserStack 快速启动扩展在任何浏览器中启动一个新的测试会话。最多可设置 12 个浏览器以实现快速访问并最大限度地减少切换浏览器所花费的时间。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbicD3zibECFoeZqx92OfmxMmaWMruWAShcRwH80EM8K9ho5n7L3MDGElg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Toby

> Toby 是一款 Chrome 新标签页工具，能够将未读的标签页分组显示在新标签页中，这样就能把所有未看完的标签页都关闭了。分组相当于多个 Chrome 窗口，将你的标签页都拖进 Toby 中，就不需要实时开着占地方了。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbuLcWPwfGSaqqiandsaCIx6ZJ73vgCcuLibKLttla9d8nZXP2fO65tWsw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### daily.dev

该扩展提供了每日热门开发者新闻，不需要再浪费时间搜索高质量的文章了。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbBZrxr2jzu5tkHgZe6Z5YuT8xuAnFke63jbtcRnjmWLZo2VTAp22REg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Momentum

Momentum 拥有漂亮的新标签页面，每日更新精彩背景壁纸图片，可设置每日新鲜事焦点以及跟踪待办事项，无广告，无弹窗。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbd3uic2ps7UAYS2y1tOtBBu95ialQbJ3AbkFNibuf9upOql5vaeyLURBibg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### The Great Suspender

The Great Suspender 是一个轻量级的扩展用来减少 Chrome 的内存占用。如果同时打开许多选项卡，在可配置的时间之后未查看的选项卡将在后台自动挂起，从而释放该选项卡消耗的内存和 CPU。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbvhqjPnFEHbkEXKyL1tu1ZrG3E01dxM33g2J65zKs70GMXooicN0ol0g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Session Buddy

Session Buddy是一个可以帮助用户查看、新增、编辑当前网站Session状态的Chrome插件。用户可以利用该插件保存网站当前的状态以便在关闭Chrome或关闭计算机后恢复，从而达到节省内存的作用。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbhSnibJ6iaWWEp96PqzlXfKBZnswP57WJ8kueT2rjqHOxnPETdZkCQhfA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 网站美观

### Dark Reader

<img src="https://mmbiz.qpic.cn/mmbiz_png/MtIub1ta1ib5wrAo845I2JyjyIkSR5EjevlSibPQoPo07ickvicgM3gCib54JgQO7hGTfxHFWeKn1Opia3usyhIwWLYA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

> 作为一个暗黑模式爱好者，在浏览一个网站的时候不支持跟随系统模式切换是不是有点难受？不用担心，这款插件可以让你在不同的网页有属于你自己的**暗黑模式**。

<img src="https://mmbiz.qpic.cn/mmbiz_png/MtIub1ta1ib5wrAo845I2JyjyIkSR5EjehKBhWbl5JUXdmHChHV5U0jNzQibeTz2OhAPbSow85to9jyBowf1zwwA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

> 不仅仅可以记住你所浏览的网页中所设置的**亮度、对比度、滤镜、灰度**，甚至还可以改变当前**网页字体的样式**。大家可以自己去试试，会有不同的感觉喔。

<img src="https://mmbiz.qpic.cn/mmbiz_png/MtIub1ta1ib5wrAo845I2JyjyIkSR5Ejercfh8zpiaLQzbdHkoXdKiasJDGX5QB8fmrKWnicddH8dggIic2sniaE4o3Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

## Github

### Github加速器

`github`号称是全球第一大同性交友网站，它是程序员的乐园，里面有各种好玩的开源项目。很多编程爱好者，秉承share精神，喜欢把自己优秀代码提交到`github`上，能够让更多的人看到，帮助更多的人。

但是，在国内对`github`访问非常慢，是很多程序员非常头疼的一件事。

![图片](https://mmbiz.qpic.cn/mmbiz_png/uL371281oDE8cbV3ibotGd6sIHV79ticQBwH6jh8puEuKpl96v1Zj2mj2C2Ne4lS2FwZxpm2BiaCukdiaKP1tE6bRg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)这时可以用`github加速器`插件：![图片](https://mmbiz.qpic.cn/mmbiz_png/uL371281oDE8cbV3ibotGd6sIHV79ticQBPqVCHIn1jIt4Yztpt3Fv6zpUoPc1MR28A4aDwVcZ18J0rj4y0FTiafA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)开启插件功能后，再访问该页面：![图片](https://mmbiz.qpic.cn/mmbiz_png/uL371281oDE8cbV3ibotGd6sIHV79ticQBiaNV8b3854ibnDibW2UqxJjIAHlBrKTMk1aXhTrwaic02XVD386O3esk3g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

`2秒`后就能非常愉快地访问`github`了。

### Octotree

<img src="https://mmbiz.qpic.cn/mmbiz_png/MtIub1ta1ib5wrAo845I2JyjyIkSR5EjeRsbxib03zFcUTZdicj6kT29e9zCjlu6YpUK2dSlxIHmOqrbtxMdND0lw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

> Octotree 旨在让 GitHub 体验更好。通常，为了检查 Github 中的子文件夹，需要手动单击文件夹并导航。Octotree 扩展解决了这个问题。此扩展在项目的左侧显示存储库的目录结构，这有助于更好地理解文件夹结构。
>

<img src="https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbq6R0h4w3O1VOGgX8KsGPmPbpytr7XGliaeNqhkGfKFVIFpIDwo3fRkA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1" alt="图片" style="zoom:80%;" />

### GitHub Hovercard

![图片](https://mmbiz.qpic.cn/mmbiz_png/MtIub1ta1ib5wrAo845I2JyjyIkSR5EjeF66CedE4jicYhuVQMtoxPniaaVcKXSQWiaDVo5F0s9eYn3ypLleBuqAfQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

如果你想在`GitHub`中快速了解到一个作者或者一个仓库甚至一个`issues`的信息的时候，你可以使用这款插件。

我们只需要将鼠标`hover`到作者名称、`issues`上就可以立马了解到对应的信息，这对于我这种经常翻`issues`的人来说简直是神器，可以马上筛选到我想要找的资料。

![图片](https://mmbiz.qpic.cn/mmbiz_png/MtIub1ta1ib5wrAo845I2JyjyIkSR5EjePHVxmzUG3iclfX3jUq8KC45Aicq1khicdJrULFYoCBSQgoJh17frQ5hZA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



### File Icons for GitHub and GitLab

File Icons for GitHub and GitLab 可以将 GitHub 和 GitLab 上的原始文件图标替换为特定文件类型的图标。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbrZK4D54x81p0GmrncQoHHQRWl6QpCa2OicTyfb4myVHE8z5Qic1qhcpg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 网页测试

### axe DevTools

ax DevTools 是一个快速、轻量级但功能强大的测试工具，由 Deque 开发的世界上最值得信赖的可访问性测试引擎 axe-core 驱动。使用 ax DevTools 在网站开发过程中查找并修复更多可访问性问题。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbBiaSUB1QmFhDCsJBFQvY5JpSEyodDEWCRNEUicx15KYhjA0bjxN0gvvg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### OctoLinker

OctoLinker 可以将特定语言的语句（如 include、require 或 import）转换为链接。当打开一个包含多个导入语句的文件并且想要快速打开它时，只需将鼠标悬停在链接的文件上并单击即可打开。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBb7YmMJVJzWnkxNygUKgdglHJIBzvZjrAGKbe9C2AuIEZlAU74aicRgKQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Web Developer Checklist

此扩展可帮助 Web 开发人员分析网页是否违反最佳实践。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBb3Y0KPUjlXt5OmMZxCyONEPLnIvHse5MBpPaAGibLEO0DnCofeJ8hnSA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Check My Links

Check My Links 是一个链接检查器，它可以抓取网页并查找损坏的链接。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbvIS35Nms1g6f1CDkkczpjhYRyvUdZsry0utaTu7yY2sjic7mABYukDg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Checkbot

Checkbot 是用于验证一组HTML页面上的链接的工具。Checkbot可以检查一个或多个服务器上的单个文档或一组文档。它会创建一个报告，该报告汇总了引起某种警告或错误的所有链接。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbdibv66CC9Ms6kk0m2ibicX6icV4COYtHia7J9dXYtwice7TCnsZ0kyTdCZKQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### PageSpeed Insights

Google Page Speed Insighs 是一款旨在优化所有设备上的网页、提高网页加载速度的工具。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbUc6krOVSboVUxlkhVjfhHibFQcJN0tlXCTiagW2Odfz3Xmq5ETINN6Kg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Meta SEO Inspector

META SEO inspector是一款可以帮助用户分析网页的meta信息并得到SEO评估的谷歌浏览器插件。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbX6vbwbsFMxSibp3KRBjiaic2uHicvwrGMeN2ibgD5fMUGjwg31WUd6Zcx8Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 隐私广告

### Ghostery

Ghostery 是强大的隐私保护扩展程序。其主要有以下功能：

- 拦截广告：Ghostery 内置的广告拦截工具可以移除网页上的广告，防止网页杂乱无章，让你专注于想看的内容。
- 保护隐私：利用 Ghostery 可以查看和拦截所浏览的网站上的跟踪器，控制收集数据的跟踪器。增强反跟踪功能还能将数据匿名化，进一步保护隐私。
- 提高浏览速度：Ghostery 的智能拦截功能可以自动拦截和取消拦截跟踪器来满足网页质量标准，提高网页加载速度，优化网页性能。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbngsP2V2fRKribiaIjrG0G8U8RIc38IEQQFCPLEWQOUEkTLFcoEwX1emg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### AdBlock

<img src="https://mmbiz.qpic.cn/mmbiz_png/MtIub1ta1ib5wrAo845I2JyjyIkSR5EjeK5wrUbzVvaTpR51gxnF1SKDtC0ibMiarZMtLBf80TzAHYrEsz5nwG5Iw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

> AdBlock 用来在YouTube、Facebook、Twitch和其他你喜爱的网站上拦截广告和弹窗。这款插件可以让你在`YouTube`、`Facebook`、`Twitch`和其他任意一个你喜爱的网站上拦截广告和弹窗。

> 我们在浏览一些博客、论坛或者谷歌、百度搜索的时候，难免会有一些不太舒服的广告，这时候我们只需要开启这个插件就可以让这些广告统统消失。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbX0SQ8jcgBMDDln5KASN7NzZ85BvLd8IXzmBTKWKh4s2u8Rlmv3XBnQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### LastPass

随着互联网的蓬勃发展，出现了越来越多的网站，其中大部分网站为了保持用户的粘性，需要用户自己注册和登录。为了安全起见，用户密码一般要求包含：数字、字母、特殊字符、还要区分大小写等，并且要求密码长度少则8位，多则十几位。

为了方便，你可以将所有密码设置成一样，但是如果一旦泄露，所有网站上你相关信息都可能会被泄露，风险太高。所以，还是把密码设置成不一样吧，这样我们睡觉也安心一点。

如果你只注册了一两个网站还好，但如果你过注册过几十个，甚至上百个网站，那么多密码你都能记得住？

答案是否定的，这时就急需一种安全管理密码的工具。

这时又一个chrome神器:`LastPass`出现了。

<img src="https://mmbiz.qpic.cn/mmbiz_png/uL371281oDF3wW2hgFThLtkFrV3Z0ANGN41KDhosnmibDiaFXQia3olWWTUdjq7OcVmeMcNh6pXpXXfekujicZf66g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

它需要先注册，这一步很容易完成。然后添加想访问的网站地址、用户名和密码，以后想访问该网站，直接点击一下即可，就不用再重复输入用户名和密码，方便快速访问，并且自动登录。



<img src="https://mmbiz.qpic.cn/mmbiz_png/uL371281oDF3wW2hgFThLtkFrV3Z0ANGQaF5zwcXbogrQ9trgicJibicRsJLpVOWZowxZONKFhpqIBnQExChs39tw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />



LastPass的功能非常强大，其他类似的插件还有：1Password、Bitwarden等。

## 效率工具

### SuperCopy

<img src="https://mmbiz.qpic.cn/mmbiz_png/MtIub1ta1ib5wrAo845I2JyjyIkSR5Eje7dMQa9QVutY0fQkD5qspUDyEsz2I6Tk7caZNrm9a9jX9s48kIfOXMg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:50%;" />

大家有没有遇见一种很恶心的情况，就是当你在某网址翻阅文献的时候想复制里面的资料却弹出来一个需要开通会员或者付费才能复制的弹窗，想当年写论文的时候头皮发麻。

<img src="https://mmbiz.qpic.cn/mmbiz_png/MtIub1ta1ib5wrAo845I2JyjyIkSR5EjeMETy4zdcQticlJ2KGLwZYibK3rYxnyNxMV35ot2YjEWtKITCQlyGcTOw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:50%;" />

这种时候这个插件就派上用场了，只需要我们点击右上角的插件小图标，就可以复制页面中你想要复制的任意资料。

<img src="https://mmbiz.qpic.cn/mmbiz_png/MtIub1ta1ib5wrAo845I2JyjyIkSR5Ejeemibf8FKsjd1W87BNu1DZd3jD7UvalCOx3Q94Q8Haxib6JazibciaUtRWg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

### Marinara

> 番茄工作法（Pomodoro®）时间管理助理。长短两种休息时间、带有倒计时显示的工具栏图标、追踪Pomodoro历史和统计讯息、可配置的长休间隔、可配置的定时器时长、桌面与新标签页通知、超过20种音效可选的声音通知、计时器秒针走动音效
>

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbd9wYYH7rlRFezWVLOEia3eXPfInbibGEmTVHXzibcEgtEYZ9y4iblAUdNg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Loom

Loom 可以用来快速录制视频，并且能够将录制的视频上传到指定的网页中，Loom还支持在用户点击启动插件时，立即捕捉屏幕图像，同时开始视频录制操作，还可以将录制好的视频复制到粘贴板中存储。

<img src="https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbDxYRhtO3Nt0iabWV3Luh2qHTVJYZ4FlSNR8cxuoowvGluShoiaXSOjrw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

### GoFullPage

GoFullPage 是一款全屏截图插件（整个网页截图），完整捕获您当前页面的屏幕，进行滚动截图，而无需任何额外的权限。单击扩展程序图标，然后将其传输到屏幕快照的新标签页中，可以在其中将其下载为图像或PDF，甚至只需拖动即可，保存到桌面。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBb4vyBmDldfApHVPNUibjl1lm2z4znrKKM4t3X6l6zgENaSO3kMj8zUEw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### BetterViewer

BetterViewer 可以提供更好的图像查看体验，旨在替代基于 Chrome 浏览器中内置的图像查看模式。使用时，只需在页面右键点击图片，选择“**在新标签页中打开图片**”即可。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbYwiaSZibCXUmUEWQaTVVkTE4fGG7J7Tk3tdziaKDuUruJiaZr1fFFXxPZw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### svg-grabber

> svg-grabber 是一个快速预览并从网站获取所有 svg 的工具。可以用来预览、下载和复制网站中所有 SVG 图标和插图的代码。
>

<img src="https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNJMCSm8tUDDIswwQHQ9dBbkxehTOQZD99GoN7vFQjqjiaGLUsBrOD1nZ1MRN6eicPOkuyIZN9iaYKeg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom: 50%;" />

### 右键搜

<img src="https://mmbiz.qpic.cn/mmbiz_png/MtIub1ta1ib5wrAo845I2JyjyIkSR5Eje1SBbmjkH97befYEZe01uQltFrSbYpVibXQ9rsLmby1yeF2Hg9vMZLSw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

不知道有多少人像我一样想把网页中的右键生成一个万能菜单，想跳转到哪里就去哪里，那你一定要试试这款插件。安装这款插件后，就自带了很多菜单配置。

> - 可以划词后直接右键选择直达搜索引擎搜索。
> - 在页面中右键可以直接跳转到任何你想去的网页。
> - 可以右键图片创建图片短网址、图片生成二维码。

拿我自己举例，我习惯性将`github`、`掘金`等链接添加到这个右键菜单中，这样就不用我去地址栏查找或书签栏翻阅就可以直接跳转。

<img src="https://mmbiz.qpic.cn/mmbiz_png/MtIub1ta1ib5wrAo845I2JyjyIkSR5EjegW1L55sVXgFHj91PCfnnxczK7XE8UMOzfRiasiamRtTBMe7PMXOJNNAQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />



## 图片工具

### ImageAssistant

> 在平时的工作或生活当中，我们经常需要上传和下载图片。如果在浏览网页的时，喜欢某些图片，我们需要一张张手动下载，非常不方便。有时候需要对上传的图片进行编辑，调整文字大小、样式，加一些水印效果等。我们一般需要先使用专业的图片工具，把图片编辑好，再重新上传，很麻烦。有没有一款软件，可以帮我们解决这些问题呢？答案是肯定的，这时可以使用google的ImageAssistant插件：
>

<img src="https://mmbiz.qpic.cn/mmbiz_png/uL371281oDF3wW2hgFThLtkFrV3Z0ANG2iaG82vVZXB8ekah9P8ic1x1BQtRicg5E3GpBxBm9WzGPPaFSOheEY1cw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:50%;" />

之后，访问网页时选择 提取本页图片：

<img src="https://mmbiz.qpic.cn/mmbiz_png/uL371281oDF3wW2hgFThLtkFrV3Z0ANGVdvBGYsWfICcInka8NX4a98haqEGIw35oVYRaCB0QOibicPcMBvGsIibw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

就会出现如下网页：

![图片](https://mmbiz.qpic.cn/mmbiz_png/uL371281oDF3wW2hgFThLtkFrV3Z0ANGGaTicdDD7YnkHQEjXgYI524V3Zgfrv3MdibRqWO5GI4rchmvC7lytT0A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

该网页中展示了之前页面中的所有图片，包括尺寸等信息，可以批量下载。此外，还能对上传的图片进行编辑：

![图片](https://mmbiz.qpic.cn/mmbiz_png/uL371281oDF3wW2hgFThLtkFrV3Z0ANGBULsD6Og0N5YXnshDEiaUwbqicpwVSUHyOQC3ykDib0WibGBhiaCpkToP7A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

看到这里，你爱上它了没？反正我是爱不释手。

## MD文档

### Markdown Web Clipper

<img src="https://mmbiz.qpic.cn/mmbiz_png/MtIub1ta1ib5wrAo845I2JyjyIkSR5Eje0EGYCzanCmnZz7wFCicuibzvnMabXgraibfq9JZfS3hibmyx9LPVvoUHbw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

如果你有写文章的习惯，那么`Markdown`你肯定不陌生，在看到一篇好的文章想要转载或者记录到本地的时候，使用这个插件可以让你快速保存`Markdown`。

你只需要打开你想要下载的`Markdown`所在页面，点击一下这个插件的黑色小图标，就可以复制或者下载这篇文章啦。

<img src="https://mmbiz.qpic.cn/mmbiz_png/MtIub1ta1ib5wrAo845I2JyjyIkSR5Ejeh3CvOTaKwiaqxgPiaQZWfOEKicvALF8I9yOUwXNXYs8AYMI2Fk7sdW9VQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

### markdown nice

对于有些写公众号的朋友来说，在文章排版上花费的时间，有可能比写一篇文章的时间还多。为了解决写文章时的排版问题，一些强大的排版工具应运而生，比如：`md2all` 和 `markdown nice` ，能够解放他们的双手，让他们可以把更多的时间花在文章内容上。需要安装markdown nice插件：

<img src="https://mmbiz.qpic.cn/mmbiz_png/uL371281oDE8cbV3ibotGd6sIHV79ticQB0n6NwWL4t9kkjJOR1Xl7zutTwvK5qTufbBUmZqibzFuC6ib9cocmhrEA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:50%;" />

之后，在公众号后台写文章时，你只要专注于写`markdown`语法的文章即可，然后选择一种主题和代码主题，其他的交给插件。

<img src="https://mmbiz.qpic.cn/mmbiz_png/uL371281oDE8cbV3ibotGd6sIHV79ticQBaNb6JwalnAgictUVkibesiaiaaps2dnaVmVzx2KGBWNU4JDoX97q78uLIA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

最终文章会自动生成左半部分的样式，是不是很nice？

## 英文翻译

### 沙拉查词

<img src="https://mmbiz.qpic.cn/mmbiz_png/MtIub1ta1ib5wrAo845I2JyjyIkSR5EjeqqFl7YCvmvr2ibsjp6aFzwYibMUlxvKYWrrkof8lDGmfxjQPr6AR9J4w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

> 沙拉查词是一款专业划词翻译扩展，为交叉阅读而生。大量权威词典涵盖中英日韩法德西语，支持复杂的划词操作、网页翻译、生词本与 `PDF` 浏览。只要在网页中用鼠标划动词语就会出来一个小沙拉杯的图标，当我们鼠标`hover`上去的时候就会出现这个词的所有不同平台的翻译，甚至连造句都有。

你可以把这次的翻译添加到生词本或是钉在屏幕中方便查看与学习。

<img src="https://mmbiz.qpic.cn/mmbiz_png/MtIub1ta1ib5wrAo845I2JyjyIkSR5EjebLYE2NmGgeL7r7OfibqUxQ12OaS95GWic9wdGdn8RnuzgQBCHxGOLYlg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

### 沉浸式翻译

immersive-translate，顾名思义，是沉浸式翻译。使用 immersive-translate 插件可以帮助用户更好的将网页、PDF 文档翻译成其他语言。而且他并不是整篇直接翻译，而是会分段的将原文和翻译后的文本进行展示。immersive-translate 真的是我见过的最好用的翻译插件，沉浸式体验，方便对照原文，支持多种翻译引擎，多种样式可以选择。感兴趣的朋友抓紧去试试吧！

```
项目地址：
https://github.com/immersive-translate/immersive-translate
```

immersive-translate 的特点如下：

- 智能识别网页主内容区并进行翻译，不同于其他翻译插件翻译整个网页，降低了对原网页的“侵入性”，提升了阅读体验，因此得名“沉浸式翻译”。
- 定制优化常见主流网站，如 Twitter，Reddit，Discord，Gmail，Telegram，YouTube，Hacker News 等。
- 支持 10 余种常用翻译服务，包括 Deepl，OpenAI（ChatGPT 3.5），谷歌，彩云小译，腾讯翻译君，百度翻译，火山翻译等，任君挑选。
- 支持 PDF 文件和 EPUB 电子书双语翻译，制作和导出。
- 全平台浏览器均支持，包括桌面端、移动端和 iOS 端，如 Chrome、Edge、Firefox 和 Safari 等。
- 提供多种译文样式选择，如弱化、模糊、下划线、分隔线等样式，以便个性化定制翻译体验。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304131711533.png" alt="image-20230413171101462" style="zoom:80%;" />

#### 网页翻译

immersive-translate 支持全平台的浏览器，这里以 Chrome 浏览器为例。在 Chrome 应用商城安装完插件后，打开一个英文网页（这里打开了 OpenAI 的文档页面），点击 immersive-translate 的图标，我们可以看到，在主页面可以选择要翻译的语言、翻译服务以及是否可以针对某网站开启总是翻译的选项。

<img src="https://mmbiz.qpic.cn/mmbiz_png/4XgGs2SeJoG8uXNK79AQicmmB10XMOAcCcCEKHyZqE3pic53Fk3mcbDdCBOrYYiaV4GVnoibZMNrID8cX8u9jtOrNA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

这里我们直接点击“翻译”按钮，界面会变成这个样子：

<img src="https://mmbiz.qpic.cn/mmbiz_png/4XgGs2SeJoG8uXNK79AQicmmB10XMOAcCRxrZBeJEJ7ohfNXsYdtzVt7OX1huHmqBR2DLXbtszE31JiaFgldc9icA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

其中红框的部分就是在原有页面上生成的翻译后的文本，这种沉浸式的翻译形式，可以对照着原文查看，而且样式也遵循了原网页的格式，使用体验非常好。

#### 翻译 PDF

immersive-translate 也可以翻译 PDF 文档，在线和本地的都可以。我们打开一篇论文，然后点击 immersive-translate 打开主页面，点击“翻译 PDF”按钮来完成 PDF 的翻译。

![图片](https://mmbiz.qpic.cn/mmbiz_png/4XgGs2SeJoG8uXNK79AQicmmB10XMOAcCtGxXkw1YLn41y4l6X0pibg1dwmIwxq4FosU4zeLAArzGTLJW6H6eeIg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

翻译后的效果如图，这里可以看到原有的 PDF 在左侧，而右侧是翻译之后的文字，也按照原文在 PDF 页面的位置显示出来，方便你对应查找原文。

![图片](https://mmbiz.qpic.cn/mmbiz_png/4XgGs2SeJoG8uXNK79AQicmmB10XMOAcCrXCyDomLjYDyb9nX6So3rXt7CVFwSicpaP1LhMHdxIT0HXmKc5lTiaeA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### 样式设置

你还可以设置翻译之后的样式，样式有几十种，总有一款是你的菜～

![图片](https://mmbiz.qpic.cn/mmbiz_png/4XgGs2SeJoG8uXNK79AQicmmB10XMOAcC601c6wup9HyfNSGA5LokE5gXB4JpT7zxt6aKLSuTkPm0cmoH9MicTsA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



## 在线工具箱⭐

> 这款在线工具箱还是非常实用的，有 240 多种工具，使用次数也在上百万次，尽管会有广告，但能白嫖这么多功能还是能接受的。官网：https://www.67tool.com/

你好，我是Guide！周末就不分享技术了，今天给大家分享一个我平时常用的 **免费在线工具箱「即时工具」** 安全、好用、快捷，拥有超多强大功能，随开随用，大家用了都说好，保证让你爱不释手，快来看看吧。

<img src="https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9Tzx6wicTB00MwaRyDOJlAPkicVibfv149cv2icbiaiabklhj6icvwMwKzRTKfqntYtNdABtC018GWLgibXMjg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

首页如下图所示，拥有视频工具、音频工具、图片工具、文档工具、数据图标等过多个模块。每个模块中都有大量的在线工具可用。并且，你还可以使用微信登录自定义你自己常用的工具，很方便，界面也很美观，体验不错！

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9Tzx6wicTB00MwaRyDOJlAPkicTMiaqOxD193UzZCWKyEaPavnUbGsLHbytWOpcTIP3mMdxqxsCx0YAIw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 图片处理工具

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9Tzx6wicTB00MwaRyDOJlAPkiccP7BmhreftsazQT2fewBB2MSc5aJFUxSCic6wvPFRLUyJnqaEyITu7g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

添加水印、合并图片

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/iaIdQfEric9Tzx6wicTB00MwaRyDOJlAPkic2cRTl0vdiaPh41rhU88DEUy5gmdRRbSOlM8Gv9VSiaqehG5THOxFDjuw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

图片分割

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9Tzx6wicTB00MwaRyDOJlAPkicWDb7ZNHyN7JfUCVCj4QBRFGicLQibcHyJ5QaNJmGZicTo8bgE5erZ2IDw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

照片转油画风格

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9Tzx6wicTB00MwaRyDOJlAPkicxZoH0c7cu3RDvrXDy0Y6QgrSuFjQH4GZAGSfx3Tsbrxk5ooQv7SVMQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 文档处理工具

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9Tzx6wicTB00MwaRyDOJlAPkicgze6iarEo0w3QibRqTZFeicvzAB60MtKbIPMCF7r0N7ianYOwkcJhjBtVg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

提取PDF  (提取PDF文档中的一个或多个页面保存为单个文件)

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9Tzx6wicTB00MwaRyDOJlAPkicfujMIwWGfU6VmjZViakvd2icJpRIhmQbYUUgVN4qrFDY4ceWkeYPzJWg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

PDF 添加页码

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9Tzx6wicTB00MwaRyDOJlAPkicR2xpLqn45mwX2WTcVVHgp24q7cNp2rz5k3kZsa5uwFhrFM0qXHjOlQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 办公辅助工具

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9Tzx6wicTB00MwaRyDOJlAPkicIRjOmyd0F7jEh2sicsxicQk8yce0xbbwoB5W1hKTmXmoHBbD8KPdsIgg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

思维导图  (支持多种模板多种格式导出)

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9Tzx6wicTB00MwaRyDOJlAPkicjdYmZwpYjNPSPov0Gf1hfFjQT4WialR8Ta2RKaGaxlpuI3YgfNyY9Lg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

番茄钟

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9Tzx6wicTB00MwaRyDOJlAPkicrSicXdqITIKMvS1AUSImXfplribj2lbhDAmyrnHuxA9E3oVibfIYzqV3g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 设计工具

![图片](https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9Tzx6wicTB00MwaRyDOJlAPkicO4uiaQ4ebZq3HNCC2t3egL8oV2cJRXLjEicqrEoc6xKUbBn3x7PptXYw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

UI设计

<img src="https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9Tzx6wicTB00MwaRyDOJlAPkicI81sT8EdckgP1Ribjr5rL5eKSoCXvmKeyaRbG43H4srAKFBh3IDfX8A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

### 其他

还有像视频、音频处理工具等，能剪辑视频、处理音频，不方便展示但都非常好用，足以满足非专业人士地日常使用。

<img src="https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9Tzx6wicTB00MwaRyDOJlAPkicDA786utrZ7sia5tXGTtBg3EOpXUjBBWrYRpYqdicic6ks4Xtkj87kyyDQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />



































