const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
})

// Export model
module.exports = mongoose.model("Tag", TagSchema);
