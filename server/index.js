const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const router = require("./routes/routes");

const user = [];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  const existingUser = user.find(user => user.email === email);
  if(existingUser){
    return res.status(400).send("User already exists");
  }

  
  console.log("Received sign-up data:", {
    username,
    email,
    password,
  });

  res.status(200).json({ message: "Sign-up successful" });
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is Starting at  http://localhost:${port}`);
});
