const express = require("express");

const app = express();
const userRoutes = require("./routes/User");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();
const database = require("./config/database");
const PORT = process.env.PORT || 5000;
database.connect();

app.use(express.json());

app.use(
    cors({
      origin: JSON.parse(process.env.CORS_ORIGIN)
    })
  );
  

  app.use("/api/v1/auth", userRoutes);

  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Welcome to the API",
    });
  });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  