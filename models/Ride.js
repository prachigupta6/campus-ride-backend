// Ride states: requested, accepted, in_progress, completed, cancelled
const rides = [];
let rideIdCounter = 1;

function createRide(rideData) {
  const ride = {
    id: rideIdCounter++,
    passengerId: rideData.passengerId,
    driverId: null,
    pickupLocation: rideData.pickupLocation,
    destination: rideData.destination,
    status: 'requested', // requested, accepted, in_progress, completed, cancelled
    fare: rideData.fare || 10, // default fare is 10 due to campus regulations
    requestedAt: new Date(),
    acceptedAt: null,
    startedAt: null,
    completedAt: null,
    cancelledAt: null
  };
  rides.push(ride);
  return ride;
}

function findRideById(id) {
  return rides.find(r => r.id === id);
}

function findAllAvailableRides() {
  return rides.filter(r => r.status === 'requested');
}

function findRidesByPassenger(passengerId) {
  return rides.filter(r => r.passengerId === passengerId);
}

function findRidesByDriver(driverId) {
  return rides.filter(r => r.driverId === driverId);
}

function updateRideStatus(rideId, status, driverId = null) {
  const ride = findRideById(rideId);
  if (!ride) return null;
  
  ride.status = status;
  
  if (status === 'accepted') {
    ride.driverId = driverId;
    ride.acceptedAt = new Date();
  } else if (status === 'in_progress') {
    ride.startedAt = new Date();
  } else if (status === 'completed') {
    ride.completedAt = new Date();
  } else if (status === 'cancelled') {
    ride.cancelledAt = new Date();
  }
  
  return ride;
}

module.exports = {
  rides,
  createRide,
  findRideById,
  findAllAvailableRides,
  findRidesByPassenger,
  findRidesByDriver,
  updateRideStatus
};