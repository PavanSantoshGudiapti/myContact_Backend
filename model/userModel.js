const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      require: [true, "Please add the user name"],
    },
    email: {
      type: String,
      require: [true, "Please add the user email address"],
      unique: [true, "email address already taken"],
    },
    password: {
      type: String,
      require: [true, "please add the user address"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("userSchema", userSchema);
