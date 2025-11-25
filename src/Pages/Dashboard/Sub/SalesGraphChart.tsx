// components/SalesGraphChart.tsx
import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styled from "styled-components";

// Register the required chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);



interface SalesGraphChartProps {
  view: any;
  setView: any;
  data: any;
}

const TabToggle = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;

  button {
    margin-left: 0.5rem;
    padding: 0.5rem 0.75rem;
    border: none;
    border-radius: 5px;
    background: #fff;
    cursor: pointer;
    color: #a1a5b7;
    font-weight: 500;
    &.active {
      background: #0057ff;
      color: white;
    }
  }
`;

const SalesGraphChart: React.FC<SalesGraphChartProps> = ({
  setView,
  view,
  data,
}) => {
  const chartData = {
    labels: data?.map((d: any) => d.label),
    datasets: [
      {
        data: data?.map((d: any) => d.value),
        borderColor: "#6366F1",
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        fill: true,
        tension: 0,
        pointRadius: 4,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6B7280" },
      },
      y: {
        grid: { color: "#E5E7EB" },
        ticks: { color: "#6B7280" },
      },
    },
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div>
          <h5>Sales Graph</h5>
          {/* <p style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>
            More than 1000 new records
          </p> */}
        </div>
        <TabToggle>
          <div>
            <button
              className={view === "Month" ? "active" : ""}
              onClick={() => setView("Month")}
            >
              Month
            </button>
          </div>
          <div>
            <button
              className={view === "Week" ? "active" : ""}
              onClick={() => setView("Week")}
            >
              Week
            </button>
          </div>
        </TabToggle>
      </div>
      <div style={{ height: "320px" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default SalesGraphChart;
