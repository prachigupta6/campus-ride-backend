const users = [];

function createUser(userData) {
  const user = {
    id: Date.now(),
    ...userData,
    createdAt: new Date()
  };
  users.push(user);
  return user;
}

function findUserByEmail(email) {
  return users.find(u => u.email === email);
}

function findAllUsers() {
  return users;
}

module.exports = { 
  users, 
  createUser, 
  findUserByEmail, 
  findAllUsers 
};