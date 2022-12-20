import type { PiniaPluginContext } from 'pinia'
import { getLocalStorage, setLocalStorage, getSessionStorage, setSessionStorage } from './utils'
import './types'

const setStoragePlugin = ({ store, options }: PiniaPluginContext) => {
    if(!options.setStorage) return
    let { localStorage, sessionStorage } = options.setStorage!

    const running = (storageType = 'l') => {
        let storage = storageType === 's' ?  sessionStorage : localStorage // storage类型
        let getStorage = storageType === 's' ? getSessionStorage : getLocalStorage // getStorage类型
        let setStorage = storageType === 's' ? setSessionStorage : setLocalStorage // setStorage类型
        let isBoolean = typeof storage === 'boolean' // 是否是布尔类型
        let isArray = storage instanceof Array // 是否是数组类型

        if(!isBoolean && !isArray) return // 既不是布尔类型，又不是数组类型，则返回

        /**
         * 初始化时与本地缓存同步数据
         */
        if(isBoolean && storage){
            // 如果是布尔类型并且是true，根据storage同步所有state的值
            let oldVal = getStorage(store.$id)
            let newVal = Object.assign({}, store.$state, oldVal) // 合并storage和state数据
            Object.keys(store.$state).forEach(item => {
                store.$state[item] = newVal[item]
            })
            // 更新localStorage，使用 setLocalStorage(store.$id, Object.assign({}, oldVal, store.$state)) 替换下面一行代码可避免破坏性更新storage，根据需求使用
            setStorage(store.$id, store.$state)
        }else if(isArray){
            // 如果是数组，找出交集，再根据storage同步state的值
            let oldVal = getStorage(store.$id)
            let newVal = Object.assign({}, store.$state, oldVal) // 合并storage和state数据
            let obj: any = {} // 用于保存需要设置storage的键值对
            Object.keys(store.$state).forEach((item: string) => {
                if((<string[]>storage).includes(item)){
                    store.$state[item] = newVal[item]
                    obj[item] = newVal[item]
                }
            })
            setStorage(store.$id, obj)
        }
     
        /**
         * 订阅state
         */
        store.$subscribe((mutation: any, state: any)=>{
            if(isBoolean && storage){
                // 如果是布尔类型并且是true，则保存所有state到本地缓存
                setStorage(mutation.storeId, state)
            }else if(isArray){
                // 如果是数组，则根据数组匹配state缓存到本地
                let obj: any = {}
                Object.keys(state).forEach((item: string) => {
                    if((<string[]>storage).includes(item)){
                        obj[item] = state[item]
                    }
                })
                setStorage(mutation.storeId, obj)
            }
        })
    }

    running()
    running('s')
}

export default setStoragePlugin