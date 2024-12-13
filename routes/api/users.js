const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.post("/", async (req, res) => {
  const userObj = {
    Fname: req.body.fname,
    Lname: req.body.lname,
  };
  const user = new User(userObj);
  await user.save();
  res.status(201).json(user);
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
router.get("/:id", async(req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if(user) {
      res.json(user);
    } else {
      res.status(404).json({message: "User not found."});
    }
  } catch(error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = router;