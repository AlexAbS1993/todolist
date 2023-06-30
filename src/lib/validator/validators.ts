import { ToDoValidatorOperations } from "../../data/operations";
import { DeafaultTaskDiscription, TaskValidatorDiscriptions } from "../../data/validatorDiscriptions";
import { ValidateResultType } from "./Validator.types";

export function validateNameLength(data: string): ValidateResultType {
    const requiredNameLength = 2
    let result: ValidateResultType = {
        status: false,
        discription: DeafaultTaskDiscription.EmptyValue(),
        validType: ToDoValidatorOperations.nameLength
    }
    if (data.length <= requiredNameLength) {
        result.discription = TaskValidatorDiscriptions.LowLetters(requiredNameLength)
    }
    return result
}

export function validateDiscriptionsLength(data: string): ValidateResultType {
    const requiredNameLength = 5
    let result: ValidateResultType = {
        status: false,
        discription: DeafaultTaskDiscription.EmptyValue(),
        validType: ToDoValidatorOperations.discLength
    }
    if (data.length <= requiredNameLength) {
        result.discription = TaskValidatorDiscriptions.LowLetters(requiredNameLength)
    }
    return result
} 