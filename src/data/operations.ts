export const ToDoValidatorOperations = {
    nameLength: 'nameLength',
    discLength: 'discLength'
} as const
export type ToDoValidatorOperationsType = {
    [key in keyof (typeof ToDoValidatorOperations)]: keyof (typeof ToDoValidatorOperations)
}