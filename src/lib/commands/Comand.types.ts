export interface Command<T, K> {
    execute(data: T): K
}
