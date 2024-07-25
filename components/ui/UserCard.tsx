import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Avatar from "./Avatar";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
  cutout: "70%",
};

interface UserCardProps {
  data: any;
  index: number;
  activeIndex: { isActive: boolean; index: number | null };
  setActiveIndex: (value: { isActive: boolean; index: number | null }) => void;
}

const UserCard = ({
  data,
  index,
  activeIndex,
  setActiveIndex,
}: UserCardProps) => {
  return (
    <Link
      href={`/user/${data.id}`}
      key={index}
      className={`${
        activeIndex.isActive && activeIndex.index !== index && "opacity-50"
      } mb-8 bg-[#252526] p-7 sm:p-10 rounded-lg flex flex-col m-4 transition-all duration-500 hover:scale-[1.025] w-full max-w-sm justify-center items-center bg-opacity-60`}
      onMouseEnter={() => setActiveIndex({ isActive: true, index })}
      onMouseLeave={() => setActiveIndex({ isActive: false, index: null })}
    >
      <div className="w-full mb-10 ">
        <div className="flex flex-row items-center">
          <Avatar name={data.name} />
          <h1 className="text-2xl ml-2">{data.name}</h1>
        </div>
        <h2 className="text-[7rem] font-bold text-center !leading-[0.95] mt-5">
          {data.averageSleepScore}
        </h2>
        <p className="text-sm text-center font-thin">Average sleep score</p>
      </div>
      <div>
        <Doughnut data={data} options={options} />
      </div>

      <div className="mt-5">
        <p className="text-center text-xl">
          {data.name} slept for <br /> {data.totalSleepDuration}
        </p>
      </div>
    </Link>
  );
};

export default UserCard;
