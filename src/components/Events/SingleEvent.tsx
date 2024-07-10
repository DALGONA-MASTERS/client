import React from "react";
import { EventType } from "../../types/Event";
import { useJoinEventMutation } from "../../features/api/apiSlice";
import { format } from "date-fns";
import { FaShareAlt } from "react-icons/fa";

function SingleEvent({ event }: { event: EventType }) {
  const [joinEvent, joiEventResult] = useJoinEventMutation();
  const handleShareEvent = (eventId: string) => {
    const shareUrl = `${window.location.origin}/events/${eventId}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Event link copied to clipboard!");
  };
  const handleJoinEvent = async (eventId: string) => {
    try {
      await joinEvent({ eventId }).unwrap();
      alert("Joined event successfully!");
    } catch (error) {
      console.error("Failed to join event:", error);
    }
  };
  return (
    <div
      key={event._id}
      className="min-w-[200px] bg-white shadow-md rounded-md p-4 flex flex-col items-center "
    >
      <img
        src={event.image || "https://via.placeholder.com/300x200"}
        alt="Event"
        className="w-full h-32 object-cover rounded-t-md mb-2"
      />
      <div className="text-gray-600 mb-1">
        {format(new Date(event.startDate), "MMMM dd, yyyy")}
      </div>
      <div className="font-bold text-lg mb-1">{event.title}</div>
      <div className="text-gray-500 mb-4">
        {event.participants.length} participants
      </div>
      <button
        onClick={() => handleJoinEvent(event._id)}
        className="mb-2 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
      >
        Join Event
      </button>
      <button
        onClick={() => handleShareEvent(event._id)}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        <FaShareAlt className="inline-block mr-2" />
        Share Event
      </button>
    </div>
  );
}

export default SingleEvent;
