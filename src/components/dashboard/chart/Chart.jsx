import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import './Chart.css';
import { getStats } from '../../../apis/report';

const Chart = () => {
  const [chartData, setChartData] = useState(null);

  const fetchChartData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/disaster-data');
      const data = response.data;

      const disasterCounts = data.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(disasterCounts);
      const values = Object.values(disasterCounts);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Disaster Large',
            data: values,
            backgroundColor: [
              'rgba(153, 205, 255, 0.5)',
              'rgba(255, 235, 154, 0.5)',
              'rgba(255, 203, 153, 0.5)',
              'rgba(252, 154, 153, 0.5)',
            ],
            borderColor: [
              'rgba(153, 205, 255, 1)',
              'rgba(255, 235, 154, 1)',
              'rgba(255, 203, 153, 1)',
              'rgba(252, 154, 153, 1)',
            ],
            borderWidth: 1.5,
          },
        ],
      };

      setChartData(chartData);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  useEffect(() => {
    // 처음 로딩 시 데이터를 한 번 가져옵니다.
    getStats();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        titleColor: '#000000',
        bodyColor: '#000000',
        padding: 10,
        cornerRadius: 5,
        boxPadding: 5,
        titleFont: {
          size: 16,
          weight: 'bold',
          family: 'Arial'
        },
        bodyFont: {
          size: 14,
          family: 'Arial',
          color: "#000000"          
        },
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || '';
            return `${label}: ${value}`;
          },
          labelTextColor: function() {
            return '#000000';
          },
          titleColor: function() {
            return '#000000'; 
          },
        }
      }
    },
  };

  return (
    <div className='chart-container'>
      <div className='title-container'>
        <h2>출동통계</h2>
        <img 
          src="/images/refresh.png"
          alt="새로고침"
          className='refreshBtn'
          onClick={fetchChartData}
        />
      </div>
      {chartData ? <Doughnut data={chartData} options={options} /> : null}
    </div>
  );
};

export default Chart;
