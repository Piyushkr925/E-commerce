const express = require("express");
const db = require("../Db/index");
const Product = db.product;
const Category = db.category;
const multer = require("multer");
const path = require("path");
const { Op } = require("sequelize");
const app = express();
app.use("/images", express.static("/server/Images"));

//POST API for Add Product
const addProduct = async (req, res) => {
  try {
    let addProduct = {
      BrandName: req.body.BrandName,
      Rating: req.body.Rating,
      ProductImage: req.file.path,
      Price: req.body.Price,
      Type: req.body.Type,
      ProductDescription: req.body.ProductDescription,
      categoryId: req.body.categoryId,
    };
    const product = await Product.create(addProduct);
    res.status(200).send({ data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Store Image Function
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

//Upload Image Function
const upload = multer({
  storage: storage,
  limits: { fileSize: "10000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("ProductImage");

//GET API for get all Product
const allProducts = async (req, res) => {
  try {
    const data = await Product.findAll();
    res.status(200).json({ data: data });
    console.log(data);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

//Search API for search Product by BrandName
const search = async (req, res) => {
  try {
    const data = await Product.findAll({
      include: [{ model: Category }],
      where: {
        BrandName: {
          [Op.regexp]: req.params.key,
        },
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//GET API for get all Product and Category
const productCaategory = async (req, res) => {
  try {
    const data = await Product.findAll({
      include: [{ model: Category }],
    });
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server error" });
  }
};

//DELETE API for delete Product OneByOne
const deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    const product = await Product.destroy({ where: { id: id } });

    res.status(200).send({ msg: "Product is deleted", product });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

//GET API for get Product and Category OneByOne
const getProductDetails = async (req, res) => {
  try {
    let result = await Product.findOne({
      include: [{ model: Category }],
      where: { id: req.params.id },
    });
    if (result) {
      res.status(200).send({ msg: "Product is found", result });
    } else {
      res.send({ result: "No Record Found." });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

//UPDATE API for update Product and Category
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = {
      BrandName: req.body.BrandName,
      Rating: req.body.Rating,
      ProductImage: req.file ? req.file.path : "", // Assuming 'ProductImage' is the field for the image path
      Price: req.body.Price,
      Type: req.body.Type,
      ProductDescription: req.body.ProductDescription,
      categoryId: req.body.categoryId,
    };

    const [rowsUpdated] = await Product.update(updatedProduct, {
      where: { id: req.params.id },
    });
    if (rowsUpdated > 0) {
      res.status(200).json({ data: rowsUpdated });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Sorting Price In Ascending(LowToHigh) Order
const sortAsc = async (req, res) => {
  const data = await Product.findAll({
    include: [{ model: Category }],
    order: [["Price", "ASC"]],
  });
  res.status(200).json({ data: data });
};

//Sorting Price In Descending(HighToLow) Order
const sortDesc = async (req, res) => {
  const Data = await Product.findAll({
    include: [{ model: Category }],
    order: [["Price", "DESC"]],
  });
  res.status(200).json({ Data: Data });
};



//Export All Product API Function
module.exports = {
  addProduct,
  allProducts,
  upload,
  search,
  productCaategory,
  deleteProduct,
  getProductDetails,
  updateProduct,
  sortAsc,
  sortDesc,
};
