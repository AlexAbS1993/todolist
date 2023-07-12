import React from "react";
import ReactDOM from "react-dom/client";
import App from "./UI/App.tsx";
import "./index.css";
import {  TaskDTO } from "./Buisness/Task/Task.types.ts";
import { TaskController } from "./lib/controllers/taskController.ts";
import { LocalStorageAPI } from "./API/localStorage.api.ts";
import { localStorageConstants } from "./data/localStorage.ts";
import { API } from "./API/API.ts";
import { IAPI } from "./API/API.types.ts";
import { subscribeToEvents } from "./setup/subscribe.ts";
import { buildCathalogs } from "./setup/cathalogs.ts";


let APIstorage = new API(new LocalStorageAPI(localStorageConstants.key), null)
TaskController.getInstance()
TaskController.getInstance().defineAPI<string, TaskDTO, TaskDTO>(APIstorage as IAPI<string, TaskDTO, TaskDTO>)
buildCathalogs()
subscribeToEvents()


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


