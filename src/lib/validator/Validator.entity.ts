import { IValidator, ValidatorFnType } from "./Validator.types";

export class Validator<T> implements IValidator<T> {
    private fn: ValidatorFnType<any>
    constructor(fn: ValidatorFnType<T>) {
        this.fn = fn
    }
    validate<T>(data: T) {
        return this.fn(data)
    };
}