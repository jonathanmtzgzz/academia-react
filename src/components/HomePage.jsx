import React from "react";
import Navbar from "./Navbar";
import TaskList from "./TaskList";

const HomePage = () => {
  return (
    <>
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          maxWidth: "1200px",
          minWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          marginBottom: "20px",
        }}
      >
        <div>
          <Navbar />
        </div>

        <div>
          <TaskList />
        </div>
      </div>
    </>
  );
};

export default HomePage;
