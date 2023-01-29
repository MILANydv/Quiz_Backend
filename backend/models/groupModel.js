const { Schema, model } = require("mongoose");

const GroupSchema = new Schema(
  {
    institute: {
      type: Schema.Types.ObjectId,
      ref: "institute",
    },
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
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    admins: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    quiz: [
      {
        type: Schema.Types.ObjectId,
        ref: "quiz",
      },
    ],
    // if the status is false, the group is only accessible to the paid users / monthly subscribers
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Group = model("group", GroupSchema);
module.exports = Group;
