import React, { useEffect, useState, useRef } from "react";
import { UiPost, Comment as CommentType, CommentUi } from "../../types/Post";
import { FaComment, FaShare, FaThumbsUp, FaEllipsisV } from "react-icons/fa";
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useDeletePostMutation,
  useGetUserDataMutation,
  useLikePostMutation,
  useUpdateCommentMutation,
  useUpdatePostMutation,
} from "../../features/api/apiSlice";
import {
  handleEditData,
  handleAddData,
  handleDeleteData,
} from "../../utilities/apiUtils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { deletePostData, editPostData } from "../../features/posts/postsSice";
import { selectUser } from "../../features/auth/authSlice";
import SingleComment from "./Comment";

function SinglePost({ post }: { post: UiPost }) {
  const [userData, setUserData] = useState<any | null>(null);
  const userId = post.author;
  const [getUserData, getUserDataResult] = useGetUserDataMutation();
  useEffect(() => {
    if (userId) {
      getUserData(userId);
    }
  }, [userId, getUserData]);
  useEffect(() => {
    if (getUserDataResult.isSuccess && getUserDataResult.data) {
      setUserData(getUserDataResult.data);
    } else if (getUserDataResult.isError) {
      console.error("Error fetching user", getUserDataResult.error);
    }
  }, [getUserDataResult]);

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [showOptions, setShowOptions] = useState(false);
  const [likePost, likePostResult] = useLikePostMutation();
  const [addComment, addCommentResult] = useAddCommentMutation();
  const [updatePost, updatePostResult] = useUpdatePostMutation();
  const [deletePost, deletePostResult] = useDeletePostMutation();

  const editRef = useRef<HTMLTextAreaElement>(null);

  // Handle API result updates
  useEffect(() => {
    handleEditData(likePostResult, dispatch, editPostData);
  }, [likePostResult]);
  useEffect(() => {
    handleAddData(addCommentResult, dispatch, editPostData);
  }, [addCommentResult]);
  useEffect(() => {
    handleEditData(updatePostResult, dispatch, editPostData);
  }, [updatePostResult]);
  useEffect(() => {
    handleDeleteData(deletePostResult, dispatch, deletePostData);
  }, [deletePostResult]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isEditing &&
        editRef.current &&
        !editRef.current.contains(event.target as Node)
      ) {
        setIsEditing(false);
        handleEditPost();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing, editedContent]);

  const handleLike = async () => {
    try {
      await likePost(post._id).unwrap();
      console.log("Post liked successfully!");
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const handleAddComment = async () => {
    if (commentText.trim() === "") {
      return;
    }
    const newComment: CommentType = {
      commenter: user!._id,
      comment: commentText,
      postId: post._id,
    };
    console.log(newComment);

    try {
      await addComment(newComment).unwrap();
      setCommentText("");
      console.log("Comment added successfully!");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleEditPost = async () => {
    if (editedContent.trim() === "") {
      return;
    }
    const updatedPost: UiPost = {
      ...post,
      content: editedContent,
    };

    try {
      await updatePost(updatedPost).unwrap();
      console.log("Post edited successfully!");
    } catch (error) {
      console.error("Failed to edit post:", error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(post._id).unwrap();
      console.log("Post deleted successfully!");
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const isLikedByUser = post.likers.includes(user!._id);

  return (
    <div key={post._id} className="bg-green-200 rounded-3xl p-4 mb-4">
      {/* Profile Picture */}
      <div className="flex items-start mb-2 relative">
        <img
          src={userData?.profilePic || "https://via.placeholder.com/50"}
          alt="Profile"
          className="h-12 w-12 rounded-full mr-4"
        />
        {/* Content */}
        <div className="flex-1">
          <div className="font-bold text-lg mb-2">{userData?.username}</div>
          {isEditing ? (
            <textarea
              ref={editRef}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-green-300"
            />
          ) : (
            <div className="text-gray-700">{post.content}</div>
          )}
        </div>
        {post.author === user!._id && (
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="ml-2 text-blue-500"
            >
              <FaEllipsisV />
            </button>
            {showOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
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
                  onClick={handleDeletePost}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Media */}
      {post.picture && (
        <div className="mt-2">
          <img
            src={post.picture}
            alt="Post Media"
            className="max-w-[50%] max-h-[50%] rounded-md"
          />
        </div>
      )}
      {/* Icons */}
      <div className="flex justify-around mt-4">
        <button className="flex items-center space-x-2" onClick={handleLike}>
          <FaThumbsUp
            className={`${isLikedByUser ? "text-green-900" : "text-white"}`}
          />
          <span>Like</span>
        </button>
        <button
          className="flex items-center space-x-2"
          onClick={() => setShowComments(!showComments)}
        >
          <FaComment className="text-green-900" />
          <span>Comment</span>
        </button>
        <button className="flex items-center space-x-2">
          <FaShare className="text-green-900" />
          <span>Share</span>
        </button>
      </div>
      {/* Comments Section */}
      {showComments && (
        <div className="mt-4">
          {post.comments.map((comment) => (
            <SingleComment
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          ))}
          {/* Add Comment */}
          <div className="flex items-center mt-2">
            <img
              src={"https://via.placeholder.com/50"}
              alt="Profile"
              className="h-8 w-8 rounded-full mr-2"
            />
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-300"
            />
            <button
              className="bg-green-900 text-white px-4 py-2 rounded-full ml-2"
              onClick={handleAddComment}
            >
              Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SinglePost;
