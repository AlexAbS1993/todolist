import { EventsName } from "../../data/events";
import { mapperSelector } from "../mappers/mapperSelector";
import { EventList,  ProgrammEvent,  ProgrammEventWithMapperDecorator } from "./Events";


const eventList = new EventList()
eventList
.add(new ProgrammEventWithMapperDecorator(new ProgrammEvent(EventsName.TaskAdded), mapperSelector))
.add(new ProgrammEvent(EventsName.ErrorHappens))
.add(new ProgrammEvent(EventsName.TaskDeleted))

export default eventList