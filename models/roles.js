"use strict";

const mongoose = require("mongoose");

let roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

let Role = mongoose.model("Role", roleSchema);

module.exports = Role;
