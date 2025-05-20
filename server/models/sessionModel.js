const { Model, DataTypes, UUIDV4 } = require('sequelize');
const { sequelize } = require('../database/dbConfig');

class Session extends Model {
   static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  }
}

Session.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userAgent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  revoked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  lastUsedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  rememberMe:{
    type:DataTypes.BOOLEAN,
    defaultValue:false,
    allowNull:true
  }
}, {
  sequelize,
  tableName: 'sessions',
  timestamps: true,
  updatedAt: 'lastUsedAt',
});

module.exports = Session;
