/** @format */

const handleHTTPError = (res, message, code = 500) => {
  res.status(code).json({
    success: false,
    message,
  });
};


const handleSuccess = (res, message, data, code = 200) => {
  res.status(code).json({
    success: true,
    message,
    data,
  });
};


module.exports = { handleSuccess, handleHTTPError };
