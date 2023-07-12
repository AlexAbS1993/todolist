import { TaskDTO } from "../../Buisness/Task/Task.types";
import { TaskController } from "./taskController";

export interface ControllerStateAPI<dataType>{
    addTaskToList(controller: TaskController, data: dataType, path: string):void
    getTasks(controller: TaskController, path: string): Promise<dataType[]>|null
    deleteTask(controller: TaskController, data: number, path: string): void
}

export class NoAPIstate implements ControllerStateAPI<TaskDTO>{
    addTaskToList(_controller: TaskController){
        //
    }
    getTasks(_controller: TaskController){
        //
        return null
    }
    deleteTask(){
        //
    }
}

export class LocalStateExist implements ControllerStateAPI<TaskDTO>{
    addTaskToList(controller: TaskController, data: TaskDTO,path: string){
        controller.API!.useLocal()!.PostOne(data, path)
    }
    async getTasks(controller: TaskController, path: string){
        let result = await controller.API!.useLocal()!.GETall(path)
        return result
    }
    deleteTask(controller: TaskController, data: number,path: string){
        controller.API?.useLocal()?.deleteOne(data, path)
    }
}

export class APIoutStateExist implements ControllerStateAPI<TaskDTO>{
    addTaskToList(controller: TaskController, data: TaskDTO, path: string){
        controller.API!.useOutAPI()?.PostOne(data, path)
    }
    async getTasks(controller: TaskController, path: string){
        let result = await controller.API!.useOutAPI()!.GETall(path)
        return result
    }
    deleteTask(controller: TaskController, data: number,path: string){
        controller.API?.useOutAPI()?.deleteOne(data, path)
    }
}