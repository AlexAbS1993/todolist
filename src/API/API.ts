import { APII, IAPI } from "./API.types";

export class API<RequestValue, PostedData, ResponseData> implements IAPI<RequestValue, PostedData, ResponseData>{
    localApi: APII<RequestValue, PostedData, ResponseData> | null
    outApi: APII<RequestValue, PostedData, ResponseData>| null
    constructor(localApi: APII<RequestValue, PostedData, ResponseData>|null, outApi: APII<RequestValue, PostedData, ResponseData>|null){
        this.localApi = localApi
        this.outApi = outApi
    }
    useLocal(){
        return this.localApi
    }
    useOutAPI(){
        return this.outApi
    }
    isLocalApiExist(): boolean {
        return Boolean(this.localApi)
    }
    isOutApiExist(): boolean {
        return Boolean(this.outApi)
    }
}