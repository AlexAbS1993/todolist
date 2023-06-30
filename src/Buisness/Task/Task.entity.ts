import { ToDoValidatorOperations, ToDoValidatorOperationsType } from "../../data/operations";
import { DeafaultTaskDiscription } from "../../data/validatorDiscriptions";
import { IValidatable, IValidator, ValidateResultType } from "../../lib/validator/Validator.types";
import { TaskStateNew } from "./Task.state";
import { ITask, ITaskState, TaskDTO } from "./Task.types";

export class Task implements ITask, IValidatable<any> {
    private name: string;
    private discription: string;
    private id: number;
    private state: ITaskState;
    public requiredValidators: (keyof ToDoValidatorOperationsType)[];
    public validators: { [key: string]: IValidator<any> }
    dateStart: string | null
    dateEnd: string | null
    timeInProgress: string | null
    constructor(data: TaskDTO) {
        this.name = data.name
        this.discription = data.discription
        this.id = data.id
        this.state = new TaskStateNew()
        this.requiredValidators = []
        this.validators = {}
        this.dateStart = data.dateStart
        this.dateEnd = data.dateEnd
        this.timeInProgress = data.timeInProgress
    }
    setStartDate() {
        let now = Date.now().toString()
        this.dateStart = now
    }
    setEndDate() {
        let now = Date.now().toString()
        this.dateEnd = now
    }
    setProgressTime() {
        let end = new Date(this.dateEnd as string)
        let start = new Date(this.dateStart as string)
        let result = end.getDate() - start.getDate()
        this.timeInProgress = result.toString()
    }
    public getState() {
        return this.state
    }
    public getId() {
        return this.id
    }
    public getDiscription() {
        return this.discription
    }
    public getName() {
        return this.name
    }
    public setName(name: string) {
        let validate = this.validateIt({ name }, ToDoValidatorOperations.nameLength)
        if (!validate.status && validate.discription !== DeafaultTaskDiscription.EmptyValue()) {
            throw new Error()
        }
        this.name = name
        return this
    };
    public setDiscription(disc: string) {
        let validate = this.validateIt({ disc }, ToDoValidatorOperations.discLength)
        if (!validate.status && validate.discription !== DeafaultTaskDiscription.EmptyValue()) {
            throw new Error()
        }
        this.discription = disc
        return this
    };
    public changeState(state: ITaskState) {
        this.state = state
        return this
    }

    validateIt<T>(data: T, operation: keyof ToDoValidatorOperationsType) {
        if (!this.validators[operation]) {
            return {
                status: false,
                discription: DeafaultTaskDiscription.EmptyValue(),
                validType: ToDoValidatorOperations[operation]
            } as ValidateResultType
        }
        let result: ValidateResultType = this.validators[operation].validate(data)
        return result
    };
    addValidator<T>(validator: IValidator<T>, name: keyof ToDoValidatorOperationsType) {
        this.validators[name as keyof ToDoValidatorOperationsType] = validator
        return this
    }
}