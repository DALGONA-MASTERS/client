import React, { useEffect } from "react";
import {
  useGetMounthStatsMutation,
  useGetStatsMutation,
} from "../../features/api/apiSlice";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

// Register required components
Chart.register(
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

function Stats() {
  const [getStats, getStatsResult] = useGetStatsMutation();
  const [getMounthState, getMounthStateResult] = useGetMounthStatsMutation();
  const [beachCleaningData, setBeachCleaningData] = React.useState<any>(null);
  const [treesPlantationData, setTreesPlantationData] =
    React.useState<any>(null);
  const [wasteRecyclingData, setWasteRecyclingData] = React.useState<any>(null);

  useEffect(() => {
    getStats();
  }, [getStats]);

  useEffect(() => {
    if (getStatsResult.isSuccess) {
      const actionTypes = [
        "trees_plantation",
        "waste_recycling",
        "beach_cleaning",
      ];
      actionTypes.forEach((type) => getMounthState(type));
    }
  }, [getStatsResult, getMounthState]);

  useEffect(() => {
    if (getMounthStateResult.isSuccess) {
      const data = getMounthStateResult.data || [];
      const beachCleaning = data.filter(
        (item: any) => item.actionType === "beach_cleaning"
      );
      const treesPlantation = data.filter(
        (item: any) => item.actionType === "trees_plantation"
      );
      const wasteRecycling = data.filter(
        (item: any) => item.actionType === "waste_recycling"
      );

      setBeachCleaningData(createChartData(beachCleaning, "Beach Cleaning"));
      setTreesPlantationData(
        createChartData(treesPlantation, "Trees Plantation")
      );
      setWasteRecyclingData(createChartData(wasteRecycling, "Waste Recycling"));
    }
  }, [getMounthStateResult]);

  const createChartData = (data: any[], label: string) => {
    const labels = data?.map((item) => `Month ${item._id?.month || "N/A"}`);
    const values = data?.map((item) => item.totalValue || 0);

    return {
      labels,
      datasets: [
        {
          label: `${label} Progress`,
          data: values,
          borderColor: "green",
          backgroundColor: "rgba(0, 255, 0, 0.2)",
          fill: true,
        },
      ],
    };
  };

  if (!getStatsResult.isSuccess || !getMounthStateResult.isSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-container flex flex-col items-center h-full overflow-y-auto custom-scrollbar mt-[130px]">
      <h1 className="text-3xl font-semibold mb-6">Statistics</h1>
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="chart-container">
          <h2 className="text-xl font-semibold mb-2">Beach Cleaning</h2>
          {beachCleaningData && <Line data={beachCleaningData} />}
        </div>
        <div className="chart-container">
          <h2 className="text-xl font-semibold mb-2">Trees Plantation</h2>
          {treesPlantationData && <Line data={treesPlantationData} />}
        </div>
        <div className="chart-container">
          <h2 className="text-xl font-semibold mb-2">Waste Recycling</h2>
          {wasteRecyclingData && <Line data={wasteRecyclingData} />}
        </div>
      </div>
    </div>
  );
}

export default Stats;
