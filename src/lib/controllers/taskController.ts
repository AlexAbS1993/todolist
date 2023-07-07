import { IAPI } from "../../API/API.types";
import { Task } from "../../Buisness/Task/Task.entity";
import { ITaskList, TaskDTO } from "../../Buisness/Task/Task.types";
import cathalog from "../../Cathalog/cathalog";
import { InstancesName } from "../../Cathalog/cathalog.instances.types";


export class TaskController {
    API: IAPI<string, TaskDTO, TaskDTO> | null
    private static _instance: TaskController;
    constructor(){
        this.API = null
    }
    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }
    defineAPI(API: IAPI<string, TaskDTO, TaskDTO>){
        this.API = API
        return this
    }
    addTaskToList(data: TaskDTO){
        cathalog.get<ITaskList>(InstancesName.TaskList).add(new Task(data))
        this.API!.useLocal().PostOne(data)
        try{

        }
        catch(e){}
    }
    getTasks(): ITaskList{
        const result = cathalog.get<ITaskList>(InstancesName.TaskList)
        let list
        try{
            
        }
        catch(e){

        }
        list = this.API!.useLocal().GETall()
        let taskListDTO = list.map((task) => {
            return new Task(task)
        })
        result.define(taskListDTO)
        return result
    }
}