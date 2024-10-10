const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports.auth = async (req, res, next) => {

  try {
    const token =
      (req.cookies && req.cookies.token) ||
      (req.body && req.body.token) ||
      (req.header("Authorization") &&
        req.header("Authorization").replace("Bearer ", ""));

    if (!token) {
      return res.status(401).json({ success: false, message: `Token Missing` });
    }

    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode, "decode");
      req.user = decode;
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Token is invalid" });
    }

    next();
  } catch (error) {
    console.log(error, "errro");

    return res.status(401).json({
      success: false,
      message: `Something Went Wrong While Validating the Token`,
    });
  }
};
