import { FC, useEffect, useState } from "react";
import classes from "./Task.module.css";
import { ITaskUI, ITaskUIList } from "./Task.ui.types";
import { GetTaskListFromModelCommand } from "../../../lib/commands/getTaskListFromModel";
import { LocalStorageAPI } from "../../../API/localStorage.api";
import { TaskDTO } from "../../../Buisness/Task/Task.types";
import { TaskListUi } from "./Task.ui.entity";

export type TaskPropsType = {
  name: string;
  discription: string;
  children: React.ReactNode;
};

export const Task: FC<TaskPropsType> = ({ discription, name, children }) => {
  return (
    <div className={[classes.task_container].join(" ")}>
      <div className={classes.task_title_container}>
        <h1>{name}</h1>
      </div>
      <div className={classes.task_discription_container}>
        <p>{discription}</p>
      </div>
      <div className={classes.task_instruments_container}>{children}</div>
    </div>
  );
};

export const TaskListContainer: FC = () => {
  const [taskList, setTaskList] = useState<ITaskUIList>(new TaskListUi([]));
  useEffect(() => {
    let initialState = new GetTaskListFromModelCommand({
      API: new LocalStorageAPI<string, TaskDTO[]>(),
    }).execute();
    setTaskList(initialState);
  }, []);
  return (
    <div>
      {taskList.tasks.map((task: ITaskUI) => {
        return (
          <Task
            key={task.id}
            discription={task.discription}
            name={task.name}
            children={<></>}
          />
        );
      })}
    </div>
  );
};
