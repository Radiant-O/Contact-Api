const express = require("express");
const { createUser, loginUser, getUser } = require("../controllers/userController");

const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler");

router.post("/register", createUser);

router.post("/login", loginUser);

router.get("/current", validateToken, getUser, );

// router.get("/register", (req, res) => {
//     res.json({ message: "Get registered users"});
// });

// router.put("/register/:id", (req, res) => {
//     res.json({ message: `Update user info ${req.params.id}`});
// });

// router.get("/register", (req, res) => {
//     res.json({ message: "Get registered users"});
// });

module.exports = router