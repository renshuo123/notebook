

# ES6 使用技巧

## 添加对象属性值

> 给对象添加属性，名称动态变化怎么办？

```js
let obj = {};
let index = 1;
let key = `topic${index}`;
obj[key] = 'topic';
```

> 为什么要创建一个额外的变量？你不知道 ES6 中的对象属性名可以使用表达式吗？改进后：

```js
let obj = {};
let index = 1;
obj[`topic${index}`] = 'topic';
```

## 列表搜索

> 在正式的项目开发中，前端一般负责实现一些没有分页的列表的搜索功能。搜索一般分为精确搜索和模糊搜索，搜索也叫过滤。一种是模糊搜索，一般用过滤器来实现：

```js
const a = [1, 2, 3, 4, 5]
const result = a.filter((item) => {
  return item === 3
})
console.log('result', result)
```

但是，如果是精确搜索，则需要使用ES6中的find

```js
const a = [1,2,3,4,5];
const result = a.find( 
  item =>{
    return item === 3
  }
)
```

## 获取对象属性值

```js
const name = obj && obj.namejs
```

你可以在 ES6 中使用可选的链接运算符：

```js
const name = obj?.name
```

## 展平数组

> 在开发ERP系统或者人事管理系统的过程中，经常会遇到一个应用场景。一个部门的JSON数据中，属性名是部门id，属性值是部门成员id的数组集合。需求是将部门的所有成员id提取到一个数组集合中。

```js
const deps = {
'data01':[1,2,3],
'data02':[5,8,12],
'data03':[5,14,79],
'data04':[3,64,105],
}
let member = [];
for (let item in deps){
    const value = deps[item];
    if(Array.isArray(value)){
        member = [...member,...value]
    }
}
member = [...new Set(member)]
```

> 这时候，我好像听到前端组长开始骂了：还需要遍历得到对象的所有属性值吗？性能优化好不好，Object.values忘记了？以前没用过 ES6？还有涉及到数组的扁平化过程，为什么不使用ES6提供的扁平化方法呢？

```js
const deps = {
'data01':[1,2,3],
'data02':[5,8,12],
'data03':[5,14,79],
'data04':[3,64,105],
}
let member = Object.values(deps).flat(Infinity);
```

Infinity 用作平面参数，因此您不需要知道平面数组的维度。

## if中的判断语句

```js
if( type == 1 || type == 2 || type == 3 || type == 4 || ){
   //...
}
```

改进后可简写为：

```js
const condition = [1, 2, 3, 4]
const type = 11
if (condition.includes(type)) {
  console.log('ok')  
}
```

## 判断输入框不为空

在日常开发中，无论PC端还是移动端，在处理与输入框相关的业务时，往往会判断输入框没有输入值。

```js
if(value !== null && value !== undefined && value !== ''){
    //...
}
```

可以改进为：

```js
if((value??'') !== ''){
  //...
}
```

是不是省了很多代码，惊喜还是意外？

## 获取对象属性值

```js
const name = obj && obj.name
```

改进后：

```js
const name = obj?.name
```

## 异步函数

异步函数很常见，直接上示例：

```js
fconst fn1 = () =>{
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
};
```

看着这样的代码，我仿佛看到了前端组长轻蔑的眼神。

这么写，跟回调地狱有什么区别？

改进后。

```js
const fn = async () =>{
  const res1 = await fn1();
  const res2 = await fn2();
  console.log(res1);// 1
  console.log(res2);// 2
}
```

代码一下子简洁了许多，总算松了一口气。如果是并发请求，可以使用Promise.all()

```js
const fn = () =>{
   Promise.all([fn1(),fn2()]).then(res =>{
       console.log(res);// [1,2]
   }) 
}
```