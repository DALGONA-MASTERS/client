import React, { useEffect, useState } from "react";
import { UiPost, Comment } from "../../types/Post";
import { FaComment, FaShare, FaThumbsUp } from "react-icons/fa";
import {
  useAddCommentMutation,
  useLikePostMutation,
} from "../../features/api/apiSlice";
import { handleEditData, handleAddData } from "../../utilities/apiUtils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { editPostData } from "../../features/posts/postsSice";
import { selectUser } from "../../features/auth/authSlice";

function SinglePost({ post }: { post: UiPost }) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [likePost, likePostResult] = useLikePostMutation();
  const [addComment, addCommentResult] = useAddCommentMutation();

  // Handle API result updates

  useEffect(() => {
    handleEditData(likePostResult, dispatch, editPostData);
  }, [likePostResult]);
  useEffect(() => {
    handleAddData(addCommentResult, dispatch, editPostData);
  }, [addCommentResult]);

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
    console.log(commentText);
    const newComment: Comment = {
      commenter: user!.id,
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

  const isLikedByUser = post.likers.includes(user!.id);

  return (
    <div key={post._id} className="bg-gray rounded-3xl p-4 mb-4">
      {/* Profile Picture */}
      <div className="flex items-start mb-2">
        <img
          src={"https://via.placeholder.com/50"}
          alt="Profile"
          className="h-12 w-12 rounded-full mr-4"
        />
        {/* Content */}
        <div className="flex-1">
          <div className="font-bold text-lg mb-2">User Name</div>
          <div className="text-gray-700">{post.content}</div>
        </div>
      </div>
      {/* Media */}
      <div className="mt-2">
        <img
          src={"https://via.placeholder.com/300x200"}
          alt="Post Media"
          className="w-auto h-auto rounded-md"
        />
      </div>
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
            <div key={comment._id} className="flex items-start mb-2">
              <img
                src={"https://via.placeholder.com/50"}
                alt="Profile"
                className="h-8 w-8 rounded-full mr-2"
              />
              <div>
                <div className="font-bold">User Name</div>
                <div>{comment.comment}</div>
              </div>
            </div>
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
