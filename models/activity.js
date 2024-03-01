const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  tag: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
});

// Virtual for Activity URL
ActivitySchema.virtual("url").get(function() {
  // We don't use an arrow function as we'll need the 'this' object
  return `/activities/${this._id}`;
});

// Export model
module.exports = mongoose.model("Activity", ActivitySchema);
