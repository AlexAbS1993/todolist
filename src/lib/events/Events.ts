import { EventsName } from "../../data/events"
import { Mapper } from "../mappers/Mapper.type"
import { EventAccessUsage, IEvent, IEventList, IEventable } from "./Event.interface"

export class ProgrammEventWithMapperDecorator {
    subscribers: IEventable[]
    name: EventsName
    mapper: (from: string, to: string) => Mapper<any, any> | Mapper<any, any>
    constructor(programmEvent: ProgrammEvent, mappers: (from: string, to: string) => Mapper<any, any> | Mapper<any, any>){
        this.subscribers = programmEvent.subscribers
        this.name = programmEvent.name
        this.mapper = mappers
    }
    subscribe<Entity extends IEventable>(entity: Entity){
        this.subscribers.push(entity)
        return this
    }
    invoke<eventInvokeDataType>(data:eventInvokeDataType, initiator: EventAccessUsage){
        for(let sub in this.subscribers){
            let currentData = data
            let mapper = this.mapper(initiator.instanceName, this.subscribers[sub].instanceName)
            if (mapper){
                currentData = mapper.doMap(data)
            }
            this.subscribers[sub].update<eventInvokeDataType>(currentData, this.name)
        }
    }
}

export class ProgrammEvent implements IEvent<EventsName> {
    subscribers: IEventable[]
    name: EventsName
    constructor(name: EventsName){
        this.subscribers = []
        this.name = name
    }
    subscribe<Entity extends IEventable>(entity: Entity){
        this.subscribers.push(entity)
        return this
    }
    invoke<eventInvokeDataType>(data:eventInvokeDataType, _initiator: EventAccessUsage){
        for(let sub in this.subscribers){
            this.subscribers[sub].update<eventInvokeDataType>(data, this.name)
        }
    }
}

export class EventList implements IEventList{
    events: {[key in EventsName]?: IEvent<EventsName>}
    constructor(){
        this.events = {}
    }
    add(event: IEvent<EventsName>){
        this.events[event.name] = event
        return this
    }
    delete(eventName: EventsName){
        delete this.events[eventName]
        return this
    }
    get(eventName: EventsName){
        return this.events[eventName]
    }
}