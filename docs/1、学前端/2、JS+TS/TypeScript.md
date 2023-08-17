



最后修改 2022.10.3

# Typescript入门

## Typescript 简介

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210030939957.png" alt="image-20221003093945662" style="zoom:80%;" />

下面是学习 Typescript 的几个理由：

> 1. 更早（写代码的同时）发现错误，减少找 Bug、改 Bug 时间，提升开发效率。 
> 2. 程序中任何位置的代码都有代码提示，随时随地的安全感，增强了开发体验。 
> 3. 强大的类型系统提升了代码的可维护性，使得重构代码更加容易。 
> 4. 支持最新的 ECMAScript 语法，优先体验最新的语法，让你走在前端技术的最前沿。 
> 5. TS 类型推断机制，不需要在代码中的每个地方都显示标注类型，让你在享受优势的同时，尽量降低了成本。

除此之外，Vue 3 源码使用 TS 重写、Angular 默认支持 TS、React 与 TS 完美配合，TypeScript 已成为大中型前端 项目的首先编程语言。



## Typescript安装和初体验

### 安装TS 工具包

> Node.js/浏览器，只认识 JS 代码，不认识 TS 代码。需要先将 TS 代码转化为 JS 代码，然后才能运行。 
>

```apl
# typescript 包：用来编译 TS 代码的包，提供了 tsc 命令，实现了 TS -> JS 的转化
npm i -g typescript
```

```apl
# 验证是否安装成功：tsc –v（查看 typescript 的版本）
tsc -v
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208071002838.png" alt="image-20220807100203778" style="zoom:67%;" />

### 编译并运行 TS 代码

1. 创建 hello.ts 文件（注意：TS 文件的后缀名为 .ts）。 
2. 将 TS 编译为 JS：在终端中输入命令，tsc hello.ts（此时，在同级目录中会出现一个同名的 JS 文件） 
3. 执行 JS 代码：在终端中输入命令，node hello.js

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208071005003.png" alt="image-20220807100530957" style="zoom:67%;" />

```apl
tsc app.ts
node app.js
```

或者

```apl
node app.ts
```

说明：所有合法的 JS 代码都是 TS 代码，有 JS 基础只需要学习 TS 的类型即可。

注意：由 TS 编译生成的 JS 文件，代码中就没有类型信息了。

### 简化运行 TS 的步骤

问题描述：每次修改代码后，都要重复执行两个命令，才能运行 TS 代码，太繁琐。

```apl
# 简化方式：使用 ts-node 包，直接在 Node.js 中执行 TS 代码
npm i -g ts-node
ts-node hello.ts
```

解释：ts-node 命令在内部偷偷的将 TS -> JS，然后，再运行 JS 代码



## 第一个TS文件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210030944545.png" alt="image-20221003094450496" style="zoom:80%;" />

创建hello.ts文件，并在其中输出一句话，JS代码在TS正常执行

```ts
console.log('人到中年不得已')
```

方式一：运行TS代码，进入TS文件所在目录，执行

```sh
ts-node hello.ts
```

方式二：先转换成JS，再进行执行

```
tsc hello.ts
node hello.js
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210030947290.png" alt="image-20221003094719240" style="zoom:80%;" />



# TypeScript常用类型⭐⭐

## 类型介绍

在 `JavaScript` 中，有 7 种原始类型：

这里将TS的数据类型简单的进行下归类：

- 基本类型：`string`、`number`、`boolean`、`symbol`、`bigint`、`null`、`undefined`
- 引用类型：`array`、 `Tuple`(元组)、 `object`(包含`Object`和`{}`)、`function`
- 特殊类型：`any`、`unknow`、`void`、`nerver`、`Enum`(枚举)
- 其他类型：`类型推理`、`字面量类型`、`交叉类型`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210030956222.png" alt="image-20221003095622169" style="zoom:80%;" />

## 基本类型

### 基本类型定义

> 基本类型：number/string/boolean/null/undefined/symbol
>

```tsx
//字符串
let str: string = "Domesy"
    
// 数字
let num: number = 7
    
//布尔
let bool: boolean = true
    
//symbol
let sym: symbol = Symbol();
     
//bigint
let big: bigint = 10n
        
//null
let nu: null = null
    
//undefined
let un: undefined = undefined
```

需要注意：

> - `null` 和 `undefined` 两个类型一旦赋值上，就不能在赋值给任何其他类型
> - `symbol`是独一无二的，假设再定义一个 `sym1`，那么**sym === sym1 为 false**



### 自动类型推断

但是，如果变量有默认值的话，一般我们也不需要显式声明类型，`TypeScript` 会自动推断变量的类型（类型推断）：

```tsx
let id = 5; // number 类型
let firstname = 'ConardLi'; // string 类型
let hasDog = true; // boolean 类型
hasDog = 'yes'; // ERROR
```

我们还可以将变量设置为联合类型（联合类型是可以分配多个类型的变量）：

```tsx
let age: string | number;
age = 17;
age = '17';
```



## 数组类型

### 数组定义

```ts
// 创建方式一：推荐方式，[]（中括号）表示数组，如果数组中没有内容，就是一个空数组
let names1: string[] = ['迪丽热巴', '古力娜扎', '1']
// 创建方式二：不推荐
let names2: string[] = new Array('迪丽热巴', '古力娜扎', '1')
console.log(names1)
console.log(names2)
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210031040460.png" alt="image-20221003104053359" style="zoom:80%;" />

数组其他类型示例

```tsx
// 只能包含 number
let ids: number[] =   [1, 2, 3, 4, 5]; 

// 只能包含 string
let names: string[] = ['ConardLi', 'Tom', 'Jerry']; 

//只能包含 true false
let options: boolean[] = [true, false, false]; 

// 只能包含对象
let books: object[] = [{ name: 'Tom', animal: 'cat' }]; 

// 啥都行，回到了 JS
let arr: any[] = ['hello', 1, true]; 
```



### 数组联合类型

> 需求：数组中既有 number 类型，又有 string 类型，这个数组的类型应该如何写？

```tsx
//表示数组person可以是string或者number数组类型
let person: (string | number)[] = ['ConardLi', 1];
//表示数组person1既可以是string类型，也可以是number数组类型
let person1: string | number[] = ['a','b']
```

> 解释：| （竖线）在 TS 中叫做联合类型（由两个或多个其他类型组成的类型，表示可以是这些类型中的任意一种）。 注意：这是 TS 中联合类型的语法，只有一根竖线，不要与 JS 中的或（||）混淆了。

### 遍历数组

```ts
let names1: string[] = ['迪丽热巴', '古力娜扎', '1']
for (let i: number = 0; i < names1.length; i++) {
    console.log(i ,names1[i])
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210031045758.png" alt="image-20221003104535692" style="zoom:80%;" />

## 元组类型

> 元组类型是另一种类型的数组，它确切地知道包含多少个元素，以及特定索引对应的类型。

```tsx
// 标记经纬度
let position: [number, number] = [39.5621, 45.2232];
console.log(position)
```

> 1. 元组类型可以确切地标记出有多少个元素，以及每个元素的类型。
>
> 2. 该示例中，元素有两个元素，每个元素的类型都是 number。

## 类型别名

类型别名（自定义类型）：为任意类型起别名。 

使用场景：当同一类型（复杂）被多次使用时，可以通过类型别名，简化该类型的使用。

```tsx
// 定义类型别名
type CustomArray = (number | string)[]
// 使用类型别名
let arr: CustomArray = [1, 3, 5, 'a', 'b']
let arr1: CustomArray = [1, 'x', 2, 'y']
console.log(arr)
console.log(arr1)
```

> 1. 使用 type 关键字来创建类型别名。 
> 2. 类型别名（比如，此处的 CustomArray），可以是任意合法的变量名称。 
> 3. 创建类型别名后，直接使用该类型别名作为变量的类型注解即可。

## Object类型

`object` 非原始类型，在定义上直接使用 object 是可以的，但你要更改对象的属性就会报错，原因是并没有使对象的内部具体的属性做限制，所以需要使用 **{}** 来定义内部类型

```tsx
let obj1: object = { a: 1, b: 2}
obj1.a = 3 // error

let obj2: { a: number, b: number } = {a: 1, b: 2}
obj2.a = 3 // ok
```

`Object`(大写的O）,代表所有的原始类型或非原始类型都可以进行赋值,除了`null`和`undefined

```tsx
let obj: Object;
obj = 1; // ok
obj = "a"; // ok
obj = true; // ok
obj = {}; // ok
obj = Symbol() //ok
obj = 10n //ok
obj = null; // error
obj = undefined; // error
```



## 特殊类型

### any 类型

使 `any` 类型，我们基本上可以将 `TypeScript` 恢复为 `JavaScript`：

在 TS 中，任何类型都可以归于 `any` 类型，所以`any`类型也就成了所有类型的**顶级类型**，同时，**如果不指定变量的类型，则默认为any类型**, 当然不推荐使用该类型，因为这样丧失了TS的作用

```tsx
let name1: any = 'ConardLi';
name1 = 17;
name1 = { age: 17 };
```

> 如果代码里使用了大量的 `any`，那 `TypeScript` 也就失去了意义，所以我们应该尽量避免使用 `any` 。
>

### unknow

与`any`一样，都可以作为所有类型的**顶级类型**，但 `unknow`更加**严格**，那么可以说除了`any` 之下的第二大类型，接下来对比下`any`,主要严格于一下两点：

- `unknow`会对值进行检测，而类型`any`不会做检测操作，说白了，`any`类型可以赋值给任何类型，但`unknow`只能赋值给`unknow`类型和`any`类型
- `unknow`不允许定义的值有任何操作（如 方法，new等），但any可以

```tsx
let u:unknown;
let a: any;

u = '1'; //ok
u = 2; //ok
u = true; //ok
u = [1, 2, 3]; //ok
u = {}; //ok

let value:any = u //ok
let value1:any = a //ok
let value2:unknown = u //ok
let value3:unknown = a //ok
let value4:string = u //error
let value5:string = a //ok
let value6:number = u //error
let value7:number = a //ok
let value8:boolean = u //error
let value9:boolean = a //ok

u.set() // error
a.set() //ok
u() // error
a() //ok
new u() // error
new a() //ok
```

### void

当一个函数，没有返回值时，TS会默认他的返回值为 `void` 类型

```tsx
const setInfo = ():void => {} // 等价于 const setInfo = () => {}

const setInfo1 = ():void => { return '1' }  // error
const setInfo2 = ():void => { return 2 } // error
const setInfo3 = ():void => { return true } // error
const setInfo4 = ():void => { return  } // ok
const setInfo5 = ():void => { return undefined } //ok 
```

### never

表示一个函数永远不存在返回值，TS会认为类型为 `never`，那么与 `void` 相比, `never`应该是 `void`子集， 因为 `void`实际上的返回值为 `undefined`，而 `never` 连 `undefined`也不行

符合`never`的情况有：当抛出异常的情况和无限死循环

```tsx
let error = ():never => { // 等价约 let error = () => {}
    throw new Error("error");
};

let error1 = ():never => {
    while(true){}
}
```



## DOM 和类型转换

`TypeScript` 没办法像 `JavaScript` 那样访问 `DOM`。这意味着每当我们尝试访问 `DOM` 元素时，`TypeScript` 都无法确定它们是否真的存在。

```tsx
const link = document.querySelector('a');

console.log(link.href); // ERROR: Object is possibly 'null'. TypeScript can't be sure the anchor tag exists, as it can't access the DOM
```

使用非空断言运算符 (`!`)，我们可以明确地告诉编译器一个表达式的值不是 `null` 或 `undefined`。当编译器无法准确地进行类型推断时，这可能很有用：

```tsx
// 我们明确告诉 TS a 标签肯定存在
const link = document.querySelector('a')!;

console.log(link.href); // conardli.top
```

这里我们没必要声明 `link` 变量的类型。这是因为 `TypeScript` 可以通过类型推断确认它的类型为 `HTMLAnchorElement`。

但是如果我们需要通过 `class` 或 `id` 来选择一个 `DOM` 元素呢？这时 `TypeScript` 就没办法推断类型了：

```tsx
const form = document.getElementById('signup-form');

console.log(form.method);
// ERROR: Object is possibly 'null'.
// ERROR: Property 'method' does not exist on type 'HTMLElement'.
```

我们需要告诉 `TypeScript` `form` 确定是存在的，并且我们知道它的类型是  `HTMLFormElement`。我们可以通过类型转换来做到这一点：

```tsx
const form = document.getElementById('signup-form') as HTMLFormElement;

console.log(form.method); // post
```

`TypeScript` 还内置了一个 `Event` 对象。如果我们在表单中添加一个 `submit` 的事件侦听器，`TypeScript` 可以自动帮我们推断类型错误：

```tsx
const form = document.getElementById('signup-form') as HTMLFormElement;

form.addEventListener('submit', (e: Event) => {
  e.preventDefault(); // 阻止页面刷新
  // ERROR: Property 'tarrget' does not exist on type 'Event'. Did you mean 'target'?
  console.log(e.tarrget); 
});
```



## 类型自动推断

> 只有在初始化值时生效

我们在学完这些基础类型，我们是不是每个类型都要去写字段是什么类型呢？其实不是，在`TS`中如果不设置类型，并且不进行赋值时，将会推论为**any**类型，如果进行赋值就会默认为类型

```tsx
let a; // 推断为any
let str = '小杜杜'; // 推断为string
let num = 13; // 推断为number
let flag = false; // 推断为boolean

str = true // error Type 'boolean' is not assignable to type 'string'.(2322)
num = 'Domesy' // error
flag = 7 // error
```



## 字面量类型

**字面量类型**：在`TS`中，我们可以指定参数的类型是什么，目前支持`字符串`、`数字`、`布尔`三种类型。比如说我定义了 `str 的类型是 '小杜杜'` 那么str的值只能是**小杜杜**

```tsx
let str:'小杜杜' 
let num: 1 | 2 | 3 = 1
let flag:true

str = '小杜杜' //ok
str = 'Donmesy' // error

num = 2 //ok
num = 7 // error

flag = true // ok
flag = false // error
```



## 交叉类型（&）

**交叉类型**：将多个类型合并为一个类型，使用`&`符号连接，如：

```tsx
type AProps = { a: string }
type BProps = { b: number }

type allProps = AProps & BProps

const Info: allProps = {
     a: '小杜杜',
     b: 7
}
console.log(Info) // { a: '小杜杜', b: 7 }
```

### 同名基础属性合并

我们可以看到`交叉类型`是结合两个属性的属性值，那么我们现在有个问题，要是两个属性都有相同的属性值，那么此时总的类型会怎么样，先看看下面的案列：

```tsx
type AProps = { a: string, c: number }
type BProps = { b: number, c: string }

type allProps = AProps & BProps

const Info: allProps = {
     a: '小杜杜',
     b: 7,
     c: 1, // error (property) c: never
     c: 'Domesy', // error (property) c: never
}
```

如果是相同的类型，合并后的类型也是此类型，那如果是不同的类型会如何：

我们在`Aprops`和`BProps`中同时加入`c属性`，并且`c属性`的类型不同，一个是`number`类型，另一个是`string`类型

现在结合为 `allProps` 后呢? 是不是`c属性`是 `number` 或 `string` 类型都可以，还是其中的一种？

然而在实际中， `c` 传入`数字类型`和`字符串类型`都不行，我么看到报错，现实的是 **c的类型是 never**。

这是因为对应 `c`属性而言是 `string & number`,然而这种属性明显是不存在的，所以`c`的属性是`never`

### 同名非基础属性合并

```tsx
interface A { a: number }
interface B { b: string }

interface C {
      x: A
}
interface D {
      x: B
}
type allProps = C & D

const Info: allProps = {
    x: {
       a: 7,
       b: '小杜杜'
    }
}

console.log(Info) // { x: { "a": 7, "b": "小杜杜" }}
```

我们来看看案例，对于混入多个类型时，若存在相同的成员，且成员类型为非基本数据类型，那么是可以成功合。

如果 接口A 中的 也是 b，类型为number，就会跟**同名基础属性合并**一样



# 对象类型

## 基本使用

`TypeScript` 中的对象必须拥有所有正确的属性和值类型：

```tsx
// 使用特定的对象类型注释声明一个名为 person 的变量
let person: {
  name: string;
  age: number;
  isProgrammer: boolean;
};

// 给 person 分配一个具有所有必要属性和值类型的对象
person = {
  name: 'ConardLi',
  age: 17,
  isProgrammer: true,
};
```

对象传参时的错误用法

```tsx
person.age = '17'; // ERROR: should be a number

person = { // ERROR: missing the isProgrammer property
  name: 'Tom',
  age: 3,
}; 
```

## 对象的可选属性

> 对象的属性或方法，也可以是可选的，此时就用到可选属性了。比如，我们在使用 axios({ … }) 时，如果发送 GET 请求，method 属性就可以省略。 

示例一：定义对象时传入

```tsx
// 使用特定的对象类型注释声明一个名为 person 的变量
let person: {
  name: string;
  age: number;
  // 加上可选?
  isProgrammer?: boolean;
};

// 给 person 分配一个具有所有必要属性和值类型的对象
person = {
  name: 'ConardLi',
  age: 17
};

console.log(person)
```

示例二：对象作为函数参数传入

```tsx
// method表示可选，传入的是对象类型
function myAxios(config: { url: string; method?: string }) {
  console.log(config.url)
  console.log(config.method)
}
// 只传url即可
myAxios({
  url: 'www.baidu.com'
})
```

> 可选属性的语法与函数可选参数的语法一致，都使用 ?（问号）来表示

## 接口类型

当一个对象类型被多次使用时，一般会使用接口（interface）来描述对象的类型，达到复用的目的。

> 1. 使用 interface 关键字来声明接口。
>
> 2. 接口名称（比如，此处的 IPerson），可以是任意合法的变量名称。
>
> 3. 声明接口后，直接使用接口名称作为变量的类型。
>
> 4. 因为每一行只有一个属性类型，因此，属性类型后没有 ;（分号）。

```tsx
interface Person {
  name: string;
  age: number;
  isProgrammer: boolean;
}
```

```tsx
let person1: Person = {
  name: 'ConardLi',
  age: 17,
  isProgrammer: true,
};

let person2: Person = {
  name: 'Tom',
  age: 3,
  isProgrammer: false,
};
```

我们还可以用函数的类型签名声明一个函数属性，通用函数(`sayHi`)和箭头函数(`sayBye`)都可以声明：

```tsx
interface Animal {
  eat(name: string): string;
  speak: (name: string) => string;
}

let tom: Animal = {
  eat: function (name: string) {
    return `eat ${name}`;
  },
  speak: (name: string) => `speak ${name}`,
};

console.log(tom.eat('Jerry'));
console.log(tom.speak('哈哈哈'));
```

需要注意的是，虽然 `eat、speak` 分别是用普通函数和箭头函数声明的，但是它们具体是什么样的函数类型都可以，`Typescript` 是不关心这些的。



# 函数类型

## 函数类型

- 有两种方式，一种为 `function`， 另一种为`箭头函数`
- 在书写的时候，也可以写入返回值的类型，如果写入，则必须要有对应类型的返回值，**但通常情况下是省略**，因为`TS`的类型推断功能够正确推断出返回值类型

> 为函数指定类型的两种方式：1 单独指定参数、返回值的类型 2 同时指定参数、返回值的类型。 

### 1 单独指定参数、返回值的类型

```tsx
function add1(num1: number,num2: number) :number {
    return num1+num2;
}
```

### 2 同时指定参数、返回值的类型

```tsx
// => number表示返回值类型
const add2: (num1: number,num2: number) => number = (num1,num2) =>{
    return  num1+num2;
}
```

> 解释：当函数作为表达式时，可以通过类似箭头函数形式的语法来为函数添加类型。 
>

注意：这种形式只适用于函数表达式。

### 3 带参数带返回值

**普通写法**

```tsx
// 定义一个名为 circle 的函数，它接受一个类型为 number 的直径变量，并返回一个字符串
function circle(diam: number): string {
  return '圆的周长为：' + Math.PI * diam;
}

console.log(circle(10)); // 圆的周长为：31.41592653589793
```

**ES6 箭头函数的写法**

```tsx
const circle = (diam: number): string => {
  return '圆的周长为：' + Math.PI * diam;
};
console.log(circle(10)); // 圆的周长为：31.41592653589793
```

我们没必要明确声明 `circle` 是一个函数，`TypeScript` 会进行类型推断。`TypeScript` 还会推断函数的返回类型，但是如果函数体比较复杂，还是建议清晰的显式声明返回类型。

### 4 没有返回值

```tsx
function greet(name: string): void {
  console.log('Hello', name)
}

greet('jack')
```

## 参数类型

> - 可选参数：如果函数要配置可有可无的参数时，可以通过 **?** 实现，切可选参数一定要在最后面
> - 默认参数：函数内可以自己设定其默认参数，用 **=** 实现
> - 剩余参数：仍可以使用扩展运算符 **...**

### 可选参数

我们可以在参数后添加一个?，表示它为`可选参数`；另外参数的类型也可以是一个联合类型：

```tsx
// 可选参数可以是联合类型
function mySlice(start: number, end?: number | string): void {
  console.log('起始索引：', start, '结束索引：', end)
}

mySlice(10)
mySlice(1)
mySlice(1, 3)
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210031530375.png" alt="image-20221003153038177" style="zoom:80%;" />



### 默认参数

```tsx
// 可选参数可以是联合类型
function mySlice(name: string, age: number = 11): void {
  console.log(name,age)
}

mySlice('任硕')
mySlice('任硕', 3)
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210031534605.png" alt="image-20221003153422525" style="zoom:80%;" />

### 剩余参数

```tsx
// 可选参数可以是联合类型
function mySlice(...numbers: number[]): void {
  let sum: number = 0;
  for (let i = 0; i < numbers.length ; i++) {
     sum += numbers[i]
  }
  console.log('求和结果：',sum)
}

mySlice( 3,4)
mySlice( 3,4,5,6)
mySlice( 3,4,5,6,7,8)
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210031544695.png" alt="image-20221003154409608" style="zoom:80%;" />

## 函数重载

**函数重载**：是使用相同名称和不同参数数量或类型创建多个方法的一种能力。在 TypeScript 中，表现为给同一个函数提供多个函数类型定义。简单的说：**可以在同一个函数下定义多种类型值，总后汇总到一块**

```tsx
let obj: any = {};
function setInfo(val: string): void;
function setInfo(val: number): void;
function setInfo(val: boolean): void;
function setInfo(val: string | number | boolean): void {
   if (typeof val === "string") {
       obj.name = val;
   } else {
       obj.age = val;
   }
}
setInfo("Domesy");
setInfo(7);
setInfo(true);
console.log(obj); // { name: 'Domesy', age: 7 }
```



# TS类

## 类的最简单使用

```tsx
class Person {
  age: number = 12
  gender = '男'
}

const p = new Person()
console.log(p)
console.log(p)
console.log(p)
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210031633355.png" alt="image-20221003163302230" style="zoom:80%;" />

## 类+构造函数

```tsx
class Person {
  age: number
  gender: string
  // 定义构造函数
  constructor(age: number, gender: string) {
    this.age = age
    this.gender = gender
  }
}
// 使用类
const p = new Person(18, '男')
console.log(p.age, p.gender)
const p1 = new Person(22, '女')
console.log(p1.age, p1.gender)
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210031635906.png" alt="image-20221003163547822" style="zoom:80%;" />

## 类+构造函数+方法

我们可以定义类中每条数据的类型：

```js
class Person {
  name: string;
  isCool: boolean;
  age: number;

  constructor(n: string, c: boolean, a: number) {
    this.name = n;
    this.isCool = c;
    this.age = a;
  }

  sayHello() {
    return `Hi，我是 ${this.name} ，我今年 ${this.age} 岁了`;
  }
}

const person1 = new Person('ConardLi', true, 17);
console.log(person1.sayHello()); // Hi, 我是 ConardLi，我今年 17 岁了
```

我们可以创建一个仅包含从 `Person` 构造的对象数组：

```js
let People: Person[] = [person1, person2];
```

我们可以给类的属性添加访问修饰符，`TypeScript` 还提供了一个新的 `readonly` 访问修饰符。

```js
class Person {
  readonly name: string; // 不可以变的
  private isCool: boolean; // 类的私有属性、外部访问不到
  protected email: string; // 只能从这个类和子类中进行访问和修改
  public age: number; // 任何地方都可以访问和修改

  constructor(n: string, c: boolean, a: number) {
    this.name = n;
    this.isCool = c;
    this.age = a;
  }

  sayHello() {
    return `Hi，我是 ${this.name} ，我今年 ${this.age} 岁了`;
  }
}

const person1 = new Person('ConardLi', true, 'conard@xx.com', 17);
console.log(person1.name); // ConardLi
person1.name = 'Jerry'; // Error: read only
```

我们可以通过下面的写法，属性会在构造函数中自动分配，我们类会更加简洁：

```js
class Person {
  constructor(
    readonly name: string,
    private isCool: boolean,
    protected email: string,
    public age: number
  ) {}
}
```

> 如果我们省略访问修饰符，默认情况下属性都是 `public`，另外和 JavaScript 一样，类也是可以 `extends` 的。



## 基本方法

在基本方法中有：`静态属性`，`静态方法`、`成员属性`、`成员方法`、`构造器`、`get set方法`，接下来逐个看看：

需要注意的是：在成员属性中，如果不给默认值,并且不使用是会报错的，如果不想报错就给如 **!**，如：`name4!:string`

```tsx
class Info {
    //静态属性
    static name1: string = 'Domesy'

    //成员属性，实际上是通过public上进行修饰，只是省略了
    nmae2:string = 'Hello' //ok 
    name3:string //error
    name4!:string //ok 不设置默认值的时候必须加入 !

    //构造方法
    constructor(_name:string){
        this.name4 = _name
    }

    //静态方法
    static getName = () => {
        return '我是静态方法'
    }

    //成员方法
    getName4 = () => {
        return `我是成员方法:${this.name4}`
    }

    //get 方法
    get name5(){
        return this.name4
    }

    //set 方法
    set name5(name5){
        this.name4 = name5
    }
}

const setName = new Info('你好')
console.log(Info.name1) //  "Domesy" 
console.log(Info.getName()) // "我是静态方法" 
console.log(setName.getName4()) // "我是成员方法:你好" 
```

## 私有字段(#)

在 TS 3.8版本便开始支持**ECMACMAScript**的私有字段。

需要注意的是`私有字段`与常规字段不同，主要的区别是：

- 私有字段以 `#` 字符开头，也叫私有名称；
- 每个私有字段名称都**唯一**地限定于其包含的类；
- 不能在私有字段上使用 TypeScript 可访问性修饰符（如 public 或 private）；
- 私有字段不能在包含的类之外访问，甚至不能被检测到。

```tsx
class Info {
    #name: string; //私有字段
    getName: string;

    constructor(name: string) {
        this.#name = name;
        this.getName = name
    }

    setName() {
        return `我的名字是${this.#name}`
    }
}

let myName = new Info("Domesy");

console.log(myName.setName()) // "我的名字是Domesy" 
console.log(myName.getName) // ok "Domesy" 
console.log(myName.#name) // error 
// Property '#name' is not accessible outside class 'Info' 
// because it has a private identifier.(18013)
```

## 只读属性（readonly）

**只读属性**：用 `readonly`修饰，只能在**构造函数**中初始化，并且在TS中，只允许将`interface`、`type`、`class`上的属性标识为`readonly`

- `readonly`实际上只是在`编译阶段`进行代码检查
- 被`readonly`修饰的词只能在 `constructor`阶段修改，其他时刻不允许修改

```tsx
class Info {
    public readonly name: string; // 只读属性
    name1:string

    constructor(name: string) {
        this.name = name;
        this.name1 = name;
    }

    setName(name:string) {
        this.name = name // error
        this.name1 = name; // ok
    }
}
```

## 继承（extends）

**继承**：是个比较重要的点，指的是子可以继承父的思想，也就是说 `子类` 通过继承`父类`后，就拥有了`父类`的属性和方法，这点与`HOC`有点类似

这里又个`super`字段，给不知道的小伙伴说说，其作用是**调用父类上的属性和方法**

### 定义父类

```tsx
// 父类
class Person {
    name: string
    age: number

    constructor(name: string, age:number){
        this.name = name
        this.age = age
    }

    getName(){
        console.log(`我的姓名是：${this.name}`)
        return this.name
    }

    setName(name: string){
        console.log(`设置姓名为：${name}`)
        this.name = name
    }
}
```

### 定义子类

```tsx
// 子类
class Child extends Person {
    tel: number
    constructor(name: string, age: number, tel:number){
        super(name, age)
        this.tel = tel
    }

    getTel(){
        console.log(`电话号码是${this.tel}`)
        return this.tel
    }
}
```

### 测试使用

```tsx
let res = new Child("Domesy", 7 , 123456)
console.log(res) // Child {."name": "Domesy", "age": 7, "no": 1 }
console.log(res.age) // 7
res.setName('小杜杜') // "设置姓名为：小杜杜" 
res.getName() //   "我的姓名是：小杜杜"
res.getTel() //  "电话号码是123456" 
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210031717950.png" alt="image-20221003171730850" style="zoom:80%;" />

## 修饰符

主要有三种修饰符：

- **public**：类中、子类内的任何地方、外部**都能调用**
- **protected**：类中、子类内的任何地方都能调用,但**外部不能调用**
- **private**：类中可以调用，子类内的任何地方、外部**均不可调用**

```tsx
class Person {
    public name: string
    protected age: number
    private tel: number

    constructor(name: string, age:number, tel: number){
        this.name = name
        this.age = age
        this.tel = tel
    }
}

class Child extends Person {
    constructor(name: string, age: number, tel: number) {
        super(name, age, tel);
    }

    getName(){
        console.log(`我的名字叫${this.name},年龄是${this.age}`) // ok name 和 age可以
        console.log(`电话是${this.tel}`) // error 报错 原因是 tel 拿不出来
    }
}


const res = new Child('Domesy', 7, 123456)
console.log(res.name) // ok Domesy
console.log(res.age) // error
console.log(res.tel) // error
```

## 抽象类

**abstract**: 用abstract关键字声明的类叫做**抽象类**，声明的方法叫做**抽象方法**

- **抽象类**：指不能被实例化，因为它里面包含一个或多个抽象方法。
- **抽象方法**：是指不包含具体实现的方法；

注：抽象类是不能直接实例化，只能实例化实现了所有抽象方法的子类

```tsx
abstract class Person {
    constructor(public name: string){}

    // 抽象方法
    abstract setAge(age: number) :void;
}

class Child extends Person {
    constructor(name: string) {
        super(name);
    }

    setAge(age: number): void {
        console.log(`我的名字是${this.name},年龄是${age}`);
    }
}

let res = new Person("小杜杜") //error
let res1 = new Child("小杜杜");

res1.setAge(7) // "我的名字是小杜杜,年龄是7"
```



## 重写和重载

- **重写**：子类重写继承自父类中的方法
- **重载**：指为同一个函数提供多个类型定义，与上述函数的重载类似

```tsx
// 重写
class Person{
    setName(name: string){
        return `我的名字叫${name}`
    }
}

class Child extends Person{
    setName(name: string){
        return `你的名字叫${name}`
    }
}

const yourName = new Child()
console.log(yourName.setName('小杜杜')) // "你的名字叫小杜杜" 

// 重载
class Person1{
    setNameAge(name: string):void;
    setNameAge(name: number):void;
    setNameAge(name:string | number){
        if(typeof name === 'string'){
            console.log(`我的名字是${name}`)
        }else{
            console.log(`我的年龄是${name}`)
        }
    };
}

const res = new Person1()
res.setNameAge('小杜杜') // "我的名字是小杜杜" 
res.setNameAge(7) // "我的年龄是7"
```



# TS断言和类型守卫

## TS断言

分为三种：`类型断言`、`非空断言`、`确定赋值断言`

当断言失效后，可能使用到：**双重断言**

### 类型断言

在特定的环境中，我们会比TS知道这个值具体是什么类型，不需要TS去判断，简单的理解就是，**类型断言会告诉编译器，你不用给我进行检查，相信我，他就是这个类型**

共有两种方式：

- **尖括号**
- **as**：推荐

```tsx
//尖括号
let num:any = '小杜杜'
let res1: number = (<string>num).length; // React中会 error

// as 语法
let str: any = 'Domesy';
let res: number = (str as string).length;
```

但需要注意的是：尖括号语法在**React**中会报错，原因是与`JSX`语法会产生冲突，所以只能使用**as语法**

### 非空断言

在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 `!` 可以用于断言操作对象是**非 null 和非 undefined 类型。**

我们对比下`ES5`的代码

![图片](https://mmbiz.qpic.cn/mmbiz/3JxC1BeqGrl1aNsHbb7AdrzwDmoNNSPoPqOQnDENXHnp0esccJJIqpicaYBNcRIjet9FUAVP6puiaIpd6vy15KPg/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)image.png

我们可以看出来 `!`可以帮助我们过滤 `null`和 `undefined`类型，也就是说，编译器会默认我们只会传来`string`类型的数据，所以可以赋值为`str1`

但变成`ES5`后 `!`会被移除，所以当传入 `null` 的时候，还是会打出 `null`

### 确定赋值断言

在`TS` 2.7版本中引入了确定赋值断言，即允许在实例属性和变量声明后面放置一个 `!` 号，以告诉`TS`该属性会被明确赋值。

```tsx
let num: number;
let num1!: number;

const setNumber = () => num = 7
const setNumber1 = () => num1 = 7

setNumber()
setNumber1()

console.log(num) // error 
console.log(num1) // ok
```

### 双重断言

**断言失效后，可能会用到，但一般情况下不会使用**

失效的情况：基础类型不能断言为接口

```tsx
interface Info{
    name: string;
    age: number;
}

const name = '小杜杜' as Info; // error, 原因是不能把 string 类型断言为 一个接口
const name1 = '小杜杜' as any as Info; //ok
```

## 类型守卫

**类型守卫**：是**可执行运行时检查的**一种表达式，用于确保**该类型在一定的范围内**。

我个人的感觉是，类型守卫就是你可以设置多种类型，但我默认你是什么类型的意思

目前，常有的类型守卫共有4种：**in关键字**、**typeof关键字**、**interfaceof关键字**和**类型谓词（is)**

### in关键字

**用于判断这个属性是那个里面的**

```tsx
interface Info {
    name: string
    age: number
}

interface Info1{
    name: string
    flage: true
}

const setInfo = (data: Info | Info1) => {
    if("age" in data){
        console.log(`我的名字是：${data.name}，年龄是：${data.age}`)
    }

    if("flage" in data){
        console.log(`我的名字是：${data.name}，性别是：${data.flage}`)
    }
}

setInfo({name: '小杜杜', age: 7}) // "我的名字是：小杜杜，年龄是：7" 
setInfo({name: '小杜杜', flage: true}) // "我的名字是：小杜杜，性别是：true"
```

### typeof关键字

**用于判断基本类型，如string ｜ number等**

```tsx
const setInfo = (data: number | string | undefined) => {
    if(typeof data === "string"){
        console.log(`我的名字是：${data}`)
    }

    if(typeof data === "number"){
        console.log(`我的年龄是：${data}`)
    }

    if(typeof data === "undefined"){
        console.log(data)
    }
}

setInfo('小杜杜') // "我的名字是：小杜杜"  
setInfo(7) // "我的年龄是：7" 
setInfo(undefined) // undefined" 
```

### interfaceof关键字

**用于判断一个实例是不是构造函数，或使用类的时候**

```tsx
class Name {
    name: string = '小杜杜'
}

class Age extends Name{
    age: number = 7
}

const setInfo = (data: Name) => {
    if (data instanceof Age) {
        console.log(`我的年龄是${data.age}`);
    } else {
        console.log(`我的名字是${data.name}`);
    }
}

setInfo(new Name()) // "我的名字是小杜杜"
setInfo(new Age()) // "我的年龄是7" 
```

### 类型谓词（is)

```tsx
function isNumber(x: any): x is number { //默认传入的是number类型
    return typeof x === "number";
}

console.log(isNumber(7)) // true
console.log(isNumber('7')) //false
console.log(isNumber(true)) //false
```

## 两者的区别

通过上面的介绍，我们可以发现`断言`与`类型守卫`的概念非常相似，都是确定参数的类型，但`断言`更加**霸道**，它是直接告诉编辑器，这个参数就是这个类型，而类型守卫更像确定这个参数具体是什么类型。（个人理解，有不对的地方欢迎指出～）



# TS接口

**接口**：在面向对象语言中表示行为抽象，也可以用来描述对象的形状。

使用**interface**关键字来定义接口

## 类型别名（type）

**类型别名**：也就是`type`，用来给一个类型起个新名字

```tsx
type InfoProps = string | number

const setInfo = (data: InfoProps) => {}
```

## 对象的形状

接口可以用来描述`对象`，主要可以包括以下数据：`可读属性`、`只读属性`、`任意属性`

- **可读属性**：当我们定义一个接口时，我们的属性可能不需要全都要，这是就需要 **?** 来解决
- **只读属性**：用 **readonly**修饰的属性为只读属性，意思是指允许定义，不允许之后进行更改
- **任意属性**：这个属性极为重要，它是可以用作就算没有定义，也可以使用，比如 **[data: string]: any**。比如说我们对组件进行封装，而封装的那个组件并没有导出对应的类型，然而又想让他不报错，这时就可以使用任意属性

```tsx
interface Props {
    a: string;
    b: number;
    c: boolean;
    d?: number; // 可选属性
    readonly e: string; //只读属性
    [f: string]: any //任意属性
}
let res: Props = {
    a: '小杜杜',
    b: 7,
    c: true,
    e: 'Domesy',
    d: 1, // 有没有d都可以
    h: 2 // 任意属性，之前为定义过h
}

let res.e = 'hi' // error, 原因是可读属性不允许更改
```

## 简单实现

我们可以通过实现一个接口来告诉一个类它必须包含某些属性和方法：

```tsx
interface HasFormatter {
  format(): string;
}

class Person implements HasFormatter {
  constructor(public username: string, protected password: string) {}

  format() {
    return this.username.toLocaleLowerCase();
  }
}

let person1: HasFormatter;
let person2: HasFormatter;

person1 = new Person('ConardLi', 'admin123');
person2 = new Person('Tom', 'admin123');

console.log(person1.format()); // conardli
```

确保 `people` 是一个实现 `HasFormatter` 的对象数组(确保每 `people` 都有 `format` 方法):

```tsx
let people: HasFormatter[] = [];
people.push(person1);
people.push(person2);
```

## 继承

**继承**：与类一样，接口也存在继承属性，也是使用`extends`字段

```tsx
interface nameProps {
    name: string
}

interface Props extends nameProps{
    age: number
}

const res: Props = {
    name: '小杜杜',
    age: 7
}
```

## 函数类型接口

同时，可以定义函数和类，加`new`修饰的事**类**，不加new的事**函数**

```tsx
interface Props {
    (data: number): number
}

const info: Props = (number:number) => number  //可定义函数

// 定义函数
class A {
    name:string
    constructor(name: string){
        this.name = name
    }
}

interface PropsClass{
    new (name: string): A
}

const info1 = (fun: PropsClass, name: string) => new fun(name)

const res = info1(A, "小杜杜")
console.log(res.name) // "小杜杜" 
```

## type 和 interface 的区别

通过上面的学习，我们发现`类型别名`和`接口`非常相似，可以说在大多数情况下，`type`与`interface`是等价的

但在一些特定的场景差距还是比较大的，接下来逐个来看看

### 基础数据类型

- `type`和`interface`都可以定义 **对象** 和 **函数**
- `type`可以定义其他数据类型，如字符串、数字、元祖、联合类型等，而`interface`不行

```tsx
type A = string // 基本类型

type B = string | number // 联合类型

type C = [number, string] // 元祖

const dom = document.createElement("div");  // dom元素
type D = typeof dom
```

### 扩展

`interface` 可以扩展 `type`，`type` 也可以扩展为 `interface`，但两者实现扩展的方式不同。

- `interface` 是通过 `extends` 来实现
- `type` 是通过 `&` 来实现

```tsx
// interface 扩展 interface
interface A {
    a: string
}
interface B extends  A {
    b: number
}
const obj:B = { a: `小杜杜`, b: 7 }

// type 扩展 type
type C = { a: string }
type D = C & { b: number }
const obj1:D = { a: `小杜杜`, b: 7 }

// interface 扩展为 Type
type E = { a: string }
interface F extends E { b: number }
const obj2:F = { a: `小杜杜`, b: 7 }

// type 扩展为 interface
interface G { a: string }
type H = G & {b: number}
const obj3:H = { a: `小杜杜`, b: 7 }
```

## 重复定义

`interface` 可以多次被定义，并且会进行合并，但`type`不行

```tsx
interface A {
    a: string
}
interface A {
    b: number
}
const obj:A = { a: `小杜杜`, b: 7 }

type B = { a: string }
type B = { b: number } // error
```



# TS泛型

**泛型**：Generics，是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

也就是说，泛型是**允许同一个函数接受不同类型参数的一种模版**，与`any`相比，使用泛型来创建可服用的组件要更好，因为**泛型会保留参数类型**（PS：泛型是整个TS的重点，也是难点，请多多注意～）

## 为什么需要泛型

我们先看看一个例子：

```tsx
const calcArray = (data:any):any[] => {
     let list = []
     for(let i = 0; i < 3; i++){
         list.push(data)
     }
     return list
}

console.log(calcArray('d')) // ["d", "d", "d"]
```

上述的例子我们发现，在`calcArray`中传任何类型的参数，返回的数组都是`any`类型

由于我们不知道传入的数据是什么，所以返回的数据也为`any的数组`

但我们现在想要的效果是：**无论我们传什么类型，都能返回对应的类型**，针对这种情况怎么办？所以此时`泛型`就登场了

## 泛型语法

我们先用泛型对上面的例子进行改造下，

```tsx
const calcArray = <T,>(data:T):T[] => {
     let list:T[] = []
     for(let i = 0; i < 3; i++){
         list.push(data)
     }
     return list
}

const res:string[] = calcArray<string>('d') // ok
const res1:number[] = calcArray<number>(7) // ok

type Props = {
     name: string,
     age: number
}
const res3: Props[] = calcArray<Props>({name: '小杜杜', age: 7}) //ok
```

经过上面的案例，我们发现传入的`字符串`、`数字`、`对象`，都能返回对应的类型，从而达到我们的目的，接下来我们再看看`泛型语法`：

```tsx
function identity <T>(value:T) : T {
   return value
}
```

第一次看到这个`<T>`我们是不是很懵，实际上这个`T`就是**传递的类型**,从上述的例子来看，这个`<T>`就是`<string>`,要注意一点，这个`<string>`实际上是可以省略的，因为 TS 具有**类型推论**，可以自己推断类型

## 多类型传参

我们有多个未知的类型占位，我们可以定义任何的字母来表示不同的参数类型

```tsx
const calcArray = <T,U>(name:T, age:U): {name:T, age:U} => {
      const res: {name:T, age:U} = {name, age}
      return res
}

const res = calcArray<string, number>('小杜杜', 7)
console.log(res) // {"name": "小杜杜", "age": 7}
```

## 泛型接口

当我们不知道对象中的某个值是什么类型时，可以使用泛型来传递该类型：

```tsx
// The type, T, will be passed in
interface Person<T> {
  name: string;
  age: number;
  documents: T;
}

// We have to pass in the type of `documents` - an array of strings in this case
const person1: Person<string[]> = {
  name: 'ConardLi',
  age: 17,
  documents: ['passport', 'bank statement', 'visa'],
};

// Again, we implement the `Person` interface, and pass in the type for documents - in this case a string
const person2: Person<string> = {
  name: 'Tom',
  age: 20,
  documents: 'passport, P45',
};
```



## 泛型类

同样泛型也可以定义类

```tsx
class clacArray<T>{
      private arr: T[] = [];

      add(value: T) {
           this.arr.push(value)
      }
      getValue(): T {
         let res = this.arr[0];
         console.log(this.arr)
         return res;
      }
}

const res = new clacArray()

res.add(1)
res.add(2)
res.add(3)

res.getValue() //[1, 2, 3] 
console.log(res.getValue) // 1
```

## 泛型类型别名

```tsx
type Info<T> = {
     name?: T
     age?: T
}

const res:Info<string> = { name: '小杜杜'}
const res1:Info<number> = { age: 7}
```

## 泛型默认参数

所谓默认参数，是指定类型，如默认值一样，从实际值参数中也无法推断出类型时，这个默认类型就会起作用。

```tsx
const calcArray = <T = string,>(data:T):T[] => {
     let list:T[] = []
     for(let i = 0; i < 3; i++){
         list.push(data)
     }
     return list
}
```

## 泛型常用字母

用常用的字母来表示一些变量的代表：

- **T**：代表**Type**，定义泛型时通常用作第一个类型变量名称
- **K**：代表**Key**，表示对象中的**键类型**；
- **V**：代表**Value**，表示对象中的**值类型**；
- **E**：代表**Element**，表示的**元素类型**；



# 枚举类型

枚举是 `TypeScript` 给 `JavaScript` 带来的一个特殊特性。枚举允许我们定义或声明一组相关值，可以是数字或字符串，作为一组命名常量。

- 枚组的类型默认为**数字类型**，默认从0开始以此累加，如果有设置默认值，则**只会对下面的值产生影响**
- 同时支持**反向映射**（及从成员值到成员名的映射），但智能映射无默认值的情况，并且只能是默认值的前面

## 数字枚举

```tsx
enum ResourceType {
    BOOK,
    AUTHOR,
    FILM,
    DIRECTOR,
    PERSON,
}

console.log(ResourceType.BOOK); // 0
console.log(ResourceType.AUTHOR); // 1
```

```tsx
// 从 1 开始
enum ResourceType {
    BOOK = 1,
    AUTHOR,
    FILM,
    DIRECTOR,
    PERSON,
}

console.log(ResourceType.BOOK); // 1
console.log(ResourceType.AUTHOR); // 2
```



## 字符串枚举

默认情况下，枚举是基于数字的 — 它们将字符串值存储为数字。但它们也可以是字符串：

```tsx
enum Direction {
    Up = 'Up',
    Right = 'Right',
    Down = 'Down',
    Left = 'Left',
}

console.log(Direction.Up) // Up
console.log(Direction.Left) // Left
console.log(Direction.Right); // Right
console.log(Direction.Down); // Down
```

当我们有一组相关的常量时，枚举就可以派上用场了。例如，与在代码中使用非描述性数字不同，枚举通过描述性常量使代码更具可读性。枚举还可以防止错误，因为当你输入枚举的名称时，智能提示将弹出可能选择的选项列表。

## 常量枚举

除了`数字类型`和`字符串类型`之外，还有一种特殊的类型，那就是**常量枚组**，也就是通过`const`去定义`enum`，但这种类型不会编译成任何 `JS`,只会编译对应的值

```tsx
enum Direction {
    A,
    B,
    D = 3,
    E
}

console.log(Direction.A) // 0
console.log(Direction.B) // 1
console.log(Direction.D); // 3
console.log(Direction.E)  // 4
```

## 异构枚举

包含了 `数字类型` 和 `字符串类型` 的混合，反向映射一样的道理

```tsx
enum Direction {
    A,
    B,
    C = 'zhangsan',
    // 第三个类型不同之后接下来要重新指定类型
    D = 3,
    E
}

console.log(Direction.A) // 0
console.log(Direction.B) // 1
console.log(Direction.C); // zhangsan
console.log(Direction.D); // 3
console.log(Direction.E)  // 4
```



# 严格模式

建议在 `tsconfig.json` 中启用所有严格的类型检查操作文件。这可能会导致 `TypeScript` 报告更多的错误，但也更有助于帮你提前发现发现程序中更多的 `bug`。

```tsx
// tsconfig.json
"strict": true
```

> 严格模式实际上就意味着：禁止隐式 any 和 严格的空检查。

## 禁止隐式 any

在下面的函数中，`TypeScript` 已经推断出参数 `a` 是 `any` 类型的。当我们向该函数传递一个数字，并尝试打印一个 `name` 属性时，没有报错：

```tsx
function logName(a) {
  // No error??
  console.log(a.name);
}

logName(97);
```

打开 `noImplicitAny` 选项后，如果我们没有显式地声明 `a` 的类型，`TypeScript` 将立即标记一个错误：

```tsx
// ERROR: Parameter 'a' implicitly has an 'any' type.
function logName(a) {
  console.log(a.name);
}
```

## 严格的空检查

当 `strictNullChecks` 选项为 `false` 时，`TypeScript` 实际上会忽略 `null` 和 `undefined`。这可能会在运行时导致意外错误。

当 `strictNullChecks` 设置为 `true` 时，`null` 和 `undefined` 有它们自己的类型，如果你将它们分配给一个期望具体值(例如，字符串)的变量，则会得到一个类型错误。

```tsx
let whoSangThis: string = getSong();

const singles = [
  { song: 'touch of grey', artist: 'grateful dead' },
  { song: 'paint it black', artist: 'rolling stones' },
];

const single = singles.find((s) => s.song === whoSangThis);

console.log(single.artist);
```

`singles.find` 并不能保证它一定能找到这首歌 — 但是我们已经编写了下面的代码，好像它肯定能找到一样。

通过将 `strictNullChecks` 设置为 `true`， `TypeScript` 将抛出一个错误，因为在尝试使用它之前，我们没有保证 `single` 一定存在：

```tsx
const getSong = () => {
  return 'song';
};

let whoSangThis: string = getSong();

const singles = [
  { song: 'touch of grey', artist: 'grateful dead' },
  { song: 'paint it black', artist: 'rolling stones' },
];

const single = singles.find((s) => s.song === whoSangThis);

console.log(single.artist); // ERROR: Object is possibly 'undefined'.
```

`TypeScript` 基本上是告诉我们在使用 `single` 之前要确保它存在。我们需要先检查它是否为 `null` 或 `undefined`：

```tsx
if (single) {
  console.log(single.artist); // rolling stones
}
```



# TypeScript 类型兼容性

JavaScript 是一门弱类型语言，它对类型是弱校验，正因为这个特点，所以才有了TypeScript这个强类型语言系统的出现，来弥补类型检查的短板。TypeScript在实现类型强校验的同时，还要满足 JavaScript 灵活的特点，所以就有了类型兼容性这个概念。了解类型兼容性可以避免在实际的开发中出现一些低级错误。下面就来看看类型兼容性的概念和分类。

## 1. 类型兼容性的概念

所谓的类型兼容性**用于确定一个类型是否能赋值给其他类型**。TypeScript中的类型兼容性是**基于结构类型**的，结构类型是一种只使用其成员来描述类型的方式。其基本原则是，**如果 x 要兼容 y，那么 y 至少要具有与 x 相同的属性。**

下面来看一个例子，构建一个 `Teacher` 类 ，然后声明一个接口 `Student`，`Student` 的属性 `Teacher` 都有，而且还多了其他的属性，这种情况下 `Student` 就兼容了 `Teacher`：

```tsx
class Teacher {
    constructor(public weight: number, public name: string, public job: string) {
    
    }
}

interface Student {
    name: string
    weight: number
}

let x: Student;
x = new Teacher(120, 'TS', 'teacher') // ✅
```

如果反过来，`Teacher` 并没有兼容 `Student`，因为 `Student` 的属性比 `Person` 少一个。

## 2. 特殊类型的类型兼容性

先来看看 TypeScript 中一些特殊类型的类型兼容性。

### （1）any

`any` 类型可以赋值给除了 `never `之外的任意其他类型，反过来其他类型也可以赋值给 `any`。也就是说 `any` 可以兼容除了 `never` 之外的所有类型，同时也可以被所有的类型兼容。

```tsx
let any: any;

let a: number = any;       // ✅
let b: {} = any;           // ✅
let b: () => number = any; // ✅
```

### （2）never

`never` 类型可以赋值给任何其他类型，但不能被其他任何类型赋值。

```tsx
let never: never = (() => {
  throw Error('never');
})();

let a: number = never;       // ✅
let b: () => number = never; // ✅
let c: {} = never;           // ✅
```

可以看到，这里将 `never` 类型赋值给了 `number`、函数、对象类型，都是没有问题的。

### （3）unknown

`unknown` 和 `never` 的特性是相反的，即不能把 `unknown` 赋值给除了 `any` 之外的任何其他类型，但其他类型都可以赋值给 `unknown`。

```tsx
let unknown: unknown;

const a: number = unknown;       // 不能将类型“unknown”分配给类型“number”。
const b: () => number = unknown; // 不能将类型“unknown”分配给类型“() => number”。
const c: {} = unknown;           // 不能将类型“unknown”分配给类型“{}”。
```

可以看到，当把 `unknown` 类型赋值给 `number`、函数、对象类型时，都报错了，这就是因为类型之间不能兼容。

## 3. 函数类型的类型兼容性

函数的类型兼容性主要包括以下六个方面：

### （1）参数数量

函数参数数量要想兼容，需要满足一个要求：**如果将函数 y 赋值为 x，那么要求 x 中的每个参数都应在 y 中有对应，也就是 x 的参数个数小于等于 y 的参数个数**：

```tsx
let x = (a: number) => 0;
let y = (b: number, c: string) => 0;
```

上面定义的两个函数，如果进行赋值的话，来看下两种情况的结果：

```tsx
y = x;  // ✅
```

将 x 赋值给 y 是可以的，因为 x 的参数个数小于等于 y 的参数个数，而至于参数名是否相同是无所谓的。

而将 y 赋值给 x 就不可以了：

```tsx
x = y; // 不能将类型“(b: number, c: string) => number”分配给类型“(a: number) => number”。
```

这里 y 的参数个数要大于 x，所以报错了。

### （2）函数参数类型

除了参数数量，参数的类型也需要对应：

```tsx
let x = (a: number) => 0;
let y = (b: string) => 0;
x = y; // error 不能将类型“(b: string) => number”分配给类型“(a: number) => number”。
```

可以看到，x 和 y 两个函数的参数个数和返回值都相同，只是参数类型对不上，所以也是不行的。

### （3）剩余参数和可选参数

当要被赋值的函数参数中包含剩余参数（`…args`）时，赋值的函数可以用任意个数参数代替，但是类型需要对应：

```tsx
const getNum = (
  arr: number[],
  callback: (...args: number[]) => number
): number => {
  return callback(...arr);
};

getNum(
  [1, 2],
  (...args: number[]): number => args.length // 返回参数的个数
);
```

剩余参数其实可以看做无数个可选参数，所以在兼容性方面是差不多的。

再来看一个可选参数和剩余参数结合的例子：

```tsx
// 第二个参数callback是一个函数，函数的第二个参数为可选参数
const getNum = (
  arr: number[],
  callback: (arg1: number, arg2?: number) => number 
): number => {
  return callback(...arr); // error 应有 1-2 个参数，但获得的数量大于等于 0
};
```

这里因为 `arr` 可能为空数组，如果为空数组则`…arr`不会给`callback`传入任何实际参数，所以这里就会报错。如果换成`return callback(arr[0], …arr)`就没问题了。

### （4）参数双向协变

函数参数双向协变即**参数类型无需绝对相同**：

```tsx
let funcA = function(arg: number | string): void {};
let funcB = function(arg: number): void {};
// funcA = funcB 和 funcB = funcA都可以
```

这里 `funcA` 和 `funcB` 的参数类型并不完全一样，`funcA` 的参数类型为一个联合类型 `number | string`，而 `funcB` 的参数类型为 `number | string `中的 `number`，这两个函数也是兼容的。

### （5）返回值类型

函数返回值的类型也是要对应的：

```tsx
let x = (a: number): string | number => 0;
let y = (b: number) => "a";
let z = (c: number) => false;
x = y; // ✅
x = z; // 不能将类型“(c: number) => boolean”分配给类型“(a: number) => string | number”
```

这里 x 函数的返回值是联合类型，既可以是 `string` 类型也可以是 `number` 类型。而 y 的返回值类型是 `number` 类型，参数个数和类型也没问题，所以可以赋值给 x。而 z 的返回值类型 `false` 并不是 `string` 也不是 `number`，所以不能赋值。

### （6）函数重载

带有重载的函数，要求被赋值的函数的每个重载都能在用来赋值的函数上找到对应的签名：

```tsx
function merge(arg1: number, arg2: number): number; // merge函数重载的一部分
function merge(arg1: string, arg2: string): string; // merge函数重载的一部分
function merge(arg1: any, arg2: any) { // merge函数实体
  return arg1 + arg2;
}
function sum(arg1: number, arg2: number): number; // sum函数重载的一部分
function sum(arg1: any, arg2: any): any { // sum函数实体
  return arg1 + arg2;
}
let func = merge;
func = sum; // error 不能将类型“(arg1: number, arg2: number) => number”分配给类型“{ (arg1: number, arg2: number): number; (arg1: string, arg2: string): string; }”
```

`sum` 函数的重载缺少参数都为`string`返回值为`string`的情况，与`merge`函数不兼容，所以赋值时就会报错。

## 枚举的类型兼容性

数字枚举成员类型与数字类型是互相兼容的：

```tsx
enum Status {
  On,
  Off
}
let s = Status.On;
s = 1;
s = 3;
```

虽然 `Status.On` 的值是 0，但是因为数字枚举成员类型和数值类型是互相兼容的，所以这里给`s`赋值为 3 是没问题的。但是不同枚举值之间是不兼容的：

```tsx
enum Status {
  On,
  Off
}
enum Color {
  White,
  Black
}
let s = Status.On;
s = Color.White; // 不能将类型“Color.White”分配给类型“Status”。
```

虽然 `Status.On` 和 `Color.White` 的值都是 0，但它们是不兼容的。

字符串枚举成员类型和字符串类型是不兼容的：

```tsx
enum Status {
  On = 'on',
  Off = 'off'
}
let s = Status.On
s = 'TypeScript' // 不能将类型"TypeScript"分配给类型“Status”
```

这里会报错，因为字符串字面量类型`'TypeScript'`和`Status.On`是不兼容的。

## 4. 类类型的类型兼容性

比较两个类的类型兼容性时，**只有实例成员和方法会相比较，类的静态成员和构造函数不进行比较**：

```tsx
class Animal {
  static age: number;
  constructor(public name: string) {}
}

class People {
  static age: string;
  constructor(public name: string) {}
}

class Food {
  constructor(public name: number) {}
}

let a: Animal;
let p: People;
let f: Food;
a = p; // ok
a = f; // 不能将类型“Food”分配给类型“Animal”。
```

`Animal`类和`People`类都有一个`age`静态属性，它们都定义了实例属性`name`，类型是`string`。把类型为`People`的`p`赋值给类型为`Animal`的`a`是没有问题的，因为类类型比较兼容性时，只比较实例的成员，这两个变量虽然类型是不同的类类型，但是它们都有相同字段和类型的实例属性`name`，而类的静态成员是不影响兼容性的，所以它俩时兼容的。而类`Food`定义了一个实例属性`name`，类型为`number`，所以类型为`Food`的`f`与类型为`Animal`的`a`类型是不兼容的，不能赋值。

**类的私有成员和受保护成员：**

类的私有成员和受保护成员会影响类的兼容性。当检查类的实例兼容性时，如果目标（要被赋值的那个值）类型（这里实例类型就是创建它的类）包含一个私有成员，那么源（用来赋值的值）类型必须包含来自同一个类的这个私有成员，这就允许子类赋值给父类：

```tsx
class Parent {
  private age: number;
  constructor() {}
}

class Children extends Parent {
  constructor() {
    super();
  }
}

class Other {
  private age: number;
  constructor() {}
}

const children: Parent = new Children();
const other: Parent = new Other(); // 不能将类型“Other”分配给类型“Parent”。类型具有私有属性“age”的单独声明
```

当指定 `other` 为 `Parent` 类类型，给 `other` 赋值 `Other` 创建的实例的时候，会报错。因为 `Parent` 的 `age` 属性是私有成员，外面是无法访问到的，所以会类型不兼容。而`children`的类型我们指定为了`Parent`类类型，然后给它赋值为`Children`类的实例，没有问题，是因为`Children`类继承`Parent`类，且实例属性没有差异，`Parent`类有私有属性`age`，但是因为`Children`类继承了`Parent`类，所以可以赋值。

同样，使用 `protected` 受保护修饰符修饰的属性，也是一样的：

```tsx
class Parent {
  protected age: number;
  constructor() {}
}

class Children extends Parent {
  constructor() {
    super();
  }
}

class Other {
  protected age: number;
  constructor() {}
}

const children: Parent = new Children();
const other: Parent = new Other(); // 不能将类型“Other”分配给类型“Parent”。属性“age”受保护，但类型“Other”并不是从“Parent”派生的类
```

## 6. 泛型类型兼容性

泛型中包含类型参数，这个类型参数可能是任何类型，使用时类型参数会被指定为特定的类型，而这个类型只影响使用了类型参数的部分：

```tsx
interface Data<T> {}

let data1: Data<number>;
let data2: Data<string>;
data1 = data2; // ✅
```

`data1` 和 `data2` 都是 Data 接口的实现，但是指定的泛型参数的类型不同，TS 是结构性类型系统，所以上面将 `data2` 赋值给 `data1` 是兼容的，因为 `data2` 指定了类型参数为 `string` 类型，但是接口里没有用到参数 `T`，所以传入 `string` 类型还是传入 `number` 类型并没有影响。

再来看个例子：

```tsx
interface Data<T> {
  data: T;
}

let data1: Data<number>;
let data2: Data<string>;
data1 = data2; // 不能将类型“Data<string>”分配给类型“Data<number>”。不能将类型“string”分配给类型“number”
```

现在结果就不一样了，赋值时报错，因为 `data1` 和 `data2` 传入的泛型参数类型不同，生成的结果结构是不兼容的。







# Vue3+TS⭐⭐

## 创建项目

<img src="https://mmbiz.qpic.cn/mmbiz_png/pfCCZhlbMQSrTfNXN9SnV6X5ALYibHo2RWhGJMQjAhxTtPZjEOB9GzOnqADKrrcRibESH6KP8rHC6iaVdjRFWWE9w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:80%;" />



## 基础语法

### 定义data

- script标签上lang="ts"
- 定义一个类型`type`或者接口`interface`来约束`data`
- 可以使用`ref`或者`toRefs`来定义响应式数据
- 使用`ref`在`setup`读取的时候需要获取`xxx.value`,但在`template`中不需要
- 使用`reactive`时，可以用`toRefs`解构导出，在`template`就可以直接使用了

```vue
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';

type Todo = {
  id: number,
  name: string,
  completed: boolean
}

export default defineComponent({
  const data = reactive({
    todoList: [] as Todo[]
  })
  const count = ref(0);
  console.log(count.value)
  return {
    ...toRefs(data)
  }
})
</script>
```

### 定义props

`props`需要使用`PropType`泛型来约束。

```vue
<script lang="ts">
import { defineComponent, PropType} from 'vue';

interface UserInfo = {
  id: number,
  name: string,
  age: number
}

export default defineComponent({
  props: {
    userInfo: {
      type: Object as PropType<UserInfo>, // 泛型类型
      required: true
    }
  },
})
</script>
```

### 定义methods

```vue
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';

type Todo = {
  id: number,
  name: string,
  completed: boolean
}

export default defineComponent({
  const data = reactive({
    todoList: [] as Todo[]
  })
  // 约束输入和输出类型
  const newTodo = (name: string):Todo  => {
    return {
      id: this.items.length + 1,
      name,
      completed: false
    };
  }
  const addTodo = (todo: Todo): void => {
    data.todoList.push(todo)
  }
  return {
    ...toRefs(data),
    newTodo,
    addTodo
  }
})
</script>
```

## vue-router

- `createRouter`创建`router`实例
- `router`的模式分为：
- `createWebHistory` -- history模式
- `createWebHashHistory` -- hash模式
- `routes`的约束类型是`RouteRecordRaw`

```tsx
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];
```

```tsx
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
```

### 扩展路由额外属性

在实际项目开发中，常常会遇到这么一个场景，某一个路由是不需要渲染到侧边栏导航上的，此时我们可以给该路由添加一个hidden属性来实现。

在ts的强类型约束下，添加额外属性就会报错，那么我们就需要扩展`RouteRecordRaw`类型。

```tsx
// 联合类型
type RouteConfig = RouteRecordRaw & {hidden?: boolean}; //hidden 是可选属性
const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    hidden: true,
    meta: {
      permission: true,
      icon: ''
    }
  }
];
```

### 在setup中使用

需要导入`useRouter`创建一个`router`实例。

```vue
<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';
export default defineComponent({
  setup () {
    const router = useRouter();
    goRoute(path) {
       router.push({path})
    }
  }
})
</script>
```

## vuex

### 使用this.$store

```tsx
import { createStore } from 'vuex';
export type State = {
  count: number
}

export default createStore({
  state: {
    count: 0
  }
});
```

需要创建一个声明文件`vuex.d.ts`

```tsx
// vuex.d.ts
import {ComponentCustomProperties} from 'vue';
import {Store} from 'vuex';
import {State} from './store'
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}
```

### 在setup中使用

1. 定义InjecktionKey
2. 在安装插件时传入key
3. 在使用useStore时传入

```tsx
import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

export type State = {
  count: number
}
// 创建一个injectionKey
export const key: InjectionKey<Store<State>> = Symbol('key');
```

```tsx
// main.ts
import store, { key } from './store';
app.use(store, key);
```

```tsx
<script lang="ts">
import { useStore } from 'vuex';
import { key } from '@/store';
export default defineComponent({
  setup () {
    const store = useStore(key);
    const count = computed(() => store.state.count);
    return {
      count
    }
  }
})
</script>
```

### 模块

新增一个`todo`模块。导入的模块，需要是一个`vuex`中的interface `Module`的对象,接收两个泛型约束，第一个是**该模块类型**，第二个是**根模块类型**。

```tsx
// modules/todo.ts
import { Module } from 'vuex';
import { State } from '../index.ts';

type Todo = {
  id: number,
  name: string,
  completed: boolean
}

const initialState = {
  todos: [] as Todo[]
};

export type TodoState = typeof initialState;

export default {
  namespaced: true,
  state: initialState,
  mutations: {
    addTodo (state, payload: Todo) {
      state.todos.push(payload);
    }
  }
} as Module<TodoState, State>; //Module<S, R> S 该模块类型 R根模块类型
```

```tsx
// index.ts
export type State = {
  count: number,
  todo?: TodoState // 这里必须是可选，不然state会报错
}

export default createStore({
  state: {
    count: 0
  }
  modules: {
    todo
  }
});
```

使用：

```tsx
setup () {
  console.log(store.state.todo?.todos);
}
```

## elementPlus

```apl
yarn add element-plus
```

### 完整引入

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
const app = createApp(App)
app.use(ElementPlus, { size: 'small', zIndex: 3000, locale })
app.mount('#app')
```

### 按需加载

需要安装`babel-plugin-component`插件:

```tsx
yarn add babel-plugin-component -D

// babel.config.js
plugins: [
    [
      'component',
      {
        libraryName: 'element-plus',
        styleLibraryName: 'theme-chalk'
      }
    ]
]
```

```tsx
import 'element-plus/lib/theme-chalk/index.css';
import 'dayjs/locale/zh-cn';
import locale from 'element-plus/lib/locale';
import lang from 'element-plus/lib/locale/lang/zh-cn';
import {
  ElAside,
  ElButton,
  ElButtonGroup,
} from 'element-plus';

const components: any[] = [
  ElAside,
  ElButton,
  ElButtonGroup,
];

const plugins:any[] = [
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification
];

const element = (app: any):any => {
  // 国际化
  locale.use(lang);
  // 全局配置
  app.config.globalProperties.$ELEMENT = { size: 'small' };
  
  components.forEach(component => {
    app.component(component.name, component);
  });

  plugins.forEach(plugin => {
    app.use(plugin);
  });
};

export default element;
```

```ts
// main.ts
import element from './plugin/elemment'

const app = createApp(App);
element(app);
```



## axios

axios的安装使用和vue2上没有什么大的区别，如果需要做一些扩展属性，还是需要声明一个新的类型。

```js
type Config = AxiosRequestConfig & {successNotice? : boolean, errorNotice? : boolean}

import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || '',
  timeout: 120 * 1000,
  withCredentials: true
});

// 错误处理
const err = (error) => {
  if (error.message.includes('timeout')) {
    ElMessage({
      message: '请求超时，请刷新网页重试',
      type: 'error'
    });
  }
  if (error.response) {
    const data = error.response.data;
    if (error.response.status === 403) {
      ElMessage({
        message: 'Forbidden',
        type: 'error'
      });
    }
    if (error.response.status === 401) {
      ElMessage({
        message: 'Unauthorized',
        type: 'error'
      });
    }
  }
  return Promise.reject(error);
};

type Config = AxiosRequestConfig & {successNotice? : boolean, errorNotice? : boolean}

// 请求拦截
instance.interceptors.request.use((config: Config) => {
  config.headers['Access-Token'] = localStorage.getItem('token') || '';
  return config;
}, err);

// 响应拦截
instance.interceptors.response.use((response: AxiosResponse) => {
  const config: Config = response.config;

  const code = Number(response.data.status);
  if (code === 200) {
    if (config && config.successNotice) {
      ElMessage({
        message: response.data.msg,
        type: 'success'
      });
    }
    return response.data;
  } else {
    let errCode = [402, 403];
    if (errCode.includes(response.data.code)) {
      ElMessage({
        message: response.data.msg,
        type: 'warning'
      });
    }
  }
}, err);

export default instance;
```

## setup script

官方提供了一个**实验性**的写法，直接在`script`里面写`setup`的内容，即：`setup script`。

之前我们写组件是这样的：

```vue
<template>
  <div>
    {{count}}
    <ImgReview></ImgReview >
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue";
import ImgReview from "./components/ImgReview.vue";

export default defineComponent({
  components: {
    ImgReview,
  },
  setup() {
    const count = ref(0);
    return { count };
  }
});
</script>
```

启用`setup script`后：在`script`上加上`setup`

```vue
<template>
  <div>
    {{count}}
    <ImgReview></ImgReview>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import ImgReview from "./components/ImgReview.vue";
const count = ref(0);
</script>
```

是不是看起来简洁了很多，组件直接导入就行了，不用注册组件，数据定义了就可以用。其实我们可以简单的理解为`script`包括的内容就是`setup`中的，并做了`return`。

### 导出方法

```js
<script lang="ts" setup>
const handleClick = (type: string) => {
  console.log(type);
}
</script>
```

### 定义props

使用`props`需要用到`defineProps`来定义，具体用法跟之前的`props`写法类似：

#### 基础用法

```js
<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps(['userInfo', 'gameId']);
</script>
```

#### 构造函数进行检查 给props定义类型：

```js
const props = defineProps({
  gameId: Number,
  userInfo: {
      type: Object,
      required: true
  }
});
```

#### 使用类型注解进行检查

```js
defineProps<{
  name: string
  phoneNumber: number
  userInfo: object
  tags: string[]
}>()
```

可以先定义好类型：

```js
interface UserInfo {
  id: number,
  name: string,
  age: number
}

defineProps<{
  name: string
  userInfo: UserInfo
}>()
```

### defineEmit

```js
<script lang="ts" setup>
import { defineEmit } from 'vue';

// expects emits options
const emit = defineEmit(['kk', 'up']);
const handleClick = () => {
  emit('kk', '点了我');
};
</script>
复制代码
<Comp @kk="handleClick"/>

<script lang="ts" setup>
const handleClick = (data) => {
  console.log(data)
}
</script>
```

### 获取上下文

在标准组件写法里，setup 函数默认支持两个入参：

|  参数   |  类型  |          含义          |
| :-----: | :----: | :--------------------: |
|  props  | object | 由父组件传递下来的数据 |
| context | object |    组件的执行上下文    |

在setup script 中使用useContext获取上下文：

```js
<script lang="ts" setup>
 import { useContext } from 'vue'
 const { slots, attrs } = useContext();
</script>
```

获取到的`slots`,`attrs`跟`setup`里面的是一样的。





























