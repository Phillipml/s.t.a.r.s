require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const swagger = require("./swagger");

const app = express();
app.use(express.json());
swagger(app);
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

/**
 * @openapi
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Email already registered
 */
app.post("/api/register", async (req, res) => {
  const { email, username, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, username, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: "User created successfully" });
});

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Login and get an access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid email or password
 */
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

  const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "1h" });
  res.json({ token });
});

/**
 * @openapi
 * /api/user:
 *   get:
 *     summary: Get the current user
 *     responses:
 *       200:
 *         description: Successful retrieval of the user
 *       401:
 *         description: Unauthorized access
 */
app.get("/api/user", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, jwtSecret);
    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ username: user.username });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized access" });
  }
});

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users from the database
 *     responses:
 *       200:
 *         description: Successful retrieval of all users
 */
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve users from the database" });
  }
});

/**
 * @openapi
 * /api/user/{username}:
 *   delete:
 *     summary: Delete a user by username
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
app.delete("/api/user/:username", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the user" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
