import React, { useEffect, useState } from "react";
import { EventType } from "../../types/Event";
import { format } from "date-fns";
import { FaUserAlt } from "react-icons/fa";
import {
  useAddContributionMutation,
  useGetUserDataMutation,
} from "../../features/api/apiSlice";
import { handleEditData } from "../../utilities/apiUtils";

function EventDetails({ event }: { event: EventType }) {
  const [user, setUser] = useState<null | any>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [getUser, getUserResult] = useGetUserDataMutation();

  useEffect(() => {
    getUser(event?.createdBy!);
  }, []);

  useEffect(() => {
    if (getUserResult.isSuccess && getUserResult.data) {
      setUser(getUserResult.data);
      console.log("User fetched successfully", getUserResult.data);
    } else if (getUserResult.isError) {
      console.error("Error fetching user", getUserResult.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  useEffect(() => {
    const fetchParticipants = async () => {
      const fetchedParticipants = await Promise.all(
        event.participants.map(async (participant: { _id: string }) => {
          const result = await getUser(participant._id).unwrap();
          return result;
        })
      );
      setParticipants(fetchedParticipants);
    };

    fetchParticipants();
  }, [event.participants, getUser]);

  const [addContribution] = useAddContributionMutation();
  const [contributionValue, setContributionValue] = useState<number>(0);

  const handleAddContribution = async () => {
    try {
      await addContribution({ eventId: event._id, value: contributionValue });
      alert("Contribution added successfully!");
    } catch (error) {
      console.error("Failed to add contribution:", error);
    }
  };

  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-lg custom-scrollbar   overflow-y-auto h-screen">
      <h1 className="text-3xl font-semibold mb-6">{event.title}</h1>
      <div className="max-w-[70%] mb-6">
        <img
          className="w-full h-auto rounded-md"
          alt="event-img"
          src={event.picture || "https://via.placeholder.com/300x200"}
        />
      </div>
      <div className="text-gray-800 mb-6">
        <p className="mb-2">
          <strong>Start Date:</strong>{" "}
          {format(new Date(event.startDate), "MMMM dd, yyyy hh:mm a")}
        </p>
        <p>
          <strong>End Date:</strong>{" "}
          {format(new Date(event.endDate), "MMMM dd, yyyy hh:mm a")}
        </p>
      </div>
      <div className="text-gray-800 mb-6">
        <p>
          <strong>Description:</strong> {event.description}
        </p>
      </div>
      <div className="text-gray-800 mb-6 flex items-center">
        <FaUserAlt className="mr-2" />
        <p>
          <strong>Created By:</strong> {user?.username}
        </p>
      </div>
      <div className="text-gray-800 mb-6">
        <strong>Participants:</strong>
        <ul className="list-disc list-inside">
          {participants.map((participant) => {
            console.log("Participant fetched successfully", participant);
            return <li key={participant._id}>{participant.username}</li>;
          })}
        </ul>
      </div>
      <div className="mb-6 flex items-center">
        <input
          type="number"
          value={contributionValue}
          onChange={(e) => setContributionValue(Number(e.target.value))}
          className="border rounded-md p-2 w-full"
          placeholder={`Enter contribution value`}
        />
        <span className="ml-2">{event.unit}</span>
      </div>
      <div className="text-gray-800 mb-6">
        <p>
          <strong>Unit:</strong> {event.unit}
        </p>
      </div>
      <button
        onClick={handleAddContribution}
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Add Contribution
      </button>
    </div>
  );
}

export default EventDetails;
