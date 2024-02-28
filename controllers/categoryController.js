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
exports.category_create_post = [
  // Parse input
  body("name", "Category must contain at least 3 characters.")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from request.
    const errors = validationResult(req);

    // Create a category object with escaped and trimmed data.
    const newCategory = new CategoryModel({ name: req.body.name });

    if (!errors.isEmpty()) {
      // Errors exist. Render the form again with sanitized values/error messages.
      res.render('category_form', {
        title: "Create Category",
        category: newCategory,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from is valid.
      // Check if Category with same name already exists.
      const categoryExists = await CategoryModel.findOne({ name: req.body.name }).exec();
      if (categoryExists) {
        // Category exists, redirect to its detail page.
        res.redirect(categoryExists.url);
      } else {
        await newCategory.save();
        // New Category saved. Redirect to newly create genre page.
        res.redirect(newCategory.url);
      }
    }
  }),
];

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
  const category = await CategoryModel.findById(req.params.id).exec();
  res.render('category_detail', {
    title: `Category: ${category.name}`,
    category: category,
  })
  // res.send(`CATEGORY DETAIL GET: Not yet implemented. <br><br><h1>${req.params.id}</h1>`);
});
