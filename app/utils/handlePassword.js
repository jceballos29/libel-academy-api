require('dotenv').config();
const bcryptjs = require('bcryptjs');

const encryptPassword = async (password) => {
  const salt = await bcryptjs.genSalt(
    parseInt(process.env.SALT_ROUNDS, 10)
  );
  const hash = await bcryptjs.hash(password, salt);
  return hash;
};

const comparePassword = async (password, hash) => {
  const result = await bcryptjs.compare(password, hash);
  return result;
};

module.exports = { encryptPassword, comparePassword };