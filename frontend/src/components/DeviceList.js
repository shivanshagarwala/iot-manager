import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeviceList = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    axios.get('/api/devices/')
      .then(response => setDevices(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Devices</h2>
      <ul>
        {devices.map(device => (
          <li key={device.uid}>{device.name} (UID: {device.uid})</li>
        ))}
      </ul>
    </div>
  );
};

export default DeviceList;
