interface EventData {
    title: string, startDate: string, endDate: string, description: string, actionType: string, target: string,

}
interface UpdateEventData {
    _id: string,
    title: string, startDate: string, endDate: string, description: string, actionType: string, target: string,
}
interface EventType {
    _id: string,
    image: string,
    title: string, startDate: string, endDate: string, description: string, actionType: string, target: string, participants: string[]
}

export type { EventData, UpdateEventData, EventType }