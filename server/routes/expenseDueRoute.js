const express = require('express');
const router = express.Router();
const expenseDueController = require('../controllers/expenseDueController');
const authenticateJwt = require('../middlewares/jwt'); 


router.get('/expense-dues',authenticateJwt, expenseDueController.getDues);
router.post('/expense-dues',authenticateJwt , expenseDueController.createDue);
router.put('/expense-dues/paid', authenticateJwt, expenseDueController.markPaid);
router.delete('/expense-dues/:id',authenticateJwt,  expenseDueController.deleteDue);
router.get('/expense-dues/notifications',authenticateJwt,  expenseDueController.getDueNotifications);


module.exports = router;
