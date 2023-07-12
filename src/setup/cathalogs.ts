import { taskList } from "../Buisness/Task"
import { ITaskList } from "../Buisness/Task/Task.types"
import cathalog from "../Cathalog/cathalog"
import { InstancesName, UIUnstanceName } from "../Cathalog/cathalog.instances.types"
import cathalogUI from "../Cathalog/cathalogUI"
import { ITaskUIList } from "../UI/components/Task/Task.ui.types"
import { initialTaskListUI } from "../UI/components/Task/TaskUI"
import { EventList } from "../lib/events/Events"
import eventlist from "../lib/events/index.ts";

export function buildCathalogs(){
        // Добавление инстансов в каталог
    cathalog.add<ITaskList>(InstancesName.TaskList, taskList)
    cathalog.add<EventList>(InstancesName.EventList, eventlist)
    cathalogUI.add<ITaskUIList>(UIUnstanceName.TaskListUI, initialTaskListUI)
}