/* eslint-disable camelcase */
const { verifyToken } = require("../../middlewares/VerifyToken");
const { SearchModel } = require("../../models/Search");
const { SignUpModel } = require("../../models/User");
const moment = require("moment-timezone");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

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

      const seatrchForLoggedInUser = await SearchModel.findOne({
        email: user.email,
      });

      if (!seatrchForLoggedInUser) {
        return res.status(404).json({ error: "Not found" });
      }

      // console.log(seatrchForLoggedInUser);
      let { text } = req.body;
      text = text?.trim().toString();
      if (!text) {
        return res.status(400).json({ error: "payload missing" });
      }
      const fastApiUrl = "127.0.0.1:8000";
      let feelingResponse;
      await axios.post(fastApiUrl, { input_text: text }).then((res) => {
        feelingResponse = res;
      });
      const currentTime = moment.tz("Asia/Kolkata").format("DD-MM-YY h:mma");

      // use the model to find the feeling and update the same
      const tasksList = [];
      if (feelingResponse === "happy") {
        tasksList.push("task1");
        tasksList.push("task2");
        tasksList.push("task3");
        tasksList.push("task4");
        tasksList.push("task5");
      } else if (feelingResponse === "sad") {
        tasksList.push("task1");
        tasksList.push("task2");
        tasksList.push("task3");
        tasksList.push("task4");
        tasksList.push("task5");
      } else if (feelingResponse === "angry") {
        tasksList.push("task1");
        tasksList.push("task2");
        tasksList.push("task3");
        tasksList.push("task4");
        tasksList.push("task5");
      } else if (feelingResponse === "anxious") {
        tasksList.push("task1");
        tasksList.push("task2");
        tasksList.push("task3");
        tasksList.push("task4");
        tasksList.push("task5");
      } else if (feelingResponse === "more") {
        tasksList.push("task1");
        tasksList.push("task2");
        tasksList.push("task3");
        tasksList.push("task4");
        tasksList.push("task5");
      }

      const task1 = tasksList[0];
      const task2 = tasksList[1];
      const task3 = tasksList[2];
      const task4 = tasksList[3];
      const task5 = tasksList[4];

      const tasksToEnter = [
        {
          uniqueID: uuidv4(),
          taskName: task1,
          isCompleted: false,
        },
        {
          uniqueID: uuidv4(),
          taskName: task2,
          isCompleted: false,
        },
        {
          uniqueID: uuidv4(),
          taskName: task3,
          isCompleted: false,
        },
        {
          uniqueID: uuidv4(),
          taskName: task4,
          isCompleted: false,
        },
        {
          uniqueID: uuidv4(),
          taskName: task5,
          isCompleted: false,
        },
      ];

      const search = {
        textSerched: text,
        time: currentTime,
        feelingResponse,
        tasks: tasksToEnter,
      };
      // console.log(search);
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
