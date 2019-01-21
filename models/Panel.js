const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PanelSchema = new Schema({
  stackOrder: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  widget: { type: Number, default: 0 },
  links: [ { type: Schema.Types.ObjectId, ref: "Link" } ]
});

const Panel = mongoose.model("Panel", PanelSchema);

module.exports = Panel;