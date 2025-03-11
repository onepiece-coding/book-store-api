const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.log("Connection Failed MongoDB!", error);
  }
}

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("Connected to MongoDB..."))
//   .catch((error) => console.log("Connection Failed MongoDB!", error));

module.exports = connectToDB;
