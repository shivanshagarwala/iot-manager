import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const DeviceGraph = ({ data, parameter }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Clean up existing chart instance if present
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => new Date(d.timestamp)),
        datasets: [{
          label: `${parameter} over Time`,
          data: data.map(d => ({ x: new Date(d.timestamp), y: d.value })),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        }],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'minute', // Adjust this based on your data range
              tooltipFormat: 'yyyy-MM-dd HH:mm:ss',
            },
            title: {
              display: true,
              text: 'Time',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: parameter,
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.raw.y;
                const date = context.raw.x;
                return `${parameter}: ${value} at ${date.toLocaleString()}`;
              }
            }
          }
        }
      },
    });

    // Cleanup on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, parameter]);

  return <canvas ref={chartRef}></canvas>;
};

export default DeviceGraph;


// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';
// import 'chartjs-adapter-date-fns'; // Import the date adapter

// const DeviceGraph = ({ data, parameter }) => {
//   const chartRef = useRef(null);
//   const chartInstanceRef = useRef(null);

//   useEffect(() => {
//     const ctx = chartRef.current.getContext('2d');

//     // Clean up existing chart instance if present
//     if (chartInstanceRef.current) {
//       chartInstanceRef.current.destroy();
//     }

//     // Calculate the time differences from the first data point
//     const startTime = new Date(data[0].timestamp);
//     const formattedData = data.map(d => ({
//       x: (new Date(d.timestamp) - startTime) / 1000, // Difference in seconds
//       y: d.value,
//     }));

//     console.log(`Data for ${parameter}:`, formattedData); // Log data to check format

//     chartInstanceRef.current = new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels: formattedData.map(d => d.x), // Relative time in seconds
//         datasets: [{
//           label: `${parameter} over Time`,
//           data: formattedData,
//           fill: false,
//           borderColor: 'rgb(75, 192, 192)',
//           tension: 0.1,
//         }],
//       },
//       options: {
//         scales: {
//           x: {
//             type: 'linear', // Use linear scale for relative time
//             position: 'bottom',
//             ticks: {
//               callback: function(value) {
//                 const minutes = Math.floor(value / 60);
//                 const seconds = Math.floor(value % 60);
//                 return `${minutes}m ${seconds}s`;
//               }
//             },
//             title: {
//               display: true,
//               text: 'Time Difference (seconds)',
//             },
//           },
//           y: {
//             beginAtZero: true,
//             title: {
//               display: true,
//               text: parameter,
//             },
//           },
//         },
//       },
//     });

//     // Cleanup on component unmount
//     return () => {
//       if (chartInstanceRef.current) {
//         chartInstanceRef.current.destroy();
//       }
//     };
//   }, [data, parameter]);

//   return <canvas ref={chartRef}></canvas>;
// };

// export default DeviceGraph;
