const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Saved extends Model {
    static associate({ User, Product }) {
      this.belongsTo(User, {
        foreignKey: 'user_id',
      });
      this.belongsTo(Product, {
        foreignKey: 'product_id',
      });
    }
  }
  Saved.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    product_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Saved',
  });
  return Saved;
};
