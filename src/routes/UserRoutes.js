const express = require("express");
const { home } = require("../controllers/Home/home");
const { signup } = require("../controllers/Auth/Signup");
const { login } = require("../controllers/Auth/Login");
const { dashboard } = require("../controllers/Auth/Dashboard");

const router = express.Router();

router.get("/", home);
router.get("/me", dashboard);

router.post("/signup", signup);
router.post("/login", login);
module.exports = router;
