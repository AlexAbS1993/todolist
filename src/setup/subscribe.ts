import { taskList } from "../Buisness/Task"
import cathalog from "../Cathalog/cathalog"
import { InstancesName, UIUnstanceName } from "../Cathalog/cathalog.instances.types"
import cathalogUI from "../Cathalog/cathalogUI"
import { TaskListUi } from "../UI/components/Task/Task.ui.entity"
import { EventsName } from "../data/events"
import { IEventList } from "../lib/events/Event.interface"
import eventlist from "../lib/events/index.ts";

export function subscribeToEvents(){
    // Добавление списка эвентов моделям
taskList.addEventList(eventlist)

    // Получение инстансов эвентов и моделей из каталога
const EventsListFromCathalog = cathalog.get<IEventList>(InstancesName.EventList)
const TaskListUIFromCathalog:TaskListUi = cathalogUI.get(UIUnstanceName.TaskListUI)

    // Подписка 
EventsListFromCathalog.get(EventsName.TaskDeleted)!.subscribe<TaskListUi>(TaskListUIFromCathalog)
EventsListFromCathalog.get(EventsName.TaskAdded)!.subscribe<TaskListUi>(TaskListUIFromCathalog)
}