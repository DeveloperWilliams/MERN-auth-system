import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserModel from "./model/model.js";
import bcrypt from "bcrypt";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/login-mine")
  .then(() => console.log("Connected to DataBase"))
  .catch((error) => console.log("Couldn't Connect to DataBase", error));

app.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };

    await UserModel.create(newUser);

    res.json("Success");
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.json("Success");
      } else {
        res.json("Incorrect");
      }
    } else {
      res.json("NotFound");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = 8080;

app.listen(port, () => {
  console.log("Server Listening on 8080");
});
