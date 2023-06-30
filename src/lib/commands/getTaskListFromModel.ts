import { APIIforLocalStorage } from "../../API/API.types";
import { TaskList } from "../../Buisness/Task/TaskList.entity";
import { TaskListUi, TaskUI } from "../../UI/components/Task/Task.ui.entity";
import { ITaskUIList } from "../../UI/components/Task/Task.ui.types";
import { MapperFromTaskToTaskUi } from "../mappers/FromTaskEntityToTaskUi.mapper";
import { Command, getTaskListFromModelCommandDTO } from "./Comand.types";

export class GetTaskListFromModelCommand implements Command<undefined, ITaskUIList>{
    API: APIIforLocalStorage
    constructor(data: getTaskListFromModelCommandDTO) {
        this.API = data.API
    }
    execute(_data?: undefined): ITaskUIList {
        let result = new TaskList()
        result.getTaskList(this.API)
        let mappedResult = result.tasks.map((task) => {
            return new TaskUI(new MapperFromTaskToTaskUi().doMap(task))
        })
        return new TaskListUi(mappedResult)
    }
}