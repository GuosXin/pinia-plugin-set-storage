## 介绍

这是一个可以将pinia state保存到localStorage和sessiongStorage的插件，比较简单，github上有更优秀的插件可使用

## 安装

```bash
npm i pinia-plugin-set-storage -S
```

## 快速上手

```js
// main.ts 或 main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import setStoragePlugin from 'pinia-plugin-set-storage' //引入插件

const pinia = createPinia()
pinia.use(setStoragePlugin) //将该插件交给 Pinia

const app = createApp(App)
app.use(pinia)

app.mount('#app')


// store.ts
import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
    state: () => ({
        name: 'Tony',
        age: 20
    }),
    setStorage: {
        localStorage: ['name'],  // 传入一个state属性数组，即可自动将对应的state保存到localStorage中；也可以传true，自动将所有state保存。
        sessionStorage: true     // 设置sessionStorage则表示将state保存到sessionStorage，和localStorage一样，可传数组，也可传true
    }
})
```
