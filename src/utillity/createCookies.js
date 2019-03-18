const { sign } = require('jsonwebtoken');

const createCookie = (userId, userName) => {
  const payload = {
    userId,
    userName,
  };
  const token = sign(payload, process.env.SECRET);
  return token;
};

module.exports = { createCookie };
