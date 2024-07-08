import React from "react";
import Event from "./Event";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

function Home() {
  return (
    <div className=" flex flex-col items-center h-screen ">
      <Event />
      <CreatePost />
      <Posts />
    </div>
  );
}

export default Home;
