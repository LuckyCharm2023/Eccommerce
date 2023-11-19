const { LCAuth } = require("../models/auth");
const cloudinary = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET;
exports.registerUser = async (req, res, next) => {
  const { userType, uname, email, password, image } = req.body;
  const encryptedpassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await LCAuth.findOne({
      email,
    });
    if (oldUser) {
      return res.json({ error: "user exists!" });
    }
    if (uname !== "" && email !== "" && password !== "") {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "profilePic",
      });

      const data = new LCAuth({
        image: uploadRes,
        userType,
        email,
        password: encryptedpassword,
        uname,
      });

      const savedImage = await data.save();

      res.status(200).json({ status: "ok", data: savedImage });
    }
  } catch (error) {
    next(error);
  }
};
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await LCAuth.findOne({
      email,
    });

    if (!user) {
      return res.json({ error: "User not Exists" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: "24h",
      });

      return res
        .status(201)
        .send({ status: "ok", useremail: user.email, data: token });
    }
    res.json({ status: "error", error: "Invalid Password" });
  } catch (error) {
    next(error);
  }
};
exports.authentication = async (req, res, next) => {
  const { token } = req.body;
  // console.log(token, "USER");

  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });

    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    await LCAuth.findOne({ email: user.email }).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    next(error);
  }
};
exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await LCAuth.find({});
    res.status(200).json({ status: "ok", data: allUsers });
  } catch (error) {
    next(error);
  }
};
