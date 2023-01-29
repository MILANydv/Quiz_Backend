const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/auth-guard");
const Institute = require("../models/instituteModel");
const DOMAIN = "http://127.0.0.1:5000/";

/**
 * @description To Create a new institute
 * @api /institute/api/V1/create-institute
 * @access Private
 * @type POST
 */

router.post("/create-institute", userAuth, async (req, res) => {
  try {
    const { name, description, location } = req.body;

    // Check if the institute already exists, check by name and location
    let newInstitute = await Institute.findOne({ name, location });
    if (newInstitute) {
      return res.status(400).json({
        message: "Institute already exists",
        success: false,
      });
    }

    // create admins array
    const AddedAdmins = [];
    AddedAdmins.push(req.user._id);

    // Create a new institute
    newInstitute = new Institute({
      name,
      description,
      location,
      admins: AddedAdmins,
    });

    // Save the institute
    await newInstitute.save();

    // Send the response
    res.status(200).json({
      message: "Institute created successfully",
      success: true,
      newInstitute,
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
