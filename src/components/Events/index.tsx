import React, { useEffect, useState, useRef } from "react";
import {
  useCreateEventMutation,
  useGetAllEventsMutation,
  useJoinEventMutation,
} from "../../features/api/apiSlice";
import { FaShareAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEvents,
  setEvents as setEventsStore,
} from "../../features/events/eventSlice";
import { AppDispatch } from "../../app/store";
import { EventType } from "../../types/Event";
import { handleFetchedData } from "../../utilities/apiUtils";
import CreateEvent from "./CreateEvent";
import SingleEvent from "./SingleEvent";

function Events() {
  const dispatch = useDispatch<AppDispatch>();
  const eventsStore = useSelector(selectEvents);
  const [getAllEvents, getAllEventsResult] = useGetAllEventsMutation();
  const [joinEvent, joiEventResult] = useJoinEventMutation();
  const [addEvent, addEventResult] = useCreateEventMutation();
  const [events, setEvents] = useState<EventType[]>(eventsStore);
  const [newEvent, setNewEvent] = useState({ title: "", startDate: "" });
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const currentDate = new Date();
  const upcomingEvents = events.filter(
    (event) => new Date(event.startDate) > currentDate
  );
  const pastEvents = events.filter(
    (event) => new Date(event.startDate) <= currentDate
  );
  const otherEvents: EventType[] = [];

  const handleJoinEvent = async (eventId: string) => {
    try {
      await joinEvent({ eventId }).unwrap();
      alert("Joined event successfully!");
    } catch (error) {
      console.error("Failed to join event:", error);
    }
  };

  const handleShareEvent = (eventId: string) => {
    const shareUrl = `${window.location.origin}/events/${eventId}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Event link copied to clipboard!");
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addEvent(newEvent).unwrap();
      alert("Event added successfully!");
      setNewEvent({ title: "", startDate: "" });
      setShowAddEventForm(false);
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  useEffect(() => {
    handleFetchedData(getAllEventsResult, dispatch, setEventsStore);
  }, [getAllEventsResult]);

  useEffect(() => {
    setEvents(eventsStore);
  }, [eventsStore]);

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as Node;
    if (!showAddEventForm || formRef.current?.contains(target)) {
      return;
    }
    setShowAddEventForm(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showAddEventForm]);

  const formRef = useRef<HTMLDivElement>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -100,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 100,
        behavior: "smooth",
      });
    }
  };

  const renderEventCard = (event: EventType) => (
    <div
      key={event._id}
      className="min-w-[200px] bg-white shadow-md rounded-md p-4 flex flex-col items-center"
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

  return (
    <div className="home-container flex flex-col items-center h-full overflow-y-auto custom-scrollbar mt-[130px] space-y-8 relative">
      <div className="w-full flex justify-end pr-8 absolute top-0 right-0">
        <button
          onClick={() => setShowAddEventForm(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          New Event
        </button>
      </div>

      <div className="w-full">
        <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
        <div className="w-full overflow-hidden relative">
          <div className="flex items-center space-x-2">
            <FaChevronLeft
              className="cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
              onClick={scrollLeft}
            />
            <div
              ref={scrollContainerRef}
              className="flex space-x-4 p-4 overflow-x-hidden"
              style={{ scrollBehavior: "smooth" }}
            >
              {upcomingEvents.map((event) => (
                <SingleEvent key={event._id} event={event} />
              ))}
            </div>
            <FaChevronRight
              className="cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
              onClick={scrollRight}
            />
          </div>
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-xl font-bold mb-4">Passed Events</h2>
        <div className="w-full overflow-x-auto">
          <div className="flex space-x-4 p-4">
            {pastEvents.map(renderEventCard)}
          </div>
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-xl font-bold mb-4">Other Events</h2>
        <div className="flex flex-col space-y-4 p-4">
          {otherEvents.map(renderEventCard)}
        </div>
      </div>

      {showAddEventForm && (
        <div
          ref={formRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <CreateEvent />
        </div>
      )}
    </div>
  );
}

export default Events;
