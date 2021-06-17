import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    } 

    fetchAPI();
  }, []);

  const barChart = (
    confirmed
    ? (
      <Bar 
        data={{
          labels: ['Infectados', 'Recuperados', 'Mortos'],
          datasets: [
            {
            label: 'Pessoas',
            backgroundColor: ['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(10, 10, 10, 0.796)'],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
        }}
        options={{
          legend: { display : false},
          title: { display : true, text: `Atualmente em: ${country}`},
        }}
      />
    ) : null
  );
  
  const lineChart = (
    dailyData[0]
    ? (<Line
      data={{
        labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
        datasets: [{
          data: dailyData.map((data) => data.confirmed),
          label: 'Infectados',
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
          fill: true,
        }, {
          data: dailyData.map((data) => data.deaths),
          label: 'Mortos',
          borderColor: 'black',
          backgroundColor: 'rgba(10, 10, 10, 0.796)',
          fill: true,
        },  {
          data: dailyData.map((data) => data.recovered),
          label: 'Recuperados',
          borderColor: 'green',
          backgroundColor: 'rgba(0, 255, 0, 0.5)',
          fill: true,
        },
        ],
      }}
      />) : null
    );

  return (
    <div className={styles.container}>
      { country ? barChart : lineChart }
    </div>
  );
};

export default Chart;