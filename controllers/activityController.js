const ActivityModel = require('../models/activity.js');
const TagModel = require('../models/tags.js');
const CatgoryModel = require('../models/categories.js');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

/* Activity List GET */
exports.activity_list = asyncHandler(async (req, res, next) => {
  const allActivities = await ActivityModel.find().sort({ name: 1}).populate("category").exec();
  res.render('activity_list', {
    title: "List of Activites",
    allActivities: allActivities,
  })
});

/* Activity Create GET */
exports.activity_create_get = asyncHandler(async (req, res, next) => {
  const [allTags, allCategories] = await Promise.all([
    TagModel.find().sort({ name: 1 }).exec(),
    CatgoryModel.find().sort({ name: 1 }).exec(),
  ]);
  res.render('activity_form', {
    title: "Create Activity",
    allCategories: allCategories,
    allTags: allTags,
  });
});

/* Activity Create POST */
exports.activity_create_post = [
  // Convert the tags to an array.
  (req, res, next) => {
    if (!Array.isArray(req.body.tag)) {
      req.body.tag = typeof req.body.tag === "undefined" ? [] : [req.body.tag];
    }
    next();
  },

  // Validate & sanitize fields.
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Desciption must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Category must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("genre.*").escape(),

  asyncHandler(async (req, res, next) => {
    // Extract validation errors from request.
    const errors = validationResult(req);

    // Create a new Activity object from form's parameters
    const activity = new ActivityModel({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      tag: req.body.tag,
    });

    if (!errors.isEmpty()) {
      // Errors exist. Render form again with sanitized values/error message.
      const [allTags, allCategories] = await Promise.all([
        TagModel.find().sort({ name: 1 }).exec(),
        CatgoryModel.find().sort({ name: 1 }).exec(),
      ]);

      for (tag of allTags) {
        if (activity.tag.includes(tag._id)) {
          tag.checked = "true";
        }
      };
      res.render('activity_detail', {
        title: "Activity Detail",
        name: "",
        allCategories, allCategories,
        allTags: allTags,
      })
    } else {
      // Data from form is valid
      await activity.save();
      res.redirect(activity.url);
    }
  })
];

/* Activity Update GET */
exports.activity_update_get = asyncHandler(async (req, res, next) => {
  res.render('activity_form', {
    title: "Update Activity",
  })
});

/* Activity Update POST */
exports.activity_update_post = asyncHandler(async (req, res, next) => {
  res.send(`Activity Update POST: Not yet implemented <br><br><h1>${req.params.id}</h1>`);
});

/* Activity Delete GET */
exports.activity_delete_get = asyncHandler(async (req, res, next) => {
  res.send(`Activity Delete GET: Not yet implemented <br><br><h1>${req.params.id}</h1>`);
});

/* Activity Delete POST */
exports.activity_delete_post = asyncHandler(async (req, res, next) => {
  res.send(`Activity Delete POST: Not yet implemented <br><br><h1>${req.params.id}</h1>`);
});

/* Activity Detail GET */
exports.activity_detail = asyncHandler(async (req, res, next) => {
  const activity = await ActivityModel.findById(req.params.id)
    .populate("category")
    .populate("tag")
    .exec();
  const [category, tag] = await Promise.all([
    CatgoryModel.findById(activity.category).exec(),
    TagModel.findById(activity.tag).exec(),
  ]);
  res.render('activity_detail', {
    title: "Activity Detail",
    activity: activity,
  });
});
