require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const app = express();

// Parse request from body JSON
app.use(bodyParser.json());

// Connect with mongoDB
connectDB();

//Routes
app.use("/api/users", require("./routes/api/users"));

// Define a simple route
app.get("/", (req, res) => {
  res.json({ massage: "WElcome to my application" });
});

// Start the Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
