const { verifyToken } = require("../../middlewares/VerifyToken");
const { SearchModel } = require("../../models/Search");
const { SignUpModel } = require("../../models/User");
const moment = require("moment");

// payload: feelingID, taskID

const markTaskAsSolved = async (req, res) => {
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

      const seatrchForLoggedInUser = await SearchModel.findOne({
        email: user.email,
      });

      const { feelingID } = req.body;
      if (!feelingID) {
        return res.status(400).json({
          error: "feeling id missing",
        });
      }
      const allFeelings = seatrchForLoggedInUser.searchs;
      let thatParticualrFeeling;
      for (let i = 0; i < allFeelings.length; i++) {
        if (allFeelings[i]._id.toString() === feelingID.toString()) {
          thatParticualrFeeling = allFeelings[i];
        }
      }

      let { taskID } = req.body;
      if (!taskID) {
        return res.status(400).json({ error: "taskID missing" });
      }
      taskID = taskID?.trim().toString();
      const indiTask = thatParticualrFeeling.tasks;
      let thatParticularFeelingTask;
      for (let j = 0; j < indiTask.length; j++) {
        if (indiTask[j].uniqueID.toString() === taskID) {
          thatParticularFeelingTask = indiTask[j];
        }
      }

      if (thatParticularFeelingTask.isCompleted === false) {
        thatParticularFeelingTask.isCompleted = true;
        thatParticularFeelingTask.time = moment
          .tz("Asia/Kolkata")
          .format("DD-MM-YY h:mma");
        await seatrchForLoggedInUser.save();
      } else {
        console.log("already marked as solved");
      }

      return res.status(200).json({ success: true, thatParticularFeelingTask });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "server side error" });
    }
  });
};

module.exports = {
  markTaskAsSolved,
};
