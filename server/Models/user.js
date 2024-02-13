module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users',{
        username: {
            type: DataTypes.STRING,
            allowNull: false
          }, 
          email:{
            type: DataTypes.STRING,
            allowNull: false
          },
          password:{
            type: DataTypes.STRING,
            allowNull: false
          },
          isadmin:{
            type: DataTypes.STRING,
            allowNull: false
          },
          isVerified:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
          },
          profileImage:{
            type:DataTypes.STRING,
            defaultValue:null
          }
    },{
        tablename:'users'
    });
    return User;
  };
  