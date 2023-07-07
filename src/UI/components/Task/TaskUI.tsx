import { FC, useEffect, useState } from "react";
import classes from "./Task.module.css";
import { ITaskUI, ITaskUIList } from "./Task.ui.types";
import { GetTaskListFromModelCommand } from "../../../lib/commands/getTaskListFromModel";
import { TaskListUi } from "./Task.ui.entity";

export type TaskPropsType = {
  name: string;
  discription: string;
  children: React.ReactNode;
  classProps: string[]
};

export const Task: FC<TaskPropsType> = ({ discription, name, children, classProps }) => {
  return (
    <div className={[classes.task_container, ...classProps].join(" ")}>
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
    const initialState = new GetTaskListFromModelCommand().execute();
    setTaskList(initialState);
  }, []);
  return (
    <div>
      {taskList.tasks.map((task: ITaskUI) => {
        return (
          <Task
            classProps={task.classStyle}
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
