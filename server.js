const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./db');

// Load environment variables FIRST
dotenv.config();

// Verify environment variables are loaded
console.log('Server running on port', process.env.PORT || 5000);
console.log('JWT_SECRET exists?', !!process.env.JWT_SECRET);
console.log('MONGODB_URI exists?', !!process.env.MONGODB_URI);

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const rideRoutes = require('./routes/ride');
const driverRoutes = require('./routes/driver');

app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/drivers', driverRoutes);

app.get('/', (req, res) => {
  res.send('Campus Ride API is running');
});

// Connect to MongoDB and start server
async function startServer() {
  const dbConnection = await connectDB();
  
  // Only start server if database connection is successful
  if (dbConnection) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } else {
    console.error('❌ Failed to connect to database. Server not started.');
    process.exit(1);
  }
}

startServer();