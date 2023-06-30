import { ITaskUI, ITaskUIState } from "./Task.ui.types";

export class TaskUiStateNew implements ITaskUIState {
    apply(taskUi: ITaskUI) {
        this.setClass(taskUi)
    }
    setClass(taskUi: ITaskUI): void {
        taskUi.clearClassStyles()
        taskUi.setClass('task_container_new')
    }
    changeName(_name: string, _taskUi: ITaskUI): void {
        throw new Error("It is not allowed on new task");
    }
    changeDiscriptions(_disc: string, _taskUi: ITaskUI): void {
        throw new Error("It is not allowed on new task");
    }
}

export class TaskUiStateInProgress implements ITaskUIState {
    apply(taskUi: ITaskUI): void {
        this.setClass(taskUi)
    }
    setClass(taskUi: ITaskUI): void {
        taskUi.clearClassStyles()
        taskUi.setClass('task_container_inprogress')
    }
    changeName(_name: string, _taskUi: ITaskUI): void {
        throw new Error("It is not allowed on inprogress task");
    }
    changeDiscriptions(_disc: string, _taskUi: ITaskUI): void {
        throw new Error("It is not allowed on inprogress task");
    }
}

export class TaskUiStateCompleted implements ITaskUIState {
    apply(taskUi: ITaskUI): void {
        this.setClass(taskUi)
    }
    setClass(taskUi: ITaskUI): void {
        taskUi.clearClassStyles()
        taskUi.setClass('task_container_complete')
    }
    changeName(_name: string, _taskUi: ITaskUI): void {
        throw new Error("It is not allowed on complete task");
    }
    changeDiscriptions(_disc: string, _taskUi: ITaskUI): void {
        throw new Error("It is not allowed on complete task");
    }
}
export class TaskUiStateChanging implements ITaskUIState {
    apply(taskUi: ITaskUI): void {
        this.setClass(taskUi)
    }
    setClass(taskUi: ITaskUI): void {
        taskUi.clearClassStyles()
        taskUi.setClass('task_container_changing')
    }
    changeName(name: string, taskUi: ITaskUI): void {
        taskUi.changeName(name)
    }
    changeDiscriptions(disc: string, taskUi: ITaskUI): void {
        taskUi.changeDiscriptions(disc)
    }
}