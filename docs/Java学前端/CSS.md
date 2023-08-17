

# CSS⭐

> 即 Cascading  Style  Sheets，它描述了网页的表现与展示效果

## 选择器

> * **type 选择器 - 根据标签名进行匹配（元素选择器）**
> * **class 选择器 - 根据元素的 class 属性进行匹配**
> * **id 选择器  - 根据元素的 id 属性进行匹配**

```html
<link rel="stylesheet" href="style.css">
<div>
    <p id="p1">1111111111111111111</p>
    <p class="c1" id="p2">2222222222222222222</p>
    <p class="c1" id="p3">3333333333333333333</p>
</div>
```

```css
/* 元素(type)选择器 */
p {
    background-color:rgb(243, 136, 42);
}

/* class 选择器 */
.c1 {
    background-color: rgb(151, 211, 48);	
}

/* id 选择器 */
#p3 {
    background-color: cyan;
    display: block;
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211101923561.png" alt="image-20221110192345464" style="zoom:80%;" />

## 属性和值

> * background-color : red;
> * ...
> * display

## 布局

> 与布局相关的 html 元素，div ， template

### 经典布局

```html
<div class="container">
    <div id="header">#header</div>
    <div id="aside">#aside</div>
    <div id="main">#main</div>
    <div style="clear: both;"></div>
    <div id="footer">#footer</div>
</div>
```

```html
<style>
    html,body {
        margin: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 30px;
        font-weight: bold;            
    }
    
    div{
        box-sizing: border-box;
    }
    
    .container {
        height: 100%;            
        position: relative;
    }
    
    #header {
        background-color:rgb(152, 152, 255);
        width: 100%;
        height: 80px;
        padding-top: 10px;
    }
    
    #aside {
        background-color:aquamarine;
        float: left;
        width: 200px;
        height: calc(100% - 140px);
        padding-top: 10px;
    }
    
    #main {
        background-color:honeydew;
        float: left;
        width: calc(100% - 200px);
        height: calc(100% - 140px);
        padding-top: 10px;
        padding-left: 20px;
        text-align: left;
    }
    
    #footer {
        background-color:darksalmon;
        height: 60px;
        padding-top: 10px;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211101929539.png" alt="image-20221110192939427" style="zoom:80%;" />

### 根据template创建

```html
<div class="out">
    <div class="btn">
        <input type="button" value="根据模板创建" id="add">
    </div>
</div>
<template id="t">
    <div class="in">
        <form action="">
            <p><label>姓名</label> <input type="text"></p>
            <p><label>年龄</label> <input type="text"></p>
            <p><input type="submit" value="添加"></p>
        </form>
    </div>
</template>
```

```js
<script>
    document.getElementById("add").onclick = () => {
        let t = document.getElementById("t");
        let inputs = t.content.querySelectorAll("input");
        inputs[0].value = randomGenerator("abcdefghijklmnopqrstuvwxyz", 5);
        inputs[1].value = randomGenerator("1234567890", 2);
        const c = document.importNode(t.content, true);
        document.querySelector(".out").appendChild(c);
    }
    function randomGenerator(str, n) {
        const result = [];
        for (let i = 0; i < n; i++) {
            result.push(str.charAt(Math.floor(Math.random() * str.length)))
        }
        return result.join("");
    }
</script>
```

```css
<style>
    html,
    body {
        margin: 0;
        width: 100%;
        height: 100%;
    }

    .btn {
        padding: 10px;
    }

    .out {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color:darkgrey;
    }

    .in {
        width: 200px;
        box-sizing: border-box;
        height: 200px;
        border: solid 2px black;
        padding: 10px;
        background-color: antiquewhite;
        margin: 10px;
        float: left;
    }
</style>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211101931267.png" alt="image-20221110193157170" style="zoom:80%;" />