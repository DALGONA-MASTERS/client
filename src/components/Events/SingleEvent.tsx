import React, { useEffect, useState } from "react";
import { EventType } from "../../types/Event";
import {
  useDeleteEventMutation,
  useJoinEventMutation,
  useLeaveEventMutation,
} from "../../features/api/apiSlice";
import { format } from "date-fns";
import { FaShareAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { handleDeleteData, handleEditData } from "../../utilities/apiUtils";
import { AppDispatch } from "../../app/store";
import {
  deleteEventData,
  editEventData,
} from "../../features/events/eventSlice";
import EventDetails from "./EventDetails";
import { useNavigate } from "react-router-dom";

function SingleEvent({ event }: { event: EventType }) {
  const dispatch = useDispatch<AppDispatch>();
  const isEventActive = new Date(event.endDate) > new Date();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [joinEvent, joinEventResult] = useJoinEventMutation();
  const [leaveEvent, leaveEventResult] = useLeaveEventMutation();
  const [deleteEvent, deleteEventResult] = useDeleteEventMutation();
  const handleShareEvent = (eventId: string) => {
    const shareUrl = `${window.location.origin}/events/${eventId}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Event link copied to clipboard!");
  };
  const handleJoinEvent = async (eventId: string) => {
    try {
      await joinEvent({ eventId }).unwrap();
    } catch (error) {
      console.error("Failed to join event:", error);
    }
  };
  const handleLeaveEvent = async (eventId: string) => {
    try {
      await leaveEvent({ eventId }).unwrap();
      alert("Joined event successfully!");
    } catch (error) {
      console.error("Failed to join event:", error);
    }
  };
  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deleteEvent({ eventId }).unwrap();
    } catch (error) {
      console.error("Failed to join event:", error);
    }
  };

  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const handleCloseEventDetails = () => {
    setSelectedEvent(null);
  };
  const handleEventClick = (event: EventType) => {
    navigate(`/events/${event._id}`);
  };

  // handlers

  useEffect(() => {
    handleDeleteData(deleteEventResult, dispatch, deleteEventData);
  }, [deleteEventResult]);

  useEffect(() => {
    handleEditData(leaveEventResult, dispatch, editEventData);
  }, [joinEventResult]);
  useEffect(() => {
    handleEditData(leaveEventResult, dispatch, editEventData);
  }, [leaveEventResult]);
  return (
    <div
      key={event._id}
      className="min-w-[300px] bg-white shadow-md rounded-md p-4 flex flex-col items-center "
    >
      <img
        src={event.picture || "https://via.placeholder.com/300x200"}
        alt="Event"
        className="w-full h-32 object-cover rounded-t-md mb-2"
        onClick={() => handleEventClick(event)}
      />
      <div
        className="text-gray-600 mb-1"
        onClick={() => handleEventClick(event)}
      >
        {format(new Date(event.startDate), "MMMM dd, yyyy")}
      </div>
      <div
        onClick={() => handleEventClick(event)}
        className="font-bold text-lg mb-1"
      >
        {event.title}
      </div>
      <div
        onClick={() => handleEventClick(event)}
        className="text-gray-500 mb-4"
      >
        {event.participants.length} participants
      </div>
      {isEventActive &&
        (!event.participants.some(
          (participant) => participant._id === user!._id
        ) ? (
          <button
            onClick={() => handleJoinEvent(event._id)}
            className="mb-2 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          >
            Join Event
          </button>
        ) : event.participants.length === 1 ? (
          <button
            onClick={() => handleDeleteEvent(event._id)}
            className="mb-2 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          >
            Delete Event
          </button>
        ) : (
          <button
            onClick={() => handleLeaveEvent(event._id)}
            className="mb-2 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          >
            Leave Event
          </button>
        ))}
      <button
        onClick={() => handleShareEvent(event._id)}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        <FaShareAlt className="inline-block mr-2" />
        Share Event
      </button>
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative max-w-lg bg-white shadow-md rounded-md p-6 mx-4">
            <button
              onClick={handleCloseEventDetails}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              X
            </button>
            {/* <EventDetails event={selectedEvent} /> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleEvent;
