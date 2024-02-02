const express = require("express");
const { home } = require("../controllers/Home/home");
const { signup } = require("../controllers/Auth/Signup");
const { login } = require("../controllers/Auth/Login");
const { dashboard } = require("../controllers/Auth/Dashboard");
const { searchsMade } = require("../controllers/Searchs/Search");
const { sentimentAnalysis } = require("../controllers/Searchs/Sentiment");
const { botResponse } = require("../controllers/Bot/BotResult");
const { getStreaks } = require("../controllers/Streak/streak");

const router = express.Router();

router.get("/", home);
router.get("/me", dashboard);
router.get("/sentiment", sentimentAnalysis);
router.get("/streak", getStreaks);

router.post("/signup", signup);
router.post("/login", login);
router.post("/search", searchsMade);
router.get("/bot", botResponse);

module.exports = router;
