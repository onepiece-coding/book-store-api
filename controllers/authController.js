const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");

/**
 * @desc Register New User
 * @route /api/auth/register
 * @method POST
 * @access public
 */
module.exports.registerUser = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ messag: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ messag: "This user is already registered!" });
  }

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  const registeredUser = await user.save("-password");
  // const token = jwt.sign(
  //   { id: user._id, isAdmin: user.isAdmin },
  //   process.env.JWT_SECRET_KEY,
  //   {
  //     expiresIn: "1h",
  //   }
  // );
  const token = user.generateToken();

  const { password, ...others } = registeredUser._doc;

  res.status(201).json({ ...others, token });
});

/**
 * @desc Login User
 * @route /api/auth/login
 * @method POST
 * @access public
 */
module.exports.loginUser = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ messag: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ messag: "Invalid Email Or Password!" });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    res.status(400).json({ messag: "Invalid Email Or Password!" });
  }

  // const token = jwt.sign(
  //   { id: user._id, isAdmin: user.isAdmin },
  //   process.env.JWT_SECRET_KEY,
  //   {
  //     expiresIn: "1h",
  //   }
  // );
  const token = user.generateToken();
  const { password, ...others } = user._doc;

  res.status(200).json({ ...others, token });
});

// module.exports = {
//   registerUser,
//   loginUser,
// };
