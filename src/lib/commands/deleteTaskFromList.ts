import { TaskController } from "../controllers/taskController";
import { Command } from "./Comand.types";

export class DeleteTaskFromList implements Command<number, void>{
    execute(data: number): void {
        TaskController.getInstance().deleteTask(data)
    }
}