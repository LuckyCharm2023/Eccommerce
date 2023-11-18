const { Product } = require("../models/products");
const cloudinary = require("../utils/cloudinary");

exports.createProduct = async (req, res, next) => {
  const { title, price, description, image, spec, rating } = req.body;
  try {
    if (
      title !== "" &&
      price !== "" &&
      description !== "" &&
      image !== "" &&
      spec !== "" &&
      rating
    ) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "products",
      });

      const data = new Product({
        image: uploadRes,
        title,
        price,
        description,
        spec,
        rating,
      });

      const savedImage = await data.save();

      res.status(200).json({ status: "ok", data: savedImage });
    }
  } catch (error) {
    next(error);
  }
};
