const expenseDue = require("../models/expenseDueModel");
const Helpers = require("../utils/helpers");
const { Op } = require('sequelize');



const getDues = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, query } = req.query;

    const today = new Date().toISOString().slice(0, 10);
    let where = { userId };

    if (status === 'upcoming') {
      where.isPaid = false;
      where.dueDate = { [Op.gte]: today };
    } else if (status === 'overdue') {
      where.isPaid = false;
      where.dueDate = { [Op.lt]: today };
    } else if (status === 'paid') {
      where.isPaid = true;
    }

    if (query) {
      where.title = { [Op.like]: `%${query}%` };
    }

    const dues = await expenseDue.findAll({
      where,
      order: [['dueDate', 'ASC']],
    });

    return Helpers.sendOk(res, dues, 'Dues fetched successfully');
  } catch (err) {
    console.error(err);
    return Helpers.sendInternalServerError(res, 'Failed to fetch dues');
  }
};


const createDue = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, amount, dueDate } = req.body;

    const newDue = await expenseDue.create({
      userId,
      title,
      amount,
      dueDate,
      isPaid: false,
    });

    return Helpers.sendCreated(res, newDue, 'Due created successfully');
  } catch (err) {
    console.error(err);
    return Helpers.sendInternalServerError(res, 'Failed to create due');
  }
};

const markPaid = async (req, res) => {
  try {
    console.log(req.body)
    const userId = req.user.id;
    const ids = String(req.body).split(',');

    const dues = await expenseDue.findAll({
      where: { id: ids, userId }
    });

    if (dues.length === 0) {
      return Helpers.sendNotFound(res, 'No dues found to mark as paid');
    }

    for (const due of dues) {
      due.isPaid = true;
      await due.save();
    }

    return Helpers.sendUpdated(res, dues, `${dues.length} due(s) marked as paid`);
  } catch (err) {
    console.error(err);
    return Helpers.sendInternalServerError(res, 'Failed to mark due(s) as paid');
  }
};


const deleteDue = async (req, res) => {
  try {
    const userId = req.user.id;
    const dueId = req.params.id;

    const deleted = await expenseDue.destroy({ where: { id: dueId, userId } });

    if (!deleted) return Helpers.sendNotFound(res, 'Due not found');

    return Helpers.sendDeleted(res, 'Due deleted successfully');
  } catch (err) {
    console.error(err);
    return Helpers.sendInternalServerError(res, 'Failed to delete due');
  }
};

module.exports = {
  getDues,
  createDue,
  markPaid,
  deleteDue,
};
