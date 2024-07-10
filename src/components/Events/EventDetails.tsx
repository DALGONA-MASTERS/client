import React from "react";
import { EventType } from "../../types/Event";
import { format } from "date-fns";
import { FaUserAlt } from "react-icons/fa";

function EventDetails({ event }: { event: EventType }) {
  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-md p-6">
      <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
      <div className="min-w-[60%]">
        <img
          className=" max-w-full max-h-full"
          alt="event-img"
          src={"https://via.placeholder.com/300x200"}
        />
      </div>
      <div className="text-gray-700 mb-4">
        <p>
          <strong>Start Date:</strong>{" "}
          {format(new Date(event.startDate), "MMMM dd, yyyy hh:mm a")}
        </p>
        <p>
          <strong>End Date:</strong>{" "}
          {format(new Date(event.endDate), "MMMM dd, yyyy hh:mm a")}
        </p>
      </div>
      <div className="text-gray-700 mb-4">
        <p>
          <strong>Description:</strong> {event.description}
        </p>
      </div>
      <div className="text-gray-700 mb-4 flex items-center">
        <FaUserAlt className="mr-2" />
        <p>
          <strong>Created By:</strong> {event.createdBy}
        </p>
      </div>
    </div>
  );
}

export default EventDetails;
