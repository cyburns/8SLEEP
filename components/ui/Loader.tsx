import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <span className="relative flex h-10 w-10">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-10 w-10 bg-blue-500"></span>
      </span>
    </div>
  );
};

export default Loader;
