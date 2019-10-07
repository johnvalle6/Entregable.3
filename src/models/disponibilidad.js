const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DisponibleShema = new Schema({
  sencilla: {
    type: Number
  },
  dobles: {
    type: Number
  },
  vip: {
    type: Number
  },

  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("dispobibles", DisponibleShema);
