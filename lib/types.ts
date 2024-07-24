export type UserData = {
  id: string;
  name: string;
  email: string;
  details: {
    intervals: Array<{
      id: string;
      ts: string;
      stages: Array<{
        stage: string;
        duration: number;
      }>;
      score: number;
      timeseries: {
        tnt: Array<[string, number]>;
        tempRoomC: Array<[string, number]>;
        tempBedC: Array<[string, number]>;
        respiratoryRate: Array<[string, number]>;
        heartRate: Array<[string, number]>;
        heating: Array<[string, number]>;
      };
    }>;
  };
};

interface Dataset {
  data: number[];
  backgroundColor: string[];
  borderWidth: number;
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
  name: string;
  averageSleepScore: number;
}

export type ExampleData = ChartData[];
