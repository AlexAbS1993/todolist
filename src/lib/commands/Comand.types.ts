export interface Command<DataType, ResonseType> {
    execute(data: DataType): ResonseType|Promise<ResonseType>
}
