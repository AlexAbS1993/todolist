import { Validator } from "./Validator.entity";
import { validateNameLength } from "./validators";

export const TaskNameLengthValidator = new Validator(validateNameLength)