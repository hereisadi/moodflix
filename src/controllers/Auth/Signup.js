const { SignUpModel } = require("../../models/User");
const { SearchModel } = require("../../models/Search");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../../utils/sendEmail");
const { isEmail } = require("../../middlewares/isEmail");

const signup = async (req, res) => {
  isEmail(req, res, async () => {
    try {
      let { name, email, password, age, gender, phone } = req.body;
      if (!name || !email || !password || !age || !gender || !phone) {
        return res.status(400).json({ error: "payload missing" });
      }
      name = name?.trim().toString();
      email = email?.toLowerCase().trim().toString();
      password = password?.trim().toString();
      age = age?.toString().trim();
      gender = gender?.trim().toString();
      phone = phone?.trim().toString();

      if (password?.length < 8) {
        return res.status(400).json({
          error: "password length should be greater than 8 characters",
        });
      }

      const ifUserExists = await SignUpModel.findOne({ email });
      if (ifUserExists) {
        return res.status(400).json({ error: "user already exists" });
      }

      const hash = await bcrypt.hash(password, 10);

      const user = new SignUpModel({
        name,
        email,
        password: hash,
        phone,
        gender,
        age,
      });

      const searchForUser = new SearchModel({
        email,
        searchs: [],
      });
      await user.save();
      await searchForUser.save();

      sendEmail(
        email,
        "Welcome to Moodflix",
        `Hello ${name}, Welcome to Moodflix. We are glad to have you on board.`
      );

      return res.status(200).json({ message: "signup done" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "server error" });
    }
  });
};

module.exports = {
  signup,
};
