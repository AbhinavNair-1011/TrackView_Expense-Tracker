const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authenticateToken= require("../middlewares/jwt");


router.post('/expense', authenticateToken , expenseController.create);
router.get('/expense', authenticateToken, expenseController.getAll);
router.get('/expense/:id', authenticateToken, expenseController.getOne);
router.put('/expense/:id', authenticateToken ,expenseController.update);
router.delete('/expense/:id', authenticateToken, expenseController.remove);

module.exports = router;
