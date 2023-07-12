import { TaskListUi, TaskUI } from "../../UI/components/Task/Task.ui.entity";
import { ITaskUIList } from "../../UI/components/Task/Task.ui.types";
import { TaskController } from "../controllers/taskController";
import { MapperFromTaskToTaskUi } from "../mappers/FromTaskEntityToTaskUi.mapper";
import { Command } from "./Comand.types";

export class GetTaskListFromModelCommand implements Command<void, ITaskUIList>{
    async execute(): Promise<ITaskUIList> {
        let result =  await TaskController.getInstance().getTasks()
        const mappedResult = result.tasks.map((task) => {
            return new TaskUI(new MapperFromTaskToTaskUi().doMap(task)).initialize()
        })
        return new TaskListUi(mappedResult)
    }
}