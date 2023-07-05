const mongoose = require("mongoose");

const connectDatabase = () => {
  console.log("wait connect to the database");

  mongoose
    .connect(
      "mongodb+srv://nicolasreissanto:<password>@breakingnews.rtlzlmf.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch((error) => console.log(error));
};

module.exports = connectDatabase;
