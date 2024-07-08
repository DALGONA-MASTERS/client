import React, { useState, useEffect, useRef } from "react";
import { FaThumbsUp, FaComment, FaShare } from "react-icons/fa";

interface Post {
  id: number;
  profilePic: string;
  content: string;
  media?: string;
  comments: { id: number; text: string }[];
  showComments?: boolean;
}

const initialPosts: Post[] = [
  {
    id: 1,
    profilePic: "https://via.placeholder.com/50",
    content: "Had a great time planting trees today!",
    media: "https://via.placeholder.com/300x200",
    comments: [{ id: 1, text: "YEah nice event" }],
  },
  {
    id: 2,
    profilePic: "https://via.placeholder.com/50",
    content: "Check out this amazing video from our event.",
    media: "https://via.placeholder.com/300x200",
    comments: [{ id: 2, text: "YEah s event" }],
  },
  // Add more posts as needed
];

function Posts() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [activePost, setActivePost] = useState<number | null>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commentsRef.current &&
        !commentsRef.current.contains(event.target as Node)
      ) {
        // Clicked outside the comments section
        setPosts((prevPosts) =>
          prevPosts.map((post) => ({ ...post, showComments: false }))
        );
        setActivePost(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleComments = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, showComments: !post.showComments }
          : { ...post, showComments: false }
      )
    );
    setActivePost((prevActivePost) =>
      prevActivePost === postId ? null : postId
    );
  };

  const addComment = (postId: number, commentText: string) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            { id: post.comments.length + 1, text: commentText },
          ],
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div className="w-[80%] mx-auto mt-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-gray  rounded-3xl p-4 mb-4">
          {/* Profile Picture */}
          <div className="flex items-start mb-2">
            <img
              src={post.profilePic}
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
          {post.media && (
            <div className="mt-2">
              <img
                src={post.media}
                alt="Post Media"
                className="w-auto h-auto rounded-md"
              />
            </div>
          )}
          {/* Icons */}
          <div className="flex justify-around mt-4">
            <button className="flex items-center space-x-2">
              <FaThumbsUp className="text-green-900" />
              <span>Like</span>
            </button>
            <button
              className="flex items-center space-x-2"
              onClick={() => toggleComments(post.id)}
            >
              <FaComment className="text-green-900" />
              <span>Comment</span>
            </button>
            <button className="flex items-center space-x-2">
              <FaShare className="text-green-900" />
              <span>Share</span>
            </button>
          </div>
          {/* Comments */}
          {post.showComments && activePost === post.id && (
            <div className="mt-4" ref={commentsRef}>
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex items-start mb-2">
                  <img
                    src={post.profilePic}
                    alt="Profile"
                    className="h-8 w-8 rounded-full mr-2"
                  />
                  <div>
                    <div className="font-bold">User Name</div>
                    <div>{comment.text}</div>
                  </div>
                </div>
              ))}
              {/* Comment Input */}
              <div className="flex items-center mt-2">
                <img
                  src={post.profilePic}
                  alt="Profile"
                  className="h-8 w-8 rounded-full mr-2"
                />
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-300"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addComment(post.id, e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Posts;
