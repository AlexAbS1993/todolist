export interface Mapper<T, K> {
    doMap(from: T): K
}