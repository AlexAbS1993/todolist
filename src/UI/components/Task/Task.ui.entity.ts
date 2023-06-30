import { TaskUiStateNew } from "./Task.ui.state";
import { ITaskUI, ITaskUIList, ITaskUIState, TaskUiDTO } from "./Task.ui.types";

export class TaskUI implements ITaskUI {
    state: ITaskUIState | null;
    name: string;
    discription: string;
    id: number
    style: string
    classStyle: string[]
    dateStart: string | null
    dateEnd: string | null
    timeInProgress: string | null
    constructor(data: TaskUiDTO) {
        this.name = data.name
        this.id = data.id
        this.discription = data.discription
        this.state = null
        this.style = ""
        this.classStyle = []
        this.dateStart = data.dateStart || null
        this.dateEnd = data.dateEnd || null
        this.timeInProgress = data.timeInProgress || null
    }
    initialize() {
        this.setState(new TaskUiStateNew())
    }
    update(data: TaskUiDTO) {
        this.name = data.name
        this.id = data.id
        this.discription = data.discription
        this.dateStart = data.dateStart || null
        this.dateEnd = data.dateEnd || null
        this.timeInProgress = data.timeInProgress || null
    }
    changeName(name: string): void {
        this.name = name
        return
    }
    changeDiscriptions(disc: string): void {
        this.discription = disc
    }
    setStyle(style: string): void {
        this.style += style
    }
    setState(state: ITaskUIState): void {
        this.state = state
        this.state.apply(this)
    }
    setClass(classStyle: string): void {
        this.classStyle.push(classStyle)
    }
    clearClassStyles() {
        this.classStyle = []
    }
}

export class TaskListUi implements ITaskUIList {
    tasks: ITaskUI[]
    constructor(tasks: ITaskUI[]) {
        this.tasks = tasks
    }
    define(tasks: ITaskUI[]): ITaskUI[] {
        this.tasks = tasks
        return this.tasks
    }

}