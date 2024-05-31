import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "./model/model.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { body, validationResult } from "express-validator";
import nodemailer from "nodemailer";

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

mongoose
  .connect("mongodb://localhost:27017/login-mine", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Database"))
  .catch((error) => console.log("Couldn't Connect to Database", error));

const SECRET_KEY = "your_secret_key"; // Use a strong secret key
const RESET_SECRET_KEY = "your_reset_secret_key"; // Separate secret key for password reset

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "archywilliams2@gmail.com",
    pass: "kfsr ntuc uzkg wnen",
  },
});

const generateToken = (user, secret, expiresIn = "1h") => {
  return jwt.sign({ userId: user._id, email: user.email }, secret, {
    expiresIn,
  });
};

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

app.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: "Email already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      const token = generateToken(newUser, SECRET_KEY);
      res.status(201).json({ message: "Signup successful!", token });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      const token = generateToken(user, SECRET_KEY);
      res.json({
        message: "Success",
        token,
        userId: user._id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.post(
  "/forgot",
  [body("email").isEmail().withMessage("Valid email is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const resetToken = generateToken(user, RESET_SECRET_KEY, "15m");
      const resetLink = `http://localhost:5173/reset/${resetToken}`;

      const mailOptions = {
        from: "your_email@gmail.com",
        to: email,
        subject: "Password Reset",
        text: `Click the link to reset your password: ${resetLink}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ message: "Error sending email" });
        } else {
          console.log("Email sent:", info.response);
          return res.json({
            message: "success",
            userId: user._id,
            email: user.email,
          });
        }
      });
    } catch (error) {
      console.error("Error during forgot password:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.put(
  "/reset",
  [
    body("token").notEmpty().withMessage("Token is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token, password } = req.body;

    try {
      const decoded = jwt.verify(token, RESET_SECRET_KEY); // Verify the token
      console.log("Decoded token:", decoded); // Log the decoded token

      const user = await UserModel.findById(decoded.userId); // Find the user by ID
      console.log("User found:", user); // Log the user found

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const hashedPassword = await bcrypt.hash(password, 10); // Hash the new password
      user.password = hashedPassword;
      await user.save(); // Save the new password

      res.json({ message: "success" }); // Respond with success
    } catch (error) {
      console.error("Error during reset password:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: `Hello ${req.user.email}, welcome to the protected route!`,
  });
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
