"use client";

import React from "react";
import { useGetUsers } from "@/hooks/useGetUsers";

const Hero = () => {
  const { users, isLoading } = useGetUsers();

  if (isLoading || !users) return <div>Loading...</div>;

  const familyLastName = users[0].name.split(" ")[1];

  return (
    <div className="h-screen w-screen overflow-hidden px-10">
      <div className="w-full flex justify-center mt-16">
        <h1 className="text-[3vw] font-base">
          Welcome back,{" "}
          <span className="main-text-gradient">{familyLastName} </span>family
        </h1>
      </div>

      <div className="w-full flex justify-center mt-16">
        <h1 className="text-3xl text-center font-base">
          {JSON.stringify(users)}
        </h1>
      </div>
    </div>
  );
};

export default Hero;
