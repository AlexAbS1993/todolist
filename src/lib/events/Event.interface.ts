import { EventsName } from "../../data/events"

export interface IEvent<namespace>{
    name: namespace
    subscribers: IEventable[]
    invoke<eventInvokeDataType>(data: eventInvokeDataType, initiator: EventAccessUsage):void
    subscribe<Entity extends IEventable>(entity: Entity):this
}

export interface IEventable {
    instanceName: string,
    update<eventInvokeDataType>(data:eventInvokeDataType, name:EventsName):void
}

export interface IEventList{
    events: {[key in EventsName]?: IEvent<EventsName>}
    add(event: IEvent<EventsName>): this
    delete(eventName: EventsName): this
    get(eventName: EventsName): IEvent<EventsName> | undefined
}

export interface EventAccessUsage {
    instanceName: string,
    eventList:IEventList|null
    useEvent<eventInvokeDataType>(data:eventInvokeDataType, name:EventsName):void
    addEventList(eventList: IEventList): this
    isEventListHere():boolean
}