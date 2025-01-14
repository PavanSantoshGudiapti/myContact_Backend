const asyncHandler = require("express-async-handler");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @dec Register a user
// @route api/user/register
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("All fileds are mondatory!");
  }

  const userAvailable = await userModel.findOne({ email });
  console.log("userAvailable", userAvailable);
  if (userAvailable) {
    res.status(400);
    throw new Error("user already registered!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashedPassword", hashedPassword);

  const user = await userModel.create({
    userName,
    email,
    password: hashedPassword,
  });

  console.log(`user createed ${user}`);
  if (user) {
    res.status(201).json({ _id: user._id, email: user.email });
  } else {
    res.status(400);
    throw new Error("user data not vaild");
  }
  res.json({ message: "Register the user" });
});

// @dec login a user
// @route api/user/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All Fields are mondatory!");
  }

  const user = await userModel.findOne({ email });
  // compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          userName: user.userName,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "15m" }
    );

    res.status(201).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password not vaild");
  }
  res.json({ message: "login the user" });
});

// @dec get current user information
// @route api/user/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
