import { TaskDTO } from "../Buisness/Task/Task.types"

export interface APII<T, K> {
    get(data: T): K
}

export type APIIforLocalStorage = APII<string, TaskDTO[]>