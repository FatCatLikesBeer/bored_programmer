const TagModel = require('../models/tags.js');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

/* Tag List */
exports.tag_list = asyncHandler(async (req, res, next) => {
  const allTags = await TagModel.find().sort({ name: 1 }).exec();
  res.render('tag_list', {
    title: 'List of Tags',
    tags: allTags ,
  });
});

/* Tag Create GET */
exports.tag_create_get = (req, res, next) => {
  res.render('tag_form', { title: "Create Tag" });
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
  res.send(`TAG UPDATE <b>GET</b>: Not yet implemented <br><br><h1>${req.params.id}</h1>`);
});

/* Tag Update Post */
exports.tag_update_post = asyncHandler(async (req, res, next) => {
  res.send(`TAG UPDATE <b>POST</b>: Not yet implemented <br><br><h1>${req.params.id}</h1>`);
});

/* Tag Delete Get */
exports.tag_delete_get = asyncHandler(async (req, res, next) => {
  res.send(`TAG DELETE <b>GET</b>: Not yet implemented <br><br><h1>${req.params.id}</h1>`);
});

/* Tag Delete Post */
exports.tag_delete_post = asyncHandler(async (req, res, next) => {
  res.send(`TAG DELETE <b>POST</b>: Not yet implemented <br><br><h1>${req.params.id}</h1>`);
});

/* Tag Detail */
exports.tag_detail = asyncHandler(async (req, res, next) => {
  const tag = await TagModel.findById(req.params.id).exec();
  res.render('tag_detail', {
    title: `Tag: ${tag.name}`,
    tag: tag,
  })
});
