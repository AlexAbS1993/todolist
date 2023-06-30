import { ITaskState, ITask } from "./Task.types";

export class TaskStateNew implements ITaskState {
    use(task: ITask) {
        task.changeState(new TaskStateInProgress())
    };
}

export class TaskStateInProgress implements ITaskState {
    use(task: ITask) {
        task.changeState(new TaskStateEnd())
    }
}

export class TaskStateEnd implements ITaskState {
    use() {
        return
    }
}