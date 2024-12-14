const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    Fname: {
      type: String,
    },
    Lname: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", UserSchema);
