const TagModel = require('../models/tags.js');
const ActivityModel = require('../models/activity.js');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

/* Tag List */
exports.tag_list = asyncHandler(async (req, res, next) => {
  const allTags = await TagModel.find().sort({ name: 1 }).exec();
  res.render('tag_list', {
    title: 'List of Tags',
    tags: allTags,
  });
});

/* Tag Create GET */
exports.tag_create_get = (req, res, next) => {
  res.render('tag_form', { title: "Create Tag", tag: undefined, });
};

/* Tag Create POST */
exports.tag_create_post = [
  // Validate & sanitize the name field.
  body("name", "Tag must contain at least 3 characters.")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from request.
    const errors = validationResult(req);

    // Check for pre-existing tag name.
    const preExistingTag = await TagModel.findOne({ name: req.body.name }).exec();
    if (preExistingTag?.name == req.body.name) {
      res.render('tag_form', {
        title: "Create Tag",
        tag: undefined,
        errors: [{ msg: `\"${req.body.name}\" tag already exists.`}]
      });
      return;
    }

    // Create a tag object with esscaped and trimmed data.
    const tag = new TagModel({ name: req.body.name });

    if (!errors.isEmpty()) {
      // Errors exist. Render the form again with sanitized values/error messages.
      res.render('tag_form', {
        title: "Create Tag",
        tag: tag,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from is valid.
      // Check if Tag with same name already exists.
      const tagExists = await TagModel.findOne({ name: req.body.name }).exec();
      if (tagExists) {
        // Tag exists, redirect to its detail page.
        res.redirect(tagExists.url);
      } else {
        await tag.save();
        // New tag saved. Redirect to newly create genre page.
        res.redirect(tag.url);
      }
    }
  }),
];

/* Tag Update Get */
exports.tag_update_get = asyncHandler(async (req, res, next) => {
  const tag = await TagModel.findById(req.params.id).exec();
  res.render('tag_form', {
    title: "Edit Tag",
    tag: tag,
    errors: undefined,
  });
});

/* Tag Update Post */
exports.tag_update_post = [
  body("name", "Tag must not be empty.").trim().isLength({ min: 3 }).escape(),

  // Check if theres are name collissions.
  asyncHandler(async (req, res, next) => {
    const tagByName = await TagModel.findOne({ name: req.body.name }).exec();
    const tagById = await TagModel.findById(req.params.id).exec();

    // Was an edit actually done to the tag?
    if (tagById?.name == req.body.name) {
      res.render('tag_form', {
        title: "Edit Tag",
        errors: [{ msg: `\"${req.body.name}\" tag: no edits made.`}],
        tag: tagById,
      });
      return;
    }

    if (tagByName?.name == req.body.name) {
      res.render('tag_form', {
        title: "Edit Tag",
        errors: [{ msg: `\"${req.body.name}\" tag alreay exists.` }],
        tag: tagById,
      });
      return;
    }
    next();
  }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // Create a tag object based on parameters passed.
    const tag = new TagModel({
      name: req.body.name,
      _id: req.params.id, // This is required, or a new ID will be assigned!
    });

    if(!errors.isEmpty()) {
      res.render('tag_form', {
        title: "Edit Tag",
        errors: errors.array(),
        tag: tag,
      });
      return;
    } else {
      // Update the Tag with our contents, return that Tag object to a variable.
      const updatedTag = await TagModel.findByIdAndUpdate(req.params.id, tag, {});
      // Rediret to tag detail.
      res.redirect(updatedTag.url);
    }
  }),
];

/* Tag Delete Get */
exports.tag_delete_get = asyncHandler(async (req, res, next) => {
  const tag = await TagModel.findById(req.params.id).exec();
  res.render('tag_delete', {
    title: "Delete Tag",
    tag: tag,
  });
});

/* Tag Delete Post */
exports.tag_delete_post = asyncHandler(async (req, res, next) => {
  // Make sure that no Activites exist which use the requested tags.
  const tag = await TagModel.findById(req.params.id).exec();
  const activities = await ActivityModel.find({ tag: req.params.id }).exec();

  // Checks if there exist Activities with this Tag.
  if (activities.length != 0) {
    res.render('tag_delete', {
      title: "Delete Tag",
      tag: tag,
      activities: activities,
      errors: `Please remove the \"${tag.name}\" tag from the following Activities:`,
    });
    return;
  } else {
    // If no activities, then delete tag and redirect to tag list.
    await TagModel.findByIdAndDelete(req.params.id).exec();
    res.redirect('/tags/');
  }
});

/* Tag Detail */
exports.tag_detail = asyncHandler(async (req, res, next) => {
  const [tag, activities] = await Promise.all([
    TagModel.findById(req.params.id).exec(),
    ActivityModel.find({ tag: req.params.id }).exec(),
  ])
  res.render('tag_detail', {
    title: `Tag: ${tag.name}`,
    tag: tag,
    activities: activities,
  })
});
