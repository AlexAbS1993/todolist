import { TaskDTO } from "../../Buisness/Task/Task.types";
import { ITaskUI } from "../../UI/components/Task/Task.ui.types";
import { Mapper } from "./Mapper.type";

export class MapperFromUiToTaskEntity implements Mapper<ITaskUI, TaskDTO >{
    doMap(from: ITaskUI):TaskDTO  {
        return {
            name: from.name,
            discription: from.discription,
            id: from.id,
            dateStart: from.dateStart,
            dateEnd: from.dateEnd,
            timeInProgress: from.timeInProgress
        }
    }
}