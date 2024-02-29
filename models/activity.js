const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  tag: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
});

// Export model
module.exports = mongoose.model("Activity", ActivitySchema);
