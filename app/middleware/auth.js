/** @format */

const { verifyToken } = require('../utils/handleToken');
const { handleHTTPError } = require('../utils/handleResponses');

const validate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return handleHTTPError(res, 'No se encontró el token', 401);
    }
    const token = authorization.split(' ')[1];
    const decoded = await verifyToken(token);
    if (!decoded) {
      return handleHTTPError(res, 'Token inválido', 401);
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    handleHTTPError(res, error.message);
  }
};

module.exports = { validate };
