const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/orders', orderController.createOrder);

router.get('/orders', orderController.getAllOrders);

router.get('/orders/:user_id', orderController.getOrdersByUserId);

router.get('/orders/item/:item_id', orderController.getOrdersByItemId);

router.get('/orders/date/:startDate/:endDate', orderController.getOrdersByDate);

module.exports = router;