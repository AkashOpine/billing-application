// components/ReorderBarChart.tsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import { Row } from "react-bootstrap";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface ReorderItem {
  label: string;
  value: number;
  color: string;
}

interface ReorderBarChartProps {
  data: ReorderItem[];
  itemsBelowReorder: number;
}

const ChartContainer = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;
const ChartWrapper = styled.div`
  width: 100%;
  height: 240px; // Adjusted height
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  .badge {
    background: #fef2f2;
    color: #dc2626;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-weight: 600;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

const ReorderBarChart: React.FC<ReorderBarChartProps> = ({
  data,
  itemsBelowReorder,
}) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) => item.color),
        borderRadius: 6,
        barThickness: 16,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false, // Needed to control custom height
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        ticks: { color: "#6B7280" },
        grid: { color: "#E5E7EB" },
        border: { display: false },
      },
      y: {
        ticks: { color: "#6B7280" },
        grid: { display: false },
        border: { display: false },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 0,
        right: 10,
      },
    },
    elements: {
      bar: {
        borderRadius: 6,
        barThickness: 12, // Slightly thinner bars  
      },
    },
  };

  return (
    <ChartContainer>
      <Header>
        <div>
          <h5 >Item Reached Reorder Point</h5>
          <p style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>
            These items have reached or are near their reorder levels. Consider
            restocking soon
          </p>
        </div>
        <div className="badge">
          <span>⚠️</span> {itemsBelowReorder} Items Below Reorder
        </div>
      </Header>
      <ChartWrapper>
        <Bar data={chartData} options={chartOptions} />
      </ChartWrapper>
    </ChartContainer>
  );
};

export default ReorderBarChart;
