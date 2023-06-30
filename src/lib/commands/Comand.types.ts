import { APIIforLocalStorage } from "../../API/API.types"

export interface Command<T, K> {
    execute(data?: T): K
}

export type getTaskListFromModelCommandDTO = {
    API: APIIforLocalStorage
}