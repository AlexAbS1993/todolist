import { APII } from "./API.types"

export class LocalStorageAPI<RequestValue, PostedData, ResponseData> implements APII<RequestValue, PostedData, ResponseData> {
    adress: string | null;
    apiKey: string | null;
    constructor(adress: string, apikey?: string){
        this.adress = adress
        this.apiKey = apikey || null
    }
    GETall(_request?: RequestValue): ResponseData[] {
        let resultSTR = localStorage.getItem(this.adress as string)
        return resultSTR ? JSON.parse(resultSTR) : null
    }
    GETone(_request?: RequestValue): ResponseData {
        throw new Error("Method not implemented.");
    }
    PostOne(data: PostedData) {
        let result = this.GETall()
        if(!result){
            result = []
        }
        let newData = [...result, data] as PostedData[]
        this.ReplaceAll(newData)
    }
    PostMany(data: PostedData[]) {
        let result = this.GETall()
        let newData = [...result, ...data] as PostedData[]
        this.ReplaceAll(newData)
    }
    ReplaceAll(data: PostedData[]) {
        let itemSTR = JSON.stringify(data)
        localStorage.setItem(this.adress as string, itemSTR)
    }
    
}


    // createInitializeLocalStorageKey(key: string, init: T) {
    //     if (localStorage.getItem(key) != null) {
    //         return
    //     }
    //     else {
    //         this.add(key, init)
    //     }
    // }
