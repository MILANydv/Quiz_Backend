const { Schema, model } = require("mongoose");

const InstituteSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    // the institute can be operated by Admins, and assigns them to the groups
    admins: [
        {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    // the institute can have many
    groups: [
      {
        type: Schema.Types.ObjectId,
        ref: "group",
      },
    ],
    // if the status is false, the institute is only accessible to the paid users
    status: {
      type: Boolean,
      default: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Institute = model("institute", InstituteSchema);
module.exports = Institute;
