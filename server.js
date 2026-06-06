const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const rideRoutes = require('./routes/ride');
const driverRoutes = require('./routes/driver');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/drivers', driverRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Campus Ride API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});