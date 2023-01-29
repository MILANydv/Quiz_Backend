const { Schema, model } = require("mongoose");

const QuestionsSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    //  only four options are allowed
    options: [
      {
        type: String,
        required: true,
      },
    ],
    answer: {
      type: String,
      required: true,
    },
    // if the status is false, the question is not valid or is wrong
    status: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      required: true,
    },
    // user selected option
    selectedOption: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Question = model("question", QuestionsSchema);
module.exports = Question;
