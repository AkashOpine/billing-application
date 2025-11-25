// SalesChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart: React.FC = () => {
  const data = {
    labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Sales',
        data: [100, 80, 60, 40, 20, 50, 70],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        type: 'linear', // Add this line to specify the scale type
        beginAtZero: true,
        ticks: {
          stepSize: 20,
          callback: function (value: string | number): string {
            const val = typeof value === 'number' ? value : parseFloat(value);
            if ([20, 40, 60, 80, 100].includes(val)) {
              return val.toString();
            }
            return '';
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default SalesChart;
