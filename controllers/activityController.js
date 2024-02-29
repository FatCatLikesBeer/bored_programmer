const ActivityModel = require('../models/activity.js');
const TagModel = require('../models/tags.js');
const CatgoryModel = require('../models/categories.js');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

/* Activity List GET */
exports.activity_list = asyncHandler(async (req, res, next) => {
  res.render('activity_list', {
    title: "List of Activites",
  })
});

/* Activity Create GET */
exports.activity_create_get = asyncHandler(async (req, res, next) => {
  const [allCategories, allTags] = await Promise.all([
    CatgoryModel.find().sort({ name: 1 }).exec(),
    TagModel.find().sort({ name: 1 }).exec(),
  ]);
  const myCategory = await CatgoryModel.findById("65defa868e9fe55c9df1e303").populate("name").exec();
  const myTag = await TagModel.findById("65dc69e2c0d3bb3daec5a3a1").populate("name").exec();
  const activity = new ActivityModel({
    name: "New Activity",
    description: "Brief description",
    category: myCategory,
    tag: myTag,
  });
  res.render('activity_form', {
    title: "Create Activity",
    allCategories: allCategories,
    allTags: allTags,
    activity: activity,
  });
});

/* Activity Create POST */
exports.activity_create_post = asyncHandler(async (req, res, next) => {
  //res.send("Activity Create POST: Not yet implemented <br><br><h1>id</h1>");
  res.render('activity_detail', {
    title: "Activity Detail",
    todo: "This page has not yet been implemented",
  });
});

/* Activity Update GET */
exports.activity_update_get = asyncHandler(async (req, res, next) => {
  // res.send(`Activity Update GET: Not yet implemented <br><br><h1>${req.params.id}</h1>`);
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
  res.render('activity_detail', {
    title: "Activity Detail",
    todo: "This page has not yet been implemented",
  })
});
