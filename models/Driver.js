// Driver availability status
const drivers = [];

function setDriverStatus(driverId, isOnline, currentLocation = null) {
  const existing = drivers.find(d => d.driverId === driverId);
  
  if (existing) {
    existing.isOnline = isOnline;
    existing.lastLocation = currentLocation || existing.lastLocation;
    existing.lastUpdated = new Date();
    return existing;
  }
  
  const driver = {
    driverId,
    isOnline,
    lastLocation: currentLocation,
    lastUpdated: new Date()
  };
  drivers.push(driver);
  return driver;
}

function getAvailableDrivers() {
  return drivers.filter(d => d.isOnline === true);
}

function isDriverOnline(driverId) {
  const driver = drivers.find(d => d.driverId === driverId);
  return driver ? driver.isOnline : false;
}

function updateDriverLocation(driverId, location) {
  const driver = drivers.find(d => d.driverId === driverId);
  if (driver) {
    driver.lastLocation = location;
    driver.lastUpdated = new Date();
  }
  return driver;
}

module.exports = {
  drivers,
  setDriverStatus,
  getAvailableDrivers,
  isDriverOnline,
  updateDriverLocation
};