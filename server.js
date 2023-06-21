require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3001;
const dbConnect = process.env.DB_URL;
const jwtSecret = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

mongoose.connect(dbConnect, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

app.post("/api/register", async (req, res) => {
  const { email, username, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email Already Registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, username, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: "User Created Successfully" });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  app.get("/api/user", async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, jwtSecret);
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ username: user.username });
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  });

  const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "1h" });
  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
