"use client";

import React, { useRef, useState } from "react";
import { useGetUsers } from "@/hooks/useGetUsers";
import FamilySummary from "./ui/FamilySummary";
import Loader from "./ui/Loader";
import { formatDuration } from "@/hooks/utils";
import HeroHeader from "./ui/HeroHeader";
import UserCard from "./ui/UserCard";
import BuyButton from "./ui/BuyButton";

const Hero = () => {
  const cardsContainerRef = useRef(null);
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

  return (
    <div className="min-h-screen w-screen px-5 mb-32">
      <HeroHeader familyLastName={familyLastName} />

      <FamilySummary exampleData={exampleData} />

      <BuyButton text="Buy now" link="https://www.eightsleep.com/" />

      <div
        className="w-full flex flex-col lg:flex-row items-center justify-center mt-5 max-w-7xl mx-auto scale-95"
        ref={cardsContainerRef}
      >
        {exampleData.map((data, index) => (
          <UserCard
            key={`user-card-${data.id}`}
            data={data}
            index={index}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
