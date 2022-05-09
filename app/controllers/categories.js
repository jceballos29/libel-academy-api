const { CategoryModel } = require('../models');
const { handleHTTPError, handleSuccess } = require('../utils/handleResponses');


const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find().populate('image');
    return handleSuccess(res, 'Categoría encontradas', categories);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
}


const getCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id).populate('image');
    if (!category) {
      return handleHTTPError(res, 'Categoría no encontrada', 404);
    }
    return handleSuccess(res, 'Categoría encontrada', category);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
}


const createCategory = async (req, res) => {
  try {
    const category = await CategoryModel.create(req.body);
    return handleSuccess(res, 'Categoría creada', category);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
}


const updateCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('image');
    if (!category) {
      return handleHTTPError(res, 'Categoría no encontrada', 404);
    }
    return handleSuccess(res, 'Categoría actualizada', category);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
}


const deleteCategory = async (req, res) => {
  try {
    const category = await CategoryModel.deleteById(req.params.id);
    if (!category) {
      return handleHTTPError(res, 'Categoría no encontrada', 404);
    }
    return handleSuccess(res, 'Categoría eliminada', category);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
}


module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};