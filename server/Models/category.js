module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
      "category",
      {
        Category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        ProductDescription: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "category",
        timestamps: false,
      }
    );
    return Category;
  };
  