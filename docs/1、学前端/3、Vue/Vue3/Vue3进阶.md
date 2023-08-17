





# vuex | Pinia⭐

> vuex 是终极的组件之间的数据共享方案。在企业级的 vue 项目开发中，vuex 可以让组件之间的数据共享变得高 
>
> 效、清晰、且易于维护。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202209281627160.png" alt="image-20220928162734049" style="zoom: 67%;" />

## vuex基本使用

### 使用流程

```apl
npm i vuex -S
```

在src目录下新建vuexStore,实际项目中你只需要建一个store目录即可，新建store/index.js

```js
import { createStore } from 'vuex'

export default createStore({
    //全局state，类似于vue种的data
    state() {
        return {
            name: "RenShoo",
            age: 12,
            type: true
        };
    },


    //修改state函数
    mutations: {
    },

    //提交的mutation可以包含任意异步操作
    actions: {
    },

    //类似于vue中的计算属性
    getters: {
    },

    //将store分割成模块（module）,应用较大时使用
    modules: {
    }
})
```

上面导出的实例我们通常称之为 `store`。一个 store 中包含了存储的状态（`state`）和修改状态的函数（`mutation`）等，所有状态和相关操作都在这里定义。

main.js

```js
import store from './components/01.ref/store'
const app = createApp(App)
// 有波浪线也没事，正常
app.use(store)
```

引入使用

```js
import { useStore } from 'vuex'

export default {
  name: 'MyApp',
  data(){
    return {
      vueStore: useStore()
    }
  },
}
```

```html
<div>
  {{vueStore.state.name}}
  {{vueStore.state.age}}
  {{vueStore.state.type}}
</div>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210011338322.png" alt="image-20221001133842233" style="zoom:80%;" />

### index.js分析

#### 单一数据源（state）

首先是 `state` 配置，他的值是一个对象，用来存储状态。Vuex 使用 `单一状态树` 原则，将所有的状态都放在这个对象上，便于后续的状态定位和调试。

```js
//全局state，类似于vue种的data
state() {
    return {
        name: "RenShoo",
        age: 12,
        type: true
    };
},
```

#### 状态更新方式（mutation）

Vuex 中的状态与组件中的状态不同，不能直接用 `state.app_version='xx'` 这种方式修改。Vuex 规定修改状态的唯一方法是提交 `mutation`。Mutation 是一个函数，第一个参数为 state，它的作用就是更改 state 的状态。

```js
//修改state函数
mutations: {
   setVuexMsg(state, data) {
      // 对应上面定义的name，传入时只能修改name属性
      state.name = data;
    },
},
```

#### 状态模块化（module）

前面讲过，Vuex 是单一状态树，所有状态存放在一个对象上。同时 Vuex 有自己的模块化方案 ，可以避免状态堆砌到一起，变的臃肿。Vuex 允许我们将 store 分割成模块（module），每个模块拥有自己的 state、mutation、action。虽然状态注册在根组件，但是支持模块分割，相当于做到了与页面组件平级的“状态组件”。

为了区分，我们将被分割的模块称为**子模块**，暴露在全局的称为**全局模块**。

上面说到，子模块触发 mutation 和 action 与全局模块一致，那么假设全局模块和子模块中都有一个名为 `setName` 的 mutation。在组件中触发，哪个 mutation 会执行呢？

**经过试验，都会执行**。官方的说法是：为了多个模块能够对同一 mutation 或 action 作出响应。

其实官方做的这个兼容，我一直没遇到实际的应用场景，反而因为同名 mutation 导致误触发带来了不少的麻烦。可能官方也意识到了这个问题，索引后来也为 mutation 和 action 做了模块处理方案。

这个方案，就是命名空间。

命名空间也很简单，在子模块中加一个 `namespaced: true` 的配置即可开启，



## Pinia(vuex5)

> 注意：这个要求vue版本要3.2.0，去package.json中修改

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212111609539.png" alt="image-20221211160947410" style="zoom:80%;" />

```apl
npm i pinia -S
```

main.js引入

```js
import {createPinia} from 'pinia'
app.use(createPinia())
```

src下新建piniaStore/storeA.js

```js
import { defineStore } from "pinia";

export const storeA = defineStore("storeA", {
    state: () => {
        return {
            piniaMsg: "hello pinia",
        };
    },
    getters: {},
    actions: {},
});
```

App.vue使用

```js
import { storeA } from './piniaStore/storeA'

export default {
  name: 'MyApp',
  data(){
    return {
      piniaStoreA: storeA()
    }
  },
}
```

```vue
{{piniaStoreA.piniaMsg}}
```

> 从这里我们可以看出pinia中没有了mutations和modules，pinia不必以嵌套（通过modules引入）的方式引入模块，因为它的每个store便是一个模块，如storeA，storeB... 。
>
> 在我们使用Vuex的时候每次修改state的值都需要调用mutations里的修改函数（下面会说到），因为Vuex需要追踪数据的变化，这使我们写起来比较繁琐。而pinia则不再需要mutations，同步异步都可在actions进行操作





## 状态修改

获取state的值从上面我们已经可以一目了然的看到了，下面让我们看看他俩修改state的方法吧

### vuex状态修改

#### 直接修改

vuex在组件中直接修改state，如App.vue

```vue
<template>
  <div>
    <button @click="change">状态修改</button>
    <br>
    {{vueStore.state.name}}
    <br>
    {{piniaStoreA.piniaMsg}}
    <br/>
  </div>
</template>
```

```js
methods: {
  change() {
    this.vueStore.state.name = "湛山"
    this.piniaStoreA.piniaMsg="李四"
  }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210011416025.png" alt="image-20221001141635958" style="zoom:80%;" />

> 可以看出我们是可以直接在组件中修改state的而且还是响应式的，但是如果这样做了，vuex不能够记录每一次state的变化记录，影响我们的调试。

当vuex开启严格模式的时候，直接修改state会抛出错误

```js
export default createStore({
  // 开启严格模式
  strict: true,
  //全局state，类似于vue种的data
  state: {
    vuexmsg: "hello vuex",
  },
}
```

#### mutations修改⭐

所以官方建议我们开启严格模式，所有的state变更都在vuex内部进行，在mutations进行修改。例如vuexStore/index.js:

```js
//修改state函数
mutations: {
   setVuexMsg(state, data) {
      // 对应上面定义的name，传入时只能修改name属性
      state.name = data;
    },
},
```

当我们需要修改vuexmsg的时候需要提交setVuexMsg方法

```js
data(){
  return {
    vueStore: useStore(),
    piniaStoreA: storeA()
  }
},

methods: {
  change() {
    // 函数名，传入内容值
    this.vueStore.commit('setVuexMsg','zhangsan')
  }
}
```

或者我们可以在actions中进行提交mutations修改state:

```js
//提交的mutation可以包含任意异步操作
actions: {
    async getState({ commit }) {
        //const result = await xxxx 假设这里进行了请求并拿到了返回值
        commit('setVuexMsg', "hello juejin");
    },
},
```

```js
change() {
  // 函数名，传入内容值
  this.vueStore.dispatch('getState')
}
```

组件中使用dispatch进行分发actions

```js
<template>
  <div>{{ vuexStore.state.vuexmsg }}</div>
</template>
<script setup>
import { useStore } from 'vuex'
let vuexStore = useStore()
vuexStore.dispatch('getState')

</script>
```

> 一般来说，vuex中的流程是首先actions一般放异步函数，拿请求后端接口为例，当后端接口返回值的时候，actions中会提交一个mutations中的函数，然后这个函数对vuex中的状态（state）进行一个修改，组件中再渲染这个状态，从而实现整个数据流程都在vuex内部进行便于检测。直接看图，一目了然

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.10.30/202210011631410.png" alt="image-20221001163137308" style="zoom:67%;" />

### Pinia

- 直接修改

相比于Vuex，Pinia是可以直接修改状态的，并且调试工具能够记录到每一次state的变化，如App.vue

```js
<template>
  <div>{{ piniaStoreA.piniaMsg }}</div>
</template>
<script setup>
import { storeA } from '@/piniaStore/storeA'
let piniaStoreA = storeA()
console.log(piniaStoreA.piniaMsg); //hello pinia

piniaStoreA.piniaMsg = 'hello juejin'
console.log(piniaStoreA.piniaMsg); //hello juejin

</script>
```

- $patch

使用$patch方法可以修改多个state中的值,比如我们在piniaStore/storeA.js中的state增加一个name

```js
import { defineStore } from "pinia";

export const storeA = defineStore("storeA", {
  state: () => {
    return {
      piniaMsg: "hello pinia",
      name: "xiaoyue",
    };
  },
  getters: {},
  actions: {},
});
```

然后我们在App.vue中进行修改这两个state

```js
import { storeA } from '@/piniaStore/storeA'
let piniaStoreA = storeA()
console.log(piniaStoreA.name); //xiaoyue
piniaStoreA.$patch({
  piniaMsg: 'hello juejin',
  name: 'daming'
})
console.log(piniaStoreA.name);//daming
```

当然也是支持修改单个状态的如

```js
piniaStoreA.$patch({
  name: 'daming'
})
```

$patch还可以使用函数的方式进行修改状态

```js
import { storeA } from '@/piniaStore/storeA'
let piniaStoreA = storeA()
cartStore.$patch((state) => {
  state.name = 'daming'
  state.piniaMsg = 'hello juejin'
})
```

- 在actions中进行修改

不同于Vuex的是，Pinia去掉了mutations，所以在actions中修改state就行Vuex在mutations修改state一样。其实这也是我比较推荐的一种修改状态的方式，就像上面说的，这样可以实现整个数据流程都在状态管理器内部，便于管理。

在piniaStore/storeA.js的actions添加一个修改name的函数

```js
import { defineStore } from "pinia";
export const storeA = defineStore("storeA", {
  state: () => {
    return {
      piniaMsg: "hello pinia",
      name: "xiao yue",
    };
  },
  actions: {
    setName(data) {
      this.name = data;
    },
  },
});
```

组件App.vue中调用不需要再使用dispatch函数，直接调用store的方法即可

```js
import { storeA } from '@/piniaStore/storeA'
let piniaStoreA = storeA()
piniaStoreA.setName('daming')
```

- 重置state

Pinia可以使用$reset将状态重置为初始值

```js
import { storeA } from '@/piniaStore/storeA' 
let piniaStoreA = storeA()
piniaStoreA.$reset()
```

## Pinia解构(storeToRefs)

当我们组件中需要用到state中多个参数时，使用解构的方式取值往往是很方便的，但是传统的ES6解构会使state失去响应式，比如组件App.vue,我们先解构取得name值，然后再去改变name值，然后看页面是否变化

```js
<template>
  <div>{{ name }}</div>
</template>
<script setup>
import { storeA } from '@/piniaStore/storeA'
let piniaStoreA = storeA()
let { piniaMsg, name } = piniaStoreA
piniaStoreA.$patch({
  name: 'daming'
})

</script>
```

浏览器展示如下

![图片](https://mmbiz.qpic.cn/mmbiz/mshqAkialV7HqXrMIb2zTlw6eqiaQxlxX5GsgpvwCYCKT0P1HWzdfkZKEjOpqIaDuIqyezKMPHag7IFkSjWZ2Mug/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)

我们可以发现浏览器并没有更新页面为daming

为了解决这个问题，Pinia提供了一个结构方法**storeToRefs**，我们将组件App.vue使用**storeToRefs**解构

```js
<template>
  <div>{{ name }}</div>
</template>
<script setup>
import { storeA } from '@/piniaStore/storeA'
import { storeToRefs } from 'pinia'
let piniaStoreA = storeA()
let { piniaMsg, name } = storeToRefs(piniaStoreA)
piniaStoreA.$patch({
  name: 'daming'
})

</script>
```

再看下页面变化

![图片](https://mmbiz.qpic.cn/mmbiz/mshqAkialV7HqXrMIb2zTlw6eqiaQxlxX5ia3MLRCpwBvbGA2UhH0CsW25nl65cNwQvib9CnpuwWbuH9XuSDASlicfg/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)

我们发现页面已经被更新成daming了

## getters

其实Vuex中的getters和Pinia中的getters用法是一致的，用于自动监听对应state的变化，从而动态计算返回值(和vue中的计算属性差不多),并且getters的值也具有缓存特性

### Pinia

我们先将piniaStore/storeA.js改为

```js
import { defineStore } from "pinia";

export const storeA = defineStore("storeA", {
  state: () => {
    return {
      count1: 1,
      count2: 2,
    };
  },
  getters: {
    sum() {
      console.log('我被调用了!')
      return this.count1 + this.count2;
    },
  },
});
```

然后在组件App.vue中获取sum

```js
<template>
  <div>{{ piniaStoreA.sum }}</div>
</template>
<script setup>
import { storeA } from '@/piniaStore/storeA'
let piniaStoreA = storeA()
console.log(piniaStoreA.sum) //3

</script>
```

让我们来看下什么是缓存特性。首先我们在组件多次访问sum再看下控制台打印

```js
import { storeA } from '@/piniaStore/storeA'
let piniaStoreA = storeA()
console.log(piniaStoreA.sum)
console.log(piniaStoreA.sum)
console.log(piniaStoreA.sum)
piniaStoreA.count1 = 2
console.log(piniaStoreA.sum)
```

![图片](https://mmbiz.qpic.cn/mmbiz/mshqAkialV7HqXrMIb2zTlw6eqiaQxlxX5AlPrEWbz1ls5HRoLjcDXxIDJicTm6A62FG8g0KsKibLwkTadoJaFL4iaQ/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)

从打印结果我们可以看出只有在首次使用用或者当我们改变sum所依赖的值的时候，getters中的sum才会被调用

### Vuex

Vuex中的getters使用和Pinia的使用方式类似，就不再进行过多说明,写法如下vuexStore/index.js

```js
import { createStore } from "vuex";

export default createStore({
  strict: true,
  //全局state，类似于vue种的data
  state: {
    count1: 1,
    count2: 2,
  },

  //类似于vue中的计算属性
  getters: {
    sum(state){
      return state.count1 + state.count2
    }
  }


});
```

## modules

如果项目比较大，使用单一状态库，项目的状态库就会集中到一个大对象上，显得十分臃肿难以维护。所以Vuex就允许我们将其分割成模块（modules），每个模块都拥有自己state，mutations,actions...。而Pinia每个状态库本身就是一个模块。

### Pinia

Pinia没有modules，如果想使用多个store，直接定义多个store传入不同的id即可，如：

```js
import { defineStore } from "pinia";

export const storeA = defineStore("storeA", {...});
export const storeB = defineStore("storeB", {...});
export const storeC = defineStore("storeB", {...});
```

### Vuex

一般来说每个module都会新建一个文件，然后再引入这个总的入口index.js中，这里为了方便就写在了一起

```js
import { createStore } from "vuex";
const moduleA = {
  state: () => ({ 
    count:1
   }),
  mutations: {
    setCount(state, data) {
      state.count = data;
    },
  },
  actions: {
    getuser() {
      //do something
    },
  },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

export default createStore({
  strict: true,
  //全局state，类似于vue种的data
  state() {
    return {
      vuexmsg: "hello vuex",
      name: "xiaoyue",
    };
  },
  modules: {
    moduleA,
    moduleB
  },
});
```

使用moduleA

```js
import { useStore } from 'vuex'
let vuexStore = useStore()
console.log(vuexStore.state.moduleA.count) //1
vuexStore.commit('setCount', 2)
console.log(vuexStore.state.moduleA.count) //2
vuexStore.dispatch('getuser')
```

一般我们为了防止提交一些mutation或者actions中的方法重名，modules一般会采用命名空间的方式 **namespaced: true** 如moduleA：

```js
const moduleA = {
  namespaced: true,
  state: () => ({
    count: 1,
  }),
  mutations: {
    setCount(state, data) {
      state.count = data;
    },
  },
  actions: {
    getuser() {
      //do something
    },
  },
}
```

此时如果我们再调用setCount或者getuser

```js
vuexStore.commit('moduleA/setCount', 2)
vuexStore.dispatch('moduleA/getuser')
```



# Pinia

> pinia 目前已经是 vue 官方正式的状态库。适用于 vue2 和 vue3，本文只描述vue3的写法。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212111612860.png" alt="image-20221211161212701" style="zoom:67%;" />

## pinia 的优势

相对于以前的 vuex，pinia具有以下优势

> - 更简单的写法，代码更清晰简洁，支持 `composition api` 和 `options api` 语法
> - 更完善的 typescript 支持，无需创建自定义复杂的包装类型来支持 TypeScript，所有内容都是类型化的，并且 API 的设计方式尽可能利用 TS 类型推断
> - 非常轻量，只有1kb的大小
> - 不需要再注入魔法字符串等进行调用

## 安装

```js
yarn add pinia
// or
npm install pinia
```

## 定义、使用store

创建一个 pinia 并传递给 vue 应用

```js
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './app.vue'

createApp(App).use(createPinia()).mount('#app')
```

### 定义store

store的定义是通过 defineStore 这个函数，

它需要一个唯一的名称，该名称可以作为第一个参数传递，也可以用 id 熟悉传递。

```js
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  // other options...
})
import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'main'
  // other options...
})
```

该 id 是必要的，主要是用于 vue devtools

### 使用store

```js
import { useMainStore } from '@/stores/main'

export default defineComponent({
  setup() {
    const store = useMainStore()
    return {
      store,
    }
  },
})
```

上述代码中，useMainStore实例化后的，我们就可以在 store 上访问 state、getters、actions 等（pinia中没有mutations）。

该 store 是一个 reactive 对象，所以不需要 “.value”，也不能对其进行解构使用，否则失去响应性（类似 props）。

> storeToRefs

如果一定要对其进行解构使用，可以使用 storeToRefs ，类似 vue3 中的 `toRefs`

```js
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const store = useMainStore()
    const { user, company } = storeToRefs(store)
    return {
      user, 
      company
    }
  },
})
```

## state

### 定义state

在 pinia 中，定义 state 是在函数中返回 state 初始状态

```js
import { defineStore } from 'pinia'

const useMainStore = defineStore('main', {
    state: () => ({
        teacherName: '艾伦',
        userList: [
            { name: '小明', age: 18 },
            { name: '小李', age: 15 },
            { name: '小白', age: 16 },
        ],
    }),
})

export default useMainStore
```

### 访问state

可以通过store 实例直接访问

```js
import useMainStore from '@/store/main'

export default defineComponent({
    setup() {
        const mainStore = useMainStore()
        const teacherName = computed(() => mainStore.teacherName)
        const userList = computed(() => mainStore.userList)

        return {
            teacherName,
            userList,
        }
    },
})
```

也可以直接修改状态

```js
import useMainStore from '@/store/main'
export default defineComponent({
    setup() {
        const mainStore = useMainStore()
        function change() {
            mainStore.teacherName = '米利'
            mainStore.userList.push({
                name: '小琪',
                age: 19
            })
        }
        return {
            change
        }
    },
})
```

虽然可以直接修改，但是出于代码结构来说，全局的状态管理还是不要直接在各个组件处随意修改状态，应放于 action 中统一方法修改（没有mutation了）

### 重置状态

可以通过调用store 上的方法将状态重置为初始状态

```js
const mainStore = useMainStore()

mainStore.$reset()
```

### $patch

修改state还可以通过使用 $patch 方法

$patch 可以同时修改多个值，举个例子

```js
import useMainStore from '@/store/main'

export default defineComponent({
    setup() {
        const mainStore = useMainStore()
        
  mainStore.$patch({
      teacherName: '德普',
            userList: [
                { name: '小明', age: 18 },
                { name: '小李', age: 15 },
            ]
  })
        return {}
    },
})
```

但是，这种写法的在修改数组时，例如我只想要把 userList 的中第一项"小明"的age 改为 20，也需要传入整个包括所有成员的数组，这无疑增加了书写成本和风险，于是一般都推荐使用以下的传入一个函数的写法

```js
mainStore.$patch((state)=>{
  state.teacherName = '德普'
  state.userList[0].age = 20
})
```

### 监听订阅state

通过 store.$subscribe() 的方法，

该方法的第一个参数接受一个回调函数，该函数可以在 state 变化时触发

```js
const subscribe = mainStore.$subscribe((mutation, state) => {
    console.log(mutation)
    console.log(state)
})
```

如上所示，该回调函数的两个参数

其中 state 是 mainStore 实例，而 mutation 打印如下

![图片](https://mmbiz.qpic.cn/mmbiz/bwG40XYiaOKkibbOM2g62O2DEqia9f57cO9iapDrM8ibMtfWWAbibxLJ1AaUic5mUHPk78wYwyRn8ia7I2cKucHFztbCWA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

可以发现，打印结果的mutation对象主要包含三个属性

- events : 是这次state改变的具体数据，包括改变前的值和改变后的值等等数据

- storeId ：是当前store的id

- type：type表示这次变化是通过什么产生的，主要有三个分别是

- - “direct” ：通过 action 变化的
  - ”patch object“ ：通过 $patch 传递对象的方式改变的
  - “patch function” ：通过 $patch 传递函数的方式改变的

> 停止监听

上面代码中，调用mainStore.$subscribe返回的值（即上方示例的 subscribe 变量）可以停止订阅

```js
subscribe()
```

store.$subscribe() 的方法的第二个参数options对象，是各种配置参数，包括

detached属性，其值是一个布尔值，默认是 false， 正常情况下，当 订阅所在的组件被卸载时，订阅将被停止删除，如果设置detached值为 true 时，即使所在组件被卸载，订阅依然可以生效。

其他属性主要还有 immediate、deep、flush 等等，和 vue3 watch的对应参数效果一样。

## getter

### 定义getter

getter 是 store 中的 state 计算值，以defineStore中的`getters`属性定义

getters属性的值是一个函数，该函数的第一个参数是 state

```js
const useMainStore = defineStore('main', {
    state: () => ({
        user: {
            name: '小明',
            age: 7,
        },
    }),

    getters: {
        userInfo: (state) => `${state.user.name}今年${state.user.age}岁了`,
        // 这里想要正确推断参数 state 的类型，则定义 state 时需要使用箭头函数定义
    },
})
```

上面代码中，getters的值是箭头函数，当getters的值是普通函数时，可以通过 this 访问整个store实例（如下）

但是如果是普通函数，想要通过 this 获取state的值并希望this的类型能正确推断，同时希望函数的返回值类型正确推断，我们需要声明函数的返回类型。

```js
getters: {
        userDesc: (state) => `${state.user.name}今年${state.user.age}岁了`,
            
        userBesidesDesc(): string{ // 需注明类型
            return `${this.user.age}岁的${this.user.name}` // 可以使用 this 获取值
        },
            
        returnUserInfo() {
            return this.userDesc // 也可以使用 this 获取其他getters
        },    
},
```

### 访问getter

```js
import useMainStore from '@/store/main'
export default defineComponent({
    setup() {
        const mainStore = useMainStore()

        const userDesc = computed(() => mainStore.userDesc)
        const userBesidesDesc = computed(() => mainStore.userBesidesDesc)
        const returnUserInfo = computed(() => mainStore.returnUserInfo)

        return {
            userDesc,
            userBesidesDesc,
            returnUserInfo,
        }
    },
})
```

## action

### 定义action

action 是 store 中的 方法，支持同步或异步。

action 定义的函数可以是普通函数从而可以通过 this 访问整个store实例，同时该函数可以传入任意参数并返回任何数据

```js
const useMainStore = defineStore('main', {
    state: () => ({
        count: 0,
    }),

    actions: {
        add() {
            this.count++
        },
        
        addCountNum(num: number) {
            this.count += num
        },
    },
})
```

### 调用action

```js
setup() {
        const mainStore = useMainStore()

        function mainAction() {
            mainStore.addCount()
        }
    
     function addCountTwo() {
            mainStore.addCountNum(2)
        }

        return {
            mainAction,
            addCountTwo
        }
},
```

### 监听订阅action

通过 `store.$onAction()`，可以监听action的动作及结果等

该函数可以接收一个回调函数作为参数，回调函数的参数中有五个属性，具体如下

```js
const unsubscribe = mainStore.$onAction(({
    name, // action 函数的名称
    store, // store 实例，这里是 mainStore
    args, // action 函数参数数组
    after, // 钩子函数，在action函数执行完成返回或者resolves后执行
    onError, // 钩子函数，在action函数报错或者rejects后执行
}) => {})
```

举个例子，

首先，定义一个store

```js
import { defineStore } from 'pinia'
const useMainStore = defineStore('main', {
    state: () => ({
        user: {
            name: '小明',
            age: 7,
        },
    }),
    actions: {
        subscribeAction(name: string, age: number, manualError?: boolean) {
            return new Promise((resolve, reject) => {
                console.log('subscribeAction函数执行')
                if (manualError) {
                    reject('手动报错')
                } else {
                    this.user.name = name
                    this.user.age = age
                    resolve(`${this.user.name}今年${this.user.age}岁了`)
                }
            })
        },
    },
})
export default useMainStore
```

然后在 setup 中使用

```js
import useMainStore from '@/store/main'
import { ref, defineComponent, computed } from 'vue'
export default defineComponent({
    setup() {
        const mainStore = useMainStore()

        function subscribeNormal() {
            mainStore.subscribeAction('小李', 18, false)
        }
        
        function subscribeError() {
            mainStore.subscribeAction('小白', 17, true)
        }

        const unsubscribe = mainStore.$onAction(({
            name, // action 函数的名称
            store, // store 实例，这里是 mainStore
            args, // action 函数参数数组
            after, // 钩子函数，在action函数执行完成返回或者resolves后执行
            onError, // 钩子函数，在action函数报错或者rejects后执行
        }) => {
            console.log('action的函数名', name)
            console.log('参数数组', args)
            console.log('store实例', store)

            after((result) => {
                console.log('$onAction after函数', result)
            })

            onError(error => {
                console.log('错误捕获', error)
            })
        })

        return {
            subscribeNormal,
            subscribeError,
        }
    },
})
```

如上，在 setup 中，调用了 subscribeNormal 函数后，页面打印如下

![图片](https://mmbiz.qpic.cn/mmbiz/bwG40XYiaOKkibbOM2g62O2DEqia9f57cO9sctnmFhrGM1X2MoZiaK6Apz0juLwWhnicXDTNmTfJaVxgUTcibIU3G3gw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

调用了 subscribeError 函数后，页面打印如下

![图片](https://mmbiz.qpic.cn/mmbiz/bwG40XYiaOKkibbOM2g62O2DEqia9f57cO9SWTwxpBNSFU1Xy4839ZFm5CJz0kDb8OQp3NMJfibq7oicgHicA0CxXKMA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

同样，可以通过调用 mainStore.$onAction 返回的值来手动停止订阅，在上面代码的例子中，即是

```js
unsubscribe() // 手动停止订阅
```

store.$onAction 默认在所在组件卸载时会被自动删除，可以通过传递第二个参数 true，来将action订阅和所在组件分开（即组件卸载时，订阅依然有效）

```js
mainStore.$onAction(callback, true)
```

## store使用位置

在组件中使用时，useStore() 在大多数情况下都可以在调用后开箱即用。

在其他地方使用时，需确保在 pinia 激活使用后（ app.use(createPinia()) ）才能使用 useStore()

例如在路由守卫中

```js
import { createRouter } from 'vue-router'
import useMainStore from '@/store/main'
const router = createRouter({
  // ...
})

// 报错
const mainStore = useMainStore()

router.beforeEach((to) => {
  // 正常使用
  const mainStore = useMainStore()
})
```

在store中也可以访问其他store

```js
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useMainStore = defineStore('main', {
  getters: {
    otherGetter(state) {
      const userStore = useUserStore()
      return userStore.data + state.data
    },
  },
  actions: {
    async fetchUserInfo() {
      const userStore = useUserStore()
      if (userStore.userInfo) {
        ...
      }
    },
  },
})
```

## pinia插件

pinia store 支持扩展，通过 pinia 插件我们可以实现以下

- 给 store 添加新属性

- 给 store 添加新选项

- 给 store 添加新方法

- 包装已存在的方法

- 修改甚至删除actions

  ...

例如可以写一个简单的插件来给所有store添加一个静态属性

```js
import { createPinia } from 'pinia'

const pinia = createPinia()
// 传递一个返回函数
pinia.use(() => ({ env: 'dev' }))

app.use(pinia)
```

然后，在所有其他的store都可以访问到上面添加的 env 属性

```js
setup() {
        const mainStore = useMainStore()
        console.log(mainStore.env) // dev
}        
```

### 插件函数

从上方代码可以发现，pinia 插件是一个函数，这个函数有一个可选参数

```js
import { PiniaPluginContext } from 'pinia'
function myPiniaPlugin(context: PiniaPluginContext) {
    console.log(context)
}
```

![图片](https://mmbiz.qpic.cn/mmbiz/bwG40XYiaOKkibbOM2g62O2DEqia9f57cO9Wj0FQF82WVUeDNwKhEj6EXyAeLdOQ9qbt0xkPiaexBbChu5ENibCvjsA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

context 打印出来主要有

- app : 当前应用 Vue.createApp() 创建的 app
- options : defineStore 配置的数据
- pinia : 当前通过 createPinia() 创建的 pinia 实例
- store ：当前 store 实例

通过 context 我们可以在 store 上设置属性

```js
pinia.use(({ store }) => {
    store.env = 'dev'
})
```

这样，在所有其他的store都可以访问到上面添加的 env 属性

pinia 的 store 是通过 reactive 包装的，可以自动解包它包含的任何 ref 对象

```js
pinia.use(({ store }) => {
    store.env = ref('dev')
})
```

通过上面插件，访问store 的 env 时不需要 .value，就可以直接访问

```js
setup() {
        const mainStore = useMainStore()
        console.log(mainStore.env) // 不需要加 .value
}
```

### 添加外部属性

当需要添加来自其他库或不需要响应式的数据时，应该用 markRaw() 包装传递的对象，例如

markRaw 来自 vue3，可以标记一个对象，使其永远不会转换为 proxy。返回对象本身。

```js
import { markRaw } from 'vue'
import { router } from './router'
import { axios } from 'axios'

pinia.use(({ store }) => {
  store.router = markRaw(router)
  store.axios = markRaw(axios)
})
```

### 在插件内部使用、onAction

```js
pinia.use(({ store }) => {
  store.$subscribe(() => {
    // react to store changes
  })
  store.$onAction(() => {
    // react to store actions
  })
})
```

### 新属性的typescript支持

当通过插件添加新属性时，可以扩展 `PiniaCustomProperties`接口

可以用设置get，set或者简单声明值的类型，以此来安全地写入和读取新加的属性

```js
import 'pinia'

declare module 'pinia' {
    export interface PiniaCustomProperties {
        set env(value: string | Ref<string>)
        get env(): string
        // 或者
        env: string
    }
}
```



# Pinia 保姆级教程

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202302231601934.png" alt="image-20230223160145805" style="zoom:80%;" />

> Vue3已经推出很长时间了，它周边的生态也是越来越完善了。之前我们使用Vue2的时候，Vuex可以说是必备的，它作为一个状态管理工具，给我们带来了极大的方便。Vue3推出后，虽然相对于Vue2很多东西都变了，但是核心的东西还是没有变的，比如说状态管理、路由等等。再Vue3种，尤大神推荐我们使用pinia来实现状态管理，他也说pinia就是Vuex的新版本。那么pinia究竟是何方神圣，本篇文章带大家一起学透它！

## Pinia概述

### Pinia作用

> 如果你学过Vue2，那么你一定使用过Vuex。我们都知道Vuex在Vue2中主要充当状态管理的角色，所谓状态管理，简单来说就是一个存储数据的地方，存放在Vuex中的数据在各个组件中都能访问到，是Vue生态重要组成部分

> 既然Vuex那么重要，那么在Vue3中岂能丢弃！在Vue3中，可以使用传统的Vuex来实现状态管理，也可以使用最新的pinia来实现状态管理，我们来看看官网如何解释pinia的。

> Pinia 是 Vue 的存储库，它允许您跨组件/页面共享状态。从上面官网的解释不难看出，pinia和Vuex的作用是一样的，它也充当的是一个存储数据的作用，存储在pinia的数据允许我们在各个组件中使用。

> 实际上，pinia就是Vuex的升级版，官网也说过，为了尊重原作者，所以取名pinia，而没有取名Vuex，所以大家可以直接将pinia比作为Vue3的Vuex。

### 为什么用Pinia

> 很多小伙伴内心是抗拒学习新东西的，比如我们这里所说的pinia，很多小伙伴可能就会抛出一系列的疑问：为什么要学习pinia？pinia有什么优点吗？既然Vue3还能使用Vuex为什么我还要学它？......

> 针对上面一系列的问题，我相信很多刚开始学习pinia的小伙伴都会有，包括我自己当初也有这个疑问。当然，这些问题其实都有答案，我们不可能平白无故的而去学习一样东西吧！肯定它有自己的优点的，所以我们这里先给出pinia的优点，大家心里先有个大概，当你熟练使用它之后，在会过头来看这些优点，相信你能理解。

### Pinia 优点

> - Vue2和Vue3都支持，这让我们同时使用Vue2和Vue3的小伙伴都能很快上手。
> - pinia中只有state、getter、action，抛弃了Vuex中的Mutation，Vuex中mutation一直都不太受小伙伴们的待见，pinia直接抛弃它了，这无疑减少了我们工作量。
> - pinia中action支持同步和异步，Vuex不支持
> - 良好的Typescript支持，毕竟我们Vue3都推荐使用TS来编写，这个时候使用pinia就非常合适了
> - 无需再创建各个模块嵌套了，Vuex中如果数据过多，我们通常分模块来进行管理，稍显麻烦，而pinia中每个store都是独立的，互相不影响。
> - 体积非常小，只有1KB左右。
> - pinia支持插件来扩展自身功能。
> - 支持服务端渲染。

pinia的优点还有非常多，上面列出的主要是它的一些主要优点，更多细节的地方还需要大家在使用的时候慢慢体会。

## 准备工作

想要学习pinia，最好有Vue3 的基础，明白组合式API是什么。如果你还不会Vue3，建议先去学习Vue3。

本篇文章讲解pinia时，全部基于Vue3来讲解，至于Vue2中如何使用pinia，小伙伴们可以自行去pinia官网学习，毕竟Vue2中使用pinia的还是少数。

**项目搭建：**我们这里搭建一个最新的Vue3 + TS + Vite项目。

**执行命令：**

```sh
npm create vite@latest my-vite-app --template vue-ts
```

**运行项目：**

```sh
cd my-vite-app
npm install
npm run dev
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202302231610892.png" alt="image-20230223161017819" style="zoom:67%;" />

## pinia基础使用

pinia的知识点很少，如果你有Vuex基础，那么学起来更是易如反掌。其实我们更应该关注的是它的函数思想，大家有没有发现我们在Vue3中的所有东西似乎都可以用一个函数来表示，pinia也是延续了这种思想。

所以，大家理解这种组合式编程的思想更重要，pinia无非就是以下3个大点：

- state
- getters
- actions

当然，本篇文章只是讲解了基础使用部分，但是在实际工作中也能满足大部分需求了，如果还有兴趣学习pinia的其它特点，比如插件、订阅等等，可以移步官网：pinia官网(https://pinia.web3doc.top/)

### 安装pinia

> 和vue-router、vuex等一样，我们想要使用pinia都需要先安装它，安装它也比较简单。

```sh
yarn add pinia
# 或者使用 npm
npm install pinia
```

> 安装完成后我们需要将pinia挂载到Vue应用中，也就是我们需要创建一个根存储传递给应用程序，简单来说就是创建一个存储数据的数据桶，放到应用程序中去。

### 引入Pinia

> 修改main.js，引入pinia提供的createPinia方法，创建根存储。

```ts
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.mount("#app");
```

## store 属性

### 创建store

> **store简单来说就是数据仓库的意思，我们数据都放在store里面**。当然你也可以把它理解为一个公共组件，**只不过该公共组件只存放数据，这些数据我们其它所有的组件都能够访问且可以修改**。

> 我们需要使用pinia提供的defineStore()方法来创建一个store，该store用来存放我们需要全局使用的数据。

> **首先在项目src目录下新建store文件夹，用来存放我们创建的各种store，然后在该目录下新建user.ts文件，主要用来存放与user相关的store**。

**代码如下：**

```ts
/src/store/user.ts


import { defineStore } from 'pinia'


// 第一个参数是应用程序中 store 的唯一 id
export const useUsersStore = defineStore('users', {
  // 其它配置项
})
```

创建store很简单，调用pinia中的defineStore函数即可，该函数接收两个参数：

- name：一个字符串，必传项，该store的唯一id。
- options：一个对象，store的配置项，比如配置store内的数据，修改数据的方法等等。

我们可以定义任意数量的store，因为我们其实一个store就是一个函数，这也是pinia的好处之一，让我们的代码扁平化了，这和Vue3的实现思想是一样的。

### 使用store

> 前面我们创建了一个store，说白了就是创建了一个方法，那么我们的目的肯定是使用它，假如我们要在App.vue里面使用它，该如何使用呢？

**代码如下：**

```vue
/src/App.vue
<script setup lang="ts">
import { useUsersStore } from "../src/store/user";
const store = useUsersStore();
console.log(store);
</script>
```

使用store很简单，直接引入我们声明的useUsersStore 方法即可，我们可以先看一下执行该方法输出的是什么：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202302231623801.png" alt="image-20230223162359728" style="zoom:80%;" />

## state属性

### 添加state

我们都知道store是用来存放公共数据的，那么数据具体存在在哪里呢？前面我们利用defineStore函数创建了一个store，该函数第二个参数是一个options配置项，我们需要存放的数据就放在options对象中的state属性内。

假设我们往store添加一些任务基本数据，修改user.ts代码。

**代码如下：**

```ts
export const useUsersStore = defineStore("users", {
  state: () => {
    return {
      name: "小猪课堂",
      age: 25,
      sex: "男",
    };
  },
});
```

上段代码中我们给配置项添加了state属性，该属性就是用来存储数据的，我们往state中添加了3条数据。需要注意的是，state接收的是一个箭头函数返回的值，它不能直接接收一个对象。

### 操作state

我们往store存储数据的目的就是为了操作它，那么我们接下来就尝试操作state中的数据。

#### 读取state数据

读取state数据很简单，前面我们尝试过在App.vue中打印store，那么我们添加数据后再来看看打印结果：

这个时候我们发现打印的结果里面多了几个属性，恰好就是我们添加的数据，修改App.vue，让这几个数据显示出来。

```vue
<template>
  <img alt="Vue logo" src="./assets/vue.svg" />
  <p>姓名：{{ name }}</p>
  <p>年龄：{{ age }}</p>
  <p>性别：{{ sex }}</p>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useUsersStore } from "../src/store/user";
const store = useUsersStore();
const name = ref<string>(store.name);
const age = ref<number>(store.age);
const sex = ref<string>(store.sex);
</script>
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202302231632552.png" alt="image-20230223163241492" style="zoom:80%;" />

> **输出结果：**上段代码中我们直接通过store.age等方式获取到了store存储的值，但是大家有没有发现，这样比较繁琐，我们其实可以用解构的方式来获取值，使得代码更简洁一点。

**解构代码如下：**

```ts
import { useUsersStore } from "../src/store/user";
const store = useUsersStore();
const { name, age, sex } = store;
```

上段代码实现的效果与一个一个获取的效果一样，不过代码简洁了很多。

#### 多个组件使用state

> 我们使用store的最重要的目的就是为了组件之间共享数据，那么接下来我们新建一个child.vue组件，在该组件内部也使用state数据。

**child.vue代码如下：**

```vue
<template>
  <h1>我是child组件</h1>
  <p>姓名：{{ name }}</p>
  <p>年龄：{{ age }}</p>
  <p>性别：{{ sex }}</p>
</template>
<script setup lang="ts">
import { useUsersStore } from "./store/user";
const store = useUsersStore();
const { name, age, sex } = store;
</script>
```

**App.vue代码如下：**

```vue
<template>
  <img alt="Vue logo" src="./assets/vue.svg" />
  <p>姓名：{{ name }}</p>
  <p>年龄：{{ age }}</p>
  <p>性别：{{ sex }}</p>
  <!-- 引入child组件 -->
  <child></child>
</template>

<script setup lang="ts">
import child from './components/child.vue';
import { useUsersStore } from "./components/store/user";
const store = useUsersStore();
const { name, age, sex } = store;

</script>
```

> child组件和app.vue组件几乎一样，就是很简单的使用了store中的数据。
>
> **实现效果：**这样我们就实现了多个组件同时使用store中的数据。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202302231700447.png" alt="image-20230223170045388" style="zoom: 67%;" />

#### 修改state数据

> 如果我们想要修改store中的数据，可以直接重新赋值即可，我们在App.vue里面添加一个按钮，点击按钮修改store中的某一个数据。

##### 非响应式

**App.vue代码如下：**

```vue
<template>
  <img alt="Vue logo" src="./assets/vue.svg" />
  <p>姓名：{{ name }}</p>
  <p>年龄：{{ age }}</p>
  <p>性别：{{ sex }}</p>
  <button @click="changeName">更改姓名</button>
  <child></child>
</template>

<script setup lang="ts">
import child from './child.vue';
import { useUsersStore } from "../src/store/user";
const store = useUsersStore();
const { name, age, sex } = store;
    
const changeName = () => {
  store.name = "张三";
  console.log(store);
};
</script>
```

> 上段代码新增了changeName 方法，改变了store中name的值，我们点击按钮，看看最终效果：

##### 响应式⭐

> 我们可以看到store中的name确实被修改了，但是页面上似乎没有变化，这说明我们的使用的name不是响应式的。很多小伙伴可能会说那可以用监听函数啊，监听store变化，刷新页面...其实，pinia提供了方法给我们，让我们获得的name等属性变为响应式的，我们重新修改代码。

**app.vue和child.vue代码修改如下：**

```ts
import { storeToRefs } from 'pinia';
const store = useUsersStore();
const { name, age, sex } = storeToRefs(store);
```

> 我们两个组件中获取state数据的方式都改为上段代码的形式，利用pinia的storeToRefs函数，将sstate中的数据变为了响应式的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202302231708623.png" alt="image-20230223170814557" style="zoom:67%;" />

除此之外，我们也给child.vue也加上更改state数据的方法。

**child.vue代码如下：**

```vue
<template>
  <h1>我是child组件</h1>
  <p>姓名：{{ name }}</p>
  <p>年龄：{{ age }}</p>
  <p>性别：{{ sex }}</p>
  <button @click="changeName">更改姓名</button>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUsersStore } from "./store/user";
const store = useUsersStore();
const { name, age, sex } = storeToRefs(store);
const changeName = () => {
  store.name = "小猪课堂";
};
</script>
```

这个时候我们再来尝试分别点击两个组件的按钮，实现效果如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202302231708318.png" alt="image-20230223170838253" style="zoom:67%;" />

当我们store中数据发生变化时，页面也更新了！

#### 重置state

> 有时候我们修改了state数据，想要将它还原，这个时候该怎么做呢？就比如用户填写了一部分表单，突然想重置为最初始的状态。此时，我们直接调用store的$reset()方法即可，继续使用我们的例子，添加一个重置按钮。

**App.vue | child.vue代码如下：**

```tsx
<button @click="reset">重置store</button>
// 重置store
const reset = () => {
  store.$reset();
};
```

当我们点击重置按钮时，store中的数据会变为初始状态，页面也会更新。

#### 批量更改state数据

> 前面我们修改state的数据是都是一条一条修改的，比如store.name="张三"等等，如果我们一次性需要修改很多条数据的话，有更加简便的方法，使用store的$patch方法，修改app.vue代码，添加一个批量更改数据的方法。

**App.vue | child.vue代代码如下：**

```tsx
<button @click="patchStore">批量修改数据</button>
// 批量修改数据
const patchStore = () => {
  store.$patch({
    name: "任硕",
    age: 100,
    sex: "女",
  });
};
```

> 有经验的小伙伴可能发现了，我们采用这种批量更改的方式似乎代价有一点大，假如我们state中有些字段无需更改，但是按照上段代码的写法，我们必须要将state中的所有字段例举出了。

> 为了解决该问题，pinia提供的$patch方法还可以接收一个回调函数，它的用法有点像我们的数组循环回调函数了。

**示例代码如下：**

```tsx
const patchStore = () => {
  store.$patch((state) => {
    state.name = "任硕"
    state.age = 123
  })
};
```

上段代码中我们即批量更改了state的数据，又没有将所有的state字段列举出来。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202302231720705.png" alt="image-20230223172051644" style="zoom:67%;" />

#### 直接替换整个state

> pinia提供了方法让我们直接替换整个state对象，使用store的$state方法。**示例代码：**

```tsx
store.$state = { counter: 666, name: '张三' }
```

上段代码会将我们提前声明的state替换为新的对象，可能这种场景用得比较少，这里我就不展开说明了。

## getters属性

> getters是defineStore参数配置项里面的另一个属性，前面我们讲了state属性。getter属性值是一个对象，该对象里面是各种各样的方法。大家可以把getter想象成Vue中的计算属性，它的作用就是返回一个新的结果，既然它和Vue中的计算属性类似，那么它肯定也是会被缓存的，就和computed一样。

> 当然我们这里的getter就是处理state数据。

### 添加getter

我们先来看一下如何定义getter吧，修改user.ts。

**代码如下：**

```tsx
export const useUsersStore = defineStore("users", {
  state: () => {
    return {
      name: "小猪课堂",
      age: 25,
      sex: "男",
    };
  },
  getters: {
    getAddAge: (state) => {
      return state.age + 100;
    },
  },
});
```

> 上段代码中我们在配置项参数中添加了getter属性，该属性对象中定义了一个getAddAge方法，该方法会默认接收一个state参数，也就是state对象，然后该方法返回的是一个新的数据。

### 使用getter

> 我们在store中定义了getter，那么在组件中如何使用呢？使用起来非常简单，我们修改App.vue。**代码如下：**

```vue
<template>
  <p>新年龄：{{ store.getAddAge }}</p>
  <button @click="patchStore">批量修改数据</button>
</template>

<script setup lang="ts">
import { useUsersStore } from "./components/store/user";
const store = useUsersStore();
// 批量修改数据
const patchStore = () => {
  store.$patch({
    name: "张三",
    age: 100,
    sex: "女",
  });
};
</script>
```

> 上段代码中我们直接在标签上使用了store.gettAddAge方法，这样可以保证响应式，其实我们state中的name等属性也可以以此种方式直接在标签上使用，也可以保持响应式。当我们点击批量修改数据按钮时，页面上的新年龄字段也会跟着变化。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202302231724917.png" alt="image-20230223172409858" style="zoom:80%;" />

### getter中调用其它getter

> 前面我们的getAddAge方法只是简单的使用了state方法，但是有时候我们需要在这一个getter方法中调用其它getter方法，这个时候如何调用呢？其实很简单，我们可以直接在getter方法中调用this，this指向的便是store实例，所以理所当然的能够调用到其它getter。**示例代码如下：**

```tsx
export const useUsersStore = defineStore("users", {
  state: () => {
    return {
      name: "小猪课堂",
      age: 25,
      sex: "男",
    };
  },
  getters: {
    getAddAge: (state) => {
      return state.age + 100;
    },
    getNameAndAge(): string {
      return this.name + this.getAddAge; // 调用其它getter
    },
  },
});
```

> 上段代码中我们又定义了一个名为getNameAndAge的getter函数，在函数内部直接使用了this来获取state数据以及调用其它getter函数。

> 细心的小伙伴可能会发现我们这里没有使用箭头函数的形式，这是因为我们在函数内部使用了this，箭头函数的this指向问题相信大家都知道吧！所以这里我们没有采用箭头函数的形式。

> 那么在组件中调用的形式没什么变化，代码如下：

```tsx
<p>调用其它getter：{{ store.getNameAndAge }}</p>
```

### getter传参

> 既然getter函数做了一些计算或者处理，那么我们很可能会需要传递参数给getter函数，但是我们前面说getter函数就相当于store的计算属性，和vue的计算属性差不多，那么我们都知道Vue中计算属性是不能直接传递参数的，所以我们这里的getter函数如果要接受参数的话，也是需要做处理的。**示例代码：**

```tsx
export const useUsersStore = defineStore("users", {
  state: () => {
    return {
      name: "小猪课堂",
      age: 25,
      sex: "男",
    };
  },
  getters: {
    getAddAge: (state) => {
      return (num: number) => state.age + num;
    },
    getNameAndAge(): string {
      return this.name + this.getAddAge; // 调用其它getter
    },
  },
});
```

上段代码中我们getter函数getAddAge接收了一个参数num，这种写法其实有点闭包的概念在里面了，相当于我们整体返回了一个新的函数，并且将state传入了新的函数。

接下来我们在组件中使用，方式很简单，代码如下：

```vue
<p>新年龄：{{ store.getAddAge(1100) }}</p>
```

## actions属性

前面我们提到的state和getters属性都主要是数据层面的，并没有具体的业务逻辑代码，它们两个就和我们组件代码中的data数据和computed计算属性一样。

那么，如果我们有业务代码的话，最好就是卸载actions属性里面，该属性就和我们组件代码中的methods相似，用来放置一些处理业务逻辑的方法。

actions属性值同样是一个对象，该对象里面也是存储的各种各样的方法，包括同步方法和异步方法。

### 添加actions

我们可以尝试着添加一个actions方法，修改user.ts。

**代码如下：**

```tsx
export const useUsersStore = defineStore("users", {
  state: () => {
    return {
      name: "小猪课堂",
      age: 25,
      sex: "男",
    };
  },
  getters: {
    getAddAge: (state) => {
      return (num: number) => state.age + num;
    },
    getNameAndAge(): string {
      return this.name + this.getAddAge; // 调用其它getter
    },
  },
  actions: {
    saveName(name: string) {
      this.name = name;
    },
  },
});
```

> 上段代码中我们定义了一个非常简单的actions方法，在实际场景中，该方法可以是任何逻辑，比如发送请求、存储token等等。大家把actions方法当作一个普通的方法即可，特殊之处在于该方法内部的this指向的是当前store。

### 使用actions

> 使用actions中的方法也非常简单，比如我们在App.vue中想要调用该方法。

**代码如下：**

```tsx
const saveName = () => {
  store.saveName("我是小猪");
};
```

我们点击按钮，直接调用store中的actions方法即可。

## 完整代码演示

前面的章节中的代码都不完整，主要贴的是主要代码部分，我们这节将我们本篇文章用到的所有代码都贴出来，供大家练习。

**main.ts代码：**

```tsx
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.mount("#app");
```

**user.ts代码：**

```tsx
import { defineStore } from "pinia";

// 第一个参数是应用程序中 store 的唯一 id
export const useUsersStore = defineStore("users", {
  state: () => {
    return {
      name: "小猪课堂",
      age: 25,
      sex: "男",
    };
  },
  getters: {
    getAddAge: (state) => {
      return (num: number) => state.age + num;
    },
    getNameAndAge(): string {
      return this.name + this.getAddAge; // 调用其它getter
    },
  },
  actions: {
    saveName(name: string) {
      this.name = name;
    },
  },
});
```

**App.vue代码：**

```vue
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <p>姓名：{{ name }}</p>
  <p>年龄：{{ age }}</p>
  <p>性别：{{ sex }}</p>
  <p>新年龄：{{ store.getAddAge(1100) }}</p>
  <p>调用其它getter：{{ store.getNameAndAge }}</p>
  <button @click="changeName">更改姓名</button>
  <button @click="reset">重置store</button>
  <button @click="patchStore">批量修改数据</button>
  <button @click="saveName">调用aciton</button>

  <!-- 子组件 -->
  <child></child>
</template>

<script setup lang="ts">
import child from "./child.vue";
import { useUsersStore } from "../src/store/user";
import { storeToRefs } from "pinia";
const store = useUsersStore();
const { name, age, sex } = storeToRefs(store);
const changeName = () => {
  store.name = "张三";
  console.log(store);
};
// 重置store
const reset = () => {
  store.$reset();
};
// 批量修改数据
const patchStore = () => {
  store.$patch({
    name: "张三",
    age: 100,
    sex: "女",
  });
};
// 调用actions方法
const saveName = () => {
  store.saveName("我是小猪");
};
</script>
```

**child.vue代码：**

```vue
<template>
  <h1>我是child组件</h1>
  <p>姓名：{{ name }}</p>
  <p>年龄：{{ age }}</p>
  <p>性别：{{ sex }}</p>
  <button @click="changeName">更改姓名</button>
</template>
<script setup lang="ts">
import { useUsersStore } from "../src/store/user";
import { storeToRefs } from 'pinia';
const store = useUsersStore();
const { name, age, sex } = storeToRefs(store);

const changeName = () => {
  store.name = "小猪课堂";
};
</script>
```



# 加载进度条 nprogress

## 安装和配置

```sh
npm install --save nprogress
```

**引入和配置（main.js）：**

```js
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  easing: 'ease',  // 动画方式，和css动画属性一样（默认：ease）
  speed: 500,  // 递增进度条的速度，单位ms（默认：200）
  showSpinner: false, // 是否显示加载ico
  trickle: true,//是否自动递增
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比，0-1（默认：0.08）
  parent: 'body'//指定此选项以更改父容器（默认：body）
})
```

## 插件方法

```js
NProgress.start()// 开始
NProgress.set(0.4) // 设置进度，0-1
NProgress.inc() // 增加一点点
NProgress.done() // 完成
```

## 在路由中使用

```js
router.beforeEach((to, from , next) => {
    //每次切换页面时，调用进度条
    NProgress.start();
    // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了
    next();
});

router.afterEach(() => {
    // 在即将进入新的页面组件前，关闭掉进度条
    NProgress.done()
})
```

## 在网络请求中使用

```js
//在request拦截器中显示进度条Nprogress.start()
axios.interceptors.request.use(config => {
    //请求开始时显示进度条
    Nprogress.start()
    return config
})
  //response中完成进度条Nprogress.done()
axios.interceptors.response.use(config => {
    //服务响应时完成进度条
    Nprogress.done()
    return config
})
```

到这里，应该就能看见效果了。如果想**改进度条的颜色**

```css
#nprogress .bar { 
    background: red !important; /*自定义颜色*/
}
```



# Vue 国际化

## 一、安装

> npm install vue-i18n

如果在一个模块系统中使用它，你必须通过 Vue.use() 明确地安装 vue-i18n：

```js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
 
Vue.use(VueI18n)
```

## 二、使用

在 src 下创建 lang 文件夹。

### 1、准备语言包

本例我准备了两种语言包，分别是中文和英文：zn、en。在 lang 下创建两个文件，zn.js 和 en.js。

```js
// zn.js
export default {
  main:{
    message:"消息",
    display:"展示"
  }
};
// en.js
export default {
  main:{
    message:"message",
    display:"display"
  }
}
```

### 2、准备翻译的语言环境

在 lang 下创建 index.js，使用如上的两种语言包。

```js
import Vue from "vue";
import VueI18n from 'vue-i18n'
import zn from "./zn"
import en from "./en"
Vue.use(VueI18n);   // 全局注册国际化包
 
// 准备翻译的语言环境信息
const i18n = new VueI18n({
  locale: "zn",   // 初始化中文
  messages: {
    "zn":zn,
    "en":en
  }
}); 
 
export default i18n
```

### 3、实现语言翻译

在 main.js 中将 i18n 注入 vue 中

```js
import i18n from './lang'
new Vue({
  el: '#app',
  router,
  store,
  i18n,   // 注入，不能缺少
  components: { App },
  template: '<App/>'
})
```

##### 使用方式

（1）直接使用

```vue
<template>
  <div style="width: 100%;">
    <div>
      <div>
        <span>{{$t('main.message')}}</span>
      </div>
    </div>
  </div>
</template>
```

（2） 语言切换

```vue
<template>
  <div style="width: 100%;">
    <div>
      <div>
        <span>{{$t('main.message')}}</span>
        <button @click="changeLang">切换语言</button>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  methods: {
    changeLang() {
      if(this.$i18n.locale === 'zn'){   // 判断当前语言
        this.$i18n.locale = 'en'   // 设置当前语言
      } else {
        this.$i18n.locale = 'zn'
      }
    }
  }
}
</script>
```

（3）data 变量翻译

假如页面某个名称绑定了 data 中变量，即可能存在多个值，此时又该如何进行语言翻译？

如下，“msg”存在多个取值，我们希望在切换“msg”值同时根据当前语言环境进行翻译。

```vue
<template>
  <div style="width: 100%;">
    <div>
      <div>
        <span>{{$t('main.message')}}</span>
        <button @click="changeLang">切换语言</button>
      </div>
      <p>{{msg}}</p>
      <button @click="changeWord">切换msg值</button>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      msg:'message'
    }
  },
  methods: {
    changeLang() {
      if(this.$i18n.locale === 'zn'){   // 判断当前语言
        this.$i18n.locale = 'en'   // 设置当前语言
      } else {
        this.$i18n.locale = 'zn'
      }
    },
    changeWord() {
      if(this.msg === 'message'){
        this.msg = 'display'
      } else {
        this.msg = 'message'
      }
    },
  }
}
</script>
```

首先，明确“msg”的取值有两个，分别为“message”、“display”，此时确保语言包中都存在这两个词与对应的翻译值。

其次，在组件中不能直接 $t('main.message') 使用，该种方式确定了翻译对象，而“msg”的翻译对象不确定，有可能是“message”、“display”甚至更多，于是，我使用了模板字符串，实现了值动态变化自动翻译的效果。

```vue
<p>{{$t(`main.${msg}`)}}</p>
 
// 当 msg 为 "message" 时，为 $t('main.message')
// 当 msg 为 "display" 时，为 $t('main.display')
```

Tips：在使用的过程中，出现了报错情况，将在第四点记录。

## 三、整合 ElementUI 语言包

我们可以整合 ElementUI 中存在的语言包。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/XUve7xLr9tbn9ibj5cc21bE4gt9bnOsqhWIWPvI7qcMQ6icpxoZ18sbIEB2iaWPmiaAicBWTgKUaQDyTKibbzmJHgrJQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 1、扩展中文

```js
// zn.js
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'   //引入element语言包
export default {
  main:{
    message:"消息",
    display:"展示"
  },
  ...zhLocale
};
```

### 2、扩展英文

```js
// en.js
import enLocale from 'element-ui/lib/locale/lang/en'   //引入element语言包
export default {
  main:{
    message:"message",
    display:"display"
  },
  ...enLocale
}
```

### 3、使用扩展语言翻译

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/XUve7xLr9tbn9ibj5cc21bE4gt9bnOsqhzX349SQyKGKmH7n6wAKtjHbNPWvAmicJaxzaQxBOjDUpGdrGn4HyDzg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

根据上图（语言包）取可翻译字段。

```js
<p>{{$t('el.colorpicker.confirm')}}</p>
 
// 中文“确定”，英文“OK”
```

## 四、问题记录

在使用过程中，中间有如下报错信息。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/XUve7xLr9tbn9ibj5cc21bE4gt9bnOsqhpwNPYPx0X4yWADw7ts9W8apcJk0XVI1s9gr2DN8nCDibz0Qp4flSPRg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

报错的原因主要是因为当前使用的版本不匹配，解决方案入下。

> npm install vue-i18n@8

## 五、扩展

### vue3 中使用 vue-i18n

vue-i18n 在 vue3 中使用方式与 vue2 有些差异。

### 1、安装

> npm install vue-i18n@next -S

### 2、准备语言环境

```js
import { createI18n } from 'vue-i18n';   // 与vue2的VueI18n使用方式不同
import zn from './zn';
import en from './en';
 
const i18n = createI18n({
  locale: 'zn',
  messages: {
    'zn': zn,
    'en': en
  }
});
 
export default i18n;
```

### 3、实现语言翻译

```js
// main.js 引入
import i18n from './lang';
App.use(i18n);
// vue3使用方式
import { useI18n } from 'vue-i18n';
setup() {
    const { locale } = useI18n();
    // 通过locale.value切换
    const changeLang = (val) =>{
        locale.value = val.value;
    }
    return {
        changeLang
    }
 }
// 在标签中使用 通过 $t() 或者 t()
<p>{{ $t('main.message') }}</p>
<p>{{ t('main.message') }}</p>
```



# 复用代码的正确姿势

在vue2中代码复用一般是 **mixins**混入来实现但使用 `mixins` 进行代码复用会有一些问题

vue3虽然对 `mixins` 进行了保留但不再推荐使用。

## mixins 问题

> **不清晰的数据来源**：当使用了多个 mixin 时，实例上的数据属性来自哪个 mixin 变得不清晰，这使追溯实现和理解组件行为变得困难。

> **命名空间冲突**：多个来自不同作者的 mixin 可能会注册相同的属性名，造成命名冲突。

> **隐式的跨 mixin 交流**：多个 mixin 需要依赖共享的属性名来进行相互作用，这使得它们隐性地耦合在一起。

当然这些问题对于的程序员来说都是可以避免的，但最好的方法是换一种更好的方式。

## 在 vue3 中复用代码

目前作者的认知里写 `sfc` 进行代码复用依然需要使用 `mixins` 来实现。

所以这里说的是使用 `Composition API` 组织代码的情况下（vue2.7 也已经支持）

### 先了解下什么是组合式 API？

组合式 API (Composition API) 是一系列 API 的集合，使我们可以使用函数而不是声明选项的方式书写 Vue 组件。它是一个概括性的术语，涵盖了以下方面的 API：

- **响应式 API**：例如 `ref()` 和 `reactive()`，使我们可以直接创建响应式状态、计算属性和侦听器。
- **生命周期钩子**：例如 `onMounted()` 和 `onUnmounted()`，使我们可以在组件各个生命周期阶段添加逻辑。
- **依赖注入**：例如 `provide()` 和 `inject()`，使我们可以在使用响应式 API 时，利用 Vue 的依赖注入系统。

> 这段话完全来自官网 更多的内容还是需要看官网

## 为什么要有组合式 API？

这里官方文档列出了几点：更好的逻辑复用 、更灵活的代码组织 、更好的类型推导 、更小的生产包体积。这里已经出现了本文关注的重点即 **更好的逻辑复用** 我们来看下官方的说明

> 组合式 API 最基本的优势是它使我们能够通过**组合函数**[5]来实现更加简洁高效的逻辑复用。在选项式 API 中我们主要的逻辑复用机制是 mixins，而组合式 API 解决了 **mixins 的所有缺陷**[6]。

两个结论 1. 组合式 API 解决了mixins 的所有缺陷 2. 能够通过组合函数来实现更加简洁高效的逻辑复用。

## 什么是“组合式函数” ？

在 Vue 应用的概念中，“组合式函数”(Composables) 是一个利用 Vue 的组合式 API 来封装和复用**有状态逻辑**的函数。

一般会以 `use` 开头进行函数命名，放到 `composables` 目录中，**其他约定**[7]。

组合函数内部可以使用 `组合式api`，一个组合式函数可以调用一个或多个其他的组合式函数。

这使得我们可以像使用多个组件组合成整个应用一样，用多个较小且逻辑独立的单元来组合形成复杂的逻辑。

当时我看到这里时候其实有个疑问 为什么要强调是**有状态逻辑的函数**（有状态函数是指函数内部有自己的状态更改），这个问题先留着，看完代码示例自会理解。

## 一个例子

抽离后台管理列表共用的逻辑，示例只是列表相关逻辑封装，你甚至可以将增删改查的逻辑封装进去。

### usePage.js

```js
import { reactive, ref } from 'vue'
// 一个用于重置对象字段为原始值的函数
import { resetObjToPrimitiveType } from '@/utils/tool'

/**
 * @description usePage 接收一个 opts 参数，返回列表所需数据
 * @param {Object} opts.searchForm - 默认查询参数
 * @param {Function} opts.getListApi  - 获取列表数据的接口
 * @param {Function} opts.customQueryParameters  - 自定义查询参数
 * @param {Function} opts.getListFunc  - 执行完 getList 成功后执行的逻辑 有一个opts参数
 * @param {Function} opts.resetFunc  - 执行完 reset 后执行的逻辑
 * @param {Function} opts.sizeChangeFunc  - 执行完 sizeChange 后执行的逻辑
 * @param {Function} opts.currentChangeFunc  - 执行完 currentChange 后执行的逻辑
 */
export const usePage = (opts) => {
  // searchForm 由外部传入，内部传入导出的数据无法推导类型即无法知道对象里有什么也会失去代码提示
  const {
    searchForm = {},
    getListApi,
    customQueryParameters = () => {},
    getListFunc = (opts) => {},
    resetFunc = () => {},
    sizeChangeFunc = () => {},
    currentChangeFunc = () => {}
  } = opts

  const reset = () => {
    Object.assign(searchForm, resetObjToPrimitiveType(searchForm))
    resetFunc()
    handleCurrentChange(1)
  }

  const page = reactive({
    pageSize: 10,
    pageNo: 1,
    total: 0
  })

  const tableData = ref([])
  const getList = () => {
    const opts = {
      ...page,
      ...searchForm,
      ...customQueryParameters()
    }

    getListApi(opts).then((res) => {
      if (res.code === 0) {
        tableData.value = res.data?.rows || []
        page.total = res.data?.total || 0

        getListFunc(opts)
      }
    })
  }

  const handleSizeChange = (size) => {
    page.pageSize = size
    sizeChangeFunc()
    getList()
  }

  const handleCurrentChange = (cur) => {
    page.pageNo = cur
    currentChangeFunc()
    getList()
  }

  return {
    searchForm,
    reset,
    page,
    tableData,
    handleSizeChange,
    handleCurrentChange
  }
}
```

### 组件内使用

```js
import { reactive, ref, computed } from 'vue'
import { usePage } from '@/composables/usePage'
import testModel from '@/model/test'

// 查询参数
const searchForm = reactive({
  createEndTime: '',
  createStartTime: ''
})

// 接收 查询参数、获取列表的接口 返回 列表所需要的数据、分页参数、分页函数等
const { reset, page, tableData, handleSizeChange, handleCurrentChange } = usePage({
  searchForm,
  getListApi: testModel.getList
})

// 首次获取数据使用 reset方式即可 tableData 的数据自动更新
reset()
```

`组合式函数`其实就是一个函数接收一些参数返回一些东西，将逻辑进行封装、共用。

### 如果函数依赖 store、router 等

```js
import {useStore} from 'vuex'
import {computed} from 'vue'

export const useTest = () => {
    // 获取store
  const store = useStore()
  
  const getOrgById = (id) => {
      // 使用
    const orgObj = computed(() => store.state.orgObj)
    return orgObj.value[id]
  }

  return {
    getOrgById
  }
}
```

## 总结

说明 `vue2` 使用 `mixins` 进行代码复用所带来的问题，引出了vue3如何进行代码复用。

介绍 `组合式 API (Composition API)` 以及为什么需要 `组合式 API`, 什么是 `组合式函数` 通过一个例子让大家了解了 `组合式函数` 的用法。

`Composition API` 与 `组合式函数` 用来解决 vue2 `mixins` 带来的问题只是附带，它可以做更多做的更好。

同时也是一把双刃剑，取决于使用的人。就像有的人可以把代码写的一塌糊涂有的人却可以把代码写的像诗一样！



# 添加公共方法并使用

在vue3中是不会直接暴露vue对象给你使用了。所以不能想vue2那样直接在原型上挂载，那么该如何实现公共方法的挂载呢？下面以$axios方法为例，介绍vue3添加公共方法的三种方式。

## 使用 app.config.globalProperties 添加

```js
import { createApp } from 'vue'
import axios from 'axios'

const app = createApp({
  created() {
    console.log(this.$axios)
  }
})
app.config.globalProperties.$axios = axios
app.mount('#root')
```

在setup中访问（setup中没有this）

```js
<script setup>
    import {getCurrentInstance} from 'vue'
    const { proxy } = getCurrentInstance();//获取公用方法proxy.$axios，或者use中方法
    const {$axios}=proxy
    console.log($axios)
</script>
```

## 使用 app.mixin 添加

```js
import { createApp} from 'vue'
import axios from 'axios'

const app = createApp({
  created() {
    console.log(this.$axios)
  }
})
app.mixin({
  methods: {
    $axios: axios
  }
})
app.mount('#root')
```

## 采用 provide, inject 方法

需要注意的是这种方法需要组建 inject 注入进组件才能使用。

```js
import { createApp } from 'vue'
import axios from 'axios'

const app = createApp({
  inject: ['$axios'],
  created() {
    console.log(this.$axios)
  }
})
app.provide('$axios', axios)
app.mount('#root')
```



# 记事本案例

```vue
<template>
    <div>
        <h2>我是View组件</h2>
        <div>
            <ul>
                <!--输入任务内容：@keyup.enter按回车启动，这样不用加个按钮了-->
                <input type="text" @keyup.enter="add"  v-model="inputValue" 
                       autofocus="autofocus" placeholder="请输入任务"/>
                 <!--遍历数组的内容，注意：:key一定要加，不然会报错-->
                <li v-for="(item,index) in list" :key="index">
                    {{index}}------
                    {{item}}
                    <button @click="remove(index)">删除</button>
                </li>
            </ul>
            <div>
                <!--页面没有任务时隐藏这两个，用v-if和v-show都可以-->
                <span v-if="list.length!==0">统计：{{list.length}}</span>
                <button v-show="list.length!==0" @click="clear">清空</button>
            </div>
        </div>
    </div>
</template>
```

方法

```js
export default {
    name: "View",
    data(){
        return{
            //在输入框内的值，用v-model绑定
            inputValue:"好好学习，天天向上",
            //数组，任务都是保存在数组里
            list:["写代码","吃饭","睡觉"]
        }
    },
    methods:{
        //添加方法，调用数组的push方法
        add(){
            this.list.push(this.inputValue)
        },
        //splice，数组方法，会改变原始数组。第一个参数表示数据索引，第二个参数表示删除一个值
        remove(index){
            this.list.splice(index,1)
        },
        clear(){
            //清空直接令数组为空完事
            this.list = []
        }
    }
}
```

运行案例

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211207220101451.png" alt="image-20211207220101451" style="zoom:80%;" />



# Vue3 优雅使用 Typescript

## Vue3 + TypeScript

如果你已经上手了`Vue3`，那我真的强烈推荐你要配合`TypeScript`去使用，好处多多：

- 1、typescript有类型提示，提高开发效率
- 2、有类型错误提早报错，防止把错误带到线上
- 3、一处修改类型，多处报错，可以马上知道修改哪些地方，而不用自己去找

那么今天我就说说我在`Vue3`中是如何使用`Typescript`的吧!

## ref

我们可以使用`泛型`来给`ref`定义ts类型

### 简单类型

简单类型可以直接写在泛型中

```
const variant = ref<string | number>(0)
```

### 复杂类型

复杂类型可以定义interface等，然后再写进泛型中

```
interface IUser {  name: string;  age: number;}
const user = ref<IUser>({  name: '林三心',  age: 20})
```

这样会有类型提示，真的非常方便，不用自己去想有哪些属性

![图片](https://mmbiz.qpic.cn/mmbiz_png/TZL4BdZpLdjHWUrCibPMpzfC1I96Jibt1dsBMlicrHXx5Ig7Y5JunGOyK6jAXxPAnWGoXWT1nzYZSniaibhIccib2nbA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## reactive

`reactive`一般用来定义引用类型，比如对象、数组

我们照样可以使用泛型去定义他们的类型，也是会有提示的

![图片](https://mmbiz.qpic.cn/mmbiz_png/TZL4BdZpLdjHWUrCibPMpzfC1I96Jibt1dWt7JBVbVmxyiaFDJtvejNWJKb1epRW46FkVFn6guuWoWhn6ObKv9LhA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

```
const user = reactive<IUser>({  name: '林三心',  age: 20})const users = reactive<IUser[]>([  { name: '林三心', age: 20 }])
```

## computed

同样使用泛型

```
const text = computed<string>(() => '哈哈哈')const users = computed<IUser[]>(() => ([  { name: '林三心', age: 20}]))
```

## defineProps

泛型搞起，照样有提示

![图片](https://mmbiz.qpic.cn/mmbiz_png/TZL4BdZpLdjHWUrCibPMpzfC1I96Jibt1duLZibFe0D5gsX5DlFIdBwOjHA57hgbfFVmum3pXrlAmaiaEvoicYIxKBQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

```
interface IProps {  name: string;  age?: number}const { name, age } = defineProps<IProps>()
```

## defineEmits

```
interface IEmits {  handleChange: (val: string) => void;  handleSwitch: (val: string) => void}const emits = defineEmits<IEmits>()
```

## 模板ref

### 普通节点

当使用ref来获取dom节点时，要获取设定对应的dom节点类型，这样才有类型提示，比如我要操作一个`img标签`，我只有定义了正确的dom类型，他才会有一些dom节点对应的提示

> 记得，初始节点可能是`null`，所以要补全`bull`类型

```
const el = ref<HTMLImageElement | null>(null)<img ref="el" />
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/TZL4BdZpLdjHWUrCibPMpzfC1I96Jibt1dhS9wfzbTibj0cqicSpVdGKjJqerrIUc6VuzXUCVNwjle6snqWv6gYAXQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 自定义组件

当你的`ref`是放在自定义组件上时，你想要通过它去获取到子组件的内部数据，那只能在子组件中先使用`defineExpose`暴露出去

```
// 子组件Dialog.vueimport { ref, defineExpose } from 'vue'const childMsg = ref('childMsg')const handleChangeMsg = () => {  childMsg.value = '被修改了'}// 暴露出去defineExpose({ childMsg, handleChangeMsg })
```

这个时候在父组件中，想要获取这些暴露出来的东西，又要有类型提示，咋办呢？这时候就可以用到typescript内置的`InstanceType + typeof`

```
const dialogRef = ref<InstanceType<typeof Dialog> | null>(null)
```

这样你在获取的时候就有类型提示了！是不是很方便！！

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202302211042037.png" alt="image-20230221104241956" style="zoom:67%;" />

## 原生事件

有时候ts的类型腿断并不能达到你想要的预期，那你可以适当使用`as`来实现你想

要的类型效果

```vue
<template>  <input type="text" @change="handleChange" /></template><script setup lang="ts">function handleChange(event: Event) {  console.log((event.target as HTMLInputElement).value)}</script>
```



















































