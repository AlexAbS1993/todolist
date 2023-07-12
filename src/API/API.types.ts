export type GetOneDetailInterface = {
    id: number
}

export interface APII<RequestValue, PostedData, ResponseData> {
    adress:string|null
    apiKey?: string|null
    GETall(request?: RequestValue):ResponseData[]
    GETone<DetailsType  extends GetOneDetailInterface>(detail: DetailsType, request?: RequestValue):ResponseData|null
    PostOne(data:PostedData, request?: RequestValue):void
    PostMany(data: PostedData[], request?: RequestValue): void
    ReplaceAll(data: PostedData[], request?: RequestValue): void
    deleteOne(data: number, request?: RequestValue): void
}

export interface IAPI<RequestValue, PostedData, ResponseData>  {
    useLocal():APII<RequestValue, PostedData, ResponseData>|null
    useOutAPI(): APII<RequestValue, PostedData, ResponseData>|null
    isLocalApiExist():boolean
    isOutApiExist(): boolean
}