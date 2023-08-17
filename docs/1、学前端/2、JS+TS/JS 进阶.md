



# 常用字符串方法及使用技巧

今天我们来看看JavaScript中有哪些常用的字符串方法！

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212221453847.png" alt="image-20221222145326647" style="zoom:80%;" />

## 获取字符串长度

JavaScript中的字符串有一个length属性，该属性可以用来获取字符串的长度：

```js
const str = 'hello';
str.length   // 输出结果：5
```

## 获取字符串指定位置的值

charAt()和charCodeAt()方法都可以通过索引来获取指定位置的值：

- charAt() 方法获取到的是指定位置的字符；
- charCodeAt()方法获取的是指定位置字符的Unicode值。

### 1 charAt()

charAt() 方法可以返回指定位置的字符。其语法如下：

```js
string.charAt(index)
```

index表示字符在字符串中的索引值：

```js
const str = 'hello';
str.charAt(1)  // 输出结果：e
```

我们知道，字符串也可以通过索引值来直接获取对应字符，那它和charAt()有什么区别呢？来看例子：

```js
const str = 'hello';
str.charAt(1)  // 输出结果：e 
str[1]         // 输出结果：e 
str.charAt(5)  // 输出结果：'' 
str[5]         // 输出结果：undefined
```

可以看到，当index的取值不在str的长度范围内时，str[index]会返回undefined，而charAt(index)会返回空字符串；除此之外，str[index]不兼容ie6-ie8，charAt(index)可以兼容。

### 2 charCodeAt()

`charCodeAt()`：该方法会返回指定索引位置字符的 Unicode 值，返回值是 0 - 65535 之间的整数，表示给定索引处的 UTF-16 代码单元，如果指定位置没有字符，将返回 **NaN**：

```js
let str = "abcdefg";
console.log(str.charCodeAt(1)); // "b" --> 98
```

通过这个方法，可以获取字符串中指定Unicode编码值范围的字符。比如，数字0～9的Unicode编码范围是: 48～57，可以通过这个方法来筛选字符串中的数字，当然如果你更熟悉正则表达式，会更方便。

## 检索字符串是否包含特定序列

这5个方法都可以用来检索一个字符串中是否包含特定的序列。其中前两个方法得到的指定元素的索引值，并且只会返回第一次匹配到的值的位置。后三个方法返回的是布尔值，表示是否匹配到指定的值。

注意：这5个方法都对大小写敏感！

### 1 indexOf()

`indexOf()`：查找某个字符，**有则返回第一次匹配到的位置**，否则返回-1，其语法如下：

```js
string.indexOf(searchvalue,fromindex)
```

该方法有两个参数：

- searchvalue：必须，规定需检索的字符串值；
- fromindex：可选的整数参数，规定在字符串中开始检索的位置。它的合法取值是 0 到 string.length - 1。如省略该，则从字符串的首字符开始检索。

```js
let str = "abcdefgabc";
console.log(str.indexOf("a"));   // 输出结果：0
console.log(str.indexOf("z"));   // 输出结果：-1
console.log(str.indexOf("c", 4)) // 输出结果：9
```

### 2 lastIndexOf()

`lastIndexOf()`：查找某个字符，有则返回最后一次匹配到的位置，否则返回-1

```js
let str = "abcabc";
console.log(str.lastIndexOf("a"));  // 输出结果：3
console.log(str.lastIndexOf("z"));  // 输出结果：-1
```

该方法和indexOf()类似，只是查找的顺序不一样，indexOf()是正序查找，lastIndexOf()是逆序查找。

### 3 includes()

`includes()`：该方法用于判断字符串是否包含指定的子字符串。如果找到匹配的字符串则返回 true，否则返回 false。该方法的语法如下：

```js
string.includes(searchvalue, start)
```

该方法有两个参数：

- searchvalue：必须，要查找的字符串；
- start：可选，设置从那个位置开始查找，默认为 0。

```js
let str = 'Hello world!';

str.includes('o')  // 输出结果：true
str.includes('z')  // 输出结果：false
str.includes('e', 2)  // 输出结果：false
```

### 4 startsWith()

`startsWith()`：该方法用于检测字符串**是否以指定的子字符串开始**。如果是以指定的子字符串开头返回 true，否则 false。其语法和上面的includes()方法一样。

```js
let str = 'Hello world!';

str.startsWith('Hello') // 输出结果：true
str.startsWith('Helle') // 输出结果：false
str.startsWith('wo', 6) // 输出结果：true
```

### 5 endsWith()

`endsWith()`：该方法用来判断当前字符串**是否是以指定的子字符串结尾**。如果传入的子字符串在搜索字符串的末尾则返回 true，否则将返回 false。其语法如下：

```js
string.endsWith(searchvalue, length)
```

该方法有两个参数：

- searchvalue：必须，要搜索的子字符串；
- length：设置字符串的长度，默认值为原始字符串长度 string.length。

```js
let str = 'Hello world!';

str.endsWith('!')       // 输出结果：true
str.endsWith('llo')     // 输出结果：false
str.endsWith('llo', 5)  // 输出结果：true
```

可以看到，当第二个参数设置为5时，就会从字符串的前5个字符中进行检索，所以会返回true。

## 连接多个字符串

concat() 方法用于连接两个或多个字符串。该方法不会改变原有字符串，会返回连接两个或多个字符串的新字符串。其语法如下：

```js
string.concat(string1, string2, ..., stringX)
```

其中参数 string1, string2, ..., stringX 是必须的，他们将被连接为一个字符串的一个或多个字符串对象。

```js
let str = "abc";
console.log(str.concat("efg"));          //输出结果："abcefg"
console.log(str.concat("efg","hijk")); //输出结果："abcefghijk"
```

虽然concat()方法是专门用来拼接字符串的，但是在开发中使用最多的还是加操作符+，因为其更加简单。

## 字符串分割成数组

split() 方法用于把一个字符串分割成字符串数组。该方法不会改变原始字符串。其语法如下：

```js
string.split(separator,limit)
```

该方法有两个参数：

- separator：必须。字符串或正则表达式，从该参数指定的地方分割 string。
- limit：可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。

```js
let str = "abcdef";
str.split("c");    // 输出结果：["ab", "def"]
str.split("", 4)   // 输出结果：['a', 'b', 'c', 'd'] 
```

如果把空字符串用作 separator，那么字符串中的每个字符之间都会被分割。

```js
str.split("");     // 输出结果：["a", "b", "c", "d", "e", "f"]
```

其实在将字符串分割成数组时，可以同时拆分多个分割符，使用正则表达式即可实现：

```js
const list = "apples,bananas;cherries"
const fruits = list.split(/[,;]/)
console.log(fruits);  // 输出结果：["apples", "bananas", "cherries"]
```

## 截取字符串

substr()、substring()和 slice() 方法都可以用来截取字符串。

### 1 slice()

slice() 方法用于提取字符串的某个部分，并以新的字符串返回被提取的部分。其语法如下：

```js
string.slice(start,end)
```

该方法有两个参数：

- start：必须。要截取的片断的起始下标，第一个字符位置为 0。如果为负数，则从尾部开始截取。
- end：可选。要截取的片段结尾的下标。若未指定此参数，则要提取的子串包括 start 到原字符串结尾的字符串。如果该参数是负数，那么它规定的是从字符串的尾部开始算起的位置。

上面说了，如果start是负数，则该参数规定的是从字符串的尾部开始算起的位置。也就是说，-1 指字符串的最后一个字符，-2 指倒数第二个字符，以此类推：

```js
let str = "abcdefg";
str.slice(1,6);   // 输出结果："bcdef" 
str.slice(1);     // 输出结果："bcdefg" 
str.slice();      // 输出结果："abcdefg" 
str.slice(-2);    // 输出结果："fg"
str.slice(6, 1);  // 输出结果：""
```

注意，该方法返回的子串**包括开始处的字符**，但**不包括结束处的字符**。

### 2 substr()

substr() 方法用于在字符串中抽取从开始下标开始的指定数目的字符。其语法如下：

```js
string.substr(start,length)
```

该方法有两个参数：

- start ：必须。要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。
- length：可选。子串中的字符数。必须是数值。如果省略了该参数，那么返回从 stringObject 的开始位置到结尾的字串。

```js
let str = "abcdefg";
str.substr(1,6); // 输出结果："bcdefg" 
str.substr(1);   // 输出结果："bcdefg" 相当于截取[1,str.length-1]
str.substr();    // 输出结果："abcdefg" 相当于截取[0,str.length-1]
str.substr(-1);  // 输出结果："g"
```

### 3 substring()

substring() 方法用于提取字符串中介于两个指定下标之间的字符。其语法如下：

```js
string.substring(from, to)
```

该方法有两个参数：

- from：必须。一个非负的整数，规定要提取的子串的第一个字符在 string 中的位置。
- to：可选。一个非负的整数，比要提取的子串的最后一个字符在 string 中的位置多 1。如果省略该参数，那么返回的子串会一直到字符串的结尾。

**注意：** 如果参数 from 和 to 相等，那么该方法返回的就是一个空串（即长度为 0 的字符串）。如果 from 比 to 大，那么该方法在提取子串之前会先交换这两个参数。并且该方法不接受负的参数，如果参数是个负数，就会返回这个字符串。

```js
let str = "abcdefg";
str.substring(1,6); // 输出结果："bcdef" [1,6)
str.substring(1);   // 输出结果："bcdefg" [1,str.length-1]
str.substring();    // 输出结果："abcdefg" [0,str.length-1]
str.substring(6,1); // 输出结果 "bcdef" [1,6)
str.substring(-1);  // 输出结果："abcdefg"
```

注意，该方法返回的子串**包括开始处的字符**，但**不包括结束处的字符**。

## 字符串大小写转换

toLowerCase() 和 toUpperCase()方法可以用于字符串的大小写转换。

### 1 toLowerCase()

`toLowerCase()`：该方法用于把字符串转换为小写。

```js
let str = "adABDndj";
str.toLowerCase(); // 输出结果："adabdndj"
```

### 2 toUpperCase()

`toUpperCase()`：该方法用于把字符串转换为大写。

```js
let str = "adABDndj";
str.toUpperCase(); // 输出结果："ADABDNDJ"
```

我们可以用这个方法来将字符串中第一个字母变成大写：

```js
let word = 'apple'
word = word[0].toUpperCase() + word.substr(1)
console.log(word) // 输出结果："Apple"
```

## 字符串模式匹配

replace()、match()和search()方法可以用来匹配或者替换字符。

### replace()

`replace()`：该方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。语法如下

```js
string.replace(searchvalue, newvalue)
```

该方法有两个参数：

- searchvalue：必须。规定子字符串或要替换的模式的 RegExp 对象。如果该值是一个字符串，则将它作为要检索的直接量文本模式，而不是首先被转换为 RegExp 对象。
- newvalue：必须。一个字符串值。规定了替换文本或生成替换文本的函数。

```js
let str = "abcdef";
str.replace("c", "z") // 输出结果：abzdef
```

执行一个全局替换, 忽略大小写:

```js
let str="Mr Blue has a blue house and a blue car";
str.replace(/blue/gi, "red");    // 输出结果：'Mr red has a red house and a red car'
```

**注意：** 如果 regexp 具有全局标志 g，那么 replace() 方法将替换所有匹配的子串。否则，它只替换第一个匹配子串。

### match()

`match()`：该方法用于在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。该方法类似 indexOf() 和 lastIndexOf()，但是它返回指定的值，而不是字符串的位置。其语法如下：

```js
string.match(regexp)
```

该方法的参数 regexp 是必须的，规定要匹配的模式的 RegExp 对象。如果该参数不是 RegExp 对象，则需要首先把它传递给 RegExp 构造函数，将其转换为 RegExp 对象。

**注意：** 该方法返回存放匹配结果的数组。该数组的内容依赖于 regexp 是否具有全局标志 g。

```js
let str = "abcdef";
console.log(str.match("c")) // ["c", index: 2, input: "abcdef", groups: undefined]
```

### search()

`search()`方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。其语法如下：

```js
string.search(searchvalue)
```

该方法的参数 regex 可以是需要在 string 中检索的子串，也可以是需要检索的 RegExp 对象。

**注意：** 要执行忽略大小写的检索，请追加标志 i。该方法不执行全局匹配，它将忽略标志 g，也就是只会返回第一次匹配成功的结果。如果没有找到任何匹配的子串，则返回 -1。

**返回值：** 返回 str 中第一个与 regexp 相匹配的子串的起始位置。

```js
let str = "abcdef";
str.search(/bcd/)   // 输出结果：1
```

## 移除字符串收尾空白符

trim()、trimStart()和trimEnd()这三个方法可以用于移除字符串首尾的头尾空白符，空白符包括：空格、制表符 tab、换行符等其他空白符等。

### trim()

trim() 方法用于移除字符串首尾空白符，该方法不会改变原始字符串：

```js
let str = "  abcdef  "
str.trim()    // 输出结果："abcdef"
```

注意，该方法不适用于null、undefined、Number类型。

### trimStart()

trimStart() 方法的的行为与`trim()`一致，不过会返回一个**从原始字符串的开头删除了空白的新字符串**，不会修改原始字符串：

```js
const s = '  abc  ';

s.trimStart()   // "abc  "
```

### trimEnd()

trimEnd() 方法的的行为与`trim()`一致，不过会返回一个**从原始字符串的结尾删除了空白的新字符串**，不会修改原始字符串：

```js
const s = '  abc  ';

s.trimEnd()   // "  abc"
```

## 获取字符串本身

valueOf()和toString()方法都会返回字符串本身的值，感觉用处不大。

### 1 valueOf()

`valueOf()`：返回某个字符串对象的原始值，该方法通常由 JavaScript 自动进行调用，而不是显式地处于代码中。

```js
let str = "abcdef"
console.log(str.valueOf()) // "abcdef"
```

### 2 toString()

`toString()`：返回字符串对象本身

```js
let str = "abcdef"
console.log(str.toString()) // "abcdef"
```

## 重复一个字符串

repeat() 方法返回一个新字符串，表示将原字符串重复n次：

```js
'x'.repeat(3)     // 输出结果："xxx"
'hello'.repeat(2) // 输出结果："hellohello"
'na'.repeat(0)    // 输出结果：""
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

## 补齐字符串长度

padStart()和padEnd()方法用于补齐字符串的长度。如果某个字符串不够指定长度，会在头部或尾部补全。

### 1 padStart()

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
'x'.padStart(4) // '   x'
```

padStart()的常见用途是为数值补全指定位数，笔者最近做的一个需求就是将返回的页数补齐为三位，比如第1页就显示为001，就可以使用该方法来操作：

```js
"1".padStart(3, '0')   // 输出结果： '001'
"15".padStart(3, '0')  // 输出结果： '015'
```

### 2 padEnd()

`padEnd()`用于尾部补全。该方法也是接收两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串：

```js
'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```

## 字符串转为数字

parseInt()和parseFloat()方法都用于将字符串转为数字。

### 1 parseInt()

parseInt() 方法用于可解析一个字符串，并返回一个整数。其语法如下：

```js
parseInt(string, radix)
```

该方法有两个参数：

- string：必须。要被解析的字符串。
- radix：可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。

当参数 radix 的值为 0，或没有设置该参数时，parseInt() 会根据 string 来判断数字的基数。

```js
parseInt("10");     // 输出结果：10
parseInt("17",8);    // 输出结果：15 (8+7)
parseInt("010");    // 输出结果：10 或 8
```

当参数 radix 的值以 “0x” 或 “0X” 开头，将以 16 为基数：

```js
parseInt("0x10")      // 输出结果：16
```

如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN：

```js
parseInt("50", 1)      // 输出结果：NaN
parseInt("50", 40)     // 输出结果：NaN
```

只有字符串中的第一个数字会被返回，当遇到第一个不是数字的字符为止:

```js
parseInt("40 4years")   // 输出结果：40
```

如果字符串的第一个字符不能被转换为数字，就会返回 NaN：

```js
parseInt("new100")     // 输出结果：NaN
```

字符串开头和结尾的空格是允许的：

```js
parseInt("  60  ")    // 输出结果：60
```

### 2 parseFloat()

parseFloat() 方法可解析一个字符串，并返回一个浮点数。该方法指定字符串中的首个字符是否是数字。如果是，则对字符串进行解析，直到到达数字的末端为止，然后以数字返回该数字，而不是作为字符串。其语法如下：

```js
parseFloat(string)
```

parseFloat 将它的字符串参数解析成为浮点数并返回。如果在解析过程中遇到了正负号（+ 或 -）、数字 (0-9)、小数点，或者科学记数法中的指数（e 或 E）以外的字符，则它会忽略该字符以及之后的所有字符，返回当前已经解析到的浮点数。同时参数字符串首位的空白符会被忽略。

```js
parseFloat("10.00")      // 输出结果：10.00
parseFloat("10.01")      // 输出结果：10.01
parseFloat("-10.01")     // 输出结果：-10.01
parseFloat("40.5 years") // 输出结果：40.5
```

如果参数字符串的第一个字符不能被解析成为数字，则 parseFloat 返回 NaN。

```js
parseFloat("new40.5")    // 输出结果：NaN
```



# 深入浅出 JavaScript 数组

[深入浅出 JavaScript 数组](https://mp.weixin.qq.com/s?__biz=MzU2MTIyNDUwMA==&mid=2247508277&idx=1&sn=95d8453b3b62b1269fad9613255fd014&chksm=fc7eef6ecb0966784404dcea6984423feb43a46a682d66ad3b88c0b582dafad50a19de889b69&mpshare=1&scene=23&srcid=1221BYlNuFJCJkCh82LwjRzx&sharer_sharetime=1671552609141&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

今天来重学 JavaScript 中的数组，看看有哪些你不知道的细节！

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212221002693.png" alt="image-20221222100207492" style="zoom:80%;" />

## 数组基础

### 1. 数组概述

数组是最常用的数据类型之一，ECMAScript数组跟其他语言的数组一样，都是一组有序的数据，但跟其他语言不同的是，数组中每个槽位可以存储任意类型的数据。除此之外，ECMAScript数组的长度也是动态的，会随着数据的增删而改变。

数组是被等分为许多小块的连续内存段，每个小块都和一个整数关联，可以通过这个整数快速访问对应的小块。除此之外，数组拥有一个length属性，该属性表示的并不是数组元素的数量，而是指数组元素的最高序号加1。

```js
let a = [1, 2, 3];
a.length === 3  // true
```

在ES6中，可以使用扩展运算符（...）来获取数组元素：

```js
let a = [1, 2, 3];
let b = [0, ...a, 4];  // [0, 1, 2, 3, 4]
```

### 2. 数组创建

数组的创建方式有以下两种。

#### （1）字面量

最常用的创建数组的方式就是**数组字面量，**数组元素的类型可以是任意的，如下：

```js
let colors = ["red", [1, 2, 3], true];  
```

#### （2）构造函数

使用构造函数创建数组的形式如下：

```js
let array = new Array(); 
```

如果已知数组元素数量，那么就可以给构造函数传入一个数值，然后length属性就会被自动创建并保存这个值，比如创建一个长度为10的数组：

```js
let array = new Array();  // [undefined × 10]
```

这样，就可以创建一个长度为10的数组，数组每个元素的值都是undefined。

还可以给Array构造函数传入要保存的元素，比如：

```js
let colors = new Array("red", "blue", "green");  
```

这就出现问题了，当我们创建数组时，如果给数组传入一个值，如果传入的值是数字，那么就会创建一个长度为指定数字的数组；如果这个值是其他类型，就会创建一个质保函该特定制度额数组。这样我们就无法直接创建一个只包含一个数字的数组了。

Array 构造函数根据参数长度的不同，有如下两种不同的处理方式：

- **new Array(arg1, arg2,…)**：参数长度为 0 或长度大于等于 2 时，传入的参数将按照顺序依次成为新数组的第 0 至第 N 项（参数长度为 0 时，返回空数组）；
- **new Array(length)**：当 length 不是数值时，返回一个只包含 length 元素一项的数组；当 length 为数值时，length 最大不能超过 32 位无符号整型，即需要小于 2，否则将抛出 RangeError。

在使用Array构造函数时，也可以省略 new 操作符，结果是一样的：

```js
let array = Array();  
```

#### （3）ES6 构造器

鉴于数组的常用性，ES6 专门扩展了数组构造器 Array ，新增了 2 个方法：`Array.of`和`Array.from`。`Array.of` 用得比较少，`Array.from` 具有很强的灵活性。

**1）Array.of**

Array.of 用于**将参数依次转化为数组项**，然后返回这个新数组。它基本上与 Array 构造器功能一致，唯一的区别就在单个数字参数的处理上。

比如，在下面的代码中，可以看到：当参数为2个时，返回的结果是一致的；当参数是一个时，Array.of 会把参数变成数组里的一项，而构造器则会生成长度和第一个参数相同的空数组：

```js
Array.of(8.0); // [8]
Array(8.0); // [empty × 8]

Array.of(8.0, 5); // [8, 5]
Array(8.0, 5); // [8, 5]

Array.of('8'); // ["8"]
Array('8'); // ["8"]
```

**2）Array.from**

`Array.from` 的设计初衷是快速基于其他对象创建新数组，准确来说就是从一个类似数组的可迭代对象中创建一个新的数组实例。其实，只要一个对象有迭代器，`Array.from` 就能把它变成一个数组（注意：该方法会返回一个的数组，不会改变原对象）。

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

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOpjD2YpgO8q0uZwFSYabyvxqWevYX4nYuN5wGM9eSictR2Fp1hrVNZe0dhia321EiaT2g22Y5J1UcYA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)image.png

以上结果表明，通过 Array.from 这个方法可以自定义加工函数的处理方式，从而返回想要得到的值；如果不确定返回值，则会返回 undefined，最终生成的是一个包含若干个 undefined 元素的空数组。

实际上，如果这里不指定 this，加工函数就可以是一个箭头函数。上述代码可以简写为以下形式。

```js
Array.from(obj, (value) => value.repeat(3));
//  控制台打印 (3) ["aaa", "bbb", "ccc"]
```

除了上述 obj 对象以外，拥有迭代器的对象还包括 String、Set、Map 等，`Array.from` 都可以进行处理：

```
// String
Array.from('abc');                             // ["a", "b", "c"]
// Set
Array.from(new Set(['abc', 'def']));           // ["abc", "def"]
// Map
Array.from(new Map([[1, 'ab'], [2, 'de']]));   // [[1, 'ab'], [2, 'de']]
```

### 3. 数组空位

当我们使用数组字面量初始化数组时，可以使用一串逗号来创建空位，ECMAScript会将逗号之间相应索引位置的值当成空位，ES6 重新定义了该如何处理这些空位。

我们可以这样来创建一个空位数组：

```js
let array = [,,,,,];
console.log(array.length);
console.log(array)
```

运行结果如下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOpjD2YpgO8q0uZwFSYabyv9iaFV72SYPTLck3ic6jVGEgWGSRqMPFbBWiaAcibufuSsnGpDFAnryxw7A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)image.png

ES6新增的方法和迭代器与早期版本中存在的方法的行为不同，ES6新增方法普遍将这些空位当成存在的元素，只不过值为undefined，使用字面量形式创建如下数组：

```js
let array = [1,,,5];
for(let i of array){
  console.log(i === undefined)
}
// 输出结果：false true true false
```

使用ES6的Array.form创建数组：

```js
let array = Array.from([1,,,5]);
for(let i of array){
  console.log(i === undefined)
}
// 输出结果：false true true false
```

而ES6之前的方法则会忽略这个空位：

```
let array = [1,,,5];
console.log(array.map(() => 10))

// 输出结果：[10, undefined, undefined, 10]
```

由于不同方法对空位数组的处理方式不同，因此尽量避免使用空位数组。

### 4. 数组索引

在数组中，我们可以通过使用数组的索引来获取数组的值：

```js
let colors = new Array("red", "blue", "green");  
console.log(array[1])  // blue
```

如果指定的索引值小于数组的元素数，就会返回存储在相应位置的元素，也可以通过这种方式来设置一个数组元素的值。如果设置的索引值大于数组的长度，那么就会将数组长度扩充至该索引值加一。

数组长度length的独特之处在于，他不是只读的。通过length属性，可以在数组末尾增加删除元素：

```js
let colors = new Array("red", "blue", "green");  
colors.length = 2
console.log(colors[2])  // undefined

colors.length = 4
console.log(colors[3])  // undefined
```

数组长度始终比数组最后一个值的索引大1，这是因为索引值都是从0开始的。

### 5. 数组判断

一个很经典的ECMASript问题就是如何判断一个对象是不是数组，下面来看常用的数据类型检测的方法。

在 ES6 之前，至少有如下 5 种方式去判断一个对象是否为数组。

- 通过**Object.prototype.toString.call()** 做判断：

```js
Object.prototype.toString.call(obj).slice(8,-1) === 'Array';
```

- 通过**constructor**做判断：

```js
obj.constructor === Array;
```

- 通过**instanceof**做判断：

```js
obj instanceof Array
```

- 通过**Array.prototype.isPrototypeOf**做判断：

```
Array.prototype.isPrototypeOf(obj)
```

- 通过基于**getPrototypeOf**做判断：

```js
Object.getPrototypeOf(obj) === Array.prototype;
```

如果obj是一个数组，那么上面这 5 个判断全部为 true，推荐通过 Object.prototype.toString 去判断一个值的类型。

ES6 新增了 `Array.isArray` 方法，可以直接判断数据类型是否为数组：

```js
Array.isArrray(obj);
```

如果 isArray 不存在，那么 `Array.isArray` 的 polyfill 通常可以这样写：

```js
if (!Array.isArray){
  Array.isArray = function(arg){
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```

## 数组方法

数字就像是一个森林，里面有很多函“树”，有些方法纯净如水，并不会改变原数组，有些则会改变原数组。

- 改变原数组的方法：fill()、pop()、push()、shift()、splice()、unshift()、reverse()、sort()；
- 不改变原数组的方法：concat()、every()、filter()、find()、findIndex()、forEach()、indexOf()、join()、lastIndexOf()、map()、reduce()、reduceRight()、slice()、some。

### 1. 复制和填充方法

ES提供了两个方法：批量复制方法copeWithin()，以及填充数组方法fill()。这两个方法的签名类似，都需要指定已有数组实例上的一个范围，包含开始索引，不包含结束索引。下面就分别来看一下这两个方法。

#### （1）fill()

使用fill()方法可以向一个已有数组中插入全部或部分相同的值，开始索引用于指定开始填充的位置，它是可选的。如果不提供结束索引，则一直填充到数组末尾。如果是负值，则将从负值加上数组的长度而得到的值开始。该方法的语法如下：

```js
array.fill(value, start, end)
```

其参数如下：

- value：必需。填充的值；
- start：可选。开始填充位置；
- end：可选。停止填充位置 (默认为 *array*.length)。

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

#### （2）copyWithin()

copyWithin()方法会按照指定范围来浅复制数组中的部分内容，然后将它插入到指定索引开始的位置，开始与结束索引的计算方法和fill方法一样。该方法的语法如下：

```js
array.copyWithin(target, start, end)
```

其参数如下：

- target：必需。复制到指定目标索引位置；
- start：可选。元素复制的起始位置；
- end：可选。停止复制的索引位置 (默认为 *array*.length)。如果为负值，表示倒数。

使用示例如下：

```js
const array = [1,2,3,4,5]; 
console.log(array.copyWithin(0,3));  // [4, 5, 3, 4, 5]
```

### 2. 转化方法

数组的转化方法主要有四个：toLocaleString()、toString()、valueOf()、join()。下面就分别来看一下这4个方法。

#### （1）toString()

toString()方法返回的是由数组中每个值的等效字符串拼接而成的一个逗号分隔的字符串，也就是说，对数组的每个值都会调用toString()方法，以得到最终的字符串：

```js
let colors = ["red", "blue", "green"];  
console.log(colors.toString())  // red,blue,green
```

#### （2）valueOf()

valueOf()方法返回的是数组本身，如下面代码：

```js
let colors = ["red", "blue", "green"];  
console.log(colors.valueOf())  // ["red", "blue", "green"]
```

#### （3）toLocaleString()

toLocaleString()方法可能会返回和toString()方法相同的结果，但也不一定。在调用toLocaleString()方法时会得到一个逗号分隔的数组值的字符串，它与toString()方法的区别是，为了得到最终的字符串，会调用每个值的toLocaleString()方法，而不是toString()方法，看下面的例子：

```js
let array= [{name:'zz'}, 123, "abc", new Date()];
let str = array.toLocaleString();
console.log(str); // [object Object],123,abc,2016/1/5 下午1:06:23
```

需要注意，如果数组中的某一项是null或者undefined，则在调用上述三个方法后，返回的结果中会以空字符串来表示。

#### （4）join()

join() 方法用于把数组中的所有元素放入一个字符串。元素是通过指定的分隔符进行分隔的。其使用语法如下：

```js
arrayObject.join(separator)
```

其中参数separator是可选的，用来指定要使用的分隔符。如果省略该参数，则使用逗号作为分隔符。

该方法返回一个字符串。该字符串是通过把 arrayObject 的每个元素转换为字符串，然后把这些字符串连接起来，在两个元素之间插入 separator 字符串而生成的。

使用示例如下：

```js
let array = ["one", "two", "three","four", "five"];
console.log(array.join());      // one,two,three,four,five
console.log(array.join("-"));   // one-two-three-four-five
```

### 3. 栈方法

ECMAScript给数组添加了几个方法来使它像栈一样。众所周知，栈是一种后进先出的结构，也就是最近添加的项先被删除。数据项的插入（称为推入，push），和删除（称为弹出，pop）只在栈顶发生。数组提高了push()和pop()来实现类似栈的行为。下面就分别来看看这两个方法。

#### （1）push()

push()方法可以接收任意数量的参数，并将它们添加了数组末尾，并返回数组新的长度。**该方法会改变原数组。** 其语法形式如下：

```js
arrayObject.push(newelement1,newelement2,....,newelementX)
```

使用示例如下：

```js
let array = ["football", "basketball",  "badminton"];
let i = array.push("golfball");
console.log(array); // ["football", "basketball", "badminton", "golfball"]
console.log(i);     // 4
```

#### （2）pop()

pop() 方法用于删除并返回数组的最后一个元素。它没有参数。**该方法会改变原数组。** 其语法形式如下：

```js
arrayObject.pop()
```

使用示例如下：

```js
let array = ["cat", "dog", "cow", "chicken", "mouse"];
let item = array.pop();
console.log(array); // ["cat", "dog", "cow", "chicken"]
console.log(item);  // mouse
```

### 4. 队列方法

队列是一种先进先出的数据结构，队列在队尾添加元素，在对头删除元素。上面我们已经说了在结果添加数据的方法push()，下面就再来看看从数组开头删除和添加元素的方法：shift()和unshift()。实际上unshift()并不属于操作队列的方法，不过这里也一起说了。

#### （1）shift()

shift()方法会删除数组的第一项，并返回它，然后数组长度减一，**该方法会改变原数组。** 语法形式如下：

```js
arrayObject.shift()
```

使用示例如下：

```js
let array = [1,2,3,4,5];
let item = array.shift();
console.log(array); // [2,3,4,5]
console.log(item);  // 1
```

注意：如果数组是空的，那么 shift() 方法将不进行任何操作，返回 undefined 值。

#### （2）unshift()

unshift()方法可向数组的开头添加一个或更多元素，并返回新的长度。**该方法会改变原数组。** 其语法形式如下：

```js
arrayObject.unshift(newelement1,newelement2,....,newelementX)
```

使用示例如下：

```js
let array = ["red", "green", "blue"];
let length = array.unshift("yellow");
console.log(array);  // ["yellow", "red", "green", "blue"]
console.log(length); // 4
```

### 5. 排序方法

数组有两个方法可以对数组进行重新排序：sort()和reverse()。下面就分别来看看这两个方法。

#### （1）sort()

sort()方法是我们常用给的数组排序方法，该方法会在原数组上进行排序，会改变原数组，其使用语法如下：

```js
arrayObject.sort(sortby)
```

其中参数sortby是可选参数，用来规定排序顺序，它是一个比较函数，用来判断哪个值应该排在前面。默认情况下，sort()方法会按照升序重新排列数组元素。为此，sort()方法会在每一个元素上调用String转型函数，然后比较字符串来决定顺序，即使数组的元素都是数值，也会将数组元素先转化为字符串在进行比较、排序。这就造成了排序不准确的情况，如下代码：

```js
let array = [5, 4, 3, 2, 1];
let array2 = array.sort();
console.log(array2)  // [1, 2, 3, 4, 5]

let array = [0, 1, 5, 10, 15];
let array2 = array.sort();
console.log(array2)  //  [0, 1, 10, 15, 5]
```

可以看到，上面第二段代码就出现了问题，虽然5是小于10的，但是字符串10在5的前面，所以10还是会排在5前面，因此可知，在很多情况下，不添加参数是不行的。

对于sort()方法的参数，它是一个比较函数，它接收两个参数，如果第一个参数应该排在第二个参数前面，就返回-1；如果两个参数相等，就返回0；如果第一个参数应该排在第二个参数后面，就返回1。一个比较函数的形式可以如下：

```js
function compare(value1, value2) {
 if(value1 < value2){
   return -1
  } else if(value1 > value2){
   return 1
  } else{
   return 0
  }
}

let array = [0, 1, 5, 10, 15];
let array2 = array.sort(compare);
console.log(array2)  // [0, 1, 5, 10, 15]
```

使用箭头函数来定义：

```js
let array = [0, 1, 5, 10, 15];

let array2 = array.sort((a, b) => a - b);  // 正序排序
console.log(array2)  // [0, 1, 5, 10, 15]

let array3 = array.sort((a, b) => b - a);  // 倒序排序
console.log(array3)  // [15, 10, 5, 1, 0]
```

#### （2）reverse()

reverse() 方法用于颠倒数组中元素的顺序。该方法会改变原来的数组，而不会创建新的数组。其使用语法如下：

```js
arrayObject.reverse()
```

使用示例如下：

```js
let array = [1,2,3,4,5];
let array2 = array.reverse();
console.log(array);   // [5,4,3,2,1]
console.log(array2 === array);   // true
```

### 6. 操作方法

对于数组，还有很多操作方法，下面我们就来看看常用的concat()、slice()、splice()方法。

#### （1）concat()

concat() 方法用于连接两个或多个数组。该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。其适用语法如下：

```js
arrayObject.concat(arrayX,arrayX,......,arrayX)
```

其中参数arrayX是必需的。该参数可以是具体的值，也可以是数组对象。可以是任意多个。

使用示例如下：

```js
let array = [1, 2, 3];
let array2 = array.concat(4, [5, 6], [7, 8, 9]);
console.log(array2); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(array);  // [1, 2, 3], 可见原数组并未被修改
```

该方法还可以用于数组扁平化，后面会介绍。

#### （2）slice()

slice() 方法可从已有的数组中返回选定的元素。返回一个新的数组，包含从 start 到 end （不包括该元素）的数组元素。方法并不会修改数组，而是返回一个子数组。其使用语法如下：

```js
arrayObject.slice(start,end)
```

其参数如下：

- **start**：必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推；
- **end**：可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。

使用示例如下：

```js
let array = ["one", "two", "three", "four", "five"];
console.log(array.slice(0));    // ["one", "two", "three","four", "five"]
console.log(array.slice(2,3)); // ["three"]
```

#### （3）splice()

splice()方法可能是数组中的最强大的方法之一了，使用它的形式有很多种，它会向/从数组中添加/删除项目，然后返回被删除的项目。该方法会改变原始数组。其使用语法如下：

```
arrayObject.splice(index, howmany, item1,.....,itemX)
```

其参数如下：

- index：必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
- howmany：必需。要删除的项目数量。如果设置为 0，则不会删除项目。
- item1, ..., itemX：可选。向数组添加的新项目。

从上面参数可知，splice主要有三种使用形式：

- **删除：** 需要给splice()传递两个参数，即要删除的第一个元素的位置和要删除的元素的数量；
- **插入：** 需要给splice()传递至少三个参数，即开始位置、0（要删除的元素数量）、要插入的元素。
- **替换：** splice()方法可以在删除元素的同事在指定位置插入新的元素。同样需要传入至少三个参数，即开始位置、要删除的元素数量、要插入的元素。要插入的元素数量是任意的，不一定和删除的元素数量相等。

使用示例如下：

```
let array = ["one", "two", "three","four", "five"];
console.log(array.splice(1, 2));           // 删除：["two", "three"]

let array = ["one", "two", "three","four", "five"];
console.log(array.splice(2, 0, 996));      // 插入：[]

let array = ["one", "two", "three","four", "five"];
console.log(array.splice(2, 1, 996));      // 替换：["three"]
```

### 7. 归并方法

ECMAScript为数组提供了两个归并方法：reduce()和reduceRight()。下面就分别来看看这两个方法。

#### （1）reduce()

reduce() 方法对数组中的每个元素执行一个reducer函数(升序执行)，将其结果汇总为单个返回值。其使用语法如下：

```
arr.reduce(callback,[initialValue])
```

reduce 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，接受四个参数：初始值（或者上一次回调函数的返回值），当前元素值，当前索引，调用 reduce 的数组。(1) `callback` （执行数组中每个值的函数，包含四个参数）

- previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
- currentValue （数组中当前被处理的元素）
- index （当前元素在数组中的索引）
- array （调用 reduce 的数组）

(2) `initialValue` （作为第一次调用 callback 的第一个参数。）

```
let arr = [1, 2, 3, 4]
let sum = arr.reduce((prev, cur, index, arr) => {
    console.log(prev, cur, index);
    return prev + cur;
})
console.log(arr, sum);  
```

输出结果如下：

```
1 2 1
3 3 2
6 4 3
[1, 2, 3, 4] 10
```

再来加一个初始值看看：

```
let arr = [1, 2, 3, 4]
let sum = arr.reduce((prev, cur, index, arr) => {
    console.log(prev, cur, index);
    return prev + cur;
}, 5)
console.log(arr, sum);  
```

输出结果如下：

```
5 1 0
6 2 1
8 3 2
11 4 3
[1, 2, 3, 4] 15
```

通过上面例子，可以得出结论：**如果没有提供initialValue，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供initialValue，从索引0开始。**

注意，该方法如果添加初始值，就会改变原数组，将这个初始值放在数组的最后一位。

#### （2）reduceRight()

该方法和的上面的`reduce()`用法几乎一致，只是该方法是对数组进行倒序查找的。而`reduce()`方法是正序执行的。

```
let arr = [1, 2, 3, 4]
let sum = arr.reduceRight((prev, cur, index, arr) => {
    console.log(prev, cur, index);
    return prev + cur;
}, 5)
console.log(arr, sum);
```

输出结果如下：

```
5 4 3
9 3 2
12 2 1
14 1 0
[1, 2, 3, 4] 15
```

### 8. 搜索和位置方法

ECMAScript提供了两类搜索数组的方法：按照严格相等搜索和按照断言函数搜索。

#### （1）严格相等

ECMAScript通过了3个严格相等的搜索方法：indexOf()、lastIndexOf()、includes()。这些方法都接收两个参数：要查找的元素和可选的其实搜索位置。lastIndexOf()方法会从数组结尾元素开始向前搜索，其他两个方法则会从数组开始元素向后进行搜索。indexOf()和lastIndexOf()返回的是查找元素在数组中的索引值，如果没有找到，则返回-1。includes()方法会返回布尔值，表示是否找到至少一个与指定元素匹配的项。在比较第一个参数和数组的每一项时，会使用全等（===）比较，也就是说两项必须严格相等。

使用示例如下：

```
let arr = [1, 2, 3, 4, 5];
console.log(arr.indexOf(2))      // 1
console.log(arr.lastIndexOf(3))  // 2
console.log(arr.includes(4))     // true
```

#### （2）断言函数

ECMAScript也允许按照定义的断言函数搜索数组，每个索引都会调用这个函数，断言函数的返回值决定了相应索引的元素是否被认为匹配。使用断言函数的方法有两个，分别是find()和findIndex()方法。这两个方法对于空数组，函数是不会执行的。并且没有改变数组的原始值。他们的都有三个参数：元素、索引、元素所属的数组对象，其中元素是数组中当前搜索的元素，索引是当前元素的索引，而数组是当前正在搜索的数组。

这两个方法都从数组的开始进行搜索，find()返回的是第一个匹配的元素，如果没有符合条件的元素返回 undefined；findIndex()返回的是第一个匹配的元素的索引，如果没有符合条件的元素返回 -1。

使用示例如下：

```
let arr = [1, 2, 3, 4, 5]
arr.find(item => item > 2)      // 结果：3
arr.findIndex(item => item > 2) // 结果：2
```

### 9. 迭代器方法

在ES6中，Array的原型上暴露了3个用于检索数组内容的方法：keys()、values()、entries()。keys()方法返回数组索引的迭代器，values()方法返回数组元素的迭代器，entries()方法返回索引值对的迭代器。

使用示例如下（因为这些方法返回的都是迭代器，所以可以将他们的内容通过Array.from直接转化为数组实例）：

```
let array = ["one", "two", "three", "four", "five"];
console.log(Array.from(array.keys()))     // [0, 1, 2, 3, 4]
console.log(Array.from(array.values()))   // ["one", "two", "three", "four", "five"]
console.log(Array.from(array.entries()))  // [[0, "one"], [1, "two"], [2, "three"], [3, "four"], [4, "five"]]
```

### 10. 迭代方法

ECMAScript为数组定义了5个迭代方法，分别是every()、filter()、forEach()、map()、some()。这些方法都不会改变原数组。这五个方法都接收两个参数：以每一项为参数运行的函数和可选的作为函数运行上下文的作用域对象（影响函数中的this值）。传给每个方法的函数接收三个参数，分别是当前元素、当前元素的索引值、当前元素所属的数对象。

#### （1）forEach()

`forEach` 方法用于调用数组的每个元素，并将元素传递给回调函数。该方法没有返回值，使用示例如下：

```
let arr = [1,2,3,4,5]
arr.forEach((item, index, arr) => {
  console.log(index+":"+item)
})
```

该方法还可以有第二个参数，用来绑定回调函数内部this变量（回调函数不能是箭头函数，因为箭头函数没有this）：

```
let arr = [1,2,3,4,5]
let arr1 = [9,8,7,6,5]
arr.forEach(function(item, index, arr){
  console.log(this[index])  //  9 8 7 6 5
}, arr1)
```

#### （2）map()

`map()` 方法会返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。该方法按照原始数组元素顺序依次处理元素。该方法不会对空数组进行检测，它会返回一个新数组，**不会改变原始数组**。使用示例如下：

```
let arr = [1, 2, 3];
 
arr.map(item => {
    return item+1;
})
// 结果： [2, 3, 4]
```

第二个参数用来绑定参数函数内部的this变量：

```
var arr = ['a', 'b', 'c'];
 
[1, 2].map(function (e) {
    return this[e];
}, arr)
 // 结果： ['b', 'c']
```

该方法可以进行链式调用：

```
let arr = [1, 2, 3];
 
arr.map(item => item+1).map(item => item+1)
 // 结果： [3, 4, 5]
```

**forEach和map区别如下：**

- forEach()方法：会针对每一个元素执行提供的函数，对数据的操作会改变原数组，该方法没有返回值；
- map()方法：不会改变原数组的值，返回一个新数组，新数组中的值为原数组调用函数处理之后的值；

#### （3）filter()

`filter()`方法用于过滤数组，满足条件的元素会被返回。它的参数是一个回调函数，所有数组元素依次执行该函数，返回结果为true的元素会被返回。该方法会返回一个新的数组，不会改变原数组。

```
let arr = [1, 2, 3, 4, 5]
arr.filter(item => item > 2) 
// 结果：[3, 4, 5]
```

可以使用`filter()`方法来移除数组中的undefined、null、NAN等值

```
let arr = [1, undefined, 2, null, 3, false, '', 4, 0]
arr.filter(Boolean)
// 结果：[1, 2, 3, 4]
```

#### （4）every()

该方法会对数组中的每一项进行遍历，只有所有元素都符合条件时，才返回true，否则就返回false。

```
let arr = [1, 2, 3, 4, 5]
arr.every(item => item > 0) 
// 结果：true
```

#### （5）some()

该方法会对数组中的每一项进行遍历，只要有一个元素符合条件，就返回true，否则就返回false。

```
let arr = [1, 2, 3, 4, 5]
arr.some(item => item > 4) 
// 结果：true
```

### 11. 其他方法

除了上述方法，遍历数组的方法还有for...in和for...of。下面就来简单看一下。

#### （1）for…in

`for…in` 主要用于对数组或者对象的属性进行循环操作。循环中的代码每执行一次，就会对对象的属性进行一次操作。其使用语法如下：

```
for (var item in object) {
  执行的代码块
}
```

其中两个参数：

- item：必须。指定的变量可以是数组元素，也可以是对象的属性。
- object：必须。指定迭代的的对象。

使用示例如下：

```
const arr = [1, 2, 3]; 
 
for (var i in arr) { 
    console.log('键名：', i); 
    console.log('键值：', arr[i]); 
}
```

输出结果如下：

```
键名： 0
键值： 1
键名： 1
键值： 2
键名： 2
键值： 3
```

需要注意，该方法**不仅会遍历当前的对象所有的可枚举属性，还会遍历其原型链上的属性。** 除此之外，该方法遍历数组时候，遍历出来的是数组的索引值，遍历对象的时候，遍历出来的是键值名。

#### （2）for...of

`for...of` 语句创建一个循环来迭代可迭代的对象。在 ES6 中引入的 `for...of` 循环，以替代 `for...in` 和 `forEach()` ，并支持新的迭代协议。`for...of` 允许遍历 Arrays（数组）, Strings（字符串）, Maps（映射）, Sets（集合）等可迭代的数据结构等。

语法：

```
for (var item of iterable) {
    执行的代码块
}
```

其中两个参数：

- item：每个迭代的属性值被分配给该变量。
- iterable：一个具有可枚举属性并且可以迭代的对象。

该方法允许获取对象的键值：

```
var arr = ['a', 'b', 'c', 'd'];
for (let a in arr) {
  console.log(a); // 0 1 2 3
}
for (let a of arr) {
  console.log(a); // a b c d
}
```

该方法只会遍历当前对象的属性，不会遍历其原型链上的属性。

**注意：**

- for...of适用遍历 **数组/ 类数组/字符串/map/set** 等拥有迭代器对象的集合；
- 它可以正确响应break、continue和return语句；
- for...of循环不支持遍历普通对象，因为没有迭代器对象。如果想要遍历一个对象的属性，可以用`for-in`循环。

**总结，for…of 和for…in的区别如下：**

- for…of 遍历获取的是对象的键值，for…in 获取的是对象的键名；
- for… in 会遍历对象的整个原型链，性能非常差不推荐使用，而 for … of 只遍历当前对象不会遍历原型链；
- 对于数组的遍历，for…in 会返回数组中所有可枚举的属性(包括原型链上可枚举的属性)，for…of 只返回数组的下标对应的属性值；

#### （3）flat()

在ES2019中，flat()方法用于创建并返回一个新数组，这个新数组包含与它调用flat()的数组相同的元素，只不过其中任何本身也是数组的元素会被打平填充到返回的数组中：

```
[1, [2, 3]].flat()   // [1, 2, 3]
[1, [2, [3, 4]]].flat()   // [1, 2, [3, 4]]
```

在不传参数时，flat()默认只会打平一级嵌套，如果想要打平更多的层级，就需要传给flat()一个数值参数，这个参数表示要打平的层级数：

```
[1, [2, [3, 4]]].flat(2)   // [1, 2, 3, 4]
```

## 类数组对象

JavaScript 中一直存在一种类数组的对象，它们不能直接调用数组的方法，但是又和数组比较类似，在某些特定的编程场景中会出现，下面就来看一下什么是类数组。

在 JavaScript 中，主要有以下情况中的对象是类数组：

- 函数里面的参数对象 arguments；
- 用 getElementsByTagName/ClassName/Name 获得的 HTMLCollection；
- 用 querySelector 获得的 NodeList。

### 1. 类数组概述

#### （1）arguments

在日常开发中经常会遇到各种类数组对象，最常见的就是在函数中使用的 arguments，它的对象只定义在函数体中，包括了函数的参数和其他属性。先来看下 arguments 的使用方法：

```
function foo(name, age, sex) {
    console.log(arguments);
    console.log(typeof arguments);
    console.log(Object.prototype.toString.call(arguments));
}
foo('jack', '18', 'male');
```

打印结果如下：![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOpjD2YpgO8q0uZwFSYabyvTYE5RWE3j8YDgAt7ibLzfxib0taZJ5hZeyvF88dtNW5ZKvBHc9vYs4pQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)可以看到，typeof 这个 arguments 返回的是 object，通过 Object.prototype.toString.call 返回的结果是 [object arguments]，而不是 [object array]，说明 arguments 和数组还是有区别的。

length 属性就是函数参数的长度。另外 arguments 还有一个 callee 属性，下面看看这个 callee 是干什么的：

```
function foo(name, age, sex) {
    console.log(arguments.callee);
}

foo('jack', '18', 'male');
```

打印结果如下：

```
ƒ foo(name, age, sex) {
    console.log(arguments.callee);
}
```

可以看出，输出的就是函数自身，如果在函数内部直接执行调用 callee，那它就会不停地执行当前函数，直到执行到内存溢出。

#### （2）HTMLCollection

HTMLCollection 简单来说是 HTML DOM 对象的一个接口，这个接口包含了获取到的 DOM 元素集合，返回的类型是类数组对象，如果用 typeof 来判断的话，它返回的是 object。它是及时更新的，当文档中的 DOM 变化时，它也会随之变化。

下面来 HTMLCollection 最后返回的是什么，在一个**有 form 表单**的页面中，在控制台中执行下述代码：

```
var elem1, elem2;
// document.forms 是一个 HTMLCollection
elem1 = document.forms[0];
elem2 = document.forms.item(0);
console.log(elem1);
console.log(elem2);
console.log(typeof elem1);
console.log(Object.prototype.toString.call(elem1));
```

打印结果如下：![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOpjD2YpgO8q0uZwFSYabyvaNAcuo9SsCXic9RZjextic0f0pECxG1RecucEiah96ab2K2RhgEPnVzdw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

可以看到，这里打印出来了页面第一个 form 表单元素，同时也打印出来了判断类型的结果，说明打印的判断的类型和 arguments 返回的也比较类似，typeof 返回的都是 object，和上面的类似。

注意：HTML DOM 中的 HTMLCollection 是即时更新的，当其所包含的文档结构发生改变时，它会自动更新。

#### （3）NodeList

NodeList 对象是节点的集合，通常是由 querySlector 返回的。NodeList 不是一个数组，也是一种类数组。虽然 NodeList 不是一个数组，但是可以使用 for...of 来迭代。在一些情况下，NodeList 是一个实时集合，也就是说，如果文档中的节点树发生变化，NodeList 也会随之变化。

```
var list = document.querySelectorAll('input[type=checkbox]');
for (var checkbox of list) {
  checkbox.checked = true;
}
console.log(list);
console.log(typeof list);
console.log(Object.prototype.toString.call(list));
```

打印结果如下：![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOpjD2YpgO8q0uZwFSYabyvJRnaNIg23DuBVFFverUtiawIrAzJCqWh3yEQla5NtvqafD0VI6BdPdg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 2. 类数组应用场景

#### （1）遍历参数操作

在函数内部可以直接获取 arguments 这个类数组的值，那么也可以对于参数进行一些操作，比如下面这段代码可以将函数的参数默认进行求和操作：

```
function add() {
    var sum =0,
        len = arguments.length;
    for(var i = 0; i < len; i++){
        sum += arguments[i];
    }
    return sum;
}
add()                            // 0
add(1)                           // 1
add(1，2)                        // 3
add(1,2,3,4);                    // 10
```

结合上面这段代码，在函数内部可以将参数直接进行累加操作，以达到预期的效果，参数多少也可以不受限制，根据长度直接计算，返回出最后函数的参数的累加结果，其他操作也类似。

#### （2）定义连接字符串函数

可以通过 arguments 这个例子定义一个函数来连接字符串。这个函数唯一正式声明了的参数是一个字符串，该参数指定一个字符作为衔接点来连接字符串。该函数定义如下：

```
function myConcat(separa) {
  var args = Array.prototype.slice.call(arguments, 1);
  return args.join(separa);
}
myConcat(", ", "red", "orange", "blue");
// "red, orange, blue"
myConcat("; ", "elephant", "lion", "snake");
// "elephant; lion; snake"
myConcat(". ", "one", "two", "three", "four", "five");
// "one. two. three. four. five"
```

这段代码说明可以传递任意数量的参数到该函数，并使用每个参数作为列表中的项创建列表进行拼接。从这个例子中也可以看出，可以在日常编码中采用这样的代码抽象方式，把需要解决的这一类问题，都抽象成通用的方法，来提升代码的可复用性。

#### （3）传递参数

可以借助apply 或 call 与 arguments 相结合，将参数从一个函数传递到另一个函数：

```
1. // 使用 apply 将 foo 的参数传递给 bar
2. function foo() {
3.     bar.apply(this, arguments);
4. }
5. function bar(a, b, c) {
6. console.log(a, b, c);
7. }
8. foo(1, 2, 3)   //1 2 3
```

上述代码中，通过在 foo 函数内部调用 apply 方法，用 foo 函数的参数传递给 bar 函数，这样就实现了借用参数的妙用。

### 3. 类数组转为数组

#### （1）借用数组方法

类数组因为不是真正的数组，所以没有数组类型上自带的那些方法，所以就需要利用下面这几个方法去借用数组的方法。比如借用数组的 push 方法，代码如下：

```
var arrayLike = { 
  0: 'java',
  1: 'script',
  length: 2
} 
Array.prototype.push.call(arrayLike, 'jack', 'lily'); 
console.log(typeof arrayLike); // 'object'
console.log(arrayLike);
// {0: "java", 1: "script", 2: "jack", 3: "lily", length: 4}
```

可以看到，arrayLike 其实是一个对象，模拟数组的一个类数组，从数据类型上说它是一个对象，新增了一个 length 的属性。还可以看出，用 typeof 来判断输出的是 object，它自身是不会有数组的 push 方法的，这里用 call 的方法来借用 Array 原型链上的 push 方法，可以实现一个类数组的 push 方法，给 arrayLike 添加新的元素。

从打印结果可以看出，数组的 push 方法满足了我们想要实现添加元素的诉求。再来看下 arguments 如何转换成数组：

```
function sum(a, b) {
  let args = Array.prototype.slice.call(arguments);
 // let args = [].slice.call(arguments); // 这样写也是一样效果
  console.log(args.reduce((sum, cur) => sum + cur));
}
sum(1, 2);  // 3
function sum(a, b) {
  let args = Array.prototype.concat.apply([], arguments);
  console.log(args.reduce((sum, cur) => sum + cur));
}
sum(1, 2);  // 3
```

可以看到，借用 Array 原型链上的各种方法，来实现 sum 函数的参数相加的效果。一开始都是将 arguments 通过借用数组的方法转换为真正的数组，最后都又通过数组的 reduce 方法实现了参数转化的真数组 args 的相加，最后返回预期的结果。

#### （2）借用ES6方法

还可以采用 ES6 新增的 Array.from 方法以及展开运算符的方法来将类数组转化为数组。那么还是围绕上面这个 sum 函数来进行改变，看下用 Array.from 和展开运算符是怎么实现转换数组的：

```
function sum(a, b) {
  let args = Array.from(arguments);
  console.log(args.reduce((sum, cur) => sum + cur));
}
sum(1, 2);    // 3
function sum(a, b) {
  let args = [...arguments];
  console.log(args.reduce((sum, cur) => sum + cur));
}
sum(1, 2);    // 3
function sum(...args) {
  console.log(args.reduce((sum, cur) => sum + cur));
}
sum(1, 2);    // 3
```

可以看到，Array.from 和 ES6 的展开运算符，都可以把 arguments 这个类数组转换成数组 args，从而实现调用 reduce 方法对参数进行累加操作。其中第二种和第三种都是用 ES6 的展开运算符，虽然写法不一样，但是基本都可以满足多个参数实现累加的效果。

## 数组常见操作

### 1. 数组扁平化

下面再来看看数组的扁平化。所谓扁平化，其实就是将一个嵌套多层的数组 array（嵌套可以是任何层数）转换为只有一层的数组。举个简单的例子，假设有个名为 flatten 的函数可以做到数组扁平化，那么输出效果如下：

```
let arr = [1, [2, [3, 4，5]]];
console.log(flatten(arr));  // [1, 2, 3, 4，5]
```

简单来说就是把多维的数组“拍平”，输出最后的一维数组。下面来看看实现flatten函数的方式。

#### （1）递归实现

普通的递归思路很容易理解，就是通过循环递归的方式，一项一项地去遍历，如果某一项还是一个数组，那么就继续往下遍历，利用递归来实现数组的每一项的连接：

```
let arr = [1, [2, [3, 4, 5]]];
function flatten(arr) {
  let result = [];

  for(let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
flatten(arr);  //  [1, 2, 3, 4，5]
```

可以看到，最后返回的结果是扁平化的结果，这段代码核心就是循环遍历过程中的递归操作，就是在遍历过程中发现数组元素还是数组的时候进行递归操作，把数组的结果通过数组的 concat 方法拼接到最后要返回的 result 数组上，那么最后输出的结果就是扁平化后的数组。

#### （2）reduce 函数迭代

从上面的递归函数可以看出，其实就是对数组的每一项进行处理，那么其实也可以用 reduce 来实现数组的拼接，从而简化上面方法的代码，改造后的代码如下：

```
let arr = [1, [2, [3, 4]]];
function flatten(arr) {
    return arr.reduce(function(prev, next){
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    }, [])
}
console.log(flatten(arr));//  [1, 2, 3, 4，5]
```

这段代码在控制台执行之后，也可以得到想要的结果。上面我们说了 reduce 的第一个参数用来返回最后累加的结果，思路和第一种递归方法是一样的，但是通过使用 reduce 之后代码变得更简洁了，也同样解决了扁平化的问题。

#### （3）扩展运算符实现

这个方法的实现，采用了扩展运算符和 some 的方法，两者共同使用，达到数组扁平化的目的：

```
let arr = [1, [2, [3, 4]]];
function flatten(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
console.log(flatten(arr)); //  [1, 2, 3, 4，5]
```

从执行的结果中可以发现，先用数组的 some 方法把数组中仍然是组数的项过滤出来，然后执行 concat 操作，利用 ES6 的展开运算符，将其拼接到原数组中，最后返回原数组，达到了预期的效果。

#### （4）split 和 toString

可以通过 split 和 toString 两个方法来共同实现数组扁平化，由于数组会默认带一个 toString 的方法，所以可以把数组直接转换成逗号分隔的字符串，然后再用 split 方法把字符串重新转换为数组，如下面的代码所示：

```
let arr = [1, [2, [3, 4]]];
function flatten(arr) {
    return arr.toString().split(',');
}
console.log(flatten(arr)); //  [1, 2, 3, 4，5]
```

通过这两个方法可以将多维数组直接转换成逗号连接的字符串，然后再重新分隔成数组。

#### （5）ES6 中的 flat

我们还可以直接调用 ES6 中的 flat 方法来实现数组扁平化。flat 方法的语法：`arr.flat([depth])`

其中 depth 是 flat 的参数，depth 是可以传递数组的展开深度（默认不填、数值是 1），即展开一层数组。如果层数不确定，参数可以传进 Infinity，代表不论多少层都要展开：

```
let arr = [1, [2, [3, 4]]];
function flatten(arr) {
  return arr.flat(Infinity);
}
console.log(flatten(arr)); //  [1, 2, 3, 4，5]
```

可以看出，一个嵌套了两层的数组，通过将 flat 方法的参数设置为 Infinity，达到了我们预期的效果。其实同样也可以设置成 2，也能实现这样的效果。在编程过程中，如果数组的嵌套层数不确定，最好直接使用 Infinity，可以达到扁平化的效果。

#### （6）正则和 JSON 方法

在第4种方法中已经使用 toString 方法，其中仍然采用了将 JSON.stringify 的方法先转换为字符串，然后通过正则表达式过滤掉字符串中的数组的方括号，最后再利用 JSON.parse 把它转换成数组：

```
let arr = [1, [2, [3, [4, 5]]], 6];
function flatten(arr) {
  let str = JSON.stringify(arr);
  str = str.replace(/(\[|\])/g, '');
  str = '[' + str + ']';
  return JSON.parse(str); 
}
console.log(flatten(arr)); //  [1, 2, 3, 4，5]
```

可以看到，其中先把传入的数组转换成字符串，然后通过正则表达式的方式把括号过滤掉，匹配规则是：全局匹配（g）左括号或者右括号，将它们替换成空格，最后返回处理后的结果。之后拿着正则处理好的结果重新在外层包裹括号，最后通过 JSON.parse 转换成数组返回。

### 2. 数组去重

去除无序数组中的重复元素并且返回新的无重复数组。

#### （1）Set实现

ES6方法（使用数据结构集合）：

```
const array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];
Array.from(new Set(array)); // [1, 2, 3, 5, 9, 8]
```

#### （2）map实现

ES5方法：使用map存储不重复的数字

```
const array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];

function uniqueArray(array) {
  let map = {};
  let res = [];
  for(var i = 0; i < array.length; i++) {
    if(!map.hasOwnProperty([array[i]])) {
      map[array[i]] = 1;
      res.push(array[i]);
    }
  }
  return res;
}

uniqueArray(array); // [1, 2, 3, 5, 9, 8]
```

### 3. 数组求和

#### （1）reduce实现

```js
let arr = [1, 2, 3, 4, 5, 6]
let sum = arr.reduce( (total,i) => total += i,0);
console.log(sum);     // 21
```

#### （2）递归实现

```js
let arr = [1, 2, 3, 4, 5, 6] 
function add(arr) {
    if (arr.length == 1) return arr[0] 
    return arr[0] + add(arr.slice(1)) 
}
console.log(add(arr))  // 21
```

### 4. 数组乱序

#### （1）正向遍历

主要的实现思路就是：

1. 取出数组的第一个元素，随机产生一个索引值，将该第一个元素和这个索引对应的元素进行交换；
2. 第二次取出数据数组第二个元素，随机产生一个除了索引为1的之外的索引值，并将第二个元素与该索引值对应的元素进行交换；
3. 按照上面的规律执行，直到遍历完成。

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (var i = 0; i < arr.length; i++) {
  const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
  [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
}
console.log(arr)
```

#### （2）倒序遍历

倒序遍历和上面实现思路类似，代码如下：

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let length = arr.length,
    randomIndex,
    temp;
  while (length) {
    randomIndex = Math.floor(Math.random() * length--);
    temp = arr[length];
    arr[length] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
console.log(arr)
```



# JSON 必知必会

## JSON 概述

### 1  概念

> JSON 全称为 JavaScript Object Notation，是一种轻量级的数据交换格式。它是 JavaScript 中用于描述对象数据的语法的扩展。不过并不限于与 JavaScript 一起使用。它采用完全独立于语言的文本格式，这些特性使 JSON 成为理想的数据交换格式。易于阅读和编写，同时也易于机器解析和生成。所有现代编程语言都支持这些数据结构，使 JSON 完全独立于语言。

### 2 历史

在 2000 年代初期，Douglas Crockford 创建了 JSON 以实现最小化、可移植和文本化。作为 JavaScript 的一个子集，JSON 与 Web 浏览器脚本语言大约在同一时间流行起来。到 2010 年代初，JSON 成为新公共 API 的流行选择。

JSON 于 2013 年标准化为 ECMA-404，并于 2017 年发布为 RFC8259。RFC 和 ECMA 标准保持一致。JSON 的官方媒体类型是 `application/json`，JSON 文件名使用扩展名 `.json`。

JSON 源于对无状态、实时的服务器到浏览器通信协议的需求，它旨在成为 XML 的轻量级替代方案，以允许在移动处理场景和Web 上轻松解析 JavaScript。

> JSON 通常与 REST 服务相关联，尤其是对于 Web 上的 API。尽管 API 的 REST 架构允许使用任何格式，但 JSON 提供了一种更灵活的消息格式，可以提高通信速度。在开发需要快速、紧凑和方便的数据序列化的 Web 或移动应用程序时，它非常有用。

### 3 特点

JSON 的流行正是因为网站和移动应用程序需要更快捷、有效地将数据从一个系统传输到另一个系统。JSON 可以通过多种方式共享数据、存储设置以及与系统交互。它的简单性和灵活性使其适用于许多不同的情况。

JSON 最常见的用法是通过网络连接交换序列化数据。JSON 的其他常见用途包括公共、前端或内部 API、NoSQL 数据库、模式描述、配置文件、公共数据或数据导出。

JSON 的特点如下：

> - **紧凑、高效的格式**：JSON 语法提供了简单的数据解析和更快的实现；
> - **易于阅读：**人类和计算机都可以快速解释语法且错误最少；
> - **广泛支持：**大多数语言、操作系统和浏览器都可以使用开箱即用的 JSON，允许使用 JSON 不存在兼容性问题
> - **自我描述**：很容易区分数据类型，并且更容易解释数据，而无需提前知道会发生什么；
> - **格式灵活**：JSON 支持多种数据类型，可以组合起来表达大多数数据的结构。

## JSON 结构和语法

JSON 易于编写和阅读，并且易于在大多数语言使用的数据结构之间进行转换。下面来看一下 JSON 的组成、JSON 支持的数据类型。

### 1 结构

下面是一个最基本的 JSON 示例：

```json
{"name": "zhangsan"}
```

在上面的示例中，key是 `name`，value 是 `zhangsan`。JSON 可以保存多个 `key:value`对：

```json
{"name": "zhangsan", "age": 18, "city": "beijing"}
```

当然这只是一个简单的例子，在实际应用中 JSON 可能会多层嵌套。对象和数组是可以保存其他值的值，因此 JSON 数据可能会发生无限嵌套。这允许 JSON 描述大多数数据类型。下面是 JSON 数据类型的完整列表：

> - string：用引号括起来的文字。
> - number：正整数或负整数或浮点数。
> - object：用花括号括起来的键值对
> - array：一个或多个 JSON 对象的集合。
> - boolean：不带引号的 true 或 false 值。
> - null：表示键值对没有数据，表示为null，不带引号。

下面是一个包含这些数据类型的 JSON 对象示例：

```json
{
  "name": "zhangsan",
  "age": 28,
  "badperson":true,
  "child": {
    "name": "zhangxiaosan",
    "age": 8
  },
  "job": ["React", "JavaScript"],
  "wages": null,
}
```

### 2 语法

下面来看看如何避免常见的 JSON 语法错误：

> - 始终将键值对保存在双引号内，大多数 JSON 解析器使用双引号解析 JSON 对象；
> - 切勿在 key 中使用连字符。而是使用下划线 (_)、全部小写或驼峰式大小写；
> - 使用 JSON linter 来检查 JSON 是有效的，可以使用 JSONLint 等工具进行校验。

## JSON 解析与序列化

JSON 内置了两种方法：

- `JSON.parse()` ：将数据转换为 JavaScript 对象。
- `JSON.stringify()` ：将 JavaScript 对象转换为字符串。

### 1 JSON.parse()

`JSON.parse()` 的语法如下：

```js
JSON.parse(text, reviver)
```

- **text：** 必需， 一个有效的 JSON 字符串。
- **reviver**：可选，一个转换结果的函数， 将为对象的每个成员调用此函数。

```js
const json = '{"name": "zhangsan", "age": 18, "city": "beijing"}';

const myJSON = JSON.parse(json);
 
console.log(myJSON.name, myJSON.age);  // zhangsan 18
```

我们可以启用 `JSON.parse` 的第二个参数 `reviver`，一个转换结果的函数，对象的每个成员都会调用此函数：

```js
const json = '{"name": "zhangsan", "age": 18, "city": "beijing"}';

const myJSON = JSON.parse(json, (key, value) => {
  if(typeof value === "number") {
     return String(value).padStart(3, "0");
  }
  return value;
});
 
console.log(myJSON.name, myJSON.age);  // zhangsan 018
```

### 2 JSON.stringify()

`JSON.stringify()` 的语法如下：

```js
JSON.stringify(value, replacer, space)
```

- **value：** 必需， 要转换的 JavaScript 值（通常为对象或数组）。
- **replacer：** 可选。用于转换结果的函数或数组。如果 replacer 为函数，则 JSON.stringify 将调用该函数，并传入每个成员的键和值。使用返回值而不是原始值。如果此函数返回 undefined，则排除成员。根对象的键是一个空字符串：""。如果 replacer 是一个数组，则仅转换该数组中具有键值的成员。成员的转换顺序与键在数组中的顺序一样。当 value 参数也为数组时，将忽略 replacer 数组。
- **space：** 可选，文本添加缩进、空格和换行符，如果 space 是一个数字，则返回值文本在每个级别缩进指定数目的空格，如果 space 大于 10，则文本缩进 10 个空格。space 也可以使用非数字，如：`\t`。

```js
const json = {"name": "zhangsan", "age": 18, "city": "beijing"};

const myJSON = JSON.stringify(json);
 
console.log(myJSON);  // {"name":"zhangsan","age":18,"city":"beijing"}
```

### 3 异常处理

那如果 JSON 无效怎么办呢？比如缺少了逗号，引号等，上面的两种方法都会抛出异常。建议在使用这两个方法时使用`try...catch`来包裹，也可以将其封装成一个函数。

```js
let myJSON = {}
const json = '{"name": "zhangsan", "age": 18, "city": "beijing"}';

try {
  myJSON = JSON.parse(json);
} catch (e){
  console.error(e.message)
}
console.log(myJSON.name, myJSON.age);  // zhangsan 18
```

如果 JSON 操作时出现问题，这样就能确保应用程序不会因此中断。

### 4 其他操作

#### ① 删除键值对

可以使用 `delete` 运算符来删除 JSON 中的键值对：

```js
const json = {"name": "zhangsan", "age": 18, "city": "beijing"};

delete json.city;
 
console.log(json);  // {name: 'zhangsan', age: 18}
```

#### ② 访问数组项

可以使用方括号`[]`和索引从 JSON 中访问数组项：

```js
const json = {
  "name": "zhangsan",
  "age": 18,
  "job": ["React", "JavaScript"],
};

console.log(json.job[0]); // React 
```

#### ③ 遍历数组项

可以使用`for`循环来遍历 JSON 中的数组项：

```js
const json = {
  "name": "zhangsan",
  "age": 18,
  "job": ["React", "JavaScript"],
};

for (item of json.job) {
    console.log(item);  // React JavaScript
}
```

## 实用技巧

下面来看看 JSON 有哪些实用技巧。

### 1 格式化

上面提到，可以使用`JSON.stringify()`来将 JSON 对象转换为字符串。它支持第二、三个参数。我们可以借助第二三个参数来格式化 JSON 字符串。正常情况下，格式化后的字符串长这样：

```js
const json = {"name": "zhangsan", "age": 18, "city": "beijing"};

const myJSON = JSON.stringify(json);
 
console.log(myJSON);  // {"name":"zhangsan","age":18,"city":"beijing"}
```

添加第二三个参数：

```js
const json = {"name": "zhangsan", "age": 18, "city": "beijing"};

const myJSON = JSON.stringify(json, null, 2);
 
console.log(myJSON);  
```

生成的字符串格式如下：

```json
{
  "name": "zhangsan",
  "age": 18,
  "city": "beijing"
}
```

这里的 2 其实就是为返回值文本在每个级别缩进 2 个空格。

如果缩进是一个字符串而不是空格，就可以传入需要缩进的填充字符串：

```js
const json = {"name": "zhangsan", "age": 18, "city": "beijing"};

const myJSON = JSON.stringify(json, null, "--");
 
console.log(myJSON);  
```

输出结果如下：

```json
{
--"name": "zhangsan",
--"age": 18,
--"city": "beijing"
}
```

### 2 隐藏属性

我们知道`JSON.stringify()`支持第二个参数，用来处理 JSON 中的数据：

```js
const user = {
  "name": "John",
  "password": "12345",
  "age": 30
};

console.log(JSON.stringify(user, (key, value) => {
    if (key === "password") {
       return;
    }
    return value;
}));

// 输出结果：{"name":"John","age":30}
```

可以将第二个参数抽离出一个函数：

```js
function stripKeys(...keys) {
    return (key, value) => {
        if (keys.includes(key)) {
           return;
        }
        return value;
    };
}

const user = {
  "name": "John",
  "password": "12345",
  "age": 30,
  "gender": "male"
};

console.log(JSON.stringify(user, stripKeys('password', 'gender')))

// 输出结果：{"name":"John","age":30}
```

### 3 过滤结果

当 JSON 中的内容很多时，想要查看指定字段是比较困难的。可以借助`JSON.stringify()`的第二个属性来获取指定值，只需传入指定一个包含要查看的属性 `key` 的数组即可：

```js
const user = {
    "name": "John",
    "password": "12345",
    "age": 30
}

console.log(JSON.stringify(user, ['name', 'age'])) // 输出结果：{"name":"John","age":30}
```

## JSON 可视化工具

最后来推荐几个好用的 JSON 查看器。

### 1 jsoncrack⭐

最近就偶遇到了一个非常优雅的 JSON 数据可视化工具 - `jsoncrack`，可以一眼看出 JSON 的奥妙

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212041803877.png" alt="image-20221204180359801" style="zoom:80%;" />

更多其他的细节功能，感兴趣的小伙伴可以去开源项目亲自体验一下吧~~~

> 官网：https://jsoncrack.com/
>
> 项目地址：https://github.com/AykutSarac/jsoncrack.com
>
> 在线编辑页：https://jsoncrack.com/editor

### 2  JSON Hero

JSON Hero 是一个开源的、漂亮的 JSON 查看器，它提供了包含额外功能的干净美观的 UI，使阅读和理解 JSON 文件变得容易。

- 以任何方式查看 JSON：列视图、树视图、编辑器视图等；
- 自动推断字符串的内容并提供有用的预览；
- 创建可用于验证 JSON 的推断 JSON 模式；
- 快速扫描相关值以检查边缘情况；
- 搜索您的 JSON 文件（键和值）；
- 可使用键盘；
- 具有路径支持的可轻松共享的 URL。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMM5aPabYkBnwESj9PYGQSQaUEAjsynsd0ibYmQVthRCpomJzPXlUgicaMdjj3gr3rfHmo0k0pDNjQAQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**Github**：https://github.com/jsonhero-io/jsonhero-web

### 3 JSON Visio⭐

JSON Visio 是一个 JSON 数据的可视化工具，它可以无缝地在图表上展示数据，而无需重组任何内容、直接粘贴或导入文件。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMM5aPabYkBnwESj9PYGQSQaYxEyO25xfxKMmTia6hctaQHCL2gqNoQFD4lica8hylXl7u3DH1vhoW4g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**Github**：https://github.com/AykutSarac/jsonvisio.com

### 4  JSON Viewer Pro

JSON Viewer Pro 是一个Chrome扩展程序，主要用于可视化JSON文件。其核心功能包括：

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

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMPTZJibkkuZOpTIQR0k5DdTibFibic6VzZ35E4d17Xic8vaVT7JyD3HXsuxN8jzl9FGmdzhFwFGrF092HA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

格式化之后：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMM5aPabYkBnwESj9PYGQSQaiaMHGlIFKI7BbWI6iacfCXOb1AVSW162E4BZ3RoDV0Xqacl0nYvibo9Zw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 5 其他工具

- **JSONLint**[1]：JSON 数据的验证器；
- **JSONedit**[2]：一个可视化 JSON 构建器，可以轻松构建具有不同数据类型的复杂 JSON 结构；
- **JSON API**[3]：用于在 JSON 中构建 API 的规范；
- **JSON Formatter**[4]：用于验证、美化、缩小和转换 JSON 数据的在线工具；
- **JSON Generator**[5]：生成随机 JSON 数据的在线工具。



# JS 类型转换

[彻底理解JavaScript中的类型转换](https://mp.weixin.qq.com/s?__biz=MzU2MTIyNDUwMA==&mid=2247506470&idx=1&sn=eeb49f27cbf94788d8b1a754ae4acb72&chksm=fc7e947dcb091d6ba42f23a93b768fdbfd01df29a2dce2a17e8b12e7169eb387dcef5a49588f&mpshare=1&scene=23&srcid=12211jbaw11yDo4Giz0PzyXw&sharer_sharetime=1671631771986&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

## 什么是类型转换？

Javascript 是一种弱类型语言，这意味着变量是没有明确类型的，而是由 JavaScript 引擎在编译时隐式完成。类型转换就是将一种数据类型转换为另一种数据类型，例如：

```js
20 + "twenty" // "20twenty"
"10" * "10"   //  100 
2 - "x" 
```

Javascript 使用严格相等（===）和宽松相等（==）来测试两个值的相等性，类型转换仅在使用宽松相等运算符时发生。当使用 === 测试严格相等时，要比较的变量的类型和值都必须相同，例如：

```js
10 === 10     // true
NaN === NaN   // false
```

在上面的代码中，10和10都是数字并且是完全相等的，所以正如预期的那样返回了`true`，两个 NaN 永远不会相等。当使用 == 测试宽松相等时，可能会发生隐式转换：

```js
'20' == 20    // true
false == 0    // true
```

对于任何数据类型，无论是原始类型还是对象，都可以进行类型转换。尽管原始类型和对象的转换逻辑各不相同，但是都只能转换为三种类型：**字符串（string）、数字（number）、布尔值（boolean）**。

JavaScript 中的类型转换有两种方式：

- **隐式类型转换：** 由 JavaScript 编译器完成的自动类型转换。
- **显式类型转换：** 由开发人员完成的手动类型转换。

下面先来看看 JavaScript 中的显式和隐式类型转换。

### 显示类型转换

我们可以通过 JavaScript 内置的一些 API 将一种类型转换为另一种类型，这称为显式类型转化。执行显式类型转换的最简单方法是使用 `Boolean()`、`Number()` 和 `String()`、`parseInt()`等函数，例如：

```js
String(2 - true);     // '1'
'56' === String(56);  // true
Number('2350e-2');    // '23.5'
Number('23') + 7;     // 30
Boolean('');          // false
Boolean(2) === true;  //true
```

### 隐式类型转换

隐式类型转换是将一种数据类型转换为另一种数据类型（确保在相同数据类型之间完成操作）以使运算符或函数正常工作，这种转换是由 JavaScript 编译器自动完成的，隐式类型转换也称为类型强制。例如：

```js
'25' + 15;          // '2515'
23 * '2';           // 46
23 - true;          // 22
true - null;        // 1
false + undefined;  // NaN

const arr = [];
if(arr) { console.log('Hello World') };
```

下面这些常见的操作会触发隐式地类型转换，编写代码时要格外注意：

- 运算相关的操作符：+、-、+=、++、* 、/、%、<<、& 等。
- 数据比较相关的操作符： >、<、== 、<=、>=、===。
- 逻辑判断相关的操作符： &&、!、||、三目运算符。

#### ① + 运算符

```js
/* 一个操作数 */
+ x // 将x转化为数字, 如果不能转化为数组将输出NaN
+ "1234string"   // NaN 
+ 1              // 1
+ '1'            // 1
+ true           // 1
+ undefined      // NaN
+ null           // 0
+ new Date()     // 1660493819396

/* 两个操作数 */
a + b

// 1. 如果其中任何一个是对象，则先将其转换为原始类型
{} + {}          // '[object Object][object Object]'
[] + []          // ''
[] + new Date()  // 'Mon Aug 15 2022 00:18:18 GMT+0800 (中国标准时间)'

// 2. 如果一个是字符串，则将另一个转换为字符串
1 + ''           // '1'
'' + 1           // '1'
'' + true        // 'true'

// 3. 否则，将两者都转换为数字
1 + true         // 2
true + true      // 2
```

#### ② -、*、/、++、--

```js
// 将一个或多个值转换为数字
 - '1'     // -1
 [] - 1    // -1
 [] - {}   // NaN
```

#### ③ ==、!=

```js
// 两个操作数
 a == b

// 1. 如果一个是 `null` 而另一个是 `undefined`，它们是相等的
null == undefined    // true

// 2. 如果一个是数字，另一个是字符串，将字符串转换为数字，再比较
1 == '1'             // true

// 3. 如果其中一个是布尔值，将其转换为数字，再次比较
true == 1            // true
false == 0           // true

// 4. 如果一个是对象，另一个是数字或字符串，将对象转换为原始类型，再次比较
[1] == 1             // true
['1'] == '1'         // true
```

下图是在使用 == 时，判断两个操作数是否相等的总结（绿色表示相等，白色表示不等）：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNDAicd9XaOtQzDHmu83pdMyDXvrQGt9dTanicuxZibmHd9rkAHrFL4hnxqoiclmLN9ove3gYW5Bzv2nw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### ④ >、>=、<、<=

```js
// 两个操作数
a > b

// 1. 如果其中一个是对象，则将其转换为原始类型，再次比较
[2] > 1   // true

// 2. 如果两者都是字符串，使用字母顺序比较它们
'b' > 'a' // true

// 3. 如果其中一个是数字，则将一个或两个非数字转换为数字
'2' > 1   // true
```

#### ⑤ in

```js
/* 如果左操作数不是字符串，则将其转换为字符串 */
 a in b

'1' in {1: ''}    // true
 1 in {1: 'a'}    // true
 1 in ['a', 'b']  // true
```

## 常见类型转换

### （1）字符串转换

将数据类型转换为字符串称为字符串转换，可以使用 `String()` 函数将数据类型显式转换为字符串。当一个操作数是字符串时，可以通过使用 `+` 运算符来触发隐式字符串转换。

#### ① 数字 => 字符串：

Number对象的 `toString()` 方法会返回指定 Number 对象的字符串表示形式。`String()`和 `new String()` 会把对象的值转换为字符串。

```js
String(20);           // '20'
String(10 + 40);      // '50'
(10 + 40).toString(); // '50'
new String(10 + 20);  // '30'
```

#### ② 布尔值 => 字符串：

`String()` 和 `toString()` 方法会将布尔值转化为对应的字符串形式。

```js
String(true);     // 'true'
String(false);    // 'false'
true.toString()   // 'true'
false.toString()  // "false"
```

#### ③ 数组 => 字符串：

`String()` 方法会将数组元素通过逗号连接起来，无论嵌套多少层，都会将其展开并返回元素拼接好的字符串。如果是空数字，会返回空字符串：

```js
String([1, 2, 3]);                // '1,2,3'
String([1, 2, 3, [4, [5]]]);      // '1,2,3,4,5'
String([1, 2, 3, [4, [5, {}]]]);  // '1,2,3,4,5,[object Object]'
String([]);                       // ''
```

#### ④ 对象 => 字符串：

使用 String() 方法会将对象转化为 `'[object Object]'`，无论对象是否为空对象：

```js
String({name: "Hello"});   // '[object Object]'
```

#### ⑤ null / undefined / NaN => 字符串：

使用 `String()` 方法会将  `null`、`undefined`、`NaN` 转化为其对应的字符串形式：

```js
String(undefined);    // 'undefined'
String(null);         // 'null'
String(NaN);          // 'NaN'
```

#### ⑥ 日期 => 字符串：

```js
String(new Date('2022-08-20')) // 'Sat Aug 20 2022 08:00:00 GMT+0800 (中国标准时间)'
```

#### ⑦ 隐式转换

当任何数据类型使用`+`运算符与字符串连接时会发生到字符串的转换（隐式转换）:

```js
"25" + 56;              // '2556'
"25" + null;            // '25null'
"Hello " + undefined;   // 'Hello undefined'
"25" + false;           // '25fasle'
"25" + {};              // '25[object Object]'
"25" + [10];            // '2510'
```

所以，当我们想要创建一个操作并且操作数类型之一是字符串时，应该小心使用类型强制转换。

#### ⑧ 总结

下面是 ECMAScript 规范中将数据类型转换为字符串的规则：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNDAicd9XaOtQzDHmu83pdMyBfPUP1YZFj5qT11xV5dicfx1bBmSo4NzxoWGe2Ac2CLAuEWjBWYgdqA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**ECMAScript 规范：**https://262.ecma-international.org/5.1/#sec-9.8

### （2）布尔转换

将数据类型转换为布尔值称为布尔转换。这种转换既可以由 `Boolean()` 函数显式完成，也可以在逻辑上下文中隐式完成（如if/else ）或通过使用逻辑运算符（ ||、&&、! ）触发。

#### ① 字符串 => 布尔值：

使用 `Boolean()` 方法转化字符串时，只有当字符串为空时会返回`false`，其他情况都会返回 `true`：

```js
Boolean('hello'); // true 
Boolean(' ');     // true 
Boolean('');      // false
```

#### ② 数字 => 布尔值：

使用 `Boolean()` 方法转化数字时，只有 0、-0 或 NaN 会转化为 `false`，其他情况会返回 `true`：

```js
Boolean(-123); // true 
Boolean(123);  // true 
Boolean(0);    // false
Boolean(-0);   // false
Boolean(NaN);  // false
```

#### ③ 数组 / 对象 => 布尔值：

使用 `Boolean()` 方法转化数组或对象时，无论数组和对象是否有内容，都会返回`true`：

```js
Boolean([1, 2, 3]); // true
Boolean([]);        // true
Boolean({});  // true
Boolean({'hello': 'world'});  // true
```

#### ④ null / undefined => 布尔值：

使用 `Boolean()` 方法转化`null`或`undefined`时，都始终返回 `false`：

```js
Boolean(undefined);  // false 
Boolean(null);       // false
```

#### ⑤ 隐式转换

在数学运算中，`true` 转换为 1，`false` 转换为 0：

```js
true + 5;    // 6
false + 5;   // 5
5 - true;    // 5
5 - false;   // 4
```

#### ⑥ 逻辑运算符、逻辑上下文

```js
// 如果其中一个不是布尔值，则将其转换为布尔值
Boolean( null || undefined || 0 || -0 || NaN || '' )    // false
Boolean( 1 && 'a' && { } && [] && [0] && function(){} ) // true
true && false // false
true && true // true
true || false // true
true || !false // true
```

注意，逻辑运算符，例如 `||` 或 `&&` 内部进行布尔转换，但实际上返回原始操作数的值，即使它们不是布尔值。

```js
'hello' && 123;   // 123
```

可以使用双感叹号（`!!`）来将变量转为为布尔值：

```js
!!0    // false
!!""   // false
!!" "  // true
!!{}   // true
!![]   // true
!!true // true
```

if、else if、while、do/while 和 for 使用与 &&、||、! 相同的隐式类型转换方式（逻辑表达式）。

下面是在 if 语句（逻辑上下文）中的隐式转换规则（绿色为`true`，白色为`false`）：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNDAicd9XaOtQzDHmu83pdMytDw7cGu0sW7CbpjxTxuO7lrQkcP5BBsukic1s4OPicJA9qhjvtHCySAg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### ⑦ 总结

除了下面这些之外的所有其他值都是真值，包括对象、数组、日期等。甚至所有Symbol、空对象和数组都是真值。

```js
Boolean('');        // false
Boolean(0);         // false     
Boolean(-0);        // false
Boolean(NaN);       // false
Boolean(null);      // false
Boolean(undefined); // false
Boolean(false);     // false
Boolean({})             // true
Boolean([])             // true
Boolean(Symbol())       // true
Boolean(function() {})  // true
```

可以通过以下方式来过滤数组中的假值：

```js
[0, "", " ", null, undefined, NaN].map(Boolean); 
// 输出结果：[false, false, true, false, false, false]
```

我们可以会遇到一种情况，当使用 `5 == true` 时，结果为`false`，而使用`if(5) {}`时，则 5 被认为是 `true` 并进入`if/else`语句：

```js
5 == true;  // false

if (5) {
    console.log('5');  // 5
};
```

这种情况下，即一个值和数字进行比较时，JavaScript 会试图将这个值转换为数字。所以，当比较`5 == true` 时，JavaScript 倾向于将`true`转换为1，因为 1不等于5，因此结果为 `false`。而在`if(5) {}`的情况下，5 被转换为布尔值，而 5 是一个真值，所以它进入`if`块。在这种情况下，可以选择显式转换以避免错误，因为 5 是一个真值，可以执行`Boolean(5) == true`，这样就会返回`true`了。

下面是 ECMAScript 规范中将数据类型转换为布尔值的规则：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNDAicd9XaOtQzDHmu83pdMyclpHmgJeWOflcsUiaVyZDX4eG0Qibsk8iaj7lTVBibYQLQogUlMPFzia40Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**ECMAScript 规范：**https://262.ecma-international.org/5.1/#sec-9.2

### （3）数字转换

将数据类型转换为数字称为数字转换，可以使用`Number()`、`parseInt()`、`parseFloat()`等方法将数据类型显式转换为数字。当一个值不能被强制转换为一个数字时，就会返回 `NaN`。

#### ① 字符串 => 数字：

当把字符串转换为数字时，JavaScript 引擎首先会修剪前导和后置空格、`\n`、`\t` 字符，如果修剪后的字符串不代表有效数字，则返回 `NaN`。 如果字符串为空，则返回 0。

```js
Number('123');            // 123
Number("-12.34")          // -12.34
Number("12s");            // NaN
Number("\n")              // 0

parseInt(' 203px');       // 203 
parseInt('10.000')        // 10   
parseInt('10.20')         // 10 
parseFloat('203.212px');  // 203.212
parseFloat('10.20')       // 10.2
parseFloat('10.81')       // 10.81
```

可以看到，`parseInt` 函数会从字符串中读取一个数字并删除它后面所有字符，但是如果数字前面有字符（空格除外），那么它将输出 `NaN`。

#### ② 布尔值 => 数字：

当使用 `Number()` 将布尔值转化为数字时，`true` 会转化为 1，`false` 会转化为 0。

```js
Number(true);  // 1
Number(false); // 0
```

#### ③ null  => 数字：

当使用 `Number()` 将 `null` 转化为数字时，会返回 0：

```
Number(null); // 0
null + 5; // 5
```

#### ④ undefined / 数组 / 对象 / NaN => 数字：

当使用 `Number()` 将 `undefined`、数组、对象、`NaN` 转化为数字时，会返回 `NaN`：

```js
Number(undefined);  // NaN
Number([1, 2, 3])   // NaN
Number({})          // NaN
Number(NaN)         // NaN
```

#### ⑤ 数组元素

可以使用`map`遍历数组元素，并使用需要的类型来进行类型转换：

```js
["1", "9", "-9", "0.003", "yes"].map(Number);
// 输出结果：[1, 9, -9, 0.003, NaN]
```

#### ⑥ 特殊规则

在表达式中，当我们将 `==` 运算符应用于 `null` 或 `undefined` 时，不会发生数字转换。 此外，`null` 只等于 `null` 或 `undefined`，不能等于其他任何值：

```js
null == null;           // true 
null == 0;              // false
null == undefined;      // true
undefined == undefined  // true
```

根据运算符优先级，`+` 运算符具有从左到右的关联性，因此如果有一个表达式 `2 + 3 + '4' + 'number'` ，则操作按以下方式完成：

```js
2 + 3 + '4' + 'number'
==> 5 + '4' + 'number'
// 数字 5 被隐式转换为字符串，然后连接起来
==> '54' + 'number'
==> '54number'
```

`NaN` 不等于任何其他类型，甚至它本身：

```js
NaN == NaN  // false
```

#### ⑦ 总结

上面的例子中，可以清楚地看到一些意想不到的结果：将 `null` 转换为数字时返回了 0，而将 `undefined` 转换为数字返回了 `NaN`。两个操作都应该返回 `NaN`，因为这两种值类型显然都不是有效的数字，将空字符串转换为数字时也返回了 0。

下面是 ECMAScript 规范中将数据类型转换为字符串的规则，清楚的解释了上面的异常现象：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNDAicd9XaOtQzDHmu83pdMypVaeWWSJegBgJAtDmicN9ib6PLeabRbd9wy4DAolMRsYYUAF0icFsice1w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

另外，在 ECMAScript 规范中，还提到一点：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNDAicd9XaOtQzDHmu83pdMyAj7zrdmjWmIEII1PjFFHkwPtqXj2uLIWUvsyq6nicV3T1yqJgs38Gzw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

意思就是：**为空或仅包含空格的 StringNumericLiteral 将转换为 +0**。这也就解释了为什么将空字符串转换为数字时也返回了 0。

**ECMAScript 规范：**https://262.ecma-international.org/5.1/#sec-9.3

## Symbol 类型转换

`Symbol` 只能进行显式转换，不能进行隐式转换。也就是说，`Symbol`不能被强制转换为字符串或数字，这样它们就不会被意外地用作本来应该表现为 `Symbol` 的属性。

```js
const mySymbol = Symbol.for("mySymbol");
const str = String(mySymbol);

console.log(str);  // 'Symbol(mySymbol)'
```

当使用 `console.log()` 来打印 `symbol` 时，它之所以有效，是因为 `console.log()` 在 `symbol` 上调用了 `String()` 方法以创建可用的结果。

如果尝试直接使用字符串连接 `symbol`，它将抛出`TypeError`：

```js
const mySymbol = Symbol.for("mySymbol");
const sum = mySymbol + "";
console.log(sum);   // Uncaught TypeError: Cannot convert a Symbol value to a string
```

将 `mySymbol` 连接到字符串需要首先将 `mySymbol` 转换为字符串，并且在检测到强制转换时会抛出错误，从而阻止以这种方式使用它。

同样，我们不能将 `symbol` 强制转换为数字，所有数学运算符在与符号一起使用时都会引发错误：

```js
const mySymbol = Symbol.for("mySymbol");
const factor = mySymbol / 2;
console.log(factor);   // Uncaught TypeError: Cannot convert a Symbol value to a number
```

## 对象类型转换

介绍完了基本数组类型的转化，下面来看看对象类型的转化。例如，当执行 `obj_1 + obj_2` 或者 `obj_1 - obj_2`时，都会先将对象转换为原始类型，然后将其转换为最终类型。当然，这里的转化仍然只有三种类型：数字、字符串和布尔值。

对象通过内部的 `ToPrimitive` 方法将其转换为原始类型，该算法允许我们根据使用对象的上下文来选择应如何转换对象。从概念上讲，ToPrimitive 算法可以分为两部分：Hints 和 Object-to-primitive 转换方法。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNDAicd9XaOtQzDHmu83pdMytlRAbItgSSTIibV7Ite5FziawSUBLncHjjNZANjqQc9UXSSqX7icsYkNA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### （1）Hints

Hints 是 `ToPrimitive` 算法用于确定对象在特定上下文中应转换为什么的信号。有三种情况：

- `string`：在操作需要字符串的上下文中，如果可以转换为字符串，例如 `alert()` 或内置 `String()` 函数：

```js
alert(obj);
String(obj)

// 使用对象作为属性key值
anotherObj[obj] = 1000;
```

- `number`：如果可以进行这种转换，则在操作需要数字的上下文中：

```js
// 显示转换
let num = Number(obj);

// 数学（二进制加号除外）
let x = +obj; // 一元加
let difference = Date1 - Date2; // 日期对象

// 对象大小比较
let less = Obj1 < obj2;
```

- `default`：在极少数情况下发生，不确定需要什么类型。例如，二元 + 运算符既适用于字符串（连接它们）也适用于数字（添加它们）。在这种情况下，对象可以转换为字符串或数字。 或者当使用宽松相等 == 运算符将对象与字符串、数字或 symbol 进行比较时。

```js
// 二元加
let sum = obj1 + obj2;

// obj == string/number/symbol
if (obj == 10 ) { ... };
```

所有内置对象（日期除外）都将`default`认为是`number`，Date 日期对象将`default`认为是`string`。

### （2）Methods

在 ToPrimitive 算法根据 `Hints` 确定对象应转换为的原始值类型之后。 然后使用 Object-to-primitive 转换方法将对象转换为原始值。有三种情况：

- `toString/valueOf`：`toString()` 和 `valueOf()` 被 JavaScript 中的所有对象继承。 它们仅用于对象到原始值的转换。 ToPrimitive 算法首先会尝试 `toString()` 方法。 如果定义了方法，它返回一个原始值，那么 JavaScript 使用原始值（即使它不是字符串）。 如果`toString()` 返回一个对象或不存在，那么 JavaScript 会尝试使用 `valueOf()` 方法，如果该方法存在并返回一个原始值，JavaScript 将使用该值。 否则，转换失败并提示 `TypeError`。
- `toString -> valueOf`：用于 Hints 为`string` 的情况。
- `valueOf -> toString`：其他情况。

```js
let Person = {
  name: "Mary",
  age: 22,

  // hint 是 "string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // hint 是 "number" 或 "default"
  valueOf() {
    return this.age;
  }
};

alert(Person);      // toString -> {name: "Mary"}
alert(+Person);     // valueOf -> 22
alert(Person + 10); // valueOf -> 32
```

在上面的代码中，`Person` 变成了一个对象字符串或数字，具体取决于转换上下文。 `toString()` 方法用于 Hints = "string" 的转换，`valueOf()` 用于其他情况（Hints 为“number”或“default”）。

你可能希望在一个地方处理所有转换。 在这种情况下，只能像这样实现 `toString()` 方法：

```js
let Person = {
  name: "Mary",

  toString() {
    return this.name;
  }
};

alert(Person); // toString -> Mary
alert(Person + 1000); // toString -> Mary1000
```

`Symbol.toPrimitive`：与 `toString()` 和 `valueOf()` 方法不同，`Symbol.toPrimitive` 允许覆盖 JavaScript 中的默认对象到原始值的转换（其中 `toString()` 和 `valueOf` 方法由 ToPrimitive 算法使用）并定义我们希望如何将对象转换为原始类型的值。 为此，需要使用此 Symbol 名称定义一个方法，如下所示：

```js
obj[Symbol.toPrimitive] = function(hint) {
  // 返回原始类型值
  // hint 等于 "string", "number", "default" 中的一个
}
```

例如，这里的 `Person` 对象使用 `Symbol.toPrimitive` 执行与上面相同的操作：

```js
let Person = {
  name: "Mary",
  age: 22,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.age;
  }
};

alert(Person);       // hint: string -> {name: "Mary"}
alert(+Person);      // hint: number -> 22
alert(Person + 10);  // hint: default -> 32
```

可以看到，单个方法 `Person[Symbol.toPrimitive]` 处理了所有转换情况。需要注意，在没有 `Symbol.toPrimitive` 和 `valueOf()` 的情况下，`toString()` 将处理所有原始类型转换。

下面是将对象转化为布尔值、字符串、数字时的执行过程：

**（1）对象到布尔值的转换**

Javascript 中的所有对象都转换为 true，包括包装对象 new Boolean(false) 和空数组。 对象到布尔值的转换不需要对象到原始类型算法。

**（2）对象到字符串的转换**

当需要将对象转换为字符串时，Javascript 首先使用 ToPrimitive 算法（Hints = “string”）将其转换为原始类型，然后将派生的原始类型转换为字符串。例如，如果将对象传递给 String() 这样的内置函数，或者在模板字符串中插入对象时。

**（3）对象到数字的转换**

当需要将对象转换为数字时，Javascript 首先使用  ToPrimitive  算法（Hints = “number”）将其转换为原始类型，然后将派生的原始类型转换为数字。 期望数字参数的内置 Javascript 函数和方法以这种方式将对象参数转换为数字，例如 Math()。

### （3）特殊情况

当某些 Javascript 运算符的操作数是对象时，也会发生类型转换：

- **+ 运算符：** 此运算符可以用于执行数字加法和字符串连接。如果其中任何一个操作数是对象，则使用  ToPrimitive 算法（Hints = “default”）将它们转换为原始值。一旦将它们转换为原始值，就会检查它们的类型。如果任一参数是字符串，则将另一个参数转换为字符串并连接字符串。否则，它将两个参数都转换为数字并将它们相加。
- **== 和 !== 运算符：** 这些运算符以宽松方式执行相等和不相等测试。如果一个操作数是一个对象而另一个是一个原始值，这些运算符使用  ToPrimitive  算法（Hints = “default”）将对象转换为原始值，然后比较两个原始值。
- **<,<=,> 和 >= 关系运算符：** 关系运算符用于比较两个值之间的关系，可用于比较数字和字符串。如果任一操作数是对象，则使用 ToPrimitive 算法将其转换为原始值（Hints = “number”）。但是，与对象到数字的转换不同，返回的原始值不会转换为数字（因为它们被比较并且不被使用）。

**参考文章：**

> - https://blog.openreplay.com/javascript-type-conversions-explained
> - https://blog.logrocket.com/type-coercion-in-javascript/



# JS 错误处理完整指南

> 本文将带你了解 JavaScript 中常见的错误类型，处理同步和异步 JavaScript/Node.js 代码中错误和异常的方式，以及错误处理最佳实践！ [JavaScript错误处理完整指南](https://mp.weixin.qq.com/s?__biz=MzU2MTIyNDUwMA==&mid=2247509677&idx=1&sn=f23bb1e4a2dba8e7e31ed58bfbd927cf&chksm=fc7ee8f6cb0961e080248262d4e5315f0eb914af4b2040d2d76ee23588fc93ec1dee007f7765&mpshare=1&scene=23&srcid=1220L2nhDZoblGg6xu3Hk6Ub&sharer_sharetime=1671534218623&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

## 错误概述

JavaScript 中的错误是一个对象，在发生错误时会抛出该对象以停止程序。在 JavaScript 中，可以通过构造函数来创建一个新的通用错误：

```
const err = new Error("Error");
```

当然，也可以省略 new 关键字：

```
const err = Error("Error");
```

Error 对象有三个属性：

- `message`：带有错误消息的字符串；
- `name`: 错误的类型；
- `stack`：函数执行的堆栈跟踪。

例如，创建一个 TypeError 对象，该消息将携带实际的错误字符串，其 name 将是“TypeError”：

```
const wrongType = TypeError("Expected number");

wrongType.message; // 'Expected number'
wrongType.name;    // 'TypeError'
```

堆栈跟踪是发生异常或警告等事件时程序所处的方法调用列表：![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMNJibrHzI61FGON7Cwq9nyWgvEAJNTDHZnRzTs1oQbXibpo3cLCCTqm20K9rolPldibD3IraFFibMxaQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)它首先会打印错误名称和消息，然后是被调用的方法列表。每个方法调用都说明其源代码的位置和调用它的行。可以使用此数据来浏览代码库并确定导致错误的代码段。此方法列表以堆叠的方式排列。它显示了异常首先被抛出的位置以及它如何通过堆栈方法调用传播。为异常实施捕获不会让它通过堆栈向上传播并使程序崩溃。

对于 Error 对象，Firefox 还实现了一些非标准属性：

- `columnNumber`：错误所在行的列号；
- `filename`：发生错误的文件
- `lineNumber`：发生错误的行号

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMNJibrHzI61FGON7Cwq9nyWD78ERK9ElMVqrC2WDywfblOHyDFuq65oMAKvhibB6PlPZghDe9dPGiag/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 错误类型

JavaScript 中有一系列预定义的错误类型。只要使用者没有明确处理应用程序中的错误，它们就会由 JavaScript 运行时自动选择和定义。

JavaScript中的错误类型包括：

- EvalError
- InternalError
- RangeError
- ReferenceError
- SyntaxError
- TypeError
- URIError

这些错误类型都是实际的构造函数，旨在返回一个新的错误对象。最常见的就是 TypeError。大多数时候，大部分错误将直接来自 JavaScript 引擎，例如 InternalError 或 SyntaxError。

JavaScript 提供了 `instanceof` 运算符可以用于区分异常类型：

```
try {
  If (typeof x !== ‘number’) {
       throw new TypeError(‘x 应是数字’);
  } else if (x <= 0) {
       throw new RangeError('x 应大于 0');
  } else {
       // ...
  }
} catch (err) {
    if (err instanceof TypeError) {
      // 处理 TypeError 错误
    } else if (err instanceof RangeError) {
      // 处理 RangeError 错误
  } else {
      // 处理其他类型错误
  }
}
```

下面来了解 JavaScript 中最常见的错误类型，并了解它们发生的时间和原因。

### （1）SyntaxError

SyntaxError 表示语法错误。这些错误是最容易修复的错误之一，因为它们表明代码语法中存在错误。由于 JavaScript 是一种解释而非编译的脚本语言，因此当应用程序执行包含错误的脚本时会抛出这些错误。在编译语言的情况下，此类错误在编译期间被识别。因此，在修复这些问题之前，不会创建应用程序二进制文件。

SyntaxError 发生的一些常见原因是：

- 缺少引号
- 缺少右括号
- 大括号或其他字符对齐不当

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMNJibrHzI61FGON7Cwq9nyWUFdYj57d6kEkXfmwjzKm63KYzbElYfIPv3VRtmODy8PsMIPTNJYAPw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### （2）TypeError

TypeError 是 JavaScript 应用程序中最常见的错误之一，当某些值不是特定的预期类型时，就会产生此错误。![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMNJibrHzI61FGON7Cwq9nyWjOSEZo7fPO4a2QLibvUREzoKt88q9wv8qKYGMtzGsj1ZvlAkBoMPlxw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)TypeError 发生的一些常见原因是：

- 调用不是方法的对象。
- 试图访问 null 或未定义对象的属性
- 将字符串视为数字，反之亦然

### （3）ReferenceError

ReferenceError 表示引用错误。当代码中的变量引用有问题时，会发生 ReferenceError。可能忘记在使用变量之前为其定义一个值，或者可能试图在代码中使用一个不可访问的变量。在任何情况下，通过堆栈跟踪都可以提供充足的信息来查找和修复有问题的变量引用。

ReferenceErrors 发生的一些常见原因如下：

- 在变量名中输入错误。
- 试图访问其作用域之外的块作用域变量。
- 在加载之前从外部库引用全局变量。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMNJibrHzI61FGON7Cwq9nyWcVSia0D1HO5LoctW6RICjrFPvP1QQibfvl647opkxCCLoF9teB8fiaSsQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### （4）RangeError

RangeError 表示范围错误。当变量设置的值超出其合法值范围时，将抛出 RangeError。它通常发生在将值作为参数传递给函数时，并且给定值不在函数参数的范围内。当使用记录不完整的第三方库时，有时修复起来会很棘手，因为需要知道参数的可能值范围才能传递正确的值。

RangeError 发生的一些常见场景如下：

- 试图通过 Array 构造函数创建非法长度的数组。
- 将错误的值传递给数字方法，例如 `toExponential()`、`toPrecision()`、`toFixed()` 等。
- 将非法值传递给字符串函数，例如 `normalize()`。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMNJibrHzI61FGON7Cwq9nyWCicXL3icNY4Eot2br7eQDcNL7DGE0FYySkUDO41hm3ZVmgL8tDPE34Qg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### （5）URIError

URIError 表示 URI错误。当 URI 的编码和解码出现问题时，会抛出 URIError。JavaScript 中的 URI 操作函数包括：`decodeURI`、`decodeURIComponent` 等。如果使用了错误的参数（无效字符），就会抛出 URIError。![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMNJibrHzI61FGON7Cwq9nyWmqWgxACwqYwvLXQOicVcKlMJsyhJia7mDfVcdhMYK3DBw21Mul1BCozQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### （6）EvalError

EvalError 表示 Eval 错误。当 `eval()` 函数调用发生错误时，会抛出 EvalError。不过，当前的 JavaScript 引擎或 ECMAScript 规范不再抛出此错误。但是，为了向后兼容，它仍然是存在的。

如果使用的是旧版本的 JavaScript，可能会遇到此错误。在任何情况下，最好调查在eval()函数调用中执行的代码是否有任何异常。

### （7）InternalError

InternalError 表示内部错误。在 JavaScript 运行时引擎发生异常时使用。它表示代码可能存在问题也可能不存在问题。

InternalError 通常只发生在两种情况下：

- 当 JavaScript 运行时的补丁或更新带有引发异常的错误时（这种情况很少发生）；
- 当代码包含对于 JavaScript 引擎而言太大的实体时（例如，数组初始值设定项太大、递归太多）。

解决此错误最合适的方法就是通过错误消息确定原因，并在可能的情况下重构应用逻辑，以消除 JavaScript 引擎上工作负载的突然激增。

**注意：** 现代 JavaScript 中不会抛出 EvalError 和 InternalError。

### （8）创建自定义错误类型

虽然 JavaScript 提供了足够的错误类型类列表来涵盖大多数情况，但如果这些错误类型不能满足要求，还可以创建新的错误类型。这种灵活性的基础在于 JavaScript 允许使用 throw 命令抛出任何内容。

可以通过扩展 Error 类以创建自定义错误类：

```
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
```

可以通过以下方式使用它：

```
throw ValidationError("未找到该属性: name")
```

可以使用 `instanceof` 关键字识别它：

```
try {
    validateForm() // 抛出 ValidationError 的代码
} catch (e) {
    if (e instanceof ValidationError) {
      
    }
    else {
      
    }
}
```

## 抛出错误

很多人认为错误和异常是一回事。实际上，**Error 对象只有在被抛出时才会成为异常**。

在 JavaScript 中抛出异常，可以使用 throw 来抛出 Error 对象：

```
throw TypeError("Expected number");
```

或者：

```
throw new TypeError("Expected number");
```

来看一个简单的例子：

```
function toUppercase(string) {
  if (typeof string !== "string") {
    throw TypeError("Expected string");
  }

  return string.toUpperCase();
}
```

在这里，我们检查函数参数是否为字符串。如果不是，就抛出异常。

从技术上讲，我们可以在 JavaScript 中抛出任何东西，而不仅仅是 Error 对象：

```
throw Symbol();
throw 33;
throw "Error!";
throw null;
```

但是，最好避免这样做：**要抛出正确的 Error 对象，而不是原语**。

## 抛出异常时会发生什么？

异常一旦抛出，就会在程序堆栈中冒泡，除非在某个地方被捕获。

来看下面的例子：

```
function toUppercase(string) {
  if (typeof string !== "string") {
    throw TypeError("Expected string");
  }

  return string.toUpperCase();
}

toUppercase(4);
```

在浏览器或 Node.js 中运行此代码，程序将停止并抛出错误：![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMNJibrHzI61FGON7Cwq9nyWicw0wiaibv2CG8BuTl3A3ibYGtbDKljnYPoicmnXBIyLgYYU5EZU9pRtlYw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)这里还显示了发生错误的确切行。这个错误就是一个**堆栈跟踪**，有助于跟踪代码中的问题。堆栈跟踪从下到上：

```
at toUppercase (<anonymous>:3:11)
at <anonymous>:9:1
```

toUppercase 函数在第 9 行调用，在第 3 行抛出错误。除了在浏览器的控制台中查看此堆栈跟踪之外，还可以在 Error 对象的 `stack` 属性上访问它。

介绍完这些关于错误的基础知识之后，下面来看看同步和异步 JavaScript 代码中的错误和异常处理。

## 同步错误处理

### （1）常规函数的错误处理

同步代码会按照代码编写顺序执行。让我们再看看前面的例子：

```
function toUppercase(string) {
  if (typeof string !== "string") {
    throw TypeError("Expected string");
  }

  return string.toUpperCase();
}

toUppercase(4);
```

在这里，引擎调用并执行 toUppercase，这一切都是同步发生的。 要捕获由此类同步函数引发的异常，可以使用 try/catch/finally：

```
try {
  toUppercase(4);
} catch (error) {
  console.error(error.message);
} finally {
  // ...
}
```

通常，try 会处理正常的路径，或者可能进行的函数调用。catch 就会捕获实际的异常，它接收 Error 对象。而不管函数的结果如何，finally 语句都会运行：无论它失败还是成功，finally 中的代码都会运行。

### （2）生成器函数的错误处理

JavaScript 中的生成器函数是一种特殊类型的函数。它可以随意暂停和恢复，除了在其内部范围和消费者之间提供双向通信通道。为了创建一个生成器函数，需要在 function 关键字后面加上一个 `*`：

```
function* generate() {
//
}
```

只要进入函数，就可以使用 yield 来返回值：

```
function* generate() {
  yield 33;
  yield 99;
}
```

生成器函数的返回值是一个迭代器对象。要从生成器中提取值，可以使用两种方法：

- 在迭代器对象上调用 `next()`
- 使用 `for...of` 进行迭代

以上面的代码为例，要从生成器中获取值，可以这样做：

```
function* generate() {
  yield 33;
  yield 99;
}

const go = generate();
```

当我们调用生成器函数时，这里的 go 就是生成的迭代器对象。接下来，就可以调用 go.next() 来继续执行：

```
function* generate() {
  yield 33;
  yield 99;
}

const go = generate();

const firstStep = go.next().value; // 33
const secondStep = go.next().value; // 99
```

生成器也可以接受来自调用者的值和异常。除了 next()，从生成器返回的迭代器对象还有一个 throw() 方法。使用这种方法，就可以通过向生成器中注入异常来停止程序：

```
function* generate() {
  yield 33;
  yield 99;
}

const go = generate();

const firstStep = go.next().value; // 33

go.throw(Error("Tired of iterating!"));

const secondStep = go.next().value; // never reached
```

要捕获此类错误，可以使用 try/catch 将代码包装在生成器中：

```
function* generate() {
  try {
    yield 33;
    yield 99;
  } catch (error) {
    console.error(error.message);
  }
}
```

生成器函数也可以向外部抛出异常。 捕获这些异常的机制与捕获同步异常的机制相同：try/catch/finally。

下面是使用 for...of 从外部使用的生成器函数的示例：

```
function* generate() {
  yield 33;
  yield 99;
  throw Error("Tired of iterating!");
}

try {
  for (const value of generate()) {
    console.log(value);
  }
} catch (error) {
  console.error(error.message);
}
```

输出结果如下：![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMNJibrHzI61FGON7Cwq9nyWKL2iaHzslIuiaKZsqq7RUakMht6rX9zRhreeMnZl3tQWuRPHf61W9PAA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)这里，try 块中包含正常的迭代。如果发生任何异常，就会用 catch 捕获它。

## 异步错误处理

浏览器中的异步包括定时器、事件、Promise 等。异步世界中的错误处理与同步世界中的处理不同。下面来看一些例子。

### （1）定时器的错误处理

上面我们介绍了如何使用 try/catch/finally 来处理错误，那异步中可以使用这些来处理错误吗？先来看一个例子：

```
function failAfterOneSecond() {
  setTimeout(() => {
    throw Error("Wrong!");
  }, 1000);
}
```

此函数在大约 1 秒后会抛出错误。那处理此异常的正确方法是什么？以下代码是无效的：

```
function failAfterOneSecond() {
  setTimeout(() => {
    throw Error("Wrong!");
  }, 1000);
}

try {
  failAfterOneSecond();
} catch (error) {
  console.error(error.message);
}
```

我们知道，try/catch是同步的，所以没办法这样来处理异步中的错误。当传递给 setTimeout的回调运行时，try/catch 早已执行完毕。程序将会崩溃，因为未能捕获异常。它们是在两条路径上执行的：

```
A: --> try/catch
B: --> setTimeout --> callback --> throw
```

### （2）事件的错误处理

我们可以监听页面中任何 HTML 元素的事件，DOM 事件的错误处理机制遵循与任何异步 Web API 相同的方案。

来看下面的例子：

```
const button = document.querySelector("button");

button.addEventListener("click", function() {
  throw Error("error");
});
```

这里，在单击按钮后立即抛出了异常，我们该如何捕获这个异常呢？这样写是不起作用的，也不会阻止程序崩溃：

```
const button = document.querySelector("button");

try {
  button.addEventListener("click", function() {
    throw Error("error");
  });
} catch (error) {
  console.error(error.message);
}
```

与前面的 setTimeout 例子一样，任何传递给 addEventListener 的回调都是异步执行的：

```
Track A: --> try/catch
Track B: --> addEventListener --> callback --> throw
```

如果不想让程序崩溃，为了正确处理错误，就必须将 try/catch 放到 addEventListener 的回调中。不过这样做并不是最佳的处理方式，与 setTimeout 一样，异步代码路径抛出的异常无法从外部捕获，并且会使程序崩溃。

下面会介绍 Promises 和 async/await 是如何简化异步代码的错误处理的。

### （3）onerror

HTML 元素有许多事件处理程序，例如 `onclick`、`onmouseenter`、`onchange` 等。除此之外，还有 `onerror`，每当 `<img>` 标签或 `<script>` 等 HTML 元素命中不存在的资源时，onerror 事件处理程序就会触发。

来看下面的例子：

```
<body>
  <img src="nowhere-to-be-found.png">
</body>
```

当访问的资源缺失时，浏览器的控制台就会报错：

```
GET :5000/nowhere-to-be-found.png
[HTTP/1.1 404 Not Found 3ms]
```

在 JavaScript 中，可以使用适当的事件处理程序“捕获”此错误：

```
const image = document.querySelector("img");

image.onerror = function(event) {
  console.log(event);
};
```

或者使用 addEventListener 来监听 error 事件，当发生错误时进行处理：

```
const image = document.querySelector("img");

image.addEventListener("error", function(event) {
  console.log(event);
});
```

此模式对于加载备用资源以代替丢失的图像或脚本很有用。不过需要记住：onerror 与 throw 或 try/catch 是无关的。

### （4）Promise 的错误处理

下面来通过最上面的 toUppercase 例子看看 Promise 是如何处理错误的：

```
function toUppercase(string) {
  if (typeof string !== "string") {
    throw TypeError("Expected string");
  }

  return string.toUpperCase();
}

toUppercase(4);
```

对上面的代码进行修改，不返回简单的字符串或异常，而是分别使用 `Promise.reject` 和 `Promise.resolve` 来处理错误和成功：

```
function toUppercase(string) {
  if (typeof string !== "string") {
    return Promise.reject(TypeError("Expected string"));
  }

  const result = string.toUpperCase();

  return Promise.resolve(result);
}
```

从技术上讲，这段代码中没有任何异步的内容，但它可以很好地说明 Promise 的错误处理机制。

现在我们就可以在 then 中使用结果，并使用 catch 来处理被拒绝的 Promise：

```
toUppercase(99)
  .then(result => result)
  .catch(error => console.error(error.message));
```

输出结果如下：![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMNJibrHzI61FGON7Cwq9nyWhQoCMCZUPvPHks9HEfOicN9TuZBeJ0yh8cLqk4sBDxbbUOx0o2ZsDMg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)在 Promise 中，catch 是用来处理错误的。除了 catch 还有 finally，类似于 try/catch 中的finally。不管 Promise 结果如何，finally 都会执行：

```
toUppercase(99)
  .then(result => result)
  .catch(error => console.error(error.message))
  .finally(() => console.log("Finally"));
```

输出结果如下：![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMNJibrHzI61FGON7Cwq9nyWS0hEDWzgeYDUGf4G3jFx8mA7MypaCc8CZRicFjIlYicoIvRE5GWcklQQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)需要记住，任何传递给 then/catch/finally 的回调都是由微任务队列异步处理的。 它们是微任务，优先于事件和计时器等宏任务。

### （5）Promise, error, throw

作为拒绝 Promise 时的最佳实践，可以传入 error 对象：

```
Promise.reject(TypeError("Expected string"));
```

这样，在整个代码库中保持错误处理的一致性。 其他团队成员总是可以访问 error.message，更重要的是可以检查堆栈跟踪。

除了 `Promise.rejec`t 之外，还可以通过抛出异常来退出 Promise 执行链。来看下面的例子：

```
Promise.resolve("A string").then(value => {
  if (typeof value === "string") {
    throw TypeError("Expected number!");
  }
});
```

这里使用 字符串来 resolve 一个 Promise，然后执行链立即使用 throw 断开。为了停止异常的传播，可以使用 catch 来捕获错误：

```
Promise.resolve("A string")
  .then(value => {
    if (typeof value === "string") {
      throw TypeError("Expected number!");
    }
  })
  .catch(reason => console.log(reason.message));
```

这种模式在 fetch 中很常见，可以通过检查 response 对象来查找错误：

```
fetch("https://example-dev/api/")
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.json();
  })
  .then(json => console.log(json));
```

这里的异常可以使用 catch 来拦截。 如果失败了，并且没有拦截它，异常就会在堆栈中向上冒泡。这本身并没有什么问题，但不同的环境对未捕获的拒绝有不同的反应。

例如，Node.js 会让任何未处理 Promise 拒绝的程序崩溃：

```
DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

所以，最好去捕获错误。

### （6）使用 Promise 处理定时器错误

对于计时器或事件，不能捕获回调抛出的异常。上面有一个例子：

```
function failAfterOneSecond() {
  setTimeout(() => {
    throw Error("Error");
  }, 1000);
}

// 不生效
try {
  failAfterOneSecond();
} catch (error) {
  console.error(error.message);
}
```

我们可以使用 Promise 来包装计时器：

```
function failAfterOneSecond() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(Error("Error"));
    }, 1000);
  });
}
```

这里通过 reject 捕获了一个 Promise 拒绝，它带有一个 error 对象。此时就可以用 catch 来处理异常了：

```
failAfterOneSecond().catch(reason => console.error(reason.message));
```

这里使用 value 作为 Promise 的返回值，使用 reason 作为拒绝的返回对象。

### （7）Promise.all 的错误处理

Promise.all 方法接受一个 Promise 数组，并返回所有解析 Promise 的结果数组：

```
const promise1 = Promise.resolve("one");
const promise2 = Promise.resolve("two");

Promise.all([promise1, promise2]).then((results) => console.log(results));

// 结果： ['one', 'two']
```

如果这些 Promise 中的任何一个被拒绝，Promise.all 将拒绝并返回第一个被拒绝的 Promise 的错误。

为了在 Promise.all 中处理这些情况，可以使用 catch：

```
const promise1 = Promise.resolve("good");
const promise2 = Promise.reject(Error("Bad"));
const promise3 = Promise.reject(Error("Bad+"));

Promise.all([promise1, promise2, promise3])
  .then(results => console.log(results))
  .catch(error => console.error(error.message));
```

如果想要运行一个函数而不考虑 Promise.all 的结果，可以使用 finally：

```
Promise.all([promise1, promise2, promise3])
  .then(results => console.log(results))
  .catch(error => console.error(error.message))
  .finally(() => console.log("Finally"));
```

### （8）Promise.any 的错误处理

Promise.any 和 Promise.all 恰恰相反。Promise.all 如果某一个失败，就会抛出第一个失败的错误。而 Promise.any 总是返回第一个成功的 Promise，无论是否发生任何拒绝。

相反，如果传递给 Promise.any 的所有 Promise 都被拒绝，那产生的错误就是 AggregateError。 来看下面的例子：

```
const promise1 = Promise.reject(Error("Error"));
const promise2 = Promise.reject(Error("Error+"));

Promise.any([promise1, promise2])
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("Finally"));
```

输出结果如下：![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMNJibrHzI61FGON7Cwq9nyWcko6z0sIZqeh1uyGOibFPYnCKrxHQ6fzicabOBmRbojr9FBzZUibNicmQA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)这里用 catch 处理错误。AggregateError 对象具有与基本错误相同的属性，外加一个 errors 属性：

```
const promise1 = Promise.reject(Error("Error"));
const promise2 = Promise.reject(Error("Error+"));

Promise.any([promise1, promise2])
  .then(result => console.log(result))
  .catch(error => console.error(error.errors))
  .finally(() => console.log("Finally"));
```

此属性是一个包含所有被拒绝的错误信息的数组：![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMNJibrHzI61FGON7Cwq9nyWiarlIlODA5P6zIDiaTWo1lib7O2ClzDp6aX4N7N661FvADtch4YE4JLzQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### （9）Promise.race 的错误处理

Promise.race 接受一个 Promise 数组，并返回第一个成功的 Promise 的结果：

```
const promise1 = Promise.resolve("one");
const promise2 = Promise.resolve("two");

Promise.race([promise1, promise2]).then(result => 
  console.log(result)
);

// 结果：one
```

那如果有被拒绝的 Promise，但它不是传入数组中的第一个呢：

```
const promise1 = Promise.resolve("one");
const rejection = Promise.reject(Error("Bad"));
const promise2 = Promise.resolve("two");

Promise.race([promise1, rejection, promise2]).then(result =>
  console.log(result)
);

// 结果：one
```

这样结果还是 one，不会影响正常的执行。

如果被拒绝的 Promise 是数组的第一个元素，则 Promise.race 拒绝，就必须要必须捕获拒绝：

```
const promise1 = Promise.resolve("one");
const rejection = Promise.reject(Error("Bad"));
const promise2 = Promise.resolve("two");

Promise.race([rejection, promise1, promise2])
  .then(result => console.log(result))
  .catch(error => console.error(error.message));

// Bad
```

### （10）Promise.allSettled 的错误处理

Promise.allSettled 是 ECMAScript 2020 新增的 API。它和 Promise.all 类似，不过不会被短路，也就是说当Promise全部处理完成后，可以拿到每个 Promise 的状态, 而不管其是否处理成功。

来看下面的例子：

```
const promise1 = Promise.resolve("Good!");
const promise2 = Promise.reject(Error("Bad!"));

Promise.allSettled([promise1, promise2])
  .then(results => console.log(results))
  .catch(error => console.error(error))
  .finally(() => console.log("Finally"));
```

这里向 Promise.allSettled 传递了一个包含两个 Promise 的数组：一个已解决，另一个已拒绝。

输出结果如下：![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMNJibrHzI61FGON7Cwq9nyWOqCzgDOiavob0340wkuoTbvqT1VswV6714yBGgytG6UicxIjPoaS8N2w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### （11）async/await 的错误处理

JavaScript 中的 async/await 表示异步函数，用同步的方式去编写异步，可读性更好。

下面来改编上面的同步函数 toUppercase，通过将 async 放在 function 关键字之前将其转换为异步函数：

```
async function toUppercase(string) {
  if (typeof string !== "string") {
    throw TypeError("Expected string");
  }

  return string.toUpperCase();
}
```

只需在 function 前加上 async 前缀，就可以让函数返回一个 Promise。这意味着我们可以在函数调用之后链式调用 then、catch 和 finally：

```
toUppercase("hello")
  .then(result => console.log(result))
  .catch(error => console.error(error.message))
  .finally(() => console.log("Always runs!"));
```

当从 async 函数中抛出异常时，异常会成为底层 Promise 被拒绝的原因。任何错误都可以从外部用 catch 拦截。

除此之外，还可以使用 try/catch/finally 来处理错误，就像在同步函数中一样。

例如，从另一个函数 consumer 中调用 toUppercase，它方便地用 try/catch/finally 包装了函数调用：

```
async function toUppercase(string) {
  if (typeof string !== "string") {
    throw TypeError("Expected string");
  }

  return string.toUpperCase();
}

async function consumer() {
  try {
    await toUppercase(98);
  } catch (error) {
    console.error(error.message);
  } finally {
    console.log("Finally");
  }
}

consumer();
```

输出结果如下：![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMNJibrHzI61FGON7Cwq9nyWHWbianRibsYzALASvHicUXUkrlZ3kMeG5JHhJ7nEUc7b4fr2pm23bXPFA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### （12）异步生成器的错误处理

JavaScript 中的异步生成器是能够生成 Promise 而不是简单值的生成器函数。它将生成器函数与异步相结合，结果是一个生成器函数，其迭代器对象向消费者公开一个 Promise。

要创建一个异步生成器，需要声明一个带有星号 * 的生成器函数，前缀为 async：

```
async function* asyncGenerator() {
  yield 33;
  yield 99;
  throw Error("Bad!"); // Promise.reject
}
```

因为异步生成器是基于 Promise，所以同样适用 Promise 的错误处理规则，在异步生成器中，throw 会导致 Promise 拒绝，可以用 catch 拦截它。

要想从异步生成器处理 Promise，可以使用 then：

```
const go = asyncGenerator();

go.next().then(value => console.log(value));
go.next().then(value => console.log(value));
go.next().catch(reason => console.error(reason.message));
```

输出结果如下：![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMNJibrHzI61FGON7Cwq9nyWicLbibMicicx7luQd1zAJObuaicIcA82KPZdcWxoib47904Zkf6HZzuo6CsQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)也使用异步迭代 for await...of。 要使用异步迭代，需要用 async 函数包装 consumer：

```
async function* asyncGenerator() {
  yield 33;
  yield 99;
  throw Error("Bad"); // Promise.reject
}

async function consumer() {
  for await (const value of asyncGenerator()) {
    console.log(value);
  }
}

consumer();
```

与 async/await 一样，可以使用 try/catch 来处理任何异常：

```
async function* asyncGenerator() {
  yield 33;
  yield 99;
  throw Error("Bad"); // Promise.reject
}

async function consumer() {
  try {
    for await (const value of asyncGenerator()) {
      console.log(value);
    }
  } catch (error) {
    console.error(error.message);
  }
}

consumer();
```

输出结果如下：![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMNJibrHzI61FGON7Cwq9nyW1dVphMKsbiao6CNdsE2nY41qpicctBZyFYx97Kwy4QpSCticJAyovJzCA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)从异步生成器函数返回的迭代器对象也有一个 `throw()` 方法。在这里对迭代器对象调用 throw() 不会抛出异常，而是 Promise 拒绝：

```
async function* asyncGenerator() {
  yield 33;
  yield 99;
  yield 11;
}

const go = asyncGenerator();

go.next().then(value => console.log(value));
go.next().then(value => console.log(value));

go.throw(Error("Reject!"));

go.next().then(value => console.log(value)); 
```

输出结果如下：![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMMNJibrHzI61FGON7Cwq9nyWOicwy49sq6nCFLicLePF0MY3hEm5tS9t6ncejyytiazUQRvGPnJrfcY8Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)可以通过以下方式来捕获错误：

```
go.throw(Error("Let's reject!")).catch(reason =>
  console.error(reason.message)
);
```

我们知道，迭代器对象的 throw() 是在生成器内部发送异常的。所以还可以使用以下方式来处理错误：

```
async function* asyncGenerator() {
  try {
    yield 33;
    yield 99;
    yield 11;
  } catch (error) {
    console.error(error.message);
  }
}

const go = asyncGenerator();

go.next().then(value => console.log(value));
go.next().then(value => console.log(value));

go.throw(Error("Reject!"));

go.next().then(value => console.log(value));
```

## Node.js 错误处理

### （1）同步错误处理

Node.js 中的同步错误处理与 JavaScript 是一样的，可以使用 try/catch/finally。

### （2）异步错误处理：回调模式

对于异步代码，Node.js 强烈依赖两个术语：

- 事件发射器
- 回调模式

在回调模式中，异步 Node.js API 接受一个函数，该函数通过事件循环处理并在调用堆栈为空时立即执行。

来看下面的例子：

```
const { readFile } = require("fs");

function readDataset(path) {
  readFile(path, { encoding: "utf8" }, function(error, data) {
    if (error) console.error(error);
    // data操作
  });
}
```

这里可以看到回调中错误处理：

```
function(error, data) {
    if (error) console.error(error);
    // data操作
}
```

如果使用 fs.readFile 读取给定路径时出现任何错误，我们都会得到一个 error 对象。这时我们可以：

- 单地记录错误对象。
- 抛出异常。
- 将错误传递给另一个回调。

要想抛出异常，可以这样做：

```
const { readFile } = require("fs");

function readDataset(path) {
  readFile(path, { encoding: "utf8" }, function(error, data) {
    if (error) throw Error(error.message);
    // data操作
  });
}
```

但是，与 DOM 中的事件和计时器一样，这个异常会使程序崩溃。 使用 try/catch 停止它的尝试将不起作用：

```
const { readFile } = require("fs");

function readDataset(path) {
  readFile(path, { encoding: "utf8" }, function(error, data) {
    if (error) throw Error(error.message);
    // data操作
  });
}

try {
  readDataset("not-here.txt");
} catch (error) {
  console.error(error.message);
}
```

如果不想让程序崩溃，可以将错误传递给另一个回调：

```
const { readFile } = require("fs");

function readDataset(path) {
  readFile(path, { encoding: "utf8" }, function(error, data) {
    if (error) return errorHandler(error);
    // data操作
  });
}
```

这里的 errorHandler 是一个简单的错误处理函数：

```
function errorHandler(error) {
  console.error(error.message);
  // 处理错误：写入日志、发送到外部logger
}
```

### （3）异步错误处理：事件发射器

Node.js 中的大部分工作都是基于事件的。大多数时候，我们会与发射器对象和一些侦听消息的观察者进行交互。

Node.js 中的任何事件驱动模块（例如 net）都扩展了一个名为 EventEmitter 的根类。EventEmitter 有两个基本方法：on 和 emit。

下面来看一个简单的 HTTP 服务器：

```
const net = require("net");

const server = net.createServer().listen(8081, "127.0.0.1");

server.on("listening", function () {
  console.log("Server listening!");
});

server.on("connection", function (socket) {
  console.log("Client connected!");
  socket.end("Hello client!");
});
```

这里我们监听了两个事件：listening 和 connection。除了这些事件之外，事件发射器还公开一个错误事件，在出现错误时触发。

如果这段代码监听的端口是 80，就会得到一个异常：

```
const net = require("net");

const server = net.createServer().listen(80, "127.0.0.1");

server.on("listening", function () {
  console.log("Server listening!");
});

server.on("connection", function (socket) {
  console.log("Client connected!");
  socket.end("Hello client!");
});
```

输出结果如下：

```
events.js:291
      throw er;
      ^

Error: listen EACCES: permission denied 127.0.0.1:80
Emitted 'error' event on Server instance at: ...
```

为了捕获它，可以为 error 注册一个事件处理函数：

```
server.on("error", function(error) {
  console.error(error.message);
});
```

这样就会输出：

```
listen EACCES: permission denied 127.0.0.1:80
```

## 错误处理最佳实践

最后，我们来看看处理 JavaScript 异常的最佳实践！

### （1）不要过度处理错误

错处理的第一个最佳实践就是**不要过度使用“错误处理”**。通常，我们会在外层处理错误，从内层抛出错误，这样一旦出现错误，就可以更好地理解是什么原因导致的。

然而，开发人员常犯的错误之一是过度使用错误处理。有时这样做是为了让代码在不同的文件和方法中看起来保持一致。但是，不幸的是，这些会对应用程序和错误检测造成不利影响。

因此，只关注代码中可能导致错误的地方，错误处理将有助于提高代码健壮性并增加检测到错误的机会。

### （2）避免浏览器特定的非标准方法

尽管许多浏览器都遵循一个通用标准，但某些特定于浏览器的 JavaScript 实现在其他浏览器上却失败了。例如，以下语法仅适用于 Firefox：

```
catch(e) { 
  console.error(e.filename + ': ' + e.lineNumber); 
}
```

因此，在处理错误时，尽可能使用跨浏览器友好的 JavaScript 代码。

### （3）远程错误记录

当发生错误时，我们应该得到通知以了解出了什么问题。这就是错误日志的用武之地。JavaScript 代码是在用户的浏览器中执行的。因此，需要一种机制来跟踪客户端浏览器中的这些错误，并将它们发送到服务器进行分析。

可以尝试使用以下工具来监控并上报错误：

- **Sentry（https://sentry.io/）：** 专注于异常（应用崩溃）而不是信息错误。它提供了应用中错误的完整概述，包括受影响的用户数量、调用堆栈、受影响的浏览器以及导致错误的提交等详细信息。
- **Rollbar（https://rollbar.com/）：** 用于前端、后端和移动应用的无代理错误监控工具。它提供人工智能辅助的工作流程，使开发人员能够在错误影响用户之前立即采取行动。它会显示受错误影响的客户数量、受影响的平台或浏览器的类型以及之前是否发生过类似错误或是否已经存在解决方案等数据。

### （4）错误处理中间件（Node.js）

Node.js 环境支持使用中间件向服务端应用中添加功能。因此可以创建一个错误处理中间件。使用中间件的最大好处是所有错误都在一个地方集中处理。可以选择启用/禁用此设置以轻松进行测试。

以下是创建基本中间件的方法：

```
const logError = err => {
    console.log("ERROR: " + String(err))
}

const errorLoggerMiddleware = (err, req, res, next) => {
    logError(err)
    next(err)
}

const returnErrorMiddleware = (err, req, res, next) => {
    res.status(err.statusCode || 500)
       .send(err.message)
}

module.exports = {
    logError,
    errorLoggerMiddleware,
    returnErrorMiddleware
}
```

可以像下面这样在应用中使用此中间件：

```
const { errorLoggerMiddleware, returnErrorMiddleware } = require('./errorMiddleware')

app.use(errorLoggerMiddleware)

app.use(returnErrorMiddleware)
```

现在可以在中间件内定义自定义逻辑以适当地处理错误。而无需再担心在整个代码库中实现单独的错误处理结构。

### （5）捕获所有未捕获的异常（Node.js）

我们可能永远无法涵盖应用中可能发生的所有错误。因此，必须实施回退策略以捕获应用中所有未捕获的异常。

可以这样做：

```
process.on('uncaughtException', error => {
    console.log("ERROR: " + String(error))
    // 其他处理机制
})
```

还可以确定发生的错误是标准错误还是自定义操作错误。根据结果，可以退出进程并重新启动它以避免意外行为。

### （6）捕获所有未处理的 Promise 拒绝（Node.js）

与异常不同的是，promise 拒绝不会抛出错误。因此，一个被拒绝的 promise 可能只是一个警告，这让应用有可能遇到意外行为。因此，实现处理 promise 拒绝的回退机制至关重要。

可以这样做：

```
const promiseRejectionCallback = error => {
    console.log("PROMISE REJECTED: " + String(error))
}

process.on('unhandledRejection', callback)
```

#### 参考文章

- https://www.valentinog.com/blog/error/
- https://kinsta.com/blog/errors-in-javascript/
- https://blog.bitsrc.io/javascript-exception-handling-patterns-best-practices-f7d6fcab735d



# 常见的浏览器数据存储方案

> 今天来分享常见的浏览器数据存储方案：localStorage、sessionStorage、IndexedDB、Cookies

## 如何在浏览器数据存储

> 现代浏览器中提供了多种存储机制，打开浏览器的控制台（Mac 可以使用 Command + Option + J 快捷键，Windows  可以使用 Control + Shift + J 快捷键）。选择 Application 选项卡，可以在 Storage中 看到 Local Storage、Session Storage、IndexedDB、Web SQL、Cookies 等：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212221014148.png" alt="image-20221222101433026" style="zoom:67%;" />

那数据存储在浏览器中有什么使用场景呢？在以下情况下，将数据存储在浏览器中成为更可行的选择：

> - 在浏览器存储中保存应用状态，比如保持用户偏好（用户特定的设置，例如亮模式或暗模式、字体大小等）；
> - 创建离线工作的渐进式 Web 应用，除了初始下载和更新之外没有服务器端要求；
> - 缓存静态应用资源，如 HTML、CSS、JS 和图像等；
> - 保存上一个浏览会话中的数据，例如存储上一个会话中的购物车内容，待办事项列表中的项目，记住用户是否以前登录过等。

> 无论哪种方式，将这些信息保存在客户端可以减少额外且不必要的服务器调用，并帮助提供离线支持。不过，需要注意，由于实现差异，浏览器存储机制在不同浏览器中的行为可能会有所不同。**除此之外，许多浏览器已删除对 Web SQL 的支持，建议将现有用法迁移到 IndexedDB。**

## Web Storage

### Web Storage 概述

HTML5 引入了 Web Storage，这使得在浏览器中存储和检索数据变得更加容易。Web Storage API 为客户端浏览器提供了安全存储和轻松访问键值对的机制。Web Storage 提供了两个 API 来获取和设置纯字符串的键值对：

> - **localStorage**：用于存储持久数据，除非用户手动将其从浏览器中删除，否则数据将终身存储。即使用户关闭窗口或选项卡，它也不会过期；
> - **sessionStorage**：用于存储临时会话数据，页面重新加载后仍然存在，关闭浏览器选项卡时数据丢失。

### 方法和属性

Web Storage API 由 4 个方法 `setItem()`、`getItem()`、`removeItem()` 、`clear()`、`key()`和一个 `length` 属性组成，以 localStorage 为例：

`setItem()` ：用于存储数据，它有两个参数，即`key`和`value`。使用`localStorage.setItem(key, value)`；

`getItem()`：用于检索数据，它接受一个参数 key，即需要访问其值的键。使用`localStorage.getItem(key)`;

`removeItem()`：用于删除数据，它接受一个参数 key，需要删除其值的键。使用`localStorage.removeItem(key)`;

`clear()` ：用于清除其中存储的所有数据，使用形式：`localStorage.clear()`;

`key()`：用于获取 localStorage 中数据的所有key，接受一个数字作为参数，该数字可以是 localStorage 项的索引位置

```js
console.log(typeof window.localStorage) // Object

// 存储数据
localStorage.setItem("colorMode", "dark")
localStorage.setItem("username", "zhangsan")
localStorage.setItem("favColor", "green")

console.log(localStorage.length) // 3

// 检索数据
console.log(localStorage.getItem("colorMode")) // dark

// 移除数据
localStorage.removeItem("colorMode")
console.log(localStorage.length) // 2
console.log(localStorage.getItem("colorMode")) // null

// 检索键名
window.localStorage.key(0); // favColor

// 清空本地存储
localStorage.clear()
console.log(localStorage.length) // 0
```

> localStorage 和 sessionStorage 都非常适合缓存非敏感应用数据。可以在需要存储少量简单值并不经常访问它们是使用它们。它们本质上都是**同步**的，并且会阻塞主 UI 线程，所以应该谨慎使用。

### 存储事件

我们可以在浏览器上监听 localStorage 和 sessionStorage 的存储变化。storage 事件在创建、删除或更新项目时触发。侦听器函数在事件中传递，具有以下属性：

- `newValue`：当在存储中创建或更新项目时传递给 setItem() 的值。当从存储中删除项目时，此值设置为 null。
- `oldValue`：创建新项目时，如果该键存在于存储中，则该项目的先前的值。
- `key`：正在更改的项目的键，如果调用 .clear()，则值为 null。
- `url`：执行存储操作的 URL。
- `storageArea`：执行操作的存储对象（localStorage 或 sessionStorage）。

通常，我们可以使用 `window.addEventListener("storage", func)` 或使用 `onstorage` 属性（如 `window.onstorage = func`）来监听 `storage` 事件：

```js
window.addEventListener('storage', e => {
  console.log(e.key);
  console.log(e.oldValu);
  console.log(e.newValue);
});

window.onstorage = e => {
  console.log(e.key);
  console.log(e.oldValu);
  console.log(e.newValue);
});
```

注意，该功能不会在发生更改的同一浏览器选项卡上触发，而是由同一域的其他打开的选项卡或窗口触发。此功能用于同步同一域的所有浏览器选项卡/窗口上的数据。因此，要对此进行测试，需要打开同一域的另一个选项卡。

### 存储限制

localStorage 和 sessionStorage 只能存储 5 MB 的数据，因此需要确保存储的数据不会超过此限制。

```js
localStorage.setItem('a', Array(1024 * 1024 * 5).join('a'))
localStorage.setItem('b', 'a')

// Uncaught DOMException: Failed to execute 'setItem' on 'Storage': Setting the value of `a` exceeded the quota.
```

在上面的例子中，收到了一个错误，首先创建了一个5MB的大字符串，当再添加其他数据时就报错了。

另外，localStorage 和 sessionStorage 只接受字符串。可以通过 `JSON.stringify` 和 `JSON.parse` 来解决这个问题：

```js
const user = {
  name : "zhangsan",
  age : 28,
  gender : "male",
  profession : "lawyer" 
};
localStorage.setItem("user", JSON.stringify(user));
localStorage.getItem("user");  
JSON.parse(localStorage.getItem("user"))  
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212221026494.png" alt="image-20221222102612409" style="zoom: 80%;" />

如果我们直接将一个对象存储在 localStorage 中，那将会在存储之前进行隐式类型转换，将对象转换为字符串，再进行存储：

```js
const user = {
  name : "zhangsan",
  age : 28,
  gender : "male",
  profession : "lawyer" 
};

localStorage.setItem("user", user);
localStorage.getItem("user");  // '[object Object]'
```

Web Storage 使用了同源策略，也就是说，存储的数据只能在同一来源上可用。如果域和子域相同，则可以从不同的选项卡访问 localStorage 数据，而无法访问 sessionStorage 数据，即使它是完全相同的页面。

**另外：**

- 无法在 web worker 或 service worker 中访问 Web Storage；
- 如果浏览器设置为隐私模式，将无法读取到 Web Storage；
- Web Storage 很容易被 XSS 攻击，敏感信息不应存储在本地存储中；
- 它是同步的，这意味着所有操作都是一次一个。对于复杂应用，它会减慢应用的运行时间。

### 示例

下面来看一个使用 localStorage 的简单示例，使用 localStorage 来存储用户偏好：

```js
<input type="checkbox" id="darkTheme" name="darkTheme" onclick='onChange(this);'>
<label for="darkTheme">黑暗模式</label><br>
html {
  background: white;
}

.dark {
  background: black;
  color: white;
}
function toggle(on) {
  if (on) {
    document.documentElement.classList.add('dark'); 
  } else {
    document.documentElement.classList.remove('dark');    
  }
}

function save(on) {
  localStorage.setItem('darkTheme', on.toString());
}

function load() {
  return localStorage.getItem('darkTheme') === 'true';
}

function onChange(checkbox) {
  const value = checkbox.checked;
  toggle(value);
  save(value);
}

const initialValue = load();
toggle(initialValue);
document.querySelector('#darkTheme').checked = initialValue;
```

这里的代码很简单，页面上有一个单选框，选中按钮时将页面切换为黑暗模式，并将这个配置存储在 localStorage 中。当下一次再初始页面时，获取 localStorage 中的主题设置。

## Cookie

### Cookie 概述

Cookie 主要用于身份验证和用户数据持久性。Cookie 与请求一起发送到服务器，并在响应时发送到客户端；因此，cookies 数据在每次请求时都会与服务器交换。服务器可以使用 cookie 数据向用户发送个性化内容。严格来说，cookie 并不是客户端存储方式，因为服务器和浏览器都可以修改数据。它是唯一可以在一段时间后自动使数据过期的方式。

每个 HTTP 请求和响应都会发送 cookie 数据。存储过多的数据会使 HTTP 请求更加冗长，从而使应用比预期更慢：

- 浏览器限制 cookie 的大小最大为4kb，特定域允许的 cookie 数量为 20 个，并且只能包含字符串；
- cookie 的操作是同步的；
- 不能通过 web workers 来访问，但可以通过全局 window 对象访问。

Cookie 通常用于会话管理、个性化以及跨网站跟踪用户行为。我们可以通过服务端和客户端设置和访问 cookie。Cookie 还具有各种属性，这些属性决定了在何处以及如何访问和修改它们，

Cookie 分为两种类型：

- **会话 Cookie**：没有指定 Expires 或 Max-Age 等属性，因此在关闭浏览器时会被删除；
- **持久性 Cookie**：指定 Expires 或 Max-Age 属性。这些 cookie 在关闭浏览器时不会过期，但会在特定日期 (Expires) 或时间长度 (Max-Age) 后过期。

### Cookie 操作

下面先来看看如何访问和操作客户端和服务器上的 cookie。

#### ① 客户端（浏览器）

客户端 JavaScript 可以通过 document.cookie 来读取当前位置可访问的所有 cookie。它提供了一个字符串，其中包含一个以分号分隔的 cookie 列表，使用 key=value 格式。

```
document.cookie;
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMPEzMtbhcVZwd6Wb5LPBA2KwKdouebBicf6uD19Xta7UiagGb5NU8Ap3KCRNbFmF2GMPjb1dPErsiaxw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

可以看到，在语雀主页中获取 cookie，结果中包含了登录的 cookie、语言、当前主题等。

同样，可以使用 document.cookie 来设置 cookie 的值，设置cookie也是用key=value格式的字符串，属性用分号隔开：

```
document.cookie = "hello=world; domain=example.com; Secure";
```

这里用到了两个属性 SameSite 和 Secure，下面会介绍。如果已经存在同名的 cookie 属性，就会更新已有的属性值，如果不存在，就会创建一个新的 key=value。

如果需要经常在客户端处理 Cookie，建议使用像 js-cookie 这样的库来处理客户端 cookie：

```
Cookies.set('hello', 'world', { domain: 'example.com', secure: true });
Cookies.get('hello'); // -> world
```

这样不仅为 cookie 上的 CRUD 操作提供了一个干净的 API，而且还支持 TypeScript，从而帮助避免属性的拼写错误。

#### ② 服务端（Node.js）

服务端可以通过 HTTP 请求的请求头和响应头来访问和修改 cookie。每当浏览器向服务端发送 HTTP 请求时，它都会使用 cookie 头将所有相关 cookie 都附加到该站点。请求标头是一个分号分隔的字符串。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMPEzMtbhcVZwd6Wb5LPBA2K2ATiahQr2xcFmBM5RSvoehTrYDYZkiaJblBMF6gumtabWIQodKe0JtKA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这样就可以从请求头中读取这些 cookie。如果在服务端使用 Node.js，可以像下面这样从请求对象中读取它们，将获得以分号分隔的 key=value 对：

```
http.createServer(function (request, response) {
    const cookies = request.headers.cookie;
    // "cookie1=value1; cookie2=value2"
    ...
}).listen(8124);
```

如果想要设置 cookie，可以在响应头中添加 Set-Cookie 头，其中 cookie 采用 key=value 的格式，属性用分号分隔：

```
response.writeHead(200, {
    'Set-Cookie': 'mycookie=test; domain=example.com; Secure'
});
```

通常我们不会直接编写 Node.js，而是与 ExpressJS 这样的 Node.js 框架一起使用。使用 Express 可以更轻松地访问和修改 cookie。只需添加一个像 cookie-parser 这样的中间件，就可以通过 req.cookies 以 JavaScript 对象的形式获得所有的 cookie。还可以使用 Express 内置的 res.cookie() 方法来设置 cookie：

```
const express = require('express')
const cookieParser = require('cookie-parser')
    
const app = express()
app.use(cookieParser())
    
app.get('/', function (req, res) {
    console.log('Cookies: ', req.cookies)
    // Cookies: { cookie1: 'value1', cookie2: 'value2' }

    res.cookie('name', 'tobi', { domain: 'example.com', secure: true })
})
    
app.listen(8080)
```

### Cookie 属性

下面来深入了解 cookie 的属性。除了名称和值之外，cookie 还具有控制很多方面的属性，包括安全方面、生命周期以及它们在浏览器中的访问位置和方式等。

#### ① Domain

Domain 属性告诉浏览器允许哪些主机访问 cookie。如果未指定，则默认为设置 cookie 的同一主机。因此，当使用客户端 JavaScript 访问 cookie 时，只能访问与 URL 域相同的 cookie。同样，只有与 HTTP 请求的域共享相同域的 cookie 可以与请求头一起发送到服务端。

注意，拥有此属性并不意味着可以为任何域设置 cookie，因为这显然会带来巨大的安全风险。此属性存在的唯一原因就是**减少域的限制并使 cookie 在子域上可访问**。例如，如果当前的域是 abc.xyz.com，并且在设置 cookie 时如果不指定 Domain 属性，则默认为 abc.xyz.com，并且 cookie 将仅限于该域。但是，可能希望相同的 cookie 也可用于其他子域，因此可以设置 Domain=xyz.com 以使其可用于其他子域，如 def.xyz.com 和主域 xyz.com。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMPEzMtbhcVZwd6Wb5LPBA2KeP1XVMdrhHuNlfZBicLENm2UicClePafy2SE2J2LIf7rtOBia7CXUSPHg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### ② Path

此属性指定访问 cookie 必须存在的请求 URL 中的路径。除了将 cookie 限制到域之外，还可以通过路径来限制它。路径属性为 Path=/store 的 cookie 只能在路径 /store 及其子路径 /store/cart、/store/gadgets 等上访问。

#### ③ Expires/Max-size

该属性用来设置 cookie 的过期时间。若设置其值为一个时间，那么当到达此时间后，cookie 就会失效。不设置的话默认值是 Session，意思是cookie会和session一起失效。当浏览器关闭(不是浏览器标签页) 后，cookie 就会失效。

除此之外，它还可以通过将过期日期设置为过去来删除 cookie。

#### ④ Secure

具有 Secure 属性的 cookie 仅可以通过安全的 HTTPS 协议发送到服务器，而不会通过 HTTP 协议。这有助于通过使 cookie 无法通过不安全的连接访问来防止中间人攻击。除非网站实用不安全的 HTTP 连接，否则应该始终将此属性与所有 cookie 一起使用。

#### ⑤ HTTPOnly

此属性使 cookie 只能通过服务端访问。因此，只有服务断可以通过响应头设置它们，然后浏览器会将它们与每个后续请求的头一起发送到服务器，并且它们将无法通过客户端 JavaScript 访问。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMPEzMtbhcVZwd6Wb5LPBA2KAt5L0GOoX2HnRvrRUicvMO7vkjJnfDH46rvaOYw37xcMTwgflxiaOe1Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这可以在一定程度上帮助保护带有敏感信息（如身份验证 token）的 cookie 免受 XSS 攻击，因为任何客户端脚本都无法读取 cookie。但这并不意味着可以完全免受 XSS 攻击。因为，如果攻击者可以在网站上执行第三方脚本，那可能无法访问 cookie，相反，他们可以直接向服务端执行相关的 API 请求。因此，想象一下用户访问了一个页面，黑客在网站上注入了恶意脚本。他们可以使用该脚本执行任何 API，并在他们不知道的情况下代表用户执行操作。

### Cookie 工具库

#### ①  Js Cookie（JavaScript）

Js Cookie 是一个简单、轻量级的 JavaScript API，用于处理浏览器 cookie。其支持 AMD、CommonJS 和 ES 模块、没有依赖关系、经过彻底测试、支持自定义编码和解码、通用浏览器支持。

安装：

```
npm i js-cookie
```

使用：

```
// 设置 Cookie
Cookies.set('cookie-name', 'cookie-value', { expires: 14})

// 读取 Cookie
Cookies.get('cookie-name')

// 删除 Cookie
Cookies.remove('cookie-name')
```

#### ② React Cookie（React）

React Cookie 是一个专门用于 React 的 cookie 库，它继承了 Universal Cookie 库的功能。它提供了一组组件和 Hooks，使 React 中的 cookie 处理非常简单。如果使用的是 React 16.8+ 版本，就可以使用 hooks 来处理 cookie。否则，必须使用其提供的组件。

安装：

```
npm i react-cookie
```

React Cookie 提供了 3 个 Hook，分别是 cookie、setCookie 和 removeCookie。可以使用这些 Hook 来处理 React 应用中的 cookie。

```
const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
// 设置 Cookie
setCookie(name, value, [options]);
// 删除 Cookie
removeCookie(name, [options])
```

#### ③ Cookies（Node.js）

Cookies 是用于 HTTP cookie 配置的流行 NodeJS 模块之一。可以轻松地将其与内置的 NodeJS HTTP 库集成或将其用作 Express 中间件。它允许使用 Keygrip 对 cookie 进行签名以防止篡改、支持延迟 cookie 验证、不允许通过不安全的套接字发送安全 cookie、允许其他库在不知道签名机制的情况下访问 cookie。

安装：

```
npm install cookies
```

使用：

```
const cookie = require('cookie');
cookies = new Cookies( request, response, [ options ] )

// 读取 cookies
cookies.get( name, [ options ] )

// 设置 cookies
cookies.set( name, [ value ], [ options ] )
```

## IndexedDB

### 概述

IndexedDB 提供了一个类似 NoSQL 的 key/value 数据库，它可以存储大量结构化数据，甚至是文件和 blob。每个域至少有 1GB 的可用空间，并且最多可以达到剩余磁盘空间的 60%。

IndexedDB 于 2011 年首次实现，并于 2015 年 1 月成为 W3C 标准，它具有良好的浏览器支持：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMPEzMtbhcVZwd6Wb5LPBA2KCnqxHPpRxhIUYR3Vs8sU88HhSxuFOJFQsKpb1kVkYsicngmsCcemCqA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

key/value 数据库意味着存储的所有数据都必须分配给一个 key。它将key 与 value 相关联，key 用作该值的唯一标识符，这意味着可以使用该 key 跟踪该值。如果应用需要不断获取数据，key/value 数据库使用非常高效且紧凑的索引结构来快速可靠地通过 key 定位值。使用该 key，不仅可以检索存储的值，还可以删除、更新和替换该值。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMPEzMtbhcVZwd6Wb5LPBA2K1iblJqJtKE8RufOZkXARibCAhFAlagxLibpYxpUBqW16JkqhOlPRp88ew/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

在说 IndexedDB 之前，先来看一些相关术语：

- **数据库：** 一个域可以创建任意数量的 IndexedDB 数据库，只有同一域内的页面才能访问数据库。
- **object store**：相关数据项的 key/value 存储。它类似于 MongoDB 中的集合或关系数据库中的表。
- **key**：用于引用 object store 中每条记录（值）的唯一名称。它可以使用自动增量数字生成，也可以设置为记录中的任何唯一值。
- **index**：在 object store 中组织数据的另一种方式。搜索查询只能检查 key 或 index。
- schema：object store、key 和 index 的定义。
- **version**：分配给 schema 的版本号（整数）。IndexedDB 提供自动版本控制，因此可以将数据库更新到最新 schema。
- **操作**：数据库活动，例如创建、读取、更新或删除记录。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMPEzMtbhcVZwd6Wb5LPBA2K7QsicVSzFgwBOiblZI4tCWmTiaic0QgpX0iaUK8tZf7CWvP3qSjGDrGekng/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 特点及使用场景

**indexedDB 特点如下：**

- 可以将任何 JavaScript 类型的数据存储为键值对，例如对象（blob、文件）或数组等。
- IndexedDB API 是异步的，不会在数据加载时停止页面的渲染。
- 可以存储结构化数据，例如 Date、视频、图像对象等。
- 支持数据库事务和版本控制。
- 可以存储大量数据。
- 可以在大量数据中快速定位/搜索数据。
- 数据库是域专用的，因此任何其他站点都无法访问其他网站的 IndexedDB 存储，这也称为同源策略。

**IndexedDB 使用场景：**

- **存储用户生成的内容：** 例如表单，在填写表单的过程中，用户可以离开并稍后再回来完成表单，存储之后就不会丢失初始输入的数据。
- **存储应用状态：** 当用户首次加载网站或应用时，可以使用 IndexedDB 存储这些初始状态。可以是登录身份验证、API 请求或呈现 UI 之前所需的任何其他状态。因此，当用户下次访问该站点时，加载速度会增加，因为应用已经存储了状态，这意味着它可以更快地呈现 UI。
- **对于离线工作的应用：** 用户可以在应用离线时编辑和添加数据。当应用程序来连接时，IndexedDB 将处理并清空同步队列中的这些操作。

### IndexedDB 操作

不同浏览器的 IndexedDB 可能使用不同的名称。可以使用以下方法检查 IndexedDB 支持：

```js
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

if (!indexedDB) {
  console.log("不支持 IndexedDB");
}
```

可以使用 `indexedDB.open()` 来连接数据库：

```
const dbOpen = indexedDB.open('performance', 1);
```

`indexedDB.open` 的第一个参数是数据库名称，第二个参数是可选的版本整数。

可以使用以下三个事件处理函数监听 indexedDB 的连接状态：

#### ① onerror

在无法建立 IndexedDB 连接时，将触发该事件：

```js
// 连接失败
dbOpen.onerror = e => {
  reject(`IndexedDB error: ${ e.target.errorCode }`);
};
```

如果在无痕模式、隐私模式下运行浏览器，可能不支持 IndexedDB，需要禁用这些模式。

#### ② onupgradeneeded

一旦数据库连接打开，就会触发 onupgradeneeded 事件，该事件可用于创建 object store。

```js
dbOpen.onupgradeneeded = e => {
   const db = dbOpen.result;

   // 创建 object store
   const store = db.createObjectStore("cars", { keyPath: "id" });
   // 使用自动递增的id
   // const store = db.createObjectStore('cars', { autoIncrement: true }); 

   // 创建索引
   
   store.createIndex("cars_colour", ["colour"], { 
       unique: true 
   }); 

   // 创建复合索引
   store.createIndex("colour_and_make", ["colour", "make"], {
    unique: false,
  });
};
```

IndexedDB 使用了 object store 的概念，其本质上是数据集合的名称。可以在单个数据库中创建任意数量的 object store。keyPath是 IndexedDB 将用来识别对象字段名称，通常是一个唯一的编号，也可以通过 `autoIncrement: true` 来自动为 store 设置唯一递增的 ID。除了普通的索引，还可以创建复合索引，使用多个关键词的组合进行查询。

#### ③ onsuccess

在连接建立并且所有升级都完成时，将触发该事件。上面我们已经新建了 schema，接下来就可以在onsuccess 中添加、查询数据。

```js
// 连接成功
dbOpen.onsuccess = () => {
  this.db = dbOpen.result;

  //1
  const transaction = db.transaction("cars", "readwrite");
  
  //2
  const store = transaction.objectStore("cars");
  const colourIndex = store.index("cars_colour");
  const makeModelIndex = store.index("colour_and_make");

  //3
  store.put({ id: 1, colour: "Red", make: "Toyota" });
  store.put({ id: 2, colour: "Red", make: "Kia" });
  store.put({ id: 3, colour: "Blue", make: "Honda" });
  store.put({ id: 4, colour: "Silver", make: "Subaru" });

  //4
  const idQuery = store.get(4);
  const colourQuery = colourIndex.getAll(["Red"]);
  const colourMakeQuery = makeModelIndex.get(["Blue", "Honda"]);

  // 5
  idQuery.onsuccess = function () {
    console.log('idQuery', idQuery.result);
  };
  colourQuery.onsuccess = function () {
    console.log('colourQuery', colourQuery.result);
  };
  colourMakeQuery.onsuccess = function () {
    console.log('colourMakeQuery', colourMakeQuery.result);
  };

  // 6
  transaction.oncomplete = function () {
    db.close();
  };
};
```

这里总共有六部分：

> 1. 为了对数据库执行操作，我们必须创建一个 schema，一个 schema 可以是单个操作，也可以是多个必须全部成功的操作，否则都不会成功；
> 2. 这里用来获取 cars object store 的引用以及对应的索引；
> 3. object store 上的 put 方法用于将数据添加到数据库中；
> 4. 这里就是数据的查询，可以使用 keyPath 的值直接查询项目（第14行）；第15行中的 getAll 方法将返回一个包含它找到的每个结果的数组，我们正在根据  cars_colour 索引来搜索 Red，应该会查找到两个结果。第16行根据复合索引查找颜色为Blue，并且品牌为 Honda 的结果。
> 5. 搜索成功的事件处理函数，它们将在查询完成时触发。
> 6. 最后，在事务完成时关闭与数据库连接。无需使用 IndexedDB 手动触发事务，它会自行运行。

运行上面的代码，就会得到以下结果：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMPEzMtbhcVZwd6Wb5LPBA2KaUqR49uDtbOmevZHEDjhrjIJ2ILFwt07L5xNUUzq3WOAkibiam5S6uUg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

可以在 Chrome Devtools 中查看：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMPEzMtbhcVZwd6Wb5LPBA2K3IGSBLuYHsNZNzQXcicIibjERXaE30wQ5w0OHY03YF8UZVCRDTCRrjYA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

下面来看看如何更新和删除数据。

**更新：** 首先使用个 get 来获取需要更新的数据，然后使用 store 上的 put 方法更新现有数据。put 是一种“插入或更新”方法，它要么覆盖现有数据，要么在新数据不存在时插入新数据。

```
const subaru = store.get(4);

subaru.onsuccess= function () {
  subaru.result.colour = "Green";
  store.put(subaru.result);
}
```

这会将数据库中 Silver 色的 Subaru 的颜色更新为绿色。

**删除**：可以使用 delete API 来删除数据，最简单的方法是通过其 key 来删除：

```
const deleteCar = store.delete(1);

deleteCar.onsuccess = function () {
  console.log("Removed");
};
```

如果不知道 key 并且希望根据值来删除，可以这样：

```
const redCarKey = colourIndex.getKey(["Red"]);

redCarKey.onsuccess = function () {
  const deleteCar = store.delete(redCarKey.result);

  deleteCar.onsuccess = function () {
    console.log("Removed");
  };
};
```

结果如下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMPEzMtbhcVZwd6Wb5LPBA2KWuUoO5tmyGZlh6QibJoTySKHMia3D6VW79FxJD89ibgCGkO2jsX9wPIOw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 存储空间分析

可以使用基于 Promise 的 Storage API 检查 Web Storage、IndexedDB 和 Cache API 的剩余空间。异步 `.estimate()` 方法返回：

- `quota` 属性：可用的空间；
- `usage` 属性：已用的空间。

```js
(async () => {
  if (!navigator.storage) return;

  const storage = await navigator.storage.estimate();

  console.log(`可用大小: ${ storage.quota / 1024 } Kb`);
  console.log(`已用大小: ${ storage.usage / 1024 } Kb`);
  console.log(`已用占比: ${ Math.round((storage.usage / storage.quota) * 100) }%`);
  console.log(`剩余大小: ${ Math.floor((storage.quota - storage.usage) / 1024) } Kb`);
})();
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212221030816.png" alt="image-20221222103058721" style="zoom: 80%;" />

Storage API 的浏览器兼容性如下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMPEzMtbhcVZwd6Wb5LPBA2KTuZEmr7ibxWUW4Woib6WxEDW6rAlM0eYJ4Qicn63poQgHjqK8beZLlBNQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



# 深入浅出JavaScript异步编程

[深入浅出JavaScript异步编程](https://mp.weixin.qq.com/s?__biz=MzU2MTIyNDUwMA==&mid=2247509151&idx=1&sn=308660e721050a933e33e972a2c1336c&chksm=fc7eeac4cb0963d2a7fc4a790d6beae83c2cbd85a17144aa2b2dc4014936e7880e8671a8b4d1&mpshare=1&scene=23&srcid=1220cyOPUoA464JKWaEKVuFa&sharer_sharetime=1671534321229&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

浏览器中的 JavaScript 是典型的事件驱动型程序，即它们会等待用户触发后才真正的执行，而基于的JavaScript的服务器通常要等待客户端通过网络发送请求，然后才能执行。这种异步编程在JavaScript是很常见的，下面就来介绍几个异步编程的重要特性，它们可以使编写异步代码更容易。

本文将按照异步编程方式的出现时间来归纳整理：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNvvgas2n1Qlf2PPyYTNf5ia7MfNj5aevuytAFBRNy2vjVfQ5mLXicvhcbOTicr8JpKAWvXsDTfdKDUQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 什么是异步

下面先来看看同步和异步的概念：

- **同步：** 在执行某段代码时，在没有得到返回结果之前，其他代码暂时是无法执行的，但是一旦执行完成拿到返回值，即可执行其他代码。也就是说，在此段代码执行完未返回结果之前，会阻塞之后的代码执行，这样的情况称为同步。
- **异步：** 当某一代码执行异步过程调用发出后，这段代码不会立刻得到返回结果。而是在异步调用发出之后，一般通过回调函数处理这个调用之后拿到结果。异步调用发出后，不会影响阻塞后面的代码执行，这样的情况称为异步。

下面来看一个例子：

```
// 同步
function syncAdd(a, b) {
  return a + b;
}

syncAdd(1, 2) // 立即得到结果：3

// 异步
function asyncAdd(a, b) {
  setTimeout(function() {
    console.log(a + b);
  }, 1000)
}

asyncAdd(1, 2) // 1s后打印结果：3
```

这里定义了同步函数 syncAdd 和异步函数 asyncAdd，调用 syncAdd(1, 2) 函数时会等待得到结果之后再执行后面的代码。而调用 asyncAdd(1, 2) 时则会在得到结果之前继续执行，直到 1 秒后得到结果并打印。

我们知道，JavaScript 是单线程的，如果代码同步执行，就可能会造成阻塞；而如果使用异步则不会阻塞，不需要等待异步代码执行的返回结果，可以继续执行该异步任务之后的代码逻辑。因此，在 JavaScript 编程中，会大量使用异步。

那为什么单线程的JavaScript还能实现异步呢，其实也没有什么魔法，只是把一些操作交给了其他线程处理，然后采用了[事件循环](https://mp.weixin.qq.com/s?__biz=MzU2MTIyNDUwMA==&mid=2247508720&idx=1&sn=8225b84c8496832aee3aa418f42a69bf&chksm=fc7eecabcb0965bda9d02f2bcbf7a6723d5cab333ca352cf3d16a0526b8743460d6605d83428&token=1341694643&lang=zh_CN&scene=21#wechat_redirect)的机制来处理返回结果。

## 回调函数

在最基本的层面上，JavaScript的异步编程式通过回调实现的。回调的是函数，可以传给其他函数，而其他函数会在满足某个条件时调用这个函数。下面就来看看常见的不同形式的基于回调的异步编程。

### 1. 定时器

一种最简单的异步操作就是在一定时间之后运行某些代码。如下面代码：

```
setTimeout(asyncAdd(1, 2), 8000)
```

`setTimeout()`方法的第一个参数是一个函数，第二个参数是以毫秒为单位的时间间隔。`asyncAdd()`方法可能是一个回调函数，而`setTimeout()`方法就是注册回调函数的函数。它还代指在什么异步条件下调用回调函数。`setTimeout()`方法只会调用一次回调函数。

### 2. 事件监听

给目标 DOM 绑定一个监听函数，用的最多的是 `addEventListener`：

```
document.getElementById('#myDiv').addEventListener('click', (e) => {
  console.log('我被点击了')
}, false);
```

通过给 id 为 `myDiv` 的一个元素绑定了点击事件的监听函数，把任务的执行时机推迟到了点击这个动作发生时。此时，**任务的执行顺序与代码的编写顺序无关，只与点击事件有没有被触发有关**。

这里使用`addEventListener`注册了回调函数，这个方法的第一个参数是一个字符串，指定要注册的事件类型，如果用户点击了指定的元素，浏览器就会调用回调函数，并给他传入一个对象，其中包含着事件的详细信息。

### 3. 网络请求

JavaScript中另外一种常见的异步操作就是网络请求：

```
const SERVER_URL = "/server";
let xhr = new XMLHttpRequest();
// 创建 Http 请求
xhr.open("GET", SERVER_URL, true);
// 设置状态监听函数
xhr.onreadystatechange = function() {
  if (this.readyState !== 4) return;
  // 当请求成功时
  if (this.status === 200) {
    handle(this.response);
  } else {
    console.error(this.statusText);
  }
};
// 设置请求失败时的监听函数
xhr.onerror = function() {
  console.error(this.statusText);
};
// 发送 Http 请求
xhr.send(null);
```

这里使用`XMLHttpRequest`类及回调函数来发送HTTP请求并异步处理服务器返回的响应。

### 4. Node中的回调与事件

Node.js服务端JavaScript环境底层就是异步的，定义了很多使用回调和事件的API。例如读取文件默认的API就是异步的，它会在读取文件内容之后调用一个回调函数：

```
const fs = require('fs');
let options = {}

//  读取配置文件，调用回调函数
fs.readFile('config.json', 'utf8', (err, data) => {
    if(err) {
      throw err;
    }else{
     Object.assign(options, JSON.parse(data))
    }
  startProgram(options)
});
```

`fs.readFile()`方法以接收两个参数的回调作为最后一个参数。它会异步读取指定文件，如果读取成功就会将第二个参数传递给回调的第二个参数，如果发生错误，就会将错误传递给回调的第一个参数。

## Promise

### 1. Promise的概念

Promise是一种为简化异步编程而设计的核心语言特性，它是一个对象，表示异步操作的结果。在最简单的情况下，Promise就是一种处理回调的不同方式。不过，使用Promise也有实际的用处，基于回调的异步编程会有一个很现实的问题，那就是**经常出现回调多层嵌套**的情况，会造成代码难以理解。Promise可以让这种嵌套回调以一种更线性的链式形式表达出来，因此更容易阅读和理解。

回调的另一个问题就是**难以处理错误，** 如果一个异步函数抛出异常，则该异常没有办法传播到异步操作的发起者。异步编程的一个基本事实就是它破坏了异常处理。而Promise则标准化了异步错误处理，通过Promise链提供一种让错误正确传播的途经。

实际上，Promise就是一个容器，里面保存着某个未来才会结束的事件（通常是异步操作）的结果。从语法上说，Promise 是一个对象，它可以获取异步操作的消息。Promise 提供了统一的 API，各种异步操作都可以用同样的方法进行处理。

（1）Promise实例有**三个状态**:

- pending 状态：表示进行中。Promise 实例创建后的初始态；
- fulfilled 状态：表示成功完成。在执行器中调用 resolve 后达成的状态；
- rejected 状态：表示操作失败。在执行器中调用 reject 后达成的状态。

（2）Promise实例有**两个过程**：

- pending -> fulfilled : Resolved（已完成）；
- pending -> rejected：Rejected（已拒绝）。

**Promise的特点：**

- 一旦状态改变就不会再变，promise对象的状态改变，只有两种可能：从`pending`变为`fulfilled`，从`pending`变为`rejected`。当 Promise 实例被创建时，内部的代码就会立即被执行，而且无法从外部停止。比如无法取消超时或消耗性能的异步调用，容易导致资源的浪费；
- 如果不设置回调函数，Promise内部抛出的错误，不会反映到外部；
- Promise 处理的问题都是“一次性”的，因为一个 Promise 实例只能 resolve 或 reject 一次，所以面对某些需要持续响应的场景时就会变得力不从心。比如上传文件获取进度时，默认采用的就是事件监听的方式来实现。

下面来看一个例子：

```
const https = require('https');

function httpPromise(url){
  return new Promise((resolve,reject) => {
    https.get(url, (res) => {
      resolve(data);
    }).on("error", (err) => {
      reject(error);
    });
  })
}

httpPromise().then((data) => {
  console.log(data)
}).catch((error) => {
  console.log(error)
})
```

可以看到，Promise 会接收一个执行器，在这个执行器里，需要把目标异步任务给放进去。在 Promise 实例创建后，执行器里的逻辑会立刻执行，在执行的过程中，根据异步返回的结果，决定如何使用 resolve 或 reject 来改变 Promise实例的状态。

在这个例子里，当用 resolve 切换到了成功态后，Promise 的逻辑就会走到 then 中传入的方法里去；用 reject 切换到失败态后，Promise 的逻辑就会走到 catch 传入的方法中。

这样的逻辑，本质上与回调函数中的成功回调和失败回调没有差异。但这种写法大大地提高了代码的质量。当我们进行大量的异步链式调用时，回调地狱不复存在了。取而代之的是层级简单、赏心悦目的 Promise 调用链：

```
httpPromise(url1)
    .then(res => {
        console.log(res);
        return httpPromise(url2);
    })
    .then(res => {
        console.log(res);
        return httpPromise(url3);
    })
    .then(res => {
      console.log(res);
      return httpPromise(url4);
    })
    .then(res => console.log(res));
```

### 2. Promise的创建

Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。

Promise构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。

```
const promise = new Promise((resolve, reject) => {
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

一般情况下，我们会用`new Promise()`来创建Promise对象。除此之外，还也可以使用`promise.resolve`和 `promise.reject`这两个方法来创建：

**（1）Promise.resolve**

`Promise.resolve(value)`的返回值是一个promise对象，我们可以对返回值进行.then调用，如下代码：

```
Promise.resolve(11).then(function(value){
  console.log(value); // 打印出11
});
```

`resolve(11)`会让promise对象进入确定(`resolve`状态)，并将参数`11`传递给后面`then`中指定的`onFulfilled` 函数；

**（2）Promise.reject**

`Promise.reject` 的返回值也是一个promise对象，如下代码：

```
Promise.reject(new Error("我错了！"));
```

上面是以下代码的简单形式：

```
new Promise((resolve, reject) => {
   reject(new Error("我错了！"));
});
```

下面来综合看看resolve方法和reject方法：

```
function testPromise(ready) {
  return new Promise(resolve,reject) => {
    if(ready) {
      resolve("hello world");
    }else {
      reject("No thanks");
    }
  });
};

testPromise(true).then((msg) => {
  console.log(msg);
},(error) => {
  console.log(error);
});
```

上面的代码给`testPromise`方法传递一个参数，返回一个promise对象，如果为`true`，那么调用Promise对象中的`resolve()`方法，并且把其中的参数传递给后面的`then`第一个函数内，因此打印出 “`hello world`”, 如果为`false`，会调用promise对象中的`reject()`方法，则会进入`then`的第二个函数内，会打印`No thanks`。

### 3. Promise的作用

在开发中可能会碰到这样的需求：使用ajax发送A请求，成功后拿到数据，需要把数据传给B请求，那么需要这样编写代码：

```
let fs = require('fs')
fs.readFile('./a.txt','utf8',function(err,data){
  fs.readFile(data,'utf8',function(err,data){
    fs.readFile(data,'utf8',function(err,data){
      console.log(data)
    })
  })
})
```

这段代码之所以看上去很乱，归结其原因有两点：

- **第一是嵌套调用**，下面的任务依赖上个任务的请求结果，并**在上个任务的回调函数内部执行新的业务逻辑**，这样当嵌套层次多了之后，代码的可读性就变得非常差了。
- **第二是任务的不确定性**，执行每个任务都有两种可能的结果（成功或者失败），所以体现在代码中就需要对每个任务的执行结果做两次判断，这种对每个任务都要进行一次额外的错误处理的方式，明显增加了代码的混乱程度。

既然原因分析出来了，那么问题的解决思路就很清晰了：

- 消灭嵌套调用；
- 合并多个任务的错误处理。

这么说可能有点抽象，不过 Promise 解决了这两个问题。接下来就看看 Promise 是怎么消灭嵌套调用和合并多个任务的错误处理的。

`Promise`出现之后，代码可以这样写：

```
let fs = require('fs')
function read(url){
  return new Promise((resolve,reject)=>{
    fs.readFile(url,'utf8',function(error,data){
      error && reject(error)
      resolve(data)
    })
  })
}
read('./a.txt').then(data=>{
  return read(data) 
}).then(data=>{
  return read(data)  
}).then(data=>{
  console.log(data)
})
```

通过引入 Promise，上面这段代码看起来就非常线性了，也非常符合人的直觉。Promise 利用了三大技术手段来解决回调地狱：**回调函数延迟绑定、返回值穿透、错误冒泡。**

下面来看一段代码：

```
let readFilePromise = (filename) => {
  fs.readFile(filename, (err, data) => {
    if(err) {
      reject(err);
    }else {
      resolve(data);
    }
  })
}
readFilePromise('1.json').then(data => {
  return readFilePromise('2.json')
});
```

可以看到，回调函数不是直接声明的，而是通过后面的 then 方法传入的，即延迟传入，这就是回调函数延迟绑定。接下来针对上面的代码做一下调整，如下：

```
let x = readFilePromise('1.json').then(data => {
  return readFilePromise('2.json')  //这是返回的Promise
});
x.then()
```

根据 then 中回调函数的传入值创建不同类型的 Promise，然后把返回的 Promise 穿透到外层，以供后续的调用。这里的 x 指的就是内部返回的 Promise，然后在 x 后面可以依次完成链式调用。这便是返回值穿透的效果，这两种技术一起作用便可以将深层的嵌套回调写成下面的形式。

```
readFilePromise('1.json').then(data => {
    return readFilePromise('2.json');
}).then(data => {
    return readFilePromise('3.json');
}).then(data => {
    return readFilePromise('4.json');
});
```

这样就显得清爽许多，更重要的是，它更符合人的线性思维模式，开发体验更好，两种技术结合产生了链式调用的效果。

这样解决了多层嵌套的问题，那另外一个问题，即每次任务执行结束后分别处理成功和失败的情况怎么解决的呢？Promise 采用了错误冒泡的方式。下面来看效果：

```
readFilePromise('1.json').then(data => {
    return readFilePromise('2.json');
}).then(data => {
    return readFilePromise('3.json');
}).then(data => {
    return readFilePromise('4.json');
}).catch(err => {
  // xxx
})
```

这样前面产生的错误会一直向后传递，被 catch 接收到，就不用频繁地检查错误了。从上面的这些代码中可以看到，Promise 解决效果也比较明显：实现链式调用，解决多层嵌套问题；实现错误冒泡后一站式处理，解决每次任务中判断错误、增加代码混乱度的问题。

### 4. Promise的方法

Promise常用的方法：then()、catch()、all()、race()、finally()、allSettled()、any()。

#### （1）then()

当Promise执行的内容符合成功条件时，调用`resolve`函数，失败就调用`reject`函数。那Promise创建完了，该如何调用呢？这时就该then出场了：

```
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

`then`方法接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为`resolved`时调用，第二个回调函数是Promise对象的状态变为`rejected`时调用。其中第二个参数可以省略。

`then`方法返回的是一个新的Promise实例。因此可以采用**链式写法**，即`then`方法后面再调用另一个then方法。当写有顺序的异步事件时，需要串行时，可以这样写：

```
let promise = new Promise((resolve,reject)=>{
    ajax('first').success(function(res){
        resolve(res);
    })
})
promise.then(res=>{
    return new Promise((resovle,reject)=>{
        ajax('second').success(function(res){
            resolve(res)
        })
    })
}).then(res=>{
    return new Promise((resovle,reject)=>{
        ajax('second').success(function(res){
            resolve(res)
        })
    })
}).then(res=>{
    
})
```

#### （2）catch()

Promise对象的catch方法相当于`then`方法的第二个参数，指向`reject`的回调函数。

不过`catch`方法还有一个作用，就是在执行`resolve`回调函数时，如果出现错误，抛出异常，不会停止运行，而是进入`catch`方法中：

```
p.then((data) => {
     console.log('resolved',data);
},(err) => {
     console.log('rejected',err);
}); 
```

#### （3）all()

`all`方法可以完成**并行任务**， 它接收一个数组，数组的每一项都是一个`promise`对象。当数组中所有的`promise`的状态都达到`resolved`时，`all`方法的状态就会变成`resolved`，如果有一个状态变成了`rejected`，那么`all`方法的状态就会变成`rejected`：

```
let promise1 = new Promise((resolve,reject)=>{
 setTimeout(()=>{
       resolve(1);
 },2000)
});
let promise2 = new Promise((resolve,reject)=>{
 setTimeout(()=>{
       resolve(2);
 },1000)
});
let promise3 = new Promise((resolve,reject)=>{
 setTimeout(()=>{
       resolve(3);
 },3000)
});

Promise.all([promise1,promise2,promise3]).then(res=>{
    console.log(res);  //结果为：[1,2,3] 
})
```

调用`all`方法时的结果成功的时候是回调函数的参数也是一个数组，这个数组按顺序保存着每一个promise对象`resolve`执行时的值。

#### （4）race()

`race`方法和`all`一样，接受的参数是一个每项都是`promise`的数组，但与`all`不同的是，当最先执行完的事件执行完之后，就直接返回该`promise`对象的值。

如果第一个`promise`对象状态变成`resolved`，那自身的状态变成了`resolved`；反之，第一个`promise`变成`rejected`，那自身状态就会变成`rejected`。

```
let promise1 = new Promise((resolve,reject) => {
 setTimeout(() =>  {
       reject(1);
 },2000)
});
let promise2 = new Promise((resolve,reject) => {
 setTimeout(() => {
       resolve(2);
 },1000)
});
let promise3 = new Promise((resolve,reject) => {
 setTimeout(() => {
       resolve(3);
 },3000)
});
Promise.race([promise1,promise2,promise3]).then(res => {
 console.log(res); //结果：2
},rej => {
    console.log(rej)};
)
```

那么`race`方法有什么实际作用呢？当需要执行一个任务，超过多长时间就不做了，就可以用这个方法来解决：

```
Promise.race([promise1, timeOutPromise(5000)]).then(res => console.log(res))
```

#### （5）finally()

`finally`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

```
promise.then(result => {···})
    .catch(error => {···})
       .finally(() => {···});
```

上面代码中，不管`promise`最后的状态如何，在执行完`then`或`catch`指定的回调函数以后，都会执行`finally`方法指定的回调函数。

下面来看例子，服务器使用 Promise 处理请求，然后使用`finally`方法关掉服务器。

```
server.listen(port)
  .then(function () {
    // ...
  })
  .finally(server.stop);
```

`finally`方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是`fulfilled`还是`rejected`。这表明，`finally`方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

`finally`本质上是`then`方法的特例：

```
promise
.finally(() => {
  // 语句
});

// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);
```

上面代码中，如果不使用`finally`方法，同样的语句需要为成功和失败两种情况各写一次。有了`finally`方法，则只需要写一次。

#### （6）allSettled()

Promise.allSettled 的语法及参数跟 Promise.all 类似，其参数接受一个 Promise 的数组，返回一个新的 Promise。唯一的不同在于，执行完之后不会失败，也就是说当 Promise.allSettled 全部处理完成后，我们可以拿到每个 Promise 的状态，而不管其是否处理成功。

下面使用 allSettled 实现的一段代码：

```
const resolved = Promise.resolve(2);
const rejected = Promise.reject(-1);
const allSettledPromise = Promise.allSettled([resolved, rejected]);
allSettledPromise.then(function (results) {
  console.log(results);
});
// 返回结果：
// [
//    { status: 'fulfilled', value: 2 },
//    { status: 'rejected', reason: -1 }
// ]
```

可以看到，Promise.allSettled 最后返回的是一个数组，记录传进来的参数中每个 Promise 的返回值，这就是和 all 方法不太一样的地方。你也可以根据 all 方法提供的业务场景的代码进行改造，其实也能知道多个请求发出去之后，Promise 最后返回的是每个参数的最终状态。

#### （7）any()

any 方法返回一个 Promise，只要参数 Promise 实例有一个变成 fullfilled 状态，最后 any 返回的实例就会变成 fullfilled 状态；如果所有参数 Promise 实例都变成 rejected 状态，包装实例就会变成 rejected 状态。

下面对上面 allSettled 这段代码进行改造，来看下改造完的代码和执行结果：

```
const resolved = Promise.resolve(2);
const rejected = Promise.reject(-1);
const allSettledPromise = Promise.any([resolved, rejected]);
allSettledPromise.then(function (results) {
  console.log(results);
});
// 返回结果：2
```

可以看出，只要其中一个 Promise 变成 fullfilled 状态，那么 any 最后就返回这个 Promise。由于上面 resolved 这个 Promise 已经是 resolve 的了，故最后返回结果为 2。

### 5. Promise的异常处理

错误处理是所有编程范型都必须要考虑的问题，在使用 JavaScript 进行异步编程时，也不例外。如果我们不做特殊处理，会怎样呢？来看下面的代码，先定义一个必定会失败的方法

```
let fail = () => {
    setTimeout(() => {
 throw new Error("fail");
    }, 1000);
};
```

调用：

```
console.log(1);
try {
    fail();
} catch (e) {
    console.log("captured");
}
console.log(2);
```

可以看到打印出了 1 和 2，并在 1 秒后，获得一个“Uncaught Error”的错误打印，注意观察这个错误的堆栈：

```
Uncaught Error: fail
    at <anonymous>:3:9
```

可以看到，其中的 setTimeout (async) 这样的字样，表示着这是一个异步调用抛出的堆栈。但是，captured”这样的字样也并未打印，因为母方法 fail() 本身的原始顺序执行并没有失败，这个异常的抛出是在回调行为里发生的。 从上面的例子可以看出，对于异步编程来说，我们需要使用一种更好的机制来捕获并处理可能发生的异常。

Promise 除了支持 resolve 回调以外，还支持 reject 回调，前者用于表示异步调用顺利结束，而后者则表示有异常发生，中断调用链并将异常抛出：

```
const exe = (flag) => () => new Promise((resolve, reject) => {
    console.log(flag);
    setTimeout(() => {
        flag ? resolve("yes") : reject("no");
    }, 1000);
});
```

上面的代码中，flag 参数用来控制流程是顺利执行还是发生错误。在错误发生的时候，no 字符串会被传递给 reject 函数，进一步传递给调用链：

```
Promise.resolve()
       .then(exe(false))
       .then(exe(true));
```

上面的调用链，在执行的时候，第二行就传入了参数 false，它就已经失败了，异常抛出了，因此第三行的 exe 实际没有得到执行，执行结果如下：

```
false
Uncaught (in promise) no
```

这就说明，通过这种方式，调用链被中断了，下一个正常逻辑 exe(true) 没有被执行。 但是，有时候需要捕获错误，而继续执行后面的逻辑，该怎样做？这种情况下就要在调用链中使用 catch 了：

```
Promise.resolve()
       .then(exe(false))
       .catch((info) => { console.log(info); })
       .then(exe(true));
```

这种方式下，异常信息被捕获并打印，而调用链的下一步，也就是第四行的 exe(true) 可以继续被执行。将看到这样的输出：

```
false
no
true
```

### 6. Promise的实现

这一部分就来简单实现一下Promise及其常用的方法。

#### （1）Promise

```
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

function MyPromise(fn) {
  // 保存初始化状态
  var self = this;

  // 初始化状态
  this.state = PENDING;

  // 用于保存 resolve 或者 rejected 传入的值
  this.value = null;

  // 用于保存 resolve 的回调函数
  this.resolvedCallbacks = [];

  // 用于保存 reject 的回调函数
  this.rejectedCallbacks = [];

  // 状态转变为 resolved 方法
  function resolve(value) {
    // 判断传入元素是否为 Promise 值，如果是，则状态改变必须等待前一个状态改变后再进行改变
    if (value instanceof MyPromise) {
      return value.then(resolve, reject);
    }

    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为 pending 时才能转变，
      if (self.state === PENDING) {
        // 修改状态
        self.state = RESOLVED;

        // 设置传入的值
        self.value = value;

        // 执行回调函数
        self.resolvedCallbacks.forEach(callback => {
          callback(value);
        });
      }
    }, 0);
  }

  // 状态转变为 rejected 方法
  function reject(value) {
    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为 pending 时才能转变
      if (self.state === PENDING) {
        // 修改状态
        self.state = REJECTED;

        // 设置传入的值
        self.value = value;

        // 执行回调函数
        self.rejectedCallbacks.forEach(callback => {
          callback(value);
        });
      }
    }, 0);
  }

  // 将两个方法传入函数执行
  try {
    fn(resolve, reject);
  } catch (e) {
    // 遇到错误时，捕获错误，执行 reject 函数
    reject(e);
  }
}

MyPromise.prototype.then = function(onResolved, onRejected) {
  // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
  onResolved =
    typeof onResolved === "function"
      ? onResolved
      : function(value) {
          return value;
        };

  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function(error) {
          throw error;
        };

  // 如果是等待状态，则将函数加入对应列表中
  if (this.state === PENDING) {
    this.resolvedCallbacks.push(onResolved);
    this.rejectedCallbacks.push(onRejected);
  }

  // 如果状态已经凝固，则直接执行对应状态的函数

  if (this.state === RESOLVED) {
    onResolved(this.value);
  }

  if (this.state === REJECTED) {
    onRejected(this.value);
  }
};
```

#### （2）Promise.then

`then` 方法返回一个新的 `promise` 实例，为了在 `promise` 状态发生变化时（`resolve` / `reject` 被调用时）再执行 `then` 里的函数，我们使用一个 `callbacks` 数组先把传给then的函数暂存起来，等状态改变时再调用。

**那么，怎么保证后一个 `then` 里的方法在前一个 `then`（可能是异步）结束之后再执行呢？**

可以将传给 `then` 的函数和新 `promise` 的 `resolve` 一起 `push` 到前一个 `promise` 的 `callbacks` 数组中，达到承前启后的效果：

- 承前：当前一个 `promise` 完成后，调用其 `resolve` 变更状态，在这个 `resolve` 里会依次调用 `callbacks` 里的回调，这样就执行了 `then` 里的方法了
- 启后：上一步中，当 `then` 里的方法执行完成后，返回一个结果，如果这个结果是个简单的值，就直接调用新 `promise` 的 `resolve`，让其状态变更，这又会依次调用新 `promise` 的 `callbacks` 数组里的方法，循环往复。。如果返回的结果是个 `promise`，则需要等它完成之后再触发新 `promise` 的 `resolve`，所以可以在其结果的 `then` 里调用新 `promise` 的 `resolve`

```
then(onFulfilled, onReject){
    // 保存前一个promise的this
    const self = this; 
    return new MyPromise((resolve, reject) => {
      // 封装前一个promise成功时执行的函数
      let fulfilled = () => {
        try{
          const result = onFulfilled(self.value); // 承前
          return result instanceof MyPromise? result.then(resolve, reject) : resolve(result); //启后
        }catch(err){
          reject(err)
        }
      }
      // 封装前一个promise失败时执行的函数
      let rejected = () => {
        try{
          const result = onReject(self.reason);
          return result instanceof MyPromise? result.then(resolve, reject) : reject(result);
        }catch(err){
          reject(err)
        }
      }
      switch(self.status){
        case PENDING: 
          self.onFulfilledCallbacks.push(fulfilled);
          self.onRejectedCallbacks.push(rejected);
          break;
        case FULFILLED:
          fulfilled();
          break;
        case REJECT:
          rejected();
          break;
      }
    })
   }
```

**注意：**

- 连续多个 `then` 里的回调方法是同步注册的，但注册到了不同的 `callbacks` 数组中，因为每次 `then` 都返回新的 `promise` 实例（参考上面的例子和图）
- 注册完成后开始执行构造函数中的异步事件，异步完成之后依次调用 `callbacks` 数组中提前注册的回调

#### （3）Promise.all

该方法的参数是 Promise 的实例数组, 然后注册一个 then 方法。 待数组中的 Promise 实例的状态都转为 fulfilled 之后则执行 then 方法.，这里主要就是一个计数逻辑, 每当一个 Promise 的状态变为 fulfilled 之后就保存该实例返回的数据, 然后将计数减一, 当`计数器`变为 `0` 时, 代表数组中所有 Promise 实例都执行完毕.

```
Promise.all = function (arr) {
  let args = Array.prototype.slice.call(arr)
  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([])
    let remaining = args.length
    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          let then = val.then
          if (typeof then === 'function') {
            then.call(val, function (val) { // 这里如果传入参数是 promise的话需要将结果传入 args, 而不是 promise实例
              res(i, val) 
            }, reject)
            return
          }
        }
        args[i] = val
        if (--remaining === 0) {
          resolve(args)
        }
      } catch (ex) {
        reject(ex)
      }
    }
    for (let i = 0; i < args.length; i++) {
      res(i, args[i])
    }
  })
}
```

#### （4）Promise.race

该方法的参数是 Promise 实例数组, 然后其 then 注册的回调方法是数组中的某一个 Promise 的状态变为 fulfilled 的时候就执行. 因为 Promise 的状态**只能改变一次**, 那么我们只需要把 Promise.race 中产生的 Promise 对象的 resolve 方法, 注入到数组中的每一个 Promise 实例中的回调函数中即可：

```
oPromise.race = function (args) {
  return new oPromise((resolve, reject) => {
    for (let i = 0, len = args.length; i < len; i++) {
      args[i].then(resolve, reject)
    }
  })
}
```

## Generator

### 1. Generator 概述

#### （1）Generator

Generator（生成器）是 ES6 中的关键词，通俗来讲 Generator 是一个带星号的函数（它并不是真正的函数），可以配合 yield 关键字来暂停或者执行函数。先来看一个例子：

```
function* gen() {
  console.log("enter");
  let a = yield 1;
  let b = yield (function () {return 2})();
  return 3;
}
var g = gen()           // 阻塞，不会执行任何语句
console.log(typeof g)   // 返回 object 这里不是 "function"
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next()) 
```

输出结果如下：

```
object
enter
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: true }
{ value: undefined, done: true }
```

Generator 中配合使用 yield 关键词可以控制函数执行的顺序，每当执行一次 next 方法，Generator 函数会执行到下一个存在 yield 关键词的位置。

总结，Generator 的执行的关键点如下：

- 调用 gen() 后，程序会阻塞，不会执行任何语句；
- 调用 g.next() 后，程序继续执行，直到遇到 yield 关键词时执行暂停；
- 一直执行 next 方法，最后返回一个对象，其存在两个属性：value 和 done。

#### （2）yield

yield 同样也是 ES6 的关键词，配合 Generator 执行以及暂停。yield 关键词最后返回一个迭代器对象，该对象有 value 和 done 两个属性，其中 done 属性代表返回值以及是否完成。yield 配合着 Generator，再同时使用 next 方法，可以主动控制 Generator 执行进度。

下面来看看多个 Generator 配合 yield 使用的情况：

```
function* gen1() {
    yield 1;
    yield* gen2();
    yield 4;
}
function* gen2() {
    yield 2;
    yield 3;
}
var g = gen1();
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())
```

执行结果如下：

```
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: 4, done: false }
{value: undefined, done: true}
```

可以看到，使用 yield 关键词的话还可以配合着 Generator 函数嵌套使用，从而控制函数执行进度。这样对于 Generator 的使用，以及最终函数的执行进度都可以很好地控制，从而形成符合你设想的执行顺序。即便 Generator 函数相互嵌套，也能通过调用 next 方法来按照进度一步步执行。

#### （3）生成器原理

其实，在生成器内部，如果遇到 yield 关键字，那么 V8 引擎将返回关键字后面的内容给外部，并暂停该生成器函数的执行。生成器暂停执行后，外部的代码便开始执行，外部代码如果想要恢复生成器的执行，可以使用 result.next 方法。

那 V8 是怎么实现生成器函数的暂停执行和恢复执行的呢？

它用到的就是**协程**，协程是—种比线程更加轻量级的存在。我们可以把协程看成是跑在线程上的任务，一个线程上可以存在多个协程，但是在线程上同时只能执行一个协程。比如，当前执行的是 A 协程，要启动 B 协程，那么 A 协程就需要将主线程的控制权交给 B 协程，这就体现在 A 协程暂停执行，B 协程恢复执行; 同样，也可以从 B 协程中启动 A 协程。通常，如果从 A 协程启动 B 协程，我们就把 A 协程称为 B 协程的父协程。

正如一个进程可以拥有多个线程一样，一个线程也可以拥有多个协程。每一时刻，该线程只能执行其中某一个协程。最重要的是，协程不是被操作系统内核所管理，而完全是由程序所控制（也就是在用户态执行）。这样带来的好处就是性能得到了很大的提升，不会像线程切换那样消耗资源。

### 2. Generator 和 thunk 结合

下面先来了解一下什么是 thunk 函数，以判断数据类型为例：

```
let isString = (obj) => {
  return Object.prototype.toString.call(obj) === '[object String]';
};
let isFunction = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Function]';
};
let isArray = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Array]';
};
....
```

可以看到，这里出现了很多重复的判断逻辑，平常在开发中类似的重复逻辑的场景也同样会有很多。下面来进行封装：

```
let isType = (type) => {
  return (obj) => {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  }
}
```

封装之后就可以这样使用，从而来减少重复的逻辑代码：

```
let isString = isType('String');
let isArray = isType('Array');
isString("123");    // true
isArray([1,2,3]);   // true
```

相应的 isString 和 isArray 是由 isType 方法生产出来的函数，通过上面的方式来改造代码，明显简洁了不少。像 isType 这样的函数称为 thunk 函数，它的**基本思路都是接收一定的参数，会生产出定制化的函数，最后使用定制化的函数去完成想要实现的功能。**

这样的函数在 JS 的编程过程中会遇到很多，抽象度比较高的 JS 代码往往都会采用这样的方式。那 Generator 和 thunk 函数的结合是否能带来一定的便捷性呢？

下面以文件操作的代码为例，看一下 Generator 和 thunk 的结合能够对异步操作产生的效果：

```
const readFileThunk = (filename) => {
  return (callback) => {
    fs.readFile(filename, callback);
  }
}
const gen = function* () {
  const data1 = yield readFileThunk('1.txt')
  console.log(data1.toString())
  const data2 = yield readFileThunk('2.txt')
  console.log(data2.toString)
}
let g = gen();
g.next().value((err, data1) => {
  g.next(data1).value((err, data2) => {
    g.next(data2);
  })
})
```

readFileThunk 就是一个 thunk 函数，上面的这种编程方式就让 Generator 和异步操作关联起来了。上面第三段代码执行起来嵌套的情况还算简单，如果任务多起来，就会产生很多层的嵌套，可读性不强，因此有必要把执行的代码进行封装优化：

```
function run(gen){
  const next = (err, data) => {
    let res = gen.next(data);
    if(res.done) return;
    res.value(next);
  }
  next();
}
run(g);
```

可以看到， run 函数和上面的执行效果其实是一样的。代码虽然只有几行，但其包含了递归的过程，解决了多层嵌套的问题，并且完成了异步操作的一次性的执行效果。这就是通过 thunk 函数完成异步操作的情况。

### 3. Generator 和 Promise 结合

其实 Promise 也可以和 Generator 配合来实现上面的效果。还是利用上面的输出文件的例子，对代码进行改造，如下所示：

```
const readFilePromise = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if(err) {
        reject(err);
      }else {
        resolve(data);
      }
    })
  }).then(res => res);
}
// 这块和上面 thunk 的方式一样
const gen = function* () {
  const data1 = yield readFilePromise('1.txt')
  console.log(data1.toString())
  const data2 = yield readFilePromise('2.txt')
  console.log(data2.toString)
}
// 这里和上面 thunk 的方式一样
function run(gen){
  const next = (err, data) => {
    let res = gen.next(data);
    if(res.done) return;
    res.value(next);
  }
  next();
}
run(g);
```

可以看到，thunk 函数的方式和通过 Promise 方式执行效果本质上是一样的，只不过通过 Promise 的方式也可以配合 Generator 函数实现同样的异步操作。

### 4. co 函数库

co 函数库用于处理 Generator 函数的自动执行。核心原理其实就是通过和 thunk 函数以及 Promise 对象进行配合，包装成一个库。它使用起来非常简单，比如还是用上面那段代码，第三段代码就可以省略了，直接引用 co 函数，包装起来就可以使用了，代码如下：

```
const co = require('co');
let g = gen();
co(g).then(res =>{
  console.log(res);
})
```

这段代码比较简单，几行就完成了之前写的递归的那些操作。那么为什么 co 函数库可以自动执行 Generator 函数，它的处理原理如下：

1. 因为 Generator 函数就是一个异步操作的容器，它需要一种自动执行机制，co 函数接受 Generator 函数作为参数，并最后返回一个 Promise 对象。
2. 在返回的 Promise 对象里面，co 先检查参数 gen 是否为 Generator 函数。如果是，就执行该函数；如果不是就返回，并将 Promise 对象的状态改为 resolved。
3. co 将 Generator 函数的内部指针对象的 next 方法，包装成 onFulfilled 函数。这主要是为了能够捕捉抛出的错误。
4. 关键的是 next 函数，它会反复调用自身。

## Async/Await

### 1. async/await 的概念

ES7 新增了两个关键字： async和await，代表异步JavaScript编程范式的迁移。它改进了生成器的缺点，提供了在不阻塞主线程的情况下使用同步代码实现异步访问资源的能力。其实 async/await 是 Generator 的语法糖，它能实现的效果都能用then链来实现，它是为优化then链而开发出来的。

从字面上来看，async是“异步”的简写，await则为等待，所以 async 用来声明异步函数，这个关键字可以用在函数声明、函数表达式、箭头函数和方法上。因为异步函数主要针对不会马上完成的任务，所以自然需要一种暂停和恢复执行的能力，使用await关键字可以暂停异步代码的执行，等待Promise解决。async 关键字可以让函数具有异步特征，但总体上代码仍然是同步求值的。

它们的用法很简单，首先用 async 关键字声明一个异步函数：

```
async function httpRequest() {
}
```

然后就可以在这个函数内部使用 await 关键字了：

```
async function httpRequest() {
  let res1 = await httpPromise(url1)
  console.log(res1)
}
```

这里，await关键字会接收一个期约并将其转化为一个返回值或一个抛出的异常。通过情况下，我们不会使用await来接收一个保存期约的变量，更多的是把他放在一个会返回期约的函数调用面前，比如上述例子。这里的关键就是，await关键字并不会导致程序阻塞，代码仍然是异步的，而await只是掩盖了这个事实，这就意味着任何使用await的代码本身都是异步的。

下面来看看async函数返回了什么：

```
async function testAsy(){
   return 'hello world';
}
let result = testAsy(); 
console.log(result)
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNvvgas2n1Qlf2PPyYTNf5iadOJI3yddR4FFvZRBZGbQyS0pQK5ejx6albrYZ4G40vhDHHGFbvY3WQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

可以看到，async 函数返回的是 Promise 对象。如果异步函数使用return关键字返回了值（如果没有return则会返回undefined），这个值则会被 `Promise.resolve()` 包装成 Promise 对象。异步函数始终返回Promise对象。

### 2. await 到底在等啥？

**那await到底在等待什么呢？**

一般我们认为 await 是在等待一个 async 函数完成。不过按语法说明，await 等待的是一个表达式，这个表达式的结果是 Promise 对象或其它值。

因为 async 函数返回一个 Promise 对象，所以 await 可以用于等待一个 async 函数的返回值——这也可以说是 await 在等 async 函数。但要清楚，它等的实际是一个返回值。注意，await 不仅用于等 Promise 对象，它可以等任意表达式的结果。所以，await 后面实际是可以接普通函数调用或者直接量的。所以下面这个示例完全可以正确运行：

```
function getSomething() {
    return "something";
}
async function testAsync() {
    return Promise.resolve("hello async");
}
async function test() {
    const v1 = await getSomething();
    const v2 = await testAsync();
    console.log(v1, v2);
}
test(); // something hello async
```

await 表达式的运算结果取决于它等的是什么：

- 如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的内容；
- 如果它等到的是一个 Promise 对象，await 就就会阻塞后面的代码，等着 Promise 对象 resolve，然后将得到的值作为 await 表达式的运算结果。

下面来看一个例子：

```
function testAsy(x){
   return new Promise(resolve=>{setTimeout(() => {
       resolve(x);
     }, 3000)
    }
   )
}
async function testAwt(){    
  let result =  await testAsy('hello world');
  console.log(result);    // 3秒钟之后出现hello world
  console.log('cuger')   // 3秒钟之后出现cug
}
testAwt();
console.log('cug')  //立即输出cug
```

这就是 await 必须用在 async 函数中的原因。async 函数调用不会造成阻塞，它内部所有的阻塞都被封装在一个 Promise 对象中异步执行。await暂停当前async的执行，所以'cug''最先输出，hello world'和 cuger 是3秒钟后同时出现的。

### 3. async/await的优势

单一的 Promise 链并不能凸显 async/await 的优势。但是，如果处理流程比较复杂，那么整段代码将充斥着 then，语义化不明显，代码不能很好地表示执行流程，这时async/await的优势就能体现出来了。

假设一个业务，分多个步骤完成，每个步骤都是异步的，而且依赖于上一个步骤的结果。首先用 `setTimeout` 来模拟异步操作：

```
/**
 * 传入参数 n，表示这个函数执行的时间（毫秒）
 * 执行的结果是 n + 200，这个值将用于下一步骤
 */
function takeLongTime(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(n + 200), n);
    });
}
function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}
function step2(n) {
    console.log(`step2 with ${n}`);
    return takeLongTime(n);
}
function step3(n) {
    console.log(`step3 with ${n}`);
    return takeLongTime(n);
}
```

现在用 Promise 方式来实现这三个步骤的处理：

```
function doIt() {
    console.time("doIt");
    const time1 = 300;
    step1(time1)
        .then(time2 => step2(time2))
        .then(time3 => step3(time3))
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("doIt");
        });
}
doIt();
// c:\var\test>node --harmony_async_await .
// step1 with 300
// step2 with 500
// step3 with 700
// result is 900
// doIt: 1507.251ms
```

输出结果 `result` 是 `step3()` 的参数 `700 + 200` = `900`。`doIt()` 顺序执行了三个步骤，一共用了 `300 + 500 + 700 = 1500` 毫秒，和 `console.time()/console.timeEnd()` 计算的结果一致。

如果用 async/await 来实现呢，会是这样：

```
async function doIt() {
    console.time("doIt");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time2);
    const result = await step3(time3);
    console.log(`result is ${result}`);
    console.timeEnd("doIt");
}
doIt();
```

结果和之前的 Promise 实现是一样的，但是这个代码看起来会清晰得多，几乎和同步代码一样。

async/await对比Promise的优势就显而易见了：

- 代码读起来更加同步，Promise虽然摆脱了回调地狱，但是then的链式调⽤也会带来额外的理解负担；
- Promise传递中间值很麻烦，⽽async/await⼏乎是同步的写法，⾮常优雅；
- 错误处理友好，async/await可以⽤成熟的try/catch，Promise的错误捕获比较冗余；
- 调试友好，Promise的调试很差，由于没有代码块，不能在⼀个返回表达式的箭头函数中设置断点，如果在⼀个.then代码块中使⽤调试器的步进(step-over)功能，调试器并不会进⼊后续的.then代码块，因为调试器只能跟踪同步代码的每⼀步。

### 4. async/await 的异常处理

利用 async/await 的语法糖，可以像处理同步代码的异常一样，来处理异步代码，这里还用上面的示例：

```
const exe = (flag) => () => new Promise((resolve, reject) => {
    console.log(flag);
    setTimeout(() => {
        flag ? resolve("yes") : reject("no");
    }, 1000);
});
const run = async () => {
 try {
  await exe(false)();
  await exe(true)();
 } catch (e) {
  console.log(e);
 }
}
run();
```

这里定义一个异步方法 run，由于 await 后面需要直接跟 Promise 对象，因此通过额外的一个方法调用符号 () 把原有的 exe 方法内部的 Thunk 包装拆掉，即执行 exe(false)() 或 exe(true)() 返回的就是 Promise 对象。在 try 块之后，使用 catch 来捕捉。运行代码会得到这样的输出：

```
false
no
```

这个 false 就是 exe 方法对入参的输出，而这个 no 就是 setTimeout 方法 reject 的回调返回，它通过异常捕获并最终在 catch 块中输出。就像我们所认识的同步代码一样，第四行的 exe(true) 并未得到执行。



# 前端模块化的前世今生

[前端模块化的前世今生](https://mp.weixin.qq.com/s?__biz=MzU2MTIyNDUwMA==&mid=2247507627&idx=1&sn=d9f8a80ab585ca7713c2c1d09cf4bbf9&chksm=fc7e90f0cb0919e68132e975c11f20458740d254a0844a019144fa53a6de7c4f86c44dcc246a&mpshare=1&scene=23&srcid=12219qBlglUgDUurJLK5g3CA&sharer_sharetime=1671630016273&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

随着前端项目越来越庞大，代码复杂性不断增加，对于模块化的需求越来越大。模块化是工程化基础，只有将代码模块化，拆分为合理单元，才具备调度整合的能力。下面就来看看模块化的概念，以及不同模块化方案的使用方式和优缺点。

##  模块概述

### （1）概念

由于代码之间会发生大量交互，如果结构不合理，这些代码就会变得难以维护、难以测试、难以调试。而使用模块化就解决了这些问题，模块化的**特点**如下：

- **可重用性：** 当应用被组织成模块时，可以方便在其他地方重用这些模块，避免编写重复代码，从而加快开发流程；
- **可读性：** 当应用变得越来越复杂时，如果在一个文件中编写所有功能，代码会变得难以阅读。如果使用模块设计应用，每个功能都分布在各自的模块中，代码就会更加清晰、易读；
- **可维护性：** 软件的美妙之处在于进化，从长远来看，我们需要不断为应用增加新的功能。当应用被结构化为模块时，可以轻松添加或删除功能。除此之外，修复错误也是软件维护的一部分，使用模块就可以更快速地定位问题。

模块化是一种将系统分离成独立功能部分的方法，可以将系统分割成独立的功能部分，严格定义模块接口，模块间具有透明性。通过将代码进行模块化分隔，每个文件彼此独立，开发者更容易开发和维护代码，模块之间又能够互相调用和通信，这就是现代化开发的基本模式。

### （2）模式

JavaScript 模块包含三个部分：

- **导入：** 在使用模块时，需要将所需模块作为依赖项导入。例如，如果想要创建一个 React 组件，就需导入 react 模块。要使用像 Lodash 这样的工具库，就需要安装并导入它作为依赖项；
- **代码：** 模块具体代码；
- **导出：** 模块接口，从模块中导出的内容可供导入模块的任何地方使用。

### （3）类型

模块化的贯彻执行离不开相应的约定，即规范。这是能够进行模块化工作的重中之重。实现模块化的规范有很多，比如：AMD、RequireJS、CMD、SeaJS、UMD、CommonJS、ES6 Module。除此之外，IIFE（立即执行函数）也是实现模块化的一种方案。

本文将介绍其中的六个：

- **IIFE：** 立即调用函数表达式
- **AMD：** 异步模块加载机制
- **CMD：** 通用模块定义
- **UMD：** 统一模块定义
- **CommonJS：** Node.js 采用该规范
- **ES 模块：** JavaScript 内置模块系统

## IIFE

在 ECMAScript 6 之前，模块并没有被内置到 JavaScript 中，因为 JavaScript 最初是为小型浏览器脚本设计的。这种模块化的缺乏，导致在代码的不同部分使用了共享全局变量。

比如，对于以下代码：

```
var name = 'JavaScript';
var age = 20;
```

当上面的代码运行时，`name` 和 `age` 变量会被添加到全局对象中。因此，应用中的所有 JavaScript 脚本都可以访问全局变量 `name` 和 `age`，这就很容易导致代码错误，因为在其他不相关的单元中也可以访问和修改这些全局变量。除此之外，向全局对象添加变量会使全局命名空间变得混乱并增加了命名冲突的机会。

所以，我们就需要一种封装变量和函数的方法，并且只对外公开定义的接口。因此，为了实现模块化并避免使用全局变量，可以使用如下方式来创建模块：

```
(function () {
    // 声明私有变量和函数
 
    return {
        // 声明公共变量和函数
    }
})();
```

上面的代码就是一个返回对象的闭包，这就是我们常说的IIFE（Immediately Invoked Function Expression），即立即调用函数表达式。在该函数中，就创建了一个局部范围。这样就避免了使用全局变量（IIFE 是匿名函数），并且代码单元被封装和隔离。

可以这样来使用 IIFE 作为一个模块：

```
var module = (function(){
  var age = 20;
  var name = 'JavaScript'
  
  var fn1 = function(){
    console.log(name, age)
  };
  
  var fn2 = function(a, b){
    console.log(a + b)
  };
  
  return {
    age,
    fn1,
    fn2,
  };
})();

module.age;           // 20
module.fn1();         // JavaScript 20
module.fn2(128, 64);  // 192
```

在这段代码中，`module` 就是我们定义的一个模块，它里面定义了两个私有变量 `age` 和 `name`，同时定义了两个方法 `fn1` 和 `fn2`，其中 `fn1` 中使用 `module` 中定义的私有变量，`fn2` 接收外部传入参数。最后，module 向外部暴露了`age`、`fn1`、`fn2`。这样就形成了一个模块。

当试图在 `module` 外部直接调用`fn1`时，就会报错：

```
fn1(); // Uncaught ReferenceError: fn1 is not defined
```

当试图在 `module` 外部打印其内部的私有变量`name`时，得到的结果是 `undefined`：

```
module.name; // undefined
```

上面的 IIFE 的例子是遵循模块模式的，具备其中的三部分，其中 age、name、fn1、fn2 就是模块内部的代码实现，返回的 age、fn1、fn2 就是导出的内容，即接口。调用 `module` 方法和变量就是导入使用。

## CommonJS

### （1）概念

#### ① 定义

CommonJS 是社区提出的一种 JavaScript 模块化规范，它是为浏览器之外的 JavaScript 运行环境提供的模块规范，Node.js 就采用了这个规范。

> 注意：
>
> - 浏览器不支持使用 CommonJS 规范；
> - Node.js 不仅支持使用 CommonJS 来实现模块，还支持最新的  ES 模块。

CommonJS 规范加载模块是同步的，只有加载完成才能继续执行后面的操作。不过由于 Node.js 主要运行在服务端，而所需加载的模块文件一般保存在本地硬盘，所以加载比较快，而无需考虑使用异步的方式。

#### ② 语法

CommonJS 规范规定每个文件就是一个模块，有独立的作用域，对于其他模块不可见，这样就不会污染全局作用域。在 CommonJS 中，可以分别使用 `export` 和 `require` 来导出和导入模块。在每个模块内部，都有一个 `module` 对象，表示当前模块。通过它来导出 API，它有以下属性：

- `exports`：模块导出值。
- `filename`：模块文件名，使用绝对路径；
- `id`：模块识别符，通常是使用绝对路径的模块文件名；
- `loaded`：布尔值，表示模块是否已经完成加载；
- `parent`：对象，表示调用该模块的模块；
- `children`：数组，表示该模块要用到的其他模块；

#### ③ 特点

CommonJS 规范具有以下特点：

- 文件即模块，文件内所有代码都运行在独立的作用域，因此不会污染全局空间；
- 模块可以被多次引用、加载。第一次被加载时，**会被缓存**，之后都从缓存中直接读取结果。
- 加载某个模块，就是引入该模块的 `module.exports` 属性，该属性**输出的是值拷贝**，一旦这个值被输出，模块内再发生变化不会影响到输出的值。
- 模块加载顺序按照代码引入的顺序。

#### ④ 优缺点

CommonJS 的优点：

- 使用简单
- 很多工具系统和包都是使用 CommonJS 构建的；
- 在 Node.js 中使用，Node.js 是流行的 JavaScript 运行时环境。

CommonJS 的缺点

- 可以在 JavaScript 文件中包含一个模块；
- 如果想在 Web 浏览器中使用它，则需要额外的工具；
- 本质上是同步的，在某些情况下不适合在 Web 浏览器中使用。

### （2）使用

在 CommonJS 中，可以通过 require 函数来导入模块，它会读取、执行 JavaScript 文件，并返回该模块的 exports 对象，该对象只有在模块脚本运行完才会生成。

#### ① 模块导出

可以通过以下两种方式来导出模块内容：

```
module.exports.TestModule = function() {
    console.log('exports');
}

exports.TestModule = function() {
    console.log('exports');
}
```

则合两种方式的导出结果是一样的，`module.exports`和`exports`的区别可以理解为：`exports`是`module.exports`的引用，如果在`exports`调用之前调用了`exports=...`，那么就无法再通过`exports`来导出模块内容，除非通过`exports=module.exports`重新设置`exports`的引用指向。

当然，可以先定义函数，再导出：

```
function testModule() {
    console.log('exports');
}

module.exports = testModule;
```

这是仅导出一个函数的情况，使用时就是这样的：

```
testModule = require('./MyModule');

testModule();
```

如果是导出多个函数，就可以这样：

```
function testModule1() {
    console.log('exports1');
}

function testModule2() {
    console.log('exports2');
}
```

导入多个函数并使用：

```
({testModule1, testModule2} = require('./MyModule'));

testModule1();
testModule2();
```

#### ② 模块导入

可以通过以下方式来导入模块：

```
const module = require('./MyModule');
```

注意，如果 `require` 的路径没有后缀，会自动按照`.js`、`.json`和`.node`的顺序进行补齐查找。

#### ③ 加载过程

在  CommonJS 中，`require` 的加载过程如下：

1. 优先从缓存中加载；
2. 如果缓存中没有，检查是否是核心模块，如果是直接加载；
3. 如果不是核心模块，检查是否是文件模块，解析路径，根据解析出的路径定位文件，然后执行并加载；
4. 如果以上都不是，沿当前路径向上逐级递归，直到根目录的`node_modules`目录。

### （3）示例

下面来看一个购物车的例子，主要功能是将商品添加到购物车，并计算购物车商品总价格：

```
// cart.js

var items = [];

function addItem (name, price) 
    item.push({
    name: name,
    price: price
  });
}

exports.total = function () {
    return items.reduce(function (a, b) {
      return a + b.price;
    }, 0);
};

exports.addItem = addItem;
```

这里通过两种方式在 exports 对象上定义了两个方法：addItem 和 total，分别用来添加购物车和计算总价。

下面在控制台测试一下上面定义的模块：

```
let cart = require('./cart');
```

这里使用相对路径来导入 cart 模块，打印 cart 模块，结果如下：

```
cart // { total: [Function], addItem: [Function: addItem] }
```

向购物车添加一些商品，并计算当前购物车商品的总价格：

```
cart.addItem('book', 60);
cart.total()  // 60

cart.addItem('pen', 6);
cart.total()  // 66
```

这就是创建模块的基本方法，我们可以创建一些方法，并且只公开希望其他文件使用的部分代码。该部分成为 API，即应用程序接口。

这里有一个问题，只有一个购物车，即只有一个模块实例。下面来在控制台执行以下代码：

```
second_cart = require('./cart');
```

那这时会创建一个新的购物车吗？事实并非如此，打印当前购物车的商品总金额，它仍然是66：

```
second_cart.total();  // 66
```

当我们㤇创建多个实例时，就需要再模块内创建一个构造函数，下面来重写 `cart.js` 文件：

```
// cart.js

function Cart () {
    this.items = [];
}

Cart.prototype.addItem = function (name, price) {
    this.items.push({
        name: name,
        price: price
    });
}

Cart.prototype.total = function () {
    return this.items.reduce(function(a, b) {
        return a + b.price;
    }, 0);
};

module.export = Cart;
```

现在，当需要使用此模块时，返回的是 Cart 构造函数，而不是具有 cart 函数作为一个属性的对象。下面来导入这个模块，并创建两个购物车实例：

```
Cart = require('./second_cart');

cart1 = new Cart();
cart2 = new Cart();

cart1.addItem('book', 50);
cart1.total();   // 50
cart2.total();   // 50
```

## AMD

### （1）概念

CommonJS 的缺点之一是它是同步的，AMD 旨在通过规范中定义的 API 异步加载模块及其依赖项来解决这个问题。AMD 全称为 Asynchronous Module Definition，即**异步模块加载机制**。它规定了如何定义模块，如何对外输出，如何引入依赖。

AMD规范重要特性就是异步加载。所谓异步加载，就是指同时并发加载所依赖的模块，当所有依赖模块都加载完成之后，再执行当前模块的回调函数。这种加载方式和浏览器环境的性能需求刚好吻合。

#### ① 语法

AMD 规范定义了一个全局函数 define，通过它就可以定义和引用模块，它有 3 个参数：

```
define(id?, dependencies?, factory);
```

其包含三个参数：

- `id`：可选，指模块路径。如果没有提供该参数，模块名称默认为模块加载器请求的指定脚本的路径。
- `dependencies`：可选，指模块数组。它定义了所依赖的模块。依赖模块必须根据模块的工厂函数优先级执行，并且执行的结果应该按照依赖数组中的位置顺序以参数的形式传入工厂函数中。
- `factory`：为模块初始化要执行的函数或对象。如果是函数，那么该函数是单例模式，只会被执行一次；如果是对象，此对象应该为模块的输出值。

除此之外，要想使用此模块，就需要使用规范中定义的 require 函数：

```
require(dependencies?, callback);
```

其包含两个参数：

- `dependencies`：依赖项数组；
- `callback`：加载模块时执行的回调函数。

有关 AMD API 的更详细说明，可以查看 GitHub 上的 AMD API 规范：https://github.com/amdjs/amdjs-api/blob/master/AMD.md。

#### ② 兼容性

该规范的浏览器兼容性如下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOGUHiclOibqeKIexVflbIqTQKiceB9H7NOKClZmVkCKzfFbibdmBFaO0TKY71QrQB6NmnZbolZzukibow/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### ③ 优缺点

AMD 的**优点**：

- 异步加载导致更好的启动时间；
- 能够将模块拆分为多个文件；
- 支持构造函数；
- 无需额外工具即可在浏览器中工作。

AMD 的**缺点**：

- 语法很复杂，学习成本高；
- 需要一个像 RequireJS 这样的加载器库来使用 AMD。

### （2）使用

当然，上面只是 AMD 规范的理论，要想理解这个理论在代码中是如何工作的，就需要来看看 AMD 的实际实现。RequireJS 就是 AMD 规范的一种实现，它被描述为“JavaScript 文件和模块加载器”。下面就来看看 RequireJS 是如何使用的。

#### ① 引入RequireJS

可以通过 npm 来安装 RequireJS：

```
npm i requirejs
```

也可以在 html 文件引入 `require.js` 文件：

```
<script data-main="js/config" src="js/require.js"></script>
```

这里 `script`标签有两个属性：

- `data-main="js/config"`：这是 RequireJS 的入口，也是配置它的地方；
- `src="js/require.js"`：加载脚本的正常方式，会加载 `require.js` 文件。

在 `script` 标签下添加以下代码来初始化 RequireJS：

```
<script>
    require(['config'], function() {
        //...
    })
</script>
```

当页面加载完配置文件之后， `require()` 中的代码就会运行。这个 `script` 标签是一个异步调用，这意味着当 RequireJS 通过 `src="js/require.js` 加载时，它将异步加载 `data-main` 属性中指定的配置文件。因此，该标签下的任何 JavaScript 代码都可以在 RequireJS 获取时执行配置文件。

那 AMD 中的 `require()` 和 CommonJS 中的 `require()` 有什么区别呢？

- AMD `require(`) 接受一个依赖数组和一个回调函数，CommonJS `require()` 接受一个模块 ID；
- AMD `require()` 是异步的，而 CommonJS `require()` 是同步的。

#### ② 定义 AMD 模块

下面是 AMD 中的一个基本模块定义：

```
define(['dependency1', 'dependency2'], function() {
  // 模块内容
});
```

这个模块定义清楚地显示了其包含两个依赖项和一个函数。

下面来定义一个名为`addition.js`的文件，其包含一个执行加法操作的函数，但是没有依赖项：

```
// addition.js
define(function() {
    return function(a, b) {
        alert(a + b);
    }
});
```

再来定义一个名为 `calculator.js` 的文件：

```
define(['addition'], function(addition) {
    addition(7, 9);
});
```

当 RequireJS 看到上面的代码块时，它会去寻找依赖项，并通过将它们作为参数传递给函数来自动将其注入到模块中。

RequireJS 会自动为 `addition.js` 和 `calculator.js` 文件创建一个 `<script>` 标签，并将其放在HTML `<head>` 元素中，等待它们加载，然后运行函数，这类似于 `require()` 的行为。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOGUHiclOibqeKIexVflbIqTQWEXDVDCLhtZOe8RGPdtcIvfk9BJ2pX3NiaPiaUSZNRqOFib1sdAx2YpAQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

下面来更新一下 `index.html` 文件：

```
// index.html
require(['config'], function() {
    require(['calculator']);
});
```

当浏览器加载 `index.html` 文件时，RequireJS 会尝试查找 `calculator.js` 模块，但是没有找到，所以浏览器也不会有任何反应。那该如何解决这个问题呢？我们必须提供配置文件来告诉 RequireJS 在哪里可以找到 `calculator.js`（和其他模块），因为它是引用的入口。

下面是配置文件的基本结构：

```
requirejs.config({
    baseURL: "string",
    paths: {},
    shim: {},
});
```

这里有三个属性值：

- `baseURL`：告诉 RequireJS 在哪里可以找到模块；
- `path`：这些是与 define() 一起使用的模块的名称。在路径中，可以使用文件的 CDN，这时 RequireJS 将尝试在本地可用的模块之前加载模块的 CDN 版本；
- `shim`：允许加载未编写为 AMD 模块的库，并允许以正确的顺序加载它们

我们的配置文件如下：

```
requirejs.config({
    baseURL: "js",
    paths: {
        // 这种情况下，模块位于 customScripts 文件中
        addition: "customScripts/addition",
        calculator: "customScripts/calculator",
    },
});
```

配置完成之后，重新加载浏览器，就会收到浏览器的弹窗：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOGUHiclOibqeKIexVflbIqTQpfCuqf1IiaQJ9xNV1MsUzkzFZWkjTPIXeF2N5RqZicpePzEIPr8jDbZA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这就是在 AMD 中使用 RequireJS 定义模块的方法之一。我们还可以通过指定其路径名来定义模块，该路径名是模块文件在项目目录中的位置。下面给出一个例子：

```
define("path/to/module", function() {
    // 模块内容
})
```

当然，RequireJS 并不鼓励这种方法，因为当我们将模块移动到项目中的另一个位置时，就需要手动更改模块中的路径名。

在使用 AMD 定义模块时需要注意：

- 在依赖项数组中列出的任何内容都必须与工厂函数中的分配相匹配；
- 尽量不要将异步代码与同步代码混用。当在 index.html 上编写其他 JavaScript 代码时就是这种情况。

## CMD

CMD 全称为 Common Module Definition，即通用模块定义。CMD 规范整合了 CommonJS 和 AMD 规范的特点。sea.js 是 CMD 规范的一个实现 。

CMD 定义模块也是通过一个全局函数 `define` 来实现的，但只有一个参数，该参数既可以是函数也可以是对象：

```
define(factory);
```

如果这个参数是对象，那么模块导出的就是对象；如果这个参数为函数，那么这个函数会被传入 3 个参数：

```
define(function(require, exports, module) {
  //...
});
```

这三个参数分别如下：（1）`require`：一个函数，通过调用它可以引用其他模块，也可以调用 `require.async` 函数来异步调用模块；（2）`exports`：一个对象，当定义模块的时候，需要通过向参数 `exports` 添加属性来导出模块 API；（3）`module` 是一个对象，它包含 3 个属性：

- `uri`：模块完整的 URI 路径；
- `dependencies`：模块依赖；
- `exports`：模块需要被导出的 API，作用同第二个参数 `exports`。

下面来看一个例子，定义一个 `increment` 模块，引用 `math` 模块的 `add` 函数，经过封装后导出成 `increment` 函数：

```
define(function(require, exports, module) {
  var add = require('math').add;
  exports.increment = function(val) {
    return add(val, 1);
  };
  module.id = "increment";
});
```

CMD 最大的特点就是懒加载，不需要在定义模块的时候声明依赖，可以在模块执行时动态加载依赖。除此之外，CMD 同时支持**同步加载模块**和**异步加载模块**。

**AMD 和 CMD 的两个主要区别如下：**

- AMD 需要异步加载模块，而 CMD 在加载模块时，可以同步加载（`require`），也可以异步加载（`require.async`）。
- CMD 遵循依赖就近原则，AMD 遵循依赖前置原则。也就是说，在 AMD 中，需要把模块所需要的依赖都提前在依赖数组中声明。而在 CMD 中，只需要在具体代码逻辑内，使用依赖前，把依赖的模块 `require` 进来。

## UMD

UMD 全程为 Universal Module Definition，即**统一模块定义**。其实 UMD 并不是一个模块管理规范，而是带有前后端同构思想的模块封装工具。

UMD 是一组同时支持 AMD 和 CommonJS 的模式，它旨在使代码无论执行代码的环境如何都能正常工作，通过 UMD 可以在合适的环境选择对应的模块规范。比如在 Node.js 环境中采用 CommonJS 模块管理，在浏览器环境且支持 AMD 的情况下采用 AMD 模块，否则导出为全局函数。

一个UMD模块由两部分组成：

- **立即调用函数表达式 (IIFE)**：它会检查使用模块的环境。其有两个参数：`root` 和 `factory`。`root` 是对全局范围的 this 引用，而 `factory` 是定义模块的函数。
- **匿名函数：** 创建模块，此匿名函数被传递任意数量的参数以指定模块的依赖关系。

UMD 的代码实现如下：

```
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports,
    module.exports = factory();
  } else {
    root.returnExports = factory();
  }
}(this, function () {
  // 模块内容定义
  return {};
}));
```

它的执行过程如下：

1. 先判断是否支持 Node.js 模块格式（exports 是否存在），存在则使用 Node.js 模块格式；
2. 再判断是否支持 AMD（define 是否存在），存在则使用 AMD 方式加载模块；
3. 若两个都不存在，则将模块公开到全局（Window 或 Global）。

**UMD的特点如下：**① UMD 的优点：

- 小而简洁；
- 适用于服务器端和客户端。

② UMD 的缺点：

- 不容易正确配置。

## ES 模块

### （1）概念

通过上面的例子，你可能会发现，使用 UMD、AMD、CMD 的代码会变得难以编写和理解。于是在 2015 年，负责 ECMAScript 规范的 TC39 委员会将模块添加为 JavaScript 的内置功能，这些模块称为 ECMAScript模块，简称 ES 模块。

模块和经典 JavaScript 脚本略有不同：

- 模块默认启用**严格模式，**比如分配给未声明的变量会报错：

```
<script type="module">
  a = 5; 
</script>
```

- 模块有一个词法顶级作用域。这意味着，例如，运行 var foo = 42; 在模块内不会创建名为 foo 的全局变量，可通过浏览器中的 window.foo 访问，尽管在经典JavaScript脚本中会出现这种情况；

```
<script type="module">
  let person = "Alok";
</script>

<script type="module">
   alert(person);{/* Error: person is not defined */}
</script>
```

- 模块中的 this 并不引用全局 this，而是 undefined。（如果需要访问全局 this，可以使用 globalThis）；

```
<script>
  alert(this); {/* 全局对象 */}
</script>

<script type="module">
  alert(this); {/* undefined */}
</script>
```

- 新的静态导入和导出语法仅在模块中可用，并不适用于经典脚本。
- 顶层 await 在模块中可用，但在经典 JavaScript 脚本中不可用；
- await 不能在模块中的任何地方用作变量名，经典脚本中的变量可以在异步函数之外命名为 await；
- JavaScript 会提升 import 语句。因此，可以在模块中的任何位置定义它们。

CommonJS 和 AMD 都是在运行时确定依赖关系，即运行时加载，CommonJS 加载的是拷贝。而 ES 模块是在编译时就确定依赖关系，所有加载的其实都是引用，这样做的好处是可以执行静态分析和类型检查。

### （2）语法

#### ① 导出

当导出模块代码时，需要在其前面添加 export 关键词。导出内容可以是变量、函数或类。任何未导出的代码都是模块私有的，无法在该模块之被外访问。ES 模块支持两种类型的导出：

- **命名导出：**

```
export const first = 'JavaScript';
export function func() {
    return true;
}
```

当然，我们也可以先定义需要导出的变量/函数，最后统一导出这些变量/函数：

```
const first = 'JavaScript';
const second = 'TypeScript';
function func() {
    return true;
}
export {first, second, func};
```

- **默认导出：**

```
function func() {
    return true;
}

export default func;
```

当然，也可以直接默认导出：

```
export default function func() {
    return true;
}
```

默认导出可以省略变量/函数/类名，在导入时可以为其指定任意名称：

```
// 导出
export default function () {
  console.log('foo');
}
// 导入
import customName from './module';
```

**注意：** 导入默认模块时不需要大括号，导出默认的变量或方法可以有名字，但是对外是无效的。`export default` 在一个模块文件中只能使用一次。

可以使用 as 关键字来重命名需要暴露出的变量或方法，经过重命名后同一变量可以多次暴露出去：

```
const first = 'test';
export {first as second};
```

#### ② 导入

使用**命名导出**的模块，可以通过以下方式来导入：

```
import {first, second, func} from './module';
```

使用**默认导出**的模块，可以通过以下方式来引入，导入名称可以自定义，无论导出的名称是什么：

```
import customName from './module.js';
```

导入模块位置可以是相对路径也可以是绝对路径，`.js`扩展名是可以省略的，如果不带路径而只是模块名，则需要通过配置文件告诉引擎查找的位置：

```
import {firstName, lastName} from './module';
```

可以使用 as 关键字来将导入的变量/函数重命名：

```
import { fn as fn1 } from './profile';
```

在 ES 模块中，默认导入和命名导入是可以同时使用的，比如在 React 组件中：

```
import React, {usestate, useEffect} from 'react';

const Comp = () => {
 return <React.Fragment>...</React.Fragment> 
}

export default Comp;
```

可以使用 as 关键字来加载整个模块，用于从另一个模块中导入所有命名导出，会忽略默认导出：

```
import * as circle from './circle';
console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

#### ③ 动态导入

上面我们介绍的都是静态导入，使用静态 import 时，整个模块需要先下载并执行，然后主代码才能执行。有时我们不想预先加载模块，而是按需加载，仅在需要时才加载。这可以提高初始加载时的性能，动态 import 使这成为可能：

```
<script type="module">
  (async () => {
    const moduleSpecifier = './lib.mjs';
    const {repeat, shout} = await import(moduleSpecifier);
    repeat('hello');
    // → 'hello hello'
    shout('Dynamic import in action');
    // → 'DYNAMIC IMPORT IN ACTION!'
  })();
</script>
```

与静态导入不同，动态导入可以在常规脚本中使用。

#### ④ 其他用法

可以使用以下方式来先导入后导出模块内容：

```
export { foo, bar } from './module';
```

上面的代码就等同于：

```
import { foo, bar } from './module';
export { foo, boo};
```

另一个与模块相关的新功能是`import.meta`，它是一个给 JavaScript 模块暴露特定上下文的元数据属性的对象。它包含了这个模块的信息，比如说这个模块的 URL。

默认情况下，图像是相对于 HTML 文档中的当前 URL 加载的。`import.meta.url`可以改为加载相对于当前模块的图像：

```
function loadThumbnail(relativePath) {
  const url = new URL(relativePath, import.meta.url);
  const image = new Image();
  image.src = url;
  return image;
}

const thumbnail = loadThumbnail('../img/thumbnail.png');
container.append(thumbnail);
```

### （3）在浏览器使用

目前主流浏览器都支持 ES 模块：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOGUHiclOibqeKIexVflbIqTQJia3NLDemvngBrSiaVB9ylGaQYDhZ387ABqJKOueia7PnicVianz5C4uSdw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

如果想在浏览器中使用原生 ES 模块方案，只需要在 script 标签上添加 `type="module"` 属性。通过该属性，浏览器知道这个文件是以模块化的方式运行的。而对于不支持的浏览器，需要通过 `nomodule` 属性来指定某脚本为 fallback 方案：

```
<script type="module">
  import module1 from './module1'
</script>
<script nomodule src="fallback.js"></script>
```

支持 `type="module"` 的浏览器会忽略带有 `nomodule` 属性的脚本。使用 `type="module"` 的另一个作用就是进行 ES Next 兼容性的嗅探。因为支持 ES 模块化的浏览器，都支持 ES Promise 等特性。

由于默认情况下模块是延迟的，因此可能还希望以延迟方式加载 nomodule 脚本：

```
<script nomodule defer src="fallback.js"></script>
```

### （4）在 Node.js 使用

上面提到，Node.js 使用的是 CommonJS 模块规范，它也是支持 ES 模块的。在 Node.js 13 之前，ES 模块是一项实验性技术，因此，可以通过使用 `.mjs` 扩展名保存模块并通过标志访问它来使用模块。

从 Node.js 13 开始，可以通过以下两种方式使用模块:

- 使用 `.mjs` 扩展名保存模块；
- 在最近的文件夹中创建一个 `type="module"` 的 `package.json` 文件。

那如何在小于等于 12 版本的 Node.js 中使用 ES 模块呢？可以在执行脚本启动时加上 `--experimental-modules`，不过这一用法要求相应的文件后缀名必须为 `.mjs`：

```
node --experimental-modules module1.mjs
import module1 from './module1.mjs'
module1
```

**参考：**

> - https://v8.dev/features/modules
> - https://blog.logrocket.com/javascript-reference-guide-js-modules/



# JS 条件语句优化技巧

> 大家好，我是 CUGGZ。在日常的开发中，我们经常会编写一些条件语句，过多的 `if...else`会导致代码难以理解和维护，今天来分享几个优化条件语句的小技巧！

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212231508631.png" alt="image-20221223150843430" style="zoom:67%;" />

## 1. Array.includes

来看下面的代码：

```js
function test(animal) {
  if (animal == 'lion' || animal == 'dog') {
    return animal;
  }
  return '';
}

test('dog');
```

在`test`方法中包含一个 `if` 语句，用来判断传入的参数`animal`是不是`lion`或者`dog`。这么写从语法上是没问题的，但是如果 `if` 的判断条件中不只有两个动物，而是有四只动物。如果继续使用 `||` 与运算符来写的话，代码就会很难维护并且看起来非常不优雅：

```js
if (animal == 'lion' || animal == 'dog' || animal == 'cow' || animal == 'cat') {
    return animal;
}
```

对于这种需要对同一个变量进行多次判断的条件语句，可以使用数组的`includes()`方法来优化，该方法可以用于确定数组中是否存在指定元素，如果存在指定的元素，就会返回 `true`，如果不存在就会返回 `false`。使用 `includes()` 来修改写上面的代码：

```js
if (['dog', 'cat', 'cow', 'lion'].includes(animal)) {
    return animal;
}
```

这样代码看起来就简洁了很多，并且如果想继续增加其他的动物，只需在数组中继续增加元素即可。

## 2. Array.every

来看下面的代码：

```js
const cars = [
    { name: 'car1', color: 'red' },
    { name: 'car2', color: 'blue' },
    { name: 'car3', color: 'purple' }
];
  
function test(cars) {
    let isAllblue = true;
  
    for (let c of cars) {
        if (!isAllblue) break;
        isAllblue = (c.color == 'blue');
    }
  
    return isAllblue;
}

test(cars);
```

JavaScript 中的数组提供了`every()`方法，该方法用于检查数组中所有元素是否满足给定条件。当每个数组元素都满足给定条件时会返回 `true`，否则会返回`false`。可以使用该方法来优化上面的代码：

```js
const cars = [
    { name: 'car1', color: 'red' },
    { name: 'car2', color: 'blue' },
    { name: 'car3', color: 'purple' }
];
  
function test(cars) {
   return cars.every(c => c.color == 'blue');
}

test(cars);
```

## 3. 尽早 return

在 JavaScript 中，尽早 `return` 是一种将函数体减少`else`语句的简单方法。来看下面的代码：

```js
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  if (fruit) {
    if (redFruits.includes(fruit)) {
      console.log('red');

      if (quantity > 10) {
        console.log('big quantity');
      }
    }
  } else {
    throw new Error('No fruit!');
  }
}

test(null); // error: No fruits
test('apple'); // red
test('apple', 20); // red, big quantity
```

来使用这种模式来优化上面的代码，可以在无效条件时尽早返回：

```js
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  if (!fruit) throw new Error('No fruit!');

  if (redFruits.includes(fruit)) {
    console.log('red');

    if (quantity > 10) {
      console.log('big quantity');
    }
  }
}
```

可以进一步优化，如果 `redFruits` 中不包含`fruit`，就提前返回：

```js
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  if (!fruit) throw new Error('No fruit!');
  if (!redFruits.includes(fruit)) return;

  console.log('red');

  if (quantity > 10) {
    console.log('big quantity');
  }
}
```

可以看到，使用这种模式可以消除不必要的`else`语句，使得函数更加清晰和简洁。

## 4. 三元运算符

对于上面例子中的函数，可以使用 JavaScript 的三元运算符来重构：

```js
function IsRed(someObject) {
    return typeof someObject !== 'object' || someObject.color !== 'Red' ? false : true;
}
```

对于上面的三元表达式，还可以进行简化：

```js
function IsRed(someObject) {
    return !(typeof someObject !== 'object' || someObject.color !== 'Red');
}
```

对于这种`if...else`块中都分别只有一个表达式的情况，就可以使用三元表达式来简化`if...else`语句。

## 5. switch...case

来看下面的代码：

```js
function printCars(color) {
    if (color === 'red') {
      return ['Rcar1', 'Rcar2'];
    }
    else if (color === 'blue') {
      return ['Bcar1', 'Bcar2'];
    }
    else if (color === 'purple') {
      return ['Pcar1', 'Pcar2'];
    }
    return [];
}
```

对于这种`if`的判断条件中都是针对一个变量进行判断的情况，可以使用`switch...case`来改写，这样代码看起来更有调理：

```js
function printCars(color) {
    switch (color) {
        case 'red':
            return ['Rcar1', 'Rcar2'];
        case 'blue':
            return ['Bcar1', 'Bcar2'];
        case 'purple':
            return ['Pcar1', 'Pcar2'];
        default:
            return [];
    }
}
```

## 6. Map/Object

对于上面的代码，可以使用对象来继续优化：

```js
const carColor = {
    red: ['Rcar1', 'Rcar2'],
    blue: ['Bcar1', 'Bcar2'],
    purple: ['Pcar1', 'Pcar2']
};
  
function printcars(color) {
    return carColor[color] || [];
}

console.log(printcars());       // []
console.log(printcars('red'));  // ['Rcar1'，'Rcar2']
console.log(printcars('blue')); // ['Bcar1'，'Bcar2']
```

也可以使用 Map 来实现相同的结果：

```js
const carColor = new Map()
    .set('red', ['Rcar1', 'Rcar2'])
    .set('blue', ['Bcar1', 'Bcar2'])
    .set('purple', ['Pcar1', 'Pcar2']);
  
function printcars(color) {
    return carColor.get(color) || [];
}

console.log(printcars());       // []
console.log(printcars('red'));  // ['Rcar1'，'Rcar2']
console.log(printcars('blue')); // ['Bcar1'，'Bcar2']
```

## 7. 默认函数参数和解构

来看下面的代码：

```js
function check(flower, quantity) {
    if (!flower) return;
  
    const num = quantity || 1;
  
    return `${num}朵${flower}`;
}
  
check('玫瑰');    // 1朵玫瑰
check('茉莉', 2); // 2朵茉莉
```

可以使用函数默认参数来简化上面的代码：

```js
function check(flower, quantity = 1) {
    if (!flower) return;
    return `${quantity}朵${flower}`;
}

check('玫瑰');    // 1朵玫瑰
check('茉莉', 2); // 2朵茉莉
```

那如果`flower`参数是一个对象怎么办呢？来看下面的代码：

```js
function check(flower) {
    if (flower && flower.name) {
        console.log(flower.name);
    } else {
        console.log('unknown');
    }
}

check(undefined);  // unknown
check({});  // unknown
check({ name: '玫瑰', color: 'red' });  // 玫瑰
```

可以从对象中解构需要的属性：

```js
function check({name} = {}) {
    console.log (name || 'unknown');
}
  
check(undefined);  // unknown
check({});  // unknown
check({ name: '玫瑰', color: 'red' });  // 玫瑰
```

在函数中需要`flower`对象中的`name`属性，可以使用`{name}`来解构该参数。除此之外，还可以用`{}`来作为参数的默认值，这样在`check(undefined)`时，也就是参数不是对象时，参数默认为一个空对象，否则就会报错，因为`undefined`中没有`name`属性。

## 8. 逻辑与运算符

来看下面的代码：

```js
if(a < 0 && b > 100 && c === 10) {
  fn()
}
```

对于逻辑与运算符，其左侧的条件如果为`false`，就会直接发生短路，不再继续往后执行；如果左侧的条件为`true`，就会返回其右侧的计算结果。所以，对于这种 `if` 中只有一行表达式的情况，可以使用逻辑与运算符来简化，其中左侧为判断条件，右侧是要执行的逻辑：

```js
(a < 0 && b > 100 && c === 10) && fn();
```



# 24个 JavaScript 循环遍历方法

[24个 JavaScript 循环遍历方法](https://mp.weixin.qq.com/s?__biz=MzU2MTIyNDUwMA==&mid=2247485965&idx=1&sn=c0505d82dee3368a831a96484ced724f&chksm=fc7d4456cb0acd404b48bde63e9665c49541b0477478a0ea6c2551ee679a9cd5b7e044351fb2&mpshare=1&scene=23&srcid=1223RQnu56GP8JfFFyq1M6nf&sharer_sharetime=1671799740872&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

今天我们来看点基础知识，看看JavaScript中的那些循环遍历方法：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212241233555.png" alt="image-20221224123314414" style="zoom:67%;" />

## 数组遍历方法

### 1. forEach()

`forEach` 方法用于调用数组的每个元素，并将元素传递给回调函数。数组中的每个值都会调用回调函数。其语法如下：

```js
array.forEach(function(currentValue, index, arr), thisValue)
```

该方法的第一个参数为回调函数，是必传的，它有三个参数：

- currentValue：必须。当前元素
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

### 3. for of 数组对象

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

// 输出结果：true

let arr = [1, 2, 3, 4, 5]
arr.every(item => item > 0) 

// 输出结果：true
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

```js
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

// 输出结果：3

let arr = [1, 2, 3, 4, 5]
arr.findIndex(item => item > 2) 

// 输出结果：2
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
// 输出结果：Banana Orange Apple Mango

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

```
键名：a
键值： 1
键名：b
键值： 2
键名：c
键值： 3
```

注意：

- for in 方法不仅会遍历当前的对象所有的可枚举属性，还会遍历其原型链上的属性。

### 2. Object.keys()、Object.values()、Object.entries()

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

for循环是应该是最常见的循环方式了，它由三个表达式组成，分别是声明循环变量、判断循环条件、更新循环变量。这三个表达式用分号分隔。可以使用临时变量将数组的长度缓存起来，避免重复获取数组长度，当数组较大时优化效果会比较明显。

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

输出结果：![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNW3KfeTyp3HQpDib4VqlG1Mwm81l9ggc1E6pNE4ZDIU4TCZCVib2e9DGLpk6MqP9ibIXlrZHLdx8daA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

# JS 解构赋值实用指南

大家好，我是CUGGZ，最近更新的比较慢，主要我很懒不想去转发文章，后面准备加紧更新啦，不要取关我呀![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNZqloBR3N6D7Nj31LZNicvvLwOcAQIVp2iazOOGlGPNODwheb0cB0b5cBlPUS6MKjZdd4cj7R5icMwg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)！今天来看看ES6 解构赋值的实用技巧~

## 基本概念

为什么需要解构呢，先来看一个例子：

```js
const student = {
    name: 'ZhangSan',
    age: 18,
    scores: {
        math: 19,
        english: 85,
        chinese: 100
    }
};

function displayInfo(student) {
    console.log('name:', student.name);
    console.log('math:', student.scores.math);
    console.log('english:', student.scores.english);
    console.log('chinese:', student.scores.chinese);
}

displayInfo(student);
```

这样写也能实现预期效果，但是代码看起来比较冗余。并且，如果对象内部嵌套较深时，那么对象的访问链就会变得很长。虽然这并不是什么大问题，但是使用解构赋值会让代码变得更简单和易读。

下面就来看看什么是解构赋值。MDN 中对解构赋值的描述：

> 解构赋值语法是一种 Javascript 表达式。通过解构赋值, 可以将属性值从对象/数组中取出,赋值给其他变量。

实际上，结构赋值就是将复杂的结构分解为简单的部分。解构赋值语法可以用于变量声明或者变量赋值。除此之外，还可以使用嵌套的解构赋值语法来处理嵌套结构。

比如，对上面例子中的对象进行解构：

```js
function displayInfo(student) {
  const { name, scores: {math, english, chinese} } = student; 
    console.log('name:', name);
    console.log('math:', math);
    console.log('english:', english);
    console.log('chinese:', chinese);
}
```

这样看起来是不是简洁多了。

## 解构分类

根据MDN对解构赋值的定义，我们可以将解构赋值分为两大类：

- 对象解构
- 数组解构

下面就分别来看看这两种解构赋值。

### 1. 对象的解构赋值

对象解构又称为对象属性分配模式，它允许我们将对象的属性值分配给相应的变量。它有两种写法：

```js
let obj =  {x: 1, y: 2, z: 3};

let {x: a, y: b, z: c} = obj;
console.log(a, b, c)

let {x, y, z} = obj;
console.log(x, y, z)
```

- 第一种（第3行）是对象解构的完整形式，对象的每个属性都将被分配一个变量，其中冒号前面的是源对象中的属性，冒号后面的是要赋值属性;
- 第二种（第5行）是对象解构的简写形式，对象的属性与要分配的属性一致时可以使用这种形式。

如果需要给已有变量赋值，就需要额外注意了：

```js
let obj =  {x: 1, y: 2, z: 3};

let x = 0, y = 0, z = 0;

({x, y, z} = obj)
console.log(x, y, z)
```

这里需要注意，需要将赋值表达式使用括号括起来，如果省略，解构对象将被视为一个块语句，而块语句是不能放在赋值表达式左侧的。

当使用解构赋值时，可以给变量传递一个默认值：

```js
const person = {
    name: 'ZhangSan',
    height: 180
};

const { name, height, age = 25 } = person;

console.log(name, height, age);
```

这里我们给age分配了一个默认值，当对源对象上不存在age属性时，age就会被赋上默认值25，而不是undefined。

如果分配的对象属性为undefined，那么就会使用默认值：

```js
const {x = 2} = {x: undefined};
console.log(x);    // 2
```

### 2. 数组的解构赋值

在使用数组解构时，实际上会使用迭代器将所需要的值与结构源分开。因此，我们可以对**可迭代值**使用数组结构，包括字符串、数组、集合、函数映射、DOM元素。我们还可以将解构赋值与扩展运算符结合使用。

#### （1）字符串

```js
let message = 'Hello';
let [a, b] = message;
let [x, y, ...z] = message;

console.log(a, b);        // H e
console.log(x, y, z);     // H e ['l', 'l', 'o']
```

#### （2）数组

```js
let numbers = [1, 2, 3];
let [x, y, z] = numbers;

console.log(x, y, z);    // 1 2 3
```

#### （3）集合

```js
let set = new Set().add('foo').add('bar');
let [a, b] = set;

console.log(a, b);      // foo bar
```

#### （4）Map

```js
let map = new Map().set('a', 1).set('b', 2);
let [x, y] = map;

console.log(x, y);    // ["a", 1] ["b", 2]
```

在数组的解构中，存储变量的数组中的每个变量都会映射到解构数组上相同索引处的相应项。

如果解构中某一项不需要，可以使用逗号操作符进行分隔：

```js
const rgb = [200, 255, 100];

const [,, blue] = rgb;

console.log(blue);   // 100
```

与对象解构一样，可以使用数组解构为局部变量设置默认值：

```js
const rgb = [200];

const [red = 255, green, blue = 255] = rgb;

console.log(`R: ${red}, G: ${green}, B: ${blue}`);
```

如果变量已经存在，就可以这么写：

```js
let red = 100, green = 200, blue = 50;

const rgb = [200, 255, 100];

[red, green] = rgb;

console.log(`R: ${red}, G: ${green}, B: ${blue}`);
```

与对象解构不同的是，这里不需要括号将数组括起来。

如果给变量分配的值是undefined，那么就会使用默认值：

```js
const [x = 1] = [undefined];
console.log(x);    // 1
```

这里的默认值并不一定是一个固定值，它可以是一个计算属性：

```js
function foo() {
    return 1;
}

let obj1 = {x: 2};
let obj2 = {x: undefined};

let {x=foo()} = obj1;
console.log(x);     // 2

let {x=foo()} = obj2;
console.log(x);     // 1
```

如果我们想将数组中的一些元素分配给变量，而将数组中的其余项分配给特定的变量就可以这样做：

```js
let [greeting, ...intro] = ["Hello", "I" , "am", "CUGGZ"];

console.log(greeting);  // "Hello"
console.log(intro);     // ["I", "am", "CUGGZ"]
```

## 嵌套解构

上面我们说的解构的只是普通的数组和对象。实际上，解构赋值可以用于嵌套数组和嵌套对象。比如，文章最开始的例子中，就是解构的嵌套对象：

```js
const student = {
    name: 'ZhangSan',
    age: 18,
    scores: {
        math: 19,
        english: 85,
        chinese: 100
    }
};

const { name, scores: {math, english, chinese} } = student; 
```

再来看一个嵌套数组解构的例子：

```js
let numbers = [1, [2, 3, 4], 5];
let [a, [b, c, d], e] = numbers;
console.log(a, b, c, d, e); // 1 2 3 4 5
```

## 使用技巧

### 1. 函数解构

#### （1）解构函数参数

可以对函数参数使用解构赋值：

```js
function foo([a, b]) {
    console.log(a + b);
}
foo([1, 2]);       // 3


function bar({x, y}) {
    console.log(x, y);
}
foo({x: 1, y: 2}); // 1 2
```

可以对函数返回值使用解构赋值：

```js
function getStudentInfo() {
    return {
        name: 'ZhangSan',
        age: 18,
        scores: {
            math: 19,
            english: 85,
            chinese: 100
        }
    };
}
const { name, scores: {math, english, chinese} } = getStudentInfo();
console.log(name, math, english, chinese);
```

### 2. 循环中的解构

当我们需要循环中的对象键值时，也可以使用对象解构：

```js
const students = [
    {
        'name': 'ZhangSan',
        'grade': 80
    },
    {
        'name': 'LiSi',
        'grade': 75
    },
    {
        'name': 'WangWu',
        'grade': 95
    }
];

for(let {name, grade} of students){
    console.log(name, grade);
}
```

### 3. 动态属性解构

很多时候我们不知道对象属性的key，只有运行时才知道。比如有一个方法getStudentInfo，它以一个key为参数，并返回相应的属性值：

```js
getStudentInfo('name'); 
getStudentInfo('age'); 
```

这里传递给getStudentInfo方法的参数是动态的，因此可以这样写：

```js
const getStudentInfo = key => {
  const {[key]: value} = student;
  return value;
}
```

需要注意，包裹key的方括号不能少，否则会出现undefined值。

### 4. 交换变量

数组结构一个很实用的功能就是实现交换局部变量。通常，我们会借助临时变量来实现变量的交换：

```js
let width = 300;
let height = 400;

let temp = width;
width = height;
height = temp;

console.log(width, height)
```

如果使用数组的解构赋值，就会变得很简单：

```js
let width = 300;
let height = 400;

[width, height] = [height, width];

console.log(width, height)
```

### 5. 数组拷贝

可以使用解构赋值和rest运算符来实现数组的拷贝：

```js
const rgb = [200, 255, 100];

const [...newRgb] = rgb;
// 等同于 const newRgb = [...rgb]

console.log(newRgb)
```



# Map对象和普通对象区别

在 JavaScript 中，普通对象和 ES6 的新对象 Map 都可以存储键值对，但是，它们之间有什么区别呢？那么普通对象应该被 Map 对象替换吗？提前说出结论

> 不，如果我们想在 JSON 和原始数据之间转换或包含特定的业务逻辑，那么我们应该使用普通对象。因为当我们只想存储键值对和循环操作或不断添加和删除属性时，使用 Map 对象是更好的选择。Map对象虽然也是继承自底层的Object.prototype，但它为我们提供了很多实用的方法来减轻我们的认知负担，比普通对象更高级。

## 初始化与使用

普通对象可以直接使用字面量进行初始化，而 Map 需要 Map() 构造函数进行初始化，如果想要有初始值，则需要传递一个数组或其他元素为键值对的可迭代对象。这些键值对中的每一个都将被添加到一个新的 Map 中。

```js
const obj = {
  name: 1,
  age: 2,
};
const map = new Map([
  ['name', 1],
  ['age', 2],
]);
```

与普通对象相比，Map 作为哈希表提供了许多有用的功能。比如判断一个key是否在hash表中，在map中可以使用has方法轻松判断，但是在普通对象中可能会增加复杂度。

另外，set方法可以为Map设置key值，get方法可以获取value，size属性可以返回当前Map中key/value对的数量，而plain对象需要手动计算使用 自己的方法等。详情见MDN。

## 密钥类型

> 普通对象只接受字符串和符号作为键值，其他类型将被强制转换为字符串类型，而 Map 可以接受任何类型的键值（包括函数、对象或任何原语）。

```js
const obj = {};
const map = new Map();
const key = function () {};
obj[key] = 1;
map.set(key, 1);
// { 'function () {}': 1 }
console.log('obj: ', obj);
// Map(1) { [Function: key] => 1 }
console.log('map: ', map);
```

## Accidental keys

普通对象从原型继承了许多属性键，例如构造函数等。因此，自己的密钥很可能与原型上的密钥发生冲突。但是 Map 默认不包含任何键，它只包含那些显式放入的。

```js
const obj = {};
const map = new Map();
console.log(obj.constructor); // ƒ Object() { [native code] }
console.log(map.get('constructor')); // undefined
```

## Key order

虽然现在对普通对象的键进行了排序，但情况并非总是如此，而且排序很复杂。例如，如果对象中有键需要转换为字符串，则不保留对象键的原始顺序。虽然 Map 以简单的方式排序，但它始终与我们插入的顺序相同。

```js
const obj = {
  name: 1,
  age: 2,
  3: 4,
};

const map = new Map([
  ['name', 1],
  ['age', 2],
  [3, 4],
]);

// The original order is not preserved.
// {3: 4, name: 1, age: 2}
console.log('obj: ', obj);
// Map(3) { 'name' => 1, 'age' => 2, 3 => 4 }
console.log('map: ', map);
```

## 迭代

我们可以使用 for...of 语句或 Map.prototype.forEach 直接迭代 Map 的属性，而普通对象不能直接迭代。

```js
const obj = {
  name: 1,
  age: 2,
};
const map = new Map([
  ['name', 1],
  ['age', 2],
]);
```

```js
for (const [key, value] of map) {
  console.log(`${key}: `, value); // name: 1, age: 2
}

map.forEach((value, key) => {
  console.log(`${key}: `, value); // name: 1, age: 2
});

Object.keys(obj).forEach((key) => {
  console.log(`${key}: `, obj[key]); // name: 1, age: 2
});
```

## 序列化和解析

普通对象支持 JSON 序列化，但 Map 默认无法获取正确数据。

```js
const obj = {
  name: 1,
  age: 2,
};
const map = new Map([
  ['name', 1],
  ['age', 2],
]);
console.log(JSON.stringify(obj)); // "{"name":1,"age":2}"
console.log(JSON.stringify(map)); // "{}"
```

## 性能

> Map 对象在涉及频繁添加和删除键值对的场景中表现更好，而普通对象没有优化。

# 日常开发代码片段

## 1、智能数据过滤

使用 JavaScript 内置的 Filter 方法过滤您的数据。当有大量数组形式的数据并希望从中过滤一些元素时，这会派上用场

```js
// Data Filteration
var data = ["Football", "Soccer", "Cricket", "Basketball", "Hockey"]
var filtered_data = data.filter(data => data.length < 8)
console.log(filtered_data)  // ["Soccer", "Cricket", "Hockey"]
```

## 2、 循环键和值

另一个有用的代码片段，用于迭代数据的键和值。我们将使用 forEach 方法来完成这个任务。

```js
// looping throught objectslet 
data = {JavaScript: 1, Dart: 2, Java: 3};Object.keys(data)
    .forEach((key, value) => {  console.log(key, value); 
});
// Output
// JavaScript 0
// Dart 1
// Java 2
```

## 3、解构赋值

您可以使用解构方法解压缩数组值并将它们分配给其他变量。 查看下面的示例代码。

```js
// Destructive Assignment
let data = ["Haider", "22", "50000", "Web Developer"]
let [name, age, salary, profession] = data
console.log(name, age, salary, profession) 
// Haider 22 50000 Web Developer
```

## 4、分割数组

这是另一个有用的片段代码，它将在不使用任何循环的情况下对您的数组进行切片。 slice 的语法是 slice(startIndex, endIndex)。

```js
// Slicing An Array
let array = [10, 12, 13, 14, 15, 16]
console.log(array.slice(0, 3)) 
// [10, 12, 13]
console.log(array.slice(0, 2)) 
// [10, 12]
```

## 5、在数组中搜索对象

您可以使用 JavaScript find() 方法在 Array 中搜索对象。 下面是一个片段代码示例。

```js
// Search Object in Array
let data = [
  {name:"haider", Salary:60000},
  {name:"John", Salary:50000},
  {name:"Peter", Salary:20000},
]
let emp = data.find(data => data.name === "Peter")
console.log(emp) 
// Output 
{
  name:"Peter",
  Salary:20000
}
```

## 6、反转字符串

这段代码将向您展示如何在不使用循环的情况下反转字符串。

```js
// String Reverse
var reverse = (data) => {return data.split("").reverse().join(""); }
console.log(reverse("CoderBoy")) // yoBredoC
console.log(reverse("Medium")) // muideM
```

## 7、连接列表

现在您不需要使用函数和循环将多个列表合并为一个。 您可以使用 JavaScript内置的 Concat() 方法。 

```js
let arr1 = [10, 20, 30]
let arr2 = [40, 50]
var arr = arr1.concat(arr2)console.log(arr) 
// [10, 20, 30, 40, 50]
```

## 8、捕获右键单击

这个简单的片段代码将捕获 Web 浏览器中鼠标的右键单击。

```js
// Capture Right Click
window.oncontextmenu = () => {console.log("Right Click is Pressed!")}
```

## 9、内置排序

排序是每种编程语言的常见问题。 在 JavaScript 中，您可以使用 sort() 方法对任何元素列表进行排序。

```js
// Built in Sorting
var num = [9, 8, 4, 2, 8, 0, 3, 8]
num.sort()
console.log(num) //[0, 2, 3, 4, 8, 8, 9]
```

## 10、处理JS中的错误

在编程中，错误总是令人头疼的。 要处理 JavaScript 中的错误，您可以使用 try/catch 语句。 查看以下语法：

```js
// Error Handling
try {
  // Code Block to try
}
catch(err) {
  // Code Block to handle errors
}
finally {
  // Code Block to be executed regardless of the try and catch results
}
```

## 11、查找数组元素的索引

现在你不需要遍历整个 Array 来找到任何元素的索引。 查看下面的代码片段，让您的生活更轻松。

```js
// Index of Element
var num = [9, 8, 4, 2, 8, 0, 3, 8]
console.log(num.indexOf(9)) 
// 0
console.log(num.indexOf(3)) 
// 6
console.log(num.indexOf(8)) 
// 1
```

## 12、检查字符串是否为大写

这是一个简单的片段，可帮助您检查字符串是大写还是小写。

```js
// Check for UpperCase
const CheckUpper = string => string === string.toUpperCase();
console.log(CheckUpper("Hello")) 
// false
console.log(CheckUpper("LEARN")) 
// true
```

# 稀疏数组与密集数组

一般而言，javaScript中的数组是稀疏的，也就是说数组中的元素之间可以有空隙，因为一个数组其实就是一个键值映射。这篇本文解释了如何创建稀疏数组和不稀疏的数组，以及稀疏数组和密集数组之间的区别。

例如以下的js代码创建的就是一个密集数组:

```js
var data = [3,1,6,9,2];
```

什么是稀疏数组呢？与密集数组相反。JavaScript并不强制要求数组元素是紧密相连的，即同意间隙的存在。例如以下的js代码是合法的：

```js
var sparse = new Array();
sparse[0] = 0;
sparse[3] = 3;
alert(sparse[0]);//输出0
alert(sparse[1]);//输出undefined
```

## 创建稀疏数组

例如以下代码创建了一个固定长度的稀疏数组

```js
var a = new Array(3); 
a[2] = 1;
alert(a[0]);//undefined
alert(a[2]);//1
```

说白了js中建立稀疏数组非常easy，仅仅要你有益让数组元素之间存在间隙就可以。如：

```js
var arr = []; 
arr[0] = 0;
arr[200] = 200;
```

## 创建密集数组

什么是密集数组呢？在java和C语言中，数组是一片连续的存储空间，有着固定的长度。

增加数组事实上位置是address。长度为n。那么占用的存储空间是address[0],address[1],address[2].......address[n-1]。即数组元素之间是紧密相连的，不存在空隙。

能够看到js中的数组一般都是稀疏的，一般来说稀疏数组的遍历比较麻烦。

```js
var dense = Array.apply(null, Array(3));
```

这行代码等同于var  dense = Array(undefined, undefined, undefined) ;呵呵是不是认为非常奇怪，这样的方式跟稀疏数组没有什么区别。看代码：

```js
//稀疏数组
var array = new Array(3); 
array[2] = "name";
for(var a in array) {
    console.log("index=" + a + ",value=" + array[a]);
}
// 密集数组
var dense = Array.apply(null, Array(3)); 
dense[2] = "name";
for(var a in dense) {
  console.log("index=" + a + ",value=" + dense[a]);
}
```

能够看到确实是有区别的：稀疏数组仅仅遍历了一次(由于仅仅有一个元素)，密集数组遍历了3次。

## 稀疏数组与密集数组区别

> **稀疏数组：**索引不连续，数组长度大于元素个数的数组, 可以简单理解为有empty的数组；
> **密集数组：**索引连续, 数组长度等于元素个数的数组；

稀疏数组在大多数遍历数组的方法中，遇到「empty」元素的时候，callback 函数是不会执行的，如：map, forEach, filter 等, 而且这种现象在 for...in 语句中，同样适用。

```js
const arr = [3,,4,,5] // 稀疏数组 
arr.forEach(item => { console.log(item)}) // 输出：3，4，5  

console.log(arr.map(item => {
  console.log(item)
  return item+1
})) // 输出：3，4，5，[4, empty, 5, empty, 6]

// 值得注意的是：稀疏数组中 「empty」元素在 map 后返回的数组中仍然为 「empty」  
console.log(arr1.filter(item => item === undefined)) // 输出：[]  
console.log(arr1.filter(item => item > 3 )) // 输出：[4,5] 

for (var i in a) { console.log(a[i]) } // 输出：3，4，5
for (var i of a) { console.log(i) } // 输出：3，undefined，4，undefined，5
```

稀疏数组在访问元素的速度上比密集数组慢

```js
const arr = new Array(200000)
arr[19999] = 88
console.time('using[]')
arr[19999]
console.timeEnd('using[]') // using[]: 0.031982421875ms

const ddd = [...new Array(200000)]
ddd[19999] = 88
console.time('using[]')
ddd[19999]
console.timeEnd('using[]') // using[]: 0.010009765625ms
```

具体原因是，对于稀疏数组 V8 引擎访问对象是使用 散列表模式的，该种模式在访问时需要计算一遍哈希值，所以会比较慢，但散列表对于空间利用来说，效率更高。

而密集数组，它是申请一段连续的内存空间，访问时可以直接通过「索引」来访问，所以速度比较快；

稀疏数组在一些数组方法中与密集数组存在差异。

```js
var a = [1,,,,]
var b = new Array(5)
var c = []  

// Array.prototype.every() 和 Array.prototype.some() 
b.every(i => i === undefined); // true  
a.some(i => i === undefined); // false
```

前面说到遍历数组的方法会跳过「empty」元素。所以在排除后「empty」元素后，数组内找不到 undefined 元素， some 会返回 false。空数组使用 every 时，返回 true。

```js
// Array.prototype.find() 和 Array.prototype.findIndex()
a.findIndex(i => i === undefined) // 1
a.find(i => i === undefined) //undefined
```

由于find和findIndex是使用 for 循环来实现的，与forEach有所不同,所以这两种方法能遍历到「empty」元素。

```js
// Array.prototype.includes() 
a.includes() // true
b.includes() // true
c.includes() // false
a.includes(undefined) // true
b.includes(undefined) // true
```

includes() 方法表现较为特殊，大体可以总结为：当数组长度为 0 时，include 一定返回 false；当数组为稀疏数组且长度不为 0 ，且入参为空或 undefined 时，include 一定返回 true；

```js
// Array.prototype.sort()
var sortArr = [5,,9,,1]
sortArr.sort()
console.log(sortArr) // 输出：[1, 5, 9, empty × 2]
```

sort 方法能够正常排序，且sort 方法不会遍历「empty」元素，但 sort 后数组的长度并不会变化，这一点与map的表现一致，map得到的数组长度也不变。

```js
// Array.prototype.join()  
[undefined,undefined,1].join() // 输出：",,1"
[5,,9,,1].join() // 输出："5,,9,,1"
```

「empty」元素仍然会被保留。Array.prototype上的其他方法，稀疏数组和密集数组表现基本一致。

## 总结

> JavaScript中的数组并不像我们在C或java等语言中遇到的常规数组，在js中数组并非起始地址+长度构成的一片连续的地址空间。javascript中数组事实上就是个对象,仅仅只是会自己主动管理一些"数字"属性和length属性罢了。

> 说的更直接一点,JavaScript中的数组根本没有索引,由于索引应该是数字,而JavaScript中数组的索引事实上是字符串。

> arr[1]事实上就是arr["1"],给arr["1000"] = 1,arr.length也会自己主动变为1001。这些表现的根本原因就是：JavaScript中的对象就是字符串到随意值的键值对。

> 通过new Array(len)的方式创建的数组属于稀疏数组，稀疏数组在一些数组方法中，特别是遍历数组的方法，往往与我们预期的不太一样，如果对其不了解，容易导致问题，而且稀疏数组在创建和访问元素方面性能表现并不好，所以在平时代码中应该尽量避免使用稀疏数组。



# 语音合成

> 在做项目的过程中，遇到场景是客户要求播放语音的场景，这里需要js来实现文字转语音播放的功能。在不使用第三方API接口（这种方式需要外网），能想到的也就是利用html5的个API：SpeechSynthesis。

> SpeechSynthesis用于将指定文字合成为对应的语音.也包含一些配置项,指定如何去阅读(语言,音量,音调)等等。

## 实例对象属性

- lang 获取并设置话语的语言
- pitch 获取并设置话语的音调(值越大越尖锐,越低越低沉)
- rate 获取并设置说话的速度(值越大语速越快,越小语速越慢)
- text 获取并设置说话时的文本
- voice 获取并设置说话的声音
- volume 获取并设置说话的音量

### **SpeechSynthesis方法**

- speak() 将对应的实例添加到语音队列中
- cancel() 删除队列中所有的语音.如果正在播放,则直接停止
- pause() 暂停语音
- resume() 恢复暂停的语音
- getVoices 获取支持的语言数组. 注意:必须添加在voiceschanged事件中才能生效

### 实例对象方法

onstart – 语音合成开始时候的回调。
onpause – 语音合成暂停时候的回调。
onresume – 语音合成重新开始时候的回调。
onend – 语音合成结束时候的回调。

## 简单实现

先从最简单的例子说起，如果想让浏览器读出“你好，世界！”的声音，可以下面的js代码：

```js
let utterThis = new SpeechSynthesisUtterance('你好，世界！');
speechSynthesis.speak(utterThis);
```

只需要这么一点代码就足够了，大家可以在自己浏览器的控制台里面运行上面两行代码，看看有没有读出声音。

除了使用speak方法，我们还可以实例对象属性text，因此上面的代码也可以写成：

```js
let utterThis = new SpeechSynthesisUtterance();
utterThis.text = '你好，世界！';
utterThis.lang = 'zh';//汉语
utterThis.rate = 0.7;//语速
speechSynthesis.speak(utterThis);
```

### **项目实战**

html

```html
<div class="voiceinator">
    <h1>听说 5000</h1>
  
    <select name="voice" id="voices">
      <option value="">Select A Voice</option>
    </select>
    
    <label for="rate">Rate:</label>
    <input name="rate" type="range" min="0" max="3" value="1" step="0.1">
    
    <label for="pitch">Pitch:</label>
    <input name="pitch" type="range" min="0" max="2" step="0.1">
    
    <textarea name="text">你好 给你点?</textarea>
    
    <button id="stop">Stop!</button>
    <button id="speak">Speak</button>
</div>
```

JavaScript：

```js
const synth = window.speechSynthesis
const msg = new SpeechSynthesisUtterance()
let voices = []
const voicesDropdown = document.querySelector('[name="voice"]')
const options = document.querySelectorAll('[type="range"], [name="text"]')
const speakButton = document.querySelector('#speak')
const stopButton = document.querySelector('#stop')

msg.text = '你好 给你点?'
msg.lang = 'zh-CN'

synth.addEventListener('voiceschanged',getSupportVoices)
speakButton.addEventListener('click',throttle(handleSpeak,1000))
stopButton.addEventListener('click',handleStop)
options.forEach(e => e.addEventListener('change',handleChange))

function getSupportVoices() {
  voices = synth.getVoices()
  voices.forEach(e => {
      const option = document.createElement('option')
      option.value = e.lang
      option.text = e.name
      voicesDropdown.appendChild(option)
   })
}
function handleSpeak(e) {
  msg.lang = voicesDropdown.selectedOptions[0].value
  synth.speak(msg)
}
function handleStop(e) {
  synth.cancel(msg)
}
function handleChange(e) {
  msg[this.name] = this.value
}
function throttle(fn,delay) {
  let last = 0
  return function() {
      const now = new Date()
      if(now - last > delay) {
        fn.apply(this,arguments)
        last = now
      }
  }
}
```

## 代码解读

### html部分

页面布局方面就是通过select下拉菜单选择需要转换为什么语言，具体包括什么语言是通过js动态加载的。

其次分别用两个input的滑动来选择语音播报的速度和音调。

通过修改textarea来设置需要播报的文字内容。

最后通过按钮来控制语音的播报和停止。

### JS部分

首先通过const synth = window.speechSynthesis来创建语音,用const msg = new SpeechSynthesisUtterance()来创建文本实例设置默认播报的文本和语言:msg.text和msg.lang。

通过voiceschanged事件来动态获取支持的语言种类,并生成options添加到html中.其中最主要的方法就是synth.getVoices()获取.各位可以通过自行打印获取到的数组查看具体包含的属性。

创建按钮点击事件,分别通过synth.speak(msg)和synth.cancel(msg)来播放和取消播放。

在播放前通过voicesDropdown.selectedOptions[0].value来设置文本的语言(这里如果文本的内容语言和播报选择的语言不一致的话会出现乱读的情况)。

最后添加了一个节流函数,防止多次点击按钮不断播放(最好是能获取播放的时长,或监听播报完毕事件,这里就是简单的2秒识别一次,有兴趣的小伙伴可以自行编写)。

## 遇到问题

1、google chrome播放语音可能会卡住，所以无声音。

解决方法：在播放语音之前先 调用一下cancel方法：

```js
window.speechSynthesis.cancel()
```

2、出现警告:speechSynthesis.speak() without user activation is no longer allowed since M71, around December 2018.

解决方法：进去必须有一个事件动作，如点击事件click，或者你直接鼠标点击页面某处就可以播放了。

3、SpeechSynthesisUtterance在浏览器会存在兼容性问题（如IE不支持），目前主流浏览器如Chrome，Edge，Safari等等都是支持的。

解决方案,提示用户更换其他浏览器访问，代码：

```js
if(!!window.SpeechSynthesisUtterance){
   console.log（"请使用其他浏览器！"）
}
```

















































