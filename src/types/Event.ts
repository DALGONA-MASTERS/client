interface EventData {
    title: string, startDate: string, endDate: string, description: string, actionType: string, target: string,

}
interface UpdateEventData {
    _id: string,
    title: string, startDate: string, endDate: string, description: string, actionType: string, target: string,
}
interface EventType {
    unit: 'string',
    _id: string,
    createdBy: string,
    picture: string,
    title: string, startDate: string, endDate: string, description: string, actionType: string, target: string, participants: { _id: string }[]
}

export type { EventData, UpdateEventData, EventType }