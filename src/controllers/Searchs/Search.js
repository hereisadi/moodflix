const { verifyToken } = require("../../middlewares/VerifyToken");
const { SearchModel } = require("../../models/Search");
const { SignUpModel } = require("../../models/User");
const moment = require("moment-timezone");

const searchsMade = async (req, res) => {
  verifyToken(req, res, async () => {
    try {
      const userId = req.user.userId;
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const user = await SignUpModel.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const seatrchForLoggedInUser = await SearchModel.find({
        email: user.email,
      });

      if (!seatrchForLoggedInUser) {
        return res.status(404).json({ error: "Not found" });
      }

      console.log(seatrchForLoggedInUser);
      let { text } = req.body;
      text = text?.trim().toString();
      if (!text) {
        return res.status(400).json({ error: "payload missing" });
      }

      const currentTime = moment.tz("Asia/Kolkata").format("DD-MM-YY h:mma");

      // use the model to find the feeling and update the same
      const feelingResponse = "fdf";

      const search = {
        textSerched: text,
        time: currentTime,
        feelingResponse,
      };

      seatrchForLoggedInUser?.searchs?.push(search);
      await seatrchForLoggedInUser.save();
      return res.status(200).json({ message: "search done", search });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "server error" });
    }
  });
};

module.exports = {
  searchsMade,
};
