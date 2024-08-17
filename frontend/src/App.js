import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeviceGraph from './components/DeviceGraph';
import { useLocation } from 'react-router-dom';
import './App.css'; 

const App = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const location = useLocation();

  // Extract deviceUid from URL query parameters or use default value
  const queryParams = new URLSearchParams(location.search);
  const deviceUid = queryParams.get('deviceUid') || 'device-uid-bengaluru'; 

  useEffect(() => {
    const fetchData = async (parameter, setData) => {
      try {
        const response = await axios.get(`/api/devices/${deviceUid}/readings/${parameter}`, {
          params: {
            start_on: '2023-08-16T00:00:00',
            end_on: '2025-08-16T23:59:59',
          },
        });
        console.log(`API Response Data for ${parameter}:`, response.data);
        setData(response.data);
      } catch (error) {
        console.error(`Error fetching ${parameter} data:`, error);
      }
    };

    fetchData('temperature', setTemperatureData);
    fetchData('humidity', setHumidityData);

    // Set up periodic updates every 10 seconds
    const interval = setInterval(() => {
      fetchData('temperature', setTemperatureData);
      fetchData('humidity', setHumidityData);
    }, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [deviceUid]);

  

  return (
    <div className="app-container">
      <h1>IoT Device Manager</h1>
      <h2>Device: {deviceUid}</h2>
      <div className="graphs-container">
        <div className="canvas-container">
          {temperatureData.length > 0 ? <DeviceGraph data={temperatureData} parameter="Temperature" /> : <p>Add data in temperature for this device</p>}
        </div>
        <div className="canvas-container">
          {humidityData.length > 0 ? <DeviceGraph data={humidityData} parameter="Humidity" /> : <p>Add data in humidity for this device</p>}
        </div>
      </div>
    </div>
  );
};

export default App;
