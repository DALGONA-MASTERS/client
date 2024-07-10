
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventType } from '../../types/Event'; // Import your Post type from where it's defined
import { RootState } from '@reduxjs/toolkit/query';

interface EventState {
    events: EventType[];

}

const initialState: EventState = {
    events: [],

};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {

        setEvents(state, action: PayloadAction<EventType[]>) {
            state.events = action.payload;

        },
        addEventData(state, action: PayloadAction<EventType>) {
            state.events.push(action.payload);

        },
        editEventData(state, action: PayloadAction<EventType>) {
            const index = state.events.findIndex(event => event._id === action.payload._id);
            if (index !== -1) {
                state.events[index] = action.payload;
            }
        },
        deleteEventData(state, action: PayloadAction<string>) {
            state.events = state.events.filter(event => event._id !== action.payload);
        },



    },
});

export const { setEvents, addEventData, editEventData, deleteEventData } = eventsSlice.actions;
export const selectEvents = (state: any) => state.events.events;

export default eventsSlice.reducer;