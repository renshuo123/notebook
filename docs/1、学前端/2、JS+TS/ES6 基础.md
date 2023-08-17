

# 总览

[你需要知道的ES6—ES13开发技巧！](https://mp.weixin.qq.com/s?__biz=MzU2MTIyNDUwMA==&mid=2247504557&idx=1&sn=e0c0f7e75d4ec88142ad5c8af764a63a&chksm=fc7e9cf6cb0915e0edc80d275fbbfde8b827b9e97186fe984bdf38a6603aaaa607ed2591f3d3&mpshare=1&scene=23&srcid=1221dLETp8OuyEZRrwQjzO8U&sharer_sharetime=1671632161253&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212231554090.png" alt="image-20221223155440984" style="zoom:67%;" />

## 日常开发中有哪些代码用ES6去改进

1. 常用箭头函数来取代`var self = this;`的做法。
2. 常用let取代var命令。
3. 常用数组/对象的结构赋值来命名变量，结构更清晰，语义更明确，可读性更好。
4. 在长字符串多变量组合场合，用模板字符串来取代字符串累加，能取得更好地效果和阅读体验。
5. 用Class类取代传统的构造函数，来生成实例化对象。
6. 在大型应用开发中，要保持module模块化开发思维，分清模块之间的关系，常用import、export方法。



# 变量和常量

## let和const

> 在ES6中，新增了let和const关键字，其中 let 主要用来声明变量，而 const 通常用来声明常量。let、const相对于var关键字有以下特点：
>

| **特性**       | **var** | **let** | **const** |
| :------------- | :------ | :------ | :-------- |
| 变量提升       | ✔️       | ×       | ×         |
| 全局变量       | ✔️       | ×       | ×         |
| 重复声明       | ✔️       | ×       | ×         |
| 重新赋值       | ✔️       | ✔️       | ×         |
| 暂时性死区     | ×       | ✔️       | ✔️         |
| 块作用域       | ×       | ✔️       | ✔️         |
| 只声明不初始化 | ✔️       | ✔️       | ×         |

这里主要介绍其中的四点：

### 重新赋值

> const 关键字声明的变量是“不可修改”的。其实，const 保证的并不是变量的值不能改动，而是变量指向的那个内存地址不能改动。

> 对于基本类型的数据（数值、字符串、布尔值），其值就保存在变量指向的那个内存地址，因此等同于常量。但对于引用类型的数据（主要是对象和数组），变量指向数据的内存地址，保存的只是一个指针，const只能保证这个指针是不变的，至于它指向的数据结构就不可控制了。

### 块级作用域

在引入let和const之前是不存在块级作用域的说法的，这也就导致了很多问题，比如内层变量会覆盖外层的同名变量：

```js
var a = 1;
if (true) {
  var a = 2;
}

console.log(a); // 输出结果：2
```

循环变量会泄漏为全局变量：

```js
var arr = [1, 2, 3];
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i]);  // 输出结果：1  2  3
}

console.log(i); // 输出结果：3
```

而通过let和const定义的变量存在块级作用域，就不会产生上述问题：

```js
let a = 1;
if (true) {
  let a = 2;
}

console.log(a); // 输出结果：1

const arr = [1, 2, 3];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);  // 输出结果：1  2  3
}

console.log(i); // Uncaught ReferenceError: i is not defined
```

### 变量提升

我们知道，在ES6之前是存在变量提升的，所谓的变量提升就是变量可以在声明之前使用：

```js
console.log(a); // 输出结果：undefined
var a = 1;
```

变量提升的本质是JavaScript引擎在执行代码之前会对代码进行编译分析，这个阶段会将检测到的变量和函数声明添加到 JavaScript 引擎中名为 Lexical Environment 的内存中，**并赋予一个初始化值 undefined**。然后再进入代码执行阶段。所以在代码执行之前，JS 引擎就已经知道声明的变量和函数。

这种现象就不太符合我们的直觉，所以在ES6中，let和const关键字限制了变量提升，let 定义的变量添加到 Lexical Environment 后不再进行初始化为 undefined 操作，JS 引擎只会在执行到词法声明和赋值时才进行初始化。而在变量创建到真正初始化之间的时间跨度内，它们无法访问或使用，ES6 将其称之为**暂时性死区：**

```js
// 暂时性死区 开始
a = "hello";     //  Uncaught ReferenceError: Cannot access 'a' before initialization

let a;   
//  暂时性死区 结束
console.log(a);  // undefined
```

### 重复声明

在ES6之前，var关键字声明的变量对于一个作用域内变量的重复声明是没有限制的，甚至可以声明与参数同名变量，以下两个函数都不会报错：

```js
function funcA() {
  var a = 1;
  var a = 2;
}

function funcB(args) {
  var args = 1; 
}
```

而let修复了这种不严谨的设计：

```js
function funcA() {
  let a = 1;
  let a = 2;  // Uncaught SyntaxError: Identifier 'a' has already been declared
}

function funcB(args) {
  let args = 1;  // Uncaught SyntaxError: Identifier 'args' has already been declared
}
```

现在我们项目中已经完全放弃了var，而使用let来定义变量，使用const来定义常量。在ESlint开启了如下规则：

```js
"no-var": 0;
```

## BigInt

在 JavaScript 中，数值类型 Number 是 64 位浮点数，所以计算精度和表示范围都有一定限制。ES2020 新增了 BigInt 数据类型，这也是 JavaScript 引入的第八种基本类型。BigInt 可以表示任意大的整数。其语法如下：

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



## Symbol

ES6中引入了一个新的基本数据类型Symbol，表示独一无二的值。它是一种类似于字符串的数据类型，它的特点如下：

- Symbol的值是唯一的，用来解决命名冲突的问题
- Symbol值不能与其他类型数据进行运算
- Symbol定义的对象属性不能使用`for...in`遍历循环，但是可以使用`Reflect.ownKeys` 来获取对象的所有键名

### 基本语法

创建Symbol

```js
//创建Symbol
let s = Symbol();
// console.log(s, typeof s);
let s2 = Symbol('尚硅谷');
let s3 = Symbol('尚硅谷');
console.log(s2==s3); // false

//Symbol.for 创建
let s4 = Symbol.for('尚硅谷');
let s5 = Symbol.for('尚硅谷');
console.log(s4==s5); // true
```

4、Symbol.prototype.description 

概述： 获取Symbol的描述字符串；

```js
// Symbol.prototype.description
// 获取Symbol的描述字符串
// 创建Symbol
let s = Symbol("renshuo");
console.log(s.description)
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211104205959697.png" alt="image-20211104205959697" style="zoom:67%;" />



Symbol作用：给对象加上独一无二的值

我们**要往game对象里面添加方法，但是怕game对象已经存在同名方法，所以我们这时使用到了Symbol**

```js
// 方式一
let game = {
    name:'俄罗斯方块',
    up: function(){},
    down: function(){}
};

// 声明一个对象
let methods = {
    up: Symbol(),
    down: Symbol()
};
game[methods.up] = function(){
    console.log("我可以改变形状");
}
game[methods.down] = function(){
    console.log("我可以快速下降!!");
}
console.log(game);
```

方式2

```js
// 方式二
let youxi = {
    name:"狼人杀",
    [Symbol('say')]: function(){
        console.log("我可以发言")
    },
    [Symbol('zibao')]: function(){
        console.log('我可以自爆');
    }
}
console.log(youxi);
```

Symbol内置值

 概述： 除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方 法。可以称这些方法为魔术方法，因为它们会在特定的场景下自动执行；

![image-20211104162530721](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211104162530721.png)

特别的： Symbol内置值的使用，都是作为某个对象类型的属性去使用；

```js
class Person{
    static [Symbol.hasInstance](param){
        console.log(param);
        console.log("我被用来检测类型了");
        return false;
    }
}
let o = {};
console.log(o instanceof Person);
const arr = [1,2,3];
const arr2 = [4,5,6];
// 合并数组：false数组不可展开，true可展开
arr2[Symbol.isConcatSpreadable] = false;
console.log(arr.concat(arr2));
```

运行结果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211104162751580.png" alt="image-20211104162751580" style="zoom: 80%;" />

### 避免常量值重复

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

### 避免对象属性覆盖

函数 fn 需要对传入的对象参数添加一个临时属性 user，但可能该对象参数中已经有这个属性了，如果直接赋值就会覆盖之前的值。此时就可以使用 Symbol 来避免这个问题。创建一个 Symbol 数据类型的变量，然后将该变量作为对象参数的属性进行赋值和读取，这样就能避免覆盖的情况：

```js
function fn(o) { // {user: {id: xx, name: yy}}
  const s = Symbol()
  o[s] = 'zzz'
}
```

### Symbol描述

通过 Symbol() 创建符号时，可以通过参数提供字符串作为描述：

```js
let dog = Symbol("dog");  // dog 为描述 
```

在 ES2019 之前，获取一个 Symbol 值的描述需要通过 String 方法 或 toString 方法：

```js
String(dog);              // "Symbol(dog)" 
dog.toString();           // "Symbol(dog)" 
```

ES2019 补充了属性 description，用来直接访问**描述**：

```js
dog.description;  // dog
```

我们知道，Symbol 的描述只被存储在内部的 `Description` ，没有直接对外暴露，我们只有调用 Symbol 的 toString() 时才可以读取这个属性：

```js
const name = Symbol('es')
console.log(name.toString()) // Symbol(es)
console.log(name) // Symbol(es)
console.log(name === 'Symbol(es)') // false
console.log(name.toString() === 'Symbol(es)') // true
```

现在可以通过 description 方法获取 Symbol 的描述:

```js
const name = Symbol('es')
console.log(name.description) // es
name.description = "es2" // 只读属性 并不能修改描述符
console.log(name.description === 'es') // true
// 如果没有描述符 输入undefined
const s2 = Symbol()
console.log(s2.description) // undefined
```



## 数字分隔符

数字分隔符可以在数字之间创建可视化分隔符，通过 `_`下划线来分割数字，使数字更具可读性，可以放在数字内的任何地方：

```js
const money = 1_000_000_000
//等价于
const money = 1000000000
```

该新特性同样支持在八进制数中使用：

```js
const number = 0o123_456
//等价于
const number = 0o123456
```

## Number数字类型

Number.EPSILON： Number.EPSILON 是 JavaScript 表示的最小精度； EPSILON 属性的值接近于 2.2204460492503130808472633361816E-16；

二进制和八进制： ES6 提供了二进制和八进制数值的新的写法，分别用前缀 0b 和 0o 表示； 

Number.isFinite() 与 Number.isNaN() ： Number.isFinite() 用来检查一个数值是否为有限的； Number.isNaN() 用来检查一个值是否为 NaN； 

Number.parseInt() 与 Number.parseFloat()： ES6 将全局方法 parseInt 和 parseFloat，移植到 Number 对象上面，使用不变； 

Math.trunc： 用于去除一个数的小数部分，返回整数部分； 

Number.isInteger： Number.isInteger() 用来判断一个数值是否为整数；

```js
// 数值扩展
// 0. Number.EPSILON 是 JavaScript 表示的最小精度
// EPSILON 属性的值接近于 2.2204460492503130808472633361816E-16
// function equal(a, b){
// return Math.abs(a-b) < Number.EPSILON;
// }
console.log("0、Number.EPSILON 是 JavaScript 表示的最小精度");
// 箭头函数简化写法
equal = (a, b) => Math.abs(a-b) < Number.EPSILON;
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); // false
console.log(equal(0.1 + 0.2, 0.3)); // true

// 1. 二进制和八进制
console.log("1、二进制和八进制");
let b = 0b1010;
let o = 0o777;
let d = 100;
let x = 0xff;
console.log(x);

// 2. Number.isFinite 检测一个数值是否为有限数
console.log("2、Number.isFinite 检测一个数值是否为有限数");
console.log(Number.isFinite(100));
console.log(Number.isFinite(100/0));
console.log(Number.isFinite(Infinity));

// 3. Number.isNaN 检测一个数值是否为 NaN
console.log("3. Number.isNaN 检测一个数值是否为 NaN");
console.log(Number.isNaN(123));

// 4. Number.parseInt Number.parseFloat字符串转整数
console.log("4. Number.parseInt Number.parseFloat字符串转整数");
console.log(Number.parseInt('5211314love'));
console.log(Number.parseFloat('3.1415926神奇'));

// 5. Number.isInteger 判断一个数是否为整数
console.log("5. Number.isInteger 判断一个数是否为整数");
console.log(Number.isInteger(5));
console.log(Number.isInteger(2.5));

// 6. Math.trunc 将数字的小数部分抹掉
console.log("6. Math.trunc 将数字的小数部分抹掉 ");
console.log(Math.trunc(3.5));

// 7. Math.sign 判断一个数到底为正数 负数 还是零
console.log("7. Math.sign 判断一个数到底为正数 负数 还是零");
console.log(Math.sign(100));
console.log(Math.sign(0));
console.log(Math.sign(-20000));
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211104190116680.png" alt="image-20211104190116680" style="zoom:80%;" />



# 运算符

## 扩展运算符

扩展运算符：...  就像是rest参数的逆运算，将一个数组转为用逗号分隔的参数序列，对数组进行解包。

spread 扩展运算符有以下**用途**：

将数组转化为用逗号分隔的参数序列

```js
function  test(a,b,c){
    console.log(a); // 1
    console.log(b); // 2
    console.log(c); // 3
}

var arr = [1, 2, 3];
test(...arr);
```

将一个数组拼接到另一个数组：

```js
var arr1 = [1, 2, 3,4];
var arr2 = [...arr1, 4, 5, 6];
console.log(arr2);  // [1, 2, 3, 4, 4, 5, 6]
```

将字符串转为逗号分隔的数组：

```js
var str='JavaScript';
var arr= [...str];
console.log(arr); // ["J", "a", "v", "a", "S", "c", "r", "i", "p", "t"]
```

## 指数操作符

ES7 还引入了指数操作符 ，用来更为方便的进行指数计算，它与 Math.pow() 等效：

```js
Math.pow(2, 10));  // 1024
2**10;           // 1024
```

## 空值合并运算符（??）

> 在编写代码时，如果某个属性不为 null 和 undefined，那么就获取该属性，如果该属性为 null 或 undefined，则取一个默认值：
>

```js
const name = dogName ? dogName : 'default'; 
```

可以通过 || 来简化：

```js
const name =  dogName || 'default'; 
```

> 但是 || 的写法存在一定的缺陷，当 dogName 为 0 或 false 的时候也会走到 default 的逻辑。所以 ES2020 引入了 ?? 运算符。只有 ?? 左边为 null 或 undefined时才返回右边的值：
>

```js
const dogName = false; 
const name =  dogName ?? 'default';  // name = false;
```

> 将 `??` 直接与 AND（`&&`）和 OR（`||`）操作符组合使用是不可取的。
>

```js
null || undefined ?? "foo"; // 抛出 SyntaxError
true || undefined ?? "foo"; // 抛出 SyntaxError
```

> 应用场景：在处理输入框相关业务时，往往会判断输入框未输入值的场景。

```js
if(value !== null && value !== undefined && value !== ''){    
    //...
}
```

**吐槽**：ES6中新出的空值合并运算符了解过吗，要写那么多条件吗？

```js
if((value??'') !== ''){  
    //...
}
```



## 可选链操作符（?.）

在开发过程中，我们经常需要获取深层次属性，例如 system.user.addr.province.name。但在获取 name 这个属性前需要一步步的判断前面的属性是否存在，否则并会报错：

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

在使用TypeScript开发时，这个操作符可以解决很多问题。

## 逻辑赋值操作符

ES12中新增了几个逻辑赋值操作符，可以用来简化一些表达式：

```js
// 等同于 a = a || b
a ||= b;
// 等同于 c = c && d
c &&= d;
// 等同于 e = e ?? f
e ??= f;
```



# 解构赋值

> ES6中还引入了解构赋值的概念，**解构赋值遵循“模式匹配”，即只要等号两边的模式相等，左边的变量就会被赋予对应的值。不同类型数据的解构方式不同**，下面就分别来看看不同类型数据的解构方式。
>

> 平时在开发中，我主要会用到**对象的解构赋值**，比如在React中解构porps值等，使用解构赋值来获取父组件传来的值；在React Hooks中的useState使用到了数组的解构赋值；
>

## 数组解构

> 具有 Iterator 接口的数据结构，都可以采用数组形式的解构赋值。
>

```js
const [foo, [[bar], baz]] = [1, [[2], 3]];

console.log(foo, bar, baz) // 输出结果：1  2  3
```

> 这里，ES6实现了对数组的结构，并依次赋值变量foo、bar、baz。数组的解构赋值按照位置将值与变量对应。数组还可以实现不完全解构，只解构部分内容：
>

```js
const [x, y] = [1, 2, 3];   // 提取前两个值
const [, y, z] = [1, 2, 3]  // 提取后两个值
const [x, , z] = [1, 2, 3]  // 提取第一三个值
```

> 如果解构时对应的位置没有值就会将变量赋值为undefined：
>

```js
const [x, y, z] = [1, 2]; 
console.log(z）  // 输出结果：undefined
```

> 数组解构赋值可以使用rest操作符来捕获剩余项：
>

```js
const [x, ...y] = [1, 2, 3];   
console.log(x);  // 输出结果：1
console.log(y);  // 输出结果：[2, 3]
```

> 在解构时还支持使用默认值，当对应的值为undefined时才会使用默认值：
>

```js
const [x, y, z = 3] = [1, 2]; 
console.log(z）  // 输出结果：3
```

## 对象解构

> 对象的解构赋值的本质其实是先找到同名的属性，在赋值给对应的变量：
>

### 对象解构

```js
// 对象类型
const F3 = {
    name : "大哥",
    age : 22,
    sex : "男",
    xiaopin : function(){ // 常用
        console.log("我会演小品！");
    }
}
```

### 解构指定字段

```js
// ES6
let { name, age } =  F3 //注意：结构的变量必须是user中的属性
console.log(name, age) //大哥 22
```

### 剩余运算符...

```js
let { name, age, ...f } =  F3 //注意：结构的变量必须是user中的属性

console.log(f)  //{ sex: '男', xiaopin: [Function: xiaopin] }
```

### 解构完成后改名⭐

有时，您要解构的属性或变量名称与您要在代码中使用的名称不匹配。在这些情况下，您可以使用冒号 (:) 重命名变量。例如，而不是写：

```js
const person = { firstName: 'John', lastName: 'Doe' };
const first = person.firstName;
const last = person.lastName;
```

您可以使用解构使代码更简洁和语义化：

```js
const person = { firstName: 'John', lastName: 'Doe' };
const { firstName: first, lastName: last } = person;
```

### 默认值

解构还允许您在值未定义的情况下为变量分配默认值。例如，而不是写：

```js
const person = { name: 'John' };
let age = person.age || 25;
```

您可以使用解构使代码更简洁：

```js
const person = { name: 'John' };
const { age = 25 } = person;
```

### 解构函数参数

解构也可以用于函数参数。例如，而不是写：

```js
function createPerson(options) {
    const name = options.name;
    const age = options.age;
    // ...
}
createPerson({ name: 'John', age: 30 });
```

您可以使用解构使代码更简洁和语义化：

```js
function createPerson({ name, age }) {
    // ...
}

createPerson({ name: 'John', age: 30 });
```

### 解构和扩散运算符

您还可以将扩展运算符 (...) 与解构结合使用，以将数组的剩余元素或对象的剩余属性分配给变量。例如，而不是写：

```js
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...others] = numbers;
console.log(others); // [3, 4, 5]
```

您可以将扩展运算符和解构一起使用，使代码更简洁：

```js
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...others] = numbers;
console.log(others); // [3, 4, 5]
```

### 简单示例

```js
let {name, age, sex, xiaopin} = F3; // 注意解构对象这里用的是{}
let {xiaopin} = F3 //单独解构函数，常用
xiaopin()
console.log(name + age + sex + xiaopin); // 大哥22男
xiaopin(); // 此方法可以正常调用
```

### 注意事项⭐

> ES6的解构赋值虽然好用。要注意解构的对象不能为undefined、null。否则会报错，要给被解构的对象一个默认值
>

```js
const {a,b,c,d,e} = obj || {};
```





## 其他解构赋值

剩下的几种解构赋值，目前我在项目中应用的较少，来简单看一下。

### 字符串解构

字符串解构规则：只要等号右边的值不是对象或数组，就先将其转为类数组对象，在进行解构：

```js
const [a, b, c, d, e] = 'hello';
console.log(a, b, c, d, e)  // 输出结果：h e l l o
```

类数组对象有 length 属性，因此可以给这个属性进行解构赋值：

```js
let {length} = 'hello';    // 输出结果：5
```

由于字符串都是一个常量，所以我们通常是知道它的值是什么的，所以很少会使用变量的解构赋值。

解构字符串

```js
let [a, b, ...c] = 'hello';
console.log(a,b,c) //h e [ 'l', 'l', 'o' ]
```

### 数值和布尔值解构赋值

对数值和布尔值进行解构时，它们将会先被转为对象，然后再应用解构语法：

```js
let {toString: s} = 123;
s === Number.prototype.toString // 输出结果：true

let {toString: s} = true;
s === Boolean.prototype.toString // 输出结果：true
```

注意null和undefined不能转换为对象，所以如果右边是这两个值，就会报错。

### 函数参数解构赋值

> 函数参数表面上是一个数组，在传入参数的那一刻，就会被解构为x和y。
>

```js
function add([x, y]){
  return x + y;
}

add([1, 2]);   // 3
```

> 除此之外，我们还可以解构函数的返回值：
>

```js
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();
```



# 字符串

## 模板字符串

> 传统的JavaScript语言中，输出模板经常使用的是字符串拼接的形式，这样写相当繁琐，在ES6中引入了模板字符串的概念来解决以上问题。模板字符串是增强版的字符串，用反引号``来标识，他可以用来定义单行字符串，也可以定义多行字符串，或者在字符串中嵌入变量。
>

 **作用：1、能够换行、2、能够在字符串中加入js表达式和调用方法**

```js
// 1、多行字符串，能够换行
let string1 =  `Hey,
	can you stop angry now?`
console.log(string1)
// Hey,
// can you stop angry now?
```

 **能够在字符串里加上变量和js表达式**

```js
// 2、字符串插入变量和表达式。变量名写在 ${} 中，${} 中可以放入 JavaScript 表达式。
let name = "Mike"
let age = 27
let info = `My Name is ${name},I am ${age+1} years old next year.`
console.log(info)
// My Name is Mike,I am 28 years old next year.
```

**注意，函数要有返回值，不然模板字符串调用函数只能是undefine**

```js
// 3、字符串中调用函数
function f(){
    return "have fun!"
}
let string2 = `Game start,${f()}`
console.log(string2);  // Game start,have fun!
```

在平时的开发中，除了上面代码中的应用，很多地方会用到模板字符串，比如拼接一个DOM串，在Emotion/styled中定义DOM结构等，都会用到模板字符串。不过在模板字符串中定义DOM元素就不会有代码提示了。

在使用模板字符串时，需要注意以下几点：

- 如果在字符串中使用反引号，需要使用\来转义；
- 如果在多行字符串中有空格和缩进，那么它们都会被保留在输出中；
- 模板字符串中嵌入变量，需要将变量名写在${}之中；
- 模板字符串中可以放任意的表达式，也可以进行运算，以及引用对象的属性，甚至可以调用函数；
- 如果模板字符中的变量没有声明，会报错。

## 左右填充

padStart()和padEnd()方法用于补齐字符串的长度。如果某个字符串不够指定长度，会在头部或尾部补全。

`padStart()`用于头部补全。该方法有两个参数，其中第一个参数是一个数字，表示字符串补齐之后的长度；第二个参数是用来补全的字符串。

如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串：

```js
'x'.padStart(1, 'ab') // 'x'
```

如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串：

```js
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'
```

如果省略第二个参数，默认使用空格补全长度：

```js
'x'.padStart(4, 'ab') // 'a   '
```

padStart()的常见用途是为数值补全指定位数，笔者最近做的一个需求就是将返回的页数补齐为三位，比如第1页就显示为001，就可以使用该方法来操作：

```js
"1".padStart(3, '0')   // 输出结果： '001'
"15".padStart(3, '0')  // 输出结果： '015'
```

`padEnd()`用于尾部补全。该方法也是接收两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串：

```js
'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```

### 

## includes

`includes()`：该方法用于判断字符串是否包含指定的子字符串。如果找到匹配的字符串则返回 true，否则返回 false。该方法的语法如下：

```js
string.includes(searchvalue, start)
```

该方法有两个参数：

- searchvalue：必需，要查找的字符串；
- start：可选，设置从那个位置开始查找，默认为 0。

```js
let str = 'Hello world!';

str.includes('o')  // 输出结果：true
str.includes('z')  // 输出结果：false
str.includes('e', 2)  // 输出结果：false
```

## startsWith

`startsWith()`：该方法用于检测字符串**是否以指定的子字符串开始**。如果是以指定的子字符串开头返回 true，否则 false。其语法和上面的includes()方法一样。

```js
let str = 'Hello world!';

str.startsWith('Hello') // 输出结果：true
str.startsWith('Helle') // 输出结果：false
str.startsWith('wo', 6) // 输出结果：true
```

## endsWith

`endsWith()`：该方法用来判断当前字符串**是否是以指定的子字符串结尾**。如果传入的子字符串在搜索字符串的末尾则返回 true，否则将返回 false。其语法如下：

```js
string.endsWith(searchvalue, length)
```

该方法有两个参数：

- searchvalue：必需，要搜索的子字符串；
- length：设置字符串的长度，默认值为原始字符串长度 string.length。

```js
let str = 'Hello world!';

str.endsWith('!')       // 输出结果：true
str.endsWith('llo')     // 输出结果：false
str.endsWith('llo', 5)  // 输出结果：true
```

可以看到，当第二个参数设置为5时，就会从字符串的前5个字符中进行检索，所以会返回true。

## padStart

把指定字符串填充到字符串头部，返回新字符串。

str.padStart(targetLength [, padString])  `targetLength`

当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。

`padString` 可选  填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的默认值为 " "

示例

```js
'abc'.padStart(10);         // "       abc"
'abc'.padStart(10, "foo");  // "foofoofabc"
'abc'.padStart(6,"123465"); // "123abc"
'abc'.padStart(8, "0");     // "00000abc"
'abc'.padStart(1);          // "abc"
```

### 应用场景

> 日期格式化：yyyy-mm-dd的格式：
>

```js
const now = new Date()
const year = now.getFullYear()

// 月份和日期 如果是一位前面给它填充一个0
const month = (now.getMonth() + 1).toString().padStart(2, '0')
const day = (now.getDate()).toString().padStart(2, '0')
console.log(year, month, day)
console.log( `${year}-${month}-${day}` ) //输入今天的日期 2021-12-31
```

> 数字替换(手机号，银行卡号等）
>

```js
const tel = '18781268679'
const newTel = tel.slice(-4).padStart(tel.length, '*')
console.log(newTel) // *******5678
```

## padEnd

> 把指定字符串填充到字符串尾部，返回新字符串。语法同上
>

```js
'abc'.padEnd(10);          // "abc       "
'abc'.padEnd(10, "foo");   // "abcfoofoof"
'abc'.padEnd(6, "123456"); // "abc123"
'abc'.padEnd(1);           // "abc"
```

应用场景

> 在JS前端我们处理时间戳的时候单位是ms毫秒，但是，后端同学返回的时间戳则不一样是毫秒，可能只有10位，以s秒为单位。所以，我们在前端处理这个时间戳的时候，保险起见，要先做一个13位的补全，保证单位是毫秒。
>

```js
// 伪代码
console.log(new Date().getTime()) // 时间戳 13位的
timestamp = +String(timestamp).padEnd(13, '0')
```





## repeat 字符串重复n次

> repeat() 方法返回一个新字符串，表示将原字符串重复n次：
>

```js
'x'.repeat(3)     // 输出结果："xxx"
'hello'.repeat(2) // 输出结果："hellohello"
'na'.repeat(0)    // 输出结果：""
console.log("任硕".repeat(200000))
```

如果参数是小数，会向下取整：

```js
'na'.repeat(2.9) // 输出结果："nana"
```

如果参数是负数或者Infinity，会报错：

```js
'na'.repeat(Infinity)   // RangeError
'na'.repeat(-1)         // RangeError
```

如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于-0，repeat视同为 0。

```js
'na'.repeat(-0.9)   // 输出结果：""
```

如果参数是NaN，就等同于 0：

```js
'na'.repeat(NaN)    // 输出结果：""
```

如果repeat的参数是字符串，则会先转换成数字。

```js
'na'.repeat('na')   // 输出结果：""
'na'.repeat('3')    // 输出结果："nanana"
```



## trimStart() 和 trimEnd()

> 在ES10之前，JavaScript提供了trim()方法，用于移除字符串首尾空白符。在ES9中提出了trimStart()和trimEnd() 方法用于移除字符串首尾的头尾空白符，空白符包括：空格、制表符 tab、换行符等其他空白符等。
>

> trimStart() 方法的的行为与`trim()`一致，不过会返回一个**从原始字符串的开头删除了空白的新字符串**，不会修改原始字符串：
>

```js
// trimStart 和 trimEnd
let str = " zibo ";
console.log(str.trimLeft());
console.log(str.trimRight());
console.log(str.trimStart());
console.log(str.trimEnd());
```

> trimEnd() 方法的的行为与`trim()`一致，不过会返回一个**从原始字符串的结尾删除了空白的新字符串**，不会修改原始字符串：注意，这两个方法都不适用于null、undefined、Number类型。
>



## matchAll

> matchAll() 是新增的字符串方法，它返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。因为返回的是遍历器，所以通常使用for...of循环取出。
>

```js
for (const match of 'abcabc'.matchAll(/a/g)) {
    console.log(match)
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212251535004.png" alt="image-20221225153506946" style="zoom:67%;" />

> 需要注意，该方法的第一个参数是一个正则表达式对象，如果传的参数不是一个正则表达式对象，则会隐式地使用 new RegExp(obj) 将其转换为一个 RegExp 。另外，RegExp必须是设置了全局模式g的形式，否则会抛出异常 TypeError。

## replaceAll

replaceAll()方法会返回一个全新的字符串，所有符合匹配规则的字符都将被替换掉，替换规则可以是字符串或者正则表达式。

```js
let string = 'hello world, hello ES12'
string.replace(/hello/g,'hi')    // hi world, hi ES12
string.replaceAll('hello','hi')  // hi world, hi ES12
```

注意的是，replaceAll 在使用正则表达式的时候，如果非全局匹配（/g），会抛出异常：

```js
let string = 'hello world, hello ES12'
string.replaceAll(/hello/,'hi') 
// Uncaught TypeError: String.prototype.replaceAll called with a non-global
```



# 数组

## 扩展运算符在数组

拓展运算符（...）用于**取出参数对象所有可遍历属性然后拷贝到当前对象。**

 **... 扩展运算符能将数组或对象转换为逗号分隔的参数序列**；

```js
// 1、拷贝对象,对象赋值
let person1 = {name: "Amy", age: 15}
let someone = { ...person1 }
console.log(someone)  //{name: "Amy", age: 15}
```

```js
// 2、合并对象
let age = {age: 15}
let name = {name: "Amy"}
let person2 = {...age, ...name}
console.log(person2)  //{age: 15, name: "Amy"}
```

### 数组操作

```js
//声明一个数组 ...
const tfboys = ['易烊千玺', '王源', '王俊凯'];

// 声明一个函数
function chunwan() {
    console.log(arguments);
}
chunwan(...tfboys); //相当于chunwan('易烊千玺','王源','王俊凯')
```

### 数组合并

```js
//1. 数组的合并 情圣 误杀 唐探
const kuaizi = ['王太利','肖央'];
const fenghuang = ['曾毅','玲花'];

// 传统的合并方式
// const zuixuanxiaopingguo = kuaizi.concat(fenghuang);
const zuixuanxiaopingguo = [...kuaizi, ...fenghuang];
console.log(zuixuanxiaopingguo);
```

### 数组克隆

```js
//2. 数组的克隆
const sanzhihua = ['E','G','M'];
const sanyecao = [...sanzhihua];// ['E','G','M']
console.log(sanyecao);
```

### 将伪数组转为真正的数组

```js
//3. 将伪数组转为真正的数组
const divs = document.querySelectorAll('div');
const divArr = [...divs];
console.log(divArr); // arguments
```



## 根据索引获取元素

`at()` 是一个数组方法，用于**通过给定索引来获取数组元素**。当给定索引为正时，这种新方法与使用括号表示法访问具有相同的行为。当给出负整数索引时，就会从数组的最后一项开始检索：

```js
const array = [0,1,2,3,4,5];

console.log(array[array.length-1]);  // 5
console.log(array.at(-1));  // 5

console.log(array[array.lenght-2]);  // 4
console.log(array.at(-2));  // 4
```

遍历数组

```js
const array = [0,1,2,3,4,5];
for (let i = 0; i < array.length; i++) {
    console.log(array.at(i));
}
```

除了数组，字符串也可以使用`at()`方法进行索引：

```js
const str = "hello world";

console.log(str[str.length - 1]);  // d
console.log(str.at(-1));  // d
```

## 判断数组是否包含 includes

> **includes()** 方法用来判断一个数组是否包含一个指定的值，如果包含则返回 true，否则返回false。该方法不会改变原数组。其语法如下：arr.includes(searchElement, fromIndex)

该方法有两个参数：

> - searchElement：必须，需要查找的元素值。
> - fromIndex：可选，从fromIndex 索引处开始查找目标值。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜 （即使从末尾开始往前跳 fromIndex 的绝对值个索引，然后往后搜寻）。默认为 0。

```js
// includes
let arr = [1,2,3,4,5];
console.log(arr.includes(1)); //true
console.log(arr.includes(1,1)); //false，第二个参数表示索引，两个都对才正确
```

> 在 ES7 之前，通常使用 indexOf 来判断数组中是否包含某个指定值。但 indexOf 在语义上不够明确直观，同时 indexOf 内部使用 === 来判等，所以存在对 NaN 的误判，includes 则修复了这个问题：
>

```js
[1, 2, NaN].indexOf(NaN);   // -1
[1, 2, NaN].includes(NaN);  //  true
```

```js
const arr = ['es6', 'es7', 'es8']
console.log(arr.includes('es7')) // true
console.log(arr.includes('es7', 1)) // true
console.log(arr.includes('es7', 2)) // false
console.log(arr.includes("es7", -1)); // fsle
console.log(arr.includes("es7", -2)); // true
```

### 注意点

使用 `includes()`查找字符串是区分大小写的。

```js
const arr = ["es6", "es7", "es8", "a"];
console.log(arr.includes("A")); // false
```

使用 `includes()`只能判断简单类型的数据，对于复杂类型的数据，比如对象类型的数组，二维数组，这些是无法判断的.

```js
const arr = ['es6', ['es7', 'es8'], 'es9',{name:"jimmy"}]
console.log(arr.includes(["es7", "es8"])); // false
console.log(arr.includes({name:"jimmy"})); // false
```

能识别NaN，indexOf是不能识别NaN的

```js
const arr = ['es6', 'es7', NaN, 'es8']
console.log(arr.includes(NaN)) // true
console.log(arr.indexOf(NaN)) // -1
```

最后，如果只想知道某个值是否在数组中存在，而并不关心它的索引位置，建议使用includes(),如果想获取一个值在数组中的位置，那么使用indexOf方法。



## flat 多级数组展开

> 在ES2019中，flat()方法用于创建并返回一个新数组，这个新数组包含与它调用flat()的数组相同的元素，只不过其中任何本身也是数组的元素会被打平填充到返回的数组中：

```js
let newArray = arr.flat([depth])
```

`depth` 可选 指定要提取嵌套数组的结构深度，默认值为 1。

`flat()` 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组

```js
const arr1 = [0, 1, 2, [3, 4]];
console.log(arr1.flat());  // [0, 1, 2, 3, 4]

const arr2 = [0, 1, 2, [[[3, 4]]]];
console.log(arr2.flat(2));  //  [0, 1, 2, [3, 4]]

//使用 Infinity，可展开任意深度的嵌套数组
let arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// flat()方法会移除数组中的空项
var arr5 = [1, 2, , 4, 5];
arr5.flat(); // [1, 2, 4, 5]
```

> 一个部门JSON数据中，属性名是部门id，属性值是个部门成员id数组集合，现在要把有部门的成员id都提取到一个数组集合中。
>

```js
const deps = {
    '采购部':[1,2,3],
    '人事部':[5,8,12],
    '行政部':[5,14,79],
    '运输部':[3,64,105],
}
let member = [];
for (let item in deps){
    const value = deps[item];
    if(Array.isArray(value)){
        member = [...member,...value]
    }
}
member = [...new Set(member)]
console.log(member)
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202210241757218.png" alt="image-20221024175747176" style="zoom:80%;" />

**吐槽**

获取对象的全部属性值还要遍历吗？Object.values忘记了吗？还有涉及到数组的扁平化处理，为啥不用ES6提供的flat方法呢，还好这次的数组的深度最多只到2维，还要是遇到4维、5维深度的数组，是不是得循环嵌套循环来扁平化？

**改进**

```js
const deps = {
    '采购部':[1,2,3],
    '人事部':[5,8,12],
    '行政部':[5,14,79],
    '运输部':[3,64,105],
}
let member = Object.values(deps).flat(Infinity);
console.log(member)
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202210241758298.png" alt="image-20221024175859259" style="zoom:80%;" />

> 其中使用Infinity作为flat的参数，使得无需知道被扁平化的数组的维度。

**补充**：flat方法不支持IE浏览器。

## flatMap

> flatMap() 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。从方法的名字上也可以看出来它包含两部分功能一个是 map，一个是 flat（深度为1）。它与 map 和连着深度值为1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。该方法会返回一个新的数组，其中每个元素都是回调函数的结果，并且结构深度 depth 值为1。
>

```js
var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
    // 返回新数组的元素
}[, thisArg])
```

`callback` 可以生成一个新数组中的元素的函数，可以传入三个参数：

currentValue：当前正在数组中处理的元素

index：可选 数组中正在处理的当前元素的索引。

array：可选 被调用的 `map` 数组，`thisArg`可选，执行 `callback` 函数时 使用的`this` 值。

```js
const numbers = [1, 2, 3]
numbers.map(x => [x * 2]) // [[2], [4], [6]]
numbers.flatMap(x => [x * 2]) // [2, 4, 6]
```

```js
const arr3 = [1,2,3,4];
const result0 = arr3.map(item => item * 10);
console.log(result0); //[ 10, 20, 30, 40]

const result = arr3.map(item => [item * 10]);
console.log(result); //[ [ 10 ], [ 20 ], [ 30 ], [ 40 ]]

const result1 = arr3.flatMap(item => [item * 10]);
console.log(result1); //[ 10, 20, 30, 40]
```

这个示例可以简单对比下 map 和 flatMap 的区别。当然还可以看下下面的示例：

```js
let arr = ['今天天气不错', '', '早上好']

arr.map(s => s.split(''))
// [["今", "天", "天", "气", "不", "错"],[""],["早", "上", "好"]]
arr.flatMap(s => s.split(''))
// ["今", "天", "天", "气", "不", "错", "", "早", "上", "好"]
```

`flatMap` 方法与 `map` 方法和深度depth为1的 `flat` 几乎相同.

## find 列表搜索

> 在项目中，一些没分页的列表的搜索功能由前端来实现，搜索一般分为精确搜索和模糊搜索。搜索也要叫过滤，一般用filter来实现。
>

```js
const a = [1,2,3,4,5];
const result = a.filter( 
    item =>{   
        return item === 3
    }
)
```

**吐槽**如果是精确搜索不会用ES6中的find吗？性能优化懂么，find方法中找到符合条件的项，就不会继续遍历数组

```js
const a = [1,2,3,4,5];
const result = a.find( 
    item =>{  
        return item === 3  
    }
)
```



## reduce

reduce() 方法对数组中的每个元素执行一个reducer函数(升序执行)，将其结果汇总为单个返回值。其使用语法如下：

```js
arr.reduce(callback,[initialValue])
```

reduce 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，接受四个参数：初始值（或者上一次回调函数的返回值），当前元素值，当前索引，调用 reduce 的数组。

(1) `callback` （执行数组中每个值的函数，包含四个参数）

- previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
- currentValue （数组中当前被处理的元素）
- index （当前元素在数组中的索引）
- array （调用 reduce 的数组）

(2) `initialValue` （作为第一次调用 callback 的第一个参数。）

```js
let arr = [1, 2, 3, 4]
let sum = arr.reduce((prev, cur, index, arr) => {
    console.log(prev, cur, index);
    return prev + cur;
})
console.log(arr, sum);
```

输出结果如下：

```js
1 2 1
3 3 2
6 4 3
[1, 2, 3, 4] 10
```

再来加一个初始值看看：

```js
let arr = [1, 2, 3, 4]
let sum = arr.reduce((prev, cur, index, arr) => {
    console.log(prev, cur, index);
    return prev + cur;
}, 5)
console.log(arr, sum);
```

输出结果如下：

```js
5 1 0
6 2 1
8 3 2
11 4 3
[1, 2, 3, 4] 15
```

通过上面例子，可以得出结论：**如果没有提供initialValue，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供initialValue，从索引0开始。**

注意，该方法如果添加初始值，就会改变原数组，将这个初始值放在数组的最后一位。

## 数组过滤

`filter()`方法用于过滤数组，满足条件的元素会被返回。它的参数是一个回调函数，所有数组元素依次执行该函数，返回结果为true的元素会被返回。该方法会返回一个新的数组，不会改变原数组。

```js
let arr = [1, 2, 3, 4, 5]
arr.filter(item => item > 2) // 结果：[3, 4, 5]
```

可以使用`filter()`方法来移除数组中的undefined、null、NAN等值

```js
let arr = [1, undefined, 2, null, 3, false, '', 4, 0]
arr.filter(Boolean) // 结果：[1, 2, 3, 4]
```

## Array.from

Array.from 的设计初衷是快速基于其他对象创建新数组，准确来说就是从一个类似数组的可迭代对象中创建一个新的数组实例。其实，只要一个对象有迭代器，Array.from 就能把它变成一个数组（注意：该方法会返回一个的数组，不会改变原对象）。

从语法上看，Array.from 有 3 个参数：

- 类似数组的对象，必选；
- 加工函数，新生成的数组会经过该函数的加工再返回；
- this 作用域，表示加工函数执行时 this 的值。

这三个参数里面第一个参数是必选的，后两个参数都是可选的：

```js
var obj = {0: 'a', 1: 'b', 2:'c', length: 3};

Array.from(obj, function(value, index){
  console.log(value, index, this, arguments.length);
  return value.repeat(3);   //必须指定返回值，否则返回 undefined
}, obj);
```

结果如图：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNHxOM5h06kegYwXFHBbWkvwCJWWDV9ibjueFJVCbCkWUoLLjRDKgFot99OHoHn5Txkw9GsQia3pXvA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

以上结果表明，通过 Array.from 这个方法可以自定义加工函数的处理方式，从而返回想要得到的值；如果不确定返回值，则会返回 undefined，最终生成的是一个包含若干个 undefined 元素的空数组。

实际上，如果这里不指定 this，加工函数就可以是一个箭头函数。上述代码可以简写为以下形式。

```js
Array.from(obj, (value) => value.repeat(3));
//  控制台打印 (3) ["aaa", "bbb", "ccc"]
```

除了上述 obj 对象以外，拥有迭代器的对象还包括 String、Set、Map 等，`Array.from` 都可以进行处理：

```js
// String
Array.from('abc');                             // ["a", "b", "c"]
// Set
Array.from(new Set(['abc', 'def']));           // ["abc", "def"]
// Map
Array.from(new Map([[1, 'ab'], [2, 'de']]));   // [[1, 'ab'], [2, 'de']]
```

## 数组填充 fill

> 使用`fill()`方法可以向一个已有数组中插入全部或部分相同的值，开始索引用于指定开始填充的位置，它是可选的。如果不提供结束索引，则一直填充到数组末尾。如果是负值，则将从负值加上数组的长度而得到的值开始。该方法的语法如下：
>

```js
array.fill(value, start, end)
```

其参数如下：

> - value：必需。填充的值；
> - start：可选。开始填充位置；
> - end：可选。停止填充位置 (默认为 *array*.length)。

使用示例如下：

```js
const arr = [0, 0, 0, 0, 0];

// 用5填充整个数组
arr.fill(5);
console.log(arr); // [5, 5, 5, 5, 5]
arr.fill(0);      // 重置

// 用5填充索引大于等于3的元素
arr.fill(5, 3);
console.log(arr); // [0, 0, 0, 5, 5]
arr.fill(0);      // 重置

// 用5填充索引大于等于1且小于等于3的元素
arr.fill(5, 3);
console.log(arr); // [0, 5, 5, 0, 0]
arr.fill(0);      // 重置

// 用5填充索引大于等于-1的元素
arr.fill(5, -1);
console.log(arr); // [0, 0, 0, 0, 5]
arr.fill(0);      // 重置
```



# 对象

## 获取和添加对象属性值

```js
const name = obj && obj.name;
```

**吐槽**：ES6中的可选链操作符会使用么？

```js
const name = obj?.name;
```

当给对象添加属性时，如果属性名是动态变化的，该怎么处理。

```js
let obj = {};
let index = 1;
let key = `topic${index}`;obj[key] = '话题内容';
```

**吐槽** 为何要额外创建一个变量。不知道ES6中的对象属性名是可以用表达式吗？

**改进**

```js
let obj = {};
let index = 1;
obj[`topic${index}`] = '话题内容';
```



## 检查属性是否属于对象 hasOwn

在ES2022之前，可以使用 `Object.prototype.hasOwnProperty()` 来检查一个属性是否属于对象。

`Object.hasOwn` 特性是一种更简洁、更可靠的检查属性是否直接设置在对象上的方法：

```js
const example = {
  property: '123'
};

console.log(Object.prototype.hasOwnProperty.call(example, 'property')); // 老方法
console.log(Object.hasOwn(example, 'property')); // 新方法
```

## 对象数组互转

> Object.fromEntries()方法可以把**键值对列表转换为一个对象**。该方法相当于 Object.entries() 方法的逆过程。Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组，而Object.fromEntries() 方法把键值对列表转换为一个对象。

### 基本语法

```js
const object = { name: 'zhangsan', age: '22' }
const array = Object.entries(object) // 对象转数组

console.log(array)
console.log(Object.fromEntries(array)) // 数组转对象
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212251749937.png" alt="image-20221225174942847" style="zoom:80%;" />

### 使用案例

#### 案例1：Object 转换操作

```js
const obj = {
    name: 'jimmy',
    age: 18
}
const entries = Object.entries(obj)
console.log(entries) // [Array(2), Array(2)]

// ES10
const fromEntries = Object.fromEntries(entries)
console.log(fromEntries) // {name: "jimmy", age: 18}
```

#### 案例2：Map 转 Object

```js
const map = new Map()
map.set('name', 'jimmy')
map.set('age', 18)
console.log(map) // {'name' => 'jimmy', 'age' => 18}

const obj = Object.fromEntries(map)
console.log(obj)
// {name: "jimmy", age: 18}
```

#### 案例3：过滤

course表示所有课程，想请求课程分数大于80的课程组成的对象：

```js
const course = {
    math: 80,
    english: 85,
    chinese: 90
}
const res = Object.entries(course).filter(([key, val]) => val > 80)
console.log(res) // [ [ 'english', 85 ], [ 'chinese', 90 ] ]
console.log(Object.fromEntries(res)) // { english: 85, chinese: 90 }
```

#### 案例4：url的search参数转换

```js
// let url = "https://www.baidu.com?name=jimmy&age=18&height=1.88"
// queryString 为 window.location.search
const queryString = "?name=jimmy&age=18&height=1.88";
const queryParams = new URLSearchParams(queryString);
const paramObj = Object.fromEntries(queryParams);
console.log(paramObj); // { name: 'jimmy', age: '18', height: '1.88' }
```



## 对象的扩展运算符(合并、扩展、传参)⭐

在ES6中就引入了扩展运算符，但是它只能作用于数组，ES2018中的扩展运算符可以作用于对象：

### 将元素组织成对象

```js
const obj = {a: 1, b: 2, c: 3};
const {a, ...rest} = obj;
console.log(rest);    // 输出 {b: 2, c: 3}

(function({a, ...obj}) {
  console.log(obj);    // 输出 {b: 2, c: 3}
}({a: 1, b: 2, c: 3}));
```

### 将对象扩展为元素

```js
const obj = {a: 1, b: 2, c: 3};
const newObj ={...obj, d: 4};
console.log(newObj);  // 输出 {a: 1, b: 2, c: 3, d: 4}
```

### 可以用来合并对象

```js
const obj1 = {a: 1, b:2};
const obj2 = {c: 3, d:4};
const mergedObj = {...obj1, ...obj2};
console.log(mergedObj);  // 输出 {a: 1, b: 2, c: 3, d: 4}
```

```js
const skillOne = {
    q: '天音波'
}
const skillTwo = {
    w: '金钟罩'
}
const skillFour = {
    r: '猛龙摆尾',
    // 自己测试，可用
    z: '胡说八道'
}
const mangseng = {
    ...skillOne,
    ...skillTwo,
    ...skillFour
};
console.log(mangseng) //{ q: '天音波', w: '金钟罩', r: '猛龙摆尾', z: '胡说八道' }
```

概述： ES6 新增了一些 Object 对象的方法： 

1. Object.is 比较两个值是否严格相等，与『===』行为基本一致（+0 与 NaN）； 
2. Object.assign 对象的合并，将源对象的所有可枚举属性，复制到目标对象； 
3. proto、setPrototypeOf、 setPrototypeOf 可以直接设置对象的原型；

## 判断对象是否相等

```js
// Object.is 比较两个值是否严格相等，与『===』行为基本一致
// NaN与任何数值做===比较都是false，跟他自己也如此！
console.log(Object.is(120,120)); // true
// 注意下面的区别
console.log(Object.is(NaN,NaN)); //true
console.log(NaN === NaN); //false
```

## 对象合并(相同字段后面会覆盖前面)

```js
// 2. Object.assign 对象的合并，将源对象的所有可枚举属性，复制到目标对象；
const config1 = {
    host : "localhost",
    port : 3306,
    name : "root",
    pass : "root",
    test : "test" // 唯一存在
}

const config2 = {
    host : "http://zibo.com",
    port : 300300600,
    name : "root4444",
    pass : "root4444",
    test2 : "test2"
}

// 如果前边有后边没有会添加，如果前后都有，后面的会覆盖前面的
console.log(Object.assign(config1,config2));
```

## 直接设置对象的原型

```js
// 3. __proto__、setPrototypeOf、 getPrototypeOf 可以直接设置对象的原型；
const school = {
    name : "尚硅谷"
}
const cities = {
    xiaoqu : ['北京','上海','深圳']
}
// 并不建议这么做
Object.setPrototypeOf(school,cities);
console.log(Object.getPrototypeOf(school));
console.log(school);
```



## 对象的 Rest

在 ES9 新增 Object 的 Rest & Spread 方法，直接看下示例：

```js
const input = {
  a: 1,
  b: 2,
  c: 3,
}

const output = {
  ...input,
  c: 4
}

console.log(output) // {a: 1, b: 2, c: 4}
```

这块代码展示了 spread 语法，可以把 input 对象的数据都拓展到 output 对象，这个功能很实用。需要注意的是，**如果存在相同的属性名，只有最后一个会生效**。

注意点

```js
const obj = { x: { y: 10 } };
const copy1 = { ...obj };
const copy2 = { ...obj };

obj.x.y = "jimmy";
console.log(copy1, copy2); // x: {y: "jimmy"} x: {y: "jimmy"}
console.log(copy1.x === copy2.x); // → true
```

如果属性的值是一个对象的话，该对象的引用会被拷贝，而不是生成一个新的对象。

我们再来看下 `Object rest` 的示例：

```js
const input = {
  a: 1,
  b: 2,
  c: 3
}

let { a, ...rest } = input

console.log(a, rest) // 1 {b: 2, c: 3}
```

当对象 key-value 不确定的时候，把必选的 key 赋值给变量，用一个变量收敛其他可选的 key 数据，这在之前是做不到的。注意，**rest 属性必须始终出现在对象的末尾**，否则将抛出错误。

在对象的解构中，除了已经指定的属性之外，rest将会拷贝对象其他的所有可枚举属性：

```js
const obj = {foo: 1, bar: 2, baz: 3};
const {foo, ...rest} = obj;

console.log(rest); // {bar: 2, baz: 3}
```

如果用在函数参数中，rest 表示所有剩下的参数：

```js
function func({param1, ...rest}) {
    return rest;
}

console.log(func({param1:1, b:2, c:3, d:4}))  // {b: 2, c: 3, d: 4}
```

注意，在对象字面量中，rest运算符只能放在对象的最顶层，并且只能使用一次，要放在最后：

```js
const {...rest, foo} = obj; // Uncaught SyntaxError: Rest element must be last element
const {foo, ...rest1, ...rest2} = obj; // Rest element must be last element
```

## 对象分别获取键和值

> 在ES5中就引入了Object.keys方法，在ES8中引入了跟Object.keys配套的Object.values和Object.entries，作为遍历一个对象的补充手段，供for...of循环使用。它们都用来遍历对象，它会返回一个由给定对象的自身可枚举属性（不含继承的和Symbol属性）组成的数组，数组元素的排列顺序和正常循环遍历该对象时返回的顺序一致，这个三个元素返回的值分别如下：

> - Object.keys()：返回包含对象**键名**的数组；
> - Object.values()：返回包含对象**键值**的数组；
> - Object.entries()：返回包含对象**键名和键值**的数组。

```js
let obj = {
    id: 1,
    name: 'hello',
    age: 18
};
console.log(Object.keys(obj));
console.log(Object.values(obj));
console.log(Object.entries(obj));
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212251755638.png" alt="image-20221225175553541" style="zoom: 67%;" />

> - Object.keys()方法返回的数组中的值都是字符串，也就是说不是字符串的key值会转化为字符串。
> - 结果数组中的属性值都是对象本身**可枚举的属性**，不包括继承来的属性。

## 获取 & 修改对象属性描述

`Object.getOwnPropertyDescriptors()` 方法用来获取一个对象的所有自身属性的描述符。

```js
const obj = {
  name: "jimmy",
  age: 18,
};
const desc = Object.getOwnPropertyDescriptors(obj);
console.log(desc);  
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212260959581.png" alt="image-20221226095931408" style="zoom:67%;" />

上面打印结果中的

> - `value`表示当前对象的默认值
> - `writable`表示对象属性是否可以修改
> - `enumerable`表示当前这个属性是否可以出现在对象的枚举属性中
> - `configurable`表示当前对象的属性能否用delete删除

那这些对象的属性我们怎么设置和修改他们呢，我们可以使用es5的 `Object.defineProperty()`

```js
const obj = {};
Object.defineProperty(obj, "name", {
  value: "jimmy",
  writable: true,
  configurable: true,
  enumerable: true,
});

Object.defineProperty(obj, "age", {
  value: 34,
  writable: true,
  configurable: true,
  enumerable: true,
});
console.log(obj); // { name: 'jimmy', age: 34 }
```

> 接下来我们演示下，一些属性设置为false的情况
>

```js
const obj = {};
Object.defineProperty(obj, "name", {
  value: "jimmy",
  writable: false,
  configurable: false,
  enumerable: true,
});
console.log(obj); // { name: 'jimmy' }
obj.name = "chimmy";
console.log(obj); // { name: 'jimmy' }
delete obj.name
console.log(obj); // { name: 'jimmy' }
```

> 我们可以看到设置 writable: false和configurable: false,为false时，对象的name对象的值不能改变和不能被删除，打印出来还是原来的对象。
>

**设置enumerable为false时**

```js
const obj = {};
Object.defineProperty(obj, "name", {
  value: "jimmy",
  writable: true,
  configurable: true,
  enumerable: false,
});
console.log(obj); // { }
for (let key in obj) {
  console.log(key); // ""
}
```

> 当设置enumerable: false时，表示对象的属性不可被枚举，这时打印对象为空，遍历对象的键也为空。

## 声明对象简写

创建声明对象简写，注意：当属性名和变量名相同时，可以只写一个

```js
const age = 12
const name = "Amy"
// 传统，key:value形式
const person1 = {age: age, name: name}
console.log(person1)
// ES6
const person2 = {age, name}
console.log(person2) //{age: 12, name: "Amy"}
```

ES6新增了双冒号运算符，用来取代以往的bind，call,和apply。(浏览器暂不支持，Babel已经支持转码)

```js
foo::bar;
// 等同于
bar.bind(foo);

foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);
```



# 函数

## 函数默认参数

### 基本实现

在ES6之前，函数是不支持默认参数的，ES6实现了对此的支持，并且只有不传入参数时才会触发默认值：

**形参初始值 具有默认值的参数, 一般位置要靠后(潜规则)**

```js
function getPoint(x = 0, y = 0) {
  console.log(x, y);
}

getPoint(1, 2);   // 1  2
getPoint()        // 0  0 
getPoint(1)       // 1  0
```

当使用函数默认值时，需要注意以下几点：

### 函数length属性值

> 函数length属性通常用来表示函数参数的个数，当引入函数默认值之后，**length表示的就是第一个有默认值参数之前的普通参数个数：**
>

```js
const funcA = function(x, y) {};
console.log(funcA.length);  // 输出结果：2 

const funcB = function(x, y = 1) {};
console.log(funcB.length);  // 输出结果：1

const funcC = function(x = 1, y) {};
console.log(funcC.length);  // 输出结果 0 
```

## 与解构赋值结合⭐

```js
// 注意这里参数是一个对象
function connect({host="127.0.0.1", username,password, port}){
    console.log(host)
    console.log(username)
    console.log(password)
    console.log(port)
}
connect({
    host: 'atguigu.com',
    username: 'root',
    password: '123456',
    port: 3306
})
```



### 参数作域

> 当给函数的参数设置了默认值之后，参数在被初始化时将形成一个独立作用域，初始化完成后作用域消解：
>

```js
let x = 1;

function func(x, y = x) {
  console.log(y);
}

func(2);  
```

> 这里最终会打印出2。在函数调用时，参数 x, y 将形成一个独立的作用域，所以参数中的y会等于第一个参数中的x，而不是上面定义的1。



## 箭头函数

ES6中引入了箭头函数，用来简化函数的定义：

```js
const counter = (x, y) => x + y;
```

### 应用场景

箭头函数适合与 this 无关的回调. 定时器, 数组的方法回调 

箭头函数不适合与 this 有关的回调. 事件回调, 对象的方法

箭头函数提供了一种更加简洁的函数书写方式。基本语法是：`参数 => 函数体`

### 箭头函数注意点

1. 如果形参只有一个，则小括号可以省略； 
2. 函数体如果只有一条语句，则花括号可以省略，函数的返回值为该条语句的执行结果； 
3. 箭头函数 this 指向声明时所在作用域下 this 的值； 
4. 箭头函数不能作为构造函数实例化； 
5. 不能使用 arguments；

### 基本语法

```js
// 传统
var f1 = function(a){
    return a
}
console.log(f1(1))
// ES6
var f2 = a => a
console.log(f2(1))
```

 重要原则

1、当箭头函数**没有参数或者有多个参数**，要用 () 括起来。
2、当箭头函数函数体有**多行语句**，用 {} 包裹起来，表示代码块，
3、当**只有一行语句**，并且**需要返回结果**时，**可以省略 {}** , 结果会自动返回。

单行语句省略写法

```js
let f3 = (a,b) => {
    return a + b
}

console.log(f3(6,2))  // 8

// 前面代码相当于：
let f4 = (a,b) => a+b
console.log(f4(1,5)) // 6
```

无参

```js
// 传统写法：无参数
let say = function(){
    console.log("hello！");
}
say();
// ES写法2：无参数
let speak = () => console.log("hello 哈哈！");
speak();
```

一个参数

```js
// 传统写法：一个参数
var hello = function(name){
    return "hello " + name;
}
console.log(hello("訾博"));
// ES6箭头函数：一个参数,return可以不写
let hi = name => "hi " + name;
console.log(hi("訾博"));
```

多个参数

```js
// 传统写法：多个参数
var sum = function(a,b,c){
    return a + b + c;
}
console.log(sum(1,2,3));
// ES6箭头函数：多个参数
let he = (a,b,c) => a + b + c;
console.log(he(1,2,3));
```

```js
3、不能使用 arguments 变量
let fn = () => console.log(arguments);
fn(1,2,3);
报错：Uncaught ReferenceError: arguments is not defined
```





### 更加简洁

> - 如果没有参数，就直接写一个空括号即可
> - 如果只有一个参数，可以省去参数的括号
> - 如果有多个参数，用逗号分割
> - 如果函数体的返回值只有一句，可以省略大括号

```js
// 1. 不传入参数
const funcA = () => console.log('funcA');
// 等价于
const funcA = function() {
  console.log('funcA');
} 

// 2. 传入参数
const funcB = (x, y) => x + y;
// 等价于
const funcB = function(x, y) {
  return x + y;
} 

// 3. 单个参数的简化
const funcC = (x) => x;
// 对于单个参数，可以去掉 ()，简化为
const funcC = x => x;
// 等价于
const funcC = function(x) {
  return x;
}

// 4. 上述代码函数体只有单条语句，如果有多条，需要使用 {}
const funcD = (x, y) => { console.log(x, y); return x + y; }
// 等价于
const funcD = function(x, y) {
  console.log(x, y);
  return x + y;
}
```

### 不绑定 this

箭头函数不会创建自己的this， 所以它没有自己的this，它只会在自己作用域的上一层继承this。所以箭头函数中this的指向在它在定义时已经确定了，之后不会改变。

```js
var id = 'GLOBAL';
var obj = {
  id: 'OBJ',
  a: function(){
    console.log(this.id);
  },
  b: () => {
    console.log(this.id);
  }
};
obj.a();    // 'OBJ'
obj.b();    // 'GLOBAL'
new obj.a()  // undefined
new obj.b()  // Uncaught TypeError: obj.b is not a constructor
```

对象obj的方法b是使用箭头函数定义的，这个函数中的this就永远指向它定义时所处的全局执行环境中的this，即便这个函数是作为对象obj的方法调用，this依旧指向Window对象。需要注意，定义对象的大括号`{}`是无法形成一个单独的执行环境的，它依旧是处于全局执行环境中。

同样，使用call()、apply()、bind()等方法也不能改变箭头函数中this的指向：

```js
var id = 'Global';
let fun1 = () => {
    console.log(this.id)
};
fun1();                     // 'Global'
fun1.call({id: 'Obj'});     // 'Global'
fun1.apply({id: 'Obj'});    // 'Global'
fun1.bind({id: 'Obj'})();   // 'Global'
```

### 不可作为构造函数

构造函数 new 操作符的执行步骤如下：

1. 创建一个对象
2. 将构造函数的作用域赋给新对象（也就是将对象的__proto__属性指向构造函数的prototype属性）
3. 指向构造函数中的代码，构造函数中的this指向该对象（也就是为这个对象添加属性和方法）
4. 返回新的对象

实际上第二步就是将函数中的this指向该对象。但是由于箭头函数时没有自己的this的，且this指向外层的执行环境，且不能改变指向，所以不能当做构造函数使用。

### 不绑定 arguments

> 箭头函数没有自己的arguments对象。在箭头函数中访问arguments实际上获得的是它外层函数的arguments值



## 允许参数结尾带逗号

ES2017 规定函数的参数列表的结尾可以为逗号：

```js
function person( name, age, sex, ) {}
```

该特性的主要作用是方便使用git进行多人协作开发时修改同一个函数减少不必要的行变更。

## 直接打印 toString

ES2019 对函数的 toString() 方法进行了扩展，以前这个方法只会输出函数代码，但会省略注释和空格。ES2019 的 toString()则会保留注释、空格等，即输出的是原始代码：**将返回注释、空格和语法等详细信息。**

```js
function sayHi() {
    /* dog */
    console.log('wangwang');
}

console.log(sayHi.toString())  // 将输出和上面一样的原始代码
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212251741756.png" alt="image-20221225174154639" style="zoom:67%;" />

## 定义方法简写

> 省略了：function，注意：是对象内部的函数，外部函数还是要正常写function的
>

```js
// 传统
const person1 = {
    sayHi:function(){
        console.log("Hi")
    }
}
person1.sayHi();//"Hi"


// ES6，省略了：function
const person2 = {
    sayHi(){
        console.log("Hi")
    }
}
person2.sayHi()  //"Hi"，调用方法相同
```

## 生成器函数

> 概述： 生成器函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同；**一般函数开始运行，在它结束之前，不会被任何事情打断**。而在 ES6 中引入了一种叫生成器的函数形式，生成器可以在执行当中暂停自身，可以立即恢复执行，也可以过一段时间之后恢复执行，所以**生成器它不能像普通函数那样保证运行到完毕**。
>

> 还有一点是生成器在每次暂停 / 恢复 循环都提供了一个双向传递信息的功能，生成器可以返回一个值，恢复它的控制代码也可以接收一个值。
>

\* 、yield

```js
// 生成器其实就是一个特殊的函数
// 异步编程 纯回调函数 node fs ajax mongodb
// yield：函数代码的分隔符
function* gen() {
    console.log(111);
    yield '一只没有耳朵';
    console.log(222);
    yield '一只没有尾部';
    console.log(333);
    yield '真奇怪';
    console.log(444);
}
```

第一种：使用迭代器

```js
let iterator = gen();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log("遍历：");
```

运行结果

```js
111
{ value: '一只没有耳朵', done: false }
222
{ value: '一只没有尾部', done: false }
333
{ value: '真奇怪', done: false }
444
{ value: undefined, done: true }
遍历：
```

第二种：直接遍历函数

```js
//遍历
for(let v of gen()){
    console.log(v);
}
```

运行结果

```
111
一只没有耳朵
222
一只没有尾部
333
真奇怪
444
```



生成器函数的参数传递

```js
function * gen(arg){
    console.log(arg);
    let one = yield 111;
    console.log(one);
    let two = yield 222;
    console.log(two);
    let three = yield 333;
    console.log(three);
}
let iterator = gen("AAA");
console.log(iterator.next()); // 会执行yield 111;
// next()方法是可以传入参数的，传入的参数作为第一条(上一条)语句yield 111的返回结果
console.log(iterator.next("BBB")); // 会执行yield 222;
console.log(iterator.next("CCC")); // 会执行yield 333;
console.log(iterator.next("DDD")); // 继续往后走，未定义;
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211104164309685.png" alt="image-20211104164309685" style="zoom:80%;" />



生成器函数实例1

```
异步编程 文件操作 网络操作（ajax，request） 数据库操作
需求：1s后控制台输出111 再过2s后控制台输出222 再过3s后控制台输出333
```

```js
// 一种做法：回调地狱
setTimeout(()=>{
    console.log(111);
    setTimeout(()=>{
        console.log(222);
        setTimeout(()=>{
            console.log(333);
        },3000)
    },2000)
},1000)
```

```js
// 另一种做法,生成器函数
function one(){
    setTimeout(()=>{
        console.log(111);
        iterator.next(); //这个是保证函数依次执行的
    },1000)
}

function two(){
    setTimeout(()=>{
        console.log(222);
        iterator.next();
    },1000)
}

function three(){
    setTimeout(()=>{
        console.log(333);
        iterator.next();
    },1000)
}

function * gen(){
    yield one(); //函数调用放在生成器函数
    yield two();
    yield three();
}
// 调用生成器函数，当执行第一个函数自然有iterator执行下一个函数，这样依次递进执行完成
let iterator = gen();
iterator.next();
```

案例2

```js
// 模拟获取: 用户数据 订单数据 商品数据
function getUsers(){
    setTimeout(()=>{
        let data = "用户数据";
        // 第二次调用next，传入参数，作为第一个的返回值
        iterator.next(data); // 这里将data传入
    },1000);
}

function getOrders(){
    setTimeout(()=>{
        let data = "订单数据";
        iterator.next(data); // 这里将data传入
    },1000);
}

function getGoods(){
    setTimeout(()=>{
        let data = "商品数据";
        iterator.next(data); // 这里将data传入
    },1000);
}

//生成器函数
function * gen(){
    let users = yield getUsers();
    console.log(users);
    let orders = yield getOrders();
    console.log(orders);
    let goods = yield getGoods();
    console.log(goods); // 这种操作有点秀啊！
}
let iterator = gen();
iterator.next()
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211104165107871.png" alt="image-20211104165107871" style="zoom:67%;" />



# 模块化

> ES6中首次引入模块化开发规范ES Module，让Javascript首次支持原生模块化开发。ES Module把一个文件当作一个模块，每个模块有自己的独立作用域，那如何把每个模块联系起来呢？核心点就是模块的导入与导出。
>

### （1）export 导出模块

- **正常导出：**

```js
// 方式一
export var first = 'test';
export function func() {
    return true;
}

// 方式二
var first = 'test';
var second = 'test';
function func() {
    return true;
}
export {first, second, func};
```

- **as关键字:**

```js
var first = 'test';
export {first as second};
```

as关键字可以重命名暴露出的变量或方法，经过重命名后同一变量可以多次暴露出去。

- **export default**

export default会导出默认输出，即用户不需要知道模块中输出的名字，在导入的时候为其指定任意名字。

```js
// 导出
export default function () {
  console.log('foo');
}
// 导入
import customName from './export-default';
```

**注意：** 导入默认模块时不需要大括号，导出默认的变量或方法可以有名字，但是对外无效。export default只能使用一次。

### （2）import 导入模块

- **正常导入：**

```js
import {firstName, lastName, year} from './profile';
复制代码
```

导入模块位置可以是相对路径也可以是绝对路径，.js可以省略，如果不带路径只是模块名，则需要通过配置文件告诉引擎查找的位置。

- **as关键字：**

```js
import { lastName as surname } from './profile';
```

import 命令会被提升到模块头部，所以写的位置不是那么重要，但是不能使用表达式和变量来进行导入。

- **加载整个模块（无输出）**

```
import 'lodash'; //仅仅是加载而已，无法使用
```

- **加载整个模块（有输出）**

```js
import * as circle from './circle';
console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

**注意：** import * 会忽略default输出

### （3）导入导出复合用法

- **先导入后导出**

```js
export { foo, bar } from 'my_module';
// 等同于
import { foo, bar } from 'my_module';
export { foo, boo};
```

- **整体先导入再输出以及default**

```js
// 整体输出
export * from 'my_module';
// 导出default，正如前面所说，export default 其实导出的是default变量
export { default } from 'foo';
// 具名接口改default
export { es6 as default } from './someModule';
```

### （4）模块的继承

```js
export * from 'circle';
export var e = 2.71828182846;
export default function(x) {
  return Math.exp(x);
}
```

**注意：** export * 会忽略default。



# 类

> 概述： ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过 class 关键 字，可以定义类。基本上，ES6 的 class 可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做 到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已；

> 1. class 声明类； 
> 2. constructor 定义构造函数初始化；
> 3. extends 继承父类； 
> 4. super 调用父级构造方法；
> 5. static 定义静态方法和属性； 
> 6. 父类方法可以重写；

## 声明类

```js
//ES6写法
class Phone{
    // 构造方法，名字是固定的
    constructor(brand,price) {
        this.brand = brand;
        this.price = price;
    }
    // 打电话，方法必须使用该方式写
    call(){
        console.log("我可以打电话！");
    }
}
let HuaWei = new Phone("华为",5999);
HuaWei.call();
console.log(HuaWei);
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212261055651.png" alt="image-20221226105526547" style="zoom:80%;" />

## 类的静态成员

```js
// ES6写法
class Phone{
    // 静态属性
    static name = "手机";
    static change(){
        console.log("我可以改变世界！");
    }
}
let nokia = new Phone();
console.log(nokia.name);
console.log(Phone.name);
Phone.change();
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212261055271.png" alt="image-20221226105558170" style="zoom:80%;" />

## 类的继承

```js
// ES6class类继承
class Phone{
    constructor(brand,price) {
        this.brand = brand;
        this.price = price;
    }
    call(){
        console.log("我可以打电话！");
    }
}
class SmartPhone extends Phone{
    // 构造函数
    constructor(brand,price,color,size) {
        super(brand,price); // 调用父类构造函数
        this.color = color;
        this.size = size;
    }
    photo(){
        console.log("我可以拍照！");
    }
    game(){
        console.log("我可以玩游戏！");
    }
}
const chuizi = new SmartPhone("小米",1999,"黑色","5.15inch");
console.log(chuizi);
chuizi.call();
chuizi.photo();
chuizi.game();
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212261056166.png" alt="image-20221226105659059" style="zoom:80%;" />

## 子类重写父类方法

```js
// ES6class类继承
class Phone{
    constructor(brand,price) {
        this.brand = brand;
        this.price = price;
    }
    call(){
        console.log("我可以打电话！");
    }
}
class SmartPhone extends Phone{
    // 构造函数
    constructor(brand,price,color,size) {
        super(brand,price); // 调用父类构造函数
        this.color = color;
        this.size = size;
    }
    // 子类对父类方法重写
    // 直接写，直接覆盖
    // 注意：子类无法调用父类同名方法
    call(){
        console.log("我可以进行视频通话！");
    }
    photo(){
        console.log("我可以拍照！");
    }
    game(){
        console.log("我可以玩游戏！");
    }
}
const chuizi = new SmartPhone("小米",1999,"黑色","5.15inch");
console.log(chuizi);
chuizi.call();
chuizi.photo();
chuizi.game();
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212261058534.png" alt="image-20221226105820421" style="zoom:67%;" />

## 类的GET 和 SET 方法

```js
// class中的getter和setter设置
class Phone{
    get price(){
        console.log("价格属性被读取了！");
        // 返回值
        return 123;
    }
    set price(value){
        console.log("价格属性被修改了！");
    }
}
// 实例化对象
let s = new Phone();
console.log(s.price); // 返回值
s.price = 2999;
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211104185843601.png" alt="image-20211104185843601" style="zoom:80%;" />



## 类的私有属性 

概述： 私有属性外部不可访问直接；属性前面加上#号

```js
// 类的私有属性
class Person{
    // 公有属性
    name;
    // 私有属性
    #age;
    #weight;
    // 构造方法
    constructor(name, age, weight){
        this.name = name;
        this.#age = age;
        this.#weight = weight;
    }
    intro(){
        console.log(this.name);
        console.log(this.#age);
        console.log(this.#weight);
    }
}

// 实例化
const girl = new Person("小兰",18,"90kg");
console.log(girl);
// 公有属性的访问
console.log(girl.name);
// 私有属性的访问
console.log(girl.age); // undefined
// 报错Private field '#age' must be declared in an enclosing class
// console.log(girl.#age);
girl.intro();
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211104210738903.png" alt="image-20211104210738903" style="zoom: 80%;" />



# 异常

## 可选的 catch

在 ES10 之前我们都是这样捕获异常的：

```js
try {
    // tryCode
} catch (err) {
    // catchCode
}
```

在这里 err 是必须的参数，在 ES10 可以省略这个参数：

```js
try {
    console.log('Foobar')
} catch {
    console.error('Bar')
}
```

### 应用 验证参数是否为json格式

这个需求我们只需要返回true或false，并不关心catch的参数。

```js
const validJSON = json => {
    try {
        JSON.parse(json)
        return true
    } catch {
        return false
    }
}
```



## error.cause

在 ECMAScript 2022 规范中，`new Error()` 中可以指定导致它的原因：

```js
function readFiles(filePaths) {
  return filePaths.map(
    (filePath) => {
      try {
        // ···
      } catch (error) {
        throw new Error(
          `While processing ${filePath}`,
          {cause: error}
        );
      }
    });
}
```

### 



# Promise

## Promise

Promise 是 ES6 引入的异步编程的新解决方案。语法上 Promise 是一个构造函数，用来封装异步操作 并可以获取其成功或失败的结果；

> 1. 我们可以创建 Promise 的实例 const p = new Promise() 代表一个异步操作
> 2. Promise.prototype.then 方法； 
> 3. Promise.prototype.catch 方法；

多层回调函数互相嵌套，就形成了回调地狱

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212261103403.png" alt="image-20220113154146427" style="zoom: 80%;" />



### .then方法 ⭐

> - .then() 方法用来预先指定成功和失败的回调函数
> - **p.then(成功的回调函数，失败的回调函数)**
> - **p.then(result => { }, error => { })**
> - 调用 .then() 方法时，**成功的回调函数是必选的、失败的回调函数是可选的**
> - Promise 支持链式调用，从而来解决回调地狱的问题,一直.then

### Promise读取文件

安装读取文件包

```
npm install then-fs
```

直接读取文件(不保证顺序)

```js
import thenFs from 'then-fs'
//不能保证读取文件的顺序，不一定是安装写的顺序读文件
thenFs.readFile('./files/1.txt', 'utf8').then((r1) => {console.log(r1)})
thenFs.readFile('./files/2.txt', 'utf8').then((r2) => {console.log(r2)})
thenFs.readFile('./files/3.txt', 'utf8').then((r3) => {console.log(r3)})
```

用.then方式(保证顺序)

```js
import thenFs from 'then-fs'

thenFs
  .readFile('./files/1.txt', 'utf8')
  .catch((err) => {
    console.log(err.message)
  })
  .then((r1) => {
    console.log(r1)
    return thenFs.readFile('./files/2.txt', 'utf8')
  })
  .then((r2) => {
    console.log(r2)
    return thenFs.readFile('./files/3.txt', 'utf8')
  })
  .then((r3) => {
    console.log(r3)
})
```



### Promise.all方法

Promise.all() 方法会发起并行的 Promise 异步操作，等所有的异步操作全部结束后才会执行下一步的 .then  操作等待机制

```js
import thenFs from 'then-fs'

const promiseArr = [
  thenFs.readFile('./files/3.txt', 'utf8'),
  thenFs.readFile('./files/2.txt', 'utf8'),
  thenFs.readFile('./files/1.txt', 'utf8'),
]

Promise.all(promiseArr).then(result => {
  console.log(result)
})
```

```
[ '333', '222', '111' ]
```

### Promise.race方法

Promise.race() 方法会发起并行的 Promise 异步操作，只要任何一个异步操作完成，就立即执行下一步的 .then 操作（赛跑机制）

```js
import thenFs from 'then-fs'

const promiseArr = [
  thenFs.readFile('./files/3.txt', 'utf8'),
  thenFs.readFile('./files/2.txt', 'utf8'),
  thenFs.readFile('./files/1.txt', 'utf8'),
]

Promise.race(promiseArr).then(result => {
  console.log(result)
})
```

### 自己封装读文件方法

```js
import fs from 'fs'

function getFile(fpath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fpath, 'utf8', (err, dataStr) => {
      if (err) return reject(err)
      resolve(dataStr)
    })
  })
}

getFile('./files/1.txt')
  .then((r1) => {
    console.log(r1)
  })
  .catch((err) => console.log(err.message))
```

### catch方法

代码示例及相关说明：

```js
// Promise对象catch方法
const p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        // 设置p对象的状态为失败，并设置失败的值
        reject("失败啦~！");
    },1000);
})

p.catch(reason=>{
    console.warn(reason);
});
```

获取多个promise执行的结果

### Promise.allSettled 

概述： 获取多个promise执行的结果集；

```js
// Promise.allSettled
// 获取多个promise执行的结果集
// 声明两个promise对象
const p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("商品数据——1");
    },1000);
});

const p2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject("失败啦");
    },1000);
});
// 调用Promise.allSettled方法
const result = Promise.allSettled([p1,p2]);
console.log(result);
const result1 = Promise.all([p1,p2]); // 注意区别
console.log(result1);
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211104211034760.png" alt="image-20211104211034760" style="zoom: 80%;" />



## async和await

### 功能概述

> **async 和 await 两种语法结合可以让异步代码看起来像同步代码一样； 简化异步函数的写法**
>
> **async通常写在函数名前，await通常写在要进行获取的方法前**

注意事项

> - 如果在 function 中使用了 await，则 function 必须被 async 修饰
> - 在 async 方法中，第一个 await 之前的代码会同步执行，await 之后的代码会异步执行

### 介绍

我们都知道使用 Promise 能很好地解决回调地狱的问题，但如果处理流程比较复杂的话，那么整段代码将充斥着 then，语义化不明显，代码不能很好地表示执行流程，那有没有比 Promise 更优雅的异步方式呢？那就是async/await！我们一起来揭开它神秘的面撒吧！

前面添加了async的函数在执行后都会自动返回一个Promise对象:

```js
function foo() {
    return 'jimmy'
}
console.log(foo()) // 'jimmy'
```

添加async后

```js
async function foo() {
    return 'jimmy' // Promise.resolve('jimmy')
}
console.log(foo()) // Promise
foo()
```

async函数中使用await，那么await这里的代码就会变成同步的了，意思就是说只有等await后面的Promise执行完成得到结果才会继续下去，await就是等待。请看下面的示例：

```js
function timeout() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(1)
            resolve()
        }, 1000)
    })
}

// 不加async和await是2、1   加了是1、2
async function foo() {
    await timeout() 
    console.log(2)
}
foo()
```

### 使用场景

假如有这样一个使用场景：需要先请求 a 链接，等返回信息之后，再请求 b 链接的另外一个资源。下面代码展示的是使用 fetch 来实现这样的需求，fetch 被定义在 window 对象中，它返回的是一个 Promise 对象。

```js
fetch('https://blog.csdn.net/')
    .then(response => {
      console.log(response)
      return fetch('https://juejin.im/')
    })
    .then(response => {
       console.log(response)
    })
    .catch(error => {
       console.log(error)
})
```

虽然上述代码可以实现这个需求，但语义化不明显，代码不能很好地表示执行流程。基于这个原因，ES8 引入了 async/await，这是 JavaScript 异步编程的一个重大改进，提供了在不阻塞主线程的情况下使用同步代码实现异步访问资源的能力，并且使得代码逻辑更加清晰。

```js
async function foo () {
  try {
    let response1 = await fetch('https://blog.csdn.net/')
    console.log(response1)
    let response2 = await fetch('https://juejin.im/')
    console.log(response2)
  } catch (err) {
    console.error(err)
  }
}
foo()
```

通过上面代码，你会发现整个异步处理的逻辑都是使用同步代码的方式来实现的，而且还支持 try catch 来捕获异常，这感觉就在写同步代码，所以是非常符合人的线性思维的。

### async/await的缺陷

了解`Async/await`是非常有用的，但还有一些缺点需要考虑。

`Async/await` 让你的代码看起来是同步的，在某种程度上，也使得它的行为更加地同步。 `await` 关键字会阻塞其后的代码，直到promise完成，就像执行同步操作一样。它确实可以允许其他任务在此期间继续运行，但您自己的代码被阻塞。

这意味着您的代码可能会因为大量`await`的promises相继发生而变慢。每个`await`都会等待前一个完成，而你实际想要的是所有的这些promises同时开始处理（就像我们没有使用`async/await`时那样）。

有一种模式可以缓解这个问题——通过将 `Promise` 对象存储在变量中来同时开始它们，然后等待它们全部执行完毕。如果想更加深入的了解，请参考 **MDN**[1]

async 和 await 结合发送ajax请求

```js
async initArticleList() {
  //获取到数据data并改名为res  
  const { data: res } = await getArticleListAPI(this.page, this.pageSize)
  this.artlist = res
  ....
}
```

简化上面Promise读文件方法

```js
import thenFs from 'then-fs'
//注意看async写在方法前，await写在要进行调用的方法前
async function getAllFile() {
  const r1 = await thenFs.readFile('./files/1.txt', 'utf8')
  const r2 = await thenFs.readFile('./files/2.txt', 'utf8')
  const r3 = await thenFs.readFile('./files/3.txt', 'utf8')
  console.log(r1)
  console.log(r2)
  console.log(r3)
}
getAllFile()
```

### 关于异步函数的吐槽

异步函数很常见，经常是用 Promise 来实现。

```js
const fn1 = () =>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 300);
    });
}
const fn2 = () =>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2);
        }, 600);
    });
}
const fn = () =>{
    fn1().then(res1 =>{
        console.log(res1);// 1
        fn2().then(res2 =>{
            console.log(res2)
        })
    })
}
```

**吐槽**

如果这样调用异步函数，不怕形成地狱回调啊！

**改进**

```js
const fn = async () =>{
    const res1 = await fn1();
    const res2 = await fn2();
    console.log(res1);// 1
    console.log(res2);// 2
}
```

**补充**

但是要做并发请求时，还是要用到Promise.all()。

```js
const fn = () =>{
    Promise.all([fn1(),fn2()]).then(res =>{
        console.log(res);// [1,2]
    })
}
```

如果并发请求时，只要其中一个异步函数处理完成，就返回结果，要用到`Promise.race()`。



## Promise.any

Promise.any是是 ES2021 新增的特性，它接收一个 Promise 可迭代对象（例如数组），只要其中的一个 promise 成功，就返回那个已经成功的 promise 如果可迭代对象中没有一个 promise 成功（即所有的 promises 都失败/拒绝），就返回一个失败的 promise 和 AggregateError 类型的实例，它是 Error 的一个子类，用于把单一的错误集合在一起

```js
const promises = [
  Promise.reject('ERROR A'),
  Promise.reject('ERROR B'),
  Promise.resolve('result'),
]

Promise.any(promises).then((value) => {
  console.log('value: ', value)
}).catch((err) => {
  console.log('err: ', err)
})

// 输出结果：value:  result
```

如果所有传入的 promises 都失败：

```js
const promises = [
  Promise.reject('ERROR A'),
  Promise.reject('ERROR B'),
  Promise.reject('ERROR C'),
]

Promise.any(promises).then((value) => {
  console.log('value：', value)
}).catch((err) => {
  console.log('err：', err)
  console.log(err.message)
  console.log(err.name)
  console.log(err.errors)
})
```

输出结果：

```js
err：AggregateError: All promises were rejected
All promises were rejected
AggregateError
["ERROR A", "ERROR B", "ERROR C"]
```

##  Promise.finally

> ES2018 为 Promise 添加了 finally() 方法，表示无论 Promise 实例最终成功或失败都会执行的方法：**避免同样的语句需要在then()和catch()中各写一次的情况。**
>

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const one = '1';
    reject(one);
  }, 1000);
});

promise
  .then(() => console.log('success'))
  .catch(() => console.log('fail'))
  .finally(() => console.log('finally'))
```

> finally() 函数不接受参数，finally() 内部通常不知道 promise 实例的执行结果，所以通常在 finally() 方法内执行的是与 promise 状态无关的操作。

使用场景：loading

> 需要每次发送请求，都会有loading提示，请求发送完毕，就需要关闭loading提示框，不然界面就无法被点击。不管请求成功或是失败，这个loading都需要关闭掉，这时把关闭loading的代码写在finally里再合适不过了

## for await…of

`for await...of`方法被称为**异步迭代器**，该方法是主要用来遍历异步对象。

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

输出结果：异步迭代器(for-await-of)：循环等待每个Promise对象变为resolved状态才进入下一步。

for await of 环等待每个Promise对象变为resolved状态才进入下一步。所有打印的结果为 2000，100，3000

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212261020776.png" alt="image-20221226102055684" style="zoom:80%;" />

# 集合 Set & Map

## Set

ES6提供了新的数据结构Set（集合）。它类似于数组，但是成员的值都是唯一的，集合实现了iterator接口，所以可以使用扩展运算符和 for…of 进行遍历。

### 属性和方法

| **属性和方法** | **概述**                             |
| :------------- | :----------------------------------- |
| size           | 返回集合的元素个数                   |
| add            | 增加一个新的元素，返回当前的集合     |
| delete         | 删除元素，返回布尔值                 |
| has            | 检查集合中是否包含某元素，返回布尔值 |
| clear          | 清空集合，返回undefined              |

### API使用示例

```js
//创建一个空集合
let s = new Set();
//创建一个非空集合
let s1 = new Set([1,2,3,1,2,3]); // 传入的是数组，可以实现自动去重

// 1. size 返回集合的元素个数；3
console.log(s1.size);      
// 2. add 增加一个新元素，返回当前集合；{1,2,3,4}
console.log(s1.add(4));     
// 3. delete 删除元素，返回 boolean 值；true
console.log(s1.delete(1));  
// 4. has 检测集合中是否包含某个元素，返回 boolean 值；true
console.log(s1.has(2));     
// 5. clear 清空集合，返回 undefined；undefined
console.log(s1.clear());    
```

### 数组去重

由于集合中元素的唯一性，所以在实际应用中，可以使用set来实现数组去重：

```js
let arr = [1,2,3,2,1]
Array.from(new Set(arr))  // {1, 2, 3}
```

### 数组的交集并集差集

这里使用了Array.form()方法来将数组集合转化为数组。可以通过set来求两个数组的交集和并集：

```js
// 模拟求交集 
let result = [...new Set(arr)].filter(item=>new Set(arr2).has(item));

// 模拟求差集
let union = [...new Set([...arr,...arr2])];

// 差集：比如集合1和集合2求差集，就是1里面有的，2里面没的
let result1 = [...new Set(arr)].filter(item=>!(new Set(arr2).has(item)));
```

### 数组与集合的相互转化

用以下方法可以进行数组与集合的相互转化：

```js
// Set集合转化为数组
const arr = [...mySet]
const arr = Array.from(mySet)

// 数组转化为Set集合
const mySet = new Set(arr)
```

## Map

ES6提供了Map数据结构，它类似于对象，也是键值队的集合，但是它的键值的范围不限于字符串，可以是任何类型（包括对象）的值，也就是说， Object 结构提供了“ 字符串—值” 的对应， Map 结构提供了“ 值—值” 的对应， 是一种更完善的 Hash 结构实现。如果需要“ 键值对” 的数据结构， Map 比 Object 更合适。Map也实现了iterator接口，所以可以使用扩展运算符和 for…of 进行遍历。

### 属性和方法

| **属性和方法** | **概述**                            |
| :------------- | :---------------------------------- |
| size           | 返回Map的元素个数                   |
| set            | 增加一个新的元素，返回当前的Map     |
| get            | 返回键名对象的键值                  |
| has            | 检查Map中是否包含某元素，返回布尔值 |
| clear          | 清空Map，返回undefined              |

### API 使用示例

```js
//创建一个空 map
let m = new Map();
//创建一个非空 map
let m2 = new Map([
 ['name', 'hello'],
]);
//获取映射元素的个数
console.log(m2.size);          // 1
//添加映射值
console.log(m2.set('age', 6)); // {"name" => "hello", "age" => 6}
//获取映射值
console.log(m2.get('age'));    // 6
//检测是否有该映射
console.log(m2.has('age'));    // true
//清除
console.log(m2.clear());       // undefined
```

```js
// Map集合
// 创建一个空 map
let m = new Map();

// 创建一个非空 map
let m2 = new Map([
    ['name','尚硅谷'],
    ['slogon','不断提高行业标准']
]);

// 1. size 返回 Map 的元素个数；
console.log(m2.size);

// 2. set 增加一个新元素，返回当前 Map；
m.set("皇帝","大哥");
m.set("丞相","二哥");
console.log(m);

// 3. get 返回键名对象的键值；
console.log(m.get("皇帝"));

// 4. has 检测 Map 中是否包含某个元素，返回 boolean 值；
console.log(m.has("皇帝"));

// 5. clear 清空集合，返回 undefined；
m.clear();
console.log(m);
```



### 注意事项

需要注意， 只有对同一个对象的引用， Map 结构才将其视为同一个键：

```js
let map = new Map(); 
map.set(['a'], 555); 
map.get(['a']) // undefined
```

上面代码的set和get方法， 表面是针对同一个键， 但实际上这是两个值， 内存地址是不一样的， 因此get方法无法读取该键， 所以会返回undefined。

由上可知， Map 的键实际上是跟内存地址绑定的， 只要内存地址不一样， 就视为两个键。这就解决了同名属性碰撞（ clash） 的问题，在扩展库时， 如果使用对象作为键名， 就不用担心自己的属性与原来的属性同名。

如果 Map 的键是一个简单类型的值（ 数字、 字符串、 布尔值）， 则只要两个值严格相等， Map 将其视为一个键， 包括0和 - 0。另外， 虽然NaN不严格相等于自身， 但 Map 将其视为同一个键。

```js
let map = new Map(); 
map.set(NaN, 123); 
map.get(NaN) // 123 
map.set(-0, 123); 
map.get(+0) // 123 
```



# 其他

## globalThis

在以前，从不同的 JavaScript 环境中获取全局对象需要不同的语句。在 Web 中，可以通过 `window`、`self` 取到全局对象，在 Node.js 中，它们都无法获取，必须使用 `global`。

在松散模式下，可以在函数中返回 `this` 来获取全局对象，但是在严格模式和模块环境下，`this` 会返回 `undefined`。

以前想要获取全局对象，可通过一个全局函数

```js
const getGlobal = () => {
    if (typeof self !== 'undefined') {
        return self
    }
    if (typeof window !== 'undefined') {
        return window
    }
    if (typeof global !== 'undefined') {
        return global
    }
    throw new Error('无法找到全局对象')
}

const globals = getGlobal()
console.log(globals)
```

现在`globalThis` 提供了一个标准的方式来获取不同环境下的全局 `this` 对象（也就是全局对象自身）。不像 `window` 或者 `self` 这些属性，它确保可以在有无窗口的各种环境下正常工作。所以，你可以安心的使用 `globalThis`，不必担心它的运行环境。

为便于记忆，你只需要记住，全局作用域中的 `this` 就是`globalThis`。以后就用globalThis就行了。

## JSON.stringify() 增强能力

JSON.stringify 在 ES10 修复了对于一些超出范围的 Unicode 展示错误的问题。因为 JSON 都是被编码成 UTF-8，所以遇到 0xD800–0xDFFF 之内的字符会因为无法编码成 UTF-8 进而导致显示错误。在 ES10 它会用转义字符的方式来处理这部分字符而非编码的方式，这样就会正常显示了。

```js
// \uD83D\uDE0E  emoji 多字节的一个字符
console.log(JSON.stringify('\uD83D\uDE0E')) // 打印出笑脸

// 如果我们只去其中的一部分  \uD83D 这其实是个无效的字符串
// 之前的版本 ，这些字符将替换为特殊字符，而现在将未配对的代理代码点表示为JSON转义序列
console.log(JSON.stringify('\uD83D')) // "\ud83d"
```

## 迭代器

概述： 遍历器（Iterator）就是一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数 据结构只要部署 Iterator 接口，就可以完成遍历操作；

特性： ES6 创造了一种新的遍历命令 for...of 循环，Iterator 接口主要供 for...of 消费； 

原生具备 iterator 接口的数据(可用 for of 遍历)： Array； Arguments； Set； Map； String； TypedArray； NodeList；

工作原理： 

1. 创建一个指针对象，指向当前数据结构的起始位置；

2. 第一次调用对象的 next 方法，指针自动指向数据结构的第一个成员；

3. 接下来不断调用 next 方法，指针一直往后移动，直到指向最后一个成员；

4. 每调用 next 方法返回一个包含 value 和 done 属性的对象；

   注：需要自定义遍历数据的时候，要想到迭代器

```js
// 声明一个数组
const xiyou = ['唐僧', '孙悟空', '猪八戒', '沙僧'];
// 使用 for...of 遍历数组
for(let v of xiyou){
    console.log(v);
}
let iterator = xiyou[Symbol.iterator]();
// 调用对象的next方法
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
// 重新初始化对象，指针也会重新回到最前面
let iterator1 = xiyou[Symbol.iterator]();
console.log(iterator1.next());
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211104163159541.png" alt="image-20211104163159541" style="zoom:67%;" />

ES6给Set、Map、Array、String都加上了[Symbol.iterator]方法，且[Symbol.iterator]方法函数也符合标准的Iterator接口规范，所以Set、Map、Array、String默认都是可以遍历的。

```js
//Array
let array = ['red', 'green', 'blue'];
array[Symbol.iterator]() //Iterator遍历器
array[Symbol.iterator]().next() //{value: "red", done: false}

//String
let string = '1122334455';
string[Symbol.iterator]() //Iterator遍历器
string[Symbol.iterator]().next() //{value: "1", done: false}

//set
let set = new Set(['red', 'green', 'blue']);
set[Symbol.iterator]() //Iterator遍历器
set[Symbol.iterator]().next() //{value: "red", done: false}

//Map
let map = new Map();
let obj= {map: 'map'};
map.set(obj, 'mapValue');
map[Symbol.iterator]().next()  {value: Array(2), done: false}
```





# Promise

[10 个关于 Promise 和 setTimeout 知识的面试题，通过图解一次说透彻 (qq.com)](https://mp.weixin.qq.com/s?__biz=MjM5MDA2MTI1MA==&mid=2649130471&idx=1&sn=bdc07e687e23bf70ecb5a6e032b77e5b&chksm=be58a24a892f2b5cb50d258db651b33892cba73c5834d5477f849ad58b359905e0453b3093d6&mpshare=1&scene=23&srcid=1020jDasDXlSwkK8mshMSIFM&sharer_sharetime=1666282135293&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

> 为了解决回调地狱的问题，ES6（ECMAScript 2015）中新增了 Promise 的概念

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209270944878.png" alt="image-20220927094411827" style="zoom:80%;" />



## 按顺序读取文件

> 按顺序读取文件内容，注意，是按照顺序读取文件

```sh
# 安装读取文件包
npm i then-fs
```

### 基本读取文件(无序)

```js
import thenFs from 'then-fs'

thenFs.readFile('./files/1.txt', 'utf8').then((r1) => {console.log(r1)})
thenFs.readFile('./files/2.txt', 'utf8').then((r2) => {console.log(r2)})
thenFs.readFile('./files/3.txt', 'utf8').then((r3) => {console.log(r3)})
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209270954987.png" alt="image-20220927095403953" style="zoom:80%;" />

### 基于回调函数(回调地狱)

```js
import fs from 'then-fs'
// 读取文件 1.txt
fs.readFile("./files/1.txt","utf8", (err1,r1) => {
    if (err1) return console.log(err1.message) // 读取文件 1 失败
    console.log(r1) // 读取文件 1 成功
    
    // 读取文件 2.txt
    fs.readFile("./files/2.txt","utf8", (err2,r2) => {
        if (err2) return console.log(err2.message) // 读取文件 2 失败
        console.log(r2) // 读取文件 2 成功
        
        // 读取文件 3.txt
        fs.readFile("./files/3.txt","utf8", (err3,r3) => {
            if (err3) return console.log(err3.message) // 读取文件 3 失败
            console.log(r3) // 读取文件 1 成功
        })
    })
})
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209270951023.png" alt="image-20220927095120986" style="zoom:80%;" />

### 基于Promise回调⭐

```js
import thenFs from 'then-fs'

thenFs
  .readFile('./files/1.txt', 'utf8')
  // 捕获错误，捕获一次就行，能捕获所有错误
  .catch((err) => {
    console.log(err.message)
  })
  .then((r1) => {
    console.log(r1)
    return thenFs.readFile('./files/2.txt', 'utf8')
  })
  .then((r2) => {
    console.log(r2)
    return thenFs.readFile('./files/3.txt', 'utf8')
  })
  .then((r3) => {
    console.log(r3)
  })
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209270959402.png" alt="image-20220927095945365" style="zoom:80%;" />

### 基于 Promise 封装读文件的方法

方法的封装要求：

① 方法的名称要定义为 getFile

② 方法接收一个形参 fpath，表示要读取的文件的路径

③ 方法的返回值为 Promise 实例对象

```js
import fs from 'fs'

function getFile(fpath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fpath, 'utf8', (err, dataStr) => {
      if (err) return reject(err)
      resolve(dataStr)
    })
  })
}

getFile('./files/11.txt')
  .then((r1) => {
    console.log(r1)
  })
  .catch((err) => console.log(err.message))
```



## Promise方法

### Promise.all() 方法

Promise.all() 方法会发起并行的 Promise 异步操作，等所有的异步操作全部结束后才会执行下一步的 .then 操作（等待机制）。示例代码如下：

> 注意：数组中 Promise 实例的顺序，就是最终结果的顺序！

```js
import thenFs from 'then-fs'
// 定义一个数组，存放三个读文件的异步操作
//注意：数组中 Promise 实例的顺序，就是最终结果的顺序！
const promiseArr = [
  thenFs.readFile('./files/3.txt', 'utf8'),
  thenFs.readFile('./files/2.txt', 'utf8'),
  thenFs.readFile('./files/1.txt', 'utf8'),
]
// 将Promise的数组，作为Promise.all()的参数
Promise.all(promiseArr)
    .then(([r1,r2,r3]) => { // 所有文件读取成功
      console.log(r1,r2,r3)
})
    .catch(err => {
      console.log(err.message) // 捕获错误
})
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209271015418.png" alt="image-20220927101507379" style="zoom:80%;" />

###  Promise.race() 方法

> Promise.race() 方法会发起并行的 Promise 异步操作，只要任何一个异步操作完成，就立即执行下一步的.then 操作（赛跑机制）。示例代码如下

```js
import thenFs from 'then-fs'

const promiseArr = [
  thenFs.readFile('./files/3.txt', 'utf8'),
  thenFs.readFile('./files/2.txt', 'utf8'),
  thenFs.readFile('./files/1.txt', 'utf8'),
]

Promise.race(promiseArr).then(result => {
  console.log(result)
})
```



## async/await

> async/await 是 ES8（ECMAScript 2017）引入的新语法，用来简化 Promise 异步操作。在 async/await 出现之前，开发者只能通过链式 .then() 的方式处理 Promise 异步操作。示例代码如下：

> .then 链式调用的优点：解决了回调地狱的问题.then 链式调用的缺点：代码冗余、阅读性差、不易理解

### 基本使用

```js
import thenFs from 'then-fs'

// 方法用async修饰
async function getAllFile() {
  // 获取结果用await
  const r1 = await thenFs.readFile('./files/1.txt', 'utf8')
  const r2 = await thenFs.readFile('./files/2.txt', 'utf8')
  const r3 = await thenFs.readFile('./files/3.txt', 'utf8')
  console.log(r1)
  console.log(r2)
  console.log(r3)
}
// 调用方法(正常调用即可)
getAllFile()
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209271032935.png" alt="image-20220927103212897" style="zoom:80%;" />

### 注意事项

> ① 如果在 function 中使用了 await，则 function 必须被 async 修饰
>
> ② 在 async 方法中，第一个 await 之前的代码会同步执行，await 之后的代码会异步执行



























