const { Schema, model } = require("mongoose");

const ProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },

    phone: {
      type: String,
    },

    address: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true }
);

const Profile = model("profile", ProfileSchema);
module.exports = Profile;
