import { ITask } from "../../Buisness/Task/Task.types";
import { TaskUiDTO } from "../../UI/components/Task/Task.ui.types";
import { Mapper } from "./Mapper.type";

export class MapperFromTaskToTaskUi implements Mapper<ITask, TaskUiDTO>{
    doMap(from: ITask): TaskUiDTO {
        return {
            name: from.getName(),
            discription: from.getDiscription(),
            id: from.getId(),
            dateStart: from.dateStart,
            dateEnd: from.dateEnd,
            timeInProgress: from.timeInProgress,
        }
    }
}