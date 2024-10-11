const express = require("express");
const dotenv = require("dotenv");
const mySqlPool = require("./config/db");

//config
dotenv.config();

//rest object
const app = express();

//middleware
app.use(express.json());

//routes
app.use("/api/v1/student", require("./routes/studentRoutes"));

app.get("/test", (req, res) => {
  res.status(200).send("<h1>CRUD Operation APIs Using Nodejs & mySql</h1>");
});

//port
const PORT = process.env.PORT || 8080;

// Listen
mySqlPool
  .query("SELECT 1")
  .then(() => {
    //mySql
    console.log("Connected to MySQL database");
    //listen
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
