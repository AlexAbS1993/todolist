import { MappersMAP } from "."

export function mapperSelector(from: string, to: string){
    return MappersMAP[from][to]
}