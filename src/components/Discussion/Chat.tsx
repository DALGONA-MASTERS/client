import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactMic, ReactMicStopEvent } from "react-mic";
import {
  useGetMessagesMutation,
  useSaveMessageMutation,
  useGetUserDataMutation,
  useSaveVoiceMessageMutation,
} from "../../features/api/apiSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { User } from "../../types/User";

function Chat() {
  const user = useSelector(selectUser);
  const { userId } = useParams<{ userId: string }>();
  const [getMessages, getMessagesResult] = useGetMessagesMutation();
  const [sendMessage] = useSaveMessageMutation();
  const [sendVoiceMessage] = useSaveVoiceMessageMutation();
  const [getUserData, getUserDataResult] = useGetUserDataMutation();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userReceiver, setUserReceiver] = useState<User | null>(null);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (userId) {
      getUserData(userId);
    }
  }, [userId, getUserData]);

  useEffect(() => {
    if (getUserDataResult.isSuccess && getUserDataResult.data) {
      setUserReceiver(getUserDataResult.data);
    } else if (getUserDataResult.isError) {
      console.error("Error fetching user", getUserDataResult.error);
    }
  }, [getUserDataResult]);

  useEffect(() => {
    if (userId) {
      getMessages(userId);
    }
  }, [userId, getMessages]);

  useEffect(() => {
    if (getMessagesResult.status === "fulfilled") {
      setMessages(getMessagesResult.data);
    } else if (getMessagesResult.status === "rejected") {
      console.error(getMessagesResult.error);
    }
  }, [getMessagesResult]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      await sendMessage({ receiverId: userId!, content: newMessage });
      setMessages([
        ...messages,
        { _id: Date.now(), content: newMessage, sender: user?._id },
      ]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleStartRecording = () => {
    setRecording(true);
  };

  const handleStopRecording = (recordedBlob: ReactMicStopEvent) => {
    setRecording(false);
    handleSendVoiceMessage(recordedBlob.blob);
  };

  const handleSendVoiceMessage = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append("receiverId", userId!);
      formData.append("audio", audioBlob, "voice-message.webm");

      await sendVoiceMessage(formData);
      setMessages([
        ...messages,
        {
          _id: Date.now(),
          audio: URL.createObjectURL(audioBlob),
          sender: user?._id,
        },
      ]);
    } catch (error) {
      console.error("Failed to send voice message:", error);
    }
  };

  return (
    <div className="chat-container flex flex-col md:flex-row items-center h-full overflow-y-auto custom-scrollbar mt-[130px]">
      <div className="w-full md:w-1/3 p-4 flex flex-col items-center">
        {userReceiver && (
          <>
            <img
              src={userReceiver.profilePic}
              alt="profilePic"
              className="rounded-[20px] w-[200px] h-[200px] mb-4"
            />
            <h3 className="text-xl font-semibold">{userReceiver.username}</h3>
            {userReceiver.name && (
              <p className="text-gray-600">{userReceiver.name}</p>
            )}
            <p className="text-gray-600">{userReceiver.email}</p>
          </>
        )}
      </div>

      <div className="messages-section w-full md:w-2/3 p-4 flex flex-col">
        <div className="messages-list flex-1 overflow-y-auto mb-4">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`message-item p-2 my-2 rounded-md ${
                message.sender === user?._id
                  ? "bg-green-200 self-end"
                  : "bg-gray-200 self-start"
              }`}
            >
              {message.content ? (
                message.content
              ) : (
                <audio controls src={message.audio}></audio>
              )}
            </div>
          ))}
        </div>
        <div className="message-input flex items-center mt-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="border rounded-md p-2 flex-1"
            placeholder="Type a message"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-md ml-2"
          >
            Send
          </button>
        </div>
        <div className="voice-message-input flex items-center mt-4">
          <ReactMic
            record={recording}
            className="sound-wave"
            onStop={handleStopRecording}
            mimeType="audio/webm"
          />
          <button
            onClick={handleStartRecording}
            className="bg-green-600 text-white px-4 py-2 rounded-md ml-2"
          >
            Start Recording
          </button>
          <button
            onClick={() => setRecording(false)}
            className="bg-red-600 text-white px-4 py-2 rounded-md ml-2"
          >
            Stop Recording
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
