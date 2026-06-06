const express = require('express');
const { createRide, findRideById, findAllAvailableRides, findRidesByPassenger, findRidesByDriver, updateRideStatus } = require('../models/Ride');
const { getAvailableDrivers, isDriverOnline } = require('../models/Driver');
const router = express.Router();

// Passenger: Request a ride
router.post('/request', (req, res) => {
  const { passengerId, pickupLocation, destination, fare } = req.body;
  
  if (!passengerId || !pickupLocation || !destination) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const ride = createRide({
    passengerId,
    pickupLocation,
    destination,
    fare
  });
  
  res.status(201).json({
    message: 'Ride requested successfully',
    ride
  });
});

// Driver: View available rides
router.get('/available', (req, res) => {
  const availableRides = findAllAvailableRides();
  res.json({ rides: availableRides });
});

// Driver: Accept a ride
router.post('/accept/:rideId', (req, res) => {
  const { rideId } = req.params;
  const { driverId } = req.body;
  
  // Check if driver is online
  if (!isDriverOnline(driverId)) {
    return res.status(400).json({ error: 'Driver must be online to accept rides' });
  }
  
  const ride = findRideById(parseInt(rideId));
  
  if (!ride) {
    return res.status(404).json({ error: 'Ride not found' });
  }
  
  if (ride.status !== 'requested') {
    return res.status(400).json({ error: `Ride already ${ride.status}` });
  }
  
  // Update ride status to accepted
  const updatedRide = updateRideStatus(parseInt(rideId), 'accepted', driverId);
  
  res.json({
    message: 'Ride accepted successfully',
    ride: updatedRide
  });
});

// Driver: Start ride
router.post('/start/:rideId', (req, res) => {
  const { rideId } = req.params;
  const { driverId } = req.body;
  
  const ride = findRideById(parseInt(rideId));
  
  if (!ride) {
    return res.status(404).json({ error: 'Ride not found' });
  }
  
  if (ride.driverId !== driverId) {
    return res.status(403).json({ error: 'Only assigned driver can start this ride' });
  }
  
  if (ride.status !== 'accepted') {
    return res.status(400).json({ error: 'Ride must be accepted before starting' });
  }
  
  const updatedRide = updateRideStatus(parseInt(rideId), 'in_progress');
  
  res.json({
    message: 'Ride started successfully',
    ride: updatedRide
  });
});

// Driver: Complete ride
router.post('/complete/:rideId', (req, res) => {
  const { rideId } = req.params;
  const { driverId } = req.body;
  
  const ride = findRideById(parseInt(rideId));
  
  if (!ride) {
    return res.status(404).json({ error: 'Ride not found' });
  }
  
  if (ride.driverId !== driverId) {
    return res.status(403).json({ error: 'Only assigned driver can complete this ride' });
  }
  
  if (ride.status !== 'in_progress') {
    return res.status(400).json({ error: 'Ride must be in progress to complete' });
  }
  
  const updatedRide = updateRideStatus(parseInt(rideId), 'completed');
  
  res.json({
    message: 'Ride completed successfully',
    ride: updatedRide
  });
});

// Passenger: Cancel ride
router.post('/cancel/:rideId', (req, res) => {
  const { rideId } = req.params;
  const { passengerId } = req.body;
  
  const ride = findRideById(parseInt(rideId));
  
  if (!ride) {
    return res.status(404).json({ error: 'Ride not found' });
  }
  
  if (ride.passengerId !== passengerId) {
    return res.status(403).json({ error: 'Only passenger can cancel their own ride' });
  }
  
  if (ride.status !== 'requested' && ride.status !== 'accepted') {
    return res.status(400).json({ error: `Cannot cancel ride that is already ${ride.status}` });
  }
  
  const updatedRide = updateRideStatus(parseInt(rideId), 'cancelled');
  
  res.json({
    message: 'Ride cancelled successfully',
    ride: updatedRide
  });
});

// Get ride by ID
router.get('/:rideId', (req, res) => {
  const ride = findRideById(parseInt(req.params.rideId));
  if (!ride) {
    return res.status(404).json({ error: 'Ride not found' });
  }
  res.json({ ride });
});

module.exports = router;