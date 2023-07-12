import { InstancesName } from "../../Cathalog/cathalog.instances.types";
import { EventsName } from "../../data/events";
import { EventAccessUsage, IEventList } from "../../lib/events/Event.interface";
import { ITask, ITaskList } from "./Task.types";

export class TaskList implements ITaskList, EventAccessUsage {
    instanceName: InstancesName
    tasks: (ITask)[]
    eventList: IEventList|null;
    constructor() {
        this.instanceName = InstancesName.TaskList
        this.tasks = []
        this.eventList = null
    }  
    useEvent<eventInvokeDataType>(data: eventInvokeDataType, name: EventsName): void {
        if (this.eventList == null){
            return
        }
        else {
            if(!this.eventList.get(name)){
                return
            }
            else {
                this.eventList.get(name)!.invoke<eventInvokeDataType>(data, this)
            }
        }
    }
    addEventList(eventList: IEventList): this {
        this.eventList = eventList
        return this
    }
    isEventListHere(): boolean {
        return Boolean(this.eventList)
    }
    define(data: ITask[]){
        this.tasks = data
        return this
    }
    add(task: ITask) {
        this.tasks.push(task)
        this.useEvent<ITask>(task, EventsName.TaskAdded)
        return this
    }
    delete(id: number) {
        const result = this.tasks.filter((task) => task.getId() !== id)
        this.tasks = result
        this.useEvent<number>(id, EventsName.TaskDeleted)
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