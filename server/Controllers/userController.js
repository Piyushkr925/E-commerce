const db = require("../Db/index");
const User = db.users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const crypto = require("crypto");
const multer = require("multer");
const express = require("express");
const path = require("path");
const app = express();
const { Op } = require("sequelize");
const secretKey=process.env.JWT_SECRET_KEY;
app.use("/images", express.static("/server/Images"));

//POST API for Register Or Add User And Verification Link Send On Email
const register = async (req, res) => {
  try {
    const { username, email, password, isadmin } = req.body;
    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return res.status(400).json({ message: "email already exist" });
    } else {
      //hash the password
      const saltRound = await bcrypt.genSalt(10);
      const hash_password = await bcrypt.hash(password, saltRound);
      const userCreated = await User.create({
        username,
        email,
        password: hash_password,
        isadmin,
        emailToken: crypto.randomBytes(64).toString("hex"),
      });
      if (userCreated) {
        const token = jwt.sign({ userCreated }, secretKey, {
          expiresIn: "2s",
        });
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "piyushkr767676@gmail.com",
            pass: "jjde vygi mntn rmbd",
          },
        });

        var mailOptions = {
          from: "piyushkr767676@gmail.com",
          to: email,
          subject: "Verify Email",
          html: `<!DOCTYPE html>
           <html>
            <body>
              <p>Hello,</p>
              <p>Please Activate Your Account</p>
              <a href="http://192.168.1.172:3000/verify_email/${userCreated.id}/${token}">Click Here to Activate</a>
            </body>
           </html>`,
          // text: `http://localhost:3000/verify_email/${userCreated.id}/${token}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            return res.send({ Status: "Success" });
          }
        });
        res
          .status(200)
          .send({ msg: "registration successful", Token: token, userCreated });
      }
    }
  } catch (error) {
    console.log(error);
    // next(error);
  }
};

//POST API For Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ where: { email } });

    if (!userExist) {
      return res.status(400).json({ message: "email user not exist" });
    }

    const password_compare = await bcrypt.compare(password, userExist.password);
    if (password_compare) {
      const token = jwt.sign({ userExist }, secretKey, { expiresIn: "1d" });
      res.status(200).send({
        message: "Login Successful",
        Token: token,
        userExist,
        admin: userExist.isadmin.toString(),
      });
    } else {
      res.status(400).json({ message: "Invalid details" });
    }
  } catch (error) {
    next(error);
  }
};

//POST API for Forget Password And Get Link Reset Link In Email
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const userExist = await User.findOne({ where: { email } });
    if (!userExist) {
      return res.status(400).json({ message: "email user not exist" });
    } else {
      const token = jwt.sign({ id: userExist.id }, secretKey, {
        expiresIn: "1d",
      });
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "piyushkr767676@gmail.com",
          pass: "jjde vygi mntn rmbd",
        },
      });

      var mailOptions = {
        from: "piyushkr767676@gmail.com",
        to: email,
        subject: "Reset your password",
        text: `http://localhost:3000/reset_password/${userExist.id}/${token}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          return res.send({ Status: "Success" });
        }
      });
    }
  } catch (error) {}
};

//POST API For Reset Password
const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.update({ password: hash }, { where: { id: id } })
            .then(() => res.send({ Status: "Success" }))
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  });
};

//UPDATE API for Activate Account
const updateVerifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const verify = await User.update(
      { isVerified: true },
      { where: { id: id } }
    );
    res.status(200).json({ verify });
  } catch (error) {
    res.status(500).json(error);
  }
};

//UPDATE API for Add Profile Image
const addProfileImg = async (req, res) => {
  try {
    let addProfileImg = {
      profileImage: req.file ? req.file.path : "",
    };

    const profileImg = await User.update(addProfileImg, {
      where: { id: req.params.id },
    });
    res.status(200).send({ data: profileImg });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Store Image API
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

//Upload Image API
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
}).single("profileImage");

//GET API for get Profile Image
const getProfile = async (req, res) => {
  try {
    let result = await User.findOne({ where: { id: req.params.id } });
    res.status(200).send({ msg: "Profile is found", result });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

//GET API for get All User 
const getAllUserDetail = async (req, res) => {
  try {
    let data = await User.findAll();
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

//DELETE API for delete User OneByOne
const deleteUser = async (req, res) => {
  try {
    let id = req.params.id;
    const user = await User.destroy({ where: { id: id } });

    res.status(200).send({ msg: "Product is deleted", user });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

//UPDATE API for Change Password After Login
const changePass = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const Data = await User.findOne({
      where: { id: req.params.id },
    });
    const validPassword = await bcrypt.compare(password, Data.password);
    if (validPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);
      const ChnagePass = await User.update(
        { password: hashPassword },
        { where: { id: req.params.id } }
      );
      return res
        .status(200)
        .json({ Msg: "Password Updated", Password: Data.password.toString() });
    } else {
      return res.status(200).json({ Msg: "Wromg Password" });
    }
  } catch (error) {
    return res.status(500).json({ Error: "Internbal server Error!" });
  }
};

//Search API for search User by Name
const search = async (req, res) => {
  try {
    const data = await User.findAll({

      where: {
        username: {
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

//Sorting Price In Ascending(LowToHigh) Order
const sortAsc = async (req, res) => {
  const data = await User.findAll({
    order: [["username", "ASC"]],
  });
  res.status(200).json({ data: data });
};

//Sorting Price In Descending(HighToLow) Order
const sortDesc = async (req, res) => {
  const Data = await User.findAll({
    order: [["username", "DESC"]],
  });
  res.status(200).json({ Data: Data });
};


//GET API for get Product and Category OneByOne
const getSingleDetail= async (req, res) => {
  try {
    let result = await User.findOne({
      where: { id: req.params.id },
    });
    if (result) {
      res.status(200).send({ msg: "User is found", result });
    } else {
      res.send({ result: "No Record Found." });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

//UPDATE API for update User and Admin
const updateUser = async (req, res) => {
  try {
    const updateUser = {
      username: req.body.username,
      email: req.body.email,
      profileImage: req.file ? req.file.path : "", // Assuming 'ProductImage' is the field for the image path
      isadmin: req.body.isadmin,
      isVerified: req.body.isVerified,
    };

    const [rowsUpdated] = await User.update(updateUser, {
      where: { id: req.params.id },
    });
    if (rowsUpdated > 0) {
      res.status(200).json({ data: rowsUpdated });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Export All User API Function
module.exports = {
  login,
  register,
  forgotPassword,
  resetPassword,
  updateVerifyUser,
  addProfileImg,
  upload,
  getProfile,
  getAllUserDetail,
  deleteUser,
  changePass,
  search,
  sortAsc,
  sortDesc,
  getSingleDetail,
  updateUser
};
