import { ITask, ITaskList } from "./Task.types";

export class TaskList implements ITaskList {
    tasks: (ITask)[]
    constructor() {
        this.tasks = []
    }
    define(data: ITask[]){
        this.tasks = data
        return this
    }
    add(task: ITask) {
        this.tasks.push(task)
        return this
    }
    delete(id: number) {
        const result = this.tasks.filter((task) => task.getId() !== id)
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