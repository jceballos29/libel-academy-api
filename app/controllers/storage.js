require('dotenv').config();
const mongoose = require('mongoose');
const {
  handleSuccess,
  handleHTTPError,
} = require('../utils/handleResponses');
const { StorageModel } = require('../models');
const PUBLIC_URL = process.env.PUBLIC_URL;


const getAllStorageItems = async (req, res) => {
  try {
    const storageItems = await StorageModel.find({});
    handleSuccess(res, 200, storageItems);
  } catch (error) {
    handleHTTPError(res, 500, error);
  }
}

const getStorageItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.ObjectId.isValid(id))
      return handleHTTPError(res, 400, 'Invalid storage item id');
    const storage = await StorageModel.findById(id);
    if (!storage)
      return handleHTTPError(res, 404, 'Storage item not found');
    return handleSuccess(
      res,
      200,
      'Get storage item success',
      storage
    );
  } catch (error) {
    return handleHTTPError(res, error.message);
  }
};

const createStorageItem = async (req, res) => {
  try {
    const { file } = req;
    if(!file) return handleHTTPError(res, 400, 'Invalid storage item');
    const storage = await StorageModel.create({
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    });
    return handleSuccess(res, 'File upload success', storage, 201);
  } catch (error) {
    return handleHTTPError(res, error.message);
  }
};


module.exports = {
  getAllStorageItems,
  getStorageItem,
  createStorageItem,
};