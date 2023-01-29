const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/auth-guard");
const Group = require("../models/groupModel");
const Institute = require("../models/instituteModel");
const DOMAIN = "http://127.0.0.1:5000/";

/**
 * @description To Create a new Group
 * @api /group/api/V1/create-group
 * @access Private
 * @type POST
 */

router.post("/create-group", userAuth, async (req, res) => {
  try {
    const { name, description, institute } = req.body;

    // Check if the group already exists, check by name and institute

    let newGroup = await Group.findOne({ name, institute });
    if (newGroup) {
      return res.status(400).json({
        message: "Group already exists",
        success: false,
      });
    }

    // Check if the institute exists
    const instituteExists = await Institute.findById(institute);
    if (!instituteExists) {
      return res.status(400).json({
        message: "Institute does not exists",
        success: false,
      });
    }

    // create admins array
    const AddedAdmins = [];
    AddedAdmins.push(req.user._id);

    // Create a new group
    newGroup = new Group({
      name,
      description,
      institute,
      admins: AddedAdmins,
    });

    // Save the group
    await newGroup.save();

    let instituteGroups = instituteExists.groups;
    instituteGroups.push(newGroup._id);
    await Institute.findByIdAndUpdate(institute, {
      groups: instituteGroups,
    });

    // Send the response
    res.status(200).json({
      message: "Group created successfully",
      success: true,
      newGroup,
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
