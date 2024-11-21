const OrderService = require('../services/orderService');

// Función para crear una nueva orden
const createOrder = async (req, res) => {
    try {
        const { user_id, item_id, discount_id, payment } = req.body;
        const order = await OrderService.createOrder(user_id, item_id, discount_id, payment);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Función para obtener todas las órdenes de un usuario específico
const getOrdersByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;
        const orders = await OrderService.getOrdersByUserId(user_id);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Función para obtener todas las órdenes en la base de datos
const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

const getOrdersByItemId = async (req, res) => {
    try {
        const { item_id } = req.params;
        const orders = await OrderService.getOrdersByItemId(item_id);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

const getOrdersByDate = async (req, res) => {
    try {
        const { startDate, endDate } = req.params; // Extraer de los parámetros

        // Validaciones
        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'startDate and endDate are required' });
        }

        if (isNaN(new Date(startDate).getTime()) || isNaN(new Date(endDate).getTime())) {
            return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
        }

        // Llama al servicio con las fechas
        const orders = await OrderService.getOrdersByDate(startDate, endDate);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

module.exports = {
    createOrder,
    getOrdersByUserId,
    getAllOrders,
    getOrdersByItemId,
    getOrdersByDate
};
