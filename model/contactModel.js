const { default: mongoose } = require("mongoose");
const mongooes = require("mongoose");

const contactSchema = mongooes.Schema(
  {
    user_id: {
      type: mongooes.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    name: {
      type: String,
      requrire: (true, "please add the contact name"),
    },
    email: {
      type: String,
      requrire: (true, "please add the contact email"),
    },
    phone: {
      type: String,
      requrire: (true, "please add the contact phone"),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contact", contactSchema);
