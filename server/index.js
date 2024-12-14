const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const router = require("./routes/routes");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const user = [];  

app.use(cors());
app.use(express.json());


connectDB();  



app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is Starting at  http://localhost:${port}`);
});
