

// export interface APII<T,K> extends APIInterface {
//     get(key:T):K
//     add(adress: T, data: K):void
//     updateAll(adress:T, data: K[]): void
// }

// export type APIIforLocalStorage<F> = APII<string, F, TaskDTO[]>

export interface APII<RequestValue, PostedData, ResponseData> {
    adress:string|null
    apiKey?: string|null
    GETall(request?: RequestValue):ResponseData[]
    GETone(request?: RequestValue):ResponseData
    PostOne(data:PostedData):void
    PostMany(data: PostedData[]): void
    ReplaceAll(data: PostedData[]): void
}

export interface IAPI<RequestValue, PostedData, ResponseData>  {
    useLocal():APII<RequestValue, PostedData, ResponseData>|null
    useOutAPI(): APII<RequestValue, PostedData, ResponseData>|null
}