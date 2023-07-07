import React from "react";
import ReactDOM from "react-dom/client";
import App from "./UI/App.tsx";
import "./index.css";
import cathalog from "./Cathalog/cathalog.ts";
import { ITaskList, TaskDTO } from "./Buisness/Task/Task.types.ts";
import { TaskList } from "./Buisness/Task/TaskList.entity.ts";
import { InstancesName } from "./Cathalog/cathalog.instances.types.ts";
import { AddTaskToListCommand } from "./lib/commands/addTaskToList.ts";
import { TaskUI } from "./UI/components/Task/Task.ui.entity.ts";
import { TaskController } from "./lib/controllers/taskController.ts";
import { LocalStorageAPI } from "./API/localStorage.api.ts";
import { localStorageConstants } from "./data/localStorage.ts";
import { API } from "./API/API.ts";


let APIstorage = new API(new LocalStorageAPI(localStorageConstants.key), null)

TaskController.Instance
TaskController.Instance.defineAPI(APIstorage)
cathalog.add<ITaskList>(InstancesName.TaskList, new TaskList())
new AddTaskToListCommand().execute(new TaskUI({
  name: "Do anything",
  discription: "String",
  id: 1,
  dateStart: null,
  dateEnd:  null,
  timeInProgress: null
}))

new AddTaskToListCommand().execute(new TaskUI({
  name: "Do anything2",
  discription: "String2",
  id: 2,
  dateStart: null,
  dateEnd:  null,
  timeInProgress: null
}))

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
