const CategoryModel = require('../models/categories.js');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

/* Category List All GET */
exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await CategoryModel.find().sort({ name: 1 }).exec();
  res.render('category_list', {
    title: "List of Categories",
    categories: allCategories,
  })
});

/* Category Create GET */
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render('category_form', {
    title: "Create A Category",
    category: undefined,
  });
});

/* Category Create POST */
exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send(`Category Create POST: not yet implemented. <br><br><h1>${req.params.id}</h1>`);
});

/* Category Delete GET */
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send(`Category Delete GET: not yet implemented. <br><br><h1>${req.params.id}</h1>`);
});

/* Category Delete POST */
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send(`Category Delete POST: not yet implemented. <br><br><h1>${req.params.id}</h1>`);
});

/* Category Update GET */
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send(`Category Update GET: not yet implemented. <br><br><h1>${req.params.id}</h1>`);
});

/* Category Update POST */
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send(`Category Update POST: not yet implemented. <br><br><h1>${req.params.id}</h1>`);
});

/* Category Detail GET */
exports.category_detail = asyncHandler(async (req, res, next) => {
  //const category = await CategoryModel.findById(req.params.id).exec();
  res.send(`CATEGORY DETAIL GET: Not yet implemented. <br><br><h1>${req.params.id}</h1>`);
});
