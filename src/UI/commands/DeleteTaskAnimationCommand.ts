import { Command } from "../../lib/commands/Comand.types";
import { ITaskUI } from "../components/Task/Task.ui.types";

export class DeleteClassAnimationCommand implements Command<ITaskUI, void>{
    execute(task: ITaskUI){
        task.setClass("task_deleting")
    }
}