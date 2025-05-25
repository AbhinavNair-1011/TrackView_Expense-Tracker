const { Model, DataTypes, UUIDV4 } = require("sequelize");
const { sequelize } = require("../database/dbConfig");

class User extends Model {
  static associate(models) {
    this.hasOne(models.UserProfile, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    this.hasMany(models.Otp, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    this.hasMany(models.Expense, {
      foreignKey: "userId",
      as: "expenses",
      onDelete: "CASCADE",
    });
    this.hasMany(models.Session, {
      foreignKey: "userId",
      as: "sessions",
      onDelete: "CASCADE",
    });
    this.hasMany(models.ExpenseDue, {
      foreignKey: "userId",
      as: "expensedues",
      onDelete: "CASCADE",
    });
   
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.CHAR(25),
      allowNull: false,
    },

    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    two_factor_enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timeStamps: true,
  }
);

module.exports = User;
