const expenseDue = require("../models/expenseDueModel");
const Helpers = require("../utils/helpers");
const { Op } = require("sequelize");

const getDues = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, query, page = 1, limit = 10 } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const today = new Date().toISOString().slice(0, 10);
    let where = { userId };

    if (status === "upcoming") {
      where.isPaid = false;
      where.dueDate = { [Op.gte]: today };
    } else if (status === "overdue") {
      where.isPaid = false;
      where.dueDate = { [Op.lt]: today };
    } else if (status === "paid") {
      where.isPaid = true;
    }

    if (query) {
      where.title = { [Op.like]: `%${query}%` };
    }

    const { count, rows: dues } = await expenseDue.findAndCountAll({
      where,
      order: [["dueDate", "ASC"]],
      offset,
      limit: parseInt(limit),
    });

    return Helpers.sendOk(
      res,
      {
        dues: dues,
        pagination: {
          page: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
        },
      },
      "Dues fetched successfully"
    );
  } catch (err) {
    console.error(err);
    return Helpers.sendInternalServerError(res, "Failed to fetch dues");
  }
};

const createDue = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, amount, dueDate } = req.body;
    const lowercaseTitle = title.toLowerCase();
    const newDue = await expenseDue.create({
      userId,
      title: lowercaseTitle,
      amount,
      dueDate,
      isPaid: false,
    });

    return Helpers.sendCreated(res, newDue, "Due created successfully");
  } catch (err) {
    console.error(err);
    return Helpers.sendInternalServerError(res, "Failed to create due");
  }
};

const markPaid = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.user.id;
    const ids = String(req.body).split(",");

    const dues = await expenseDue.findAll({
      where: { id: ids, userId },
    });

    if (dues.length === 0) {
      return Helpers.sendNotFound(res, "No dues found to mark as paid");
    }

    for (const due of dues) {
      due.isPaid = true;
      await due.save();
    }

    return Helpers.sendUpdated(
      res,
      dues,
      `${dues.length} due(s) marked as paid`
    );
  } catch (err) {
    console.error(err);
    return Helpers.sendInternalServerError(
      res,
      "Failed to mark due(s) as paid"
    );
  }
};

const deleteDue = async (req, res) => {
  try {
    const userId = req.user.id;
    const dueId = req.params.id;

    const deleted = await expenseDue.destroy({ where: { id: dueId, userId } });

    if (!deleted) return Helpers.sendNotFound(res, "Due not found");

    return Helpers.sendDeleted(res, "Due deleted successfully");
  } catch (err) {
    console.error(err);
    return Helpers.sendInternalServerError(res, "Failed to delete due");
  }
};
const getDueNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    const next7Days = new Date();
    next7Days.setDate(today.getDate() + 7);

    const dues = await expenseDue.findAll({
      where: {
        userId,
        isPaid: false,
        dueDate: {
          [Op.gte]: today.toISOString().slice(0, 10),
          [Op.lte]: next7Days.toISOString().slice(0, 10),
        },
      },
      order: [["dueDate", "ASC"]],
    });

    return Helpers.sendOk(res, dues, "Urgent dues fetched");
  } catch (err) {
    console.error(err);
    return Helpers.sendInternalServerError(res, "Failed to fetch urgent dues");
  }
};

module.exports = {
  getDues,
  createDue,
  markPaid,
  deleteDue,
  getDueNotifications,

};
