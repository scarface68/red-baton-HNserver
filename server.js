const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connection established"))
  .catch((err) => console.log("MongoDB connection error: ", err));

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
