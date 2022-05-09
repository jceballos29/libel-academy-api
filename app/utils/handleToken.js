const jwt = require('jsonwebtoken');

const generateToken = async (user) => {
  const token = await jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );
  return token;
};

const verifyToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };