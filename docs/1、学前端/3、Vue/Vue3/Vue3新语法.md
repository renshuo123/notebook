



# vue3+setup+ts 学习笔记

在 vue3.2 中，我们只需在script标签中添加setup。就可以做到，组件只需引入不用注册，属性和方法也不用 return 才能于 template 中使用，也不用写setup函数，也不用写export default ，甚至是自定义指令也可以在我们的template中自动获得。本次我们的学习也将在 setup 语法糖下进行。

## 环境搭建

```
npm init vue@latest
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303101611590.png" alt="image-20230310161153527" style="zoom:67%;" />

## ref 和 reactive

- ref: 用来给基本数据类型绑定响应式数据，访问时需要通过 .value 的形式， tamplate 会自动解析,不需要 .value
- reactive: 用来给 复杂数据类型 绑定响应式数据，直接访问即可

> ref其实也是内部调用 reactive 来实现的

```
<template>
  <div>
    <p>{{title}}</p>
    <h4>{{userInfo}}</h4>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
type Person = {
    name: string;
    age: number;
    gender?: string;
};
const title = ref<string>("彼时彼刻，恰如此时此刻");
const userInfo = reactive<Person>({
  name: '树哥',
  age: 18
})
</script>
```

## toRef、toRefs、toRaw

### toRef

toRef 如果原始对象是非响应式的,数据会变,但不会更新视图

```
<template>
  <div>
     <button @click="change">按钮</button>
     {{state}}
  </div>
</template>

<script setup lang="ts">
import { reactive, toRef } from 'vue'

const obj = {
  name: '树哥',
  age: 18
}

const state = toRef(obj, 'age')

const change = () => {
  state.value++
  console.log('obj:',obj,'state:', state);
}
</script>
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/ic5A4V8PX4PniaElFR8nqkPVh6iajiaF7ytv3dxLqlB3Yp5ricwUEny8GUFWgpMyXtHP5PkgDmzzRF2icwQphxZyFBrQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

可以看到，点击按钮，当原始对象是非响应式时，使用toRef 的数据改变，但是试图并没有更新

```
<template>
  <div>
    <button @click="change">按钮</button>
    {{state}}
  </div>
</template>

<script setup lang="ts">
import { reactive, toRef } from 'vue'

const obj = reactive({
  name: '树哥',
  age: 18
})

const state = toRef(obj, 'age')

const change = () => {
  state.value++
  console.log('obj:', obj, 'state:', state);
}
</script>
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/ic5A4V8PX4PniaElFR8nqkPVh6iajiaF7ytvdkzRaBSRNV59pWgbh1OncKyCwcgkA3omYcFM7hibtbK70jeeD41PkIA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)


当我们把 obj 用 reactive 包裹，再使用 toRef，点击按钮时，可以看到视图和数据都变了

> toRef返回的值是否具有响应性取决于被解构的对象本身是否具有响应性。响应式数据经过toRef返回的值仍具有响应性，非响应式数据经过toRef返回的值仍没有响应性。

### toRefs

toRefs相当于对对象内每个属性调用toRef，toRefs返回的对象内的属性使用时需要加.value,主要是方便我们解构使用

```
<template>
  <div>
    <button @click="change">按钮</button>
    name--{{name}}---age{{age}}
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'

const obj = reactive({
  name: '树哥',
  age: 18
})

let { name, age } = toRefs(obj)

const change = () => {
  age.value++
  name.value = '张麻子'
  console.log('obj:', obj);
  console.log('name:', name);
  console.log('age:', age);
}
</script>
```

简单理解就是批量版的toRef,(**其源码实现也正是通过对象循环调用了toRef**)

### toRaw

将响应式对象修改为普通对象

```
<template>
  <div>
    <button @click="change">按钮</button>
    {{data}}
  </div>
</template>

<script setup lang="ts">
import { reactive, toRaw } from 'vue'

const obj = reactive({
  name: '树哥',
  age: 18
})

const data = toRaw(obj)

const change = () => {
  data.age = 19
  console.log('obj:', obj, 'data:', data);
}
</script>
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/ic5A4V8PX4PniaElFR8nqkPVh6iajiaF7ytvL5N5w4e8fZLRiaYIibSYiaH2jCMKVrWZJImIv1VRPAQlbtn84HJyvwTYw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

数据能变化，视图不变化(失去响应式)

## computed

```
<template>
  <div>
    <p>{{title}}</p>
    <h4>{{userInfo}}</h4>
    <h1>{{add}}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive,computed } from "vue";
const count = ref(0)

// 推导得到的类型：ComputedRef<number>
const add = computed(() => count.value +1)

</script>
```

## watch

vue3 watch 的作用和 Vue2 中的 watch 作用是一样的，他们都是用来监听响应式状态发生变化的，当响应式状态发生变化时，就会触发一个回调函数。

```
watch(data,()=>{},{})
```

- 参数一，监听的数据
- 参数二，数据改变时触发的回调函数（newVal,oldVal）
- 参数三，options配置项，为一个对象

**1、监听ref定义的一个响应式数据**

```
<script setup lang="ts">
import { ref, watch } from "vue";

const str = ref('彼时彼刻')

//3s后改变str的值
setTimeout(() => { str.value = '恰如此时此刻' }, 3000)

watch(str, (newV, oldV) => {
  console.log(newV, oldV) //恰如此时此刻 彼时彼刻
})

</script>
```

**2、监听多个ref**

**这时候写法变为数组的形式**

```
<script setup lang="ts">
import { ref, watch } from "vue";

let name = ref('树哥')
let age = ref(18)

//3s后改变值
setTimeout(() => {
  name.value = '我叫树哥'
  age.value = 19
}, 3000)

watch([name, age], (newV, oldV) => {
  console.log(newV, oldV) // ['我叫树哥', 19]  ['树哥', 18]
})

</script>
```

**3、监听Reactive定义的响应式对象**

```
<script setup lang="ts">
import { reactive, watch } from "vue";

let info = reactive({
  name: '树哥',
  age: 18
})

//3s后改变值
setTimeout(() => {
  info.age = 19
}, 3000)

watch(info, (newV, oldV) => {
  console.log(newV, oldV) 
})

</script>
```

当 watch 监听的是一个响应式对象时，会隐式地创建一个深层侦听器，即该响应式对象里面的任何属性发生变化，都会触发监听函数中的回调函数。**即当 watch 监听的是一个响应式对象时，默认开启 deep：true**

**4、监听reactive 定义响应式对象的单一属性**

错误写法

```
<script setup lang="ts">
import { reactive, watch } from "vue";

let info = reactive({
  name: '树哥',
  age: 18
})

//3s后改变值
setTimeout(() => {
  info.age = 19
}, 3000)


watch(info.age, (newV, oldV) => {
  console.log(newV, oldV) 
})

</script>
```

可以看到控制台出现警告

```
[Vue warn]: Invalid watch source:  18 A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types. 
  at <Index> 
  at <App>
```

如果我们非要监听响应式对象中的某个属性，我们可以使用 getter 函数的形式,**即将watch第一个参数修改成一个回调函数的形式**

正确写法：

```
// 其他不变
watch(()=>info.age, (newV, oldV) => {
  console.log(newV, oldV) // 19 18
}
```

5、监听reactive定义的 引用数据

```
<script setup lang="ts">
import { reactive, watch } from "vue";

let info = reactive({
  name: '张麻子',
  age: 18,
  obj: {
    str: '彼时彼刻，恰如此时此刻'
  }
})

//3s后改变s值
setTimeout(() => {
  info.obj.str = 'to be or not to be'
}, 3000)

// 需要自己开启 deep:true深度监听,不然不发触发 watch 的回调函数
watch(() => info.obj, (newV, oldV) => {
  console.log(newV, oldV)
}, {
  deep: true
})

</script>
```

## WatchEffect

会立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。（有点像计算属性）

如果用到 a 就只会监听 a, 就是用到几个监听几个 而且是非惰性,会默认调用一次

```
<script setup lang="ts">
import { ref, watchEffect } from "vue";

let num = ref(0)

//3s后改变值
setTimeout(() => {
  num.value++
}, 3000)

watchEffect(() => {
  console.log('num 值改变：', num.value)
})

</script>
```

可以在控制台上看到，第一次进入页面时，打印出`num 值改变：0`,三秒后，再次打印`num 值改变：1`

- **停止监听**

当 watchEffect 在组件的 setup() 函数或生命周期钩子被调用时，侦听器会被链接到该组件的生命周期，并在组件卸载时自动停止。

但是我们采用异步的方式创建了一个监听器，这个时候监听器没有与当前组件绑定，所以即使组件销毁了，监听器依然存在。

这个时候我们可以显式调用停止监听

```
<script setup lang="ts">
import { watchEffect } from 'vue'
// 它会自动停止
watchEffect(() => {})
// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {})
}, 100)

const stop = watchEffect(() => {
  /* ... */
})

// 显式调用
stop()
</script>
```

**清除副作用（onInvalidate）**

watchEffect 的第一个参数——effect函数——可以接收一个参数：叫onInvalidate，也是一个函数，用于清除 effect 产生的副作用

就是在触发监听之前会调用一个函数可以处理你的逻辑，例如防抖

```
import { ref, watchEffect } from "vue";

let num = ref(0)

//3s后改变值
setTimeout(() => {
  num.value++
}, 3000)

watchEffect((onInvalidate) => {
  console.log(num.value)
  onInvalidate(() => {
    console.log('执行');
  });
})
```

控制台依次输出：0 => 执行 => 1

- **配置选项**

watchEffect的第二个参数，用来定义副作用刷新时机，可以作为一个调试器来使用

flush （更新时机）：

- 1、pre：组件更新前执行
- 2、sync：强制效果始终同步触发
- 3、post：组件更新后执行

```
<script setup lang="ts">
import { ref, watchEffect } from "vue";

let num = ref(0)

//3s后改变值
setTimeout(() => {
  num.value++
}, 3000)

watchEffect((onInvalidate) => {
  console.log(num.value)
  onInvalidate(() => {
    console.log('执行');
  });
}, {
  flush: "post", //此时这个函数会在组件更新之后去执行
  onTrigger(e) { //作为一个调试工具，可在开发中方便调试
    console.log('触发', e);
  },
})
</script>
```

## 生命周期

和 vue2 相比的话，基本上就是将 Vue2 中的beforeDestroy名称变更成beforeUnmount; destroyed 表更为 unmounted；然后用setup代替了两个钩子函数 beforeCreate 和 created；新增了两个开发环境用于调试的钩子

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202303101546688.png" alt="image-20230310154644488" style="zoom:80%;" />

## 父子组件传参

### defineProps

父组件传参

```
<template>
  <Children :msg="msg" :list="list"></Children>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Children from './Children.vue'

const msg = ref('hello 啊，树哥')
const list = reactive<number[]>([1, 2, 3])
</script>
```

> setup 中，引入的组件会自动注册，所以可以直接使用，无需再通过components进行注册

子组件接受值

defineProps 来接收父组件传递的值， **defineProps是无须引入的直接使用即可**

```
<template>
  <div>
    <p>msg：{{msg}}</p>
    <p>list：{{list}}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  msg: string,
  list: number[]
}>()
</script>
```

使用 withDefaults 定义默认值

```
<template>
  <div>
    <p>msg：{{msg}}</p>
    <p>list：{{list}}</p>
  </div>
</template>

<script setup lang="ts">
type Props = {
  msg?: string,
  list?: number[]
}

// withDefaults 的第二个参数便是默认参数设置，会被编译为运行时 props 的 default 选项
withDefaults(defineProps<Props>(), {
  msg: '张麻子',
  list: () => [4, 5, 6]
})
</script>
```

子组件向父组件抛出事件

### defineEmits

子组件派发事件

```
<template>
  <div>
    <p>msg：{{msg}}</p>
    <p>list：{{list}}</p>
    <button @click="onChangeMsg">改变msg</button>
  </div>
</template>

<script setup lang="ts">
type Props = {
  msg?: string,
  list?: number[]
}

withDefaults(defineProps<Props>(), {
  msg: '张麻子',
  list: () => [4, 5, 6]
})

const emits = defineEmits(['changeMsg'])
const onChangeMsg = () => {
emits('changeMsg','黄四郎')
}
</script>
```

子组件绑定了一个click 事件 然后通过defineEmits 注册了一个自定义事件,点击按钮的时候，触发 emit 调用我们注册的事件，传递参数

父组件接收

```
<template>
  <Children :msg="msg" :list="list" @changeMsg="changeMsg"></Children>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Children from './Children.vue'

const msg = ref('hello 啊，树哥')
const list = reactive<number[]>([1, 2, 3])

const changeMsg = (v: string) => {
  msg.value = v
}
</script>
```

### defineExpose 获取子组件的实例和内部属性

在 script-setup 模式下，所有数据只是默认 return 给 template 使用，不会暴露到组件外，所以父组件是无法直接通过挂载 ref 变量获取子组件的数据。

如果要调用子组件的数据，需要先在子组件显示的暴露出来，才能够正确的拿到，这个操作，就是由 defineExpose 来完成。

子组件

```
<template>
  <p>{{name}}</p>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const name = ref('张麻子')
const changeName = () => {
  name.value = '县长'
}
// 将方法、变量暴露给父组件使用，父组件才可通过 ref API拿到子组件暴露的数据
defineExpose({
  name,
  changeName
})
</script>
```

父组件

```
<template>
  <div>
    <child ref='childRef' />
    <button @click="getName">获取子组件中的数据</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import child from './Child.vue'

// 子组件ref（TypeScript语法）
const childRef = ref<InstanceType<typeof child>>()

const getName = () => {
  // 获取子组件name
  console.log(childRef.value!.name)
  // 执行子组件方法
  childRef.value?.changeName()
  // 获取修改后的name
  console.log(childRef.value!.name)
}
</script>
```

注意：defineProps 、defineEmits 、 defineExpose 和 withDefaults 这四个宏函数只能在 `<script setup>` 中使用。他们不需要导入，会随着`<script setup>`的处理过程中一起被编译。

## 插槽

在 Vue2 的中一般中具名插槽和作用域插槽分别使用slot和slot-scope来实现，如：

父组件

```
<template>
  <div>
    <p style="color:red">父组件</p>
    <Child ref='childRef'>
      <template slot="content" slot-scope="{ msg }">
        <div>{{ msg }}</div>
      </template>
    </Child>
  </div>
</template>

<script lang="ts" setup>
import Child from './Child.vue'
</script>
```

子组件

```
<template>
  <div>child</div>
  <slot name="content" msg="hello 啊，树哥!"></slot>
</template>
```

在 Vue3 中将slot和slot-scope进行了合并统一使用，使用 v-slot， `v-slot:slotName` 简写 `#slotName`

父组件

```
<template>
  <div>
    <p style="color:red">父组件</p>
    <Child>
      <template  v-slot:content="{ msg }">
        <div>{{ msg }}</div>
      </template>
    </Child>
  </div>
</template>

<script lang="ts" setup>
import Child from './Child.vue'
</script>

<!-- 简写 -->
<Child>
  <template #content="{ msg }">
    <div>{{ msg }}</div>
      </template>
</Child>
```

实际上,v-slot 在 Vue2.6+ 的版本就可以使用。

## 异步组件

通过 defineAsyncComponent 异步加载

```
<template>
  <Children :msg="msg" :list="list" @changeMsg="changeMsg"></Children>
</template>

<script setup lang="ts">
import { ref, reactive,defineAsyncComponent } from 'vue'
// import Children from './Children.vue'
const Children = defineAsyncComponent(() => import('./Children.vue'))
</script>
```

## Suspense

Suspense 允许应用程序在等待异步组件时渲染一些其它内容,在 Vue2 中，必须使用条件判断(例如 v-if、 v-else等)来检查数据是否已加载并显示一些其它内容；但是，在 Vue3 新增了 Suspense 了，就不必跟踪何时加载数据并呈现相应的内容。

他是一个带插槽的组件，只是它的插槽指定了default 和 fallback 两种状态。

Suspense 使用：

- 1、使用 `<Suspense></Suspense>` 包裹所有异步组件相关代码
- 2、`<template v-slot:default></template>` 插槽包裹异步组件
- 3、`<template v-slot:fallback></template>` 插槽包裹渲染异步组件渲染之前的内容

```
<template>
  <Suspense>
    <template #default>
      <!-- 异步组件-默认渲染的页面 -->
      <Children :msg="msg" :list="list" @changeMsg="changeMsg"></Children>
    </template>
    <template #fallback>
      <!-- 页面还没加载出来展示的页面 -->
      <div>loading...</div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { ref, reactive, defineAsyncComponent } from 'vue'
const Children = defineAsyncComponent(() => import('./Children.vue'))
</script>
```

## Teleport传送组件

Teleport 是一种能够将我们的模板渲染至指定DOM节点，不受父级style、v-show等属性影响，但data、prop数据依旧能够共用的技术

主要解决的问题：因为Teleport节点挂载在其他指定的DOM节点下，完全不受父级style样式影响

使用： 通过to 属性插入到指定元素位置，如 body，html，自定义className等等。

```
<template>
  <!-- 插入至 body -->
  <Teleport to="body">
    <Children></Children>
  </Teleport>
  <!-- 默认 #app 下 -->
  <Children></Children>
</template>
<script lang="ts" setup>
import Children from './Children.vue'
</script>
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/ic5A4V8PX4PniaElFR8nqkPVh6iajiaF7ytvqs1uvgiaTjYQDsSxzV6vVvK0fC5ibFP2xiaTEM7baQ7VRicRbG2BDQerHw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## keep-alive 缓存组件

- 作用和vue2一致，只是生命周期名称有所更改
- 初次进入时： onMounted> onActivated
- 退出后触发 deactivated
- 再次进入：只会触发 onActivated


事件挂载的方法等，只执行一次的放在 onMounted中；组件每次进去执行的方法放在 onActivated中

## provide/inject

provide 可以在祖先组件中指定我们想要提供给后代组件的数据或方法，而在任何后代组件中，我们都可以使用 inject 来接收 provide 提供的数据或方法。

父组件

```
<template>
  <Children></Children>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import Children from "./Children.vue"

const msg = ref('hello 啊，树哥')

provide('msg', msg)
</script>
```

子组件

```
<template>
  <div>
    <p>msg：{{msg}}</p>
    <button @click="onChangeMsg">改变msg</button>
  </div>
</template>

<script setup lang="ts">
import { inject, Ref, ref } from 'vue'

const msg = inject<Ref<string>>('msg',ref('hello啊！'))
const onChangeMsg = () => {
  msg.value = 'shuge'
}
</script>
```

如果你想要传入的值能响应式的改变，需要通过ref 或 reactive 添加响应式

## v-model 升级

v-model 在vue3可以说是破坏式更新，改动还是不少的

我们都知道，v-model 是props 和 emit 组合而成的语法糖,vue3中 v-model 有以下改动

- 变更：value => modelValue
- 变更：update:input => update:modelValue
- 新增：一个组件可以设置多个 v-model
- 新增：开发者可以自定义 v-model修饰符
- v-bind 的 .sync 修饰符和组件的 model 选项已移除

子组件

```
<template>
  <div>
    <p>{{msg}}，{{modelValue}}</p>
    <button @click="onChangeMsg">改变msg</button>
  </div>
</template>

<script setup lang="ts">

type Props = {
  modelValue: string,
  msg: string
}
defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'update:msg'])

const onChangeMsg = () => {
  // 触发父组件的值更新
  emit('update:modelValue', '恰如此时此刻')
  emit('update:msg', '彼时彼刻')
}
</script>
```

父组件

```
<template>
  // v-model:modelValue简写为v-model
  // 绑定多个v-model
  <Children v-model="name" v-model:msg="msg"></Children>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Children from "./Children.vue"

const msg = ref('hello啊')
const name = ref('树哥')
</script>
```

## 自定义指令

自定义指令的生命周期

- created 元素初始化的时候
- beforeMount 指令绑定到元素后调用 只调用一次
- mounted 元素插入父级dom调用
- beforeUpdate 元素被更新之前调用
- update 这个周期方法被移除 改用updated
- beforeUnmount 在元素被移除前调用
- unmounted 指令被移除后调用 只调用一次

实现一个自定义拖拽指令

```
<template>
  <div v-move class="box">
    <div class="header"></div>
    <div>
      内容
    </div>
  </div>
</template>
 
<script setup lang='ts'>
import { Directive } from "vue";
const vMove: Directive = {
  mounted(el: HTMLElement) {
    let moveEl = el.firstElementChild as HTMLElement;
    const mouseDown = (e: MouseEvent) => {
      //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
      console.log(e.clientX, e.clientY, "起始位置", el.offsetLeft);
      let X = e.clientX - el.offsetLeft;
      let Y = e.clientY - el.offsetTop;
      const move = (e: MouseEvent) => {
        el.style.left = e.clientX - X + "px";
        el.style.top = e.clientY - Y + "px";
        console.log(e.clientX, e.clientY, "位置改变");
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", move);
      });
    };
    moveEl.addEventListener("mousedown", mouseDown);
  },
};
</script>
 
<style >
.box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
}

.header {
  height: 20px;
  background: black;
  cursor: move;
}
</style>
```

## 自定义 hooks

我们都知道在 vue 中有个东西叫 mixins，他可以将多个组件中相同的逻辑抽离出来，实现一次写代码，多组件受益的效果。

但是 mixins 的副作用就是引用的多了变量的来源就不清晰了，而且还会有变量来源不明确,不利于阅读，容易使代码变得难以维护。

- Vue3 的 hook函数 相当于 vue2 的 mixin, 不同在与 hooks 是函数
- Vue3 的 hook函数 可以帮助我们提高代码的复用性, 让我们能在不同的组件中都利用 hooks 函数

**useWindowResize**

我们来实现一个窗口改变时获取宽高的 hook

```
import { onMounted, onUnmounted, ref } from "vue";

function useWindowResize() {
  const width = ref(0);
  const height = ref(0);
  function onResize() {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  }
  onMounted(() => {
    window.addEventListener("resize", onResize);
    onResize();
  });
  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
  });
  return {
    width,
    height
  };
}

export default useWindowResize;
```

使用：

```
<template>
  <h3>屏幕尺寸</h3>
  <div>宽度：{{ width }}</div>
  <div>高度：{{ height }}</div>
</template>

<script setup lang="ts">
import useWindowResize from "../hooks/useWindowResize.ts";
const { width, height } = useWindowResize();
</script>
```

## style v-bind CSS变量注入

```
<template>
  <span> style v-bind CSS变量注入</span>  
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  const color = ref('red')
</script>
<style scoped>
  span {
    /* 使用v-bind绑定组件中定义的变量 */
    color: v-bind('color');
  }  
</style>
```







# 图解Diff算法——Vue篇

## 一、虚拟dom

### **1. 虚拟** **dom** **是什么？**

虚拟dom是一个对象，一个用js来模拟真实dom的对象；

```
// 真实的dom结构
<ul id='list'>
    <li class='item1'>111</li>
    <li class='item2'>222</li>
    <li class='item3'>333</li>
</ul>
```

那么上述dom结构，在虚拟dom中是如何进行展示的呢？

```
// 旧的虚拟dom结构
const oldVDom = { 
     tagName: 'ul', // 标签名
     props: {  // 标签属性
        id: 'list' 
     },
     children: [ // 标签子节点
        { tagName: 'li', props: { class: 'item1' }, children: ['111'] },
        { tagName: 'li', props: { class: 'item2' }, children: ['222'] },
        { tagName: 'li', props: { class: 'item3' }, children: ['333'] },
     ]
}
```

此时我修改一下真实的dom结构后：

```
<ul id='list'>
    <li class='item1'>111</li>
    <li class='item2'>222</li>
    <li class='item3'>three-three</li>
</ul>
```

之后会生成新的虚拟dom：

```
// 新的虚拟dom结构
const newVDom = { 
     tagName: 'ul', // 标签名
     props: {  // 标签属性
        id: 'list' 
     },
     children: [ // 标签子节点
         // 在diff中，会通过patch发现此处两个节点没有变化，并将其复用
        { tagName: 'li', props: { class: 'item1' }, children: ['111'] },
        { tagName: 'li', props: { class: 'item2' }, children: ['222'] },
        // 在diff的过程中，会通过patch来找出此处发生了更改，并将其替换
        { tagName: 'li', props: { class: 'item3' }, children: ['three-three']},
     ]
}
```

此时看到的两个dom结构就是我们常说的 **新旧虚拟dom**

### **2. 为什么要有虚拟** **dom** **？解决了什么问题？**

在虚拟dom出现之前，我们都是**jQuery**一把梭（不多说了jQuery yyds）。

这里先来了解一下浏览器的渲染原理：

1. ![图片](https://mmbiz.qpic.cn/mmbiz_png/ulhWEWict5AjY4lib33zqb3VG9Ul8nAjmc6uKwsyR4RXUm2dEyCY8ABLuEs75ib84g0I9CiaCnQtnTRsqk5Cd3Kfeg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

2. 

3. 由图可以发现触发一次重排的代价还是比较大的；如果频繁触发浏览器的重排，无疑会造成很大的性能成本。

我们都知道，在每一次事件循环后浏览器会有一个UI的渲染过程，那么在一次事件循环内触发的所有dom操作都会被当作为异步任务被放进异步任务队列中等待被处理。

那么此例子只是更改了一次dom结构，如果更改100+次呢？

虽然浏览器做了优化，在一段时间内频繁触发的dom不会被立即执行，浏览器会积攒变动以最高60HZ的频率更新视图；但是难免还是会造成一定次数的重排。

这时候，虚拟dom就派上了用场：不管更改多少次，多少个地方的结构，都会映射到新的虚拟dom结构中去，然后进行diff的对比，最终渲染成真实的dom，在这一次render中只会操作一次真实的dom结构，所以只会造成一次重排。

同时，采用JS对象去模拟DOM结构的好处是，页面的更新完全可以映射到JS对象中去处理，而操作内存中的JS对象速度也会更快。

**所以才有了虚拟dom的出现，可以看下图虚拟dom工作原理：**

- 先根据初始的dom结构，生成一个 旧的虚拟dom：**oldVDom**；
- 再根据修改后的dom结构，生成 一个新的虚拟dom：**newVDom**；
- 然后通过**diff算法**来对比新旧虚拟DOM，从而找出需要替换的节点，然后将其渲染为真实的dom结构；

![图片](https://mmbiz.qpic.cn/mmbiz_png/ulhWEWict5AjY4lib33zqb3VG9Ul8nAjmcRz1eDjNqqrk8hBcT6eXVstRKIqpVEmdwPibxYwEl565wAWxia2OO9qrQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- ### 虚拟dom的缺点？

看了上述虚拟dom的优点，我们来聊聊使用它的一些代价：

1. **首屏加载时间更长**
2. 由于我们需要根据当前的节点，来生成对应的虚拟dom，我们都知道虚拟dom是一个JS对象，所以在项目初始化的时候去生成对应的虚拟节点也是一笔时间上的开销；因此项目的首次加载可能耗费更多时间

3. **极端场景下性能不是最优解**
4. 栗子🌰：如果当前页面的节点基本全都改变了，那我们去做了一次diff的patch过程相当于做了无效操作；

## 二、Diff算法

了解了虚拟dom结构之后，我们都清楚了diff的触发时机是在**新旧VDom进行对比的时候**。

***tips***：既然所有的更改都被映射到了新的VDom上，那么为何不直接将新的VDom渲染成真实的dom呢？

***answer***：如果直接渲染的话，会默认把所有节点都更新一遍，造成不必要的节点更新；而经过了diff的比较后可以精确的找出那些节点需要更新，从而实现按需更新的理念，节省性能；

那么Diff算法的比较规则有哪些呢？

### 同层比较

为什么要同层比较？

如果不同层比较的话，全部的对比完一整个dom结构，时间复杂度是 **O(n^3)** **;** 时间成本太大了；所以改用同层比较这样的方法去牺牲了精度而提高了时间效率。

可以看到图中每一层的节点，都是同层在进行对比，这样的好处就是，不会每一层的对比都是相对独立的，不会影响到下一层的对比；同时同层对比的时间复杂度也是 **O(n)；**

同时也是遵循一个深度优先的原则；diff的过程是一个深度优先遍历节点，然后将该节点与newVDom中的同层节点进行对比，如果有差异，则记录该节点到JS对象中。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ulhWEWict5AjY4lib33zqb3VG9Ul8nAjmcZSZ5r56T6aXGgjEhb7JkurkZpFwJUx1VBxJxB6prhmpAnsSibqZeLYQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

在同层对比的过程中有这样几种情况：

```
<div>
    <p>ppp</p>
    <ul id='list' >
        <li class='item1'>111</li>   
        <li class='item2'>222</li>  
        <li class='item3'>333</li>
    </ul>
    <div>div</div>
</div>
<div>
    // 1. 节点类型发生了改变
    <h3>ppp</h3>
    // 2. 节点类型一样，属性发生变化
    <ul id='list-change'>
        <li class='item1'>111</li>   
        <li class='item2'>222</li>  
        // 3. 节点被删除
        // <li class='item3'>333</li> 
        // 4. 新增节点
        <li class='item4'>444</li>  
    </ul>
    // 4. 文本变化
    <div>属性变化</div>
</div>
```

#### **1. 节点类型变了**

节点`p`标签 变成了`h3`标签，此时diff的过程中`p`节点会被直接销毁，然后挂载新的节点 `h3`，同时`p`标签的子节点也会被全部销毁；虽然可能造成一些不必要的销毁，但是为了实现同层比较的方法节省时间成本只能这样做咯；同时这样也告诫我们在写代码的时候，可以规避一些不必要的父节点的类型替换，比如将`p`标签换成了`div`等。

#### **2. 节点类型一样，属性或者属性值发生变化**

此时不会触发节点的卸载和挂载，只会触发当前节点的更新

#### **3. 删除/新增/改变 节点**

这时候就需要找出这些节点并在newVDom中进行插入/删除，这个过程请看下面vue和react是如何利用key值来处理的吧！

#### **4. 文本变化**

只会触发文本的改变

## 三、vue中的diff算法

在了解了虚拟dom和diff算法的相关内容后，我们来看看各大框架中是如何做处理的吧！

### vue2--双端比较

这里你需要提前了解vue2内部的响应式原理是如何运作的，推荐文章：**vue2的响应式原理**[1]。那么，当触发了vue的数据的响应式后，其内部的一系列变化又是如何呢？

首先，数据改变会触发 **setter**，然后调用 Dep.notify(), 并且通过`Dep.notify`去通知所有`订阅者Watcher` **，** 订阅者们就会调用`patch方法` **，** 给真实 DOM 打补丁，更新相应的视图。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ulhWEWict5AjY4lib33zqb3VG9Ul8nAjmc7yPunkib6w3jwNF5YicwwqMgEtw1cDhnFtGHmzpe4yvIZ21OCse5ER3Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

接下来我们来分析几个核心函数吧：

#### **patch** **()**

diff的入口函数；

```
function patch(oldVnode, newVnode) { // 传入新、旧节点
  // 比较是否为一个类型的节点
  if (sameVnode(oldVnode, newVnode)) {
    // 是：继续进行深层比较
    patchVnode(oldVnode, newVnode)
  } else {
    // 否
    const oldEl = oldVnode.el // 旧虚拟节点的真实DOM节点
    const parentEle = api.parentNode(oldEl) // 获取父节点
    createEle(newVnode) // 创建新虚拟节点对应的真实DOM节点
    if (parentEle !== null) {
      api.insertBefore(parentEle, newVnode.el, api.nextSibling(oldEl)) // 将新元素添加进父元素
      api.removeChild(parentEle, oldVnode.el)  // 移除以前的旧元素节点
      // 设置null，释放内存
      oldVnode = null
    }
  }
  return newVnode
}
```

#### **sameVNode** **()**

主要用来判断两个节点是否完全相同，那么满足什么条件才能判断两个节点完全相同呢？

```
function sameVnode(oldVnode, newVnode) {
  return (
    oldVnode.key === newVnode.key && // key值是否一样
    oldVnode.tagName === newVnode.tagName && // 标签名是否一样
    oldVnode.isComment === newVnode.isComment && // 是否都为注释节点
    isDef(oldVnode.data) === isDef(newVnode.data) && // 是否都定义了data
    sameInputType(oldVnode, newVnode) // 当标签为input时，type必须是否相同
  )
}
```

#### **patchVNode** **()**

**此阶段我们已经找到了需要去对比的节点，那么该方法主要做了什么呢？**

- 拿到真实的dom节点`el`（即`oldVnode`）

- 判断当前`newVnode`和`oldVnode`是否指向同一个对象，如果是则直接return

- 如果是文本节点，且文本有变化，则直接调用api 将文本替换；若文本没有变化，则继续对比新旧节点的子节点`children`

- 如果`oldVnode`有子节点而`newVnode`没有，则删除`el`的子节点

- 如果`oldVnode`没有子节点而`newVnode`有，则将`newVnode`的子节点真实化之后添加到`el`

- 如果两者都有子节点，则执行`updateChildren`函数比较子节点，这一步很重要---**diff的核心**

```
function patchVnode(oldVnode, newVnode) {
  const el = newVnode.el = oldVnode.el // 获取真实DOM对象
  // 获取新旧虚拟节点的子节点数组
  const oldCh = oldVnode.children, newCh = newVnode.children
  // 如果新旧虚拟节点是同一个对象，则终止
  if (oldVnode === newVnode) return
  // 如果新旧虚拟节点是文本节点，且文本不一样
  if (oldVnode.text !== null && newVnode.text !== null && oldVnode.text !== newVnode.text) {
    // 则直接将真实DOM中文本更新为新虚拟节点的文本
    api.setTextContent(el, newVnode.text)
  } else {
    if (oldCh && newCh && oldCh !== newCh) {
      // 新旧虚拟节点都有子节点，且子节点不一样
      // 对比子节点，并更新
      /*  diff核心！！*/  
      updateChildren(el, oldCh, newCh) 
    } else if (newCh) {
      // 新虚拟节点有子节点，旧虚拟节点没有
      // 创建新虚拟节点的子节点，并更新到真实DOM上去
      createEle(newVnode)
    } else if (oldCh) {
      // 旧虚拟节点有子节点，新虚拟节点没有
      // 直接删除真实DOM里对应的子节点
      api.removeChild(el)
    }
  }
}
```

#### **updateChildren** **()**

此方法就是diff算法的核心部分，当发现新旧虚拟节点的的子节点都存在时候，我们就需要通过一些方法来判断哪些节点是需要移动的，哪些节点是可以直接复用的，来提高我们整个diff的效率；

下面就通过一些图解来讲解吧：

- 主要是通过 **首尾指针法 ：** 通过在新旧子节点的首尾定义四个指针，然后不断的对比找到可复用的节点，同时判断需要移动的节点。

```
<ul>
    <li>a</li>
    <li>b</li>
    <li>c</li>
    <li>b</li>
 </ul>
修改数据后 ⬇️ // a,b,c,d  ->  d,b,a,c
<ul>
    <li>d</li>
    <li>b</li>
    <li>a</li>
    <li>c</li>
</ul>
```

##### 1、理想情况下

经过四次比较可以找到替换的节点，可以看到图中第四次找到了可替换的节点；

![图片](https://mmbiz.qpic.cn/mmbiz_png/ulhWEWict5AjY4lib33zqb3VG9Ul8nAjmcCvNjwLXnvGHdTAaA2e0375D9icNq19XiadWFE4sfg4QoTJCcOlE1QhdQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

可以看到在 oldCh 和 newCh 的首尾定义了四个指针：

- 1、`oldS`和 `newS`使用`sameVnode方法`进行比较，`sameVnode(oldS, newS)` ；如果相同，则 `oldS`++，`newS`++

- 2、`oldE` 和`newE`使用`sameVnode方法`进行比较，`sameVnode(oldE, newE)`；如果相同，则 `oldE`--，`newS` --

- 3、`oldS`和 `newE`使用`sameVnode方法`进行比较，`sameVnode(oldS, newE)`；如果相同，则 `oldS` ++，`newS` --

- 4、`oldE` 和 `newS`使用`sameVnode方法`进行比较，`sameVnode(oldE, newS)`；如果相同，则 `oldE` --，`newS` ++

这是一个不断向内部收缩的过程，直到对比完所有的节点；

```
function vue2Diff(prevChildren, nextChildren, parent) {
  // 在新旧首尾，分别定义四个指针
  let oldStartIndex = 0,
    oldEndIndex = prevChildren.length - 1
    newStartIndex = 0,
    newEndIndex = nextChildren.length - 1;
  let oldStartNode = prevChildren[oldStartIndex],
    oldEndNode = prevChildren[oldEndIndex],
    newStartNode = nextChildren[newStartIndex],
    newEndNode = nextChildren[newEndIndex];
   // 不断向内收缩
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
      if (oldStartNode.key === newStartNode.key) {
        ...
      } else if (oldEndNode.key === newEndNode.key) {
        ...
      } else if (oldStartNode.key === newEndNode.key) {
        ...
      } else if (oldEndNode.key === newStartNode.key) {
        ...
      }
  }
}
```

在经历了上面的循环后，我们可以找出一些节点并将其复用，但是我们复用的过程中，需要怎么插入这些节点呢？

以上图中的为第一步，我们可以发现，**d** 节点**原本在旧列表末尾的节点，却是新列表中的开头节点，没有人比它更靠前，因为他是第一个，所以我们只需要把当前的节点移动到原本旧列表中的第一个节点之前，让它成为第一个节点即可**。

第二步：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ulhWEWict5AjY4lib33zqb3VG9Ul8nAjmc3NvicM8YmtSvqPkaXyl3U8KbNYFKqJ0N7PAfdfQkXJbcdCXrvQ6Ujeg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

第二步我们可以发现了key相同的 **c** 节点，**旧列表的尾节点**`oldE`和**新列表的尾节点**`newE`为复用节点。**原本在旧列表中就是尾节点，在新列表中也是尾节点，说明该节点不需要移动**，所以我们什么都不需要做。

第三步：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ulhWEWict5AjY4lib33zqb3VG9Ul8nAjmcMLeEoJ6aqmBeYWr5iav9ExruHOJiauLKQv2dQXfN2MFKkJAXia8n73DcA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

在第三步中我们可以看到 **a** 节点是可以复用的，**旧列表的头节点**`oldS`和**新列表的尾节点**`newE`为复用节点，我们只要将`DOM-a`移动到`DOM-b`后面就可以了。**原本旧列表中是头节点，然后在新列表中是尾节点。那么只要在旧列表中把当前的节点移动到原本尾节点的后面，就可以了**。

第四步：这一步不需要移动节点，直接复用；

![图片](https://mmbiz.qpic.cn/mmbiz_png/ulhWEWict5AjY4lib33zqb3VG9Ul8nAjmcbdWApFZSDmCLRFcsMqaCU9zKXibOnAG0dI0CZXtsP5bmoCfV23GqXyw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

最终呢，我们就得到了对比后的 dbac 啦，同时发现只有 d 和 a 节点需要进行移动，而b 、c节点都是不需要移动的；那么至此，一个理想状态下的diff比较过程就结束了，是不是感觉很清晰易懂呢？

##### 2、非理想状态下

- 如果这四种方式都没有找到该怎么处理呢？

![图片](https://mmbiz.qpic.cn/mmbiz_png/ulhWEWict5AjY4lib33zqb3VG9Ul8nAjmcPLSO2kM5bMZia43HA9MicrjnrGCFznIqqwDpExgtwOF3viaLdlWQCLcibA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

可以看到图中四次比较都没有找到可以复用的节点，那么我们只能把所有旧子节点的 `key` 做一个映射到旧节点下标的 `key -> index` 表，然后用新 `vnode` 的 `key` 去找出在旧节点中可以复用的位置；可以看下图的处理。拿**新列表**的第一个节点去**旧列表**中找与其`key`相同的节点。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ulhWEWict5AjY4lib33zqb3VG9Ul8nAjmcX6OeN9w5vj7945dFOfS1qY8QzfcMnibh8icaGMXXXIUTD3asD8zDW2Og/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

那么我们就以 `newCh` 的首节点的key值，去到 `oldCh` 的 `key - index` 的映射表中，去根据`key`值找到对应的节点，同时将 **b** 节点移动到首部去，因为在新列表中 **b** 就属于首部，所以在`oldCh`中也需要移动到首部 ；同时，还需要将 `oldCh` 中的 **b** 节点设为 **undefined** , 因为已经复用过了，就可以跳过比较了。

这个非理想的状态下的对比时间复杂度为 **O(n^2):**

```
function vue2Diff(prevChildren, nextChildren, parent) {
  //...
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (oldStartNode.key === newStartNode.key) {
    //...
    } else if (oldEndNode.key === newEndNode.key) {
    //...
    } else if (oldStartNode.key === newEndNode.key) {
    //...
    } else if (oldEndNode.key === newStartNode.key) {
    //...
    } else {
      // 在旧列表中找到 和新列表头节点key 相同的节点
      let newtKey = newStartNode.key,
        oldIndex = prevChildren.findIndex(child => child.key === newKey);
      
      if (oldIndex > -1) {
        let oldNode = prevChildren[oldIndex];
        patch(oldNode, newStartNode, parent)
        parent.insertBefore(oldNode.el, oldStartNode.el)
        // 复用后，设置为 undefined 
        prevChildren[oldIndex] = undefined
      }
      newStartNode = nextChildren[++newStartIndex]
    }
  }
}
```

### vue3--最长递增子序列

那么相比vue2中的双端对比，在vue3中的diff算法，又做了哪些优化呢？

以下面的例子来看：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ulhWEWict5AjY4lib33zqb3VG9Ul8nAjmcbHzl74tXOSficpRNSSNvNCBMvmbmHBZlnx8TkMmDxNy7837YgMWBx3w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**1. 从头对比找到有相同的节点 patch ，发现不同，立即跳出。**

**2. 如果第一步没有patch完，立即，从后往前开始patch ,如果发现不同立即跳出循环。**

**3. 如果新的节点大于老的节点数 ，对于剩下的节点全部以新的vnode处理（这种情况说明已经patch完相同的vnode）。**

**4. 对于老的节点大于新的节点的情况 ， 对于超出的节点全部卸载（这种情况说明已经patch完相同的vnode）。**

**5. 不确定的元素（这种情况说明没有patch完相同的vnode） 与 3 ，4对立关系。**

前面的逻辑跟vue2还是比较像，逐渐向中间收缩，那么关键点就在判断哪些节点是需要变动的。

在经历上述操作后，会出现以下节点需要判断（即图中圈起来的节点）：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ulhWEWict5AjY4lib33zqb3VG9Ul8nAjmcNTVeEW6mx9pApibCZKULDEQ05Vlr6VRiaibMaicOMkd9JXOKhU6rj2iaozQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

首先，我们以**新节点**的数量创建一个 `source` 数组，并用 **-1** 填满；

这个`source`数组就是用来做新旧节点的对应关系的，我们将**新节点**在**旧列表**的位置存储在该数组中，我们再根据`source`计算出它的`最长递增子序列`用于移动DOM节点。

其次，我们先建立一个对象存储当前**新列表**中的`节点`与`index`的关系：

```
const newVNodeMap = {
    c: '1', 
    d: '2',
    b: '3',
    i: '4'
}
```

然后再去**旧列表**中去找相同的节点，并记录其`index`的位置。

在找节点时，**如果旧节点在新列表中没有的话，直接删除就好**。除此之外，我们还需要一个数量表示记录我们已经`patch`过的节点，如果数量已经与**新列表**剩余的节点数量一样，那么剩下的`旧节点`我们就直接删除了就可以了。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ulhWEWict5AjY4lib33zqb3VG9Ul8nAjmcTUJbf9JlpufTNUHHQbwG8MkJwtvnJuaDiaz5vQfhpucJ0shADHBqR6g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### Dom如何移动？

首先，我们需要定义一个Lis数组来存储source中的最长连续递增子序列的下标：-  然后从后往前遍历 **source** 数组；这个过程中会发生**三种情况**：

- 当前数值为 **-1** ，也就说明该节点是**新增**的，我们直接将其插入到队尾就好了，同时 **i--。**
- 当前的索引和 Lis 中的值一致，即 **i == Lis[j]** ，同时 **i --, j --。**
- 当前的索引**不是 Lis 中的值**，那么该节点就需要进行移动，我们只需要将该节点**插入到队尾**就可以了，因为队尾是排好序的。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ulhWEWict5AjY4lib33zqb3VG9Ul8nAjmcibD5DZ4vqBibH6cHpnVAL0OJ2J8pvd4gtBLZicb4Lw2TXOgB2C9spqINg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

***tips：没看懂这三种情况？不要慌：***

我们来一步一步拆解：

1. 首先，i = 3，即上图中，**值为 -1** 为第一种情况，节点需要新增，**i--**；

![图片](https://mmbiz.qpic.cn/mmbiz_png/ulhWEWict5AjY4lib33zqb3VG9Ul8nAjmcZ4dqyCM8WYVwxJwIXIR8d4aakHiboPCNeQkwTK6mIahsAHwLZCWUV6A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

1. i = 2，索引为 **2 != Lis[j]** ****为第三种情况，**节点需要移动**，直接在旧列表中，将b节点**插入到尾部**位置，**i --**

![图片](https://mmbiz.qpic.cn/mmbiz_png/ulhWEWict5AjY4lib33zqb3VG9Ul8nAjmcWdkCBia7jzibevU9CCxAiaraLOfLTKsiaDbG1iaVhn4VqVJfOGkmlIXpWbg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/ulhWEWict5AjY4lib33zqb3VG9Ul8nAjmcOib0ZMHrZ278fvJ0jBuO31LSvRgT0F1RAzo1XCubx81FpeayL31kBWA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

1. i = 1，此时索引 i == Lis[j] 为第二种情况，我们的节点不需要移动；

![图片](https://mmbiz.qpic.cn/mmbiz_png/ulhWEWict5AjY4lib33zqb3VG9Ul8nAjmcHmG6UbfibQkQic8Sicj5HXiaxtcRyqXBFrlkWibUhumicfUgmdCibQMTHibadQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

1. i = 0，此时索引 i == Lis[j] 为第二种情况，我们的节点也不需要移动；

至此 vue3的diff的对比过程就已经完成了，相比于2中的首尾指针法，在这种**非理想情况下**的节点对比采用了**最长递增子序列**的算法思想来做处理；

**这三种情况对应在源码中** **：**

```
function vue3Diff(prevChildren, nextChildren, parent) {
  //...
  if (move) {
    // 需要移动
    const seq = lis(source); // [0, 1]
    let j = seq.length - 1;  // 最长子序列的指针
    // 从后向前遍历
    for (let i = nextLeft - 1；i >= 0; i--) {
      let pos = nextStart + i, // 对应新列表的index
        nextNode = nextChildren[pos], // 找到vnode
        nextPos = pos + 1，    // 下一个节点的位置，用于移动DOM
        refNode = nextPos >= nextChildren.length ? null : nextChildren[nextPos].el, //DOM节点
        cur = source[i];      // 当前source的值，用来判断节点是否需要移动
      if (cur === -1) {
        // 情况1，该节点是全新节点
        mount(nextNode, parent, refNode)
      } else if (cur === seq[j]) {
        // 情况2，是递增子序列，该节点不需要移动
        // 让j指向下一个
        j--
      } else {
        // 情况3，不是递增子序列，该节点需要移动
        parent.insetBefore(nextNode.el, refNode)
      }
    }
  } else {
  // 不需要移动
  for (let i = nextLeft - 1；i >= 0; i--) {
      let cur = source[i];              // 当前source的值，用来判断节点是否需要移动
    
      if (cur === -1) {
       let pos = nextStart + i,         // 对应新列表的index
          nextNode = nextChildren[pos], // 找到vnode
          nextPos = pos + 1，           // 下一个节点的位置，用于移动DOM
          refNode = nextPos >= nextChildren.length ? null : nextChildren[nextPos].el, //DOM节点
          mount(nextNode, parent, refNode)
      }
    }
}
```

你可能会问，你这边递增的子序列需要连续吗，那么这里给你将例子稍微变动一下：这时候你会发现连续递增的节点是 **c, d, e** 他们不是紧密连续的，**但是在整个list中却是保持index递增的，也不需要移动。**

##### 思考题

参考上面的图解，结合源码，看看下面例子中的虚拟dom节点是怎么移动的。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ulhWEWict5AjY4lib33zqb3VG9Ul8nAjmcAlN91TRgZRabBUvJUkILpq4oCrIwLsicF3qQWibsL5H5kiafZnDLHichiaw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### 时间复杂度的优化

这里我们只需要找出source中的最长连续递增子序列 就ok了：

- **最长连续递增子序列**

- 直接放一道leetcode吧：**最长递增子序列**[2]

举个例子：**[10,5,6,7,4,1,2,8,9]**

那么在该此例子中，连续递增的子序列是 **[5,6,7,8,9],** 所以返回的个数是5；

可以参考该算法的基础实现：

```
const arr = [10,5,6,7,4,1,2,8,9]
function lis(arr) {
  let len = arr.length,
    dp = new Array(len).fill(1); // 用于保存长度
  // i = 0 => O(n^2) ;  i != 0 =>  O(nlogn)
  for (let i = len - 1; i >= 0; i--) { 
    let cur = arr[i]
    for(let j = i + 1; j < len; j++) {
      let next = arr[j]
      // 如果是递增 取更大的长度值
      if (cur < next) dp[i] = Math.max(dp[j]+1, dp[i])
    }
  }
  return Math.max(...dp)
}
lis(arr) // 5
```

由算法可以看出：在最好的情况下即 **`i != 0`** 的条件下，平均的时间复杂度是**O(nlgn)** 那么在 **`i = 0`** 时，时间复杂度为**O(n^2)**

在vue2中关于的这种节点的查找和替换的时间复杂度稳定为**O(n^2)**

在vue3中依赖于最长递增子序列去做节点的移动和删除/新增，时间复杂度为**O(nlgn)～O(n^2)**

- 至此vue3.0的diff算法大致理念以及概括完了，如果想要深入了解可以去阅读以下源码部分

- **vue3 diff 源码**[3]

## 四、key值的作用

> 为什么不能使用index作为key值？

### key的作用--性能更高

> 在Vue中判断节点是否可复用都是以key值作为判断的前提条件，如果不使用key值判断，会默认更新所有节点，而Vue中组件的更新过程也是极其复杂的，所以会造成一些不必要性能的成本；所以key可以更高效的帮助我们判断节点的可复用性。

### 为什么不能使用index作为key？

很简单，来看个例子：

```
<ul>                      <ul>
    <li key= 0 >a</li>        <li key= 0 >new</li>  // 新增
    <li key= 1 >b</li>        <li key= 1 >a</li>
    <li key= 2 >c</li>        <li key= 2 >b</li>
                              <li key= 3 >c</li></ul>                                               
</ul>
```

按理来说，我们应该会复用里面的 **a、b、c** 三个节点对吧；

![图片](https://mmbiz.qpic.cn/mmbiz_png/ulhWEWict5AjY4lib33zqb3VG9Ul8nAjmcPmUUqq816JOGvfQ6qhfa9Hb9PDiawhn7vD1frB4FFsTaz3deCnvl3YA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

看这个例子，我们直接**unshift()** 插入列表一个新元素，**这时候index发生了变化！！即key也会发生变化！！**

但是我们知道：按照Vue中的比较思路，这样的话，我们就无法复用哪些本来可以复用的节点，导致该节点被重新渲染一次，造成vue组件内一些列的更新，如果列表一旦很大，**开销成本巨大**！

![图片](https://mmbiz.qpic.cn/mmbiz_png/ulhWEWict5AjY4lib33zqb3VG9Ul8nAjmczroLictUVaVMhwSjH2rv588yiaQHnZ6D6o5gLO44Bbwhxib6a6tlaR8tQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

只要此时你的列表是一个**动态的列表**：而且使用了**index作为key值**，当你**新增**或者**删除**列表时候，key的排序总是以0、1、2、3...去排序的，而这样也会导致列表元素的**key值在不断变化**；导致 Vue 不能准确的找到可复用的节点，而是去**直接做了patch操作**，造成很多额外的工作。

### 解决办法--唯一值

这也是我们为什么要用一个唯一的值去作为列表的key值的原因了！所以我们一般可以用id/唯一值作为key，这是规范问题，所以大家以后再看到项目中有index作为key的情况，请让他去学习diff算法吧哈哈哈！

所以在学习了diff之后要警示我们：

- 1、key值要选择一个**唯一值**，通常用**id来做key**

- 2、不要做一些无谓的dom结构修改或者跨层级去操作一些dom

# Vue 30道面试题

## 了解过（用过）react或者angular吗，他们有什么区别？

**答案**

`Vue` 借鉴了` angular` 的模板和数据绑定技术，又借鉴了` react` 的组件化和虚拟` DOM` 技术。

😶对` Vue` 比较熟一些是吧~（这里只说` Vue` 假设你就只熟练` Vue` ）

## 那首先谈谈你对Vue的理解吧？

**答案**

**官网介绍：** **cn.vuejs.org/index.html****[1]**

**关键点：** 渐进式` JavaScript` 框架、核心库加插件、动态创建用户界面（异步获取后台数据，数据展示在界面）

**特点：** `MVVM` 模式；代码简洁体积小，运行效率高，适合移动PC端开发；本身只关注` UI` （和` react` 相似），可以轻松引入 `Vue` 插件或其他的第三方库进行开发。

🌸思考一下自己所说的那些点，自己都非常清楚明白吗？

下面呢我就根据你对` vue` 的理解，接着谈谈：

## 你刚刚说到了MVVM，能详细说说吗？

**答案**

全称：` Model-View-ViewModel` ，` Model` 表示数据模型层。` view` 表示视图层，` ViewModel` 是` View` 和` Model` 层的桥梁，数据绑定到` viewModel` 层并自动渲染到页面中，视图变化通知` viewModel` 层更新数据。

😶摸底差不多，问基础了，响应式数据得知道吧，问一问

## vue是如何实现响应式数据的呢？（响应式数据原理）❗

**答案**

Vue2：` Object.defineProperty` 重新定义` data` 中所有的属性，` Object.defineProperty` 可以使数据的获取与设置增加一个拦截的功能，拦截属性的获取，进行依赖收集。拦截属性的更新操作，进行通知。

具体的过程：首先Vue使用 `initData` 初始化用户传入的参数，然后使用 `new Observer` 对数据进行观测，如果数据是一个对象类型就会调用` this.walk（value）` 对对象进行处理，内部使用 `defineeReactive` 循环对象属性定义响应式变化，核心就是使用` Object.defineProperty` 重新定义数据。

![图片](https://mmbiz.qpic.cn/mmbiz/TZL4BdZpLdjE6lcuCbD0gecU0gT0dGVDEowAl1GMyK09OZuib918zDwg0BqcLFM9DeXOUnqOibCcWQWzoWEW7j3A/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)

🌸刚刚如果你说了对象的检测，然后又没说清楚数组的处理的话，我就会问下面这个问题

## 那vue中是如何检测数组变化的呢？

**答案**

数组就是使用` object.defineProperty` 重新定义数组的每一项，那能引起数组变化的方法我们都是知道的，` pop` 、` push` 、` shift` 、` unshift` 、` splice` 、` sort` 、` reverse` 这七种，只要这些方法执行改了数组内容，我就更新内容就好了，是不是很好理解。

1. 是用来函数劫持的方式，重写了数组方法，具体呢就是更改了数组的原型，更改成自己的，用户调数组的一些方法的时候，走的就是自己的方法，然后通知视图去更新。
2. 数组里每一项可能是对象，那么我就是会对数组的每一项进行观测，（且只有数组里的对象才能进行观测，观测过的也不会进行观测）

vue3：改用` proxy` ，可直接监听对象数组的变化。

## 那你说说Vue的事件绑定原理吧

**答案**

- 原生` DOM` 的绑定：Vue在创建真实DOM时会调用` createElm` ，默认会调用` invokeCreateHooks` 。会遍历当前平台下相对的属性处理代码，其中就有` updateDOMListeners` 方法，内部会传入` add（）` 方法
- 组件绑定事件，原生事件，自定义事件；组件绑定之间是通过Vue中自定义的` $on` 方法实现的。 （可以理解为：组件的` nativeOnOn` 等价于 普通元素on 组件的on会单独处理）

## v-model中的实现原理及如何自定义v-model ❗

**答案**

`v-model` 可以看成是` value+input` 方法的语法糖（组件）。原生的` v-model` ，会根据标签的不同生成不同的事件与属性。解析一个指令来。

自定义：自己写` model` 属性，里面放上` prop` 和` event`

👍还行哟~知道响应式数据和数据绑定问完了，接着问问渲染呗：

## 为什么Vue采用异步渲染呢？

**答案**

`Vue` 是组件级更新，如果不采用异步更新，那么每次更新数据都会对当前组件进行重新渲染，所以为了性能，` Vue` 会在本轮数据更新后，在异步更新视图。核心思想` nextTick` 。

`dep.notify（）` 通知 watcher进行更新，` subs[i].update` 依次调用 watcher 的` update` ，` queueWatcher` 将watcher 去重放入队列， nextTick（` flushSchedulerQueue` ）在下一tick中刷新watcher队列（异步）。

🌸接着追问，要是你nextTick都能讲得很清楚的话那基本你是明白了。

## 了解nextTick吗？

**答案**

异步方法，异步渲染最后一步，与JS事件循环联系紧密。主要使用了宏任务微任务（`setTimeout`、`promise`那些），定义了一个异步方法，多次调用`nextTick`会将方法存入队列，通过异步方法清空当前队列。

可以的可以的，先问你个生命周期，我再想想怎么难住你😄

## 说说Vue的生命周期吧 ❗

**答案**

**什么时候被调用？**

- beforeCreate ：实例初始化之后，数据观测之前调用
- created：实例创建万之后调用。实例完成：数据观测、属性和方法的运算、` watch/event` 事件回调。无` $el` .
- beforeMount：在挂载之前调用，相关` render` 函数首次被调用
- mounted：了被新创建的`vm.$el`替换，并挂载到实例上去之后调用改钩子。
- beforeUpdate：数据更新前调用，发生在虚拟DOM重新渲染和打补丁，在这之后会调用改钩子。
- updated：由于数据更改导致的虚拟DOM重新渲染和打补丁，在这之后会调用改钩子。
- beforeDestroy：实例销毁前调用，实例仍然可用。
- destroyed：实例销毁之后调用，调用后，Vue实例指示的所有东西都会解绑，所有事件监听器和所有子实例都会被移除

**每个生命周期内部可以做什么？**

- created：实例已经创建完成，因为他是最早触发的，所以可以进行一些数据、资源的请求。
- mounted：实例已经挂载完成，可以进行一些DOM操作。
- beforeUpdate：可以在这个钩子中进一步的更改状态，不会触发重渲染。
- updated：可以执行依赖于DOM的操作，但是要避免更改状态，可能会导致更新无线循环。
- destroyed：可以执行一些优化操作，清空计时器，解除绑定事件。

**ajax放在哪个生命周期？** ：一般放在` mounted` 中，保证逻辑统一性，因为生命周期是同步执行的，` ajax` 是异步执行的。单数服务端渲染` ssr` 同一放在` created` 中，因为服务端渲染不支持` mounted` 方法。 **什么时候使用beforeDestroy？** ：当前页面使用` $on` ，需要解绑事件。清楚定时器。解除事件绑定，` scroll mousemove` 。

## 父子组件生命周期调用顺序（简单）

**答案**

渲染顺序：先父后子，完成顺序：先子后父

更新顺序：父更新导致子更新，子更新完成后父

销毁顺序：先父后子，完成顺序：先子后父

## Vue组件通信 ❗

**答案**

- 父子间通信:父亲提供数据通过属性` props`传给儿子；儿子通过` $on` 绑父亲的事件，再通过` $emit` 触发自己的事件（发布订阅）
- 利用父子关系` $parent` 、` $children` ， 获取父子组件实例的方法。
- 父组件提供数据，子组件注入。` provide` 、` inject` ，插件用得多。
- `ref` 获取组件实例，调用组件的属性、方法
- 跨组件通信` Event Bus` （Vue.prototype.bus=newVue）其实基于bus = new Vue）其实基于bus=newVue）其实基于on与$emit
- `vuex` 状态管理实现通信

## Vuex 工作原理

**答案**

官网：**vuex.vuejs.org/zh/****[2]**

- Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。

- 状态自管理应用包含以下几个部分：

  ![图片](https://mmbiz.qpic.cn/mmbiz/TZL4BdZpLdjE6lcuCbD0gecU0gT0dGVDBC9UJgU1wCr3TRPt0eSpRjoonfPypryxJgUyLNiaSpCiaLkepBFxMD3A/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)

- - state，驱动应用的数据源；
  - view，以声明方式将 state 映射到视图；
  - actions，响应在 view 上的用户输入导致的状态变化。下图单向数据流示意图：

- vuex，多组件共享状态，因-单向数据流简洁性很容易被破坏：

- - 多个视图依赖于同一状态。
  - 来自不同视图的行为需要变更同一状态。![图片](https://mmbiz.qpic.cn/mmbiz/TZL4BdZpLdjE6lcuCbD0gecU0gT0dGVDaDvaCDCO5rtShrG74PcibW91gxYIfBYkQ6tc7Ich806hAr85hDqibFEQ/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)

问虚拟` DOM` 吧，看你能不能讲清楚从真实` DOM` 到虚拟` DOM` ，再和我说说` diff`

## 如何从真实DOM到虚拟DOM

**答案**

涉及到Vue中的模板编译原理，主要过程：

1. 将模板转换成` ast` 树，` ast` 用对象来描述真实的JS语法（将真实DOM转换成虚拟DOM）
2. 优化树
3. 将` ast` 树生成代码

## 用VNode来描述一个DOM结构

**答案**

虚拟节点就是用一个对象来描述一个真实的DOM元素。首先将` template` （真实DOM）先转成` ast` ，` ast` 树通过` codegen` 生成` render` 函数，` render` 函数里的` _c` 方法将它转为虚拟dom

## diff算法

**答案**

**时间复杂度：** 个树的完全` diff` 算法是一个时间复杂度为` O(n*3）` ，vue进行优化转化成` O(n)` 。

**理解：**

- 最小量更新，` key` 很重要。这个可以是这个节点的唯一标识，告诉` diff` 算法，在更改前后它们是同一个DOM节点

- - 扩展` v-for` 为什么要有` key` ，没有` key` 会暴力复用，举例子的话随便说一个比如移动节点或者增加节点（修改DOM），加` key` 只会移动减少操作DOM。

- 只有是同一个虚拟节点才会进行精细化比较，否则就是暴力删除旧的，插入新的。

- 只进行同层比较，不会进行跨层比较。

**diff算法的优化策略**：四种命中查找，四个指针

1. 旧前与新前（先比开头，后插入和删除节点的这种情况）
2. 旧后与新后（比结尾，前插入或删除的情况）
3. 旧前与新后（头与尾比，此种发生了，涉及移动节点，那么新前指向的节点，移动到旧后之后）
4. 旧后与新前（尾与头比，此种发生了，涉及移动节点，那么新前指向的节点，移动到旧前之前）

--- 问完上面这些如果都能很清楚的话，基本O了 ---

以下的这些简单的概念，你肯定也是没有问题的啦😉

## Computed watch 和 method

**答案**

**computed**：默认`computed`也是一个`watcher`具备缓存，只有当依赖的数据变化时才会计算, 当数据没有变化时, 它会读取缓存数据。如果一个数据依赖于其他数据，使用` computed`

**watch**：每次都需要执行函数。 `watch` 更适用于数据变化时的异步操作。如果需要在某个数据变化时做一些事情，使用watch。

**method**：只要把方法用到模板上了,每次一变化就会重新渲染视图，性能开销大

## v-if 和 v-show 区别

**答案**

- `v-if` 如果条件不成立不会渲染当前指令所在节点的DOM元素
- `v-show` 只是切换当前DOM的显示与隐藏

## v-for和v-if为什么不能连用

**答案**

`v-for` 会比 `v-if` 的优先级更高，连用的话会把` v-if` 的每个元素都添加一下，造成性能问题。

## v-html 会导致哪些问题（简单）

**答案**

- `XSS` 攻击
- `v-html` 会替换标签内部的元素

## 描述组件渲染和更新过程

**答案**

渲染组件时，会通过` vue.extend()` 方法构建子组件的构造函数，并进行实例化。最终手动调用` $mount()` 进行挂载。更新组件时会进行` patchVnode` 流程，核心就是` diff` 算法。

## 组件中的data为什么是函数

**答案**

避免组件中的数据互相影响。同一个组件被复用多次会创建多个实例，如果` data` 是一个对象的话，这些实例用的是同一个构造函数。为了保证组件的数据独立，要求每个组件都必须通过` data` 函数返回一个对象作为组件的状态。

## 为什么要使用异步组件？

**答案**

1. 节省打包出的结果，异步组件分开打包，采用jsonp的方式进行加载，有效解决文件过大的问题。
2. 核心就是包组件定义变成一个函数，依赖` import（）` 语法，可以实现文件的分割加载。 详细的看官方文档：**cn.vuejs.org/v2/guide/co…****[3]**

## action 与 mutation 的区别

**答案**

- `mutation` 是同步更新，` $watch` 严格模式下会报错
- `action` 是异步操作，可以获取数据后调用` mutation` 提交最终数据

## 插槽与作用域插槽的区别

### 插槽

**答案**

- 创建组件虚拟节点时，会将组件儿子的虚拟节点保存起来。当初始化组件时，通过插槽属性将儿子进行分类` {a:[vnode],b[vnode]}`
- 渲染组件时会拿对应的` slot` 属性的节点进行替换操作。（插槽的作用域为父组件）

### 作用域插槽

**答案**

- 作用域插槽在解析的时候不会作为组件的孩子节点。会解析成函数，当子组件渲染时，会调用此函数进行渲染。
- 普通插槽渲染的作用域是父组件，作用域插槽的渲染作用域是当前子组件。

## vue中相同逻辑如何抽离

**答案**

其实就是考察` vue.mixin` 用法，给组件每个生命周期，函数都混入一些公共逻辑。

## 谈谈对keep-alive的了解

**答案**

```
keep-alive` 可以实现组件的缓存，当组件切换时不会对当前组件进行卸载。常用的2个属性` include/exclude` ，2个生命周期` activated` ，` deactivated
```

## Vue性能优化

**答案**

**编码优化**：

- 事件代理
- `keep-alive`
- 拆分组件
- `key` 保证唯一性
- 路由懒加载、异步组件
- 防抖节流

**Vue加载性能优化**

- 第三方模块按需导入（` babel-plugin-component` ）
- 图片懒加载

**用户体验**

- `app-skeleton` 骨架屏
- `shellap` p壳
- `pwa`

**SEO优化**

- 预渲染





# Vite 3 + Vue 3 前端工程化项目

[从 0 搭建 Vite 3 + Vue 3 前端工程化项目 (qq.com)](https://mp.weixin.qq.com/s?__biz=MzI4OTY2MzE0OA==&mid=2247503103&idx=1&sn=840dd1f04c4ba22cc7a9e8f452879ddb&chksm=ec293d3cdb5eb42a26dd54dc63711453720706cc38f94af8e6eec2db7b1ccb1b750d0787eff8&mpshare=1&scene=23&srcid=1122NdWvD8xOx0v58sgM2TQ2&sharer_sharetime=1669098891772&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

#  前言

Vue 3 正式版已经发布有一段时间了，随着 Vite 脚手架注定成为下一代前端工具链，许多用户都想基于 Vite 来构建 Vue 项目，如果想基于 Vite 构建 Vue 3 项目，社区模板完全满足您的需求，如果想构建 Vite 3 + Vue 3 + JavaScript 项目，那社区模板不太能满足您的需求，因为社区模板提供 Vue 3 项目几乎是基于 Vite 2 + TypeScript 构建，对于不熟悉 TypeScript 语言的用户不是很友好，因此接下来从 0 开始手把手带大家搭建一套规范的 Vite 3 + Vue 3 + JavaScript 前端工程化项目环境。

本文章篇幅较长，从以下几个方面展开：

- 基础搭建
- 代码规范
- 提交规范
- 自动部署

> 本项目完整代码托管在 **GitHub 仓库**[1]，欢迎点亮小星星 🌟🌟

# 技术栈

- ⚡️ **Vite 3**[2] - 构建工具（就是快！）
- 🖖 **Vue 3**[3] - 渐进式 JavaScript 框架
- 🚦 **Vue Router**[4] - 官方路由管理器
- 📦 **Pinia**[5] - 值得你喜欢的 Vue Store
- 💻 **TDesign**[6] - TDesign 适配桌面端的组件库
- 🎨 **Less**[7] - CSS 预处理器
- 🔗 **Axios**[8] - 一个基于 promise 的网络请求库，可以用于浏览器和 node.js
- 🧰 **Husky**[9] + **Lint-Staged**[10] - Git Hook 工具
- 🛡️ **EditorConfig**[11] + **ESLint**[12] + **Prettier**[13] + **Stylelint**[14] - 代码规范
- 🔨 **Commitizen**[15] + **Commitlint**[16] - 提交规范
- 💡 **GitHub Actions**[17] - 自动部署

# 基础搭建

## 构建项目雏形

确保你安装了最新版本的 **Node.js**，然后在命令行中运行以下命令：

```sh
# npm 6.x
npm create vite@latest vite-vue-js-template --template vue

# npm 7+, extra double-dash is needed:(本次使用它进行创建)
npm create vite@latest vite-vue-js-template -- --template vue

# yarn
yarn create vite vite-vue-js-template --template vue

# pnpm
pnpm create vite vite-vue-js-template --template vue
```

这一指令将会安装并执行 **create-vite**，它是一个基本模板快速启动项目工具。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211221956927.png" alt="image-20221122195654856" style="zoom:80%;" />

在项目被创建后，通过以下步骤安装依赖并启动开发服务器：

```sh
# 打开项目
cd <your-project-name>

# 安装依赖
npm install

# 启动项目
npm run dev
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211221958917.png" alt="image-20221122195805864" style="zoom:67%;" />

## Vite 基础配置

Vite 配置文件 `vite.config.js` 位于项目根目录下，项目启动时会自动读取。

本项目针对公共基础路径、自定义路径别名、服务器选项、构建选项等做了如下基础配置：

```js
import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    base: './',
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src') ,
      },
    },
    server: {
      // 是否开启 https
      https: false,
      // 端口号
      port: 3000,
      // 监听所有地址
      host: '0.0.0.0',
      // 服务启动时是否自动打开浏览器
      open: true,
      // 允许跨域
      cors: true,
      // 自定义代理规则
      proxy: {},
    },
    build: {
      // 设置最终构建的浏览器兼容目标
      target: 'es2015',
      // 构建后是否生成 source map 文件
      sourcemap: false,
      //  chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2000,
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: false,
    },
});
```

关于 Vite 更多配置项及用法，请查看 Vite 官网 **vitejs.dev/config/**

## 规范目录结构

```js
├── dist/
└── src/
    ├── api/                       // 接口请求目录
    ├── assets/                    // 静态资源目录
    ├── common/                    // 通用类库目录
    ├── components/                // 公共组件目录
    ├── router/                    // 路由配置目录
    ├── store/                     // 状态管理目录
    ├── style/                     // 通用样式目录
    ├── utils/                     // 工具函数目录
    ├── views/                     // 页面组件目录
    ├── App.vue
    ├── main.js
├── tests/                         // 单元测试目录
├── index.html
├── jsconfig.json                  // JavaScript 配置文件
├── vite.config.js                 // Vite 配置文件
└── package.json
```

## 集成 Vue Router4 路由

### 安装依赖

```sh
npm i vue-router@4
```

### 创建基本组件

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211222018730.png" alt="image-20221122201819597" style="zoom:80%;" />

```vue
<template>
<div>
  <h3>AboutView</h3>
</div>
</template>
```

```vue
<template>
  <div>
    <h3>HomeView</h3>
  </div>
</template>
```

### 创建路由配置文件

在 `src/router` 目录下新建 `index.js` 文件与 `modules` 文件夹

```js
└── src/
    ├── router/
    	├── modules/  // 路由模块
        ├── index.js  // 路由配置文件
```

- 

关于路由表，建议根据功能的不同来拆分到 `modules` 文件夹中，好处是：方便后期维护,减少 Git 合并代码冲突可能性

> 创建modules/base.js，写入如下路由内容

```js
export default [
    {
      path: '/',
      redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('./../../views/HomeView.vue'),
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('./../../views/AboutView.vue'),
    },
];
```

在index.js中，进行路由基本配置

```js
import { createRouter, createWebHistory } from 'vue-router';

import baseRouters from './modules/base.js';

const routes = [...baseRouters];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior() {
        return {
            el: '#app',
            top: 0,
            behavior: 'smooth',
        };
    },
});

export default router;
```

根据路由配置的实际情况，需要在 `src` 下创建 `views` 目录，用来存储页面组件。

### 挂载路由配置

在 `main.js` 文件中挂载路由配置

```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from "./router";

const app = createApp(App)
// 挂载路由模块，app.use用于挂载第三方插件模块
app.use(router)
app.mount('#app')
```

### 定义路由占位符

> App.vue中定义路由占位符

```vue
<template>
  <div>
    <!-- 路由的占位符 -->
    <router-view></router-view>
  </div>
</template>
```

### 访问测试

访问路径：:3000/

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211222021480.png" alt="image-20221122202151365" style="zoom:80%;" />



## 集成 Pinia 全局状态管理

### 安装依赖

```
npm i pinia
```

### 创建仓库配置文件

在 `src/store` 目录下新建 `index.js` 文件与 `modules` 文件夹

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211222035870.png" alt="image-20221122203554732" style="zoom:80%;" />

开发中需要将不同功能所对应的状态，拆分到不同的 `modules`，好处如同路由模块一样。

counter.js

```js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
    state: () => ({
        count: 1,
    }),
    actions: {
        accumulate() {
            this.count++;
        },
    },
});
```

index.js

```js
import { createPinia } from 'pinia';

const store = createPinia();

export default store;

export * from './modules/counter';
```

### 挂载 Pinia 配置

在 `main.js` 文件中挂载 `Vuex` 配置

```js
import { createApp } from 'vue';

import App from './App.vue';
import store from './store';
import router from './router';

createApp(App).use(router).use(store).mount('#app');
```

### 测试Pinia

在HomeView.vue页面

```vue
<template>
  <div>
    <h3>HomeView111</h3>
    <h3>{{store}}</h3>
  </div>
</template>
```

```js
import {useCounterStore} from './../store/index.js'
export default {
  name: "HomeView",
  data() {
    return {
      store: useCounterStore()
    }
  }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211222038025.png" alt="image-20221122203839887" style="zoom:80%;" />

## 集成 TDesign Vue Next 组件库

### 安装依赖

```sh
npm i tdesign-vue-next
```

### 基础使用

> main.js中进行配置

```js
import { createApp } from 'vue';

import TDesign from 'tdesign-vue-next';

// 引入组件库全局样式资源
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App);
app.use(TDesign);
```

### 按需引入

使用 `unplugin-vue-components` 和 `unplugin-auto-import` 来实现自动导入：

```sh
npm install unplugin-vue-components unplugin-auto-import -D
```

在 Vite 对应的配置文件 `vite.config.js` 添加上述插件：

```js
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';

export default {
  plugins: [
    AutoImport({
      resolvers: [TDesignResolver({
        library: 'vue-next'
      })],
    }),
    Components({
      resolvers: [TDesignResolver({
        library: 'vue-next'
      })],
    }),
  ],
};
```

### 使用测试

```vue
<template>
  <div>
    <h3>HomeView111</h3>
    <!--<h3>{{store}}</h3>-->
    <t-space direction="vertical" align="center">
      <t-button block theme="primary" variant="base">填充按钮</t-button>
      <t-button block variant="outline">描边按钮</t-button>
      <t-button block variant="dashed">虚框按钮</t-button>
      <t-button block variant="text">文字按钮</t-button>
    </t-space>
  </div>
</template>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211222046947.png" alt="image-20221122204643795" style="zoom:67%;" />

## 集成 Axios HTTP 工具

### 安装依赖

```sh
npm i axios
```

### 请求配置

在 `utils` 目录下创建 `request.js` 文件，配置好适合自己业务的请求拦截和响应拦截：

```js
└── src/
	├── api  // 接口
    ├── utils/
        ├── request.js  // axios 请求库二次封装
```

request.js中口进行如下配置

```js
import axios from 'axios';

// 创建请求实例
const instance = axios.create({
    baseURL: ':8080/',
    // 指定请求超时的毫秒数
    timeout: 1000,
    // 表示跨域请求时是否需要使用凭证
    withCredentials: false,
});

// 前置拦截器（发起请求之前的拦截）
instance.interceptors.request.use((config) => {
        /**
         * 在这里一般会携带前台的参数发送给后台，比如下面这段代码：
         * const token = getToken()
         * if (token) {
         *  config.headers.token = token
         * }
         */
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// 后置拦截器（获取到响应时的拦截）
instance.interceptors.response.use((response) => {
        /**
         * 根据你的项目实际情况来对 response 和 error 做处理
         * 这里对 response 和 error 不做任何处理，直接返回
         */
        return response;
    },
    (error) => {
        const { response } = error;
        if (response && response.data) {
            return Promise.reject(error);
        }
        const { message } = error;
        console.error(message);
        return Promise.reject(error);
    },
);

// 导出常用函数

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function post(url, data = {}, params = {}) {
    return instance({
        method: 'post',
        url,
        data,
        params,
    });
}

/**
 * @param {string} url
 * @param {object} params
 */
export function get(url, params = {}) {
    return instance({
        method: 'get',
        url,
        params,
    });
}

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function put(url, data = {}, params = {}) {
    return instance({
        method: 'put',
        url,
        params,
        data,
    });
}

/**
 * @param {string} url
 * @param {object} params
 */
export function _delete(url, params = {}) {
    return instance({
        method: 'delete',
        url,
        params,
    });
}

export default instance;
```

之后在 `api` 文件夹中以业务模型对接口进行拆分，举个例子，将所有跟用户相关接口封装在 `User` 类中，此类称作用户模型。在 `User` 类中比如有登录、注册、获取用户信息等方法，如果有业务逻辑变动，只需要修改相关方法即可。

> api/user.js

```js
import { post } from '@/utils/request.js';

export default class User {
  /**
   * 登录
   * @param {String} username 用户名
   * @param {String} password 密码
   * @returns
   */
  static async login(username, password) {
    return post('/login', {
      username,
      password,
    });
  }
}
```

把每个业务模型独立成一个 js 文件，声明一个类通过其属性和方法来实现这个模型相关的数据获取，这样可以大大提升代码的可读性与可维护性。

### 后端接口

```java
@Data
public class User1 {
    private String username;
    private String password;
}
```

```java
@RestController
@CrossOrigin
public class HelloController {

    @PostMapping("login")
    public User1 login(@RequestBody User1 user) {
        System.out.println(user);
        return user;
    }
}
```

### 模拟演示

在需要使用接口的地方，引入对应的业务模型文件，参考如下：

```vue
<template>
  <div>
    <h3>HomeView111</h3>
    <button @click="login">post</button>
  </div>
</template>
```

```js
<script>
import User from '@/api/user.js';

export default {
  data() {
    return {
      username: 'admin',
      password: '12321',
    };
  },
  methods: {
    async login() {
      const res = await User.login(this.username, this.password);
      console.log(res);
    },
  },
};
</script>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211222104605.png" alt="image-20221122210406447" style="zoom:80%;" />

## 集成 CSS 预处理器 Less

本项目使用 CSS 预处理器 Less，直接安装为开发依赖即可。

Vite 内部已帮我们集成了相关的 `loader`，不需要额外配置。

### 安装依赖

```sh
npm i less -D
```

### 如何使用

在 `<style></style>` 样式标签中引用 `lang="less"` 即可。

```less
<style lang="less"></style>
```

> CSS 命名规范推荐 BEM 命名规范，参考链接：**CSS BEM 书写规范**[21]

### 全局样式

在 `src/style` 目录下创建 `variables.less` 全局样式文件：

```
└── src/
    ├── style/
        ├── variables.less  // 全局样式文件
```

在 `vite.config.js` 配置文件中新增CSS 预处理器相关配置即可实现 less 全局样式：

```js
import { resolve } from 'path';

export default defineConfig({
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/style/variables.less')}";`,
          },
          math: 'strict',
          javascriptEnabled: true,
        },
      },
    },
});
```

### 样式穿透

在 Vue3 中，改变了以往样式穿透的语法，如果继续使用 `::v-deep`、`/deep/`、`>>>` 等语法的话，会出现一个警告，下面是新的语法：

```less
/* 深度选择器 */
:deep(selector) {
  /* ... */
}

/* 插槽选择器 */
:slotted(selector) {
  /* ... */
}

/* 全局选择器 */
:global(selector) {
  /* ... */
}
```

至此，一个基于 JavaScript + Vite3 + Vue3 + Vue Router + Pinia + Axios + Less 的前端项目开发环境搭建完毕。

项目托管在 **GitHub 仓库**[23]，需要的同学可以去下载下来，参考学习。

接下来增加代码规范约束、提交规范约束、单元测试、自动部署等，让其更完善、更健壮。

# 代码规范

随着前端应用逐渐变得大型化和复杂化，在同一个项目中有多个人员参与时，每个人的前端能力程度不等，他们往往会用不同的编码风格和习惯在项目中写代码，长此下去，势必会让项目的健壮性越来越差。解决这些问题，理论上讲，口头约定和代码审查都可以，但是这种方式无法实时反馈，而且沟通成本过高，不够灵活，更关键的是无法把控。不以规矩，不能成方圆，我们不得不在项目使用一些工具来约束代码规范。

本文讲解如何使用 **EditorConfig + ESLint + Prettier + Stylelint** 组合来实现代码规范化。

这样做带来好处：

- 解决团队之间代码不规范导致的可读性差和可维护性差的问题。
- 解决团队成员不同编辑器导致的编码规范不统一问题。
- 提前发现代码风格问题，给出对应规范提示，及时修复。
- 减少代码审查过程中反反复复的修改过程，节约时间。
- 自动格式化，统一编码风格，从此和脏乱差的代码说再见。

## 集成 EditorConfig 配置

**EditorConfig** 主要用于统一不同 IDE 编辑器的编码风格。

在项目根目录下添加 `.editorconfig` 文件：

```sh
# 表示是最顶层的 EditorConfig 配置文件
root = true

# 表示所有文件适用
[*]
# 缩进风格（tab | space）
indent_style = space
# 控制换行类型(lf | cr | crlf)
end_of_line = lf
# 设置文件字符集为 utf-8
charset = utf-8
# 去除行首的任意空白字符
trim_trailing_whitespace = true
# 始终在文件末尾插入一个新行
insert_final_newline = true

# 表示仅 md 文件适用以下规则
[*.md]
max_line_length = off
trim_trailing_whitespace = false

# 表示仅 ts、js、vue、css 文件适用以下规则
[*.{ts,js,vue,css}]
indent_size = 2
```

> 很多 IDE 中会默认支持此配置，但是也有些不支持，如：VSCode、Atom、Sublime Text 等。
>
> 具体列表可以参考官网，如果在 VSCode 中使用需要安装 `EditorConfig for VS Code` 插件。

EditorConfig for VS Code

## 集成 ESLint 配置

**ESLint** 是针对 EScript 的一款代码检测工具，它可以检测项目中编写不规范的代码，如果写出不符合规范的代码会被警告。由此我们就可以借助于 ESLint 强大的功能来统一团队的编码规范。

### 安装依赖

- **`ESLint`**[26] - ESLint 本体
- **`eslint-define-config`**[27] - 改善 ESLint 规范编写体验
- **`eslint-plugin-vue`**[28] - 适用于 Vue 文件的 ESLint 插件
- **`eslint-config-airbnb-base`**[29] - Airbnb JavaScript 风格指南
- **`eslint-plugin-import`**[30] - 使用 `eslint-config-airbnb-base` 时必须安装的前置插件
- **`vue-eslint-parser`**[31] - 使用 `eslint-plugin-vue` 时必须安装的 ESLint 解析器

```
npm i eslint eslint-define-config eslint-config-airbnb-base eslint-plugin-import eslint-plugin-vue vue-eslint-parser -D
```

### 安装插件

Visual Studio Code 编辑器使用 `ESLint` 配置需要下载插件 **ESLint** 。

JetBrains 系列编辑器（WebStorm、IntelliJ IDEA 等）则不用额外安装插件。

### 创建 ESLint 配置文件

在项目根目录创建 `.eslintrc.js` 文件，并填入以下内容：

```js
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  plugins: ['vue'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // 禁止使用多余的包
    'import/no-extraneous-dependencies': 0,
    // 确保在导入路径内一致使用文件扩展名
    'import/extensions': 0,
    // 确保导入指向可以解析的文件/模块
    'import/no-unresolved': 0,
    // 首选默认导出导入/首选默认导出
    'import/prefer-default-export': 0,
    // 要求使用 let 或 const 而不是 var
    'no-var': 'error',
    // 禁止使用 new 以避免产生副作用
    'no-new': 1,
    // 禁止变量声明与外层作用域的变量同名
    'no-shadow': 0,
    // 禁用 console
    'no-console': 0,
    // 禁止标识符中有悬空下划线
    'no-underscore-dangle': 0,
    // 禁止在可能与比较操作符相混淆的地方使用箭头函数
    'no-confusing-arrow': 0,
    // 禁用一元操作符 ++ 和 --
    'no-plusplus': 0,
    // 禁止对 function 的参数进行重新赋值
    'no-param-reassign': 0,
    // 禁用特定的语法
    'no-restricted-syntax': 0,
    // 禁止在变量定义之前使用它们
    'no-use-before-define': 0,
    // 禁止直接调用 Object.prototypes 的内置属性
    'no-prototype-builtins': 0,
    // 禁止可以在有更简单的可替代的表达式时使用三元操作符
    'no-unneeded-ternary': 'error',
    // 禁止重复模块导入
    'no-duplicate-imports': 'error',
    // 禁止在对象中使用不必要的计算属性
    'no-useless-computed-key': 'error',
    // 强制使用一致的缩进
    indent: ['error', 2],
    // 强制使用骆驼拼写法命名约定
    camelcase: 0,
    // 强制类方法使用 this
    'class-methods-use-this': 0,
    // 要求构造函数首字母大写
    'new-cap': 0,
    // 强制一致地使用 function 声明或表达式
    'func-style': 0,
    // 强制一行的最大长度
    'max-len': 0,
    // 要求 return 语句要么总是指定返回的值，要么不指定
    'consistent-return': 0,
    // 强制switch要有default分支
    'default-case': 2,
    // 强制剩余和扩展运算符及其表达式之间有空格
    'rest-spread-spacing': 'error',
    // 要求使用 const 声明那些声明后不再被修改的变量
    'prefer-const': 'error',
    // 强制箭头函数的箭头前后使用一致的空格
    'arrow-spacing': 'error',
  },
    overrides: [
    {
      files: ['*.vue'],
      rules: {
        // 要求组件名称总是多个单词
        'vue/multi-word-component-names': 0,
      },
    },
  ],
});
```

> 关于更多配置项信息，请前往 ESLint 官网查看 **ESLint-Configuring**

### 创建 ESLint 过滤规则

在项目根目录添加一个 `.eslintignore` 文件，内容如下：

```
dist
node_modules
!.prettierrc.js
```

## 集成 Prettier 配置

**Prettier**[33] 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。

### 安装依赖

```
npm i prettier -D
```

### 安装插件

Visual Studio Code 编辑器使用 `Prettier` 配置需要下载插件 **Prettier - Code formatter** 。

Prettier - Code formatter

JetBrains 系列编辑器（WebStorm、IntelliJ IDEA 等）则不用额外安装插件，可直接使用 `Prettier` 配置。

### 创建 Prettier 配置文件

Prettier 支持多种格式的**配置文件**[34]，比如 `.json`、`.yml`、`.yaml`、`.js`等。

在项目根目录创建 `.prettierrc.js` 文件，并填入以下内容：

```js
module.exports = {
  // 一行最多 120 字符
  printWidth: 120,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾需要有逗号
  trailingComma: 'all',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // vue 文件中的 script 和 style 内不用缩进
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf
  endOfLine: 'lf',
  // 格式化嵌入的内容
  embeddedLanguageFormatting: 'auto',
  // html, vue, jsx 中每个属性占一行
  singleAttributePerLine: false,
};
```

> 关于更多配置项信息，请前往 Prettier 官网查看 **Prettier-Options**[35]

### 创建 Prettier 过滤规则

在项目根目录添加一个 `.prettierignore` 文件，内容如下：

```js
## OS
.DS_Store
.idea
.editorconfig
pnpm-lock.yaml
.npmrc

# Ignored suffix
*.log
*.md
*.svg
*.png
*.ico
*ignore

## Local
.husky

## Built-files
.cache
dist
```

## 解决 Prettier 和 ESLint 冲突

本项目中的 ESLint 配置使用了 Airbnb JavaScript 风格指南校验，其规则之一是_代码结束后面要加分号_，而在 Prettier 配置文件中加了_代码结束后面不加分号_配置项，从而冲突了。

解决两者冲突问题，需要用到 **eslint-plugin-prettier** 和 **eslint-config-prettier**。

- `eslint-plugin-prettier` 将 Prettier 的规则设置到 ESLint 的规则中
- `eslint-config-prettier` 关闭 ESLint 中与 Prettier 中会发生冲突的规则

最后形成优先级：`Prettier 配置规则` > `ESLint 配置规则`

### 安装依赖

```
npm i eslint-plugin-prettier eslint-config-prettier -D
复制代码
```

### 修改 ESLint 配置文件

修改 `.eslintrc.js` 文件，在 `extends` 中添加 `plugin:prettier/recommended` 规则（此规则一定要加在最后）。

```
module.exports = {
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended'
  ],
}
```

## 自动格式化代码

Visual Studio Code 在 `settings.json` 设置文件中，增加以下代码：

```
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
  }
}
```

WebStorm 打开设置窗口，按如下操作，最后点击 `Apply` -> `OK`：

## 集成 Stylelint 配置

Stylelint 是一个强大、先进的 CSS 代码检查器（linter），可以帮助你规避 CSS 代码中的错误并保持一致的编码风格。

### 安装依赖

- **`Stylelint`**[36] - Stylelint 本体
- **`stylelint-config-prettier`**[37] - 关闭 Stylelint 中与 Prettier 中会发生冲突的规则
- **`stylelint-config-standard`**[38] - Stylelint 官方推荐规则
- **`stylelint-config-recommended-vue`**[39] - 检验 vue 文件中的样式
- **`stylelint-order`**[40] - CSS 属性顺序规则插件

```
npm i stylelint stylelint-config-prettier stylelint-config-standard stylelint-config-recommended-vue stylelint-order -D
复制代码
```

### 安装插件

Visual Studio Code 编辑器使用 `Stylelint` 配置需要下载插件 **Stylelint** 。

![图片](https://mmbiz.qpic.cn/mmbiz/pfCCZhlbMQTKJwX2UrGjOSEIicyga1nNBBnibibLViaaLE5U9HoxrpIRE4AZnLsKoRKibPQuhPQvLtLNgB4DrbG0sGA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)Stylelint

JetBrains 系列编辑器（WebStorm、IntelliJ IDEA 等）则不用额外安装插件。

### 创建 Stylelint 配置文件

在项目根目录创建 `.stylelintrc.js` 文件，并填入以下内容：

```js
module.exports = {
  root: true,
  defaultSeverity: 'error',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier'
  ],
  plugins: ['stylelint-order'],
  rules: {
    // 不允许未知函数
    'function-no-unknown': null,
    // 指定类选择器的模式
    'selector-class-pattern': null,
    // 禁止空源码
    'no-empty-source': null,
    // 指定字符串使用单引号
    'string-quotes': 'single',
    // 禁止未知的@规则
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'function',
          'if',
          'each',
          'include',
          'mixin',
        ],
      },
    ],
    // 指定@规则名的大小写
    'at-rule-name-case': 'lower',
    // 指定缩进
    indentation: [
      2,
      {
        severity: 'warning',
      },
    ],
    // 禁止未知的伪类选择器
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    // 禁止未知的伪元素选择器
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'font-size',
      'font-family',
      'font-weight',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition',
    ],
  },
}
```

### 创建 Stylelint 过滤规则

在项目根目录添加一个 `.stylelintignore` 文件，内容如下：

```js
# .stylelintignore
# 旧的不需打包的样式库
*.min.css

# 其他类型文件
*.js
*.jpg
*.woff

# 测试和打包目录
/test/
/dist/*
/public/*
public/*
/node_modules/
```

### 启用 Vue 文件支持

`Stylelint` v14 版本默认不支持 vue 文件中的 style 代码自动检测，详情查看**官方迁移指南**[41]

#### 安装依赖

- **`stylelint-config-html`**[42] - 解析 vue 文件
- **`postcss-html`**[43] - 使用 `stylelint-config-html` 依赖的模块
- **`postcss-less`**[44] - 对 less 文件进行解析

```
npm i stylelint-config-html postcss-html postcss-less -D
```

#### 修改 Stylelint 配置文件

修改 `.stylelintrc.js` 文件，添加如下配置：

```js
module.exports = {
  overrides: [
    {
      files: ['*.vue', '**/*.vue', '*.html', '**/*.html'],
      extends: ['stylelint-config-html'],
      rules: {
        // 指定关键帧名称的模式
        'keyframes-name-pattern': null,
        // 禁止未知的伪类选择器
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['deep', 'global'],
          },
        ],
        // 禁止未知的伪元素选择器
        'selector-pseudo-element-no-unknown': [
          true,
          {
            ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'],
          },
        ],
      },
    },
    {
      files: ['*.less', '**/*.less'],
      customSyntax: 'postcss-less',
      extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'],
    },
  ],
};
```

#### 修改 Visual Studio Code 工作区配置

Visual Studio Code 在 `settings.json` 设置文件中，增加以下代码：

```js
{
  "stylelint.validate": ["css", "less", "postcss", "scss", "vue", "sass"]
}
```

## 集成 husky 和 lint-staged

在项目中已集成 ESLint 和 Prettier，在编码时，这些工具可以对代码进行实时校验，在一定程度上能有效规范所写代码，但有些人可能觉得这些限制很麻烦，从而选择视“提示”而不见，依旧按自己编程风格来写代码，或者干脆禁用掉这些工具，开发完成就直接把代码提交到了仓库，日积月累，ESLint 也就形同虚设。

所以，还需要做一些限制，让没通过 ESLint 检测和修复的代码禁止提交，从而保证仓库代码都是符合规范的。

为了解决这个问题，需要用到 Git Hook，在本地执行 `git commit` 的时候，就对所提交的代码进行 ESLint 检测和修复（即执行 `eslint \--fix`），如果这些代码没通过 ESLint 规则校验，则禁止提交。

实现这一功能，需要借助 **husky**[45] + **lint-staged**[46] 。

### 配置 husky

> 注意：本项目使用 husky 6.x 版本，6.x 版本配置方式跟之前版本有较大差异，当发现配置方法不一致时，一切以 **husky 官网**[47]为准。

使用 `husky-init` 命令快速在项目初始化 `husky` 配置：

```
# 初始化仓库
git init

# 初始化
npx husky-init

# 安装依赖
npm install
```

husky 包含很多 `hook`（钩子），常用有：`pre-commit`、`commit-msg`。

使用 `pre-commit` 来触发 ESLint 命令，修改 `.husky/pre-commit` 文件触发命令：

```
eslint --fix ./src --ext .vue,.js,.ts
```

`pre-commit` hook 文件作用是：当执行 `git commit \-m "xxx"` 时，会先对 `src` 目录下所有的 `.vue`、`.js`、`.ts` 文件执行 `eslint \--fix` 命令，如果 ESLint 通过，成功 `commit`，否则终止 `commit`。

但是又存在一个问题：有时候明明只改动了一两个文件，却要对所有的文件执行 `eslint \--fix`。

假如这是一个历史项目，在中途配置了 ESLint 规则，那么在提交代码时，也会对其他未修改的“历史”文件都进行检查，可能会造成大量文件出现 ESLint 错误，显然这不是我们想要的结果。

所以只需要用 ESLint 修复此次写的代码，而不去影响其他的代码，此时需要借助 **lint-staged** 工具。

### 配置 lint-staged

lint-staged 一般结合 husky 来使用，它可以让 husky 的 `hook` 触发的命令只作用于 `git` 暂存区的文件，而不会影响到其他文件。

#### 安装依赖

```
npm i lint-staged -D
```

#### 新增配置

在 `package.json` 里增加 `lint-staged` 配置项：

```
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "prettier --write",
      "eslint --fix"
    ],
    "*.vue": [
      "prettier --write",
      "eslint --fix",
      "stylelint --fix"
    ],
    "*.{html,vue,vss,sass,less}": [
      "prettier --write",
      "stylelint --fix"
    ],
    "package.json": [
      "prettier --write"
    ],
    "*.md": [
      "prettier --write"
    ]
  },
}
```

#### 修改触发命令

修改 `.husky/pre-commit` 文件触发命令为：

```
npx lint-staged
```

![图片](https://mmbiz.qpic.cn/mmbiz/pfCCZhlbMQTKJwX2UrGjOSEIicyga1nNBh2WNXj2HhhbkibgXmYZBgSqHvic2CZVDKV5TXFEkA8wTDITvTycEv42g/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)pre-commit

经过以上配置之后，就可以在每次提交之前对所有代码进行格式化，保证线上代码的规范性。

# 提交规范

多人协作项目中，在提交代码环节，也存在一种情况：不能保证每个人对提交信息的准确描述，因此会出现提交信息紊乱、风格不一致的情况。如果 `git commit` 的描述信息精准，在后期维护和 Bug 处理时会变得有据可查，项目开发周期内还可以根据规范的提交信息快速生成开发日志，从而方便我们追踪项目和把控进度。

社区最流行、最知名、最受认可的 **Angular** 团队提交规范：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211222111877.png" alt="image-20221122211133669" style="zoom:80%;" />

## Commit Message 格式规范

`commit message` 由 Header、Body、Footer 组成。

```
<Header>

<Body>

<Footer>
```

### Header

Header 部分包括三个字段 type（必需）、scope（可选）和 subject（必需）。

```
<type>(<scope>): <subject>
```

**type**

type 用于说明 commit 的提交类型（必须是以下几种之一）。

| 值       | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| feat     | 新增功能                                                     |
| fix      | 修复问题                                                     |
| docs     | 文档变更                                                     |
| style    | 代码格式（不影响功能，例如空格、分号等格式修正）             |
| refactor | 代码重构                                                     |
| perf     | 改善性能                                                     |
| test     | 测试                                                         |
| build    | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等） |
| ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
| chore    | 变更构建流程或辅助工具                                       |
| revert   | 代码回退                                                     |

**scope**

scope 用于指定本次 commit 影响的范围。

scope 依据项目而定，例如在业务项目中可以依据菜单或者功能模块划分，如果是组件库开发，则可以依据组件划分。

**subject**

subject 是本次 commit 的简洁描述，长度约定在 50 个字符以内，通常遵循以下几个规范：

- 用动词开头，第一人称现在时表述，例如：change 代替 changed 或 changes
- 第一个字母小写
- 结尾不加句号（.）

### Body

body 是对本次 commit 的详细描述，可以分成多行。

跟 subject 类似，用动词开头，body 应该说明修改的原因和更改前后的行为对比。

### Footer

如果本次提交的代码是突破性的变更或关闭缺陷，则 Footer 必需，否则可以省略。

- 突破性的变更

  当前代码与上一个版本有突破性改变，则 Footer 以 BREAKING CHANGE 开头，后面是对变动的描述、以及变动的理由。

- 关闭缺陷

  如果当前提交是针对特定的 issue，那么可以在 Footer 部分填写需要关闭的单个 issue 或一系列 issues。

### 参考例子

feat

```
feat(browser): onUrlChange event (popstate/hashchange/polling)

Added new event to browser:
- forward popstate event if available
- forward hashchange event if popstate not available
- do polling when neither popstate nor hashchange available

Breaks $browser.onHashChange, which was removed (use onUrlChange instead)
```

fix

```
fix(compile): couple of unit tests for IE9

Older IEs serialize html uppercased, but IE9 does not...
Would be better to expect case insensitive, unfortunately jasmine does
not allow to user regexps for throw expectations.

Closes #392
Breaks foo.bar api, foo.baz should be used instead
```

style

```
style(location): add couple of missing semi colons
```

chore

```
chore(release): v3.4.2
```

## 集成 cz-git 实现规范提交

> 一款工程性更强，轻量级，高度自定义，标准输出格式的 **commitizen**[50] 适配器
>
> 官方网站：**cz-git**[51]

![图片](https://mmbiz.qpic.cn/mmbiz/pfCCZhlbMQTKJwX2UrGjOSEIicyga1nNBjaaTBbMHy0zXQSAibw601ovBrgkfNvn3IzcrPjiaicPeibDbBJ2kLw0pcQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)cz-git

### 安装依赖

```
npm install -D cz-git
```

### 指定适配器

修改 `package.json` 文件，添加 `config` 指定使用的适配器

```
{
  "scripts": {},
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```

### 自定义配置（可选）

**cz-git 与 commitlint[52] 进行联动给予校验信息**，所以可以编写于 **commitlint**[53] 配置文件之中。

例如：(**⇒ 配置模板**[54])

```
/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {},
  prompt: {
    useEmoji: false,
    emojiAlign: 'center',
    allowCustomIssuePrefixs: false,
    allowEmptyIssuePrefixs: false,
  },
};
```

本项目配置文件可参考：**commitlint.config.js**

### 全局使用

> 全局安装的好处在于：在任何项目下都可以利用 `cz` 或 `git cz` 命令启动命令行工具，生成标准化 commit message

#### 安装全局依赖

```
npm install -g cz-git commitizen
```

#### 全局配置适配器类型

```
echo '{ "path": "cz-git" }' > ~/.czrc
```

#### 自定义配置（可选）

**方式一：** 编辑 `~/.czrc` 文件以 **json** 形式添加配置，例如：

```
{
  "path": "cz-git",
  "useEmoji": true
}
```

**方式二：与 commitlint[56] 配合**，在 `$HOME` 路径下创建配置文件 (**↓ 配置模板**[57])

## 集成 commitlint 验证规范提交

在“代码规范”章节中提到，尽管制定了规范，但在多人协作的项目中，总有些人依旧我行我素。

因此提交代码这个环节，也增加一个限制：**只让符合 Angular 规范的 commit message 通过**。

此功能需借助 `@commitlint/config-conventional` 和 `@commitlint/cli` 工具来实现。

### 安装

- **`@commitlint/cli`**[58] - Commitlint 本体
- **`@commitlint/config-conventional`**[59] - 通用提交规范

```
npm i @commitlint/cli @commitlint/config-conventional -D
```

### 配置

在项目根目录创建 `commitlint.config.js` 文件，并填入以下内容：

```
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

使用 husky 命令在 `.husky` 目录下创建 `commit-msg` 文件，并在此执行验证命令：

```
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

![图片](https://mmbiz.qpic.cn/mmbiz/pfCCZhlbMQTKJwX2UrGjOSEIicyga1nNBoRnnPEKE6fkib6lPzPspF11rwFNMt1ZQo5YJ7T7SzpC9J35dIwonnqg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)commit-msg

> 本项目完整代码托管在 **GitHub 仓库**[60]，欢迎点亮小星星 🌟🌟



# 自动部署

本章节将介绍如何使用 CI（Continuous Integration 持续集成）服务来完成项目部署工作。

常见的 CI 工具有 GitHub Actions、GitLab CI、Travis CI、Circle CI 等。

本项目使用 `GitHub Actions` 来完成这一操作。

🔗 参考链接：**GitHub Actions 入门教程**[61]

## 创建 GitHub 仓库

因为 GitHub Actions 只对 GitHub 仓库有效，所以**创建 GitHub 仓库**[62]来托管项目代码。

![图片](https://mmbiz.qpic.cn/mmbiz/pfCCZhlbMQTKJwX2UrGjOSEIicyga1nNBFcsrwNsevDEDefwNo2icicnoXYhdp6OLwMibQF3LibpkYwiar4t9z2zQopg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)创建 GitHub 仓库

- `master` 分支存储项目源代码
- `gh-pages` 分支存储打包后的静态文件

## 创建 GitHub Token

创建一个有 **repo** 和 **workflow** 权限的 **GitHub Token**[63]

![图片](https://mmbiz.qpic.cn/mmbiz/pfCCZhlbMQTKJwX2UrGjOSEIicyga1nNBNP6vGUMUSXzUgE7ky2EdR8icvKUhNtjbZIZ26NjhglEZKO3bkDBKl5Q/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)创建 GitHub Token

> 注意：新生成的 Token 只会显示一次。

![图片](https://mmbiz.qpic.cn/mmbiz/pfCCZhlbMQTKJwX2UrGjOSEIicyga1nNBQuOE3l0TW8LDib8x311JBJKX3mThmNQZLaANWl482hiaODNMuQhhEWWA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)Token

## 添加 Actions secret

将上述创建的 Token 添加到 GitHub 仓库中的 `Secrets` 里，并将这个新增的 `secret` 命名为 `VITE_VUE_DEPLOY` 。

步骤：仓库 -> `Settings` -> `Secrets` -> `Actions` -> `New repository secret`。

![图片](https://mmbiz.qpic.cn/mmbiz/pfCCZhlbMQTKJwX2UrGjOSEIicyga1nNB11cXYnVM4syD6bg7skjaNL8lLKnILz3rU99VlVvRNnUSAibic2ibyejcg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)New secret

> 注意：新创建的 secret `VITE_VUE_DEPLOY` 在 Actions 配置文件中要用到，两个地方需保持一致！

## 修改 package.json

打开 `package.json` 文件，新增 `homepage` 字段，表示该应用发布后的根目录（参见**官方文档**[64]）。

```
"homepage": "https://[username].github.io/github-actions-demo",
```

上面代码中，将 `[username]` 替换成你的 GitHub 用户名，参见**范例**[65]。

## 创建 Actions 配置文件

（1）在项目根目录下创建 `.github` 目录。

（2）在 `.github` 目录下创建 `workflows` 目录。

（3）在 `workflows` 目录下创建 `deploy.yml` 文件。

![图片](https://mmbiz.qpic.cn/mmbiz/pfCCZhlbMQTKJwX2UrGjOSEIicyga1nNBkmwLaNrdtdPzu97SkWI8vnKWiaiclAkia9ibC6OsUyWWibT1wGqbP2BCcUw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1).github/workflows/deploy.yml

```
name: Vite Vue Deploy

on:
  push:
    # master 分支有 push 时触发
    branches: [master]

jobs:
  deploy:
    # 指定虚拟机环境
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x, 16.x]

    steps:
      - name: Checkout
        # 拉取 GitHub 仓库代码
        uses: actions/checkout@v3

      - name: Use Node.js ${{ matrix.node-version }}
        # 设定 Node.js 环境
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install
        # 安装依赖
        run: npm install

      - name: Build
        # 打包
        run: npm run build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          # 部署打包目录
          folder: dist
          # 密钥名
          token: ${{ secrets.VITE_VUE_DEPLOY }}
          # 分支
          branch: gh-pages
```

> 🔗 通过此链接 **ElanYoung.github.io/vite-vue-js…**[66] 即可访问本项目



# 文章总结

本文从技术选项到架构搭建、从代码规范约束到提交信息规范约束，一步一步带领大家如何从一个最简单的前端项目骨架到规范的前端工程化环境，基本涵盖前端项目开发的整个流程，特别适合刚接触前端工程化的同学学习。

因篇幅较长，所涉及技术点较多，难免会出现错误，希望大家多多指正，谢谢大家！



























































