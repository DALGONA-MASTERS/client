import React, { useState, useEffect, useRef } from "react";
import { FaThumbsUp, FaComment, FaShare } from "react-icons/fa";

import {
  useGetPostMutation,
  useGetPostsMutation,
} from "../../features/api/apiSlice";
import { handleFetchedData } from "../../utilities/apiUtils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  selectPosts,
  setPosts as setStorePosts,
} from "../../features/posts/postsSice";
import { UiPost } from "../../types/Post";
import SinglePost from "./SinglePost";

function Posts() {
  const postsStore = useSelector(selectPosts);

  const dispatch = useDispatch<AppDispatch>();
  const [getPosts, getPostsResult] = useGetPostsMutation();

  useEffect(() => {
    (async () => {
      await getPosts();
    })();
  }, []);

  useEffect(() => {
    handleFetchedData(getPostsResult, dispatch, setStorePosts);
  }, [getPostsResult]);
  const [posts, setPosts] = useState<UiPost[]>(postsStore);
  const [activePost, setActivePost] = useState<string | null>(null);
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
  useEffect(() => {
    setPosts(postsStore);
  }, [postsStore]);
  const toggleComments = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, showComments: !post.showComments }
          : { ...post, showComments: false }
      )
    );
    setActivePost((prevActivePost) =>
      prevActivePost === postId ? null : postId
    );
  };

  // const addComment = (postId: string, commentText: string) => {
  //   const updatedPosts = posts.map((post) => {
  //     if (post._id === postId) {
  //       return {
  //         ...post,
  //         comments: [
  //           ...post.comments,
  //           { id: post.comments.length + 1, text: commentText },
  //         ],
  //       };
  //     }
  //     return post;
  //   });
  //   setPosts(updatedPosts);
  // };

  return (
    <div className="w-[80%] mx-auto mt-4">
      {posts.map((post) => (
        <SinglePost key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
