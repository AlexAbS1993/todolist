import { InstancesName, UIUnstanceName } from "../../Cathalog/cathalog.instances.types";
import { MapperFromTaskToTaskUi } from "./FromTaskEntityToTaskUi.mapper";
import { MapperFromUiToTaskEntity } from "./FromTaskUiToTaskEntity.mapper";
import { Mapper } from "./Mapper.type";

export const fromTaskToTaskUIMapper = new MapperFromTaskToTaskUi()
export const fromTaskUiToTaskEntity = new MapperFromUiToTaskEntity()

type MappersMAPType = {
    [key: string]: {
        [key: string] : Mapper<any, any>
    }  
}
export const MappersMAP: MappersMAPType = {
    [InstancesName.TaskList]: {
        [UIUnstanceName.TaskListUI]: fromTaskToTaskUIMapper
    },
    [UIUnstanceName.TaskListUI]: {
        [InstancesName.TaskList]: fromTaskUiToTaskEntity
    }
}