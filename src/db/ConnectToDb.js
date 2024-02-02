const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    console.log("trying to connect to mongodb...");
    await mongoose.connect(process.env.MONGODBSECRET, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDb database connected");
  } catch (error) {
    console.error(
      `Establishing connection to Database encountered some error: ${error}`
    );
  }
};

module.exports = connectToDb;
