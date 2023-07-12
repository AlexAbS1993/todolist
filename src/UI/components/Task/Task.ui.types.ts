export interface ITaskUI {
    state: ITaskUIState | null
    name: string
    discription: string
    id: number
    dateStart: string | null
    dateEnd: string | null
    timeInProgress: string | null
    classStyle: string[]
    changeName(name: string): void
    changeDiscriptions(disc: string): void
    setStyle(style: string): void
    setState(state: ITaskUIState): void
    setClass(classStyle: string): void
    initialize(): void
    clearClassStyles(): void
}

export interface ITaskUIList {
    tasks: ITaskUI[]
    define(tasks: ITaskUI[]): ITaskUI[]
    add(task: ITaskUI): this
}

export interface ITaskUIState {
    setClass(taskUi: ITaskUI): void
    changeName(name: string, taskUi: ITaskUI): void
    changeDiscriptions(disc: string, taskUi: ITaskUI): void
    apply(taskUi: ITaskUI): void
}

export type TaskUiDTO = {
    name: string
    discription: string
    id: number,
    dateStart: string | null,
    dateEnd: string | null,
    timeInProgress: string | null
}