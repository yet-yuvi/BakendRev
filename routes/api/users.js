const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

// Create a user
router.post("/", async (req, res) => {
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const userObj = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: hash,
    };

    const user = new User(userObj);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email is already registered2." });
    }

    res.status(500).json({ message: "Something went wrong." });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

// Get one user
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

// Update one user
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userUpdate = req.body;
    const newUser = await User.findByIdAndUpdate(id, userUpdate, { new: true });
    if (newUser) {
      res.json(newUser);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await User.findByIdAndDelete(id);
    if (deleteUser) {
      res.json({ message: "User has been deleted." });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

// Delete all users
router.delete("/", async (req, res) => {
  try {
    const deleteAllUsers = await User.deleteMany({});
    res.json({
      message: "All users have been deleted.",
      deletedCount: deleteAllUsers.deletedCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = router;
