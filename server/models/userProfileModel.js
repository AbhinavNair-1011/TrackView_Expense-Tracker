const { Model, DataTypes, UUIDV4 } =require('sequelize');
const {sequelize} = require("../database/dbConfig");

class UserProfile extends Model {
  static associate(models) {
    UserProfile.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  }
}

  UserProfile.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue:UUIDV4,
        primaryKey:true
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull:true
      },
      address: {
        type: DataTypes.STRING,
         allowNull:true

      },
      gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull:true

      },
    },
    {
      sequelize,
      modelName: 'UserProfile',
      tableName: 'user_profiles',
      timestamps: true,
    }
  );

module.exports=UserProfile
