import { Dispatch, FC, SetStateAction, memo,  useEffect,  useState } from "react";
import classes from "./Task.module.css";
import { ITaskUI, ITaskUIList } from "./Task.ui.types";
import { GetTaskListFromModelCommand } from "../../../lib/commands/getTaskListFromModel";
import { TaskListUi, TaskUI } from "./Task.ui.entity";
import { AddTaskToListCommand } from "../../../lib/commands/addTaskToList";
import { DeleteTaskFromList } from "../../../lib/commands/deleteTaskFromList";
import { DeleteClassAnimationCommand } from "../../commands/DeleteTaskAnimationCommand";
import cathalogUI from "../../../Cathalog/cathalogUI";
import {  UIUnstanceName } from "../../../Cathalog/cathalog.instances.types";
import { DeleteButton } from "../Button/buttons/DeleteButton";
import { AddNewTaskButton } from "../Button/buttons/SimpleButton";

export type TaskPropsType = {
  name: string;
  discription: string;
  children: React.ReactNode;
  classProps: string
  id: number
};
type ChildType = {
  task: ITaskUI
  changeTrigger: Dispatch<SetStateAction<boolean>>
  styleTrigger: Dispatch<SetStateAction<boolean>>
}

function deleteTask(task:  ITaskUI, styleTrigger:Dispatch<SetStateAction<boolean>>, changeTrigger: Dispatch<SetStateAction<boolean>>){
  new DeleteClassAnimationCommand().execute(task)
  styleTrigger((prev) =>  !prev)
  setTimeout(() => {
    new DeleteTaskFromList().execute(task.id)
    changeTrigger((prev) =>  !prev)
  }, 1100) 
}

function addTask(task: ITaskUI, addTaskTrigger: Dispatch<SetStateAction<boolean>>){
  new AddTaskToListCommand().execute(task)
  addTaskTrigger((prev) => !prev)
}

const ChildFunc:FC<ChildType> = memo(({task,
   changeTrigger, styleTrigger
  }) => {
  return <DeleteButton handler={() => {
    deleteTask(task,
      changeTrigger, styleTrigger)
  }}/>
}, (_prevProps, _nextProps) => {
  return true
})

export const Task: FC<TaskPropsType> = memo(({ discription, name, children, classProps }) => {
  return (
    <div className={`${classes.task_container} ${classProps}`}>
      <div className={classes.task_title_container}>
        <h1>{name}</h1>
      </div>
      <div className={classes.task_discription_container}>
        <p>{discription}</p>
      </div>
      <div className={classes.task_instruments_container}>
        {children}
        </div>
    </div>
  );
}, (prevProps: Readonly<TaskPropsType>, nextProps: Readonly<TaskPropsType>):boolean => {
  if (prevProps.discription !== nextProps.discription || prevProps.name !== nextProps.name){
    return false
  }
  if(prevProps.classProps.length !== nextProps.classProps.length){
    return false
  }
  return true
})


export const initialTaskListUI = new TaskListUi([])

export const TaskListContainer: FC = () => {
  const [taskList, setTaskList] = useState<ITaskUIList>(new TaskListUi([]));
  const [changeTrigger, setTrigger] = useState(false)
  const [styleTrigger, setStyleTrigger] = useState(false)
  const [initialDone, setInitialDone] = useState(false)
  useEffect(() => {
    async function  setTaskOnList(){
      const initialState = await new GetTaskListFromModelCommand().execute();
      cathalogUI.get<TaskListUi>(UIUnstanceName.TaskListUI).define(initialState.tasks)
      setTaskList(cathalogUI.get(UIUnstanceName.TaskListUI));
      setInitialDone(true)
    }  
    setTaskOnList()    
  }, [])
  useEffect(() => {
    if(initialDone){
      setTaskList(cathalogUI.get(UIUnstanceName.TaskListUI))
    }  
  }, [changeTrigger, initialDone]);
  useEffect(() => {
    if(initialDone){
      setTaskList(cathalogUI.get(UIUnstanceName.TaskListUI)) 
    }
  }, [styleTrigger, initialDone])
  return (
    <div>
      <AddNewTaskButton handler={() => {
        addTask(new TaskUI({
          name: "Do anything",
          discription: "new Added",
          id: Math.floor(Math.random() * 1000000),
          dateStart: null,
          dateEnd:  null,
          timeInProgress: null
        }), setTrigger)
      }} />
      {taskList.tasks.map((task: ITaskUI) => {
        let classPropsString = task.classStyle.map((task) => classes[task]).join(" ")
        return (
          <Task
            classProps={classPropsString}
            key={task.id}
            discription={task.discription}
            name={task.name}
            id={task.id}
          >
               <ChildFunc
                changeTrigger={(setTrigger)} 
                task={task}
                styleTrigger={(setStyleTrigger)}
                />
            </Task>
        );
      })}
    </div>
  );
};
