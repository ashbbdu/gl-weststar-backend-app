const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
module.exports.signup = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(411).json({
        success: false,
        msg: "User already exist",
      });
    }
    if (!email || !firstName || !lastName || !password) {
      return res.status(411).json({
        success: false,
        msg: "Please fill the required fields",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userCreation = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    userCreation.password = "";
    return res.status(200).json({
      msg: "User created successfully !",
      user: userCreation,
    });
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      success: false,
      msg: "Something went wrong !",
    });
  }
};

module.exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(413).json({
        message: "User with this email does not exist !",
      });
    }

    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user._id,
    };

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      user.password = undefined;
      user.token = token;
      return res.status(200).json({
        message: "Logged in successfully !",
        user,
        token,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(404).json({
        success: false,
        msg: "Something went wrong !",
      });   
  }
};
