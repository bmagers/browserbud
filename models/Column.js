const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ColumnSchema = new Schema({
  stackOrder: {
    type: Number,
    required: true,
    unique: true
  },
  panels: [
    {
      type: Schema.Types.ObjectId,
      ref: "Panel"
    }
  ]
});

const Column = mongoose.model("Column", ColumnSchema);

module.exports = Column;