const { Model, DataTypes } = require('sequelize');
const {sequelize}=require("../database/dbConfig")

  class Otp extends Model {
    static associate(models) {
      Otp.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Otp.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    otpCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('forgot_password', 'verify_email','2fa_login'),
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
 
  }, {
    sequelize,
    modelName: 'Otp',
    tableName: 'otps',
    timestamps: true,
  });

module.exports= Otp;
