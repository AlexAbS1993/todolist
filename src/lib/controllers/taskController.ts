import { IAPI } from "../../API/API.types";
import { Task } from "../../Buisness/Task/Task.entity";
import { ITask, ITaskList, TaskDTO } from "../../Buisness/Task/Task.types";
import cathalog from "../../Cathalog/cathalog";
import { InstancesName } from "../../Cathalog/cathalog.instances.types";
import { APIdata } from "../../data/API";
import { localStorageConstants } from "../../data/localStorage";
import { APIoutStateExist, ControllerStateAPI, LocalStateExist, NoAPIstate } from "./taskController.APIstate";


export class TaskController {
    API: IAPI<string, TaskDTO, TaskDTO> | null
    APIstate: ControllerStateAPI<TaskDTO>[]
    private static _instance: TaskController;
    constructor(){
        this.API = null
        this.APIstate = [new NoAPIstate()]
    }
    public static getInstance(): TaskController
    {
        return this._instance || (this._instance = new this());
    }
    defineAPI<RequestValue, PostedData, ResponseData>(API: IAPI<RequestValue, PostedData, ResponseData>){
        this.API = API as IAPI<string, TaskDTO, TaskDTO>
        this.APIstate = []
        if (API.isLocalApiExist()){
            this.APIstate.push(new LocalStateExist())
        }
        if (API.isOutApiExist()){
            this.APIstate.push(new APIoutStateExist())
        }
        return this
    }
    addTaskToList(data: TaskDTO){
        cathalog.get<ITaskList>(InstancesName.TaskList).add(new Task(data))
        this.APIstate.forEach((state) => {
            if (state instanceof LocalStateExist){
                state.addTaskToList(this, data, localStorageConstants.key)
            }
            if (state instanceof APIoutStateExist){
                state.addTaskToList(this, data, APIdata.server)
            }        
        })
    }
    async getTasks(): Promise<ITaskList>{
        const result = cathalog.get<ITaskList>(InstancesName.TaskList)
        let listLocal: TaskDTO[]
        let listOut: TaskDTO[]
        await (async () => {
            await this.APIstate.forEach(async (state) => {
                if (state instanceof LocalStateExist){
                    listLocal = await state.getTasks(this, localStorageConstants.key)
                }
                if (state instanceof APIoutStateExist){
                    listOut = await state.getTasks(this, APIdata.server)
                }
            })
        })()
        let taskListDTO:  ITask[]
        if(!Boolean(listOut!)){
            taskListDTO = listLocal!.map((task) => {
                return new Task(task)
            })
        }
        else {
            
        }
        result.define(taskListDTO!)
        return result
    }
    deleteTask(data: number){
        const taskList = cathalog.get<ITaskList>(InstancesName.TaskList)
        taskList.delete(data)
        this.APIstate.forEach(async (state) => {
            if (state instanceof LocalStateExist){
                state.deleteTask(this, data, localStorageConstants.key)
            }
            if (state instanceof APIoutStateExist){
                
            }
        })
    }
}