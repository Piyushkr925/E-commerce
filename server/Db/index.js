const {Sequelize, DataTypes}=require("sequelize")

const sequelize=new Sequelize("Final_Demo","root","Login12*",{
    host:"localhost",
    dialect:"mysql",
    logging:false
})

try {
    console.log("Connection has been established successful")
    sequelize.authenticate();
} catch (error) {
    console.error("Unable to connect database:",error)
}

const db={};
db.sequelize=Sequelize;
db.sequelize=sequelize;

db.product=require('../Models/product')(sequelize,DataTypes)
db.users=require("../Models/user")(sequelize,DataTypes)
db.category=require("../Models/category")(sequelize,DataTypes)

db.category.hasMany(db.product)
db.product.belongsTo(db.category)

db.sequelize.sync({force:false, alter:true})



module.exports=db


