const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const router = require("./routes/routes");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const user = [];  

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173', // or whatever port your React app is running on
  methods: ['GET', 'POST'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
connectDB();  

// At the top of your index.js, add this middleware before your routes
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});



app.get("/", (req, res) => {  
  res.send("Hello World!");
});

app.use("/api", router);


app.listen(port, () => {
  console.log(`Server is Starting at  http://localhost:${port}`);
});
