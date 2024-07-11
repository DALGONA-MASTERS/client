import React, { useEffect } from "react";
import {
  useGetMounthStatsMutation,
  useGetStatsMutation,
} from "../../features/api/apiSlice";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Register required components
Chart.register(ArcElement, Tooltip, Legend);

function Stats() {
  const [getStats, getStatsResult] = useGetStatsMutation();
  const [getMounthState, getMounthStateResult] = useGetMounthStatsMutation();

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

  if (!getStatsResult.isSuccess || !getMounthStateResult.isSuccess) {
    return <div>Loading...</div>;
  }

  const { actions } = getStatsResult.data;

  const createChartData = (action: any, label: string) => ({
    labels: ["Progress", "Remaining"],
    datasets: [
      {
        label: `${label} Progress`,
        data: [action?.progress, action?.target - action?.progress],
        backgroundColor: ["green", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  });

  const beachCleaningData = createChartData(
    actions.beach_cleaning,
    "Beach Cleaning"
  );
  const treesPlantationData = createChartData(
    actions.trees_plantation,
    "Trees Plantation"
  );
  const wasteRecyclingData = createChartData(
    actions.waste_recycling,
    "Waste Recycling"
  );

  return (
    <div className="home-container flex flex-col items-center h-full overflow-y-auto custom-scrollbar mt-[130px]">
      <h1 className="text-3xl font-semibold mb-6">Statistics</h1>
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="chart-container">
          <h2 className="text-xl font-semibold mb-2">Beach Cleaning</h2>
          <Pie data={beachCleaningData} />
        </div>
        <div className="chart-container">
          <h2 className="text-xl font-semibold mb-2">Trees Plantation</h2>
          <Pie data={treesPlantationData} />
        </div>
        <div className="chart-container">
          <h2 className="text-xl font-semibold mb-2">Waste Recycling</h2>
          <Pie data={wasteRecyclingData} />
        </div>
      </div>
    </div>
  );
}

export default Stats;
