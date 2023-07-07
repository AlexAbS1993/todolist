export interface ITask {
    dateEnd: string | null
    dateStart: string | null
    timeInProgress: string | null
    getName(): string
    getDiscription(): string
    setName: (name: string) => void
    setDiscription: (disc: string) => void
    changeState: (state: ITaskState) => void
    getId: () => number
    setStartDate(): void
    setEndDate(): void
    setProgressTime(): void
}

export interface ITaskList {
    tasks: ITask[]
    add: (task: ITask) => void
    delete(id: number): void
    getById: (id: number) => ITask | null
    hasById: (id: number) => Boolean
    define(data: ITask[]): void
}

export interface ITaskState {
    use: (task: ITask) => void
}

export type TaskDTO = {
    name: string,
    discription: string,
    id: number,
    dateStart: null | string
    dateEnd: null | string
    timeInProgress: null | string
}