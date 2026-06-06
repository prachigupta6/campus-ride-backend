const express = require('express');
const { setDriverStatus, getAvailableDrivers, updateDriverLocation } = require('../models/Driver');
const { findRidesByDriver } = require('../models/Ride');
const router = express.Router();

// Driver: Go online
router.post('/online', (req, res) => {
  const { driverId, location } = req.body;
  
  if (!driverId) {
    return res.status(400).json({ error: 'driverId required' });
  }
  
  const driver = setDriverStatus(driverId, true, location);
  
  res.json({
    message: 'Driver is now ONLINE',
    driver
  });
});

// Driver: Go offline
router.post('/offline', (req, res) => {
  const { driverId } = req.body;
  
  if (!driverId) {
    return res.status(400).json({ error: 'driverId required' });
  }
  
  const driver = setDriverStatus(driverId, false);
  
  res.json({
    message: 'Driver is now OFFLINE',
    driver
  });
});

// Driver: Update location
router.post('/location', (req, res) => {
  const { driverId, location } = req.body;
  
  if (!driverId || !location) {
    return res.status(400).json({ error: 'driverId and location required' });
  }
  
  const driver = updateDriverLocation(driverId, location);
  
  res.json({
    message: 'Location updated',
    driver
  });
});

// Get all online drivers
router.get('/available', (req, res) => {
  const availableDrivers = getAvailableDrivers();
  res.json({ drivers: availableDrivers });
});

// Get driver's ride history
router.get('/:driverId/rides', (req, res) => {
  const rides = findRidesByDriver(parseInt(req.params.driverId));
  res.json({ rides });
});

module.exports = router;