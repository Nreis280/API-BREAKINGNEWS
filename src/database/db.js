import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("wait connect to the database");

  mongoose
    .connect(
      "mongodb+srv://nicolasreissanto:Nr260104@breakingnews.rtlzlmf.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch((error) => console.log(error));
};

export default connectDatabase;
