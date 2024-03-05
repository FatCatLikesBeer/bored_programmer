const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const ActivityModel = require('../models/activity.js');

exports.api_random = asyncHandler(async (req, res, next) => {
  // Get Activity with all fields

  // Use .aggregate() to find a random sample of 1 from the ActivityModel.
  await ActivityModel.aggregate([ { $sample: { size: 1 } } ])
  .then(randomDocuments => {
    if (randomDocuments.length > 0) {
      const activity = randomDocuments[0];

      // Populate Tag and Category fields.
      ActivityModel.populate(activity, [
        { path: "tag" },
        { path: "category" },
      ])
        .then(uselessParameter => {
          // The above callback parameter IS NEVER USED?!
          // I don't understand how this is failing correctly?
          // It's because JS objects are passed by reference...

          const tags = activity.tag.map( e => {
            return e.name;
          });

          // Create a new object to get rid of MongoDB artifacts
          // And to easily populate a list of only Tag names.
          const activityParsed = {
            name: activity.name,
            description: activity.description,
            category: activity.category.name,
            tag: [...tags],
          }
          res.send(activityParsed);
        })
        .catch(error => {
          console.error("Error populating fields:", error);
          res.send("Error populating fields:", error);
        });
    } else {
      res.send("No documents found in the collection");
    }
  })
  .catch(error => {
      console.error("Error: ", error);
      res.send("Error: ", error);
    });
});
