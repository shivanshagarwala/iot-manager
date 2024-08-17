const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const deviceRoutes = require('./routes/deviceRoutes');
const readingRoutes = require('./routes/readingRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/devices', deviceRoutes);
app.use('/api/devices', readingRoutes);  

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
