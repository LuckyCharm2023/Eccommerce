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
