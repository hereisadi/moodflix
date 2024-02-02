const { verifyToken } = require("../../middlewares/VerifyToken");
const { SearchModel } = require("../../models/Search");
const { SignUpModel } = require("../../models/User");

const dashboard = async (req, res) => {
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
      const { name, email, phone, age, gender } = user;
      // get all searchs made by the user
      const searches = SearchModel.find({ email: user.email });

      return res.status(200).json({
        name,
        email,
        age,
        gender,
        phone,
        searches,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        error: "server error",
      });
    }
  });
};

module.exports = {
  dashboard,
};
