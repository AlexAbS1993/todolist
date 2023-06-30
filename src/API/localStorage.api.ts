import { APII } from "./API.types"

export class LocalStorageAPI<T, K> implements APII<T, K> {
    get(key: T): K {
        let resultSTR = localStorage.getItem(key as string)
        return resultSTR ? JSON.parse(resultSTR) : null
    }
    add(key: string, item: T) {
        let itemSTR = JSON.stringify(item)
        localStorage.setItem(key, itemSTR)
    }
    createInitializeLocalStorageKey(key: string, init: T) {
        if (localStorage.getItem(key) != null) {
            return
        }
        else {
            this.add(key, init)
        }
    }
}
