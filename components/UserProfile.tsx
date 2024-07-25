import React from "react";
import { UserData } from "@/lib/types";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface UserProfileProps {
  userData: UserData[];
}

const UserProfile = ({ userData }: UserProfileProps) => {
  const user = userData[0];
  const intervals = user.details.intervals;

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
    },
  };

  const formatTime = (timestamp: any) => {
    const options: any = { hour: "numeric", hour12: true };
    return new Date(timestamp).toLocaleTimeString([], options);
  };

  const heartRateData = {
    labels: intervals.flatMap((interval) =>
      interval.timeseries.heartRate.map((data) => formatTime(data[0]))
    ),
    datasets: [
      {
        label: "Heart Rate",
        data: intervals.flatMap((interval) =>
          interval.timeseries.heartRate.map((data) => data[1])
        ),
        borderColor: "#ff7777",
        backgroundColor: "#ff7777",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const respiratoryRateData = {
    labels: intervals.flatMap((interval) =>
      interval.timeseries.heartRate.map((data) => formatTime(data[0]))
    ),
    datasets: [
      {
        label: "Respiratory Rate",
        data: intervals.flatMap((interval) =>
          interval.timeseries.respiratoryRate.map((data) => data[1])
        ),
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const sleepStageData = {
    labels: intervals.flatMap((interval) =>
      interval.stages.map(
        (stage, index) => `${new Date(interval.ts).toLocaleDateString()}`
      )
    ),
    datasets: [
      {
        label: "Sleep Stages",
        data: intervals.flatMap((interval) =>
          interval.stages.map((stage) => stage.duration)
        ),
        backgroundColor: "rgba(255,159,64,0.2)",
        borderColor: "rgba(255,159,64,1)",
        borderWidth: 1,
        tension: 0.4,
      },
    ],
  };

  const totalSleepTime = intervals.reduce(
    (total, interval) =>
      total +
      interval.stages.reduce(
        (stageTotal, stage) => stageTotal + stage.duration,
        0
      ),
    0
  );

  return (
    <div className="flex justify-center items-center mx-auto flex-col max-w-7xl w-full mt-16">
      <div className="mb-10 flex flex-row justify-between w-full items-center px-10">
        <div>
          <h1 className="text-[5rem] font-medium!leading-[1]">{user.name}</h1>
          <p className="text-lg font-thin">
            Total Sleep Time: {totalSleepTime} seconds
          </p>
        </div>
        <div>
          <h2 className="text-[6rem] text-center font-medium!leading-[1]">
            {intervals[0]?.score}
          </h2>
          <p className="text-lg text-center font-thin">Average sleep score</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="w-[40rem] bg-[#252526] p-3 rounded-lg flex justify-center m-2 bg-opacity-60">
          <Line data={heartRateData} options={chartOptions} />
        </div>

        <div className="w-[40rem] bg-[#252526] p-3 rounded-lg flex justify-center m-2 bg-opacity-60">
          <Line data={respiratoryRateData} options={chartOptions} />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-[40rem] bg-[#252526] p-3 rounded-lg flex justify-center m-2 bg-opacity-60">
          <Bar data={sleepStageData} options={chartOptions} />
        </div>
        <div className="w-[40rem] bg-[#252526] p-3 rounded-lg flex justify-center m-2 bg-opacity-60">
          <Bar data={sleepStageData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

//   const sleepStageData = {
//     labels: intervals.flatMap((interval) =>
//       interval.stages.map(
//         (stage, index) =>
//           `${new Date(interval.ts).toLocaleDateString()} Stage ${index + 1}`
//       )
//     ),
//     datasets: [
//       {
//         label: "Sleep Stages",
//         data: intervals.flatMap((interval) =>
//           interval.stages.map((stage) => stage.duration)
//         ),
//         backgroundColor: "rgba(255,159,64,0.2)",
//         borderColor: "rgba(255,159,64,1)",
//         borderWidth: 1,
//         tension: 0.4,
//       },
//     ],
//   };

//   const totalSleepTime = intervals.reduce(
//     (total, interval) =>
//       total +
//       interval.stages.reduce(
//         (stageTotal, stage) => stageTotal + stage.duration,
//         0
//       ),
//     0
//   );
//   const stageDurations = intervals
//     .flatMap((interval) => interval.stages)
//     .reduce((acc, stage) => {
//       acc[stage.stage] = (acc[stage.stage] || 0) + stage.duration;
//       return acc;
//     }, {});

{
  /* <h2>Summary</h2>
      <p>Total Sleep Time: {totalSleepTime} seconds</p>
      <p>Time in Awake: {stageDurations.awake || 0} seconds</p>
      <p>Time in Light Sleep: {stageDurations.light || 0} seconds</p>
      <p>Time in Deep Sleep: {stageDurations.deep || 0} seconds</p>
      <p>Score: {intervals[0]?.score || "N/A"}</p> */
}

{
  /* <div>
        <h3>Respiratory Rate Over Time</h3>
        <Line data={respiratoryRateData} />
      </div>
      <div>
        <h3>Sleep Stages</h3>
        <Bar data={sleepStageData} />
      </div> */
}
