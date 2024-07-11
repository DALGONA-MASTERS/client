import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetGetEventMutation,
  useGetUserMutation,
} from "../../features/api/apiSlice";
import EventDetails from "./EventDetails";
import { EventType } from "../../types/Event";

const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>()!;
  const [getEvent, getEventResult] = useGetGetEventMutation();
  const [event, setEvent] = useState<null | EventType>(null);
  const [getUser, getUserResult] = useGetUserMutation();

  useEffect(() => {
    getEvent(eventId!);
  }, []);
  useEffect(() => {
    if (getEventResult.isSuccess && getEventResult.data) {
      setEvent(getEventResult.data);
    } else if (getEventResult.isError) {
      console.error("Error fetching event", getEventResult.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <div className=" p-8 home-container flex flex-col items-center h-full overflow-y-auto custom-scrollbar mt-[130px] space-y-8 relative">
      {event ? <EventDetails event={event} /> : <div>Event not found</div>}
    </div>
  );
};

export default EventDetailsPage;
