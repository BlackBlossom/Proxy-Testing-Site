// server/utils/generateToken.js
const jwt = require('jsonwebtoken');

function generateToken(adminId, role) {
    // console.log('Generating token for admin:', adminId, 'with role:', role);
  const token = jwt.sign({ id: adminId, role }, process.env.JWT_SECRET, {
    expiresIn: '8h'
  });
    // console.log('Token generated:', token);
    return token;
}

module.exports = generateToken;
