module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
      "product",
      {
        BrandName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Rating: {
          type: DataTypes.STRING,
          allowNull: false,
          
        },
        ProductImage: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Price: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        ProductDescription: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "product",
        timestamps: false,
      }
    );
    return Product;
  };
  