import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
  ArcElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
  ArcElement
);

export default function BarChart({
  labels = [],
  datasets = [],
  title = "",
  height = 300,
  type = "bar", // 'bar' or 'line'
  showLegend = true,
  showGrid = true,
  currencyFormat = true,
  stacked = false,
}) {
  if (!labels || labels.length === 0 || !datasets || datasets.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-8 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
        <div className="text-center">
          <div className="text-gray-400 mb-3">
            <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">No data available for chart</p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels,
    datasets: datasets.map(dataset => ({
      ...dataset,
      tension: dataset.tension || 0.4,
      fill: dataset.fill || false,
      pointRadius: dataset.pointRadius || (type === 'line' ? 3 : 0),
      pointHoverRadius: dataset.pointHoverRadius || 6,
      pointBackgroundColor: dataset.pointBackgroundColor || dataset.borderColor || dataset.backgroundColor,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
      title: {
        display: !!title,
        text: title,
        font: { 
          size: 16,
          weight: '600',
          family: "'Inter', sans-serif",
        },
        color: '#1F2937',
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1F2937',
        bodyColor: '#4B5563',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        boxPadding: 8,
        usePointStyle: true,
        callbacks: {
          label: (context) => {
            const value = context.raw;
            if (currencyFormat && typeof value === 'number') {
              return `${context.dataset.label || 'Value'}: $${value.toLocaleString('en-US', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })}`;
            }
            return `${context.dataset.label || 'Value'}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: showGrid,
          drawBorder: false,
          color: '#F3F4F6',
        },
        ticks: {
          font: {
            size: 11,
            family: "'Inter', sans-serif",
          },
          color: '#6B7280',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: showGrid,
          drawBorder: false,
          color: '#F3F4F6',
        },
        ticks: {
          font: {
            size: 11,
            family: "'Inter', sans-serif",
          },
          color: '#6B7280',
          callback: (value) => {
            if (currencyFormat && typeof value === 'number') {
              return `$${value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toLocaleString()}`;
            }
            return value;
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    animation: {
      duration: 750,
      easing: 'easeOutQuart',
    },
  };

  const ChartComponent = type === 'line' ? Line : Bar;

  return (
    <div 
      className="w-full"
      style={{ height: `${height}px` }}
    >
      <ChartComponent 
        data={chartData} 
        options={{
          ...options,
          scales: {
            ...options.scales,
            y: {
              ...options.scales.y,
              stacked: stacked,
            },
            x: {
              ...options.scales.x,
              stacked: stacked,
            },
          },
        }} 
      />
    </div>
  );
}