import { ToDoValidatorOperationsType } from "../../data/operations"
import { DiscriptionsType } from "../../data/validatorDiscriptions"

export type ValidateResultType = {
    status: boolean,
    discription: DiscriptionsType,
    validType: keyof ToDoValidatorOperationsType
}

export type ValidatorFnType<T> = (data: T) => ValidateResultType

export interface IValidator<T> {
    validate: (data: T) => ValidateResultType
}

export type RequireValidatorsType = (keyof ToDoValidatorOperationsType)[]

export interface IValidatable<T> {
    requiredValidators: RequireValidatorsType
    validateIt: (data: T, operation: keyof ToDoValidatorOperationsType) => ValidateResultType
    addValidator: (validator: IValidator<T>, name: keyof ToDoValidatorOperationsType) => void
}
