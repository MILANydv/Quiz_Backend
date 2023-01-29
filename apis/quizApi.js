const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/auth-guard");
const Group = require("../models/groupModel");
const Institute = require("../models/instituteModel");
const Quiz = require("../models/quizModel");
const DOMAIN = "http://127.0.0.1:5000/";

/**
 * @description To Create a new Quiz
 * @api /group/api/V1/create-quiz
 * @access Private
 * @type POST
 */

router.post("/create-quiz", userAuth, async (req, res) => {
  try {
    const { name, description, group } = req.body;

    // Check if the quiz already exists, check by name and group
    let newQuiz = await Quiz.fingOne({ name, group });
    if (newQuiz) {
      return res.status(400).json({
        message: "Quiz already exists",
        success: false,
      });
    }

    // Check if the group exists

    let groupExists = await Group.findOne({ group });
    if (!groupExists) {
      return res.status(400).json({
        message: "Group does not exists",
        success: false,
      });
    }

    // create Quiz
    newQuiz = new Quiz({
      name,
      description,
      group,
    });

    // Save the quiz
    await newQuiz.save();

    let groupQuizzes = groupExists.quizzes;
    groupQuizzes.push(newQuiz._id);
    Group.findByIdAndUpdate(group, {
      quizzes: groupQuizzes,
    });

    // Send the response

    res.status(200).json({
      message: "Quiz created successfully",
      success: true,
      newQuiz,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
});

module.exports = router;
