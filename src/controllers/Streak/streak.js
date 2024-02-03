const { verifyToken } = require("../../middlewares/VerifyToken");
const { SearchModel } = require("../../models/Search");
const { SignUpModel } = require("../../models/User");
// const moment = require("moment");
// implemented
//
const getStreaks = async (req, res) => {
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

      const particularSearch = await SearchModel.findOne({ email: user.email });
      const array = particularSearch?.searchs;

      // sort the array in descending order // not necessary as of now

      if (!array || array.length === 0) {
        return res.status(200).json({ streak: 0 });
      }

      let streak = 0;
      let largestDay;

      for (let i = array.length - 1; i >= 0; i--) {
        if (i === array.length - 1) {
          const date = array[i].time;
          const extractedDay = date.split(" ")[0].split("-")[0];
          largestDay = extractedDay;
        } else {
          const currentDatesDay = array[i].time.split(" ")[0].split("-")[0];
          console.log(currentDatesDay);

          if (largestDay - currentDatesDay === 1) {
            streak++;
            largestDay = currentDatesDay;
          } else {
            continue;
          }
        }
      }

      return res.status(200).json({ streak });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "server error" });
    }
  });
};

module.exports = {
  getStreaks,
};
