import { APII } from "../../API/API.types";
import { localStorageConstants } from "../../data/localStorage";
import { Task } from "./Task.entity";
import { ITask, ITaskList, TaskDTO } from "./Task.types";

export class TaskList implements ITaskList {
    tasks: (ITask)[]
    constructor() {
        this.tasks = []
    }
    getTaskList(API: APII<string, TaskDTO[]>) {
        let result: TaskDTO[] = API.get(localStorageConstants.key)
        for (let i in result) {
            this.add(new Task(result[i]))
        }
    }
    add(task: ITask) {
        this.tasks.push(task)
        return this
    }
    delete(id: number) {
        let result = this.tasks.filter((task) => task.getId() !== id)
        this.tasks = result
        return this
    }
    getById(id: number): ITask | null {
        let result = null
        for (let i in this.tasks) {
            if (this.tasks[i].getId() === id) {
                result = this.tasks[i]
            }
        }
        return result
    }
    hasById(id: number) {
        let has = false
        for (let i in this.tasks) {
            if (this.tasks[i].getId() === id) {
                has = true
            }
        }
        return has
    }
}