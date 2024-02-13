const express = require("express");
const db = require("../Db/index");
const Category = db.category;
const Product = db.product;

//POST API of Add Category
const addCategory = async (req, res) => {
  try {
    let addCategory = {
      Category: req.body.Category,
      ProductDescription: req.body.ProductDescription,
    };
    const data = await Category.create(addCategory);
    res.status(200).send({ data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//GET API of All Category Data
const getCategory = async (req, res) => {
  try {
    const data = await Category.findAll();
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

//GET API of OneByOne Category
const categoryProduct = async (req, res) => {
  try {
    const data = await Category.findOne({
      attributes: ["id", "Category"],
      include: [{ model: Product }],
      where: { id: 1 },
    });
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server error" });
  }
};

//DELETE API of OneByOne Category
const deleteCategory = async (req, res) => {
  try {
    let id = req.params.id;
    const product = await Category.destroy({ where: { id: id } });
    res.status(200).send({ msg: "Category is deleted", product });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

//UDATE API of Category 
const updateCategory = async (req, res) => {
  try {
    const { ProductDescription } = req.body;
    const upCategory = await Category.update(
      { Category: req.body.Category, ProductDescription },
      { where: { id: req.params.id } }
    );
    return res.status(200).json({ data: upCategory });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

//Export All Category API Function
module.exports = {
  addCategory,
  getCategory,
  categoryProduct,
  deleteCategory,
  updateCategory,
};
