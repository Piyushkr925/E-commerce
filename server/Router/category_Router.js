const express = require("express")
const app=express();
const router=express.Router();
const categoryController=require("../Controllers/categoryController")

router.route("/addCategory").post(categoryController.addCategory);
router.route("/getCategory").get(categoryController.getCategory)
router.route("/categoryProd").get(categoryController.categoryProduct)
router.route("/deleteCate/:id").delete(categoryController.deleteCategory)
router.route("/updateCate/:id").patch(categoryController.updateCategory)
module.exports=router;