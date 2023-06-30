export const DeafaultTaskDiscription = {
    EmptyValue: (): typeof msg => {
        let msg = "Валидатора не существует" as const
        return msg
    }
} as const

export const TaskValidatorDiscriptions = {
    LowLetters: (value: number): typeof msg => {
        let msg = `Необходимо не менее ${value} символов` as const
        return msg
    }
} as const

export type DiscriptionsType = ReturnType<typeof TaskValidatorDiscriptions[keyof typeof TaskValidatorDiscriptions]> |
    ReturnType<typeof DeafaultTaskDiscription[keyof typeof DeafaultTaskDiscription]>