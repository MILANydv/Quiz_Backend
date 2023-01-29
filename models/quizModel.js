const { Schema, model } = require("mongoose");

const QuizSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "group",
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "question",
      },
    ],
    // if the status is false, the quiz is only accessible to the paid users
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Quiz = model("quiz", QuizSchema);
module.exports = Quiz;
