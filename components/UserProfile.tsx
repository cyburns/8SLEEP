import React, { useEffect, useRef } from "react";
import { UserData } from "@/lib/types";
import { Line, Bar } from "react-chartjs-2";
import { secondsToHours } from "@/hooks/utils";
import gsap from "gsap";
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

interface StageDurations {
  [key: string]: number;
}

const UserProfile = ({ userData }: UserProfileProps) => {
  const containerRef = useRef(null);
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

  const formatTime = (timestamp: string | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      hour12: true,
    };
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

  const averageHeartRate = Math.floor(
    intervals.reduce(
      (sum, interval) =>
        sum +
        interval.timeseries.heartRate.reduce((sum, data) => sum + data[1], 0) /
          interval.timeseries.heartRate.length,
      0
    ) / intervals.length
  );

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

  const averageRespiratoryRate = Math.floor(
    intervals.reduce(
      (sum, interval) =>
        sum +
        interval.timeseries.respiratoryRate.reduce(
          (sum, data) => sum + data[1],
          0
        ) /
          interval.timeseries.respiratoryRate.length,
      0
    ) / intervals.length
  );

  const sleepStageData = {
    labels: intervals.flatMap((interval) =>
      interval.stages.map(
        (_) => `${new Date(interval.ts).toLocaleDateString()}`
      )
    ),
    datasets: [
      {
        label: "Sleep Stages",
        data: intervals.flatMap((interval) =>
          interval.stages.map((stage) => stage.duration)
        ),
        backgroundColor: "rgba(6, 128, 247,0.2)",
        borderColor: "rgba(6, 128, 247,1)",
        borderWidth: 1,
        tension: 0.4,
      },
    ],
  };

  const stageDurations = intervals
    .flatMap((interval) => interval.stages)
    .reduce((acc: StageDurations, stage) => {
      acc[stage.stage] = (acc[stage.stage] || 0) + stage.duration;
      return acc;
    }, {} as StageDurations);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { y: 500, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    );
  }, []);

  return (
    <div className="flex justify-center items-center mx-auto flex-col w-full mt-16 mb-32 p-5 max-w-fit">
      <div className="mb-10 flex flex-row items-center px-10">
        <h1 className="text-5xl sm:text-[5rem] font-medium !leading-[1]">
          {user.name}
        </h1>
      </div>
      <div ref={containerRef}>
        <div className="flex flex-col lg:flex-row">
          <div className="w-[90vw] sm:w-[30rem] md:w-[40rem] bg-[#252526] p-4 rounded-lg flex justify-center m-2 bg-opacity-60">
            <Line data={heartRateData} options={chartOptions} />
          </div>

          <div className="bg-[#252526] py-7 lg:py-3 px-10 rounded-lg flex flex-col justify-center m-2 bg-opacity-60">
            <h2 className="text-6xl sm:text-[6rem] text-center font-medium !leading-[1]">
              {averageHeartRate}
            </h2>
            <p className="text-lg text-center font-thin">Average heart rate</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="bg-[#252526] py-7 lg:py-3 px-[3.2rem] rounded-lg flex flex-col justify-center m-2 bg-opacity-60">
            <h2 className="text-6xl sm:text-[6rem] text-center font-medium !leading-[1]">
              {averageRespiratoryRate}
            </h2>
            <p className="text-lg text-center font-thin">
              Average
              <br /> respiratory rate
            </p>
          </div>

          <div className="w-[90vw] sm:w-[30rem] md:w-[40rem] bg-[#252526] p-3 rounded-lg flex justify-center m-2 bg-opacity-60">
            <Line data={respiratoryRateData} options={chartOptions} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="w-[90vw] sm:w-[30rem] md:w-[40rem] bg-[#252526] p-3 rounded-lg flex justify-center m-2 bg-opacity-60">
            <Bar data={sleepStageData} options={chartOptions} />
          </div>

          <div className="bg-[#252526] py-7 lg:py-3 px-10 rounded-lg flex flex-col justify-center m-2 bg-opacity-60 space-y-5">
            <div>
              <p className="text-center text-4xl">
                {secondsToHours(stageDurations.awake) || 0}
              </p>
              <p className="text-center font-thin">Spent awake</p>
            </div>

            <div>
              <p className="text-center text-4xl">
                {secondsToHours(stageDurations.light) || 0}
              </p>
              <p className="text-center font-thin">Spent in light sleep</p>
            </div>

            <div>
              <p className="text-center text-4xl">
                {secondsToHours(stageDurations.deep) || 0}
              </p>
              <p className="text-center font-thin">Spent in deep sleep</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
