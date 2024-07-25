"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useGetUsers } from "@/hooks/useGetUsers";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Avatar from "./ui/Avatar";
import FamilySummary from "./ui/FamilySummary";
import Loader from "./ui/Loader";
import { formatDuration } from "@/hooks/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState<{
    isActive: boolean;
    index: number | null;
  }>({
    isActive: false,
    index: null,
  });

  const { userData, isLoading } = useGetUsers();

  if (isLoading || !userData) return <Loader />;

  const familyLastName = userData[0].name.split(" ")[1];
  const sleepStages = ["awake", "light", "deep"];

  const exampleData = userData.map((user) => {
    const stageDurations = sleepStages.map((stage) =>
      user.details.intervals.reduce((sum, interval) => {
        const stageData = interval.stages.find((s) => s.stage === stage);

        return sum + (stageData ? stageData.duration : 0);
      }, 0)
    );

    const totalSleepDuration = stageDurations.reduce(
      (sum, duration) => sum + duration,
      0
    );

    const data = {
      labels: sleepStages,
      datasets: [
        {
          data: stageDurations,
          backgroundColor: [
            "#68a3fe", // awake
            "#0680f7", // light
            "#33319a", // deep
          ],
          borderWidth: 0,
        },
      ],
      name: user.name,
      averageSleepScore: Math.floor(
        user.details.intervals.reduce(
          (sum, interval) => sum + interval.score,
          0
        ) / user.details.intervals.length
      ),
      totalSleepDuration: formatDuration(totalSleepDuration),
    };

    return { ...data, id: user.id };
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    cutout: "70%",
  };

  return (
    <div className="min-h-screen w-screen px-5 mb-32">
      <div className="w-full flex justify-center mt-16">
        <h1 className="text-[4rem] font-normal text-center !leading-[1]">
          Welcome back,{" "}
          <span className="main-text-gradient">{familyLastName} </span>family
        </h1>
      </div>

      <FamilySummary exampleData={exampleData} />

      <div className="flex justify-center mt-5">
        <button className="bg-white text-black py-4 px-7 rounded-md text-xl hover:opacity-70 transition-all duration-300">
          <a href="https://www.eightsleep.com/">Shop now</a>
        </button>
      </div>

      <div className="w-full flex flex-col lg:flex-row items-center justify-center mt-5 max-w-7xl mx-auto scale-95">
        {exampleData.map((data, index) => (
          <Link
            href={`/user/${data.id}`}
            key={index}
            className={`${
              activeIndex.isActive &&
              activeIndex.index !== index &&
              "opacity-50"
            } mb-8 bg-[#252526] p-7 sm:p-10 rounded-lg flex flex-col m-4 transition-all duration-500 hover:scale-[1.025] w-full max-w-sm justify-center items-center bg-opacity-60`}
            onMouseEnter={() => setActiveIndex({ isActive: true, index })}
            onMouseLeave={() =>
              setActiveIndex({ isActive: false, index: null })
            }
          >
            <div className="w-full mb-10 ">
              <div className="flex flex-row items-center">
                <Avatar name={data.name} />
                <h1 className="text-2xl ml-2">{data.name}</h1>
              </div>
              <h2 className="text-[7rem] font-bold text-center !leading-[0.95] mt-5">
                {data.averageSleepScore}
              </h2>
              <p className="text-sm text-center font-thin">
                Average sleep score
              </p>
            </div>
            <div>
              {/* @ts-ignore */}
              <Doughnut data={data} options={options} />
            </div>

            <div className="mt-5">
              <p className="text-center text-xl">
                {data.name} slept for <br /> {data.totalSleepDuration}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hero;
