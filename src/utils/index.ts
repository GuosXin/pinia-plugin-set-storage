/**
 * 读取本地缓存（进行转义）
 * @param key 缓存的key键
 * @returns 
 */
 export const getLocalStorage = (key: string) => {
    try{
        let res = window.localStorage.getItem(key)
        return res ? JSON.parse(res) : null
    }catch(err){
        return null
    }
}

/**
 * 设置本地缓存（进行转义）
 * @param key 缓存的key键
 * @param value 缓存的value值
 * @returns 
 */
export const setLocalStorage = (key: string, value: any) => {
    try{
        window.localStorage.setItem(key, JSON.stringify(value))
        return true
    }catch(err){
        return false
    }
}

/**
 * 读取session缓存（进行转义）
 * @param key 缓存的key键
 * @returns 
 */
 export const getSessionStorage = (key: string) => {
    try{
        let res = window.sessionStorage.getItem(key)
        return res ? JSON.parse(res) : null
    }catch(err){
        return null
    }
}


/**
 * 设置session缓存（进行转义）
 * @param key 缓存的key键
 * @param value 缓存的value值
 * @returns 
 */
 export const setSessionStorage = (key: string, value: any) => {
    try{
        window.sessionStorage.setItem(key, JSON.stringify(value))
        return true
    }catch(err){
        return false
    }
}