const { Model, DataTypes } = require('sequelize');
const {sequelize}=require("../database/dbConfig")

class Expense extends Model {
    static associate(models) {
        Expense.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
    }
}

Expense.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        date: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('one-time', 'recurring'),
            allowNull: false,
            defaultValue: 'one-time',
        },
        paymentMethod: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Expense',
        tableName: 'expenses',
        timestamps: true,
    }
);

module.exports = Expense;

