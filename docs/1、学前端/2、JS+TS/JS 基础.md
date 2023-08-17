


<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208031539932.png" alt="image-20220803153903848" style="zoom: 80%;" />

### 外部JS文件⭐

> - 利于HTML页面代码结构化，**把大段 JS代码独立到 HTML 页面之外，既美观，也方便文件级别的复用**
> - **引用外部 JS文件的 script 标签中间不可以写代码**
> - **适合于JS 代码量比较大的情况**

```html
<script src="my.js"></script>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208031540043.png" alt="image-20220803154000968" style="zoom:67%;" />

## 注释

### 单行注释

> 为了提高代码的可读性，JS与CSS一样，也提供了注释功能。
>
> JS中的注释主要有两种，分别是 单行注释 和 多行注释。

```js
// 我是一行文字，不想被 JS引擎 执行，所以 注释起来	
```

```js
// 用来注释单行文字（  快捷键   ctrl  +  /   ）
```

### 多行注释

多行注释的注释方式如下：

```js
/*
  获取用户年龄和姓名
  并通过提示框显示出来
*/
```

```js
/* */  用来注释多行文字（ 默认快捷键  alt +  shift  + a ） 
```

## 结束符

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208031545930.png" alt="image-20220803154524843" style="zoom:67%;" />

## 输入输出语句⭐

为了方便信息的输入输出，JS中提供了一些输入输出语句，其常用的语句如下：

### 基础语法

> - alert(msg)：浏览器弹出警示框
> - console.log(msg)：浏览器控制台打印输出信息
> - prompt(info)：浏览器弹出输入框，用户可以输入
> - document.write(msg)：将内容写在HTML文档中，(其实在Vue中用的{{msg}}即可)
> - innerHTML：内容写入到 HTML 元素，(其实在Vue中用的{{msg}}即可)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302021549776.png" alt="image-20230202154959634" style="zoom:67%;" />

### 案例演示

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302021634580.png" alt="image-20230202163449466" style="zoom:67%;" />

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    h2 {
      text-align: center;
    }

    table {
      /* 合并相邻边框 */
      border-collapse: collapse;
      height: 80px;
      margin: 0 auto;
      text-align: center;
    }

    th {
      padding: 5px 30px;
    }

    table,
    th,
    td {
      border: 1px solid #000;
    }
  </style>
</head>

<body>
  <h2>订单确认</h2>


  <script>
    // 1 用户输入
    let price = +prompt('请输入商品价格：')
    let num = +prompt('请输入商品数量：')
    let address = prompt('请输入收获地址：')
    // 2.计算总额
    let total = price * num
    // 3.页面打印渲染
    document.write(`
      <table>
          <tr>
            <th>商品名称</th>
            <th>商品价格</th>
            <th>商品数量</th>
            <th>总价</th>
            <th>收货地址</th>
          </tr>
          <tr>
            <td>小米青春版PLUS</td>
            <td>${price}元</td>
            <td>${num}</td>
            <td>${total}元</td>
            <td>${address}</td>
          </tr>
        </table>
    `)
  </script>
</body>

</html>
```



# 变量

变量是用于存放数据的容器。 我们通过 变量名 获取数据，甚至数据可以修改。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208031548889.png" alt="image-20220803154813797" style="zoom:67%;" />

> 注意：变量不是数据本身，它们仅仅是一个用于存储数值的容器。可以理解为是一个个用来装东西的纸箱子。

## 变量命名规范

### 命名规范

> - 由**字母、数字、下划线、美元符号( $ )组成**，如：usrAge, num01, _name
> - **严格区分大小写**。var app; 和 var App; 是两个变量
> - **不能以数字开头**。  18age   是错误的
> - **不能是关键字、保留字**。例如：var、for、while
> - **变量名必须有意义**。 MMD   BBD        nl   →     age ，**推荐翻译网站： 有道、爱词霸**
> - **遵守驼峰命名法**。**首字母小写，后面单词的首字母需要大写**。例：myFirstName

### 合法变量名判断

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302021600322.png" alt="image-20230202155958751" style="zoom:67%;" />

### 声明变量

```javascript
var age;
let name;
const num = 20   
```

> var 是一个 JS关键字，用来声明变量( variable 变量的意思 )。使用该关键字声明变量后，计算机会自动为变量分配内存空间，不需要程序员管

> age 是程序员定义的变量名，我们要通过变量名来访问内存中分配的空间

### 变量赋值

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208031551843.png" alt="image-20220803155118762" style="zoom:67%;" />

```javascript
age = 10; // 给 age  这个变量赋值为 10          
```

- = 用来把右边的值赋给左边的变量空间中   此处代表赋值的意思
- 变量值是程序员保存到变量空间里的值



### 变量的初始化

**声明一个变量并赋值， 我们称之为变量的初始化。**

```js
var age  = 18;  // 声明变量同时赋值为18
let jdk1 = 'jdk18'
```



## 变量扩展⭐

### let和var的区别

![image-20230202160243737](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302021602869.png)

### 更新变量

一个变量被重新复赋值后，它原有的值就会被覆盖，变量值将以最后一次赋的值为准。

```js
var age = 18;
age = 81;   // 最后的结果就是81因为18 被覆盖掉了          
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208031554362.png" alt="image-20220803155424280" style="zoom:67%;" />

> 注意： let 不允许多次声明一个变量

### 声明多个变量

> 同时声明多个变量时，只需要写一个 var， 多个变量名之间使用英文逗号隔开
>

```js
var age = 10,  name = 'zs', sex = 2; 
let age = 10,  name = 'zs', sex = 2;  
```

### 声明变量特殊情况

| 情况                           | 说明                    | 结果      |
| ------------------------------ | ----------------------- | --------- |
| var  age ; console.log (age);  | 只声明 不赋值           | undefined |
| console.log(age)               | 不声明 不赋值  直接使用 | 报错      |
| age   = 10; console.log (age); | 不声明   只赋值         | 10        |

### 在一行中交换两个变量

这不是 JavaScript 函数，但它是交换两个变量的一种非常酷的方法。它展示了如何在一行中完成，而不是将值放入“临时”对象（必须在其他一些编程语言中完成）

```js
let x = 50;
let y = 100;
console.log(x, y); //50 100
[y, x] = [x, y];
console.log(x, y); //100 50
```



## 常量

![image-20230202160512607](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302021605788.png)



# 数据类型

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208031556229.png" alt="image-20220803155639137" style="zoom:67%;" />

## 数字型Number

### 声明数字型

JavaScript 数字类型既可以保存整数，也可以保存小数(浮点数）。  

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208031705692.png" alt="image-20220803170506617" style="zoom:67%;" />

```js
let age = 21;       // 整数
let Age = 21.3747;  // 小数     
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208031705438.png" alt="image-20220803170527360" style="zoom:67%;" />

### 数字型进制

最常见的进制有二进制、八进制、十进制、十六进制。

```js
// 1.八进制数字序列范围：0~7
var num1 = 07;   // 对应十进制的7
var num2 = 019;  // 对应十进制的19
var num3 = 08;   // 对应十进制的8
// 2.十六进制数字序列范围：0~9以及A~F
var num = 0xA;   
```

现阶段我们只需要记住，在JS中八进制前面加0，十六进制前面加 0x  

### 数字型范围

JavaScript中数值的最大和最小值

> - 最大值：Number.MAX_VALUE，这个值为： 1.7976931348623157e+308
>
> - 最小值：Number.MIN_VALUE，这个值为：5e-32

数字型三个特殊值

> - Infinity ，代表无穷大，大于任何数值
>
> - -Infinity ，代表无穷小，小于任何数值
>
> - NaN ，Not a number，代表一个非数值

**isNaN用来判断一个变量是否为非数字的类型，返回 true 或者 false**

   ```js
   let usrAge = 21;
   let isOk = isNaN(usrAge);
   console.log(isOk);          // false ，21 不是一个非数字
   let usrName = "andy";
   console.log(isNaN(usrName));// true ，"andy"是一个非数字
   ```

## 布尔型Boolean

> 布尔类型有两个值：true 和 false ，其中 true 表示真（对），而 false 表示假（错）。**布尔型和数字型相加的时候， true 的值为 1 ，false 的值为 0。**
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302021617321.png" alt="image-20220803174205781" style="zoom:67%;" />

```js
console.log(true + 1);  // 2
console.log(false + 1); // 1
```

## 未定义Undefined

一个声明后没有被赋值的变量会有一个默认值undefined ( 如果进行相连或者相加时，注意结果）

未定义是比较特殊的类型，只有一个值 undefined。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208031745172.png" alt="image-20220803174538088" style="zoom: 80%;" />

```js
var variable;
console.log(variable);           // undefined
console.log('你好' + variable);  // 你好undefined
console.log(11 + variable);     // NaN
console.log(true + variable);   //  NaN
```

## 空类型null

### 创建和使用

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302021612631.png" alt="image-20230202161227507" style="zoom:67%;" />

```js
var i = null;
console.log('你好' + i);  // 你好null
console.log(11 + i);     // 11
console.log(true + i);   //  1
```

### 使用场景

> 官方解释：把 null 作为尚未创建的对象 
>
> 大白话： 将来有个变量里面存放的是一个对象，但是对象还没创建好，可以先给个null 

## Symbol

> Symbol 是 ES6 中引入的新数据类型，它表示一个唯一的常量，通过 Symbol 函数来创建对应的数据类型，创建时可以添加变量描述，该变量描述在传入时会被强行转换成字符串进行存储：

### 简单使用

```js
let a = Symbol('1')
let b = Symbol(1)
console.log(a.description === b.description) // true
let c = Symbol({
    id: 1
})
console.log(c.description) // [object Object]
let d = Symbol('1')
console.log(d === a) // false
```

基于以上特性，Symbol 属性类型比较适合用于两类场景中：**「常量值和对象属性」**。

### 应用场景

#### （1）避免常量值重复

getValue 函数会根据传入字符串参数 key 执行对应代码逻辑：

```js
function getValue(key) {
  switch(key){
    case 'A':
      ...
    case 'B':
      ...
  }
}
getValue('B');
```

这段代码对调用者而言非常不友好，因为代码中使用了魔术字符串（Magic string，指的是在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值），导致调用 getValue 函数时需要查看函数代码才能找到参数 key 的可选值。所以可以将参数 key 的值以常量的方式声明：

```js
const KEY = {
  alibaba: 'A',
  baidu: 'B',
}
function getValue(key) {
  switch(key){
    case KEY.alibaba:
      ...
    case KEY.baidu:
      ...
  }
}
getValue(KEY.baidu);
```

但这样也并非完美，假设现在要在 KEY 常量中加入一个 key，根据对应的规则，很有可能会出现值重复的情况：

```js
const KEY = {
  alibaba: 'A',
  baidu: 'B',
  tencent: 'B'
}
```

这就会出现问题：

```js
getValue(KEY.baidu) // 等同于 getValue(KEY.tencent)
```

所以在这种场景下更适合使用 Symbol，不需要关心值本身，只关心值的唯一性：

```js
const KEY = {
  alibaba: Symbol(),
  baidu: Symbol(),
  tencent: Symbol()
}
```

#### （2）避免对象属性覆盖

函数 fn 需要对传入的对象参数添加一个临时属性 user，但可能该对象参数中已经有这个属性了，如果直接赋值就会覆盖之前的值。此时就可以使用 Symbol 来避免这个问题。创建一个 Symbol 数据类型的变量，然后将该变量作为对象参数的属性进行赋值和读取，这样就能避免覆盖的情况：

```js
function fn(o) { // {user: {id: xx, name: yy}}
  const s = Symbol()
  o[s] = 'zzz'
}
```

## BigInt

BigInt 可以表示任意大的整数。其语法如下：

```js
BigInt(value);
```

其中 value 是创建对象的数值。可以是字符串或者整数。

在 JavaScript 中，Number 基本类型可以精确表示的最大整数是253。因此早期会有这样的问题：

```js
let max = Number.MAX_SAFE_INTEGER;    // 最大安全整数

let max1 = max + 1
let max2 = max + 2

max1 === max2   // true
```

有了BigInt之后，这个问题就不复存在了：

```js
let max = BigInt(Number.MAX_SAFE_INTEGER);

let max1 = max + 1n
let max2 = max + 2n

max1 === max2   // false
```

可以通过typeof操作符来判断变量是否为BigInt类型（返回字符串"bigint"）：

```js
typeof 1n === 'bigint'; // true 
typeof BigInt('1') === 'bigint'; // true 
```

还可以通过`Object.prototype.toString`方法来判断变量是否为BigInt类型（返回字符串"[object BigInt]"）：

```js
Object.prototype.toString.call(10n) === '[object BigInt]';    // true
```

注意，BigInt 和 Number 不是严格相等的，但是宽松相等：

```js
10n === 10 // false 
10n == 10  // true 
```

Number 和 BigInt 可以进行比较：

```js
1n < 2;    // true 
2n > 1;    // true 
2 > 2;     // false 
2n > 2;    // false 
2n >= 2;   // true
```

## 获取类型typeof

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302021620674.png" alt="image-20230202162056510" style="zoom:67%;" />

> 可以看出数字型和布尔型颜色为蓝色，字符串和undefined颜色为灰色

typeof 可用来获取检测变量的数据类型

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208032307771.png" alt="image-20220803230704677" style="zoom:67%;" />

```js
var num = 18;
console.log(typeof num) // 结果 number      
```



## 数字长度问题⭐⭐

### 错误的描述

问题可能是这样的，Lily在公司负责一个重大项目，其中一个模块是显示一条与数字相关的信息，这是后端工程师界面返回的信息（仅举例）

```java
@RestController@RequestMapping("/getInfo")
public class YupiTestController { 
    @GetMapping  
    public Long getNum() {  
        return 123456789123456789L;  
    }  
}
```

各位小伙伴，我们调用getInfo接口会返回什么信息呢？会是 123456789123456789 吗？

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210151547273.png" alt="image-20221015154718143" style="zoom:50%;" />

通过chrome浏览器的调试工具可以看到，似乎一切都和我们想象的一样，结果是123456789123456789。

但是，页面显示的结果是123456789123456780，最后一位是0而不是9。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210151547250.png" alt="image-20221015154754134" style="zoom:80%;" />

这到底是怎么回事？这太奇怪了，是不是有点崩溃。

### 分析出现问题的原因

现在，我们一起来分析一下原因。我尝试分析返回的数字，发现只有当数字超过16位时才会出现最后几位不一致的问题。是不是因为数字太大，出现了精度损失？

Java语言中的Long类型是64位的，JavaScript语言中的Long类型是小于64位的吗？

天哪，JavaScript 似乎没有 Long 类型的数据！

实际上，在 JavaScript 中，我们使用 Number 来表示类型 number 的值。

Number 类型的总长度为 64 位。 64位大致就是这样分配的，其中53位代表小数位，10位代表指数位，1位代表符号位。因此，Number 整数的表示范围为 -2^53 ~ 2^53。

让我们尝试在控制台上输出 JavaScript 中的最大值和最小值。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210151549599.png" alt="image-20221015154945478" style="zoom: 67%;" />

在其他语言中，例如 Java，Long 类型占用 64 个二进制位，最大值为 9223372036854774807 (2⁶³ — 1)，长度约为 19 位。在 JavaScript 中，由于 Number 类型的值也包含小数，所以最大值为 9007199254740993 (2^53 - 1)，长度约为 16 位。所以当Java向JSON返回16位以上的Long类型字段时，前端JavaScript获取的数据会因为溢出而失去精度。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210151550054.png" alt="image-20221015155024934" style="zoom:50%;" />

### 如何解决这个问题呢？

> 也许我们可以尝试在前端解决这个问题，但我认为我们应该寻求后端工程师的帮助。我们应该将可能超出范围的数字类型（Long）变量转换为字符串类型（String）。这个是我的个人处理方法，如果你有更好的解决方案，也请欢迎你在留言区跟我一起来分享讨论，让我们大家一起学习进步。
>

## 数据类型转换⭐

### 隐式转换

> -  \+ 号两边只要有一个是字符串，都会把另外一个转成字符串 
> -  除了+以外的算术运算符 比如 - * / 等都会把数据转成数字类型

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208032316112.png" alt="image-20220803231623021" style="zoom:67%;" />

### 显式转换

#### 转换为字符串

![](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/%E5%9B%BE%E7%89%8719.png)

```js
let age = 22
age = age.toString()
console.log(typeof age)  //string
```

#### 转换为数字型(显式)

![](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/%E5%9B%BE%E7%89%8720.png)

```js
let age = '22'
age = age - 0 // 最好用的方法是 -0，隐式转换最好用
console.log(typeof age)  //number
```

#### 转换为布尔型

![](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/%E5%9B%BE%E7%89%8721.png)

> 表空、否定的值会被转换为 false  ，如 ''、0、NaN、null、undefined  ,其余值都会被转换为 true

```js
console.log(Boolean('')); // false
console.log(Boolean(0)); // false
console.log(Boolean(NaN)); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean('小白')); // true
console.log(Boolean(12)); // true
```

### 进制转换

> 要在 JavaScript 中将十进制转换为十六进制，请对十进制调用 toString() 方法，将 16 作为基数参数传递，即 num.toString(16)。toString() 方法将以十六进制形式返回数字的字符串表示形式。
>

```js
const num = 60;
const hex1 = num.toString(16);
const hex2 = num.toString(8);
const hex3 = num.toString(2);
console.log(hex1, hex2, hex3); // 3c 74 111100
```

> Number toString() 方法返回数字的字符串表示形式。如果第一个参数指定了基数，则数字以该基数表示。我们传递 16 以使用基数 16，这是十六进制基数。**十六进制使用 16 个符号来表示数字**

# 字符串

## 基本语法

> **字符串型可以是引号中的任意文本，其语法为 双引号 "" 和 单引号''**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208031728521.png" alt="image-20220803172852434" style="zoom:67%;" />

```js
let strMsg = "我爱北京天安门~";  // 使用双引号表示字符串
let strMsg2 = '我爱吃猪蹄~';    // 使用单引号表示字符串
// 常见错误
var strMsg3 = 我爱大肘子;       // 报错，没使用引号，会被认为是js代码，但js没有这些语法
```

因为 HTML 标签里面的属性使用的是双引号，JS 这里我们更推荐使用单引号。

### 字符串引号嵌套

**JS 可以用单引号嵌套双引号 ，或者用双引号嵌套单引号 (外双内单，外单内双)**

```js
const strMsg = '我是"高帅富"程序猿';   // 可以用''包含""
const strMsg2 = "我是'高帅富'程序猿";  // 也可以用"" 包含''
//  常见错误
var badQuotes = 'What on earth?"; // 报错，不能 单双引号搭配
```

### 字符串转义符

**类似HTML里面的特殊字符，字符串中也有特殊字符，我们称之为转义符。**

**转义符都是 \ 开头的**，常用的转义符及其说明如下：

| 转义符 | 解释说明                          |
| ------ | --------------------------------- |
| \n     | 换行符，n   是   newline   的意思 |
| \ \    | 斜杠   \                          |
| \'     | '   单引号                        |
| \"     | ”双引号                           |
| \t     | tab  缩进                         |
| \b     | 空格 ，b   是   blank  的意思     |

## 字符串拼接⭐

### +号拼接

多个字符串之间可以使用 + 进行拼接，其拼接方式为 **字符串 + 任何类型 = 拼接之后的新字符串**

拼接前会把与字符串相加的任何类型转成字符串，再拼接成一个新的字符串

```js
//1.1 字符串 "相加"
console.log('hello' + ' ' + 'world'); // hello world
//1.2 数值字符串 "相加"
console.log('100' + '100'); // 100100
//1.3 数值字符串 + 数值
console.log('11' + 12);     // 1112
```

**+ 号总结口诀：数值相加 ，字符相连**

```js
str1 = '你好';
str2 = '世界';
str3 = str1.concat(str2);
console.log(str3) //你好世界
```

### concat拼接

```js
console.log("A".concat("B")) //"AB"
console.log("A".concat(" ", "text")) //"A text"
console.log("1".concat(2)) //"12"
```

### 字符串拼接加强

```js
console.log('pink老师' + 18);        // 只要有字符就会相连 
const age = 18;
console.log('pink老师age岁啦');      // 这样不行哦
console.log('pink老师' + age + '岁啦'); // pink老师18岁啦
```



## 模板字符串⭐

模板字符串文字可以创建跨越多行并允许插值的字符串。模板字符串使用反引号 (`) 字符定义。

```js
let name = '张三';
let str =  `我的名字是${name}`;
console.log(str); //我的名字是张三
```

有效的表达式可以放在模板字符串文字中，表达式被评估并转换为字符串。

```js
const word = "Awake";
console.log(`${word}! ${word}!`) //"Awake! Awake!"
```

## 字符串和数组转换

### split方法

> split() 是一种字符串方法，可将字符串拆分为具有模式的有序列表的数组。这是一种 ES6 方法，是完成工作的最干净的方法。

split 方法根据分隔符将文本拆分为子字符串数组。下面是一个例子。

```js
const quote = 'Winter is coming';
const words = quote.split(' ');//["Winter", "is", "coming"]
```

这是使用逗号作为分隔符来拆分文本的另一个示例。

```js
const csv = 'Fire,and,Blood';
const arr = csv.split(','); //["Fire", "and", "Blood"]
```

它也适用于正则表达式，你可以在此处找到 split() 的完整文档。

这种方式完美地将字符串元素分离到一个数组中，但它有其局限性。

> 注意：此方法不适用于不常见的 Unicode 字符。此方法返回字符的 Unicode 而不是实际字符，这可能会使我们的工作变得更复杂，但 MDN 文档已更新，因此，如果我们仅包含 u 标志，我们就可以使其与 Unicode 一起使用。

```js
"😄😄".split(/(?:)/); // [ "\ud83d", "\ude04", "\ud83d", "\ude04" ]
"😄😄".split(/(?:)/u); // [ "😄", "😄" ]
```

### 使用扩展语法 ([…str])

这是 ES2015 的特性，它使转换变得非常容易

```js
const myFavShow = 'The Office'
const myFavShowArray = [...myFavShow]
console.log(myFavShowArray)  // ['T', 'h', 'e', ' ', 'O', 'f', 'f', 'i', 'c', 'e']
```

在这里消除了我们在 split() 中的限制也有帮助，考虑下面的例子，我们可以使用这种方法轻松拆分任何字符。

```js
const animal = '🦊🦊'
const animalArr = [...animal]
console.log(animalArr) // ['🦊', '🦊']
```

### 使用 Array.from(str)

阵列，from() 方法从可迭代或类似数组的对象创建一个新的、浅拷贝的 Array 实例。

```js
const myFavShow = 'The Office'
const myFavShowArray = Array.from(myFavShow);
console.log(myFavShowArray) // ['T', 'h', 'e', ' ', 'O', 'f', 'f', 'i', 'c', 'e']
```

这种方法在处理不常见的字符时不会引起任何问题。

```js
const str = '😎😎'
const arr = Array.from(str)
console.log(arr)  // ['😎', '😎']
```

### for loop 和 array.push()

> 虽然我们有很多选择可以玩，但我不得不提到这种老式的方法，我们使用 for 循环和数组方法 push() 来推送字符串的元素。这不是最干净的方式，但绝对值得一提的是想要远离 JavaScript 不断变化的复杂性
>

```js
const s = 'the office';
const a = [];
for (const s2 of s) {   
    a.push(s2);
}
console.log(a); // ['t', 'h', 'e', ' ', 'o', 'f', 'f', 'i', 'c', 'e']
```

此外，它对不常见 (Unicode) 字符也能很好地工作。看下面的例子。

```js
const s = '𝟘𝟙𝟚𝟛😄😄';
const a = [];
for (const s2 of s) {  
    a.push(s2);
}
console.log(a); //['𝟘', '𝟙', '𝟚', '𝟛', '😄', '😄']
```

### join方法

> join 数组方法通过使用指定的字符串分隔符字符串连接数组中的所有元素来创建一个新字符串。如果没有提供分隔符，则默认使用逗号。

```js
const arr = ['Fire', 'and', 'Blood'];
const text = arr.join(' '); //'Fire and Blood'
```

## 字符串API⭐⭐

### 长度

通过字符串的 length 属性可以获取整个字符串的长度。

```js
const strMsg = "我是帅气多金的程序猿！";
console.log(strMsg.length); // 显示 11
```

### 多次复制字符串

```js
const laughing = 'Maxwell '.repeat(3)
const eightBits = '1'.repeat(8)

console.log(laughing)
console.log(eightBits)
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302101200872.png" alt="image-20230210120049804" style="zoom:80%;" />

### 检查字符串是否包含特定序列⭐

字符串通过基本包装类型可以调用部分方法来操作字符串，以下是返回指定字符的位置的方法：

#### indexOf & lastIndexOf

indexOf 方法返回字符串中指定文本第一次出现的索引。当找不到文本时，它返回-1。

```js
const quote = "Here we stand";
const firstIndex = quote.indexOf(" ");
console.log(firstIndex) //4
```

lastIndexOf 方法返回字符串中指定文本最后一次出现的索引，当找不到文本时，它返回-1。

```js
const quote = "Here we stand";
const lastIndex = quote.lastIndexOf(" ");
console.log(lastIndex) //7
```

#### startsWith & endsWith

startsWith 方法检查字符串是否以给定的子字符串开头并返回一个布尔值 (true/false)。 startsWith 方法区分大小写。

```js
const quote = "First in Battle";
console.log(quote.startsWith("First"));//true
```

endsWith 方法检查字符串是否以给定的子字符串结尾，并根据需要返回 true 或 false。

```js
const quote = "We Remember";
console.log(quote.endsWith("We"));//false
```

#### include

> include 方法检查字符串是否包含给定的子字符串，并根据需要返回 true 或 false。字符串搜索是一项常见任务，在 JS 中，你可以使用 String.includes 方法轻松完成此操作，不需要正则表达式。

```js
const quote = "Our Blades are Sharp";
console.log(quote.includes("are"));//true
```

#### 案例：查找字符出现次数

案例：查找字符串"abcoefoxyozzopp"中所有o出现的位置以及次数

> 1. 先查找第一个o出现的位置
> 2. 然后 只要indexOf 返回的结果不是 -1 就继续往后查找
> 3. 因为indexOf 只能查找到第一个，所以后面的查找，利用第二个参数，当前索引加1，从而继续查找 	

```js
let ary = 'abcoefoxyozzopp';
let obj = {};
let i = 0;
ary1 = ary.toLocaleLowerCase();

let key;
for (i = 0; i < ary1.length; i++) {
    key = ary1[i];
    if (obj[key]) {
        //对象中有这个字母
        obj[key]++;
    } else {
        //对象中没有这个字母,把字母加到对象中
        obj[key] = 1;
    }
}
// o出现次数
console.log('o' + "这个字符出现了"+ obj['o'] + "次")
// 以下是所有字符出现次数
for(let key in obj) {
    console.log(key + "这个字符出现了" + obj[key] + "次");
}
```

### 根据位置返回字符

字符串通过基本包装类型可以调用部分方法来操作字符串，以下是根据位置返回指定位置上的字符：

![](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/%E5%9B%BE%E7%89%878.png)

在上述方法中，charCodeAt方法返回的是指定位置上字符对应的ASCII码。

```js
let str = 'abed'
console.log(str.charAt(0)) // a
console.log(str.charCodeAt(0)) // 97
console.log(str[0]) //a
```

### 替换

> 有多种方法可以替换所有出现的字符串，您可以使用 String.replace 方法和带有全局标志的正则表达式；或者使用新的 String.replaceAll 方法，请注意，此新方法并非在所有浏览器和 Node.js 版本中都可用。replace() 方法用于在字符串中用一些字符替换另一些字符，其使用格式如下：  

```js
字符串.replace(被替换的字符串， 要替换为的字符串)；
```

```js
const text = "I like apples. You like apples."
console.log(text.replace(/apples/g, "bananas"));
console.log(text.replaceAll("apples", "bananas"));
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302101400086.png" alt="image-20230210140011006" style="zoom:67%;" />

### 切割和提取⭐

> 三种方式，作用相同，slice、substr、substring

substr(start, length) 方法提取字符串的一部分，从指定的索引开始并返回指定的字符数。第一个字符位于索引 0 处。

```js
const quote = "Winter is coming";
const part1 = quote.substr(0, 6);//Winter
const part2 = quote.substr(10, 6);//coming
```

起始索引是必需的，但长度是可选的。如果省略，它将提取字符串的其余部分。

```js
const quote = "Winter is coming";
const part = quote.substr(6);// is coming
```

substring(start, end) 方法返回开始和结束索引之间的字符串部分。它以起始索引处的字符开始并结束，但不包括结束索引处的字符。

```js
const quote = "We Stand Together";
const part = quote.substring(3, 8);// Stand
```

如果省略结束索引，它会提取到字符串的末尾。

```js
const quote = "We Stand Together";
const part = quote.substring(3);// Stand Together
```

这与 indexOf 方法结合使用效果很好。考虑以下代码提取第一个逗号后的文本。

```js
const quote = "You know nothing,Jon Snow";
const commaIndex = quote.indexOf(",");
const part = quote.substring(commaIndex + 1);//"Jon Snow"
```

slice 与 substring 具有相同的接口，并且基本上是为了模仿数组接口而添加的。

```js
let str = 'hello World';
console.log(str.slice(1)); //ello World
console.log(str.slice(1,4)); //ell
console.log(str.slice(-2,-1)); //l

console.log(str.substr(3)); //lo World
console.log(str.substr(3,7)); //lo Worl

console.log(str.substring(3)); //lo World
console.log(str.substring(3,7)); //lo W
```

### 大小写转换

#### toUpperCase & toLowerCase

```js
let str = 'hello World';
console.log(str.toUpperCase());
console.log(str.toLowerCase());
console.log(str.toLocaleLowerCase());
console.log(str.toLocaleUpperCase());
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220117172532306.png" alt="image-20220117172532306" style="zoom:80%;" />

#### 首字母大写

一个非常常见的操作是将字符串的首字母大写，虽然许多编程语言有原生的方式来做到这点，但 JS 需要做一些工作

```js
let word = 'apply'
word = word[0].toUpperCase() + word.substr(1)
console.log(word) // "Apple"
```

另一种方法：

```js
// This shows an alternative waylet word = "apple";
const characters = [...word];characters[0] = characters[0].toUpperCase();
word = characters.join("");
console.log(word); // "Apple"
```

### 去空格

```js
let str = ' sad ';
console.log(str.trim());
console.log(str.trimLeft());
console.log(str.trimRight());
console.log(str.trimStart());
console.log(str.trimEnd());
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220117172005607.png" alt="image-20220117172005607" style="zoom:80%;" />

### 字符串拆分成数组

### split

> 切分字符串，它可以将字符串切分为数组。在切分完毕之后，返回的是一个新数组。

```js
let str="你好,现在是17点，天气不错";
// 字符串.split("分割字符")
let arr1=str.split(",");  
console.log(arr1) // [ '你好', '现在是17点，天气不错' ]
```

#### 扩展运算符⭐

> 有几种方法可以将字符串拆分为字符数组，我更喜欢使用扩展运算符 (...) ：

```js
const word = 'Maxwell' 
const characters = [...word] 
console.log(characters)
```

### 反转

反转字符串中的字符很容易，只需组合扩展运算符 (...)、Array.reverse 方法和 Array.join 方法。

```js
const word = "apple"
const reversedWord = [...word].reverse().join("")
console.log(reversedWord) // "elppa"
```

### 数字转字符串

toString() 方法可把一个 Number 对象转换为一个字符串，并返回结果

```js
let number = Number(20);
let str = number.toString()
console.log(typeof str) //string
```

### 字符串填充到指定长度

> 有时我们希望字符串具有特定的长度。如果字符串太短，则需要填充剩余空间，直到达到指定长度。以前主要用库left-pad。但是，今天我们可以使用 padStart 和 SpadEnd 方法，选择取决于字符串是在字符串的开头还是结尾

```js
// Add "0" to the beginning until the length of the string is 8.
const eightBits = '001'.padStart(8, '0')
console.log(eightBits) // "00000001"

//Add " *" at the end until the length of the string is 5.
const anonymizedCode = "34".padEnd(5, "*")
console.log(anonymizedCode) // "34***"
```



# 常见错误

## 变量未定义

下面可能出现什么问题？怎么办？

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208032322382.png" alt="image-20220803232245292" style="zoom: 50%;" />



<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208032323249.png" alt="image-20220803232350151" style="zoom:67%;" />

## 变量重复定义

下面可能出现什么问题？怎么办？

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208032321586.png" alt="image-20220803232143413" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208032322140.png" alt="image-20220803232212044" style="zoom:67%;" />



## 括号不匹配

下面可能出现什么问题？怎么办？

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208032320901.png" alt="image-20220803232048810" style="zoom: 50%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208032321580.png" alt="image-20220803232117477" style="zoom:80%;" />

## 类型出错

下面可能出现什么问题？怎么办？

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208032319833.png" alt="image-20220803231947706" style="zoom:67%;" />

> 分析： 1. 出现字符相加的问题    2. prompt 如果出现相加 记得要转为数字型



# 运算符⭐

## 一元操作符

操作符可以根据他们期待的操作符个数来分类，多数的JavaScript操作符都是二元操作符，二元操作符可以将两个表达式合成一个更复杂的表达式。JavaScript也支持一元操作符，这些操作符可以将一个表达式转化为另一个更复杂的表达式。同时，JavaScript中也有一个三元操作符，就是条件操作符（?:），它用于将三个表达式组成一个表达式。下面就先来看看一元操作符。

一元操作符具有以下特点：

- 最简单的操作符，用来操作一个表达式；
- 具有高优先级和右结合性；
- 在必要时将操作数自动转化为数值。

### 1. 递增和递减操作符（++ --）

递增操作符顾名思义就是递增其操作数，递减操作符就是递减其操作数。它们都有两个版本：

- 前缀版（++i）：操作符位于变量的前面，表示先递增(递减)，后执行语句；
- 后缀版（i++）：操作符位于变量的后面，表示先执行语句，后递增(递减)；

简单看两个例子：

```js
// 前置递增操作符：
let num1 = 1, num2 = 2;
console.log(++num1 + num2) // 4

// 后置递增操作符：
let num1 = 1, num2 = 2;
console.log(num1++ + num2) // 3
```

可以看到，两种类型的结果是不一样的，原因就在于后置递增递减操作是在包含它们的语句被求值之后才执行的。

这四个操作符可以作用于任何类型的数据。对于这些类型，JavaScript会将他们转化为数值，再在这个数值上进行加一或减一操作。如果不能转化为一个数字，那么递增或递减的结果就是NaN：

```js
let str = "hello";
console.log(str++)  // NaN
```

递增和递减操作符主要用于for循环中控制计算器递增或递减。

### 2. 加和减操作符

加和减操作符既是一元操作符，也是二元操作符。这里我们先来看一元加和减操作符。

#### 一元加运算符（+）

一元加操作符会将其操作数转化为数值，并返回转化后的值。需要注意：

- 如果操作数是数值，那它什么都不做；
- 如果操作数不能转化为数值，那么会返回NaN；
- 由于BigInt值不能转化为数值，因此这个操作符不能用于BigInt。

```js
let a = -1;
let b = "hello";
let c = BigInt;
console.log(+a)  // -1
console.log(+b)  // NaN
console.log(+c)  // NaN
```

#### 一元减运算符（-）

一元减操作符和一元加操作符类似，会先将操作数转化为数值，然后会改变结果的符号：

```js
let a = -1;
let b = 2;
console.log(-a)  // 1
console.log(-b)  // -2
```

一元加和减操作符主要用于基本的算术运算，也可以用于数据类型的转换，将不同类型的数据转化为数字类型，像Number()方法一样。

## 位操作符

现代计算机中数据都是以二进制的形式存储的，即0、1两种状态，计算机对二进制数据进行的运算加减乘除等都是叫位运算，即将符号位共同参与运算的运算。

JavaScript中所有的数字都是以IEEE 754 64位格式存储，但是位操作并不直接应用到64位，而是先将值转化为32位整数，再进行位操作。之后再把运算结果转化为64位，所以我们只需要考虑32位整数即可。位操作是在数值的底层完成的，所以运算速度会相对于其他运算符快很多。

常见的位运算有以下几种：

| **运算符** | **描述** | **运算规则**                                             |
| :--------- | :------- | :------------------------------------------------------- |
| &          | 与       | 两个位都为1时，结果才为1                                 |
| \|         | 或       | 两个位都为0时，结果才为0                                 |
| ^          | 异或     | 两个位相同为0，相异为1                                   |
| ~          | 取反     | 0变1，1变0                                               |
| <<         | 左移     | 各二进制位全部左移若干位，高位丢弃，低位补0              |
| >>         | 右移     | 各二进制位全部右移若干位，正数左补0，负数左补1，右边丢弃 |

在说这些操作符之前，先来看几个相关的概念。计算机中的**有符号数**有三种表示方法，即原码、反码和补码。三种表示方法均有符号位和数值位两部分，符号位都是用0表示“正”，用1表示“负”，而数值位，三种表示方法各不相同。

**（1）原码**

原码就是一个数的二进制数。例如：10的原码为0000 1010

**（2）反码**

- 正数的反码与原码相同，如：10   反码为 0000 1010
- 负数的反码为除符号位，按位取反，即0变1，1变0。

例如，-10的反码如下：

```
原码：1000 1010
反码：1111 0101
```

**（3）补码**

- 正数的补码与原码相同，如：10   补码为 0000 1010
- 负数的补码是原码除符号位外的所有位取反即0变1，1变0，然后加1，也就是反码加1。

例如，-10的补码如下：

```
原码：1000 1010
反码：1111 0101
补码：1111 0110
```

### 1. 按位与操作符（&）

按位与操作符（&）会对参加运算的两个数据**按二进制位**进行与运算，即两位同时为 1 时，结果才为1，否则结果为0。运算规则如下：

```
0 & 0 = 0  
0 & 1 = 0  
1 & 0 = 0  
1 & 1 = 1
```

例如，3 & 5 的运算结果如下：

```
   0000 0011 
   0000 0101 
 = 0000 0001
```

因此 3 & 5 的值为 1。需要注意：负数按补码形式参加按位与运算。

**用途：**

**（1）判断奇偶**

只要根据最未位是0还是1来决定，为0就是偶数，为1就是奇数。因此可以用`if ((i & 1) === 0)`代替`if (i % 2 === 0)`来判断a是不是偶数。

**（2）清零**

如果想将一个单元清零，即使其全部二进制位为0，只要与一个各位都为零的数值相与，结果为零。

### 2. 按位或操作符（|）

按位或操作符（|）会对参加运算的两个对象按二进制位进行或运算，即参加运算的两个对象只要有一个为1，其值为1。运算规则如下：

```
0 | 0 = 0
0 | 1 = 1  
1 | 0 = 1  
1 | 1 = 1
```

例如，3 | 5 的运算结果如下：

```
  0000 0011
  0000 0101 
= 0000 0111
```

因此，3 | 5的值为7。需要注意：负数按补码形式参加按位或运算。

### 3. 按位非操作符 (~)

按位非操作符 (~)会对参加运算的一个数据按二进制进行取反运算。即将0变成1，1变成0。运算规则如下：

```
~ 1 = 0
~ 0 = 1
```

例如：~6 的运算结果如下：

```
  0000 0110
= 1111 1001
```

在计算机中，正数用原码表示，负数使用补码存储，首先看最高位，最高位1表示负数，0表示正数。此计算机二进制码为负数，最高位为符号位。

当按位取反为负数时，就**直接取其补码**，变为十进制：

```
     0000 0110
   = 1111 1001
反码：1000 0110
补码：1000 0111
```

因此，~6的值为-7。按位非的操作结果实际上是对数值进行取反并减1，

### 4. 按位异或运算符（^）

按位异或运算符（^）会对参加运算的两个数据按二进制位进行“异或”运算，即如果两个相应位相同则为0，相异则为1。运算规则如下：

```
0 ^ 0 = 0  
0 ^ 1 = 1  
1 ^ 0 = 1  
1 ^ 1 = 0
```

例如， 3 ^ 5的运算结果如下：

```
  0000 0011
  0000 0101 
= 0000 0110
```

因此，3^5的值为6。

异或运算具有以下性质:

- 交换律：`(a^b)^c == a^(b^c)`
- 结合律：`(a + b)^c == a^b + b^c`
- 对于任何数x，都有 `x^x=0，x^0=x`
- 自反性: `a^b^b=a^0=a`;

### 5. 左移操作符（<<）

左移操作符（<<）会将运算对象的各二进制位全部左移若干位，左边的二进制位丢弃，右边补0。若左移时舍弃的高位不包含1，则每左移一位，相当于该数乘以2。

例如：

```
a = 1010 1110
a = a << 2
```

这里将a的二进制位左移2位、右补0，即得 a = 1011 1000。

需要注意，左移会保留他所操作数值的符号。比如，将-2左移5位，会得到-64，而不是64。

### 6. 右移运算符

#### 有符号右移操作符（>>）

> 有符号右移操作符（>>）会将数值的32位全部右移若干位（同时会保留正负号）。正数左补0，负数左补1，右边丢弃。操作数每右移一位，相当于该数除以2。
>

> 例如：a = a >>2 就是将a的二进制位右移2位，左补0 或者 左补1得看被移数是正还是负。
>

#### 无符号右移操作符（>>>）

> 无符号右移操作符（>>>）会将数值的32位全部右移。对于正数，有符号右移操作符和无符号右移操作符的结果是一样的。对于负数的操作，两者就会有较大的差异。
>

> 无符号右移操作符将负数的二进制表示当成正数的二进制表示来处理。所以，对负数进行无符号右移操作之后就会变的特别大。
>

## 加减乘除操作符

### 1. 加法操作符（+）

这里说的加法操作符就是二元的加操作符了。二元加操作符用于**计算数值操作**或者**拼接字符串操作**。

```js
1 + 1             // 2
"1" + "2"         // "12"
"hello" + "world" // "helloworld"
```

在进行加操作时，如果两个操作数都是数值或者都是字符串，那么执行结果就分别是计算出来的数值和拼接好的字符串。除此之外，执行结果都取决于类型转化的结果：它会优先进行字符串拼接，只有操作数是字符串或者是可以转化为字符串的对象，另一个操作数也会被转化为字符串，并执行拼接操作。只有任何操作数都不是字符串时才会执行加法操作。

```js
1 + 2             // 3
"1" + "2"         // "12"
"1" + 2           // "12"
1 + {}            // "1[object Object]"
true + false      // 1  布尔值会先转为数字，再进行运算
1 + null          // 1 null会转化为0，再进行计算
1 + undefined     // NaN undefined转化为数字是NaN
```

需要注意加操作的顺序：

```js
let a = 1;
let b = 2;
let c = "hello" + a + b;  // "hello12"
```

这里，由于每次加法操作都是独立完成的，第一次是字符串hello和数字a做加法操作，得到的结果是"hello1"，第二次加法操作仍然是一个字符串加一个数字，所以最终结果是一个字符串。如果想让a和b两个数字相加，就需要加上括号。

除此之外，还需要注意以下特殊情况：

- 如果有一个操作数是NaN，则结果是NaN；
- 如果是Infinity加Infinity，则结果是Infinity；
- 如果是-Infinity加-Infinity，则结果是-Infinity；
- 如果是Infinity加-Infinity，则结果是NaN；
- 如果是+0加+0，则结果是+0；
- 如果是-0加-0，则结果是-0；
- 如果是+0加-0，则结果是+0。

### 2. 减法操作符（-）

减法操作和加法操作符类似， 但是减法操作符只能用于数值的计算，不能用于字符串的拼接。当进行减法操作时，如果两个操作数都是数值，就会直接进行减法操作，如果有一个操作数是非数值，就会将其转化为数值，再进行减法操作。如果转化结果为NaN，则运算结果也是NaN。

```js
3 - 1      // 2
3 - true   // 2
3 - ""     // 3
3 - null   // 3
NaN - 1    // NaN
```

需要注意以下特殊情况：

1. 如果是Infinity减Infinity，则结果是NaN；
2. 如果是-Infinity减-Infinity，则结果是NaN；
3. 如果是Infinity减-Infinity，则结果是Infinity；
4. 如果是-Infinity减Infinity，则结果是-Infinity；
5. 如果是+0减+0，则结果是+0；
6. 如果是-0减+0，则结果是-0；
7. 如果是-0减-0，则结果是+0。

### 3. 乘法操作符（*）

乘法操作符用于计算两个数的乘积。如果两个操作数都是数值，则会执行常规的乘法运算。如果不是数值，会将其转化为数值，在进行乘法操作。

需要注意以下特殊情况：

- 如果有一个操作数是NaN，则结果是NaN；
- 如果Infinity与0相乘，则结果是NaN；
- 如果Infinity与非0数值相乘，则结果是Infinity或-Infinity，取决于有符号操作数的符号；
- 如果Infinity与Infinity相乘，则结果是Infinity。

### 4. 除法操作符（/）

除法操作符用于计算一个操作数除以第二个操作数的商。如果两个操作数都是数值，则会执行常规的除法运算。如果不是数值，会将其转化为数值，在进行除法操作。

需要注意以下特殊情况：

- 如果有一个操作数是NaN，则结果是NaN；
- 如果0除以0，则结果是NaN；
- 如果Infinity除以Infinity，则结果是Infinity。
- 如果是非零的有限数被零除，则结果是Infinity或-Infinity，取决于有符号操作数的符号；
- 如果是Infinity被任何非零数值除，则结果是Infinity或-Infinity，取决于有符号操作数的符号。

### 5. 取余操作符（%）

取余操作符用于计算一个数除以第二个数的余数。计算规则和上述运算符类似。

需要注意以下特殊情况：

- 如果被除数是无穷大值而除数是有限大的数值，则结果是NaN；
- 如果被除数是有限大的数值而除数是零，则结果是NaN；
- 如果是Infinity被Infinity除，则结果是NaN；
- 如果被除数是有限大的数值而除数是无穷大的数值，则结果是被除数；
- 如果被除数是零，则结果是零。

### 6. 指数操作符（**）

在ECMAScript 7中新增了指数操作符（**），它的计算效果是Math.pow()是一样的：

```js
Math.pow(2, 10);    // 1024
2 ** 10;            // 1024
```

指数运算符和上面的加减乘除运算符都有对应的赋值操作运算符：

```js
let a = 2;
a **= 10;
console.log(a);   // 1024
let a = 1;
let b = 2;
let c = 3;
let d = 4;
a += 1;     // 2
b -= 2;     // 0
c *= 3;     // 9
d /= 4;     // 1
```

## 逻辑操作符

在开发时，布尔操作符是很有用的，可以精简很多代码，干掉很多多余的if-else语句<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208032327623.png" alt="image-20220803232724522" style="zoom:67%;" />

### 1. 逻辑非操作符（!）

逻辑非操作符可以用于JavaScript中的任何值，这个操作符使用返回布尔值。逻辑非操作符首先会将操作数转化为布尔值，然后在对其取反。

逻辑非操作规则如下：

- 如果操作数是对象，则返回 false；
- 如果操作数是空字符串，则返回 true；
- 如果操作数是非空字符串，则返回 false；
- 如果操作数是数值0，则返回 true；
- 如果操作数是非0数值（包括 Infinity)，则返回 false；
- 如果操作数是 null，则返回 true；
- 如果操作数是 NaN，则返回 true；
- 如果操作数是 undefined， 则返回 true.

逻辑非操作符也可以用于将任何值转化为布尔值，同时使用两个!，相当于调用了Boolean()方法：

```js
!!"blue" // true
!!0;     // false
!!NaN    // false
!!""     // false
!!12345  // true
```

### 2. 逻辑与操作符（&&）

逻辑与操作符的两个操作数都为真时，最终结果才会返回真。该运算符可以用于任何类型的数据。如果有操作数不是布尔值，则结果并一定会返回布尔值，会遵循以下规则：

- 如果第一个操作数是对象，则返回第二个操作数；
- 如果第二个操作数是对象，则只有在第一个操作数的求值结果为true的情况下才会返回该对象；
- 如果两个操作数都是对象，则返回第二个操作数；
- 如果第一个操作数是null，则返回null；
- 如果第一个操作数是NaN，则返回NaN；
- 如果第一个操作数是undefined，则返回undefined；

根据第二条规则，我们可以对我们项目代码中的代码进行优化：

```js
if(data) {
  setData(data);
}

// 改写后：
data && setData(data);
```

这里当data为真时，也就是存在时，才会执行setData方法，代码就精简了很多。

逻辑与操作符是一种短路操作符，只要第一个操作数为false，就不会继续执行运算符后面的表达式，直接返回false。上面的data如果是不存在的，就会直接发生短路，不会继续执行后面的方法。

### 3. 逻辑或操作符（||）

逻辑或操作符和逻辑与操作符类似，不过只要两个操作数中的一个为真，最终的结果就为真。该运算符可以用于任何类型的数据。如果有操作数不是布尔值，则结果并一定会返回布尔值，会遵循以下规则：

- 如果第一个操作数是对象，则返回第一个操作对象；
- 如果第一个操作数的求值结果是false，则返回第二个操作数；
- 如果两个操作数都是对象，则返回第一个操作数；
- 如果两个操作数都是null，则返回null；
- 如果两个数都是NaN，则返回NaN；
- 如果两个数都是undefined，则返回undefined。

逻辑或操作符也是具有短路特性，如果第一个操作数为真，那么第二个操作数就不需要在进行判断了，会直接返回true。

可以利用这个特性给变量设置默认值：

```js
let datas = data || {};
```

这里，如果data不存在，就会将datas赋值为第二个操作数（默认值）。

## 比较操作符

### 1. 相等操作符

相等操作符包括四种：

- 等于（==）
- 不等于（!=）
- 全等（===）
- 不全等（!==）

JavaScript中的等于用两个等号（==）表示，如果两个操作数相等，那么就返回true。不等于和等于相反。在进行比较时，两个操作数都会进行强制类型转换，在确实是否相等。其判断规则如下：

1. 首先会判断两者类型是否**相同，**相同的话就比较两者的大小；
2. 类型不相同的话，就会进行类型转换；
3. 会先判断是否在对比 `null` 和 `undefined`，是的话就会返回 `true`
4. 判断两者类型是否为 `string` 和 `number`，是的话就会将字符串转换为 `number`

```js
1 == '1'
      ↓
1 ==  1
```

1. 判断其中一方是否为 `boolean`，是的话就会把 `boolean` 转为 `number` 再进行判断

```js
'1' == true
        ↓
'1' ==  1
        ↓
 1  ==  1
```

1. 判断其中一方是否为 `object` 且另一方为 `string`、`number` 或者 `symbol`，是的话就会把 `object` 转为原始类型再进行判断

```js
'1' == { name: 'js' }        
 ↓
'1' == '[object Object]'
```

其流程图如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210011840405.png" alt="image-20221001184042308" style="zoom:80%;" />

需要注意，如果其中一个操作数是NaN，相等运算符会返回false，不相等运算符会返回true。

对于不等于运算符（!=），只有在强制类型转化后不相等才会返回true。

对于全等运算符（===），只有当两个操作数的数据类型和值都相等时，才会返回true。它并不会进行数据类型的转化。

对于不全等运算符（!==），只有两个操作数在不进行类型转化的情况下是不相等的，才会返回true。

在平时的开发中，建议使用全等和不全等在做比较，这样会更加严谨，避免出现意料之外的结果。

### 2. 关系操作符

关系操作符包括四种：

- 小于（<）
- 大于（>）
- 小于等于（<=）
- 大于等于（>=）

这几个操作符都会返回一个布尔值，他们操作时会遵循以下规则：

- 如果这两个操作数都是数值，则执行数值比较；
- 如果两个操作数都是字符串，则比较两个字符串对应的字符编码值；
- 如果一个操作数是数值，则将另一个操作数转换为一个数值，然后执行数值比较；
- 如果一个操作数是对象，则调用这个对象的valueOf()方法，并用得到的结果根据前面的规则执行比较；
- 如果一个操作数是布尔值，则先将其转换为数值，然后再执行比较。

## 三元表达式

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208041108521.png" alt="image-20220804110808434" style="zoom:67%;" />

> - 如果表达式1为 true ，则返回表达式2的值，如果表达式1为 false，则返回表达式3的值
> - 简单理解： 就类似于  if  else （双分支） 的简写

```js
let a = 10;
let b = 20;
let c = a > b ? 'a大' : 'b大';
console.log(c); //b大
```

```js
let num = 0;
num = num >= 10 ? num : '0' + num;
console.log(num) // 00
```

## 其他操作符

最后这一部分的一些操作符在平时的开发中就很实用了，下面来看看它们的用法吧。

### 1. 扩展运算符（...）

扩展操作符(Spread operator)可以用来扩展一个数组对象和字符串。它用三个点（…）表示，可以将可迭代对象转为用逗号分隔的参数序列。

**（1）用于展开数组**：

```js
const a = [1, 2, 3],
      b = [4, 5, 6];
const c = [...a]       // [1, 2, 3]
const d = [...a, ...b] // [1, 2, 3, 4, 5, 6]
const e = [...a, 4, 5] // [1, 2, 3, 4, 5]
```

**（2）将类数组对象变成数组：**

```js
const list = document.getElementsByTagName('a');
const arr = [..list];
```

**（3）用于展开对象：**

```js
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };  // { a: 1, b: 2, c: 3, d: 4 }
```

需要注意，如果合并时的多个对象有相同属性，则后面的对象的会覆盖前面对象的属性。

**（4）用于展开字符串**

```js
const str = "hello";
[...str]  // ["h", "e", "l", "l", "o"]
```

**（5）用于函数传参**

```js
const f = (foo, bar) => {}
const a = [1, 2]
f(...a)

const numbers = [1, 2, 3, 4, 5]
const sum = (a, b, c, d, e) => a + b + c + d + e
const sum = sum(...numbers)
```

**（6）用于具有 Iterator 接口的对象**

具有 Iterator 接口的对象 Map 和 Set 结构，Generator 函数，可以使用展开操作符:

```js
const s = new Set();
s.add(1);
s.add(2);
const arr = [...s]// [1,2]


function * gen() {
  yield 1;
  yield 2;
  yield 3;
}

const arr = [...gen()] // 1，2，3
```

如果是map，会把每个key 和 value 转成一个数组：

```js
const m = new Map();
m.set(1,1)
m.set(2,2)
const arr = [...m]  // [[1,1],[2,2]]
```

注意 ，对象不是一个Iterator对象。

### 2. 条件操作符（?:）

这里的条件运算符实际上就是我们常说的三元表达式。看一个例子：

```js
let res = num1 > num2 ? num1 : num2;
```

这里，将num1和num2中的最大值赋值给了res。

使用条件表达式可以代替很多if-else，使得代码很简洁。在React的项目中，我个人就经常使用条件操作符来做组件的条件渲染。当然如果判断的层数过多，感觉代码就有些难读懂了。（React-Router源码中就有嵌套了六七层条件操作符的地方，很难理解...）

### 3. 赋值操作符

其实赋值操作符有很多种，包括简单的赋值操作符（=），以及一些复合赋值操作符：

- 乘赋值操作符：*=
- 除赋值操作符：/=
- 模赋值操作符：%=
- 加赋值操作符：+=
- 减赋值操作符：-=
- 左移操作符: <<=
- 有符号右移赋值操作符：>>=
- 无符号右移赋值操作符：>>>=

这些仅仅是他们对应的简写形式，并不会产生其他影响。

### 4. in操作符

in操作符可以用来判断一个属性是否属于一个对象，它的返回值是一个布尔值：

```js
const author = {
  name: "CUGGZ",
  age: 18
}

"height" in author;  // false
"age" in author;     // true
```

还可以用来判断一个属性是否属于对象原型链的一部分：

```js
let arr = ["hello", "jue", "jin"];
"length" in arr;   // true
```

### 5. delete操作符

delete 操作符用于删除对象的某个属性或者数组元素。对于引用类型的值，它也是删除对象属性的本身，不会删除属性指向的对象。

```js
const o = {};
const a = { x: 10 };
o.a = a;
delete o.a; // o.a属性被删除
console.log(o.a); // undefined
console.log(a.x); // 10, 因为{ x: 10 } 对象依然被 a 引用，所以不会被回收
```

需要注意：

- 原型中声明的属性和对象自带的属性无法被删除；
- 通过var声明的变量和通过function声明的函数拥有dontdelete特性，是不能被删除。

### 6. instanceof操作符

instanceof运算符用来判断一个构造函数的prototype属性所指向的对象是否存在另外一个要检测对象的原型链上。

```js
console.log(2 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false 
console.log('str' instanceof String);                // false 
 
console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true
```

可以看到，instanceof只能正确判断引用数据类型，而不能判断基本数据类型。instanceof运算符可以用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。

可以简单来实现一下 instanceof 操作符：

```js
function myInstanceof(left, right) {
  // 获取对象的原型
  let proto = Object.getPrototypeOf(left)
  // 获取构造函数的 prototype 对象
  let prototype = right.prototype; 
 
  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    // 如果没有找到，就继续从其原型上找，Object.getPrototypeOf方法用来获取指定对象的原型
    proto = Object.getPrototypeOf(proto);
  }
}
```

### 7. typeof操作符

typeof是一元运算符，它的返回值是一个字符串，它是操作数的类型，JavaScript常见数据对应的类型如下：

| **x**       | **typeof** |
| :---------- | :--------- |
| undefined   | undefined  |
| null        | object     |
| true或false | boolean    |
| 数值或NaN   | number     |
| BigInt      | bigInt     |
| 字符串      | string     |
| symbol      | symbol     |
| 函数        | function   |
| 非函数对象  | object     |

```js
typeof 2               // number
typeof true            // boolean
typeof 'str'           // string
typeof []              // object    
typeof function(){}    // function
typeof {}              // object
typeof undefined       // undefined
typeof null            // object
```

那这里为什么 typeof null 的结果是Object呢？

在 JavaScript 第一个版本中，所有值都存储在 32 位的单元中，每个单元包含一个小的 **类型标签(1-3 bits)** 以及当前要存储值的真实数据。类型标签存储在每个单元的低位中，共有五种数据类型：

```js
000: object   - 当前存储的数据指向一个对象。
  1: int      - 当前存储的数据是一个 31 位的有符号整数。
010: double   - 当前存储的数据指向一个双精度的浮点数。
100: string   - 当前存储的数据指向一个字符串。
110: boolean  - 当前存储的数据是布尔值。
```

如果最低位是 1，则类型标签标志位的长度只有一位；如果最低位是 0，则类型标签标志位的长度占三位，为存储其他四种数据类型提供了额外两个 bit 的长度。

有两种特殊数据类型：

- undefined的值是 (-2)30(一个超出整数范围的数字)；
- null 的值是机器码 NULL 指针(null 指针的值全是 0)

那也就是说null的类型标签也是000，和Object的类型标签一样，所以会被判定为Object。

### 8. 空值合并操作符（??）

在编写代码时，如果某个属性不为 null 和 undefined，那么就获取该属性，如果该属性为 null 或 undefined，则取一个默认值：

```js
const name = dogName ? dogName : 'default'; 
```

可以通过 || 来简化：

```js
const name =  dogName || 'default'; 
```

但是 || 的写法存在一定的缺陷，当 dogName 为 0 或 false 的时候也会走到 default 的逻辑。所以 ES2020 引入了 ?? 运算符。只有 ?? 左边为 null 或 undefined时才返回右边的值：

```js
const dogName = false; 
const name =  dogName ?? 'default';  // name = false;
```

### 9. 可选链操作符（?.）

在开发过程中，我们可能需要获取深层次属性，例如 system.user.addr.province.name。但在获取 name 这个属性前需要一步步的判断前面的属性是否存在，否则并会报错：

```js
const name = (system && system.user && system.user.addr && system.user.addr.province && system.user.addr.province.name) || 'default';
```

为了简化上述过程，ES2020 引入了「链判断运算符」?.，可选链操作符( ?. )允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。?. 操作符的功能类似于 . 链式操作符，不同之处在于，在引用为null 或 undefined 的情况下不会引起错误，该表达式短路返回值是 undefined。与函数调用一起使用时，如果给定的函数不存在，则返回 undefined。

```js
const name = system?.user?.addr?.province?.name || 'default';
```

当尝试访问可能不存在的对象属性时，可选链操作符将会使表达式更短、更简明。在探索一个对象的内容时，如果不能确定哪些属性必定存在，可选链操作符也是很有帮助的。

可选链有以下三种形式：

```js
a?.[x]
// 等同于
a == null ? undefined : a[x]

a?.b()
// 等同于
a == null ? undefined : a.b()

a?.()
// 等同于
a == null ? undefined : a()
```

### 10. 逗号操作符（,）

逗号操作符也没啥好说的，当同时声明多个变量时会用到：

```js
let a = 1, b = 2, c = 3;
```

还有一种使用场景就是有多个循环变量的 for 循环中：

```js
for(let i = 0, j = 10; i < j; i++, j--){
  console.log(i + j);
}
```

### 11. void操作符（void）

void 是一元运算符，它可以出现在任意类型的操作数之前执行操作数，会忽略操作数的返回值，返回一个 undefined。void 常用于 HTML 脚本中执行 JavaScript 表达式，但不需要返回表达式的计算结果。比如对于链接标签，我们并不想让它发生跳转，就可以设置`href="javascript:void(0)`。

在下面代码中，使用 void 运算符让表达式返回 undefined：

```js
let a = b = c = 2;  // 定义并初始化变量的值
d = void (a -= (b *= (c += 5)));  // 执行void运算符，并把返回值赋予变量d
console.log(a);  // -12
console.log(b);  // 14
console.log(c);  // 7
console.log(d);  // undefined
```

由于 void 运算符的优先级比较高，高于普通运算符的优先级，所以在使用时应该使用小括号明确 void 运算符操作的操作数，避免引发错误。





# 流程控制

## 流程控制

- 以前我们写的代码，写几句就从上往下执行几句，这种叫顺序结构 
- 有的时候要根据条件选择执行代码，这种就叫分支结构 
- 某段代码被重复执行，就叫循环结构

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208041104140.png" alt="image-20220804110453040" style="zoom:67%;" />

## if 分支语句

### if 语句

语句可以理解为一个行为，循环语句和分支语句就是典型的语句。一个程序由很多个语句组成，一般情况下，会分割成一个一个的语句。

```js
// 条件成立执行代码，否则什么也不做
if (条件表达式) {
    // 条件成立执行的代码语句
}
```

### if else语句（双分支语句）

语法结构

```js
// 条件成立  执行 if 里面代码，否则执行else 里面的代码
if (条件表达式) {
    // [如果] 条件成立执行的代码
} else {
    // [否则] 执行的代码
}
```

### if else if 语句(多分支语句)

语法结构

```js
// 适合于检查多重条件。
if (条件表达式1) {
    语句1；
} else if (条件表达式2)  {
    语句2；
} else if (条件表达式3)  {
   语句3；
 ....
} else {
    // 上述条件都不成立执行此处代码
}
```

## switch

switch case 的性能比 if/else 好，而且代码看起来更干净

### 基本语法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208041109783.png" alt="image-20220804110905789" style="zoom:67%;" />

```js
switch(n)
{
    case 1:执行代码块1 break;
    case 2:执行代码块2 break;
    default:剩余选项
}
```

### 简单计算器

```html
<script>
  // 1.用户输入  2个数字 +  操作符号  + - *  / 
  let num1 = +prompt('请您输入第一个数字:')
  let num2 = +prompt('请您输入第二个数字:')
  let sp = prompt('请您输入 + - * / 其中一个:')
  // 2. 判断输出
  switch (sp) {
    case '+':
      alert(`两个数的加法操作是${num1 + num2}`)
      break
    case '-':
      alert(`两个数的减法操作是${num1 - num2}`)
      break
    case '*':
      alert(`两个数的乘法操作是${num1 * num2}`)
      break
    case '/':
      alert(`两个数的除法操作是${num1 / num2}`)
      break
    default:
      alert(`你干啥咧，请输入+-*/`)
  } 
</script>
```



示例

```js
let d = new Date().getDay();
switch (d)
{
    case 0: console.log("今天是星期日"); break;
    case 1: console.log("今天是星期一"); break;
    case 2: console.log("今天是星期二"); break;
    default:
        console.log('管他星期几')
}
```



## while 循环


### 基本语法

while语句的语法结构如下：

```js
while (条件表达式) {
    // 循环体代码 
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208040846112.png" alt="image-20220804084643002" style="zoom:67%;" />

### do-while循环

do... while 语句的语法结构如下：

```js
do {
    // 循环体代码 - 条件表达式为 true 时重复执行循环体代码
} while(条件表达式);
```

### continue、break

continue 关键字用于立即跳出本次循环，继续下一次循环。即**本次循环体中 continue 之后的代码就会少执行一次。**

break 关键字用于立即跳出整个循环（循环结束）

例如，吃5个包子，第3个有虫子，就扔掉第3个，继续吃第4个第5个包子，其代码实现如下：

```js
for (let i = 1; i <= 5; i++) {
    if (i === 3) {
        console.log('这个包子有虫子，扔掉');
        continue;  //跳出本次循环，跳出的是第3次循环
    }
    console.log('我正在吃第' + i + '个包子呢');
}
```

运行结果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220116162617914.png" alt="image-20220116162617914" style="zoom:80%;" />

> break 关键字用于立即跳出整个循环（循环结束）。例如，吃5个包子，吃到第3个发现里面有半个虫子，其余的不吃了，其代码实现如下：
>

  ```js
for (let i = 1; i <= 5; i++) {
    if (i === 3) {
        break; // 直接退出整个for 循环，跳到整个for下面的语句
    }
    console.log('我正在吃第' + i + '个包子呢');
}
  ```

运行结果：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220116162500032.png" alt="image-20220116162500032" style="zoom:80%;" />



# 分支语句优化

分支优化在各种语言中都有不同的实现方式和应用场景，本篇通过`JavaScript`介绍了两种代码分支优化的思想，代码的实现非常简单，重点在于这种思想的应用。

其实关于分支优化这个问题一直存在争议，目前存在两种观点：

> - **观点1**：压根不需要多此一举去优化它，并且优化后的代码因为多创建了一个**`对象/数组`**，对`对象/数组`进行检索反而比单纯的`if else`还是废性能。
> - **观点2**：分支优化后的代码`可读性/可维护性`更好，并且引入`对象/数组`所带来的性能问题在当今时代根本不值一提。

最近在网上冲浪时看到了这样一段代码：

```js
function getUserDescribe(name) {
    if (name === "小刘") {
        console.log("刘哥哥");
    } else if (name === "小红") {
        console.log("小红妹妹");
    } else if (name === "陈龙") {
        console.log("大师");
    } else if (name === "李龙") {
        console.log("师傅");
    } else if (name === "大鹏") {
        console.log("恶人");
    } else {
        console.log("此人比较神秘！");
    }
}
```

咋一看没感觉有什么异常，但如果有1000个判断条件，按照这种写法难不成要写1000个 `if` 分支？

如果写了大量的 `if` 分支，并且可能还具有**分支套分支**，可以想象到整个代码的可读性和可维护都会大大降低，这在实际开发中，确实是一个比较头疼的问题，那有没有什么办法能够即实现需求又能避免这些问题呢？

## 1️⃣ 简单分支优化

这就涉及到**分支优化**，让我们转换思维，去优化一下上面的代码结构：

```js
function getUserDescribe(name) {
    const describeForNameMap = {
        小刘: () => console.log("刘哥哥"),
        小红: () => console.log("小红妹妹"),
        陈龙: () => console.log("大师"),
        李龙: () => console.log("师傅"),
        大鹏: () => console.log("恶人"),
    };
    describeForNameMap[name] ? describeForNameMap[name]() : console.log("此人比较神秘！");
}
```

问题代码中的判断都是简单的**相等判断**，那么我们就可以将这些判断条件作为一个属性写到对象`describeForNameMap` 中去，这些属性对应的值就是条件成立后的处理函数。

之后我们就只需通过`getUserDescribe`函数接收到的参数去获取`describeForNameMap`对象中对应的值，如果该值存在就运行该值（因为值是一个函数）。

这样一来原本的 `if` 分支判断就转换成了简单的`key value`对应值，条件与处理函数一一对应，一目了然。

## 2️⃣ 复杂分支优化

那如果我们的 `if` 分支中的判断条件不只是简单的相等判断，还具有一些需要计算的表达式时，我们该怎么办呢？（如下所示）

```js
function getUserDescribe(name) {
    if (name.length > 3) {
        console.log("名字太长");
    } else if (name.length < 2) {
        console.log("名字太短");
    } else if (name[0] === "陈") {
        console.log("小陈");
    } else if (name[0] === "李" && name !== "李鹏") {
        console.log("小李");
    } else if (name === "李鹏") {
        console.log("管理员");
    } else {
        console.log("此人比较神秘！");
    }
}
```

对于这种结构的代码就不能引入对象来进行分支优化了，我们可以引入**二维数组**来进行分支优化：

```js
function getUserDescribe(name) {
    const describeForNameMap = [
        [
            (name) => name.length > 3, // 判断条件
            () => console.log("名字太长") // 执行函数
        ],
        [
            (name) => name.length < 2, 
            () => console.log("名字太短")
        ],
        [
            (name) => name[0] === "陈", 
            () => console.log("小陈")
        ],
        [
            (name) => name === "大鹏", 
            () => console.log("管理员")
        ],
        [
            (name) => name[0] === "李" && name !== "李鹏",
            () => console.log("小李"),
        ],
    ];
    // 获取符合条件的子数组
    const getDescribe = describeForNameMap.find((item) => item[0](name));
    // 子数组存在则运行子数组中的第二个元素（执行函数）
    getDescribe ? getDescribe[1]() : console.log("此人比较神秘！");
}
```

上面我们定义了一个`describeForNameMap`数组，数组内的每一个元素代表一个判断条件与其执行函数的集合（也是一个数组），之后我们通过数组的`find`方法查找`describeForNameMap`数组中符合判断条件的子数组即可。

## 3️⃣ 抽离分支

上面例子中我们定义的这个`describeForNameMap`对象是一个独立的结构，我们完全可以将它抽离出去：

```js
const describeForNameMap = {
    小刘: () => console.log("刘哥哥"),
    小红: () => console.log("小红妹妹"),
    陈龙: () => console.log("大师"),
    李龙: () => console.log("师傅"),
    大鹏: () => console.log("恶人"),
};

function getUserDescribe(name) {
    describeForNameMap[name] ? describeForNameMap[name]() : console.log("此人比较神秘！");
}
const describeForNameMap = [
    [
        (name) => name.length > 3, // 判断条件
        () => console.log("名字太长") // 执行函数
    ],
    [
        (name) => name.length < 2, 
        () => console.log("名字太短")
    ],
    [
        (name) => name[0] === "陈", 
        () => console.log("小陈")
    ],
    [
        (name) => name === "大鹏", 
        () => console.log("管理员")
    ],
    [
        (name) => name[0] === "李" && name !== "李鹏",
        () => console.log("小李"),
    ],
];
    
function getUserDescribe(name) {
    // 获取符合条件的子数组
    const getDescribe = describeForNameMap.find((item) => item[0](name));
    // 子数组存在则运行子数组中的第二个元素（执行函数）
    getDescribe ? getDescribe[1]() : console.log("此人比较神秘！");
}
```

> 通过模块化的开发也可以将这个`map`对象写进一个单独的`js`文件，之后在需要使用的地方导入即可。

## 4️⃣ 争议

这样一来整个`getUserDescribe`函数就变得非常简洁，有的同学可能会问这有什么用呢？这不是更加麻烦了吗？如果真的嫌`if else`不好看，那我就使用`if return`不用`else`就好了：

```js
function getUserDescribe(name) {
    if (name === "小刘") {
        console.log("刘哥哥");
        return;
    }
    if (name === "小红") {
        console.log("小红妹妹");
        return;
    }
    if (name === "陈龙") {
        console.log("大师");
        return;
    }
    if (name === "李龙") {
        console.log("师傅");
        return;
    }
    if (name === "大鹏") {
        console.log("恶人");
        return;
    }
    console.log("此人比较神秘！");
}
```

试想一下，如果你`getUserDescribe`函数中有1000个判断分支，并且还具有大量的根据判断结果来执行的处理代码，并且`getUserDescribe`函数会返回这个处理后的判断结果的值。

这时`getUserDescribe`函数的**重点**在于**对判断结果的处理**，而不在于这个结果是通过什么分支获取的，例如：

```js
function getUserDescribe(name) {
    let str; // 存储判断结果
    if (name.length > 3) {
        str = "名字太长";
    } else if (name.length < 2) {
        str = "名字太短";
    } else if (name[0] === "陈") {
        str = "小陈";
    } else if (name[0] === "李" && name !== "李鹏") {
        str = "小李";
    } else if (name === "李鹏") {
        str = "管理员";
    } else {
        str = "此人比较神秘！";
    }
    // 对判断结果str的一些处理
    // ......
    console.log(str);
    return str;
}
```

如果你不进行分支优化，`getUserDescribe`函数就会被大量的 `if` 分支抢占空间，使得`getUserDescribe`函数的重点迷失（`getUserDescribe`函数**重点在于对判断结果的处理**，而不在于这个结果是通过什么分支获取的），这时你再看一下我们优化后的代码：

```js
const describeForNameMap = [
    [(name) => name.length > 3, () => "名字太长"],
    [(name) => name.length < 2, () => "名字太短"],
    [(name) => name[0] === "陈", () => "小陈"],
    [(name) => name === "大鹏", () => "管理员"],
    [(name) => name[0] === "李" && name !== "李鹏", () => "小李"],
];

function getUserDescribe(name) {
    let str; // 存储判断结果
    const getDescribe = describeForNameMap.find((item) => item[0](name));
    if (getDescribe) {
        str = getDescribe[1]();
    } else {
        str = "此人比较神秘！";
    }
    // 对判断结果str的一些处理
    // ......
    console.log(str);
    return str;
}
```

查看优化后的`getUserDescribe`函数我们能够知道，它从`describeForNameMap`获取了一个值赋值给了`str`（`describeForNameMap`是如何返回值的我们并不关心），之后对`str`作了一些处理。这就突出了`getUserDescribe`函数的重点（**对判断结果str进行处理**）。

> 在这个例子中`describeForNameMap`子数组的第二个元素完全可以直接使用一个值：`[(name) => name.length > 3, "名字太长"]`，但为了整体代码的可扩展性，推荐还是使用函数，因为函数可以接收参数，方便应对之后更复杂的场景。

# 循环遍历方法⭐

[24个JavaScript循环遍历方法，你都知道吗？](https://mp.weixin.qq.com/s?__biz=MzU2MTIyNDUwMA==&mid=2247511940&idx=1&sn=96e2dec0914554a40b85b8f5f0dbc68a&chksm=fc7ee1dfcb0968c914c02aeb1da6072a6dcf4637b44ee65e22839d76c2515f24ce72f03be33a&mpshare=1&scene=23&srcid=0201YGl9IbM8MofDnhACYZnT&sharer_sharetime=1675266658129&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

JavaScript 提供了很多循环遍历方法，下面就来详细看看这些方法都是怎么用的以及使用时的注意事项：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNfrN6EDw8olLDO7SBibJOHvP8tmxjU0tJeQwyT9BvVQqyqgYCYqdmUaiclpVfiatn4eXT9ibOvY9htfw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 数组遍历方法

### 1. forEach()

`forEach` 方法用于调用数组的每个元素，并将元素传递给回调函数。数组中的每个值都会调用回调函数。其语法如下：

```js
array.forEach(function(currentValue, index, arr), thisValue)
```

该方法的第一个参数为回调函数，是必传的，它有三个参数：

- currentValue：必需。当前元素
- index：可选。当前元素的索引值。
- arr：可选。当前元素所属的数组对象

```js
let arr = [1,2,3,4,5]
arr.forEach((item, index, arr) => {
  console.log(index+":"+item)
})
```

该方法还可以有第二个参数，用来绑定回调函数内部this变量（前提是回调函数不能是箭头函数，因为箭头函数没有this）：

```js
let arr = [1,2,3,4,5]
let arr1 = [9,8,7,6,5]
arr.forEach(function(item, index, arr){
  console.log(this[index])  //  9 8 7 6 5
}, arr1)
```

注意：

- forEach 方法不会改变原数组，也没有返回值；
- forEach无法使用 break，continue 跳出循环，使用 return 时，效果和在 for 循环中使用 continue 一致；
- forEach 方法无法遍历对象，仅适用于数组的遍历。

### 2. map()

`map()` 方法会返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。该方法按照原始数组元素顺序依次处理元素。其语法如下：

```js
array.map(function(currentValue,index,arr), thisValue)
```

该方法的第一个参数为回调函数，是必传的，它有三个参数：

- currentValue：必须。当前元素的值；
- index：可选。当前元素的索引值；
- arr：可选。当前元素属于的数组对象。

```js
let arr = [1, 2, 3];
 
arr.map(item => {
    return item + 1;
})

// 输出结果： [2, 3, 4]
```

该方法的第二个参数用来绑定参数函数内部的this变量，是可选的：

```js
let arr = ['a', 'b', 'c'];
 
[1, 2].map(function (e) {
    return this[e];
}, arr)

// 输出结果： ['b', 'c']
```

该方法还可以进行链式调用：

```js
let arr = [1, 2, 3];
 
arr.map(item => item + 1).map(item => item + 1)

// 输出结果： [3, 4, 5]
```

注意：

- map 方法不会对空数组进行检测；
- map 方法遍历数组时会返回一个新数组，**不会改变原始数组**；
- map 方法有返回值，可以return出来，map的回调函数中支持return返回值；
- map 方法无法遍历对象，仅适用于数组的遍历。

### 3. for of

`for...of` 语句创建一个循环来迭代可迭代的对象。在 ES6 中引入的 `for...of` 循环，以替代 `for...in` 和 `forEach()` ，并支持新的迭代协议。其语法如下：

```js
for (variable of iterable) {
    statement
}
```

该方法有两个参数：

- variable：每个迭代的属性值被分配给该变量。
- iterable：一个具有可枚举属性并且可以迭代的对象。

该方法可以获取数组的每一项：

```js
let arr = [
    {id:1, value:'hello'},
    {id:2, value:'world'},
    {id:3, value:'JavaScript'}
]
for (let item of arr) {
  console.log(item); 
}
// 输出结果：{id:1, value:'hello'}  {id:2, value:'world'} {id:3, value:'JavaScript'}
```

注意：

- for of 方法只会遍历当前对象的属性，不会遍历其原型链上的属性；
- for of 方法适用遍历 **数组/ 类数组/字符串/map/set** 等拥有迭代器对象的集合；
- for of 方法不支持遍历普通对象，因为其没有迭代器对象。如果想要遍历一个对象的属性，可以用 for in 方法；
- 可以使用break、continue、return来中断循环遍历；

### 4. filter()

`filter()`方法用于过滤数组，满足条件的元素会被返回。它的参数是一个回调函数，所有数组元素依次执行该函数，返回结果为true的元素会被返回，如果没有符合条件的元素，则返回空数组。其语法如下：

```js
array.filter(function(currentValue,index,arr), thisValue)
```

该方法的第一个参数为回调函数，是必传的，它有三个参数：

- currentValue：必须。当前元素的值；
- index：可选。当前元素的索引值；
- arr：可选。当前元素属于的数组对象。

```js
const arr = [1, 2, 3, 4, 5]
arr.filter(item => item > 2) 

// 输出结果：[3, 4, 5]
```

同样，它也有第二个参数，用来绑定参数函数内部的this变量。

可以使用`filter()`方法来移除数组中的undefined、null、NAN等值：

```js
let arr = [1, undefined, 2, null, 3, false, '', 4, 0]
arr.filter(Boolean)

// 输出结果：[1, 2, 3, 4]
```

注意：

- filter 方法会返回一个新的数组，不会改变原数组；
- filter 方法不会对空数组进行检测；
- filter 方法仅适用于检测数组。

### 5. some()、every()

> some() 方法会对数组中的每一项进行遍历，只要有一个元素符合条件，就返回true，且剩余的元素不会再进行检测，否则就返回false。

> every() 方法会对数组中的每一项进行遍历，只有所有元素都符合条件时，才返回true，如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。其语法如下：

两者的语法如下：

```js
array.some(function(currentValue,index,arr),thisValue)
array.every(function(currentValue,index,arr), thisValue)
```

两个方法的第一个参数为回调函数，是必传的，它有三个参数：

- currentValue：必须。当前元素的值；
- index：可选。当前元素的索引值；
- arr：可选。当前元素属于的数组对象。

```js
let arr = [1, 2, 3, 4, 5]
arr.some(item => item > 4) 

// 输出结果： true

let arr = [1, 2, 3, 4, 5]
arr.every(item => item > 0) 

// 输出结果： true
```

注意：

- 两个方法都不会改变原数组，会返回一个布尔值；
- 两个方法都不会对空数组进行检测；
- 两个方法都仅适用于检测数组。

### 6. reduce()、reduceRight()

reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。reduce() 可以作为一个高阶函数，用于函数的 compose。其语法如下：

```js
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
```

reduce 方法会为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，回调函数接受四个参数：

- total：上一次调用回调返回的值，或者是提供的初始值（initialValue）；
- currentValue：当前被处理的元素；
- currentIndex：当前元素的索引；
- arr：当前元素所属的数组对象。

该方法的第二个参数是 `initialValue`，表示传递给函数的初始值 （作为第一次调用 callback 的第一个参数）：

```js
let arr = [1, 2, 3, 4]
let sum = arr.reduce((prev, cur, index, arr) => {
    console.log(prev, cur, index);
    return prev + cur;
})
console.log(arr, sum);
```

输出结果：

```js
1 2 1
3 3 2
6 4 3
[1, 2, 3, 4] 10
```

再来加一个初始值试试：

```js
let arr = [1, 2, 3, 4]
let sum = arr.reduce((prev, cur, index, arr) => {
    console.log(prev, cur, index);
    return prev + cur;
}, 5)
console.log(arr, sum);
```

输出结果：

```js
5 1 0
6 2 1
8 3 2
11 4 3
[1, 2, 3, 4] 15
```

由此可以得出结论：**如果没有提供初始值initialValue，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供了初始值initialValue，从索引0开始执行**

reduceRight() 方法和的`reduce()`用法几乎一致，只是该方法是对数组进行倒序遍历的，而`reduce()`方法是正序遍历的。

```js
let arr = [1, 2, 3, 4]
let sum = arr.reduceRight((prev, cur, index, arr) => {
    console.log(prev, cur, index);
    return prev + cur;
}, 5)
console.log(arr, sum);
```

输出结果：

```
5 4 3
9 3 2
12 2 1
14 1 0
[1, 2, 3, 4] 15
```

注意：

- 两个方法都不会改变原数组；
- 两个方法如果添加初始值，就会改变原数组，会将这个初始值放在数组的最后一位；
- 两个方法对于空数组是不会执行回调函数的。

### 7. find()、findIndex()

`find()` 方法返回通过函数内判断的数组的第一个元素的值。当数组中的元素在测试条件时返回 true 时， `find()` 返回符合条件的元素，之后的值不会再调用执行函数。如果没有符合条件的元素返回 undefined。

`findIndex()` 方法返回传入一个测试函数符合条件的数组**第一个元素位置**（索引）。当数组中的元素在函数条件时返回 true 时， `findIndex()` 返回符合条件的元素的索引位置，之后的值不会再调用执行函数。如果没有符合条件的元素返回 -1。

两个方法的语法如下：

```js
array.find(function(currentValue, index, arr),thisValue)
array.findIndex(function(currentValue, index, arr), thisValue)
```

两个方法的第一个参数为回调函数，是必传的，它有三个参数：

- currentValue：必需。当前元素；
- index：可选。当前元素的索引；
- arr：可选。当前元素所属的数组对象。

```js
let arr = [1, 2, 3, 4, 5]
arr.find(item => item > 2) 

// 输出结果： 3

let arr = [1, 2, 3, 4, 5]
arr.findIndex(item => item > 2) 

// 输出结果： 2
```

`find()`和`findIndex()`两个方法几乎一样，只是返回结果不同：

- `find()`：返回的是第一个符合条件的值；
- `findIndex`：返回的是第一个返回条件的值的索引值。

注意：

- 两个方法对于空数组，函数是不会执行的；
- 两个方法否不会改变原数组。

### 8. keys()、values()、entries()

三个方法都返回一个数组的迭代对象，对象的内容不太相同：

- keys() 返回数组的索引值；
- values() 返回数组的元素；
- entries() 返回数组的键值对。

三个方法的语法如下：

```js
array.keys()
array.values()
array.entries()
```

这三个方法都没有参数：

```js
let arr = ["Banana", "Orange", "Apple", "Mango"];
const iterator1 = arr.keys();
const iterator2 = arr.values() 
const iterator3 = arr.entries() 

for (let item of iterator1) {
  console.log(item);
}
// 输出结果： 0 1 2 3

for (let item of iterator2) {
  console.log(item);
}
// 输出结果： Banana Orange Apple Mango

for (let item of iterator3) {
  console.log(item);
}
// 输出结果：[0, 'Banana'] [1, 'Orange'] [2, 'Apple'] [3, 'Mango']
```

**总结：**

| **方法**                    | **是否改变原数组** | **特点**                                                     |
| :-------------------------- | :----------------- | :----------------------------------------------------------- |
| forEach()                   | 否                 | 没有返回值                                                   |
| map()                       | 否                 | 有返回值，可链式调用                                         |
| for of                      | 否                 | for...of遍历具有Iterator迭代器的对象的属性，返回的是数组的元素、对象的属性值，不能遍历普通的obj对象，将异步循环变成同步循环 |
| filter()                    | 否                 | 过滤数组，返回包含符合条件的元素的数组，可链式调用           |
| every()、some()             | 否                 | some()只要有一个是true，便返回true；而every()只要有一个是false，便返回false. |
| find()、findIndex()         | 否                 | find()返回的是第一个符合条件的值；findIndex()返回的是第一个返回条件的值的索引值 |
| reduce()、reduceRight()     | 否                 | reduce()对数组正序操作；reduceRight()对数组逆序操作          |
| keys()、values()、entries() | 否                 | keys() 返回数组的索引值；values() 返回数组元素；entries() 返回数组的键值对。 |

## 对象遍历方法

### 1. for in

`for…in` 主要用于循环对象属性。循环中的代码每执行一次，就会对对象的属性进行一次操作。其语法如下：

```js
for (var in object) {
   执行的代码块
}
```

其中两个参数：

- var：必须。指定的变量可以是数组元素，也可以是对象的属性。
- object：必须。指定迭代的的对象。

```js
var obj = {a: 1, b: 2, c: 3}; 
 
for (var i in obj) { 
    console.log('键名：', i); 
    console.log('键值：', obj[i]); 
}
```

输出结果：

```js
键名： a
键值： 1
键名： b
键值： 2
键名： c
键值： 3
```

注意：for in 方法不仅会遍历当前的对象所有的可枚举属性，还会遍历其原型链上的属性。

### 2. Object.keys()

这三个方法都用来遍历对象，它会返回一个由给定对象的自身可枚举属性（不含继承的和Symbol属性）组成的数组，数组元素的排列顺序和正常循环遍历该对象时返回的顺序一致，这个三个元素返回的值分别如下：

- Object.keys()：返回包含对象键名的数组；
- Object.values()：返回包含对象键值的数组；
- Object.entries()：返回包含对象键名和键值的数组。

```js
let obj = { 
  id: 1, 
  name: 'hello', 
  age: 18 
};
console.log(Object.keys(obj));   // 输出结果: ['id', 'name', 'age']
console.log(Object.values(obj)); // 输出结果: [1, 'hello', 18]
console.log(Object.entries(obj));   // 输出结果: [['id', 1], ['name', 'hello'], ['age', 18]
```

注意

- Object.keys()方法返回的数组中的值都是字符串，也就是说不是字符串的key值会转化为字符串。
- 结果数组中的属性值都是对象本身**可枚举的属性**，不包括继承来的属性。

### 3. Object.getOwnPropertyNames()

`Object.getOwnPropertyNames()`方法与`Object.keys()`类似，也是接受一个对象作为参数，返回一个数组，包含了该对象自身的所有属性名。但它能返回**不可枚举的属性。**

```js
let a = ['Hello', 'World'];
 
Object.keys(a) // ["0", "1"]
Object.getOwnPropertyNames(a) // ["0", "1", "length"]
```

这两个方法都可以用来计算对象中属性的个数：

```js
var obj = { 0: "a", 1: "b", 2: "c"};
Object.getOwnPropertyNames(obj) // ["0", "1", "2"]
Object.keys(obj).length // 3
Object.getOwnPropertyNames(obj).length // 3
```

### 4. Object.getOwnPropertySymbols()

`Object.getOwnPropertySymbols()` 方法返回对象自身的 Symbol 属性组成的数组，不包括字符串属性：

```js
let obj = {a: 1}

// 给对象添加一个不可枚举的 Symbol 属性
Object.defineProperties(obj, {
 [Symbol('baz')]: {
  value: 'Symbol baz',
  enumerable: false
 }
})
 
// 给对象添加一个可枚举的 Symbol 属性
obj[Symbol('foo')] = 'Symbol foo'
 
Object.getOwnPropertySymbols(obj).forEach((key) => {
 console.log(obj[key]) 
})

// 输出结果：Symbol baz Symbol foo
```

### 5. Reflect.ownKeys()

Reflect.ownKeys() 返回一个数组，包含对象自身的所有属性。它和Object.keys()类似，Object.keys()返回属性key，但不包括不可枚举的属性，而Reflect.ownKeys()会返回所有属性key：

```js
var obj = {
 a: 1,
 b: 2
}
Object.defineProperty(obj, 'method', {
 value: function () {
     alert("Non enumerable property")
 },
 enumerable: false
})

console.log(Object.keys(obj))
// ["a", "b"]
console.log(Reflect.ownKeys(obj))
// ["a", "b", "method"]
```

注意：

- Object.keys() ：相当于返回对象属性数组；
- Reflect.ownKeys() :相当于 `Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj)`。

**总结：**

| **对象方法**                   | **遍历基本属性** | **遍历原型链** | **遍历不可枚举属性** | **遍历Symbol** |
| :----------------------------- | :--------------- | :------------- | :------------------- | :------------- |
| for in                         | 是               | 是             | 否                   | 否             |
| Object.keys()                  | 是               | 否             | 否                   | 否             |
| Object.getOwnPropertyNames()   | 是               | 否             | 是                   | 否             |
| Object.getOwnPropertySymbols() | 否               | 否             | 是                   | 是             |
| Reflect.ownKeys()              | 是               | 否             | 是                   | 是             |

## 其他遍历方法

### 1. for

> for循环是应该是最常见的循环方式了，它由三个表达式组成，分别是声明循环变量、判断循环条件、更新循环变量。这三个表达式用分号分隔。可以使用临时变量将数组的长度缓存起来，避免重复获取数组长度，当数组较大时优化效果会比较明显。

```js
const arr = [1,2,3,4,5]
for(let i = 0, len = arr.length; i < len; i++ ){
  console.log(arr[i])
}
```

在执行的时候，会先判断执行条件，再执行。for循环可以用来遍历数组，字符串，类数组，DOM节点等。可以改变原数组。

### 2. while

`while`循环中的结束条件可以是各种类型，但是最终都会转为布尔值，转换规则如下。

- Boolean：true为真，false为假；
- String：空字符串为假，所有非空字符串为真；
- Number：0为假，非0数字为真；
- null/Undefined/NaN：全为假；
- Object：全为真。

```js
let num = 1;
            
while (num < 10){
    console.log(num);
    num ++;
}
```

`while`和`for`一样，都是先判断，再执行。只要指定条件为 true，循环就可以一直执行代码。

### 3. do / while

该方法会先执行再判断，即使初始条件不成立，`do/while`循环也至少会执行一次。

```js
let num = 10;
            
do
 {
    console.log(num);
    num--;
  }
while(num >= 0);
            
console.log(num); //-1
```

不建议使用do / while来遍历数组。

### 4. for await of

`for await...of`方法被称为**异步迭代器**，该方法是主要用来遍历异步对象。它是ES2018中引入的方法。

`for await...of` 语句会在异步或者同步可迭代对象上创建一个迭代循环，包括 String，Array，类数组，Map， Set和自定义的异步或者同步可迭代对象。这个语句只能在 `async function`内使用：

```js
function Gen (time) {
  return new Promise((resolve,reject) => {
    setTimeout(function () {
       resolve(time)
    },time)
  })
}

async function test () {
   let arr = [Gen(2000),Gen(100),Gen(3000)]
   for await (let item of arr) {
      console.log(Date.now(),item)
   }
}
test()
```

输出结果：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNfrN6EDw8olLDO7SBibJOHvM3o4hmJlV0picyfnibJW9X4xFYHdKsY5I9jIU6e6K2YERuqfTdicp1QmQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

##  for 循环之间区别

### 1、使用场景差异

> for循环是最早最原始的循环遍历语句，for 内部定义一个变量，按照条件进行循环遍历，通常是数组的长度，当超过长度时就停止循环，一般遍历的都是数组或类数组。
>

> 遍历对象时，**由于对象没有长度，所以使用 Object.keys() **获取对象的所有属性**，以数组形式返回**
>

> for / in主要是用来遍历对象上的可枚举属性，包括原型对象上的属性，按任意顺序进行遍历，遍历对象时获取到的是属性的键值，遍历的是数组，数组的下标当做键值。
>

> for / of用于遍历可迭代对象的数据，包括 Array、Map、Set、String、TypedArray、arguments 对象等等。
>

> for await...of用于遍历异步可迭代对象，该语句只能在一个async function 内部使用。
>

> forEach 是 for 的加升级版，使用更简单，携带参数更多，但本质还是数组的循环，每个元素都执行一次回调，不会改变原数组。map是给原数组每个元素都执行一次回调，返回一个新数组，不会改变原数组。
>

### 2、功能差异

> forEach、map 不支持跳出循环，其他不支持。for await ... of 能够支持异步操作，其他的不支持。

> 对于纯对象的遍历， for ... in 枚举更方便。对于数组遍历，如果不需要索引，可以直接使用 for...of 获取值，还可支持 break 或 return ;如果还需要索引，使用 forEach 更适合，但不支持 return。如果是一个数组映射成另一个数组，使用 map 最合适。
>

### 3、性能差异

在测试环境、测试数据条件一致的情况下，性能排序为：

> for > for of > forEach > map > for in
>

> for 因为没有额外的函数调用和上下文，所以性能是最快的
>
> for ... of 具有 iterator 接口的数据结构，可以使用它来迭代成员，直接读取键值
>
> forEach 是 for 的语法糖，还有许多的参数和上下文，因此会慢一些。
>
> map 因为它返回的是一个等长的全新数组，数组创建和赋值产生的性能开销较大。
>
> for...in 性能最差，因为需要列举对象的所有属性，有转化过程，开销比较大。

### 4、for 的使用

在项目开发中，我们应该根据实际需求，去选择一个合适的 for 遍历。以下是一些使用建议：

> 1. 如果需要把数据映射成另外一个数组，如变成对应布尔值，推荐使用 map ，不会修改原数组，使用语法简单。
> 2. 数组遍历时，可以使用 for 、forEach 或 for...of。
> 3. 遍历的是纯对象时，推荐使用 for ... in 。
> 4. 如果是需要对迭代器遍历，推荐使用 for ... of。
> 5. 如果是在数组中筛选符合条件的数组，使用 fillter 。

# 数组

## 创建数组

### 利用new创建数组  

```js
var 数组名 = new Array(); // 注意 Array () ，A 要大写
var arr = new Array();   // 创建一个新的空数组
```

### 利用数组字面量创建数组

```js
//1. 使用数组字面量方式创建空的数组
let  数组名 = []；
//2. 使用数组字面量方式创建带初始值的数组
let  数组名 = ['小白','小黑','大黄','瑞奇'];
var arrStus = ['小白',12,true,28.9];
```

### 注意事项

> - 数组的字面量是方括号 [ ] 
> - 声明数组并赋值称为数组的初始化
> - **这种字面量方式也是我们以后最多使用的方式**
>
> - 数组元素的**类型**，数组中**可以存放任意类型的数据，例如字符串，数字，布尔值等。**

## 数组基本方法

### 获取数组中的元素

索引 (下标) ：用来访问数组元素的序号（数组下标从 0 开始）。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/%E5%9B%BE%E7%89%871.png" style="zoom:67%;" />

数组可以通过索引来访问、设置、修改对应的数组元素，可以通过“数组名[索引]”的形式来获取数组中的元素。

注意：如果访问时数组没有和索引值对应的元素，则得到的值是undefined

```js
// 定义数组
var arrStus = [1,2,3];
// 获取数组中的第2个元素
console.log(arrStus[1]);    
```

```js
// 检索任何 JavaScript 数组中的第一个/最后一个项目
const head = (arr) => arr[0];
const last = (arr) => arr[arr.length - 1];

head([1, 2, 3, 4, 5, 6, 7, 8]); // 1
last([1, 2, 3, 4, 5, 6, 7, 8]); // 8
```

### 检测是否为数组

instanceof 运算符，instanceof 可以判断一个对象是否是某个构造函数的实例

```js
let arr = [1, 23];
let obj = {};
console.log(arr instanceof Array); // true
console.log(obj instanceof Array); // false
```

Array.isArray()用于判断一个对象是否为数组，isArray() 是 HTML5 中提供的方法

```js
let arr = [1, 23];
let obj = {};
console.log(Array.isArray(arr));   // true
console.log(Array.isArray(obj));   // false
```

### 清空数组

如果要清空数组，可以将数组的长度设置为 0

```js
let array = ["A", "B", "C", "D", "E", "F"]
array.length = 0 
console.log(array)  // []
```

### 遍历数组

把数组中的每个元素从头到尾都访问一次（类似学生的点名），可以通过 for 循环索引遍历数组中的每一项


```js
let arr = ['red','green', 'blue'];
for(let i = 0; i < arr.length; i++){
    console.log(arr[i]);
}
```

数组的长度：使用“数组名.length”可以访问数组元素的数量（数组长度）。

```js
let arrStus = [1,2,3];
console.log(arrStus.length);  // 3
```

### 新增元素

数组中可以通过以下方式在**数组的末尾插入新元素**：

```js
数组[数组.length] = 新数据;
```

```js
//在数组末尾插入值
let arr = [1,2,3];
arr[arr.length] = 4;
console.log(arr) //[ 1, 2, 3, 4 ]
```



## 数组方法

数组原型方法主要有以下这些：

先创建一个数组，下面方法都是使用这个数组

```js
let arr = ['张三','李四','王五','张强']
```

### 数组转字符串

toLocaleString()、toString()：将**数组转换为字符串**

```js
let s = arr.toLocaleString();
console.log(s.split(',')) //[ '张三', '李四', '王五', '张强' ]
let s1 = arr.toString();
console.log(s1) //张三,李四,王五,张强
```

join()：用**指定的分隔符**将数组每一项**拼接为字符串**

```js
console.log(arr.join()) //张三,李四,王五,张强
console.log(arr.join('-')) //张三-李四-王五-张强
```

### 增删改⭐⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208041117994.png" alt="image-20220804111739892" style="zoom:67%;" />

- push()：向数组的**末尾添加新元素,可以添加一个或多个**

- pop()：**删除**数组的**最后一项**

```js
let number = arr.push('jake','marry');
console.log(number) //返回当前数组长度：6
let s = arr.pop();
console.log(s) //返回当前弹出的值：marry
```

- unshift()：向数组**首位添加新元素添加一个或更多元素，并返回新的长度**
- shift()：**删除**数组的**第一项，并返回第一个元素的值**

```js
arr.unshift('marry','jack');
arr.shift();
console.log(arr) //['jack', '张三', '李四', '王五', '张强']
```



splice()：对**数组进行增删改**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208041116879.png" alt="image-20220804111650779" style="zoom:67%;" />

**删除元素**，并返回删除的元素，2个参数：起始位置和要删除的项数

如果我们想删除一个数组的元素，可以使用delete来完成，但是删除后元素会变成undefined，不会消失，而且执行会消耗很多时间，所以大部分情况下不会满足我们的需求。所以我们可以使用数组的 splice() 方法来删除数组的元素。

```js
let s = arr.splice(0,2);
console.log(s) //['张三', '李四']
```

向指定索引处**添加或替换**元素，3个参数：起始位置、0(要删除的项数)和要插入的项，可以插入多个值

```js
//在索引1位置插入如下两个元素
arr.splice(1,0,'mark','marry')
console.log(arr) //['张三', 'mark', 'marry', '李四', '王五', '张强']
```

注意：如果要删除，是先在原数组对应索引位置进行删除，再在该索引位置进行添加

```js
arr.splice(1,1,'mark','marry')
console.log(arr)  //[ '张三', 'mark', 'marry', '王五', '张强' ]
```



### 截断数组

> slice()：**截断数组：按照条件**查找出其中的**部分元素**,返回从原数组中指定**开始下标到结束下标之间的项组成的新数组**，可以接受一或两个参数，即要返回项的起始和结束位置(不包括结束位置的项)

```js
let s = arr.slice(1); //传入数组索引
console.log(s) //['李四', '王五', '张强']
let s1 = arr.slice(1,3); //左闭右开
console.log(s1) //['李四', '王五']
let s2 = arr.slice(1,-1); //相当于(1,3)如上，末尾最后为-1
console.log(s2) //['李四', '王五']
```



### 数组过滤⭐

filter()：**过滤功能**

例1:注意item就表示数组每一项，这样就相当于循环操作了

```js
//筛选不包含'b'的字符串
let arr1 = ['aa','cb','cc', 'bd','rf']
let newArr = arr1.filter(item => item.indexOf('b')<0)
console.log(newArr)  //[ 'aa', 'cc', 'rf' ]
```

例2

```js
//筛选以f结尾的字符串
let newArr2 = arr1.filter(item => {
    if (item.endsWith('f')) {
        console.log(item) //bf、rf
    }
})
```

过滤错误值

如果要过滤数组中的值，例如 false、0、null、undefined 等，可以这样做。

```js
const array = [1, 0, undefined, 6, 7, '', false];
array.filter(Boolean);// [1, 6, 7]
```



find()：**返回匹配的第一项**

findIndex()：用于找到数组中**第一个符合条件的元素的下标**，如果所有成员都不符合条件，则返回-1

两个用法相同

```js
let arr1 = [1,2,3,4,5];
let num = arr1.find(item => item > 1);
console.log(num) //2
```

```js
let arr2 = [1,2,3,4,5];
let num1 = arr2.findIndex(item => item > 1);
console.log(num1) //1
```

### 从数组中获取随机值

```js
const arr = [ 'fatfish', 'fish', 24, 'hello', 'world' ]
const getRandomValue = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
}
console.log(getRandomValue(arr)) // world

console.log(getRandomValue(arr)) // world
console.log(getRandomValue(arr)) // 24
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210151134354.png" alt="image-20221015113411231" style="zoom:80%;" />

### 打乱数组

```js
const prizes = [ '1', '2', '3', '4' ]
prizes.sort(() => 0.5 - Math.random())
console.log(prizes)
prizes.sort(() => 0.5 - Math.random())
console.log(prizes)
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210151137995.png" alt="image-20221015113701881" style="zoom:80%;" />

### 展开数组

现在我们有了一个多维嵌套数组，如何将其铺成一维数组？

**解决方案 1**

```js
const array = [ 1, [ 2, [ 3, [ 4, [ 5 ] ] ] ] ]
const flattenArray = (array) => {  
    return array.reduce((res, it) => {    
        return res.concat(Array.isArray(it) ? flattenArray(it) : it)  
    }, [])
}
console.log(flattenArray(array)) // [1, 2, 3, 4, 5]
```

**解决方案 2**

事实上，我们有一个更简单的方法来解决它。关于flat，我们来看看MDN的解释：

> flat() 方法创建一个新数组，其中所有子数组元素递归连接到指定深度。

```js
const array = [ 1, 2, [ 2, 3, [ 3, [ 4, [ 5 ] ] ] ] ]
console.log(array.flat(Infinity))
console.log(array.flat())
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210151139315.png" alt="image-20221015113923198" style="zoom:80%;" />



### 数组合并⭐⭐

#### 扩展运算符⭐

如果我们想组合几个数组，我们可以使用扩展运算符。

```js
const start = [1, 2] 
const end = [5, 6, 7] 
const numbers = [9, ...start, ...end, 8] // [9, 1, 2, 5, 6, 7 , 8]
console.log(numbers)
```

#### concat

> 或者使用数组的 concat()方法
>

```js
const start = [1, 2, 3, 4] 
const end = [5, 6, 7] 
start.concat(end); // [1, 2, 3, 4, 5, 6, 7]
```

> 但是，在使用concat()方法时，如果要合并的数组很大，那么，concat()函数在创建单独的新数组时会消耗大量内存。在这种情况下，可以使用以下方法来合并数组。
>

```js
Array.prototype.push.apply(start, end)
```



### 检查数组是否包含值⭐

#### indexOf

过去，我们总是使用“indexOf”方法来检查数组是否包含值。如果“indexOf”返回的值大于-1，则表示有一个。

> - indexOf()：检测当前值在**数组中第一次出现的位置索引**
> - lastIndexOf()：检测当前值在数组中**最后一次出现的位置索引**

```js
const array = [ 'fatfish', 'hello', 'world', 24 ]
console.log(array.indexOf('fatfish')) // 0
console.log(array.indexOf('medium')) // -1
```

#### findIndex

但是，现在数据比较复杂，我们将无法通过 indexOf 方法直接确认数组中是否存在“fatfish”。幸运的是，ES6 中提供了 findIndex 方法。

```js
const array = [
    {
        name: 'fatfish'
    },
    {
        name: 'hello'
    },
    {
        name: 'world'
    },
]
const index = array.findIndex((it) => it.name === 'fatfish') // 0
console.log(index) // 0
```

#### 使用“includes”方法进行判断

你一定见过这样的判断方法，虽然，可以达到条件判断的目的，但是，看起来很繁琐。

```js
const value = 'fatfish'
if (value === 'fatfish' || value === 'medium' || value === 'fe') {
    console.log('hello world') // hello world
}
```

我们可以使用includes方法让代码更简单甚至更可扩

```js
const conditions = [ 'fatfish', 'medium', 'fe' ]
const value = 'fatfish'
if (conditions.includes(value)) { 
    console.log('hello world') // hello world
}
```



### 数组条件判断⭐

#### Array.every()

every()：判断数组中**每一项都是否满足条件**

```js
var arr2 = arr.every(x => {
    return x==="张三"
})
console.log(arr2) //false
```

#### Array.some()

some()：判断数组中**是否存在满足条件的项,返回true/false**

> some() 方法测试数组中是否至少有一个元素与特定条件匹配。它与 include 方法不同，因为它需要条件或测试功能，但不需要值。如果条件满足则返回真，否则返回假。

```js
var arr2 = arr.some(x => {
    return x==="张三"
})
console.log(arr2) //true
```

```js
var b  = arr.some((item,index) =>{
    if (item === "王五") {
        console.log(index)
        return true;
    }
})
console.log(b)
```



### 数组求和、最大、最小值

```js
const array  = [5,4,7,8,9,2];
//求和
array.reduce((a,b) => a+b);
//寻找最大值
array.reduce((a,b) => a > b ? a : b);  
Math.max(...array)
//寻找最小值
array.reduce((a,b) => a < b ? a : b);  
Math.min(...array)
```



### 数组排序

> - sort()：对数组的元素进行**排序**
>
> - reverse()：对数组进行**倒序**

```js
let sort = arr.sort(); 
console.log(sort) 
let s = arr.reverse();
console.log(s) 
```

当然可以自定义排序

```js
let sort = arr.sort((v1,v2) =>{
    return v1>v2?-1:1
}); //['王五', '李四', '张强', '张三']
```



### 遍历数组

#### 方式一：reduce

reduce()：从数组的第一项开始遍历到最后一项，**返回一个最终的值**

reduceRight()：从数组的最后一项开始遍历到第一项，**返回一个最终的值**

4个参数：前一个值、当前值、项的索引和数组对象

```js
let arr1 = arr.reduce((prev,cur,index,array) => {
    return prev+cur+index
})
console.log(arr1) //张三李四1王五2张强3
```

当然可以省略参数

```js
var arr1 = arr.reduce((prev,cur) => {
    return prev+cur
})
console.log(arr1) //张三李四王五张强
```

还可以在末尾自己加上一个值拼接

```js
var arr1 = arr.reduce((prev,cur) => {
    return prev+cur
},"张飞")
console.log(arr1) //张飞张三李四王五张强
```

#### 方式二：entries

entries()、keys()、values()：**遍历数组**

它们都返回一个遍历器对象，可以用for...of循环进行遍历

区别是**keys()是对键名的遍历、values()是对键值的遍历、entries()是对键值对的遍历**

```js
//遍历索引
for (let i of arr.keys()){
    console.log(i) //0,1,2获取索引
}
//遍历值
for (let k of arr.values()){
    console.log(k) //获取数组每个值
}
//遍历索引和值
for (let [index,key] of arr.entries()){
    console.log(index,key) //获取数组每个索引和值
}
```

#### 方式三：正常遍历

forEach()：es5及以下循环**遍历数组**每一项。3个参数：**遍历的数组的项，索引、数组本身**

```js
for (let i=0; i<arr.length;i++) {
    console.log(arr[i])
}
```

### 将类数组转换为数组

可以使用以下方法将类数组转换为数组。

```js
Array.prototype.slice.call(arguments);
```

此外，还可以使用扩展运算符来实现。

```js
[...arguments]
```

### 批量修改数组元素⭐

**Array.map()**：通过调用回调函数，map() 方法循环遍历原始数组并在数组的每个元素上调用该函数。由于它是一种非变异方法，因此它会创建一个新数组并且不会更改原始数组。简而言之，当你想要转换数组中的所有值时使用它。

如果有一个客户列表，你有他们的名字，并且你想将每个客户的姓氏设置为“Smith”。

```js
const a = [1, 2, 3];
// num任意，名字随便填，代表数组内部元素
const num = a.map((num) => { return num * 2 })
const num1 = a.map((num) => { return "任硕"+num })
console.log(num)
console.log(num1)
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210151601480.png" alt="image-20221015160152366" style="zoom:80%;" />

### 逗号运算符

JavaScript 中的逗号运算符起初可能很复杂。但是，实际上，这真的很容易！例如，使用 [x,y] 总是返回正确的操作数。请参阅以下 JavaScript 片段以更好地理解：

```js
console.log([1, 2, 3, 4][1]); // 2
console.log([1, 2, 3, 4][(1, 2)]); // 3
console.log([1, 2, 3, 4][2]); // 3
```

### 检查数组是否包含相同的值

> 在某些情况下，您需要知道两个数组是否包含相同的值。此 JavaScript 代码段包含一个函数 containSameValues，它通过排序和连接两个数组并比较它们的字符串来执行此操作。

```js
const containSameValues = (arr1, arr2) =>
    arr1.sort().join(',') === arr2.sort().join(',');

console.log(containSameValues([1, 2, 3], [1, 2, 3])); // true
console.log(containSameValues([1, 2, 3], [2, 3, 4])); // false
console.log(containSameValues([1, 2, 3], [1, 2, 3, 4])); // false
```



# 数组API⭐

## every

### for检查数组元素

> 有时，您需要测试数组的每个元素是否满足指定条件。通常，我们使用 for 循环迭代所有元素并根据条件检查每个单独的元素。假设您有一个包含三个元素的数组 numbers：

```js
let numbers = [1, 3, 5];
```

以下代码检查 numbers 数组中的每个元素是否大于零：

```js
let numbers = [1, 3, 5];
let result = true;
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] <= 0) {
        result = false;
        break;
    }
}
console.log(result); // true
```

> 程序怎么运行：首先，将结果变量初始化为 true。其次，遍历 numbers 数组的元素并检查每个元素是否小于或等于零。如果是这种情况，请将结果变量设置为 false 并使用 break 语句立即终止循环。如果没有元素小于或等于零，则结果变量的值保持为true。

> 这段代码简单直接。但是，它非常冗长。JavaScript Array 类型提供了 every() 方法，该方法允许您以更短、更简洁的方式检查数组的每个元素是否通过测试。

### every测试数组元素

> 从 ES5 开始，JavaScript Array 类型提供了一个方法 every() 来测试数组中的每个元素。以下示例使用 every() 检查 numbers 数组的每个元素是否大于零：

```js
let numbers = [1, 3, 5];
let result = numbers.every(function (e) {  
    return e > 0;
});
console.log(result);
```

通过使用ES6 箭头函数，代码可以更短：

```js
let numbers = [1, 3, 5];
let result = numbers.every( e  => e > 0);
console.log(result);
```

下面的例子测试是否所有的数组元素都是偶数

```js
let numbers = [1, 3, 5];
let isEven = numbers.every(function (e) { 
    return e % 2 == 0;
});
console.log(isEven);
```

相反，以下示例测试是否所有数组元素都是奇数。

```js
let numbers = [1, 3, 5];
let isOdd = numbers.every(function (e) {   
    return Math.abs(e % 2) == 1;
});
console.log(isOdd);
```

假设您有一个具有两个属性的对象：min和max：

```js
let range = {   
    min: 0,   
    mas: 10
};
```

下面的示例测试 numbers 数组中的所有元素是否在 range 对象的 min 和 max 指定的范围内。

```js
let numbers = [1, 3, 5];
let range = {   
    min: 0,  
    max: 10
};
let isInRange = numbers.every(function (e) {   
    return e >= this.min && e <= this.max;
}, range);
```

在这个例子中，我们将 range 对象作为第二个参数传递给 every() 方法。在 callback() 函数中，我们使用 this 关键字引用范围对象。注意：空数组

如果在空数组上调用 every() 方法，该方法将始终在任何条件下返回 true。例如：

```js
let gtZero = [].every(e => e > 0); // any condition
let ltZero = [].every(e => e < 0); // any condition
console.log('gtZero:', gtZero);
console.log('ltZero:', ltZero);
```

## reduce方法⭐⭐

### 基本用法

`reduce()` 是 JavaScript 中一个很有用的数组方法，MDN 对其解释如下：

> reduce() 方法对数组中的每个元素按序执行一个 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

`reduce()` 方法的语法如下：

```
array.reduce(reducer, initialValue)
```

其中有两个参数：（1）reducer 函数，包含四个参数：

- `previousValue：`上一次调用 callbackFn 时的返回值。在第一次调用时，若指定了初始值 initialValue，其值则为 initialValue，否则为数组索引为 0 的元素 array[0]。
- `currentValue：`数组中正在处理的元素。在第一次调用时，若指定了初始值 initialValue，其值则为数组索引为 0 的元素 array[0]，否则为 array[1]。
- `currentIndex：`数组中正在处理的元素的索引。若指定了初始值 initialValue，则起始索引号为 0，否则从索引 1 起始。
- `array：`用于遍历的数组。

（2）`initialValue `可选 作为第一次调用 callback 函数时参数 previousValue 的值。若指定了初始值 initialValue，则 currentValue 则将使用数组第一个元素；否则 previousValue 将使用数组第一个元素，而 currentValue 将使用数组第二个元素。

下面是一个使用`reduce()` 求数组元素之和的例子：

```js
const arr = [0, 1, 2, 3, 4];

const calculateSum = (previousValue, currentValue) => {
    console.log('previousValue: ', previousValue);
    console.log('currentValue:', currentValue);
    return previousValue + currentValue;
};

arr.reduce(calculateSum)
```

reducer 会逐个遍历数组元素，每一步都将当前元素的值与上一步的计算结果相加（上一步的计算结果是当前元素之前所有元素的总和），直到没有更多的元素被相加。

这段代码的输出如下：

<img src="https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNfrN6EDw8olLDO7SBibJOHvDmjtLzDkW0cribia0QIloGOSPazFpa8sUWGeKVaBibtgY7eWIh0hUictwg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

其执行过程如下：

<img src="https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNfrN6EDw8olLDO7SBibJOHvoOZX0hAxH5TgAAuHhDkB2ibhgf2V3Dy4MGK5NVy1GoWonxtNgxQDwOA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

当我们给`reduce()`方法一个初始值12时：

```
arr.reduce(calculateSum, 12);
```

其执行过程如下：

<img src="https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNfrN6EDw8olLDO7SBibJOHvYwVTuye26LtoN2gF5SxkZzzMweVwLib13eH6KNvT12fMhma2fG2icBOw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

如果数组为空且未提供初始值，reduce() 方法就会抛出 TypeError：

```js
const reducer = (accumulator, currentValue) => accumulator + currentValue;

const result = [].reduce(reducer)

console.log(result)
```

输出结果如下：

<img src="https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNfrN6EDw8olLDO7SBibJOHvDasicQicttVgicqtYxY4Zze7ibUEOUksc8nibpKP8kNAaNsbhticKsbMvZlA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

### 使用技巧

#### 作为加法器和累加器

> 使用“reduce”，我们可以轻松实现多个数相加或累加的功能。

```js
// adder
const sum = (...nums) => {
    return nums.reduce((sum, num) => sum + num);
};

console.log(sum(1, 2, 3, 4, 10)); // 20

// accumulator
const accumulator = (...nums) => {
    return nums.reduce((acc, num) => acc * num);
};
console.log(accumulator(1, 2, 3)); // 6
```

#### 求数组最大最小

有多少种方法可以得到数组的最大值或最小值？

##### 1).使用 Math.max 和 Math.min

我们不得不承认，使用 Math 的 API 是最简单的方法。

```js
const array = [-1, 10, 6, 5];
const max = Math.max(...array); // 10
const min = Math.min(...array); // -1
```

##### 2).使用减少

是的，只需一行代码，你就可以实现与 Math 的 API 相同的效果。

```js
const array = [-1, 10, 6, 5];
const max = array.reduce((max, num) => (max > num ? max : num));
const min = array.reduce((min, num) => (min < num ? min : num));
```

##### 3).格式化搜索参数

获取链接上的搜索参数是我们经常要处理的事情。如何解析它们？例如:

```js
// url https://qianlongo.github.io/vue-demos/dist/index.html?name=fatfish&age=100#/home
// format the search parameters
{  
    "name": "fatfish",  
    "age": "100"
}
```

**1).正常方式**

这是大多数人使用它的方式。

```js
const parseQuery = () => {  
    const search = window.location.search;  
    let query = {}; 
    search  
        .slice(1)   
        .split("&")    
        .forEach((it) => {  
        const [key, value] = it.split("=");   
        query[key] = decodeURIComponent(value);  
    });  
    return query;
};
```

**2).使用reduce**

Reduce 实际上可以做到这一点，而且看起来更简单。

```js
const parseQuery = () => {
    const search = window.location.search;
    return search
        .replace(/(^\?)|(&$)/g, "")
        .split("&")
        .reduce((query, it) => {
            const [key, value] = it.split("=");
            query[key] = decodeURIComponent(value);
            return query;
        }, {});
};
```

它是如何工作的？

```js
// url https://qianlongo.github.io/vue-demos/dist/index.html?name=fatfish&age=100#/home
// 1. First get the search parameter
const search = window.location.search; // ?name=fatfish&age=100
// 2. Remove the beginning "?" or ending "&".
search.replace(/(^\?)|(&$)/g, "");
// ?name=fatfish&age=100 => name=fatfish&age=100
// 3. Use reduce to collect parameters
// ...
```

**4.反序列化搜索参数**

当我们要跳转到某个链接并为其添加一些搜索参数时，手动拼接的方式不是很方便。

如果要串联的参数很多，那将是一场灾难。

```js
const searchObj = {
    name: "fatfish",
    age: 100,
    // ...
};
const link = `https://medium.com/?name=${searchObj.name}&age=${searchObj.age}`;
// https://medium.com/?name=fatfish&age=100
```

幸运的是，“reduce”可以帮助我们轻松解决这个问题。

```js
const stringifySearch = (search = {}) => {
    return Object.entries(search)
        .reduce(
            (t, v) => `${t}${v[0]}=${encodeURIComponent(v[1])}&`,
            Object.keys(search).length ? "?" : ""
        )
        .replace(/&$/, "");
};
const search = stringifySearch({
    name: "fatfish",
    age: 100,
});
const link = `https://medium.com/${search}`;
console.log(link); // https://medium.com/?name=fatfish&age=100
```

#### 展平多层嵌套数组

你知道如何展平多层嵌套数组吗？

```js
const array = [1, [2, [3, [4, [5]]]]];
// expected output [ 1, 2, 3, 4, 5 ]
const flatArray = array.flat(Infinity); // [1, 2, 3, 4, 5]
```

“flat”是一个非常强大的API。而使用reduce可以实现和flat一样的功能

```js
const flat = (array) => {
    return array.reduce(
        (acc, it) => acc.concat(Array.isArray(it) ? flat(it) : it),
        []
    );
};
const array = [1, [2, [3, [4, [5]]]]];
const flatArray = flat(array); // [1, 2, 3, 4, 5]
```

#### 模拟平面特征的功能

虽然，我们已经实现了扁平化深度嵌套数组的功能，但是，如何才

```js
// Expand one layer by default
Array.prototype.flat2 = function (n = 1) {
    const len = this.length
    let count = 0
    let current = this
    if (!len || n === 0) {
        return current
    }
    // Confirm whether there are array items in current
    const hasArray = () => current.some((it) => Array.isArray(it))
    // Expand one layer after each cycle
    while (count++ < n && hasArray()) {
        current = current.reduce((result, it) => {
            result = result.concat(it)
            return result
        }, [])
    }
    return current
}
const array = [ 1, [ 2, [ 3, [ 4, [ 5 ] ] ] ] ]
// Expand one layer
console.log(array.flat()) // [ 1, 2, [ 3, [ 4, [ 5 ] ] ] ] 
console.log(array.flat2()) // [ 1, 2, [ 3, [ 4, [ 5 ] ] ] ] 
// Expand all
console.log(array.flat(Infinity))
console.log(array.flat2(Infinity))
```

太好了，我们做到了。

#### 数组去重

reduce 也很容易保持数组的唯一性。

```js
const array = [ 1, 2, 1, 2, -1, 10, 11 ]
const uniqueArray1 = [ ...new Set(array) ]
const uniqueArray2 = array.reduce((acc, it) => acc.includes(it) ? acc : [ ...acc, it ], [])
```

#### 统计数组成员的个数

可以使用`reduce`来统计数组中每个元素出现的次数：

```js
const colors = ['green', 'red', 'red', 'yellow', 'red', 'yellow', 'green', 'green'];

const colorMap = colors.reduce((previousValue, currentValue) => {
    previousValue[currentValue] >= 1 ? previousValue[currentValue]++ : 
    previousValue[currentValue] = 1;
    return previousValue;
  }, 
  {}
);

console.log(colorMap); // {green: 3, red: 3, yellow: 2}
```

#### 获取一个对象的多个属性

现在，我们来看看在工作中会遇到的一个场景。

```js
// There is an object with many properties
const obj = {  
    a: 1,  
    b: 2,  
    c: 3,  
    d: 4,  
    e: 5  
    // ...
}// We just want to get some properties above it to create a new object
const newObj = {  
    a: obj.a,  
    b: obj.b,  
    c: obj.c,  
    d: obj.d  
    // ...
}// Do you think this is too inefficient?
```

使用reduce来解决它。

```js
const getObjectKeys = (obj = {}, keys = []) => {  
    return Object.keys(obj).reduce((acc, key) => 
                                   (keys.includes(key) && (acc[key] = obj[key]), acc), {});
}
const obj = {  
    a: 1,  b: 2,  c: 3,  d: 4,  e: 5  // ...
}

const newObj = getObjectKeys(obj, [ 'a', 'b', 'c', 'd' ])
console.log(newObj)
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210191210414.png" alt="image-20221019121052313" style="zoom:80%;" />

#### 反转字符串

```js
const reverseString = (string) => { 
    return string.split("").reduceRight((acc, s) => acc + s)
}

const string = 'fatfish'
console.log(reverseString(string)) // hsiftaf
```

#### 创建管道

假设有一组简单的数学函数，这些函数允许我们增加、减少、加倍和减半：

```
function increment(input) { return input + 1;}

function decrement(input) { return input — 1; }

function double(input) { return input * 2; }

function halve(input) { return input / 2; }
```

如果想对一个值进行多次上述操作，就可以使用`reduce()`。管道是用于将某些初始值转换为最终值的函数列表的术语。我们只需将执行过程中每一步用到函数写在管道数组中即可。

```
const pipeline = [increment, double, decrement];

const result = pipeline.reduce((total, func) => {
  return func(total);
}, 5);

console.log(result) // 输出结果：11
```

#### 串行执行异步函数

有一组需要串行执行的异步函数，可以使用`reduce()`来调用执行：

```
const functions = [
  async function() { return 1; },
  async function() { return 2; },
  async function() { return 3; }
];

const res = await functions.reduce((promise, fn) => promise.then(fn), Promise.resolve());

console.log(res);  // 输出结果：3
```

这里的 res 就相当于执行了：

```
Promise.resolve().then(fn1).then(fn2).then(fn3);
```



## 数组函数

### 1、Array .of

关于奇怪的 Array 函数，众所周知，我们可以通过Array函数做以下事情。

初始化指定长度的数组；设置数组的初始值。

```js
// 1. Initialize an array of the specified length
const array1 = Array(3) // [ , , ]
// 2. Set the initial value of the array
const array2 = Array() // []
const array3 = Array(undefined) // [ undefined ]
const array4 = Array(1, 2, 3) // [ 1, 2, 3 ]
```

传递给Array函数的参数个数不一样，其作用也不一样。这常常让我感到困惑。

幸运的是，我们可以使用 Array.of 来弥补 Array 的不足。

```js
// it's not initializing an array of length 3
const array1 = Array.of(3) // [ 3 ]
const array2 = Array.of() // []
const array3 = Array.of(undefined) // [ undefined ]
const array4 = Array.of(1, 2, 3) // [ 1, 2, 3 ]
```

### **2、 Array.from**

from 方法中，我们可以通过 Array.from 方法将类数组对象、arguments 对象、NodeList 对象转换为真正的数组。

#### **1）类数组对象**

```js
const arrayLike = {  0: 'fatfish',  1: 'medium',  length: 2}
const array1 = [].slice.call(arrayLike) // ['fatfish', 'medium']
// A more convenient way
const array2 = Array.from(arrayLike) // ['fatfish', 'medium']
```

#### **2）节点列表**

```js
const domsNodeList = document.querySelectorAll('div')
const domsArray = Array.from(domsNodeList) // [ dom, dom, dom, ... ]
```

#### **3）Arguments**

```js
const logInfo = function () {  
    console.log('arguments', arguments)  
    console.log('Array.from arguments', Array.from(arguments))
}

logInfo('fatfish', 100)
logInfo('fatfish')
```

#### **4）Array.from的第二个参数**

我们可以使用 Array.from 方法，如“[].map”。

```js
const array = [ 1, 2, 3 ]
const array2 = array.map((num) => num * 2) // [2, 4, 6]
const array3 = Array.from(array, (num) => num * 2) // [2, 4, 6]
```

### 3、 includes

当满足其中一个条件时，我们经常会写这样的判断语句来做某事。

```js
const num = 1
if (num === 1 || num === 2 || num === 3 || num === 4) {  
    console.log(num) // 1
}
```

其实可以通过include方法来简化代码。

```js
const nums = [ 1, 2, 3, 4 ]
const num = 1
if (nums.includes(num)) {  
    console.log(num) // 1
}
```

### 4、使用“at方法”读取数组的尾部元素

你如何读取数组的尾部元素？是的，我们需要以“array.length-1”作为下标来读取。

```js
const array = [ 1, 2, 3, 4, 5 ]
const lastEle = array[ array.length - 1 ] // 5
// You can't read like that
const lastEle = array[ - 1 ] // undefined
```

还有其他方法吗？

是的，“at”方法将成为您的魔法。当然，您也可以读取数组中其他位置的元素。

```js
const array = [ 1, 2, 3, 4, 5 ]
const lastEle = array.at(-1) // 5
const ele1 = array.at(0) // 1
```

### 5、 flat

flat() 方法创建一个新数组，其中所有子数组元素递归连接到指定深度。

```js
const array = [ 1, [ 2, [ 3, [ 4, [ 5 ] ] ] ] ]
// The default depth is 1
const flat1 = array.flat() // [ 1, 2, [ 3, [ 4, [ 5 ] ] ] ]
const flat2 = array.flat(2) // [ 1, 2, 3, [ 4, [ 5 ] ] ]
const flatAll = array.flat(Infinity) // [ 1, 2, 3, 4, 5 ]
```

### 6、 findIndex

“findIndex() 方法返回数组中满足提供的测试函数的第一个元素的索引。否则，它返回 -1，表示没有元素通过测试。”

```js
const array = [ -1, 0, 10, 10,  20, 100 ]
const index1 = array.findIndex((num) => num < 0) // 0
const index2 = array.findIndex((num) => num >= 10) // 2
```



## 数组方法汇总

### 01、Array.map()

map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。

map() 方法按照原始数组元素顺序依次处理元素。

注意，map() 不会对空数组进行检测，它也不会改变原始数组。

```js
const list = [1, 2, 3, 4];
list.map((el) => el * 2); // [2, 4, 6, 8]
```

如果有一个数组，并且你想将数组的元素转换为数字，你可以使用 map 方法来完成。

```js
const array = ['12', '1', '3.1415', '-10.01'];
array.map(Number);  // [12, 1, 3.1415, -10.01]
```

这样，map 对数组的每个元素执行 Number 构造函数，并在遍历数组时返回结果。

### 02、Array.filter()

filter() 方法创建一个新的数组，并返回一个包含所有元素的新数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。注意：filter() 不会对空数组进行检测，它也不会改变原始数组。

```js
const list = [1, 2, 3, 4];
list.filter((el) => el % 2 === 0); // [2, 4]
```

### 03、Array.reduce()

将数组减少为单个值。函数返回的值存储在累加器中（结果/总计）。

reduce() 方法允许我们将数组“减少”为单个值。reduce() 方法有两个参数：一个回调函数和一个可选的初始值。为数组中的每个元素调用回调函数。回调函数的返回值用作“累加器”。累加器是 reduce() 返回的值。

回调函数有两个参数：累加器和当前值。当前值是回调函数当前正在处理的元素的值。

如果您提供初始值作为 reduce() 的第二个参数，则初始值将用作累加器的初始值。如果不提供初始值，则数组的第一个元素将用作累加器的初始值。

```js
const list = [1, 2, 3, 4, 5];
list.reduce((total, item) => total + item, 0); // 15
```

**利用 Array.reduce() 填充对象**

如果您曾经需要将数据数组转换为对象，您就会知道这可能有点棘手。但是，Array.reduce() 非常灵活，它的初始值可以为我们所用。我们可以通过考虑以下示例来观察此功能。假设我们有一个元素数组，它们代表杂货店购物车中的物品。

如果我们想将此数组转换为一个对象，其中键是数组中的项目，值是相应的项目数量

```js
const shoppingCart = [ 'yogurt', 'banana', 'milk', 'yogurt', 'steak', 'bread', 'bacon',
    'banana', 'banana', 'steak', 'banana', 'banana', 'banana', 'bread'];

const shoppingCartObj = shoppingCart.reduce((acc, cur) => {
    if (!acc[cur]) {
        acc[cur] = 0;
    }
    acc[cur]++;
    return acc;
}, {});

console.log(shoppingCartObj)
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208220923574.png" alt="image-20220822092346515" style="zoom:67%;" />

在上面的代码中，我们为 reduce() 方法提供了一个空对象的初始值。该对象将用作累加器的初始值。我们还定义了一个回调函数，它接受两个参数：累加器 (acc) 和当前值 (cur)。回调函数首先检查累加器对象中是否存在当前键。如果键不存在，则将其添加到累加器对象中，值为 0。否则，键的值加 1。最后，回调函数返回累加器对象。



### 04、Array.reduceRight()

对数组的每个元素执行一个你提供的reducer 函数，从而产生一个输出值（从右到左）

```js
const list = [1, 2, 3, 4, 5];
list.reduceRight((total, item) => total + item, 0); // 15
```

### 05、Array.fill()初始化填充数组

用静态值填充数组中的元素。

```js
const list = [1, 2, 3, 4, 5];
list.fill(0); // [0, 0, 0, 0, 0]
```

### 06、Array.find()

返回数组中满足提供的测试函数的第一个元素的值。否则返回未定义。

```js
list = [1, 2, 3, 4, 5];
list.find((el) => el === 3); // 3
list.find((el) => el === 6); // undefined
```

### 07、Array.indexOf()

返回可以在数组中找到给定元素的第一个索引，如果不存在则返回 -1。

```js
const list = [1, 2, 3, 4, 5];
list.indexOf(3); // 2
list.indexOf(6); // -1
```

### 08、Array.lastIndexOf()

返回可以在数组中找到给定元素的最后一个索引，如果不存在，则返回 -1。从 fromIndex 开始向后搜索数组。

```js
const list = [1, 2, 3, 4, 5];
list.lastIndexOf(3); // 2
list.lastIndexOf(3, 1); // -1
```

### 09、Array.findIndex()

返回数组中满足提供的测试函数的第一个元素的索引。否则，返回 -1

```js
const array = [5, 12, 8, 130, 44];
array.findIndex((element) => element > 13); // 3
```

### 10、Array.includes()

如果给定元素存在于数组中，则返回 true

```js
const list = [1, 2, 3, 4, 5];
list.includes(3); // true
list.includes(6); // false
```

### 11、Array.pop()

从数组中删除最后一个元素并返回该元素

```js
const list = [1, 2, 3, 4, 5];
list.pop(); // 5
list; // [1, 2, 3, 4]
```

### 12、Array.push()

将新元素追加到数组的末尾，并返回新的长度。

```js
const list = [1, 2, 3, 4, 5];
list.push(6); // 6
list; // [1, 2, 3, 4, 5, 6]
```

### 13、Array.shift()

从数组中删除第一个元素并返回该元素。

```js
const list = [1, 2, 3, 4, 5];
list.shift(); // 1
list; // [2, 3, 4, 5]
```

### 14、Array.unshift()

将新元素添加到数组的开头，并返回新长度

```js
const list = [1, 2, 3, 4, 5];
list.unshift(0); // 6
list; // [0, 1, 2, 3, 4, 5]
```

### 15、Array.splice()

通过删除或替换现有元素和/或在适当位置添加新元素来更改数组的内容。splice() 方法从数组添加/删除项目，并返回删除的项目，注意，splice() 方法会改变原始数组。

```js
const list = [1, 2, 3, 4, 5];
list.splice(1, 2); // [2, 3]
list; // [1, 4, 5]
```

### 16、Array.slice()

返回数组中被选中的元素，选择从给定的 start 参数开始的元素，并在给定的 end 参数处结束。注意，slice() 方法不会改变原始数组。

```js
list = [1, 2, 3, 4, 5];
list.slice(1, 3); // [2, 3]
list; // [1, 2, 3, 4, 5]
```

### 17、Array.join()

join() 方法将数组作为字符串返回，元素将由指定的分隔符分隔，默认分隔符是逗号 (,)。join() 方法不会改变原始数组

```js
const list = [1, 2, 3, 4, 5];
list.join(', '); // "1, 2, 3, 4, 5"
```

### 18、Array.reverse()

reverse() 方法反转数组中元素的顺序，但是reverse() 方法会改变原始数组。

```js
const list = [1, 2, 3, 4, 5];
list.reverse(); // [5, 4, 3, 2, 1]
list; // [5, 4, 3, 2, 1]
```

### 19、Array.sort()

sort() 方法对数组的项目进行排序。排序顺序可以是按字母或数字，也可以是升序（向上）或降序（向下）。默认情况下，sort() 方法将按字母和升序将值作为字符串进行排序。这适用于字符串（"Apple" 出现在 "Banana" 之前）。但是，如果数字按字符串排序，则 "25" 大于 "100" ，因为 "2" 大于 "1"。正因为如此，sort() 方法在对数字进行排序时会产生不正确的结果。我们可以通过提供“比较函数”来解决此问题。注意，sort() 方法会改变原始数组。

```js
const array = ['D', 'B', 'A', 'C'];
array.sort(); // ['A', 'B', 'C', 'D']
// OR
const array = [4, 1, 3, 2, 10];
array.sort(); // [1, 10, 2, 3, 4]
array.sort((a, b) => a - b); // [1, 2, 3, 4, 10]
```

```js
let numbers = [0, 1 , 2, 3, 10, 20, 30 ];
numbers.sort( function( a , b){
    if(a > b) return 1;
    if(a < b) return -1;
    return 0;
});

console.log(numbers);
```

```js
let numbers = [0, 1 , 2, 3, 10, 20, 30 ];
numbers.sort((a,b) => {
    if(a > b) return 1;
    if(a < b) return -1;
    return 0;
});

console.log(numbers);
```



### 20、Array.some()

some() 方法用于检测数组中的元素是否满足指定条件（函数提供），它会依次执行数组的每个元素，如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测；如果没有满足条件的元素，则返回false。

注意：some() 不会对空数组进行检测，some() 也不会改变原始数组。

```js
list = [1, 2, 3, 4, 5];
list.some((el) => el === 3); // true
list.some((el) => el === 6); // false
```

### 21、Array.every()

every() 方法用于检测数组所有元素是否都符合指定条件（通过函数提供），every() 方法使用指定函数检测数组中的所有元素，如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测；如果所有元素都满足条件，则返回 true。

注意：every() 不会对空数组进行检测，every() 也不会改变原始数组。

```js
list = [1, 2, 3, 4, 5];
list.every((el) => el === 3); // false

const list = [2, 4, 6, 8, 10];
list.every((el) => el%2 === 0); // true
```

### 22、Array.from()

从类数组或可迭代对象创建一个新数组。

```js
const range = (n) => Array.from({ length: n }, (_, i) => i + 1);
console.log(range(10)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### 23、Array.of()

array.of()函数是JavaScript中的內置函数，它使用变量作为函数的参数创建一个新的数组实例。

```js
list = Array.of(1, 2, 3, 4, 5); // [1, 2, 3, 4, 5]
```

### 24、Arr ay.isArray()

如果给定值是一个数组，则返回 true。

```js
Array.isArray([1, 2, 3, 4, 5]); // true
Array.isArray(5); // false
```

### 25、Array.at()

返回指定索引处的值。

```js
list = [1, 2, 3, 4, 5];
list.at(1); // 2
list.at(-1); // 5
list.at(-2); // 4
```

### 26、Array.copyWithin()

copyWithin() 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，但不会改变原数组的长度

```js
list = [1, 2, 3, 4, 5];
list.copyWithin(0, 3, 4); // [4, 2, 3, 4, 5]
```

注意：

第一个参数是开始复制元素的目标。

第二个参数是开始复制元素的索引。

第三个参数是停止复制元素的索引。

### 27、Array.flat()

返回一个新数组，其中所有子数组元素递归连接到指定深度。

```js
list = [1, 2, [3, 4, [5, 6]]];
list.flat(Infinity); // [1, 2, 3, 4, 5, 6]
```



### 28、Array.flatMap()

返回通过将给定的回调函数应用于数组的每个元素而形成的新数组，

```js
list = [1, 2, 3];
list.flatMap((el) => [el, el * el]); // [1, 1, 2, 4, 3, 9]
```



# 对象

在 JavaScript 中，对象是一组无序的相关属性和方法的集合，所有的事物都是对象，例如字符串、数值、数组函数等。
对象是由属性和方法组成的。

> - **属性：事物的特征，在对象中用属性来表示（常用名词）**
> - **方法：事物的行为，在对象中用方法来表示（常用动词）**

## 创建对象

### 字面量创建对象 

花括号 { } 里面包含了表达这个具体事物（对象）的属性和方法；{ } 里面采取键值对的形式表示 

- 键：相当于属性名
- 值：相当于属性值，可以是任意类型的值（数字类型、字符串类型、布尔类型，函数类型等）

```js
let star = {
    name : 'pink',
    age : 18,
    sex : '男',
    sayHi(){
        console.log('大家好啊~');
    }
};
```

### 嵌套创建

```js
const game = {
    name : 'RenShoo',
    developer: {
        name: 'Epic Games',
        founder: 'Tim Sweeney'
    }
};
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210142210992.png" alt="image-20221014221026912" style="zoom:80%;" />

### 创建空对象 

```js
// 创建空对象
let andy = {};
// 给空对象添加属性和方法
andy.name = 'pink';
andy.age = 18;
andy.sex = '男';
andy.sayHi = function(){
    console.log('大家好啊~');
}

console.log(andy)
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220117160319671.png" alt="image-20220117160319671" style="zoom:80%;" />

### 根据对象创建

```js
let star = {
    name : 'pink',
    age : 18,
    sex : '男',
    sayHi(){
        console.log('大家好啊~');
    }
};
```

```js
let star1 = Object.create(star)
console.log(star1.age)
star1.sayHi()
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210151024817.png" alt="image-20221015102442710" style="zoom:80%;" />

### 浅拷贝创建

```js
let star = {
    name : 'pink',
    age : 18,
    sex : '男',
    sayHi(){
        console.log('大家好啊~');
    }
};
let star1 = {}
const result = Object.assign(star1,star)
console.log(star1)
console.log(result)
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210151028503.png" alt="image-20221015102843390" style="zoom:80%;" />



## 访问对象

### 访问对象的属性

声明对象，并添加了若干属性后，可以使用 . 或 [] 获得对象中属性对应的值，我称之为属性访问。 简单理解就是获得对象里面的属性值。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208031441599.png" alt="image-20220803144122496" style="zoom:67%;" />

示例代码如下：

```js
console.log(star.name,star.age)     // 调用名字属性
console.log(star['name'])  // 调用名字属性
```

### 调用对象的方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208031442288.png" alt="image-20220803144204212" style="zoom:67%;" />

对象里面的方法调用：**对象.方法名()** ，注意这个方法名字后面一定加括号 

```js
star.sayHi(); // 调用 sayHi 方法,注意一定要带后面的括号
```



## 增删改查⭐⭐

> 对象本质是无序的数据集合, 操作数据无非就是 增 删 改 查 语法：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208031446487.png" alt="image-20220803144612388" style="zoom:67%;" />

### 增加属性 

也可以动态为对象添加属性，动态添加与直接定义是一样的，只是语法上更灵活。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208031450868.png" alt="image-20220803145015764" style="zoom:67%;" />

### 新增对象中的方法

也可以动态为对象添加方法，动态添加与直接定义是一样的，只是语法上更灵活

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208031452317.png" alt="image-20220803145228243" style="zoom:67%;" />

> 注：无论是属性或是方法，同一个对象中出现名称一样的，后面的会覆盖前面的。

### 检查对象是否为空

如果我们想检查对象是否为空，我们可以使用以下内容。

```js
let obj = {
    "name":"张三疯",
    "sex":"男",
    "age":128,
    "height":154
}

console.log(Object.keys(obj).length) // 4
```

> Object.keys() 方法用于获取对象的键，它将返回一个包含这些键值的数组。如果返回数组的长度为 0，则该对象必须为空。

## 解构赋值⭐

解构赋值是一种特殊的语法，它允许我们将数组或对象“解包”成一堆变量，因为有时这样更方便。

ES6 中引入的解构赋值使得将数组值和对象属性分配给不同的变量变得很容易，大多数人在 react、angular 等 javascript 框架中使用了这个特性。

```js
const student = {
    name : 'mick',
    age : 10,
    gender : 'male'
}
```

```js
/*Before ES6 : */
student.name // "mick"
student.age //10
student.gender // "male"
```

```js
/*From ES6 (using this feature) : */
const {name,age,gender} = student;
```

> 注意：在解构对象时，应该为变量使用与对应对象键相同的名称。

```js
const {name1,age,gender} = student;
name1 // undefined
/*if you want to assign different variable names, you can use key and pair*/

const {name : name1,age : age1 , gender: gender2} = student;
name1 // "mick"

/*and you can assign default values */
const {name,age,gender,score=70} = student;
score // 70
```

如果键不是那样，将分配默认值。在数组中：

```js
const num = [11,12,13,14,15,16,17,18,19];    
const [firstElement, secondElement, thirdElement] = num;    
firstElement // 11    
secondElement // 12    
thirdElement // 13

// is equivalent to:
const firstElement = num[0];
const secondElement = num[1];
let [a, b, c] = "mick"; // ["m", "i", "c"]
```

### 嵌套解构

解构是一个重要的 JavaScript 主题，之前也有详细的分享过。但是今天这个代码片段显示了简单的对象重组，仅从对象中提取两个变量。

```js
const user = {
    id: 459,
    name: 'Paul Knulst',
    age: 29,
    job: {
        role: 'Tech Lead',
    },
};

const { name, job: { role },} = user;
console.log(name); // Paul Knulst
console.log(role); // Tech Lead
```



## 数组转对象

JavaScript 有一个原生函数 Object.fromEntries，可用于将任何输入数组转换为对象。

```js
const anArray = [
    ['firstname', 'Paul'],
    ['surname', 'Knulst'],
    ['address', 'worldwide'],
    ['role', 'Senior Engineer'],
    ['followers', 'not much'],
];

const anObj = Object.fromEntries(anArray);
console.log(anObj);
// {
//     firstname: 'Paul',
//     surname: 'Knulst',
//     address: 'worldwide',
//     role: 'Senior Engineer',
//     followers: 'not much'
// }
```



## 遍历对象

### 获取键和值

> 对象有两种属性，拥有的属性是在对象本身上定义的。例如 name 和 developer 是我们游戏对象的所有属性。继承的属性是来自原型的属性。例如，toString 是所有对象的继承属性。我们可以使用 Object.keys() 实用程序获取对象的所有拥有键。

```js
const game = {
    name : 'RenShoo',
    age : 22,
    sayHello : function () {
        return 'hello'
    }
};
```

```js
// 我们可以使用 Object.keys() 实用程序获取对象的所有拥有键
console.log(Object.keys(game))
// 以类似的方式，我们可以使用 Object.values() 获取所有值
console.log(Object.values(game));
// Object.entries() 检索包含所有拥有的 [key, value] 对的数组
console.log(Object.entries(game));
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210142232453.png" alt="image-20221014223213363" style="zoom:80%;" />

### 遍历对象

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208031453008.png" alt="image-20220803145342927" style="zoom:50%;" />

- 一般不用这种方式遍历数组、主要是用来遍历对象 
- 一定记住： k 是获得对象的属性名， 对象名[k]是获得属性

for...in 语句用于对数组或者对象的属性进行循环操作。

其语法如下：

```js
for (变量 in 对象名字) {
    // 在此执行代码
}
```

简单示例

```js
let star = {
    name : 'pink',
    age : 18,
    sex : '男',
    sayHi(){
        console.log('大家好啊~');
    }
};

for (let k in star) {
    console.log(k) //这里的 k 是属性名
    console.log(star[k]) //这里的 star[k] 是属性值
}
```



## 对象属性的动态声明

在现代 javascript 中，使用动态键设置对象很简单。使用“[‘key’]”可以添加属性。

```js
// dynamic为key名，名字任意
const dynamic = 'color';
let item = {  
    brand: 'Ford',  
    [dynamic]: 'Blue'
}
console.log(item); // { brand: "Ford", color: "Blue" }
```

## 简化if else

假设我们将颜色值转换为十六进制编码的函数。

```js
function convertToHex(color) {
    if (typeof color === 'string') {
        if (color === 'slate') {
            return '#64748b'
        } else if (color === 'gray') {
            return '#6b7280'
        } else if (color === 'red') {
            return '#ef4444'
        } else if (color === 'orange') {
            return '#f97316'
        } else if (color === 'yellow') {
            return '#eab308'
        } else if (color === 'green') {
            return '#22c55e'
        } else {
            return '#ffffff'
        }
    } else {
        return '#ffffff'
    }
}
```

这个函数的目标很简单，就是传入颜色字符串，然后返回对应的十六进制。如果传入的不是字符串，或者没有传递任何内容，则返回白色的十六进制。接下来，我们开始优化这段代码。

### 避免直接使用字符串作为条件

直接使用字符串作为条件的问题在于，当我们拼错时会很尴尬。

```js
convertToHex("salte")
```

为了避免这个错误，我们可以使用常量。

```js
const Colors = {
    SLATE: 'slate',
    GRAY: 'gray',
    RED: 'red',
    YELLOW: 'yellow'
}

function convertToHex(color) {
    if (typeof color === 'string') {
        if (color === 'slate') {
            return '#64748b'
        } else if (color === 'gray') {
            return '#6b7280'
        } else if (color === 'red') {
            return '#ef4444'
        } else if (color === 'orange') {
            return '#f97316'
        } else if (color === 'yellow') {
            return '#eab308'
        } else if (color === 'green') {
            return '#22c55e'
        } else {
            return '#ffffff'
        }
    } else {
        return '#ffffff'
    }
}
```

```js
console.log(convertToHex(Colors.RED))
```

如果你使用的是TypeScript，那么，你可以直接使用枚举。

### 使用对象

其实从上面的代码中不难发现，我们可以直接将十六进制值存储在对象的值中。

```js
const Colors = {
    SLATE: '#64748b',
    GRAY: '#6b7280',
    // ...
}
function convertToHex(color) {
    if (color in Colors) {
        return Colors[color]
    } else {
        return '#ffffff'
    }
}
convertToHex(Colors.SLATE)
```

这样代码会更加简洁易读。

### 不符合预期，早点回来

另一个最佳实践是我们可以在函数顶部写出意外返回，以避免忘记返回。

```js
const Colors = {
    SLATE: '#64748b',
    GRAY: '#6b7280',
    // ...
}
function convertToHex(color) {
    if (!color in Colors) {
        return '#ffffff'
    }
    return Colors[color]
}
convertToHex(Colors.SLATE)
```

这样你甚至不需要 else。使用这个技巧，我们可以消除代码中的很多其他内容。

### 将Map与Object一起使用

使用 Map 更专业，因为它可以存储任何类型的键，并且它继承自 Map.prototype，具有更方便的方法和属性。

而且Object更方便访问属性，我们可以继续使用Object来实现枚举的作用。

```js
const ColorsEnum = {
    SLATE: 'slate',
    GRAY: 'gray',
    // ...
}
const Colors = new Map()
Colors.set(ColorsEnum.SLATE, '#64748b')
Colors.set(ColorsEnum.GRAY, '#6b7280')
// ...
Colors.set('DEFAULT', '#ffffff')
function convertToHex(color) {
    if (!Colors.has(color)) {
        return Colors.get('DEFAULT')
    }
    return Colors.get(color)
}
convertToHex(Colors.SLATE)
```

### Map也可以存储功能

假设我们存储了很多颜色，最多上千种，而且我们还需要支持后端配置，通过一定的操作过程可以得到结果。

然后我们可以使用 Map 来存储函数。

```js
return Colors.get(color)()
```



# 常用API⭐

## 内置对象

JavaScript 中的对象分为3种：**自定义对象 、内置对象、 浏览器对象**

> 前面两种对象是JS基础 内容，属于 ECMAScript；  第三个浏览器对象属于 JS 独有的， JS API 讲解内置对象就是指 JS 语言自带的一些对象，这些对象供开发者使用，并提供了一些常用的或是**最基本而必要的功能**（属性和方法），内置对象最大的优点就是帮助我们快速开发JavaScript 提供了多个内置对象：Math、 Date 、Array、String等	

## 查文档

> 查找文档：学习一个内置对象的使用，只要学会其常用成员的使用即可，我们可以通过查文档学习，可以通MDN/W3C来查询。Mozilla 开发者网络（MDN）提供了有关开放网络技术（Open Web）的信息，包括 HTML、CSS 和万维网及 HTML5 应用的 API。MDN:https://developer.mozilla.org/zh-CN/

## Math对象

> Math 对象不是构造函数，它具有数学常数和函数的属性和方法。跟数学相关的运算（求绝对值，取整、最大值等）可以使用 Math 中的成员。
>

| 属性、方法名          | 功能                                         |
| --------------------- | -------------------------------------------- |
| Math.PI               | 圆周率                                       |
| Math.floor()          | 向下取整                                     |
| Math.ceil()           | 向上取整                                     |
| Math.round()          | 四舍五入版 就近取整   注意 -3.5   结果是  -3 |
| Math.abs()            | 绝对值                                       |
| Math.max()/Math.min() | 求最大和最小值                               |
| Math.random()         | 获取范围在[0,1)内的随机值                    |

```js
<script>
  // 属性
  console.log(Math.PI)
  // 方法
  // ceil 天花板  向上取整
  console.log(Math.ceil(1.1)) // 2 
  console.log(Math.ceil(1.5)) // 2 
  console.log(Math.ceil(1.9)) // 2 
  // floor 地板  向下取整
  console.log(Math.floor(1.1))  // 1
  console.log(Math.floor(1.5))  // 1
  console.log(Math.floor(1.9))  // 1
  console.log(Math.floor('12px'))  // 1
  console.log('----------------')
  // 四舍五入 round
  console.log(Math.round(1.1))  // 1
  console.log(Math.round(1.49))  // 1
  console.log(Math.round(1.5))  // 2
  console.log(Math.round(1.9))  // 2
  console.log(Math.round(-1.1))  // -1 
  console.log(Math.round(-1.5))  // -1
  console.log(Math.round(-1.51))  // -2

  // 取整函数 parseInt(1.2)   // 1
  // 取整函数 parseInt('12px')   // 12

  console.log(Math.max(1, 2, 3, 4, 5))
  console.log(Math.min(1, 2, 3, 4, 5))
  console.log(Math.abs(-1));

  // null  类似 let obj = {}
  let obj = null 
</script>
```

注意：上面的方法使用时必须带括号，**获取指定范围内的随机整数**：

```js
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}
```

# 时间和日期⭐

Date 对象和 Math 对象不一样，Date是一个构造函数，所以使用时需要实例化后才能使用其中具体方法和属性。[JS 的日期时间还能这么搞？ 很完整，没搞完(qq.com)](https://mp.weixin.qq.com/s?__biz=MzI1NDczNTAwMA==&mid=2247544526&idx=2&sn=f9d76d70a1870699c63cc47dc3974d3c&chksm=e9c2c939deb5402f6f2173cf60e255114e7321a0eeade8d754ce22550a20c4b7446e89fa83ce&mpshare=1&scene=23&srcid=0707V2jAFLf1jOFYP07hFc5K&sharer_sharetime=1688730256459&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

## Date对象构造函数

Date对象具有多种构造函数:

> 如果没有任何参数，将返回当前日期; 
>
> 如果参数为一个数字，将数字视为毫秒值，转换为日期
>
> 如果参数为一个字符串，将字符串视为日期的字符串表示，转换为日期
>
> 还可以使用六个构造函数精确定义，并返回时间 

```js
new Date() 
new Date(milliseconds) 
new Date(datestring) 
new Date(year, month) 
new Date(year, month, day) 
new Date(year, month, day, hours) 
new Date(year, month, day, hours, minutes) 
new Date(year, month, day, hours, minutes, seconds) 
new Date(year, month, day, hours, minutes, seconds, microseconds) 
```

Date对象构造函数参数说明:

```js
milliseconds - 距离JavaScript内部定义的起始时间1970年1月1日的毫秒数 
datestring - 字符串代表的日期与时间。此字符串可以使用Date.parse()转换 
year - 四位数的年份，如果取值为0-99，则在其之上加上1900 
month - 0(代表一月)-11(代表十二月)之间的月份 
day - 1-31之间的日期 
hours - 0(代表午夜)-23之间的小时数 
minutes - 0-59之间的分钟数 
seconds - 0-59之间的秒数 
microseconds - 0-999之间的毫秒数 
```

## 获取时间戳

```js
// 实例化Date对象
let date = new Date();
// 1. 用于获取对象的原始值
console.log(date.valueOf()) //1642327885613
console.log(date.getTime()) //1642327885613

// 2. 简单写可以这么做
let now = + new Date();
console.log(now) //1642328453221

// 3. 也可以使用Number
console.log(Number(new Date()))
console.log(Number(new Date()))
```

## 时间戳转时间

我们可以接用 new Date(时间戳) 格式转化获得当前时间,比如：

```java
console.log(new Date(1472048779952))
console.log(new Date(1472048779959))
```

注意：时间戳参数必须是Number类型，如果是字符串，解析结果：Invalid Date。

## 获取年月日时分秒

```js
function getTime1() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let milli = date.getMilliseconds();
    let t = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second+':'+milli
    console.log(t) //2022-1-16 18:33:11:408
}
```

```js
function getData(n) {
   let now = new Date(n),
       y = now.getFullYear(),
       m = now.getMonth() + 1,
       d = now.getDate();
   return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " 
            + now.toTimeString().substr(0, 8);
}
getData(1642471746435) //'2022-1-18 10:09:06'
```



## 时钟案例

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301302257003.gif" alt="zz" style="zoom:80%;" />

```html
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <title>网页时钟</title>
    <script type="text/javascript">
        function displayTime() {
            //获取div元素
            let timeDiv=document.getElementById("timeDiv");
            //获取系统当前的年、月、日、小时、分钟、毫秒
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            //判断时间是否为个位数，如果时间为个位数就在时间之前补上一个“0”
            let hour = date.getHours()>=10 ? date.getHours():'0'+date.getHours();
            let minutes = date.getMinutes()>=10 ? date.getMinutes():'0'+date.getMinutes();
            let second = date.getSeconds()>=10 ? date.getSeconds():'0'+date.getSeconds();
            //将系统时间设置到div元素中
            timeDiv.innerHTML = year + "年" + month + "月" + day + "日  " + hour
                + ":" + minutes + ":" + second;
        }

        //每隔1秒调用一次displayTime函数
        function start(){
            window.setInterval("displayTime()",1000)//单位是毫秒
        }

    </script>
</head>
<!--  body onload:当整个html页面加载完成后执行此函数  -->
<body onload="start();">
<div id="timeDiv"></div>
</body>
```

## 知识普及

### 1、当前系统区域设置格式

```js
//'2022/1/18 上午10:30:30'
(new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString() 
```

### 2、普通字符串(toDateString和toTimeString)

```js
//'Tue Jan 18 2022 10:30:50 GMT+0800 (中国标准时间)'
(new Date()).toDateString() + " " + (new Date()).toTimeString() 
```

### 3、格林威治标准时间(toGMTString)

```js
(new Date()).toGMTString() //'Tue, 18 Jan 2022 02:31:10 GMT'
```

### 4、全球标准时间(toUTCString)

```js
(new Date()).toUTCString() //'Tue, 18 Jan 2022 02:31:25 GMT'
```

### 5、Date对象字符串(toString)

```js
(new Date()).toString() // 'Tue Jan 18 2022 10:31:44 GMT+0800 (中国标准时间)'
```



# 函数

## 函数的使用

### 声明函数

#### 方式一

```js
// 声明函数
function 函数名() {
    //函数体代码
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208041616280.png" alt="image-20220804161614189" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208041616591.png" alt="image-20220804161633500" style="zoom:67%;" />

- function 是声明函数的关键字,必须小写

- 由于函数一般是为了实现某个功能才定义的， 所以通常我们将函数名命名为动词，比如 getSum

#### 方式二

函数表达式方式(匿名函数）

利用函数表达式方式的写法如下： 

```js
// 这是函数表达式写法，匿名函数后面跟分号结束
var fn = function(){...}；
// 调用的方式，函数调用必须写到函数体下面
fn();
```

- 因为函数没有名字，所以也被称为匿名函数
- 这个fn 里面存储的是一个函数  
- 函数表达式方式原理跟声明变量方式是一致的
- 函数调用的代码必须写到函数体后面

### 调用函数

```js
// 调用函数
函数名();  // 通过调用函数名来执行函数体代码
```

- 调用的时候千万不要忘记添加小括号

- 口诀：函数不调用，自己不执行

  注意：声明函数本身并不会执行代码，只有调用函数时才会执行函数体代码。

### 封装函数

> - 函数的封装是把一个或者多个功能通过函数的方式封装起来，对外只提供一个简单的函数接口
>
> - 简单理解：封装类似于将电脑配件整合组装到机箱中 ( 类似快递打包）  

例子：封装计算1-100累加和

```js
// 声明函数
function getSum(){
    let sumNum = 0; // 准备一个变量，保存数字和
    for (let i = 1; i <= 100; i++) {
        sumNum += i; // 把每个数值 都累加 到变量中
    }
    console.log(sumNum);
}
// 调用函数
getSum(); //5050
```

## 函数的参数

### 函数参数语法

形参：**函数定义时设置接收调用时传入**

实参：**函数调用时传入小括号内的真实数据**

函数参数的运用：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208041619178.png" alt="image-20220804161935088" style="zoom:67%;" />

```js
// 带参数的函数声明
function 函数名(形参1, 形参2 , 形参3...) { // 可以定义任意多的参数，用逗号分隔
  // 函数体
}
// 带参数的函数调用
函数名(实参1, 实参2, 实参3...); 
```

1. 调用的时候实参值是传递给形参的
2. 形参简单理解为：不用声明的变量
3. 实参和形参的多个参数之间用逗号（,）分隔

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208041620505.png" alt="image-20220804162005381" style="zoom:67%;" />

### 函数形参和实参数量不匹配时

![](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/%E5%9B%BE%E7%89%874.png)

	注意：在JavaScript中，形参的默认值是undefined。

小结：

-  函数可以**带参数也可以不带参数**
-  声明函数的时候，**函数名括号里面的是形参，形参的默认值为undefined**
-  调用函数的时候，**函数名括号里面的是实参**
-  多个参数中间**用逗号分隔**
-  **形参的个数可以和实参个数不匹配，但是结果不可预计，我们尽量要匹配**



### 传参(重要)

函数的**形参也可以看做是一个变量**，当我们把引用类型变量传给形参时，其实是把变量在栈空间里保存的堆地址复制给了形参，**形参和实参其实保存的是同一个堆地址，所以操作的是同一个对象**。

#### 传入普通参数

```js
function f4(obj) {
    console.log(obj); //123
}

f4(123);
```

#### 传入数组

```js
function f3(obj) {
    console.log(obj); //[ '张三', '李四', '王五' ]
}
let star3 = ['张三','李四','王五']

f3(star3);
```

#### 传入对象

> 当我们使用参数列表给函数传递参数的时候，参数少一点没问题，但如果参数多，问题就更大了，因为我们必须按照参数列表的顺序传递参数。如果你使用 TypeScript 编写，那么你还需要编写使可选参数列在强制参数之后。
>

> 如果我们的函数参数比较多，可以考虑使用对象形式传参。以对象形式传递参数时，传递可选参数不需要在最后，参数的顺序也不重要。它也比参数列表更容易阅读和理解通过对象传递的内容。
>

请参阅下面的示例。

```js
function getItem(price, quantity, name, description) {
    console.log(price, quantity, name, description);
}
getItem(15, undefined, 'bananas', 'fruit')
```

以下是如何使用对象传递。

```js
function getItem(args) {
    const {price, quantity, name, description} = args
    console.log(`${name} - ${description} - ${price} - ${quantity}`)
}
getItem({
    name: 'bananas',
    price: 10,
    quantity: 1,
    description: 'fruit'
})
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208212316134.png" alt="image-20220821231103588" style="zoom:80%;" />

#### 传入数组对象

```js
function f2(obj) {
    // console.log(obj.name);
    // obj.sayHi();
    console.log(obj);
}
let star1 = [
 {  name : 'pink',
    age : 18,
    sex : '男',
    sayHi(){
        console.log('大家好啊~');
    }
 }]
f2(star1);
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220117162442014.png" alt="image-20220117162442014" style="zoom:80%;" />



## 函数的返回值

### return 语句

> 返回值：函数调用整体代表的数据；函数执行完成后可以通过return语句将指定数据返回 。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208041613917.png" alt="image-20220804161324819" style="zoom:67%;" />

```js
// 声明函数
function 函数名（）{
    ...
    return  需要返回的值；
}
// 调用函数
函数名();    // 此时调用函数就可以得到函数体内return 后面的值
```

-  在使用 return 语句时，函数会停止执行，并返回指定的值
-  如果函数没有 return ，返回的值是 undefined

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208041613958.png" alt="image-20220804161349869" style="zoom:67%;" />

### break ,continue ,return 的区别

- break ：结束当前的循环体（如 for、while）
- continue ：跳出本次循环，继续执行下次循环（如 for、while）
- return ：不仅可以退出循环，还能够返回 return 语句中的值，同时还可以结束当前的函数体内的代码

### arguments

当不确定有多少个参数传递的时候，可以用 arguments 来获取。

arguments展示形式是一个伪数组，因此可以进行遍历。伪数组具有以下特点：

- 具有 length 属性

- 按索引方式储存数据

- 不具有数组的 push , pop 等方法

  注意：在函数内部使用该对象，用此对象获取函数调用时传的实参。

arguments只是伪数组，可以使用rest参数(在ES6模块中)，它是真正的数组

```js
function fun(...args){
    console.log(args);
    console.log(arguments)
}
fun('tom',[1,2,3],{name:'Janny'});
```

运行结果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220117110742197.png" alt="image-20220117110742197" style="zoom:80%;" />



## 作用域

### 概述

通常来说，一段程序代码中所用到的名字并不总是有效和可用的，而限定这个名字的可用性的代码范围就是这 个名字的作用域。作用域的使用提高了程序逻辑的局部性，增强了程序的可靠性，减少了名字冲突。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208041122334.png" alt="image-20220804112237217" style="zoom:67%;" />

### 变量作用域

在JavaScript中，根据作用域的不同，变量可以分为

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208041124870.png" alt="image-20220804112401771" style="zoom:67%;" />

> 变量有一个坑， 特殊情况： 如果函数内部或者块级作用域内部，变量没有声明，直接赋值，也当全局变量看，但是强烈不推荐 但是有一种情况，函数内部的形参可以看做是局部变量。



## 匿名函数

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208041119995.png" alt="image-20220804111933886" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208041120504.png" alt="image-20220804112050372" style="zoom:67%;" />

## 立即执行函数

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302021740321.png" alt="image-20230202174008155" style="zoom:67%;" />

```js
(function () {console.log(1)})();
(function () {console.log(2)})();
(function () {console.log(3)})();
```

## 全局可用函数

在 JavaScript 中，可以使用新方法扩展任何对象。以下 JavaScript 片段显示了如何将 toUpperCase 函数添加到数组。

```js
Array.prototype.toUpperCase = function () {
    let i;
    for (let i = 0; i < this.length; i++) {
        this[i] = this[i].toUpperCase();
    }
    return this;
};

const myArray = ['paul', 'knulst', 'medium'];
console.log(myArray); // ['paul', 'knulst', 'medium']
console.log(myArray.toUpperCase()); // ['PAUL', 'KNULST', 'MEDIUM']
```



## 应用

### 确保变量在指定范围内

> 这个 JavaScript 函数对我来说非常有用！它检查变量是否在特定范围内，如果不在范围内，它将把它限制在最接近的最小值或最大值。

```js
const clamp = (min, max, value) => {
    if (min > max) {
        throw new Error('min cannot be greater than max');
    }
    return value < min ? min : value > max ? max : value;
};

clamp(0, 6, -5); // 0
clamp(0, 6, 20); // 6
clamp(0, 6, 3); // 3
```

### 将 24 小时制时间格式转换为 am/pm

> 使用不同的时间格式是一件痛苦的事情。这个简单的 JavaScript 片段显示了一个将任何 24 小时制时间转换为上午/下午时间的函数。

```js
const toAMPMFormat = (h) => `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? ' am.' : ' pm.'}`;

console.log(toAMPMFormat(12)); // 12 pm.
console.log(toAMPMFormat(21)); // 9 pm.
console.log(toAMPMFormat(8)); // 8 am.
console.log(toAMPMFormat(16)); // 4 pm
```

### 检查约会对象是否在周末

这个 JavaScript 片段显示了检查每个 Date 对象是否为周末是多么容易。您可以更改周数（6 和 0）并将其替换为任何其他工作日编号以检查不同的日子。

```js
const isWeekend = (date) => date.getDay() === 6 || date.getDay() === 0;

console.log(isWeekend(new Date())); // false
console.log(isWeekend(new Date('2022-10-28'))); // false
console.log(isWeekend(new Date('2022-10-29'))); // true
```

### 递归得到一个数的斐波那契

递归是每个软件开发者必须知道的概念！

此 JavaScript 片段显示了以递归方式实现的斐波那契函数。

```js
const getFibonacci = (n, memo = {}) =>
    memo[n] || (n <= 2 ? 1 : (memo[n] = getFibonacci(n - 1, memo) + getFibonacci(n - 2, memo)));

console.log(getFibonacci(4)); // 3
console.log(getFibonacci(8)); // 21
```















