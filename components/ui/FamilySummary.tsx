import React from "react";
import { ExampleData } from "@/lib/types";

interface FamilySummaryProps {
  exampleData: ExampleData;
}

const FamilySummary = ({ exampleData }: FamilySummaryProps) => {
  const familyAverageSleepScore = Math.floor(
    exampleData.reduce((sum, user) => sum + user.averageSleepScore, 0) /
      exampleData.length
  );

  const lowestSleepScore = Math.min(
    ...exampleData.map((user) => user.averageSleepScore)
  );

  const lowestSleepScoreUser = exampleData.find(
    (user) => user.averageSleepScore === lowestSleepScore
  );

  return (
    <div className="w-full flex justify-center mt-8">
      <p className="text-lg max-w-2xl text-center text-[#8e8d92]">
        Your family averaged a sleep score of {familyAverageSleepScore} this
        week. {lowestSleepScoreUser?.name} had the lowest sleep score of{" "}
        {lowestSleepScore} while {exampleData[0].name} had the highest score.
      </p>
    </div>
  );
};

export default FamilySummary;
