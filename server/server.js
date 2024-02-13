const express = require("express")
const app= express();
const bodyParser=require("body-parser")
const cors=require("cors")
const dotenv=require("dotenv")
dotenv.config()
const swaggerUi = require("swagger-ui-express");
const yaml = require('yamljs');
const swaggerJsdoc = yaml.load('./api.yaml');
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));
//Calling Error Middleware
const errorMiddleware=require("./Middlewares/error-middleware")

//Calling All Router
const prod_router=require("./Router/product_Router")
const user_router=require("./Router/user_Router")
const cat_router=require("./Router/category_Router")

require("./Db/index")
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/category",cat_router)
app.use("/product",prod_router)
app.use("/user",user_router)

app.use("/images", express.static("../server"));

app.use(errorMiddleware)

//Connection Base URl
const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});