import { ITaskUI } from "../../UI/components/Task/Task.ui.types";
import { TaskController } from "../controllers/taskController";
import { MapperFromUiToTaskEntity } from "../mappers/FromTaskUiToTaskEntity.mapper";
import { Command } from "./Comand.types";

export class AddTaskToListCommand implements Command<ITaskUI, void>{
    execute(data: ITaskUI): void {
       let mappedTask = new MapperFromUiToTaskEntity().doMap(data)
       TaskController.Instance.addTaskToList(mappedTask)
    } 
}