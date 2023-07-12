import { APII, GetOneDetailInterface } from "./API.types"



export class LocalStorageAPI<RequestValue, PostedData, ResponseData extends {id: number}> implements 
APII<RequestValue, PostedData, ResponseData> {
    adress: string | null;
    apiKey: string | null;
    constructor(adress: string, apikey?: string){
        this.adress = adress
        this.apiKey = apikey || null
    }
    GETall(request: RequestValue): ResponseData[] {
        let resultSTR = localStorage.getItem(request as string)
        return resultSTR ? JSON.parse(resultSTR) : null
    }
    GETone<DetailsType extends GetOneDetailInterface> (detail: DetailsType, request: RequestValue): ResponseData | null {
        let allItems = this.GETall(request)
        let result: ResponseData | null = null
        for(let item in allItems){
            if (allItems[item].id === detail.id){
                result = allItems[item]
            }
        }
        return result
    }
    PostOne(data: PostedData, request: RequestValue) {
        let result = this.GETall(request)
        if(!result){
            result = []
        }
        let newData = [...result, data] as PostedData[]
        this.ReplaceAll(newData,request)
    }
    PostMany(data: PostedData[], request: RequestValue) {
        let result = this.GETall(request)
        let newData = [...result, ...data] as PostedData[]
        this.ReplaceAll(newData,request)
    }
    ReplaceAll(data: PostedData[], request: RequestValue) {
        let itemSTR = JSON.stringify(data)
        localStorage.setItem(request as string, itemSTR)
    }
    deleteOne(data: number, request: RequestValue): void {
        let result = this.GETall(request)
        let filteredResult = result.filter((task) => {
            return task.id !== data
        })
        let postData = JSON.parse(JSON.stringify(filteredResult)) as PostedData[]
        this.ReplaceAll(postData, request)
    }
}
