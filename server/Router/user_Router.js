const express = require("express")
const app=express();
const router=express.Router();
const userController=require("../Controllers/userController")
const validate =require("../Middlewares/validate-middleware")

const {signupSchema, loginSchema}=require("../Validators/validator")
router.route("/login").post(validate(loginSchema), userController.login)
router.route("/register").post(validate(signupSchema),userController.register);
router.route("/forgot_password").post(userController.forgotPassword)
router.route("/reset_password/:id/:token").post(userController.resetPassword)
router.route("/verify_email/:id").patch(userController.updateVerifyUser)
router.route("/updateProfile/:id").patch(userController.upload,userController.addProfileImg)
router.route("/getProfileImg/:id").get(userController.getProfile)
router.route("/getAllUserDetail").get(userController.getAllUserDetail)
router.route("/deleteUser/:id").delete(userController.deleteUser)
router.route("/updatePassword/:id").patch(userController.changePass)
router.route("/search/:key").get(userController.search)
router.route("/sortAsc").get(userController.sortAsc)
router.route("/sortdesc").get(userController.sortDesc)
router.route("/oneUserDetail/:id").get(userController.getSingleDetail)
router.route("/updateUser/:id").patch(userController.upload,userController.updateUser)




module.exports=router;