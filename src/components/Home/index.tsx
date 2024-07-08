import React from "react";
import Event from "./Event";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

function Home() {
  return (
    <div className="home-container flex flex-col items-center h-full overflow-y-auto custom-scrollbar mt-[130px]">
      <Event />
      <CreatePost />
      <Posts />
    </div>
  );
}

export default Home;
