const express = require("express")
const app=express();
const router=express.Router();
const productController=require("../Controllers/productControllers")

router.route("/addProduct").post(productController.upload, productController.addProduct)
router.route("/allProduct").get(productController.allProducts)
router.route("/search/:key").get(productController.search)
router.route("/productCategory").get(productController.productCaategory)
router.route("/deleteProduct/:id").delete(productController.deleteProduct)
router.route("/productDetail/:id").get(productController.getProductDetails)
router.route("/updateProduct/:id").patch(productController.upload,productController.updateProduct)
router.route("/sortAsc").get(productController.sortAsc)
router.route("/sortdesc").get(productController.sortDesc)


module.exports=router;