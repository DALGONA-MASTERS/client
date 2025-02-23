import React, { useEffect, useState } from "react";
import { useCreateEventMutation } from "../../features/api/apiSlice";
import { handleAddData } from "../../utilities/apiUtils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { addEventData } from "../../features/events/eventSlice";

interface NewEvent {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  actionType:
    | "trees_plantation"
    | "waste_recycling"
    | "beach_cleaning"
    | "other";
  target: string;
  image?: File | null; // Optional image field
}

const CreateEvent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [newEvent, setNewEvent] = useState<NewEvent>({
    title: "",
    startDate: "",
    endDate: "",
    description: "",
    actionType: "trees_plantation",
    target: "",
    image: null, // Initialize image as null
  });

  const [createEvent, createEventResult] = useCreateEventMutation();

  const handleInputChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
      | HTMLInputElement
    >
  ) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        image: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newEvent.title);
    formData.append("startDate", newEvent.startDate);
    formData.append("endDate", newEvent.endDate);
    formData.append("description", newEvent.description);
    formData.append("actionType", newEvent.actionType);
    formData.append("target", newEvent.target);
    if (newEvent.image) {
      formData.append("picture", newEvent.image);
    }

    try {
      await createEvent(formData).unwrap();
      setNewEvent({
        title: "",
        startDate: "",
        endDate: "",
        description: "",
        actionType: "trees_plantation",
        target: "",
        image: null, // Clear the image file state after submission
      });
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  };

  // Handler for API response
  useEffect(() => {
    handleAddData(createEventResult, dispatch, addEventData);
  }, [createEventResult]);

  return (
    <div className="max-w-lg mx-auto p-2 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>

        {/* Start Date and End Date Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={newEvent.startDate}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-gray-700">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={newEvent.endDate}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>

        {/* Action Type and Target Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="actionType" className="block text-gray-700">
              Action Type
            </label>
            <select
              id="actionType"
              name="actionType"
              value={newEvent.actionType}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            >
              <option value="trees_plantation">Trees Plantation</option>
              <option value="waste_recycling">Waste Recycling</option>
              <option value="beach_cleaning">Beach Cleaning</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="target" className="block text-gray-700">
              Target
            </label>
            <input
              type="text"
              id="target"
              name="target"
              value={newEvent.target}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>
        </div>

        {/* Image Input */}
        <div>
          <label htmlFor="image" className="block text-gray-700">
            Image Upload
          </label>
          <input
            type="file"
            accept="image/*" // Specify accepted file types for images
            id="image"
            name="image"
            onChange={handleFileInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          {newEvent.image && (
            <img
              src={URL.createObjectURL(newEvent.image)}
              alt="Event Preview"
              className="mt-2 rounded-md"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
