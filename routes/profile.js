const express = require("express");
const router = express.Router();

const profileController = require("../controller/profileController");
const Profile = new profileController();

router.post("/setdesc", Profile.setDesc);

router.post("/setloc", Profile.setLoc);

router.get("/getProfileData/:userid", Profile.getProfileData);

router.get("/getrandom", Profile.randomNum);

module.exports = router;
