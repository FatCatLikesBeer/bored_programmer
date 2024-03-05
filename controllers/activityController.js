const ActivityModel = require('../models/activity.js');
const TagModel = require('../models/tags.js');
const CatgoryModel = require('../models/categories.js');
const asyncHandler = require('express-async-handler');
const he = require('he');
const { body, validationResult } = require('express-validator');

/* Activity List GET */
exports.activity_list = asyncHandler(async (req, res, next) => {
  const allActivities = await ActivityModel.find().sort({ name: 1}).populate("category").populate("tag").exec();
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
    activity: undefined,
  });
});

/* Activity Create POST */
exports.activity_create_post = [
  // Convert the tags to an array. We need to do this to check for errors
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
  body("description", "Description must have more words.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("category", "Category must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("genre.*").escape(),

  asyncHandler(async (req, res, next) => {
    // Extract validation errors from request.
    const errors = validationResult(req);

    const [allTags, allCategories] = await Promise.all([
      TagModel.find().sort({ name: 1 }).exec(),
      CatgoryModel.find().sort({ name: 1 }).exec(),
    ]);

    // Check for pre-existing activity.
    const activityMatch = await ActivityModel.findOne({ name: req.body.name }).exec();
    if (activityMatch?.name == req.body.name) {
      res.render('activity_form', {
        title: "Create Activity",
        name: "",
        allCategories: allCategories,
        allTags: allTags,
        errors: [{ msg: `\"${req.body.name}\" activity already exists.`}],
      })
      return;
    }

    // Create a new Activity object from form's parameters
    const activity = new ActivityModel({
      name: he.decode(req.body.name),
      description: he.decode(req.body.description),
      category: req.body.category,
      tag: typeof req.body.tag === "undefined" ? [] : req.body.tag,
    });

    if (!errors.isEmpty()) {
      // Errors exist. Render form again with sanitized values/error message.

      for (tag of allTags) {
        if (activity.tag.includes(tag._id)) {
          tag.checked = "true";
        }
      };
      res.render('activity_form', {
        title: "Edit Activity",
        name: "",
        allCategories: allCategories,
        allTags: allTags,
        activity: undefined,
        errors: errors.array(),
      })
    } else {
      // Data from form is valid
      await activity.save();
      res.redirect(activity.url);
      console.log(errors);
    }
  })
];

/* Activity Update GET */
exports.activity_update_get = asyncHandler(async (req, res, next) => {
  const [
    activity,
    allCategories,
    allTags,
  ] = await Promise.all([
      ActivityModel.findById(req.params.id).exec(),
      CatgoryModel.find().sort({ name: 1 }).exec(),
      TagModel.find().sort({ name: 1 }).exec(),
  ]);

  // Mark our selected genres as checked.
  allTags.forEach((tag) => {
    if (activity.tag.includes(tag._id)) {tag.checked = true};
  });

  // Render the form
  res.render('activity_form', {
    title: "Update Activity",
    activity: activity,
    allCategories: allCategories,
    allTags: allTags,
  });
});

/* Activity Update POST */
exports.activity_update_post = [
  // Convert the tags to an array. We need to do this to check for errors
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
  body("description", "Description must have more words.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("category", "Category must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("genre.*").escape(),

  // Check if theres are name collissions.
  asyncHandler(async (req, res, next) => {
    const [
      actById,
      allCategories,
      allTags,
      actByName,
    ] = await Promise.all([
        ActivityModel.findById(req.params.id).exec(),
        CatgoryModel.find().sort({ name: 1 }).exec(),
        TagModel.find().sort({ name: 1 }).exec(),
        ActivityModel.findOne({ name: req.body.name }).exec(),
      ]);

    // Mark our selected genres as checked.
    allTags.forEach((tag) => {
      if (actById.tag.includes(tag._id)) {tag.checked = true};
    });

    // I'm not gonna bother checking if any edits were actually made.
    // Does Activity with this name already exist?
    // Unless it's the Activity we're actively trying to edit...
    if (actByName?.name == req.body.name && actByName?._id.toString() != actById._id.toString()) {
      res.render('activity_form', {
        title: "Update Activity",
        activity: actById,
        allCategories: allCategories,
        allTags: allTags,
        errors: [{ msg: `An activity with "${req.body.name}" name already exists. `}]
      });
      return;
    }
    next();
  }),

  // Actual Update Function.
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // Create a Activity object based on parameters passed.
    const activity = new ActivityModel({
      name: he.decode(req.body.name),
      description: he.decode(req.body.description),
      category: req.body.category,
      tag: typeof req.body.tag === "undefined" ? [] : req.body.tag,
      _id: req.params.id, // This is required, or a new ID will be assigned!
    });

    if (!errors.isEmpty()) {
      // Rerender Activity form with errors.
      const [allCategories, allTags, actById] = await Promise.all([
        CatgoryModel.find().sort({ name: 1 }).exec(),
        TagModel.find().sort({ name: 1 }).exec(),
        ActivityModel.findById(req.params.id).exec(),
      ]);
      // Mark our selected genres as checked.
      allTags.forEach((tag) => {
        if (actById.tag.includes(tag._id)) {tag.checked = true};
      });
      res.render('activity_form', {
        title: "Update Activity",
        activity: activity,
        errors: errors.array(),
        allCategories: allCategories,
        allTags: allTags,
      });
    } else {
      // Update the Activity & return its value.
      const updatedAct = await ActivityModel.findByIdAndUpdate(req.params.id, activity, {}).exec();
      // Redirect to the update Activity detail page
      res.redirect(updatedAct.url)
    }
  }),
];

/* Activity Delete GET */
exports.activity_delete_get = asyncHandler(async (req, res, next) => {
  const activity = await ActivityModel.findById(req.params.id).populate("category").populate("tag").exec();
  res.render('activity_delete', {
    title: "Delete Activity",
    activity: activity,
  });
});

/* Activity Delete POST */
exports.activity_delete_post = asyncHandler(async (req, res, next) => {
  ActivityModel.findByIdAndDelete(req.params.id).exec();
  res.redirect('/activities');
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

/* Using this export for testing & learning stuff */
exports.testicle_get = asyncHandler(async (req, res, next) => {
  console.log(req);
  res.send("check the console");
});

exports.testicle_post = asyncHandler(async (req, res, next) => {
  const activityMatch = await ActivityModel.find({ name: req.body.name }).exec();
  res.send(activityMatch);
});
