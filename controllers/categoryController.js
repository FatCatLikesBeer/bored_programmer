const CategoryModel = require('../models/categories.js');
const ActivityModel = require('../models/activity.js');
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
    title: "Create Category",
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

    // Check for a pre-existing name.
    const preExistingCategory = await CategoryModel.findOne({ name: req.body.name }).exec();
    if (preExistingCategory?.name == req.body.name) {
      res.render('category_form', {
        title: "Create Category",
        category: undefined,
        errors: [{ msg: `\"${req.body.name}\" category already exists.`}],
      });
    return;
    }

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

/* Category Update GET */
exports.category_update_get = asyncHandler(async (req, res, next) => {
  const category = await CategoryModel.findById(req.params.id).exec();
  res.render('category_form', {
    title: "Update Post",
    category: category,
    errors: undefined,
  });
})

/* Category Update POST */
exports.category_update_post = [
  body("name", "Category must be at least 3 characters long.").trim().isLength({ min: 3 }).escape(),

  // Check if theres are name collissions.
  asyncHandler(async (req, res, next) => {
    const catById = await CategoryModel.findById(req.params.id).exec();
    const catByName = await CategoryModel.findOne({ name: req.body.name }).exec();

    // Was an edit actually done to the Category?
    if (catById?.name == req.body.name) {
      res.render('category_form', {
        title: "Edit Category",
        errors: [{ msg: `\"${req.body.name}\" Category: no edits made.`}],
        category: catById,
      });
      return;
    }

    // Does a Category with this name already exist?
    if (catByName?.name == req.body.name) {
      res.render('category_form', {
        title: "Edit Category",
        errors: [{ msg: `\"${req.body.name}\" Category already exists.`}],
        category: catById,
      });
      return;
    }
    next();
  }),

  // Actual Update Function.
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // Create a new Category object based on our input.
    const category = new CategoryModel({
      name: req.body.name,
      _id: req.params.id, // This is required, or a new ID will be assigned!
    });

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: "Edit Category",
        category: category,
        errors: errors.array(),
      })
    } else {
      // Update the Category with our contents, return the Category to a variable.
      const updatedCat = await CategoryModel.findByIdAndUpdate(req.params.id, category, {});
      // Redirect to updated Category's details page.
      res.redirect(updatedCat.url);
    }
  }),
]

/* Category Delete GET */
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const category = await CategoryModel.findById(req.params.id).exec();
  res.render('category_delete', {
    title: "Delete Category",
    category: category,
  })
});

/* Category Delete POST */
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  // Make sure that no Activites exist which use the requested Category.
  const category = await CategoryModel.findById(req.params.id).exec();
  const activities = await ActivityModel.find({ category: req.params.id }).exec();

  // Checks if there exist Activities with this Category.
  if (activities.length != 0) {
    res.render('category_delete', {
      title: "Delete Category",
      category: category,
      activities: activities,
      errors: `Please remove the \"${category.name}\" tag from the following Activities:`,
    });
    return;
  } else {
    // If no activities, then delete category and redirect to category list.
    await CategoryModel.findByIdAndDelete(req.params.id).exec();
    res.redirect('/categories/');
  }
});

/* Category Detail GET */
exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, activities] = await Promise.all([
    CategoryModel.findById(req.params.id).exec(),
    ActivityModel.find({ category: req.params.id }).exec(),
  ])
  res.render('category_detail', {
    title: `Category: ${category.name}`,
    category: category,
    activities: activities,
  })
});
