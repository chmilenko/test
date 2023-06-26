const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: 'user_id',
      });
    }
  }
  Product.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    img: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
