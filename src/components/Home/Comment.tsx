import React, { useState, useEffect, useRef } from "react";
import {
  CommentBodyEdit,
  Comment as CommentType,
  CommentUi,
} from "../../types/Post";
import {
  useDeleteCommentMutation,
  useGetUserMutation,
  useUpdateCommentMutation,
} from "../../features/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { handleEditData, handleDeleteData } from "../../utilities/apiUtils";
import { selectUser } from "../../features/auth/authSlice";
import { FaEllipsisV } from "react-icons/fa";
import {
  editPostData,
  deleteCommentData,
} from "../../features/posts/postsSice"; // Ensure you have the correct action for deleteCommentData
import { User } from "../../types/User";

function SingleComment({
  comment,
  postId,
}: {
  comment: CommentUi;
  postId: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);
  const [showOptions, setShowOptions] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const editRef = useRef<HTMLTextAreaElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null); // Ref for the options menu

  const [updateComment, updateCommentResult] = useUpdateCommentMutation();
  const [deleteComment, deleteCommentResult] = useDeleteCommentMutation();
  const [getUser, getUserResult] = useGetUserMutation();

  useEffect(() => {
    getUser(comment.commenter);
  }, []);
  useEffect(() => {
    if (getUserResult.status === "fulfilled") {
      setUserData(getUserResult.data);
    } else if (getUserResult.status === "rejected") {
      console.log("rejected");
    }
    console.log("rejected");
  }, [getUserResult]);

  useEffect(() => {
    handleEditData(updateCommentResult, dispatch, editPostData);
  }, [updateCommentResult]);

  useEffect(() => {
    handleDeleteData(deleteCommentResult, dispatch, deleteCommentData);
  }, [deleteCommentResult]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isEditing &&
        editRef.current &&
        !editRef.current.contains(event.target as Node)
      ) {
        setIsEditing(false);
        handleEditComment();
      }
      if (
        showOptions &&
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing, editedComment, showOptions]);

  const handleEditComment = async () => {
    if (editedComment.trim() === "") return;

    const updatedComment: CommentBodyEdit = {
      postId: postId,
      ...comment,
      comment: editedComment,
    };

    try {
      await updateComment(updatedComment).unwrap();
      console.log("Comment edited successfully!");
    } catch (error) {
      console.error("Failed to edit comment:", error);
    }
  };

  const handleDeleteComment = async () => {
    try {
      await deleteComment({
        commentId: comment._id!,
        postId: postId,
      }).unwrap();
      console.log("Comment deleted successfully!");
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div key={comment._id} className="flex items-start mb-2 relative">
      <img
        src={userData?.profilePic || "https://via.placeholder.com/50"}
        alt="Profile"
        className="h-8 w-8 rounded-full mr-2"
      />
      <div className="flex-1">
        <div className="font-bold">{userData?.name || userData?.username}</div>
        {isEditing ? (
          <textarea
            ref={editRef}
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-green-300"
          />
        ) : (
          <div>{comment.comment}</div>
        )}
      </div>
      {comment.commenter === user!._id && (
        <div className="relative">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="ml-2 text-blue-500"
          >
            <FaEllipsisV />
          </button>
          {showOptions && (
            <div
              ref={optionsRef}
              className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg"
            >
              <button
                onClick={() => {
                  setIsEditing(true);
                  setShowOptions(false);
                }}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteComment}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SingleComment;
