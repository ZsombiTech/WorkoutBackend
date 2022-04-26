const express = require("express");
const router = express.Router();

const profileController = require("../controller/profileController");
const Profile = new profileController();

router.post("/setdesc", Profile.setDesc);

router.get("/getProfileData", Profile.getProfileData);

module.exports = router;
