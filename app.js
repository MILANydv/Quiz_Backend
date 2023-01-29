// requirements for express application
const express = require("express");

require("dotenv").config();
require("./Database/conf");
const cors = require("cors");
const join = require("path").join;
const bodyParser = require("body-parser");
const json = bodyParser.json;
const userRouter = require("./apis/UserApi");
const profileRouter = require("./apis/ProfileApi");
const instituteRouter = require("./apis/InstituteApi");
const groupRouter = require("./apis/groupApi");
const quizRouter = require("./apis/quizApi");
const passport = require("passport");

// Import passport middleware
require("./middlewares/passport-middleware");
// Initialize express application
const app = express();

// Apply Application Middlewares
app.use(cors());
app.use(json());
//app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));


app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/uploads", express.static(__dirname + "/uploads")); // so please use this code to fetch images form the server
app.use("/uploads", express.static("uploads"));
// Inject Sub router and apis
app.use("/user/api/V1", userRouter);
app.use("/profile", profileRouter);
app.use("/institute/api/V1", instituteRouter);
app.use("/group/api/V1", groupRouter);
app.use("/quiz/api/V1", quizRouter);


// fro Linked In Auth

// --------------------------DEVELOPMENT------------------------------

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on PORT ${process.env.PORT}`)
);
