import { UIUnstanceName } from "../../../Cathalog/cathalog.instances.types";
import { EventsName } from "../../../data/events";
import { IEventable } from "../../../lib/events/Event.interface";
import { TaskUiStateCompleted, TaskUiStateInProgress, TaskUiStateNew } from "./Task.ui.state";
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
        if(this.dateEnd){
            this.setState(new TaskUiStateCompleted())
            return this
        }
        if (this.timeInProgress){
            this.setState(new TaskUiStateInProgress())
            return this
        }
        this.setState(new TaskUiStateNew())
        return this
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

export class TaskListUi implements ITaskUIList, IEventable {
    tasks: ITaskUI[]
    instanceName: string;
    constructor(tasks: ITaskUI[]) {
        this.instanceName = UIUnstanceName.TaskListUI
        this.tasks = tasks
    }
    define(tasks: ITaskUI[]): ITaskUI[] {
        this.tasks = tasks
        return this.tasks
    }
    add(task: ITaskUI){
        this.tasks.push(task)
        return this
    }
    update<dataType>(data: dataType, name: EventsName) {
        switch(name){
            case EventsName.TaskAdded:{
                this.add(new TaskUI(data as TaskUiDTO).initialize())
                return
            }
            case EventsName.TaskDeleted: {
                let filteredTasks = this.tasks.filter((task) => {
                    if (task.id !== data as number){
                        return true
                    }
                    return false
                })
                this.define(filteredTasks)
                return
            }
            default: 
            return
        }
    }
}