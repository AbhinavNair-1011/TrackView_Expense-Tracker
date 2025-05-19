const Expense = require('../models/expenseModel');
const Helpers = require('../utils/helpers');
const {Op,fn,col}=require("sequelize")
const create = async (req, res) => {
    try {
        const { amount, category, description, date } = req.body;

        const errors = [];

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            errors.push('Amount must be a positive number');
        }
        if (!category || typeof category !== 'string' || category.trim().length < 2) {
            errors.push('Category is required and must be a valid string');
        }
        if (description && typeof description !== 'string') {
            errors.push('Description must be a string');
        }
        if (!date || isNaN(Date.parse(date))) {
            errors.push('Valid date is required');
        }

        if (errors.length > 0) {
            return Helpers.sendBadRequest(res, errors);
        }

        const expense = await Expense.create({
            amount,
            category: category.trim(),
            description: description?.trim() || '',
            date: new Date(date),
            userId: req.user.id,
        });

        return Helpers.sendCreated(res, expense, 'Expense created successfully');
    } catch (error) {
        return Helpers.sendInternalServerError(res, error.message);
    }
};

const getAll = async (req, res) => {
    try {
        const { page = '1', limit = '10', category, startDate, endDate } = req.query;

        const errors = [];

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);

        if (isNaN(pageNum) || pageNum < 1) {
            errors.push('Page must be a positive integer');
        }
        if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
            errors.push('Limit must be a positive integer between 1 and 100');
        }

        if (category && (typeof category !== 'string' || category.trim().length < 2)) {
            errors.push('Category filter must be a valid string');
        }

        if (startDate && isNaN(Date.parse(startDate))) {
            errors.push('startDate filter must be a valid date');
        }

        if (endDate && isNaN(Date.parse(endDate))) {
            errors.push('endDate filter must be a valid date');
        }

        if (errors.length > 0) {
            return Helpers.sendBadRequest(res, errors.join('; '));
        }

        const where = { userId: req.user.id };

        if (category) {
            where.category = category.trim();
        }

        if (startDate || endDate) {
            where.date = {};
            if (startDate) where.date['$gte'] = new Date(startDate);
            if (endDate) where.date['$lte'] = new Date(endDate);
        }

        const offset = (pageNum - 1) * limitNum;

        const { count, rows: expenses } = await Expense.findAndCountAll({
            where,
            limit: limitNum,
            offset,
            order: [['date', 'DESC']],
        });

        return Helpers.sendOk(res, {
            expenses,
            pagination: {
                total: count,
                page: pageNum,
                limit: limitNum,
                pages: Math.ceil(count / limitNum),
            },
        });
    } catch (error) {
        return Helpers.sendInternalServerError(res, error.message);
    }
};


const getOne = async (req, res) => {
    try {

                console.log("one")

        const id = req.params.id;

        const expense = await Expense.findOne({
            where: { id, userId: req.user.id },
        });

        if (!expense) return Helpers.sendNotFound(res, 'Expense not found');

        return Helpers.sendOk(res, expense);
    } catch (error) {
        return Helpers.sendInternalServerError(res, error.message);
    }
};


const update = async (req, res) => {
    try {
        const id = req.params.id;
        const { amount, category, description, date } = req.body;



        const expense = await Expense.findOne({
            where: { id, userId: req.user.id },
        });
        if (!expense) return Helpers.sendNotFound(res, 'Expense not found');


        const errors = [];

        if (amount !== undefined) {
            if (isNaN(amount) || Number(amount) < 0) errors.push('Amount must be a positive number');
        }
        if (category !== undefined) {
            if (typeof category !== 'string' || category.trim().length < 2) errors.push('Category must be a valid string');
        }
        if (description !== undefined) {
            if (typeof description !== 'string') errors.push('Description must be a string');
        }
        if (date !== undefined) {
            if (isNaN(Date.parse(date))) errors.push('Valid date is required');
        }
        if (errors.length > 0) return Helpers.sendBadRequest(res, errors);

        await expense.update({ amount, category, description, date });

        return Helpers.sendUpdated(res, expense, 'Expense updated successfully');
    } catch (error) {
        return Helpers.sendInternalServerError(res, error.message);
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;

        const expense = await Expense.findOne({
            where: { id, userId: req.user.id },
        });
        if (!expense) return Helpers.sendNotFound(res, 'Expense not found');

        await expense.destroy();

        return Helpers.sendDeleted(res, 'Expense deleted successfully');
    } catch (error) {
        return Helpers.sendInternalServerError(res, error.message);
    }
};

const getSummary = async (req, res) => {
    try {
        console.log("summary")
        const userId="488a5604-9667-488c-9d05-ee0c7a1b73f2"

        const totalAmount = await Expense.sum('amount');

        const totalCount = await Expense.count();

        const mostRecent = await Expense.findOne({
            order: [['date', 'DESC']],
            limit: 1,
        });

        const category = await Expense.findAll({
            where: { userId },
            attributes: ['category', [fn('SUM', col('amount')), 'total']],
            group: ['category']
        });

        const mostExpensiveCategory = category.reduce(
            (max, item) => {
                const amount = Number(item.get('total'));
                const name = item.get('category');
                return amount > max.amount
                    ? { category: name, amount }
                    : max;
            },
            { category: '', amount: 0 }
        );


        return Helpers.sendOk(res, {
            totalAmount,
            totalCount,
            mostRecentExpense: mostRecent || null,
            mostExpensiveCategory: mostExpensiveCategory || { category: null, totalAmount: 0 }
        });
    } catch (err) {
        console.error(err)
        return Helpers.sendInternalServerError(res,"Failed to fetch expense summary");
    }
};

module.exports = {
    create,
    getAll,
    getOne,
    update,
    remove,
    getSummary
};
